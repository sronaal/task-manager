import { request, response } from 'express'
import bcrypt from 'bcryptjs'
import userModel from '../models/user.model.js'
import DaoUser from '../dao/user.dao.js'
import {crearToken} from '../helpers/jwt.js'

const daoUser = new DaoUser()

export const register = async (req = request, res = response) => {



    try {
        const { username, email, password } = req.body

        const hash = bcrypt.hashSync(password, 10)

        const user = userModel({
            username,
            email,
            password: hash
        })

        let findUser = await daoUser.buscarUsarioPorEmail(user.email)
        if (findUser) res.status(400).json({ error: 'User already exists' })

        let result = await daoUser.registrarUsuario(user)
        if (!result) return res.status(500).json({ error: 'Error registering user' })

        res.status(201).json({ message: 'User registered successfully' })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: 'Internal server error' })

    }
}


export const login = async (req = request, res = response) => {

    try {
        const { email, password } = req.body

        const user = await daoUser.buscarUsarioPorEmail(email)
        if (!user) return res.status(404).json({ error: 'User not found' })

        const isMatch = bcrypt.compareSync(password, user.password)
        if (!isMatch) return res.status(401).json({ error: 'Invalid credentials' })

        let userData = {
            id: user._id,
            username: user.username,
            email: user.email
        }
        let token = crearToken(userData)    
        res.status(200).json({ 'msg' : 'Loggin succefull', token })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: 'Internal server error' })
    }
 }