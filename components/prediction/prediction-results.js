import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { 
  AlertTriangle, 
  TrendingUp, 
  Eye, 
  CheckCircle, 
  Flame,
  Wind,
  Thermometer
} from "lucide-react";
import { format } from "date-fns";

const riskColors = {
  very_low: { bg: "rgba(5, 150, 105, 0.1)", text: "var(--success-green)", border: "rgba(5, 150, 105, 0.3)" },
  low: { bg: "rgba(34, 197, 94, 0.1)", text: "#22c55e", border: "rgba(34, 197, 94, 0.3)" },
  moderate: { bg: "rgba(249, 115, 22, 0.1)", text: "var(--warning-orange)", border: "rgba(249, 115, 22, 0.3)" },
  high: { bg: "rgba(239, 68, 68, 0.1)", text: "#ef4444", border: "rgba(239, 68, 68, 0.3)" },
  extreme: { bg: "rgba(220, 38, 38, 0.1)", text: "var(--danger-red)", border: "rgba(220, 38, 38, 0.3)" }
};

export default function PredictionResults({ prediction }) {
  const riskColor = riskColors[prediction.risk_level] || riskColors.moderate;

  return (
    <div className="space-y-4">
      {/* Risk Assessment Summary */}
      <Card className="shadow-sm" style={{ backgroundColor: 'var(--surface-white)' }}>
        <CardHeader>
          <CardTitle className="flex items-center gap-2" style={{ color: 'var(--forest-primary)' }}>
            <Flame className="w-5 h-5" />
            Risk Assessment
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center mb-4">
            <div 
              className="w-24 h-24 rounded-full mx-auto mb-4 flex items-center justify-center"
              style={{ backgroundColor: riskColor.bg, border: `2px solid ${riskColor.border}` }}
            >
              <span 
                className="text-3xl font-bold"
                style={{ color: riskColor.text }}
              >
                {prediction.risk_score}
              </span>
            </div>
            <Badge 
              className="text-lg px-4 py-2 capitalize"
              style={{ 
                backgroundColor: riskColor.bg,
                color: riskColor.text,
                border: `1px solid ${riskColor.border}`
              }}
            >
              {prediction.risk_level?.replace('_', ' ')} Risk
            </Badge>
          </div>

          <div className="grid grid-cols-2 gap-4 mt-6">
            <div className="text-center">
              <p className="text-sm" style={{ color: 'var(--neutral-gray)' }}>Fire Weather Index</p>
              <p className="text-xl font-bold" style={{ color: 'var(--forest-primary)' }}>
                {prediction.fire_weather_index?.toFixed(1) || "N/A"}
              </p>
            </div>
            <div className="text-center">
              <p className="text-sm" style={{ color: 'var(--neutral-gray)' }}>Confidence Level</p>
              <p className="text-xl font-bold" style={{ color: 'var(--forest-primary)' }}>
                {prediction.confidence_level}%
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Key Factors */}
      <Card className="shadow-sm" style={{ backgroundColor: 'var(--surface-white)' }}>
        <CardHeader>
          <CardTitle className="flex items-center gap-2" style={{ color: 'var(--forest-primary)' }}>
            <TrendingUp className="w-5 h-5" />
            Key Risk Factors
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {prediction.key_factors?.map((factor, index) => (
              <div key={index} className="flex items-center gap-2">
                <AlertTriangle className="w-4 h-4" style={{ color: 'var(--warning-orange)' }} />
                <span className="text-sm">{factor}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Environmental Analysis */}
      <Card className="shadow-sm" style={{ backgroundColor: 'var(--surface-white)' }}>
        <CardHeader>
          <CardTitle className="flex items-center gap-2" style={{ color: 'var(--forest-primary)' }}>
            <Eye className="w-5 h-5" />
            Environmental Analysis
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h4 className="font-medium mb-2" style={{ color: 'var(--forest-primary)' }}>
              Vegetation Assessment
            </h4>
            <p className="text-sm" style={{ color: 'var(--neutral-gray)' }}>
              {prediction.vegetation_assessment}
            </p>
          </div>
          
          <div>
            <h4 className="font-medium mb-2" style={{ color: 'var(--forest-primary)' }}>
              Weather Impact
            </h4>
            <p className="text-sm" style={{ color: 'var(--neutral-gray)' }}>
              {prediction.weather_impact}
            </p>
          </div>

          <div>
            <h4 className="font-medium mb-2" style={{ color: 'var(--forest-primary)' }}>
              Fire Behavior Prediction
            </h4>
            <p className="text-sm" style={{ color: 'var(--neutral-gray)' }}>
              {prediction.fire_behavior_prediction}
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Recommendations */}
      <Card className="shadow-sm" style={{ backgroundColor: 'var(--surface-white)' }}>
        <CardHeader>
          <CardTitle className="flex items-center gap-2" style={{ color: 'var(--forest-primary)' }}>
            <CheckCircle className="w-5 h-5" />
            Recommended Actions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {prediction.recommendations?.map((recommendation, index) => (
              <div key={index} className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 mt-0.5" style={{ color: 'var(--success-green)' }} />
                <span className="text-sm">{recommendation}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Detailed Analysis */}
      {prediction.detailed_analysis && (
        <Alert>
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription className="mt-2">
            <strong>Detailed Analysis:</strong>
            <br />
            {prediction.detailed_analysis}
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
}