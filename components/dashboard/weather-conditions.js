import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Thermometer, Wind, Droplets, Eye } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

export default function WeatherConditions({ riskData, isLoading }) {
  const getAverageConditions = () => {
    if (!riskData.length) return null;
    
    const totals = riskData.reduce((acc, risk) => ({
      temperature: acc.temperature + (risk.temperature || 0),
      humidity: acc.humidity + (risk.humidity || 0),
      windSpeed: acc.windSpeed + (risk.wind_speed || 0),
      count: acc.count + 1
    }), { temperature: 0, humidity: 0, windSpeed: 0, count: 0 });

    return {
      temperature: Math.round(totals.temperature / totals.count),
      humidity: Math.round(totals.humidity / totals.count),
      windSpeed: Math.round(totals.windSpeed / totals.count)
    };
  };

  const conditions = getAverageConditions();

  return (
    <Card className="shadow-sm" style={{ backgroundColor: 'var(--surface-white)' }}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2" style={{ color: 'var(--forest-primary)' }}>
          <Eye className="w-5 h-5" />
          Weather Conditions
        </CardTitle>
        <p className="text-sm" style={{ color: 'var(--neutral-gray)' }}>
          Average across monitored regions
        </p>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="space-y-4">
            {Array(3).fill(0).map((_, i) => (
              <div key={i} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Skeleton className="w-8 h-8 rounded-full" />
                  <Skeleton className="h-4 w-20" />
                </div>
                <Skeleton className="h-6 w-16" />
              </div>
            ))}
          </div>
        ) : conditions ? (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div 
                  className="w-8 h-8 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: 'rgba(239, 68, 68, 0.1)' }}
                >
                  <Thermometer className="w-4 h-4" style={{ color: '#ef4444' }} />
                </div>
                <span className="font-medium" style={{ color: 'var(--forest-primary)' }}>
                  Temperature
                </span>
              </div>
              <span className="text-xl font-bold" style={{ color: 'var(--forest-primary)' }}>
                {conditions.temperature}°C
              </span>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div 
                  className="w-8 h-8 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: 'rgba(59, 130, 246, 0.1)' }}
                >
                  <Droplets className="w-4 h-4" style={{ color: '#3b82f6' }} />
                </div>
                <span className="font-medium" style={{ color: 'var(--forest-primary)' }}>
                  Humidity
                </span>
              </div>
              <span className="text-xl font-bold" style={{ color: 'var(--forest-primary)' }}>
                {conditions.humidity}%
              </span>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div 
                  className="w-8 h-8 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: 'rgba(107, 114, 128, 0.1)' }}
                >
                  <Wind className="w-4 h-4" style={{ color: 'var(--neutral-gray)' }} />
                </div>
                <span className="font-medium" style={{ color: 'var(--forest-primary)' }}>
                  Wind Speed
                </span>
              </div>
              <span className="text-xl font-bold" style={{ color: 'var(--forest-primary)' }}>
                {conditions.windSpeed} km/h
              </span>
            </div>
          </div>
        ) : (
          <div className="text-center py-4">
            <p style={{ color: 'var(--neutral-gray)' }}>No weather data available</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}