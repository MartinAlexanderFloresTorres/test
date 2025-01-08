import User, { IUser } from "@models/User";
import { Request,Response,NextFunction } from "express";
import jwt from 'jsonwebtoken'


declare global {
    namespace Express {
        interface Request {
            user?: IUser // como no tendra siempre esta interface lo pongo como opcional especificando cual es la interface. 
        }
    }
}

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

        if(typeof decoded === 'object' && decoded.id){ // comprobacion para evitar el error de type en decoded.id
            const user = await User.findById(decoded.id).select('_id name email ') //select => para que me traiga solo estos campos
            if(user){
                req.user = user
                next()
            }else{
                res.status(500).json({error:'token no valido,vuelve iniciar sesion'})
            }
        }
    } catch (error) {
        res.status(500).json({error:'Token no valido'})
    }
    
}