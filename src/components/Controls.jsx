import React from 'react';

export default function Controls({ canHit, canStand, canDeal, onHit, onStand, onDeal, onReset }) {
  return (
    <div className="flex flex-wrap items-center justify-center gap-3">
      <button
        onClick={onDeal}
        disabled={!canDeal}
        className={`px-4 py-2 rounded-md font-semibold transition-colors shadow-sm border border-emerald-700/40 ${
          canDeal ? 'bg-emerald-600 hover:bg-emerald-500 text-emerald-50' : 'bg-emerald-900/50 text-emerald-400/50 cursor-not-allowed'
        }`}
      >
        Deal
      </button>
      <button
        onClick={onHit}
        disabled={!canHit}
        className={`px-4 py-2 rounded-md font-semibold transition-colors shadow-sm border border-emerald-700/40 ${
          canHit ? 'bg-emerald-600 hover:bg-emerald-500 text-emerald-50' : 'bg-emerald-900/50 text-emerald-400/50 cursor-not-allowed'
        }`}
      >
        Hit
      </button>
      <button
        onClick={onStand}
        disabled={!canStand}
        className={`px-4 py-2 rounded-md font-semibold transition-colors shadow-sm border border-emerald-700/40 ${
          canStand ? 'bg-emerald-600 hover:bg-emerald-500 text-emerald-50' : 'bg-emerald-900/50 text-emerald-400/50 cursor-not-allowed'
        }`}
      >
        Stand
      </button>
      <button
        onClick={onReset}
        className="px-4 py-2 rounded-md font-semibold transition-colors shadow-sm border border-emerald-700/40 bg-emerald-950 hover:bg-emerald-900 text-emerald-300"
      >
        Reset
      </button>
    </div>
  );
}
