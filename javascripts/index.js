function createCookie(name, value, days) {
	var expires;

	if (days) {
		var date = new Date();
		date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
		expires = "; expires=" + date.toGMTString();
	} else {
		expires = "";
	}

	document.cookie = name + "=" + value + expires + "; path=/";
}

function readCookie(name) {
	var nameEQ = name + "=";
	var cookieArray = document.cookie.split(";");
	var i;

	for (i = 0; i < cookieArray.length; i += 1) {
		var cookie = cookieArray[i];

		while (cookie.charAt(0) === " ") {
			cookie = cookie.substring(1, cookie.length);
		}

		if (cookie.indexOf(nameEQ) === 0) {
			return cookie.substring(nameEQ.length, cookie.length);
		}
	}

	return null;
}

function deleteCookie(name) {
	createCookie(name, "", -1);
}

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
	modal = $("<div style='display: none;'><div id='modal-pop'></div><div id='modal-content'><a href='#javascript-close' class='modal-close'><img src='/images/circle-x.png' alt='Close' style='width: 20px;' title='Close' /></a><div id='modal-inner-content' style='overflow-y: scroll;'></div></div></div>");
	modalOverlay = $('#modal-pop', modal);
	modalContent = $('#modal-inner-content', modal);
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

		$("#temp-message").remove();

		modal.find('#modal-content').append(modalLoader);

		// Set modal height relative to current
		modalContent.css("overflow-y", "scroll");
		modalContent.css('height', (innerHeight - 250) + 'px');

		modal.show();
		modalContent.load(this.href + ' #content', function() {
			modalLoader.remove();
		});
	});

	if (readCookie("temppopup") === null) {
		if ($(".home").length !== 0) {
			var tempMessage = $("<p id=\"temp-message\" style=\"text-align: center;\">We are hard at work in the lab formulating a new MOJO Media Labs website.<br />Launching by January 2012<br /><a href=\"#javascript-close\" class=\"temp-modal-close\"><img src=\"images/flask.png\" alt=\"New site coming soon!\" /><br />Click the button to enter the temporary MOJO site.</a></p>");

			modalContent.css("overflow-y", "hidden");

			modalContent.append(tempMessage);

			$(".temp-modal-close").bind('click', function(e){ e.preventDefault(); modal.hide('fast'); });

			modal.show();
		}

		createCookie("temppopup", true);
	}

	$(".home #avoid-ram").animate({ bottom: '+=43' }, 2000, function() { });

	$("#team").tabs();
});
