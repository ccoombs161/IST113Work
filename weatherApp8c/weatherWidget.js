function WeatherWidget($widget)
{

    this.update = function()
    {
        $(".results", $widget).hide();
        $(".loading", $widget).show();
        getWeatherReport();
    };

    function getWeatherReport(lat, lon)
    {
        var coords = lat + "," + lon;
		$.ajax({
			url: "https://api.weather.gov" + "/conditions/q/" + coords + ".json",
			datatype : "jsonp"
		})
        .done(function(data) { populateWeather(data); })
        .fail(function(jqXHR, textStatus, errorThrown) {
        showError(errorThrown);
        });
    }
	function getCurrentWeather()
	{
		var lat = $("#latitude").val();
		var lon = $("#longitude").val();
		if (lat && lon)
		{
			$("#weather-widget").fadeIn();
			weatherWidget.update(lat, lon);
		}
	}
    function populateWeather(data) 
    {
        var $observation = data.current_observation;

        $(".results header img", $widget)
            .attr("src", observation.icon_url);
        $(".location>span", $widget)
            .text(data.location.city);
        
        $(".conditions>span").each(function(i, e)
        {
            var $span = $(this);
            var field = $span.data("field");
            $(this).text(observation[field]);

        });
		
		// Comply with the terms of service 
		$(".results footer img", $widget)
			.attr("src", observation.image.url);

        $(".loading", $widget).fadeOut(function () 
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
	
	function showError()
	{
		return;
	}
}
