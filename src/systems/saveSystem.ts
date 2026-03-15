import type { SaveData } from '../types/SaveData';
import { createCreature } from '../data/creatures';
import { defaultItems } from '../data/items';

const SAVE_KEY = 'kawaiimon-save-v1';

export const createNewSave = (): SaveData => ({
  playerName: 'Eitan',
  team: [createCreature('nala', 12), createCreature('snoopy', 12), createCreature('milly', 12)],
  inventory: defaultItems(),
  defeatedTrainerIds: [],
  bossDefeated: false,
  lastZone: 'Hall d’entrée'
});

export const saveGame = (data: SaveData): void => {
  localStorage.setItem(SAVE_KEY, JSON.stringify(data));
};

export const loadSave = (): SaveData | null => {
  const raw = localStorage.getItem(SAVE_KEY);
  if (!raw) return null;
  return JSON.parse(raw) as SaveData;
};

export const clearSave = (): void => {
  localStorage.removeItem(SAVE_KEY);
};
