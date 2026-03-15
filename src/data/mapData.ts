export interface RectZone { id: string; x: number; y: number; w: number; h: number; color: number; label: string; }
export interface WallRect { x: number; y: number; w: number; h: number; }

export const TILE = 32;
export const mapWidth = 90 * TILE;
export const mapHeight = 48 * TILE;

export const zones: RectZone[] = [
  { id: 'hall', x: 0, y: 0, w: 28 * TILE, h: 18 * TILE, color: 0x3a0f2f, label: 'Hall d’entrée' },
  { id: 'corridor', x: 28 * TILE, y: 4 * TILE, w: 18 * TILE, h: 12 * TILE, color: 0x5a123f, label: 'Couloir des dresseurs' },
  { id: 'core', x: 46 * TILE, y: 0, w: 24 * TILE, h: 18 * TILE, color: 0x6f1f5d, label: 'Salle du cœur central' },
  { id: 'gallery', x: 68 * TILE, y: 18 * TILE, w: 22 * TILE, h: 12 * TILE, color: 0x3b1a61, label: 'Galerie pourpre' },
  { id: 'heal', x: 42 * TILE, y: 20 * TILE, w: 14 * TILE, h: 10 * TILE, color: 0x642a6f, label: 'Zone de soin' },
  { id: 'boss', x: 58 * TILE, y: 32 * TILE, w: 30 * TILE, h: 16 * TILE, color: 0x7c184e, label: 'Salle du boss' }
];

export const walls: WallRect[] = [
  { x: 0, y: 0, w: mapWidth, h: TILE },
  { x: 0, y: mapHeight - TILE, w: mapWidth, h: TILE },
  { x: 0, y: 0, w: TILE, h: mapHeight },
  { x: mapWidth - TILE, y: 0, w: TILE, h: mapHeight },
  { x: 27 * TILE, y: 0, w: TILE, h: 14 * TILE },
  { x: 27 * TILE, y: 16 * TILE, w: TILE, h: 10 * TILE },
  { x: 45 * TILE, y: 0, w: TILE, h: 12 * TILE },
  { x: 45 * TILE, y: 14 * TILE, w: TILE, h: 18 * TILE },
  { x: 67 * TILE, y: 0, w: TILE, h: 26 * TILE },
  { x: 57 * TILE, y: 30 * TILE, w: TILE, h: 18 * TILE }
];

export const doors = [
  { x: 27 * TILE, y: 14.5 * TILE, w: TILE, h: TILE * 1.5 },
  { x: 45 * TILE, y: 12.5 * TILE, w: TILE, h: TILE * 1.5 },
  { x: 67 * TILE, y: 26.5 * TILE, w: TILE, h: TILE * 1.5 },
  { x: 57 * TILE, y: 30.5 * TILE, w: TILE, h: TILE * 1.5 }
];
