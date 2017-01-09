

// "this" means object "Quiz" will always refer to the questions array!
//for "this", we will create a set of variables to pass through functions.
function Quiz(questions)  {
	this.score = 0;
	this.questions = questions;
	this.questionIndex = 0;
}

Quiz.prototype.getQuestionIndex = function()  {
	return this.questions[this.questionIndex];
}
//This function will clear out the time interval and return the question after checking. 
Quiz.prototype.isEnded = function()  {
	//console.log(this.questions.length); // check--1
	//console.log(this.questionIndex);  // check--2
	clearTimeout(myTimer);
	return this.questions.length === this.questionIndex;
}
//If the function "guess" returns the correctanswer, then update the respective scores
// and display the respestive div.
Quiz.prototype.guess = function(answer)  {
  if(this.getQuestionIndex().correctAnswer(answer))  {
	this.score++;
	numberOfCorrectAnswers++;
  $("#opening").fadeOut();
  $("#startGame").fadeOut();
  $("#resume").fadeOut();
  wait = setTimeout(closeDiv, 3000);
	document.getElementById('correctAnswer').style.display = "block";
  document.getElementById('correctAnswer').style.height = "400px";
  //$("#correctAnswer").slideFadeToggle();
  //$("#correctAnswer").animate({Top: "160px"}, 500);
 
	document.getElementById("co").innerHTML = numberOfCorrectAnswers;
  }
  else
  {
    //If the function "guess" returns the wronganswer, then update the respective scores
// and display the respestive div.
      $("#opening").fadeOut();
      $("#startGame").fadeOut();
      $("#resume").fadeOut();
  	
  	numberOfWrongAnswers++;
    wait = setTimeout(closeDiv, 3000);
    document.getElementById('wrongAnswer').style.display = "block";
    document.getElementById('wrongAnswer').style.height = "400px";
  	document.getElementById("rightAnswer").innerHTML = this.getQuestionIndex().answer;
  	document.getElementById("wro").innerHTML = numberOfWrongAnswers;
  }
  clearTimeout(myTimer);
  this.questionIndex++;  // "this" will pull the next question.

}
// This Function "closeDiv" will Close the message div that shows correct, 
//wrong, or unattempted  and the last score answer messages
function closeDiv()  {
  document.getElementById('correctAnswer').style.display = "none";
  document.getElementById('wrongAnswer').style.display = "none";
  document.getElementById('unaAnswer').style.display = "none";
  document.getElementById('Answer').style.display = "none";
  if(quiz.isEnded() == false)  {
    $("#opening").fadeIn();
    $("#startGame").fadeIn();
    $("#resume").fadeIn();
  }
  populate();
}

//$.function.slideFadeToggle = function(easing, callback) {
  //return $("#correctAnswer").animate({ opacity: 'toggle', height: 'toggle' }, 'fast', easing, callback);
//};

// assigning the question to the object and store it in variable "choice" 
//with all three attributes like Text, Choice, answer.
function Question(text, choices, answer)  {
	this.text = text;
	this.choices = choices;
	this.answer = answer;
};
// Retuern true if the answer is correct else return false.
Question.prototype.correctAnswer = function(choice)  {
	return choice === this.answer;
};

// Declare and set all the varaiables,
// Declare a var question which contains quiz question , inline array of choices and the correct answer
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

    var countDown = 50; // Create variable "countDown" and set the timer to max 50 secs.
    var myTimer = null;// "myTimer" is used for alloting 4 seconds time to answer every question.
    var elapsedTime = null;//elapsed time is used for the overall timer countdown.
    var wait = null;//wait is used for 3 seconds meaasge window to be shown.
    var questionIndex = 0;//this will point to the current question in the object.
    var score = 0;
    var numberOfCorrectAnswers = 0;
    var numberOfWrongAnswers = 0;
    var numberOfUnAttempted = 0;
// Create a new "Quiz" object to pass this array into functions.
    var quiz = new Quiz(question);

// Create a var to populate the array and choices.
    elapsedTime = setInterval(showTime, 1000);
    populate();

// Creating the function to populate the selected question and the 4 choices.

function populate()  {
	if(quiz.isEnded())  {
    clearTimeout(myTimer);
    clearInterval(elapsedTime);
    clearTimeout(wait);
	  $("#opening").fadeOut();
    $("#startGame").fadeOut();
    $("#resume").fadeOut();
 	//alert("ended");   // check--3
//		document.getElementById("co").innerHTML = numberOfCorrectAnswers;
//		document.getElementById("wro").innerHTML = numberOfWrongAnswers;
//		document.getElementById("una").innerHTML = numberOfUnAttempted;
    document.getElementById("co1").innerHTML = numberOfCorrectAnswers;
    document.getElementById("wro1").innerHTML = numberOfWrongAnswers;
    document.getElementById("una1").innerHTML = numberOfUnAttempted;
    document.getElementById('Answer').style.display = "block";   
    document.getElementById('Answer').style.width = "650px";   
    document.getElementById('Answer').style.height = "400px";   
//    document.getElementById('Answer').style.left = "325px";           
//restart();  //check--4 to restart the game 
	}
	else  {
// show question using the var element.
		var element = document.getElementById("question");
		element.innerHTML = quiz.getQuestionIndex().text;

// show choices using var choices.
		var choices = quiz.getQuestionIndex().choices;
		for(var i = 0; i < choices.length; i++)  {
			var element = document.getElementById("choice" + i);
			element.innerHTML = choices[i];
			guess("btn" + i, choices[i]);
		}
		myTimer = setTimeout(timerFunc, 4000);  // setting the time out by assigning 4 secs time 
                                             //to answer the question.
	}	                                        

};
// Creating the function to set the Timer for assigning time intervals 
//for unattempted questions and screen show and then again populate the 
//next question from question array.
function timerFunc()  {
  
  numberOfUnAttempted++;
    $("#opening").fadeOut();
    $("#startGame").fadeOut();
    $("#resume").fadeOut();
    
    wait = setTimeout(closeDiv, 3000);
    document.getElementById('unaAnswer').style.display = "block";
    document.getElementById('unaAnswer').style.height = "400px";
    document.getElementById("una").innerHTML = numberOfUnAttempted;
    document.getElementById("rightAnswer1").innerHTML = quiz.getQuestionIndex().answer;
  
  clearTimeout(myTimer);
  quiz.questionIndex++;
  
//  populate();

}

//
function guess(id, guess)  {
	var button = document.getElementById(id);
	button.onclick = function()  {
		quiz.guess(guess);
//		wait = setTimeout(populate, 3000);
	}
};
// Setting up the function for timer with intervals and elapsed time for all 3 div's of correct, 
// wrong, and score divs.
function showTime() {
  document.getElementById("elapsedTime").innerHTML = countDown;
  if (countDown == 0) {
      clearTimeout(myTimer);
      clearInterval(elapsedTime);
      clearTimeout(wait);
    document.getElementById("co").innerHTML = numberOfCorrectAnswers;
    document.getElementById("wro").innerHTML = numberOfWrongAnswers;
    document.getElementById("una").innerHTML = numberOfUnAttempted;
    document.getElementById("co1").innerHTML = numberOfCorrectAnswers;
    document.getElementById("wro1").innerHTML = numberOfWrongAnswers;
    document.getElementById("una1").innerHTML = numberOfUnAttempted;
    document.getElementById('Answer').style.width = "650px";   
    document.getElementById('Answer').style.height = "400px";   
    document.getElementById('Answer').style.left = "325px";           //restart();
    $("#opening").fadeOut();
    $("#startGame").fadeOut();
    $("#resume").fadeOut();
   
    document.getElementById('Answer').style.display = "block";   
        //restart();
  }
  else
  { 
    countDown--;// with each question alloted time is getting reduced.
  };

  }
  // Calling all the variables and Functions to restart the game.
  function restart() {
    countDown = 50;
    wait = null;
    questionIndex = 0;
    score = 0;
    numberOfCorrectAnswers = 0;
    numberOfWrongAnswers = 0;
    numberOfUnAttempted = 0;
    quiz.questionIndex = 0;
    closeDiv();
    populate();
    clearInterval(elapsedTime);
    elapsedTime = setInterval(showTime, 1000);
    clearTimeout(myTimer);

    document.getElementById("co").innerHTML = numberOfCorrectAnswers;
    document.getElementById("wro").innerHTML = numberOfWrongAnswers;
    document.getElementById("una").innerHTML = numberOfUnAttempted;
};





