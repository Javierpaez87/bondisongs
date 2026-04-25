import { useEffect, useRef } from 'react';
import {
  EducationFields,
  EDUCATION_LEVELS,
  EDUCATION_OBJECTIVES,
  EDUCATION_TONES,
} from '../../../lib/types';

interface Props {
  data: EducationFields;
  onChange: (updates: Partial<EducationFields>) => void;
}

export default function StepEducationContent({ data, onChange }: Props) {
  const topicRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    topicRef.current?.focus();
  }, []);

  return (
    <div className="space-y-6">
      <div className="text-center pb-2">
        <div className="text-4xl mb-3">📚</div>
        <h2 className="text-2xl font-black text-brand-text">Canción educativa</h2>
        <p className="text-brand-muted text-sm mt-1">Contanos qué querés enseñar</p>
      </div>

      <div>
        <label className="label-field">Nivel educativo *</label>
        <div className="grid grid-cols-2 gap-2">
          {EDUCATION_LEVELS.map(level => (
            <button
              key={level.id}
              type="button"
              onClick={() => onChange({ educationLevel: level.id })}
              className={`flex items-center gap-2 p-3 rounded-2xl border-2 transition-all duration-200 text-left ${
                data.educationLevel === level.id
                  ? 'border-brand-primary bg-brand-primary-light shadow-warm'
                  : 'border-brand-border bg-white hover:border-brand-primary/40'
              }`}
            >
              <span className="text-xl">{level.icon}</span>
              <span className={`text-sm font-semibold ${data.educationLevel === level.id ? 'text-brand-primary' : 'text-brand-text'}`}>
                {level.label}
              </span>
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="label-field">
          Edad aproximada de los estudiantes{' '}
          <span className="font-normal text-brand-muted">(opcional)</span>
        </label>
        <input
          type="text"
          className="input-field"
          placeholder="Ej: 5 años, 8-10 años..."
          value={data.studentAge}
          onChange={e => onChange({ studentAge: e.target.value })}
        />
      </div>

      <div>
        <label className="label-field">Tema o contenido a enseñar *</label>
        <input
          ref={topicRef}
          type="text"
          className="input-field"
          placeholder="Ej: Tablas del 7, Sistema solar, Vocales..."
          value={data.topic}
          onChange={e => onChange({ topic: e.target.value })}
        />
      </div>

      <div>
        <label className="label-field">Objetivo de la canción *</label>
        <div className="flex flex-wrap gap-2">
          {EDUCATION_OBJECTIVES.map(obj => (
            <button
              key={obj.id}
              type="button"
              onClick={() => onChange({ objective: obj.id })}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-full border-2 text-sm font-semibold transition-all duration-200 ${
                data.objective === obj.id
                  ? 'bg-brand-primary border-brand-primary text-white shadow-warm'
                  : 'bg-white border-brand-border text-brand-text hover:border-brand-primary/40'
              }`}
            >
              <span>{obj.icon}</span>
              {obj.label}
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="label-field">Tono *</label>
        <div className="flex flex-wrap gap-2">
          {EDUCATION_TONES.map(t => (
            <button
              key={t.id}
              type="button"
              onClick={() => onChange({ tone: t.id })}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-full border-2 text-sm font-semibold transition-all duration-200 ${
                data.tone === t.id
                  ? 'bg-brand-primary border-brand-primary text-white shadow-warm'
                  : 'bg-white border-brand-border text-brand-text hover:border-brand-primary/40'
              }`}
            >
              <span>{t.icon}</span>
              {t.label}
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="label-field">
          Palabras o conceptos que deben aparecer{' '}
          <span className="font-normal text-brand-muted">(opcional)</span>
        </label>
        <textarea
          className="textarea-field"
          placeholder="Ej: hidrógeno, oxígeno, tabla periódica..."
          value={data.wordsToInclude}
          onChange={e => onChange({ wordsToInclude: e.target.value })}
          rows={3}
        />
      </div>

      <div>
        <label className="label-field">
          Información adicional{' '}
          <span className="font-normal text-brand-muted">(opcional)</span>
        </label>
        <textarea
          className="textarea-field"
          placeholder="Algo más que nos quieras contar sobre el contexto educativo..."
          value={data.additionalInfo}
          onChange={e => onChange({ additionalInfo: e.target.value })}
          rows={3}
        />
      </div>
    </div>
  );
}
