
import React, { useState } from 'react';
import { 
  Search, 
  Filter, 
  ArrowLeft,
  User,
  Phone,
  MessageCircle, 
  ChevronRight,
  Zap,
  MoreHorizontal,
  Plus,
  LayoutDashboard,
  List,
  TrendingUp,
  TrendingDown,
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
  MessageSquare,
  BarChart2,
  Calendar,
  ChevronDown,
  Download,
  Share2,
  CheckCircle2,
  Edit3,
  Mail, 
  Store, 
  Car, 
  Tag, 
  Gavel,
  Battery, 
  Signal,
  Mic,
  Clock,
  Play,
  Pause,
  Volume2
} from 'lucide-react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell,
  PieChart, Pie, AreaChart, Area, Legend, Radar, RadarChart, PolarGrid, 
  PolarAngleAxis, PolarRadiusAxis, LineChart, Line
} from 'recharts';
import AIAssistant from '../components/AIAssistant';

// --- Types ---

interface Customer {
  id: string;
  name: string;
  phone: string;
  level: string;
  advisor: string;
  stage: string;
  model: string;
  budget: string;
  score: number;
  lastActive: string;
  tags: string[];
}

// --- Mock Data ---

const VOLUME_TREND_DATA = [
  { date: '10-20', current: 45, previous: 38 },
  { date: '10-21', current: 52, previous: 40 },
  { date: '10-22', current: 48, previous: 42 },
  { date: '10-23', current: 61, previous: 45 },
  { date: '10-24', current: 75, previous: 50 },
  { date: '10-25', current: 88, previous: 55 },
  { date: '10-26', current: 82, previous: 60 },
];

const WORD_CLOUD_DATA = [
  { text: '油耗低', value: 90, color: '#10b981' },
  { text: '空间大', value: 85, color: '#3b82f6' },
  { text: '智能驾驶', value: 80, color: '#8b5cf6' },
  { text: '性价比', value: 75, color: '#f59e0b' },
  { text: '内饰豪华', value: 60, color: '#ec4899' },
  { text: '续航里程', value: 55, color: '#6366f1' },
  { text: '置换补贴', value: 50, color: '#14b8a6' },
  { text: '金融政策', value: 45, color: '#f97316' },
];

const COMPLAINT_TOP5 = [
  { name: '价格偏高', value: 45, percentage: '35%' },
  { name: '充电速度慢', value: 38, percentage: '28%' },
  { name: '赠品太少', value: 30, percentage: '22%' },
  { name: '提车周期长', value: 25, percentage: '18%' },
  { name: '销售态度急', value: 15, percentage: '12%' },
];

const INTENT_DISTRIBUTION = [
  { name: 'A级 (高意向)', value: 35, color: '#f97316' },
  { name: 'B级 (中意向)', value: 45, color: '#3b82f6' },
  { name: 'C级 (一般)', value: 15, color: '#94a3b8' },
  { name: 'H级 (极高)', value: 5, color: '#ef4444' },
];

const RESISTANCE_TOP5 = [
  { name: '价格抗拒', value: 85 },
  { name: '竞品对比', value: 65 },
  { name: '家人反对', value: 45 },
  { name: '牌照顾虑', value: 30 },
  { name: '观望新款', value: 25 },
];

const GOLDEN_SCRIPTS = [
  { title: '价格异议', content: '“如果您把眼光放长到5年，算上节省的油费和保养费，这车每天成本还不到一杯咖啡。”' },
  { title: '竞品对比', content: '“虽然XX配置高，但我们的底盘调教和安全冗余是经过百万车主验证的，您可以试驾感受一下质感。”' },
  { title: '促单成交', content: '“这个优惠政策是厂家限时特批的，名额只保留到今晚，建议您先锁单占个名额。”' },
];

const MOCK_CUSTOMERS: Customer[] = [
  { id: 'C001', name: '王泽祥', phone: '177****7777', level: 'H级', advisor: '王金牌', stage: '邀约', model: 'CT5', budget: '20万~25万', score: 34, lastActive: '10分钟前', tags: [] },
  { id: 'C002', name: '李娜', phone: '177****7778', level: 'H级', advisor: '李进取', stage: '展厅接待', model: 'Model 3', budget: '25-30万', score: 55, lastActive: '2小时前', tags: [] },
  { id: 'C003', name: '张强', phone: '177****7779', level: 'H级', advisor: '张新人', stage: '试乘试驾', model: 'ET5', budget: '30-35万', score: 65, lastActive: '1天前', tags: [] },
  { id: 'C004', name: '刘洋', phone: '177****7780', level: 'H级', advisor: '王金牌', stage: '谈判报价', model: 'Model Y', budget: '20万~25万', score: 98, lastActive: '3天前', tags: [] },
  { id: 'C005', name: '陈静', phone: '177****7781', level: 'H级', advisor: '李进取', stage: '邀约', model: 'CT5', budget: '25-30万', score: 22, lastActive: '30分钟前', tags: [] },
  { id: 'C006', name: '赵杰', phone: '177****7782', level: 'H级', advisor: '张新人', stage: '展厅接待', model: 'Model 3', budget: '30-35万', score: 41, lastActive: '5小时前', tags: [] },
  { id: 'C007', name: '孙丽', phone: '177****7783', level: 'H级', advisor: '王金牌', stage: '试乘试驾', model: 'ET5', budget: '20万~25万', score: 60, lastActive: '1天前', tags: [] },
];

// --- Detail View Data Mocks ---

const CHANNEL_DATA = [
  { name: '线下接待', value: 65, color: '#3b82f6' },
  { name: '企微', value: 25, color: '#f97316' },
  { name: 'DCC', value: 10, color: '#ec4899' },
];

const DURATION_DATA = [
  { name: '线下接待', value: 550, fill: '#3b82f6' },
  { name: '企微', value: 280, fill: '#f97316' },
  { name: 'DCC', value: 45, fill: '#ec4899' },
];

const TOPIC_DATA = [
  { name: '智能驾驶辅助功能', value: 45.00, color: '#3b82f6' },
  { name: '车辆参数', value: 22.48, color: '#6366f1' },
  { name: '售后服务', value: 19.67, color: '#f97316' },
  { name: '竞品对比', value: 12.85, color: '#ec4899' },
];

const FOCUS_DATA = [
  { name: '智能驾驶辅助功能', value: 45, color: '#3b82f6' },
  { name: '价格与金融方案', value: 35, color: '#3b82f6' }, 
  { name: '售后服务', value: 10, color: '#f97316' },
  { name: '竞品对比', value: 10, color: '#ec4899' },
];

const RESISTANCE_DATA = [
  { name: '车辆空间', value: 40, color: '#f87171' }, 
  { name: '车辆动力', value: 20, color: '#3b82f6' },
  { name: '权益相关', value: 25, color: '#f97316' },
  { name: '车辆价格', value: 15, color: '#ec4899' },
];

const COMPETITOR_DATA = [
  { name: '配置参数', value: 30, color: '#10b981' }, 
  { name: '性能参数', value: 25, color: '#3b82f6' },
  { name: '空间实用性', value: 20, color: '#f97316' },
  { name: '价格差异', value: 25, color: '#ec4899' },
];

// --- Journey Data ---
const JOURNEY_STAGES = [
    { name: '邀约', icon: Mail, status: 'completed' },
    { name: '进店', icon: Store, status: 'completed' },
    { name: '试驾', icon: Car, status: 'completed' },
    { name: '报价', icon: Tag, status: 'pending' },
    { name: '成交', icon: Gavel, status: 'pending' },
];

const JOURNEY_TIMELINE = [
    {
        dateGroup: '今天 2025-03-03',
        events: [
            {
                id: 'evt-001',
                type: 'visit',
                icon: Mic, 
                title: '客户到店',
                time: '14:40-15:00',
                advisor: '张海思',
                advisorAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=张海思',
                customer: '王泽祥',
                customerAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=王泽祥',
                duration: '2小时19分10秒',
                tags: [
                    { text: '客户顾虑价格', type: 'customer' },
                    { text: '顾问强调价值', type: 'advisor' }
                ],
                summary: '客户解答了关于车辆参数的问题：包括车身尺寸、动力配置、续航里程等。客户对车辆的性能表现和细节非常关注多位客户解答了关于车辆参数的问题：包括车身尺寸、动力配置、续航里程等。',
                action: '共33条消息',
                color: 'blue',
                advisorRatio: 65, // Advisor 65%, Customer 35%
            }
        ]
    },
    {
        dateGroup: '昨天 2025-03-03',
        events: [
            {
                id: 'evt-002',
                type: 'chat',
                icon: MessageCircle,
                title: '企微联系',
                time: '14:40-15:00',
                advisor: '张海思',
                advisorAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=张海思',
                customer: '王泽祥',
                customerAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=王泽祥',
                duration: '20分10秒',
                tags: [
                    { text: '客户顾虑价格', type: 'customer' },
                    { text: '顾问强调调性', type: 'advisor' }
                ],
                summary: '客户解答了关于车辆参数的问题：包括车身尺寸、动力配置、续航里程等。客户对车辆的性能表现和细节非常关注多位客户解答了关于车辆参数的问题：包括车身尺寸、动力配置、续航里程等。',
                action: '共33条消息',
                color: 'green',
                advisorRatio: 40,
            }
        ]
    },
    {
        dateGroup: '近1周 2025-03-03',
        events: [
            {
                id: 'evt-003',
                type: 'call',
                icon: Phone,
                title: 'DCC呼叫',
                time: '14:40-15:00',
                advisor: '张海思',
                advisorAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=张海思',
                customer: '王泽祥',
                customerAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=王泽祥',
                duration: '18分10秒',
                tags: [
                    { text: '客户顾虑价格', type: 'customer' },
                    { text: '顾问强调价值', type: 'advisor' }
                ],
                summary: '客户解答了关于车干参数的问题：包括车身尺寸、动力配置、续航里程等。客户对车辆的性能表现和细节非常关注多位客户解答了关于车干参数的问题：包括车身尺寸、动力配置、续航里程等。',
                action: '共33条消息',
                color: 'purple',
                advisorRatio: 55,
            }
        ]
    }
];

// --- Chat Transcript Mock Data ---
const TRANSCRIPT_DATA = [
    {
        id: 1,
        sender: 'customer',
        name: '王泽祥',
        time: '00:00:06',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=王泽祥',
        content: '家里三口人，预算25万左右落地，想要空间大、安全性特别好的车。你看下，综合对比，推荐哪款车型呢？',
        tags: ['客户预算范围', '购买性质']
    },
    {
        id: 2,
        sender: 'advisor',
        name: '张海思',
        time: '00:00:59',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=张海思',
        content: '家庭用车确实需要兼顾空间、安全和舒适性。CT5作为豪华后驱轿车，空间非常宽敞，孩子安全座椅安装也很方便。而且全系标配主动刹车、车道保持辅助和侧盲区预警，对家庭出行来说，安全绝对是第一位的。',
        tags: []
    },
    {
        id: 3,
        sender: 'customer',
        name: '王泽祥',
        time: '00:02:00',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=王泽祥',
        content: 'CT5是很好，我在看小米SU7，新能源车更智能吧？',
        tags: ['提及竞品']
    },
    {
        id: 4,
        sender: 'advisor',
        name: '张海思',
        time: '00:02:56',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=张海思',
        content: '新势力车机确实炫酷，但CT5的MRC电磁悬挂和ANC主动降噪是百万级豪车配置，底盘经过20万公里耐久测试，带家人长途旅行更安心。现在订车送原厂安全座椅，和孩子在后排互动空间也更宽敞。',
        tags: []
    },
    {
        id: 5,
        sender: 'customer',
        name: '王泽祥',
        time: '00:04:10',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=王泽祥',
        content: '优惠还能再多吗？',
        tags: []
    }
];

const ANALYSIS_TAGS = [
    {
        category: '需求探寻',
        tags: ['购车周期*2', '客户用途*2']
    },
    {
        category: '竞品对比',
        tags: ['提及竞品*2']
    },
    {
        category: '购车预算与付款',
        tags: ['购车预算*2', '购买性质*1']
    },
    {
        category: '价格谈判',
        tags: ['裸车价*1', '优惠幅度*1', '附加费用*1']
    },
    {
        category: '金融方案',
        tags: ['贷款选择*1', '分期方案*1']
    },
    {
        category: '库存情况',
        tags: ['现车颜色*1', '提车时间*1']
    },
    {
        category: '促销活动',
        tags: ['限时优惠*1', '赠品政策*1']
    }
];

// --- Sub Components ---

const DonutChart = ({ data, centerText }: { data: any[], centerText?: { title: string, value: string } }) => (
  <ResponsiveContainer width="100%" height="100%">
    <PieChart>
      <Pie
        data={data}
        cx="50%"
        cy="50%"
        innerRadius={45}
        outerRadius={65}
        paddingAngle={2}
        dataKey="value"
        stroke="none"
      >
        {data.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={entry.color || entry.fill} />
        ))}
      </Pie>
      <Tooltip 
         contentStyle={{ backgroundColor: '#fff', borderRadius: '8px', border: 'none', boxShadow: '0 2px 10px rgba(0,0,0,0.1)' }}
         itemStyle={{ color: '#333', fontSize: '12px' }}
      />
      {centerText && (
        <text x="50%" y="50%" textAnchor="middle" dominantBaseline="middle">
          <tspan x="50%" dy="-0.5em" fontSize="10" fill="#9ca3af">{centerText.title}</tspan>
          <tspan x="50%" dy="1.2em" fontSize="14" fontWeight="bold" fill="#1f2937">{centerText.value}</tspan>
        </text>
      )}
    </PieChart>
  </ResponsiveContainer>
);

const JourneyInteractionDetail = ({ interaction, onBack }: { interaction: any, onBack: () => void }) => {
    const [sidebarTab, setSidebarTab] = useState<'tags' | 'summary'>('tags');

    return (
        <div className="flex flex-col h-full animate-fade-in pb-10">
            {/* Header */}
            <div className="flex items-center gap-4 mb-6 bg-white dark:bg-slate-800 p-4 rounded-xl border border-gray-100 dark:border-slate-700 shadow-sm sticky top-0 z-20">
                <button onClick={onBack} className="p-2 hover:bg-gray-100 dark:hover:bg-slate-700 rounded-lg transition-colors">
                    <ArrowLeft size={20} className="text-gray-600 dark:text-gray-300" />
                </button>
                <div className="flex-1">
                    <h2 className="text-lg font-bold text-gray-900 dark:text-white">会话记录详情</h2>
                    <p className="text-xs text-gray-500 font-mono">2025-03-03 14:40:10 - 14:50:22</p>
                </div>
                
                {/* Progress Steps within header or just below */}
                <div className="hidden md:flex items-center flex-1 justify-center gap-2">
                     {['需求探寻', '竞品对比', '引导客户试驾', '车辆报价'].map((step, idx) => (
                         <div key={idx} className="flex flex-col items-center w-32">
                             <span className="text-xs font-bold text-gray-800 dark:text-white mb-2">{step}</span>
                             <div className={`w-full h-1.5 rounded-full ${idx < 3 ? 'bg-primary-600' : 'bg-gray-200 dark:bg-slate-700'} relative`}>
                                 {idx < 3 && <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2.5 h-2.5 bg-primary-600 rounded-full border-2 border-white dark:border-slate-800"></div>}
                             </div>
                         </div>
                     ))}
                </div>
            </div>

            {/* Audio Player Bar */}
            <div className="bg-white dark:bg-slate-800 p-4 rounded-xl border border-gray-100 dark:border-slate-700 shadow-sm mb-6 flex items-center gap-4">
                 <button className="w-10 h-10 rounded-full bg-primary-600 flex items-center justify-center text-white hover:bg-primary-700 transition-colors shadow-sm">
                     <Play size={20} fill="currentColor" className="ml-0.5" />
                 </button>
                 <span className="text-sm font-medium text-gray-500 hover:text-primary-600 cursor-pointer w-8 text-center">X1</span>
                 <Volume2 size={18} className="text-gray-400" />
                 
                 <div className="flex-1 flex items-center gap-3">
                     <span className="text-xs text-gray-500 font-mono w-12 text-right">00:02:01</span>
                     <div className="flex-1 h-1.5 bg-gray-200 dark:bg-slate-700 rounded-full relative cursor-pointer group">
                         <div className="absolute top-0 left-0 h-full bg-primary-500 rounded-full w-[60%] group-hover:bg-primary-600 transition-colors"></div>
                         <div className="absolute top-1/2 -translate-y-1/2 left-[60%] w-3 h-3 bg-white border-2 border-primary-600 rounded-full shadow-md transform scale-0 group-hover:scale-100 transition-transform"></div>
                     </div>
                     <span className="text-xs text-gray-500 font-mono w-12">00:03:23</span>
                 </div>
            </div>

            {/* Main Content Area */}
            <div className="flex flex-col lg:flex-row gap-6 flex-1 min-h-0">
                {/* Chat Transcript */}
                <div className="flex-1 bg-white dark:bg-slate-800 rounded-xl border border-gray-100 dark:border-slate-700 shadow-sm flex flex-col overflow-hidden">
                    <div className="p-4 border-b border-gray-100 dark:border-slate-700 flex justify-between items-center bg-gray-50 dark:bg-slate-700/30">
                        <h3 className="font-bold text-gray-800 dark:text-white">会话记录</h3>
                        <div className="relative">
                             <Search size={14} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400" />
                             <input 
                               type="text" 
                               placeholder="请输入机器人名称" 
                               className="pl-8 pr-3 py-1.5 text-xs bg-white dark:bg-slate-600 border border-gray-200 dark:border-slate-500 rounded-full outline-none focus:ring-1 focus:ring-primary-500 w-48 transition-all"
                             />
                        </div>
                    </div>
                    
                    <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-gray-50/50 dark:bg-slate-900/50">
                        {TRANSCRIPT_DATA.map((msg) => (
                            <div key={msg.id} className={`flex gap-4 ${msg.sender === 'advisor' ? 'flex-row-reverse' : ''}`}>
                                <div className="flex-shrink-0 flex flex-col items-center gap-1">
                                    <img src={msg.avatar} alt={msg.name} className="w-10 h-10 rounded-full border-2 border-white dark:border-slate-700 shadow-sm" />
                                </div>
                                <div className={`flex flex-col max-w-[80%] ${msg.sender === 'advisor' ? 'items-end' : 'items-start'}`}>
                                    <div className="flex items-center gap-2 mb-1">
                                        <span className="text-xs font-bold text-gray-700 dark:text-gray-200">{msg.name}</span>
                                        <span className="text-[10px] text-gray-400 font-mono">{msg.time}</span>
                                    </div>
                                    <div className={`p-4 rounded-2xl text-sm leading-relaxed shadow-sm relative group ${
                                        msg.sender === 'advisor' 
                                            ? 'bg-blue-50 dark:bg-blue-900/20 text-gray-800 dark:text-gray-100 rounded-tr-none border border-blue-100 dark:border-blue-900/30' 
                                            : 'bg-white dark:bg-slate-700 text-gray-800 dark:text-gray-100 rounded-tl-none border border-gray-100 dark:border-slate-600'
                                    }`}>
                                        {msg.content}
                                    </div>
                                    
                                    {/* Tags below bubble */}
                                    {msg.tags.length > 0 && (
                                        <div className="flex gap-2 mt-2">
                                            {msg.tags.map(tag => (
                                                <span key={tag} className="px-2 py-0.5 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-300 text-xs rounded border border-indigo-100 dark:border-indigo-900/50">
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Right Sidebar: Analysis */}
                <div className="w-full lg:w-80 flex flex-col gap-4">
                     {/* Tabs */}
                     <div className="flex gap-6 border-b border-gray-200 dark:border-slate-700 px-2">
                         <button 
                            onClick={() => setSidebarTab('tags')}
                            className={`pb-3 text-sm font-bold transition-colors ${sidebarTab === 'tags' ? 'text-primary-600 border-b-2 border-primary-600' : 'text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'}`}
                         >
                            会话标签
                         </button>
                         <button 
                            onClick={() => setSidebarTab('summary')}
                            className={`pb-3 text-sm font-bold transition-colors ${sidebarTab === 'summary' ? 'text-primary-600 border-b-2 border-primary-600' : 'text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'}`}
                         >
                            会话摘要
                         </button>
                     </div>

                     <div className="flex-1 overflow-y-auto pr-1 space-y-6">
                         {sidebarTab === 'tags' ? (
                             ANALYSIS_TAGS.map((group, idx) => (
                                 <div key={idx}>
                                     <h4 className="text-sm font-bold text-gray-800 dark:text-white mb-2">{group.category}</h4>
                                     <div className="flex flex-wrap gap-2">
                                         {group.tags.map((tag, tIdx) => (
                                             <span key={tIdx} className="px-3 py-1.5 bg-indigo-50 dark:bg-indigo-900/20 text-indigo-700 dark:text-indigo-300 rounded-lg text-xs font-medium border border-indigo-100 dark:border-indigo-900/30 hover:bg-indigo-100 dark:hover:bg-indigo-900/40 cursor-pointer transition-colors">
                                                 {tag}
                                             </span>
                                         ))}
                                     </div>
                                 </div>
                             ))
                         ) : (
                             <div className="bg-gray-50 dark:bg-slate-700/30 p-4 rounded-xl border border-gray-100 dark:border-slate-700 text-sm leading-relaxed text-gray-700 dark:text-gray-300 animate-fade-in">
                                <h4 className="font-bold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                                    <Zap size={16} className="text-yellow-500" /> 
                                    AI 智能摘要
                                </h4>
                                <p className="mb-4">
                                    本次会话为首次进店接待。客户王泽祥（预算25万左右）核心关注家庭用车的<span className="font-bold text-gray-900 dark:text-white">空间</span>与<span className="font-bold text-gray-900 dark:text-white">安全性</span>。
                                </p>
                                <p className="mb-4">
                                    顾问张海思精准推荐凯迪拉克CT5，重点阐述了其作为豪华后驱轿车的空间优势及全系标配的主动安全配置（主动刹车、车道保持等）。
                                </p>
                                <p className="mb-4">
                                    针对客户提及的新能源竞品（小米SU7）智能化优势，顾问采用了<span className="font-bold text-indigo-600 dark:text-indigo-400">“机械素质+安全底蕴”</span>的差异化反击策略，强调MRC电磁悬挂、ANC主动降噪及底盘耐久性，并辅以“送原厂安全座椅”的促销政策强化家庭用车场景价值。
                                </p>
                                <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-100 dark:border-blue-800 text-xs">
                                    <span className="font-bold text-blue-700 dark:text-blue-300 block mb-1">下一步建议：</span>
                                    客户已进入价格谈判阶段（询问优惠），建议申请限时特批价或搭配金融免息方案促进当场成交。
                                </div>
                            </div>
                         )}
                     </div>
                </div>
            </div>
        </div>
    );
}

const AnalysisDashboard = () => {
  const [timeRange, setTimeRange] = useState('7days');

  return (
    <div className="space-y-6 animate-fade-in">
      {/* 1. Filter Section */}
      <div className="bg-white dark:bg-slate-800 p-4 rounded-xl shadow-sm border border-gray-100 dark:border-slate-700 flex flex-wrap items-center gap-4">
        {/* Time Range */}
        <div className="flex bg-gray-100 dark:bg-slate-700 p-1 rounded-lg">
          {[{ id: '7days', label: '近 7 天' }, { id: '30days', label: '近 30 天' }, { id: 'custom', label: '自定义' }].map(t => (
            <button
              key={t.id}
              onClick={() => setTimeRange(t.id)}
              className={`px-4 py-1.5 text-sm font-medium rounded-md transition-all ${
                timeRange === t.id 
                  ? 'bg-white dark:bg-slate-600 shadow-sm text-primary-600 dark:text-primary-400' 
                  : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        <div className="h-6 w-px bg-gray-200 dark:bg-slate-600 hidden md:block"></div>

        {/* Dropdowns */}
        <div className="flex flex-wrap gap-3">
          <select className="bg-gray-50 dark:bg-slate-700 border border-gray-200 dark:border-slate-600 rounded-lg px-3 py-1.5 text-sm outline-none focus:ring-2 focus:ring-primary-500 dark:text-white cursor-pointer min-w-[120px]">
            <option>所有车型/车系</option>
            <option>轿车系列</option>
            <option>SUV 系列</option>
            <option>Model Y</option>
          </select>
          
          <select className="bg-gray-50 dark:bg-slate-700 border border-gray-200 dark:border-slate-600 rounded-lg px-3 py-1.5 text-sm outline-none focus:ring-2 focus:ring-primary-500 dark:text-white cursor-pointer min-w-[100px]">
            <option>所有意向</option>
            <option>A级-高意向</option>
            <option>B级-中意向</option>
          </select>

          <select className="bg-gray-50 dark:bg-slate-700 border border-gray-200 dark:border-slate-600 rounded-lg px-3 py-1.5 text-sm outline-none focus:ring-2 focus:ring-primary-500 dark:text-white cursor-pointer min-w-[120px]">
            <option>所有门店/区域</option>
            <option>上海大区</option>
            <option>北京大区</option>
          </select>

          <select className="bg-gray-50 dark:bg-slate-700 border border-gray-200 dark:border-slate-600 rounded-lg px-3 py-1.5 text-sm outline-none focus:ring-2 focus:ring-primary-500 dark:text-white cursor-pointer min-w-[100px]">
            <option>全部顾问</option>
            <option>销售一部</option>
            <option>销售二部</option>
          </select>
        </div>

        <button className="ml-auto px-4 py-2 bg-primary-600 text-white rounded-lg text-sm font-medium hover:bg-primary-700 transition-colors shadow-sm flex items-center gap-2">
          <Filter size={16} /> 筛选分析
        </button>
      </div>

      {/* AI Summary Module */}
<div className="bg-gradient-to-br from-indigo-50 to-white dark:from-indigo-900/20 dark:to-slate-800 p-6 rounded-2xl shadow-sm border border-indigo-100 dark:border-indigo-900/30 mb-6 relative overflow-hidden">
  {/* Decoration */}
  <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
    <Bot size={120} className="text-indigo-600 dark:text-indigo-400" />
  </div>

  <div className="flex items-center gap-3 mb-4 relative z-10">
    <div className="p-2 bg-indigo-600 text-white rounded-lg shadow-lg shadow-indigo-200 dark:shadow-none">
      <Sparkles size={20} />
    </div>
    <div>
      <h3 className="text-lg font-bold text-gray-900 dark:text-white">AI 智能经营诊断</h3>
      <p className="text-xs text-indigo-600 dark:text-indigo-400 font-medium">基于所选周期内 1,248 位客户数据深度分析</p>
    </div>
  </div>

  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 relative z-10">
    {/* Left: Customer Structure */}
    <div className="bg-white/60 dark:bg-slate-900/40 backdrop-blur-sm rounded-xl p-4 border border-indigo-50 dark:border-indigo-500/20">
      <h4 className="text-sm font-bold text-gray-800 dark:text-white mb-3 flex items-center gap-2">
        <PieChartIcon size={16} className="text-indigo-500" /> 客户结构分布
      </h4>
      <div className="grid grid-cols-2 gap-4">
        {[
          { label: 'H级 (极高)', count: 62, percent: '5%', color: 'text-red-500', trend: '+2' },
          { label: 'A级 (高意向)', count: 435, percent: '35%', color: 'text-orange-500', trend: '+15' },
          { label: 'B级 (中意向)', count: 560, percent: '45%', color: 'text-blue-500', trend: '-8' },
          { label: 'C级 (一般)', count: 191, percent: '15%', color: 'text-gray-500', trend: '+5' },
        ].map((item, idx) => (
          <div key={idx} className="flex flex-col">
            <span className="text-xs text-gray-500 dark:text-gray-400 mb-1">{item.label}</span>
            <div className="flex items-baseline gap-2">
              <span className={`text-xl font-bold ${item.color}`}>{item.count}</span>
              <span className="text-xs text-gray-400">({item.percent})</span>
            </div>
            <span className={`text-[10px] flex items-center ${item.trend.startsWith('+') ? 'text-green-500' : 'text-red-500'}`}>
              {item.trend.startsWith('+') ? <TrendingUp size={10} className="mr-0.5" /> : <TrendingDown size={10} className="mr-0.5" />}
              {item.trend}
            </span>
          </div>
        ))}
      </div>
    </div>

    {/* Right: Strategy Advice */}
    <div className="lg:col-span-2 bg-white/60 dark:bg-slate-900/40 backdrop-blur-sm rounded-xl p-4 border border-indigo-50 dark:border-indigo-500/20 flex flex-col justify-center">
        <h4 className="text-sm font-bold text-gray-800 dark:text-white mb-3 flex items-center gap-2">
          <Lightbulb size={16} className="text-yellow-500" /> 经营策略建议
        </h4>
        <div className="space-y-3">
           <div className="flex gap-3 items-start">
              <span className="flex-shrink-0 w-5 h-5 rounded-full bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 flex items-center justify-center text-xs font-bold mt-0.5">1</span>
              <div>
                 <p className="text-sm font-bold text-gray-800 dark:text-gray-200 mb-0.5">重点突破 A级 客户转化</p>
                 <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">
                    本周 A 级客户占比达 35%，且环比增长明显。建议启动<span className="font-bold text-indigo-600 dark:text-indigo-400">“周末深度试驾营”</span>活动，集中邀约此类客户到店体验，配合限时金融方案促单，预计可提升转化率 5-8%。
                 </p>
              </div>
           </div>
           <div className="flex gap-3 items-start">
              <span className="flex-shrink-0 w-5 h-5 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 flex items-center justify-center text-xs font-bold mt-0.5">2</span>
              <div>
                 <p className="text-sm font-bold text-gray-800 dark:text-gray-200 mb-0.5">B级 客户需加强价值传递</p>
                 <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">
                    B 级客户中“价格抗拒”标签占比最高。建议销售顾问在跟进时侧重<span className="font-bold text-indigo-600 dark:text-indigo-400">“TCO拥车成本分析”</span>与<span className="font-bold text-indigo-600 dark:text-indigo-400">“保值回购政策”</span>解读，弱化裸车价格关注点。
                 </p>
              </div>
           </div>
        </div>
    </div>
  </div>
</div>

      {/* 2. Customer Portrait & Conversation Overview */}
      <div>
        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          <Users className="text-primary-500" size={20} /> 客户画像与话像总览
        </h3>
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          
          {/* Card 1: Volume Trend */}
          <div className="lg:col-span-2 bg-white dark:bg-slate-800 p-5 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-700">
            <div className="flex justify-between items-center mb-4">
              <h4 className="font-bold text-gray-800 dark:text-white text-sm">周期内客户总量与增长趋势</h4>
              <div className="flex items-center gap-2 text-xs">
                <span className="flex items-center gap-1 text-green-500 font-bold bg-green-50 dark:bg-green-900/20 px-2 py-0.5 rounded">
                  <TrendingUp size={12} /> +12.5%
                </span>
                <span className="text-gray-400">环比上周</span>
              </div>
            </div>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={VOLUME_TREND_DATA}>
                  <defs>
                    <linearGradient id="colorCurrent" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                  <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#94a3b8'}} />
                  <YAxis axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#94a3b8'}} />
                  <Tooltip contentStyle={{borderRadius: '8px'}} />
                  <Legend iconType="circle" />
                  <Area type="monotone" dataKey="current" name="本周期" stroke="#3b82f6" strokeWidth={3} fillOpacity={1} fill="url(#colorCurrent)" />
                  <Area type="monotone" dataKey="previous" name="上周期" stroke="#94a3b8" strokeDasharray="5 5" fill="transparent" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Card 2: Core Needs Word Cloud */}
          <div className="bg-white dark:bg-slate-800 p-5 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-700 flex flex-col">
            <h4 className="font-bold text-gray-800 dark:text-white text-sm mb-4">核心需求词云</h4>
            <div className="flex-1 flex flex-wrap content-center justify-center gap-3 p-2">
              {WORD_CLOUD_DATA.map((item, idx) => (
                <span 
                  key={idx} 
                  className="px-3 py-1 rounded-full text-sm font-medium transition-transform hover:scale-110 cursor-default"
                  style={{
                    backgroundColor: `${item.color}15`,
                    color: item.color,
                    fontSize: `${Math.max(12, item.value / 4)}px`,
                    border: `1px solid ${item.color}30`
                  }}
                >
                  {item.text}
                </span>
              ))}
            </div>
          </div>

          {/* Card 3: Pain Points */}
          <div className="bg-white dark:bg-slate-800 p-5 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-700">
            <h4 className="font-bold text-gray-800 dark:text-white text-sm mb-4">痛点与抱怨 TOP 5</h4>
            <div className="space-y-4">
              {COMPLAINT_TOP5.map((item, idx) => (
                <div key={idx}>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-gray-600 dark:text-gray-300">{item.name}</span>
                    <span className="font-bold text-red-500">{item.percentage}</span>
                  </div>
                  <div className="w-full bg-gray-100 dark:bg-slate-700 h-2 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-red-400 rounded-full" 
                      style={{ width: item.percentage }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>

      {/* 3. Intent Level & Sales Feedback */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Intent Distribution */}
        <div className="bg-white dark:bg-slate-800 p-5 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-700">
          <h4 className="font-bold text-gray-800 dark:text-white text-sm mb-4 flex items-center gap-2">
            <Target size={16} className="text-blue-500" /> 客户意向等级分布
          </h4>
          <div className="h-48 relative">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={INTENT_DISTRIBUTION}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {INTENT_DISTRIBUTION.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <span className="text-2xl font-bold text-gray-900 dark:text-white">1,248</span>
              <span className="text-xs text-gray-500">总客户数</span>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2 mt-4">
            {INTENT_DISTRIBUTION.map((item, idx) => (
              <div key={idx} className="flex items-center gap-2 text-xs">
                <span className="w-2 h-2 rounded-full" style={{backgroundColor: item.color}}></span>
                <span className="text-gray-600 dark:text-gray-300">{item.name}</span>
                <span className="font-bold ml-auto">{item.value}%</span>
              </div>
            ))}
          </div>
        </div>

        {/* Sales Resistance & Feedback */}
        <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
           
           {/* Resistance */}
           <div className="bg-white dark:bg-slate-800 p-5 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-700">
              <h4 className="font-bold text-gray-800 dark:text-white text-sm mb-4 flex items-center gap-2">
                <AlertTriangle size={16} className="text-orange-500" /> 销售抗拒点 TOP 5
              </h4>
              <div className="h-48">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={RESISTANCE_TOP5} layout="vertical" margin={{ left: 20 }}>
                    <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#e2e8f0" />
                    <XAxis type="number" hide />
                    <YAxis dataKey="name" type="category" width={60} tick={{fontSize: 12, fill: '#64748b'}} axisLine={false} tickLine={false} />
                    <Tooltip cursor={{fill: 'transparent'}} contentStyle={{borderRadius: '8px'}} />
                    <Bar dataKey="value" fill="#f97316" radius={[0, 4, 4, 0]} barSize={20} label={{ position: 'right', fill: '#f97316', fontSize: 12 }} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
           </div>

           {/* Golden Scripts */}
           <div className="bg-white dark:bg-slate-800 p-5 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-700 flex flex-col">
              <h4 className="font-bold text-gray-800 dark:text-white text-sm mb-4 flex items-center gap-2">
                <Sparkles size={16} className="text-yellow-500" /> 转化成功关键句 (金牌话术)
              </h4>
              <div className="flex-1 space-y-3 overflow-y-auto pr-2 custom-scrollbar max-h-48">
                 {GOLDEN_SCRIPTS.map((script, idx) => (
                    <div key={idx} className="bg-gradient-to-r from-yellow-50 to-white dark:from-yellow-900/10 dark:to-slate-800 p-3 rounded-lg border border-yellow-100 dark:border-yellow-900/20">
                       <span className="text-xs font-bold text-yellow-700 dark:text-yellow-500 mb-1 block">#{script.title}</span>
                       <p className="text-xs text-gray-600 dark:text-gray-300 italic leading-relaxed">
                          {script.content}
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

const DetailView: React.FC<{ customer: Customer, onBack: () => void }> = ({ customer, onBack }) => {
  const [activeTab, setActiveTab] = useState<'info' | 'journey'>('info');
  const [selectedInteraction, setSelectedInteraction] = useState<any | null>(null);

  const handleInteractionClick = (interaction: any) => {
      setSelectedInteraction(interaction);
  };

  if (activeTab === 'journey' && selectedInteraction) {
      return <JourneyInteractionDetail interaction={selectedInteraction} onBack={() => setSelectedInteraction(null)} />;
  }

  return (
    <div className="space-y-6 animate-fade-in pb-10 relative">
      {/* Header Navigation */}
      <div className="flex items-center justify-between sticky top-0 z-10 bg-gray-50 dark:bg-slate-900 py-2">
        <div className="flex items-center gap-4">
          <button 
            onClick={onBack}
            className="p-2 hover:bg-gray-200 dark:hover:bg-slate-700 rounded-lg transition-colors"
          >
            <ArrowLeft size={20} className="text-gray-600 dark:text-gray-300" />
          </button>
          <div className="flex gap-6 text-sm font-medium">
              <button 
                onClick={() => setActiveTab('info')}
                className={`${activeTab === 'info' ? 'text-primary-600 border-b-2 border-primary-600' : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200'} pb-1 transition-colors`}
              >
                客户信息
              </button>
              <button 
                onClick={() => setActiveTab('journey')}
                className={`${activeTab === 'journey' ? 'text-primary-600 border-b-2 border-primary-600' : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200'} pb-1 transition-colors`}
              >
                客户旅程
              </button>
          </div>
        </div>
      </div>

      {activeTab === 'info' && (
        <div className="space-y-6">
          {/* 1. Header Metrics Strip */}
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-slate-700 flex flex-wrap justify-between items-center text-center gap-4">
              <div className="flex-1 min-w-[100px]">
                  <p className="text-xs text-gray-400 mb-1">意向车型</p>
                  <p className="text-xl font-bold text-gray-800 dark:text-white">{customer.model}</p>
              </div>
              <div className="w-px h-8 bg-gray-100 dark:bg-slate-700 hidden md:block"></div>
              <div className="flex-1 min-w-[100px]">
                  <p className="text-xs text-gray-400 mb-1">客户等级</p>
                  <p className="text-xl font-bold text-gray-800 dark:text-white">{customer.level.replace('级', '')}</p>
              </div>
              <div className="w-px h-8 bg-gray-100 dark:bg-slate-700 hidden md:block"></div>
              <div className="flex-1 min-w-[100px]">
                  <p className="text-xs text-gray-400 mb-1">最近沟通日期</p>
                  <p className="text-xl font-bold text-gray-800 dark:text-white">2023.03.05<span className="text-xs text-gray-400 font-normal ml-1">/1天前</span></p>
              </div>
              <div className="w-px h-8 bg-gray-100 dark:bg-slate-700 hidden md:block"></div>
              <div className="flex-1 min-w-[100px]">
                  <p className="text-xs text-gray-400 mb-1">客户进度</p>
                  <p className="text-xl font-bold text-gray-800 dark:text-white">进店<span className="text-xs text-gray-400 font-normal ml-1">/未试驾</span></p>
              </div>
              <div className="w-px h-8 bg-gray-100 dark:bg-slate-700 hidden md:block"></div>
              <div className="flex-1 min-w-[100px]">
                  <p className="text-xs text-gray-400 mb-1">客户当前成交痛点</p>
                  <p className="text-xl font-bold text-gray-800 dark:text-white">家人&竞品比较</p>
              </div>
              <div className="w-px h-8 bg-gray-100 dark:bg-slate-700 hidden md:block"></div>
              <div className="flex-1 min-w-[100px]">
                  <p className="text-xs text-gray-400 mb-1">客户成交预测</p>
                  <p className="text-xl font-bold text-gray-800 dark:text-white">{customer.score}分</p>
              </div>
          </div>

          {/* 2. Charts Row 1: Communication & Topics */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Communication Channel */}
              <div className="bg-white dark:bg-slate-800 p-5 rounded-xl shadow-sm border border-gray-100 dark:border-slate-700">
                  <h4 className="text-sm font-medium text-gray-500 mb-4">沟通渠道分布</h4>
                  <div className="h-40 flex items-center justify-center relative">
                      <DonutChart data={CHANNEL_DATA} centerText={{title: '主渠道', value: '线下'}} />
                  </div>
                  <div className="flex justify-center gap-3 mt-2">
                       {CHANNEL_DATA.map((item, i) => (
                           <div key={i} className="flex items-center gap-1">
                               <span className="w-2 h-2 rounded-full" style={{backgroundColor: item.color}}></span>
                               <span className="text-[10px] text-gray-500">{item.name}</span>
                           </div>
                       ))}
                  </div>
              </div>

              {/* Duration */}
              <div className="bg-white dark:bg-slate-800 p-5 rounded-xl shadow-sm border border-gray-100 dark:border-slate-700">
                  <h4 className="text-sm font-medium text-gray-500 mb-4">渠道沟通时长</h4>
                  <div className="h-40">
                       <ResponsiveContainer width="100%" height="100%">
                          <BarChart data={DURATION_DATA} barSize={20}>
                              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 10, fill: '#94a3b8'}} />
                              <Tooltip cursor={{fill: 'transparent'}} contentStyle={{borderRadius: '8px', border:'none', boxShadow:'0 2px 10px rgba(0,0,0,0.1)'}} />
                              <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                                  {DURATION_DATA.map((entry, index) => (
                                      <Cell key={`cell-${index}`} fill={entry.fill} />
                                  ))}
                              </Bar>
                          </BarChart>
                       </ResponsiveContainer>
                  </div>
                  <div className="flex justify-center gap-3 mt-2">
                       {DURATION_DATA.map((item, i) => (
                           <div key={i} className="flex items-center gap-1">
                               <span className="w-2 h-2 rounded-full" style={{backgroundColor: item.fill}}></span>
                               <span className="text-[10px] text-gray-500">{item.name}</span>
                           </div>
                       ))}
                  </div>
              </div>

              {/* Topic Distribution */}
              <div className="bg-white dark:bg-slate-800 p-5 rounded-xl shadow-sm border border-gray-100 dark:border-slate-700">
                  <h4 className="text-sm font-medium text-gray-500 mb-4">话题主题分布</h4>
                  <div className="h-40 flex items-center justify-center relative">
                      <DonutChart data={TOPIC_DATA} centerText={{title: 'Top', value: '智驾'}} />
                  </div>
                   <div className="grid grid-cols-2 gap-x-2 gap-y-1 mt-2 px-2">
                       {TOPIC_DATA.map((item, i) => (
                           <div key={i} className="flex items-center gap-1 justify-between">
                               <div className="flex items-center gap-1">
                                  <span className="w-2 h-2 rounded-full" style={{backgroundColor: item.color}}></span>
                                  <span className="text-[10px] text-gray-500">{item.name}</span>
                               </div>
                               <span className="text-[10px] text-gray-400">{item.value}%</span>
                           </div>
                       ))}
                  </div>
              </div>
          </div>

          {/* 3. Charts Row 2: Analysis */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Customer Focus */}
              <div className="bg-white dark:bg-slate-800 p-5 rounded-xl shadow-sm border border-gray-100 dark:border-slate-700">
                  <h4 className="text-sm font-medium text-gray-500 mb-4">客户关注分布</h4>
                  <div className="h-40 flex items-center justify-center relative">
                      <DonutChart data={FOCUS_DATA} />
                  </div>
                  <div className="space-y-3 mt-4">
                       <div className="flex items-start gap-2 text-xs text-gray-500 dark:text-gray-400">
                           <span className="w-2 h-2 rounded-full bg-blue-500 mt-1 flex-shrink-0"></span>
                           <p><span className="font-bold text-gray-700 dark:text-gray-200">智能驾驶辅助功能</span>: 提及次数最多，客户对自适应巡航、自动泊车等功能表现出兴趣</p>
                       </div>
                       <div className="flex items-start gap-2 text-xs text-gray-500 dark:text-gray-400">
                           <span className="w-2 h-2 rounded-full bg-blue-500 mt-1 flex-shrink-0"></span>
                           <p><span className="font-bold text-gray-700 dark:text-gray-200">价格与金融方案</span>: 客户多次询问价格优惠、首付比例及月供情况</p>
                       </div>
                  </div>
              </div>

              {/* Customer Resistance */}
              <div className="bg-white dark:bg-slate-800 p-5 rounded-xl shadow-sm border border-gray-100 dark:border-slate-700">
                  <h4 className="text-sm font-medium text-gray-500 mb-4">客户抗拒分布</h4>
                  <div className="h-40 flex items-center justify-center relative">
                      <DonutChart data={RESISTANCE_DATA} />
                  </div>
                  <div className="space-y-3 mt-4">
                       <div className="flex items-start gap-2 text-xs text-gray-500 dark:text-gray-400">
                           <span className="w-2 h-2 rounded-full bg-red-400 mt-1 flex-shrink-0"></span>
                           <p><span className="font-bold text-gray-700 dark:text-gray-200">车辆价格</span>: 客户质疑一口价且比较竞品价格</p>
                       </div>
                       <div className="flex items-start gap-2 text-xs text-gray-500 dark:text-gray-400">
                           <span className="w-2 h-2 rounded-full bg-blue-500 mt-1 flex-shrink-0"></span>
                           <p><span className="font-bold text-gray-700 dark:text-gray-200">车辆动力</span>: 客户质疑国内的发动机比国外的发动机是减配版</p>
                       </div>
                  </div>
              </div>

              {/* Competitor Focus */}
              <div className="bg-white dark:bg-slate-800 p-5 rounded-xl shadow-sm border border-gray-100 dark:border-slate-700">
                  <h4 className="text-sm font-medium text-gray-500 mb-4">竞品关注分布</h4>
                  <div className="h-40 flex items-center justify-center relative">
                      <DonutChart data={COMPETITOR_DATA} />
                  </div>
                   <div className="space-y-3 mt-4">
                       <div className="flex items-start gap-2 text-xs text-gray-500 dark:text-gray-400">
                           <span className="w-2 h-2 rounded-full bg-pink-500 mt-1 flex-shrink-0"></span>
                           <p><span className="font-bold text-gray-700 dark:text-gray-200">价格差异</span>: 直接对比竞品价格更低</p>
                       </div>
                       <div className="flex items-start gap-2 text-xs text-gray-500 dark:text-gray-400">
                           <span className="w-2 h-2 rounded-full bg-blue-500 mt-1 flex-shrink-0"></span>
                           <p><span className="font-bold text-gray-700 dark:text-gray-200">性能参数</span>: 竞品马力/功率数据更优</p>
                       </div>
                       <div className="flex items-start gap-2 text-xs text-gray-500 dark:text-gray-400">
                           <span className="w-2 h-2 rounded-full bg-green-500 mt-1 flex-shrink-0"></span>
                           <p><span className="font-bold text-gray-700 dark:text-gray-200">配置参数</span>: 竞品硬件规格更高</p>
                       </div>
                   </div>
              </div>
          </div>

          {/* 4. Strategy & Tactics */}
          <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-slate-700">
               <div className="flex justify-between items-center mb-4">
                   <h4 className="text-sm font-medium text-gray-500">建议跟进策略 (AI生成 - 建议跟进时间: 2024年3月15日 上午9点)</h4>
                   <Edit3 size={16} className="text-gray-400 hover:text-primary-600 cursor-pointer" />
               </div>
               <div className="bg-gray-50 dark:bg-slate-700/30 p-4 rounded-lg">
                  <p className="text-sm font-bold text-gray-800 dark:text-white mb-2">重点提及话术：</p>
                  <ol className="list-decimal list-inside space-y-2 text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                      <li><span className="font-bold">价格锚定+权益绑定</span>：制作竞品配置对比表突出安全/科技优势，推出保价协议+0息金融方案，邀约客户参与对比试驾强化价值感知。</li>
                      <li><span className="font-bold">动力实证化解</span>：展示缸内直喷技术参数，安排满载山路试驾并提供扭矩数据记录仪，直观验证动力性能。</li>
                      <li><span className="font-bold">关税风险对冲</span>：签订差价返还协议并赠送关税保险，转移客户价格波动焦虑，同步强调3年保值回购政策。</li>
                      <li><span className="font-bold">空间场景化破冰</span>：拍摄家庭出行装载视频，现场实测客户自有物品装载能力，赠送定制储物套装提升空间利用率。</li>
                      <li><span className="font-bold">限时成交组合拳</span>：设置2小时专属体验时段（技术讲解+场景试写），当日下定享出行礼包+优先提车权，持续推送第三方评测强化决策。</li>
                  </ol>
               </div>
               <div className="mt-2 text-center">
                  <button className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200">
                     <ChevronDown size={20} />
                  </button>
               </div>
          </div>
        </div>
      )}

      {activeTab === 'journey' && (
        <div className="space-y-8 animate-fade-in">
            {/* Progress Bar */}
            <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-slate-700">
                <div className="flex items-center justify-between px-4 md:px-10">
                    {JOURNEY_STAGES.map((step, index) => (
                        <div key={index} className="flex flex-col items-center relative z-10">
                            <div className={`w-12 h-12 rounded-full flex items-center justify-center text-white mb-2 transition-colors duration-300 ${
                                step.status === 'completed' ? 'bg-indigo-600' :
                                step.status === 'current' ? 'bg-primary-500 ring-4 ring-primary-100 dark:ring-primary-900/30' :
                                'bg-gray-200 dark:bg-slate-600 text-gray-400'
                            }`}>
                                <step.icon size={20} />
                            </div>
                            <span className={`text-sm font-medium ${
                                step.status === 'pending' ? 'text-gray-400' : 'text-gray-800 dark:text-white'
                            }`}>
                                {step.name}
                            </span>
                        </div>
                    ))}
                    
                    {/* Connector Line */}
                    <div className="absolute top-12 left-0 w-full px-10 md:px-16 flex items-center h-0 pointer-events-none -z-0">
                        <div className="w-full h-1 bg-gray-100 dark:bg-slate-700 flex">
                            <div className="h-full bg-indigo-500 w-1/2"></div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Timeline Feed */}
            <div className="space-y-6">
                {JOURNEY_TIMELINE.map((group, gIndex) => (
                    <div key={gIndex}>
                        <h4 className="text-sm font-bold text-gray-500 dark:text-gray-400 mb-4 pl-2">{group.dateGroup}</h4>
                        <div className="space-y-4">
                            {group.events.map((event, eIndex) => (
                                <div 
                                    key={eIndex} 
                                    className="bg-white dark:bg-slate-800 p-5 rounded-xl shadow-sm border border-gray-100 dark:border-slate-700 hover:shadow-md transition-shadow cursor-pointer"
                                    onClick={() => handleInteractionClick(event)}
                                >
                                    {/* Header Row */}
                                    <div className="flex justify-between items-start mb-4">
                                        <div className="flex items-center gap-4">
                                            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-white ${
                                                event.color === 'blue' ? 'bg-blue-500 shadow-blue-200 dark:shadow-none' : 
                                                event.color === 'green' ? 'bg-green-500 shadow-green-200 dark:shadow-none' : 
                                                'bg-purple-500 shadow-purple-200 dark:shadow-none'
                                            }`}>
                                                <event.icon size={24} />
                                            </div>
                                            <div>
                                                <div className="flex items-center gap-2">
                                                    <h5 className="text-base font-bold text-gray-900 dark:text-white group-hover:text-primary-600 transition-colors">{event.title}</h5>
                                                    <span className="text-xs text-gray-400 font-mono">{event.time}</span>
                                                </div>
                                                <div className="flex items-center gap-2 mt-1">
                                                    <img src={event.advisorAvatar} className="w-5 h-5 rounded-full" alt="adv"/>
                                                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{event.advisor}</span>
                                                    <span className="text-xs text-gray-400">接待了</span>
                                                    <img src={event.customerAvatar} className="w-5 h-5 rounded-full" alt="cust"/>
                                                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{event.customer}</span>
                                                </div>
                                            </div>
                                        </div>
                                        
                                        <div className="flex items-center gap-4">
                                            <div className="flex items-center gap-1 text-xs text-gray-400">
                                                <Clock size={14} /> 时长: {event.duration}
                                            </div>
                                            {event.advisorRatio && (
                                                <div className="flex items-center gap-2" title="会话占比: 绿色(顾问) / 蓝色(客户)">
                                                    <div className="flex items-center gap-1">
                                                        <div className="w-16 h-2 rounded-full overflow-hidden flex bg-gray-200 dark:bg-slate-700">
                                                            <div className="h-full bg-green-500" style={{ width: `${event.advisorRatio}%` }}></div>
                                                            <div className="h-full bg-blue-500" style={{ width: `${100 - event.advisorRatio}%` }}></div>
                                                        </div>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    {/* Tags Row */}
                                    <div className="flex flex-wrap gap-2 mb-4 pl-[4.5rem]">
                                        {event.tags.map((tag: any, tIndex: number) => (
                                            <span key={tIndex} className={`px-2 py-1 rounded text-xs font-bold ${
                                                tag.type === 'customer' 
                                                    ? 'bg-purple-50 text-purple-600 dark:bg-purple-900/20 dark:text-purple-300' 
                                                    : 'bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-300'
                                            }`}>
                                                {tag.text}
                                            </span>
                                        ))}
                                    </div>

                                    {/* Content/Summary Box */}
                                    <div className="ml-[4.5rem] bg-gray-50 dark:bg-slate-700/30 p-4 rounded-lg text-sm text-gray-600 dark:text-gray-300 leading-relaxed mb-3">
                                        {event.summary}
                                    </div>
                                    
                                    {/* Action Button */}
                                    <div className="ml-[4.5rem] flex items-center justify-between">
                                        <button className="flex items-center gap-2 px-3 py-1.5 bg-gray-100 dark:bg-slate-700 hover:bg-gray-200 dark:hover:bg-slate-600 rounded text-xs font-bold text-gray-700 dark:text-gray-200 transition-colors">
                                            {event.action}
                                        </button>
                                        <span className="text-xs text-primary-600 font-medium flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                            查看详情 <ChevronRight size={14} />
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
      )}
    </div>
  );
};

// --- Main Page ---

const CustomerManagement: React.FC = () => {
  const [viewMode, setViewMode] = useState<'dashboard' | 'list'>('dashboard');
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredList = MOCK_CUSTOMERS.filter(c => c.name.includes(searchTerm) || c.phone.includes(searchTerm));

  const handleCustomerClick = (c: Customer) => {
    setSelectedCustomer(c);
  };

  if (selectedCustomer) {
    return <DetailView customer={selectedCustomer} onBack={() => setSelectedCustomer(null)} />;
  }

  return (
    <div className="space-y-6 animate-fade-in pb-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">客户管理</h2>
          <p className="text-sm text-gray-500 mt-1">全周期客户资产管理与价值挖掘</p>
        </div>
        
        {/* Toggle */}
        <div className="bg-gray-100 dark:bg-slate-800 p-1.5 rounded-xl inline-flex items-center gap-1 border border-gray-200 dark:border-slate-700">
           <button
             onClick={() => setViewMode('dashboard')}
             className={`px-6 py-2.5 rounded-lg text-sm font-bold flex items-center gap-2 transition-all duration-200 ${
               viewMode === 'dashboard'
                 ? 'bg-white dark:bg-slate-600 text-primary-600 dark:text-primary-400 shadow-sm ring-1 ring-black/5 dark:ring-white/10'
                 : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 hover:bg-gray-200/50 dark:hover:bg-slate-700/50'
             }`}
           >
             <LayoutDashboard size={18} className={viewMode === 'dashboard' ? 'text-primary-600 dark:text-primary-400' : 'text-gray-400'} />
             <span>整体分析</span>
           </button>
           <button
             onClick={() => setViewMode('list')}
             className={`px-6 py-2.5 rounded-lg text-sm font-bold flex items-center gap-2 transition-all duration-200 ${
               viewMode === 'list'
                 ? 'bg-white dark:bg-slate-600 text-primary-600 dark:text-primary-400 shadow-sm ring-1 ring-black/5 dark:ring-white/10'
                 : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 hover:bg-gray-200/50 dark:hover:bg-slate-700/50'
             }`}
           >
             <List size={18} className={viewMode === 'list' ? 'text-primary-600 dark:text-primary-400' : 'text-gray-400'} />
             <span>列表明细</span>
           </button>
        </div>
      </div>

      {viewMode === 'dashboard' ? (
        <AnalysisDashboard />
      ) : (
        <div className="space-y-4 animate-fade-in">
           {/* List Search Bar */}
           <div className="flex justify-between items-center bg-white dark:bg-slate-800 p-4 rounded-xl border border-gray-100 dark:border-slate-700">
              <div className="relative">
                 <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                 <input 
                   type="text" 
                   placeholder="搜索客户姓名/手机号..." 
                   value={searchTerm}
                   onChange={(e) => setSearchTerm(e.target.value)}
                   className="pl-9 pr-4 py-2 bg-gray-50 dark:bg-slate-700 border border-gray-200 dark:border-slate-600 rounded-lg text-sm outline-none focus:ring-2 focus:ring-primary-500 w-64 dark:text-white"
                 />
              </div>
              <button className="flex items-center gap-2 px-4 py-2 bg-primary-600 text-white rounded-lg text-sm font-medium hover:bg-primary-700 transition-colors shadow-sm">
                 <Plus size={16} /> 新增档案
              </button>
           </div>

           {/* Table */}
           <div className="bg-white dark:bg-slate-800 rounded-xl border border-gray-100 dark:border-slate-700 overflow-hidden">
              <table className="w-full text-left">
                 <thead className="bg-gray-50 dark:bg-slate-700/50 text-gray-600 dark:text-gray-300 text-sm font-bold">
                    <tr>
                       <th className="px-6 py-4">客户姓名</th>
                       <th className="px-6 py-4">意向车型</th>
                       <th className="px-6 py-4">预算范围</th>
                       <th className="px-6 py-4">客户等级</th>
                       <th className="px-6 py-4">当前阶段</th>
                       <th className="px-6 py-4">归属顾问</th>
                       <th className="px-6 py-4">成交预测</th>
                       <th className="px-6 py-4 text-right">操作</th>
                    </tr>
                 </thead>
                 <tbody className="divide-y divide-gray-100 dark:divide-slate-700">
                    {filteredList.map((c, index) => (
                       <tr 
                         key={c.id} 
                         className="hover:bg-gray-50 dark:hover:bg-slate-700/30 transition-colors cursor-pointer group"
                         onClick={() => handleCustomerClick(c)}
                       >
                          <td className="px-6 py-4">
                             <div className="flex items-center gap-3">
                                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm ${
                                    index % 3 === 0 ? 'bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400' :
                                    index % 3 === 1 ? 'bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400' :
                                    'bg-indigo-100 text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-400'
                                }`}>
                                   {c.name.charAt(0)}
                                </div>
                                <div>
                                   <p className="text-base font-bold text-gray-900 dark:text-white">{c.name}</p>
                                   <p className="text-xs text-gray-400 font-medium">{c.phone}</p>
                                </div>
                             </div>
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-300">{c.model}</td>
                          <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-300">{c.budget}</td>
                          <td className="px-6 py-4">
                             <span className="px-2.5 py-1 rounded text-xs font-bold bg-red-50 text-red-500 dark:bg-red-900/20 dark:text-red-400 border border-red-100 dark:border-red-900/30">
                                {c.level}
                             </span>
                          </td>
                          <td className="px-6 py-4">
                             <span className={`px-3 py-1.5 rounded-full text-xs font-medium ${
                                c.stage === '邀约' ? 'bg-gray-100 text-gray-700 dark:bg-slate-700 dark:text-gray-300' :
                                c.stage === '展厅接待' ? 'bg-gray-200 text-gray-800 dark:bg-slate-600 dark:text-gray-200' :
                                c.stage === '试乘试驾' ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400' :
                                c.stage === '谈判报价' ? 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400' :
                                'bg-green-100 text-green-700'
                             }`}>
                                {c.stage}
                             </span>
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-300">{c.advisor}</td>
                          <td className="px-6 py-4">
                             <div className="flex items-center gap-3 w-32">
                                <div className="flex-1 bg-gray-200 dark:bg-slate-700 h-2 rounded-full overflow-hidden">
                                   <div 
                                     className={`h-full rounded-full ${c.score >= 80 ? 'bg-green-500' : 'bg-blue-500'}`} 
                                     style={{width: `${c.score}%`}}
                                   ></div>
                                </div>
                                <span className="text-sm font-bold text-gray-900 dark:text-white w-6 text-right">{c.score}</span>
                             </div>
                          </td>
                          <td className="px-6 py-4 text-right">
                             <ChevronRight size={18} className="text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-200 ml-auto" />
                          </td>
                       </tr>
                    ))}
                 </tbody>
              </table>
           </div>
        </div>
      )}

      <AIAssistant context="customer_insights" />
    </div>
  );
};

export default CustomerManagement;
