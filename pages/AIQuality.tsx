
import React, { useState } from 'react';
import { 
  Search, 
  Filter, 
  ChevronRight, 
  ArrowLeft,
  PlayCircle,
  PauseCircle,
  AlertCircle,
  CheckCircle2,
  XCircle,
  Smile,
  Meh,
  Frown,
  Mic,
  Calendar,
  User,
  MapPin,
  Clock,
  ShieldCheck,
  TrendingUp,
  FileText,
  AlertTriangle,
  MessageSquare
} from 'lucide-react';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer,
  BarChart, Bar, Cell
} from 'recharts';
import AIAssistant from '../components/AIAssistant';

// --- Mock Data ---

interface SessionRecord {
  id: string;
  advisor: string;
  store: string;
  date: string;
  duration: number; // minutes
  scriptScore: number;
  emotion: 'positive' | 'neutral' | 'negative';
  processRate: number;
  criticalNodesPassed: boolean;
}

const MOCK_SESSIONS: SessionRecord[] = [
  { id: 'S-20231026-01', advisor: '王金牌', store: '上海旗舰店', date: '2023-10-26 14:30', duration: 18, scriptScore: 92, emotion: 'positive', processRate: 95, criticalNodesPassed: true },
  { id: 'S-20231026-02', advisor: '李进取', store: '上海旗舰店', date: '2023-10-26 15:15', duration: 12, scriptScore: 78, emotion: 'neutral', processRate: 80, criticalNodesPassed: true },
  { id: 'S-20231026-03', advisor: '张新人', store: '上海旗舰店', date: '2023-10-26 16:00', duration: 25, scriptScore: 65, emotion: 'negative', processRate: 55, criticalNodesPassed: false },
  { id: 'S-20231026-04', advisor: '王金牌', store: '上海旗舰店', date: '2023-10-26 09:45', duration: 15, scriptScore: 95, emotion: 'positive', processRate: 98, criticalNodesPassed: true },
  { id: 'S-20231026-05', advisor: '李进取', store: '上海旗舰店', date: '2023-10-26 11:20', duration: 8, scriptScore: 70, emotion: 'neutral', processRate: 75, criticalNodesPassed: false },
];

const EMOTION_TREND_DATA = [
  { time: '0m', score: 60 },
  { time: '2m', score: 70 },
  { time: '4m', score: 65 },
  { time: '6m', score: 50 },
  { time: '8m', score: 40 }, // Dip
  { time: '10m', score: 55 },
  { time: '12m', score: 75 },
  { time: '14m', score: 85 },
];

const PROCESS_NODES_DETAIL = [
  { name: '进店问候', status: 'pass', score: 100 },
  { name: '意图问询', status: 'pass', score: 90 },
  { name: '需求分析', status: 'fail', score: 40 },
  { name: '产品介绍', status: 'pass', score: 85 },
  { name: '试驾邀约', status: 'fail', score: 0 },
  { name: '报价谈判', status: 'pass', score: 80 },
  { name: '送别', status: 'pass', score: 95 },
];

// Mock Transcript Data
const TRANSCRIPT_LOGS = [
  { 
    id: 1, 
    speaker: 'Advisor', 
    text: '您好，欢迎光临！请问是第一次来看车吗？', 
    timestamp: '00:05',
    checkResult: { status: 'pass', rule: '进店问候' }
  },
  { 
    id: 2, 
    speaker: 'Customer', 
    text: '对，想看看Model Y。', 
    timestamp: '00:10',
    checkResult: null
  },
  { 
    id: 3, 
    speaker: 'Advisor', 
    text: '好的，Model Y 这边请。请问您平时主要是几个人用车呢？', 
    timestamp: '00:15',
    checkResult: { status: 'pass', rule: '需求挖掘-用车人数' }
  },
  { 
    id: 4, 
    speaker: 'Customer', 
    text: '主要是上下班代步，偶尔周末带孩子出去玩。', 
    timestamp: '00:22',
    checkResult: null
  },
  { 
    id: 5, 
    speaker: 'Advisor', 
    text: '明白了，那您对空间和续航应该比较看重。这台车后排空间非常大，放儿童座椅很方便。', 
    timestamp: '00:30',
    checkResult: { status: 'pass', rule: '产品亮点介绍' }
  },
  { 
    id: 6, 
    speaker: 'Customer', 
    text: '续航怎么样？我看网上说冬天打折很厉害。', 
    timestamp: '00:38',
    checkResult: null
  },
  { 
    id: 7, 
    speaker: 'Advisor', 
    text: '我们全系标配热泵空调，能有效提升冬季续航。而且我们超充桩覆盖很广，完全不用担心的。', 
    timestamp: '00:45',
    checkResult: { status: 'pass', rule: '异议处理-续航' }
  },
  { 
    id: 8, 
    speaker: 'Customer', 
    text: '隔壁那个XX牌子的车好像配置更高，价格还便宜两万。', 
    timestamp: '00:55',
    checkResult: null
  },
  { 
    id: 9, 
    speaker: 'Advisor', 
    text: '那种车也就是堆料，开起来底盘松散得很，哪像我们车经过市场验证的。', 
    timestamp: '01:05',
    checkResult: { status: 'fail', rule: '竞品攻击-违规' } // Failed
  },
  { 
    id: 10, 
    speaker: 'Customer', 
    text: '额...我还是再看看吧。', 
    timestamp: '01:12',
    checkResult: null
  },
  { 
    id: 11, 
    speaker: 'Advisor', 
    text: '好的，您再转转。', 
    timestamp: '01:15',
    checkResult: { status: 'risk', rule: '挽留话术缺失' } // Risk
  }
];

// --- Components ---

const AIQuality: React.FC = () => {
  const [view, setView] = useState<'list' | 'detail'>('list');
  const [selectedSession, setSelectedSession] = useState<SessionRecord | null>(null);
  const [detailTab, setDetailTab] = useState<'report' | 'transcript'>('report');
  const [isPlaying, setIsPlaying] = useState(false);

  // Filters state (visual only for mock)
  const [dateFilter, setDateFilter] = useState('Daily');
  const [advisorFilter, setAdvisorFilter] = useState('');

  const handleViewDetail = (session: SessionRecord) => {
    setSelectedSession(session);
    setDetailTab('report'); // Reset to report tab
    setView('detail');
  };

  const handleBack = () => {
    setView('list');
    setSelectedSession(null);
    setIsPlaying(false);
  };

  // --- Detail View ---
  if (view === 'detail' && selectedSession) {
    return (
      <div className="space-y-6 animate-fade-in pb-20 relative">
        {/* Header */}
        <div className="flex items-center justify-between sticky top-0 bg-gray-50 dark:bg-slate-900 z-20 py-2">
          <div className="flex items-center gap-4">
            <button 
              onClick={handleBack}
              className="p-2 hover:bg-gray-100 dark:hover:bg-slate-700 rounded-lg transition-colors"
            >
              <ArrowLeft size={20} className="text-gray-600 dark:text-gray-300" />
            </button>
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">会话质检详情</h2>
              <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400 mt-1">
                <span className="flex items-center gap-1"><ShieldCheck size={14} /> ID: {selectedSession.id}</span>
                <span className="flex items-center gap-1"><User size={14} /> {selectedSession.advisor}</span>
                <span className="flex items-center gap-1"><Clock size={14} /> {selectedSession.duration} 分钟</span>
              </div>
            </div>
          </div>
          
          {/* Tab Switcher */}
          <div className="flex bg-gray-200 dark:bg-slate-700 p-1 rounded-lg">
             <button 
               onClick={() => setDetailTab('report')}
               className={`px-4 py-2 text-sm font-medium rounded-md transition-all ${detailTab === 'report' ? 'bg-white dark:bg-slate-600 shadow text-primary-600 dark:text-white' : 'text-gray-500 dark:text-gray-400'}`}
             >
               检核报告
             </button>
             <button 
               onClick={() => setDetailTab('transcript')}
               className={`px-4 py-2 text-sm font-medium rounded-md transition-all ${detailTab === 'transcript' ? 'bg-white dark:bg-slate-600 shadow text-primary-600 dark:text-white' : 'text-gray-500 dark:text-gray-400'}`}
             >
               检核明细
             </button>
          </div>
        </div>

        {/* TAB 1: REPORT VIEW (Existing) */}
        {detailTab === 'report' && (
          <div className="space-y-6 animate-fade-in">
            {/* 1. Overview Cards (Script, Emotion, Process) */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Script Compliance */}
              <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-700">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                  <FileText className="text-blue-500" size={20} />
                  话术合规分析
                </h3>
                <div className="flex items-center justify-between mb-4">
                  <div className="text-center">
                    <p className="text-3xl font-bold text-gray-900 dark:text-white">{selectedSession.scriptScore}</p>
                    <p className="text-xs text-gray-500">合规评分</p>
                  </div>
                  <div className="w-px h-10 bg-gray-200 dark:bg-slate-700"></div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-red-500">2处违规</p>
                    <p className="text-xs text-gray-500">发现问题</p>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="p-3 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-100 dark:border-red-900/30">
                    <p className="text-xs font-bold text-red-700 dark:text-red-300 mb-1">违规：过度承诺</p>
                    <p className="text-xs text-gray-600 dark:text-gray-400">04:20 "这车肯定能保值率90%"</p>
                  </div>
                  <div className="p-3 bg-orange-50 dark:bg-orange-900/20 rounded-lg border border-orange-100 dark:border-orange-900/30">
                    <p className="text-xs font-bold text-orange-700 dark:text-orange-300 mb-1">缺失：竞品对比</p>
                    <p className="text-xs text-gray-600 dark:text-gray-400">未主动提及与竞品的优势差异</p>
                  </div>
                </div>
              </div>

              {/* Emotion Analysis */}
              <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-700">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                  <Smile className="text-yellow-500" size={20} />
                  情绪变化分析
                </h3>
                <div className="flex items-center gap-3 mb-4">
                  <div className={`px-3 py-1 rounded-full text-sm font-bold flex items-center gap-1 ${
                    selectedSession.emotion === 'positive' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300' :
                    selectedSession.emotion === 'neutral' ? 'bg-gray-100 text-gray-700 dark:bg-slate-700 dark:text-gray-300' :
                    'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300'
                  }`}>
                    {selectedSession.emotion === 'positive' ? <Smile size={16}/> : selectedSession.emotion === 'neutral' ? <Meh size={16}/> : <Frown size={16}/>}
                    {selectedSession.emotion === 'positive' ? '整体正向' : selectedSession.emotion === 'neutral' ? '整体平稳' : '存在负向'}
                  </div>
                  <span className="text-xs text-gray-500">波动指数: 中</span>
                </div>
                <div className="h-32 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={EMOTION_TREND_DATA}>
                      <defs>
                        <linearGradient id="colorEmotion" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#eab308" stopOpacity={0.3}/>
                          <stop offset="95%" stopColor="#eab308" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                      <XAxis dataKey="time" hide />
                      <YAxis hide domain={[0, 100]} />
                      <RechartsTooltip contentStyle={{borderRadius: '8px', fontSize: '12px'}} />
                      <Area type="monotone" dataKey="score" stroke="#eab308" strokeWidth={2} fill="url(#colorEmotion)" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
                <p className="text-xs text-gray-400 mt-2 text-center">情绪波动时段：08:00 - 09:30 (客户质疑)</p>
              </div>

              {/* Process Execution */}
              <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-700">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                  <TrendingUp className="text-purple-500" size={20} />
                  流程执行分析
                </h3>
                <div className="flex items-center justify-between mb-4">
                  <div className="text-center">
                    <p className="text-3xl font-bold text-gray-900 dark:text-white">{selectedSession.processRate}%</p>
                    <p className="text-xs text-gray-500">执行率</p>
                  </div>
                  <div className="w-24 h-2 bg-gray-100 dark:bg-slate-700 rounded-full overflow-hidden">
                    <div className="h-full bg-purple-500" style={{ width: `${selectedSession.processRate}%` }}></div>
                  </div>
                </div>
                <div className="space-y-2 h-32 overflow-y-auto pr-2 custom-scrollbar">
                  {PROCESS_NODES_DETAIL.map((node, i) => (
                    <div key={i} className="flex items-center justify-between text-sm">
                      <span className="text-gray-600 dark:text-gray-300">{node.name}</span>
                      {node.status === 'pass' ? (
                        <span className="text-green-500 flex items-center gap-1 text-xs"><CheckCircle2 size={12} /> 执行</span>
                      ) : (
                        <span className="text-red-500 flex items-center gap-1 text-xs"><XCircle size={12} /> 未执行</span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* 2. Critical Node Analysis & Suggestions */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Critical Nodes */}
              <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-700">
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                    <AlertCircle className="text-primary-500" size={20} />
                    关键节点分析
                  </h3>
                  <div className="space-y-4">
                    <div className="flex gap-4 p-4 bg-gray-50 dark:bg-slate-700/30 rounded-xl border border-gray-100 dark:border-slate-700">
                      <div className={`mt-1 p-2 rounded-full ${selectedSession.criticalNodesPassed ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
                        {selectedSession.criticalNodesPassed ? <CheckCircle2 size={20} /> : <XCircle size={20} />}
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-900 dark:text-white mb-1">
                          {selectedSession.criticalNodesPassed ? '关键节点全部通过' : '存在关键节点缺失'}
                        </h4>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          {selectedSession.criticalNodesPassed 
                            ? '销售顾问完整执行了进店、需求分析、试驾邀约等核心动作。' 
                            : '警告：本次接待未进行“试驾邀约”与“需求分析”，可能导致线索转化率降低。'}
                        </p>
                      </div>
                    </div>
                    {!selectedSession.criticalNodesPassed && (
                      <div className="pl-4 border-l-2 border-red-200 dark:border-red-900/50 space-y-2">
                          <p className="text-sm text-red-600 dark:text-red-400 font-medium">缺失节点详情：</p>
                          <ul className="list-disc list-inside text-sm text-gray-600 dark:text-gray-400">
                            <li>需求分析 - 未询问购车预算</li>
                            <li>试驾邀约 - 未主动邀请体验</li>
                          </ul>
                      </div>
                    )}
                  </div>
              </div>

              {/* Improvement Suggestions */}
              <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-700">
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                    <ShieldCheck className="text-green-500" size={20} />
                    改进建议
                  </h3>
                  <ul className="space-y-4">
                    <li className="flex gap-3">
                      <span className="flex-shrink-0 w-6 h-6 rounded-full bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 flex items-center justify-center text-xs font-bold">1</span>
                      <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                        <span className="font-bold text-gray-900 dark:text-white block mb-1">加强竞品知识储备</span>
                        建议在晨会中演练 Model Y 对比竞品的话术，重点强调续航与智能驾驶优势。
                      </p>
                    </li>
                    <li className="flex gap-3">
                      <span className="flex-shrink-0 w-6 h-6 rounded-full bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 flex items-center justify-center text-xs font-bold">2</span>
                      <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                        <span className="font-bold text-gray-900 dark:text-white block mb-1">情绪引导技巧</span>
                        当客户表达对价格的疑虑时（08:00处），建议先共情再解释价值，避免直接反驳。
                      </p>
                    </li>
                  </ul>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: TRANSCRIPT VIEW (New) */}
        {detailTab === 'transcript' && (
          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-700 animate-fade-in flex flex-col h-[600px]">
             {/* Transcript Header */}
             <div className="p-4 border-b border-gray-100 dark:border-slate-700 flex justify-between items-center bg-gray-50 dark:bg-slate-700/30 rounded-t-2xl">
                <h3 className="font-bold text-gray-900 dark:text-white flex items-center gap-2">
                   <MessageSquare size={18} className="text-primary-600" />
                   对话详情 (AI 自动转写)
                </h3>
                <div className="text-xs text-gray-500">
                   共 11 轮对话 · 检测出 3 个异常点
                </div>
             </div>

             {/* Chat Area */}
             <div className="flex-1 overflow-y-auto p-6 space-y-6">
                {TRANSCRIPT_LOGS.map((turn, index) => (
                   <div key={turn.id} className="flex gap-4 group">
                      {/* Avatar */}
                      <div className="flex-shrink-0 flex flex-col items-center">
                         <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold shadow-sm ${turn.speaker === 'Advisor' ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300' : 'bg-gray-200 text-gray-700 dark:bg-slate-600 dark:text-gray-300'}`}>
                            {turn.speaker === 'Advisor' ? '顾' : '客'}
                         </div>
                      </div>

                      {/* Content */}
                      <div className="flex-1">
                         <div className="flex items-center gap-2 mb-1">
                            <span className="text-xs font-bold text-gray-700 dark:text-gray-300">{turn.speaker === 'Advisor' ? selectedSession.advisor : '客户'}</span>
                            <span className="text-[10px] text-gray-400 font-mono">{turn.timestamp}</span>
                         </div>
                         
                         <div className="relative">
                            <p className={`text-sm leading-relaxed p-3 rounded-lg inline-block max-w-[90%] ${
                               turn.speaker === 'Advisor' 
                               ? 'bg-blue-50 dark:bg-blue-900/10 text-gray-800 dark:text-gray-200 rounded-tl-none border border-blue-100 dark:border-blue-900/30' 
                               : 'bg-gray-50 dark:bg-slate-700/50 text-gray-800 dark:text-gray-200 rounded-tl-none border border-gray-100 dark:border-slate-600'
                            }`}>
                               {turn.text}
                            </p>

                            {/* Inspection Result Badge */}
                            {turn.checkResult && (
                               <div className={`mt-2 flex items-center gap-2 text-xs px-3 py-1.5 rounded border w-fit ${
                                  turn.checkResult.status === 'pass' 
                                    ? 'bg-green-50 border-green-100 text-green-700 dark:bg-green-900/20 dark:border-green-800 dark:text-green-400' 
                                    : turn.checkResult.status === 'risk'
                                    ? 'bg-orange-50 border-orange-100 text-orange-700 dark:bg-orange-900/20 dark:border-orange-800 dark:text-orange-400'
                                    : 'bg-red-50 border-red-100 text-red-700 dark:bg-red-900/20 dark:border-red-800 dark:text-red-400'
                               }`}>
                                  {turn.checkResult.status === 'pass' && <CheckCircle2 size={12} />}
                                  {turn.checkResult.status === 'risk' && <AlertTriangle size={12} />}
                                  {turn.checkResult.status === 'fail' && <XCircle size={12} />}
                                  
                                  <span className="font-medium">
                                     {turn.checkResult.status === 'pass' ? '通过: ' : turn.checkResult.status === 'risk' ? '风险: ' : '违规: '}
                                     {turn.checkResult.rule}
                                  </span>
                               </div>
                            )}
                         </div>
                      </div>
                   </div>
                ))}
             </div>
          </div>
        )}

        {/* Floating Player Bar */}
        <div className="fixed bottom-0 left-0 md:left-64 right-0 bg-white dark:bg-slate-800 border-t border-gray-200 dark:border-slate-700 p-4 shadow-lg flex items-center justify-between z-30 px-6 md:px-10">
           <div className="flex items-center gap-4">
              <button 
                onClick={() => setIsPlaying(!isPlaying)}
                className="text-primary-600 hover:text-primary-700 transition-colors"
              >
                {isPlaying ? <PauseCircle size={40} /> : <PlayCircle size={40} />}
              </button>
              <div>
                <p className="text-sm font-bold text-gray-900 dark:text-white">会话回放</p>
                <p className="text-xs text-gray-500 font-mono">04:20 / {selectedSession.duration}:00</p>
              </div>
           </div>
           <div className="flex-1 mx-6 hidden md:block">
              {/* Fake waveform */}
              <div className="flex items-center gap-1 h-8 opacity-50">
                {Array.from({ length: 40 }).map((_, i) => (
                  <div key={i} className="w-1 bg-primary-500 rounded-full" style={{ height: `${Math.random() * 100}%` }}></div>
                ))}
              </div>
           </div>
           <button className="text-sm font-medium text-gray-500 hover:text-gray-900 dark:hover:text-white">
             1.0x 倍速
           </button>
        </div>
        
        <AIAssistant context="session_quality_detail" data={selectedSession} />
      </div>
    );
  }

  // --- List View ---
  return (
    <div className="space-y-6 animate-fade-in">
      {/* Title & Header */}
      <div className="flex flex-col gap-4">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">AI会话质检报告</h2>
        
        {/* Filters */}
        <div className="bg-white dark:bg-slate-800 p-4 rounded-xl shadow-sm border border-gray-100 dark:border-slate-700 flex flex-wrap gap-4 items-center">
          
          <div className="flex bg-gray-100 dark:bg-slate-700 p-1 rounded-lg">
            {['日报', '周报', '月报'].map((filter) => (
              <button
                key={filter}
                onClick={() => setDateFilter(filter)}
                className={`px-4 py-1.5 text-sm font-medium rounded-md transition-all ${
                  dateFilter === filter
                    ? 'bg-white dark:bg-slate-600 shadow-sm text-primary-600 dark:text-primary-400'
                    : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'
                }`}
              >
                {filter}
              </button>
            ))}
          </div>

          <div className="h-6 w-px bg-gray-200 dark:bg-slate-600 hidden md:block"></div>

          <div className="relative">
            <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
            <select className="bg-gray-50 dark:bg-slate-700 border border-gray-200 dark:border-slate-600 rounded-lg pl-9 pr-8 py-2 text-sm outline-none focus:ring-2 focus:ring-primary-500 dark:text-white appearance-none cursor-pointer min-w-[160px]">
              <option>上海旗舰店</option>
              <option>北京朝阳店</option>
            </select>
          </div>

          <div className="relative">
            <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
            <select 
              value={advisorFilter}
              onChange={(e) => setAdvisorFilter(e.target.value)}
              className="bg-gray-50 dark:bg-slate-700 border border-gray-200 dark:border-slate-600 rounded-lg pl-9 pr-8 py-2 text-sm outline-none focus:ring-2 focus:ring-primary-500 dark:text-white appearance-none cursor-pointer min-w-[160px]"
            >
              <option value="">全部销售顾问</option>
              <option value="王金牌">王金牌</option>
              <option value="李进取">李进取</option>
              <option value="张新人">张新人</option>
            </select>
          </div>

          <button className="ml-auto px-4 py-2 bg-primary-600 text-white rounded-lg text-sm font-medium hover:bg-primary-700 transition-colors shadow-sm flex items-center gap-2">
            <Filter size={16} /> 筛选
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-gray-100 dark:border-slate-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-50 dark:bg-slate-700/50">
              <tr>
                <th className="px-6 py-4 font-semibold text-gray-600 dark:text-gray-300 text-sm">会话ID</th>
                <th className="px-6 py-4 font-semibold text-gray-600 dark:text-gray-300 text-sm">销售顾问</th>
                <th className="px-6 py-4 font-semibold text-gray-600 dark:text-gray-300 text-sm">会话时长</th>
                <th className="px-6 py-4 font-semibold text-gray-600 dark:text-gray-300 text-sm">话术合规</th>
                <th className="px-6 py-4 font-semibold text-gray-600 dark:text-gray-300 text-sm">情绪评分</th>
                <th className="px-6 py-4 font-semibold text-gray-600 dark:text-gray-300 text-sm">流程执行率</th>
                <th className="px-6 py-4 font-semibold text-gray-600 dark:text-gray-300 text-sm">关键节点</th>
                <th className="px-6 py-4 font-semibold text-gray-600 dark:text-gray-300 text-sm text-right">操作</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-slate-700">
              {MOCK_SESSIONS.filter(s => !advisorFilter || s.advisor === advisorFilter).map((session) => (
                <tr key={session.id} className="hover:bg-gray-50 dark:hover:bg-slate-700/30 transition-colors">
                  <td className="px-6 py-4">
                    <span className="font-mono text-sm text-gray-500 dark:text-gray-400">{session.id}</span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center text-xs font-bold text-indigo-600 dark:text-indigo-400">
                        {session.advisor.charAt(0)}
                      </div>
                      <span className="text-sm font-medium text-gray-900 dark:text-white">{session.advisor}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-300">
                    <div className="flex items-center gap-1">
                      <Clock size={14} className="text-gray-400" /> {session.duration} min
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <div className="w-16 bg-gray-200 dark:bg-slate-600 h-1.5 rounded-full overflow-hidden">
                        <div 
                          className={`h-full ${session.scriptScore >= 90 ? 'bg-green-500' : session.scriptScore >= 70 ? 'bg-yellow-500' : 'bg-red-500'}`} 
                          style={{ width: `${session.scriptScore}%` }}
                        ></div>
                      </div>
                      <span className="text-sm font-bold text-gray-700 dark:text-gray-200">{session.scriptScore}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium ${
                      session.emotion === 'positive' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300' :
                      session.emotion === 'neutral' ? 'bg-gray-100 text-gray-700 dark:bg-slate-700 dark:text-gray-300' :
                      'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300'
                    }`}>
                      {session.emotion === 'positive' ? <Smile size={12} /> : session.emotion === 'neutral' ? <Meh size={12} /> : <Frown size={12} />}
                      {session.emotion === 'positive' ? '正向' : session.emotion === 'neutral' ? '中性' : '负向'}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm font-medium text-gray-700 dark:text-gray-300">
                    {session.processRate}%
                  </td>
                  <td className="px-6 py-4">
                    {session.criticalNodesPassed ? (
                      <span className="text-green-500 text-sm flex items-center gap-1"><CheckCircle2 size={14} /> 通过</span>
                    ) : (
                      <span className="text-red-500 text-sm flex items-center gap-1 font-medium"><AlertCircle size={14} /> 缺失</span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button 
                      onClick={() => handleViewDetail(session)}
                      className="inline-flex items-center gap-1 text-primary-600 hover:text-primary-700 text-sm font-medium transition-colors"
                    >
                      查看详情 <ChevronRight size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="p-4 border-t border-gray-100 dark:border-slate-700 flex justify-between items-center text-sm text-gray-500">
          <span>显示 1-5 共 128 条记录</span>
          <div className="flex gap-2">
            <button className="px-3 py-1 border border-gray-200 dark:border-slate-600 rounded hover:bg-gray-50 dark:hover:bg-slate-700">上一页</button>
            <button className="px-3 py-1 border border-gray-200 dark:border-slate-600 rounded hover:bg-gray-50 dark:hover:bg-slate-700">下一页</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIQuality;
