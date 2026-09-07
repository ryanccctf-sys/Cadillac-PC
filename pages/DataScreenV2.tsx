
import React, { useState, useEffect } from 'react';
import { 
  Maximize2, Minimize2, MapPin, Activity, Wifi, Shield, 
  Zap, Cpu, Globe, Users, TrendingUp, AlertTriangle, 
  Radio, Clock, Battery, ChevronRight
} from 'lucide-react';
import { 
  AreaChart, Area, XAxis, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell
} from 'recharts';
import { useLayout } from '../components/Layout';

// --- Styles for 3D Map & Effects ---
const STYLES = `
  @keyframes flow {
    0% { background-position: 0 0; }
    100% { background-position: 50px 50px; }
  }
  @keyframes pulse-ring {
    0% { transform: scale(0.8); opacity: 0.8; }
    100% { transform: scale(2.5); opacity: 0; }
  }
  @keyframes float {
    0%, 100% { transform: translateY(0px); }
    50% { transform: translateY(-10px); }
  }
  
  .bg-grid-flow {
    background-image: 
      linear-gradient(rgba(56, 189, 248, 0.1) 1px, transparent 1px),
      linear-gradient(90deg, rgba(56, 189, 248, 0.1) 1px, transparent 1px);
    background-size: 50px 50px;
    animation: flow 4s linear infinite;
    perspective: 1000px;
  }
  
  .map-container-3d {
    transform: rotateX(45deg) scale(1.1);
    transform-style: preserve-3d;
    transition: transform 0.5s ease-out;
  }
  
  .map-point {
    transform-style: preserve-3d;
    backface-visibility: hidden;
  }
  
  .glass-panel {
    background: rgba(15, 23, 42, 0.6);
    backdrop-filter: blur(12px);
    border: 1px solid rgba(56, 189, 248, 0.2);
    box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.37);
  }

  .text-glow {
    text-shadow: 0 0 10px rgba(56, 189, 248, 0.8);
  }
`;

// --- Mock Data ---

const KEY_METRICS = [
  { label: '活跃工牌总数', value: '4,821', unit: '个', trend: '+12%', color: 'text-blue-400' },
  { label: '今日会话时长', value: '18,240', unit: '小时', trend: '+8%', color: 'text-purple-400' },
  { label: '实时会话并发', value: '982', unit: '路', trend: '+5%', color: 'text-green-400' },
  { label: '风险预警触发', value: '23', unit: '次', trend: '-2%', color: 'text-red-400' },
];

const DEVICE_HEALTH = [
  { name: '健康', value: 85, color: '#10b981' },
  { name: '低电量', value: 10, color: '#f59e0b' },
  { name: '离线', value: 3, color: '#64748b' },
  { name: '故障', value: 2, color: '#ef4444' },
];

const TREND_DATA = [
  { time: '09:00', traffic: 2400, session: 1200 },
  { time: '10:00', traffic: 4500, session: 2800 },
  { time: '11:00', traffic: 6800, session: 4200 },
  { time: '12:00', traffic: 5200, session: 3100 },
  { time: '13:00', traffic: 4800, session: 2900 },
  { time: '14:00', traffic: 7200, session: 4800 },
  { time: '15:00', traffic: 8500, session: 5600 },
  { time: '16:00', traffic: 7900, session: 5100 },
];

const MAP_POINTS = [
  { id: 1, name: '北京', x: 65, y: 30, value: 95, type: 'hq' },
  { id: 2, name: '上海', x: 75, y: 55, value: 100, type: 'hq' },
  { id: 3, name: '广州', x: 62, y: 75, value: 90, type: 'hq' },
  { id: 4, name: '成都', x: 42, y: 58, value: 85, type: 'hub' },
  { id: 5, name: '武汉', x: 58, y: 58, value: 75, type: 'hub' },
  { id: 6, name: '西安', x: 48, y: 48, value: 70, type: 'hub' },
  { id: 7, name: '杭州', x: 73, y: 58, value: 80, type: 'hub' },
  { id: 8, name: '沈阳', x: 72, y: 25, value: 50, type: 'node' },
  { id: 9, name: '乌鲁木齐', x: 15, y: 25, value: 30, type: 'node' },
  { id: 10, name: '昆明', x: 38, y: 70, value: 45, type: 'node' },
  { id: 11, name: '哈尔滨', x: 78, y: 15, value: 40, type: 'node' },
  { id: 12, name: '郑州', x: 58, y: 45, value: 60, type: 'hub' },
];

const ALERTS_FEED = [
  { id: 1, msg: '上海旗舰店 B03号工牌 离线超过1小时', level: 'high', time: '10:23' },
  { id: 2, msg: '北京朝阳店 A12号工牌 持续静默预警', level: 'medium', time: '10:45' },
  { id: 3, msg: '广州天河店 005号工牌 检测到争吵情绪', level: 'high', time: '11:02' },
  { id: 4, msg: '成都太古里店 008号工牌 电量低', level: 'low', time: '11:15' },
];

// --- Components ---

const DataScreenV2: React.FC = () => {
  const { isFullScreen, toggleFullScreen } = useLayout();
  const [hoveredCity, setHoveredCity] = useState<any>(null);
  const [currentTime, setCurrentTime] = useState(new Date());
  
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className={`relative bg-[#050b14] text-white overflow-hidden font-sans ${isFullScreen ? 'h-screen' : 'min-h-[calc(100vh-2rem)] rounded-xl'}`}>
      <style>{STYLES}</style>

      {/* --- Dynamic Background --- */}
      <div className="absolute inset-0 bg-grid-flow opacity-20 pointer-events-none transform -skew-x-12 scale-150"></div>
      <div className="absolute inset-0 bg-gradient-to-b from-[#050b14] via-transparent to-[#050b14] pointer-events-none"></div>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-900/20 via-[#050b14]/50 to-[#050b14] pointer-events-none"></div>

      {/* --- Header --- */}
      <header className="absolute top-0 left-0 right-0 z-30 p-6 flex justify-between items-start bg-gradient-to-b from-[#050b14] to-transparent">
        <div className="flex flex-col">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-blue-600/20 border border-blue-500/50 flex items-center justify-center backdrop-blur-md">
              <Globe className="text-blue-400 animate-pulse" />
            </div>
            <div>
              <h1 className="text-2xl font-bold tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-blue-200 via-cyan-200 to-white">
                SMART BADGE V2
              </h1>
              <p className="text-[10px] text-blue-400 tracking-[0.3em] uppercase">Global Monitoring System</p>
            </div>
          </div>
        </div>

        {/* Top Macro Metrics (Horizontal Strip) */}
        <div className="hidden xl:flex items-center gap-6 absolute left-1/2 transform -translate-x-1/2 top-6">
           {KEY_METRICS.map((m, i) => (
             <div key={i} className="flex flex-col items-center px-6 border-r border-blue-900/30 last:border-0">
                <span className="text-slate-400 text-xs mb-1">{m.label}</span>
                <span className={`text-2xl font-bold font-mono ${m.color} text-glow`}>{m.value}</span>
             </div>
           ))}
        </div>

        <div className="flex items-center gap-4">
          <div className="text-right">
            <div className="text-xl font-mono font-bold text-white leading-none">
              {currentTime.toLocaleTimeString()}
            </div>
            <div className="text-xs text-slate-400 mt-1 uppercase tracking-widest">
              {currentTime.toLocaleDateString()}
            </div>
          </div>
          <button 
            onClick={toggleFullScreen}
            className="p-2 glass-panel rounded-lg hover:bg-white/10 transition-colors text-blue-300"
          >
            {isFullScreen ? <Minimize2 size={20} /> : <Maximize2 size={20} />}
          </button>
        </div>
      </header>

      {/* --- Main Content --- */}
      <div className="relative z-10 w-full h-full flex pt-24 pb-6 px-6 gap-6">
        
        {/* Left Panel: Trends & Funnel */}
        <div className="w-80 flex flex-col gap-6 transform transition-transform duration-500 hover:translate-x-1">
           {/* Real-time Trend */}
           <div className="glass-panel rounded-2xl p-5 flex-1 flex flex-col">
              <h3 className="text-blue-300 font-bold text-sm mb-4 flex items-center gap-2">
                 <TrendingUp size={16} /> 业务并发趋势
              </h3>
              <div className="flex-1 w-full min-h-[180px]">
                 <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={TREND_DATA}>
                       <defs>
                          <linearGradient id="colorTraffic" x1="0" y1="0" x2="0" y2="1">
                             <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                             <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                          </linearGradient>
                       </defs>
                       <XAxis dataKey="time" axisLine={false} tickLine={false} tick={{fontSize: 10, fill: '#64748b'}} interval={2} />
                       <Tooltip contentStyle={{backgroundColor: '#0f172a', border: '1px solid #1e293b', borderRadius: '8px'}} />
                       <Area type="monotone" dataKey="traffic" stroke="#3b82f6" strokeWidth={2} fill="url(#colorTraffic)" />
                       <Area type="monotone" dataKey="session" stroke="#8b5cf6" strokeWidth={2} fill="transparent" strokeDasharray="3 3" />
                    </AreaChart>
                 </ResponsiveContainer>
              </div>
           </div>

           {/* Conversion / Funnel (Simulated with Bar) */}
           <div className="glass-panel rounded-2xl p-5 h-1/3">
              <h3 className="text-blue-300 font-bold text-sm mb-4 flex items-center gap-2">
                 <Users size={16} /> 接待转化漏斗
              </h3>
              <div className="space-y-3">
                 {[
                   { label: '进店接待', val: 100, color: 'bg-blue-500' },
                   { label: '有效沟通', val: 85, color: 'bg-cyan-500' },
                   { label: '试驾体验', val: 45, color: 'bg-purple-500' },
                   { label: '留资成交', val: 20, color: 'bg-green-500' },
                 ].map((step, i) => (
                   <div key={i}>
                      <div className="flex justify-between text-xs text-slate-400 mb-1">
                         <span>{step.label}</span>
                         <span>{step.val}%</span>
                      </div>
                      <div className="w-full h-1.5 bg-slate-700/50 rounded-full overflow-hidden">
                         <div className={`h-full ${step.color} shadow-[0_0_10px_currentColor]`} style={{width: `${step.val}%`}}></div>
                      </div>
                   </div>
                 ))}
              </div>
           </div>
        </div>

        {/* Center: 3D Map */}
        <div className="flex-1 relative flex items-center justify-center perspective-container">
           {/* Map Plane */}
           <div 
             className="relative w-full max-w-4xl aspect-[4/3] map-container-3d"
           >
              {/* Map Base Shape (Simplified China Silhouette for Demo) */}
              <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full drop-shadow-[0_0_30px_rgba(56,189,248,0.3)] filter contrast-125">
                 <path d="M20,30 Q40,10 60,20 T90,40 Q95,60 80,80 T30,90 Q10,70 20,30" fill="rgba(30, 41, 59, 0.8)" stroke="rgba(56, 189, 248, 0.4)" strokeWidth="0.5" />
                 {/* Grid overlay on map */}
                 <pattern id="grid" width="4" height="4" patternUnits="userSpaceOnUse">
                    <path d="M 4 0 L 0 0 0 4" fill="none" stroke="rgba(56, 189, 248, 0.1)" strokeWidth="0.1"/>
                 </pattern>
                 <rect width="100" height="100" fill="url(#grid)" style={{ mixBlendMode: 'overlay' }} />
              </svg>

              {/* Data Points (Cities) */}
              {MAP_POINTS.map(point => {
                 const isHovered = hoveredCity?.id === point.id;
                 const size = point.type === 'hq' ? 24 : point.type === 'hub' ? 16 : 10;
                 const color = point.value > 90 ? 'bg-red-500' : point.value > 70 ? 'bg-orange-500' : 'bg-blue-500';
                 
                 return (
                   <div 
                     key={point.id}
                     className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer map-point transition-all duration-300"
                     style={{ 
                       left: `${point.x}%`, 
                       top: `${point.y}%`,
                       zIndex: isHovered ? 50 : 10
                     }}
                     onMouseEnter={() => setHoveredCity(point)}
                     onMouseLeave={() => setHoveredCity(null)}
                   >
                      {/* Pulse Effect */}
                      <div 
                        className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full ${color} opacity-50`}
                        style={{ 
                          width: `${size * 3}px`, 
                          height: `${size * 3}px`,
                          animation: `pulse-ring ${2 + Math.random()}s cubic-bezier(0.215, 0.61, 0.355, 1) infinite`
                        }}
                      ></div>
                      
                      {/* Core Dot */}
                      <div 
                        className={`relative rounded-full ${color} shadow-[0_0_15px_currentColor] border-2 border-white/20 transition-transform duration-300 ${isHovered ? 'scale-150' : 'scale-100'}`}
                        style={{ width: `${size}px`, height: `${size}px` }}
                      ></div>

                      {/* Floating Label (Always Visible for major cities) */}
                      {(point.type === 'hq' || isHovered) && (
                        <div 
                          className={`absolute left-1/2 -translate-x-1/2 -top-8 px-2 py-1 bg-slate-900/80 border border-slate-700 rounded text-[10px] text-white whitespace-nowrap backdrop-blur-sm transition-all duration-300 ${isHovered ? '-top-12 scale-110 border-blue-500' : ''}`}
                          style={{ animation: 'float 3s ease-in-out infinite' }}
                        >
                           {point.name}
                        </div>
                      )}
                   </div>
                 );
              })}
           </div>

           {/* Hover Detail Card (Floating UI) */}
           {hoveredCity && (
              <div 
                className="absolute top-1/4 right-1/4 glass-panel p-4 rounded-xl w-64 border-l-4 border-l-blue-500 z-50 animate-fade-in"
                style={{ backdropFilter: 'blur(20px)' }}
              >
                 <h4 className="text-lg font-bold text-white mb-2 flex justify-between">
                    {hoveredCity.name}
                    <span className={`text-xs px-2 py-0.5 rounded ${hoveredCity.value > 80 ? 'bg-red-500/20 text-red-300' : 'bg-blue-500/20 text-blue-300'}`}>
                       热度 {hoveredCity.value}
                    </span>
                 </h4>
                 <div className="space-y-2 text-xs text-slate-300">
                    <div className="flex justify-between">
                       <span>活跃工牌:</span>
                       <span className="font-mono text-white">{Math.floor(hoveredCity.value * 12.5)}</span>
                    </div>
                    <div className="flex justify-between">
                       <span>实时会话:</span>
                       <span className="font-mono text-white">{Math.floor(hoveredCity.value * 4.2)}</span>
                    </div>
                    <div className="flex justify-between">
                       <span>风险预警:</span>
                       <span className="font-mono text-white">{hoveredCity.value > 90 ? '3 (高)' : '0'}</span>
                    </div>
                 </div>
                 <div className="mt-3 pt-3 border-t border-slate-700">
                    <button className="w-full py-1.5 bg-blue-600/20 hover:bg-blue-600/40 text-blue-300 rounded text-xs transition-colors flex items-center justify-center gap-1">
                       查看详情数据 <ChevronRight size={10} />
                    </button>
                 </div>
              </div>
           )}
        </div>

        {/* Right Panel: Health & Alerts */}
        <div className="w-80 flex flex-col gap-6 transform transition-transform duration-500 hover:-translate-x-1">
           {/* Device Health */}
           <div className="glass-panel rounded-2xl p-5 min-h-[220px]">
              <h3 className="text-blue-300 font-bold text-sm mb-2 flex items-center gap-2">
                 <Battery size={16} /> 设备健康度
              </h3>
              <div className="flex items-center h-40">
                 <div className="w-1/2 h-full">
                    <ResponsiveContainer width="100%" height="100%">
                       <PieChart>
                          <Pie 
                             data={DEVICE_HEALTH} 
                             cx="50%" cy="50%" 
                             innerRadius={35} outerRadius={50} 
                             paddingAngle={5} 
                             dataKey="value"
                             stroke="none"
                          >
                             {DEVICE_HEALTH.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.color} />
                             ))}
                          </Pie>
                       </PieChart>
                    </ResponsiveContainer>
                 </div>
                 <div className="w-1/2 space-y-2">
                    {DEVICE_HEALTH.map((item, i) => (
                       <div key={i} className="flex justify-between text-xs">
                          <span className="text-slate-400 flex items-center gap-1">
                             <span className="w-2 h-2 rounded-full" style={{backgroundColor: item.color}}></span>
                             {item.name}
                          </span>
                          <span className="font-mono font-bold">{item.value}%</span>
                       </div>
                    ))}
                 </div>
              </div>
           </div>

           {/* Risk Alerts */}
           <div className="glass-panel rounded-2xl p-0 flex-1 flex flex-col overflow-hidden">
              <div className="p-4 border-b border-slate-700/50 bg-red-900/10">
                 <h3 className="text-red-300 font-bold text-sm flex items-center gap-2">
                    <Shield size={16} className="animate-pulse" /> 实时风险预警
                 </h3>
              </div>
              <div className="flex-1 p-4 space-y-3 overflow-y-auto no-scrollbar">
                 {ALERTS_FEED.map((alert, i) => (
                    <div key={i} className="flex gap-3 items-start p-2 rounded hover:bg-white/5 transition-colors border-l-2 border-transparent hover:border-red-500/50">
                       <div className={`mt-1 p-1 rounded-full ${alert.level === 'high' ? 'bg-red-500 text-white' : alert.level === 'medium' ? 'bg-orange-500 text-white' : 'bg-blue-500 text-white'}`}>
                          <AlertTriangle size={10} />
                       </div>
                       <div>
                          <p className="text-xs text-slate-300 leading-relaxed line-clamp-2">{alert.msg}</p>
                          <p className="text-[10px] text-slate-500 mt-1 flex justify-between w-full">
                             <span>{alert.time}</span>
                             <span className={`uppercase ${alert.level === 'high' ? 'text-red-400' : 'text-orange-400'}`}>{alert.level}</span>
                          </p>
                       </div>
                    </div>
                 ))}
              </div>
           </div>
        </div>

      </div>

      {/* --- Footer Status Bar --- */}
      <div className="absolute bottom-0 left-0 right-0 h-8 bg-slate-900/80 border-t border-slate-800 flex items-center justify-between px-6 text-[10px] text-slate-500 z-20">
         <div className="flex gap-6">
            <span className="flex items-center gap-1.5"><div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></div> SYSTEM ONLINE</span>
            <span className="flex items-center gap-1.5"><Wifi size={10} /> LATENCY: 24ms</span>
            <span className="flex items-center gap-1.5"><Cpu size={10} /> CPU: 12%</span>
         </div>
         <div className="flex gap-4">
            <span>VERSION 2.0.4 (BETA)</span>
            <span>DATA ENCRYPTED</span>
         </div>
      </div>
    </div>
  );
};

export default DataScreenV2;
