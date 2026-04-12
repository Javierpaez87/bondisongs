import { SongRequestForm } from '../../../lib/types';

interface Props {
  data: SongRequestForm;
  onChange: (updates: Partial<SongRequestForm>) => void;
}

export default function StepContact({ data, onChange }: Props) {
  return (
    <div className="space-y-5">
      <div className="text-center pb-2">
        <div className="text-4xl mb-3">📲</div>
        <h2 className="text-2xl font-black text-brand-text">¿Cómo te contactamos?</h2>
        <p className="text-brand-muted text-sm mt-1">
          Te avisamos por WhatsApp cuando tu canción esté lista
        </p>
      </div>

      <div>
        <label className="label-field">Tu nombre *</label>
        <input
          type="text"
          className="input-field"
          placeholder="Ej: Valeria, Carlos..."
          value={data.adultName}
          onChange={e => onChange({ adultName: e.target.value })}
          autoComplete="given-name"
        />
      </div>

      <div>
        <label className="label-field">WhatsApp *</label>
        <div className="relative">
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-muted font-medium text-base">
            +54
          </div>
          <input
            type="tel"
            className="input-field pl-14"
            placeholder="11 1234-5678"
            value={data.whatsapp}
            onChange={e => onChange({ whatsapp: e.target.value })}
            autoComplete="tel"
          />
        </div>
        <p className="text-xs text-brand-muted mt-1.5">
          Te enviamos el link de la canción por acá. Nada de spam, prometido.
        </p>
      </div>

      <div>
        <label className="label-field">
          Email{' '}
          <span className="font-normal text-brand-muted">(opcional)</span>
        </label>
        <input
          type="email"
          className="input-field"
          placeholder="tu@email.com"
          value={data.email}
          onChange={e => onChange({ email: e.target.value })}
          autoComplete="email"
        />
      </div>

      <div className="bg-brand-surface rounded-2xl p-4 border border-brand-border">
        <div className="flex items-start gap-3">
          <div className="text-xl">🔒</div>
          <div>
            <div className="font-bold text-sm text-brand-text">Tu información está segura</div>
            <p className="text-xs text-brand-muted mt-0.5 leading-relaxed">
              Usamos tus datos solo para enviarte la canción. Nunca los compartimos con nadie.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
