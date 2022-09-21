import { model, Schema } from 'mongoose';
import { ICandidateTechnicalField } from './candidateTechnicalField';
import { IInterview } from './interview';

export interface ICandidate {
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

export const CandidateModel = model<ICandidate>('Candidate', CandidateSchema);