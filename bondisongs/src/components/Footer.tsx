import { Music2, Heart } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-brand-text text-white/60 py-10 px-5">
      <div className="max-w-lg mx-auto">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-8 h-8 bg-gradient-warm rounded-xl flex items-center justify-center shadow-warm">
            <Music2 size={16} className="text-white" strokeWidth={2.5} />
          </div>
          <span className="font-bold text-lg text-white tracking-tight">
            Bondi<span className="text-brand-primary">Songs</span>
          </span>
        </div>

        <p className="text-sm leading-relaxed mb-6 text-white/50">
          Canciones personalizadas para niños, creadas con amor a partir de recuerdos reales.
          Cada canción es única, como ellos.
        </p>

        <div className="border-t border-white/10 pt-6 flex flex-col gap-2">
          <div className="flex items-center gap-1 text-xs text-white/40">
            Hecho con <Heart size={12} className="text-brand-primary fill-brand-primary mx-0.5" /> para familias que aman de verdad
          </div>
          <div className="text-xs text-white/30">
            © {new Date().getFullYear()} BondiSongs · Todos los derechos reservados
          </div>
        </div>
      </div>
    </footer>
  );
}
