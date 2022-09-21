import { model, Schema } from 'mongoose';
import { ICandidate } from './candidate';
import { ITechnicalField } from './technicalField';

export interface ICandidateTechnicalField {
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

export const CandidateTechnicalFieldModel = model<ICandidateTechnicalField>('CandidateTechnicalField', CandidateTechnicalFieldSchema);