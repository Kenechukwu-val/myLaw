const addTalk = require('../models/addTalk_model'); 

const addAttendee = require('../models/addAttendee_model');

const attendeeTotalk = require('../models/attendee_to_talk');

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

//Deletes talk  with an Id
exports.delete_talk = ( req, res, next ) => {
    const talkId = req.params.talkId;
    
    addTalk.deleteOne(talkId) 
        .then(result => {
            console.log(result);
            res.status(200).json({ message: 'Talk deleted successfully'})
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

//Creates and adds an attendee to a talk based on the ID
exports.attendee_to_talk = ( req, res, next ) => {
    const attendee_to_Talk = new attendeeTotalk( {
        content: req.body.content, 
        attendee: req.body.attendee
    })
    attendee_to_Talk
        .save()
        .then(result => {
            res.status(200).json({
                message: 'Attendee added to a talk',
                attendee: result
            })
        })
        .catch(err => {
            if (!err.statusCode) {
              err.statusCode = 500;
            }
            next(err);
        });

}

