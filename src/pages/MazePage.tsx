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

const ButtonRow = styled.div`
  display: flex;
  justify-content: center;
  margin: 1em 0;
`;

const Button = styled.button`
  margin: 0 1em;
  padding: 0.5em 1em;
  font-size: 1em;
`;

const MazePage: React.FC = () => {
  const [maze, setMaze] = useState<number[][] | null>(null);

  const handleGenerateMaze = (size: number) => {
    const newMaze = generateMaze(size, size, 0, 0, size - 1, size - 1);
    setMaze(newMaze);
  };

  const clearMaze = () => {
    setMaze(null);
  };

  const printMaze = () => {
    window.print();
  };

  return (
    <>
      <Helmet>
        <title>Simple Maze</title>
      </Helmet>
      <Container>
        {!maze && (
          <ButtonRow>
            <Button onClick={() => handleGenerateMaze(10)}>Generate a Simple Maze</Button>
            <Button onClick={() => handleGenerateMaze(30)}>Generate a Difficult Maze</Button>
          </ButtonRow>
        )}
        {maze && <MazeRenderer maze={maze} />}
        {maze && (
          <ButtonRow>
            <Button onClick={clearMaze}>Clear</Button>
            <Button onClick={printMaze}>Print</Button>
          </ButtonRow>
        )}
      </Container>
    </>
  );
};

export default MazePage;
