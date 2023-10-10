const startButton = document.querySelector("#start");
const countdownEl = document.getElementById("timer");
const turnsHolder = document.getElementById("my-turns");
const wordHolder = document.getElementById("word-place");
const wrongLetters = document.getElementById("wrong-letters");
const hintText = document.getElementById("hint-text");
const hintBtn = document.getElementById("hint-btn");
const header = document.getElementById("header");

var startingMinutes = 30;
var time = startingMinutes * 60;
let wordIndex;
let turns;
let roundWord;
let showWord;

var letters = [
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
  "G",
  "H",
  "I",
  "J",
  "K",
  "L",
  "M",
  "N",
  "O",
  "P",
  "Q",
  "R",
  "S",
  "T",
  "U",
  "V",
  "W",
  "X",
  "Y",
  "Z",
];

var wordBank = [
  {
    word: "SHINJI",
    hint: "crybaby",
  },
  {
    word: "LILITH",
    hint: "the second angel",
  },
  {
    word: "ADAM",
    hint: "the first angel",
  },
  {
    word: "ASUKA",
    hint: "the third child",
  },
  {
    word: "MISATO",
    hint: "worlds best adoptive mom",
  },
  {
    word: "SACHIEL",
    hint: "the 3rd angel",
  },
  {
    word: "RAMIEL",
    hint: "best girl angel",
  },
  {
    word: "KAWORU",
    hint: "boyfriend",
  },
  {
    word: "KAJI",
    hint: "the dude with the watermelons",
  },
  {
    word: "SEELE",
    hint: "evil corp",
  },
  {
    word: "NERV",
    hint: "all is right with the world",
  },
  {
    word: "GENDO",
    hint: "the worst dad",
  },
];

//hides game display and shows lose div if game lose conditiosns met
var loseDisplay = function () {
  document.getElementById("main").style.display = "none";
  document.getElementById("lose").style.display = "block";
  header.textContent = "DANGER";
};

//hides game display and shows win div if game win condition is met
var winDisplay = function () {
  document.getElementById("main").style.display = "none";
  document.getElementById("win").style.display = "block";
  header.textContent = "Congratulations!";
};

//chooses random index for length of word bank array to choose a random word to guess, called upon game start to choose a new word for each new game
function getRandomIndex(arr) {
  var randomIndex = Math.floor(Math.random() * arr.length);
  return randomIndex;
}

//function called in event listener when Begin button is clicked-begins game
function startGame() {
  wordIndex = getRandomIndex(wordBank);
  turns = 7;
  turnsHolder.innerHTML = `0${turns}`;
  //picks random word for the game round and splits the atring into an array
  roundWord = wordBank[wordIndex].word.split("");
  showWord = wordBank[wordIndex].word.split("");
  hintBtn.setAttribute("style", "visibility:visible");
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
    var word = document.createElement("span");
    word.classList.add("underline");
    word.classList.add("hidden");
    word.textContent = roundWord[i];
    wordHolder.appendChild(word);
  }
}

//this function is selecting all the letter buttons and listening for a click on them
function clickLetters() {
  const allBtns = document.querySelectorAll(".char");
  allBtns.forEach(function (btn) {
    btn.addEventListener("click", function () {
      checkAnswer(this.innerHTML);
      if (roundWord.length === 0) {
        setTimeout(() => {
          winDisplay();
        }, 850);
      }
    });
  });
}

//remove all instances of that char from roundWord
function removeLetters(inputChar) {
  var indexToRemove = roundWord.indexOf(inputChar);
  var temp = roundWord.slice(0, indexToRemove);
  var temp1 = roundWord.slice(indexToRemove + 1);
  roundWord = temp.concat(temp1);

  if (roundWord.includes(inputChar)) {
    removeLetters(inputChar);
  }
}

//checks if letter user has clicked is in the round word and removes instances of it as well as writes the letter to the display
function checkAnswer(inputChar) {
  for (var i = 0; i < roundWord.length; i++) {
    if (inputChar === roundWord[i]) {
      removeLetters(inputChar);

      var chars = wordHolder.children;
      for (var i = 0; i < chars.length; i++) {
        if (inputChar == chars[i].textContent) {
          chars[i].classList.remove("hidden");
        }
      }
      return true;
    }
  }
  updateGame();
  //game is updated and if a letter is incorrect it is written to the Incorrect letters array and displayed on the page
  var incorrectLet = document.createElement("p");
  incorrectLet.innerHTML = inputChar;
  wrongLetters.appendChild(incorrectLet);
  return false;
}

function updateGame() {
  turns--;
  turnsHolder.innerHTML = `0${turns}`;
  if (turns <= 0) {
    loseDisplay();
  }
}

//this function is looping through the letters array and making buttons for each item in the array and adding them to the html file
function writeButtons() {
  var letterSection = document.querySelector(".letter-buttons");
  for (var i = 0; i < letters.length; i++) {
    var buttons = document.createElement("button");
    letterSection.appendChild(buttons);
    buttons.innerHTML = letters[i];
    buttons.classList.add("char");
  }
}

//this function runs the timer for the quiz and displays the time like a digital clock
function timeLimit() {
  let minutes = Math.floor(time / 60);
  let seconds = time % 60;

  countdownEl.innerHTML = minutes + ":0" + seconds;

  var timer = setInterval(function () {
    time--;

    let minutes = Math.floor(time / 60);
    let seconds = time % 60;

    if (seconds < 10) {
      seconds = "0" + seconds;
    }

    countdownEl.innerHTML = minutes + ":" + seconds;

    if (time <= 0) {
      clearInterval(timer);
      loseDisplay();
    }
    if (roundWord.length === 0) {
      clearInterval(timer);
    }
  }, 1000);
}

//displays hint on page when hint button is clicked
function displayHint() {
  roundHint = wordBank[wordIndex].hint;
  hintText.innerHTML = wordBank[wordIndex].hint;
  hintText.setAttribute("style", "visibility:visible");
  hintBtn.setAttribute("style", "display:none");
}

//this function hides the begin button
function hideBtn() {
  startButton.setAttribute("style", "display:none");
}

//event listener for hint button
hintBtn.addEventListener("click", displayHint);

//this event listener listens to the begin button and calls functions to begin the game
startButton.addEventListener("click", startGame);
