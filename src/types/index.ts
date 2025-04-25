export interface StageSize {
  width: number;
  height: number;
}

export interface Tile {
  id: number;
  value: string;
  isRevealed: boolean;
  isMatched: boolean;
}

export interface MemoryGameProps {
  stageSize: StageSize;
} 