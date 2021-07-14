const express = require('express');
const mongoose = require('mongoose');
// const bodyParser = require('body-parser');
const path = require('path');

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

mongoose.connect(db)
    .then(() => console.log("Mongodb connected"))
    .catch(err => console.log(err));

app.use('/api/items', items)

//Serve static assets if in production mode
if (process.env.PORT === 'production') {
    //set static folder
    app.use(express.static('client/build'));

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    })
}

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server started on port ${port}`))