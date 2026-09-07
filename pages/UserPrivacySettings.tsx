import React, { useState } from 'react';
import { 
  Shield, 
  ShieldCheck, 
  ShieldAlert, 
  Mic, 
  MicOff, 
  UserX, 
  Volume2, 
  VolumeX, 
  Sliders, 
  Save, 
  RotateCcw, 
  CheckCircle2, 
  AlertTriangle, 
  Info, 
  Play, 
  Pause, 
  Lock, 
  Building2, 
  History, 
  Sparkles,
  SlidersHorizontal,
  ChevronRight,
  UserCheck
} from 'lucide-react';

interface PrivacyConfigState {
  customerVoiceAnonymization: boolean; // 对客户录音变声处理
  customerAnonymizationMode: 'natural' | 'pitch_shift' | 'robotic';
  customerPitchShiftLevel: number;
  
  disableCustomerRecording: boolean; // 不采集客户录音
  
  consultantVoiceAnonymization: boolean; // 对销售顾问声音变声处理
  consultantAnonymizationMode: 'mild' | 'moderate' | 'heavy';

  scopeType: 'national' | 'region' | 'store';
  selectedTarget: string;
  retentionDays: number;
  autoWatermark: boolean;
  sensitiveWordFilter: boolean;
}

const DEFAULT_CONFIG: PrivacyConfigState = {
  customerVoiceAnonymization: true,
  customerAnonymizationMode: 'natural',
  customerPitchShiftLevel: 65,
  disableCustomerRecording: false,
  consultantVoiceAnonymization: true,
  consultantAnonymizationMode: 'moderate',
  scopeType: 'national',
  selectedTarget: '全国所有门店',
  retentionDays: 90,
  autoWatermark: true,
  sensitiveWordFilter: true
};

interface AuditLogItem {
  id: string;
  time: string;
  operator: string;
  role: string;
  item: string;
  changeFrom: string;
  changeTo: string;
  scope: string;
}

const MOCK_AUDIT_LOGS: AuditLogItem[] = [
  {
    id: 'LOG-001',
    time: '2026-08-02 16:30:12',
    operator: '张立华',
    role: '安全合规总监',
    item: '对客户录音变声处理',
    changeFrom: '关闭',
    changeTo: '开启 (自然重构模式)',
    scope: '全国所有门店'
  },
  {
    id: 'LOG-002',
    time: '2026-07-28 10:15:45',
    operator: '李静',
    role: 'IT运维经理',
    item: '不采集客户录音',
    changeFrom: '开启',
    changeTo: '关闭',
    scope: '上海徐汇旗舰店'
  },
  {
    id: 'LOG-003',
    time: '2026-07-15 09:00:00',
    operator: '王大伟',
    role: '系统管理员',
    item: '对销售顾问声音变声处理',
    changeFrom: '关闭',
    changeTo: '开启 (中度脱敏)',
    scope: '华东大区'
  }
];

export const UserPrivacySettings: React.FC = () => {
  const [config, setConfig] = useState<PrivacyConfigState>(DEFAULT_CONFIG);
  const [isPlayingDemo, setIsPlayingDemo] = useState(false);
  const [demoAudioType, setDemoAudioType] = useState<'original' | 'customer_anonymized' | 'consultant_anonymized' | 'customer_disabled'>('customer_anonymized');
  const [saveSuccessMessage, setSaveSuccessMessage] = useState(false);
  const [auditLogs, setAuditLogs] = useState<AuditLogItem[]>(MOCK_AUDIT_LOGS);

  const handleToggle = (key: keyof PrivacyConfigState) => {
    setConfig(prev => {
      const updated = { ...prev, [key]: !prev[key] };
      // If disableCustomerRecording is turned ON, customerVoiceAnonymization logic visual hint applies
      return updated;
    });
  };

  const handleSave = () => {
    setSaveSuccessMessage(true);
    const newLog: AuditLogItem = {
      id: `LOG-00${auditLogs.length + 1}`,
      time: new Date().toLocaleString('zh-CN', { hour12: false }),
      operator: 'Admin User',
      role: '旗舰店店长',
      item: '更新隐私策略配置',
      changeFrom: '旧策略',
      changeTo: `变声客户:${config.customerVoiceAnonymization ? '是' : '否'} | 禁采客户:${config.disableCustomerRecording ? '是' : '否'} | 变声顾问:${config.consultantVoiceAnonymization ? '是' : '否'}`,
      scope: config.selectedTarget
    };
    setAuditLogs([newLog, ...auditLogs]);
    setTimeout(() => {
      setSaveSuccessMessage(false);
    }, 3500);
  };

  const handleReset = () => {
    setConfig(DEFAULT_CONFIG);
  };

  const toggleDemoPlay = (type: typeof demoAudioType) => {
    if (isPlayingDemo && demoAudioType === type) {
      setIsPlayingDemo(false);
    } else {
      setDemoAudioType(type);
      setIsPlayingDemo(true);
    }
  };

  return (
    <div className="max-w-7xl mx-auto space-y-8 animate-fade-in pb-20">
      
      {/* Top Banner / Breadcrumb */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white dark:bg-slate-800 p-6 rounded-3xl border border-slate-200/80 dark:border-slate-700 shadow-xs">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1">
            <span>解决方案概览</span>
            <ChevronRight size={12} />
            <span className="text-primary-600 dark:text-primary-400">用户隐私配置</span>
          </div>
          <h1 className="text-2xl font-black text-slate-900 dark:text-white flex items-center gap-2.5">
            <Shield className="text-primary-600 dark:text-primary-400" size={26} />
            用户隐私配置
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            设置智能工牌合规录音模式、声音变声脱敏与客户声音采集策略，保障用户隐私与数据合规。
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <div className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 rounded-xl text-xs font-medium">
            <ShieldCheck size={16} />
            符合《个人信息保护法》与 GDPR 标准
          </div>

          <button
            onClick={handleReset}
            className="px-4 py-2 bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-200 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer"
          >
            <RotateCcw size={14} />
            重置为默认
          </button>

          <button
            onClick={handleSave}
            className="px-6 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-xl text-xs font-bold transition-all shadow-md shadow-primary-500/20 active:scale-95 flex items-center gap-1.5 cursor-pointer"
          >
            <Save size={14} />
            保存配置
          </button>
        </div>
      </div>

      {/* Toast Save Notification */}
      {saveSuccessMessage && (
        <div className="bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-200 px-5 py-3 rounded-2xl flex items-center justify-between shadow-sm animate-fade-in">
          <div className="flex items-center gap-2.5 text-xs font-bold">
            <CheckCircle2 size={18} className="text-emerald-600 dark:text-emerald-400 shrink-0" />
            <span>隐私策略配置已成功保存并同步下发至智能工牌终端硬件！</span>
          </div>
          <span className="text-[11px] font-mono text-emerald-600 dark:text-emerald-400">生效范围: {config.selectedTarget}</span>
        </div>
      )}

      {/* Main Grid Section: Core Privacy Settings */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Card 1: 对客户录音变声处理 */}
        <div className={`bg-white dark:bg-slate-800 rounded-3xl border transition-all shadow-xs p-6 flex flex-col justify-between relative overflow-hidden ${
          config.disableCustomerRecording 
            ? 'border-slate-200 dark:border-slate-700/60 opacity-60' 
            : config.customerVoiceAnonymization 
              ? 'border-primary-300 dark:border-primary-700 ring-2 ring-primary-500/10' 
              : 'border-slate-200/80 dark:border-slate-700'
        }`}>
          <div>
            {/* Header / Switch */}
            <div className="flex items-start justify-between gap-3 mb-4">
              <div className="flex items-center gap-3">
                <div className={`p-3 rounded-2xl ${
                  config.disableCustomerRecording 
                    ? 'bg-slate-100 dark:bg-slate-700 text-slate-400' 
                    : config.customerVoiceAnonymization 
                      ? 'bg-blue-500/15 text-blue-600 dark:text-blue-400' 
                      : 'bg-slate-100 dark:bg-slate-700 text-slate-500'
                }`}>
                  <UserX size={22} />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white">
                    对客户录音变声处理
                  </h3>
                  <span className="text-[11px] text-slate-400 dark:text-slate-500">
                    客户声纹特征混淆与实时脱敏
                  </span>
                </div>
              </div>

              {/* Toggle switch */}
              <label className={`relative inline-flex items-center cursor-pointer shrink-0 ${
                config.disableCustomerRecording ? 'cursor-not-allowed' : ''
              }`}>
                <input 
                  type="checkbox" 
                  checked={config.customerVoiceAnonymization && !config.disableCustomerRecording}
                  disabled={config.disableCustomerRecording}
                  onChange={() => handleToggle('customerVoiceAnonymization')}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer dark:bg-slate-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:after:border-slate-600 peer-checked:bg-blue-600"></div>
              </label>
            </div>

            {/* Description */}
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
              对工牌采集到的客户语音进行实时声纹重构与音高变调脱敏，保护客户的声音生物特征隐私，同时100%保留语义文本识别与NLP质检精准度。
            </p>

            {/* Warning if disabled by "不采集客户录音" */}
            {config.disableCustomerRecording ? (
              <div className="p-3 bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800/60 rounded-2xl flex items-center gap-2 text-amber-800 dark:text-amber-200 text-xs mt-2">
                <Info size={16} className="shrink-0 text-amber-600 dark:text-amber-400" />
                <span>当前已开启“不采集客户录音”，客户变声处理自动暂停。</span>
              </div>
            ) : (
              /* Detail options when enabled */
              config.customerVoiceAnonymization && (
                <div className="space-y-3 pt-3 border-t border-slate-100 dark:border-slate-700/60">
                  <div>
                    <label className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 mb-1.5 block">
                      变声模式算法
                    </label>
                    <div className="grid grid-cols-3 gap-1.5">
                      {[
                        { id: 'natural', label: '自然重构' },
                        { id: 'pitch_shift', label: '音高微调' },
                        { id: 'robotic', label: '电音模糊' }
                      ].map(mode => (
                        <button
                          key={mode.id}
                          onClick={() => setConfig(prev => ({ ...prev, customerAnonymizationMode: mode.id as any }))}
                          className={`py-1.5 px-2 text-[11px] font-medium rounded-xl border transition-all cursor-pointer ${
                            config.customerAnonymizationMode === mode.id
                              ? 'bg-blue-50 dark:bg-blue-950/60 border-blue-500 text-blue-600 dark:text-blue-300 font-bold'
                              : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700'
                          }`}
                        >
                          {mode.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between items-center text-[11px] text-slate-500 dark:text-slate-400 mb-1">
                      <span>变声强度调节</span>
                      <span className="font-mono font-bold text-slate-700 dark:text-slate-200">{config.customerPitchShiftLevel}%</span>
                    </div>
                    <input 
                      type="range" 
                      min="20" 
                      max="100" 
                      value={config.customerPitchShiftLevel}
                      onChange={(e) => setConfig(prev => ({ ...prev, customerPitchShiftLevel: Number(e.target.value) }))}
                      className="w-full accent-blue-600 cursor-pointer h-1.5 bg-slate-200 dark:bg-slate-700 rounded-lg"
                    />
                  </div>
                </div>
              )
            )}
          </div>

          {/* Bottom Audio Test Button */}
          <div className="pt-4 mt-4 border-t border-slate-100 dark:border-slate-700/60">
            <button
              onClick={() => toggleDemoPlay('customer_anonymized')}
              disabled={config.disableCustomerRecording || !config.customerVoiceAnonymization}
              className={`w-full py-2 px-3 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 border transition-all cursor-pointer ${
                config.disableCustomerRecording || !config.customerVoiceAnonymization
                  ? 'bg-slate-50 dark:bg-slate-800 text-slate-400 border-slate-200 dark:border-slate-700 cursor-not-allowed'
                  : isPlayingDemo && demoAudioType === 'customer_anonymized'
                    ? 'bg-blue-600 text-white border-blue-600 shadow-sm'
                    : 'bg-slate-50 dark:bg-slate-700/60 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 border-slate-200 dark:border-slate-600'
              }`}
            >
              {isPlayingDemo && demoAudioType === 'customer_anonymized' ? (
                <>
                  <Pause size={14} className="animate-pulse" /> 停止试听客户变声
                </>
              ) : (
                <>
                  <Volume2 size={14} /> 试听客户变声效果
                </>
              )}
            </button>
          </div>
        </div>

        {/* Card 2: 不采集客户录音 */}
        <div className={`bg-white dark:bg-slate-800 rounded-3xl border transition-all shadow-xs p-6 flex flex-col justify-between relative overflow-hidden ${
          config.disableCustomerRecording 
            ? 'border-rose-400 dark:border-rose-700 ring-2 ring-rose-500/10' 
            : 'border-slate-200/80 dark:border-slate-700'
        }`}>
          <div>
            {/* Header / Switch */}
            <div className="flex items-start justify-between gap-3 mb-4">
              <div className="flex items-center gap-3">
                <div className={`p-3 rounded-2xl ${
                  config.disableCustomerRecording 
                    ? 'bg-rose-500/15 text-rose-600 dark:text-rose-400' 
                    : 'bg-slate-100 dark:bg-slate-700 text-slate-500'
                }`}>
                  <MicOff size={22} />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white">
                    不采集客户录音
                  </h3>
                  <span className="text-[11px] text-slate-400 dark:text-slate-500">
                    客户方向单向静音与硬件物理阻断
                  </span>
                </div>
              </div>

              {/* Toggle switch */}
              <label className="relative inline-flex items-center cursor-pointer shrink-0">
                <input 
                  type="checkbox" 
                  checked={config.disableCustomerRecording}
                  onChange={() => handleToggle('disableCustomerRecording')}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer dark:bg-slate-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:after:border-slate-600 peer-checked:bg-rose-600"></div>
              </label>
            </div>

            {/* Description */}
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
              开启后，智能工牌硬件及双麦波束阵列将彻底阻断客户方向声道，仅单向采集销售顾问语音，系统完全不录制也不保存任何客户原始音频。
            </p>

            {/* Impact Banner */}
            <div className={`p-3.5 rounded-2xl border text-xs space-y-1.5 transition-all ${
              config.disableCustomerRecording
                ? 'bg-rose-50 dark:bg-rose-950/40 border-rose-200 dark:border-rose-800 text-rose-900 dark:text-rose-200'
                : 'bg-slate-50 dark:bg-slate-900/50 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400'
            }`}>
              <div className="flex items-center gap-1.5 font-bold">
                <AlertTriangle size={14} className={config.disableCustomerRecording ? 'text-rose-600 dark:text-rose-400' : 'text-slate-400'} />
                <span>开启影响说明：</span>
              </div>
              <ul className="list-disc list-inside space-y-1 text-[11px] leading-relaxed opacity-90">
                <li>客户音频文件将完全为空（不占存储空间）</li>
                <li>客户声纹情绪判断等声学指标不可用</li>
                <li>销售顾问单向质检与语义分析正常保持</li>
              </ul>
            </div>
          </div>

          {/* Bottom Audio Test Button */}
          <div className="pt-4 mt-4 border-t border-slate-100 dark:border-slate-700/60">
            <button
              onClick={() => toggleDemoPlay('customer_disabled')}
              className={`w-full py-2 px-3 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 border transition-all cursor-pointer ${
                isPlayingDemo && demoAudioType === 'customer_disabled'
                  ? 'bg-rose-600 text-white border-rose-600 shadow-sm'
                  : 'bg-slate-50 dark:bg-slate-700/60 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 border-slate-200 dark:border-slate-600'
              }`}
            >
              {isPlayingDemo && demoAudioType === 'customer_disabled' ? (
                <>
                  <Pause size={14} className="animate-pulse" /> 停止模拟单向采集
                </>
              ) : (
                <>
                  <VolumeX size={14} /> 模拟单向采集音频效果
                </>
              )}
            </button>
          </div>
        </div>

        {/* Card 3: 对销售顾问声音变声处理 */}
        <div className={`bg-white dark:bg-slate-800 rounded-3xl border transition-all shadow-xs p-6 flex flex-col justify-between relative overflow-hidden ${
          config.consultantVoiceAnonymization 
            ? 'border-indigo-300 dark:border-indigo-700 ring-2 ring-indigo-500/10' 
            : 'border-slate-200/80 dark:border-slate-700'
        }`}>
          <div>
            {/* Header / Switch */}
            <div className="flex items-start justify-between gap-3 mb-4">
              <div className="flex items-center gap-3">
                <div className={`p-3 rounded-2xl ${
                  config.consultantVoiceAnonymization 
                    ? 'bg-indigo-500/15 text-indigo-600 dark:text-indigo-400' 
                    : 'bg-slate-100 dark:bg-slate-700 text-slate-500'
                }`}>
                  <UserCheck size={22} />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white">
                    对销售顾问声音变声处理
                  </h3>
                  <span className="text-[11px] text-slate-400 dark:text-slate-500">
                    员工声纹隐匿与隐私保护
                  </span>
                </div>
              </div>

              {/* Toggle switch */}
              <label className="relative inline-flex items-center cursor-pointer shrink-0">
                <input 
                  type="checkbox" 
                  checked={config.consultantVoiceAnonymization}
                  onChange={() => handleToggle('consultantVoiceAnonymization')}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer dark:bg-slate-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:after:border-slate-600 peer-checked:bg-indigo-600"></div>
              </label>
            </div>

            {/* Description */}
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
              对销售顾问在接待服务过程中被工牌记录的声音应用音频变声与频域平移算法，防止声纹生物特征外泄与个人身份识别，保障员工劳动权益。
            </p>

            {/* Detail Options */}
            {config.consultantVoiceAnonymization && (
              <div className="space-y-3 pt-3 border-t border-slate-100 dark:border-slate-700/60">
                <div>
                  <label className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 mb-1.5 block">
                    顾问变声脱敏等级
                  </label>
                  <div className="grid grid-cols-3 gap-1.5">
                    {[
                      { id: 'mild', label: '轻度变调' },
                      { id: 'moderate', label: '中度脱敏' },
                      { id: 'heavy', label: '深度匿名' }
                    ].map(level => (
                      <button
                        key={level.id}
                        onClick={() => setConfig(prev => ({ ...prev, consultantAnonymizationMode: level.id as any }))}
                        className={`py-1.5 px-2 text-[11px] font-medium rounded-xl border transition-all cursor-pointer ${
                          config.consultantAnonymizationMode === level.id
                            ? 'bg-indigo-50 dark:bg-indigo-950/60 border-indigo-500 text-indigo-600 dark:text-indigo-300 font-bold'
                            : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700'
                        }`}
                      >
                        {level.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="p-2.5 bg-slate-50 dark:bg-slate-900/50 rounded-xl border border-slate-200/60 dark:border-slate-700 text-[11px] text-slate-500 dark:text-slate-400 flex items-center gap-2">
                  <Lock size={14} className="text-indigo-500 shrink-0" />
                  <span>系统仅保留变声后的录音导出全权限。</span>
                </div>
              </div>
            )}
          </div>

          {/* Bottom Audio Test Button */}
          <div className="pt-4 mt-4 border-t border-slate-100 dark:border-slate-700/60">
            <button
              onClick={() => toggleDemoPlay('consultant_anonymized')}
              disabled={!config.consultantVoiceAnonymization}
              className={`w-full py-2 px-3 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 border transition-all cursor-pointer ${
                !config.consultantVoiceAnonymization
                  ? 'bg-slate-50 dark:bg-slate-800 text-slate-400 border-slate-200 dark:border-slate-700 cursor-not-allowed'
                  : isPlayingDemo && demoAudioType === 'consultant_anonymized'
                    ? 'bg-indigo-600 text-white border-indigo-600 shadow-sm'
                    : 'bg-slate-50 dark:bg-slate-700/60 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 border-slate-200 dark:border-slate-600'
              }`}
            >
              {isPlayingDemo && demoAudioType === 'consultant_anonymized' ? (
                <>
                  <Pause size={14} className="animate-pulse" /> 停止试听顾问变声
                </>
              ) : (
                <>
                  <Volume2 size={14} /> 试听顾问变声效果
                </>
              )}
            </button>
          </div>
        </div>

      </div>

      {/* Audio Processing Interactive Simulator Panel */}
      <div className="bg-white dark:bg-slate-800 p-6 rounded-3xl border border-slate-200/80 dark:border-slate-700 shadow-xs space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 border-b border-slate-100 dark:border-slate-700/80 pb-3">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-primary-100 dark:bg-primary-950/60 text-primary-600 dark:text-primary-400 rounded-xl">
              <Sparkles size={18} />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                变声处理实时在线声学仿真播放器
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                试听不同音频变声脱敏策略下音频波形与声音效果差异
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {[
              { id: 'original', label: '原始未处理音频' },
              { id: 'customer_anonymized', label: '客户变声效果' },
              { id: 'consultant_anonymized', label: '顾问变声效果' },
              { id: 'customer_disabled', label: '客户静音单向效果' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => {
                  setDemoAudioType(tab.id as any);
                  setIsPlayingDemo(true);
                }}
                className={`px-3 py-1.5 text-xs font-semibold rounded-xl border transition-all cursor-pointer ${
                  demoAudioType === tab.id
                    ? 'bg-primary-600 text-white border-primary-600 shadow-2xs'
                    : 'bg-slate-50 dark:bg-slate-700/50 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-600 hover:bg-slate-100'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Player Controls & Animated Waveform */}
        <div className="p-4 bg-slate-900 text-white rounded-2xl flex flex-col md:flex-row items-center gap-6">
          <button
            onClick={() => setIsPlayingDemo(!isPlayingDemo)}
            className="w-12 h-12 rounded-2xl bg-primary-600 hover:bg-primary-500 text-white flex items-center justify-center shrink-0 shadow-lg shadow-primary-600/30 transition-all cursor-pointer active:scale-95"
          >
            {isPlayingDemo ? <Pause size={20} /> : <Play size={20} className="ml-0.5" />}
          </button>

          <div className="flex-1 w-full space-y-2">
            <div className="flex justify-between items-center text-xs">
              <span className="font-mono text-slate-300">
                当前模式：
                <strong className="text-primary-400 ml-1">
                  {demoAudioType === 'original' && '原始真实双声道'}
                  {demoAudioType === 'customer_anonymized' && '客户变声重构 (已应用声纹脱敏)'}
                  {demoAudioType === 'consultant_anonymized' && '顾问变声脱敏 (中度)'}
                  {demoAudioType === 'customer_disabled' && '单向采集 (客户声道已屏蔽)'}
                </strong>
              </span>
              <span className="font-mono text-slate-400">00:18 / 00:45</span>
            </div>

            {/* Simulated Animated Audio Waveform */}
            <div className="h-10 bg-slate-800/80 rounded-xl px-4 flex items-center justify-between gap-1 overflow-hidden border border-slate-700">
              {Array.from({ length: 48 }).map((_, idx) => {
                const isCustomerBar = idx % 2 === 0;
                let height = Math.floor(Math.sin(idx * 0.5) * 12 + 18);
                
                if (demoAudioType === 'customer_disabled' && isCustomerBar) {
                  height = 2; // Silent customer track
                }

                return (
                  <div
                    key={idx}
                    style={{ 
                      height: isPlayingDemo ? `${Math.max(4, (height + (idx % 3) * 5) % 36)}px` : `${height}px`,
                      transition: 'height 0.15s ease-in-out' 
                    }}
                    className={`w-1.5 rounded-full transition-all ${
                      isCustomerBar 
                        ? demoAudioType === 'customer_disabled' 
                          ? 'bg-slate-700' 
                          : demoAudioType === 'customer_anonymized' 
                            ? 'bg-blue-400' 
                            : 'bg-emerald-400'
                        : demoAudioType === 'consultant_anonymized' 
                          ? 'bg-indigo-400' 
                          : 'bg-amber-400'
                    }`}
                  />
                );
              })}
            </div>
          </div>

          <div className="flex items-center gap-3 text-xs text-slate-400 shrink-0 border-t md:border-t-0 md:border-l border-slate-800 pt-3 md:pt-0 md:pl-6">
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400"></span>
              <span>客户原声</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-blue-400"></span>
              <span>客户变声</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-indigo-400"></span>
              <span>顾问变声</span>
            </div>
          </div>
        </div>
      </div>

      {/* Scope & Advanced Privacy Settings Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        {/* Scope Selection Card */}
        <div className="bg-white dark:bg-slate-800 p-6 rounded-3xl border border-slate-200/80 dark:border-slate-700 shadow-xs space-y-4">
          <div className="flex items-center gap-2.5 border-b border-slate-100 dark:border-slate-700/80 pb-3">
            <div className="p-2 bg-blue-100 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 rounded-xl">
              <Building2 size={18} />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">配置应用生效层级</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">指定该隐私配置应用的部门、大区或具体门店</p>
            </div>
          </div>

          <div className="space-y-3">
            <div>
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5 block">
                管控应用维度
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: 'national', label: '全国统一默认' },
                  { id: 'region', label: '按大区独立设置' },
                  { id: 'store', label: '按门店独立设置' }
                ].map(item => (
                  <button
                    key={item.id}
                    onClick={() => setConfig(prev => ({ ...prev, scopeType: item.id as any }))}
                    className={`py-2 px-3 text-xs font-semibold rounded-xl border transition-all cursor-pointer ${
                      config.scopeType === item.id
                        ? 'bg-blue-600 text-white border-blue-600 shadow-2xs'
                        : 'bg-slate-50 dark:bg-slate-700/50 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-600'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5 block">
                选择目标主体
              </label>
              <select
                value={config.selectedTarget}
                onChange={(e) => setConfig(prev => ({ ...prev, selectedTarget: e.target.value }))}
                className="w-full bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-xl text-xs px-3 py-2 text-slate-800 dark:text-slate-100 outline-none focus:ring-2 focus:ring-blue-500"
              >
                {config.scopeType === 'national' && (
                  <option value="全国所有门店">全国所有授权品牌门店 (默认生效)</option>
                )}
                {config.scopeType === 'region' && (
                  <>
                    <option value="华东大区">华东大区 (辖下 42 家门店)</option>
                    <option value="华北大区">华北大区 (辖下 35 家门店)</option>
                    <option value="华南大区">华南大区 (辖下 28 家门店)</option>
                    <option value="西南大区">西南大区 (辖下 20 家门店)</option>
                  </>
                )}
                {config.scopeType === 'store' && (
                  <>
                    <option value="上海徐汇旗舰店">上海徐汇旗舰店 (STORE-001)</option>
                    <option value="北京朝阳体验中心">北京朝阳体验中心 (STORE-002)</option>
                    <option value="广州天河中心店">广州天河中心店 (STORE-003)</option>
                    <option value="成都锦江店">成都锦江店 (STORE-004)</option>
                  </>
                )}
              </select>
            </div>
          </div>
        </div>

        {/* Data Retention & Advanced Protection Card */}
        <div className="bg-white dark:bg-slate-800 p-6 rounded-3xl border border-slate-200/80 dark:border-slate-700 shadow-xs space-y-4">
          <div className="flex items-center gap-2.5 border-b border-slate-100 dark:border-slate-700/80 pb-3">
            <div className="p-2 bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 rounded-xl">
              <Lock size={18} />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">录音数据储存与防泄露合规</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">音频保存周期与导出水印脱敏设置</p>
            </div>
          </div>

          <div className="space-y-3.5">
            <div>
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5 block">
                云端音频存储留存上限
              </label>
              <div className="grid grid-cols-4 gap-2">
                {[30, 60, 90, 180].map(days => (
                  <button
                    key={days}
                    onClick={() => setConfig(prev => ({ ...prev, retentionDays: days }))}
                    className={`py-2 text-xs font-semibold rounded-xl border transition-all cursor-pointer ${
                      config.retentionDays === days
                        ? 'bg-emerald-600 text-white border-emerald-600 font-bold shadow-2xs'
                        : 'bg-slate-50 dark:bg-slate-700/50 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-600'
                    }`}
                  >
                    {days} 天
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-2 pt-1">
              <label className="flex items-center justify-between text-xs text-slate-700 dark:text-slate-300 font-medium cursor-pointer">
                <span>导出音频自动叠加追溯声学水印</span>
                <input 
                  type="checkbox" 
                  checked={config.autoWatermark}
                  onChange={() => setConfig(prev => ({ ...prev, autoWatermark: !prev.autoWatermark }))}
                  className="rounded text-emerald-600 accent-emerald-600 h-4 w-4"
                />
              </label>

              <label className="flex items-center justify-between text-xs text-slate-700 dark:text-slate-300 font-medium cursor-pointer">
                <span>高敏感词自动隐匿（身份证/银行卡/电话号码）</span>
                <input 
                  type="checkbox" 
                  checked={config.sensitiveWordFilter}
                  onChange={() => setConfig(prev => ({ ...prev, sensitiveWordFilter: !prev.sensitiveWordFilter }))}
                  className="rounded text-emerald-600 accent-emerald-600 h-4 w-4"
                />
              </label>
            </div>
          </div>
        </div>

      </div>

      {/* Audit Log Table Section */}
      <div className="bg-white dark:bg-slate-800 rounded-3xl border border-slate-200/80 dark:border-slate-700 shadow-xs overflow-hidden space-y-3">
        <div className="px-6 py-4 border-b border-slate-100 dark:border-slate-700/80 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <History size={18} className="text-slate-500 dark:text-slate-400" />
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">
              隐私配置变更审计日志 (Compliance Audit Trail)
            </h3>
          </div>
          <span className="text-xs text-slate-400 font-mono">
            已记录 {auditLogs.length} 条操作履历
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="bg-slate-50 dark:bg-slate-900/60 text-slate-500 dark:text-slate-400 border-b border-slate-100 dark:border-slate-700/60 font-semibold">
                <th className="py-3 px-6">日志编号</th>
                <th className="py-3 px-4">操作时间</th>
                <th className="py-3 px-4">操作人</th>
                <th className="py-3 px-4">变更配置项</th>
                <th className="py-3 px-4">变更前内容</th>
                <th className="py-3 px-4">变更后内容</th>
                <th className="py-3 px-6">应用目标范围</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-700/60 text-slate-700 dark:text-slate-300">
              {auditLogs.map((log) => (
                <tr key={log.id} className="hover:bg-slate-50/80 dark:hover:bg-slate-700/40 transition-colors">
                  <td className="py-3.5 px-6 font-mono text-slate-400">{log.id}</td>
                  <td className="py-3.5 px-4 font-mono">{log.time}</td>
                  <td className="py-3.5 px-4 font-medium">
                    {log.operator} <span className="text-[10px] text-slate-400">({log.role})</span>
                  </td>
                  <td className="py-3.5 px-4 font-semibold text-slate-900 dark:text-white">{log.item}</td>
                  <td className="py-3.5 px-4 text-slate-400 line-through">{log.changeFrom}</td>
                  <td className="py-3.5 px-4 font-bold text-emerald-600 dark:text-emerald-400">{log.changeTo}</td>
                  <td className="py-3.5 px-6 font-mono text-slate-500">{log.scope}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};

export default UserPrivacySettings;
