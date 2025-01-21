import type { Request, Response } from 'express';
import Project from '../models/Project';

export class ProjectController {
  static createdProjects = async (req: Request, res: Response) => {
    const project = new Project(req.body);

    //Asignar un manager
    project.manager = req.user.id; // este req.user.id se lo estoy pasando desde el middleware de autenticate
    try {
      await project.save(); // lo puedo hacer de otra manera como await Project.create(req.body)
      res.send('Proyecto creado correctamente');
    } catch (error) {
      console.log(error);
    }
  };

  static getAllProjects = async (req: Request, res: Response) => {
    try {
      const projects = await Project.find({
        $or: [{ manager: { $in: req.user.id } }, { team: { $in: req.user.id } }],
      });
      res.json(projects);
    } catch (error) {
      console.log(error);
    }
  };
  static getProjectById = async (req: Request, res: Response) => {
    // console.log(req.params)
    const { id } = req.params;
    try {
      const project = await Project.findById(id).populate('tasks');
      if (!project) {
        const error = new Error('Proyecto no encontrado');
        return res.status(404).json({ error: error.message });
      }

      if (project.manager.toString() !== req.user.id && !project.team.includes(req.user.id)) {
        const error = new Error('Accion no valida,no tienes el permiso necesario.');
        return res.status(401).json({ error: error.message });
      }

      res.json(project);
    } catch (error) {
      console.log(error);
    }
  };

  static updateProject = async (req: Request, res: Response) => {
    try {
      req.project.clientName = req.body.clientName;
      req.project.projectName = req.body.projectName;
      req.project.description = req.body.description;
      await req.project.save();
      res.send('proyecto actualizado');
    } catch (error) {
      console.log(error);
    }
  };

  static deleteProject = async (req: Request, res: Response) => {
    try {
      await req.project.deleteOne(); // este metodo elimina una instacia
      res.send('proyecto Eliminado');
    } catch (error) {
      console.log(error);
    }
  };
}
