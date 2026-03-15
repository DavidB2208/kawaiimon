import type { Trainer } from '../types/Trainer';

export const trainers: Trainer[] = [
  { id: 'hari', name: 'Hari', intro: 'Bienvenue dans le couloir des cœurs. Montre-moi ton style !', defeat: 'J’ai été romantiquement dépassé…', team: ['ferrapatte', 'aerotron'] },
  { id: 'seraphine', name: 'Séraphine', intro: 'Mon parfum toxique et flamboyant va te troubler.', defeat: 'Quelle élégance brutale…', team: ['toximuse', 'choriflare'] },
  { id: 'tristina', name: 'Tristina', intro: 'Je garde la galerie pourpre, avance si tu oses.', defeat: 'Même la nuit te respecte maintenant.', team: ['bousillaflor', 'crysalune', 'noctamuse'] },
  { id: 'magnus', name: 'Magnus', intro: 'Je suis Magnus, souverain de la Love Arena.', defeat: 'Le trône est à toi, Eitan.', team: ['tentaflux', 'ferrapatte', 'aerotron', 'bousillaflor'], isBoss: true }
];
