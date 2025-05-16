import taskModel from "../models/task.model.js";

class DaoTask{


    crearTarea(tarea){

        
        return taskModel.create(tarea)
    }

    obtenerTareas(){

        return taskModel.find()
    }

    obtenerTareaPorId(id){

        return taskModel.findById(id)
    }

    actualizarTarea(tarea){

        return taskModel.updateOne({_id: tarea._id}, {$set: tarea})
    }

    eliminarTarea(id){

        return taskModel.deleteOne({_id: id})

    }

    obtenerTareasPorUsuario(){}

    obtenerTareasPorEstado(){}
}


export default DaoTask;