import type { Pattern } from "../types";

export default function RecommendedPatterns({patterns, onSelect}: { patterns: Pattern[], onSelect: (pattern: Pattern) => void; }) {
  if(patterns.length === 0) return null;

  return (
    <div className="flex flex-wrap gap-2 bg-panel border border-border rounded-md px-3 py-2">
      <span className="text-text-muted text-sm">Recommended:</span>
      <div className="flex flex-wrap gap-1">
        {patterns.map(p => (
          <button
          key={p.name}
          onClick={() => onSelect(p)}
          className="px-2 py-1 text-xs bg-accent text-bg rounded cursor-pointer hover:opacity-80"
          >
            {p.name}
          </button>
        ))}
      </div>
    </div>
  )
}