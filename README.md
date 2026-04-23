# Cellular Automata Lab

An interactive cellular automata playground built with React and TypeScript

## What is CA (Cellular Automata)?
Cellular Automata is a grid of cells where each cell is either alive or dead    
At each step, every cell counts its neighbors and updates its state based on some rules

<!-- ## Demo

adding soon wait lol
 -->

## Rules

- Birth: a dead cell becomes alive if it has certain neighbors  
- Survival: a live cell stays alive under certain conditions  
- Otherwise, the cell dies or stays dead  

## Examples

- `B3/S23` = Conway's Game of Life
- `B2/S` = Seeds (everything explodes)
- `B3/S1234` = Mazectrics (creates maze patterns)

Simple rules can create surprisingly complex and dynamic patterns :3

## Rule Presets

This project includes 13 CA rules:

| Rule | Notation | Description |
|------|----------|-----------|
| Conway's Game of Life | B3/S23 | The classic complex, chaotic behavior |
| HighLife | B,6/S23 | Like Life but with extra birth condition |
| Day & Night | B3678/S34678 | Symmetric rule with rich patterns |
| Seeds | B2/S | Explosive growth |
| Life without Death | B3/S012345678 | Cells never die, infinite growth |
| Mazectrics | B3/S1234 | Forms maze-like pattern |
| Replicator | B1357/S1357 | Every pattern self-replicates |
| Live Free or Die | B2/S01234 | Cells with 0 neighbors survive |
| Morley | B368/S24 | Known spaceship patterns |
| Snowflakes | B357/S57 | Rotary growth patterns |
| Vote | B45678/S45678 | Majority rule voting |
| Inversed Life | B0123478/S3 | Inverted Life behavior |
| Diamonds | B24/S3 | Forms diamond shapes |

## Features

### Interactive Controls
- **Click and drag** to draw cells on the grid
- **Play/Pause/Step** simulation controls
- **Speed slider** (50ms - 500ms per generation)
- **Grid lines toggle**

### Pattern Library
- Pre-built patterns for each rule:
  - Still lifes, oscillators, spaceships, guns
  - Rule-specific categories for seeding the grid
  - Recommended patterns for quick loading

### Custom Rules
- Enter any B# / S# notation
- more stuff coming soon ig

### Keyboard Shortcuts

| Key | Action |
|-----|-------|
| Space | Play / Pause |
| N / → | Step (next generation) |
| C | Clear grid |
| R | Random 20% |
| H | Random 50% |
| T | Random 10% |
| G | Toggle grid lines |
| + / = | Speed up |
| - | Slow down |
| ? | Show shortcuts |
| Esc | Close modal / Pause |

### Info Panel
- Current rule and notation
- Generation counter
- Alive cell count
- Simulation status

## Pretty simple to run tbh

```bash
# Clone it
git clone https://github.com/pratiksingh94/cellular-automata-lab.git

# Install dependencies
pnpm install

# Start development server
pnpm dev

# Build for production
pnpm build
```
