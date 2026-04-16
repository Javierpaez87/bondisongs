import { Music2, Heart, MessageCircle } from 'lucide-react';

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

        <p className="text-sm leading-relaxed mb-4 text-white/50">
          Canciones personalizadas para niños, creadas con amor a partir de recuerdos reales.
          Cada canción es única, como ellos.
        </p>

        <a
          href="https://wa.me/5493517631693?text=Hola%20te%20contacto%20desde%20BondiSongs!"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 bg-[#25D366] hover:bg-[#1ebe5d] transition-colors rounded-2xl px-4 py-3 mb-6 group"
        >
          <MessageCircle size={20} className="text-white flex-shrink-0" />
          <span className="text-white text-sm font-semibold leading-tight">
            ¿Buscás una canción para un casamiento, un amigo o algo especial? hagamos esa canción juntos!
          </span>
        </a>

        <div className="border-t border-white/10 pt-6 flex flex-col gap-2">
          <div className="flex items-center gap-1 text-xs text-white/40">
            Hecho con <Heart size={12} className="text-brand-primary fill-brand-primary mx-0.5" /> para familias que aman de verdad
          </div>
          <div className="text-xs text-white/30">
            © 2026 BondiSongs by BondiApps · Todos los derechos reservados
          </div>
        </div>
      </div>
    </footer>
  );
}
