import { useEffect, useRef } from 'react';
import {
  FriendsFields,
  FRIENDS_SONG_TYPES,
  FRIENDS_TONES,
} from '../../../lib/types';

interface Props {
  data: FriendsFields;
  onChange: (updates: Partial<FriendsFields>) => void;
}

export default function StepFriendsContent({ data, onChange }: Props) {
  const otherRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (data.friendsSongType === 'otro' && otherRef.current) {
      otherRef.current.focus();
    }
  }, [data.friendsSongType]);

  return (
    <div className="space-y-6">
      <div className="text-center pb-2">
        <div className="text-4xl mb-3">🤝</div>
        <h2 className="text-2xl font-black text-brand-text">Canción para amigos</h2>
        <p className="text-brand-muted text-sm mt-1">Contanos sobre el grupo y la historia</p>
      </div>

      <div>
        <label className="label-field">
          Nombre del grupo o personas involucradas *
        </label>
        <input
          type="text"
          className="input-field"
          placeholder='Ej: "Los pibes del barrio", "Marta, Lucía y Sofi"...'
          value={data.groupName}
          onChange={e => onChange({ groupName: e.target.value })}
          autoFocus
        />
      </div>

      <div>
        <label className="label-field">Tipo de canción *</label>
        <div className="grid grid-cols-2 gap-2">
          {FRIENDS_SONG_TYPES.map(t => (
            <button
              key={t.id}
              type="button"
              onClick={() => onChange({ friendsSongType: t.id })}
              className={`flex items-center gap-2 p-3 rounded-2xl border-2 transition-all duration-200 text-left ${
                data.friendsSongType === t.id
                  ? 'border-brand-primary bg-brand-primary-light shadow-warm'
                  : 'border-brand-border bg-white hover:border-brand-primary/40'
              }`}
            >
              <span className="text-xl">{t.icon}</span>
              <span className={`text-sm font-semibold ${data.friendsSongType === t.id ? 'text-brand-primary' : 'text-brand-text'}`}>
                {t.label}
              </span>
            </button>
          ))}
        </div>
        {data.friendsSongType === 'otro' && (
          <div className="mt-2">
            <input
              ref={otherRef}
              type="text"
              className="input-field"
              placeholder="Contanos qué tipo de canción querés..."
              value={data.friendsSongTypeOther}
              onChange={e => onChange({ friendsSongTypeOther: e.target.value })}
            />
          </div>
        )}
      </div>

      <div>
        <label className="label-field">
          Historia del grupo{' '}
          <span className="font-normal text-brand-muted">(opcional)</span>
        </label>
        <textarea
          className="textarea-field"
          placeholder="Ej: Nos conocimos en el colegio en 2005, desde ahí nos juntamos todos los viernes..."
          value={data.groupHistory}
          onChange={e => onChange({ groupHistory: e.target.value })}
          rows={3}
        />
      </div>

      <div>
        <label className="label-field">
          Chistes internos o frases típicas{' '}
          <span className="font-normal text-brand-muted">(opcional)</span>
        </label>
        <textarea
          className="textarea-field"
          placeholder='Ej: Siempre decimos "dale que va", "el famoso asado de Pedro"...'
          value={data.insideJokes}
          onChange={e => onChange({ insideJokes: e.target.value })}
          rows={3}
        />
      </div>

      <div>
        <label className="label-field">
          Momentos memorables{' '}
          <span className="font-normal text-brand-muted">(opcional)</span>
        </label>
        <textarea
          className="textarea-field"
          placeholder="Ej: El viaje a Bariloche, la vez que nos perdimos en la ruta..."
          value={data.memorableMoments}
          onChange={e => onChange({ memorableMoments: e.target.value })}
          rows={3}
        />
      </div>

      <div>
        <label className="label-field">
          Personalidades del grupo{' '}
          <span className="font-normal text-brand-muted">(opcional)</span>
        </label>
        <textarea
          className="textarea-field"
          placeholder='Ej: Pedro es el gracioso, Lucía la organizada, Martín siempre llega tarde...'
          value={data.personalities}
          onChange={e => onChange({ personalities: e.target.value })}
          rows={3}
        />
      </div>

      <div>
        <label className="label-field">Tono *</label>
        <div className="flex flex-wrap gap-2">
          {FRIENDS_TONES.map(t => (
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
          Información adicional{' '}
          <span className="font-normal text-brand-muted">(opcional)</span>
        </label>
        <textarea
          className="textarea-field"
          placeholder="Algo más que nos quieras contar sobre el grupo..."
          value={data.additionalInfo}
          onChange={e => onChange({ additionalInfo: e.target.value })}
          rows={3}
        />
      </div>
    </div>
  );
}
