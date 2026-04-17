import { SongRequestForm } from '../../../lib/types';

interface Props {
  data: SongRequestForm;
  onChange: (updates: Partial<SongRequestForm>) => void;
}

export default function StepRecipient({ data, onChange }: Props) {
  return (
    <div className="space-y-5">
      <div className="text-center pb-2">
        <div className="text-4xl mb-3">👦</div>
        <h2 className="text-2xl font-black text-brand-text">¿Para quién es la canción?</h2>
        <p className="text-brand-muted text-sm mt-1">Contanos sobre esta persona</p>
      </div>

      <div>
        <label className="label-field">
          Nombre de esta persona especial{' '}
          <span className="font-normal text-brand-muted">(opcional)</span>
        </label>
        <input
          type="text"
          className="input-field"
          placeholder="Ej: Sofía, Mateo..."
          value={data.childName}
          onChange={e => onChange({ childName: e.target.value })}
          autoFocus
        />
      </div>

      <div>
        <label className="label-field">
          Apodo o sobrenombre{' '}
          <span className="font-normal text-brand-muted">(opcional)</span>
        </label>
        <input
          type="text"
          className="input-field"
          placeholder="Ej: Sofi, Mate, Peque..."
          value={data.nickname}
          onChange={e => onChange({ nickname: e.target.value })}
        />
      </div>

      <div>
        <label className="label-field">
          Edad o fecha de cumpleaños{' '}
          <span className="font-normal text-brand-muted">(opcional)</span>
        </label>
        <input
          type="text"
          className="input-field"
          placeholder="Ej: 4 años, 15 de marzo..."
          value={data.ageOrBirthday}
          onChange={e => onChange({ ageOrBirthday: e.target.value })}
        />
      </div>

      <div className="bg-brand-surface rounded-2xl p-4 border border-brand-border">
        <div className="flex items-center justify-between">
          <div>
            <div className="font-semibold text-brand-text text-sm">¿Su nombre en la canción?</div>
            <div className="text-xs text-brand-muted mt-0.5">Le agrega un toque muy especial</div>
          </div>
          <button
            type="button"
            onClick={() => onChange({ nameInSong: !data.nameInSong })}
            className={`relative w-14 h-7 rounded-full transition-all duration-300 ${
              data.nameInSong ? 'bg-brand-primary' : 'bg-brand-border'
            }`}
          >
            <div
              className={`absolute top-0.5 left-0.5 w-6 h-6 bg-white rounded-full shadow-card transition-transform duration-300 ${
                data.nameInSong ? 'translate-x-7' : 'translate-x-0'
              }`}
            />
          </button>
        </div>
      </div>

      <p className="text-center text-xs text-brand-muted/70">
        Con eso ya podemos crear algo hermoso ✨
      </p>
    </div>
  );
}
