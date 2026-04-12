export interface SongRequestForm {
  childName: string;
  nickname: string;
  ageOrBirthday: string;
  nameInSong: boolean;
  occasion: string;
  interests: string[];
  memoryText: string;
  importantPeople: string;
  musicStyle: string;
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
  interests: [],
  memoryText: '',
  importantPeople: '',
  musicStyle: '',
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
  { id: 'other', label: 'Sorprendeme', icon: '✨', desc: 'Dejaré que fluya la música' },
];
