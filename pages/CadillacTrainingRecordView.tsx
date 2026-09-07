import React, { useState, useMemo, useEffect, useRef } from 'react';
import {
  Search,
  Calendar,
  Filter,
  RotateCcw,
  Volume2,
  Play,
  Pause,
  Download,
  X,
  FileText,
  Video,
  FileSpreadsheet,
  Image as ImageIcon,
  CheckCircle2,
  Building2,
  MapPin,
  ChevronDown,
  ChevronRight,
  ExternalLink,
  Clock,
  Users,
  Eye,
  SlidersHorizontal,
  ChevronLeft,
  Headphones,
  Check,
  Tag,
  MessageSquare,
  Sparkles,
  ShieldCheck,
  AlertCircle,
  Copy,
  Plus,
  RefreshCw,
  Layers,
  Award,
  ArrowRight
} from 'lucide-react';

// --- Type Definitions ---
export interface CadillacTrainingRecord {
  id: string;
  date: string; // 转训日期 YYYY-MM-DD
  region: string; // 大区
  district: string; // 小区
  store: string; // 门店
  startTime: string; // 转训开始时间 YYYY-MM-DD HH:mm
  endTime: string; // 转训结束时间 YYYY-MM-DD HH:mm
  content: string; // 转训内容
  participants: string[]; // 参与人员
  trainerName: string; // 讲师
  creator: string; // 创建人
  audioFileName: string; // 场景录音文件名
  audioDurationStr: string; // 录音时长
  audioDurationSec: number; // 录音秒数
  receptionCode: string; // 接待编号 / 质检编号
  customerName: string; // 客户姓名/角色
  employeeName: string; // 员工/内训师姓名
  qualityScore: number; // 质检得分
  attachments: {
    video?: { name: string; size: string; uploadTime: string } | null;
    scoreReport?: { name: string; size: string; uploadTime: string } | null;
    signInSheet?: { name: string; size: string; uploadTime: string } | null;
    photos?: { name: string; size: string; uploadTime: string } | null;
  };
  assessmentSummary: {
    title: string;
    totalScore: number;
    items: Array<{
      name: string;
      hitRatio: string;
      hitPercent: number;
      score: number;
      details?: string[];
    }>;
  };
  dialogueList: Array<{
    id: string;
    speaker: 'customer' | 'employee';
    time: string;
    offsetSec: number;
    text: string;
    roleLabel: string;
    badgeLabel?: string;
  }>;
  tagCategories: Array<{
    category: string;
    color: string;
    bgColor: string;
    text: string;
  }>;
  sessionSummary?: {
    overview: string;
    keyPoints: string[];
    strengths: string[];
    weaknesses: string[];
  };
  salesAnalysis?: {
    talkRatio: { sales: number; customer: number };
    speechRate: string;
    hesitationCount: number;
    keySellingPointsCovered: string[];
  };
}

// --- Preset Cadillac Organizational Hierarchy ---
export const CADILLAC_REGIONS = ['全部大区', '东区', '南区', '西区', '北区', '中区'];

export const CADILLAC_DISTRICTS: Record<string, string[]> = {
  全部大区: ['全部小区', '华东一区(上海)', '华东二区(浙江)', '华东三区(江苏)', '华南一区(广东东部/深圳)', '华南二区(广佛及粤西)', '华南三区(闽赣)', '西南一区(川渝)', '西南二区(云贵)', '西北一区(陕甘宁)', '华北一区(京津冀)', '华北二区(晋鲁)', '东北一区(黑吉辽)', '华中一区(湖北)', '华中二区(湖南)', '华中三区(河南/安徽)'],
  东区: ['全部小区', '华东一区(上海)', '华东二区(浙江)', '华东三区(江苏)'],
  南区: ['全部小区', '华南一区(广东东部/深圳)', '华南二区(广佛及粤西)', '华南三区(闽赣)'],
  西区: ['全部小区', '西南一区(川渝)', '西南二区(云贵)', '西北一区(陕甘宁)'],
  北区: ['全部小区', '华北一区(京津冀)', '华北二区(晋鲁)', '东北一区(黑吉辽)'],
  中区: ['全部小区', '华中一区(湖北)', '华中二区(湖南)', '华中三区(河南/安徽)']
};

export const CADILLAC_STORES: Record<string, string[]> = {
  全部小区: ['全部门店', '凯迪拉克上海徐汇旗舰店', '凯迪拉克上海永达体验中心', '凯迪拉克上海东昌中心店', '凯迪拉克杭州西湖展示店', '凯迪拉克南京玄武体验中心', '凯迪拉克深圳南山旗舰店', '凯迪拉克广州天河中心店', '凯迪拉克北京朝阳旗舰店', '凯迪拉克成都锦江中心店', '凯迪拉克武汉汉口中心店'],
  '华东一区(上海)': ['全部门店', '凯迪拉克上海徐汇旗舰店', '凯迪拉克上海永达体验中心', '凯迪拉克上海东昌中心店'],
  '华东二区(浙江)': ['全部门店', '凯迪拉克杭州西湖展示店', '凯迪拉克宁波鄞州体验中心', '凯迪拉克温州鹿城旗舰店'],
  '华东三区(江苏)': ['全部门店', '凯迪拉克南京玄武体验中心', '凯迪拉克苏州园区旗舰店', '凯迪拉克无锡梁溪中心店'],
  '华南一区(广东东部/深圳)': ['全部门店', '凯迪拉克深圳南山旗舰店', '凯迪拉克深圳福田体验中心', '凯迪拉克东莞南城中心店'],
  '华南二区(广佛及粤西)': ['全部门店', '凯迪拉克广州天河中心店', '凯迪拉克佛山禅城展示店', '凯迪拉克中山石岐体验中心'],
  '华南三区(闽赣)': ['全部门店', '凯迪拉克福州仓山中心店', '凯迪拉克厦门思明旗舰店', '凯迪拉克南昌红谷滩展示店'],
  '西南一区(川渝)': ['全部门店', '凯迪拉克成都锦江中心店', '凯迪拉克重庆两江旗舰店', '凯迪拉克成都高新体验中心'],
  '西南二区(云贵)': ['全部门店', '凯迪拉克昆明盘龙中心店', '凯迪拉克贵阳观山湖旗舰店'],
  '西北一区(陕甘宁)': ['全部门店', '凯迪拉克西安高新体验中心', '凯迪拉克兰州城关中心店', '凯迪拉克银川金凤展示店'],
  '华北一区(京津冀)': ['全部门店', '凯迪拉克北京朝阳旗舰店', '凯迪拉克北京海淀中心店', '凯迪拉克天津和平体验店'],
  '华北二区(晋鲁)': ['全部门店', '凯迪拉克济南历下中心店', '凯迪拉克青岛市南旗舰店', '凯迪拉克太原小店体验中心'],
  '东北一区(黑吉辽)': ['全部门店', '凯迪拉克沈阳浑南旗舰店', '凯迪拉克长春净月中心店', '凯迪拉克大连中山体验店'],
  '华中一区(湖北)': ['全部门店', '凯迪拉克武汉汉口中心店', '凯迪拉克武汉光谷旗舰店', '凯迪拉克宜昌西陵体验店'],
  '华中二区(湖南)': ['全部门店', '凯迪拉克长沙岳麓体验中心', '凯迪拉克株洲天元中心店'],
  '华中三区(河南/安徽)': ['全部门店', '凯迪拉克郑州金水中心店', '凯迪拉克合肥蜀山旗舰店']
};

// --- Mock Headquarters Inspection Training Data ---
const MOCK_CADILLAC_RECORDS: CadillacTrainingRecord[] = [
  {
    id: 'TR-CAD-20260822-01',
    date: '2026-08-22',
    region: '东区',
    district: '华东一区(上海)',
    store: '凯迪拉克上海徐汇旗舰店',
    startTime: '2026-08-22 09:30',
    endTime: '2026-08-22 11:30',
    content: '全新XT5蜂鸟底盘与智能座舱差异化体验转训',
    participants: ['李四', '张伟', '王丽', '赵雪', '刘洋', '陈明', '孙晓刚'],
    trainerName: '王牌内训师-高建国',
    creator: '高建国',
    audioFileName: '20260726171700_SJ17410012_20260726172600',
    audioDurationStr: '28分10秒',
    audioDurationSec: 1690,
    receptionCode: 'QC20260319B4E392M9L1',
    customerName: '李女士',
    employeeName: '李四',
    qualityScore: 14,
    attachments: {
      video: { name: '20260822_全新XT5转训实录现场.mp4', size: '185.4 MB', uploadTime: '2026-08-22 11:45' },
      scoreReport: { name: '徐汇旗舰店蜂鸟底盘话术考核评分单.jpg', size: '2.8 MB', uploadTime: '2026-08-22 12:10' },
      signInSheet: { name: '8月22日徐汇店全员转训签到表.pdf', size: '1.2 MB', uploadTime: '2026-08-22 09:25' },
      photos: { name: '实操演练合影与通关照.png', size: '4.5 MB', uploadTime: '2026-08-22 11:35' }
    },
    assessmentSummary: {
      title: '别克GL8 ES陆尊(14分)',
      totalScore: 14,
      items: [
        { name: '展厅接待(2/4)', hitRatio: '50%', hitPercent: 50, score: 2, details: ['标准问候语 (达成)', '礼貌递送名片 (达成)', '佩戴工牌标准 (缺失)', '双手递名片 (缺失)'] },
        { name: '需求分析(5/6)', hitRatio: '83.33%', hitPercent: 83.33, score: 5, details: ['购车用途探寻 (达成)', '预算区间了解 (达成)', '家庭成员关注 (达成)', '置换意向挖掘 (达成)', '竞品对比偏好 (达成)', '决策人确认 (缺失)'] },
        { name: '邀约入车体验(1/1)', hitRatio: '100%', hitPercent: 100, score: 1, details: ['主动引导进入座舱体验 (达成)'] },
        { name: '主动开口留资(1/1)', hitRatio: '100%', hitPercent: 100, score: 1, details: ['规范主动开口获取客户微信/手机号 (达成)'] },
        { name: '邀约试驾(1/1)', hitRatio: '100%', hitPercent: 100, score: 1, details: ['主动发起动态试驾邀约 (达成)'] },
        { name: '购车款项(1/1)', hitRatio: '100%', hitPercent: 100, score: 1, details: ['权益与金融分期方案讲解完整 (达成)'] },
        { name: '产品介绍(3/5)', hitRatio: '60%', hitPercent: 60, score: 3, details: ['核心底盘卖点 (达成)', '静谧座舱体验 (达成)', '安全车身结构 (达成)', '车机智联交互 (未覆盖)', 'Super Cruise智驾辅助 (未覆盖)'] }
      ]
    },
    dialogueList: [
      { id: 'd1', speaker: 'customer', time: '2026-07-26 17:19:42', offsetSec: 2, text: '啊，对。', roleLabel: '客户' },
      { id: 'd2', speaker: 'employee', time: '2026-07-26 17:19:43', offsetSec: 5, text: '行，先给一下我的名片，我是店里的销售顾问李四。', roleLabel: '员工', badgeLabel: '销' },
      { id: 'd3', speaker: 'employee', time: '2026-07-26 17:19:47', offsetSec: 9, text: '李女士您怎么称呼？', roleLabel: '员工', badgeLabel: '销' },
      { id: 'd4', speaker: 'customer', time: '2026-07-26 17:19:48', offsetSec: 12, text: '姓李。', roleLabel: '客户' },
      { id: 'd5', speaker: 'employee', time: '2026-07-26 17:19:50', offsetSec: 15, text: '李女士您好！今天主要看咱家哪款车型呢？是看咱们豪华SUV全新XT5，还是轿车CT5？', roleLabel: '员工', badgeLabel: '销' },
      { id: 'd6', speaker: 'customer', time: '2026-07-26 17:19:56', offsetSec: 21, text: '我想看下XT5，家里需要大一点的空间，周末经常一家人自驾。', roleLabel: '客户' },
      { id: 'd7', speaker: 'employee', time: '2026-07-26 17:20:02', offsetSec: 27, text: '太有眼光了！全新XT5标配蜂鸟底盘，不管是城市通勤还是雨雪湿滑路面，滤震和抓地力都极其稳定。咱们先到展车里感受一下这个超大舒适座椅吧！', roleLabel: '员工', badgeLabel: '销' }
    ],
    tagCategories: [
      { category: '客户基础信息', text: '客户基础信息 - 身份(个人)', color: 'text-white', bgColor: 'bg-blue-600' },
      { category: '客户基础信息', text: '客户基础信息 - 购车阶段(了解阶段)', color: 'text-white', bgColor: 'bg-teal-600' },
      { category: '客户基础信息', text: '客户基础信息 - 客户类型(未提及)', color: 'text-white', bgColor: 'bg-rose-600' },
      { category: '意向相关信息', text: '意向相关信息 - 意向车型(凯迪拉克XT5/CT5豪华版)', color: 'text-white', bgColor: 'bg-orange-600' },
      { category: '意向相关信息', text: '意向相关信息 - 意向配置(未提及)', color: 'text-white', bgColor: 'bg-amber-600' },
      { category: '意向相关信息', text: '意向相关信息 - 意向动力(未提及)', color: 'text-white', bgColor: 'bg-emerald-600' },
      { category: '意向相关信息', text: '意向相关信息 - 意向外观/内饰(未提及)', color: 'text-white', bgColor: 'bg-purple-600' }
    ],
    sessionSummary: {
      overview: '接待过程中销售顾问李四整体节奏把控良好，完整递送名片并主动发起入车与试驾邀约，蜂鸟底盘卖点讲解清晰到位。',
      keyPoints: ['客户偏好大空间家用SUV', '重点关注底盘平顺度与安全性', '有竞品宝马X3与沃尔沃XC60比对意向'],
      strengths: ['主动留资意愿强烈且成功留存微信', '产品舒适度与静音性体验引导充分'],
      weaknesses: ['未主动深入确认最终出资与购车决策人', '车机智驾功能演练占比可进一步强化']
    },
    salesAnalysis: {
      talkRatio: { sales: 64, customer: 36 },
      speechRate: '210字/分钟 (平稳)',
      hesitationCount: 1,
      keySellingPointsCovered: ['蜂鸟底盘科技', 'Bose音响与ANC主动降噪', '高强度笼式车身', '专属金融免息与首保权益']
    }
  },
  {
    id: 'TR-CAD-20260821-02',
    date: '2026-08-21',
    region: '北区',
    district: '华北一区(京津冀)',
    store: '凯迪拉克北京朝阳旗舰店',
    startTime: '2026-08-21 14:00',
    endTime: '2026-08-21 16:00',
    content: 'IQ锐歌纯电平台与智能辅助驾驶标准话术演练',
    participants: ['周杰', '吴昊', '郑敏', '冯凯', '何洁', '韩东'],
    trainerName: '产品专家-林晓薇',
    creator: '林晓薇',
    audioFileName: '20260821141022_BJ098172_20260821143800',
    audioDurationStr: '32分45秒',
    audioDurationSec: 1965,
    receptionCode: 'QC20260821BJ8832K1',
    customerName: '张先生',
    employeeName: '周杰',
    qualityScore: 13,
    attachments: {
      video: { name: '朝阳店纯电IQ锐歌攻防演练实录.mp4', size: '210.2 MB', uploadTime: '2026-08-21 16:30' },
      scoreReport: { name: 'IQ纯电专属话术考核成绩单.jpg', size: '2.4 MB', uploadTime: '2026-08-21 17:00' },
      signInSheet: { name: '8月21日朝阳店签到表.pdf', size: '980 KB', uploadTime: '2026-08-21 13:55' },
      photos: null
    },
    assessmentSummary: {
      title: '凯迪拉克IQ锐歌纯电标准质检(14分)',
      totalScore: 13,
      items: [
        { name: '展厅接待(3/4)', hitRatio: '75%', hitPercent: 75, score: 3, details: ['标准问候', '名片递送', '工牌佩戴'] },
        { name: '需求分析(6/6)', hitRatio: '100%', hitPercent: 100, score: 6, details: ['家充桩安装条件', '日常通勤里程', '纯电续航关注'] },
        { name: '邀约入车体验(1/1)', hitRatio: '100%', hitPercent: 100, score: 1, details: ['环幕式超高清9K屏演示'] },
        { name: '主动开口留资(1/1)', hitRatio: '100%', hitPercent: 100, score: 1, details: ['留资成功'] },
        { name: '邀约试驾(1/1)', hitRatio: '100%', hitPercent: 100, score: 1, details: ['高架路况智驾体验邀约'] },
        { name: '购车款项(0/1)', hitRatio: '0%', hitPercent: 0, score: 0, details: ['未提及首批车主充电免费权益'] },
        { name: '产品介绍(1/1)', hitRatio: '100%', hitPercent: 100, score: 1, details: ['奥特能纯电平台安全标准'] }
      ]
    },
    dialogueList: [
      { id: 'd21', speaker: 'customer', time: '2026-08-21 14:15:10', offsetSec: 2, text: '你们这辆纯电锐歌续航实测到底能跑多少公里？', roleLabel: '客户' },
      { id: 'd22', speaker: 'employee', time: '2026-08-21 14:15:15', offsetSec: 7, text: '张先生您问得非常专业！咱们IQ锐歌基于通用奥特能平台，CLTC纯电续航高达653公里，实测达成率在行业领先。', roleLabel: '员工', badgeLabel: '销' },
      { id: 'd23', speaker: 'customer', time: '2026-08-21 14:15:24', offsetSec: 16, text: '电池安全怎么样？现在网上自燃的新闻挺多的。', roleLabel: '客户' },
      { id: 'd24', speaker: 'employee', time: '2026-08-21 14:15:30', offsetSec: 22, text: '奥特能平台采用航天级气凝胶隔热以及无线电池管理系统，历经远超国标的极端穿刺和撞击测试，安全是凯迪拉克百年的立身之本！', roleLabel: '员工', badgeLabel: '销' }
    ],
    tagCategories: [
      { category: '客户基础信息', text: '客户基础信息 - 身份(企业高管)', color: 'text-white', bgColor: 'bg-blue-600' },
      { category: '客户基础信息', text: '客户基础信息 - 购车阶段(对比阶段)', color: 'text-white', bgColor: 'bg-teal-600' },
      { category: '意向相关信息', text: '意向相关信息 - 意向车型(IQ锐歌标准续航豪华版)', color: 'text-white', bgColor: 'bg-orange-600' },
      { category: '意向相关信息', text: '意向相关信息 - 意向配置(AKG录音棚级音响)', color: 'text-white', bgColor: 'bg-amber-600' }
    ],
    sessionSummary: {
      overview: '纯电知识储备非常扎实，针对客户关心的三电安全与真实续航给出了具备说服力的专业解答。',
      keyPoints: ['客户关注电池安全与补能便利性', '对33英寸环幕屏有浓厚兴趣'],
      strengths: ['奥特能安全背书讲解清晰', '主动破除自燃焦虑'],
      weaknesses: ['未完整阐述终身免费车机流量权益']
    }
  },
  {
    id: 'TR-CAD-20260820-03',
    date: '2026-08-20',
    region: '南区',
    district: '华南二区(广佛及粤西)',
    store: '凯迪拉克广州天河中心店',
    startTime: '2026-08-20 10:00',
    endTime: '2026-08-20 12:00',
    content: '新CT5豪华运动轿车性能与MRC电磁悬挂转训',
    participants: ['马龙', '朱婷', '丁宁', '许昕', '樊振', '王楚'],
    trainerName: '安全驾驶高级教官-赵亮',
    creator: '赵亮',
    audioFileName: '20260820101533_GZ902188_20260820104500',
    audioDurationStr: '25分18秒',
    audioDurationSec: 1518,
    receptionCode: 'QC20260820GZ7721N2',
    customerName: '陈先生',
    employeeName: '马龙',
    qualityScore: 14,
    attachments: {
      video: { name: '广州天河店CT5动态性能试驾示范录像.mp4', size: '320.0 MB', uploadTime: '2026-08-20 12:00' },
      scoreReport: { name: '动态试驾安全考核评分表实拍.jpg', size: '3.2 MB', uploadTime: '2026-08-20 13:30' },
      signInSheet: { name: '8月20日天河店转训签到表.pdf', size: '1.1 MB', uploadTime: '2026-08-20 09:50' },
      photos: { name: '实车赛道转训抓拍.jpg', size: '3.8 MB', uploadTime: '2026-08-20 12:15' }
    },
    assessmentSummary: {
      title: '凯迪拉克新CT5运动质检(14分)',
      totalScore: 14,
      items: [
        { name: '展厅接待(4/4)', hitRatio: '100%', hitPercent: 100, score: 4, details: ['满分完成'] },
        { name: '需求分析(6/6)', hitRatio: '100%', hitPercent: 100, score: 6, details: ['操控偏好挖掘', '动力加速期待'] },
        { name: '邀约入车体验(1/1)', hitRatio: '100%', hitPercent: 100, score: 1, details: ['专属运动座椅调节演示'] },
        { name: '主动开口留资(1/1)', hitRatio: '100%', hitPercent: 100, score: 1, details: ['留资成功'] },
        { name: '邀约试驾(1/1)', hitRatio: '100%', hitPercent: 100, score: 1, details: ['百公里加速与弯道体验'] },
        { name: '购车款项(1/1)', hitRatio: '100%', hitPercent: 100, score: 1, details: ['低首付金融方案解读'] }
      ]
    },
    dialogueList: [
      { id: 'd31', speaker: 'customer', time: '2026-08-20 10:20:00', offsetSec: 2, text: 'CT5后驱开起来和前驱车有什么明显区别？', roleLabel: '客户' },
      { id: 'd32', speaker: 'employee', time: '2026-08-20 10:20:05', offsetSec: 7, text: '陈先生，后驱车转向轮和驱动轮分工明确，过弯循迹性极佳，配合咱们MRC磁浮悬挂每秒1000次路面扫描，真正做到指哪打哪！', roleLabel: '员工', badgeLabel: '销' }
    ],
    tagCategories: [
      { category: '客户基础信息', text: '客户基础信息 - 身份(年轻精英)', color: 'text-white', bgColor: 'bg-blue-600' },
      { category: '意向相关信息', text: '意向相关信息 - 意向车型(CT5铂金版)', color: 'text-white', bgColor: 'bg-orange-600' },
      { category: '意向相关信息', text: '意向相关信息 - 意向动力(2.0T+10AT纵置后驱)', color: 'text-white', bgColor: 'bg-emerald-600' }
    ]
  },
  {
    id: 'TR-CAD-20260819-04',
    date: '2026-08-19',
    region: '西区',
    district: '西南一区(川渝)',
    store: '凯迪拉克成都锦江中心店',
    startTime: '2026-08-19 14:30',
    endTime: '2026-08-19 16:30',
    content: '豪华品牌老客户转介绍与置换补贴策略转训',
    participants: ['郭艾伦', '易建联', '王哲林', '赵继伟', '胡明轩'],
    trainerName: '客户运营总监-沈梦',
    creator: '沈梦',
    audioFileName: '20260819143520_CD817291_20260819151500',
    audioDurationStr: '39分50秒',
    audioDurationSec: 2390,
    receptionCode: 'QC20260819CD9912L4',
    customerName: '吴女士',
    employeeName: '郭艾伦',
    qualityScore: 14,
    attachments: {
      video: { name: '锦江店老车主置换促单演练实录.mp4', size: '145.6 MB', uploadTime: '2026-08-19 17:00' },
      scoreReport: { name: '置换补贴话术测评打分表.jpg', size: '2.6 MB', uploadTime: '2026-08-19 17:30' },
      signInSheet: { name: '8月19日签到表.pdf', size: '890 KB', uploadTime: '2026-08-19 14:20' },
      photos: null
    },
    assessmentSummary: {
      title: '凯迪拉克置换转介绍标准质检(14分)',
      totalScore: 14,
      items: [
        { name: '展厅接待(4/4)', hitRatio: '100%', hitPercent: 100, score: 4 },
        { name: '需求分析(6/6)', hitRatio: '100%', hitPercent: 100, score: 6 },
        { name: '置换政策讲解(1/1)', hitRatio: '100%', hitPercent: 100, score: 1 },
        { name: '老车主权益(1/1)', hitRatio: '100%', hitPercent: 100, score: 1 },
        { name: '主动开口留资(1/1)', hitRatio: '100%', hitPercent: 100, score: 1 },
        { name: '邀约评估(1/1)', hitRatio: '100%', hitPercent: 100, score: 1 }
      ]
    },
    dialogueList: [
      { id: 'd41', speaker: 'customer', time: '2026-08-19 14:40:00', offsetSec: 2, text: '我开的是开了5年的ATS-L，现在换XT6能给多少置换补贴？', roleLabel: '客户' },
      { id: 'd42', speaker: 'employee', time: '2026-08-19 14:40:08', offsetSec: 10, text: '吴女士，感谢您对凯迪拉克的持续信任！本月针对本品牌忠诚老车主置换XT6，享最高20000元现金补贴并赠送终身免费基础保养！', roleLabel: '员工', badgeLabel: '销' }
    ],
    tagCategories: [
      { category: '客户基础信息', text: '客户基础信息 - 客户类型(本品老车主增换购)', color: 'text-white', bgColor: 'bg-blue-600' },
      { category: '意向相关信息', text: '意向相关信息 - 意向车型(XT6六座尊贵型)', color: 'text-white', bgColor: 'bg-orange-600' }
    ]
  },
  {
    id: 'TR-CAD-20260818-05',
    date: '2026-08-18',
    region: '中区',
    district: '华中一区(湖北)',
    store: '凯迪拉克武汉汉口中心店',
    startTime: '2026-08-18 09:30',
    endTime: '2026-08-18 11:30',
    content: '全新GT4紧凑豪华轿跑SUV年轻化受众破冰话术转训',
    participants: ['宋博', '赵雪', '刘洋', '孙晓刚', '郑敏'],
    trainerName: '智能网联培训师-宋博',
    creator: '宋博',
    audioFileName: '20260818094500_WH112839_20260818101500',
    audioDurationStr: '30分12秒',
    audioDurationSec: 1812,
    receptionCode: 'QC20260818WH3819Q9',
    customerName: '刘女士',
    employeeName: '宋博',
    qualityScore: 13,
    attachments: {
      video: { name: 'GT4先锋设计实车转训录屏.mp4', size: '278.4 MB', uploadTime: '2026-08-18 12:30' },
      scoreReport: { name: '车机互联功能实操考核得分.xlsx', size: '41.2 KB', uploadTime: '2026-08-18 13:00' },
      signInSheet: { name: '8月18日签到表.pdf', size: '1.0 MB', uploadTime: '2026-08-18 09:20' },
      photos: null
    },
    assessmentSummary: {
      title: '凯迪拉克GT4年轻化质检(14分)',
      totalScore: 13,
      items: [
        { name: '展厅接待(3/4)', hitRatio: '75%', hitPercent: 75, score: 3 },
        { name: '需求分析(6/6)', hitRatio: '100%', hitPercent: 100, score: 6 },
        { name: '外观颜值引导(1/1)', hitRatio: '100%', hitPercent: 100, score: 1 },
        { name: '智能座舱互联(1/1)', hitRatio: '100%', hitPercent: 100, score: 1 },
        { name: '主动开口留资(1/1)', hitRatio: '100%', hitPercent: 100, score: 1 },
        { name: '邀约试驾(1/1)', hitRatio: '100%', hitPercent: 100, score: 1 }
      ]
    },
    dialogueList: [
      { id: 'd51', speaker: 'customer', time: '2026-08-18 09:50:00', offsetSec: 2, text: '这台车双色车顶和红色卡钳挺好看的，适合女生开吗？', roleLabel: '客户' },
      { id: 'd52', speaker: 'employee', time: '2026-08-18 09:50:06', offsetSec: 8, text: '刘女士非常适合！GT4不仅颜值出众，还配备360度全景影像和自动泊车辅助，在市区停车和狭窄小巷驾驶特别轻松省心。', roleLabel: '员工', badgeLabel: '销' }
    ],
    tagCategories: [
      { category: '客户基础信息', text: '客户基础信息 - 身份(年轻女性个人购车)', color: 'text-white', bgColor: 'bg-blue-600' },
      { category: '意向相关信息', text: '意向相关信息 - 意向车型(GT4风尚版)', color: 'text-white', bgColor: 'bg-orange-600' }
    ]
  },
  {
    id: 'TR-CAD-20260817-06',
    date: '2026-08-17',
    region: '东区',
    district: '华东二区(浙江)',
    store: '凯迪拉克杭州西湖展示店',
    startTime: '2026-08-17 14:00',
    endTime: '2026-08-17 16:00',
    content: '竞品宝马X3/奔驰GLC关键差异化攻防话术转训',
    participants: ['钱进', '孙洁', '周舟', '李明', '徐璐'],
    trainerName: '区域金牌讲师-陈亮',
    creator: '陈亮',
    audioFileName: '20260817141500_HZ819200_20260817144500',
    audioDurationStr: '27分30秒',
    audioDurationSec: 1650,
    receptionCode: 'QC20260817HZ4910P1',
    customerName: '王先生',
    employeeName: '钱进',
    qualityScore: 14,
    attachments: {
      video: { name: '杭州西湖店竞品攻防对练.mp4', size: '198.0 MB', uploadTime: '2026-08-17 16:30' },
      scoreReport: { name: '竞品考核评分表.jpg', size: '2.1 MB', uploadTime: '2026-08-17 16:50' },
      signInSheet: { name: '8月17日签到表.pdf', size: '920 KB', uploadTime: '2026-08-17 13:50' },
      photos: null
    },
    assessmentSummary: {
      title: '竞品攻防标准质检(14分)',
      totalScore: 14,
      items: [
        { name: '展厅接待(4/4)', hitRatio: '100%', hitPercent: 100, score: 4 },
        { name: '需求分析(6/6)', hitRatio: '100%', hitPercent: 100, score: 6 },
        { name: '竞品配置对比(1/1)', hitRatio: '100%', hitPercent: 100, score: 1 },
        { name: '豪华用料讲解(1/1)', hitRatio: '100%', hitPercent: 100, score: 1 },
        { name: '主动开口留资(1/1)', hitRatio: '100%', hitPercent: 100, score: 1 },
        { name: '邀约试驾(1/1)', hitRatio: '100%', hitPercent: 100, score: 1 }
      ]
    },
    dialogueList: [
      { id: 'd61', speaker: 'customer', time: '2026-08-17 14:20:00', offsetSec: 2, text: '隔壁宝马X3现在优惠挺大，你们XT5有什么优势？', roleLabel: '客户' },
      { id: 'd62', speaker: 'employee', time: '2026-08-17 14:20:07', offsetSec: 9, text: '王先生，同价位下咱们XT5直接给到标配蜂鸟四驱、全车双层夹胶静音玻璃和真皮座椅，配置用料和静谧性都更有诚意！', roleLabel: '员工', badgeLabel: '销' }
    ],
    tagCategories: [
      { category: '客户基础信息', text: '客户基础信息 - 购车阶段(紧迫比价阶段)', color: 'text-white', bgColor: 'bg-blue-600' },
      { category: '意向相关信息', text: '意向相关信息 - 意向车型(XT5豪华型)', color: 'text-white', bgColor: 'bg-orange-600' }
    ]
  }
];

export const CadillacTrainingRecordView: React.FC = () => {
  // --- Filter State for Headquarters (大区 / 小区 / 门店) ---
  const [selectedRegion, setSelectedRegion] = useState<string>('全部大区');
  const [selectedDistrict, setSelectedDistrict] = useState<string>('全部小区');
  const [selectedStore, setSelectedStore] = useState<string>('全部门店');
  const [dateRangeStart, setDateRangeStart] = useState<string>('');
  const [dateRangeEnd, setDateRangeEnd] = useState<string>('');
  const [searchKeyword, setSearchKeyword] = useState<string>('');

  // Pagination States
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);
  const [jumpPage, setJumpPage] = useState<string>('');

  // --- Modal States ---
  // 1. Audio Inspection Panoramic Modal (Exact screenshot match)
  const [activeAudioRecord, setActiveAudioRecord] = useState<CadillacTrainingRecord | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentTimeSec, setCurrentTimeSec] = useState<number>(1);
  const [playbackRate, setPlaybackRate] = useState<number>(1.0);
  const [activeTab, setActiveTab] = useState<'details' | 'tags' | 'summary' | 'sales'>('tags');
  const [dialogueSearch, setDialogueSearch] = useState<string>('');
  const [roleSwitched, setRoleSwitched] = useState<boolean>(false);
  const [copiedCode, setCopiedCode] = useState<boolean>(false);

  // 2. Attachment Viewer Modal
  const [activeAttachmentRecord, setActiveAttachmentRecord] = useState<CadillacTrainingRecord | null>(null);

  // Dynamic District Options based on Region
  const districtOptions = useMemo(() => {
    return CADILLAC_DISTRICTS[selectedRegion] || CADILLAC_DISTRICTS['全部大区'];
  }, [selectedRegion]);

  // Dynamic Store Options based on District
  const storeOptions = useMemo(() => {
    return CADILLAC_STORES[selectedDistrict] || CADILLAC_STORES['全部小区'];
  }, [selectedDistrict]);

  // Region change handler
  const handleRegionChange = (newRegion: string) => {
    setSelectedRegion(newRegion);
    setSelectedDistrict('全部小区');
    setSelectedStore('全部门店');
    setCurrentPage(1);
  };

  // District change handler
  const handleDistrictChange = (newDistrict: string) => {
    setSelectedDistrict(newDistrict);
    setSelectedStore('全部门店');
    setCurrentPage(1);
  };

  // Reset Filters
  const handleResetFilters = () => {
    setSelectedRegion('全部大区');
    setSelectedDistrict('全部小区');
    setSelectedStore('全部门店');
    setDateRangeStart('');
    setDateRangeEnd('');
    setSearchKeyword('');
    setCurrentPage(1);
  };

  // Filtered Training Records
  const filteredRecords = useMemo(() => {
    return MOCK_CADILLAC_RECORDS.filter(record => {
      // Region filter
      if (selectedRegion !== '全部大区' && record.region !== selectedRegion) return false;
      // District filter
      if (selectedDistrict !== '全部小区' && record.district !== selectedDistrict) return false;
      // Store filter
      if (selectedStore !== '全部门店' && record.store !== selectedStore) return false;
      // Date start
      if (dateRangeStart && record.date < dateRangeStart) return false;
      // Date end
      if (dateRangeEnd && record.date > dateRangeEnd) return false;
      // Search keyword
      if (searchKeyword.trim()) {
        const kw = searchKeyword.trim().toLowerCase();
        const matchContent = record.content.toLowerCase().includes(kw);
        const matchStore = record.store.toLowerCase().includes(kw);
        const matchTrainer = record.trainerName.toLowerCase().includes(kw);
        const matchParticipant = record.participants.some(p => p.toLowerCase().includes(kw));
        const matchCreator = record.creator.toLowerCase().includes(kw);
        if (!matchContent && !matchStore && !matchTrainer && !matchParticipant && !matchCreator) return false;
      }
      return true;
    });
  }, [selectedRegion, selectedDistrict, selectedStore, dateRangeStart, dateRangeEnd, searchKeyword]);

  // Pagination calculation
  const totalPages = Math.max(1, Math.ceil(filteredRecords.length / pageSize));
  const safeCurrentPage = Math.min(currentPage, totalPages);
  const paginatedRecords = useMemo(() => {
    const start = (safeCurrentPage - 1) * pageSize;
    return filteredRecords.slice(start, start + pageSize);
  }, [filteredRecords, safeCurrentPage, pageSize]);

  // Audio Playback Timer Simulation
  useEffect(() => {
    let timer: any;
    if (isPlaying && activeAudioRecord) {
      timer = setInterval(() => {
        setCurrentTimeSec(prev => {
          if (prev >= activeAudioRecord.audioDurationSec) {
            setIsPlaying(false);
            return 0;
          }
          return prev + 1;
        });
      }, 1000 / playbackRate);
    }
    return () => clearInterval(timer);
  }, [isPlaying, playbackRate, activeAudioRecord]);

  // Format seconds to mm:ss
  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  // Open Audio Player Modal
  const handleOpenAudioModal = (record: CadillacTrainingRecord) => {
    setActiveAudioRecord(record);
    setIsPlaying(false);
    setCurrentTimeSec(1);
    setActiveTab('tags');
    setDialogueSearch('');
  };

  // Copy code helper
  const handleCopyCode = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  return (
    <div className="space-y-6 pb-24 max-w-7xl mx-auto animate-fade-in font-sans">
      
      {/* Top Header - HQ Perspective & Cadence */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-sm">
        {/* Header Content */}
        <div className="space-y-1">
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
              转训记录查看
            </h1>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-full text-xs font-semibold shadow-sm">
              <Building2 size={13} />
              总部视角 · 凯迪拉克
            </span>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            探查凯迪拉克各大区、小区及下辖门店的转训落地进度，支持多模态附件归档审阅与质检全景录音精细回听
          </p>
        </div>
      </div>

      {/* HQ Filter Bar (大区 / 小区 / 门店 / 日期 / 搜索) */}
      <div className="bg-white dark:bg-slate-800 p-5 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-sm space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-6 lg:grid-cols-12 gap-3.5">
          
          {/* 大区 */}
          <div className="sm:col-span-1 md:col-span-2 lg:col-span-2 space-y-1.5 min-w-0">
            <label className="block text-xs font-semibold text-slate-600 dark:text-slate-300 flex items-center gap-1">
              <MapPin size={13} className="text-blue-500" />
              大区
            </label>
            <select
              value={selectedRegion}
              onChange={(e) => handleRegionChange(e.target.value)}
              className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-800 dark:text-slate-200 outline-none focus:ring-2 focus:ring-blue-500/20"
            >
              {CADILLAC_REGIONS.map(r => (
                <option key={r} value={r}>{r}</option>
              ))}
            </select>
          </div>

          {/* 小区 */}
          <div className="sm:col-span-1 md:col-span-2 lg:col-span-2 space-y-1.5 min-w-0">
            <label className="block text-xs font-semibold text-slate-600 dark:text-slate-300 flex items-center gap-1">
              <Layers size={13} className="text-indigo-500" />
              小区
            </label>
            <select
              value={selectedDistrict}
              onChange={(e) => handleDistrictChange(e.target.value)}
              className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-800 dark:text-slate-200 outline-none focus:ring-2 focus:ring-blue-500/20"
            >
              {districtOptions.map(d => (
                <option key={d} value={d}>{d}</option>
              ))}
            </select>
          </div>

          {/* 门店 */}
          <div className="sm:col-span-2 md:col-span-2 lg:col-span-3 space-y-1.5 min-w-0">
            <label className="block text-xs font-semibold text-slate-600 dark:text-slate-300 flex items-center gap-1">
              <Building2 size={13} className="text-emerald-500" />
              门店
            </label>
            <select
              value={selectedStore}
              onChange={(e) => setSelectedStore(e.target.value)}
              className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-800 dark:text-slate-200 outline-none focus:ring-2 focus:ring-blue-500/20"
            >
              {storeOptions.map(s => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>

          {/* 转训日期区间 */}
          <div className="sm:col-span-2 md:col-span-3 lg:col-span-3 space-y-1.5 min-w-0">
            <label className="block text-xs font-semibold text-slate-600 dark:text-slate-300 flex items-center gap-1">
              <Calendar size={13} className="text-purple-500" />
              转训日期
            </label>
            <div className="flex items-center gap-1 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-2 py-1 focus-within:ring-2 focus-within:ring-purple-500/20">
              <input
                type="date"
                value={dateRangeStart}
                onChange={(e) => setDateRangeStart(e.target.value)}
                className="w-full min-w-0 bg-transparent text-xs text-slate-800 dark:text-slate-200 outline-none cursor-pointer py-1"
                title="起始日期"
              />
              <span className="text-slate-400 text-xs px-0.5 shrink-0">-</span>
              <input
                type="date"
                value={dateRangeEnd}
                onChange={(e) => setDateRangeEnd(e.target.value)}
                className="w-full min-w-0 bg-transparent text-xs text-slate-800 dark:text-slate-200 outline-none cursor-pointer py-1"
                title="截止日期"
              />
            </div>
          </div>

          {/* 关键字搜索 */}
          <div className="sm:col-span-2 md:col-span-3 lg:col-span-2 space-y-1.5 min-w-0">
            <label className="block text-xs font-semibold text-slate-600 dark:text-slate-300 flex items-center gap-1">
              <Search size={13} className="text-amber-500" />
              转训内容
            </label>
            <div className="relative">
              <input
                type="text"
                placeholder="搜索转训内容..."
                value={searchKeyword}
                onChange={(e) => setSearchKeyword(e.target.value)}
                className="w-full pl-3 pr-7 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-800 dark:text-slate-200 outline-none focus:ring-2 focus:ring-blue-500/20 placeholder:text-slate-400"
              />
              {searchKeyword && (
                <button
                  onClick={() => setSearchKeyword('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                >
                  <X size={12} />
                </button>
              )}
            </div>
          </div>

        </div>

        {/* Action Controls */}
        <div className="flex items-center justify-between pt-3 border-t border-slate-100 dark:border-slate-700/60 text-xs">
          <div className="text-slate-500 dark:text-slate-400">
            当前筛选范围：<span className="font-semibold text-slate-800 dark:text-slate-200">{selectedRegion}</span> / <span className="font-semibold text-slate-800 dark:text-slate-200">{selectedDistrict}</span> / <span className="font-semibold text-slate-800 dark:text-slate-200">{selectedStore}</span>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              onClick={handleResetFilters}
              className="px-3.5 py-1.5 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-xl transition-colors flex items-center gap-1 font-medium"
            >
              <RotateCcw size={13} />
              重置筛选
            </button>
            <button
              onClick={() => alert('已生成凯迪拉克全国转训记录报表，正在下载 Excel...')}
              className="px-4 py-1.5 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-300 border border-blue-200 dark:border-blue-800/50 hover:bg-blue-100 rounded-xl transition-colors flex items-center gap-1.5 font-semibold"
            >
              <Download size={13} />
              导出清单
            </button>
          </div>
        </div>
      </div>

      {/* Main Table: Headquarters Training Record Inspection */}
      <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-700 dark:bg-slate-900 text-white font-semibold tracking-wide">
                <th className="py-3.5 px-3 text-center border-r border-slate-600/50 w-12 whitespace-nowrap">序号</th>
                <th className="py-3.5 px-3 border-r border-slate-600/50 whitespace-nowrap">转训日期</th>
                <th className="py-3.5 px-3 border-r border-slate-600/50 whitespace-nowrap">大区</th>
                <th className="py-3.5 px-3 border-r border-slate-600/50 whitespace-nowrap">小区</th>
                <th className="py-3.5 px-4 border-r border-slate-600/50 min-w-[160px] whitespace-nowrap">门店</th>
                <th className="py-3.5 px-3 border-r border-slate-600/50 whitespace-nowrap">转训开始时间</th>
                <th className="py-3.5 px-3 border-r border-slate-600/50 whitespace-nowrap">转训结束时间</th>
                <th className="py-3.5 px-4 border-r border-slate-600/50 min-w-[240px]">转训内容</th>
                <th className="py-3.5 px-4 border-r border-slate-600/50 min-w-[180px]">参与人员</th>
                <th className="py-3.5 px-4 text-center whitespace-nowrap w-48">操作</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-700/60">
              {paginatedRecords.length > 0 ? (
                paginatedRecords.map((row, idx) => {
                  const displayIndex = (safeCurrentPage - 1) * pageSize + idx + 1;
                  return (
                    <tr
                      key={row.id}
                      className="hover:bg-blue-50/40 dark:hover:bg-slate-700/30 transition-colors group"
                    >
                      {/* 序号 */}
                      <td className="py-3.5 px-3 text-center font-mono font-medium text-slate-500 dark:text-slate-400 whitespace-nowrap">
                        {displayIndex}
                      </td>

                      {/* 转训日期 */}
                      <td className="py-3.5 px-3 font-mono font-bold text-slate-900 dark:text-white whitespace-nowrap">
                        <div className="flex items-center gap-1.5">
                          <Calendar size={13} className="text-blue-500 shrink-0" />
                          <span>{row.date}</span>
                        </div>
                      </td>

                      {/* 大区 */}
                      <td className="py-3.5 px-3 whitespace-nowrap">
                        <span className="inline-block px-2 py-0.5 rounded-md font-semibold text-[11px] bg-blue-50 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 border border-blue-100 dark:border-blue-800/40">
                          {row.region}
                        </span>
                      </td>

                      {/* 小区 */}
                      <td className="py-3.5 px-3 font-medium text-slate-700 dark:text-slate-300 whitespace-nowrap">
                        {row.district}
                      </td>

                      {/* 门店 */}
                      <td className="py-3.5 px-4 font-bold text-slate-900 dark:text-white whitespace-nowrap">
                        <div className="flex items-center gap-1.5">
                          <Building2 size={13} className="text-slate-400 shrink-0" />
                          <span>{row.store}</span>
                        </div>
                      </td>

                      {/* 转训开始时间 */}
                      <td className="py-3.5 px-3 font-mono text-slate-600 dark:text-slate-300 whitespace-nowrap">
                        <div className="flex items-center gap-1.5">
                          <Clock size={13} className="text-emerald-500 shrink-0" />
                          <span>{row.startTime.split(' ')[1] || row.startTime}</span>
                        </div>
                      </td>

                      {/* 转训结束时间 */}
                      <td className="py-3.5 px-3 font-mono text-slate-600 dark:text-slate-300 whitespace-nowrap">
                        <div className="flex items-center gap-1.5">
                          <Clock size={13} className="text-rose-400 shrink-0" />
                          <span>{row.endTime.split(' ')[1] || row.endTime}</span>
                        </div>
                      </td>

                      {/* 转训内容 */}
                      <td className="py-3.5 px-4">
                        <div className="font-semibold text-slate-900 dark:text-white leading-relaxed">
                          {row.content}
                        </div>
                        <div className="text-[11px] text-slate-400 mt-0.5">
                          讲师: {row.trainerName} · 创建人: {row.creator}
                        </div>
                      </td>

                      {/* 参与人员 */}
                      <td className="py-3.5 px-4">
                        <div className="flex flex-wrap items-center gap-1.5">
                          {row.participants.map((person, pIdx) => (
                            <span
                              key={pIdx}
                              className="inline-flex items-center px-2 py-0.5 rounded-md text-[11px] font-medium bg-slate-100 dark:bg-slate-700/80 text-slate-700 dark:text-slate-300 border border-slate-200/60 dark:border-slate-600/40"
                            >
                              {person}
                            </span>
                          ))}
                        </div>
                      </td>

                      {/* 操作: 查看附件、回听录音 */}
                      <td className="py-3.5 px-4 text-center whitespace-nowrap">
                        <div className="flex items-center justify-center gap-2">
                          <button
                            onClick={() => setActiveAttachmentRecord(row)}
                            className="px-2.5 py-1 text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-700/80 hover:bg-slate-200 dark:hover:bg-slate-600 rounded-lg font-medium transition-colors flex items-center gap-1"
                            title="查看转训现场多模态附件"
                          >
                            <FileText size={12} className="text-blue-500" />
                            查看附件
                          </button>

                          <button
                            onClick={() => handleOpenAudioModal(row)}
                            className="px-3 py-1 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white rounded-lg font-semibold shadow-sm transition-all flex items-center gap-1.5 active:scale-95"
                            title="回听现场工牌录音与接待质检全景详情"
                          >
                            <Headphones size={12} />
                            回听录音
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={10} className="py-16 text-center text-slate-400">
                    <div className="flex flex-col items-center justify-center gap-2">
                      <Building2 size={36} className="text-slate-300 dark:text-slate-600" />
                      <p className="text-sm font-medium">未找到符合该区域/门店筛选条件的转训记录</p>
                      <button
                        onClick={handleResetFilters}
                        className="mt-2 text-xs text-blue-600 dark:text-blue-400 underline font-semibold"
                      >
                        重置所有筛选条件
                      </button>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Footer Pagination Controls */}
        <div className="px-5 py-3.5 bg-slate-50/70 dark:bg-slate-900/60 border-t border-slate-200/80 dark:border-slate-700 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-600 dark:text-slate-300">
          <div className="flex items-center gap-3">
            <span>
              共 <strong className="text-blue-600 dark:text-blue-400 font-bold">{filteredRecords.length}</strong> 条记录
            </span>
            <div className="flex items-center gap-1">
              <select
                value={pageSize}
                onChange={(e) => {
                  setPageSize(Number(e.target.value));
                  setCurrentPage(1);
                }}
                className="px-2.5 py-1 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-xs outline-none cursor-pointer text-slate-700 dark:text-slate-200 focus:ring-1 focus:ring-blue-500"
              >
                <option value={5}>5 条/页</option>
                <option value={10}>10 条/页</option>
                <option value={20}>20 条/页</option>
                <option value={50}>50 条/页</option>
              </select>
            </div>
          </div>

          {/* Page Switcher */}
          <div className="flex flex-wrap items-center gap-1.5">
            <button
              disabled={safeCurrentPage <= 1}
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
              className="px-2.5 py-1 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors flex items-center gap-1"
            >
              <ChevronLeft size={13} />
              <span>上一页</span>
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
              <button
                key={p}
                onClick={() => setCurrentPage(p)}
                className={`min-w-[28px] h-7 px-2 text-xs rounded-lg font-medium transition-colors ${
                  safeCurrentPage === p
                    ? 'bg-blue-600 text-white font-bold shadow-xs'
                    : 'border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700'
                }`}
              >
                {p}
              </button>
            ))}

            <button
              disabled={safeCurrentPage >= totalPages}
              onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
              className="px-2.5 py-1 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors flex items-center gap-1"
            >
              <span>下一页</span>
              <ChevronRight size={13} />
            </button>

            {/* Jump to */}
            <div className="flex items-center gap-1 text-slate-500 dark:text-slate-400 ml-2">
              <span>前往</span>
              <input
                type="number"
                min={1}
                max={totalPages}
                value={jumpPage}
                onChange={(e) => setJumpPage(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    const val = parseInt(jumpPage);
                    if (val >= 1 && val <= totalPages) {
                      setCurrentPage(val);
                      setJumpPage('');
                    }
                  }
                }}
                placeholder={String(safeCurrentPage)}
                className="w-11 px-1.5 py-1 text-center bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-xs outline-none text-slate-800 dark:text-slate-200"
              />
              <span>页</span>
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* MODAL 1: AUDIO INSPECTION PANORAMA MODAL (Exact match with user screenshot) */}
      {/* ========================================================================= */}
      {activeAudioRecord && (
        <div className="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-sm flex items-center justify-center p-2 sm:p-4 overflow-y-auto animate-fade-in">
          <div className="bg-white dark:bg-slate-800 rounded-2xl w-full max-w-6xl shadow-2xl border border-slate-200 dark:border-slate-700 max-h-[94vh] flex flex-col overflow-hidden">
            
            {/* Modal Top Header */}
            <div className="px-6 py-4 border-b border-slate-100 dark:border-slate-700 flex items-center justify-between shrink-0 bg-slate-50/50 dark:bg-slate-800/80">
              <div className="flex items-center gap-3">
                <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <span className="text-slate-900 dark:text-white">【有效质检】</span>
                  <span>{activeAudioRecord.customerName} - 接待质检全景详情</span>
                </h2>

                <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-blue-50 dark:bg-blue-900/40 text-blue-600 dark:text-blue-300 rounded-md border border-blue-200/60 dark:border-blue-800/40 text-xs font-mono font-bold">
                  <span>接待编号: {activeAudioRecord.receptionCode}</span>
                  <button 
                    onClick={() => handleCopyCode(activeAudioRecord.receptionCode)}
                    className="text-blue-400 hover:text-blue-600 transition-colors ml-0.5"
                    title="复制编号"
                  >
                    {copiedCode ? <Check size={12} className="text-emerald-500" /> : <Copy size={12} />}
                  </button>
                </div>
              </div>

              <button
                onClick={() => {
                  setIsPlaying(false);
                  setActiveAudioRecord(null);
                }}
                className="p-1.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* Modal Body - Scrollable */}
            <div className="p-5 overflow-y-auto space-y-5 flex-1 bg-slate-50/40 dark:bg-slate-900/30">
              
              {/* 1. Top Audio Player Card (White Card with border) */}
              <div className="bg-white dark:bg-slate-800 p-5 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm space-y-4">
                
                {/* Meta Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2.5">
                      <span className="px-2.5 py-0.5 bg-blue-600 text-white rounded text-xs font-bold">
                        场景录音文件: {activeAudioRecord.attachments?.video ? '第1段' : '第1段'}
                      </span>
                      <span className="font-bold text-slate-900 dark:text-white font-mono text-sm sm:text-base tracking-tight">
                        {activeAudioRecord.audioFileName}
                      </span>
                    </div>
                    <div className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-2 pt-0.5">
                      <span>员工: <strong className="text-slate-700 dark:text-slate-200">{activeAudioRecord.employeeName}</strong></span>
                      <span className="text-slate-300">|</span>
                      <span>门店: <strong className="text-slate-700 dark:text-slate-200">{activeAudioRecord.store}</strong></span>
                    </div>
                  </div>

                  {/* Right side 3 stats matching screenshot */}
                  <div className="flex items-center gap-5 text-right font-mono text-xs">
                    <div>
                      <div className="font-bold text-slate-900 dark:text-white text-base">
                        {activeAudioRecord.audioDurationStr}
                      </div>
                      <div className="text-[11px] text-emerald-600 dark:text-emerald-400 font-sans flex items-center justify-end gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                        语音时长
                      </div>
                    </div>

                    <div className="border-l border-slate-200 dark:border-slate-700 pl-4">
                      <div className="font-bold text-slate-800 dark:text-slate-200">
                        {activeAudioRecord.date} 11:02:15
                      </div>
                      <div className="text-[11px] text-blue-600 dark:text-blue-400 font-sans flex items-center justify-end gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>
                        开始时间
                      </div>
                    </div>

                    <div className="border-l border-slate-200 dark:border-slate-700 pl-4">
                      <div className="font-bold text-slate-800 dark:text-slate-200">
                        {activeAudioRecord.date} 11:38:00
                      </div>
                      <div className="text-[11px] text-rose-500 dark:text-rose-400 font-sans flex items-center justify-end gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-rose-500"></span>
                        结束时间
                      </div>
                    </div>
                  </div>
                </div>

                {/* Audio Playing Bar (Green Play button, timestamp, waveform track) */}
                <div className="flex items-center gap-4 pt-2">
                  
                  {/* Circular Play / Pause Button */}
                  <button
                    onClick={() => setIsPlaying(!isPlaying)}
                    className="w-11 h-11 rounded-full border-2 border-emerald-500 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-950/40 flex items-center justify-center transition-all shrink-0 shadow-sm"
                  >
                    {isPlaying ? <Pause size={20} className="fill-emerald-500" /> : <Play size={20} className="fill-emerald-500 ml-0.5" />}
                  </button>

                  {/* Speed switch */}
                  <button
                    onClick={() => {
                      const rates = [1.0, 1.25, 1.5, 2.0];
                      const nextIdx = (rates.indexOf(playbackRate) + 1) % rates.length;
                      setPlaybackRate(rates[nextIdx]);
                    }}
                    className="text-xs font-bold text-slate-700 dark:text-slate-300 hover:text-blue-600 px-1.5 py-1 rounded bg-slate-100 dark:bg-slate-700 shrink-0 font-mono"
                  >
                    {playbackRate}X
                  </button>

                  {/* Current timestamp info */}
                  <div className="text-[11px] font-mono text-slate-400 whitespace-nowrap shrink-0">
                    2026-03-19 11:02:15 {formatTime(currentTimeSec)}
                  </div>

                  {/* Scrubbable Progress Bar */}
                  <div className="relative flex-1 group">
                    <div 
                      className="h-2.5 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden cursor-pointer relative"
                      onClick={(e) => {
                        const rect = e.currentTarget.getBoundingClientRect();
                        const clickX = e.clientX - rect.left;
                        const pct = Math.max(0, Math.min(1, clickX / rect.width));
                        setCurrentTimeSec(Math.floor(pct * activeAudioRecord.audioDurationSec));
                      }}
                    >
                      <div
                        className="h-full bg-blue-500 rounded-full transition-all duration-100"
                        style={{ width: `${(currentTimeSec / activeAudioRecord.audioDurationSec) * 100}%` }}
                      ></div>
                    </div>

                    {/* 说明 indicator text */}
                    <div className="absolute top-1/2 -translate-y-1/2 left-[58%] text-[10px] text-slate-400 pointer-events-none">
                      说明
                    </div>
                  </div>

                  {/* End duration */}
                  <div className="text-xs font-mono font-medium text-slate-500 whitespace-nowrap shrink-0">
                    00:06:19
                  </div>

                </div>

              </div>

              {/* 2. Three Columns Grid Layout (Matching Screenshot) */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
                
                {/* ---------------------------------------------------- */}
                {/* COLUMN 1: 评测结果 (Left Column - 3.5 / 12 width) */}
                {/* ---------------------------------------------------- */}
                <div className="lg:col-span-3 bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm p-4 space-y-4">
                  
                  {/* Column Tab Header */}
                  <div className="border-b border-slate-100 dark:border-slate-700 pb-2">
                    <div className="inline-block text-sm font-bold text-blue-600 border-b-2 border-blue-600 pb-2 -mb-2.5">
                      评测结果
                    </div>
                  </div>

                  {/* Model Standard Title & Sub-header */}
                  <div className="flex items-center justify-between text-xs font-bold text-slate-900 dark:text-white pt-1">
                    <span>{activeAudioRecord.assessmentSummary.title}</span>
                    <div className="flex items-center gap-4 text-slate-500 dark:text-slate-400 text-[11px] font-medium">
                      <span>命中情况</span>
                      <span>分数</span>
                    </div>
                  </div>

                  {/* Assessment Items Table */}
                  <div className="space-y-1 divide-y divide-slate-100 dark:divide-slate-700/60 text-xs">
                    {activeAudioRecord.assessmentSummary.items.map((item, idx) => (
                      <div key={idx} className="pt-2.5 pb-2 flex items-center justify-between hover:bg-slate-50 dark:hover:bg-slate-700/30 px-1 rounded-lg transition-colors">
                        
                        <div className="flex items-center gap-1.5 text-slate-800 dark:text-slate-200 font-medium truncate max-w-[140px]">
                          <ChevronRight size={13} className="text-slate-400 shrink-0" />
                          <span className="truncate">{item.name}</span>
                        </div>

                        <div className="flex items-center gap-4 text-right">
                          <span className="font-mono text-slate-600 dark:text-slate-300 w-12 text-right">
                            {item.hitRatio}
                          </span>
                          <span className="font-bold text-slate-900 dark:text-white w-8 text-right">
                            {item.score}分
                          </span>
                        </div>

                      </div>
                    ))}
                  </div>

                </div>

                {/* ---------------------------------------------------- */}
                {/* COLUMN 2: 通话记录 (Middle Column - 5.5 / 12 width) */}
                {/* ---------------------------------------------------- */}
                <div className="lg:col-span-5 bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm p-4 space-y-4 flex flex-col h-[520px]">
                  
                  {/* Header and Controls */}
                  <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-700 pb-3 shrink-0">
                    <div className="flex items-center gap-3">
                      <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                        通话记录
                      </h3>
                      <label className="flex items-center gap-1.5 text-xs text-slate-500 cursor-pointer">
                        <input 
                          type="checkbox" 
                          checked={roleSwitched}
                          onChange={(e) => setRoleSwitched(e.target.checked)}
                          className="rounded border-slate-300 text-blue-600 focus:ring-0" 
                        />
                        <span>切换角色</span>
                      </label>
                    </div>

                    <div className="flex items-center gap-2 text-xs">
                      {/* Search in dialogue */}
                      <div className="relative">
                        <input
                          type="text"
                          placeholder="在对话中... 0"
                          value={dialogueSearch}
                          onChange={(e) => setDialogueSearch(e.target.value)}
                          className="px-2.5 py-1 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-xs w-28 outline-none text-slate-700 dark:text-slate-200"
                        />
                      </div>

                      <button 
                        onClick={() => alert('已下载通话记录完整文本。')}
                        className="text-blue-600 hover:text-blue-700 font-medium"
                      >
                        文本下载
                      </button>
                      <button 
                        onClick={() => alert('已将当前选定优秀话术添加至总部话术词库。')}
                        className="text-blue-600 hover:text-blue-700 font-medium"
                      >
                        添加词库
                      </button>
                    </div>
                  </div>

                  {/* Transcript Bubbles Stream (Scrollable) */}
                  <div className="flex-1 overflow-y-auto space-y-4 pr-1 text-xs">
                    {activeAudioRecord.dialogueList.map((msg) => {
                      const isEmp = msg.speaker === 'employee';
                      
                      return (
                        <div key={msg.id} className="space-y-1">
                          
                          {/* Customer Bubble Left */}
                          {!isEmp ? (
                            <div className="flex items-start gap-2.5">
                              {/* Customer Avatar Circle */}
                              <div className="w-6 h-6 rounded-full bg-rose-100 dark:bg-rose-900/50 text-rose-600 dark:text-rose-300 font-bold flex items-center justify-center text-[11px] shrink-0 mt-0.5">
                                客
                              </div>

                              <div className="space-y-1 max-w-[85%]">
                                <div className="flex items-center gap-2 text-[11px] text-slate-400">
                                  <button
                                    onClick={() => {
                                      setCurrentTimeSec(msg.offsetSec);
                                      setIsPlaying(true);
                                    }}
                                    className="text-blue-600 hover:underline flex items-center gap-0.5 font-medium"
                                  >
                                    播放
                                  </button>
                                  <span className="text-slate-400 flex items-center gap-0.5">
                                    切换 <ArrowRight size={10} /> 编辑 ✏️
                                  </span>
                                  <span>客户 {msg.time}</span>
                                </div>

                                <div className="px-3.5 py-2 rounded-2xl rounded-tl-none bg-white dark:bg-slate-700/80 border border-slate-200 dark:border-slate-600 text-slate-800 dark:text-slate-100 shadow-sm leading-relaxed">
                                  {msg.text}
                                </div>
                              </div>
                            </div>
                          ) : (
                            /* Employee Bubble Right */
                            <div className="flex items-start justify-end gap-2.5">
                              
                              <div className="space-y-1 max-w-[85%] text-right">
                                <div className="flex items-center justify-end gap-2 text-[11px] text-slate-400">
                                  <span>{msg.time} 员工</span>
                                  <span className="text-slate-400">✏️ 编辑 ↩ 切换</span>
                                  <button
                                    onClick={() => {
                                      setCurrentTimeSec(msg.offsetSec);
                                      setIsPlaying(true);
                                    }}
                                    className="text-blue-600 hover:underline flex items-center gap-0.5 font-medium"
                                  >
                                    播放
                                  </button>
                                </div>

                                <div className="inline-block px-3.5 py-2 rounded-2xl rounded-tr-none bg-emerald-600 text-white text-left font-normal shadow-sm leading-relaxed">
                                  {msg.text}
                                </div>
                              </div>

                              {/* Employee Badge Circle */}
                              <div className="w-6 h-6 rounded-full bg-emerald-100 dark:bg-emerald-900/50 text-emerald-600 dark:text-emerald-300 font-bold flex items-center justify-center text-[11px] shrink-0 mt-0.5">
                                {msg.badgeLabel || '销'}
                              </div>

                            </div>
                          )}

                        </div>
                      );
                    })}
                  </div>

                </div>

                {/* ---------------------------------------------------- */}
                {/* COLUMN 3: 标签 / 会话详情 / 总结 (Right Column - 3.5 / 12 width) */}
                {/* ---------------------------------------------------- */}
                <div className="lg:col-span-4 bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm p-4 space-y-4 flex flex-col h-[520px]">
                  
                  {/* Top Tabs */}
                  <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-700 pb-2 shrink-0">
                    <div className="flex items-center gap-4 text-xs">
                      <button
                        onClick={() => setActiveTab('details')}
                        className={`pb-2 font-bold transition-all ${
                          activeTab === 'details'
                            ? 'text-blue-600 border-b-2 border-blue-600 -mb-2.5'
                            : 'text-slate-500 hover:text-slate-800'
                        }`}
                      >
                        会话详情
                      </button>
                      <button
                        onClick={() => setActiveTab('tags')}
                        className={`pb-2 font-bold transition-all ${
                          activeTab === 'tags'
                            ? 'text-blue-600 border-b-2 border-blue-600 -mb-2.5'
                            : 'text-slate-500 hover:text-slate-800'
                        }`}
                      >
                        标签
                      </button>
                      <button
                        onClick={() => setActiveTab('summary')}
                        className={`pb-2 font-bold transition-all ${
                          activeTab === 'summary'
                            ? 'text-blue-600 border-b-2 border-blue-600 -mb-2.5'
                            : 'text-slate-500 hover:text-slate-800'
                        }`}
                      >
                        会话总结
                      </button>
                      <button
                        onClick={() => setActiveTab('sales')}
                        className={`pb-2 font-bold transition-all ${
                          activeTab === 'sales'
                            ? 'text-blue-600 border-b-2 border-blue-600 -mb-2.5'
                            : 'text-slate-500 hover:text-slate-800'
                        }`}
                      >
                        销售分析
                      </button>
                    </div>
                  </div>

                  {/* Tab Contents */}
                  <div className="flex-1 overflow-y-auto pr-1 text-xs space-y-4">
                    
                    {/* TAB: 标签 (Tags) - Exact Match with Screenshot */}
                    {activeTab === 'tags' && (
                      <div className="space-y-4">
                        
                        {/* Sub Header links */}
                        <div className="flex items-center justify-between text-xs text-blue-600">
                          <button onClick={() => alert('已下载客户标签清单 Excel')} className="hover:underline font-medium">
                            下载标签清单
                          </button>
                          <button onClick={() => alert('打开标签显示筛选与配置')} className="hover:underline font-medium flex items-center gap-1">
                            ▼ 标签显示配置
                          </button>
                        </div>

                        {/* Title */}
                        <div className="font-bold text-slate-800 dark:text-white text-xs pt-1">
                          客户意向判定与客户标签 / 新客户意向判定和客户标签
                        </div>

                        {/* Colorful Tag Pill Chips Matching Screenshot */}
                        <div className="space-y-2.5">
                          {activeAudioRecord.tagCategories.map((t, idx) => (
                            <div
                              key={idx}
                              className={`w-full px-4 py-2.5 rounded-lg ${t.bgColor} text-white font-medium text-xs shadow-sm flex items-center justify-between tracking-wide`}
                            >
                              <span>{t.text}</span>
                            </div>
                          ))}
                        </div>

                      </div>
                    )}

                    {/* TAB: 会话详情 */}
                    {activeTab === 'details' && (
                      <div className="space-y-3.5 text-slate-700 dark:text-slate-300">
                        <div className="p-3 bg-slate-50 dark:bg-slate-700/40 rounded-xl space-y-2">
                          <div className="flex justify-between">
                            <span className="text-slate-400">客户姓名:</span>
                            <span className="font-bold text-slate-900 dark:text-white">{activeAudioRecord.customerName}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-slate-400">接待顾问:</span>
                            <span className="font-bold text-slate-900 dark:text-white">{activeAudioRecord.employeeName}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-slate-400">所在门店:</span>
                            <span>{activeAudioRecord.store}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-slate-400">所属大区/小区:</span>
                            <span>{activeAudioRecord.region} / {activeAudioRecord.district}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-slate-400">质检得分:</span>
                            <span className="font-bold text-emerald-600">{activeAudioRecord.qualityScore} 分 (满分 14)</span>
                          </div>
                        </div>

                        <div className="p-3 bg-slate-50 dark:bg-slate-700/40 rounded-xl space-y-1 text-[11px]">
                          <div className="font-semibold text-slate-800 dark:text-slate-200">工牌硬件与音视频流信息:</div>
                          <div className="text-slate-500">录音文件编码: {activeAudioRecord.audioFileName}</div>
                          <div className="text-slate-500">采样率: 16000Hz · 双声道分离降噪</div>
                          <div className="text-slate-500">ASR 语音转写准确率: 98.6%</div>
                        </div>
                      </div>
                    )}

                    {/* TAB: 会话总结 */}
                    {activeTab === 'summary' && (
                      <div className="space-y-3">
                        <div className="p-3 bg-blue-50/60 dark:bg-blue-900/30 rounded-xl text-blue-900 dark:text-blue-200 leading-relaxed">
                          <div className="font-bold text-xs mb-1 flex items-center gap-1.5">
                            <Sparkles size={13} className="text-blue-600" />
                            AI 质检智能小结
                          </div>
                          {activeAudioRecord.sessionSummary?.overview}
                        </div>

                        {activeAudioRecord.sessionSummary?.keyPoints && (
                          <div className="space-y-1.5">
                            <div className="font-bold text-slate-800 dark:text-slate-200">核心关注点:</div>
                            <ul className="list-disc list-inside space-y-1 text-slate-600 dark:text-slate-300">
                              {activeAudioRecord.sessionSummary.keyPoints.map((pt, i) => (
                                <li key={i}>{pt}</li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    )}

                    {/* TAB: 销售分析 */}
                    {activeTab === 'sales' && (
                      <div className="space-y-3">
                        <div className="p-3 bg-slate-50 dark:bg-slate-700/40 rounded-xl space-y-2">
                          <div className="font-bold text-slate-800 dark:text-slate-200">语速与话量比率</div>
                          <div className="flex justify-between text-slate-600 dark:text-slate-300">
                            <span>顾问话量占比:</span>
                            <span className="font-bold text-emerald-600">{activeAudioRecord.salesAnalysis?.talkRatio.sales}%</span>
                          </div>
                          <div className="flex justify-between text-slate-600 dark:text-slate-300">
                            <span>客户表达占比:</span>
                            <span className="font-bold text-blue-600">{activeAudioRecord.salesAnalysis?.talkRatio.customer}%</span>
                          </div>
                          <div className="flex justify-between text-slate-600 dark:text-slate-300">
                            <span>平均语速:</span>
                            <span>{activeAudioRecord.salesAnalysis?.speechRate}</span>
                          </div>
                        </div>

                        <div className="p-3 bg-slate-50 dark:bg-slate-700/40 rounded-xl space-y-1.5">
                          <div className="font-bold text-slate-800 dark:text-slate-200">核心卖点覆盖率:</div>
                          <div className="flex flex-wrap gap-1.5 pt-1">
                            {activeAudioRecord.salesAnalysis?.keySellingPointsCovered.map((s, idx) => (
                              <span key={idx} className="px-2 py-0.5 bg-emerald-100 dark:bg-emerald-900/40 text-emerald-800 dark:text-emerald-200 rounded text-[11px] font-medium">
                                ✓ {s}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}

                  </div>

                </div>

              </div>

            </div>

            {/* Modal Bottom Actions */}
            <div className="px-6 py-3.5 border-t border-slate-100 dark:border-slate-700 flex items-center justify-between shrink-0 bg-slate-50/50 dark:bg-slate-800/80">
              <div className="text-xs text-slate-400">
                数据来源: 凯迪拉克总部会话智能质检云端系统 · 数据已脱敏加密
              </div>
              <button
                onClick={() => {
                  setIsPlaying(false);
                  setActiveAudioRecord(null);
                }}
                className="px-5 py-2 bg-slate-800 text-white dark:bg-slate-700 dark:hover:bg-slate-600 rounded-xl text-xs font-semibold hover:bg-slate-900 transition-colors"
              >
                关闭
              </button>
            </div>

          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL 2: ATTACHMENT VIEWER MODAL */}
      {/* ========================================================================= */}
      {activeAttachmentRecord && (
        <div className="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto animate-fade-in">
          <div className="bg-white dark:bg-slate-800 rounded-2xl w-full max-w-2xl shadow-2xl border border-slate-200 dark:border-slate-700 overflow-hidden">
            
            <div className="px-6 py-4 border-b border-slate-100 dark:border-slate-700 flex items-center justify-between bg-slate-50/50 dark:bg-slate-800/80">
              <div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <FileText size={18} className="text-blue-500" />
                  转训多模态归档附件
                </h3>
                <p className="text-xs text-slate-400 mt-0.5 font-mono">
                  {activeAttachmentRecord.store} · {activeAttachmentRecord.date}
                </p>
              </div>
              <button
                onClick={() => setActiveAttachmentRecord(null)}
                className="p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700"
              >
                <X size={18} />
              </button>
            </div>

            <div className="p-6 space-y-4 max-h-[70vh] overflow-y-auto text-xs">
              
              {/* 1. 视频实录 */}
              <div className="p-4 bg-slate-50 dark:bg-slate-900/50 rounded-xl border border-slate-200/80 dark:border-slate-700 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0">
                    <Video size={20} />
                  </div>
                  <div>
                    <div className="font-bold text-slate-800 dark:text-slate-200 text-xs">
                      1. 转训现场视频实录
                    </div>
                    {activeAttachmentRecord.attachments.video ? (
                      <div className="text-slate-400 text-[11px] font-mono mt-0.5">
                        {activeAttachmentRecord.attachments.video.name} ({activeAttachmentRecord.attachments.video.size})
                      </div>
                    ) : (
                      <div className="text-slate-400 text-[11px] mt-0.5">未上传视频附件</div>
                    )}
                  </div>
                </div>

                {activeAttachmentRecord.attachments.video ? (
                  <button 
                    onClick={() => alert(`正在播放转训现场视频: ${activeAttachmentRecord.attachments.video?.name}`)}
                    className="px-3 py-1.5 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center gap-1"
                  >
                    <Play size={12} />
                    播放视频
                  </button>
                ) : (
                  <span className="text-slate-400">无</span>
                )}
              </div>

              {/* 2. 通关成绩单 */}
              <div className="p-4 bg-slate-50 dark:bg-slate-900/50 rounded-xl border border-slate-200/80 dark:border-slate-700 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-900/50 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
                    <FileSpreadsheet size={20} />
                  </div>
                  <div>
                    <div className="font-bold text-slate-800 dark:text-slate-200 text-xs">
                      2. 转训考核通关成绩单
                    </div>
                    {activeAttachmentRecord.attachments.scoreReport ? (
                      <div className="text-slate-400 text-[11px] font-mono mt-0.5">
                        {activeAttachmentRecord.attachments.scoreReport.name} ({activeAttachmentRecord.attachments.scoreReport.size})
                      </div>
                    ) : (
                      <div className="text-slate-400 text-[11px] mt-0.5">未上传成绩单附件</div>
                    )}
                  </div>
                </div>

                {activeAttachmentRecord.attachments.scoreReport ? (
                  <button 
                    onClick={() => alert(`正在预览成绩单: ${activeAttachmentRecord.attachments.scoreReport?.name}`)}
                    className="px-3 py-1.5 bg-emerald-600 text-white rounded-lg font-semibold hover:bg-emerald-700 transition-colors flex items-center gap-1"
                  >
                    <Eye size={12} />
                    查看成绩单
                  </button>
                ) : (
                  <span className="text-slate-400">无</span>
                )}
              </div>

              {/* 3. 签到表 */}
              <div className="p-4 bg-slate-50 dark:bg-slate-900/50 rounded-xl border border-slate-200/80 dark:border-slate-700 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-purple-100 dark:bg-purple-900/50 text-purple-600 dark:text-purple-400 flex items-center justify-center shrink-0">
                    <Users size={20} />
                  </div>
                  <div>
                    <div className="font-bold text-slate-800 dark:text-slate-200 text-xs">
                      3. 转训现场签到表
                    </div>
                    {activeAttachmentRecord.attachments.signInSheet ? (
                      <div className="text-slate-400 text-[11px] font-mono mt-0.5">
                        {activeAttachmentRecord.attachments.signInSheet.name} ({activeAttachmentRecord.attachments.signInSheet.size})
                      </div>
                    ) : (
                      <div className="text-slate-400 text-[11px] mt-0.5">未上传签到表</div>
                    )}
                  </div>
                </div>

                {activeAttachmentRecord.attachments.signInSheet ? (
                  <button 
                    onClick={() => alert(`正在下载签到表: ${activeAttachmentRecord.attachments.signInSheet?.name}`)}
                    className="px-3 py-1.5 bg-purple-600 text-white rounded-lg font-semibold hover:bg-purple-700 transition-colors flex items-center gap-1"
                  >
                    <Download size={12} />
                    下载签到表
                  </button>
                ) : (
                  <span className="text-slate-400">无</span>
                )}
              </div>

              {/* 4. 现场照片 */}
              <div className="p-4 bg-slate-50 dark:bg-slate-900/50 rounded-xl border border-slate-200/80 dark:border-slate-700 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-amber-100 dark:bg-amber-900/50 text-amber-600 dark:text-amber-400 flex items-center justify-center shrink-0">
                    <ImageIcon size={20} />
                  </div>
                  <div>
                    <div className="font-bold text-slate-800 dark:text-slate-200 text-xs">
                      4. 现场照片与抓拍
                    </div>
                    {activeAttachmentRecord.attachments.photos ? (
                      <div className="text-slate-400 text-[11px] font-mono mt-0.5">
                        {activeAttachmentRecord.attachments.photos.name} ({activeAttachmentRecord.attachments.photos.size})
                      </div>
                    ) : (
                      <div className="text-slate-400 text-[11px] mt-0.5">未上传现场照片</div>
                    )}
                  </div>
                </div>

                {activeAttachmentRecord.attachments.photos ? (
                  <button 
                    onClick={() => alert(`正在查看现场高清大图: ${activeAttachmentRecord.attachments.photos?.name}`)}
                    className="px-3 py-1.5 bg-amber-600 text-white rounded-lg font-semibold hover:bg-amber-700 transition-colors flex items-center gap-1"
                  >
                    <Eye size={12} />
                    查看大图
                  </button>
                ) : (
                  <span className="text-slate-400">无</span>
                )}
              </div>

            </div>

            <div className="px-6 py-3.5 border-t border-slate-100 dark:border-slate-700 flex justify-end bg-slate-50/50 dark:bg-slate-800/80">
              <button
                onClick={() => setActiveAttachmentRecord(null)}
                className="px-5 py-2 bg-slate-800 text-white dark:bg-slate-700 dark:hover:bg-slate-600 rounded-xl text-xs font-semibold hover:bg-slate-900 transition-colors"
              >
                关闭
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};

export default CadillacTrainingRecordView;
