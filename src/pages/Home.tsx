import { Link } from "react-router-dom";
import Grid, { type GridFunctions } from "../components/Grid";
import { useEffect, useRef, useState } from "react";
import { presets, type Rule } from "../rules";
import Controls from "../components/Controls";

export default function Home() {
  const gridRef = useRef<GridFunctions>(null);

  const [rule, setRule] = useState<Rule>(presets[0]);
  const [speed, setSpeed] = useState(100);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      if(gridRef.current) {
        setIsPlaying(gridRef.current.isPlaying());
      }
    }, 100);

    return () => clearInterval(interval);
  })

  return (
    <div className="flex-1 flex flex-col items-center justify-start pt-16 px-6">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bond text-text mb-2">Cellular Automata Lab</h1>
        <p className="text-text-muted">
          Interactive Cellular Automata Playground{" "}
          <Link to="/whatthehell" className="text-accent hover:text-accent-soft transition-colors">| what is this?</Link>
        </p>
      </div>

      <div className="flex-1 w-full max-w-5xl">
        <Controls
        gridRef={gridRef}
        rule={rule}
        onRuleChange={setRule}
        speed={speed}
        onSpeedChange={setSpeed}
        isPlaying={isPlaying}
        />
        <div className="w-full h-[600px] bg-panel border border-border rounded-lg overflow-hidden">
          <Grid funcRef={gridRef} rule={rule} speed={speed}/>
        </div>
      </div>
    </div>
  )
}