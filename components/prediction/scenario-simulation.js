import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, Wind, Thermometer, Droplets, AlertTriangle } from "lucide-react";

export default function ScenarioSimulation() {
  const [scenario, setScenario] = useState({
    temperature: [25],
    windSpeed: [15],
    humidity: [40],
    precipitationDays: [0]
  });

  const [simulationResult, setSimulationResult] = useState(null);

  const calculateRiskImpact = () => {
    const temp = scenario.temperature[0];
    const wind = scenario.windSpeed[0];
    const humidity = scenario.humidity[0];
    const precipitation = scenario.precipitationDays[0];

    // Simple risk calculation algorithm
    let riskScore = 0;
    
    // Temperature impact (higher temp = higher risk)
    if (temp > 30) riskScore += 30;
    else if (temp > 25) riskScore += 20;
    else if (temp > 20) riskScore += 10;

    // Wind impact (higher wind = higher risk)
    if (wind > 25) riskScore += 25;
    else if (wind > 15) riskScore += 15;
    else if (wind > 10) riskScore += 8;

    // Humidity impact (lower humidity = higher risk)
    if (humidity < 30) riskScore += 25;
    else if (humidity < 50) riskScore += 15;
    else if (humidity < 70) riskScore += 5;

    // Precipitation impact (no recent rain = higher risk)
    if (precipitation === 0) riskScore += 20;
    else if (precipitation < 3) riskScore += 10;
    else if (precipitation < 7) riskScore += 5;

    const finalScore = Math.min(100, Math.max(0, riskScore));
    
    let riskLevel = "very_low";
    if (finalScore > 80) riskLevel = "extreme";
    else if (finalScore > 60) riskLevel = "high";
    else if (finalScore > 40) riskLevel = "moderate";
    else if (finalScore > 20) riskLevel = "low";

    return { score: finalScore, level: riskLevel };
  };

  const runSimulation = () => {
    const result = calculateRiskImpact();
    setSimulationResult(result);
  };

  const riskColors = {
    very_low: { bg: "rgba(5, 150, 105, 0.1)", text: "var(--success-green)" },
    low: { bg: "rgba(34, 197, 94, 0.1)", text: "#22c55e" },
    moderate: { bg: "rgba(249, 115, 22, 0.1)", text: "var(--warning-orange)" },
    high: { bg: "rgba(239, 68, 68, 0.1)", text: "#ef4444" },
    extreme: { bg: "rgba(220, 38, 38, 0.1)", text: "var(--danger-red)" }
  };

  return (
    <div className="space-y-4">
      <Card className="shadow-sm" style={{ backgroundColor: 'var(--surface-white)' }}>
        <CardHeader>
          <CardTitle className="flex items-center gap-2" style={{ color: 'var(--forest-primary)' }}>
            <TrendingUp className="w-5 h-5" />
            Scenario Parameters
          </CardTitle>
          <p className="text-sm" style={{ color: 'var(--neutral-gray)' }}>
            Adjust conditions to simulate different risk scenarios
          </p>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-3">
            <Label className="flex items-center gap-2">
              <Thermometer className="w-4 h-4" />
              Temperature: {scenario.temperature[0]}°C
            </Label>
            <Slider
              value={scenario.temperature}
              onValueChange={(value) => setScenario(prev => ({ ...prev, temperature: value }))}
              min={-10}
              max={45}
              step={1}
              className="w-full"
            />
          </div>

          <div className="space-y-3">
            <Label className="flex items-center gap-2">
              <Wind className="w-4 h-4" />
              Wind Speed: {scenario.windSpeed[0]} km/h
            </Label>
            <Slider
              value={scenario.windSpeed}
              onValueChange={(value) => setScenario(prev => ({ ...prev, windSpeed: value }))}
              min={0}
              max={60}
              step={1}
              className="w-full"
            />
          </div>

          <div className="space-y-3">
            <Label className="flex items-center gap-2">
              <Droplets className="w-4 h-4" />
              Humidity: {scenario.humidity[0]}%
            </Label>
            <Slider
              value={scenario.humidity}
              onValueChange={(value) => setScenario(prev => ({ ...prev, humidity: value }))}
              min={10}
              max={100}
              step={1}
              className="w-full"
            />
          </div>

          <div className="space-y-3">
            <Label>Days Since Last Precipitation: {scenario.precipitationDays[0]}</Label>
            <Slider
              value={scenario.precipitationDays}
              onValueChange={(value) => setScenario(prev => ({ ...prev, precipitationDays: value }))}
              min={0}
              max={30}
              step={1}
              className="w-full"
            />
          </div>

          <Button 
            onClick={runSimulation} 
            className="w-full"
            style={{ backgroundColor: 'var(--forest-primary)' }}
          >
            Run Scenario Simulation
          </Button>
        </CardContent>
      </Card>

      {simulationResult && (
        <Card className="shadow-sm" style={{ backgroundColor: 'var(--surface-white)' }}>
          <CardHeader>
            <CardTitle className="flex items-center gap-2" style={{ color: 'var(--forest-primary)' }}>
              <AlertTriangle className="w-5 h-5" />
              Simulation Results
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center">
              <div 
                className="w-20 h-20 rounded-full mx-auto mb-4 flex items-center justify-center"
                style={{ 
                  backgroundColor: riskColors[simulationResult.level]?.bg,
                  border: `2px solid ${riskColors[simulationResult.level]?.text}`
                }}
              >
                <span 
                  className="text-2xl font-bold"
                  style={{ color: riskColors[simulationResult.level]?.text }}
                >
                  {simulationResult.score}
                </span>
              </div>
              <Badge 
                className="text-base px-4 py-2 capitalize"
                style={{ 
                  backgroundColor: riskColors[simulationResult.level]?.bg,
                  color: riskColors[simulationResult.level]?.text,
                  border: `1px solid ${riskColors[simulationResult.level]?.text}`
                }}
              >
                {simulationResult.level?.replace('_', ' ')} Risk
              </Badge>
            </div>

            <div className="mt-6 space-y-2">
              <h4 className="font-medium" style={{ color: 'var(--forest-primary)' }}>
                Scenario Impact Analysis:
              </h4>
              <ul className="text-sm space-y-1" style={{ color: 'var(--neutral-gray)' }}>
                <li>• Temperature conditions: {scenario.temperature[0] > 30 ? "Extreme heat increases fire risk" : scenario.temperature[0] > 25 ? "High temperature contributes to dry conditions" : "Moderate temperature impact"}</li>
                <li>• Wind conditions: {scenario.windSpeed[0] > 25 ? "Strong winds create dangerous fire spread conditions" : scenario.windSpeed[0] > 15 ? "Moderate winds may accelerate fire spread" : "Low wind conditions limit fire spread"}</li>
                <li>• Humidity levels: {scenario.humidity[0] < 30 ? "Very low humidity creates extreme fire conditions" : scenario.humidity[0] < 50 ? "Low humidity increases fire risk" : "Adequate humidity helps suppress fire risk"}</li>
                <li>• Precipitation history: {scenario.precipitationDays[0] === 0 ? "No recent rainfall creates dry fuel conditions" : scenario.precipitationDays[0] < 7 ? "Limited recent moisture" : "Recent precipitation reduces fire risk"}</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}