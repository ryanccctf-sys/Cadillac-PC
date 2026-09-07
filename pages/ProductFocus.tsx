
import React, { useState } from 'react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  Cell,
  Legend
} from 'recharts';
import { 
  Box, 
  Filter, 
  Download, 
  TrendingUp, 
  Zap, 
  Sparkles,
  Lightbulb,
  ShieldCheck,
  Coins,
  CalendarClock,
  Repeat,
  FileCheck,
  Bot,
  BrainCircuit,
  ChevronRight,
  Target,
  BarChart2,
  AlertCircle,
  GanttChartSquare,
  Users,
  ClipboardCheck,
  Activity,
  Handshake,
  Car,
  Search,
  Quote,
  Star,
  CheckCircle2,
  Info
} from 'lucide-react';

const PRODUCT_FOCUS_DATA = [
  { id: 1, name: '驾控性能', count: 81 },
  { id: 2, name: '外观设计', count: 81 },
  { id: 3, name: '车辆安全性', count: 80 },
  { id: 4, name: '座椅舒适性/功能性', count: 80 },
  { id: 5, name: '车机系统/中控屏', count: 73 },
  { id: 6, name: '发动机性能', count: 73 },
  { id: 7, name: '变速器', count: 69 },
  { id: 8, name: '悬挂系统', count: 64 },
  { id: 10, name: '音响系统', count: 59 },
  { id: 11, name: '乘坐空间/轴距', count: 58 },
  { id: 12, name: '内饰设计', count: 49 },
  { id: 13, name: '保养周期标准', count: 48 },
  { id: 14, name: '刹车系统', count: 47 },
  { id: 15, name: '内/外后视镜配置', count: 46 },
  { id: 16, name: '智能科技', count: 45 },
  { id: 17, name: '轮胎规格', count: 43 },
  { id: 18, name: '漆面工艺/颜色', count: 41 },
  { id: 19, name: '灯光系统配置', count: 41 },
  { id: 20, name: '多种驾驶模式', count: 40 },
  { id: 21, name: '后备箱空间', count: 39 },
  { id: 22, name: '中控屏尺寸', count: 38 },
  { id: 23, name: '智能泊车', count: 38 },
  { id: 24, name: 'APP远程控制车辆', count: 30 },
  { id: 25, name: '续航里程', count: 26 },
  { id: 26, name: '导航', count: 23 },
];

const POLICY_FOCUS_DATA = [
  { id: 1, name: '新车价格', count: 159 },
  { id: 2, name: '交车周期', count: 43 },
  { id: 3, name: '售后服务', count: 42 },
  { id: 4, name: '品牌相关', count: 36 },
  { id: 5, name: '车辆保值率', count: 17 },
];

const MATCHING_DATA = [
  { rank: 1, category: '政策/权益类', focus: '售后服务', mentions: 42, responses: 15, rate: 36 },
  { rank: 2, category: '政策/权益类', focus: '车辆保值率', mentions: 17, responses: 7, rate: 41 },
  { rank: 3, category: '产品类', focus: '漆面工艺/颜色', mentions: 41, responses: 18, rate: 44 },
  { rank: 4, category: '产品类', focus: '保养周期标准', mentions: 48, responses: 23, rate: 48 },
  { rank: 5, category: '产品类', focus: '后备箱空间', mentions: 39, responses: 20, rate: 51 },
  { rank: 6, category: '产品类', focus: '车辆安全性', mentions: 80, responses: 42, rate: 53 },
  { rank: 7, category: '产品类', focus: '智能泊车', mentions: 38, responses: 21, rate: 55 },
  { rank: 8, category: '产品类', focus: '驾控性能', mentions: 81, responses: 45, rate: 56 },
  { rank: 9, category: '产品类', focus: '车机系统/中控屏', mentions: 73, responses: 43, rate: 59 },
  { rank: 10, category: '产品类', focus: '轮胎规格', mentions: 43, responses: 26, rate: 60 },
];

const SALES_MODEL_DATA = [
  {
    phase: "需求分析",
    icon: Search,
    items: [
      {
        element: "1. 情感关系话术",
        case: "我这人也比较实在，看你也是个直来直去的人，咱们就打开天窗说亮话。我跟你说实话，我主要是担心别人套路你，比如有些商家说“3000抵6000”，听着像是能减6000，可这里面的3000其实也是你自己先交的钱，他们往往不会把这点说清楚。",
        highlights: ["沟通方式", "防范促销套路", "增强客户信任"]
      }
    ]
  },
  {
    phase: "产品介绍",
    icon: Car,
    items: [
      {
        element: "2. 竞品对比话术",
        case: "其实和林肯的一些车型相比，这款车本身也是好车。不过在品牌方面，林肯的门店确实越来越少了。这样一来，您日后用车时，在保养等售后方面可能会有一些不便。目前林肯在河南省只剩下三家门店，保有量比较低，不过我们这边的售后在4天之内应该能处理好。",
        highlights: ["竞品劣势", "自身优势", "引导便利性"]
      },
      {
        element: "3. 空间异议处理",
        case: "我们有个同事身高1米9多，他平时开CT5完全没问题，不会碰头。而且这车第二排空间宽敞，开着也很顺手。",
        highlights: ["客户体验", "消除空间顾虑", "提升认可度"]
      },
      {
        element: "4. 配置差异对比",
        case: "它和XT6的区别在于内饰经过了更新，配备了33英寸9K分辨率的大连屏。XT5这款车的座椅和内饰也是刚刚更新的，并且搭载了9AT变速箱。CT6比A6长十几公分，内部更舒适，全铝车身。而A6现在用料削减了不少。",
        highlights: ["产品对比", "达成效果", "实战原话"]
      }
    ]
  },
  {
    phase: "试乘试驾",
    icon: Activity,
    items: [
      {
        element: "5. 试驾体验话术",
        case: "这款车的操控调校偏运动风格。相比CT6，它的操控感更为出色，油门响应更为灵敏，整体调校更具运动特质。其百公里制动距离仅33米，性能远超同级别车型。尽管车身较长，但驾驶起来丝毫不像开大火车那样的笨重感。",
        highlights: ["操控调校", "制动性能", "灵活驾驶"]
      }
    ]
  },
  {
    phase: "成交谈判",
    icon: Handshake,
    items: [
      {
        element: "6. 定金锁定策略",
        case: "反正我能给您送两次保养，另外我看看能不能再为您申请一些车上用品，比如脚垫、行李箱或者小熊之类的。如果您走员工价的话，就是5980元。那款车衣确实不错，是目前最好的车衣了。",
        highlights: ["礼包赠送", "员工价优惠", "高价值周边"]
      },
      {
        element: "7. 价格底线坦诚",
        case: "帅哥，我是这么想的，你想买车，我想卖车，咱们的目标是一致的。只要你确定能定下来，我就去找领导申请，不管需要几天我都会去申请。我专门给你发微信是因为领导说了，这两天冲销量，价格方面好商量。",
        highlights: ["目标一致", "领导申请", "销量冲刺"]
      },
      {
        element: "8. 售后权益前置",
        case: "这个1888元的权益包含以下内容：若车辆单次出险损失超过车价的30%，可更换新车；其次，包含第二年、第三年各200万限额的第三者责任险；第二年可享受半价保养服务；在2到5年内，如更换其他车型，可额外获得1万元补贴。",
        highlights: ["高残值保障", "保险礼遇", "置换补贴"]
      },
      {
        element: "9. 现车紧缺施压",
        case: "我刚帮您查询了库存情况，目前黑色款还剩两台，白色款只有一台。您看现在已经快到年底，如果现在从厂家订车的话，年前肯定是到不了货的。接下来这十几天就只有这三台车了。如果您再拖延的话，到最后可能就没车了。",
        highlights: ["现车库存", "物流周期", "紧迫感营造"]
      },
      {
        element: "10. 赠品价值说明",
        case: "我建议您现在就在抖音上下单把这个产品先拍下。因为今天是活动最后一天了。这张票上明确写着免预约，随时可退，过期也能退。要是咱们谈妥了，您年前能提到车，就可以随时使用了。",
        highlights: ["限时锁定", "零风险决策", "便利性强调"]
      }
    ]
  }
];

const ProductFocus: React.FC = () => {
  const [aiResultsReturned, setAiResultsReturned] = useState<boolean>(true);
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  return (
    <div className="space-y-12 animate-fade-in pb-20">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white flex items-center gap-3">
            <div className="p-2 bg-primary-600 text-white rounded-xl shadow-lg">
              <Box size={24} />
            </div>
            本品关注分析
          </h2>
          <p className="text-sm text-gray-500 mt-2">基于会话 AI 自动识别的到店客户对本品产品力与权益的关注偏好分析</p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-5 py-2.5 bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl text-sm font-bold hover:bg-gray-50 transition-all shadow-sm">
            <Filter size={16} /> 筛选
          </button>
          <button className="flex items-center gap-2 px-5 py-2.5 bg-primary-600 text-white rounded-xl text-sm font-bold hover:bg-primary-700 transition-all shadow-lg">
            <Download size={16} /> 导出报表
          </button>
        </div>
      </div>

      {/* 第一部分：产品力关注点 */}
      <div className="space-y-6">
        <div className="flex items-center gap-2 border-l-4 border-primary-500 pl-3">
          <h3 className="text-xl font-bold text-gray-800 dark:text-white">客户关注点 - 产品侧</h3>
        </div>
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          <div className="bg-white dark:bg-slate-800 rounded-3xl shadow-lg border border-gray-100 dark:border-slate-700 overflow-hidden flex flex-col">
            <div className="p-6 border-b border-gray-50 dark:border-slate-700 flex justify-between items-center bg-gray-50/30">
              <h3 className="text-lg font-bold text-gray-800 dark:text-white flex items-center gap-2">
                <Zap size={18} className="text-primary-500" /> 产品关注排名
              </h3>
              <span className="text-xs text-gray-400 font-medium">共 26 个维度</span>
            </div>
            <div className="flex-1 overflow-auto max-h-[500px] custom-scrollbar">
              <table className="w-full text-left border-collapse">
                <thead className="sticky top-0 z-10">
                  <tr className="bg-primary-600 text-white shadow-md">
                    <th className="px-6 py-4 text-sm font-bold text-center w-20">序号</th>
                    <th className="px-6 py-4 text-sm font-bold">客户关注点-产品</th>
                    <th className="px-6 py-4 text-sm font-bold text-center w-32">提及数</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50 dark:divide-slate-700 text-sm">
                  {PRODUCT_FOCUS_DATA.map((item, index) => (
                    <tr key={item.id} className="hover:bg-primary-50/30 dark:hover:bg-slate-700/30 transition-colors group">
                      <td className="px-6 py-3.5 text-gray-500 dark:text-gray-400 text-center font-medium group-hover:text-primary-600">{index + 1}</td>
                      <td className="px-6 py-3.5 font-bold text-gray-800 dark:text-gray-100 group-hover:text-primary-600">{item.name}</td>
                      <td className="px-6 py-3.5 text-center font-bold text-primary-600">{item.count}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div className="bg-white dark:bg-slate-800 rounded-3xl shadow-lg border border-gray-100 dark:border-slate-700 p-8 flex flex-col h-full">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
                <TrendingUp size={20} className="text-primary-500" /> 维度提及热度
              </h3>
              <div className="p-2 bg-indigo-50 dark:bg-indigo-900/20 rounded-lg text-indigo-600 dark:text-indigo-400">
                <Sparkles size={18} />
              </div>
            </div>
            <div className="flex-1 min-h-[400px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={PRODUCT_FOCUS_DATA} layout="vertical" margin={{ left: 40, right: 60 }}>
                  <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#e2e8f0" opacity={0.5} />
                  <XAxis type="number" hide />
                  <YAxis dataKey="name" type="category" width={140} axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12, fontWeight: 500 }} />
                  <Tooltip cursor={{ fill: 'rgba(99, 102, 241, 0.05)' }} contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }} />
                  <Bar dataKey="count" fill="#4f46e5" radius={[0, 4, 4, 0]} barSize={18}>
                    {PRODUCT_FOCUS_DATA.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={index < 5 ? '#4f46e5' : '#818cf8'} fillOpacity={1 - (index * 0.02)} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>

      {/* 第二部分：政策/权益关注点 */}
      <div className="space-y-6">
        <div className="flex items-center gap-2 border-l-4 border-indigo-500 pl-3">
          <h3 className="text-xl font-bold text-gray-800 dark:text-white">客户关注点 - 政策/权益侧</h3>
        </div>
        <div className="bg-gradient-to-br from-indigo-50 to-white dark:from-slate-800 dark:to-slate-900 p-8 rounded-[2.5rem] shadow-xl border border-indigo-100 dark:border-slate-700 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-10 pointer-events-none">
            <BrainCircuit size={140} className="text-indigo-600" />
          </div>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 relative z-10">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-indigo-600 text-white rounded-2xl shadow-xl">
                <Bot size={28} />
              </div>
              <div>
                <h4 className="text-2xl font-extrabold text-indigo-900 dark:text-indigo-400 tracking-tight">AI 深度洞察与业务建议</h4>
                <p className="text-[11px] text-gray-500 mt-0.5">利用到店微观语音和多维度情感诉求自动提炼关键策略</p>
              </div>
            </div>
            
            {/* Interactive Simulation Switcher */}
            <div className="flex bg-indigo-100/60 dark:bg-slate-800 p-0.5 rounded-xl border border-indigo-200/40 dark:border-slate-700 text-[10px] font-medium self-end sm:self-center">
              <button
                onClick={() => setAiResultsReturned(true)}
                className={`px-2.5 py-1 rounded-lg transition-all ${
                  aiResultsReturned
                    ? 'bg-indigo-600 text-white shadow-xs font-bold'
                    : 'text-gray-500 hover:text-indigo-600'
                }`}
              >
                有分析结果
              </button>
              <button
                onClick={() => {
                  setAiResultsReturned(false);
                  setIsGenerating(false);
                }}
                className={`px-2.5 py-1 rounded-lg transition-all ${
                  !aiResultsReturned
                    ? 'bg-indigo-600 text-white shadow-xs font-bold'
                    : 'text-gray-500 hover:text-indigo-600'
                }`}
              >
                暂无分析结果
              </button>
            </div>
          </div>
          
          <div className="relative z-10">
            {!aiResultsReturned ? (
              <div className="bg-white/80 dark:bg-slate-800/80 rounded-[2rem] p-12 border border-dashed border-gray-200 dark:border-slate-700 flex flex-col items-center justify-center text-center max-w-2xl mx-auto space-y-4 shadow-sm transition-all duration-300">
                <div className="w-16 h-16 rounded-full bg-slate-50 dark:bg-slate-750 flex items-center justify-center text-slate-400 dark:text-slate-500">
                  <Bot size={32} />
                </div>
                <div className="space-y-1.5">
                  <h5 className="text-base font-bold text-gray-800 dark:text-white">暂无 AI 智能洞察结果</h5>
                  <p className="text-xs text-gray-400 dark:text-gray-500 leading-relaxed max-w-md mx-auto">
                    当前筛选条件下的有效数据样本不足以支持深度洞察生成。随着后续数据的积累，系统将会自动进行多维度的智能分析与商业策略提炼。
                  </p>
                </div>
              </div>
            ) : (
              <div className="space-y-8 animate-fade-in">
                <div className="text-lg font-bold text-indigo-800 dark:text-indigo-300 leading-relaxed bg-white/80 dark:bg-slate-700/50 p-6 rounded-[2rem] border border-indigo-200/50 dark:border-slate-600 shadow-sm flex items-start gap-4">
                  <Lightbulb className="text-yellow-500 shrink-0 mt-1" size={24} />
                  <p>聚焦价格透明（诉求落地价清晰），建议推行一键算价工具；关注交付确定性（诉求周期明确），建议强化可视化承诺；重视服务可感度（诉求权益量化），建议标配电子手册与专属通道。</p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                  {[
                    { icon: Coins, text: "价格构成与优惠透明度：追求“真实落地价”，厌恶隐性成本，例如：主动核算抖音券、区补、车价减免等叠加效果。", color: "text-amber-500", bg: "bg-amber-50" },
                    { icon: Target, text: "预算与决策：价格敏感度高，预算即为决策红线，例如：全款偏好显著（金额服务费、利息敏感度较高）；对“价格跌破20万”高度关注。", color: "text-red-500", bg: "bg-red-50" },
                    { icon: CalendarClock, text: "交付效率：强烈关注“年前能否提车”，建议通过交付管理系统展示实时进度，增强客户确定感。", color: "text-blue-500", bg: "bg-blue-50" },
                    { icon: FileCheck, text: "服务权益与沟通效率：售后价值需“可量化、易兑现”，明确询问保养次数、维修清单、保险地域限制等细节。", color: "text-emerald-500", bg: "bg-emerald-50" },
                    { icon: Repeat, text: "车辆保值率：旧车评估价格的维度，想了解具体车辆的 3~5 年评估价值，可引入第三方评估报告。", color: "text-indigo-500", bg: "bg-indigo-50" }
                  ].map((item, i) => (
                    <div key={i} className="flex gap-4 p-5 bg-white dark:bg-slate-800 rounded-[1.5rem] shadow-sm border border-gray-100 dark:border-slate-700 hover:shadow-md transition-all group">
                      <div className={`mt-1 flex-shrink-0 p-2 rounded-xl bg-gray-50 dark:bg-slate-700 group-hover:scale-110 transition-transform ${item.color}`}>
                        <item.icon size={20} />
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed font-medium">{item.text}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
          <div className="xl:col-span-5 bg-white dark:bg-slate-800 rounded-3xl shadow-lg border border-gray-100 dark:border-slate-700 overflow-hidden flex flex-col">
            <div className="p-6 border-b border-gray-50 dark:border-slate-700 bg-indigo-50/30">
              <h4 className="font-bold text-indigo-900 dark:text-indigo-400 flex items-center gap-2">
                <ShieldCheck size={18} /> 政策/权益 提及排行
              </h4>
            </div>
            <div className="flex-1 overflow-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-indigo-600 text-white">
                    <th className="px-6 py-4 text-sm font-bold text-center w-20">序号</th>
                    <th className="px-6 py-4 text-sm font-bold">客户关注点-政策/权益</th>
                    <th className="px-6 py-4 text-sm font-bold text-center w-24">提及数</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50 dark:divide-slate-700 text-sm">
                  {POLICY_FOCUS_DATA.map((item, index) => (
                    <tr key={item.id} className="hover:bg-indigo-50/50 dark:hover:bg-slate-700/50 transition-colors group">
                      <td className="px-6 py-4 text-gray-500 dark:text-gray-400 text-center font-medium group-hover:text-indigo-600">{index + 1}</td>
                      <td className="px-6 py-4 font-bold text-gray-800 dark:text-gray-100 group-hover:text-indigo-600">{item.name}</td>
                      <td className="px-6 py-4 text-center font-bold text-indigo-600">{item.count}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="p-6 border-t border-gray-50 dark:border-slate-700">
              <button className="text-sm font-bold text-indigo-600 hover:text-indigo-700 flex items-center justify-center gap-2 w-full py-3 rounded-2xl bg-indigo-50 dark:bg-indigo-900/20 transition-all active:scale-[0.98]">
                查看更多细节分析 <ChevronRight size={16} />
              </button>
            </div>
          </div>

          <div className="xl:col-span-7 bg-white dark:bg-slate-800 rounded-3xl shadow-lg border border-gray-100 dark:border-slate-700 p-8 flex flex-col min-h-[400px]">
             <div className="flex items-center justify-between mb-8">
               <h4 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
                 <BarChart2 className="text-indigo-500" size={20} /> 权益维度热度分布
               </h4>
               <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Mention Volume</span>
             </div>
             <div className="flex-1 w-full">
               <ResponsiveContainer width="100%" height="100%">
                 <BarChart data={POLICY_FOCUS_DATA} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                   <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                   <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12, fontWeight: 600 }} />
                   <YAxis axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 11 }} />
                   <Tooltip 
                     cursor={{ fill: 'rgba(79, 70, 229, 0.05)' }} 
                     contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 25px rgba(0,0,0,0.1)' }} 
                   />
                   <Bar dataKey="count" radius={[12, 12, 0, 0]} barSize={45}>
                      {POLICY_FOCUS_DATA.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={index === 0 ? '#4f46e5' : '#818cf8'} />
                      ))}
                   </Bar>
                 </BarChart>
               </ResponsiveContainer>
             </div>
          </div>
        </div>
      </div>

      {/* 第三部分：客户需求与产品价值匹配 */}
      <div className="space-y-6">
        <div className="flex items-center gap-2 border-l-4 border-primary-600 pl-3">
          <h3 className="text-xl font-bold text-gray-800 dark:text-white">客户需求与产品价值匹配</h3>
        </div>

        {/* AI小结面板 */}
        <div className="bg-gradient-to-br from-primary-50 to-white dark:from-slate-800 dark:to-slate-900 p-8 rounded-[2.5rem] shadow-xl border border-primary-100 dark:border-slate-700 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none rotate-12">
            <ClipboardCheck size={140} className="text-primary-600" />
          </div>
          <div className="flex items-center gap-4 mb-8 relative z-10">
            <div className="p-3 bg-primary-600 text-white rounded-2xl shadow-xl">
              <Sparkles size={28} />
            </div>
            <h4 className="text-2xl font-extrabold text-primary-900 dark:text-primary-400 tracking-tight">AI 价值匹配诊断</h4>
          </div>
          <div className="relative z-10 space-y-6">
            <div className="text-lg font-bold text-primary-800 dark:text-primary-300 leading-relaxed bg-white/60 dark:bg-slate-700/50 p-6 rounded-[2rem] border border-primary-200/50 dark:border-slate-600 shadow-sm">
              <p>当前数据反应销售顾问在应对客户关注点方面有明显的缺失，提升空间较大。</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex gap-5 p-6 bg-white dark:bg-slate-800 rounded-[2rem] shadow-sm border border-primary-100 dark:border-slate-700 hover:shadow-md transition-all group">
                <div className="p-3 bg-primary-50 dark:bg-primary-900/30 rounded-2xl text-primary-600 group-hover:scale-110 transition-transform"><Users size={24} /></div>
                <div>
                   <h5 className="font-bold text-primary-900 dark:text-primary-300 mb-2 text-base">1. 加强需求倾听</h5>
                   <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">需加强销售顾问对客户需求的理解，倾听客户的使用场景、竞品对比的关注点等，避免盲目推介。</p>
                </div>
              </div>
              <div className="flex gap-5 p-6 bg-white dark:bg-slate-800 rounded-[2rem] shadow-sm border border-primary-100 dark:border-slate-700 hover:shadow-md transition-all group">
                <div className="p-3 bg-primary-50 dark:bg-primary-900/30 rounded-2xl text-primary-600 group-hover:scale-110 transition-transform"><Lightbulb size={24} /></div>
                <div>
                   <h5 className="font-bold text-primary-900 dark:text-primary-300 mb-2 text-base">2. 整理应对话术</h5>
                   <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">门店管理层及内训师应定期整理客户关注点的应对话术，形成场景应对话术卡片，并加强角色演练。</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 匹配差异数据看板 */}
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
          {/* TOP 10 Table */}
          <div className="xl:col-span-7 bg-white dark:bg-slate-800 rounded-[2rem] shadow-lg border border-gray-100 dark:border-slate-700 overflow-hidden flex flex-col">
            <div className="p-6 border-b border-gray-50 dark:border-slate-700 bg-primary-50/30 flex justify-between items-center">
              <h4 className="font-bold text-primary-900 dark:text-primary-400 flex items-center gap-3 text-lg">
                <GanttChartSquare size={22} /> 匹配差异 TOP 10 排名
              </h4>
              <span className="text-[10px] font-black text-primary-300 uppercase tracking-[0.2em]">GAP RANKING</span>
            </div>
            <div className="overflow-x-auto flex-1">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-primary-600 text-white text-xs uppercase tracking-wider">
                    <th className="px-5 py-4 font-bold text-center">排名</th>
                    <th className="px-5 py-4 font-bold">类别</th>
                    <th className="px-5 py-4 font-bold">客户关注点</th>
                    <th className="px-5 py-4 font-bold text-center">客户提及</th>
                    <th className="px-5 py-4 font-bold text-center">销售应对</th>
                    <th className="px-5 py-4 font-bold text-center">匹配度</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50 dark:divide-slate-700 text-sm">
                  {MATCHING_DATA.map((item, index) => (
                    <tr key={index} className="hover:bg-primary-50/40 dark:hover:bg-slate-700/40 transition-colors group">
                      <td className="px-5 py-4 text-gray-400 dark:text-gray-500 text-center font-black italic">{item.rank}</td>
                      <td className="px-5 py-4">
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                          item.category === '产品类' ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/40' : 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/40'
                        }`}>
                          {item.category}
                        </span>
                      </td>
                      <td className="px-5 py-4 font-bold text-gray-800 dark:text-gray-100 group-hover:text-primary-600 transition-colors">{item.focus}</td>
                      <td className="px-5 py-4 text-center font-mono font-bold text-gray-500">{item.mentions}</td>
                      <td className="px-5 py-4 text-center font-mono font-bold text-primary-600">{item.responses}</td>
                      <td className="px-5 py-4 text-center">
                         <div className="flex items-center justify-center gap-3">
                           <div className="w-16 h-2 bg-gray-100 dark:bg-slate-700 rounded-full overflow-hidden hidden md:block">
                             <div 
                               className={`h-full rounded-full shadow-[0_0_8px_rgba(79,70,229,0.3)] ${item.rate < 45 ? 'bg-red-500' : item.rate < 55 ? 'bg-orange-500' : 'bg-primary-500'}`} 
                               style={{ width: `${item.rate}%` }}
                             ></div>
                           </div>
                           <span className={`font-mono font-black text-base ${item.rate < 45 ? 'text-red-500' : 'text-primary-600'}`}>{item.rate}%</span>
                         </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Visual Bar Chart Comparison */}
          <div className="xl:col-span-5 bg-white dark:bg-slate-800 rounded-[2rem] shadow-lg border border-gray-100 dark:border-slate-700 p-8 flex flex-col">
            <div className="flex items-center justify-between mb-10">
              <h4 className="text-xl font-black text-gray-900 dark:text-white flex items-center gap-3">
                 <Activity className="text-primary-500" size={24} /> 提及 vs 应对 缺口分析
              </h4>
            </div>
            <div className="flex-1 w-full min-h-[420px]">
               <ResponsiveContainer width="100%" height="100%">
                 <BarChart data={MATCHING_DATA} layout="vertical" margin={{ left: 20, right: 30 }}>
                    <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#f1f5f9" />
                    <XAxis type="number" hide />
                    <YAxis dataKey="focus" type="category" width={85} axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 11, fontWeight: 700 }} />
                    <Tooltip 
                      cursor={{ fill: 'rgba(79, 70, 229, 0.03)' }} 
                      contentStyle={{ borderRadius: '20px', border: 'none', boxShadow: '0 15px 35px rgba(0,0,0,0.1)' }} 
                    />
                    <Legend verticalAlign="top" align="right" height={40} iconType="circle" wrapperStyle={{ fontSize: '13px', fontWeight: 700, paddingBottom: '20px' }} />
                    <Bar dataKey="mentions" name="客户提及" fill="#cbd5e1" radius={[0, 6, 6, 0]} barSize={14} />
                    <Bar dataKey="responses" name="销售应对" fill="#4f46e5" radius={[0, 6, 6, 0]} barSize={14} />
                 </BarChart>
               </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>

      {/* 第四部分：成交要素模型及优秀案例 (结构化重构版) */}
      <div className="space-y-6">
        <div className="flex items-center gap-2 border-l-4 border-indigo-600 pl-3">
          <h3 className="text-xl font-bold text-gray-800 dark:text-white">成交要素模型及优秀案例</h3>
        </div>

        <div className="bg-white dark:bg-slate-800 rounded-[2.5rem] shadow-xl border border-gray-100 dark:border-slate-700 overflow-hidden">
           {/* Table Header */}
           <div className="grid grid-cols-12 bg-indigo-600 text-white font-bold text-sm uppercase tracking-wider">
              <div className="col-span-2 px-6 py-5 border-r border-indigo-500 flex items-center justify-center">环节</div>
              <div className="col-span-2 px-6 py-5 border-r border-indigo-500 flex items-center">要素</div>
              <div className="col-span-5 px-6 py-5 border-r border-indigo-500 flex items-center">优秀案例</div>
              <div className="col-span-3 px-6 py-5 flex items-center">特点提炼</div>
           </div>

           {/* Table Content */}
           <div className="divide-y divide-gray-100 dark:divide-slate-700">
              {SALES_MODEL_DATA.map((section, sIdx) => (
                <div key={sIdx} className="grid grid-cols-12 group">
                   {/* Phase Column */}
                   <div className="col-span-2 px-6 py-8 border-r border-gray-50 dark:border-slate-700 bg-indigo-50/20 dark:bg-slate-800 flex flex-col items-center justify-center text-center">
                      <div className="p-3 bg-white dark:bg-slate-700 rounded-2xl shadow-sm text-indigo-600 mb-3 border border-indigo-100 dark:border-slate-600">
                        <section.icon size={24} />
                      </div>
                      <span className="font-black text-indigo-900 dark:text-indigo-300 text-lg uppercase leading-tight">{section.phase}</span>
                   </div>

                   {/* Elements Column */}
                   <div className="col-span-10 divide-y divide-gray-50 dark:divide-slate-700">
                      {section.items.map((item, iIdx) => (
                        <div key={iIdx} className="grid grid-cols-10 hover:bg-indigo-50/10 dark:hover:bg-indigo-900/5 transition-colors">
                           {/* Element */}
                           <div className="col-span-2 px-6 py-6 border-r border-gray-50 dark:border-slate-700 flex items-center">
                              <h5 className="font-bold text-gray-900 dark:text-white text-sm leading-tight">{item.element}</h5>
                           </div>
                           
                           {/* Case */}
                           <div className="col-span-5 px-8 py-6 border-r border-gray-50 dark:border-slate-700 relative">
                              <Quote size={32} className="absolute left-2 top-4 text-indigo-100 dark:text-indigo-900/50 pointer-events-none" fill="currentColor" />
                              <div className="bg-gray-50 dark:bg-slate-700/40 p-4 rounded-2xl border border-gray-100 dark:border-slate-600 text-sm text-gray-700 dark:text-gray-300 leading-relaxed italic relative z-10">
                                 {item.case}
                              </div>
                           </div>

                           {/* Highlights */}
                           <div className="col-span-3 px-6 py-6 flex flex-wrap gap-2 content-center">
                              {item.highlights.map((tag, tIdx) => (
                                 <span key={tIdx} className="inline-flex items-center gap-1 px-3 py-1.5 bg-white dark:bg-slate-900 border border-indigo-100 dark:border-indigo-800 text-indigo-700 dark:text-indigo-300 rounded-full text-[11px] font-bold shadow-sm whitespace-nowrap">
                                    <div className="w-1.5 h-1.5 rounded-full bg-indigo-500"></div>
                                    {tag}
                                 </span>
                              ))}
                           </div>
                        </div>
                      ))}
                   </div>
                </div>
              ))}
           </div>
        </div>

        {/* Global Summary Note */}
        <div className="bg-gradient-to-r from-indigo-900 to-primary-800 text-white p-8 rounded-[2.5rem] shadow-2xl relative overflow-hidden flex flex-col md:flex-row items-center gap-8">
           <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_top_right,rgba(99,102,241,0.2),transparent)]"></div>
           <div className="relative z-10 p-5 bg-white/10 rounded-3xl backdrop-blur-md border border-white/20 shrink-0 shadow-lg">
              <Star size={40} className="text-yellow-400 fill-yellow-400" />
           </div>
           <div className="relative z-10 space-y-2">
              <h4 className="text-2xl font-black italic tracking-wider flex items-center gap-3">
                成交要素模型：基于销冠心智的闭环提炼 <Info size={18} className="text-indigo-300" />
              </h4>
              <p className="text-indigo-100 text-sm leading-relaxed max-w-4xl">
                该模型不仅提供了标准化的话术参考，更重要的是从“建立信任、差异化对比、体验升维、压力测试、风险消除”五个维度构建了完整的博弈路径。通过不断的角色扮演（Roleplay）将“话术”内化为“直觉”，是提升门店整体转化能力的核心资产。
              </p>
           </div>
        </div>
      </div>
    </div>
  );
};

export default ProductFocus;
