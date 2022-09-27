import { model, Schema } from 'mongoose';
import { ICandidateTechnicalField, CandidateTechnicalFieldModel } from './candidateTechnicalField';
import { IInterview, InterviewModel } from './interview';
import { InterviewQuestionModel } from './interviewQuestion';

export interface ICandidate {
	id: string;
	name: string;
}

const CandidateSchema = new Schema<ICandidate>({
	name: { type: String, unique: true, required: true }
});

CandidateSchema.virtual('id').get(function(){
    return this._id.toHexString();
});

CandidateSchema.set('toJSON', {
    virtuals: true
});

export const CandidateModel = model<ICandidate>('Candidate', CandidateSchema);

export class Candidate {
	id: string;
	name: string;

	constructor(candidate: ICandidate) {
		this.id = candidate.id;
		this.name = candidate.name;
	}

		// Find by id
		static async findById(id: string): Promise<ICandidate> {
			return await CandidateModel.findOne({ _id: id });
		}
	
		// Find all
		static async findAll(): Promise<ICandidate[]> {
			return await CandidateModel.find({});
		}
	
		// Create
		static async create(newCandidate: ICandidate): Promise<ICandidate> {
			let newCandidateModel = new CandidateModel({
				id: '',
				name: newCandidate.name
			});
		
			return await newCandidateModel.save();
		}
	
		// Update by id
		static async updateById(id: string, updatedCandidate: ICandidate): Promise<ICandidate> {
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
	
		// Remove by id
		static async removeById(id: string): Promise<ICandidate> {
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
}