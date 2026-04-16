import { Play, ArrowDown } from 'lucide-react';
import PhoneMockup from './PhoneMockup';

interface HeroProps {
  onCTAClick: () => void;
}

export default function Hero({ onCTAClick }: HeroProps) {
  return (
    <section className="relative min-h-screen bg-brand-bg overflow-hidden pt-16">
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute -top-32 -right-32 w-80 h-80 rounded-full opacity-20"
          style={{ background: 'radial-gradient(circle, #F9C846 0%, transparent 70%)' }}
        />
        <div
          className="absolute top-1/2 -left-24 w-64 h-64 rounded-full opacity-15"
          style={{ background: 'radial-gradient(circle, #E8633A 0%, transparent 70%)' }}
        />
        <div
          className="absolute bottom-0 right-0 w-96 h-96 rounded-full opacity-10"
          style={{ background: 'radial-gradient(circle, #3ABDE8 0%, transparent 70%)' }}
        />
      </div>

      <div className="relative max-w-lg mx-auto px-5 pt-12 pb-20">

        <h1 className="text-4xl font-black leading-[1.1] text-brand-text mb-4 animate-[fadeUp_0.5s_ease-out_0.2s_both]">
          Una canción única{' '}
          <span className="text-gradient">para alguien</span>{' '}
          <span className="text-gradient">único</span>
        </h1>

        <p className="text-lg text-brand-muted leading-relaxed mb-8 animate-[fadeUp_0.5s_ease-out_0.3s_both]">
          Transformamos sus recuerdos, nombre y personalidad en una canción que emocionará a toda la familia.
          El regalo más especial que van a escuchar toda la vida.
        </p>

        <div className="flex flex-col gap-3 mb-10 animate-[fadeUp_0.5s_ease-out_0.4s_both]">
          <button
            onClick={onCTAClick}
            className="btn-primary flex items-center justify-center gap-3 w-full text-lg py-5"
          >
            <Play size={20} className="fill-white" />
            Crear mi canción personalizada
          </button>
          <p className="text-center text-sm text-brand-muted">
            Te va a llevar menos de 3 minutos — sin tarjeta, sin complicaciones
          </p>
        </div>

        <div className="animate-[fadeUp_0.5s_ease-out_0.5s_both]">
          <PhoneMockup />
        </div>

        <div className="flex justify-center mt-10 animate-[fadeUp_0.5s_ease-out_0.7s_both]">
          <a
            href="#como-funciona"
            className="flex flex-col items-center gap-1 text-brand-muted/60 hover:text-brand-muted transition-colors"
          >
            <span className="text-xs">Ver cómo funciona</span>
            <ArrowDown size={16} className="animate-bounce" />
          </a>
        </div>
      </div>
    </section>
  );
}
