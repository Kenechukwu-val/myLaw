const addTalk = require('../models/addTalk_model'); 

const addAttendee = require('../models/addAttendee_model');

//Creates and Save  a new talk
exports.add_talk = ( req, res, next) => {
    const content = req.body.content;

    //Validates request
    if ( !content ) {
        return res.status(400).json({
            message: "Talk content cannot be empty"
        });
    }

    //Creates a Talk
    const Add_talk = new addTalk({
        content: content
    });

    //Save the talk created in the database
    Add_talk
        .save()
        .then(docs => {
            res.status(201).json({
                message: 'Talk Added',
                talk: docs
            });
        })
        .catch(err => {
            if (!err.statusCode) {
              err.statusCode = 500;
            }
            next(err);
        });
};

//Creates and Save a new Attendee
exports.add_attendee = ( req, res, next ) => {
    const attendee = req.body.attendee;

    const Add_attendee = new addAttendee({
        attendee: attendee
    });
    Add_attendee
        .save()
        .then(docs => {
            res.status(201).json({
                message: 'Attendee Added',
                attendee: docs
            });
        })
        .catch(err => {
            if (!err.statusCode) {
              err.statusCode = 500;
            }
            next(err);
        });
};

//Deletes talk  with an Id
exports.delete_talk = ( req, res, next ) => {
    const talkId = req.params.talkId;

    addTalk.deleteOne(talkId)
    .then(result => {

        if ( !result ) {
            res.status(404).json({
                message: 'No Talk found'
            });
        }
        res.status(200).json({ message: 'Talk Deleted'})
    })
    .catch(err => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};