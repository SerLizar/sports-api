const express = require('express');
const router = express.Router();
const {ListSports} = require('./model');

router.get('/list-sports', (req, res, next) => {
	ListSports.get()
		.then(sports => {
			res.status(200).json({
				message: "Successfully sent the list of sports",
				status: 200,
				sports: sports
			});
		})
		.catch(err => {
			res.status(500).json({
				message: "Unable to sent the list of sports, something seems to be wrong with the server",
				status: 500
			});
			return next();
		});
});

router.get('/list-sports/:id', (req, res, next) => {
	let sportId = req.params.id;
	let infoOfAllSports = ListSports.get();

	infoOfAllSports.forEach(item => {
		if (item.id == sportId) {
			res.status(200).json({
				message : "Successfully sent the sport",
				status : 200,
				sport : item
			});
			return next();
		}
	});
	res.status(404).json({
		message : "Sport not found in the list",
		status : 404
	});
	return next();
});

router.post('/post-sport', (req, res, next) => {

	let requiredFields = ['id', 'name'];

	for (let field of requiredFields) {
		if (! (field in req.body)){
			res.status(406).json({
				message : `Missing field ${field} in body.`,
				status : 406
			});
			return next();
		}
	}

	let sportId = req.body.id;
	/*
	let infoOfAllSports = ListSports.get();
	let result = infoOfAllSports.forEach((sport) => {
		if (sportId == sport.id){
		 	res.status(409).json({
				message : `That id is already in use.`,
				status : 409
			});
			return next();
		}
	});
	console.log(result);
	*/
	let sportToAdd = {
		id: sportId,
		name: req.body.name
	};

	ListSports.post(sportToAdd)
		.then(sport => {
			res.status(201).json({
				message : "Successfully added the sport",
				status : 201,
				sport : sport
			});
		})
		.catch(err => {
			res.status(500).json({
				message : "Unable to add the sport, something seems to be wrong with the server",
				status : 500,
				sport : sport
			});
			return next();
		});
});

router.put('/update-sport/:id', (req, res, next) => {

	let requiredFields = ['name'];

	requiredFields.forEach((field) => {
		if (! (field in req.body)){
			res.status(406).json({
				message : `Missing field ${field} in body.`,
				status : 406
			});
			return next();
		}
	});

	let sportId = req.params.id;

	if (sportId){
		sportsArray.forEach((item) => {
			if (item.id == sportId){
				sportsArray[index].name = req.body.name;
				res.status(200).json({
					message : "Successfully updated the sport",
					status : 200,
					sport : item
				});
			}
		});
		res.status(404).json({
			message : "Sport not found in the list",
			status : 404
		}).send("Finish");;
	}
	else{
		res.status(406).json({
			message : "Missing param 'id'",
			status : 406
		}).send("Finish");;
	}
});

router.delete('/remove-sport/:id', (req, res) => {
	let requiredFields = ['id'];

	for ( let i = 0; i < requiredFields.length; i ++){
		let currentField = requiredFields[i];

		if (! (currentField in req.body)){
			res.status(406).json({
				message : `Missing field ${currentField} in body.`,
				status : 406
			});

			next();
		}
	}
	let sportId = req.params.id;

	if (sportId){
		if(sportId == req.body.id){

			ListSports.delete(sportId)
				.then(sport => {
					res.status(204).json({
						message : "Successfully deleted the sport",
						status : 204,
						sport : sport
					});
				})
				.catch(err => {
					res.status(404).json({
						message : "Sport not found in the list",
						status : 404
					}).send("Finish");
				})
	
		}
		else{
			res.status(400).json({
				message : "Param and body do not match",
				status : 400
			});

			next();
		}
	}
	else{
		res.status(406).json({
			message : "Missing param 'id'",
			status : 406
		});

		next();
	}
});

module.exports = router;

/*

app.delete('/remove-sport/:id', jsonParser, (req, res) => {
	let requiredFields = ['id'];
	for ( let i = 0; i < requiredFields.length; i ++){
		let currentField = requiredFields[i];
		if (! (currentField in req.body)){
			res.status(406).json({
				message : `Missing field ${currentField} in body.`,
				status : 406
			}).send("Finish");
		}
	}
	let sportId = req.params.id;
	if (sportId){
		if(sportId == req.body.id){
			sportsArray.forEach((item, index) => {
				if (item.id == sportId){
					sportsArray.splice(index, 1);
					res.status(204).json({
						message : "Successfully deleted the sport",
						status : 204,
						sport : item
					});
				}
			});
			res.status(404).json({
				message : "Sport not found in the list",
				status : 404
			}).send("Finish");
		}
		else{
			res.status(400).json({
				message : "Param and body do not match",
				status : 400
			}).send("Finish");
		}
	}
	else{
		res.status(406).json({
			message : "Missing param 'id'",
			status : 406
		}).send("Finish");
	}
});
*/

/*
let sportsArray = [
	{
		name: "Basketball",
		id: 123
	},
	{
		name: "Soccer",
		id: 456
	},
	{
		name: "Football",
		id: 789
	}
]

app.get('/list-sports', (req, res) => {
	res.status(200).json({
		message: "Successfully sent the list of sports",
		status: 200,
		sports: sportsArray
	});
});

app.get('/list-sports/:id', (req, res) => {
	let sportId = req.params.id
	console.log(sportId);
	sportsArray.forEach(sport => {
		if (sport.id == sportId) {
			res.status(200).json({
				message: "Successfully sent the sport",
				status: 200,
				sport: sport
			});
		}
	});

	res.status(404).json({
		message: "Sport not found",
		status: 404
	});
});
*/
