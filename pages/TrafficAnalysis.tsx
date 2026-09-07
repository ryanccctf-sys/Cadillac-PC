import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

const data = [
  { name: '周一', enter: 120, pass: 400 },
  { name: '周二', enter: 132, pass: 380 },
  { name: '周三', enter: 101, pass: 420 },
  { name: '周四', enter: 134, pass: 450 },
  { name: '周五', enter: 190, pass: 500 },
  { name: '周六', enter: 330, pass: 800 },
  { name: '周日', enter: 310, pass: 780 },
];

const TrafficAnalysis: React.FC = () => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white">客流分析</h2>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-700 lg:col-span-2">
            <h3 className="text-lg font-bold mb-4 dark:text-white">进店量 vs 路过量趋势</h3>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} />
                  <YAxis axisLine={false} tickLine={false} />
                  <Tooltip cursor={{fill: 'transparent'}} contentStyle={{borderRadius: '8px'}} />
                  <Legend />
                  <Bar dataKey="pass" name="路过客流" fill="#cbd5e1" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="enter" name="进店客流" fill="#4f46e5" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
          <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-700">
             <h3 className="text-lg font-bold mb-4 dark:text-white">关键指标</h3>
             <div className="space-y-6">
                <div className="p-4 bg-indigo-50 dark:bg-indigo-900/20 rounded-xl">
                    <p className="text-sm text-indigo-600 dark:text-indigo-300 font-medium">平均进店率</p>
                    <p className="text-3xl font-bold text-indigo-700 dark:text-indigo-400">12.8%</p>
                    <p className="text-xs text-indigo-500 mt-1">↑ 1.2% 较上周</p>
                </div>
                <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl">
                    <p className="text-sm text-blue-600 dark:text-blue-300 font-medium">平均停留时长</p>
                    <p className="text-3xl font-bold text-blue-700 dark:text-blue-400">32min</p>
                    <p className="text-xs text-blue-500 mt-1">↓ 2min 较上周</p>
                </div>
                <div className="p-4 bg-emerald-50 dark:bg-emerald-900/20 rounded-xl">
                    <p className="text-sm text-emerald-600 dark:text-emerald-300 font-medium">深访率 (试驾/洽谈)</p>
                    <p className="text-3xl font-bold text-emerald-700 dark:text-emerald-400">45%</p>
                    <p className="text-xs text-emerald-500 mt-1">↑ 5% 较上周</p>
                </div>
             </div>
          </div>
      </div>
    </div>
  );
};
export default TrafficAnalysis;
