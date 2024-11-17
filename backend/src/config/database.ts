// import { Pool } from 'pg';

import { config } from 'dotenv';
config();

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
const URL = `postgres://${process.env.POSTGRES_USER}:${process.env.POSTGRES_PASSWORD}@${process.env.POSTGRES_HOST}:${process.env.POSTGRES_PORT}/${process.env.POSTGRES_DB}`;
console.log('--oooo--');
console.log(URL);
console.log('--oooo--');
const sequelize = new Sequelize(URL);

export default sequelize;
