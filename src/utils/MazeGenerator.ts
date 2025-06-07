export type MazeCell = 0 | 1; // 0 for path, 1 for wall

export const generateMaze = (width: number, height: number, startX: number, startY: number, goalX: number, goalY: number): MazeCell[][] => {
  const maze = Array.from({ length: height }, () => Array(width).fill(1));
  const walls = [];
  const sets = new Map();

  const find = (cell: string): string => {
    if (sets.get(cell) !== cell) {
      sets.set(cell, find(sets.get(cell)));
    }
    return sets.get(cell);
  };

  const union = (cell1: string, cell2: string) => {
    const root1 = find(cell1);
    const root2 = find(cell2);
    if (root1 !== root2) {
      sets.set(root1, root2);
    }
  };

  for (let row = 0; row < height; row++) {
    for (let col = 0; col < width; col++) {
      const cell = `${row}-${col}`;
      sets.set(cell, cell);
      if (row % 2 === 1 && col % 2 === 1) {
        maze[row][col] = 0;
        if (row < height - 2) walls.push([row + 1, col]);
        if (col < width - 2) walls.push([row, col + 1]);
      }
    }
  }

  while (walls.length > 0) {
    const randomIndex = Math.floor(Math.random() * walls.length);
    const [row, col] = walls.splice(randomIndex, 1)[0];
    const cell1 = row % 2 === 0 ? `${row - 1}-${col}` : `${row}-${col - 1}`;
    const cell2 = row % 2 === 0 ? `${row + 1}-${col}` : `${row}-${col + 1}`;
    if (find(cell1) !== find(cell2)) {
      maze[row][col] = 0;
      union(cell1, cell2);
    }
  }

  maze[startY][startX] = 0;
  maze[goalY][goalX] = 0;

  return maze;
};
