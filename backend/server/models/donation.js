const mongoose = require('mongoose');

const donationSchema = mongoose.Schema({
	_id: mongoose.Schema.Types.ObjectId,
	userId: { type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true },
    coords: {type: [Number, Number], required: true}, 
    item: String,
	pickedUp: {type: Boolean, default: false },
	address: String,
}); 

module.exports = mongoose.model('donation', donationSchema);