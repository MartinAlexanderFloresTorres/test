"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
const db_1 = require("./config/db");
const cors_2 = require("./config/cors");
const projectRouter_1 = __importDefault(require("./routes/projectRouter"));
const authRouter_1 = __importDefault(require("./routes/authRouter"));
//instacia para acceder a los .env
dotenv_1.default.config();
// conectamos en la BBDD
(0, db_1.connectDB)();
//Arrancamos el serve
const app = (0, express_1.default)();
//habilitamos el cors
app.use((0, cors_1.default)(cors_2.corsConfig));
//LogginMorgan
app.use((0, morgan_1.default)('dev'));
//lectura de JSON
app.use(express_1.default.json());
//ROUTES
app.use('/api/auth', authRouter_1.default);
app.use('/api/projects', projectRouter_1.default);
exports.default = app;
//# sourceMappingURL=server.js.map