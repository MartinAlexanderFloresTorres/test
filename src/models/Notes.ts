import { timeStamp } from "console";
import mongoose , {Schema,Document,Types} from "mongoose";


export interface INotes extends Document {
    content: string
    createdBy: Types.ObjectId
    task: Types.ObjectId
}

const NoteSchemas: Schema = new Schema({
    content: {
        type: String,
        require: true
    },
    createdBy: {
        type: Types.ObjectId,
        ref: 'User',
        require: true
    },
    task: {
        type: Types.ObjectId,
        ref: 'Task',
        require:true
    }
},{timestamps:true})

const Note = mongoose.model<INotes>('Note',NoteSchemas)
export default Note