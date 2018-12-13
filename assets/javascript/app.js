$(document).ready(function() {
    console.log( "let's play!" );

    
    var questionCounter = 0;
   
    var time = 15;
    
    var correctGuesses = 0;
   
    var incorrectGuesses = 0;

    // question & answer array
    var questions = [
      {
	    question: "How many pounds of potatoes does the average American eat in a year?",
	    choices: ["312", "70", "93", "126"],
	    correctAnswer: "126",
	    image: "<img src='assets/images/contest.jfif' class='tato eating contest'>"
	  }, 
	  {
	    question: "The potato is the _______ most important crop in the world?",
	    choices: ["first", "second", "fourth", "fifth"],
	    correctAnswer: "fourth",
	    image: "<img src='assets/images/swim.jpg' class='girl in tatoes'>"
	  }, 
	  {
	    question: "Where were potatoes first cultivated?",
	    choices: ["Bolivia", "Peru", "Columbia", "Panama"],
	    correctAnswer: "Peru",
	    image: "<img src='assets/images/peru.jpg' class='peru'>"
	  }, 
	  {
	    question: "What state is the world famous Mashed Potato Wrestling contest in?",
	    choices: ["Idaho", "South Dakota", "North Dakota", "West Virginia"],
	    correctAnswer: "South Dakota",
	    image: "<img src='assets/images/potatowrestling2.jpg' class='img-tato'>"
	  }, 
	  {
	    question: "How many pounds did the world's largest potato weigh?",
	    choices: ["22", "30", "18", "14"],
	    correctAnswer: "18",
	    image: "<img src='assets/images/potato.jpg' class='large potato'>"
	  },
	  {
	    question: "All potatoes fall into three categories: waxy, all-purpose and ",
	    choices: ["sweet", "baby", "mealy", "starchy"],
	    correctAnswer: "starchy",
	    image: "<img src='assets/images/hands.jfif' class='hands holding tatos'>"
	  },
	  {
	    question: "A person can survive eating a diet of only potatoes and ",
	    choices: ["Milk", "Water", "Orange Juice", "Whiskey"],
	    correctAnswer: "Milk",
	    image: "<img src='assets/images/dietato.jpg' class='diet advert'>"
	  },
	  
	  
	  {
	    question: "Which country consumes the most potatoes per capita?",
	    choices: ["China", "Germany", "Lithuania", "Belarus"],
	    correctAnswer: "Belarus",
	    image: "<img src='assets/images/belarus.jpg' class='belarus'>"
	  }];
	  

	
	function questionContent() {
		
    	$("#gameScreen").append("<p><strong>" + 
    		questions[questionCounter].question + 
    		"</p><p class='choices'>" + 
    		questions[questionCounter].choices[0] + 
    		"</p><p class='choices'>" + 
    		questions[questionCounter].choices[1] + 
    		"</p><p class='choices'>" + 
    		questions[questionCounter].choices[2] + 
    		"</p><p class='choices'>" + 
    		questions[questionCounter].choices[3] + 
    		"</strong></p>");
	}

	function userWin() {
		$("#gameScreen").html("<p>You got it right!</p>");
		correctGuesses++;
		var correctAnswer = questions[questionCounter].correctAnswer;
		$("#gameScreen").append("<p>The answer was <span class='answer'>" + 
			correctAnswer + 
			"</span></p>" + 
			questions[questionCounter].image);
		setTimeout(nextQuestion, 4000);
		questionCounter++;
	}

	function userLoss() {
		$("#gameScreen").html("<p>Incorrect!</p>");
		incorrectGuesses++;
		var correctAnswer = questions[questionCounter].correctAnswer;
		$("#gameScreen").append("<p>The answer was <span class='answer'>" + 
			correctAnswer + 
			"</span></p>" + 
			questions[questionCounter].image);
		setTimeout(nextQuestion, 4000);
		questionCounter++;
	}

	
	function userTimeout() {
		if (time === 0) {
			$("#gameScreen").html("<p>You ran out of time!</p>");
			incorrectGuesses++;
			var correctAnswer = questions[questionCounter].correctAnswer;
			$("#gameScreen").append("<p>The answer was <span class='answer'>" + 
				correctAnswer + 
				"</span></p>" + 
				questions[questionCounter].image);
			setTimeout(nextQuestion, 4000);
			questionCounter++;
		}
	}

	function resultsScreen() {
		if (correctGuesses === questions.length) {
			var endMessage = "Potato Perfection";
			
		}
		else if (correctGuesses > incorrectGuesses) {
			var endMessage = "Spudtastic!";
			
		}
		else {
			var endMessage = "You have failed";
			
		}
		$("#gameScreen").html("<p>" + endMessage + "</p>" + "<p>You got <strong>" + 
			correctGuesses + "</strong> right.</p>" + 
			"<p>You got <strong>" + incorrectGuesses + "</strong> wrong.</p>");
		$("#gameScreen").append("<h1 id='start'>Start Over?</h1>");
	
		gameReset();
		$("#start").click(nextQuestion);
	}

	
	function timer() {
		clock = setInterval(countDown, 1000);
		function countDown() {
			if (time < 1) {
				clearInterval(clock);
				userTimeout();
			}
			if (time > 0) {
				time--;
			}
			$("#timer").html("<strong>" + time + "</strong>");
		}
	}

	
	function nextQuestion() {
		if (questionCounter < questions.length) {
			time = 15;
			$("#gameScreen").html("<p>You have <span id='timer'>" + time + "</span> seconds left!</p>");
			questionContent();
			timer();
			userTimeout();
		}
		else {
			resultsScreen();
		}

	}

	// reset score
	function gameReset() {
		questionCounter = 0;
		correctGuesses = 0;
		incorrectGuesses = 0;
	}

    function startGame() {
    	$("#gameScreen").html("<p>You have <span id='timer'>" + time + "</span> seconds left!</p>");
    	$("#start").hide();
    	
		questionContent();
    	timer();
    	userTimeout();
    }

    
    $("#start").click(nextQuestion);

    // click function for right or wrong screen
	$("#gameScreen").on("click", ".choices", (function() {
		var userGuess = $(this).text();
		if (userGuess === questions[questionCounter].correctAnswer) {
			clearInterval(clock);
			userWin();
		}
		else {
			clearInterval(clock);
			userLoss();
		}
	}));
});