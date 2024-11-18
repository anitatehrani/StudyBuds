"use strict";
// import { Pool } from 'pg';
Object.defineProperty(exports, "__esModule", { value: true });
var dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
// const pool = new Pool({
//     connectionString: process.env.DATABASE_URL,
// });
// pool.on('connect', () => {
//     console.log('Connected to the PostgreSQL database');
// });
// module.exports = {
//     query: (text, params) => pool.query(text, params),
// };
var sequelize_1 = require("sequelize");
// Create and export a Sequelize instance
var URL = "postgres://".concat(process.env.POSTGRES_USER, ":").concat(process.env.POSTGRES_PASSWORD, "@").concat(process.env.POSTGRES_HOST, ":").concat(process.env.POSTGRES_PORT, "/").concat(process.env.POSTGRES_DB);
console.log('--oooo--');
console.log(URL);
console.log('--oooo--');
var sequelize = new sequelize_1.Sequelize(URL);
exports.default = sequelize;
