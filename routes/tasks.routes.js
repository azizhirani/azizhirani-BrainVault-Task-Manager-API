import express from 'express';
import {
    createTask,
    getTasks,
    getTaskById,
    updateTask,
    deleteTask
} from '#controllers/tasks.controllers';
import validateTask from '#middlewares/taskValidator.middlewares';

const router = express.Router();

router.post('/', validateTask, createTask);
router.get('/', getTasks);
router.get('/:id', getTaskById);
router.put('/:id', validateTask, updateTask);
router.delete('/:id', deleteTask);

export { router as taskRouter};
