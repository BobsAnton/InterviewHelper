import { ITechnicalField, TechnicalFieldModel } from '../models/technicalFieldsModel';
import { CandidateTechnicalFieldModel } from '../models/candidateTechnicalFieldsModel';
import { InterviewQuestionModel } from '../models/interviewQuestionsModel';
import { QuestionModel } from '../models/questionsModel';

export class TechnicalFieldsService {
	id: string;
	name: string;
	order: number;

	constructor(technicalField: ITechnicalField) {
		this.id = technicalField.id;
		this.name = technicalField.name;
		this.order = technicalField.order;
	}

	// Find by id
	static async findById(id: string): Promise<ITechnicalField> {
		return await TechnicalFieldModel.findOne({ _id: id });
	}

	// Find all
	static async findAll(): Promise<ITechnicalField[]> {
		return await TechnicalFieldModel.find({});
	}

	// Create
	static async create(newTechnicalField: ITechnicalField): Promise<ITechnicalField> {
		let newTechnicalFieldModel = new TechnicalFieldModel({
			name: newTechnicalField.name,
			order: newTechnicalField.order
		});
	
		return await newTechnicalFieldModel.save();
	}

	// Update by id
	static async updateById(id: string, updatedTechnicalField: ITechnicalField): Promise<ITechnicalField> {
		let technicalFieldFromDb = await TechnicalFieldModel.findOne({ _id: id });
		if (technicalFieldFromDb === null)
		{
			throw new Error("TechnicalField not found!");
		}
	
		await TechnicalFieldModel.updateOne(
			{ _id: id },
			{
				name: updatedTechnicalField.name,
				order: updatedTechnicalField.order
			}
		);
	
		return await TechnicalFieldModel.findOne({ _id: id });
	}

	// Remove by id
	static async removeById(id: string): Promise<ITechnicalField> {
		let technicalFieldFromDb = await TechnicalFieldModel.findOne({ _id: id });
		if (technicalFieldFromDb === null)
		{
			throw new Error("TechnicalField not found!");
		}

		let questionsFromDb = await QuestionModel.find({ technicalField: id });
		questionsFromDb.forEach(async questionFromDb => {
			if (questionFromDb !== null)
			{
				await QuestionModel.deleteMany({ technicalField: id });
	
				let interviewQuestionFromDb = await InterviewQuestionModel.find({ question: questionFromDb._id });
				if (interviewQuestionFromDb !== null)
				{
					await InterviewQuestionModel.deleteMany({ question: questionFromDb._id });
				}
			}
		});

		let candidateTechnicalFieldFromDb = await CandidateTechnicalFieldModel.find({ technicalField: id });
		if (candidateTechnicalFieldFromDb !== null)
		{
			await CandidateTechnicalFieldModel.deleteMany({ technicalField: id });
		}
	
		await TechnicalFieldModel.deleteOne({ _id: id });
		return technicalFieldFromDb;
	}
}