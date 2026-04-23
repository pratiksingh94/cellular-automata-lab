import { Link } from "react-router-dom";
import Grid, { type GridFunctions } from "../components/Grid";
import { useCallback, useEffect, useRef, useState } from "react";
import { presets, type Rule } from "../rules";
import Controls from "../components/Controls";
import InfoPanel from "../components/InfoPanel";
import ShortcutsModal from "../components/ShortcutsModal";
import { patterns } from "../patterns";

export default function Home() {
  const gridRef = useRef<GridFunctions>(null);

  const [rule, setRule] = useState<Rule>(presets[0]);
  const [speed, setSpeed] = useState(100);
  const [isPlaying, setIsPlaying] = useState(false);
  const [generation, setGeneration] = useState(0);
  const [aliveCount, setAliveCount] = useState(0);
  const [showShortcuts, setShowShortcuts] = useState(false);
  const [zoom, setZoom] = useState(0.5);
  const [gridLines, setGridLines] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      if(gridRef.current) {
        setIsPlaying(gridRef.current.isPlaying());
        setGeneration(gridRef.current.getGeneration());
        setAliveCount(gridRef.current.getAliveCount())
      }
    }, 100);

    return () => clearInterval(interval);
  })

  const handleRuleChange = (newRule: Rule) => {
    setRule(newRule);
    if(!isPlaying) {
      if(newRule.usePattern && newRule.recommendedPattern) {
        const pattern = patterns.find(p => p.name === newRule.recommendedPattern);
        if(pattern) {
          gridRef.current?.loadPattern(pattern.data)
        }
      } else if(newRule.density) {
        gridRef.current?.randomize(newRule.density)
      }
    }
  }


  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if(showShortcuts && e.key !== "Escape") return;
    if(e.target instanceof HTMLInputElement || e.target instanceof HTMLSelectElement) return;

    switch(e.key) {
      case " ":
        e.preventDefault();
        if(isPlaying) {
          gridRef.current?.pause()
        } else {
          gridRef.current?.play()
        }
        break;
      case 'n':
      case "ArrowRight":
        gridRef.current?.step();
        break;
      case "c":
        gridRef.current?.clear();
        break;
      case "r":
        gridRef.current?.randomize(0.2);
        break;
      case "h":
        gridRef.current?.randomize(0.5);
        break;
      case "t":
        gridRef.current?.randomize(0.1);
        break;
      case "g":
        setGridLines(prev => !prev);
        break;
      case "+":
      case "=":
        setSpeed(s => Math.max(50, s - 50));
        break;
      case "-":
        setSpeed(s => Math.min(500, s + 50));
        break;
      case "?":
        setShowShortcuts(true);
        break;
      case "Escape":
        if(showShortcuts) {
          setShowShortcuts(false);
        } /* else if(isPlaying) {
        //   gridRef.current?.pause();
        // } */
        break;
    }
  }, [isPlaying,showShortcuts, gridLines])

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  return (
    <div className="flex-1 flex flex-col items-center justify-start pt-16 px-6">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bond text-text mb-2">Cellular Automata Lab</h1>
        <p className="text-text-muted">
          Interactive Cellular Automata Playground{" "}
          <Link to="/whatthehell" className="text-accent hover:text-accent-soft transition-colors">| what is this? (click FT people!)</Link>
        </p>
      </div>

      <div className="flex-1 w-full max-w-5xl">
        <Controls
        gridRef={gridRef}
        rule={rule}
        onRuleChange={handleRuleChange}
        speed={speed}
        onSpeedChange={setSpeed}
        isPlaying={isPlaying}
        // generation={generation}
        zoom={zoom}
        onZoomChange={setZoom}
        gridLines={gridLines}
        onGridLinesChange={setGridLines}
        />
        <div className="w-full h-[600px] bg-panel border border-border rounded-lg overflow-hidden">
          <Grid funcRef={gridRef} rule={rule} speed={speed} zoom={zoom} gridLines={gridLines}/>
        </div>

        <InfoPanel rule={rule} generation={generation} isPlaying={isPlaying} aliveCount={aliveCount}/>
      </div>

      {showShortcuts && <ShortcutsModal onClose={() => setShowShortcuts(false)}/>}
    </div>
  )
}