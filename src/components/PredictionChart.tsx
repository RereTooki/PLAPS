import React from "react";

interface PredictionChartProps {
  grade: number;
}

const PredictionChart = ({ grade }: PredictionChartProps) => {
  return (
    <div className="w-32 h-32 border-8 border-green-400 rounded-full flex items-center justify-center text-2xl font-bold">
      {grade}%
    </div>
  );
};

export default PredictionChart;
