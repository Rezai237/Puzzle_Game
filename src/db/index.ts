import { createClient } from '@libsql/client';
import { drizzle } from 'drizzle-orm/libsql';
import * as schema from './schema';

// Use environment variables or fallback to development values
const client = createClient({
  url: import.meta.env.VITE_DATABASE_URL || 'file:local.db',
  authToken: import.meta.env.VITE_DATABASE_AUTH_TOKEN,
});

export const db = drizzle(client, { schema });

export async function executeTransaction<T>(
  callback: () => Promise<T>
): Promise<T> {
  try {
    await client.execute('BEGIN TRANSACTION');
    const result = await callback();
    await client.execute('COMMIT');
    return result;
  } catch (error) {
    await client.execute('ROLLBACK');
    throw error;
  }
}