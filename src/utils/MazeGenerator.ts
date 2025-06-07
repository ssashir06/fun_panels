export type MazeCell = 0 | 1 | 2 | 3; // 0 for path, 1 for wall, 2 for start, 3 for goal

// This function generates a maze as per the parameters provided.
// // Parameters:
// - width: Width of the maze
// - height: Height of the maze
// - startX: X-coordinate of the starting point
// - startY: Y-coordinate of the starting point
// - goalX: X-coordinate of the goal point
// - goalY: Y-coordinate of the goal point
// The goal and start points are set to 0 (path) in the maze, while walls are represented by 1.
// All the 4 edge lines (top, bottom, left, right) of the maze are walls (1) except for the start and goal points.
export const generateMaze = (width: number, height: number): { maze: MazeCell[][], width: number, height: number } => {
  // directions: up, down, left, right
  const directions = [
    { dx: 0, dy: -1 }, // up
    { dx: 0, dy: 1 },  // down
    { dx: -1, dy: 0 }, // left
    { dx: 1, dy: 0 }   // right
  ];
  // Align the size of the maze to be odd numbers for better maze generation
  if (width % 2 === 0) width += 1;
  if (height % 2 === 0) height += 1;
  const startX = 1; // Starting point X-coordinate
  const startY = 1; // Starting point Y-coordinate
  const goalX = width - 2; // Goal point X-coordinate
  const goalY = height - 2; // Goal point Y-coordinate
  // Initialize the maze with walls (1)
  const maze: MazeCell[][] = Array.from({ length: height }, () => Array(width).fill(1));
  
  // Fill out the cells with paths (0) by a recursive function
  function carvePath(x: number, y: number): boolean {
    const nextDirections = directions.sort(() => Math.random() - 0.5); // Shuffle directions for randomness
    for (const { dx, dy } of nextDirections) {
      const nps = [
        { x: x + dx, y: y + dy }, // New position
        { x: x + 2 * dx, y: y + 2 * dy } // Position two steps away
      ];

      // Check if the new position is within bounds and is a wall
      const passed = nps.every(({ x, y }) => x >= 1 && x < width - 1 && y >= 1 && y < height - 1 && maze[y][x] === 1);
      if (passed) {
        for (const { x: newX, y: newY } of nps) {
          maze[newY][newX] = 0; // Mark as path
        }
        const isGoalReached = nps.find(({ x: newX, y: newY }) => newX === goalX && newY === goalY) !== undefined;
        if (isGoalReached || carvePath(nps[1].x, nps[1].y)) {
          return true; // If we reached the goal or found a path to it
        }
      }
    }
    return false;
  }
  // Start carving the path from the start point
  carvePath(startX, startY);
  // Find out any walls that are not part of the path and set them to walls (1)
  function range(start: number, end: number, step: number = 1): number[] {
    const result: number[] = [];
    for (let i = start; i < end; i += step) {
      result.push(i);
    }
    return result;
  }
  
  const pathCellPositions = range(1, height - 1, 2).flatMap(y => range(1, width - 1, 2).map(x => ({ x, y }))).sort(() => Math.random() - 0.5);
  for (const { x, y } of pathCellPositions) {
    if (maze[y][x] === 1) continue; // Skip if already a path
    carvePath(x, y);
  }

  // Fill the start and goal points in the maze
  maze[0][1] = 2; // Set start point as path
  maze[height-1][width-2] = 3; // Set goal point as path
  return {maze, width, height};
};
