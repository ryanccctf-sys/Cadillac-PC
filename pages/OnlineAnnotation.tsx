
import React, { useState } from 'react';
import { 
  Mic, 
  MessageSquare, 
  CheckCircle, 
  Database, 
  Play, 
  Pause, 
  SkipForward, 
  Save, 
  Flag, 
  Tag, 
  Edit3, 
  RotateCcw,
  Search,
  Filter,
  Check,
  X,
  Volume2,
  PenTool,
  BrainCircuit,
  Target
} from 'lucide-react';

// --- Mock Data ---

const MOCK_ASR_TASKS = [
  { id: 1, audio: 'audio_001.mp3', duration: '00:12', asrText: '客户说他对价格比较敏感希望能有更多优惠', confidence: 0.85 },
  { id: 2, audio: 'audio_002.mp3', duration: '00:08', asrText: '这个车的续航里程是多少公里', confidence: 0.92 },
  { id: 3, audio: 'audio_003.mp3', duration: '00:15', asrText: '我想预约下周六的试驾活动还有名额吗', confidence: 0.88 },
];

const MOCK_SEMANTIC_TASKS = [
  { 
    id: 101, 
    text: '我想看看有没有20万左右的SUV，最好是混动的。', 
    entities: [
      { start: 7, end: 12, label: '预算', text: '20万左右' },
      { start: 13, end: 16, label: '车型', text: 'SUV' },
      { start: 20, end: 22, label: '动力', text: '混动' }
    ],
    intent: '购车咨询'
  },
  { 
    id: 102, 
    text: 'Model 3现在的提车周期要多久？', 
    entities: [
      { start: 0, end: 7, label: '车系', text: 'Model 3' },
    ],
    intent: '询问交付'
  }
];

const MOCK_CHECKPOINT_TASKS = [
  {
    id: 201,
    dialog: [
      { role: 'advisor', text: '您好，欢迎光临！请问有预约吗？' },
      { role: 'customer', text: '没有，随便看看。' },
      { role: 'advisor', text: '好的，这边请。我是销售顾问小李，请问您怎么称呼？' },
      { role: 'customer', text: '我姓张。' },
      { role: 'advisor', text: '张先生您好，您今天是想看轿车还是SUV呢？' }
    ],
    checkpoints: [
      { id: 'cp1', name: '进店问候', status: 'pass' },
      { id: 'cp2', name: '自我介绍', status: 'pass' },
      { id: 'cp3', name: '询问称呼', status: 'pass' },
      { id: 'cp4', name: '需求探询', status: 'pass' },
      { id: 'cp5', name: '主动留资', status: 'fail' },
    ]
  }
];

const MOCK_CORPUS = [
  { id: 'D-1001', type: 'ASR', content: '我想预约试驾', label: '修正: 我想预约试驾', annotator: 'Admin', time: '2023-10-26 10:00' },
  { id: 'D-1002', type: '语义', content: '这车太贵了', label: 'Intent: 价格抗拒', annotator: 'User01', time: '2023-10-26 09:45' },
  { id: 'D-1003', type: '质检', content: '会话ID: S-9982', label: '评分: 95', annotator: 'Admin', time: '2023-10-25 16:20' },
];

// --- Components ---

const ASRAnnotation: React.FC = () => {
  const [currentTaskIndex, setCurrentTaskIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [editText, setEditText] = useState(MOCK_ASR_TASKS[0].asrText);
  
  const currentTask = MOCK_ASR_TASKS[currentTaskIndex];

  const handleNext = () => {
    if (currentTaskIndex < MOCK_ASR_TASKS.length - 1) {
      const nextIndex = currentTaskIndex + 1;
      setCurrentTaskIndex(nextIndex);
      setEditText(MOCK_ASR_TASKS[nextIndex].asrText);
      setIsPlaying(false);
    } else {
      alert("所有任务已完成！");
    }
  };

  return (
    <div className="flex flex-col h-full gap-6">
      {/* Progress & Toolbar */}
      <div className="flex justify-between items-center bg-white dark:bg-slate-800 p-4 rounded-xl border border-gray-100 dark:border-slate-700 shadow-sm">
        <div className="flex items-center gap-4">
          <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg text-blue-600 dark:text-blue-400">
            <Mic size={20} />
          </div>
          <div>
            <h3 className="font-bold text-gray-900 dark:text-white">ASR 语音转写校对</h3>
            <p className="text-xs text-gray-500">任务进度: {currentTaskIndex + 1} / {MOCK_ASR_TASKS.length}</p>
          </div>
        </div>
        <div className="flex gap-2">
          <button className="px-3 py-1.5 text-sm font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-700 rounded-lg transition-colors flex items-center gap-2">
            <Flag size={16} /> 标记无效音频
          </button>
          <button onClick={handleNext} className="px-3 py-1.5 text-sm font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-700 rounded-lg transition-colors flex items-center gap-2">
            <SkipForward size={16} /> 跳过
          </button>
        </div>
      </div>

      {/* Main Workspace */}
      <div className="flex-1 bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-700 p-8 flex flex-col items-center justify-center gap-8">
        
        {/* Audio Visualizer Placeholder */}
        <div className="w-full max-w-3xl h-32 bg-gray-50 dark:bg-slate-900 rounded-xl border border-gray-200 dark:border-slate-700 relative overflow-hidden flex items-center justify-center">
           <div className="absolute inset-0 flex items-center justify-center gap-1 opacity-50">
              {Array.from({length: 60}).map((_, i) => (
                <div 
                  key={i} 
                  className={`w-1.5 rounded-full bg-primary-500 transition-all duration-300 ${isPlaying ? 'animate-pulse' : ''}`}
                  style={{ height: `${20 + Math.random() * 60}%` }}
                ></div>
              ))}
           </div>
           
           <button 
             onClick={() => setIsPlaying(!isPlaying)}
             className="z-10 w-12 h-12 bg-primary-600 hover:bg-primary-700 text-white rounded-full flex items-center justify-center shadow-lg transition-transform hover:scale-105"
           >
             {isPlaying ? <Pause size={24} fill="currentColor" /> : <Play size={24} fill="currentColor" className="ml-1" />}
           </button>
        </div>

        {/* Text Editor */}
        <div className="w-full max-w-3xl space-y-4">
           <div className="flex justify-between items-end">
              <label className="text-sm font-bold text-gray-700 dark:text-gray-300 flex items-center gap-2">
                 <Edit3 size={16} /> 校对文本
              </label>
              <span className="text-xs text-gray-400">置信度: {(currentTask.confidence * 100).toFixed(0)}%</span>
           </div>
           <textarea 
             value={editText}
             onChange={(e) => setEditText(e.target.value)}
             className="w-full p-4 text-lg leading-relaxed bg-gray-50 dark:bg-slate-700 border border-gray-200 dark:border-slate-600 rounded-xl focus:ring-2 focus:ring-primary-500 outline-none dark:text-white resize-none shadow-inner"
             rows={4}
           />
        </div>

        {/* Submit Action */}
        <div className="w-full max-w-3xl flex justify-end">
           <button 
             onClick={handleNext}
             className="px-8 py-3 bg-green-600 hover:bg-green-700 text-white rounded-xl font-bold shadow-md hover:shadow-lg transition-all flex items-center gap-2"
           >
             <CheckCircle size={20} /> 提交并下一条 (Enter)
           </button>
        </div>

      </div>
    </div>
  );
};

const SemanticAnnotation: React.FC = () => {
  const [currentTaskIndex, setCurrentTaskIndex] = useState(0);
  const currentTask = MOCK_SEMANTIC_TASKS[currentTaskIndex];

  const handleNext = () => {
    if (currentTaskIndex < MOCK_SEMANTIC_TASKS.length - 1) {
      setCurrentTaskIndex(currentTaskIndex + 1);
    } else {
      alert("本批次标注已完成");
    }
  };

  return (
    <div className="flex h-full gap-6">
      {/* Left: Task Area */}
      <div className="flex-1 flex flex-col gap-6">
         <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-700 flex-1 flex flex-col">
            <div className="flex justify-between items-center mb-6">
               <h3 className="font-bold text-gray-900 dark:text-white flex items-center gap-2">
                  <BrainCircuit className="text-purple-500" /> 语义标签训练
               </h3>
               <span className="text-sm text-gray-500">ID: {currentTask.id}</span>
            </div>

            {/* Text Display Area */}
            <div className="flex-1 flex flex-col justify-center items-center p-8 bg-gray-50 dark:bg-slate-900/50 rounded-xl border border-gray-200 dark:border-slate-700 border-dashed">
               <div className="text-2xl font-medium text-gray-800 dark:text-gray-200 leading-loose text-center max-w-2xl">
                  {currentTask.text.split('').map((char, idx) => {
                     // Check if this char is inside an entity
                     const entity = currentTask.entities.find(e => idx >= e.start && idx < e.end);
                     
                     if (entity) {
                        // Only render the start of the entity with a badge
                        if (idx === entity.start) {
                           return (
                              <span key={idx} className="relative mx-1">
                                 <span className="bg-blue-100 dark:bg-blue-900/40 text-blue-800 dark:text-blue-300 px-1 rounded border-b-2 border-blue-500 pb-0.5">
                                    {entity.text}
                                 </span>
                                 <span className="absolute -top-6 left-1/2 -translate-x-1/2 text-[10px] font-bold bg-blue-600 text-white px-1.5 rounded uppercase shadow-sm">
                                    {entity.label}
                                 </span>
                              </span>
                           );
                        } else if (idx > entity.start && idx < entity.end) {
                           return null; // Skip other chars in entity as we rendered full text
                        }
                     }
                     return <span key={idx}>{char}</span>;
                  })}
               </div>
            </div>

            {/* Intent Selection */}
            <div className="mt-6 p-4 bg-gray-50 dark:bg-slate-700/50 rounded-xl border border-gray-200 dark:border-slate-600">
               <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-3">意图分类 (Intent)</label>
               <div className="flex gap-2 flex-wrap">
                  {['购车咨询', '询问交付', '售后保养', '投诉建议', '闲聊', '其他'].map(intent => (
                     <button 
                        key={intent}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors border ${
                           currentTask.intent === intent 
                             ? 'bg-purple-600 text-white border-purple-600' 
                             : 'bg-white dark:bg-slate-800 text-gray-600 dark:text-gray-300 border-gray-200 dark:border-slate-600 hover:border-purple-400'
                        }`}
                     >
                        {intent}
                     </button>
                  ))}
               </div>
            </div>

            <div className="mt-6 flex justify-end gap-3">
               <button className="px-4 py-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-700 rounded-lg">重置</button>
               <button onClick={handleNext} className="px-6 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-bold shadow-md">
                  保存 (S)
               </button>
            </div>
         </div>
      </div>

      {/* Right: Sidebar Helper */}
      <div className="w-80 bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-700 p-4 flex flex-col">
         <h4 className="font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
            <Tag size={16} /> 可用实体标签
         </h4>
         <div className="flex-1 overflow-y-auto space-y-2">
            {[
               { name: '车型', color: 'bg-blue-500' },
               { name: '预算', color: 'bg-green-500' },
               { name: '动力', color: 'bg-orange-500' },
               { name: '颜色', color: 'bg-pink-500' },
               { name: '配置', color: 'bg-cyan-500' },
               { name: '竞品', color: 'bg-red-500' },
               { name: '地点', color: 'bg-indigo-500' },
               { name: '时间', color: 'bg-yellow-500' },
            ].map(tag => (
               <div key={tag.name} className="flex items-center justify-between p-2 hover:bg-gray-50 dark:hover:bg-slate-700 rounded-lg cursor-pointer group">
                  <div className="flex items-center gap-2">
                     <span className={`w-3 h-3 rounded-full ${tag.color}`}></span>
                     <span className="text-sm text-gray-700 dark:text-gray-200">{tag.name}</span>
                  </div>
                  <span className="text-xs text-gray-400 opacity-0 group-hover:opacity-100">快捷键 {tag.name[0]}</span>
               </div>
            ))}
         </div>
      </div>
    </div>
  );
};

const CheckpointAnnotation: React.FC = () => {
  const [currentTaskIndex, setCurrentTaskIndex] = useState(0);
  const currentTask = MOCK_CHECKPOINT_TASKS[currentTaskIndex];

  return (
    <div className="flex h-full gap-6">
       {/* Conversation View */}
       <div className="flex-1 bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-700 flex flex-col overflow-hidden">
          <div className="p-4 border-b border-gray-100 dark:border-slate-700 bg-gray-50 dark:bg-slate-900/50 flex justify-between items-center">
             <h3 className="font-bold text-gray-900 dark:text-white flex items-center gap-2">
                <Target className="text-green-500" /> 语义点检测 (SOP质检)
             </h3>
             <span className="text-xs text-gray-500">会话ID: {currentTask.id}</span>
          </div>
          <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-gray-50/50 dark:bg-slate-900/20">
             {currentTask.dialog.map((msg, i) => (
                <div key={i} className={`flex gap-3 ${msg.role === 'advisor' ? 'flex-row-reverse' : ''}`}>
                   <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${
                      msg.role === 'advisor' ? 'bg-blue-100 text-blue-600' : 'bg-gray-200 text-gray-600'
                   }`}>
                      {msg.role === 'advisor' ? '顾' : '客'}
                   </div>
                   <div className={`p-3 rounded-xl text-sm max-w-[80%] ${
                      msg.role === 'advisor' 
                        ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-900 dark:text-blue-100 rounded-tr-none' 
                        : 'bg-white dark:bg-slate-700 text-gray-800 dark:text-gray-200 rounded-tl-none shadow-sm'
                   }`}>
                      {msg.text}
                   </div>
                </div>
             ))}
          </div>
       </div>

       {/* Checklist Sidebar */}
       <div className="w-96 bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-700 p-6 flex flex-col">
          <h4 className="font-bold text-gray-900 dark:text-white mb-6">关键动作检核表</h4>
          <div className="flex-1 overflow-y-auto space-y-4">
             {currentTask.checkpoints.map((cp) => (
                <div key={cp.id} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-slate-700/30 rounded-lg border border-gray-100 dark:border-slate-600">
                   <span className="text-sm font-medium text-gray-700 dark:text-gray-200">{cp.name}</span>
                   <div className="flex gap-2">
                      <button className={`p-1.5 rounded-md transition-colors ${cp.status === 'pass' ? 'bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400' : 'hover:bg-gray-200 dark:hover:bg-slate-600 text-gray-400'}`}>
                         <Check size={16} />
                      </button>
                      <button className={`p-1.5 rounded-md transition-colors ${cp.status === 'fail' ? 'bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400' : 'hover:bg-gray-200 dark:hover:bg-slate-600 text-gray-400'}`}>
                         <X size={16} />
                      </button>
                   </div>
                </div>
             ))}
          </div>
          <div className="mt-6 pt-4 border-t border-gray-100 dark:border-slate-700">
             <button className="w-full py-3 bg-green-600 hover:bg-green-700 text-white rounded-xl font-bold shadow-md transition-colors">
                提交质检结果
             </button>
          </div>
       </div>
    </div>
  );
};

const CorpusViewer: React.FC = () => {
  return (
    <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-700 overflow-hidden flex flex-col h-full">
       {/* Filter Bar */}
       <div className="p-4 border-b border-gray-100 dark:border-slate-700 flex gap-4 items-center bg-gray-50 dark:bg-slate-900/50">
          <div className="relative">
             <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
             <input type="text" placeholder="搜索语料内容..." className="pl-9 pr-4 py-2 bg-white dark:bg-slate-700 border border-gray-200 dark:border-slate-600 rounded-lg text-sm w-64 outline-none focus:ring-2 focus:ring-primary-500" />
          </div>
          <select className="px-3 py-2 bg-white dark:bg-slate-700 border border-gray-200 dark:border-slate-600 rounded-lg text-sm outline-none cursor-pointer">
             <option>全部类型</option>
             <option>ASR 转写</option>
             <option>语义标注</option>
             <option>质检结果</option>
          </select>
          <div className="flex-1"></div>
          <button className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-slate-700 border border-gray-200 dark:border-slate-600 rounded-lg text-sm font-medium hover:bg-gray-50 dark:hover:bg-slate-600">
             <Filter size={14} /> 筛选
          </button>
       </div>

       {/* Table */}
       <div className="flex-1 overflow-auto">
          <table className="w-full text-left">
             <thead className="bg-gray-50 dark:bg-slate-700/50 text-xs text-gray-500 font-bold uppercase sticky top-0 z-10">
                <tr>
                   <th className="px-6 py-4">ID</th>
                   <th className="px-6 py-4">类型</th>
                   <th className="px-6 py-4">原始内容</th>
                   <th className="px-6 py-4">标注结果</th>
                   <th className="px-6 py-4">标注人</th>
                   <th className="px-6 py-4">时间</th>
                   <th className="px-6 py-4">操作</th>
                </tr>
             </thead>
             <tbody className="divide-y divide-gray-100 dark:divide-slate-700 text-sm">
                {MOCK_CORPUS.map((item) => (
                   <tr key={item.id} className="hover:bg-gray-50 dark:hover:bg-slate-700/30 transition-colors">
                      <td className="px-6 py-4 font-mono text-gray-500">{item.id}</td>
                      <td className="px-6 py-4">
                         <span className={`px-2 py-1 rounded text-xs font-medium ${
                            item.type === 'ASR' ? 'bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400' :
                            item.type === '语义' ? 'bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400' :
                            'bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400'
                         }`}>
                            {item.type}
                         </span>
                      </td>
                      <td className="px-6 py-4 text-gray-900 dark:text-white max-w-xs truncate" title={item.content}>{item.content}</td>
                      <td className="px-6 py-4 text-gray-600 dark:text-gray-300 max-w-xs truncate" title={item.label}>{item.label}</td>
                      <td className="px-6 py-4 text-gray-500">{item.annotator}</td>
                      <td className="px-6 py-4 text-gray-400 text-xs font-mono">{item.time}</td>
                      <td className="px-6 py-4">
                         <button className="text-primary-600 hover:underline text-xs">查看/编辑</button>
                      </td>
                   </tr>
                ))}
             </tbody>
          </table>
       </div>
    </div>
  );
};

// --- Main Page ---

const OnlineAnnotation: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'asr' | 'semantic' | 'checkpoint' | 'corpus'>('asr');

  return (
    <div className="h-[calc(100vh-6rem)] flex flex-col animate-fade-in relative">
      {/* Page Header */}
      <div className="flex justify-between items-end mb-6">
         <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
               <PenTool className="text-primary-600" /> 线上标注平台
            </h2>
            <p className="text-sm text-gray-500 mt-1">
               支持多模态数据标注与模型微调数据生产
            </p>
         </div>
         
         {/* Tabs */}
         <div className="flex bg-gray-100 dark:bg-slate-800 p-1 rounded-xl">
            {[
               { id: 'asr', label: 'ASR 语音转写', icon: Mic },
               { id: 'semantic', label: '语义标签训练', icon: BrainCircuit },
               { id: 'checkpoint', label: '语义点检测', icon: Target },
               { id: 'corpus', label: '语料库管理', icon: Database },
            ].map(tab => (
               <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2 transition-all ${
                     activeTab === tab.id 
                       ? 'bg-white dark:bg-slate-600 text-primary-600 dark:text-primary-400 shadow-sm' 
                       : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200'
                  }`}
               >
                  <tab.icon size={16} />
                  {tab.label}
               </button>
            ))}
         </div>
      </div>

      {/* Content Area */}
      <div className="flex-1 min-h-0">
         {activeTab === 'asr' && <ASRAnnotation />}
         {activeTab === 'semantic' && <SemanticAnnotation />}
         {activeTab === 'checkpoint' && <CheckpointAnnotation />}
         {activeTab === 'corpus' && <CorpusViewer />}
      </div>
    </div>
  );
};

export default OnlineAnnotation;