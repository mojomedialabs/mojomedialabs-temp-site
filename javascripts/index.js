$(function($){
  var hoverT, body, modal, modalContent;

  body = $('body');
  
  // Function returning Function for opacity management
  hoverT = function(tOpacity){
    return function(e){
      $(this).children(':first').stop().animate( {opacity: tOpacity}, 'slow');
    };
  }

  // Establish the DOM structure of the Modal.
  modal = $("<div id='modal-pop'><div id='modal-content'><a href='#javascript' class='modal-close'>[X]</a><div id='content'></div></div></div>");
  modalContent = $('#content', modal);

  // bind a close event to the .modal-close
  $('.modal-close', modal).bind('click', function(e){ modal.hide('fast'); });


  // Bind to body hiding the modal if it's there, then append the modal to the body
  body.bind('keyup', function(e){
    if (e.keyCode === 27) modal.hide('fast');
  })
  .append(modal);
  
  // Bind the Hover events, then the Click events for the modal pop-up.
  $('#portfolio a').hover( hoverT(0), hoverT(100) )
  .bind('click', function(e){
    if ( e.which === 2 ) return;
    e.preventDefault();
    modalContent.html("<img src='images/ajax-loader.gif'>");
    modal.show();
    modalContent.load(this.href + ' #content');
  });

  

});
