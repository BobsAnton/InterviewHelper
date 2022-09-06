import express from "express";
import mongoose from 'mongoose';
import bodyParser from "body-parser";
import { indexRouter } from "./routes/index";
import { technicalFieldsRouter } from "./routes/technical-fields";
import { questionsRouter } from "./routes/questions";

async function run(): Promise<void> {
    await mongoose.connect('mongodb://localhost:27017/');

    const app = express();
    const port = 8080;
    
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    
    app.use("/", indexRouter);
    app.use("/technical-fields", technicalFieldsRouter);
    app.use("/questions", questionsRouter);
    
    app.listen(port, () => {
        console.log( `server started at http://localhost:${ port }` );
    });
}

run().catch((err) => console.error('Application init error', err));