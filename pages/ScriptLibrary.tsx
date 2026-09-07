
import React, { useState } from 'react';
import { 
  Search, 
  Filter, 
  BookOpen, 
  Star, 
  MessageSquare, 
  ThumbsUp, 
  Copy, 
  PlayCircle,
  Tag,
  Zap,
  ShieldCheck,
  Award,
  X,
  User,
  Play,
  Pause,
  Volume2,
  Clock,
  ArrowRight
} from 'lucide-react';
import AIAssistant from '../components/AIAssistant';

// --- Types ---

interface ScriptUsage {
  id: string;
  advisorName: string;
  advisorAvatar: string;
  storeName: string;
  timestamp: string;
  customerContext: string; // What customer said before
  scriptContent: string; // The specific phrasing used by this advisor (might vary slightly)
  outcome: string; // Immediate reaction or result
  audioDuration: string;
}

interface ScriptItem {
  id: string;
  title: string;
  type: 'golden' | 'objection'; // 黄金话术 vs 异议处理
  scenario: string;
  model: string[];
  content: string;
  analysis: string; // AI Analysis / Why it works
  source: string; // e.g., "Extracted from Wang Jin's session"
  usageCount: number;
  likes: number;
  tags: string[];
  usages?: ScriptUsage[]; // New field for tracing
}

// --- Mock Data ---

const MOCK_SCRIPTS: ScriptItem[] = [
  {
    id: 'S-001',
    title: 'Model Y 空间优势场景化描述',
    type: 'golden',
    scenario: '产品介绍',
    model: ['Model Y'],
    content: '“王先生，您看这个后备箱，如果我们把后排座椅放倒，它其实就是一个纯平的双人床。周末您带孩子去露营，完全不需要搭帐篷，透过全景天幕看星星，这不仅是一辆车，更是咱们家移动的第二个起居室。”',
    analysis: '通过“露营”、“看星星”等具体场景，将抽象的空间参数转化为客户可感知的幸福感，激发情感共鸣。',
    source: '提炼自 金牌顾问-王金牌 10/24 录音',
    usageCount: 1250,
    likes: 342,
    tags: ['场景化', '家庭用车', '空间'],
    usages: [
      {
        id: 'U-001',
        advisorName: '王金牌',
        advisorAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=王金牌',
        storeName: '上海旗舰店',
        timestamp: '2023-10-24 14:30',
        customerContext: '这车后备箱看着挺大，但不知道实不实用，我们家喜欢出去玩。',
        scriptContent: '王先生，您看这个后备箱，如果我们把后排座椅放倒，它其实就是一个纯平的双人床。周末您带孩子去露营，完全不需要搭帐篷，透过全景天幕看星星，这不仅是一辆车，更是咱们家移动的第二个起居室。',
        outcome: '客户点头表示认同，并主动询问是否送气垫床。',
        audioDuration: '00:25'
      },
      {
        id: 'U-002',
        advisorName: '李进取',
        advisorAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=李进取',
        storeName: '北京朝阳店',
        timestamp: '2023-10-25 10:15',
        customerContext: '我是觉得这车空间还可以，就是不知道能不能装下露营装备。',
        scriptContent: '其实不仅能装装备，它本身就是个营地。把后排放倒就是纯平双人床，透过天幕看星星，完全就是咱们移动的第二个起居室，孩子肯定特别喜欢。',
        outcome: '客户笑了，表示确实很有画面感。',
        audioDuration: '00:20'
      }
    ]
  },
  {
    id: 'S-002',
    title: '针对“价格太贵”的价值锚定',
    type: 'objection',
    scenario: '报价谈判',
    model: ['全系'],
    content: '“其实我看您最在意的不是价格，而是这就钱花得值不值。如果我们把眼光放长到5年，算上节省的油费、保养费，还有我们极高的保值率回购政策，您每天的用车成本其实比同级燃油车还要低一杯咖啡钱。”',
    analysis: '避开直接降价，通过TCO（全生命周期成本）分析，将大额购车款拆解为日均成本，降低客户心理负担。',
    source: '提炼自 资深顾问-李进取 10/22 录音',
    usageCount: 890,
    likes: 215,
    tags: ['TCO分析', '价格谈判', '异议处理'],
    usages: [
        {
            id: 'U-003',
            advisorName: '李进取',
            advisorAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=李进取',
            storeName: '北京朝阳店',
            timestamp: '2023-10-22 16:20',
            customerContext: '落地要30万了，比隔壁那款油车贵了快5万，有点超预算。',
            scriptContent: '其实我看您最在意的不是当下的价格，而是这钱花得值不值。如果我们把眼光放长到5年，算上省下的油费、购置税，还有极高的保值回购，平摊下来每天用车成本比那款油车还低一杯咖啡钱。',
            outcome: '客户开始认真计算用车成本，不再执着于裸车价差。',
            audioDuration: '00:35'
        }
    ]
  },
  {
    id: 'S-003',
    title: '竞品对比：面对“XX品牌配置更高”',
    type: 'objection',
    scenario: '竞品对比',
    model: ['Model 3', 'Model Y'],
    content: '“确实，现在市面上堆料的车很多。但车毕竟是用来开的，我们的底层架构和三电系统经过了全球几百万车主的验证，这种‘看不见的安全感’和‘机械素质’，是单纯堆砌屏幕和冰箱给不了的。您刚才试驾时那个底盘的紧致感，应该也能感觉出来吧？”',
    analysis: '先认同后转折（Yes, but...），将关注点从“显性配置”引导至“隐性品质”和“安全”，并唤醒试驾体验。',
    source: '提炼自 金牌顾问-王金牌 10/25 录音',
    usageCount: 650,
    likes: 188,
    tags: ['竞品打击', '安全', '操控'],
    usages: []
  },
  {
    id: 'S-004',
    title: '试驾邀约：封闭式提问技巧',
    type: 'golden',
    scenario: '试驾邀约',
    model: ['全系'],
    content: '“正好现在试驾车有空档，与其听我讲参数，不如您亲自上手感受一下？您是想先试一下百公里加速的推背感，还是想体验一下我们在高架上的自动辅助驾驶功能？”',
    analysis: '不问“要不要试”，而是给“试什么”的选择题（A or B），默认客户同意试驾，提高邀约成功率。',
    source: 'AI 智能生成',
    usageCount: 2100,
    likes: 560,
    tags: ['二选一', '体验引导'],
    usages: []
  },
  {
    id: 'S-005',
    title: '家人阻碍处理：针对“要回去问老婆”',
    type: 'objection',
    scenario: '成交逼单',
    model: ['全系'],
    content: '“非常理解，买车毕竟是家庭大事。不过嫂子没来现场体验，可能只能看到价格。要不这样，我帮您申请一个‘24小时深度试驾’名额，您今晚把车开回去，带嫂子兜兜风，让她也实际感受一下这个舒适度，到时候你们商量起来也更有依据，您看怎么样？”',
    analysis: '将“阻碍”转化为“推进机会”，通过深度试驾让决策人（妻子）参与进来，避免因信息不对称导致的拒绝。',
    source: '提炼自 资深顾问-李进取 10/20 录音',
    usageCount: 450,
    likes: 120,
    tags: ['决策人', '深度试驾'],
    usages: []
  },
  {
    id: 'S-006',
    title: '置换引导：旧车情感共鸣',
    type: 'golden',
    scenario: '置换评估',
    model: ['全系'],
    content: '“看得出这辆老车您保养得很好，陪您走过不少路吧？正好我们现在有专门的‘老友记’置换补贴，不仅价格比外面高，而且我们还会帮您把旧车整备好寻找下一任爱主。您把这份情怀交给我们，换一辆更安全的新车继续守护家人，也是一种升级。”',
    analysis: '不仅谈钱，更谈情怀。肯定旧车价值，减轻客户割舍旧车的心理阻力，同时植入置换补贴优势。',
    source: '提炼自 顾问-张新人 10/26 录音',
    usageCount: 320,
    likes: 95,
    tags: ['置换', '情感营销'],
    usages: []
  }
];

const SCENARIOS = ['全部', '试驾邀约', '产品介绍', '竞品对比', '报价谈判', '异议处理', '成交逼单', '置换评估'];
const MODELS = ['全部车型', 'Model 3', 'Model Y', 'Model S', 'Model X', 'Cybertruck'];

// --- Components ---

// Modal for tracing script usage
const ScriptSourceTraceModal = ({ script, onClose }: { script: ScriptItem, onClose: () => void }) => {
    const [playingId, setPlayingId] = useState<string | null>(null);

    const togglePlay = (id: string) => {
        if (playingId === id) {
            setPlayingId(null);
        } else {
            setPlayingId(id);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-fade-in">
            <div className="bg-white dark:bg-slate-800 w-full max-w-4xl rounded-2xl shadow-2xl overflow-hidden border border-gray-100 dark:border-slate-700 flex flex-col max-h-[90vh]">
                
                {/* Header */}
                <div className="px-6 py-4 border-b border-gray-100 dark:border-slate-700 flex justify-between items-start bg-gray-50 dark:bg-slate-900/50">
                    <div>
                        <div className="flex items-center gap-2 mb-1">
                            <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider border ${
                                script.type === 'golden' 
                                    ? 'bg-yellow-100 text-yellow-700 border-yellow-200 dark:bg-yellow-900/30 dark:text-yellow-300 dark:border-yellow-800'
                                    : 'bg-blue-100 text-blue-700 border-blue-200 dark:bg-blue-900/30 dark:text-blue-300 dark:border-blue-800'
                            }`}>
                                {script.type === 'golden' ? '黄金话术' : '异议处理'}
                            </span>
                            <span className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1">
                                <Tag size={12} /> {script.scenario}
                            </span>
                        </div>
                        <h2 className="text-xl font-bold text-gray-900 dark:text-white">{script.title}</h2>
                    </div>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors p-1 bg-white dark:bg-slate-700 rounded-full hover:bg-gray-100 dark:hover:bg-slate-600">
                        <X size={20} />
                    </button>
                </div>

                <div className="flex flex-col md:flex-row flex-1 overflow-hidden">
                    {/* Left: Script Details */}
                    <div className="w-full md:w-1/3 p-6 border-b md:border-b-0 md:border-r border-gray-100 dark:border-slate-700 overflow-y-auto bg-gray-50/30 dark:bg-slate-800/30">
                        <h3 className="text-sm font-bold text-gray-900 dark:text-white mb-3">话术核心内容</h3>
                        <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-gray-200 dark:border-slate-700 shadow-sm relative mb-6">
                            <MessageSquare size={16} className="absolute -top-2.5 -left-2.5 text-primary-500 bg-white dark:bg-slate-800 p-0.5 rounded-full" fill="currentColor" />
                            <p className="text-sm text-gray-800 dark:text-gray-200 leading-relaxed italic font-medium">
                                {script.content}
                            </p>
                        </div>

                        <h3 className="text-sm font-bold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                            <Zap size={16} className="text-yellow-500" fill="currentColor" /> AI 深度解析
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
                            {script.analysis}
                        </p>

                        <div className="flex items-center gap-2 text-xs text-gray-500">
                            <ShieldCheck size={14} /> 来源: {script.source}
                        </div>
                    </div>

                    {/* Right: Usage Tracing */}
                    <div className="flex-1 p-6 overflow-y-auto bg-white dark:bg-slate-800">
                        <h3 className="text-sm font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                            <PlayCircle size={18} className="text-primary-600" /> 
                            实战溯源 ({script.usages?.length || 0} 条高分录音)
                        </h3>
                        
                        <div className="space-y-6">
                            {script.usages && script.usages.length > 0 ? (
                                script.usages.map((usage) => (
                                    <div key={usage.id} className="relative pl-6 border-l-2 border-gray-100 dark:border-slate-700 pb-2">
                                        <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-primary-100 dark:bg-primary-900/50 border-2 border-white dark:border-slate-800 flex items-center justify-center">
                                            <div className="w-1.5 h-1.5 rounded-full bg-primary-600"></div>
                                        </div>
                                        
                                        {/* Usage Header */}
                                        <div className="flex items-center justify-between mb-3">
                                            <div className="flex items-center gap-2">
                                                <img src={usage.advisorAvatar} alt={usage.advisorName} className="w-6 h-6 rounded-full" />
                                                <span className="text-sm font-bold text-gray-900 dark:text-white">{usage.advisorName}</span>
                                                <span className="text-xs text-gray-400">· {usage.storeName}</span>
                                                <span className="text-xs text-gray-400">· {usage.timestamp}</span>
                                            </div>
                                            <button 
                                                onClick={() => togglePlay(usage.id)}
                                                className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium transition-all ${
                                                    playingId === usage.id 
                                                    ? 'bg-primary-600 text-white shadow-lg shadow-primary-500/30' 
                                                    : 'bg-gray-100 dark:bg-slate-700 text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-slate-600'
                                                }`}
                                            >
                                                {playingId === usage.id ? <Pause size={12} fill="currentColor" /> : <Play size={12} fill="currentColor" />}
                                                {playingId === usage.id ? '播放中...' : `听录音 (${usage.audioDuration})`}
                                            </button>
                                        </div>

                                        {/* Transcript Context */}
                                        <div className="bg-gray-50 dark:bg-slate-700/30 rounded-xl p-4 space-y-3 text-sm">
                                            {/* Customer Context */}
                                            <div className="flex gap-3">
                                                <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-slate-600 flex-shrink-0 flex items-center justify-center text-gray-500 dark:text-gray-300">
                                                    <User size={16} />
                                                </div>
                                                <div className="flex-1">
                                                    <p className="text-xs text-gray-500 mb-1">客户</p>
                                                    <p className="text-gray-600 dark:text-gray-300 bg-white dark:bg-slate-800 p-2 rounded-lg rounded-tl-none border border-gray-100 dark:border-slate-700 inline-block shadow-sm">
                                                        {usage.customerContext}
                                                    </p>
                                                </div>
                                            </div>

                                            {/* Advisor Script */}
                                            <div className="flex gap-3 flex-row-reverse">
                                                <img src={usage.advisorAvatar} alt={usage.advisorName} className="w-8 h-8 rounded-full flex-shrink-0" />
                                                <div className="flex-1 text-right">
                                                    <p className="text-xs text-gray-500 mb-1">顾问 {usage.advisorName}</p>
                                                    <p className="text-indigo-900 dark:text-indigo-100 bg-indigo-50 dark:bg-indigo-900/30 p-2 rounded-lg rounded-tr-none border border-indigo-100 dark:border-indigo-900/50 inline-block shadow-sm text-left">
                                                        {usage.scriptContent}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Outcome */}
                                        <div className="mt-2 flex items-center gap-2 text-xs text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/10 px-3 py-1.5 rounded-lg w-fit">
                                            <Award size={14} />
                                            <span>效果反馈: {usage.outcome}</span>
                                        </div>

                                        {/* Fake Audio Visualizer when playing */}
                                        {playingId === usage.id && (
                                            <div className="mt-3 flex items-center gap-1 h-6 animate-fade-in">
                                                <Volume2 size={16} className="text-primary-500 mr-2" />
                                                {Array.from({ length: 20 }).map((_, i) => (
                                                    <div 
                                                        key={i} 
                                                        className="w-1 bg-primary-400 rounded-full animate-pulse"
                                                        style={{ 
                                                            height: `${Math.random() * 100}%`,
                                                            animationDelay: `${i * 0.05}s`
                                                        }}
                                                    ></div>
                                                ))}
                                                <span className="text-xs text-primary-600 ml-2 font-mono">00:12 / {usage.audioDuration}</span>
                                            </div>
                                        )}
                                    </div>
                                ))
                            ) : (
                                <div className="text-center py-10 text-gray-400">
                                    <Clock size={48} className="mx-auto mb-2 opacity-20" />
                                    <p>暂无关联的实战录音记录</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
                
                {/* Footer */}
                <div className="p-4 border-t border-gray-100 dark:border-slate-700 bg-gray-50 dark:bg-slate-900/50 flex justify-end">
                    <button className="flex items-center gap-2 text-sm text-primary-600 font-medium hover:text-primary-700">
                        查看更多相似案例 <ArrowRight size={16} />
                    </button>
                </div>
            </div>
        </div>
    );
};

const ScriptLibrary: React.FC = () => {
  const [selectedScenario, setSelectedScenario] = useState('全部');
  const [selectedModel, setSelectedModel] = useState('全部车型');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedScript, setSelectedScript] = useState<ScriptItem | null>(null);

  const filteredScripts = MOCK_SCRIPTS.filter(script => {
    const matchScenario = selectedScenario === '全部' || script.scenario === selectedScenario;
    const matchModel = selectedModel === '全部车型' || script.model.includes('全系') || script.model.includes(selectedModel);
    const matchSearch = script.title.includes(searchQuery) || script.content.includes(searchQuery) || script.tags.some(t => t.includes(searchQuery));
    return matchScenario && matchModel && matchSearch;
  });

  return (
    <div className="space-y-6 animate-fade-in pb-12 relative">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
            <BookOpen className="text-primary-600" /> 优秀话术库
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            基于数万条高分会话提炼的“黄金话术”与“异议处理”实战范例
          </p>
        </div>
        
        <div className="flex gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input 
              type="text" 
              placeholder="搜索关键词、场景..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 pr-4 py-2 bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-lg text-sm outline-none focus:ring-2 focus:ring-primary-500 dark:text-white w-64 shadow-sm"
            />
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-primary-600 text-white rounded-lg text-sm font-medium hover:bg-primary-700 transition-colors shadow-sm">
             <Filter size={16} /> 智能推荐
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white dark:bg-slate-800 p-4 rounded-xl shadow-sm border border-gray-100 dark:border-slate-700 space-y-4">
        {/* Model Filter */}
        <div className="flex items-center gap-4 border-b border-gray-100 dark:border-slate-700 pb-4">
           <span className="text-sm font-bold text-gray-700 dark:text-gray-200 flex-shrink-0">适用车型:</span>
           <div className="flex flex-wrap gap-2">
              {MODELS.map(model => (
                <button
                  key={model}
                  onClick={() => setSelectedModel(model)}
                  className={`px-3 py-1 text-sm rounded-full transition-colors ${
                    selectedModel === model 
                      ? 'bg-primary-100 text-primary-700 dark:bg-primary-900/30 dark:text-primary-300 font-medium' 
                      : 'text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-slate-700'
                  }`}
                >
                  {model}
                </button>
              ))}
           </div>
        </div>

        {/* Scenario Filter */}
        <div className="flex items-center gap-4">
           <span className="text-sm font-bold text-gray-700 dark:text-gray-200 flex-shrink-0">业务场景:</span>
           <div className="flex flex-wrap gap-2">
              {SCENARIOS.map(scenario => (
                <button
                  key={scenario}
                  onClick={() => setSelectedScenario(scenario)}
                  className={`px-3 py-1 text-sm rounded-md transition-colors ${
                    selectedScenario === scenario 
                      ? 'bg-gray-900 text-white dark:bg-white dark:text-slate-900 shadow-sm' 
                      : 'text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-slate-700'
                  }`}
                >
                  {scenario}
                </button>
              ))}
           </div>
        </div>
      </div>

      {/* Script Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredScripts.map(script => (
          <div 
            key={script.id} 
            className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-700 overflow-hidden hover:shadow-md transition-shadow flex flex-col cursor-pointer group"
            onClick={() => setSelectedScript(script)}
          >
            {/* Card Header */}
            <div className={`px-6 py-4 border-b border-gray-100 dark:border-slate-700 flex justify-between items-start ${
              script.type === 'golden' ? 'bg-gradient-to-r from-yellow-50 to-white dark:from-yellow-900/10 dark:to-slate-800' : 'bg-gradient-to-r from-blue-50 to-white dark:from-blue-900/10 dark:to-slate-800'
            }`}>
               <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider border ${
                       script.type === 'golden' 
                        ? 'bg-yellow-100 text-yellow-700 border-yellow-200 dark:bg-yellow-900/30 dark:text-yellow-300 dark:border-yellow-800'
                        : 'bg-blue-100 text-blue-700 border-blue-200 dark:bg-blue-900/30 dark:text-blue-300 dark:border-blue-800'
                    }`}>
                       {script.type === 'golden' ? '黄金话术' : '异议处理'}
                    </span>
                    <span className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1">
                       <Tag size={12} /> {script.scenario}
                    </span>
                  </div>
                  <h3 className="font-bold text-gray-900 dark:text-white line-clamp-1 group-hover:text-primary-600 transition-colors" title={script.title}>{script.title}</h3>
               </div>
               <button className="text-gray-400 hover:text-primary-600 transition-colors">
                  <Star size={18} />
               </button>
            </div>

            {/* Content */}
            <div className="p-6 flex-1 flex flex-col gap-4">
               {/* Script Text */}
               <div className="relative bg-gray-50 dark:bg-slate-900/50 p-4 rounded-xl border border-dashed border-gray-200 dark:border-slate-700">
                  <MessageSquare size={16} className="absolute -top-2.5 -left-2.5 text-primary-500 bg-white dark:bg-slate-800 p-0.5 rounded-full" fill="currentColor" />
                  <p className="text-sm text-gray-800 dark:text-gray-200 leading-relaxed italic font-medium line-clamp-4">
                     {script.content}
                  </p>
                  <button className="absolute bottom-2 right-2 p-1.5 text-gray-400 hover:text-primary-600 hover:bg-white dark:hover:bg-slate-700 rounded-lg transition-colors" title="复制话术" onClick={(e) => e.stopPropagation()}>
                     <Copy size={14} />
                  </button>
               </div>

               {/* Analysis */}
               <div className="flex gap-3">
                  <div className="mt-1 flex-shrink-0 text-yellow-500">
                     <Zap size={16} fill="currentColor" />
                  </div>
                  <div>
                     <p className="text-xs font-bold text-gray-500 dark:text-gray-400 mb-1">AI 深度解析</p>
                     <p className="text-xs text-gray-600 dark:text-gray-300 leading-relaxed line-clamp-2">
                        {script.analysis}
                     </p>
                  </div>
               </div>
            </div>

            {/* Footer */}
            <div className="px-6 py-3 bg-gray-50 dark:bg-slate-900/50 border-t border-gray-100 dark:border-slate-700 flex justify-between items-center text-xs text-gray-500">
               <div className="flex gap-4">
                  <span className="flex items-center gap-1 hover:text-primary-600 cursor-pointer"><ThumbsUp size={14} /> {script.likes}</span>
                  <span className="flex items-center gap-1 hover:text-primary-600 cursor-pointer"><MessageSquare size={14} /> {script.usageCount} 使用</span>
               </div>
               <span className="flex items-center gap-1 text-primary-600 font-medium group-hover:underline">
                  查看溯源 <PlayCircle size={14} />
               </span>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {selectedScript && (
          <ScriptSourceTraceModal script={selectedScript} onClose={() => setSelectedScript(null)} />
      )}

      <AIAssistant context="dashboard" />
    </div>
  );
};

export default ScriptLibrary;
