import { model, Schema } from 'mongoose';
import { Candidate } from './candidate';
import { TechnicalField } from './technical-field';

export interface CandidateTechnicalField {
	candidate: Candidate;
	technicalField: TechnicalField;
}

const CandidateTechnicalFieldSchema = new Schema<CandidateTechnicalField>({
	candidate: {
		type: Schema.Types.ObjectId,
		ref: "Candidate"
	},
	technicalField: {
		type: Schema.Types.ObjectId,
		ref: "TechnicalField"
	}
});

export const CandidateTechnicalFieldModel = model<CandidateTechnicalField>('CandidateTechnicalField', CandidateTechnicalFieldSchema);