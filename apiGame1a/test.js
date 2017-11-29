"use strict";
function Jeopardy($widget)
{

    this.update = function()
    {
        $(".results", $widget).hide();
        $(".loading", $widget).show();
		getLocation();
		getCurrentWeather();
       
    };

    function getQuestion()
    {
        $.ajax({
            url: "http://jservice.io/api/random",
            dataType : "json"
        })
        .done(function(data) { populateWeather(data); })
        .fail(function(jqXHR, textStatus, errorThrown) {
        showError(errorThrown);
		console.log("error");
        });

        
    }

    function populateWeather(data) 
    {
        var observation = data.properties.periods[0];
       
        $(".results header img", $widget)
            .attr("src", observation.icon);
        
        
        $(".conditions>span").each(function(i, e)
        {
            var $span = $(this);
            var field = $span.data("field");
            $(this).text(observation[field]);

        });
         
        $(".loading", $widget).fadeOut(function() 
        {
            $(".results", $widget).fadeIn();
        });
    }

    function getLocation()
    {
        if (navigator.geolocation)
        {
            navigator.geolocation.getCurrentPosition(
            function(position)
            {
                $("#latitude").val(position.coords.latitude);
                $("#longitude").val(position.coords.longitude);
            },
            function(error)
            {
                $("#controls .error")
                    .text("ERROR: " + error.message)
                    .slideDown();
            });
        }

        
    }
	
	function showError(error)
	{
		$(".error").text(error);
		alert("wow theres a failed ajax call");
	}
	

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
       Jeopardy = new Jeopardy($weatherWidgetDiv);
       
	    $("#getQuestion").click(function() {
			getQuestion();
		});
	   
    };
} // end MyApp
}
