import { ICandidateTechnicalField, CandidateTechnicalFieldModel } from '../models/candidateTechnicalFieldsModel';
import { CandidateModel } from '../models/candidatesModel';
import { TechnicalFieldModel } from '../models/technicalFieldsModel';

async function findById(id: string): Promise<ICandidateTechnicalField> {
	return await CandidateTechnicalFieldModel.findOne({ _id: id }).populate('candidate').populate('technicalField');
}

async function findAll(): Promise<ICandidateTechnicalField[]> {
	return await CandidateTechnicalFieldModel.find({}).populate('candidate').populate('technicalField');
}

async function create(newCandidateTechnicalField: ICandidateTechnicalField): Promise<ICandidateTechnicalField> {
	let candidateFromDb = await CandidateModel.findOne({ _id: newCandidateTechnicalField.candidate.id });
	if (candidateFromDb === null)
	{
		throw new Error("Candidate not found!");
	}

	let technicalFieldFromDb = await TechnicalFieldModel.findOne({ _id: newCandidateTechnicalField.technicalField.id });
	if (technicalFieldFromDb === null)
	{
		throw new Error("TechnicalField not found!");
	}

	let newCandidateTechnicalFieldModel = new CandidateTechnicalFieldModel({
		id: '',
		candidate: candidateFromDb._id,
		technicalField: technicalFieldFromDb._id
	});

	let candidateTechnicalFieldFromDb = await newCandidateTechnicalFieldModel.save();

	return await (await candidateTechnicalFieldFromDb.populate('candidate')).populate('technicalField');
}

async function updateById(id: string, updatedCandidateTechnicalField: ICandidateTechnicalField): Promise<ICandidateTechnicalField> {
	let candidateTechnicalFieldFromDb = await CandidateTechnicalFieldModel.findOne({ _id: id });
	if (candidateTechnicalFieldFromDb === null)
	{
		throw new Error("CandidateTechnicalField not found!");
	}

	let candidateFromDb = await CandidateModel.findOne({ _id: updatedCandidateTechnicalField.candidate.id });
	if (candidateFromDb === null)
	{
		throw new Error("Candidate not found!");
	}

	let technicalFieldFromDb = await TechnicalFieldModel.findOne({ _id: updatedCandidateTechnicalField.technicalField.id });
	if (technicalFieldFromDb === null)
	{
		throw new Error("TechnicalField not found!");
	}

	await CandidateTechnicalFieldModel.updateOne(
		{ _id: id },
		{
			candidate: candidateFromDb._id,
			technicalField: technicalFieldFromDb._id
		}
	);

	return await (await CandidateTechnicalFieldModel.findOne({ _id: id }).populate('candidate')).populate('technicalField');
}

async function removeById(id: string): Promise<ICandidateTechnicalField> {
	let candidateTechnicalFieldFromDb = await CandidateTechnicalFieldModel.findOne({ _id: id });
	if (candidateTechnicalFieldFromDb === null)
	{
		throw new Error("CandidateTechnicalField not found!");
	}

	await CandidateTechnicalFieldModel.deleteOne({ _id: id });

	return await (await candidateTechnicalFieldFromDb.populate('candidate')).populate('technicalField');
}

export default {
	findById,
	findAll,
	create,
	updateById,
	removeById
}