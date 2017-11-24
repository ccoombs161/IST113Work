"use strict";

// using a function contructor form to create an object
function MyApp()
{
	var version = "v1.0";

	// creating a private function
	function setStatus(message)
	{
		$("#app>footer").text(message);
	}

	this.start = function()
    {
		$("#app>header").append(version);
		setStatus("ready");
		var $weatherWidgetDiv = $("#weather-widget");
       WeatherWidget = new WeatherWidget($weatherWidgetDiv);
       
	    $("#getWeather").click(function() {
			WeatherWidget.update();
		});
	   
    };
} // end MyApp


$(function() {
	window.app = new MyApp();
	window.app.start();
});