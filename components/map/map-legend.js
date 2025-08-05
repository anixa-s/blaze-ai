import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function MapLegend({ riskColors }) {
  return (
    <div className="absolute bottom-4 right-4 z-[1000]">
      <Card className="shadow-lg" style={{ backgroundColor: 'var(--surface-white)' }}>
        <CardHeader className="p-3">
          <CardTitle className="text-sm" style={{ color: 'var(--forest-primary)' }}>Risk Level</CardTitle>
        </CardHeader>
        <CardContent className="p-3 pt-0">
          <ul className="space-y-2">
            {Object.entries(riskColors).map(([level, color]) => (
              <li key={level} className="flex items-center gap-2">
                <span 
                  className="w-4 h-4 rounded-full" 
                  style={{ backgroundColor: color }}
                />
                <span className="text-xs capitalize" style={{ color: 'var(--neutral-gray)' }}>
                  {level.replace('_', ' ')}
                </span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}