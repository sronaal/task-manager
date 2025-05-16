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