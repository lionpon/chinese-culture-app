// Supabase security audit #2 — default privileges, functions, views, schema grants (READ-ONLY)
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
  console.log('=== 1. DEFAULT PRIVILEGES (pg_default_acl — future tables) ===');
  const dacl = await prisma.$queryRawUnsafe(`
    SELECT pg_get_userbyid(d.defaclrole) AS owner, d.defaclnamespace::regnamespace::text AS schema,
           d.defaclobjtype AS objtype, d.defaclacl::text AS acl
    FROM pg_default_acl d ORDER BY 1, 3`);
  if (dacl.length === 0) console.log('  (none)');
  for (const r of dacl) console.log(`  owner=${r.owner} schema=${r.schema} type=${r.objtype}\n    ${r.acl}`);

  console.log('=== 2. SECURITY DEFINER functions (public schema) ===');
  const fns = await prisma.$queryRawUnsafe(`
    SELECT p.proname, pg_get_function_identity_arguments(p.oid) AS args, l.lanname,
           CASE WHEN p.prosecdef THEN 'SECURITY DEFINER' ELSE 'security invoker' END AS mode
    FROM pg_proc p JOIN pg_namespace n ON n.oid = p.pronamespace JOIN pg_language l ON l.oid = p.prolang
    WHERE n.nspname = 'public' AND p.proname NOT LIKE 'pg_%' ORDER BY p.proname`);
  if (fns.length === 0) console.log('  (no functions)');
  for (const f of fns) console.log(`  ${f.proname}(${f.args}) [${f.lanname}] ${f.mode}`);

  console.log('=== 3. VIEWS / MATERIALIZED VIEWS (public schema) ===');
  const views = await prisma.$queryRawUnsafe(`
    SELECT c.relname, c.relkind, (c.reloptions::text) AS opts
    FROM pg_class c JOIN pg_namespace n ON n.oid = c.relnamespace
    WHERE n.nspname = 'public' AND c.relkind IN ('v','m') ORDER BY c.relname`);
  if (views.length === 0) console.log('  (none)');
  for (const v of views) console.log(`  ${v.relname} kind=${v.relkind}`);

  console.log('=== 4. SCHEMA-level grants to anon/authenticated ===');
  const sgr = await prisma.$queryRawUnsafe(`
    SELECT grantee, privilege_type FROM information_schema.role_usage_grants
    WHERE object_schema = 'public' AND grantee IN ('anon','authenticated')`);
  if (sgr.length === 0) console.log('  (none)');
  for (const g of sgr) console.log(`  ${g.grantee}: ${g.privilege_type}`);

  console.log('=== 5. FUNCTION-level grants to anon/authenticated ===');
  const fgr = await prisma.$queryRawUnsafe(`
    SELECT grantee, routine_name, privilege_type FROM information_schema.role_routine_grants
    WHERE routine_schema = 'public' AND grantee IN ('anon','authenticated')`);
  if (fgr.length === 0) console.log('  (none)');
  for (const g of fgr) console.log(`  ${g.grantee} ON ${g.routine_name}: ${g.privilege_type}`);

  console.log('=== 6. Extensions ===');
  const ext = await prisma.$queryRawUnsafe(`SELECT extname FROM pg_extension ORDER BY extname`);
  console.log('  ' + ext.map((e) => e.extname).join(', '));

  console.log('=== 7. Roles with LOGIN (credential exposure surface) ===');
  const roles = await prisma.$queryRawUnsafe(`
    SELECT rolname, rolcanlogin, rolsuper, rolbypassrls FROM pg_roles WHERE rolcanlogin ORDER BY rolname`);
  for (const r of roles) console.log(`  ${r.rolname}: login=${r.rolcanlogin} super=${r.rolsuper} bypassrls=${r.rolbypassrls}`);
}

main()
  .catch((e) => { console.error('ERROR:', e.message); process.exit(1); })
  .finally(() => prisma.$disconnect());
