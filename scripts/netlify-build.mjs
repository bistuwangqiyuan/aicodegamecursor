import { execSync } from 'node:child_process';
import { getConnectionString } from './db-client.mjs';

function logDbEnv() {
  const keys = [
    'NETLIFY_DB_URL',
    'NETLIFY_DATABASE_URL',
    'DATABASE_URL',
    'POSTGRES_URL',
    'POSTGRES_URL_NON_POOLING',
  ];
  const present = keys.filter((key) => process.env[key]);
  console.log(`Database env vars present: ${present.join(', ') || 'NONE'}`);
}

function run(command) {
  execSync(command, { stdio: 'inherit' });
}

logDbEnv();

if (getConnectionString()) {
  run('npm run db:migrate');
  run('npm run db:seed');
} else {
  console.warn('⚠️  Skipping db:migrate/db:seed — no database URL in build environment.');
}

run('npm run build');
