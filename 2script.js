let duration = 25 * 60; // 25分
let remainingTime = duration;
let timerInterval = null;
let isBreak = false;

function updateDisplay() {
  const minutes = String(Math.floor(remainingTime / 60)).padStart(2, '0');
  const seconds = String(remainingTime % 60).padStart(2, '0');
  document.getElementById('timer').textContent = `${minutes}:${seconds}`;
}

function startTimer() {
  if (timerInterval) return; // 既に動いているなら無視

  timerInterval = setInterval(() => {
    remainingTime--;
    updateDisplay();

    if (remainingTime <= 0) {
      clearInterval(timerInterval);
      timerInterval = null;

      isBreak = !isBreak;
      remainingTime = isBreak ? 5 * 60 : 25 * 60; // 5分休憩 or 25分作業
      document.getElementById('status').textContent = isBreak ? "休憩タイム ☕" : "集中タイム 🔥";

      // 自動で次のタイマー開始
      startTimer();
    }
  }, 1000);
}

function resetTimer() {
  clearInterval(timerInterval);
  timerInterval = null;
  isBreak = false;
  remainingTime = duration;
  document.getElementById('status').textContent = "集中タイム 🔥";
  updateDisplay();
}

updateDisplay(); // 初期表示
