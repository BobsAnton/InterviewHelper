import { model, Schema } from 'mongoose';
import { ICandidateTechnicalField, CandidateTechnicalFieldModel } from './candidateTechnicalField';
import { IInterview, InterviewModel } from './interview';

export interface ICandidate {
	id: string;
	name: string;
	skills: ICandidateTechnicalField[];
	interviews: IInterview[];
}

const CandidateSchema = new Schema<ICandidate>({
	name: { type: String, unique: true, required: true },
	skills: [{
		type: Schema.Types.ObjectId,
		ref: "CandidateTechnicalField"
	}],
	interviews: [{
		type: Schema.Types.ObjectId,
		ref: "Interview"
	}]
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
	skills: ICandidateTechnicalField[];
	interviews: IInterview[];

	constructor(candidate: ICandidate) {
		this.id = candidate.id;
		this.name = candidate.name;
		this.skills = candidate.skills;
		this.interviews = candidate.interviews;
	}

		// Find by id
		static async findById(id: string): Promise<ICandidate> {
			return await CandidateModel.findOne({ _id: id }).populate('candidateTechnicalField').populate('interview');
		}
	
		// Find all
		static async findAll(): Promise<ICandidate[]> {
			return await CandidateModel.find({}).populate('candidateTechnicalField').populate('interview');
		}
	
		// Create
		static async create(newCandidate: ICandidate): Promise<ICandidate> {
			//let technicalFieldFromDb = await TechnicalFieldModel.findOne({ _id: newCandidate.technicalField.id });
			//if (technicalFieldFromDb === null)
			//{
			//	throw new Error("TechnicalField not found!");
			//}
	
			let newCandidateModel = new CandidateModel({
				id: '',
				name: newCandidate.name,
				skills: newCandidate.skills,
				interviews: newCandidate.interviews
			});
		
			let candidateFromDb = await newCandidateModel.save();
		
			return await (await candidateFromDb.populate('candidateTechnicalField')).populate('interview');
		}
	
		// Update by id
		static async updateById(id: string, updatedCandidate: ICandidate): Promise<ICandidate> {
			let candidateFromDb = await CandidateModel.findOne({ _id: id });
			if (candidateFromDb === null)
			{
				throw new Error("Candidate not found!");
			}
	
			//let technicalFieldFromDb = await TechnicalFieldModel.findOne({ _id: updatedCandidate.technicalField.id });
			//if (technicalFieldFromDb === null)
			//{
			//	throw new Error("TechnicalField not found!");
			//}
		
			await CandidateModel.updateOne(
				{ _id: id },
				{
					name: updatedCandidate.name,
					skills: updatedCandidate.skills,
					interviews: updatedCandidate.interviews
				}
			);
		
			return await (await CandidateModel.findOne({ _id: id }).populate('candidateTechnicalField')).populate('interview');
		}
	
		// Remove by id
		static async removeById(id: string): Promise<ICandidate> {
			let candidateFromDb = await CandidateModel.findOne({ _id: id });
			if (candidateFromDb === null)
			{
				throw new Error("Candidate not found!");
			}
		
			await CandidateModel.deleteOne({ _id: id });
		
			return await (await candidateFromDb.populate('candidateTechnicalField')).populate('interview');
		}
}