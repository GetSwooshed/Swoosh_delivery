const express = require('express');
const router = express.Router();

const userController = require('../controllers/users.js');

router.put('/register', userController.register);

router.get('/:id/donations', userController.getDonations);

router.post('/login', userController.login);

//router.get('/', userController.getUsers); 

//router.get('/:id(\\d+)', userController.getUser); 

//router.get('/claim/:UserId(\\d+)', userController.getClaim);

//router.delete('/claim',checkAuth, userController.deleteClaim);

module.exports = router; 