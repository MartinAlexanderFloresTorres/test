import type { Response, Request } from "express";
export declare class AuthController {
    static createAccount: (req: Request, res: Response) => Promise<void>;
    static confirmAccount: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
    static login: (req: Request, res: Response) => Promise<void>;
    static requestTokenConfirmation: (req: Request, res: Response) => Promise<void>;
    static forgotPassword: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
    static validateToken: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
    static updatePasswordWithToken: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
    static user: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
}
