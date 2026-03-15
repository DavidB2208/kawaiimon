import Phaser from 'phaser';

export class Hud {
  private zoneText: Phaser.GameObjects.Text;

  constructor(scene: Phaser.Scene) {
    scene.add.rectangle(0, 0, 270, 34, 0x150816, 0.86).setOrigin(0, 0).setStrokeStyle(2, 0xcf65b3).setScrollFactor(0);
    this.zoneText = scene.add.text(10, 8, 'Love Arena', { fontFamily: 'monospace', fontSize: '16px', color: '#ffe9fa' }).setScrollFactor(0);
  }

  setZone(label: string): void {
    this.zoneText.setText(`Zone: ${label}`);
  }
}
