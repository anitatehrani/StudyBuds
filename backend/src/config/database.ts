// import { Pool } from 'pg';

// import { config } from 'dotenv';
// config();

// const pool = new Pool({
//     connectionString: process.env.DATABASE_URL,
// });

// pool.on('connect', () => {
//     console.log('Connected to the PostgreSQL database');
// });

// module.exports = {
//     query: (text, params) => pool.query(text, params),
// };


import { Sequelize } from 'sequelize';

// Create and export a Sequelize instance
const sequelize = new Sequelize('postgres://postgres:Test1234.@localhost:5432/studybuds_db');

export default sequelize;
