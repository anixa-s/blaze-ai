import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MapPin, CloudRain, Thermometer, Wind, Droplets, Loader2 } from "lucide-react";

export default function PredictionForm({ onSubmit, isLoading }) {
  const [formData, setFormData] = useState({
    location: "",
    latitude: "",
    longitude: "",
    temperature: "",
    humidity: "",
    windSpeed: "",
    precipitation: "",
    vegetationType: "",
    season: ""
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const isFormValid = () => {
    return (
      formData.location.trim() !== "" &&
      formData.latitude !== "" &&
      formData.longitude !== "" &&
      formData.temperature !== "" &&
      formData.humidity !== "" &&
      formData.windSpeed !== "" &&
      formData.precipitation !== "" &&
      formData.vegetationType !== "" &&
      formData.season !== ""
    );
  };

  return (
    <Card className="shadow-sm" style={{ backgroundColor: 'var(--surface-white)' }}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2" style={{ color: 'var(--forest-primary)' }}>
          <MapPin className="w-5 h-5" />
          Environmental Data Input
        </CardTitle>
        <p className="text-sm" style={{ color: 'var(--neutral-gray)' }}>
          Enter current conditions for AI risk analysis
        </p>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="location">Location Name</Label>
              <Input
                id="location"
                placeholder="e.g. Banff National Park"
                value={formData.location}
                onChange={(e) => handleInputChange('location', e.target.value)}
                disabled={isLoading}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="season">Season</Label>
              <Select 
                value={formData.season} 
                onValueChange={(value) => handleInputChange('season', value)}
                disabled={isLoading}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select season" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="spring">Spring</SelectItem>
                  <SelectItem value="summer">Summer</SelectItem>
                  <SelectItem value="fall">Fall</SelectItem>
                  <SelectItem value="winter">Winter</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="latitude">Latitude</Label>
              <Input
                id="latitude"
                type="number"
                step="any"
                placeholder="51.1784"
                value={formData.latitude}
                onChange={(e) => handleInputChange('latitude', e.target.value)}
                disabled={isLoading}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="longitude">Longitude</Label>
              <Input
                id="longitude"
                type="number"
                step="any"
                placeholder="-115.5708"
                value={formData.longitude}
                onChange={(e) => handleInputChange('longitude', e.target.value)}
                disabled={isLoading}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="temperature" className="flex items-center gap-2">
                <Thermometer className="w-4 h-4" />
                Temperature (°C)
              </Label>
              <Input
                id="temperature"
                type="number"
                placeholder="25"
                value={formData.temperature}
                onChange={(e) => handleInputChange('temperature', e.target.value)}
                disabled={isLoading}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="humidity" className="flex items-center gap-2">
                <Droplets className="w-4 h-4" />
                Humidity (%)
              </Label>
              <Input
                id="humidity"
                type="number"
                min="0"
                max="100"
                placeholder="45"
                value={formData.humidity}
                onChange={(e) => handleInputChange('humidity', e.target.value)}
                disabled={isLoading}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="windSpeed" className="flex items-center gap-2">
                <Wind className="w-4 h-4" />
                Wind Speed (km/h)
              </Label>
              <Input
                id="windSpeed"
                type="number"
                min="0"
                placeholder="15"
                value={formData.windSpeed}
                onChange={(e) => handleInputChange('windSpeed', e.target.value)}
                disabled={isLoading}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="precipitation" className="flex items-center gap-2">
                <CloudRain className="w-4 h-4" />
                Recent Precipitation (mm)
              </Label>
              <Input
                id="precipitation"
                type="number"
                min="0"
                step="0.1"
                placeholder="2.5"
                value={formData.precipitation}
                onChange={(e) => handleInputChange('precipitation', e.target.value)}
                disabled={isLoading}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="vegetationType">Vegetation Type</Label>
            <Select 
              value={formData.vegetationType} 
              onValueChange={(value) => handleInputChange('vegetationType', value)}
              disabled={isLoading}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select vegetation type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="coniferous_forest">Coniferous Forest</SelectItem>
                <SelectItem value="mixed_forest">Mixed Forest</SelectItem>
                <SelectItem value="grassland">Grassland</SelectItem>
                <SelectItem value="shrub_land">Shrub Land</SelectItem>
                <SelectItem value="dry_forest">Dry Forest</SelectItem>
                <SelectItem value="wetland">Wetland</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Button 
            type="submit" 
            className="w-full flex items-center gap-2"
            disabled={!isFormValid() || isLoading}
            style={{ 
              backgroundColor: isFormValid() && !isLoading ? 'var(--forest-primary)' : undefined,
              cursor: isFormValid() && !isLoading ? 'pointer' : 'not-allowed'
            }}
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Analyzing...
              </>
            ) : (
              "Generate Risk Prediction"
            )}
          </Button>
          
          {/* Debug info - remove in production */}
          <div className="text-xs text-gray-500 mt-2">
            Form valid: {isFormValid() ? "Yes" : "No"} - 
            Missing: {Object.entries(formData).filter(([_, value]) => !value).map(([key]) => key).join(", ") || "None"}
          </div>
        </form>
      </CardContent>
    </Card>
  );
}