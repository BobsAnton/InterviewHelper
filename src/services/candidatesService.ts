import { ICandidate, CandidateModel } from '../models/candidatesModel';
import { CandidateTechnicalFieldModel } from '../models/candidateTechnicalFieldsModel';
import { InterviewModel } from '../models/interviewsModel';
import { InterviewQuestionModel } from '../models/interviewQuestionsModel';

async function findById(id: string): Promise<ICandidate> {
	return await CandidateModel.findOne({ _id: id });
}

async function findAll(): Promise<ICandidate[]> {
	return await CandidateModel.find({});
}

async function create(newCandidate: ICandidate): Promise<ICandidate> {
	let newCandidateModel = new CandidateModel({
		id: '',
		name: newCandidate.name
	});

	return await newCandidateModel.save();
}

async function updateById(id: string, updatedCandidate: ICandidate): Promise<ICandidate> {
	let candidateFromDb = await CandidateModel.findOne({ _id: id });
	if (candidateFromDb === null)
	{
		throw new Error("Candidate not found!");
	}

	await CandidateModel.updateOne(
		{ _id: id },
		{
			name: updatedCandidate.name
		}
	);

	return await CandidateModel.findOne({ _id: id });
}

async function removeById(id: string): Promise<ICandidate> {
	let candidateFromDb = await CandidateModel.findOne({ _id: id });
	if (candidateFromDb === null)
	{
		throw new Error("Candidate not found!");
	}

	let interviewsFromDb = await InterviewModel.find({ candidate: id });
	interviewsFromDb.forEach(async interviewFromDb => {
		if (interviewFromDb !== null)
		{
			await InterviewModel.deleteMany({ candidate: id });

			let interviewQuestionFromDb = await InterviewQuestionModel.find({ interview: interviewFromDb._id });
			if (interviewQuestionFromDb !== null)
			{
				await InterviewQuestionModel.deleteMany({ interview: interviewFromDb._id });
			}
		}
	});

	let candidateTechnicalFieldFromDb = await CandidateTechnicalFieldModel.find({ candidate: id });
	if (candidateTechnicalFieldFromDb !== null)
	{
		await CandidateTechnicalFieldModel.deleteMany({ candidate: id});
	}

	await CandidateModel.deleteOne({ _id: id });
	return candidateFromDb;
}

export default {
	findById,
	findAll,
	create,
	updateById,
	removeById
}