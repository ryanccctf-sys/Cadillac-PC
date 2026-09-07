
import React, { useState } from 'react';
import { 
  Search, 
  Filter, 
  Phone, 
  MessageCircle, 
  Calendar, 
  User, 
  MapPin, 
  Clock, 
  ArrowLeft, 
  Target, 
  TrendingUp, 
  FileText, 
  CheckCircle2, 
  AlertCircle,
  MoreHorizontal,
  Plus,
  ChevronRight
} from 'lucide-react';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar
} from 'recharts';
import AIAssistant from '../components/AIAssistant';

// --- Mock Data ---

interface LeadRecord {
  id: string;
  name: string;
  phone: string;
  address: string;
  source: string;
  status: 'new' | 'following' | 'negotiation' | 'closed' | 'lost';
  salesperson: string;
  estimatedDealTime: string;
  probability: number;
  
  // Detail View Specifics
  needs: {
    model: string;
    budget: string;
    timeframe: string;
    focus: string;
  };
  history: {
    id: number;
    date: string;
    type: 'call' | 'visit' | 'message' | 'system';
    content: string;
    person: string;
  }[];
  interactions: {
    id: number;
    date: string;
    action: string;
    details: string;
  }[];
  suggestions: string[];
}

const MOCK_LEADS_FULL: LeadRecord[] = [
  { 
    id: 'L-20231001', 
    name: '赵先生', 
    phone: '138****1234', 
    address: '上海市浦东新区张江高科',
    source: '线上广告', 
    status: 'new', 
    salesperson: '王金牌', 
    estimatedDealTime: '2023-11-15', 
    probability: 30,
    needs: {
      model: 'Model Y 长续航版',
      budget: '30-35万',
      timeframe: '1个月内',
      focus: '空间、续航'
    },
    history: [
      { id: 1, date: '2023-10-26 10:00', type: 'system', content: '线索自动分配给王金牌', person: '系统' },
      { id: 2, date: '2023-10-26 10:15', type: 'call', content: '首次电话联系，客户表示周末有空到店', person: '王金牌' },
    ],
    interactions: [
      { id: 1, date: '2023-10-26 10:20', action: '发送邀请', details: '通过企业微信发送了周末试驾邀请函' },
    ],
    suggestions: [
      '客户关注续航，建议准备好长途试驾路线方案。',
      '周末到店前1天再次短信提醒。'
    ]
  },
  { 
    id: 'L-20231005', 
    name: '钱女士', 
    phone: '139****5678', 
    address: '北京市朝阳区国贸',
    source: '线下活动', 
    status: 'negotiation', 
    salesperson: '李进取', 
    estimatedDealTime: '2023-10-30', 
    probability: 85,
    needs: {
      model: 'Model 3 高性能版',
      budget: '35万左右',
      timeframe: '本周',
      focus: '操控、外观'
    },
    history: [
      { id: 1, date: '2023-10-15', type: 'visit', content: '客户首次进店，进行了30分钟试驾', person: '李进取' },
      { id: 2, date: '2023-10-20', type: 'call', content: '沟通置换方案，客户对旧车估价有疑虑', person: '李进取' },
      { id: 3, date: '2023-10-25', type: 'visit', content: '二次进店谈价，申请了赠送充电桩', person: '李进取' },
    ],
    interactions: [
      { id: 1, date: '2023-10-25', action: '提交报价', details: '提交了包含置换补贴的最终报价单' },
    ],
    suggestions: [
      '置换补贴审批已通过，建议今日告知客户以促成成交。',
      '准备好购车合同，预计客户随时可能下订。'
    ]
  },
  { 
    id: 'L-20231012', 
    name: '孙先生', 
    phone: '136****9988', 
    address: '广州市天河区珠江新城',
    source: '客户推荐', 
    status: 'following', 
    salesperson: '王金牌', 
    estimatedDealTime: '2023-12-01', 
    probability: 50,
    needs: {
      model: 'Model X',
      budget: '80万以上',
      timeframe: '年底前',
      focus: '科技感、鸥翼门'
    },
    history: [
      { id: 1, date: '2023-10-22', type: 'call', content: '老客户李总推荐，电话初步沟通需求', person: '王金牌' },
    ],
    interactions: [
      { id: 1, date: '2023-10-22', action: '添加微信', details: '添加客户微信，发送了车型电子手册' },
    ],
    suggestions: [
      '由于是老客户推荐，建议申请VIP接待礼遇。',
      '主动询问是否需要上门试驾服务。'
    ]
  },
];

// --- Components ---

const LeadLibrary: React.FC = () => {
  const [view, setView] = useState<'list' | 'detail'>('list');
  const [selectedLead, setSelectedLead] = useState<LeadRecord | null>(null);

  // Filters state
  const [sourceFilter, setSourceFilter] = useState('全部来源');
  const [statusFilter, setStatusFilter] = useState('全部状态');
  
  const handleViewDetail = (lead: LeadRecord) => {
    setSelectedLead(lead);
    setView('detail');
  };

  const handleBack = () => {
    setView('list');
    setSelectedLead(null);
  };

  // --- Detail View ---
  if (view === 'detail' && selectedLead) {
    return (
      <div className="space-y-6 animate-fade-in pb-10 relative">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button 
              onClick={handleBack}
              className="p-2 hover:bg-gray-100 dark:hover:bg-slate-700 rounded-lg transition-colors"
            >
              <ArrowLeft size={20} className="text-gray-600 dark:text-gray-300" />
            </button>
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">线索详细信息</h2>
              <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mt-1">
                 <span className="font-mono">{selectedLead.id}</span>
                 <span>•</span>
                 <span>{selectedLead.salesperson} 跟进中</span>
              </div>
            </div>
          </div>
          <div className="flex gap-3">
             <button className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-lg text-sm font-medium hover:bg-gray-50 dark:hover:bg-slate-700 transition-colors">
                <Phone size={16} /> 呼叫
              </button>
              <button className="flex items-center gap-2 px-4 py-2 bg-primary-600 text-white rounded-lg text-sm font-medium hover:bg-primary-700 transition-colors shadow-sm">
                <MessageCircle size={16} /> 微信跟进
              </button>
          </div>
        </div>

        {/* 1. Top Info Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
           {/* Customer Info - Blue Theme */}
           <div className="relative overflow-hidden bg-gradient-to-br from-blue-50/80 to-white dark:from-blue-900/10 dark:to-slate-800 p-6 rounded-2xl shadow-sm border border-blue-100 dark:border-blue-900/30">
              <div className="absolute -right-6 -top-6 opacity-5 dark:opacity-10 pointer-events-none">
                <User size={120} className="text-blue-600 dark:text-blue-400" />
              </div>
              
              <h3 className="relative text-lg font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                 <span className="p-2 bg-blue-100 dark:bg-blue-900/50 rounded-lg text-blue-600 dark:text-blue-400">
                    <User size={20} />
                 </span>
                 客户信息
              </h3>
              
              <div className="relative space-y-4">
                 <div className="flex justify-between items-center pb-3 border-b border-blue-100/50 dark:border-blue-800/30">
                    <span className="text-gray-500 dark:text-gray-400 text-sm">客户姓名</span>
                    <span className="font-bold text-gray-900 dark:text-white text-base">{selectedLead.name}</span>
                 </div>
                 <div className="flex justify-between items-center pb-3 border-b border-blue-100/50 dark:border-blue-800/30">
                    <span className="text-gray-500 dark:text-gray-400 text-sm">联系电话</span>
                    <span className="font-mono font-medium text-gray-900 dark:text-white">{selectedLead.phone}</span>
                 </div>
                 <div className="flex justify-between items-start pb-3 border-b border-blue-100/50 dark:border-blue-800/30">
                    <span className="text-gray-500 dark:text-gray-400 text-sm whitespace-nowrap">联系地址</span>
                    <span className="font-medium text-gray-900 dark:text-white text-right text-sm max-w-[60%] truncate" title={selectedLead.address}>{selectedLead.address}</span>
                 </div>
                 <div className="flex justify-between items-center">
                    <span className="text-gray-500 dark:text-gray-400 text-sm">线索来源</span>
                    <span className="inline-flex px-2.5 py-1 rounded-md bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 text-xs font-bold">
                       {selectedLead.source}
                    </span>
                 </div>
              </div>
           </div>

           {/* Purchase Needs - Violet Theme */}
           <div className="relative overflow-hidden bg-gradient-to-br from-violet-50/80 to-white dark:from-violet-900/10 dark:to-slate-800 p-6 rounded-2xl shadow-sm border border-violet-100 dark:border-violet-900/30">
              <div className="absolute -right-6 -top-6 opacity-5 dark:opacity-10 pointer-events-none">
                <Target size={120} className="text-violet-600 dark:text-violet-400" />
              </div>

              <h3 className="relative text-lg font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                 <span className="p-2 bg-violet-100 dark:bg-violet-900/50 rounded-lg text-violet-600 dark:text-violet-400">
                    <Target size={20} />
                 </span>
                 购车需求
              </h3>

              <div className="relative space-y-4">
                 <div className="flex justify-between items-center pb-3 border-b border-violet-100/50 dark:border-violet-800/30">
                    <span className="text-gray-500 dark:text-gray-400 text-sm">意向车型</span>
                    <span className="font-bold text-gray-900 dark:text-white text-base">{selectedLead.needs.model}</span>
                 </div>
                 <div className="flex justify-between items-center pb-3 border-b border-violet-100/50 dark:border-violet-800/30">
                    <span className="text-gray-500 dark:text-gray-400 text-sm">购车预算</span>
                    <span className="font-medium text-gray-900 dark:text-white">{selectedLead.needs.budget}</span>
                 </div>
                 <div className="flex justify-between items-center pb-3 border-b border-violet-100/50 dark:border-violet-800/30">
                    <span className="text-gray-500 dark:text-gray-400 text-sm">预计购车</span>
                    <span className="font-medium text-gray-900 dark:text-white">{selectedLead.needs.timeframe}</span>
                 </div>
                 <div className="flex justify-between items-center">
                    <span className="text-gray-500 dark:text-gray-400 text-sm">关注重点</span>
                    <span className="font-medium text-violet-700 dark:text-violet-300 bg-violet-50 dark:bg-violet-900/20 px-2 py-0.5 rounded text-sm">{selectedLead.needs.focus}</span>
                 </div>
              </div>
           </div>

           {/* Status Analysis - Emerald Theme */}
           <div className="relative overflow-hidden bg-gradient-to-br from-emerald-50/80 to-white dark:from-emerald-900/10 dark:to-slate-800 p-6 rounded-2xl shadow-sm border border-emerald-100 dark:border-emerald-900/30">
              <div className="absolute -right-6 -top-6 opacity-5 dark:opacity-10 pointer-events-none">
                <TrendingUp size={120} className="text-emerald-600 dark:text-emerald-400" />
              </div>

              <h3 className="relative text-lg font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                 <span className="p-2 bg-emerald-100 dark:bg-emerald-900/50 rounded-lg text-emerald-600 dark:text-emerald-400">
                    <TrendingUp size={20} />
                 </span>
                 线索状态分析
              </h3>

              <div className="relative flex items-center justify-between h-full pb-4">
                 <div className="flex flex-col items-center">
                    <div className="relative w-24 h-24">
                        <svg className="w-full h-full transform -rotate-90">
                           <circle cx="48" cy="48" r="42" stroke="currentColor" strokeWidth="8" fill="transparent" className="text-emerald-100 dark:text-emerald-900/20" />
                           <circle cx="48" cy="48" r="42" stroke="currentColor" strokeWidth="8" fill="transparent" strokeDasharray={42 * 2 * Math.PI} strokeDashoffset={42 * 2 * Math.PI * (1 - selectedLead.probability / 100)} className={`text-emerald-500 transition-all duration-1000 ease-out`} strokeLinecap="round" />
                        </svg>
                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                           <span className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">{selectedLead.probability}%</span>
                           <span className="text-[10px] text-gray-400">成交概率</span>
                        </div>
                    </div>
                 </div>
                 
                 <div className="flex-1 pl-6 space-y-4">
                    <div>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">预计成交时间</p>
                        <p className="text-lg font-bold text-gray-900 dark:text-white">{selectedLead.estimatedDealTime}</p>
                    </div>
                    <div>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">当前阶段</p>
                        <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold ${
                            selectedLead.status === 'new' ? 'bg-blue-100 text-blue-700' : 
                            selectedLead.status === 'negotiation' ? 'bg-emerald-100 text-emerald-700' : 
                            selectedLead.status === 'closed' ? 'bg-green-100 text-green-700' :
                            'bg-gray-100 text-gray-700'
                        }`}>
                           {selectedLead.status === 'new' ? '待跟进' : selectedLead.status === 'following' ? '跟进中' : selectedLead.status === 'negotiation' ? '商务谈判' : '已成交'}
                        </span>
                    </div>
                 </div>
              </div>
           </div>
        </div>

        {/* 2. Middle Section: History & Interaction */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
           {/* Left: Follow-up History (Timeline) */}
           <div className="lg:col-span-2 bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-700">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                 <Clock className="text-orange-500" size={20} /> 跟进历史
              </h3>
              <div className="relative border-l-2 border-gray-100 dark:border-slate-700 ml-3 space-y-8 pb-4">
                 {selectedLead.history.map((item, idx) => (
                    <div key={idx} className="relative pl-8">
                       <div className={`absolute -left-[9px] top-0 w-4 h-4 rounded-full border-2 border-white dark:border-slate-800 ${
                          item.type === 'visit' ? 'bg-purple-500' : item.type === 'call' ? 'bg-blue-500' : 'bg-gray-400'
                       }`}></div>
                       <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-1">
                          <span className="text-sm font-bold text-gray-900 dark:text-white">
                             {item.type === 'visit' ? '到店接待' : item.type === 'call' ? '电话沟通' : item.type === 'system' ? '系统分配' : '微信沟通'}
                          </span>
                          <span className="text-xs text-gray-400">{item.date}</span>
                       </div>
                       <p className="text-sm text-gray-600 dark:text-gray-300 bg-gray-50 dark:bg-slate-700/50 p-3 rounded-lg mt-2">
                          {item.content}
                       </p>
                       <p className="text-xs text-gray-400 mt-1 flex items-center gap-1">
                          <User size={12} /> {item.person}
                       </p>
                    </div>
                 ))}
              </div>
           </div>

           {/* Right: Advisor Interaction & Suggestions */}
           <div className="space-y-6">
              {/* Interaction Records */}
              <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-700">
                 <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                    <FileText className="text-cyan-500" size={20} /> 顾问互动记录
                 </h3>
                 <div className="space-y-4">
                    {selectedLead.interactions.map((inter, idx) => (
                       <div key={idx} className="p-3 bg-cyan-50 dark:bg-cyan-900/20 rounded-lg border border-cyan-100 dark:border-cyan-900/30">
                          <div className="flex justify-between items-start mb-1">
                             <span className="font-bold text-cyan-800 dark:text-cyan-200 text-sm">{inter.action}</span>
                             <span className="text-xs text-cyan-600 dark:text-cyan-400">{inter.date}</span>
                          </div>
                          <p className="text-xs text-cyan-700 dark:text-cyan-300">
                             {inter.details}
                          </p>
                       </div>
                    ))}
                    {selectedLead.interactions.length === 0 && (
                       <p className="text-sm text-gray-400 text-center py-4">暂无重要互动记录</p>
                    )}
                 </div>
              </div>

              {/* Suggestions */}
              <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-700">
                 <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                    <AlertCircle className="text-yellow-500" size={20} /> 改进建议
                 </h3>
                 <ul className="space-y-3">
                    {selectedLead.suggestions.map((sugg, idx) => (
                       <li key={idx} className="flex gap-2 text-sm text-gray-600 dark:text-gray-300">
                          <CheckCircle2 size={16} className="text-green-500 flex-shrink-0 mt-0.5" />
                          <span>{sugg}</span>
                       </li>
                    ))}
                 </ul>
              </div>
           </div>
        </div>
        
        <AIAssistant context="lead_detail" data={selectedLead} />
      </div>
    );
  }

  // --- List View ---
  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header & Filters */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">线索管理</h2>
        
        <div className="flex flex-wrap gap-3 items-center">
           <div className="relative">
             <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
             <input 
               type="text" 
               placeholder="搜索客户姓名/手机号" 
               className="bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-lg pl-9 pr-4 py-2 text-sm outline-none focus:ring-2 focus:ring-primary-500 dark:text-white w-48"
             />
           </div>
           
           <select 
             className="bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary-500 dark:text-white"
             value={sourceFilter}
             onChange={(e) => setSourceFilter(e.target.value)}
           >
             <option>全部来源</option>
             <option>线上广告</option>
             <option>线下活动</option>
             <option>客户推荐</option>
           </select>

           <select 
             className="bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary-500 dark:text-white"
             value={statusFilter}
             onChange={(e) => setStatusFilter(e.target.value)}
           >
             <option>全部状态</option>
             <option>待跟进</option>
             <option>跟进中</option>
             <option>商务谈判</option>
             <option>已成交</option>
           </select>

           <button className="flex items-center gap-2 px-4 py-2 bg-primary-600 text-white rounded-lg text-sm font-medium hover:bg-primary-700 transition-colors shadow-sm">
             <Plus size={16} /> 新增线索
           </button>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-gray-100 dark:border-slate-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-50 dark:bg-slate-700/50">
              <tr>
                <th className="px-6 py-4 font-semibold text-gray-600 dark:text-gray-300 text-sm">线索ID</th>
                <th className="px-6 py-4 font-semibold text-gray-600 dark:text-gray-300 text-sm">客户姓名</th>
                <th className="px-6 py-4 font-semibold text-gray-600 dark:text-gray-300 text-sm">线索来源</th>
                <th className="px-6 py-4 font-semibold text-gray-600 dark:text-gray-300 text-sm">跟进状态</th>
                <th className="px-6 py-4 font-semibold text-gray-600 dark:text-gray-300 text-sm">销售顾问</th>
                <th className="px-6 py-4 font-semibold text-gray-600 dark:text-gray-300 text-sm">预计成交时间</th>
                <th className="px-6 py-4 font-semibold text-gray-600 dark:text-gray-300 text-sm">转化率</th>
                <th className="px-6 py-4 font-semibold text-gray-600 dark:text-gray-300 text-sm text-right">操作</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-slate-700">
              {MOCK_LEADS_FULL.filter(l => 
                (sourceFilter === '全部来源' || l.source === sourceFilter) && 
                (statusFilter === '全部状态' || 
                 (statusFilter === '待跟进' && l.status === 'new') ||
                 (statusFilter === '跟进中' && l.status === 'following') ||
                 (statusFilter === '商务谈判' && l.status === 'negotiation') ||
                 (statusFilter === '已成交' && l.status === 'closed')
                )
              ).map((lead) => (
                <tr key={lead.id} className="hover:bg-gray-50 dark:hover:bg-slate-700/30 transition-colors">
                  <td className="px-6 py-4 text-sm font-mono text-gray-500 dark:text-gray-400">{lead.id}</td>
                  <td className="px-6 py-4">
                    <div className="flex flex-col">
                      <span className="text-sm font-bold text-gray-900 dark:text-white">{lead.name}</span>
                      <span className="text-xs text-gray-400">{lead.phone}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-300">{lead.source}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${
                      lead.status === 'new' ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300' :
                      lead.status === 'following' ? 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-300' :
                      lead.status === 'negotiation' ? 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300' :
                      'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300'
                    }`}>
                       {lead.status === 'new' ? '待跟进' : lead.status === 'following' ? '跟进中' : lead.status === 'negotiation' ? '商务谈判' : '已成交'}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-300">{lead.salesperson}</td>
                  <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-300">{lead.estimatedDealTime}</td>
                  <td className="px-6 py-4">
                     <div className="flex items-center gap-2">
                        <div className="w-16 bg-gray-200 dark:bg-slate-600 h-1.5 rounded-full overflow-hidden">
                           <div 
                             className={`h-full ${lead.probability > 70 ? 'bg-green-500' : lead.probability > 40 ? 'bg-blue-500' : 'bg-gray-400'}`} 
                             style={{width: `${lead.probability}%`}}
                           ></div>
                        </div>
                        <span className="text-xs font-bold text-gray-600 dark:text-gray-300">{lead.probability}%</span>
                     </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button 
                      onClick={() => handleViewDetail(lead)}
                      className="inline-flex items-center gap-1 text-primary-600 hover:text-primary-700 text-sm font-medium transition-colors"
                    >
                      查看详情 <ChevronRight size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {MOCK_LEADS_FULL.length === 0 && (
             <div className="p-8 text-center text-gray-500">
                暂无数据
             </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LeadLibrary;
