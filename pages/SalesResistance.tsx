
import React, { useState } from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell,
  PieChart, Pie, Legend, RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis
} from 'recharts';
import { 
  TrendingUp, 
  TrendingDown, 
  AlertOctagon, 
  CheckCircle2, 
  Filter, 
  Download, 
  MessageSquare,
  ThumbsDown,
  Target,
  ShieldAlert,
  Swords
} from 'lucide-react';
import AIAssistant from '../components/AIAssistant';

// --- Mock Data ---

// 1. 本品抗拒点分布
const OUR_RESISTANCE_DATA = [
  { name: '价格偏高', value: 35, category: '价格' },
  { name: '续航焦虑', value: 28, category: '性能' },
  { name: '内饰简陋', value: 22, category: '配置' },
  { name: '等待周期长', value: 15, category: '服务' },
  { name: '车漆颜色少', value: 12, category: '配置' },
  { name: '保险费用高', value: 8, category: '价格' },
];

// 2. 本品关注点 (正面)
const OUR_FOCUS_DATA = [
  { name: '自动驾驶', value: 88, fullMark: 100 },
  { name: '品牌影响力', value: 85, fullMark: 100 },
  { name: '动力性能', value: 80, fullMark: 100 },
  { name: '充电网络', value: 75, fullMark: 100 },
  { name: '科技感', value: 72, fullMark: 100 },
];

// 3. 竞品抗拒点 (客户为什么不选竞品 - 我们的机会)
const COMPETITOR_RESISTANCE_DATA = [
  { name: '品牌知名度低', value: 30 },
  { name: '保值率担忧', value: 25 },
  { name: '安全性质疑', value: 20 },
  { name: '车机卡顿', value: 15 },
  { name: '充电不便', value: 10 },
];

// 4. 竞品关注点 (客户为什么看竞品 - 我们的威胁)
const COMPETITOR_FOCUS_DATA = [
  { name: '配置丰富(冰箱彩电)', value: 40 },
  { name: '内饰豪华', value: 35 },
  { name: '价格更低', value: 30 },
  { name: '服务更好', value: 20 },
  { name: '外形设计', value: 15 },
];

// 5. 竞品提及占比
const COMPETITOR_SHARE = [
  { name: '竞品 A (新势力)', value: 45, fill: '#8884d8' },
  { name: '竞品 B (传统豪华)', value: 25, fill: '#82ca9d' },
  { name: '竞品 C (国产新能源)', value: 20, fill: '#ffc658' },
  { name: '其他', value: 10, fill: '#d1d5db' },
];

// 6. Recent Interaction Logs
const INTERACTION_LOGS = [
  { id: 1, advisor: '王金牌', customer: '张先生', topic: '价格抗拒', trigger: '客户对比竞品C价格更低', response: '强调TCO持有成本优势', outcome: 'success', score: 95 },
  { id: 2, advisor: '李进取', customer: '陈女士', topic: '内饰抗拒', trigger: '嫌弃内饰塑料感强', response: '强调极简设计与环保材料', outcome: 'neutral', score: 80 },
  { id: 3, advisor: '张新人', customer: '刘先生', topic: '续航抗拒', trigger: '担心冬季续航缩水', response: '解释热泵空调技术，但未举例实测', outcome: 'fail', score: 60 },
  { id: 4, advisor: '王金牌', customer: '赵先生', topic: '竞品关注', trigger: '询问竞品A的智驾功能', response: '详细对比算力与数据积累优势', outcome: 'success', score: 98 },
];

// --- Components ---

const StatCard = ({ title, value, subtext, icon: Icon, colorClass }: any) => (
  <div className="bg-white dark:bg-slate-800 p-5 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-700">
    <div className="flex justify-between items-start">
      <div>
        <p className="text-gray-500 dark:text-gray-400 text-sm font-medium mb-1">{title}</p>
        <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{value}</h3>
      </div>
      <div className={`p-2.5 rounded-lg ${colorClass}`}>
        <Icon size={20} className="text-white" />
      </div>
    </div>
    <p className="text-xs text-gray-400 mt-2">{subtext}</p>
  </div>
);

const SalesResistance: React.FC = () => {
  const [dateRange, setDateRange] = useState('本周');

  return (
    <div className="space-y-6 pb-12 relative animate-fade-in">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">销售抗拒分析报表</h2>
          <p className="text-sm text-gray-500 mt-1">深度解析客户决策障碍与竞品攻防态势</p>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="flex bg-gray-100 dark:bg-slate-700 p-1 rounded-lg">
            {['今日', '本周', '本月'].map(range => (
              <button 
                key={range}
                onClick={() => setDateRange(range)}
                className={`px-4 py-1.5 text-sm font-medium rounded-md transition-all ${dateRange === range ? 'bg-white dark:bg-slate-600 shadow-sm text-primary-600 dark:text-primary-400' : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'}`}
              >
                {range}
              </button>
            ))}
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-lg text-sm font-medium hover:bg-gray-50 dark:hover:bg-slate-700 transition-colors shadow-sm text-gray-700 dark:text-gray-200">
            <Filter size={16} /> 筛选
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-primary-600 text-white rounded-lg text-sm font-medium hover:bg-primary-700 transition-colors shadow-sm">
            <Download size={16} /> 导出
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          title="抗拒/疑虑触发总次" 
          value="482" 
          subtext="较上周增长 5.2%" 
          icon={AlertOctagon} 
          colorClass="bg-orange-500" 
        />
        <StatCard 
          title="抗拒挽回成功率" 
          value="68.5%" 
          subtext="较上周提升 2.1% (目标 70%)" 
          icon={CheckCircle2} 
          colorClass="bg-green-500" 
        />
        <StatCard 
          title="Top 1 抗拒点" 
          value="价格偏高" 
          subtext="占比 35%，主要集中在 Model Y" 
          icon={TrendingDown} 
          colorClass="bg-red-500" 
        />
        <StatCard 
          title="最大竞品威胁" 
          value="竞品 A" 
          subtext="提及率 45%，主要关注其豪华内饰" 
          icon={Swords} 
          colorClass="bg-blue-500" 
        />
      </div>

      {/* Main Analysis Section */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        
        {/* Left: Our Product Analysis (本品) */}
        <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-700">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
              <ShieldAlert className="text-indigo-500" size={20} /> 本品：抗拒点 vs 关注点
            </h3>
            <span className="text-xs text-gray-400">数据来源：AI会话语义分析</span>
          </div>
          
          <div className="space-y-8">
            {/* Resistance Chart */}
            <div>
              <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3 pl-2 border-l-4 border-red-500">客户抗拒点 (Top 5)</h4>
              <div className="h-48">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={OUR_RESISTANCE_DATA} layout="vertical" margin={{ left: 20 }}>
                    <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#e2e8f0" />
                    <XAxis type="number" hide />
                    <YAxis dataKey="name" type="category" width={80} axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} />
                    <Tooltip cursor={{fill: 'transparent'}} contentStyle={{borderRadius: '8px'}} />
                    <Bar dataKey="value" fill="#ef4444" radius={[0, 4, 4, 0]} barSize={20} label={{ position: 'right', fill: '#ef4444', fontSize: 12 }}>
                       {OUR_RESISTANCE_DATA.map((entry, index) => (
                          <Cell key={`cell-${index}`} fillOpacity={0.8} />
                       ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Focus Chart (Positive) */}
            <div>
              <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3 pl-2 border-l-4 border-green-500">客户关注点 (Top 5)</h4>
              <div className="h-48">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart cx="50%" cy="50%" outerRadius="80%" data={OUR_FOCUS_DATA}>
                    <PolarGrid stroke="#e2e8f0" />
                    <PolarAngleAxis dataKey="name" tick={{ fill: '#64748b', fontSize: 12 }} />
                    <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                    <Radar name="关注度" dataKey="value" stroke="#10b981" fill="#10b981" fillOpacity={0.4} />
                    <Tooltip contentStyle={{borderRadius: '8px'}} />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Competitor Analysis (竞品) */}
        <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-700">
           <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
              <Swords className="text-orange-500" size={20} /> 竞品：攻防态势分析
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
             {/* Share of Voice */}
             <div className="h-48 relative">
               <h4 className="text-xs text-center text-gray-500 mb-2">竞品提及分布</h4>
               <ResponsiveContainer width="100%" height="100%">
                 <PieChart>
                   <Pie data={COMPETITOR_SHARE} cx="50%" cy="50%" innerRadius={40} outerRadius={60} paddingAngle={5} dataKey="value">
                     {COMPETITOR_SHARE.map((entry, index) => (
                       <Cell key={`cell-${index}`} fill={entry.fill} />
                     ))}
                   </Pie>
                   <Tooltip />
                   <Legend verticalAlign="bottom" height={36} iconSize={8} wrapperStyle={{ fontSize: '10px' }} />
                 </PieChart>
               </ResponsiveContainer>
             </div>

             {/* Insight Text */}
             <div className="flex flex-col justify-center space-y-3">
                <div className="p-3 bg-red-50 dark:bg-red-900/10 rounded-lg border border-red-100 dark:border-red-900/20">
                   <p className="text-xs font-bold text-red-700 dark:text-red-400 mb-1">主要威胁点 (Why Buy Them)</p>
                   <p className="text-xs text-gray-600 dark:text-gray-300">客户最看重竞品的<span className="font-bold">配置丰富度</span>(40%)与<span className="font-bold">内饰豪华感</span>(35%)。</p>
                </div>
                <div className="p-3 bg-green-50 dark:bg-green-900/10 rounded-lg border border-green-100 dark:border-green-900/20">
                   <p className="text-xs font-bold text-green-700 dark:text-green-400 mb-1">主要攻击点 (Why Not Them)</p>
                   <p className="text-xs text-gray-600 dark:text-gray-300">客户对竞品的<span className="font-bold">品牌知名度</span>(30%)与<span className="font-bold">保值率</span>(25%)存有较大疑虑。</p>
                </div>
             </div>
          </div>

          <div className="space-y-6">
             {/* Competitor Focus (Why they consider competitors) */}
             <div>
                <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3 flex justify-between">
                   <span>竞品优势点 (客户关注)</span>
                   <span className="text-xs font-normal text-orange-500">需重点防守</span>
                </h4>
                <div className="space-y-2">
                   {COMPETITOR_FOCUS_DATA.slice(0, 3).map((item, i) => (
                      <div key={i} className="flex items-center gap-3">
                         <span className="text-xs w-24 text-gray-500 truncate" title={item.name}>{item.name}</span>
                         <div className="flex-1 bg-gray-100 dark:bg-slate-700 h-2 rounded-full overflow-hidden">
                            <div className="h-full bg-orange-400" style={{width: `${item.value}%`}}></div>
                         </div>
                         <span className="text-xs font-bold w-8 text-right">{item.value}%</span>
                      </div>
                   ))}
                </div>
             </div>

             {/* Competitor Resistance (Why they hesitate about competitors) */}
             <div>
                <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3 flex justify-between">
                   <span>竞品劣势点 (客户抗拒)</span>
                   <span className="text-xs font-normal text-green-500">需重点攻击</span>
                </h4>
                <div className="space-y-2">
                   {COMPETITOR_RESISTANCE_DATA.slice(0, 3).map((item, i) => (
                      <div key={i} className="flex items-center gap-3">
                         <span className="text-xs w-24 text-gray-500 truncate" title={item.name}>{item.name}</span>
                         <div className="flex-1 bg-gray-100 dark:bg-slate-700 h-2 rounded-full overflow-hidden">
                            <div className="h-full bg-green-500" style={{width: `${item.value}%`}}></div>
                         </div>
                         <span className="text-xs font-bold w-8 text-right">{item.value}%</span>
                      </div>
                   ))}
                </div>
             </div>
          </div>
        </div>
      </div>

      {/* Detailed Table */}
      <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-700 overflow-hidden">
         <div className="p-6 border-b border-gray-100 dark:border-slate-700 flex justify-between items-center">
             <h3 className="text-lg font-bold text-gray-900 dark:text-white">抗拒应对实战记录</h3>
             <button className="text-sm text-primary-600 hover:text-primary-700 font-medium">查看全部</button>
         </div>
         <div className="overflow-x-auto">
             <table className="w-full text-left">
                 <thead className="bg-gray-50 dark:bg-slate-700/50 text-gray-500 dark:text-gray-400 text-xs uppercase tracking-wider">
                     <tr>
                         <th className="px-6 py-4 font-medium">顾问 / 客户</th>
                         <th className="px-6 py-4 font-medium">抗拒类型</th>
                         <th className="px-6 py-4 font-medium">触发语境</th>
                         <th className="px-6 py-4 font-medium">应对策略 (AI摘要)</th>
                         <th className="px-6 py-4 font-medium">挽回结果</th>
                         <th className="px-6 py-4 font-medium">AI 评分</th>
                     </tr>
                 </thead>
                 <tbody className="divide-y divide-gray-100 dark:divide-slate-700">
                     {INTERACTION_LOGS.map((log) => (
                         <tr key={log.id} className="hover:bg-gray-50 dark:hover:bg-slate-700/30 transition-colors">
                             <td className="px-6 py-4">
                                 <div className="text-sm font-bold text-gray-900 dark:text-white">{log.advisor}</div>
                                 <div className="text-xs text-gray-400">{log.customer}</div>
                             </td>
                             <td className="px-6 py-4">
                                 <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                    log.topic.includes('竞品') ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300' : 
                                    'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-300'
                                 }`}>
                                    {log.topic}
                                 </span>
                             </td>
                             <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-300 max-w-xs truncate" title={log.trigger}>{log.trigger}</td>
                             <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-300 max-w-xs truncate" title={log.response}>{log.response}</td>
                             <td className="px-6 py-4">
                                 {log.outcome === 'success' ? (
                                    <span className="flex items-center gap-1 text-green-600 dark:text-green-400 text-xs font-bold"><CheckCircle2 size={14} /> 成功挽回</span>
                                 ) : log.outcome === 'neutral' ? (
                                    <span className="flex items-center gap-1 text-gray-500 text-xs font-bold"><Target size={14} /> 存疑</span>
                                 ) : (
                                    <span className="flex items-center gap-1 text-red-500 text-xs font-bold"><ThumbsDown size={14} /> 失败</span>
                                 )}
                             </td>
                             <td className="px-6 py-4">
                                 <div className="flex items-center gap-2">
                                    <div className="w-16 bg-gray-200 dark:bg-slate-600 h-1.5 rounded-full overflow-hidden">
                                       <div className={`h-full ${log.score >= 90 ? 'bg-green-500' : log.score >= 70 ? 'bg-yellow-500' : 'bg-red-500'}`} style={{width: `${log.score}%`}}></div>
                                    </div>
                                    <span className="text-xs font-bold text-gray-700 dark:text-gray-300">{log.score}</span>
                                 </div>
                             </td>
                         </tr>
                     ))}
                 </tbody>
             </table>
         </div>
      </div>
      
      <AIAssistant context="dashboard" />
    </div>
  );
};

export default SalesResistance;
