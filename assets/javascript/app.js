$(document).ready(function(){

	var intervalId;
	var clockRunning = false;

	var variables = {
		// variable contains changing values and trivia questions
		correctAnswers: 0,
		incorrectAnswers: 0,
		index: 0,
		time: 10,
		computerAnswer: "",
		triviaQuestions: [{
			question: 'Which of these objects is not part of the Deathly Hallows?',
			options: ['Elder Wand', "Sorcerer's Stone", 'Cloak of Invisibility', 'Resurrection Stone'],
			answer: "Sorcerer's Stone"
		}, {
			question: "What is the name of Harry Potter's owl?",
			options: ['Hedwig', 'Errol', 'Crookshanks', 'Dobby'],
			answer: 'Hedwig'
		}, {
			question: "Which of these is not a member of the Weasley family?",
			options: ["Ron", "Ginny", "George", "Neville"],
			answer: "Neville"
		}, {
			question: "How does Harry manage to breathe underwater during the second task of the Triwizard Tournament?",
			options: ["He transfigures into a shark", "He kisses a mermaid", "He eats gillyweed", "He performs a bubble-headed charm"],
			answer: "He eats gillyweed"
		}, {
			question: "What is the name of Fred and George's joke shop?",
			options: ["Weasleys' Joke Emporium", "Weasleys' Wizard Wheezes", "Fred and George's Wonder Emporium", "Zonko's Joke Shop"],
			answer: "Weasleys' Wizard Wheezes"
		}, {
			question: "Which of these is not one of the Unforgivable Curses?",
			options: ["Cruciatus Curse", "Imperius Curse", "Sectumsempra", "Avada Kedavra"],
			answer: "Sectumsempra"
		}, {
			question: "Who played Lord Voldemort in the movies?",
			options: ["Jeremy Irons", "David Tennant", "Gary Oldman", "Ralph Fiennes"],
			answer: "Ralph Fiennes"
		}, {
			question: "Who guards the entrance to the Gryffindor common room?",
			options: ["The Grey Lady", "The Fat Friar", "The Bloody Baron", "The Fat Lady"],
			answer: "The Fat Lady"
		}, {
			question: "Who is not a member of the Order of the Phoenix?",
			options: ["Cornelius Fudge", "Mad-Eye Moody", "Severus Snape", "Remus Lupin"],
			answer: "Cornelius Fudge"
		}, {
			question: "What does O.W.L. stand for?",
			options: ["Official Wizarding Level", "Ordinary Wizarding Level", "Outstanding Wizard Learning", "Optimal Wizarding Level"],
			answer: "Ordinary Wizarding Level"
		}, {
			question: "A wizard who cannot do magic is known as a...?",
			options: ["Muggle", "Doxy", "Bowtruckle", "Squib"],
			answer: "Squib"
		}, {
			question: "What does the spell 'Oblivate' do?",
			options: ["Destroys objects", "Casts a protective shield", "Removes part of someone's memory", "Makes objects invisible"],
			answer: "Removes part of someone's memory"
		}, {
			question: "Where does Hermione brew her first batch of Polyjuice Potion?",
			options: ["Moaning Myrtle's bathroom", "The Hogwarts kitchen", "The Room of Requirement", "The Gryffindor common room"],
			answer: "Moaning Myrtle's bathroom"
		}, {
			question: "Who was stealing Harry's letters at the beginning of 'The Chamber of Secrets'?",
			options: ["Dumbledore", "Draco Malfoy", "The Dursleys", "Dobby"],
			answer: "Dobby"
		}, {
			question: "How many Weasley siblings are there?",
			options: ["5", "7", "10", "3"],
			answer: "7"
		}, {
			question: "What's the name of Filch's cat?",
			options: ["Scabbers", "Crookshanks", "Mrs. Norris", "Mr. Tibbles"],
			answer: "Mrs. Norris"
		}, {
			question: "Which professor teaches flying lessons?",
			options: ["Professor Grubbly-Plank", "Sybill Trelawney", "Charity Burbage", "Madam Hooch"],
			answer: "Madam Hooch"
		}, {
			question: "Who is not an Animagus?",
			options: ["Cedric Diggory", "James Potter", "Sirius Black", "Professor McGonagall"],
			answer: "Cedric Diggory"
		}, {
			question: "Which Wizarding school does not participate in the Triwizard Tournament?",
			options: ["Hogwarts School of Witchcraft and Wizardry", "Ilvermorny School of Witchcraft and Wizardry", "Beauxbatons Academy of Magic", "Durmstrang Institute"],
			answer: "Ilvermorny School of Witchcraft and Wizardry"
		}, {
			question: "What Hogwarts house was Luna Lovegood in?",
			options: ["Gryffindor", "Hufflepuff", "Ravenclaw", "Slytherin"],
			answer: "Ravenclaw"
		}, {
			question: "Which was not a Horcrux?",
			options: ["Nagini", "Rowena Ravenclaw's Diadem", "The Mirror of Erasid", "Harry Potter"],
			answer: "The Mirror of Erasid"
		}],
		

		triviaQuestion: function() {  
			// Empty answer screen that shows after each trivia questions
			$('.answerScreen').empty();

			// Commands if you have run out of trivia questions
			if (variables.index === (variables.triviaQuestions.length)) {

				$('.question').empty();
				$('.computerOptions').remove();
				$('.correctAnswers').empty();
				$('.incorrectAnswers').empty();
				$('.answerScreen').html("Final score:");
				var correctDisplay = $('<div>');
				correctDisplay.html(variables.correctAnswers + ' total correct answers');
				var incorrectDisplay = $('<div>');
				incorrectDisplay.html(variables.incorrectAnswers + ' total incorrect answers');
				$('.answerScreen').append(correctDisplay);
				$('.answerScreen').append(incorrectDisplay);

				$('.finalOptions').text("Would you like to play again?");
				
				var confirmButton = $('<button>');
				confirmButton.attr('id', 'confirmButton')
				confirmButton.attr('value', 'yes');
				confirmButton.text("Yes");
				confirmButton.css('display', 'inline-block');
				$('.finalOptions').append(confirmButton);

				var nonconfirmButton = $('<button>');
				nonconfirmButton.attr('id', 'nonconfirmButton')
				nonconfirmButton.attr('value', 'no');
				nonconfirmButton.text("No");
				nonconfirmButton.css('display', 'inline-block');
				$('.finalOptions').append(nonconfirmButton);

				$(document).on("click", "button", function() {
					var reply = this.getAttribute('value');

					if (reply === 'yes') {
					variables.correctAnswers = 0;
					variables.incorrectAnswers = 0;
					variables.index = 0;
					variables.computerAnswer = '';
					$('.answerScreen').empty();
					$('.finalOptions').empty();
					variables.triviaQuestion()
					}

					else if (reply === 'no') {
					window.close()
					}
				})

			}

			else {

				if (!clockRunning) {
					$('.timer').html(variables.time + ' seconds left')
					intervalId = setInterval(variables.count, 1000);
					clockRunning = true;
				}

				// sets function variables updates computerAnswer
				var computerQuestion =  variables.triviaQuestions[variables.index].question;
				var computerOptions = variables.triviaQuestions[variables.index].options;
				variables.computerAnswer = variables.triviaQuestions[variables.index].answer;

				// Displays trivia question
				$(".question").html(computerQuestion)

				// Displays radio buttons for each question option
				for (var i = 0; i < computerOptions.length; i ++) {
					var newDiv = $('<div>');
					newDiv.addClass('computerOptions');
					var newLabel = $('<label>');
					newLabel.html(" " + computerOptions[i]);
					var newOption = $('<input type = "radio" name = "userChoice">');
					newOption.attr('value', computerOptions[i]);
					newLabel.prepend(newOption);
					newDiv.append(newLabel);
					$('.options').append(newDiv);
				}

				// Displays number of correct and incorrect answer user currently has
				var correctAnswer = $('<div>');
				correctAnswer.html("Correct Answers");
				correctAnswer.attr('id', 'correctAnswer');
				var correctAnswerScore = $('<div>');
				correctAnswerScore.html(variables.correctAnswers);
				correctAnswerScore.attr('id', 'correctAnswerScore');
				$('.correctAnswers').append(correctAnswer);
				$('.correctAnswers').append(correctAnswerScore);

				var incorrectAnswer = $('<div>');
				incorrectAnswer.html("Incorrect Answers");
				incorrectAnswer.attr('id', 'incorrectAnswer');
				var incorrectAnswerScore = $('<div>');
				incorrectAnswerScore.html(variables.incorrectAnswers);
				incorrectAnswerScore.attr('id', 'incorrectAnswerScore');
				$('.incorrectAnswers').append(incorrectAnswer);
				$('.incorrectAnswers').append(incorrectAnswerScore);

			}
		},

		count: function() {
			// Function for starting timer at the start of each question
			variables.time = variables.time - 1;
			$('.timer').html(variables.time + ' seconds left');

			if (variables.time === 0) {
				clearInterval(intervalId);
				clockRunning = false;

				$('.computerOptions').remove();
				$('.question').empty();
				$('.correctAnswers').empty();
				$('.incorrectAnswers').empty();
				$('.timer').empty();
			
				// Present new page
				$('.answerScreen').html("Time's Up! The correct answer was <strong> '" + variables.computerAnswer + "'</strong>.")

				// Rerun trivia question
				variables.incorrectAnswers++;
				variables.index++;
				variables.time = 10;
				setTimeout(variables.triviaQuestion, 2000);

			}
		}
	};

	// Function call for initial screen
	variables.triviaQuestion();

	// Function for if a radio button option is clicked
	$(document).on("click", "input", function() {
		var userChoice = this.getAttribute('value');

		// option if user guesses the correct answer
		if (userChoice === variables.computerAnswer) {
			// Empty trivia variables
			clearInterval(intervalId);
			clockRunning = false;
			$('.timer').empty();
			$('.computerOptions').remove();
			$('.question').empty();
			$('.correctAnswers').empty();
			$('.incorrectAnswers').empty();

			// Present new page
			$('.answerScreen').html("Congratulations, you got the correct answer!");

			// Rerun trivia question
			variables.correctAnswers++;
			variables.index++;
			variables.time = 10;
			setTimeout(variables.triviaQuestion, 2000);
		}

		// option if user guesses an incorrect answer
		else {
			// Empty trivia variables
			clearInterval(intervalId);
			clockRunning = false;
			$('.timer').empty();
			$('.computerOptions').remove();
			$('.question').empty();
			$('.correctAnswers').empty();
			$('.incorrectAnswers').empty();
			
			// Present new page
			$('.answerScreen').html("You guessed incorrectly. The correct answer was <strong> '" + variables.computerAnswer + "'</strong>.")

			// Rerun trivia question
			variables.incorrectAnswers++;
			variables.index++;
			variables.time = 10;
			setTimeout(variables.triviaQuestion, 2000);
		}
	});


})

