
import React from 'react';
import { 
  Mic, 
  Users, 
  TrendingUp, 
  AlertTriangle, 
  Play, 
  Clock, 
  CheckCircle,
  MoreHorizontal,
  ArrowRight
} from 'lucide-react';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  BarChart, Bar, RadialBarChart, RadialBar, PolarGrid, 
  PolarAngleAxis, PolarRadiusAxis, Radar, RadarChart,
  LineChart, Line, Legend
} from 'recharts';
import AIAssistant from '../components/AIAssistant';

// --- Mock Data ---

const trafficTrendData = [
  { time: '周一', value: 120 },
  { time: '周二', value: 132 },
  { time: '周三', value: 101 },
  { time: '周四', value: 134 },
  { time: '周五', value: 190 },
  { time: '周六', value: 230 },
  { time: '周日', value: 210 },
];

const executionRateData = [
  { name: '执行率', value: 82, fill: '#10b981' }, // emerald-500
];

const receptionData = [
  { name: '进店问候', score: 95 },
  { name: '意图问询', score: 88 },
  { name: '预约确认', score: 76 },
  { name: '自我介绍', score: 92 },
  { name: '服务介绍', score: 65 },
  { name: '客户送别', score: 85 },
];

const needsData = [
  { subject: '来店渠道', A: 90, fullMark: 100 },
  { subject: '意向车型', A: 95, fullMark: 100 },
  { subject: '购车预算', A: 86, fullMark: 100 },
  { subject: '使用场景', A: 70, fullMark: 100 },
  { subject: '意向竞品', A: 65, fullMark: 100 },
  { subject: '购车时间', A: 85, fullMark: 100 },
];

const interactionFunnelData = [
  { name: '邀约体验', value: 100 },
  { name: '主动留资', value: 85 },
  { name: '邀约试驾', value: 65 },
  { name: '车价提及', value: 55 },
  { name: '贷款介绍', value: 40 },
  { name: '保险介绍', value: 35 },
  { name: '补贴提及', value: 30 },
];

const nodeTrendData = [
  { date: '10/01', 试驾: 40, 留资: 60, 成交: 20 },
  { date: '10/05', 试驾: 45, 留资: 65, 成交: 22 },
  { date: '10/10', 试驾: 42, 留资: 58, 成交: 25 },
  { date: '10/15', 试驾: 55, 留资: 75, 成交: 30 },
  { date: '10/20', 试驾: 60, 留资: 80, 成交: 35 },
  { date: '10/25', 试驾: 58, 留资: 82, 成交: 32 },
];

const alertsData = [
  { id: 1, type: 'process', title: '试驾邀请率过低', desc: '今日试驾邀请率仅20%，低于基准线35%', time: '14:30' },
  { id: 2, type: 'coverage', title: '录音覆盖率异常', desc: 'B区销售顾问张三录音覆盖率不足60%', time: '11:15' },
  { id: 3, type: 'traffic', title: '客流高峰预警', desc: '预计15:00-16:00将出现接待高峰', time: '10:00' },
];

// --- Components ---

const CardTitle = ({ title, extra }: { title: string, extra?: React.ReactNode }) => (
  <div className="flex justify-between items-center mb-4">
    <h3 className="text-lg font-bold text-gray-900 dark:text-white">{title}</h3>
    {extra}
  </div>
);

const CustomerInsights: React.FC = () => {
  return (
    <div className="space-y-6 relative animate-fade-in">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">客户洞察</h2>
        <div className="flex gap-2 text-sm bg-white dark:bg-slate-800 p-1 rounded-lg border border-gray-200 dark:border-slate-700">
          <button className="px-3 py-1 bg-primary-50 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 rounded-md font-medium">今日</button>
          <button className="px-3 py-1 text-gray-500 hover:bg-gray-50 dark:hover:bg-slate-700 rounded-md">本周</button>
          <button className="px-3 py-1 text-gray-500 hover:bg-gray-50 dark:hover:bg-slate-700 rounded-md">本月</button>
        </div>
      </div>

      {/* Top Area: 3 Big Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Card 1: Traffic Overview */}
        <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-700 flex flex-col justify-between">
          <CardTitle title="客流总览" extra={<span className="text-xs text-gray-400">较上周</span>} />
          <div className="flex items-end justify-between mb-2">
            <div>
              <div className="text-4xl font-bold text-gray-900 dark:text-white mb-1">1,248</div>
              <div className="text-sm text-green-500 flex items-center font-medium">
                <TrendingUp size={16} className="mr-1" /> +12.5%
              </div>
            </div>
            <div className="w-1/2 h-16">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={trafficTrendData}>
                  <defs>
                    <linearGradient id="colorTraffic" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <Area type="monotone" dataKey="value" stroke="#6366f1" strokeWidth={2} fill="url(#colorTraffic)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">昨日进店 186 人，高峰时段 14:00-16:00</p>
        </div>

        {/* Card 2: Recording Overview */}
        <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-700">
          <CardTitle title="录音概览" extra={<span className="px-2 py-0.5 rounded bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300 text-xs font-bold">正常</span>} />
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">今日录音数</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">156</p>
            </div>
            <div>
              <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">录音覆盖率</p>
              <p className="text-2xl font-bold text-primary-600 dark:text-primary-400">92%</p>
            </div>
          </div>
          <div className="space-y-3">
            <div>
              <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mb-1">
                <span>总时长 42.5 小时</span>
                <span>目标 40h</span>
              </div>
              <div className="w-full bg-gray-100 dark:bg-slate-700 rounded-full h-1.5">
                <div className="bg-blue-500 h-1.5 rounded-full" style={{ width: '100%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mb-1">
                <span>平均时长 16.3 分钟</span>
                <span>目标 15m</span>
              </div>
              <div className="w-full bg-gray-100 dark:bg-slate-700 rounded-full h-1.5">
                <div className="bg-indigo-500 h-1.5 rounded-full" style={{ width: '85%' }}></div>
              </div>
            </div>
          </div>
        </div>

        {/* Card 3: Overall Execution Rate */}
        <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-700 relative overflow-hidden">
          <CardTitle title="整体执行率" />
          <div className="h-40 flex items-center justify-center relative">
            <ResponsiveContainer width="100%" height="100%">
              <RadialBarChart innerRadius="70%" outerRadius="100%" data={executionRateData} startAngle={180} endAngle={0} cy="70%">
                <RadialBar
                  background
                  dataKey="value"
                  cornerRadius={10}
                />
              </RadialBarChart>
            </ResponsiveContainer>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center mt-3">
              <span className="text-4xl font-bold text-gray-900 dark:text-white">{executionRateData[0].value}</span>
              <span className="text-sm text-gray-500 dark:text-gray-400">%</span>
              <p className="text-xs text-gray-400 mt-1">综合评分</p>
            </div>
          </div>
        </div>
      </div>

      {/* Middle Section: Detailed Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Reception Process Breakdown */}
        <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-700">
           <CardTitle title="接待流程节点执行率" />
           <div className="h-64">
             <ResponsiveContainer width="100%" height="100%">
               <BarChart data={receptionData} layout="vertical" margin={{ left: 20 }}>
                 <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#e2e8f0" />
                 <XAxis type="number" hide />
                 <YAxis dataKey="name" type="category" width={70} axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} />
                 <Tooltip cursor={{fill: 'transparent'}} contentStyle={{borderRadius: '8px'}} />
                 <Bar dataKey="score" fill="#6366f1" radius={[0, 4, 4, 0]} barSize={20} label={{ position: 'right', fill: '#64748b', fontSize: 12 }} />
               </BarChart>
             </ResponsiveContainer>
           </div>
        </div>

        {/* Capability Radar */}
        <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-700">
           <CardTitle title="需求分析能力模型" />
           <div className="h-64">
             <ResponsiveContainer width="100%" height="100%">
               <RadarChart cx="50%" cy="50%" outerRadius="75%" data={needsData}>
                 <PolarGrid stroke="#e2e8f0" />
                 <PolarAngleAxis dataKey="subject" tick={{ fill: '#64748b', fontSize: 12 }} />
                 <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                 <Radar name="能力值" dataKey="A" stroke="#8b5cf6" fill="#8b5cf6" fillOpacity={0.5} />
                 <Tooltip contentStyle={{borderRadius: '8px'}} />
               </RadarChart>
             </ResponsiveContainer>
           </div>
        </div>

        {/* Interaction Funnel */}
        <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-700">
           <CardTitle title="销售漏斗转化分析" />
           <div className="h-64">
             <ResponsiveContainer width="100%" height="100%">
               <BarChart data={interactionFunnelData}>
                 <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                 <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 11}} />
                 <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8'}} />
                 <Tooltip contentStyle={{borderRadius: '8px'}} />
                 <Bar dataKey="value" fill="#3b82f6" radius={[4, 4, 0, 0]} barSize={30} />
               </BarChart>
             </ResponsiveContainer>
           </div>
        </div>

        {/* Alerts List */}
        <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-700">
           <CardTitle title="实时智能预警" extra={<button className="text-xs text-primary-600">查看全部</button>} />
           <div className="space-y-4">
             {alertsData.map(alert => (
               <div key={alert.id} className="flex gap-4 items-start p-3 bg-gray-50 dark:bg-slate-700/50 rounded-xl border border-gray-100 dark:border-slate-700">
                 <div className={`p-2 rounded-lg flex-shrink-0 ${
                   alert.type === 'process' ? 'bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-300' :
                   alert.type === 'coverage' ? 'bg-orange-100 text-orange-600 dark:bg-orange-900/30 dark:text-orange-300' :
                   'bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-300'
                 }`}>
                   {alert.type === 'process' ? <AlertTriangle size={18} /> : alert.type === 'coverage' ? <Mic size={18} /> : <Users size={18} />}
                 </div>
                 <div className="flex-1">
                   <div className="flex justify-between mb-1">
                     <h4 className="text-sm font-bold text-gray-900 dark:text-white">{alert.title}</h4>
                     <span className="text-xs text-gray-400">{alert.time}</span>
                   </div>
                   <p className="text-xs text-gray-500 dark:text-gray-400">{alert.desc}</p>
                 </div>
               </div>
             ))}
           </div>
        </div>

      </div>
      
      <AIAssistant context="customer_insights" />
    </div>
  );
};

export default CustomerInsights;
