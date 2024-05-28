import dayjs from "dayjs";
import express, { Router } from 'express';
import { configDotenv } from "dotenv"; //para ler o arquivo .env
import mongoose, { mongo } from "mongoose";
import cors from "cors";
import router from "./gravaUser";
configDotenv(); // executa a leitura do arquivo .env

const DB_URL = process.env.DB_URL;
const DB_USER = process.env.DB_USER;
const DB_PASSWORD = process.env.DB_PASSWORD;
const DB_CLUSTER = process.env.DB_CLUSTER;
const DB_COLLECTION = process.env.DB_COLLECTION;
const PORT = process.env.PORT;

const MONGODB_URI = encodeURI(`${DB_URL}://${DB_USER}:${DB_PASSWORD}@${DB_CLUSTER}/${DB_COLLECTION}?retryWrites=true&w=majority&appName=full-chat`);

const app = express();

async function startServer(): Promise<void>{
    try{
        
        await mongoose.connect(MONGODB_URI)
        //config
        app.use(cors());
        app.use(express.json());
        app.use(router);
        
        app.get("/", (req, res)=>{
            res.send("Estou vivo! " + dayjs().format('DD/MM/YYYY hh:mm:ss')) 
        });

        app.listen(PORT, ()=>{
            console.log(`Servidor rodando na porta: ${PORT}`);
        })

    } catch (error) {
        console.log(error);
    };
};


startServer().then(()=>{
    console.log('ok')
}).catch((err)=>{
    console.log(err)
});

