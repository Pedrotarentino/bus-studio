
import React, { useMemo } from 'react';
import { Malfunction, StatsData } from '../types';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, PieChart, Pie } from 'recharts';

interface DashboardProps {
  malfunctions: Malfunction[];
}

const Dashboard: React.FC<DashboardProps> = ({ malfunctions }) => {
  const categoryStats = useMemo(() => {
    const counts: Record<string, number> = {};
    malfunctions.forEach(m => {
      const cat = m.aiAnalysis?.category || 'Ongecategoriseerd';
      counts[cat] = (counts[cat] || 0) + 1;
    });
    return Object.entries(counts).map(([name, count]) => ({ name, count }));
  }, [malfunctions]);

  const severityStats = useMemo(() => {
    const counts: Record<string, number> = { 'Laag': 0, 'Gemiddeld': 0, 'Hoog': 0, 'Kritiek': 0 };
    malfunctions.forEach(m => {
      if (m.aiAnalysis?.severity) {
        counts[m.aiAnalysis.severity]++;
      }
    });
    return Object.entries(counts).map(([name, count]) => ({ name, count }));
  }, [malfunctions]);

  const COLORS = ['#10b981', '#f59e0b', '#f97316', '#ef4444'];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
      <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
        <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-4">Ernst Verdeling</h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={severityStats}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                paddingAngle={5}
                dataKey="count"
              >
                {severityStats.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="flex justify-around text-xs mt-2">
          {severityStats.map((s, i) => (
            <div key={s.name} className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full" style={{ backgroundColor: COLORS[i] }}></span>
              <span>{s.name} ({s.count})</span>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
        <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-4">Top Categorieën</h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={categoryStats} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke="#f1f5f9" />
              <XAxis type="number" hide />
              <YAxis dataKey="name" type="category" width={100} fontSize={12} tickLine={false} axisLine={false} />
              <Tooltip cursor={{ fill: '#f8fafc' }} />
              <Bar dataKey="count" fill="#3b82f6" radius={[0, 4, 4, 0]} barSize={20} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
