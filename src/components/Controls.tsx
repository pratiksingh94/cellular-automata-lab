import { useState } from "react";
import { presets, type Rule } from "../rules";
import type { GridFunctions } from "./Grid"


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
}

export default function Controls({ gridRef, rule, onRuleChange, speed, onSpeedChange, isPlaying, zoom, onZoomChange }: Props) {
  const [selectedPreset, setSelectedPreset] = useState(rule.name);

  const handlePresetChange = (name: string) => {
    setSelectedPreset(name);

    const preset = presets.find(p => p.name === name);
    if(preset) {
      onRuleChange(preset);
    }
  }


  return (
    <div className="flex flex-wrap gap-3 items-center mb-4">
      <select
      value={selectedPreset}
      onChange={e => handlePresetChange(e.target.value)}
      className="px-3 py-2 bg-panel border border-border rounded-md text-text cursor-pointer"
      >
        {presets.map(p => (
          <option key={p.name} value={p.name}>
            {p.name}
          </option>
        ))}
      </select>

      <div className="h-6 w-px bg-border"/>

      <button
      onClick={() => isPlaying ? gridRef.current?.pause() : gridRef.current?.play()}
      className="px-4 py-2 bg-accent text-bg rounded-md font-medium cursor-pointer"
      >{isPlaying ? "Pause" : "Play"}</button>

      <button
      onClick={() => gridRef.current?.step()}
      className="px-4 py-2 bg-panel border border-border rounded-md text-text hover:bg-panel-2 transition-colors cursor-pointer"
      >
        Step
      </button>

      <div className="h-6 w-px bg-border"/>

      <div className="flex gap-2 items-center">
        <span className="text-text-muted text-sm">Speed:</span>
        <input
        type="range"
        min="50"
        max="500"
        value={speed}
        onChange={e => onSpeedChange(Number(e.target.value))}
        className="w-24 cursor-pointer"
        />
        <span className="text-text-muted text-sm w-12">{speed}ms</span>
      </div>

      <div className="h-6 w-px bg-border"/>

      <div className="flex gap-1 items-center">
        <span className="text-text-muted text-sm mr-1">Zoom:</span>
        {zoomLevels.map(z => (
          <button
          key={z}
          onClick={() => onZoomChange(z)}
          className={`px-2 py-1 text-xs rounded cursor-pointer ${zoom===z ? "bg-accent text-bg font-medium" : "bg-panel border border-border text-text hover:bg-panel-2"}`}
          >{z * 100}%</button>
        ))}
      </div>

      <div className="h-6 w-px bg-border"/>

      <button
      onClick={() => gridRef.current?.clear()}
      className="px-3 py-2 bg-panel border border-border rounded-md text-text hover:bg-panel-2 transition-colors cursor-pointer"
      >Clear</button>
      <button
      onClick={() => gridRef.current?.randomize(0.2)}
      className="px-3 py-2 bg-panel border border-border rounded-md text-text hover:bg-panel-2 transition-colors cursor-pointer"
      >Random 20%</button>
      <button
      onClick={() => gridRef.current?.randomize(0.5)}
      className="px-3 py-2 bg-panel border border-border rounded-md text-text hover:bg-panel-2 transition-colors cursor-pointer"
      >Random 50%</button>
    </div>
  )
}