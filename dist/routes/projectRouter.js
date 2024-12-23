"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const ProjectController_1 = require("../controllers/ProjectController");
const express_validator_1 = require("express-validator");
const validation_1 = require("../middleware/validation");
const TaskController_1 = require("../controllers/TaskController");
const project_1 = require("../middleware/project");
const task_1 = require("../middleware/task");
const auth_1 = require("../middleware/auth");
const TeamController_1 = require("../controllers/TeamController");
const router = (0, express_1.Router)();
router.use(auth_1.authenticate); //  como todos mis endpoints tendran ruta protegida evito estar poniendo el middleware en todos los endP.
router.post('/', (0, express_validator_1.body)('projectName')
    .notEmpty().withMessage('El nombre del Proyecto es Obligatorio'), (0, express_validator_1.body)('clientName')
    .notEmpty().withMessage('El nombre del Cliente es Obligatorio'), (0, express_validator_1.body)('description')
    .notEmpty().withMessage('La description del Proyecto es Obligatorio'), validation_1.handleInputsErrors, ProjectController_1.ProjectController.createdProjects);
router.get('/', ProjectController_1.ProjectController.getAllProjects);
router.get('/:id', (0, express_validator_1.param)('id').isMongoId().withMessage('Id no valido'), validation_1.handleInputsErrors, ProjectController_1.ProjectController.getProjectById);
router.put('/:id', (0, express_validator_1.param)('id').isMongoId().withMessage('Id no valido'), (0, express_validator_1.body)('projectName')
    .notEmpty().withMessage('El nombre del Proyecto es Obligatorio'), (0, express_validator_1.body)('clientName')
    .notEmpty().withMessage('El nombre del Cliente es Obligatorio'), (0, express_validator_1.body)('description')
    .notEmpty().withMessage('La description del Proyecto es Obligatorio'), validation_1.handleInputsErrors, ProjectController_1.ProjectController.updateProject);
router.delete('/:id', (0, express_validator_1.param)('id').isMongoId().withMessage('Id no valido'), validation_1.handleInputsErrors, ProjectController_1.ProjectController.deleteProject);
//  Routes for Tasks
router.param('projectId', project_1.projectExists); //estoy utlizando la funcion de param para especificar que cada vez que tennga un projectid como params ejecute el middleware validateProjectExists para no tener que ponerlo en todas las rutas y repertirlo
router.post('/:projectId/tasks', (0, express_validator_1.body)('name')
    .notEmpty().withMessage('El nombre de la tarea es Obligatorio'), (0, express_validator_1.body)('description')
    .notEmpty().withMessage('La description de la tarea es obligatoria'), validation_1.handleInputsErrors, TaskController_1.TaskController.createdTask);
router.get('/:projectId/tasks', TaskController_1.TaskController.getProjectTasks);
// middleware en funcion  de los params 
router.param('taskId', task_1.taskExists);
router.param('taskId', task_1.taskBelongsToProject);
router.get('/:projectId/tasks/:taskId', (0, express_validator_1.param)('taskId').isMongoId().withMessage('Id no valido'), validation_1.handleInputsErrors, TaskController_1.TaskController.getTaskByID);
router.put('/:projectId/tasks/:taskId', (0, express_validator_1.param)('taskId').isMongoId().withMessage('Id no valido'), (0, express_validator_1.body)('name')
    .notEmpty().withMessage('El nombre de la tarea es Obligatorio'), (0, express_validator_1.body)('description')
    .notEmpty().withMessage('La description de la tarea es obligatoria'), validation_1.handleInputsErrors, TaskController_1.TaskController.updateTask);
router.delete('/:projectId/tasks/:taskId', (0, express_validator_1.param)('taskId').isMongoId().withMessage('Id no valido'), validation_1.handleInputsErrors, TaskController_1.TaskController.deleteTask);
router.post('/:projectId/tasks/:taskId/status', (0, express_validator_1.param)('taskId').isMongoId().withMessage('Id no valido'), (0, express_validator_1.body)('status')
    .notEmpty().withMessage('El estado es obligatorio'), validation_1.handleInputsErrors, TaskController_1.TaskController.updateTaskStatus);
/** Routes for Teams */
router.get('/:projectId/team/', TeamController_1.TeamMemberController.getProjectTeam);
router.post('/:projectId/team/find', (0, express_validator_1.body)('email').isEmail().toLowerCase().withMessage('Email no valido'), validation_1.handleInputsErrors, TeamController_1.TeamMemberController.findMemberByEmail);
router.post('/:projectId/team/', (0, express_validator_1.body)('id')
    .isMongoId().withMessage('ID no valido'), validation_1.handleInputsErrors, TeamController_1.TeamMemberController.addMemberById);
router.delete('/:projectId/team/:idUser', (0, express_validator_1.param)('idUser')
    .isMongoId().withMessage('ID no valido'), validation_1.handleInputsErrors, TeamController_1.TeamMemberController.removeMemberById);
exports.default = router;
//# sourceMappingURL=projectRouter.js.map