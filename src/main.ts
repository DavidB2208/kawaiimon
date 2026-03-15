import { createGame } from './game/Game';

const bootMessage = document.getElementById('boot-message');
const hideBootMessage = (): void => {
  bootMessage?.classList.add('hidden');
};

window.addEventListener('error', () => {
  if (bootMessage) {
    bootMessage.classList.remove('hidden');
    bootMessage.innerHTML = `
      <div class="title">Erreur de démarrage</div>
      <div class="hint">Le jeu ne peut pas se lancer dans ce contexte.</div>
      <div class="hint">Utilise <b>npm install</b> puis <b>npm run dev</b>, puis ouvre l'URL Vite.</div>
    `;
  }
});

try {
  createGame('app');
  hideBootMessage();
} catch {
  if (bootMessage) {
    bootMessage.classList.remove('hidden');
    bootMessage.innerHTML = `
      <div class="title">Lancement impossible</div>
      <div class="hint">Démarre le projet via Vite: <b>npm install</b> puis <b>npm run dev</b>.</div>
    `;
  }
}
