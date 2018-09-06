//sets array of answers
var answerArray = ["ANDY", "PAM", "KELLY", "STANLEY", "DWIGHT", "MEREDITH", "CREED", "DARRYL", "MICHAEL", "ANGELA", "PHYLLIS", "JIM", "OSCAR", "KEVIN", "RYAN", "TOBY", "GABE", "JAN", "ERIN" ]; 
var hintArray = ["'It is on like a prawn who yawns at dawn.'", "'I feel God in this Chili’s tonight.'", "'My resolution was to get more attention.'", "'If I don’t have some cake soon, I might die.'", "'In an ideal world, I would have all 10 fingers on my left hand so my right hand could just be a fist for punching.'", "'I have Vienna sausages and I have napkins.'", "'The Taliban’s the worst. Great heroin, though.'", "'‘Fleece it Out’, ‘Going Mach 5’, ‘Dinkin’ Flicka’'", "'The worst thing about prison was the dementors!'", "'It’s not my fault. I was exposed to Harry Potter.'", "'We have a gym at home. It's called the bedroom.'", "'Bears. Beets. Battlestar Galactica.'", "'The only premature baby in this room is the one your baby ate.'", "'The trick is to undercook the onions.'", "'I'd like to make a toast. To the troops...all the troops...both sides.'", "'There's no shame in getting beat up by a girl. My ex-wife used to demolish me.'", "'SHUT UP ABOUT THE SUN!'", "'What did I tell you about 'yeppers'?'", "'And then my last job was at a Taco Bell Express. But then it became a full-time Taco Bell and... I don't know. I couldn't keep up.'"]; 
//holds selected answer 
var choosenWord = "";
//holds letters in answer 
var lettersInAnswer = [];
//holds number of letters in word
var numBlanks = 0;
//holds blanks and successful guesses
var blanksAndSuccesses = [];
//holds the user guess 
var userGuess;
//Holds Wrong guesses
var wrongLetters = [];
//Counters
var winCount = 0;
var loseCount = 0;
var guessesLeft = 6;
var rightGuessCounter = 0;
//sounds
var godNo = new Audio("assets/images/no-god-please.wav");
var awesome = new Audio("assets/images/Awesome.mp3");	
var theme = new Audio("assets/images/theme.wav");	

//possible user inputs
var letters = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"];


function reset()
{
	//Chooses word randombly from the answer array
    //choosenWord = answerArray[Math.floor(Math.random() * answerArray.length)];
    var randomNumber = Math.floor(Math.random() * answerArray.length);
    choosenWord = answerArray[randomNumber];
    choosenHint = hintArray[randomNumber];
	//Splits the choosen word into individual letters
	lettersInWord = choosenWord.split('');
	//Get the number of blanks
	numBlanks = lettersInWord.length;
	
	//RESET
	//===========================================================
	letterGuessed = 0;
	rightGuessCounter = 0;
	guessesLeft = 6;
	wrongLetters =[];
	blanksAndSuccesses =[];
	letters = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"];
	test=false;
	startGame();
}



function startGame()
{
	//Chooses word randombly from the answer array
    //choosenWord = answerArray[Math.floor(Math.random() * answerArray.length)];
    var randomNumber = Math.floor(Math.random() * answerArray.length);
    choosenWord = answerArray[randomNumber];
    choosenHint = hintArray[randomNumber];
	//Splits the choosen word into individual letters
	lettersInWord = choosenWord.split('');
	//Get the number of blanks
	numBlanks = lettersInWord.length;
	
	//RESET
	rightGuessCounter = 0;
	guessesLeft = 6;
	wrongLetters =[];
	blanksAndSuccesses =[];
	letters = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"];

	//Populate blanks
	for(var i = 0; i< numBlanks; i++)
	{
		blanksAndSuccesses.push('_');
		document.getElementById('wordToGuess').innerHTML = blanksAndSuccesses;
	}

    //Changes HTML 
    document.getElementById('hint').innerHTML = choosenHint;
	document.getElementById('wordToGuess').innerHTML = blanksAndSuccesses.join(' ');
	document.getElementById('numGuesses').innerHTML = guessesLeft;
	document.getElementById('wins').innerHTML = winCount;
	document.getElementById('loses').innerHTML = loseCount;
	document.getElementById('wrongGuesses').innerHTML = wrongLetters;
	
    console.log(choosenWord);
    console.log(choosenHint);
	console.log(lettersInWord);
	console.log(numBlanks);
	console.log(blanksAndSuccesses);
}

function compareLetters(userKey)
{
				console.log('WORKING!');
				//If user key exist in choosen word then perform this function 
				if(choosenWord.indexOf(userKey) > -1)
				{
					//Loops depending on the amount of blanks 
					for(var i = 0; i < numBlanks; i++)
					{
						//Fills in right index with user key if it matches user input
						if(lettersInWord[i] === userKey)
						{
							rightGuessCounter++;
							blanksAndSuccesses[i] = userKey;
							document.getElementById('wordToGuess').innerHTML = blanksAndSuccesses.join(' ');
						}	
					}
					//Test
					console.log(blanksAndSuccesses);
				}
				//Wrong Keys
				else
				{
					wrongLetters.push(userKey);
					guessesLeft--;
					//Changes HTML
					document.getElementById('numGuesses').innerHTML = guessesLeft;
					document.getElementById('wrongGuesses').innerHTML = wrongLetters.join('   ');
					//Test
					console.log('Wrong Letters = ' + wrongLetters);
					console.log('Guesses left are ' + guessesLeft);
				}
			
			
}




function winLose()
{
	// When number blanks if filled with right words then you win
	if(rightGuessCounter === numBlanks)
	{
		//Counts Wins 
		winCount++;
		//Changes HTML
		awesome.play();
		document.getElementById('wins').innerHTML = winCount;
		alert("You're Right! It was " + choosenWord + '!');
		reset();
	}
	// When number of Guesses reaches 0 then You lose
	else if(guessesLeft === 0)
	{
		//Counts losses
		loseCount++;
		//Changes HTML
		godNo.play();
		document.getElementById('loses').innerHTML = loseCount;
		alert('You Lose!');
		reset();
	}
}

//listens for user input 
document.onkeyup = function(event)
{
	test = true;
	var letterGuessed = event.key.toUpperCase();
	for(var i = 0; i < letters.length; i++)
	{	
		if(letterGuessed === letters[i]  && test === true)
		{
			var spliceDword = letters.splice(i,1);
			//Test
			console.log('Double word is = ' + letters[i])
			console.log('Spliced Word is = ' + spliceDword);

			compareLetters(letterGuessed);
			winLose();
		}
	}		
		
}

startGame();
//theme.play();


var body = document.getElementById("body");
var enter = document.getElementById("enter");
//document.addEventListener("keyup", function(event) {
    //if (event.keyCode === 13) {
        
        //hides enter text in html
      //  enter.style.display = "none";
//	}

//});
