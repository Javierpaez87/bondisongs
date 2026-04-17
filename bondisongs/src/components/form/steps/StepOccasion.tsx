import { useEffect, useRef } from 'react';
import { SongRequestForm, OCCASIONS } from '../../../lib/types';

interface Props {
  data: SongRequestForm;
  onChange: (updates: Partial<SongRequestForm>) => void;
}

export default function StepOccasion({ data, onChange }: Props) {
  const otherInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (data.occasion === 'other' && otherInputRef.current) {
      otherInputRef.current.focus();
    }
  }, [data.occasion]);

  return (
    <div className="space-y-5">
      <div className="text-center pb-2">
        <div className="text-4xl mb-3">🎉</div>
        <h2 className="text-2xl font-black text-brand-text">¿Para qué ocasión es?</h2>
        <p className="text-brand-muted text-sm mt-1">Esto nos ayuda a darle el tono perfecto</p>
      </div>

      <div className="space-y-3">
        {OCCASIONS.map(occ => (
          <div key={occ.id}>
            <button
              type="button"
              onClick={() => onChange({ occasion: occ.id })}
              className={`w-full flex items-center gap-4 p-4 rounded-2xl border-2 transition-all duration-200 text-left ${
                data.occasion === occ.id
                  ? 'border-brand-primary bg-brand-primary-light shadow-warm'
                  : 'border-brand-border bg-white hover:border-brand-primary/40 hover:bg-brand-surface'
              }`}
            >
              <div className="w-12 h-12 bg-white rounded-xl shadow-card flex items-center justify-center text-2xl flex-shrink-0">
                {occ.icon}
              </div>
              <span className={`font-semibold text-base ${data.occasion === occ.id ? 'text-brand-primary' : 'text-brand-text'}`}>
                {occ.label}
              </span>
              {data.occasion === occ.id && (
                <div className="ml-auto w-6 h-6 bg-brand-primary rounded-full flex items-center justify-center flex-shrink-0">
                  <svg viewBox="0 0 20 20" fill="white" className="w-3.5 h-3.5">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
              )}
            </button>

            {occ.id === 'other' && data.occasion === 'other' && (
              <div className="mt-2 px-1">
                <input
                  ref={otherInputRef}
                  type="text"
                  className="input-field"
                  placeholder="Contanos para qué es la canción..."
                  value={data.occasionOther}
                  onChange={e => onChange({ occasionOther: e.target.value })}
                />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
