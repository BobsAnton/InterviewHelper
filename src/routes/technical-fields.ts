import express from 'express';
import { TechnicalFieldModel } from '../models/technical-field';
import { QuestionModel } from '../models/question';

const router = express.Router();

router.get('/', async function(req, res, next) {
	res.send(await TechnicalFieldModel.find({}));
});

router.post('/', async function(req, res, next) {
	let technicalFieldFromDb = await TechnicalFieldModel.findOne({ name: req.body.name });
	if (technicalFieldFromDb !== null)
	{
		res.status(409);
		res.send("TechnicalField already exists!");
		return;
	}

	let newTechnicalField = new TechnicalFieldModel({
		name: req.body.name,
		order: req.body.order
	});
	await newTechnicalField.save();
	res.status(201);
	res.send(newTechnicalField);
});

router.patch('/', async function(req, res, next) {
	let technicalFieldFromDb = await TechnicalFieldModel.findOne({ name: req.body.name });
	if (technicalFieldFromDb === null)
	{
		res.status(404);
		res.send("TechnicalField not found!");
		return;
	}

	await TechnicalFieldModel.updateOne(
		{ name: req.body.name },
		{ 
			order: req.body.order
		});

	technicalFieldFromDb = await TechnicalFieldModel.findOne({ name: req.body.name });

	res.status(200);
	res.send(technicalFieldFromDb);
});

router.delete('/', async function(req, res, next) {
	let technicalFieldFromDb = await TechnicalFieldModel.findOne({ name: req.body.name });
	if (technicalFieldFromDb === null)
	{
		res.status(404);
		res.send("TechnicalField not found!");
		return;
	}

	const result = await TechnicalFieldModel.findOne({ name: req.body.name });

	let questionFromDb = await QuestionModel.find({ technicalField: technicalFieldFromDb._id });
	if (questionFromDb !== null)
	{
		await QuestionModel.deleteMany({ technicalField: technicalFieldFromDb._id });
	}

	await TechnicalFieldModel.deleteOne({ name: req.body.name });

	technicalFieldFromDb = await TechnicalFieldModel.findOne({ name: req.body.name });

	if (technicalFieldFromDb !== null){
		res.status(304);
		res.send("Error! TechnicalField wasn't deleted!");
		return;
	}

	res.status(200);
	res.send(result);
});

router.put('/', async function(req, res, next) {
	let technicalFieldFromDb = await TechnicalFieldModel.findOne({ name: req.body.name });
	if (technicalFieldFromDb !== null)
	{
		await TechnicalFieldModel.updateOne(
			{ name: req.body.name },
			{ 
				order: req.body.order
			});

		technicalFieldFromDb = await TechnicalFieldModel.findOne({ name: req.body.name });

		res.status(200);
		res.send(technicalFieldFromDb);
		return;
	}

	let newTechnicalField = new TechnicalFieldModel({
		name: req.body.name,
		order: req.body.order
	});
	await newTechnicalField.save();
	res.status(201);
	res.send(newTechnicalField);
});

export const technicalFieldsRouter = router;