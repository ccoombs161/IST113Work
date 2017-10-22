"use strict";

// using a function contructor form to create an object
function taskAtHand1aApp()
{
	var version = "v1.0";

	// creating a private function
	function setStatus(message)
	{
		$("#app>footer").text(message);
	}

	// creating a public function
	this.start = function()
	{
		$("#new-task-name").keypress(function(e) {
			if (e.which == 13)  // Enter key
			{
				addTask();
				return false;
			}
		})
		.focus();

		$("#app>header").append(version);
		setStatus("ready");
	};
} // end MyApp

function addTask()
{
	var taskName = $("#new-task-name").val();
	if (taskName)
	{
		addTaskElement(taskName);
		// Reset text field 
		$("#new-task-name").val("").focus();
	}
}
function addTaskElement (taskName)
{
	var $task = $("<li></li>");
	$task.text(taskName);
	$("#task-list").append($task);
}
/* 	JQuery's shorthand for the document ready event handler
		could be written: $(document).ready(handler);

		When this page loads, we'll create a global variable
		named "app" by attaching it to the "window" object
		(part of the BOM - Browser Object Model)
*/
$(function() {
	window.app = new taskAtHand1aApp();
	window.app.start();
});