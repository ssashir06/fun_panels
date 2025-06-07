import React from 'react';
import styled from 'styled-components';

import { MazeCell } from '~/utils/MazeGenerator';

interface MazeRendererProps {
  maze: MazeCell[][];
  width: number;
  height: number;
}

const MazeContainer = styled.div<{ width: number, height: number} >`
  display: grid;
  grid-template-columns: ${({width}) => `repeat(${width}, 1fr)`};
  grid-template-rows: ${({height}) => `repeat(${height}, 1fr)`};
  gap: 0;
  width: 100%;
  height: 100%;
`;

const Cell = styled.div<{ isWall: boolean; borders: string }>`
  background-color: ${({ isWall }) => (isWall ? 'black' : 'white')};
  border: ${({ borders }) => borders};
`;

const MazeRenderer: React.FC<MazeRendererProps> = ({ maze, width, height }) => {
  const getBorders = (maze: number[][], rowIndex: number, cellIndex: number) => {
    const top = rowIndex > 0 && maze[rowIndex - 1][cellIndex] === 1 ? '10px solid black' : 'none';
    const left = cellIndex > 0 && maze[rowIndex][cellIndex - 1] === 1 ? '10px solid black' : 'none';
    const right = cellIndex < maze[rowIndex].length - 1 && maze[rowIndex][cellIndex + 1] === 1 ? '10px solid black' : 'none';
    const bottom = rowIndex < maze.length - 1 && maze[rowIndex + 1][cellIndex] === 1 ? '10px solid black' : 'none';
    return `${top} ${right} ${bottom} ${left}`;
  };

  return (
    <MazeContainer width={width} height={height}>
      {maze.map((row, rowIndex) =>
        row.map((cell, cellIndex) => (
          <Cell
            key={`${rowIndex}-${cellIndex}`}
            isWall={cell === 1}
            borders={getBorders(maze, rowIndex, cellIndex)}
          />
        ))
      )}
    </MazeContainer>
  );
};

export default MazeRenderer;
