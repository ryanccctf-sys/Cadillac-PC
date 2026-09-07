
import React, { useState } from 'react';
import { 
  Search, 
  Filter, 
  ChevronRight, 
  ArrowLeft,
  User,
  Users,
  Star,
  Award,
  TrendingUp,
  BookOpen,
  MessageSquare,
  Briefcase,
  Calendar,
  Zap,
  CheckCircle2,
  AlertCircle,
  MoreHorizontal
} from 'lucide-react';
import { 
  Radar, 
  RadarChart, 
  PolarGrid, 
  PolarAngleAxis, 
  PolarRadiusAxis, 
  ResponsiveContainer,
  BarChart, 
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  PieChart, 
  Pie, 
  Cell, 
  Legend
} from 'recharts';
import AIAssistant from '../components/AIAssistant';

// --- Mock Data ---

interface Feedback {
  id: number;
  user: string;
  rating: number;
  comment: string;
  date: string;
}

interface Training {
  id: number;
  course: string;
  date: string;
  status: 'completed' | 'ongoing' | 'planned';
  score?: number;
}

interface EmployeeDetail {
  id: string;
  name: string;
  role: string;
  department: string;
  avatar: string;
  hireDate: string;
  status: 'active' | 'busy' | 'offline';
  
  // List View Metrics
  capabilityScore: number;
  customerRating: number;
  performanceScore: number;
  trainingStatus: 'Qualified' | 'Pending' | 'Needs Training';
  
  // Detail View Data
  capabilities: { subject: string; A: number; fullMark: number }[];
  performanceHistory: { month: string; sales: number; reception: number }[];
  behavioralData: { label: string; value: string; trend: 'up' | 'down' | 'flat' }[];
  feedbacks: Feedback[];
  trainings: Training[];
  suggestions: string[];

  // New Features Data
  customerLevels: { name: string; value: number; color: string }[];
  weeklyReceptionData: {
    date: string;
    H: number;
    A: number;
    B: number;
    C: number;
  }[];
  weeklyWorkSummary: string;
}

const MOCK_EMPLOYEES_DATA: EmployeeDetail[] = [
  { 
    id: 'E001', 
    name: '王金牌', 
    role: '高级销售顾问', 
    department: '销售一部',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=王金牌',
    hireDate: '2020-05-12',
    status: 'active',
    capabilityScore: 92,
    customerRating: 4.9,
    performanceScore: 95,
    trainingStatus: 'Qualified',
    capabilities: [
      { subject: '服务质量', A: 95, fullMark: 100 },
      { subject: '销售技巧', A: 90, fullMark: 100 },
      { subject: '沟通能力', A: 98, fullMark: 100 },
      { subject: '产品知识', A: 92, fullMark: 100 },
      { subject: '客户管理', A: 85, fullMark: 100 },
      { subject: '团队协作', A: 88, fullMark: 100 },
    ],
    performanceHistory: [
      { month: '7月', sales: 12, reception: 45 },
      { month: '8月', sales: 15, reception: 50 },
      { month: '9月', sales: 18, reception: 48 },
      { month: '10月', sales: 22, reception: 60 },
    ],
    behavioralData: [
      { label: '平均接待时长', value: '28 min', trend: 'up' },
      { label: '试驾转化率', value: '35%', trend: 'up' },
      { label: '留资率', value: '85%', trend: 'flat' },
      { label: '响应速度', value: '15 sec', trend: 'up' },
    ],
    feedbacks: [
      { id: 1, user: '张先生', rating: 5, comment: '非常专业，对产品非常了解，推荐的车型很适合我。', date: '2023-10-25' },
      { id: 2, user: '李女士', rating: 5, comment: '态度很好，耐心解答所有问题。', date: '2023-10-20' },
    ],
    trainings: [
      { id: 1, course: '高级谈判技巧', date: '2023-09-15', status: 'completed', score: 98 },
      { id: 2, course: '新能源竞品分析', date: '2023-10-01', status: 'ongoing' },
    ],
    suggestions: [
      '保持当前的销售势头，可以尝试带教新员工。',
      '在客户管理方面，建议加强对老客户的维系，提升转介绍率。'
    ],
    customerLevels: [
      { name: 'H级 (极高意向)', value: 15, color: '#ef4444' }, // Red
      { name: 'A级 (高意向)', value: 35, color: '#f97316' }, // Orange
      { name: 'B级 (中意向)', value: 40, color: '#3b82f6' }, // Blue
      { name: 'C级 (一般)', value: 10, color: '#94a3b8' }, // Gray
    ],
    weeklyReceptionData: [
        { date: '10-20', H: 2, A: 5, B: 3, C: 1 },
        { date: '10-21', H: 3, A: 4, B: 5, C: 2 },
        { date: '10-22', H: 1, A: 6, B: 4, C: 1 },
        { date: '10-23', H: 4, A: 3, B: 6, C: 0 },
        { date: '10-24', H: 2, A: 7, B: 2, C: 3 },
        { date: '10-25', H: 5, A: 4, B: 5, C: 1 },
        { date: '10-26', H: 3, A: 5, B: 4, C: 2 },
    ],
    weeklyWorkSummary: "本周接待量稳中有升，H级客户占比提升至15%，主要集中在周末。针对A级客户的试驾转化率较高，但对C级客户的跟进略显不足，建议加强对长尾客户的激活，同时保持高意向客户的成交转化。",
  },
  { 
    id: 'E002', 
    name: '李进取', 
    role: '销售顾问', 
    department: '销售一部',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=李进取',
    hireDate: '2022-03-10',
    status: 'busy',
    capabilityScore: 85,
    customerRating: 4.7,
    performanceScore: 88,
    trainingStatus: 'Qualified',
    capabilities: [
      { subject: '服务质量', A: 88, fullMark: 100 },
      { subject: '销售技巧', A: 85, fullMark: 100 },
      { subject: '沟通能力', A: 85, fullMark: 100 },
      { subject: '产品知识', A: 95, fullMark: 100 },
      { subject: '客户管理', A: 78, fullMark: 100 },
      { subject: '团队协作', A: 80, fullMark: 100 },
    ],
    performanceHistory: [
      { month: '7月', sales: 8, reception: 40 },
      { month: '8月', sales: 10, reception: 42 },
      { month: '9月', sales: 12, reception: 45 },
      { month: '10月', sales: 11, reception: 48 },
    ],
    behavioralData: [
      { label: '平均接待时长', value: '25 min', trend: 'flat' },
      { label: '试驾转化率', value: '28%', trend: 'up' },
      { label: '留资率', value: '78%', trend: 'down' },
      { label: '响应速度', value: '20 sec', trend: 'flat' },
    ],
    feedbacks: [
      { id: 1, user: '王先生', rating: 4, comment: '产品介绍很详细，但是感觉有点急促。', date: '2023-10-22' },
    ],
    trainings: [
      { id: 1, course: '基础销售流程', date: '2022-03-15', status: 'completed', score: 90 },
      { id: 2, course: '客户心理学', date: '2023-11-01', status: 'planned' },
    ],
    suggestions: [
      '建议放慢接待节奏，多倾听客户需求。',
      '加强客户留资环节的话术引导。'
    ],
    customerLevels: [
      { name: 'H级', value: 10, color: '#ef4444' },
      { name: 'A级', value: 30, color: '#f97316' },
      { name: 'B级', value: 45, color: '#3b82f6' },
      { name: 'C级', value: 15, color: '#94a3b8' },
    ],
    weeklyReceptionData: [
        { date: '10-20', H: 1, A: 3, B: 5, C: 2 },
        { date: '10-21', H: 2, A: 4, B: 6, C: 1 },
        { date: '10-22', H: 0, A: 5, B: 4, C: 3 },
        { date: '10-23', H: 2, A: 2, B: 5, C: 2 },
        { date: '10-24', H: 1, A: 6, B: 3, C: 1 },
        { date: '10-25', H: 3, A: 3, B: 7, C: 0 },
        { date: '10-26', H: 2, A: 4, B: 5, C: 1 },
    ],
    weeklyWorkSummary: "本周接待总量正常，但H级客户挖掘能力有待提升。对于B级客户的维护较好，建议在需求挖掘阶段更深入，争取将更多B级客户转化为A/H级。",
  },
  { 
    id: 'E003', 
    name: '张新人', 
    role: '实习销售', 
    department: '销售二部',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=张新人',
    hireDate: '2023-09-01',
    status: 'offline',
    capabilityScore: 72,
    customerRating: 4.2,
    performanceScore: 65,
    trainingStatus: 'Needs Training',
    capabilities: [
      { subject: '服务质量', A: 80, fullMark: 100 },
      { subject: '销售技巧', A: 60, fullMark: 100 },
      { subject: '沟通能力', A: 75, fullMark: 100 },
      { subject: '产品知识', A: 70, fullMark: 100 },
      { subject: '客户管理', A: 60, fullMark: 100 },
      { subject: '团队协作', A: 85, fullMark: 100 },
    ],
    performanceHistory: [
      { month: '7月', sales: 0, reception: 0 },
      { month: '8月', sales: 0, reception: 0 },
      { month: '9月', sales: 1, reception: 20 },
      { month: '10月', sales: 3, reception: 35 },
    ],
    behavioralData: [
      { label: '平均接待时长', value: '15 min', trend: 'down' },
      { label: '试驾转化率', value: '15%', trend: 'flat' },
      { label: '留资率', value: '60%', trend: 'up' },
      { label: '响应速度', value: '45 sec', trend: 'down' },
    ],
    feedbacks: [
      { id: 1, user: '陈女士', rating: 4, comment: '小伙子很热情，就是对业务不太熟。', date: '2023-10-24' },
    ],
    trainings: [
      { id: 1, course: '入职培训', date: '2023-09-02', status: 'completed', score: 85 },
      { id: 2, course: '销售话术通关', date: '2023-10-28', status: 'ongoing' },
    ],
    suggestions: [
      '急需加强产品知识和基础销售话术的培训。',
      '建议安排一位资深导师进行一对一帮带。'
    ],
    customerLevels: [
      { name: 'H级', value: 5, color: '#ef4444' },
      { name: 'A级', value: 20, color: '#f97316' },
      { name: 'B级', value: 45, color: '#3b82f6' },
      { name: 'C级', value: 30, color: '#94a3b8' },
    ],
    weeklyReceptionData: [
        { date: '10-20', H: 0, A: 1, B: 3, C: 4 },
        { date: '10-21', H: 1, A: 2, B: 4, C: 3 },
        { date: '10-22', H: 0, A: 1, B: 2, C: 5 },
        { date: '10-23', H: 1, A: 2, B: 3, C: 2 },
        { date: '10-24', H: 0, A: 3, B: 4, C: 4 },
        { date: '10-25', H: 2, A: 2, B: 5, C: 3 },
        { date: '10-26', H: 0, A: 2, B: 3, C: 4 },
    ],
    weeklyWorkSummary: "本周C级客户占比较高，显示出判客能力或客户筛选能力有待加强。接待量尚可，但有效转化率偏低，建议在导师指导下复盘每一次接待录音，提升需求匹配度。",
  },
];

// --- Components ---

const EmployeeProfiles: React.FC = () => {
  const [view, setView] = useState<'list' | 'detail'>('list');
  const [selectedEmployee, setSelectedEmployee] = useState<EmployeeDetail | null>(null);
  
  // Filters
  const [roleFilter, setRoleFilter] = useState('全部岗位');
  const [searchQuery, setSearchQuery] = useState('');

  const handleViewDetail = (employee: EmployeeDetail) => {
    setSelectedEmployee(employee);
    setView('detail');
  };

  const handleBack = () => {
    setView('list');
    setSelectedEmployee(null);
  };

  const filteredEmployees = MOCK_EMPLOYEES_DATA.filter(emp => {
    const matchRole = roleFilter === '全部岗位' || emp.role === roleFilter;
    const matchSearch = emp.name.includes(searchQuery);
    return matchRole && matchSearch;
  });

  // --- Detail View ---
  if (view === 'detail' && selectedEmployee) {
    return (
      <div className="space-y-4 animate-fade-in pb-10 relative">
        {/* Header */}
        <div className="flex items-center justify-between mb-2">
           <div className="flex items-center gap-3">
             <button 
                onClick={handleBack}
                className="p-2 bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 hover:bg-gray-50 dark:hover:bg-slate-700 rounded-lg transition-colors shadow-sm"
              >
                <ArrowLeft size={18} className="text-gray-600 dark:text-gray-300" />
              </button>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">员工详情画像</h2>
           </div>
           <div className="flex gap-2">
              <button className="px-4 py-2 bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 text-gray-700 dark:text-gray-200 rounded-lg text-sm font-medium hover:bg-gray-50 dark:hover:bg-slate-700 transition-colors shadow-sm">
                 导出报告
              </button>
              <button className="px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg text-sm font-medium transition-colors shadow-sm">
                 发起谈话
              </button>
           </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
            
            {/* ROW 1: Profile Info (8) + Behavior (4) */}
            
            {/* 1. Profile & Key Metrics */}
            <div className="col-span-12 lg:col-span-8 bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-700 flex flex-col justify-between">
                <div className="flex flex-col md:flex-row gap-6 items-center md:items-start h-full">
                    {/* Left: Avatar & Bio */}
                    <div className="flex flex-col items-center md:items-start gap-4 min-w-[180px] border-b md:border-b-0 md:border-r border-gray-100 dark:border-slate-700 pb-6 md:pb-0 md:pr-6 h-full justify-center">
                        <div className="relative">
                            <img src={selectedEmployee.avatar} alt={selectedEmployee.name} className="w-24 h-24 rounded-full object-cover border-4 border-gray-50 dark:border-slate-700 shadow-md" />
                            <span className={`absolute bottom-1 right-1 w-5 h-5 rounded-full border-4 border-white dark:border-slate-800 ${
                                selectedEmployee.status === 'active' ? 'bg-green-500' : selectedEmployee.status === 'busy' ? 'bg-yellow-500' : 'bg-gray-400'
                            }`}></span>
                        </div>
                        <div className="text-center md:text-left">
                            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">{selectedEmployee.name}</h3>
                            <p className="text-sm font-medium text-primary-600 dark:text-primary-400 mb-2">{selectedEmployee.role}</p>
                            <div className="flex flex-col gap-1 text-xs text-gray-500 dark:text-gray-400">
                                <span className="flex items-center gap-1"><Briefcase size={12}/> {selectedEmployee.department}</span>
                                <span className="flex items-center gap-1"><Calendar size={12}/> 入职: {selectedEmployee.hireDate}</span>
                            </div>
                        </div>
                    </div>

                    {/* Right: Key Stats */}
                    <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-4 w-full h-full items-center">
                        <div className="flex flex-col justify-center items-center p-4 bg-indigo-50 dark:bg-indigo-900/10 rounded-xl h-full border border-indigo-100 dark:border-indigo-900/20">
                            <div className="p-2 bg-indigo-100 dark:bg-indigo-900/30 rounded-lg mb-2 text-indigo-600 dark:text-indigo-400">
                               <Zap size={20} />
                            </div>
                            <p className="text-3xl font-bold text-indigo-700 dark:text-indigo-300 mb-1">{selectedEmployee.capabilityScore}</p>
                            <p className="text-xs font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wide">能力综合分</p>
                        </div>
                        <div className="flex flex-col justify-center items-center p-4 bg-yellow-50 dark:bg-yellow-900/10 rounded-xl h-full border border-yellow-100 dark:border-yellow-900/20">
                            <div className="p-2 bg-yellow-100 dark:bg-yellow-900/30 rounded-lg mb-2 text-yellow-600 dark:text-yellow-400">
                               <Star size={20} />
                            </div>
                            <p className="text-3xl font-bold text-yellow-700 dark:text-yellow-300 mb-1 flex items-center gap-1">
                                {selectedEmployee.customerRating}
                            </p>
                            <p className="text-xs font-bold text-yellow-600 dark:text-yellow-400 uppercase tracking-wide">客户满意度</p>
                        </div>
                        <div className="flex flex-col justify-center items-center p-4 bg-green-50 dark:bg-green-900/10 rounded-xl h-full border border-green-100 dark:border-green-900/20">
                            <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg mb-2 text-green-600 dark:text-green-400">
                               <TrendingUp size={20} />
                            </div>
                            <p className="text-3xl font-bold text-green-700 dark:text-green-300 mb-1">{selectedEmployee.performanceScore}</p>
                            <p className="text-xs font-bold text-green-600 dark:text-green-400 uppercase tracking-wide">工作绩效</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* 2. Behavioral Stats */}
            <div className="col-span-12 lg:col-span-4 bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-700 flex flex-col">
                <div className="flex justify-between items-center mb-4">
                  <h4 className="font-bold text-gray-900 dark:text-white flex items-center gap-2">
                     <Zap className="text-blue-500" size={18} /> 行为数据洞察
                  </h4>
                  <span className="text-xs text-gray-400">近30天平均</span>
                </div>
                <div className="grid grid-cols-1 gap-3 flex-1">
                    {selectedEmployee.behavioralData.map((item, idx) => (
                       <div key={idx} className="flex items-center justify-between p-3.5 bg-gray-50 dark:bg-slate-700/30 rounded-xl border border-gray-100 dark:border-slate-600/50">
                          <span className="text-sm font-medium text-gray-600 dark:text-gray-300">{item.label}</span>
                          <div className="text-right flex items-center gap-3">
                             <div className="text-base font-bold text-gray-900 dark:text-white">{item.value}</div>
                             {/* Trend Indicator */}
                             <div className={`text-[10px] px-1.5 py-0.5 rounded font-medium flex items-center ${
                                item.trend === 'up' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300' :
                                item.trend === 'down' ? 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300' :
                                'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-400'
                             }`}>
                                {item.trend === 'up' && '↑ 提升'}
                                {item.trend === 'down' && '↓ 下降'}
                                {item.trend === 'flat' && '- 持平'}
                             </div>
                          </div>
                       </div>
                    ))}
                </div>
            </div>

            {/* ROW 2: Weekly Reception (8) + Customer Levels (4) */}

            {/* 3. Weekly Reception & Summary */}
            <div className="col-span-12 md:col-span-8 bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-700">
                <div className="flex justify-between items-center mb-6">
                    <h4 className="font-bold text-gray-900 dark:text-white flex items-center gap-2">
                        <Calendar className="text-purple-500" size={18} /> 近7日接待分析与总结
                    </h4>
                    <div className="flex items-center gap-2 text-xs">
                        <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-red-500"></span> H级</span>
                        <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-orange-500"></span> A级</span>
                        <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-blue-500"></span> B级</span>
                    </div>
                </div>
                
                <div className="flex flex-col lg:flex-row gap-6 h-[240px]">
                    {/* Chart Section */}
                    <div className="flex-1 w-full min-h-[200px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={selectedEmployee.weeklyReceptionData} margin={{top: 10, right: 0, left: -25, bottom: 0}}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                                <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 11}} dy={10} />
                                <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 11}} />
                                <Tooltip 
                                    cursor={{fill: 'rgba(241, 245, 249, 0.6)'}} 
                                    contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)'}} 
                                />
                                <Bar dataKey="H" stackId="a" fill="#ef4444" radius={[0,0,0,0]} barSize={24} />
                                <Bar dataKey="A" stackId="a" fill="#f97316" radius={[0,0,0,0]} barSize={24} />
                                <Bar dataKey="B" stackId="a" fill="#3b82f6" radius={[0,0,0,0]} barSize={24} />
                                <Bar dataKey="C" stackId="a" fill="#cbd5e1" radius={[4,4,0,0]} barSize={24} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                    
                    {/* Summary Section */}
                    <div className="lg:w-[320px] bg-purple-50 dark:bg-purple-900/10 p-5 rounded-xl flex flex-col border border-purple-100 dark:border-purple-900/20 shadow-inner">
                        <h5 className="text-sm font-bold text-purple-900 dark:text-purple-100 mb-3 flex items-center gap-2">
                            <MessageSquare size={16} /> 本周工作总结
                        </h5>
                        <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar">
                            <p className="text-xs text-purple-800 dark:text-purple-200 leading-relaxed text-justify">
                                {selectedEmployee.weeklyWorkSummary}
                            </p>
                        </div>
                        <div className="mt-3 pt-3 border-t border-purple-200 dark:border-purple-800/30 flex justify-between items-center">
                            <span className="text-[10px] text-purple-500 font-medium">AI 自动生成</span>
                            <button className="text-[10px] bg-white dark:bg-slate-700 px-2 py-1 rounded border border-purple-200 dark:border-purple-800 text-purple-700 dark:text-purple-300 hover:bg-purple-50 transition-colors">
                                查看详情
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* 4. Customer Levels (Donut) */}
            <div className="col-span-12 md:col-span-4 bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-700 flex flex-col">
                <h4 className="font-bold text-gray-900 dark:text-white mb-2 flex items-center gap-2">
                    <Users className="text-pink-500" size={18} /> 客户等级分布
                </h4>
                <div className="flex-1 relative min-h-[220px]">
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie
                                data={selectedEmployee.customerLevels}
                                cx="50%"
                                cy="50%"
                                innerRadius={60}
                                outerRadius={85}
                                paddingAngle={5}
                                dataKey="value"
                                stroke="none"
                            >
                                {selectedEmployee.customerLevels.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={entry.color} />
                                ))}
                            </Pie>
                            <Tooltip 
                                contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)'}}
                            />
                            <Legend 
                                verticalAlign="bottom" 
                                height={36} 
                                iconType="circle" 
                                iconSize={8} 
                                wrapperStyle={{fontSize: '11px', bottom: '0'}} 
                            />
                        </PieChart>
                    </ResponsiveContainer>
                    {/* Center Stats */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none pb-8">
                         <span className="text-xs text-gray-400">重点客户</span>
                         <span className="text-2xl font-bold text-gray-900 dark:text-white">
                             {selectedEmployee.customerLevels[0].value + selectedEmployee.customerLevels[1].value}%
                         </span>
                    </div>
                </div>
            </div>

            {/* ROW 3: Three Equal Columns */}

            {/* 5. Capability Radar */}
            <div className="col-span-12 md:col-span-4 bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-700">
                 <h4 className="font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                   <Award className="text-orange-500" size={18} /> 能力模型
                 </h4>
                 <div className="h-[200px]">
                   <ResponsiveContainer width="100%" height="100%">
                     <RadarChart cx="50%" cy="50%" outerRadius="75%" data={selectedEmployee.capabilities}>
                        <PolarGrid stroke="#e2e8f0" strokeDasharray="3 3" />
                        <PolarAngleAxis dataKey="subject" tick={{ fill: '#64748b', fontSize: 11 }} />
                        <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                        <Radar name="能力值" dataKey="A" stroke="#f97316" fill="#f97316" fillOpacity={0.4} />
                        <Tooltip contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)'}} />
                     </RadarChart>
                   </ResponsiveContainer>
                 </div>
            </div>

            {/* 6. Performance Trends */}
            <div className="col-span-12 md:col-span-4 bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-700">
                 <h4 className="font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                   <TrendingUp className="text-blue-500" size={18} /> 业绩趋势 (近4月)
                 </h4>
                 <div className="h-[200px]">
                    <ResponsiveContainer width="100%" height="100%">
                       <BarChart data={selectedEmployee.performanceHistory} barSize={20}>
                          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                          <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 11}} dy={10} />
                          <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 11}} />
                          <Tooltip cursor={{fill: 'rgba(241, 245, 249, 0.6)'}} contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)'}} />
                          <Legend wrapperStyle={{fontSize: '11px', paddingTop: '10px'}} />
                          <Bar dataKey="reception" name="接待量" fill="#cbd5e1" radius={[4, 4, 0, 0]} />
                          <Bar dataKey="sales" name="成交量" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                       </BarChart>
                    </ResponsiveContainer>
                 </div>
            </div>

            {/* 7. Training & Feedback */}
            <div className="col-span-12 md:col-span-4 flex flex-col gap-4">
                 <div className="bg-white dark:bg-slate-800 p-5 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-700 flex-1 flex flex-col">
                    <h4 className="font-bold text-gray-900 dark:text-white mb-3 flex items-center gap-2 text-sm">
                       <BookOpen className="text-green-500" size={16} /> 待培训课程
                    </h4>
                    <div className="space-y-2 flex-1">
                       {selectedEmployee.trainings.slice(0,2).map(tr => (
                          <div key={tr.id} className="flex items-center justify-between text-xs p-2.5 bg-gray-50 dark:bg-slate-700/50 rounded-lg border border-gray-100 dark:border-slate-600/50">
                             <span className="font-medium text-gray-700 dark:text-gray-200">{tr.course}</span>
                             <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${tr.status === 'completed' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'}`}>
                                {tr.status === 'completed' ? '已完成' : '进行中'}
                             </span>
                          </div>
                       ))}
                    </div>
                 </div>
                 
                 <div className="bg-white dark:bg-slate-800 p-5 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-700 flex-1 flex flex-col">
                    <h4 className="font-bold text-gray-900 dark:text-white mb-3 flex items-center gap-2 text-sm">
                       <CheckCircle2 className="text-indigo-500" size={16} /> AI 改进建议
                    </h4>
                     <ul className="space-y-2 flex-1">
                        {selectedEmployee.suggestions.slice(0,2).map((sugg, i) => (
                           <li key={i} className="flex gap-2 text-xs text-gray-600 dark:text-gray-300">
                              <span className="mt-1 w-1.5 h-1.5 rounded-full bg-indigo-500 flex-shrink-0"></span>
                              <span className="leading-relaxed">{sugg}</span>
                           </li>
                        ))}
                     </ul>
                 </div>
            </div>

        </div>
        
        <AIAssistant context="employee_profile" data={selectedEmployee} />
      </div>
    );
  }

  // --- List View ---
  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header & Filters */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">员工画像</h2>
        <div className="flex gap-3">
           <div className="relative">
             <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
             <input 
               type="text" 
               placeholder="搜索员工姓名..." 
               value={searchQuery}
               onChange={(e) => setSearchQuery(e.target.value)}
               className="bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-lg pl-9 pr-4 py-2 text-sm outline-none focus:ring-2 focus:ring-primary-500 dark:text-white w-full md:w-64"
             />
           </div>
           
           <div className="relative">
             <Filter className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
             <select 
               value={roleFilter}
               onChange={(e) => setRoleFilter(e.target.value)}
               className="bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-lg pl-9 pr-8 py-2 text-sm outline-none focus:ring-2 focus:ring-primary-500 dark:text-white appearance-none cursor-pointer"
             >
               <option>全部岗位</option>
               <option>高级销售顾问</option>
               <option>销售顾问</option>
               <option>实习销售</option>
             </select>
           </div>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-gray-100 dark:border-slate-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-50 dark:bg-slate-700/50">
              <tr>
                <th className="px-6 py-4 font-semibold text-gray-600 dark:text-gray-300 text-sm">员工姓名</th>
                <th className="px-6 py-4 font-semibold text-gray-600 dark:text-gray-300 text-sm">岗位</th>
                <th className="px-6 py-4 font-semibold text-gray-600 dark:text-gray-300 text-sm">能力评分</th>
                <th className="px-6 py-4 font-semibold text-gray-600 dark:text-gray-300 text-sm">客户评价</th>
                <th className="px-6 py-4 font-semibold text-gray-600 dark:text-gray-300 text-sm">工作表现</th>
                <th className="px-6 py-4 font-semibold text-gray-600 dark:text-gray-300 text-sm">培训状态</th>
                <th className="px-6 py-4 font-semibold text-gray-600 dark:text-gray-300 text-sm text-right">操作</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-slate-700">
              {filteredEmployees.map((emp) => (
                <tr key={emp.id} className="hover:bg-gray-50 dark:hover:bg-slate-700/30 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                       <img src={emp.avatar} alt={emp.name} className="w-8 h-8 rounded-full object-cover" />
                       <span className="font-medium text-gray-900 dark:text-white text-sm">{emp.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                    <span className="px-2 py-1 bg-gray-100 dark:bg-slate-700 rounded text-xs">
                      {emp.role}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                       <div className="w-16 bg-gray-200 dark:bg-slate-600 h-1.5 rounded-full overflow-hidden">
                          <div className={`h-full ${emp.capabilityScore > 80 ? 'bg-purple-500' : 'bg-blue-500'}`} style={{width: `${emp.capabilityScore}%`}}></div>
                       </div>
                       <span className="text-sm font-bold text-gray-700 dark:text-gray-200">{emp.capabilityScore}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                     <span className="flex items-center gap-1 text-sm text-yellow-500 font-medium">
                        {emp.customerRating} <Star size={12} fill="currentColor" />
                     </span>
                  </td>
                  <td className="px-6 py-4">
                     <span className={`text-sm font-bold ${emp.performanceScore > 85 ? 'text-green-500' : emp.performanceScore > 70 ? 'text-blue-500' : 'text-orange-500'}`}>
                        {emp.performanceScore}
                     </span>
                  </td>
                  <td className="px-6 py-4">
                     <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        emp.trainingStatus === 'Qualified' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300' :
                        emp.trainingStatus === 'Pending' ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300' :
                        'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300'
                     }`}>
                        {emp.trainingStatus === 'Qualified' ? '已达标' : emp.trainingStatus === 'Pending' ? '进行中' : '需培训'}
                     </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button 
                      onClick={() => handleViewDetail(emp)}
                      className="inline-flex items-center gap-1 text-primary-600 hover:text-primary-700 text-sm font-medium transition-colors"
                    >
                      查看详情 <ChevronRight size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filteredEmployees.length === 0 && (
            <div className="p-8 text-center text-gray-500 dark:text-gray-400">
               <AlertCircle className="mx-auto mb-2 opacity-50" size={32} />
               <p>没有找到符合条件的员工</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EmployeeProfiles;
