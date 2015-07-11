// require express framework and additional modules
var express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    _ = require("underscore");

// tell app to use bodyParser middleware
app.use(bodyParser.urlencoded({extended: true}));

// serve js and css files from public folder
app.use(express.static(__dirname + '/public'));

var posts = [];

//STATIC ROUTES
// set up root route to respond with 'hello world'
app.get('/', function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

//API ROUTES
//respond to $.get request to create new note
app.post('/api/posts', function (req, res) {
	//store params from form data (note title and content)
	var newNote = req.body;

	//set sequential id (last id in existing 'posts array' +1)
	if (posts.length > 0) {
		newNote.id = posts[posts.length - 1].id + 1;
	} else {
		newNote.id = 0
	}

	//add newNote to 'notes' array
	posts.push(newNote);

	//send newNote as JSON response
	res.json(newNote);
});




// listen on port 3000
app.listen(3000, function () {
  console.log('server started on localhost:3000');
});