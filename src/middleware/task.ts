

import type { Request, Response, NextFunction } from "express";
import Task, { ITask } from "../models/Task";



// añadiendo un type de proyect a la request para que no me salte el error que de que request no tiene este type por ello utilizo la interface para tomar todos los existestes y añadir este
declare global {
    namespace Express {
        interface Request {
            task: ITask
        }
    }
}

export async function taskExists(req : Request , res : Response, next : NextFunction) {
    try {
        
          const { taskId } = req.params
          console.log(taskId)
          const task = await Task.findById(taskId)
            if (!task) {
                const error = new Error('Tarea no encontrada')
                return res.status(404).json({error: error.message})
            }
        req.task = task // le estoy pasando mediante la requeste la informacion validada de middleware para que el controller pueda leer el project
        next()
    } catch (error) {

        res.status(500).json({error: 'Tarea no encontrada'})  // TODO revisar porque esta entrando en catht en ves e estar cumpliendo la condicion anterior
        
    }
}

export function taskBelongsToProject(req: Request, res: Response, next: NextFunction) {
    
    if (req.task.project.toString() !== req.project.id.toString()) {
        const error = new Error('Accion no valida')
        return res.status(400).json({error: error.message})
    } 
    
    next()
}


export function hasAuthorization(req: Request, res: Response, next: NextFunction) {
    
    if (req.user.id.toString() !== req.project.manager.toString()) {
        const error = new Error('Accion no valida')
        return res.status(400).json({error: error.message})
    } 
    
    next()
}