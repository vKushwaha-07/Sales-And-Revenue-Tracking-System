import React, { useState } from 'react';
import { 
  Users, 
  Target, 
  Sparkles, 
  Layers, 
  ScatterChart as ScatterIcon, 
  HelpCircle,
  Mail,
  ShieldAlert,
  Zap,
  ArrowRight
} from 'lucide-react';
import { 
  ScatterChart, 
  Scatter, 
  XAxis, 
  YAxis, 
  ZAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { customerSegments, segmentDistribution } from '../utils/sampleData';

export default function CustomerSegmentation() {
  const [selectedSegment, setSelectedSegment] = useState('All');
  const [activeCustomer, setActiveCustomer] = useState(customerSegments[0]);

  const filteredCustomers = selectedSegment === 'All' 
    ? customerSegments 
    : customerSegments.filter(c => c.segment === selectedSegment);

  const getSegmentBadge = (segment) => {
    switch (segment) {
      case 'VIP Champions':
        return 'bg-indigo-500/20 text-indigo-300 border-indigo-500/30';
      case 'Loyal Customers':
        return 'bg-blue-500/20 text-blue-300 border-blue-500/30';
      case 'New Potential':
        return 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30';
      case 'At Risk':
        return 'bg-amber-500/20 text-amber-300 border-amber-500/30';
      case 'Hibernating':
        return 'bg-rose-500/20 text-rose-300 border-rose-500/30';
      default:
        return 'bg-slate-800 text-slate-300';
    }
  };

  const getTargetAction = (segment) => {
    switch (segment) {
      case 'VIP Champions':
        return {
          title: 'Exclusive VIP Concierge & Early Beta Access',
          action: 'Assign Dedicated Key Account Manager and offer 1-on-1 strategic product roadmap briefings.',
          icon: Sparkles,
          color: 'text-indigo-400'
        };
      case 'Loyal Customers':
        return {
          title: 'Upsell & Cross-sell Premium Bundles',
          action: 'Trigger targeted email nurture sequences featuring enterprise add-ons and volume licensing.',
          icon: Zap,
          color: 'text-blue-400'
        };
      case 'New Potential':
        return {
          title: 'Onboarding & Activation Acceleration',
          action: 'Provide guided product tours, live webinar invitations, and 15% renewal incentive.',
          icon: Target,
          color: 'text-emerald-400'
        };
      case 'At Risk':
        return {
          title: 'Win-Back & Retention Campaign',
          action: 'Send automated executive check-in survey and offer 30-day free extension/discount.',
          icon: ShieldAlert,
          color: 'text-amber-400'
        };
      case 'Hibernating':
        return {
          title: 'Re-engagement & Unsubscribe Cleanse',
          action: 'Run a 3-stage re-activation discount offer; archive profile if inactive past 120 days.',
          icon: Mail,
          color: 'text-rose-400'
        };
      default:
        return {
          title: 'General Engagement',
          action: 'Standard monthly newsletter updates.',
          icon: Users,
          color: 'text-slate-400'
        };
    }
  };

  const currentAction = getTargetAction(activeCustomer.segment);
  const ActionIcon = currentAction.icon;

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="glass-panel p-5 rounded-2xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-extrabold text-white flex items-center gap-2">
            <Users className="w-5 h-5 text-indigo-400" />
            <span>AI Customer Segmentation & RFM Clustering</span>
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Recency (R), Frequency (F), and Monetary Value (M) machine-learning cluster model for account targeting.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap gap-2">
          {['All', 'VIP Champions', 'Loyal Customers', 'New Potential', 'At Risk', 'Hibernating'].map((seg) => (
            <button
              key={seg}
              onClick={() => setSelectedSegment(seg)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                selectedSegment === seg
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-500/20'
                  : 'bg-slate-900/80 text-slate-400 hover:text-slate-200 border border-slate-800'
              }`}
            >
              {seg}
            </button>
          ))}
        </div>
      </div>

      {/* Main Grid: Scatter Plot & Segment Shares */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Scatter Plot (2 Cols) */}
        <div className="lg:col-span-2 glass-panel p-5 rounded-2xl space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <ScatterIcon className="w-4 h-4 text-purple-400" />
                <span>RFM Behavioral Cluster Map</span>
              </h3>
              <p className="text-xs text-slate-400">X-Axis: Recency Score | Y-Axis: Monetary Value ($)</p>
            </div>
            <span className="text-xs text-slate-400 bg-slate-900 px-3 py-1 rounded-lg border border-slate-800">
              Bubble Size = Order Frequency
            </span>
          </div>

          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <ScatterChart margin={{ top: 20, right: 20, bottom: 10, left: 10 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.5} />
                <XAxis 
                  type="number" 
                  dataKey="x" 
                  name="Recency Index" 
                  unit=" pts" 
                  stroke="#94a3b8"
                  fontSize={11}
                  domain={[0, 100]}
                />
                <YAxis 
                  type="number" 
                  dataKey="y" 
                  name="Monetary Score" 
                  unit=" pts" 
                  stroke="#94a3b8"
                  fontSize={11}
                  domain={[0, 100]}
                />
                <ZAxis type="number" dataKey="size" range={[60, 400]} name="Order Volume" />
                <Tooltip 
                  cursor={{ strokeDasharray: '3 3' }}
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '0.75rem', fontSize: '12px' }}
                  formatter={(val, name) => [val, name]}
                />
                <Scatter 
                  name="Customers" 
                  data={filteredCustomers} 
                  fill="#6366f1"
                  onClick={(entry) => setActiveCustomer(entry)}
                  className="cursor-pointer"
                />
              </ScatterChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Segment Share Pie Chart (1 Col) */}
        <div className="glass-panel p-5 rounded-2xl space-y-4 flex flex-col justify-between">
          <div>
            <h3 className="text-base font-bold text-white">Segment Value Distribution</h3>
            <p className="text-xs text-slate-400">Total revenue generated per segment cluster</p>
          </div>

          <div className="h-52 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={segmentDistribution}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={75}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {segmentDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '0.75rem', fontSize: '12px' }}
                  formatter={(val) => `$${val.toLocaleString()}`}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Breakdown List */}
          <div className="space-y-2 pt-2 border-t border-slate-800">
            {segmentDistribution.map((seg) => (
              <div key={seg.name} className="flex items-center justify-between text-xs">
                <div className="flex items-center space-x-2">
                  <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: seg.fill }}></span>
                  <span className="text-slate-300 font-medium">{seg.name}</span>
                </div>
                <span className="font-semibold text-slate-100">${(seg.value / 1000).toFixed(0)}k</span>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Selected Customer Deep Dive & Automated Campaign Recommendation */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Customer Roster Table (2 Cols) */}
        <div className="lg:col-span-2 glass-panel p-5 rounded-2xl space-y-4">
          <h3 className="text-base font-bold text-white">Account Roster</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400 uppercase font-semibold">
                  <th className="py-2.5 px-3">Account Name</th>
                  <th className="py-2.5 px-3">Segment Tag</th>
                  <th className="py-2.5 px-3">Recency</th>
                  <th className="py-2.5 px-3">Orders</th>
                  <th className="py-2.5 px-3">Monetary Value</th>
                  <th className="py-2.5 px-3 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {filteredCustomers.map((cust) => (
                  <tr 
                    key={cust.id} 
                    onClick={() => setActiveCustomer(cust)}
                    className={`cursor-pointer transition-colors ${
                      activeCustomer.id === cust.id ? 'bg-indigo-950/50 border-l-2 border-indigo-500' : 'hover:bg-slate-900/50'
                    }`}
                  >
                    <td className="py-3 px-3 font-semibold text-white">
                      {cust.name}
                      <span className="block text-[10px] text-slate-400 font-mono">{cust.id}</span>
                    </td>
                    <td className="py-3 px-3">
                      <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold border ${getSegmentBadge(cust.segment)}`}>
                        {cust.segment}
                      </span>
                    </td>
                    <td className="py-3 px-3 text-slate-300">{cust.recency} days ago</td>
                    <td className="py-3 px-3 text-slate-300 font-mono">{cust.frequency} orders</td>
                    <td className="py-3 px-3 text-emerald-400 font-bold font-mono">${cust.monetary.toLocaleString()}</td>
                    <td className="py-3 px-3 text-right">
                      <button className="text-indigo-400 hover:text-indigo-300 font-semibold text-[11px] flex items-center justify-end gap-1 ml-auto">
                        <span>Details</span>
                        <ArrowRight className="w-3 h-3" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* AI Campaign Recommendation Card (1 Col) */}
        <div className="glass-card p-5 rounded-2xl space-y-4 border-l-4 border-l-indigo-500 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-indigo-400 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                <span>AI Targeted Action</span>
              </span>
              <span className={`px-2 py-0.5 rounded text-[10px] font-bold border ${getSegmentBadge(activeCustomer.segment)}`}>
                {activeCustomer.segment}
              </span>
            </div>

            <h4 className="text-lg font-extrabold text-white mt-3">
              {activeCustomer.name}
            </h4>
            <p className="text-xs text-slate-400 font-mono mt-0.5">
              Account ID: {activeCustomer.id} | Spend: ${activeCustomer.monetary.toLocaleString()}
            </p>

            <div className="mt-5 p-4 rounded-xl bg-slate-900/90 border border-slate-800 space-y-2">
              <div className="flex items-center space-x-2">
                <ActionIcon className={`w-4 h-4 ${currentAction.color}`} />
                <h5 className="text-xs font-bold text-white">{currentAction.title}</h5>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                {currentAction.action}
              </p>
            </div>
          </div>

          <button className="w-full mt-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs transition-colors flex items-center justify-center space-x-2 shadow-lg shadow-indigo-600/25">
            <span>Execute Campaign Workflow</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>

    </div>
  );
}
