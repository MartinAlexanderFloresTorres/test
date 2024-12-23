"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.taskExists = taskExists;
exports.taskBelongsToProject = taskBelongsToProject;
const Task_1 = __importDefault(require("../models/Task"));
async function taskExists(req, res, next) {
    try {
        const { taskId } = req.params;
        console.log(taskId);
        const task = await Task_1.default.findById(taskId);
        if (!task) {
            const error = new Error('Tarea no encontrada');
            return res.status(404).json({ error: error.message });
        }
        req.task = task; // le estoy pasando mediante la requeste la informacion validada de middleware para que el controller pueda leer el project
        next();
    }
    catch (error) {
        res.status(500).json({ error: 'Tarea no encontrada' }); // TODO revisar porque esta entrando en catht en ves e estar cumpliendo la condicion anterior
    }
}
function taskBelongsToProject(req, res, next) {
    if (req.task.project.toString() !== req.project.id.toString()) {
        const error = new Error('Accion no valida');
        return res.status(400).json({ error: error.message });
    }
    next();
}
//# sourceMappingURL=task.js.map