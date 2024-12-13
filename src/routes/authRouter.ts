import { Router } from "express";
import { AuthController } from "../controllers/Authcontroller";
import { body, param } from "express-validator";
import { handleInputsErrors } from "../middleware/validation";

const router = Router();

router.post(
  "/create-account",
  body("name").notEmpty().withMessage("el nombre no puede ir vacio"),
  body("password")
    .isLength({ min: 8 })
    .withMessage("El password es muy corto.Minimo 8 caracteres"),
  body("password_confirmation").custom((value, { req }) => {
    if (value !== req.body.password) {
      throw new Error("Los password no son iguales");
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
  body("password").notEmpty().withMessage("El password no puede ir vacio"),
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
      .withMessage("El password es muy corto.Minimo 8 caracteres"),
    body("password_confirmation").custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error("Los password no son iguales");
      }
      return true;
    }),
    handleInputsErrors,
    AuthController.updatePasswordWithToken
)

export default router;
