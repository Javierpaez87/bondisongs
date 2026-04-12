import { Star } from 'lucide-react';

const TESTIMONIALS = [
  {
    name: 'Ana García',
    role: 'Mamá de Mía, 5 años',
    avatar: '👩',
    stars: 5,
    quote: 'Me hizo llorar escucharla. Mi hija pide que la pongamos todos los días antes de dormir. El regalo más especial que le hice en su vida.',
    occasion: 'Cumpleaños',
    color: 'bg-brand-primary-light border-brand-primary/15',
  },
  {
    name: 'Carlos y Verónica',
    role: 'Papás de Tomás, recién nacido',
    avatar: '👨‍👩',
    stars: 5,
    quote: 'Le regalamos la canción el día que cumplió un mes. Fue tan emotivo que lo pusimos en el festejo y todos aplaudieron.',
    occasion: 'Nacimiento',
    color: 'bg-brand-accent-light border-brand-accent/15',
  },
  {
    name: 'Mirta Rodríguez',
    role: 'Abuela de Sofía y Luca',
    avatar: '👵',
    stars: 5,
    quote: 'No sabía qué regalarles para navidad. Esta idea fue un hallazgo. Me escribieron por WhatsApp y todo fue muy fácil y cálido.',
    occasion: 'Regalo de abuela',
    color: 'bg-brand-secondary-light border-brand-secondary/25',
  },
];

export default function Testimonials() {
  return (
    <section className="section-pad bg-brand-bg overflow-hidden">
      <div className="max-w-lg mx-auto">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 text-xs font-bold rounded-full px-4 py-1.5 mb-4 uppercase tracking-wider bg-white border border-brand-border shadow-card">
            Lo que dicen las familias
          </div>
          <h2 className="text-3xl font-black text-brand-text mb-3 leading-tight">
            Historias que nos llenan el corazón
          </h2>
        </div>

        <div className="space-y-4">
          {TESTIMONIALS.map((t, i) => (
            <div
              key={i}
              className={`${t.color} border rounded-3xl p-5`}
            >
              <div className="flex items-center gap-1 mb-3">
                {Array.from({ length: t.stars }).map((_, j) => (
                  <Star key={j} size={14} className="text-brand-secondary fill-brand-secondary" />
                ))}
              </div>
              <p className="text-brand-text text-sm leading-relaxed mb-4 font-medium">
                &ldquo;{t.quote}&rdquo;
              </p>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 bg-white rounded-full shadow-card flex items-center justify-center text-lg">
                    {t.avatar}
                  </div>
                  <div>
                    <div className="font-bold text-sm text-brand-text">{t.name}</div>
                    <div className="text-xs text-brand-muted">{t.role}</div>
                  </div>
                </div>
                <div className="text-xs bg-white rounded-full px-3 py-1 shadow-card border border-brand-border text-brand-muted font-medium">
                  {t.occasion}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 text-center">
          <div className="flex items-center justify-center gap-2">
            <div className="flex -space-x-2">
              {['👩', '👨', '👵', '👩‍🦱', '🧑'].map((a, i) => (
                <div
                  key={i}
                  className="w-8 h-8 bg-white rounded-full border-2 border-brand-border shadow-card flex items-center justify-center text-sm"
                >
                  {a}
                </div>
              ))}
            </div>
            <p className="text-sm text-brand-muted">
              <span className="font-bold text-brand-text">+500 familias</span> ya recibieron su canción
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
