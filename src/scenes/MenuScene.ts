import Phaser from 'phaser';
import { TeamPanel } from '../ui/TeamPanel';
import { InventoryPanel } from '../ui/InventoryPanel';
import { saveGame } from '../systems/saveSystem';
import type { SaveData } from '../types/SaveData';
import type { Item } from '../types/Item';

export class MenuScene extends Phaser.Scene {
  private saveData!: SaveData;
  constructor() { super('MenuScene'); }

  create(): void {
    this.saveData = this.registry.get('saveData') as SaveData;
    this.render();

    this.input.keyboard?.on('keydown-S', () => { saveGame(this.saveData); this.render('Sauvegarde effectuée.'); });
    this.input.keyboard?.on('keydown-ONE', () => this.useInventoryIndex(0));
    this.input.keyboard?.on('keydown-TWO', () => this.useInventoryIndex(1));
    this.input.keyboard?.on('keydown-THREE', () => this.useInventoryIndex(2));
    this.input.keyboard?.on('keydown-FOUR', () => this.useInventoryIndex(3));
    this.input.keyboard?.on('keydown-FIVE', () => this.useInventoryIndex(4));
    this.input.keyboard?.on('keydown-ESC', () => this.scene.stop());
  }

  private pickTarget(): SaveData['team'][number] {
    return this.saveData.team.find((c) => c.hp < c.maxHp || c.status) ?? this.saveData.team[0];
  }

  private applyItem(item: Item): string {
    if (item.quantity <= 0) return `${item.name} épuisé.`;
    const target = this.pickTarget();
    item.quantity -= 1;
    if (item.effect === 'heal') { target.hp = Math.min(target.maxHp, target.hp + item.value); return `${item.name} sur ${target.name}: +${item.value} PV.`; }
    if (item.effect === 'fullHeal') { target.hp = target.maxHp; target.status = undefined; return `${item.name} sur ${target.name}: soin complet.`; }
    if (item.effect === 'buffDefense') { target.defense += item.value; return `${item.name}: Défense +${item.value}.`; }
    target.speed += item.value; return `${item.name}: Vitesse +${item.value}.`;
  }

  private useInventoryIndex(index: number): void {
    const item = this.saveData.inventory[index];
    if (!item) return;
    const msg = this.applyItem(item);
    saveGame(this.saveData);
    this.registry.set('saveData', this.saveData);
    this.render(msg);
  }

  private render(message = ''): void {
    this.children.removeAll();
    this.add.rectangle(0, 0, 960, 540, 0x000000, 0.6).setOrigin(0, 0);
    this.add.text(32, 26, 'Menu Pause (ESC pour fermer)', { fontFamily: 'monospace', fontSize: '24px', color: '#ffd8f6' });
    new TeamPanel(this, this.saveData.team);
    new InventoryPanel(this, this.saveData.inventory);
    this.add.text(80, 330, 'S: Sauvegarder', { fontFamily: 'monospace', fontSize: '18px', color: '#fff' });
    this.add.text(80, 360, '1-5: Utiliser un objet hors combat', { fontFamily: 'monospace', fontSize: '16px', color: '#ffd7f4' });
    if (message) this.add.text(80, 400, message, { fontFamily: 'monospace', fontSize: '15px', color: '#ffffff' });
  }
}
