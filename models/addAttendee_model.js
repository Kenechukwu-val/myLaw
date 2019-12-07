const mongoose = require('mongoose');

const Schema = mongoose.Schema;


const addAttendeeSchema = new Schema(
    {
        attendee: {
            type: String,
            required: true
        }
    },
    { timestamps: true }
)


module.exports = mongoose.model('addAttendee', addAttendeeSchema);