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

	app.get('/posts', function (req, res) {
		res.json(posts);
	});

	app.get('/posts/:id', function (req, res) {
		res.json(posts);
	});

//API ROUTES
	// respond to request for all phrases
	app.get('/api/posts', function (req, res) {
	  // send all phrases as JSON response
	  res.json(posts);
	});

	//respond to $.post request to create new note
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

	//respond to $.put request to edit existing note
	app.put('/api/posts/:id', function (req, res) {
		// set the value of the id
		var targetId = parseInt(req.params.id);

		// find item in `posts` array matching the id and set variable
		var foundPost = _.findWhere(posts, {id: targetId});

		// update the note's title 
		foundPost.title = req.body.title;

		// update the note's content
		foundPost.content = req.body.content;

		// send back edited object
		res.json(foundPost)
	});




// listen on port 3000
app.listen(3000, function () {
  console.log('server started on localhost:3000');
});