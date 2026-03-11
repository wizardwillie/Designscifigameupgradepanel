import { useState } from "react";
import { UpgradeCard } from "./components/UpgradeCard";
import { 
  DollarSign, 
  Timer, 
  Layers
} from "lucide-react";

interface EconomyUpgrade {
  id: string;
  title: string;
  description: string;
  level: number;
  baseCost: number;
  icon: React.ReactNode;
}

const economyUpgrades: EconomyUpgrade[] = [
  {
    id: "target-value",
    title: "Target Value",
    description: "Increase the credit value earned from each destroyed target",
    level: 0,
    baseCost: 100,
    icon: <DollarSign className="w-6 h-6 text-green-400" />,
  },
  {
    id: "spawn-rate",
    title: "Spawn Rate",
    description: "Boost the frequency at which new targets appear in the field",
    level: 0,
    baseCost: 250,
    icon: <Timer className="w-6 h-6 text-cyan-400" />,
  },
  {
    id: "target-diversity",
    title: "Target Diversity",
    description: "Unlock rare and valuable target types with bonus rewards",
    level: 0,
    baseCost: 500,
    icon: <Layers className="w-6 h-6 text-purple-400" />,
  },
];

export default function App() {
  const [credits, setCredits] = useState(1000);
  const [upgrades, setUpgrades] = useState(economyUpgrades);

  const calculateCost = (baseCost: number, level: number) => {
    return Math.floor(baseCost * Math.pow(1.2, level));
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
    setCredits((prev) => prev + 500);
  };

  return (
    <div className="min-h-screen bg-[#0a0f1a] relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(6,182,212,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(6,182,212,0.02)_1px,transparent_1px)] bg-[size:40px_40px]" />
        <div className="absolute top-0 left-1/3 w-96 h-96 bg-cyan-500/5 rounded-full blur-[100px]" />
        <div className="absolute bottom-0 right-1/3 w-96 h-96 bg-purple-500/5 rounded-full blur-[100px]" />
      </div>
      
      {/* Main container */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 py-16">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-block mb-4">
            <div className="flex items-center gap-3 bg-gradient-to-r from-cyan-500/10 to-purple-500/10 border border-cyan-500/20 rounded-xl px-6 py-3">
              <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse" />
              <h1 className="text-4xl text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400 tracking-wide">
                TARGET ECONOMY
              </h1>
              <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }} />
            </div>
          </div>
          <p className="text-gray-400">
            Optimize your earnings with economic upgrades
          </p>
        </div>
        
        {/* Credits Display */}
        <div className="mb-10">
          <div className="bg-gradient-to-br from-[#0d1b2a] to-[#1b263b] border border-cyan-500/30 rounded-2xl p-6 shadow-2xl shadow-cyan-500/10">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-cyan-500/20 to-purple-500/20 border border-cyan-400/40 flex items-center justify-center">
                  <DollarSign className="w-6 h-6 text-cyan-400" />
                </div>
                <div>
                  <div className="text-xs text-gray-500 uppercase tracking-wider mb-1">
                    Available Credits
                  </div>
                  <div className="text-3xl font-mono text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">
                    {credits.toLocaleString()}
                  </div>
                </div>
              </div>
              
              <button
                onClick={addCredits}
                className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-lg hover:from-cyan-400 hover:to-blue-500 transition-all duration-300 shadow-lg shadow-cyan-500/30"
              >
                + 500
              </button>
            </div>
          </div>
        </div>
        
        {/* Economy Upgrades Section */}
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="h-[2px] flex-1 bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent" />
            <h2 className="text-sm text-cyan-400 uppercase tracking-[0.3em]">
              Economy Upgrades
            </h2>
            <div className="h-[2px] flex-1 bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent" />
          </div>
        </div>
        
        {/* Upgrade Cards */}
        <div className="space-y-5">
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
        
        {/* Info Footer */}
        <div className="mt-12 text-center">
          <div className="inline-block bg-gradient-to-r from-cyan-500/5 to-purple-500/5 border border-cyan-500/20 rounded-lg px-6 py-3">
            <p className="text-sm text-gray-500">
              Upgrade costs increase by 20% per level
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}