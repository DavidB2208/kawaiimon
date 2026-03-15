import type { CreatureTemplate, CreatureInstance } from '../types/Creature';
import { moves } from './moves';

export const creatureTemplates: Record<string, CreatureTemplate> = {
  nala: { id: 'nala', name: 'Nala', type: 'Feu', maxHp: 96, attack: 34, defense: 22, speed: 31, description: 'Énergique, protectrice et rapide.', moveIds: ['feuroce', 'magmattack', 'tempete_antonienne', 'sterilrez'] },
  snoopy: { id: 'snoopy', name: 'Snoopy', type: 'Sol', maxHp: 110, attack: 33, defense: 30, speed: 20, description: 'Lourd, stable et surprenant.', moveIds: ['galichage', 'attackaboule', 'ronflement', 'exciterre'] },
  milly: { id: 'milly', name: 'Milly', type: 'Acier', maxHp: 102, attack: 29, defense: 34, speed: 24, description: 'Élégante, défensive et précise.', moveIds: ['caressemoi', 'alopec', 'morsure', 'coussinacier'] },

  ferrapatte: { id: 'ferrapatte', name: 'Ferrapatte', type: 'Acier', maxHp: 95, attack: 31, defense: 31, speed: 20, description: 'Patte lourde blindée.', moveIds: ['picfer', 'caressemoi', 'coussinacier', 'morsure'] },
  aerotron: { id: 'aerotron', name: 'Aérotron', type: 'Vol', maxHp: 88, attack: 30, defense: 23, speed: 34, description: 'Drone chic des airs.', moveIds: ['aerofente', 'nuitgriffe', 'sterilrez', 'cryobeam'] },
  toximuse: { id: 'toximuse', name: 'Toximuse', type: 'Poison', maxHp: 90, attack: 30, defense: 25, speed: 28, description: 'Muse nocive parfumée.', moveIds: ['toxelixir', 'nuitgriffe', 'caressemoi', 'sterilrez'] },
  choriflare: { id: 'choriflare', name: 'Choriflare', type: 'Feu', maxHp: 94, attack: 32, defense: 24, speed: 31, description: 'Danseuse flamboyante.', moveIds: ['feuroce', 'magmattack', 'tempete_antonienne', 'aerofente'] },
  bousillaflor: { id: 'bousillaflor', name: 'Bousillaflor', type: 'Plante', maxHp: 98, attack: 31, defense: 27, speed: 24, description: 'Plante agressive glamour.', moveIds: ['floraclash', 'toxelixir', 'ronflement', 'galichage'] },
  tentaflux: { id: 'tentaflux', name: 'Tentaflux', type: 'Eau', maxHp: 106, attack: 30, defense: 30, speed: 25, description: 'Hydre de podium.', moveIds: ['aquaoutrage', 'toxelixir', 'sterilrez', 'cryobeam'] },
  crysalune: { id: 'crysalune', name: 'Crysalune', type: 'Glace', maxHp: 92, attack: 31, defense: 24, speed: 29, description: 'Lueur glaciale lunaire.', moveIds: ['cryobeam', 'aerofente', 'nuitgriffe', 'floraclash'] },
  noctamuse: { id: 'noctamuse', name: 'Noctamuse', type: 'Ténèbres', maxHp: 96, attack: 33, defense: 24, speed: 30, description: 'Icône obscure du manoir.', moveIds: ['nuitgriffe', 'morsure', 'toxelixir', 'sterilrez'] }
};

export const createCreature = (id: string, level = 10): CreatureInstance => {
  const t = creatureTemplates[id];
  return {
    id: `${id}-${Math.random().toString(36).slice(2, 8)}`,
    templateId: t.id,
    name: t.name,
    type: t.type,
    level,
    maxHp: t.maxHp + level * 2,
    hp: t.maxHp + level * 2,
    attack: t.attack + Math.floor(level / 2),
    defense: t.defense + Math.floor(level / 2),
    speed: t.speed + Math.floor(level / 3),
    moves: t.moveIds.map((moveId) => moves[moveId])
  };
};
