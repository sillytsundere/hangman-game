const startButton = document.querySelector('#start');
const countdownEl = document.getElementById("timer");
const turnsHolder = document.getElementById('my-turns');
const wordHolder = document.getElementById('word-place');

var startingMinutes = 1;
var time = startingMinutes * 60;
let wordIndex;
let turns;
let roundWord;
//let wordStatus = null;
let showWord;

var letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']

var wordBank = [
    {
        word: 'SHINJI',
        hint: 'crybaby'
    },
    {
        word: 'LILITH',
        hint: 'the second angel'
    },
    {
        word: 'ADAM',
        hint: 'the first angel'
    },
    {
        word: 'MISATO',
        hint: 'worlds best adoptive mom'
    },
    {
        word: 'SACHIEL',
        hint: 'the 3rd angel'
    },
    {
        word: 'RAMIEL',
        hint: 'best girl angel'
    },
    {
        word: 'KAWORU',
        hint: 'boyfriend'
    },
    {
        word: 'KAJI',
        hint: 'the dude with the watermelons'
    },
    {
        word: 'SEELE',
        hint: 'evil corp'
    },
    {
        word: 'NERV',
        hint: 'all is right with the world'
    }
]

var loseDisplay = function(){
    document.getElementById('main').style.display = 'none';
    document.getElementById('lose').style.display = 'block';
}

var winDisplay = function(){
    document.getElementById('main').style.display = 'none';
    document.getElementById('win').style.display = 'block';
}

//chooses random index for length of word bank array to choose a random word to guess, called upon game start to choose a new word for each new game
function getRandomIndex (arr) {
	var randomIndex = Math.floor(Math.random() * arr.length);
    return randomIndex;
}

//function called in event listener when Begin button is clicked-begins game
function startGame() {
    wordIndex = getRandomIndex(wordBank);
    turns = 7;
    turnsHolder.innerHTML = `0${turns}`;
    roundWord = wordBank[wordIndex].word.split('');
    showWord = wordBank[wordIndex].word.split('');
    console.log(roundWord, 'round word');
    hideBtn();
    timeLimit();
    writeButtons();
    clickLetters();
    writeWord();

}

//displays chosen word on webpage as string of dashes to symbolize how many letters user has to guess and to serve to display correct letters user has guessed
function writeWord() {
    // wordStatus = roundWord.map((char) => char.replace(char, " _ "));
    // console.log(wordStatus, 'word status-the dashed array of the round word');
    // wordHolder.innerHTML = wordStatus.join('');
    for (var i = 0; i < roundWord.length; i++) {
        var word = document.createElement('span');
        word.classList.add('underline');
        word.classList.add('hidden');
        word.textContent = roundWord[i];
        wordHolder.appendChild(word);
    }
}

//this function is selecting all the letter buttons and listening for a click on them
function clickLetters() {
    const allBtns = document.querySelectorAll('.char');
    allBtns.forEach(function(btn) {
        btn.addEventListener('click', function(){
            console.log(checkAnswer(this.innerHTML));
            if (roundWord.length === 0) {
                console.log('you win');
                winDisplay();
            }
        })
    })
}

//need to make function to push letters that are guessed correctly to the word status array 
//will want to use .replace to add the correct letters to the dashed word array
// function updateWord() {
//     console.log(wordStatus, 'wordStatus in updateWord ftn');
//     console.log('update word');
//     //need to have index of correct letter in word array and then push or replace it to its correct place to display on webpage
// }


function checkAnswer(inputChar) {
    for (var i = 0; i < roundWord.length; i++) {
        if (inputChar === roundWord[i]) {
            console.log(roundWord[i], 'before index is removed');

            //remove one char of that from roundWord
            var indexToRemove = roundWord.indexOf(inputChar);
            console.log(indexToRemove, 'index of char to be removed');
            var temp = roundWord.slice(0, indexToRemove);
            var temp1 = roundWord.slice(indexToRemove +1);
            
            roundWord = temp.concat(temp1);
            console.log(roundWord, 'after index is removed');

            // console.log(wordStatus, 'word status in check answer ftn');

            var chars = wordHolder.children;
            for (var i = 0; i < chars.length; i++) {
                console.log(chars);
                if (inputChar == chars[i].textContent) {
                    chars[i].classList.remove('hidden');
                }
            }
            //new global variable that is original word
            //display that char at correct index in word status
            //identify char selected and if it is correct
            //push it to word status array at appropriate index
            //join word status to display
            //will I need to do this in a new function?
    
            return true;
        }
    }
    updateGame();
    return false;
}

function updateGame() {
    turns--;
    turnsHolder.innerHTML = `0${turns}`;
    console.log(turns, 'turns');
    if (turns <= 0) {
        console.log('gameover');
        loseDisplay();
    } else {
        console.log(roundWord);
    }
}

//this function is looping through the letters array and making buttons for each item in the array and adding them to the html file
function writeButtons() {
    var letterSection = document.querySelector('.letter-buttons');
    for (var i = 0; i < letters.length; i++) {
        var buttons = document.createElement('button');
        letterSection.appendChild(buttons);
        buttons.innerHTML = letters[i];
        buttons.classList.add('char');
    }
}

//this function runs the timer for the quiz and displays the time like a digital clock
function timeLimit() {
    let minutes = Math.floor(time / 60);
    let seconds = time % 60;

    countdownEl.innerHTML = minutes + ':0' + seconds;

    var timer = setInterval(function() {
        time--;

        let minutes = Math.floor(time / 60);
        let seconds = time % 60;

        if (seconds < 10) {
            seconds = '0' + seconds;
        } 

        countdownEl.innerHTML = minutes + ':' + seconds;
    
        if (time <= 0) {
            clearInterval(timer);
            loseDisplay();
        }
        if (roundWord.length === 0) {
            clearInterval(timer);
        }
    }, 1000);
}

//this function hides the begin button
function hideBtn () {
    startButton.setAttribute('style', 'display:none');
}

//this event listenet listens to the begin button and calls functions to begin the game
startButton.addEventListener('click', 
    startGame
);

//make function to "draw out hanged man"
// function displayMan() {

// }