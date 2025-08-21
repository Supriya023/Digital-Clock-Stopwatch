// ================= CLOCK =================
function updateClock() {
  const now = new Date();
  let h = String(now.getHours()).padStart(2, '0');
  let m = String(now.getMinutes()).padStart(2, '0');
  let s = String(now.getSeconds()).padStart(2, '0');
  document.getElementById("clock").innerText = `${h}:${m}:${s}`;

  // Check alarm
  if (alarmTime && `${h}:${m}` === alarmTime) {
    alert("⏰ Alarm Ringing!");
    alarmTime = null;
    document.getElementById("alarmStatus").innerText = "";
  }
}
setInterval(updateClock, 1000);

let alarmTime = null;

function setAlarm() {
  const input = document.getElementById("alarmTime").value;
  if (input) {
    alarmTime = input;
    document.getElementById("alarmStatus").innerText = "Alarm set for " + alarmTime;
  }
}

function clearAlarm() {
  alarmTime = null;
  document.getElementById("alarmStatus").innerText = "Alarm cleared.";
}

// ================= STOPWATCH =================
let stopwatchInterval;
let elapsedTime = 0;
let running = false;

function updateStopwatch() {
  let hrs = Math.floor(elapsedTime / 3600);
  let mins = Math.floor((elapsedTime % 3600) / 60);
  let secs = elapsedTime % 60;
  document.getElementById("stopwatch").innerText =
    `${String(hrs).padStart(2,'0')}:${String(mins).padStart(2,'0')}:${String(secs).padStart(2,'0')}`;
}

function startStopwatch() {
  if (!running) {
    running = true;
    stopwatchInterval = setInterval(() => {
      elapsedTime++;
      updateStopwatch();
    }, 1000);
  }
}

function pauseStopwatch() {
  running = false;
  clearInterval(stopwatchInterval);
}

function resetStopwatch() {
  running = false;
  clearInterval(stopwatchInterval);
  elapsedTime = 0;
  updateStopwatch();
  document.getElementById("laps").innerHTML = "";
}

function lap() {
  if (running) {
    const lapTime = document.getElementById("stopwatch").innerText;
    const li = document.createElement("li");
    li.innerText = "Lap: " + lapTime;
    document.getElementById("laps").appendChild(li);
  }
}

// Initialize stopwatch display
updateStopwatch();
