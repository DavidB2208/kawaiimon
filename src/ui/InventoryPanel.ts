import Phaser from 'phaser';
import type { Item } from '../types/Item';

export class InventoryPanel {
  constructor(scene: Phaser.Scene, items: Item[]) {
    scene.add.rectangle(480, 70, 420, 250, 0x160a19, 0.9).setOrigin(0, 0).setStrokeStyle(2, 0xcf65b3);
    scene.add.text(498, 84, 'Inventaire', { fontFamily: 'monospace', fontSize: '20px', color: '#ffd8f4' });
    items.forEach((item, i) => {
      scene.add.text(500, 118 + i * 40, `${i + 1}. ${item.name} x${item.quantity} — ${item.description}`, { fontFamily: 'monospace', fontSize: '14px', color: '#fff' });
    });
  }
}
