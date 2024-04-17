import dotenv from "dotenv";
import pkg from "pg";
dotenv.config()
const { Pool } = pkg;

export const pool = new Pool({
    user: process.env.POSTGRES_USER,
    host: process.env.POSTGRES_HOST,
    database: process.env.POSTGRES_DATABASE,
    port: process.env.POSTGRES_PORT,
});
