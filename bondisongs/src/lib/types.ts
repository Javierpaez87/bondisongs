// ─── Categories ───────────────────────────────────────────────────
export type SongCategory = 'education' | 'parenting' | 'birthday' | 'friends' | 'other';

export interface CategoryOption {
  id: SongCategory;
  label: string;
  description: string;
  icon: string;
}

export const CATEGORIES: CategoryOption[] = [
  { id: 'education', label: 'Educación', description: 'Canciones para enseñar, explicar o reforzar contenidos de forma divertida.', icon: '📚' },
  { id: 'parenting', label: 'Parenting / Crianza', description: 'Canciones para rutinas, hábitos, sueño, emociones o momentos cotidianos con chicos.', icon: '🍼' },
  { id: 'birthday', label: 'Cumpleaños / Regalos', description: 'Canciones personalizadas para homenajear a una persona en una fecha especial.', icon: '🎂' },
  { id: 'friends', label: 'Amigos / Amigas', description: 'Canciones para grupos, juntadas, viajes, recuerdos, chistes internos o amistades.', icon: '🤝' },
  { id: 'other', label: 'Otros', description: 'Contanos qué necesitás y armamos una canción a medida.', icon: '✨' },
];

// ─── Education fields ─────────────────────────────────────────────
export interface EducationFields {
  educationLevel: string;
  studentAge: string;
  topic: string;
  objective: string;
  tone: string;
  wordsToInclude: string;
  wordsToAvoid: string;
  desiredDuration: string;
  additionalInfo: string;
}

export const defaultEducationFields: EducationFields = {
  educationLevel: '',
  studentAge: '',
  topic: '',
  objective: '',
  tone: '',
  wordsToInclude: '',
  wordsToAvoid: '',
  desiredDuration: '',
  additionalInfo: '',
};

export const EDUCATION_LEVELS = [
  { id: 'jardin', label: 'Jardín (2-5 años)', icon: '🧒' },
  { id: 'primaria', label: 'Primaria (6-13 años)', icon: '📖' },
  { id: 'secundaria', label: 'Secundaria (13-18 años)', icon: '🎓' },
  { id: 'otro', label: 'Otro', icon: '📝' },
];

export const EDUCATION_OBJECTIVES = [
  { id: 'memorizar', label: 'Memorizar', icon: '🧠' },
  { id: 'explicar', label: 'Explicar', icon: '💡' },
  { id: 'motivar', label: 'Motivar', icon: '🚀' },
  { id: 'practicar', label: 'Practicar', icon: '✏️' },
  { id: 'presentar', label: 'Presentar un tema', icon: '🎤' },
];

export const EDUCATION_TONES = [
  { id: 'divertido', label: 'Divertido', icon: '😄' },
  { id: 'tierno', label: 'Tierno', icon: '🥰' },
  { id: 'energetico', label: 'Energético', icon: '⚡' },
  { id: 'tranquilo', label: 'Tranquilo', icon: '😌' },
  { id: 'epico', label: 'Épico', icon: '🏆' },
];

// ─── Parenting fields ─────────────────────────────────────────────
export interface ParentingFields {
  childNameParenting: string;
  childAge: string;
  parentingObjective: string;
  parentingObjectiveOther: string;
  situation: string;
  tone: string;
  familiarPhrases: string;
  wordsToAvoid: string;
  desiredDuration: string;
  additionalInfo: string;
}

export const defaultParentingFields: ParentingFields = {
  childNameParenting: '',
  childAge: '',
  parentingObjective: '',
  parentingObjectiveOther: '',
  situation: '',
  tone: '',
  familiarPhrases: '',
  wordsToAvoid: '',
  desiredDuration: '',
  additionalInfo: '',
};

export const PARENTING_OBJECTIVES = [
  { id: 'dormir', label: 'Dormir', icon: '🌙' },
  { id: 'comer', label: 'Comer', icon: '🍽️' },
  { id: 'ordenar', label: 'Ordenar', icon: '🧹' },
  { id: 'chupete', label: 'Dejar chupete', icon: '🍼' },
  { id: 'jardin', label: 'Ir al jardín', icon: '🏫' },
  { id: 'banarse', label: 'Bañarse', icon: '🛁' },
  { id: 'calmarse', label: 'Calmarse', icon: '🧘' },
  { id: 'emociones', label: 'Emociones', icon: '💛' },
  { id: 'otro', label: 'Otro', icon: '✨' },
];

export const PARENTING_TONES = [
  { id: 'dulce', label: 'Dulce', icon: '🥰' },
  { id: 'tranquilo', label: 'Tranquilo', icon: '😌' },
  { id: 'divertido', label: 'Divertido', icon: '😄' },
  { id: 'motivador', label: 'Motivador', icon: '💪' },
  { id: 'relajante', label: 'Relajante', icon: '🎐' },
];

// ─── Friends fields ───────────────────────────────────────────────
export interface FriendsFields {
  groupName: string;
  friendsSongType: string;
  friendsSongTypeOther: string;
  groupHistory: string;
  insideJokes: string;
  memorableMoments: string;
  personalities: string;
  tone: string;
  wordsToAvoid: string;
  desiredDuration: string;
  additionalInfo: string;
}

export const defaultFriendsFields: FriendsFields = {
  groupName: '',
  friendsSongType: '',
  friendsSongTypeOther: '',
  groupHistory: '',
  insideJokes: '',
  memorableMoments: '',
  personalities: '',
  tone: '',
  wordsToAvoid: '',
  desiredDuration: '',
  additionalInfo: '',
};

export const FRIENDS_SONG_TYPES = [
  { id: 'grupo', label: 'Grupo de amigos', icon: '👯' },
  { id: 'despedida', label: 'Despedida', icon: '✈️' },
  { id: 'viaje', label: 'Viaje', icon: '🗺️' },
  { id: 'juntada', label: 'Juntada', icon: '🍕' },
  { id: 'aniversario', label: 'Aniversario de amistad', icon: '🎉' },
  { id: 'chiste', label: 'Chiste interno', icon: '😂' },
  { id: 'otro', label: 'Otro', icon: '✨' },
];

export const FRIENDS_TONES = [
  { id: 'gracioso', label: 'Gracioso', icon: '😂' },
  { id: 'emotivo', label: 'Emotivo', icon: '🥲' },
  { id: 'nostalgico', label: 'Nostálgico', icon: '📷' },
  { id: 'fiestero', label: 'Fiestero', icon: '🎉' },
  { id: 'epico', label: 'Épico', icon: '🏆' },
];

// ─── Other category fields ────────────────────────────────────────
export interface OtherFields {
  songType: string;
  songTarget: string;
  context: string;
  tone: string;
  importantDetails: string;
  wordsToAvoid: string;
  desiredDuration: string;
  additionalInfo: string;
}

export const defaultOtherFields: OtherFields = {
  songType: '',
  songTarget: '',
  context: '',
  tone: '',
  importantDetails: '',
  wordsToAvoid: '',
  desiredDuration: '',
  additionalInfo: '',
};

// ─── Shared style/prompt fields ───────────────────────────────────
export interface StylePromptFields {
  energy: string;
  voice: string;
  mood: string;
  tempo: string;
  soundCharacter: string;
}

export const defaultStylePromptFields: StylePromptFields = {
  energy: '',
  voice: '',
  mood: '',
  tempo: '',
  soundCharacter: '',
};

export const ENERGY_OPTIONS = [
  { id: 'baja', label: 'Baja', icon: '🌊' },
  { id: 'media', label: 'Media', icon: '🌤️' },
  { id: 'alta', label: 'Alta', icon: '🔥' },
];

export const VOICE_OPTIONS = [
  { id: 'masculina', label: 'Masculina', icon: '🎙️' },
  { id: 'femenina', label: 'Femenina', icon: '🎤' },
  { id: 'infantil', label: 'Infantil', icon: '👶' },
  { id: 'coro', label: 'Grupo / Coro', icon: '🎶' },
  { id: 'indistinta', label: 'Indistinta', icon: '🎵' },
];

export const MOOD_OPTIONS = [
  { id: 'alegre', label: 'Alegre', icon: '😄' },
  { id: 'tierno', label: 'Tierno', icon: '🥰' },
  { id: 'epico', label: 'Épico', icon: '🏆' },
  { id: 'relajado', label: 'Relajado', icon: '😌' },
  { id: 'bailable', label: 'Bailable', icon: '💃' },
  { id: 'emotivo', label: 'Emotivo', icon: '🥲' },
  { id: 'gracioso', label: 'Gracioso', icon: '😂' },
];

export const TEMPO_OPTIONS = [
  { id: 'lento', label: 'Lento', icon: '🐢' },
  { id: 'medio', label: 'Medio', icon: '🚶' },
  { id: 'rapido', label: 'Rápido', icon: '🐇' },
];

export const SOUND_CHARACTER_OPTIONS = [
  { id: 'infantil', label: 'Infantil', icon: '🧒' },
  { id: 'adulto', label: 'Adulto', icon: '🧑' },
  { id: 'educativo', label: 'Educativo', icon: '📚' },
  { id: 'emotivo', label: 'Emotivo', icon: '💛' },
  { id: 'fiestero', label: 'Fiestero', icon: '🎊' },
  { id: 'institucional', label: 'Institucional', icon: '🏛️' },
];

export const DURATION_OPTIONS = [
  { id: '30-60', label: '30–60 seg' },
  { id: '60-90', label: '1–1:30 min' },
  { id: '90-120', label: '1:30–2 min' },
  { id: '120-180', label: '2–3 min' },
  { id: '180+', label: 'Más de 3 min' },
];

// ─── Original birthday/gifts form (preserved) ────────────────────
export interface SongRequestForm {
  childName: string;
  nickname: string;
  ageOrBirthday: string;
  nameInSong: boolean;
  occasion: string;
  occasionOther: string;
  interests: string[];
  memoryText: string;
  importantPeople: string;
  musicStyle: string;
  instruments: string[];
  adultName: string;
  whatsapp: string;
  email: string;
}

export const defaultFormData: SongRequestForm = {
  childName: '',
  nickname: '',
  ageOrBirthday: '',
  nameInSong: true,
  occasion: '',
  occasionOther: '',
  interests: [],
  memoryText: '',
  importantPeople: '',
  musicStyle: '',
  instruments: [],
  adultName: '',
  whatsapp: '',
  email: '',
};

// ─── Unified form data combining all categories ──────────────────
export interface UnifiedFormData {
  category: SongCategory;
  birthday: SongRequestForm;
  education: EducationFields;
  parenting: ParentingFields;
  friends: FriendsFields;
  other: OtherFields;
  stylePrompt: StylePromptFields;
  musicStyle: string;
  instruments: string[];
  adultName: string;
  whatsapp: string;
  email: string;
}

export const defaultUnifiedFormData: UnifiedFormData = {
  category: 'birthday',
  birthday: { ...defaultFormData },
  education: { ...defaultEducationFields },
  parenting: { ...defaultParentingFields },
  friends: { ...defaultFriendsFields },
  other: { ...defaultOtherFields },
  stylePrompt: { ...defaultStylePromptFields },
  musicStyle: '',
  instruments: [],
  adultName: '',
  whatsapp: '',
  email: '',
};

// ─── Original constants (preserved) ──────────────────────────────
export const OCCASIONS = [
  { id: 'birthday', label: 'Cumpleaños', icon: '🎂' },
  { id: 'birth', label: 'Nacimiento', icon: '👶' },
  { id: 'sleep', label: 'Para dormir', icon: '🌙' },
  { id: 'special', label: 'Regalo especial', icon: '🎁' },
  { id: 'other', label: 'Otra', icon: '✨' },
];

export const INTERESTS = [
  'Fútbol', 'Dinosaurios', 'Princesas', 'Animales', 'Bicicleta',
  'Música', 'Dibujar', 'Nieve', 'Mar', 'Superhéroes',
  'Naves espaciales', 'Mariposas', 'Trenes', 'Cocinar', 'Bailar',
  'Libros', 'Perros', 'Gatos', 'Caballos', 'Natación',
];

export const MUSIC_STYLES = [
  { id: 'fun', label: 'Alegre y divertida', icon: '🎉', desc: 'Ritmo pegadizo y energía' },
  { id: 'sweet', label: 'Dulce y tierna', icon: '💛', desc: 'Melodía cálida y emocional' },
  { id: 'sleep', label: 'Suave para dormir', icon: '🌙', desc: 'Tranquila, para arrullar' },
  { id: 'acoustic', label: 'Acústica / Fogón', icon: '🎸', desc: 'Simple, con guitarra' },
];

export const MUSIC_STYLES_EXTRA = [
  { id: 'surprise', label: 'Sorprendeme', icon: '✨', desc: 'Que el artista elija el estilo ideal' },
  { id: 'dance', label: 'Movida / Bailable', icon: '🕺', desc: 'Para bailar, ritmo arriba' },
  { id: 'pop', label: 'Pop moderna', icon: '🎤', desc: 'Sonido actual, tipo radio' },
  { id: 'folk', label: 'Folk / Campestre', icon: '🌿', desc: 'Estilo naturaleza, simple y orgánico' },
  { id: 'emotional', label: 'Emotiva / Profunda', icon: '🎹', desc: 'Más intensa, para emocionar fuerte' },
  { id: 'softrock', label: 'Rock suave', icon: '🎸', desc: 'Con energía pero amigable' },
  { id: 'fantasy', label: 'Fantasía / Mágica', icon: '🌈', desc: 'Clima de cuento, imaginativa' },
  { id: 'adventure', label: 'Aventura / Viaje', icon: '🚗', desc: 'Dinámica, sensación de movimiento' },
  { id: 'funny', label: 'Divertida / Graciosa', icon: '😂', desc: 'Con humor, medio juguetona' },
];

export const INSTRUMENT_GROUPS = [
  {
    label: 'Cuerdas suaves',
    icon: '🪕',
    items: ['Ukelele', 'Guitarra acústica', 'Charango', 'Piano', 'Violín'],
  },
  {
    label: 'Aire / melódicos',
    icon: '🌬️',
    items: ['Flauta', 'Silbidos', 'Vientos suaves'],
  },
  {
    label: 'Ritmo',
    icon: '🥁',
    items: ['Percusión suave', 'Palmas', 'Bombo legüero'],
  },
  {
    label: 'Más expresivos',
    icon: '🎺',
    items: ['Trompetas', 'Saxofón'],
  },
  {
    label: 'Otros',
    icon: '🎛️',
    items: ['Sonido lo-fi', 'Electrónica suave', 'Coros infantiles'],
  },
];
