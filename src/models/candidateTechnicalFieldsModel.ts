import { model, Schema } from 'mongoose';
import { ICandidate } from './candidatesModel';
import { ITechnicalField } from './technicalFieldsModel';

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

