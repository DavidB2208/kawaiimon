import type { CreatureInstance } from '../types/Creature';
import type { Move } from '../types/Move';
import { effectivenessMultiplier } from '../data/typeChart';

export interface MoveResult {
  damage: number;
  critical: boolean;
  effectiveText?: string;
  statusInflicted?: string;
}

export const computeMove = (attacker: CreatureInstance, defender: CreatureInstance, move: Move): MoveResult => {
  if (Math.random() > move.accuracy) return { damage: 0, critical: false };

  const effective = effectivenessMultiplier(move.type, defender.type);
  const critical = Math.random() < 0.12;
  const critMul = critical ? 1.4 : 1;
  const base = Math.max(2, move.power + attacker.attack - defender.defense);
  const damage = Math.max(1, Math.floor(base * effective * critMul * (0.9 + Math.random() * 0.2)));

  let effectiveText: string | undefined;
  if (effective > 1) effectiveText = 'Super efficace !';
  else if (effective < 1) effectiveText = 'Pas très efficace…';

  let statusInflicted: string | undefined;
  if (move.inflictStatus && !defender.status && Math.random() < (move.statusChance ?? 0)) {
    defender.status = move.inflictStatus;
    statusInflicted = 'Statut infligé !';
  }

  return { damage, critical, effectiveText, statusInflicted };
};

export const applyEndTurnStatus = (c: CreatureInstance): number => {
  if (c.status === 'burn' || c.status === 'poison') {
    const loss = Math.max(1, Math.floor(c.maxHp * 0.08));
    c.hp = Math.max(0, c.hp - loss);
    return loss;
  }
  return 0;
};
