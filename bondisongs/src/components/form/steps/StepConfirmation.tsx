import { SongRequestForm, OCCASIONS, MUSIC_STYLES } from '../../../lib/types';

interface Props {
  data: SongRequestForm;
}

export default function StepConfirmation({ data }: Props) {
  const occasionLabel = OCCASIONS.find(o => o.id === data.occasion)?.label || data.occasion;
  const styleLabel = MUSIC_STYLES.find(s => s.id === data.musicStyle)?.label || data.musicStyle;

  const summaryItems = [
    { label: 'Para', value: `${data.childName}${data.nickname ? ` (${data.nickname})` : ''}`, icon: '👦' },
    { label: 'Ocasión', value: occasionLabel, icon: '🎉' },
    { label: 'Le gusta', value: data.interests.length > 0 ? data.interests.slice(0, 4).join(', ') + (data.interests.length > 4 ? '...' : '') : 'No especificado', icon: '⭐' },
    { label: 'Estilo', value: styleLabel, icon: '🎸' },
    { label: 'Contacto', value: `${data.adultName} · ${data.whatsapp}`, icon: '📲' },
  ].filter(item => item.value);

  return (
    <div className="space-y-5">
      <div className="text-center pb-2">
        <div className="text-5xl mb-3 animate-bounce">🎵</div>
        <h2 className="text-2xl font-black text-brand-text">¡Ya casi está!</h2>
        <p className="text-brand-muted text-sm mt-1">
          Revisá el resumen y confirmá tu pedido
        </p>
      </div>

      <div className="bg-gradient-to-br from-brand-primary-light to-brand-secondary-light rounded-3xl p-5 border border-brand-border space-y-3">
        {summaryItems.map((item, i) => (
          <div key={i} className="flex items-start gap-3">
            <div className="w-8 h-8 bg-white rounded-xl shadow-card flex items-center justify-center text-base flex-shrink-0">
              {item.icon}
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-xs font-semibold text-brand-muted uppercase tracking-wide">{item.label}</div>
              <div className="text-sm font-bold text-brand-text mt-0.5 break-words">{item.value}</div>
            </div>
          </div>
        ))}
      </div>

      {data.memoryText && (
        <div className="bg-white rounded-3xl p-4 border border-brand-border shadow-card">
          <div className="text-xs font-semibold text-brand-muted uppercase tracking-wide mb-2">Recuerdo especial</div>
          <p className="text-sm text-brand-text leading-relaxed italic">
            &ldquo;{data.memoryText.slice(0, 160)}{data.memoryText.length > 160 ? '...' : ''}&rdquo;
          </p>
        </div>
      )}

      <div className="text-center space-y-1">
        <p className="text-xs text-brand-muted">
          Al enviar, aceptás que te contactemos por WhatsApp para avanzar con tu canción.
        </p>
      </div>
    </div>
  );
}
