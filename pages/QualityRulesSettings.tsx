
import React, { useState } from 'react';
import { 
  Search, 
  Plus, 
  Settings, 
  Trash2, 
  Edit2, 
  CheckCircle2, 
  AlertCircle, 
  Code, 
  BrainCircuit,
  Save,
  X,
  ChevronRight,
  MoreHorizontal
} from 'lucide-react';
import AIAssistant from '../components/AIAssistant';

// --- Types ---

type RuleType = 'regex' | 'semantic';
type RuleSeverity = 'critical' | 'warning' | 'info';

interface QualityRule {
  id: string;
  name: string;
  category: string;
  type: RuleType;
  severity: RuleSeverity;
  description: string;
  enabled: boolean;
  config: {
    keywords?: string[]; // For Regex
    intentDescription?: string; // For Semantic
    scoreDeduction: number;
  };
  lastModified: string;
}

interface Category {
  id: string;
  name: string;
  count: number;
}

// --- Mock Data ---

const MOCK_CATEGORIES: Category[] = [
  { id: 'all', name: '全部规则', count: 12 },
  { id: 'compliance', name: '合规性检查', count: 4 },
  { id: 'process', name: '流程执行', count: 5 },
  { id: 'product', name: '产品知识', count: 2 },
  { id: 'emotion', name: '情绪管理', count: 1 },
];

const MOCK_RULES: QualityRule[] = [
  {
    id: 'R-001',
    name: '禁止过度承诺',
    category: 'compliance',
    type: 'semantic',
    severity: 'critical',
    description: '检测顾问是否向客户承诺无法兑现的优惠或保值率。',
    enabled: true,
    config: {
      intentDescription: '销售顾问承诺了非官方政策的优惠，或者保证了未来的二手车回收价格。',
      scoreDeduction: 10
    },
    lastModified: '2023-10-25'
  },
  {
    id: 'R-002',
    name: '进店问候语',
    category: 'process',
    type: 'regex',
    severity: 'info',
    description: '检查是否使用了标准的欢迎话术。',
    enabled: true,
    config: {
      keywords: ['欢迎光临', '您好', '来看车吗'],
      scoreDeduction: 2
    },
    lastModified: '2023-10-20'
  },
  {
    id: 'R-003',
    name: '竞品攻击检测',
    category: 'compliance',
    type: 'semantic',
    severity: 'warning',
    description: '检测是否恶意诋毁竞品品牌或车型。',
    enabled: true,
    config: {
      intentDescription: '使用侮辱性、非事实性的语言描述竞争对手的产品缺陷。',
      scoreDeduction: 5
    },
    lastModified: '2023-10-22'
  },
  {
    id: 'R-004',
    name: '试驾邀请',
    category: 'process',
    type: 'semantic',
    severity: 'warning',
    description: '检测会话中是否包含主动试驾邀请环节。',
    enabled: false,
    config: {
      intentDescription: '顾问主动询问客户是否愿意试驾，或者推荐试驾路线。',
      scoreDeduction: 5
    },
    lastModified: '2023-10-18'
  },
  {
    id: 'R-005',
    name: '隐私政策告知',
    category: 'compliance',
    type: 'regex',
    severity: 'critical',
    description: '留资前必须口头告知隐私政策或获取同意。',
    enabled: true,
    config: {
      keywords: ['隐私政策', '授权', '信息保护', '登记一下'],
      scoreDeduction: 20
    },
    lastModified: '2023-10-26'
  }
];

// --- Components ---

const RuleEditor: React.FC<{ 
  rule: QualityRule | null; 
  onClose: () => void; 
  onSave: (rule: QualityRule) => void 
}> = ({ rule, onClose, onSave }) => {
  const [formData, setFormData] = useState<Partial<QualityRule>>(
    rule || {
      name: '',
      category: 'process',
      type: 'regex',
      severity: 'info',
      description: '',
      enabled: true,
      config: { keywords: [], scoreDeduction: 0 }
    }
  );

  const handleChange = (field: keyof QualityRule, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleConfigChange = (field: string, value: any) => {
    setFormData(prev => ({ 
      ...prev, 
      config: { ...prev.config!, [field]: value } 
    }));
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/30 backdrop-blur-sm animate-fade-in">
      <div className="w-full max-w-lg bg-white dark:bg-slate-800 h-full shadow-2xl flex flex-col animate-slide-in-right">
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-100 dark:border-slate-700 flex justify-between items-center bg-gray-50 dark:bg-slate-900/50">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white">
            {rule ? '编辑规则' : '新建规则'}
          </h3>
          <button onClick={onClose} className="p-2 hover:bg-gray-200 dark:hover:bg-slate-700 rounded-full transition-colors">
            <X size={20} className="text-gray-500" />
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          
          {/* Basic Info */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">规则名称</label>
              <input 
                type="text" 
                value={formData.name}
                onChange={(e) => handleChange('name', e.target.value)}
                className="w-full px-3 py-2 bg-white dark:bg-slate-700 border border-gray-200 dark:border-slate-600 rounded-lg text-sm focus:ring-2 focus:ring-primary-500 outline-none dark:text-white"
                placeholder="例如：进店问候语"
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">所属分类</label>
                <select 
                  value={formData.category}
                  onChange={(e) => handleChange('category', e.target.value)}
                  className="w-full px-3 py-2 bg-white dark:bg-slate-700 border border-gray-200 dark:border-slate-600 rounded-lg text-sm focus:ring-2 focus:ring-primary-500 outline-none dark:text-white"
                >
                  {MOCK_CATEGORIES.filter(c => c.id !== 'all').map(c => (
                    <option key={c.id} value={c.id}>{c.name}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">严重等级</label>
                <select 
                  value={formData.severity}
                  onChange={(e) => handleChange('severity', e.target.value)}
                  className="w-full px-3 py-2 bg-white dark:bg-slate-700 border border-gray-200 dark:border-slate-600 rounded-lg text-sm focus:ring-2 focus:ring-primary-500 outline-none dark:text-white"
                >
                  <option value="info">一般提示 (Info)</option>
                  <option value="warning">警告 (Warning)</option>
                  <option value="critical">严重违规 (Critical)</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">规则描述</label>
              <textarea 
                value={formData.description}
                onChange={(e) => handleChange('description', e.target.value)}
                className="w-full px-3 py-2 bg-white dark:bg-slate-700 border border-gray-200 dark:border-slate-600 rounded-lg text-sm focus:ring-2 focus:ring-primary-500 outline-none dark:text-white h-20 resize-none"
                placeholder="简要描述该规则的用途..."
              />
            </div>
          </div>

          <div className="h-px bg-gray-100 dark:bg-slate-700"></div>

          {/* Logic Config */}
          <div className="space-y-4">
            <h4 className="font-bold text-gray-900 dark:text-white text-sm flex items-center gap-2">
              <Settings size={16} className="text-primary-500" /> 检核逻辑配置
            </h4>
            
            {/* Type Selector */}
            <div className="flex bg-gray-100 dark:bg-slate-700 p-1 rounded-lg">
              <button 
                onClick={() => handleChange('type', 'regex')}
                className={`flex-1 py-1.5 text-sm font-medium rounded-md flex items-center justify-center gap-2 transition-all ${
                  formData.type === 'regex' 
                    ? 'bg-white dark:bg-slate-600 text-primary-600 dark:text-primary-400 shadow-sm' 
                    : 'text-gray-500 hover:text-gray-700 dark:text-gray-400'
                }`}
              >
                <Code size={14} /> 正则关键词
              </button>
              <button 
                onClick={() => handleChange('type', 'semantic')}
                className={`flex-1 py-1.5 text-sm font-medium rounded-md flex items-center justify-center gap-2 transition-all ${
                  formData.type === 'semantic' 
                    ? 'bg-white dark:bg-slate-600 text-purple-600 dark:text-purple-400 shadow-sm' 
                    : 'text-gray-500 hover:text-gray-700 dark:text-gray-400'
                }`}
              >
                <BrainCircuit size={14} /> 语义意图
              </button>
            </div>

            {/* Dynamic Config Fields */}
            {formData.type === 'regex' ? (
              <div className="bg-gray-50 dark:bg-slate-700/50 p-4 rounded-xl border border-gray-200 dark:border-slate-600 space-y-3">
                <div>
                  <label className="block text-xs font-bold text-gray-500 dark:text-gray-400 mb-1 uppercase">包含关键词 (任意匹配)</label>
                  <input 
                    type="text" 
                    value={formData.config?.keywords?.join(', ')}
                    onChange={(e) => handleConfigChange('keywords', e.target.value.split(',').map(s => s.trim()))}
                    className="w-full px-3 py-2 bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-600 rounded-lg text-sm focus:ring-2 focus:ring-primary-500 outline-none dark:text-white"
                    placeholder="例如：你好, 欢迎, 早安 (用逗号分隔)"
                  />
                  <p className="text-xs text-gray-400 mt-1">支持正则表达式，多个词之间为“或”关系。</p>
                </div>
              </div>
            ) : (
              <div className="bg-purple-50 dark:bg-purple-900/10 p-4 rounded-xl border border-purple-100 dark:border-purple-900/30 space-y-3">
                <div>
                  <label className="block text-xs font-bold text-purple-700 dark:text-purple-300 mb-1 uppercase">意图描述 Prompt</label>
                  <textarea 
                    value={formData.config?.intentDescription}
                    onChange={(e) => handleConfigChange('intentDescription', e.target.value)}
                    className="w-full px-3 py-2 bg-white dark:bg-slate-800 border border-purple-200 dark:border-purple-800/50 rounded-lg text-sm focus:ring-2 focus:ring-purple-500 outline-none dark:text-white h-24 resize-none"
                    placeholder="描述期望AI检测的意图，例如：销售顾问询问客户的购车预算..."
                  />
                  <p className="text-xs text-purple-600/70 dark:text-purple-400/70 mt-1">
                    AI模型将根据此描述对每一句对话进行语义匹配。
                  </p>
                </div>
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">违规扣分</label>
              <div className="flex items-center gap-2">
                <input 
                  type="number" 
                  value={formData.config?.scoreDeduction}
                  onChange={(e) => handleConfigChange('scoreDeduction', parseInt(e.target.value))}
                  className="w-24 px-3 py-2 bg-white dark:bg-slate-700 border border-gray-200 dark:border-slate-600 rounded-lg text-sm focus:ring-2 focus:ring-primary-500 outline-none dark:text-white font-mono"
                />
                <span className="text-sm text-gray-500">分</span>
              </div>
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="p-4 border-t border-gray-100 dark:border-slate-700 flex justify-end gap-3 bg-gray-50 dark:bg-slate-900/50">
          <button 
            onClick={onClose}
            className="px-4 py-2 bg-white dark:bg-slate-700 border border-gray-200 dark:border-slate-600 text-gray-700 dark:text-gray-200 rounded-lg text-sm font-medium hover:bg-gray-50 dark:hover:bg-slate-600 transition-colors"
          >
            取消
          </button>
          <button 
            onClick={() => onSave(formData as QualityRule)}
            className="px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg text-sm font-medium transition-colors flex items-center gap-2 shadow-sm"
          >
            <Save size={16} /> 保存规则
          </button>
        </div>
      </div>
    </div>
  );
};

const QualityRulesSettings: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [editingRule, setEditingRule] = useState<QualityRule | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Filter Rules
  const filteredRules = MOCK_RULES.filter(rule => {
    const matchCat = selectedCategory === 'all' || rule.category === selectedCategory;
    const matchSearch = rule.name.toLowerCase().includes(searchQuery.toLowerCase()) || rule.description.includes(searchQuery);
    return matchCat && matchSearch;
  });

  const handleEdit = (rule: QualityRule) => {
    setEditingRule(rule);
  };

  const handleSave = (rule: QualityRule) => {
    // In a real app, this would update the backend
    console.log('Saving rule:', rule);
    setEditingRule(null);
    setIsCreating(false);
  };

  return (
    <div className="h-[calc(100vh-6rem)] flex flex-col md:flex-row gap-6 animate-fade-in relative">
      
      {/* Left Sidebar: Categories */}
      <div className="w-full md:w-64 bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-700 flex flex-col overflow-hidden shrink-0">
        <div className="p-4 border-b border-gray-100 dark:border-slate-700">
          <h3 className="font-bold text-gray-900 dark:text-white">规则分类</h3>
        </div>
        <div className="flex-1 overflow-y-auto p-2 space-y-1">
          {MOCK_CATEGORIES.map(cat => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm transition-colors ${
                selectedCategory === cat.id 
                  ? 'bg-primary-50 dark:bg-primary-900/20 text-primary-700 dark:text-primary-300 font-medium' 
                  : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-slate-700'
              }`}
            >
              <span>{cat.name}</span>
              <span className={`text-xs px-2 py-0.5 rounded-full ${
                selectedCategory === cat.id ? 'bg-primary-100 dark:bg-primary-800 text-primary-700 dark:text-primary-200' : 'bg-gray-100 dark:bg-slate-700 text-gray-500'
              }`}>
                {cat.count}
              </span>
            </button>
          ))}
        </div>
        <div className="p-3 border-t border-gray-100 dark:border-slate-700">
           <button className="w-full py-2 border border-dashed border-gray-300 dark:border-slate-600 text-gray-500 dark:text-gray-400 rounded-lg text-sm hover:border-primary-500 hover:text-primary-500 transition-colors flex items-center justify-center gap-2">
              <Plus size={14} /> 管理分类
           </button>
        </div>
      </div>

      {/* Right Content: Rules List */}
      <div className="flex-1 bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-700 flex flex-col overflow-hidden">
        {/* Toolbar */}
        <div className="p-4 border-b border-gray-100 dark:border-slate-700 flex flex-wrap gap-4 items-center justify-between">
           <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input 
                type="text" 
                placeholder="搜索规则名称..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 pr-4 py-2 bg-gray-50 dark:bg-slate-700 border border-gray-200 dark:border-slate-600 rounded-lg text-sm outline-none focus:ring-2 focus:ring-primary-500 dark:text-white w-64"
              />
           </div>
           <button 
             onClick={() => setIsCreating(true)}
             className="flex items-center gap-2 px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg text-sm font-medium transition-colors shadow-sm"
           >
             <Plus size={16} /> 新建规则
           </button>
        </div>

        {/* List */}
        <div className="flex-1 overflow-y-auto">
           {filteredRules.length > 0 ? (
             <div className="divide-y divide-gray-100 dark:divide-slate-700">
                {filteredRules.map(rule => (
                   <div key={rule.id} className="p-4 hover:bg-gray-50 dark:hover:bg-slate-700/30 transition-colors flex items-center gap-4 group">
                      {/* Icon */}
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${
                         rule.type === 'regex' 
                           ? 'bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400' 
                           : 'bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400'
                      }`}>
                         {rule.type === 'regex' ? <Code size={18} /> : <BrainCircuit size={18} />}
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                         <div className="flex items-center gap-2 mb-1">
                            <h4 className="text-sm font-bold text-gray-900 dark:text-white truncate">{rule.name}</h4>
                            <span className={`text-[10px] px-1.5 py-0.5 rounded border capitalize ${
                               rule.severity === 'critical' ? 'bg-red-50 text-red-600 border-red-100 dark:bg-red-900/20 dark:text-red-300 dark:border-red-900/30' :
                               rule.severity === 'warning' ? 'bg-orange-50 text-orange-600 border-orange-100 dark:bg-orange-900/20 dark:text-orange-300 dark:border-orange-900/30' :
                               'bg-blue-50 text-blue-600 border-blue-100 dark:bg-blue-900/20 dark:text-blue-300 dark:border-blue-900/30'
                            }`}>
                               {rule.severity}
                            </span>
                            {!rule.enabled && (
                               <span className="text-[10px] bg-gray-100 text-gray-500 px-1.5 py-0.5 rounded">已停用</span>
                            )}
                         </div>
                         <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-1">{rule.description}</p>
                         
                         {/* Config Preview */}
                         <div className="mt-2 text-xs text-gray-400 flex items-center gap-3">
                            {rule.type === 'regex' ? (
                               <span className="bg-gray-100 dark:bg-slate-700 px-1.5 py-0.5 rounded font-mono text-gray-600 dark:text-gray-300">
                                  kw: {rule.config.keywords?.slice(0,3).join(', ')}{rule.config.keywords && rule.config.keywords.length > 3 ? '...' : ''}
                               </span>
                            ) : (
                               <span className="bg-purple-50 dark:bg-purple-900/20 px-1.5 py-0.5 rounded text-purple-600 dark:text-purple-300 truncate max-w-[200px]">
                                  AI: {rule.config.intentDescription}
                               </span>
                            )}
                            <span className="text-red-400">扣 {rule.config.scoreDeduction} 分</span>
                         </div>
                      </div>

                      {/* Actions */}
                      <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                         <button 
                           onClick={() => handleEdit(rule)}
                           className="p-2 text-gray-400 hover:text-primary-600 hover:bg-white dark:hover:bg-slate-600 rounded-lg transition-colors border border-transparent hover:border-gray-200 dark:hover:border-slate-500"
                           title="编辑"
                         >
                            <Edit2 size={16} />
                         </button>
                         <button 
                           className="p-2 text-gray-400 hover:text-red-600 hover:bg-white dark:hover:bg-slate-600 rounded-lg transition-colors border border-transparent hover:border-gray-200 dark:hover:border-slate-500"
                           title="删除"
                         >
                            <Trash2 size={16} />
                         </button>
                         <div className="w-px h-4 bg-gray-200 dark:bg-slate-600 mx-1"></div>
                         <button className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200">
                            <MoreHorizontal size={16} />
                         </button>
                      </div>
                   </div>
                ))}
             </div>
           ) : (
             <div className="h-full flex flex-col items-center justify-center text-gray-400">
                <Settings size={48} className="mb-4 opacity-20" />
                <p className="text-sm">暂无符合条件的规则</p>
             </div>
           )}
        </div>
      </div>

      {/* Editor Modal */}
      {(editingRule || isCreating) && (
        <RuleEditor 
          rule={editingRule} 
          onClose={() => { setEditingRule(null); setIsCreating(false); }} 
          onSave={handleSave} 
        />
      )}

      <AIAssistant context="quality_monitor" />
    </div>
  );
};

export default QualityRulesSettings;
