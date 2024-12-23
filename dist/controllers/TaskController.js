"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskController = void 0;
const Task_1 = __importDefault(require("../models/Task"));
class TaskController {
    static createdTask = async (req, res) => {
        try {
            const task = new Task_1.default(req.body);
            task.project = req.project.id; // agragando el id del proyecto a la tarea 
            req.project.tasks.push(task.id); // agregrando a proyecto el id de cada tarea 
            // await task.save() // guardando en BBDD la tarea
            // await req.project.save()
            // estos dos awaits podemos evitar ya que pueden ejecutarse de manera simultanea ya que fue validado y son independientes
            await Promise.allSettled([task.save(), req.project.save()]); // finaliza los dos si tiene algun error se manda al catch para debbuguear 
            res.send('Tarea Creada correctamente');
        }
        catch (error) {
            res.status(500).json({ error: 'Hubo un error' });
        }
    };
    static getProjectTasks = async (req, res) => {
        try {
            const tasks = await Task_1.default.find({ project: req.project.id }).populate('project');
            res.status(200).json(tasks);
        }
        catch (error) {
            res.status(500).json({ error: 'Hubo un error' });
        }
    };
    static getTaskByID = async (req, res) => {
        try {
            res.status(200).json(req.task);
        }
        catch (error) {
            res.status(500).json({ error: 'Tarea no encontrada' });
        }
    };
    static updateTask = async (req, res) => {
        try {
            req.task.name = req.body.name;
            req.task.description = req.body.description;
            await req.task.save();
            res.status(200).send('tarea Actualizada correctamente');
        }
        catch (error) {
            res.status(500).json({ error: 'Hubo un error' });
        }
    };
    static deleteTask = async (req, res) => {
        try {
            req.project.tasks = req.project.tasks.filter(task => task.toString() !== req.task.id.toString()); //eliminando de la lista de tarea del project correspondiente.
            await Promise.allSettled([req.task.deleteOne(), req.project.save()]);
            res.status(200).send('tarea eliminada correctamente');
        }
        catch (error) {
            res.status(500).json({ error: 'Hubo un error' });
        }
    };
    static updateTaskStatus = async (req, res) => {
        try {
            const { status } = req.body;
            req.task.status = status;
            await req.task.save();
            res.status(200).send('Tarea Actualizada');
        }
        catch (error) {
            res.status(500).json({ error: 'Hubo un error' });
        }
    };
}
exports.TaskController = TaskController;
//# sourceMappingURL=TaskController.js.map