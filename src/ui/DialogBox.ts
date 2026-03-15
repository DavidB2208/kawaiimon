import Phaser from 'phaser';

export class DialogBox {
  private box: Phaser.GameObjects.Rectangle;
  private text: Phaser.GameObjects.Text;

  constructor(scene: Phaser.Scene) {
    this.box = scene.add.rectangle(20, 420, 920, 100, 0x150816, 0.9).setOrigin(0, 0).setStrokeStyle(3, 0xeb7ad6).setScrollFactor(0);
    this.text = scene.add.text(36, 438, '', { fontFamily: 'monospace', fontSize: '18px', color: '#fff' }).setScrollFactor(0);
    this.hide();
  }

  show(message: string): void {
    this.box.setVisible(true);
    this.text.setVisible(true).setText(message);
  }

  hide(): void {
    this.box.setVisible(false);
    this.text.setVisible(false);
  }
}
