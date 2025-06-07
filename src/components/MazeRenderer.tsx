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

const Cell = styled.div<{ cell: MazeCell; borders: string; cellSize: number }>`
  width: ${({ cellSize }) => cellSize}px;
  height: ${({ cellSize }) => cellSize}px;
  background-color: ${({ cell }) =>
    cell === 1 ? 'black' : cell === 0 ? 'white' : cell === 2 ? 'green' : 'red'};
  border: ${({ borders }) => borders};
  box-sizing: border-box;
`;

const MazeRenderer: React.FC<MazeRendererProps> = ({
  maze,
  width,
  height,
  containerSize,
}) => {
  const cellSize = getCellSize(containerSize, width, height);

  const getBorders = (maze: number[][], rowIndex: number, cellIndex: number) => {
    const top = rowIndex > 0 && maze[rowIndex - 1][cellIndex] === 1 ? '2px solid black' : 'none';
    const left = cellIndex > 0 && maze[rowIndex][cellIndex - 1] === 1 ? '2px solid black' : 'none';
    const right = cellIndex < maze[rowIndex].length - 1 && maze[rowIndex][cellIndex + 1] === 1 ? '2px solid black' : 'none';
    const bottom = rowIndex < maze.length - 1 && maze[rowIndex + 1][cellIndex] === 1 ? '2px solid black' : 'none';
    return `${top} ${right} ${bottom} ${left}`;
  };

  return (
    <MazeContainer width={width} height={height} cellSize={cellSize}>
      {maze.map((row, rowIndex) =>
        row.map((cell, cellIndex) => (
          <Cell
            key={`${rowIndex}-${cellIndex}`}
            cell={cell}
            borders={getBorders(maze, rowIndex, cellIndex)}
            cellSize={cellSize}
          />
        ))
      )}
    </MazeContainer>
  );
};

export default MazeRenderer;
