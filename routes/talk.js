const express = require('express');

const feedController = require('../controllers/talk');

const router = express.Router();


//POST /feed/add_talk
router.post('/add_talk', feedController.add_talk);

//POST /feed/add_attendee
router.post('/add_attendee', feedController.add_attendee)

//DELETE /feed/remove_talk
router.delete('/remove_talk', feedController.remove_talk);



module.exports = router