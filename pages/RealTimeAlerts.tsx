
import React, { useState, useEffect } from 'react';
import { 
  AlertTriangle, 
  Clock, 
  Mic, 
  MessageSquare, 
  Filter, 
  Search, 
  MoreHorizontal, 
  PlayCircle, 
  Phone, 
  ArrowRight,
  ShieldAlert,
  Frown,
  Zap,
  VolumeX,
  CheckCircle2,
  XCircle,
  Bell,
  Activity,
  User,
  PauseCircle,
  X,
  Volume2,
  StopCircle,
  Send
} from 'lucide-react';
import AIAssistant from '../components/AIAssistant';

// --- Mock Data ---

interface AlertSession {
  id: string;
  store: string;
  advisor: string;
  advisorAvatar: string;
  customer: string;
  startTime: string;
  duration: string;
  type: 'emotion' | 'silence' | 'sensitive' | 'compliance';
  level: 'high' | 'medium' | 'low';
  status: 'active' | 'processing' | 'handled';
  triggerContent: string;
  description: string;
}

const MOCK_ALERTS: AlertSession[] = [
  {
    id: 'AL-20231026-001',
    store: '上海旗舰店',
    advisor: '张新人',
    advisorAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=张新人',
    customer: '陈先生',
    startTime: '14:20:05',
    duration: '08:12',
    type: 'emotion',
    level: 'high',
    status: 'active',
    triggerContent: '客户声量 > 85dB，检测到愤怒关键词“欺诈”、“投诉”',
    description: '客户因交付延期问题情绪激动，顾问安抚未果，存在升级投诉风险。'
  },
  {
    id: 'AL-20231026-003',
    store: '北京朝阳店',
    advisor: '李进取',
    advisorAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=李进取',
    customer: '王女士',
    startTime: '14:35:10',
    duration: '05:45',
    type: 'silence',
    level: 'medium',
    status: 'active',
    triggerContent: '持续静默超过 180秒',
    description: '会话中出现长时间空白，可能顾问离岗或服务流程中断。'
  },
  {
    id: 'AL-20231026-005',
    store: '广州天河店',
    advisor: '王金牌',
    advisorAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=王金牌',
    customer: '赵先生',
    startTime: '14:40:22',
    duration: '12:30',
    type: 'sensitive',
    level: 'medium',
    status: 'processing',
    triggerContent: '触发敏感词：“私下转账”',
    description: '顾问引导客户进行非对公账户交易，触发合规风控预警。'
  },
  {
    id: 'AL-20231026-008',
    store: '上海旗舰店',
    advisor: '孙销售',
    advisorAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=孙销售',
    customer: '吴先生',
    startTime: '13:10:00',
    duration: '25:00',
    type: 'compliance',
    level: 'low',
    status: 'handled',
    triggerContent: '未进行“竞品对比”标准话术',
    description: '关键流程缺失预警，已通过系统推送提醒顾问补充。'
  }
];

const StatsCard = ({ title, value, icon: Icon, color, subText }: any) => (
  <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-700 flex items-center justify-between hover:shadow-md transition-shadow">
    <div>
      <p className="text-gray-500 dark:text-gray-400 text-sm font-medium mb-1">{title}</p>
      <h3 className="text-3xl font-bold text-gray-900 dark:text-white">{value}</h3>
      {subText && <p className="text-xs text-gray-400 mt-1">{subText}</p>}
    </div>
    <div className={`p-4 rounded-full ${color} bg-opacity-10`}>
      <Icon className={`w-6 h-6 ${color.replace('bg-', 'text-')}`} />
    </div>
  </div>
);

// --- Live Monitor Modal Component ---
const LiveMonitorModal = ({ alert, onClose }: { alert: AlertSession, onClose: () => void }) => {
  const [duration, setDuration] = useState(0);

  // Simulate duration timer ticking
  useEffect(() => {
    const timer = setInterval(() => setDuration(d => d + 1), 1000);
    return () => clearInterval(timer);
  }, []);

  const formatDuration = (secs: number) => {
    const min = Math.floor(secs / 60);
    const sec = secs % 60;
    return `${min.toString().padStart(2, '0')}:${sec.toString().padStart(2, '0')}`;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-fade-in">
      <div className="bg-white dark:bg-slate-800 w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden border border-gray-100 dark:border-slate-700 flex flex-col">
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-100 dark:border-slate-700 flex justify-between items-center bg-gray-50 dark:bg-slate-900/50">
           <div className="flex items-center gap-2">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
              </span>
              <h3 className="font-bold text-gray-900 dark:text-white">实时监听中</h3>
           </div>
           <button onClick={onClose} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors">
              <X size={20} />
           </button>
        </div>

        {/* Content */}
        <div className="p-6">
           {/* Profile Info */}
           <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-3">
                 <div className="relative">
                    <img src={alert.advisorAvatar} alt="Advisor" className="w-14 h-14 rounded-full border-2 border-white dark:border-slate-700 shadow-md object-cover" />
                    <div className="absolute -bottom-1 -right-1 bg-green-500 text-white text-[10px] px-1.5 py-0.5 rounded-full border-2 border-white dark:border-slate-800 font-bold shadow-sm">
                      顾问
                    </div>
                 </div>
                 <div>
                    <h4 className="font-bold text-lg text-gray-900 dark:text-white">{alert.advisor}</h4>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{alert.store}</p>
                 </div>
              </div>
              
              <div className="h-10 w-px bg-gray-200 dark:bg-slate-700 mx-4"></div>

              <div className="flex items-center gap-3">
                 <div className="text-right">
                    <h4 className="font-bold text-lg text-gray-900 dark:text-white">{alert.customer}</h4>
                    <p className="text-xs text-gray-500 dark:text-gray-400">客户</p>
                 </div>
                 <div className="w-14 h-14 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400 border-2 border-white dark:border-slate-700 shadow-md">
                    <User size={24} />
                 </div>
              </div>
           </div>

           {/* Audio Visualizer (Simulated) */}
           <div className="bg-slate-900 rounded-xl p-6 mb-6 relative overflow-hidden flex flex-col items-center justify-center min-h-[160px] shadow-inner">
              {/* Context Trigger Overlay */}
              <div className="absolute top-3 left-3 right-3 flex justify-center">
                 <span className="bg-red-500/20 text-red-200 border border-red-500/30 px-3 py-1 rounded-full text-xs font-medium backdrop-blur-sm truncate max-w-full flex items-center gap-1">
                    <AlertTriangle size={12} />
                    触发: {alert.triggerContent}
                 </span>
              </div>

              {/* Waveform Bars */}
              <div className="flex items-center gap-1.5 h-16 mt-6">
                 {Array.from({ length: 16 }).map((_, i) => (
                    <div 
                      key={i} 
                      className="w-1.5 bg-green-400 rounded-full animate-wave"
                      style={{
                        height: '20%',
                        animationDelay: `${i * 0.1}s`,
                        animationDuration: `${0.6 + Math.random() * 0.4}s`
                      }}
                    ></div>
                 ))}
              </div>
              
              {/* Timer */}
              <div className="mt-4 font-mono text-2xl text-white font-bold tracking-widest text-shadow">
                 {formatDuration(duration)}
              </div>
           </div>

           {/* Quick Actions */}
           <div className="grid grid-cols-2 gap-3">
              <button className="flex items-center justify-center gap-2 py-3 bg-primary-600 hover:bg-primary-700 text-white rounded-xl font-medium transition-colors shadow-lg shadow-primary-500/20 active:scale-[0.98]">
                 <Send size={18} /> 发送私密提醒
              </button>
              <button 
                 onClick={onClose}
                 className="flex items-center justify-center gap-2 py-3 bg-white dark:bg-slate-700 border border-gray-200 dark:border-slate-600 text-gray-700 dark:text-white rounded-xl font-medium hover:bg-gray-50 dark:hover:bg-slate-600 transition-colors active:scale-[0.98]"
              >
                 <StopCircle size={18} className="text-red-500" /> 停止监听
              </button>
           </div>
        </div>
        
        {/* Footer info */}
        <div className="px-6 py-3 bg-gray-50 dark:bg-slate-900/50 border-t border-gray-100 dark:border-slate-700 text-center">
           <p className="text-xs text-gray-500 flex items-center justify-center gap-1.5">
             <Volume2 size={14} /> 系统正在实时转录并分析语义风险
           </p>
        </div>
      </div>
      <style>{`
        @keyframes wave {
          0%, 100% { height: 20%; opacity: 0.5; }
          50% { height: 100%; opacity: 1; }
        }
        .animate-wave {
          animation: wave 1s ease-in-out infinite;
        }
        .text-shadow {
          text-shadow: 0 2px 4px rgba(0,0,0,0.5);
        }
      `}</style>
    </div>
  );
}

const RealTimeAlerts: React.FC = () => {
  const [filterType, setFilterType] = useState('all');
  const [filterStore, setFilterStore] = useState('all');
  const [monitoringAlert, setMonitoringAlert] = useState<AlertSession | null>(null);

  const filteredAlerts = MOCK_ALERTS.filter(alert => {
    if (filterType !== 'all' && alert.type !== filterType) return false;
    if (filterStore !== 'all' && alert.store !== filterStore) return false;
    return true;
  });

  return (
    <div className="space-y-6 animate-fade-in pb-12 relative">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
            <Zap className="text-red-500" /> 实时异常预警
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            系统实时监控全网会话，自动识别并推送高风险异常事件
          </p>
        </div>
        <div className="flex items-center gap-3">
            <span className="flex items-center gap-2 px-3 py-1 bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400 text-sm font-medium rounded-full border border-green-200 dark:border-green-800">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                </span>
                监控运行中
            </span>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard 
          title="今日触发预警" 
          value="12" 
          subText="+2 较昨日" 
          icon={Bell} 
          color="bg-blue-500" 
        />
        <StatsCard 
          title="待处理高风险" 
          value="3" 
          subText="需立即介入" 
          icon={ShieldAlert} 
          color="bg-red-500" 
        />
        <StatsCard 
          title="情绪异常事件" 
          value="5" 
          subText="客户愤怒/激动" 
          icon={Frown} 
          color="bg-orange-500" 
        />
        <StatsCard 
          title="违规/敏感词" 
          value="2" 
          subText="涉及合规风险" 
          icon={AlertTriangle} 
          color="bg-purple-500" 
        />
      </div>

      {/* Filter Bar */}
      <div className="bg-white dark:bg-slate-800 p-4 rounded-xl shadow-sm border border-gray-100 dark:border-slate-700 flex flex-wrap items-center gap-4">
         <div className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-200 mr-2">
            <Filter size={16} /> 筛选:
         </div>
         
         <select 
            className="bg-gray-50 dark:bg-slate-700 border border-gray-200 dark:border-slate-600 rounded-lg px-3 py-1.5 text-sm outline-none focus:ring-2 focus:ring-primary-500 dark:text-white cursor-pointer"
            value={filterStore}
            onChange={(e) => setFilterStore(e.target.value)}
         >
            <option value="all">全部门店</option>
            <option value="上海旗舰店">上海旗舰店</option>
            <option value="北京朝阳店">北京朝阳店</option>
            <option value="广州天河店">广州天河店</option>
         </select>

         <div className="flex bg-gray-100 dark:bg-slate-700 p-1 rounded-lg">
            {[
              { id: 'all', label: '全部类型' },
              { id: 'emotion', label: '情绪异常' },
              { id: 'silence', label: '长时间静默' },
              { id: 'sensitive', label: '敏感词' },
              { id: 'compliance', label: '流程违规' },
            ].map(type => (
              <button
                key={type.id}
                onClick={() => setFilterType(type.id)}
                className={`px-3 py-1 text-sm rounded-md transition-all ${filterType === type.id ? 'bg-white dark:bg-slate-600 shadow-sm text-primary-600 dark:text-primary-400 font-medium' : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'}`}
              >
                {type.label}
              </button>
            ))}
         </div>

         <div className="flex-1"></div>

         <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input 
              type="text" 
              placeholder="搜索顾问姓名..." 
              className="pl-9 pr-4 py-1.5 bg-gray-50 dark:bg-slate-700 border border-gray-200 dark:border-slate-600 rounded-lg text-sm outline-none focus:ring-2 focus:ring-primary-500 dark:text-white w-48"
            />
         </div>
      </div>

      {/* Alerts List */}
      <div className="space-y-4">
         {filteredAlerts.length > 0 ? (
            filteredAlerts.map(alert => (
               <div 
                 key={alert.id} 
                 className={`bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-l-4 transition-all hover:shadow-md ${
                   alert.level === 'high' ? 'border-l-red-500 border-y-gray-100 border-r-gray-100 dark:border-y-slate-700 dark:border-r-slate-700' : 
                   alert.level === 'medium' ? 'border-l-orange-500 border-y-gray-100 border-r-gray-100 dark:border-y-slate-700 dark:border-r-slate-700' : 
                   'border-l-blue-500 border-y-gray-100 border-r-gray-100 dark:border-y-slate-700 dark:border-r-slate-700'
                 }`}
               >
                 <div className="p-5 flex flex-col md:flex-row gap-6">
                    {/* Left: Info */}
                    <div className="md:w-64 flex-shrink-0 flex flex-col gap-3 border-b md:border-b-0 md:border-r border-gray-100 dark:border-slate-700 pb-4 md:pb-0 md:pr-4">
                       <div className="flex items-center gap-3">
                          <img src={alert.advisorAvatar} alt={alert.advisor} className="w-10 h-10 rounded-full bg-gray-100 object-cover" />
                          <div>
                             <h4 className="font-bold text-gray-900 dark:text-white">{alert.advisor}</h4>
                             <p className="text-xs text-gray-500">{alert.store}</p>
                          </div>
                       </div>
                       <div className="flex items-center justify-between text-sm bg-gray-50 dark:bg-slate-700/50 p-2 rounded-lg">
                          <div className="flex items-center gap-1.5">
                             <User size={14} className="text-gray-400" />
                             <span className="text-gray-700 dark:text-gray-300">{alert.customer}</span>
                          </div>
                          <div className="flex items-center gap-1.5">
                             <Clock size={14} className="text-gray-400" />
                             <span className="font-mono text-gray-700 dark:text-gray-300">{alert.startTime}</span>
                          </div>
                       </div>
                       <div className="flex gap-2">
                          <span className={`px-2 py-0.5 rounded text-xs font-bold uppercase ${
                             alert.level === 'high' ? 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300' : 
                             alert.level === 'medium' ? 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-300' : 
                             'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300'
                          }`}>
                             {alert.level === 'high' ? 'P0 极高风险' : alert.level === 'medium' ? 'P1 高风险' : 'P2 中风险'}
                          </span>
                          <span className="px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-600 dark:bg-slate-700 dark:text-gray-300 flex items-center gap-1">
                             <Activity size={12} /> {alert.status === 'active' ? '进行中' : alert.status === 'processing' ? '处理中' : '已结束'}
                          </span>
                       </div>
                    </div>

                    {/* Middle: Content */}
                    <div className="flex-1 flex flex-col justify-center">
                       <div className="flex items-center gap-2 mb-2">
                          {alert.type === 'emotion' && <Frown className="text-red-500" size={18} />}
                          {alert.type === 'silence' && <VolumeX className="text-orange-500" size={18} />}
                          {alert.type === 'sensitive' && <ShieldAlert className="text-purple-500" size={18} />}
                          {alert.type === 'compliance' && <AlertTriangle className="text-blue-500" size={18} />}
                          <h3 className="font-bold text-gray-900 dark:text-white">
                             {alert.type === 'emotion' ? '情绪识别异常' : alert.type === 'silence' ? '异常静默' : alert.type === 'sensitive' ? '敏感词触发' : '流程违规'}
                          </h3>
                       </div>
                       <p className="text-sm font-medium text-gray-800 dark:text-gray-200 mb-2 p-3 bg-gray-50 dark:bg-slate-900/50 rounded-lg border border-gray-100 dark:border-slate-700/50">
                          {alert.triggerContent}
                       </p>
                       <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-2 leading-relaxed">
                          {alert.description}
                       </p>
                    </div>

                    {/* Right: Actions */}
                    <div className="flex flex-col justify-center gap-3 md:w-40 border-t md:border-t-0 md:border-l border-gray-100 dark:border-slate-700 pt-4 md:pt-0 md:pl-4">
                        {alert.status === 'active' && (
                           <button 
                             onClick={() => setMonitoringAlert(alert)}
                             className="flex items-center justify-center gap-2 px-3 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg text-xs font-bold transition-all shadow-md shadow-red-500/20 active:scale-95"
                           >
                              <Mic size={14} className="animate-pulse" /> 实时监听
                           </button>
                        )}
                        <button className="flex items-center justify-center gap-2 px-3 py-2 bg-white dark:bg-slate-700 border border-gray-200 dark:border-slate-600 text-gray-700 dark:text-white rounded-lg text-xs font-medium hover:bg-gray-50 dark:hover:bg-slate-600 transition-colors">
                           <MessageSquare size={14} /> 发送提醒
                        </button>
                        <button className="flex items-center justify-center gap-2 px-3 py-2 bg-white dark:bg-slate-700 border border-gray-200 dark:border-slate-600 text-gray-700 dark:text-white rounded-lg text-xs font-medium hover:bg-gray-50 dark:hover:bg-slate-600 transition-colors">
                           查看详情
                        </button>
                    </div>
                 </div>
               </div>
            ))
         ) : (
            <div className="p-12 text-center text-gray-500 bg-white dark:bg-slate-800 rounded-xl border border-dashed border-gray-200 dark:border-slate-700">
               <CheckCircle2 size={48} className="mx-auto mb-4 text-green-500 opacity-50" />
               <p className="text-lg font-medium">当前无异常预警</p>
               <p className="text-sm">系统运行正常，请继续保持</p>
            </div>
         )}
      </div>

      {/* Live Monitor Modal Overlay */}
      {monitoringAlert && (
         <LiveMonitorModal alert={monitoringAlert} onClose={() => setMonitoringAlert(null)} />
      )}

      <AIAssistant context="dashboard" />
    </div>
  );
};

export default RealTimeAlerts;
