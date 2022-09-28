import { model, Schema } from 'mongoose';
import { ICandidate } from './candidatesModel';

export interface IInterview {
	id: string;
	candidate: ICandidate;
	date: Date;
	status: string; // 'Scheduled' | 'Canceled' | 'InProgress' | 'Completed';
	review: string;
}

const InterviewSchema = new Schema<IInterview>({
	candidate: {
		type: Schema.Types.ObjectId,
		ref: "Candidate"
	},
	date: { type: Date, required: true },
	status: {
		type: String,
		enum: ['Scheduled', 'Canceled', 'InProgress', 'Completed'],
		default: 'Scheduled'
	},
	review: { type: String }
});

InterviewSchema.virtual('id').get(function(){
    return this._id.toHexString();
});

InterviewSchema.set('toJSON', {
    virtuals: true
});

export const InterviewModel = model<IInterview>('Interview', InterviewSchema);