import Phaser from 'phaser';
import { DialogBox } from '../ui/DialogBox';
import { Hud } from '../ui/Hud';
import { TILE, doors, mapHeight, mapWidth, walls, zones } from '../data/mapData';
import { signTexts } from '../data/dialogues';
import { trainers } from '../data/trainers';
import { createNewSave, loadSave, saveGame } from '../systems/saveSystem';
import type { SaveData } from '../types/SaveData';

interface ArenaTrainer { id: string; x: number; y: number; }

const arenaTrainers: ArenaTrainer[] = [
  { id: 'hari', x: 35 * TILE, y: 10 * TILE },
  { id: 'seraphine', x: 56 * TILE, y: 8 * TILE },
  { id: 'tristina', x: 74 * TILE, y: 22 * TILE },
  { id: 'magnus', x: 72 * TILE, y: 40 * TILE }
];

export class ArenaScene extends Phaser.Scene {
  private player!: Phaser.Physics.Arcade.Sprite;
  private cursors!: Phaser.Types.Input.Keyboard.CursorKeys;
  private keys!: Record<string, Phaser.Input.Keyboard.Key>;
  private dialog!: DialogBox;
  private hud!: Hud;
  private saveData!: SaveData;

  constructor() { super('ArenaScene'); }

  create(): void {
    this.saveData = this.registry.get('saveData') ?? loadSave() ?? createNewSave();
    this.registry.set('saveData', this.saveData);

    this.physics.world.setBounds(0, 0, mapWidth, mapHeight);
    this.cameras.main.setBounds(0, 0, mapWidth, mapHeight).setBackgroundColor('#25071f');

    const g = this.add.graphics();
    for (let x = 0; x < mapWidth; x += TILE) {
      for (let y = 0; y < mapHeight; y += TILE) {
        g.fillStyle(((x / TILE) + (y / TILE)) % 2 === 0 ? 0x2d0e26 : 0x35102d, 1).fillRect(x, y, TILE, TILE);
      }
    }
    zones.forEach((z) => {
      g.fillStyle(z.color, 0.85).fillRect(z.x, z.y, z.w, z.h);
      this.add.text(z.x + 18, z.y + 10, z.label, { fontFamily: 'monospace', fontSize: '14px', color: '#ffd4f4' });
    });

    g.fillStyle(0x8d1a5f, 1);
    for (let x = 0; x < mapWidth; x += TILE * 2) g.fillRect(x, TILE * 2, TILE, 6);
    g.fillStyle(0xb01f7d, 0.9).fillEllipse(57 * TILE, 9 * TILE, 12 * TILE, 9 * TILE);
    g.fillStyle(0xcf67b9, 1).fillCircle(54 * TILE, 8.8 * TILE, 28).fillCircle(60 * TILE, 8.8 * TILE, 28);
    g.fillTriangle(52 * TILE, 9 * TILE, 62 * TILE, 9 * TILE, 57 * TILE, 13 * TILE);

    const wallGroup = this.physics.add.staticGroup();
    walls.forEach((w) => {
      for (let x = w.x; x < w.x + w.w; x += TILE) {
        for (let y = w.y; y < w.y + w.h; y += TILE) {
          const block = this.add.rectangle(x + TILE / 2, y + TILE / 2, TILE, TILE, 0x3d102f).setStrokeStyle(2, 0xff77cc);
          wallGroup.add(block as never);
        }
      }
    });

    this.player = this.physics.add.sprite(5 * TILE, 9 * TILE, 'player');
    this.player.setCollideWorldBounds(true);
    this.player.body?.setSize(18, 18).setOffset(3, 3);
    this.physics.add.collider(this.player, wallGroup);

    arenaTrainers.forEach((t) => {
      this.physics.add.sprite(t.x, t.y, 'trainerNpc').setImmovable(true);
    });

    this.dialog = new DialogBox(this);
    this.hud = new Hud(this);
    this.cameras.main.startFollow(this.player, true, 0.1, 0.1);

    this.cursors = this.input.keyboard!.createCursorKeys();
    this.keys = {
      W: this.input.keyboard!.addKey('W'), A: this.input.keyboard!.addKey('A'), S: this.input.keyboard!.addKey('S'), D: this.input.keyboard!.addKey('D'),
      E: this.input.keyboard!.addKey('E'), SPACE: this.input.keyboard!.addKey('SPACE'), ESC: this.input.keyboard!.addKey('ESC')
    };

    this.input.keyboard?.on('keydown-ESC', () => this.scene.launch('MenuScene'));
  }

  private interact(): void {
    if (!(Phaser.Input.Keyboard.JustDown(this.keys.E) || Phaser.Input.Keyboard.JustDown(this.keys.SPACE))) return;

    const trainer = arenaTrainers.find((t) => Phaser.Math.Distance.Between(t.x, t.y, this.player.x, this.player.y) < 46);
    if (trainer) {
      if (this.saveData.defeatedTrainerIds.includes(trainer.id)) this.dialog.show('Ce dresseur est déjà battu.');
      else this.scene.start('BattleScene', { trainerId: trainer.id });
      return;
    }

    if (Phaser.Math.Distance.Between(48 * TILE, 24 * TILE, this.player.x, this.player.y) < 52) {
      this.saveData.team.forEach((c) => { c.hp = c.maxHp; c.status = undefined; });
      saveGame(this.saveData);
      this.dialog.show('Borne de soin: équipe restaurée et sauvegarde effectuée.');
      return;
    }

    if (Phaser.Math.Distance.Between(7 * TILE, 6 * TILE, this.player.x, this.player.y) < 54) this.dialog.show(signTexts.entry);
    else if (Phaser.Math.Distance.Between(55 * TILE, 4 * TILE, this.player.x, this.player.y) < 54) this.dialog.show(signTexts.core);
    else if (Phaser.Math.Distance.Between(47 * TILE, 21 * TILE, this.player.x, this.player.y) < 54) this.dialog.show(signTexts.heal);
    else this.dialog.hide();
  }

  update(): void {
    const speed = 160;
    let vx = 0; let vy = 0;
    if (this.cursors.left.isDown || this.keys.A.isDown) vx = -speed;
    else if (this.cursors.right.isDown || this.keys.D.isDown) vx = speed;
    if (this.cursors.up.isDown || this.keys.W.isDown) vy = -speed;
    else if (this.cursors.down.isDown || this.keys.S.isDown) vy = speed;
    this.player.setVelocity(vx, vy);

    const zone = zones.find((z) => this.player.x >= z.x && this.player.x < z.x + z.w && this.player.y >= z.y && this.player.y < z.y + z.h);
    this.hud.setZone(zone?.label ?? 'Love Arena');

    this.interact();

    doors.forEach((d) => {
      if (Phaser.Geom.Rectangle.Contains(new Phaser.Geom.Rectangle(d.x, d.y, d.w, d.h), this.player.x, this.player.y)) {
        this.dialog.show('Une porte décorative mène vers la zone suivante.');
      }
    });
  }
}
