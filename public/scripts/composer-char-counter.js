"use strict";
$(document).ready(function () {

  //counter
  $('textarea').on('keyup', function () {
    let textLength = $(this).val().length;
    $('.counter').text(140 - textLength);

    if (textLength > 140)
      $('.counter').css('color', 'red');
    else
      $('.counter').css('color', 'black');
  });

});
