$(function() {

 //form to create a new post
 var $newPostForm = $("#new_post_form"); 
 
 // underscore function to compile the html template
 var postingTemplate = _.template($('#post-template').html());

 //element to hold all of the posts
 var $postsSection = $("#posts-section");


 //renders new post to the html page
 function render(noteHtml) {
    var $note = $(postingTemplate(noteHtml));
    $postsSection.append($note)
  }

 // creates new post  
 function create (post_title, post_content) {
    var postData = {title: post_title, content: post_content};
    
    // send POST request to server to create new phrase on API 
   $.post('/api/posts', postData, function(data) {
      var newPost = data;
      render(newPost);
    });
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

    // create new note object from form data and render to the page
    var noteName = $('#postTitle').val();
    var noteContent = $('#postContent').val();
    create(noteName, noteContent);


    // reset the form
    $newPostForm[0].reset();
    $('#postTitle').focus();

    //Form disappears from view
    $(".form-section").toggleClass("display"); 
    $(".welcome").addClass("display");

  });

// end of page
});