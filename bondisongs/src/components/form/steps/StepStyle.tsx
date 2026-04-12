import { SongRequestForm, MUSIC_STYLES } from '../../../lib/types';

interface Props {
  data: SongRequestForm;
  onChange: (updates: Partial<SongRequestForm>) => void;
}

export default function StepStyle({ data, onChange }: Props) {
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
          <button
            key={style.id}
            type="button"
            onClick={() => onChange({ musicStyle: style.id })}
            className={`w-full flex items-center gap-4 p-4 rounded-2xl border-2 transition-all duration-200 text-left ${
              data.musicStyle === style.id
                ? 'border-brand-primary bg-brand-primary-light shadow-warm'
                : 'border-brand-border bg-white hover:border-brand-primary/40 hover:bg-brand-surface'
            }`}
          >
            <div className="w-12 h-12 bg-white rounded-xl shadow-card flex items-center justify-center text-2xl flex-shrink-0">
              {style.icon}
            </div>
            <div className="flex-1">
              <div className={`font-bold text-sm ${data.musicStyle === style.id ? 'text-brand-primary' : 'text-brand-text'}`}>
                {style.label}
              </div>
              <div className="text-xs text-brand-muted mt-0.5">{style.desc}</div>
            </div>
            {data.musicStyle === style.id && (
              <div className="w-6 h-6 bg-brand-primary rounded-full flex items-center justify-center flex-shrink-0">
                <svg viewBox="0 0 20 20" fill="white" className="w-3.5 h-3.5">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
