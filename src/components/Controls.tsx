import { useState, useMemo } from "react";
import { parseRule, presets, type Rule } from "../rules";
import type { GridFunctions } from "./Grid"
import { getPatternsForRule, getRecommendedForRule } from "../patterns"
import type { Pattern } from "../types";
import RecommendedPatterns from "./RecommendedPatterns";


// const zoomLevels = [0.5, 1, 1.5, 2];

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

export default function Controls({ gridRef, rule, onRuleChange, speed, onSpeedChange, isPlaying, gridLines, onGridLinesChange }: Props) {
  
  const [selectedPreset, setSelectedPreset] = useState(rule.name);
  const [selectedPattern, setSelectedPattern] = useState("");

  const [customMode, setCustomMode] = useState(false);
  const [customInput, setCustomInput] = useState("");

  const rulePatterns = useMemo(() => getPatternsForRule(rule.name), [rule.name])
  const recommendedPatterns = useMemo(() => getRecommendedForRule(rule.name), [rule.name])

  const parsedCustomRule = useMemo(() => {
    if(!customInput) return null;
    return parseRule(customInput);
  }, [customInput])

  const customInputValid = customInput.trim() !== "" && parsedCustomRule !== null;
  const customInputError = customInput.trim() !== "" && parsedCustomRule === null;

  const handleSelectRecommend = (pattern: Pattern) => {
    setSelectedPattern(pattern.name);
    gridRef.current?.loadPattern(pattern.data)
  }

  const handlePresetChange = (name: string) => {
    setSelectedPreset(name);
    setSelectedPattern("")
    
    setCustomMode(false);
    setCustomInput("");

    const preset = presets.find(p => p.name === name);
    if(preset) {
      onRuleChange(preset);
    }
  }

  const handleCustomApply = () => {
    if(!customInputValid) return;
    gridRef.current?.clear();
    onRuleChange(parsedCustomRule!);
  }

  const handleCustomKeyDown = (e: React.KeyboardEvent) => {
    if(e.key === "Enter" && customInputValid) {
      handleCustomApply();
    }
  }

  const toggleCustomMode = () => {
    if(customMode) {
      setCustomMode(false);
      setCustomInput("");
    } else {
      setCustomMode(true);
      setCustomInput("");
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


  const categories = useMemo(() => {
    // meow
    const cats = new Set(rulePatterns.map(p => p.category));

    return Array.from(cats)
  }, [rulePatterns])

  const patternsByCategory = useMemo(() => {
    const grouped: Record<string, Pattern[]> = {};
    rulePatterns.forEach(p => {
      if(!grouped[p.category]) grouped[p.category] = [];
      grouped[p.category].push(p);
    })

    return grouped;
  }, [rulePatterns])


  return (
    <div className="flex flex-wrap gap-3 mb-4">

      {/* rule select  */}
      <div className="flex items-center gap-2 bg-panel border border-border rounded-md px-3 py-2">
        <span className="text-text-muted text-sm">Rule:</span>
        {!customMode ? (
          <>
          <select
          value={selectedPreset}
          onChange={e => handlePresetChange(e.target.value)}
          className="bg-panel text-text cursor-pointer outline-none"
          >
            {presets.map(p => (
              <option key={p.name} value={p.name}>{p.name}</option>
            ))}
          </select>
          <button
          onClick={toggleCustomMode}
          className="px-2 py-1 text-xs bg-panel-2 text-text-muted rounded cursor-pointer hover:text-text"
          title="Enter custom rule"
          >
            Custom
          </button>
          </>
        ) : (
          <>
          <input
          type="text"
          value={customInput}
          onChange={e => setCustomInput(e.target.value)}
          onKeyDown={handleCustomKeyDown}
          placeholder="B67/S41"
          className={`bg-transparent text-text outline-none px-2 py-1 border rounded w-28 ${customInputError ? "border-red-500" : customInputValid ? "border-green-500" : "border-border"}`}
          />
          <button
          onClick={handleCustomApply}
          disabled={!customInputValid}
          className={`px-2 py-1 text-xs rounded cursor-pointer ${customInputValid ? "bg-accent text-bg" : "bg-panel-2 text-text-muted cursor-not-allowed"}`}
          >
            Apply
          </button>
          {customInputError && (
            <span className="text-red-500 text-xs">Invalid format</span>
          )}
          <button
          onClick={toggleCustomMode}
          className="px-2 py-1 text-xs bg-panel-2 text-text-muted rounded cursor-pointer hover:text-text"
          title="Back to presets"
          >
            Presets
          </button>
          </>
        )}
      </div>

      {/* pattern selector  */}
      {(!customMode || rulePatterns.length > 0) && (
        <>
        <div className="flex flex-col gap-2 bg-panel border border-border rounded-md px-3 py-2">
          <div className="flex items-center gap-2">
            <span className="text-text-muted text-sm">Pattern:</span>
            <select
            value={selectedPattern}
            onChange={e => handlePatternChange(e.target.value)}
            className="bg-panel text-text cursor-pointer outline-none"
            >
              <option value="">Select...</option>
              {categories.map(cat => (
                <optgroup key={cat} label={cat.charAt(0).toUpperCase() + cat.slice(1).replace(/-/g, " ")}>
                  {patternsByCategory[cat]?.map( p => (
                    <option key={p.name} value={p.name}>{p.name}</option>
                  ))}
                </optgroup>
              ))}
            </select>
          </div>

          {selectedPattern && (
            <div className="text-text-muted text-xs">
              {rulePatterns.find(p => p.name === selectedPattern)?.description}
            </div>
          )}
        </div>

        <RecommendedPatterns
        patterns={recommendedPatterns}
        onSelect={handleSelectRecommend}
        />
        </>
      )}

      
      
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
      {/* <div className="flex items-center gap-2 bg-panel border-border rounded-md px-3 py-2">
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
      </div> */}

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