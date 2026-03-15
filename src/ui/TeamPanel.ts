import Phaser from 'phaser';
import type { CreatureInstance } from '../types/Creature';

export class TeamPanel {
  constructor(scene: Phaser.Scene, team: CreatureInstance[]) {
    scene.add.rectangle(60, 70, 390, 230, 0x160a19, 0.9).setOrigin(0, 0).setStrokeStyle(2, 0xcf65b3);
    scene.add.text(78, 84, 'Équipe Eitan', { fontFamily: 'monospace', fontSize: '20px', color: '#ffd8f4' });
    team.forEach((c, i) => {
      scene.add.text(82, 118 + i * 56, `${c.name} [${c.type}]  PV ${c.hp}/${c.maxHp} ${c.status ? `(${c.status})` : ''}`, { fontFamily: 'monospace', fontSize: '15px', color: '#fff' });
    });
  }
}
