import type { KawaiiType } from '../types/Move';

const advantages: Record<KawaiiType, KawaiiType[]> = {
  Feu: ['Plante', 'Glace'],
  Eau: ['Feu', 'Sol'],
  Plante: ['Eau', 'Sol'],
  Sol: ['Feu', 'Acier', 'Poison'],
  Acier: ['Glace', 'Vol'],
  Poison: ['Plante'],
  Vol: ['Plante'],
  Glace: ['Vol', 'Sol'],
  Ténèbres: ['Normal'],
  Normal: []
};

const resistances: Record<KawaiiType, KawaiiType[]> = {
  Feu: ['Plante'],
  Eau: ['Feu'],
  Plante: ['Eau'],
  Sol: ['Poison'],
  Acier: ['Glace'],
  Poison: [],
  Vol: ['Plante'],
  Glace: ['Vol'],
  Ténèbres: ['Normal'],
  Normal: []
};

export const effectivenessMultiplier = (atk: KawaiiType, def: KawaiiType): number => {
  if (advantages[atk].includes(def)) return 1.5;
  if (resistances[def].includes(atk)) return 0.5;
  return 1;
};
