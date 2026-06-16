let seconds = 1500;
let interval;

function updateDisplay(){

let min =
Math.floor(seconds / 60);

let sec =
seconds % 60;

document.getElementById("timer")
.textContent =
`${String(min).padStart(2,'0')}:${String(sec).padStart(2,'0')}`;

}

function startTimer(){

if(interval) return;

interval = setInterval(()=>{

if(seconds > 0){

seconds--;

updateDisplay();

}

},1000);

}

function pauseTimer(){

clearInterval(interval);

interval = null;

}

function resetTimer(){

pauseTimer();

seconds = 1500;

updateDisplay();

}

updateDisplay();