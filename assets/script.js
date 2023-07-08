var startbutton = document.querySelector('#start');
//why did getElementById not work?

var gameTimer = function() {
    console.log('gameTimer is starting');
    var minute = 18;
    var sec = 60;
    setInterval(function() {
        document.querySelector("#timer").innerHTML = minute + ":" + sec; 
        sec--;

        if (sec == 0o0) {
            //how to make the seconds part display 09, 08, 05 etc?
            minute--;
            sec = 60;

            if (minute === 0) {
                document.querySelector('#timer').innerHTML = 'Game Over';
                console.log('game over');
                //function to erase page and display EoE image with try again button
            }
        }
    }, 1000);
};

startbutton.addEventListener('click', function() {
    console.log('event listener works');
    gameTimer();
});