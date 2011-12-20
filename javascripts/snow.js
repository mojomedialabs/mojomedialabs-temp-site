$(function() {
	var currentTime = new Date();

	if (currentTime.getMonth() + 1 === 12) {
		var maxSnowFlakes = 20;

		var sinkSpeed = 0.6;

		var maxSnowFlakeSize = 32;

		var minSnowFlakeSize = 8;

		var snowFlakeSizeRange = maxSnowFlakeSize - minSnowFlakeSize;

		var snow = [];

		var marginBottom;

		var marginRight;

		var snowTimer;

		var snowCount = 0;

		var xMV = [];

		var crds = [];

		var leftRight = [];

		var windSpeed = Math.floor((Math.random() - Math.random()) * 5.0);

		var windTimer;

		function randomInteger(range) {
			return Math.floor(range * Math.random());
		}

		function letItSnow() {
			marginBottom = $("body")[0].scrollHeight;

			if ($(window).height() > marginBottom) {
				marginBottom = $(window).height();
			}

			var i;

			for (i = 0; i < maxSnowFlakes; i += 1) {
				crds[i] += xMV[i];
				snow[i].yPosition += snow[i].sink;
				snow[i].xPosition += windSpeed;
				$(snow[i]).css("left", snow[i].xPosition + leftRight[i] * Math.sin(crds[i]));
				$(snow[i]).css("top", snow[i].yPosition);

				if (snow[i].yPosition >= marginBottom - snow[i].size - 4 || snow[i].xPosition < 0 - snow[i].size - 1 || snow[i].xPosition > marginRight - snow[0].size - 1) {
					snow[i].xPosition = randomInteger(marginRight - snow[i].size);
					snow[i].yPosition = 0;
				}
			}

			snowTimer = setTimeout(letItSnow, 50);
		}

		function adjustWindSpeed() {
			var windSpeedChange = Math.floor(Math.random() * 2.0);

			if (Math.random() > 0.5) {
				windSpeedChange *= -1;
			}

			windSpeed += windSpeedChange;

			if (windSpeed > 5) {
				windSpeed = 5;
			}

			if (windSpeed < -5) {
				windSpeed = -5;
			}

			windTimer = setTimeout(adjustWindSpeed, Math.floor(Math.random() * 1000) * 10);
		}

		marginBottom = $("body")[0].scrollHeight;

		marginRight = $(window).width();

		var i;

		for (i = 0; i < maxSnowFlakes; i++) {
			$("body").append("<span id=\"snow-flake-" + i.toString() + "\" style=\"position: absolute; top:-" + maxSnowFlakeSize + "px; z-index: 1000;\"><img src=\"images/snowflake.png\" /></span>");
		}

		for (i = 0; i < maxSnowFlakes; i += 1) {
			crds[i] = 0;
			leftRight[i] = Math.random() * 15;
			xMV[i] = 0.03 + Math.random() / 10;
			snow[i] = $("#snow-flake-" + i.toString());
			snow[i].size = randomInteger(snowFlakeSizeRange) + minSnowFlakeSize;
			$(snow[i]).find("img").width(snow[i].size);
			snow[i].sink = sinkSpeed * snow[i].size / 5;
			snow[i].xPosition = randomInteger(marginRight - snow[i].size);
			snow[i].yPosition = randomInteger(6 * marginBottom - marginBottom - 6 * snow[i].size);
			$(snow[i]).css("left", snow[i].xPosition);
			$(snow[i]).css("top", snow[i].yPosition);
		}

		letItSnow();

		adjustWindSpeed();
	}
});