import { neon } from '@neondatabase/serverless';

export function getConnectionString() {
  return (
    process.env.NETLIFY_DB_URL ||
    process.env.NETLIFY_DATABASE_URL ||
    process.env.DATABASE_URL ||
    process.env.POSTGRES_URL ||
    process.env.POSTGRES_URL_NON_POOLING
  );
}

function splitSqlStatements(script) {
  return script
    .split(/;\s*(?:\r?\n|$)/)
    .map((part) =>
      part
        .split('\n')
        .filter((line) => !line.trim().startsWith('--'))
        .join('\n')
        .trim()
    )
    .filter(Boolean);
}

export async function runSqlScript(script) {
  const connectionString = getConnectionString();
  if (!connectionString) {
    const keys = [
      'NETLIFY_DB_URL',
      'NETLIFY_DATABASE_URL',
      'DATABASE_URL',
      'POSTGRES_URL',
    ];
    throw new Error(
      `Database connection string not found (checked: ${keys.join(', ')}). Link Neon in Netlify or set DATABASE_URL.`
    );
  }

  const sql = neon(connectionString);
  const statements = splitSqlStatements(script);

  for (const statement of statements) {
    await sql(statement);
  }
}
