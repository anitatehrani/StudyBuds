import express, { Request, Response, NextFunction } from 'express';
import indexRouter from './src/routes/index';
import sequelize from './src/config/database';
//require('express-async-errors');


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
        console.error('Unable to connect to the database:', error.message);
    });

// Error handling middleware
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    console.log("Ciaoooooooo")
    console.error(err.stack);
    res.status(500).json({ error: 'Internal Server Error' });
});

// Start the server
const PORT = process.env.SERVER_PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
