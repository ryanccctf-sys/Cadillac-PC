
import React, { useState, useRef } from 'react';
import { 
  Download, 
  ArrowLeft, 
  TrendingUp, 
  Target, 
  Users, 
  MessageSquare,
  ChevronRight,
  Info,
  Search,
  LayoutGrid,
  ListFilter,
  Award,
  Sparkles,
  X
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  Cell,
  PieChart,
  Pie,
  Legend
} from 'recharts';

const getLevel4Insights = (lvl1Name: string, lvl2Name: string, lvl3Name: string) => {
  if (lvl3Name.includes('后排腿部空间')) {
    return [
      { tag: '后排宽度拥挤', value: 310, ratio: '46%' },
      { tag: '地台中间过高', value: 180, ratio: '27%' },
      { tag: '后座坐垫偏短', value: 90, ratio: '13%' },
      { tag: '靠背挺拔过直', value: 60, ratio: '9%' },
      { tag: '安全带口硌人', value: 35, ratio: '5%' }
    ];
  }
  if (lvl3Name.includes('续航')) {
    return [
      { tag: '低温冬季打折', value: 390, ratio: '43%' },
      { tag: '表显里程虚标', value: 160, ratio: '18%' },
      { tag: '高速能耗偏高', value: 120, ratio: '13%' },
      { tag: '开除雾能耗大', value: 140, ratio: '16%' },
      { tag: '预热加热超时', value: 90, ratio: '10%' }
    ];
  }
  if (lvl3Name.includes('悬挂') || lvl3Name.includes('阻尼')) {
    return [
      { tag: '运动阻尼硬颠', value: 320, ratio: '45%' },
      { tag: '舒适低速晃荡', value: 170, ratio: '24%' },
      { tag: '路感隔离微音', value: 100, ratio: '14%' },
      { tag: '变道回弹拖慢', value: 80, ratio: '11%' },
      { tag: '大坑向外侧滑', value: 45, ratio: '6%' }
    ];
  }
  if (lvl3Name.includes('车机') || lvl3Name.includes('芯片')) {
    return [
      { tag: '开机等待黑屏', value: 350, ratio: '40%' },
      { tag: '弱网语音失控', value: 180, ratio: '21%' },
      { tag: '软件版本陈旧', value: 110, ratio: '13%' },
      { tag: '多层定位错乱', value: 130, ratio: '15%' },
      { tag: '无线充连接烫', value: 95, ratio: '11%' }
    ];
  }
  if (lvl3Name.includes('价格') || lvl3Name.includes('裸车')) {
    return [
      { tag: '不同店差异大', value: 410, ratio: '50%' },
      { tag: '强买高额车险', value: 170, ratio: '21%' },
      { tag: '多收出库服务', value: 109, ratio: '13%' },
      { tag: '补贴流程慢', value: 85, ratio: '10%' },
      { tag: '平台建档卡扣', value: 50, ratio: '6%' }
    ];
  }
  if (lvl3Name.includes('轮胎')) {
    return [
      { tag: '胎噪过于大', value: 240, ratio: '58%' },
      { tag: '缺装实体备胎', value: 72, ratio: '17%' },
      { tag: '官方换胎太贵', value: 42, ratio: '10%' },
      { tag: '雨天标线打滑', value: 35, ratio: '9%' },
      { tag: '宽纹底易夹石', value: 26, ratio: '6%' }
    ];
  }

  // Elegant Default fallback generator
  return [
    { tag: `${lvl3Name}频发`, value: 154, ratio: '32%' },
    { tag: `${lvl3Name}落差`, value: 114, ratio: '24%' },
    { tag: `${lvl3Name}期盼更新`, value: 92, ratio: '20%' },
    { tag: `${lvl3Name}抖动感`, value: 70, ratio: '14%' },
    { tag: `${lvl3Name}不经用`, value: 50, ratio: '10%' }
  ];
};

const getSentimentForTag = (tag: string) => {
  const cleanTag = tag.replace(/^AA\d+:\s*/, '');
  if (
    cleanTag.includes('宽敞') || 
    cleanTag.includes('省油') || 
    cleanTag.includes('舒适') || 
    cleanTag.includes('精准') || 
    cleanTag.includes('刚性') || 
    cleanTag.includes('静音') || 
    cleanTag.includes('高强度') ||
    cleanTag.includes('爆发力') ||
    cleanTag.includes('免唤醒') ||
    cleanTag.includes('温控效率') ||
    cleanTag.includes('达成率') ||
    (cleanTag.includes('大') && (cleanTag.includes('空间') || cleanTag.includes('容积')))
  ) {
    return { pos: 72, neu: 20, neg: 8 };
  }
  
  if (
    cleanTag.includes('拥挤') || 
    cleanTag.includes('过高') || 
    cleanTag.includes('偏短') || 
    cleanTag.includes('挺拔') || 
    cleanTag.includes('硌人') || 
    cleanTag.includes('打折') || 
    cleanTag.includes('虚标') || 
    cleanTag.includes('能耗大') || 
    cleanTag.includes('超时') || 
    cleanTag.includes('硬颠') || 
    cleanTag.includes('晃荡') || 
    cleanTag.includes('黑屏') || 
    cleanTag.includes('失控') || 
    cleanTag.includes('陈旧') || 
    cleanTag.includes('错乱') || 
    cleanTag.includes('连接烫') || 
    cleanTag.includes('强买') || 
    cleanTag.includes('服务') || 
    cleanTag.includes('换胎太贵') || 
    cleanTag.includes('打滑') || 
    cleanTag.includes('夹石') || 
    cleanTag.includes('不经用') || 
    cleanTag.includes('抖动感') || 
    cleanTag.includes('胎噪') || 
    cleanTag.includes('落差')
  ) {
    return { pos: 4, neu: 11, neg: 85 };
  }

  const hash = cleanTag.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const negVal = (hash % 35) + 40;  // 40% - 74%
  const posVal = (hash % 20) + 10;  // 10% - 29%
  const neuVal = 100 - negVal - posVal;
  return { pos: posVal, neu: neuVal, neg: negVal };
};

const getAISummaryForTag = (tag: string, lvl3Name: string) => {
  const cleanTag = tag.replace(/^AA\d+:\s*/, '');
  
  if (cleanTag.includes('后排宽度拥挤')) {
    return '多名车主反映车辆在后排坐满3位成年人时，肩部与肘部空间明显感到局促，尤其是长途出行时横向活动受限。';
  }
  if (cleanTag.includes('地台中间过高')) {
    return '后排中间通道有明显的凸起，高度约15-18cm，导致中间座位乘员腿部无法自然摆放，长途乘坐极易疲劳。';
  }
  if (cleanTag.includes('后座坐垫偏短')) {
    return '后排座椅对大腿前侧的支撑力不足，坐垫长度偏短，高个子乘客长时间乘坐时，腿部悬空感强、易疲劳。';
  }
  if (cleanTag.includes('靠背挺拔过直')) {
    return '后排座椅靠背角度倾向过于直立，且可调节范围有限，乘客反映缺乏险落感，身体不能处于放松微躺姿态。';
  }
  if (cleanTag.includes('安全带口硌人')) {
    return '后排座椅处的安全带插扣槽位外露突出，乘客在左右挪动或靠坐偏侧时容易硌痛身体，细节人体工学待优化。';
  }

  if (cleanTag.includes('低温冬季打折')) {
    return '北方冬季气温降至零下5度以下时，续航里程相比常温缩减达30%-45%，车辆热电池及暖风在低温下的负荷增加，损耗偏大。';
  }
  if (cleanTag.includes('表显里程虚标')) {
    return '仪表盘显示的剩余电量/续航里程在后半段（低于30%电量时）掉电速度远快于前半段，用户对行车里程安全感不足。';
  }
  if (cleanTag.includes('高速能耗偏高')) {
    return '车辆在时速110km/h以上的高速巡航下，风阻与电机能耗显著升高，百公里电耗突破22kWh，导致长途折损率增加。';
  }
  if (cleanTag.includes('开除雾能耗大')) {
    return '雨雪冬季天气车主启动前档风玻璃一键除雾功能后，由于制冷/热合用高负荷运转，瞬时功耗上升导致续航快速缩减。';
  }
  if (cleanTag.includes('预热加热超时')) {
    return '车主通过手机APP远程冷启动电池温控或乘员舱预热时，加热反应时间长达15-20分钟，且尚未出发即消耗数百分比底电。';
  }

  if (cleanTag.includes('运动阻尼硬颠')) {
    return '车辆悬挂在低速经过铺装破损面、井盖或减速带时，震动直接且明显地传回车身内部，硬朗的阻尼标定降低了家用品质感。';
  }
  if (cleanTag.includes('舒适低速晃荡')) {
    return '在连续缓速起伏路面或大角度过弯时，避震系统对车身多余摆动的抑制偏软，产生类似“开船”的忽晃感及轻微眩晕感。';
  }
  if (cleanTag.includes('路感隔离微音')) {
    return '车辆底盘及非金属件对高频振动与细碎路噪的吸收不够隔绝，车内极易传递轻微、高频的嗡嗡共鸣声或底盘空腔噪声。';
  }
  if (cleanTag.includes('变道回弹拖慢')) {
    return '在中高速（80km/h左右）紧急避让或快速变道时，弹簧与减震筒在首段压缩后的复位速度有半秒迟滞，车尾循迹稍感拖沓。';
  }
  if (cleanTag.includes('大坑向外侧滑')) {
    return '当单侧后轮在过弯中压过深坑、台阶等落差路面时，后轴会发生短促的横向抛跃或滑移抖动，导致循迹精度瞬间下降。';
  }

  if (cleanTag.includes('开机等待黑屏')) {
    return '车辆解闭锁上电后，中控和液晶仪表响应慢，有5-10秒左右的黑屏或品牌LOGO画面卡滞，部分批次OTA升级后卡死概率增高。';
  }
  if (cleanTag.includes('弱网语音失控')) {
    return '处于地库、断网或弱信号环境下时，由于车机端未能做好高频离线语音指令集包，直接导致导航、电台等常用控制均不可用。';
  }
  if (cleanTag.includes('软件版本陈旧')) {
    return '在用车主普遍不满自带的车载地图与聚合服务软件长年不予OTA更新维护，图标排版陈旧且缺少最新的红绿灯倒计时。';
  }
  if (cleanTag.includes('多层定位错乱')) {
    return '在高架桥、立交桥或立体停车场等重合复杂路段，车机导航定位经常无法判断车辆在高架上还是高架下，路线重新规划频繁。';
  }
  if (cleanTag.includes('无线充连接烫')) {
    return '手机放置在前排无线充电板上工作时，缺乏散热机制导致温度极高，常因手机过热保护而断充或报错卡顿。';
  }

  if (cleanTag.includes('不同店差异大')) {
    return '用户在多方店询价时，不同4S销售点的让利幅度、大客户返点及金融手续费存在几千到上万元不等的信息不透明差额。';
  }
  if (cleanTag.includes('强买高额车险')) {
    return '多地消费者投诉购车时被强行捆绑购买店内合作品质极高、总保费超常规千元以上的推荐指定险，否则无法低价提车。';
  }
  if (cleanTag.includes('多收出库服务')) {
    return '最终成交清单中常常被塞入诸如新车整备出库费、代办牌照工牌劳务费等不合理附加值费用，大幅增加了实际落地支出。';
  }
  if (cleanTag.includes('补贴流程慢')) {
    return '品牌官方承诺的旧车置换补贴或地贴礼金下发十分缓慢，审核机制复杂，通常需等待3到6个月的资金划拨。';
  }
  if (cleanTag.includes('平台建档卡扣')) {
    return '消费者在线上提交订单大客户方案建档审查时，后台系统流程卡塞且无人处理，导致提车日期无故顺延多日。';
  }

  if (cleanTag.includes('胎噪过于大')) {
    return '原配的低风阻低滚阻轮胎在大理石及硬质高架路面行驶时，胎面产生的啸叫声直接穿透底盘舱，对长途乘坐造成极大困扰。';
  }
  if (cleanTag.includes('缺装实体备胎')) {
    return '后备箱槽仅提供充气机与快修补胎液，忽略了郊外爆胎、胎壁割伤等不得不更换实体轮胎的刚性场景需求。';
  }
  if (cleanTag.includes('官方换胎太贵')) {
    return '售后工时定点更换单条定制规格胎报价过于高昂，较社会上常规品牌轮胎售价上浮50%-80%，增加车主后期更换成本。';
  }
  if (cleanTag.includes('雨天标线打滑')) {
    return '雨天高架白色分隔线及标线因排水花纹结构不足导致抓地瞬间缺失，车身有瞬间滑移，对驾驶员造成不安全感。';
  }
  if (cleanTag.includes('宽纹底易夹石')) {
    return '胎冠大花纹缝隙宽且材料硬，日常行驶时极易卡入中型碎石子，无法自动排出，且在行驶中产生高频率异响。';
  }

  return `多位车主针对该项反馈在日常使用中偶发其痛点，经大模型对其多次通话/求助记录做结构化识别，主要诉求为后续OTA或日常定期保养时能够由服务商进行指向性的软硬件调校调优。`;
};

const getSentimentSummariesForTag = (tagName: string) => {
  const name = tagName.split('-')[1] || tagName;
  
  if (tagName.includes('轮胎')) {
    return {
      pos: '【静音出色】多数车主对原厂配备的静音棉高性能轮胎在良好路面上的低滚阻和优秀静音表现感到满意，抓地力在日常驾驶中信心十足。',
      neu: '【规格关注】车主对胎压常态标准、四季胎与夏季胎的交替配置持有关注，普遍以日常询问轮胎寿命和正常胎压浮动为主。',
      neg: '【夹石硬颠】频繁反馈胎体花纹较宽，细碎碎石极易塞入胎缝并带来行驶共振异响，且轮胎在通过减速带时弹跳感偏硬；此外，售后渠道单条换胎工时及高昂定价增加后期维护负担。'
    };
  }
  if (tagName.includes('尾翼')) {
    return {
      pos: '【动感流线】车子尾部的空气动力学鸭尾/电动尾翼在高速升起时视觉冲击力极强，增添了浓郁的年轻化轿跑氛围，车主对该设计满意度高。',
      neu: '【开合频率】车主对尾翼日常随速自动开合的触发条件（如90km/h自动升起）以及在洗车模式下手动控制的逻辑进行咨询，功能整体平缓。',
      neg: '【偶发卡滞】部分车主反馈洗车后尾翼轴承有水渍易造成偶发闭合不紧，也有用户提及冬季严寒或有冰粒子时尾翼电动电机防夹过于敏感导致无法正常升起。'
    };
  }
  if (tagName.includes('格栅')) {
    return {
      pos: '【霸气科幻】前脸封闭式进气格栅和无边界星翼格栅辨识度极高，配合机盖线条在光影下质感上乘，高度符合其新能源/豪华燃油车的豪华调性。',
      neu: '【清洗细节】车主正常询问格栅缝隙被落叶或飞虫尸体覆盖后应如何用高压水枪清洗，属于正常车辆外观细心保洁维护习惯。',
      neg: '【塑料易损】部分用户对格栅底部大面积高亮熏黑漆面在跑高速后极易留下细碎石击小坑及发白划痕表示不甚满意，边缘缝隙也容易积攒污垢。'
    };
  }
  if (tagName.includes('轮毂')) {
    return {
      pos: '【视觉饱满】20寸双色多辐条轮毂视觉张力完美饱满，与车身整体俯冲线条配合相得益彰，烘托了强烈的新美学硬朗感。',
      neu: '【轮辐匹配】用户讨论是否有替换原厂轮毂罩以优化风阻的选项，大部分属于车友会群内轻度个性化升级咨询。',
      neg: '【起皮划伤】多位车主抱怨扁平比过低（如35/40）在大力马路牙子或不慎蹭到边缘时，银色切削面极易刮花脱漆。'
    };
  }
  if (tagName.includes('贯穿') || tagName.includes('灯') || tagName.includes('LED')) {
    return {
      pos: '【贯穿璀璨】贯穿式LED尾灯/大灯在夜间点亮后宛如流光星海，具有极强的连贯度与仪式感，流线流水点亮效果酷炫豪华。',
      neu: '【点亮设置】用户咨询如何在车机设置里关闭或启用前灯带常开功能，以迎合不同的地库欢迎或会车审美。',
      neg: '【缝隙水雾】极个别车主在梅雨季节洗车或大雨过后，观察到灯罩内部有细微水雾凝结，虽数分钟后能自行散去，但认为密封防尘防雾有待加强。'
    };
  }

  // Fallbacks
  return {
    pos: `【正面效能】车主反映在绝大多数正常使用场景中，该配属的【${name}】设计感强烈，感官档次极高，非常符合品质期望，极少遇到异常。`,
    neu: `【中性关注】用户主要就其细节规格、匹配选装及日常保养要点进行车友群常规话题互动，体验反馈较为均衡，无深度槽点。`,
    neg: `【痛点反馈】用户在少数细节工况下，抱怨该配置的日常打理难度大或有微小段落异响。后续改进若能针对防尘防老及触控反馈则满意度会进一步提升。`
  };
};

const CustomerFocus: React.FC = () => {
  const [selectedCompetitor, setSelectedCompetitor] = useState('奔驰 GLC');
  const [viewModeDetail, setViewModeDetail] = useState<'tabbed' | 'grid'>('tabbed');
  const [activeLevel1Idx, setActiveLevel1Idx] = useState(0);
  const [activeLevel2Idx, setActiveLevel2Idx] = useState(0);
  const [activeLevel3Idx, setActiveLevel3Idx] = useState(0);
  const [mobileStep, setMobileStep] = useState(0);
  const [viewModeRankings, setViewModeRankings] = useState<'tabbed' | 'grid'>('tabbed');
  const [activeRankingIdx, setActiveRankingIdx] = useState(0);
  const [rankingsSearchQuery, setRankingsSearchQuery] = useState('');
  const [selectedGridLvl3, setSelectedGridLvl3] = useState<{
    lvl1Title: string;
    lvl2Title: string;
    lvl3Name: string;
    value: number;
    color: string;
  } | null>(null);

  const [generatedSummaries, setGeneratedSummaries] = useState<Record<string, boolean>>({});
  const [generatingSummaries, setGeneratingSummaries] = useState<Record<string, boolean>>({});

  const triggerGenerateSummary = (tag: string) => {
    setGeneratingSummaries(prev => ({ ...prev, [tag]: true }));
    setTimeout(() => {
      setGeneratingSummaries(prev => ({ ...prev, [tag]: false }));
      setGeneratedSummaries(prev => ({ ...prev, [tag]: true }));
    }, 800);
  };

  const [step1ViewMode, setStep1ViewMode] = useState<'count' | 'sentiment'>('count');
  const [step2ViewMode, setStep2ViewMode] = useState<'count' | 'sentiment'>('count');

  const [expandedLvl3Idx, setExpandedLvl3Idx] = useState<number | null>(null);
  const [expandedGridStep3Idx, setExpandedGridStep3Idx] = useState<number | null>(null);

  // Refs for smooth element navigation on drilldown actions
  const level3PanelRef = useRef<HTMLDivElement>(null);

  // Smooth scroll helper when drilling down level 2 to level 3
  const handleLevel2Click = (originalIndex: number) => {
    setActiveLevel2Idx(originalIndex);
    setActiveLevel3Idx(0);
    setExpandedLvl3Idx(null);
    setMobileStep(1); // Set step 1 for mobile progressive layout
    
    setTimeout(() => {
      if (level3PanelRef.current) {
        level3PanelRef.current.scrollIntoView({ 
          behavior: 'smooth', 
          block: 'nearest' 
        });
      }
    }, 85);
  };

  // Smooth scroll helper when drilling down level 3 to level 4
  const handleLevel3Click = (idx: number) => {
    setActiveLevel3Idx(idx);
    setExpandedLvl3Idx(expandedLvl3Idx === idx ? null : idx);
  };

  const brandDistribution = [
    { name: '特斯拉', value: 862 },
    { name: '宝马', value: 696 },
    { name: '奥迪', value: 371 },
    { name: '蔚来', value: 171 },
    { name: '沃尔沃', value: 151 },
  ];

  const modelRanking = [
    { name: '奔驰 GLC', value: 862 },
    { name: '宝马 X5', value: 374 },
    { name: '宝马 3系', value: 149 },
    { name: '奥迪 Q5L', value: 140 },
    { name: '沃尔沃 XC60', value: 87 },
  ];

  const dynamicCategoriesHierarchy = [
    {
      title: '产品类',
      color: 'bg-indigo-600',
      activeColor: 'bg-indigo-600 text-white shadow-indigo-100 dark:shadow-none',
      bgLight: 'bg-indigo-50/50 dark:bg-indigo-950/20',
      borderLight: 'border-indigo-500/20 dark:border-indigo-500/30',
      textActive: 'text-indigo-600 dark:text-indigo-400',
      subCategories: [
        {
          title: '外观设计',
          color: 'bg-indigo-500',
          items: [
            { name: '外观设计-轮胎', value: 354 },
            { name: '外观设计-尾翼轮廓', value: 298 },
            { name: '外观设计-前脸格栅', value: 245 },
            { name: '外观设计-运动轮毂', value: 182 },
            { name: '外观设计-LED贯穿尾灯', value: 165 },
          ]
        },
        {
          title: '空间/实用',
          color: 'bg-emerald-500',
          items: [
            { name: '乘坐空间-后排腿部空间', value: 580 },
            { name: '储物空间-后备箱最大容积', value: 430 },
            { name: '储物空间-前排扶手箱', value: 390 },
            { name: '乘坐空间-头部富余高度', value: 310 },
            { name: '空间使用-后排座椅放倒', value: 220 },
          ]
        },
        {
          title: '质量/安全',
          color: 'bg-teal-500',
          items: [
            { name: '安全配置-高强度钢刚性车身', value: 610 },
            { name: '安全装备-六安全气囊防护', value: 540 },
            { name: '装配工艺-车门接缝精度水平', value: 480 },
            { name: '车内环保-异味控制与材料', value: 410 },
            { name: '被动安全-前防撞钢梁结构', value: 290 },
          ]
        },
        {
          title: '动力/能耗',
          color: 'bg-blue-500',
          items: [
            { name: '续航能力-纯电续航达成率', value: 670 },
            { name: '电机功率-双电机四驱爆发力', value: 520 },
            { name: '充电速度-超快充温控效率', value: 490 },
            { name: '日常能耗-高速巡航百公里能效', value: 380 },
            { name: '起步动力-平顺柔和响应时间', value: 310 },
          ]
        },
        {
          title: '底盘/舒适',
          color: 'bg-cyan-500',
          items: [
            { name: '悬挂调校-CDC连续软硬阻尼', value: 590 },
            { name: '隔音品质-双层夹胶玻璃静音', value: 510 },
            { name: '滤震效果-减速带过滤干脆度', value: 460 },
            { name: '悬挂支撑-过弯侧向侧倾抑制', value: 320 },
            { name: '指向手感-转向中心虚位精准', value: 270 },
          ]
        },
        {
          title: '智能/互联',
          color: 'bg-violet-500',
          items: [
            { name: '车机流畅-芯片高负载响应速度', value: 640 },
            { name: '语音唤醒-多音区免唤醒指令', value: 530 },
            { name: '智驾系统-高阶辅助变道汇入', value: 480 },
            { name: '蓝牙控车-手机启动空调响应', value: 350 },
            { name: '车载音响-高级声场调音单元', value: 290 },
          ]
        },
      ]
    },
    {
      title: '政策权益类',
      color: 'bg-primary-600',
      activeColor: 'bg-primary-600 text-white shadow-primary-200/50',
      bgLight: 'bg-primary-50/50 dark:bg-primary-950/20',
      borderLight: 'border-primary-500/20 dark:border-primary-500/30',
      textActive: 'text-primary-600 dark:text-primary-400',
      subCategories: [
        {
          title: '价格/权益',
          color: 'bg-primary-500',
          items: [
            { name: '落地价格-新车裸车指导价', value: 689 },
            { name: '置换政策-同品牌升级让利额', value: 464 },
            { name: '金融特惠-免息低首付政策', value: 427 },
            { name: '政企贴补贴-地方免购置税政策', value: 332 },
            { name: '车船退税-能效友好政府奖励', value: 243 },
          ]
        },
        {
          title: '服务/渠道',
          color: 'bg-purple-500',
          items: [
            { name: '销售效率-展厅专员对接讲解', value: 620 },
            { name: '维保承诺-整车核心部件质保', value: 490 },
            { name: '交付周期-车源现车调拨速度', value: 450 },
            { name: '增值权益-免费车机流量服务', value: 310 },
            { name: '用户共创-常态化车友会活动', value: 240 },
          ]
        },
      ]
    }
  ];

  const dynamicFocusRankings = [
    {
      title: '产品关注点排名',
      label: '产品',
      dimensions: 30,
      color: 'from-primary-600 to-primary-700 bg-gradient-to-r',
      textClass: 'text-primary-600',
      items: [
        { rank: 1, name: '功能配置', count: 2024 },
        { rank: 2, name: '座椅舒适性/功能性', count: 1674 },
        { rank: 3, name: '驾控性能', count: 1583 },
        { rank: 4, name: '外观设计', count: 1552 },
        { rank: 5, name: '智能科技', count: 1464 },
        { rank: 6, name: '车机系统/中控屏', count: 1443 },
        { rank: 7, name: '车辆安全性', count: 1409 },
        { rank: 8, name: '乘坐空间/轴距', count: 1311 },
        { rank: 9, name: '悬挂系统', count: 1241 },
        { rank: 10, name: '发动机性能', count: 1232 },
        { rank: 11, name: '内饰设计', count: 1222 },
      ]
    },
    {
      title: '政策/权益关注点排名',
      label: '政策/权益',
      dimensions: 6,
      color: 'from-indigo-600 to-indigo-700 bg-gradient-to-r',
      textClass: 'text-indigo-600',
      items: [
        { rank: 1, name: '新车价格', count: 2183 },
        { rank: 2, name: '试乘试驾服务体验', count: 1359 },
        { rank: 3, name: '售后服务', count: 1324 },
        { rank: 4, name: '交车周期', count: 1021 },
        { rank: 5, name: '品牌信誉', count: 639 },
        { rank: 6, name: '车辆保值率', count: 317 },
      ]
    },
    {
      title: '空间/实用关注点排名',
      label: '空间/实用',
      dimensions: 12,
      color: 'from-emerald-600 to-emerald-700 bg-gradient-to-r',
      textClass: 'text-emerald-600',
      items: [
        { rank: 1, name: '乘坐空间', count: 1850 },
        { rank: 2, name: '后备箱容积', count: 1430 },
        { rank: 3, name: '储物空间', count: 1210 },
        { rank: 4, name: '车身尺寸', count: 980 },
        { rank: 5, name: '空间拓展性', count: 750 },
        { rank: 6, name: '第二排进出便利性', count: 520 },
      ]
    },
    {
      title: '质量/安全关注点排名',
      label: '质量/安全',
      dimensions: 15,
      color: 'from-teal-600 to-teal-700 bg-gradient-to-r',
      textClass: 'text-teal-600',
      items: [
        { rank: 1, name: '车身刚性', count: 1910 },
        { rank: 2, name: '主动安全配置', count: 1440 },
        { rank: 3, name: '内饰环保异味', count: 1380 },
        { rank: 4, name: '装配工艺水平', count: 1110 },
        { rank: 5, name: '被动安全气囊', count: 990 },
        { rank: 6, name: '做工细节稳定性', count: 650 },
      ]
    },
    {
      title: '动力/能耗关注点排名',
      label: '动力/能耗',
      dimensions: 14,
      color: 'from-blue-600 to-blue-700 bg-gradient-to-r',
      textClass: 'text-blue-600',
      items: [
        { rank: 1, name: '续航里程', count: 1970 },
        { rank: 2, name: '电机系统功率', count: 1520 },
        { rank: 3, name: '充电速度体验', count: 1490 },
        { rank: 4, name: '百公里能耗', count: 1380 },
        { rank: 5, name: '动力平顺性', count: 1310 },
        { rank: 6, name: '电池组低温耐受度', count: 720 },
      ]
    },
    {
      title: '底盘/舒适关注点排名',
      label: '底盘/舒适',
      dimensions: 10,
      color: 'from-cyan-600 to-cyan-700 bg-gradient-to-r',
      textClass: 'text-cyan-600',
      items: [
        { rank: 1, name: '悬架软硬调节', count: 1590 },
        { rank: 2, name: '隔音降噪静谧性', count: 1510 },
        { rank: 3, name: '颠簸路段滤震', count: 1460 },
        { rank: 4, name: '拐弯支撑力', count: 1320 },
        { rank: 5, name: '转向精准度', count: 1270 },
        { rank: 6, name: '高速行驶稳定性', count: 830 },
      ]
    },
    {
      title: '智能/互联关注点排名',
      label: '智能/互联',
      dimensions: 18,
      color: 'from-violet-600 to-violet-700 bg-gradient-to-r',
      textClass: 'text-violet-600',
      items: [
        { rank: 1, name: '车机系统流畅度', count: 1640 },
        { rank: 2, name: '智能化语音助手', count: 1530 },
        { rank: 3, name: '自动辅助驾驶', count: 1480 },
        { rank: 4, name: '远程手机控车', count: 1350 },
        { rank: 5, name: '车载音响效果', count: 1290 },
        { rank: 6, name: '娱乐功能丰富度', count: 910 },
      ]
    },
    {
      title: '服务/渠道关注点排名',
      label: '服务/渠道',
      dimensions: 8,
      color: 'from-purple-600 to-purple-700 bg-gradient-to-r',
      textClass: 'text-purple-600',
      items: [
        { rank: 1, name: '金融贷款方案', count: 1620 },
        { rank: 2, name: '保养保修政策', count: 1490 },
        { rank: 3, name: '销售顾问专业度', count: 1450 },
        { rank: 4, name: '置换补贴政策', count: 1310 },
        { rank: 5, name: '俱乐部车主活动', count: 1240 },
        { rank: 6, name: '门店便利程度', count: 520 },
      ]
    },
  ];

  const demandMatch = [
    { name: '新车价格', customer: 2188, sales: 2076, match: 95 },
    { name: '功能配置', customer: 2028, sales: 1753, match: 86 },
    { name: '座椅舒适性/功能性', customer: 1676, sales: 1163, match: 69 },
    { name: '驾控性能', customer: 1586, sales: 1159, match: 73 },
    { name: '外观设计', customer: 1555, sales: 1221, match: 79 },
    { name: '智能科技', customer: 1465, sales: 1049, match: 72 },
    { name: '车机系统/中控屏', customer: 1445, sales: 833, match: 58 },
    { name: '车辆安全性', customer: 1409, sales: 621, match: 44 },
    { name: '试乘试驾服务体验', customer: 1365, sales: 1329, match: 97 },
    { name: '售后服务', customer: 1325, sales: 712, match: 54 },
  ];

  const COLORS = ['#6366f1', '#818cf8', '#a5b4fc', '#c7d2fe', '#e0e7ff'];

  return (
    <div className="space-y-8 animate-fade-in pb-10">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">竞品车型 & 客户关注点</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">客户提及相关竞品品牌 + 车型，归纳客户对于竞品关注点，了解客户真实想法，便于优化车型针对竞品的销售策略及宣传策略</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl text-sm font-medium hover:bg-gray-50 dark:hover:bg-slate-700 transition-colors">
          <Download size={16} />
          数据下载
        </button>
      </div>

      {/* Top Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-slate-800 p-6 rounded-3xl border border-gray-100 dark:border-slate-700 shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white">竞品品牌分布 TOP5</h3>
          </div>
          <div className="h-[250px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={brandDistribution} layout="vertical" margin={{ left: 40, right: 40 }}>
                <XAxis type="number" hide />
                <YAxis 
                  dataKey="name" 
                  type="category" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 12, fill: '#64748b' }}
                />
                <Tooltip cursor={{ fill: 'transparent' }} />
                <Bar dataKey="value" radius={[0, 4, 4, 0]} barSize={12}>
                  {brandDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-800 p-6 rounded-3xl border border-gray-100 dark:border-slate-700 shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white">竞品车型排行 TOP5</h3>
          </div>
          <div className="flex flex-col md:flex-row items-start gap-8">
            <div className="flex-1 w-full space-y-2">
              {modelRanking.map((item, index) => {
                const isSelected = item.name === selectedCompetitor;
                const maxVal = Math.max(...modelRanking.map(m => m.value));
                return (
                  <div 
                    key={item.name}
                    onClick={() => setSelectedCompetitor(item.name)}
                    className={`group relative px-4 py-3 rounded-xl transition-all cursor-pointer ${
                      isSelected 
                        ? 'bg-indigo-50/50 dark:bg-indigo-900/20 border-l-4 border-indigo-600' 
                        : 'hover:bg-gray-50 dark:hover:bg-slate-700/50 border-l-4 border-transparent'
                    }`}
                  >
                    <div className="flex justify-between items-center mb-2">
                      <span className={`text-sm font-bold ${isSelected ? 'text-indigo-900 dark:text-indigo-100' : 'text-gray-700 dark:text-gray-300'}`}>
                        {item.name}
                      </span>
                      <span className={`text-sm font-medium ${isSelected ? 'text-indigo-600' : 'text-gray-400'}`}>
                        {item.value}
                      </span>
                    </div>
                    <div className="h-1.5 w-full bg-gray-100 dark:bg-slate-700 rounded-full overflow-hidden">
                      <div 
                        className={`h-full rounded-full transition-all duration-500 ${isSelected ? 'bg-indigo-600' : 'bg-slate-400'}`}
                        style={{ width: `${(item.value / maxVal) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                );
              })}
            </div>
            
            <div className="w-full md:w-56 flex flex-col items-center justify-center pt-4">
              <div className="relative w-48 h-48">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={modelRanking}
                      innerRadius={65}
                      outerRadius={85}
                      paddingAngle={4}
                      dataKey="value"
                      stroke="none"
                    >
                      {modelRanking.map((entry, index) => (
                        <Cell 
                          key={`cell-${index}`} 
                          fill={entry.name === selectedCompetitor ? '#4f46e5' : COLORS[index % COLORS.length]} 
                          fillOpacity={entry.name === selectedCompetitor ? 1 : 0.3}
                        />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
                <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                  <span className="text-3xl font-bold text-gray-900 dark:text-white">
                    {Math.round((modelRanking.find(m => m.name === selectedCompetitor)?.value || 0) / modelRanking.reduce((acc, m) => acc + m.value, 0) * 100)}%
                  </span>
                  <span className="text-xs text-gray-400 mt-1">提及占比</span>
                </div>
              </div>
              <div className="mt-4 text-center">
                <p className="text-sm font-bold text-gray-900 dark:text-white">{selectedCompetitor}</p>
                <p className="text-xs text-gray-500">当前选中竞品</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Competitor Analysis Detail Section */}
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => {
                if (mobileStep > 0) {
                  setMobileStep(mobileStep - 1);
                }
              }}
              className="p-2 hover:bg-gray-100 dark:hover:bg-slate-700 rounded-full transition-colors"
            >
              <ArrowLeft size={20} className="text-gray-500" />
            </button>
            <div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                {selectedCompetitor} 深度关注点分析
              </h2>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                基于客户反馈的声学/物理特征多维情感及痛点指标深度挖掘
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-3 self-end sm:self-center">
            {/* View Mode Switcher */}
            <div className="flex bg-gray-100 dark:bg-slate-800 p-0.5 rounded-xl text-xs font-bold select-none border border-gray-150/50 dark:border-slate-700/60">
              <button
                onClick={() => setViewModeDetail('tabbed')}
                className={`px-3 py-1.5 rounded-lg transition-all ${
                  viewModeDetail === 'tabbed'
                    ? 'bg-white dark:bg-slate-700 text-indigo-600 dark:text-indigo-400 shadow-sm font-extrabold'
                    : 'text-gray-500 hover:text-gray-800 dark:hover:text-gray-200'
                }`}
              >
                穿透视图 (双栏)
              </button>
              <button
                onClick={() => setViewModeDetail('grid')}
                className={`px-3 py-1.5 rounded-lg transition-all ${
                  viewModeDetail === 'grid'
                    ? 'bg-white dark:bg-slate-700 text-indigo-600 dark:text-indigo-400 shadow-sm'
                    : 'text-gray-500 hover:text-gray-800 dark:hover:text-gray-200'
                }`}
              >
                网格分布 (平铺)
              </button>
            </div>
          </div>
        </div>

        {viewModeDetail === 'tabbed' ? (
          <div className="space-y-6">
            {/* 一级大类选择页签 */}
            <div className="flex flex-wrap items-center gap-4">
              {dynamicCategoriesHierarchy.map((lvl1, lvl1Idx) => {
                const isActive = activeLevel1Idx === lvl1Idx;
                const totalCountLabel = lvl1Idx === 0 ? '12,314' : '4,265';
                return (
                  <button
                    key={lvl1Idx}
                    onClick={() => {
                      setActiveLevel1Idx(lvl1Idx);
                      setActiveLevel2Idx(0);
                      setActiveLevel3Idx(0);
                      setMobileStep(0);
                    }}
                    className={`flex items-center gap-2.5 px-5 py-2.5 rounded-full transition-all duration-200 cursor-pointer text-sm font-extrabold ${
                      isActive
                        ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-100 dark:shadow-none'
                        : 'bg-white dark:bg-slate-800 border border-gray-150/70 dark:border-slate-700/60 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-slate-700/40'
                    }`}
                  >
                    <span className={`w-2 h-2 rounded-full ${isActive ? 'bg-white animate-pulse' : 'bg-indigo-600'}`}></span>
                    <span>{lvl1.title}</span>
                    <span className={`px-2 py-0.5 rounded-full text-[11px] font-black ${
                      isActive ? 'bg-white/20 text-white' : 'bg-gray-100 dark:bg-slate-700 text-gray-500 dark:text-gray-400'
                    }`}>
                      {totalCountLabel} 次提及
                    </span>
                  </button>
                );
              })}
            </div>

            {(() => {
              const currentLvl1 = dynamicCategoriesHierarchy[activeLevel1Idx];
              const subCategoriesRanked = currentLvl1.subCategories.map((sub, sIdx) => {
                const totalSum = sub.items.reduce((acc, x) => acc + x.value, 0);
                return { ...sub, originalIndex: sIdx, totalSum };
              }).sort((a, b) => b.totalSum - a.totalSum);

              const subCategoriesRankedTop5 = subCategoriesRanked.slice(0, 5);
              const maxLvl2Sum = Math.max(...subCategoriesRankedTop5.map(v => v.totalSum), 1);
              const totalLvl1Sum = subCategoriesRankedTop5.reduce((acc, v) => acc + v.totalSum, 0);
              const activeRankPos = subCategoriesRankedTop5.findIndex(x => x.originalIndex === activeLevel2Idx) + 1;
              const activeSub = currentLvl1.subCategories[activeLevel2Idx];

              const renderColumn1 = () => {
                return (
                  <div className="bg-white dark:bg-slate-800 rounded-3xl border border-gray-150/70 dark:border-slate-700 p-5 flex flex-col justify-between shadow-sm">
                    {/* Category rankings header & tools */}
                    <div className="space-y-4">
                      <div className="flex justify-between items-center bg-gray-50/50 dark:bg-slate-900/30 px-4 py-2.5 rounded-2xl border border-gray-150/50 dark:border-slate-800">
                        <div className="flex items-center gap-2">
                          <span className={`w-2.5 h-2.5 rounded-full ${currentLvl1.color}`}></span>
                          <span className="text-xs font-black text-gray-800 dark:text-gray-200">2级大类 TOP 5 穿透 (贡献占比)</span>
                        </div>
                        <div className="flex items-center gap-1.5 bg-gray-100 dark:bg-slate-800 p-0.5 rounded-lg border border-gray-150/30 dark:border-slate-700/40">
                          <button 
                            onClick={() => setStep1ViewMode('count')}
                            className={`px-2 py-1 text-[9px] font-bold rounded-md transition-all ${
                              step1ViewMode === 'count'
                                ? 'bg-white dark:bg-slate-700 text-indigo-600 dark:text-indigo-400 shadow-sm'
                                : 'text-gray-400 hover:text-gray-700'
                            }`}
                          >
                            频次占比
                          </button>
                          <button 
                            onClick={() => setStep1ViewMode('sentiment')}
                            className={`px-2 py-1 text-[9px] font-bold rounded-md transition-all ${
                              step1ViewMode === 'sentiment'
                                ? 'bg-white dark:bg-slate-700 text-indigo-600 dark:text-indigo-400 shadow-sm'
                                : 'text-gray-400 hover:text-gray-700'
                            }`}
                          >
                            情感雷达
                          </button>
                        </div>
                      </div>

                      <div className="space-y-3 max-h-[550px] overflow-y-auto pr-1">
                        {subCategoriesRankedTop5.map((sub, rankIdx) => {
                          const isSelected = sub.originalIndex === activeLevel2Idx;
                          const rank = rankIdx + 1;
                          const gaugeWidth = maxLvl2Sum > 0 ? (sub.totalSum / maxLvl2Sum) * 100 : 0;
                          const pctOfLvl1 = totalLvl1Sum > 0 ? (sub.totalSum / totalLvl1Sum) * 100 : 0;
                          const sent = getSentimentForTag(sub.title);
                          const isTop5 = rank <= 5;

                          return (
                            <div
                              key={sub.originalIndex}
                              onClick={() => handleLevel2Click(sub.originalIndex)}
                              className={`p-3.5 rounded-2xl cursor-pointer border transition-all duration-300 ${
                                isSelected 
                                  ? 'bg-indigo-50/50 dark:bg-indigo-950/25 border-indigo-500 dark:border-indigo-400 shadow-sm ring-2 ring-indigo-500/10 font-extrabold' 
                                  : 'bg-white dark:bg-slate-800 border-gray-100 dark:border-slate-700/60 hover:bg-gray-50/70 dark:hover:bg-slate-700/40 hover:scale-[1.01]'
                              }`}
                            >
                            <div className="flex items-center gap-3">
                              {/* Rank Medal */}
                              <div className="shrink-0">
                                {rank === 1 ? (
                                  <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-amber-400 to-yellow-600 text-white flex flex-col items-center justify-center shadow-md shadow-amber-300/30">
                                    <Sparkles size={11} className="animate-pulse" />
                                    <span className="text-[12px] font-black -mt-0.5">1</span>
                                  </div>
                                ) : rank === 2 ? (
                                  <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-slate-200 to-slate-400 text-slate-850 flex flex-col items-center justify-center shadow-md shadow-slate-350/20 border border-slate-300/30">
                                    <Award size={11} className="text-slate-600" />
                                    <span className="text-[12px] font-black -mt-0.5">2</span>
                                  </div>
                                ) : rank === 3 ? (
                                  <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-amber-600 to-amber-800 text-white flex flex-col items-center justify-center shadow-md shadow-amber-700/20">
                                    <Award size={11} />
                                    <span className="text-[12px] font-black -mt-0.5">3</span>
                                  </div>
                                ) : isTop5 ? (
                                  <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-indigo-500 to-primary-600 text-white flex items-center justify-center font-black text-sm shadow-md shadow-indigo-500/10">
                                    {rank}
                                  </div>
                                ) : (
                                  <div className="w-8 h-8 rounded-xl bg-gray-100 dark:bg-slate-700 text-gray-500 dark:text-gray-400 flex items-center justify-center font-bold text-xs border border-gray-150/40 dark:border-slate-600/50">
                                    {rank}
                                  </div>
                                )}
                              </div>

                              {/* Content Details */}
                              <div className="flex-1 min-w-0 space-y-1">
                                <div className="flex justify-between items-center">
                                  <h4 className="text-xs font-bold text-gray-900 dark:text-white flex items-center gap-1.5">
                                    <span className={`w-1.5 h-1.5 rounded-full ${sub.color || currentLvl1.color}`}></span>
                                    {sub.title}
                                  </h4>
                                  <span className="text-xs font-extrabold text-gray-900 dark:text-white shrink-0">
                                    {sub.totalSum.toLocaleString()} <span className="font-normal text-[10px] text-gray-400">次</span>
                                  </span>
                                </div>

                                {step1ViewMode === 'count' ? (
                                  /* Gauge Bar */
                                  <div className="flex items-center gap-2">
                                    <div className="h-1 bg-gray-100 dark:bg-slate-700/40 rounded-full overflow-hidden flex-1">
                                      <div 
                                        className={`h-full rounded-full transition-all duration-500 ${
                                          isSelected ? 'bg-indigo-600 dark:bg-indigo-500' : 'bg-slate-400/80 dark:bg-slate-600'
                                        }`}
                                        style={{ width: `${gaugeWidth}%` }}
                                      ></div>
                                    </div>
                                    <span className="text-[10px] font-semibold text-gray-400 dark:text-gray-500 shrink-0">
                                      {Math.round(pctOfLvl1)}%
                                    </span>
                                  </div>
                                ) : (
                                  /* Sentiment Ratios Bar */
                                  <div className="space-y-1">
                                    <div className="h-2 w-full bg-gray-150/60 dark:bg-slate-700/30 rounded-full overflow-hidden flex">
                                      <div className="h-full bg-emerald-500 dark:bg-emerald-600" style={{ width: `${sent.pos}%` }}></div>
                                      <div className="h-full bg-slate-300 dark:bg-slate-500" style={{ width: `${sent.neu}%` }}></div>
                                      <div className="h-full bg-rose-500 dark:bg-rose-600" style={{ width: `${sent.neg}%` }}></div>
                                    </div>
                                    <div className="flex justify-between text-[8px] font-bold text-gray-400 dark:text-gray-500">
                                      <span className="text-emerald-500">正 {sent.pos}%</span>
                                      <span className="text-slate-500 dark:text-slate-400">中 {sent.neu}%</span>
                                      <span className="text-rose-500">负 {sent.neg}%</span>
                                    </div>
                                  </div>
                                )}
                              </div>

                              <div className="shrink-0 pl-1">
                                <ChevronRight 
                                  size={16} 
                                  className={`transition-transform duration-300 ${
                                    isSelected ? 'text-indigo-600 translate-x-1 font-bold' : 'text-gray-350'
                                  }`} 
                                />
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>


                </div>
              );
            };

            const renderColumn2 = () => {
                if (!activeSub) return (
                  <div className="bg-white dark:bg-slate-800 rounded-3xl border border-gray-150/70 dark:border-slate-700 p-6 flex flex-col items-center justify-center text-center">
                    <Info className="text-gray-400 mb-2" size={32} />
                    <p className="text-sm font-medium text-gray-500">请选择二级大类以穿透查看三级要素</p>
                  </div>
                );

                const activeSubItemsRankedTop5 = [...activeSub.items]
                  .sort((a, b) => b.value - a.value);

                const totalSubSum = activeSubItemsRankedTop5.reduce((acc, x) => acc + x.value, 0);
                const maxSubVal = Math.max(...activeSubItemsRankedTop5.map(x => x.value), 1);

                return (
                  <div ref={level3PanelRef} className="bg-white dark:bg-slate-800 rounded-3xl border border-gray-150/70 dark:border-slate-700 p-5 flex flex-col justify-between shadow-sm">
                    <div className="space-y-4">
                      {/* Mobile back button inside content if in step mode */}
                      <div className="lg:hidden flex items-center justify-between pb-1">
                        <button 
                          onClick={() => setMobileStep(0)}
                          className="flex items-center gap-1.5 text-xs font-bold text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/40 px-3.5 py-1.5 rounded-xl hover:bg-indigo-100 transition-colors"
                        >
                          <ChevronRight size={14} className="rotate-180 text-indigo-600" />
                          <span>返回：选择二级分类 (Step 1)</span>
                        </button>
                      </div>

                      <div className="flex justify-between items-center pb-2 border-b border-gray-100 dark:border-slate-700/60 gap-2">
                        <h3 className="text-sm font-black text-gray-950 dark:text-white">
                          {activeSub.title}・具体热词分布 (TOP 5)
                        </h3>
                        <div className="flex bg-gray-100 dark:bg-slate-700/60 p-0.5 rounded-lg text-[9.5px] font-extrabold select-none shrink-0 border border-gray-200/20">
                          <button 
                            onClick={(e) => { e.stopPropagation(); setStep2ViewMode('count'); }}
                            className={`px-2 py-0.5 rounded-md transition-all ${step2ViewMode === 'count' ? 'bg-white dark:bg-slate-600 text-indigo-600 dark:text-indigo-400 shadow-xs' : 'text-gray-400 dark:text-gray-400 hover:text-gray-800'}`}
                          >
                            次数
                          </button>
                          <button 
                            onClick={(e) => { e.stopPropagation(); setStep2ViewMode('sentiment'); }}
                            className={`px-2 py-0.5 rounded-md transition-all ${step2ViewMode === 'sentiment' ? 'bg-white dark:bg-slate-600 text-indigo-600 dark:text-indigo-400 shadow-xs' : 'text-gray-400 dark:text-gray-400 hover:text-gray-800'}`}
                          >
                            情感
                          </button>
                        </div>
                      </div>


                      <p className="text-xs text-gray-400 leading-relaxed">
                        包含的具体核心要素排行：
                      </p>

                      <div className="space-y-3 max-h-[550px] overflow-y-auto pr-1">
                        {activeSubItemsRankedTop5.map((item, idx) => {
                          const pctOfTotal = totalSubSum > 0 ? (item.value / totalSubSum) * 100 : 0;
                          const barWidthPct = (item.value / maxSubVal) * 100;
                          const isSelectedLvl3 = activeLevel3Idx === idx;
                          const isExpanded = expandedLvl3Idx === idx;
                          const s = getSentimentForTag(item.name);

                          return (
                            <div 
                              key={item.name} 
                              onClick={() => handleLevel3Click(idx)}
                              className={`p-3.5 rounded-2xl cursor-pointer border transition-all duration-300 ${
                                isExpanded
                                  ? 'bg-indigo-50/50 dark:bg-indigo-950/25 border-indigo-500 dark:border-indigo-400 shadow-sm ring-2 ring-indigo-500/10 font-extrabold'
                                  : 'bg-white dark:bg-slate-800 border-gray-100 hover:border-gray-200 dark:border-slate-700/60 hover:bg-gray-50/70 dark:hover:bg-slate-700/40 hover:scale-[1.01]'
                              } space-y-2 group`}
                            >
                              <div className="flex justify-between items-center text-xs">
                                <div className="flex items-center gap-2.5">
                                  <span className={`w-5 h-5 flex items-center justify-center rounded-lg text-[10px] font-black ${
                                    idx === 0 ? 'bg-amber-50 text-amber-800 border border-amber-200 dark:bg-amber-950/50 dark:text-amber-400 dark:border-amber-800/40 shadow-xs' :
                                    idx === 1 ? 'bg-slate-50 text-slate-700 border border-slate-200 dark:bg-slate-700 dark:text-slate-200 dark:border-slate-600 shadow-xs' :
                                    'bg-gray-50 text-gray-500 border border-gray-150 dark:bg-slate-700 dark:text-slate-400 dark:border-slate-700'
                                  }`}>
                                    {idx + 1}
                                  </span>
                                  <span className={`font-bold text-xs truncate max-w-[124px] xl:max-w-[150px] ${
                                    isExpanded ? 'text-indigo-600 dark:text-indigo-400' : 'text-gray-700 dark:text-gray-200 group-hover:text-indigo-600'
                                  }`}>
                                    {item.name}
                                  </span>
                                  <ChevronRight 
                                    size={12} 
                                    className={`text-gray-400 transition-transform duration-200 ${isExpanded ? 'rotate-90' : ''}`}
                                  />
                                </div>
                                <div className="flex items-center gap-1 shrink-0">
                                  <span className="font-extrabold text-gray-950 dark:text-white">
                                    {item.value} <span className="font-normal text-[9px] text-gray-400">次</span>
                                  </span>
                                  <span className="text-gray-400 dark:text-gray-500 text-[10px]">
                                    ({Math.round(pctOfTotal)}%)
                                  </span>
                                </div>
                              </div>
                              {step2ViewMode === 'count' ? (
                                <div className="h-1.5 bg-gray-100 dark:bg-slate-700/40 rounded-full overflow-hidden">
                                  <div 
                                    className={`h-full ${activeSub.color || currentLvl1.color} rounded-full transition-all duration-500 ease-out`} 
                                    style={{ width: `${barWidthPct}%` }}
                                  ></div>
                                </div>
                              ) : (
                                <div className="space-y-1">
                                  <div className="h-2 w-full bg-gray-150/60 dark:bg-slate-700/30 rounded-full overflow-hidden flex">
                                    <div className="h-full bg-emerald-500 dark:bg-emerald-600" style={{ width: `${s.pos}%` }}></div>
                                    <div className="h-full bg-slate-300 dark:bg-slate-500" style={{ width: `${s.neu}%` }}></div>
                                    <div className="h-full bg-rose-500 dark:bg-rose-600" style={{ width: `${s.neg}%` }}></div>
                                  </div>
                                  <div className="flex justify-between text-[8px] font-bold text-gray-400 dark:text-gray-500">
                                    <span className="text-emerald-500">正 {s.pos}%</span>
                                    <span className="text-slate-500 dark:text-slate-400 font-bold">中 {s.neu}%</span>
                                    <span className="text-rose-500">负 {s.neg}%</span>
                                  </div>
                                </div>
                              )}

                              {isExpanded && (
                                <div className="mt-3 pt-3 border-t border-dashed border-gray-100 dark:border-slate-800 animate-in fade-in slide-in-from-top-1 duration-200" onClick={(e) => e.stopPropagation()}>
                                  {generatedSummaries[item.name] ? (
                                    <div className="space-y-2 pt-1 text-xs font-normal">
                                      <div className="bg-emerald-50/45 dark:bg-emerald-950/15 p-2.5 rounded-xl border border-emerald-100/40 dark:border-emerald-900/30">
                                        <div className="flex items-center gap-1.5 mb-1">
                                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                                          <span className="font-extrabold text-[10.5px] text-emerald-700 dark:text-emerald-400">正向反馈热词摘要</span>
                                        </div>
                                        <p className="text-gray-600 dark:text-gray-300 text-[11px] leading-relaxed font-semibold">
                                          {getSentimentSummariesForTag(item.name).pos}
                                        </p>
                                      </div>

                                      <div className="bg-slate-100/60 dark:bg-slate-800/45 p-2.5 rounded-xl border border-slate-200/55 dark:border-slate-700/50">
                                        <div className="flex items-center gap-1.5 mb-1">
                                          <span className="w-1.5 h-1.5 rounded-full bg-slate-400 dark:bg-slate-500"></span>
                                          <span className="font-extrabold text-[10.5px] text-slate-700 dark:text-slate-300">中性关注热词摘要</span>
                                        </div>
                                        <p className="text-gray-600 dark:text-gray-300 text-[11px] leading-relaxed font-semibold">
                                          {getSentimentSummariesForTag(item.name).neu}
                                        </p>
                                      </div>

                                      <div className="bg-rose-50/45 dark:bg-rose-950/15 p-2.5 rounded-xl border border-rose-100/40 dark:border-rose-900/30">
                                        <div className="flex items-center gap-1.5 mb-1">
                                          <span className="w-1.5 h-1.5 rounded-full bg-rose-500"></span>
                                          <span className="font-extrabold text-[10.5px] text-rose-700 dark:text-rose-400">负向痛点热词摘要</span>
                                        </div>
                                        <p className="text-gray-600 dark:text-gray-300 text-[11px] leading-relaxed font-semibold">
                                          {getSentimentSummariesForTag(item.name).neg}
                                        </p>
                                      </div>
                                    </div>
                                  ) : (
                                    <div className="bg-gray-50/50 dark:bg-slate-800/30 rounded-xl p-3 border border-gray-100 dark:border-slate-800 flex items-center justify-between gap-3 shadow-xs">
                                      <div className="flex items-center gap-2.5 min-w-0">
                                        <Sparkles className="w-4 h-4 text-indigo-500 dark:text-indigo-400 shrink-0" />
                                        <div className="text-[11px] text-gray-500 dark:text-gray-400 leading-tight min-w-0">
                                          <span className="font-bold block text-gray-850 dark:text-gray-250 mb-0.5">三维情感AI一键提炼已就绪</span>
                                          <span className="truncate block text-gray-400">一键抽取此热词在车主通话中的正负向多维诉求</span>
                                        </div>
                                      </div>
                                      <button
                                        onClick={() => triggerGenerateSummary(item.name)}
                                        disabled={generatingSummaries[item.name]}
                                        className="flex items-center gap-1.5 px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-500/60 text-white rounded-lg text-xs font-bold transition-all shrink-0 cursor-pointer shadow-md active:scale-95 opacity-100 visible whitespace-nowrap relative z-10"
                                      >
                                        {generatingSummaries[item.name] ? (
                                          <>
                                            <svg className="animate-spin h-3 w-3 text-white" fill="none" viewBox="0 0 24 24">
                                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                            </svg>
                                            提炼中...
                                          </>
                                        ) : (
                                          <>
                                            <Sparkles size={12} />
                                            AI 摘要
                                          </>
                                        )}
                                      </button>
                                    </div>
                                  )}
                                </div>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </div>


                  </div>
                );
              };

              return (
                <div className="space-y-4">
                  {/* Stepper progress indicator for mobile */}
                  <div className="lg:hidden bg-white dark:bg-slate-800 p-2.5 rounded-2xl border border-gray-150/60 dark:border-slate-700/60 shadow-sm">
                    <div className="flex items-center justify-between gap-1 text-xs font-bold text-gray-400 dark:text-gray-500">
                      <button 
                        onClick={() => setMobileStep(0)}
                        className={`flex-1 py-2 px-1 text-center rounded-xl transition-all ${
                          mobileStep === 0
                            ? 'bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 font-extrabold shadow-sm'
                            : 'hover:text-indigo-600'
                        }`}
                      >
                        1. 二级大类 (TOP 5)
                      </button>
                      <ChevronRight size={12} className="text-gray-300 dark:text-gray-600" />
                      <button 
                        onClick={() => activeSub && setMobileStep(1)}
                        disabled={!activeSub}
                        className={`flex-1 py-2 px-1 text-center rounded-xl transition-all ${
                          mobileStep === 1
                            ? 'bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 font-extrabold shadow-sm'
                            : activeSub ? 'text-gray-700 dark:text-gray-300' : 'text-gray-300 dark:text-gray-600 cursor-not-allowed'
                        }`}
                      >
                        2. 三级明细 (TOP 5)
                      </button>
                    </div>
                  </div>

                  {/* Desktop Miller View */}
                  <div className="hidden lg:grid lg:grid-cols-2 gap-5 xl:gap-6 items-stretch animate-fade-in">
                    {renderColumn1()}
                    {renderColumn2()}
                  </div>

                  {/* Mobile Mobile Stepped View */}
                  <div className="lg:hidden animate-fade-in">
                    {mobileStep === 0 && renderColumn1()}
                    {mobileStep === 1 && renderColumn2()}
                  </div>
                </div>
              );
            })()}
          </div>
        ) : (
          <div className="space-y-10 animate-fade-in">
            {dynamicCategoriesHierarchy.map((lvl1, lvl1Idx) => {
              // Pre-calculate sums and ranks for Grid mode subcategories
              const subWithSums = lvl1.subCategories.map((sub, sIdx) => {
                const totalSum = sub.items.reduce((acc, x) => acc + x.value, 0);
                return { ...sub, sIdx, totalSum };
              }).sort((a, b) => b.totalSum - a.totalSum);

              return (
                <div key={lvl1Idx} className="space-y-5" style={{ contentVisibility: 'auto' }}>
                  {/* Level 1 Group Header inside Grid Mode */}
                  <div className="flex items-center gap-3 border-l-4 border-l-indigo-600 pl-3 py-1 bg-gray-50 dark:bg-slate-800/40 rounded-r-xl">
                    <h3 className="text-base font-extrabold text-gray-900 dark:text-white flex items-center gap-2">
                      <span className={`w-3 h-3 rounded-full ${lvl1.color}`}></span>
                      {lvl1.title} 
                    </h3>
                    <span className="text-[10px] font-bold text-gray-400 bg-white dark:bg-slate-800 px-2.5 py-0.5 border border-gray-150/50 dark:border-slate-700/60 rounded-full">
                      第 {lvl1Idx + 1} 一级大分类
                    </span>
                  </div>

                  {/* Level 2 Subcategories Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {lvl1.subCategories.map((category, catIdx) => {
                      // Find rank of this category in lvl 1 dynamically
                      const rankIdx = subWithSums.findIndex(x => x.sIdx === catIdx);
                      const rank = rankIdx !== -1 ? rankIdx + 1 : 1;
                      const isTop5 = rank <= 5;
                      const totalSumVal = category.items.reduce((acc, x) => acc + x.value, 0);

                      return (
                        <div key={catIdx} className="bg-white dark:bg-slate-800 p-6 rounded-3xl border border-gray-100 dark:border-slate-700 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
                          <div>
                            <h4 className="text-sm font-bold text-gray-900 dark:text-white mb-4 flex items-center justify-between border-b border-gray-50 dark:border-slate-700/50 pb-3">
                              <span className="flex items-center gap-2">
                                <span className={`w-2 h-2 rounded-full ${category.color || lvl1.color}`}></span>
                                {category.title}
                              </span>
                              <div className="flex items-center gap-1 shrink-0">
                                <span className={`text-[9.5px] px-1.5 py-0.5 rounded-md font-extrabold ${
                                  isTop5 ? 'bg-amber-100 text-amber-700 dark:bg-amber-950/40 dark:text-amber-400' : 'bg-gray-100 text-gray-500 dark:bg-slate-700/40 dark:text-gray-400'
                                }`}>
                                  排名 #{rank} {isTop5 && ' (TOP 5)'}
                                </span>
                              </div>
                            </h4>
                            
                            <div className="flex flex-wrap gap-2 pt-1 mb-2">
                              {[...category.items]
                                .sort((a, b) => b.value - a.value)
                                .slice(0, 5)
                                .map((item, idx) => {
                                  return (
                                    <div 
                                      key={item.name}
                                      onClick={() => {
                                        setSelectedGridLvl3({
                                          lvl1Title: lvl1.title,
                                          lvl2Title: category.title,
                                          lvl3Name: item.name,
                                          value: item.value,
                                          color: category.color || lvl1.color
                                        });
                                      }}
                                      className="px-2.5 py-1.5 rounded-xl text-xs font-bold border border-gray-100 dark:border-slate-700/60 hover:border-indigo-400 dark:hover:border-indigo-500 bg-gray-50/50 hover:bg-gray-100 dark:bg-slate-800/50 dark:hover:bg-slate-700 transition-all cursor-pointer flex items-center gap-1.5 group/pill shadow-sm"
                                    >
                                      <span className="text-gray-700 dark:text-gray-200 group-hover/pill:text-indigo-600 dark:group-hover/pill:text-indigo-400 font-extrabold">{item.name}</span>
                                      <span className="text-[9px] bg-white dark:bg-slate-700 text-gray-500 group-hover/pill:text-indigo-600 dark:group-hover/pill:text-indigo-400 border border-gray-100/60 dark:border-slate-600 px-1.5 py-0.5 rounded-md font-black shrink-0">
                                        {item.value}次
                                      </span>
                                    </div>
                                  );
                                })}
                            </div>
                          </div>
                          
                          <div className="mt-5 pt-3.5 border-t border-gray-100 dark:border-slate-700/40 flex justify-between items-center text-[10.5px] text-gray-400">
                            <span>维度：3级透视 (点击可下钻)</span>
                            <span className="font-bold text-gray-800 dark:text-gray-300">占比汇总: {totalSumVal.toLocaleString()}次</span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        )}
        {/* CUSTOM_CLEANUP_START */ /*
                                .sort((a, b) => b.value - a.value)
                                .slice(0, 5)
                                .map((item, idx) => {
                                  return (
                                    <div 
                                      key={item.name}
                                      onClick={() => {
                                        setSelectedGridLvl3({
                                          lvl1Title: lvl1.title,
                                          lvl2Title: category.title,
                                          lvl3Name: item.name,
                                          value: item.value,
                                          color: category.color || lvl1.color
                                        });
                                      }}
                                      className="px-2.5 py-1.5 rounded-xl text-xs font-bold border border-gray-100 dark:border-slate-700/60 hover:border-indigo-400 dark:hover:border-indigo-500 bg-gray-50/50 hover:bg-slate-50/80 dark:bg-slate-800/50 dark:hover:bg-slate-700 transition-all cursor-pointer flex items-center gap-1.5 group/pill shadow-sm"
                                    >
                                      <span className="text-gray-700 dark:text-gray-200 group-hover/pill:text-indigo-600 dark:group-hover/pill:text-indigo-400 font-extrabold">{item.name}</span>
                                      <span className="text-[9px] bg-white dark:bg-slate-700 text-gray-500 group-hover/pill:text-indigo-600 dark:group-hover/pill:text-indigo-400 border border-gray-100/60 dark:border-slate-600 px-1.5 py-0.5 rounded-md font-black shrink-0">
                                        {item.value}次
                                      </span>
                                    </div>
                                  );
                                })}
                            </div>
                          </div>
                          
                          <div className="mt-5 pt-3.5 border-t border-gray-100 dark:border-slate-700/40 flex justify-between items-center text-[10.5px] text-gray-400">
                            <span>维度：3级透视 (点击可下钻)</span>
                            <span className="font-bold text-gray-800 dark:text-gray-300">占比汇总: {totalSumVal.toLocaleString()}次</span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        )*/}

        {/* Selected Grid Item level 4 popover drawer modal details */}
        {selectedGridLvl3 && (() => {
          const info = selectedGridLvl3;
          const rawIns = getLevel4Insights(info.lvl1Title, info.lvl2Title, info.lvl3Name);
          const top5Ins = rawIns.slice(0, 5);
          const maxVal = Math.max(...top5Ins.map(ins => ins.value), 1);
          
          return (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
              {/* Backdrop */}
              <div 
                className="absolute inset-0 bg-gray-950/40 backdrop-blur-sm transition-opacity"
                onClick={() => setSelectedGridLvl3(null)}
              ></div>
              
              {/* Modal Content */}
              <div className="relative bg-white dark:bg-slate-900 rounded-3xl border border-gray-150/85 dark:border-slate-800 shadow-2xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in-95 duration-250">
                {/* Header */}
                <div className="p-6 pb-4 border-b border-gray-100 dark:border-slate-800/60 flex justify-between items-start">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-[9px] font-black tracking-widest text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/40 px-2.5 py-0.5 rounded uppercase">
                        {info.lvl2Title}
                      </span>
                      <span className="text-gray-300 dark:text-gray-600">/</span>
                      <span className="text-[9px] font-black text-gray-500">
                        三级下钻：{info.lvl3Name}
                      </span>
                    </div>
                    <h3 className="text-sm font-black text-gray-950 dark:text-white flex items-center gap-2">
                      <span className={`w-2.5 h-2.5 rounded-full ${info.color}`}></span>
                      {info.lvl3Name}・微观细分归因词
                    </h3>
                  </div>
                  <button 
                    onClick={() => setSelectedGridLvl3(null)}
                    className="p-1.5 rounded-xl hover:bg-gray-100 dark:hover:bg-slate-800 text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition-colors"
                  >
                    <X size={18} />
                  </button>
                </div>
                
                {/* List */}
                <div className="p-6 space-y-4">
                  <div className="space-y-3">
                    {top5Ins.map((ins, insIdx) => {
                      const cleanTagName = ins.tag.replace(/^AA\d+:\s*/, '');
                      const sent = getSentimentForTag(ins.tag);
                      const isExpanded = expandedGridStep3Idx === insIdx;
                      
                      return (
                        <div 
                          key={insIdx} 
                          onClick={() => setExpandedGridStep3Idx(isExpanded ? null : insIdx)}
                          className={`p-3.5 rounded-2xl border transition-all duration-200 cursor-pointer select-none ${
                            isExpanded 
                              ? 'border-emerald-250 dark:border-emerald-800 bg-emerald-50/5 dark:bg-emerald-950/5 shadow-xs' 
                              : 'border-gray-100 dark:border-slate-800 bg-gray-50/50 dark:bg-slate-950/30 hover:bg-gray-100/40 dark:hover:bg-slate-800/40 hover:scale-[1.01]'
                          } space-y-3`}
                        >
                          <div className="flex justify-between items-center text-xs">
                            <div className="flex items-center gap-2.5 min-w-0 flex-1">
                              <span className="w-5 h-5 flex items-center justify-center rounded-lg text-[9px] font-black bg-emerald-50 text-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-400 shrink-0">
                                {insIdx + 1}
                              </span>
                              <span className="font-bold text-xs text-gray-800 dark:text-gray-200 truncate">
                                {cleanTagName}
                              </span>
                              <ChevronRight 
                                size={12} 
                                className={`text-gray-400 transition-transform duration-200 ${isExpanded ? 'rotate-90' : ''}`}
                              />
                            </div>
                            <div className="flex items-center gap-1 shrink-0 ml-2">
                              <span className="font-extrabold text-gray-950 dark:text-white">
                                {ins.value} <span className="font-normal text-[9px] text-gray-400">次</span>
                              </span>
                              <span className="text-gray-450 dark:text-gray-500 text-[10px] font-semibold">
                                ({ins.ratio})
                              </span>
                            </div>
                          </div>

                          {/* Stacked Sentiment Slider */}
                          <div className="space-y-2 pt-0.5">
                            {/* Stacked bar */}
                            <div className="h-2 w-full bg-gray-200/50 dark:bg-slate-800 rounded-full overflow-hidden flex">
                              <div 
                                className="h-full bg-emerald-500 dark:bg-emerald-600 transition-all duration-500 ease-out" 
                                style={{ width: `${sent.pos}%` }}
                              ></div>
                              <div 
                                className="h-full bg-slate-300 dark:bg-slate-500 transition-all duration-500 ease-out" 
                                style={{ width: `${sent.neu}%` }}
                              ></div>
                              <div 
                                className="h-full bg-rose-500 dark:bg-rose-600 transition-all duration-500 ease-out" 
                                style={{ width: `${sent.neg}%` }}
                              ></div>
                            </div>
                            {/* Text ratio labels */}
                            <div className="flex items-center justify-between text-[9px] font-bold text-gray-400 dark:text-gray-500 px-0.5">
                              <span className="text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block"></span>
                                正向 {sent.pos}%
                              </span>
                              <span className="text-slate-500 dark:text-slate-400 flex items-center gap-1">
                                <span className="w-1.5 h-1.5 rounded-full bg-slate-300 dark:bg-slate-500 inline-block"></span>
                                中性 {sent.neu}%
                              </span>
                              <span className="text-rose-600 dark:text-rose-400 flex items-center gap-1">
                                <span className="w-1.5 h-1.5 rounded-full bg-rose-500 inline-block"></span>
                                负向 {sent.neg}%
                              </span>
                            </div>
                          </div>

                          {isExpanded && (
                            <div className="mt-3 pt-3 border-t border-dashed border-gray-100 dark:border-slate-800 animate-in fade-in slide-in-from-top-1 duration-200" onClick={(e) => e.stopPropagation()}>
                              {generatedSummaries[ins.tag] ? (
                                <div className="bg-emerald-55/40 dark:bg-emerald-950/20 rounded-xl p-3 border border-emerald-100/30 dark:border-emerald-900/10">
                                  <div className="flex items-start gap-2 text-[11px] leading-relaxed">
                                    <Sparkles className="w-3.5 h-3.5 text-emerald-500 dark:text-emerald-400 shrink-0 mt-0.5" />
                                    <div className="space-y-1">
                                      <span className="font-extrabold text-[9.5px] tracking-wider uppercase text-emerald-600 dark:text-emerald-400 block">
                                        会话原文摘要
                                      </span>
                                      <p className="font-medium text-gray-700 dark:text-gray-350">
                                        {getAISummaryForTag(ins.tag, info.lvl3Name)}
                                      </p>
                                    </div>
                                  </div>
                                </div>
                              ) : (
                                <div className="bg-gray-50/50 dark:bg-slate-800/30 rounded-xl p-3.5 border border-gray-100 dark:border-slate-800 flex items-center justify-between gap-3 shadow-xs">
                                  <div className="flex items-center gap-2.5 min-w-0">
                                    <Sparkles className="w-4 h-4 text-emerald-500 dark:text-emerald-400 shrink-0 animate-pulse" />
                                    <div className="text-[11px] text-gray-500 dark:text-gray-400 leading-tight min-w-0">
                                      <span className="font-bold block text-gray-800 dark:text-gray-250 mb-0.5">会话一键智能提炼已就绪</span>
                                      <span className="truncate block">深度学习解析此属性下的实际车主会话诉求</span>
                                    </div>
                                  </div>
                                  <button
                                    onClick={() => triggerGenerateSummary(ins.tag)}
                                    disabled={generatingSummaries[ins.tag]}
                                    className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 disabled:bg-emerald-500/60 text-white rounded-lg text-xs font-bold transition-all shrink-0 cursor-pointer shadow-md active:scale-95 opacity-100 visible whitespace-nowrap relative z-10"
                                  >
                                    {generatingSummaries[ins.tag] ? (
                                      <>
                                        <svg className="animate-spin h-3 w-3 text-white" fill="none" viewBox="0 0 24 24">
                                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                        </svg>
                                        提炼中...
                                      </>
                                    ) : (
                                      <>
                                        <Sparkles size={12} />
                                        AI 摘要
                                      </>
                                    )}
                                  </button>
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
                
                {/* Footer */}
                <div className="px-6 py-4 bg-gray-50/50 dark:bg-slate-950/50 border-t border-gray-100 dark:border-slate-800/40 flex justify-end items-center gap-2">
                  <span className="text-[10px] text-gray-400 mr-auto">细分穿透已完毕 (TOP 5)</span>
                  <button 
                    onClick={() => setSelectedGridLvl3(null)}
                    className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold shadow-sm transition-colors"
                  >
                    关闭
                  </button>
                </div>
              </div>
            </div>
          );
        })()}
      </section>

      {/* Main Focus Points Section */}
      <section className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">本品客户关注点</h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">客户主动提及本品关注点，由于分析维度庞大，支持多类目快速导览与词汇过滤</p>
          </div>
          <div className="flex items-center gap-3 self-end md:self-center">
            <button className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl text-sm font-medium hover:bg-gray-50 dark:hover:bg-slate-700 transition-colors">
              <Download size={16} />
              <span className="hidden md:inline">数据下载</span>
            </button>
          </div>
        </div>

        {viewModeRankings === 'tabbed' ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column - Category Sidebar List */}
            <div className="lg:col-span-1 space-y-2 bg-gray-50/50 dark:bg-slate-800/40 p-4 rounded-3xl border border-gray-100 dark:border-slate-700/60 max-h-[500px] overflow-y-auto">
              <div className="px-2 py-1 mb-2">
                <span className="text-[10px] font-extrabold text-gray-400 uppercase tracking-widest">属性类目清单</span>
              </div>
              {dynamicFocusRankings.map((cat, idx) => {
                const isSelected = activeRankingIdx === idx;
                return (
                  <button
                    key={idx}
                    onClick={() => {
                      setActiveRankingIdx(idx);
                      setRankingsSearchQuery(''); // reset search on category change
                    }}
                    className={`w-full flex items-center justify-between p-3.5 rounded-2xl text-left border transition-all ${
                      isSelected 
                        ? 'bg-white dark:bg-slate-700 border-gray-200 dark:border-slate-600 shadow-sm outline-none ring-2 ring-indigo-500/10' 
                        : 'bg-transparent border-transparent hover:bg-white/50 dark:hover:bg-slate-800/50'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className={`w-3 h-3 rounded-full bg-gradient-to-r ${cat.color}`}></span>
                      <div>
                        <p className={`text-xs font-bold ${isSelected ? 'text-gray-900 dark:text-white' : 'text-gray-700 dark:text-gray-400'}`}>
                          {cat.title.replace('关注点排名', '类')}
                        </p>
                        <p className="text-[9px] text-gray-405 dark:text-gray-400 mt-0.5">本品用户核心关注</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-1 text-xs">
                      <span className="px-2 py-0.5 bg-gray-100 dark:bg-slate-800 rounded-full font-bold text-gray-500 dark:text-gray-300 text-[10px]">
                        {cat.dimensions}个维度
                      </span>
                      <ChevronRight size={14} className="text-gray-405" />
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Right Column - Table Panel */}
            <div className="lg:col-span-2 bg-white dark:bg-slate-800 rounded-3xl border border-gray-100 dark:border-slate-700 shadow-sm overflow-hidden flex flex-col justify-between">
              {(() => {
                const cat = dynamicFocusRankings[activeRankingIdx];
                return (
                  <div>
                    {/* Header */}
                    <div className={`p-5 bg-gradient-to-r ${cat.color} text-white flex justify-between items-center`}>
                      <div>
                        <h4 className="font-extrabold text-base flex items-center gap-2">
                          <span className="w-1.5 h-1.5 bg-white rounded-full"></span>
                          {cat.title}
                        </h4>
                        <p className="text-xs text-white/80 mt-0.5">在该分析维度下，客户对本品真实反馈的提及频度</p>
                      </div>
                    </div>

                    <div className="overflow-x-auto">
                      <table className="w-full text-left">
                        <thead className="bg-slate-50 dark:bg-slate-700/50 text-slate-700 dark:text-slate-200 text-xs border-b border-gray-100 dark:border-slate-700">
                          <tr>
                            <th className="px-6 py-4 font-semibold w-24">序号</th>
                            <th className="px-6 py-4 font-semibold">客户关注点 - {cat.label}</th>
                            <th className="px-6 py-4 font-semibold text-right">提及数</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100 dark:divide-slate-700/50">
                          {cat.items.map((item, idx) => {
                            const maxVal = Math.max(...cat.items.map(it => it.count));
                            const scorePercentage = (item.count / maxVal) * 100;
                            return (
                              <tr key={item.rank} className="hover:bg-gray-50 dark:hover:bg-slate-700/30 transition-colors">
                                <td className="px-6 py-4 text-sm text-gray-500">
                                  {item.rank === 1 ? (
                                    <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-amber-400 text-white text-[11px] font-black shadow-sm shadow-amber-300">1</span>
                                  ) : item.rank === 2 ? (
                                    <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-slate-400 text-white text-[11px] font-black shadow-sm">2</span>
                                  ) : item.rank === 3 ? (
                                    <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-amber-700 text-white text-[11px] font-black shadow-sm">3</span>
                                  ) : (
                                    <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-gray-100 dark:bg-slate-700 text-gray-600 dark:text-gray-400 text-xs font-bold">{item.rank}</span>
                                  )}
                                </td>
                                <td className="px-6 py-4">
                                  <div className="space-y-1.5">
                                    <span className="text-sm font-semibold text-gray-800 dark:text-gray-200">{item.name}</span>
                                    {/* Horizontal heat indicator bar */}
                                    <div className="h-1 bg-gray-100 dark:bg-slate-700/40 rounded-full overflow-hidden w-40 sm:w-60">
                                      <div 
                                        className={`h-full bg-gradient-to-r ${cat.color} rounded-full`}
                                        style={{ width: `${scorePercentage}%` }}
                                      ></div>
                                    </div>
                                  </div>
                                </td>
                                <td className={`px-6 py-4 text-sm font-bold ${cat.textClass} text-right`}>{item.count}</td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  </div>
                );
              })()}
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 animate-fade-in">
            {dynamicFocusRankings.map((cat, idx) => (
              <div key={idx} className="bg-white dark:bg-slate-800 rounded-3xl border border-gray-100 dark:border-slate-700 shadow-sm overflow-hidden flex flex-col justify-between">
                <div>
                  <div className={`p-4 bg-gradient-to-r ${cat.color} text-white flex justify-between items-center`}>
                    <h4 className="font-bold flex items-center gap-2 text-sm">
                      <span className="w-1.5 h-1.5 bg-white rounded-full"></span>
                      {cat.title}
                    </h4>
                    <span className="text-[10px] opacity-95 bg-white/20 px-2 py-0.5 rounded-full font-medium shrink-0">
                      共 {cat.dimensions} 个维度
                    </span>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full text-left">
                      <thead className="bg-slate-55 dark:bg-slate-700/30 text-slate-700 dark:text-slate-200 text-[11px] border-b border-gray-100 dark:border-slate-700">
                        <tr>
                          <th className="px-4 py-2.5 font-semibold">序号</th>
                          <th className="px-4 py-2.5 font-semibold">客户关注点 - {cat.label}</th>
                          <th className="px-4 py-2.5 font-semibold text-right">提及数</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-100 dark:divide-slate-700/30">
                        {cat.items.map((item) => (
                          <tr key={item.rank} className="hover:bg-gray-50 dark:hover:bg-slate-700/20 transition-colors">
                            <td className="px-4 py-2.5 text-xs text-gray-500">{item.rank}</td>
                            <td className="px-4 py-2.5 text-xs font-semibold text-gray-700 dark:text-gray-300">{item.name}</td>
                            <td className={`px-4 py-2.5 text-xs font-extrabold ${cat.textClass} text-right`}>{item.count}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Demand Match Section */}
      <section className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">客户需求匹配</h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">梳理销售过程中客户关注点，并将客户主动提及数与销售顾问主动提及数进行对比，用于比对销售过程中，销售顾问对于客户需求点的 MATCH 度</p>
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl text-sm font-medium hover:bg-gray-50 dark:hover:bg-slate-700 transition-colors">
            <Download size={16} />
            数据下载
          </button>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-5 gap-6">
          <div className="xl:col-span-3 bg-white dark:bg-slate-800 rounded-3xl border border-gray-100 dark:border-slate-700 shadow-sm overflow-hidden">
            <div className="p-4 bg-primary-600 text-white flex justify-between items-center">
              <h4 className="font-bold flex items-center gap-2"><Target size={18} /> 关注点 TOP10</h4>
              <span className="text-xs font-bold bg-white/20 px-2 py-1 rounded">GAP RANKING</span>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-slate-800 text-white text-xs">
                  <tr>
                    <th className="px-6 py-4 font-medium">客户关注点</th>
                    <th className="px-6 py-4 font-medium">客户提及</th>
                    <th className="px-6 py-4 font-medium">销售提及</th>
                    <th className="px-6 py-4 font-medium text-right">匹配度</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 dark:divide-slate-700">
                  {demandMatch.map((item) => (
                    <tr key={item.name} className="hover:bg-gray-50 dark:hover:bg-slate-700/50 transition-colors">
                      <td className="px-6 py-4 text-sm font-medium text-gray-700 dark:text-gray-300">{item.name}</td>
                      <td className="px-6 py-4 text-sm text-gray-500">{item.customer}</td>
                      <td className="px-6 py-4 text-sm font-bold text-primary-600">{item.sales}</td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-3">
                          <div className="w-24 h-1.5 bg-gray-100 dark:bg-slate-700 rounded-full overflow-hidden hidden sm:block">
                            <div 
                              className={`h-full rounded-full ${item.match > 80 ? 'bg-emerald-500' : item.match > 60 ? 'bg-primary-500' : 'bg-amber-500'}`}
                              style={{ width: `${item.match}%` }}
                            ></div>
                          </div>
                          <span className="text-sm font-bold text-gray-900 dark:text-white w-10">{item.match}%</span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="xl:col-span-2 bg-white dark:bg-slate-800 p-6 rounded-3xl border border-gray-100 dark:border-slate-700 shadow-sm">
            <div className="flex items-center gap-2 mb-6">
              <TrendingUp size={18} className="text-primary-600" />
              <h3 className="text-lg font-bold text-gray-900 dark:text-white">缺口分析</h3>
            </div>
            <div className="h-[500px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart 
                  data={demandMatch} 
                  layout="vertical" 
                  margin={{ left: 80, right: 40 }}
                >
                  <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke="#f1f5f9" />
                  <XAxis type="number" hide />
                  <YAxis 
                    dataKey="name" 
                    type="category" 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fontSize: 11, fill: '#64748b' }}
                  />
                  <Tooltip 
                    cursor={{ fill: '#f8fafc' }}
                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                  />
                  <Legend verticalAlign="top" align="right" iconType="circle" />
                  <Bar name="客户提及" dataKey="customer" fill="#6366f1" radius={[0, 4, 4, 0]} barSize={10} />
                  <Bar name="销售提及" dataKey="sales" fill="#e2e8f0" radius={[0, 4, 4, 0]} barSize={10} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CustomerFocus;
