import React, { useState, useEffect } from 'react';
import { Droplet, Plus, RotateCcw, Bell, Award, Sparkles, CheckCircle2 } from 'lucide-react';
import confetti from 'canvas-confetti';

const DAILY_GOAL = 4500; // 4.5 Liters in ml

const MOTIVATIONAL_QUOTES = [
  "Small sips lead to big energy!",
  "Hydration is the secret to glowing health.",
  "Your body is 60% water — keep it replenished!",
  "Stay fresh, sharp, and revitalized.",
  "A sip now keeps fatigue away!",
  "Water is your body's cleanest fuel."
];

export default function App() {
  const [intake, setIntake] = useState(() => {
    const saved = localStorage.getItem('oasis_intake');
    const savedDate = localStorage.getItem('oasis_date');
    const today = new Date().toDateString();
    if (savedDate === today && saved) {
      return Number(saved);
    }
    return 0;
  });

  const [quoteIndex, setQuoteIndex] = useState(0);

  useEffect(() => {
    localStorage.setItem('oasis_intake', intake);
    localStorage.setItem('oasis_date', new Date().toDateString());
    if (intake >= DAILY_GOAL) {
      confetti({ particleCount: 80, spread: 60, origin: { y: 0.7 } });
    }
  }, [intake]);

  useEffect(() => {
    const interval = setInterval(() => {
      setQuoteIndex((prev) => (prev + 1) % MOTIVATIONAL_QUOTES.length);
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  const addWater = (amount) => {
    setIntake((prev) => Math.min(prev + amount, DAILY_GOAL + 1000));
  };

  const resetWater = () => {
    if (window.confirm("Reset today's hydration log?")) {
      setIntake(0);
    }
  };

  const progressPercent = Math.min(Math.round((intake / DAILY_GOAL) * 100), 100);
  const litersLogged = (intake / 1000).toFixed(2);
  const litersGoal = (DAILY_GOAL / 1000).toFixed(1);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col items-center justify-between p-5 select-none font-sans">
      {/* Top Header */}
      <header className="w-full max-w-sm flex items-center justify-between pt-2">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-2xl bg-violet-600/20 border border-violet-500/30 flex items-center justify-center text-violet-400">
            <Droplet className="w-6 h-6 fill-violet-400" />
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-tight text-white">Oasis Hydration</h1>
            <p className="text-xs text-violet-300/70 font-medium">Daily Goal: {litersGoal} L</p>
          </div>
        </div>
        <button
          onClick={resetWater}
          className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-400 hover:text-rose-400 transition-colors"
          title="Reset daily log"
        >
          <RotateCcw className="w-4 h-4" />
        </button>
      </header>

      {/* Center Circular Progress */}
      <div className="my-auto flex flex-col items-center w-full max-w-sm">
        <div className="relative w-64 h-64 rounded-full flex items-center justify-center p-3 bg-gradient-to-b from-violet-600/20 to-purple-900/10 border border-violet-500/20 shadow-[0_0_50px_rgba(139,92,246,0.15)]">
          {/* Animated Liquid Background Ring */}
          <div
            className="absolute inset-2 rounded-full border-4 border-violet-500/10 transition-all duration-700"
            style={{
              background: `radial-gradient(circle, rgba(139,92,246,0.12) 0%, rgba(109,40,217,0.05) 100%)`,
            }}
          />

          <div className="z-10 flex flex-col items-center text-center">
            <span className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-violet-200 via-purple-300 to-violet-400 tracking-tight">
              {progressPercent}%
            </span>
            <span className="text-sm font-semibold text-violet-300/80 mt-1">
              {litersLogged} / {litersGoal} Liters
            </span>
            {intake >= DAILY_GOAL && (
              <span className="inline-flex items-center gap-1 text-xs text-emerald-400 font-medium mt-2 bg-emerald-950/50 px-2.5 py-1 rounded-full border border-emerald-500/30">
                <CheckCircle2 className="w-3.5 h-3.5" /> Target Achieved!
              </span>
            )}
          </div>
        </div>

        {/* Motivation Card */}
        <div className="mt-6 w-full p-4 rounded-2xl bg-gradient-to-r from-violet-950/40 to-slate-900/40 border border-violet-800/20 flex items-center gap-3">
          <Sparkles className="w-5 h-5 text-violet-400 flex-shrink-0" />
          <p className="text-xs text-violet-200/90 italic leading-snug">
            "{MOTIVATIONAL_QUOTES[quoteIndex]}"
          </p>
        </div>
      </div>

      {/* Quick Add Intake Actions */}
      <footer className="w-full max-w-sm pb-4 flex flex-col gap-3">
        <p className="text-xs uppercase tracking-wider text-slate-400 font-semibold text-center">
          Quick Log
        </p>
        <div className="grid grid-cols-3 gap-2.5">
          {[
            { ml: 250, label: 'Cup' },
            { ml: 500, label: 'Bottle' },
            { ml: 1000, label: 'Jug' },
          ].map((item) => (
            <button
              key={item.ml}
              onClick={() => addWater(item.ml)}
              className="py-3 px-2 rounded-2xl bg-violet-600/15 hover:bg-violet-600/25 border border-violet-500/25 hover:border-violet-400/40 transition-all flex flex-col items-center justify-center active:scale-95"
            >
              <Plus className="w-4 h-4 text-violet-400 mb-0.5" />
              <span className="font-bold text-sm text-white">{item.ml} ml</span>
              <span className="text-[10px] text-violet-300/70">{item.label}</span>
            </button>
          ))}
        </div>
      </footer>
    </div>
  );
}
