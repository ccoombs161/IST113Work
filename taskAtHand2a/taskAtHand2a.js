"use strict";

// using a function contructor form to create an object
function taskAtHand2aApp()
{
	var version = "v2.1";
	var appStorage = new AppStorage("taskAtHand2a");

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
			removeTask($task);
		});
		
		$("button.move-up", $task).click(function(){
			moveTask($task, true);
		});
		
		$("button.move-down", $task).click(function(){
			moveTask($task, false);
		});
		
		$("span.task-name", $task).click(function(){
			onEditTaskName($(this));
		});

		$("input.task-name", $task).change(function(){
			onChangeTaskName($(this));
		})
		.blur(function(){
			$(this).hide().siblings("span.task-name").show();
		});
		
		$task.click(function() { onSelectTask($task); });
	}
	function removeTask($task)
	{
		$task.remove();
		saveTaskList();
	}
	function moveTask($task, moveUp)
	{
		if (moveUp)
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
	function onChangeTaskName($input)
	{
		$input.hide();
		var $span = $input.siblings("span.task-name");
		if ($input.val()){
			$span.text($input.val());
		}
		$span.show();
	}
	function onSelectTask($task)
	{
		if ($task)
		{
			// Unselect other tasks
			$task.siblings(".selected").removeClass("selected");
			// select this task
			$task.addClass("selected");
		}
	}
	
	
} // end MyApp



$(function() {
	window.app = new taskAtHand2aApp();
	window.app.start();
});