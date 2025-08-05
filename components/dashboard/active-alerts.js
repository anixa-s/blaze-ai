import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, Clock, MapPin } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { format } from "date-fns";

const severityColors = {
  info: { bg: "rgba(59, 130, 246, 0.1)", text: "#3b82f6", border: "rgba(59, 130, 246, 0.3)" },
  warning: { bg: "rgba(249, 115, 22, 0.1)", text: "var(--warning-orange)", border: "rgba(249, 115, 22, 0.3)" },
  critical: { bg: "rgba(239, 68, 68, 0.1)", text: "#ef4444", border: "rgba(239, 68, 68, 0.3)" },
  emergency: { bg: "rgba(220, 38, 38, 0.1)", text: "var(--danger-red)", border: "rgba(220, 38, 38, 0.3)" }
};

export default function ActiveAlerts({ alerts, isLoading }) {
  const sortedAlerts = alerts
    .slice()
    .sort((a, b) => {
      const severityOrder = { emergency: 4, critical: 3, warning: 2, info: 1 };
      return severityOrder[b.severity] - severityOrder[a.severity];
    })
    .slice(0, 5);

  return (
    <Card className="shadow-sm" style={{ backgroundColor: 'var(--surface-white)' }}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2" style={{ color: 'var(--forest-primary)' }}>
          <AlertTriangle className="w-5 h-5" />
          Active Alerts
        </CardTitle>
        <p className="text-sm" style={{ color: 'var(--neutral-gray)' }}>
          Current emergency notifications
        </p>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="space-y-4">
            {Array(3).fill(0).map((_, i) => (
              <div key={i} className="p-4 rounded-lg border" style={{ borderColor: 'var(--border-subtle)' }}>
                <div className="flex items-start justify-between mb-2">
                  <Skeleton className="h-4 w-32" />
                  <Skeleton className="h-5 w-16 rounded-full" />
                </div>
                <Skeleton className="h-3 w-full mb-2" />
                <Skeleton className="h-3 w-24" />
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-3">
            {sortedAlerts.map((alert) => {
              const severityColor = severityColors[alert.severity] || severityColors.info;
              return (
                <div 
                  key={alert.id}
                  className="p-4 rounded-lg border transition-all duration-200 hover:shadow-sm"
                  style={{ 
                    borderColor: severityColor.border,
                    backgroundColor: severityColor.bg
                  }}
                >
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="font-medium text-sm" style={{ color: 'var(--forest-primary)' }}>
                      {alert.title}
                    </h4>
                    <Badge 
                      variant="outline"
                      className="capitalize border text-xs"
                      style={{ 
                        backgroundColor: severityColor.bg,
                        color: severityColor.text,
                        borderColor: severityColor.border
                      }}
                    >
                      {alert.severity}
                    </Badge>
                  </div>
                  <p className="text-xs mb-3" style={{ color: 'var(--neutral-gray)' }}>
                    {alert.message.length > 120 ? 
                      `${alert.message.substring(0, 120)}...` : 
                      alert.message
                    }
                  </p>
                  <div className="flex items-center justify-between text-xs" style={{ color: 'var(--neutral-gray)' }}>
                    <div className="flex items-center gap-1">
                      <MapPin className="w-3 h-3" />
                      {alert.location_name}
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {format(new Date(alert.issued_date), "MMM d, HH:mm")}
                    </div>
                  </div>
                </div>
              );
            })}
            {sortedAlerts.length === 0 && (
              <div className="text-center py-8">
                <AlertTriangle className="w-12 h-12 mx-auto mb-3" style={{ color: 'var(--neutral-gray)' }} />
                <p style={{ color: 'var(--neutral-gray)' }}>No active alerts</p>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}