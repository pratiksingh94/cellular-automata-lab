import { Link } from "react-router-dom";

export default function WhatTheHell() {
  return (
    <div className="flex-1 px-6 py-16 max-w-2xl mx-auto">
      <Link
      to="/"
      className="text-accent hover:text-accent-soft transition-colors mb-8 inline-block"
      >
        ← back
      </Link>

      <h1 className="text-3xl font-bold text-text mb-6">Cellular Automata</h1> 

      <div className="ext-text-muted space-y-6 leading-relaxed">
        <section>
          <h2 className="text-xl font-semibold text-accent mb-2">What is this?</h2>
          <p>Cellular Automata (CA) are mathemstical models where a grid of cells evolves over time based on some simple  rules. Each cell is either alive or dead, and its fate depends on how many neighbors it has.</p>
          <p className="mt-2">
            The most famous is Conway's Game of Life (B3/S23), cells born with 3 neighbours, surive with 2 or 3. From these simple rules emerge incredibibly complex patterns like spaceships, oscillators, etc :3
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-accent mb-2">
            How to enjoy it
          </h2>
          <p>
            The best way to experience celullar automata is to <strong>try every rule</strong> and watch what happens:
          </p>
          <ol className="list-decimal list-inside space-y-3 mt-3">
            <li>Start on home page</li>
            <li>Click the Rule dropdown and select a rule</li>
            <li>Press play and watch the patterns</li>
            <li>Try different rules and draw on grid yourself and see what happens when played</li>
          </ol>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-accent mb-2">Try the patterns</h2>
          <p>
            Each rule has pre-loaded patterns (recommended ones show as buttons!). Load them and see what they do, different rules have different types ofpatterns, some rules dont tho :( I will add them in future updates!
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-accent mb-2">Custom rules</h2>
          <p>
            Click 'Custom' to enter your own B#/S# notation rule. 
          </p>
        </section>
      </div>
    </div>
  );
}
