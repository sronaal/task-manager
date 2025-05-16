import jwt from 'jsonwebtoken'
import { request, response } from 'express'
import {config} from '../config.js'


const secret_key = config.secret_jwt

export const crearToken = (usuarioData) => {

    
    let token = jwt.sign(usuarioData,secret_key)

    return token
}


export const verificarToken = (req = request, res = response, next) => {

    
    const accessToken = req.headers['authorization']
    
    if(!accessToken) res.status(401).json({ "mensaje" : "Acceso denegado" })

    jwt.verify(accessToken, secret_key, (err,data) => {

        if(err) return res.status(401).json({ "mensaje": "Acceso denegado" })
    
        next()
    })
}