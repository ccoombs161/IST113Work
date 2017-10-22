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
	$("#task-list").append($task);
	var $delete = $("<button class='delete'>X</button>");
	var $moveUp = $("<button class='move-up'>^</button>");
	var $moveDown= $("<button class='move-down'>v</button>");
	$task.append($delete)
		 .append($moveUp)
		 .append($moveDown)
		.append("<span class='task-name'>" + taskName + "</span>");
	$delete.click(function() { $task.remove(); });
	$moveUp.click(function() { $task.insertBefore($task.prev()); });
	$moveDown.click(function() { $task.insertAfter($task.next()); });
	
}

$(function() {
	window.app = new taskAtHand1aApp ();
	window.app.start();
});