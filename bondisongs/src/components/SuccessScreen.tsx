import { useEffect, useState } from 'react';
import { CircleCheck as CheckCircle2, Music2 } from 'lucide-react';

interface SuccessScreenProps {
  onClose: () => void;
}

export default function SuccessScreen({ onClose }: SuccessScreenProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    const t = setTimeout(() => setVisible(true), 50);
    return () => {
      clearTimeout(t);
      document.body.style.overflow = '';
    };
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-brand-bg">
      <div
        className={`max-w-sm mx-auto px-6 text-center transition-all duration-700 ${
          visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
      >
        <div className="relative inline-flex mb-6">
          <div className="w-24 h-24 bg-gradient-warm rounded-full flex items-center justify-center shadow-warm-lg">
            <CheckCircle2 size={40} className="text-white" strokeWidth={2} />
          </div>
          <div className="absolute -top-2 -right-2 text-2xl animate-bounce">🎵</div>
          <div className="absolute -bottom-1 -left-3 text-xl animate-bounce" style={{ animationDelay: '0.2s' }}>✨</div>
        </div>

        <h1 className="text-3xl font-black text-brand-text mb-3 leading-tight">
          ¡Listo! Ya recibimos tu pedido
        </h1>

        <p className="text-brand-muted leading-relaxed mb-6">
          Te vamos a contactar por WhatsApp para avanzar con tu canción.
          En breve te llega un mensaje nuestro.
        </p>

        <div className="bg-white rounded-3xl p-5 shadow-card border border-brand-border mb-6 text-left space-y-3">
          {[
            { icon: '💬', text: 'Te escribimos por WhatsApp pronto' },
            { icon: '🎵', text: 'Creamos tu canción personalizada' },
            { icon: '🔗', text: 'Te enviamos el link privado para escucharla. Si te gusta, abonas.' },
            { icon: '⬇️', text: 'La descargás y la tenés para siempre. Es tuya.' },
          ].map((item, i) => (
            <div key={i} className="flex items-start gap-3">
              <div className="w-9 h-9 bg-brand-surface rounded-xl flex items-center justify-center text-lg flex-shrink-0 mt-0.5">
                {item.icon}
              </div>
              <span className="text-sm font-medium text-brand-text leading-relaxed">{item.text}</span>
            </div>
          ))}
        </div>

        <div className="bg-brand-secondary-light border border-brand-secondary/30 rounded-3xl p-4 mb-6 space-y-2">
          <p className="text-sm text-brand-text leading-relaxed">
            <span className="font-bold">Tiempo de entrega:</span> generalmente entre 24 y 48 horas.
            Te avisamos en cuanto esté lista.
          </p>
          <p className="text-sm text-brand-text leading-relaxed">
            <span className="font-bold">Precio:</span> $15.000 pesos.{' '}
            <span className="text-brand-primary font-semibold">Abonas solo si te gusta la canción.</span>
          </p>
        </div>

        <button
          onClick={onClose}
          className="w-full bg-brand-surface border-2 border-brand-border rounded-2xl py-4 text-brand-text font-semibold hover:border-brand-primary hover:bg-brand-primary-light transition-all duration-200 active:scale-[0.97] flex items-center justify-center gap-2"
        >
          <Music2 size={18} className="text-brand-primary" />
          Volver al inicio
        </button>
      </div>
    </div>
  );
}
