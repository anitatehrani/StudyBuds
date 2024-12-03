import { NextFunction, Request, Response } from "express";



export function asyncWrapper(fn: (_: Request, __: Response) => Promise<void>) {
    return function (req: Request, res: Response, next: NextFunction) {
        fn(req, res).catch(next);
    };
}

