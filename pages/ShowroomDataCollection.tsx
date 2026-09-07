
import React, { useState, useEffect } from 'react';
import { 
  Users, 
  UserCheck, 
  Car, 
  Handshake, 
  Clock, 
  Mic, 
  TrendingUp, 
  CheckCircle2, 
  Info,
  Download,
  UserPlus,
  X,
  Store,
  ChevronRight,
  Sparkles,
  ArrowUpRight,
  Calendar,
  HelpCircle
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  Cell,
  PieChart as RePieChart,
  Pie
} from 'recharts';

const StatCard = ({ title, value, unit, icon: Icon, color, size = 'normal', onClick, onInfoClick }: any) => (
  <div 
    onClick={onClick}
    className={`bg-white dark:bg-slate-800 p-4 rounded-2xl shadow-sm border transition-all relative overflow-hidden group h-full flex flex-col
      ${onClick 
        ? 'cursor-pointer border-primary-200 dark:border-primary-800/50 hover:shadow-md hover:border-primary-500' 
        : 'border-gray-100 dark:border-slate-700'}`}
  >
    {/* Background Decoration */}
    <div className={`absolute -right-2 -top-2 w-16 h-16 ${color} opacity-[0.03] rounded-full group-hover:scale-150 transition-transform`}></div>
    
    <div className="flex justify-between items-start mb-3 relative z-10">
      <div className={`p-1.5 rounded-xl ${color} bg-opacity-10 text-${color.split('-')[1]}-600 dark:text-${color.split('-')[1]}-400 group-hover:scale-110 transition-transform`}>
        <Icon size={size === 'small' ? 16 : 20} />
      </div>
      <div className="flex gap-1">
        {onInfoClick && (
          <button 
            onClick={(e) => {
              e.stopPropagation();
              onInfoClick();
            }}
            className="p-1 text-gray-400 hover:text-primary-500 hover:bg-primary-50 dark:hover:bg-primary-900/20 rounded-lg transition-colors"
            title="指标解释"
          >
            <HelpCircle size={14} />
          </button>
        )}
        {onClick && (
          <div className="p-1 bg-primary-500 text-white rounded-lg shadow-sm group-hover:bg-primary-600 transition-colors">
            <ArrowUpRight size={12} strokeWidth={3} />
          </div>
        )}
      </div>
    </div>
    
    <div className="relative z-10 mt-auto">
      <div className="min-h-[2rem] flex items-end mb-1">
        <p className={`${size === 'small' ? 'text-[10px]' : 'text-[11px]'} text-gray-500 dark:text-gray-400 font-bold leading-tight uppercase tracking-wider`}>
          {title}
        </p>
      </div>
      <div className="flex items-baseline gap-1 flex-wrap">
        <h3 className={`${size === 'small' ? 'text-lg' : 'text-xl'} font-black text-gray-900 dark:text-white tracking-tighter`}>
          {value}
        </h3>
        {unit && (
          <span className="text-[10px] text-gray-400 font-medium whitespace-nowrap">
            {unit}
          </span>
        )}
      </div>
    </div>
  </div>
);

const DrillDownModal = ({ isOpen, onClose, title, sections }: any) => {
  const [activeTab, setActiveTab] = useState(0);

  useEffect(() => {
    if (isOpen) setActiveTab(0);
  }, [isOpen]);

  if (!isOpen) return null;

  const COLORS = ['#6366f1', '#818cf8', '#a5b4fc', '#c7d2fe', '#2dd4bf', '#5eead4', '#99f6e4', '#ccfbf1'];
  const VISIT_COLORS = ['#10b981', '#3b82f6'];

  const activeSection = sections[activeTab];

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-white dark:bg-slate-800 rounded-3xl shadow-2xl w-full max-w-3xl overflow-hidden border border-gray-100 dark:border-slate-700">
        <div className="p-6 border-b border-gray-100 dark:border-slate-700 flex justify-between items-center bg-gray-50/50 dark:bg-slate-800/50">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white">{title} - 深度分析</h3>
          <button onClick={onClose} className="p-2 hover:bg-gray-200 dark:hover:bg-slate-700 rounded-full transition-colors">
            <X size={20} className="text-gray-500" />
          </button>
        </div>

        {/* Tabs Navigation */}
        {sections.length > 1 && (
          <div className="flex px-6 border-b border-gray-100 dark:border-slate-700 bg-gray-50/30 dark:bg-slate-800/30">
            {sections.map((section: any, idx: number) => (
              <button
                key={idx}
                onClick={() => setActiveTab(idx)}
                className={`px-8 py-4 text-sm font-bold transition-all relative ${
                  activeTab === idx 
                    ? 'text-primary-600 dark:text-primary-400' 
                    : 'text-gray-400 hover:text-gray-600 dark:hover:text-gray-300'
                }`}
              >
                {section.name}
                {activeTab === idx && (
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-primary-600 rounded-full"></div>
                )}
              </button>
            ))}
          </div>
        )}
        
        <div className="p-8 h-[480px] overflow-y-auto flex flex-col justify-center">
          {activeSection && (
            <div className="animate-fade-in space-y-4 w-full">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
                <div className="h-[280px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <RePieChart>
                      <Pie
                        data={activeSection.data}
                        cx="50%"
                        cy="50%"
                        innerRadius={70}
                        outerRadius={100}
                        paddingAngle={5}
                        dataKey="value"
                      >
                        {activeSection.data.map((entry: any, index: number) => (
                          <Cell 
                            key={`cell-${index}`} 
                            fill={activeSection.type === 'visit' ? VISIT_COLORS[index % VISIT_COLORS.length] : COLORS[index % COLORS.length]} 
                          />
                        ))}
                      </Pie>
                      <Tooltip 
                        contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                      />
                    </RePieChart>
                  </ResponsiveContainer>
                </div>
                <div className="space-y-2.5">
                  {activeSection.data.map((item: any, index: number) => (
                    <div key={item.name} className="flex items-center justify-between p-3 rounded-2xl hover:bg-gray-50 dark:hover:bg-slate-700/50 transition-colors border border-transparent hover:border-gray-100 dark:hover:border-slate-600">
                      <div className="flex items-center gap-3">
                        <div 
                          className="w-3.5 h-3.5 rounded-full shadow-sm" 
                          style={{ backgroundColor: activeSection.type === 'visit' ? VISIT_COLORS[index % VISIT_COLORS.length] : COLORS[index % COLORS.length] }}
                        ></div>
                        <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">{item.name}</span>
                      </div>
                      <div className="text-right">
                        <span className="text-sm font-black text-gray-900 dark:text-white">{item.value}</span>
                        <span className="text-xs font-medium text-primary-500 bg-primary-50 dark:bg-primary-900/20 px-2 py-0.5 rounded-md ml-2">{item.percent}%</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="p-6 bg-gray-50 dark:bg-slate-800/50 border-t border-gray-100 dark:border-slate-700 text-center">
          <button 
            onClick={onClose}
            className="px-10 py-3 bg-primary-600 text-white rounded-2xl font-bold hover:bg-primary-700 transition-all shadow-xl shadow-primary-500/25 active:scale-95"
          >
            完成查看
          </button>
        </div>
      </div>
    </div>
  );
};

const ExecutionMetric = ({ title, value, color }: any) => (
  <div className="bg-white dark:bg-slate-800 p-5 rounded-2xl border border-gray-100 dark:border-slate-700 relative overflow-hidden">
    <div className={`absolute left-0 top-0 bottom-0 w-1 ${color}`}></div>
    <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">{title}</p>
    <div className="flex items-baseline gap-1">
      <span className="text-3xl font-bold text-gray-900 dark:text-white">{value}</span>
      <span className="text-sm text-gray-400">%</span>
    </div>
  </div>
);

const chartData = [
  { name: '手机', hit: 71.22 },
  { name: '姓名', hit: 76.50 },
  { name: '环节', hit: 59.80 },
  { name: '车型', hit: 72.15 },
  { name: '一/二次', hit: 63.40 },
];

const ExplanationModal = ({ isOpen, onClose, title, explanation }: any) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-[2px] animate-fade-in">
      <div className="bg-white dark:bg-slate-800 rounded-3xl shadow-2xl w-full max-w-md overflow-hidden border border-gray-100 dark:border-slate-700">
        <div className="p-6 border-b border-gray-100 dark:border-slate-700 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-primary-50 dark:bg-primary-900/20 rounded-xl text-primary-600">
              <Info size={20} />
            </div>
            <h3 className="text-lg font-bold text-gray-900 dark:text-white">指标解释</h3>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 dark:hover:bg-slate-700 rounded-full transition-colors">
            <X size={18} className="text-gray-400" />
          </button>
        </div>
        <div className="p-8">
          <h4 className="text-sm font-bold text-primary-600 mb-2">{title}</h4>
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-sm">
            {explanation}
          </p>
        </div>
        <div className="p-6 bg-gray-50 dark:bg-slate-800/50 border-t border-gray-100 dark:border-slate-700 text-right">
          <button 
            onClick={onClose}
            className="px-6 py-2 bg-white dark:bg-slate-700 border border-gray-200 dark:border-slate-600 text-gray-700 dark:text-gray-200 rounded-xl font-bold hover:bg-gray-50 transition-all text-sm"
          >
            知道了
          </button>
        </div>
      </div>
    </div>
  );
};

const ShowroomDataCollection: React.FC = () => {
  const [drillDown, setDrillDown] = useState<{ isOpen: boolean; title: string; sections: any[] }>({
    isOpen: false,
    title: '',
    sections: []
  });

  const [explanation, setExplanation] = useState<{ isOpen: boolean; title: string; text: string }>({
    isOpen: false,
    title: '',
    text: ''
  });

  const metricExplanations: Record<string, string> = {
    '工牌使用门店数': '统计周期内，至少有一名员工使用智能工牌进行接待的门店总数。',
    '工牌使用': '统计周期内，所有员工佩戴并开启工牌进行接待的总人次。',
    '工牌使用率': '工牌使用率',
    '总客流': '展厅内通过工牌识别或人工录入的所有进店客户总数。',
    '总试驾': '统计周期内完成的所有试乘试驾流程总数。',
    '成交交付': '统计周期内最终达成成交并完成车辆交付的客户数量。',
    '有效录音时长 (分钟)': '所有工牌采集到的有效接待语音通话总时长。',
    '一次客流': '首次到店咨询的客户数量。',
    '二次客流': '再次到店进行深度洽谈或试驾的客户数量。',
    '试乘试驾': '客户在店内进行的标准化试乘试驾体验次数。',
    '上门试驾': '销售顾问携带车辆前往客户指定地点进行的试驾服务次数。',
    '成交谈判': '客户进入价格谈判或合同签署阶段的接待次数。',
    '线索跟进': '统计周期内对潜在客户线索进行跟进和维护的次数。',
    '接待时长 (分钟)': '销售顾问与客户进行有效沟通的累计时间。',
    '展厅接待 (分钟)': '仅限在展厅静态展示区域内的接待时长。',
    '试驾时长 (分钟)': '动态试乘试驾过程中的语音采集时长。',
    '谈判录音时长 (分钟)': '商务洽谈室或谈判区内的语音采集时长。',
    '交付录音时长 (分钟)': '交付中心或交付区内的语音采集时长。',
  };

  const handleShowExplanation = (title: string) => {
    setExplanation({
      isOpen: true,
      title,
      text: metricExplanations[title] || '暂无该指标的详细解释。'
    });
  };

  const carModelDistribution = [
    { name: 'XT5', value: 450, percent: 25 },
    { name: 'CT5', value: 360, percent: 20 },
    { name: 'XT4', value: 270, percent: 15 },
    { name: 'CT6', value: 180, percent: 10 },
    { name: 'XT6', value: 180, percent: 10 },
    { name: 'VISTIQ', value: 144, percent: 8 },
    { name: '傲歌', value: 108, percent: 6 },
    { name: '锐歌', value: 108, percent: 6 },
  ];

  const visitTypeDistribution = [
    { name: '首次到店', value: 823, percent: 34.9 },
    { name: '二次到店', value: 1536, percent: 65.1 },
  ];

  const handleDrillDown = (title: string) => {
    const sections = [
      { name: '车型分布', data: carModelDistribution, type: 'model' }
    ];

    if (title === '总客流') {
      sections.push({ name: '客流类型分布', data: visitTypeDistribution, type: 'visit' });
    }

    setDrillDown({
      isOpen: true,
      title,
      sections
    });
  };

  return (
    <div className="space-y-8 animate-fade-in pb-10">
      <DrillDownModal 
        isOpen={drillDown.isOpen} 
        onClose={() => setDrillDown({ ...drillDown, isOpen: false })}
        title={drillDown.title}
        sections={drillDown.sections}
      />

      <ExplanationModal
        isOpen={explanation.isOpen}
        onClose={() => setExplanation({ ...explanation, isOpen: false })}
        title={explanation.title}
        explanation={explanation.text}
      />
      
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">展厅数据采集</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">实时监控展厅核心运营指标与流程执行情况</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl text-sm font-medium hover:bg-gray-50 dark:hover:bg-slate-700 transition-colors">
          <Download size={16} />
          数据下载
        </button>
      </div>

      {/* 核心运营指标 */}
      <section className="space-y-4">
        <div className="flex items-center gap-2">
          <div className="w-1 h-6 bg-primary-600 rounded-full"></div>
          <h2 className="text-lg font-bold text-gray-900 dark:text-white">核心运营指标</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7 gap-4">
          <StatCard title="工牌使用门店数" value="42" icon={Store} color="bg-blue-600" onInfoClick={() => handleShowExplanation('工牌使用门店数')} />
          <StatCard title="工牌使用" value="564" icon={TrendingUp} color="bg-blue-500" onInfoClick={() => handleShowExplanation('工牌使用')} />
          <StatCard 
            title="总客流" 
            value="2,359" 
            icon={Users} 
            color="bg-indigo-500" 
            onClick={() => handleDrillDown('总客流')}
            onInfoClick={() => handleShowExplanation('总客流')}
          />
          <StatCard 
            title="总试驾" 
            value="1,614" 
            icon={Car} 
            color="bg-pink-500" 
            onClick={() => handleDrillDown('总试驾')}
            onInfoClick={() => handleShowExplanation('总试驾')}
          />
          <StatCard title="工牌使用率" value="92.5" unit="%" icon={Calendar} color="bg-violet-500" onInfoClick={() => handleShowExplanation('工牌使用率')} />
          <StatCard title="成交交付" value="81" icon={Handshake} color="bg-amber-500" onInfoClick={() => handleShowExplanation('成交交付')} />
          <StatCard title="有效录音时长" unit="分钟" value="80,944.4" icon={Mic} color="bg-emerald-500" onInfoClick={() => handleShowExplanation('有效录音时长 (分钟)')} />
        </div>
      </section>

      {/* 细分指标分析 */}
      <section className="space-y-4">
        <div className="flex items-center gap-2">
          <div className="w-1 h-6 bg-primary-600 rounded-full"></div>
          <h2 className="text-lg font-bold text-gray-900 dark:text-white">细分指标分析</h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          <StatCard title="一次客流" value="823" icon={UserPlus} color="bg-green-500" size="small" onInfoClick={() => handleShowExplanation('一次客流')} />
          <StatCard title="二次客流" value="1,536" icon={Users} color="bg-cyan-500" size="small" onInfoClick={() => handleShowExplanation('二次客流')} />
          <StatCard title="试乘试驾" value="1,614" icon={Car} color="bg-blue-500" size="small" onInfoClick={() => handleShowExplanation('试乘试驾')} />
          <StatCard title="上门试驾" value="45" icon={UserCheck} color="bg-purple-500" size="small" onInfoClick={() => handleShowExplanation('上门试驾')} />
          <StatCard title="成交谈判" value="1,902" icon={Handshake} color="bg-pink-500" size="small" onInfoClick={() => handleShowExplanation('成交谈判')} />
          <StatCard title="线索跟进" value="77" icon={TrendingUp} color="bg-orange-500" size="small" onInfoClick={() => handleShowExplanation('线索跟进')} />
        </div>
      </section>

      {/* 录音时长分析 */}
      <section className="space-y-4">
        <div className="flex items-center gap-2">
          <div className="w-1 h-6 bg-primary-600 rounded-full"></div>
          <h2 className="text-lg font-bold text-gray-900 dark:text-white">录音时长分析</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
          <StatCard title="接待时长" unit="分钟" value="77,822.47" icon={Clock} color="bg-rose-500" onInfoClick={() => handleShowExplanation('接待时长 (分钟)')} />
          <StatCard title="展厅接待" unit="分钟" value="61,629.32" icon={Clock} color="bg-amber-500" onInfoClick={() => handleShowExplanation('展厅接待 (分钟)')} />
          <StatCard title="试驾时长" unit="分钟" value="71,478.72" icon={Clock} color="bg-emerald-500" onInfoClick={() => handleShowExplanation('试驾时长 (分钟)')} />
          <StatCard title="谈判录音时长" unit="分钟" value="74,430.48" icon={Clock} color="bg-blue-500" onInfoClick={() => handleShowExplanation('谈判录音时长 (分钟)')} />
          <StatCard title="交付录音时长" unit="分钟" value="5,293.25" icon={Clock} color="bg-indigo-500" onInfoClick={() => handleShowExplanation('交付录音时长 (分钟)')} />
        </div>
      </section>

      {/* 规范流程执行 */}
      <section className="space-y-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-1 h-6 bg-primary-600 rounded-full"></div>
            <h2 className="text-lg font-bold text-gray-900 dark:text-white">规范流程执行</h2>
          </div>
          <button className="text-xs text-primary-600 font-medium flex items-center gap-1">
            <Download size={12} /> 下载报告
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <ExecutionMetric title="整体规范流程执行率" value="49.94" color="bg-indigo-500" />
          <ExecutionMetric title="展厅接待执行率" value="30.23" color="bg-emerald-500" />
          <ExecutionMetric title="试乘试驾执行率" value="75.22" color="bg-rose-500" />
          <ExecutionMetric title="成交谈判执行率" value="23.27" color="bg-emerald-500" />
          <ExecutionMetric title="新车交付执行率" value="49.94" color="bg-rose-500" />
          <ExecutionMetric title="上门试驾执行率" value="30.23" color="bg-emerald-500" />
          <ExecutionMetric title="客户回访执行率" value="75.22" color="bg-rose-500" />
          <ExecutionMetric title="线索跟进执行率" value="23.27" color="bg-emerald-500" />
        </div>
      </section>

      {/* 图表分析 */}
      <section className="bg-white dark:bg-slate-800 p-6 rounded-3xl border border-gray-100 dark:border-slate-700">
        <div className="mb-6">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white">各环节流程信息执行率 vs 客户信息命中率</h3>
          <p className="text-xs text-gray-400 mt-1">重点分析各环节两个核心指标的对比情况</p>
        </div>
        <div className="h-[400px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
              <XAxis 
                dataKey="name" 
                axisLine={false} 
                tickLine={false} 
                tick={{ fontSize: 12, fill: '#94a3b8' }}
                dy={10}
              />
              <YAxis 
                axisLine={false} 
                tickLine={false} 
                tick={{ fontSize: 12, fill: '#94a3b8' }}
                unit="%"
              />
              <Tooltip 
                cursor={{ fill: '#f8fafc' }}
                contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
              />
              <Legend verticalAlign="top" align="center" iconType="circle" wrapperStyle={{ paddingBottom: '20px' }} />
              <Bar name="客户信息命中率" dataKey="hit" fill="#60a5fa" radius={[4, 4, 0, 0]} barSize={40} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </section>
    </div>
  );
};

export default ShowroomDataCollection;
