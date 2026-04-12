const OCCASIONS = [
  {
    icon: '🎂',
    title: 'Cumpleaños',
    desc: 'La sorpresa más emocionante del año. Cuando empiece a sonar, todos van a llorar de alegría.',
    color: 'bg-brand-primary-light border-brand-primary/20',
    badge: 'El más popular',
    badgeColor: 'bg-brand-primary text-white',
  },
  {
    icon: '👶',
    title: 'Nacimiento',
    desc: 'Una canción que le dé la bienvenida al mundo. El primer regalo que va a escuchar.',
    color: 'bg-brand-accent-light border-brand-accent/20',
    badge: null,
    badgeColor: '',
  },
  {
    icon: '🌙',
    title: 'Para dormir',
    desc: 'Una nana única con su nombre. Suave, cálida, perfecta para los momentos de dormir.',
    color: 'bg-brand-secondary-light border-brand-secondary/30',
    badge: null,
    badgeColor: '',
  },
  {
    icon: '🎁',
    title: 'Regalo de abuelos',
    desc: 'Que los abuelos les regalen algo que recuerden toda la vida. Esto es mucho más que un juguete.',
    color: 'bg-brand-surface border-brand-border',
    badge: null,
    badgeColor: '',
  },
  {
    icon: '✨',
    title: 'Sorpresa especial',
    desc: 'Porque no hace falta una razón especial para hacer sentir único a alguien que amás.',
    color: 'bg-white border-brand-border',
    badge: null,
    badgeColor: '',
  },
];

interface OccasionsProps {
  onCTAClick: () => void;
}

export default function Occasions({ onCTAClick }: OccasionsProps) {
  return (
    <section className="section-pad bg-brand-bg">
      <div className="max-w-lg mx-auto">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 bg-brand-secondary-light text-brand-text text-xs font-bold rounded-full px-4 py-1.5 mb-4 uppercase tracking-wider border border-brand-secondary/30">
            Para cada momento
          </div>
          <h2 className="text-3xl font-black text-brand-text mb-3 leading-tight">
            ¿Cuándo regalar una canción?
          </h2>
          <p className="text-brand-muted">
            No hay momento equivocado para dar un regalo que emociona.
          </p>
        </div>

        <div className="space-y-3">
          {OCCASIONS.map((occ, i) => (
            <div
              key={i}
              className={`relative ${occ.color} border rounded-3xl p-4 flex items-center gap-4 cursor-pointer hover:shadow-card transition-all duration-300`}
              onClick={onCTAClick}
            >
              <div className="w-14 h-14 bg-white rounded-2xl shadow-card flex items-center justify-center text-2xl flex-shrink-0">
                {occ.icon}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-bold text-brand-text">{occ.title}</h3>
                  {occ.badge && (
                    <span className={`text-xs font-bold rounded-full px-2 py-0.5 ${occ.badgeColor}`}>
                      {occ.badge}
                    </span>
                  )}
                </div>
                <p className="text-sm text-brand-muted leading-relaxed">{occ.desc}</p>
              </div>
              <div className="text-brand-border flex-shrink-0">›</div>
            </div>
          ))}
        </div>

        <div className="mt-8 text-center">
          <button onClick={onCTAClick} className="btn-primary w-full">
            Crear mi canción ahora
          </button>
        </div>
      </div>
    </section>
  );
}
