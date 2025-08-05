import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, TrendingUp, AlertCircle } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

const riskColors = {
  very_low: { bg: "rgba(5, 150, 105, 0.1)", text: "var(--success-green)", border: "rgba(5, 150, 105, 0.3)" },
  low: { bg: "rgba(34, 197, 94, 0.1)", text: "#22c55e", border: "rgba(34, 197, 94, 0.3)" },
  moderate: { bg: "rgba(249, 115, 22, 0.1)", text: "var(--warning-orange)", border: "rgba(249, 115, 22, 0.3)" },
  high: { bg: "rgba(239, 68, 68, 0.1)", text: "#ef4444", border: "rgba(239, 68, 68, 0.3)" },
  extreme: { bg: "rgba(220, 38, 38, 0.1)", text: "var(--danger-red)", border: "rgba(220, 38, 38, 0.3)" }
};

export default function RiskOverview({ riskData, isLoading, timeframe }) {
  const sortedRisks = riskData
    .slice()
    .sort((a, b) => (b.risk_score || 0) - (a.risk_score || 0))
    .slice(0, 8);

  return (
    <Card className="shadow-sm" style={{ backgroundColor: 'var(--surface-white)' }}>
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2" style={{ color: 'var(--forest-primary)' }}>
          <MapPin className="w-5 h-5" />
          High-Risk Locations
        </CardTitle>
        <p className="text-sm" style={{ color: 'var(--neutral-gray)' }}>
          Current wildfire risk assessment by location
        </p>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="space-y-4">
            {Array(6).fill(0).map((_, i) => (
              <div key={i} className="flex items-center justify-between p-4 rounded-lg border" style={{ borderColor: 'var(--border-subtle)' }}>
                <div className="flex items-center gap-3">
                  <Skeleton className="w-3 h-3 rounded-full" />
                  <div>
                    <Skeleton className="h-4 w-32 mb-1" />
                    <Skeleton className="h-3 w-24" />
                  </div>
                </div>
                <Skeleton className="h-6 w-16 rounded-full" />
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-3">
            {sortedRisks.map((risk, index) => {
              const riskColor = riskColors[risk.risk_level] || riskColors.moderate;
              return (
                <div 
                  key={risk.id} 
                  className="flex items-center justify-between p-4 rounded-lg border transition-all duration-200 hover:shadow-sm"
                  style={{ 
                    borderColor: riskColor.border,
                    backgroundColor: index < 3 ? riskColor.bg : 'transparent'
                  }}
                >
                  <div className="flex items-center gap-3">
                    <div 
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: riskColor.text }}
                    />
                    <div>
                      <p className="font-medium" style={{ color: 'var(--forest-primary)' }}>
                        {risk.location_name}
                      </p>
                      <p className="text-sm" style={{ color: 'var(--neutral-gray)' }}>
                        {risk.latitude?.toFixed(3)}, {risk.longitude?.toFixed(3)}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="text-right">
                      <p className="font-bold text-lg" style={{ color: 'var(--forest-primary)' }}>
                        {risk.risk_score || 0}
                      </p>
                      <p className="text-xs" style={{ color: 'var(--neutral-gray)' }}>
                        {risk.confidence_level || 0}% confidence
                      </p>
                    </div>
                    <Badge 
                      variant="outline"
                      className="capitalize border"
                      style={{ 
                        backgroundColor: riskColor.bg,
                        color: riskColor.text,
                        borderColor: riskColor.border
                      }}
                    >
                      {risk.risk_level?.replace('_', ' ')}
                    </Badge>
                  </div>
                </div>
              );
            })}
            {sortedRisks.length === 0 && (
              <div className="text-center py-8">
                <AlertCircle className="w-12 h-12 mx-auto mb-3" style={{ color: 'var(--neutral-gray)' }} />
                <p style={{ color: 'var(--neutral-gray)' }}>No risk data available</p>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}