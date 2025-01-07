import mongoose, { Schema, Document,Types } from "mongoose";


const taskStatus = {
    PENDING: 'pending',
    ON_HOLD: 'onHold',
    IN_PROGRESS: 'inProgress',
    UNDER_REVIEW: 'underReview',
    COMPLETED: 'completed'
} as const // when put in the object as const i only read object


export type TaskStatus = typeof taskStatus[keyof typeof taskStatus]

//Interface
export interface ITask extends  Document  {
    name: string,
    description: string,
    project: Types.ObjectId,
    status: TaskStatus,
    completedBy: {
        user: Types.ObjectId,
        status: TaskStatus
    }[],
    notes: Types.ObjectId[]
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
    },
    completedBy :[
        {
            user: {
                type: Types.ObjectId,
                ref: 'User',
                default: null 
            },
            status: {
                type: String,
                enum: Object.values(taskStatus),
                default: taskStatus.PENDING
            }
        }
    ],
    notes:[
        {
            type: Types.ObjectId,
            ref: 'Note'
        }
    ]
},{timestamps:true})

const Task = mongoose.model<ITask>('Task', TaskSchema)
export default Task