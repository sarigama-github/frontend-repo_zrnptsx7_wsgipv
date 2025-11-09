import React from 'react';

function HandValue({ label, value, hidden }) {
  return (
    <div className="flex items-center justify-between rounded-md bg-emerald-900/50 border border-emerald-700/40 px-3 py-2">
      <span className="text-emerald-300/90 text-sm sm:text-base">{label}</span>
      <span className="font-bold text-emerald-100 text-sm sm:text-base">
        {hidden ? '??' : value}
      </span>
    </div>
  );
}

export default function Scoreboard({ playerValue, dealerValue, hideDealer, result, chips }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 w-full max-w-3xl">
      <HandValue label="Dealer" value={dealerValue} hidden={hideDealer} />
      <div className="flex items-center justify-center rounded-md bg-emerald-950 border border-emerald-700/40 px-3 py-2">
        <span className="text-emerald-300/90 text-sm sm:text-base">Chips</span>
        <span className="ml-2 font-extrabold text-emerald-100 text-lg">{chips}</span>
      </div>
      <HandValue label="Player" value={playerValue} hidden={false} />

      {result && (
        <div className="sm:col-span-3 text-center mt-1">
          <div className="inline-flex items-center rounded-full px-4 py-2 bg-emerald-600/20 border border-emerald-500/40 text-emerald-200 font-semibold shadow-[0_0_20px_rgba(16,185,129,0.25)]">
            {result}
          </div>
        </div>
      )}
    </div>
  );
}
