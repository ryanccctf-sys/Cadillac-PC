
import React, { useState } from 'react';
import { 
  Trophy, 
  Download, 
  ChevronDown, 
  AlertCircle,
  BarChart3
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  Cell 
} from 'recharts';

const stores = [
  '江西运通凯威', '石家庄凯天', '上海浦江凯迪', '河南威佳金凯', '福州凯迪',
  '上海弘仑', '上海绿地徐畅', '上海中致远凯迪', '上海众国凯泓', '台州卡迪'
];

const getRandomStore = () => stores[Math.floor(Math.random() * stores.length)];

const mockData1 = [
  { store: getRandomStore(), name: '柳絮影', value: 84.73 },
  { store: getRandomStore(), name: '李明月', value: 80.56 },
  { store: getRandomStore(), name: '史亚如', value: 80.37 },
  { store: getRandomStore(), name: '潘建', value: 80.00 },
  { store: getRandomStore(), name: '孟佳乐', value: 80.00 },
  { store: getRandomStore(), name: '李雷鸣', value: 79.45 },
  { store: getRandomStore(), name: '邹伟杰', value: 79.17 },
  { store: getRandomStore(), name: '王小明', value: 78.50 },
  { store: getRandomStore(), name: '陈大华', value: 77.20 },
  { store: getRandomStore(), name: '张三', value: 76.80 },
];

const mockData2 = [
  { store: getRandomStore(), name: '董耀飞', value: 26.19 },
  { store: getRandomStore(), name: '贾文广', value: 23.81 },
  { store: getRandomStore(), name: '曹道祯', value: 21.43 },
  { store: getRandomStore(), name: '刘洋', value: 20.83 },
  { store: getRandomStore(), name: '罗树鑫', value: 20.24 },
  { store: getRandomStore(), name: '张欣利', value: 20.24 },
  { store: getRandomStore(), name: '金煦彭', value: 19.05 },
  { store: getRandomStore(), name: '赵六', value: 18.50 },
  { store: getRandomStore(), name: '孙七', value: 17.20 },
  { store: getRandomStore(), name: '周八', value: 16.80 },
];

const mockData3 = [
  { store: getRandomStore(), name: '张晓明', value: 92.45 },
  { store: getRandomStore(), name: '王建国', value: 90.12 },
  { store: getRandomStore(), name: '李丽华', value: 88.76 },
  { store: getRandomStore(), name: '赵铁柱', value: 87.50 },
  { store: getRandomStore(), name: '刘美玲', value: 86.30 },
  { store: getRandomStore(), name: '陈小龙', value: 85.10 },
  { store: getRandomStore(), name: '杨超越', value: 84.20 },
  { store: getRandomStore(), name: '黄渤', value: 83.50 },
  { store: getRandomStore(), name: '徐峥', value: 82.80 },
  { store: getRandomStore(), name: '沈腾', value: 81.50 },
];

const CustomYAxisTick = (props: any) => {
  const { x, y, index, data } = props;
  const item = data[index];
  if (!item) return null;

  return (
    <g transform={`translate(${x},${y})`}>
      <text 
        x={-12} 
        y={-4} 
        textAnchor="end" 
        fill="#94a3b8" 
        fontSize={10} 
        className="font-medium"
      >
        {item.store}
      </text>
      <text 
        x={-12} 
        y={12} 
        textAnchor="end" 
        fill="#1e293b" 
        fontSize={12} 
        fontWeight="bold"
        className="dark:fill-white"
      >
        {item.name}
      </text>
    </g>
  );
};

const RenderCustomBarLabel = (props: any) => {
  const { x, y, width, height, value } = props;
  return (
    <text 
      x={x + width + 8} 
      y={y + height / 2} 
      fill="#6366f1" 
      fontSize={12} 
      fontWeight="bold" 
      textAnchor="start" 
      dominantBaseline="middle"
    >
      {`${value}%`}
    </text>
  );
};

const NationalRanking: React.FC = () => {
  const [rankingType, setRankingType] = useState('red'); // 'red' or 'black'

  return (
    <div className="space-y-6 animate-fade-in pb-10">
      {/* Header */}
      <div className="bg-white dark:bg-slate-800 p-6 rounded-3xl border border-gray-100 dark:border-slate-700 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-primary-50 dark:bg-primary-900/20 rounded-2xl text-primary-600 dark:text-primary-400">
            <Trophy size={28} />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">全国排行榜</h1>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              将工牌规范流程执行率、质检执行力，可根据销售顾问/小区/大区进行排名。
            </p>
          </div>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-slate-700 border border-gray-200 dark:border-slate-600 rounded-xl text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-slate-600 transition-colors shadow-sm">
          <Download size={16} />
          数据下载
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white dark:bg-slate-800 p-4 rounded-2xl border border-gray-100 dark:border-slate-700 shadow-sm flex flex-wrap items-center gap-6">
        <div className="flex items-center gap-3">
          <span className="text-sm font-bold text-gray-900 dark:text-white">排名维度</span>
          <div className="relative">
            <select className="appearance-none bg-gray-50 dark:bg-slate-700 border border-gray-200 dark:border-slate-600 rounded-lg pl-3 pr-10 py-2 text-sm outline-none focus:ring-2 focus:ring-primary-500 transition-all dark:text-white min-w-[120px]">
              <option>人员</option>
              <option>小区</option>
              <option>大区</option>
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={14} />
          </div>
        </div>

        <div className="flex bg-gray-100 dark:bg-slate-700 p-1 rounded-xl">
          <button 
            onClick={() => setRankingType('red')}
            className={`px-6 py-1.5 rounded-lg text-sm font-medium transition-all ${rankingType === 'red' ? 'bg-primary-600 text-white shadow-md' : 'text-gray-500 hover:text-gray-700 dark:text-gray-400'}`}
          >
            红榜
          </button>
          <button 
            onClick={() => setRankingType('black')}
            className={`px-6 py-1.5 rounded-lg text-sm font-medium transition-all ${rankingType === 'black' ? 'bg-gray-800 text-white shadow-md' : 'text-gray-500 hover:text-gray-700 dark:text-gray-400'}`}
          >
            黑榜
          </button>
        </div>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Chart 1 */}
        <div className="bg-white dark:bg-slate-800 rounded-3xl border border-gray-100 dark:border-slate-700 shadow-sm overflow-hidden">
          <div className="p-5 border-b border-gray-50 dark:border-slate-700 flex items-center gap-2">
            <Trophy className="text-primary-500" size={20} />
            <h3 className="font-bold text-gray-900 dark:text-white">规范流程执行率 TOP10</h3>
          </div>
          <div className="p-4 h-[500px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={mockData1}
                layout="vertical"
                margin={{ top: 10, right: 60, left: 85, bottom: 10 }}
              >
                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#f1f5f9" />
                <XAxis type="number" hide domain={[0, 100]} />
                <YAxis 
                  dataKey="name" 
                  type="category" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={<CustomYAxisTick data={mockData1} />}
                  width={85}
                />
                <Tooltip 
                  cursor={{ fill: 'transparent' }}
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                  formatter={(value: any) => [`${value}%`, '执行率']}
                />
                <Bar dataKey="value" fill="#6366f1" radius={[0, 6, 6, 0]} barSize={12} label={<RenderCustomBarLabel />} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Chart 2 */}
        <div className="bg-white dark:bg-slate-800 rounded-3xl border border-gray-100 dark:border-slate-700 shadow-sm overflow-hidden">
          <div className="p-5 border-b border-gray-50 dark:border-slate-700 flex items-center gap-2">
            <BarChart3 className="text-primary-500" size={20} />
            <h3 className="font-bold text-gray-900 dark:text-white">服务流程执行率 TOP10</h3>
          </div>
          <div className="p-4 h-[500px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={mockData2}
                layout="vertical"
                margin={{ top: 10, right: 60, left: 85, bottom: 10 }}
              >
                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#f1f5f9" />
                <XAxis type="number" hide domain={[0, 100]} />
                <YAxis 
                  dataKey="name" 
                  type="category" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={<CustomYAxisTick data={mockData2} />}
                  width={85}
                />
                <Tooltip 
                  cursor={{ fill: 'transparent' }}
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                  formatter={(value: any) => [`${value}%`, '执行率']}
                />
                <Bar dataKey="value" fill="#6366f1" radius={[0, 6, 6, 0]} barSize={12} label={<RenderCustomBarLabel />} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Chart 3 */}
        <div className="bg-white dark:bg-slate-800 rounded-3xl border border-gray-100 dark:border-slate-700 shadow-sm overflow-hidden">
          <div className="p-5 border-b border-gray-50 dark:border-slate-700 flex items-center gap-2">
            <AlertCircle className="text-primary-500" size={20} />
            <h3 className="font-bold text-gray-900 dark:text-white">产品质检执行率 TOP10</h3>
          </div>
          <div className="p-4 h-[500px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={mockData3}
                layout="vertical"
                margin={{ top: 10, right: 60, left: 85, bottom: 10 }}
              >
                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#f1f5f9" />
                <XAxis type="number" hide domain={[0, 100]} />
                <YAxis 
                  dataKey="name" 
                  type="category" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={<CustomYAxisTick data={mockData3} />}
                  width={85}
                />
                <Tooltip 
                  cursor={{ fill: 'transparent' }}
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                  formatter={(value: any) => [`${value}%`, '执行率']}
                />
                <Bar dataKey="value" fill="#6366f1" radius={[0, 6, 6, 0]} barSize={12} label={<RenderCustomBarLabel />} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NationalRanking;
