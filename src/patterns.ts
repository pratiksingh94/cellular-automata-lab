import type { Pattern } from "./types"

export const patterns: Pattern[] = [
  // STILL LIFE
  {
    name: "Block",
    category: "still-life",
    description: "Simple 2x2 block",
    rule: "Conway's Game of Life",
    data: [
      [0, 0], [1, 0],
      [0, 1], [1, 1]
    ]
  },
  {
    name: "Beehive",
    category: "still-life",
    description: "Common still life",
    rule: "Conway's Game of Life",
    data: [
      [1, 0], [2, 0],
      [0, 1], [3, 1],
      [1, 2], [2, 2]
    ]
  },
  {
    name: "Loaf",
    category: "still-life",
    description: "Quarter Beehive",
    rule: "Conway's Game of Life",
    data: [
      [0, 0], [1, 0],
      [0, 1], [2, 1],
      [2, 2]
    ]
  },
  {
    name: "Ship",
    category: "still-life",
    description: "Two boats together",
    rule: "Conway's Game of Life",
    data: [
      [0, 0], [1, 0],
      [0, 1], [2, 1],
      [1, 2], [2, 2]
    ]
  },
  {
    name: "Pond",
    category: "still-life",
    description: "3x3 donut",
    rule: "Conway's Game of Life",
    data: [
      [1, 0], [2, 0],
      [0, 1], [3, 1],
      [0, 2], [3, 1],
      [0, 2], [3, 2],
      [1, 3], [2, 3]
    ]
  },
  {
    name: "Tub",
    category: "still-life",
    description: "Single cell in middle",
    rule: "Conway's Game of Life",
    data: [
      [1, 0], [0, 1],
      [2, 1], [1, 2]
    ]
  },

  // OSCILLATORS
  {
    name: "Blinker",
    category: "oscillator",
    description: "Period-2 oscillator",
    rule: "Conway's Game of Life",
    data: [
      [0, 0],
      [1, 0],
      [2, 0]
    ]
  },
  {
    name: "Toad",
    category: "oscillator",
    description: "Period-2 oscillator",
    rule: "Conway's Game of Life",
    data: [
      [1, 0], [2, 0],
      [3, 0], [0, 1],
      [1, 1], [2, 1]
    ]
  },
  {
    name: "Beacon",
    category: "oscillator",
    description: "Period-2 oscillator",
    rule: "Conway's Game of Life",
    data: [
      [0, 0], [1, 0],
      [0, 1], [3, 2],
      [2, 3], [3, 3]
    ]
  },
  {
    name: "Pentadecathlon",
    category: "oscillator",
    description: "Period-15 oscillator",
    rule: "Conway's Game of Life",
    data: [
      [5, 5], [6, 5],
      [7, 4], [7, 6],
      [8, 5], [9, 5],
      [10, 5], [11, 5],
      [12, 4], [12, 6],
      [13, 5], [14, 5]
    ]
  },
  {
    name: "Pulsar",
    category: "oscillator",
    description: "Period-3 oscillator",
    rule: "Conway's Game of Life",
    data: [
      [2, 0], [3, 0], [4, 0], [8, 0], [9, 0], [10, 0],
      [2, 5], [3, 5], [4, 5], [8, 5], [9, 5], [10, 5],
      [2, 7], [3, 7], [4, 7], [8, 7], [9, 7], [10, 7],
      [2, 12], [3, 12], [4, 12], [8, 12], [9, 12], [10, 12],
      [0, 2], [0, 3], [0, 4], [0, 8], [0, 9], [0, 10],
      [5, 2], [5, 3], [5, 4], [5, 8], [5, 9], [5, 10],
      [7, 2], [7, 3], [7, 4], [7, 8], [7, 9], [7, 10],
      [12, 2], [12, 3], [12, 4], [12, 8], [12, 9], [12, 10]
    ]
  },

  // SPACESHIPS
  {
    name: "Glider",
    category: "spaceship",
    description: "Moves diagonally",
    rule: "Conway's Game of Life",
    data: [
      [1, 0], [2, 1],
      [0, 2], [1, 2],
      [2, 2]
    ]
  },
  {
    name: "Lightweight Spaceship",
    category: "spaceship",
    description: "Moves horizontally",
    rule:"Conway's Game of Life",
    data: [
      [1, 0], [4, 0],
      [0, 1], [0, 2],
      [4, 2], [0, 3],
      [1, 3], [2, 3],
      [3, 3]
    ]
  },

  // GUNS
  {
    name: "Gosper Glider Gun",
    category: "gun",
    description: "produces glider every 30 generations",
    rule: "Conway's Game of Life",
    data: [
      [1, 5], [1, 6],
      [2, 5], [2, 6],
      [11, 5], [11, 6],
      [11, 7], [12, 4],
      [12, 8], [13, 3],
      [13, 9], [14, 3],
      [14, 9], [15, 6],
      [16, 4], [16, 8],
      [17, 5], [17, 6],
      [17, 7], [18, 6],
      [21, 3], [21, 4],
      [21, 5], [22, 3],
      [22, 4], [22, 5],
      [23, 2], [23, 6],
      [25, 1], [25, 2],
      [25, 6], [25, 7],
      [35, 3], [35, 4],
      [36, 3], [36, 4]
    ]
  }
]


export const patternsByCategory = {
  "still-life": patterns.filter(p => p.category === "still-life"),
  "oscillator": patterns.filter(p => p.category === "oscillator"),
  "spaceship": patterns.filter(p => p.category === "spaceship"),
  "gun": patterns.filter(p => p.category === "gun")
}

export function getPatternsForRule(ruleName: string): Pattern[] {
  return patterns.filter(p => p.rule === ruleName)
}