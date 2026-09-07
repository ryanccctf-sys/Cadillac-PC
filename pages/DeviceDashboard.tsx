import React, { useState, useMemo } from 'react';
import { 
  Activity,
  AlertTriangle,
  CheckCircle2,
  Server,
  Battery,
  Wifi,
  WifiOff,
  Search,
  RefreshCw,
  Power,
  BatteryCharging,
  Clock,
  ArrowRight,
  X,
  History,
  Calendar,
  AlertOctagon
} from 'lucide-react';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell
} from 'recharts';
import AIAssistant from '../components/AIAssistant';

// --- Mock Data ---

const STORES = ['上海旗舰店', '北京朝阳店', '广州天河店', '深圳南山店'];
const NAMES = ['王金牌', '李进取', '张新人', '陈经理', '赵顾问', '孙销售', '周接待', '吴主管'];

// Generate 7-day trend data
const TREND_DATA = [
  { date: '10-20', rate: 92 },
  { date: '10-21', rate: 94 },
  { date: '10-22', rate: 91 },
  { date: '10-23', rate: 89 },
  { date: '10-24', rate: 95 },
  { date: '10-25', rate: 93 },
  { date: '10-26', rate: 96 },
];

const MOCK_BADGES = Array.from({ length: 40 }).map((_, i) => {
    const isOnline = Math.random() > 0.15; // 85% online
    const battery = Math.floor(Math.random() * 100);
    const store = STORES[i % STORES.length];
    
    // Simulate Task Status
    const taskStatusRand = Math.random();
    let taskStatus: 'idle' | 'recording' = 'idle';
    if (isOnline) {
        if (taskStatusRand > 0.70) taskStatus = 'recording';
    }

    // Simulate Last Result & Diagnostics
    let lastTaskResult: 'success' | 'failed' = 'success';
    let errorReason = '正常';

    // Logic for abnormalities
    if (!isOnline) {
        errorReason = '离线';
    } else if (battery < 30) {
        errorReason = '电量过低';
    }

    return {
        id: `BDG-${(2000 + i).toString()}`,
        store,
        user: NAMES[i % NAMES.length],
        battery,
        status: isOnline ? 'online' : 'offline',
        taskStatus,
        lastTaskResult,
        errorReason,
        lastSync: `10-26 ${Math.floor(Math.random() * 12 + 8)}:${Math.floor(Math.random() * 60).toString().padStart(2, '0')}`
    };
});

// --- Device Historical Logs Utility ---
const getBadgeHistory = (badgeId: string) => {
    const numericPart = parseInt(badgeId.replace('BDG-', ''), 10) || 2000;
    
    // Switch on/off history
    const powerLogs = [
        { time: '10-26 18:30', event: '关机', trigger: '手动物理中键', note: '日常换班，手动下线', battery: '38%' },
        { time: '10-26 13:15', event: '开机', trigger: '红外佩戴传感器', note: '检测到佩戴，自动瞬时启动', battery: '95%' },
        { time: '10-25 21:54', event: '关机', trigger: '系统低压限制', note: '电量低于 2% 进入安全关机保护', battery: '1%' },
        { time: '10-25 08:30', event: '开机', trigger: '充电底座启动', note: '拿起自动触发开机，与基站同步', battery: '100%' },
        { time: '10-24 19:42', event: '关机', trigger: '手动物理中键', note: '工作结束自行关机并装入充电仓', battery: '54%' },
        { time: '10-24 08:45', event: '开机', trigger: '红外佩戴传感器', note: '开始晨会，佩戴自动唤醒', battery: '98%' }
    ];

    // Variations based on ID odd/even to make details dynamic
    if (numericPart % 2 === 0) {
        powerLogs[0] = { time: '10-26 21:10', event: '关机', trigger: '低电量自动关机', note: '系统低压限制，自动触发深度休眠', battery: '2%' };
    }

    // Charging records
    const chargingLogs = [
        { start: '10-25 21:55', end: '10-26 00:30', duration: '2小时35分钟', startBattery: '1%', endBattery: '100%', method: '分体式磁吸多路座充', current: '5V/1.5A', status: '正常满电' },
        { start: '10-24 19:45', end: '10-24 21:30', duration: '1小时45分钟', startBattery: '54%', endBattery: '100%', method: '单路 Type-C 极速快充', current: '9V/2A', status: '正常满电' },
        { start: '10-23 20:10', end: '10-23 22:50', duration: '2小时40分钟', startBattery: '12%', endBattery: '100%', method: '分体式磁吸多路座充', current: '5V/1.5A', status: '正常满电' }
    ];

    if (numericPart % 3 === 0) {
        chargingLogs.unshift({
            start: '10-26 15:30',
            end: '10-26 16:15',
            duration: '45分钟',
            startBattery: '15%',
            endBattery: '60%',
            method: '工作区便携 Type-C 充',
            current: '5V/1A',
            status: '中途拔出使用'
        });
    }

    return { powerLogs, chargingLogs };
};

// --- Device Historical Logs Date Comparison Helpers ---
const parseLogDateToValue = (dateStr: string): number => {
    if (!dateStr) return 0;
    const cleanStr = dateStr.trim();
    const parts = cleanStr.split(' ');
    const mdParts = parts[0].split('-');
    const m = parseInt(mdParts[0], 10) || 10;
    const d = parseInt(mdParts[1], 10) || 1;
    let h = 0;
    let min = 0;
    if (parts[1]) {
        const hmParts = parts[1].split(':');
        h = parseInt(hmParts[0], 10) || 0;
        min = parseInt(hmParts[1], 10) || 0;
    }
    return m * 10500000 + d * 100000 + h * 60 + min;
};

const parseHtmlDateToValue = (htmlDateStr: string): number => {
    if (!htmlDateStr) return 0;
    const parts = htmlDateStr.split('-');
    if (parts.length < 3) return 0;
    const m = parseInt(parts[1], 10) || 10;
    const d = parseInt(parts[2], 10) || 1;
    return m * 10500000 + d * 100000;
};

const parseHtmlDateToEndValue = (htmlDateStr: string): number => {
    if (!htmlDateStr) return Infinity;
    const parts = htmlDateStr.split('-');
    if (parts.length < 3) return Infinity;
    const m = parseInt(parts[1], 10) || 10;
    const d = parseInt(parts[2], 10) || 31;
    return m * 10500000 + d * 100000 + (23 * 60 + 59);
};

// --- Components ---

const KPICard = ({ title, value, icon: Icon, color, subText, trend }: any) => (
    <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-700 flex flex-col justify-between h-full hover:shadow-md transition-shadow">
        <div className="flex justify-between items-start mb-4">
            <div className={`p-3 rounded-xl ${color.bg} ${color.text}`}>
                <Icon size={24} />
            </div>
            {trend && (
                <span className={`text-xs font-bold px-2 py-1 rounded-full ${trend > 0 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                    {trend > 0 ? '+' : ''}{trend}%
                </span>
            )}
        </div>
        <div>
            <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-1">{value}</h3>
            <p className="text-gray-500 dark:text-gray-400 text-sm font-medium">{title}</p>
        </div>
        {subText && (
            <div className="mt-4 pt-4 border-t border-gray-100 dark:border-slate-700">
                 <p className="text-xs text-gray-400">{subText}</p>
            </div>
        )}
    </div>
);

const DeviceDashboard: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [filterType, setFilterType] = useState('all'); // all, abnormal
    const [networkFilter, setNetworkFilter] = useState('all'); // all, online, offline
    const [taskFilter, setTaskFilter] = useState('all'); // all, idle, recording
    const [healthFilter, setHealthFilter] = useState('all'); // all, 正常, 电量过低, 离线
    const [selectedBadge, setSelectedBadge] = useState<any | null>(null);
    const [drilldownTab, setDrilldownTab] = useState<'power' | 'charge'>('power');
    const [timeFilterType, setTimeFilterType] = useState<string>('all'); // all, today, yesterday, past3days, custom
    const [customStartDate, setCustomStartDate] = useState<string>('2026-10-24');
    const [customEndDate, setCustomEndDate] = useState<string>('2026-10-26');

    // 1. KPI & Data Calculations
    const stats = useMemo(() => {
        const total = MOCK_BADGES.length;
        const successCount = MOCK_BADGES.filter(b => b.lastTaskResult === 'success').length;
        const successRate = Math.round((successCount / total) * 100);

        // Active Processing
        const processingCount = MOCK_BADGES.filter(b => b.taskStatus === 'recording').length;

        // Abnormal Badges
        const abnormalCount = MOCK_BADGES.filter(b => 
            b.errorReason !== '正常'
        ).length;

        // Abnormality Distribution
        const distribution: Record<string, number> = {};
        MOCK_BADGES.forEach(b => {
            if (b.errorReason !== '正常') {
                distribution[b.errorReason] = (distribution[b.errorReason] || 0) + 1;
            }
        });
        
        const pieData = Object.keys(distribution).map(key => ({
            name: key,
            value: distribution[key]
        })).sort((a, b) => b.value - a.value);

        return {
            successRate,
            processingCount,
            abnormalCount,
            pieData
        };
    }, []);

    // 2. Filter Logic
    const filteredList = useMemo(() => {
        return MOCK_BADGES.filter(item => {
            const matchesSearch = item.id.toLowerCase().includes(searchTerm.toLowerCase()) || item.user.includes(searchTerm) || item.store.includes(searchTerm);
            if (!matchesSearch) return false;

            const isAbnormal = item.errorReason !== '正常';
            if (filterType === 'abnormal' && !isAbnormal) return false;

            // Network status filter: online, offline
            if (networkFilter !== 'all' && item.status !== networkFilter) return false;

            // Current task filter: idle, recording
            if (taskFilter !== 'all' && item.taskStatus !== taskFilter) return false;

            // Health diagnosis filter: 正常, 电量过低, 离线
            if (healthFilter !== 'all' && item.errorReason !== healthFilter) return false;
            
            return true;
        });
    }, [searchTerm, filterType, networkFilter, taskFilter, healthFilter]);

    // 3. Drilldown filtered logs calculations
    const { filteredPowerLogs, filteredChargingLogs } = useMemo(() => {
        if (!selectedBadge) return { filteredPowerLogs: [], filteredChargingLogs: [] };
        const { powerLogs, chargingLogs } = getBadgeHistory(selectedBadge.id);

        const isDateTimeInFilter = (timeStr: string) => {
            if (!timeStr) return true;
            const parts = timeStr.split(' ');
            const md = parts[0]; // e.g. "10-26"
            
            if (timeFilterType === 'all') {
                return true;
            }
            if (timeFilterType === 'today') {
                return md === '10-26';
            }
            if (timeFilterType === 'yesterday') {
                return md === '10-25';
            }
            if (timeFilterType === 'past3days') {
                return md === '10-26' || md === '10-25' || md === '10-24';
            }
            if (timeFilterType === 'custom') {
                const logVal = parseLogDateToValue(timeStr);
                const startVal = customStartDate ? parseHtmlDateToValue(customStartDate) : 0;
                const endVal = customEndDate ? parseHtmlDateToEndValue(customEndDate) : Infinity;
                return logVal >= startVal && logVal <= endVal;
            }
            return true;
        };

        const fPower = powerLogs.filter(log => isDateTimeInFilter(log.time));
        const fCharge = chargingLogs.filter(log => isDateTimeInFilter(log.start));

        return { filteredPowerLogs: fPower, filteredChargingLogs: fCharge };
    }, [selectedBadge, timeFilterType, customStartDate, customEndDate]);

    const COLORS = ['#ef4444', '#f97316', '#eab308', '#64748b', '#3b82f6'];

    return (
        <div className="space-y-6 animate-fade-in pb-12 relative">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white">智能工牌录音业务运维仪表盘</h2>
                    <p className="text-sm text-gray-500 mt-1 flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                        系统运行中 · 数据实时同步
                    </p>
                </div>
                <div className="flex gap-2">
                    <button className="flex items-center gap-2 px-3 py-2 bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-lg text-sm text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-slate-700">
                        <RefreshCw size={16} /> 刷新数据
                    </button>
                </div>
            </div>

            {/* Top KPI Cards & Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                <KPICard 
                    title="实时进行中录音" 
                    value={stats.processingCount} 
                    icon={Activity} 
                    color={{ bg: 'bg-blue-100 dark:bg-blue-900/30', text: 'text-blue-600 dark:text-blue-400' }}
                    subText="设备正在运行录音业务"
                />

                {/* Pie Chart */}
                <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-700">
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">异常原因分布</h3>
                    <div className="flex items-center">
                        <div className="h-64 w-1/2">
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie 
                                        data={stats.pieData} 
                                        cx="50%" 
                                        cy="50%" 
                                        innerRadius={60} 
                                        outerRadius={80} 
                                        paddingAngle={5} 
                                        dataKey="value"
                                    >
                                        {stats.pieData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                        ))}
                                    </Pie>
                                    <Tooltip />
                                </PieChart>
                            </ResponsiveContainer>
                        </div>
                        <div className="w-1/2 space-y-3">
                            {stats.pieData.slice(0, 5).map((entry, index) => (
                                <div key={index} className="flex items-center justify-between text-sm">
                                    <div className="flex items-center gap-2">
                                        <span className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[index % COLORS.length] }}></span>
                                        <span className="text-gray-600 dark:text-gray-300">{entry.name}</span>
                                    </div>
                                    <span className="font-bold text-gray-900 dark:text-white">{entry.value}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Device List */}
            <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-700 overflow-hidden">
                <div className="p-6 border-b border-gray-100 dark:border-slate-700 flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white">设备实时监控列表</h3>
                    
                    <div className="flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center gap-3">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                            <input 
                                type="text" 
                                placeholder="搜索设备/人员..." 
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="pl-9 pr-4 py-2 w-full sm:w-48 bg-gray-50 dark:bg-slate-700 border border-gray-200 dark:border-slate-600 rounded-lg text-sm outline-none focus:ring-2 focus:ring-indigo-500 dark:text-white"
                            />
                        </div>

                        {/* 网络状态 */}
                        <div className="flex items-center gap-1.5">
                            <span className="text-xs text-gray-500 dark:text-gray-400 font-medium whitespace-nowrap">网络状态：</span>
                            <select 
                                value={networkFilter}
                                onChange={(e) => setNetworkFilter(e.target.value)}
                                className="pl-2.5 pr-8 py-2 bg-gray-50 dark:bg-slate-700 border border-gray-200 dark:border-slate-600 rounded-lg text-sm outline-none focus:ring-2 focus:ring-indigo-500 dark:text-white cursor-pointer"
                            >
                                <option value="all">全部</option>
                                <option value="online">在线</option>
                                <option value="offline">离线</option>
                            </select>
                        </div>

                        {/* 当前任务 */}
                        <div className="flex items-center gap-1.5">
                            <span className="text-xs text-gray-500 dark:text-gray-400 font-medium whitespace-nowrap">当前任务：</span>
                            <select 
                                value={taskFilter}
                                onChange={(e) => setTaskFilter(e.target.value)}
                                className="pl-2.5 pr-8 py-2 bg-gray-50 dark:bg-slate-700 border border-gray-200 dark:border-slate-600 rounded-lg text-sm outline-none focus:ring-2 focus:ring-indigo-500 dark:text-white cursor-pointer"
                            >
                                <option value="all">全部</option>
                                <option value="idle">空闲</option>
                                <option value="recording">录音中</option>
                            </select>
                        </div>

                        {/* 健康诊断 */}
                        <div className="flex items-center gap-1.5">
                            <span className="text-xs text-gray-500 dark:text-gray-400 font-medium whitespace-nowrap">健康诊断：</span>
                            <select 
                                value={healthFilter}
                                onChange={(e) => setHealthFilter(e.target.value)}
                                className="pl-2.5 pr-8 py-2 bg-gray-50 dark:bg-slate-700 border border-gray-200 dark:border-slate-600 rounded-lg text-sm outline-none focus:ring-2 focus:ring-indigo-500 dark:text-white cursor-pointer"
                            >
                                <option value="all">全部</option>
                                <option value="正常">正常</option>
                                <option value="电量过低">电量过低</option>
                                <option value="离线">离线</option>
                            </select>
                        </div>

                        {(networkFilter !== 'all' || taskFilter !== 'all' || healthFilter !== 'all' || searchTerm) && (
                            <button
                                onClick={() => {
                                    setNetworkFilter('all');
                                    setTaskFilter('all');
                                    setHealthFilter('all');
                                    setSearchTerm('');
                                }}
                                className="px-3 py-2 bg-gray-100 hover:bg-gray-200 dark:bg-slate-700 dark:hover:bg-slate-600 rounded-lg text-xs font-bold text-gray-600 dark:text-gray-300 transition-colors"
                            >
                                重置条件
                            </button>
                        )}
                    </div>
                </div>
                
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead className="bg-gray-55 dark:bg-slate-700/50 text-gray-500 dark:text-gray-450 text-xs font-bold uppercase tracking-wider border-b border-gray-100 dark:border-slate-700">
                            <tr>
                                <th className="px-6 py-4 font-bold">设备ID / 归属</th>
                                <th className="px-6 py-4 font-bold">网络状态</th>
                                <th className="px-6 py-4 font-bold">电量</th>
                                <th className="px-6 py-4 font-bold">当前任务</th>
                                <th className="px-6 py-4 font-bold">最近同步</th>
                                <th className="px-6 py-4 font-bold">健康诊断</th>
                                <th className="px-6 py-4 font-bold text-right">操作</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100 dark:divide-slate-700">
                            {filteredList.map((badge) => (
                                <tr 
                                    key={badge.id} 
                                    onClick={() => setSelectedBadge(badge)}
                                    className="hover:bg-indigo-50/40 dark:hover:bg-slate-700/30 transition-colors cursor-pointer group"
                                >
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="p-2 bg-gray-100 dark:bg-slate-700 rounded-lg group-hover:bg-indigo-100 dark:group-hover:bg-indigo-400/10 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                                                <Server size={18} className="text-gray-500 dark:text-gray-400" />
                                            </div>
                                            <div>
                                                <div className="text-sm font-bold text-gray-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">{badge.user}</div>
                                                <div className="text-xs text-gray-400 font-mono">{badge.id} · {badge.store}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        {badge.status === 'online' ? (
                                            <div className="flex items-center gap-1.5 text-green-600 dark:text-green-400 text-sm font-medium">
                                                <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
                                                <Wifi size={16} /> 在线
                                            </div>
                                        ) : (
                                            <div className="flex items-center gap-1.5 text-gray-400 text-sm font-medium">
                                                <span className="w-1.5 h-1.5 rounded-full bg-gray-300"></span>
                                                <WifiOff size={16} /> 离线
                                            </div>
                                        )}
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-2">
                                            <Battery size={18} className={badge.battery < 20 ? 'text-red-500 animate-pulse' : 'text-gray-500 dark:text-gray-400'} />
                                            <div className="w-16 bg-gray-200 dark:bg-slate-600 h-1.5 rounded-full overflow-hidden">
                                                <div 
                                                    className={`h-full ${badge.battery < 20 ? 'bg-red-500' : badge.battery < 50 ? 'bg-yellow-500' : 'bg-green-500'}`} 
                                                    style={{width: `${badge.battery}%`}}
                                                ></div>
                                            </div>
                                            <span className="text-xs text-gray-505 font-mono font-bold">{badge.battery}%</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        {badge.taskStatus === 'recording' ? (
                                            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-red-50 text-red-650 dark:bg-red-950/30 dark:text-red-300 animate-pulse border border-red-105">
                                                <span className="w-1.5 h-1.5 rounded-full bg-red-600"></span> 录音中
                                            </span>
                                        ) : (
                                            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-650 dark:bg-slate-700 dark:text-gray-400">
                                                空闲
                                            </span>
                                        )}
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-550 dark:text-gray-400 font-mono font-medium">
                                        {badge.lastSync}
                                    </td>
                                    <td className="px-6 py-4">
                                        {badge.errorReason === '正常' ? (
                                            <span className="flex items-center gap-1 text-green-600 dark:text-green-400 text-xs font-bold bg-green-50/50 dark:bg-green-950/20 px-2.5 py-1 rounded-md border border-green-100/30">
                                                <CheckCircle2 size={13} /> 正常
                                            </span>
                                        ) : (
                                            <span className="flex items-center gap-1 text-red-500 text-xs font-bold bg-red-50 dark:bg-red-900/10 px-2.5 py-1 rounded-md border border-red-100/30">
                                                <AlertTriangle size={13} /> {badge.errorReason}
                                            </span>
                                        )}
                                    </td>
                                    <td className="px-6 py-4 text-right" onClick={(e) => e.stopPropagation()}>
                                        <button 
                                            onClick={() => setSelectedBadge(badge)}
                                            className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-indigo-50 hover:bg-indigo-100 dark:bg-slate-700 dark:hover:bg-slate-650 text-indigo-600 dark:text-indigo-400 rounded-lg text-xs font-bold transition-all active:scale-95 cursor-pointer shadow-xs whitespace-nowrap"
                                        >
                                            详情
                                            <ArrowRight size={12} className="group-hover:translate-x-0.5 transition-transform" />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            
            {/* selectedBadge Details Drilldown Drawer */}
            {selectedBadge && (
                <div className="fixed inset-0 z-50 overflow-hidden flex justify-end" aria-labelledby="modal-title" role="dialog" aria-modal="true">
                    {/* Backdrop */}
                    <div 
                        onClick={() => setSelectedBadge(null)}
                        className="absolute inset-0 bg-slate-900/60 backdrop-blur-xs transition-opacity duration-300"
                    ></div>

                    {/* Drawer Content Container with wide screen-space as requested */}
                    <div className="relative w-full md:w-[85vw] lg:w-[80vw] xl:w-[75vw] bg-white dark:bg-slate-900 shadow-2xl h-full flex flex-col z-10 border-l border-gray-100 dark:border-slate-800 transition-all duration-300">
                        {/* Header bar */}
                        <div className="p-6 border-b border-gray-100 dark:border-slate-800 bg-gray-50/50 dark:bg-slate-900/50 flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-2xl bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 font-bold text-lg flex items-center justify-center border border-indigo-100/40 dark:border-indigo-900/30">
                                    {selectedBadge.user.charAt(0)}
                                </div>
                                <div>
                                    <h4 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
                                        <span>{selectedBadge.user}</span>
                                        {selectedBadge.status === 'online' ? (
                                            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-green-50 text-green-700 dark:bg-green-950/20 dark:text-green-400">
                                                <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
                                                在线
                                            </span>
                                        ) : (
                                            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-50 text-amber-700 dark:bg-amber-950/20 dark:text-amber-400">
                                                离线
                                            </span>
                                        )}
                                    </h4>
                                    <p className="text-xs text-gray-400 font-medium">
                                        工牌 ID：<span className="font-mono text-gray-500 dark:text-gray-300 font-bold">{selectedBadge.id} · {selectedBadge.store}</span>
                                    </p>
                                </div>
                            </div>
                            <button 
                                onClick={() => setSelectedBadge(null)}
                                className="p-2 text-gray-400 hover:text-gray-650 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-slate-800 rounded-xl transition-all cursor-pointer"
                            >
                                <X size={20} />
                            </button>
                        </div>

                        {/* Split Panel Body */}
                        <div className="flex-1 flex flex-col lg:grid lg:grid-cols-12 overflow-hidden">
                            
                            {/* Left Side: Diagnostics and Time Filter (4 cols) */}
                            <div className="lg:col-span-4 border-r border-gray-100 dark:border-slate-800 bg-slate-50/30 dark:bg-slate-900/20 p-6 overflow-y-auto space-y-6 flex flex-col">
                                <div>
                                    <h5 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">智能自检与状态诊断</h5>
                                    <div className="space-y-3">
                                        {/* Battery Card */}
                                        <div className="bg-white dark:bg-slate-800 p-4 rounded-xl shadow-xs border border-gray-100 dark:border-slate-800">
                                            <span className="text-xs text-gray-400 block mb-1">当前电量</span>
                                            <div className="flex items-center gap-2">
                                                <Battery className={selectedBadge.battery < 20 ? 'text-red-500' : 'text-indigo-500'} size={18} />
                                                <span className="text-base font-extrabold text-gray-800 dark:text-white">{selectedBadge.battery}%</span>
                                            </div>
                                            <div className="w-full bg-gray-100 dark:bg-slate-700 h-1 rounded-full mt-2 overflow-hidden">
                                                <div 
                                                    className={`h-full ${selectedBadge.battery < 20 ? 'bg-red-500' : 'bg-indigo-500'}`}
                                                    style={{ width: `${selectedBadge.battery}%` }}
                                                ></div>
                                            </div>
                                        </div>

                                        {/* Sync Card */}
                                        <div className="bg-white dark:bg-slate-800 p-4 rounded-xl shadow-xs border border-gray-100 dark:border-slate-800">
                                            <span className="text-xs text-gray-400 block mb-1">最后同步时间</span>
                                            <div className="flex items-center gap-1 text-gray-700 dark:text-gray-300 text-sm font-bold">
                                                <Clock size={14} className="text-gray-400" />
                                                <span className="font-mono">{selectedBadge.lastSync}</span>
                                            </div>
                                            <span className="text-[10px] text-gray-400 block mt-1">云数据库同步成功 (SSL 加密)</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Date/Time querying control panel placed here as side filter */}
                                <div className="p-4 bg-white dark:bg-slate-800 rounded-xl border border-gray-100 dark:border-slate-700 shadow-sm space-y-3">
                                    <div className="flex items-center justify-between">
                                        <span className="text-xs font-bold text-gray-750 dark:text-gray-300 flex items-center gap-1.5">
                                            <Calendar size={14} className="text-indigo-500" />
                                            历史日志时间过滤
                                        </span>
                                        {timeFilterType !== 'all' && (
                                            <button 
                                                onClick={() => setTimeFilterType('all')}
                                                className="text-[11px] text-indigo-600 dark:text-indigo-400 font-bold hover:underline cursor-pointer"
                                            >
                                                重置
                                            </button>
                                        )}
                                    </div>

                                    {/* Preset Buttons */}
                                    <div className="grid grid-cols-2 gap-1.5">
                                        {[
                                            { id: 'all', label: '全部记录' },
                                            { id: 'today', label: '10-26 (今天)' },
                                            { id: 'yesterday', label: '10-25 (昨天)' },
                                            { id: 'past3days', label: '最近3天' },
                                        ].map((preset) => (
                                            <button
                                                key={preset.id}
                                                onClick={() => setTimeFilterType(preset.id)}
                                                className={`px-2 py-1.5 text-xs font-semibold rounded-lg transition-all border ${
                                                    timeFilterType === preset.id
                                                        ? 'bg-indigo-600 border-indigo-600 text-white shadow-xs'
                                                        : 'bg-gray-50 dark:bg-slate-700 border-gray-200 dark:border-slate-600 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-600'
                                                } cursor-pointer text-center`}
                                            >
                                                {preset.label}
                                            </button>
                                        ))}
                                    </div>
                                    
                                    <button
                                        onClick={() => setTimeFilterType('custom')}
                                        className={`w-full py-1.5 text-xs font-semibold rounded-lg transition-all border ${
                                            timeFilterType === 'custom'
                                                ? 'bg-indigo-600 border-indigo-600 text-white shadow-xs'
                                                : 'bg-gray-50 dark:bg-slate-700 border-gray-200 dark:border-slate-600 text-gray-600 dark:text-gray-300'
                                        } cursor-pointer text-center`}
                                    >
                                        自定义时间范围
                                    </button>

                                    {/* Custom Date Inputs */}
                                    {timeFilterType === 'custom' && (
                                        <div className="space-y-2 pt-2 border-t border-gray-100 dark:border-slate-700">
                                            <div>
                                                <label className="text-[10px] text-gray-400 block mb-1">起始日期</label>
                                                <input 
                                                    type="date" 
                                                    value={customStartDate}
                                                    onChange={(e) => setCustomStartDate(e.target.value)}
                                                    className="w-full text-xs bg-gray-55 dark:bg-slate-700 border border-gray-200 dark:border-slate-600 rounded-lg p-2 outline-none focus:border-indigo-500 dark:text-white"
                                                />
                                            </div>
                                            <div>
                                                <label className="text-[10px] text-gray-400 block mb-1">结束日期</label>
                                                <input 
                                                    type="date" 
                                                    value={customEndDate}
                                                    onChange={(e) => setCustomEndDate(e.target.value)}
                                                    className="w-full text-xs bg-gray-55 dark:bg-slate-700 border border-gray-200 dark:border-slate-600 rounded-lg p-2 outline-none focus:border-indigo-500 dark:text-white"
                                                />
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Right Side: Log lists container (8 cols) - Extremely spacious as requested */}
                            <div className="lg:col-span-8 flex flex-col h-full overflow-hidden">
                                {/* Detail tabs component */}
                                <div className="px-6 pt-4 border-b border-gray-100 dark:border-slate-800 flex gap-6 bg-white dark:bg-slate-900 font-bold">
                                    <button 
                                        onClick={() => setDrilldownTab('power')}
                                        className={`pb-3 text-sm font-semibold transition-all relative cursor-pointer ${
                                            drilldownTab === 'power' 
                                                ? 'text-indigo-600 dark:text-indigo-400 border-b-2 border-indigo-600' 
                                                : 'text-gray-400 dark:text-gray-500 hover:text-gray-600'
                                        }`}
                                    >
                                        <span className="flex items-center gap-1.5">
                                            <Power size={14} />
                                            设备录音使用日志
                                        </span>
                                    </button>

                                    <button 
                                        onClick={() => setDrilldownTab('charge')}
                                        className={`pb-3 text-sm font-semibold transition-all relative cursor-pointer ${
                                            drilldownTab === 'charge' 
                                                ? 'text-indigo-600 dark:text-indigo-400 border-b-2 border-indigo-600' 
                                                : 'text-gray-400 dark:text-gray-500 hover:text-gray-600'
                                        }`}
                                    >
                                        <span className="flex items-center gap-1.5">
                                            <BatteryCharging size={14} />
                                            设备充电历史记录
                                        </span>
                                    </button>
                                </div>

                                {/* List/Timeline Area */}
                                <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-white dark:bg-slate-900">
                                    {drilldownTab === 'power' && (
                                        <div className="space-y-4 text-gray-700 dark:text-gray-200">
                                            <div className="flex items-center justify-between text-xs text-gray-400">
                                                <span>近期运行轨迹：{filteredPowerLogs.length} 次已过滤事件记录</span>
                                                <span>实时更新：刚刚</span>
                                            </div>

                                            {filteredPowerLogs.length === 0 ? (
                                                <div className="text-center py-16 px-4 bg-gray-50/50 dark:bg-slate-800/10 rounded-2xl border border-dashed border-gray-200 dark:border-slate-800">
                                                    <History size={40} className="mx-auto text-gray-300 dark:text-gray-600 mb-3" />
                                                    <p className="text-sm font-bold text-gray-600 dark:text-gray-400">当前时间过滤段内无录音使用数据</p>
                                                    <p className="text-xs text-gray-400 mt-1">您可以试着切换其它日期，或点击重置条件</p>
                                                </div>
                                            ) : (
                                                <div className="relative border-l border-indigo-100 dark:border-slate-800 ml-4 pl-8 space-y-6">
                                                    {filteredPowerLogs.map((log, index) => (
                                                        <div key={index} className="relative">
                                                            {/* Node Circle */}
                                                            <span className={`absolute -left-[38px] top-1.5 w-4 h-4 rounded-full border-4 border-white dark:border-slate-900 shadow-md flex items-center justify-center ${
                                                                log.event === '开机' 
                                                                    ? 'bg-emerald-500 ring-4 ring-emerald-50/50 dark:ring-emerald-950/20' 
                                                                    : 'bg-rose-500 ring-4 ring-rose-50/50 dark:ring-rose-950/20'
                                                            }`}>
                                                            </span>

                                                            <div className="bg-gray-50/50 dark:bg-slate-850 p-5 rounded-2xl border border-gray-100 dark:border-slate-800 hover:shadow-md transition-all">
                                                                <div className="flex items-center justify-between gap-4 mb-2">
                                                                    <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-bold ${
                                                                        log.event === '开机'
                                                                            ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/30 dark:text-emerald-400'
                                                                            : 'bg-rose-50 text-rose-700 dark:bg-rose-950/30 dark:text-rose-400'
                                                                    }`}>
                                                                        {log.event === '开机' ? '工牌开机录音' : '工牌关机结束录音'}
                                                                    </span>
                                                                    <span className="text-xs text-gray-400 font-mono flex items-center gap-1 bg-white dark:bg-slate-800 px-2.5 py-1 rounded-lg border border-gray-100 dark:border-slate-700 shadow-xs">
                                                                        <Clock size={12} className="text-indigo-500" />
                                                                        {log.time}
                                                                    </span>
                                                                </div>

                                                                <div className="space-y-2 text-sm mt-3">
                                                                    <p className="text-xs text-gray-455 flex items-center gap-1 font-mono bg-white dark:bg-slate-800/35 p-2 rounded-lg border border-gray-100/60 dark:border-slate-800 w-fit">
                                                                        <Battery size={13} className="text-emerald-500" />
                                                                        事件发生时的精确电压/剩余电量：<span className="font-bold text-gray-700 dark:text-gray-200">{log.battery}</span>
                                                                    </p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    )}

                                    {drilldownTab === 'charge' && (
                                        <div className="space-y-4">
                                            <div className="flex items-center justify-between text-xs text-gray-400">
                                                <span>本期累计磁吸/Type-C 接入：{filteredChargingLogs.length} 次记录</span>
                                            </div>

                                            {filteredChargingLogs.length === 0 ? (
                                                <div className="text-center py-16 px-4 bg-gray-50/50 dark:bg-slate-800/10 rounded-2xl border border-dashed border-gray-200 dark:border-slate-800">
                                                    <BatteryCharging size={40} className="mx-auto text-gray-300 dark:text-gray-600 mb-3" />
                                                    <p className="text-sm font-bold text-gray-600 dark:text-gray-400">当前筛选区间内无任何充电痕迹</p>
                                                    <p className="text-xs text-gray-400 mt-1">您可以试着切换其它时间过滤，或手动清除自定义范围</p>
                                                </div>
                                            ) : (
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                    {filteredChargingLogs.map((log, index) => (
                                                        <div key={index} className="bg-gray-50/40 dark:bg-slate-850 p-5 rounded-2xl border border-gray-100 dark:border-slate-800 hover:shadow-md transition-all flex flex-col justify-between">
                                                            <div>
                                                                <div className="flex items-center mb-3 pb-3 border-b border-gray-150 dark:border-slate-800">
                                                                    <div className="flex items-center gap-2">
                                                                        <div className="p-2 rounded-lg bg-indigo-50 dark:bg-indigo-950/30 text-indigo-600 dark:text-indigo-400">
                                                                            <BatteryCharging size={16} />
                                                                        </div>
                                                                        <div>
                                                                            <span className="text-[10px] text-gray-400 block leading-tight">充电持续时间</span>
                                                                            <span className="text-sm font-extrabold text-indigo-650 dark:text-indigo-400">{log.duration}</span>
                                                                        </div>
                                                                    </div>
                                                                </div>

                                                                <div className="space-y-2 text-xs">
                                                                    <div className="flex justify-between py-0.5 border-b border-gray-100/50 dark:border-slate-800/30">
                                                                        <span className="text-gray-400">接入电量比例</span>
                                                                        <span className="font-mono text-gray-700 dark:text-gray-300 font-bold">{log.startBattery}</span>
                                                                    </div>
                                                                    <div className="flex justify-between py-0.5">
                                                                        <span className="text-gray-400">拔出电量比例</span>
                                                                        <span className="font-mono text-emerald-600 dark:text-emerald-400 font-extrabold">{log.endBattery}</span>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            
                                                            <div className="mt-4 pt-3 border-t border-dashed border-gray-200 dark:border-slate-800 flex flex-col gap-1 text-[11px] text-gray-400 font-mono bg-white dark:bg-slate-800/40 p-2.5 rounded-xl">
                                                                <div className="flex justify-between">
                                                                    <span>接入：</span>
                                                                    <span>{log.start}</span>
                                                                </div>
                                                                <div className="flex justify-between">
                                                                    <span>拔出：</span>
                                                                    <span>{log.end}</span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    )}
                                </div>

                                {/* Footer bar / action on the right-bottom */}
                                <div className="p-6 bg-gray-50 dark:bg-slate-900 border-t border-gray-100 dark:border-slate-800 flex gap-3">
                                    <button 
                                        onClick={() => {
                                            alert('已成功向该智能工牌设备下发实时在线检测信号与云同步指令！');
                                        }}
                                        className="flex-1 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold rounded-xl text-sm transition-all shadow-md shadow-indigo-100 dark:shadow-none cursor-pointer"
                                    >
                                        实时触发在线检测信号与云端同步
                                    </button>
                                    <button 
                                        onClick={() => setSelectedBadge(null)}
                                        className="px-6 py-3 bg-white hover:bg-gray-100 border border-gray-200 dark:border-slate-700 dark:bg-slate-800 dark:hover:bg-slate-755 text-gray-700 dark:text-gray-300 font-bold rounded-xl text-sm transition-all cursor-pointer"
                                    >
                                        关闭档案
                                    </button>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            )}

            <AIAssistant context="dashboard" />
        </div>
    );
};

export default DeviceDashboard;
