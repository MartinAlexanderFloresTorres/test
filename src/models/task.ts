import mongoose, { Schema, Document,Types } from "mongoose";


const taskStatus = {
    PENDING: 'pending',
    ON_HOLD: 'onHold',
    IN_PROGRESS: 'inProgress',
    UNDER_REVIEW: 'underReview',
    COMPLETED: 'completed'
} as const // when put in the object as const i only read object


export type taskStatus = typeof taskStatus[keyof typeof taskStatus]

//Interface
export interface Itask extends  Document  {
    name: string,
    description: string,
    project: Types.ObjectId,
    status: taskStatus,
}
//Schema moongose
export const TaskSchema: Schema = new Schema({
    name: {
        type: String,
        trim: true,
        required: true
    },
    description: {
        type: String,
        trim: true,
        required: true
    },
    project: {
        type: Types.ObjectId,
        ref:'Project' //  this is a reference the Id PROJECT for 
    },
    status: {
        type: String,
        enum: Object.values(taskStatus), // le paso al enum los valores de objeto construido
        default: taskStatus.PENDING
    }
},{timestamps:true})

const Task = mongoose.model<Itask>('Task', TaskSchema)
export default Task