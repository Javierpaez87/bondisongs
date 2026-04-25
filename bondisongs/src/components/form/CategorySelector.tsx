import { ArrowRight } from 'lucide-react';
import { CATEGORIES, SongCategory } from '../../lib/types';

interface Props {
  onSelect: (category: SongCategory) => void;
}

export default function CategorySelector({ onSelect }: Props) {
  return (
    <div className="space-y-6">
      <div className="text-center pb-2">
        <div className="text-4xl mb-3">🎵</div>
        <h2 className="text-2xl font-black text-brand-text">¿Qué tipo de canción necesitás?</h2>
        <p className="text-brand-muted text-sm mt-1">
          Elegí una categoría y te armamos un formulario a medida
        </p>
      </div>

      <div className="space-y-3">
        {CATEGORIES.map(cat => (
          <button
            key={cat.id}
            type="button"
            onClick={() => onSelect(cat.id)}
            className="w-full flex items-center gap-4 p-4 rounded-2xl border-2 border-brand-border bg-white
              hover:border-brand-primary/40 hover:bg-brand-surface hover:shadow-warm
              transition-all duration-200 text-left group active:scale-[0.98]"
          >
            <div className="w-14 h-14 bg-white rounded-xl shadow-card border-2 border-brand-border/50 flex items-center justify-center text-2xl flex-shrink-0
              group-hover:border-brand-primary/30 group-hover:shadow-warm transition-all duration-200">
              {cat.icon}
            </div>
            <div className="flex-1 min-w-0">
              <div className="font-bold text-base text-brand-text group-hover:text-brand-primary transition-colors">
                {cat.label}
              </div>
              <div className="text-xs text-brand-muted mt-0.5 leading-relaxed line-clamp-2">
                {cat.description}
              </div>
            </div>
            <div className="w-8 h-8 bg-brand-surface rounded-full flex items-center justify-center flex-shrink-0
              group-hover:bg-brand-primary group-hover:text-white transition-all duration-200">
              <ArrowRight size={16} className="text-brand-muted group-hover:text-white transition-colors" />
            </div>
          </button>
        ))}
      </div>

      <p className="text-center text-xs text-brand-muted/70">
        Te va a llevar menos de 3 minutos
      </p>
    </div>
  );
}
