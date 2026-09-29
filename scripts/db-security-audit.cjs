// Supabase RLS security audit — reads .env.local, prints ONLY non-secret metadata
// Auto-tries multiple connection configs (IPv6-only direct host / plaintext pooler)
const fs = require('fs');
const path = require('path');
const { PrismaClient } = require('@prisma/client');

const envPath = path.join(__dirname, '..', '.env.local');
const env = {};
for (const line of fs.readFileSync(envPath, 'utf8').split('\n')) {
  const m = line.match(/^([A-Z0-9_]+)=(.*)$/);
  if (m) env[m[1]] = m[2].replace(/^["']|["']$/g, '');
}

function buildCandidates() {
  const direct = env.DATABASE_URL || env.DIRECT_URL;
  const list = [];
  if (direct) {
    const u = new URL(direct);
    const cred = encodeURIComponent(decodeURIComponent(u.username)) + ':' + encodeURIComponent(decodeURIComponent(u.password));
    const base = u.protocol + '//' + cred + '@' + u.hostname + ':' + u.port + u.pathname;
    list.push(base + '?sslmode=require&connection_limit=1');
    list.push(base + '?sslmode=prefer&connection_limit=1');
    // pooler (IPv4) — port 6543 speaks plaintext pgbouncer
    const ref = u.hostname.split('.')[1];
    const poolUser = u.username === 'postgres' ? 'postgres.' + ref : u.username;
    const poolBase = 'postgresql://' + encodeURIComponent(poolUser) + ':' + encodeURIComponent(u.password) + '@aws-0-us-east-1.pooler.supabase.com:6543/postgres';
    list.push(poolBase + '?sslmode=disable&connection_limit=1');
  }
  return list;
}

async function tryConnect(url) {
  process.env.DATABASE_URL = url;
  const prisma = new PrismaClient({ log: ['error'] });
  try {
    await prisma.$queryRawUnsafe('SELECT 1 AS ok');
    return prisma;
  } catch (e) {
    await prisma.$disconnect().catch(() => {});
    return null;
  }
}

async function main() {
  const candidates = buildCandidates();
  let prisma = null;
  let used = null;
  for (const url of candidates) {
    const u = new URL(url);
    process.stdout.write(`trying ${u.hostname}:${u.port} sslmode=${u.searchParams.get('sslmode')} ... `);
    prisma = await tryConnect(url);
    if (prisma) { used = url; console.log('CONNECTED'); break; }
    console.log('failed');
  }
  if (!prisma) { console.log('ALL CONNECTION ATTEMPTS FAILED'); process.exit(1); }
  const u = new URL(used);
  console.log('=== using:', u.hostname + ':' + u.port, 'sslmode=' + u.searchParams.get('sslmode'), '===');

  const tables = await prisma.$queryRawUnsafe(`
    SELECT c.relname AS table_name, c.relrowsecurity AS rls_enabled
    FROM pg_class c JOIN pg_namespace n ON n.oid = c.relnamespace
    WHERE n.nspname = 'public' AND c.relkind = 'r' ORDER BY c.relname`);
  console.log('=== TABLES (RLS status) ===');
  for (const t of tables) console.log(`  ${t.table_name}: rls_enabled=${t.rls_enabled}`);

  const grants = await prisma.$queryRawUnsafe(`
    SELECT grantee, table_name, privilege_type
    FROM information_schema.role_table_grants
    WHERE table_schema = 'public' AND grantee IN ('anon','authenticated')
    ORDER BY grantee, table_name`);
  console.log('=== GRANTS (anon/authenticated) ===');
  if (grants.length === 0) console.log('  (none)');
  for (const g of grants) console.log(`  ${g.grantee} ON ${g.table_name}: ${g.privilege_type}`);

  const policies = await prisma.$queryRawUnsafe(`
    SELECT tablename, policyname, roles, cmd FROM pg_policies WHERE schemaname='public'`);
  console.log('=== POLICIES ===');
  if (policies.length === 0) console.log('  (none)');
  for (const p of policies) console.log(`  ${p.tablename}: ${p.policyname} [${p.roles}] ${p.cmd}`);

  const bypass = await prisma.$queryRawUnsafe(`
    SELECT rolname, rolbypassrls, rolsuper FROM pg_roles WHERE rolname IN ('anon','authenticated','service_role','authenticator','postgres')`);
  console.log('=== ROLES ===');
  for (const r of bypass) console.log(`  ${r.rolname}: bypassrls=${r.rolbypassrls} super=${r.rolsuper}`);

  await prisma.$disconnect();
}

main().catch((e) => { console.error('ERROR:', e.message); process.exit(1); });
