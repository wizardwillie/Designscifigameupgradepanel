interface UpgradeCardProps {
  title: string;
  description: string;
  level: number;
  cost: number;
  currency?: string;
  onBuy: () => void;
  canAfford: boolean;
}

export function UpgradeCard({
  title,
  description,
  level,
  cost,
  currency = "CREDITS",
  onBuy,
  canAfford,
}: UpgradeCardProps) {
  return (
    <div className="relative bg-gradient-to-br from-[#1a1d2e] to-[#0f1219] rounded-xl p-4 border border-[#2d3548] hover:border-[#4a5568] transition-all duration-300 group overflow-hidden">
      {/* Glow effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/0 via-cyan-500/5 to-purple-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
      
      {/* Content */}
      <div className="relative z-10">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-gray-100 tracking-wide">{title}</h3>
          <div className="flex items-center gap-1 px-2 py-0.5 bg-[#0f1219] border border-cyan-500/30 rounded-md">
            <span className="text-xs text-cyan-400">LVL</span>
            <span className="text-xs text-cyan-300 font-mono">{level}</span>
          </div>
        </div>
        
        <p className="text-sm text-gray-400 mb-4 leading-relaxed">{description}</p>
        
        <div className="flex items-center justify-between gap-3">
          <div className="flex-1 bg-[#0f1219] border border-[#2d3548] rounded-lg px-3 py-2">
            <div className="text-xs text-gray-500 mb-0.5">{currency}</div>
            <div className="text-sm font-mono text-purple-300">{cost.toLocaleString()}</div>
          </div>
          
          <button
            onClick={onBuy}
            disabled={!canAfford}
            className={`px-6 py-2 rounded-lg transition-all duration-300 ${
              canAfford
                ? 'bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-400 hover:to-purple-500 text-white shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/40'
                : 'bg-[#1a1d2e] border border-[#2d3548] text-gray-600 cursor-not-allowed'
            }`}
          >
            BUY
          </button>
        </div>
      </div>
      
      {/* Corner accents */}
      <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-cyan-500/10 to-transparent rounded-bl-full pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-16 h-16 bg-gradient-to-tr from-purple-500/10 to-transparent rounded-tr-full pointer-events-none" />
    </div>
  );
}
