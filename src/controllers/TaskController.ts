
import type { Request, Response } from "express";
import Task from "../models/Task";



export class TaskController {
  static createdTask = async (req: Request, res: Response) => {
    try {
      const task = new Task(req.body);
      task.project = req.project.id; // agragando el id del proyecto a la tarea
      req.project.tasks.push(task.id); // agregrando a proyecto el id de cada tarea
      // await task.save() // guardando en BBDD la tarea
      // await req.project.save()
      // estos dos awaits podemos evitar ya que pueden ejecutarse de manera simultanea ya que fue validado y son independientes
      await Promise.allSettled([task.save(), req.project.save()]); // finaliza los dos si tiene algun error se manda al catch para debbuguear
      res.send("Tarea Creada correctamente");
    } catch (error) {
      res.status(500).json({ error: "Hubo un error" });
    }
  };

  static getProjectTasks = async (req: Request, res: Response) => {
    try {
      const tasks = await Task.find({ project: req.project.id }).populate(
        "project"
      );
      res.status(200).json(tasks);
    } catch (error) {
      res.status(500).json({ error: "Hubo un error" });
    }
  };

  static getTaskByID = async (req: Request, res: Response) => {
    try {
      const task = await Task.findById(req.task.id).populate({
        path: "completedBy.user",
        select: "id name email",
      });

      res.status(200).json(task);
    } catch (error) {
      res.status(500).json({ error: "Tarea no encontrada" });
    }
  };

  static updateTask = async (req: Request, res: Response) => {
    try {
      req.task.name = req.body.name;
      req.task.description = req.body.description;
      await req.task.save();
      res.status(200).send("tarea Actualizada correctamente");
    } catch (error) {
      res.status(500).json({ error: "Hubo un error" });
    }
  };

  static deleteTask = async (req: Request, res: Response) => {
    try {
      req.project.tasks = req.project.tasks.filter(
        (task) => task.toString() !== req.task.id.toString()
      ); //eliminando de la lista de tarea del project correspondiente.
      await Promise.allSettled([req.task.deleteOne(), req.project.save()]);
      res.status(200).send("tarea eliminada correctamente");
    } catch (error) {
      res.status(500).json({ error: "Hubo un error" });
    }
  };

  static updateTaskStatus = async (req: Request, res: Response) => {
    try {
      const { status } = req.body;
      req.task.status = status;
      const data = {
        user: req.user.id,
        status
      }
      req.task.completedBy.push(data)
      await req.task.save();
      res.status(200).send("Tarea Actualizada");
    } catch (error) {
      res.status(500).json({ error: "Hubo un error" });
    }
  };
}
