import express from 'express'
import { newTask  , getTask , updateTask, deleteTask} from '../controllers/task.js';
import { isAuthenticated } from '../middleware/auth.js';

const router = express.Router();

router.post('/new' , isAuthenticated , newTask);
router.get('/my' , isAuthenticated , getTask);
router.put('/:id' , isAuthenticated , updateTask);
router.delete('/:id' , isAuthenticated , deleteTask);

export default router;