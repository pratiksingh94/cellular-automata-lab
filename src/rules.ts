export type Rule = {
  name: string;
  b: number[];
  s: number[];
}

export const presets: Rule[] = [
  { name: "Conway's Game of Life", b: [3], s: [2, 3] }
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