import Phaser from 'phaser';
import { preloadCreatureAssets, registerFallbackTextures } from '../systems/assetRegistry';

export class PreloadScene extends Phaser.Scene {
  constructor() { super('PreloadScene'); }

  preload(): void {
    preloadCreatureAssets(this);
    this.load.on('complete', () => registerFallbackTextures(this));
  }

  create(): void {
    registerFallbackTextures(this);
    this.scene.start('TitleScene');
  }
}
