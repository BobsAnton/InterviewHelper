import { model, Schema } from 'mongoose';
import { InterviewQuestionModel } from './interviewQuestion';
import { ITechnicalField, TechnicalFieldModel } from './technicalField';

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

export class Question {
	id: string;
	name: string;
	description: string;
	complexity: string;
	technicalField: ITechnicalField;

	constructor(question: IQuestion) {
		this.id = question.id;
		this.name = question.name;
		this.description = question.description;
		this.complexity = question.complexity;
		this.technicalField = question.technicalField;
	}

	// Find by id
	static async findById(id: string): Promise<IQuestion> {
		return await QuestionModel.findOne({ _id: id }).populate('technicalField');
	}

	// Find all
	static async findAll(): Promise<IQuestion[]> {
		return await QuestionModel.find({}).populate('technicalField');
	}

	// Create
	static async create(newQuestion: IQuestion): Promise<IQuestion> {
		let technicalFieldFromDb = await TechnicalFieldModel.findOne({ _id: newQuestion.technicalField.id });
		if (technicalFieldFromDb === null)
		{
			throw new Error("TechnicalField not found!");
		}

		let newQuestionModel = new QuestionModel({
			name: newQuestion.name,
			description: newQuestion.description,
			complexity: newQuestion.complexity,
			technicalField: technicalFieldFromDb._id
		});
	
		let questionFromDb = await newQuestionModel.save();
	
		return await questionFromDb.populate('technicalField');
	}

	// Update by id
	static async updateById(id: string, updatedQuestion: IQuestion): Promise<IQuestion> {
		let questionFromDb = await QuestionModel.findOne({ _id: id });
		if (questionFromDb === null)
		{
			throw new Error("Question not found!");
		}

		let technicalFieldFromDb = await TechnicalFieldModel.findOne({ _id: updatedQuestion.technicalField.id });
		if (technicalFieldFromDb === null)
		{
			throw new Error("TechnicalField not found!");
		}
	
		await QuestionModel.updateOne(
			{ _id: id },
			{
				name: updatedQuestion.name,
				description: updatedQuestion.description,
				complexity: updatedQuestion.complexity,
				technicalField: technicalFieldFromDb._id
			}
		);
	
		return await QuestionModel.findOne({ _id: id }).populate('technicalField');
	}

	// Remove by id
	static async removeById(id: string): Promise<IQuestion> {
		let questionFromDb = await QuestionModel.findOne({ _id: id });
		if (questionFromDb === null)
		{
			throw new Error("Question not found!");
		}
	
		let interviewQuestionFromDb = await InterviewQuestionModel.find({ question: questionFromDb._id });
		if (interviewQuestionFromDb !== null)
		{
			await InterviewQuestionModel.deleteMany({ question: questionFromDb._id });
		}
	
		await QuestionModel.deleteOne({ _id: id });
	
		return await questionFromDb.populate('technicalField');
	}
}