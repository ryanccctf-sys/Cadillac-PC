
import React, { useState } from 'react';
import { MessageSquare, TrendingUp, Filter, Download, Car, PieChart as PieChartIcon, Target, Zap } from 'lucide-react';
import { PieChart, Pie, Cell, Tooltip as RechartsTooltip, ResponsiveContainer, Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Legend } from 'recharts';

const BRAND_DATA = [
  { id: 1, name: '奥迪', count: 21 },
  { id: 2, name: '宝马', count: 8 },
  { id: 3, name: '沃尔沃', count: 7 },
  { id: 4, name: '奔驰', count: 4 },
  { id: 5, name: '丰田', count: 2 },
];

const MODEL_DATA = [
  { id: 1, name: '奥迪A4', count: 5 },
  { id: 2, name: '奥迪A6', count: 4 },
  { id: 3, name: '沃尔沃S90', count: 3 },
  { id: 4, name: '奥迪Q3', count: 2 },
  { id: 5, name: '宝马X3', count: 1 },
];

const A4_DETAIL_DATA = {
  product: [
    { name: '车机系统/中控屏', count: 2 },
    { name: '车辆安全性', count: 2 },
    { name: '乘坐空间/轴距', count: 2 },
    { name: '多种驾驶模式', count: 2 },
    { name: '功能配置', count: 2 },
    { name: '驾控性能', count: 2 },
    { name: '轮胎规格', count: 2 },
    { name: '内饰设计', count: 2 },
    { name: '外观设计', count: 2 },
    { name: '悬挂系统', count: 2 },
    { name: '智能科技', count: 2 },
    { name: '智能泊车', count: 2 },
    { name: '中控屏尺寸', count: 2 },
    { name: '保养周期标准', count: 1 },
    { name: '变速器', count: 1 },
    { name: '灯光系统配置', count: 1 },
    { name: '发动机性能', count: 1 },
  ],
  policy: [
    { name: '新车价格', count: 2 },
    { name: '车辆保值率', count: 1 },
  ]
};

const PIE_DATA = [
  { name: '产品类', value: 29, color: '#4f46e5' },
  { name: '政策/权益类', value: 3, color: '#818cf8' },
];

interface ProgressBarProps {
  label: string;
  count: number;
  max: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ label, count, max }) => {
  const percentage = (count / max) * 100;
  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{label}</span>
      </div>
      <div className="flex items-center gap-4">
        <div className="flex-1 bg-gray-100 dark:bg-slate-700 h-2.5 rounded-full overflow-hidden">
          <div 
            className="h-full bg-primary-500 rounded-full transition-all duration-1000 ease-out shadow-[0_0_8px_rgba(99,102,241,0.4)]"
            style={{ width: `${percentage}%` }}
          ></div>
        </div>
        <span className="text-xs text-gray-400 font-medium whitespace-nowrap min-w-[60px]">
          提及{count}次
        </span>
      </div>
    </div>
  );
};

const CompetitorAnalysis: React.FC = () => {
  const [selectedModel, setSelectedModel] = useState<string | null>('奥迪A4');
  const maxBrand = Math.max(...BRAND_DATA.map(d => d.count));
  const maxModel = Math.max(...MODEL_DATA.map(d => d.count));

  return (
    <div className="space-y-8 animate-fade-in pb-16">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">竞品关注</h2>
          <p className="text-sm text-gray-500 mt-1">点击下方车型查看具体关注点分析</p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl text-sm font-medium hover:bg-gray-50 transition-colors">
            <Filter size={16} /> 筛选
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-primary-600 text-white rounded-xl text-sm font-medium hover:bg-primary-700 transition-colors shadow-sm">
            <Download size={16} /> 导出
          </button>
        </div>
      </div>

      {/* Overview Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Brand Table & Chart */}
        <div className="bg-white dark:bg-slate-800 rounded-3xl shadow-lg border border-gray-100 dark:border-slate-700 overflow-hidden">
          <div className="p-6 border-b border-gray-50 dark:border-slate-700 bg-gray-50/50 dark:bg-slate-700/30">
            <h3 className="text-lg font-bold flex items-center gap-2 text-gray-800 dark:text-white">
              <Target size={18} className="text-primary-500" /> 竞品品牌分布
            </h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
            <table className="w-full text-left">
              <thead>
                <tr className="text-xs text-gray-400 font-bold uppercase tracking-wider">
                  <th className="pb-4">品牌</th>
                  <th className="pb-4 text-center">提及</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50 dark:divide-slate-700">
                {BRAND_DATA.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50 dark:hover:bg-slate-700/30 transition-colors">
                    <td className="py-4 text-sm font-bold text-gray-800 dark:text-gray-100">{item.name}</td>
                    <td className="py-4 text-sm text-center font-bold text-primary-600">{item.count}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="space-y-6">
              {BRAND_DATA.map(item => (
                <ProgressBar key={item.id} label={item.name} count={item.count} max={maxBrand} />
              ))}
            </div>
          </div>
        </div>

        {/* Model Ranking Section */}
        <div className="bg-white dark:bg-slate-800 rounded-3xl shadow-lg border border-gray-100 dark:border-slate-700 overflow-hidden">
          <div className="p-6 border-b border-gray-50 dark:border-slate-700 bg-gray-50/50 dark:bg-slate-700/30">
            <h3 className="text-lg font-bold flex items-center gap-2 text-gray-800 dark:text-white">
              <TrendingUp size={18} className="text-primary-500" /> 竞品车型排行
            </h3>
          </div>
          <div className="p-6">
             <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-1">
                   {MODEL_DATA.map((item) => (
                     <div 
                        key={item.id} 
                        onClick={() => setSelectedModel(item.name)}
                        className={`flex items-center justify-between p-3 rounded-2xl cursor-pointer transition-all ${
                          selectedModel === item.name 
                            ? 'bg-primary-600 text-white shadow-lg scale-[1.02]' 
                            : 'hover:bg-primary-50 dark:hover:bg-slate-700 text-gray-700 dark:text-gray-200'
                        }`}
                     >
                        <div className="flex items-center gap-3">
                           <span className={`w-6 h-6 flex items-center justify-center rounded-full text-xs font-bold ${selectedModel === item.name ? 'bg-white/20' : 'bg-gray-100 dark:bg-slate-600'}`}>{item.id}</span>
                           <span className="font-bold">{item.name}</span>
                        </div>
                        <span className="font-mono">{item.count}</span>
                     </div>
                   ))}
                </div>
                <div className="h-48">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie data={MODEL_DATA} dataKey="count" nameKey="name" cx="50%" cy="50%" innerRadius={40} outerRadius={65} paddingAngle={5}>
                        {MODEL_DATA.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={selectedModel === entry.name ? '#4f46e5' : '#cbd5e1'} />
                        ))}
                      </Pie>
                      <RechartsTooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
             </div>
          </div>
        </div>
      </div>

      {/* Model Detail Section (Drill Down) */}
      {selectedModel === '奥迪A4' && (
        <div className="space-y-6 animate-fade-in">
          {/* Main Detail Header Card */}
          <div className="bg-primary-600 rounded-t-3xl p-4 text-center shadow-lg">
            <h2 className="text-white text-lg font-bold tracking-widest flex items-center justify-center gap-2">
               <Car size={20} /> 竞品车型 —— {selectedModel}
            </h2>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
            {/* Detailed Table Card */}
            <div className="xl:col-span-2 bg-white dark:bg-slate-800 rounded-b-3xl shadow-xl border border-gray-100 dark:border-slate-700 overflow-hidden">
               <div className="grid grid-cols-2 border-b border-gray-200 dark:border-slate-700">
                  <div className="bg-indigo-100 dark:bg-indigo-900/40 p-3 text-center text-sm font-bold text-indigo-900 dark:text-indigo-100 border-r border-gray-200 dark:border-slate-700">
                    产品类
                  </div>
                  <div className="bg-indigo-100 dark:bg-indigo-900/40 p-3 text-center text-sm font-bold text-indigo-900 dark:text-indigo-100">
                    政策/权益类
                  </div>
               </div>
               
               <div className="flex flex-col md:flex-row">
                  {/* Left Column: Product */}
                  <div className="flex-1 border-r border-gray-200 dark:border-slate-700">
                     <div className="grid grid-cols-4 bg-gray-50/80 dark:bg-slate-700/50 text-[10px] uppercase font-bold text-gray-400">
                        <div className="col-span-3 p-2 pl-4">关注点</div>
                        <div className="p-2 text-center">数量</div>
                     </div>
                     <div className="divide-y divide-gray-50 dark:divide-slate-700">
                        {A4_DETAIL_DATA.product.map((item, i) => (
                           <div key={i} className="grid grid-cols-4 text-sm hover:bg-gray-50 dark:hover:bg-slate-700/30 transition-colors">
                              <div className="col-span-3 p-3 pl-4 text-gray-700 dark:text-gray-200">{item.name}</div>
                              <div className="p-3 text-center font-mono font-bold text-primary-600">{item.count}</div>
                           </div>
                        ))}
                     </div>
                  </div>
                  
                  {/* Right Column: Policy */}
                  <div className="flex-1">
                     <div className="grid grid-cols-4 bg-gray-50/80 dark:bg-slate-700/50 text-[10px] uppercase font-bold text-gray-400">
                        <div className="col-span-3 p-2 pl-4">关注点</div>
                        <div className="p-2 text-center">数量</div>
                     </div>
                     <div className="divide-y divide-gray-50 dark:divide-slate-700">
                        {A4_DETAIL_DATA.policy.map((item, i) => (
                           <div key={i} className="grid grid-cols-4 text-sm hover:bg-gray-50 dark:hover:bg-slate-700/30 transition-colors">
                              <div className="col-span-3 p-3 pl-4 text-gray-700 dark:text-gray-200">{item.name}</div>
                              <div className="p-3 text-center font-mono font-bold text-primary-600">{item.count}</div>
                           </div>
                        ))}
                        {/* Fill the remaining space to align with product column height */}
                        {Array.from({ length: A4_DETAIL_DATA.product.length - A4_DETAIL_DATA.policy.length }).map((_, i) => (
                           <div key={i} className="grid grid-cols-4 h-[45px]"></div>
                        ))}
                     </div>
                  </div>
               </div>
            </div>

            {/* Visual Analytics Side Panel */}
            <div className="space-y-6">
               {/* Distribution Chart */}
               <div className="bg-white dark:bg-slate-800 p-6 rounded-3xl shadow-lg border border-gray-100 dark:border-slate-700">
                  <h4 className="text-sm font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                    <PieChartIcon size={16} className="text-primary-500" /> 关注点类型占比
                  </h4>
                  <div className="h-56">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie data={PIE_DATA} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={50} outerRadius={70} stroke="none">
                           {PIE_DATA.map((entry, index) => (
                             <Cell key={`cell-${index}`} fill={entry.color} />
                           ))}
                        </Pie>
                        <RechartsTooltip contentStyle={{ borderRadius: '12px', border: 'none' }} />
                        <Legend verticalAlign="bottom" height={36} iconType="circle" wrapperStyle={{ fontSize: '12px' }} />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
               </div>
               
               {/* AI Recommendation Summary */}
               <div className="bg-primary-50 dark:bg-primary-900/10 p-5 rounded-3xl border border-primary-100 dark:border-primary-800/30 shadow-sm">
                  <div className="flex items-center gap-2 mb-3">
                     <Zap size={18} className="text-primary-600" />
                     <h4 className="text-sm font-bold text-primary-900 dark:text-primary-100">AI 接待策略建议</h4>
                  </div>
                  <p className="text-sm text-primary-700 dark:text-primary-300 leading-relaxed text-justify">
                    根据近期会话分析，奥迪A4客户的核心关注点集中在“车机系统”、“空间轴距”及“内饰设计”等产品力维度。
                    建议销售团队在应对此类客户时，重点强调我方产品在智驾辅助及内饰豪华感上的代际优势，并提供针对性的保值率方案。
                  </p>
               </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CompetitorAnalysis;
