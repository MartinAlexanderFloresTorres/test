"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TeamMemberController = void 0;
const User_1 = __importDefault(require("../models/User"));
const Project_1 = __importDefault(require("../models/Project"));
class TeamMemberController {
    static getProjectTeam = async (req, res) => {
        const project = await Project_1.default.findById(req.project.id).populate({
            path: 'team',
            select: ' name id email'
        });
        res.json(project.team);
    };
    static findMemberByEmail = async (req, res) => {
        const { email } = req.body;
        //Find User
        const user = (await User_1.default.findOne({ email }).select('name email id'));
        if (!user) {
            const error = new Error('Usuario no encontrado');
            return res.status(404).json({ error: error.message });
        }
        res.json(user);
    };
    static addMemberById = async (req, res) => {
        const { id } = req.body;
        const user = await User_1.default.findById(id).select('id');
        if (!user) {
            const error = new Error('Ussuario no encontrado');
            return res.status(404).json({ error: error.message });
        }
        if (req.project.team.some(team => team.toString() === user.id.toString())) {
            const error = new Error('Este Usuario ya existe en este proyecto');
            return res.status(409).json({ error: error.message });
        }
        req.project.team.push(user.id);
        await req.project.save();
        res.send('Usuario Agregado Correctamente');
    };
    static removeMemberById = async (req, res) => {
        const { idUser } = req.params;
        if (!req.project.team.some(team => team.toString() === idUser.toString())) {
            const error = new Error('El Usuario no existe en este proyecto');
            return res.status(409).json({ error: error.message });
        }
        req.project.team = req.project.team.filter(teamMember => teamMember.toString() !== idUser);
        await req.project.save();
        res.send('Usuario Eliminado Correctamente');
    };
}
exports.TeamMemberController = TeamMemberController;
//# sourceMappingURL=TeamController.js.map