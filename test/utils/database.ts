import { Sequelize } from 'sequelize';


// Create a Sequelize instance
const sequelize = new Sequelize(
    process.env["DB_URL"]!,
    {
        // dialect: 'postgres', // PostgreSQL
        logging: console.log, // Enable query logging for debugging (optional)
    }
);

export default sequelize;
