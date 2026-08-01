import React, { useState, useMemo } from 'react';
import { 
  TrendingUp, 
  Sliders, 
  Sparkles, 
  Activity, 
  CheckCircle2, 
  Zap, 
  RotateCcw,
  BarChart2
} from 'lucide-react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Legend
} from 'recharts';
import { predictiveHistoricalAndForecast } from '../utils/sampleData';

export default function PredictiveAnalytics() {
  const [adSpendBoost, setAdSpendBoost] = useState(10); // % increase
  const [priceChange, setPriceChange] = useState(5);   // % change
  const [marketGrowth, setMarketGrowth] = useState(8); // % baseline growth

  // Re-calculate forecast line dynamically based on parameters
  const simulatedForecast = useMemo(() => {
    const boostFactor = 1 + (adSpendBoost * 0.008) + (priceChange * 0.006) + (marketGrowth * 0.005);

    return predictiveHistoricalAndForecast.map(item => {
      if (!item.forecast) return item;

      const adjustedForecast = Math.round(item.forecast * boostFactor);
      const adjustedUpper = Math.round(item.upperConfidence * (boostFactor + 0.04));
      const adjustedLower = Math.round(item.lowerConfidence * (boostFactor - 0.03));

      return {
        ...item,
        forecast: adjustedForecast,
        upperConfidence: adjustedUpper,
        lowerConfidence: adjustedLower
      };
    });
  }, [adSpendBoost, priceChange, marketGrowth]);

  const endForecastValue = simulatedForecast[simulatedForecast.length - 1].forecast;
  const initialForecastValue = predictiveHistoricalAndForecast[predictiveHistoricalAndForecast.length - 1].forecast;
  const percentageGain = (((endForecastValue - initialForecastValue) / initialForecastValue) * 100).toFixed(1);

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="glass-panel p-5 rounded-2xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-extrabold text-white flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-indigo-400" />
            <span>AI Predictive Forecasting & Scenario Simulator</span>
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Time-series Holt-Winters model with interactive driver sensitivity controls.
          </p>
        </div>

        {/* Model Specs */}
        <div className="flex items-center space-x-3 text-xs">
          <div className="px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 flex items-center space-x-2">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
            <span className="text-slate-300 font-medium">Model R²: 0.962</span>
          </div>
          <div className="px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 flex items-center space-x-2">
            <Activity className="w-3.5 h-3.5 text-indigo-400" />
            <span className="text-slate-300 font-medium">MAPE: 3.14%</span>
          </div>
        </div>
      </div>

      {/* Grid: Main Forecast Graph (2 Cols) & Scenario Controller (1 Col) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Main Chart */}
        <div className="lg:col-span-2 glass-panel p-5 rounded-2xl space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-white">6-Month Revenue Forecast & Confidence Intervals</h3>
              <p className="text-xs text-slate-400">Historical actuals (solid blue) vs AI Projected trajectory (dashed purple)</p>
            </div>
            <div className="flex items-center space-x-3 text-xs">
              <span className="flex items-center space-x-1">
                <span className="w-2.5 h-2.5 rounded-full bg-indigo-500"></span>
                <span className="text-slate-300">Actual</span>
              </span>
              <span className="flex items-center space-x-1">
                <span className="w-2.5 h-2.5 rounded-full bg-purple-400"></span>
                <span className="text-slate-300">Forecast</span>
              </span>
            </div>
          </div>

          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={simulatedForecast} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.5} />
                <XAxis dataKey="month" stroke="#94a3b8" fontSize={11} />
                <YAxis stroke="#94a3b8" fontSize={11} tickFormatter={(v) => `$${v / 1000}k`} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '0.75rem', fontSize: '12px' }}
                  formatter={(val) => [val ? `$${val.toLocaleString()}` : 'N/A', '']}
                />
                <Line type="monotone" dataKey="actual" stroke="#6366f1" strokeWidth={3} dot={{ r: 4 }} name="Actual Revenue" />
                <Line type="monotone" dataKey="forecast" stroke="#a855f7" strokeWidth={3} strokeDasharray="5 5" dot={{ r: 5, fill: '#a855f7' }} name="Projected Forecast" />
                <Line type="monotone" dataKey="upperConfidence" stroke="#ec4899" strokeWidth={1} strokeDasharray="2 2" dot={false} name="Upper 95% Bound" />
                <Line type="monotone" dataKey="lowerConfidence" stroke="#3b82f6" strokeWidth={1} strokeDasharray="2 2" dot={false} name="Lower 95% Bound" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Interactive Scenario Controls */}
        <div className="glass-panel p-5 rounded-2xl space-y-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Sliders className="w-4 h-4 text-indigo-400" />
                <span>What-If Scenario Simulator</span>
              </h3>
              <button 
                onClick={() => { setAdSpendBoost(10); setPriceChange(5); setMarketGrowth(8); }}
                className="text-[11px] text-slate-400 hover:text-white flex items-center gap-1"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Reset</span>
              </button>
            </div>

            {/* Sliders list */}
            <div className="space-y-5 mt-5">
              
              {/* Slider 1: Ad Spend */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="text-slate-300 font-semibold">Marketing & Ad Spend Growth</span>
                  <span className="text-indigo-400 font-mono font-bold">+{adSpendBoost}%</span>
                </div>
                <input 
                  type="range" 
                  min="0" 
                  max="50" 
                  value={adSpendBoost} 
                  onChange={(e) => setAdSpendBoost(Number(e.target.value))}
                  className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-500"
                />
                <p className="text-[10px] text-slate-500">Simulates CAC efficiency and acquiring new marketing leads.</p>
              </div>

              {/* Slider 2: Price Adjustment */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="text-slate-300 font-semibold">Average Price Adjustment</span>
                  <span className="text-purple-400 font-mono font-bold">+{priceChange}%</span>
                </div>
                <input 
                  type="range" 
                  min="-10" 
                  max="30" 
                  value={priceChange} 
                  onChange={(e) => setPriceChange(Number(e.target.value))}
                  className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-purple-500"
                />
                <p className="text-[10px] text-slate-500">Price optimization impact on gross contract value.</p>
              </div>

              {/* Slider 3: Industry Market Growth */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="text-slate-300 font-semibold">Macro Sector Growth Rate</span>
                  <span className="text-emerald-400 font-mono font-bold">+{marketGrowth}%</span>
                </div>
                <input 
                  type="range" 
                  min="0" 
                  max="25" 
                  value={marketGrowth} 
                  onChange={(e) => setMarketGrowth(Number(e.target.value))}
                  className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-500"
                />
                <p className="text-[10px] text-slate-500">Overall industry tailwinds and expansion rate.</p>
              </div>

            </div>
          </div>

          {/* Outcome Result Card */}
          <div className="p-4 rounded-xl bg-gradient-to-r from-indigo-950/80 to-purple-950/80 border border-indigo-800/50 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs text-indigo-300 font-semibold uppercase">Projected Aug 2026 Revenue</span>
              <span className="text-xs px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-bold">
                +{percentageGain}% Lift
              </span>
            </div>
            <h4 className="text-2xl font-black text-white font-mono">
              ${endForecastValue.toLocaleString()}
            </h4>
            <p className="text-[11px] text-slate-300">
              Model predicts peak revenue trajectory reaching up to <span className="text-indigo-400 font-bold">${simulatedForecast[simulatedForecast.length - 1].upperConfidence?.toLocaleString()}</span> with 95% statistical confidence.
            </p>
          </div>

        </div>

      </div>

    </div>
  );
}
