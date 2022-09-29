import { IQuestion, QuestionModel } from '../models/questionsModel'
import { InterviewQuestionModel } from '../models/interviewQuestionsModel';
import { TechnicalFieldModel } from '../models/technicalFieldsModel';

async function findById(id: string): Promise<IQuestion> {
	return await QuestionModel.findOne({ _id: id }).populate('technicalField');
}

async function findAll(): Promise<IQuestion[]> {
	return await QuestionModel.find({}).populate('technicalField');
}

async function create(newQuestion: IQuestion): Promise<IQuestion> {
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

async function updateById(id: string, updatedQuestion: IQuestion): Promise<IQuestion> {
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

async function removeById(id: string): Promise<IQuestion> {
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

export default {
	findById,
	findAll,
	create,
	updateById,
	removeById
}