import { useEffect, useState } from "react";
import { MetricCard } from "@/components/MetricCard";
import { TrendingUp, Activity, DollarSign, Zap } from "lucide-react";

type MarketStats = {
  total_volume: number;
  trade_count: number;
  avg_price: number;
  avg_latency_ms: number;
};

// Simulate real-time data updates
function generateMockStats(): MarketStats {
  return {
    total_volume: Math.floor(250000 + Math.random() * 50000),
    trade_count: Math.floor(100 + Math.random() * 50),
    avg_price: 1.05 + Math.random() * 0.05,
    avg_latency_ms: 150 + Math.random() * 80,
  };
}

const Index = () => {
  const [stats, setStats] = useState<MarketStats | null>(null);
  const [lastUpdate, setLastUpdate] = useState<Date>(new Date());

  useEffect(() => {
    // Initial load
    setStats(generateMockStats());
    
    // Update every 5 seconds to simulate real-time data
    const interval = setInterval(() => {
      setStats(generateMockStats());
      setLastUpdate(new Date());
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  if (!stats) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-muted-foreground animate-pulse">Loading analytics...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border/50 backdrop-blur-sm bg-background/80 sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-foreground tracking-tight">
                Arcium Dark Pool
              </h1>
              <p className="text-sm text-muted-foreground mt-1">
                Privacy-Preserving Market Analytics
              </p>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              <span>Live</span>
              <span className="text-muted-foreground/60">•</span>
              <span className="font-mono">
                {lastUpdate.toLocaleTimeString()}
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-8">
        {/* Info Banner */}
        <div className="mb-8 p-4 rounded-lg bg-primary/5 border border-primary/20">
          <div className="flex items-start gap-3">
            <div className="text-primary mt-0.5">
              <svg
                className="w-5 h-5"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <div>
              <h3 className="font-semibold text-foreground mb-1">
                Privacy-First Analytics
              </h3>
              <p className="text-sm text-muted-foreground">
                All metrics are aggregate-only. No individual trades, orders, or user identities are ever exposed.
                Powered by Arcium's confidential computing infrastructure.
              </p>
            </div>
          </div>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <MetricCard
            label="Total Volume"
            value={stats.total_volume.toLocaleString()}
            subtitle="Aggregate trading volume"
            icon={<TrendingUp className="w-5 h-5" />}
            trend="up"
          />
          
          <MetricCard
            label="Trade Count"
            value={stats.trade_count}
            subtitle="Number of executed trades"
            icon={<Activity className="w-5 h-5" />}
            trend="neutral"
          />
          
          <MetricCard
            label="Average Price"
            value={stats.avg_price.toFixed(4)}
            subtitle="Mean execution price"
            icon={<DollarSign className="w-5 h-5" />}
            trend="up"
          />
          
          <MetricCard
            label="Average Latency"
            value={`${stats.avg_latency_ms.toFixed(0)} ms`}
            subtitle="Mean processing time"
            icon={<Zap className="w-5 h-5" />}
            trend="neutral"
          />
        </div>

        {/* Technical Details */}
        <div className="mt-12 grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="p-6 rounded-lg bg-card border border-border/50">
            <h3 className="text-lg font-semibold mb-4 text-foreground">
              How It Works
            </h3>
            <div className="space-y-3 text-sm text-muted-foreground">
              <div className="flex gap-3">
                <span className="text-primary font-mono">1.</span>
                <p>Orders are encrypted and processed in Arcium's secure enclave</p>
              </div>
              <div className="flex gap-3">
                <span className="text-primary font-mono">2.</span>
                <p>Only aggregate statistics are computed and released</p>
              </div>
              <div className="flex gap-3">
                <span className="text-primary font-mono">3.</span>
                <p>Real-time updates maintain complete privacy of individual trades</p>
              </div>
            </div>
          </div>

          <div className="p-6 rounded-lg bg-card border border-border/50">
            <h3 className="text-lg font-semibold mb-4 text-foreground">
              Privacy Guarantees
            </h3>
            <div className="space-y-3 text-sm text-muted-foreground">
              <div className="flex gap-3">
                <span className="text-accent">✓</span>
                <p>Individual order details never leave the secure enclave</p>
              </div>
              <div className="flex gap-3">
                <span className="text-accent">✓</span>
                <p>User identities are cryptographically protected</p>
              </div>
              <div className="flex gap-3">
                <span className="text-accent">✓</span>
                <p>Only safe aggregate metrics are publicly visible</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
