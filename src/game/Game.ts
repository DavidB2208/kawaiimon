import Phaser from 'phaser';
import { BootScene } from '../scenes/BootScene';
import { PreloadScene } from '../scenes/PreloadScene';
import { TitleScene } from '../scenes/TitleScene';
import { IntroScene } from '../scenes/IntroScene';
import { ArenaScene } from '../scenes/ArenaScene';
import { BattleScene } from '../scenes/BattleScene';
import { MenuScene } from '../scenes/MenuScene';
import { VictoryScene } from '../scenes/VictoryScene';
import { DefeatScene } from '../scenes/DefeatScene';

export const createGame = (parent: string): Phaser.Game => new Phaser.Game({
  type: Phaser.AUTO,
  parent,
  width: 960,
  height: 540,
  pixelArt: true,
  backgroundColor: '#120412',
  physics: { default: 'arcade', arcade: { debug: false } },
  scene: [BootScene, PreloadScene, TitleScene, IntroScene, ArenaScene, BattleScene, MenuScene, VictoryScene, DefeatScene]
});
