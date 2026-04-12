import { useState } from 'react';
import { SongRequestForm, INTERESTS } from '../../../lib/types';

interface Props {
  data: SongRequestForm;
  onChange: (updates: Partial<SongRequestForm>) => void;
}

export default function StepInterests({ data, onChange }: Props) {
  const [custom, setCustom] = useState('');

  const toggle = (interest: string) => {
    const next = data.interests.includes(interest)
      ? data.interests.filter(i => i !== interest)
      : [...data.interests, interest];
    onChange({ interests: next });
  };

  const addCustom = () => {
    const val = custom.trim();
    if (val && !data.interests.includes(val)) {
      onChange({ interests: [...data.interests, val] });
      setCustom('');
    }
  };

  return (
    <div className="space-y-5">
      <div className="text-center pb-2">
        <div className="text-4xl mb-3">⭐</div>
        <h2 className="text-2xl font-black text-brand-text">¿Qué le gusta?</h2>
        <p className="text-brand-muted text-sm mt-1">
          Tocá todo lo que aplique — podés elegir varios
        </p>
      </div>

      <div className="flex flex-wrap gap-2">
        {INTERESTS.map(interest => {
          const selected = data.interests.includes(interest);
          return (
            <button
              key={interest}
              type="button"
              onClick={() => toggle(interest)}
              className={`px-4 py-2 rounded-full text-sm font-semibold border-2 transition-all duration-200 ${
                selected
                  ? 'bg-brand-primary border-brand-primary text-white shadow-warm'
                  : 'bg-white border-brand-border text-brand-text hover:border-brand-primary/40'
              }`}
            >
              {interest}
            </button>
          );
        })}
      </div>

      <div>
        <label className="label-field">¿Algo más? Escribilo acá</label>
        <div className="flex gap-2">
          <input
            type="text"
            className="input-field flex-1"
            placeholder="Ej: Harry Potter, sushi, patines..."
            value={custom}
            onChange={e => setCustom(e.target.value)}
            onKeyDown={e => {
              if (e.key === 'Enter') { e.preventDefault(); addCustom(); }
            }}
          />
          <button
            type="button"
            onClick={addCustom}
            disabled={!custom.trim()}
            className="bg-brand-primary text-white rounded-2xl px-4 font-semibold text-sm
              disabled:opacity-40 disabled:cursor-not-allowed hover:bg-brand-primary-dark
              transition-all duration-200 active:scale-95"
          >
            +
          </button>
        </div>
      </div>

      {data.interests.length > 0 && (
        <div className="bg-brand-primary-light rounded-2xl p-3 border border-brand-primary/20">
          <p className="text-xs font-semibold text-brand-primary mb-2">Elegiste:</p>
          <div className="flex flex-wrap gap-1.5">
            {data.interests.map(i => (
              <span
                key={i}
                onClick={() => toggle(i)}
                className="bg-brand-primary text-white text-xs font-semibold rounded-full px-3 py-1 cursor-pointer hover:bg-brand-primary-dark transition-colors"
              >
                {i} ×
              </span>
            ))}
          </div>
        </div>
      )}

      {data.interests.length === 0 && (
        <p className="text-center text-xs text-brand-muted/70">
          No hace falta elegir nada si no encontrás algo — podés contarlo en el próximo paso
        </p>
      )}
    </div>
  );
}
