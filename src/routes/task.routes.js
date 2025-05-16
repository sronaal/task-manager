import { Router } from 'express';
import { crearTarea, obtenerTareas, obtenerTareasId, actualizarTarea, eliminarTarea } from '../controllers/task.controller.js'

const router = Router()

router.post('/task', crearTarea)
router.get('/task', obtenerTareas)
router.get('/task/:id', obtenerTareasId)
router.put('/task/:id', actualizarTarea)
router.delete('/task/:id', eliminarTarea)

export default router