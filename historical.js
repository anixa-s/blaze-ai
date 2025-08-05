import React, { useState, useEffect } from "react";
import { HistoricalFire } from "@/entities/all";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import SummaryCards from "../components/historical/SummaryCards";
import HistoricalDataTable from "../components/historical/HistoricalDataTable";

export default function Historical() {
  const [fires, setFires] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadHistoricalData();
  }, []);

  const loadHistoricalData = async () => {
    setIsLoading(true);
    try {
      const data = await HistoricalFire.list("-start_date", 100);
      setFires(data);
    } catch (error) {
      console.error("Error loading historical fire data:", error);
    }
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen p-6" style={{ backgroundColor: 'var(--background-light)' }}>
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold" style={{ color: 'var(--forest-primary)' }}>
            Historical Wildfire Data
          </h1>
          <p className="mt-1" style={{ color: 'var(--neutral-gray)' }}>
            Analysis of past wildfire events in Canada
          </p>
        </div>

        {/* Summary Cards */}
        <SummaryCards fires={fires} isLoading={isLoading} />

        {/* Data Table */}
        <Card className="shadow-sm" style={{ backgroundColor: 'var(--surface-white)' }}>
          <CardContent className="p-4 md:p-6">
            {isLoading ? (
              <Skeleton className="h-[500px] w-full" />
            ) : (
              <HistoricalDataTable data={fires} />
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}