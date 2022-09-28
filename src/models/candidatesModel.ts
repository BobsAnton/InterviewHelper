import { model, Schema } from 'mongoose';

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