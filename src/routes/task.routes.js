import { Router } from 'express';
import { crearTarea, obtenerTareas } from '../controllers/task.controller.js'

const router = Router()

router.post('/task', crearTarea)
router.get('/task', obtenerTareas)

export default router