# Kawaiimon – Love Arena

Prototype rétro 2D top-down en **Phaser 3 + TypeScript + Vite**.

## Lancer

```bash
npm install
npm run dev
```

Build:

```bash
npm run build
```

## Contrôles

- Déplacement: flèches / WASD
- Interaction: E ou Espace
- Menu pause: ESC
- Combat: flèches + Entrée/Espace
- Sous-menu combat: ESC pour revenir
- Menu pause: touches 1-5 pour utiliser les objets hors combat

## Boucle de jeu

1. Écran titre
2. Nouvelle partie / Continuer
3. Intro narrative
4. Équipe fixe d’Eitan: **Nala (Feu), Snoopy (Sol), Milly (Acier)**
5. Exploration de la Love Arena
6. Combats: Hari, Séraphine, Tristina, boss Magnus
7. Victoire finale

## Structure de l’arène

- Hall d’entrée
- Couloir des dresseurs
- Salle du cœur central
- Galerie pourpre
- Zone de soin (soin + sauvegarde)
- Salle du boss

## Sauvegarde

- localStorage (`kawaiimon-save-v1`)
- progression, équipe, inventaire, boss

## Assets

Script d’import:

```bash
node scripts/import-assets.mjs
```

Il copie les `.png` de `/mnt/data` vers `public/assets` si disponibles.
Le jeu ne casse pas sans assets: placeholders runtime automatiques.

## Limites actuelles

- Design volontairement prototype (sans tileset externe complet).
- IA de combat simple.
