import { model, Schema } from 'mongoose';
import { ICandidate } from './candidate';

export interface IInterview {
	candidate: ICandidate;
	date: Date;
	status: 'Scheduled' | 'Canceled' | 'InProgress' | 'Completed';
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

export const InterviewModel = model<IInterview>('Interview', InterviewSchema);