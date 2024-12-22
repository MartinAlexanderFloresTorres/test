import { Router } from "express";
import { ProjectController } from "../controllers/ProjectController";
import { body ,param} from "express-validator";
import { handleInputsErrors } from "../middleware/validation";
import { TaskController } from "../controllers/TaskController";
import { projectExists } from "../middleware/project";
import { taskBelongsToProject, taskExists } from "../middleware/task";
import { authenticate } from "../middleware/auth";
import { TeamMemberController } from "../controllers/TeamController";


const router = Router()

router.use(authenticate) //  como todos mis endpoints tendran ruta protegida evito estar poniendo el middleware en todos los endP.

router.post('/',
    body('projectName')
        .notEmpty().withMessage('El nombre del Proyecto es Obligatorio'),
    body('clientName')
        .notEmpty().withMessage('El nombre del Cliente es Obligatorio'),
    body('description')
        .notEmpty().withMessage('La description del Proyecto es Obligatorio'),
    handleInputsErrors,
    ProjectController.createdProjects)

router.get('/', ProjectController.getAllProjects)

router.get('/:id',
    param('id').isMongoId().withMessage('Id no valido'),
    handleInputsErrors,
    ProjectController.getProjectById)

router.put('/:id',
    param('id').isMongoId().withMessage('Id no valido'),
    body('projectName')
        .notEmpty().withMessage('El nombre del Proyecto es Obligatorio'),
    body('clientName')
        .notEmpty().withMessage('El nombre del Cliente es Obligatorio'),
    body('description')
        .notEmpty().withMessage('La description del Proyecto es Obligatorio'),
        handleInputsErrors,
    ProjectController.updateProject)
     
    router.delete('/:id',
        param('id').isMongoId().withMessage('Id no valido'),
        handleInputsErrors,
        ProjectController.deleteProject)


//  Routes for Tasks

router.param('projectId',projectExists) //estoy utlizando la funcion de param para especificar que cada vez que tennga un projectid como params ejecute el middleware validateProjectExists para no tener que ponerlo en todas las rutas y repertirlo

router.post('/:projectId/tasks',
        body('name')
        .notEmpty().withMessage('El nombre de la tarea es Obligatorio'),
        body('description')
        .notEmpty().withMessage('La description de la tarea es obligatoria'),
        handleInputsErrors
        , TaskController.createdTask)


router.get('/:projectId/tasks',
        TaskController.getProjectTasks
)
// middleware en funcion  de los params 
router.param('taskId', taskExists)
router.param('taskId', taskBelongsToProject)


router.get('/:projectId/tasks/:taskId',
    param('taskId').isMongoId().withMessage('Id no valido'),
         handleInputsErrors,
        TaskController.getTaskByID
)

router.put('/:projectId/tasks/:taskId',
    param('taskId').isMongoId().withMessage('Id no valido'),
    body('name')
    .notEmpty().withMessage('El nombre de la tarea es Obligatorio'),
    body('description')
    .notEmpty().withMessage('La description de la tarea es obligatoria'),
    handleInputsErrors,
    TaskController.updateTask

)

router.delete('/:projectId/tasks/:taskId',
    param('taskId').isMongoId().withMessage('Id no valido'),
         handleInputsErrors,
        TaskController.deleteTask
)

router.post('/:projectId/tasks/:taskId/status',
    param('taskId').isMongoId().withMessage('Id no valido'),
    body('status')
        .notEmpty().withMessage('El estado es obligatorio'),
    handleInputsErrors,
    TaskController.updateTaskStatus

    
)

/** Routes for Teams */

router.get('/:projectId/team/',TeamMemberController.getProjectTeam)

router.post('/:projectId/team/find',
    body('email').isEmail().toLowerCase().withMessage('Email no valido'),
    handleInputsErrors,
    TeamMemberController.findMemberByEmail

)
router.post('/:projectId/team/',
    body('id')
    .isMongoId().withMessage('ID no valido'),
    handleInputsErrors,
    TeamMemberController.addMemberById

)
router.delete('/:projectId/team/:idUser',
    param('idUser')
    .isMongoId().withMessage('ID no valido'),
    handleInputsErrors,
    TeamMemberController.removeMemberById

)


export default router