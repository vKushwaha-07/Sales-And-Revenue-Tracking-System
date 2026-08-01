import React from 'react';
import { 
  BarChart3, 
  Users, 
  TrendingUp, 
  Sparkles, 
  FileSpreadsheet, 
  Zap, 
  Database,
  Download,
  ExternalLink
} from 'lucide-react';

export default function Navbar({ activeTab, setActiveTab, onExportReport }) {
  const navItems = [
    { id: 'sales', label: 'Sales & Revenue', icon: BarChart3, badge: 'KPIs' },
    { id: 'segmentation', label: 'Customer Segmentation', icon: Users, badge: 'RFM' },
    { id: 'predictive', label: 'Predictive Analytics', icon: TrendingUp, badge: 'AI Forecast' },
    { id: 'cleaning', label: 'Data Cleaning & Auto-Report', icon: Sparkles, badge: 'ETL Tool' },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-slate-800/80 glass-panel">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-purple-600 to-pink-500 p-0.5 shadow-lg shadow-indigo-500/20">
              <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                <BarChart3 className="w-5 h-5 text-indigo-400" />
              </div>
            </div>
            <div>
              <span className="font-extrabold text-lg tracking-tight bg-gradient-to-r from-white via-slate-200 to-indigo-300 bg-clip-text text-transparent">
                DataAnalytics<span className="text-indigo-500">.AI</span>
              </span>
              <span className="block text-[10px] font-semibold uppercase tracking-wider text-slate-400">
                Enterprise Business Intelligence Suite
              </span>
            </div>
          </div>

          {/* Navigation Pills */}
          <nav className="hidden md:flex items-center space-x-1 bg-slate-900/90 p-1.5 rounded-2xl border border-slate-800">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`flex items-center space-x-2 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all duration-200 ${
                    isActive
                      ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-md shadow-indigo-500/25'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                  <span>{item.label}</span>
                  <span className={`text-[9px] px-1.5 py-0.5 rounded-full font-bold uppercase ${
                    isActive ? 'bg-white/20 text-white' : 'bg-slate-800 text-slate-400'
                  }`}>
                    {item.badge}
                  </span>
                </button>
              );
            })}
          </nav>

          {/* Actions */}
          <div className="flex items-center space-x-3">
            <a
              href="/sales-dashboard.html"
              target="_blank"
              rel="noreferrer"
              className="hidden lg:flex items-center space-x-1.5 px-3 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800 text-xs font-semibold transition-all"
              title="Open standalone HTML sales dashboard"
            >
              <ExternalLink className="w-3.5 h-3.5 text-purple-400" />
              <span>HTML Dashboard</span>
            </a>

            <button
              onClick={onExportReport}
              className="flex items-center space-x-2 px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700/60 text-xs font-semibold transition-all hover:border-slate-600"
            >
              <Download className="w-3.5 h-3.5 text-indigo-400" />
              <span>Export Report</span>
            </button>
            <div className="hidden xl:flex items-center space-x-2 px-3 py-1.5 rounded-xl bg-indigo-950/40 border border-indigo-800/40 text-xs text-indigo-300">
              <Zap className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
              <span className="font-medium">Engine Ready</span>
            </div>
          </div>

        </div>

        {/* Mobile Navigation */}
        <div className="flex md:hidden overflow-x-auto py-2 space-x-2 border-t border-slate-800/60 custom-scrollbar">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs whitespace-nowrap ${
                  isActive ? 'bg-indigo-600 text-white font-medium' : 'bg-slate-900 text-slate-400'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </header>
  );
}
