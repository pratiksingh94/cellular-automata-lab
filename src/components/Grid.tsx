import { useRef, useEffect, useState, useCallback } from "react";
import { type Rule, simulate } from "../rules";
import type { Point } from "../types";

// TODO: clean this file a bit, functions are eveyrwhere make ts modular

export type GridFunctions = {
  randomize: (density?: number) => void;
  clear: () => void;
  play: () => void;
  pause: () => void;
  isPlaying: () => boolean;
  step: () => void;
  getGeneration: () => number;
  getAliveCount: () => number;
  loadPattern: (cells: Point[]) => void;
};

export default function Grid({
  funcRef,
  rule,
  speed,
  zoom = 1,
  gridLines = false,
}: {
  funcRef?: React.RefObject<GridFunctions | null>;
  rule: Rule;
  speed: number;
  zoom?: number;
  gridLines?: boolean;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [dimensions, setDimensions] = useState({ rows: 30, cols: 50 });
  const [isDrawing, setIsDrawing] = useState(false);
  const [drawValue, setDrawValue] = useState(1);
  const [generation, setGeneration] = useState(0);

  const gridRef = useRef<number[][] | null>(null);
  const baseCellSize = 8;
  const cellSize = baseCellSize * zoom;

  const intervalRef = useRef<number | null>(null);
  const isPlayingRef = useRef(false);

  const aliveColor = "#88ff00";
  const deadColor = "#11161c";
  const hoverColor = "rgba(136, 255, 0, 0.3)";
  const hoverPosRef = useRef<{ r: number; c: number } | null>(null);

  function initGrid() {
    gridRef.current = Array.from({ length: dimensions.rows }, () =>
      Array(dimensions.cols).fill(0),
    );
  }

  function drawGrid() {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.fillStyle = deadColor;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    const grid = gridRef.current;
    if (!grid) return;
    for (let r = 0; r < grid.length; r++) {
      for (let c = 0; c < grid[r].length; c++) {
        if (grid[r][c]) {
          ctx.fillStyle = aliveColor;
          ctx.fillRect(c * cellSize, r * cellSize, cellSize, cellSize);
        }
      }
    }

    if (gridLines) {
      ctx.strokeStyle = "#1f2933";
      ctx.lineWidth = 0.5;

      for (let r = 0; r <= dimensions.rows; r++) {
        ctx.beginPath();
        ctx.moveTo(0, r * cellSize);
        ctx.lineTo(canvas.width, r * cellSize);
        ctx.stroke();
      }

      for (let c = 0; c <= dimensions.cols; c++) {
        ctx.beginPath();
        ctx.moveTo(c * cellSize, 0);
        ctx.lineTo(c * cellSize, canvas.height);
        ctx.stroke();
      }
    }
  }

  const clear = useCallback(() => {
    pause();
    initGrid();
    setGeneration(0);
    drawGrid();
  }, []);

  const randomize = useCallback(
    (density = 0.2) => {
      initGrid();
      gridRef.current = Array.from({ length: dimensions.rows }, () =>
        Array.from({ length: dimensions.cols }, () =>
          Math.random() < density ? 1 : 0,
        ),
      );
      setGeneration(0);
      drawGrid();
    },
    [dimensions],
  );

  const pause = useCallback(() => {
    isPlayingRef.current = false;
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  const play = useCallback(() => {
    if (isPlayingRef.current) return;

    if (!gridRef.current) {
      initGrid();
    }

    const hasCells = gridRef.current.some((r) => r.some((c) => c === 1));

    if (!hasCells) {
      // popluating the grid cuz user too lazy to do it himself before playing smh
      const density = rule.density ?? 0.2;
      gridRef.current = Array.from({ length: dimensions.rows }, () =>
        Array.from({ length: dimensions.cols }, () =>
          Math.random() < density ? 1 : 0,
        ),
      );
    }

    isPlayingRef.current = true;
    intervalRef.current = window.setInterval(() => {
      gridRef.current = simulate(gridRef.current!, rule);
      setGeneration((g) => g + 1);
      drawGrid();
    }, speed);
  }, [rule, speed, dimensions]);

  const isPlaying = useCallback(() => isPlayingRef.current, []);

  const step = useCallback(() => {
    if (!gridRef.current) initGrid();
    gridRef.current = simulate(gridRef.current!, rule);
    setGeneration((g) => g + 1);
    drawGrid();
  }, [rule, gridLines]);

  const getGeneration = useCallback(() => generation, [generation]);

  const getAliveCount = useCallback(() => {
    if (!gridRef.current) return 0;
    return gridRef.current.reduce(
      (acc, row) => acc + row.reduce((rowAcc, cell) => rowAcc + cell, 0),
      0,
    );
  }, []);

  const loadPattern = useCallback(
    (cells: Point[]) => {
      pause();
      initGrid();

      gridRef.current = Array.from({ length: dimensions.rows }, () =>
        Array(dimensions.cols).fill(0),
      );

      const centerX = Math.floor(dimensions.cols / 2);
      const centerY = Math.floor(dimensions.rows / 2);

      cells.forEach(([x, y]) => {
        const px = centerX + x;
        const py = centerY + y;

        if (
          py >= 0 &&
          py < dimensions.rows &&
          px >= 0 &&
          px < dimensions.cols
        ) {
          gridRef.current![py][px] = 1;
        }
      });

      setGeneration(0);
      drawGrid();
    },
    [dimensions, pause],
  );

  // useEffect(() => {
  //   pause();
  //   play();
  // }, [speed])

  useEffect(() => {
    if (isPlayingRef.current && intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = window.setInterval(() => {
        if (!gridRef.current) initGrid();
        gridRef.current = simulate(gridRef.current, rule);

        setGeneration((g) => g + 1);
        drawGrid();
      }, speed);
    }
  }, [speed, rule, gridLines, zoom]);

  useEffect(() => {
    if (funcRef) {
      funcRef.current = {
        randomize,
        clear,
        play,
        pause,
        isPlaying,
        step,
        getGeneration,
        getAliveCount,
        loadPattern,
      };
    }
  }, [
    randomize,
    clear,
    play,
    pause,
    isPlaying,
    step,
    getGeneration,
    getAliveCount,
    loadPattern,
  ]);

  useEffect(() => {
    return () => pause();
  }, [pause]);

  useEffect(() => {
    if (!canvasRef.current) return;

    const updateDimensions = () => {
      const { clientWidth, clientHeight } = canvasRef.current!.parentElement!;
      const cols = Math.max(1, Math.floor(clientWidth / cellSize));
      const rows = Math.max(1, Math.floor(clientHeight / cellSize));
      setDimensions({ rows, cols });
      // gridRef.current = Array.from({ length: rows }, () => Array(cols).fill(0));
    };

    updateDimensions();

    const resizeObserver = new ResizeObserver(updateDimensions);
    resizeObserver.observe(canvasRef.current.parentElement!);

    return () => resizeObserver.disconnect();
  }, [zoom, gridLines]);

  useEffect(() => {
    if (!gridRef.current || gridRef.current.length !== dimensions.rows) {
      initGrid();
    }
  }, [dimensions]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = dimensions.cols * cellSize;
    canvas.height = dimensions.rows * cellSize;

    function draw() {
      if (!ctx || !canvas) return;
      ctx.fillStyle = deadColor;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const grid = gridRef.current;
      if (grid) {
        for (let r = 0; r < grid.length; r++) {
          for (let c = 0; c < grid[r].length; c++) {
            if (grid[r][c]) {
              ctx.fillStyle = aliveColor;
              ctx.fillRect(c * cellSize, r * cellSize, cellSize, cellSize);
            }
          }
        }

        if (hoverPosRef.current) {
          const { r, c } = hoverPosRef.current;
          if (!grid[r]?.[c]) {
            ctx.fillStyle = hoverColor;
            ctx.fillRect(c * cellSize, r * cellSize, cellSize, cellSize);
          }
        }
      }

      if (gridLines) {
        ctx.strokeStyle = "#1f2933";
        ctx.lineWidth = 0.5;
        for (let r = 0; r <= dimensions.rows; r++) {
          ctx.beginPath();
          ctx.moveTo(0, r * cellSize);
          ctx.lineTo(canvas.width, r * cellSize);
          ctx.stroke();
        }
        for (let c = 0; c <= dimensions.cols; c++) {
          ctx.beginPath();
          ctx.moveTo(c * cellSize, 0);
          ctx.lineTo(c * cellSize, canvas.height);
          ctx.stroke();
        }
      }
    }

    draw();
  }, [dimensions, gridLines]);

  function setCell(r: number, c: number) {
    if (!gridRef.current) initGrid();
    if (!gridRef.current) return;
    if (!gridRef.current[r]) return;
    gridRef.current[r][c] = drawValue;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.fillStyle = drawValue ? aliveColor : deadColor;
    ctx.fillRect(c * cellSize, r * cellSize, cellSize, cellSize);
  }

  function getCellCoords(e: React.MouseEvent) {
    const canvas = canvasRef.current;
    if (!canvas) return null;
    const rect = canvas.getBoundingClientRect();
    const c = Math.floor((e.clientX - rect.left) / cellSize);
    const r = Math.floor((e.clientY - rect.top) / cellSize);
    if (r >= 0 && r < dimensions.rows && c >= 0 && c < dimensions.cols) {
      return { r, c };
    }
    return null;
  }

  function handleMouseDown(e: React.MouseEvent) {
    const coords = getCellCoords(e);
    if (!coords) return;
    if (!gridRef.current) initGrid();
    if (!gridRef.current) return;
    const currentValue = gridRef.current[coords.r]?.[coords.c] || 0;
    setDrawValue(currentValue ? 0 : 1);
    setIsDrawing(true);
    setCell(coords.r, coords.c);
  }

  function handleMouseMove(e: React.MouseEvent) {
    const coords = getCellCoords(e);
    if (!coords) return;

    const { r, c } = coords;
    if (!gridRef.current) initGrid();
    const grid = gridRef.current;
    if (!grid) return;
    const prevHover = hoverPosRef.current;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    if (prevHover && !grid[prevHover.r]?.[prevHover.c]) {
      ctx.fillStyle = deadColor;
      ctx.fillRect(
        prevHover.c * cellSize,
        prevHover.r * cellSize,
        cellSize,
        cellSize,
      );
    }

    if (!grid[r]?.[c]) {
      hoverPosRef.current = coords;
      if (!isDrawing) {
        ctx.fillStyle = hoverColor;
        ctx.fillRect(c * cellSize, r * cellSize, cellSize, cellSize);
      }
    }

    if (isDrawing) {
      setCell(r, c);
    }
  }

  function handleMouseLeave() {
    const prevHover = hoverPosRef.current;
    if (prevHover) {
      const canvas = canvasRef.current;
      if (canvas) {
        const ctx = canvas.getContext("2d");
        if (ctx) {
          ctx.fillStyle = deadColor;
          ctx.fillRect(
            prevHover.c * cellSize,
            prevHover.r * cellSize,
            cellSize,
            cellSize,
          );
        }
      }
    }
    hoverPosRef.current = null;
  }
  function handleMouseUp() {
    setIsDrawing(false);
  }

  useEffect(() => {
    window.addEventListener("mouseup", handleMouseUp);
    return () => window.removeEventListener("mouseup", handleMouseUp);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="w-full h-full"
      style={{ display: "block" }}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    />
  );
}
