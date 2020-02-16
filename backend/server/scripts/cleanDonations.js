const express = require('express');
// const mongoose = require('mongoose');
// mongoose.connect('mongodb+srv://swooshadmin:swoosh559@cluster0-ilppo.mongodb.net/test?retryWrites=true&w=majority',{ useNewUrlParser: true }).catch(err => console.error(err));
// mongoose.set('useFindAndModify', false);
// mongoose.connection.on('error', console.error.bind(console, 'MongoDB connection error:'));
const Donation = require('../models/donation');

const cleanDonations = async () => {
  await Donation.updateMany({}, { $set: { pickedUp: false } });
  console.log("IT WORKED")
}
// cleanDonations();