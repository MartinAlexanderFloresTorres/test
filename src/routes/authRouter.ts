import { Router } from "express";
import { AuthController } from "../controllers/Authcontroller";
import { body, param } from "express-validator";
import { handleInputsErrors } from "../middleware/validation";
import { authenticate } from "../middleware/auth";

const router = Router();

router.post(
  "/create-account",
  body("name").notEmpty().withMessage("el nombre no puede ir vacio"),
  body("password")
    .isLength({ min: 8 })
    .withMessage("La contraseñas es muy corta Minimo 8 caracteres"),
  body("password_confirmation").custom((value, { req }) => {
    if (value !== req.body.password) {
      throw new Error("Las contraseñas no son iguales");
    }
    return true;
  }),
  body("email").isEmail().withMessage("Email no valido"),
  handleInputsErrors,
  AuthController.createAccount
);

router.post(
  "/confirm-account",
  body("token").notEmpty().withMessage("el token no puede ir vacio"),
  handleInputsErrors,
  AuthController.confirmAccount
);

router.post(
  "/login",
  body("email").isEmail().withMessage("Email no valido"),
  body("password").notEmpty().withMessage("La contraseña no puede ir vacia"),
  handleInputsErrors,
  AuthController.login
);

router.post(
  "/request-code",
  body("email").isEmail().withMessage("Email no valido"),
  handleInputsErrors,
  AuthController.requestTokenConfirmation
);

router.post(
  "/forgot-password",
  body("email").isEmail().withMessage("Email no valido"),
  handleInputsErrors,
  AuthController.forgotPassword
);

router.post(
  "/validate-token",
  body("token").notEmpty().withMessage("el token no puede ir vacion"),
  handleInputsErrors,
  AuthController.validateToken
)

router.post('/update-password/:token',
    param('token')
      .isNumeric().withMessage('token no valido '),
    
    body("password")
      .isLength({ min: 8 })
      .withMessage("La contraseña es muy corta minimo 8 caracteres"),
    body("password_confirmation").custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error("Las contraseñas no son iguales");
      }
      return true;
    }),
    handleInputsErrors,
    AuthController.updatePasswordWithToken
)

router.get('/user',
  authenticate,
  AuthController.user
)

/** Profile Update */

router.put('/update-profile',
  authenticate,
  body("name").notEmpty().withMessage("el nombre no puede ir vacio"),
  body("email").isEmail().withMessage("Email no valido"),
  handleInputsErrors,
  AuthController.updateProfile
)

router.post('/update-password',
  authenticate,
  body("current_password").notEmpty().withMessage("La contraseña actual no puede ir vacia"),
  body("password")
  .isLength({ min: 8 })
  .withMessage("La contraseña es muy corta minimo 8 caracteres"),
body("password_confirmation").custom((value, { req }) => {
  if (value !== req.body.password) {
    throw new Error("Las contraseñas no son iguales");
  }
  return true;
}),
handleInputsErrors,
AuthController.updatePassword
)

router.post('/check-password',
  authenticate,
  body("password").notEmpty().withMessage("La contraseña no puede ir vacia"),
  handleInputsErrors,
  AuthController.checkPasswordForDelete
)

export default router;
