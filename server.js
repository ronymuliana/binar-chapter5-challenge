let debug = true
let port = 8000;

var express = require('express');
var cors = require('cors');
var fs = require('fs');
var app = express();

app.use(express.urlencoded({extended: false}))
app.use(express.json());
app.use(cors());
app.use(express.static(__dirname + '/views'));
app.set('view engine', 'ejs');

if (debug) {
    app.use((req,res,next) => {
        let date = new Date();
        console.log(date.toLocaleString('en-US'), req.method,req.url);
        next();
    })
}

app.use((err, req, res, next) => {
    console.log(err.stack);
    res.status(500).send('Something broke!')
})

const routes = require('./routes/routes')(app,fs);

app.listen(port, () => {
    console.log("Listening on port:", port)
})