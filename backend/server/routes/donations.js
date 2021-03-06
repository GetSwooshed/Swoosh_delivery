const express = require('express');
const router = express.Router();

const multer = require('multer');

const storage = multer.diskStorage({ 
    destination: function (req, file, cb) {
        cb(null, './uploads/');
    },
    filename: function (req, file, cb) {
        const now = new Date().toISOString(); const date = now.replace(/:/g, '-'); cb(null, date + file.originalname);
    } 
})
const upload = multer({ storage: storage });
const donationController = require('../controllers/donations.js');

router.post('/', donationController.postDonation);

router.get('/unclaimed', donationController.getUnclaimedDonations);


router.delete('/:id', donationController.deleteDonation);

//router.get('/:id', donationController.getDontaion);

//router.get('/filter/:id', eventController.filterDonations);

module.exports = router; 