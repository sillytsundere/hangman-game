var startbutton = document.querySelector('#start');
var countdownEl = document.getElementById("timer");
var letterSection = document.querySelector('.letter-buttons');

var startingMinutes = 1;
var time = startingMinutes * 10;

var letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']

var lose = function(){
    document.getElementById('main').style.display = 'none';
    document.querySelector('#lose').style.display = 'block';
}

var win = function(){
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

function writeButtons() {
    console.log('writing the game buttons');
    for (var i = 0; i < letters.length; i++) {
        var buttons = document.createElement('button');
        buttons.textContent = letters[i];
        letterSection.appendChild(buttons);
    }
}

function timeLimit() {
    console.log('event listener works');
    
    let minutes = Math.floor(time / 60);
    let seconds = time % 60;

    countdownEl.innerHTML = minutes + ':' + seconds;

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

startbutton.addEventListener('click', function() {
    timeLimit();
    writeButtons();
});