import Phaser from 'phaser';

export class DefeatScene extends Phaser.Scene {
  constructor() { super('DefeatScene'); }

  create(): void {
    this.cameras.main.setBackgroundColor('#1d0710');
    this.add.text(130, 140, 'Défaite…', { fontFamily: 'monospace', fontSize: '56px', color: '#ff8ba7' });
    this.add.text(130, 220, 'La Love Arena reste impitoyable.', { fontFamily: 'monospace', fontSize: '26px', color: '#fff' });
    this.add.text(130, 360, 'ESPACE pour revenir à l\'écran titre', { fontFamily: 'monospace', fontSize: '20px', color: '#ffd7e7' });
    this.input.keyboard?.on('keydown-SPACE', () => this.scene.start('TitleScene'));
  }
}
