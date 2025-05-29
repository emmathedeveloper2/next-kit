import { drizzle as drizzle_neon } from 'drizzle-orm/neon-http';
import { drizzle as drizzle_postgres } from 'drizzle-orm/node-postgres';
import { DATABASE_URL, DEV_DATABASE_URL, NODE_ENV } from '@/config/env.config'

const initializeDatabase = () => {
    return NODE_ENV == "development" ? drizzle_postgres(DEV_DATABASE_URL!) : drizzle_neon(DATABASE_URL!)
}

const db = initializeDatabase();

export default db