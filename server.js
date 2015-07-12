// require express framework and additional modules
var express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    _ = require("underscore");

// tell app to use bodyParser middleware
app.use(bodyParser.urlencoded({extended: true}));

// get js and css files from public folder
app.use(express.static(__dirname + '/public'));

//array to hold all api data (list of posts)
var posts = [];

//STATIC ROUTES

	//root route to display main html page
	app.get('/', function (req, res) {
	  res.sendFile(__dirname + '/views/index.html');
	});

	//route to display all 'posts' data - in JSON 
	app.get('/posts', function (req, res) {
		res.json(posts);
	});
	//route to display data for one post - in JSON
	app.get('/posts/:id', function (req, res) {
		var targetId = parseInt(req.params.id);
		var foundPost = _.findWhere(posts, {id: targetId});
		console.log(foundPost);
		res.send(foundPost);
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
			newNote.id = 1
		};

		//add newNote to 'notes' array
		posts.push(newNote);

		//send newNote as JSON response
		res.json(newNote);
	});

	//respond to $.ajax put request to edit existing note
	app.put('/api/posts/:id', function (req, res) {
		// set the value of the id
		var targetId = parseInt(req.params.id);

		// find item in `posts` array matching the id and set variable
		var foundPost = _.findWhere(posts, {id: targetId});

		// update the note's title 
		foundPost.title = req.body.title;

		// update the note's content
		foundPost.content = req.body.content;

		console.log(foundPost);
		// send back edited object
		res.json(foundPost);
	});

	//respond to $.ajax delete request to delete a specific note
	app.delete('/api/posts/:id', function (req, res) {
	  console.log(posts);
	  // set the value of the id and find it in 'posts' array
	  var targetId = parseInt(req.params.id);
	  console.log(targetId);
	  var foundPost = _.findWhere(posts, {id: targetId});
	  console.log('foundPost 1:' + foundPost);

	  // get the index value of the found post
	  var index = posts.indexOf(foundPost);
	  console.log("index: " + index);
	  
	  // remove the item at that index, only remove 1 item
	  posts.splice(index, 1);
	  console.log(posts);
	  
	  // send back deleted object
	  console.log('foundPost2: ' + foundPost);
	  res.json(foundPost);
	});


// listen on port 3000
app.listen(3000, function () {
  console.log('server started on localhost:3000');
});