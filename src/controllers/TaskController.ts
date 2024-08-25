import type { Request, Response } from 'express'


export class TaskController {
    static createdProjects = async (req: Request, res: Response) => { 
        const { projectId } = req.params
        try {
            console.log(projectId)
            return
            
        } catch (error) {
            
        }
    }
}