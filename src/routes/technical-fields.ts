import express from 'express';
import { TechnicalFieldModel } from '../models/technical-field';

const router = express.Router();

router.get('/', async function(req, res, next) {
	res.send(await TechnicalFieldModel.find({}));
});

router.post('/', async function(req, res, next) {
	let technicalFieldFromDb = await TechnicalFieldModel.findOne({ name: req.body.technicalFieldName });
	if (technicalFieldFromDb !== null)
	{
		res.status(409);
		res.send("TechnicalField already exists!");
		return;
	}

	let newTechnicalField = new TechnicalFieldModel({
		name: req.body.technicalFieldName,
		order: req.body.technicalFieldOrder
	});
	await newTechnicalField.save();
	res.status(201);
	res.send(newTechnicalField);
});

router.patch('/', async function(req, res, next) {
	let technicalFieldFromDb = await TechnicalFieldModel.findOne({ name: req.body.technicalFieldName });
	if (technicalFieldFromDb === null)
	{
		res.status(404);
		res.send("TechnicalField not found!");
		return;
	}

	await TechnicalFieldModel.updateOne(
		{ name: req.body.technicalFieldName },
		{ 
			order: req.body.technicalFieldOrder
		});

	technicalFieldFromDb = await TechnicalFieldModel.findOne({ name: req.body.technicalFieldName });

	res.status(200);
	res.send(technicalFieldFromDb);
});

router.delete('/', async function(req, res, next) {
	let technicalFieldFromDb = await TechnicalFieldModel.findOne({ name: req.body.technicalFieldName });
	if (technicalFieldFromDb === null)
	{
		res.status(404);
		res.send("TechnicalField not found!");
		return;
	}

	await TechnicalFieldModel.deleteOne({ name: req.body.technicalFieldName });

	technicalFieldFromDb = await TechnicalFieldModel.findOne({ name: req.body.technicalFieldName });

	if (technicalFieldFromDb !== null){
		res.status(304);
		res.send("Error! TechnicalField wasn't deleted!");
		return;
	}

	res.status(200);
	res.send("TechnicalField was deleted successfully!");
});

router.put('/', async function(req, res, next) {
	let technicalFieldFromDb = await TechnicalFieldModel.findOne({ name: req.body.technicalFieldName });
	if (technicalFieldFromDb !== null)
	{
		await TechnicalFieldModel.updateOne(
			{ name: req.body.technicalFieldName },
			{ 
				order: req.body.technicalFieldOrder
			});

		technicalFieldFromDb = await TechnicalFieldModel.findOne({ name: req.body.technicalFieldName });

		res.status(200);
		res.send(technicalFieldFromDb);
		return;
	}

	let newTechnicalField = new TechnicalFieldModel({
		name: req.body.technicalFieldName,
		order: req.body.technicalFieldOrder
	});
	await newTechnicalField.save();
	res.status(201);
	res.send(newTechnicalField);
});

export const technicalFieldsRouter = router;