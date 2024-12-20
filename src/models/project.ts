import mongoose, { Schema, Document, PopulatedDoc, Types } from "mongoose";
import { Itask } from "./Task";
import { IUser } from "./User";

export interface Iproject extends Document {
  projectName: string;
  clientName: string;
  description: string;
  tasks: PopulatedDoc<Itask & Document>[]; // estoy relacionando las tareas con su poryecto y especificando via generic que type tendra cada tarea
  manager: PopulatedDoc<IUser> & Document;
  team: PopulatedDoc<IUser & Document>[];
}

const ProjectSchema: Schema = new Schema(
  {
    projectName: {
      type: String,
      required: true,
      trim: true,
    },
    clientName: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    tasks: [
      {
        type: Types.ObjectId,
        ref: "Task",
      },
    ],
    manager: {
      type: Types.ObjectId,
      ref: "User",
    },
    team: [
      {
        type: Types.ObjectId,
        ref: "User",
      },
    ],
  },
  { timestamps: true }
);

//conect the interface with Schema the moongose
const Project = mongoose.model<Iproject>("Project", ProjectSchema);
export default Project;
