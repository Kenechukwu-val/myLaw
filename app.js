const express = require('express');

const body_parser = require('body-parser');

const mongoose = require('mongoose');

const port = process.env.PORT || 3000;

const talkRoutes = require('./routes/talk');

//Creates the express app
const app = express();

// parse requests of content-type - application/x-www-form-urlencoded
app.use(body_parser.urlencoded({extended: true}));

// parse requests of content-type - application/json
app.use(body_parser.json());

//Connects to the database and also listens for requests
mongoose
  .connect(
    process.env.MONGODB_URI || 'mongodb://localhost:27017/mylaw',{

        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => {
      console.log('Connected!!')
    })
    .catch(err => {
      console.log('Not connected', err);
    })

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

app.use('/talk', talkRoutes);

  
app.listen(port, () => {
  console.log(`Listening to requests on http://localhost:${port}`)
});