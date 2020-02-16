const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
	_id: mongoose.Schema.Types.ObjectId,
	email: { 
        type: String, 
        required: true,
        unique: true,
        match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
    },
    password: { type: String, required: true },
    postedDonations: [{type: mongoose.Schema.Types.ObjectId, ref: 'donation'}],
    claimedDonations: [{type: mongoose.Schema.Types.ObjectId, ref: 'donation'}]
}); 

module.exports = mongoose.model('user', userSchema);