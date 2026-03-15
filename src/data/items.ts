import type { Item } from '../types/Item';

export const defaultItems = (): Item[] => [
  { id: 'potion', name: 'Potion', effect: 'heal', value: 30, quantity: 4, description: 'Rend 30 PV.' },
  { id: 'superpotion', name: 'Super Potion', effect: 'heal', value: 60, quantity: 2, description: 'Rend 60 PV.' },
  { id: 'capsule', name: 'Capsule de soin', effect: 'fullHeal', value: 999, quantity: 1, description: 'Restaure tout et retire le statut.' },
  { id: 'boostdef', name: 'Booster Défense', effect: 'buffDefense', value: 5, quantity: 2, description: 'Augmente la défense.' },
  { id: 'boostvit', name: 'Booster Vitesse', effect: 'buffSpeed', value: 5, quantity: 2, description: 'Augmente la vitesse.' }
];
