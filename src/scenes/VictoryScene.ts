import Phaser from 'phaser';

export class VictoryScene extends Phaser.Scene {
  constructor() { super('VictoryScene'); }
  create(): void {
    this.cameras.main.setBackgroundColor('#1b0820');
    this.add.text(110, 130, 'Victoire finale !', { fontFamily: 'monospace', fontSize: '62px', color: '#ff9de3' });
    this.add.text(110, 230, 'Eitan, Nala, Snoopy et Milly règnent sur la Love Arena.', { fontFamily: 'monospace', fontSize: '24px', color: '#fff' });
    this.add.text(110, 350, 'ESPACE pour revenir au titre', { fontFamily: 'monospace', fontSize: '22px', color: '#ffd7e7' });
    this.input.keyboard?.once('keydown-SPACE', () => this.scene.start('TitleScene'));
  }
}
