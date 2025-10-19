import { Request, Response, NextFunction,  } from 'express';

export function errorHandler(err: Error, req: Request, res: Response, next: NextFunction) {
  console.error(err.stack);
  // err.statusCode = err.statusCode || 500;
  // err.status = err.status || "error";
  const isProd = process.env.NODE_ENV === 'production';
  res.status(500).json({
    status: 500,
    message: 'Internal Server Error',
    ...(isProd ? {} : { error: err.message }),
  });
}