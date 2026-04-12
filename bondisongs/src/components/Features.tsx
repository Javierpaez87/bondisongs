const FEATURES = [
  {
    icon: '💛',
    title: 'Hecha a partir de recuerdos reales',
    desc: 'No es una plantilla genérica. Cada canción nace de lo que vos nos contás: anécdotas, frases, momentos únicos.',
  },
  {
    icon: '🎤',
    title: 'Con el nombre y la historia de tu hijo/a',
    desc: 'El nombre del nene, sus gustos, sus personas favoritas. Todo puede estar en la canción.',
  },
  {
    icon: '📲',
    title: 'Te la enviamos por WhatsApp',
    desc: 'Nada de apps raras ni plataformas difíciles. Recibís el link en tu teléfono y listo.',
  },
  {
    icon: '🥲',
    title: 'Pensada para emocionar de verdad',
    desc: 'No queremos hacer algo lindo. Queremos hacer algo que se guarde para siempre y que cuente una historia.',
  },
];

export default function Features() {
  return (
    <section className="section-pad bg-white">
      <div className="max-w-lg mx-auto">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 bg-brand-accent-light text-brand-accent text-xs font-bold rounded-full px-4 py-1.5 mb-4 uppercase tracking-wider border border-brand-accent/20">
            Por qué BondiSongs
          </div>
          <h2 className="text-3xl font-black text-brand-text mb-3 leading-tight">
            Esto es diferente.<br />De verdad.
          </h2>
          <p className="text-brand-muted">
            Porque un regalo que se escucha vale más que mil que se ven.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4">
          {FEATURES.map((f, i) => (
            <div
              key={i}
              className="flex gap-4 p-4 bg-brand-surface rounded-3xl border border-brand-border/50 hover:shadow-card hover:border-brand-border transition-all duration-300"
            >
              <div className="w-12 h-12 bg-white rounded-2xl shadow-card flex items-center justify-center text-2xl flex-shrink-0 border border-brand-border/40">
                {f.icon}
              </div>
              <div>
                <h3 className="font-bold text-brand-text mb-1">{f.title}</h3>
                <p className="text-sm text-brand-muted leading-relaxed">{f.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 p-5 bg-gradient-to-br from-brand-primary-light to-brand-secondary-light rounded-3xl border border-brand-border text-center">
          <div className="text-3xl mb-3">🎼</div>
          <h3 className="font-black text-xl text-brand-text mb-2">
            Cada canción es única, irrepetible
          </h3>
          <p className="text-sm text-brand-muted leading-relaxed">
            No existen dos canciones iguales en BondiSongs. La canción de tu hijo es solo de tu hijo.
          </p>
        </div>
      </div>
    </section>
  );
}
