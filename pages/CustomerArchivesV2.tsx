
import React, { useState } from 'react';
import { 
  Search, 
  Filter, 
  ArrowLeft,
  User,
  Phone,
  MapPin,
  Calendar,
  Clock,
  MessageCircle,
  Star,
  CheckCircle2,
  FileText,
  Briefcase,
  ChevronRight,
  Zap,
  Mic,
  MoreHorizontal,
  PlayCircle,
  Download,
  Edit3,
  Plus,
  LayoutDashboard,
  List,
  TrendingUp,
  AlertTriangle,
  ThumbsUp,
  Target,
  Users,
  PieChart as PieChartIcon,
  Shield, 
  Key, 
  Crown,
  Sparkles,
  Bot,
  BrainCircuit,
  Lightbulb,
  X,
  Info
} from 'lucide-react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell,
  PieChart, Pie, AreaChart, Area, Legend, Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis
} from 'recharts';
import AIAssistant from '../components/AIAssistant';

// --- Types & Interfaces ---

type LifeCycleStage = 'Invite' | 'Showroom' | 'TestDrive' | 'Negotiation';

interface CustomerDetail {
  id: string;
  name: string;
  phone: string;
  lifeCycle: LifeCycleStage;
  budget: string;
  intendedModel: string;
  brandPreference: string;
  ageGroup: string;
  gender: 'Male' | 'Female';
  firstVisitDate: string;
  occupation: string;
  lastFollowUp: string;
  advisor: string;
  purchasePurpose: string;
  predictionScore: number;
  estimatedDealTime: string;
  level: 'H' | 'A' | 'B' | 'C';
  nextStep: string;
  address: string;
  riskTags: string[];
  copingStrategy: string;
  tradeIn: string;
  
  // Interaction Data
  interactionStats: {
    totalVisits: number;
    frequency: string;
    turns: number;
    avgDuration: string;
    totalDuration: string;
    salesTalkRatio: string;
  };
}

// --- Mock Data ---

const generateMockCustomers = (): CustomerDetail[] => {
  const advisors = ['王金牌', '李进取', '张新人'];
  const models = ['CT5', 'Model 3', 'ET5', 'Model Y'];
  const stages: LifeCycleStage[] = ['Invite', 'Showroom', 'TestDrive', 'Negotiation'];
  
  return Array.from({ length: 15 }).map((_, index) => {
    const idNum = index + 1;
    const stage = stages[index % 4];
    const scoreBase = stage === 'Negotiation' ? 80 : stage === 'TestDrive' ? 60 : stage === 'Showroom' ? 40 : 20;
    const score = Math.min(99, scoreBase + Math.floor(Math.random() * 20));
    
    return {
      id: `C-2023${idNum.toString().padStart(4, '0')}`,
      name: ['王泽祥', '李娜', '张强', '刘洋', '陈静', '赵杰', '孙丽', '周明', '吴芳', '郑勇', '林涛', '何萍', '马超', '宋雨', '高山'][index],
      phone: `177****${7777 + index}`,
      lifeCycle: stage,
      budget: ['20万~25万', '25-30万', '30-35万'][index % 3],
      intendedModel: models[index % 4],
      brandPreference: '凯迪拉克',
      ageGroup: '28',
      gender: 'Male',
      firstVisitDate: `2023.03.05`,
      occupation: '未知',
      lastFollowUp: '1天前',
      advisor: advisors[index % 3],
      purchasePurpose: '家用/代步',
      predictionScore: score,
      estimatedDealTime: '1周内',
      level: 'H',
      nextStep: '家人&竞品比较',
      address: '上海市杨浦区',
      riskTags: ['价格敏感', '反复询问优惠'],
      copingStrategy: '制作竞品配置对比表突出安全/科技优势，推出保价协议+0息金融方案。',
      tradeIn: '是',
      interactionStats: {
        totalVisits: 2 + (index % 3),
        frequency: '高频',
        turns: 4,
        avgDuration: '20" 50"',
        totalDuration: '58" 43"',
        salesTalkRatio: '45%'
      }
    };
  });
};

const MOCK_CUSTOMERS = generateMockCustomers();

// Analysis Data Mocks
const CUSTOMER_LEVEL_DATA = [
  { name: 'H级 (极高)', value: 15, color: '#ef4444' },
  { name: 'A级 (高意向)', value: 35, color: '#f97316' },
  { name: 'B级 (中意向)', value: 30, color: '#3b82f6' },
  { name: 'C级 (一般)', value: 20, color: '#94a3b8' },
];

const INTENT_TREND_DATA = [
  { date: '10/20', active: 120, potential: 45 },
  { date: '10/21', active: 132, potential: 52 },
  { date: '10/22', active: 101, potential: 48 },
  { date: '10/23', active: 134, potential: 61 },
  { date: '10/24', active: 190, potential: 75 },
  { date: '10/25', active: 230, potential: 88 },
  { date: '10/26', active: 210, potential: 82 },
];

const RISK_FACTOR_DATA = [
  { subject: '价格敏感', count: 85, fullMark: 100 },
  { subject: '竞品分流', count: 65, fullMark: 100 },
  { subject: '决策拖延', count: 50, fullMark: 100 },
  { subject: '牌照指标', count: 30, fullMark: 100 },
  { subject: '家庭阻力', count: 45, fullMark: 100 },
];

const RADAR_DATA = [
  { subject: '购买力', A: 85, fullMark: 100 },
  { subject: '决策力', A: 90, fullMark: 100 },
  { subject: '品牌认可', A: 65, fullMark: 100 },
  { subject: '产品匹配', A: 95, fullMark: 100 },
  { subject: '紧迫度', A: 80, fullMark: 100 },
];

// Heatmap Data
const HEATMAP_STAGES = ['线索', '邀约', '到店', '试驾', '谈判', '成交'];
const HEATMAP_ROWS = [
  { 
    id: 'H', label: '极热', subLabel: 'H', 
    values: [null, null, 10, 25, 15, 42], 
    risks:  [0, 0, 0, 0, 0, 0] 
  },
  { 
    id: 'A', label: '高意向', subLabel: 'A', 
    values: [null, 15, 35, 20, 5, null], 
    risks:  [0, 2, 4, 2, 1, 0] 
  },
  { 
    id: 'B', label: '中意向', subLabel: 'B', 
    values: [40, 45, 25, null, null, null], 
    risks:  [12, 14, 8, 0, 0, 0] 
  },
  { 
    id: 'C', label: '低意向', subLabel: 'C', 
    values: [85, 30, null, null, null, null], 
    risks:  [51, 18, 0, 0, 0, 0] 
  },
  { 
    id: 'N', label: '无意向', subLabel: 'N', 
    values: [120, null, null, null, null, null], 
    risks:  [108, 0, 0, 0, 0, 0] 
  },
];

// --- Sub Components ---

const CustomerHeatmap = () => {
  // Helper to determine cell background color based on value
  const getCellColor = (value: number | null, isDeal: boolean) => {
    if (value === null) return 'bg-gray-50 dark:bg-slate-800/50';
    if (isDeal) return 'bg-emerald-300 dark:bg-emerald-600/50 text-emerald-900 dark:text-emerald-50'; // Deal column special color
    
    // Gradient based on value
    if (value > 80) return 'bg-indigo-400 dark:bg-indigo-600 text-white';
    if (value > 40) return 'bg-indigo-200 dark:bg-indigo-700/60 text-indigo-900 dark:text-indigo-100';
    return 'bg-indigo-50 dark:bg-indigo-900/20 text-indigo-900 dark:text-indigo-200';
  };

  return (
    <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-700">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-indigo-100 dark:bg-indigo-900/30 rounded-lg text-indigo-600 dark:text-indigo-400">
            <LayoutDashboard size={20} />
          </div>
          <div>
            <h3 className="text-lg font-bold text-gray-900 dark:text-white">周期 x 意向 组合分布热力图</h3>
            <p className="text-xs text-gray-500 mt-0.5">实时监控各阶段客户堆积与流失风险</p>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 text-xs text-gray-500">
            <span className="flex items-center gap-1">
              <span className="w-3 h-3 bg-indigo-50 dark:bg-indigo-900/20 rounded-sm"></span> 低密度
            </span>
            <span className="flex items-center gap-1">
              <span className="w-3 h-3 bg-indigo-400 dark:bg-indigo-600 rounded-sm"></span> 高密度
            </span>
          </div>
          <div className="px-3 py-1.5 bg-red-50 dark:bg-red-900/20 border border-red-100 dark:border-red-900/30 rounded-lg flex items-center gap-2 text-xs text-red-600 dark:text-red-300">
            <AlertTriangle size={12} className="fill-red-100 dark:fill-red-900/20" />
            红色角标代表流失风险客户数
          </div>
        </div>
      </div>

      {/* Heatmap Grid */}
      <div className="w-full overflow-x-auto">
        <div className="min-w-[800px]">
          {/* Header Row */}
          <div className="grid grid-cols-12 gap-2 mb-2">
            <div className="col-span-1 text-xs text-gray-400 font-medium flex items-end pb-1">
              意向 \ 阶段
            </div>
            {HEATMAP_STAGES.map((stage, i) => (
              <div key={i} className="col-span-2 text-center text-sm font-bold text-gray-700 dark:text-gray-300 pb-2 border-b border-gray-100 dark:border-slate-700">
                {stage}
              </div>
            ))}
          </div>

          {/* Data Rows */}
          <div className="space-y-2">
            {HEATMAP_ROWS.map((row, rIndex) => (
              <div key={rIndex} className="grid grid-cols-12 gap-2 h-14">
                {/* Y-Axis Label */}
                <div className="col-span-1 flex flex-col justify-center">
                  <span className="text-base font-bold text-gray-900 dark:text-white leading-none">{row.id}</span>
                  <span className="text-[10px] text-gray-400 mt-1">{row.label}</span>
                </div>

                {/* Cells */}
                {row.values.map((val, cIndex) => {
                  const riskVal = row.risks[cIndex];
                  const isDeal = cIndex === 5; // The last column '成交'
                  
                  return (
                    <div 
                      key={cIndex} 
                      className={`col-span-2 rounded-lg flex items-center justify-center relative transition-all hover:scale-[1.02] hover:shadow-md cursor-pointer group ${getCellColor(val, isDeal)}`}
                    >
                      {val !== null ? (
                        <>
                          <span className={`text-xl font-bold ${isDeal ? 'text-emerald-900 dark:text-emerald-50' : ''}`}>{val}</span>
                          
                          {/* Risk Badge */}
                          {riskVal > 0 && (
                            <div className="absolute top-1 right-1 flex items-center gap-0.5 bg-white/90 dark:bg-slate-900/90 px-1.5 py-0.5 rounded text-[10px] font-bold text-red-500 shadow-sm border border-red-100 dark:border-red-900/30">
                              <AlertTriangle size={8} fill="currentColor" />
                              {riskVal}
                            </div>
                          )}
                        </>
                      ) : (
                        <span className="text-gray-300 dark:text-slate-700">-</span>
                      )}
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const DetailView: React.FC<{ customer: CustomerDetail, onBack: () => void }> = ({ customer, onBack }) => {
  return (
    <div className="space-y-6 animate-fade-in">
      {/* Detail Header */}
      <div className="flex items-center gap-4 mb-2">
        <button 
          onClick={onBack}
          className="p-2 hover:bg-gray-100 dark:hover:bg-slate-700 rounded-lg transition-colors border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800"
        >
          <ArrowLeft size={20} className="text-gray-600 dark:text-gray-300" />
        </button>
        <div className="flex-1">
          <div className="flex items-center gap-3">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{customer.name}</h2>
            <span className={`px-2 py-0.5 text-xs font-bold rounded ${
               customer.level === 'H' ? 'bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-300' :
               'bg-orange-100 text-orange-600 dark:bg-orange-900/30 dark:text-orange-300'
            }`}>
               {customer.level}级意向
            </span>
          </div>
          <p className="text-sm text-gray-500 mt-1 flex items-center gap-3">
             <span className="flex items-center gap-1"><Phone size={12}/> {customer.phone}</span>
             <span className="flex items-center gap-1"><User size={12}/> 顾问: {customer.advisor}</span>
          </p>
        </div>
        <div className="flex gap-2">
           <button className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg text-sm font-medium transition-colors shadow-sm">
              <Phone size={16} /> 一键呼叫
           </button>
           <button className="flex items-center gap-2 px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg text-sm font-medium transition-colors shadow-sm">
              <MessageCircle size={16} /> 发送微信
           </button>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
         
         {/* LEFT COL: AI Insights (The Requested Feature) */}
         <div className="lg:col-span-2 space-y-6">
            
            {/* AI Summary Card */}
            <div className="bg-gradient-to-br from-indigo-50 to-white dark:from-indigo-900/20 dark:to-slate-800 p-6 rounded-2xl shadow-sm border border-indigo-100 dark:border-indigo-900/30 relative overflow-hidden">
               <div className="absolute top-0 right-0 p-4 opacity-10">
                  <BrainCircuit size={120} className="text-indigo-600 dark:text-indigo-400" />
               </div>
               
               <div className="flex items-center gap-3 mb-6 relative z-10">
                  <div className="p-2 bg-indigo-600 text-white rounded-lg shadow-lg shadow-indigo-200 dark:shadow-none">
                     <Sparkles size={20} />
                  </div>
                  <div>
                     <h3 className="text-lg font-bold text-gray-900 dark:text-white">AI 智能购车意向分析</h3>
                     <p className="text-xs text-indigo-600 dark:text-indigo-400 font-medium">基于全渠道 {customer.interactionStats.totalVisits} 次互动数据深度建模</p>
                  </div>
               </div>

               <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10">
                  {/* Score */}
                  <div className="bg-white/80 dark:bg-slate-900/50 backdrop-blur-sm p-4 rounded-xl border border-indigo-50 dark:border-indigo-500/20 flex flex-col items-center justify-center text-center">
                     <div className="relative w-24 h-24 flex items-center justify-center mb-2">
                        <svg className="w-full h-full transform -rotate-90">
                           <circle cx="48" cy="48" r="40" stroke="currentColor" strokeWidth="8" fill="transparent" className="text-gray-100 dark:text-slate-700" />
                           <circle cx="48" cy="48" r="40" stroke="currentColor" strokeWidth="8" fill="transparent" strokeDasharray={40 * 2 * Math.PI} strokeDashoffset={40 * 2 * Math.PI * (1 - customer.predictionScore / 100)} className="text-indigo-600 dark:text-indigo-400 transition-all duration-1000 ease-out" strokeLinecap="round" />
                        </svg>
                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                           <span className="text-2xl font-bold text-indigo-700 dark:text-indigo-400">{customer.predictionScore}</span>
                           <span className="text-[10px] text-gray-400">成交概率</span>
                        </div>
                     </div>
                     <span className="text-xs font-bold text-gray-700 dark:text-gray-300 bg-indigo-100 dark:bg-indigo-900/40 px-2 py-1 rounded">
                        预计 {customer.estimatedDealTime} 成交
                     </span>
                  </div>

                  {/* Summary Text */}
                  <div className="md:col-span-2 space-y-4">
                     <div>
                        <h4 className="text-sm font-bold text-gray-800 dark:text-gray-200 mb-2 flex items-center gap-2">
                           <Bot size={16} className="text-indigo-500" /> 客户画像摘要
                        </h4>
                        <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed text-justify">
                           该客户属于<span className="font-bold text-indigo-600 dark:text-indigo-400">“理智家庭型”</span>买家。核心关注点为<span className="font-bold">空间实用性</span>与<span className="font-bold">安全性</span>，对<span className="text-orange-500">价格较为敏感</span>。当前已进入深度对比阶段，主要竞品为 Model Y，对电动车续航有一定顾虑。
                        </p>
                     </div>
                     
                     <div className="flex gap-3">
                        <div className="flex-1 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-100 dark:border-green-900/30">
                           <p className="text-xs font-bold text-green-700 dark:text-green-400 mb-1 flex items-center gap-1">
                              <ThumbsUp size={12} /> 赢单因子
                           </p>
                           <p className="text-xs text-gray-600 dark:text-gray-400">认可品牌安全理念；喜欢内饰豪华感。</p>
                        </div>
                        <div className="flex-1 p-3 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-100 dark:border-red-900/30">
                           <p className="text-xs font-bold text-red-700 dark:text-red-400 mb-1 flex items-center gap-1">
                              <AlertTriangle size={12} /> 风险预警
                           </p>
                           <p className="text-xs text-gray-600 dark:text-gray-400">多次询问竞品降价信息；抱怨按键繁琐。</p>
                        </div>
                     </div>
                  </div>
               </div>

               {/* AI Recommendations */}
               <div className="mt-6 pt-4 border-t border-indigo-100 dark:border-indigo-900/30 relative z-10">
                  <h4 className="text-sm font-bold text-gray-800 dark:text-white mb-3 flex items-center gap-2">
                     <Lightbulb size={16} className="text-yellow-500" /> 下一步跟进建议 (Next Best Action)
                  </h4>
                  <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-indigo-100 dark:border-slate-700 shadow-sm flex items-start gap-4">
                     <div className="p-2 bg-yellow-100 dark:bg-yellow-900/30 rounded-lg text-yellow-600 dark:text-yellow-400 flex-shrink-0">
                        <Target size={20} />
                     </div>
                     <div className="flex-1">
                        <p className="text-sm font-bold text-gray-900 dark:text-white mb-1">推荐策略：<span className="text-indigo-600 dark:text-indigo-400">价值锚定 + 金融推动</span></p>
                        <p className="text-xs text-gray-600 dark:text-gray-300 leading-relaxed mb-2">
                           客户还在犹豫价格，建议不再直接降价，而是申请<span className="font-bold">“5年0息”</span>金融方案，降低月供感知。同时邀约全家人进行<span className="font-bold">“周末深度试驾”</span>，重点演示儿童座椅接口及后备箱装载能力，强化家庭场景体验。
                        </p>
                        <div className="flex gap-2">
                           <button className="text-xs bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-300 px-3 py-1.5 rounded-lg border border-indigo-100 dark:border-indigo-800 hover:bg-indigo-100 transition-colors">
                              生成邀约话术
                           </button>
                           <button className="text-xs bg-gray-50 dark:bg-slate-800 text-gray-600 dark:text-gray-300 px-3 py-1.5 rounded-lg border border-gray-200 dark:border-slate-700 hover:bg-gray-100 transition-colors">
                              计算金融方案
                           </button>
                        </div>
                     </div>
                  </div>
               </div>
            </div>

            {/* Capability Radar & Tags */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-700">
                   <h4 className="font-bold text-gray-900 dark:text-white mb-4">客户能力模型</h4>
                   <div className="h-48 w-full">
                      <ResponsiveContainer width="100%" height="100%">
                         <RadarChart cx="50%" cy="50%" outerRadius="70%" data={RADAR_DATA}>
                            <PolarGrid stroke="#e2e8f0" />
                            <PolarAngleAxis dataKey="subject" tick={{ fill: '#64748b', fontSize: 11 }} />
                            <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                            <Radar name="能力值" dataKey="A" stroke="#8b5cf6" fill="#8b5cf6" fillOpacity={0.4} />
                            <Tooltip contentStyle={{borderRadius: '8px'}} />
                         </RadarChart>
                      </ResponsiveContainer>
                   </div>
                </div>

                <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-700">
                   <h4 className="font-bold text-gray-900 dark:text-white mb-4">客户标签画像</h4>
                   <div className="flex flex-wrap gap-2">
                      {['价格敏感', '家庭用车', '注重安全', '对比竞品', '决策慢', '需要置换', '关注续航'].map((tag, i) => (
                         <span key={i} className={`px-3 py-1.5 rounded-lg text-xs font-medium border ${
                            ['价格敏感', '对比竞品'].includes(tag) ? 'bg-red-50 text-red-600 border-red-100 dark:bg-red-900/20 dark:text-red-300 dark:border-red-900/30' :
                            ['家庭用车', '注重安全'].includes(tag) ? 'bg-green-50 text-green-600 border-green-100 dark:bg-green-900/20 dark:text-green-300 dark:border-green-900/30' :
                            'bg-gray-50 text-gray-600 border-gray-100 dark:bg-slate-700 dark:text-gray-300 dark:border-slate-600'
                         }`}>
                            {tag}
                         </span>
                      ))}
                   </div>
                   <div className="mt-6 pt-4 border-t border-gray-100 dark:border-slate-700">
                      <p className="text-xs text-gray-400 mb-2">最近浏览车型</p>
                      <div className="flex gap-2">
                         <span className="px-2 py-1 bg-gray-100 dark:bg-slate-700 rounded text-xs text-gray-600 dark:text-gray-300">{customer.intendedModel}</span>
                         <span className="px-2 py-1 bg-gray-100 dark:bg-slate-700 rounded text-xs text-gray-600 dark:text-gray-300">CT5 豪华型</span>
                      </div>
                   </div>
                </div>
            </div>
         </div>

         {/* RIGHT COL: Basic Info & Timeline */}
         <div className="space-y-6">
            <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-700">
               <h4 className="font-bold text-gray-900 dark:text-white mb-4">基本信息</h4>
               <div className="space-y-3 text-sm">
                  <div className="flex justify-between py-2 border-b border-gray-50 dark:border-slate-700">
                     <span className="text-gray-500">客户姓名</span>
                     <span className="font-medium text-gray-900 dark:text-white">{customer.name}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-gray-50 dark:border-slate-700">
                     <span className="text-gray-500">性别/年龄</span>
                     <span className="font-medium text-gray-900 dark:text-white">{customer.gender === 'Male' ? '男' : '女'} / {customer.ageGroup}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-gray-50 dark:border-slate-700">
                     <span className="text-gray-500">职业</span>
                     <span className="font-medium text-gray-900 dark:text-white">{customer.occupation}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-gray-50 dark:border-slate-700">
                     <span className="text-gray-500">居住区域</span>
                     <span className="font-medium text-gray-900 dark:text-white">{customer.address}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-gray-50 dark:border-slate-700">
                     <span className="text-gray-500">购车预算</span>
                     <span className="font-medium text-gray-900 dark:text-white">{customer.budget}</span>
                  </div>
               </div>
            </div>

            <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-700">
               <div className="flex justify-between items-center mb-4">
                  <h4 className="font-bold text-gray-900 dark:text-white">跟进记录</h4>
                  <button className="text-xs text-primary-600 hover:underline">查看全部</button>
               </div>
               <div className="space-y-6 relative pl-2">
                  <div className="absolute left-2 top-2 bottom-2 w-0.5 bg-gray-100 dark:bg-slate-700"></div>
                  {[
                     { date: '今天 10:30', type: '电话', content: '沟通金融方案，客户对费率仍有疑虑', status: 'done' },
                     { date: '10-24 14:00', type: '到店', content: '全家到店试驾，对后排空间满意', status: 'done' },
                     { date: '10-20 16:20', type: '微信', content: '首次留资，发送电子图册', status: 'done' },
                  ].map((log, i) => (
                     <div key={i} className="relative pl-6">
                        <div className="absolute left-0 top-1.5 w-4 h-4 rounded-full bg-white dark:bg-slate-800 border-2 border-primary-500 z-10"></div>
                        <div className="flex justify-between items-start mb-1">
                           <span className="text-xs font-bold text-gray-900 dark:text-white">{log.type}</span>
                           <span className="text-[10px] text-gray-400">{log.date}</span>
                        </div>
                        <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed bg-gray-50 dark:bg-slate-700/50 p-2 rounded">
                           {log.content}
                        </p>
                     </div>
                  ))}
               </div>
            </div>
         </div>

      </div>
    </div>
  );
};

const AnalysisDashboard = () => (
  <div className="space-y-6 animate-fade-in">
    {/* Customer Heatmap - Added at Top */}
    <CustomerHeatmap />

    {/* KPI Cards */}
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
      <div className="bg-white dark:bg-slate-800 p-5 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-700">
        <div className="flex justify-between items-start mb-2">
          <p className="text-gray-500 dark:text-gray-400 text-sm font-medium">在库潜客总数</p>
          <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg text-blue-600 dark:text-blue-400">
            <Users size={18} />
          </div>
        </div>
        <h3 className="text-2xl font-bold text-gray-900 dark:text-white">1,248</h3>
        <div className="flex items-center gap-1 mt-2 text-xs text-green-500 font-medium">
          <TrendingUp size={12} /> +12.5% <span className="text-gray-400 font-normal">较上周</span>
        </div>
      </div>
      
      <div className="bg-white dark:bg-slate-800 p-5 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-700">
        <div className="flex justify-between items-start mb-2">
          <p className="text-gray-500 dark:text-gray-400 text-sm font-medium">高意向(H/A级)占比</p>
          <div className="p-2 bg-orange-100 dark:bg-orange-900/30 rounded-lg text-orange-600 dark:text-orange-400">
            <Target size={18} />
          </div>
        </div>
        <h3 className="text-2xl font-bold text-gray-900 dark:text-white">42.8%</h3>
        <div className="flex items-center gap-1 mt-2 text-xs text-green-500 font-medium">
          <TrendingUp size={12} /> +5.2% <span className="text-gray-400 font-normal">较上周</span>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-800 p-5 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-700">
        <div className="flex justify-between items-start mb-2">
          <p className="text-gray-500 dark:text-gray-400 text-sm font-medium">流失风险预警</p>
          <div className="p-2 bg-red-100 dark:bg-red-900/30 rounded-lg text-red-600 dark:text-red-400">
            <AlertTriangle size={18} />
          </div>
        </div>
        <h3 className="text-2xl font-bold text-gray-900 dark:text-white">28</h3>
        <div className="flex items-center gap-1 mt-2 text-xs text-red-500 font-medium">
          <TrendingUp size={12} /> +2 <span className="text-gray-400 font-normal">较昨日</span>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-800 p-5 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-700">
        <div className="flex justify-between items-start mb-2">
          <p className="text-gray-500 dark:text-gray-400 text-sm font-medium">平均成交周期</p>
          <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg text-purple-600 dark:text-purple-400">
            <Clock size={18} />
          </div>
        </div>
        <h3 className="text-2xl font-bold text-gray-900 dark:text-white">12.5天</h3>
        <div className="flex items-center gap-1 mt-2 text-xs text-green-500 font-medium">
          <TrendingUp size={12} /> -1.2天 <span className="text-gray-400 font-normal">提效明显</span>
        </div>
      </div>
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Intent Distribution */}
      <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-700">
        <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          <PieChartIcon className="text-blue-500" size={20} /> 客户意向等级分布
        </h4>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={CUSTOMER_LEVEL_DATA}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                paddingAngle={5}
                dataKey="value"
              >
                {CUSTOMER_LEVEL_DATA.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
              <Legend verticalAlign="bottom" height={36}/>
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Trend */}
      <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-700 lg:col-span-2">
        <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          <TrendingUp className="text-green-500" size={20} /> 潜客活跃度趋势
        </h4>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={INTENT_TREND_DATA}>
              <defs>
                <linearGradient id="colorActive" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorPotential" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <XAxis dataKey="date" axisLine={false} tickLine={false} />
              <YAxis axisLine={false} tickLine={false} />
              <Tooltip />
              <Legend />
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
              <Area type="monotone" dataKey="active" name="活跃客户" stroke="#3b82f6" fillOpacity={1} fill="url(#colorActive)" />
              <Area type="monotone" dataKey="potential" name="新增潜客" stroke="#8b5cf6" fillOpacity={1} fill="url(#colorPotential)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>

    {/* Risk Analysis */}
    <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-700">
       <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          <Shield className="text-red-500" size={20} /> 客户抗拒/风险因素分析
       </h4>
       <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
             <BarChart data={RISK_FACTOR_DATA} layout="vertical" barSize={24}>
                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#e2e8f0" />
                <XAxis type="number" hide />
                <YAxis dataKey="subject" type="category" width={80} tick={{fontSize: 12}} axisLine={false} tickLine={false} />
                <Tooltip cursor={{fill: 'transparent'}} />
                <Bar dataKey="count" fill="#ef4444" radius={[0, 4, 4, 0]} name="风险频次" label={{ position: 'right', fill: '#666', fontSize: 12 }} />
             </BarChart>
          </ResponsiveContainer>
       </div>
    </div>
  </div>
);

// --- Main Page Component ---

const CustomerArchivesV2: React.FC = () => {
  const [mainTab, setMainTab] = useState<'analysis' | 'list'>('analysis');
  const [searchTerm, setSearchTerm] = useState('');
  const [advisorFilter, setAdvisorFilter] = useState('全部顾问');
  const [selectedCustomer, setSelectedCustomer] = useState<CustomerDetail | null>(null);

  const filteredCustomers = MOCK_CUSTOMERS.filter(c => {
    const matchesSearch = c.name.includes(searchTerm) || c.phone.includes(searchTerm);
    const matchesAdvisor = advisorFilter === '全部顾问' || c.advisor === advisorFilter;
    return matchesSearch && matchesAdvisor;
  });

  const handleViewDetail = (customer: CustomerDetail) => {
    setSelectedCustomer(customer);
  };

  const handleBack = () => {
    setSelectedCustomer(null);
  };

  if (selectedCustomer) {
    return <DetailView customer={selectedCustomer} onBack={handleBack} />;
  }

  return (
    <div className="space-y-6 animate-fade-in pb-12">
      {/* Header Section with Prominent Toggle */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">客户档案中心 V2</h2>
          <p className="text-sm text-gray-500 mt-1">全周期客户资产管理与价值挖掘</p>
        </div>

        {/* View Switcher - Segmented Control Style */}
        <div className="bg-gray-100 dark:bg-slate-800 p-1.5 rounded-xl inline-flex items-center gap-1 border border-gray-200 dark:border-slate-700">
           <button
             onClick={() => setMainTab('analysis')}
             className={`px-6 py-2.5 rounded-lg text-sm font-bold flex items-center gap-2 transition-all duration-200 ${
               mainTab === 'analysis'
                 ? 'bg-white dark:bg-slate-600 text-primary-600 dark:text-primary-400 shadow-sm ring-1 ring-black/5 dark:ring-white/10'
                 : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 hover:bg-gray-200/50 dark:hover:bg-slate-700/50'
             }`}
           >
             <LayoutDashboard size={18} className={mainTab === 'analysis' ? 'text-primary-600 dark:text-primary-400' : 'text-gray-400'} />
             <span>客户整体分析</span>
           </button>

           <button
             onClick={() => setMainTab('list')}
             className={`px-6 py-2.5 rounded-lg text-sm font-bold flex items-center gap-2 transition-all duration-200 ${
               mainTab === 'list'
                 ? 'bg-white dark:bg-slate-600 text-primary-600 dark:text-primary-400 shadow-sm ring-1 ring-black/5 dark:ring-white/10'
                 : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 hover:bg-gray-200/50 dark:hover:bg-slate-700/50'
             }`}
           >
             <List size={18} className={mainTab === 'list' ? 'text-primary-600 dark:text-primary-400' : 'text-gray-400'} />
             <span>客户明细列表</span>
           </button>
        </div>
      </div>

      {/* Content Area */}
      <div className="pt-2">
        {mainTab === 'analysis' ? (
          <AnalysisDashboard />
        ) : (
          <div className="space-y-6 animate-fade-in">
            {/* List Controls */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex gap-3">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input 
                    type="text" 
                    placeholder="搜索客户..." 
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-lg pl-9 pr-4 py-2 text-sm outline-none focus:ring-2 focus:ring-primary-500 dark:text-white w-64"
                  />
                </div>
                <select
                  value={advisorFilter}
                  onChange={(e) => setAdvisorFilter(e.target.value)}
                  className="bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary-500 dark:text-white cursor-pointer"
                >
                  <option>全部顾问</option>
                  <option>王金牌</option>
                  <option>李进取</option>
                  <option>张新人</option>
                </select>
              </div>
              <button className="flex items-center gap-2 px-4 py-2 bg-primary-600 text-white rounded-lg text-sm font-medium hover:bg-primary-700 transition-colors shadow-sm">
                <Plus size={16} /> 新增档案
              </button>
            </div>

            {/* List Table */}
            <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-gray-100 dark:border-slate-700 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead className="bg-gray-50 dark:bg-slate-700/50">
                    <tr>
                      <th className="px-6 py-4 font-semibold text-gray-600 dark:text-gray-300 text-sm">客户姓名</th>
                      <th className="px-6 py-4 font-semibold text-gray-600 dark:text-gray-300 text-sm">意向车型</th>
                      <th className="px-6 py-4 font-semibold text-gray-600 dark:text-gray-300 text-sm">预算范围</th>
                      <th className="px-6 py-4 font-semibold text-gray-600 dark:text-gray-300 text-sm">客户等级</th>
                      <th className="px-6 py-4 font-semibold text-gray-600 dark:text-gray-300 text-sm">当前阶段</th>
                      <th className="px-6 py-4 font-semibold text-gray-600 dark:text-gray-300 text-sm">归属顾问</th>
                      <th className="px-6 py-4 font-semibold text-gray-600 dark:text-gray-300 text-sm">成交预测</th>
                      <th className="px-6 py-4 font-semibold text-gray-600 dark:text-gray-300 text-sm text-right">操作</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 dark:divide-slate-700">
                    {filteredCustomers.map((customer) => (
                      <tr key={customer.id} className="hover:bg-gray-50 dark:hover:bg-slate-700/30 transition-colors cursor-pointer" onClick={() => handleViewDetail(customer)}>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                             <div className="w-8 h-8 rounded-full bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center text-indigo-600 dark:text-indigo-400 font-bold text-xs">
                               {customer.name.charAt(0)}
                             </div>
                             <div>
                               <p className="text-sm font-bold text-gray-900 dark:text-white">{customer.name}</p>
                               <p className="text-xs text-gray-400">{customer.phone}</p>
                             </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-300">{customer.intendedModel}</td>
                        <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-300">{customer.budget}</td>
                        <td className="px-6 py-4">
                           <span className={`px-2 py-1 rounded text-xs font-bold ${
                              customer.level === 'H' ? 'bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-300' :
                              customer.level === 'A' ? 'bg-orange-100 text-orange-600 dark:bg-orange-900/30 dark:text-orange-300' :
                              customer.level === 'B' ? 'bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-300' : 
                              'bg-gray-100 text-gray-600 dark:bg-slate-700 dark:text-gray-300'
                           }`}>
                              {customer.level}级
                           </span>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-300">
                           <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                              customer.lifeCycle === 'Negotiation' ? 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300' :
                              customer.lifeCycle === 'TestDrive' ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300' : 
                              'bg-gray-100 text-gray-700 dark:bg-slate-700 dark:text-gray-300'
                           }`}>
                              {customer.lifeCycle === 'Negotiation' ? '谈判报价' : customer.lifeCycle === 'TestDrive' ? '试乘试驾' : customer.lifeCycle === 'Showroom' ? '展厅接待' : '邀约'}
                           </span>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-300">{customer.advisor}</td>
                        <td className="px-6 py-4">
                           <div className="flex items-center gap-2">
                              <div className="w-16 bg-gray-200 dark:bg-slate-600 h-1.5 rounded-full overflow-hidden">
                                 <div className={`h-full ${customer.predictionScore > 80 ? 'bg-green-500' : 'bg-blue-500'}`} style={{width: `${customer.predictionScore}%`}}></div>
                              </div>
                              <span className="text-xs font-bold dark:text-gray-200">{customer.predictionScore}</span>
                           </div>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <ChevronRight size={16} className="text-gray-400 ml-auto" />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>

      <AIAssistant context="dashboard" />
    </div>
  );
};

export default CustomerArchivesV2;
