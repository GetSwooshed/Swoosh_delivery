const express = require('express');  
const mongoose = require('mongoose');
const Donation = require('../models/donation');
const User = require('../models/user');

exports.postDonation = (req, res, next) => {
	new Donation({ 
        _id: mongoose.Types.ObjectId(),
        userId: req.body.userId,
		coords: req.body.coords,
		item: req.body.item
	})
	.save()
	.then(result => {
		User.findOne({_id: req.body.userId})
		.exec()
		.then(user => {
			user.postedDonations.push(result);
			user.save();
			console.log(result); 
			res.status(201).json({ 
				message: 'Created Donation Successfully',
				createdDonation: result._id
			})
		});
	})
	.catch(err => { 
		console.log(err + ' here') ;
		res.status(500).json({ error: err });
	});
}

