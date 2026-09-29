// Enable RLS on all public tables + revoke anon/authenticated privileges (Supabase security advisory fix)
// Idempotent. Safe for the app: Prisma connects as postgres role (BYPASSRLS).
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

const TABLES = ['Purchase', 'Visit', 'DailyReport', 'Subscriber'];

async function testAsRole(role) {
  await prisma.$queryRawUnsafe('SET ROLE ' + role);
  try {
    const r = await prisma.$queryRawUnsafe('SELECT count(*)::int AS n FROM "Purchase"');
    return '  [role ' + role + '] ACCESSIBLE! count=' + r[0].n;
  } catch (e) {
    return '  [role ' + role + '] DENIED: ' + String(e.message).split('\n')[0].slice(0, 70);
  } finally {
    await prisma.$queryRawUnsafe('RESET ROLE');
  }
}

async function main() {
  console.log('=== BEFORE FIX (as anon/authenticated) ===');
  console.log(await testAsRole('anon'));
  console.log(await testAsRole('authenticated'));

  console.log('=== APPLYING FIX ===');
  for (const t of TABLES) {
    await prisma.$executeRawUnsafe('ALTER TABLE "' + t + '" ENABLE ROW LEVEL SECURITY');
    console.log('  ENABLE RLS: ' + t + ' OK');
  }
  const tableList = TABLES.map((t) => '"' + t + '"').join(', ');
  await prisma.$executeRawUnsafe('REVOKE ALL PRIVILEGES ON TABLE ' + tableList + ' FROM anon');
  await prisma.$executeRawUnsafe('REVOKE ALL PRIVILEGES ON TABLE ' + tableList + ' FROM authenticated');
  console.log('  REVOKE privileges from anon/authenticated OK');

  console.log('=== AFTER FIX (as anon/authenticated) ===');
  console.log(await testAsRole('anon'));
  console.log(await testAsRole('authenticated'));

  console.log('=== VERIFY (as postgres / app role) ===');
  for (const t of TABLES) {
    const r = await prisma.$queryRawUnsafe('SELECT count(*)::int AS n FROM "' + t + '"');
    console.log('  [postgres] SELECT "' + t + '" OK, rows=' + r[0].n);
  }
  const tables = await prisma.$queryRawUnsafe(`
    SELECT relname, relrowsecurity FROM pg_class c
    JOIN pg_namespace n ON n.oid = c.relnamespace
    WHERE n.nspname='public' AND c.relkind='r' ORDER BY relname`);
  console.log('=== FINAL RLS STATE ===');
  for (const t of tables) console.log('  ' + t.relname + ': rls=' + t.relrowsecurity);
}

main()
  .catch((e) => { console.error('ERROR:', e.message); process.exit(1); })
  .finally(() => prisma.$disconnect());
