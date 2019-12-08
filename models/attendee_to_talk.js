const mongoose = require('mongoose');

const Schema = mongoose.Schema;


const attendee_to_talkSchema = new Schema(
    {
        content: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'addTalk',
            required: true
        },

        attendee: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'addAttendee',
            required: true
        }
    },
    { timestamps: true }
)



module.exports = mongoose.model('attendeeTotalk', attendee_to_talkSchema);