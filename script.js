let startTime;
let updatedTime;
let difference;
let timerInterval;
let isRunning = false;
let laps = [];

const display = document.getElementById('display');
const startStopBtn = document.getElementById('startStopBtn');
const resetBtn = document.getElementById('resetBtn');
const lapBtn = document.getElementById('lapBtn');
const lapsContainer = document.getElementById('laps');

function startStopwatch() {
    startTime = new Date().getTime();
    timerInterval = setInterval(showTime, 1);
    startStopBtn.textContent = 'Pause';
    resetBtn.disabled = false;
    lapBtn.disabled = false;
}

function pauseStopwatch() {
    clearInterval(timerInterval);
    startStopBtn.textContent = 'Start';
}

function resetStopwatch() {
    clearInterval(timerInterval);
    display.textContent = '00:00:00.000';
    startStopBtn.textContent = 'Start';
    resetBtn.disabled = true;
    lapBtn.disabled = true;
    isRunning = false;
    laps = [];
    updateLaps();
}

function showTime() {
    updatedTime = new Date().getTime();
    difference = updatedTime - startTime;

    let hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    let minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((difference % (1000 * 60)) / 1000);
    let milliseconds = Math.floor((difference % 1000));

    display.textContent = 
        (hours < 10 ? "0" + hours : hours) + ":" + 
        (minutes < 10 ? "0" + minutes : minutes) + ":" + 
        (seconds < 10 ? "0" + seconds : seconds) + "." + 
        (milliseconds < 100 ? (milliseconds < 10 ? "00" + milliseconds : "0" + milliseconds) : milliseconds);
}

function recordLap() {
    laps.push(display.textContent);
    updateLaps();
}

function updateLaps() {
    lapsContainer.innerHTML = laps.map(lap => `<li>${lap}</li>`).join('');
}

startStopBtn.addEventListener('click', () => {
    if (isRunning) {
        pauseStopwatch();
    } else {
        startStopwatch();
    }
    isRunning = !isRunning;
});

resetBtn.addEventListener('click', resetStopwatch);
lapBtn.addEventListener('click', recordLap);
