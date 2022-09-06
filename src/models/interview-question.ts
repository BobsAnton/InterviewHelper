import { model, Mongoose, Schema } from 'mongoose';
import { Interview } from './interview';
import { Question } from './question';

export interface InterviewQuestion {
	interview: Interview;
	question: Question;
	grade: number;
	comment: string;
}

const InterviewQuestionSchema = new Schema<InterviewQuestion>({
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

export const InterviewQuestionModel = model<InterviewQuestion>('InterviewQuestion', InterviewQuestionSchema);