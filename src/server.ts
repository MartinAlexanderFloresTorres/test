import dotenv from "dotenv";
import express from "express";
import { connectDB } from "./config/db";
import projectRoutes from "./routes/projectRouter"


//instacia para acceder a los .env
dotenv.config()
// conectamos en la BBDD
connectDB()
//Arrancamos el serve
const app = express()
//lectura de JSON
app.use(express.json())

//ROUTES

app.use('/api/projects',projectRoutes)

export default app