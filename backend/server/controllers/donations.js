const express = require('express');  
const mongoose = require('mongoose');
const Donation = require('../models/donation');

exports.postDonation = (req, res, next) => {
	const donation = new Donation({ 
        _id: mongoose.Types.ObjectId(),
        userId: userId,
		coords: req.body.coords,
		item: req.body.item
	})
	.save()
	.then(result => {
		console.log(result); 
		res.status(201).json({ 
			message: 'Created Donation Successfully',
			createdProduct: result._id
		});
	})
	.catch(err => { 
		console.log(err + ' here') ;
		res.status(500).json({ error: err });
	});
}
