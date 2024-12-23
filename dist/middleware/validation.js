"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleInputsErrors = void 0;
const express_validator_1 = require("express-validator");
const handleInputsErrors = async (req, res, next) => {
    let errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};
exports.handleInputsErrors = handleInputsErrors;
//# sourceMappingURL=validation.js.map