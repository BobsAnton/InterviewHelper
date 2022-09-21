import { model, Schema } from 'mongoose';
import { ICandidate, CandidateModel } from './candidate';
import { ITechnicalField, TechnicalFieldModel } from './technicalField';

export interface ICandidateTechnicalField {
	id: string;
	candidate: ICandidate;
	technicalField: ITechnicalField;
}

const CandidateTechnicalFieldSchema = new Schema<ICandidateTechnicalField>({
	candidate: {
		type: Schema.Types.ObjectId,
		ref: "Candidate"
	},
	technicalField: {
		type: Schema.Types.ObjectId,
		ref: "TechnicalField"
	}
});

CandidateTechnicalFieldSchema.virtual('id').get(function(){
    return this._id.toHexString();
});

CandidateTechnicalFieldSchema.set('toJSON', {
    virtuals: true
});

export const CandidateTechnicalFieldModel = model<ICandidateTechnicalField>('CandidateTechnicalField', CandidateTechnicalFieldSchema);

export class CandidateTechnicalField {
	id: string;
	candidate: ICandidate;
	technicalField: ITechnicalField;

	constructor(candidateTechnicalField: ICandidateTechnicalField) {
		this.id = candidateTechnicalField.id;
		this.candidate = candidateTechnicalField.candidate;
		this.technicalField = candidateTechnicalField.technicalField;
	}

		// Find by id
		static async findById(id: string): Promise<ICandidateTechnicalField> {
			return await CandidateTechnicalFieldModel.findOne({ _id: id }).populate('candidate').populate('technicalField');
		}
	
		// Find all
		static async findAll(): Promise<ICandidateTechnicalField[]> {
			return await CandidateTechnicalFieldModel.find({}).populate('candidate').populate('technicalField');
		}
	
		// Create
		static async create(newCandidateTechnicalField: ICandidateTechnicalField): Promise<ICandidateTechnicalField> {
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
	
		// Update by id
		static async updateById(id: string, updatedCandidateTechnicalField: ICandidateTechnicalField): Promise<ICandidateTechnicalField> {
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
	
		// Remove by id
		static async removeById(id: string): Promise<ICandidateTechnicalField> {
			let candidateTechnicalFieldFromDb = await CandidateTechnicalFieldModel.findOne({ _id: id });
			if (candidateTechnicalFieldFromDb === null)
			{
				throw new Error("CandidateTechnicalField not found!");
			}
		
			await CandidateTechnicalFieldModel.deleteOne({ _id: id });
		
			return await (await candidateTechnicalFieldFromDb.populate('candidate')).populate('technicalField');
		}
}