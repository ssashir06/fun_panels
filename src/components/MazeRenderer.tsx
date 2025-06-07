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

const Cell = styled.div<{ cell: MazeCell; borders: string }>`
  background-color: ${({ cell }) => (cell === 1 ? 'black' : cell === 0 ? 'white' : cell === 2 ? 'green' : 'red')};
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
            cell={cell}
            borders={getBorders(maze, rowIndex, cellIndex)}
          />
        ))
      )}
    </MazeContainer>
  );
};

export default MazeRenderer;
