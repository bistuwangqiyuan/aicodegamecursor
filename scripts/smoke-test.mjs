/**
 * Smoke tests for GameCode Lab on Netlify
 */

const BASE_URL = process.env.TEST_BASE_URL || 'https://aicodegamecursor.netlify.app';
const TEST_PASSWORD = 'Bistu@2026';

const accounts = [
  { role: 'student', email: 'student@bistu.edu.cn' },
  { role: 'teacher', email: 'teacher@bistu.edu.cn' },
  { role: 'admin', email: 'admin@bistu.edu.cn' },
  { role: 'guest', email: 'guest@bistu.edu.cn' },
];

const publicPages = ['/', '/login', '/register', '/terms', '/privacy'];
const protectedPages = ['/dashboard', '/courses', '/playground', '/projects', '/leaderboard'];
const staticAssets = [
  '/bistu/logo.svg',
  '/bistu/logo-white.svg',
  '/bistu/mascot.svg',
  '/bistu/banner-campus.svg',
];

let passed = 0;
let failed = 0;

function log(name, ok, detail = '') {
  console.log(`${ok ? '✓' : '✗'} ${name}${detail ? ` — ${detail}` : ''}`);
  if (ok) passed++;
  else failed++;
}

async function request(path, options = {}) {
  const url = `${BASE_URL}${path}`;
  const res = await fetch(url, { redirect: 'manual', ...options });
  const text = await res.text();
  let json = null;
  try {
    json = JSON.parse(text);
  } catch {
    // not json
  }
  return { res, text, json };
}

async function run() {
  console.log(`\nSmoke test: ${BASE_URL}\n`);

  // Health / DB
  try {
    const { res, json } = await request('/api/health');
    log('GET /api/health status 200', res.status === 200, String(res.status));
    log('Database connected', json?.database === 'connected', json?.database || json?.error);
  } catch (e) {
    log('GET /api/health', false, e.message);
  }

  // Public pages
  for (const path of publicPages) {
    try {
      const { res } = await request(path);
      log(`GET ${path}`, res.status === 200, String(res.status));
    } catch (e) {
      log(`GET ${path}`, false, e.message);
    }
  }

  // Protected pages redirect when unauthenticated
  for (const path of protectedPages) {
    try {
      const { res } = await request(path);
      const ok = res.status === 307 || res.status === 308 || res.status === 302;
      log(`GET ${path} redirects to login`, ok, String(res.status));
    } catch (e) {
      log(`GET ${path} redirect`, false, e.message);
    }
  }

  // Homepage branding
  try {
    const { res, text } = await request('/');
    log('Homepage status 200', res.status === 200);
    log('Homepage contains 信工实习', text.includes('信工实习'));
    log('Homepage contains AI编程', text.includes('AI编程'));
  } catch (e) {
    log('Homepage branding', false, e.message);
  }

  // Static assets
  for (const asset of staticAssets) {
    try {
      const { res } = await request(asset);
      log(`GET ${asset}`, res.status === 200, String(res.status));
    } catch (e) {
      log(`GET ${asset}`, false, e.message);
    }
  }

  // API data
  try {
    const { json } = await request('/api/courses');
    log('Courses API success', json?.success === true);
    log('Courses count >= 5', (json?.data?.length || 0) >= 5, String(json?.data?.length || 0));
  } catch (e) {
    log('Courses API', false, e.message);
  }

  try {
    const { json } = await request('/api/leaderboard');
    log('Leaderboard API success', json?.success === true);
    log('Leaderboard count >= 3', (json?.data?.length || 0) >= 3, String(json?.data?.length || 0));
  } catch (e) {
    log('Leaderboard API', false, e.message);
  }

  // Login for each test account
  for (const account of accounts) {
    try {
      const { res, json } = await request('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: account.email, password: TEST_PASSWORD }),
      });
      log(`Login ${account.role}`, res.status === 200 && !!json?.user, String(res.status));
    } catch (e) {
      log(`Login ${account.role}`, false, e.message);
    }
  }

  console.log(`\nResults: ${passed} passed, ${failed} failed\n`);
  process.exit(failed > 0 ? 1 : 0);
}

run().catch((e) => {
  console.error(e);
  process.exit(1);
});
