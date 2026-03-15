import Phaser from 'phaser';
import { loadSave, clearSave } from '../systems/saveSystem';

export class TitleScene extends Phaser.Scene {
  private options = ['Nouvelle partie', 'Continuer'];
  private selected = 0;
  private labels: Phaser.GameObjects.Text[] = [];

  constructor() { super('TitleScene'); }

  create(): void {
    this.cameras.main.setBackgroundColor('#22051d');
    this.add.text(170, 80, 'Kawaiimon – Love Arena', { fontFamily: 'monospace', fontSize: '52px', color: '#ff8fdd' });
    this.add.text(150, 170, 'Rétro • Kitsch • Romantique • Étrange', { fontFamily: 'monospace', fontSize: '22px', color: '#fff' });

    this.options.forEach((o, i) => {
      this.labels.push(this.add.text(330, 260 + i * 56, o, { fontFamily: 'monospace', fontSize: '32px', color: '#ffe6fa' }));
    });
    this.render();

    this.input.keyboard?.on('keydown-UP', () => { this.selected = Phaser.Math.Wrap(this.selected - 1, 0, this.options.length); this.render(); });
    this.input.keyboard?.on('keydown-DOWN', () => { this.selected = Phaser.Math.Wrap(this.selected + 1, 0, this.options.length); this.render(); });
    this.input.keyboard?.on('keydown-ENTER', () => this.confirm());
    this.input.keyboard?.on('keydown-SPACE', () => this.confirm());
    this.input.keyboard?.on('keydown-N', () => { clearSave(); this.scene.start('IntroScene'); });
  }

  private render(): void {
    this.labels.forEach((l, i) => l.setText(`${i === this.selected ? '> ' : '  '}${this.options[i]}`));
  }

  private confirm(): void {
    if (this.selected === 0) {
      clearSave();
      this.scene.start('IntroScene');
      return;
    }

    if (loadSave()) this.scene.start('ArenaScene');
    else this.scene.start('IntroScene');
  }
}
