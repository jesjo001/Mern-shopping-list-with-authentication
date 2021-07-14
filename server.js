const express = require('express');
const mongoose = require('mongoose');
// const bodyParser = require('body-parser');
const path = require('path');
require('dotenv').config()

const items = require('./route/api/items')
const app = express();
//bodyParser midleware
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));

// app.use(bodyParser.urlencoded());
// app.use(bodyParser.json());

// const db = require('./config/keys').mongoURI;
const db = process.env.MONGODBURI;

mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("Mongodb connected"))
    .catch(err => console.log(err));

app.use('/api/items', items)

//Serve static assets if in production mode
if (process.env.NODE_ENV === 'production') {
    //set static folder
    console.log("before build")
    app.use(express.static('client/build'));
    console.log("after build")


    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    })
}

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server started on port ${port}`))