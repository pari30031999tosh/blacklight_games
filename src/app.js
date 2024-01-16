import dotenv from 'dotenv';
import cors from 'cors'
dotenv.config();
import express from 'express';

import ApiRouter from './router/index.router.js'

const app = express();

app.use(express.json())

app.use('/api',ApiRouter);

app.listen(process.env.PORT, ()=>{
    console.log(`server is listening at PORT ${process.env.PORT}`)
})
