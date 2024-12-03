import express from 'express';
import indexRouter from './src/routes/index';
import sequelize from './src/config/database';
import { errorHandler } from './src/middlewares/error_handler';
import { getErrorMessage } from './src/utils/api_error';


const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Mount all routes without "/api" prefix
app.use('/', indexRouter);

// Test database connection
sequelize.authenticate()
    .then(() => {
        console.log('Database connected successfully!');
    })
    .catch((error) => {
        console.error('Unable to connect to the database:', getErrorMessage(error));
    });

// Error handling middleware
app.use(errorHandler)

// Start the server
const PORT = Number.parseInt(process.env["SERVER_PORT"]??"5000");
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
