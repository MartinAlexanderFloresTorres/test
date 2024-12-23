import type { Request, Response, NextFunction } from "express";
import { Iproject } from "../models/Project";
declare global {
    namespace Express {
        interface Request {
            project: Iproject;
        }
    }
}
export declare function projectExists(req: Request, res: Response, next: NextFunction): Promise<Response<any, Record<string, any>>>;
