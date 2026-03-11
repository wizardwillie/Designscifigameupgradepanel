interface SectionHeaderProps {
  title: string;
  icon?: string;
}

export function SectionHeader({ title, icon }: SectionHeaderProps) {
  return (
    <div className="relative mb-4 mt-6 first:mt-0">
      <div className="flex items-center gap-3">
        {icon && (
          <div className="w-8 h-8 flex items-center justify-center bg-gradient-to-br from-cyan-500/20 to-purple-500/20 border border-cyan-500/30 rounded-lg">
            <span className="text-cyan-400">{icon}</span>
          </div>
        )}
        <div className="flex-1">
          <h2 className="text-sm tracking-[0.2em] text-cyan-400 uppercase">
            {title}
          </h2>
          <div className="h-[1px] bg-gradient-to-r from-cyan-500/50 via-purple-500/30 to-transparent mt-2" />
        </div>
      </div>
    </div>
  );
}
