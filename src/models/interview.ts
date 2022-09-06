import { model, Schema } from 'mongoose';
import { Candidate } from './candidate';

enum Status {
	Scheduled,
	Canceled,
	InProgress,
	Completed
}

export interface Interview {
	candidate: Candidate;
	date: Date;
	status: string; //Status;
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