import type { Move, KawaiiType, StatusType } from './Move';

export interface CreatureTemplate {
  id: string;
  name: string;
  type: KawaiiType;
  maxHp: number;
  attack: number;
  defense: number;
  speed: number;
  description: string;
  moveIds: string[];
}

export interface CreatureInstance {
  id: string;
  templateId: string;
  name: string;
  type: KawaiiType;
  level: number;
  maxHp: number;
  hp: number;
  attack: number;
  defense: number;
  speed: number;
  moves: Move[];
  status?: StatusType;
}
