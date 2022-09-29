import { IInterviewQuestion, InterviewQuestionModel } from '../models/interviewQuestionsModel';
import { InterviewModel } from '../models/interviewsModel';
import { QuestionModel } from '../models/questionsModel';

async function findById(id: string): Promise<IInterviewQuestion> {
	return await InterviewQuestionModel.findOne({ _id: id }).populate({ path: 'interview', populate: { path: 'candidate' } }).populate({ path: 'question', populate: { path: 'technicalField' } });
}

async function findAll(): Promise<IInterviewQuestion[]> {
	return await InterviewQuestionModel.find({})
		.populate({ path: 'interview', populate: { path: 'candidate' } })
		.populate({ path: 'question', populate: { path: 'technicalField' } });
}

async function create(newInterviewQuestion: IInterviewQuestion): Promise<IInterviewQuestion> {
	let interviewFromDb = await InterviewModel.findOne({ _id: newInterviewQuestion.interview.id });
	if (interviewFromDb === null)
	{
		throw new Error("Interview not found!");
	}

	let questionFromDb = await QuestionModel.findOne({ _id: newInterviewQuestion.question.id });
	if (questionFromDb === null)
	{
		throw new Error("Question not found!");
	}

	let newInterviewQuestionModel = new InterviewQuestionModel({
		interview: interviewFromDb._id,
		question: questionFromDb._id,
		grade: newInterviewQuestion.grade,
		comment: newInterviewQuestion.comment
	});

	let interviewQuestionFromDb = await newInterviewQuestionModel.save();

	return await (await interviewQuestionFromDb
		.populate({ path: 'interview', populate: { path: 'candidate' } })
		).populate({ path: 'question', populate: { path: 'technicalField' } });
}

async function updateById(id: string, updatedInterviewQuestion: IInterviewQuestion): Promise<IInterviewQuestion> {
	let interviewQuestionFromDb = await InterviewQuestionModel.findOne({ _id: id });
	if (interviewQuestionFromDb === null)
	{
		throw new Error("InterviewQuestion not found!");
	}

	let interviewFromDb = await InterviewModel.findOne({ _id: updatedInterviewQuestion.interview.id });
	if (interviewFromDb === null)
	{
		throw new Error("Interview not found!");
	}

	let questionFromDb = await QuestionModel.findOne({ _id: updatedInterviewQuestion.question.id });
	if (questionFromDb === null)
	{
		throw new Error("Question not found!");
	}

	await InterviewQuestionModel.updateOne(
		{ _id: id },
		{
			interview: interviewFromDb._id,
			question: questionFromDb._id,
			grade: updatedInterviewQuestion.grade,
			comment: updatedInterviewQuestion.comment
		}
	);

	return await (
		await InterviewQuestionModel.findOne({ _id: id })
		.populate({ path: 'interview', populate: { path: 'candidate' } })
		).populate({ path: 'question', populate: { path: 'technicalField' } });
}

async function removeById(id: string): Promise<IInterviewQuestion> {
	let interviewQuestionFromDb = await InterviewQuestionModel.findOne({ _id: id });
	if (interviewQuestionFromDb === null)
	{
		throw new Error("InterviewQuestion not found!");
	}

	await InterviewQuestionModel.deleteOne({ _id: id });

	return await (await interviewQuestionFromDb
		.populate({ path: 'interview', populate: { path: 'candidate' } })
		).populate({ path: 'question', populate: { path: 'technicalField' } });
}

export default {
	findById,
	findAll,
	create,
	updateById,
	removeById
}