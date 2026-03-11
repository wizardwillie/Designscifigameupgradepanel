import { motion } from "motion/react";

interface LaserButtonProps {
  name: string;
  icon: React.ReactNode;
  isActive: boolean;
  onClick: () => void;
  color?: string;
}

export function LaserButton({ name, icon, isActive, onClick, color = "cyan" }: LaserButtonProps) {
  const colorClasses = {
    cyan: {
      active: "from-cyan-500 to-blue-500",
      border: "border-cyan-400",
      shadow: "shadow-cyan-500/50",
      glow: "shadow-[0_0_30px_rgba(6,182,212,0.6)]",
      text: "text-cyan-400",
      bg: "bg-cyan-500/20",
    },
    purple: {
      active: "from-purple-500 to-violet-500",
      border: "border-purple-400",
      shadow: "shadow-purple-500/50",
      glow: "shadow-[0_0_30px_rgba(168,85,247,0.6)]",
      text: "text-purple-400",
      bg: "bg-purple-500/20",
    },
    blue: {
      active: "from-blue-500 to-indigo-500",
      border: "border-blue-400",
      shadow: "shadow-blue-500/50",
      glow: "shadow-[0_0_30px_rgba(59,130,246,0.6)]",
      text: "text-blue-400",
      bg: "bg-blue-500/20",
    },
    pink: {
      active: "from-pink-500 to-rose-500",
      border: "border-pink-400",
      shadow: "shadow-pink-500/50",
      glow: "shadow-[0_0_30px_rgba(236,72,153,0.6)]",
      text: "text-pink-400",
      bg: "bg-pink-500/20",
    },
    orange: {
      active: "from-orange-500 to-red-500",
      border: "border-orange-400",
      shadow: "shadow-orange-500/50",
      glow: "shadow-[0_0_30px_rgba(249,115,22,0.6)]",
      text: "text-orange-400",
      bg: "bg-orange-500/20",
    },
  };

  const colors = colorClasses[color as keyof typeof colorClasses] || colorClasses.cyan;

  return (
    <motion.button
      onClick={onClick}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: "spring", stiffness: 400, damping: 20 }}
      className={`
        relative flex flex-col items-center gap-3 p-6 rounded-xl
        border-2 transition-all duration-500 overflow-hidden
        ${isActive 
          ? `${colors.border} ${colors.glow} bg-gradient-to-br ${colors.active} shadow-2xl` 
          : 'border-gray-700/50 bg-gradient-to-br from-[#0d1b2a] to-[#1b263b] hover:border-gray-600'
        }
      `}
    >
      {/* Background glow effect */}
      {isActive && (
        <motion.div
          className={`absolute inset-0 bg-gradient-to-br ${colors.active} opacity-20`}
          animate={{
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      )}

      {/* Active indicator pulse */}
      {isActive && (
        <div className="absolute top-3 right-3">
          <motion.div
            className={`w-2 h-2 rounded-full ${colors.bg} ${colors.border} border`}
            animate={{
              scale: [1, 1.3, 1],
              opacity: [1, 0.7, 1],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </div>
      )}

      {/* Icon */}
      <div className={`
        relative z-10 w-16 h-16 rounded-lg flex items-center justify-center
        ${isActive 
          ? `${colors.bg} ${colors.border} border-2 ${colors.shadow}` 
          : 'bg-gray-800/50 border-2 border-gray-700/50'
        }
      `}>
        <div className={isActive ? colors.text : 'text-gray-500'}>
          {icon}
        </div>
      </div>

      {/* Name */}
      <div className="relative z-10 text-center">
        <div className={`
          text-sm tracking-wider uppercase
          ${isActive ? 'text-white' : 'text-gray-400'}
        `}>
          {name}
        </div>
      </div>

      {/* Bottom glow line */}
      {isActive && (
        <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${colors.active}`} />
      )}

      {/* Shimmer effect when active */}
      {isActive && (
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
          animate={{
            x: ['-100%', '100%'],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            repeatDelay: 2,
            ease: "easeInOut",
          }}
        />
      )}
    </motion.button>
  );
}
