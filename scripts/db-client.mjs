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

function removeComments(script) {
  return script
    .split('\n')
    .filter((line) => !line.trim().startsWith('--'))
    .join('\n');
}

function splitSqlStatements(script) {
  const cleaned = removeComments(script);
  const statements = [];
  let current = '';
  let i = 0;
  let dollarTag = null;
  let inSingleQuote = false;

  while (i < cleaned.length) {
    const ch = cleaned[i];

    if (dollarTag === null && !inSingleQuote && ch === '$') {
      const match = cleaned.slice(i).match(/^(\$[A-Za-z0-9_]*\$)/);
      if (match) {
        dollarTag = match[1];
        current += match[1];
        i += match[1].length;
        continue;
      }
    }

    if (dollarTag !== null && cleaned.slice(i, i + dollarTag.length) === dollarTag) {
      current += dollarTag;
      i += dollarTag.length;
      dollarTag = null;
      continue;
    }

    if (dollarTag === null) {
      if (inSingleQuote) {
        if (ch === "'") {
          if (cleaned[i + 1] === "'") {
            current += "''";
            i += 2;
            continue;
          }
          inSingleQuote = false;
          current += ch;
          i++;
          continue;
        }
        current += ch;
        i++;
        continue;
      }

      if (ch === "'") {
        inSingleQuote = true;
        current += ch;
        i++;
        continue;
      }
    }

    if (dollarTag === null && !inSingleQuote && ch === ';') {
      const stmt = current.trim();
      if (stmt) statements.push(stmt);
      current = '';
      i++;
      continue;
    }

    current += ch;
    i++;
  }

  const tail = current.trim();
  if (tail) statements.push(tail);
  return statements;
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
