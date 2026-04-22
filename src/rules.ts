export type Rule = {
  name: string;
  b: number[];
  s: number[];
  density?: number;
  recommendedPattern?: string;
  usePattern?: boolean;
};

export const presets: Rule[] = [
  {
    name: "Conway's Game of Life",
    b: [3],
    s: [2, 3],
    density: 0.2,
  },
  {
    name: "HighLife",
    b: [3, 6],
    s: [2, 3],
    density: 0.2,
    // recommendedPattern: "Gosper Glider Gun",
    // usePattern: true,
  },
  {
    name: "Day & Night",
    b: [3, 6, 7, 8],
    s: [3, 4, 6, 7, 8],
    density: 0.3,
  },
  { name: "Seeds", b: [2], s: [], density: 0.4, recommendedPattern: "Block", usePattern: true},
  {
    name: "Life without Death",
    b: [3],
    s: [0, 1, 2, 3, 4, 5, 6, 7, 8],
    density: 0.01,
  },
  {
    name: "Mazectrics",
    b: [3],
    s: [1, 2, 3, 4],
    density: 0.15,
    recommendedPattern: "Maze Seed",
    usePattern: true
  },
  {
    name: "Replicator",
    b: [1, 3, 5, 7, 8],
    s: [1, 3, 5, 7, 8],
    density: 0.2,
    recommendedPattern: "Replicator Seed",
    usePattern: true
  },
  {
    name: "Live Free or Die",
    b: [2],
    s: [0, 1, 2, 3, 4],
    density: 0.1,
    recommendedPattern: "R-Pentomino",
    usePattern: true,
  },
  {
    name: "Morley",
    b: [3, 6, 8],
    s: [2, 4],
    density: 0.3,
  },
  {
    name: "Snowflakes",
    b: [3, 5, 7],
    s: [5, 7],
    density: 0.2,
  },
  {
    name: "Vote",
    b: [4, 5, 6, 7, 8],
    s: [4, 5, 6, 7, 8],
    density: 0.5,
  },
  {
    name: "Inversed Life",
    b: [0, 1, 2, 3, 4, 7, 8],
    s: [3],
    density: 0.5,
  },
  {
    name: "Diamonds",
    b: [2, 4],
    s: [3],
    density: 0.25,
    recommendedPattern: "Diamond Seed",
    usePattern: true,
  },
  {
    name: "Diamoeba",
    b: [3, 5, 6, 7, 8],
    s: [5, 6, 7, 8],
    density: 0.5,
  }
];

// what in the nested ahh
// jojo reference????
export function simulate(grid: number[][] | null, rule: Rule): number[][] {
  if(!grid || grid.length === 0) return [];
  
  const rows = grid.length;
  const cols = grid[0].length;
  const next = grid.map((row) => [...row]);

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      let neighbors = 0;

      for (let dr = -1; dr <= 1; dr++) {
        for (let dc = -1; dc <= 1; dc++) {
          if (dr === 0 && dc === 0) continue;
          // console.log({r, c, dr, dc})

          const nr = r + dr;
          const nc = c + dc;

          if (nr >= 0 && nr < rows && nc >= 0 && nc < cols) {
            neighbors += grid[nr][nc];
          }
        }
      }

      const cell = grid[r][c];
      if (cell === 0) {
        next[r][c] = rule.b.includes(neighbors) ? 1 : 0;
      } else {
        next[r][c] = rule.s.includes(neighbors) ? 1 : 0;
      }
    }
  }

  return next;
}


export function parseRule(input: string): Rule | null {
  const match = input.match(/^B([0-9,]*)\/S([0-9,]*)$/i);
  if (!match) return null;

  const parseNumbers = (str: string) =>
    str ? str.split(",").join("").split("").map(Number).filter(n => !isNaN(n) && n >= 0 && n <= 8) : [];

  const b = parseNumbers(match[1]);
  const s = parseNumbers(match[2]);

  if (b.length === 0 && s.length === 0) return null;

  return { name: "Custom", b, s };
}
