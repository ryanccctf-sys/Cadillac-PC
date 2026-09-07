import React, { useState } from 'react';
import { 
  Users, 
  Search, 
  RotateCcw, 
  Calendar, 
  Download, 
  HelpCircle,
  Building2,
  ChevronRight,
  ChevronDown,
  ChevronUp,
  BookOpen,
  Award,
  CheckCircle2,
  Clock,
  Sparkles,
  ArrowUpDown,
  Mic,
  Coffee,
  TrendingUp
} from 'lucide-react';

interface TransferDetailRow {
  id: number;
  region: string; // 大区
  mac: string; // MAC
  dealerCode: string; // 经销商code
  dealerShortName: string; // 经销商简称
  employeeName: string; // 员工名称
  carModel: string; // 车型
  sessionCount: string; // 转训场次
  startTime: string; // 转训开始时间
  endTime: string; // 转训结束时间
  executionRate: string; // 转训执行率

  // 一级: 课程导入总转训率
  courseIntroTotalRate: string;
  // 细项
  customerJourneyRate: string; // 专属客户体验旅程
  nevVsFuelRate: string; // 新能源vs传统燃油
  sixChangesRate: string; // 六大变革
  fiveProcessesRate: string; // 五大流程
  processMapRate: string; // 体验流程图
  keyTouchpointsRate: string; // 关键触点
  staticRouteRate: string; // 静态体验动线
  dynamicRouteRate: string; // 动态体验动线

  // 一级: 精准邀约总转训率
  preciseInviteTotalRate: string;
  // 细项
  preciseInviteRate: string; // 精准邀约

  // 一级: 差异化接待总转训率
  diffReceptionTotalRate: string;
  // 细项
  diffReceptionStrategyRate: string; // 差异化接待策略
  threeStepDemoRate: string; // 三步递进式演示法

  // 一级: 动态体验总转训率
  dynamicExpTotalRate: string;
  // 细项
  testDriveThreeQuestionsRate: string; // 试驾三问
  boardingPrepRate: string; // 上车准备
  grassSmartDrivingRate: string; // 种草智驾
  hummingbirdChassisRate: string; // 蜂鸟底盘
  threeModesCoverageRate: string; // 三模式全场景覆盖
  highSpecServiceRate: string; // 高规服务与价值强化
  doubtResolutionRate: string; // 疑虑消解与差异化对标
  rightsConversionRate: string; // 权益推动转化

  // 一级: 维系跟进总转训率
  maintainFollowupTotalRate: string;
  // 细项
  maintainFollowupRate: string; // 维系跟进

  // 一级: 交付体验总转训率
  deliveryExpTotalRate: string;
  // 细项
  efficientDeliveryRate: string; // 高效交车
  deliveryGuideCardRate: string; // 交车导引卡

  // 一级: 总结总转训率
  summaryTotalRate: string;
  // 细项
  fiveLinksKeyPointsRate: string; // 五大环节核心要点
  sixChangesValueRate: string; // 六大核心变革的顶层价值
}

// Sales Practice Detail Interfaces
interface PracticeDetailRow {
  id: number;
  date: string;
  region: string;
  mac: string;
  dealerCode: string;
  dealerShortName: string;
  consultantName: string;
  carModel: string;
  docNo: string;
  startTime: string;
  endTime: string;
  overallRate: string;
  // 一级: 车头讲解
  headExplainRate: string;
  blueLightRate: string; // 智驾小蓝灯
  // 一级: 前排讲解
  frontRowExplainRate: string;
  sofaRate: string; // 美式大沙发
  napModeRate: string; // 小憩模式
  screenAudioFragranceRate: string; // 33英寸曲面屏/AKG音响/智能香氛
  warmCoolBoxRate: string; // 智能冷暖箱
  funcHallRate: string; // 功能演示厅
  aiVoiceRate: string; // AI智能语音
  // 一级: 车尾讲解
  rearExplainRate: string;
  dischargeTrunkRate: string; // 外放电&后备箱
  // 一级: 邀约话术
  inviteScriptRate: string;
  firstInviteRate: string; // 首次试驾邀请
  secondInviteRate: string; // 二次邀请试驾
  // 一级: 试驾出发准备
  departurePrepRate: string;
  routeMapExplainRate: string; // 对照路线图讲解
  remoteStartRate: string; // 远程启动
  remoteParkingRate: string; // 遥控泊车
  // 一级: 客户试乘
  customerRideRate: string;
  openNopRate: string; // 开启NOP
  trafficLightRate: string; // 十字路口直行通过红绿灯
  turnGamingRate: string; // 左转博弈/右转博弈
  avoidObstacleRate: string; // 直行避让行人/非机动车/停靠车
  traceReverseRate: string; // 循迹倒车
  rampMergeRate: string; // 匝道汇入
  efficientPassRate: string; // 高效通行
  // 一级: 客户试驾
  customerDriveRate: string;
  phevSystemRate: string; // 凯迪拉克插混系统
  rtdHummingbirdRate: string; // 预瞄RTD、电动蜂鸟底盘
  cityNopRate: string; // 城区NOP
  leaveCarParkRate: string; // 离车泊入
  autoParkRate: string; // 自动泊车
  sentryModeRate: string; // 哨兵模式
  // 一级: 结束试驾，回店洽谈
  endDriveNegotiateRate: string;
  negotiateRate: string; // 回店洽谈
  blindOrderBenefitRate: string; // 盲定权益
}

// 29 QC Detail Items for Cards
const PRACTICE_QC_ITEMS = [
  { id: 'item1', name: '智驾小蓝灯', rate: '72.40%' },
  { id: 'item2', name: '美式大沙发', rate: '85.20%' },
  { id: 'item3', name: '小憩模式', rate: '68.10%' },
  { id: 'item4', name: '33英寸曲面屏/AKG音响/智能香氛', rate: '79.50%' },
  { id: 'item5', name: '智能冷暖箱', rate: '63.80%' },
  { id: 'item6', name: '功能演示厅', rate: '58.30%' },
  { id: 'item7', name: 'AI智能语音', rate: '88.60%' },
  { id: 'item8', name: '外放电&后备箱', rate: '65.20%' },
  { id: 'item9', name: '首次试驾邀请', rate: '76.40%' },
  { id: 'item10', name: '二次邀请试驾', rate: '61.90%' },
  { id: 'item11', name: '对照路线图讲解', rate: '69.80%' },
  { id: 'item12', name: '远程启动', rate: '74.30%' },
  { id: 'item13', name: '遥控泊车', rate: '56.70%' },
  { id: 'item14', name: '开启NOP', rate: '51.20%' },
  { id: 'item15', name: '十字路口直行通过红绿灯', rate: '48.90%' },
  { id: 'item16', name: '左转博弈/右转博弈', rate: '45.30%' },
  { id: 'item17', name: '直行避让行人/非机动车/停靠车', rate: '52.10%' },
  { id: 'item18', name: '循迹倒车', rate: '49.60%' },
  { id: 'item19', name: '匝道汇入', rate: '44.80%' },
  { id: 'item20', name: '高效通行', rate: '43.20%' },
  { id: 'item21', name: '凯迪拉克插混系统', rate: '55.40%' },
  { id: 'item22', name: '预瞄RTD', rate: '46.80%' },
  { id: 'item23', name: '电动蜂鸟底盘', rate: '42.50%' },
  { id: 'item24', name: '城区NOP', rate: '39.70%' },
  { id: 'item25', name: '离车泊入', rate: '62.30%' },
  { id: 'item26', name: '自动泊车', rate: '75.24%' },
  { id: 'item27', name: '哨兵模式', rate: '58.90%' },
  { id: 'item28', name: '回店洽谈', rate: '82.10%' },
  { id: 'item29', name: '盲定权益', rate: '71.50%' }
];

// 24 Detail Items for XT5 PHEV Manual (转训 - XT5 PHEV本品讲师手册)
const XT5_MANUAL_ITEMS = [
  { id: 'm_item1', name: '专属客户体验旅程', rate: '78.50%' },
  { id: 'm_item2', name: '新能源vs传统燃油', rate: '82.30%' },
  { id: 'm_item3', name: '六大变革', rate: '74.60%' },
  { id: 'm_item4', name: '五大流程', rate: '86.10%' },
  { id: 'm_item5', name: '体验流程图', rate: '69.40%' },
  { id: 'm_item6', name: '关键触点', rate: '77.20%' },
  { id: 'm_item7', name: '静态体验动线', rate: '83.50%' },
  { id: 'm_item8', name: '动态体验动线', rate: '75.80%' },
  { id: 'm_item9', name: '精准邀约', rate: '81.20%' },
  { id: 'm_item10', name: '差异化接待策略', rate: '72.90%' },
  { id: 'm_item11', name: '三步递进式演示法', rate: '68.40%' },
  { id: 'm_item12', name: '试驾三问', rate: '84.00%' },
  { id: 'm_item13', name: '上车准备', rate: '89.30%' },
  { id: 'm_item14', name: '种草智驾', rate: '65.70%' },
  { id: 'm_item15', name: '蜂鸟底盘', rate: '71.50%' },
  { id: 'm_item16', name: '三模式全场景覆盖', rate: '63.20%' },
  { id: 'm_item17', name: '高规服务与价值强化', rate: '76.80%' },
  { id: 'm_item18', name: '疑虑消解与差异化对标', rate: '67.10%' },
  { id: 'm_item19', name: '权益推动转化', rate: '80.50%' },
  { id: 'm_item20', name: '维系跟进', rate: '73.40%' },
  { id: 'm_item21', name: '高效交车', rate: '85.60%' },
  { id: 'm_item22', name: '交车导引卡', rate: '79.20%' },
  { id: 'm_item23', name: '五大环节核心要点', rate: '88.00%' },
  { id: 'm_item24', name: '六大核心变革的顶层价值', rate: '70.80%' }
];

// 8 Detail Items for Rights Explain (转训 - 权益讲解)
const RIGHTS_EXPLAIN_ITEMS = [
  { id: 'r_item1', name: '盲定权益讲解', rate: '85.40%' },
  { id: 'r_item2', name: '置换补贴政策', rate: '79.20%' },
  { id: 'r_item3', name: '首任车主质保', rate: '91.00%' },
  { id: 'r_item4', name: '家用充电桩权益', rate: '74.60%' },
  { id: 'r_item5', name: '智享服务包', rate: '68.30%' },
  { id: 'r_item6', name: '转介绍礼包', rate: '62.50%' },
  { id: 'r_item7', name: '金融分期特惠', rate: '77.80%' },
  { id: 'r_item8', name: '提车专属礼遇', rate: '83.10%' }
];

const MOCK_TRANSFER_DETAIL_DATA: TransferDetailRow[] = [
  {
    id: 1,
    region: '华东大区',
    mac: '华东一小区',
    dealerCode: 'CAD-8801',
    dealerShortName: '上海徐汇凯迪拉克',
    employeeName: '张伟',
    carModel: 'XT5 PHEV',
    sessionCount: '第1场',
    startTime: '2026-07-26 09:00:00',
    endTime: '2026-07-26 11:30:00',
    executionRate: '88.23%',
    courseIntroTotalRate: '88.50%',
    customerJourneyRate: '90.20%',
    nevVsFuelRate: '92.00%',
    sixChangesRate: '87.50%',
    fiveProcessesRate: '91.00%',
    processMapRate: '84.00%',
    keyTouchpointsRate: '86.50%',
    staticRouteRate: '89.00%',
    dynamicRouteRate: '87.80%',
    preciseInviteTotalRate: '86.40%',
    preciseInviteRate: '86.40%',
    diffReceptionTotalRate: '84.20%',
    diffReceptionStrategyRate: '86.00%',
    threeStepDemoRate: '82.40%',
    dynamicExpTotalRate: '82.80%',
    testDriveThreeQuestionsRate: '86.00%',
    boardingPrepRate: '91.20%',
    grassSmartDrivingRate: '78.50%',
    hummingbirdChassisRate: '84.00%',
    threeModesCoverageRate: '76.80%',
    highSpecServiceRate: '85.40%',
    doubtResolutionRate: '78.00%',
    rightsConversionRate: '82.50%',
    maintainFollowupTotalRate: '81.00%',
    maintainFollowupRate: '81.00%',
    deliveryExpTotalRate: '89.50%',
    efficientDeliveryRate: '91.00%',
    deliveryGuideCardRate: '88.00%',
    summaryTotalRate: '85.80%',
    fiveLinksKeyPointsRate: '89.00%',
    sixChangesValueRate: '82.60%'
  },
  {
    id: 2,
    region: '华东大区',
    mac: '华东一小区',
    dealerCode: 'CAD-8802',
    dealerShortName: '上海浦东冠松',
    employeeName: '李娜',
    carModel: 'XT5 PHEV',
    sessionCount: '第1场',
    startTime: '2026-07-26 09:30:00',
    endTime: '2026-07-26 12:00:00',
    executionRate: '82.33%',
    courseIntroTotalRate: '84.00%',
    customerJourneyRate: '85.50%',
    nevVsFuelRate: '88.00%',
    sixChangesRate: '81.00%',
    fiveProcessesRate: '86.50%',
    processMapRate: '80.00%',
    keyTouchpointsRate: '83.00%',
    staticRouteRate: '85.00%',
    dynamicRouteRate: '83.00%',
    preciseInviteTotalRate: '82.00%',
    preciseInviteRate: '82.00%',
    diffReceptionTotalRate: '79.50%',
    diffReceptionStrategyRate: '81.00%',
    threeStepDemoRate: '78.00%',
    dynamicExpTotalRate: '77.60%',
    testDriveThreeQuestionsRate: '80.50%',
    boardingPrepRate: '87.00%',
    grassSmartDrivingRate: '72.00%',
    hummingbirdChassisRate: '78.50%',
    threeModesCoverageRate: '71.00%',
    highSpecServiceRate: '80.00%',
    doubtResolutionRate: '72.50%',
    rightsConversionRate: '79.30%',
    maintainFollowupTotalRate: '76.80%',
    maintainFollowupRate: '76.80%',
    deliveryExpTotalRate: '85.00%',
    efficientDeliveryRate: '87.00%',
    deliveryGuideCardRate: '83.00%',
    summaryTotalRate: '80.20%',
    fiveLinksKeyPointsRate: '84.00%',
    sixChangesValueRate: '76.40%'
  },
  {
    id: 3,
    region: '华北大区',
    mac: '华北一小区',
    dealerCode: 'CAD-1103',
    dealerShortName: '北京朝阳达世行',
    employeeName: '王强',
    carModel: 'XT5 PHEV',
    sessionCount: '第2场',
    startTime: '2026-07-27 08:30:00',
    endTime: '2026-07-27 11:00:00',
    executionRate: '79.20%',
    courseIntroTotalRate: '81.20%',
    customerJourneyRate: '83.00%',
    nevVsFuelRate: '85.00%',
    sixChangesRate: '78.00%',
    fiveProcessesRate: '83.00%',
    processMapRate: '77.50%',
    keyTouchpointsRate: '80.00%',
    staticRouteRate: '82.00%',
    dynamicRouteRate: '81.10%',
    preciseInviteTotalRate: '78.50%',
    preciseInviteRate: '78.50%',
    diffReceptionTotalRate: '76.00%',
    diffReceptionStrategyRate: '78.00%',
    threeStepDemoRate: '74.00%',
    dynamicExpTotalRate: '74.30%',
    testDriveThreeQuestionsRate: '78.00%',
    boardingPrepRate: '84.50%',
    grassSmartDrivingRate: '68.00%',
    hummingbirdChassisRate: '75.00%',
    threeModesCoverageRate: '67.50%',
    highSpecServiceRate: '77.00%',
    doubtResolutionRate: '69.00%',
    rightsConversionRate: '75.40%',
    maintainFollowupTotalRate: '74.00%',
    maintainFollowupRate: '74.00%',
    deliveryExpTotalRate: '82.50%',
    efficientDeliveryRate: '84.00%',
    deliveryGuideCardRate: '81.00%',
    summaryTotalRate: '77.60%',
    fiveLinksKeyPointsRate: '81.00%',
    sixChangesValueRate: '74.20%'
  },
  {
    id: 4,
    region: '华南大区',
    mac: '华南一小区',
    dealerCode: 'CAD-4405',
    dealerShortName: '广州天河安骅',
    employeeName: '刘洋',
    carModel: 'XT5 PHEV',
    sessionCount: '第1场',
    startTime: '2026-07-26 10:00:00',
    endTime: '2026-07-26 12:30:00',
    executionRate: '76.67%',
    courseIntroTotalRate: '78.50%',
    customerJourneyRate: '80.00%',
    nevVsFuelRate: '82.00%',
    sixChangesRate: '75.00%',
    fiveProcessesRate: '80.50%',
    processMapRate: '74.00%',
    keyTouchpointsRate: '78.00%',
    staticRouteRate: '80.00%',
    dynamicRouteRate: '78.50%',
    preciseInviteTotalRate: '76.00%',
    preciseInviteRate: '76.00%',
    diffReceptionTotalRate: '73.50%',
    diffReceptionStrategyRate: '75.00%',
    threeStepDemoRate: '72.00%',
    dynamicExpTotalRate: '71.80%',
    testDriveThreeQuestionsRate: '75.00%',
    boardingPrepRate: '82.00%',
    grassSmartDrivingRate: '65.00%',
    hummingbirdChassisRate: '72.00%',
    threeModesCoverageRate: '64.00%',
    highSpecServiceRate: '74.50%',
    doubtResolutionRate: '66.00%',
    rightsConversionRate: '73.00%',
    maintainFollowupTotalRate: '71.50%',
    maintainFollowupRate: '71.50%',
    deliveryExpTotalRate: '79.00%',
    efficientDeliveryRate: '81.00%',
    deliveryGuideCardRate: '77.00%',
    summaryTotalRate: '75.00%',
    fiveLinksKeyPointsRate: '78.00%',
    sixChangesValueRate: '72.00%'
  },
  {
    id: 5,
    region: '西南大区',
    mac: '西南一小区',
    dealerCode: 'CAD-5108',
    dealerShortName: '成都锦江新双立',
    employeeName: '陈杰',
    carModel: 'XT5 PHEV',
    sessionCount: '第1场',
    startTime: '2026-07-28 09:00:00',
    endTime: '2026-07-28 11:30:00',
    executionRate: '72.50%',
    courseIntroTotalRate: '75.00%',
    customerJourneyRate: '76.50%',
    nevVsFuelRate: '79.00%',
    sixChangesRate: '72.00%',
    fiveProcessesRate: '77.00%',
    processMapRate: '70.00%',
    keyTouchpointsRate: '74.00%',
    staticRouteRate: '76.00%',
    dynamicRouteRate: '74.50%',
    preciseInviteTotalRate: '72.00%',
    preciseInviteRate: '72.00%',
    diffReceptionTotalRate: '69.00%',
    diffReceptionStrategyRate: '71.00%',
    threeStepDemoRate: '67.00%',
    dynamicExpTotalRate: '67.40%',
    testDriveThreeQuestionsRate: '71.00%',
    boardingPrepRate: '78.00%',
    grassSmartDrivingRate: '61.00%',
    hummingbirdChassisRate: '68.00%',
    threeModesCoverageRate: '60.00%',
    highSpecServiceRate: '70.00%',
    doubtResolutionRate: '62.00%',
    rightsConversionRate: '69.20%',
    maintainFollowupTotalRate: '68.00%',
    maintainFollowupRate: '68.00%',
    deliveryExpTotalRate: '75.50%',
    efficientDeliveryRate: '78.00%',
    deliveryGuideCardRate: '73.00%',
    summaryTotalRate: '71.20%',
    fiveLinksKeyPointsRate: '74.00%',
    sixChangesValueRate: '68.40%'
  },
  {
    id: 6,
    region: '华东大区',
    mac: '华东二小区',
    dealerCode: 'CAD-3302',
    dealerShortName: '杭州西湖元通',
    employeeName: '周芳',
    carModel: 'XT5 PHEV',
    sessionCount: '第2场',
    startTime: '2026-07-27 09:00:00',
    endTime: '2026-07-27 11:30:00',
    executionRate: '70.17%',
    courseIntroTotalRate: '72.50%',
    customerJourneyRate: '74.00%',
    nevVsFuelRate: '76.00%',
    sixChangesRate: '69.00%',
    fiveProcessesRate: '74.50%',
    processMapRate: '68.00%',
    keyTouchpointsRate: '71.00%',
    staticRouteRate: '73.00%',
    dynamicRouteRate: '71.50%',
    preciseInviteTotalRate: '70.00%',
    preciseInviteRate: '70.00%',
    diffReceptionTotalRate: '67.00%',
    diffReceptionStrategyRate: '69.00%',
    threeStepDemoRate: '65.00%',
    dynamicExpTotalRate: '65.20%',
    testDriveThreeQuestionsRate: '69.00%',
    boardingPrepRate: '75.00%',
    grassSmartDrivingRate: '59.00%',
    hummingbirdChassisRate: '65.50%',
    threeModesCoverageRate: '58.00%',
    highSpecServiceRate: '67.00%',
    doubtResolutionRate: '60.00%',
    rightsConversionRate: '67.00%',
    maintainFollowupTotalRate: '65.00%',
    maintainFollowupRate: '65.00%',
    deliveryExpTotalRate: '72.00%',
    efficientDeliveryRate: '74.00%',
    deliveryGuideCardRate: '70.00%',
    summaryTotalRate: '68.50%',
    fiveLinksKeyPointsRate: '71.00%',
    sixChangesValueRate: '66.00%'
  },
  {
    id: 7,
    region: '华南大区',
    mac: '华南二小区',
    dealerCode: 'CAD-4409',
    dealerShortName: '深圳南山标特',
    employeeName: '赵云',
    carModel: 'XT5 PHEV',
    sessionCount: '第1场',
    startTime: '2026-07-28 09:30:00',
    endTime: '2026-07-28 12:00:00',
    executionRate: '67.00%',
    courseIntroTotalRate: '69.00%',
    customerJourneyRate: '71.00%',
    nevVsFuelRate: '73.00%',
    sixChangesRate: '66.00%',
    fiveProcessesRate: '71.00%',
    processMapRate: '65.00%',
    keyTouchpointsRate: '68.00%',
    staticRouteRate: '70.00%',
    dynamicRouteRate: '68.00%',
    preciseInviteTotalRate: '66.50%',
    preciseInviteRate: '66.50%',
    diffReceptionTotalRate: '64.00%',
    diffReceptionStrategyRate: '66.00%',
    threeStepDemoRate: '62.00%',
    dynamicExpTotalRate: '62.00%',
    testDriveThreeQuestionsRate: '66.00%',
    boardingPrepRate: '72.00%',
    grassSmartDrivingRate: '56.00%',
    hummingbirdChassisRate: '62.00%',
    threeModesCoverageRate: '55.00%',
    highSpecServiceRate: '64.00%',
    doubtResolutionRate: '57.00%',
    rightsConversionRate: '64.00%',
    maintainFollowupTotalRate: '62.00%',
    maintainFollowupRate: '62.00%',
    deliveryExpTotalRate: '69.00%',
    efficientDeliveryRate: '71.00%',
    deliveryGuideCardRate: '67.00%',
    summaryTotalRate: '65.00%',
    fiveLinksKeyPointsRate: '68.00%',
    sixChangesValueRate: '62.00%'
  },
  {
    id: 8,
    region: '华东大区',
    mac: '华东二小区',
    dealerCode: 'CAD-3201',
    dealerShortName: '南京新街口弘生',
    employeeName: '孙丽',
    carModel: 'XT5 PHEV',
    sessionCount: '第1场',
    startTime: '2026-07-29 09:00:00',
    endTime: '2026-07-29 11:30:00',
    executionRate: '63.67%',
    courseIntroTotalRate: '66.00%',
    customerJourneyRate: '68.00%',
    nevVsFuelRate: '70.00%',
    sixChangesRate: '63.00%',
    fiveProcessesRate: '68.00%',
    processMapRate: '62.00%',
    keyTouchpointsRate: '65.00%',
    staticRouteRate: '67.00%',
    dynamicRouteRate: '65.00%',
    preciseInviteTotalRate: '63.00%',
    preciseInviteRate: '63.00%',
    diffReceptionTotalRate: '60.50%',
    diffReceptionStrategyRate: '62.00%',
    threeStepDemoRate: '59.00%',
    dynamicExpTotalRate: '58.50%',
    testDriveThreeQuestionsRate: '62.00%',
    boardingPrepRate: '69.00%',
    grassSmartDrivingRate: '52.00%',
    hummingbirdChassisRate: '58.00%',
    threeModesCoverageRate: '51.00%',
    highSpecServiceRate: '61.00%',
    doubtResolutionRate: '54.00%',
    rightsConversionRate: '60.50%',
    maintainFollowupTotalRate: '59.00%',
    maintainFollowupRate: '59.00%',
    deliveryExpTotalRate: '65.00%',
    efficientDeliveryRate: '67.00%',
    deliveryGuideCardRate: '63.00%',
    summaryTotalRate: '61.50%',
    fiveLinksKeyPointsRate: '64.00%',
    sixChangesValueRate: '59.00%'
  },
  {
    id: 9,
    region: '华中大区',
    mac: '华中一小区',
    dealerCode: 'CAD-4203',
    dealerShortName: '武汉光谷恒信',
    employeeName: '钱勇',
    carModel: 'XT5 PHEV',
    sessionCount: '第3场',
    startTime: '2026-07-29 14:00:00',
    endTime: '2026-07-29 16:30:00',
    executionRate: '59.83%',
    courseIntroTotalRate: '62.00%',
    customerJourneyRate: '64.00%',
    nevVsFuelRate: '66.00%',
    sixChangesRate: '59.00%',
    fiveProcessesRate: '64.00%',
    processMapRate: '58.00%',
    keyTouchpointsRate: '61.00%',
    staticRouteRate: '63.00%',
    dynamicRouteRate: '61.00%',
    preciseInviteTotalRate: '59.00%',
    preciseInviteRate: '59.00%',
    diffReceptionTotalRate: '56.00%',
    diffReceptionStrategyRate: '58.00%',
    threeStepDemoRate: '54.00%',
    dynamicExpTotalRate: '54.20%',
    testDriveThreeQuestionsRate: '58.00%',
    boardingPrepRate: '65.00%',
    grassSmartDrivingRate: '48.00%',
    hummingbirdChassisRate: '54.00%',
    threeModesCoverageRate: '47.00%',
    highSpecServiceRate: '57.00%',
    doubtResolutionRate: '50.00%',
    rightsConversionRate: '56.00%',
    maintainFollowupTotalRate: '55.00%',
    maintainFollowupRate: '55.00%',
    deliveryExpTotalRate: '61.00%',
    efficientDeliveryRate: '63.00%',
    deliveryGuideCardRate: '59.00%',
    summaryTotalRate: '57.00%',
    fiveLinksKeyPointsRate: '60.00%',
    sixChangesValueRate: '54.00%'
  },
  {
    id: 10,
    region: '华东大区',
    mac: '华东一小区',
    dealerCode: 'CAD-3205',
    dealerShortName: '苏州园区建发',
    employeeName: '吴婷',
    carModel: 'XT5 PHEV',
    sessionCount: '第2场',
    startTime: '2026-07-30 09:00:00',
    endTime: '2026-07-30 11:30:00',
    executionRate: '54.83%',
    courseIntroTotalRate: '57.00%',
    customerJourneyRate: '59.00%',
    nevVsFuelRate: '61.00%',
    sixChangesRate: '54.00%',
    fiveProcessesRate: '59.00%',
    processMapRate: '53.00%',
    keyTouchpointsRate: '56.00%',
    staticRouteRate: '58.00%',
    dynamicRouteRate: '56.00%',
    preciseInviteTotalRate: '54.00%',
    preciseInviteRate: '54.00%',
    diffReceptionTotalRate: '51.00%',
    diffReceptionStrategyRate: '53.00%',
    threeStepDemoRate: '49.00%',
    dynamicExpTotalRate: '49.50%',
    testDriveThreeQuestionsRate: '53.00%',
    boardingPrepRate: '60.00%',
    grassSmartDrivingRate: '43.00%',
    hummingbirdChassisRate: '49.00%',
    threeModesCoverageRate: '42.00%',
    highSpecServiceRate: '52.00%',
    doubtResolutionRate: '45.00%',
    rightsConversionRate: '51.00%',
    maintainFollowupTotalRate: '50.00%',
    maintainFollowupRate: '50.00%',
    deliveryExpTotalRate: '56.00%',
    efficientDeliveryRate: '58.00%',
    deliveryGuideCardRate: '54.00%',
    summaryTotalRate: '52.50%',
    fiveLinksKeyPointsRate: '55.00%',
    sixChangesValueRate: '50.00%'
  }
];

const MOCK_PRACTICE_DETAIL_DATA: PracticeDetailRow[] = [
  {
    id: 1,
    date: '2026-08-01',
    region: '华东大区',
    mac: '华东一小区',
    dealerCode: 'CAD-8801',
    dealerShortName: '上海徐汇凯迪拉克',
    consultantName: '张强',
    carModel: 'XT5 PHEV',
    docNo: 'DRV-20260801-001',
    startTime: '2026-08-01 09:30:15',
    endTime: '2026-08-01 10:02:45',
    overallRate: '92.30%',
    headExplainRate: '90.00%',
    blueLightRate: '90.00%',
    frontRowExplainRate: '94.20%',
    sofaRate: '96.00%',
    napModeRate: '92.00%',
    screenAudioFragranceRate: '95.00%',
    warmCoolBoxRate: '90.00%',
    funcHallRate: '94.00%',
    aiVoiceRate: '98.00%',
    rearExplainRate: '88.00%',
    dischargeTrunkRate: '88.00%',
    inviteScriptRate: '91.50%',
    firstInviteRate: '93.00%',
    secondInviteRate: '90.00%',
    departurePrepRate: '92.00%',
    routeMapExplainRate: '94.00%',
    remoteStartRate: '92.00%',
    remoteParkingRate: '90.00%',
    customerRideRate: '89.50%',
    openNopRate: '90.00%',
    trafficLightRate: '88.00%',
    turnGamingRate: '86.00%',
    avoidObstacleRate: '92.00%',
    traceReverseRate: '90.00%',
    rampMergeRate: '89.00%',
    efficientPassRate: '91.50%',
    customerDriveRate: '93.80%',
    phevSystemRate: '95.00%',
    rtdHummingbirdRate: '92.00%',
    cityNopRate: '88.00%',
    leaveCarParkRate: '94.00%',
    autoParkRate: '98.00%',
    sentryModeRate: '96.00%',
    endDriveNegotiateRate: '95.00%',
    negotiateRate: '96.00%',
    blindOrderBenefitRate: '94.00%'
  },
  {
    id: 2,
    date: '2026-08-01',
    region: '华东大区',
    mac: '华东一小区',
    dealerCode: 'CAD-8801',
    dealerShortName: '上海徐汇凯迪拉克',
    consultantName: '李敏',
    carModel: 'XT5 PHEV',
    docNo: 'DRV-20260801-002',
    startTime: '2026-08-01 10:15:00',
    endTime: '2026-08-01 10:45:48',
    overallRate: '88.50%',
    headExplainRate: '86.00%',
    blueLightRate: '86.00%',
    frontRowExplainRate: '90.50%',
    sofaRate: '92.00%',
    napModeRate: '88.00%',
    screenAudioFragranceRate: '91.00%',
    warmCoolBoxRate: '85.00%',
    funcHallRate: '90.00%',
    aiVoiceRate: '97.00%',
    rearExplainRate: '82.00%',
    dischargeTrunkRate: '82.00%',
    inviteScriptRate: '87.00%',
    firstInviteRate: '89.00%',
    secondInviteRate: '85.00%',
    departurePrepRate: '88.00%',
    routeMapExplainRate: '90.00%',
    remoteStartRate: '88.00%',
    remoteParkingRate: '86.00%',
    customerRideRate: '84.20%',
    openNopRate: '85.00%',
    trafficLightRate: '82.00%',
    turnGamingRate: '80.00%',
    avoidObstacleRate: '88.00%',
    traceReverseRate: '85.00%',
    rampMergeRate: '83.00%',
    efficientPassRate: '86.50%',
    customerDriveRate: '90.20%',
    phevSystemRate: '91.00%',
    rtdHummingbirdRate: '88.00%',
    cityNopRate: '82.00%',
    leaveCarParkRate: '90.00%',
    autoParkRate: '95.00%',
    sentryModeRate: '95.00%',
    endDriveNegotiateRate: '91.50%',
    negotiateRate: '93.00%',
    blindOrderBenefitRate: '90.00%'
  },
  {
    id: 3,
    date: '2026-07-31',
    region: '华东大区',
    mac: '华东一小区',
    dealerCode: 'CAD-8802',
    dealerShortName: '上海浦东凯迪拉克',
    consultantName: '王亮',
    carModel: '新XT5',
    docNo: 'DRV-20260731-003',
    startTime: '2026-07-31 14:20:10',
    endTime: '2026-07-31 14:49:40',
    overallRate: '84.20%',
    headExplainRate: '82.00%',
    blueLightRate: '82.00%',
    frontRowExplainRate: '86.50%',
    sofaRate: '88.00%',
    napModeRate: '84.00%',
    screenAudioFragranceRate: '87.00%',
    warmCoolBoxRate: '80.00%',
    funcHallRate: '86.00%',
    aiVoiceRate: '94.00%',
    rearExplainRate: '78.00%',
    dischargeTrunkRate: '78.00%',
    inviteScriptRate: '83.00%',
    firstInviteRate: '85.00%',
    secondInviteRate: '81.00%',
    departurePrepRate: '84.00%',
    routeMapExplainRate: '86.00%',
    remoteStartRate: '84.00%',
    remoteParkingRate: '82.00%',
    customerRideRate: '80.10%',
    openNopRate: '81.00%',
    trafficLightRate: '78.00%',
    turnGamingRate: '76.00%',
    avoidObstacleRate: '84.00%',
    traceReverseRate: '81.00%',
    rampMergeRate: '79.00%',
    efficientPassRate: '82.00%',
    customerDriveRate: '86.50%',
    phevSystemRate: '88.00%',
    rtdHummingbirdRate: '84.00%',
    cityNopRate: '78.00%',
    leaveCarParkRate: '86.00%',
    autoParkRate: '92.00%',
    sentryModeRate: '91.00%',
    endDriveNegotiateRate: '88.00%',
    negotiateRate: '90.00%',
    blindOrderBenefitRate: '86.00%'
  },
  {
    id: 4,
    date: '2026-07-31',
    region: '华北大区',
    mac: '华北一小区',
    dealerCode: 'CAD-8803',
    dealerShortName: '北京朝阳凯迪拉克',
    consultantName: '刘芳',
    carModel: 'XT5 PHEV',
    docNo: 'DRV-20260731-004',
    startTime: '2026-07-31 11:00:30',
    endTime: '2026-07-31 11:28:30',
    overallRate: '80.00%',
    headExplainRate: '78.00%',
    blueLightRate: '78.00%',
    frontRowExplainRate: '82.00%',
    sofaRate: '84.00%',
    napModeRate: '79.00%',
    screenAudioFragranceRate: '83.00%',
    warmCoolBoxRate: '76.00%',
    funcHallRate: '82.00%',
    aiVoiceRate: '88.00%',
    rearExplainRate: '74.00%',
    dischargeTrunkRate: '74.00%',
    inviteScriptRate: '79.00%',
    firstInviteRate: '81.00%',
    secondInviteRate: '77.00%',
    departurePrepRate: '80.00%',
    routeMapExplainRate: '82.00%',
    remoteStartRate: '80.00%',
    remoteParkingRate: '78.00%',
    customerRideRate: '76.50%',
    openNopRate: '77.00%',
    trafficLightRate: '74.00%',
    turnGamingRate: '72.00%',
    avoidObstacleRate: '80.00%',
    traceReverseRate: '78.00%',
    rampMergeRate: '75.00%',
    efficientPassRate: '79.00%',
    customerDriveRate: '82.00%',
    phevSystemRate: '84.00%',
    rtdHummingbirdRate: '80.00%',
    cityNopRate: '74.00%',
    leaveCarParkRate: '82.00%',
    autoParkRate: '88.00%',
    sentryModeRate: '86.00%',
    endDriveNegotiateRate: '84.00%',
    negotiateRate: '86.00%',
    blindOrderBenefitRate: '82.00%'
  },
  {
    id: 5,
    date: '2026-07-30',
    region: '华南大区',
    mac: '华南一小区',
    dealerCode: 'CAD-8804',
    dealerShortName: '广州天河凯迪拉克',
    consultantName: '陈刚',
    carModel: 'LYRIQ锐歌',
    docNo: 'DRV-20260730-005',
    startTime: '2026-07-30 15:45:00',
    endTime: '2026-07-30 16:12:30',
    overallRate: '77.40%',
    headExplainRate: '75.00%',
    blueLightRate: '75.00%',
    frontRowExplainRate: '79.50%',
    sofaRate: '81.00%',
    napModeRate: '76.00%',
    screenAudioFragranceRate: '80.00%',
    warmCoolBoxRate: '73.00%',
    funcHallRate: '79.00%',
    aiVoiceRate: '88.00%',
    rearExplainRate: '71.00%',
    dischargeTrunkRate: '71.00%',
    inviteScriptRate: '76.00%',
    firstInviteRate: '78.00%',
    secondInviteRate: '74.00%',
    departurePrepRate: '77.00%',
    routeMapExplainRate: '79.00%',
    remoteStartRate: '77.00%',
    remoteParkingRate: '75.00%',
    customerRideRate: '73.80%',
    openNopRate: '74.00%',
    trafficLightRate: '71.00%',
    turnGamingRate: '69.00%',
    avoidObstacleRate: '77.00%',
    traceReverseRate: '74.00%',
    rampMergeRate: '72.00%',
    efficientPassRate: '76.00%',
    customerDriveRate: '79.50%',
    phevSystemRate: '81.00%',
    rtdHummingbirdRate: '77.00%',
    cityNopRate: '71.00%',
    leaveCarParkRate: '79.00%',
    autoParkRate: '85.00%',
    sentryModeRate: '84.00%',
    endDriveNegotiateRate: '81.00%',
    negotiateRate: '83.00%',
    blindOrderBenefitRate: '79.00%'
  },
  {
    id: 6,
    date: '2026-07-30',
    region: '西南大区',
    mac: '西南一小区',
    dealerCode: 'CAD-8805',
    dealerShortName: '成都锦江凯迪拉克',
    consultantName: '杨洋',
    carModel: 'XT5 PHEV',
    docNo: 'DRV-20260730-006',
    startTime: '2026-07-30 16:30:12',
    endTime: '2026-07-30 16:56:12',
    overallRate: '73.20%',
    headExplainRate: '71.00%',
    blueLightRate: '71.00%',
    frontRowExplainRate: '75.00%',
    sofaRate: '78.00%',
    napModeRate: '72.00%',
    screenAudioFragranceRate: '76.00%',
    warmCoolBoxRate: '69.00%',
    funcHallRate: '74.00%',
    aiVoiceRate: '82.00%',
    rearExplainRate: '68.00%',
    dischargeTrunkRate: '68.00%',
    inviteScriptRate: '72.00%',
    firstInviteRate: '74.00%',
    secondInviteRate: '70.00%',
    departurePrepRate: '73.00%',
    routeMapExplainRate: '75.00%',
    remoteStartRate: '73.00%',
    remoteParkingRate: '71.00%',
    customerRideRate: '70.00%',
    openNopRate: '71.00%',
    trafficLightRate: '67.00%',
    turnGamingRate: '65.00%',
    avoidObstacleRate: '73.00%',
    traceReverseRate: '71.00%',
    rampMergeRate: '68.00%',
    efficientPassRate: '72.00%',
    customerDriveRate: '75.20%',
    phevSystemRate: '77.00%',
    rtdHummingbirdRate: '73.00%',
    cityNopRate: '67.00%',
    leaveCarParkRate: '75.00%',
    autoParkRate: '81.00%',
    sentryModeRate: '80.00%',
    endDriveNegotiateRate: '77.00%',
    negotiateRate: '79.00%',
    blindOrderBenefitRate: '75.00%'
  },
  {
    id: 7,
    date: '2026-07-29',
    region: '华东大区',
    mac: '华东二小区',
    dealerCode: 'CAD-8806',
    dealerShortName: '杭州西湖凯迪拉克',
    consultantName: '赵婷',
    carModel: '新XT5',
    docNo: 'DRV-20260729-007',
    startTime: '2026-07-29 09:10:00',
    endTime: '2026-07-29 09:35:12',
    overallRate: '69.50%',
    headExplainRate: '67.00%',
    blueLightRate: '67.00%',
    frontRowExplainRate: '71.50%',
    sofaRate: '74.00%',
    napModeRate: '68.00%',
    screenAudioFragranceRate: '72.00%',
    warmCoolBoxRate: '65.00%',
    funcHallRate: '70.00%',
    aiVoiceRate: '80.00%',
    rearExplainRate: '64.00%',
    dischargeTrunkRate: '64.00%',
    inviteScriptRate: '68.00%',
    firstInviteRate: '70.00%',
    secondInviteRate: '66.00%',
    departurePrepRate: '69.00%',
    routeMapExplainRate: '71.00%',
    remoteStartRate: '69.00%',
    remoteParkingRate: '67.00%',
    customerRideRate: '66.40%',
    openNopRate: '67.00%',
    trafficLightRate: '63.00%',
    turnGamingRate: '61.00%',
    avoidObstacleRate: '69.00%',
    traceReverseRate: '67.00%',
    rampMergeRate: '64.00%',
    efficientPassRate: '68.00%',
    customerDriveRate: '71.80%',
    phevSystemRate: '73.00%',
    rtdHummingbirdRate: '69.00%',
    cityNopRate: '63.00%',
    leaveCarParkRate: '71.00%',
    autoParkRate: '78.00%',
    sentryModeRate: '76.00%',
    endDriveNegotiateRate: '73.00%',
    negotiateRate: '75.00%',
    blindOrderBenefitRate: '71.00%'
  },
  {
    id: 8,
    date: '2026-07-29',
    region: '华南大区',
    mac: '华南二小区',
    dealerCode: 'CAD-8807',
    dealerShortName: '深圳南山凯迪拉克',
    consultantName: '周芳',
    carModel: 'XT5 PHEV',
    docNo: 'DRV-20260729-008',
    startTime: '2026-07-29 10:00:00',
    endTime: '2026-07-29 10:27:30',
    overallRate: '67.00%',
    headExplainRate: '64.00%',
    blueLightRate: '64.00%',
    frontRowExplainRate: '69.00%',
    sofaRate: '71.00%',
    napModeRate: '65.00%',
    screenAudioFragranceRate: '70.00%',
    warmCoolBoxRate: '62.00%',
    funcHallRate: '68.00%',
    aiVoiceRate: '78.00%',
    rearExplainRate: '61.00%',
    dischargeTrunkRate: '61.00%',
    inviteScriptRate: '65.00%',
    firstInviteRate: '67.00%',
    secondInviteRate: '63.00%',
    departurePrepRate: '66.00%',
    routeMapExplainRate: '68.00%',
    remoteStartRate: '66.00%',
    remoteParkingRate: '64.00%',
    customerRideRate: '63.50%',
    openNopRate: '64.00%',
    trafficLightRate: '60.00%',
    turnGamingRate: '58.00%',
    avoidObstacleRate: '66.00%',
    traceReverseRate: '64.00%',
    rampMergeRate: '61.00%',
    efficientPassRate: '65.00%',
    customerDriveRate: '68.50%',
    phevSystemRate: '70.00%',
    rtdHummingbirdRate: '66.00%',
    cityNopRate: '60.00%',
    leaveCarParkRate: '68.00%',
    autoParkRate: '75.00%',
    sentryModeRate: '73.00%',
    endDriveNegotiateRate: '70.50%',
    negotiateRate: '72.00%',
    blindOrderBenefitRate: '69.00%'
  },
  {
    id: 9,
    date: '2026-07-28',
    region: '华中大区',
    mac: '华中一小区',
    dealerCode: 'CAD-8808',
    dealerShortName: '武汉光谷凯迪拉克',
    consultantName: '钱勇',
    carModel: 'XT5 PHEV',
    docNo: 'DRV-20260728-009',
    startTime: '2026-07-28 13:30:00',
    endTime: '2026-07-28 13:58:00',
    overallRate: '59.83%',
    headExplainRate: '58.00%',
    blueLightRate: '58.00%',
    frontRowExplainRate: '62.00%',
    sofaRate: '65.00%',
    napModeRate: '58.00%',
    screenAudioFragranceRate: '63.00%',
    warmCoolBoxRate: '55.00%',
    funcHallRate: '60.00%',
    aiVoiceRate: '71.00%',
    rearExplainRate: '54.00%',
    dischargeTrunkRate: '54.00%',
    inviteScriptRate: '58.00%',
    firstInviteRate: '60.00%',
    secondInviteRate: '56.00%',
    departurePrepRate: '59.00%',
    routeMapExplainRate: '61.00%',
    remoteStartRate: '59.00%',
    remoteParkingRate: '57.00%',
    customerRideRate: '56.00%',
    openNopRate: '57.00%',
    trafficLightRate: '53.00%',
    turnGamingRate: '51.00%',
    avoidObstacleRate: '59.00%',
    traceReverseRate: '56.00%',
    rampMergeRate: '54.00%',
    efficientPassRate: '58.00%',
    customerDriveRate: '61.20%',
    phevSystemRate: '63.00%',
    rtdHummingbirdRate: '59.00%',
    cityNopRate: '53.00%',
    leaveCarParkRate: '61.00%',
    autoParkRate: '67.00%',
    sentryModeRate: '65.00%',
    endDriveNegotiateRate: '63.00%',
    negotiateRate: '65.00%',
    blindOrderBenefitRate: '61.00%'
  },
  {
    id: 10,
    date: '2026-07-28',
    region: '华东大区',
    mac: '华东一小区',
    dealerCode: 'CAD-8809',
    dealerShortName: '苏州园区凯迪拉克',
    consultantName: '吴婷',
    carModel: 'OPTIQ傲歌',
    docNo: 'DRV-20260728-010',
    startTime: '2026-07-28 15:10:00',
    endTime: '2026-07-28 15:37:45',
    overallRate: '54.83%',
    headExplainRate: '52.00%',
    blueLightRate: '52.00%',
    frontRowExplainRate: '57.50%',
    sofaRate: '60.00%',
    napModeRate: '53.00%',
    screenAudioFragranceRate: '58.00%',
    warmCoolBoxRate: '50.00%',
    funcHallRate: '56.00%',
    aiVoiceRate: '68.00%',
    rearExplainRate: '49.00%',
    dischargeTrunkRate: '49.00%',
    inviteScriptRate: '53.00%',
    firstInviteRate: '55.00%',
    secondInviteRate: '51.00%',
    departurePrepRate: '54.00%',
    routeMapExplainRate: '56.00%',
    remoteStartRate: '54.00%',
    remoteParkingRate: '52.00%',
    customerRideRate: '51.50%',
    openNopRate: '52.00%',
    trafficLightRate: '48.00%',
    turnGamingRate: '46.00%',
    avoidObstacleRate: '54.00%',
    traceReverseRate: '51.00%',
    rampMergeRate: '49.00%',
    efficientPassRate: '53.00%',
    customerDriveRate: '56.80%',
    phevSystemRate: '58.00%',
    rtdHummingbirdRate: '54.00%',
    cityNopRate: '48.00%',
    leaveCarParkRate: '56.00%',
    autoParkRate: '63.00%',
    sentryModeRate: '61.00%',
    endDriveNegotiateRate: '58.00%',
    negotiateRate: '60.00%',
    blindOrderBenefitRate: '56.00%'
  }
];

const InternalTrainerReport: React.FC = () => {
  // Main Category Tab State: 'transfer' (转训) or 'practice' (销售演练)
  const [mainTab, setMainTab] = useState<'transfer' | 'practice'>('transfer');

  // Sub-tab State under 'transfer'
  const [transferSubTab, setTransferSubTab] = useState<'xt5_manual' | 'rights_explain'>('xt5_manual');

  // Filter States
  const [selectedRegion, setSelectedRegion] = useState('全国');
  const [selectedSubRegion, setSelectedSubRegion] = useState('全部小区');
  const [selectedStore, setSelectedStore] = useState('请选择门店');
  const [dateRangeQuick, setDateRangeQuick] = useState<'yesterday' | '7days' | '30days'>('7days');
  const [startDate, setStartDate] = useState('2026/07/26');
  const [endDate, setEndDate] = useState('2026/08/01');

  // Transfer Table Sorting State
  type SortField = 'startTime' | 'endTime' | 'executionRate' | null;
  type SortDirection = 'asc' | 'desc';

  const [sortField, setSortField] = useState<SortField>(null);
  const [sortDirection, setSortDirection] = useState<SortDirection>('desc');

  // Toggle sorting logic for Transfer table
  const handleSort = (field: SortField) => {
    if (sortField === field) {
      if (sortDirection === 'desc') {
        setSortDirection('asc');
      } else {
        setSortField(null);
        setSortDirection('desc');
      }
    } else {
      setSortField(field);
      setSortDirection('desc');
    }
  };

  // Handle Query filter
  const handleQuery = () => {
    // In real app, fetches based on selected filters
  };

  // Handle Reset filter
  const handleReset = () => {
    setSelectedRegion('全国');
    setSelectedSubRegion('全部小区');
    setSelectedStore('请选择门店');
    setDateRangeQuick('7days');
    setStartDate('2026/07/26');
    setEndDate('2026/08/01');
    setSortField(null);
    setSortDirection('desc');
    setTransferSubTab('xt5_manual');
  };

  // Filter Transfer table data
  const filteredTableData = MOCK_TRANSFER_DETAIL_DATA.filter((row) => {
    if (selectedRegion !== '全国' && row.region !== selectedRegion) return false;
    if (selectedSubRegion !== '全部小区' && row.mac !== selectedSubRegion) return false;
    if (selectedStore !== '请选择门店' && !row.dealerShortName.includes(selectedStore.replace('旗舰店', '').replace('体验店', '').replace('中心店', '').replace('店', ''))) return false;
    return true;
  });

  // Sort Transfer table data
  const processedTableData = [...filteredTableData].sort((a, b) => {
    if (!sortField) return 0;
    let comp = 0;
    if (sortField === 'startTime' || sortField === 'endTime') {
      comp = a[sortField].localeCompare(b[sortField]);
    } else if (sortField === 'executionRate') {
      const valA = parseFloat(a.executionRate.replace('%', ''));
      const valB = parseFloat(b.executionRate.replace('%', ''));
      comp = valA - valB;
    }
    return sortDirection === 'asc' ? comp : -comp;
  });

  // Filter Sales Practice table data
  const processedPracticeData = MOCK_PRACTICE_DETAIL_DATA.filter((row) => {
    if (selectedRegion !== '全国' && row.region !== selectedRegion) return false;
    if (selectedSubRegion !== '全部小区' && row.mac !== selectedSubRegion) return false;
    if (selectedStore !== '请选择门店' && !row.dealerShortName.includes(selectedStore.replace('旗舰店', '').replace('体验店', '').replace('中心店', '').replace('店', ''))) return false;
    return true;
  });

  // Handle Download CSV for Sales Practice Detail
  const handlePracticeDownload = () => {
    const headers = [
      '日期',
      '大区',
      'MAC',
      '经销商CODE',
      '经销商简称',
      '顾问名称',
      '车型',
      '单据号',
      '开始时间',
      '结束时间',
      '总体执行率',
      '车头讲解(一级)',
      '智驾小蓝灯',
      '前排讲解(一级)',
      '美式大沙发',
      '小憩模式',
      '33英寸曲面屏/AKG音响/智能香氛',
      '智能冷暖箱',
      '功能演示厅',
      'AI智能语音',
      '车尾讲解(一级)',
      '外放电&后备箱',
      '邀约话术(一级)',
      '首次试驾邀请',
      '二次邀请试驾',
      '试驾出发准备(一级)',
      '对照路线图讲解',
      '远程启动',
      '遥控泊车',
      '客户试乘(一级)',
      '开启NOP',
      '十字路口直行通过红绿灯',
      '左转博弈/右转博弈',
      '直行避让行人/非机动车/停靠车',
      '循迹倒车',
      '匝道汇入',
      '高效通行',
      '客户试驾(一级)',
      '凯迪拉克插混系统',
      '预瞄RTD、电动蜂鸟底盘',
      '城区NOP',
      '离车泊入',
      '自动泊车',
      '哨兵模式',
      '结束试驾，回店洽谈(一级)',
      '回店洽谈',
      '盲定权益'
    ];

    const rows = processedPracticeData.map((item) => [
      item.date,
      item.region,
      item.mac,
      item.dealerCode,
      item.dealerShortName,
      item.consultantName,
      item.carModel,
      item.docNo,
      item.startTime,
      item.endTime,
      item.overallRate,
      item.headExplainRate,
      item.blueLightRate,
      item.frontRowExplainRate,
      item.sofaRate,
      item.napModeRate,
      item.screenAudioFragranceRate,
      item.warmCoolBoxRate,
      item.funcHallRate,
      item.aiVoiceRate,
      item.rearExplainRate,
      item.dischargeTrunkRate,
      item.inviteScriptRate,
      item.firstInviteRate,
      item.secondInviteRate,
      item.departurePrepRate,
      item.routeMapExplainRate,
      item.remoteStartRate,
      item.remoteParkingRate,
      item.customerRideRate,
      item.openNopRate,
      item.trafficLightRate,
      item.turnGamingRate,
      item.avoidObstacleRate,
      item.traceReverseRate,
      item.rampMergeRate,
      item.efficientPassRate,
      item.customerDriveRate,
      item.phevSystemRate,
      item.rtdHummingbirdRate,
      item.cityNopRate,
      item.leaveCarParkRate,
      item.autoParkRate,
      item.sentryModeRate,
      item.endDriveNegotiateRate,
      item.negotiateRate,
      item.blindOrderBenefitRate
    ]);

    const csvContent =
      'data:text/csv;charset=utf-8,\uFEFF' +
      [headers.join(','), ...rows.map((e) => e.map(val => `"${val}"`).join(','))].join('\n');

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `销售演练质检明细_${startDate.replace(/\//g, '')}-${endDate.replace(/\//g, '')}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Handle Download CSV for Transfer
  const handleDownload = () => {
    const headers = [
      '序号',
      '大区',
      'MAC',
      '经销商code',
      '经销商简称',
      '员工名称',
      '车型',
      '转训场次',
      '转训开始时间',
      '转训结束时间',
      '转训执行率',
      '课程导入总转训率（一级）',
      '专属客户体验旅程',
      '新能源vs传统燃油',
      '六大变革',
      '五大流程',
      '体验流程图',
      '关键触点',
      '静态体验动线',
      '动态体验动线',
      '精准邀约总转训率（一级）',
      '精准邀约',
      '差异化接待总转训率（一级）',
      '差异化接待策略',
      '三步递进式演示法',
      '动态体验总转训率（一级）',
      '试驾三问',
      '上车准备',
      '种草智驾',
      '蜂鸟底盘',
      '三模式全场景覆盖',
      '高规服务与价值强化',
      '疑虑消解与差异化对标',
      '权益推动转化',
      '维系跟进总转训率（一级）',
      '维系跟进',
      '交付体验总转训率（一级）',
      '高效交车',
      '交车导引卡',
      '总结总转训率（一级）',
      '五大环节核心要点',
      '六大核心变革的顶层价值'
    ];

    const rows = processedTableData.map((item, idx) => [
      idx + 1,
      item.region,
      item.mac,
      item.dealerCode,
      item.dealerShortName,
      item.employeeName,
      item.carModel,
      item.sessionCount,
      item.startTime,
      item.endTime,
      item.executionRate,
      item.courseIntroTotalRate,
      item.customerJourneyRate,
      item.nevVsFuelRate,
      item.sixChangesRate,
      item.fiveProcessesRate,
      item.processMapRate,
      item.keyTouchpointsRate,
      item.staticRouteRate,
      item.dynamicRouteRate,
      item.preciseInviteTotalRate,
      item.preciseInviteRate,
      item.diffReceptionTotalRate,
      item.diffReceptionStrategyRate,
      item.threeStepDemoRate,
      item.dynamicExpTotalRate,
      item.testDriveThreeQuestionsRate,
      item.boardingPrepRate,
      item.grassSmartDrivingRate,
      item.hummingbirdChassisRate,
      item.threeModesCoverageRate,
      item.highSpecServiceRate,
      item.doubtResolutionRate,
      item.rightsConversionRate,
      item.maintainFollowupTotalRate,
      item.maintainFollowupRate,
      item.deliveryExpTotalRate,
      item.efficientDeliveryRate,
      item.deliveryGuideCardRate,
      item.summaryTotalRate,
      item.fiveLinksKeyPointsRate,
      item.sixChangesValueRate
    ]);

    const csvContent =
      'data:text/csv;charset=utf-8,\uFEFF' +
      [headers.join(','), ...rows.map((e) => e.map(val => `"${val}"`).join(','))].join('\n');

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `转训明细_${startDate.replace(/\//g, '')}-${endDate.replace(/\//g, '')}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleQuickDateSelect = (option: 'yesterday' | '7days' | '30days') => {
    setDateRangeQuick(option);
    if (option === 'yesterday') {
      setStartDate('2026/08/08');
      setEndDate('2026/08/08');
    } else if (option === '7days') {
      setStartDate('2026/08/02');
      setEndDate('2026/08/08');
    } else if (option === '30days') {
      setStartDate('2026/07/10');
      setEndDate('2026/08/08');
    }
  };

  return (
    <div className="p-4 sm:p-6 space-y-6 bg-slate-50 dark:bg-slate-900 min-h-screen text-slate-800 dark:text-slate-100 font-sans">
      
      {/* 1. Header Filter Bar (Responsive & Width-Adaptive) */}
      <div className="bg-white dark:bg-slate-800 p-5 rounded-2xl border border-slate-200/80 dark:border-slate-700 shadow-2xs space-y-4">
        {/* Dropdown Selectors & Quick Options Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 items-center">
          {/* Region Select */}
          <div className="relative w-full">
            <select
              value={selectedRegion}
              onChange={(e) => setSelectedRegion(e.target.value)}
              className="w-full appearance-none bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 text-xs rounded-xl px-3.5 py-2.5 pr-8 focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium cursor-pointer shadow-2xs"
            >
              <option value="全国">全国</option>
              <option value="华东大区">华东大区</option>
              <option value="华北大区">华北大区</option>
              <option value="华南大区">华南大区</option>
              <option value="西南大区">西南大区</option>
              <option value="华中大区">华中大区</option>
            </select>
            <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
          </div>

          {/* Sub-region Select */}
          <div className="relative w-full">
            <select
              value={selectedSubRegion}
              onChange={(e) => setSelectedSubRegion(e.target.value)}
              className="w-full appearance-none bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 text-xs rounded-xl px-3.5 py-2.5 pr-8 focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium cursor-pointer shadow-2xs"
            >
              <option value="全部小区">全部小区</option>
              <option value="华东一小区">华东一小区</option>
              <option value="华东二小区">华东二小区</option>
              <option value="华北一小区">华北一小区</option>
              <option value="华南一小区">华南一小区</option>
              <option value="西南一小区">西南一小区</option>
            </select>
            <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
          </div>

          {/* Store Select */}
          <div className="relative w-full">
            <select
              value={selectedStore}
              onChange={(e) => setSelectedStore(e.target.value)}
              className="w-full appearance-none bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 text-xs rounded-xl px-3.5 py-2.5 pr-8 focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium cursor-pointer shadow-2xs"
            >
              <option value="请选择门店">请选择门店</option>
              <option value="上海徐汇旗舰店">上海徐汇旗舰店</option>
              <option value="上海浦东体验店">上海浦东体验店</option>
              <option value="北京朝阳中心店">北京朝阳中心店</option>
              <option value="广州天河旗舰店">广州天河旗舰店</option>
              <option value="成都锦江店">成都锦江店</option>
              <option value="杭州西湖店">杭州西湖店</option>
            </select>
            <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
          </div>

          {/* Quick Date Range Options */}
          <div className="flex items-center justify-between bg-slate-100 dark:bg-slate-900 p-1 rounded-xl border border-slate-200 dark:border-slate-700 w-full shadow-2xs">
            <button
              onClick={() => handleQuickDateSelect('yesterday')}
              className={`flex-1 py-1.5 text-xs font-medium rounded-lg transition-all cursor-pointer text-center ${
                dateRangeQuick === 'yesterday'
                  ? 'bg-white dark:bg-slate-800 text-blue-600 dark:text-blue-400 shadow-2xs font-semibold'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
              }`}
            >
              昨天
            </button>
            <button
              onClick={() => handleQuickDateSelect('7days')}
              className={`flex-1 py-1.5 text-xs font-medium rounded-lg transition-all cursor-pointer text-center ${
                dateRangeQuick === '7days'
                  ? 'bg-white dark:bg-slate-800 text-blue-600 dark:text-blue-400 shadow-2xs font-semibold'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
              }`}
            >
              近7天
            </button>
            <button
              onClick={() => handleQuickDateSelect('30days')}
              className={`flex-1 py-1.5 text-xs font-medium rounded-lg transition-all cursor-pointer text-center ${
                dateRangeQuick === '30days'
                  ? 'bg-white dark:bg-slate-800 text-blue-600 dark:text-blue-400 shadow-2xs font-semibold'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
              }`}
            >
              近30天
            </button>
          </div>
        </div>

        {/* Date Range Picker & Actions Row */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pt-1">
          <div className="flex items-center gap-3">
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 shrink-0">日期范围</span>
            <div className="flex items-center bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-3.5 py-2 gap-2 text-xs text-slate-700 dark:text-slate-200 shadow-2xs">
              <input
                type="text"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="bg-transparent text-slate-700 dark:text-slate-200 text-xs focus:outline-none w-20 text-center font-mono"
              />
              <span className="text-slate-400">⇀</span>
              <input
                type="text"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="bg-transparent text-slate-700 dark:text-slate-200 text-xs focus:outline-none w-20 text-center font-mono"
              />
              <Calendar size={14} className="text-slate-400" />
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              onClick={handleQuery}
              className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs rounded-xl transition-all shadow-xs flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <Search size={14} />
              <span>查询</span>
            </button>
            <button
              onClick={handleReset}
              className="px-6 py-2 bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 font-semibold text-xs rounded-xl transition-all cursor-pointer shadow-2xs"
            >
              <span>重置</span>
            </button>
          </div>
        </div>
      </div>

      {/* 2. Main Title Section: 工牌业务数据 & Main Category Tabs */}
      <div className="space-y-3">
        <div>
          <h2 className="text-lg font-bold text-slate-900 dark:text-white tracking-tight">
            工牌业务数据
          </h2>
        </div>

        {/* Category Tabs & Model Pill */}
        <div className="space-y-3">
          {/* Top Category Tabs: 转训 | 销售演练 */}
          <div className="flex items-center gap-6 border-b border-slate-200 dark:border-slate-700 pb-2">
            <button 
              onClick={() => setMainTab('transfer')}
              className={`text-sm font-bold pb-1 relative cursor-pointer transition-colors ${
                mainTab === 'transfer'
                  ? 'text-blue-600 dark:text-blue-400'
                  : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
              }`}
            >
              转训
              {mainTab === 'transfer' && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 dark:bg-blue-400 rounded-full"></span>
              )}
            </button>

            <button 
              onClick={() => setMainTab('practice')}
              className={`text-sm font-bold pb-1 relative cursor-pointer transition-colors ${
                mainTab === 'practice'
                  ? 'text-blue-600 dark:text-blue-400'
                  : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
              }`}
            >
              销售演练
              {mainTab === 'practice' && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 dark:bg-blue-400 rounded-full"></span>
              )}
            </button>
          </div>

          {/* Cadillac Vehicle Model / Transfer Sub-Tabs */}
          {mainTab === 'transfer' ? (
            <div className="flex flex-wrap items-center gap-2 pt-1">
              <button
                onClick={() => setTransferSubTab('xt5_manual')}
                className={`px-4 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  transferSubTab === 'xt5_manual'
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'bg-slate-100 dark:bg-slate-700/60 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                }`}
              >
                XT5 PHEV本品讲师手册
              </button>
              <button
                onClick={() => setTransferSubTab('rights_explain')}
                className={`px-4 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  transferSubTab === 'rights_explain'
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'bg-slate-100 dark:bg-slate-700/60 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                }`}
              >
                权益讲解
              </button>
            </div>
          ) : (
            <div className="flex flex-wrap items-center gap-2 pt-1">
              <button className="px-4 py-1.5 rounded-lg text-xs font-semibold bg-blue-600 text-white shadow-xs transition-all cursor-pointer">
                XT5 PHEV
              </button>
            </div>
          )}
        </div>
      </div>

      {/* ----------------- TAB CONTENT 1: 转训 ----------------- */}
      {mainTab === 'transfer' && (
        <>
          {/* 3. 转训 细项卡片 (样式参考销售演练细项，去掉总体执行率中的环比) */}
          <div className="bg-white dark:bg-slate-800 p-5 rounded-2xl border border-slate-200/80 dark:border-slate-700 shadow-2xs space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <span className="w-2.5 h-2.5 rounded-full bg-blue-600 dark:bg-blue-400"></span>
                <h3 className="text-sm font-bold text-slate-900 dark:text-white tracking-tight">
                  {transferSubTab === 'xt5_manual'
                    ? 'XT5 PHEV本品讲师手册转训细项执行率 (共24项)'
                    : '权益讲解转训细项执行率 (共8项)'}
                </h3>
              </div>
              <div className="text-xs text-slate-500 dark:text-slate-400">
                统计周期: {startDate} ~ {endDate}
              </div>
            </div>

            {/* Cards Grid: 1 综合指标 (无环比) + 24/8 细项卡片 */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-7 2xl:grid-cols-8 gap-3">
              {/* 综合指标: 转训总执行率 */}
              <div className="col-span-2 sm:col-span-2 md:col-span-2 lg:col-span-2 bg-gradient-to-br from-blue-600 via-indigo-600 to-indigo-800 text-white rounded-2xl p-4 flex flex-col justify-between shadow-md border border-blue-500 relative overflow-hidden">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold px-2.5 py-0.5 bg-white/20 text-white rounded-full backdrop-blur-xs">
                    综合指标
                  </span>
                  <TrendingUp size={18} className="text-blue-200" />
                </div>
                <div className="mt-3 space-y-1">
                  <span className="text-xs font-semibold text-blue-100 block">
                    {transferSubTab === 'xt5_manual' ? 'XT5 PHEV手册转训总执行率' : '权益讲解转训总执行率'}
                  </span>
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-black font-mono tracking-tight text-white">
                      {transferSubTab === 'xt5_manual' ? '57.03%' : '64.12%'}
                    </span>
                  </div>
                </div>
              </div>

              {/* 细项卡片 */}
              {(transferSubTab === 'xt5_manual' ? XT5_MANUAL_ITEMS : RIGHTS_EXPLAIN_ITEMS).map((item, idx) => (
                <div
                  key={item.id}
                  className="bg-slate-50 dark:bg-slate-900/80 border border-slate-200/80 dark:border-slate-700/80 rounded-2xl p-3.5 flex flex-col justify-between space-y-2 hover:border-blue-300 dark:hover:border-blue-600 transition-colors shadow-2xs group"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] text-slate-400 dark:text-slate-500 font-medium">
                      #{idx + 1} 细项
                    </span>
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-500/70 group-hover:scale-125 transition-transform"></span>
                  </div>
                  <span className="text-xs font-medium text-slate-700 dark:text-slate-200 line-clamp-2 leading-snug min-h-[32px] flex items-center">
                    {item.name}
                  </span>
                  <span className="text-lg font-bold text-slate-900 dark:text-white font-mono">
                    {item.rate}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* 4. Table Section: 门店转训明细 */}
          <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200/80 dark:border-slate-700 p-5 shadow-2xs space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                  转训数据明细列表
                </h3>
                <span className="text-xs text-slate-400 font-mono">
                  ({processedTableData.length} 条转训记录)
                </span>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={handleDownload}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 dark:bg-slate-700 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-200 text-xs rounded-lg transition-colors cursor-pointer font-medium"
                >
                  <Download size={13} />
                  <span>下载明细</span>
                </button>
              </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse whitespace-nowrap">
                <thead>
                  <tr className="bg-slate-700 dark:bg-slate-900 text-white font-medium select-none">
                    <th className="py-3 px-3 font-semibold text-center border-r border-slate-600/50 w-12 sticky left-0 z-10 bg-slate-700 dark:bg-slate-900">序号</th>
                    <th className="py-3 px-3 font-semibold border-r border-slate-600/50 text-center">大区</th>
                    <th className="py-3 px-3 font-semibold border-r border-slate-600/50 text-center">MAC</th>
                    <th className="py-3 px-3 font-semibold border-r border-slate-600/50 text-center">经销商code</th>
                    <th className="py-3 px-3 font-semibold border-r border-slate-600/50">经销商简称</th>
                    <th className="py-3 px-3 font-semibold border-r border-slate-600/50">员工名称</th>
                    <th className="py-3 px-3 font-semibold border-r border-slate-600/50 text-center">车型</th>
                    <th className="py-3 px-3 font-semibold border-r border-slate-600/50 text-center">转训场次</th>
                    
                    <th 
                      onClick={() => handleSort('startTime')}
                      className="py-3 px-3 font-semibold border-r border-slate-600/50 text-center cursor-pointer hover:bg-slate-600/70 transition-colors"
                      title="点击按转训开始时间排序"
                    >
                      <div className="inline-flex items-center justify-center gap-1">
                        <span>转训开始时间</span>
                        {sortField === 'startTime' ? (
                          sortDirection === 'asc' ? <ChevronUp size={13} className="text-blue-300 font-bold" /> : <ChevronDown size={13} className="text-blue-300 font-bold" />
                        ) : (
                          <ArrowUpDown size={12} className="text-slate-400 opacity-60" />
                        )}
                      </div>
                    </th>

                    <th 
                      onClick={() => handleSort('endTime')}
                      className="py-3 px-3 font-semibold border-r border-slate-600/50 text-center cursor-pointer hover:bg-slate-600/70 transition-colors"
                      title="点击按转训结束时间排序"
                    >
                      <div className="inline-flex items-center justify-center gap-1">
                        <span>转训结束时间</span>
                        {sortField === 'endTime' ? (
                          sortDirection === 'asc' ? <ChevronUp size={13} className="text-blue-300 font-bold" /> : <ChevronDown size={13} className="text-blue-300 font-bold" />
                        ) : (
                          <ArrowUpDown size={12} className="text-slate-400 opacity-60" />
                        )}
                      </div>
                    </th>

                    <th 
                      onClick={() => handleSort('executionRate')}
                      className="py-3 px-3 font-bold border-r border-slate-600/50 text-right text-rose-300 bg-rose-950/60 cursor-pointer hover:bg-rose-900/70 transition-colors"
                      title="点击按转训执行率排序"
                    >
                      <div className="inline-flex items-center justify-end gap-1 w-full">
                        <span>转训执行率</span>
                        {sortField === 'executionRate' ? (
                          sortDirection === 'asc' ? <ChevronUp size={13} className="text-rose-200 font-bold" /> : <ChevronDown size={13} className="text-rose-200 font-bold" />
                        ) : (
                          <ArrowUpDown size={12} className="text-rose-300/60" />
                        )}
                      </div>
                    </th>

                    {/* 一级: 课程导入总转训率 */}
                    <th className="py-3 px-3 font-bold border-r border-indigo-700/60 bg-indigo-900/70 text-indigo-200 text-right">课程导入总转训率（一级）</th>
                    <th className="py-3 px-3 font-semibold border-r border-slate-600/50 text-right">专属客户体验旅程</th>
                    <th className="py-3 px-3 font-semibold border-r border-slate-600/50 text-right">新能源vs传统燃油</th>
                    <th className="py-3 px-3 font-semibold border-r border-slate-600/50 text-right">六大变革</th>
                    <th className="py-3 px-3 font-semibold border-r border-slate-600/50 text-right">五大流程</th>
                    <th className="py-3 px-3 font-semibold border-r border-slate-600/50 text-right">体验流程图</th>
                    <th className="py-3 px-3 font-semibold border-r border-slate-600/50 text-right">关键触点</th>
                    <th className="py-3 px-3 font-semibold border-r border-slate-600/50 text-right">静态体验动线</th>
                    <th className="py-3 px-3 font-semibold border-r border-slate-600/50 text-right">动态体验动线</th>

                    {/* 一级: 精准邀约总转训率 */}
                    <th className="py-3 px-3 font-bold border-r border-blue-700/60 bg-blue-900/70 text-blue-200 text-right">精准邀约总转训率（一级）</th>
                    <th className="py-3 px-3 font-semibold border-r border-slate-600/50 text-right">精准邀约</th>

                    {/* 一级: 差异化接待总转训率 */}
                    <th className="py-3 px-3 font-bold border-r border-sky-700/60 bg-sky-900/70 text-sky-200 text-right">差异化接待总转训率（一级）</th>
                    <th className="py-3 px-3 font-semibold border-r border-slate-600/50 text-right">差异化接待策略</th>
                    <th className="py-3 px-3 font-semibold border-r border-slate-600/50 text-right">三步递进式演示法</th>

                    {/* 一级: 动态体验总转训率 */}
                    <th className="py-3 px-3 font-bold border-r border-teal-700/60 bg-teal-900/70 text-teal-200 text-right">动态体验总转训率（一级）</th>
                    <th className="py-3 px-3 font-semibold border-r border-slate-600/50 text-right">试驾三问</th>
                    <th className="py-3 px-3 font-semibold border-r border-slate-600/50 text-right">上车准备</th>
                    <th className="py-3 px-3 font-semibold border-r border-slate-600/50 text-right">种草智驾</th>
                    <th className="py-3 px-3 font-semibold border-r border-slate-600/50 text-right">蜂鸟底盘</th>
                    <th className="py-3 px-3 font-semibold border-r border-slate-600/50 text-right">三模式全场景覆盖</th>
                    <th className="py-3 px-3 font-semibold border-r border-slate-600/50 text-right">高规服务与价值强化</th>
                    <th className="py-3 px-3 font-semibold border-r border-slate-600/50 text-right">疑虑消解与差异化对标</th>
                    <th className="py-3 px-3 font-semibold border-r border-slate-600/50 text-right">权益推动转化</th>

                    {/* 一级: 维系跟进总转训率 */}
                    <th className="py-3 px-3 font-bold border-r border-violet-700/60 bg-violet-900/70 text-violet-200 text-right">维系跟进总转训率（一级）</th>
                    <th className="py-3 px-3 font-semibold border-r border-slate-600/50 text-right">维系跟进</th>

                    {/* 一级: 交付体验总转训率 */}
                    <th className="py-3 px-3 font-bold border-r border-purple-700/60 bg-purple-900/70 text-purple-200 text-right">交付体验总转训率（一级）</th>
                    <th className="py-3 px-3 font-semibold border-r border-slate-600/50 text-right">高效交车</th>
                    <th className="py-3 px-3 font-semibold border-r border-slate-600/50 text-right">交车导引卡</th>

                    {/* 一级: 总结总转训率 */}
                    <th className="py-3 px-3 font-bold border-r border-amber-700/60 bg-amber-900/70 text-amber-200 text-right">总结总转训率（一级）</th>
                    <th className="py-3 px-3 font-semibold border-r border-slate-600/50 text-right">五大环节核心要点</th>
                    <th className="py-3 px-3 font-semibold text-right">六大核心变革的顶层价值</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-700/60 text-slate-700 dark:text-slate-200">
                  {processedTableData.map((row, idx) => (
                    <tr 
                      key={row.id} 
                      className="hover:bg-slate-50/80 dark:hover:bg-slate-700/40 transition-colors"
                    >
                      <td className="py-3 px-3 text-center font-mono text-slate-400 sticky left-0 z-10 bg-white dark:bg-slate-800">{idx + 1}</td>
                      <td className="py-3 px-3 text-center text-slate-600 dark:text-slate-300">
                        {row.region}
                      </td>
                      <td className="py-3 px-3 text-center font-mono text-slate-600 dark:text-slate-300">
                        {row.mac}
                      </td>
                      <td className="py-3 px-3 text-center font-mono text-slate-500">
                        {row.dealerCode}
                      </td>
                      <td className="py-3 px-3 font-medium text-slate-800 dark:text-slate-200">
                        {row.dealerShortName}
                      </td>
                      <td className="py-3 px-3 font-medium text-slate-800 dark:text-slate-200">
                        {row.employeeName}
                      </td>
                      <td className="py-3 px-3 text-center text-slate-600 dark:text-slate-300">
                        {row.carModel}
                      </td>
                      <td className="py-3 px-3 text-center font-medium text-slate-600 dark:text-slate-300">
                        {row.sessionCount}
                      </td>
                      <td className="py-3 px-3 font-mono text-center text-slate-500 dark:text-slate-400 text-[11px]">
                        {row.startTime}
                      </td>
                      <td className="py-3 px-3 font-mono text-center text-slate-500 dark:text-slate-400 text-[11px]">
                        {row.endTime}
                      </td>
                      <td className="py-3 px-3 font-mono font-bold text-right text-rose-600 dark:text-rose-400 bg-rose-50/60 dark:bg-rose-950/30">
                        {row.executionRate}
                      </td>

                      {/* 一级: 课程导入总转训率 */}
                      <td className="py-3 px-3 font-mono font-bold text-right text-indigo-700 dark:text-indigo-300 bg-indigo-50/50 dark:bg-indigo-950/20">
                        {row.courseIntroTotalRate}
                      </td>
                      <td className="py-3 px-3 font-mono text-right">{row.customerJourneyRate}</td>
                      <td className="py-3 px-3 font-mono text-right">{row.nevVsFuelRate}</td>
                      <td className="py-3 px-3 font-mono text-right">{row.sixChangesRate}</td>
                      <td className="py-3 px-3 font-mono text-right">{row.fiveProcessesRate}</td>
                      <td className="py-3 px-3 font-mono text-right">{row.processMapRate}</td>
                      <td className="py-3 px-3 font-mono text-right">{row.keyTouchpointsRate}</td>
                      <td className="py-3 px-3 font-mono text-right">{row.staticRouteRate}</td>
                      <td className="py-3 px-3 font-mono text-right">{row.dynamicRouteRate}</td>

                      {/* 一级: 精准邀约总转训率 */}
                      <td className="py-3 px-3 font-mono font-bold text-right text-blue-700 dark:text-blue-300 bg-blue-50/50 dark:bg-blue-950/20">
                        {row.preciseInviteTotalRate}
                      </td>
                      <td className="py-3 px-3 font-mono text-right">{row.preciseInviteRate}</td>

                      {/* 一级: 差异化接待总转训率 */}
                      <td className="py-3 px-3 font-mono font-bold text-right text-sky-700 dark:text-sky-300 bg-sky-50/50 dark:bg-sky-950/20">
                        {row.diffReceptionTotalRate}
                      </td>
                      <td className="py-3 px-3 font-mono text-right">{row.diffReceptionStrategyRate}</td>
                      <td className="py-3 px-3 font-mono text-right">{row.threeStepDemoRate}</td>

                      {/* 一级: 动态体验总转训率 */}
                      <td className="py-3 px-3 font-mono font-bold text-right text-teal-700 dark:text-teal-300 bg-teal-50/50 dark:bg-teal-950/20">
                        {row.dynamicExpTotalRate}
                      </td>
                      <td className="py-3 px-3 font-mono text-right">{row.testDriveThreeQuestionsRate}</td>
                      <td className="py-3 px-3 font-mono text-right">{row.boardingPrepRate}</td>
                      <td className="py-3 px-3 font-mono text-right">{row.grassSmartDrivingRate}</td>
                      <td className="py-3 px-3 font-mono text-right">{row.hummingbirdChassisRate}</td>
                      <td className="py-3 px-3 font-mono text-right">{row.threeModesCoverageRate}</td>
                      <td className="py-3 px-3 font-mono text-right">{row.highSpecServiceRate}</td>
                      <td className="py-3 px-3 font-mono text-right">{row.doubtResolutionRate}</td>
                      <td className="py-3 px-3 font-mono text-right">{row.rightsConversionRate}</td>

                      {/* 一级: 维系跟进总转训率 */}
                      <td className="py-3 px-3 font-mono font-bold text-right text-violet-700 dark:text-violet-300 bg-violet-50/50 dark:bg-violet-950/20">
                        {row.maintainFollowupTotalRate}
                      </td>
                      <td className="py-3 px-3 font-mono text-right">{row.maintainFollowupRate}</td>

                      {/* 一级: 交付体验总转训率 */}
                      <td className="py-3 px-3 font-mono font-bold text-right text-purple-700 dark:text-purple-300 bg-purple-50/50 dark:bg-purple-950/20">
                        {row.deliveryExpTotalRate}
                      </td>
                      <td className="py-3 px-3 font-mono text-right">{row.efficientDeliveryRate}</td>
                      <td className="py-3 px-3 font-mono text-right">{row.deliveryGuideCardRate}</td>

                      {/* 一级: 总结总转训率 */}
                      <td className="py-3 px-3 font-mono font-bold text-right text-amber-700 dark:text-amber-300 bg-amber-50/50 dark:bg-amber-950/20">
                        {row.summaryTotalRate}
                      </td>
                      <td className="py-3 px-3 font-mono text-right">{row.fiveLinksKeyPointsRate}</td>
                      <td className="py-3 px-3 font-mono text-right">{row.sixChangesValueRate}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination Bar */}
            <div className="flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 dark:text-slate-400 gap-3 pt-2">
              <div>
                总共有 <span className="font-bold text-slate-700 dark:text-slate-200">{processedTableData.length}</span> 条门店数据
              </div>

              <div className="flex items-center gap-1">
                <button className="px-2.5 py-1 rounded-md border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-700/50 hover:bg-slate-100 disabled:opacity-40 transition-colors" disabled>
                  上一页
                </button>
                <span className="px-3 py-1 font-mono text-blue-600 dark:text-blue-400 font-bold bg-blue-50 dark:bg-blue-950/40 rounded-md">
                  1
                </span>
                <button className="px-2.5 py-1 rounded-md border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-700/50 hover:bg-slate-100 disabled:opacity-40 transition-colors" disabled>
                  下一页
                </button>
              </div>
            </div>
          </div>
        </>
      )}

      {/* ----------------- TAB CONTENT 2: 销售演练 ----------------- */}
      {mainTab === 'practice' && (
        <>
          {/* 1. Top 4 Summary KPI Metric Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Card 1: 顾问总演练次数 */}
            <div className="bg-white dark:bg-slate-800 p-4 rounded-2xl border border-slate-200/80 dark:border-slate-700 shadow-2xs flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-blue-500 text-white flex items-center justify-center shrink-0 shadow-xs">
                <Users size={22} />
              </div>
              <div className="space-y-0.5 flex-1 min-w-0">
                <div className="flex items-center gap-1 text-slate-500 dark:text-slate-400 text-xs">
                  <span>顾问总演练次数</span>
                  <HelpCircle size={13} className="text-slate-400 cursor-help" title="统计时间段内销售顾问进行试乘试驾演练的总次数" />
                </div>
                <div className="text-2xl font-black text-slate-900 dark:text-white font-mono tracking-tight">
                  1,790
                </div>
              </div>
            </div>

            {/* Card 2: 演练录音数 */}
            <div className="bg-white dark:bg-slate-800 p-4 rounded-2xl border border-slate-200/80 dark:border-slate-700 shadow-2xs flex items-center justify-between gap-3">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-orange-500 text-white flex items-center justify-center shrink-0 shadow-xs">
                  <Mic size={22} />
                </div>
                <div className="space-y-0.5">
                  <div className="flex items-center gap-1 text-slate-500 dark:text-slate-400 text-xs">
                    <span>演练录音数</span>
                    <HelpCircle size={13} className="text-slate-400 cursor-help" title="成功采集并识别的演练录音文件总数" />
                  </div>
                  <div className="text-2xl font-black text-slate-900 dark:text-white font-mono tracking-tight">
                    1,785
                  </div>
                </div>
              </div>
              <ChevronRight size={18} className="text-slate-400" />
            </div>

            {/* Card 3: 平均演练时长(分钟) */}
            <div className="bg-white dark:bg-slate-800 p-4 rounded-2xl border border-slate-200/80 dark:border-slate-700 shadow-2xs flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-emerald-500 text-white flex items-center justify-center shrink-0 shadow-xs">
                <Coffee size={22} />
              </div>
              <div className="space-y-0.5 flex-1 min-w-0">
                <div className="flex items-center gap-1 text-slate-500 dark:text-slate-400 text-xs">
                  <span>平均演练时长(分钟)</span>
                  <HelpCircle size={13} className="text-slate-400 cursor-help" title="单次演练记录的平均持续分钟数" />
                </div>
                <div className="text-2xl font-black text-slate-900 dark:text-white font-mono tracking-tight">
                  28.22
                </div>
              </div>
            </div>

            {/* Card 4: 演练总体执行率 */}
            <div className="bg-white dark:bg-slate-800 p-4 rounded-2xl border border-slate-200/80 dark:border-slate-700 shadow-2xs flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-rose-500 text-white flex items-center justify-center shrink-0 shadow-xs">
                <TrendingUp size={22} />
              </div>
              <div className="space-y-0.5 flex-1 min-w-0">
                <div className="flex items-center gap-1 text-slate-500 dark:text-slate-400 text-xs">
                  <span>总体执行率</span>
                  <HelpCircle size={13} className="text-slate-400 cursor-help" title="销售演练环节综合质检执行率" />
                </div>
                <div className="text-2xl font-black text-rose-500 dark:text-rose-400 font-mono tracking-tight">
                  57.03%
                </div>
              </div>
            </div>
          </div>

          {/* 2. 销售演练 质检项卡片 (参考凯迪拉克试驾报表页面的质检项卡片样式) */}
          <div className="bg-white dark:bg-slate-800 p-5 rounded-2xl border border-slate-200/80 dark:border-slate-700 shadow-2xs space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <span className="w-2.5 h-2.5 rounded-full bg-blue-600 dark:bg-blue-400"></span>
                <h3 className="text-sm font-bold text-slate-900 dark:text-white tracking-tight">
                  销售演练质检项执行率 (共29项)
                </h3>
              </div>
              <div className="text-xs text-slate-500 dark:text-slate-400">
                统计周期: {startDate} ~ {endDate}
              </div>
            </div>

            {/* Cards Grid: 1 综合指标 + 29 质检细项 */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-7 2xl:grid-cols-8 gap-3">
              {/* 综合指标: 试乘试驾演练总执行率 */}
              <div className="col-span-2 sm:col-span-2 md:col-span-2 lg:col-span-2 bg-gradient-to-br from-blue-600 via-indigo-600 to-indigo-800 text-white rounded-2xl p-4 flex flex-col justify-between shadow-md border border-blue-500 relative overflow-hidden">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold px-2.5 py-0.5 bg-white/20 text-white rounded-full backdrop-blur-xs">
                    综合指标
                  </span>
                  <TrendingUp size={18} className="text-blue-200" />
                </div>
                <div className="mt-3 space-y-1">
                  <span className="text-xs font-semibold text-blue-100 block">试乘试驾演练总执行率</span>
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-black font-mono tracking-tight text-white">
                      57.03%
                    </span>
                  </div>
                </div>
              </div>

              {/* 29 质检细项卡片 */}
              {PRACTICE_QC_ITEMS.map((item, idx) => (
                <div
                  key={item.id}
                  className="bg-slate-50 dark:bg-slate-900/80 border border-slate-200/80 dark:border-slate-700/80 rounded-2xl p-3.5 flex flex-col justify-between space-y-2 hover:border-blue-300 dark:hover:border-blue-600 transition-colors shadow-2xs group"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] text-slate-400 dark:text-slate-500 font-medium">
                      #{idx + 1} 细项
                    </span>
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-500/70 group-hover:scale-125 transition-transform"></span>
                  </div>
                  <span className="text-xs font-medium text-slate-700 dark:text-slate-200 line-clamp-2 leading-snug min-h-[32px] flex items-center">
                    {item.name}
                  </span>
                  <span className="text-lg font-bold text-slate-900 dark:text-white font-mono">
                    {item.rate}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* 3. Sales Practice Data Detail Table (Matching Cadillac Detail Table layout) */}
          <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200/80 dark:border-slate-700 shadow-2xs overflow-hidden space-y-3">
            
            {/* Header Title & Download */}
            <div className="px-5 py-4 border-b border-slate-100 dark:border-slate-700/80 flex items-center justify-between gap-3">
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                数据明细 (销售演练质检明细)
              </h3>

              {/* Download Button */}
              <button
                onClick={handlePracticeDownload}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-700 dark:text-slate-200 bg-slate-100 hover:bg-slate-200 dark:bg-slate-700 dark:hover:bg-slate-600 rounded-lg transition-colors cursor-pointer border border-slate-200/80 dark:border-slate-600 shadow-2xs"
              >
                <Download size={14} className="text-slate-500 dark:text-slate-400" />
                <span>下载明细</span>
              </button>
            </div>

            {/* Practice Detail Table with all 47 columns and Level 1 groupings */}
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse whitespace-nowrap">
                <thead>
                  <tr className="bg-slate-700 dark:bg-slate-900 text-white font-medium select-none text-center">
                    {/* Basic Info Columns */}
                    <th className="py-3 px-3 font-semibold border-r border-slate-600/50 w-12 sticky left-0 z-10 bg-slate-700 dark:bg-slate-900">序号</th>
                    <th className="py-3 px-3 font-semibold border-r border-slate-600/50">日期</th>
                    <th className="py-3 px-3 font-semibold border-r border-slate-600/50">大区</th>
                    <th className="py-3 px-3 font-semibold border-r border-slate-600/50">MAC</th>
                    <th className="py-3 px-3 font-semibold border-r border-slate-600/50">经销商CODE</th>
                    <th className="py-3 px-3 font-semibold border-r border-slate-600/50 text-left">经销商简称</th>
                    <th className="py-3 px-3 font-semibold border-r border-slate-600/50 text-left">顾问名称</th>
                    <th className="py-3 px-3 font-semibold border-r border-slate-600/50">车型</th>
                    <th className="py-3 px-3 font-semibold border-r border-slate-600/50">单据号</th>
                    <th className="py-3 px-3 font-semibold border-r border-slate-600/50">开始时间</th>
                    <th className="py-3 px-3 font-semibold border-r border-slate-600/50">结束时间</th>

                    {/* 总体执行率 */}
                    <th className="py-3 px-3 font-semibold border-r border-slate-600/50 bg-rose-900/60 text-rose-200 text-right">
                      总体执行率
                    </th>

                    {/* Group 1: 车头讲解 (一级) */}
                    <th className="py-3 px-3 font-semibold border-r border-slate-600/50 bg-indigo-900/70 text-indigo-200 text-right">
                      车头讲解(一级)
                    </th>
                    <th className="py-3 px-3 font-semibold border-r border-slate-600/50 text-right">智驾小蓝灯</th>

                    {/* Group 2: 前排讲解 (一级) */}
                    <th className="py-3 px-3 font-semibold border-r border-slate-600/50 bg-blue-900/70 text-blue-200 text-right">
                      前排讲解(一级)
                    </th>
                    <th className="py-3 px-3 font-semibold border-r border-slate-600/50 text-right">美式大沙发</th>
                    <th className="py-3 px-3 font-semibold border-r border-slate-600/50 text-right">小憩模式</th>
                    <th className="py-3 px-3 font-semibold border-r border-slate-600/50 text-right">33英寸曲面屏/AKG音响/智能香氛</th>
                    <th className="py-3 px-3 font-semibold border-r border-slate-600/50 text-right">智能冷暖箱</th>
                    <th className="py-3 px-3 font-semibold border-r border-slate-600/50 text-right">功能演示厅</th>
                    <th className="py-3 px-3 font-semibold border-r border-slate-600/50 text-right">AI智能语音</th>

                    {/* Group 3: 车尾讲解 (一级) */}
                    <th className="py-3 px-3 font-semibold border-r border-slate-600/50 bg-sky-900/70 text-sky-200 text-right">
                      车尾讲解(一级)
                    </th>
                    <th className="py-3 px-3 font-semibold border-r border-slate-600/50 text-right">外放电&后备箱</th>

                    {/* Group 4: 邀约话术 (一级) */}
                    <th className="py-3 px-3 font-semibold border-r border-slate-600/50 bg-violet-900/70 text-violet-200 text-right">
                      邀约话术(一级)
                    </th>
                    <th className="py-3 px-3 font-semibold border-r border-slate-600/50 text-right">首次试驾邀请</th>
                    <th className="py-3 px-3 font-semibold border-r border-slate-600/50 text-right">二次邀请试驾</th>

                    {/* Group 5: 试驾出发准备 (一级) */}
                    <th className="py-3 px-3 font-semibold border-r border-slate-600/50 bg-purple-900/70 text-purple-200 text-right">
                      试驾出发准备(一级)
                    </th>
                    <th className="py-3 px-3 font-semibold border-r border-slate-600/50 text-right">对照路线图讲解</th>
                    <th className="py-3 px-3 font-semibold border-r border-slate-600/50 text-right">远程启动</th>
                    <th className="py-3 px-3 font-semibold border-r border-slate-600/50 text-right">遥控泊车</th>

                    {/* Group 6: 客户试乘 (一级) */}
                    <th className="py-3 px-3 font-semibold border-r border-slate-600/50 bg-teal-900/70 text-teal-200 text-right">
                      客户试乘(一级)
                    </th>
                    <th className="py-3 px-3 font-semibold border-r border-slate-600/50 text-right">开启NOP</th>
                    <th className="py-3 px-3 font-semibold border-r border-slate-600/50 text-right">十字路口直行通过红绿灯</th>
                    <th className="py-3 px-3 font-semibold border-r border-slate-600/50 text-right">左转博弈/右转博弈</th>
                    <th className="py-3 px-3 font-semibold border-r border-slate-600/50 text-right">直行避让行人/非机动车/停靠车</th>
                    <th className="py-3 px-3 font-semibold border-r border-slate-600/50 text-right">循迹倒车</th>
                    <th className="py-3 px-3 font-semibold border-r border-slate-600/50 text-right">匝道汇入</th>
                    <th className="py-3 px-3 font-semibold border-r border-slate-600/50 text-right">高效通行</th>

                    {/* Group 7: 客户试驾 (一级) */}
                    <th className="py-3 px-3 font-semibold border-r border-slate-600/50 bg-emerald-900/70 text-emerald-200 text-right">
                      客户试驾(一级)
                    </th>
                    <th className="py-3 px-3 font-semibold border-r border-slate-600/50 text-right">凯迪拉克插混系统</th>
                    <th className="py-3 px-3 font-semibold border-r border-slate-600/50 text-right">预瞄RTD、电动蜂鸟底盘</th>
                    <th className="py-3 px-3 font-semibold border-r border-slate-600/50 text-right">城区NOP</th>
                    <th className="py-3 px-3 font-semibold border-r border-slate-600/50 text-right">离车泊入</th>
                    <th className="py-3 px-3 font-semibold border-r border-slate-600/50 text-right">自动泊车</th>
                    <th className="py-3 px-3 font-semibold border-r border-slate-600/50 text-right">哨兵模式</th>

                    {/* Group 8: 结束试驾，回店洽谈 (一级) */}
                    <th className="py-3 px-3 font-semibold border-r border-slate-600/50 bg-amber-900/70 text-amber-200 text-right">
                      结束试驾，回店洽谈(一级)
                    </th>
                    <th className="py-3 px-3 font-semibold border-r border-slate-600/50 text-right">回店洽谈</th>
                    <th className="py-3 px-3 font-semibold text-right">盲定权益</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-700/60 text-slate-700 dark:text-slate-200">
                  {processedPracticeData.length === 0 ? (
                    <tr>
                      <td colSpan={47} className="py-8 text-center text-slate-400 dark:text-slate-500">
                        未查询到匹配的销售演练数据
                      </td>
                    </tr>
                  ) : (
                    processedPracticeData.map((row, idx) => (
                      <tr 
                        key={row.id} 
                        className="hover:bg-slate-50/80 dark:hover:bg-slate-700/40 transition-colors font-mono"
                      >
                        <td className="py-3 px-3 text-center text-slate-400 sticky left-0 z-10 bg-white dark:bg-slate-800">{idx + 1}</td>
                        <td className="py-3 px-3 text-center text-slate-600 dark:text-slate-300">{row.date}</td>
                        <td className="py-3 px-3 text-center text-slate-600 dark:text-slate-300 font-sans">{row.region}</td>
                        <td className="py-3 px-3 text-center text-slate-600 dark:text-slate-300 font-sans">{row.mac}</td>
                        <td className="py-3 px-3 text-center text-slate-500 dark:text-slate-400">{row.dealerCode}</td>
                        <td className="py-3 px-3 text-left font-sans font-medium text-slate-800 dark:text-slate-200">{row.dealerShortName}</td>
                        <td className="py-3 px-3 text-left font-sans font-medium text-slate-800 dark:text-slate-200">{row.consultantName}</td>
                        <td className="py-3 px-3 text-center font-sans">{row.carModel}</td>
                        <td className="py-3 px-3 text-center text-slate-500 dark:text-slate-400 text-[11px]">{row.docNo}</td>
                        <td className="py-3 px-3 text-center text-slate-600 dark:text-slate-300 font-mono text-[11px]">{row.startTime}</td>
                        <td className="py-3 px-3 text-center text-slate-600 dark:text-slate-300 font-mono text-[11px]">{row.endTime}</td>

                        {/* Overall Rate */}
                        <td className="py-3 px-3 text-right font-bold text-rose-600 dark:text-rose-400 bg-rose-50/70 dark:bg-rose-950/40">
                          {row.overallRate}
                        </td>

                        {/* Head Group */}
                        <td className="py-3 px-3 text-right font-bold text-indigo-700 dark:text-indigo-300 bg-indigo-50/70 dark:bg-indigo-950/30">{row.headExplainRate}</td>
                        <td className="py-3 px-3 text-right text-slate-600 dark:text-slate-300">{row.blueLightRate}</td>

                        {/* Front Row Group */}
                        <td className="py-3 px-3 text-right font-bold text-blue-700 dark:text-blue-300 bg-blue-50/70 dark:bg-blue-950/30">{row.frontRowExplainRate}</td>
                        <td className="py-3 px-3 text-right text-slate-600 dark:text-slate-300">{row.sofaRate}</td>
                        <td className="py-3 px-3 text-right text-slate-600 dark:text-slate-300">{row.napModeRate}</td>
                        <td className="py-3 px-3 text-right text-slate-600 dark:text-slate-300">{row.screenAudioFragranceRate}</td>
                        <td className="py-3 px-3 text-right text-slate-600 dark:text-slate-300">{row.warmCoolBoxRate}</td>
                        <td className="py-3 px-3 text-right text-slate-600 dark:text-slate-300">{row.funcHallRate}</td>
                        <td className="py-3 px-3 text-right text-slate-600 dark:text-slate-300">{row.aiVoiceRate}</td>

                        {/* Rear Group */}
                        <td className="py-3 px-3 text-right font-bold text-sky-700 dark:text-sky-300 bg-sky-50/70 dark:bg-sky-950/30">{row.rearExplainRate}</td>
                        <td className="py-3 px-3 text-right text-slate-600 dark:text-slate-300">{row.dischargeTrunkRate}</td>

                        {/* Invite Script Group */}
                        <td className="py-3 px-3 text-right font-bold text-violet-700 dark:text-violet-300 bg-violet-50/70 dark:bg-violet-950/30">{row.inviteScriptRate}</td>
                        <td className="py-3 px-3 text-right text-slate-600 dark:text-slate-300">{row.firstInviteRate}</td>
                        <td className="py-3 px-3 text-right text-slate-600 dark:text-slate-300">{row.secondInviteRate}</td>

                        {/* Departure Prep Group */}
                        <td className="py-3 px-3 text-right font-bold text-purple-700 dark:text-purple-300 bg-purple-50/70 dark:bg-purple-950/30">{row.departurePrepRate}</td>
                        <td className="py-3 px-3 text-right text-slate-600 dark:text-slate-300">{row.routeMapExplainRate}</td>
                        <td className="py-3 px-3 text-right text-slate-600 dark:text-slate-300">{row.remoteStartRate}</td>
                        <td className="py-3 px-3 text-right text-slate-600 dark:text-slate-300">{row.remoteParkingRate}</td>

                        {/* Customer Ride Group */}
                        <td className="py-3 px-3 text-right font-bold text-teal-700 dark:text-teal-300 bg-teal-50/70 dark:bg-teal-950/30">{row.customerRideRate}</td>
                        <td className="py-3 px-3 text-right text-slate-600 dark:text-slate-300">{row.openNopRate}</td>
                        <td className="py-3 px-3 text-right text-slate-600 dark:text-slate-300">{row.trafficLightRate}</td>
                        <td className="py-3 px-3 text-right text-slate-600 dark:text-slate-300">{row.turnGamingRate}</td>
                        <td className="py-3 px-3 text-right text-slate-600 dark:text-slate-300">{row.avoidObstacleRate}</td>
                        <td className="py-3 px-3 text-right text-slate-600 dark:text-slate-300">{row.traceReverseRate}</td>
                        <td className="py-3 px-3 text-right text-slate-600 dark:text-slate-300">{row.rampMergeRate}</td>
                        <td className="py-3 px-3 text-right text-slate-600 dark:text-slate-300">{row.efficientPassRate}</td>

                        {/* Customer Drive Group */}
                        <td className="py-3 px-3 text-right font-bold text-emerald-700 dark:text-emerald-300 bg-emerald-50/70 dark:bg-emerald-950/30">{row.customerDriveRate}</td>
                        <td className="py-3 px-3 text-right text-slate-600 dark:text-slate-300">{row.phevSystemRate}</td>
                        <td className="py-3 px-3 text-right text-slate-600 dark:text-slate-300">{row.rtdHummingbirdRate}</td>
                        <td className="py-3 px-3 text-right text-slate-600 dark:text-slate-300">{row.cityNopRate}</td>
                        <td className="py-3 px-3 text-right text-slate-600 dark:text-slate-300">{row.leaveCarParkRate}</td>
                        <td className="py-3 px-3 text-right text-slate-600 dark:text-slate-300">{row.autoParkRate}</td>
                        <td className="py-3 px-3 text-right text-slate-600 dark:text-slate-300">{row.sentryModeRate}</td>

                        {/* End Drive & Negotiate Group */}
                        <td className="py-3 px-3 text-right font-bold text-amber-700 dark:text-amber-300 bg-amber-50/70 dark:bg-amber-950/30">{row.endDriveNegotiateRate}</td>
                        <td className="py-3 px-3 text-right text-slate-600 dark:text-slate-300">{row.negotiateRate}</td>
                        <td className="py-3 px-3 text-right text-slate-600 dark:text-slate-300">{row.blindOrderBenefitRate}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination Bar */}
            <div className="p-4 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 dark:text-slate-400 gap-3 border-t border-slate-100 dark:border-slate-700/80">
              <div>
                总共有 <span className="font-bold text-slate-700 dark:text-slate-200">{processedPracticeData.length}</span> 条明细数据
              </div>

              <div className="flex items-center gap-1">
                <button className="px-2.5 py-1 rounded-md border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-700/50 hover:bg-slate-100 disabled:opacity-40 transition-colors" disabled>
                  上一页
                </button>
                <span className="px-3 py-1 font-mono text-blue-600 dark:text-blue-400 font-bold bg-blue-50 dark:bg-blue-950/40 rounded-md">
                  1
                </span>
                <button className="px-2.5 py-1 rounded-md border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-700/50 hover:bg-slate-100 disabled:opacity-40 transition-colors" disabled>
                  下一页
                </button>
              </div>
            </div>

          </div>
        </>
      )}

    </div>
  );
};

export default InternalTrainerReport;
