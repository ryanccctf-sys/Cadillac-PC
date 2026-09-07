import React, { useState, useMemo } from 'react';
import { 
  Plus, 
  Search, 
  RotateCcw, 
  Calendar, 
  Trash2, 
  Edit3, 
  X, 
  CheckCircle2, 
  AlertCircle, 
  AlertTriangle,
  ChevronLeft, 
  ChevronRight,
  ClipboardList,
  Layers,
  ArrowUpDown,
  Sparkles
} from 'lucide-react';

// --- Type Definitions ---
export interface TrainingTask {
  id: string;
  topic: string; // 转训主题
  startDate: string; // 转训开始时间 YYYY-MM-DD
  endDate: string; // 转训结束时间 YYYY-MM-DD
  qcPlan: string; // 关联转训质检方案
  createdAt: string; // 创建时间 YYYY-MM-DD HH:mm
}

// Preset QC Plans
export const PRESET_QC_PLANS = [
  'XT5新品销售话术质检方案',
  'CT5产品力质检方案',
  '新能源销售流程质检方案',
  '试乘试驾专项质检方案'
];

// Initial 28 Mock Data Items
const INITIAL_TRAINING_TASKS: TrainingTask[] = [
  {
    id: 'TASK-20260902-01',
    topic: 'XT5焕新上市产品转训',
    startDate: '2026-09-10',
    endDate: '2026-09-25',
    qcPlan: 'XT5新品销售话术质检方案',
    createdAt: '2026-09-02 14:30',
  },
  {
    id: 'TASK-20260901-02',
    topic: '新能源销售流程专项转训',
    startDate: '2026-09-01',
    endDate: '2026-09-15',
    qcPlan: '新能源销售流程质检方案',
    createdAt: '2026-08-28 16:42',
  },
  {
    id: 'TASK-20260810-03',
    topic: 'CT5核心产品力强化转训',
    startDate: '2026-08-15',
    endDate: '2026-08-31',
    qcPlan: 'CT5产品力质检方案',
    createdAt: '2026-08-10 10:20',
  },
  {
    id: 'TASK-20260805-04',
    topic: '试乘试驾安全规范与动静态体验转训',
    startDate: '2026-08-08',
    endDate: '2026-08-22',
    qcPlan: '试乘试驾专项质检方案',
    createdAt: '2026-08-05 09:15',
  },
  {
    id: 'TASK-20260728-05',
    topic: 'XT5蜂鸟底盘与智能四驱攻防话术转训',
    startDate: '2026-08-01',
    endDate: '2026-08-15',
    qcPlan: 'XT5新品销售话术质检方案',
    createdAt: '2026-07-28 15:10',
  },
  {
    id: 'TASK-20260720-06',
    topic: '纯电IQ序列用户接待接待流程标准转训',
    startDate: '2026-07-22',
    endDate: '2026-08-05',
    qcPlan: '新能源销售流程质检方案',
    createdAt: '2026-07-20 11:30',
  },
  {
    id: 'TASK-20260710-07',
    topic: 'CT5豪华运动轿车竞品对比专项演练',
    startDate: '2026-07-15',
    endDate: '2026-07-30',
    qcPlan: 'CT5产品力质检方案',
    createdAt: '2026-07-10 14:05',
  },
  {
    id: 'TASK-20260625-08',
    topic: '置换补贴政策与金融方案精准推介转训',
    startDate: '2026-07-01',
    endDate: '2026-07-15',
    qcPlan: '新能源销售流程质检方案',
    createdAt: '2026-06-25 16:50',
  },
  {
    id: 'TASK-20260615-09',
    topic: '智能座舱车机互联与语音控制实操转训',
    startDate: '2026-06-18',
    endDate: '2026-07-02',
    qcPlan: 'XT5新品销售话术质检方案',
    createdAt: '2026-06-15 10:40',
  },
  {
    id: 'TASK-20260601-10',
    topic: '金牌销售五步邀约法及试驾转化技巧',
    startDate: '2026-06-05',
    endDate: '2026-06-20',
    qcPlan: '试乘试驾专项质检方案',
    createdAt: '2026-06-01 13:20',
  },
  {
    id: 'TASK-20260520-11',
    topic: 'CT5赛道基因与操控性能深度解析',
    startDate: '2026-05-25',
    endDate: '2026-06-10',
    qcPlan: 'CT5产品力质检方案',
    createdAt: '2026-05-20 09:30',
  },
  {
    id: 'TASK-20260510-12',
    topic: '新能源补能生态与家充桩安装答疑专项',
    startDate: '2026-05-12',
    endDate: '2026-05-28',
    qcPlan: '新能源销售流程质检方案',
    createdAt: '2026-05-10 15:45',
  },
  {
    id: 'TASK-20260425-13',
    topic: 'XT5静音座舱与BOSE音响体验动线演练',
    startDate: '2026-04-28',
    endDate: '2026-05-12',
    qcPlan: 'XT5新品销售话术质检方案',
    createdAt: '2026-04-25 11:00',
  },
  {
    id: 'TASK-20260412-14',
    topic: '试驾突发路况处置与客户情绪安抚培训',
    startDate: '2026-04-15',
    endDate: '2026-04-30',
    qcPlan: '试乘试驾专项质检方案',
    createdAt: '2026-04-12 14:15',
  },
  {
    id: 'TASK-20260330-15',
    topic: 'CT5电磁感应悬挂MRC与Brembo刹车讲解',
    startDate: '2026-04-02',
    endDate: '2026-04-18',
    qcPlan: 'CT5产品力质检方案',
    createdAt: '2026-03-30 16:20',
  },
  {
    id: 'TASK-20260318-16',
    topic: '春季换季保养与延保服务转化话术',
    startDate: '2026-03-20',
    endDate: '2026-04-05',
    qcPlan: '新能源销售流程质检方案',
    createdAt: '2026-03-18 10:05',
  },
  {
    id: 'TASK-20260305-17',
    topic: '全新XT5外观设计语言与内饰工艺解析',
    startDate: '2026-03-08',
    endDate: '2026-03-25',
    qcPlan: 'XT5新品销售话术质检方案',
    createdAt: '2026-03-05 09:40',
  },
  {
    id: 'TASK-20260220-18',
    topic: '试乘试驾路线标准讲解与六方位绕车',
    startDate: '2026-02-22',
    endDate: '2026-03-10',
    qcPlan: '试乘试驾专项质检方案',
    createdAt: '2026-02-20 15:30',
  },
  {
    id: 'TASK-20260210-19',
    topic: '智驾辅助系统SuperCruise实车演示演练',
    startDate: '2026-02-12',
    endDate: '2026-02-28',
    qcPlan: '新能源销售流程质检方案',
    createdAt: '2026-02-10 11:20',
  },
  {
    id: 'TASK-20260125-20',
    topic: 'CT5新春特别版权益与现车锁定促单',
    startDate: '2026-01-28',
    endDate: '2026-02-15',
    qcPlan: 'CT5产品力质检方案',
    createdAt: '2026-01-25 14:00',
  },
  {
    id: 'TASK-20260115-21',
    topic: 'XT5安全防护科技与360全景影像讲解',
    startDate: '2026-01-18',
    endDate: '2026-02-02',
    qcPlan: 'XT5新品销售话术质检方案',
    createdAt: '2026-01-15 10:15',
  },
  {
    id: 'TASK-20260105-22',
    topic: '新能源用户生命周期关怀与转介绍开拓',
    startDate: '2026-01-08',
    endDate: '2026-01-25',
    qcPlan: '新能源销售流程质检方案',
    createdAt: '2026-01-05 16:10',
  },
  {
    id: 'TASK-20251220-23',
    topic: '年终冲刺试乘试驾成交转化冲刺转训',
    startDate: '2025-12-22',
    endDate: '2026-01-05',
    qcPlan: '试乘试驾专项质检方案',
    createdAt: '2025-12-20 09:50',
  },
  {
    id: 'TASK-20251210-24',
    topic: 'CT5后驱驾控乐趣对比前驱竞品专项话术',
    startDate: '2025-12-12',
    endDate: '2025-12-28',
    qcPlan: 'CT5产品力质检方案',
    createdAt: '2025-12-10 13:40',
  },
  {
    id: 'TASK-20251125-25',
    topic: 'XT5豪华SUV大空间与后备箱多功能演示',
    startDate: '2025-11-28',
    endDate: '2025-12-15',
    qcPlan: 'XT5新品销售话术质检方案',
    createdAt: '2025-11-25 11:30',
  },
  {
    id: 'TASK-20251110-26',
    topic: '新能源三电系统质保与安全标准宣讲',
    startDate: '2025-11-12',
    endDate: '2025-11-28',
    qcPlan: '新能源销售流程质检方案',
    createdAt: '2025-11-10 15:00',
  },
  {
    id: 'TASK-20251020-27',
    topic: '试乘试驾急加速与紧急制动体验动线',
    startDate: '2025-10-22',
    endDate: '2025-11-08',
    qcPlan: '试乘试驾专项质检方案',
    createdAt: '2025-10-20 10:25',
  },
  {
    id: 'TASK-20251008-28',
    topic: 'CT5智能互联座舱OTA升级新功能转训',
    startDate: '2025-10-10',
    endDate: '2025-10-25',
    qcPlan: 'CT5产品力质检方案',
    createdAt: '2025-10-08 14:10',
  }
];

export const TrainingTaskManagement: React.FC = () => {
  // --- Data State ---
  const [tasks, setTasks] = useState<TrainingTask[]>(INITIAL_TRAINING_TASKS);

  // --- Filter State ---
  const [filterTopic, setFilterTopic] = useState<string>('');
  const [filterStartDate, setFilterStartDate] = useState<string>('');
  const [filterEndDate, setFilterEndDate] = useState<string>('');
  const [filterQcPlan, setFilterQcPlan] = useState<string>('');

  // Applied Filters (Updated on Query click)
  const [appliedFilters, setAppliedFilters] = useState({
    topic: '',
    startDate: '',
    endDate: '',
    qcPlan: '',
  });

  // --- Pagination State ---
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);

  // --- Toast Notification State ---
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  // --- Modal State (Create / Edit) ---
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [modalMode, setModalMode] = useState<'create' | 'edit'>('create');
  const [editingTaskId, setEditingTaskId] = useState<string | null>(null);

  // Form Fields
  const [formTopic, setFormTopic] = useState<string>('');
  const [formStartDate, setFormStartDate] = useState<string>('');
  const [formEndDate, setFormEndDate] = useState<string>('');
  const [formQcPlan, setFormQcPlan] = useState<string>('');

  // Form Validation Errors
  const [formErrors, setFormErrors] = useState<{
    topic?: string;
    date?: string;
    qcPlan?: string;
  }>({});

  // --- Delete Confirmation Modal State ---
  const [deletingTask, setDeletingTask] = useState<TrainingTask | null>(null);

  // --- Filter Actions ---
  const handleQuery = () => {
    setAppliedFilters({
      topic: filterTopic.trim(),
      startDate: filterStartDate,
      endDate: filterEndDate,
      qcPlan: filterQcPlan,
    });
    setCurrentPage(1);
  };

  const handleReset = () => {
    setFilterTopic('');
    setFilterStartDate('');
    setFilterEndDate('');
    setFilterQcPlan('');
    setAppliedFilters({
      topic: '',
      startDate: '',
      endDate: '',
      qcPlan: '',
    });
    setCurrentPage(1);
  };

  // --- Filtered and Sorted Task List ---
  const filteredTasks = useMemo(() => {
    return tasks.filter(task => {
      // 1. Topic Fuzzy Search
      if (appliedFilters.topic) {
        if (!task.topic.toLowerCase().includes(appliedFilters.topic.toLowerCase())) {
          return false;
        }
      }

      // 2. Date Range Filter
      if (appliedFilters.startDate) {
        if (task.endDate < appliedFilters.startDate) {
          return false;
        }
      }
      if (appliedFilters.endDate) {
        if (task.startDate > appliedFilters.endDate) {
          return false;
        }
      }

      // 3. QC Plan Filter
      if (appliedFilters.qcPlan) {
        if (task.qcPlan !== appliedFilters.qcPlan) {
          return false;
        }
      }

      return true;
    });
  }, [tasks, appliedFilters]);

  // Paginated Slices
  const totalItems = filteredTasks.length;
  const totalPages = Math.ceil(totalItems / pageSize) || 1;
  const paginatedTasks = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filteredTasks.slice(start, start + pageSize);
  }, [filteredTasks, currentPage, pageSize]);

  // --- Modal Openers ---
  const openCreateModal = () => {
    setModalMode('create');
    setEditingTaskId(null);
    setFormTopic('');
    setFormStartDate('');
    setFormEndDate('');
    setFormQcPlan('');
    setFormErrors({});
    setIsModalOpen(true);
  };

  const openEditModal = (task: TrainingTask) => {
    setModalMode('edit');
    setEditingTaskId(task.id);
    setFormTopic(task.topic);
    setFormStartDate(task.startDate);
    setFormEndDate(task.endDate);
    setFormQcPlan(task.qcPlan);
    setFormErrors({});
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingTaskId(null);
    setFormErrors({});
  };

  // --- Modal Submit Handler ---
  const handleModalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errors: { topic?: string; date?: string; qcPlan?: string } = {};

    if (!formTopic.trim()) {
      errors.topic = '转训主题不能为空';
    }

    if (!formStartDate || !formEndDate) {
      errors.date = '转训时间不能为空，请选择开始日期与结束日期';
    } else if (formStartDate > formEndDate) {
      errors.date = '开始日期不能晚于结束日期';
    }

    if (!formQcPlan) {
      errors.qcPlan = '关联转训质检方案不能为空';
    }

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    if (modalMode === 'create') {
      const now = new Date();
      const pad = (n: number) => (n < 10 ? `0${n}` : n);
      const createdTimeString = `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())} ${pad(now.getHours())}:${pad(now.getMinutes())}`;
      
      const newTask: TrainingTask = {
        id: `TASK-${Date.now().toString().slice(-8)}`,
        topic: formTopic.trim(),
        startDate: formStartDate,
        endDate: formEndDate,
        qcPlan: formQcPlan,
        createdAt: createdTimeString,
      };

      // Prepend to show on top (latest first)
      setTasks(prev => [newTask, ...prev]);
      closeModal();
      setCurrentPage(1);
      showToast('转训任务创建成功');
    } else if (modalMode === 'edit' && editingTaskId) {
      setTasks(prev =>
        prev.map(t => {
          if (t.id === editingTaskId) {
            return {
              ...t,
              topic: formTopic.trim(),
              startDate: formStartDate,
              endDate: formEndDate,
              qcPlan: formQcPlan,
            };
          }
          return t;
        })
      );
      closeModal();
      showToast('转训任务修改成功');
    }
  };

  // --- Delete Handler ---
  const handleConfirmDelete = () => {
    if (!deletingTask) return;
    setTasks(prev => prev.filter(t => t.id !== deletingTask.id));
    setDeletingTask(null);
    showToast('转训任务已删除');
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-5 left-1/2 -translate-x-1/2 z-[100] animate-in fade-in slide-in-from-top duration-200">
          <div className="flex items-center gap-2 bg-emerald-600 text-white px-5 py-3 rounded-2xl shadow-xl font-medium text-sm border border-emerald-500">
            <CheckCircle2 size={18} className="text-white" />
            <span>{toastMessage}</span>
          </div>
        </div>
      )}

      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-blue-600/10 dark:bg-blue-500/20 text-blue-600 dark:text-blue-400 rounded-xl">
              <ClipboardList size={22} />
            </div>
            <div>
              <h1 className="text-xl font-bold text-slate-900 dark:text-white">
                转训任务管理
              </h1>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                制定并维护全国转训主题任务与关联质检方案，支持下发至经销商内训师创建实训记录
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 一、筛选区域 */}
      <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-5 shadow-xs transition-colors">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 items-end">
          
          {/* 1. 转训主题 (输入框) */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-1">
              <span>转训主题</span>
            </label>
            <div className="relative">
              <input
                type="text"
                value={filterTopic}
                onChange={(e) => setFilterTopic(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleQuery()}
                placeholder="请输入转训主题"
                className="w-full bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-700 rounded-xl px-3.5 py-2 text-xs text-slate-800 dark:text-slate-200 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 transition-all"
              />
              {filterTopic && (
                <button
                  onClick={() => setFilterTopic('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                >
                  <X size={14} />
                </button>
              )}
            </div>
          </div>

          {/* 2. 转训时间 (开始日期 - 结束日期) */}
          <div className="space-y-1.5 lg:col-span-2">
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-1">
              <span>转训时间</span>
            </label>
            <div className="flex items-center gap-2">
              <div className="relative flex-1">
                <input
                  type="date"
                  value={filterStartDate}
                  onChange={(e) => setFilterStartDate(e.target.value)}
                  className="w-full bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2 text-xs text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 transition-all"
                  placeholder="开始日期"
                />
              </div>
              <span className="text-xs text-slate-400">-</span>
              <div className="relative flex-1">
                <input
                  type="date"
                  value={filterEndDate}
                  onChange={(e) => setFilterEndDate(e.target.value)}
                  className="w-full bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2 text-xs text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 transition-all"
                  placeholder="结束日期"
                />
              </div>
            </div>
          </div>

          {/* 3. 关联转训质检方案 (下拉选择框) */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-1">
              <span>关联转训质检方案</span>
            </label>
            <select
              value={filterQcPlan}
              onChange={(e) => setFilterQcPlan(e.target.value)}
              className="w-full bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2 text-xs text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 transition-all cursor-pointer"
            >
              <option value="">请选择质检方案</option>
              {PRESET_QC_PLANS.map((plan) => (
                <option key={plan} value={plan}>
                  {plan}
                </option>
              ))}
            </select>
          </div>

          {/* 4. 操作按钮 (查询 / 重置) */}
          <div className="flex items-center gap-2 pt-2 md:pt-0">
            <button
              onClick={handleQuery}
              className="flex-1 inline-flex items-center justify-center gap-1.5 px-4 py-2 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white rounded-xl text-xs font-bold transition-all shadow-sm shadow-blue-500/20 cursor-pointer"
            >
              <Search size={14} />
              <span>查询</span>
            </button>
            <button
              onClick={handleReset}
              className="flex-1 inline-flex items-center justify-center gap-1.5 px-4 py-2 bg-slate-100 hover:bg-slate-200 dark:bg-slate-700/60 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-xl text-xs font-bold transition-all cursor-pointer"
            >
              <RotateCcw size={14} />
              <span>重置</span>
            </button>
          </div>

        </div>
      </div>

      {/* 二、创建转训任务按钮 & 统计栏 */}
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
          <span>当前筛选任务共 <strong className="text-slate-800 dark:text-slate-200 font-bold">{totalItems}</strong> 项</span>
        </div>
        <button
          onClick={openCreateModal}
          className="inline-flex items-center gap-1.5 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white rounded-xl text-xs font-bold transition-all shadow-md shadow-blue-500/20 cursor-pointer"
        >
          <Plus size={16} />
          <span>创建转训任务</span>
        </button>
      </div>

      {/* 三、转训任务列表 (Table) */}
      <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-xs overflow-hidden transition-colors">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-50 dark:bg-slate-900/60 text-slate-600 dark:text-slate-300 border-b border-slate-200 dark:border-slate-700 font-bold">
                <th className="py-3.5 px-4 text-center w-16">序号</th>
                <th className="py-3.5 px-4 min-w-[240px]">转训主题</th>
                <th className="py-3.5 px-4 min-w-[130px]">转训开始时间</th>
                <th className="py-3.5 px-4 min-w-[130px]">转训结束时间</th>
                <th className="py-3.5 px-4 min-w-[220px]">关联转训质检方案</th>
                <th className="py-3.5 px-4 min-w-[150px]">创建时间</th>
                <th className="py-3.5 px-4 text-center min-w-[120px]">操作</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-700/60 text-slate-700 dark:text-slate-200">
              {paginatedTasks.length > 0 ? (
                paginatedTasks.map((task, idx) => {
                  const displayIndex = (currentPage - 1) * pageSize + idx + 1;
                  return (
                    <tr 
                      key={task.id}
                      className="hover:bg-slate-50/80 dark:hover:bg-slate-700/40 transition-colors"
                    >
                      {/* 1. 序号 */}
                      <td className="py-3.5 px-4 text-center font-mono text-slate-400 dark:text-slate-500">
                        {displayIndex}
                      </td>

                      {/* 2. 转训主题 */}
                      <td className="py-3.5 px-4">
                        <div className="font-bold text-slate-900 dark:text-white">
                          {task.topic}
                        </div>
                      </td>

                      {/* 3. 转训开始时间 */}
                      <td className="py-3.5 px-4 font-mono text-slate-600 dark:text-slate-300">
                        <div className="flex items-center gap-1.5">
                          <Calendar size={13} className="text-slate-400 shrink-0" />
                          <span>{task.startDate}</span>
                        </div>
                      </td>

                      {/* 4. 转训结束时间 */}
                      <td className="py-3.5 px-4 font-mono text-slate-600 dark:text-slate-300">
                        <div className="flex items-center gap-1.5">
                          <Calendar size={13} className="text-slate-400 shrink-0" />
                          <span>{task.endDate}</span>
                        </div>
                      </td>

                      {/* 5. 关联转训质检方案 */}
                      <td className="py-3.5 px-4">
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300 border border-blue-200/70 dark:border-blue-800/60 rounded-lg text-[11px] font-medium">
                          <Layers size={12} className="text-blue-500 shrink-0" />
                          <span>{task.qcPlan}</span>
                        </span>
                      </td>

                      {/* 6. 创建时间 */}
                      <td className="py-3.5 px-4 font-mono text-slate-500 dark:text-slate-400">
                        {task.createdAt}
                      </td>

                      {/* 7. 操作 (编辑 / 删除) */}
                      <td className="py-3.5 px-4 text-center">
                        <div className="flex items-center justify-center gap-3">
                          <button
                            onClick={() => openEditModal(task)}
                            className="text-xs font-semibold text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 transition-colors cursor-pointer"
                          >
                            编辑
                          </button>
                          <span className="text-slate-200 dark:text-slate-700">|</span>
                          <button
                            onClick={() => setDeletingTask(task)}
                            className="text-xs font-semibold text-rose-600 hover:text-rose-700 dark:text-rose-400 dark:hover:text-rose-300 transition-colors cursor-pointer"
                          >
                            删除
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-slate-400">
                    <div className="flex flex-col items-center justify-center gap-2">
                      <ClipboardList size={32} className="text-slate-300 dark:text-slate-600" />
                      <p className="text-xs">暂无符合条件的转训任务</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* 七、分页 (Pagination) */}
        <div className="px-5 py-4 border-t border-slate-200 dark:border-slate-700 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <div className="flex items-center gap-3 text-slate-500 dark:text-slate-400">
            <span>共 {totalItems} 条</span>
            <select
              value={pageSize}
              onChange={(e) => {
                setPageSize(Number(e.target.value));
                setCurrentPage(1);
              }}
              className="bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-700 rounded-lg px-2.5 py-1 text-slate-700 dark:text-slate-300 focus:outline-none cursor-pointer"
            >
              <option value={10}>10条/页</option>
              <option value={20}>20条/页</option>
              <option value={50}>50条/页</option>
            </select>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              disabled={currentPage <= 1}
              onClick={() => setCurrentPage(p => Math.max(p - 1, 1))}
              className={`flex items-center gap-1 px-3 py-1.5 rounded-lg border text-xs font-medium transition-all ${
                currentPage <= 1
                  ? 'border-slate-200 dark:border-slate-700 text-slate-300 dark:text-slate-600 cursor-not-allowed'
                  : 'border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 cursor-pointer'
              }`}
            >
              <ChevronLeft size={13} />
              <span>上一页</span>
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
              <button
                key={pageNum}
                onClick={() => setCurrentPage(pageNum)}
                className={`w-8 h-8 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  currentPage === pageNum
                    ? 'bg-blue-600 text-white shadow-sm shadow-blue-500/20'
                    : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 border border-transparent'
                }`}
              >
                {pageNum}
              </button>
            ))}

            <button
              disabled={currentPage >= totalPages}
              onClick={() => setCurrentPage(p => Math.min(p + 1, totalPages))}
              className={`flex items-center gap-1 px-3 py-1.5 rounded-lg border text-xs font-medium transition-all ${
                currentPage >= totalPages
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

      {/* 四、五、六、创建 / 编辑转训任务弹窗 */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="bg-white dark:bg-slate-800 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-2xl w-full max-w-[560px] overflow-hidden flex flex-col">
            
            {/* Modal Header */}
            <div className="px-6 pt-6 pb-5 border-b border-slate-100 dark:border-slate-700/80 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 rounded-2xl shrink-0">
                  {modalMode === 'create' ? <Plus size={20} /> : <Edit3 size={20} />}
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white leading-snug">
                    {modalMode === 'create' ? '创建转训任务' : '编辑转训任务'}
                  </h3>
                  <p className="text-xs text-slate-400 mt-0.5">
                    {modalMode === 'create' ? '设定转训周期与关联质检方案' : '修改转训任务信息与关联质检方案'}
                  </p>
                </div>
              </div>
              <button
                onClick={closeModal}
                className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-700/80 transition-colors cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>

            {/* Modal Form Body */}
            <form onSubmit={handleModalSubmit} className="p-6 space-y-5">
              
              {/* 字段1: 转训主题 (必填) */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1">
                  <span className="text-rose-500">*</span>
                  <span>转训主题</span>
                </label>
                <input
                  type="text"
                  value={formTopic}
                  onChange={(e) => {
                    setFormTopic(e.target.value);
                    if (formErrors.topic) setFormErrors(prev => ({ ...prev, topic: undefined }));
                  }}
                  placeholder="请输入转训主题"
                  className={`w-full bg-slate-50 dark:bg-slate-900/60 border rounded-xl px-3.5 py-2.5 text-xs text-slate-800 dark:text-slate-200 placeholder:text-slate-400 focus:outline-none focus:ring-2 transition-all ${
                    formErrors.topic 
                      ? 'border-rose-400 focus:ring-rose-500/20 focus:border-rose-500' 
                      : 'border-slate-200 dark:border-slate-700 focus:ring-blue-500/30 focus:border-blue-500'
                  }`}
                />
                <p className="text-[11px] text-slate-400 dark:text-slate-500 leading-relaxed">
                  该名称将作为经销商内训师创建转训记录时的选择项。
                </p>
                {formErrors.topic && (
                  <p className="text-xs text-rose-500 font-medium flex items-center gap-1 mt-1">
                    <AlertCircle size={13} />
                    <span>{formErrors.topic}</span>
                  </p>
                )}
              </div>

              {/* 字段2: 转训时间 (必填) */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1">
                  <span className="text-rose-500">*</span>
                  <span>转训时间</span>
                </label>
                <div className="flex items-center gap-2.5">
                  <div className="flex-1">
                    <input
                      type="date"
                      value={formStartDate}
                      onChange={(e) => {
                        setFormStartDate(e.target.value);
                        if (formErrors.date) setFormErrors(prev => ({ ...prev, date: undefined }));
                      }}
                      className={`w-full bg-slate-50 dark:bg-slate-900/60 border rounded-xl px-3 py-2.5 text-xs text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 transition-all ${
                        formErrors.date 
                          ? 'border-rose-400 focus:ring-rose-500/20 focus:border-rose-500' 
                          : 'border-slate-200 dark:border-slate-700 focus:ring-blue-500/30 focus:border-blue-500'
                      }`}
                    />
                  </div>
                  <span className="text-xs text-slate-400 font-bold">至</span>
                  <div className="flex-1">
                    <input
                      type="date"
                      value={formEndDate}
                      onChange={(e) => {
                        setFormEndDate(e.target.value);
                        if (formErrors.date) setFormErrors(prev => ({ ...prev, date: undefined }));
                      }}
                      className={`w-full bg-slate-50 dark:bg-slate-900/60 border rounded-xl px-3 py-2.5 text-xs text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 transition-all ${
                        formErrors.date 
                          ? 'border-rose-400 focus:ring-rose-500/20 focus:border-rose-500' 
                          : 'border-slate-200 dark:border-slate-700 focus:ring-blue-500/30 focus:border-blue-500'
                      }`}
                    />
                  </div>
                </div>
                {formErrors.date && (
                  <p className="text-xs text-rose-500 font-medium flex items-center gap-1 mt-1">
                    <AlertCircle size={13} />
                    <span>{formErrors.date}</span>
                  </p>
                )}
              </div>

              {/* 字段3: 关联转训质检方案 (必填) */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1">
                  <span className="text-rose-500">*</span>
                  <span>关联转训质检方案</span>
                </label>
                <select
                  value={formQcPlan}
                  onChange={(e) => {
                    setFormQcPlan(e.target.value);
                    if (formErrors.qcPlan) setFormErrors(prev => ({ ...prev, qcPlan: undefined }));
                  }}
                  className={`w-full bg-slate-50 dark:bg-slate-900/60 border rounded-xl px-3.5 py-2.5 text-xs text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 transition-all cursor-pointer ${
                    formErrors.qcPlan 
                      ? 'border-rose-400 focus:ring-rose-500/20 focus:border-rose-500' 
                      : 'border-slate-200 dark:border-slate-700 focus:ring-blue-500/30 focus:border-blue-500'
                  }`}
                >
                  <option value="">请选择转训质检方案</option>
                  {PRESET_QC_PLANS.map((plan) => (
                    <option key={plan} value={plan}>
                      {plan}
                    </option>
                  ))}
                </select>
                <p className="text-[11px] text-slate-400 dark:text-slate-500 leading-relaxed">
                  关联后，可基于该质检方案统计本次转训对应要求的实际开口率表现。
                </p>
                {formErrors.qcPlan && (
                  <p className="text-xs text-rose-500 font-medium flex items-center gap-1 mt-1">
                    <AlertCircle size={13} />
                    <span>{formErrors.qcPlan}</span>
                  </p>
                )}
              </div>

              {/* Modal Footer (五、弹窗按钮 右对齐) */}
              <div className="pt-4 border-t border-slate-100 dark:border-slate-700/80 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={closeModal}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 dark:bg-slate-700 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-200 rounded-xl text-xs font-bold transition-colors cursor-pointer"
                >
                  取消
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white rounded-xl text-xs font-bold transition-all shadow-md shadow-blue-500/20 cursor-pointer"
                >
                  {modalMode === 'create' ? '确定' : '保存'}
                </button>
              </div>

            </form>

          </div>
        </div>
      )}

      {/* 删除二次确认弹窗 */}
      {deletingTask && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="bg-white dark:bg-slate-800 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-2xl w-full max-w-[420px] overflow-hidden p-6 space-y-4">
            <div className="flex items-start gap-3.5">
              <div className="p-3 bg-rose-50 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400 rounded-2xl shrink-0">
                <AlertTriangle size={24} />
              </div>
              <div className="space-y-1">
                <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                  确认删除该转训任务吗？
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                  删除后，经销商内训师将无法继续选择该转训任务，请谨慎操作。
                </p>
                <div className="mt-2 p-2.5 bg-slate-50 dark:bg-slate-900/60 rounded-xl border border-slate-200 dark:border-slate-700 text-xs">
                  <div className="font-semibold text-slate-800 dark:text-slate-200 truncate">
                    {deletingTask.topic}
                  </div>
                  <div className="text-[11px] text-slate-400 mt-0.5">
                    方案: {deletingTask.qcPlan}
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setDeletingTask(null)}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 dark:bg-slate-700 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-200 rounded-xl text-xs font-bold transition-colors cursor-pointer"
              >
                取消
              </button>
              <button
                type="button"
                onClick={handleConfirmDelete}
                className="px-4 py-2 bg-rose-600 hover:bg-rose-700 active:bg-rose-800 text-white rounded-xl text-xs font-bold transition-all shadow-md shadow-rose-500/20 cursor-pointer"
              >
                确认删除
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default TrainingTaskManagement;
