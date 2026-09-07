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
  Copy,
  Building2,
  MapPin,
  ArrowUpDown,
  ChevronDown,
  ChevronUp,
  Download,
  ArrowLeft,
  Activity,
  CheckCircle2,
  XCircle,
  BarChart3,
  SlidersHorizontal,
  Compass,
  FileText,
  Globe2,
  Store,
  Navigation
} from 'lucide-react';
import { 
  MOCK_REGIONS_DATA, 
  RegionData, 
  SubRegionData, 
  StoreRegionalMetric, 
  ReceptionDetailCard,
  aggregateStoresMetrics 
} from './macReceptionData';

// Re-export interfaces for external consumers if needed
export type { StoreRegionalMetric, ReceptionDetailCard, RegionData, SubRegionData };

// Sample drill-down cards with rich dialogues and AI tags
const MOCK_DRILLDOWN_CARDS: ReceptionDetailCard[] = [
  {
    id: 'RC-001',
    traceCode: 'QC20260319A8F921X7K0',
    storeCode: 'SH2001',
    storeName: '上海永达旗舰店',
    region: '华东大区',
    mac: '上海MAC',
    customerName: '张先生',
    salesperson: '王顾问',
    carModel: '凯迪拉克XT5 PHEV',
    scene: '展厅接待',
    enterTime: '2026-03-19 10:15:20',
    leaveTime: '2026-03-19 10:48:30',
    uploadTime: '2026-03-19 10:52:10',
    badgeId: 'BADGE-SH01-082',
    audioFileName: 'REC_20260319_101520_082.wav',
    audioDurationStr: '31分40秒',
    receptionDurationStr: '33分10秒',
    isValid: true,
    score: 94,
    failedReasonCount: 0,
    conditions: {
      hasAudio: true,
      audioDurationMatch: true,
      modelMentioned: true,
      sceneMatch: true,
      receptionDurationTarget: true,
    },
    dialogueTranscript: [
      { speaker: 'sales', time: '00:15', text: '张先生您好！欢迎来到旗舰店，请问今天主要看哪款车型？', tag: '问候迎宾' },
      { speaker: 'customer', time: '00:32', text: '你好，听说新出的凯迪拉克XT5插混版上市了，想了解下油耗和智驾配置。', tag: '意向车型' },
      { speaker: 'sales', time: '01:05', text: '您眼光真好！XT5 PHEV搭载了全新混动系统与蜂鸟底盘，支持全场景纯电与混动无缝切换...', tag: '核心卖点' },
      { speaker: 'customer', time: '08:20', text: '这块33英寸的环幕屏确实震撼，车机系统流畅度怎么样？', tag: '静态品鉴' },
      { speaker: 'sales', time: '09:10', text: '标配高通8155芯片，支持连续语音指令与离线导航。我为您演示一下AI语音控制...', tag: '功能演示' },
      { speaker: 'customer', time: '22:45', text: '置换补贴和目前的金融政策大概怎样？', tag: '商务洽谈' },
      { speaker: 'sales', time: '24:10', text: '目前厂家有专享置换补贴15000元，并支持5年低息或0首付方案，稍后我给您拉一份明细表。', tag: '促单跟进' }
    ],
    processScores: {
      greeting: 98,
      needsAnalysis: 95,
      productPresentation: 94,
      testDriveOrDemo: 90,
      objectionHandling: 92,
      followupClosing: 95
    },
    aiInsight: {
      intentLevel: '高意向',
      coreInterest: ['蜂鸟底盘', '33英寸曲屏', '混动综合续航', '置换政策'],
      priceSensitivity: '中',
      nextAction: '建议24小时内发送专属金融测算单，并预约周末深度试驾。'
    }
  },
  {
    id: 'RC-002',
    traceCode: 'QC20260319B4E392M9L1',
    storeCode: 'SH2001',
    storeName: '上海永达旗舰店',
    region: '华东大区',
    mac: '上海MAC',
    customerName: '李女士',
    salesperson: '陈顾问',
    carModel: '凯迪拉克CT5',
    scene: '试乘试驾',
    enterTime: '2026-03-19 11:10:00',
    leaveTime: '2026-03-19 11:52:15',
    uploadTime: '2026-03-19 11:55:00',
    badgeId: 'BADGE-SH01-015',
    audioFileName: 'REC_20260319_111000_015.wav',
    audioDurationStr: '38分25秒',
    receptionDurationStr: '42分15秒',
    isValid: true,
    score: 91,
    failedReasonCount: 0,
    conditions: {
      hasAudio: true,
      audioDurationMatch: true,
      modelMentioned: true,
      sceneMatch: true,
      receptionDurationTarget: true,
    },
    dialogueTranscript: [
      { speaker: 'sales', time: '00:30', text: '李女士，试驾协议已签署完毕，接下来我们体验CT5的城区NOP智驾和后驱操控。', tag: '试驾准备' },
      { speaker: 'customer', time: '05:10', text: '好的，刚才在展厅看了外观很运动，看看开起来动力响应如何。', tag: '客户期待' },
      { speaker: 'sales', time: '12:40', text: '请注意看仪表盘智驾蓝灯已亮起，车辆正在自动保持车道并根据前车调节车速...', tag: '智驾体验' },
      { speaker: 'customer', time: '20:15', text: '过弯很平稳，底盘支撑性很足，刹车脚感也很线性。', tag: '客户评价' }
    ],
    processScores: {
      greeting: 92,
      needsAnalysis: 90,
      productPresentation: 93,
      testDriveOrDemo: 96,
      objectionHandling: 88,
      followupClosing: 89
    },
    aiInsight: {
      intentLevel: '高意向',
      coreInterest: ['后驱操控', '城区NOP智驾', '外形设计'],
      priceSensitivity: '低',
      nextAction: '推送选装包对比表，锁定期货车源配额。'
    }
  },
  {
    id: 'RC-003',
    traceCode: 'QC20260319C9D184K3J2',
    storeCode: 'SH2001',
    storeName: '上海永达旗舰店',
    region: '华东大区',
    mac: '上海MAC',
    customerName: '刘先生',
    salesperson: '赵顾问',
    carModel: '凯迪拉克IQ锐歌',
    scene: '展厅接待',
    enterTime: '2026-03-19 14:05:10',
    leaveTime: '2026-03-19 14:12:40',
    uploadTime: '2026-03-19 14:15:00',
    badgeId: 'BADGE-SH01-044',
    audioFileName: '',
    audioDurationStr: '0分00秒',
    receptionDurationStr: '7分30秒',
    isValid: false,
    failedReasonCount: 2,
    conditions: {
      hasAudio: false,
      audioDurationMatch: false,
      modelMentioned: false,
      sceneMatch: false,
      receptionDurationTarget: false,
    },
    defectSummary: '未采集到有效会话录音文件，且接待时长不足10分钟质检基准。',
    dialogueTranscript: []
  },
  {
    id: 'RC-004',
    traceCode: 'QC20260319D2B571P8Q4',
    storeCode: 'SH2001',
    storeName: '上海永达旗舰店',
    region: '华东大区',
    mac: '上海MAC',
    customerName: '周女士',
    salesperson: '孙顾问',
    carModel: '凯迪拉克GT4',
    scene: '展厅接待',
    enterTime: '2026-03-19 15:30:00',
    leaveTime: '2026-03-19 16:05:20',
    uploadTime: '2026-03-19 16:10:00',
    badgeId: 'BADGE-SH01-029',
    audioFileName: 'REC_20260319_153000_029.wav',
    audioDurationStr: '32分10秒',
    receptionDurationStr: '35分20秒',
    isValid: true,
    score: 89,
    failedReasonCount: 0,
    conditions: {
      hasAudio: true,
      audioDurationMatch: true,
      modelMentioned: true,
      sceneMatch: true,
      receptionDurationTarget: true,
    },
    dialogueTranscript: [
      { speaker: 'sales', time: '00:20', text: '周女士下午好！GT4这款先锋轿跑SUV非常适合年轻都市通勤...', tag: '车型介绍' },
      { speaker: 'customer', time: '05:30', text: '这台双色车顶和红色卡钳很抢眼，后排坐两个人空间挤不挤？', tag: '空间关切' },
      { speaker: 'sales', time: '06:10', text: '轴距达到2800mm，我们一起到后排实际坐下感受一下腿部余量...', tag: '实车体验' }
    ],
    processScores: {
      greeting: 90,
      needsAnalysis: 88,
      productPresentation: 92,
      testDriveOrDemo: 86,
      objectionHandling: 87,
      followupClosing: 90
    },
    aiInsight: {
      intentLevel: '中意向',
      coreInterest: ['颜值外观', '后排空间', '日常通勤便利性'],
      priceSensitivity: '高',
      nextAction: '跟进春季免息金融贴息方案，邀约周末带家人二次试乘。'
    }
  },
  {
    id: 'RC-005',
    traceCode: 'QC20260319E5A893T1W9',
    storeCode: 'SH2001',
    storeName: '上海永达旗舰店',
    region: '华东大区',
    mac: '上海MAC',
    customerName: '吴先生',
    salesperson: '李顾问',
    carModel: '凯迪拉克XT6',
    scene: '试乘试驾',
    enterTime: '2026-03-19 16:40:00',
    leaveTime: '2026-03-19 16:48:20',
    uploadTime: '2026-03-19 16:50:00',
    badgeId: 'BADGE-SH01-067',
    audioFileName: 'REC_20260319_164000_067.wav',
    audioDurationStr: '4分20秒',
    receptionDurationStr: '8分20秒',
    isValid: false,
    failedReasonCount: 2,
    conditions: {
      hasAudio: true,
      audioDurationMatch: false,
      modelMentioned: true,
      sceneMatch: true,
      receptionDurationTarget: false,
    },
    defectSummary: '试驾接待时长低于考核标准（8分20秒 < 15分钟），且录音时长过短。',
    dialogueTranscript: [
      { speaker: 'sales', time: '00:10', text: '吴先生，今天时间比较赶，我们简单在园区绕一圈。', tag: '异常提示' },
      { speaker: 'customer', time: '02:00', text: '好的，我待会儿还有个电话会议，先感受一下视野。', tag: '客户说明' }
    ]
  }
];

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
      <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-slate-100/80 dark:bg-slate-800/60 text-slate-400 dark:text-slate-500 border border-slate-200/60 dark:border-slate-700/60 rounded-md text-[11px] font-medium whitespace-nowrap shrink-0">
        <Icon size={11} className="stroke-[2.5] text-slate-400 dark:text-slate-500 shrink-0" />
        {text}
      </span>
    );
  }
  if (fulfilled) {
    return (
      <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-emerald-50/80 dark:bg-emerald-950/30 text-emerald-700 dark:text-emerald-300 border border-emerald-200/50 dark:border-emerald-800/30 rounded-md text-[11px] font-medium whitespace-nowrap shrink-0">
        <Check size={11} className="stroke-[2.5] text-emerald-600 dark:text-emerald-400 shrink-0" />
        {passText}
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-rose-50/80 dark:bg-rose-950/30 text-rose-600 dark:text-rose-300 border border-rose-200/50 dark:border-rose-800/30 rounded-md text-[11px] font-medium whitespace-nowrap shrink-0">
      <AlertCircle size={11} className="stroke-[2.5] text-rose-500 dark:text-rose-400 shrink-0" />
      {failText}
    </span>
  );
};

const ReceptionRecordsMac: React.FC = () => {
  // Time Range Filters (YYYY-MM-DD 至 YYYY-MM-DD)
  const [startDate, setStartDate] = useState<string>('2026-03-19');
  const [endDate, setEndDate] = useState<string>('2026-03-19');

  // Scene Tab Filter: 全部, 展厅接待, 试乘试驾
  const [sceneTab, setSceneTab] = useState<'全部' | '展厅接待' | '试乘试驾'>('全部');

  // Hierarchy Navigation State:
  // Level 1: HQ (selectedRegion = null)
  // Level 2: Big Region (selectedRegion != null, selectedSubRegion = null)
  // Level 3: Sub-region / Area / MAC (selectedRegion != null, selectedSubRegion != null, drilledStore = null)
  // Level 4: Store Drill-Down Cards (drilledStore != null)
  const [selectedRegion, setSelectedRegion] = useState<RegionData | null>(null);
  const [selectedSubRegion, setSelectedSubRegion] = useState<SubRegionData | null>(null);
  const [drilledStore, setDrilledStore] = useState<StoreRegionalMetric | null>(null);

  // Search input for current level's table
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Table Sort State
  const [sortField, setSortField] = useState<string>('totalBadge');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');

  // Drill-Down Cards Filter within a Store
  const [cardStatusFilter, setCardStatusFilter] = useState<'all' | 'valid' | 'invalid'>('all');
  const [cardSearchQuery, setCardSearchQuery] = useState<string>('');

  // Detail Modal State for Valid / Invalid Cards
  const [detailModalItem, setDetailModalItem] = useState<ReceptionDetailCard | null>(null);
  const [isPlayingAudio, setIsPlayingAudio] = useState<boolean>(false);
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

  // Helper to extract all stores for HQ
  const allHqStores = useMemo(() => {
    const stores: StoreRegionalMetric[] = [];
    MOCK_REGIONS_DATA.forEach(r => {
      r.subRegions.forEach(sr => {
        stores.push(...sr.stores);
      });
    });
    return stores;
  }, []);

  // Helper to extract all stores for current region
  const regionStores = useMemo(() => {
    if (!selectedRegion) return [];
    const stores: StoreRegionalMetric[] = [];
    selectedRegion.subRegions.forEach(sr => {
      stores.push(...sr.stores);
    });
    return stores;
  }, [selectedRegion]);

  // Current scope active overview stats (The 3 Indicator Cards)
  const activeOverviewStats = useMemo(() => {
    if (drilledStore) {
      // Level 4: Specific Store
      return aggregateStoresMetrics([drilledStore], sceneTab);
    }
    if (selectedSubRegion) {
      // Level 3: Sub-region / MAC
      return aggregateStoresMetrics(selectedSubRegion.stores, sceneTab);
    }
    if (selectedRegion) {
      // Level 2: Big Region
      return aggregateStoresMetrics(regionStores, sceneTab);
    }
    // Level 1: HQ (All Regions)
    return aggregateStoresMetrics(allHqStores, sceneTab);
  }, [drilledStore, selectedSubRegion, selectedRegion, sceneTab, regionStores, allHqStores]);

  // Navigation handlers
  const handleGoToHq = () => {
    setSelectedRegion(null);
    setSelectedSubRegion(null);
    setDrilledStore(null);
    setSearchQuery('');
  };

  const handleSelectRegion = (region: RegionData) => {
    setSelectedRegion(region);
    setSelectedSubRegion(null);
    setDrilledStore(null);
    setSearchQuery('');
  };

  const handleSelectSubRegion = (subRegion: SubRegionData) => {
    setSelectedSubRegion(subRegion);
    setDrilledStore(null);
    setSearchQuery('');
  };

  const handleSelectStore = (store: StoreRegionalMetric) => {
    setDrilledStore(store);
  };

  // 1. Process HQ Level Data (List of Big Regions)
  const processedRegionsList = useMemo(() => {
    return MOCK_REGIONS_DATA.map(reg => {
      const storesInReg: StoreRegionalMetric[] = [];
      reg.subRegions.forEach(sr => storesInReg.push(...sr.stores));
      const stats = aggregateStoresMetrics(storesInReg, sceneTab);
      return {
        region: reg,
        regionId: reg.regionId,
        regionName: reg.regionName,
        subRegionCount: reg.subRegions.length,
        storeCount: storesInReg.length,
        totalBadge: stats.totalBadge,
        allBadge: stats.allBadge,
        showroomBadge: stats.showroomBadge,
        testDriveBadge: stats.testDriveBadge,
        validQC: stats.validQC,
        invalidQC: stats.invalidQC,
        validRate: stats.validRate,
        invalidRate: stats.invalidRate,
      };
    }).filter(item => {
      if (searchQuery.trim()) {
        return item.regionName.toLowerCase().includes(searchQuery.toLowerCase().trim());
      }
      return true;
    }).sort((a, b) => {
      let valA = (a as any)[sortField] ?? 0;
      let valB = (b as any)[sortField] ?? 0;
      if (typeof valA === 'string') valA = parseFloat(valA) || 0;
      if (typeof valB === 'string') valB = parseFloat(valB) || 0;
      return sortDirection === 'asc' ? valA - valB : valB - valA;
    });
  }, [sceneTab, searchQuery, sortField, sortDirection]);

  // 2. Process Region Level Data (List of Sub-Regions / Areas under selectedRegion)
  const processedSubRegionsList = useMemo(() => {
    if (!selectedRegion) return [];
    return selectedRegion.subRegions.map(sr => {
      const stats = aggregateStoresMetrics(sr.stores, sceneTab);
      return {
        subRegion: sr,
        subRegionId: sr.subRegionId,
        subRegionName: sr.subRegionName,
        macCode: sr.macCode,
        storeCount: sr.stores.length,
        totalBadge: stats.totalBadge,
        allBadge: stats.allBadge,
        showroomBadge: stats.showroomBadge,
        testDriveBadge: stats.testDriveBadge,
        validQC: stats.validQC,
        invalidQC: stats.invalidQC,
        validRate: stats.validRate,
        invalidRate: stats.invalidRate,
      };
    }).filter(item => {
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        return item.subRegionName.toLowerCase().includes(q) || item.macCode.toLowerCase().includes(q);
      }
      return true;
    }).sort((a, b) => {
      let valA = (a as any)[sortField] ?? 0;
      let valB = (b as any)[sortField] ?? 0;
      if (typeof valA === 'string') valA = parseFloat(valA) || 0;
      if (typeof valB === 'string') valB = parseFloat(valB) || 0;
      return sortDirection === 'asc' ? valA - valB : valB - valA;
    });
  }, [selectedRegion, sceneTab, searchQuery, sortField, sortDirection]);

  // 3. Process Sub-Region / MAC Level Data (List of Stores under selectedSubRegion)
  const processedStoresList = useMemo(() => {
    if (!selectedSubRegion) return [];
    return selectedSubRegion.stores.map(store => {
      let activeBadge = store.totalBadgeReception;
      let activeValid = store.validQCReception;
      let activeInvalid = store.invalidQCReception;

      if (sceneTab === '展厅接待') {
        activeBadge = store.showroomReception;
        activeValid = store.showroomValidQC;
        activeInvalid = store.showroomInvalidQC;
      } else if (sceneTab === '试乘试驾') {
        activeBadge = store.testDriveReception;
        activeValid = store.testDriveValidQC;
        activeInvalid = store.testDriveInvalidQC;
      }

      const validRate = activeBadge > 0 ? ((activeValid / activeBadge) * 100).toFixed(1) : '0.0';

      return {
        store,
        storeId: store.storeId,
        storeCode: store.storeCode,
        storeName: store.storeName,
        totalBadgeReception: store.totalBadgeReception,
        showroomReception: store.showroomReception,
        testDriveReception: store.testDriveReception,
        validQCReception: store.validQCReception,
        invalidQCReception: store.invalidQCReception,
        activeBadge,
        activeValid,
        activeInvalid,
        validRate,
      };
    }).filter(item => {
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        return item.storeName.toLowerCase().includes(q) || item.storeCode.toLowerCase().includes(q);
      }
      return true;
    }).sort((a, b) => {
      let valA = (a as any)[sortField] ?? 0;
      let valB = (b as any)[sortField] ?? 0;
      if (typeof valA === 'string') valA = parseFloat(valA) || 0;
      if (typeof valB === 'string') valB = parseFloat(valB) || 0;
      return sortDirection === 'asc' ? valA - valB : valB - valA;
    });
  }, [selectedSubRegion, sceneTab, searchQuery, sortField, sortDirection]);

  // Handle table sorting toggle
  const handleSort = (field: string) => {
    if (sortField === field) {
      if (sortDirection === 'desc') {
        setSortDirection('asc');
      } else {
        setSortField('totalBadge');
        setSortDirection('desc');
      }
    } else {
      setSortField(field);
      setSortDirection('desc');
    }
  };

  // Filter Drill-down cards for selected store
  const storeDrillDownCards = useMemo(() => {
    if (!drilledStore) return [];
    return MOCK_DRILLDOWN_CARDS.map(card => ({
      ...card,
      storeCode: drilledStore.storeCode,
      storeName: drilledStore.storeName,
      region: drilledStore.regionName,
      mac: drilledStore.macCode,
    })).filter(card => {
      // Scene filter (sync with sceneTab)
      if (sceneTab !== '全部' && card.scene !== sceneTab) return false;
      // Status filter
      if (cardStatusFilter === 'valid' && !card.isValid) return false;
      if (cardStatusFilter === 'invalid' && card.isValid) return false;
      // Search query
      if (cardSearchQuery.trim()) {
        const q = cardSearchQuery.toLowerCase();
        const matchSales = card.salesperson.toLowerCase().includes(q);
        const matchCust = card.customerName.toLowerCase().includes(q);
        const matchModel = card.carModel.toLowerCase().includes(q);
        const matchCode = card.traceCode.toLowerCase().includes(q);
        const matchBadge = card.badgeId.toLowerCase().includes(q);
        if (!matchSales && !matchCust && !matchModel && !matchCode && !matchBadge) return false;
      }
      return true;
    });
  }, [drilledStore, sceneTab, cardStatusFilter, cardSearchQuery]);

  // CSV Export for Current Level
  const handleExportCsv = () => {
    let headers: string[] = [];
    let rows: (string | number)[][] = [];
    let fileName = `接待记录查询_${startDate}-${endDate}.csv`;

    if (!selectedRegion) {
      // HQ Level (Big Regions)
      fileName = `全国各大区接待质检汇总_${startDate}-${endDate}.csv`;
      headers = ['序号', '大区名称', '下辖小区数', '覆盖门店数', '工牌接待量', '展厅接待量', '试乘试驾量', '有效质检接待量', '有效率', '无效质检接待量'];
      rows = processedRegionsList.map((item, idx) => [
        idx + 1,
        item.regionName,
        item.subRegionCount,
        item.storeCount,
        item.allBadge,
        item.showroomBadge,
        item.testDriveBadge,
        item.validQC,
        `${item.validRate}%`,
        item.invalidQC
      ]);
    } else if (selectedRegion && !selectedSubRegion) {
      // Region Level (Sub-regions)
      fileName = `${selectedRegion.regionName}_各小区接待质检明细_${startDate}-${endDate}.csv`;
      headers = ['序号', '小区名称', '对应MAC', '覆盖门店数', '工牌接待量', '展厅接待量', '试乘试驾量', '有效质检接待量', '有效率', '无效质检接待量'];
      rows = processedSubRegionsList.map((item, idx) => [
        idx + 1,
        item.subRegionName,
        item.macCode,
        item.storeCount,
        item.allBadge,
        item.showroomBadge,
        item.testDriveBadge,
        item.validQC,
        `${item.validRate}%`,
        item.invalidQC
      ]);
    } else if (selectedSubRegion && !drilledStore) {
      // Sub-Region / MAC Level (Stores)
      fileName = `${selectedSubRegion.subRegionName}_(${selectedSubRegion.macCode})_门店接待记录_${startDate}-${endDate}.csv`;
      headers = ['序号', '经销商CODE', '经销商简称', '工牌接待量', '展厅接待量', '试乘试驾量', '有效质检接待量', '无效质检接待量'];
      rows = processedStoresList.map((item, idx) => [
        idx + 1,
        item.storeCode,
        item.storeName,
        item.totalBadgeReception,
        item.showroomReception,
        item.testDriveReception,
        item.validQCReception,
        item.invalidQCReception
      ]);
    }

    const csvContent =
      'data:text/csv;charset=utf-8,\uFEFF' +
      [headers.join(','), ...rows.map(e => e.map(val => `"${val}"`).join(','))].join('\n');

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', fileName);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="max-w-7xl mx-auto space-y-5 animate-fade-in pb-16">
      
      {/* TOP CONTROLS: Scene Tabs & Date Range Filter */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        {/* 1. SCENE TABS: 全部 / 展厅接待 / 试乘试驾 */}
        <div className="flex items-center bg-gray-100/80 dark:bg-slate-800/90 p-1.5 rounded-2xl w-fit border border-gray-200/60 dark:border-slate-700/60 shadow-2xs">
          {(['全部', '展厅接待', '试乘试驾'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setSceneTab(tab)}
              className={`px-5 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                sceneTab === tab
                  ? 'bg-white dark:bg-slate-700 text-indigo-600 dark:text-indigo-300 shadow-xs ring-1 ring-black/5'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Date Filter */}
        <div className="flex items-center gap-2 shrink-0">
          <div className="flex items-center gap-1.5 bg-white dark:bg-slate-800 px-3.5 py-2 rounded-xl border border-gray-200 dark:border-slate-700 shadow-2xs text-xs">
            <Calendar size={14} className="text-gray-400" />
            <input 
              type="date" 
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="bg-transparent border-none outline-none text-gray-700 dark:text-gray-200 font-mono text-xs cursor-pointer"
            />
            <span className="text-gray-400 font-medium">至</span>
            <input 
              type="date" 
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="bg-transparent border-none outline-none text-gray-700 dark:text-gray-200 font-mono text-xs cursor-pointer"
            />
          </div>
        </div>
      </div>

      {/* 3. THREE CORE INDICATOR CARDS (工牌接待量、有效质检接待量、无效质检接待量) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        
        {/* Card 1: 工牌接待量 */}
        <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-gray-100 dark:border-slate-700/80 shadow-xs relative overflow-hidden flex flex-col justify-between group hover:shadow-md transition-all">
          <div className="absolute -right-4 -top-4 w-24 h-24 bg-blue-50 dark:bg-blue-950/30 rounded-full opacity-60 pointer-events-none group-hover:scale-110 transition-transform"></div>
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-semibold text-gray-500 dark:text-gray-400">
                工牌接待量
              </span>
              <span className="p-2 rounded-xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400">
                <Activity size={18} />
              </span>
            </div>
            <div className="flex items-baseline">
              <span className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-white tracking-tight font-mono">
                {activeOverviewStats.totalBadge.toLocaleString()}
              </span>
            </div>
          </div>
        </div>

        {/* Card 2: 有效质检接待量 */}
        <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-gray-100 dark:border-slate-700/80 shadow-xs relative overflow-hidden flex flex-col justify-between group hover:shadow-md transition-all">
          <div className="absolute -right-4 -top-4 w-24 h-24 bg-emerald-50 dark:bg-emerald-950/30 rounded-full opacity-60 pointer-events-none group-hover:scale-110 transition-transform"></div>
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-semibold text-gray-500 dark:text-gray-400">
                有效质检接待量
              </span>
              <span className="p-2 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400">
                <CheckCircle2 size={18} />
              </span>
            </div>
            <div className="flex items-baseline">
              <span className="text-3xl sm:text-4xl font-extrabold text-emerald-600 dark:text-emerald-400 tracking-tight font-mono">
                {activeOverviewStats.validQC.toLocaleString()}
              </span>
            </div>
          </div>
        </div>

        {/* Card 3: 无效质检接待量 */}
        <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-gray-100 dark:border-slate-700/80 shadow-xs relative overflow-hidden flex flex-col justify-between group hover:shadow-md transition-all">
          <div className="absolute -right-4 -top-4 w-24 h-24 bg-rose-50 dark:bg-rose-950/30 rounded-full opacity-60 pointer-events-none group-hover:scale-110 transition-transform"></div>
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-semibold text-gray-500 dark:text-gray-400">
                无效质检接待量
              </span>
              <span className="p-2 rounded-xl bg-rose-50 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400">
                <XCircle size={18} />
              </span>
            </div>
            <div className="flex items-baseline">
              <span className="text-3xl sm:text-4xl font-extrabold text-rose-600 dark:text-rose-400 tracking-tight font-mono">
                {activeOverviewStats.invalidQC.toLocaleString()}
              </span>
            </div>
          </div>
        </div>

      </div>

      {/* 4. PROMINENT DEDICATED HIERARCHY BREADCRUMB & DRILL-DOWN NAVIGATION BAR (ABOVE THE LIST TABLE) */}
      <div className="bg-white dark:bg-slate-800 p-3.5 sm:p-4 rounded-2xl shadow-xs border-2 border-indigo-100/80 dark:border-slate-700/90 flex flex-col md:flex-row md:items-center justify-between gap-3.5 bg-linear-to-r from-white via-indigo-50/20 to-white dark:from-slate-800 dark:via-slate-800 dark:to-slate-800">
        
        {/* Left: Step Breadcrumbs Trail */}
        <div className="flex items-center flex-wrap gap-2 sm:gap-2.5">
          <div className="flex items-center gap-1.5 text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider mr-1 shrink-0">
            <Compass size={15} className="text-indigo-500" />
            <span>当前层级路径</span>
            <span className="text-gray-300 dark:text-slate-600">:</span>
          </div>

          {/* Level 1: 全国总部 */}
          <button
            onClick={handleGoToHq}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
              !selectedRegion
                ? 'bg-indigo-600 text-white shadow-sm ring-2 ring-indigo-300 dark:ring-indigo-800 font-bold'
                : 'bg-gray-50 dark:bg-slate-700/80 text-gray-700 dark:text-gray-200 border border-gray-200/80 dark:border-slate-600 hover:bg-indigo-50 hover:text-indigo-600 hover:border-indigo-300'
            }`}
          >
            <Globe2 size={14} className={!selectedRegion ? 'text-white' : 'text-indigo-500'} />
            <span>全国总部</span>
            {!selectedRegion && (
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0"></span>
            )}
          </button>

          {/* Level 2: 大区 */}
          {selectedRegion && (
            <>
              <ChevronRight size={15} className="text-gray-400 dark:text-slate-500 shrink-0 stroke-[2.5]" />
              <button
                onClick={() => {
                  setSelectedSubRegion(null);
                  setDrilledStore(null);
                  setSearchQuery('');
                }}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                  selectedRegion && !selectedSubRegion
                    ? 'bg-indigo-600 text-white shadow-sm ring-2 ring-indigo-300 dark:ring-indigo-800 font-bold'
                    : 'bg-gray-50 dark:bg-slate-700/80 text-gray-700 dark:text-gray-200 border border-gray-200/80 dark:border-slate-600 hover:bg-indigo-50 hover:text-indigo-600 hover:border-indigo-300'
                }`}
              >
                <MapPin size={14} className={selectedRegion && !selectedSubRegion ? 'text-white' : 'text-indigo-500'} />
                <span>{selectedRegion.regionName}</span>
                {selectedRegion && !selectedSubRegion && (
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0"></span>
                )}
              </button>
            </>
          )}

          {/* Level 3: 小区 / MAC */}
          {selectedSubRegion && (
            <>
              <ChevronRight size={15} className="text-gray-400 dark:text-slate-500 shrink-0 stroke-[2.5]" />
              <button
                onClick={() => {
                  setDrilledStore(null);
                  setSearchQuery('');
                }}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                  selectedSubRegion && !drilledStore
                    ? 'bg-indigo-600 text-white shadow-sm ring-2 ring-indigo-300 dark:ring-indigo-800 font-bold'
                    : 'bg-gray-50 dark:bg-slate-700/80 text-gray-700 dark:text-gray-200 border border-gray-200/80 dark:border-slate-600 hover:bg-indigo-50 hover:text-indigo-600 hover:border-indigo-300'
                }`}
              >
                <Navigation size={14} className={selectedSubRegion && !drilledStore ? 'text-white' : 'text-indigo-500'} />
                <span>{selectedSubRegion.subRegionName} ({selectedSubRegion.macCode})</span>
                {selectedSubRegion && !drilledStore && (
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0"></span>
                )}
              </button>
            </>
          )}

          {/* Level 4: 门店 */}
          {drilledStore && (
            <>
              <ChevronRight size={15} className="text-gray-400 dark:text-slate-500 shrink-0 stroke-[2.5]" />
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-indigo-600 text-white rounded-xl text-xs sm:text-sm font-bold shadow-sm ring-2 ring-indigo-300 dark:ring-indigo-800">
                <Store size={14} className="text-white" />
                <span>{drilledStore.storeName} ({drilledStore.storeCode})</span>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0"></span>
              </span>
            </>
          )}
        </div>
      </div>

      {/* Time Range Notice above list */}
      <div className="text-xs text-gray-500 dark:text-gray-400 font-medium px-1">
        统计时间范围为：{startDate}- {endDate}
      </div>

      {/* 4. DYNAMIC BREAKDOWN SECTION DEPENDING ON NAVIGATION DEPTH */}

      {/* ========================================================================= */}
      {/* LEVEL 1: HQ PERSPECTIVE - Big Regions Breakdown Table (全国各大区数据) */}
      {/* ========================================================================= */}
      {!selectedRegion && (
        <div className="bg-white dark:bg-slate-800 rounded-2xl p-5 shadow-xs border border-gray-100 dark:border-slate-700/80 space-y-4">
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <Globe2 className="text-indigo-600 dark:text-indigo-400 w-5 h-5" />
              <h2 className="text-base font-bold text-gray-900 dark:text-white tracking-tight">
                全国各大区接待与质检汇总
              </h2>
              <span className="text-xs text-gray-400">（点击「查看详情」可下钻该大区各小区）</span>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-gray-200 dark:border-slate-700 text-gray-500 dark:text-gray-400 font-semibold bg-gray-50/70 dark:bg-slate-900/40">
                  <th className="py-3 px-3 text-center w-12">序号</th>
                  <th className="py-3 px-4 font-bold text-gray-900 dark:text-white">大区名称</th>
                  <th className="py-3 px-4 text-right font-bold text-gray-700 dark:text-gray-300">
                    工牌接待量
                  </th>
                  <th className="py-3 px-3 text-right">展厅接待量</th>
                  <th className="py-3 px-3 text-right">试乘试驾量</th>
                  <th className="py-3 px-4 text-right font-bold text-gray-700 dark:text-gray-300">
                    有效质检接待量
                  </th>
                  <th className="py-3 px-4 text-right font-bold text-gray-700 dark:text-gray-300">
                    无效质检接待量
                  </th>
                  <th className="py-3 px-4 text-center font-bold">操作</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-slate-700/60">
                {processedRegionsList.map((item, idx) => (
                  <tr 
                    key={item.regionId}
                    className="hover:bg-indigo-50/40 dark:hover:bg-slate-700/40 transition-colors group cursor-pointer"
                    onClick={() => handleSelectRegion(item.region)}
                  >
                    <td className="py-3.5 px-3 text-center text-gray-400 font-mono">{idx + 1}</td>
                    <td className="py-3.5 px-4 font-bold text-gray-900 dark:text-white flex items-center gap-2">
                      <MapPin size={14} className="text-indigo-600 dark:text-indigo-400" />
                      <span>{item.regionName}</span>
                    </td>
                    <td className="py-3.5 px-4 text-right font-bold text-gray-900 dark:text-white font-mono text-sm">
                      {item.totalBadge}
                    </td>
                    <td className="py-3.5 px-3 text-right text-gray-600 dark:text-gray-300 font-mono">
                      {item.showroomBadge}
                    </td>
                    <td className="py-3.5 px-3 text-right text-gray-600 dark:text-gray-300 font-mono">
                      {item.testDriveBadge}
                    </td>
                    <td className="py-3.5 px-4 text-right font-mono font-bold text-emerald-600 dark:text-emerald-400">
                      {item.validQC}
                    </td>
                    <td className="py-3.5 px-4 text-right font-mono font-bold text-rose-600 dark:text-rose-400">
                      {item.invalidQC}
                    </td>
                    <td className="py-3.5 px-4 text-center" onClick={(e) => e.stopPropagation()}>
                      <button
                        onClick={() => handleSelectRegion(item.region)}
                        className="inline-flex items-center gap-1 px-3 py-1.5 bg-indigo-50 hover:bg-indigo-100 dark:bg-indigo-950/60 dark:hover:bg-indigo-900/80 text-indigo-600 dark:text-indigo-300 rounded-lg text-xs font-bold transition-all cursor-pointer shadow-2xs"
                      >
                        <span>查看详情</span>
                        <ChevronRight size={13} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between text-xs text-gray-500 dark:text-gray-400 gap-3 pt-2">
            <div>
              全国共覆盖 <span className="font-bold text-gray-700 dark:text-gray-200">{processedRegionsList.length}</span> 个大区，合计 <span className="font-bold text-gray-700 dark:text-gray-200">{activeOverviewStats.storeCount}</span> 家门店
            </div>
            <div className="text-gray-400 text-[11px]">
              提示：点击每行操作栏的「查看详情」可下钻查看该大区内各小区的三个指标卡片及明细
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* LEVEL 2: REGION PERSPECTIVE - Sub-Regions (小区 / MAC) Breakdown Table */}
      {/* ========================================================================= */}
      {selectedRegion && !selectedSubRegion && (
        <div className="bg-white dark:bg-slate-800 rounded-2xl p-5 shadow-xs border border-gray-100 dark:border-slate-700/80 space-y-4">
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <MapPin className="text-indigo-600 dark:text-indigo-400 w-5 h-5" />
              <h2 className="text-base font-bold text-gray-900 dark:text-white tracking-tight">
                {selectedRegion.regionName} - 下辖各小区(MAC)接待与质检明细
              </h2>
              <span className="text-xs text-gray-400">（点击「查看详情」可进入该小区目前MAC视角）</span>
            </div>

            <div className="flex items-center gap-3">
              <div className="relative">
                <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="搜索小区名称或MAC..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-8 pr-3 py-1.5 text-xs bg-gray-50 dark:bg-slate-700/70 border border-gray-200 dark:border-slate-600 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500 dark:text-white w-48 sm:w-60"
                />
              </div>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-gray-200 dark:border-slate-700 text-gray-500 dark:text-gray-400 font-semibold bg-gray-50/70 dark:bg-slate-900/40">
                  <th className="py-3 px-3 text-center w-12">序号</th>
                  <th className="py-3 px-4 font-bold text-gray-900 dark:text-white">小区名称</th>
                  <th className="py-3 px-4 text-right font-bold text-gray-700 dark:text-gray-300">
                    工牌接待量
                  </th>
                  <th className="py-3 px-3 text-right">展厅接待量</th>
                  <th className="py-3 px-3 text-right">试乘试驾量</th>
                  <th className="py-3 px-4 text-right font-bold text-gray-700 dark:text-gray-300">
                    有效质检接待量
                  </th>
                  <th className="py-3 px-4 text-right font-bold text-gray-700 dark:text-gray-300">
                    无效质检接待量
                  </th>
                  <th className="py-3 px-4 text-center font-bold">操作</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-slate-700/60">
                {processedSubRegionsList.map((item, idx) => (
                  <tr 
                    key={item.subRegionId}
                    className="hover:bg-indigo-50/40 dark:hover:bg-slate-700/40 transition-colors group cursor-pointer"
                    onClick={() => handleSelectSubRegion(item.subRegion)}
                  >
                    <td className="py-3.5 px-3 text-center text-gray-400 font-mono">{idx + 1}</td>
                    <td className="py-3.5 px-4 font-bold text-gray-900 dark:text-white flex items-center gap-2">
                      <Navigation size={14} className="text-indigo-600 dark:text-indigo-400" />
                      <span>{item.subRegionName}</span>
                    </td>
                    <td className="py-3.5 px-4 text-right font-bold text-gray-900 dark:text-white font-mono text-sm">
                      {item.totalBadge}
                    </td>
                    <td className="py-3.5 px-3 text-right text-gray-600 dark:text-gray-300 font-mono">
                      {item.showroomBadge}
                    </td>
                    <td className="py-3.5 px-3 text-right text-gray-600 dark:text-gray-300 font-mono">
                      {item.testDriveBadge}
                    </td>
                    <td className="py-3.5 px-4 text-right font-mono font-bold text-emerald-600 dark:text-emerald-400">
                      {item.validQC}
                    </td>
                    <td className="py-3.5 px-4 text-right font-mono font-bold text-rose-600 dark:text-rose-400">
                      {item.invalidQC}
                    </td>
                    <td className="py-3.5 px-4 text-center" onClick={(e) => e.stopPropagation()}>
                      <button
                        onClick={() => handleSelectSubRegion(item.subRegion)}
                        className="inline-flex items-center gap-1 px-3 py-1.5 bg-indigo-50 hover:bg-indigo-100 dark:bg-indigo-950/60 dark:hover:bg-indigo-900/80 text-indigo-600 dark:text-indigo-300 rounded-lg text-xs font-bold transition-all cursor-pointer shadow-2xs"
                      >
                        <span>查看详情</span>
                        <ChevronRight size={13} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between text-xs text-gray-500 dark:text-gray-400 gap-3 pt-2">
            <div>
              {selectedRegion.regionName} 共辖 <span className="font-bold text-gray-700 dark:text-gray-200">{processedSubRegionsList.length}</span> 个小区，合计 <span className="font-bold text-gray-700 dark:text-gray-200">{activeOverviewStats.storeCount}</span> 家门店
            </div>
            <div className="text-gray-400 text-[11px]">
              提示：点击每行操作栏的「查看详情」可进入该小区的门店视角（目前MAC视角）
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* LEVEL 3: SUB-REGION / MAC PERSPECTIVE - Stores Table (目前的MAC视角) */}
      {/* ========================================================================= */}
      {selectedSubRegion && !drilledStore && (
        <div className="bg-white dark:bg-slate-800 rounded-2xl p-5 shadow-xs border border-gray-100 dark:border-slate-700/80 space-y-4">
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <Building2 className="text-indigo-600 dark:text-indigo-400 w-5 h-5" />
              <h2 className="text-base font-bold text-gray-900 dark:text-white tracking-tight">
                {selectedSubRegion.subRegionName} ({selectedSubRegion.macCode}) - 门店接待与质检明细
              </h2>
              <span className="text-xs text-gray-400">（目前MAC视角）</span>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-gray-200 dark:border-slate-700 text-gray-500 dark:text-gray-400 font-semibold bg-gray-50/70 dark:bg-slate-900/40">
                  <th className="py-3 px-3 text-center w-12">序号</th>
                  <th className="py-3 px-4 font-mono">经销商CODE</th>
                  <th className="py-3 px-4 font-bold text-gray-900 dark:text-white">经销商简称</th>
                  <th className="py-3 px-4 text-right font-bold text-gray-700 dark:text-gray-300">
                    工牌接待量
                  </th>
                  <th className="py-3 px-3 text-right">展厅接待量</th>
                  <th className="py-3 px-3 text-right">试乘试驾量</th>
                  <th className="py-3 px-4 text-right font-bold text-gray-700 dark:text-gray-300">
                    有效质检接待量
                  </th>
                  <th className="py-3 px-4 text-right font-bold text-gray-700 dark:text-gray-300">
                    无效质检接待量
                  </th>
                  <th className="py-3 px-4 text-center font-bold">操作</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-slate-700/60">
                {processedStoresList.map((item, idx) => (
                  <tr 
                    key={item.storeId}
                    className="hover:bg-indigo-50/40 dark:hover:bg-slate-700/40 transition-colors group cursor-pointer"
                    onClick={() => handleSelectStore(item.store)}
                  >
                    <td className="py-3.5 px-3 text-center text-gray-400 font-mono">{idx + 1}</td>
                    <td className="py-3.5 px-4 font-mono font-medium text-gray-600 dark:text-gray-300">
                      {item.storeCode}
                    </td>
                    <td className="py-3.5 px-4 font-bold text-gray-900 dark:text-white">
                      {item.storeName}
                    </td>
                    <td className="py-3.5 px-4 text-right font-bold text-gray-900 dark:text-white font-mono text-sm">
                      {item.totalBadgeReception}
                    </td>
                    <td className="py-3.5 px-3 text-right text-gray-600 dark:text-gray-300 font-mono">
                      {item.showroomReception}
                    </td>
                    <td className="py-3.5 px-3 text-right text-gray-600 dark:text-gray-300 font-mono">
                      {item.testDriveReception}
                    </td>
                    <td className="py-3.5 px-4 text-right font-mono font-bold text-emerald-600 dark:text-emerald-400">
                      {item.validQCReception}
                    </td>
                    <td className="py-3.5 px-4 text-right font-mono font-bold text-rose-600 dark:text-rose-400">
                      {item.invalidQCReception}
                    </td>
                    <td className="py-3.5 px-4 text-center" onClick={(e) => e.stopPropagation()}>
                      <button
                        onClick={() => handleSelectStore(item.store)}
                        className="inline-flex items-center gap-1 px-3 py-1.5 bg-indigo-50 hover:bg-indigo-100 dark:bg-indigo-950/60 dark:hover:bg-indigo-900/80 text-indigo-600 dark:text-indigo-300 rounded-lg text-xs font-bold transition-all cursor-pointer shadow-2xs"
                      >
                        <span>查看明细</span>
                        <ChevronRight size={13} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between text-xs text-gray-500 dark:text-gray-400 gap-3 pt-2">
            <div>
              本小区共有 <span className="font-bold text-gray-700 dark:text-gray-200">{processedStoresList.length}</span> 家门店
            </div>
            <div className="text-gray-400 text-[11px]">
              提示：点击每行操作栏的「查看明细」可穿透查看该门店所有客户接待卡片及录音详情
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* LEVEL 4: STORE LEVEL DRILL-DOWN - Reception Cards List View */}
      {/* ========================================================================= */}
      {drilledStore && (
        <div className="space-y-4">
          
          {/* Card Filters within Drilled Store */}
          <div className="bg-white dark:bg-slate-800 p-4 rounded-2xl shadow-xs border border-gray-100 dark:border-slate-700 flex flex-col md:flex-row md:items-center justify-between gap-3">
            {/* Status Filter */}
            <div className="flex items-center bg-gray-100 dark:bg-slate-700/80 p-0.5 rounded-xl text-xs font-medium">
              <button
                onClick={() => setCardStatusFilter('all')}
                className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${cardStatusFilter === 'all' ? 'bg-white dark:bg-slate-600 text-indigo-600 dark:text-indigo-400 font-bold shadow-2xs' : 'text-gray-500 hover:text-gray-700'}`}
              >
                全部 ({activeOverviewStats.totalBadge})
              </button>
              <button
                onClick={() => setCardStatusFilter('valid')}
                className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${cardStatusFilter === 'valid' ? 'bg-emerald-600 text-white font-bold shadow-2xs' : 'text-emerald-700 dark:text-emerald-400 hover:text-emerald-800'}`}
              >
                仅看有效 ({activeOverviewStats.validQC})
              </button>
              <button
                onClick={() => setCardStatusFilter('invalid')}
                className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${cardStatusFilter === 'invalid' ? 'bg-rose-600 text-white font-bold shadow-2xs' : 'text-rose-600 dark:text-rose-400 hover:text-rose-700'}`}
              >
                仅看无效 ({activeOverviewStats.invalidQC})
              </button>
            </div>

            {/* Card Search */}
            <div className="relative">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="搜索顾问/客户/车型/编码..."
                value={cardSearchQuery}
                onChange={(e) => setCardSearchQuery(e.target.value)}
                className="pl-8 pr-3 py-1.5 text-xs bg-gray-50 dark:bg-slate-700/70 border border-gray-200 dark:border-slate-600 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500 dark:text-white w-full sm:w-64"
              />
            </div>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            {storeDrillDownCards.map((item) => (
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

                  {/* 5 Fixed QC Conditions Tags */}
                  <div className="flex items-center gap-1.5 pt-2.5 border-t border-gray-100 dark:border-slate-700/60 overflow-x-auto no-scrollbar whitespace-nowrap">
                    <ConditionBadge 
                      fulfilled={item.conditions.hasAudio} 
                      passText="有录音" 
                      failText="无录音" 
                    />
                    <ConditionBadge 
                      fulfilled={item.conditions.audioDurationMatch} 
                      passText="录音时长符合" 
                      failText="录音时长不符" 
                      isGrayedOut={!item.isValid && !item.conditions.hasAudio}
                    />
                    <ConditionBadge 
                      fulfilled={item.conditions.modelMentioned} 
                      passText="已提车型" 
                      failText="未提车型" 
                      isGrayedOut={!item.isValid && !item.conditions.hasAudio}
                    />
                    <ConditionBadge 
                      fulfilled={item.conditions.sceneMatch} 
                      passText="场景相符" 
                      failText="场景不符" 
                      isGrayedOut={!item.isValid && !item.conditions.hasAudio}
                    />
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

          {storeDrillDownCards.length === 0 && (
            <div className="text-center py-16 bg-white dark:bg-slate-800 rounded-2xl border border-gray-100 dark:border-slate-700">
              <AlertCircle size={36} className="mx-auto text-gray-300 mb-2" />
              <p className="text-sm font-semibold text-gray-700 dark:text-gray-300">暂无匹配的接待卡片</p>
              <p className="text-xs text-gray-400 mt-1">请尝试调整状态筛选或搜索关键词</p>
            </div>
          )}
        </div>
      )}

      {/* 5. DETAIL DRILLDOWN MODAL (有效质检 - 全景详情弹窗) */}
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
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-medium text-gray-600 dark:text-gray-300">场景录音文件:</span>
                      <span className="px-1.5 py-0.5 bg-blue-600 text-white font-semibold text-[11px] rounded">第1段</span>
                    </div>
                    <h3 className="font-mono font-bold text-sm text-gray-900 dark:text-gray-100 tracking-tight">
                      {detailModalItem.audioFileName || '20260726171700_SJ17410012_20260726172600'}
                    </h3>
                    <p className="text-gray-500 dark:text-gray-400 text-[11px] mt-0.5">
                      员工: <span className="font-medium text-gray-800 dark:text-gray-200">{detailModalItem.salesperson}</span> &nbsp;|&nbsp; 门店: <span className="font-medium text-gray-800 dark:text-gray-200">{detailModalItem.storeName}</span>
                    </p>
                  </div>

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
                  <div className="w-8 h-8 rounded-full border-2 border-emerald-500 flex items-center justify-center text-emerald-600 dark:text-emerald-400 shrink-0 cursor-pointer hover:bg-emerald-50 dark:hover:bg-emerald-950/40 transition-colors">
                    <Play size={14} className="ml-0.5 fill-emerald-500 text-emerald-500" />
                  </div>
                  <span className="font-bold text-gray-600 dark:text-gray-300 text-[11px] shrink-0">1X</span>
                  <div className="flex-1 space-y-1">
                    <div className="flex justify-between text-[10px] text-gray-400 font-mono">
                      <span>{detailModalItem.enterTime} 00:00:01</span>
                      <span>说明</span>
                      <span>00:06:19</span>
                    </div>
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

                  <div className="px-3 py-2 bg-gray-50/50 dark:bg-slate-800/80 border-b border-gray-100 dark:border-slate-700 flex justify-between font-bold text-gray-600 dark:text-gray-300 text-[11px]">
                    <span>{detailModalItem.carModel}(14分)</span>
                    <div className="flex gap-4">
                      <span>命中情况</span>
                      <span>分数</span>
                    </div>
                  </div>

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

                  <div className="mt-auto p-3 bg-gray-50 dark:bg-slate-900/50 border-t border-gray-100 dark:border-slate-700">
                    <span className="font-bold text-gray-800 dark:text-gray-200 block mb-1">{detailModalItem.carModel}录音详情</span>
                    <div className="p-2 bg-white dark:bg-slate-800 rounded border border-gray-200 dark:border-slate-700 text-[11px] text-gray-600 dark:text-gray-300 font-mono">
                      第1段: {detailModalItem.enterTime} – {detailModalItem.leaveTime}
                    </div>
                  </div>
                </div>

                {/* Middle Column: 通话记录 */}
                <div className="lg:col-span-5 bg-white dark:bg-slate-800 rounded-xl border border-gray-200 dark:border-slate-700 flex flex-col">
                  <div className="p-3 border-b border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-900/50 flex flex-wrap items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-gray-900 dark:text-white text-sm">通话记录</span>
                      <label className="flex items-center gap-1 text-gray-500 text-[11px]">
                        <input type="checkbox" readOnly className="rounded" /> 切换角色
                      </label>
                    </div>
                    <div className="flex items-center gap-2 text-gray-500 text-[11px]">
                      <span className="px-2 py-0.5 bg-white dark:bg-slate-800 border rounded text-gray-600 dark:text-gray-300">在对话中... 0</span>
                      <span className="text-blue-600 dark:text-blue-400 cursor-pointer hover:underline">文本下载</span>
                      <span className="text-blue-600 dark:text-blue-400 cursor-pointer hover:underline">添加词库</span>
                    </div>
                  </div>

                  <div className="p-3 space-y-3 overflow-y-auto max-h-[380px] bg-slate-50/50 dark:bg-slate-900/30">
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
                  </div>
                </div>

                {/* Right Column: 标签 & 客户画像 */}
                <div className="lg:col-span-4 bg-white dark:bg-slate-800 rounded-xl border border-gray-200 dark:border-slate-700 flex flex-col">
                  <div className="p-2 border-b border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-900/50 flex items-center justify-between text-[11px]">
                    <div className="flex gap-3">
                      <span className="text-gray-500">会话详情</span>
                      <span className="font-bold text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400 pb-1">标签</span>
                      <span className="text-gray-500">会话总结</span>
                      <span className="text-gray-500">销售分析</span>
                    </div>
                  </div>

                  <div className="p-2.5 border-b border-gray-100 dark:border-slate-700 flex justify-between text-[11px] text-blue-600 dark:text-blue-400">
                    <span className="hover:underline cursor-pointer">下载标签清单</span>
                    <span className="hover:underline cursor-pointer">▼ 标签显示配置</span>
                  </div>

                  <div className="p-3 space-y-2 text-[11px] overflow-y-auto max-h-[380px]">
                    <p className="font-bold text-gray-800 dark:text-gray-200 text-[11px] mb-2">
                      客户意向判定与客户标签 / 新客户意向判定和客户标签
                    </p>

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

export default ReceptionRecordsMac;
