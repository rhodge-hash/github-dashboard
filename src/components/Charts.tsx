'use client';

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

interface BuildTrendsChartProps {
  data: Array<{
    date: string;
    successful: number;
    failed: number;
    total: number;
  }>;
}

export function BuildTrendsChart({ data }: BuildTrendsChartProps) {
  if (data.length === 0) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Build Trends</h3>
        <div className="flex items-center justify-center h-64 text-gray-500">
          <div className="text-center">
            <p>No build data available</p>
            <p className="text-sm mt-2">Workflow runs will appear here once available</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border border-gray-200 dark:border-gray-700">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Build Trends</h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
          <XAxis 
            dataKey="date" 
            className="text-xs"
            tick={{ fill: 'currentColor' }}
          />
          <YAxis 
            className="text-xs"
            tick={{ fill: 'currentColor' }}
          />
          <Tooltip 
            contentStyle={{ 
              backgroundColor: 'rgb(31 41 55)', 
              border: 'none', 
              borderRadius: '8px',
              color: 'white'
            }}
          />
          <Legend />
          <Line 
            type="monotone" 
            dataKey="successful" 
            stroke="#10B981" 
            strokeWidth={2}
            dot={{ r: 4 }}
            name="Successful Builds"
          />
          <Line 
            type="monotone" 
            dataKey="failed" 
            stroke="#EF4444" 
            strokeWidth={2}
            dot={{ r: 4 }}
            name="Failed Builds"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

interface BuildStatusPieChartProps {
  data: Array<{
    name: string;
    value: number;
  }>;
}

const COLORS = ['#10B981', '#EF4444', '#F59E0B', '#6B7280'];

export function BuildStatusPieChart({ data }: BuildStatusPieChartProps) {
  if (data.length === 0 || data.every(item => item.value === 0)) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Build Status Distribution</h3>
        <div className="flex items-center justify-center h-64 text-gray-500">
          <div className="text-center">
            <p>No build status data available</p>
            <p className="text-sm mt-2">Build statuses will appear here once workflows complete</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border border-gray-200 dark:border-gray-700">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Build Status Distribution</h3>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip 
            contentStyle={{ 
              backgroundColor: 'rgb(31 41 55)', 
              border: 'none', 
              borderRadius: '8px',
              color: 'white'
            }}
          />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}