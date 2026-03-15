export type ItemEffect = 'heal' | 'fullHeal' | 'buffDefense' | 'buffSpeed';

export interface Item {
  id: string;
  name: string;
  effect: ItemEffect;
  value: number;
  quantity: number;
  description: string;
}
