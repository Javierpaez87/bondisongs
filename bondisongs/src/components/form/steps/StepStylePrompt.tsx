import {
  StylePromptFields,
  ENERGY_OPTIONS,
  VOICE_OPTIONS,
  MOOD_OPTIONS,
  TEMPO_OPTIONS,
  SOUND_CHARACTER_OPTIONS,
} from '../../../lib/types';

interface Props {
  data: StylePromptFields;
  onChange: (updates: Partial<StylePromptFields>) => void;
}

function PillGroup({
  label,
  options,
  value,
  onSelect,
}: {
  label: string;
  options: { id: string; label: string; icon: string }[];
  value: string;
  onSelect: (id: string) => void;
}) {
  return (
    <div>
      <label className="label-field">{label}</label>
      <div className="flex flex-wrap gap-2">
        {options.map(opt => (
          <button
            key={opt.id}
            type="button"
            onClick={() => onSelect(opt.id)}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-full border-2 text-sm font-semibold transition-all duration-200 ${
              value === opt.id
                ? 'bg-brand-primary border-brand-primary text-white shadow-warm'
                : 'bg-white border-brand-border text-brand-text hover:border-brand-primary/40'
            }`}
          >
            <span>{opt.icon}</span>
            {opt.label}
          </button>
        ))}
      </div>
    </div>
  );
}

export default function StepStylePrompt({ data, onChange }: Props) {
  return (
    <div className="space-y-6">
      <div className="text-center pb-2">
        <div className="text-4xl mb-3">🎛️</div>
        <h2 className="text-2xl font-black text-brand-text">Ajustes de sonido</h2>
        <p className="text-brand-muted text-sm mt-1">
          Esto nos ayuda a definir mejor cómo va a sonar tu canción
        </p>
      </div>

      <PillGroup
        label="Energía *"
        options={ENERGY_OPTIONS}
        value={data.energy}
        onSelect={id => onChange({ energy: id })}
      />

      <PillGroup
        label="Voz preferida *"
        options={VOICE_OPTIONS}
        value={data.voice}
        onSelect={id => onChange({ voice: id })}
      />

      <PillGroup
        label="Mood *"
        options={MOOD_OPTIONS}
        value={data.mood}
        onSelect={id => onChange({ mood: id })}
      />

      <PillGroup
        label="Ritmo *"
        options={TEMPO_OPTIONS}
        value={data.tempo}
        onSelect={id => onChange({ tempo: id })}
      />

      <PillGroup
        label="Carácter general del sonido"
        options={SOUND_CHARACTER_OPTIONS}
        value={data.soundCharacter}
        onSelect={id => onChange({ soundCharacter: id })}
      />

      <div className="bg-brand-accent-light border border-brand-accent/20 rounded-2xl p-3 text-center">
        <p className="text-xs text-brand-text leading-relaxed">
          Estos ajustes son orientativos. Vamos a buscar el sonido perfecto para tu caso.
        </p>
      </div>
    </div>
  );
}
