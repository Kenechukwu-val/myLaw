const addTalk = require('../models/addTalk_model'); 

const addAttendee = require('../models/addAttendee_model');

exports.add_talk = ( req, res, next) => {
    const content = req.body.content;

    const Add_talk = new addTalk({
        content: content
    });
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

exports.remove_talk = ( req, res, next ) => {
    
}