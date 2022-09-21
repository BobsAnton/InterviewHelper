import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import mongoose from 'mongoose';
import bodyParser from "body-parser";
import appConfig from './appConfig';

import { indexRouter } from "./routes/indexRoutes";
import { technicalFieldsRouter } from "./routes/technicalFieldRoutes";
import { questionsRouter } from "./routes/questionRoutes";
import { interviewsRouter } from "./routes/interviewRoutes";
import { interviewQuestionsRouter } from "./routes/interviewQuestionRoutes";
import { candidateTechnicalFieldsRouter } from "./routes/candidateTechnicalFieldRoutes";
import { candidatesRouter } from "./routes/candidateRoutes";

async function run(): Promise<void> {
    await mongoose.connect(appConfig.mongodbConnectionString);

    const app = express();
    
    app.use(cors());
    
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    
    app.use("/", indexRouter);
    app.use("/technical-fields", technicalFieldsRouter);
    app.use("/questions", questionsRouter);
    app.use("/interviews", interviewsRouter);
    app.use("/interview-questions", interviewQuestionsRouter);
    app.use("/candidate-technical-fields", candidateTechnicalFieldsRouter);
    app.use("/candidates", candidatesRouter);

    app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
        console.error(err.stack)
        res.status(500).send('Internal Server Error!')
    });
    
    app.listen(appConfig.port, () => {
        console.log( `server started at http://localhost:${ appConfig.port }` );
    });
}

run().catch((err) => console.error('Application init error', err));