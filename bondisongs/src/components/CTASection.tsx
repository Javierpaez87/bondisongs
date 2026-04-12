import { Sparkles } from 'lucide-react';

interface CTASectionProps {
  onCTAClick: () => void;
}

export default function CTASection({ onCTAClick }: CTASectionProps) {
  return (
    <section className="section-pad bg-white">
      <div className="max-w-lg mx-auto">
        <div className="relative bg-gradient-to-br from-brand-primary to-brand-primary-dark rounded-4xl overflow-hidden p-8 text-center">
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <div
              className="absolute -top-16 -right-16 w-48 h-48 rounded-full opacity-20"
              style={{ background: 'radial-gradient(circle, #F9C846 0%, transparent 70%)' }}
            />
            <div
              className="absolute -bottom-12 -left-12 w-40 h-40 rounded-full opacity-15"
              style={{ background: 'radial-gradient(circle, white 0%, transparent 70%)' }}
            />
          </div>

          <div className="relative">
            <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-3xl flex items-center justify-center mx-auto mb-5 border border-white/30">
              <Sparkles size={28} className="text-white" />
            </div>

            <h2 className="text-3xl font-black text-white mb-3 leading-tight">
              ¿Listo para crear algo hermoso?
            </h2>

            <p className="text-white/80 mb-6 leading-relaxed">
              En menos de 3 minutos nos contás sobre el nene o nena.
              Nosotros hacemos el resto.
            </p>

            <button
              onClick={onCTAClick}
              className="w-full bg-white text-brand-primary font-bold rounded-2xl py-5 text-lg
                hover:bg-brand-primary-light active:scale-[0.97] transition-all duration-200
                shadow-warm-lg"
            >
              Empezar ahora — es muy fácil
            </button>

            <p className="text-white/60 text-sm mt-4">
              Sin complicaciones · Te contactamos por WhatsApp
            </p>

            <div className="flex justify-center gap-6 mt-6">
              {['💛 Sin tarjeta', '⚡ Rápido', '🔒 Privado'].map((item, i) => (
                <span key={i} className="text-white/70 text-xs font-medium">{item}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
