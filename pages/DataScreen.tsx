
import React, { useEffect, useState, useMemo } from 'react';
import { 
  MapPin, 
  Wifi, 
  Activity, 
  Server, 
  Database, 
  Globe, 
  Zap, 
  Radio, 
  Clock, 
  Cpu, 
  Shield, 
  Share2, 
  Maximize2, 
  Minimize2
} from 'lucide-react';
import { 
  AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer,
  BarChart, Bar, Cell, PieChart, Pie
} from 'recharts';
import { useLayout } from '../components/Layout';

// --- Types & Constants ---

interface BadgePoint {
  id: number;
  x: number;
  y: number;
  status: 'active' | 'inactive';
  city: string;
}

// Approximate relative coordinates for major clusters to form a China map shape (0-100 scale)
const CITY_CLUSTERS = [
  { name: '北京', x: 68, y: 28, count: 80, spread: 3 },
  { name: '上海', x: 78, y: 55, count: 120, spread: 2.5 },
  { name: '广州', x: 65, y: 75, count: 100, spread: 2.5 },
  { name: '深圳', x: 66, y: 77, count: 90, spread: 2 },
  { name: '成都', x: 45, y: 58, count: 70, spread: 3 },
  { name: '武汉', x: 62, y: 58, count: 60, spread: 3 },
  { name: '西安', x: 52, y: 48, count: 50, spread: 3 },
  { name: '杭州', x: 76, y: 58, count: 65, spread: 2 },
  { name: '南京', x: 74, y: 52, count: 55, spread: 2 },
  { name: '沈阳', x: 75, y: 22, count: 40, spread: 4 },
  { name: '哈尔滨', x: 80, y: 15, count: 30, spread: 5 },
  { name: '乌鲁木齐', x: 15, y: 25, count: 20, spread: 6 },
  { name: '拉萨', x: 20, y: 60, count: 15, spread: 5 },
  { name: '昆明', x: 40, y: 70, count: 35, spread: 4 },
  { name: '郑州', x: 60, y: 45, count: 45, spread: 2.5 },
  { name: '重庆', x: 50, y: 60, count: 60, spread: 2.5 },
  { name: '长沙', x: 60, y: 65, count: 50, spread: 3 },
  { name: '青岛', x: 72, y: 38, count: 40, spread: 2 },
  { name: '福州', x: 72, y: 70, count: 35, spread: 3 },
  { name: '兰州', x: 42, y: 42, count: 25, spread: 3 },
];

const TREND_DATA = [
  { time: '09:00', value: 1200 },
  { time: '10:00', value: 2400 },
  { time: '11:00', value: 3200 },
  { time: '12:00', value: 2800 },
  { time: '13:00', value: 2600 },
  { time: '14:00', value: 3800 },
  { time: '15:00', value: 4100 },
  { time: '16:00', value: 3950 },
  { time: '17:00', value: 3400 },
];

const DEVICE_STATUS_DATA = [
  { name: '在线工作', value: 3850, color: '#10b981' }, // green
  { name: '待机中', value: 850, color: '#3b82f6' }, // blue
  { name: '离线/异常', value: 152, color: '#ef4444' }, // red
];

// --- Helper Functions ---

const generateMapPoints = (): BadgePoint[] => {
  let points: BadgePoint[] = [];
  let idCounter = 0;

  CITY_CLUSTERS.forEach(city => {
    for (let i = 0; i < city.count; i++) {
      // Gaussian-like distribution
      const u = 1 - Math.random();
      const v = Math.random();
      const radius = city.spread * Math.sqrt(-2 * Math.log(u));
      const angle = 2 * Math.PI * v;
      
      const offsetX = radius * Math.cos(angle);
      const offsetY = radius * Math.sin(angle); // Adjust aspect ratio slightly for visual map

      points.push({
        id: idCounter++,
        x: city.x + offsetX,
        y: city.y + offsetY * 0.8, // Flatten Y slightly for map projection feel
        city: city.name,
        status: Math.random() > 0.3 ? 'active' : 'inactive' // 70% active
      });
    }
  });

  // Add some random noise points for connecting paths (Highways/Railways simulation)
  for(let i=0; i<100; i++) {
     points.push({
        id: idCounter++,
        x: 20 + Math.random() * 60,
        y: 30 + Math.random() * 40,
        city: 'En Route',
        status: Math.random() > 0.8 ? 'active' : 'inactive'
     });
  }

  return points;
};

// --- Components ---

const StatBox = ({ title, value, unit, icon: Icon, colorClass }: any) => (
  <div className="bg-slate-800/40 backdrop-blur-md border border-slate-700/50 p-4 rounded-xl relative group overflow-hidden">
    <div className={`absolute -right-4 -top-4 p-4 rounded-full opacity-10 group-hover:opacity-20 transition-all duration-500 ${colorClass}`}>
      <Icon size={64} />
    </div>
    <div className="relative z-10">
      <p className="text-slate-400 text-xs font-medium mb-1 flex items-center gap-1">
        {title}
      </p>
      <div className="flex items-baseline gap-1">
        <span className="text-2xl font-bold text-white font-mono tracking-wider text-shadow-glow">{value}</span>
        {unit && <span className="text-xs text-slate-500">{unit}</span>}
      </div>
    </div>
    <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-blue-500/50 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-700"></div>
  </div>
);

const DataScreen: React.FC = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [points, setPoints] = useState<BadgePoint[]>([]);
  const { isFullScreen, toggleFullScreen } = useLayout();

  // Timer
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Generate Map Points on Mount
  useEffect(() => {
    setPoints(generateMapPoints());
  }, []);

  // Stats calculation
  const totalActive = useMemo(() => points.filter(p => p.status === 'active').length, [points]);
  const totalDevices = points.length;
  
  return (
    <div className={`bg-[#0b1121] text-white overflow-hidden flex flex-col relative font-sans ${isFullScreen ? 'h-screen rounded-none' : 'min-h-[calc(100vh-2rem)] rounded-xl'}`}>
      
      {/* --- Ambient Background Effects --- */}
      {/* Grid */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-20"
        style={{ 
          backgroundImage: 'linear-gradient(rgba(56, 189, 248, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(56, 189, 248, 0.1) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
          maskImage: 'radial-gradient(circle at center, black 40%, transparent 100%)'
        }}
      ></div>
      {/* Glows */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-500/20 blur-[120px] rounded-full pointer-events-none"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-indigo-500/20 blur-[120px] rounded-full pointer-events-none"></div>

      {/* --- Header --- */}
      <header className="relative z-20 flex justify-between items-center px-8 py-4 bg-gradient-to-b from-[#0b1121] to-transparent">
        <div className="flex items-center gap-4">
          <div className="p-2 bg-blue-500/20 rounded-lg border border-blue-500/30">
            <Cpu size={24} className="text-blue-400" />
          </div>
          <div>
            <h1 className="text-2xl font-bold tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-400 to-white">
              全国业务全景监控中心
            </h1>
            <p className="text-xs text-slate-400 tracking-[0.2em] uppercase">National Business Monitoring Center</p>
          </div>
        </div>
        
        <div className="flex items-center gap-6">
          <div className="text-right hidden md:block">
            <div className="text-2xl font-mono font-bold text-white leading-none">
              {currentTime.toLocaleTimeString('en-US', { hour12: false })}
            </div>
            <div className="text-xs text-slate-400 mt-1">
              {currentTime.toLocaleDateString()} {['Sun','Mon','Tue','Wed','Thu','Fri','Sat'][currentTime.getDay()]}
            </div>
          </div>
          <div className="flex gap-3">
             <button className="p-2 bg-slate-800/50 hover:bg-slate-700/50 border border-slate-700 rounded-lg transition-colors text-slate-300">
               <Share2 size={18} />
             </button>
             <button 
                onClick={toggleFullScreen}
                className="p-2 bg-slate-800/50 hover:bg-slate-700/50 border border-slate-700 rounded-lg transition-colors text-slate-300"
                title={isFullScreen ? "退出全屏" : "全屏模式"}
             >
               {isFullScreen ? <Minimize2 size={18} /> : <Maximize2 size={18} />}
             </button>
          </div>
        </div>
      </header>

      {/* --- Main Content Layout --- */}
      <div className="flex-1 relative z-10 grid grid-cols-12 gap-6 p-6 overflow-hidden">
        
        {/* Left Column - Stats & Charts */}
        <div className="col-span-3 flex flex-col gap-6 animate-slide-in-left">
           {/* Summary Stats */}
           <div className="grid grid-cols-2 gap-4">
              <StatBox title="设备在线率" value="96.2" unit="%" icon={Wifi} colorClass="bg-green-500" />
              <StatBox title="今日数据量" value="8.5" unit="TB" icon={Database} colorClass="bg-blue-500" />
              <StatBox title="活跃工牌" value={totalActive.toLocaleString()} unit="个" icon={Activity} colorClass="bg-indigo-500" />
              <StatBox title="告警事件" value="23" unit="起" icon={Shield} colorClass="bg-red-500" />
           </div>

           {/* Trend Chart */}
           <div className="flex-1 bg-slate-800/40 backdrop-blur-md border border-slate-700/50 p-5 rounded-xl flex flex-col">
              <h3 className="text-slate-300 font-bold mb-4 flex items-center gap-2 text-sm">
                 <Zap size={16} className="text-yellow-400" /> 实时数据吞吐量 (MB/s)
              </h3>
              <div className="flex-1 min-h-[150px]">
                 <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={TREND_DATA}>
                       <defs>
                          <linearGradient id="colorTrend" x1="0" y1="0" x2="0" y2="1">
                             <stop offset="5%" stopColor="#0ea5e9" stopOpacity={0.3}/>
                             <stop offset="95%" stopColor="#0ea5e9" stopOpacity={0}/>
                          </linearGradient>
                       </defs>
                       <XAxis dataKey="time" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 10}} interval={2} />
                       <Tooltip 
                          contentStyle={{backgroundColor: 'rgba(15, 23, 42, 0.9)', border: '1px solid #334155', borderRadius: '8px', color: '#fff'}}
                          itemStyle={{color: '#38bdf8'}}
                       />
                       <Area type="monotone" dataKey="value" stroke="#0ea5e9" strokeWidth={2} fill="url(#colorTrend)" />
                    </AreaChart>
                 </ResponsiveContainer>
              </div>
           </div>
           
           {/* Device Status */}
           <div className="bg-slate-800/40 backdrop-blur-md border border-slate-700/50 p-5 rounded-xl">
              <h3 className="text-slate-300 font-bold mb-4 flex items-center gap-2 text-sm">
                 <Server size={16} className="text-emerald-400" /> 设备状态分布
              </h3>
              <div className="flex items-center">
                 <div className="w-1/2 h-32">
                    <ResponsiveContainer width="100%" height="100%">
                       <PieChart>
                          <Pie 
                             data={DEVICE_STATUS_DATA} 
                             cx="50%" cy="50%" 
                             innerRadius={40} outerRadius={55} 
                             paddingAngle={5} 
                             dataKey="value"
                             stroke="none"
                          >
                             {DEVICE_STATUS_DATA.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.color} />
                             ))}
                          </Pie>
                       </PieChart>
                    </ResponsiveContainer>
                 </div>
                 <div className="w-1/2 space-y-2 text-xs">
                    {DEVICE_STATUS_DATA.map((item, i) => (
                       <div key={i} className="flex justify-between items-center">
                          <span className="text-slate-400 flex items-center gap-1.5">
                             <span className="w-2 h-2 rounded-full" style={{backgroundColor: item.color}}></span>
                             {item.name}
                          </span>
                          <span className="font-mono font-bold text-slate-200">{item.value}</span>
                       </div>
                    ))}
                 </div>
              </div>
           </div>
        </div>

        {/* Center Column - Map */}
        <div className="col-span-6 relative flex flex-col items-center justify-center p-4">
           {/* Map Container */}
           <div className="relative w-full h-full max-h-[600px] aspect-[4/3]">
              {/* Map Background (Abstract China Shape) */}
              <div className="absolute inset-0 opacity-30">
                 {/* This would ideally be an SVG map. Using CSS shapes/dots for abstraction */}
              </div>

              {/* Data Points */}
              {points.map(p => (
                 <div 
                    key={p.id}
                    className="absolute w-1 h-1 rounded-full transition-all duration-1000"
                    style={{ 
                       left: `${p.x}%`, 
                       top: `${p.y}%`,
                       backgroundColor: p.status === 'active' ? '#38bdf8' : '#334155',
                       boxShadow: p.status === 'active' ? '0 0 4px #38bdf8' : 'none',
                       opacity: p.status === 'active' ? 0.8 : 0.3
                    }}
                 >
                    {p.status === 'active' && Math.random() > 0.95 && (
                       <span className="absolute -inset-2 rounded-full border border-sky-400/50 animate-ping"></span>
                    )}
                 </div>
              ))}

              {/* City Names & Markers */}
              {CITY_CLUSTERS.map((city, i) => (
                 <div key={i} className="absolute transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center group z-10"
                      style={{ left: `${city.x}%`, top: `${city.y}%` }}>
                    
                    {/* City Dot */}
                    <div className="relative flex items-center justify-center cursor-pointer">
                       <div className={`rounded-full relative z-10 ${i < 5 ? 'w-2 h-2 bg-white shadow-[0_0_8px_rgba(255,255,255,0.8)]' : 'w-1.5 h-1.5 bg-blue-300/60'}`}></div>
                       {i < 5 && (
                         <>
                           <div className="absolute inset-0 bg-blue-500 rounded-full animate-ping opacity-75"></div>
                           <div className="absolute -inset-4 border border-blue-500/30 rounded-full animate-[spin_4s_linear_infinite]"></div>
                         </>
                       )}
                    </div>

                    {/* City Name - Always visible now */}
                    <div className={`mt-1 text-[10px] whitespace-nowrap font-medium transition-colors duration-300 ${i < 5 ? 'text-white font-bold text-shadow-glow' : 'text-slate-500 group-hover:text-slate-300'}`}>
                       {city.name}
                    </div>

                    {/* Hover Info */}
                    <div className="absolute bottom-full mb-2 px-3 py-1.5 bg-slate-900/90 backdrop-blur border border-slate-700 rounded-lg text-[10px] text-sky-300 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-20 shadow-xl">
                       <p className="text-white font-bold text-xs">{city.name} 数据中心</p>
                       <span className="text-slate-300">在线设备: {city.count * 12}</span>
                    </div>
                 </div>
              ))}
           </div>

           {/* Floating Info */}
           <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-8 bg-slate-900/60 backdrop-blur-xl px-6 py-3 rounded-full border border-slate-700/50">
              <div className="flex items-center gap-2">
                 <Radio size={16} className="text-sky-400 animate-pulse" />
                 <span className="text-xs text-slate-300">节点同步中</span>
              </div>
              <div className="w-px h-4 bg-slate-700"></div>
              <div className="flex items-center gap-2">
                 <Globe size={16} className="text-emerald-400" />
                 <span className="text-xs text-slate-300">全网延迟 24ms</span>
              </div>
           </div>
        </div>

        {/* Right Column - Logs & Alerts */}
        <div className="col-span-3 flex flex-col gap-6 animate-slide-in-right">
           {/* Real-time Logs */}
           <div className="flex-1 bg-slate-800/40 backdrop-blur-md border border-slate-700/50 p-0 rounded-xl overflow-hidden flex flex-col">
              <div className="p-4 border-b border-slate-700/50 bg-slate-800/50">
                 <h3 className="text-slate-300 font-bold flex items-center gap-2 text-sm">
                    <Activity size={16} className="text-blue-400" /> 实时数据上报流
                 </h3>
              </div>
              <div className="flex-1 overflow-hidden relative">
                 <div className="absolute inset-0 overflow-y-auto no-scrollbar p-4 space-y-3">
                    {Array.from({ length: 20 }).map((_, i) => (
                       <div key={i} className="flex items-center justify-between text-xs group">
                          <div className="flex items-center gap-2">
                             <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>
                             <span className="text-slate-400 font-mono">14:2{i}:{Math.floor(Math.random()*59).toString().padStart(2,'0')}</span>
                             <span className="text-slate-300">设备 BDG-{2048+i}</span>
                          </div>
                          <span className="text-sky-500/80 group-hover:text-sky-400 transition-colors">
                             上传音频 {Math.floor(Math.random()*500 + 100)}KB
                          </span>
                       </div>
                    ))}
                 </div>
                 {/* Fade out effect at bottom */}
                 <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-[#0b1121]/80 to-transparent pointer-events-none"></div>
              </div>
           </div>

           {/* Alert Feed */}
           <div className="h-1/3 bg-slate-800/40 backdrop-blur-md border border-slate-700/50 p-0 rounded-xl overflow-hidden flex flex-col">
              <div className="p-4 border-b border-slate-700/50 bg-slate-800/50 flex justify-between items-center">
                 <h3 className="text-slate-300 font-bold flex items-center gap-2 text-sm">
                    <Shield size={16} className="text-red-400" /> 告警监控
                 </h3>
                 <span className="text-[10px] bg-red-500/20 text-red-300 px-1.5 py-0.5 rounded border border-red-500/30">3 New</span>
              </div>
              <div className="flex-1 p-4 space-y-3 overflow-y-auto">
                 {[
                    { msg: '上海旗舰店 003号工牌 离线超时', time: '1m ago', level: 'high' },
                    { msg: '北京朝阳店 012号工牌 电量<10%', time: '5m ago', level: 'medium' },
                    { msg: '广州天河店 网络波动', time: '12m ago', level: 'low' },
                 ].map((alert, i) => (
                    <div key={i} className="flex gap-3 items-start p-2 rounded hover:bg-white/5 transition-colors">
                       <div className={`mt-1 w-1.5 h-1.5 rounded-full flex-shrink-0 ${
                          alert.level === 'high' ? 'bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.6)]' : 
                          alert.level === 'medium' ? 'bg-orange-500' : 'bg-yellow-500'
                       }`}></div>
                       <div>
                          <p className="text-xs text-slate-200 leading-relaxed">{alert.msg}</p>
                          <p className="text-[10px] text-slate-500 mt-0.5">{alert.time}</p>
                       </div>
                    </div>
                 ))}
              </div>
           </div>
        </div>

      </div>
      
      <style>{`
        .text-shadow-glow {
          text-shadow: 0 0 10px rgba(56, 189, 248, 0.5);
        }
        .animate-slide-in-left {
          animation: slideInLeft 0.5s ease-out forwards;
        }
        .animate-slide-in-right {
          animation: slideInRight 0.5s ease-out forwards;
        }
        @keyframes slideInLeft {
          from { opacity: 0; transform: translateX(-20px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes slideInRight {
          from { opacity: 0; transform: translateX(20px); }
          to { opacity: 1; transform: translateX(0); }
        }
      `}</style>
    </div>
  );
};

export default DataScreen;
