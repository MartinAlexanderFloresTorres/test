import type { Request, Response } from 'express';
export declare class TaskController {
    static createdTask: (req: Request, res: Response) => Promise<void>;
    static getProjectTasks: (req: Request, res: Response) => Promise<void>;
    static getTaskByID: (req: Request, res: Response) => Promise<void>;
    static updateTask: (req: Request, res: Response) => Promise<void>;
    static deleteTask: (req: Request, res: Response) => Promise<void>;
    static updateTaskStatus: (req: Request, res: Response) => Promise<void>;
}
