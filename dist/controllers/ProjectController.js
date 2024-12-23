"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProjectController = void 0;
const Project_1 = __importDefault(require("../models/Project"));
class ProjectController {
    static createdProjects = async (req, res) => {
        const project = new Project_1.default(req.body);
        //Asignar un manager 
        project.manager = req.user.id; // este req.user.id se lo estoy pasando desde el middleware de autenticate
        try {
            await project.save(); // lo puedo hacer de otra manera como await Project.create(req.body)
            res.send("Proyecto creado correctamente");
        }
        catch (error) {
            console.log(error);
        }
        ;
    };
    static getAllProjects = async (req, res) => {
        try {
            const projects = await Project_1.default.find({
                $or: [
                    { manager: { $in: req.user.id } }
                ]
            });
            res.json(projects);
        }
        catch (error) {
            console.log(error);
        }
    };
    static getProjectById = async (req, res) => {
        // console.log(req.params)
        const { id } = req.params;
        try {
            const project = await Project_1.default.findById(id).populate('tasks');
            if (!project) {
                const error = new Error("Proyecto no encontrado");
                return res.status(404).json({ error: error.message });
            }
            if (project.manager.toString() !== req.user.id) {
                const error = new Error("Accion no valida,no tienes el permiso necesario.");
                return res.status(401).json({ error: error.message });
            }
            res.json(project);
        }
        catch (error) {
            console.log(error);
        }
    };
    static updateProject = async (req, res) => {
        const { id } = req.params;
        try {
            const project = await Project_1.default.findById(id);
            if (!project) {
                const error = new Error("Proyecto no encontrado");
                return res.status(404).json({ error: error.message });
            }
            if (project.manager.toString() !== req.user.id) {
                const error = new Error("Solo el administrador puede actualizar el proyecto");
                return res.status(401).json({ error: error.message });
            }
            project.clientName = req.body.clientName;
            project.projectName = req.body.projectName;
            project.description = req.body.description;
            await project.save();
            res.send("proyecto actualizado");
        }
        catch (error) {
            console.log(error);
        }
    };
    static deleteProject = async (req, res) => {
        const { id } = req.params;
        try {
            const project = await Project_1.default.findById(id);
            if (!project) {
                const error = new Error("Proyecto no encontrado");
                return res.status(404).json({ error: error.message });
            }
            if (project.manager.toString() !== req.user.id) {
                const error = new Error("Solo el administrador puede eliminar el proyecto");
                return res.status(401).json({ error: error.message });
            }
            await project.deleteOne(); // este metodo elimina una instacia
            res.send("proyecto Eliminado");
        }
        catch (error) {
            console.log(error);
        }
    };
}
exports.ProjectController = ProjectController;
//# sourceMappingURL=ProjectController.js.map