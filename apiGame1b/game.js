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

	function newGame()
	{
		$("#Restart").click(function() {
			newGame();
			window.JeopardyGame.start();
		});
	}
	
	function getAnswer() 
	{
		$("#getAnswer").click(function() {
			getAnswer();
		});
	}
	
    function QuestionArea(data) 
    {
       var jData = data[0];
	   $(".question>span").text(jData.question);
	   $(".answer>span").text(jData.answer);
	   $(".category>span").text(jData.category.title);
	   $(".value>span").text(jData.value);

	   
    }

	function showError(error)
	{
		$(".error").text(error);
		alert("Error: Please reload the page");
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

	/* Create Score area/ System
	   Restart button
	   Make buttons WORK
	   Create Game board 
	*/