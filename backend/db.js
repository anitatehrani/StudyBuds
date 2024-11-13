// const { database } = require('firebase-functions/v1/firestore')
// const { Pool } = require('pg')
// const pool = new Pool({
//     host: 'db',
//     port: 5432,
//     user: 'user123',
//     password: 'password123',
//     database: 'db123'
// })


const { Pool } = require('pg');

const pool = new Pool({
    connectionString: process.env.DATABASE_URL|| 'postgres://postgres:Test1234.@localhost:5432/capstone_project?search_path=study_buds',
    ssl: process.env.DATABASE_URL ? true : false
})
module.exports = pool