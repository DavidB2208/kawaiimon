export interface Trainer {
  id: string;
  name: string;
  intro: string;
  defeat: string;
  team: string[];
  isBoss?: boolean;
}
