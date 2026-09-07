
import React, { useState, useEffect } from 'react';
import { 
  Maximize2, Minimize2, MapPin, Activity, Wifi, Shield, 
  Zap, Cpu, Globe, Users, TrendingUp, AlertTriangle, 
  Radio, Clock, Battery, ChevronRight, Server, Search, X,
  LucideProps
} from 'lucide-react';
import { 
  AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, BarChart, Bar, CartesianGrid
} from 'recharts';
import { useLayout } from '../components/Layout';

// --- Styles & Animation ---
const STYLES = `
  @keyframes scanline {
    0% { transform: translateY(-100%); }
    100% { transform: translateY(100%); }
  }
  @keyframes spin-slow {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }
  @keyframes pulse-glow {
    0%, 100% { opacity: 1; box-shadow: 0 0 10px #0ea5e9; }
    50% { opacity: 0.6; box-shadow: 0 0 20px #0ea5e9; }
  }
  
  .bg-cyber-grid {
    background-image: 
      linear-gradient(rgba(14, 165, 233, 0.1) 1px, transparent 1px),
      linear-gradient(90deg, rgba(14, 165, 233, 0.1) 1px, transparent 1px);
    background-size: 40px 40px;
    perspective: 1000px;
  }
  
  .glass-card {
    background: rgba(15, 23, 42, 0.7);
    backdrop-filter: blur(10px);
    border: 1px solid rgba(56, 189, 248, 0.2);
    box-shadow: 0 0 15px rgba(0, 0, 0, 0.3);
  }

  .neon-text {
    text-shadow: 0 0 8px rgba(56, 189, 248, 0.8);
  }

  .map-marker {
    transition: all 0.3s ease;
  }
  .map-marker:hover {
    transform: scale(1.5) translateZ(20px);
    z-index: 50;
  }
`;

// --- Mock Data ---

const CORE_METRICS = [
  { id: 1, label: '工牌激活总量', value: '12,845', unit: '个', icon: Cpu, color: 'text-blue-400' },
  { id: 2, label: '实时在线率', value: '96.8', unit: '%', icon: Wifi, color: 'text-green-400' },
  { id: 3, label: '当前并发会话', value: '3,210', unit: '路', icon: Activity, color: 'text-purple-400' },
  { id: 4, label: '今日累计上传', value: '45.2', unit: 'TB', icon: Database, color: 'text-cyan-400' },
];

const HEALTH_DATA = [
  { name: '健康', value: 88, color: '#10b981' },
  { name: '亚健康', value: 8, color: '#f59e0b' },
  { name: '故障', value: 4, color: '#ef4444' },
];

const FAILURE_RANKING = [
  { name: '电量耗尽', count: 145 },
  { name: '网络异常', count: 120 },
  { name: '音频丢失', count: 45 },
  { name: '硬件损坏', count: 20 },
  { name: '无法同步', count: 15 },
];

const SESSION_TREND = Array.from({ length: 12 }).map((_, i) => ({
  time: `${i * 2}:00`,
  value: Math.floor(Math.random() * 2000) + 1000,
  risk: Math.floor(Math.random() * 100),
}));

const MAP_LOCATIONS = [
  { id: 'bj', name: '北京', x: 65, y: 30, active: 1200, risk: 5, status: 'normal' },
  { id: 'sh', name: '上海', x: 75, y: 55, active: 1500, risk: 2, status: 'normal' },
  { id: 'gz', name: '广州', x: 62, y: 75, active: 1100, risk: 8, status: 'warning' },
  { id: 'cd', name: '成都', x: 42, y: 58, active: 900, risk: 12, status: 'alert' },
  { id: 'wh', name: '武汉', x: 58, y: 58, active: 850, risk: 3, status: 'normal' },
  { id: 'xa', name: '西安', x: 48, y: 48, active: 700, risk: 4, status: 'normal' },
  { id: 'hz', name: '杭州', x: 73, y: 58, active: 950, risk: 1, status: 'normal' },
];

// Mock Drill-down Data
const STORE_DETAILS = [
  { id: 'S001', name: '高新区旗舰店', badges: 45, online: 44, status: 'Normal' },
  { id: 'S002', name: '锦江区体验中心', badges: 32, online: 30, status: 'Warning' },
  { id: 'S003', name: '武侯区4S店', badges: 28, online: 20, status: 'Alert' },
  { id: 'S004', name: '天府新区展厅', badges: 15, online: 15, status: 'Normal' },
];

// --- Components ---

function Database({ className, size = 24 }: { className?: string; size?: number | string }) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width={size} height={size} viewBox="0 0 24 24" 
      fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" 
      className={className}
    >
      <ellipse cx="12" cy="5" rx="9" ry="3"></ellipse>
      <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"></path>
      <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"></path>
    </svg>
  );
}

const MetricBox: React.FC<{ item: typeof CORE_METRICS[0] }> = ({ item }) => (
  <div className="glass-card p-4 rounded-xl flex items-center justify-between group hover:bg-slate-800/80 transition-all">
    <div>
      <p className="text-slate-400 text-xs font-medium mb-1">{item.label}</p>
      <div className="flex items-baseline gap-1">
        <span className={`text-3xl font-mono font-bold ${item.color} neon-text`}>{item.value}</span>
        <span className="text-xs text-slate-500">{item.unit}</span>
      </div>
    </div>
    <div className={`p-3 rounded-lg bg-slate-800 border border-slate-700 group-hover:scale-110 transition-transform ${item.color}`}>
      <item.icon size={24} />
    </div>
  </div>
);

const NationalBadgeScreen: React.FC = () => {
  const { isFullScreen, toggleFullScreen } = useLayout();
  const [selectedCity, setSelectedCity] = useState<any>(null);
  const [drillDownView, setDrillDownView] = useState(false);

  const handleCityClick = (city: any) => {
    setSelectedCity(city);
    setDrillDownView(true);
  };

  const closeDrillDown = () => {
    setDrillDownView(false);
    setTimeout(() => setSelectedCity(null), 300); // Wait for animation
  };

  return (
    <div className={`relative bg-[#050b14] text-white overflow-hidden font-sans ${isFullScreen ? 'h-screen' : 'min-h-[calc(100vh-2rem)] rounded-xl'}`}>
      <style>{STYLES}</style>

      {/* Background Effects */}
      <div className="absolute inset-0 bg-cyber-grid opacity-20 pointer-events-none transform perspective-1000 rotateX(20deg) scale(1.5)"></div>
      <div className="absolute inset-0 bg-gradient-to-t from-[#050b14] via-transparent to-[#050b14]/80 pointer-events-none"></div>

      {/* --- Header --- */}
      <header className="absolute top-0 left-0 right-0 z-30 px-8 py-5 flex justify-between items-center bg-gradient-to-b from-[#050b14] to-transparent">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-blue-600/20 border border-blue-500/50 flex items-center justify-center backdrop-blur-md shadow-[0_0_15px_rgba(37,99,235,0.3)]">
            <Cpu className="text-blue-400 animate-pulse" size={28} />
          </div>
          <div>
            <h1 className="text-2xl font-bold tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-blue-300 via-cyan-200 to-white neon-text">
              全国工牌数据监控大屏
            </h1>
            <p className="text-[10px] text-blue-400/80 tracking-[0.4em] uppercase">National Smart Badge Monitor System</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
           <span className="flex items-center gap-2 text-xs text-blue-300 bg-blue-900/30 px-3 py-1.5 rounded-full border border-blue-500/30">
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
              Live Data Stream
           </span>
           <button onClick={toggleFullScreen} className="p-2 hover:bg-white/10 rounded-lg transition-colors text-blue-300">
             {isFullScreen ? <Minimize2 size={20} /> : <Maximize2 size={20} />}
           </button>
        </div>
      </header>

      {/* --- Main Layout --- */}
      <div className="relative z-10 w-full h-full flex flex-col pt-24 px-6 pb-6 gap-6">
        
        {/* Top Metric Strip */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
           {CORE_METRICS.map(metric => <MetricBox key={metric.id} item={metric} />)}
        </div>

        <div className="flex-1 flex gap-6 min-h-0">
           {/* Left Column: Charts */}
           <div className="w-1/4 flex flex-col gap-6">
              {/* Badge Health */}
              <div className="glass-card rounded-2xl p-5 flex-1 flex flex-col">
                 <h3 className="text-blue-300 font-bold text-sm mb-4 flex items-center gap-2 border-b border-blue-500/20 pb-2">
                    <Battery size={16} /> 工牌健康度分析
                 </h3>
                 <div className="flex-1 relative">
                    <ResponsiveContainer width="100%" height="100%">
                       <PieChart>
                          <Pie
                             data={HEALTH_DATA}
                             cx="50%" cy="50%"
                             innerRadius={60} outerRadius={80}
                             paddingAngle={5}
                             dataKey="value"
                             stroke="none"
                          >
                             {HEALTH_DATA.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.color} />
                             ))}
                          </Pie>
                          <Tooltip contentStyle={{backgroundColor: '#0f172a', border: '1px solid #334155', borderRadius: '8px'}} />
                       </PieChart>
                    </ResponsiveContainer>
                    <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                       <span className="text-3xl font-bold text-white">88%</span>
                       <span className="text-xs text-slate-400">健康率</span>
                    </div>
                 </div>
                 <div className="grid grid-cols-3 gap-2 text-center text-xs mt-2">
                    {HEALTH_DATA.map((item, i) => (
                       <div key={i}>
                          <div className="w-full h-1 rounded-full mb-1" style={{background: item.color}}></div>
                          <span className="text-slate-300">{item.name}</span>
                       </div>
                    ))}
                 </div>
              </div>

              {/* Failure Ranking */}
              <div className="glass-card rounded-2xl p-5 h-1/2 flex flex-col">
                 <h3 className="text-blue-300 font-bold text-sm mb-4 flex items-center gap-2 border-b border-blue-500/20 pb-2">
                    <AlertTriangle size={16} /> 故障原因排行
                 </h3>
                 <div className="flex-1 overflow-hidden">
                    <ResponsiveContainer width="100%" height="100%">
                       <BarChart data={FAILURE_RANKING} layout="vertical" margin={{left: 0}}>
                          <XAxis type="number" hide />
                          <YAxis dataKey="name" type="category" width={70} axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 11}} />
                          <Tooltip cursor={{fill: 'rgba(255,255,255,0.05)'}} contentStyle={{backgroundColor: '#0f172a', border: '1px solid #334155'}} />
                          <Bar dataKey="count" fill="#3b82f6" radius={[0, 4, 4, 0]} barSize={16}>
                             {FAILURE_RANKING.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={index === 0 ? '#ef4444' : '#3b82f6'} />
                             ))}
                          </Bar>
                       </BarChart>
                    </ResponsiveContainer>
                 </div>
              </div>
           </div>

           {/* Center: Map */}
           <div className="flex-1 relative glass-card rounded-2xl overflow-hidden flex items-center justify-center">
              <div className="absolute top-4 left-4 z-20">
                 <h3 className="text-xl font-bold text-white flex items-center gap-2 neon-text">
                    <MapPin className="text-cyan-400" /> 全国部署分布
                 </h3>
              </div>

              {/* Map Visualization (Abstract) */}
              <div className="relative w-full h-full max-w-3xl aspect-[4/3]">
                 {/* Base Map Shape */}
                 <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-[0_0_50px_rgba(56,189,248,0.2)]">
                    <path d="M20,30 Q40,10 60,20 T90,40 Q95,60 80,80 T30,90 Q10,70 20,30" fill="rgba(30, 41, 59, 0.4)" stroke="rgba(56, 189, 248, 0.6)" strokeWidth="0.5" />
                 </svg>

                 {/* City Nodes */}
                 {MAP_LOCATIONS.map(city => (
                    <div 
                       key={city.id}
                       className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer group"
                       style={{ left: `${city.x}%`, top: `${city.y}%` }}
                       onClick={() => handleCityClick(city)}
                    >
                       {/* Ripple */}
                       <div className={`absolute inset-0 rounded-full animate-ping opacity-75 ${
                          city.status === 'alert' ? 'bg-red-500' : city.status === 'warning' ? 'bg-orange-500' : 'bg-blue-500'
                       }`} style={{ width: '100%', height: '100%' }}></div>
                       
                       {/* Core */}
                       <div className={`relative w-4 h-4 rounded-full border-2 border-white shadow-[0_0_10px_currentColor] transition-all duration-300 group-hover:scale-150 ${
                          city.status === 'alert' ? 'bg-red-600 text-red-500' : city.status === 'warning' ? 'bg-orange-500 text-orange-500' : 'bg-blue-500 text-blue-500'
                       }`}></div>

                       {/* Label */}
                       <div className="absolute top-6 left-1/2 -translate-x-1/2 text-center opacity-80 group-hover:opacity-100 transition-opacity">
                          <p className="text-xs font-bold text-white whitespace-nowrap">{city.name}</p>
                          <p className="text-[10px] text-slate-400">{city.active} 在线</p>
                       </div>
                    </div>
                 ))}
              </div>

              {/* Drill-down Overlay Panel */}
              {drillDownView && selectedCity && (
                 <div className="absolute top-4 right-4 bottom-4 w-80 bg-slate-900/90 backdrop-blur-xl border border-blue-500/30 rounded-2xl shadow-2xl p-5 flex flex-col animate-fade-in z-30">
                    <div className="flex justify-between items-start mb-6">
                       <div>
                          <h3 className="text-xl font-bold text-white flex items-center gap-2">
                             <MapPin size={18} className="text-blue-400" /> {selectedCity.name}
                          </h3>
                          <p className="text-xs text-slate-400 mt-1">区域数据看板</p>
                       </div>
                       <button onClick={closeDrillDown} className="p-1 hover:bg-white/10 rounded text-slate-400 hover:text-white">
                          <X size={20} />
                       </button>
                    </div>

                    <div className="grid grid-cols-2 gap-3 mb-6">
                       <div className="bg-slate-800/50 p-3 rounded-lg text-center border border-slate-700">
                          <p className="text-xs text-slate-400">活跃工牌</p>
                          <p className="text-xl font-bold text-blue-400">{selectedCity.active}</p>
                       </div>
                       <div className="bg-slate-800/50 p-3 rounded-lg text-center border border-slate-700">
                          <p className="text-xs text-slate-400">风险预警</p>
                          <p className={`text-xl font-bold ${selectedCity.risk > 5 ? 'text-red-500' : 'text-green-500'}`}>{selectedCity.risk}</p>
                       </div>
                    </div>

                    <h4 className="text-sm font-bold text-white mb-3 flex items-center gap-2">
                       <Server size={14} className="text-cyan-400" /> 重点门店监控
                    </h4>
                    <div className="flex-1 overflow-y-auto space-y-2 pr-1 custom-scrollbar">
                       {STORE_DETAILS.map(store => (
                          <div key={store.id} className="p-3 bg-slate-800/30 rounded-lg border border-slate-700/50 hover:bg-slate-800/80 transition-colors">
                             <div className="flex justify-between items-center mb-2">
                                <span className="text-sm font-medium text-slate-200">{store.name}</span>
                                <span className={`text-[10px] px-1.5 py-0.5 rounded border ${
                                   store.status === 'Alert' ? 'border-red-500/50 text-red-400 bg-red-500/10' : 
                                   store.status === 'Warning' ? 'border-orange-500/50 text-orange-400 bg-orange-500/10' : 
                                   'border-green-500/50 text-green-400 bg-green-500/10'
                                }`}>{store.status}</span>
                             </div>
                             <div className="flex justify-between text-xs text-slate-500">
                                <span>工牌: {store.badges}</span>
                                <span>在线: {store.online}</span>
                             </div>
                             <div className="w-full h-1 bg-slate-700 mt-2 rounded-full overflow-hidden">
                                <div className="h-full bg-blue-500" style={{ width: `${(store.online/store.badges)*100}%` }}></div>
                             </div>
                          </div>
                       ))}
                    </div>
                    
                    <button className="mt-4 w-full py-2 bg-blue-600/20 hover:bg-blue-600/40 text-blue-300 rounded-lg text-sm font-medium transition-colors border border-blue-500/30">
                       查看完整报表
                    </button>
                 </div>
              )}
           </div>

           {/* Right Column: Trends & Alerts */}
           <div className="w-1/4 flex flex-col gap-6">
              {/* Session Trend */}
              <div className="glass-card rounded-2xl p-5 flex-1 flex flex-col">
                 <h3 className="text-blue-300 font-bold text-sm mb-4 flex items-center gap-2 border-b border-blue-500/20 pb-2">
                    <TrendingUp size={16} /> 实时会话流量
                 </h3>
                 <div className="flex-1 min-h-[150px]">
                    <ResponsiveContainer width="100%" height="100%">
                       <AreaChart data={SESSION_TREND}>
                          <defs>
                             <linearGradient id="colorSession" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3}/>
                                <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/>
                             </linearGradient>
                          </defs>
                          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#1e293b" />
                          <XAxis dataKey="time" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 10}} />
                          <Tooltip contentStyle={{backgroundColor: '#0f172a', border: '1px solid #334155', borderRadius: '8px'}} />
                          <Area type="monotone" dataKey="value" stroke="#8b5cf6" strokeWidth={2} fill="url(#colorSession)" />
                       </AreaChart>
                    </ResponsiveContainer>
                 </div>
              </div>

              {/* Alert Feed */}
              <div className="glass-card rounded-2xl p-5 h-1/2 flex flex-col overflow-hidden">
                 <h3 className="text-red-400 font-bold text-sm mb-4 flex items-center gap-2 border-b border-red-500/20 pb-2">
                    <Shield size={16} className="animate-pulse" /> 实时风险预警
                 </h3>
                 <div className="flex-1 overflow-y-auto space-y-3 pr-1 custom-scrollbar">
                    {[
                       { id: 1, msg: '成都店: 005号工牌离线超1h', time: '10:24', level: 'high' },
                       { id: 2, msg: '广州店: 检测到争吵情绪', time: '10:32', level: 'high' },
                       { id: 3, msg: '上海店: 批量电量低预警', time: '10:45', level: 'medium' },
                       { id: 4, msg: '北京店: 上传延迟过高', time: '11:02', level: 'low' },
                    ].map(alert => (
                       <div key={alert.id} className="flex gap-3 items-start p-2 rounded bg-slate-800/50 border border-slate-700/50">
                          <div className={`mt-1 w-1.5 h-1.5 rounded-full flex-shrink-0 ${
                             alert.level === 'high' ? 'bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.8)]' : 
                             alert.level === 'medium' ? 'bg-orange-500' : 'bg-blue-500'
                          }`}></div>
                          <div className="flex-1 min-w-0">
                             <p className="text-xs text-slate-300 truncate" title={alert.msg}>{alert.msg}</p>
                             <p className="text-[10px] text-slate-500 mt-0.5">{alert.time}</p>
                          </div>
                       </div>
                    ))}
                 </div>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default NationalBadgeScreen;
