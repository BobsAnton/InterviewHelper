import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import mongoose from 'mongoose';
import bodyParser from "body-parser";
import { indexRouter } from "./routes/index";
import { technicalFieldsRouter } from "./routes/technical-fields";
import { questionsRouter } from "./routes/questions";

async function run(): Promise<void> {
    await mongoose.connect('mongodb://localhost:27017/');

    const app = express();
    const port = 8081;
    
    app.use(cors());
    
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    
    app.use("/", indexRouter);
    app.use("/technical-fields", technicalFieldsRouter);
    app.use("/questions", questionsRouter);

    app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
        console.error(err.stack)
        res.status(500).send('Internal Server Error!')
    });
    
    app.listen(port, () => {
        console.log( `server started at http://localhost:${ port }` );
    });
}

run().catch((err) => console.error('Application init error', err));