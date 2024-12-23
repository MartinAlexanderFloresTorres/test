import type { Request, Response, NextFunction } from "express";
import { Itask } from "../models/Task";
declare global {
    namespace Express {
        interface Request {
            task: Itask;
        }
    }
}
export declare function taskExists(req: Request, res: Response, next: NextFunction): Promise<Response<any, Record<string, any>>>;
export declare function taskBelongsToProject(req: Request, res: Response, next: NextFunction): Response<any, Record<string, any>>;
