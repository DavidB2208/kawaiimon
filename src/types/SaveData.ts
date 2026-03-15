import type { CreatureInstance } from './Creature';
import type { Item } from './Item';

export interface SaveData {
  playerName: string;
  team: CreatureInstance[];
  inventory: Item[];
  defeatedTrainerIds: string[];
  bossDefeated: boolean;
  lastZone: string;
}
