
import type { Request, Response, NextFunction } from "express";
import Project, { IProject } from "../models/Project";


// añadiendo un type de proyecte a la request para que nio me salte el error que de que request no tiene este type por ello utilizo la interface para tomar todos los existestes y añadir este
declare global {
    namespace Express {
        interface Request {
            project: IProject
        }
    }
}

export async function projectExists(req : Request , res : Response, next : NextFunction) {
    try {
        
        const { projectId } = req.params
        const project = await Project.findById(projectId)
        if (!project) {
            const error = new Error("Proyecto no encontrado");
            return res.status(404).json({ error: error.message });
        }
        req.project = project // le estoy pasando mediante la requeste la informacion validada de middleware para que el controller pueda leer el project
        next()
    } catch (error) {

        res.status(500).json({error: 'Hubo un error'})
        
    }
}