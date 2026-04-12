interface ProgressBarProps {
  current: number;
  total: number;
}

export default function ProgressBar({ current, total }: ProgressBarProps) {
  const percent = Math.round((current / total) * 100);

  return (
    <div className="px-5 pt-4 pb-2">
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs font-semibold text-brand-muted">
          Paso {current} de {total}
        </span>
        <span className="text-xs font-bold text-brand-primary">{percent}%</span>
      </div>
      <div className="h-2 bg-brand-border rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-warm rounded-full transition-all duration-500 ease-out"
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );
}
