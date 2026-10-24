import { Pool } from 'pg';

// Os dados de conexão vêm do .env (local) ou das variáveis do container (Docker/AWS)
export const pool = new Pool({
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});
