import React from 'react';
import { 
  Users,
  TrendingUp,
  ArrowUpRight,
  UserPlus,
  UserCheck,
  ListFilter,
  Download,
  Search,
  Calendar as CalendarIcon,
  CheckCircle2,
  Clock,
  Car,
  MessageSquare,
  Percent,
  X,
  XCircle,
  Target,
  Award,
  Globe,
  MessageCircle,
  Sparkles,
  Bot,
  ChevronRight,
  Send,
  MapPin,
  Mic,
  Handshake,
  Store,
  HelpCircle,
  Info,
  AlertCircle,
  ClipboardList,
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  ResponsiveContainer,
  CartesianGrid,
  Cell
} from 'recharts';

const trafficTrendData = [
  { date: '03-20', firstTime: 30, secondTime: 15, total: 45 },
  { date: '03-21', firstTime: 35, secondTime: 17, total: 52 },
  { date: '03-22', firstTime: 32, secondTime: 16, total: 48 },
  { date: '03-23', firstTime: 40, secondTime: 21, total: 61 },
  { date: '03-24', firstTime: 38, secondTime: 17, total: 55 },
  { date: '03-25', firstTime: 45, secondTime: 22, total: 67 },
  { date: '03-26', firstTime: 48, secondTime: 24, total: 72 },
];

const weeklyTrendData = [
  { date: 'W11', firstTime: 210, secondTime: 105, total: 315 },
  { date: 'W12', firstTime: 245, secondTime: 119, total: 364 },
  { date: 'W13', firstTime: 224, secondTime: 112, total: 336 },
  { date: 'W14', firstTime: 280, secondTime: 147, total: 427 },
  { date: 'W15', firstTime: 266, secondTime: 119, total: 385 },
  { date: 'W16', firstTime: 315, secondTime: 154, total: 469 },
  { date: 'W17', firstTime: 336, secondTime: 168, total: 504 },
];

const monthlyTrendData = [
  { date: '09月', firstTime: 900, secondTime: 450, total: 1350 },
  { date: '10月', firstTime: 1050, secondTime: 510, total: 1560 },
  { date: '11月', firstTime: 960, secondTime: 480, total: 1440 },
  { date: '12月', firstTime: 1200, secondTime: 630, total: 1830 },
  { date: '01月', firstTime: 1140, secondTime: 510, total: 1650 },
  { date: '02月', firstTime: 1350, secondTime: 660, total: 2010 },
  { date: '03月', firstTime: 1440, secondTime: 720, total: 2160 },
];

const employeeReceptionData = [
  {
    date: '2026-03-27',
    region: '华东大区',
    district: '上海小区',
    code: 'EMP001',
    name: '张三',
    storeName: '上海徐汇店',
    carModel: '全新CT5',
    switchCount: 12,
    effectiveDuration: 145,
    totalTraffic: 15,
    firstTimeTraffic: 10,
    firstTimeRecording: 120,
    secondTimeTraffic: 5,
    secondTimeRecording: 85,
    totalTestDrive: 6,
    effectiveTestDrive: 5,
    rideDriveCount: 4,
    homeTestDrive: 2,
    homeRecording: 45,
    negotiations: 3,
    deliveries: 1,
    followUpDuration: 90
  },
  {
    date: '2026-03-27',
    region: '华东大区',
    district: '上海小区',
    code: 'EMP002',
    name: '李四',
    storeName: '上海徐汇店',
    carModel: '全新XT5',
    switchCount: 8,
    effectiveDuration: 98,
    totalTraffic: 12,
    firstTimeTraffic: 8,
    firstTimeRecording: 95,
    secondTimeTraffic: 4,
    secondTimeRecording: 60,
    totalTestDrive: 4,
    effectiveTestDrive: 4,
    rideDriveCount: 3,
    homeTestDrive: 1,
    homeRecording: 30,
    negotiations: 2,
    deliveries: 0,
    followUpDuration: 45
  },
  {
    date: '2026-03-27',
    region: '华东大区',
    district: '上海小区',
    code: 'EMP003',
    name: '王五',
    storeName: '上海徐汇店',
    carModel: 'IQ锐歌',
    switchCount: 15,
    effectiveDuration: 180,
    totalTraffic: 20,
    firstTimeTraffic: 14,
    firstTimeRecording: 160,
    secondTimeTraffic: 6,
    secondTimeRecording: 110,
    totalTestDrive: 8,
    effectiveTestDrive: 7,
    rideDriveCount: 5,
    homeTestDrive: 3,
    homeRecording: 75,
    negotiations: 5,
    deliveries: 2,
    followUpDuration: 120
  },
  {
    date: '2026-03-27',
    region: '华东大区',
    district: '上海小区',
    code: 'EMP004',
    name: '赵六',
    storeName: '上海徐汇店',
    carModel: '全新CT6',
    switchCount: 10,
    effectiveDuration: 110,
    totalTraffic: 14,
    firstTimeTraffic: 9,
    firstTimeRecording: 100,
    secondTimeTraffic: 5,
    secondTimeRecording: 70,
    totalTestDrive: 5,
    effectiveTestDrive: 4,
    rideDriveCount: 3,
    homeTestDrive: 1,
    homeRecording: 40,
    negotiations: 2,
    deliveries: 1,
    followUpDuration: 60
  },
  {
    date: '2026-03-27',
    region: '华东大区',
    district: '上海小区',
    code: 'EMP005',
    name: '孙七',
    storeName: '上海徐汇店',
    carModel: '全新XT6',
    switchCount: 14,
    effectiveDuration: 160,
    totalTraffic: 18,
    firstTimeTraffic: 12,
    firstTimeRecording: 140,
    secondTimeTraffic: 6,
    secondTimeRecording: 90,
    totalTestDrive: 7,
    effectiveTestDrive: 6,
    rideDriveCount: 4,
    homeTestDrive: 2,
    homeRecording: 50,
    negotiations: 4,
    deliveries: 1,
    followUpDuration: 100
  },
  {
    date: '2026-03-27',
    region: '华东大区',
    district: '上海小区',
    code: 'EMP006',
    name: '周八',
    storeName: '上海徐汇店',
    carModel: '全新CT5',
    switchCount: 9,
    effectiveDuration: 105,
    totalTraffic: 13,
    firstTimeTraffic: 9,
    firstTimeRecording: 95,
    secondTimeTraffic: 4,
    secondTimeRecording: 65,
    totalTestDrive: 4,
    effectiveTestDrive: 4,
    rideDriveCount: 2,
    homeTestDrive: 1,
    homeRecording: 35,
    negotiations: 2,
    deliveries: 0,
    followUpDuration: 55
  },
  {
    date: '2026-03-27',
    region: '华东大区',
    district: '上海小区',
    code: 'EMP007',
    name: '吴九',
    storeName: '上海徐汇店',
    carModel: '全新XT5',
    switchCount: 11,
    effectiveDuration: 130,
    totalTraffic: 16,
    firstTimeTraffic: 11,
    firstTimeRecording: 115,
    secondTimeTraffic: 5,
    secondTimeRecording: 75,
    totalTestDrive: 6,
    effectiveTestDrive: 5,
    rideDriveCount: 3,
    homeTestDrive: 2,
    homeRecording: 45,
    negotiations: 3,
    deliveries: 1,
    followUpDuration: 80
  },
  {
    date: '2026-03-27',
    region: '华东大区',
    district: '上海小区',
    code: 'EMP008',
    name: '郑十',
    storeName: '上海徐汇店',
    carModel: 'IQ锐歌',
    switchCount: 13,
    effectiveDuration: 150,
    totalTraffic: 17,
    firstTimeTraffic: 12,
    firstTimeRecording: 130,
    secondTimeTraffic: 5,
    secondTimeRecording: 80,
    totalTestDrive: 7,
    effectiveTestDrive: 6,
    rideDriveCount: 4,
    homeTestDrive: 2,
    homeRecording: 55,
    negotiations: 4,
    deliveries: 1,
    followUpDuration: 95
  },
  {
    date: '2026-03-27',
    region: '华东大区',
    district: '上海小区',
    code: 'EMP009',
    name: '钱十一',
    storeName: '上海徐汇店',
    carModel: '全新CT6',
    switchCount: 12,
    effectiveDuration: 140,
    totalTraffic: 15,
    firstTimeTraffic: 10,
    firstTimeRecording: 110,
    secondTimeTraffic: 5,
    secondTimeRecording: 75,
    totalTestDrive: 5,
    effectiveTestDrive: 5,
    rideDriveCount: 3,
    homeTestDrive: 1,
    homeRecording: 40,
    negotiations: 3,
    deliveries: 1,
    followUpDuration: 85
  },
  {
    date: '2026-03-27',
    region: '华东大区',
    district: '上海小区',
    code: 'EMP010',
    name: '冯十二',
    storeName: '上海徐汇店',
    carModel: '全新XT6',
    switchCount: 10,
    effectiveDuration: 120,
    totalTraffic: 14,
    firstTimeTraffic: 9,
    firstTimeRecording: 105,
    secondTimeTraffic: 5,
    secondTimeRecording: 70,
    totalTestDrive: 5,
    effectiveTestDrive: 4,
    rideDriveCount: 3,
    homeTestDrive: 1,
    homeRecording: 35,
    negotiations: 2,
    deliveries: 0,
    followUpDuration: 70
  }
];

const qualityInspectionData = [
  {
    date: '2026-03-27',
    region: '华东大区',
    district: '上海小区',
    code: 'EMP001',
    storeName: '上海徐汇店',
    name: '张三',
    carModel: '全新CT5',
    overallRate: '92%',
    showroom: '95%',
    testDrive: '88%',
    negotiation: '90%',
    delivery: '100%'
  },
  {
    date: '2026-03-27',
    region: '华东大区',
    district: '上海小区',
    code: 'EMP002',
    storeName: '上海徐汇店',
    name: '李四',
    carModel: '全新XT5',
    overallRate: '85%',
    showroom: '88%',
    testDrive: '82%',
    negotiation: '80%',
    delivery: '95%'
  },
  {
    date: '2026-03-27',
    region: '华东大区',
    district: '上海小区',
    code: 'EMP003',
    storeName: '上海徐汇店',
    name: '王五',
    carModel: 'IQ锐歌',
    overallRate: '95%',
    showroom: '98%',
    testDrive: '92%',
    negotiation: '94%',
    delivery: '100%'
  },
  {
    date: '2026-03-27',
    region: '华东大区',
    district: '上海小区',
    code: 'EMP004',
    storeName: '上海徐汇店',
    name: '赵六',
    carModel: '全新CT6',
    overallRate: '88%',
    showroom: '90%',
    testDrive: '85%',
    negotiation: '86%',
    delivery: '92%'
  },
  {
    date: '2026-03-27',
    region: '华东大区',
    district: '上海小区',
    code: 'EMP005',
    storeName: '上海徐汇店',
    name: '孙七',
    carModel: '全新XT6',
    overallRate: '90%',
    showroom: '92%',
    testDrive: '88%',
    negotiation: '89%',
    delivery: '94%'
  },
  {
    date: '2026-03-27',
    region: '华东大区',
    district: '上海小区',
    code: 'EMP006',
    storeName: '上海徐汇店',
    name: '周八',
    carModel: '全新CT5',
    overallRate: '86%',
    showroom: '89%',
    testDrive: '84%',
    negotiation: '82%',
    delivery: '90%'
  },
  {
    date: '2026-03-27',
    region: '华东大区',
    district: '上海小区',
    code: 'EMP007',
    storeName: '上海徐汇店',
    name: '吴九',
    carModel: '全新XT5',
    overallRate: '89%',
    showroom: '91%',
    testDrive: '87%',
    negotiation: '88%',
    delivery: '93%'
  },
  {
    date: '2026-03-27',
    region: '华东大区',
    district: '上海小区',
    code: 'EMP008',
    storeName: '上海徐汇店',
    name: '郑十',
    carModel: 'IQ锐歌',
    overallRate: '93%',
    showroom: '96%',
    testDrive: '90%',
    negotiation: '92%',
    delivery: '98%'
  },
  {
    date: '2026-03-27',
    region: '华东大区',
    district: '上海小区',
    code: 'EMP009',
    storeName: '上海徐汇店',
    name: '钱十一',
    overallRate: '87%',
    showroom: '90%',
    testDrive: '85%',
    negotiation: '84%',
    delivery: '91%',
    carModel: '全新CT6'
  },
  {
    date: '2026-03-27',
    region: '华东大区',
    district: '上海小区',
    code: 'EMP010',
    storeName: '上海徐汇店',
    name: '冯十二',
    carModel: '全新XT6',
    overallRate: '91%',
    showroom: '94%',
    testDrive: '88%',
    negotiation: '90%',
    delivery: '96%'
  },
  {
    date: '2026-03-27',
    region: '华东大区',
    district: '上海小区',
    code: 'EMP011',
    storeName: '上海徐汇店',
    name: '周十三',
    carModel: 'IQ傲歌',
    overallRate: '94%',
    showroom: '96%',
    testDrive: '91%',
    negotiation: '93%',
    delivery: '99%'
  },
  {
    date: '2026-03-27',
    region: '华东大区',
    district: '上海小区',
    code: 'EMP012',
    storeName: '上海徐汇店',
    name: '吴十四',
    carModel: 'IQ傲歌',
    overallRate: '88%',
    showroom: '91%',
    testDrive: '85%',
    negotiation: '86%',
    delivery: '92%'
  }
];

const MetricCard = ({ 
  title, 
  icon, 
  value, 
  unit, 
  nationalAvg, 
  regionalAvg, 
  target, 
  achievement, 
  progress, 
  aiSuggestion,
  color 
}: { 
  title: string; 
  icon: React.ReactNode; 
  value: string; 
  unit: string; 
  nationalAvg: string; 
  regionalAvg: string; 
  target: string; 
  achievement: string; 
  progress: number; 
  aiSuggestion: string;
  color: 'primary' | 'amber' | 'indigo' | 'orange' | 'emerald';
}) => {
  const colorClasses = {
    primary: 'bg-primary-50 dark:bg-primary-900/20 text-primary-600',
    amber: 'bg-amber-50 dark:bg-amber-900/20 text-amber-600',
    indigo: 'bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600',
    orange: 'bg-orange-50 dark:bg-orange-900/20 text-orange-600',
    emerald: 'bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600',
  };

  const barColorClasses = {
    primary: 'bg-primary-500',
    amber: 'bg-amber-500',
    indigo: 'bg-indigo-500',
    orange: 'bg-orange-500',
    emerald: 'bg-emerald-500',
  };

  const highlightBgClasses = {
    primary: 'bg-primary-50/50 dark:bg-primary-900/10 border-primary-100 dark:border-primary-800/50',
    amber: 'bg-amber-50/50 dark:bg-amber-900/10 border-amber-100 dark:border-amber-800/50',
    indigo: 'bg-indigo-50/50 dark:bg-indigo-900/10 border-indigo-100 dark:border-indigo-800/50',
    orange: 'bg-orange-50/50 dark:bg-orange-900/10 border-orange-100 dark:border-orange-800/50',
    emerald: 'bg-emerald-50/50 dark:bg-emerald-900/10 border-emerald-100 dark:border-emerald-800/50',
  };

  // Simple parsing for comparison
  const valNum = parseFloat(value.replace(/,/g, ''));
  const natNum = parseFloat(nationalAvg.replace(/%/g, ''));
  const regNum = parseFloat(regionalAvg.replace(/%/g, ''));

  return (
    <div className="bg-white dark:bg-slate-800/50 p-8 rounded-[3rem] border border-slate-100 dark:border-slate-800 flex flex-col justify-between shadow-sm hover:shadow-md transition-all duration-500">
      <div>
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <div className={`p-4 rounded-2xl ${colorClasses[color]} shadow-sm`}>
            {icon}
          </div>
          <div>
            <h4 className="text-lg font-black text-slate-900 dark:text-white tracking-tight">{title}</h4>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">指标详情</span>
              <span className="w-1 h-1 bg-slate-300 rounded-full"></span>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">03-23 ~ 03-29</span>
            </div>
          </div>
        </div>

        {/* Row 1: Combined Secondary Data (Industry & Last Week) */}
        <div className="p-6 rounded-[2rem] bg-slate-50/50 dark:bg-slate-900/30 border border-slate-100 dark:border-slate-800/50 mb-8">
          <div className="flex items-center justify-between mb-4">
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-1.5">
              <Clock size={10} /> 上周完成与行业对比
            </p>
            <div className="flex gap-2">
              {valNum > natNum && (
                <span className="px-1.5 py-0.5 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400 rounded text-[8px] font-black flex items-center gap-0.5">
                  <ArrowUpRight size={8} /> 高于全国
                </span>
              )}
              {valNum > regNum && (
                <span className="px-1.5 py-0.5 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded text-[8px] font-black flex items-center gap-0.5">
                  <ArrowUpRight size={8} /> 高于区域
                </span>
              )}
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-baseline gap-1.5">
              <span className="text-3xl font-black text-slate-900 dark:text-white tracking-tighter">{value}</span>
              <span className="text-xs font-bold text-slate-400">{unit}</span>
              <span className="ml-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest">上周实绩</span>
            </div>
            
            <div className="flex items-center gap-6 border-l border-slate-200 dark:border-slate-700 pl-6">
              <div className="flex flex-col">
                <span className="text-[9px] font-bold text-slate-400 uppercase tracking-tighter mb-0.5">全国平均</span>
                <span className="text-xs font-black text-slate-700 dark:text-slate-300">{nationalAvg}</span>
              </div>
              <div className="flex flex-col">
                <span className="text-[9px] font-bold text-slate-400 uppercase tracking-tighter mb-0.5">区域平均</span>
                <span className="text-xs font-black text-slate-700 dark:text-slate-300">{regionalAvg}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Row 2: Core Focus (This Week's Target) - Highlighted */}
        <div className={`p-7 rounded-[2.5rem] border-2 ${highlightBgClasses[color]} relative overflow-hidden mb-8 shadow-sm group transition-all duration-500 hover:shadow-xl hover:shadow-primary-500/5`}>
          {progress < 100 && (
            <div className="absolute -right-4 -top-4 w-16 h-16 bg-rose-500/10 rounded-full flex items-center justify-center rotate-12">
              <span className="text-[10px] font-black text-rose-600 dark:text-rose-400 uppercase">加急</span>
            </div>
          )}
          
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-2.5">
              <div className={`p-2 rounded-xl ${barColorClasses[color]} text-white shadow-lg shadow-primary-500/20`}>
                <Target size={18} />
              </div>
              <span className="text-xs font-black text-slate-900 dark:text-white uppercase tracking-widest">本周核心目标</span>
            </div>
            {progress >= 100 && (
              <span className="px-4 py-1.5 bg-emerald-500 text-white rounded-full text-[10px] font-black uppercase animate-bounce shadow-lg shadow-emerald-500/30">已达标</span>
            )}
          </div>

          <div className="grid grid-cols-2 gap-8 mb-8">
            <div className="relative">
              <p className="text-[10px] font-bold text-slate-400 uppercase mb-2 tracking-widest">目标设定</p>
              <p className="text-3xl font-black text-blue-600 dark:text-blue-400 tracking-tighter">{target}</p>
              <div className="absolute -bottom-2 left-0 w-8 h-1 bg-blue-600/20 rounded-full"></div>
            </div>
            <div className="text-right relative">
              <p className="text-[10px] font-bold text-slate-400 uppercase mb-2 tracking-widest">当前达成</p>
              <p className="text-3xl font-black text-emerald-600 dark:text-emerald-400 tracking-tighter">{achievement}</p>
              <div className="absolute -bottom-2 right-0 w-8 h-1 bg-emerald-600/20 rounded-full"></div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex justify-between items-end">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">达成进度</span>
                <span className="px-2 py-0.5 bg-white/50 dark:bg-slate-800/50 text-slate-500 rounded text-[9px] font-bold tracking-tighter">本周实时</span>
              </div>
              <span className={`text-2xl font-black ${progress >= 100 ? 'text-emerald-500' : 'text-primary-500'} tracking-tighter`}>{progress}%</span>
            </div>
            <div className="w-full bg-slate-200 dark:bg-slate-700 h-4 rounded-full overflow-hidden p-1 shadow-inner">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: `${Math.min(progress, 100)}%` }}
                transition={{ duration: 1.2, ease: [0.34, 1.56, 0.64, 1] }}
                className={`h-full rounded-full ${barColorClasses[color]} shadow-sm relative group-hover:brightness-110 transition-all`}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer"></div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      {/* AI Suggestion Section */}
      <div className="mt-6 p-4 rounded-2xl bg-primary-50/30 dark:bg-primary-900/10 border border-primary-100/50 dark:border-primary-800/30 relative group">
        <div className="absolute -left-1 top-4 w-1 h-8 bg-primary-500 rounded-full"></div>
        <div className="flex items-start gap-3">
          <div className="mt-0.5 p-1.5 bg-white dark:bg-slate-800 rounded-lg shadow-sm text-primary-600">
            <Sparkles size={14} className="animate-pulse" />
          </div>
          <div className="flex-1">
            <div className="flex items-center justify-between mb-1">
              <span className="text-[10px] font-black text-primary-600 dark:text-primary-400 uppercase tracking-widest">AI 智能建议</span>
              <span className="text-[8px] font-bold text-slate-400">刚刚生成</span>
            </div>
            <p className="text-xs font-bold text-slate-600 dark:text-slate-300 leading-relaxed">
              {aiSuggestion}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

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

const StoreDailyReport: React.FC = () => {
  const [reportType, setReportType] = React.useState<string>('日报');
  const [reportDate, setReportDate] = React.useState<string>('2026-03-25');
  const [selectedModel, setSelectedModel] = React.useState<string>('全新XT5');
  const [selectedReceptionModel, setSelectedReceptionModel] = React.useState<string>('全部');
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [modalTab, setModalTab] = React.useState<'current' | 'history'>('current');
  const [isAgentOpen, setIsAgentOpen] = React.useState(false);
  const [showTaskTooltip, setShowTaskTooltip] = React.useState(true);
  const [isPerformanceBarVisible, setIsPerformanceBarVisible] = React.useState(true);
  const [useEmptyDemo, setUseEmptyDemo] = React.useState(false);
  const [explanation, setExplanation] = React.useState<{ isOpen: boolean; title: string; text: string }>({
    isOpen: false,
    title: '',
    text: ''
  });
  const [chatMessages, setChatMessages] = React.useState<{ type: 'user' | 'bot', content: React.ReactNode, id: string }[]>([]);
  const chatContainerRef = React.useRef<HTMLDivElement>(null);

  // Scroll to bottom when chat updates
  React.useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTo({
        top: chatContainerRef.current.scrollHeight,
        behavior: 'smooth'
      });
    }
  }, [chatMessages]);

  const handleAgentPresetClick = (presetId: string) => {
    const preset = agentPresets.find(p => p.id === presetId);
    if (!preset) return;

    const messageId = Date.now().toString();
    
    // Add user question first
    const userMsg = {
      id: `${messageId}-user`,
      type: 'user' as const,
      content: preset.label
    };

    // Then add bot response
    const botMsg = {
      id: `${messageId}-bot`,
      type: 'bot' as const,
      content: preset.content
    };

    setChatMessages(prev => [...prev, userMsg, botMsg]);
  };

  const currentPerformanceData = useEmptyDemo ? [] : [
    { label: '使用率', value: '96.5%', target: '95.0%', status: '已达标', color: 'text-emerald-500', bg: 'bg-emerald-50 dark:bg-emerald-900/10' },
    { label: '有效单据率', value: '87.2%', target: '85.0%', status: '已达标', color: 'text-emerald-500', bg: 'bg-emerald-50 dark:bg-emerald-900/10' },
    { label: '首客试驾率', value: '45.2%', target: '55.0%', status: '未达标', color: 'text-rose-500', bg: 'bg-rose-50 dark:bg-rose-900/10' },
    { label: '谈判推进率', value: '32.8%', target: '40.0%', status: '未达标', color: 'text-rose-500', bg: 'bg-rose-50 dark:bg-rose-900/10' },
  ];

  const historyData = useEmptyDemo ? [] : [
    { period: '2026-03-23 ~ 03-29', usage: 96.5, usageTarget: 95, doc: 87.2, docTarget: 85, testDrive: 45.2, testDriveTarget: 50, negotiation: 32.8, negotiationTarget: 35, status: '已达标' },
    { period: '2026-03-16 ~ 03-22', usage: 92.4, usageTarget: 95, doc: 81.5, docTarget: 85, testDrive: 42.8, testDriveTarget: 50, negotiation: 30.5, negotiationTarget: 35, status: '未达标' },
    { period: '2026-03-09 ~ 03-15', usage: 94.8, usageTarget: 92, doc: 84.2, docTarget: 82, testDrive: 48.6, testDriveTarget: 45, negotiation: 35.2, negotiationTarget: 32, status: '已达标' },
    { period: '2026-03-02 ~ 03-08', usage: 89.2, usageTarget: 92, doc: 78.4, docTarget: 82, testDrive: 40.5, testDriveTarget: 45, negotiation: 28.4, negotiationTarget: 32, status: '未达标' },
  ];

  const ChatEmptyState = ({ title, description, icon: Icon }: { title: string, description: string, icon: any }) => (
    <div className="py-8 flex flex-col items-center text-center px-4 bg-slate-50/50 dark:bg-slate-900/30 rounded-3xl border border-dashed border-slate-200 dark:border-slate-800">
      <div className="w-12 h-12 bg-white dark:bg-slate-800 rounded-2xl flex items-center justify-center text-slate-300 dark:text-slate-600 shadow-sm mb-4">
        <Icon size={24} />
      </div>
      <h4 className="text-sm font-black text-slate-900 dark:text-white mb-2">{title}</h4>
      <p className="text-xs text-slate-400 leading-relaxed font-bold">{description}</p>
    </div>
  );

  const agentPresets = [
    { 
      id: 'performance', 
      label: '本期核心指标达成情况', 
      icon: <Award size={16} />,
      content: currentPerformanceData.length > 0 ? (
        <div className="space-y-4">
          <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed font-bold">本期（03-23 ~ 03-29）执行表现：</p>
          <div className="grid grid-cols-1 gap-3">
            {currentPerformanceData.map((item, i) => (
              <div key={i} className={`p-4 rounded-2xl border border-slate-100 dark:border-slate-800 flex items-center justify-between ${item.bg}`}>
                <div>
                  <p className="text-[10px] font-black text-slate-400 uppercase mb-1">{item.label}</p>
                  <div className="flex items-baseline gap-2">
                    <p className={`text-xl font-black ${item.color}`}>{item.value}</p>
                    <p className="text-xs font-bold text-slate-400">/ 目标 {item.target}</p>
                  </div>
                </div>
                <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${
                  item.status === '已达标' ? 'bg-emerald-500 text-white' : 'bg-rose-500 text-white'
                }`}>
                  {item.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <ChatEmptyState 
          icon={ClipboardList}
          title="本期暂无任务指标"
          description="当前门店在本期尚未设置核心任务。"
        />
      )
    },
    { 
      id: 'history', 
      label: '历史达成情况', 
      icon: <Clock size={16} />,
      content: historyData.length > 0 ? (
        <div className="space-y-4">
          <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed font-bold">过去 4 期执行趋势回顾：</p>
          <div className="space-y-3">
            {historyData.map((row, i) => (
              <div key={i} className="p-4 bg-slate-50 dark:bg-slate-900/50 rounded-2xl border border-slate-100 dark:border-slate-700">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-black text-slate-900 dark:text-white">{row.period}</span>
                </div>
                <div className="grid grid-cols-2 gap-y-3 gap-x-4">
                  {[
                    { label: '使用率', val: row.usage, tgt: row.usageTarget },
                    { label: '有效单据率', val: row.doc, tgt: row.docTarget },
                    { label: '首客试驾率', val: row.testDrive, tgt: row.testDriveTarget },
                    { label: '谈判推进率', val: row.negotiation, tgt: row.negotiationTarget },
                  ].map((m, j) => (
                    <div key={j} className="flex flex-col">
                      <p className="text-[9px] font-bold text-slate-400 mb-1">{m.label}</p>
                      <div className="flex items-baseline gap-1">
                        <p className={`text-xs font-black ${m.val >= m.tgt ? 'text-emerald-500' : 'text-rose-500'}`}>
                          {m.val}%
                        </p>
                        <p className="text-[8px] font-bold text-slate-400">/ {m.tgt}%</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <ChatEmptyState 
          icon={Clock}
          title="暂无历史达成记录"
          description="数据正在持续收集中，积累足够的周期后将在此展示对比趋势。"
        />
      )
    },
    { 
      id: 'suggestions', 
      label: 'AI 针对性改进建议', 
      icon: <Sparkles size={16} />,
      content: (
        <div className="space-y-4">
          <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed font-bold">针对本周指标的 AI 优化策略：</p>
          <div className="space-y-4">
            {[
              { 
                label: '使用率', 
                status: '已达标', 
                icon: <UserCheck size={14} />, 
                color: 'emerald',
                advice: '当前表现优异（96.5%），建议保持现有的晨会检查机制，并作为标杆案例在区域内分享经验。' 
              },
              { 
                label: '有效单据率', 
                status: '已达标', 
                icon: <CheckCircle2 size={14} />, 
                color: 'emerald',
                advice: '单据质量稳定（87.2%），建议继续加强录音与单据的自动关联检查，确保数据的持续准确。' 
              },
              { 
                label: '首客试驾率', 
                status: '未达标', 
                icon: <Car size={14} />, 
                color: 'rose',
                advice: '存在 9.8% 的缺口。建议在首次接待话术中强制加入“试驾邀约”环节，利用新车上市热度提升转化。' 
              },
              { 
                label: '谈判推进率', 
                status: '未达标', 
                icon: <Handshake size={14} />, 
                color: 'rose',
                advice: '距离目标仍有差距。建议重点关注二次到店客户的商务洽谈，利用上周积累的意向客户进行集中促单。' 
              },
            ].map((item, i) => (
              <div key={i} className="flex gap-4 p-4 bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-sm">
                <div className={`mt-1 p-2 bg-${item.color}-100 dark:bg-${item.color}-900/30 text-${item.color}-600 rounded-xl h-fit`}>
                  {item.icon}
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <p className="text-sm font-black text-slate-800 dark:text-slate-200">{item.label}</p>
                    <span className={`text-[8px] font-black px-1.5 py-0.5 rounded bg-${item.color}-50 dark:bg-${item.color}-900/20 text-${item.color}-600`}>
                      {item.status}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 leading-relaxed">{item.advice}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )
    }
  ];

  const carModels = ['全部', '全新XT5', '全新CT5', '全新XT4', '新CT6', '新XT6', '凯威德', 'IQ傲歌', 'IQ锐歌'];
  const inspectionCarModels = ['全新XT5', '全新CT5', '全新XT4', '新CT6', '新XT6', '凯威德', 'IQ傲歌', 'IQ锐歌'];

  const formatTableDate = (date: string) => {
    if (reportType === '周报') return '2026-03-23 - 2026-03-29';
    if (reportType === '月报') return '2026-03-01 - 2026-03-31';
    return date;
  };

  const getOverviewMetrics = () => {
    if (reportType === '周报') {
      return {
        total: 504,
        first: 336,
        avgDuration: 45.5,
        testDrive: 126,
        testDriveRate: '37.5%',
        negotiation: 84,
        negotiationRate: '66.7%'
      };
    }
    if (reportType === '月报') {
      return {
        total: 2160,
        first: 1440,
        avgDuration: 42.8,
        testDrive: 540,
        testDriveRate: '37.5%',
        negotiation: 360,
        negotiationRate: '66.7%'
      };
    }
    return {
      total: 72,
      first: 48,
      avgDuration: 48.2,
      testDrive: 18,
      testDriveRate: '37.5%',
      negotiation: 12,
      negotiationRate: '66.7%'
    };
  };

  const metrics = getOverviewMetrics();

  const metricExplanations: Record<string, string> = {
    '客流数': '展厅内通过工牌识别或人工录入的所有进店客户总数。',
    '一次客流': '首次到店咨询的客户数量。',
    '平均有效录音时长': '所有工牌采集到的有效接待语音通话总时长除以接待人次。',
    '有效试驾数': '统计周期内完成的所有有效试乘试驾流程总数。',
    '有效试驾推进率': '有效试驾数占总客流数的比例。',
    '成交谈判数': '客户进入价格谈判或合同签署阶段的接待次数。',
    '谈判推进率': '成交谈判数占总客流数的比例。',
  };

  const handleShowExplanation = (title: string) => {
    setExplanation({
      isOpen: true,
      title,
      text: metricExplanations[title] || '暂无该指标的详细解释。'
    });
  };

  const filteredInspectionData = qualityInspectionData.filter(item => item.carModel === selectedModel);

  const filteredReceptionData = selectedReceptionModel === '全部'
    ? employeeReceptionData
    : employeeReceptionData.filter(item => item.carModel === selectedReceptionModel);

  const handleOpenModal = () => {
    setModalTab('current');
    setIsModalOpen(true);
  };

  return (
    <div className="max-w-7xl mx-auto space-y-8 animate-fade-in pb-20">
      <ExplanationModal
        isOpen={explanation.isOpen}
        onClose={() => setExplanation({ ...explanation, isOpen: false })}
        title={explanation.title}
        explanation={explanation.text}
      />
      {/* Top Filter Bar */}
      <div className="bg-slate-50 dark:bg-slate-900/50 p-4 rounded-2xl flex flex-wrap items-center gap-6 border border-slate-100 dark:border-slate-800">
        {/* Report Type Tabs */}
        <div className="flex bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg overflow-hidden">
          {['日报', '周报', '月报'].map((type) => (
            <button
              key={type}
              onClick={() => setReportType(type)}
              className={`px-8 py-2 text-sm font-bold transition-all ${
                reportType === type 
                  ? 'bg-blue-500 text-white' 
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700'
              } ${type !== '日报' ? 'border-l border-slate-200 dark:border-slate-700' : ''}`}
            >
              {type}
            </button>
          ))}
        </div>

        {/* Date Picker */}
        <div className="relative">
          <input 
            type="text" 
            value={reportDate}
            onChange={(e) => setReportDate(e.target.value)}
            className="pl-4 pr-10 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm font-bold text-slate-700 dark:text-slate-200 focus:outline-none w-48"
          />
          <CalendarIcon className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-3">
          <button className="px-8 py-2 bg-blue-500 text-white rounded-lg text-sm font-bold hover:bg-blue-600 transition-colors shadow-sm">
            查 询
          </button>
          <button className="px-8 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 rounded-lg text-sm font-bold hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors">
            重 置
          </button>
        </div>

        {/* Download Button moved here to save space */}
        <div className="ml-auto">
          <button className="flex items-center gap-2 px-6 py-2 bg-primary-600 text-white rounded-xl text-sm font-black hover:bg-primary-700 transition-all hover:scale-105 active:scale-95 shadow-lg shadow-primary-500/20">
            <Download size={18} />
            下载报告
          </button>
        </div>
      </div>

      {/* Section 1: Today's Reception & Trend */}
      <div className="space-y-4">
        <div className="flex items-center gap-4">
          <div className="w-1.5 h-8 bg-primary-600 rounded-full"></div>
          <div>
            <h2 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">数据总览</h2>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Main Metric Card - Spans 2 rows on desktop */}
          <div className="md:row-span-2 lg:row-span-2">
            <div className="bg-white dark:bg-slate-800 p-8 rounded-[2.5rem] shadow-sm border border-slate-100 dark:border-slate-700 h-full flex flex-col justify-center relative overflow-hidden group">
              <div className="absolute -right-4 -top-4 w-32 h-32 bg-primary-500 opacity-[0.03] rounded-full group-hover:scale-110 transition-transform"></div>
              
              <div className="p-4 bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400 rounded-2xl w-fit mb-8">
                <Users size={32} />
              </div>
              
              <div className="flex justify-between items-start mb-2">
                <p className="text-xs font-black text-slate-400 uppercase tracking-widest">
                  {reportType === '日报' ? '' : reportType === '周报' ? '本周' : '本月'}客流数
                </p>
                <button 
                  onClick={() => handleShowExplanation('客流数')}
                  className="p-1 text-slate-400 hover:text-primary-500 transition-colors"
                >
                  <HelpCircle size={14} />
                </button>
              </div>
              <div className="flex items-baseline gap-2">
                <h2 className="text-7xl font-black text-slate-900 dark:text-white tracking-tighter">{metrics.total}</h2>
                <span className="text-lg font-bold text-slate-400">人</span>
              </div>
            </div>
          </div>

          {/* Secondary Metrics Grid */}
          {[
            { label: '一次客流', value: metrics.first, unit: '人', icon: UserPlus, color: 'text-blue-500', bgColor: 'bg-blue-50 dark:bg-blue-900/20' },
            { label: '平均有效录音时长', value: metrics.avgDuration, unit: '分', icon: Clock, color: 'text-purple-500', bgColor: 'bg-purple-50 dark:bg-purple-900/20' },
            { label: '有效试驾数', value: metrics.testDrive, unit: '人', icon: Car, color: 'text-orange-500', bgColor: 'bg-orange-50 dark:bg-orange-900/20' },
            { label: '有效试驾推进率', value: metrics.testDriveRate, unit: '', icon: Percent, color: 'text-emerald-500', bgColor: 'bg-emerald-50 dark:bg-emerald-900/20' },
            { label: '成交谈判数', value: metrics.negotiation, unit: '人', icon: MessageSquare, color: 'text-indigo-500', bgColor: 'bg-indigo-50 dark:bg-indigo-900/20' },
            { label: '谈判推进率', value: metrics.negotiationRate, unit: '', icon: Percent, color: 'text-rose-500', bgColor: 'bg-rose-50 dark:bg-rose-900/20' },
          ].map((item, idx) => (
            <div key={idx} className="bg-white dark:bg-slate-800 p-6 rounded-[2rem] shadow-sm border border-slate-100 dark:border-slate-700 flex items-center gap-5 hover:border-primary-200 dark:hover:border-primary-800 transition-all group relative">
              <button 
                onClick={() => handleShowExplanation(item.label)}
                className="absolute top-4 right-4 p-1 text-slate-300 hover:text-primary-500 transition-colors"
              >
                <HelpCircle size={14} />
              </button>
              <div className={`p-3.5 ${item.bgColor} ${item.color} rounded-xl group-hover:scale-110 transition-transform`}>
                <item.icon size={22} />
              </div>
              <div>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-0.5">{item.label}</p>
                <p className="text-2xl font-black text-slate-900 dark:text-white">
                  {item.value}
                  {item.unit && <span className="text-[10px] font-bold text-slate-400 ml-1">{item.unit}</span>}
                </p>
              </div>
            </div>
          ))}
        </div>
    </div>

      {/* Section 2: Reception List */}
      <div className="space-y-6">
        <div className="flex flex-col space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-1.5 h-8 bg-primary-600 rounded-full"></div>
              <div className="flex items-baseline gap-3">
                <h2 className="text-2xl font-black text-slate-900 dark:text-white">接待明细</h2>
                <p className="text-xs font-medium text-slate-500 dark:text-slate-400">
                  注：当总客流小于每个顾问接待客户相加时，即发生了同一个客户在不同环节接触不同车型的情况
                </p>
              </div>
            </div>
          </div>

          {/* Tab Style Filter for Reception List */}
          <div className="bg-white dark:bg-slate-800 border-b border-slate-100 dark:border-slate-700 overflow-x-auto no-scrollbar">
            <div className="flex items-center gap-8 px-2 min-w-max">
              {carModels.map(model => (
                <button
                  key={model}
                  onClick={() => setSelectedReceptionModel(model)}
                  className={`relative py-4 text-sm font-bold transition-all whitespace-nowrap ${
                    selectedReceptionModel === model 
                      ? 'text-blue-600 dark:text-blue-400' 
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  {model}
                  {selectedReceptionModel === model && (
                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-blue-600 dark:bg-blue-400 rounded-t-full"></div>
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-800 rounded-[2.5rem] shadow-sm border border-slate-100 dark:border-slate-700 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50/50 dark:bg-slate-900/50 border-bottom border-slate-100 dark:border-slate-700">
                  {[
                    reportType === '日报' ? '日期' : '时间', '员工姓名', '车型', 
                    '开关次数', '有效时长(分)', '客流数', '一次客流', 
                    '接待总录音时长(分)', '二次客流', '接待总录音时长(分)', 
                    '总试驾数', '有效试驾数', '试乘试驾数', '上门试驾数', 
                    '上门试驾接待总录音时长(分)', '成交谈判数', '新车交付数', 
                    '线索跟进时长(分)'
                  ].map((header, idx) => (
                    <th key={idx} className="px-6 py-5 text-[11px] font-black text-slate-400 uppercase tracking-widest whitespace-nowrap border-r border-slate-100/50 dark:border-slate-700/50 last:border-r-0">
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50 dark:divide-slate-700/50">
                {filteredReceptionData.map((row, idx) => (
                  <tr key={idx} className="hover:bg-slate-50/50 dark:hover:bg-slate-900/30 transition-colors group">
                    <td className="px-6 py-4 text-sm font-bold text-slate-600 dark:text-slate-400 whitespace-nowrap">{formatTableDate(row.date)}</td>
                    <td className="px-6 py-4 text-sm font-black text-slate-900 dark:text-white whitespace-nowrap">{row.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-3 py-1 bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 rounded-full text-xs font-black">
                        {row.carModel}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm font-black text-slate-900 dark:text-white text-center">{row.switchCount}</td>
                    <td className="px-6 py-4 text-sm font-black text-slate-900 dark:text-white text-center">{row.effectiveDuration}</td>
                    <td className="px-6 py-4 text-sm font-black text-slate-900 dark:text-white text-center">{row.totalTraffic}</td>
                    <td className="px-6 py-4 text-sm font-black text-slate-900 dark:text-white text-center">{row.firstTimeTraffic}</td>
                    <td className="px-6 py-4 text-sm font-bold text-slate-500 dark:text-slate-400 text-center italic">{row.firstTimeRecording}</td>
                    <td className="px-6 py-4 text-sm font-black text-slate-900 dark:text-white text-center">{row.secondTimeTraffic}</td>
                    <td className="px-6 py-4 text-sm font-bold text-slate-500 dark:text-slate-400 text-center italic">{row.secondTimeRecording}</td>
                    <td className="px-6 py-4 text-sm font-black text-slate-900 dark:text-white text-center">{row.totalTestDrive}</td>
                    <td className="px-6 py-4 text-sm font-black text-slate-900 dark:text-white text-center">{row.effectiveTestDrive}</td>
                    <td className="px-6 py-4 text-sm font-black text-slate-900 dark:text-white text-center">{row.rideDriveCount}</td>
                    <td className="px-6 py-4 text-sm font-black text-slate-900 dark:text-white text-center">{row.homeTestDrive}</td>
                    <td className="px-6 py-4 text-sm font-bold text-slate-500 dark:text-slate-400 text-center italic">{row.homeRecording}</td>
                    <td className="px-6 py-4 text-sm font-black text-slate-900 dark:text-white text-center">{row.negotiations}</td>
                    <td className="px-6 py-4 text-sm font-black text-slate-900 dark:text-white text-center">{row.deliveries}</td>
                    <td className="px-6 py-4 text-sm font-black text-slate-900 dark:text-white text-center">{row.followUpDuration}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          <div className="p-6 bg-slate-50/50 dark:bg-slate-900/50 border-t border-slate-100 dark:border-slate-700 flex items-center justify-between">
            <p className="text-xs font-bold text-slate-400">显示 1 到 {filteredReceptionData.length} 条数据，共 {filteredReceptionData.length} 条</p>
            <div className="flex items-center gap-2">
              <button className="px-4 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-black text-slate-400 cursor-not-allowed">上一页</button>
              <button className="px-4 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-black text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors flex items-center gap-2">
                下一页
                <ChevronRight size={14} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Section 3: Quality Inspection Competency Assessment */}
      <div className="space-y-6">
        <div className="flex flex-col space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-1.5 h-8 bg-indigo-600 rounded-full"></div>
              <div>
                <h2 className="text-2xl font-black text-slate-900 dark:text-white">质检能力明细</h2>
              </div>
            </div>
          </div>

          {/* Tab Style Filter */}
          <div className="bg-white dark:bg-slate-800 border-b border-slate-100 dark:border-slate-700 overflow-x-auto no-scrollbar">
            <div className="flex items-center gap-8 px-2 min-w-max">
              {inspectionCarModels.map(model => (
                <button
                  key={model}
                  onClick={() => setSelectedModel(model)}
                  className={`relative py-4 text-sm font-bold transition-all whitespace-nowrap ${
                    selectedModel === model 
                      ? 'text-blue-600 dark:text-blue-400' 
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  {model}
                  {selectedModel === model && (
                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-blue-600 dark:bg-blue-400 rounded-t-full"></div>
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-800 rounded-[2.5rem] shadow-sm border border-slate-100 dark:border-slate-700 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50/50 dark:bg-slate-900/50 border-bottom border-slate-100 dark:border-slate-700">
                  {[
                    reportType === '日报' ? '日期' : '时间', '员工姓名', '车型', 
                    '总体执行率', '展厅接待', '试乘试驾', '成交谈判', '新车交付'
                  ].map((header, idx) => (
                    <th key={idx} className="px-6 py-5 text-[11px] font-black text-slate-400 uppercase tracking-widest whitespace-nowrap border-r border-slate-100/50 dark:border-slate-700/50 last:border-r-0">
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50 dark:divide-slate-700/50">
                {filteredInspectionData.map((row, idx) => (
                  <tr key={idx} className="hover:bg-slate-50/50 dark:hover:bg-slate-900/30 transition-colors group">
                    <td className="px-6 py-4 text-sm font-bold text-slate-600 dark:text-slate-400 whitespace-nowrap">{formatTableDate(row.date)}</td>
                    <td className="px-6 py-4 text-sm font-black text-slate-900 dark:text-white whitespace-nowrap">{row.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-3 py-1 bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 rounded-full text-xs font-black">
                        {row.carModel}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm font-black text-indigo-600 dark:text-indigo-400 text-center">{row.overallRate}</td>
                    <td className="px-6 py-4 text-sm font-black text-slate-900 dark:text-white text-center">{row.showroom}</td>
                    <td className="px-6 py-4 text-sm font-black text-slate-900 dark:text-white text-center">{row.testDrive}</td>
                    <td className="px-6 py-4 text-sm font-black text-slate-900 dark:text-white text-center">{row.negotiation}</td>
                    <td className="px-6 py-4 text-sm font-black text-slate-900 dark:text-white text-center">{row.delivery}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          <div className="p-6 bg-slate-50/50 dark:bg-slate-900/50 border-t border-slate-100 dark:border-slate-700 flex items-center justify-between">
            <p className="text-xs font-bold text-slate-400">显示 1 到 {filteredInspectionData.length} 条数据，共 {filteredInspectionData.length} 条</p>
          </div>
        </div>
      </div>

      {/* Floating Bars */}
      <div className="fixed right-0 top-1/2 -translate-y-1/2 z-40 flex flex-col gap-4 items-end">
        {/* Performance Bar */}
        {isPerformanceBarVisible && (
          <motion.div 
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            className="flex items-center group/bar"
          >
            {/* Guidance Tooltip */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1, duration: 0.5 }}
              className="mr-2 bg-rose-500 text-white px-3 py-1.5 rounded-xl shadow-lg text-[10px] font-black whitespace-nowrap relative animate-bounce"
            >
              任务待达成
              <div className="absolute right-[-4px] top-1/2 -translate-y-1/2 w-2 h-2 bg-rose-500 rotate-45"></div>
            </motion.div>

            <div className="relative">
              <button 
                onClick={handleOpenModal}
                className="bg-primary-600 hover:bg-primary-700 text-white py-4 px-2.5 rounded-l-2xl shadow-[0_10px_30px_rgba(37,99,235,0.3)] flex flex-col items-center gap-2 transition-all hover:pr-4 group relative overflow-hidden"
              >
                {/* Animated Glow Effect */}
                <div className="absolute inset-0 bg-gradient-to-b from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                
                {/* Notification Dot */}
                <div className="absolute top-2 right-2 w-1.5 h-1.5 bg-rose-500 rounded-full border border-white dark:border-slate-800 animate-ping"></div>
                <div className="absolute top-2 right-2 w-1.5 h-1.5 bg-rose-500 rounded-full border border-white dark:border-slate-800"></div>

                <div className="p-1 bg-white/20 rounded-lg backdrop-blur-sm group-hover:scale-110 transition-transform">
                  <Award size={16} className="drop-shadow-md" />
                </div>
                
                <span className="[writing-mode:vertical-rl] font-black tracking-[0.1em] text-[10px] uppercase">门店表现</span>
              </button>

              {/* Close Button */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setIsPerformanceBarVisible(false);
                }}
                className="absolute -top-2 -left-2 w-5 h-5 bg-slate-800 dark:bg-slate-100 text-white dark:text-slate-800 rounded-full flex items-center justify-center shadow-lg opacity-0 group-hover/bar:opacity-100 transition-opacity z-50 hover:scale-110"
              >
                <X size={10} strokeWidth={3} />
              </button>
            </div>
          </motion.div>
        )}

        {/* Agent Bar */}
        <motion.div 
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="flex items-center relative"
        >
          {/* Task Notification Tooltip */}
          <AnimatePresence>
            {showTaskTooltip && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="absolute top-1/2 -translate-y-1/2 right-full mr-4 bg-rose-500 text-white px-4 py-2 rounded-2xl shadow-2xl shadow-rose-500/40 text-xs font-black whitespace-nowrap z-[60] flex items-center gap-2 animate-bounce border-2 border-white/20"
              >
                收到新任务
                <div className="absolute right-[-6px] top-1/2 -translate-y-1/2 w-3 h-3 bg-rose-500 rotate-45 border-t-2 border-r-2 border-white/20"></div>
              </motion.div>
            )}
          </AnimatePresence>

          <button 
            onClick={() => {
              setIsAgentOpen(true);
              setShowTaskTooltip(false);
            }}
            className="bg-slate-900 dark:bg-white text-white dark:text-slate-900 py-6 px-4 rounded-l-[2rem] shadow-2xl flex flex-col items-center gap-3 transition-all hover:pr-8 group relative overflow-hidden border-y border-l border-slate-800 dark:border-slate-200"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div className="p-2 bg-white/10 dark:bg-slate-900/10 rounded-xl backdrop-blur-sm group-hover:scale-110 transition-transform relative">
              <Bot size={24} className="text-indigo-400" />
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-rose-500 rounded-full border-2 border-slate-900 dark:border-white animate-pulse"></span>
            </div>
            <span className="[writing-mode:vertical-rl] font-black tracking-[0.2em] text-xs uppercase">AI 助手</span>
          </button>
        </motion.div>
      </div>

      {/* Agent Drawer */}
      <AnimatePresence>
        {isAgentOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsAgentOpen(false)}
              className="fixed inset-0 bg-slate-900/40 backdrop-blur-[2px] z-[60]"
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-white dark:bg-slate-900 z-[70] shadow-2xl flex flex-col border-l border-slate-200 dark:border-slate-800"
            >
              {/* Drawer Header */}
              <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between bg-slate-50/50 dark:bg-slate-800/50">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 bg-indigo-600 text-white rounded-xl shadow-lg shadow-indigo-500/20">
                    <Bot size={20} />
                  </div>
                  <div>
                    <h3 className="text-base font-black text-slate-900 dark:text-white">门店执行 AI 助手</h3>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">实时数据智能分析</p>
                  </div>
                </div>
                <button 
                  onClick={() => setIsAgentOpen(false)}
                  className="p-2 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-full transition-colors"
                >
                  <X size={20} className="text-slate-400" />
                </button>
              </div>

              {/* Drawer Content */}
              <div 
                ref={chatContainerRef}
                className="flex-1 overflow-y-auto p-6 space-y-8 custom-scrollbar scroll-smooth"
              >
                {/* Welcome Message */}
                <div className="flex gap-3">
                  <div className="w-8 h-8 rounded-full bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center text-indigo-600 shrink-0">
                    <Bot size={16} />
                  </div>
                  <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl rounded-tl-none border border-slate-100 dark:border-slate-800">
                    <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
                      您好！我是您的门店执行助手。我可以为您分析本周的各项核心指标，并提供针对性的改进建议。
                    </p>
                  </div>
                </div>

                {/* Task Notification */}
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="p-5 bg-white dark:bg-slate-800 rounded-3xl shadow-xl shadow-indigo-500/5 border border-indigo-100 dark:border-indigo-900/50 relative overflow-hidden group"
                >
                  <div className="absolute top-0 right-0 p-4 text-indigo-500/5 group-hover:scale-110 transition-transform">
                    <Target size={80} />
                  </div>
                  <div className="relative z-10 space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-0.5 bg-indigo-50 dark:bg-indigo-900/30 rounded-lg text-[10px] font-black text-indigo-600 dark:text-indigo-400 uppercase tracking-widest">
                          本期任务
                        </span>
                        <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-pulse" />
                      </div>
                      <span className="text-[10px] font-bold text-slate-400 bg-slate-50 dark:bg-slate-900/50 px-2 py-0.5 rounded-full">
                        周期：2026-04-01 ~ 04-30
                      </span>
                    </div>
                    <div>
                      <h4 className="text-slate-900 dark:text-white font-black text-lg leading-tight">智能工牌提升专项任务</h4>
                    </div>
                    <div className="p-4 bg-indigo-50/50 dark:bg-indigo-900/20 rounded-2xl border border-indigo-100/50 dark:border-indigo-800/30">
                      <div className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed font-medium space-y-2">
                        <p className="font-black text-slate-900 dark:text-slate-200">重点关注以下指标达成：</p>
                        <div className="grid grid-cols-2 gap-x-4 gap-y-2 mt-1">
                          <p className="flex justify-between items-center">• 使用率: <span className="text-indigo-600 dark:text-indigo-400 font-black">95%</span></p>
                          <p className="flex justify-between items-center">• 有效单据率: <span className="text-indigo-600 dark:text-indigo-400 font-black">85%</span></p>
                          <p className="flex justify-between items-center">• 首客试驾率: <span className="text-indigo-600 dark:text-indigo-400 font-black">55%</span></p>
                          <p className="flex justify-between items-center">• 谈判推进率: <span className="text-indigo-600 dark:text-indigo-400 font-black">40%</span></p>
                        </div>
                        <p className="mt-2 pt-2 border-t border-indigo-100 dark:border-indigo-800/50 text-[10px] opacity-80">请结合当前达成情况进行优化。</p>
                      </div>
                    </div>
                    <button 
                      onClick={() => handleAgentPresetClick('performance')}
                      className="w-full py-3 bg-indigo-600 text-white rounded-xl font-black text-xs shadow-lg shadow-indigo-500/20 hover:bg-indigo-700 transition-all flex items-center justify-center gap-2"
                    >
                      查看本期核心指标达成情况
                      <ArrowUpRight size={14} />
                    </button>
                  </div>
                </motion.div>

                <div className="flex items-center gap-4 px-2">
                  <div className="h-px flex-1 bg-slate-100 dark:bg-slate-800" />
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">对话记录</span>
                  <div className="h-px flex-1 bg-slate-100 dark:bg-slate-800" />
                </div>

                {/* Chat History */}
                <div className="space-y-8">
                  {chatMessages.map((msg) => (
                    <motion.div
                      key={msg.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`flex ${msg.type === 'user' ? 'justify-end' : 'gap-3'}`}
                    >
                      {msg.type === 'bot' && (
                        <div className="w-8 h-8 rounded-full bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center text-indigo-600 shrink-0">
                          <Bot size={16} />
                        </div>
                      )}
                      <div className={`max-w-[85%] ${
                        msg.type === 'user' 
                          ? 'p-3 bg-indigo-600 text-white rounded-2xl rounded-tr-none text-sm font-bold shadow-lg shadow-indigo-500/20'
                          : 'flex-1 p-5 bg-white dark:bg-slate-800 rounded-2xl rounded-tl-none border border-slate-100 dark:border-slate-800 shadow-sm'
                      }`}>
                        {msg.content}
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Preset Options (Sticky or at bottom) */}
                <div className={`pt-4 border-t border-slate-100 dark:border-slate-800 ${
                  chatMessages.length > 0 ? 'sticky bottom-0 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md -mx-6 px-6 pb-6' : 'space-y-3'
                }`}>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">
                    {chatMessages.length > 0 ? '继续询问：' : '您可以询问：'}
                  </p>
                  
                  <div className={chatMessages.length > 0 ? 'flex flex-row gap-3 overflow-x-auto pb-2 custom-scrollbar-hide' : 'space-y-3'}>
                    {agentPresets.map((preset) => (
                      <button
                        key={preset.id}
                        onClick={() => handleAgentPresetClick(preset.id)}
                        className={`transition-all flex items-center group shrink-0 ${
                          chatMessages.length > 0
                            ? 'px-4 py-2.5 rounded-xl border bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 hover:border-indigo-200 dark:hover:border-indigo-800 hover:shadow-sm gap-2'
                            : 'w-full p-4 rounded-2xl border bg-white dark:bg-slate-800 border-slate-100 dark:border-slate-700 hover:border-indigo-200 dark:hover:border-indigo-800 hover:shadow-md justify-between'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div className={`rounded-lg transition-colors ${
                            chatMessages.length > 0
                              ? 'p-1.5 bg-slate-100 dark:bg-slate-700 text-slate-500 group-hover:bg-indigo-100 dark:group-hover:bg-indigo-900/30 group-hover:text-indigo-600'
                              : 'p-2 bg-slate-100 dark:bg-slate-700 text-slate-500 group-hover:bg-indigo-100 dark:group-hover:bg-indigo-900/30 group-hover:text-indigo-600'
                          }`}>
                            {preset.icon}
                          </div>
                          <span className={`font-black transition-colors whitespace-nowrap ${
                            chatMessages.length > 0
                              ? 'text-xs text-slate-600 dark:text-slate-400 group-hover:text-indigo-600 dark:group-hover:text-indigo-400'
                              : 'text-sm text-slate-700 dark:text-slate-300 group-hover:text-indigo-600 dark:group-hover:text-indigo-400'
                          }`}>
                            {preset.label}
                          </span>
                        </div>
                        {chatMessages.length === 0 && (
                          <ChevronRight size={16} className="text-slate-300 group-hover:text-indigo-400 transition-colors" />
                        )}
                      </button>
                    ))}
                  </div>
                  
                  {/* Demo Tooltip for Empty States */}
                  <div className="pt-4 border-t border-slate-100 dark:border-slate-800">
                    <button
                      onClick={() => {
                        setUseEmptyDemo(!useEmptyDemo);
                        setChatMessages([]); // 清空当前对话以重新测试
                      }}
                      className="w-full py-2 bg-slate-50 dark:bg-slate-900/50 text-slate-400 hover:text-primary-600 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all border border-dashed border-slate-200 dark:border-slate-800 flex items-center justify-center gap-2"
                    >
                      <Sparkles size={12} />
                      演示：切换为{useEmptyDemo ? '有数据' : '无数据'}状态
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Performance Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsModalOpen(false)}
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 sm:p-6"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-5xl bg-white dark:bg-slate-800 rounded-[2.5rem] shadow-2xl overflow-y-auto max-h-[90vh] border border-slate-100 dark:border-slate-700 custom-scrollbar"
            >
              <div className="relative p-8 sm:p-10">
                <button 
                  onClick={() => setIsModalOpen(false)}
                  className="absolute right-6 top-6 p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-full transition-colors z-10"
                >
                  <X size={24} className="text-slate-400" />
                </button>

                <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-10 gap-6 pr-12">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-primary-50 dark:bg-primary-900/20 text-primary-600 rounded-2xl">
                      <Award size={32} />
                    </div>
                    <div>
                      <div className="flex items-center gap-3 flex-wrap">
                        <h3 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">门店执行表现详情</h3>
                        <div className="flex items-center gap-2 px-3 py-1 bg-rose-50 dark:bg-rose-900/20 border border-rose-100 dark:border-rose-800 rounded-full">
                          <div className="w-1.5 h-1.5 bg-rose-500 rounded-full animate-pulse"></div>
                          <span className="text-[10px] font-black text-rose-600 dark:text-rose-400 uppercase tracking-widest">本周目标截止: 仅剩 4 天</span>
                        </div>
                      </div>
                      <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">执行表现与指标详情</p>
                    </div>
                  </div>

                  {/* Modal Tabs */}
                  <div className="flex bg-slate-100 dark:bg-slate-900/50 p-1 rounded-2xl border border-slate-200 dark:border-slate-700">
                    <button
                      onClick={() => setModalTab('current')}
                      className={`px-6 py-2 rounded-xl text-xs font-black transition-all ${
                        modalTab === 'current'
                          ? 'bg-white dark:bg-slate-800 text-primary-600 shadow-sm'
                          : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-200'
                      }`}
                    >
                      本周详情
                    </button>
                    <button
                      onClick={() => setModalTab('history')}
                      className={`px-6 py-2 rounded-xl text-xs font-black transition-all ${
                        modalTab === 'history'
                          ? 'bg-white dark:bg-slate-800 text-primary-600 shadow-sm'
                          : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-200'
                      }`}
                    >
                      历史记录
                    </button>
                  </div>
                </div>

                {modalTab === 'current' ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* 使用率 - 已达成 */}
                    <MetricCard 
                      title="使用率"
                      icon={<UserCheck size={18} />}
                      value="96.5"
                      unit="%"
                      nationalAvg="85.2%"
                      regionalAvg="86.8%"
                      target="95.0%"
                      achievement="96.5%"
                      progress={101.5}
                      aiSuggestion="上周工牌使用率为 96.5%，已提前达成 95% 的本周目标。建议保持当前的晨会检查机制，并作为标杆案例在区域内分享。"
                      color="primary"
                    />

                    {/* 有效单据率 - 已达成 */}
                    <MetricCard 
                      title="有效单据率"
                      icon={<CheckCircle2 size={18} />}
                      value="87.2"
                      unit="%"
                      nationalAvg="68.5%"
                      regionalAvg="70.2%"
                      target="85.0%"
                      achievement="87.2%"
                      progress={102.6}
                      aiSuggestion="上周有效单据率为 87.2%，表现优异，已达成 85% 的目标。建议继续保持录音与单据的高效关联，确保数据的持续准确性。"
                      color="amber"
                    />

                    {/* 首客试驾率 - 推进中 */}
                    <MetricCard 
                      title="首客试驾率"
                      icon={<Car size={18} />}
                      value="45.2"
                      unit="%"
                      nationalAvg="42.5%"
                      regionalAvg="44.0%"
                      target="55.0%"
                      achievement="48.5%"
                      progress={88.2}
                      aiSuggestion="上周首客试驾率为 45.2%，低于区域平均水平。建议本周在首次接待话术中强制加入试驾邀约环节，利用新车上市热度提升转化。"
                      color="indigo"
                    />

                    {/* 谈判推进率 - 推进中 */}
                    <MetricCard 
                      title="谈判推进率"
                      icon={<TrendingUp size={18} />}
                      value="32.8"
                      unit="%"
                      nationalAvg="30.5%"
                      regionalAvg="31.8%"
                      target="40.0%"
                      achievement="35.2%"
                      progress={88}
                      aiSuggestion="上周谈判推进率为 32.8%，表现平稳。本周目标 40%，建议重点关注二次到店客户的商务洽谈环节，利用上周积累的意向客户进行集中促单。"
                      color="orange"
                    />
                  </div>
                ) : (
                  <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <div className="bg-slate-50 dark:bg-slate-900/30 rounded-3xl border border-slate-100 dark:border-slate-700 overflow-hidden">
                      <table className="w-full text-left border-collapse">
                        <thead>
                          <tr className="bg-slate-100/50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-700">
                            <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">统计周期</th>
                            <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">使用率</th>
                            <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">有效单据率</th>
                            <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">首客试驾率</th>
                            <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">谈判推进率</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 dark:divide-slate-700">
                          {historyData.map((row, idx) => (
                            <tr key={idx} className="hover:bg-white dark:hover:bg-slate-800 transition-colors group">
                              <td className="px-6 py-5">
                                <span className="text-sm font-black text-slate-700 dark:text-slate-200">{row.period}</span>
                              </td>
                              <td className="px-6 py-5 text-center">
                                <div className="flex flex-col items-center gap-1">
                                  <div className="flex items-baseline gap-1">
                                    <span className={`text-sm font-black ${row.usage >= row.usageTarget ? 'text-emerald-500' : 'text-rose-500'}`}>{row.usage}%</span>
                                    <span className="text-[10px] font-bold text-slate-400">/ {row.usageTarget}%</span>
                                  </div>
                                  {row.usage >= row.usageTarget ? (
                                    <span className="text-[8px] font-black text-emerald-600 bg-emerald-50 dark:bg-emerald-900/20 px-1 rounded uppercase tracking-tighter">已达标</span>
                                  ) : (
                                    <span className="text-[8px] font-black text-rose-600 bg-rose-50 dark:bg-rose-900/20 px-1 rounded uppercase tracking-tighter">未达标</span>
                                  )}
                                </div>
                              </td>
                              <td className="px-6 py-5 text-center">
                                <div className="flex flex-col items-center gap-1">
                                  <div className="flex items-baseline gap-1">
                                    <span className={`text-sm font-black ${row.doc >= row.docTarget ? 'text-emerald-500' : 'text-rose-500'}`}>{row.doc}%</span>
                                    <span className="text-[10px] font-bold text-slate-400">/ {row.docTarget}%</span>
                                  </div>
                                  {row.doc >= row.docTarget ? (
                                    <span className="text-[8px] font-black text-emerald-600 bg-emerald-50 dark:bg-emerald-900/20 px-1 rounded uppercase tracking-tighter">已达标</span>
                                  ) : (
                                    <span className="text-[8px] font-black text-rose-600 bg-rose-50 dark:bg-rose-900/20 px-1 rounded uppercase tracking-tighter">未达标</span>
                                  )}
                                </div>
                              </td>
                              <td className="px-6 py-5 text-center">
                                <div className="flex flex-col items-center gap-1">
                                  <div className="flex items-baseline gap-1">
                                    <span className={`text-sm font-black ${row.testDrive >= row.testDriveTarget ? 'text-emerald-500' : 'text-rose-500'}`}>{row.testDrive}%</span>
                                    <span className="text-[10px] font-bold text-slate-400">/ {row.testDriveTarget}%</span>
                                  </div>
                                  {row.testDrive >= row.testDriveTarget ? (
                                    <span className="text-[8px] font-black text-emerald-600 bg-emerald-50 dark:bg-emerald-900/20 px-1 rounded uppercase tracking-tighter">已达标</span>
                                  ) : (
                                    <span className="text-[8px] font-black text-rose-600 bg-rose-50 dark:bg-rose-900/20 px-1 rounded uppercase tracking-tighter">未达标</span>
                                  )}
                                </div>
                              </td>
                              <td className="px-6 py-5 text-center">
                                <div className="flex flex-col items-center gap-1">
                                  <div className="flex items-baseline gap-1">
                                    <span className={`text-sm font-black ${row.negotiation >= row.negotiationTarget ? 'text-emerald-500' : 'text-rose-500'}`}>{row.negotiation}%</span>
                                    <span className="text-[10px] font-bold text-slate-400">/ {row.negotiationTarget}%</span>
                                  </div>
                                  {row.negotiation >= row.negotiationTarget ? (
                                    <span className="text-[8px] font-black text-emerald-600 bg-emerald-50 dark:bg-emerald-900/20 px-1 rounded uppercase tracking-tighter">已达标</span>
                                  ) : (
                                    <span className="text-[8px] font-black text-rose-600 bg-rose-50 dark:bg-rose-900/20 px-1 rounded uppercase tracking-tighter">未达标</span>
                                  )}
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}

                <div className="mt-10 pt-8 border-t border-slate-100 dark:border-slate-700 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <p className="text-sm font-bold text-slate-400">数据更新时间: {new Date().toLocaleDateString()}</p>
                  <button 
                    onClick={() => setIsModalOpen(false)}
                    className="w-full sm:w-48 py-4 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-2xl font-black text-sm hover:opacity-90 transition-opacity"
                  >
                    确 定
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default StoreDailyReport;
