const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

let sportSchema = mongoose.Schema({
	id: {type: Number, required: true, unique: true},
	name: {type: String, required: true}
});

let Sports = mongoose.model('Sports', sportSchema);

const ListSports = {
	get: _ => {
		return Sports.find()
			.then(sports => {return sports;})
			.catch(err => {throw new Error(err);});
	},
	post: newSport => {
		return Sports.create(newSport)
			.then(sport => {return sport;})
			.catch(err => {throw new Error(err);});
	}
};

module.exports =  {ListSports};
