import {request, response} from 'express'
import userModel from '../models/user.model.js'
import DaoUser from '../dao/user.dao.js'

const daoUser = new DaoUser()

export const register = async (req = request, res = response) => {

    
        
        const {username, email, password} = req.body
        
        const user =  userModel({
            username,
            email,
            password
        })

        let findUser = await daoUser.buscarUsarioPorEmail(user.email)
        
        if(findUser) res.status(400).json({error: 'User already exists'})
        
        let result = await daoUser.registrarUsuario(user)
        if(!result) return res.status(500).json({error: 'Error registering user'})
        
        res.status(201).json({message: 'User registered successfully'})
}


export const login = async (req = request, res = response) => {}