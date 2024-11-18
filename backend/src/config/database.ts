import dotenv from 'dotenv';
import { Sequelize } from 'sequelize';

// Load environment variables from a `.env` file
dotenv.config();

const { DB_USER, DB_PASSWORD, DB_HOST, DB_PORT, DB_NAME } = process.env;

if (!DB_USER || !DB_PASSWORD || !DB_HOST || !DB_PORT || !DB_NAME) {
    throw new Error('One or more database environment variables are missing.');
}

const sequelize = new Sequelize(`postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}`);

export default sequelize;
