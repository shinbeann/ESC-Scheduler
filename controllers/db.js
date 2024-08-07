import mysql from 'mysql2';

const database = "tsh";
const pool = mysql
  .createPool({
    host: "localhost",
    user: "root",
    database: "mysql",
    password: "password",
    connectionLimit: 10,
  })
  .promise();

async function init() {
  try {
    await pool.query(`CREATE DATABASE IF NOT EXISTS ${database}`);
    await pool.query(`Use ${database}`);
  } catch (error) {
    console.error('Database Failed to Create and Use: ', error);
    throw error;
  }
}

await init()

const cleanup = async () => await pool.end();

export { pool, cleanup };