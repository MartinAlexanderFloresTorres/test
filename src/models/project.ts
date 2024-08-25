
import mongoose, { Schema, Document ,PopulatedDoc, Types} from "mongoose";
import { Itask } from "./task";

export interface Iproject extends  Document  {
    projectName: string,
    clientName: string,
    description: string,
    tasks: PopulatedDoc<Itask & Document>[] // estoy relacionando las tareas con su poryecto y especificando via generic que type tendra cada tarea 
}

const ProjectSchema : Schema = new Schema({
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
            ref: 'Task'
        }
    ]
},{timestamps:true}) 

//conect the interface with Schema the moongose
const Project = mongoose.model<Iproject>('Project', ProjectSchema)
export default Project


