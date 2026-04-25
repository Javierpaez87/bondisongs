import { OtherFields } from '../../../lib/types';

interface Props {
  data: OtherFields;
  onChange: (updates: Partial<OtherFields>) => void;
}

export default function StepOtherContent({ data, onChange }: Props) {
  return (
    <div className="space-y-6">
      <div className="text-center pb-2">
        <div className="text-4xl mb-3">✨</div>
        <h2 className="text-2xl font-black text-brand-text">Canción a medida</h2>
        <p className="text-brand-muted text-sm mt-1">Contanos qué necesitás y lo armamos</p>
      </div>

      <div>
        <label className="label-field">¿Qué tipo de canción querés? *</label>
        <input
          type="text"
          className="input-field"
          placeholder="Ej: Himno para mi emprendimiento, canción para mi mascota..."
          value={data.songType}
          onChange={e => onChange({ songType: e.target.value })}
          autoFocus
        />
      </div>

      <div>
        <label className="label-field">¿Para quién o para qué es? *</label>
        <input
          type="text"
          className="input-field"
          placeholder="Ej: Para mi perro Rocky, para el equipo de la empresa..."
          value={data.songTarget}
          onChange={e => onChange({ songTarget: e.target.value })}
        />
      </div>

      <div>
        <label className="label-field">
          Contexto general{' '}
          <span className="font-normal text-brand-muted">(opcional)</span>
        </label>
        <textarea
          className="textarea-field"
          placeholder="Contanos la situación, el motivo, o lo que nos ayude a entender tu idea..."
          value={data.context}
          onChange={e => onChange({ context: e.target.value })}
          rows={4}
        />
      </div>

      <div>
        <label className="label-field">
          Tono deseado{' '}
          <span className="font-normal text-brand-muted">(opcional)</span>
        </label>
        <input
          type="text"
          className="input-field"
          placeholder="Ej: divertido, emotivo, épico, relajado..."
          value={data.tone}
          onChange={e => onChange({ tone: e.target.value })}
        />
      </div>

      <div>
        <label className="label-field">
          Detalles importantes{' '}
          <span className="font-normal text-brand-muted">(opcional)</span>
        </label>
        <textarea
          className="textarea-field"
          placeholder="Nombres, frases, datos que querés que aparezcan en la canción..."
          value={data.importantDetails}
          onChange={e => onChange({ importantDetails: e.target.value })}
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
          placeholder="Cualquier otra cosa que nos quieras contar..."
          value={data.additionalInfo}
          onChange={e => onChange({ additionalInfo: e.target.value })}
          rows={3}
        />
      </div>

      <div className="bg-brand-secondary-light border border-brand-secondary/30 rounded-2xl p-3 text-center">
        <p className="text-xs text-brand-text leading-relaxed">
          <span className="font-bold">No te preocupes si no sabés cómo explicarlo.</span><br />
          Escribí lo que puedas y nosotros lo resolvemos.
        </p>
      </div>
    </div>
  );
}
