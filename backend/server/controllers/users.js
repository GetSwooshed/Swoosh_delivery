const express = require('express');
const router = express.Router();  
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const User = require('../models/user');

exports.register = (req,res,next) => {
    User.find({email: req.body.email})
    .exec()
    .then(result => {
        if(result.length >= 1) {
            res.status(409).json({
                message: 'Email already exists'
            })
        } 
        else {
            bcrypt.hash(req.body.password, 10, (err, hash) => {
                if(err) {
                    return res.status(500).json({
                        error: err
                    });
                }
                else{
                    const user = new User({ 
                        _id: mongoose.Types.ObjectId(),
                        email: req.body.email,
                        password: hash
                    });
                    user.save()
                    .then(result => {
                        console.log(result);
                        res.status(201).json({ 
                        message: "User successfully created",
                        userId: result._id
                    })
                })
                .catch(err => {
                    console.log(err);
                    res.status(500).json( { error: err});
                })
                }
            });
        }
    })
}

exports.login = (req, res, next) => {
    User.findOne( {email: req.body.email })
    .exec()
    .then(user => {
        if(user === null) {
            return res.status(401).json({
                message: 'Auth failed'
            })
        }
        bcrypt.compare(req.body.password, user.password, (err, result) => {
            if(result) {
                res.status(200).json({
                    message: 'Successful login',
                });
            }
            else {
                return res.status(401).json({
                    message: 'Auth failed'
                });
            }
        });
    })
    .catch(err => {
        console.log(error);
        res.status(500).json( { error: err } );
    });
}