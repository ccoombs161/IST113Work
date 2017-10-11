
var secretNumber;
var numberOfGuesses = 0;

function writeMessage(elementId, message, appendMessage) {
	var elemToUpdate = document.getElementById('elementId');
	secretNumber = document.getElementById('submitnum');
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
var gamestatus = document.getElementById('gamestatus');
var historyList = document.getElementById('historyList');

if (userGuessed.length == 0 || ! guessInRange(userGuessed)) {
    // Nothing entered or our of range.
    writeMessage('gamestatus', '<p>Please enter a number 1-10 and press the Guess button.</p>');
} else if (userGuessed.indexOf('.') != -1) {
    writeMessage('gamestatus', '<p>Please enter a whole number 1-10 and press the Guess button.</p>');
} else {
    numberOfGuesses++;

    if (userGuessed == secretNumber) {
        // Got it
        writeMessage('gamestatus', '<p>You got it in ' + numberOfGuesses +' guesses, the secret number was ' + secretNumber + '. Let\'s go again...</p>');
        newGame();
    } else if (userGuessed < secretNumber) {
        // User needs to guess higher
        writeMessage('gamestatus', '<p>You need to guess higher than ' + userGuessed + ', try again...</p>');
        writeMessage('historyList', '<li>' + userGuessed +' (too low)</li>', true);
    } else {
        // User needs to guess lower
        writeMessage('gamestatus', '<p>You need to guess lower than ' + userGuessed + ', try again...</p>');
        writeMessage('historyList', '<li>' + userGuessed + ' (too high)</li>', true);
    }
}

document.getElementById('userGuess').value = '';	
}

window.onload = function() {
newGame();
document.getElementById('button').addEventListener('click', userGuessed);
};
/* window.onload event here because those are needed when the code will be 
interacting with elements on the document, or DOM elements.*/