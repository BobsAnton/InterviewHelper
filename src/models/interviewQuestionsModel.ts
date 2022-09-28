import { model, Schema } from 'mongoose';
import { IInterview } from './interviewsModel';
import { IQuestion } from './questionsModel';

export interface IInterviewQuestion {
	id: string;
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

InterviewQuestionSchema.virtual('id').get(function(){
    return this._id.toHexString();
});

InterviewQuestionSchema.set('toJSON', {
    virtuals: true
});

export const InterviewQuestionModel = model<IInterviewQuestion>('InterviewQuestion', InterviewQuestionSchema);