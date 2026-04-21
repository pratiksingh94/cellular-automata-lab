export type Rule = {
  name: string;
  b: number[];
  s: number[];
  density?: number;
}

export const presets: Rule[] = [
  { name: "Conway's Game of Life", b: [3], s: [2, 3], density: 0.2 },
  { name: "HighLife", b: [3, 6], s: [2, 3], density: 0.2 },
  { name: "Day & Night", b: [3, 6, 7, 8], s: [3, 4, 6, 7, 8], density: 0.3 },
  { name: "Seeds", b: [2], s: [], density: 0.4 },
  { name: "Life without Death", b: [3], s: [0, 1, 2, 3, 4, 5, 6, 7, 8 ], density: 0.1 },
  { name: "Mazectrics", b: [3], s: [1, 2, 3, 4], density: 0.15 },
  { name: "Replicator", b: [1,3,5,7,8], s: [1, 3, 5, 7, 8], density: 0.2 },
  { name: "Live Free or Die", b: [2], s: [0, 1, 2, 3, 4], density: 0.1 },
  { name: "Morley", b: [3, 6, 8], s: [2, 4], density: 0.3 },
  { name: "Snowflakes", b: [3, 5, 7], s: [5, 7], density: 0.2 },
  { name: "Vote", b: [4, 5, 6, 7, 8], s: [4, 5, 6, 7, 8], density: 0.5 },
  { name: "Inversed Life", b: [0, 1, 2, 3, 4, 7, 8], s: [3], density: 0.3 },
  { name: "Diamonds", b: [2, 4], s: [3], density: 0.25 }
]


// what in the nested ahh
// jojo reference????
export function simulate(grid: number[][], rule: Rule): number[][] {
  const rows = grid.length;
  const cols = grid[0].length;
  const next = grid.map(row => [...row]);

  for(let r = 0; r < rows; r++) {
    for(let c = 0; c < cols; c++) {
      let neighbors = 0;

      for(let dr = -1; dr <= 1; dr++) {
        for(let dc = -1; dc <= 1; dc++) {
          if(dr === 0 && dc === 0) continue;
          // console.log({r, c, dr, dc})
          
          const nr = r + dr;
          const nc = c + dc;

          if(nr >= 0 && nr < rows && nc >= 0 && nc < cols) {
            neighbors += grid[nr][nc];
          }
        }
      }

      const cell = grid[r][c];
      if(cell === 0) {
        next[r][c] = rule.b.includes(neighbors) ? 1 : 0;
      } else {
        next[r][c] = rule.s.includes(neighbors) ? 1 : 0;
      }
    }
  }

  return next;
}