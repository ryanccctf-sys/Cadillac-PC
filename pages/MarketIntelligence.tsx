
import React, { useState } from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell,
  PieChart, Pie, Legend, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar
} from 'recharts';
import { 
  TrendingUp, 
  Search, 
  Download, 
  MessageCircle, 
  AlertTriangle, 
  ThumbsUp, 
  ThumbsDown,
  Cpu, 
  DollarSign, 
  Zap,
  Target,
  Share2,
  Box
} from 'lucide-react';
import AIAssistant from '../components/AIAssistant';

// --- Mock Data ---

// 1. Competitor Mention Share
const COMPETITOR_SHARE = [
  { name: '竞品A (新势力)', value: 45, color: '#8884d8' },
  { name: '竞品B (豪华品牌)', value: 30, color: '#82ca9d' },
  { name: '竞品C (传统合资)', value: 15, color: '#ffc658' },
  { name: '其他', value: 10, color: '#d1d5db' },
];

// 2. Competitor Sentiment Analysis
const COMPETITOR_SENTIMENT = [
  { name: '竞品A', positive: 20, negative: 45, neutral: 35 },
  { name: '竞品B', positive: 55, negative: 15, neutral: 30 },
  { name: '竞品C', positive: 10, negative: 60, neutral: 30 },
];

// 3. Product Complaints / Feedback (Top Issues)
const PRODUCT_ISSUES = [
  { name: '高速风噪大', count: 156, category: 'NVH', severity: 'High' },
  { name: '后排空间局促', count: 132, category: '空间', severity: 'Medium' },
  { name: '车机语音识别迟钝', count: 98, category: '智能化', severity: 'Medium' },
  { name: '内饰异味', count: 85, category: '品质', severity: 'Low' },
  { name: '续航打折', count: 145, category: '三电', severity: 'High' },
];

// 4. Tech & Price Perception Radar
const ATTRIBUTE_PERCEPTION = [
  { subject: '外观设计', A: 85, B: 70, fullMark: 100 },
  { subject: '智能驾驶', A: 65, B: 90, fullMark: 100 },
  { subject: '动力性能', A: 80, B: 85, fullMark: 100 },
  { subject: '内饰豪华', A: 75, B: 60, fullMark: 100 },
  { subject: '性价比', A: 90, B: 75, fullMark: 100 },
  { subject: '售后服务', A: 88, B: 65, fullMark: 100 },
  { subject: '续航能力', A: 70, B: 80, fullMark: 100 },
];

// 5. Intelligent Insights Cards
const INSIGHTS = [
  {
    id: 1,
    category: '竞品攻防',
    title: '竞品A 智驾功能对比高频出现',
    content: '本周有 45% 的客户在试驾环节主动提及“竞品A”的城市NOA功能。客户普遍认为竞品智驾体验更流畅，建议销售重点演示我方“自动泊车”及“车道保持”的稳定性。',
    type: 'warning'
  },
  {
    id: 2,
    category: '产品缺陷',
    title: 'Model Y "共振"问题反馈回升',
    content: '近3天关于“低频共振”的抱怨提及率上升 12%，主要集中在后排乘客。建议售后部门检查相关批次车辆的尾门胶条，并准备统一的话术安抚客户。',
    type: 'alert'
  },
  {
    id: 3,
    category: '价格敏感度',
    title: '促销政策对价格敏感型客户转化明显',
    content: '针对提及“价格贵”、“预算不足”的客户，在提及“5年0息”金融方案后，留资率提升了 28%。建议在初次报价时主动植入金融方案计算日供。',
    type: 'success'
  }
];

// --- Components ---

const InsightCard: React.FC<{ insight: typeof INSIGHTS[0] }> = ({ insight }) => (
  <div className={`p-5 rounded-xl border-l-4 shadow-sm bg-white dark:bg-slate-800 ${
    insight.type === 'warning' ? 'border-l-orange-500' :
    insight.type === 'alert' ? 'border-l-red-500' :
    'border-l-green-500'
  }`}>
    <div className="flex justify-between items-center mb-3">
      <span className={`px-2 py-1 rounded text-xs font-bold uppercase ${
         insight.type === 'warning' ? 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-300' :
         insight.type === 'alert' ? 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300' :
         'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300'
      }`}>
        {insight.category}
      </span>
      <span className="text-xs text-gray-400">AI 自动生成</span>
    </div>
    <h4 className="text-base font-bold text-gray-900 dark:text-white mb-2">{insight.title}</h4>
    <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed text-justify">
      {insight.content}
    </p>
  </div>
);

const MarketIntelligence: React.FC = () => {
  const [dateRange, setDateRange] = useState('本月');

  return (
    <div className="space-y-6 animate-fade-in pb-12 relative">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
            <Target className="text-primary-600" /> 市场与产品情报
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            基于会话挖掘的竞品对比、价格敏感度及产品反馈分析
          </p>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="flex bg-gray-100 dark:bg-slate-700 p-1 rounded-lg">
            {['本周', '本月', '本季度'].map(range => (
              <button 
                key={range}
                onClick={() => setDateRange(range)}
                className={`px-4 py-1.5 text-sm font-medium rounded-md transition-all ${dateRange === range ? 'bg-white dark:bg-slate-600 shadow-sm text-primary-600 dark:text-primary-400' : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'}`}
              >
                {range}
              </button>
            ))}
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-primary-600 text-white rounded-lg text-sm font-medium hover:bg-primary-700 transition-colors shadow-sm">
            <Download size={16} /> 导出简报
          </button>
        </div>
      </div>

      {/* 1. AI Insights Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {INSIGHTS.map(insight => (
          <InsightCard key={insight.id} insight={insight} />
        ))}
      </div>

      {/* 2. Competitor Analysis */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Share of Voice */}
        <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-700">
          <div className="flex justify-between items-center mb-6">
             <h3 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
               <Share2 className="text-blue-500" size={20} /> 竞品提及声量分布
             </h3>
          </div>
          <div className="flex items-center">
             <div className="h-64 w-1/2">
               <ResponsiveContainer width="100%" height="100%">
                 <PieChart>
                   <Pie 
                     data={COMPETITOR_SHARE} 
                     cx="50%" cy="50%" 
                     innerRadius={60} outerRadius={80} 
                     paddingAngle={5} 
                     dataKey="value"
                   >
                     {COMPETITOR_SHARE.map((entry, index) => (
                       <Cell key={`cell-${index}`} fill={entry.color} />
                     ))}
                   </Pie>
                   <Tooltip contentStyle={{borderRadius: '8px', border:'none', boxShadow:'0 4px 12px rgba(0,0,0,0.1)'}} />
                 </PieChart>
               </ResponsiveContainer>
             </div>
             <div className="w-1/2 space-y-4 pr-8">
                {COMPETITOR_SHARE.map((item, i) => (
                   <div key={i} className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                         <span className="w-3 h-3 rounded-full" style={{backgroundColor: item.color}}></span>
                         <span className="text-sm text-gray-700 dark:text-gray-300">{item.name}</span>
                      </div>
                      <span className="font-bold text-gray-900 dark:text-white">{item.value}%</span>
                   </div>
                ))}
                <div className="pt-4 border-t border-gray-100 dark:border-slate-700">
                   <p className="text-xs text-gray-500 leading-relaxed">
                      分析显示：<span className="font-bold text-gray-800 dark:text-white">竞品A</span> 是客户对比最多的对象，主要集中在<span className="text-blue-500">智能化</span>配置对比。
                   </p>
                </div>
             </div>
          </div>
        </div>

        {/* Competitor Sentiment */}
        <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-700">
          <div className="flex justify-between items-center mb-6">
             <h3 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
               <MessageCircle className="text-purple-500" size={20} /> 客户对竞品评价倾向
             </h3>
             <div className="flex gap-3 text-xs">
                <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-green-500"></span> 正向(认可)</span>
                <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-gray-300"></span> 中立</span>
                <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-red-500"></span> 负向(吐槽)</span>
             </div>
          </div>
          <div className="h-64">
             <ResponsiveContainer width="100%" height="100%">
                <BarChart data={COMPETITOR_SENTIMENT} layout="vertical" barSize={24}>
                   <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#f1f5f9" />
                   <XAxis type="number" hide />
                   <YAxis dataKey="name" type="category" width={60} axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} />
                   <Tooltip cursor={{fill: 'transparent'}} contentStyle={{borderRadius: '8px'}} />
                   <Bar dataKey="positive" stackId="a" fill="#10b981" radius={[0,0,0,0]} />
                   <Bar dataKey="neutral" stackId="a" fill="#cbd5e1" radius={[0,0,0,0]} />
                   <Bar dataKey="negative" stackId="a" fill="#ef4444" radius={[0,4,4,0]} />
                </BarChart>
             </ResponsiveContainer>
          </div>
          <p className="text-xs text-center text-gray-400 mt-2">
             数据来源于客户在对话中对竞品的评价语义分析
          </p>
        </div>
      </div>

      {/* 3. Product Feedback & Perception */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
         
         {/* Top Product Complaints */}
         <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-700">
            <div className="flex justify-between items-center mb-6">
               <h3 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
                 <AlertTriangle className="text-red-500" size={20} /> 产品高频抱怨/反馈 Top 5
               </h3>
            </div>
            <div className="space-y-4">
               {PRODUCT_ISSUES.map((issue, i) => (
                  <div key={i} className="flex items-center gap-4 p-2 hover:bg-gray-50 dark:hover:bg-slate-700/50 rounded-lg transition-colors">
                     <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center bg-gray-100 dark:bg-slate-700 rounded-lg text-sm font-bold text-gray-600 dark:text-gray-300">
                        {i + 1}
                     </div>
                     <div className="flex-1">
                        <div className="flex justify-between mb-1">
                           <span className="font-bold text-gray-800 dark:text-white text-sm">{issue.name}</span>
                           <span className="text-xs text-gray-500">{issue.count} 次提及</span>
                        </div>
                        <div className="w-full bg-gray-100 dark:bg-slate-700 h-1.5 rounded-full overflow-hidden">
                           <div className={`h-full rounded-full ${issue.severity === 'High' ? 'bg-red-500' : issue.severity === 'Medium' ? 'bg-orange-500' : 'bg-yellow-500'}`} style={{width: `${(issue.count / 200) * 100}%`}}></div>
                        </div>
                     </div>
                     <span className={`text-[10px] px-2 py-0.5 rounded font-medium whitespace-nowrap ${
                        issue.severity === 'High' ? 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300' : 
                        issue.severity === 'Medium' ? 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-300' : 
                        'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300'
                     }`}>
                        {issue.category}
                     </span>
                  </div>
               ))}
            </div>
         </div>

         {/* Perception Radar */}
         <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-700">
            <div className="flex justify-between items-center mb-4">
               <h3 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
                 <Box className="text-indigo-500" size={20} /> 客户认知雷达 (本品 vs 竞品A)
               </h3>
            </div>
            <div className="h-72 w-full">
               <ResponsiveContainer width="100%" height="100%">
                  <RadarChart cx="50%" cy="50%" outerRadius="75%" data={ATTRIBUTE_PERCEPTION}>
                     <PolarGrid stroke="#e2e8f0" />
                     <PolarAngleAxis dataKey="subject" tick={{ fill: '#64748b', fontSize: 12 }} />
                     <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                     <Radar name="本品认知" dataKey="A" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.4} />
                     <Radar name="竞品A认知" dataKey="B" stroke="#f97316" fill="#f97316" fillOpacity={0.4} />
                     <Legend />
                     <Tooltip contentStyle={{borderRadius: '8px'}} />
                  </RadarChart>
               </ResponsiveContainer>
            </div>
            <div className="mt-2 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg text-xs text-blue-700 dark:text-blue-300 leading-relaxed border border-blue-100 dark:border-blue-900/30">
               <span className="font-bold">优势点：</span>在“性价比”与“售后服务”维度领先竞品；<br/>
               <span className="font-bold text-orange-600 dark:text-orange-400">劣势点：</span>在“智能驾驶”领域认知度显著低于竞品A，需加强试驾体验引导。
            </div>
         </div>

      </div>

      {/* 4. Price & Tech Keywords Cloud (Simulated with Tags) */}
      <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-700">
         <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
            <Zap className="text-yellow-500" size={20} /> 价格与技术高频热词
         </h3>
         <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
               <h4 className="text-sm font-bold text-gray-500 mb-3 flex items-center gap-2"><DollarSign size={14}/> 价格相关</h4>
               <div className="flex flex-wrap gap-3">
                  {['首付比例', '置换补贴', '免息政策', '落地价', '保险费用', '隐形消费', '保值率', '大客户优惠', '选装包价格'].map((tag, i) => (
                     <span key={i} className="px-3 py-1.5 bg-green-50 dark:bg-green-900/10 text-green-700 dark:text-green-300 rounded-lg text-sm border border-green-100 dark:border-green-900/20 font-medium">
                        {tag}
                     </span>
                  ))}
               </div>
            </div>
            <div>
               <h4 className="text-sm font-bold text-gray-500 mb-3 flex items-center gap-2"><Cpu size={14}/> 技术/配置相关</h4>
               <div className="flex flex-wrap gap-3">
                  {['城市NOA', '800V快充', '激光雷达', '座椅通风', 'HUD抬头显示', '热泵空调', '零百加速', 'CDC悬架', '车机芯片'].map((tag, i) => (
                     <span key={i} className="px-3 py-1.5 bg-blue-50 dark:bg-blue-900/10 text-blue-700 dark:text-blue-300 rounded-lg text-sm border border-blue-100 dark:border-blue-900/20 font-medium">
                        {tag}
                     </span>
                  ))}
               </div>
            </div>
         </div>
      </div>

      <AIAssistant context="dashboard" />
    </div>
  );
};

export default MarketIntelligence;
