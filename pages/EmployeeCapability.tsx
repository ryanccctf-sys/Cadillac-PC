
import React, { useState } from 'react';
import { 
  Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, 
  ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, 
  Tooltip as RechartsTooltip, Legend 
} from 'recharts';
import { 
  Download, Filter, ChevronRight, X, User, Briefcase, 
  TrendingUp, Award, MessageSquare, Target, Activity,
  List, Heart, Sparkles, Quote, Info, CheckCircle2,
  /* Added missing Clock import */
  Clock
} from 'lucide-react';

const RADAR_DATA = [
  { subject: '配置差异对比', A: 95, B: 85, fullMark: 100 },
  { subject: '竞品对比话术', A: 88, B: 70, fullMark: 100 },
  { subject: '现车紧缺施压', A: 75, B: 60, fullMark: 100 },
  { subject: '情感关系话术', A: 92, B: 80, fullMark: 100 },
  { subject: '赠品价值说明', A: 85, B: 75, fullMark: 100 },
  { subject: '售后权益前置', A: 70, B: 65, fullMark: 100 },
  { subject: '价格底线坦诚', A: 80, B: 70, fullMark: 100 },
  { subject: '定金锁定策略', A: 65, B: 55, fullMark: 100 },
  { subject: '试驾体验话术', A: 82, B: 78, fullMark: 100 },
  { subject: '空间异议处理', A: 88, B: 82, fullMark: 100 },
];

const BAR_DATA = [
  { name: '张歌', '配置差异对比': 100, '竞品对比话术': 66.67, '现车紧缺施压': 66.67, '情感关系话术': 33.33, '赠品价值说明': 33.33, '售后权益前置': 33.33, '价格底线坦诚': 33.33, '定金锁定策略': 66.67, '试驾体验话术': 66.67, '空间异议处理': 66.67 },
  { name: '陆俊杰', '配置差异对比': 50, '竞品对比话术': 50, '现车紧缺施压': 50, '情感关系话术': 50, '赠品价值说明': 100, '售后权益前置': 50, '价格底线坦诚': 50, '定金锁定策略': 0, '试驾体验话术': 0, '空间异议处理': 0 },
];

const CAPABILITY_METRICS = [
  '配置差异对比', '竞品对比话术', '现车紧缺施压', '情感关系话术', '赠品价值说明', 
  '售后权益前置', '价格底线坦诚', '定金锁定策略'
];

const MOCK_TABLE_DATA = [
  { id: 1, name: '张歌', scores: { '配置差异对比': 100, '竞品对比话术': 66.7, '现车紧缺施压': 66.7, '情感关系话术': 33.3, '赠品价值说明': 33.3, '售后权益前置': 33.3, '价格底线坦诚': 66.7, '定金锁定策略': 66.7 } },
  { id: 2, name: '潘建峰', scores: { '配置差异对比': 0, '竞品对比话术': 0, '现车紧缺施压': 0, '情感关系话术': 0, '赠品价值说明': 0, '售后权益前置': 0, '价格底线坦诚': 0, '定金锁定策略': 0 } },
  { id: 3, name: '张志伟', scores: { '配置差异对比': 0, '竞品对比话术': 0, '现车紧缺施压': 0, '情感关系话术': 0, '赠品价值说明': 0, '售后权益前置': 0, '价格底线坦诚': 0, '定金锁定策略': 0 } },
  { id: 4, name: '赵英', scores: { '配置差异对比': 0, '竞品对比话术': 0, '现车紧缺施压': 0, '情感关系话术': 0, '赠品价值说明': 0, '售后权益前置': 0, '价格底线坦诚': 0, '定金锁定策略': 0 } },
  { id: 5, name: '董晨', scores: { '配置差异对比': 0, '竞品对比话术': 0, '现车紧缺施压': 0, '情感关系话术': 0, '赠品价值说明': 0, '售后权益前置': 0, '价格底线坦诚': 0, '定金锁定策略': 0 } },
  { id: 6, name: '陆俊杰', scores: { '配置差异对比': 50, '竞品对比话术': 50, '现车紧缺施压': 50, '情感关系话术': 50, '赠品价值说明': 100, '售后权益前置': 50, '价格底线坦诚': 50, '定金锁定策略': 0 } },
];

const EmployeeCapability: React.FC = () => {
  const [showDetail, setShowDetail] = useState(false);
  const [activeCell, setActiveCell] = useState<any>(null);

  const handleCellClick = (advisor: string, element: string, value: number) => {
    setActiveCell({ advisor, element, value });
    setShowDetail(true);
  };

  return (
    <div className="space-y-6 animate-fade-in pb-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
            <Award className="text-primary-600" /> 员工能力评估
          </h2>
          <p className="text-sm text-gray-500 mt-1">当前选择：一区 / 夏航 / 上海浦江凯迪拉克</p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl text-sm font-medium hover:bg-gray-50 transition-all">
            <Filter size={16} /> 筛选条件
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-primary-600 text-white rounded-xl text-sm font-medium hover:bg-primary-700 transition-all shadow-sm">
            <Download size={16} /> 导出数据
          </button>
        </div>
      </div>

      {/* Overview Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Radar Chart */}
        <div className="lg:col-span-4 bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-700">
          <h3 className="text-lg font-bold mb-6 text-gray-800 dark:text-white">能力模型概览</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="80%" data={RADAR_DATA}>
                <PolarGrid stroke="#e2e8f0" />
                <PolarAngleAxis dataKey="subject" tick={{ fill: '#64748b', fontSize: 10 }} />
                <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                <Radar name="本期" dataKey="A" stroke="#4f46e5" fill="#4f46e5" fillOpacity={0.4} />
                <Radar name="上期" dataKey="B" stroke="#10b981" fill="#10b981" fillOpacity={0.2} />
                <Legend wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }} />
                <RechartsTooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Stacked Bar Chart */}
        <div className="lg:col-span-8 bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-700">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-bold text-gray-800 dark:text-white">顾问能力对比分析</h3>
            <span className="text-xs text-gray-400">▲ 1/2 ▼</span>
          </div>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={BAR_DATA} layout="vertical" margin={{ left: 40, right: 40 }}>
                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#f1f5f9" />
                <XAxis type="number" domain={[0, 600]} hide />
                <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} />
                <RechartsTooltip cursor={{ fill: 'rgba(79, 70, 229, 0.05)' }} contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }} />
                <Legend iconType="rect" wrapperStyle={{ fontSize: '10px', paddingTop: '20px' }} />
                {CAPABILITY_METRICS.map((metric, index) => (
                  <Bar 
                    key={metric} 
                    dataKey={metric} 
                    stackId="a" 
                    fill={['#3b82f6', '#10b981', '#64748b', '#f59e0b', '#8b5cf6', '#06b6d4', '#ec4899', '#f97316'][index % 8]} 
                    barSize={24}
                    label={{ position: 'inside', fill: '#fff', fontSize: 10, formatter: (val: number) => val > 0 ? `${val.toFixed(1)}%` : '' }}
                  />
                ))}
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Detail Table Section */}
      <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-700 overflow-hidden">
        <div className="p-6 border-b border-gray-100 dark:border-slate-700 flex justify-between items-center">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
            <List className="text-primary-500" size={20} /> 员工能力明细
          </h3>
          <p className="text-sm text-gray-500">总共有 <span className="font-bold text-primary-600">7</span> 条数据</p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead className="bg-[#415a77] text-white">
              <tr className="text-xs uppercase tracking-wider">
                <th className="px-4 py-4 font-bold text-center w-16">序号</th>
                <th className="px-4 py-4 font-bold min-w-[100px]">顾问</th>
                {CAPABILITY_METRICS.map(m => (
                  <th key={m} className="px-4 py-4 font-bold text-center min-w-[120px]">{m}</th>
                ))}
                <th className="px-4 py-4 font-bold text-center w-20">操作</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-slate-700 text-sm">
              {MOCK_TABLE_DATA.map((row, index) => (
                <tr key={row.id} className="hover:bg-gray-50 dark:hover:bg-slate-700/30 transition-colors">
                  <td className="px-4 py-4 text-center text-gray-500">{index + 1}</td>
                  <td className="px-4 py-4 font-bold text-gray-800 dark:text-gray-100">{row.name}</td>
                  {CAPABILITY_METRICS.map(m => (
                    <td key={m} className="px-4 py-4 text-center">
                      <button 
                        onClick={() => handleCellClick(row.name, m, (row.scores as any)[m])}
                        className={`font-medium transition-colors hover:underline ${(row.scores as any)[m] > 0 ? 'text-primary-600' : 'text-gray-400'}`}
                      >
                        {(row.scores as any)[m] > 0 ? `${(row.scores as any)[m]}%` : '0%'}
                      </button>
                    </td>
                  ))}
                  <td className="px-4 py-4 text-center">
                    <button className="text-primary-600 font-bold hover:underline" onClick={() => handleCellClick(row.name, '综合评估', 85)}>查看</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Detail Modal */}
      {showDetail && activeCell && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fade-in">
          <div className="bg-white dark:bg-slate-800 w-full max-w-6xl rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[85vh]">
            {/* Modal Header Row */}
            <div className="bg-[#4f46e5] text-white flex items-center relative shadow-lg">
               <div className="grid grid-cols-12 w-full font-bold text-sm uppercase tracking-widest text-center">
                  <div className="col-span-2 py-5 border-r border-white/10">流程环节</div>
                  <div className="col-span-2 py-5 border-r border-white/10">成交要素</div>
                  <div className="col-span-4 py-5 border-r border-white/10">AI分析建议</div>
                  <div className="col-span-4 py-5">真实对话还原</div>
               </div>
               <button 
                onClick={() => setShowDetail(false)}
                className="absolute right-4 p-2 hover:bg-white/10 rounded-full transition-colors z-10"
               >
                 <X size={20} />
               </button>
            </div>

            {/* Modal Content Row */}
            <div className="flex-1 overflow-y-auto bg-white dark:bg-slate-900">
               <div className="grid grid-cols-12 min-h-[450px]">
                  {/* Step Column (15% Approx) */}
                  <div className="col-span-2 p-6 flex flex-col items-center border-r border-gray-100 dark:border-slate-800 bg-gray-50/30 dark:bg-slate-800/50">
                     <div className="p-4 bg-indigo-100 dark:bg-indigo-900/30 rounded-2xl mb-4 text-indigo-600 dark:text-indigo-400 shadow-inner">
                        <Activity size={36} />
                     </div>
                     <span className="text-lg font-black text-gray-900 dark:text-white uppercase tracking-tight">需求分析</span>
                     <span className="mt-2 px-2 py-0.5 bg-indigo-50 dark:bg-indigo-900/40 text-[10px] text-indigo-600 dark:text-indigo-300 font-bold rounded">第1阶段</span>
                  </div>

                  {/* Element Column (20% Approx) */}
                  <div className="col-span-2 p-6 flex flex-col items-center justify-center border-r border-gray-100 dark:border-slate-800 text-center">
                     <div className="p-3 bg-rose-50 dark:bg-rose-900/20 rounded-full text-rose-500 mb-3">
                        <Heart size={28} fill="currentColor" fillOpacity={0.2} />
                     </div>
                     <h4 className="font-black text-gray-900 dark:text-white text-xl leading-tight">情感关系话术</h4>
                  </div>

                  {/* AI Suggestion Column (30% Approx) */}
                  <div className="col-span-4 p-8 border-r border-gray-100 dark:border-slate-800 space-y-5 bg-indigo-50/10">
                     <div className="flex items-center gap-2 mb-2">
                        <Sparkles size={18} className="text-amber-500" />
                        <span className="text-sm font-black text-indigo-900 dark:text-indigo-300 uppercase tracking-widest">AI 复盘诊断</span>
                     </div>
                     <div className="flex gap-4 p-4 bg-white dark:bg-slate-800 rounded-2xl border border-indigo-100 dark:border-indigo-900/30 shadow-sm transition-all hover:shadow-md">
                        <div className="w-8 h-8 rounded-full bg-indigo-600 text-white flex items-center justify-center text-xs font-black shrink-0 shadow-lg">1</div>
                        <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed font-medium">精准捕捉客户需求，根据意向等级调整话术重心，确保回应核心诉求。</p>
                     </div>
                     <div className="flex gap-4 p-4 bg-white dark:bg-slate-800 rounded-2xl border border-indigo-100 dark:border-indigo-900/30 shadow-sm transition-all hover:shadow-md">
                        <div className="w-8 h-8 rounded-full bg-indigo-600 text-white flex items-center justify-center text-xs font-black shrink-0 shadow-lg">2</div>
                        <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed font-medium">主动挖掘潜在需求，通过开放式提问引导客户表达更多用车场景。</p>
                     </div>
                     <div className="p-4 rounded-2xl bg-amber-50 dark:bg-amber-900/10 border border-amber-100 dark:border-amber-900/20">
                        <div className="flex items-center gap-2 mb-1">
                           <Info size={14} className="text-amber-600" />
                           <span className="text-xs font-bold text-amber-700 dark:text-amber-400">改进点</span>
                        </div>
                        <p className="text-xs text-amber-800 dark:text-amber-500 font-medium">建议在建立情感连接时增加对本地用车环境的共鸣话题。</p>
                     </div>
                  </div>

                  {/* Transcript Column (35% Approx) */}
                  <div className="col-span-4 p-6 space-y-6 overflow-y-auto custom-scrollbar max-h-[500px]">
                     <div className="space-y-6">
                        <div className="relative pl-6 border-l-2 border-primary-100 dark:border-primary-900/30">
                           <div className="absolute -left-1.5 top-0 w-2.5 h-2.5 rounded-full bg-primary-500"></div>
                           <span className="text-[10px] font-black text-primary-600 dark:text-primary-400 uppercase tracking-widest block mb-2 flex items-center gap-1">
                              <User size={10} /> 员工发言
                           </span>
                           <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed font-medium">
                              这个颜色，没有改好的没事。有改了一个。我看看现在还有不？应该有个绿色的，有个红色的，我一会儿带你看看吧。没事，你要改的话，我们不是那个啥，我们是那个天河汽车，然后我们的话是，集团旗下有沃尔沃、别克、雪佛兰、现代好多品牌，二十多个店。我们是集团旗下了合作了一个专门跟咱做定制内饰的这个合作店。你有一百多个颜色可以选择，白色、红色、蓝色、什么就是棕色，一百多个颜色可以选择。这儿这个 XT4有改好的，你看看。
                           </p>
                        </div>
                        
                        <div className="relative pl-6 border-l-2 border-indigo-200 dark:border-indigo-800 shadow-[inset_10px_0_15px_-10px_rgba(79,70,229,0.05)] bg-indigo-50/20 dark:bg-indigo-900/10 p-3 rounded-r-xl">
                           <span className="text-[10px] font-black text-indigo-600 dark:text-indigo-400 uppercase tracking-widest block mb-2 flex items-center gap-1">
                              <MessageSquare size={10} /> 客户反馈
                           </span>
                           <p className="text-sm text-gray-800 dark:text-gray-100 leading-relaxed font-black italic">
                              得加多少钱？这颜色不好看。
                           </p>
                        </div>

                        <div className="relative pl-6 border-l-2 border-primary-100 dark:border-primary-900/30">
                           <div className="absolute -left-1.5 top-0 w-2.5 h-2.5 rounded-full bg-primary-500"></div>
                           <span className="text-[10px] font-black text-primary-600 dark:text-primary-400 uppercase tracking-widest block mb-2 flex items-center gap-1">
                              <User size={10} /> 员工发言
                           </span>
                           <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed font-medium">
                              他上面说的是加5800，到时候看你要，能领啥的，都咱再商量呗。这玩意儿，只要是装具方面都好好商量，是吧？
                           </p>
                        </div>

                        <div className="relative pl-6 border-l-2 border-primary-100 dark:border-primary-900/30">
                           <div className="absolute -left-1.5 top-0 w-2.5 h-2.5 rounded-full bg-primary-500"></div>
                           <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed font-medium">
                              CT5改的棕色的少。这个XT4改了个棕色。CT5一般改那种红色的多一些，红色就是指的，它是黑色座椅，芯里给你改成红的，这种黑红拼色改双拼色的比较多一些，改的时候就会把。这个蒙饰板的也改掉。
                           </p>
                        </div>
                     </div>
                  </div>
               </div>
            </div>

            {/* Modal Footer */}
            <div className="p-5 bg-gray-50 dark:bg-slate-900 border-t border-gray-100 dark:border-slate-800 flex justify-between items-center px-8">
               <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1 text-xs text-gray-400">
                     <Clock size={14} /> 质检耗时: 1.2s
                  </div>
                  <div className="flex items-center gap-1 text-xs text-gray-400 border-l border-gray-200 dark:border-slate-700 pl-4">
                     <CheckCircle2 size={14} className="text-green-500" /> 规则匹配: 12条
                  </div>
               </div>
               <button 
                onClick={() => setShowDetail(false)}
                className="px-8 py-2.5 bg-primary-600 text-white rounded-xl font-black text-sm hover:bg-primary-700 transition-all shadow-xl shadow-primary-500/30 active:scale-[0.98] flex items-center gap-2"
               >
                 完成本次复盘评估 <ChevronRight size={18} />
               </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EmployeeCapability;
