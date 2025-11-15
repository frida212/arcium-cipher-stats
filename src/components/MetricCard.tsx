import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface MetricCardProps {
  label: string;
  value: string | number;
  subtitle?: string;
  icon?: React.ReactNode;
  trend?: "up" | "down" | "neutral";
  className?: string;
}

export function MetricCard({ label, value, subtitle, icon, trend, className }: MetricCardProps) {
  return (
    <Card className={cn(
      "dashboard-card p-6 border-border/50 hover:border-primary/30 transition-all duration-300",
      "hover:shadow-[0_0_30px_hsl(var(--dashboard-glow)/0.2)]",
      className
    )}>
      <div className="flex items-start justify-between mb-4">
        <div className="text-muted-foreground text-sm font-medium tracking-wide uppercase">
          {label}
        </div>
        {icon && (
          <div className="text-primary/70">
            {icon}
          </div>
        )}
      </div>
      
      <div className="space-y-2">
        <div className="metric-value text-4xl font-bold text-foreground tracking-tight">
          {value}
        </div>
        
        {subtitle && (
          <div className={cn(
            "text-sm font-medium",
            trend === "up" && "text-primary",
            trend === "down" && "text-destructive",
            !trend && "text-muted-foreground"
          )}>
            {subtitle}
          </div>
        )}
      </div>
    </Card>
  );
}
