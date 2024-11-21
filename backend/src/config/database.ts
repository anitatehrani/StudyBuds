import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();
console.log(process.env.POSTGRES_DB!);
console.log(process.env.POSTGRES_USER!);
console.log(process.env.POSTGRES_PASSWORD!);
console.log(process.env.POSTGRES_HOST!);
console.log(process.env.POSTGRES_PORT);


// Create a Sequelize instance
const sequelize = new Sequelize(
    process.env.POSTGRES_DB!,       // Database name
    process.env.POSTGRES_USER!,     // Username
    process.env.POSTGRES_PASSWORD!, // Password
    {
        host: process.env.POSTGRES_HOST!, // Remote database host
        port: Number(process.env.POSTGRES_PORT) || 5432, // Database port
        dialect: 'postgres', // PostgreSQL
        logging: console.log, // Enable query logging for debugging (optional)
    }
);

export default sequelize;
