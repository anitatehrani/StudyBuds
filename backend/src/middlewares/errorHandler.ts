// src/middleware/errorHandler.ts
import { NextFunction, Request, Response } from 'express';
import { CustomError } from '../utils/custom_error';

export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
    if (err instanceof CustomError) {
        res.status(err.statusCode).json({
    error: {
        message: err.message,
        status: err.statusCode,
    },
    });
    } else {
    console.error(err);
    res.status(500).json({
        error: {
            message: 'Something went wrong.',
            status: 500,
        },
    });
}
};
