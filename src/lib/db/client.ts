import { neon, NeonQueryFunction } from '@neondatabase/serverless';

let sqlInstance: NeonQueryFunction<false, false> | null = null;

export function getConnectionString(): string | undefined {
  return (
    process.env.NETLIFY_DB_URL ||
    process.env.NETLIFY_DATABASE_URL ||
    process.env.DATABASE_URL ||
    process.env.POSTGRES_URL ||
    process.env.POSTGRES_URL_NON_POOLING
  );
}

export function getSql(): NeonQueryFunction<false, false> {
  if (!sqlInstance) {
    const connectionString = getConnectionString();
    if (!connectionString) {
      throw new Error(
        'Database connection string not found. Set NETLIFY_DB_URL, NETLIFY_DATABASE_URL, DATABASE_URL, or POSTGRES_URL.'
      );
    }
    sqlInstance = neon(connectionString);
  }
  return sqlInstance;
}

/** Tagged-template SQL query compatible with @vercel/postgres usage */
export async function sql<T = Record<string, unknown>>(
  strings: TemplateStringsArray,
  ...values: unknown[]
): Promise<{ rows: T[]; rowCount: number }> {
  const queryFn = getSql();
  const result = await queryFn(strings, ...values);
  const rows = Array.isArray(result) ? result : [result];
  return { rows: rows as T[], rowCount: rows.length };
}

/** Run raw SQL string (for migrate/seed scripts) */
export async function query(rawSql: string): Promise<void> {
  const queryFn = getSql();
  await queryFn(rawSql);
}
