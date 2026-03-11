import { useState } from "react";
import { LaserButton } from "./components/LaserButton";
import { 
  Zap, 
  Flame, 
  Radio, 
  Maximize2, 
  Crosshair 
} from "lucide-react";

interface LaserType {
  id: string;
  name: string;
  icon: React.ReactNode;
  color: string;
  damage: number;
  fireRate: number;
  description: string;
}

const laserTypes: LaserType[] = [
  {
    id: "simple",
    name: "Simple Laser",
    icon: <Zap className="w-8 h-8" />,
    color: "cyan",
    damage: 10,
    fireRate: 1.0,
    description: "Basic laser weapon with balanced stats",
  },
  {
    id: "plasma",
    name: "Plasma Laser",
    icon: <Flame className="w-8 h-8" />,
    color: "purple",
    damage: 25,
    fireRate: 0.7,
    description: "High damage plasma-based weapon",
  },
  {
    id: "pulse",
    name: "Pulse Laser",
    icon: <Radio className="w-8 h-8" />,
    color: "blue",
    damage: 15,
    fireRate: 1.5,
    description: "Rapid-fire pulsing laser beams",
  },
  {
    id: "scatter",
    name: "Scatter Laser",
    icon: <Maximize2 className="w-8 h-8" />,
    color: "pink",
    damage: 8,
    fireRate: 1.2,
    description: "Multi-target area-of-effect weapon",
  },
  {
    id: "heavy",
    name: "Heavy Laser",
    icon: <Crosshair className="w-8 h-8" />,
    color: "orange",
    damage: 50,
    fireRate: 0.4,
    description: "Devastating heavy laser cannon",
  },
];

export default function App() {
  const [activeLaser, setActiveLaser] = useState<string>("simple");

  const currentLaser = laserTypes.find((laser) => laser.id === activeLaser);

  return (
    <div className="min-h-screen bg-[#020817] relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(6,182,212,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(6,182,212,0.03)_1px,transparent_1px)] bg-[size:60px_60px]" />
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[150px] animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-[150px] animate-pulse" style={{ animationDelay: '1s' }} />
      </div>
      
      {/* Main container */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-3 mb-4">
            <div className="w-1 h-8 bg-gradient-to-b from-cyan-500 to-purple-500 rounded-full" />
            <h1 className="text-5xl text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400">
              LASER SELECTION
            </h1>
            <div className="w-1 h-8 bg-gradient-to-b from-purple-500 to-cyan-500 rounded-full" />
          </div>
          <p className="text-gray-400 text-lg">
            Choose your weapon system
          </p>
        </div>
        
        {/* Laser Selection Panel */}
        <div className="bg-gradient-to-br from-[#0d1b2a]/80 to-[#1b263b]/80 backdrop-blur-md border border-cyan-500/20 rounded-2xl p-8 shadow-2xl mb-8">
          <div className="mb-6">
            <h2 className="text-xl text-cyan-400 uppercase tracking-wider mb-2">
              Weapon Systems
            </h2>
            <div className="h-[2px] bg-gradient-to-r from-cyan-500 via-purple-500 to-transparent" />
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {laserTypes.map((laser) => (
              <LaserButton
                key={laser.id}
                name={laser.name}
                icon={laser.icon}
                color={laser.color}
                isActive={activeLaser === laser.id}
                onClick={() => setActiveLaser(laser.id)}
              />
            ))}
          </div>
        </div>
        
        {/* Active Laser Info Display */}
        {currentLaser && (
          <div className="bg-gradient-to-br from-[#0d1b2a]/80 to-[#1b263b]/80 backdrop-blur-md border border-purple-500/20 rounded-2xl p-8 shadow-2xl">
            <div className="mb-6">
              <h2 className="text-xl text-purple-400 uppercase tracking-wider mb-2">
                Active Weapon
              </h2>
              <div className="h-[2px] bg-gradient-to-r from-purple-500 via-cyan-500 to-transparent" />
            </div>
            
            <div className="grid md:grid-cols-2 gap-8">
              {/* Left: Laser visual */}
              <div className="flex items-center justify-center">
                <div className="relative">
                  {/* Glow effect */}
                  <div className={`
                    absolute inset-0 rounded-full blur-3xl opacity-50
                    ${currentLaser.color === 'cyan' && 'bg-cyan-500'}
                    ${currentLaser.color === 'purple' && 'bg-purple-500'}
                    ${currentLaser.color === 'blue' && 'bg-blue-500'}
                    ${currentLaser.color === 'pink' && 'bg-pink-500'}
                    ${currentLaser.color === 'orange' && 'bg-orange-500'}
                  `} />
                  
                  {/* Icon display */}
                  <div className={`
                    relative w-48 h-48 rounded-2xl flex items-center justify-center
                    border-4 shadow-2xl
                    ${currentLaser.color === 'cyan' && 'border-cyan-400 bg-cyan-500/20 shadow-cyan-500/50'}
                    ${currentLaser.color === 'purple' && 'border-purple-400 bg-purple-500/20 shadow-purple-500/50'}
                    ${currentLaser.color === 'blue' && 'border-blue-400 bg-blue-500/20 shadow-blue-500/50'}
                    ${currentLaser.color === 'pink' && 'border-pink-400 bg-pink-500/20 shadow-pink-500/50'}
                    ${currentLaser.color === 'orange' && 'border-orange-400 bg-orange-500/20 shadow-orange-500/50'}
                  `}>
                    <div className={`
                      ${currentLaser.color === 'cyan' && 'text-cyan-400'}
                      ${currentLaser.color === 'purple' && 'text-purple-400'}
                      ${currentLaser.color === 'blue' && 'text-blue-400'}
                      ${currentLaser.color === 'pink' && 'text-pink-400'}
                      ${currentLaser.color === 'orange' && 'text-orange-400'}
                    `}>
                      <div className="scale-[3]">
                        {currentLaser.icon}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Right: Stats */}
              <div className="space-y-4">
                <div>
                  <h3 className="text-3xl text-white mb-2">{currentLaser.name}</h3>
                  <p className="text-gray-400">{currentLaser.description}</p>
                </div>
                
                <div className="space-y-3 pt-4">
                  {/* Damage stat */}
                  <div className="bg-[#0a0f1a] border border-cyan-500/30 rounded-lg p-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm text-gray-400 uppercase tracking-wider">Damage</span>
                      <span className="text-xl text-cyan-400 font-mono">{currentLaser.damage}</span>
                    </div>
                    <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full transition-all duration-500"
                        style={{ width: `${(currentLaser.damage / 50) * 100}%` }}
                      />
                    </div>
                  </div>
                  
                  {/* Fire rate stat */}
                  <div className="bg-[#0a0f1a] border border-purple-500/30 rounded-lg p-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm text-gray-400 uppercase tracking-wider">Fire Rate</span>
                      <span className="text-xl text-purple-400 font-mono">{currentLaser.fireRate.toFixed(1)}x</span>
                    </div>
                    <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full transition-all duration-500"
                        style={{ width: `${(currentLaser.fireRate / 1.5) * 100}%` }}
                      />
                    </div>
                  </div>
                  
                  {/* DPS calculation */}
                  <div className="bg-gradient-to-r from-cyan-500/10 to-purple-500/10 border border-cyan-500/30 rounded-lg p-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-400 uppercase tracking-wider">DPS (Damage Per Second)</span>
                      <span className="text-2xl text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400 font-mono">
                        {(currentLaser.damage * currentLaser.fireRate).toFixed(1)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}