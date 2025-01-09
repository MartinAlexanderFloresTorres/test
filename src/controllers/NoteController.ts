import type { Request,Response } from "express"
import Note, { INotes } from "../models/Notes"



export class NoteController {

    static createNote = async (req : Request<{},{},INotes>,res : Response) => { // puedo tipar los request como los response por un generiq  asi evito los any de lo que estoy recibiedno 
        const {content} =req.body
        const note = new Note()
        note.content = content
        note.createdBy = req.user.id
        note.task = req.task.id

        req.task.notes.push(note.id)

        try {
            Promise.allSettled([req.task.save(),note.save()])
            res.send('Nota creada Correctamente')
        } catch (error) {
            res.status(500).json({error:'Hubo un Error'})
        }
    }

}