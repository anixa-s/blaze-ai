import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { TrendingUp } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { format, subDays } from "date-fns";

export default function RiskTrends({ riskData, isLoading, timeframe }) {
  const generateTrendData = () => {
    if (!riskData.length) return [];

    const days = timeframe === "24h" ? 1 : timeframe === "7d" ? 7 : 30;
    const trendData = [];

    for (let i = days - 1; i >= 0; i--) {
      const date = subDays(new Date(), i);
      const dateStr = format(date, timeframe === "24h" ? "HH:mm" : "MMM dd");
      
      // Simulate trend data based on existing risk data
      const baseRisk = riskData.reduce((sum, risk) => sum + (risk.risk_score || 0), 0) / riskData.length;
      const variation = Math.random() * 20 - 10; // ±10 variation
      const riskScore = Math.max(0, Math.min(100, Math.round(baseRisk + variation)));

      trendData.push({
        date: dateStr,
        riskScore,
        temperature: Math.round(20 + Math.random() * 20),
        humidity: Math.round(30 + Math.random() * 40)
      });
    }

    return trendData;
  };

  const trendData = generateTrendData();

  return (
    <Card className="shadow-sm" style={{ backgroundColor: 'var(--surface-white)' }}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2" style={{ color: 'var(--forest-primary)' }}>
          <TrendingUp className="w-5 h-5" />
          Risk Trends
        </CardTitle>
        <p className="text-sm" style={{ color: 'var(--neutral-gray)' }}>
          Average risk score over time
        </p>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <Skeleton className="h-64 w-full" />
        ) : (
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={trendData}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border-subtle)" />
                <XAxis 
                  dataKey="date" 
                  stroke="var(--neutral-gray)"
                  fontSize={12}
                />
                <YAxis 
                  stroke="var(--neutral-gray)"
                  fontSize={12}
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'var(--surface-white)',
                    border: '1px solid var(--border-subtle)',
                    borderRadius: '8px'
                  }}
                />
                <Line 
                  type="monotone" 
                  dataKey="riskScore" 
                  stroke="var(--danger-red)" 
                  strokeWidth={2}
                  dot={{ fill: 'var(--danger-red)', strokeWidth: 2, r: 4 }}
                  activeDot={{ r: 6, stroke: 'var(--danger-red)', strokeWidth: 2 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        )}
      </CardContent>
    </Card>
  );
}