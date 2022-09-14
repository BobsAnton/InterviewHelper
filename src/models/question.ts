import { model, Schema } from 'mongoose';
import { TechnicalField } from './technical-field';

export interface Question {
	name: string;
	description: string;
	complexity: 'Low' | 'BelowAverage' | 'Average' | 'AboveAverage' | 'High' | 'VeryHigh';
	technicalField: TechnicalField;
}

const QuestionSchema = new Schema<Question>({
	name: { type: String, unique: true, required: true },
	description: { type: String },
	complexity: {
		type: String,
		enum: ['Low', 'BelowAverage', 'Average', 'AboveAverage', 'High', 'VeryHigh'],
		default: 'Average'
	},
	technicalField: {
		type: Schema.Types.ObjectId,
		ref: "TechnicalField"
	}
});

export const QuestionModel = model<Question>('Question', QuestionSchema);