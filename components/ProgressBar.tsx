type ProgressBarProps = {
  step: number;
  total: number;
  title: string;
};

export function ProgressBar({ step, total, title }: ProgressBarProps) {
  const progress = (step / total) * 100;

  return (
    <div className="mx-auto mb-8 w-full max-w-3xl px-4 pt-6 md:pt-8">
      <div className="mb-2 flex items-center justify-between text-xs font-semibold uppercase tracking-[0.2em] text-rose-100/90 md:text-sm">
        <span>{`Step ${step} of ${total}`}</span>
        <span>{title}</span>
      </div>
      <div className="h-2 w-full overflow-hidden rounded-full bg-white/20">
        <div
          className="h-full rounded-full bg-gradient-to-r from-rose-200 via-pink-300 to-rose-400 transition-all duration-700"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}
