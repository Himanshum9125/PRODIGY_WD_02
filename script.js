let startTime = 0, elapsed = 0, timer = null, laps = [];
const display = document.getElementById('display');
const startBtn = document.getElementById('startBtn');
const pauseBtn = document.getElementById('pauseBtn');
const resetBtn = document.getElementById('resetBtn');
const lapBtn = document.getElementById('lapBtn');
const lapsList = document.getElementById('laps');

function formatTime(ms) {
  const date = new Date(ms);
  const min = String(date.getUTCMinutes()).padStart(2, '0');
  const sec = String(date.getUTCSeconds()).padStart(2, '0');
  const msms = String(date.getUTCMilliseconds()).padStart(3, '0');
  return `${min}:${sec}:${msms}`;
}

function updateDisplay() {
  display.textContent = formatTime(elapsed + (timer ? Date.now() - startTime : 0));
}

function setButtons(running) {
  startBtn.disabled = running;
  pauseBtn.disabled = !running;
  lapBtn.disabled = !running;
  resetBtn.disabled = running && laps.length === 0;
}

function tick() {
  updateDisplay();
  if (timer) requestAnimationFrame(tick);
}

startBtn.onclick = () => {
  startTime = Date.now();
  timer = true;
  setButtons(true);
  tick();
};
pauseBtn.onclick = () => {
  elapsed += Date.now() - startTime;
  timer = null;
  setButtons(false);
};
resetBtn.onclick = () => {
  elapsed = 0; timer = null; laps = [];
  updateDisplay();
  lapsList.innerHTML = '';
  setButtons(false);
};
lapBtn.onclick = () => {
  const currentTime = elapsed + (timer ? Date.now() - startTime : 0);
  laps.push(currentTime);
  const li = document.createElement('li');
  li.innerHTML = `<span>Lap ${laps.length}</span><span>${formatTime(currentTime)}</span>`;
  lapsList.prepend(li);
};

setButtons(false);
updateDisplay();
