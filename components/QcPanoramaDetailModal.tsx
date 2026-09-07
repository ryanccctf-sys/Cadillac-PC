import React, { useState } from 'react';
import { X, Play, Pause, ChevronRight, Download, Settings, Mic, Volume2 } from 'lucide-react';

export interface QcPanoramaModalProps {
  isOpen: boolean;
  onClose: () => void;
  recordData?: {
    id?: string;
    customerName?: string;
    salesperson?: string;
    storeName?: string;
    time?: string;
    durationMins?: number;
    executionScore?: number;
    businessType?: string;
    carModel?: string;
  } | null;
}

export const QcPanoramaDetailModal: React.FC<QcPanoramaModalProps> = ({
  isOpen,
  onClose,
  recordData
}) => {
  if (!isOpen) return null;

  const [isPlaying, setIsPlaying] = useState(false);
  const [activeRightTab, setActiveRightTab] = useState<'details' | 'tags' | 'summary' | 'analysis'>('tags');
  const [isRoleSwapped, setIsRoleSwapped] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState('1X');

  const rawCustomerName = recordData?.customerName || '王先生';
  const customerName = rawCustomerName.replace(/\s*\([^)]*\)/g, '').replace(/\s*（[^）]*）/g, '');
  const salesperson = recordData?.salesperson || '张伟';
  const storeName = recordData?.storeName || '苏州宝马';
  const startTime = recordData?.time || '2026-08-13 10:00';
  const durationStr = recordData?.durationMins ? `${recordData.durationMins}分10秒` : '25分10秒';
  const traceCode = recordData?.id?.startsWith('QC') ? recordData.id : `QCREC${recordData?.id || '101'}`;
  const carModelName = recordData?.carModel || '宝马 5系 530Li';

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-xs z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 animate-fade-in overflow-y-auto">
      <div className="bg-white dark:bg-slate-900 rounded-2xl max-w-7xl w-full max-h-[94vh] overflow-y-auto shadow-2xl border border-slate-200 dark:border-slate-800 flex flex-col">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between px-5 py-3 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/80 sticky top-0 z-20">
          <div className="flex flex-wrap items-center gap-3">
            <span className="font-bold text-slate-900 dark:text-white text-base">
              【有效质检】{customerName} - 全景详情
            </span>
            <span className="text-xs font-mono bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-300 px-2.5 py-0.5 rounded-md border border-blue-200/60 dark:border-blue-800/60 font-medium">
              接待编号: {traceCode}
            </span>
          </div>
          <button 
            onClick={onClose}
            className="p-1.5 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-white transition-colors cursor-pointer"
            title="关闭"
          >
            <X size={20} />
          </button>
        </div>

        <div className="p-4 space-y-4 text-xs">
          
          {/* 1. Top Audio Header & Player Control Bar */}
          <div className="bg-slate-50/90 dark:bg-slate-800/50 p-4 rounded-xl border border-slate-200/80 dark:border-slate-700/80 space-y-3">
            {/* Metadata Header */}
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-medium text-slate-600 dark:text-slate-300">场景录音文件:</span>
                  <span className="px-2 py-0.5 bg-blue-600 text-white font-semibold text-[11px] rounded">第1段</span>
                </div>
                <h3 className="font-mono font-bold text-sm text-slate-900 dark:text-slate-100 tracking-tight">
                  20260726171700_SJ17410012_20260726172600
                </h3>
                <p className="text-slate-500 dark:text-slate-400 text-[11px] mt-0.5">
                  员工: <span className="font-medium text-slate-800 dark:text-slate-200">{salesperson}</span> &nbsp;|&nbsp; 门店: <span className="font-medium text-slate-800 dark:text-slate-200">{storeName}</span>
                </p>
              </div>

              {/* Timers on right */}
              <div className="flex items-center gap-6 text-[11px]">
                <div>
                  <span className="font-bold text-base text-slate-900 dark:text-white block font-mono">{durationStr}</span>
                  <span className="text-emerald-600 dark:text-emerald-400 flex items-center gap-1 font-medium">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block"></span> 语音时长
                  </span>
                </div>
                <div className="border-l border-slate-200 dark:border-slate-700 pl-4">
                  <span className="font-mono font-bold text-slate-800 dark:text-slate-200 block">{startTime}</span>
                  <span className="text-blue-600 dark:text-blue-400 flex items-center gap-1 font-medium">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-500 inline-block"></span> 开始时间
                  </span>
                </div>
                <div className="border-l border-slate-200 dark:border-slate-700 pl-4">
                  <span className="font-mono font-bold text-slate-800 dark:text-slate-200 block">2026-03-19 11:38:00</span>
                  <span className="text-rose-500 dark:text-rose-400 flex items-center gap-1 font-medium">
                    <span className="w-1.5 h-1.5 rounded-full bg-rose-500 inline-block"></span> 结束时间
                  </span>
                </div>
              </div>
            </div>

            {/* Audio Track Player Bar */}
            <div className="bg-white dark:bg-slate-800 p-2.5 rounded-lg border border-slate-200 dark:border-slate-700 flex items-center gap-3">
              <button 
                onClick={() => setIsPlaying(!isPlaying)}
                className="w-8 h-8 rounded-full border-2 border-emerald-500 flex items-center justify-center text-emerald-600 dark:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-950/40 shrink-0 cursor-pointer transition-all"
              >
                {isPlaying ? <Pause size={14} className="fill-emerald-500 text-emerald-500" /> : <Play size={14} className="ml-0.5 fill-emerald-500 text-emerald-500" />}
              </button>
              
              <button 
                onClick={() => setPlaybackSpeed(playbackSpeed === '1X' ? '1.25X' : playbackSpeed === '1.25X' ? '1.5X' : '1X')}
                className="font-bold text-slate-600 dark:text-slate-300 text-[11px] shrink-0 px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 cursor-pointer"
              >
                {playbackSpeed}
              </button>

              <div className="flex-1 space-y-1">
                <div className="flex justify-between text-[10px] text-slate-400 font-mono">
                  <span>{startTime} 00:00:01</span>
                  <span>说明</span>
                  <span>00:06:19</span>
                </div>
                {/* Progress bar */}
                <div className="h-2.5 bg-slate-100 dark:bg-slate-700 rounded relative overflow-hidden flex items-center px-1 cursor-pointer">
                  <div className={`h-1 bg-blue-500 rounded transition-all ${isPlaying ? 'w-1/2' : 'w-1/3'}`}></div>
                  <div className={`h-full w-0.5 bg-blue-600 absolute transition-all ${isPlaying ? 'left-1/2' : 'left-1/3'}`}></div>
                </div>
              </div>
            </div>
          </div>

          {/* 2. Main 3-Column Content Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
            
            {/* Left Column: 评测结果 */}
            <div className="lg:col-span-3 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden flex flex-col">
              <div className="border-b border-slate-200 dark:border-slate-700 px-3 py-2 bg-slate-50 dark:bg-slate-900/50">
                <span className="text-blue-600 dark:text-blue-400 font-bold border-b-2 border-blue-600 dark:border-blue-400 pb-1.5 inline-block text-xs">
                  评测结果
                </span>
              </div>

              {/* Table Header */}
              <div className="px-3 py-2 bg-slate-50/80 dark:bg-slate-800/80 border-b border-slate-200/80 dark:border-slate-700 flex justify-between font-bold text-slate-600 dark:text-slate-300 text-[11px]">
                <span className="truncate max-w-[120px]">{carModelName}(14分)</span>
                <div className="flex gap-4">
                  <span>命中情况</span>
                  <span>分数</span>
                </div>
              </div>

              {/* Items List */}
              <div className="divide-y divide-slate-100 dark:divide-slate-700/60 text-[11px]">
                <div className="px-3 py-2 flex items-center justify-between text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700/30">
                  <span className="flex items-center gap-1 font-medium">
                    <ChevronRight size={12} className="text-slate-400" /> 展厅接待(2/4)
                  </span>
                  <div className="flex gap-5 font-mono">
                    <span className="text-slate-500">50%</span>
                    <span className="font-bold text-slate-800 dark:text-slate-200">2分</span>
                  </div>
                </div>

                <div className="px-3 py-2 flex items-center justify-between text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700/30">
                  <span className="flex items-center gap-1 font-medium">
                    <ChevronRight size={12} className="text-slate-400" /> 需求分析(5/6)
                  </span>
                  <div className="flex gap-5 font-mono">
                    <span className="text-slate-500">83.33%</span>
                    <span className="font-bold text-slate-800 dark:text-slate-200">5分</span>
                  </div>
                </div>

                <div className="px-3 py-2 flex items-center justify-between text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700/30">
                  <span className="flex items-center gap-1 font-medium">
                    <ChevronRight size={12} className="text-slate-400" /> 邀约入车体验(1/1)
                  </span>
                  <div className="flex gap-5 font-mono">
                    <span className="text-slate-500">100%</span>
                    <span className="font-bold text-slate-800 dark:text-slate-200">1分</span>
                  </div>
                </div>

                <div className="px-3 py-2 flex items-center justify-between text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700/30">
                  <span className="flex items-center gap-1 font-medium">
                    <ChevronRight size={12} className="text-slate-400" /> 主动开口留资(1/1)
                  </span>
                  <div className="flex gap-5 font-mono">
                    <span className="text-slate-500">100%</span>
                    <span className="font-bold text-slate-800 dark:text-slate-200">1分</span>
                  </div>
                </div>

                <div className="px-3 py-2 flex items-center justify-between text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700/30">
                  <span className="flex items-center gap-1 font-medium">
                    <ChevronRight size={12} className="text-slate-400" /> 邀约试驾(1/1)
                  </span>
                  <div className="flex gap-5 font-mono">
                    <span className="text-slate-500">100%</span>
                    <span className="font-bold text-slate-800 dark:text-slate-200">1分</span>
                  </div>
                </div>

                <div className="px-3 py-2 flex items-center justify-between text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700/30">
                  <span className="flex items-center gap-1 font-medium">
                    <ChevronRight size={12} className="text-slate-400" /> 购车款项(1/1)
                  </span>
                  <div className="flex gap-5 font-mono">
                    <span className="text-slate-500">100%</span>
                    <span className="font-bold text-slate-800 dark:text-slate-200">1分</span>
                  </div>
                </div>

                <div className="px-3 py-2 flex items-center justify-between text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700/30">
                  <span className="flex items-center gap-1 font-medium">
                    <ChevronRight size={12} className="text-slate-400" /> 产品介绍(3/5)
                  </span>
                  <div className="flex gap-5 font-mono">
                    <span className="text-slate-500">60%</span>
                    <span className="font-bold text-slate-800 dark:text-slate-200">3分</span>
                  </div>
                </div>
              </div>

              {/* Bottom Audio Info Box */}
              <div className="mt-auto p-3 bg-slate-50 dark:bg-slate-900/50 border-t border-slate-200 dark:border-slate-700">
                <span className="font-bold text-slate-800 dark:text-slate-200 block mb-1">{carModelName}录音详情</span>
                <div className="p-2 bg-white dark:bg-slate-800 rounded border border-slate-200 dark:border-slate-700 text-[11px] text-slate-600 dark:text-slate-300 font-mono">
                  第1段: 2026-03-19 11:02:15 – 2026-03-19 11:38:00
                </div>
              </div>
            </div>

            {/* Middle Column: 通话记录 */}
            <div className="lg:col-span-5 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 flex flex-col">
              {/* Header Toolbar */}
              <div className="p-3 border-b border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/50 flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-slate-900 dark:text-white text-sm">通话记录</span>
                  <label className="flex items-center gap-1 text-slate-500 text-[11px] cursor-pointer select-none">
                    <input 
                      type="checkbox" 
                      checked={isRoleSwapped}
                      onChange={(e) => setIsRoleSwapped(e.target.checked)}
                      className="rounded text-blue-600 focus:ring-0" 
                    /> 切换角色
                  </label>
                </div>
                <div className="flex items-center gap-2 text-slate-500 text-[11px]">
                  <span className="px-2 py-0.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded text-slate-600 dark:text-slate-300">在对话中... 0</span>
                  <button className="text-blue-600 dark:text-blue-400 hover:underline cursor-pointer">文本下载</button>
                  <button className="text-blue-600 dark:text-blue-400 hover:underline cursor-pointer">添加词库</button>
                </div>
              </div>

              {/* Chat Messages List */}
              <div className="p-3 space-y-3.5 overflow-y-auto max-h-[420px] bg-slate-50/50 dark:bg-slate-900/30">
                
                {/* Message 1: Customer */}
                <div className="flex items-start gap-2">
                  <div className="w-7 h-7 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center text-[10px] font-bold shrink-0 shadow-2xs">
                    {isRoleSwapped ? '销' : '客'}
                  </div>
                  <div className="space-y-1 max-w-[85%]">
                    <div className="text-[10px] text-slate-400 flex items-center gap-1">
                      <span className="text-blue-600 font-medium">播放 📶</span>
                      <span>切换 ➔ 编辑 ✏️</span>
                      <span className="font-bold text-slate-700 dark:text-slate-300">{isRoleSwapped ? '员工' : '客户'}</span>
                      <span className="font-mono">2026-07-26 17:19:42</span>
                    </div>
                    <div className="p-2.5 bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 text-xs shadow-2xs leading-relaxed">
                      啊，对。
                    </div>
                  </div>
                </div>

                {/* Message 2: Staff */}
                <div className="flex items-start gap-2 justify-end">
                  <div className="space-y-1 max-w-[85%] text-right">
                    <div className="text-[10px] text-slate-400 flex items-center gap-1 justify-end">
                      <span className="font-mono">2026-07-26 17:19:43</span>
                      <span className="font-bold text-emerald-600 dark:text-emerald-400">{isRoleSwapped ? '客户' : '员工'}</span>
                      <span>✏️ 编辑 ⬅️ 切换 📶 播放</span>
                    </div>
                    <div className="p-2.5 bg-emerald-600 dark:bg-emerald-700 text-white rounded-lg text-xs text-left shadow-2xs leading-relaxed">
                      行，先给一下我的名片，我是店里的销售顾问{salesperson}。
                    </div>
                  </div>
                  <div className="w-7 h-7 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center text-[10px] font-bold shrink-0 shadow-2xs">
                    {isRoleSwapped ? '客' : '销'}
                  </div>
                </div>

                {/* Message 3: Staff */}
                <div className="flex items-start gap-2 justify-end">
                  <div className="space-y-1 max-w-[85%] text-right">
                    <div className="text-[10px] text-slate-400 flex items-center gap-1 justify-end">
                      <span className="font-mono">2026-07-26 17:19:47</span>
                      <span className="font-bold text-emerald-600 dark:text-emerald-400">{isRoleSwapped ? '客户' : '员工'}</span>
                    </div>
                    <div className="p-2.5 bg-emerald-600 dark:bg-emerald-700 text-white rounded-lg text-xs text-left shadow-2xs leading-relaxed">
                      {customerName}您怎么称呼？
                    </div>
                  </div>
                  <div className="w-7 h-7 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center text-[10px] font-bold shrink-0 shadow-2xs">
                    {isRoleSwapped ? '客' : '销'}
                  </div>
                </div>

                {/* Message 4: Customer */}
                <div className="flex items-start gap-2">
                  <div className="w-7 h-7 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center text-[10px] font-bold shrink-0 shadow-2xs">
                    {isRoleSwapped ? '销' : '客'}
                  </div>
                  <div className="space-y-1 max-w-[85%]">
                    <div className="text-[10px] text-slate-400 flex items-center gap-1">
                      <span className="font-bold text-slate-700 dark:text-slate-300">{isRoleSwapped ? '员工' : '客户'}</span>
                      <span className="font-mono">2026-07-26 17:19:48</span>
                    </div>
                    <div className="p-2.5 bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 text-xs shadow-2xs leading-relaxed">
                      姓{customerName.slice(0, 1)}。
                    </div>
                  </div>
                </div>

                {/* Message 5: Staff */}
                <div className="flex items-start gap-2 justify-end">
                  <div className="space-y-1 max-w-[85%] text-right">
                    <div className="text-[10px] text-slate-400 flex items-center gap-1 justify-end">
                      <span className="font-mono">2026-07-26 17:19:49</span>
                      <span className="font-bold text-emerald-600 dark:text-emerald-400">{isRoleSwapped ? '客户' : '员工'}</span>
                    </div>
                    <div className="p-2.5 bg-emerald-600 dark:bg-emerald-700 text-white rounded-lg text-xs text-left shadow-2xs leading-relaxed">
                      来，咱行，{customerName}来咱休息区稍坐，了解一下{carModelName}。
                    </div>
                  </div>
                  <div className="w-7 h-7 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center text-[10px] font-bold shrink-0 shadow-2xs">
                    {isRoleSwapped ? '客' : '销'}
                  </div>
                </div>

                {/* Message 6: Staff */}
                <div className="flex items-start gap-2 justify-end">
                  <div className="space-y-1 max-w-[85%] text-right">
                    <div className="text-[10px] text-slate-400 flex items-center gap-1 justify-end">
                      <span className="font-mono">2026-07-26 17:19:52</span>
                      <span className="font-bold text-emerald-600 dark:text-emerald-400">{isRoleSwapped ? '客户' : '员工'}</span>
                    </div>
                    <div className="p-2.5 bg-emerald-600 dark:bg-emerald-700 text-white rounded-lg text-xs text-left shadow-2xs leading-relaxed">
                      天气炎热，看咱来点什么饮品？
                    </div>
                  </div>
                  <div className="w-7 h-7 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center text-[10px] font-bold shrink-0 shadow-2xs">
                    {isRoleSwapped ? '客' : '销'}
                  </div>
                </div>

              </div>
            </div>

            {/* Right Column: 会话详情 / 标签 / 会话总结 / 销售分析 */}
            <div className="lg:col-span-4 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 flex flex-col overflow-hidden">
              
              {/* Tab Header Bar */}
              <div className="border-b border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/50 px-3 py-2 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <button 
                    onClick={() => setActiveRightTab('details')}
                    className={`pb-1 text-xs font-bold transition-colors cursor-pointer ${activeRightTab === 'details' ? 'text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400' : 'text-slate-500 hover:text-slate-800 dark:text-slate-400'}`}
                  >
                    会话详情
                  </button>
                  <button 
                    onClick={() => setActiveRightTab('tags')}
                    className={`pb-1 text-xs font-bold transition-colors cursor-pointer ${activeRightTab === 'tags' ? 'text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400' : 'text-slate-500 hover:text-slate-800 dark:text-slate-400'}`}
                  >
                    标签
                  </button>
                  <button 
                    onClick={() => setActiveRightTab('summary')}
                    className={`pb-1 text-xs font-bold transition-colors cursor-pointer ${activeRightTab === 'summary' ? 'text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400' : 'text-slate-500 hover:text-slate-800 dark:text-slate-400'}`}
                  >
                    会话总结
                  </button>
                  <button 
                    onClick={() => setActiveRightTab('analysis')}
                    className={`pb-1 text-xs font-bold transition-colors cursor-pointer ${activeRightTab === 'analysis' ? 'text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400' : 'text-slate-500 hover:text-slate-800 dark:text-slate-400'}`}
                  >
                    销售分析
                  </button>
                </div>
              </div>

              {/* Action Toolbar */}
              <div className="px-3 py-2 border-b border-slate-100 dark:border-slate-700/80 flex items-center justify-between text-[11px] bg-slate-50/50 dark:bg-slate-800/50">
                <button className="text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1 cursor-pointer">
                  <Download size={12} /> 下载标签清单
                </button>
                <button className="text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1 cursor-pointer">
                  <Settings size={12} /> 标签显示配置
                </button>
              </div>

              {/* Tab Content Box */}
              <div className="p-3 flex-1 overflow-y-auto max-h-[420px]">
                
                {/* 1. TAGS TAB */}
                {activeRightTab === 'tags' && (
                  <div className="space-y-2.5">
                    <div className="text-[11px] font-bold text-slate-700 dark:text-slate-300 pb-1 border-b border-slate-100 dark:border-slate-700/60">
                      客户意向判定与客户标签 / 新客户意向判定和客户标签
                    </div>

                    <div className="space-y-2">
                      <div className="p-2.5 rounded-lg bg-blue-600 text-white font-medium text-xs shadow-2xs">
                        客户基础信息 - 身份(个人)
                      </div>

                      <div className="p-2.5 rounded-lg bg-teal-600 text-white font-medium text-xs shadow-2xs">
                        客户基础信息 - 购车阶段(了解阶段)
                      </div>

                      <div className="p-2.5 rounded-lg bg-rose-600 text-white font-medium text-xs shadow-2xs">
                        客户基础信息 - 客户类型(未提及)
                      </div>

                      <div className="p-2.5 rounded-lg bg-amber-600 text-white font-medium text-xs shadow-2xs">
                        意向相关信息 - 意向车型({carModelName})
                      </div>

                      <div className="p-2.5 rounded-lg bg-amber-500 text-white font-medium text-xs shadow-2xs">
                        意向相关信息 - 意向配置(未提及)
                      </div>

                      <div className="p-2.5 rounded-lg bg-emerald-600 text-white font-medium text-xs shadow-2xs">
                        意向相关信息 - 意向动力(未提及)
                      </div>

                      <div className="p-2.5 rounded-lg bg-purple-600 text-white font-medium text-xs shadow-2xs">
                        意向相关信息 - 意向外观/内饰(未提及)
                      </div>

                      <div className="p-2.5 rounded-lg bg-pink-600 text-white font-medium text-xs shadow-2xs">
                        客户核心需求 - 痛点(产品使用)
                      </div>

                      <div className="p-2.5 rounded-lg bg-amber-700 text-white font-medium text-xs shadow-2xs">
                        客户核心需求 - 关注点(空间,油耗,价格)
                      </div>

                      <div className="p-2.5 rounded-lg bg-lime-600 text-white font-medium text-xs shadow-2xs">
                        客户核心需求 - 用途(家用)
                      </div>
                    </div>
                  </div>
                )}

                {/* 2. SUMMARY TAB */}
                {activeRightTab === 'summary' && (
                  <div className="space-y-3 text-xs text-slate-700 dark:text-slate-300">
                    <div className="p-3 bg-slate-50 dark:bg-slate-900/50 rounded-xl border border-slate-200/80 dark:border-slate-700 space-y-1.5">
                      <div className="font-bold text-slate-900 dark:text-white">【会话核心要点】</div>
                      <p className="leading-relaxed">客户对{carModelName}空间及家用实用性表现出浓厚兴趣，咨询了购车保障套餐与无忧延保细节，销售顾问完整完成了标准接待流程与产品介绍。</p>
                    </div>

                    <div className="p-3 bg-slate-50 dark:bg-slate-900/50 rounded-xl border border-slate-200/80 dark:border-slate-700 space-y-1.5">
                      <div className="font-bold text-slate-900 dark:text-white">【后续跟进建议】</div>
                      <p className="leading-relaxed">1. 3天内跟进发送延保保障服务对比表；<br/>2. 邀约客户本周末带家人试乘试驾重点体验后排空间。</p>
                    </div>
                  </div>
                )}

                {/* 3. ANALYSIS TAB */}
                {activeRightTab === 'analysis' && (
                  <div className="space-y-3 text-xs text-slate-700 dark:text-slate-300">
                    <div className="p-3 bg-slate-50 dark:bg-slate-900/50 rounded-xl border border-slate-200/80 dark:border-slate-700 space-y-2">
                      <div className="font-bold text-slate-900 dark:text-white">销售能力画像</div>
                      <div className="grid grid-cols-2 gap-2 text-center">
                        <div className="p-2 bg-white dark:bg-slate-800 rounded border border-slate-200/60 dark:border-slate-700">
                          <span className="text-[10px] text-slate-500 block">开场热情度</span>
                          <span className="font-bold font-mono text-emerald-600">95分</span>
                        </div>
                        <div className="p-2 bg-white dark:bg-slate-800 rounded border border-slate-200/60 dark:border-slate-700">
                          <span className="text-[10px] text-slate-500 block">异议化解力</span>
                          <span className="font-bold font-mono text-blue-600">88分</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* 4. DETAILS TAB */}
                {activeRightTab === 'details' && (
                  <div className="space-y-2 text-xs text-slate-600 dark:text-slate-300 font-mono">
                    <div className="flex justify-between py-1 border-b border-slate-100 dark:border-slate-700/60">
                      <span className="text-slate-400">设备ID:</span>
                      <span>DEV-SJ17410012</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-slate-100 dark:border-slate-700/60">
                      <span className="text-slate-400">音频采样率:</span>
                      <span>16kHz / 16bit</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-slate-100 dark:border-slate-700/60">
                      <span className="text-slate-400">双工音轨降噪:</span>
                      <span className="text-emerald-600 dark:text-emerald-400 font-bold">已开启</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-slate-100 dark:border-slate-700/60">
                      <span className="text-slate-400">识别准确率:</span>
                      <span>98.6%</span>
                    </div>
                  </div>
                )}

              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
