"use strict";

function createTweetElement (data) {
  let $tweetArticle =
  `<article class="tweet-article">
    <header>
      <img src=${data.user.avatars.small}>
      <span>${data.user.handle}</span>
      <h3>${data.user.name}</h3>
    </header>
    <div class="content">
    <p>${data.content.text}</p>
    </div>
    <footer>
    <span>${new Date(1000*data.created_at)}</span>
    <i class="fa fa-flag"></i>
    <i class="fa fa-retweet"></i>
    <i class="fa fa-heart"></i>
    </footer>
    </article>`

  return $tweetArticle;
}

function renderTweets(tweets) {
  $('.all-tweets').children().remove();
  tweets.forEach(function (tweet) {
    $('.all-tweets').append(createTweetElement(tweet));
  });
}

function objectifyForm(array) {//serialize data function
  let returnObject = {};

  for (var i = 0; i < array.length; i++){
    returnObject[array[i]['name']] = array[i]['value'];
  }
  return returnObject;
}

function loadTweets () {
  //get request from /tweets
  $.ajax({
    url: '/tweets',
    method: 'GET',
    success: function (response) {
      renderTweets(response.reverse());
    }
  });
}

$(document).ready(function () {

  // toggle button animation
  $(".composeBtn").on('click', function () {
    $(".new-tweet").slideToggle( "slow", function() {
       $( "textarea" ).focus();
     });
   });

  // hover affect for icons in tweets
  $(".all-tweets").hover(function(){
      $("footer .fa").css("display", "inline");
      }, function(){
      $("footer .fa").css("display", "none");
  });

  $(".new-tweet form").on('submit', function (event) {
    event.preventDefault();

    let formArray = $(this).serializeArray().reverse();
    let formObject = objectifyForm(formArray);

    if ($('textarea').val() === ""   ||
        $('textarea').val() === null) {
        alert('you have not entered anything, buddy!');

    } else if ($('textarea').val().length > 140) {
      alert('you\'ve exceeded character count!');
    } else {
      $('textarea').val('');

      //post request to the server
      $.ajax({
          url: '/tweets/',
          method: 'POST',
          data: formObject
        }).then(loadTweets);
    }
  });

  loadTweets();
});
// Test / driver code (temporary)
//console.log($tweet); // to see what it looks like
//$('#all-tweets').append($tweet); // to add it to the page so we can make sure it's got all the right elements, classes, etc.
