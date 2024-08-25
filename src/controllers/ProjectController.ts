import type { Request, Response } from "express";
import Project from "../models/project";

export class ProjectController {
  static createdProjects = async (req: Request, res: Response) => {
    const project = new Project(req.body);

    try {
      await project.save(); // lo puedo hacer de otra manera como await Project.create(req.body)
      res.send("poryecto creado correctamente");
    } catch (error) {
      console.log(error);
    }
  };

  static getAllProjects = async (req: Request, res: Response) => {
    try {
      const projects = await Project.find();
      res.json(projects);
    } catch (error) {
      console.log(error);
    }
  };
  static getProjectById = async (req: Request, res: Response) => {
    // console.log(req.params)
    const { id } = req.params;
    try {
      const project = await Project.findById(id);
      if (!project) {
        const error = new Error("Proyecto no encontrado");
        return res.status(404).json({ error: error.message });
      }
      res.json(project);
    } catch (error) {
      console.log(error);
    }
  };

  static updateProject = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
      const project = await Project.findByIdAndUpdate(id, req.body);

      if (!project) {
        const error = new Error("Proyecto no encontrado");
        return res.status(404).json({ error: error.message });
      }
      await project.save();
      res.send("proyecto actualizado");
    } catch (error) {
      console.log(error);
    }
  };

  static deleteProject = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
      const project = await Project.findById(id);

      if (!project) {
        const error = new Error("Proyecto no encontrado");
        return res.status(404).json({ error: error.message });
      }

      await project.deleteOne(); // este metodo elimina una instacia
      res.send("proyecto Eliminado");
    } catch (error) {
      console.log(error);
    }
  };
}
