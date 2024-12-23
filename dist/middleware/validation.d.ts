import { Request, Response, NextFunction } from 'express';
export declare const handleInputsErrors: (req: Request, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>>>;
