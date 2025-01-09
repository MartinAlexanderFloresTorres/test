import type { Response, Request } from "express";

import { checkPassword, hashPassword } from "../utils/auth";
import { genarateToken } from "../utils/token";
import { AuthEmail } from "../emails/AuthEmail";
import { generateJWT } from "../utils/jwt";
import User from "../models/User";
import Token from "../models/token";


export class AuthController {
  static createAccount = async (req: Request, res: Response) => {
    try {
      const { password, email } = req.body;

      //prevenir duplicados
      const userExists = await User.findOne({ email });
      if (userExists) {
        const error = new Error("Este Eamil ya esta registrado");
        res.status(409).json({ error: error.message });
      }

      //Crea un Usuario
      const user = new User(req.body);
      //hash Password
      user.password = await hashPassword(password);

      //Generar el token de confirmacion
      const token = new Token();
      token.token = genarateToken();
      token.user = user.id;

      // Enviando email de confirmacion
      AuthEmail.sendConfirmationEamil({
        email: user.email,
        name: user.name,
        token: token.token,
      });

      await Promise.allSettled([token.save(),user.save()]);
      res.send("Cuenta creada, revisa tu email para confirmala.");
    } catch (error) {
      res.status(500).json({ error: "Hubo un Error al crear la cuenta" });
    }
  };

  static confirmAccount = async (req: Request, res: Response) => {
    try {
      const { token } = req.body;
      const tokenExist = await Token.findOne({ token });
      if (!tokenExist) {
        const error = new Error("Token no valido o expirado,solicite otro.");
        return res.status(404).json({ error: error.message });
      }
      const user = await User.findById(tokenExist.user);
      user.confirmed = true;

      await Promise.allSettled([user.save(), tokenExist.deleteOne()]);
      res.send("Cuenta confirmada correctamente");
    } catch (error) {
      res
        .status(500)
        .json({
          error: "Hubo un Error al confirmar la cuenta, contacte con RH.",
        });
    }
  };

  static login = async (req: Request, res: Response) => {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email });
      if (!user) {
        const error = new Error("Usuario no encontrado");
        res.status(404).json({ error: error.message });
        return
      }
      if (!user.confirmed) {
        const token = new Token();
        token.user = user.id;
        token.token = genarateToken();
        await token.save();

        // Renviando email de confirmacion
        AuthEmail.sendConfirmationEamil({
          email: user.email,
          name: user.name,
          token: token.token,
        });

        const error = new Error("la cuenta no ha sido confirmada,te hemos reinvidado un codigo a tu email para que puedeas confirmar tu cuenta");
        res.status(401).json({ error: error.message });
        return
      }

      //comprobar el password

      const isPasswordCorrect = await checkPassword(password,user.password)
      if (!isPasswordCorrect){
        const error = new Error("Password Incorrecto");
        res.status(404).json({ error: error.message });
        return
      }

      const tokenJWT = generateJWT({id: user.id})
      res.send(tokenJWT)

    } catch (error) {
      res
        .status(500)
        .json({ error: "Hubo un Error de inicio de sesion, contacte con RH." });
    }
  };

  static  requestTokenConfirmation = async (req: Request, res: Response) => {
    try {
      const { email } = req.body;

      //Existe Usuario ? 
      const user = await User.findOne({ email });
      if (!user) {
        const error = new Error("Este usuario no esta registrado");
        res.status(404).json({ error: error.message });
        return
      }

      if(user.confirmed){
        const error = new Error("Este usuario ya esta confirmado");
        res.status(403).json({ error: error.message });
        return
      }

      //Generar el token de confirmacion
      const token = new Token();
      token.token = genarateToken();
      token.user = user.id;

      // Enviando email de confirmacion
      AuthEmail.sendConfirmationEamil({
        email: user.email,
        name: user.name,
        token: token.token,
      });

      await Promise.allSettled([token.save(),/* user.save() */]);
      res.send("Te hemos enviado un Nuevo token a tu Email");
    } catch (error) {
      res.status(500).json({ error: "Hubo un Error al crear la cuenta" });
    }
  };

  static  forgotPassword = async (req: Request, res: Response) => {
    try {
      const { email } = req.body;
  
      //Existe Usuario ? 
      const user = await User.findOne({ email });
      if (!user) {
        const error = new Error("Este usuario no esta registrado");
        res.status(404).json({ error: error.message });
        return
      }

      //Generar el token de confirmacion
      const token = new Token();
      token.token = genarateToken();
      token.user = user.id;
      await token.save()

      // Enviando email de Cambio de contrasenha
      AuthEmail.sendPasswordResetToken({
        email: user.email,
        name: user.name,
        token: token.token,
      });

      
      return res.send("Revisa tu email para instrucciones");
    } catch (error) {
      res.status(500).json({ error: "Hubo un Error al restablecer la contrasenha intentalo mas tarde" });
    }
  };

  static validateToken = async (req: Request, res: Response) => {
    try {
      const { token } = req.body;
      const tokenExist = await Token.findOne({ token });
      if (!tokenExist) {
        const error = new Error("Token no valido o expirado,solicite otro.");
        return res.status(404).json({ error: error.message });
      }
      
        return res.send("Token valido, ya puedes restablecer el password");
    } catch (error) {
      res
        .status(500)
        .json({
          error: "Hubo un Error al confirmar el Token, contacte con RH.",
        });
    }
  };
  static updatePasswordWithToken = async (req: Request, res: Response) => {
    try {
      const { token } = req.params;
      const tokenExist = await Token.findOne({ token });
      if (!tokenExist) {
        const error = new Error("Token no valido o expirado,solicite otro.");
        return res.status(404).json({ error: error.message });
      }
      
        const user =await User.findById(tokenExist.user)
        const {password} = req.body
        user.password = await hashPassword(password)
  
        await Promise.allSettled([user.save(),tokenExist.deleteOne()])
  
        return res.send("El password se modifico correctamente");
    } catch (error) {
      res
        .status(500)
        .json({
          error: "Hubo un Error al confirmar el Token, contacte con RH.",
        });
    }
  };
  static user = async (req: Request, res: Response) => {
    return res.json(req.user)
  };
}

