
import React, { useState } from 'react';
import { 
  Play, 
  Settings, 
  RefreshCw, 
  CheckCircle2, 
  AlertTriangle, 
  XCircle, 
  Zap, 
  Cpu, 
  Database, 
  Code,
  Layers,
  MessageSquare,
  ArrowRight,
  Gauge,
  Sliders,
  Activity,
  Shield
} from 'lucide-react';
import AIAssistant from '../components/AIAssistant';

// --- Types ---

interface TestResult {
  latency: number; // ms
  tokens: number;
  intent: {
    label: string;
    confidence: number;
  };
  sentiment: {
    label: 'Positive' | 'Neutral' | 'Negative';
    score: number;
  };
  entities: { name: string; type: string; value: string }[];
  riskCheck: {
    passed: boolean;
    violations: string[];
  };
  reasoning: string;
  response: string;
}

// --- Mock Data ---

const MOCK_MODELS = ['AutoGPT-Pro v2.1 (Production)', 'AutoGPT-Pro v2.2 (Beta)', 'Sales-Lite v1.0'];
const MOCK_SCENARIOS = ['首次进店接待', '试驾邀约', '报价谈判', '售后回访'];

const SandboxTest: React.FC = () => {
  // Config State
  const [selectedModel, setSelectedModel] = useState(MOCK_MODELS[0]);
  const [selectedScenario, setSelectedScenario] = useState(MOCK_SCENARIOS[0]);
  const [temperature, setTemperature] = useState(0.7);
  const [threshold, setThreshold] = useState(0.6);
  
  // Input State
  const [inputText, setInputText] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  
  // Result State
  const [result, setResult] = useState<TestResult | null>(null);

  const handleRunTest = () => {
    if (!inputText.trim()) return;
    
    setIsProcessing(true);
    setResult(null);

    // Mock API Call
    setTimeout(() => {
      // Mock logic based on input keywords
      let intent = 'General_Inquiry';
      let sentiment: 'Positive' | 'Neutral' | 'Negative' = 'Neutral';
      let riskViolations: string[] = [];
      let reasoning = '用户表达了购车意向，但对特定配置存在疑问。';
      let response = '您好，很高兴为您解答。';

      if (inputText.includes('价格') || inputText.includes('贵')) {
        intent = 'Price_Objection';
        sentiment = 'Negative';
        reasoning = '检测到价格敏感词，用户处于比价阶段，需启动价值锚定策略。';
        response = '价格确实是大家都很关心的点。不过如果我们算上后续的用车成本和保值率，这款车的综合性价比其实是非常高的。';
      } else if (inputText.includes('试驾')) {
        intent = 'Test_Drive_Request';
        sentiment = 'Positive';
        reasoning = '明确的试驾信号，应立即锁定试驾时间。';
        response = '没问题！正好我们有空闲的试驾车。您是想先体验一下加速性能，还是试试我们的智驾功能？';
      }

      // Risk Check Mock
      if (inputText.includes('保值率') && inputText.includes('保证')) {
         riskViolations.push('禁止过度承诺保值率');
      }

      setResult({
        latency: Math.floor(Math.random() * 200) + 100,
        tokens: Math.floor(Math.random() * 50) + 20,
        intent: { label: intent, confidence: 0.92 },
        sentiment: { label: sentiment, score: sentiment === 'Positive' ? 0.8 : sentiment === 'Negative' ? 0.2 : 0.5 },
        entities: [
          { name: 'Model', type: 'Car_Model', value: 'CT5' },
          { name: 'Budget', type: 'Money', value: '30w' }
        ],
        riskCheck: {
          passed: riskViolations.length === 0,
          violations: riskViolations
        },
        reasoning: reasoning,
        response: response
      });

      setIsProcessing(false);
    }, 1200);
  };

  return (
    <div className="h-[calc(100vh-6rem)] flex flex-col animate-fade-in relative overflow-hidden">
      
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
            <Cpu className="text-primary-600" /> 模型沙盒测试
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            在线调试 AI 模型表现，验证话术逻辑与风控规则，确认无误后发布至生产环境。
          </p>
        </div>
        <div className="flex gap-3">
           <button className="px-4 py-2 bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 text-gray-700 dark:text-gray-200 rounded-lg text-sm font-medium hover:bg-gray-50 dark:hover:bg-slate-700 transition-colors shadow-sm">
              查看发布日志
           </button>
           <button className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg text-sm font-medium transition-colors shadow-sm flex items-center gap-2">
              <CheckCircle2 size={16} /> 发布到生产环境
           </button>
        </div>
      </div>

      {/* Main Workbench */}
      <div className="flex-1 flex gap-6 min-h-0">
        
        {/* Left Panel: Config & Input */}
        <div className="w-1/3 flex flex-col gap-6">
           
           {/* Configuration Card */}
           <div className="bg-white dark:bg-slate-800 p-5 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-700">
              <h3 className="text-sm font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                 <Settings size={16} className="text-gray-500" /> 环境配置
              </h3>
              
              <div className="space-y-4">
                 <div>
                    <label className="block text-xs font-medium text-gray-500 mb-1.5">测试模型版本</label>
                    <select 
                      value={selectedModel}
                      onChange={(e) => setSelectedModel(e.target.value)}
                      className="w-full bg-gray-50 dark:bg-slate-700 border border-gray-200 dark:border-slate-600 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary-500 dark:text-white"
                    >
                       {MOCK_MODELS.map(m => <option key={m} value={m}>{m}</option>)}
                    </select>
                 </div>

                 <div>
                    <label className="block text-xs font-medium text-gray-500 mb-1.5">应用场景</label>
                    <select 
                      value={selectedScenario}
                      onChange={(e) => setSelectedScenario(e.target.value)}
                      className="w-full bg-gray-50 dark:bg-slate-700 border border-gray-200 dark:border-slate-600 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary-500 dark:text-white"
                    >
                       {MOCK_SCENARIOS.map(s => <option key={s} value={s}>{s}</option>)}
                    </select>
                 </div>

                 <div className="grid grid-cols-2 gap-4">
                    <div>
                       <label className="block text-xs font-medium text-gray-500 mb-1.5 flex justify-between">
                          温度 (Temperature) <span>{temperature}</span>
                       </label>
                       <input 
                         type="range" min="0" max="1" step="0.1" 
                         value={temperature}
                         onChange={(e) => setTemperature(parseFloat(e.target.value))}
                         className="w-full h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary-600"
                       />
                    </div>
                    <div>
                       <label className="block text-xs font-medium text-gray-500 mb-1.5 flex justify-between">
                          置信度阈值 <span>{threshold}</span>
                       </label>
                       <input 
                         type="range" min="0" max="1" step="0.1" 
                         value={threshold}
                         onChange={(e) => setThreshold(parseFloat(e.target.value))}
                         className="w-full h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary-600"
                       />
                    </div>
                 </div>
              </div>
           </div>

           {/* Input Card */}
           <div className="bg-white dark:bg-slate-800 p-5 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-700 flex-1 flex flex-col">
              <h3 className="text-sm font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                 <MessageSquare size={16} className="text-gray-500" /> 测试输入
              </h3>
              
              <div className="flex-1 relative">
                 <textarea 
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    placeholder="请输入模拟客户的话术..."
                    className="w-full h-full bg-gray-50 dark:bg-slate-700 border border-gray-200 dark:border-slate-600 rounded-xl p-4 text-sm outline-none focus:ring-2 focus:ring-primary-500 dark:text-white resize-none"
                 />
                 <div className="absolute bottom-3 right-3 flex gap-2">
                    <button 
                       onClick={() => setInputText('这车价格太贵了，隔壁那款才卖25万，你们能不能便宜点？而且听说你们保值率不行，能不能保证3年后多少钱回收？')}
                       className="text-xs bg-gray-200 dark:bg-slate-600 hover:bg-gray-300 dark:hover:bg-slate-500 text-gray-600 dark:text-gray-200 px-3 py-1.5 rounded-lg transition-colors"
                    >
                       示例1: 价格抗拒
                    </button>
                    <button 
                       onClick={() => setInputText('我想约个周末试驾，看看自动驾驶怎么样。')}
                       className="text-xs bg-gray-200 dark:bg-slate-600 hover:bg-gray-300 dark:hover:bg-slate-500 text-gray-600 dark:text-gray-200 px-3 py-1.5 rounded-lg transition-colors"
                    >
                       示例2: 试驾意向
                    </button>
                 </div>
              </div>

              <button 
                 onClick={handleRunTest}
                 disabled={isProcessing || !inputText}
                 className={`mt-4 w-full py-3 rounded-xl flex items-center justify-center gap-2 font-bold text-white transition-all ${
                    isProcessing ? 'bg-primary-400 cursor-wait' : 'bg-primary-600 hover:bg-primary-700 shadow-lg shadow-primary-500/30 active:scale-[0.99]'
                 }`}
              >
                 {isProcessing ? <RefreshCw className="animate-spin" size={20} /> : <Play size={20} fill="currentColor" />}
                 {isProcessing ? 'AI 正在推理...' : '开始测试'}
              </button>
           </div>

        </div>

        {/* Right Panel: Results */}
        <div className="flex-1 bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-700 flex flex-col overflow-hidden relative">
           
           {!result && !isProcessing && (
              <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-400 opacity-50 pointer-events-none">
                 <Zap size={64} className="mb-4 text-gray-200 dark:text-slate-700" />
                 <p className="text-sm">等待测试输入...</p>
              </div>
           )}

           {isProcessing && (
              <div className="absolute inset-0 flex flex-col items-center justify-center z-10 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm">
                 <div className="w-16 h-16 border-4 border-primary-200 border-t-primary-600 rounded-full animate-spin mb-4"></div>
                 <p className="text-primary-600 font-medium animate-pulse">模型正在思考中...</p>
              </div>
           )}

           {result && (
              <div className="flex flex-col h-full animate-slide-in-right">
                 {/* 1. Performance Meta */}
                 <div className="flex items-center gap-6 pb-6 border-b border-gray-100 dark:border-slate-700">
                    <div className="flex items-center gap-2">
                       <Gauge size={18} className="text-blue-500" />
                       <span className="text-sm text-gray-500">耗时: <span className="font-mono font-bold text-gray-900 dark:text-white">{result.latency}ms</span></span>
                    </div>
                    <div className="flex items-center gap-2">
                       <Database size={18} className="text-purple-500" />
                       <span className="text-sm text-gray-500">消耗Token: <span className="font-mono font-bold text-gray-900 dark:text-white">{result.tokens}</span></span>
                    </div>
                    <div className="flex-1"></div>
                    <span className="text-xs text-gray-400 font-mono">Request ID: req_{Date.now()}</span>
                 </div>

                 <div className="flex-1 overflow-y-auto py-6 space-y-8 pr-2 custom-scrollbar">
                    
                    {/* 2. NLP Analysis */}
                    <div className="grid grid-cols-2 gap-6">
                       <div className="bg-gray-50 dark:bg-slate-700/50 p-4 rounded-xl border border-gray-100 dark:border-slate-600">
                          <h4 className="text-xs font-bold text-gray-500 uppercase mb-3 flex items-center gap-2">
                             <Layers size={14} /> 意图识别 (Intent)
                          </h4>
                          <div className="flex justify-between items-center">
                             <span className="text-lg font-bold text-primary-700 dark:text-primary-300 bg-primary-50 dark:bg-primary-900/30 px-3 py-1 rounded-lg border border-primary-100 dark:border-primary-800">
                                {result.intent.label}
                             </span>
                             <div className="text-right">
                                <span className="text-xs text-gray-400 block">置信度</span>
                                <span className="text-sm font-bold text-green-600 dark:text-green-400">{(result.intent.confidence * 100).toFixed(1)}%</span>
                             </div>
                          </div>
                       </div>

                       <div className="bg-gray-50 dark:bg-slate-700/50 p-4 rounded-xl border border-gray-100 dark:border-slate-600">
                          <h4 className="text-xs font-bold text-gray-500 uppercase mb-3 flex items-center gap-2">
                             <Activity size={14} /> 情绪分析 (Sentiment)
                          </h4>
                          <div className="flex items-center gap-3">
                             <div className="flex-1 h-3 bg-gray-200 dark:bg-slate-600 rounded-full overflow-hidden">
                                <div 
                                  className={`h-full rounded-full ${
                                     result.sentiment.label === 'Positive' ? 'bg-green-500' : 
                                     result.sentiment.label === 'Negative' ? 'bg-red-500' : 'bg-gray-400'
                                  }`} 
                                  style={{ width: `${result.sentiment.score * 100}%` }}
                                ></div>
                             </div>
                             <span className={`text-sm font-bold ${
                                result.sentiment.label === 'Positive' ? 'text-green-600' : 
                                result.sentiment.label === 'Negative' ? 'text-red-600' : 'text-gray-600'
                             }`}>{result.sentiment.label}</span>
                          </div>
                       </div>
                    </div>

                    {/* 3. Entities & Risk */}
                    <div className="grid grid-cols-2 gap-6">
                        <div>
                           <h4 className="text-xs font-bold text-gray-500 uppercase mb-3 flex items-center gap-2">
                              <Code size={14} /> 实体抽取 (Slots)
                           </h4>
                           <div className="flex flex-wrap gap-2">
                              {result.entities.map((ent, i) => (
                                 <span key={i} className="px-3 py-1 bg-white dark:bg-slate-600 border border-gray-200 dark:border-slate-500 rounded text-xs text-gray-700 dark:text-gray-200">
                                    <span className="text-gray-400 mr-1">{ent.type}:</span> {ent.value}
                                 </span>
                              ))}
                              {result.entities.length === 0 && <span className="text-xs text-gray-400 italic">未检测到关键实体</span>}
                           </div>
                        </div>

                        <div>
                           <h4 className="text-xs font-bold text-gray-500 uppercase mb-3 flex items-center gap-2">
                              <Shield size={14} /> 风控合规 (Compliance)
                           </h4>
                           {result.riskCheck.passed ? (
                              <div className="flex items-center gap-2 text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/20 px-3 py-2 rounded-lg border border-green-100 dark:border-green-900/30">
                                 <CheckCircle2 size={16} /> <span>通过所有规则检核</span>
                              </div>
                           ) : (
                              <div className="space-y-2">
                                 {result.riskCheck.violations.map((v, i) => (
                                    <div key={i} className="flex items-center gap-2 text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20 px-3 py-2 rounded-lg border border-red-100 dark:border-red-900/30">
                                       <XCircle size={16} /> <span>触发规则: {v}</span>
                                    </div>
                                 ))}
                              </div>
                           )}
                        </div>
                    </div>

                    {/* 4. Reasoning Chain */}
                    <div className="bg-indigo-50 dark:bg-indigo-900/10 p-5 rounded-xl border border-indigo-100 dark:border-indigo-900/30">
                       <h4 className="text-xs font-bold text-indigo-700 dark:text-indigo-400 uppercase mb-2 flex items-center gap-2">
                          <Sliders size={14} /> 模型推理链 (Chain of Thought)
                       </h4>
                       <p className="text-sm text-indigo-900 dark:text-indigo-100 leading-relaxed font-mono">
                          {`> ${result.reasoning}`}
                       </p>
                    </div>

                    {/* 5. Final Response */}
                    <div>
                       <h4 className="text-xs font-bold text-gray-500 uppercase mb-3 flex items-center gap-2">
                          <MessageSquare size={14} /> 建议回复 / 生成话术
                       </h4>
                       <div className="bg-white dark:bg-slate-900 p-5 rounded-xl border border-gray-200 dark:border-slate-700 shadow-inner">
                          <p className="text-gray-800 dark:text-gray-200 leading-relaxed">
                             {result.response}
                          </p>
                       </div>
                    </div>

                 </div>
              </div>
           )}
        </div>

      </div>

      <AIAssistant context="quality_monitor" />
    </div>
  );
};

export default SandboxTest;
