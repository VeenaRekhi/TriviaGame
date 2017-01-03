// Jquery Document

//Phase I Objectives ----....

// "this" means object "Quiz" will always refer to the questions array!
//for this "this", we will create a set of variables to pass through functions.
function Quiz(questions)  {
	this.score = 0;
	this.questions = questions;
	this.questionIndex = 0;
}

Quiz.prototype.getQuestionIndex = function()  {
	return this.questions[this.questionIndex];
}

Quiz.prototype.isEnded = function()  {
	console.log(this.questions.length);
	console.log(this.questionIndex);
	clearTimeout(myTimer);
	return this.questions.length === this.questionIndex;
}

Quiz.prototype.guess = function(answer)  {
  if(this.getQuestionIndex().correctAnswer(answer))  {
	this.score++;
	numberOfCorrectAnswers++;
	var newWindow = window.open('./congrats.html', 'newWindow', 'height=700,width=700');
	document.getElementById("rightWrong").innerHTML = "Correct!";
	document.getElementById("rightAnswer").innerHTML = "";
	document.getElementById("co").innerHTML = numberOfCorrectAnswers;
  }
  else
  {
  	document.getElementById("rightWrong").innerHTML = "Wrong! The correct answer is -";
  	numberOfWrongAnswers++;
  	document.getElementById("rightAnswer").innerHTML = this.getQuestionIndex().answer;
  	document.getElementById("wro").innerHTML = numberOfWrongAnswers;
  }
  clearTimeout(myTimer);
  this.questionIndex++;

}
//});


// Select a choice between 0 to 7 and store it in variable "choice" with all three attributes like Text, Choice, answer.
function Question(text, choices, answer)  {
	this.text = text;
	this.choices = choices;
	this.answer = answer;
};

Question.prototype.correctAnswer = function(choice)  {
	return choice === this.answer;
};



    var startGame = false;
// Declare and set all the varaiables,
	var question = [
       new Question("What is the first country to celebrate New Year’s Eve each year??", ["England",
        "New Zealand", "Australia", "India"], "New Zealand"),
       new Question("Up until 1750, what day was New Year’s Day?", ["February 15", "March 21",
        "January 1", "November 22"], "March 21"),
       new Question("Toasting” began in what country?", ["France", "Italy",
        "America", "England"], "England"), 
       new Question("On New Year’s Day, what is the name of the parade held in Pasadena, CA?",
        ["Tournament of Roses Parade", "Tournament of Tulips Parade", "Tournament of Drinking Parade",
         "Tournament of baking pies"], "Tournament of Roses Parade"),
       new Question("How do you say Happy New Year in Spanish?", ["Bonne année", "Buon anno",
        "Feliz año Nuevo", "Shana Tova"], "Feliz año Nuevo"),
       new Question("In London on New Year’s Eve, they wait for what clock to strike midnight?",
        ["Big Jen", "Small Pit", "Thin James", "Big Ben"], "Big Ben"),
       new Question("What year did the ball begin dropping in Times Square?",
        ["1935", "1950", "2001", "1907"], "1907"),
       new Question("Which is the world’s biggest New Year’s Eve celebration?",
        ["New York’s Times Square", "New Zealand's Beach Celebration", "Australia's Sidney Opera Celebration",
         "Rio de Janeiro Copacabana Beach celebration"], "Rio de Janeiro Copacabana Beach celebration"),
       ];

// Functions to run the game starts here...
// When the user presses a key, it will run the following function...
// Create variable "timer" and set the timer to max 30 sec.
    var countDown = 35;
    var myTimer = null;
    var elapsedTime = null;
    var wait = null;
    var questionIndex = 0;
    var score = 0;
    var numberOfCorrectAnswers = 0;
    var numberOfWrongAnswers = 0;
    var numberOfUnAttempted = 0;
// Create a new "Quiz" object to pass this array into functions.
    var quiz = new Quiz(question);

// Create a var to populate the array and choices.
    elapsedTime = setInterval(showTime, 1000);
    populate();
//});

function populate()  {
	if(quiz.isEnded())  {
		//alert("ended");
		clearTimeout(myTimer);
		clearInterval(elapsedTime);
		localStorage.setItem("correct",numberOfCorrectAnswers);
		localStorage.setItem("wrong",numberOfWrongAnswers);
		localStorage.setItem("unAttempted",numberOfUnAttempted);
        var newWindow = window.open('./finalscores.html', 'newWindow', 'height=700,width=700');
        //restart();
	}
	else  {
		// show question
		var element = document.getElementById("question");
		element.innerHTML = quiz.getQuestionIndex().text;

		//show choices
		var choices = quiz.getQuestionIndex().choices;
		for(var i = 0; i < choices.length; i++)  {
			var element = document.getElementById("choice" + i);
			element.innerHTML = choices[i];
			guess("btn" + i, choices[i]);
		}
		myTimer = setTimeout(timerFunc, 4000);
	}	

};

function timerFunc()  {
  
  numberOfUnAttempted++;
  clearTimeout(myTimer);
  document.getElementById("una").innerHTML = numberOfUnAttempted;
  document.getElementById("rightWrong").innerHTML = "Not attempted! The correct answer is - ";
  document.getElementById("rightAnswer").innerHTML = quiz.getQuestionIndex().answer;
  quiz.questionIndex++;
  
  populate();

}

//
function guess(id, guess)  {
	var button = document.getElementById(id);
	button.onclick = function()  {
		quiz.guess(guess);
		wait = setTimeout(populate, 3000);
	}
};

function showTime() {
  document.getElementById("elapsedTime").innerHTML = countDown;
  if (countDown == 0) {
      clearTimeout(myTimer);
      clearInterval(elapsedTime);
    localStorage.setItem("correct",numberOfCorrectAnswers);
    localStorage.setItem("wrong",numberOfWrongAnswers);
    localStorage.setItem("unAttempted",numberOfUnAttempted);
        var newWindow = window.open('./finalscores.html', 'newWindow', 'height=700,width=700');
        //restart();
  }
  else
  { 
    countDown--;
  };

  }

function restart() {
    countDown = 35;
    wait = null;
    questionIndex = 0;
    score = 0;
    // Create a var to populate the array and choices.
    numberOfCorrectAnswers = 0;
    numberOfWrongAnswers = 0;
    numberOfUnAttempted = 0;
    quiz.questionIndex = 0;
    populate();
    clearInterval(elapsedTime);
    elapsedTime = setInterval(showTime, 1000);
    clearTimeout(myTimer);

    document.getElementById("co").innerHTML = numberOfCorrectAnswers;
    document.getElementById("wro").innerHTML = numberOfWrongAnswers;
    document.getElementById("una").innerHTML = numberOfUnAttempted;
};



