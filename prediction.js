import React, { useState } from "react";
import { InvokeLLM } from "@/integrations/Core";
import { WildfireRisk } from "@/entities/all";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Loader2, Brain, MapPin, Calendar, TrendingUp } from "lucide-react";

import PredictionForm from "../components/prediction/PredictionForm";
import PredictionResults from "../components/prediction/PredictionResults";
import ScenarioSimulation from "../components/prediction/ScenarioSimulation";

export default function Prediction() {
  const [isLoading, setIsLoading] = useState(false);
  const [prediction, setPrediction] = useState(null);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState("predict");

  const generatePrediction = async (formData) => {
    setIsLoading(true);
    setError(null);

    try {
      const prompt = `
        As a wildfire prediction AI system, analyze the following conditions and provide a comprehensive wildfire risk assessment:

        Location: ${formData.location}
        Coordinates: ${formData.latitude}, ${formData.longitude}
        Current Conditions:
        - Temperature: ${formData.temperature}°C
        - Humidity: ${formData.humidity}%
        - Wind Speed: ${formData.windSpeed} km/h
        - Recent Precipitation: ${formData.precipitation}mm
        - Vegetation Type: ${formData.vegetationType}
        - Season: ${formData.season}

        Provide a detailed analysis including:
        1. Overall risk assessment (very_low, low, moderate, high, extreme)
        2. Risk score (0-100)
        3. Key contributing factors
        4. Weather forecast impact
        5. Vegetation dryness assessment
        6. Fire behavior predictions if ignition occurs
        7. Recommended monitoring actions
        8. Confidence level in the prediction

        Consider Canadian Fire Weather Index calculations and real-world wildfire behavior patterns.
      `;

      const result = await InvokeLLM({
        prompt,
        add_context_from_internet: true,
        response_json_schema: {
          type: "object",
          properties: {
            risk_level: {
              type: "string",
              enum: ["very_low", "low", "moderate", "high", "extreme"]
            },
            risk_score: {
              type: "number",
              minimum: 0,
              maximum: 100
            },
            fire_weather_index: {
              type: "number"
            },
            confidence_level: {
              type: "number",
              minimum: 0,
              maximum: 100
            },
            key_factors: {
              type: "array",
              items: { type: "string" }
            },
            vegetation_assessment: {
              type: "string"
            },
            weather_impact: {
              type: "string"
            },
            fire_behavior_prediction: {
              type: "string"
            },
            recommendations: {
              type: "array",
              items: { type: "string" }
            },
            detailed_analysis: {
              type: "string"
            }
          }
        }
      });

      const predictionData = {
        ...result,
        location_data: formData,
        generated_at: new Date().toISOString()
      };

      setPrediction(predictionData);

      // Save to database
      await WildfireRisk.create({
        location_name: formData.location,
        latitude: parseFloat(formData.latitude),
        longitude: parseFloat(formData.longitude),
        risk_level: result.risk_level,
        risk_score: result.risk_score,
        temperature: parseFloat(formData.temperature),
        humidity: parseFloat(formData.humidity),
        wind_speed: parseFloat(formData.windSpeed),
        precipitation: parseFloat(formData.precipitation),
        vegetation_dryness: formData.vegetationType === "dry_forest" ? "very_dry" : "moderate",
        fire_weather_index: result.fire_weather_index,
        predicted_for_date: new Date().toISOString().split('T')[0],
        confidence_level: result.confidence_level
      });

    } catch (err) {
      setError("Failed to generate prediction. Please try again.");
      console.error("Prediction error:", err);
    }

    setIsLoading(false);
  };

  return (
    <div className="min-h-screen p-6" style={{ backgroundColor: 'var(--background-light)' }}>
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold" style={{ color: 'var(--forest-primary)' }}>
              AI Fire Prediction Engine
            </h1>
            <p className="mt-1" style={{ color: 'var(--neutral-gray)' }}>
              Advanced wildfire risk modeling and scenario simulation
            </p>
          </div>
          <div className="flex gap-3">
            <Button
              variant={activeTab === "predict" ? "default" : "outline"}
              onClick={() => setActiveTab("predict")}
              className="flex items-center gap-2"
            >
              <Brain className="w-4 h-4" />
              Risk Prediction
            </Button>
            <Button
              variant={activeTab === "simulate" ? "default" : "outline"}
              onClick={() => setActiveTab("simulate")}
              className="flex items-center gap-2"
            >
              <TrendingUp className="w-4 h-4" />
              Scenario Simulation
            </Button>
          </div>
        </div>

        {error && (
          <Alert variant="destructive">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {/* Main Content */}
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Input Panel */}
          <div className="space-y-6">
            {activeTab === "predict" ? (
              <PredictionForm 
                onSubmit={generatePrediction}
                isLoading={isLoading}
              />
            ) : (
              <ScenarioSimulation />
            )}
          </div>

          {/* Results Panel */}
          <div className="space-y-6">
            {prediction && activeTab === "predict" && (
              <PredictionResults 
                prediction={prediction}
              />
            )}
            
            {!prediction && activeTab === "predict" && (
              <Card className="shadow-sm" style={{ backgroundColor: 'var(--surface-white)' }}>
                <CardContent className="p-8 text-center">
                  <Brain className="w-16 h-16 mx-auto mb-4" style={{ color: 'var(--neutral-gray)' }} />
                  <h3 className="text-lg font-semibold mb-2" style={{ color: 'var(--forest-primary)' }}>
                    Ready for Analysis
                  </h3>
                  <p style={{ color: 'var(--neutral-gray)' }}>
                    Enter location and weather data to generate AI-powered wildfire risk predictions
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>

        {/* Loading Overlay */}
        {isLoading && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <Card className="p-6">
              <div className="flex items-center gap-4">
                <Loader2 className="w-8 h-8 animate-spin" style={{ color: 'var(--forest-primary)' }} />
                <div>
                  <h3 className="font-semibold" style={{ color: 'var(--forest-primary)' }}>
                    Analyzing Conditions
                  </h3>
                  <p className="text-sm" style={{ color: 'var(--neutral-gray)' }}>
                    AI model processing weather patterns and environmental data...
                  </p>
                </div>
              </div>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}