import { NextFunction, Request, Response } from "express";



export function asyncWrapper(fn: (_: Request) => Promise<unknown>) {
    return function (req: Request, res: Response, next: NextFunction) {
        fn(req).then((value)=>res.send(value)).catch(next);
    };
}

