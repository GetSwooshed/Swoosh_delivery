const express = require('express');
const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://swooshadmin:swoosh559@cluster0-ilppo.mongodb.net/test?retryWrites=true&w=majority',{ useNewUrlParser: true }).catch(err => console.error(err));
mongoose.set('useFindAndModify', false);
mongoose.connection.on('error', console.error.bind(console, 'MongoDB connection error:'));
const Donation = require('../models/donation');

const andrewId = "5e48b1aef5c3da39f10a22e5"
const vId = "5e48c6191de487108138ce6d"

const changeUserId = async () => {
  await Donation.updateMany({ userId: andrewId }, { $set: { userId: vId } })
  console.log("IT WORKED")
}

changeUserId();

