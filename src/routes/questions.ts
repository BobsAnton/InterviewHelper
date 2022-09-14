import express from 'express';
import { QuestionModel } from '../models/question';
import { TechnicalFieldModel } from '../models/technical-field';
const router = express.Router();

router.get('/', async function(req, res, next) {
	try {
		res.send(await QuestionModel.find({}).populate('technicalField'));
	}
	catch (err) {
		console.error(err);
	}
});

router.post('/', async function(req, res, next) {
	try {
		let technicalFieldFromDb = await TechnicalFieldModel.findOne({ name: req.body.technicalFieldName });
		if (technicalFieldFromDb === null)
		{
			res.status(404);
			res.send("TechnicalField not found!");
			return;
		}
	
		let questionFromDb = await QuestionModel.findOne({ name: req.body.name });
		if (questionFromDb !== null)
		{
			res.status(409);
			res.send("Question already exists!");
			return;
		}
	
		let newQuestion = new QuestionModel({
			name: req.body.name,
			description: req.body.description,
			complexity: req.body.complexity,
			technicalField: technicalFieldFromDb._id
		});
		await newQuestion.save();

		questionFromDb = await QuestionModel.findOne({ name: req.body.name }).populate('technicalField');

		res.status(201);
		res.send(questionFromDb);
	}
	catch (err) {
		console.error(err);
	}
});

router.patch('/', async function(req, res, next) {
	try {
		let questionFromDb = await QuestionModel.findOne({ name: req.body.name });
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
				{ name: req.body.name },
				{ 
					description: req.body.description,
					complexity: req.body.complexity,
					technicalField: technicalFieldFromDb._id
				});
		}
		else 
		{
			await QuestionModel.updateOne(
				{ name: req.body.name },
				{ 
					description: req.body.description,
					complexity: req.body.complexity
				});
		}
	
		questionFromDb = await QuestionModel.findOne({ name: req.body.name });
	
		res.status(200);
		res.send(questionFromDb);
	}
	catch (err) {
		console.error(err);
	}
});

router.delete('/', async function(req, res, next) {
	try {
		let questionFromDb = await QuestionModel.findOne({ name: req.body.name });
		if (questionFromDb === null)
		{
			res.status(404);
			res.send("Question not found!");
			return;
		}

		const result = await QuestionModel.findOne({ name: req.body.name }).populate('technicalField');
	
		await QuestionModel.deleteOne({ name: req.body.name });
	
		questionFromDb = await QuestionModel.findOne({ name: req.body.name });
	
		if (questionFromDb !== null){
			res.status(304);
			res.send("Error! Question wasn't deleted!");
			return;
		}
	
		res.status(200);
		res.send(result);
	}
	catch (err) {
		console.error(err);
	}
});

router.put('/', async function(req, res, next) {
	try {
		let technicalFieldFromDb = await TechnicalFieldModel.findOne({ name: req.body.technicalFieldName });
		if (technicalFieldFromDb === null)
		{
			res.status(404);
			res.send("TechnicalField not found!");
			return;
		}
	
		let questionFromDb = await QuestionModel.findOne({ name: req.body.name });
		if (questionFromDb !== null)
		{
			await QuestionModel.updateOne(
				{ name: req.body.name },
				{ 
					description: req.body.description,
					complexity: req.body.complexity,
					technicalField: technicalFieldFromDb._id
				});
	
				questionFromDb = await QuestionModel.findOne({ name: req.body.name });
	
			res.status(200);
			res.send(questionFromDb);
			return;
		}
	
		let newQuestion = new QuestionModel({
			name: req.body.name,
			description: req.body.description,
			complexity: req.body.complexity,
			technicalField: technicalFieldFromDb._id
		});
		await newQuestion.save();
		res.status(201);
		res.send(newQuestion);
	}
	catch (err) {
		console.error(err);
	}
});

export const questionsRouter = router;