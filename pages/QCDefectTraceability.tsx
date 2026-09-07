import React, { useState, useMemo } from 'react';
import { 
  Search, 
  Clock, 
  Check, 
  AlertCircle, 
  ChevronRight, 
  Calendar, 
  RotateCcw, 
  Filter, 
  X, 
  Play, 
  Pause, 
  Volume2, 
  Mic, 
  AlertTriangle, 
  User, 
  Car, 
  ShieldAlert,
  FileAudio,
  Layers,
  Sparkles,
  Info,
  Copy
} from 'lucide-react';

// Interfaces for QC Traceability Item
export interface QCDefectItem {
  id: string;
  traceCode: string; // 20位数字字母混合唯一编码
  customerName: string;
  salesperson: string;
  carModel: string;
  scene: '展厅接待' | '试乘试驾';
  store: string;
  enterTime: string;
  leaveTime: string;
  uploadTime: string;
  badgeId: string;
  audioFileName: string;
  audioDurationStr: string;
  isValid: boolean;
  failedReasonCount: number;
  conditions: {
    hasAudio: boolean; // 有录音
    audioDurationMatch: boolean; // 录音时长符合
    modelMentioned: boolean; // 已提车型
    sceneMatch: boolean; // 场景相符
    receptionDurationTarget: boolean; // 接待时长达标
  };
  defectSummary?: string;
  transcriptSnippet?: string;
}

// Mock Data representing realistic store customer visits & QC statuses
const MOCK_QC_ITEMS: QCDefectItem[] = [
  {
    id: 'QC-20260319-001',
    traceCode: 'QC20260319A8F921X7K0',
    customerName: '张先生',
    salesperson: '张三',
    carModel: '别克至境L7',
    scene: '展厅接待',
    store: '上海旗舰店',
    enterTime: '2026-03-19 10:15:22',
    leaveTime: '2026-03-19 10:45:10',
    uploadTime: '2026-03-19 10:50:05',
    badgeId: 'BADGE-SH-082',
    audioFileName: 'REC_20260319_101522_082.wav',
    audioDurationStr: '4分12秒',
    isValid: false,
    failedReasonCount: 1,
    conditions: {
      hasAudio: true,
      audioDurationMatch: false, // 录音时长不符
      modelMentioned: true,
      sceneMatch: true,
      receptionDurationTarget: true,
    },
    defectSummary: '客户进店内时长 29分48秒，但采集到的有效录音仅 4分12秒，低于门槛 10分钟',
    transcriptSnippet: '销售: 张先生您好，欢迎了解别克至境L7，我们这款车配备了最新的智能座舱... 客户: 好的，我先随便看看...'
  },
  {
    id: 'QC-20260319-002',
    traceCode: 'QC20260319B4E392M9L1',
    customerName: '李女士',
    salesperson: '李四',
    carModel: '别克GL8 ES陆尊',
    scene: '试乘试驾',
    store: '上海旗舰店',
    enterTime: '2026-03-19 11:02:15',
    leaveTime: '2026-03-19 11:38:00',
    uploadTime: '2026-03-19 11:42:10',
    badgeId: 'BADGE-SH-015',
    audioFileName: 'REC_20260319_110215_015.wav',
    audioDurationStr: '28分10秒',
    isValid: true,
    failedReasonCount: 0,
    conditions: {
      hasAudio: true,
      audioDurationMatch: true,
      modelMentioned: true,
      sceneMatch: true,
      receptionDurationTarget: true,
    },
    transcriptSnippet: '销售: 李女士，现在为您开启别克GL8 ES陆尊的智能驾驶辅助试驾路段... 客户: 提速很平顺，静音控制得不错。'
  },
  {
    id: 'QC-20260319-003',
    traceCode: 'QC20260319C1D847P3Q2',
    customerName: '王先生',
    salesperson: '王五',
    carModel: '别克昂科威Plus',
    scene: '展厅接待',
    store: '上海旗舰店',
    enterTime: '2026-03-19 13:20:00',
    leaveTime: '2026-03-19 13:28:45',
    uploadTime: '2026-03-19 13:30:12',
    badgeId: 'BADGE-SH-044',
    audioFileName: '无录音文件',
    audioDurationStr: '0分0秒',
    isValid: false,
    failedReasonCount: 3,
    conditions: {
      hasAudio: false, // 无录音
      audioDurationMatch: false, // 录音时长不符
      modelMentioned: false, // 未提车型
      sceneMatch: true,
      receptionDurationTarget: false, // 接待时长未达标 (仅8分45秒)
    },
    defectSummary: '工牌未开启录音或信号中断，且进离店时长仅 8分45秒，未达标',
    transcriptSnippet: '未采集到有效对话文本。'
  },
  {
    id: 'QC-20260319-004',
    traceCode: 'QC20260319D9G205R7W3',
    customerName: '陈先生',
    salesperson: '赵六',
    carModel: '别克E5',
    scene: '展厅接待',
    store: '北京朝阳店',
    enterTime: '2026-03-19 14:05:10',
    leaveTime: '2026-03-19 14:40:20',
    uploadTime: '2026-03-19 14:45:00',
    badgeId: 'BADGE-BJ-012',
    audioFileName: 'REC_20260319_140510_012.wav',
    audioDurationStr: '18分40秒',
    isValid: false,
    failedReasonCount: 1,
    conditions: {
      hasAudio: true,
      audioDurationMatch: true,
      modelMentioned: false, // 未提车型
      sceneMatch: true,
      receptionDurationTarget: true,
    },
    defectSummary: '接待过程中，销售顾问全程未明确提到或确认客户意向车型名称',
    transcriptSnippet: '销售: 您好，这款纯电SUV的续航和空间都很大，适合家用... 客户: 落地大概多少钱？'
  },
  {
    id: 'QC-20260319-005',
    traceCode: 'QC20260319E3H618V2N4',
    customerName: '周女士',
    salesperson: '孙七',
    carModel: '别克君越',
    scene: '试乘试驾',
    store: '广州天河店',
    enterTime: '2026-03-19 15:10:30',
    leaveTime: '2026-03-19 15:50:00',
    uploadTime: '2026-03-19 15:55:18',
    badgeId: 'BADGE-GZ-009',
    audioFileName: 'REC_20260319_151030_009.wav',
    audioDurationStr: '22分15秒',
    isValid: false,
    failedReasonCount: 1,
    conditions: {
      hasAudio: true,
      audioDurationMatch: true,
      modelMentioned: true,
      sceneMatch: false, // 场景不符 (标注为试驾但实际仅在固定休息区交流)
      receptionDurationTarget: true,
    },
    defectSummary: '定位与对话特征显示全程在洽谈区交流，未有动态车辆行驶或试驾签到记录',
    transcriptSnippet: '销售: 周女士，我们先把别克君越的试驾协议签一下，您喝杯咖啡... 客户: 今天有点赶时间，改天再试驾吧。'
  },
  {
    id: 'QC-20260319-006',
    traceCode: 'QC20260319F7K194W8Z5',
    customerName: '吴先生',
    salesperson: '周八',
    carModel: '别克威朗Pro',
    scene: '展厅接待',
    store: '深圳湾店',
    enterTime: '2026-03-19 16:00:12',
    leaveTime: '2026-03-19 16:35:40',
    uploadTime: '2026-03-19 16:40:02',
    badgeId: 'BADGE-SZ-031',
    audioFileName: 'REC_20260319_160012_031.wav',
    audioDurationStr: '31分20秒',
    isValid: true,
    failedReasonCount: 0,
    conditions: {
      hasAudio: true,
      audioDurationMatch: true,
      modelMentioned: true,
      sceneMatch: true,
      receptionDurationTarget: true,
    },
    transcriptSnippet: '销售: 吴先生，别克威朗Pro搭载高效动力组合，智能互联系统非常实用... 客户: 空间在这个级别确实不错。'
  },
  {
    id: 'QC-20260319-007',
    traceCode: 'QC20260319G2L850X4Y6',
    customerName: '郑先生',
    salesperson: '张三',
    carModel: '别克昂科旗',
    scene: '试乘试驾',
    store: '上海旗舰店',
    enterTime: '2026-03-19 16:45:00',
    leaveTime: '2026-03-19 17:15:10',
    uploadTime: '2026-03-19 17:20:00',
    badgeId: 'BADGE-SH-082',
    audioFileName: 'REC_20260319_164500_082.wav',
    audioDurationStr: '3分50秒',
    isValid: false,
    failedReasonCount: 1,
    conditions: {
      hasAudio: true,
      audioDurationMatch: false, // 录音时长不符
      modelMentioned: true,
      sceneMatch: true,
      receptionDurationTarget: true,
    },
    defectSummary: '试驾全程30分钟，但音频文件后半段静音，有效录音时长仅 3分50秒',
    transcriptSnippet: '销售: 郑先生，我们准备体验别克昂科旗的试驾路线... [后面录音异常中断或静音]'
  },
  {
    id: 'QC-20260319-008',
    traceCode: 'QC20260319H5M309Y1X7',
    customerName: '孙女士',
    salesperson: '李四',
    carModel: '别克GL8 ES陆尊',
    scene: '展厅接待',
    store: '上海旗舰店',
    enterTime: '2026-03-19 17:30:10',
    leaveTime: '2026-03-19 17:42:00',
    uploadTime: '2026-03-19 17:46:12',
    badgeId: 'BADGE-SH-015',
    audioFileName: 'REC_20260319_173010_015.wav',
    audioDurationStr: '11分20秒',
    isValid: false,
    failedReasonCount: 1,
    conditions: {
      hasAudio: true,
      audioDurationMatch: true,
      modelMentioned: true,
      sceneMatch: true,
      receptionDurationTarget: false, // 接待时长未达标 (仅11分50秒，规定须>15分)
    },
    defectSummary: '接待时长为 11分50秒，低于该门店规定的展厅有效接待门槛 (15分钟)',
    transcriptSnippet: '销售: 孙女士，别克GL8 ES陆尊目前优惠幅度很大... 客户: 我赶着去接小孩，给我拿张彩页就行。'
  }
];

// Helper Component for Rendering Individual QC Tag
const ConditionBadge: React.FC<{ 
  fulfilled: boolean; 
  passText: string; 
  failText: string;
  isGrayedOut?: boolean;
}> = ({ 
  fulfilled, 
  passText, 
  failText,
  isGrayedOut = false
}) => {
  if (isGrayedOut) {
    const text = fulfilled ? passText : failText;
    const Icon = fulfilled ? Check : AlertCircle;
    return (
      <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-slate-100/80 dark:bg-slate-800/60 text-slate-400 dark:text-slate-500 border border-slate-200/60 dark:border-slate-700/60 rounded-md text-[11px] font-medium whitespace-nowrap shrink-0">
        <Icon size={11} className="stroke-[2.5] text-slate-400 dark:text-slate-500 shrink-0" />
        {text}
      </span>
    );
  }
  if (fulfilled) {
    return (
      <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-emerald-50/80 dark:bg-emerald-950/30 text-emerald-700 dark:text-emerald-300 border border-emerald-200/50 dark:border-emerald-800/30 rounded-md text-[11px] font-medium whitespace-nowrap shrink-0">
        <Check size={11} className="stroke-[2.5] text-emerald-600 dark:text-emerald-400 shrink-0" />
        {passText}
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-rose-50/80 dark:bg-rose-950/30 text-rose-600 dark:text-rose-300 border border-rose-200/50 dark:border-rose-800/30 rounded-md text-[11px] font-medium whitespace-nowrap shrink-0">
      <AlertCircle size={11} className="stroke-[2.5] text-rose-500 dark:text-rose-400 shrink-0" />
      {failText}
    </span>
  );
};

const QCDefectTraceability: React.FC = () => {
  // Time Range Filters (YYYY-MM-DD 至 YYYY-MM-DD)
  const [startDate, setStartDate] = useState<string>('2026-03-19');
  const [endDate, setEndDate] = useState<string>('2026-03-19');

  // Scene Tab Filter: 全部, 展厅接待, 试乘试驾
  const [sceneTab, setSceneTab] = useState<'全部' | '展厅接待' | '试乘试驾'>('全部');

  // QC Status Filter: 'all' | 'invalid' | 'valid'
  const [qcStatusFilter, setQcStatusFilter] = useState<'all' | 'invalid' | 'valid'>('invalid');

  // Specific Defect Condition Filter
  const [defectTypeFilter, setDefectTypeFilter] = useState<string>('all');

  // Search input
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Selected Detail Item for Drawer / Modal
  const [detailModalItem, setDetailModalItem] = useState<QCDefectItem | null>(null);
  const [isPlayingAudio, setIsPlayingAudio] = useState<boolean>(false);

  // Copy unique code feedback state
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const handleCopyCode = (code: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(code).catch(() => {});
    }
    setCopiedCode(code);
    setTimeout(() => {
      setCopiedCode(null);
    }, 2000);
  };

  // Base scope items filtered by Scene Tab and Date Range
  const baseScopeItems = useMemo(() => {
    return MOCK_QC_ITEMS.filter(item => {
      // Scene tab filter
      if (sceneTab !== '全部' && item.scene !== sceneTab) return false;

      // Date range filter
      if (startDate) {
        const itemDate = item.enterTime.split(' ')[0];
        if (itemDate < startDate) return false;
      }
      if (endDate) {
        const itemDate = item.enterTime.split(' ')[0];
        if (itemDate > endDate) return false;
      }

      return true;
    });
  }, [sceneTab, startDate, endDate]);

  // Filtered List calculation (Filtered by QC status, defect condition & search)
  const filteredItems = useMemo(() => {
    return baseScopeItems.filter(item => {
      // QC Status filter
      if (qcStatusFilter === 'invalid' && item.isValid) return false;
      if (qcStatusFilter === 'valid' && !item.isValid) return false;

      // Specific defect condition filter
      if (defectTypeFilter === 'no_audio' && item.conditions.hasAudio) return false;
      if (defectTypeFilter === 'audio_duration_mismatch' && item.conditions.audioDurationMatch) return false;
      if (defectTypeFilter === 'no_model' && item.conditions.modelMentioned) return false;
      if (defectTypeFilter === 'scene_mismatch' && item.conditions.sceneMatch) return false;
      if (defectTypeFilter === 'reception_duration_short' && item.conditions.receptionDurationTarget) return false;

      // Search Query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesName = item.customerName.toLowerCase().includes(q);
        const matchesSales = item.salesperson.toLowerCase().includes(q);
        const matchesModel = item.carModel.toLowerCase().includes(q);
        const matchesBadge = item.badgeId.toLowerCase().includes(q);
        const matchesCode = (item.traceCode || '').toLowerCase().includes(q);
        if (!matchesName && !matchesSales && !matchesModel && !matchesBadge && !matchesCode) return false;
      }

      return true;
    });
  }, [baseScopeItems, qcStatusFilter, defectTypeFilter, searchQuery]);

  // Aggregate Stats strictly matching baseScopeItems
  const stats = useMemo(() => {
    const totalTraffic = baseScopeItems.length;
    const invalidQC = baseScopeItems.filter(i => !i.isValid).length;
    const validQC = baseScopeItems.filter(i => i.isValid).length;
    const validRate = totalTraffic > 0 ? ((validQC / totalTraffic) * 100).toFixed(1) : '0.0';
    const invalidRate = totalTraffic > 0 ? ((invalidQC / totalTraffic) * 100).toFixed(1) : '0.0';

    return {
      totalTraffic,
      validQC,
      invalidQC,
      validRate,
      invalidRate
    };
  }, [baseScopeItems]);

  return (
    <div className="max-w-7xl mx-auto space-y-6 animate-fade-in pb-16">
      
      {/* Top Header & Store / Time Selector Bar */}
      <div className="bg-white dark:bg-slate-800 p-5 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-700 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="p-1.5 bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 rounded-lg">
              <ShieldAlert size={20} />
            </span>
            <h1 className="text-xl font-extrabold text-gray-900 dark:text-white tracking-tight">
              接待记录查询
            </h1>
            <span className="px-2.5 py-0.5 bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 text-xs font-bold rounded-full border border-blue-200/60 dark:border-blue-800/40 flex items-center gap-1">
              <Sparkles size={12} /> 经销端质检追溯
            </span>
          </div>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            追溯客流与质检规则落地执行情况，针对有效/无效质检进行多维下钻与缺陷根因分析
          </p>
        </div>

        {/* Global Controls */}
        <div className="flex items-center gap-3">
          {/* Time Range Selector (YYYY-MM-DD 至 YYYY-MM-DD) */}
          <div className="flex items-center gap-1.5 bg-gray-50 dark:bg-slate-700/60 border border-gray-200 dark:border-slate-600 px-3 py-1.5 rounded-xl text-sm">
            <Calendar size={15} className="text-gray-400 shrink-0" />
            <span className="text-xs text-gray-500 dark:text-gray-400 font-medium whitespace-nowrap">时间：</span>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="bg-transparent text-xs font-bold text-gray-800 dark:text-gray-100 outline-none cursor-pointer"
            />
            <span className="text-xs text-gray-400 font-medium px-0.5">至</span>
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="bg-transparent text-xs font-bold text-gray-800 dark:text-gray-100 outline-none cursor-pointer"
            />
          </div>
        </div>
      </div>

      {/* Scene Tabs (全部 | 展厅接待 | 试乘试驾) - Positioned above KPI cards to filter metrics */}
      <div className="bg-white dark:bg-slate-800 p-2 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-700 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-1.5 overflow-x-auto">
          {(['全部', '展厅接待', '试乘试驾'] as const).map(tab => {
            const isActive = sceneTab === tab;
            return (
              <button
                key={tab}
                onClick={() => setSceneTab(tab)}
                className={`px-5 py-2.5 text-sm font-bold rounded-xl transition-all whitespace-nowrap cursor-pointer ${
                  isActive
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-700'
                }`}
              >
                {tab}
                <span className={`ml-2 px-2 py-0.5 text-xs rounded-full font-semibold ${isActive ? 'bg-blue-500 text-white' : 'bg-gray-100 dark:bg-slate-700 text-gray-600 dark:text-gray-300'}`}>
                  {tab === '全部' ? baseScopeItems.length : baseScopeItems.filter(i => i.scene === tab).length}
                </span>
              </button>
            );
          })}
        </div>

        <div className="px-3 text-xs text-gray-400 dark:text-gray-500 hidden md:block">
          切换场景页签将同步筛选下方客流汇总及质检指标
        </div>
      </div>

      {/* Top Statistical KPI Cards (工牌接待量、有效质检接待量、无效质检接待量) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        
        {/* Card 1: 工牌接待量 */}
        <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-700 flex flex-col justify-between relative overflow-hidden group">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-semibold text-gray-500 dark:text-gray-400">工牌接待量</span>
            <div className="p-2 bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 rounded-xl">
              <User size={20} />
            </div>
          </div>
          <div className="flex items-baseline gap-2 my-1">
            <span className="text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight">{stats.totalTraffic}</span>
          </div>
          <div className="text-xs text-gray-400 dark:text-gray-500 pt-3 border-t border-gray-100 dark:border-slate-700/60 flex justify-between">
            <span>{sceneTab}场景汇总</span>
          </div>
        </div>

        {/* Card 2: 有效质检接待量 */}
        <div 
          onClick={() => setQcStatusFilter('valid')}
          className={`bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border transition-all cursor-pointer relative overflow-hidden group ${
            qcStatusFilter === 'valid'
              ? 'border-emerald-500 ring-2 ring-emerald-500/20 bg-emerald-50/10'
              : 'border-gray-100 dark:border-slate-700 hover:border-emerald-300'
          }`}
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-semibold text-gray-500 dark:text-gray-400">有效质检接待量</span>
            <div className="p-2 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 rounded-xl">
              <Check size={20} className="stroke-[2.5]" />
            </div>
          </div>
          <div className="flex items-baseline gap-3 my-1">
            <span className="text-3xl font-extrabold text-emerald-600 dark:text-emerald-400 tracking-tight">{stats.validQC}</span>
            <span className="px-2 py-0.5 bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-300 text-xs font-extrabold rounded-md">
              占比 {stats.validRate}%
            </span>
          </div>
          <div className="text-xs text-gray-400 dark:text-gray-500 pt-3 border-t border-gray-100 dark:border-slate-700/60 flex justify-between">
            <span>5项规则均已达成</span>
          </div>
        </div>

        {/* Card 3: 无效质检接待量 (Highlightable & Click to Drilldown) */}
        <div 
          onClick={() => setQcStatusFilter('invalid')}
          className={`bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border transition-all cursor-pointer relative overflow-hidden group ${
            qcStatusFilter === 'invalid'
              ? 'border-red-500 ring-2 ring-red-500/20 bg-red-50/10'
              : 'border-gray-100 dark:border-slate-700 hover:border-red-300'
          }`}
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-semibold text-gray-500 dark:text-gray-400">无效质检接待量</span>
            <div className="p-2 bg-red-50 dark:bg-red-950/40 text-red-500 dark:text-red-400 rounded-xl">
              <AlertCircle size={20} className="stroke-[2.5]" />
            </div>
          </div>
          <div className="flex items-baseline gap-3 my-1">
            <span className="text-3xl font-extrabold text-red-500 dark:text-red-400 tracking-tight">{stats.invalidQC}</span>
            <span className="px-2 py-0.5 bg-red-100 dark:bg-red-900/40 text-red-700 dark:text-red-300 text-xs font-extrabold rounded-md">
              占比 {stats.invalidRate}%
            </span>
          </div>
          <div className="text-xs text-gray-400 dark:text-gray-500 pt-3 border-t border-gray-100 dark:border-slate-700/60 flex justify-between">
            <span>存在1项或多项规则未达标</span>
          </div>
        </div>

      </div>

      {/* Main Content Area: Filter Options & List */}
      <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-700 overflow-hidden">
        
        {/* Sub Filter Toolbar */}
        <div className="p-4 bg-white dark:bg-slate-800 border-b border-gray-100 dark:border-slate-700 flex flex-wrap items-center justify-between gap-3">
          
          {/* Status Buttons */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setQcStatusFilter('invalid')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-extrabold transition-all flex items-center gap-1.5 cursor-pointer ${
                qcStatusFilter === 'invalid'
                  ? 'bg-red-50 dark:bg-red-950/50 text-red-600 dark:text-red-400 border border-red-200 dark:border-red-800/50 shadow-2xs'
                  : 'bg-gray-100 dark:bg-slate-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200'
              }`}
            >
              <AlertCircle size={14} /> 仅看无效质检 ({stats.invalidQC})
            </button>
            <button
              onClick={() => setQcStatusFilter('valid')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-extrabold transition-all flex items-center gap-1.5 cursor-pointer ${
                qcStatusFilter === 'valid'
                  ? 'bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800/50 shadow-2xs'
                  : 'bg-gray-100 dark:bg-slate-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200'
              }`}
            >
              <Check size={14} /> 仅看有效质检 ({stats.validQC})
            </button>
            <button
              onClick={() => setQcStatusFilter('all')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-extrabold transition-all cursor-pointer ${
                qcStatusFilter === 'all'
                  ? 'bg-gray-800 text-white dark:bg-slate-200 dark:text-slate-900 shadow-2xs'
                  : 'bg-gray-100 dark:bg-slate-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200'
              }`}
            >
              全部记录 ({stats.totalTraffic})
            </button>
          </div>

          {/* Filter Dropdown for Specific Defect Types & Search Box */}
          <div className="flex items-center gap-3 w-full lg:w-auto">
            {qcStatusFilter !== 'valid' && (
              <div className="flex items-center gap-1.5">
                <span className="text-xs text-gray-500 dark:text-gray-400 font-medium whitespace-nowrap">缺陷类型：</span>
                <select
                  value={defectTypeFilter}
                  onChange={(e) => setDefectTypeFilter(e.target.value)}
                  className="px-3 py-1.5 bg-gray-50 dark:bg-slate-700 border border-gray-200 dark:border-slate-600 rounded-xl text-xs font-medium text-gray-700 dark:text-gray-200 outline-none cursor-pointer focus:ring-2 focus:ring-blue-500"
                >
                  <option value="all">全部缺陷条件</option>
                  <option value="no_audio">未包含有效录音</option>
                  <option value="audio_duration_mismatch">录音时长不符</option>
                  <option value="no_model">未明确提及车型</option>
                  <option value="scene_mismatch">场景不符</option>
                  <option value="reception_duration_short">接待时长未达标</option>
                </select>
              </div>
            )}

            {/* Search */}
            <div className="relative flex-1 lg:w-60">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-3.5 h-3.5" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="搜索客户/顾问/车型..."
                className="w-full pl-8 pr-3 py-1.5 bg-gray-50 dark:bg-slate-700 border border-gray-200 dark:border-slate-600 rounded-xl text-xs outline-none focus:ring-2 focus:ring-blue-500 dark:text-white"
              />
              {searchQuery && (
                <button onClick={() => setSearchQuery('')} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                  <X size={12} />
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Detailed Items Cards Grid / List (Exact Card Reproduction based on Screenshot) */}
        <div className="p-6 bg-gray-50/50 dark:bg-slate-900/40">
          {filteredItems.length === 0 ? (
            <div className="py-16 text-center bg-white dark:bg-slate-800 rounded-2xl border border-dashed border-gray-200 dark:border-slate-700">
              <ShieldAlert className="w-12 h-12 text-gray-300 dark:text-gray-600 mx-auto mb-3" />
              <p className="text-sm font-bold text-gray-600 dark:text-gray-300">暂无符合条件的质检记录</p>
              <p className="text-xs text-gray-400 mt-1">您可以尝试更改门店、时间范围或筛选条件</p>
              <button
                onClick={() => {
                  setQcStatusFilter('all');
                  setDefectTypeFilter('all');
                  setSearchQuery('');
                  setSceneTab('全部');
                }}
                className="mt-4 px-4 py-2 bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 text-xs font-bold rounded-xl hover:bg-blue-100 transition-colors"
              >
                重置所有筛选
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
              {filteredItems.map(item => (
                <div 
                  key={item.id}
                  className="bg-white dark:bg-slate-800 rounded-2xl p-5 shadow-xs border border-gray-100 dark:border-slate-700/80 hover:shadow-md transition-all flex flex-col justify-between"
                >
                  <div>
                    {/* Header: 客户姓名 + 车型 Badge + 场景 Badge | 销售顾问 */}
                    <div className="flex items-center justify-between mb-3.5">
                      <div className="flex items-center gap-2">
                        <span className="text-lg font-bold text-gray-900 dark:text-white tracking-tight">
                          {item.customerName}
                        </span>
                        {/* 车型 Badge */}
                        <span className="px-2.5 py-0.5 bg-gray-100 dark:bg-slate-700/70 text-gray-600 dark:text-gray-300 text-xs font-medium rounded-md">
                          {item.carModel}
                        </span>
                        {/* 场景 Badge */}
                        <span className="px-2.5 py-0.5 bg-blue-50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-300 text-xs font-medium rounded-md border border-blue-100/80 dark:border-blue-900/30">
                          {item.scene}
                        </span>
                      </div>
                      <div className="text-xs text-gray-500 dark:text-gray-400 font-normal">
                        销售顾问: <span className="text-gray-800 dark:text-gray-200 font-semibold">{item.salesperson}</span>
                      </div>
                    </div>

                    {/* Time Box: 进店时间 | 离店时间 */}
                    <div className="bg-slate-50/80 dark:bg-slate-900/40 rounded-xl p-3 border border-slate-100 dark:border-slate-700/50 grid grid-cols-2 gap-3 mb-2.5">
                      <div>
                        <p className="text-[11px] text-gray-400 dark:text-gray-500 font-medium mb-0.5">进店时间</p>
                        <p className="text-xs sm:text-sm font-semibold text-gray-800 dark:text-gray-100 font-mono tracking-tight">
                          {item.enterTime}
                        </p>
                      </div>
                      <div className="border-l border-slate-200/60 dark:border-slate-700/60 pl-3">
                        <p className="text-[11px] text-gray-400 dark:text-gray-500 font-medium mb-0.5">离店时间</p>
                        <p className="text-xs sm:text-sm font-semibold text-gray-800 dark:text-gray-100 font-mono tracking-tight">
                          {item.leaveTime}
                        </p>
                      </div>
                    </div>

                    {/* Unique Code Line & Upload Time */}
                    <div className="flex flex-col gap-1.5 text-[11px] mb-3 px-0.5">
                      <div className="flex items-center justify-between text-gray-500 dark:text-gray-400">
                        <div className="flex items-center gap-1.5 min-w-0">
                          <span className="shrink-0 text-gray-400 dark:text-gray-500 font-medium">接待编号</span>
                          <span className="font-mono text-gray-800 dark:text-gray-200 font-semibold tracking-tight truncate">
                            {item.traceCode}
                          </span>
                        </div>
                        <button
                          onClick={(e) => handleCopyCode(item.traceCode, e)}
                          className="inline-flex items-center gap-1 px-2 py-0.5 text-[10px] font-semibold text-blue-600 dark:text-blue-400 hover:text-blue-700 bg-blue-50 dark:bg-blue-950/50 hover:bg-blue-100 dark:hover:bg-blue-900/60 rounded transition-all shrink-0 cursor-pointer"
                          title="点击复制接待编号"
                        >
                          {copiedCode === item.traceCode ? (
                            <>
                              <Check size={11} className="text-emerald-500 stroke-[2.5]" />
                              <span className="text-emerald-600 dark:text-emerald-400 font-bold">已复制</span>
                            </>
                          ) : (
                            <>
                              <Copy size={11} />
                              <span>复制编码</span>
                            </>
                          )}
                        </button>
                      </div>

                      <div className="flex items-center gap-1.5 text-gray-400 dark:text-gray-500">
                        <Clock size={12} className="text-gray-400 shrink-0" />
                        <span>上传时间</span>
                        <span className="font-medium text-gray-600 dark:text-gray-300 font-mono">
                          {item.uploadTime}
                        </span>
                      </div>
                    </div>

                    {/* 5 Fixed QC Conditions Tags (固定的5个条件达成了哪些没达成哪些 - 不换行) */}
                    <div className="flex items-center gap-1.5 pt-2.5 border-t border-gray-100 dark:border-slate-700/60 overflow-x-auto no-scrollbar whitespace-nowrap">
                      {/* Condition 1: 有录音 */}
                      <ConditionBadge 
                        fulfilled={item.conditions.hasAudio} 
                        passText="有录音" 
                        failText="无录音" 
                      />
                      {/* Condition 2: 录音时长符合 */}
                      <ConditionBadge 
                        fulfilled={item.conditions.audioDurationMatch} 
                        passText="录音时长符合" 
                        failText="录音时长不符" 
                        isGrayedOut={!item.isValid && !item.conditions.hasAudio}
                      />
                      {/* Condition 3: 已提车型 */}
                      <ConditionBadge 
                        fulfilled={item.conditions.modelMentioned} 
                        passText="已提车型" 
                        failText="未提车型" 
                        isGrayedOut={!item.isValid && !item.conditions.hasAudio}
                      />
                      {/* Condition 4: 场景相符 */}
                      <ConditionBadge 
                        fulfilled={item.conditions.sceneMatch} 
                        passText="场景相符" 
                        failText="场景不符" 
                        isGrayedOut={!item.isValid && !item.conditions.hasAudio}
                      />
                      {/* Condition 5: 接待时长达标 */}
                      <ConditionBadge 
                        fulfilled={item.conditions.receptionDurationTarget} 
                        passText="接待时长达标" 
                        failText="接待时长未达标" 
                        isGrayedOut={!item.isValid && !item.conditions.hasAudio}
                      />
                    </div>
                  </div>

                  {/* Card Bottom: 查看详情 Link (仅针对有效质检展示) */}
                  {item.isValid && (
                    <div className="flex items-center justify-end mt-4 pt-2.5 border-t border-gray-100 dark:border-slate-700/50">
                      <button 
                        onClick={() => setDetailModalItem(item)}
                        className="text-xs font-semibold text-blue-600 dark:text-blue-400 hover:text-blue-700 flex items-center gap-0.5 transition-colors whitespace-nowrap cursor-pointer"
                      >
                        查看详情 <ChevronRight size={14} />
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Detail Drilldown Modal (有效质检 - 全景展开详情) */}
      {detailModalItem && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs z-50 flex items-center justify-center p-3 sm:p-6 animate-fade-in overflow-y-auto">
          <div className="bg-white dark:bg-slate-800 rounded-2xl max-w-7xl w-full max-h-[92vh] overflow-y-auto shadow-2xl border border-gray-200 dark:border-slate-700 flex flex-col">
            
            {/* Top Modal Close Header */}
            <div className="flex items-center justify-between px-5 py-3 border-b border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-900/50 sticky top-0 z-10">
              <div className="flex items-center gap-3">
                <span className="font-bold text-gray-900 dark:text-white text-base">
                  【有效质检】{detailModalItem.customerName} - 接待质检全景详情
                </span>
                <span className="text-xs font-mono bg-blue-50 text-blue-600 px-2 py-0.5 rounded border border-blue-100 dark:bg-blue-950/50 dark:text-blue-300 dark:border-blue-900">
                  接待编号: {detailModalItem.traceCode}
                </span>
              </div>
              <button 
                onClick={() => setDetailModalItem(null)}
                className="p-1.5 rounded-lg hover:bg-gray-200 dark:hover:bg-slate-700 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-white transition-colors cursor-pointer"
                title="关闭"
              >
                <X size={18} />
              </button>
            </div>

            <div className="p-4 space-y-4 text-xs">
              
              {/* 1. Top Audio Header & Player Bar Section */}
              <div className="bg-gray-50/90 dark:bg-slate-900/60 p-4 rounded-xl border border-gray-200/80 dark:border-slate-700/80 space-y-3">
                {/* File Title Line & Stats */}
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-medium text-gray-600 dark:text-gray-300">场景录音文件:</span>
                      <span className="px-1.5 py-0.5 bg-blue-600 text-white font-semibold text-[11px] rounded">第1段</span>
                    </div>
                    <h3 className="font-mono font-bold text-sm text-gray-900 dark:text-gray-100 tracking-tight">
                      20260726171700_SJ17410012_20260726172600
                    </h3>
                    <p className="text-gray-500 dark:text-gray-400 text-[11px] mt-0.5">
                      员工: <span className="font-medium text-gray-800 dark:text-gray-200">{detailModalItem.salesperson}</span> &nbsp;|&nbsp; 门店: <span className="font-medium text-gray-800 dark:text-gray-200">{detailModalItem.store}</span>
                    </p>
                  </div>

                  {/* Timers on right */}
                  <div className="flex items-center gap-6 text-[11px]">
                    <div>
                      <span className="font-bold text-base text-gray-900 dark:text-white block">{detailModalItem.audioDurationStr || '6分19秒'}</span>
                      <span className="text-emerald-600 dark:text-emerald-400 flex items-center gap-1 font-medium">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block"></span> 语音时长
                      </span>
                    </div>
                    <div className="border-l border-gray-200 dark:border-slate-700 pl-4">
                      <span className="font-mono font-bold text-gray-800 dark:text-gray-200 block">{detailModalItem.enterTime}</span>
                      <span className="text-blue-600 dark:text-blue-400 flex items-center gap-1 font-medium">
                        <span className="w-1.5 h-1.5 rounded-full bg-blue-500 inline-block"></span> 开始时间
                      </span>
                    </div>
                    <div className="border-l border-gray-200 dark:border-slate-700 pl-4">
                      <span className="font-mono font-bold text-gray-800 dark:text-gray-200 block">{detailModalItem.leaveTime}</span>
                      <span className="text-rose-500 dark:text-rose-400 flex items-center gap-1 font-medium">
                        <span className="w-1.5 h-1.5 rounded-full bg-rose-500 inline-block"></span> 结束时间
                      </span>
                    </div>
                  </div>
                </div>

                {/* Audio Track Bar */}
                <div className="bg-white dark:bg-slate-800 p-2.5 rounded-lg border border-gray-200 dark:border-slate-700 flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full border-2 border-emerald-500 flex items-center justify-center text-emerald-600 dark:text-emerald-400 shrink-0">
                    <Play size={14} className="ml-0.5 fill-emerald-500 text-emerald-500" />
                  </div>
                  <span className="font-bold text-gray-600 dark:text-gray-300 text-[11px] shrink-0">1X</span>
                  <div className="flex-1 space-y-1">
                    <div className="flex justify-between text-[10px] text-gray-400 font-mono">
                      <span>{detailModalItem.enterTime} 00:00:01</span>
                      <span>说明</span>
                      <span>00:06:19</span>
                    </div>
                    {/* Progress bar */}
                    <div className="h-2.5 bg-gray-100 dark:bg-slate-700 rounded relative overflow-hidden flex items-center px-1">
                      <div className="h-1 bg-blue-500 w-1/3 rounded"></div>
                      <div className="h-full w-0.5 bg-blue-600 absolute left-1/3"></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* 2. Main 3-Column Content Layout */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
                
                {/* Left Column: 评测结果 */}
                <div className="lg:col-span-3 bg-white dark:bg-slate-800 rounded-xl border border-gray-200 dark:border-slate-700 overflow-hidden flex flex-col">
                  <div className="border-b border-gray-200 dark:border-slate-700 px-3 py-2 bg-gray-50 dark:bg-slate-900/50">
                    <span className="text-blue-600 dark:text-blue-400 font-bold border-b-2 border-blue-600 dark:border-blue-400 pb-2 inline-block">
                      评测结果
                    </span>
                  </div>

                  {/* Table Header */}
                  <div className="px-3 py-2 bg-gray-50/50 dark:bg-slate-800/80 border-b border-gray-100 dark:border-slate-700 flex justify-between font-bold text-gray-600 dark:text-gray-300 text-[11px]">
                    <span>{detailModalItem.carModel}(14分)</span>
                    <div className="flex gap-4">
                      <span>命中情况</span>
                      <span>分数</span>
                    </div>
                  </div>

                  {/* Items List */}
                  <div className="divide-y divide-gray-100 dark:divide-slate-700/60 text-[11px]">
                    <div className="px-3 py-2 flex items-center justify-between text-gray-700 dark:text-gray-300">
                      <span className="flex items-center gap-1 font-medium">
                        <ChevronRight size={12} className="text-gray-400" /> 展厅接待(2/4)
                      </span>
                      <div className="flex gap-5">
                        <span className="text-gray-500">50%</span>
                        <span className="font-bold text-gray-800 dark:text-gray-200">2分</span>
                      </div>
                    </div>

                    <div className="px-3 py-2 flex items-center justify-between text-gray-700 dark:text-gray-300">
                      <span className="flex items-center gap-1 font-medium">
                        <ChevronRight size={12} className="text-gray-400" /> 需求分析(5/6)
                      </span>
                      <div className="flex gap-5">
                        <span className="text-gray-500">83.33%</span>
                        <span className="font-bold text-gray-800 dark:text-gray-200">5分</span>
                      </div>
                    </div>

                    <div className="px-3 py-2 flex items-center justify-between text-gray-700 dark:text-gray-300">
                      <span className="flex items-center gap-1 font-medium">
                        <ChevronRight size={12} className="text-gray-400" /> 邀约入车体验(1/1)
                      </span>
                      <div className="flex gap-5">
                        <span className="text-gray-500">100%</span>
                        <span className="font-bold text-gray-800 dark:text-gray-200">1分</span>
                      </div>
                    </div>

                    <div className="px-3 py-2 flex items-center justify-between text-gray-700 dark:text-gray-300">
                      <span className="flex items-center gap-1 font-medium">
                        <ChevronRight size={12} className="text-gray-400" /> 主动开口留资(1/1)
                      </span>
                      <div className="flex gap-5">
                        <span className="text-gray-500">100%</span>
                        <span className="font-bold text-gray-800 dark:text-gray-200">1分</span>
                      </div>
                    </div>

                    <div className="px-3 py-2 flex items-center justify-between text-gray-700 dark:text-gray-300">
                      <span className="flex items-center gap-1 font-medium">
                        <ChevronRight size={12} className="text-gray-400" /> 邀约试驾(1/1)
                      </span>
                      <div className="flex gap-5">
                        <span className="text-gray-500">100%</span>
                        <span className="font-bold text-gray-800 dark:text-gray-200">1分</span>
                      </div>
                    </div>

                    <div className="px-3 py-2 flex items-center justify-between text-gray-700 dark:text-gray-300">
                      <span className="flex items-center gap-1 font-medium">
                        <ChevronRight size={12} className="text-gray-400" /> 购车款项(1/1)
                      </span>
                      <div className="flex gap-5">
                        <span className="text-gray-500">100%</span>
                        <span className="font-bold text-gray-800 dark:text-gray-200">1分</span>
                      </div>
                    </div>

                    <div className="px-3 py-2 flex items-center justify-between text-gray-700 dark:text-gray-300">
                      <span className="flex items-center gap-1 font-medium">
                        <ChevronRight size={12} className="text-gray-400" /> 产品介绍(3/5)
                      </span>
                      <div className="flex gap-5">
                        <span className="text-gray-500">60%</span>
                        <span className="font-bold text-gray-800 dark:text-gray-200">3分</span>
                      </div>
                    </div>
                  </div>

                  {/* Bottom Audio Info Box */}
                  <div className="mt-auto p-3 bg-gray-50 dark:bg-slate-900/50 border-t border-gray-100 dark:border-slate-700">
                    <span className="font-bold text-gray-800 dark:text-gray-200 block mb-1">{detailModalItem.carModel}录音详情</span>
                    <div className="p-2 bg-white dark:bg-slate-800 rounded border border-gray-200 dark:border-slate-700 text-[11px] text-gray-600 dark:text-gray-300 font-mono">
                      第1段: {detailModalItem.enterTime} – {detailModalItem.leaveTime}
                    </div>
                  </div>
                </div>

                {/* Middle Column: 通话记录 */}
                <div className="lg:col-span-5 bg-white dark:bg-slate-800 rounded-xl border border-gray-200 dark:border-slate-700 flex flex-col">
                  {/* Header Toolbar */}
                  <div className="p-3 border-b border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-900/50 flex flex-wrap items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-gray-900 dark:text-white text-sm">通话记录</span>
                      <label className="flex items-center gap-1 text-gray-500 text-[11px]">
                        <input type="checkbox" readOnly className="rounded" /> 切换角色
                      </label>
                    </div>
                    <div className="flex items-center gap-2 text-gray-500 text-[11px]">
                      <span className="px-2 py-0.5 bg-white dark:bg-slate-800 border rounded text-gray-600 dark:text-gray-300">在对话中... 0</span>
                      <span className="text-blue-600 dark:text-blue-400">文本下载</span>
                      <span className="text-blue-600 dark:text-blue-400">添加词库</span>
                    </div>
                  </div>

                  {/* Chat Messages List */}
                  <div className="p-3 space-y-3 overflow-y-auto max-h-[380px] bg-slate-50/50 dark:bg-slate-900/30">
                    
                    {/* Message 1: Customer */}
                    <div className="flex items-start gap-2">
                      <div className="w-7 h-7 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center text-[10px] font-bold shrink-0">
                        客
                      </div>
                      <div className="space-y-1 max-w-[85%]">
                        <div className="text-[10px] text-gray-400 flex items-center gap-1">
                          <span className="text-blue-600">播放 📶</span>
                          <span>切换 ➔ 编辑 ✏️</span>
                          <span className="font-bold text-gray-700 dark:text-gray-300">客户</span>
                          <span className="font-mono">2026-07-26 17:19:42</span>
                        </div>
                        <div className="p-2 bg-white dark:bg-slate-800 rounded-lg border border-gray-200 dark:border-slate-700 text-gray-800 dark:text-gray-200 text-xs shadow-2xs">
                          啊，对。
                        </div>
                      </div>
                    </div>

                    {/* Message 2: Staff */}
                    <div className="flex items-start gap-2 justify-end">
                      <div className="space-y-1 max-w-[85%] text-right">
                        <div className="text-[10px] text-gray-400 flex items-center gap-1 justify-end">
                          <span className="font-mono">2026-07-26 17:19:43</span>
                          <span className="font-bold text-emerald-700 dark:text-emerald-400">员工</span>
                          <span>✏️ 编辑 ⬅️ 切换 📶 播放</span>
                        </div>
                        <div className="p-2 bg-emerald-600 text-white rounded-lg text-xs text-left shadow-2xs">
                          行，先给一下我的名片，我是店里的销售顾问{detailModalItem.salesperson}。
                        </div>
                      </div>
                      <div className="w-7 h-7 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center text-[10px] font-bold shrink-0">
                        销
                      </div>
                    </div>

                    {/* Message 3: Staff */}
                    <div className="flex items-start gap-2 justify-end">
                      <div className="space-y-1 max-w-[85%] text-right">
                        <div className="text-[10px] text-gray-400 flex items-center gap-1 justify-end">
                          <span className="font-mono">2026-07-26 17:19:47</span>
                          <span className="font-bold text-emerald-700 dark:text-emerald-400">员工</span>
                        </div>
                        <div className="p-2 bg-emerald-600 text-white rounded-lg text-xs text-left shadow-2xs">
                          {detailModalItem.customerName}您怎么称呼？
                        </div>
                      </div>
                      <div className="w-7 h-7 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center text-[10px] font-bold shrink-0">
                        销
                      </div>
                    </div>

                    {/* Message 4: Customer */}
                    <div className="flex items-start gap-2">
                      <div className="w-7 h-7 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center text-[10px] font-bold shrink-0">
                        客
                      </div>
                      <div className="space-y-1 max-w-[85%]">
                        <div className="text-[10px] text-gray-400 flex items-center gap-1">
                          <span className="font-bold text-gray-700 dark:text-gray-300">客户</span>
                          <span className="font-mono">2026-07-26 17:19:48</span>
                        </div>
                        <div className="p-2 bg-white dark:bg-slate-800 rounded-lg border border-gray-200 dark:border-slate-700 text-gray-800 dark:text-gray-200 text-xs shadow-2xs">
                          姓{detailModalItem.customerName.slice(0, 1)}。
                        </div>
                      </div>
                    </div>

                    {/* Message 5: Staff */}
                    <div className="flex items-start gap-2 justify-end">
                      <div className="space-y-1 max-w-[85%] text-right">
                        <div className="text-[10px] text-gray-400 flex items-center gap-1 justify-end">
                          <span className="font-mono">2026-07-26 17:19:49</span>
                          <span className="font-bold text-emerald-700 dark:text-emerald-400">员工</span>
                        </div>
                        <div className="p-2 bg-emerald-600 text-white rounded-lg text-xs text-left shadow-2xs">
                          来，咱行，{detailModalItem.customerName}来咱休息区稍坐，了解一下{detailModalItem.carModel}。
                        </div>
                      </div>
                      <div className="w-7 h-7 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center text-[10px] font-bold shrink-0">
                        销
                      </div>
                    </div>

                    {/* Message 6: Staff */}
                    <div className="flex items-start gap-2 justify-end">
                      <div className="space-y-1 max-w-[85%] text-right">
                        <div className="text-[10px] text-gray-400 flex items-center gap-1 justify-end">
                          <span className="font-mono">2026-07-26 17:19:52</span>
                          <span className="font-bold text-emerald-700 dark:text-emerald-400">员工</span>
                        </div>
                        <div className="p-2 bg-emerald-600 text-white rounded-lg text-xs text-left shadow-2xs">
                          天气炎热，看咱来点什么饮品？
                        </div>
                      </div>
                      <div className="w-7 h-7 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center text-[10px] font-bold shrink-0">
                        销
                      </div>
                    </div>

                    {/* Message 7: Customer */}
                    <div className="flex items-start gap-2">
                      <div className="w-7 h-7 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center text-[10px] font-bold shrink-0">
                        客
                      </div>
                      <div className="space-y-1 max-w-[85%]">
                        <div className="text-[10px] text-gray-400 flex items-center gap-1">
                          <span className="font-bold text-gray-700 dark:text-gray-300">客户</span>
                          <span className="font-mono">2026-07-26 17:19:55</span>
                        </div>
                        <div className="p-2 bg-white dark:bg-slate-800 rounded-lg border border-gray-200 dark:border-slate-700 text-gray-800 dark:text-gray-200 text-xs shadow-2xs">
                          茶水、咖啡都可以。
                        </div>
                      </div>
                    </div>

                  </div>
                </div>

                {/* Right Column: 标签 & 客户画像 */}
                <div className="lg:col-span-4 bg-white dark:bg-slate-800 rounded-xl border border-gray-200 dark:border-slate-700 flex flex-col">
                  {/* Header Tabs */}
                  <div className="p-2 border-b border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-900/50 flex items-center justify-between text-[11px]">
                    <div className="flex gap-3">
                      <span className="text-gray-500">会话详情</span>
                      <span className="font-bold text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400 pb-1">标签</span>
                      <span className="text-gray-500">会话总结</span>
                      <span className="text-gray-500">销售分析</span>
                    </div>
                  </div>

                  {/* Sub actions */}
                  <div className="p-2.5 border-b border-gray-100 dark:border-slate-700 flex justify-between text-[11px] text-blue-600 dark:text-blue-400">
                    <span className="hover:underline cursor-pointer">下载标签清单</span>
                    <span className="hover:underline cursor-pointer">▼ 标签显示配置</span>
                  </div>

                  {/* Label Content */}
                  <div className="p-3 space-y-2 text-[11px] overflow-y-auto max-h-[380px]">
                    <p className="font-bold text-gray-800 dark:text-gray-200 text-[11px] mb-2">
                      客户意向判定与客户标签 / 新客户意向判定和客户标签
                    </p>

                    {/* Tag Pills List */}
                    <div className="flex flex-col gap-1.5">
                      <div className="px-2.5 py-1 bg-blue-600 text-white font-medium rounded-md text-[11px]">
                        客户基础信息 - 身份(个人)
                      </div>
                      <div className="px-2.5 py-1 bg-teal-600 text-white font-medium rounded-md text-[11px]">
                        客户基础信息 - 购车阶段(了解阶段)
                      </div>
                      <div className="px-2.5 py-1 bg-rose-600 text-white font-medium rounded-md text-[11px]">
                        客户基础信息 - 客户类型(未提及)
                      </div>
                      <div className="px-2.5 py-1 bg-amber-600 text-white font-medium rounded-md text-[11px]">
                        意向相关信息 - 意向车型({detailModalItem.carModel})
                      </div>
                      <div className="px-2.5 py-1 bg-amber-500 text-white font-medium rounded-md text-[11px]">
                        意向相关信息 - 意向配置(未提及)
                      </div>
                      <div className="px-2.5 py-1 bg-emerald-600 text-white font-medium rounded-md text-[11px]">
                        意向相关信息 - 意向动力(未提及)
                      </div>
                      <div className="px-2.5 py-1 bg-purple-600 text-white font-medium rounded-md text-[11px]">
                        意向相关信息 - 意向外观/内饰(未提及)
                      </div>
                      <div className="px-2.5 py-1 bg-pink-600 text-white font-medium rounded-md text-[11px]">
                        客户核心需求 - 痛点(产品使用)
                      </div>
                      <div className="px-2.5 py-1 bg-amber-700 text-white font-medium rounded-md text-[11px]">
                        客户核心需求 - 关注点(空间,油耗,价格)
                      </div>
                      <div className="px-2.5 py-1 bg-lime-600 text-white font-medium rounded-md text-[11px]">
                        客户核心需求 - 用途(家用)
                      </div>
                      <div className="px-2.5 py-1 bg-indigo-600 text-white font-medium rounded-md text-[11px]">
                        预算与购车方式 - 预算区间(未提及)
                      </div>
                      <div className="px-2.5 py-1 bg-cyan-600 text-white font-medium rounded-md text-[11px]">
                        预算与购车方式 - 购车方式(未提及)
                      </div>
                      <div className="px-2.5 py-1 bg-red-500 text-white font-medium rounded-md text-[11px]">
                        预算与购车方式 - 置换意向(有置换)
                      </div>
                    </div>
                  </div>

                </div>

              </div>

            </div>

          </div>
        </div>
      )}

    </div>
  );
};

export default QCDefectTraceability;
