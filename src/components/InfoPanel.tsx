import type { Rule } from "../rules";

export type Props = {
  rule: Rule;
  generation: number;
  isPlaying: boolean;
  aliveCount: number;
}


export default function InfoPanel({ rule, generation, isPlaying, aliveCount }: Props) {
  return (
    <div className="flex items-center gap-6 py-3 px-4 bg-panel border border-border rounded-lg mt-4">

      <div className="flex items-center gap-2">
        <span className="text-text-muted text-sm">Generation:</span>
        <span className="text-text font-medium">
          {generation}
        </span>
      </div>

      <div className="h-4 w-px bg-border"/>

      <div className="flex items-center gap-2">
        <span className="text-text-muted text-sm">Alive:</span>
        <span className="text-green-400 font-medium">{aliveCount}</span>
      </div>

      <div className="h-4 w-px bg-border"/>

      <div className="flex items-center gap-2">
        <span className="text-text-muted text-sm">Rule:</span>
        <span className="text-accent font-medium">{rule.name}</span>
      </div>

      <div className="h-4 w-px bg-border"/>

      <div className="flex items-center gap-2">
        <span className="text-text text-sm">
        <span className="text-text-muted text-sm">Notation:</span>
          B{rule.b.join("")}/S{rule.s.join("")}
        </span>
      </div>

      <div className="h-4 w-px bg-border"/>

      <div className="flex items-center gap-2">
        <span className="text-text-muted text-sm">Status:</span>
        <span className={`font-medium ${isPlaying ? "text-green-400" : "text-text-muted"}`}>
          {isPlaying ? "Running" : "Paused"}
        </span>
      </div>

    </div>
  )
}
