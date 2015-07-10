$(function() {

//form to create a new post
 var $newPostForm = $("#new_post_form"); 
 
 // underscore function to compile the html template
 var postingTemplate = _.template($('#post-template').html());

 //element to hold all of the posts
 var $postsSection = $("#posts-section");

 //constructor function to create new post
 function Posts (post_title, post_content) {
   this.post_title = post_title;
   this.post_content = post_content;
 };

 //variable to hold all of the new instances
 Posts.all = [];

//saves new post to Posts.all array
Posts.prototype.save = function(){
	   Posts.all.push(this);
	   console.log(this);
	 };

//renders new post to the page
Posts.prototype.render = function() {
 // _.each(Posts.all, function (post, index) {
   var $note = $(postingTemplate(this));
   // $note.attr('data-index', index);
   $postsSection.append($note)
   console.log("render works")
   // });
 }


// listen for the click on the 'Post a Note' button
$("#newNoteButton").on('click', function() { 
  // show form to post a new note
  $(".form-section").toggleClass("display"); 
  $('#postTitle').focus();
}); 


//listen for a click on the submit button
  $newPostForm.on('submit', function(event) {
    event.preventDefault();

    // create new note object from form data
    var noteName = $('#postTitle').val();
    var noteContent = $('#postContent').val();
    var note = new Posts(noteName, noteContent);

    // save note
    note.save();

    // render note
    note.render();

    // reset the form
    $newPostForm[0].reset();
    $('#postTitle').focus();

    //Form disappears from view
    $(".form-section").toggleClass("display"); 
    $(".welcome").addClass("display");

  });

});