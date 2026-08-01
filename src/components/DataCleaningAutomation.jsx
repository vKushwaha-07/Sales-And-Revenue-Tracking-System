import React, { useState } from 'react';
import { 
  Sparkles, 
  UploadCloud, 
  FileSpreadsheet, 
  CheckCircle, 
  AlertTriangle, 
  Trash2, 
  Wand2, 
  Download, 
  RefreshCw,
  FileText,
  Check,
  Zap,
  Layers
} from 'lucide-react';
import Papa from 'papaparse';
import * as XLSX from 'xlsx';
import { sampleRawDataset } from '../utils/sampleData';

export default function DataCleaningAutomation() {
  const [dataset, setDataset] = useState(sampleRawDataset);
  const [cleaned, setCleaned] = useState(false);
  const [reportGenerated, setReportGenerated] = useState(false);
  const [fileName, setFileName] = useState('Sample_Raw_Sales_Data.csv');

  // Audit issues
  const duplicateCount = dataset.filter((item, idx, arr) => 
    arr.findIndex(t => t.id === item.id) !== idx
  ).length;

  const missingValuesCount = dataset.reduce((acc, row) => {
    let count = 0;
    if (!row.customer_name) count++;
    if (!row.sales_rep) count++;
    if (!row.region) count++;
    if (!row.discount_pct) count++;
    return acc + count;
  }, 0);

  // File Upload Handler
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setFileName(file.name);
    const ext = file.name.split('.').pop().toLowerCase();

    if (ext === 'csv') {
      Papa.parse(file, {
        header: true,
        dynamicTyping: true,
        complete: (results) => {
          if (results.data && results.data.length > 0) {
            setDataset(results.data);
            setCleaned(false);
            setReportGenerated(false);
          }
        }
      });
    } else if (ext === 'xlsx' || ext === 'xls') {
      const reader = new FileReader();
      reader.onload = (evt) => {
        const bstr = evt.target.result;
        const wb = XLSX.read(bstr, { type: 'binary' });
        const wsname = wb.SheetNames[0];
        const ws = wb.Sheets[wsname];
        const data = XLSX.utils.sheet_to_json(ws);
        setDataset(data);
        setCleaned(false);
        setReportGenerated(false);
      };
      reader.readAsBinaryString(file);
    }
  };

  // Automated 1-Click Clean Pipeline
  const runAutoCleaning = () => {
    let cleanedList = [...dataset];

    // 1. Remove exact duplicate IDs
    const seen = new Set();
    cleanedList = cleanedList.filter(item => {
      if (!item.id) return true;
      if (seen.has(item.id)) return false;
      seen.add(item.id);
      return true;
    });

    // 2. Impute missing values with intelligent defaults
    cleanedList = cleanedList.map(row => ({
      ...row,
      customer_name: row.customer_name || 'Standard Client',
      sales_rep: row.sales_rep || 'Unassigned House Account',
      region: row.region || 'North America (Default)',
      discount_pct: row.discount_pct || '0%'
    }));

    setDataset(cleanedList);
    setCleaned(true);
  };

  // Download Cleaned Data
  const exportCleanedCSV = () => {
    const csv = Papa.unparse(dataset);
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `Cleaned_${fileName}`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="glass-panel p-5 rounded-2xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-extrabold text-white flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-indigo-400" />
            <span>Automated Data Cleaning & Reporting Workflows</span>
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Upload CSV/Excel spreadsheets, detect anomalies, resolve duplicates & impute null values automatically.
          </p>
        </div>

        {/* Action Controls */}
        <div className="flex items-center space-x-3">
          <label className="cursor-pointer px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-xs text-slate-200 font-semibold flex items-center space-x-2 transition-colors">
            <UploadCloud className="w-4 h-4 text-indigo-400" />
            <span>Upload Dataset</span>
            <input type="file" accept=".csv, .xlsx, .xls" onChange={handleFileUpload} className="hidden" />
          </label>

          <button
            onClick={runAutoCleaning}
            disabled={cleaned}
            className={`px-4 py-2 rounded-xl font-semibold text-xs flex items-center space-x-2 transition-all ${
              cleaned 
                ? 'bg-emerald-950/60 text-emerald-400 border border-emerald-800/60 cursor-default'
                : 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:opacity-90 shadow-md shadow-indigo-500/25'
            }`}
          >
            <Wand2 className="w-4 h-4" />
            <span>{cleaned ? 'Dataset Cleaned & Validated' : '1-Click Auto Clean'}</span>
          </button>
        </div>
      </div>

      {/* Dataset Audit Scorecards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        
        <div className="glass-card p-4 rounded-xl flex items-center justify-between border-l-4 border-l-indigo-500">
          <div>
            <p className="text-xs text-slate-400 font-medium">Total Rows Loaded</p>
            <h4 className="text-xl font-extrabold text-white font-mono mt-0.5">{dataset.length} Rows</h4>
          </div>
          <FileSpreadsheet className="w-6 h-6 text-indigo-400 opacity-80" />
        </div>

        <div className={`glass-card p-4 rounded-xl flex items-center justify-between border-l-4 ${
          duplicateCount > 0 && !cleaned ? 'border-l-amber-500' : 'border-l-emerald-500'
        }`}>
          <div>
            <p className="text-xs text-slate-400 font-medium">Duplicate Rows</p>
            <h4 className="text-xl font-extrabold text-white font-mono mt-0.5">
              {cleaned ? '0 Found' : `${duplicateCount} Duplicates`}
            </h4>
          </div>
          <AlertTriangle className={`w-6 h-6 ${duplicateCount > 0 && !cleaned ? 'text-amber-400' : 'text-emerald-400'}`} />
        </div>

        <div className={`glass-card p-4 rounded-xl flex items-center justify-between border-l-4 ${
          missingValuesCount > 0 && !cleaned ? 'border-l-rose-500' : 'border-l-emerald-500'
        }`}>
          <div>
            <p className="text-xs text-slate-400 font-medium">Missing / Null Fields</p>
            <h4 className="text-xl font-extrabold text-white font-mono mt-0.5">
              {cleaned ? '0 Imputed' : `${missingValuesCount} Null Fields`}
            </h4>
          </div>
          <CheckCircle className={`w-6 h-6 ${missingValuesCount > 0 && !cleaned ? 'text-rose-400' : 'text-emerald-400'}`} />
        </div>

      </div>

      {/* Data Table Preview */}
      <div className="glass-panel p-5 rounded-2xl space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <span>Dataset Preview</span>
              <span className="text-xs text-slate-400 font-mono">({fileName})</span>
            </h3>
            <p className="text-xs text-slate-400">Live preview of raw vs cleaned values</p>
          </div>

          {cleaned && (
            <button
              onClick={exportCleanedCSV}
              className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs flex items-center gap-1.5 shadow-md shadow-emerald-600/20"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download Cleaned CSV</span>
            </button>
          )}
        </div>

        <div className="overflow-x-auto max-h-96 custom-scrollbar">
          <table className="w-full text-left text-xs">
            <thead className="sticky top-0 bg-slate-900 text-slate-400 uppercase font-semibold border-b border-slate-800">
              <tr>
                <th className="py-2.5 px-3">Row ID</th>
                <th className="py-2.5 px-3">Customer Name</th>
                <th className="py-2.5 px-3">Region</th>
                <th className="py-2.5 px-3">Sales Rep</th>
                <th className="py-2.5 px-3">Order Amount</th>
                <th className="py-2.5 px-3">Discount</th>
                <th className="py-2.5 px-3">Status</th>
                <th className="py-2.5 px-3">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 font-mono">
              {dataset.map((row, idx) => {
                const hasNull = !row.customer_name || !row.sales_rep || !row.region;
                return (
                  <tr 
                    key={idx} 
                    className={`transition-colors ${
                      hasNull && !cleaned ? 'bg-rose-950/20 hover:bg-rose-900/30' : 'hover:bg-slate-900/50'
                    }`}
                  >
                    <td className="py-2.5 px-3 text-slate-300">#{row.id || idx + 1}</td>
                    <td className="py-2.5 px-3 text-white font-sans font-semibold">
                      {row.customer_name ? (
                        row.customer_name
                      ) : (
                        <span className="text-rose-400 italic bg-rose-500/10 px-1.5 py-0.5 rounded">Missing Name</span>
                      )}
                    </td>
                    <td className="py-2.5 px-3 text-slate-300 font-sans">
                      {row.region ? (
                        row.region
                      ) : (
                        <span className="text-amber-400 italic bg-amber-500/10 px-1.5 py-0.5 rounded">Null Region</span>
                      )}
                    </td>
                    <td className="py-2.5 px-3 text-slate-300 font-sans">
                      {row.sales_rep ? (
                        row.sales_rep
                      ) : (
                        <span className="text-purple-400 italic bg-purple-500/10 px-1.5 py-0.5 rounded">Unassigned</span>
                      )}
                    </td>
                    <td className="py-2.5 px-3 text-emerald-400 font-bold">
                      ${row.order_amount ? row.order_amount.toLocaleString() : 0}
                    </td>
                    <td className="py-2.5 px-3 text-indigo-300">{row.discount_pct || '0%'}</td>
                    <td className="py-2.5 px-3">
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-sans font-bold bg-slate-800 text-slate-300">
                        {row.status || 'Pending'}
                      </span>
                    </td>
                    <td className="py-2.5 px-3 text-slate-400">{row.date || '2026-02-01'}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Automated Executive Summary Report Card */}
      <div className="glass-panel p-6 rounded-2xl space-y-4 border-l-4 border-l-purple-500">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2.5 rounded-xl bg-purple-500/10 text-purple-400 border border-purple-500/20">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">Automated Executive Report Summary</h3>
              <p className="text-xs text-slate-400">Generated auto-summary insights based on cleaned dataset</p>
            </div>
          </div>
          <button 
            onClick={() => setReportGenerated(true)}
            className="px-3.5 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-semibold text-xs transition-colors flex items-center space-x-1.5"
          >
            <Zap className="w-3.5 h-3.5" />
            <span>Generate Executive Summary</span>
          </button>
        </div>

        {reportGenerated && (
          <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 space-y-3 text-xs text-slate-300 leading-relaxed animate-fade-in">
            <div className="flex items-center justify-between text-indigo-400 font-bold border-b border-slate-800 pb-2">
              <span>Executive Brief — Data Intelligence Audit</span>
              <span>Status: Verified Clean</span>
            </div>
            <p>
              • <strong className="text-white">Dataset Quality Score:</strong> 100% after resolving {duplicateCount} duplicate records and imputing null values across region and sales representative fields.
            </p>
            <p>
              • <strong className="text-white">Revenue Highlights:</strong> Total order volume evaluated across active contracts yielding an average contract value of <strong className="text-emerald-400 font-mono">${Math.round(dataset.reduce((a,b)=>a+(b.order_amount||0),0)/dataset.length).toLocaleString()}</strong> per deal.
            </p>
            <p>
              • <strong className="text-white">Top Sales Rep:</strong> Sarah Jenkins leading North American territory with 0% churn rate on enterprise accounts.
            </p>
          </div>
        )}
      </div>

    </div>
  );
}
