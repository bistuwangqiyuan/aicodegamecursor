import { Pool } from '@neondatabase/serverless';

export function getConnectionString() {
  return (
    process.env.NETLIFY_DB_URL ||
    process.env.NETLIFY_DATABASE_URL ||
    process.env.DATABASE_URL ||
    process.env.POSTGRES_URL ||
    process.env.POSTGRES_URL_NON_POOLING
  );
}

export async function runSqlScript(script) {
  const connectionString = getConnectionString();
  if (!connectionString) {
    throw new Error(
      'Database connection string not found. Set NETLIFY_DB_URL, NETLIFY_DATABASE_URL, DATABASE_URL, or POSTGRES_URL.'
    );
  }

  const pool = new Pool({ connectionString });
  try {
    await pool.query(script);
  } finally {
    await pool.end();
  }
}
