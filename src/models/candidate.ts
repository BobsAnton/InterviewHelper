import { model, Schema } from 'mongoose';
import { CandidateTechnicalField } from './candidate-technical-field';
import { Interview } from './interview';

export interface Candidate {
	name: string;
	skills: CandidateTechnicalField[];
	interviews: Interview[];
}

const CandidateSchema = new Schema<Candidate>({
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

export const CandidateModel = model<Candidate>('Candidate', CandidateSchema);