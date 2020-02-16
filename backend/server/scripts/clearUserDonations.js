const express = require('express');
// const mongoose = require('mongoose');
// mongoose.connect('mongodb+srv://swooshadmin:swoosh559@cluster0-ilppo.mongodb.net/test?retryWrites=true&w=majority',{ useNewUrlParser: true }).catch(err => console.error(err));
// mongoose.set('useFindAndModify', false);
// mongoose.connection.on('error', console.error.bind(console, 'MongoDB connection error:'));
const User = require('../models/user');

const clearPostedDonations = async () => {
  await User.updateMany({}, { $set: { postedDonations: [] } });
  console.log("Reset posted donations")
}
const clearClaimedDonations = async () => {
  await User.updateMany({}, { $set: { claimedDonations: [] } });
  console.log("reset claimed donations")
}

// clearPostedDonations();
// clearClaimedDonations();
