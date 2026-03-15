import Phaser from 'phaser';
import { trainers } from '../data/trainers';
import { createCreature } from '../data/creatures';
import { BattleMenu } from '../ui/BattleMenu';
import { applyEndTurnStatus, computeMove } from '../systems/battleSystem';
import type { CreatureInstance } from '../types/Creature';
import type { SaveData } from '../types/SaveData';
import { saveGame } from '../systems/saveSystem';
import type { Item } from '../types/Item';

type BattlePhase = 'action' | 'attackSelect' | 'itemSelect';

export class BattleScene extends Phaser.Scene {
  private saveData!: SaveData;
  private trainerId!: string;
  private menu!: BattleMenu;
  private battleText!: Phaser.GameObjects.Text;
  private player!: CreatureInstance;
  private enemyTeam: CreatureInstance[] = [];
  private enemy!: CreatureInstance;
  private phase: BattlePhase = 'action';
  private choiceIndex = 0;
  private inAction = false;
  private choiceBox!: Phaser.GameObjects.Rectangle;
  private choiceText!: Phaser.GameObjects.Text;

  constructor() { super('BattleScene'); }
  init(data: { trainerId: string }): void { this.trainerId = data.trainerId; }

  create(): void {
    this.saveData = this.registry.get('saveData');
    const trainer = trainers.find((t) => t.id === this.trainerId)!;

    this.cameras.main.setBackgroundColor('#100a18');
    this.add.rectangle(0, 0, 960, 540, 0x362e53).setOrigin(0, 0);
    this.add.rectangle(140, 170, 220, 120, 0x79bc54).setStrokeStyle(3, 0);
    this.add.rectangle(760, 350, 220, 120, 0x79bc54).setStrokeStyle(3, 0);

    this.enemyTeam = trainer.team.map((id, i) => createCreature(id, 12 + i));
    this.player = this.saveData.team.find((c) => c.hp > 0) ?? this.saveData.team[0];
    this.enemy = this.enemyTeam[0];

    this.add.image(140, 145, this.enemy.templateId).setScale(1.2);
    this.add.image(760, 325, this.player.templateId).setScale(1.2);
    this.add.text(40, 50, `${trainer.name} te défie !`, { fontFamily: 'monospace', fontSize: '24px', color: '#ffd7f4' });
    this.battleText = this.add.text(40, 395, '', { fontFamily: 'monospace', fontSize: '20px', color: '#fff' });
    this.menu = new BattleMenu(this, 640, 410);

    this.choiceBox = this.add.rectangle(630, 300, 300, 100, 0x1f0f27, 0.95).setOrigin(0, 0).setStrokeStyle(2, 0xea58c7).setVisible(false);
    this.choiceText = this.add.text(646, 316, '', { fontFamily: 'monospace', fontSize: '16px', color: '#ffffff' }).setVisible(false);

    this.renderBars();
    this.updateText(`${trainer.name}: ${trainer.intro}`);

    this.input.keyboard?.on('keydown-LEFT', () => this.onLeft());
    this.input.keyboard?.on('keydown-RIGHT', () => this.onRight());
    this.input.keyboard?.on('keydown-UP', () => this.onUp());
    this.input.keyboard?.on('keydown-DOWN', () => this.onDown());
    this.input.keyboard?.on('keydown-ESC', () => this.onCancel());
    this.input.keyboard?.on('keydown-ENTER', () => this.onConfirm(trainer.isBoss ?? false));
    this.input.keyboard?.on('keydown-SPACE', () => this.onConfirm(trainer.isBoss ?? false));
  }

  private getUsableItems(): Item[] { return this.saveData.inventory.filter((item) => item.quantity > 0); }

  private renderBars(): void {
    this.add.rectangle(660, 260, 250, 66, 0x1f0f27, 0.9).setStrokeStyle(2, 0xeb7ad6);
    this.add.text(546, 232, `${this.player.name} Niv ${this.player.level}`, { fontFamily: 'monospace', fontSize: '16px', color: '#fff' });
    const php = Math.max(0, this.player.hp / this.player.maxHp);
    this.add.rectangle(700, 266, 170, 14, 0x000000).setOrigin(0, 0.5);
    this.add.rectangle(700, 266, 170 * php, 12, 0x4ad063).setOrigin(0, 0.5);
    if (this.player.status) this.add.text(700, 280, `STATUT: ${this.player.status}`, { fontFamily: 'monospace', fontSize: '12px', color: '#ffd1f1' });

    this.add.rectangle(60, 70, 250, 66, 0x1f0f27, 0.9).setStrokeStyle(2, 0xeb7ad6);
    this.add.text(74, 42, `${this.enemy.name} Niv ${this.enemy.level}`, { fontFamily: 'monospace', fontSize: '16px', color: '#fff' });
    const ehp = Math.max(0, this.enemy.hp / this.enemy.maxHp);
    this.add.rectangle(110, 76, 170, 14, 0x000000).setOrigin(0, 0.5);
    this.add.rectangle(110, 76, 170 * ehp, 12, 0xff4f8d).setOrigin(0, 0.5);
    if (this.enemy.status) this.add.text(110, 90, `STATUT: ${this.enemy.status}`, { fontFamily: 'monospace', fontSize: '12px', color: '#ffd1f1' });
  }

  private renderChoiceBox(): void {
    if (this.phase === 'action') { this.choiceBox.setVisible(false); this.choiceText.setVisible(false); return; }
    this.choiceBox.setVisible(true); this.choiceText.setVisible(true);

    if (this.phase === 'attackSelect') {
      this.choiceText.setText(this.player.moves.map((m, i) => `${i === this.choiceIndex ? '>' : ' '} ${m.name}`).join('\n'));
      return;
    }

    const items = this.getUsableItems();
    if (!items.length) this.choiceText.setText('Aucun objet utilisable');
    else this.choiceText.setText(items.map((it, i) => `${i === this.choiceIndex ? '>' : ' '} ${it.name} x${it.quantity}`).join('\n'));
  }

  private updateText(t: string): void { this.battleText.setText(t); }
  private onLeft(): void { if (this.phase === 'action') this.menu.move(-1); }
  private onRight(): void { if (this.phase === 'action') this.menu.move(1); }
  private onUp(): void { if (this.phase === 'action') this.menu.move(-2); else { this.choiceIndex = Math.max(0, this.choiceIndex - 1); this.renderChoiceBox(); } }
  private onDown(): void { if (this.phase === 'action') this.menu.move(2); else { const max = this.phase === 'attackSelect' ? this.player.moves.length - 1 : Math.max(0, this.getUsableItems().length - 1); this.choiceIndex = Math.min(max, this.choiceIndex + 1); this.renderChoiceBox(); } }
  private onCancel(): void { if (this.phase !== 'action') { this.phase = 'action'; this.choiceIndex = 0; this.renderChoiceBox(); } }

  private useMove(moveIndex: number): string {
    const move = this.player.moves[moveIndex % this.player.moves.length];
    const res = computeMove(this.player, this.enemy, move);
    this.enemy.hp = Math.max(0, this.enemy.hp - res.damage);
    return [
      `${this.player.name} utilise ${move.name}.`,
      res.effectiveText,
      res.critical ? 'Coup critique !' : undefined,
      res.statusInflicted
    ].filter(Boolean).join(' ');
  }

  private enemyTurn(): string {
    const move = this.enemy.moves[Math.floor(Math.random() * this.enemy.moves.length)];
    const res = computeMove(this.enemy, this.player, move);
    this.player.hp = Math.max(0, this.player.hp - res.damage);
    return [`${this.enemy.name} utilise ${move.name}.`, res.effectiveText, res.critical ? 'Coup critique !' : undefined, res.statusInflicted].filter(Boolean).join(' ');
  }

  private consumeItem(item: Item): string {
    item.quantity -= 1;
    if (item.effect === 'heal') { this.player.hp = Math.min(this.player.maxHp, this.player.hp + item.value); return `${item.name} utilisée.`; }
    if (item.effect === 'fullHeal') { this.player.hp = this.player.maxHp; this.player.status = undefined; return `${item.name} utilisée.`; }
    if (item.effect === 'buffDefense') { this.player.defense += item.value; return `${item.name}: Défense +${item.value}.`; }
    this.player.speed += item.value; return `${item.name}: Vitesse +${item.value}.`;
  }

  private resolve(parts: string[]): void {
    const trainer = trainers.find((t) => t.id === this.trainerId)!;

    if (this.enemy.hp <= 0) {
      this.enemyTeam.shift();
      if (!this.enemyTeam.length) {
        if (!this.saveData.defeatedTrainerIds.includes(this.trainerId)) this.saveData.defeatedTrainerIds.push(this.trainerId);
        if (trainer.isBoss) { this.saveData.bossDefeated = true; saveGame(this.saveData); this.scene.start('VictoryScene'); return; }
        saveGame(this.saveData);
        this.updateText(`Victoire ! ${trainer.name}: ${trainer.defeat}`);
        this.time.delayedCall(1200, () => this.scene.start('ArenaScene'));
        return;
      }
      this.enemy = this.enemyTeam[0];
      this.time.delayedCall(800, () => this.scene.restart({ trainerId: this.trainerId }));
    } else if (this.player.hp <= 0) {
      const next = this.saveData.team.find((c) => c.hp > 0);
      if (!next) { this.scene.start('DefeatScene'); return; }
      this.player = next;
      this.time.delayedCall(800, () => this.scene.restart({ trainerId: this.trainerId }));
    } else {
      this.time.delayedCall(900, () => this.scene.restart({ trainerId: this.trainerId }));
    }

    this.updateText(parts.join('\n'));
    this.inAction = false;
  }

  private onConfirm(isBoss: boolean): void {
    if (this.inAction) return;

    if (this.phase === 'attackSelect') {
      this.inAction = true;
      this.phase = 'action';
      this.renderChoiceBox();
      const parts = [this.useMove(this.choiceIndex)];
      if (this.enemy.hp > 0) parts.push(this.enemyTurn());
      const pTick = applyEndTurnStatus(this.player); const eTick = applyEndTurnStatus(this.enemy);
      if (pTick > 0) parts.push(`${this.player.name} perd ${pTick} PV de statut.`);
      if (eTick > 0) parts.push(`${this.enemy.name} perd ${eTick} PV de statut.`);
      this.resolve(parts);
      return;
    }

    if (this.phase === 'itemSelect') {
      const items = this.getUsableItems();
      if (!items.length) { this.phase = 'action'; this.renderChoiceBox(); this.updateText('Aucun objet utilisable.'); return; }
      this.inAction = true;
      this.phase = 'action';
      this.renderChoiceBox();
      const parts = [this.consumeItem(items[this.choiceIndex])];
      if (this.enemy.hp > 0) parts.push(this.enemyTurn());
      saveGame(this.saveData);
      this.resolve(parts);
      return;
    }

    this.inAction = true;
    const action = this.menu.getSelected();

    if (action === 'Fuir' && isBoss) { this.updateText('Impossible de fuir face à Magnus !'); this.inAction = false; return; }
    if (action === 'Fuir') { this.scene.start('ArenaScene'); return; }
    if (action === 'Kawaiimon') {
      const alt = this.saveData.team.find((c) => c.hp > 0 && c.id !== this.player.id);
      if (alt) { this.player = alt; this.time.delayedCall(500, () => this.scene.restart({ trainerId: this.trainerId })); }
      this.inAction = false;
      return;
    }
    if (action === 'Objet') {
      this.phase = 'itemSelect'; this.choiceIndex = 0; this.renderChoiceBox(); this.inAction = false;
      return;
    }

    this.phase = 'attackSelect'; this.choiceIndex = 0; this.renderChoiceBox(); this.inAction = false;
  }
}
