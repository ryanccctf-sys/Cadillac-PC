
import React from 'react';
import { 
  Cpu, 
  Mic, 
  BrainCircuit, 
  BarChart3, 
  ShieldCheck, 
  Zap, 
  ArrowRight,
  Battery,
  Wifi,
  Users,
  MessageSquare,
  Sparkles,
  ChevronRight,
  Monitor,
  FileText,
  UserCheck,
  // Added missing Target icon import
  Target,
  GraduationCap,
  Headphones
} from 'lucide-react';
import { Link } from 'react-router-dom';

const FeatureCard = ({ icon: Icon, title, description, color, to }: any) => {
  const CardContent = (
    <div className="bg-white dark:bg-slate-800 p-6 rounded-3xl shadow-lg border border-gray-100 dark:border-slate-700 hover:shadow-xl transition-all group overflow-hidden relative h-full">
      <div className={`absolute -right-4 -top-4 w-24 h-24 rounded-full ${color} opacity-10 group-hover:opacity-20 transition-opacity`}></div>
      <div className={`p-3 rounded-2xl ${color} bg-opacity-20 w-fit mb-4`}>
        <Icon className={`w-6 h-6 ${color.replace('bg-', 'text-')}`} />
      </div>
      <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">{title}</h3>
      <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed mb-4">{description}</p>
      {to && (
        <div className="flex items-center gap-1 text-xs font-bold text-primary-600 dark:text-primary-400 mt-auto group-hover:gap-2 transition-all">
          立即查看 <ChevronRight size={14} />
        </div>
      )}
    </div>
  );

  if (to) {
    return <Link to={to} className="block h-full">{CardContent}</Link>;
  }

  return CardContent;
};

const HardwareMetric = ({ icon: Icon, label, value }: any) => (
  <div className="flex items-center gap-3">
    <div className="p-2 bg-gray-100 dark:bg-slate-700 rounded-lg text-gray-500">
      <Icon size={18} />
    </div>
    <div>
      <p className="text-[10px] uppercase tracking-wider text-gray-400 font-bold">{label}</p>
      <p className="text-sm font-bold text-gray-700 dark:text-gray-200">{value}</p>
    </div>
  </div>
);

const SolutionOverview: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto space-y-12 animate-fade-in pb-20">
      
      {/* Hero Section */}
      <section className="relative rounded-[2.5rem] bg-gradient-to-br from-primary-700 via-primary-600 to-indigo-700 p-8 md:p-16 overflow-hidden shadow-2xl shadow-primary-500/20">
        <div className="absolute top-0 right-0 w-1/2 h-full opacity-10 pointer-events-none">
           <Cpu size={400} className="text-white" />
        </div>
        <div className="relative z-10 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md rounded-full text-white text-xs font-bold mb-6 border border-white/20">
            <Sparkles size={14} /> 汽车行业定制·会话智能专家
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-6 leading-tight">
            让每一场接待<br/>
            都成为成交的契机
          </h1>
          <p className="text-lg text-primary-100 mb-8 leading-relaxed">
            融合 4G 智能工牌硬件与多模态 AI 大模型技术，全量还原展厅接待现场，深度洞察客户需求，驱动门店业绩真实增长。
          </p>
          <div className="flex flex-wrap gap-4">
            <Link 
              to="/business-monitor"
              className="px-8 py-4 bg-white text-primary-600 rounded-2xl font-bold hover:bg-primary-50 transition-all shadow-xl active:scale-95 flex items-center gap-2"
            >
              开启业务大屏 <ArrowRight size={18} />
            </Link>
            <button className="px-8 py-4 bg-primary-500/30 backdrop-blur-sm text-white rounded-2xl font-bold border border-white/20 hover:bg-white/10 transition-all">
              了解硬件详情
            </button>
          </div>
        </div>
      </section>

      {/* Hardware & Cloud Synergy */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div className="space-y-8">
          <div>
            <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white mb-4">端云一体：全链路数字化接待</h2>
            <p className="text-gray-500 dark:text-gray-400">从佩戴工牌的那一刻起，智能接待之旅便已开启。无需手动录入，AI 自动完成所有繁杂工作。</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gray-50 dark:bg-slate-800/50 p-6 rounded-3xl border border-gray-100 dark:border-slate-700">
               <div className="flex items-center gap-3 mb-6">
                 <div className="w-10 h-10 rounded-xl bg-blue-500 flex items-center justify-center text-white shadow-lg shadow-blue-500/20">
                   <Mic size={20} />
                 </div>
                 <h4 className="font-bold text-gray-900 dark:text-white">智能 4G 硬件</h4>
               </div>
               <div className="space-y-4">
                 <HardwareMetric icon={Battery} label="续航能力" value="48小时超长待机" />
                 <HardwareMetric icon={Wifi} label="传输技术" value="4G 全网通实时上传" />
                 <HardwareMetric icon={ShieldCheck} label="安全保障" value="金融级加密芯片" />
                 <HardwareMetric icon={Cpu} label="降噪处理" value="AI 动态环境降噪" />
               </div>
            </div>

            <div className="bg-gray-50 dark:bg-slate-800/50 p-6 rounded-3xl border border-gray-100 dark:border-slate-700">
               <div className="flex items-center gap-3 mb-6">
                 <div className="w-10 h-10 rounded-xl bg-purple-500 flex items-center justify-center text-white shadow-lg shadow-purple-500/20">
                   <BrainCircuit size={20} />
                 </div>
                 <h4 className="font-bold text-gray-900 dark:text-white">AI 云端大脑</h4>
               </div>
               <div className="space-y-4">
                 <HardwareMetric icon={MessageSquare} label="识别能力" value="ASR+NLP 多模态理解" />
                 <HardwareMetric icon={Target} label="业务挖掘" value="购车意图与风险识别" />
                 <HardwareMetric icon={Zap} label="实时反馈" value="异常会话秒级告警" />
                 <HardwareMetric icon={BarChart3} label="管理分析" value="自动化日报/周报" />
               </div>
            </div>
          </div>
        </div>

        <div className="relative">
          {/* A Mock Image of the device or a stylized visual */}
          <div className="aspect-square bg-gradient-to-tr from-gray-100 to-white dark:from-slate-800 dark:to-slate-900 rounded-[3rem] shadow-2xl flex items-center justify-center border border-gray-200 dark:border-slate-700 relative overflow-hidden">
             <div className="absolute inset-0 opacity-20 pointer-events-none" style={{backgroundImage: 'radial-gradient(#6366f1 1px, transparent 1px)', backgroundSize: '24px 24px'}}></div>
             <div className="relative z-10 flex flex-col items-center">
                <div className="w-48 h-72 bg-slate-900 rounded-3xl border-4 border-slate-700 shadow-2xl flex flex-col items-center p-4 relative">
                   <div className="w-12 h-1 bg-slate-700 rounded-full mb-4"></div>
                   <div className="w-20 h-20 rounded-full bg-primary-600/20 flex items-center justify-center mb-6 border border-primary-500/30">
                      <Mic className="text-primary-500" size={32} />
                   </div>
                   <div className="space-y-2 w-full">
                      <div className="h-1 bg-slate-700 rounded-full w-3/4"></div>
                      <div className="h-1 bg-slate-700 rounded-full w-1/2"></div>
                      <div className="h-1 bg-slate-700 rounded-full w-2/3"></div>
                   </div>
                   <div className="absolute -bottom-4 bg-primary-600 text-white px-4 py-1 rounded-full text-[10px] font-bold shadow-lg">
                      ONLINE
                   </div>
                </div>
                <div className="mt-12 flex gap-4">
                   <div className="px-4 py-2 bg-white dark:bg-slate-700 rounded-xl shadow-sm border border-gray-100 dark:border-slate-600 text-xs font-bold text-gray-500">
                      ID: SM-8821
                   </div>
                   <div className="px-4 py-2 bg-white dark:bg-slate-700 rounded-xl shadow-sm border border-gray-100 dark:border-slate-600 text-xs font-bold text-green-500">
                      Battery: 92%
                   </div>
                </div>
             </div>
          </div>
        </div>
      </section>

      {/* Solutions Grid */}
      <section className="space-y-8">
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white mb-4">全业务场景解决方案</h2>
          <p className="text-gray-500 dark:text-gray-400">针对店长、销售、市场各角色痛点，提供闭环的数据服务</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <FeatureCard 
            icon={ShieldCheck}
            title="接待记录查询"
            description="面向经销端门店，追溯工牌客流与质检规则落地执行情况，针对有效/无效质检进行卡片式多维核查与缺陷根因分析。"
            color="bg-blue-600"
            to="/qc-defect-traceability"
          />
          <FeatureCard 
            icon={Users}
            title="接待记录查询-MAC"
            description="面向区域管理端，按时间段透视大区及MAC全部、展厅接待、试乘试驾的工牌接待量、有效质检接待量与无效质检接待量，并支持下钻门店与有效卡片详情。"
            color="bg-indigo-600"
            to="/reception-records-mac"
          />
          <FeatureCard 
            icon={Target}
            title="目标任务设置"
            description="自上而下设定总部、大区、小区及门店的经营指标目标值，实时同步报表考核基准。"
            color="bg-emerald-600"
            to="/target-task-settings"
          />
          <FeatureCard 
            icon={Monitor}
            title="门店全景监控"
            description="实时掌握展厅客流、顾问接待状态、设备在线情况，异常拥堵与离岗实时告警。"
            color="bg-blue-500"
            to="/badge-monitor"
          />
          <FeatureCard 
            icon={ShieldCheck}
            title="AI 会话质检"
            description="全量替代人工抽检，精准捕捉违规承诺、流程缺失、情绪冲突，提升服务标准。"
            color="bg-emerald-500"
            to="/quality-monitor"
          />
          <FeatureCard 
            icon={Target}
            title="线索深度挖掘"
            description="AI 自动提取对话中的客户预赛、意向车型、竞品对比点，自动生成客户画像。"
            color="bg-purple-500"
            to="/lead-library"
          />
          <FeatureCard 
            icon={BarChart3}
            title="精细化情报分析"
            description="汇聚 VOC 客户之声，分析竞品提及率、产品抱怨点、价格敏感度，辅助经营决策。"
            color="bg-amber-500"
            to="/voc-analysis"
          />
          <FeatureCard 
            icon={Users}
            title="员工绩效管理"
            description="多维度能力模型画像，针对性培训建议，通过数据发现每一位销冠的成长路径。"
            color="bg-indigo-500"
            to="/employee-capability"
          />
          <FeatureCard 
            icon={FileText}
            title="门店运营报告"
            description="自动化生成每日运营报告，涵盖客流转化、关键异常与管理建议，驱动闭环改进。"
            color="bg-rose-500"
            to="/store-daily-report"
          />
          <FeatureCard 
            icon={Zap}
            title="实战话术溯源"
            description="自动沉淀销冠成交话术，构建动态话术库，缩短新员工培养周期。"
            color="bg-pink-500"
            to="/script-library"
          />
          <FeatureCard 
            icon={BarChart3}
            title="凯迪拉克试驾报表"
            description="基于智能工牌统计试乘试驾标准流程执行率、智驾/语音/动力/底盘/泊车等核心维度细节及区域明细数据。"
            color="bg-sky-500"
            to="/cadillac-test-drive-report"
          />
          <FeatureCard 
            icon={ShieldCheck}
            title="延保无忧XX店"
            description="聚焦销售、交付、售后各环节延保无忧业务接待，精细掌控开始语、车险介绍、案例介绍等7项质检标准执行率。"
            color="bg-emerald-500"
            to="/yanbao-wuyou-store"
          />
          <FeatureCard 
            icon={UserCheck}
            title="延保无忧员工明细"
            description="查看时间范围内销售、交付、售后各岗位员工各项流程执行率与汇总执行率，并支持穿透查看单条接待明细及所在门店。"
            color="bg-cyan-600"
            to="/yanbao-wuyou-employee-detail"
          />
          <FeatureCard 
            icon={Users}
            title="内训师报表"
            description="聚焦门店内训师转训执行率与核心指标维度，提供门店级转训时间、培训覆盖率及考核明细和导出功能。"
            color="bg-teal-500"
            to="/internal-trainer-report"
          />
          <FeatureCard 
            icon={GraduationCap}
            title="转训/演练记录管理"
            description="全量管理门店内训师转训与销售顾问实战演练记录，支持现场实训视频、通关成绩单、签到表及现场抓拍等多模态附件归档。"
            color="bg-blue-600"
            to="/training-drill-records"
          />
          <FeatureCard 
            icon={Headphones}
            title="转训记录查看"
            description="面向总部视角，按凯迪拉克大区、小区及门店层级探查全国转训落地记录，支持在线回听质检全景录音与多模态附件调阅。"
            color="bg-emerald-600"
            to="/cadillac-training-records-hq"
          />
          <FeatureCard 
            icon={ShieldCheck}
            title="用户隐私配置"
            description="设置工牌录音对客户/顾问声音变声处理脱敏及不采集客户录音等合规策略，保障隐私与数据安全。"
            color="bg-indigo-600"
            to="/user-privacy-settings"
          />
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gray-900 dark:bg-slate-800 rounded-[2.5rem] p-12 text-center relative overflow-hidden border border-white/5 shadow-2xl">
         <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-primary-600 rounded-full opacity-10 blur-3xl"></div>
         <div className="absolute -top-20 -right-20 w-64 h-64 bg-indigo-600 rounded-full opacity-10 blur-3xl"></div>
         
         <div className="relative z-10 max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">准备好提升您的门店竞争力了吗？</h2>
            <p className="text-gray-400 mb-10 text-lg">已有超过 500+ 品牌授权门店通过智能工牌方案实现了接待流程标准化与业绩提升。</p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
               <button className="px-10 py-4 bg-primary-600 text-white rounded-2xl font-bold hover:bg-primary-700 transition-all shadow-xl shadow-primary-500/20">
                  立即申请试用
               </button>
               <button className="px-10 py-4 bg-white/5 text-white rounded-2xl font-bold border border-white/10 hover:bg-white/10 transition-all">
                  下载行业白皮书
               </button>
            </div>
         </div>
      </section>

    </div>
  );
};

export default SolutionOverview;
