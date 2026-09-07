
import React, { useState } from 'react';
import { 
  FileText, 
  ArrowLeft, 
  Calendar, 
  Download, 
  Share2, 
  ChevronRight,
  AlertTriangle,
  TrendingUp,
  Users,
  Car,
  MessageSquare,
  CheckCircle,
  Lightbulb
} from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import AIAssistant from '../components/AIAssistant';

// --- Mock Data ---

interface DailyReport {
  id: string;
  storeName: string;
  date: string;
  traffic: number;
  testDrives: number;
  negotiations: number;
  deals: number;
  exceptions: number;
  issues: {
    type: string;
    description: string;
    severity: 'High' | 'Medium' | 'Low';
  }[];
  suggestions: {
    category: string;
    content: string;
  }[];
}

const reportData: DailyReport[] = [
  { 
    id: 'R-001', 
    storeName: '上海旗舰店', 
    date: '2023-10-26', 
    traffic: 320, 
    testDrives: 45, 
    negotiations: 28, 
    deals: 8, 
    exceptions: 2,
    issues: [
      { type: '接待流程', description: '午高峰时段（12:00-13:00）进店问候率仅为 60%，低于标准。', severity: 'High' },
      { type: '服务态度', description: '检测到 3 起销售顾问与客户争执的负向情绪对话。', severity: 'Medium' },
    ],
    suggestions: [
      { category: '人员调度', content: '建议在午间时段增加 2 名轮值销售，确保接待响应速度。' },
      { category: '专项培训', content: '针对“张新人”等 3 名新员工开展情绪管理与话术合规培训。' }
    ]
  },
  { 
    id: 'R-002', 
    storeName: '北京朝阳店', 
    date: '2023-10-26', 
    traffic: 280, 
    testDrives: 38, 
    negotiations: 22, 
    deals: 5, 
    exceptions: 0,
    issues: [
      { type: '试驾流程', description: '试驾协议签署环节耗时过长，平均超过 15 分钟。', severity: 'Low' }
    ],
    suggestions: [
      { category: '流程优化', content: '推广电子签约系统，缩短试驾前准备时间。' }
    ]
  },
  { 
    id: 'R-003', 
    storeName: '广州天河店', 
    date: '2023-10-26', 
    traffic: 305, 
    testDrives: 42, 
    negotiations: 25, 
    deals: 6, 
    exceptions: 1,
    issues: [
      { type: '需求分析', description: '竞品对比环节缺失率较高，尤其是针对 Model Y 的对比。', severity: 'Medium' }
    ],
    suggestions: [
      { category: '话术更新', content: '下发最新的竞品对比话术卡，并要求每日晨会演练。' }
    ]
  },
];

const trafficTrend = [
  { time: '09:00', value: 20 },
  { time: '11:00', value: 45 },
  { time: '13:00', value: 30 },
  { time: '15:00', value: 80 },
  { time: '17:00', value: 55 },
  { time: '19:00', value: 35 },
];

// --- Components ---

const ManagementDaily: React.FC = () => {
  const [view, setView] = useState<'list' | 'detail'>('list');
  const [selectedReport, setSelectedReport] = useState<DailyReport | null>(null);
  const [dateFilter, setDateFilter] = useState('Daily'); // Daily, Weekly, Monthly

  const handleViewDetail = (report: DailyReport) => {
    setSelectedReport(report);
    setView('detail');
  };

  const handleBack = () => {
    setView('list');
    setSelectedReport(null);
  };

  // --- Detail View ---
  if (view === 'detail' && selectedReport) {
    return (
      <div className="space-y-6 animate-fade-in relative">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button 
              onClick={handleBack}
              className="p-2 hover:bg-gray-100 dark:hover:bg-slate-700 rounded-lg transition-colors"
            >
              <ArrowLeft size={20} className="text-gray-600 dark:text-gray-300" />
            </button>
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">日报详情</h2>
              <p className="text-sm text-gray-500 dark:text-gray-400 flex items-center gap-2 mt-1">
                <Calendar size={14} /> {selectedReport.date} | {selectedReport.storeName}
              </p>
            </div>
          </div>
          <div className="flex gap-3">
             <button className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-lg text-sm font-medium hover:bg-gray-50 dark:hover:bg-slate-700 transition-colors">
                <Share2 size={16} /> 分享
              </button>
              <button className="flex items-center gap-2 px-4 py-2 bg-primary-600 text-white rounded-lg text-sm font-medium hover:bg-primary-700 transition-colors shadow-sm">
                <Download size={16} /> 导出报告
              </button>
          </div>
        </div>

        {/* 1. Overview Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-3 bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-700">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
              <TrendingUp className="text-primary-500" size={20} />
              当天门店运营概览
            </h3>
            
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
              <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl">
                <div className="flex items-center gap-2 text-blue-600 dark:text-blue-300 mb-2">
                  <Users size={18} /> <span className="text-sm font-medium">正常客流</span>
                </div>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{selectedReport.traffic}</p>
              </div>
              <div className="p-4 bg-indigo-50 dark:bg-indigo-900/20 rounded-xl">
                <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-300 mb-2">
                  <Car size={18} /> <span className="text-sm font-medium">试乘试驾</span>
                </div>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{selectedReport.testDrives}</p>
              </div>
              <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-xl">
                <div className="flex items-center gap-2 text-purple-600 dark:text-purple-300 mb-2">
                  <MessageSquare size={18} /> <span className="text-sm font-medium">报价谈判</span>
                </div>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{selectedReport.negotiations}</p>
              </div>
              <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-xl">
                <div className="flex items-center gap-2 text-green-600 dark:text-green-300 mb-2">
                  <CheckCircle size={18} /> <span className="text-sm font-medium">成交</span>
                </div>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{selectedReport.deals}</p>
              </div>
              <div className="p-4 bg-red-50 dark:bg-red-900/20 rounded-xl">
                <div className="flex items-center gap-2 text-red-600 dark:text-red-300 mb-2">
                  <AlertTriangle size={18} /> <span className="text-sm font-medium">异常事件</span>
                </div>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{selectedReport.exceptions}</p>
              </div>
            </div>

            <div className="h-48 w-full bg-gray-50 dark:bg-slate-700/30 rounded-xl p-4">
              <p className="text-xs text-gray-500 mb-2">客流趋势分布</p>
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={trafficTrend}>
                  <defs>
                    <linearGradient id="colorTrafficDetail" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <Tooltip contentStyle={{borderRadius: '8px'}} />
                  <Area type="monotone" dataKey="value" stroke="#3b82f6" fill="url(#colorTrafficDetail)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* 2. Issues & Suggestions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Key Issues */}
          <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-700">
             <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
              <AlertTriangle className="text-orange-500" size={20} />
              AI质检发现的关键问题
            </h3>
            <div className="space-y-4">
              {selectedReport.issues.length > 0 ? (
                selectedReport.issues.map((issue, idx) => (
                  <div key={idx} className="p-4 rounded-xl border border-gray-100 dark:border-slate-700 bg-gray-50 dark:bg-slate-700/30">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-bold text-gray-900 dark:text-white">{issue.type}</h4>
                      <span className={`px-2 py-1 text-xs font-bold rounded ${
                        issue.severity === 'High' ? 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300' :
                        issue.severity === 'Medium' ? 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-300' :
                        'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300'
                      }`}>
                        {issue.severity === 'High' ? '高严重性' : issue.severity === 'Medium' ? '中等风险' : '一般提示'}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                      {issue.description}
                    </p>
                  </div>
                ))
              ) : (
                <div className="text-center py-10 text-gray-500">
                  <CheckCircle className="mx-auto mb-2 text-green-500" size={32} />
                  <p>今日无重大异常问题</p>
                </div>
              )}
            </div>
          </div>

          {/* Suggestions */}
          <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-700">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
              <Lightbulb className="text-yellow-500" size={20} />
              管理建议
            </h3>
            <div className="space-y-4">
              {selectedReport.suggestions.map((sugg, idx) => (
                <div key={idx} className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 flex items-center justify-center font-bold text-sm">
                    {idx + 1}
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 dark:text-white text-sm mb-1">{sugg.category}</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">{sugg.content}</p>
                  </div>
                </div>
              ))}
              <div className="mt-8 pt-6 border-t border-gray-100 dark:border-slate-700">
                <button className="w-full py-2.5 bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400 rounded-lg text-sm font-medium hover:bg-primary-100 dark:hover:bg-primary-900/30 transition-colors">
                  一键下发待办任务
                </button>
              </div>
            </div>
          </div>
        </div>
        
        <AIAssistant context="daily_report_detail" data={selectedReport} />
      </div>
    );
  }

  // --- List View ---
  return (
    <div className="space-y-6 animate-fade-in">
      {/* Title & Filters */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">门店运营管理日报</h2>
        <div className="flex bg-gray-100 dark:bg-slate-700 p-1 rounded-lg self-start md:self-auto">
          {['日报 (Daily)', '周报 (Weekly)', '月报 (Monthly)'].map((filter) => (
            <button
              key={filter}
              onClick={() => setDateFilter(filter.split(' ')[0])}
              className={`px-4 py-2 text-sm font-medium rounded-md transition-all ${
                dateFilter === filter.split(' ')[0]
                  ? 'bg-white dark:bg-slate-600 shadow-sm text-primary-600 dark:text-primary-400'
                  : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>

      {/* Table Card */}
      <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-gray-100 dark:border-slate-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-50 dark:bg-slate-700/50">
              <tr>
                <th className="px-6 py-4 font-semibold text-gray-600 dark:text-gray-300 text-sm">门店名称</th>
                <th className="px-6 py-4 font-semibold text-gray-600 dark:text-gray-300 text-sm">正常客流</th>
                <th className="px-6 py-4 font-semibold text-gray-600 dark:text-gray-300 text-sm">试乘试驾</th>
                <th className="px-6 py-4 font-semibold text-gray-600 dark:text-gray-300 text-sm">报价谈判</th>
                <th className="px-6 py-4 font-semibold text-gray-600 dark:text-gray-300 text-sm">成交</th>
                <th className="px-6 py-4 font-semibold text-gray-600 dark:text-gray-300 text-sm">异常事件</th>
                <th className="px-6 py-4 font-semibold text-gray-600 dark:text-gray-300 text-sm text-right">操作</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-slate-700">
              {reportData.map((report) => (
                <tr key={report.id} className="hover:bg-gray-50 dark:hover:bg-slate-700/30 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center text-indigo-600 dark:text-indigo-400 font-bold text-xs">
                        {report.storeName.charAt(0)}
                      </div>
                      <div>
                        <p className="text-sm font-bold text-gray-900 dark:text-white">{report.storeName}</p>
                        <p className="text-xs text-gray-400">{report.date}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm font-medium text-gray-700 dark:text-gray-300">{report.traffic}</td>
                  <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">{report.testDrives}</td>
                  <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">{report.negotiations}</td>
                  <td className="px-6 py-4 text-sm text-green-600 dark:text-green-400 font-medium">{report.deals}</td>
                  <td className="px-6 py-4">
                    {report.exceptions > 0 ? (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300">
                        {report.exceptions} 起
                      </span>
                    ) : (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300">
                        无异常
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button 
                      onClick={() => handleViewDetail(report)}
                      className="inline-flex items-center gap-1 text-primary-600 hover:text-primary-700 text-sm font-medium transition-colors"
                    >
                      日报详情 <ChevronRight size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ManagementDaily;
