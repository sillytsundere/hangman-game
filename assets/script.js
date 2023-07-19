var startButton = document.querySelector('#start');
var countdownEl = document.getElementById("timer");
var letterSection = document.querySelector('.letter-buttons');

var startingMinutes = 1;
var time = startingMinutes * 60;

var letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']

var lose = function(){
    document.getElementById('main').style.display = 'none';
    document.querySelector('#lose').style.display = 'block';
}

var win = function(){
    document.getElementById('main').style.display = 'none';
    document.querySelector('.win').style.display = 'block';
}

function getRandomIndex (arr) {
	var randomIndex = Math.floor(Math.random() * arr.length);
    return randomIndex;
}

var wordBank = [
    {
        word: 'parsnip',
        hint: 'Dissappointing root vegatable.'
    },
    {
        word: 'apple',
        hint: 'Nothing worse than finding a worm in this'
    },
    {
        word: 'crayon',
        hint: 'Not a crown'
    }
]

let wordIndex = getRandomIndex (wordBank);

function displayMan() {

}

//this function is selecting all the letter buttons and listening for a click on them
function clickLetters() {
    var allBtns = document.querySelectorAll('.char');
    allBtns.forEach(function(btn) {
        btn.addEventListener('click', function(){
            console.log('checkLetters function is selecting the letter buttons')
            console.log(this.textContent);
        })
    })
    console.log(allBtns.innerHTML);
    // function checkAnswer() {
    //     if (this.textContent === wordBank[wordIndex].hint)
    // }


}

//this function is looping through the letters array and making buttons for each item in the array and adding them to the html file
function writeButtons() {
    for (var i = 0; i < letters.length; i++) {
        var buttons = document.createElement('button');
        buttons.textContent = letters[i];
        letterSection.appendChild(buttons);
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
            lose();
        }
    }, 1000);
}

//this function hides the begin button
function hideBtn () {
    startButton.setAttribute('style', 'display:none');
}

//this event listenet listens to the begin button and calls functions to begin the game
startButton.addEventListener('click', function() {
    hideBtn();
    timeLimit();
    writeButtons();
    clickLetters();
});