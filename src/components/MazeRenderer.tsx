import React, { useEffect, useId, useRef, useState } from 'react';

import { MazeCell } from '~/utils/MazeGenerator';

interface MazeRendererProps {
  maze: MazeCell[][];
  width: number;
  height: number;
  containerSize: number;
}

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

const PART_SIZE = 64; // Each partition in the texture is 64x64

const CANVAS_WIDTH = 1024;
const CANVAS_HEIGHT = 768;

const TEXTURES = [
  '/maze%20texture.png',
  // '/maze%20texture%202.png',
  '/maze%20texture%203.png',
  '/maze%20texture%204.png',
];

// Helper to check if a cell is a wall (1)
const isWall = (maze: MazeCell[][], y: number, x: number) =>
  maze[y] && maze[y][x] === 1;

// Partition logic as described
const getPartition = (
  maze: MazeCell[][],
  y: number,
  x: number,
  quadrant: 'ul' | 'ur' | 'bl' | 'br'
) => {
  const up = isWall(maze, y - 1, x);
  const left = isWall(maze, y, x - 1);
  const right = isWall(maze, y, x + 1);
  const down = isWall(maze, y + 1, x);

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

const MazeRenderer: React.FC<MazeRendererProps> = ({
  maze,
  width,
  height,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const textureRef = useRef<HTMLImageElement | null>(null);
  const [textureLoaded, setTextureLoaded] = useState(false);

  // Draw maze on canvas
  useEffect(() => {
    if (!textureLoaded) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Clear
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

    // Calculate cell size to fit the maze in canvas
    const visibleWidth = Math.floor(width / 2);
    const visibleHeight = Math.floor(height / 2);
    const cellSize = Math.min(
      Math.floor(CANVAS_WIDTH / visibleWidth),
      Math.floor(CANVAS_HEIGHT / visibleHeight)
    );

    // Center the maze
    const offsetX = Math.floor((CANVAS_WIDTH - visibleWidth * cellSize) / 2);
    const offsetY = Math.floor((CANVAS_HEIGHT - visibleHeight * cellSize) / 2);

    const texture = textureRef.current;
    if (!texture?.complete) {
      // Will re-render on image load
      setTextureLoaded(false);
      return;
    }

    for (let y = 1; y < height; y += 2) {
      for (let x = 1; x < width; x += 2) {
        const px = offsetX + ((x - 1) / 2) * cellSize;
        const py = offsetY + ((y - 1) / 2) * cellSize;
        const half = cellSize / 2;
        (['ul', 'ur', 'bl', 'br'] as const).forEach((q, i) => {
          const partition = getPartition(maze, y, x, q);
          const { x: tx, y: ty } = textureMap[partition];
          // Source rect in texture
          const sx = tx * PART_SIZE;
          const sy = ty * PART_SIZE;
          // Destination rect in canvas
          let dx = px, dy = py;
          if (q === 'ur') dx += half;
          if (q === 'bl') dy += half;
          if (q === 'br') { dx += half; dy += half; }
          ctx.drawImage(
            texture,
            sx, sy, PART_SIZE, PART_SIZE,
            dx, dy, half, half
          );
        });
      }
    }
  }, [textureLoaded, width, height, maze]);

  // Redraw on texture load
  const handleTextureLoad = () => {
    setTextureLoaded(true);
  };

  // Print handler
  const handlePrint = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const dataUrl = canvas.toDataURL('image/png');
    const win = window.open('', '_blank');
    if (!win) return;
    win.document.write(`
      <html>
        <head>
          <title>Print Maze</title>
          <style>
            @media print {
              @page {
                size: landscape;
              }
              body, html {
                margin: 0;
                padding: 0;
                width: 280mm;
                height: 190mm;
              }
              img {
                display: block;
                margin: auto;
                max-width: 100%;
                max-height: 100%;
                width: 210mm;
                height: auto;
                page-break-after: avoid;
              }
            }
            body {
              margin: 0;
              padding: 0;
              background: white;
              text-align: center;
            }
          </style>
        </head>
        <body>
          <img src="${dataUrl}" style="width:210mm;max-height:297mm;" />
          <script>
            window.onload = function() { window.print(); }
          </script>
        </body>
      </html>
    `);
    win.document.close();
  };

  const textureSrc = TEXTURES.sort(() => Math.random() - 0.5)[0];

  return (
    <div style={{ width: '100%', height: '100%', maxWidth: '100vw', maxHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ width: '100%', maxWidth: 1024, aspectRatio: '4/3' }}>
        <canvas
          ref={canvasRef}
          width={1024}
          height={768}
          style={{
            width: '100%',
            height: 'auto',
            maxWidth: '100%',
            maxHeight: '80vh',
            border: '1px solid #ccc',
            background: '#fff',
            display: 'block'
          }}
        />
      </div>
      <img
        ref={textureRef}
        src={textureSrc}
        alt="maze texture"
        style={{ display: 'none' }}
        onLoad={handleTextureLoad}
        id={useId()}
      />
      <button onClick={handlePrint} style={{ marginTop: 8 }}>Print</button>
    </div>
  );
};

export default MazeRenderer;
