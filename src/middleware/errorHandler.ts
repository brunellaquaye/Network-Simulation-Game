import { Request, Response, NextFunction,  } from 'express';

export function errorHandler(err:Error, req:Request, res:Response, next:NextFunction) {
    console.error(err.stack);
    res.status(500).json({ status: 500, message: 'Internal Server Error', error: err.message });
}