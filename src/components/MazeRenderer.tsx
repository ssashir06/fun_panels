import React from 'react';
import styled from 'styled-components';

import { MazeCell } from '~/utils/MazeGenerator';

interface MazeRendererProps {
  maze: MazeCell[][];
  width: number;
  height: number;
  containerSize: number;
}

// Calculate cell size to fit the container and keep cells square
const getCellSize = (containerSize: number, width: number, height: number) =>
  Math.floor(containerSize / Math.max(width, height));

const MazeContainer = styled.div<{ width: number; height: number; cellSize: number }>`
  display: grid;
  grid-template-columns: ${({ width, cellSize }) => `repeat(${width}, ${cellSize}px)`};
  grid-template-rows: ${({ height, cellSize }) => `repeat(${height}, ${cellSize}px)`};
  gap: 0;
  width: ${({ width, cellSize }) => width * cellSize}px;
  height: ${({ height, cellSize }) => height * cellSize}px;
  box-sizing: content-box;
`;

const textureMap: Record<number, { x: number; y: number }> = {
  1: { x: 1, y: 1 },
  2: { x: 2, y: 1 },
  3: { x: 3, y: 1 },
  4: { x: 1, y: 2 },
  5: { x: 2, y: 2 },
  6: { x: 3, y: 2 },
  7: { x: 1, y: 3 },
  8: { x: 2, y: 3 },
  9: { x: 3, y: 3 },
  10: { x: 0, y: 0 },
  11: { x: 4, y: 0 },
  12: { x: 0, y: 4 },
  13: { x: 4, y: 4 },
};

const TEXTURE_WIDTH = 320;
const TEXTURE_HEIGHT = 320;
const PART_SIZE = 64; // Each partition in the texture is 64x64

const Partition = styled.div<{
  partition: number;
  cellSize: number;
  quadrant: 'ul' | 'ur' | 'bl' | 'br';
}>`
  position: absolute;
  width: 50%;
  height: 50%;
  background-image: url('/maze%20texture.png');
  ${({ partition, cellSize }) => {
    const { x, y } = textureMap[partition];
    return `
      background-size: ${TEXTURE_WIDTH * cellSize / PART_SIZE / 2}px ${TEXTURE_HEIGHT * cellSize / PART_SIZE / 2}px;
      background-position: -${x * cellSize / 2}px -${y * cellSize / 2}px;
    `;
  }}
  ${({ quadrant }) => {
    switch (quadrant) {
      case 'ul': return 'top: 0; left: 0;';
      case 'ur': return 'top: 0; right: 0;';
      case 'bl': return 'bottom: 0; left: 0;';
      case 'br': return 'bottom: 0; right: 0;';
    }
  }}
`;

const CellWrapper = styled.div<{ cellSize: number }>`
  position: relative;
  width: ${({ cellSize }) => cellSize}px;
  height: ${({ cellSize }) => cellSize}px;
  box-sizing: border-box;
  overflow: hidden;
`;

const MazeRenderer: React.FC<MazeRendererProps> = ({
  maze,
  width,
  height,
  containerSize,
}) => {
  const visibleWidth = Math.floor(width / 2);
  const visibleHeight = Math.floor(height / 2);
  const cellSize = getCellSize(containerSize, visibleWidth, visibleHeight);

  // Helper to check if a cell is a wall (1)
  const isWall = (y: number, x: number) =>
    maze[y] && maze[y][x] === 1;

  // Partition logic as described
  const getPartition = (
    y: number,
    x: number,
    quadrant: 'ul' | 'ur' | 'bl' | 'br'
  ) => {
    const up = isWall(y - 1, x);
    const left = isWall(y, x - 1);
    const right = isWall(y, x + 1);
    const down = isWall(y + 1, x);

    switch (quadrant) {
      case 'ul':
        if (!left && !up) return 13;
        if (left && up) return 1;
        if (left) return 4;
        if (up) return 2;
        return 5;
      case 'ur':
        if (!right && !up) return 12;
        if (right && up) return 3;
        if (right) return 6;
        if (up) return 2;
        return 5;
      case 'bl':
        if (!left && !down) return 11;
        if (left && down) return 7;
        if (left) return 4;
        if (down) return 8;
        return 5;
      case 'br':
        if (!right && !down) return 10;
        if (right && down) return 9;
        if (right) return 6;
        if (down) return 8;
        return 5;
    }
  };

  // Use for loops instead of map
  const cells: React.ReactNode[] = [];
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      if (y % 2 === 1 && x % 2 === 1) {
        cells.push(
          <CellWrapper
            key={`${y}-${x}`}
            cellSize={cellSize}
          >
            <Partition
              partition={getPartition(y, x, 'ul')}
              cellSize={cellSize}
              quadrant="ul"
            />
            <Partition
              partition={getPartition(y, x, 'ur')}
              cellSize={cellSize}
              quadrant="ur"
            />
            <Partition
              partition={getPartition(y, x, 'bl')}
              cellSize={cellSize}
              quadrant="bl"
            />
            <Partition
              partition={getPartition(y, x, 'br')}
              cellSize={cellSize}
              quadrant="br"
            />
          </CellWrapper>
        );
      } else {
        // cells.push(
        //   <div key={`${y}-${x}`} style={{ width: cellSize, height: cellSize }} />
        // );
      }
    }
  }

  return (
    <MazeContainer width={visibleWidth} height={visibleHeight} cellSize={cellSize}>
      {cells}
    </MazeContainer>
  );
};

export default MazeRenderer;
