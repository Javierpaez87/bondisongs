import { SongRequestForm } from '../../../lib/types';

interface Props {
  data: SongRequestForm;
  onChange: (updates: Partial<SongRequestForm>) => void;
}

const PROMPTS = [
  'Una frase que repite seguido',
  'Algo que lo hace reír',
  'Un momento que no olvidás',
  'Cómo es cuando está feliz',
  'Qué sueña de grande',
];

export default function StepMemory({ data, onChange }: Props) {
  return (
    <div className="space-y-5">
      <div className="text-center pb-2">
        <div className="text-4xl mb-3">🥲</div>
        <h2 className="text-2xl font-black text-brand-text">Contanos algo especial</h2>
        <p className="text-brand-muted text-sm mt-1">
          Una anécdota, un recuerdo, algo que lo haga único
        </p>
      </div>

      <div>
        <label className="label-field">
          Escribí lo que se te ocurra{' '}
          <span className="font-normal text-brand-muted">(opcional pero hermoso)</span>
        </label>
        <textarea
          className="textarea-field"
          placeholder="Ej: Le decimos 'Copito' desde bebé porque nació en agosto y hacía mucho frío. Le encanta bailar en la cocina con su papá..."
          value={data.memoryText}
          onChange={e => onChange({ memoryText: e.target.value })}
          rows={5}
        />
        <div className="flex justify-end mt-1">
          <span className="text-xs text-brand-muted">{data.memoryText.length} caracteres</span>
        </div>
      </div>

      <div>
        <p className="text-xs font-semibold text-brand-muted mb-2">Ideas para inspirarte:</p>
        <div className="flex flex-wrap gap-2">
          {PROMPTS.map(p => (
            <button
              key={p}
              type="button"
              onClick={() => {
                const prefix = data.memoryText ? data.memoryText + '\n' : '';
                onChange({ memoryText: prefix + p + ': ' });
              }}
              className="text-xs bg-brand-surface border border-brand-border rounded-xl px-3 py-1.5 text-brand-muted hover:border-brand-primary hover:text-brand-primary transition-all duration-200"
            >
              {p}
            </button>
          ))}
        </div>
      </div>

      <div className="bg-brand-secondary-light border border-brand-secondary/30 rounded-2xl p-3 text-center">
        <p className="text-xs text-brand-text leading-relaxed">
          <span className="font-bold">No hay respuestas correctas ni incorrectas.</span><br />
          Cualquier cosita que nos contés se convierte en magia musical.
        </p>
      </div>
    </div>
  );
}
