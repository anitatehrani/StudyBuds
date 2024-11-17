import express, { Request, Response, NextFunction } from 'express';
import { config } from 'dotenv';
import indexRouter from './src/routes/index'; // Main router for all API routes

// Load environment variables
config();
process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '0';

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes
app.use('/api', indexRouter); // Mount all routes under "/api"

// Error handling for uncaught errors
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Internal Server Error' });
});

// Start the server
const PORT = process.env.PORT || 1337;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
