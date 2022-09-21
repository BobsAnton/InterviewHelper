import { model, Mongoose, Schema } from 'mongoose';
import { IInterview } from './interview';
import { IQuestion } from './question';

export interface IInterviewQuestion {
	interview: IInterview;
	question: IQuestion;
	grade: number;
	comment: string;
}

const InterviewQuestionSchema = new Schema<IInterviewQuestion>({
	interview: {
		type: Schema.Types.ObjectId,
		ref: "Interview"
	},
	question: {
		type: Schema.Types.ObjectId,
		ref: "Question"
	},
	grade: { type: Number, required: true },
	comment: { type: String }
});

export const InterviewQuestionModel = model<IInterviewQuestion>('InterviewQuestion', InterviewQuestionSchema);