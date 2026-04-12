const STEPS = [
  {
    icon: '✍️',
    number: '01',
    title: 'Contanos sobre el niño o niña',
    desc: 'Su nombre, sus gustos, un recuerdo especial. Con eso ya podemos crear algo hermoso.',
  },
  {
    icon: '🎵',
    number: '02',
    title: 'Creamos su canción',
    desc: 'Nuestro equipo compone una canción única, hecha a medida con todo lo que nos contaste.',
  },
  {
    icon: '💬',
    number: '03',
    title: 'Te enviamos el link por WhatsApp',
    desc: 'Recibís un link privado para escuchar un preview. Podés compartirlo con quien quieras.',
  },
  {
    icon: '⬇️',
    number: '04',
    title: 'La descargás y la guardás para siempre',
    desc: 'Una vez que la confirmás, descargás la canción completa en alta calidad.',
  },
];

export default function HowItWorks() {
  return (
    <section id="como-funciona" className="section-pad bg-white">
      <div className="max-w-lg mx-auto">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 bg-brand-primary-light text-brand-primary text-xs font-bold rounded-full px-4 py-1.5 mb-4 uppercase tracking-wider">
            Cómo funciona
          </div>
          <h2 className="text-3xl font-black text-brand-text mb-3 leading-tight">
            Simple, rápido y muy especial
          </h2>
          <p className="text-brand-muted">
            No hace falta escribir mucho. Con cuatro pasos ya está.
          </p>
        </div>

        <div className="relative">
          <div className="absolute left-[27px] top-8 bottom-8 w-0.5 bg-gradient-to-b from-brand-primary via-brand-secondary to-brand-accent opacity-30" />

          <div className="space-y-6">
            {STEPS.map((step, i) => (
              <div
                key={i}
                className="flex gap-4 group"
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                <div className="relative flex-shrink-0">
                  <div className="w-14 h-14 bg-white rounded-2xl shadow-card border border-brand-border/60 flex items-center justify-center text-2xl group-hover:shadow-warm transition-shadow duration-300 group-hover:border-brand-border">
                    {step.icon}
                  </div>
                  <div className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-brand-primary rounded-full flex items-center justify-center">
                    <span className="text-white text-[9px] font-black">{i + 1}</span>
                  </div>
                </div>
                <div className="flex-1 pt-2">
                  <h3 className="font-bold text-brand-text text-base mb-1">{step.title}</h3>
                  <p className="text-sm text-brand-muted leading-relaxed">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
