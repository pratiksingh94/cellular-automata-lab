import { Link } from "react-router-dom";

export default function WhatTheHell() {
  return (
    <div className="flex-1 px-6 py-16 max-w-2xl mx-auto">
      <Link to="/" className="text-accent hover:text-accent-soft transition-colors mb-8 inline-block">
      ← Back
      </Link>
      <h1 className="text-3xl font-bold text-text mb-6">What the hell is this?</h1>
      <div className="text-text-muted space-y-4 leading-relaxed">
        <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Tempora ab totam cum corporis SIX SEVEN incidunt impedit minima nesciunt fugit, alias sint nemo, ullam eos tenetur facere ut nostrum optio enim? Sint, eum rerum.</p>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis THOSE WHO KNOW SKULL EMOJI quaerat tempora libero accusamus quasi esse dolorum reprehenderit earum, quae natus, explicabo nulla, animi corporis.</p>
      </div>
    </div>
  )
}