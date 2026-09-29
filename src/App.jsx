import React, { useState, useEffect } from 'react';

const DAILY_GOAL = 4500; // 4.5 Liters

const MOTIVATIONAL_QUOTES = [
  "Small sips lead to big energy!",
  "Hydration is the secret to glowing health.",
  "Your body is 60% water — keep it replenished!",
  "Stay fresh, sharp, and revitalized.",
  "A sip now keeps fatigue away!",
  "Water is your body's cleanest fuel."
];

// Clean inline SVG Icons (No external dependencies needed)
const DropletIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" stroke="none">
    <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" />
  </svg>
);

const ResetIcon = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
  </svg>
);

const PlusIcon = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
  </svg>
);

const SparkleIcon = ({ className }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 2l2.4 7.2L22 12l-7.6 2.8L12 22l-2.4-7.2L2 12l7.6-2.8z" />
  </svg>
);

const CheckIcon = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
  </svg>
);

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
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#030712',
      color: '#f8fafc',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '24px 16px',
      fontFamily: 'system-ui, -apple-system, sans-serif'
    }}>
      {/* Top Header */}
      <header style={{ width: '100%', maxWidth: '380px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{
            width: '42px',
            height: '42px',
            borderRadius: '14px',
            backgroundColor: 'rgba(139, 92, 246, 0.15)',
            border: '1px solid rgba(139, 92, 246, 0.3)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#a78bfa'
          }}>
            <DropletIcon className="w-5 h-5" />
          </div>
          <div>
            <h1 style={{ margin: 0, fontSize: '1.25rem', fontWeight: '700' }}>Oasis Hydration</h1>
            <p style={{ margin: 0, fontSize: '0.8rem', color: '#c4b5fd', opacity: 0.8 }}>Daily Goal: {litersGoal} L</p>
          </div>
        </div>
        <button
          onClick={resetWater}
          style={{
            padding: '10px',
            borderRadius: '12px',
            background: '#111827',
            border: '1px solid #1f2937',
            color: '#9ca3af',
            cursor: 'pointer'
          }}
          title="Reset daily log"
        >
          <ResetIcon className="w-4 h-4" />
        </button>
      </header>

      {/* Circular Progress Gauge */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', maxWidth: '380px' }}>
        <div style={{
          position: 'relative',
          width: '260px',
          height: '260px',
          borderRadius: '50%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'radial-gradient(circle, rgba(139,92,246,0.15) 0%, rgba(15,23,42,0.8) 100%)',
          border: '2px solid rgba(139, 92, 246, 0.3)',
          boxShadow: '0 0 40px rgba(139, 92, 246, 0.2)'
        }}>
          <span style={{
            fontSize: '3.5rem',
            fontWeight: '900',
            background: 'linear-gradient(to right, #ddd6fe, #a78bfa, #c084fc)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>
            {progressPercent}%
          </span>
          <span style={{ fontSize: '0.95rem', fontWeight: '600', color: '#c4b5fd', marginTop: '4px' }}>
            {litersLogged} / {litersGoal} Liters
          </span>
          {intake >= DAILY_GOAL && (
            <span style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '4px',
              fontSize: '0.75rem',
              color: '#34d399',
              marginTop: '10px',
              background: 'rgba(6, 78, 59, 0.5)',
              padding: '4px 10px',
              borderRadius: '9999px',
              border: '1px solid rgba(16, 185, 129, 0.3)'
            }}>
              <CheckIcon className="w-3.5 h-3.5" /> Goal Reached!
            </span>
          )}
        </div>

        {/* Motivational Quote Banner */}
        <div style={{
          marginTop: '28px',
          width: '100%',
          padding: '14px 16px',
          borderRadius: '16px',
          background: 'linear-gradient(135deg, rgba(76, 29, 149, 0.2) 0%, rgba(15, 23, 42, 0.6) 100%)',
          border: '1px solid rgba(139, 92, 246, 0.2)',
          display: 'flex',
          alignItems: 'center',
          gap: '12px'
        }}>
          <SparkleIcon className="w-5 h-5 text-violet-400" />
          <p style={{ margin: 0, fontSize: '0.85rem', color: '#e9d5ff', fontStyle: 'italic' }}>
            "{MOTIVATIONAL_QUOTES[quoteIndex]}"
          </p>
        </div>
      </div>

      {/* Quick Add Buttons */}
      <footer style={{ width: '100%', maxWidth: '380px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <p style={{ margin: 0, fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: '#94a3b8', textAlign: 'center', fontWeight: '600' }}>
          Quick Add
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px' }}>
          {[
            { ml: 250, label: 'Cup' },
            { ml: 500, label: 'Bottle' },
            { ml: 1000, label: 'Jug' },
          ].map((item) => (
            <button
              key={item.ml}
              onClick={() => addWater(item.ml)}
              style={{
                padding: '14px 8px',
                borderRadius: '16px',
                background: 'rgba(139, 92, 246, 0.12)',
                border: '1px solid rgba(139, 92, 246, 0.25)',
                color: '#ffffff',
                cursor: 'pointer',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '2px'
              }}
            >
              <PlusIcon className="w-4 h-4 text-violet-400" />
              <span style={{ fontWeight: '700', fontSize: '0.95rem' }}>{item.ml} ml</span>
              <span style={{ fontSize: '0.7rem', color: '#c4b5fd', opacity: 0.8 }}>{item.label}</span>
            </button>
          ))}
        </div>
      </footer>
    </div>
  );
}
