
import React, { useState, useEffect } from 'react';
import { 
  Target, 
  ChevronRight, 
  Plus, 
  Trash2, 
  Save, 
  Building2, 
  Map, 
  Home,
  Info,
  CheckCircle2,
  AlertCircle,
  StopCircle,
  ChevronLeft
} from 'lucide-react';

interface MetricGoal {
  id: string;
  name: string;
  target: string;
  unit: string;
}

interface TaskSetting {
  id: string;
  type: 'hq-to-region' | 'hq-to-district' | 'hq-to-store' | 'region-to-district' | 'region-to-store' | 'district-to-store';
  from: string;
  to: string;
  period: 'weekly' | 'monthly' | 'quarterly' | 'yearly';
  startDate: string;
  endDate: string;
  metrics: MetricGoal[];
  status: 'draft' | 'published';
  createdAt: string;
  updatedAt: string;
  updatedBy: string;
  isContinuous?: boolean;
}

const mockStores = [
  '上海徐汇店',
  '上海静安店',
  '上海黄浦店',
  '上海浦东店',
  '上海闵行店'
];

const mockRegions = [
  '华东大区',
  '华南大区',
  '华北大区',
  '西南大区',
  '西北大区'
];

const mockDistricts = [
  '上海小区',
  '杭州小区',
  '南京小区',
  '苏州小区',
  '无锡小区'
];

const TargetTaskSettings: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'current' | 'history'>('current');
  const [activeSender, setActiveSender] = useState<'总部' | '大区' | '小区'>('小区');
  const [settings, setSettings] = useState<TaskSetting[]>([
    {
      id: 'hq-multi-region-1',
      type: 'hq-to-region',
      from: '总部',
      to: '华东大区、华南大区、华北大区、西南大区',
      period: 'monthly',
      startDate: '2026-06-01',
      endDate: '2026-06-30',
      status: 'published',
      createdAt: '2026-04-18',
      updatedAt: '2026-04-18 11:30',
      updatedBy: '战略运营部',
      metrics: [
        { id: 'hqms1', name: '全渠道客流数', target: '200000', unit: '人' },
        { id: 'hqms2', name: '平均成交周期', target: '15', unit: '天' },
      ]
    },
    {
      id: 'multi-store-1',
      type: 'district-to-store',
      from: '上海小区',
      to: '上海徐汇店、上海静安店、上海黄浦店、上海浦东店',
      period: 'monthly',
      startDate: '2026-05-01',
      endDate: '2026-05-31',
      status: 'published',
      createdAt: '2026-04-15',
      updatedAt: '2026-04-15 10:00',
      updatedBy: '李经理',
      metrics: [
        { id: 'ms1', name: '客流数', target: '6000', unit: '人' },
        { id: 'ms2', name: '有效试驾率', target: '45', unit: '%' },
      ]
    },
    {
      id: 'hq-future-1',
      type: 'hq-to-region',
      from: '总部',
      to: '华南大区、华北大区',
      period: 'monthly',
      startDate: '2026-05-01',
      endDate: '2026-05-31',
      status: 'published',
      createdAt: '2026-04-12',
      updatedAt: '2026-04-12 14:00',
      updatedBy: '系统管理员',
      metrics: [
        { id: 'hqfm1', name: '有效试驾推进率', target: '45', unit: '%' },
        { id: 'hqfm2', name: '平均有效录音时长', target: '18', unit: '分' },
      ]
    },
    {
      id: 'hq-1',
      type: 'hq-to-region',
      from: '总部',
      to: '全部大区',
      period: 'monthly',
      startDate: '2026-04-01',
      endDate: '2026-04-30',
      status: 'published',
      createdAt: '2026-03-25',
      updatedAt: '2026-03-25 09:00',
      updatedBy: '系统管理员',
      metrics: [
        { id: 'hqm1', name: '客流数', target: '50000', unit: '人' },
        { id: 'hqm2', name: '有效试驾数', target: '20000', unit: '人' },
      ]
    },
    {
      id: 'hq-2',
      type: 'hq-to-district',
      from: '总部',
      to: '上海小区、杭州小区',
      period: 'weekly',
      startDate: '2026-04-13',
      endDate: '2026-04-19',
      status: 'published',
      createdAt: '2026-04-10',
      updatedAt: '2026-04-10 16:20',
      updatedBy: '运营总监',
      metrics: [
        { id: 'hqm3', name: '工牌使用率', target: '98', unit: '%' },
        { id: 'hqm4', name: '有效录音时长', target: '15', unit: '分' },
      ]
    },
    {
      id: 'hq-3',
      type: 'hq-to-store',
      from: '总部',
      to: '全部门店',
      period: 'yearly',
      startDate: '2026-01-01',
      endDate: '2026-12-31',
      status: 'published',
      createdAt: '2025-12-20',
      updatedAt: '2025-12-20 11:00',
      updatedBy: '战略部',
      metrics: [
        { id: 'hqm5', name: '成交谈判数', target: '100000', unit: '人' },
      ]
    },
    {
      id: 'hq-hist-1',
      type: 'hq-to-region',
      from: '总部',
      to: '华东大区',
      period: 'monthly',
      startDate: '2026-03-01',
      endDate: '2026-03-31',
      status: 'published',
      createdAt: '2026-02-20',
      updatedAt: '2026-02-20 10:00',
      updatedBy: '系统管理员',
      metrics: [
        { id: 'hqhm1', name: '客流数', target: '45000', unit: '人' },
      ]
    },
    {
      id: '1',
      type: 'district-to-store',
      from: '上海小区',
      to: '上海徐汇店',
      period: 'weekly',
      startDate: '2026-04-06',
      endDate: '2026-04-12',
      status: 'published',
      createdAt: '2026-04-01',
      updatedAt: '2026-04-01 10:00',
      updatedBy: '张经理',
      metrics: [
        { id: 'm1', name: '客流数', target: '1500', unit: '人' },
        { id: 'm2', name: '有效试驾数', target: '600', unit: '人' },
        { id: 'm3', name: '有效试驾推进率', target: '40', unit: '%' },
        { id: 'm4', name: '工牌使用率', target: '95', unit: '%' },
      ]
    },
    {
      id: 'hist-1',
      type: 'district-to-store',
      from: '上海小区',
      to: '上海徐汇店',
      period: 'weekly',
      startDate: '2026-03-30',
      endDate: '2026-04-05',
      status: 'published',
      createdAt: '2026-03-25',
      updatedAt: '2026-03-25 14:30',
      updatedBy: '李主管',
      metrics: [
        { id: 'hm1', name: '客流数', target: '1400', unit: '人' },
        { id: 'hm2', name: '有效试驾数', target: '550', unit: '人' },
      ]
    },
    {
      id: 'future-1',
      type: 'district-to-store',
      from: '上海小区',
      to: '上海徐汇店',
      period: 'weekly',
      startDate: '2026-04-20',
      endDate: '2026-04-26',
      status: 'published',
      createdAt: '2026-04-09',
      updatedAt: '2026-04-09 18:00',
      updatedBy: '王经理',
      metrics: [
        { id: 'fm1', name: '客流数', target: '1600', unit: '人' },
        { id: 'fm2', name: '工牌使用率', target: '98', unit: '%' },
      ]
    }
  ]);

  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [selectedRecipients, setSelectedRecipients] = useState<string[]>(['all']);
  const [recipientSearch, setRecipientSearch] = useState('');
  const [selectedWeek, setSelectedWeek] = useState<number>(15);
  const [newSetting, setNewSetting] = useState<Partial<TaskSetting>>({
    type: 'district-to-store',
    period: 'weekly',
    startDate: '',
    endDate: '',
    isContinuous: false,
    metrics: [
      { id: Date.now().toString(), name: '客流数', target: '', unit: '人' }
    ]
  });

  const getWeekRange = (week: number, year: number = 2026) => {
    const d = new Date(year, 0, 1);
    const dayNum = d.getDay() || 7;
    if (dayNum <= 4) d.setDate(d.getDate() - d.getDay() + 1);
    else d.setDate(d.getDate() + 8 - d.getDay());
    const start = new Date(d.getTime() + (week - 1) * 7 * 24 * 60 * 60 * 1000);
    const end = new Date(start.getTime() + 6 * 24 * 60 * 60 * 1000);
    return {
      start: start.toISOString().split('T')[0],
      end: end.toISOString().split('T')[0]
    };
  };

  const periodLabels = {
    'weekly': '周度任务',
    'monthly': '月度任务',
    'quarterly': '季度任务',
    'yearly': '年度任务'
  };

  const senderLabels = {
    '总部': '总部下发',
    '大区': '大区下发',
    '小区': '小区下发'
  };

  const senderIcons = {
    '总部': <Home size={18} />,
    '大区': <Map size={18} />,
    '小区': <Building2 size={18} />
  };

  const typeLabels = {
    'hq-to-region': '总部 → 大区',
    'hq-to-district': '总部 → 小区',
    'hq-to-store': '总部 → 门店',
    'region-to-district': '大区 → 小区',
    'region-to-store': '大区 → 门店',
    'district-to-store': '小区 → 门店'
  };

  const typeIcons = {
    'hq-to-region': <Home size={18} />,
    'hq-to-district': <Map size={18} />,
    'hq-to-store': <Building2 size={18} />,
    'region-to-district': <Map size={18} />,
    'region-to-store': <Building2 size={18} />,
    'district-to-store': <Building2 size={18} />
  };

  const availableMetrics = [
    { name: '客流数', unit: '人' },
    { name: '一次客流', unit: '人' },
    { name: '有效试驾数', unit: '人' },
    { name: '有效试驾推进率', unit: '%' },
    { name: '成交谈判数', unit: '人' },
    { name: '谈判推进率', unit: '%' },
    { name: '工牌使用率', unit: '%' },
    { name: '有效单据率', unit: '%' },
    { name: '平均有效录音时长', unit: '分' },
  ];

  const handleAddMetric = () => {
    setNewSetting({
      ...newSetting,
      metrics: [
        ...(newSetting.metrics || []),
        { id: Date.now().toString(), name: '客流数', target: '', unit: '人' }
      ]
    });
  };

  const handleRemoveMetric = (id: string) => {
    setNewSetting({
      ...newSetting,
      metrics: (newSetting.metrics || []).filter(m => m.id !== id)
    });
  };

  const getRecipientOptions = (type?: string) => {
    if (type?.endsWith('-to-store')) return { data: mockStores, label: '门店', allLabel: '全部门店' };
    if (type?.endsWith('-to-district')) return { data: mockDistricts, label: '小区', allLabel: '全部小区' };
    if (type?.endsWith('-to-region')) return { data: mockRegions, label: '大区', allLabel: '全部大区' };
    return { data: mockStores, label: '门店', allLabel: '全部门店' };
  };

  const handleSave = () => {
    const { start, end } = newSetting.period === 'weekly' ? getWeekRange(selectedWeek) : { start: newSetting.startDate, end: newSetting.endDate };
    
    if (editingId) {
      setSettings(settings.map(s => s.id === editingId ? {
        ...s,
        ...newSetting,
        startDate: start || s.startDate,
        endDate: end || s.endDate,
        updatedAt: new Date().toLocaleString(),
        updatedBy: '当前用户',
        metrics: newSetting.metrics as MetricGoal[]
      } : s));
      setEditingId(null);
    } else {
      const currentType = newSetting.type || (activeSender === '总部' ? 'hq-to-region' : activeSender === '大区' ? 'region-to-district' : 'district-to-store');
      const { allLabel } = getRecipientOptions(currentType);
      
      const recipients = selectedRecipients.includes('all') ? [allLabel] : selectedRecipients;

      const newSettingObj: TaskSetting = {
        id: Date.now().toString(),
        type: currentType as any,
        from: activeSender === '总部' ? '总部' : activeSender === '大区' ? '华东大区' : '上海小区',
        to: recipients.join('、'),
        period: newSetting.period as any || 'weekly',
        startDate: start || '2026-04-13',
        endDate: end || '2026-04-19',
        status: 'published',
        createdAt: new Date().toISOString().split('T')[0],
        updatedAt: new Date().toLocaleString(),
        updatedBy: '当前用户',
        isContinuous: newSetting.isContinuous,
        metrics: newSetting.metrics as MetricGoal[]
      };

      setSettings([newSettingObj, ...settings]);
    }
    
    setIsAdding(false);
    setNewSetting({ 
      type: activeSender === '总部' ? 'hq-to-region' : activeSender === '大区' ? 'region-to-district' : 'district-to-store', 
      period: 'weekly',
      isContinuous: false,
      metrics: [{ id: Date.now().toString(), name: '客流数', target: '', unit: '人' }] 
    });
    setSelectedRecipients(['all']);
  };

  const handleEdit = (setting: TaskSetting) => {
    setNewSetting({
      ...setting
    });
    
    // Parse recipients back into selectedRecipients
    const recipients = setting.to.split('、');
    if (recipients.length === 1 && (recipients[0] === '全部门店' || recipients[0] === '全部小区' || recipients[0] === '全部大区')) {
      setSelectedRecipients(['all']);
    } else {
      setSelectedRecipients(recipients);
    }

    if (setting.period === 'weekly') {
      // Simple week extraction logic for mock
      setSelectedWeek(15); 
    }
    setEditingId(setting.id);
    setIsAdding(true);
  };

  const [searchQuery, setSearchQuery] = useState('');
  const [filterPeriod, setFilterPeriod] = useState<string>('all');
  const [confirmEndTask, setConfirmEndTask] = useState<string | null>(null);
  const [confirmDeleteTask, setConfirmDeleteTask] = useState<string | null>(null);
  const [viewingTask, setViewingTask] = useState<TaskSetting | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  // Reset page when tab or type changes
  useEffect(() => {
    setCurrentPage(1);
    setNewSetting(prev => ({
      ...prev,
      type: activeSender === '总部' ? 'hq-to-region' : activeSender === '大区' ? 'region-to-district' : 'district-to-store'
    }));
    setSelectedRecipients(['all']);
    setRecipientSearch('');
  }, [activeTab, activeSender, searchQuery, filterPeriod]);

  // Reset recipients when task type changes within the modal
  useEffect(() => {
    if (isAdding && !editingId) {
      setSelectedRecipients(['all']);
      setRecipientSearch('');
    }
  }, [newSetting.type]);

  const handleEndEarly = (id: string) => {
    const today = new Date().toISOString().split('T')[0];
    setSettings(settings.map(s => s.id === id ? { ...s, endDate: today } : s));
    setConfirmEndTask(null);
  };

  const handleDeleteTask = (id: string) => {
    setSettings(settings.filter(s => s.id !== id));
    setConfirmDeleteTask(null);
  };

  const filteredSettings = settings
    .filter(s => {
      if (activeSender === '总部') return s.from === '总部';
      if (activeSender === '大区') return s.from === '华东大区';
      return s.from === '上海小区';
    })
    .filter(s => {
      const isCurrent = new Date(s.endDate) >= new Date();
      const matchesTab = activeTab === 'current' ? isCurrent : !isCurrent;
      const matchesSearch = s.to.toLowerCase().includes(searchQuery.toLowerCase()) || s.from.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesPeriod = filterPeriod === 'all' || s.period === filterPeriod;
      return matchesTab && matchesSearch && matchesPeriod;
    })
    .sort((a, b) => new Date(b.endDate).getTime() - new Date(a.endDate).getTime());

  const totalPages = Math.ceil(filteredSettings.length / pageSize);
  const paginatedSettings = filteredSettings.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  const renderStoreName = (name: string) => {
    const stores = name.split('、');
    if (stores.length <= 2) return name;
    return (
      <div className="flex items-center gap-1.5 group relative">
        <span className="truncate max-w-[200px]">{stores[0]}、{stores[1]}</span>
        <span className="px-1.5 py-0.5 bg-slate-100 dark:bg-slate-700 text-slate-500 rounded text-[9px] font-black cursor-help">
          等{stores.length}家
        </span>
        {/* Tooltip */}
        <div className="absolute bottom-full left-0 mb-2 hidden group-hover:block z-50">
          <div className="bg-slate-900 text-white text-[10px] p-2 rounded-lg shadow-xl whitespace-pre-wrap max-w-[250px] leading-relaxed border border-slate-700">
            {name.split('、').join('\n')}
          </div>
          <div className="w-2 h-2 bg-slate-900 rotate-45 -mt-1 ml-4 border-r border-b border-slate-700"></div>
        </div>
      </div>
    );
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6 animate-fade-in pb-20">
      {/* Header */}
      <div className="flex justify-between items-end bg-white dark:bg-slate-800 p-8 rounded-[2.5rem] border border-slate-100 dark:border-slate-700 shadow-sm">
        <div>
          <h1 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">目标任务设置</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">所设定的任务均为下发至门店执行的运营指标与考核目标</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex p-1 bg-slate-100 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
            <button 
              onClick={() => setActiveTab('current')}
              className={`px-6 py-2 rounded-lg text-xs font-black transition-all ${activeTab === 'current' ? 'bg-white dark:bg-slate-700 text-primary-600 shadow-sm' : 'text-slate-500'}`}
            >
              活跃任务
            </button>
            <button 
              onClick={() => setActiveTab('history')}
              className={`px-6 py-2 rounded-lg text-xs font-black transition-all ${activeTab === 'history' ? 'bg-white dark:bg-slate-700 text-primary-600 shadow-sm' : 'text-slate-500'}`}
            >
              历史归档
            </button>
          </div>
          <button 
            onClick={() => setIsAdding(true)}
            className="flex items-center gap-2 px-6 py-3 bg-primary-600 text-white rounded-2xl font-black hover:bg-primary-700 transition-all shadow-lg shadow-primary-500/20 active:scale-95"
          >
            <Plus size={18} />
            新增任务设定
          </button>
        </div>
      </div>

      {/* Filters & Type Tabs */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex p-1 bg-slate-100 dark:bg-slate-800 rounded-2xl w-fit border border-slate-200 dark:border-slate-700">
          {(['总部', '大区', '小区'] as const).map((sender) => (
            <button
              key={sender}
              onClick={() => setActiveSender(sender)}
              className={`flex items-center gap-2 px-8 py-2.5 rounded-xl text-xs font-black transition-all ${
                activeSender === sender 
                  ? 'bg-white dark:bg-slate-700 text-primary-600 dark:text-primary-400 shadow-sm' 
                  : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'
              }`}
            >
              {senderIcons[sender]}
              {senderLabels[sender]}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <select 
            value={filterPeriod}
            onChange={(e) => setFilterPeriod(e.target.value)}
            className="px-4 py-2.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-bold text-slate-600 outline-none"
          >
            <option value="all">全部周期</option>
            <option value="weekly">周度</option>
            <option value="monthly">月度</option>
            <option value="quarterly">季度</option>
            <option value="yearly">年度</option>
          </select>
        </div>
      </div>

      {/* Add Form Modal-like Overlay */}
      {isAdding && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-white dark:bg-slate-800 rounded-[2.5rem] shadow-2xl w-full max-w-2xl overflow-hidden border border-slate-100 dark:border-slate-700">
            <div className="p-8 border-b border-slate-100 dark:border-slate-700 flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-primary-50 dark:bg-primary-900/20 text-primary-600 rounded-2xl">
                  <Target size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-black text-slate-900 dark:text-white">新建任务设定</h3>
                </div>
              </div>
              <button onClick={() => setIsAdding(false)} className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-full transition-colors">
                <Trash2 size={20} className="text-slate-400" />
              </button>
            </div>

            <div className="p-8 space-y-6 max-h-[60vh] overflow-y-auto custom-scrollbar">
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">任务类型</label>
                  <select 
                    value={newSetting.type || (activeSender === '总部' ? 'hq-to-region' : activeSender === '大区' ? 'region-to-district' : 'district-to-store')}
                    onChange={(e) => setNewSetting({...newSetting, type: e.target.value as any})}
                    className="w-full px-5 py-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl text-sm font-bold text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-primary-500"
                  >
                    {activeSender === '总部' && (
                      <>
                        <option value="hq-to-region">总部 → 大区</option>
                        <option value="hq-to-district">总部 → 小区</option>
                        <option value="hq-to-store">总部 → 门店</option>
                      </>
                    )}
                    {activeSender === '大区' && (
                      <>
                        <option value="region-to-district">大区 → 小区</option>
                        <option value="region-to-store">大区 → 门店</option>
                      </>
                    )}
                    {activeSender === '小区' && (
                      <option value="district-to-store">小区 → 门店</option>
                    )}
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">任务周期</label>
                  <select 
                    value={newSetting.period}
                    onChange={(e) => setNewSetting({...newSetting, period: e.target.value as any})}
                    className="w-full px-5 py-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl text-sm font-bold text-slate-900 dark:text-white outline-none"
                  >
                    {Object.entries(periodLabels).map(([val, label]) => (
                      <option key={val} value={val}>{label}</option>
                    ))}
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">起止日期</label>
                  {newSetting.period === 'weekly' ? (
                    <div className="space-y-2">
                      <select 
                        value={selectedWeek}
                        onChange={(e) => setSelectedWeek(parseInt(e.target.value))}
                        className="w-full px-5 py-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl text-sm font-bold text-slate-900 dark:text-white outline-none"
                      >
                        {Array.from({length: 52}, (_, i) => i + 1).map(w => (
                          <option key={w} value={w}>第 {w} 周</option>
                        ))}
                      </select>
                      <p className="text-[10px] font-bold text-primary-600 px-2">
                        范围: {getWeekRange(selectedWeek).start} 至 {getWeekRange(selectedWeek).end}
                      </p>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <input 
                        type="date" 
                        value={newSetting.startDate}
                        onChange={(e) => setNewSetting({...newSetting, startDate: e.target.value})}
                        className="flex-1 px-4 py-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl text-xs font-bold text-slate-900 dark:text-white outline-none"
                      />
                      <span className="text-slate-400">-</span>
                      <input 
                        type="date" 
                        value={newSetting.endDate}
                        onChange={(e) => setNewSetting({...newSetting, endDate: e.target.value})}
                        className="flex-1 px-4 py-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl text-xs font-bold text-slate-900 dark:text-white outline-none"
                      />
                    </div>
                  )}
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">下达方</label>
                  <input 
                    type="text" 
                    readOnly 
                    value={activeSender === '总部' ? '总部' : activeSender === '大区' ? '华东大区' : '上海小区'}
                    className="w-full px-5 py-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-2xl text-sm font-bold text-slate-500"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">接收方</label>
                  <div className="relative group">
                    <div className="w-full px-5 py-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl text-sm font-bold text-slate-900 dark:text-white flex flex-wrap gap-1 min-h-[46px]">
                      {selectedRecipients.includes('all') ? (
                        <span className="px-2 py-0.5 bg-primary-50 text-primary-600 rounded-lg text-xs">
                          {getRecipientOptions(newSetting.type).allLabel}
                        </span>
                      ) : (
                        selectedRecipients.map(s => (
                          <span key={s} className="px-2 py-0.5 bg-primary-50 text-primary-600 rounded-lg text-xs">{s}</span>
                        ))
                      )}
                    </div>
                    <div className="absolute top-full left-0 w-full mt-2 p-4 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl shadow-xl z-10 hidden group-hover:block">
                      <div className="mb-3">
                        <input 
                          type="text"
                          placeholder={`搜索${getRecipientOptions(newSetting.type).label}...`}
                          value={recipientSearch}
                          onChange={(e) => setRecipientSearch(e.target.value)}
                          className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-700 rounded-xl text-xs font-bold outline-none focus:ring-2 focus:ring-primary-500/20"
                          onClick={(e) => e.stopPropagation()}
                        />
                      </div>
                      <div className="space-y-2 max-h-40 overflow-y-auto custom-scrollbar">
                        {!recipientSearch && (
                          <label className="flex items-center gap-2 p-2 hover:bg-slate-50 dark:hover:bg-slate-700 rounded-xl cursor-pointer">
                            <input 
                              type="checkbox" 
                              checked={selectedRecipients.includes('all')}
                              onChange={(e) => {
                                if (e.target.checked) setSelectedRecipients(['all']);
                                else setSelectedRecipients([]);
                              }}
                              className="rounded border-slate-300 text-primary-600 focus:ring-primary-500"
                            />
                            <span className="text-xs font-bold">{getRecipientOptions(newSetting.type).allLabel}</span>
                          </label>
                        )}
                        {getRecipientOptions(newSetting.type).data
                          .filter(item => item.toLowerCase().includes(recipientSearch.toLowerCase()))
                          .map(item => (
                            <label key={item} className="flex items-center gap-2 p-2 hover:bg-slate-50 dark:hover:bg-slate-700 rounded-xl cursor-pointer">
                              <input 
                                type="checkbox" 
                                checked={selectedRecipients.includes(item)}
                                onChange={(e) => {
                                  let next = [...selectedRecipients].filter(s => s !== 'all');
                                  if (e.target.checked) next.push(item);
                                  else next = next.filter(s => s !== item);
                                  if (next.length === 0) next = ['all'];
                                  setSelectedRecipients(next);
                                }}
                                className="rounded border-slate-300 text-primary-600 focus:ring-primary-500"
                              />
                              <span className="text-xs font-bold">{item}</span>
                            </label>
                          ))}
                        {getRecipientOptions(newSetting.type).data.filter(item => item.toLowerCase().includes(recipientSearch.toLowerCase())).length === 0 && (
                          <p className="text-center py-4 text-[10px] font-bold text-slate-400">未找到相关结果</p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3 p-4 bg-primary-50/50 dark:bg-primary-900/10 rounded-2xl border border-primary-100 dark:border-primary-800/50">
                <input 
                  type="checkbox" 
                  id="continuous"
                  checked={newSetting.isContinuous}
                  onChange={(e) => setNewSetting({...newSetting, isContinuous: e.target.checked})}
                  className="w-5 h-5 rounded-lg border-primary-300 text-primary-600 focus:ring-primary-500"
                />
                <label htmlFor="continuous" className="flex-1 cursor-pointer">
                  <p className="text-sm font-black text-primary-900 dark:text-primary-200">任务延续</p>
                  <p className="text-[10px] font-bold text-primary-600/70">勾选后，任务到期前将自动生成下一周期的相同任务</p>
                </label>
              </div>

              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">指标设定</label>
                  <button 
                    onClick={handleAddMetric}
                    className="text-xs font-black text-primary-600 hover:text-primary-700 flex items-center gap-1"
                  >
                    <Plus size={14} /> 添加指标
                  </button>
                </div>
                
                <div className="space-y-3">
                  {newSetting.metrics?.map((metric, idx) => (
                    <div key={metric.id} className="flex items-center gap-3 p-4 bg-slate-50 dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-700 animate-slide-in-right" style={{animationDelay: `${idx * 0.05}s`}}>
                      <select 
                        value={metric.name}
                        onChange={(e) => {
                          const selected = availableMetrics.find(am => am.name === e.target.value);
                          const updatedMetrics = [...(newSetting.metrics || [])];
                          updatedMetrics[idx] = { ...metric, name: e.target.value, unit: selected?.unit || '' };
                          setNewSetting({ ...newSetting, metrics: updatedMetrics });
                        }}
                        className="flex-1 bg-transparent border-none text-sm font-bold text-slate-900 dark:text-white focus:ring-0 outline-none"
                      >
                        {availableMetrics.map(am => (
                          <option key={am.name} value={am.name}>{am.name}</option>
                        ))}
                      </select>
                      <div className="flex items-center gap-2 bg-white dark:bg-slate-800 px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700">
                        <input 
                          type="text" 
                          placeholder="目标值"
                          value={metric.target}
                          onChange={(e) => {
                            const updatedMetrics = [...(newSetting.metrics || [])];
                            updatedMetrics[idx] = { ...metric, target: e.target.value };
                            setNewSetting({ ...newSetting, metrics: updatedMetrics });
                          }}
                          className="w-16 bg-transparent border-none text-sm font-black text-slate-900 dark:text-white focus:ring-0 outline-none text-right"
                        />
                        <span className="text-[10px] font-bold text-slate-400">{metric.unit}</span>
                      </div>
                      <button 
                        onClick={() => handleRemoveMetric(metric.id)}
                        className="p-1.5 text-slate-300 hover:text-rose-500 transition-colors"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="p-8 bg-slate-50 dark:bg-slate-900/50 border-t border-slate-100 dark:border-slate-700 flex gap-4">
              <button 
                onClick={() => setIsAdding(false)}
                className="flex-1 px-6 py-4 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 rounded-2xl font-black hover:bg-slate-50 transition-all"
              >
                取消
              </button>
              <button 
                onClick={handleSave}
                className="flex-1 px-6 py-4 bg-primary-600 text-white rounded-2xl font-black hover:bg-primary-700 transition-all shadow-lg shadow-primary-500/20 flex items-center justify-center gap-2"
              >
                <Save size={18} />
                发布任务
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Settings List - Optimized for many items */}
      <div className="bg-white dark:bg-slate-800 rounded-[2.5rem] border border-slate-100 dark:border-slate-700 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/50 dark:bg-slate-900/50 border-b border-slate-100 dark:border-slate-700">
                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">任务接收方</th>
                <th className="px-6 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">任务周期</th>
                <th className="px-6 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">起止日期</th>
                <th className="px-6 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">核心指标预览</th>
                <th className="px-6 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">更新人</th>
                <th className="px-6 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">更新时间</th>
                <th className="px-6 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">状态</th>
                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">操作</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50 dark:divide-slate-700/50">
              {paginatedSettings.map((setting) => (
                <tr key={setting.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-900/30 transition-colors">
                  <td className="px-8 py-6">
                    <div className="text-sm font-black text-slate-900 dark:text-white">
                      {renderStoreName(setting.to)}
                    </div>
                  </td>
                  <td className="px-6 py-6">
                    <span className="px-2.5 py-1 bg-slate-100 dark:bg-slate-700 text-slate-500 rounded text-[10px] font-black uppercase tracking-widest">
                      {periodLabels[setting.period]}
                    </span>
                  </td>
                  <td className="px-6 py-6">
                    <p className="text-xs font-bold text-slate-600 dark:text-slate-400">{setting.startDate}</p>
                    <p className="text-[10px] text-slate-400">至 {setting.endDate}</p>
                  </td>
                  <td className="px-6 py-6">
                    <div className="flex flex-wrap gap-2 group relative">
                      {setting.metrics.slice(0, 2).map(m => (
                        <div key={m.id} className="px-2 py-1 bg-primary-50 dark:bg-primary-900/10 rounded-lg border border-primary-100 dark:border-primary-800/50">
                          <span className="text-[9px] font-bold text-primary-600 dark:text-primary-400">{m.name}: {m.target}{m.unit}</span>
                        </div>
                      ))}
                      {setting.metrics.length > 2 && (
                        <>
                          <span className="text-[9px] font-bold text-slate-400 self-center cursor-help">+{setting.metrics.length - 2}</span>
                          {/* Tooltip */}
                          <div className="absolute bottom-full left-0 mb-2 hidden group-hover:block z-50">
                            <div className="bg-slate-900 text-white text-[10px] p-2 rounded-lg shadow-xl space-y-1 border border-slate-700">
                              {setting.metrics.map(m => (
                                <div key={m.id} className="whitespace-nowrap">
                                  {m.name}: <span className="text-primary-400 font-bold">{m.target}{m.unit}</span>
                                </div>
                              ))}
                            </div>
                            <div className="w-2 h-2 bg-slate-900 rotate-45 -mt-1 ml-4 border-r border-b border-slate-700"></div>
                          </div>
                        </>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-6">
                    <p className="text-xs font-bold text-slate-600 dark:text-slate-400">{setting.updatedBy}</p>
                  </td>
                  <td className="px-6 py-6">
                    <p className="text-[10px] text-slate-400">{setting.updatedAt}</p>
                  </td>
                  <td className="px-6 py-6 text-center">
                    <div className="flex flex-col items-center gap-1">
                      {activeTab === 'current' ? (
                        new Date(setting.startDate) > new Date() ? (
                          <span className="px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest bg-amber-500 text-white shadow-lg shadow-amber-500/20">
                            待执行
                          </span>
                        ) : (
                          <span className="px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest bg-emerald-500 text-white shadow-lg shadow-emerald-500/20">
                            执行中
                          </span>
                        )
                      ) : (
                        <span className="px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest bg-slate-200 dark:bg-slate-700 text-slate-500">
                          已结束
                        </span>
                      )}
                      {setting.isContinuous && (
                        <span className="text-[8px] font-black text-primary-500 uppercase tracking-tighter">自动延续</span>
                      )}
                    </div>
                  </td>
                  <td className="px-8 py-6 text-right">
                    <div className="flex items-center justify-end gap-3">
                      {activeTab === 'current' && (
                        <>
                          {new Date(setting.startDate) > new Date() ? (
                            <>
                              <button 
                                onClick={() => handleEdit(setting)}
                                className="text-xs font-black text-primary-600 hover:text-primary-700 transition-colors"
                              >
                                编辑
                              </button>
                              <button 
                                onClick={() => setConfirmDeleteTask(setting.id)}
                                className="text-xs font-black text-rose-500 hover:text-rose-600 transition-colors"
                              >
                                删除
                              </button>
                            </>
                          ) : (
                            <button 
                              onClick={() => setConfirmEndTask(setting.id)}
                              className="text-xs font-black text-rose-500 hover:text-rose-600 transition-colors"
                            >
                              结束任务
                            </button>
                          )}
                        </>
                      )}
                      <button 
                        onClick={() => setViewingTask(setting)}
                        className="text-xs font-black text-slate-400 hover:text-slate-600 transition-colors"
                      >
                        详情
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredSettings.length === 0 && (
          <div className="py-20 flex flex-col items-center justify-center text-slate-400 space-y-4">
            <AlertCircle size={48} strokeWidth={1} />
            <div className="text-center">
              <p className="font-bold">未找到符合条件的任务设定</p>
              <p className="text-xs">请尝试调整筛选条件或搜索关键词</p>
            </div>
          </div>
        )}

        {/* Pagination */}
        {filteredSettings.length > 0 && (
          <div className="px-8 py-4 bg-slate-50/30 dark:bg-slate-900/30 border-t border-slate-100 dark:border-slate-700 flex items-center justify-between">
            <p className="text-xs font-bold text-slate-500">
              显示 {(currentPage - 1) * pageSize + 1} 到 {Math.min(currentPage * pageSize, filteredSettings.length)} 条，共 {filteredSettings.length} 条
            </p>
            <div className="flex items-center gap-2">
              <button 
                onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                disabled={currentPage === 1}
                className="p-2 rounded-lg border border-slate-200 dark:border-slate-700 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-white dark:hover:bg-slate-800 transition-all"
              >
                <ChevronLeft size={16} />
              </button>
              <div className="flex items-center gap-1">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`w-8 h-8 rounded-lg text-xs font-black transition-all ${
                      currentPage === page 
                        ? 'bg-primary-600 text-white shadow-lg shadow-primary-500/20' 
                        : 'text-slate-500 hover:bg-white dark:hover:bg-slate-800 border border-transparent hover:border-slate-200 dark:hover:border-slate-700'
                    }`}
                  >
                    {page}
                  </button>
                ))}
              </div>
              <button 
                onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                disabled={currentPage === totalPages}
                className="p-2 rounded-lg border border-slate-200 dark:border-slate-700 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-white dark:hover:bg-slate-800 transition-all"
              >
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Confirm End Task Modal */}
      {confirmEndTask && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-white dark:bg-slate-800 rounded-[2rem] shadow-2xl w-full max-w-md overflow-hidden border border-slate-100 dark:border-slate-700">
            <div className="p-8 text-center space-y-4">
              <div className="w-16 h-16 bg-rose-50 dark:bg-rose-900/20 text-rose-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <StopCircle size={32} />
              </div>
              <h3 className="text-xl font-black text-slate-900 dark:text-white">确认提前结束任务？</h3>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                提前结束任务后，该任务将立即移至“历史归档”中，且无法重新开启。
              </p>
            </div>
            <div className="p-6 bg-slate-50 dark:bg-slate-900/50 border-t border-slate-100 dark:border-slate-700 flex gap-3">
              <button 
                onClick={() => setConfirmEndTask(null)}
                className="flex-1 px-6 py-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 rounded-xl font-bold hover:bg-slate-50 transition-all"
              >
                取消
              </button>
              <button 
                onClick={() => handleEndEarly(confirmEndTask)}
                className="flex-1 px-6 py-3 bg-rose-500 text-white rounded-xl font-bold hover:bg-rose-600 transition-all shadow-lg shadow-rose-500/20"
              >
                确认结束
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Confirm Delete Task Modal */}
      {confirmDeleteTask && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-white dark:bg-slate-800 rounded-[2rem] shadow-2xl w-full max-w-md overflow-hidden border border-slate-100 dark:border-slate-700">
            <div className="p-8 text-center space-y-4">
              <div className="w-16 h-16 bg-rose-50 dark:bg-rose-900/20 text-rose-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Trash2 size={32} />
              </div>
              <h3 className="text-xl font-black text-slate-900 dark:text-white">确认删除任务？</h3>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                删除后该任务将无法恢复，请谨慎操作。
              </p>
            </div>
            <div className="p-6 bg-slate-50 dark:bg-slate-900/50 border-t border-slate-100 dark:border-slate-700 flex gap-3">
              <button 
                onClick={() => setConfirmDeleteTask(null)}
                className="flex-1 px-6 py-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 rounded-xl font-bold hover:bg-slate-50 transition-all"
              >
                取消
              </button>
              <button 
                onClick={() => handleDeleteTask(confirmDeleteTask)}
                className="flex-1 px-6 py-3 bg-rose-500 text-white rounded-xl font-bold hover:bg-rose-600 transition-all shadow-lg shadow-rose-500/20"
              >
                确认删除
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Task Details Modal */}
      {viewingTask && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-white dark:bg-slate-800 rounded-[2.5rem] shadow-2xl w-full max-w-2xl overflow-hidden border border-slate-100 dark:border-slate-700">
            <div className="p-8 border-b border-slate-100 dark:border-slate-700 flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-primary-50 dark:bg-primary-900/20 text-primary-600 rounded-2xl">
                  <Target size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-black text-slate-900 dark:text-white">任务详情</h3>
                  <p className="text-xs text-slate-400 font-bold uppercase tracking-widest">{typeLabels[viewingTask.type]}</p>
                </div>
              </div>
              <button onClick={() => setViewingTask(null)} className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-full transition-colors">
                <Plus size={20} className="text-slate-400 rotate-45" />
              </button>
            </div>

            <div className="p-8 space-y-8 max-h-[70vh] overflow-y-auto custom-scrollbar">
              <div className="grid grid-cols-2 gap-8">
                <div className="space-y-1">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">接收方</p>
                  <p className="text-lg font-black text-slate-900 dark:text-white">{viewingTask.to}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">下达方</p>
                  <p className="text-lg font-black text-slate-900 dark:text-white">{viewingTask.from}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">任务周期</p>
                  <p className="text-sm font-bold text-slate-700 dark:text-slate-200">{periodLabels[viewingTask.period]}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">起止日期</p>
                  <p className="text-sm font-bold text-slate-700 dark:text-slate-200">{viewingTask.startDate} 至 {viewingTask.endDate}</p>
                </div>
              </div>

              <div className="space-y-4">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">指标设定</p>
                <div className="grid grid-cols-2 gap-4">
                  {viewingTask.metrics.map((metric) => (
                    <div key={metric.id} className="p-4 bg-slate-50 dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-700 flex justify-between items-center">
                      <span className="text-sm font-bold text-slate-600 dark:text-slate-400">{metric.name}</span>
                      <span className="text-lg font-black text-primary-600">{metric.target}<span className="text-xs ml-1">{metric.unit}</span></span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-8 pt-4 border-t border-slate-100 dark:border-slate-700">
                <div className="space-y-1">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">更新人</p>
                  <p className="text-xs font-bold text-slate-600 dark:text-slate-400">{viewingTask.updatedBy}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">更新时间</p>
                  <p className="text-xs font-bold text-slate-600 dark:text-slate-400">{viewingTask.updatedAt}</p>
                </div>
              </div>
            </div>

            <div className="p-8 bg-slate-50 dark:bg-slate-900/50 border-t border-slate-100 dark:border-slate-700">
              <button 
                onClick={() => setViewingTask(null)}
                className="w-full px-6 py-4 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white rounded-2xl font-black hover:bg-slate-50 transition-all"
              >
                关闭
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TargetTaskSettings;
