export type KawaiiType = 'Feu' | 'Eau' | 'Plante' | 'Sol' | 'Acier' | 'Poison' | 'Vol' | 'Glace' | 'Ténèbres' | 'Normal';
export type StatusType = 'burn' | 'poison' | 'slow';

export interface Move {
  id: string;
  name: string;
  type: KawaiiType;
  power: number;
  accuracy: number;
  statusChance?: number;
  inflictStatus?: StatusType;
  description: string;
}
