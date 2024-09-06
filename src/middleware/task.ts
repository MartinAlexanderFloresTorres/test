import type { Request, Response, NextFunction } from "express";

import Task, { Itask } from "../models/Task";

// añadiendo un type de proyecte a la request para que nio me salte el error que de que request no tiene este type por ello utilizo la interface para tomar todos los existestes y añadir este
declare global {
    namespace Express {
        interface Request {
            task: Itask
        }
    }
}

export async function taskExists(req : Request , res : Response, next : NextFunction) {
    try {
        
          const { taskId } = req.params
          const task = await Task.findById(taskId)
            if (!task) {
                const error = new Error('Tarea no encontrada')
                return res.status(404).json({error: error.message})
            }
        req.task = task // le estoy pasando mediante la requeste la informacion validada de middleware para que el controller pueda leer el project
        next()
    } catch (error) {

        res.status(500).json({error: 'Hubo un error'})
        
    }
}

export function taskBelongsToProject(req: Request, res: Response, next: NextFunction) {
    
    if (req.task.project.toString() !== req.project.id.toString()) {
        const error = new Error('Accion no valida')
        return res.status(400).json({error: error.message})
    } 
    
    next()
}