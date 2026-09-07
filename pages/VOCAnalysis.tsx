import React, { useState } from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell,
  PieChart, Pie, Legend, RadialBarChart, RadialBar, LineChart, Line
} from 'recharts';
import { 
  Filter, 
  Download, 
  Smile, 
  Meh, 
  Frown, 
  AlertTriangle, 
  TrendingUp, 
  TrendingDown,
  MessageSquare,
  Clock,
  AlertOctagon,
  CheckCircle2,
  BookOpen,
  Zap,
  Target,
  Users
} from 'lucide-react';
import AIAssistant from '../components/AIAssistant';

// --- Mock Data ---

// 1. Executive Summary Data
const SENTIMENT_TREND = [
  { date: '10-20', score: 72 },
  { date: '10-21', score: 75 },
  { date: '10-22', score: 71 },
  { date: '10-23', score: 78 },
  { date: '10-24', score: 82 },
  { date: '10-25', score: 80 },
  { date: '10-26', score: 85 },
];

// 2. Pain Points - Top Topics
const TOP_TOPICS = [
  { name: '交车时间', count: 125, sentiment: 20 }, // Low sentiment
  { name: '价格优惠', count: 98, sentiment: 35 },
  { name: '金融利率', count: 85, sentiment: 45 },
  { name: '内饰气味', count: 62, sentiment: 15 },
  { name: '试驾排队', count: 55, sentiment: 30 },
];

// 3. Competitor Mentions
const COMPETITOR_MENTIONS = [
  { name: '竞品A (新势力)', count: 42, focus: '智驾/大屏' },
  { name: '竞品B (豪华)', count: 28, focus: '品牌/内饰' },
  { name: '竞品C (合资)', count: 15, focus: '价格/维修' },
];

// 4. Conversion Signals
const CONVERSION_DATA = [
  { name: '强购买意向', value: 35, color: '#10b981' }, // Green
  { name: '强流失风险', value: 15, color: '#ef4444' }, // Red
  { name: '观望/中立', value: 50, color: '#94a3b8' }, // Gray
];

// 5. Process Compliance
const PROCESS_COMPLIANCE = [
  { name: '价格透明度', value: 92, fill: '#6366f1' },
  { name: '产品关键点', value: 78, fill: '#8b5cf6' },
  { name: '增值服务', value: 65, fill: '#ec4899' },
];

// 6. Waiting Perception
const WAITING_COMPLAINTS = [
  { stage: '等待试驾', count: 12 },
  { stage: '等待报价', count: 5 },
  { stage: '等待交车', count: 22 },
  { stage: '等待接待', count: 8 },
];

// 7. Action Lists
const HIGH_RISK_LIST = [
  { id: 1, customer: '张先生 (C-102)', issue: '多次抱怨交车延期，提及退订', time: '10:30', level: 'High' },
  { id: 2, customer: '李女士 (C-156)', issue: '对隐形消费非常不满，情绪激动', time: '11:15', level: 'High' },
  { id: 3, customer: '赵先生 (C-208)', issue: '竞品对比时被顾问言语冒犯', time: '14:20', level: 'Medium' },
];

const BEST_PRACTICES = [
  { id: 1, title: '价格异议处理范本', desc: '王金牌在面对Model Y降价冲击时，成功用“保值回购协议”化解客户焦虑。' },
  { id: 2, title: '试驾排队安抚话术', desc: '李进取在客户等待试驾30分钟期间，通过深度讲解静态展车留住客户。' },
];

const TRAINING_SUGGESTIONS = [
  { topic: '金融方案介绍', reason: '增值服务推荐率仅65%，低于基准线' },
  { topic: '交车延期话术', reason: '交车等待抱怨占比最高，需统一安抚口径' },
];

// --- Components ---

const DashboardCard = ({ title, value, subValue, trend, icon: Icon, color }: any) => (
  <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-700 flex flex-col justify-between">
    <div className="flex justify-between items-start mb-4">
      <div>
        <p className="text-gray-500 dark:text-gray-400 text-sm font-medium mb-1">{title}</p>
        <h3 className="text-3xl font-bold text-gray-900 dark:text-white">{value}</h3>
      </div>
      <div className={`p-3 rounded-xl ${color.bg} ${color.text}`}>
        <Icon size={24} />
      </div>
    </div>
    <div className="flex items-center gap-2">
      {trend && (
        <span className={`flex items-center text-sm font-bold ${trend > 0 ? 'text-green-500' : 'text-red-500'}`}>
          {trend > 0 ? <TrendingUp size={16} className="mr-1" /> : <TrendingDown size={16} className="mr-1" />}
          {Math.abs(trend)}%
        </span>
      )}
      <span className="text-xs text-gray-400">{subValue}</span>
    </div>
  </div>
);

const VOCAnalysis: React.FC = () => {
  const [dateRange, setDateRange] = useState('本周');
  const [selectedModel, setSelectedModel] = useState('全部车型');

  return (
    <div className="space-y-6 animate-fade-in pb-12 relative">
      {/* Header & Filters */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">VOC 客户之声分析</h2>
          <p className="text-sm text-gray-500 mt-1">基于全量会话数据的深度业务洞察</p>
        </div>
        
        <div className="flex flex-wrap gap-3">
           <select 
             value={selectedModel}
             onChange={(e) => setSelectedModel(e.target.value)}
             className="px-3 py-2 bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-lg text-sm outline-none focus:ring-2 focus:ring-primary-500 dark:text-white cursor-pointer"
           >
             <option>全部车型</option>
             <option>Model 3</option>
             <option>Model Y</option>
             <option>CT5</option>
             <option>ET5</option>
           </select>

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

          <button className="flex items-center gap-2 px-4 py-2 bg-primary-600 text-white rounded-lg text-sm font-medium hover:bg-primary-700 transition-colors shadow-sm">
            <Download size={16} /> 导出报告
          </button>
        </div>
      </div>

      {/* 1. Executive Summary Dashboard */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <DashboardCard 
          title="核心情绪得分" 
          value="85.4" 
          subValue="较上周期" 
          trend={3.2} 
          icon={Smile} 
          color={{ bg: 'bg-green-100 dark:bg-green-900/30', text: 'text-green-600 dark:text-green-400' }} 
        />
        <DashboardCard 
          title="高风险预警会话" 
          value="12" 
          subValue="待处理事项" 
          trend={-5.0} 
          icon={AlertTriangle} 
          color={{ bg: 'bg-red-100 dark:bg-red-900/30', text: 'text-red-600 dark:text-red-400' }} 
        />
        <DashboardCard 
          title="预测服务满意度" 
          value="4.8/5" 
          subValue="基于AI预测" 
          trend={1.5} 
          icon={Target} 
          color={{ bg: 'bg-blue-100 dark:bg-blue-900/30', text: 'text-blue-600 dark:text-blue-400' }} 
        />
      </div>

      {/* 2. Customer Pain Points & Demands */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Topic Ranking */}
        <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-700">
           <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
             <MessageSquare className="text-indigo-500" size={20} /> 核心负面话题热度 (Top 5)
           </h3>
           <div className="space-y-4">
             {TOP_TOPICS.map((topic, i) => (
               <div key={i}>
                 <div className="flex justify-between items-center mb-1">
                   <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{topic.name}</span>
                   <span className="text-xs text-gray-400">提及 {topic.count} 次</span>
                 </div>
                 <div className="flex items-center gap-3">
                   <div className="flex-1 bg-gray-100 dark:bg-slate-700 h-2 rounded-full overflow-hidden">
                     <div className="h-full bg-indigo-500" style={{width: `${(topic.count / 150) * 100}%`}}></div>
                   </div>
                   <span className={`text-xs font-bold px-1.5 py-0.5 rounded ${topic.sentiment < 30 ? 'bg-red-100 text-red-600' : 'bg-orange-100 text-orange-600'}`}>
                     {topic.sentiment}分
                   </span>
                 </div>
               </div>
             ))}
           </div>
        </div>

        {/* Competitor Analysis & Conversion */}
        <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-700 flex flex-col">
           <div className="grid grid-cols-1 md:grid-cols-2 gap-6 h-full">
             
             {/* Competitors */}
             <div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                  <AlertOctagon className="text-orange-500" size={20} /> 竞品提及分析
                </h3>
                <div className="space-y-4">
                  {COMPETITOR_MENTIONS.map((comp, i) => (
                    <div key={i} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-slate-700/50 rounded-lg">
                       <div>
                          <p className="text-sm font-bold text-gray-800 dark:text-white">{comp.name}</p>
                          <p className="text-xs text-gray-500">主要对比: {comp.focus}</p>
                       </div>
                       <div className="text-right">
                          <p className="text-lg font-bold text-indigo-600 dark:text-indigo-400">{comp.count}</p>
                          <p className="text-[10px] text-gray-400">次</p>
                       </div>
                    </div>
                  ))}
                </div>
             </div>

             {/* Conversion Signals */}
             <div className="flex flex-col">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                  <Zap className="text-yellow-500" size={20} /> 购买/流失信号
                </h3>
                <div className="flex-1 flex items-center justify-center relative">
                   <ResponsiveContainer width="100%" height={160}>
                     <PieChart>
                       <Pie 
                         data={CONVERSION_DATA} 
                         cx="50%" cy="50%" 
                         innerRadius={40} outerRadius={60} 
                         paddingAngle={5} 
                         dataKey="value"
                       >
                         {CONVERSION_DATA.map((entry, index) => (
                           <Cell key={`cell-${index}`} fill={entry.color} />
                         ))}
                       </Pie>
                       <Tooltip />
                     </PieChart>
                   </ResponsiveContainer>
                   <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                      <span className="text-xs text-gray-400">转化意向</span>
                   </div>
                </div>
                <div className="space-y-2 mt-2">
                  {CONVERSION_DATA.map((item, i) => (
                    <div key={i} className="flex items-center justify-between text-xs">
                       <div className="flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full" style={{backgroundColor: item.color}}></span>
                          <span className="text-gray-600 dark:text-gray-300">{item.name}</span>
                       </div>
                       <span className="font-bold">{item.value}%</span>
                    </div>
                  ))}
                </div>
             </div>

           </div>
        </div>
      </div>

      {/* 3. Process & Compliance */}
      <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-700">
         <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
           <CheckCircle2 className="text-green-500" size={20} /> 业务流程规范执行洞察
         </h3>
         
         <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Compliance Rates */}
            <div className="space-y-6">
               <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-4">关键流程达标率</h4>
               {PROCESS_COMPLIANCE.map((item, i) => (
                 <div key={i}>
                    <div className="flex justify-between text-sm mb-1">
                       <span className="text-gray-600 dark:text-gray-400">{item.name}</span>
                       <span className="font-bold text-gray-900 dark:text-white">{item.value}%</span>
                    </div>
                    <div className="w-full bg-gray-100 dark:bg-slate-700 h-2.5 rounded-full overflow-hidden">
                       <div className="h-full rounded-full transition-all duration-1000" style={{width: `${item.value}%`, backgroundColor: item.fill}}></div>
                    </div>
                 </div>
               ))}
            </div>

            {/* Waiting Perception */}
            <div>
               <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-4">客户等待抱怨分布</h4>
               <div className="h-48">
                 <ResponsiveContainer width="100%" height="100%">
                   <BarChart data={WAITING_COMPLAINTS} layout="vertical">
                     <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#e2e8f0" />
                     <XAxis type="number" hide />
                     <YAxis dataKey="stage" type="category" width={70} axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#64748b'}} />
                     <Tooltip cursor={{fill: 'rgba(239, 68, 68, 0.1)'}} contentStyle={{borderRadius: '8px'}} />
                     <Bar dataKey="count" fill="#ef4444" radius={[0, 4, 4, 0]} barSize={20} label={{ position: 'right', fill: '#ef4444', fontSize: 12 }} />
                   </BarChart>
                 </ResponsiveContainer>
               </div>
            </div>

            {/* Staff Communication Deviation */}
            <div className="flex flex-col justify-between">
               <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-4">员工沟通行为偏差</h4>
               <div className="grid grid-cols-2 gap-4">
                  <div className="bg-orange-50 dark:bg-orange-900/10 p-4 rounded-xl border border-orange-100 dark:border-orange-900/20 text-center">
                     <div className="text-2xl font-bold text-orange-600 dark:text-orange-400 mb-1">2.4次</div>
                     <div className="text-xs text-orange-500">平均打断客户/会话</div>
                  </div>
                  <div className="bg-red-50 dark:bg-red-900/10 p-4 rounded-xl border border-red-100 dark:border-red-900/20 text-center">
                     <div className="text-2xl font-bold text-red-600 dark:text-red-400 mb-1">8.5%</div>
                     <div className="text-xs text-red-500">使用禁用语占比</div>
                  </div>
               </div>
               <div className="mt-4 p-3 bg-gray-50 dark:bg-slate-700/50 rounded-lg text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
                  提示：打断客户次数较高主要集中在“需求分析”环节，建议加强倾听技巧培训。
               </div>
            </div>
         </div>
      </div>

      {/* 4. Actionable Recommendations */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
         
         {/* High Risk List */}
         <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-700">
            <div className="flex justify-between items-center mb-4">
               <h3 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
                 <AlertTriangle className="text-red-500" size={20} /> 待处理高风险列表
               </h3>
               <button className="text-xs text-primary-600 hover:underline">查看全部</button>
            </div>
            <div className="space-y-3">
               {HIGH_RISK_LIST.map((item) => (
                  <div key={item.id} className="p-3 bg-red-50 dark:bg-red-900/10 rounded-lg border border-red-100 dark:border-red-900/20">
                     <div className="flex justify-between mb-1">
                        <span className="text-xs font-bold text-gray-800 dark:text-white">{item.customer}</span>
                        <span className="text-[10px] text-red-500 bg-white dark:bg-slate-800 px-1.5 py-0.5 rounded border border-red-200 dark:border-red-800">{item.level}</span>
                     </div>
                     <p className="text-xs text-gray-600 dark:text-gray-300 line-clamp-2">{item.issue}</p>
                     <div className="mt-2 flex justify-between items-center">
                        <span className="text-[10px] text-gray-400 flex items-center gap-1"><Clock size={10} /> {item.time}</span>
                        <button className="text-[10px] bg-red-600 text-white px-2 py-1 rounded hover:bg-red-700">立即处理</button>
                     </div>
                  </div>
               ))}
            </div>
         </div>

         {/* Best Practices */}
         <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-700">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
               <BookOpen className="text-green-500" size={20} /> 最佳实践会话库
            </h3>
            <div className="space-y-3">
               {BEST_PRACTICES.map((item) => (
                  <div key={item.id} className="p-3 bg-green-50 dark:bg-green-900/10 rounded-lg border border-green-100 dark:border-green-900/20">
                     <h4 className="text-sm font-bold text-green-800 dark:text-green-300 mb-1">{item.title}</h4>
                     <p className="text-xs text-gray-600 dark:text-gray-300 leading-relaxed">{item.desc}</p>
                     <button className="mt-2 text-xs text-green-600 dark:text-green-400 font-medium hover:underline flex items-center gap-1">
                        查看详情 <Users size={12} />
                     </button>
                  </div>
               ))}
            </div>
         </div>

         {/* Training Focus */}
         <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-700">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
               <Target className="text-blue-500" size={20} /> 培训侧重建议
            </h3>
            <div className="space-y-4">
               {TRAINING_SUGGESTIONS.map((item, i) => (
                  <div key={i} className="flex gap-3">
                     <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400 font-bold text-sm">
                        {i + 1}
                     </div>
                     <div>
                        <h4 className="text-sm font-bold text-gray-900 dark:text-white mb-1">{item.topic}</h4>
                        <p className="text-xs text-gray-500 dark:text-gray-400">{item.reason}</p>
                     </div>
                  </div>
               ))}
               <div className="mt-6 pt-4 border-t border-gray-100 dark:border-slate-700">
                  <button className="w-full py-2 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded-lg text-sm font-medium hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors">
                     生成专项培训计划
                  </button>
               </div>
            </div>
         </div>

      </div>

      <AIAssistant context="dashboard" />
    </div>
  );
};

export default VOCAnalysis;