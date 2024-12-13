import { Request,Response,NextFunction } from "express";
import jwt from 'jsonwebtoken'
import User from "../models/User";
import { decode } from "punycode";
export const authenticate = async (req : Request ,res : Response, next : NextFunction) => {
    const bearer = req.headers.authorization
    
    if(!bearer){
        const error = new Error('No autorizado')
        return res.status(401).json({error: error.message})
    }

    const token = bearer.split(' ')[1]
    // const [, token] = bearer.split(' ') otra forma de separar el bearer

    try {

        const decoded = jwt.verify(token,process.env.JWT_SECRET)

        if(typeof decoded === 'object' && decoded.id){ // comporbacion para evidar el error de type en decoded.id
            const user = await User.findById(decoded.id)
            console.log(user)
        }
    } catch (error) {
        res.status(500).json({error:'Token no valido'})
    }
    next()
}