"use strict";
function JeopardyGame()
{
    function getQuestion()
    {
        $.ajax({
            url: "http://jservice.io/api/random",
            dataType : "json"
        })
        .done(function(data) { QuestionArea(data); })
        .fail(function(jqXHR, textStatus, errorThrown) {
        showError(errorThrown);
		console.log("error");
        });
    }

	function contestant()
	{
		$("#getQuestion").click(function() {
			getQuestion();
		});
	}
    function QuestionArea(data) 
    {
       var jData = data[0];
	   $(".question>span").text(jData.question);
	   $(".answer>span").text(jData.answer);
	   $(".category>span").text(jData.category.title);
	   
    }

	function showError(error)
	{
		$(".error").text(error);
		alert("wow theres a failed ajax call");
	}
	
	this.start = function()
    {
	   contestant(); 
    };
	
	
}

$(function() {
		window.JeopardyGame = new JeopardyGame();
		window.JeopardyGame.start();
	});