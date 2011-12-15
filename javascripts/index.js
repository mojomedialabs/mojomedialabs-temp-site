$(function() {
	var hoverT, body, modal, modalOverlay, modalContent, modalLoader;

	body = $("body");

	// Function returning Function for opacity management
	hoverT = function(tOpacity) {
		return function(e) {
			$(this).children(':first').stop().animate( {opacity: tOpacity}, 'slow');
		};
	}

	// Establish the DOM structure of the Modal.
	modal = $("<div style='display: none;'><div id='modal-pop'></div><div id='modal-content'><a href='#javascript-close' class='modal-close'><img src='/images/circle-x.png' alt='Close' style='width: 20px;' title='Close' /></a><div id='content' style='overflow-y: scroll;'></div></div></div>");
	modalOverlay = $('#modal-pop', modal);
	modalContent = $('#content', modal);
	modalLoader = $("<img src='/images/ajax-loader.gif' alt='Loading...' title='Loading...' />");

	// bind a close event to the .modal-close
	$('.modal-close', modal).add(modalOverlay).bind('click', function(e){ e.preventDefault(); modal.hide('fast'); });

	// Bind to body hiding the modal if it's there, then append the modal to the body
	$(document).bind('keyup', function(e) {
		if (e.keyCode === 27) {
			modal.hide('fast');
		}
	});
	body.append(modal);

	// Bind the Hover events, then the Click events for the modal pop-up.
	$('#portfolio a').hover( hoverT(0), hoverT(100) ).bind('click', function(e) {
		if ( e.which === 2 ) {
			return;
		}

		e.preventDefault();
		modal.find('#modal-content').append(modalLoader);

		// Set modal height relative to current
		modalContent.css('height', (innerHeight - 250)+'px')

		modal.show();
		modalContent.load(this.href + ' #content', function() {
			modalLoader.remove();
		});
	});

	$(".home #avoid-ram").animate({ bottom: '+=43' }, 2000, function() { });

	$("#team").tabs();
});
