import { useEffect, useRef } from 'react';
import {
  ParentingFields,
  PARENTING_OBJECTIVES,
  PARENTING_TONES,
} from '../../../lib/types';

interface Props {
  data: ParentingFields;
  onChange: (updates: Partial<ParentingFields>) => void;
}

export default function StepParentingContent({ data, onChange }: Props) {
  const otherRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (data.parentingObjective === 'otro' && otherRef.current) {
      otherRef.current.focus();
    }
  }, [data.parentingObjective]);

  return (
    <div className="space-y-6">
      <div className="text-center pb-2">
        <div className="text-4xl mb-3">🍼</div>
        <h2 className="text-2xl font-black text-brand-text">Canción de crianza</h2>
        <p className="text-brand-muted text-sm mt-1">Contanos sobre el/la peque y la rutina</p>
      </div>

      <div>
        <label className="label-field">
          Nombre del niño/a{' '}
          <span className="font-normal text-brand-muted">(opcional)</span>
        </label>
        <input
          type="text"
          className="input-field"
          placeholder="Ej: Emma, Bautista..."
          value={data.childNameParenting}
          onChange={e => onChange({ childNameParenting: e.target.value })}
          autoFocus
        />
      </div>

      <div>
        <label className="label-field">
          Edad{' '}
          <span className="font-normal text-brand-muted">(opcional)</span>
        </label>
        <input
          type="text"
          className="input-field"
          placeholder="Ej: 2 años, 18 meses..."
          value={data.childAge}
          onChange={e => onChange({ childAge: e.target.value })}
        />
      </div>

      <div>
        <label className="label-field">Objetivo *</label>
        <div className="grid grid-cols-3 gap-2">
          {PARENTING_OBJECTIVES.map(obj => (
            <div key={obj.id}>
              <button
                type="button"
                onClick={() => onChange({ parentingObjective: obj.id })}
                className={`w-full flex flex-col items-center gap-1 p-3 rounded-2xl border-2 transition-all duration-200 ${
                  data.parentingObjective === obj.id
                    ? 'border-brand-primary bg-brand-primary-light shadow-warm'
                    : 'border-brand-border bg-white hover:border-brand-primary/40'
                }`}
              >
                <span className="text-xl">{obj.icon}</span>
                <span className={`text-xs font-semibold text-center ${
                  data.parentingObjective === obj.id ? 'text-brand-primary' : 'text-brand-text'
                }`}>
                  {obj.label}
                </span>
              </button>
            </div>
          ))}
        </div>
        {data.parentingObjective === 'otro' && (
          <div className="mt-2">
            <input
              ref={otherRef}
              type="text"
              className="input-field"
              placeholder="Contanos cuál es el objetivo..."
              value={data.parentingObjectiveOther}
              onChange={e => onChange({ parentingObjectiveOther: e.target.value })}
            />
          </div>
        )}
      </div>

      <div>
        <label className="label-field">
          Situación o rutina que querés acompañar{' '}
          <span className="font-normal text-brand-muted">(opcional)</span>
        </label>
        <textarea
          className="textarea-field"
          placeholder="Ej: Todas las noches llora para dormir y le cantamos pero queremos algo especial..."
          value={data.situation}
          onChange={e => onChange({ situation: e.target.value })}
          rows={3}
        />
      </div>

      <div>
        <label className="label-field">Tono *</label>
        <div className="flex flex-wrap gap-2">
          {PARENTING_TONES.map(t => (
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
          Frases familiares, apodos o palabras importantes{' '}
          <span className="font-normal text-brand-muted">(opcional)</span>
        </label>
        <textarea
          className="textarea-field"
          placeholder='Ej: Le decimos "bichito", le cantamos "a dormir mi sol"...'
          value={data.familiarPhrases}
          onChange={e => onChange({ familiarPhrases: e.target.value })}
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
          placeholder="Algo más que nos quieras contar..."
          value={data.additionalInfo}
          onChange={e => onChange({ additionalInfo: e.target.value })}
          rows={3}
        />
      </div>
    </div>
  );
}
