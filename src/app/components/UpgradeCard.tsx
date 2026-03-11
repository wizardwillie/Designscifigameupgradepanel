import { motion } from "motion/react";

interface UpgradeCardProps {
  title: string;
  description: string;
  level: number;
  cost: number;
  currency?: string;
  icon?: React.ReactNode;
  onBuy: () => void;
  canAfford: boolean;
  disabled?: boolean;
}

export function UpgradeCard({
  title,
  description,
  level,
  cost,
  currency = "CREDITS",
  icon,
  onBuy,
  canAfford,
  disabled = false,
}: UpgradeCardProps) {
  const isDisabled = disabled || !canAfford;

  return (
    <motion.div
      whileHover={!isDisabled ? { scale: 1.02, y: -2 } : {}}
      whileTap={!isDisabled ? { scale: 0.98 } : {}}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
      className="relative bg-gradient-to-r from-[#0d1b2a] to-[#1b263b] rounded-xl border border-blue-500/30 shadow-lg overflow-hidden group"
    >
      {/* Animated glow effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/0 via-blue-500/10 to-purple-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      {/* Top glow line */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-blue-400 to-transparent opacity-50" />
      
      {/* Main content wrapper */}
      <div className="relative z-10 flex items-center gap-4 p-5">
        {/* Icon section */}
        <div className="flex-shrink-0">
          <div className="w-14 h-14 rounded-lg bg-gradient-to-br from-blue-500/20 to-purple-600/20 border border-blue-400/40 flex items-center justify-center shadow-lg shadow-blue-500/20">
            {icon ? (
              <div className="text-2xl">{icon}</div>
            ) : (
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-purple-500" />
            )}
          </div>
        </div>
        
        {/* Content section */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="text-white tracking-wide truncate">{title}</h3>
            <div className="flex items-center gap-1 px-2 py-0.5 bg-blue-500/20 border border-blue-400/30 rounded">
              <span className="text-[10px] text-blue-300 uppercase tracking-wider">Lvl</span>
              <span className="text-xs text-blue-200 font-mono">{level}</span>
            </div>
          </div>
          
          <p className="text-sm text-gray-400 leading-snug mb-2 line-clamp-2">{description}</p>
          
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5 text-xs">
              <span className="text-gray-500">{currency}</span>
              <span className="text-purple-300 font-mono tabular-nums">
                {cost.toLocaleString()}
              </span>
            </div>
          </div>
        </div>
        
        {/* Button section */}
        <div className="flex-shrink-0">
          <motion.button
            onClick={onBuy}
            disabled={isDisabled}
            whileHover={!isDisabled ? { scale: 1.05 } : {}}
            whileTap={!isDisabled ? { scale: 0.95 } : {}}
            className={`
              px-6 py-3 rounded-lg transition-all duration-300 relative overflow-hidden
              ${
                !isDisabled
                  ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg shadow-blue-500/30 hover:shadow-blue-400/50'
                  : 'bg-gray-800/50 border border-gray-700/50 text-gray-600 cursor-not-allowed'
              }
            `}
          >
            {!isDisabled && (
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                animate={{
                  x: ['-100%', '100%'],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  repeatDelay: 1,
                }}
              />
            )}
            <span className="relative z-10 tracking-wider">
              {isDisabled && !canAfford ? 'LOCKED' : 'BUY'}
            </span>
          </motion.button>
        </div>
      </div>
      
      {/* Bottom edge highlight */}
      <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-purple-500/50 to-transparent" />
      
      {/* Corner accents */}
      <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-blue-500/10 to-transparent rounded-bl-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-16 h-16 bg-gradient-to-tr from-purple-500/10 to-transparent rounded-tr-3xl pointer-events-none" />
    </motion.div>
  );
}