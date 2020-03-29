const mongoose = require('mongoose');

const ArtSchema = mongoose.Schema({
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'users'
	},
	title: {
		type: String,
		default: 'undefined'
	},
	date: {
		type: Date,
		default: Date.now
	},
	price: {
		type: Number,
		default: 0.0
	},
	img: {
		type: String
	},
	tag: [ String ]
});
module.exports = mongoose.model('art', ArtSchema);
