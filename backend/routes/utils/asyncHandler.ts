import { Request, Response, NextFunction } from 'express';

/**
 * This wrapper function will allow us
 * to use express's error handler for
 * async/await without having to
 * wrap every route in a try/catch block
 * 
 * This treats the async function call as a promise
 * and passes the error to express using the next function
 */
export default function(handler: any) {
  return (req: Request, res: Response, next: NextFunction) => {
    handler(req, res, next).catch(next);
  }
};