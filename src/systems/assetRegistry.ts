import Phaser from 'phaser';
const creatureKeys = ['nala', 'snoopy', 'milly', 'ferrapatte', 'aerotron', 'toximuse', 'choriflare', 'bousillaflor', 'tentaflux', 'crysalune', 'noctamuse'];

export const registerFallbackTextures = (scene: Phaser.Scene): void => {
  if (!scene.textures.exists('player')) {
    const g = scene.make.graphics({ x: 0, y: 0, add: false });
    g.fillStyle(0xffd7f6).fillRect(0, 0, 24, 24).fillStyle(0x3b0b32).fillRect(6, 4, 12, 8);
    g.generateTexture('player', 24, 24);
  }
  if (!scene.textures.exists('trainerNpc')) {
    const g = scene.make.graphics({ x: 0, y: 0, add: false });
    g.fillStyle(0xa94a91).fillRect(0, 0, 24, 24);
    g.generateTexture('trainerNpc', 24, 24);
  }

  creatureKeys.forEach((key, i) => {
    if (scene.textures.exists(key)) return;
    const g = scene.make.graphics({ x: 0, y: 0, add: false });
    g.fillStyle(0x220822).fillRect(0, 0, 48, 48);
    g.fillStyle(0xff5abf + i * 200).fillCircle(24, 24, 18);
    g.generateTexture(key, 48, 48);
  });
};

export const preloadCreatureAssets = (scene: Phaser.Scene): void => {
  creatureKeys.forEach((key) => {
    scene.load.image(key, `/assets/${key}.png`);
  });
};
