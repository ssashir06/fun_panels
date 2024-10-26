import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import styled from 'styled-components';

import MazeRenderer from '~/components/MazeRenderer';
import { generateMaze } from '~/utils/MazeGenerator';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Button = styled.button`
  margin: 10px;
  padding: 10px 20px;
  font-size: 16px;
`;

const MazePage: React.FC = () => {
  const [maze, setMaze] = useState<number[][] | null>(null);
  const [mazeSize, setMazeSize] = useState<{ width: number; height: number } | null>(null);

  const handleGenerateMaze = (size: 'simple' | 'difficult') => {
    const width = size === 'simple' ? 10 : 30;
    const height = size === 'simple' ? 20 : 40;
    const newMaze = generateMaze(width, height, 0, 0, width - 1, height - 1);
    setMaze(newMaze);
    setMazeSize({ width, height });
  };

  const handleClearMaze = () => {
    setMaze(null);
    setMazeSize(null);
  };

  const handlePrintMaze = () => {
    if (maze) {
      window.print();
    }
  };

  return (
    <>
      <Helmet>
        <title>Simple Maze</title>
      </Helmet>
      <Container>
        {!maze && (
          <>
            <Button onClick={() => handleGenerateMaze('simple')}>Generate a Simple Maze</Button>
            <Button onClick={() => handleGenerateMaze('difficult')}>Generate a Difficult Maze</Button>
          </>
        )}
        {maze && mazeSize && (
          <>
            <MazeRenderer maze={maze} />
            <Button onClick={handleClearMaze}>Clear</Button>
            <Button onClick={handlePrintMaze}>Print</Button>
          </>
        )}
      </Container>
    </>
  );
};

export default MazePage;
