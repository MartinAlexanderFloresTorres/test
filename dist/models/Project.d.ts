import mongoose, { Document, PopulatedDoc } from "mongoose";
import { Itask } from "./Task";
import { IUser } from "./User";
export interface Iproject extends Document {
    projectName: string;
    clientName: string;
    description: string;
    tasks: PopulatedDoc<Itask & Document>[];
    manager: PopulatedDoc<IUser> & Document;
    team: PopulatedDoc<IUser & Document>[];
}
declare const Project: mongoose.Model<Iproject, {}, {}, {}, mongoose.Document<unknown, {}, Iproject> & Iproject & Required<{
    _id: unknown;
}>, any>;
export default Project;
