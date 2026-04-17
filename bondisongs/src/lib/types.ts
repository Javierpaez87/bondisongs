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
