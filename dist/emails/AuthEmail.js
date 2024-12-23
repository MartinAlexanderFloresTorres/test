"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthEmail = void 0;
const nodemailer_1 = require("../config/nodemailer");
class AuthEmail {
    static sendConfirmationEamil = async (user) => {
        await nodemailer_1.transporter.sendMail({
            from: 'UpTASK <admin@uptask.com>',
            to: user.email,
            subject: 'Uptask-Confirma tu cuenta',
            text: 'Uptask-Confirma tu cuenta',
            html: `<p> Hola: ${user.name} has creado una cuenta en UpTask, ya casi todo esta listo, solo debes confirmar tu cuenta. 
                      Tu codigo es : <b>${user.token}</b> 
                      ingresalo en el siguiente enlace. <a href="${process.env.FRONTEND_URL}/auth/confirm-account">Confirma tu cuenta </a>.
                      Expira en <b>10min</b> .  </p> 
            
            `
        });
    };
    static sendPasswordResetToken = async (user) => {
        await nodemailer_1.transporter.sendMail({
            from: 'UpTASK <admin@uptask.com>',
            to: user.email,
            subject: 'Uptask-Restabler Contrasenha',
            text: 'Uptask-Restablecer Contrasenha',
            html: `<p> Hola: ${user.name} has solicidato un cambio de contrasenha. Si no fuiste tu que lo solicitaste
                      entre en contacto con nosotros. 
                      Tu codigo es : <b>${user.token}</b> 
                      ingresalo en el siguiente enlace. <a href="${process.env.FRONTEND_URL}/auth/new-password/">restablecer contrasenha </a>.
                      Expira en <b>10min</b> .  </p> 
            
            `
        });
    };
}
exports.AuthEmail = AuthEmail;
//# sourceMappingURL=AuthEmail.js.map