// Initial Mock Datasets for instant visualization

export const salesData = [
  { date: '2026-01-01', revenue: 45000, profit: 18000, orders: 320, region: 'North America', category: 'Electronics' },
  { date: '2026-01-08', revenue: 52000, profit: 21500, orders: 390, region: 'North America', category: 'Electronics' },
  { date: '2026-01-15', revenue: 48000, profit: 19200, orders: 350, region: 'Europe', category: 'SaaS Subscriptions' },
  { date: '2026-01-22', revenue: 61000, profit: 26000, orders: 440, region: 'Asia Pacific', category: 'Hardware' },
  { date: '2026-01-29', revenue: 58000, profit: 24200, orders: 410, region: 'North America', category: 'Software' },
  { date: '2026-02-05', revenue: 67000, profit: 29500, orders: 490, region: 'Europe', category: 'Electronics' },
  { date: '2026-02-12', revenue: 73000, profit: 32800, orders: 530, region: 'Asia Pacific', category: 'SaaS Subscriptions' },
  { date: '2026-02-19', revenue: 69000, profit: 30100, orders: 510, region: 'North America', category: 'Software' },
  { date: '2026-02-26', revenue: 81000, profit: 37500, orders: 590, region: 'Europe', category: 'Hardware' },
  { date: '2026-03-05', revenue: 89000, profit: 41200, orders: 640, region: 'Asia Pacific', category: 'Electronics' },
  { date: '2026-03-12', revenue: 94000, profit: 44000, orders: 680, region: 'North America', category: 'SaaS Subscriptions' },
  { date: '2026-03-19', revenue: 102000, profit: 49100, orders: 740, region: 'Europe', category: 'Software' }
];

export const categoryBreakdown = [
  { name: 'SaaS Subscriptions', value: 320000, color: '#6366f1' },
  { name: 'Enterprise Electronics', value: 245000, color: '#a855f7' },
  { name: 'Custom Software', value: 190000, color: '#ec4899' },
  { name: 'Hardware Infrastructure', value: 140000, color: '#10b981' }
];

export const regionalPerformance = [
  { region: 'North America', revenue: 380000, growth: '+24%', margin: '42%' },
  { region: 'Europe', revenue: 290000, growth: '+18%', margin: '38%' },
  { region: 'Asia Pacific', revenue: 225000, growth: '+31%', margin: '45%' },
  { region: 'Latin America', revenue: 95000, growth: '+12%', margin: '35%' }
];

export const customerSegments = [
  { id: 'CUST-101', name: 'Acme Corp', recency: 4, frequency: 48, monetary: 125000, segment: 'VIP Champions', x: 88, y: 92, size: 450 },
  { id: 'CUST-102', name: 'Nexus Tech', recency: 12, frequency: 32, monetary: 84000, segment: 'VIP Champions', x: 78, y: 84, size: 380 },
  { id: 'CUST-103', name: 'Global Logistics', recency: 45, frequency: 19, monetary: 51000, segment: 'At Risk', x: 42, y: 55, size: 290 },
  { id: 'CUST-104', name: 'Starlight Retail', recency: 8, frequency: 28, monetary: 67000, segment: 'Loyal Customers', x: 74, y: 72, size: 310 },
  { id: 'CUST-105', name: 'Apex Media', recency: 90, frequency: 5, monetary: 12000, segment: 'Hibernating', x: 18, y: 22, size: 150 },
  { id: 'CUST-106', name: 'BioHealth Inc', recency: 2, frequency: 41, monetary: 110000, segment: 'VIP Champions', x: 94, y: 95, size: 420 },
  { id: 'CUST-107', name: 'Urban Dynamics', recency: 60, frequency: 8, monetary: 22000, segment: 'At Risk', x: 35, y: 38, size: 210 },
  { id: 'CUST-108', name: 'Vanguard Capital', recency: 15, frequency: 37, monetary: 98000, segment: 'Loyal Customers', x: 81, y: 88, size: 400 },
  { id: 'CUST-109', name: 'CloudScale Solutions', recency: 1, frequency: 12, monetary: 34000, segment: 'New Potential', x: 65, y: 48, size: 250 },
  { id: 'CUST-110', name: 'Quantum Energy', recency: 110, frequency: 3, monetary: 8500, segment: 'Hibernating', x: 12, y: 15, size: 120 }
];

export const segmentDistribution = [
  { name: 'VIP Champions', count: 3, value: 349000, fill: '#6366f1' },
  { name: 'Loyal Customers', count: 2, value: 165000, fill: '#3b82f6' },
  { name: 'New Potential', count: 1, value: 34000, fill: '#10b981' },
  { name: 'At Risk', count: 2, value: 73000, fill: '#f59e0b' },
  { name: 'Hibernating', count: 2, value: 20500, fill: '#ef4444' }
];

export const predictiveHistoricalAndForecast = [
  { month: 'Oct 2025', actual: 62000, forecast: null, upperConfidence: null, lowerConfidence: null },
  { month: 'Nov 2025', actual: 71000, forecast: null, upperConfidence: null, lowerConfidence: null },
  { month: 'Dec 2025', actual: 85000, forecast: null, upperConfidence: null, lowerConfidence: null },
  { month: 'Jan 2026', actual: 78000, forecast: null, upperConfidence: null, lowerConfidence: null },
  { month: 'Feb 2026', actual: 89000, forecast: null, upperConfidence: null, lowerConfidence: null },
  { month: 'Mar 2026', actual: 98000, forecast: 98000, upperConfidence: 98000, lowerConfidence: 98000 },
  { month: 'Apr 2026 (F)', actual: null, forecast: 108000, upperConfidence: 116000, lowerConfidence: 100000 },
  { month: 'May 2026 (F)', actual: null, forecast: 119000, upperConfidence: 130000, lowerConfidence: 108000 },
  { month: 'Jun 2026 (F)', actual: null, forecast: 127000, upperConfidence: 142000, lowerConfidence: 112000 },
  { month: 'Jul 2026 (F)', actual: null, forecast: 138000, upperConfidence: 156000, lowerConfidence: 120000 },
  { month: 'Aug 2026 (F)', actual: null, forecast: 149000, upperConfidence: 171000, lowerConfidence: 127000 }
];

export const sampleRawDataset = [
  { id: 101, customer_name: 'Acme Corp', region: 'North America', sales_rep: 'Sarah Jenkins', order_amount: 14500, discount_pct: '5%', status: 'Completed', date: '2026-02-14' },
  { id: 102, customer_name: 'Nexus Tech', region: 'Europe', sales_rep: 'Marcus Vance', order_amount: 8900, discount_pct: '10%', status: 'Completed', date: '2026-02-15' },
  { id: 103, customer_name: 'Acme Corp', region: 'North America', sales_rep: 'Sarah Jenkins', order_amount: 14500, discount_pct: '5%', status: 'Completed', date: '2026-02-14' }, // Duplicate row
  { id: 104, customer_name: 'Global Logistics', region: 'Asia Pacific', sales_rep: null, order_amount: 22100, discount_pct: '0%', status: 'Pending', date: '2026-02-17' }, // Missing sales_rep
  { id: 105, customer_name: null, region: 'Europe', sales_rep: 'Elena Rostova', order_amount: 6700, discount_pct: null, status: 'Completed', date: '2026-02-18' }, // Missing customer & discount
  { id: 106, customer_name: 'Starlight Retail', region: 'North America', sales_rep: 'Sarah Jenkins', order_amount: 19800, discount_pct: '15%', status: 'Completed', date: '2026-02-19' },
  { id: 107, customer_name: 'BioHealth Inc', region: 'Asia Pacific', sales_rep: 'Kenji Sato', order_amount: 34000, discount_pct: '8%', status: 'Shipped', date: '2026-02-20' },
  { id: 108, customer_name: 'Urban Dynamics', region: null, sales_rep: 'Marcus Vance', order_amount: 11200, discount_pct: '2%', status: 'Processing', date: '2026-02-21' } // Missing region
];
