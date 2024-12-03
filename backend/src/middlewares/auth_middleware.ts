import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { BadRequestError, UnhautorizedError } from '../utils/api_error';
import { JWT_SECRET } from '../config/secrets';


const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (token === undefined)
        throw new UnhautorizedError('Access Denied');

    try {
        const verified = jwt.verify(token, JWT_SECRET);
        req.user = verified;
        next();
    } catch (err) {
        throw new BadRequestError('Invalid Token');
    }
};

module.exports = authMiddleware;