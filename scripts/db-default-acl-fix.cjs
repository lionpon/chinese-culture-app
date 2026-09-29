// Harden default privileges: stop auto-granting anon/authenticated on future tables/functions
// created by postgres role in public schema (recurrence prevention for rls_disabled_in_public).
// Does NOT touch existing tables (already handled by db-rls-fix.cjs). Reversible.
const fs = require('fs');
const path = require('path');
const { PrismaClient } = require('@prisma/client');

const envPath = path.join(__dirname, '..', '.env.local');
const env = {};
for (const line of fs.readFileSync(envPath, 'utf8').split('\n')) {
  const m = line.match(/^([A-Z0-9_]+)=(.*)$/);
  if (m) env[m[1]] = m[2].replace(/^["']|["']$/g, '');
}
const direct = env.DATABASE_URL || env.DIRECT_URL;
const u = new URL(direct);
const cred = encodeURIComponent(decodeURIComponent(u.username)) + ':' + encodeURIComponent(decodeURIComponent(u.password));
process.env.DATABASE_URL = u.protocol + '//' + cred + '@' + u.hostname + ':' + u.port + u.pathname + '?sslmode=prefer&connection_limit=1';

const prisma = new PrismaClient({ log: ['error'] });

async function main() {
  console.log('=== BEFORE (public schema default ACL for postgres) ===');
  let dacl = await prisma.$queryRawUnsafe(`
    SELECT defaclobjtype AS type, defaclacl::text AS acl FROM pg_default_acl
    WHERE defaclrole = (SELECT oid FROM pg_roles WHERE rolname = 'postgres')
      AND defaclnamespace = (SELECT oid FROM pg_namespace WHERE nspname = 'public') ORDER BY defaclobjtype`);
  for (const r of dacl) console.log('  type=' + r.type + ' ' + r.acl);

  console.log('=== APPLYING FIX ===');
  await prisma.$executeRawUnsafe(`ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA public REVOKE ALL ON TABLES FROM anon, authenticated`);
  console.log('  default TABLES: revoked anon/authenticated OK');
  await prisma.$executeRawUnsafe(`ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA public REVOKE EXECUTE ON FUNCTIONS FROM anon, authenticated`);
  console.log('  default FUNCTIONS: revoked anon/authenticated OK');

  console.log('=== AFTER ===');
  dacl = await prisma.$queryRawUnsafe(`
    SELECT defaclobjtype AS type, defaclacl::text AS acl FROM pg_default_acl
    WHERE defaclrole = (SELECT oid FROM pg_roles WHERE rolname = 'postgres')
      AND defaclnamespace = (SELECT oid FROM pg_namespace WHERE nspname = 'public') ORDER BY defaclobjtype`);
  for (const r of dacl) console.log('  type=' + r.type + ' ' + r.acl);

  console.log('=== VERIFY: create temp table as postgres, check anon cannot read it ===');
  await prisma.$executeRawUnsafe(`DROP TABLE IF EXISTS "cc_acl_probe"`);
  await prisma.$executeRawUnsafe(`CREATE TABLE "cc_acl_probe" (id int)`);
  await prisma.$executeRawUnsafe(`INSERT INTO "cc_acl_probe" VALUES (1)`);
  const gr = await prisma.$queryRawUnsafe(`
    SELECT grantee, privilege_type FROM information_schema.role_table_grants
    WHERE table_name = 'cc_acl_probe' AND grantee IN ('anon','authenticated')`);
  console.log('  grants on new table for anon/authenticated: ' + (gr.length === 0 ? '(none) ✅' : JSON.stringify(gr)));
  await prisma.$queryRawUnsafe(`SET ROLE anon`);
  try {
    const r = await prisma.$queryRawUnsafe(`SELECT * FROM "cc_acl_probe"`);
    console.log('  [anon] ACCESSIBLE! ' + JSON.stringify(r));
  } catch (e) {
    console.log('  [anon] DENIED ✅');
  } finally {
    await prisma.$queryRawUnsafe(`RESET ROLE`);
  }
  await prisma.$executeRawUnsafe(`DROP TABLE "cc_acl_probe"`);
  console.log('  probe table dropped');
}

main()
  .catch((e) => { console.error('ERROR:', e.message); process.exit(1); })
  .finally(() => prisma.$disconnect());
