import dotenv from "dotenv";
import express from "express";
import { connectDB } from "./config/db";

//instacia para acceder a los .env
dotenv.config()
// conectamos en la BBDD
connectDB()
//Arrancamos el serve
const app = express()

export default app