import { useState, useMemo } from "react";
import { presets, type Rule } from "../rules";
import type { GridFunctions } from "./Grid"
import { getPatternsForRule } from "../patterns"


const zoomLevels = [0.5, 1, 1.5, 2];

export type Props = {
  gridRef: React.RefObject<GridFunctions | null>;
  rule: Rule;
  onRuleChange: (rule: Rule) => void;
  speed: number;
  onSpeedChange: (speed: number) => void;
  isPlaying: boolean;
  zoom: number;
  onZoomChange: (zoom: number) => void;
  gridLines?: boolean;
  onGridLinesChange?: (show: boolean) => void;
}

export default function Controls({ gridRef, rule, onRuleChange, speed, onSpeedChange, isPlaying, zoom, onZoomChange, gridLines, onGridLinesChange }: Props) {
  
  const [selectedPreset, setSelectedPreset] = useState(rule.name);
  const [selectedPattern, setSelectedPattern] = useState("");

  const rulePatterns = useMemo(() => getPatternsForRule(rule.name), [rule.name])

  const handlePresetChange = (name: string) => {
    setSelectedPreset(name);
    setSelectedPattern("")


    const preset = presets.find(p => p.name === name);
    if(preset) {
      onRuleChange(preset);
    }
  }

  const handlePatternChange = (name: string) => {
    setSelectedPattern(name);
    if(name === "") return;
    const pattern = rulePatterns.find(p => p.name === name);
    if(pattern) {
      gridRef.current?.loadPattern(pattern.data)
    }
  }


  return (
    <div className="flex flex-wrap gap-3 mb-4">

      {/* rule select  */}
      <div className="flex items-center gap-2 bg-panel border border-border rounded-md px-3 py-2">
        <span className="text-text-muted text-sm">Rule:</span>
        <select
        value={selectedPreset}
        onChange={e => handlePresetChange(e.target.value)}
        className="bg-panel text-text cursor-pointer outline-none"
        >
          {presets.map(p => (
            <option key={p.name} value={p.name}>
              {p.name}
            </option>
          ))}
        </select>
      </div>

      {/* pattern selector  */}
      <div className="flex flex-col gap-2 bg-panel border border-border rounded-md px-3 py-2">
        <div className="flex items-center gap-2">
          <span className="text-text-muted text-sm">Pattern:</span>
          <select
          value={selectedPattern}
          onChange={e => handlePatternChange(e.target.value)}
          className="bg-panel text-text cursor-pointer outline-none"
          >
            <option value="">Select...</option>

            <optgroup label="Still Life">
              {rulePatterns.filter(p => p.category === "still-life").map(p => (
                <option key={p.name} value={p.name}>{p.name}</option>
              ))}
            </optgroup>

            <optgroup label="Oscillators">
              {rulePatterns.filter(p => p.category === "oscillator").map(p => (
                <option key={p.name} value={p.name}>{p.name}</option>
              ))}
            </optgroup>

            <optgroup label="Spaceships">
              {rulePatterns.filter(p => p.category === "spaceship").map(p => (
                <option key={p.name} value={p.name}>{p.name}</option>
              ))}
            </optgroup>

            <optgroup label="Guns">
              {rulePatterns.filter(p => p.category === "gun").map(p => (
                <option key={p.name} value={p.name}>{p.name}</option>
              ))}
            </optgroup>
          </select>
        </div>
        {selectedPattern && (
          <div className="text-text-muted text-xs">
            {rulePatterns.find(p => p.name === selectedPattern)?.description}
          </div>
        )}
      </div>

      {/* controlling btns  */}
      <div className="flex items-center gap-2 bg-panel border border-border rounded-md px-3 py-2">
        <button
        onClick={() => isPlaying ? gridRef.current?.pause() : gridRef.current?.play()}
        className="px-3 py-1 bg-accent text-bg rounded font-medium cursor-pointer"
        >
          {isPlaying ? "Pause" : "Play"}
        </button>

        <button
        onClick={() => gridRef.current?.step()}
        className="px-3 py-1 bg-panel-2 text-text rounded cursor-pointer"
        >Step</button>
      </div>

      {/* zoom btns */}
      <div className="flex items-center gap-2 bg-panel border-border rounded-md px-3 py-2">
        <span className="text-text-muted text-sm">Zoom:</span>
        <div className="flex gap-1">
          {zoomLevels.map(z => (
            <button
            key={z}
            onClick={() => onZoomChange(z)}
            className={`px-2 py-1 text-xs rounded cursor-pointer ${zoom === z ? "bg-accent text-bg font-medium" : "bg-panel-2 text-text"}`}
            >{z * 100}%</button>
          ))}
        </div>
      </div>

      {/* grid toggle  */}
      {onGridLinesChange && (
        <div className="flex items-center gap-2 bg-panel border border-border rounded-md px-3 py-2">
          <button
          onClick={() => onGridLinesChange(!gridLines)}
          className={`px-3 py-1 text-sm rounded cursor-pointer ${gridLines ? "bg-accent text-bg font-medium" : "bg-panel-2 text-text"}`}
          >
            Grid
          </button>
        </div>
      )}

      {/* speed  slider*/}
      {/* slide for your homies twin  */}
      <div className="flex items-center gap-2 bg-panel border border-border rounded-md px-3 py-2">
        <span className="text-text-muted text-sm">Speed:</span>
        <input
        type="range"
        min="50"
        max="500"
        value={speed}
        onChange={e => onSpeedChange(Number(e.target.value))}
        className="w-24 cursor-pointer"
        />
        <span className="text-text-muted text-sm w-10">{speed}ms</span>
      </div>

      {/* grid control buttons  */}
      <div className="flex items-center gap-2 bg-panel border border-border rounded-md px-3 py-2">
        <button
        onClick={() => gridRef.current?.clear()}
        className="px-3 py-1 bg-panel-2 text-text rounded cursor-pointer"
        >
          Clear
        </button>

        <button
        onClick={() => gridRef.current?.randomize(0.2)}
        className="px-3 py-1 bg-panel-2 text-text rounded cursor-pointer"
        >
          Random 20%
        </button>

        <button
        onClickCapture={() => gridRef.current?.randomize(0.5)}
        className="px-3 py-1 bg-panel-2 text-text rounded cursor-pointer"
        >
          Random 50%
        </button>
      </div>
    </div>
  )
}