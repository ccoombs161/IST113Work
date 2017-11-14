"use strict";

// using a function contructor form to create an object
function taskAtHand3bApp()
{
	var version = "v3.2";
	var appStorage = new AppStorage("taskAtHand3b");
	taskList = new TaskList();
	timeoutId = 0;

	// creating a private function
	function setStatus(msg, noFade)
	{
		$("#app>footer").text(msg).show();
		if (!noFade)
		{
			$("#app>footer").fadeOut(1000);
		}
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
		$("#theme").change(onChangeTheme);
		$("#app>header").append(version); 
		loadTaskList();
		setStatus("ready");
	};
		function addTask()
	{
		var taskName = $("#new-task-name").val();
		if (taskName)
		{
			var task = new Task(taskName);
			taskList.addTask(task);
			appStorage.setValue("nextTaskId", Task.nextTaskId);
			addTaskElement(task);
			saveTaskList();
			// Reset text field 
			$("#new-task-name").val("").focus();	
		}
	}

	function saveTaskList()
	{
		if (timeoutId) clearTimeout(timeoutId);
		setStatus("saving changes...", true);
		timeoutId = setTimeout(function()
		{
			appStorage.setValue("taskList", taskList.getTasks());
			timeoutId = 0;
			setStatus("changes saved.");
		},
		2000);
	}

	function addTaskElement (task)
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
		$task.data("task-id", task.id);
		$("span.task-name", $task).text(task.name);

		$(".details input, .details select", $task).each(function() {
			var $input = $(this);
			var fieldName = $input.data("field");
			$input.val(task[fieldName]);
		});

		$(".details input, .details select", $task).change(function() {
			onChangeTaskDetails(task.id, $(this));
		});

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

		$("button.toggle-details", $task).click(function() {
			toggleDetails($task);
		});
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
		taskList = new TaskList(tasks);
		rebuildTaskList();
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
	function onChangeTheme()
		{
			var theme = $("#theme>option").filter(":selected").val();
			setTheme(theme);
			appStorage.setValue("theme", theme);
		}
	function setTheme(theme) 
	{
		$("#theme-style").attr("href", "themes/" + theme + ".css");
	}
	function loadTheme() 
	{
		var theme = appStorage.getValue("theme");
		if (theme) 
		{
			setTheme(theme);
			$("#theme>option[value=" + theme + "]")
				attr("selected", "selected");

		}
	}
	function toggleDetails($task) 
	{
		$(".details", $task).slideToggle();
		$("button.toggle-details", $task).toggleClass("expanded");
		
	}
	function onChangeTaskDetails(taskId, $input) 
	{
		var task = taskList.getTask(taskId)
		if (task)
		{
			var fieldName = $input.data("field");
			task[fieldName] = $input.val();
			saveTaskList();
		}		
	}
	function rebuildTaskList() 
	{
		// Remove any old task elements 
		$("#task-list").empty();
		// Create DOM elements for each task
		taskList.each(function(task)
		{
			addTaskElement(task);
		});		
	}
	
	
} // end MyApp



$(function() {
	window.app = new taskAtHand3bApp();
	window.app.start();
});