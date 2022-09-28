import { model, Schema } from 'mongoose';
import { ITechnicalField } from './technicalFieldsModel';

export interface IQuestion {
	id: string;
	name: string;
	description: string;
	complexity: string; // 'Low' | 'BelowAverage' | 'Average' | 'AboveAverage' | 'High' | 'VeryHigh';
	technicalField: ITechnicalField;
}

let QuestionSchema = new Schema<IQuestion>({
	name: { type: String, required: true },
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

QuestionSchema.virtual('id').get(function(){
    return this._id.toHexString();
});

QuestionSchema.set('toJSON', {
    virtuals: true
});

export const QuestionModel = model<IQuestion>('Question', QuestionSchema);