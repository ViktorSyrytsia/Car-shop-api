import 'reflect-metadata';
import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';

dotenv.config();
const app: express.Application = express();
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }))

app.listen(process.env.PORT, () => {
    console.log(`Server started on localhost:8080`);
})