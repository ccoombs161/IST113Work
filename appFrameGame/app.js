"use strict";

// using a function contructor form to create an object
function MyApp()
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
		$("#app>header").append(version);
		setStatus("ready");
	};

	var secretNumber = 0,
	numberOfGuesses = 0;
	
	function writeMessage(elementId, message, appendMessage) {
	var elemToUpdate = document.getElementById(elementId);
	if (appendMessage) {
		elemToUpdate.innerHTML = elemToUpdate.innerHTML + message;
	} else {
	   elemToUpdate.innerHTML = message;
	}
	};
	
	function newGame() {
	secretNumber = Math.floor(Math.random() * 10) + 1;
	numberOfGuesses = 0;
	writeMessage('historyList', '');
	}
	
	function guessInRange(guess) {
	return (guess > 0 && guess <= 10);
	}
	
	function userGuessed() {
	var userGuessed = document.getElementById('userGuess').value;
	var statusArea = document.getElementById('statusArea');
	var historyList = document.getElementById('historyList');
	if (userGuessed.length == 0 || ! guessInRange(userGuessed)) {
		// Nothing entered or our of range.
		writeMessage('statusArea', '<p>Please enter a number 1-10 and press the Guess button.</p>');
	} else if (userGuessed.indexOf('.') != -1) {
		writeMessage('statusArea', '<p>Please enter a whole number 1-10 and press the Guess button.</p>');
	} else {
		numberOfGuesses++;
	
		if (userGuessed == secretNumber) {
			// Got it
			writeMessage('statusArea', '<p>You got me in ' + numberOfGuesses +' guesses, I was thinking ' + secretNumber + '. Let\'s go again...</p>');
			newGame();
		} else if (userGuessed < secretNumber) {
			// User needs to guess higher
			writeMessage('statusArea', '<p>You need to guess higher than ' + userGuessed + ', try again...</p>');
			writeMessage('historyList', '<li>' + userGuessed +' (too low)</li>', true);
		} else {
			// User needs to guess lower
			writeMessage('statusArea', '<p>You need to guess lower than ' + userGuessed + ', try again...</p>');
			writeMessage('historyList', '<li>' + userGuessed + ' (too high)</li>', true);
		}
	}
	
	document.getElementById('userGuess').value = '';	
	}
	
	window.onload = function() {
	newGame();
	document.getElementById('buttonArea').addEventListener('click', userGuessed);
	};
	 

} // end MyApp

$(function() {
	window.app = new MyApp();
	window.app.start();
});