const arena = document.getElementById('arena');
const scoreNode = document.getElementById('score');
const timeNode = document.getElementById('time');
const messageNode = document.getElementById('message');
const startBtn = document.getElementById('startBtn');

const kawaiiEmojis = ['🐣', '🦊', '🐸', '🐼', '🐰', '🐧'];
const kawaiiClasses = ['variant-a', 'variant-b', 'variant-c'];

let score = 0;
let timeLeft = 30;
let gameTimer;
let spawnTimer;

function updateHud() {
  scoreNode.textContent = String(score);
  timeNode.textContent = String(timeLeft);
}

function clearArena() {
  [...arena.querySelectorAll('.kawaiimon, .placeholder')].forEach((node) => node.remove());
}

function setMessage(text) {
  messageNode.textContent = text;
}

function spawnKawaiimon() {
  const creature = document.createElement('button');
  creature.type = 'button';
  creature.className = `kawaiimon ${kawaiiClasses[Math.floor(Math.random() * kawaiiClasses.length)]}`;
  creature.textContent = kawaiiEmojis[Math.floor(Math.random() * kawaiiEmojis.length)];
  creature.setAttribute('aria-label', 'Kawaiimon à attraper');

  const x = Math.random() * (arena.clientWidth - 70);
  const y = Math.random() * (arena.clientHeight - 70);

  creature.style.left = `${x}px`;
  creature.style.top = `${y}px`;

  creature.addEventListener('click', () => {
    score += 1;
    updateHud();
    setMessage('Super capture ! Continue comme ça 🌟');
    creature.remove();
  });

  arena.appendChild(creature);

  window.setTimeout(() => {
    if (creature.isConnected) {
      creature.remove();
    }
  }, 900);
}

function endGame() {
  window.clearInterval(gameTimer);
  window.clearInterval(spawnTimer);
  startBtn.disabled = false;

  const rank =
    score >= 20
      ? 'Maître Kawaiimon 👑'
      : score >= 12
        ? 'Champion Arc-en-ciel 🌈'
        : 'Explorateur Mignon ✨';

  setMessage(`Temps écoulé ! Score final: ${score}. Rang: ${rank}`);
}

function startGame() {
  score = 0;
  timeLeft = 30;
  updateHud();
  clearArena();
  setMessage('La partie commence, clique vite sur les Kawaiimon !');
  startBtn.disabled = true;

  spawnTimer = window.setInterval(spawnKawaiimon, 500);

  gameTimer = window.setInterval(() => {
    timeLeft -= 1;
    updateHud();

    if (timeLeft <= 0) {
      endGame();
    }
  }, 1000);
}

startBtn.addEventListener('click', startGame);
