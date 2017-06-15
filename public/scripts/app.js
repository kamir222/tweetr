"use strict";
/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
 // Test / driver code (temporary). Eventually will get this from the server.

// var data = [
//   {
//     "user": {
//       "name": "Newton",
//       "avatars": {
//         "small":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_50.png",
//         "regular": "https://vanillicon.com/788e533873e80d2002fa14e1412b4188.png",
//         "large":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_200.png"
//       },
//       "handle": "@SirIsaac"
//     },
//     "content": {
//       "text": "If I have seen further it is by standing on the shoulders of giants"
//     },
//     "created_at": 1461116232227
//   },
//   {
//     "user": {
//       "name": "Descartes",
//       "avatars": {
//         "small":   "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_50.png",
//         "regular": "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc.png",
//         "large":   "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_200.png"
//       },
//       "handle": "@rd" },
//     "content": {
//       "text": "Je pense , donc je suis"
//     },
//     "created_at": 1461113959088
//   },
//   {
//     "user": {
//       "name": "Johann von Goethe",
//       "avatars": {
//         "small":   "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_50.png",
//         "regular": "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1.png",
//         "large":   "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_200.png"
//       },
//       "handle": "@johann49"
//     },
//     "content": {
//       "text": "Es ist nichts schrecklicher als eine tätige Unwissenheit."
//     },
//     "created_at": 1461113796368
//   }
// ];



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
    //console.log(createTweetElement(tweet).html())
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
    $(".new-tweet").toggle( "slow", function() {
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
