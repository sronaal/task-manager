import userModel from '../models/user.model.js';

class DaoUser{


    buscarUsarioPorEmail(email){

        return userModel.findOne({email: email})
    }

    registrarUsuario(user){

        return userModel.create(user)
    }
}


export default DaoUser;