"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticate = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const User_1 = __importDefault(require("../models/User"));
const authenticate = async (req, res, next) => {
    const bearer = req.headers.authorization;
    if (!bearer) {
        const error = new Error('No autorizado');
        return res.status(401).json({ error: error.message });
    }
    const token = bearer.split(' ')[1];
    // const [, token] = bearer.split(' ') otra forma de separar el bearer
    try {
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        if (typeof decoded === 'object' && decoded.id) { // comprobacion para evitar el error de type en decoded.id
            const user = await User_1.default.findById(decoded.id).select('_id name email '); //select => para que me traiga solo estos campos
            if (user) {
                req.user = user;
                next();
            }
            else {
                res.status(500).json({ error: 'token no valido,vuelve iniciar sesion' });
            }
        }
    }
    catch (error) {
        res.status(500).json({ error: 'Token no valido' });
    }
};
exports.authenticate = authenticate;
//# sourceMappingURL=auth.js.map