import { IInterview, InterviewModel } from '../models/interviewsModel';
import { ICandidate, CandidateModel } from '../models/candidatesModel';
import { InterviewQuestionModel } from '../models/interviewQuestionsModel';

export class InterviewsService {
	id: string;
	candidate: ICandidate;
	date: Date;
	status: string;
	review: string;

	constructor(interview: IInterview) {
		this.id = interview.id;
		this.candidate = interview.candidate;
		this.date = interview.date;
		this.status = interview.status;
		this.review = interview.review;
	}

		// Find by id
		static async findById(id: string): Promise<IInterview> {
			return await InterviewModel.findOne({ _id: id }).populate('candidate');
		}
	
		// Find all
		static async findAll(): Promise<IInterview[]> {
			return await InterviewModel.find({}).populate('candidate');
		}
	
		// Create
		static async create(newInterview: IInterview): Promise<IInterview> {
			let candidateFromDb = await CandidateModel.findOne({ _id: newInterview.candidate.id });
			if (candidateFromDb === null)
			{
				throw new Error("Candidate not found!");
			}
	
			let newInterviewModel = new InterviewModel({
				candidate: candidateFromDb._id,
				date: newInterview.date,
				status: newInterview.status,
				review: newInterview.review
			});
		
			let interviewFromDb = await newInterviewModel.save();
		
			return await interviewFromDb.populate('candidate');
		}
	
		// Update by id
		static async updateById(id: string, updatedInterview: IInterview): Promise<IInterview> {
			let interviewFromDb = await InterviewModel.findOne({ _id: id });
			if (interviewFromDb === null)
			{
				throw new Error("Interview not found!");
			}
	
			let candidateFromDb = await CandidateModel.findOne({ _id: updatedInterview.candidate.id });
			if (candidateFromDb === null)
			{
				throw new Error("Candidate not found!");
			}
		
			await InterviewModel.updateOne(
				{ _id: id },
				{
					candidate: candidateFromDb._id,
					date: updatedInterview.date,
					status: updatedInterview.status,
					review: updatedInterview.review
				}
			);
		
			return await InterviewModel.findOne({ _id: id }).populate('candidate');
		}
	
		// Remove by id
		static async removeById(id: string): Promise<IInterview> {
			let interviewFromDb = await InterviewModel.findOne({ _id: id });
			if (interviewFromDb === null)
			{
				throw new Error("Interview not found!");
			}

			let interviewQuestionFromDb = await InterviewQuestionModel.find({ interview: interviewFromDb._id });
			if (interviewQuestionFromDb !== null)
			{
				await InterviewQuestionModel.deleteMany({ interview: interviewFromDb._id });
			}
	
			await InterviewModel.deleteOne({ _id: id });
		
			return await interviewFromDb.populate('candidate');
		}
}