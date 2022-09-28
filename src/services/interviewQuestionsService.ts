import { IInterviewQuestion, InterviewQuestionModel } from '../models/interviewQuestionsModel';
import { IInterview, InterviewModel } from '../models/interviewsModel';
import { IQuestion, QuestionModel } from '../models/questionsModel';

export class InterviewQuestionsService {
	id: string;
	interview: IInterview;
	question: IQuestion;
	grade: number;
	comment: string;

	constructor(interviewQuestion: IInterviewQuestion) {
		this.id = interviewQuestion.id;
		this.interview = interviewQuestion.interview;
		this.question = interviewQuestion.question;
		this.grade = interviewQuestion.grade;
		this.comment = interviewQuestion.comment;
	}

		// Find by id
		static async findById(id: string): Promise<IInterviewQuestion> {
			return await InterviewQuestionModel.findOne({ _id: id }).populate({ path: 'interview', populate: { path: 'candidate' } }).populate({ path: 'question', populate: { path: 'technicalField' } });
		}
	
		// Find all
		static async findAll(): Promise<IInterviewQuestion[]> {
			return await InterviewQuestionModel.find({})
				.populate({ path: 'interview', populate: { path: 'candidate' } })
				.populate({ path: 'question', populate: { path: 'technicalField' } });
		}
	
		// Create
		static async create(newInterviewQuestion: IInterviewQuestion): Promise<IInterviewQuestion> {
			let interviewFromDb = await InterviewModel.findOne({ _id: newInterviewQuestion.interview.id });
			if (interviewFromDb === null)
			{
				throw new Error("Interview not found!");
			}

			let questionFromDb = await QuestionModel.findOne({ _id: newInterviewQuestion.question.id });
			if (questionFromDb === null)
			{
				throw new Error("Question not found!");
			}
	
			let newInterviewQuestionModel = new InterviewQuestionModel({
				interview: interviewFromDb._id,
				question: questionFromDb._id,
				grade: newInterviewQuestion.grade,
				comment: newInterviewQuestion.comment
			});
		
			let interviewQuestionFromDb = await newInterviewQuestionModel.save();
		
			return await (await interviewQuestionFromDb
				.populate({ path: 'interview', populate: { path: 'candidate' } })
				).populate({ path: 'question', populate: { path: 'technicalField' } });
		}
	
		// Update by id
		static async updateById(id: string, updatedInterviewQuestion: IInterviewQuestion): Promise<IInterviewQuestion> {
			let interviewQuestionFromDb = await InterviewQuestionModel.findOne({ _id: id });
			if (interviewQuestionFromDb === null)
			{
				throw new Error("InterviewQuestion not found!");
			}
	
			let interviewFromDb = await InterviewModel.findOne({ _id: updatedInterviewQuestion.interview.id });
			if (interviewFromDb === null)
			{
				throw new Error("Interview not found!");
			}

			let questionFromDb = await QuestionModel.findOne({ _id: updatedInterviewQuestion.question.id });
			if (questionFromDb === null)
			{
				throw new Error("Question not found!");
			}
		
			await InterviewQuestionModel.updateOne(
				{ _id: id },
				{
					interview: interviewFromDb._id,
					question: questionFromDb._id,
					grade: updatedInterviewQuestion.grade,
					comment: updatedInterviewQuestion.comment
				}
			);
		
			return await (
				await InterviewQuestionModel.findOne({ _id: id })
				.populate({ path: 'interview', populate: { path: 'candidate' } })
				).populate({ path: 'question', populate: { path: 'technicalField' } });
		}
	
		// Remove by id
		static async removeById(id: string): Promise<IInterviewQuestion> {
			let interviewQuestionFromDb = await InterviewQuestionModel.findOne({ _id: id });
			if (interviewQuestionFromDb === null)
			{
				throw new Error("InterviewQuestion not found!");
			}
		
			await InterviewQuestionModel.deleteOne({ _id: id });
		
			return await (await interviewQuestionFromDb
				.populate({ path: 'interview', populate: { path: 'candidate' } })
				).populate({ path: 'question', populate: { path: 'technicalField' } });
		}
}