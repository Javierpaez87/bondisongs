import { useState } from 'react';
import { Play, Pause, Heart, Lock, Music2 } from 'lucide-react';

export default function PhoneMockup() {
  const [playing, setPlaying] = useState(false);

  return (
    <div className="relative mx-auto" style={{ maxWidth: 280 }}>
      <div
        className="relative bg-white rounded-[2.5rem] shadow-warm-lg border-4 border-brand-border/60 overflow-hidden mx-auto"
        style={{ aspectRatio: '9/16', maxWidth: 260 }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-brand-surface to-white" />

        <div className="relative h-full flex flex-col p-5 pt-8">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-gradient-warm rounded-2xl flex items-center justify-center shadow-warm">
              <Music2 size={28} className="text-white" />
            </div>
          </div>

          <div className="text-center mb-4">
            <div className="text-xs font-semibold text-brand-accent uppercase tracking-widest mb-1">
              BondiSongs
            </div>
            <div className="font-black text-xl text-brand-text leading-tight">
              La canción de Mía
            </div>
            <div className="text-sm text-brand-muted mt-1">Para su cumple de 5 años</div>
          </div>

          <div className="bg-brand-surface rounded-2xl p-3 mb-4">
            <div className="flex items-end justify-center gap-1 h-10">
              {[14, 20, 10, 22, 16, 8, 18, 12].map((h, i) => (
                <div
                  key={i}
                  className={`waveform-bar ${playing ? '' : 'opacity-40'}`}
                  style={{ height: h, animationPlayState: playing ? 'running' : 'paused' }}
                />
              ))}
            </div>
            <div className="flex justify-between items-center mt-2">
              <span className="text-xs text-brand-muted">{playing ? '0:24' : '0:00'}</span>
              <div className="flex-1 mx-2 h-1 bg-brand-border rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-warm rounded-full transition-all duration-1000"
                  style={{ width: playing ? '35%' : '0%' }}
                />
              </div>
              <span className="text-xs text-brand-muted">1:12</span>
            </div>
          </div>

          <div className="flex items-center justify-center gap-5 mb-4">
            <button className="text-brand-muted hover:text-brand-primary transition-colors">
              <Heart size={20} />
            </button>
            <button
              onClick={() => setPlaying(!playing)}
              className="w-14 h-14 bg-gradient-warm rounded-full flex items-center justify-center shadow-warm active:scale-95 transition-transform"
            >
              {playing ? (
                <Pause size={22} className="text-white fill-white" />
              ) : (
                <Play size={22} className="text-white fill-white ml-1" />
              )}
            </button>
            <button className="text-brand-muted hover:text-brand-primary transition-colors">
              <Heart size={20} />
            </button>
          </div>

          <div className="mt-auto bg-brand-primary-light rounded-2xl p-3 flex items-center gap-3 border border-brand-border">
            <div className="w-8 h-8 bg-brand-border/40 rounded-xl flex items-center justify-center flex-shrink-0">
              <Lock size={14} className="text-brand-muted" />
            </div>
            <div>
              <div className="text-xs font-semibold text-brand-text">Descarga completa</div>
              <div className="text-xs text-brand-muted">Disponible tras confirmar el pedido</div>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute -top-3 -right-3 bg-brand-secondary text-brand-text text-xs font-bold rounded-full px-3 py-1 shadow-card rotate-3 border border-white">
        Preview
      </div>
      <div className="absolute -bottom-3 -left-3 bg-white rounded-2xl shadow-card border border-brand-border px-3 py-2">
        <div className="flex items-center gap-2">
          <span className="text-base">🥲</span>
          <div>
            <div className="text-xs font-bold text-brand-text">¡Me hizo llorar!</div>
            <div className="text-xs text-brand-muted">Ana · mamá de Mía</div>
          </div>
        </div>
      </div>
    </div>
  );
}
