import React, { useLayoutEffect,useRef, useState } from 'react';
import { Helmet } from 'react-helmet';
import styled from 'styled-components';

import MazeRenderer from '~/components/MazeRenderer';
import { generateMaze, MazeCell } from '~/utils/MazeGenerator';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 90%;
`;

const Button = styled.button`
  margin: 10px;
  padding: 10px 20px;
  font-size: 16px;
`;

const MazeOuterWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  flex: 1 1 auto;
  position: relative;
`;

const MazeInnerWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background: #fff;
  box-shadow: 0 0 8px #ccc;
  overflow: hidden;
`;

const MazePage: React.FC = () => {
  const [maze, setMaze] = useState<MazeCell[][] | null>(null);
  const [mazeSize, setMazeSize] = useState<{ width: number; height: number } | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [mazeRenderSize, setMazeRenderSize] = useState<number>(0);
  const mazePrintRef = useRef<(() => void) | null>(null);

  const handleGenerateMaze = (size: 'simple' | 'difficult') => {
    const width = size === 'simple' ? 30 : 80;
    const height = size === 'simple' ? 20 : 70;
    const newMaze = generateMaze(width, height);
    setMaze(newMaze.maze);
    setMazeSize({ width: newMaze.width, height: newMaze.height });
  };

  const handleClearMaze = () => {
    setMaze(null);
    setMazeSize(null);
  };
  
  const handlePrintMaze = () => {
    if (mazePrintRef.current) {
      mazePrintRef.current();
    }
  };

  useLayoutEffect(() => {
    if (maze && mazeSize && containerRef.current) {
      const containerWidth = containerRef.current.offsetWidth;
      const containerHeight = containerRef.current.offsetHeight;
      // Calculate max cell size to keep cells square and fit maze in container
      const cellWidth = Math.floor(containerWidth / mazeSize.width);
      const cellHeight = Math.floor(containerHeight / mazeSize.height);
      const cellSize = Math.max(8, Math.min(cellWidth, cellHeight)); // min cell size 8px
      const size = Math.min(cellSize * mazeSize.width, cellSize * mazeSize.height);
      setMazeRenderSize(size);
    }
  }, [maze, mazeSize]);

  return (
    <>
      <Helmet>
        <title>Simple Maze</title>
      </Helmet>
      <Container ref={containerRef}>
        {!maze && (
          <>
            <Button onClick={() => handleGenerateMaze('simple')}>Generate a Simple Maze</Button>
            <Button onClick={() => handleGenerateMaze('difficult')}>Generate a Difficult Maze</Button>
          </>
        )}
        {maze && mazeSize && (
          <>
            <MazeOuterWrapper>
              <MazeInnerWrapper>
                <MazeRenderer
                  maze={maze}
                  width={mazeSize.width}
                  height={mazeSize.height}
                  containerSize={mazeRenderSize}
                  onPrintRef={mazePrintRef}
                />
              </MazeInnerWrapper>
            </MazeOuterWrapper>
            <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
              <Button onClick={handleClearMaze}>Clear</Button>
              <Button onClick={handlePrintMaze}>Print</Button>
            </div>
          </>
        )}
      </Container>
    </>
  );
};

export default MazePage;
