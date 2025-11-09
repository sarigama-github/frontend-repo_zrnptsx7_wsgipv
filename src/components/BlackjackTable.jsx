import React, { useMemo } from 'react';

function Card({ card, hidden = false }) {
  if (hidden) {
    return (
      <div className="w-12 h-16 sm:w-14 sm:h-20 rounded-md bg-emerald-900/70 border border-emerald-700/50 shadow-inner" />
    );
  }
  const { rank, suit } = card;
  const isRed = suit === 'hearts' || suit === 'diamonds';
  const suitSymbol = {
    hearts: '♥',
    diamonds: '♦',
    clubs: '♣',
    spades: '♠',
  }[suit];
  return (
    <div className="w-12 h-16 sm:w-14 sm:h-20 rounded-md bg-emerald-50 text-emerald-950 border border-emerald-200 shadow-md flex flex-col items-center justify-between p-1">
      <span className={`self-start text-xs font-bold ${isRed ? 'text-rose-600' : 'text-emerald-900'}`}>{rank}</span>
      <span className={`text-lg ${isRed ? 'text-rose-600' : 'text-emerald-900'}`}>{suitSymbol}</span>
      <span className={`self-end text-xs font-bold ${isRed ? 'text-rose-600' : 'text-emerald-900'}`}>{rank}</span>
    </div>
  );
}

export default function BlackjackTable({ playerHand, dealerHand, hideDealerHole }) {
  const layout = useMemo(() => ({
    spacing: 'space-x-2 sm:space-x-3',
  }), []);

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="rounded-2xl bg-gradient-to-b from-emerald-900/70 to-emerald-950 border border-emerald-700/40 shadow-[inset_0_0_80px_rgba(0,0,0,0.6)] p-4 sm:p-6">
        <div className="mb-4">
          <div className={`flex ${layout.spacing}`}>
            {dealerHand.map((c, idx) => (
              <Card key={`d-${idx}`} card={c} hidden={idx === 0 && hideDealerHole} />
            ))}
          </div>
          <p className="mt-2 text-emerald-300/80 text-sm">Dealer</p>
        </div>

        <div className="mt-6 pt-6 border-t border-emerald-800/40">
          <div className={`flex ${layout.spacing}`}>
            {playerHand.map((c, idx) => (
              <Card key={`p-${idx}`} card={c} />
            ))}
          </div>
          <p className="mt-2 text-emerald-300/80 text-sm">You</p>
        </div>
      </div>
    </div>
  );
}
