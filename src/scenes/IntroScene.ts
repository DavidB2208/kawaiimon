import Phaser from 'phaser';
import { introLines } from '../data/dialogues';
import { createNewSave, saveGame } from '../systems/saveSystem';

export class IntroScene extends Phaser.Scene {
  private i = 0;
  private text!: Phaser.GameObjects.Text;

  constructor() { super('IntroScene'); }

  create(): void {
    this.cameras.main.setBackgroundColor('#170318');
    this.text = this.add.text(70, 220, introLines[0], { fontFamily: 'monospace', fontSize: '28px', color: '#ffe6fa', wordWrap: { width: 820 } });
    this.add.text(70, 430, 'ESPACE pour continuer', { fontFamily: 'monospace', fontSize: '20px', color: '#fbbce8' });

    this.input.keyboard?.on('keydown-SPACE', () => {
      this.i += 1;
      if (this.i >= introLines.length) {
        const save = createNewSave();
        saveGame(save);
        this.registry.set('saveData', save);
        this.scene.start('ArenaScene');
        return;
      }
      this.text.setText(introLines[this.i]);
    });
  }
}
