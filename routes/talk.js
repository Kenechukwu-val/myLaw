const express = require('express');

const talkController = require('../controllers/talk');

const router = express.Router();


//POST /talk/add_talk   creates a new talk
router.post('/add_talk', talkController.add_talk);

//POST /talk/add_attendee  creates a new attendee
router.post('/add_attendee', talkController.add_attendee)

//DELETE /talk/delete_Talk   deletes talk with a specified Id in the request
router.delete('/delete_talk/:talKId', talkController.delete_talk);

//POST /talk/attendee_to_talk 
router.post('/attendee_to_talk/', talkController.attendee_to_talk);



module.exports = router