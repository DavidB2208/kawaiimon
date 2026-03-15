import type { Move } from '../types/Move';

export const moves: Record<string, Move> = {
  feuroce: { id: 'feuroce', name: 'Feuroce', type: 'Feu', power: 28, accuracy: 0.95, inflictStatus: 'burn', statusChance: 0.2, description: 'Charge flamboyante féline.' },
  magmattack: { id: 'magmattack', name: 'Magmattack', type: 'Feu', power: 34, accuracy: 0.88, description: 'Jet de magma kitsch.' },
  tempete_antonienne: { id: 'tempete_antonienne', name: 'Tempête Antonienne', type: 'Feu', power: 30, accuracy: 0.9, inflictStatus: 'burn', statusChance: 0.3, description: 'Tempête théâtrale rouge.' },
  sterilrez: { id: 'sterilrez', name: 'Stérilrez', type: 'Normal', power: 22, accuracy: 1, inflictStatus: 'slow', statusChance: 0.4, description: 'Onde gênante qui ralentit.' },

  galichage: { id: 'galichage', name: 'Galichage', type: 'Sol', power: 30, accuracy: 0.9, description: 'Coup de terrain massif.' },
  attackaboule: { id: 'attackaboule', name: 'Attack’Aboule', type: 'Sol', power: 32, accuracy: 0.85, description: 'Percussion lourde.' },
  ronflement: { id: 'ronflement', name: 'Ronflement', type: 'Normal', power: 18, accuracy: 1, inflictStatus: 'slow', statusChance: 0.35, description: 'Ronflement assourdissant.' },
  exciterre: { id: 'exciterre', name: 'Exciterre', type: 'Sol', power: 36, accuracy: 0.82, description: 'Secousse exaltée.' },

  caressemoi: { id: 'caressemoi', name: 'Caresse-Moi', type: 'Acier', power: 22, accuracy: 1, description: 'Touche précise métallique.' },
  alopec: { id: 'alopec', name: 'Alopéc', type: 'Acier', power: 30, accuracy: 0.92, description: 'Frappe tranchante élégante.' },
  morsure: { id: 'morsure', name: 'Morsure', type: 'Ténèbres', power: 28, accuracy: 0.95, description: 'Morsure obscure nette.' },
  coussinacier: { id: 'coussinacier', name: 'Coussinacier', type: 'Acier', power: 20, accuracy: 1, inflictStatus: 'slow', statusChance: 0.2, description: 'Impact doux mais dense.' },

  picfer: { id: 'picfer', name: 'Pic Fer', type: 'Acier', power: 30, accuracy: 0.92, description: 'Pique dure comme un cadre.' },
  aerofente: { id: 'aerofente', name: 'Aérofente', type: 'Vol', power: 31, accuracy: 0.9, description: 'Découpe aérienne.' },
  toxelixir: { id: 'toxelixir', name: 'Toxélixir', type: 'Poison', power: 27, accuracy: 0.93, inflictStatus: 'poison', statusChance: 0.3, description: 'Brume empoisonnée.' },
  floraclash: { id: 'floraclash', name: 'Flora Clash', type: 'Plante', power: 32, accuracy: 0.9, description: 'Lianes agressives.' },
  aquaoutrage: { id: 'aquaoutrage', name: 'Aqua Outrage', type: 'Eau', power: 34, accuracy: 0.88, description: 'Vague incontrôlable.' },
  cryobeam: { id: 'cryobeam', name: 'Cryobeam', type: 'Glace', power: 30, accuracy: 0.9, inflictStatus: 'slow', statusChance: 0.25, description: 'Rayon glacial.' },
  nuitgriffe: { id: 'nuitgriffe', name: 'Nuitgriffe', type: 'Ténèbres', power: 30, accuracy: 0.9, description: 'Griffe d’ombre.' }
};
