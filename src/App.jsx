import React, { useState } from 'react';
import Navbar from './components/Navbar';
import SalesDashboard from './components/SalesDashboard';
import CustomerSegmentation from './components/CustomerSegmentation';
import PredictiveAnalytics from './components/PredictiveAnalytics';
import DataCleaningAutomation from './components/DataCleaningAutomation';

export default function App() {
  const [activeTab, setActiveTab] = useState('sales');

  const handleExportReport = () => {
    alert('Exporting Executive Data Intelligence PDF Report...');
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-['Plus_Jakarta_Sans',sans-serif]">
      {/* Navigation Header */}
      <Navbar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        onExportReport={handleExportReport}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        
        {activeTab === 'sales' && <SalesDashboard />}
        {activeTab === 'segmentation' && <CustomerSegmentation />}
        {activeTab === 'predictive' && <PredictiveAnalytics />}
        {activeTab === 'cleaning' && <DataCleaningAutomation />}

      </main>

      {/* Footer */}
      <footer className="border-t border-slate-900 bg-slate-950/80 py-6 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>© 2026 Data Analytics AI Platform. All rights reserved.</span>
          <div className="flex items-center space-x-4">
            <span className="hover:text-slate-400 cursor-pointer">Privacy Policy</span>
            <span className="hover:text-slate-400 cursor-pointer">API Documentation</span>
            <span className="hover:text-slate-400 cursor-pointer">System Health</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
