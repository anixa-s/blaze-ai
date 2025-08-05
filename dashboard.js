import React, { useState, useEffect } from "react";
import { WildfireRisk, WildfireAlert } from "@/entities/all";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  TrendingUp, 
  AlertTriangle, 
  Thermometer, 
  Wind, 
  Droplets,
  MapPin,
  Activity,
  Users
} from "lucide-react";

import RiskOverview from "../components/dashboard/RiskOverview";
import WeatherConditions from "../components/dashboard/WeatherConditions";
import ActiveAlerts from "../components/dashboard/ActiveAlerts";
import RiskTrends from "../components/dashboard/RiskTrends";

export default function Dashboard() {
  const [riskData, setRiskData] = useState([]);
  const [alerts, setAlerts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedTimeframe, setSelectedTimeframe] = useState("24h");

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setIsLoading(true);
    try {
      const [risks, activeAlerts] = await Promise.all([
        WildfireRisk.list("-created_date", 50),
        WildfireAlert.filter({ is_active: true }, "-created_date", 10)
      ]);
      setRiskData(risks);
      setAlerts(activeAlerts);
    } catch (error) {
      console.error("Error loading dashboard data:", error);
    }
    setIsLoading(false);
  };

  const getHighestRiskArea = () => {
    if (!riskData.length) return null;
    return riskData.reduce((highest, current) => 
      (current.risk_score || 0) > (highest.risk_score || 0) ? current : highest
    );
  };

  const getAverageRiskScore = () => {
    if (!riskData.length) return 0;
    const sum = riskData.reduce((acc, risk) => acc + (risk.risk_score || 0), 0);
    return Math.round(sum / riskData.length);
  };

  const getCriticalAlerts = () => {
    return alerts.filter(alert => alert.severity === "critical" || alert.severity === "emergency").length;
  };

  const highestRisk = getHighestRiskArea();

  return (
    <div className="min-h-screen p-6" style={{ backgroundColor: 'var(--background-light)' }}>
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold" style={{ color: 'var(--forest-primary)' }}>
              Wildfire Risk Dashboard
            </h1>
            <p className="mt-1" style={{ color: 'var(--neutral-gray)' }}>
              Real-time monitoring and prediction across Canadian regions
            </p>
          </div>
          <div className="flex gap-3">
            <Button
              variant={selectedTimeframe === "24h" ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedTimeframe("24h")}
            >
              24 Hours
            </Button>
            <Button
              variant={selectedTimeframe === "7d" ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedTimeframe("7d")}
            >
              7 Days
            </Button>
            <Button
              variant={selectedTimeframe === "30d" ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedTimeframe("30d")}
            >
              30 Days
            </Button>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="relative overflow-hidden shadow-sm" style={{ backgroundColor: 'var(--surface-white)' }}>
            <div className="absolute top-0 right-0 w-24 h-24 transform translate-x-8 -translate-y-8 rounded-full opacity-20" style={{ backgroundColor: 'var(--danger-red)' }} />
            <CardHeader className="p-6">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm font-medium" style={{ color: 'var(--neutral-gray)' }}>
                    Highest Risk Zone
                  </p>
                  <CardTitle className="text-2xl font-bold mt-2" style={{ color: 'var(--forest-primary)' }}>
                    {highestRisk?.location_name || "No Data"}
                  </CardTitle>
                  <p className="text-sm mt-1" style={{ color: 'var(--neutral-gray)' }}>
                    Risk Score: {highestRisk?.risk_score || 0}/100
                  </p>
                </div>
                <div className="p-3 rounded-xl" style={{ backgroundColor: 'rgba(220, 38, 38, 0.1)' }}>
                  <AlertTriangle className="w-5 h-5" style={{ color: 'var(--danger-red)' }} />
                </div>
              </div>
            </CardHeader>
          </Card>

          <Card className="relative overflow-hidden shadow-sm" style={{ backgroundColor: 'var(--surface-white)' }}>
            <div className="absolute top-0 right-0 w-24 h-24 transform translate-x-8 -translate-y-8 rounded-full opacity-20" style={{ backgroundColor: 'var(--warning-orange)' }} />
            <CardHeader className="p-6">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm font-medium" style={{ color: 'var(--neutral-gray)' }}>
                    Average Risk Score
                  </p>
                  <CardTitle className="text-3xl font-bold mt-2" style={{ color: 'var(--forest-primary)' }}>
                    {getAverageRiskScore()}
                  </CardTitle>
                </div>
                <div className="p-3 rounded-xl" style={{ backgroundColor: 'rgba(249, 115, 22, 0.1)' }}>
                  <Activity className="w-5 h-5" style={{ color: 'var(--warning-orange)' }} />
                </div>
              </div>
            </CardHeader>
          </Card>

          <Card className="relative overflow-hidden shadow-sm" style={{ backgroundColor: 'var(--surface-white)' }}>
            <div className="absolute top-0 right-0 w-24 h-24 transform translate-x-8 -translate-y-8 rounded-full opacity-20" style={{ backgroundColor: 'var(--danger-red)' }} />
            <CardHeader className="p-6">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm font-medium" style={{ color: 'var(--neutral-gray)' }}>
                    Critical Alerts
                  </p>
                  <CardTitle className="text-3xl font-bold mt-2" style={{ color: 'var(--forest-primary)' }}>
                    {getCriticalAlerts()}
                  </CardTitle>
                </div>
                <div className="p-3 rounded-xl" style={{ backgroundColor: 'rgba(220, 38, 38, 0.1)' }}>
                  <AlertTriangle className="w-5 h-5" style={{ color: 'var(--danger-red)' }} />
                </div>
              </div>
            </CardHeader>
          </Card>

          <Card className="relative overflow-hidden shadow-sm" style={{ backgroundColor: 'var(--surface-white)' }}>
            <div className="absolute top-0 right-0 w-24 h-24 transform translate-x-8 -translate-y-8 rounded-full opacity-20" style={{ backgroundColor: 'var(--forest-secondary)' }} />
            <CardHeader className="p-6">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm font-medium" style={{ color: 'var(--neutral-gray)' }}>
                    Monitored Locations
                  </p>
                  <CardTitle className="text-3xl font-bold mt-2" style={{ color: 'var(--forest-primary)' }}>
                    {riskData.length}
                  </CardTitle>
                </div>
                <div className="p-3 rounded-xl" style={{ backgroundColor: 'rgba(45, 122, 95, 0.1)' }}>
                  <MapPin className="w-5 h-5" style={{ color: 'var(--forest-secondary)' }} />
                </div>
              </div>
            </CardHeader>
          </Card>
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <RiskOverview 
              riskData={riskData} 
              isLoading={isLoading}
              timeframe={selectedTimeframe}
            />
            <RiskTrends 
              riskData={riskData}
              isLoading={isLoading}
              timeframe={selectedTimeframe}
            />
          </div>

          <div className="space-y-6">
            <ActiveAlerts 
              alerts={alerts}
              isLoading={isLoading}
            />
            <WeatherConditions 
              riskData={riskData}
              isLoading={isLoading}
            />
          </div>
        </div>
      </div>
    </div>
  );
}