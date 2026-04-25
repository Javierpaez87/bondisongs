import {
  UnifiedFormData,
  CATEGORIES,
  EDUCATION_LEVELS,
  EDUCATION_OBJECTIVES,
  EDUCATION_TONES,
  PARENTING_OBJECTIVES,
  PARENTING_TONES,
  FRIENDS_SONG_TYPES,
  FRIENDS_TONES,
  OCCASIONS,
  MUSIC_STYLES,
  MUSIC_STYLES_EXTRA,
  ENERGY_OPTIONS,
  VOICE_OPTIONS,
  MOOD_OPTIONS,
  TEMPO_OPTIONS,
  SOUND_CHARACTER_OPTIONS,
  DURATION_OPTIONS,
} from './types';

function label(options: { id: string; label: string }[], id: string): string {
  return options.find(o => o.id === id)?.label ?? id;
}

function durationLabel(id: string): string {
  return DURATION_OPTIONS.find(d => d.id === id)?.label ?? id;
}

export function generateLyricsPrompt(form: UnifiedFormData): string {
  const cat = CATEGORIES.find(c => c.id === form.category)!;
  const parts: string[] = [`Categoría: ${cat.label}`];

  switch (form.category) {
    case 'education': {
      const ed = form.education;
      parts.push(`Objetivo de la canción: ${label(EDUCATION_OBJECTIVES, ed.objective)}`);
      parts.push(`Nivel educativo: ${label(EDUCATION_LEVELS, ed.educationLevel)}`);
      if (ed.studentAge) parts.push(`Edad de estudiantes: ${ed.studentAge}`);
      parts.push(`Tema/contenido: ${ed.topic}`);
      parts.push(`Tono: ${label(EDUCATION_TONES, ed.tone)}`);
      if (ed.wordsToInclude) parts.push(`Palabras/conceptos que deben aparecer: ${ed.wordsToInclude}`);
      if (ed.wordsToAvoid) parts.push(`Palabras/temas a evitar: ${ed.wordsToAvoid}`);
      if (ed.desiredDuration) parts.push(`Duración deseada: ${durationLabel(ed.desiredDuration)}`);
      if (ed.additionalInfo) parts.push(`Info adicional: ${ed.additionalInfo}`);
      break;
    }
    case 'parenting': {
      const p = form.parenting;
      const obj = p.parentingObjective === 'otro' && p.parentingObjectiveOther
        ? p.parentingObjectiveOther
        : label(PARENTING_OBJECTIVES, p.parentingObjective);
      parts.push(`Objetivo: ${obj}`);
      if (p.childNameParenting) parts.push(`Nombre del niño/a: ${p.childNameParenting}`);
      if (p.childAge) parts.push(`Edad: ${p.childAge}`);
      if (p.situation) parts.push(`Situación/rutina: ${p.situation}`);
      parts.push(`Tono: ${label(PARENTING_TONES, p.tone)}`);
      if (p.familiarPhrases) parts.push(`Frases/apodos familiares: ${p.familiarPhrases}`);
      if (p.wordsToAvoid) parts.push(`Palabras/temas a evitar: ${p.wordsToAvoid}`);
      if (p.desiredDuration) parts.push(`Duración deseada: ${durationLabel(p.desiredDuration)}`);
      if (p.additionalInfo) parts.push(`Info adicional: ${p.additionalInfo}`);
      break;
    }
    case 'birthday': {
      const b = form.birthday;
      const occasionLabel = b.occasion === 'other' && b.occasionOther
        ? b.occasionOther
        : (OCCASIONS.find(o => o.id === b.occasion)?.label ?? b.occasion);
      parts.push(`Ocasión: ${occasionLabel}`);
      if (b.childName) parts.push(`Persona: ${b.childName}`);
      if (b.nickname) parts.push(`Apodo: ${b.nickname}`);
      if (b.ageOrBirthday) parts.push(`Edad/cumpleaños: ${b.ageOrBirthday}`);
      parts.push(`Incluir nombre en canción: ${b.nameInSong ? 'Sí' : 'No'}`);
      if (b.interests.length > 0) parts.push(`Intereses: ${b.interests.join(', ')}`);
      if (b.memoryText) parts.push(`Recuerdo/anécdota: ${b.memoryText}`);
      if (b.importantPeople) parts.push(`Personas importantes: ${b.importantPeople}`);
      const allStyles = [...MUSIC_STYLES, ...MUSIC_STYLES_EXTRA];
      const styleLabel = allStyles.find(s => s.id === form.musicStyle)?.label ?? form.musicStyle;
      parts.push(`Tono/estilo narrativo: ${styleLabel}`);
      break;
    }
    case 'friends': {
      const f = form.friends;
      parts.push(`Grupo/personas: ${f.groupName}`);
      const typeLabel = f.friendsSongType === 'otro' && f.friendsSongTypeOther
        ? f.friendsSongTypeOther
        : label(FRIENDS_SONG_TYPES, f.friendsSongType);
      parts.push(`Tipo de canción: ${typeLabel}`);
      parts.push(`Tono: ${label(FRIENDS_TONES, f.tone)}`);
      if (f.groupHistory) parts.push(`Historia del grupo: ${f.groupHistory}`);
      if (f.insideJokes) parts.push(`Chistes internos/frases: ${f.insideJokes}`);
      if (f.memorableMoments) parts.push(`Momentos memorables: ${f.memorableMoments}`);
      if (f.personalities) parts.push(`Personalidades: ${f.personalities}`);
      if (f.wordsToAvoid) parts.push(`Palabras/temas a evitar: ${f.wordsToAvoid}`);
      if (f.desiredDuration) parts.push(`Duración deseada: ${durationLabel(f.desiredDuration)}`);
      if (f.additionalInfo) parts.push(`Info adicional: ${f.additionalInfo}`);
      break;
    }
    case 'other': {
      const o = form.other;
      parts.push(`Tipo de canción: ${o.songType}`);
      parts.push(`Para quién/qué: ${o.songTarget}`);
      if (o.context) parts.push(`Contexto: ${o.context}`);
      if (o.tone) parts.push(`Tono: ${o.tone}`);
      if (o.importantDetails) parts.push(`Detalles importantes: ${o.importantDetails}`);
      if (o.wordsToAvoid) parts.push(`Palabras/temas a evitar: ${o.wordsToAvoid}`);
      if (o.desiredDuration) parts.push(`Duración deseada: ${durationLabel(o.desiredDuration)}`);
      if (o.additionalInfo) parts.push(`Info adicional: ${o.additionalInfo}`);
      break;
    }
  }

  return parts.join('\n');
}

export function generateStylePrompt(form: UnifiedFormData): string {
  const allStyles = [...MUSIC_STYLES, ...MUSIC_STYLES_EXTRA];
  const parts: string[] = [];

  if (form.musicStyle) {
    const s = allStyles.find(s => s.id === form.musicStyle);
    parts.push(`Género musical: ${s ? s.label : form.musicStyle}`);
  }

  const sp = form.stylePrompt;
  if (sp.energy) parts.push(`Energía: ${label(ENERGY_OPTIONS, sp.energy)}`);
  if (sp.voice) parts.push(`Voz sugerida: ${label(VOICE_OPTIONS, sp.voice)}`);
  if (form.instruments.length > 0) parts.push(`Instrumentación: ${form.instruments.join(', ')}`);
  if (sp.mood) parts.push(`Mood emocional: ${label(MOOD_OPTIONS, sp.mood)}`);
  if (sp.tempo) parts.push(`Tempo: ${label(TEMPO_OPTIONS, sp.tempo)}`);
  if (sp.soundCharacter) parts.push(`Carácter del sonido: ${label(SOUND_CHARACTER_OPTIONS, sp.soundCharacter)}`);

  const catLabel = CATEGORIES.find(c => c.id === form.category)?.label ?? form.category;
  parts.push(`Uso previsto: ${catLabel}`);

  return parts.join('\n');
}
