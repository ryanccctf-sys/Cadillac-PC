
import React, { useState } from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell,
  PieChart, Pie, Legend, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar
} from 'recharts';
import { 
  Target, 
  Share2, 
  MessageCircle, 
  Box, 
  Zap, 
  DollarSign, 
  Cpu, 
  Wrench, 
  AlertTriangle, 
  Lightbulb, 
  Layers, 
  Download,
  Search,
  ArrowUpRight
} from 'lucide-react';
import AIAssistant from '../components/AIAssistant';

// --- Mock Data ---

// Tab 1: Competitor Intelligence
const COMPETITOR_SHARE = [
  { name: '竞品A (新势力)', value: 42, color: '#8b5cf6' },
  { name: '竞品B (豪华品牌)', value: 28, color: '#3b82f6' },
  { name: '竞品C (传统合资)', value: 18, color: '#f59e0b' },
  { name: '其他', value: 12, color: '#94a3b8' },
];

const COMPETITOR_SENTIMENT = [
  { name: '竞品A', positive: 25, negative: 40, neutral: 35 },
  { name: '竞品B', positive: 50, negative: 20, neutral: 30 },
  { name: '竞品C', positive: 15, negative: 55, neutral: 30 },
];

const ATTRIBUTE_PERCEPTION = [
  { subject: '外观设计', Us: 85, Them: 75, fullMark: 100 },
  { subject: '智能驾驶', Us: 70, Them: 90, fullMark: 100 },
  { subject: '动力性能', Us: 82, Them: 80, fullMark: 100 },
  { subject: '内饰豪华', Us: 75, Them: 65, fullMark: 100 },
  { subject: '性价比', Us: 88, Them: 70, fullMark: 100 },
  { subject: '售后服务', Us: 90, Them: 60, fullMark: 100 },
];

const TECH_PRICE_KEYWORDS = [
  { text: '城市NOA', count: 156, category: 'tech' },
  { text: '800V快充', count: 132, category: 'tech' },
  { text: '首付比例', count: 98, category: 'price' },
  { text: '置换补贴', count: 85, category: 'price' },
  { text: '激光雷达', count: 76, category: 'tech' },
  { text: '免息政策', count: 65, category: 'price' },
  { text: '保值率', count: 54, category: 'price' },
  { text: 'HUD抬头显示', count: 45, category: 'tech' },
];

// Tab 2: Product Defects & Suggestions
const PRODUCT_COMPLAINTS = [
  { name: '高速风噪大', count: 185, severity: 'High', trend: '+12%' },
  { name: '后排空间局促', count: 142, severity: 'Medium', trend: '+5%' },
  { name: '语音识别迟钝', count: 110, severity: 'Medium', trend: '-2%' },
  { name: '新车内饰异味', count: 95, severity: 'Low', trend: '-8%' },
  { name: '实际续航打折', count: 88, severity: 'High', trend: '+3%' },
];

const FEATURE_SUGGESTIONS = [
  { id: 1, title: '希望增加座椅按摩功能', count: 128, type: '舒适性', status: '评估中' },
  { id: 2, title: '建议车机支持CarPlay/HiCar', count: 105, type: '智能化', status: '已规划' },
  { id: 3, title: '后排增加Type-C充电口', count: 86, type: '便利性', status: '开发中' },
  { id: 4, title: '增加实体空调按键', count: 64, type: '操控', status: '驳回' },
  { id: 5, title: '哨兵模式耗电优化', count: 52, type: '三电', status: '评估中' },
];

// Insights Logic
const INSIGHTS = [
  {
    id: 1,
    title: '竞品攻防警报',
    content: '竞品A的“城市NOA”功能提及率本周上升 15%，客户普遍认为其体验优于我方。建议加强试驾环节的自动泊车演示以建立信心。',
    type: 'warning',
    tab: 'competitor'
  },
  {
    id: 2,
    title: '产品质量预警',
    content: '关于“高速风噪”的投诉集中在 Model Y 车型，主要来自 100km/h 以上场景。建议售后部门检查密封条批次质量。',
    type: 'alert',
    tab: 'product'
  },
  {
    id: 3,
    title: '价格策略机会',
    content: '对价格敏感的客户在提及“5年0息”政策后，留资转化率提升 25%。建议在初次报价时主动植入金融方案。',
    type: 'success',
    tab: 'competitor'
  },
  {
    id: 4,
    title: '热门功能呼声',
    content: '超过 30% 的家庭用户希望后排增加娱乐屏，主要用于孩子观看动画片。建议精品部门开发后装挂屏配件。',
    type: 'info',
    tab: 'product'
  }
];

// --- Components ---

const InsightCard: React.FC<{ insight: typeof INSIGHTS[0] }> = ({ insight }) => (
  <div className={`p-5 rounded-xl border-l-4 shadow-sm bg-white dark:bg-slate-800 flex flex-col h-full ${
    insight.type === 'warning' ? 'border-l-orange-500' :
    insight.type === 'alert' ? 'border-l-red-500' :
    insight.type === 'info' ? 'border-l-blue-500' :
    'border-l-green-500'
  }`}>
    <div className="flex justify-between items-center mb-3">
      <span className={`px-2 py-1 rounded text-xs font-bold uppercase ${
         insight.type === 'warning' ? 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-300' :
         insight.type === 'alert' ? 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300' :
         insight.type === 'info' ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300' :
         'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300'
      }`}>
        {insight.title}
      </span>
      <span className="text-xs text-gray-400">AI 智能分析</span>
    </div>
    <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed text-justify flex-1">
      {insight.content}
    </p>
  </div>
);

const MarketIntelligenceV2: React.FC = () => {
  const [dateRange, setDateRange] = useState('本月');
  const [activeTab, setActiveTab] = useState<'competitor' | 'product'>('competitor');

  const filteredInsights = INSIGHTS.filter(i => i.tab === activeTab);

  return (
    <div className="space-y-6 animate-fade-in pb-12 relative">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
            <Target className="text-primary-600" /> 市场与产品情报
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            基于全量会话挖掘的竞品攻防态势与产品改进建议
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
            <Download size={16} /> 导出报表
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200 dark:border-slate-700 flex gap-8">
        <button
          onClick={() => setActiveTab('competitor')}
          className={`pb-4 text-sm font-bold transition-all relative ${
            activeTab === 'competitor' 
              ? 'text-primary-600 dark:text-primary-400' 
              : 'text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'
          }`}
        >
          <span className="flex items-center gap-2">
            <Share2 size={18} /> 竞品情报分析
          </span>
          {activeTab === 'competitor' && <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary-600 dark:bg-primary-400 rounded-t-full"></span>}
        </button>
        <button
          onClick={() => setActiveTab('product')}
          className={`pb-4 text-sm font-bold transition-all relative ${
            activeTab === 'product' 
              ? 'text-primary-600 dark:text-primary-400' 
              : 'text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'
          }`}
        >
          <span className="flex items-center gap-2">
            <Wrench size={18} /> 产品缺陷与建议
          </span>
          {activeTab === 'product' && <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary-600 dark:bg-primary-400 rounded-t-full"></span>}
        </button>
      </div>

      {/* AI Insights Section (Context Aware) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredInsights.map(insight => (
          <InsightCard key={insight.id} insight={insight} />
        ))}
      </div>

      {/* === TAB 1: COMPETITOR INTELLIGENCE === */}
      {activeTab === 'competitor' && (
        <div className="space-y-6 animate-fade-in">
          {/* Row 1: Share & Sentiment */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Share of Voice */}
            <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-700">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2 mb-6">
                <Share2 className="text-blue-500" size={20} /> 竞品提及声量分布
              </h3>
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
                 </div>
              </div>
            </div>

            {/* Sentiment Analysis */}
            <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-700">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2 mb-6">
                <MessageCircle className="text-purple-500" size={20} /> 竞品口碑情感分析
              </h3>
              <div className="h-64">
                 <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={COMPETITOR_SENTIMENT} layout="vertical" barSize={24}>
                       <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#f1f5f9" />
                       <XAxis type="number" hide />
                       <YAxis dataKey="name" type="category" width={60} axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} />
                       <Tooltip cursor={{fill: 'transparent'}} contentStyle={{borderRadius: '8px'}} />
                       <Bar dataKey="positive" stackId="a" fill="#10b981" name="正面" />
                       <Bar dataKey="neutral" stackId="a" fill="#cbd5e1" name="中性" />
                       <Bar dataKey="negative" stackId="a" fill="#ef4444" name="负面" radius={[0, 4, 4, 0]} />
                       <Legend wrapperStyle={{ fontSize: '12px' }}/>
                    </BarChart>
                 </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* Row 2: Radar & Keywords */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
             <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-700">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2 mb-4">
                   <Box className="text-indigo-500" size={20} /> 客户认知对比 (我品 vs 竞品A)
                </h3>
                <div className="h-72 w-full">
                   <ResponsiveContainer width="100%" height="100%">
                      <RadarChart cx="50%" cy="50%" outerRadius="80%" data={ATTRIBUTE_PERCEPTION}>
                         <PolarGrid stroke="#e2e8f0" />
                         <PolarAngleAxis dataKey="subject" tick={{ fill: '#64748b', fontSize: 12 }} />
                         <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                         <Radar name="我方产品" dataKey="Us" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.4} />
                         <Radar name="竞品A" dataKey="Them" stroke="#8b5cf6" fill="#8b5cf6" fillOpacity={0.4} />
                         <Legend />
                         <Tooltip contentStyle={{borderRadius: '8px'}} />
                      </RadarChart>
                   </ResponsiveContainer>
                </div>
             </div>

             <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-700">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2 mb-6">
                   <Zap className="text-yellow-500" size={20} /> 决策关键热词
                </h3>
                <div className="flex flex-wrap gap-3">
                   {TECH_PRICE_KEYWORDS.map((kw, i) => (
                      <span 
                        key={i} 
                        className={`px-3 py-1.5 rounded-lg text-sm font-medium border ${
                           kw.category === 'tech' 
                             ? 'bg-blue-50 dark:bg-blue-900/10 text-blue-700 dark:text-blue-300 border-blue-100 dark:border-blue-900/20' 
                             : 'bg-green-50 dark:bg-green-900/10 text-green-700 dark:text-green-300 border-green-100 dark:border-green-900/20'
                        }`}
                      >
                         {kw.category === 'tech' ? <Cpu size={14} className="inline mr-1"/> : <DollarSign size={14} className="inline mr-1"/>}
                         {kw.text} <span className="opacity-60 text-xs ml-1">{kw.count}</span>
                      </span>
                   ))}
                </div>
                <div className="mt-6 p-4 bg-gray-50 dark:bg-slate-700/30 rounded-xl text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                   <Lightbulb size={16} className="inline mr-1" />
                   AI 建议：<br/>
                   鉴于客户对<span className="font-bold text-blue-600 dark:text-blue-400">“城市NOA”</span>和<span className="font-bold text-green-600 dark:text-green-400">“置换补贴”</span>的高频关注，建议在下一轮话术优化中，将这两个卖点的前置提及顺位提升。
                </div>
             </div>
          </div>
        </div>
      )}

      {/* === TAB 2: PRODUCT & SUGGESTIONS === */}
      {activeTab === 'product' && (
        <div className="space-y-6 animate-fade-in">
           {/* Row 1: Complaints & Suggestions */}
           <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-700">
                 <h3 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2 mb-6">
                    <AlertTriangle className="text-red-500" size={20} /> 产品抱怨 Top 5
                 </h3>
                 <div className="space-y-4">
                    {PRODUCT_COMPLAINTS.map((item, i) => (
                       <div key={i} className="flex items-center gap-4 p-3 hover:bg-gray-50 dark:hover:bg-slate-700/50 rounded-lg transition-colors border border-transparent hover:border-gray-100 dark:hover:border-slate-600">
                          <div className="flex-1">
                             <div className="flex justify-between mb-1">
                                <span className="font-bold text-gray-800 dark:text-white text-sm">{item.name}</span>
                                <span className={`text-xs font-bold ${item.trend.startsWith('+') ? 'text-red-500' : 'text-green-500'}`}>{item.trend}</span>
                             </div>
                             <div className="w-full bg-gray-100 dark:bg-slate-700 h-1.5 rounded-full overflow-hidden">
                                <div className={`h-full rounded-full ${item.severity === 'High' ? 'bg-red-500' : item.severity === 'Medium' ? 'bg-orange-500' : 'bg-yellow-500'}`} style={{width: `${(item.count / 200) * 100}%`}}></div>
                             </div>
                          </div>
                          <span className="text-xs text-gray-500 w-16 text-right">{item.count} 例</span>
                       </div>
                    ))}
                 </div>
              </div>

              <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-700">
                 <h3 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2 mb-6">
                    <Lightbulb className="text-yellow-500" size={20} /> 用户功能建议 Top 5
                 </h3>
                 <div className="space-y-4">
                    {FEATURE_SUGGESTIONS.map((item) => (
                       <div key={item.id} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-slate-700/30 rounded-lg border border-gray-100 dark:border-slate-700">
                          <div className="flex items-center gap-3">
                             <span className="w-6 h-6 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400 text-xs font-bold">{item.id}</span>
                             <div>
                                <p className="text-sm font-bold text-gray-800 dark:text-white">{item.title}</p>
                                <p className="text-xs text-gray-500">{item.type} · {item.count}人支持</p>
                             </div>
                          </div>
                          <span className={`text-[10px] px-2 py-1 rounded border ${
                             item.status === '已规划' ? 'bg-green-50 text-green-600 border-green-200 dark:bg-green-900/20 dark:border-green-800' :
                             item.status === '评估中' ? 'bg-blue-50 text-blue-600 border-blue-200 dark:bg-blue-900/20 dark:border-blue-800' :
                             item.status === '开发中' ? 'bg-purple-50 text-purple-600 border-purple-200 dark:bg-purple-900/20 dark:border-purple-800' :
                             'bg-gray-50 text-gray-500 border-gray-200 dark:bg-slate-800 dark:border-slate-600'
                          }`}>
                             {item.status}
                          </span>
                       </div>
                    ))}
                 </div>
              </div>
           </div>
        </div>
      )}

      <AIAssistant context="dashboard" />
    </div>
  );
};

export default MarketIntelligenceV2;
