import { Router } from "express";
import { ProjectController } from "../controllers/ProjectController";
import { body ,param} from "express-validator";
import { handleInputsErrors } from "../middleware/validation";
import { TaskController } from "../controllers/TaskController";


const router = Router()

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


/** Routes for Tasks */
        

router.post('/:projectId/tasks',TaskController.createdProjects)

export default router