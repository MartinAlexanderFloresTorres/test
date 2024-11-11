import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import cors from 'cors'

import { connectDB } from "./config/db";
import projectRoutes from "./routes/projectRouter"
import { corsConfig } from "./config/cors";




//instacia para acceder a los .env
dotenv.config()
// conectamos en la BBDD
connectDB()
//Arrancamos el serve
const app = express()
//habilitamos el cors
app.use(cors(corsConfig))
//LogginMorgan
app.use(morgan('dev'))
//lectura de JSON
app.use(express.json())

//ROUTES

app.use('/api/projects',projectRoutes)

export default app