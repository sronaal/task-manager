import {request, response} from 'express'
import DaoTask from '../dao/task.dao.js'
import taskModel from '../models/task.model.js'

const daoTask = new DaoTask()   

export const crearTarea = async (req = request, res = response) => {

    try {
        
        let {title, description, completed, user} = req.body

        let task = new taskModel({
            title,
            description,
            completed,
            user
        })

        let result = await daoTask.crearTarea(task)

        if(!result) return res.status(400).json({msg: "Error al crear la tarea"})
        console.log(result)
        res.status(201).json({msg: "Tarea creada correctamente", result})
        

    } catch (error) {
        console.log(error)
        return res.status(500).json({msg: "Error en el servidor"})
    }
}

export const obtenerTareas = async (req = request, res = response) => {

    try {
        
        let tareas = await daoTask.obtenerTareas()
        if(!tareas) return res.status(400).json({msg: "Error al obtener las tareas"})
    
        res.status(200).json(tareas)
    
    } catch (error) {
        
        return res.status(500).json({msg: "Error en el servidor"})
    }
}

export const obtenerTareasId = async (req = request, res = response) => {

    try {
        
        let {id} = req.params
        let tarea = await daoTask.obtenerTareaPorId(id)
        if(!tarea) return res.status(404).json({msg: `No existe la tarea con id ${id}`})
    
        res.status(200).json(tarea)
    } catch (error) {
        console.log_(error)
        return res.status(500).json({msg: "Error en el servidor"})
    }
}

export const actualizarTarea = async (req = request, res = response) => {

    try {
        
        let {id} = req.params
        let {title, description, completed} = req.body

        let tarea = await daoTask.obtenerTareaPorId(id)
        if(!tarea) return res.status(404).json({msg: `No existe la tarea con id ${id}`})

        let task = new taskModel({
            title,
            description,
            completed
        })

        let result = await daoTask.actualizarTarea(id, task)

        if(!result) return res.status(400).json({msg: "Error al actualizar la tarea"})
    
        res.status(200).json({msg: "Tarea actualizada correctamente", result})
    } catch (error) {
        console.log(error)
        return res.status(500).json({msg: "Error en el servidor"})
    }
}

export const eliminarTarea = async (req = request, res = response) => {

    try {
        
        let {id} = req.params
        let tarea = await daoTask.obtenerTareaPorId(id)
        if(!tarea) return res.status(404).json({msg: `No existe la tarea con id ${id}`})

        let result = await daoTask.eliminarTarea(id)

        if(!result) return res.status(400).json({msg: "Error al eliminar la tarea"})
    
        res.status(200).json({msg: "Tarea eliminada correctamente", result})
    } catch (error) {
        console.log(error)
        return res.status(500).json({msg: "Error en el servidor"})
    }
}