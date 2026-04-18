import { Link } from "react-router-dom";
import Grid from "../components/Grid";

export default function Home() {
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
        <div className="w-full h-[600px] bg-panel border border-border rounded-lg flex items-center justify-center">
          <Grid/>
        </div>
      </div>
    </div>
  )
}