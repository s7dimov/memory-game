import { Container, Sprite, Text } from '@pixi/react';
import { useCallback, useEffect, useState } from 'react';
import * as PIXI from 'pixi.js';
import { MemoryGameProps, Tile } from '../types';

const GRID_SIZE = 4;
const TILE_PADDING = 10;

// Array of emojis to use in the game
const EMOJIS = ['🐶', '🐱', '🐭', '🐹', '🐰', '🦊', '🐻', '🐼'];

// Color mapping for each emoji
const EMOJI_COLORS: { [key: string]: number } = {
  '🐶': 0xFFA07A, // Light Salmon
  '🐱': 0xFFB6C1, // Light Pink
  '🐭': 0xDDA0DD, // Plum
  '🐹': 0xFFD700, // Gold
  '🐰': 0x98FB98, // Pale Green
  '🦊': 0xFFA500, // Orange
  '🐻': 0x8B4513, // Saddle Brown
  '🐼': 0xE6E6FA, // Lavender
};

export const MemoryGame: React.FC<MemoryGameProps> = ({ stageSize }) => {
  const [tiles, setTiles] = useState<Tile[]>([]);
  const [selectedTiles, setSelectedTiles] = useState<number[]>([]);
  const [isChecking, setIsChecking] = useState(false);
  const [hasWon, setHasWon] = useState(false);

  const tileSize = (stageSize.width - (GRID_SIZE + 1) * TILE_PADDING) / GRID_SIZE;

  const initializeGame = useCallback(() => {
    const values = EMOJIS;
    const pairs = [...values, ...values];
    const shuffled = pairs.sort(() => Math.random() - 0.5);
    
    setTiles(
      shuffled.map((value, index) => ({
        id: index,
        value,
        isRevealed: false,
        isMatched: false,
      }))
    );
    setSelectedTiles([]);
    setHasWon(false);
  }, []);

  useEffect(() => {
    initializeGame();
  }, [initializeGame]);

  useEffect(() => {
    if (selectedTiles.length === 2) {
      setIsChecking(true);
      const [first, second] = selectedTiles;
      
      if (tiles[first].value === tiles[second].value) {
        setTiles(prev =>
          prev.map((tile, index) =>
            index === first || index === second
              ? { ...tile, isMatched: true }
              : tile
          )
        );
        setSelectedTiles([]);
      } else {
        setTimeout(() => {
          setTiles(prev =>
            prev.map((tile, index) =>
              index === first || index === second
                ? { ...tile, isRevealed: false }
                : tile
            )
          );
          setSelectedTiles([]);
        }, 1000);
      }
      setIsChecking(false);
    }
  }, [selectedTiles, tiles]);

  useEffect(() => {
    if (tiles.length > 0 && tiles.every(tile => tile.isMatched)) {
      setHasWon(true);
    }
  }, [tiles]);

  const handleTileClick = (id: number) => {
    if (
      isChecking ||
      selectedTiles.length === 2 ||
      tiles[id].isRevealed ||
      tiles[id].isMatched
    ) {
      return;
    }

    setTiles(prev =>
      prev.map((tile, index) =>
        index === id ? { ...tile, isRevealed: true } : tile
      )
    );
    setSelectedTiles(prev => [...prev, id]);
  };

  const handleTryAgain = () => {
    initializeGame();
  };

  return (
    <Container>
      {tiles.map((tile) => (
        <Container key={tile.id} interactive={true} pointerdown={() => handleTileClick(tile.id)}>
          <Sprite
            texture={PIXI.Texture.WHITE}
            width={tileSize}
            height={tileSize}
            x={tile.id % GRID_SIZE * (tileSize + TILE_PADDING) + TILE_PADDING}
            y={Math.floor(tile.id / GRID_SIZE) * (tileSize + TILE_PADDING) + TILE_PADDING}
            tint={tile.isMatched ? 0x00ff00 : tile.isRevealed ? EMOJI_COLORS[tile.value] : 0x2c3e50}
            alpha={tile.isMatched ? 0.3 : 0.8}
          />
          {(tile.isRevealed || tile.isMatched) && (
            <Text
              text={tile.value}
              anchor={0.5}
              x={tile.id % GRID_SIZE * (tileSize + TILE_PADDING) + TILE_PADDING + tileSize / 2}
              y={Math.floor(tile.id / GRID_SIZE) * (tileSize + TILE_PADDING) + TILE_PADDING + tileSize / 2}
              style={new PIXI.TextStyle({
                fontSize: 48,
                fontFamily: 'Arial',
              })}
            />
          )}
        </Container>
      ))}
      {hasWon && (
        <Container>
          <Text
            text="Winner! 🎉"
            anchor={0.5}
            x={stageSize.width / 2}
            y={stageSize.height / 2 - 40}
            style={new PIXI.TextStyle({
              fill: 0x00ff00,
              fontSize: 64,
              fontFamily: 'Arial',
              stroke: 0x000000,
              strokeThickness: 4,
            })}
          />
          <Sprite
            texture={PIXI.Texture.WHITE}
            width={200}
            height={50}
            x={stageSize.width / 2 - 100}
            y={stageSize.height / 2 + 40}
            tint={0x4CAF50}
            interactive={true}
            pointerdown={handleTryAgain}
          />
          <Text
            text="Try Again"
            anchor={0.5}
            x={stageSize.width / 2}
            y={stageSize.height / 2 + 65}
            style={new PIXI.TextStyle({
              fill: 0xffffff,
              fontSize: 24,
              fontFamily: 'Arial',
            })}
            interactive={true}
            pointerdown={handleTryAgain}
          />
        </Container>
      )}
    </Container>
  );
}; 