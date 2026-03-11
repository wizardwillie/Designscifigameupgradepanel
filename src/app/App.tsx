import { useState } from "react";
import { UpgradeCard } from "./components/UpgradeCard";
import { SectionHeader } from "./components/SectionHeader";

interface Upgrade {
  id: string;
  title: string;
  description: string;
  level: number;
  baseCost: number;
  category: string;
}

const initialUpgrades: Upgrade[] = [
  // LASERS
  {
    id: "laser-power",
    title: "Laser Power",
    description: "Increase damage output of primary laser systems.",
    level: 0,
    baseCost: 100,
    category: "LASERS",
  },
  {
    id: "beam-focus",
    title: "Beam Focus",
    description: "Enhance laser precision and critical hit chance.",
    level: 0,
    baseCost: 250,
    category: "LASERS",
  },
  {
    id: "heat-sink",
    title: "Heat Sink",
    description: "Improve cooling systems for sustained fire.",
    level: 0,
    baseCost: 500,
    category: "LASERS",
  },
  
  // LASER UPGRADES
  {
    id: "multi-beam",
    title: "Multi-Beam Array",
    description: "Add additional laser emitters to your arsenal.",
    level: 0,
    baseCost: 1000,
    category: "LASER UPGRADES",
  },
  {
    id: "plasma-core",
    title: "Plasma Core",
    description: "Upgrade to plasma-based laser technology.",
    level: 0,
    baseCost: 2500,
    category: "LASER UPGRADES",
  },
  {
    id: "quantum-lens",
    title: "Quantum Lens",
    description: "Harness quantum entanglement for instant beam delivery.",
    level: 0,
    baseCost: 5000,
    category: "LASER UPGRADES",
  },
  
  // TARGET ECONOMY
  {
    id: "credit-multiplier",
    title: "Credit Multiplier",
    description: "Increase credits earned per target destroyed.",
    level: 0,
    baseCost: 750,
    category: "TARGET ECONOMY",
  },
  {
    id: "salvage-drones",
    title: "Salvage Drones",
    description: "Deploy drones to collect additional resources.",
    level: 0,
    baseCost: 1500,
    category: "TARGET ECONOMY",
  },
  {
    id: "bonus-scanner",
    title: "Bonus Scanner",
    description: "Detect high-value targets with improved sensors.",
    level: 0,
    baseCost: 3000,
    category: "TARGET ECONOMY",
  },
  
  // AUTOMATION
  {
    id: "auto-aim",
    title: "Auto-Targeting",
    description: "Automatically acquire and engage hostile targets.",
    level: 0,
    baseCost: 2000,
    category: "AUTOMATION",
  },
  {
    id: "auto-fire",
    title: "Auto-Fire Protocol",
    description: "Enable automated firing sequences.",
    level: 0,
    baseCost: 4000,
    category: "AUTOMATION",
  },
  {
    id: "ai-commander",
    title: "AI Commander",
    description: "Deploy advanced AI to optimize all systems.",
    level: 0,
    baseCost: 10000,
    category: "AUTOMATION",
  },
];

export default function App() {
  const [credits, setCredits] = useState(5000);
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

  const categories = ["LASERS", "LASER UPGRADES", "TARGET ECONOMY", "AUTOMATION"];

  const getCategoryIcon = (category: string) => {
    const icons: Record<string, string> = {
      LASERS: "⚡",
      "LASER UPGRADES": "🔧",
      "TARGET ECONOMY": "💰",
      AUTOMATION: "🤖",
    };
    return icons[category];
  };

  return (
    <div className="min-h-screen bg-[#0a0c14] relative overflow-hidden">
      {/* Background grid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(6,182,212,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(6,182,212,0.03)_1px,transparent_1px)] bg-[size:50px_50px]" />
      
      {/* Ambient glow effects */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500/10 rounded-full blur-[120px] pointer-events-none" />
      
      {/* Main container */}
      <div className="relative z-10 min-h-screen flex">
        {/* Upgrade Panel */}
        <div className="w-[450px] bg-gradient-to-b from-[#13161f]/95 to-[#0f1219]/95 backdrop-blur-sm border-r border-[#2d3548] shadow-2xl">
          {/* Panel Header */}
          <div className="sticky top-0 bg-gradient-to-b from-[#1a1d2e] to-[#13161f] border-b border-cyan-500/30 p-6 z-20">
            <div className="flex items-center justify-between mb-4">
              <h1 className="text-xl tracking-wider text-gray-100">UPGRADES</h1>
              <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse shadow-lg shadow-cyan-400/50" />
            </div>
            
            {/* Credits Display */}
            <div className="bg-[#0f1219] border border-[#2d3548] rounded-lg p-4 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 to-purple-500/5" />
              <div className="relative flex items-center justify-between">
                <span className="text-sm text-gray-400 tracking-wide">CREDITS</span>
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-purple-400 rounded-full" />
                  <span className="text-2xl font-mono text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">
                    {credits.toLocaleString()}
                  </span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Scrollable Upgrade List */}
          <div className="h-[calc(100vh-180px)] overflow-y-auto p-6 space-y-3 scrollbar-thin scrollbar-thumb-cyan-500/20 scrollbar-track-transparent">
            {categories.map((category) => {
              const categoryUpgrades = upgrades.filter(
                (u) => u.category === category
              );
              
              return (
                <div key={category}>
                  <SectionHeader 
                    title={category} 
                    icon={getCategoryIcon(category)} 
                  />
                  <div className="space-y-3">
                    {categoryUpgrades.map((upgrade) => {
                      const cost = calculateCost(upgrade.baseCost, upgrade.level);
                      return (
                        <UpgradeCard
                          key={upgrade.id}
                          title={upgrade.title}
                          description={upgrade.description}
                          level={upgrade.level}
                          cost={cost}
                          onBuy={() => handleBuyUpgrade(upgrade.id)}
                          canAfford={credits >= cost}
                        />
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        
        {/* Main Game Area (Right Side) */}
        <div className="flex-1 flex items-center justify-center p-12">
          <div className="text-center space-y-4">
            <div className="inline-block p-6 bg-gradient-to-br from-cyan-500/10 to-purple-500/10 border border-cyan-500/30 rounded-2xl backdrop-blur-sm">
              <div className="w-32 h-32 bg-gradient-to-br from-cyan-500/20 to-purple-500/20 rounded-full flex items-center justify-center border border-cyan-500/50 shadow-lg shadow-cyan-500/20">
                <span className="text-6xl">🎯</span>
              </div>
            </div>
            <h2 className="text-3xl text-gray-300 tracking-wide">Game Area</h2>
            <p className="text-gray-500 max-w-md">
              This is where your incremental game mechanics would display. Purchase upgrades from the panel to enhance your capabilities.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
