import mysql from 'mysql2'

const connection = mysql.createConnection({
  host: process.env.DATABASE_HOST,
  user: process.env.DATABASE_USER,
  database: process.env.DATABASE_NAME,
  password: process.env.DATABASE_PASSWORD,
  port: process.env.DATABASE_PORT
})
