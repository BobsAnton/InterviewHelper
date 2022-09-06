import express from 'express';
import { QuestionModel } from '../models/question';
import { TechnicalFieldModel } from '../models/technical-field';
const router = express.Router();

router.get('/', async function(req, res, next) {
	res.send(await QuestionModel.find({}).populate('technicalField'));
});

router.post('/', async function(req, res, next) {
	let technicalFieldFromDb = await TechnicalFieldModel.findOne({ name: req.body.technicalFieldName });
	if (technicalFieldFromDb === null)
	{
		res.status(404);
		res.send("TechnicalField not found!");
		return;
	}

	let questionFromDb = await QuestionModel.findOne({ name: req.body.questionName });
	if (questionFromDb !== null) 
	{
		res.status(409);
		res.send("Question already exists!");
		return;
	}

	let newQuestion = new QuestionModel({
		name: req.body.questionName,
		description: req.body.questionDescription,
		complexity: req.body.questionComplexity,
		technicalField: technicalFieldFromDb._id
	});
	await newQuestion.save();
	res.status(201);
	res.send(newQuestion);
});

router.patch('/', async function(req, res, next) {
	let questionFromDb = await QuestionModel.findOne({ name: req.body.questionName });
	if (questionFromDb === null)
	{
		res.status(404);
		res.send("Question not found!");
		return;
	}

	if (req.body.technicalFieldName !== null)
	{
		let technicalFieldFromDb = await TechnicalFieldModel.findOne({ name: req.body.technicalFieldName });
		if (technicalFieldFromDb === null)
		{
			res.status(404);
			res.send("TechnicalField not found!");
			return;
		}
		await QuestionModel.updateOne(
			{ name: req.body.questionName },
			{ 
				description: req.body.questionDescription,
				complexity: req.body.questionComplexity,
				technicalField: technicalFieldFromDb._id
			});
	}
	else 
	{
		await QuestionModel.updateOne(
			{ name: req.body.questionName },
			{ 
				description: req.body.questionDescription,
				complexity: req.body.questionComplexity
			});
	}

	questionFromDb = await QuestionModel.findOne({ name: req.body.questionName });

	res.status(200);
	res.send(questionFromDb);
});

router.delete('/', async function(req, res, next) {
	let questionFromDb = await QuestionModel.findOne({ name: req.body.questionName });
	if (questionFromDb === null)
	{
		res.status(404);
		res.send("Question not found!");
		return;
	}

	await QuestionModel.deleteOne({ name: req.body.questionName });

	questionFromDb = await QuestionModel.findOne({ name: req.body.questionName });

	if (questionFromDb !== null){
		res.status(304);
		res.send("Error! Question wasn't deleted!");
		return;
	}

	res.status(200);
	res.send("Question was deleted successfully!");
});

router.put('/', async function(req, res, next) {
	let technicalFieldFromDb = await TechnicalFieldModel.findOne({ name: req.body.technicalFieldName });
	if (technicalFieldFromDb === null)
	{
		res.status(404);
		res.send("TechnicalField not found!");
		return;
	}

	let questionFromDb = await QuestionModel.findOne({ name: req.body.questionName });
	if (questionFromDb !== null)
	{
		await QuestionModel.updateOne(
			{ name: req.body.questionName },
			{ 
				description: req.body.questionDescription,
				complexity: req.body.questionComplexity,
				technicalField: technicalFieldFromDb._id
			});

			questionFromDb = await QuestionModel.findOne({ name: req.body.questionName });

		res.status(200);
		res.send(questionFromDb);
		return;
	}

	let newQuestion = new QuestionModel({
		name: req.body.questionName,
		description: req.body.questionDescription,
		complexity: req.body.questionComplexity,
		technicalField: technicalFieldFromDb._id
	});
	await newQuestion.save();
	res.status(201);
	res.send(newQuestion);
});

export const questionsRouter = router;