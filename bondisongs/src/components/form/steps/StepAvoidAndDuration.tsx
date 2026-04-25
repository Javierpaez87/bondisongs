import { DURATION_OPTIONS } from '../../../lib/types';

interface Props {
  wordsToAvoid: string;
  desiredDuration: string;
  onChange: (updates: { wordsToAvoid?: string; desiredDuration?: string }) => void;
}

export default function StepAvoidAndDuration({ wordsToAvoid, desiredDuration, onChange }: Props) {
  return (
    <div className="space-y-6">
      <div className="text-center pb-2">
        <div className="text-4xl mb-3">🛡️</div>
        <h2 className="text-2xl font-black text-brand-text">Últimos detalles</h2>
        <p className="text-brand-muted text-sm mt-1">Restricciones y duración deseada</p>
      </div>

      <div>
        <label className="label-field">
          Palabras o temas a evitar{' '}
          <span className="font-normal text-brand-muted">(opcional)</span>
        </label>
        <textarea
          className="textarea-field"
          placeholder="Ej: No mencionar al papá, no usar palabras en inglés, evitar temas de muerte..."
          value={wordsToAvoid}
          onChange={e => onChange({ wordsToAvoid: e.target.value })}
          rows={3}
        />
      </div>

      <div>
        <label className="label-field">Duración deseada</label>
        <div className="grid grid-cols-2 gap-2">
          {DURATION_OPTIONS.map(opt => (
            <button
              key={opt.id}
              type="button"
              onClick={() => onChange({ desiredDuration: opt.id })}
              className={`p-3 rounded-2xl border-2 text-sm font-semibold transition-all duration-200 text-center ${
                desiredDuration === opt.id
                  ? 'border-brand-primary bg-brand-primary-light text-brand-primary shadow-warm'
                  : 'border-brand-border bg-white text-brand-text hover:border-brand-primary/40'
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      <div className="bg-brand-surface rounded-2xl p-4 border border-brand-border">
        <div className="flex items-start gap-3">
          <div className="text-xl">💡</div>
          <div>
            <p className="text-xs text-brand-muted leading-relaxed">
              La duración es orientativa. El largo final depende del contenido y la estructura de la canción.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
