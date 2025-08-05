
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AreaChart, Flame, Globe } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

export default function SummaryCards({ fires, isLoading }) {
  const stats = React.useMemo(() => {
    if (isLoading || !fires.length) {
      return { totalFires: 0, totalArea: 0, averageArea: 0 };
    }
    const totalArea = fires.reduce((sum, fire) => sum + (fire.area_burned_hectares || 0), 0);
    return {
      totalFires: fires.length,
      totalArea,
      averageArea: totalArea / fires.length,
    };
  }, [fires, isLoading]);

  const formatNumber = (num) => {
    if (num >= 1e6) return `${(num / 1e6).toFixed(1)}M`;
    if (num >= 1e3) return `${(num / 1e3).toFixed(1)}K`;
    return num.toFixed(0);
  };

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Skeleton className="h-32" />
        <Skeleton className="h-32" />
        <Skeleton className="h-32" />
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <Card className="shadow-sm" style={{ backgroundColor: 'var(--surface-white)' }}>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium" style={{ color: 'var(--neutral-gray)' }}>
            Total Recorded Fires
          </CardTitle>
          <Flame className="h-4 w-4 text-muted-foreground" style={{ color: 'var(--neutral-gray)' }} />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold" style={{ color: 'var(--forest-primary)' }}>
            {stats.totalFires}
          </div>
          <p className="text-xs text-muted-foreground" style={{ color: 'var(--neutral-gray)' }}>
            in the dataset
          </p>
        </CardContent>
      </Card>
      <Card className="shadow-sm" style={{ backgroundColor: 'var(--surface-white)' }}>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium" style={{ color: 'var(--neutral-gray)' }}>
            Total Area Burned (ha)
          </CardTitle>
          <Globe className="h-4 w-4 text-muted-foreground" style={{ color: 'var(--neutral-gray)' }} />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold" style={{ color: 'var(--forest-primary)' }}>
            {formatNumber(stats.totalArea)}
          </div>
          <p className="text-xs text-muted-foreground" style={{ color: 'var(--neutral-gray)' }}>
            Total hectares affected
          </p>
        </CardContent>
      </Card>
      <Card className="shadow-sm" style={{ backgroundColor: 'var(--surface-white)' }}>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium" style={{ color: 'var(--neutral-gray)' }}>
            Average Fire Size (ha)
          </CardTitle>
          <AreaChart className="h-4 w-4 text-muted-foreground" style={{ color: 'var(--neutral-gray)' }} />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold" style={{ color: 'var(--forest-primary)' }}>
            {formatNumber(stats.averageArea)}
          </div>
          <p className="text-xs text-muted-foreground" style={{ color: 'var(--neutral-gray)' }}>
            Average area per fire event
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
