let timerRunning = false;
let startTime = 0;

function startTimer() {
  if (!timerRunning) {
    timerRunning = true;
    startTime = Date.now();
    updateTimer();
  }
}

function stopTimer() {
  timerRunning = false;
  startTime = 0;
  updateDisplay("00:00");
}

function updateTimer() {
  if (timerRunning) {
    const elapsedMillis = Date.now() - startTime;
    const seconds = Math.floor(elapsedMillis / 1000);
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    const formattedTime = `${padZero(minutes)}:${padZero(remainingSeconds)}`;
    updateDisplay(formattedTime);
    setTimeout(updateTimer, 1000); // Update every second
  }
}

function updateDisplay(time) {
  document.getElementById("timer").innerText = time;
}

function padZero(num) {
  return num < 10 ? `0${num}` : num;
}

startTimer();

// Expose functions to the global scope for Electron's main process
window.startTimer = startTimer;
window.stopTimer = stopTimer;