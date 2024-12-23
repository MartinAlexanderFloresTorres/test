"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Authcontroller_1 = require("../controllers/Authcontroller");
const express_validator_1 = require("express-validator");
const validation_1 = require("../middleware/validation");
const auth_1 = require("../middleware/auth");
const router = (0, express_1.Router)();
router.post("/create-account", (0, express_validator_1.body)("name").notEmpty().withMessage("el nombre no puede ir vacio"), (0, express_validator_1.body)("password")
    .isLength({ min: 8 })
    .withMessage("El password es muy corto.Minimo 8 caracteres"), (0, express_validator_1.body)("password_confirmation").custom((value, { req }) => {
    if (value !== req.body.password) {
        throw new Error("Los password no son iguales");
    }
    return true;
}), (0, express_validator_1.body)("email").isEmail().withMessage("Email no valido"), validation_1.handleInputsErrors, Authcontroller_1.AuthController.createAccount);
router.post("/confirm-account", (0, express_validator_1.body)("token").notEmpty().withMessage("el token no puede ir vacio"), validation_1.handleInputsErrors, Authcontroller_1.AuthController.confirmAccount);
router.post("/login", (0, express_validator_1.body)("email").isEmail().withMessage("Email no valido"), (0, express_validator_1.body)("password").notEmpty().withMessage("El password no puede ir vacio"), validation_1.handleInputsErrors, Authcontroller_1.AuthController.login);
router.post("/request-code", (0, express_validator_1.body)("email").isEmail().withMessage("Email no valido"), validation_1.handleInputsErrors, Authcontroller_1.AuthController.requestTokenConfirmation);
router.post("/forgot-password", (0, express_validator_1.body)("email").isEmail().withMessage("Email no valido"), validation_1.handleInputsErrors, Authcontroller_1.AuthController.forgotPassword);
router.post("/validate-token", (0, express_validator_1.body)("token").notEmpty().withMessage("el token no puede ir vacion"), validation_1.handleInputsErrors, Authcontroller_1.AuthController.validateToken);
router.post('/update-password/:token', (0, express_validator_1.param)('token')
    .isNumeric().withMessage('token no valido '), (0, express_validator_1.body)("password")
    .isLength({ min: 8 })
    .withMessage("El password es muy corto.Minimo 8 caracteres"), (0, express_validator_1.body)("password_confirmation").custom((value, { req }) => {
    if (value !== req.body.password) {
        throw new Error("Los password no son iguales");
    }
    return true;
}), validation_1.handleInputsErrors, Authcontroller_1.AuthController.updatePasswordWithToken);
router.get('/user', auth_1.authenticate, Authcontroller_1.AuthController.user);
exports.default = router;
//# sourceMappingURL=authRouter.js.map