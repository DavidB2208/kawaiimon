import Phaser from 'phaser';

const actions = ['Attaque', 'Kawaiimon', 'Objet', 'Fuir'];

export class BattleMenu {
  private labels: Phaser.GameObjects.Text[] = [];
  private selected = 0;

  constructor(scene: Phaser.Scene, x: number, y: number) {
    scene.add.rectangle(x, y, 300, 120, 0x1f0f27, 0.95).setOrigin(0, 0).setStrokeStyle(2, 0xea58c7);
    actions.forEach((a, i) => {
      const tx = x + 18 + (i % 2) * 140;
      const ty = y + 18 + Math.floor(i / 2) * 42;
      this.labels.push(scene.add.text(tx, ty, a, { fontFamily: 'monospace', fontSize: '20px', color: '#fff' }));
    });
    this.render();
  }

  move(delta: number): void {
    this.selected = Phaser.Math.Wrap(this.selected + delta, 0, actions.length);
    this.render();
  }

  getSelected(): string {
    return actions[this.selected];
  }

  private render(): void {
    this.labels.forEach((l, i) => l.setText(`${i === this.selected ? '>' : ' '} ${actions[i]}`));
  }
}
