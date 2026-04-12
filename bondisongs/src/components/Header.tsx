import { useState, useEffect } from 'react';
import { Music2 } from 'lucide-react';

interface HeaderProps {
  onCTAClick: () => void;
}

export default function Header({ onCTAClick }: HeaderProps) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled
          ? 'bg-white/95 backdrop-blur-sm shadow-card border-b border-brand-border/40'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-lg mx-auto px-5 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-gradient-warm rounded-xl flex items-center justify-center shadow-warm">
            <Music2 size={16} className="text-white" strokeWidth={2.5} />
          </div>
          <span className="font-bold text-lg text-brand-text tracking-tight">
            Bondi<span className="text-brand-primary">Songs</span>
          </span>
        </div>

        <button
          onClick={onCTAClick}
          className="bg-brand-primary text-white font-semibold rounded-xl px-4 py-2 text-sm
            shadow-warm hover:bg-brand-primary-dark active:scale-[0.97] transition-all duration-200"
        >
          Crear canción
        </button>
      </div>
    </header>
  );
}
