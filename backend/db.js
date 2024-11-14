
const { Pool } = require('pg');

require('dotenv').config()
const pool = new Pool({
    user: process.env.POSTGRES_USER,
    host: process.env.POSTGRES_HOST,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB,
    port: 5432
    
    // connectionString: `postgres://${process.env.POSTGRES_USER}:${process.env.POSTGRES_PASSWORD}@${process.env.POSTGRES_HOST}:5432/${process.env.POSTGRES_DB}`
    // || 'postgres://postgres:Test1234.@localhost:5432/capstone_project?search_path=study_buds',
    // ssl: process.env.DATABASE_URL ? true : false
})
module.exports = pool