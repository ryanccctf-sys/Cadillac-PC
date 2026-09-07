
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
  ChevronRight as ChevronRightIcon,
  Zap,
  CreditCard,
  Mic,
  MoreHorizontal,
  PlayCircle,
  Download,
  Edit3,
  Plus,
  Mail,
  Store,
  Car,
  Tag,
  Gavel,
  Award,
  Battery,
  Signal,
  Play,
  Pause,
  Volume2,
  SkipForward
} from 'lucide-react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell,
  PieChart, Pie
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
  tradeIn: string; // 是否置换
  
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

// --- Chart Data Mocks ---

const CHANNEL_DATA = [
  { name: '线下接待', value: 60, color: '#3b82f6' },
  { name: '企微', value: 30, color: '#f97316' },
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

// --- Journey Mock Data ---
const JOURNEY_STAGES = [
    { name: '邀约', icon: Mail, status: 'completed' },
    { name: '进店', icon: Store, status: 'completed' },
    { name: '试驾', icon: Car, status: 'current' },
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
                icon: Mic, // Audio/Badge
                title: '客户到店',
                time: '14:40-15:00',
                customerName: '张海思',
                advisorName: '王泽祥',
                duration: '2小时19分10秒',
                tags: [
                    { text: '客户顾虑价格', type: 'customer' },
                    { text: '顾问强调价值', type: 'advisor' }
                ],
                summary: '客户解答了关于车辆参数的问题：包括车身尺寸、动力配置、续航里程等。客户对车辆的性能表现和细节非常关注多位客户解答了关于车辆参数的问题：包括车身尺寸、动力配置、续航里程等。',
                action: '共33条消息'
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
                customerName: '张海思',
                advisorName: '王泽祥',
                duration: '20分10秒',
                tags: [
                    { text: '客户顾虑价格', type: 'customer' },
                    { text: '顾问强调调性', type: 'advisor' }
                ],
                summary: '客户解答了关于车辆参数的问题：包括车身尺寸、动力配置、续航里程等。客户对车辆的性能表现和细节非常关注多位客户解答了关于车辆参数的问题：包括车身尺寸、动力配置、续航里程等。',
                action: '共33条消息'
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
                customerName: '张海思',
                advisorName: '王泽祥',
                duration: '18分10秒',
                tags: [
                    { text: '客户顾虑价格', type: 'customer' },
                    { text: '顾问强调价值', type: 'advisor' }
                ],
                summary: '客户解答了关于车辆参数的问题：包括车身尺寸、动力配置、续航里程等。客户对车辆的性能表现和细节非常关注多位客户解答了关于车辆参数的问题：包括车身尺寸、动力配置、续航里程等。',
                action: '共33条消息'
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
        tags: ['购车预算*2算范围', '购买性质*1']
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

// --- Helper Components ---

const DonutChart = ({ data }: { data: any[] }) => (
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
    </PieChart>
  </ResponsiveContainer>
);

// --- Journey Detail Component ---

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

// --- Main Component ---

const CustomerArchives: React.FC = () => {
  const [view, setView] = useState<'list' | 'detail'>('list');
  const [selectedCustomer, setSelectedCustomer] = useState<CustomerDetail | null>(null);
  const [activeTab, setActiveTab] = useState<'info' | 'journey'>('info');
  
  // Journey Detail State
  const [selectedInteraction, setSelectedInteraction] = useState<any | null>(null);

  // Filters & Pagination
  const [searchTerm, setSearchTerm] = useState('');
  const [advisorFilter, setAdvisorFilter] = useState('全部顾问');

  const handleViewDetail = (customer: CustomerDetail) => {
    setSelectedCustomer(customer);
    setView('detail');
    // Reset inner states
    setActiveTab('info');
    setSelectedInteraction(null);
  };

  const handleBack = () => {
    setView('list');
    setSelectedCustomer(null);
  };
  
  const handleInteractionClick = (event: any) => {
      setSelectedInteraction(event);
  };

  const filteredCustomers = MOCK_CUSTOMERS.filter(c => {
    const matchesSearch = c.name.includes(searchTerm) || c.phone.includes(searchTerm);
    const matchesAdvisor = advisorFilter === '全部顾问' || c.advisor === advisorFilter;
    return matchesSearch && matchesAdvisor;
  });

  // --- Detail View ---
  if (view === 'detail' && selectedCustomer) {
    
    // If an interaction is selected, show its detail view
    if (activeTab === 'journey' && selectedInteraction) {
        return <JourneyInteractionDetail interaction={selectedInteraction} onBack={() => setSelectedInteraction(null)} />;
    }

    return (
      <div className="space-y-6 animate-fade-in pb-10 relative">
        {/* Header Navigation */}
        <div className="flex items-center justify-between sticky top-0 z-10 bg-gray-50 dark:bg-slate-900 py-2">
          <div className="flex items-center gap-4">
            <button 
              onClick={handleBack}
              className="p-2 hover:bg-gray-200 dark:hover:bg-slate-700 rounded-lg transition-colors"
            >
              <ArrowLeft size={20} className="text-gray-600 dark:text-gray-300" />
            </button>
            <div className="flex gap-6 text-sm font-medium">
                <button 
                  onClick={() => setActiveTab('info')}
                  className={`${activeTab === 'info' ? 'text-primary-600 border-b-2 border-primary-600' : 'text-gray-500 hover:text-gray-700'} pb-1 transition-colors`}
                >
                  客户信息
                </button>
                <button 
                  onClick={() => setActiveTab('journey')}
                  className={`${activeTab === 'journey' ? 'text-primary-600 border-b-2 border-primary-600' : 'text-gray-500 hover:text-gray-700'} pb-1 transition-colors`}
                >
                  客户旅程
                </button>
            </div>
          </div>
        </div>

        {/* Content Layout */}
        <div className="flex flex-col xl:flex-row gap-6">
            
            {/* === LEFT MAIN COLUMN (Overview) === */}
            <div className="flex-1 space-y-6">
                
                {activeTab === 'info' ? (
                <>
                {/* 1. Header Metrics Strip */}
                <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-slate-700 flex flex-wrap justify-between items-center text-center gap-4">
                    <div className="flex-1 min-w-[100px]">
                        <p className="text-xs text-gray-400 mb-1">意向车型</p>
                        <p className="text-xl font-bold text-gray-800 dark:text-white">{selectedCustomer.intendedModel}</p>
                    </div>
                    <div className="w-px h-8 bg-gray-100 dark:bg-slate-700 hidden md:block"></div>
                    <div className="flex-1 min-w-[100px]">
                        <p className="text-xs text-gray-400 mb-1">客户等级</p>
                        <p className="text-xl font-bold text-gray-800 dark:text-white">{selectedCustomer.level}</p>
                    </div>
                    <div className="w-px h-8 bg-gray-100 dark:bg-slate-700 hidden md:block"></div>
                    <div className="flex-1 min-w-[100px]">
                        <p className="text-xs text-gray-400 mb-1">最近沟通日期</p>
                        <p className="text-xl font-bold text-gray-800 dark:text-white">{selectedCustomer.firstVisitDate}<span className="text-xs text-gray-400 font-normal ml-1">/{selectedCustomer.lastFollowUp}</span></p>
                    </div>
                    <div className="w-px h-8 bg-gray-100 dark:bg-slate-700 hidden md:block"></div>
                    <div className="flex-1 min-w-[100px]">
                        <p className="text-xs text-gray-400 mb-1">客户进度</p>
                        <p className="text-xl font-bold text-gray-800 dark:text-white">进店<span className="text-xs text-gray-400 font-normal ml-1">/未试驾</span></p>
                    </div>
                    <div className="w-px h-8 bg-gray-100 dark:bg-slate-700 hidden md:block"></div>
                    <div className="flex-1 min-w-[100px]">
                        <p className="text-xs text-gray-400 mb-1">客户当前成交痛点</p>
                        <p className="text-xl font-bold text-gray-800 dark:text-white">{selectedCustomer.nextStep}</p>
                    </div>
                    <div className="w-px h-8 bg-gray-100 dark:bg-slate-700 hidden md:block"></div>
                    <div className="flex-1 min-w-[100px]">
                        <p className="text-xs text-gray-400 mb-1">客户成交预测</p>
                        <p className="text-xl font-bold text-gray-800 dark:text-white">{selectedCustomer.predictionScore}分</p>
                    </div>
                </div>

                {/* 2. Charts Row 1: Communication & Topics */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Communication Channel */}
                    <div className="bg-white dark:bg-slate-800 p-5 rounded-xl shadow-sm border border-gray-100 dark:border-slate-700">
                        <h4 className="text-sm font-medium text-gray-500 mb-4">沟通渠道分布</h4>
                        <div className="h-40 flex items-center justify-center relative">
                            <DonutChart data={CHANNEL_DATA} />
                            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                                <div className="text-center">
                                    <span className="text-xs text-gray-400">主渠道</span>
                                    <p className="text-sm font-bold text-gray-800 dark:text-white">线下</p>
                                </div>
                            </div>
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
                            <DonutChart data={TOPIC_DATA} />
                             <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                                <div className="text-center">
                                    <span className="text-xs text-gray-400">Top</span>
                                    <p className="text-sm font-bold text-gray-800 dark:text-white">智驾</p>
                                </div>
                            </div>
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
                                 <span className="w-2 h-2 rounded-full bg-orange-400 mt-1 flex-shrink-0"></span>
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
                           <ChevronRightIcon className="rotate-90" size={20} />
                        </button>
                     </div>
                </div>
                </>
                ) : (
                /* === JOURNEY TAB === */
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
                                                        event.type === 'visit' ? 'bg-blue-500 shadow-blue-200 dark:shadow-none' : 
                                                        event.type === 'chat' ? 'bg-green-500 shadow-green-200 dark:shadow-none' : 
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
                                                            <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${event.customerName}`} className="w-5 h-5 rounded-full" alt="cust"/>
                                                            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{event.customerName}</span>
                                                            <span className="text-xs text-gray-400">接待了</span>
                                                            <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${event.advisorName}`} className="w-5 h-5 rounded-full" alt="adv"/>
                                                            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{event.advisorName}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                                
                                                <div className="flex items-center gap-4">
                                                    <div className="flex items-center gap-1 text-xs text-gray-400">
                                                        <Clock size={14} /> 时长: {event.duration}
                                                    </div>
                                                    <div className="flex items-center gap-1">
                                                        <Battery size={16} className="text-green-500 fill-green-500" />
                                                        <div className="w-8 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                                                            <div className="bg-blue-500 h-full w-3/4"></div>
                                                        </div>
                                                    </div>
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

            {/* === RIGHT SIDEBAR (Profile) === */}
            <div className="w-full xl:w-80 space-y-6">
                {/* Profile Card */}
                <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-slate-700 flex flex-col items-center">
                    <div className="w-20 h-20 rounded-full bg-gray-200 dark:bg-slate-700 overflow-hidden mb-3 border-4 border-white dark:border-slate-600 shadow-sm">
                        <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${selectedCustomer.name}`} alt="avatar" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">{selectedCustomer.name}</h3>
                    <p className="text-xs text-gray-400 mb-4">{selectedCustomer.phone}</p>
                    
                    <div className="w-full space-y-4">
                        <div className="border-l-2 border-primary-500 pl-3">
                             <h4 className="text-sm font-bold text-gray-800 dark:text-white mb-2">客户基本信息</h4>
                             <div className="space-y-2 text-sm">
                                 <div className="flex justify-between">
                                     <span className="text-gray-400">性别:</span>
                                     <span className="text-gray-600 dark:text-gray-300">{selectedCustomer.gender === 'Male' ? '男' : '女'}</span>
                                 </div>
                                 <div className="flex justify-between">
                                     <span className="text-gray-400">年龄:</span>
                                     <span className="text-gray-600 dark:text-gray-300">{selectedCustomer.ageGroup}</span>
                                 </div>
                                 <div className="flex justify-between">
                                     <span className="text-gray-400">联系电话:</span>
                                     <span className="text-gray-600 dark:text-gray-300">{selectedCustomer.phone}</span>
                                 </div>
                                 <div className="flex justify-between">
                                     <span className="text-gray-400">职业:</span>
                                     <span className="text-gray-600 dark:text-gray-300">{selectedCustomer.occupation}</span>
                                 </div>
                                 <div className="flex justify-between">
                                     <span className="text-gray-400">家庭住址:</span>
                                     <span className="text-gray-600 dark:text-gray-300 text-right max-w-[60%]">{selectedCustomer.address}</span>
                                 </div>
                             </div>
                        </div>

                        <div className="border-l-2 border-primary-500 pl-3">
                             <h4 className="text-sm font-bold text-gray-800 dark:text-white mb-2">购车需求</h4>
                             <div className="space-y-2 text-sm">
                                 <div className="flex justify-between">
                                     <span className="text-gray-400">预算范围:</span>
                                     <span className="text-gray-600 dark:text-gray-300">{selectedCustomer.budget}</span>
                                 </div>
                                 <div className="flex justify-between">
                                     <span className="text-gray-400">车辆偏好:</span>
                                     <span className="text-gray-600 dark:text-gray-300">SUV</span>
                                 </div>
                                 <div className="flex justify-between">
                                     <span className="text-gray-400">主要用途:</span>
                                     <span className="text-gray-600 dark:text-gray-300">{selectedCustomer.purchasePurpose}</span>
                                 </div>
                                 <div className="flex justify-between">
                                     <span className="text-gray-400">购车时间计划:</span>
                                     <span className="text-gray-600 dark:text-gray-300">{selectedCustomer.estimatedDealTime}</span>
                                 </div>
                                 <div className="flex justify-between">
                                     <span className="text-gray-400">是否有置换需求:</span>
                                     <span className="text-gray-600 dark:text-gray-300">{selectedCustomer.tradeIn}</span>
                                 </div>
                             </div>
                        </div>

                        <div className="border-l-2 border-primary-500 pl-3">
                             <h4 className="text-sm font-bold text-gray-800 dark:text-white mb-2">沟通行为特征</h4>
                             <div className="space-y-2 text-sm">
                                 <div className="flex justify-between">
                                     <span className="text-gray-400">对价格敏感:</span>
                                     <span className="text-gray-600 dark:text-gray-300">反复询问优惠</span>
                                 </div>
                                 <div className="flex justify-between">
                                     <span className="text-gray-400">决策角色:</span>
                                     <span className="text-gray-600 dark:text-gray-300">本人</span>
                                 </div>
                                 <div className="flex justify-between">
                                     <span className="text-gray-400">核心关注点:</span>
                                     <span className="text-gray-600 dark:text-gray-300">安全</span>
                                 </div>
                                 <div className="flex justify-between">
                                     <span className="text-gray-400">反对意见:</span>
                                     <span className="text-gray-600 dark:text-gray-300">在考虑其他品牌</span>
                                 </div>
                                 <div className="flex justify-between">
                                     <span className="text-gray-400">试价意向:</span>
                                     <span className="text-gray-600 dark:text-gray-300">中</span>
                                 </div>
                             </div>
                        </div>

                         <div className="border-l-2 border-primary-500 pl-3">
                             <h4 className="text-sm font-bold text-gray-800 dark:text-white mb-2">客户对话特征</h4>
                             <div className="space-y-2 text-sm">
                                 <div className="flex justify-between">
                                     <span className="text-gray-400">对话轮次:</span>
                                     <span className="text-gray-600 dark:text-gray-300">{selectedCustomer.interactionStats.turns}</span>
                                 </div>
                                 <div className="flex justify-between">
                                     <span className="text-gray-400">平均对话时长:</span>
                                     <span className="text-gray-600 dark:text-gray-300">{selectedCustomer.interactionStats.avgDuration}</span>
                                 </div>
                                 <div className="flex justify-between">
                                     <span className="text-gray-400">对话总时长:</span>
                                     <span className="text-gray-600 dark:text-gray-300">{selectedCustomer.interactionStats.totalDuration}</span>
                                 </div>
                                 <div className="flex justify-between">
                                     <span className="text-gray-400">平均话轮占比:</span>
                                     <span className="text-gray-600 dark:text-gray-300">{selectedCustomer.interactionStats.salesTalkRatio}</span>
                                 </div>
                             </div>
                        </div>

                    </div>
                </div>
            </div>

        </div>

        <AIAssistant context="customer_profile" data={selectedCustomer} />
      </div>
    );
  }

  // --- List View ---
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">客户档案库</h2>
        <div className="flex gap-3">
           <div className="relative">
             <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
             <input 
               type="text" 
               placeholder="搜索客户..." 
               value={searchTerm}
               onChange={(e) => setSearchTerm(e.target.value)}
               className="bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-lg pl-9 pr-4 py-2 text-sm outline-none focus:ring-2 focus:ring-primary-500 dark:text-white"
             />
           </div>
           <button className="flex items-center gap-2 px-4 py-2 bg-primary-600 text-white rounded-lg text-sm font-medium hover:bg-primary-700 transition-colors shadow-sm">
             <Plus size={16} /> 新增档案
           </button>
        </div>
      </div>

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
                        customer.level === 'H' ? 'bg-red-100 text-red-600' :
                        customer.level === 'A' ? 'bg-orange-100 text-orange-600' :
                        customer.level === 'B' ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-600'
                     }`}>
                        {customer.level}级
                     </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-300">
                     <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        customer.lifeCycle === 'Negotiation' ? 'bg-purple-100 text-purple-700' :
                        customer.lifeCycle === 'TestDrive' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-700'
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
                        <span className="text-xs font-bold">{customer.predictionScore}</span>
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
  );
};

export default CustomerArchives;
