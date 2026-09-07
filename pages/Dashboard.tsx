
import React from 'react';
import { 
  Users, 
  Clock, 
  TrendingUp, 
  AlertCircle,
  MapPin,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import AIAssistant from '../components/AIAssistant';

const data = [
  { time: '09:00', traffic: 12, service: 8 },
  { time: '10:00', traffic: 25, service: 15 },
  { time: '11:00', traffic: 45, service: 30 },
  { time: '12:00', traffic: 30, service: 28 },
  { time: '13:00', traffic: 35, service: 20 },
  { time: '14:00', traffic: 50, service: 42 },
  { time: '15:00', traffic: 65, service: 50 },
];

const heatMapData = [
  { zone: 'A区 SUV展台', traffic: 85, color: 'bg-red-500' },
  { zone: 'B区 轿车展台', traffic: 62, color: 'bg-orange-500' },
  { zone: 'C区 新能源区', traffic: 98, color: 'bg-red-600' },
  { zone: 'D区 洽谈区', traffic: 45, color: 'bg-yellow-500' },
  { zone: 'E区 客休区', traffic: 30, color: 'bg-green-500' },
];

const StatCard = ({ title, value, change, icon: Icon, color }: any) => (
  <div className="bg-white dark:bg-slate-800 p-5 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-700">
    <div className="flex justify-between items-start">
      <div>
        <p className="text-gray-500 dark:text-slate-400 text-sm font-medium mb-1">{title}</p>
        <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{value}</h3>
      </div>
      <div className={`p-2.5 rounded-lg ${color} bg-opacity-10`}>
        <Icon className={`w-5 h-5 ${color.replace('bg-', 'text-')}`} />
      </div>
    </div>
    <div className="mt-4 flex items-center text-sm">
      {change >= 0 ? (
        <span className="text-green-500 flex items-center font-medium">
          <ArrowUpRight size={16} className="mr-1" /> {change}%
        </span>
      ) : (
        <span className="text-red-500 flex items-center font-medium">
          <ArrowDownRight size={16} className="mr-1" /> {Math.abs(change)}%
        </span>
      )}
      <span className="text-gray-400 ml-2">较昨日</span>
    </div>
  </div>
);

const Dashboard: React.FC = () => {
  return (
    <div className="space-y-6 relative">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">运营总览</h2>
        <div className="flex gap-2">
            <span className="flex items-center gap-2 text-sm text-green-500 bg-green-50 dark:bg-green-900/20 px-3 py-1 rounded-full border border-green-200 dark:border-green-800">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500"></span>
                </span>
                系统运行正常
            </span>
            <span className="text-sm text-gray-500 flex items-center">最后更新: 刚刚</span>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="今日进店客流" value="328" change={12.5} icon={Users} color="bg-blue-500" />
        <StatCard title="平均停留时长" value="28分" change={-5.2} icon={Clock} color="bg-indigo-500" />
        <StatCard title="今日接待覆盖率" value="98%" change={2.1} icon={TrendingUp} color="bg-green-500" />
        <StatCard title="关键事件预警" value="3" change={0} icon={AlertCircle} color="bg-red-500" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Chart */}
        <div className="lg:col-span-2 bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-700">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-6">实时客流趋势</h3>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="colorTraffic" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="time" axisLine={false} tickLine={false} tick={{fill: '#94a3b8'}} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8'}} />
                <Tooltip 
                    contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}}
                />
                <Area type="monotone" dataKey="traffic" stroke="#6366f1" strokeWidth={3} fillOpacity={1} fill="url(#colorTraffic)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Heatmap/Zones */}
        <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-700">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-6">区域热力排行</h3>
          <div className="space-y-5">
            {heatMapData.map((item, index) => (
              <div key={index}>
                <div className="flex justify-between items-center mb-2">
                  <div className="flex items-center gap-2">
                    <span className={`w-5 h-5 rounded-md flex items-center justify-center text-xs font-bold ${index < 3 ? 'bg-gray-900 text-white dark:bg-white dark:text-slate-900' : 'bg-gray-100 text-gray-500'}`}>
                        {index + 1}
                    </span>
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-200">{item.zone}</span>
                  </div>
                  <span className="text-sm font-bold text-gray-900 dark:text-white">{item.traffic}人</span>
                </div>
                <div className="w-full bg-gray-100 dark:bg-slate-700 rounded-full h-2">
                  <div className={`h-2 rounded-full ${item.color}`} style={{ width: `${item.traffic}%` }}></div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-8 p-4 bg-gray-50 dark:bg-slate-700/50 rounded-xl">
             <div className="flex items-center gap-3 mb-2">
                <MapPin className="text-primary-500 w-5 h-5" />
                <span className="font-semibold text-gray-900 dark:text-white">展厅动线洞察</span>
             </div>
             <p className="text-sm text-gray-500 dark:text-gray-400">今日SUV展区客流滞留时间较昨日增加15%，建议增派接待人员。</p>
          </div>
        </div>
      </div>

      {/* Events / Alerts */}
      <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-700 overflow-hidden">
        <div className="p-6 border-b border-gray-100 dark:border-slate-700 flex justify-between items-center">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white">实时监控告警</h3>
            <button className="text-sm text-primary-600 hover:text-primary-700 font-medium">查看全部</button>
        </div>
        <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
                <thead>
                    <tr className="bg-gray-50 dark:bg-slate-700/50 text-gray-500 dark:text-gray-400 text-xs uppercase tracking-wider">
                        <th className="px-6 py-4 font-medium">事件类型</th>
                        <th className="px-6 py-4 font-medium">区域/位置</th>
                        <th className="px-6 py-4 font-medium">相关员工</th>
                        <th className="px-6 py-4 font-medium">发生时间</th>
                        <th className="px-6 py-4 font-medium">状态</th>
                        <th className="px-6 py-4 font-medium">操作</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 dark:divide-slate-700">
                    {[
                        { type: '客流拥堵', loc: 'A区 入口', staff: '-', time: '14:20:05', status: 'pending' },
                        { type: '接待超时', loc: 'D区 洽谈室3', staff: '李进取', time: '14:15:00', status: 'handled' },
                        { type: '离岗预警', loc: '前台', staff: '张新人', time: '13:50:22', status: 'pending' },
                    ].map((row, i) => (
                        <tr key={i} className="hover:bg-gray-50 dark:hover:bg-slate-700/30 transition-colors">
                            <td className="px-6 py-4">
                                <div className="flex items-center gap-2">
                                    <div className={`w-2 h-2 rounded-full ${row.status === 'pending' ? 'bg-red-500' : 'bg-gray-400'}`}></div>
                                    <span className="text-sm font-medium text-gray-900 dark:text-white">{row.type}</span>
                                </div>
                            </td>
                            <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">{row.loc}</td>
                            <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">{row.staff}</td>
                            <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400 font-mono">{row.time}</td>
                            <td className="px-6 py-4">
                                <span className={`px-2 py-1 rounded-md text-xs font-medium ${row.status === 'pending' ? 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300' : 'bg-gray-100 text-gray-700 dark:bg-slate-700 dark:text-gray-300'}`}>
                                    {row.status === 'pending' ? '待处理' : '已处理'}
                                </span>
                            </td>
                            <td className="px-6 py-4">
                                <button className="text-primary-600 hover:text-primary-800 text-sm font-medium">查看监控</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
      </div>
      
      <AIAssistant context="dashboard" />
    </div>
  );
};

export default Dashboard;
