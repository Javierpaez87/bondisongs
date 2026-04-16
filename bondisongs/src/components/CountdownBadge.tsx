import { useEffect, useState } from 'react';

const TOTAL_SONGS = 200;
const TOTAL_DAYS = 7;

function getSongsRemaining(): number {
  const key = 'bondi_countdown_start';
  let start = localStorage.getItem(key);
  if (!start) {
    start = Date.now().toString();
    localStorage.setItem(key, start);
  }
  const elapsed = Date.now() - parseInt(start, 10);
  const days = elapsed / (1000 * 60 * 60 * 24);
  const consumed = Math.floor((days / TOTAL_DAYS) * TOTAL_SONGS);
  return Math.max(0, TOTAL_SONGS - consumed);
}

interface Props {
  compact?: boolean;
}

export default function CountdownBadge({ compact = false }: Props) {
  const [remaining, setRemaining] = useState(getSongsRemaining);

  useEffect(() => {
    const interval = setInterval(() => {
      setRemaining(getSongsRemaining());
    }, 60_000);
    return () => clearInterval(interval);
  }, []);

  if (compact) {
    return (
      <div className="flex items-center gap-1.5 bg-brand-secondary/30 border border-brand-secondary rounded-full px-3 py-1">
        <span className="text-[10px] font-black text-brand-text uppercase tracking-wide">
          🏷️ {remaining} canciones con 20% OFF
        </span>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center gap-2 bg-brand-secondary/20 border border-brand-secondary/50 rounded-2xl px-4 py-2.5">
      <span className="text-lg">🏷️</span>
      <p className="text-sm font-semibold text-brand-text leading-tight">
        Las próximas{' '}
        <span className="text-brand-primary font-black">{remaining}</span>{' '}
        canciones tienen{' '}
        <span className="text-brand-primary font-black">20% de descuento</span>
      </p>
    </div>
  );
}
