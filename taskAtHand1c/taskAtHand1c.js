"use strict";

// using a function contructor form to create an object
function taskAtHand1cApp()
{
	var version = "v1.3";
	var appStorage = new AppStorage("taskAtHand1c");

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
		loadTaskList();
		setStatus("ready");
	};
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

	function saveTaskList()
	{
		var tasks = [];
		$("#task-list .task span.task-name").each(function() {
			tasks.push($(this).text())
		});
		appStorage.setValue("taskList", tasks);
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
	
		var $task = $("#task-template .task").clone();
		$("span.task-name", $task).text(taskName);
		
		$("#task-list").append($task);
		
		$("button.delete", $task).click(function(){
			$task.remove();
		});
		
		$("button.move-up", $task).click(function(){
			$task.insertBefore($task.prev());
		});
		
		$("button.move-down", $task).click(function(){
			$task.insertAfter($task.next());
		});
		
		$("span.task-name", $task).click(function(){
			onEditTaskName($(this));
		});

		

	}
	function removeTask($task)
	{
		$task.remove();
		saveTaskList();
	}
	function moveTask($task, moveUP)
	{
		if (moveUP)
		{
			$task.insertBefore($task.prev());
		}
		else
		{
			$task.insertAfter($task.next());
		}
		saveTaskList();
	}
	function loadTaskList()
	{
		var tasks = appStorage.getValue("taskList");
		if (tasks)
		{
			for (var i in tasks)
			{
				addTaskElement(tasks[i]);
			}
		}
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
	
	
} // end MyApp



$(function() {
	window.app = new taskAtHand1cApp();
	window.app.start();
});