import { model, Schema } from 'mongoose';
import { Candidate } from './candidate';

export interface Interview {
	candidate: Candidate;
	date: Date;
	status: 'Scheduled' | 'Canceled' | 'InProgress' | 'Completed';
	review: string;
}

const InterviewSchema = new Schema<Interview>({
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

export const InterviewModel = model<Interview>('Interview', InterviewSchema);