import { useState } from "react";
import { UpgradeCard } from "./components/UpgradeCard";
import { 
  Zap, 
  Shield, 
  Target, 
  Cpu, 
  Rocket, 
  Battery,
  Sparkles,
  TrendingUp 
} from "lucide-react";

interface Upgrade {
  id: string;
  title: string;
  description: string;
  level: number;
  baseCost: number;
  icon: React.ReactNode;
}

const initialUpgrades: Upgrade[] = [
  {
    id: "plasma-cannon",
    title: "Plasma Cannon",
    description: "High-energy weapon system with devastating firepower",
    level: 0,
    baseCost: 100,
    icon: <Zap className="w-6 h-6 text-blue-400" />,
  },
  {
    id: "shield-matrix",
    title: "Shield Matrix",
    description: "Advanced defensive grid providing superior protection",
    level: 0,
    baseCost: 250,
    icon: <Shield className="w-6 h-6 text-purple-400" />,
  },
  {
    id: "targeting-ai",
    title: "Targeting AI",
    description: "Neural network for enhanced accuracy and precision",
    level: 0,
    baseCost: 500,
    icon: <Target className="w-6 h-6 text-cyan-400" />,
  },
  {
    id: "quantum-core",
    title: "Quantum Core",
    description: "Harness quantum computing for exponential processing power",
    level: 0,
    baseCost: 1000,
    icon: <Cpu className="w-6 h-6 text-indigo-400" />,
  },
  {
    id: "boost-thrusters",
    title: "Boost Thrusters",
    description: "Experimental propulsion system for incredible speed",
    level: 0,
    baseCost: 2000,
    icon: <Rocket className="w-6 h-6 text-orange-400" />,
  },
  {
    id: "reactor-core",
    title: "Reactor Core",
    description: "Nuclear fusion reactor providing unlimited energy",
    level: 0,
    baseCost: 5000,
    icon: <Battery className="w-6 h-6 text-green-400" />,
  },
  {
    id: "nano-repair",
    title: "Nano Repair",
    description: "Self-repairing nanobots for automatic hull regeneration",
    level: 0,
    baseCost: 7500,
    icon: <Sparkles className="w-6 h-6 text-pink-400" />,
  },
  {
    id: "economy-boost",
    title: "Economy Boost",
    description: "Optimized resource gathering and credit multiplication",
    level: 0,
    baseCost: 10000,
    icon: <TrendingUp className="w-6 h-6 text-yellow-400" />,
  },
];

export default function App() {
  const [credits, setCredits] = useState(15000);
  const [upgrades, setUpgrades] = useState(initialUpgrades);

  const calculateCost = (baseCost: number, level: number) => {
    return Math.floor(baseCost * Math.pow(1.15, level));
  };

  const handleBuyUpgrade = (upgradeId: string) => {
    const upgrade = upgrades.find((u) => u.id === upgradeId);
    if (!upgrade) return;

    const cost = calculateCost(upgrade.baseCost, upgrade.level);
    if (credits < cost) return;

    setCredits((prev) => prev - cost);
    setUpgrades((prev) =>
      prev.map((u) =>
        u.id === upgradeId ? { ...u, level: u.level + 1 } : u
      )
    );
  };

  const addCredits = () => {
    setCredits((prev) => prev + 5000);
  };

  return (
    <div className="min-h-screen bg-[#020817] relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(59,130,246,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.05)_1px,transparent_1px)] bg-[size:50px_50px]" />
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '1s' }} />
      </div>
      
      {/* Main container */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-blue-400">
            UPGRADE SYSTEM
          </h1>
          <p className="text-gray-400 text-lg">
            Sci-Fi Game Upgrade Card Component Showcase
          </p>
        </div>
        
        {/* Credits Display */}
        <div className="mb-8 flex items-center justify-center gap-4">
          <div className="bg-gradient-to-r from-[#0d1b2a] to-[#1b263b] border border-blue-500/30 rounded-xl px-8 py-4 shadow-xl">
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 bg-blue-400 rounded-full animate-pulse shadow-lg shadow-blue-400/50" />
              <div>
                <div className="text-xs text-gray-500 uppercase tracking-wider mb-1">Available Credits</div>
                <div className="text-3xl font-mono text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                  {credits.toLocaleString()}
                </div>
              </div>
            </div>
          </div>
          
          <button
            onClick={addCredits}
            className="px-6 py-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl hover:from-green-400 hover:to-emerald-500 transition-all duration-300 shadow-lg shadow-green-500/30 hover:shadow-green-400/50"
          >
            + 5,000
          </button>
        </div>
        
        {/* Upgrade Cards Grid */}
        <div className="space-y-4">
          {upgrades.map((upgrade) => {
            const cost = calculateCost(upgrade.baseCost, upgrade.level);
            return (
              <UpgradeCard
                key={upgrade.id}
                title={upgrade.title}
                description={upgrade.description}
                level={upgrade.level}
                cost={cost}
                icon={upgrade.icon}
                onBuy={() => handleBuyUpgrade(upgrade.id)}
                canAfford={credits >= cost}
              />
            );
          })}
        </div>
        
        {/* Footer info */}
        <div className="mt-12 text-center">
          <p className="text-sm text-gray-600">
            Reusable sci-fi upgrade card component with animations and glow effects
          </p>
        </div>
      </div>
    </div>
  );
}
