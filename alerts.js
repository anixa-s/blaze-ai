import React, { useState, useEffect } from "react";
import { WildfireAlert } from "@/entities/all";
import { Skeleton } from "@/components/ui/skeleton";
import AlertCard from "../components/alerts/AlertCard";
import AlertFilters from "../components/alerts/AlertFilters";

export default function Alerts() {
  const [alerts, setAlerts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filters, setFilters] = useState({ severity: "all", search: "" });

  useEffect(() => {
    loadAlerts();
  }, []);

  const loadAlerts = async () => {
    setIsLoading(true);
    try {
      const activeAlerts = await WildfireAlert.filter({ is_active: true }, "-issued_date", 50);
      setAlerts(activeAlerts);
    } catch (error) {
      console.error("Error loading alerts:", error);
    }
    setIsLoading(false);
  };

  const filteredAlerts = alerts.filter(alert => {
    const severityMatch = filters.severity === "all" || alert.severity === filters.severity;
    const searchMatch = filters.search === "" ||
      alert.title.toLowerCase().includes(filters.search.toLowerCase()) ||
      alert.location_name.toLowerCase().includes(filters.search.toLowerCase());
    return severityMatch && searchMatch;
  });

  return (
    <div className="min-h-screen p-6" style={{ backgroundColor: 'var(--background-light)' }}>
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold" style={{ color: 'var(--forest-primary)' }}>
            Active Wildfire Alerts
          </h1>
          <p className="mt-1" style={{ color: 'var(--neutral-gray)' }}>
            Official warnings and notices for affected regions
          </p>
        </div>

        {/* Filters */}
        <AlertFilters onFilterChange={setFilters} />

        {/* Alerts List */}
        <div className="space-y-4">
          {isLoading ? (
            Array(4).fill(0).map((_, i) => (
              <Skeleton key={i} className="h-48 w-full rounded-lg" />
            ))
          ) : filteredAlerts.length > 0 ? (
            filteredAlerts.map(alert => (
              <AlertCard key={alert.id} alert={alert} />
            ))
          ) : (
            <div className="text-center py-16">
              <h3 className="text-xl font-semibold" style={{ color: 'var(--forest-primary)' }}>
                No active alerts match your criteria.
              </h3>
              <p style={{ color: 'var(--neutral-gray)' }}>
                All monitored regions are currently clear.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}