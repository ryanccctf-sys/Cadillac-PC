import React, { useState, useMemo } from 'react';
import { 
  Search, 
  RotateCcw, 
  Download, 
  ChevronLeft, 
  ChevronRight, 
  X, 
  AlertTriangle, 
  CheckCircle2, 
  Layers, 
  Store, 
  Building2, 
  Video, 
  Users, 
  Percent, 
  Activity,
  FileSpreadsheet,
  Headphones,
  FileVideo,
  Image as ImageIcon,
  Play,
  Pause,
  Copy,
  Eye,
  Check,
  Sparkles,
  FileText,
  Tag,
  BarChart3,
  HelpCircle,
  UserCheck,
  Volume2,
  ZoomIn
} from 'lucide-react';
import {
  ORG_HIERARCHY,
  INSPECTION_THEMES,
  INSPECTION_13_ITEMS,
  GENERATED_STORE_RECORDS,
  UNTRAINED_STORES_LIST,
  StoreInspectionRecord,
  UnTrainedStore
} from './trainingInspectionData';

export const TrainingInspectionBoard: React.FC = () => {
  // --- 1. Cascading Organization & Filter States ---
  const [selectedRegion, setSelectedRegion] = useState<string>('全国');
  const [selectedDistrict, setSelectedDistrict] = useState<string>('全部');
  const [selectedStore, setSelectedStore] = useState<string>('全部');
  const [selectedTheme, setSelectedTheme] = useState<string>('XT5 PHEV对比宝马iX3');

  // Applied Filter Snapshot for reactive filtering
  const [appliedFilters, setAppliedFilters] = useState({
    region: '全国',
    district: '全部',
    store: '全部',
    theme: 'XT5 PHEV对比宝马iX3',
  });

  // --- Toast State ---
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // --- Modal States ---
  const [activeModal, setActiveModal] = useState<
    'trained' | 'untrained' | 'videoAnomaly' | 'photoAnomaly' | null
  >(null);

  // Unified Multi-Modal Dialog for Video, Photo with Attendees, and Audio playback
  const [selectedMediaRecord, setSelectedMediaRecord] = useState<any | null>(null);
  const [mediaActiveSession, setMediaActiveSession] = useState<number>(1);
  const [isVideoPlaying, setIsVideoPlaying] = useState<boolean>(false);
  const [isPhotoZoomed, setIsPhotoZoomed] = useState<boolean>(false);

  // 录音回听独立全景详情弹窗 (用户截屏 1:1 复刻)
  const [showAudioDetailModal, setShowAudioDetailModal] = useState<boolean>(false);
  const [isAudioPlaying, setIsAudioPlaying] = useState<boolean>(false);
  const [playbackSpeed, setPlaybackSpeed] = useState<string>('1X');
  const [detailActiveTab, setDetailActiveTab] = useState<'details' | 'tags' | 'summary' | 'analysis'>('tags');
  const [copiedId, setCopiedId] = useState<boolean>(false);

  // 数据明细 视图页签: 场次聚合数据 | 场次明细数据
  const [dataViewTab, setDataViewTab] = useState<'aggregated' | 'detailed'>('aggregated');

  // Pagination for main table
  const [detailPage, setDetailPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(20);

  // --- 2 Specific Filters for 数据明细模块 ---
  // 1. 视频比对录音匹配率: 全部 | 大于90% | 大于80% | 小于80%
  const [videoMatchFilter, setVideoMatchFilter] = useState<string>('全部');
  // 2. 参训照片与人数匹配率: 全部 | 大于90% | 大于80% | 小于80%
  const [photoMatchFilter, setPhotoMatchFilter] = useState<string>('全部');
  // 3. 场次明细数据专属转训时间筛选 (开始日期 - 结束日期)
  const [detailStartDate, setDetailStartDate] = useState<string>('');
  const [detailEndDate, setDetailEndDate] = useState<string>('');

  // Pagination for modals
  const [modalPage, setModalPage] = useState<number>(1);
  const modalPageSize = 10;

  // --- Cascade Dropdown Options ---
  const regionOptions = useMemo(() => {
    return ['全国', ...Object.keys(ORG_HIERARCHY)];
  }, []);

  const districtOptions = useMemo(() => {
    if (selectedRegion === '全国' || !ORG_HIERARCHY[selectedRegion]) {
      return ['全部'];
    }
    return ['全部', ...Object.keys(ORG_HIERARCHY[selectedRegion].districts)];
  }, [selectedRegion]);

  const storeOptions = useMemo(() => {
    if (selectedRegion === '全国') return ['全部'];
    const currentRegionData = ORG_HIERARCHY[selectedRegion];
    if (!currentRegionData) return ['全部'];

    if (selectedDistrict === '全部') {
      const allStores: { code: string; name: string }[] = [];
      Object.values(currentRegionData.districts).forEach(stores => {
        allStores.push(...stores);
      });
      return ['全部', ...allStores.map(s => s.name)];
    }

    const storesInDistrict = currentRegionData.districts[selectedDistrict] || [];
    return ['全部', ...storesInDistrict.map(s => s.name)];
  }, [selectedRegion, selectedDistrict]);

  // Handle cascading changes
  const handleRegionChange = (reg: string) => {
    setSelectedRegion(reg);
    setSelectedDistrict('全部');
    setSelectedStore('全部');
  };

  const handleDistrictChange = (dist: string) => {
    setSelectedDistrict(dist);
    setSelectedStore('全部');
  };

  const handleQuery = () => {
    setAppliedFilters({
      region: selectedRegion,
      district: selectedDistrict,
      store: selectedStore,
      theme: selectedTheme,
    });
    setDetailPage(1);
    showToast('筛选条件已应用');
  };

  const handleReset = () => {
    setSelectedRegion('全国');
    setSelectedDistrict('全部');
    setSelectedStore('全部');
    setSelectedTheme('XT5 PHEV对比宝马iX3');
    setAppliedFilters({
      region: '全国',
      district: '全部',
      store: '全部',
      theme: 'XT5 PHEV对比宝马iX3',
    });
    setVideoMatchFilter('全部');
    setPhotoMatchFilter('全部');
    setDetailStartDate('');
    setDetailEndDate('');
    setDetailPage(1);
    showToast('筛选已重置为全国数据');
  };

  // --- Filtered Records for Overview Metrics ---
  const filteredRecords = useMemo(() => {
    return GENERATED_STORE_RECORDS.filter(r => {
      if (appliedFilters.region !== '全国' && r.region !== appliedFilters.region) {
        return false;
      }
      if (appliedFilters.district !== '全部' && r.district !== appliedFilters.district) {
        return false;
      }
      if (appliedFilters.store !== '全部' && r.storeName !== appliedFilters.store) {
        return false;
      }
      return true;
    });
  }, [appliedFilters]);

  // 1. 场次聚合数据 (Store Aggregated View) - Filtered by match rate filters
  const tableFilteredAggregatedRecords = useMemo(() => {
    return filteredRecords.filter(r => {
      if (videoMatchFilter === '大于90%' && r.videoMatchRate <= 90) return false;
      if (videoMatchFilter === '大于80%' && r.videoMatchRate <= 80) return false;
      if (videoMatchFilter === '小于80%' && r.videoMatchRate >= 80) return false;

      if (photoMatchFilter === '大于90%' && r.photoMatchRate <= 90) return false;
      if (photoMatchFilter === '大于80%' && r.photoMatchRate <= 80) return false;
      if (photoMatchFilter === '小于80%' && r.photoMatchRate >= 80) return false;

      return true;
    });
  }, [filteredRecords, videoMatchFilter, photoMatchFilter]);

  // 2. 场次明细数据 (Detailed Session View: Expand each store into individual sessions)
  const detailedSessionRecords = useMemo(() => {
    const list: (StoreInspectionRecord & {
      sessionNumber: number;
      sessionName: string;
      sessionStartTime: string;
      sessionEndTime: string;
    })[] = [];

    filteredRecords.forEach(store => {
      const sessionCount = store.sessions || 2;
      for (let s = 1; s <= sessionCount; s++) {
        let sStart = store.startTime;
        let sEnd = store.endTime;
        if (s === 1) {
          sStart = `${store.date} 09:00`;
          sEnd = `${store.date} 10:30`;
        } else if (s === 2) {
          sStart = `${store.date} 14:00`;
          sEnd = `${store.date} 15:30`;
        } else if (s === 3) {
          sStart = `${store.date} 16:30`;
          sEnd = `${store.date} 17:45`;
        }

        list.push({
          ...store,
          id: `${store.id}-S${s}`,
          sessionNumber: s,
          sessionName: `第${s}场`,
          sessionStartTime: sStart,
          sessionEndTime: sEnd,
        });
      }
    });

    return list;
  }, [filteredRecords]);

  // Filtered Detailed Records by match rate filters and training date range
  const tableFilteredDetailedRecords = useMemo(() => {
    return detailedSessionRecords.filter(r => {
      if (detailStartDate && r.date < detailStartDate) return false;
      if (detailEndDate && r.date > detailEndDate) return false;

      if (videoMatchFilter === '大于90%' && r.videoMatchRate <= 90) return false;
      if (videoMatchFilter === '大于80%' && r.videoMatchRate <= 80) return false;
      if (videoMatchFilter === '小于80%' && r.videoMatchRate >= 80) return false;

      if (photoMatchFilter === '大于90%' && r.photoMatchRate <= 90) return false;
      if (photoMatchFilter === '大于80%' && r.photoMatchRate <= 80) return false;
      if (photoMatchFilter === '小于80%' && r.photoMatchRate >= 80) return false;

      return true;
    });
  }, [detailedSessionRecords, detailStartDate, detailEndDate, videoMatchFilter, photoMatchFilter]);

  // Active records based on active tab: 'aggregated' | 'detailed'
  const activeTableRecords = useMemo(() => {
    return dataViewTab === 'aggregated' ? tableFilteredAggregatedRecords : tableFilteredDetailedRecords;
  }, [dataViewTab, tableFilteredAggregatedRecords, tableFilteredDetailedRecords]);

  const totalTableRecords = activeTableRecords.length;
  const totalPages = Math.max(1, Math.ceil(totalTableRecords / pageSize));
  const paginatedRecords = useMemo(() => {
    const start = (detailPage - 1) * pageSize;
    return activeTableRecords.slice(start, start + pageSize);
  }, [activeTableRecords, detailPage, pageSize]);

  // Dynamic Pagination Pages Generator
  const getPageNumbers = (current: number, total: number) => {
    if (total <= 7) {
      return Array.from({ length: total }, (_, i) => i + 1);
    }
    if (current <= 4) {
      return [1, 2, 3, 4, 5, '...', total];
    }
    if (current >= total - 3) {
      return [1, '...', total - 4, total - 3, total - 2, total - 1, total];
    }
    return [1, '...', current - 1, current, current + 1, '...', total];
  };

  // Filtered Untrained Stores
  const filteredUntrainedStores = useMemo(() => {
    return UNTRAINED_STORES_LIST.filter(r => {
      if (appliedFilters.region !== '全国' && r.region !== appliedFilters.region) {
        return false;
      }
      if (appliedFilters.district !== '全部' && r.district !== appliedFilters.district) {
        return false;
      }
      if (appliedFilters.store !== '全部' && r.storeName !== appliedFilters.store) {
        return false;
      }
      return true;
    });
  }, [appliedFilters]);

  // Video Anomaly Records
  const videoAnomalyRecords = useMemo(() => {
    return filteredRecords.filter(r => r.isVideoAbnormal || r.videoMatchRate < 85);
  }, [filteredRecords]);

  // Photo Anomaly Records
  const photoAnomalyRecords = useMemo(() => {
    return filteredRecords.filter(r => r.isPhotoAbnormal || r.photoMatchRate < 90);
  }, [filteredRecords]);

  // Dynamic Metrics Calculation
  const overviewStats = useMemo(() => {
    const trainedCount = appliedFilters.region === '全国' ? 186 : filteredRecords.length * 15 + 12;
    const untrainedCount = appliedFilters.region === '全国' ? 24 : filteredUntrainedStores.length * 2;
    const totalRequired = trainedCount + untrainedCount;
    const completionRate = totalRequired > 0 ? ((trainedCount / totalRequired) * 100).toFixed(1) : '0.0';
    
    // Average execution rate
    const avgExec = filteredRecords.length > 0 
      ? (filteredRecords.reduce((acc, curr) => acc + curr.totalExecutionRate, 0) / filteredRecords.length).toFixed(1)
      : '95.8';

    const videoAnomalyCount = appliedFilters.region === '全国' ? 12 : videoAnomalyRecords.length * 3 + 1;
    const photoAnomalyCount = appliedFilters.region === '全国' ? 8 : photoAnomalyRecords.length * 2 + 1;

    return {
      trainedCount,
      untrainedCount,
      completionRate: `${completionRate}%`,
      totalExecutionRate: `${avgExec}%`,
      videoAnomalyCount,
      photoAnomalyCount,
    };
  }, [appliedFilters, filteredRecords, filteredUntrainedStores, videoAnomalyRecords, photoAnomalyRecords]);

  // CSV Export utility
  const downloadCSV = (filename: string, rows: (string | number)[][]) => {
    const csvContent = '\uFEFF' + rows.map(e => e.map(item => `"${String(item).replace(/"/g, '""')}"`).join(',')).join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `${filename}_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast(`已成功导出 ${filename}`);
  };

  // Export Main Data
  const exportMainData = () => {
    let headers: string[] = [];
    let rows: (string | number)[][] = [];

    if (dataViewTab === 'aggregated') {
      headers = [
        '序号', '门店编码', '门店名称', '大区', '小区',
        '视频比对录音匹配率', '参训照片与人数匹配率', '转训检核总执行率',
        '对比思路总转训率(一级)', '竞品基本信息', '对比核心思路',
        '攻击总转训率(一级)', '攻击', '设计翻车', '动力成短板',
        '防守总转训率(一级)', '固定阻尼悬架', '补能焦虑', '视平线全景显示',
        '绝杀总转训率(一级)', '智能化', '阉割版智驾硬件', '算力差距', '二次收费割韭菜', '智舱落后'
      ];
      rows = tableFilteredAggregatedRecords.map((r, i) => [
        i + 1, r.storeCode, r.storeName, r.region, r.district,
        `${r.videoMatchRate}%`, `${r.photoMatchRate}%`, `${r.totalExecutionRate}%`,
        `${r.comp1_contrast}%`, `${r.item1}%`, `${r.item2}%`,
        `${r.comp2_attack}%`, `${r.item3}%`, `${r.item4}%`, `${r.item5}%`,
        `${r.comp3_defense}%`, `${r.item6}%`, `${r.item7}%`, `${r.item8}%`,
        `${r.comp4_kill}%`, `${r.item9}%`, `${r.item10}%`, `${r.item11}%`, `${r.item12}%`, `${r.item13}%`
      ]);
      downloadCSV(`转训检核_场次聚合数据_${appliedFilters.theme}`, [headers, ...rows]);
    } else {
      headers = [
        '序号', '门店编码', '门店名称', '日期', '大区', '小区', '转训场次', '转训开始时间', '转训结束时间',
        '视频比对录音匹配率', '参训照片与人数匹配率', '转训检核总执行率',
        '对比思路总转训率(一级)', '竞品基本信息', '对比核心思路',
        '攻击总转训率(一级)', '攻击', '设计翻车', '动力成短板',
        '防守总转训率(一级)', '固定阻尼悬架', '补能焦虑', '视平线全景显示',
        '绝杀总转训率(一级)', '智能化', '阉割版智驾硬件', '算力差距', '二次收费割韭菜', '智舱落后'
      ];
      rows = tableFilteredDetailedRecords.map((r, i) => [
        i + 1, r.storeCode, r.storeName, r.date, r.region, r.district, r.sessionName, r.sessionStartTime, r.sessionEndTime,
        `${r.videoMatchRate}%`, `${r.photoMatchRate}%`, `${r.totalExecutionRate}%`,
        `${r.comp1_contrast}%`, `${r.item1}%`, `${r.item2}%`,
        `${r.comp2_attack}%`, `${r.item3}%`, `${r.item4}%`, `${r.item5}%`,
        `${r.comp3_defense}%`, `${r.item6}%`, `${r.item7}%`, `${r.item8}%`,
        `${r.comp4_kill}%`, `${r.item9}%`, `${r.item10}%`, `${r.item11}%`, `${r.item12}%`, `${r.item13}%`
      ]);
      downloadCSV(`转训检核_场次明细数据_${appliedFilters.theme}`, [headers, ...rows]);
    }
  };

  return (
    <div className="space-y-6 pb-16 w-full max-w-full">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-5 left-1/2 -translate-x-1/2 z-[100] animate-in fade-in slide-in-from-top duration-200">
          <div className="flex items-center gap-2 bg-slate-900/90 dark:bg-emerald-600 text-white px-5 py-3 rounded-2xl shadow-xl font-medium text-xs border border-slate-700/50">
            <CheckCircle2 size={16} className="text-emerald-400 dark:text-white" />
            <span>{toastMessage}</span>
          </div>
        </div>
      )}

      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-blue-600/10 dark:bg-blue-500/20 text-blue-600 dark:text-blue-400 rounded-xl">
              <Activity size={22} />
            </div>
            <div>
              <h1 className="text-xl font-bold text-slate-900 dark:text-white">
                转训检核看板
              </h1>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                实时汇总全国经销商转训完成进度、AI视频/照片合规比对与13项质检开口执行表现
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 二、筛选区域 (Single Row Responsive Filter Bar) */}
      <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-4 shadow-xs transition-colors">
        <div className="flex flex-wrap items-center gap-3">
          
          {/* 1. 全国 / 大区 / 小区 / 门店 级联选择 */}
          <div className="flex items-center gap-2 bg-slate-50 dark:bg-slate-900/60 p-1.5 rounded-xl border border-slate-200 dark:border-slate-700">
            {/* 大区 */}
            <div className="flex items-center gap-1">
              <span className="text-[11px] font-semibold text-slate-500 pl-1">大区:</span>
              <select
                value={selectedRegion}
                onChange={(e) => handleRegionChange(e.target.value)}
                className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-2.5 py-1.5 text-xs text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/30 cursor-pointer font-medium"
              >
                {regionOptions.map(r => (
                  <option key={r} value={r}>{r}</option>
                ))}
              </select>
            </div>

            {/* 小区 */}
            <div className="flex items-center gap-1">
              <span className="text-[11px] font-semibold text-slate-500">小区:</span>
              <select
                value={selectedDistrict}
                disabled={selectedRegion === '全国'}
                onChange={(e) => handleDistrictChange(e.target.value)}
                className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-2.5 py-1.5 text-xs text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/30 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer font-medium"
              >
                {districtOptions.map(d => (
                  <option key={d} value={d}>{d}</option>
                ))}
              </select>
            </div>

            {/* 门店 */}
            <div className="flex items-center gap-1">
              <span className="text-[11px] font-semibold text-slate-500">门店:</span>
              <select
                value={selectedStore}
                disabled={selectedRegion === '全国'}
                onChange={(e) => setSelectedStore(e.target.value)}
                className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-2.5 py-1.5 text-xs text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/30 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer max-w-[180px] font-medium truncate"
              >
                {storeOptions.map(s => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>
          </div>

          {/* 2. 转训主题 下拉选择 */}
          <div className="flex items-center gap-1.5">
            <span className="text-xs font-semibold text-slate-600 dark:text-slate-300 shrink-0">转训主题:</span>
            <select
              value={selectedTheme}
              onChange={(e) => setSelectedTheme(e.target.value)}
              className="bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-1.5 text-xs text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/30 font-semibold cursor-pointer min-w-[210px]"
            >
              {INSPECTION_THEMES.map(t => (
                <option key={t.id} value={t.name}>{t.name}</option>
              ))}
            </select>
          </div>

          {/* 3. 查询 & 重置 操作按钮 */}
          <div className="flex items-center gap-2 ml-auto">
            <button
              onClick={handleQuery}
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold transition-all shadow-sm shadow-blue-500/20 cursor-pointer"
            >
              <Search size={14} />
              <span>查询</span>
            </button>
            <button
              onClick={handleReset}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-slate-100 hover:bg-slate-200 dark:bg-slate-700 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-300 rounded-xl text-xs font-bold transition-all cursor-pointer"
            >
              <RotateCcw size={14} />
              <span>重置</span>
            </button>
          </div>

        </div>
      </div>

      {/* 三、数据概览 (6 Metric Cards Horizontal Layout) */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <span className="w-1.5 h-4 bg-blue-600 rounded-full"></span>
            <span>数据概览</span>
          </h2>
          <span className="text-[11px] text-slate-400">
            范围：{appliedFilters.region} {appliedFilters.district !== '全部' ? `· ${appliedFilters.district}` : ''} {appliedFilters.store !== '全部' ? `· ${appliedFilters.store}` : ''}
          </span>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3.5">
          
          {/* 1. 已转训门店数 (Clickable) */}
          <div
            onClick={() => {
              setActiveModal('trained');
              setModalPage(1);
            }}
            className="group bg-white dark:bg-slate-800 p-4 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-2xs hover:border-blue-300 dark:hover:border-blue-600 hover:shadow-md transition-all cursor-pointer relative overflow-hidden flex flex-col justify-between min-h-[110px]"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">已转训门店数</span>
              <div className="p-1.5 bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 rounded-lg group-hover:scale-110 transition-transform">
                <Store size={15} />
              </div>
            </div>
            <div>
              <div className="text-2xl font-black text-slate-900 dark:text-white font-mono tracking-tight">
                {overviewStats.trainedCount}<span className="text-xs font-normal text-slate-400 ml-1">家</span>
              </div>
              <div className="text-[10px] text-blue-600 dark:text-blue-400 font-medium mt-0.5 flex items-center gap-1 group-hover:underline">
                <span>点击查看明细</span>
                <span>→</span>
              </div>
            </div>
          </div>

          {/* 2. 未转训门店数 (Clickable) */}
          <div
            onClick={() => {
              setActiveModal('untrained');
              setModalPage(1);
            }}
            className="group bg-white dark:bg-slate-800 p-4 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-2xs hover:border-amber-300 dark:hover:border-amber-600 hover:shadow-md transition-all cursor-pointer relative overflow-hidden flex flex-col justify-between min-h-[110px]"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">未转训门店数</span>
              <div className="p-1.5 bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 rounded-lg group-hover:scale-110 transition-transform">
                <Building2 size={15} />
              </div>
            </div>
            <div>
              <div className="text-2xl font-black text-amber-600 dark:text-amber-400 font-mono tracking-tight">
                {overviewStats.untrainedCount}<span className="text-xs font-normal text-slate-400 ml-1">家</span>
              </div>
              <div className="text-[10px] text-amber-600 dark:text-amber-400 font-medium mt-0.5 flex items-center gap-1 group-hover:underline">
                <span>点击查看明细</span>
                <span>→</span>
              </div>
            </div>
          </div>

          {/* 3. 转训完成率 (Not Clickable) */}
          <div className="bg-white dark:bg-slate-800 p-4 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-2xs flex flex-col justify-between min-h-[110px]">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">转训完成率</span>
              <div className="p-1.5 bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 rounded-lg">
                <Percent size={15} />
              </div>
            </div>
            <div>
              <div className="text-2xl font-black text-slate-900 dark:text-white font-mono tracking-tight">
                {overviewStats.completionRate}
              </div>
              <div className="text-[10px] text-slate-400 mt-0.5">
                已转训门店 / 应转训门店
              </div>
            </div>
          </div>

          {/* 4. 转训检核总执行率 (Not Clickable) */}
          <div className="bg-white dark:bg-slate-800 p-4 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-2xs flex flex-col justify-between min-h-[110px]">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">转训检核总执行率</span>
              <div className="p-1.5 bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 rounded-lg">
                <Layers size={15} />
              </div>
            </div>
            <div>
              <div className="text-2xl font-black text-slate-900 dark:text-white font-mono tracking-tight">
                {overviewStats.totalExecutionRate}
              </div>
              <div className="text-[10px] text-slate-400 mt-0.5 truncate">
                全方案开口检核加权执行
              </div>
            </div>
          </div>

          {/* 5. 视频比对异常门店数 (Clickable) */}
          <div
            onClick={() => {
              setActiveModal('videoAnomaly');
              setModalPage(1);
            }}
            className="group bg-white dark:bg-slate-800 p-4 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-2xs hover:border-amber-300 dark:hover:border-amber-600 hover:shadow-md transition-all cursor-pointer relative overflow-hidden flex flex-col justify-between min-h-[110px]"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">视频比对异常门店数</span>
              <div className="p-1.5 bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 rounded-lg group-hover:scale-110 transition-transform">
                <Video size={15} />
              </div>
            </div>
            <div>
              <div className="text-2xl font-black text-amber-600 dark:text-amber-400 font-mono tracking-tight">
                {overviewStats.videoAnomalyCount}<span className="text-xs font-normal text-slate-400 ml-1">家</span>
              </div>
              <div className="text-[10px] text-amber-600 dark:text-amber-400 font-medium mt-0.5 flex items-center gap-1 group-hover:underline">
                <span>点击查看异常</span>
                <span>→</span>
              </div>
            </div>
          </div>

          {/* 6. 参训人数比对异常门店数 (Clickable) */}
          <div
            onClick={() => {
              setActiveModal('photoAnomaly');
              setModalPage(1);
            }}
            className="group bg-white dark:bg-slate-800 p-4 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-2xs hover:border-amber-300 dark:hover:border-amber-600 hover:shadow-md transition-all cursor-pointer relative overflow-hidden flex flex-col justify-between min-h-[110px]"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">参训人数比对异常门店数</span>
              <div className="p-1.5 bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 rounded-lg group-hover:scale-110 transition-transform">
                <Users size={15} />
              </div>
            </div>
            <div>
              <div className="text-2xl font-black text-amber-600 dark:text-amber-400 font-mono tracking-tight">
                {overviewStats.photoAnomalyCount}<span className="text-xs font-normal text-slate-400 ml-1">家</span>
              </div>
              <div className="text-[10px] text-amber-600 dark:text-amber-400 font-medium mt-0.5 flex items-center gap-1 group-hover:underline">
                <span>点击查看明细</span>
                <span>→</span>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* 四、转训检核数据 (13 Uniform Cards Grid Matrix) */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <span className="w-1.5 h-4 bg-indigo-600 rounded-full"></span>
            <span>{appliedFilters.theme}转训细项执行率（共13项）</span>
          </h2>
          <span className="text-[11px] text-slate-400 font-mono">
            全量13细项统一矩阵监控
          </span>
        </div>

        {/* 13 Item Grid: Responsive 5-6 cols on PC, Uniform clean style */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3">
          {INSPECTION_13_ITEMS.map((item) => (
            <div
              key={item.id}
              className="bg-white dark:bg-slate-800/90 rounded-2xl p-3.5 border border-slate-200/80 dark:border-slate-700 shadow-2xs hover:shadow-sm hover:border-blue-200 dark:hover:border-slate-600 transition-all flex flex-col justify-between min-h-[96px]"
            >
              {/* Top: #ID and subtle dot */}
              <div className="flex items-center justify-between text-xs">
                <span className="text-[11px] font-bold text-slate-400 dark:text-slate-500 font-mono">
                  {item.numberStr} 细项
                </span>
                <span className="w-2 h-2 rounded-full bg-emerald-500 ring-2 ring-emerald-500/20"></span>
              </div>

              {/* Middle: Name */}
              <div className="font-semibold text-xs text-slate-800 dark:text-slate-200 truncate py-1" title={item.name}>
                {item.name}
              </div>

              {/* Bottom: Big Percentage */}
              <div className="flex items-baseline justify-between pt-0.5 border-t border-slate-100 dark:border-slate-700/60">
                <span className="text-lg font-black text-slate-900 dark:text-white font-mono tracking-tight">
                  {item.rateStr}
                </span>
                <span className="text-[10px] text-slate-400">执行率</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 五、数据明细 (Full-Width Large Table with Sticky Left Columns) */}
      <div className="space-y-3">
        {/* 数据明细 模块工具栏 & 视图切换 & 筛选条件 */}
        <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-4 shadow-xs transition-colors">
          {/* 顶部操作行：模块标题、页签切换、数量统计、右侧下载按钮 */}
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex flex-wrap items-center gap-3">
              <h2 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <span className="w-1.5 h-4 bg-emerald-600 rounded-full"></span>
                <span>数据明细</span>
              </h2>

              {/* 场次聚合数据 / 场次明细数据 Tab Switcher */}
              <div className="flex items-center p-1 bg-slate-100 dark:bg-slate-900/80 rounded-xl border border-slate-200 dark:border-slate-700">
                <button
                  onClick={() => {
                    setDataViewTab('aggregated');
                    setDetailPage(1);
                  }}
                  className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    dataViewTab === 'aggregated'
                      ? 'bg-white dark:bg-slate-800 text-blue-600 dark:text-blue-400 shadow-xs'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  <Layers size={13} />
                  <span>场次聚合数据</span>
                </button>
                <button
                  onClick={() => {
                    setDataViewTab('detailed');
                    setDetailPage(1);
                  }}
                  className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    dataViewTab === 'detailed'
                      ? 'bg-white dark:bg-slate-800 text-blue-600 dark:text-blue-400 shadow-xs'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  <FileSpreadsheet size={13} />
                  <span>场次明细数据</span>
                </button>
              </div>

              <span className="text-xs text-slate-400 font-mono">
                (共 {totalTableRecords} 条{dataViewTab === 'aggregated' ? '门店聚合' : '场次明细'}档案)
              </span>
            </div>

            {/* 下载明细按钮 */}
            <button
              onClick={exportMainData}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-emerald-50 hover:bg-emerald-100 dark:bg-emerald-950/40 dark:hover:bg-emerald-900/50 text-emerald-700 dark:text-emerald-300 border border-emerald-300/80 dark:border-emerald-700/60 rounded-xl text-xs font-bold transition-all shadow-2xs cursor-pointer ml-auto"
            >
              <Download size={13} />
              <span>下载明细</span>
            </button>
          </div>

          {/* 页签下方专属筛选条件行：三个排在一行 */}
          <div className="pt-3 mt-3 border-t border-slate-100 dark:border-slate-700/60 flex flex-wrap items-center gap-3">
            {/* 1. 视频比对录音匹配率 */}
            <div className="flex items-center gap-2 bg-slate-50 dark:bg-slate-900/60 px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 text-xs">
              <span className="font-semibold text-slate-600 dark:text-slate-300 shrink-0">
                视频比对录音匹配率:
              </span>
              <select
                value={videoMatchFilter}
                onChange={(e) => {
                  setVideoMatchFilter(e.target.value);
                  setDetailPage(1);
                }}
                className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-2.5 py-1 text-xs text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/30 font-medium cursor-pointer"
              >
                <option value="全部">全部</option>
                <option value="大于90%">大于90%</option>
                <option value="大于80%">大于80%</option>
                <option value="小于80%">小于80%</option>
              </select>
            </div>

            {/* 2. 参训照片与人数匹配率 */}
            <div className="flex items-center gap-2 bg-slate-50 dark:bg-slate-900/60 px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 text-xs">
              <span className="font-semibold text-slate-600 dark:text-slate-300 shrink-0">
                参训照片与人数匹配率:
              </span>
              <select
                value={photoMatchFilter}
                onChange={(e) => {
                  setPhotoMatchFilter(e.target.value);
                  setDetailPage(1);
                }}
                className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-2.5 py-1 text-xs text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/30 font-medium cursor-pointer"
              >
                <option value="全部">全部</option>
                <option value="大于90%">大于90%</option>
                <option value="大于80%">大于80%</option>
                <option value="小于80%">小于80%</option>
              </select>
            </div>

            {/* 3. 转训时间范围 (场次明细数据专属，三个排在同一行) */}
            {dataViewTab === 'detailed' && (
              <div className="flex items-center gap-2 bg-slate-50 dark:bg-slate-900/60 px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 text-xs">
                <span className="font-semibold text-slate-600 dark:text-slate-300 shrink-0">
                  转训时间:
                </span>
                <div className="flex items-center gap-1.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-2.5 py-1">
                  <input
                    type="date"
                    value={detailStartDate}
                    onChange={(e) => {
                      setDetailStartDate(e.target.value);
                      setDetailPage(1);
                    }}
                    className="bg-transparent text-xs text-slate-800 dark:text-slate-200 focus:outline-none cursor-pointer"
                  />
                  <span className="text-xs text-slate-400 font-medium">-</span>
                  <input
                    type="date"
                    value={detailEndDate}
                    onChange={(e) => {
                      setDetailEndDate(e.target.value);
                      setDetailPage(1);
                    }}
                    className="bg-transparent text-xs text-slate-800 dark:text-slate-200 focus:outline-none cursor-pointer"
                  />
                </div>
                {(detailStartDate || detailEndDate) && (
                  <button
                    onClick={() => {
                      setDetailStartDate('');
                      setDetailEndDate('');
                      setDetailPage(1);
                      showToast('已清空转训时间筛选');
                    }}
                    className="inline-flex items-center gap-0.5 text-[11px] text-slate-400 hover:text-rose-500 transition-colors cursor-pointer ml-1"
                    title="清空转训时间筛选"
                  >
                    <X size={12} />
                    <span>清空</span>
                  </button>
                )}
              </div>
            )}

            {/* 快捷清除明细筛选 */}
            {(videoMatchFilter !== '全部' || photoMatchFilter !== '全部' || (dataViewTab === 'detailed' && (detailStartDate || detailEndDate))) && (
              <button
                onClick={() => {
                  setVideoMatchFilter('全部');
                  setPhotoMatchFilter('全部');
                  if (dataViewTab === 'detailed') {
                    setDetailStartDate('');
                    setDetailEndDate('');
                  }
                  setDetailPage(1);
                  showToast('已重置数据明细筛选');
                }}
                className="inline-flex items-center gap-1 text-xs text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 hover:underline font-medium cursor-pointer ml-auto sm:ml-1"
              >
                <RotateCcw size={12} />
                <span>重置明细筛选</span>
              </button>
            )}
          </div>
        </div>

        <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-xs overflow-hidden transition-colors">
          <div className="overflow-x-auto max-h-[640px]">
            <table className="w-full text-left text-xs border-collapse whitespace-nowrap">
              {/* Table Multi-Header */}
              <thead className="sticky top-0 z-30 bg-slate-50 dark:bg-slate-900/95 backdrop-blur-xs text-slate-600 dark:text-slate-300 border-b border-slate-200 dark:border-slate-700 font-bold">
                
                {/* Level 1 Group Header */}
                <tr className="border-b border-slate-200 dark:border-slate-700 text-[11px]">
                  <th colSpan={dataViewTab === 'detailed' ? 13 : 9} className="py-2.5 px-4 bg-slate-100/70 dark:bg-slate-900/80 border-r border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300">
                    门店基础信息与AI比对核验 {dataViewTab === 'aggregated' ? '（场次聚合）' : '（场次明细）'}
                  </th>
                  <th colSpan={3} className="py-2.5 px-3 bg-blue-50/70 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300 text-center border-r border-slate-200 dark:border-slate-700">
                    对比思路模块 (一级总转训率)
                  </th>
                  <th colSpan={4} className="py-2.5 px-3 bg-amber-50/70 dark:bg-amber-950/40 text-amber-700 dark:text-amber-300 text-center border-r border-slate-200 dark:border-slate-700">
                    攻击模块 (一级总转训率)
                  </th>
                  <th colSpan={4} className="py-2.5 px-3 bg-teal-50/70 dark:bg-teal-950/40 text-teal-700 dark:text-teal-300 text-center border-r border-slate-200 dark:border-slate-700">
                    防守模块 (一级总转训率)
                  </th>
                  <th colSpan={6} className="py-2.5 px-3 bg-purple-50/70 dark:bg-purple-950/40 text-purple-700 dark:text-purple-300 text-center">
                    绝杀模块 (一级总转训率)
                  </th>
                </tr>

                {/* Sub-Header Row */}
                <tr className="text-slate-700 dark:text-slate-300">
                  {/* Fixed Left Columns: 序号, 操作, 门店编码, 门店名称 */}
                  <th className="py-3 px-3 text-center sticky left-0 z-40 bg-slate-50 dark:bg-slate-900 w-12 border-r border-slate-200 dark:border-slate-700">
                    序号
                  </th>
                  <th className="py-3 px-2 text-center sticky left-12 z-40 bg-slate-50 dark:bg-slate-900 w-14 border-r border-slate-200 dark:border-slate-700">
                    操作
                  </th>
                  <th className="py-3 px-3.5 sticky left-[104px] z-40 bg-slate-50 dark:bg-slate-900 border-r border-slate-200 dark:border-slate-700 w-[95px]">
                    门店编码
                  </th>
                  <th className="py-3 px-4 sticky left-[199px] z-40 bg-slate-50 dark:bg-slate-900 border-r border-slate-200 dark:border-slate-700 shadow-[2px_0_5px_-2px_rgba(0,0,0,0.1)] min-w-[200px]">
                    门店名称
                  </th>

                  {/* Base Columns */}
                  {dataViewTab === 'detailed' && <th className="py-3 px-3">日期</th>}
                  <th className="py-3 px-3">大区</th>
                  <th className="py-3 px-3">小区</th>

                  {/* 场次明细专属字段 (场次聚合数据中去掉转训场次和具体时间) */}
                  {dataViewTab === 'detailed' && (
                    <>
                      <th className="py-3 px-3 text-center bg-blue-50/30 dark:bg-blue-950/20 text-blue-700 dark:text-blue-300">转训场次</th>
                      <th className="py-3 px-3">转训开始时间</th>
                      <th className="py-3 px-3">转训结束时间</th>
                    </>
                  )}

                  <th className="py-3 px-3 text-center">视频比对录音匹配率</th>
                  <th className="py-3 px-3 text-center">参训照片与人数匹配率</th>
                  <th className="py-3 px-3.5 text-center font-bold text-blue-600 dark:text-blue-400 border-r border-slate-200 dark:border-slate-700">
                    转训检核总执行率
                  </th>

                  {/* 对比思路 */}
                  <th className="py-3 px-3 text-center font-bold bg-blue-50/40 dark:bg-blue-950/20 text-blue-700 dark:text-blue-300">对比思路总转训率</th>
                  <th className="py-3 px-3 text-center">竞品基本信息</th>
                  <th className="py-3 px-3 text-center border-r border-slate-200 dark:border-slate-700">对比核心思路</th>

                  {/* 攻击 */}
                  <th className="py-3 px-3 text-center font-bold bg-amber-50/40 dark:bg-amber-950/20 text-amber-700 dark:text-amber-300">攻击总转训率</th>
                  <th className="py-3 px-3 text-center">攻击</th>
                  <th className="py-3 px-3 text-center">设计翻车</th>
                  <th className="py-3 px-3 text-center border-r border-slate-200 dark:border-slate-700">动力成短板</th>

                  {/* 防守 */}
                  <th className="py-3 px-3 text-center font-bold bg-teal-50/40 dark:bg-teal-950/20 text-teal-700 dark:text-teal-300">防守总转训率</th>
                  <th className="py-3 px-3 text-center">固定阻尼悬架</th>
                  <th className="py-3 px-3 text-center">补能焦虑</th>
                  <th className="py-3 px-3 text-center border-r border-slate-200 dark:border-slate-700">视平线全景显示</th>

                  {/* 绝杀 */}
                  <th className="py-3 px-3 text-center font-bold bg-purple-50/40 dark:bg-purple-950/20 text-purple-700 dark:text-purple-300">绝杀总转训率</th>
                  <th className="py-3 px-3 text-center">智能化</th>
                  <th className="py-3 px-3 text-center">阉割版智驾硬件</th>
                  <th className="py-3 px-3 text-center">算力差距</th>
                  <th className="py-3 px-3 text-center">二次收费割韭菜</th>
                  <th className="py-3 px-3 text-center">智舱落后</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-100 dark:divide-slate-700/60 text-slate-700 dark:text-slate-200">
                {paginatedRecords.length === 0 ? (
                  <tr>
                    <td colSpan={dataViewTab === 'detailed' ? 29 : 26} className="py-12 text-center text-slate-400 dark:text-slate-500">
                      <div className="flex flex-col items-center justify-center gap-2">
                        <AlertTriangle size={24} className="text-amber-500/80" />
                        <span className="text-xs font-medium">暂无符合筛选条件的门店转训检核档案</span>
                        <button
                          onClick={() => {
                            setVideoMatchFilter('全部');
                            setPhotoMatchFilter('全部');
                            setDetailPage(1);
                          }}
                          className="text-xs text-blue-600 dark:text-blue-400 hover:underline font-semibold cursor-pointer mt-1"
                        >
                          重置明细匹配率筛选条件
                        </button>
                      </div>
                    </td>
                  </tr>
                ) : (
                  paginatedRecords.map((r: any, index) => {
                    const displayIndex = (detailPage - 1) * pageSize + index + 1;
                    const isVideoLow = r.videoMatchRate < 80;
                    const isPhotoLow = r.photoMatchRate < 80;

                    return (
                      <tr 
                        key={r.id} 
                        className="hover:bg-blue-50/30 dark:hover:bg-slate-700/40 transition-colors"
                      >
                        {/* Fixed Column 1: 序号 */}
                        <td className="py-3.5 px-3 text-center font-mono text-slate-400 sticky left-0 z-20 bg-white dark:bg-slate-800 border-r border-slate-200 dark:border-slate-700">
                          {displayIndex}
                        </td>

                        {/* Fixed Column 2: 操作 (统一音视频多模态档案入口 icon) */}
                        <td className="py-3.5 px-2 text-center sticky left-12 z-20 bg-white dark:bg-slate-800 border-r border-slate-200 dark:border-slate-700 w-14">
                          <div className="flex items-center justify-center">
                            <button
                              onClick={() => {
                                setSelectedMediaRecord(r);
                                setMediaActiveSession(r.sessionNumber || 1);
                                setIsAudioPlaying(false);
                              }}
                              className="p-1 text-blue-600 hover:text-blue-700 hover:bg-blue-50 dark:text-blue-400 dark:hover:bg-slate-700/80 rounded-lg transition-colors cursor-pointer group"
                              title="查看转训多模态档案 (音视频录像/工牌录音/实拍照/参训名单)"
                            >
                              <div className="relative flex items-center justify-center w-7 h-7 rounded-lg bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-800/80 group-hover:border-blue-400 group-hover:bg-blue-100/70 transition-colors">
                                <Video size={13} className="text-blue-600 dark:text-blue-400 group-hover:scale-110 transition-transform" />
                                <Headphones size={8} className="absolute -bottom-1 -right-1 text-emerald-600 dark:text-emerald-400 bg-white dark:bg-slate-800 rounded-full p-0.5 border border-slate-200 dark:border-slate-700 shadow-2xs" />
                              </div>
                            </button>
                          </div>
                        </td>

                        {/* Fixed Column 3: 门店编码 */}
                        <td className="py-3.5 px-3.5 font-mono text-slate-600 dark:text-slate-300 font-semibold sticky left-[104px] z-20 bg-white dark:bg-slate-800 border-r border-slate-200 dark:border-slate-700 w-[95px]">
                          {r.storeCode}
                        </td>

                        {/* Fixed Column 4: 门店名称 */}
                        <td className="py-3.5 px-4 font-bold text-slate-900 dark:text-white sticky left-[199px] z-20 bg-white dark:bg-slate-800 border-r border-slate-200 dark:border-slate-700 shadow-[2px_0_5px_-2px_rgba(0,0,0,0.1)]">
                          {r.storeName}
                        </td>

                        {/* Base fields */}
                        {dataViewTab === 'detailed' && (
                          <td className="py-3.5 px-3 font-mono text-slate-500">{r.date}</td>
                        )}
                        <td className="py-3.5 px-3 font-medium">{r.region}</td>
                        <td className="py-3.5 px-3 text-slate-500">{r.district}</td>

                        {/* 场次明细专属字段展示 */}
                        {dataViewTab === 'detailed' && (
                          <>
                            <td className="py-3.5 px-3 text-center font-mono font-semibold">
                              <span className="inline-block px-2 py-0.5 rounded-md bg-blue-50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400 border border-blue-200/60 dark:border-blue-800/50 text-xs">
                                {r.sessionName}
                              </span>
                            </td>
                            <td className="py-3.5 px-3 font-mono text-[11px] text-slate-500">{r.sessionStartTime}</td>
                            <td className="py-3.5 px-3 font-mono text-[11px] text-slate-500">{r.sessionEndTime}</td>
                          </>
                        )}

                        {/* 视频比对录音匹配率 */}
                        <td className="py-3.5 px-3 text-center font-mono">
                          {isVideoLow ? (
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-rose-50 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400 font-bold text-[11px]">
                              <AlertTriangle size={11} />
                              <span>{r.videoMatchRate}% (异常)</span>
                            </span>
                          ) : (
                            <span className="font-semibold text-emerald-600 dark:text-emerald-400">{r.videoMatchRate}%</span>
                          )}
                        </td>

                        {/* 参训照片与人数匹配率 */}
                        <td className="py-3.5 px-3 text-center font-mono">
                          {isPhotoLow ? (
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 font-bold text-[11px]">
                              <AlertTriangle size={11} />
                              <span>{r.photoMatchRate}% (异常)</span>
                            </span>
                          ) : (
                            <span className="font-semibold text-slate-800 dark:text-slate-200">{r.photoMatchRate}%</span>
                          )}
                        </td>

                        {/* 转训检核总执行率 */}
                        <td className="py-3.5 px-3.5 text-center font-mono font-bold text-blue-600 dark:text-blue-400 bg-blue-50/20 dark:bg-blue-950/10 border-r border-slate-200 dark:border-slate-700">
                          {r.totalExecutionRate}%
                        </td>

                        {/* 对比思路 */}
                        <td className="py-3.5 px-3 text-center font-mono font-bold text-blue-600 dark:text-blue-400 bg-blue-50/30 dark:bg-blue-950/20">{r.comp1_contrast}%</td>
                        <td className="py-3.5 px-3 text-center font-mono">{r.item1}%</td>
                        <td className="py-3.5 px-3 text-center font-mono border-r border-slate-200 dark:border-slate-700">{r.item2}%</td>

                        {/* 攻击 */}
                        <td className="py-3.5 px-3 text-center font-mono font-bold text-amber-600 dark:text-amber-400 bg-amber-50/30 dark:bg-amber-950/20">{r.comp2_attack}%</td>
                        <td className="py-3.5 px-3 text-center font-mono">{r.item3}%</td>
                        <td className="py-3.5 px-3 text-center font-mono">{r.item4}%</td>
                        <td className="py-3.5 px-3 text-center font-mono border-r border-slate-200 dark:border-slate-700">{r.item5}%</td>

                        {/* 防守 */}
                        <td className="py-3.5 px-3 text-center font-mono font-bold text-teal-600 dark:text-teal-400 bg-teal-50/30 dark:bg-teal-950/20">{r.comp3_defense}%</td>
                        <td className="py-3.5 px-3 text-center font-mono">{r.item6}%</td>
                        <td className="py-3.5 px-3 text-center font-mono">{r.item7}%</td>
                        <td className="py-3.5 px-3 text-center font-mono border-r border-slate-200 dark:border-slate-700">{r.item8}%</td>

                        {/* 绝杀 */}
                        <td className="py-3.5 px-3 text-center font-mono font-bold text-purple-600 dark:text-purple-400 bg-purple-50/30 dark:bg-purple-950/20">{r.comp4_kill}%</td>
                        <td className="py-3.5 px-3 text-center font-mono">{r.item9}%</td>
                        <td className="py-3.5 px-3 text-center font-mono">{r.item10}%</td>
                        <td className="py-3.5 px-3 text-center font-mono">{r.item11}%</td>
                        <td className="py-3.5 px-3 text-center font-mono">{r.item12}%</td>
                        <td className="py-3.5 px-3 text-center font-mono">{r.item13}%</td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>

          {/* 表格底部标准分页 */}
          <div className="px-5 py-4 border-t border-slate-200 dark:border-slate-700 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
            <div className="flex items-center gap-3 text-slate-500 dark:text-slate-400">
              <span>共 {totalTableRecords} 条</span>
              <select
                value={pageSize}
                onChange={(e) => {
                  setPageSize(Number(e.target.value));
                  setDetailPage(1);
                }}
                className="bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-700 rounded-lg px-2.5 py-1 text-slate-700 dark:text-slate-300 focus:outline-none cursor-pointer"
              >
                <option value={10}>10条/页</option>
                <option value={20}>20条/页</option>
                <option value={50}>50条/页</option>
                <option value={100}>100条/页</option>
              </select>
            </div>

            <div className="flex items-center gap-1.5">
              <button
                disabled={detailPage <= 1}
                onClick={() => setDetailPage(p => Math.max(p - 1, 1))}
                className={`flex items-center gap-1 px-3 py-1.5 rounded-lg border text-xs font-medium transition-all ${
                  detailPage <= 1
                    ? 'border-slate-200 dark:border-slate-700 text-slate-300 dark:text-slate-600 cursor-not-allowed'
                    : 'border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 cursor-pointer'
                }`}
              >
                <ChevronLeft size={13} />
                <span>上一页</span>
              </button>

              {getPageNumbers(detailPage, totalPages).map((pageNum, idx) => {
                if (pageNum === '...') {
                  return (
                    <span key={`ellipsis-${idx}`} className="text-slate-400 px-1 select-none">
                      ...
                    </span>
                  );
                }
                const page = Number(pageNum);
                return (
                  <button
                    key={page}
                    onClick={() => setDetailPage(page)}
                    className={`w-8 h-8 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                      detailPage === page
                        ? 'bg-blue-600 text-white shadow-sm shadow-blue-500/20'
                        : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 border border-transparent'
                    }`}
                  >
                    {page}
                  </button>
                );
              })}

              <button
                disabled={detailPage >= totalPages}
                onClick={() => setDetailPage(p => Math.min(p + 1, totalPages))}
                className={`flex items-center gap-1 px-3 py-1.5 rounded-lg border text-xs font-medium transition-all ${
                  detailPage >= totalPages
                    ? 'border-slate-200 dark:border-slate-700 text-slate-300 dark:text-slate-600 cursor-not-allowed'
                    : 'border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 cursor-pointer'
                }`}
              >
                <span>下一页</span>
                <ChevronRight size={13} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 八、统一弹窗设计 (Modals for the 4 Clickable Metric Cards) */}

      {/* 弹窗 1: 已转训门店明细 */}
      {activeModal === 'trained' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="bg-white dark:bg-slate-800 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-2xl w-full max-w-4xl overflow-hidden flex flex-col max-h-[85vh]">
            {/* Header */}
            <div className="px-6 py-4.5 border-b border-slate-100 dark:border-slate-700 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="p-2 bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 rounded-xl">
                  <Store size={18} />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white">
                    已转训门店明细
                  </h3>
                  <p className="text-xs text-slate-400">
                    当前筛选范围已完成转训的经销商列表
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    const headers = ['序号', '大区', '小区', '门店编码', '门店名称', '最近转训时间'];
                    const rows = filteredRecords.map((r, i) => [i + 1, r.region, r.district, r.storeCode, r.storeName, r.endTime]);
                    downloadCSV('已转训门店明细', [headers, ...rows]);
                  }}
                  className="inline-flex items-center gap-1 px-3 py-1.5 bg-blue-50 hover:bg-blue-100 dark:bg-blue-950/60 dark:hover:bg-blue-900/50 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800 rounded-xl text-xs font-bold cursor-pointer transition-colors"
                >
                  <Download size={13} />
                  <span>下载明细</span>
                </button>
                <button
                  onClick={() => setActiveModal(null)}
                  className="p-1.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors cursor-pointer"
                >
                  <X size={18} />
                </button>
              </div>
            </div>

            {/* Table Body */}
            <div className="p-6 overflow-y-auto flex-1">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-slate-50 dark:bg-slate-900/60 text-slate-600 dark:text-slate-300 border-b border-slate-200 dark:border-slate-700 font-bold">
                    <th className="py-3 px-3 text-center w-12">序号</th>
                    <th className="py-3 px-3">大区</th>
                    <th className="py-3 px-3">小区</th>
                    <th className="py-3 px-3">门店编码</th>
                    <th className="py-3 px-4">门店名称</th>
                    <th className="py-3 px-4">最近转训时间</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-700/60 text-slate-700 dark:text-slate-200">
                  {filteredRecords.map((r, i) => (
                    <tr key={r.id} className="hover:bg-slate-50 dark:hover:bg-slate-700/40">
                      <td className="py-3 px-3 text-center font-mono text-slate-400">{i + 1}</td>
                      <td className="py-3 px-3 font-medium">{r.region}</td>
                      <td className="py-3 px-3 text-slate-500">{r.district}</td>
                      <td className="py-3 px-3 font-mono font-semibold">{r.storeCode}</td>
                      <td className="py-3 px-4 font-bold text-slate-900 dark:text-white">{r.storeName}</td>
                      <td className="py-3 px-4 font-mono text-slate-500">{r.endTime}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Footer Pagination */}
            <div className="px-6 py-3.5 bg-slate-50 dark:bg-slate-900/60 border-t border-slate-100 dark:border-slate-700 flex items-center justify-between text-xs">
              <span className="text-slate-400">显示 1-{filteredRecords.length} 条，共 {overviewStats.trainedCount} 家</span>
              <button
                onClick={() => setActiveModal(null)}
                className="px-4 py-1.5 bg-slate-200 hover:bg-slate-300 dark:bg-slate-700 dark:hover:bg-slate-600 rounded-xl font-bold transition-colors cursor-pointer"
              >
                关闭
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 弹窗 2: 未转训门店明细 */}
      {activeModal === 'untrained' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="bg-white dark:bg-slate-800 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-2xl w-full max-w-3xl overflow-hidden flex flex-col max-h-[85vh]">
            {/* Header */}
            <div className="px-6 py-4.5 border-b border-slate-100 dark:border-slate-700 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="p-2 bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 rounded-xl">
                  <Building2 size={18} />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white">
                    未转训门店明细
                  </h3>
                  <p className="text-xs text-slate-400">
                    当前转训任务周期内尚未录入转训记录的门店
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    const headers = ['序号', '大区', '小区', '门店编码', '门店名称'];
                    const rows = filteredUntrainedStores.map((r, i) => [i + 1, r.region, r.district, r.storeCode, r.storeName]);
                    downloadCSV('未转训门店明细', [headers, ...rows]);
                  }}
                  className="inline-flex items-center gap-1 px-3 py-1.5 bg-amber-50 hover:bg-amber-100 dark:bg-amber-950/60 dark:hover:bg-amber-900/50 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-800 rounded-xl text-xs font-bold cursor-pointer transition-colors"
                >
                  <Download size={13} />
                  <span>下载明细</span>
                </button>
                <button
                  onClick={() => setActiveModal(null)}
                  className="p-1.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors cursor-pointer"
                >
                  <X size={18} />
                </button>
              </div>
            </div>

            {/* Table Body */}
            <div className="p-6 overflow-y-auto flex-1">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-slate-50 dark:bg-slate-900/60 text-slate-600 dark:text-slate-300 border-b border-slate-200 dark:border-slate-700 font-bold">
                    <th className="py-3 px-3 text-center w-12">序号</th>
                    <th className="py-3 px-3">大区</th>
                    <th className="py-3 px-3">小区</th>
                    <th className="py-3 px-3">门店编码</th>
                    <th className="py-3 px-4">门店名称</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-700/60 text-slate-700 dark:text-slate-200">
                  {filteredUntrainedStores.map((r, i) => (
                    <tr key={r.id} className="hover:bg-slate-50 dark:hover:bg-slate-700/40">
                      <td className="py-3 px-3 text-center font-mono text-slate-400">{i + 1}</td>
                      <td className="py-3 px-3 font-medium">{r.region}</td>
                      <td className="py-3 px-3 text-slate-500">{r.district}</td>
                      <td className="py-3 px-3 font-mono font-semibold text-amber-600">{r.storeCode}</td>
                      <td className="py-3 px-4 font-bold text-slate-900 dark:text-white">{r.storeName}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Footer Pagination */}
            <div className="px-6 py-3.5 bg-slate-50 dark:bg-slate-900/60 border-t border-slate-100 dark:border-slate-700 flex items-center justify-between text-xs">
              <span className="text-slate-400">共 {filteredUntrainedStores.length} 家未转训门店</span>
              <button
                onClick={() => setActiveModal(null)}
                className="px-4 py-1.5 bg-slate-200 hover:bg-slate-300 dark:bg-slate-700 dark:hover:bg-slate-600 rounded-xl font-bold transition-colors cursor-pointer"
              >
                关闭
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 弹窗 3: 视频比对异常门店 */}
      {activeModal === 'videoAnomaly' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="bg-white dark:bg-slate-800 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-2xl w-full max-w-4xl overflow-hidden flex flex-col max-h-[85vh]">
            {/* Header */}
            <div className="px-6 py-4.5 border-b border-slate-100 dark:border-slate-700 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="p-2 bg-rose-50 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400 rounded-xl">
                  <Video size={18} />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white">
                    视频比对异常门店
                  </h3>
                  <p className="text-xs text-slate-400">
                    实录视频与智能工牌录音匹配率低于 85% 预警阈值的门店
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    const headers = ['序号', '大区', '小区', '门店编码', '门店名称', '转训场次', '转训时间', '视频比对录音匹配率', '状态'];
                    const rows = videoAnomalyRecords.map((r, i) => [i + 1, r.region, r.district, r.storeCode, r.storeName, r.sessions, r.startTime, `${r.videoMatchRate}%`, '异常']);
                    downloadCSV('视频比对异常门店', [headers, ...rows]);
                  }}
                  className="inline-flex items-center gap-1 px-3 py-1.5 bg-rose-50 hover:bg-rose-100 dark:bg-rose-950/60 dark:hover:bg-rose-900/50 text-rose-700 dark:text-rose-300 border border-rose-200 dark:border-rose-800 rounded-xl text-xs font-bold cursor-pointer transition-colors"
                >
                  <Download size={13} />
                  <span>下载明细</span>
                </button>
                <button
                  onClick={() => setActiveModal(null)}
                  className="p-1.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors cursor-pointer"
                >
                  <X size={18} />
                </button>
              </div>
            </div>

            {/* Table Body */}
            <div className="p-6 overflow-y-auto flex-1">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-slate-50 dark:bg-slate-900/60 text-slate-600 dark:text-slate-300 border-b border-slate-200 dark:border-slate-700 font-bold">
                    <th className="py-3 px-3 text-center w-12">序号</th>
                    <th className="py-3 px-3">大区</th>
                    <th className="py-3 px-3">小区</th>
                    <th className="py-3 px-3">门店编码</th>
                    <th className="py-3 px-4">门店名称</th>
                    <th className="py-3 px-3 text-center">转训场次</th>
                    <th className="py-3 px-3">转训时间</th>
                    <th className="py-3 px-3 text-center">视频比对录音匹配率</th>
                    <th className="py-3 px-3 text-center">状态</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-700/60 text-slate-700 dark:text-slate-200">
                  {videoAnomalyRecords.map((r, i) => (
                    <tr key={r.id} className="hover:bg-rose-50/30 dark:hover:bg-slate-700/40">
                      <td className="py-3 px-3 text-center font-mono text-slate-400">{i + 1}</td>
                      <td className="py-3 px-3 font-medium">{r.region}</td>
                      <td className="py-3 px-3 text-slate-500">{r.district}</td>
                      <td className="py-3 px-3 font-mono font-semibold">{r.storeCode}</td>
                      <td className="py-3 px-4 font-bold text-slate-900 dark:text-white">{r.storeName}</td>
                      <td className="py-3 px-3 text-center font-mono font-bold">{r.sessions}</td>
                      <td className="py-3 px-3 font-mono text-slate-500">{r.startTime}</td>
                      <td className="py-3 px-3 text-center font-mono font-bold text-rose-600 dark:text-rose-400">{r.videoMatchRate}%</td>
                      <td className="py-3 px-3 text-center">
                        <span className="px-2 py-0.5 rounded-full bg-rose-100 dark:bg-rose-950 text-rose-700 dark:text-rose-300 text-[10px] font-bold">
                          比对异常
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Footer Pagination */}
            <div className="px-6 py-3.5 bg-slate-50 dark:bg-slate-900/60 border-t border-slate-100 dark:border-slate-700 flex items-center justify-between text-xs">
              <span className="text-slate-400">共 {videoAnomalyRecords.length} 家视频比对异常门店</span>
              <button
                onClick={() => setActiveModal(null)}
                className="px-4 py-1.5 bg-slate-200 hover:bg-slate-300 dark:bg-slate-700 dark:hover:bg-slate-600 rounded-xl font-bold transition-colors cursor-pointer"
              >
                关闭
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 弹窗 4: 参训人数比对异常明细 */}
      {activeModal === 'photoAnomaly' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="bg-white dark:bg-slate-800 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-2xl w-full max-w-5xl overflow-hidden flex flex-col max-h-[85vh]">
            {/* Header */}
            <div className="px-6 py-4.5 border-b border-slate-100 dark:border-slate-700 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="p-2 bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 rounded-xl">
                  <Users size={18} />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white">
                    参训人数比对异常明细
                  </h3>
                  <p className="text-xs text-slate-400">
                    实录现场照片AI人脸识别核验人数与系统填报参训人数不匹配的门店
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    const headers = ['序号', '大区', '小区', '门店编码', '门店名称', '转训场次', '系统填写人数', '照片识别人数', '参训照片与人数匹配率'];
                    const rows = photoAnomalyRecords.map((r, i) => [
                      i + 1, r.region, r.district, r.storeCode, r.storeName, r.sessions, 
                      r.systemFillCount || 15, r.photoDetectedCount || 12, `${r.photoMatchRate}%`
                    ]);
                    downloadCSV('参训人数比对异常明细', [headers, ...rows]);
                  }}
                  className="inline-flex items-center gap-1 px-3 py-1.5 bg-amber-50 hover:bg-amber-100 dark:bg-amber-950/60 dark:hover:bg-amber-900/50 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-800 rounded-xl text-xs font-bold cursor-pointer transition-colors"
                >
                  <Download size={13} />
                  <span>下载明细</span>
                </button>
                <button
                  onClick={() => setActiveModal(null)}
                  className="p-1.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors cursor-pointer"
                >
                  <X size={18} />
                </button>
              </div>
            </div>

            {/* Table Body */}
            <div className="p-6 overflow-y-auto flex-1">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-slate-50 dark:bg-slate-900/60 text-slate-600 dark:text-slate-300 border-b border-slate-200 dark:border-slate-700 font-bold">
                    <th className="py-3 px-3 text-center w-12">序号</th>
                    <th className="py-3 px-3">大区</th>
                    <th className="py-3 px-3">小区</th>
                    <th className="py-3 px-3">门店编码</th>
                    <th className="py-3 px-4">门店名称</th>
                    <th className="py-3 px-3 text-center">转训场次</th>
                    <th className="py-3 px-3 text-center">系统填写人数</th>
                    <th className="py-3 px-3 text-center">照片识别人数</th>
                    <th className="py-3 px-3 text-center">参训照片与人数匹配率</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-700/60 text-slate-700 dark:text-slate-200">
                  {photoAnomalyRecords.map((r, i) => (
                    <tr key={r.id} className="hover:bg-amber-50/30 dark:hover:bg-slate-700/40">
                      <td className="py-3 px-3 text-center font-mono text-slate-400">{i + 1}</td>
                      <td className="py-3 px-3 font-medium">{r.region}</td>
                      <td className="py-3 px-3 text-slate-500">{r.district}</td>
                      <td className="py-3 px-3 font-mono font-semibold">{r.storeCode}</td>
                      <td className="py-3 px-4 font-bold text-slate-900 dark:text-white">{r.storeName}</td>
                      <td className="py-3 px-3 text-center font-mono font-bold">{r.sessions}</td>
                      <td className="py-3 px-3 text-center font-mono font-semibold text-slate-700 dark:text-slate-300">
                        {r.systemFillCount || 15} 人
                      </td>
                      <td className="py-3 px-3 text-center font-mono font-semibold text-rose-600 dark:text-rose-400">
                        {r.photoDetectedCount || 12} 人
                      </td>
                      <td className="py-3 px-3 text-center font-mono font-bold text-amber-600 dark:text-amber-400">
                        {r.photoMatchRate}%
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Footer Pagination */}
            <div className="px-6 py-3.5 bg-slate-50 dark:bg-slate-900/60 border-t border-slate-100 dark:border-slate-700 flex items-center justify-between text-xs">
              <span className="text-slate-400">共 {photoAnomalyRecords.length} 家参训人数比对异常记录</span>
              <button
                onClick={() => setActiveModal(null)}
                className="px-4 py-1.5 bg-slate-200 hover:bg-slate-300 dark:bg-slate-700 dark:hover:bg-slate-600 rounded-xl font-bold transition-colors cursor-pointer"
              >
                关闭
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 弹窗 5: 统一转训多模态档案 (音视频录像/工牌录音/实拍照/参训名单) */}
      {selectedMediaRecord && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-150 overflow-y-auto">
          <div className="bg-white dark:bg-slate-800 rounded-3xl max-w-6xl w-full max-h-[92vh] overflow-hidden shadow-2xl border border-slate-200 dark:border-slate-700 flex flex-col">
            
            {/* 1. 弹窗顶部标题栏 */}
            <div className="flex flex-wrap items-center justify-between px-6 py-4 border-b border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/70 shrink-0 gap-3">
              <div className="flex flex-wrap items-center gap-3">
                <div className="p-2 rounded-xl bg-blue-100 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400">
                  <Video size={18} />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold text-slate-900 dark:text-white text-base">
                      转训检核多模态档案
                    </h3>
                    <span className="font-mono text-xs px-2 py-0.5 rounded-md bg-blue-50 dark:bg-blue-950/80 text-blue-700 dark:text-blue-300 font-bold border border-blue-200 dark:border-blue-900">
                      {selectedMediaRecord.storeCode}
                    </span>
                    {dataViewTab === 'detailed' && (
                      <span className="text-xs px-2.5 py-0.5 rounded-md bg-blue-600 text-white font-bold shadow-2xs">
                        {selectedMediaRecord.sessionName || `第${selectedMediaRecord.sessionNumber || 1}场次`}
                        {selectedMediaRecord.sessionStartTime ? ` (${selectedMediaRecord.sessionStartTime.split(' ')[1] || selectedMediaRecord.sessionStartTime}-${selectedMediaRecord.sessionEndTime ? (selectedMediaRecord.sessionEndTime.split(' ')[1] || selectedMediaRecord.sessionEndTime) : ''})` : ''}
                      </span>
                    )}
                    <span className="text-xs px-2 py-0.5 rounded-md bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 font-bold border border-emerald-200/60 dark:border-emerald-800/60">
                      总执行率 {selectedMediaRecord.totalExecutionRate}%
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                    {selectedMediaRecord.storeName} &nbsp;|&nbsp; {selectedMediaRecord.region} · {selectedMediaRecord.district} &nbsp;|&nbsp; {selectedMediaRecord.date} &nbsp;|&nbsp; 主题: {appliedFilters.theme}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button 
                  onClick={() => {
                    setSelectedMediaRecord(null);
                    setIsAudioPlaying(false);
                  }}
                  className="p-1.5 rounded-xl hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-400 hover:text-slate-700 dark:hover:text-white transition-colors cursor-pointer"
                  title="关闭"
                >
                  <X size={18} />
                </button>
              </div>
            </div>

            {/* 2. 场次选择页签 (仅在“场次聚合数据”视图下展示多场次切换；在“场次明细数据”页签下直接查看单场，按用户要求去掉此栏) */}
            {dataViewTab !== 'detailed' && (
              <div className="px-6 py-2.5 bg-slate-100/70 dark:bg-slate-900/50 border-b border-slate-200 dark:border-slate-700 flex flex-wrap items-center justify-between gap-3 shrink-0">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-semibold text-slate-600 dark:text-slate-300 flex items-center gap-1.5">
                    <Layers size={13} className="text-blue-600 dark:text-blue-400" />
                    <span>转训场次:</span>
                  </span>
                  <div className="flex items-center gap-1.5">
                    {Array.from({ length: Math.max(1, selectedMediaRecord.sessions || 1) }, (_, i) => i + 1).map((s) => {
                      const baseDate = selectedMediaRecord.date || '2026-09-01';
                      let sessionTimeRange = '';
                      if (s === 1) {
                        sessionTimeRange = selectedMediaRecord.sessionStartTime
                          ? `${selectedMediaRecord.sessionStartTime}-${selectedMediaRecord.sessionEndTime}`
                          : `${baseDate} 09:00-${baseDate} 10:30`;
                      } else if (s === 2) {
                        sessionTimeRange = `${baseDate} 14:00-${baseDate} 15:30`;
                      } else if (s === 3) {
                        sessionTimeRange = `${baseDate} 16:30-${baseDate} 17:45`;
                      } else {
                        sessionTimeRange = `${baseDate} 19:00-${baseDate} 20:30`;
                      }

                      const isActive = mediaActiveSession === s;
                      return (
                        <button
                          key={s}
                          onClick={() => {
                            setMediaActiveSession(s);
                            setIsAudioPlaying(false);
                          }}
                          className={`px-3 py-1 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                            isActive
                              ? 'bg-blue-600 text-white shadow-xs'
                              : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700'
                          }`}
                        >
                          <span>第{s}场次</span>
                          <span className={`font-mono text-[10px] ${isActive ? 'text-blue-100' : 'text-slate-400'}`}>
                            ({sessionTimeRange})
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* 场次核验指标概览 */}
                <div className="flex items-center gap-3 text-xs">
                  <span className="text-slate-500 dark:text-slate-400">
                    综合视频录音匹配率：<strong className="text-emerald-600 dark:text-emerald-400 font-bold font-mono">{selectedMediaRecord.videoMatchRate}%</strong>
                  </span>
                  <span className="text-slate-300 dark:text-slate-700">|</span>
                  <span className="text-slate-500 dark:text-slate-400">
                    综合照片人数匹配率：<strong className="text-blue-600 dark:text-blue-400 font-bold font-mono">{selectedMediaRecord.photoMatchRate}%</strong>
                  </span>
                </div>
              </div>
            )}

            {/* 3. 模态内容主体区: 现场实训视频与参训人员照片横向并排，下方录音回听，一屏完整尽览 */}
            <div className="p-4 sm:p-5 overflow-y-auto flex-1 space-y-3.5 text-xs bg-slate-50/50 dark:bg-slate-900/30">
              
              {/* 上半部分: 现场实训视频 与 参训人员照片 横向左右排布 (grid-cols-1 lg:grid-cols-2) */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-3.5 items-stretch">

                {/* ---------- 左侧: 现场实训视频 ---------- */}
                <div className="p-4 rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 shadow-xs flex flex-col justify-between space-y-2.5">
                  {/* 标题栏: 去掉“板块1:”，只保留业务标题 */}
                  <div className="flex items-center justify-between gap-2 border-b border-slate-100 dark:border-slate-700/60 pb-2.5">
                    <div className="flex items-center gap-2">
                      <div className="p-1.5 rounded-lg bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400">
                        <FileVideo size={16} />
                      </div>
                      <h4 className="font-bold text-slate-900 dark:text-white text-sm">
                        现场实训视频
                      </h4>
                    </div>
                    
                    {/* 规范指标展示 */}
                    <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-blue-50 dark:bg-blue-950/70 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800/80 shadow-2xs shrink-0">
                      工牌录音匹配率：{selectedMediaRecord.videoMatchRate}%
                    </span>
                  </div>

                  {/* 视频播放器交互区域: 高度 h-[185px]，与右侧保持一致 */}
                  <div 
                    onClick={() => setIsVideoPlaying(!isVideoPlaying)}
                    className="h-[185px] w-full bg-slate-950 rounded-xl flex flex-col items-center justify-center text-white relative overflow-hidden group cursor-pointer border border-slate-800 shadow-inner"
                  >
                    {isVideoPlaying ? (
                      <div className="w-full h-full relative flex items-center justify-center bg-gradient-to-tr from-slate-950 via-slate-900 to-blue-950/70">
                        <div className="absolute inset-0 bg-radial from-blue-500/10 via-transparent to-black/60 pointer-events-none"></div>
                        <div className="text-center z-10 px-3 space-y-1.5">
                          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-[11px] font-mono font-bold animate-pulse">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                            LIVE 监控流回放中 · 1080P
                          </div>
                          <p className="text-xs font-bold text-slate-100 truncate max-w-[280px]">
                            {selectedMediaRecord.storeName}
                          </p>
                          <p className="text-[10px] text-slate-400 font-mono">
                            正在播放现场音画 (点击画面暂停)
                          </p>
                        </div>
                        <div className="absolute opacity-0 group-hover:opacity-100 transition-opacity w-10 h-10 rounded-full bg-slate-900/80 backdrop-blur-md flex items-center justify-center shadow-xl border border-white/20">
                          <Pause size={16} className="text-white" />
                        </div>
                      </div>
                    ) : (
                      <>
                        <div className="w-11 h-11 rounded-full bg-blue-600/90 group-hover:bg-blue-600 flex items-center justify-center shadow-lg transition-all group-hover:scale-105">
                          <Play size={18} className="ml-0.5 text-white" />
                        </div>
                        <span className="text-[11px] font-semibold text-slate-300 mt-2 group-hover:text-white transition-colors">
                          点击播放第{mediaActiveSession}场现场全景视频
                        </span>
                      </>
                    )}

                    {/* 视频底部精简控制器 */}
                    <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent px-3 py-1.5 flex items-center justify-between text-[11px] text-slate-300 font-mono">
                      <div className="flex items-center gap-1.5">
                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            setIsVideoPlaying(!isVideoPlaying);
                          }}
                          className="p-0.5 rounded hover:bg-white/20 transition-colors"
                          title={isVideoPlaying ? '暂停' : '播放'}
                        >
                          {isVideoPlaying ? <Pause size={12} /> : <Play size={12} />}
                        </button>
                        <span>{isVideoPlaying ? '00:15:30' : '00:00:00'} / 01:45:20</span>
                      </div>
                      <div className="flex-1 mx-3 h-1 bg-white/20 rounded-full overflow-hidden">
                        <div className={`h-full bg-blue-500 rounded-full transition-all duration-300 ${isVideoPlaying ? 'w-[32%]' : 'w-[0%]'}`}></div>
                      </div>
                      <span className="bg-white/20 px-1.5 py-0.2 rounded text-[10px]">1080P</span>
                    </div>
                  </div>

                  {/* 视频文件信息与下载栏 */}
                  <div className="flex items-center justify-between pt-0.5 text-[11px]">
                    <div className="truncate max-w-[240px]">
                      <span className="font-mono text-slate-700 dark:text-slate-300 truncate font-semibold block">
                        {selectedMediaRecord.storeCode}_S0{mediaActiveSession}_全景实训.mp4
                      </span>
                      <span className="text-[10px] text-slate-400 font-mono">
                        185.4 MB
                      </span>
                    </div>
                    <button
                      onClick={() => showToast('实训视频下载已启动...')}
                      className="inline-flex items-center gap-1 px-2.5 py-1 bg-blue-50 hover:bg-blue-100 dark:bg-blue-950/60 dark:hover:bg-blue-900 text-blue-700 dark:text-blue-300 rounded-lg font-bold transition-colors cursor-pointer border border-blue-200 dark:border-blue-900 shrink-0"
                    >
                      <Download size={11} />
                      <span>下载视频</span>
                    </button>
                  </div>
                </div>

                {/* ---------- 右侧: 参训人员照片 (实拍照 + 参训人员名单，与左侧严格对称并上下对齐) ---------- */}
                <div className="p-4 rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 shadow-xs flex flex-col justify-between space-y-2.5">
                  {/* 标题栏 */}
                  <div className="flex items-center justify-between gap-2 border-b border-slate-100 dark:border-slate-700/60 pb-2.5">
                    <div className="flex items-center gap-2">
                      <div className="p-1.5 rounded-lg bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400">
                        <ImageIcon size={16} />
                      </div>
                      <h4 className="font-bold text-slate-900 dark:text-white text-sm">
                        参训人员照片
                      </h4>
                    </div>
                    
                    {/* 规范指标展示 */}
                    <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-50 dark:bg-emerald-950/70 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800/80 shadow-2xs shrink-0">
                      人数匹配率：{selectedMediaRecord.photoMatchRate}%
                    </span>
                  </div>

                  {/* 参训照片与参训名单左右排布，高度与左边视频严格对齐为 h-[185px] */}
                  <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 h-[185px]">
                    
                    {/* 实拍照缩略图 (占 5 列): 点击放大灯箱，填满容器 */}
                    <div 
                      onClick={() => setIsPhotoZoomed(true)}
                      className="sm:col-span-5 h-full w-full bg-gradient-to-br from-amber-500/15 via-orange-500/10 to-slate-900 rounded-xl flex flex-col items-center justify-center p-3 relative overflow-hidden border border-amber-200/50 dark:border-amber-900/40 cursor-pointer group shadow-inner"
                      title="点击放大查看实拍照"
                    >
                      <ImageIcon size={30} className="text-amber-500/70 mb-1.5 group-hover:scale-110 transition-transform" />
                      <span className="text-[11px] text-slate-600 dark:text-slate-300 font-medium text-center">
                        现场实拍照 (第{mediaActiveSession}场)
                      </span>
                      <div className="mt-2 inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-black/60 text-white text-[10px] font-medium backdrop-blur-sm group-hover:bg-blue-600 transition-colors">
                        <ZoomIn size={10} />
                        <span>点击放大查看</span>
                      </div>
                    </div>

                    {/* 参训人员名单 (占 7 列): 紧凑展示 8 位参训员工，填满容器 */}
                    <div className="sm:col-span-7 h-full p-2.5 bg-slate-50 dark:bg-slate-900/50 rounded-xl border border-slate-200 dark:border-slate-700/80 flex flex-col justify-between">
                      <div className="flex items-center justify-between text-[11px] font-semibold text-slate-700 dark:text-slate-300 pb-1 border-b border-slate-200/60 dark:border-slate-800 shrink-0">
                        <span>参训名单 ({selectedMediaRecord.attendees || 8}人)</span>
                      </div>

                      {/* 8人紧凑 4列x2行 网格 */}
                      <div className="grid grid-cols-4 gap-1.5 pt-1.5 flex-1">
                        {[
                          { name: '张经理', avatar: '张', bg: 'bg-blue-500' },
                          { name: '李四', avatar: '李', bg: 'bg-emerald-500' },
                          { name: '王五', avatar: '王', bg: 'bg-indigo-500' },
                          { name: '赵六', avatar: '赵', bg: 'bg-amber-500' },
                          { name: '周七', avatar: '周', bg: 'bg-purple-500' },
                          { name: '钱八', avatar: '钱', bg: 'bg-rose-500' },
                          { name: '孙九', avatar: '孙', bg: 'bg-teal-500' },
                          { name: '吴十', avatar: '吴', bg: 'bg-cyan-500' },
                        ].map((person, idx) => (
                          <div
                            key={idx}
                            className="bg-white dark:bg-slate-800 p-1.5 rounded-lg border border-slate-200 dark:border-slate-700 flex flex-col items-center justify-center text-center shadow-2xs"
                          >
                            <div className={`w-6 h-6 rounded-full ${person.bg} text-white font-bold text-[10px] flex items-center justify-center mb-0.5 shadow-2xs`}>
                              {person.avatar}
                            </div>
                            <span className="text-[10px] font-semibold text-slate-800 dark:text-slate-200 truncate w-full">
                              {person.name}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                  </div>

                  {/* 照片文件信息与下载栏: 与左侧下载视频在水平线上完全上下对齐 */}
                  <div className="flex items-center justify-between pt-0.5 text-[11px]">
                    <div className="truncate max-w-[240px]">
                      <span className="font-mono text-slate-700 dark:text-slate-300 truncate font-semibold block">
                        {selectedMediaRecord.storeCode}_S0{mediaActiveSession}_现场实拍照.jpg
                      </span>
                      <span className="text-[10px] text-slate-400 font-mono">
                        4.2 MB
                      </span>
                    </div>
                    <button
                      onClick={() => showToast('现场照片下载已启动...')}
                      className="inline-flex items-center gap-1 px-2.5 py-1 bg-amber-50 hover:bg-amber-100 dark:bg-amber-950/60 dark:hover:bg-amber-900 text-amber-700 dark:text-amber-300 rounded-lg font-bold transition-colors cursor-pointer border border-amber-200 dark:border-amber-900 shrink-0"
                    >
                      <Download size={11} />
                      <span>下载原图</span>
                    </button>
                  </div>
                </div>

              </div>

              {/* ---------- 下方: 录音回听 (去掉“板块3:”，只保留业务标题与操作按钮) ---------- */}
              <div className="p-3.5 sm:p-4 rounded-2xl border border-blue-200 dark:border-blue-900/50 bg-gradient-to-r from-blue-50/70 via-indigo-50/40 to-purple-50/30 dark:from-blue-950/30 dark:via-indigo-950/20 dark:to-slate-800 shadow-xs flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-xl bg-blue-600 text-white shadow-xs shrink-0">
                    <Headphones size={18} />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 dark:text-white text-sm">
                      录音回听
                    </h4>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                      点击查看完整会话录音回听
                    </p>
                  </div>
                </div>

                {/* 核心按钮: 点击打开全景质检弹窗 */}
                <button
                  onClick={() => {
                    setShowAudioDetailModal(true);
                    setIsAudioPlaying(false);
                  }}
                  className="px-5 py-2 bg-blue-600 hover:bg-blue-700 active:scale-98 text-white rounded-xl font-bold shadow-sm hover:shadow transition-all flex items-center gap-2 cursor-pointer text-xs shrink-0"
                >
                  <Play size={13} className="fill-white" />
                  <span>录音回听</span>
                </button>
              </div>

            </div>

            {/* 4. 弹窗底部操作栏 */}
            <div className="px-6 py-3.5 bg-slate-50 dark:bg-slate-900/60 border-t border-slate-200 dark:border-slate-700 flex items-center justify-end text-xs shrink-0">
              <button
                onClick={() => {
                  setSelectedMediaRecord(null);
                  setIsVideoPlaying(false);
                  setIsAudioPlaying(false);
                }}
                className="px-5 py-2 bg-slate-800 hover:bg-slate-900 dark:bg-slate-700 dark:hover:bg-slate-600 text-white rounded-xl font-bold transition-colors cursor-pointer"
              >
                关闭
              </button>
            </div>

          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 附加弹窗 A: 参训人员照片大图放大灯箱 (Lightbox) - 必须使用 z-[110] 确保最顶层 */}
      {/* ========================================================================= */}
      {isPhotoZoomed && selectedMediaRecord && (
        <div 
          onClick={() => setIsPhotoZoomed(false)}
          className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-in fade-in duration-200"
        >
          <div 
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-5xl w-full bg-slate-900 rounded-3xl overflow-hidden shadow-2xl border border-slate-800 flex flex-col"
          >
            {/* 顶部标题栏 */}
            <div className="flex items-center justify-between px-6 py-3.5 bg-slate-950/90 border-b border-slate-800 text-white">
              <div className="flex items-center gap-2">
                <ImageIcon size={18} className="text-amber-400" />
                <span className="font-bold text-sm">
                  {selectedMediaRecord.storeName} · 第{mediaActiveSession}场参训人员现场合影 (高清原图)
                </span>
              </div>
              <button
                onClick={() => setIsPhotoZoomed(false)}
                className="p-1 rounded-lg hover:bg-white/10 text-slate-400 hover:text-white transition-colors cursor-pointer"
              >
                <X size={20} />
              </button>
            </div>

            {/* 照片大图展示 */}
            <div className="p-6 flex flex-col items-center justify-center bg-slate-950 min-h-[420px] relative">
              <div className="w-full max-h-[65vh] rounded-2xl bg-gradient-to-br from-amber-600/30 via-orange-950/40 to-slate-900 border border-amber-500/30 flex flex-col items-center justify-center p-12 text-center shadow-2xl">
                <ImageIcon size={80} className="text-amber-400/80 mb-4" />
                <h4 className="text-xl font-bold text-white tracking-wide">
                  {selectedMediaRecord.storeName}
                </h4>
                <p className="text-sm text-slate-300 mt-2">
                  实训主题: {appliedFilters.theme} · 场次: 第{mediaActiveSession}场 · 日期: {selectedMediaRecord.date}
                </p>
                <p className="text-xs text-amber-300/80 mt-1 font-mono">
                  实到参训人员: 8人 · 人数匹配率: {selectedMediaRecord.photoMatchRate}%
                </p>
              </div>
            </div>

            {/* 底部操作 */}
            <div className="flex items-center justify-between px-6 py-3 bg-slate-950 border-t border-slate-800 text-xs text-slate-400">
              <span>分辨率: 3840 × 2160 · 4K UHD</span>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => showToast('高清原图下载中...')}
                  className="px-4 py-1.5 bg-amber-600 hover:bg-amber-700 text-white font-bold rounded-xl transition-colors cursor-pointer flex items-center gap-1.5"
                >
                  <Download size={13} />
                  <span>下载高清大图</span>
                </button>
                <button
                  onClick={() => setIsPhotoZoomed(false)}
                  className="px-4 py-1.5 bg-slate-800 hover:bg-slate-700 text-white rounded-xl transition-colors cursor-pointer"
                >
                  关闭
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 附加弹窗 B: 用户上传的图片 1:1 经典会话质检与录音回听全景弹窗 */}
      {/* 必须使用 z-[100] 和纯色遮罩，彻底杜绝底层表格 sticky 穿透和被前弹窗遮挡 */}
      {/* ========================================================================= */}
      {showAudioDetailModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-5 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200 overflow-y-auto">
          <div className="bg-white dark:bg-slate-900 rounded-2xl max-w-6xl w-full max-h-[95vh] overflow-hidden shadow-2xl border border-slate-200 dark:border-slate-800 flex flex-col font-sans relative z-[101]">
            
            {/* 1. Header: 【有效质检】 接待编号: QC20260319B4E392M9L1 [复制]  [X] */}
            <div className="flex items-center justify-between px-6 py-3.5 border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shrink-0">
              <div className="flex items-center gap-3">
                <span className="font-extrabold text-slate-900 dark:text-white text-base tracking-tight">
                  【有效质检】
                </span>
                <div className="flex items-center gap-1.5 px-3 py-1 bg-blue-50 dark:bg-blue-950/60 rounded-lg text-blue-600 dark:text-blue-400 font-mono text-xs font-semibold border border-blue-100 dark:border-blue-900/50">
                  <span>接待编号: QC20260319B4E392M9L1</span>
                  <button
                    onClick={() => {
                      navigator.clipboard?.writeText('QC20260319B4E392M9L1');
                      setCopiedId(true);
                      setTimeout(() => setCopiedId(false), 2000);
                      showToast('接待编号已复制到剪贴板');
                    }}
                    className="hover:text-blue-800 dark:hover:text-blue-300 transition-colors cursor-pointer ml-0.5"
                    title="复制接待编号"
                  >
                    {copiedId ? <Check size={13} className="text-emerald-500" /> : <Copy size={13} />}
                  </button>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    setShowAudioDetailModal(false);
                    setIsAudioPlaying(false);
                  }}
                  className="px-3 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 text-xs font-semibold transition-colors cursor-pointer flex items-center gap-1"
                >
                  <span>返回多模态档案</span>
                </button>
                <button
                  onClick={() => {
                    setShowAudioDetailModal(false);
                    setIsAudioPlaying(false);
                  }}
                  className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-slate-600 dark:hover:text-white transition-colors cursor-pointer"
                  title="关闭"
                >
                  <X size={18} />
                </button>
              </div>
            </div>

            {/* 弹窗内容主滚动区 */}
            <div className="p-4 sm:p-5 overflow-y-auto flex-1 space-y-4 text-xs bg-slate-50/50 dark:bg-slate-900/50">
              
              {/* 2. 顶部主卡片: 场景录音文件信息与播放控制器 (1:1 还原) */}
              <div className="p-4.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-850 shadow-xs space-y-3.5">
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                      <span className="px-2 py-0.5 bg-blue-600 text-white font-bold text-xs rounded-md shadow-2xs">
                        场景录音文件: 第1段
                      </span>
                      <h4 className="font-bold text-slate-900 dark:text-white text-sm tracking-tight font-mono">
                        20260726171700_SJ17410012_20260726172600
                      </h4>
                    </div>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                      员工: 李四 &nbsp;|&nbsp; 门店: {selectedMediaRecord?.storeName || '凯迪拉克上海徐汇旗舰店'}
                    </p>
                  </div>

                  {/* 右侧三大统计指标 */}
                  <div className="flex items-center gap-6 text-xs shrink-0">
                    <div>
                      <span className="font-bold text-sm text-slate-900 dark:text-white block font-sans">28分10秒</span>
                      <span className="text-slate-500 dark:text-slate-400 flex items-center gap-1.5 text-[11px] mt-0.5">
                        <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block"></span> 语音时长
                      </span>
                    </div>
                    <div>
                      <span className="font-bold text-sm text-slate-900 dark:text-white block font-mono">2026-08-22 11:02:15</span>
                      <span className="text-slate-500 dark:text-slate-400 flex items-center gap-1.5 text-[11px] mt-0.5">
                        <span className="w-2 h-2 rounded-full bg-blue-500 inline-block"></span> 开始时间
                      </span>
                    </div>
                    <div>
                      <span className="font-bold text-sm text-slate-900 dark:text-white block font-mono">2026-08-22 11:38:00</span>
                      <span className="text-slate-500 dark:text-slate-400 flex items-center gap-1.5 text-[11px] mt-0.5">
                        <span className="w-2 h-2 rounded-full bg-rose-500 inline-block"></span> 结束时间
                      </span>
                    </div>
                  </div>
                </div>

                {/* 播放器交互条: 绿色细圆圈按钮、1X、时间、进度条带说明节点、总时间 */}
                <div className="flex items-center gap-3 pt-2">
                  <button
                    onClick={() => setIsAudioPlaying(!isAudioPlaying)}
                    className="w-8 h-8 rounded-full border-2 border-emerald-500 hover:bg-emerald-50 dark:hover:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 flex items-center justify-center transition-all shrink-0 cursor-pointer shadow-xs"
                    title={isAudioPlaying ? '暂停' : '播放'}
                  >
                    {isAudioPlaying ? <Pause size={14} className="fill-emerald-600" /> : <Play size={14} className="ml-0.5 fill-emerald-600" />}
                  </button>

                  <button
                    onClick={() => {
                      const spds = ['1X', '1.25X', '1.5X', '2X'];
                      const next = spds[(spds.indexOf(playbackSpeed) + 1) % spds.length];
                      setPlaybackSpeed(next);
                    }}
                    className="px-2 py-0.5 text-xs font-bold text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded cursor-pointer border border-slate-200 dark:border-slate-700"
                  >
                    {playbackSpeed}
                  </button>

                  <span className="text-xs text-slate-400 font-mono shrink-0">
                    2026-03-19 11:02:15 00:01
                  </span>

                  {/* 录音进度条 */}
                  <div className="flex-1 relative h-2 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center px-1">
                    <div className="w-[18%] h-full bg-blue-500 rounded-full transition-all"></div>
                    <span className="absolute right-1/3 -top-5 text-[10px] text-slate-400 font-medium">
                      说明
                    </span>
                  </div>

                  <span className="text-xs text-slate-400 font-mono shrink-0">
                    00:06:19
                  </span>
                </div>
              </div>

              {/* 3. 三栏布局: 评测结果 / 通话记录 / 标签与分析 */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-start">
                
                {/* ---------- 左栏: 评测结果 (占 3 列) ---------- */}
                <div className="lg:col-span-3 p-4 bg-white dark:bg-slate-850 rounded-xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-3">
                  <h4 className="font-bold text-blue-600 text-sm pb-1.5 border-b border-slate-100 dark:border-slate-800">
                    评测结果
                  </h4>

                  <div className="flex items-center justify-between text-xs font-bold text-slate-700 dark:text-slate-300 pt-0.5">
                    <span>别克GL8 ES陆尊(14分)</span>
                    <div className="flex items-center gap-3">
                      <span>命中情况</span>
                      <span>分数</span>
                    </div>
                  </div>

                  {/* 评测条目列表 */}
                  <div className="space-y-1.5 text-xs divide-y divide-slate-100 dark:divide-slate-800">
                    {[
                      { title: '展厅接待(2/4)', hit: '50%', score: '2分' },
                      { title: '需求分析(5/6)', hit: '83.33%', score: '5分' },
                      { title: '邀约入车体验(1/1)', hit: '100%', score: '1分' },
                      { title: '主动开口留资(1/1)', hit: '100%', score: '1分' },
                      { title: '邀约试驾(1/1)', hit: '100%', score: '1分' },
                      { title: '购车款项(1/1)', hit: '100%', score: '1分' },
                      { title: '产品介绍(3/5)', hit: '60%', score: '3分' },
                    ].map((item, idx) => (
                      <div 
                        key={idx}
                        className="flex items-center justify-between pt-2 pb-1 hover:bg-slate-50 dark:hover:bg-slate-800/60 px-1 rounded transition-colors"
                      >
                        <div className="flex items-center gap-1 text-slate-700 dark:text-slate-300">
                          <span className="text-slate-400 text-[10px]">›</span>
                          <span>{item.title}</span>
                        </div>
                        <div className="flex items-center gap-4 font-mono">
                          <span className="text-slate-600 dark:text-slate-400 w-12 text-right">{item.hit}</span>
                          <span className="font-bold text-slate-900 dark:text-white w-6 text-right">{item.score}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* ---------- 中栏: 通话记录 (占 5 列) ---------- */}
                <div className="lg:col-span-5 p-4 bg-white dark:bg-slate-850 rounded-xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-3">
                  {/* 通话记录操作栏 */}
                  <div className="flex flex-wrap items-center justify-between gap-2 pb-2.5 border-b border-slate-100 dark:border-slate-800">
                    <div className="flex items-center gap-3">
                      <h4 className="font-bold text-slate-900 dark:text-white text-sm">
                        通话记录
                      </h4>
                      <label className="flex items-center gap-1 text-xs text-slate-500 dark:text-slate-400 cursor-pointer select-none">
                        <input type="checkbox" className="rounded text-blue-600" />
                        <span>切换角色</span>
                      </label>
                    </div>

                    <div className="flex items-center gap-2">
                      <div className="px-2 py-0.5 rounded border border-slate-200 dark:border-slate-700 text-[11px] text-slate-400 flex items-center gap-1 bg-slate-50 dark:bg-slate-800">
                        <span>在对话中...</span>
                        <span className="font-mono text-slate-600 dark:text-slate-300">0</span>
                      </div>
                      <button 
                        onClick={() => showToast('正在导出对话文本记录...')}
                        className="text-blue-600 dark:text-blue-400 hover:underline text-xs cursor-pointer font-medium"
                      >
                        文本下载
                      </button>
                      <button 
                        onClick={() => showToast('打开词库配置面板')}
                        className="text-blue-600 dark:text-blue-400 hover:underline text-xs cursor-pointer font-medium"
                      >
                        添加词库
                      </button>
                    </div>
                  </div>

                  {/* 对话消息流 */}
                  <div className="space-y-4 max-h-[380px] overflow-y-auto pr-1">
                    
                    {/* 消息 1: 客 */}
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 text-[11px] text-slate-400">
                        <button className="text-blue-600 dark:text-blue-400 hover:underline cursor-pointer">播放</button>
                        <span>切换 → 编辑 ✏️</span>
                        <span>客户 2026-07-26 17:19:42</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <div className="w-6 h-6 rounded-full bg-rose-100 dark:bg-rose-950/80 text-rose-600 dark:text-rose-400 font-bold text-xs flex items-center justify-center shrink-0 border border-rose-200 dark:border-rose-900">
                          客
                        </div>
                        <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 text-xs text-slate-800 dark:text-slate-200 max-w-[85%]">
                          啊，对。
                        </div>
                      </div>
                    </div>

                    {/* 消息 2: 销 */}
                    <div className="space-y-1 flex flex-col items-end">
                      <div className="flex items-center gap-2 text-[11px] text-slate-400">
                        <span>2026-07-26 17:19:43 员工 ✏️编辑 🔄切换</span>
                        <button className="text-blue-600 dark:text-blue-400 hover:underline cursor-pointer">播放</button>
                      </div>
                      <div className="flex items-start justify-end gap-2 w-full">
                        <div className="p-3 bg-emerald-600 text-white rounded-2xl text-xs max-w-[85%] shadow-xs">
                          行，先给一下我的名片，我是店里的销售顾问李四。
                        </div>
                        <div className="w-6 h-6 rounded-full bg-emerald-100 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-300 font-bold text-xs flex items-center justify-center shrink-0 border border-emerald-200 dark:border-emerald-900">
                          销
                        </div>
                      </div>
                    </div>

                    {/* 消息 3: 销 */}
                    <div className="space-y-1 flex flex-col items-end">
                      <div className="flex items-center gap-2 text-[11px] text-slate-400">
                        <span>2026-07-26 17:19:47 员工 ✏️编辑 🔄切换</span>
                        <button className="text-blue-600 dark:text-blue-400 hover:underline cursor-pointer">播放</button>
                      </div>
                      <div className="flex items-start justify-end gap-2 w-full">
                        <div className="p-3 bg-emerald-600 text-white rounded-2xl text-xs max-w-[85%] shadow-xs">
                          李女士您怎么称呼？
                        </div>
                        <div className="w-6 h-6 rounded-full bg-emerald-100 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-300 font-bold text-xs flex items-center justify-center shrink-0 border border-emerald-200 dark:border-emerald-900">
                          销
                        </div>
                      </div>
                    </div>

                    {/* 消息 4: 客 */}
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 text-[11px] text-slate-400">
                        <button className="text-blue-600 dark:text-blue-400 hover:underline cursor-pointer">播放</button>
                        <span>切换 → 编辑 ✏️</span>
                        <span>客户 2026-07-26 17:19:48</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <div className="w-6 h-6 rounded-full bg-rose-100 dark:bg-rose-950/80 text-rose-600 dark:text-rose-400 font-bold text-xs flex items-center justify-center shrink-0 border border-rose-200 dark:border-rose-900">
                          客
                        </div>
                        <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 text-xs text-slate-800 dark:text-slate-200 max-w-[85%]">
                          姓李。
                        </div>
                      </div>
                    </div>

                  </div>
                </div>

                {/* ---------- 右栏: 会话详情 / 标签 / 会话总结 / 销售分析 (占 4 列) ---------- */}
                <div className="lg:col-span-4 p-4 bg-white dark:bg-slate-850 rounded-xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-3">
                  {/* 右栏 4 个 Tab */}
                  <div className="flex items-center gap-4 border-b border-slate-200 dark:border-slate-800 text-xs font-semibold pb-2">
                    <button 
                      onClick={() => setDetailActiveTab('details')}
                      className={`cursor-pointer transition-colors ${detailActiveTab === 'details' ? 'text-blue-600 font-bold' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'}`}
                    >
                      会话详情
                    </button>
                    <button 
                      onClick={() => setDetailActiveTab('tags')}
                      className={`cursor-pointer pb-2 -mb-2 border-b-2 transition-colors ${detailActiveTab === 'tags' ? 'text-blue-600 border-blue-600 font-bold' : 'border-transparent text-slate-600 dark:text-slate-400 hover:text-slate-900'}`}
                    >
                      标签
                    </button>
                    <button 
                      onClick={() => setDetailActiveTab('summary')}
                      className={`cursor-pointer transition-colors ${detailActiveTab === 'summary' ? 'text-blue-600 font-bold' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'}`}
                    >
                      会话总结
                    </button>
                    <button 
                      onClick={() => setDetailActiveTab('analysis')}
                      className={`cursor-pointer transition-colors ${detailActiveTab === 'analysis' ? 'text-blue-600 font-bold' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'}`}
                    >
                      销售分析
                    </button>
                  </div>

                  {/* 标签操作与清单 */}
                  <div className="flex items-center justify-between text-xs pt-1">
                    <button 
                      onClick={() => showToast('标签清单导出下载中...')}
                      className="text-blue-600 dark:text-blue-400 hover:underline cursor-pointer font-medium"
                    >
                      下载标签清单
                    </button>
                    <button 
                      onClick={() => showToast('打开标签显示配置对话框')}
                      className="text-blue-600 dark:text-blue-400 hover:underline cursor-pointer flex items-center gap-0.5 font-medium"
                    >
                      <span>▼ 标签显示配置</span>
                    </button>
                  </div>

                  <div>
                    <h5 className="font-bold text-slate-800 dark:text-slate-200 text-xs mb-3">
                      客户意向判定与客户标签 / 新客户意向判定和客户标签
                    </h5>

                    {/* 彩色标签胶囊卡片列表 (1:1 还原用户上传的截图) */}
                    <div className="space-y-2.5">
                      {/* 1. 蓝色 */}
                      <div className="p-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-medium text-xs shadow-xs transition-colors cursor-pointer">
                        客户基础信息 - 身份(个人)
                      </div>

                      {/* 2. 蓝绿/青碧色 */}
                      <div className="p-3 bg-teal-600 hover:bg-teal-700 text-white rounded-xl font-medium text-xs shadow-xs transition-colors cursor-pointer">
                        客户基础信息 - 购车阶段(了解阶段)
                      </div>

                      {/* 3. 玫瑰红/洋红 */}
                      <div className="p-3 bg-rose-600 hover:bg-rose-700 text-white rounded-xl font-medium text-xs shadow-xs transition-colors cursor-pointer">
                        客户基础信息 - 客户类型(未提及)
                      </div>

                      {/* 4. 亮橙色 */}
                      <div className="p-3 bg-amber-600 hover:bg-amber-700 text-white rounded-xl font-medium text-xs shadow-xs transition-colors cursor-pointer">
                        意向相关信息 - 意向车型(凯迪拉克XT5/CT5豪华版)
                      </div>

                      {/* 5. 姜黄/深黄褐色 */}
                      <div className="p-3 bg-yellow-600 hover:bg-yellow-700 text-white rounded-xl font-medium text-xs shadow-xs transition-colors cursor-pointer">
                        意向相关信息 - 意向配置(未提及)
                      </div>
                    </div>
                  </div>

                </div>

              </div>

            </div>

            {/* 4. 底部 Bar: 数据来源标注与关闭按钮 */}
            <div className="px-6 py-3.5 bg-slate-50 dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs shrink-0">
              <span className="text-slate-400">
                数据来源: 凯迪拉克总部会话智能质检云端系统 · 数据已脱敏加密
              </span>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => {
                    setShowAudioDetailModal(false);
                    setIsAudioPlaying(false);
                  }}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-xl font-bold transition-colors cursor-pointer"
                >
                  返回多模态档案
                </button>
                <button
                  onClick={() => {
                    setShowAudioDetailModal(false);
                    setIsAudioPlaying(false);
                  }}
                  className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold transition-colors cursor-pointer shadow-sm shadow-blue-500/20"
                >
                  关闭
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* 弹窗 6 占位已合并 */}
    </div>
  );
};

export default TrainingInspectionBoard;
