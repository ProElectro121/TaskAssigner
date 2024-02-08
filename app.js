import express from 'express'
import mongoose, { trusted } from 'mongoose';
import router from './routes/user.js';
import taskRouter from './routes/task.js'
import { config } from 'dotenv';
import cookieParser from 'cookie-parser';
import cors from 'cors';

export const app = express();

config({
    path: './data/config.env'
});

app.use(express.json());
app.use(cookieParser());

app.use(cors({
    origin: [process.env.FRONTEND_URL] ,
    methods: ['GET' , 'POST' , 'PUT' , 'DELETE'] , 
    credentials: true
}));

// for routes
app.use('/api/v1/user' , router);
app.use('/api/v1/task' , taskRouter);

app.get('/' , (req , res) => {
    res.send('Hello this is app');
})

