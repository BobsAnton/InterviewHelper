import { IInterview, InterviewModel } from '../models/interviewsModel';
import { CandidateModel } from '../models/candidatesModel';
import { InterviewQuestionModel } from '../models/interviewQuestionsModel';

async function findById(id: string): Promise<IInterview> {
	return await InterviewModel.findOne({ _id: id }).populate('candidate');
}

async function findAll(): Promise<IInterview[]> {
	return await InterviewModel.find({}).populate('candidate');
}

async function create(newInterview: IInterview): Promise<IInterview> {
	let candidateFromDb = await CandidateModel.findOne({ _id: newInterview.candidate.id });
	if (candidateFromDb === null)
	{
		throw new Error("Candidate not found!");
	}

	let newInterviewModel = new InterviewModel({
		candidate: candidateFromDb._id,
		date: newInterview.date,
		status: newInterview.status,
		review: newInterview.review
	});

	let interviewFromDb = await newInterviewModel.save();

	return await interviewFromDb.populate('candidate');
}

async function updateById(id: string, updatedInterview: IInterview): Promise<IInterview> {
	let interviewFromDb = await InterviewModel.findOne({ _id: id });
	if (interviewFromDb === null)
	{
		throw new Error("Interview not found!");
	}

	let candidateFromDb = await CandidateModel.findOne({ _id: updatedInterview.candidate.id });
	if (candidateFromDb === null)
	{
		throw new Error("Candidate not found!");
	}

	await InterviewModel.updateOne(
		{ _id: id },
		{
			candidate: candidateFromDb._id,
			date: updatedInterview.date,
			status: updatedInterview.status,
			review: updatedInterview.review
		}
	);

	return await InterviewModel.findOne({ _id: id }).populate('candidate');
}

async function removeById(id: string): Promise<IInterview> {
	let interviewFromDb = await InterviewModel.findOne({ _id: id });
	if (interviewFromDb === null)
	{
		throw new Error("Interview not found!");
	}

	let interviewQuestionFromDb = await InterviewQuestionModel.find({ interview: interviewFromDb._id });
	if (interviewQuestionFromDb !== null)
	{
		await InterviewQuestionModel.deleteMany({ interview: interviewFromDb._id });
	}

	await InterviewModel.deleteOne({ _id: id });

	return await interviewFromDb.populate('candidate');
}

export default {
	findById,
	findAll,
	create,
	updateById,
	removeById
}