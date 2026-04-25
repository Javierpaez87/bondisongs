import {
  UnifiedFormData,
  CATEGORIES,
  OCCASIONS,
  MUSIC_STYLES,
  MUSIC_STYLES_EXTRA,
  EDUCATION_LEVELS,
  EDUCATION_OBJECTIVES,
  EDUCATION_TONES,
  PARENTING_OBJECTIVES,
  PARENTING_TONES,
  FRIENDS_SONG_TYPES,
  FRIENDS_TONES,
  ENERGY_OPTIONS,
  VOICE_OPTIONS,
  MOOD_OPTIONS,
  TEMPO_OPTIONS,
} from '../../../lib/types';

interface Props {
  data: UnifiedFormData;
}

function findLabel(options: { id: string; label: string }[], id: string): string {
  return options.find(o => o.id === id)?.label ?? id;
}

interface SummaryItem {
  label: string;
  value: string;
  icon: string;
}

function getCategorySummary(data: UnifiedFormData): SummaryItem[] {
  const items: SummaryItem[] = [];
  const cat = CATEGORIES.find(c => c.id === data.category);
  items.push({ label: 'Categoría', value: cat?.label ?? data.category, icon: cat?.icon ?? '🎵' });

  switch (data.category) {
    case 'education': {
      const ed = data.education;
      if (ed.educationLevel) items.push({ label: 'Nivel', value: findLabel(EDUCATION_LEVELS, ed.educationLevel), icon: '🎓' });
      if (ed.topic) items.push({ label: 'Tema', value: ed.topic, icon: '📖' });
      if (ed.objective) items.push({ label: 'Objetivo', value: findLabel(EDUCATION_OBJECTIVES, ed.objective), icon: '🎯' });
      if (ed.tone) items.push({ label: 'Tono', value: findLabel(EDUCATION_TONES, ed.tone), icon: '🎭' });
      break;
    }
    case 'parenting': {
      const p = data.parenting;
      if (p.childNameParenting) items.push({ label: 'Para', value: `${p.childNameParenting}${p.childAge ? ` (${p.childAge})` : ''}`, icon: '👶' });
      if (p.parentingObjective) {
        const objLabel = p.parentingObjective === 'otro' && p.parentingObjectiveOther
          ? p.parentingObjectiveOther
          : findLabel(PARENTING_OBJECTIVES, p.parentingObjective);
        items.push({ label: 'Objetivo', value: objLabel, icon: '🎯' });
      }
      if (p.tone) items.push({ label: 'Tono', value: findLabel(PARENTING_TONES, p.tone), icon: '🎭' });
      break;
    }
    case 'birthday': {
      const b = data.birthday;
      if (b.childName) items.push({ label: 'Para', value: `${b.childName}${b.nickname ? ` (${b.nickname})` : ''}`, icon: '👦' });
      if (b.occasion) {
        const occLabel = b.occasion === 'other' && b.occasionOther
          ? b.occasionOther
          : (OCCASIONS.find(o => o.id === b.occasion)?.label ?? b.occasion);
        items.push({ label: 'Ocasión', value: occLabel, icon: '🎉' });
      }
      if (b.interests.length > 0) {
        items.push({ label: 'Le gusta', value: b.interests.slice(0, 4).join(', ') + (b.interests.length > 4 ? '...' : ''), icon: '⭐' });
      }
      break;
    }
    case 'friends': {
      const f = data.friends;
      if (f.groupName) items.push({ label: 'Grupo', value: f.groupName, icon: '👯' });
      if (f.friendsSongType) {
        const typeLabel = f.friendsSongType === 'otro' && f.friendsSongTypeOther
          ? f.friendsSongTypeOther
          : findLabel(FRIENDS_SONG_TYPES, f.friendsSongType);
        items.push({ label: 'Tipo', value: typeLabel, icon: '🎤' });
      }
      if (f.tone) items.push({ label: 'Tono', value: findLabel(FRIENDS_TONES, f.tone), icon: '🎭' });
      break;
    }
    case 'other': {
      const o = data.other;
      if (o.songType) items.push({ label: 'Tipo', value: o.songType, icon: '🎤' });
      if (o.songTarget) items.push({ label: 'Para', value: o.songTarget, icon: '🎯' });
      if (o.tone) items.push({ label: 'Tono', value: o.tone, icon: '🎭' });
      break;
    }
  }

  const allStyles = [...MUSIC_STYLES, ...MUSIC_STYLES_EXTRA];
  if (data.musicStyle) {
    const st = allStyles.find(s => s.id === data.musicStyle);
    items.push({ label: 'Estilo', value: st?.label ?? data.musicStyle, icon: '🎸' });
  }

  const sp = data.stylePrompt;
  const soundParts: string[] = [];
  if (sp.energy) soundParts.push(findLabel(ENERGY_OPTIONS, sp.energy));
  if (sp.mood) soundParts.push(findLabel(MOOD_OPTIONS, sp.mood));
  if (sp.tempo) soundParts.push(findLabel(TEMPO_OPTIONS, sp.tempo));
  if (sp.voice) soundParts.push(`Voz ${findLabel(VOICE_OPTIONS, sp.voice).toLowerCase()}`);
  if (soundParts.length > 0) {
    items.push({ label: 'Sonido', value: soundParts.join(' · '), icon: '🎛️' });
  }

  items.push({ label: 'Contacto', value: `${data.adultName} · ${data.whatsapp}`, icon: '📲' });

  return items.filter(item => item.value);
}

function getMemoryText(data: UnifiedFormData): string {
  switch (data.category) {
    case 'birthday': return data.birthday.memoryText;
    case 'parenting': return data.parenting.situation;
    case 'friends': return data.friends.memorableMoments;
    case 'other': return data.other.context;
    case 'education': return data.education.additionalInfo;
    default: return '';
  }
}

export default function StepConfirmationUnified({ data }: Props) {
  const summaryItems = getCategorySummary(data);
  const memoryText = getMemoryText(data);

  return (
    <div className="space-y-5">
      <div className="text-center pb-2">
        <div className="text-5xl mb-3 animate-bounce">🎵</div>
        <h2 className="text-2xl font-black text-brand-text">Ya casi esta!</h2>
        <p className="text-brand-muted text-sm mt-1">
          Revisa el resumen y confirma tu pedido
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

      {memoryText && (
        <div className="bg-white rounded-3xl p-4 border border-brand-border shadow-card">
          <div className="text-xs font-semibold text-brand-muted uppercase tracking-wide mb-2">
            {data.category === 'education' ? 'Info adicional' :
             data.category === 'friends' ? 'Momentos memorables' :
             data.category === 'other' ? 'Contexto' :
             data.category === 'parenting' ? 'Situación' : 'Recuerdo especial'}
          </div>
          <p className="text-sm text-brand-text leading-relaxed italic">
            &ldquo;{memoryText.slice(0, 200)}{memoryText.length > 200 ? '...' : ''}&rdquo;
          </p>
        </div>
      )}

      <div className="text-center space-y-1">
        <p className="text-xs text-brand-muted">
          Al enviar, aceptas que te contactemos por WhatsApp para avanzar con tu cancion.
        </p>
      </div>
    </div>
  );
}
