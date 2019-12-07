const path = require('path');

const express = require('express');

const body_parser = require('body-parser');

const mongoose = require('mongoose');

const port = process.env.PORT || 3000;

const talkRoutes = require('./routes/talk');

const app = express();


app.use(body_parser.urlencoded({extended: true}));
app.use(body_parser.json());

//General middleware to avoid errors like CORS
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Orign", "*");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({});
    }
    next();
});

//General middleware to log errors
app.use((error, req, res, next) => {
    console.log(error);
    const status = error.statusCode || 500;
    const message = error.message;
    res.status(status).json({ message: message });
  });

app.use('/feed', talkRoutes);


mongoose
  .connect(
    'mongodb+srv://mylaw_db:kenechukwu@mylaw-nno7l.mongodb.net/test?retryWrites=true&w=majority',{
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
  )
  .then(result => {
    app.listen(port, () => {
        console.log(`Listening to requests on http://localhost:${port}`)
    })
  });