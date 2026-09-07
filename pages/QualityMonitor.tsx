
import React, { useState } from 'react';
import { 
  Filter, Calendar, ChevronDown, User, Mic, Play, 
  AlertTriangle, CheckCircle, XCircle, BarChart2,
  Download, RefreshCw, AlertOctagon, ThumbsDown, ThumbsUp,
  Search, Sliders, Bell, ArrowRight
} from 'lucide-react';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar, Legend, LineChart, Line, RadialBarChart, RadialBar,
  RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar,
  ComposedChart, Scatter, Cell
} from 'recharts';
import AIAssistant from '../components/AIAssistant';

// --- Mock Data ---

const trafficRecordingData = [
  { time: '09:00', traffic: 10, recordings: 8 },
  { time: '10:00', traffic: 25, recordings: 22 },
  { time: '11:00', traffic: 40, recordings: 35 },
  { time: '12:00', traffic: 30, recordings: 28 },
  { time: '13:00', traffic: 20, recordings: 19 },
  { time: '14:00', traffic: 45, recordings: 42 },
  { time: '15:00', traffic: 60, recordings: 55 },
];

const overallExecutionData = [
  { name: '执行率', value: 82, fill: '#10b981' },
];

const processNodeData = [
  { name: '进店问候', count: 145, rate: 98 },
  { name: '意图问询', count: 130, rate: 88 },
  { name: '预约确认', count: 45, rate: 92 },
  { name: '需求分析', count: 120, rate: 82 },
  { name: '产品介绍', count: 115, rate: 78 },
  { name: '试驾邀约', count: 60, rate: 45 }, // Low
  { name: '客户送别', count: 140, rate: 95 },
];

const emotionData = [
  { time: '09:00', positive: 60, neutral: 30, negative: 10 },
  { time: '10:00', positive: 55, neutral: 35, negative: 10 },
  { time: '11:00', positive: 70, neutral: 20, negative: 10 },
  { time: '12:00', positive: 65, neutral: 25, negative: 10 },
  { time: '13:00', positive: 50, neutral: 40, negative: 10 },
  { time: '14:00', positive: 45, neutral: 35, negative: 20 }, // High negative
  { time: '15:00', positive: 60, neutral: 30, negative: 10 },
];

const violationData = [
  { type: '过度承诺', count: 12 },
  { type: '竞品攻击', count: 8 },
  { type: '未留资', count: 5 },
  { type: '价格违规', count: 3 },
  { type: '隐私未告知', count: 2 },
];

const confidenceData = [
  { name: '车型识别', avg: 92, min: 75 },
  { name: '竞品识别', avg: 85, min: 60 },
  { name: '意图判断', avg: 88, min: 70 },
  { name: '情绪分析', avg: 78, min: 55 },
  { name: '关键动作', avg: 90, min: 80 },
];

const accuracyRadarData = [
  { subject: '产品参数', A: 95, fullMark: 100 },
  { subject: '金融政策', A: 82, fullMark: 100 },
  { subject: '置换政策', A: 75, fullMark: 100 }, // Low
  { subject: '竞品对比', A: 88, fullMark: 100 },
  { subject: '售后保养', A: 90, fullMark: 100 },
];

const funnelData = [
  { name: '接待', value: 100 },
  { name: '留资', value: 85 },
  { name: '试驾邀约', value: 60 },
  { name: '试驾', value: 45 },
  { name: '下订', value: 15 },
];

const trendData = [
  { date: '10/20', 试驾邀约: 40, 需求分析: 70 },
  { date: '10/21', 试驾邀约: 42, 需求分析: 72 },
  { date: '10/22', 试驾邀约: 38, 需求分析: 75 },
  { date: '10/23', 试驾邀约: 45, 需求分析: 71 },
  { date: '10/24', 试驾邀约: 50, 需求分析: 78 },
  { date: '10/25', 试驾邀约: 55, 需求分析: 80 },
  { date: '10/26', 试驾邀约: 58, 需求分析: 82 },
];

const sessionList = [
  { id: 'S-1024', advisor: '王金牌', start: '14:20', duration: '18m', summary: '客户关注Model Y续航，提及竞品', tags: ['竞品对比', '试驾'], risk: 'none' },
  { id: 'S-1025', advisor: '李进取', start: '14:35', duration: '5m', summary: '进店仅询问价格，未留资', tags: ['价格敏感'], risk: 'low_duration' },
  { id: 'S-1026', advisor: '张新人', start: '14:50', duration: '22m', summary: '客户情绪激动，投诉交付延期', tags: ['情绪负向', '交付投诉'], risk: 'high_negative' },
  { id: 'S-1027', advisor: '王金牌', start: '15:10', duration: '15m', summary: '正常接待流程，预约下周试驾', tags: ['试驾预约'], risk: 'none' },
  { id: 'S-1028', advisor: '李进取', start: '15:30', duration: '12m', summary: '介绍置换政策，客户意向较高', tags: ['置换'], risk: 'none' },
];

const alerts = [
  { id: 1, text: '张新人：负向情绪会话 (S-1026) 待处理', priority: 'high' },
  { id: 2, text: '李进取：试驾邀约率今日低于 20%', priority: 'medium' },
  { id: 3, text: '全店：录音覆盖率 11:00-12:00 下降至 65%', priority: 'medium' },
];

// --- Component ---

const QualityMonitor: React.FC = () => {
  const [dateRange, setDateRange] = useState('今日');
  const [selectedAdvisor, setSelectedAdvisor] = useState('全部顾问');

  return (
    <div className="space-y-6 pb-12 relative">
      {/* 1. Global Filter Bar */}
      <div className="bg-white dark:bg-slate-800 p-4 rounded-xl shadow-sm border border-gray-100 dark:border-slate-700 flex flex-wrap items-center justify-between gap-4 sticky top-0 z-20">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
            <Filter size={18} />
            <span className="font-semibold text-sm">全局筛选:</span>
          </div>
          
          <div className="relative">
            <select 
              className="appearance-none bg-gray-50 dark:bg-slate-700 border border-gray-200 dark:border-slate-600 rounded-lg pl-3 pr-8 py-1.5 text-sm focus:ring-2 focus:ring-primary-500 outline-none dark:text-white cursor-pointer"
              value={selectedAdvisor}
              onChange={(e) => setSelectedAdvisor(e.target.value)}
            >
              <option>全部顾问</option>
              <option>王金牌</option>
              <option>李进取</option>
              <option>张新人</option>
            </select>
            <ChevronDown size={14} className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
          </div>

          <div className="flex bg-gray-100 dark:bg-slate-700 rounded-lg p-1">
            {['今日', '本周', '本月'].map(range => (
              <button 
                key={range}
                onClick={() => setDateRange(range)}
                className={`px-3 py-1 text-sm rounded-md transition-all ${dateRange === range ? 'bg-white dark:bg-slate-600 shadow-sm text-primary-600 dark:text-primary-400 font-medium' : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'}`}
              >
                {range}
              </button>
            ))}
          </div>
          
          <div className="flex items-center gap-2 text-sm text-gray-500 border-l border-gray-200 dark:border-slate-600 pl-4">
            <Calendar size={16} />
            <span>2023-10-26</span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button className="flex items-center gap-1 text-xs text-gray-500 hover:text-primary-600">
            <RefreshCw size={14} /> 5m刷新
          </button>
          <button className="p-2 text-gray-500 hover:bg-gray-100 dark:hover:bg-slate-700 rounded-lg">
            <Download size={18} />
          </button>
        </div>
      </div>

      {/* 2. Top KPI Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Traffic & Recording Speed View */}
        <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-700">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white">客流与录音速览</h3>
              <p className="text-xs text-gray-500 mt-1">录音覆盖率: <span className="text-red-500 font-bold">88%</span> (低于90%目标)</p>
            </div>
            <div className="flex gap-4">
              <div className="text-right">
                <p className="text-xs text-gray-500">总客流</p>
                <p className="text-xl font-bold text-gray-900 dark:text-white">230</p>
              </div>
              <div className="text-right">
                <p className="text-xs text-gray-500">录音数</p>
                <p className="text-xl font-bold text-primary-600 dark:text-primary-400">202</p>
              </div>
            </div>
          </div>
          <div className="h-48 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={trafficRecordingData}>
                <defs>
                  <linearGradient id="colorRec" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="time" axisLine={false} tickLine={false} tick={{fill: '#94a3b8'}} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8'}} />
                <Tooltip contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}} />
                <Legend />
                <Area type="monotone" dataKey="traffic" name="客流" stroke="#94a3b8" fill="transparent" strokeDasharray="5 5" />
                <Area type="monotone" dataKey="recordings" name="录音" stroke="#6366f1" fill="url(#colorRec)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Overall Execution Rate */}
        <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-700 relative">
            <div className="flex justify-between items-center mb-2">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white">整体流程执行率</h3>
                <span className="text-xs font-bold px-2 py-1 bg-green-100 text-green-700 rounded dark:bg-green-900/30 dark:text-green-300">健康</span>
            </div>
            <div className="flex items-center">
                <div className="w-1/3 h-48 relative">
                     <ResponsiveContainer width="100%" height="100%">
                        <RadialBarChart innerRadius="70%" outerRadius="100%" data={overallExecutionData} startAngle={180} endAngle={0} cy="70%">
                            <RadialBar background dataKey="value" cornerRadius={10} />
                        </RadialBarChart>
                    </ResponsiveContainer>
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 mt-4 text-center">
                        <p className="text-3xl font-bold text-gray-900 dark:text-white">82%</p>
                        <p className="text-xs text-gray-500">综合得分</p>
                    </div>
                </div>
                <div className="w-2/3 pl-8">
                    <h4 className="text-sm font-semibold mb-3 text-gray-700 dark:text-gray-300">待提升节点 TOP3</h4>
                    <ul className="space-y-3">
                        {[
                            { name: '试驾邀约', val: '45%', change: '-5%' },
                            { name: '竞品对比', val: '52%', change: '+2%' },
                            { name: '金融介绍', val: '60%', change: '0%' },
                        ].map((item, i) => (
                            <li key={i} className="flex items-center justify-between text-sm">
                                <span className="text-gray-600 dark:text-gray-400">{i+1}. {item.name}</span>
                                <div className="flex items-center gap-3">
                                    <div className="w-24 bg-gray-100 dark:bg-slate-700 h-2 rounded-full overflow-hidden">
                                        <div className="h-full bg-red-400" style={{width: item.val}}></div>
                                    </div>
                                    <span className="font-mono text-xs text-gray-900 dark:text-white">{item.val}</span>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
      </div>

      {/* 3. Middle Section Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Process Node Execution */}
          <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-700">
              <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white">流程节点执行率明细</h3>
                  <button className="text-xs text-primary-600 hover:text-primary-700">查看未达标会话</button>
              </div>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={processNodeData} layout="horizontal">
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                        <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                        <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8'}} />
                        <Tooltip cursor={{fill: 'transparent'}} contentStyle={{borderRadius: '8px'}} />
                        <Bar dataKey="rate" name="执行率%" radius={[4, 4, 0, 0]}>
                            {processNodeData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.rate < 60 ? '#ef4444' : '#6366f1'} />
                            ))}
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
              </div>
          </div>

          {/* Emotion & Attitude */}
          <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-700">
              <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white">客户情绪与态度分布</h3>
                  <div className="flex gap-2">
                      <span className="flex items-center text-xs text-gray-500"><span className="w-2 h-2 bg-green-500 rounded-full mr-1"></span>正向</span>
                      <span className="flex items-center text-xs text-gray-500"><span className="w-2 h-2 bg-gray-300 rounded-full mr-1"></span>中性</span>
                      <span className="flex items-center text-xs text-gray-500"><span className="w-2 h-2 bg-red-500 rounded-full mr-1"></span>负向</span>
                  </div>
              </div>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={emotionData} stackOffset="expand">
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                        <XAxis dataKey="time" axisLine={false} tickLine={false} tick={{fill: '#94a3b8'}} />
                        <YAxis tickFormatter={(val) => `${val * 100}%`} axisLine={false} tickLine={false} tick={{fill: '#94a3b8'}} />
                        <Tooltip contentStyle={{borderRadius: '8px'}} />
                        <Bar dataKey="positive" stackId="a" fill="#10b981" />
                        <Bar dataKey="neutral" stackId="a" fill="#cbd5e1" />
                        <Bar dataKey="negative" stackId="a" fill="#ef4444" />
                    </BarChart>
                </ResponsiveContainer>
              </div>
          </div>
      </div>

      {/* 4. Middle Section Row 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Compliance Review */}
          <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-700">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">合规性审查 (Top 5 违规)</h3>
              <div className="space-y-4">
                  {violationData.map((item, i) => (
                      <div key={i} className="flex items-center gap-4">
                          <span className="w-24 text-sm text-gray-600 dark:text-gray-300 font-medium">{item.type}</span>
                          <div className="flex-1 bg-gray-100 dark:bg-slate-700 h-2.5 rounded-full overflow-hidden">
                              <div className="h-full bg-orange-400" style={{width: `${(item.count / 20) * 100}%`}}></div>
                          </div>
                          <span className="w-8 text-sm font-bold text-gray-900 dark:text-white text-right">{item.count}</span>
                          <button className="text-xs text-primary-600 hover:underline">查看</button>
                      </div>
                  ))}
              </div>
          </div>

          {/* Key Node Confidence */}
          <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-700">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">关键节点识别置信度</h3>
              <div className="h-56">
                <ResponsiveContainer width="100%" height="100%">
                    <ComposedChart data={confidenceData} layout="vertical">
                         <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke="#e2e8f0" />
                         <XAxis type="number" domain={[0, 100]} axisLine={false} tickLine={false} />
                         <YAxis dataKey="name" type="category" width={80} axisLine={false} tickLine={false} tick={{fill: '#64748b'}} />
                         <Tooltip cursor={{fill: 'transparent'}} contentStyle={{borderRadius: '8px'}} />
                         <Bar dataKey="avg" barSize={12} fill="#6366f1" radius={[0, 4, 4, 0]} name="平均置信度" />
                         <Scatter dataKey="min" fill="#ef4444" name="最低置信度" shape="circle" />
                    </ComposedChart>
                </ResponsiveContainer>
              </div>
          </div>
      </div>

      {/* 5. Lower Section Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Response Accuracy */}
          <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-700">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">顾问应答准确率</h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart cx="50%" cy="50%" outerRadius="80%" data={accuracyRadarData}>
                    <PolarGrid stroke="#e2e8f0" />
                    <PolarAngleAxis dataKey="subject" tick={{ fill: '#64748b', fontSize: 12 }} />
                    <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                    <Radar name="准确率" dataKey="A" stroke="#10b981" fill="#10b981" fillOpacity={0.4} />
                    <Tooltip contentStyle={{borderRadius: '8px'}} />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
          </div>

          {/* Interaction Funnel */}
          <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-700">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">互动深度漏斗</h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={funnelData} layout="vertical" margin={{ left: 20 }}>
                        <XAxis type="number" hide />
                        <YAxis dataKey="name" type="category" width={80} axisLine={false} tickLine={false} tick={{fill: '#64748b'}} />
                        <Tooltip cursor={{fill: 'rgba(59, 130, 246, 0.1)'}} contentStyle={{borderRadius: '8px'}} />
                        <Bar dataKey="value" fill="#3b82f6" radius={[0, 4, 4, 0]} barSize={24} label={{ position: 'right', fill: '#64748b', fontSize: 12 }} />
                    </BarChart>
                </ResponsiveContainer>
              </div>
          </div>
      </div>

      {/* 6. Trend Analysis */}
      <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-700">
          <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white">关键节点趋势对比</h3>
              <div className="flex gap-2">
                 {/* Legend placeholder or interactive toggles could go here */}
              </div>
          </div>
          <div className="h-64">
             <ResponsiveContainer width="100%" height="100%">
                <LineChart data={trendData}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                    <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{fill: '#94a3b8'}} />
                    <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8'}} />
                    <Tooltip contentStyle={{borderRadius: '8px'}} />
                    <Legend />
                    <Line type="monotone" dataKey="试驾邀约" stroke="#f59e0b" strokeWidth={2} dot={{r: 4}} activeDot={{r: 6}} />
                    <Line type="monotone" dataKey="需求分析" stroke="#3b82f6" strokeWidth={2} dot={{r: 4}} activeDot={{r: 6}} />
                </LineChart>
             </ResponsiveContainer>
          </div>
      </div>

      {/* 7. Detailed Session Table */}
      <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-700 overflow-hidden">
          <div className="p-6 border-b border-gray-100 dark:border-slate-700 flex justify-between items-center">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white">录音与会话明细</h3>
              <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input type="text" placeholder="搜索关键词..." className="pl-9 pr-4 py-1.5 text-sm bg-gray-50 dark:bg-slate-700 border border-gray-200 dark:border-slate-600 rounded-lg outline-none focus:ring-2 focus:ring-primary-500 dark:text-white" />
              </div>
          </div>
          <div className="overflow-x-auto">
              <table className="w-full text-left">
                  <thead className="bg-gray-50 dark:bg-slate-700/50 text-gray-500 dark:text-gray-400 text-xs uppercase">
                      <tr>
                          <th className="px-6 py-4 font-medium">会话ID</th>
                          <th className="px-6 py-4 font-medium">顾问</th>
                          <th className="px-6 py-4 font-medium">开始时间</th>
                          <th className="px-6 py-4 font-medium">摘要</th>
                          <th className="px-6 py-4 font-medium">标签</th>
                          <th className="px-6 py-4 font-medium">操作</th>
                      </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 dark:divide-slate-700">
                      {sessionList.map((session, i) => (
                          <tr key={i} className={`hover:bg-gray-50 dark:hover:bg-slate-700/30 transition-colors ${session.risk === 'high_negative' ? 'bg-red-50/50 dark:bg-red-900/10' : ''}`}>
                              <td className="px-6 py-4 text-sm font-mono text-gray-600 dark:text-gray-300">{session.id}</td>
                              <td className="px-6 py-4 text-sm font-medium text-gray-900 dark:text-white">{session.advisor}</td>
                              <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                                  {session.start} <span className="text-xs text-gray-400">({session.duration})</span>
                              </td>
                              <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-300 max-w-xs truncate" title={session.summary}>{session.summary}</td>
                              <td className="px-6 py-4">
                                  <div className="flex flex-wrap gap-1">
                                      {session.tags.map(tag => (
                                          <span key={tag} className="px-2 py-0.5 text-xs rounded bg-gray-100 dark:bg-slate-700 text-gray-600 dark:text-gray-300">{tag}</span>
                                      ))}
                                      {session.risk === 'high_negative' && (
                                          <span className="px-2 py-0.5 text-xs rounded bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-300 flex items-center gap-1">
                                              <AlertTriangle size={10} /> 风险
                                          </span>
                                      )}
                                  </div>
                              </td>
                              <td className="px-6 py-4">
                                  <div className="flex gap-2">
                                      <button className="p-1.5 text-primary-600 hover:bg-primary-50 dark:hover:bg-primary-900/20 rounded"><Play size={16} /></button>
                                      <button className="p-1.5 text-gray-500 hover:bg-gray-100 dark:hover:bg-slate-700 rounded"><Download size={16} /></button>
                                  </div>
                              </td>
                          </tr>
                      ))}
                  </tbody>
              </table>
          </div>
          <div className="p-4 border-t border-gray-100 dark:border-slate-700 text-center">
              <button className="text-sm text-gray-500 hover:text-primary-600 font-medium">查看更多历史记录</button>
          </div>
      </div>

      {/* 8. Fixed Alerts Widget (Bottom Right) */}
      <div className="fixed bottom-6 right-6 w-80 bg-white dark:bg-slate-800 rounded-xl shadow-2xl border border-gray-200 dark:border-slate-700 overflow-hidden z-30 flex flex-col max-h-[400px]">
          <div className="bg-red-500 p-3 flex justify-between items-center text-white">
              <div className="flex items-center gap-2 font-bold text-sm">
                  <Bell size={16} />
                  <span>异常告警与待办 ({alerts.length})</span>
              </div>
              <button className="text-white/80 hover:text-white"><ChevronDown size={16} /></button>
          </div>
          <div className="overflow-y-auto p-2 space-y-2 flex-1 bg-gray-50 dark:bg-slate-900">
              {alerts.map(alert => (
                  <div key={alert.id} className="bg-white dark:bg-slate-800 p-3 rounded-lg border-l-4 border-l-red-500 shadow-sm">
                      <div className="flex justify-between items-start mb-1">
                          <span className={`text-[10px] uppercase font-bold px-1.5 py-0.5 rounded ${alert.priority === 'high' ? 'bg-red-100 text-red-600' : 'bg-orange-100 text-orange-600'}`}>
                              {alert.priority === 'high' ? 'P0 紧急' : 'P1 重要'}
                          </span>
                          <span className="text-xs text-gray-400">刚刚</span>
                      </div>
                      <p className="text-sm font-medium text-gray-800 dark:text-gray-200 mb-2">{alert.text}</p>
                      <div className="flex justify-end gap-2">
                          <button className="text-xs px-2 py-1 bg-gray-100 dark:bg-slate-700 text-gray-600 dark:text-gray-300 rounded hover:bg-gray-200">忽略</button>
                          <button className="text-xs px-2 py-1 bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400 rounded hover:bg-primary-100 font-medium">处理</button>
                      </div>
                  </div>
              ))}
          </div>
      </div>
      
      <AIAssistant context="quality_monitor" />
    </div>
  );
};

export default QualityMonitor;
