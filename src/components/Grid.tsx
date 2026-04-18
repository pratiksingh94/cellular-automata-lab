import { useRef, useEffect, useState } from "react";

export default function Grid() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [dimensions, setDimensions] = useState({ rows: 30, cols: 50 });
  const [isDrawing, setIsDrawing] = useState(false);
  const [drawValue, setDrawValue] = useState(1);
  const gridRef = useRef<number[][]>([]);
  const cellSize = 10;

  const aliveColor = "#88ff00";
  const deadColor = "#11161c";
  const hoverColor = "rgba(136, 255, 0, 0.3)";
  const hoverPosRef = useRef<{ r: number; c: number } | null>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    const updateDimensions = () => {
      const { clientWidth, clientHeight } = canvasRef.current!.parentElement!;
      const cols = Math.max(1, Math.floor(clientWidth / cellSize));
      const rows = Math.max(1, Math.floor(clientHeight / cellSize));
      setDimensions({ rows, cols });
      gridRef.current = Array.from({ length: rows }, () => Array(cols).fill(0));
    };

    updateDimensions();

    const resizeObserver = new ResizeObserver(updateDimensions);
    resizeObserver.observe(canvasRef.current.parentElement!);

    return () => resizeObserver.disconnect();
  }, []);

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

    draw();
  }, [dimensions]);

  function setCell(r: number, c: number) {
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
    const currentValue = gridRef.current[coords.r]?.[coords.c] || 0;
    setDrawValue(currentValue ? 0 : 1);
    setIsDrawing(true);
    setCell(coords.r, coords.c);
  }

  function handleMouseMove(e: React.MouseEvent) {
    const coords = getCellCoords(e);
    if (!coords) return;

    const { r, c } = coords;
    const grid = gridRef.current;
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
