import React, { useMemo, useState } from 'react';
import Hero from './components/Hero';
import Scoreboard from './components/Scoreboard';
import BlackjackTable from './components/BlackjackTable';
import Controls from './components/Controls';

function buildDeck() {
  const suits = ['hearts', 'diamonds', 'clubs', 'spades'];
  const ranks = ['A','2','3','4','5','6','7','8','9','10','J','Q','K'];
  const values = (r) => r === 'A' ? 11 : ['J','Q','K'].includes(r) ? 10 : Number(r);
  const deck = [];
  for (const s of suits) {
    for (const r of ranks) {
      deck.push({ suit: s, rank: r, value: values(r) });
    }
  }
  // shuffle
  for (let i = deck.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [deck[i], deck[j]] = [deck[j], deck[i]];
  }
  return deck;
}

function handValue(cards) {
  let total = 0;
  let aces = 0;
  for (const c of cards) {
    total += c.value;
    if (c.rank === 'A') aces += 1;
  }
  while (total > 21 && aces > 0) {
    total -= 10; // count Ace as 1 instead of 11
    aces -= 1;
  }
  return total;
}

export default function App() {
  const freshDeck = useMemo(buildDeck, []);
  const [deck, setDeck] = useState(freshDeck);
  const [playerHand, setPlayerHand] = useState([]);
  const [dealerHand, setDealerHand] = useState([]);
  const [hideDealer, setHideDealer] = useState(true);
  const [result, setResult] = useState('');
  const [chips, setChips] = useState(1000);

  const resetRound = () => {
    setPlayerHand([]);
    setDealerHand([]);
    setHideDealer(true);
    setResult('');
    if (deck.length < 10) setDeck(buildDeck());
  };

  const deal = () => {
    if (playerHand.length > 0) return; // already in round
    let d = [...deck];
    const draw = () => d.pop();
    const p = [draw(), draw()];
    const dealer = [draw(), draw()];
    setDeck(d);
    setPlayerHand(p);
    setDealerHand(dealer);
    setHideDealer(true);
    setResult('');
  };

  const hit = () => {
    if (playerHand.length === 0 || result) return;
    const d = [...deck];
    const p = [...playerHand, d.pop()];
    setDeck(d);
    setPlayerHand(p);
    if (handValue(p) > 21) {
      setHideDealer(false);
      setResult('Bust! Dealer wins');
      setChips((c) => Math.max(0, c - 50));
    }
  };

  const stand = () => {
    if (playerHand.length === 0 || result) return;
    let d = [...deck];
    let dealer = [...dealerHand];
    // Dealer hits until 17+
    while (handValue(dealer) < 17 && d.length > 0) {
      dealer.push(d.pop());
    }
    setDeck(d);
    setDealerHand(dealer);
    setHideDealer(false);

    const pv = handValue(playerHand);
    const dv = handValue(dealer);

    if (dv > 21) {
      setResult('Dealer busts! You win');
      setChips((c) => c + 50);
    } else if (pv > dv) {
      setResult('You win');
      setChips((c) => c + 50);
    } else if (pv < dv) {
      setResult('Dealer wins');
      setChips((c) => Math.max(0, c - 50));
    } else {
      setResult('Push');
    }
  };

  const canDeal = playerHand.length === 0 && !result;
  const canHit = playerHand.length > 0 && hideDealer && !result;
  const canStand = playerHand.length > 0 && hideDealer && !result;

  return (
    <div className="min-h-screen bg-emerald-950 text-emerald-100">
      <Hero />

      <main id="play" className="relative -mt-10 sm:-mt-16 z-10">
        <div className="mx-auto max-w-6xl px-4 pb-24">
          <div className="mb-6">
            <Scoreboard
              playerValue={handValue(playerHand)}
              dealerValue={handValue(dealerHand)}
              hideDealer={hideDealer}
              result={result}
              chips={chips}
            />
          </div>

          <div className="mb-8">
            <BlackjackTable
              playerHand={playerHand}
              dealerHand={dealerHand}
              hideDealerHole={hideDealer}
            />
          </div>

          <Controls
            canDeal={canDeal}
            canHit={canHit}
            canStand={canStand}
            onDeal={deal}
            onHit={hit}
            onStand={stand}
            onReset={resetRound}
          />

          <p className="mt-10 text-center text-emerald-300/70 text-sm">
            House rules: Blackjacks pay even, dealer stands on 17+. Bet size: 50 chips.
          </p>
        </div>
      </main>

      <footer className="border-t border-emerald-800/40 py-8 text-center text-emerald-400/70">
        Built for fun. Gamble responsibly.
      </footer>
    </div>
  );
}
