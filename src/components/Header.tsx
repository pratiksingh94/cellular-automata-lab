import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="px-6 py-4 border-b border-border">
      <nav className="flex items-center justify-between">
        <Link to="/" className="text-accent hover:text-accent-soft transition-colors">Cellular Automata Lab</Link>
        <span className="text-text-muted text-xs">Press ? for shortcuts</span>
      </nav>
    </header>
  )
}