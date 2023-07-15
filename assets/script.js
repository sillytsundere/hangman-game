var startbutton = document.querySelector('#start');
var countdownEl = document.getElementById("timer");

var startingMinutes = 1;
var time = startingMinutes * 60;

var lose = function(){
    document.getElementById('main').display = none;
    document.querySelector('#lose').display = block;
}
var win = function(){
    document.querySelector('.win').display = block;
}

startbutton.addEventListener('click', function() {
    console.log('event listener works');
    setInterval(function() {
        var minutes = Math.floor(time / 60);
        var seconds = time % 60;
    
        if (seconds < 10) {
            seconds = '0' + seconds;
        } 
    
        countdownEl.innerHTML = minutes + ':' + seconds;
        time--;
    
        if (time === 0) {
            clearInterval();
            lose();
        }
    }, 1000);
});