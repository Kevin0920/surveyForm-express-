// require express
var express = require("express");
// path module -- try to figure out where and why we use this
var path = require("path");
var session = require('express-session');
var app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "./static")));
app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs');


app.use(session({secret:"name"}));
// Home route
app.get('/', function(req, res) {
 res.render("index");
})

app.post('/users', function(req, res) {
 console.log("POST DATA", req.body);
 req.session.data = req.body;
 console.log(req.session.data);
 res.redirect('/result');
})

// show one person info
app.get('/result', function(req, res) {
  res.render("result", {userData: req.session.data});
})



app.listen(8000, function() {
 console.log("listening on port 8000");
});
