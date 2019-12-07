const express = require('express');

const body_parser = require('body-parser');

const port = process.env.PORT || 3000;

const addTalkRoutes = require('./routes/add_talk');

const addAttendeeRoutes = require('./routes/add_attendee');

const removeTalkRoutes = require('./routes/remove_talk');

const app = express();


app.use(body_parser.urlencoded({extended: true}));
app.use(body_parser.json());

//Routes 
app.use('/add_talk', addTalkRoutes);
app.use('/add_attendee', addAttendeeRoutes);
app.use('/remove_talk', removeTalkRoutes);




app.listen(port, () => {
    console.log(`Listening at ${port}`)
})