import { SongRequestForm } from '../../../lib/types';

interface Props {
  data: SongRequestForm;
  onChange: (updates: Partial<SongRequestForm>) => void;
}

const EXAMPLES = [
  'mamá Ana', 'papá Diego', 'abuelo Javi', 'abuela Cora',
  'hermana Lola', 'hermano Nico', 'tía Vale', 'perro Toti',
];

export default function StepPeople({ data, onChange }: Props) {
  return (
    <div className="space-y-5">
      <div className="text-center pb-2">
        <div className="text-4xl mb-3">👨‍👩‍👧‍👦</div>
        <h2 className="text-2xl font-black text-brand-text">¿Quiénes son importantes?</h2>
        <p className="text-brand-muted text-sm mt-1">
          Personas o mascotas que pueden aparecer en la canción
        </p>
      </div>

      <div>
        <label className="label-field">
          Nombres y roles{' '}
          <span className="font-normal text-brand-muted">(opcional)</span>
        </label>
        <textarea
          className="textarea-field"
          placeholder="Ej: mamá Ana, papá Diego, abuelo Javi, perrito Toti..."
          value={data.importantPeople}
          onChange={e => onChange({ importantPeople: e.target.value })}
          rows={4}
        />
      </div>

      <div>
        <p className="text-xs font-semibold text-brand-muted mb-2">Tocá para agregar rápido:</p>
        <div className="flex flex-wrap gap-2">
          {EXAMPLES.map(ex => {
            const already = data.importantPeople.includes(ex.split(' ')[1] || ex);
            return (
              <button
                key={ex}
                type="button"
                disabled={already}
                onClick={() => {
                  const prefix = data.importantPeople ? data.importantPeople + ', ' : '';
                  onChange({ importantPeople: prefix + ex });
                }}
                className={`text-xs rounded-xl px-3 py-1.5 border transition-all duration-200 ${
                  already
                    ? 'bg-brand-primary-light border-brand-primary/30 text-brand-primary font-semibold'
                    : 'bg-brand-surface border-brand-border text-brand-muted hover:border-brand-primary hover:text-brand-primary'
                }`}
              >
                {ex}
              </button>
            );
          })}
        </div>
      </div>

      <div className="bg-brand-accent-light border border-brand-accent/20 rounded-2xl p-3 text-center">
        <p className="text-xs text-brand-text leading-relaxed">
          Este paso es opcional. Si no querés incluir nombres de personas, lo saltamos sin problema.
        </p>
      </div>
    </div>
  );
}
