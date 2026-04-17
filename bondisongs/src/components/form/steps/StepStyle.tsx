import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { SongRequestForm, MUSIC_STYLES, MUSIC_STYLES_EXTRA, INSTRUMENT_GROUPS } from '../../../lib/types';

interface Props {
  data: SongRequestForm;
  onChange: (updates: Partial<SongRequestForm>) => void;
}

function StyleButton({ style, selected, onSelect }: { style: { id: string; label: string; icon: string; desc: string }; selected: boolean; onSelect: () => void }) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className={`w-full flex items-center gap-4 p-4 rounded-2xl border-2 transition-all duration-200 text-left ${
        selected
          ? 'border-brand-primary bg-brand-primary-light shadow-warm'
          : 'border-brand-border bg-white hover:border-brand-primary/40 hover:bg-brand-surface'
      }`}
    >
      <div className="w-12 h-12 bg-white rounded-xl shadow-card flex items-center justify-center text-2xl flex-shrink-0">
        {style.icon}
      </div>
      <div className="flex-1">
        <div className={`font-bold text-sm ${selected ? 'text-brand-primary' : 'text-brand-text'}`}>
          {style.label}
        </div>
        <div className="text-xs text-brand-muted mt-0.5">{style.desc}</div>
      </div>
      {selected && (
        <div className="w-6 h-6 bg-brand-primary rounded-full flex items-center justify-center flex-shrink-0">
          <svg viewBox="0 0 20 20" fill="white" className="w-3.5 h-3.5">
            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
        </div>
      )}
    </button>
  );
}

export default function StepStyle({ data, onChange }: Props) {
  const [showMore, setShowMore] = useState(false);
  const [showInstruments, setShowInstruments] = useState(false);

  const toggleInstrument = (item: string) => {
    const current = data.instruments;
    const updated = current.includes(item)
      ? current.filter(i => i !== item)
      : [...current, item];
    onChange({ instruments: updated });
  };

  return (
    <div className="space-y-5">
      <div className="text-center pb-2">
        <div className="text-4xl mb-3">🎸</div>
        <h2 className="text-2xl font-black text-brand-text">¿Cómo querés que suene?</h2>
        <p className="text-brand-muted text-sm mt-1">
          Elegí el estilo que mejor se adapta a la ocasión
        </p>
      </div>

      <div className="space-y-3">
        {MUSIC_STYLES.map(style => (
          <StyleButton
            key={style.id}
            style={style}
            selected={data.musicStyle === style.id}
            onSelect={() => onChange({ musicStyle: style.id })}
          />
        ))}

        {showMore && MUSIC_STYLES_EXTRA.map(style => (
          <StyleButton
            key={style.id}
            style={style}
            selected={data.musicStyle === style.id}
            onSelect={() => onChange({ musicStyle: style.id })}
          />
        ))}

        <button
          type="button"
          onClick={() => setShowMore(v => !v)}
          className="w-full flex items-center justify-center gap-2 py-3 rounded-2xl border-2 border-dashed border-brand-border text-brand-muted hover:border-brand-primary/40 hover:text-brand-primary transition-all duration-200 text-sm font-semibold"
        >
          {showMore ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          {showMore ? 'Ver menos' : 'Ver más estilos'}
        </button>
      </div>

      <div>
        <button
          type="button"
          onClick={() => setShowInstruments(v => !v)}
          className="w-full flex items-center justify-between gap-2 py-3 px-4 rounded-2xl bg-brand-surface border border-brand-border text-brand-text hover:border-brand-primary/40 transition-all duration-200 text-sm font-semibold"
        >
          <span>
            🎼 Seleccionar instrumentos{' '}
            <span className="font-normal text-brand-muted">(opcional)</span>
            {data.instruments.length > 0 && (
              <span className="ml-2 bg-brand-primary text-white text-xs font-bold rounded-full px-2 py-0.5">
                {data.instruments.length}
              </span>
            )}
          </span>
          {showInstruments ? <ChevronUp size={16} className="flex-shrink-0" /> : <ChevronDown size={16} className="flex-shrink-0" />}
        </button>

        {showInstruments && (
          <div className="mt-3 space-y-4">
            {INSTRUMENT_GROUPS.map(group => (
              <div key={group.label}>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-base">{group.icon}</span>
                  <span className="text-xs font-bold text-brand-muted uppercase tracking-wide">{group.label}</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {group.items.map(item => {
                    const selected = data.instruments.includes(item);
                    return (
                      <button
                        key={item}
                        type="button"
                        onClick={() => toggleInstrument(item)}
                        className={`px-3 py-1.5 rounded-xl text-sm font-medium border transition-all duration-150 ${
                          selected
                            ? 'bg-brand-primary text-white border-brand-primary shadow-warm'
                            : 'bg-white text-brand-text border-brand-border hover:border-brand-primary/40'
                        }`}
                      >
                        {item}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
