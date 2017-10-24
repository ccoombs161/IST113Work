"use strict";

// using a function contructor form to create an object
function taskAtHand1bApp()
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
	var $delete = $("<button class='delete'>X</button>");
	var $moveUp = $("<button class='move-up'>^</button>");
	var $moveDown= $("<button class='move-down'>v</button>");
	$task.append($delete)
		 .append($moveUp)
		 .append($moveDown)
		.append("<span class='task-name'>" + taskName + "</span>");
	$("#task-list").append($task);
	$delete.click(function() { $task.remove(); });
	$moveUp.click(function() { $task.insertBefore($task.prev()); });
	$moveDown.click(function() { $task.insertAfter($task.next()); });
	
	var $task = $("#task-template . task").clone();
	$("span.task-name", $task).text(taskName);

	$("#task-list").append($task);

	$("button.delete", $task).click(function() {
		$task.remove();
	});
	$("button.move-up", $task).click(function() {
		$task.insertBefore($task.prev());
	});
	$("button.move-down", $task).click(function() {
		$task.insertAfter($task.next());
	});

	$("span.task-name", $task).click(function() {
		onEditTaskName($(this));
	});

	$("input.task-name", $task).change(function(){
		onChangeTaskName($(this));
	})

}
function onEditTaskName($span)
{
	$span.hide()
		.siblings("input.task-name")
		.val($span.text())
		.show()
		.focus();


}
function onChangeTaskName($input){
	$input.hide();
	var $span = $input.siblings("span.task-name");
	if ($input.val()){
		$span.text($input.val());
	}
	$span.show();
}

$(function() {
	window.app = new taskAtHand1bApp ();
	window.app.start();
});