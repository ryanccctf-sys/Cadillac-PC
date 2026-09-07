import React, { useState } from 'react';
import { 
  Calendar, 
  Search, 
  RotateCcw, 
  HelpCircle, 
  ChevronRight, 
  ChevronDown, 
  Users, 
  Mic, 
  Coffee, 
  ChevronLeft,
  Filter,
  BarChart2,
  TrendingUp,
  ShieldCheck,
  Clock,
  AlertTriangle,
  Award,
  Activity,
  Download,
  Car,
  Layers,
  CheckCircle2,
  Sparkles
} from 'lucide-react';

interface CadillacDetailRow {
  id: number;
  region: string; // 大区
  mac: string; // MAC
  dealerCode: string; // 经销商code
  dealerName: string; // 经销商简称
  carModel: string; // 车型
  testDriveCount: number; // 试乘试驾数
  overallRate: string; // 总体执行率
  
  // 一级: 客户试乘总执行率
  rideOverallRate: string;
  // 二级: 试乘子项
  momentaR7Rate: string; // Momenta R7世界模型
  smartDriveHwRate: string; // 智驾硬件
  voiceRate: string; // 语音
  openNopRate: string; // 开启NOP
  pilotAssistRate: string; // 辅助驾驶
  nopTrafficLightRate: string; // NOP状态通过红绿灯时讲解
  nopTurnRate: string; // NOP状态左转弯/右转弯时讲解
  nopPedestrianRate: string; // NOP避让人/车时讲解
  traceReverseRate: string; // 循迹倒车
  rampMergeRate: string; // 匝道汇入
  efficientPassRate: string; // 高效通行
  
  // 一级: 客户试驾总执行率
  driveOverallRate: string;
  // 二级: 试驾子项
  powerRate: string; // 动力
  chassisRate: string; // 底盘
  parkingRate: string; // 泊车
  phevSystemRate: string; // 凯迪拉克插混系统
  rtdPreviewRate: string; // 预瞄RTD
  hummingbirdChassisRate: string; // 电动蜂鸟底盘
  cityNopRate: string; // 城区NOP
  remoteParkingRate: string; // 离车泊入
  autoParkingRate: string; // 自动泊车
  sentryModeRate: string; // 哨兵模式
}

interface BadgeUsageDetailRow {
  id: number;
  name: string;
  regionName?: string;
  subRegionName?: string;
  badgeCount: number;
  dailyAvgUses: number;
  totalActiveHours: number;
  avgActiveHours: number;
  substandardUses: number;
}

const MOCK_CADILLAC_DETAIL_DATA: CadillacDetailRow[] = [
  {
    id: 1,
    region: '一区',
    mac: 'MAC-E101',
    dealerCode: 'CD-1001',
    dealerName: '上海永达凯迪拉克',
    carModel: 'XT5 PHEV',
    testDriveCount: 168,
    overallRate: '63.85%',
    rideOverallRate: '67.20%',
    momentaR7Rate: '58.40%',
    smartDriveHwRate: '74.20%',
    voiceRate: '78.50%',
    openNopRate: '62.10%',
    pilotAssistRate: '70.80%',
    nopTrafficLightRate: '55.20%',
    nopTurnRate: '58.90%',
    nopPedestrianRate: '51.40%',
    traceReverseRate: '66.80%',
    rampMergeRate: '60.30%',
    efficientPassRate: '64.50%',
    driveOverallRate: '60.50%',
    powerRate: '56.20%',
    chassisRate: '48.90%',
    parkingRate: '81.40%',
    phevSystemRate: '64.10%',
    rtdPreviewRate: '52.80%',
    hummingbirdChassisRate: '50.10%',
    cityNopRate: '47.50%',
    remoteParkingRate: '65.20%',
    autoParkingRate: '78.90%',
    sentryModeRate: '68.00%'
  },
  {
    id: 2,
    region: '三区',
    mac: 'MAC-N201',
    dealerCode: 'CD-2005',
    dealerName: '北京达世行凯迪拉克',
    carModel: 'XT5 PHEV',
    testDriveCount: 152,
    overallRate: '59.10%',
    rideOverallRate: '63.50%',
    momentaR7Rate: '53.10%',
    smartDriveHwRate: '69.40%',
    voiceRate: '73.20%',
    openNopRate: '57.80%',
    pilotAssistRate: '66.50%',
    nopTrafficLightRate: '50.20%',
    nopTurnRate: '53.60%',
    nopPedestrianRate: '47.00%',
    traceReverseRate: '61.50%',
    rampMergeRate: '55.20%',
    efficientPassRate: '59.80%',
    driveOverallRate: '54.70%',
    powerRate: '50.80%',
    chassisRate: '43.50%',
    parkingRate: '76.80%',
    phevSystemRate: '59.20%',
    rtdPreviewRate: '47.60%',
    hummingbirdChassisRate: '45.10%',
    cityNopRate: '42.00%',
    remoteParkingRate: '60.50%',
    autoParkingRate: '74.20%',
    sentryModeRate: '64.10%'
  },
  {
    id: 3,
    region: '二区',
    mac: 'MAC-S301',
    dealerCode: 'CD-3008',
    dealerName: '广州南菱凯迪拉克',
    carModel: 'XT5 PHEV',
    testDriveCount: 145,
    overallRate: '58.40%',
    rideOverallRate: '62.80%',
    momentaR7Rate: '51.80%',
    smartDriveHwRate: '68.00%',
    voiceRate: '71.50%',
    openNopRate: '56.20%',
    pilotAssistRate: '65.00%',
    nopTrafficLightRate: '49.10%',
    nopTurnRate: '52.40%',
    nopPedestrianRate: '46.30%',
    traceReverseRate: '60.80%',
    rampMergeRate: '54.50%',
    efficientPassRate: '58.60%',
    driveOverallRate: '54.00%',
    powerRate: '49.50%',
    chassisRate: '42.80%',
    parkingRate: '75.90%',
    phevSystemRate: '58.60%',
    rtdPreviewRate: '46.90%',
    hummingbirdChassisRate: '44.30%',
    cityNopRate: '41.50%',
    remoteParkingRate: '59.80%',
    autoParkingRate: '73.50%',
    sentryModeRate: '63.20%'
  },
  {
    id: 4,
    region: '二区',
    mac: 'MAC-S302',
    dealerCode: 'CD-3012',
    dealerName: '深圳标远凯迪拉克',
    carModel: 'XT5 PHEV',
    testDriveCount: 138,
    overallRate: '56.70%',
    rideOverallRate: '60.90%',
    momentaR7Rate: '49.50%',
    smartDriveHwRate: '66.20%',
    voiceRate: '69.80%',
    openNopRate: '54.60%',
    pilotAssistRate: '63.20%',
    nopTrafficLightRate: '47.50%',
    nopTurnRate: '50.80%',
    nopPedestrianRate: '44.60%',
    traceReverseRate: '59.00%',
    rampMergeRate: '52.80%',
    efficientPassRate: '56.90%',
    driveOverallRate: '52.50%',
    powerRate: '48.00%',
    chassisRate: '41.20%',
    parkingRate: '74.00%',
    phevSystemRate: '57.00%',
    rtdPreviewRate: '45.20%',
    hummingbirdChassisRate: '42.80%',
    cityNopRate: '39.80%',
    remoteParkingRate: '58.00%',
    autoParkingRate: '71.60%',
    sentryModeRate: '61.50%'
  },
  {
    id: 5,
    region: '四区',
    mac: 'MAC-W401',
    dealerCode: 'CD-4015',
    dealerName: '成都安捷凯迪拉克',
    carModel: 'XT5 PHEV',
    testDriveCount: 160,
    overallRate: '61.20%',
    rideOverallRate: '65.10%',
    momentaR7Rate: '55.60%',
    smartDriveHwRate: '71.80%',
    voiceRate: '75.60%',
    openNopRate: '59.40%',
    pilotAssistRate: '68.20%',
    nopTrafficLightRate: '52.80%',
    nopTurnRate: '56.10%',
    nopPedestrianRate: '49.00%',
    traceReverseRate: '64.00%',
    rampMergeRate: '57.60%',
    efficientPassRate: '61.90%',
    driveOverallRate: '57.30%',
    powerRate: '53.10%',
    chassisRate: '45.80%',
    parkingRate: '78.50%',
    phevSystemRate: '61.40%',
    rtdPreviewRate: '49.80%',
    hummingbirdChassisRate: '47.20%',
    cityNopRate: '44.60%',
    remoteParkingRate: '62.40%',
    autoParkingRate: '76.00%',
    sentryModeRate: '65.80%'
  },
  {
    id: 6,
    region: '五区',
    mac: 'MAC-C501',
    dealerCode: 'CD-5002',
    dealerName: '武汉康顺凯迪拉克',
    carModel: 'XT5 PHEV',
    testDriveCount: 115,
    overallRate: '52.30%',
    rideOverallRate: '56.80%',
    momentaR7Rate: '44.80%',
    smartDriveHwRate: '61.50%',
    voiceRate: '65.00%',
    openNopRate: '50.10%',
    pilotAssistRate: '58.60%',
    nopTrafficLightRate: '43.20%',
    nopTurnRate: '46.50%',
    nopPedestrianRate: '40.80%',
    traceReverseRate: '54.50%',
    rampMergeRate: '48.30%',
    efficientPassRate: '52.40%',
    driveOverallRate: '47.80%',
    powerRate: '43.60%',
    chassisRate: '37.50%',
    parkingRate: '69.20%',
    phevSystemRate: '52.40%',
    rtdPreviewRate: '41.00%',
    hummingbirdChassisRate: '38.80%',
    cityNopRate: '35.90%',
    remoteParkingRate: '53.50%',
    autoParkingRate: '67.00%',
    sentryModeRate: '57.20%'
  },
  {
    id: 7,
    region: '一区',
    mac: 'MAC-E102',
    dealerCode: 'CD-1008',
    dealerName: '杭州米卡凯迪拉克',
    carModel: 'XT5 PHEV',
    testDriveCount: 142,
    overallRate: '62.10%',
    rideOverallRate: '65.80%',
    momentaR7Rate: '56.20%',
    smartDriveHwRate: '72.50%',
    voiceRate: '76.40%',
    openNopRate: '60.50%',
    pilotAssistRate: '69.00%',
    nopTrafficLightRate: '53.60%',
    nopTurnRate: '57.20%',
    nopPedestrianRate: '50.10%',
    traceReverseRate: '64.80%',
    rampMergeRate: '58.50%',
    efficientPassRate: '62.80%',
    driveOverallRate: '58.40%',
    powerRate: '54.20%',
    chassisRate: '46.90%',
    parkingRate: '79.60%',
    phevSystemRate: '62.50%',
    rtdPreviewRate: '50.90%',
    hummingbirdChassisRate: '48.30%',
    cityNopRate: '45.70%',
    remoteParkingRate: '63.60%',
    autoParkingRate: '77.20%',
    sentryModeRate: '66.90%'
  },
  {
    id: 8,
    region: '一区',
    mac: 'MAC-E103',
    dealerCode: 'CD-1015',
    dealerName: '南京天泓凯迪拉克',
    carModel: 'XT5 PHEV',
    testDriveCount: 130,
    overallRate: '60.40%',
    rideOverallRate: '64.20%',
    momentaR7Rate: '54.50%',
    smartDriveHwRate: '70.80%',
    voiceRate: '74.60%',
    openNopRate: '58.90%',
    pilotAssistRate: '67.40%',
    nopTrafficLightRate: '51.90%',
    nopTurnRate: '55.40%',
    nopPedestrianRate: '48.50%',
    traceReverseRate: '63.10%',
    rampMergeRate: '56.80%',
    efficientPassRate: '61.00%',
    driveOverallRate: '56.60%',
    powerRate: '52.40%',
    chassisRate: '45.10%',
    parkingRate: '77.80%',
    phevSystemRate: '60.70%',
    rtdPreviewRate: '49.10%',
    hummingbirdChassisRate: '46.50%',
    cityNopRate: '43.90%',
    remoteParkingRate: '61.70%',
    autoParkingRate: '75.30%',
    sentryModeRate: '65.00%'
  },
  {
    id: 9,
    region: '六区',
    mac: 'MAC-NE601',
    dealerCode: 'CD-6003',
    dealerName: '沈阳尊荣凯迪拉克',
    carModel: 'XT5 PHEV',
    testDriveCount: 108,
    overallRate: '51.80%',
    rideOverallRate: '55.90%',
    momentaR7Rate: '43.90%',
    smartDriveHwRate: '60.40%',
    voiceRate: '64.10%',
    openNopRate: '49.20%',
    pilotAssistRate: '57.80%',
    nopTrafficLightRate: '42.30%',
    nopTurnRate: '45.60%',
    nopPedestrianRate: '39.90%',
    traceReverseRate: '53.60%',
    rampMergeRate: '47.40%',
    efficientPassRate: '51.50%',
    driveOverallRate: '47.70%',
    powerRate: '43.00%',
    chassisRate: '36.80%',
    parkingRate: '68.50%',
    phevSystemRate: '51.60%',
    rtdPreviewRate: '40.20%',
    hummingbirdChassisRate: '38.00%',
    cityNopRate: '35.10%',
    remoteParkingRate: '52.70%',
    autoParkingRate: '66.20%',
    sentryModeRate: '56.40%'
  },
  {
    id: 10,
    region: '三区',
    mac: 'MAC-N202',
    dealerCode: 'CD-2011',
    dealerName: '天津中汽凯迪拉克',
    carModel: 'XT5 PHEV',
    testDriveCount: 122,
    overallRate: '57.20%',
    rideOverallRate: '61.40%',
    momentaR7Rate: '50.80%',
    smartDriveHwRate: '67.20%',
    voiceRate: '70.90%',
    openNopRate: '55.30%',
    pilotAssistRate: '64.10%',
    nopTrafficLightRate: '48.20%',
    nopTurnRate: '51.70%',
    nopPedestrianRate: '45.40%',
    traceReverseRate: '59.90%',
    rampMergeRate: '53.60%',
    efficientPassRate: '57.80%',
    driveOverallRate: '53.00%',
    powerRate: '48.80%',
    chassisRate: '42.00%',
    parkingRate: '74.80%',
    phevSystemRate: '57.80%',
    rtdPreviewRate: '46.00%',
    hummingbirdChassisRate: '43.50%',
    cityNopRate: '40.70%',
    remoteParkingRate: '58.90%',
    autoParkingRate: '72.40%',
    sentryModeRate: '62.30%'
  }
];

const MOCK_NATIONAL_DETAIL_DATA = [
  {
    id: 1,
    name: '全国汇总',
    carModel: 'XT5 PHEV',
    testDriveCount: 2130,
    overallRate: '57.03%',
    rideOverallRate: '62.40%',
    momentaR7Rate: '54.20%',
    smartDriveHwRate: '68.50%',
    voiceRate: '71.20%',
    openNopRate: '56.80%',
    pilotAssistRate: '65.30%',
    nopTrafficLightRate: '48.60%',
    nopTurnRate: '52.10%',
    nopPedestrianRate: '45.80%',
    traceReverseRate: '60.20%',
    rampMergeRate: '53.70%',
    efficientPassRate: '58.90%',
    driveOverallRate: '51.65%',
    powerRate: '49.19%',
    chassisRate: '42.41%',
    parkingRate: '75.24%',
    phevSystemRate: '58.30%',
    rtdPreviewRate: '46.80%',
    hummingbirdChassisRate: '44.50%',
    cityNopRate: '41.20%',
    remoteParkingRate: '59.60%',
    autoParkingRate: '72.80%',
    sentryModeRate: '63.50%'
  }
];

const MOCK_REGION_DETAIL_DATA = [
  {
    id: 1,
    region: '一区',
    carModel: 'XT5 PHEV',
    testDriveCount: 520,
    overallRate: '61.80%',
    rideOverallRate: '66.50%',
    momentaR7Rate: '58.00%',
    smartDriveHwRate: '73.50%',
    voiceRate: '76.80%',
    openNopRate: '61.20%',
    pilotAssistRate: '70.10%',
    nopTrafficLightRate: '54.50%',
    nopTurnRate: '58.00%',
    nopPedestrianRate: '50.80%',
    traceReverseRate: '65.90%',
    rampMergeRate: '59.50%',
    efficientPassRate: '63.80%',
    driveOverallRate: '57.10%',
    powerRate: '55.40%',
    chassisRate: '48.20%',
    parkingRate: '80.50%',
    phevSystemRate: '63.20%',
    rtdPreviewRate: '52.00%',
    hummingbirdChassisRate: '49.50%',
    cityNopRate: '46.80%',
    remoteParkingRate: '64.50%',
    autoParkingRate: '78.00%',
    sentryModeRate: '67.20%'
  },
  {
    id: 2,
    region: '二区',
    carModel: 'XT5 PHEV',
    testDriveCount: 460,
    overallRate: '58.40%',
    rideOverallRate: '63.80%',
    momentaR7Rate: '55.20%',
    smartDriveHwRate: '70.10%',
    voiceRate: '72.50%',
    openNopRate: '58.40%',
    pilotAssistRate: '67.00%',
    nopTrafficLightRate: '50.60%',
    nopTurnRate: '54.20%',
    nopPedestrianRate: '47.50%',
    traceReverseRate: '62.00%',
    rampMergeRate: '55.80%',
    efficientPassRate: '60.40%',
    driveOverallRate: '53.00%',
    powerRate: '51.20%',
    chassisRate: '44.00%',
    parkingRate: '77.20%',
    phevSystemRate: '59.80%',
    rtdPreviewRate: '48.20%',
    hummingbirdChassisRate: '45.80%',
    cityNopRate: '42.60%',
    remoteParkingRate: '61.00%',
    autoParkingRate: '74.80%',
    sentryModeRate: '64.60%'
  },
  {
    id: 3,
    region: '三区',
    carModel: 'XT5 PHEV',
    testDriveCount: 390,
    overallRate: '56.70%',
    rideOverallRate: '61.90%',
    momentaR7Rate: '53.50%',
    smartDriveHwRate: '68.00%',
    voiceRate: '70.80%',
    openNopRate: '56.20%',
    pilotAssistRate: '64.80%',
    nopTrafficLightRate: '48.00%',
    nopTurnRate: '51.50%',
    nopPedestrianRate: '45.20%',
    traceReverseRate: '59.50%',
    rampMergeRate: '53.00%',
    efficientPassRate: '58.20%',
    driveOverallRate: '51.50%',
    powerRate: '48.90%',
    chassisRate: '42.10%',
    parkingRate: '74.90%',
    phevSystemRate: '58.00%',
    rtdPreviewRate: '46.50%',
    hummingbirdChassisRate: '44.10%',
    cityNopRate: '40.80%',
    remoteParkingRate: '59.20%',
    autoParkingRate: '72.50%',
    sentryModeRate: '63.00%'
  },
  {
    id: 4,
    region: '四区',
    carModel: 'XT5 PHEV',
    testDriveCount: 310,
    overallRate: '54.20%',
    rideOverallRate: '59.80%',
    momentaR7Rate: '51.80%',
    smartDriveHwRate: '65.40%',
    voiceRate: '68.50%',
    openNopRate: '54.00%',
    pilotAssistRate: '62.50%',
    nopTrafficLightRate: '46.20%',
    nopTurnRate: '49.80%',
    nopPedestrianRate: '43.60%',
    traceReverseRate: '57.60%',
    rampMergeRate: '51.20%',
    efficientPassRate: '56.00%',
    driveOverallRate: '48.60%',
    powerRate: '46.50%',
    chassisRate: '39.80%',
    parkingRate: '72.00%',
    phevSystemRate: '55.40%',
    rtdPreviewRate: '44.00%',
    hummingbirdChassisRate: '41.80%',
    cityNopRate: '38.50%',
    remoteParkingRate: '56.80%',
    autoParkingRate: '69.50%',
    sentryModeRate: '60.40%'
  },
  {
    id: 5,
    region: '五区',
    carModel: 'XT5 PHEV',
    testDriveCount: 270,
    overallRate: '53.90%',
    rideOverallRate: '59.10%',
    momentaR7Rate: '51.00%',
    smartDriveHwRate: '64.80%',
    voiceRate: '67.90%',
    openNopRate: '53.40%',
    pilotAssistRate: '61.80%',
    nopTrafficLightRate: '45.50%',
    nopTurnRate: '49.00%',
    nopPedestrianRate: '43.00%',
    traceReverseRate: '56.80%',
    rampMergeRate: '50.50%',
    efficientPassRate: '55.20%',
    driveOverallRate: '48.70%',
    powerRate: '46.00%',
    chassisRate: '39.50%',
    parkingRate: '71.50%',
    phevSystemRate: '55.00%',
    rtdPreviewRate: '43.50%',
    hummingbirdChassisRate: '41.20%',
    cityNopRate: '38.00%',
    remoteParkingRate: '56.20%',
    autoParkingRate: '69.00%',
    sentryModeRate: '59.80%'
  },
  {
    id: 6,
    region: '六区',
    carModel: 'XT5 PHEV',
    testDriveCount: 180,
    overallRate: '51.50%',
    rideOverallRate: '57.20%',
    momentaR7Rate: '49.20%',
    smartDriveHwRate: '62.50%',
    voiceRate: '65.80%',
    openNopRate: '51.50%',
    pilotAssistRate: '59.60%',
    nopTrafficLightRate: '43.80%',
    nopTurnRate: '47.20%',
    nopPedestrianRate: '41.50%',
    traceReverseRate: '54.50%',
    rampMergeRate: '48.50%',
    efficientPassRate: '53.40%',
    driveOverallRate: '45.80%',
    powerRate: '43.50%',
    chassisRate: '37.20%',
    parkingRate: '68.80%',
    phevSystemRate: '52.50%',
    rtdPreviewRate: '41.00%',
    hummingbirdChassisRate: '39.00%',
    cityNopRate: '35.80%',
    remoteParkingRate: '53.50%',
    autoParkingRate: '66.00%',
    sentryModeRate: '57.20%'
  }
];

const MOCK_SUBREGION_DETAIL_DATA = [
  {
    id: 1,
    region: '一区',
    subRegion: '华东一小区',
    carModel: 'XT5 PHEV',
    testDriveCount: 280,
    overallRate: '62.90%',
    rideOverallRate: '67.80%',
    momentaR7Rate: '59.20%',
    smartDriveHwRate: '74.80%',
    voiceRate: '78.00%',
    openNopRate: '62.50%',
    pilotAssistRate: '71.50%',
    nopTrafficLightRate: '56.00%',
    nopTurnRate: '59.20%',
    nopPedestrianRate: '52.00%',
    traceReverseRate: '67.20%',
    rampMergeRate: '60.80%',
    efficientPassRate: '65.00%',
    driveOverallRate: '58.00%',
    powerRate: '56.50%',
    chassisRate: '49.00%',
    parkingRate: '81.60%',
    phevSystemRate: '64.20%',
    rtdPreviewRate: '53.00%',
    hummingbirdChassisRate: '50.50%',
    cityNopRate: '47.80%',
    remoteParkingRate: '65.50%',
    autoParkingRate: '79.20%',
    sentryModeRate: '68.20%'
  },
  {
    id: 2,
    region: '一区',
    subRegion: '华东二小区',
    carModel: 'XT5 PHEV',
    testDriveCount: 240,
    overallRate: '60.50%',
    rideOverallRate: '65.00%',
    momentaR7Rate: '56.50%',
    smartDriveHwRate: '72.00%',
    voiceRate: '75.20%',
    openNopRate: '59.80%',
    pilotAssistRate: '68.50%',
    nopTrafficLightRate: '52.80%',
    nopTurnRate: '56.50%',
    nopPedestrianRate: '49.50%',
    traceReverseRate: '64.50%',
    rampMergeRate: '58.00%',
    efficientPassRate: '62.40%',
    driveOverallRate: '56.00%',
    powerRate: '54.00%',
    chassisRate: '47.20%',
    parkingRate: '79.20%',
    phevSystemRate: '62.00%',
    rtdPreviewRate: '50.80%',
    hummingbirdChassisRate: '48.20%',
    cityNopRate: '45.60%',
    remoteParkingRate: '63.20%',
    autoParkingRate: '76.50%',
    sentryModeRate: '66.00%'
  },
  {
    id: 3,
    region: '二区',
    subRegion: '华南一小区',
    carModel: 'XT5 PHEV',
    testDriveCount: 260,
    overallRate: '59.20%',
    rideOverallRate: '64.50%',
    momentaR7Rate: '56.00%',
    smartDriveHwRate: '71.00%',
    voiceRate: '73.50%',
    openNopRate: '59.00%',
    pilotAssistRate: '67.80%',
    nopTrafficLightRate: '51.50%',
    nopTurnRate: '55.00%',
    nopPedestrianRate: '48.20%',
    traceReverseRate: '63.00%',
    rampMergeRate: '56.50%',
    efficientPassRate: '61.20%',
    driveOverallRate: '53.90%',
    powerRate: '52.00%',
    chassisRate: '44.80%',
    parkingRate: '78.00%',
    phevSystemRate: '60.50%',
    rtdPreviewRate: '49.00%',
    hummingbirdChassisRate: '46.50%',
    cityNopRate: '43.20%',
    remoteParkingRate: '61.80%',
    autoParkingRate: '75.50%',
    sentryModeRate: '65.20%'
  },
  {
    id: 4,
    region: '二区',
    subRegion: '华南二小区',
    carModel: 'XT5 PHEV',
    testDriveCount: 200,
    overallRate: '57.40%',
    rideOverallRate: '62.90%',
    momentaR7Rate: '54.20%',
    smartDriveHwRate: '69.00%',
    voiceRate: '71.20%',
    openNopRate: '57.60%',
    pilotAssistRate: '66.00%',
    nopTrafficLightRate: '49.50%',
    nopTurnRate: '53.20%',
    nopPedestrianRate: '46.60%',
    traceReverseRate: '60.80%',
    rampMergeRate: '55.00%',
    efficientPassRate: '59.40%',
    driveOverallRate: '51.90%',
    powerRate: '50.20%',
    chassisRate: '43.00%',
    parkingRate: '76.20%',
    phevSystemRate: '58.90%',
    rtdPreviewRate: '47.20%',
    hummingbirdChassisRate: '45.00%',
    cityNopRate: '41.80%',
    remoteParkingRate: '60.00%',
    autoParkingRate: '73.90%',
    sentryModeRate: '63.80%'
  },
  {
    id: 5,
    region: '三区',
    subRegion: '华北一小区',
    carModel: 'XT5 PHEV',
    testDriveCount: 210,
    overallRate: '57.50%',
    rideOverallRate: '62.80%',
    momentaR7Rate: '54.00%',
    smartDriveHwRate: '69.00%',
    voiceRate: '71.80%',
    openNopRate: '57.00%',
    pilotAssistRate: '65.80%',
    nopTrafficLightRate: '49.00%',
    nopTurnRate: '52.50%',
    nopPedestrianRate: '46.00%',
    traceReverseRate: '60.50%',
    rampMergeRate: '54.00%',
    efficientPassRate: '59.00%',
    driveOverallRate: '52.20%',
    powerRate: '49.80%',
    chassisRate: '42.80%',
    parkingRate: '75.80%',
    phevSystemRate: '58.80%',
    rtdPreviewRate: '47.20%',
    hummingbirdChassisRate: '44.80%',
    cityNopRate: '41.50%',
    remoteParkingRate: '60.00%',
    autoParkingRate: '73.20%',
    sentryModeRate: '63.80%'
  },
  {
    id: 6,
    region: '三区',
    subRegion: '华北二小区',
    carModel: 'XT5 PHEV',
    testDriveCount: 180,
    overallRate: '55.80%',
    rideOverallRate: '60.80%',
    momentaR7Rate: '52.80%',
    smartDriveHwRate: '66.80%',
    voiceRate: '69.50%',
    openNopRate: '55.20%',
    pilotAssistRate: '63.60%',
    nopTrafficLightRate: '46.80%',
    nopTurnRate: '50.20%',
    nopPedestrianRate: '44.20%',
    traceReverseRate: '58.20%',
    rampMergeRate: '51.80%',
    efficientPassRate: '57.20%',
    driveOverallRate: '50.80%',
    powerRate: '47.80%',
    chassisRate: '41.20%',
    parkingRate: '73.80%',
    phevSystemRate: '57.00%',
    rtdPreviewRate: '45.60%',
    hummingbirdChassisRate: '43.20%',
    cityNopRate: '40.00%',
    remoteParkingRate: '58.20%',
    autoParkingRate: '71.60%',
    sentryModeRate: '62.00%'
  },
  {
    id: 7,
    region: '四区',
    subRegion: '华中一小区',
    carModel: 'XT5 PHEV',
    testDriveCount: 170,
    overallRate: '54.80%',
    rideOverallRate: '60.50%',
    momentaR7Rate: '52.50%',
    smartDriveHwRate: '66.20%',
    voiceRate: '69.20%',
    openNopRate: '54.80%',
    pilotAssistRate: '63.20%',
    nopTrafficLightRate: '47.00%',
    nopTurnRate: '50.50%',
    nopPedestrianRate: '44.20%',
    traceReverseRate: '58.40%',
    rampMergeRate: '52.00%',
    efficientPassRate: '56.80%',
    driveOverallRate: '49.10%',
    powerRate: '47.00%',
    chassisRate: '40.20%',
    parkingRate: '72.80%',
    phevSystemRate: '56.00%',
    rtdPreviewRate: '44.60%',
    hummingbirdChassisRate: '42.40%',
    cityNopRate: '39.00%',
    remoteParkingRate: '57.40%',
    autoParkingRate: '70.20%',
    sentryModeRate: '61.00%'
  },
  {
    id: 8,
    region: '四区',
    subRegion: '华中二小区',
    carModel: 'XT5 PHEV',
    testDriveCount: 140,
    overallRate: '53.50%',
    rideOverallRate: '59.00%',
    momentaR7Rate: '51.00%',
    smartDriveHwRate: '64.40%',
    voiceRate: '67.60%',
    openNopRate: '53.00%',
    pilotAssistRate: '61.60%',
    nopTrafficLightRate: '45.20%',
    nopTurnRate: '48.90%',
    nopPedestrianRate: '42.80%',
    traceReverseRate: '56.60%',
    rampMergeRate: '50.20%',
    efficientPassRate: '55.00%',
    driveOverallRate: '48.00%',
    powerRate: '45.80%',
    chassisRate: '39.20%',
    parkingRate: '71.00%',
    phevSystemRate: '54.60%',
    rtdPreviewRate: '43.20%',
    hummingbirdChassisRate: '41.00%',
    cityNopRate: '37.80%',
    remoteParkingRate: '56.00%',
    autoParkingRate: '68.60%',
    sentryModeRate: '59.60%'
  },
  {
    id: 9,
    region: '五区',
    subRegion: '西南一小区',
    carModel: 'XT5 PHEV',
    testDriveCount: 150,
    overallRate: '54.40%',
    rideOverallRate: '59.60%',
    momentaR7Rate: '51.50%',
    smartDriveHwRate: '65.20%',
    voiceRate: '68.40%',
    openNopRate: '54.00%',
    pilotAssistRate: '62.40%',
    nopTrafficLightRate: '46.00%',
    nopTurnRate: '49.50%',
    nopPedestrianRate: '43.50%',
    traceReverseRate: '57.40%',
    rampMergeRate: '51.00%',
    efficientPassRate: '55.80%',
    driveOverallRate: '49.20%',
    powerRate: '46.50%',
    chassisRate: '40.00%',
    parkingRate: '72.00%',
    phevSystemRate: '55.60%',
    rtdPreviewRate: '44.00%',
    hummingbirdChassisRate: '41.80%',
    cityNopRate: '38.50%',
    remoteParkingRate: '56.80%',
    autoParkingRate: '69.60%',
    sentryModeRate: '60.40%'
  },
  {
    id: 10,
    region: '五区',
    subRegion: '西南二小区',
    carModel: 'XT5 PHEV',
    testDriveCount: 120,
    overallRate: '53.20%',
    rideOverallRate: '58.40%',
    momentaR7Rate: '50.20%',
    smartDriveHwRate: '64.20%',
    voiceRate: '67.20%',
    openNopRate: '52.60%',
    pilotAssistRate: '61.00%',
    nopTrafficLightRate: '44.80%',
    nopTurnRate: '48.20%',
    nopPedestrianRate: '42.20%',
    traceReverseRate: '56.00%',
    rampMergeRate: '49.80%',
    efficientPassRate: '54.40%',
    driveOverallRate: '48.00%',
    powerRate: '45.20%',
    chassisRate: '38.80%',
    parkingRate: '70.80%',
    phevSystemRate: '54.20%',
    rtdPreviewRate: '42.80%',
    hummingbirdChassisRate: '40.40%',
    cityNopRate: '37.20%',
    remoteParkingRate: '55.40%',
    autoParkingRate: '68.20%',
    sentryModeRate: '59.00%'
  },
  {
    id: 11,
    region: '六区',
    subRegion: '西北一小区',
    carModel: 'XT5 PHEV',
    testDriveCount: 100,
    overallRate: '52.00%',
    rideOverallRate: '57.80%',
    momentaR7Rate: '49.80%',
    smartDriveHwRate: '63.00%',
    voiceRate: '66.40%',
    openNopRate: '52.00%',
    pilotAssistRate: '60.20%',
    nopTrafficLightRate: '44.20%',
    nopTurnRate: '47.80%',
    nopPedestrianRate: '42.00%',
    traceReverseRate: '55.00%',
    rampMergeRate: '49.00%',
    efficientPassRate: '54.00%',
    driveOverallRate: '46.20%',
    powerRate: '44.00%',
    chassisRate: '37.80%',
    parkingRate: '69.40%',
    phevSystemRate: '53.00%',
    rtdPreviewRate: '41.50%',
    hummingbirdChassisRate: '39.50%',
    cityNopRate: '36.20%',
    remoteParkingRate: '54.00%',
    autoParkingRate: '66.80%',
    sentryModeRate: '57.80%'
  },
  {
    id: 12,
    region: '六区',
    subRegion: '东北一小区',
    carModel: 'XT5 PHEV',
    testDriveCount: 80,
    overallRate: '50.80%',
    rideOverallRate: '56.40%',
    momentaR7Rate: '48.50%',
    smartDriveHwRate: '61.80%',
    voiceRate: '65.00%',
    openNopRate: '50.80%',
    pilotAssistRate: '58.80%',
    nopTrafficLightRate: '43.20%',
    nopTurnRate: '46.50%',
    nopPedestrianRate: '40.80%',
    traceReverseRate: '53.80%',
    rampMergeRate: '47.80%',
    efficientPassRate: '52.60%',
    driveOverallRate: '45.20%',
    powerRate: '42.80%',
    chassisRate: '36.50%',
    parkingRate: '68.00%',
    phevSystemRate: '51.80%',
    rtdPreviewRate: '40.20%',
    hummingbirdChassisRate: '38.40%',
    cityNopRate: '35.20%',
    remoteParkingRate: '52.80%',
    autoParkingRate: '65.00%',
    sentryModeRate: '56.40%'
  }
];

const MOCK_BADGE_USAGE_DATA: BadgeUsageDetailRow[] = [
  {
    id: 1,
    name: '上海永达凯迪拉克',
    regionName: '一区',
    subRegionName: '华东一小区',
    badgeCount: 8,
    dailyAvgUses: 7,
    totalActiveHours: 64.8,
    avgActiveHours: 8.1,
    substandardUses: 1
  },
  {
    id: 2,
    name: '北京达世行凯迪拉克',
    regionName: '三区',
    subRegionName: '华北一小区',
    badgeCount: 10,
    dailyAvgUses: 8,
    totalActiveHours: 72.0,
    avgActiveHours: 7.2,
    substandardUses: 2
  },
  {
    id: 3,
    name: '广州南菱凯迪拉克',
    regionName: '二区',
    subRegionName: '华南一小区',
    badgeCount: 7,
    dailyAvgUses: 6,
    totalActiveHours: 52.5,
    avgActiveHours: 7.5,
    substandardUses: 1
  },
  {
    id: 4,
    name: '深圳标远凯迪拉克',
    regionName: '二区',
    subRegionName: '华南二小区',
    badgeCount: 9,
    dailyAvgUses: 8,
    totalActiveHours: 68.4,
    avgActiveHours: 7.6,
    substandardUses: 2
  },
  {
    id: 5,
    name: '成都安捷凯迪拉克',
    regionName: '四区',
    subRegionName: '西南一小区',
    badgeCount: 8,
    dailyAvgUses: 7,
    totalActiveHours: 62.4,
    avgActiveHours: 7.8,
    substandardUses: 0
  },
  {
    id: 6,
    name: '武汉康顺凯迪拉克',
    regionName: '五区',
    subRegionName: '华中一小区',
    badgeCount: 6,
    dailyAvgUses: 4,
    totalActiveHours: 39.0,
    avgActiveHours: 6.5,
    substandardUses: 3
  }
];

const CADILLAC_MODELS = [
  'XT5 PHEV'
];

export const CadillacTestDriveReport: React.FC = () => {
  // Filter States
  const [selectedRegion, setSelectedRegion] = useState('全国');
  const [selectedSubRegion, setSelectedSubRegion] = useState('全部小区');
  const [selectedStore, setSelectedStore] = useState('');
  const [dateQuickOption, setDateQuickOption] = useState<'yesterday' | '7days' | '30days'>('7days');
  const [startDate, setStartDate] = useState('2026-07-26');
  const [endDate, setEndDate] = useState('2026-08-01');
  const [searchKeyword, setSearchKeyword] = useState('');

  // Selected Car Model (Default XT5 PHEV as requested)
  const [selectedModel, setSelectedModel] = useState('XT5 PHEV');

  // Active Category Tab
  const [activeTab, setActiveTab] = useState<'testDrive' | 'badgeUsage'>('testDrive');

  // Detail level tab state: 全国 | 大区明细 | 小区明细 | 门店明细
  const [detailLevel, setDetailLevel] = useState<'national' | 'region' | 'subregion' | 'store'>('store');

  // Pagination state
  const [pageSize, setPageSize] = useState(10);

  // Filter Data for National Level
  const filteredNationalData = MOCK_NATIONAL_DETAIL_DATA;

  // Filter Data for Region Level
  const filteredRegionData = MOCK_REGION_DETAIL_DATA.filter(item => {
    if (selectedRegion !== '全国' && item.region !== selectedRegion) {
      return false;
    }
    return true;
  });

  // Filter Data for Sub-region Level
  const filteredSubRegionData = MOCK_SUBREGION_DETAIL_DATA.filter(item => {
    if (selectedRegion !== '全国' && item.region !== selectedRegion) {
      return false;
    }
    if (selectedSubRegion !== '全部小区' && item.subRegion !== selectedSubRegion) {
      return false;
    }
    return true;
  });

  // Filter Data for Store Level (门店明细)
  const filteredData = MOCK_CADILLAC_DETAIL_DATA.filter(item => {
    if (selectedRegion !== '全国' && item.region !== selectedRegion) {
      return false;
    }
    if (selectedStore && item.dealerName !== selectedStore) {
      return false;
    }
    return true;
  });

  const filteredBadgeData = MOCK_BADGE_USAGE_DATA
    .filter(item => {
      if (selectedRegion !== '全国' && item.regionName !== selectedRegion) {
        return false;
      }
      if (selectedStore && item.name !== selectedStore) {
        return false;
      }
      return true;
    })
    .sort((a, b) => b.substandardUses - a.substandardUses);

  const handleReset = () => {
    setSelectedRegion('全国');
    setSelectedSubRegion('全部小区');
    setSelectedStore('');
    setDateQuickOption('7days');
    setStartDate('2026-07-26');
    setEndDate('2026-08-01');
    setSelectedModel('XT5 PHEV');
    setSearchKeyword('');
  };

  const handleQuickDateSelect = (option: 'yesterday' | '7days' | '30days') => {
    setDateQuickOption(option);
    if (option === 'yesterday') {
      setStartDate('2026-07-31');
      setEndDate('2026-07-31');
    } else if (option === '7days') {
      setStartDate('2026-07-26');
      setEndDate('2026-08-01');
    } else if (option === '30days') {
      setStartDate('2026-07-03');
      setEndDate('2026-08-01');
    }
  };

  return (
    <div className="p-4 sm:p-6 space-y-6 bg-slate-50 dark:bg-slate-900 min-h-screen text-slate-800 dark:text-slate-100 font-sans">
      
      {/* 1. Header Filter Bar */}
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
              <option value="一区">一区</option>
              <option value="二区">二区</option>
              <option value="三区">三区</option>
              <option value="四区">四区</option>
              <option value="五区">五区</option>
              <option value="六区">六区</option>
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
              <option value="华东小区">华东小区</option>
              <option value="华北小区">华北小区</option>
              <option value="华南小区">华南小区</option>
              <option value="西南小区">西南小区</option>
              <option value="华中小区">华中小区</option>
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
              <option value="">请选择经销商</option>
              <option value="上海永达凯迪拉克">上海永达凯迪拉克</option>
              <option value="北京达世行凯迪拉克">北京达世行凯迪拉克</option>
              <option value="广州南菱凯迪拉克">广州南菱凯迪拉克</option>
              <option value="深圳标远凯迪拉克">深圳标远凯迪拉克</option>
              <option value="成都安捷凯迪拉克">成都安捷凯迪拉克</option>
              <option value="武汉康顺凯迪拉克">武汉康顺凯迪拉克</option>
            </select>
            <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
          </div>

          {/* Quick Date Range Options */}
          <div className="flex items-center justify-between bg-slate-100 dark:bg-slate-900 p-1 rounded-xl border border-slate-200 dark:border-slate-700 w-full shadow-2xs">
            <button
              onClick={() => handleQuickDateSelect('yesterday')}
              className={`flex-1 py-1.5 text-xs font-medium rounded-lg transition-all cursor-pointer text-center ${
                dateQuickOption === 'yesterday'
                  ? 'bg-white dark:bg-slate-800 text-blue-600 dark:text-blue-400 shadow-2xs font-semibold'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
              }`}
            >
              昨天
            </button>
            <button
              onClick={() => handleQuickDateSelect('7days')}
              className={`flex-1 py-1.5 text-xs font-medium rounded-lg transition-all cursor-pointer text-center ${
                dateQuickOption === '7days'
                  ? 'bg-white dark:bg-slate-800 text-blue-600 dark:text-blue-400 shadow-2xs font-semibold'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
              }`}
            >
              近7天
            </button>
            <button
              onClick={() => handleQuickDateSelect('30days')}
              className={`flex-1 py-1.5 text-xs font-medium rounded-lg transition-all cursor-pointer text-center ${
                dateQuickOption === '30days'
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
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="bg-transparent text-slate-700 dark:text-slate-200 text-xs focus:outline-none"
              />
              <span className="text-slate-400">⇀</span>
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="bg-transparent text-slate-700 dark:text-slate-200 text-xs focus:outline-none"
              />
              <Calendar size={14} className="text-slate-400" />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2.5">
            <button
              onClick={() => {}}
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

      {/* 2. Main Title Section: 工牌业务数据 */}
      <div className="space-y-4">
        <div>
          <h2 className="text-lg font-bold text-slate-900 dark:text-white tracking-tight">
            工牌业务数据
          </h2>
        </div>

        {/* Category Tabs & Model Pills Selector */}
        <div className="space-y-3">
          {/* Top Category Tabs */}
          <div className="flex items-center gap-6 border-b border-slate-200 dark:border-slate-700 pb-2">
            <button
              onClick={() => setActiveTab('testDrive')}
              className={`text-sm font-bold pb-1 relative transition-colors cursor-pointer ${
                activeTab === 'testDrive'
                  ? 'text-blue-600 dark:text-blue-400'
                  : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
              }`}
            >
              试乘试驾
              {activeTab === 'testDrive' && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 dark:bg-blue-400 rounded-full"></span>
              )}
            </button>
            <button
              onClick={() => setActiveTab('badgeUsage')}
              className={`text-sm font-bold pb-1 relative transition-colors cursor-pointer ${
                activeTab === 'badgeUsage'
                  ? 'text-blue-600 dark:text-blue-400'
                  : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
              }`}
            >
              工牌使用数据
              {activeTab === 'badgeUsage' && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 dark:bg-blue-400 rounded-full"></span>
              )}
            </button>
          </div>

          {/* Cadillac Vehicle Models Pills */}
          <div className="flex flex-wrap items-center gap-2 pt-1">
            {CADILLAC_MODELS.map((model) => {
              const isSelected = selectedModel === model;
              return (
                <button
                  key={model}
                  onClick={() => setSelectedModel(model)}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-blue-600 text-white font-bold shadow-xs'
                      : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 border border-slate-200/80 dark:border-slate-700'
                  }`}
                >
                  {model}
                </button>
              );
            })}
          </div>
        </div>

        {activeTab === 'testDrive' ? (
          <div className="space-y-6 pt-1">
            {/* Top 4 Summary KPI Metric Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Card 1: 试驾客流数 */}
              <div className="bg-white dark:bg-slate-800 p-4 rounded-2xl border border-slate-200/80 dark:border-slate-700 shadow-2xs flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-blue-500 text-white flex items-center justify-center shrink-0 shadow-xs">
                  <Users size={22} />
                </div>
                <div className="space-y-0.5 flex-1 min-w-0">
                  <div className="flex items-center gap-1 text-slate-500 dark:text-slate-400 text-xs">
                    <span>试驾客流数</span>
                    <HelpCircle size={13} className="text-slate-400 cursor-help" title="统计时间段内凯迪拉克工牌捕获的试驾客流总量" />
                  </div>
                  <div className="text-2xl font-black text-slate-900 dark:text-white font-mono tracking-tight">
                    1,790
                  </div>
                </div>
              </div>

              {/* Card 2: 试驾录音数 */}
              <div className="bg-white dark:bg-slate-800 p-4 rounded-2xl border border-slate-200/80 dark:border-slate-700 shadow-2xs flex items-center justify-between gap-3">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-orange-500 text-white flex items-center justify-center shrink-0 shadow-xs">
                    <Mic size={22} />
                  </div>
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-1 text-slate-500 dark:text-slate-400 text-xs">
                      <span>试驾录音数</span>
                      <HelpCircle size={13} className="text-slate-400 cursor-help" title="通过工牌实时采集并上传成功的有效试驾音频份数" />
                    </div>
                    <div className="text-2xl font-black text-slate-900 dark:text-white font-mono tracking-tight">
                      1,785
                    </div>
                  </div>
                </div>
                <ChevronRight size={18} className="text-slate-400" />
              </div>

              {/* Card 3: 平均试驾时长(分钟) */}
              <div className="bg-white dark:bg-slate-800 p-4 rounded-2xl border border-slate-200/80 dark:border-slate-700 shadow-2xs flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-emerald-500 text-white flex items-center justify-center shrink-0 shadow-xs">
                  <Coffee size={22} />
                </div>
                <div className="space-y-0.5 flex-1 min-w-0">
                  <div className="flex items-center gap-1 text-slate-500 dark:text-slate-400 text-xs">
                    <span>平均试驾时长(分钟)</span>
                    <HelpCircle size={13} className="text-slate-400 cursor-help" title="单次接待试乘试驾环节的平均语音持续时长" />
                  </div>
                  <div className="text-2xl font-black text-slate-900 dark:text-white font-mono tracking-tight">
                    28.22
                  </div>
                </div>
              </div>

              {/* Card 4: 试乘试驾总体执行率 */}
              <div className="bg-white dark:bg-slate-800 p-4 rounded-2xl border border-slate-200/80 dark:border-slate-700 shadow-2xs flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-rose-500 text-white flex items-center justify-center shrink-0 shadow-xs">
                  <TrendingUp size={22} />
                </div>
                <div className="space-y-0.5 flex-1 min-w-0">
                  <div className="flex items-center gap-1 text-slate-500 dark:text-slate-400 text-xs">
                    <span>总体执行率</span>
                    <HelpCircle size={13} className="text-slate-400 cursor-help" title="试乘与试驾全流程综合质检执行率" />
                  </div>
                  <div className="text-2xl font-black text-rose-500 dark:text-rose-400 font-mono tracking-tight">
                    57.03%
                  </div>
                </div>
              </div>
            </div>

            {/* 3. 试乘试驾 质检项卡片 (合并为单一模块：1项总执行率 + 21项质检细项) */}
            <div className="bg-white dark:bg-slate-800 p-5 rounded-2xl border border-slate-200/80 dark:border-slate-700 shadow-2xs space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-blue-600 dark:bg-blue-400"></span>
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white tracking-tight">
                    试乘试驾质检项执行率
                  </h3>
                </div>
              </div>

              {/* Cards Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
                {/* 综合指标: 试乘试驾总执行率 */}
                <div className="col-span-2 sm:col-span-1 bg-gradient-to-br from-blue-600 via-indigo-600 to-indigo-800 text-white rounded-2xl p-4 flex flex-col justify-between shadow-md border border-blue-500 relative overflow-hidden">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold px-2 py-0.5 bg-white/20 text-white rounded-full backdrop-blur-xs">
                      综合指标
                    </span>
                    <TrendingUp size={16} className="text-blue-200" />
                  </div>
                  <div className="mt-2 space-y-1">
                    <span className="text-xs font-semibold text-blue-100 block">试乘试驾总执行率</span>
                    <span className="text-2xl font-black font-mono tracking-tight text-white">
                      57.03%
                    </span>
                  </div>
                </div>

                {/* Sub-item 1: Momenta R7世界模型 */}
                <div className="bg-slate-50 dark:bg-slate-900/80 border border-slate-200/80 dark:border-slate-700/80 rounded-2xl p-3.5 flex flex-col justify-between space-y-2 hover:border-blue-300 dark:hover:border-blue-600 transition-colors">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] text-slate-400 font-medium">质检细项</span>
                  </div>
                  <span className="text-xs font-medium text-slate-600 dark:text-slate-300 line-clamp-2 leading-tight">Momenta R7世界模型</span>
                  <span className="text-lg font-bold text-slate-900 dark:text-white font-mono">
                    54.20%
                  </span>
                </div>

                {/* Sub-item 2: 智驾硬件 */}
                <div className="bg-slate-50 dark:bg-slate-900/80 border border-slate-200/80 dark:border-slate-700/80 rounded-2xl p-3.5 flex flex-col justify-between space-y-2 hover:border-blue-300 dark:hover:border-blue-600 transition-colors">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] text-slate-400 font-medium">质检细项</span>
                  </div>
                  <span className="text-xs font-medium text-slate-600 dark:text-slate-300">智驾硬件</span>
                  <span className="text-lg font-bold text-slate-900 dark:text-white font-mono">
                    68.50%
                  </span>
                </div>

                {/* Sub-item 3: 语音 */}
                <div className="bg-slate-50 dark:bg-slate-900/80 border border-slate-200/80 dark:border-slate-700/80 rounded-2xl p-3.5 flex flex-col justify-between space-y-2 hover:border-blue-300 dark:hover:border-blue-600 transition-colors">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] text-slate-400 font-medium">质检细项</span>
                  </div>
                  <span className="text-xs font-medium text-slate-600 dark:text-slate-300">语音</span>
                  <span className="text-lg font-bold text-slate-900 dark:text-white font-mono">
                    71.20%
                  </span>
                </div>

                {/* Sub-item 4: 开启NOP */}
                <div className="bg-slate-50 dark:bg-slate-900/80 border border-slate-200/80 dark:border-slate-700/80 rounded-2xl p-3.5 flex flex-col justify-between space-y-2 hover:border-blue-300 dark:hover:border-blue-600 transition-colors">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] text-slate-400 font-medium">质检细项</span>
                  </div>
                  <span className="text-xs font-medium text-slate-600 dark:text-slate-300">开启NOP</span>
                  <span className="text-lg font-bold text-slate-900 dark:text-white font-mono">
                    56.80%
                  </span>
                </div>

                {/* Sub-item 5: 辅助驾驶 */}
                <div className="bg-slate-50 dark:bg-slate-900/80 border border-slate-200/80 dark:border-slate-700/80 rounded-2xl p-3.5 flex flex-col justify-between space-y-2 hover:border-blue-300 dark:hover:border-blue-600 transition-colors">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] text-slate-400 font-medium">质检细项</span>
                  </div>
                  <span className="text-xs font-medium text-slate-600 dark:text-slate-300">辅助驾驶</span>
                  <span className="text-lg font-bold text-slate-900 dark:text-white font-mono">
                    65.30%
                  </span>
                </div>

                {/* Sub-item 6: NOP状态通过红绿灯时讲解 */}
                <div className="bg-slate-50 dark:bg-slate-900/80 border border-slate-200/80 dark:border-slate-700/80 rounded-2xl p-3.5 flex flex-col justify-between space-y-2 hover:border-blue-300 dark:hover:border-blue-600 transition-colors">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] text-slate-400 font-medium">质检细项</span>
                  </div>
                  <span className="text-xs font-medium text-slate-600 dark:text-slate-300 line-clamp-2 leading-tight">NOP状态通过红绿灯时讲解</span>
                  <span className="text-lg font-bold text-slate-900 dark:text-white font-mono">
                    48.60%
                  </span>
                </div>

                {/* Sub-item 7: NOP状态左转弯/右转弯时讲解 */}
                <div className="bg-slate-50 dark:bg-slate-900/80 border border-slate-200/80 dark:border-slate-700/80 rounded-2xl p-3.5 flex flex-col justify-between space-y-2 hover:border-blue-300 dark:hover:border-blue-600 transition-colors">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] text-slate-400 font-medium">质检细项</span>
                  </div>
                  <span className="text-xs font-medium text-slate-600 dark:text-slate-300 line-clamp-2 leading-tight">NOP状态左转弯/右转弯时讲解</span>
                  <span className="text-lg font-bold text-slate-900 dark:text-white font-mono">
                    52.10%
                  </span>
                </div>

                {/* Sub-item 8: NOP避让人/车时讲解 */}
                <div className="bg-slate-50 dark:bg-slate-900/80 border border-slate-200/80 dark:border-slate-700/80 rounded-2xl p-3.5 flex flex-col justify-between space-y-2 hover:border-blue-300 dark:hover:border-blue-600 transition-colors">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] text-slate-400 font-medium">质检细项</span>
                  </div>
                  <span className="text-xs font-medium text-slate-600 dark:text-slate-300 line-clamp-2 leading-tight">NOP避让人/车时讲解</span>
                  <span className="text-lg font-bold text-slate-900 dark:text-white font-mono">
                    45.80%
                  </span>
                </div>

                {/* Sub-item 9: 循迹倒车 */}
                <div className="bg-slate-50 dark:bg-slate-900/80 border border-slate-200/80 dark:border-slate-700/80 rounded-2xl p-3.5 flex flex-col justify-between space-y-2 hover:border-blue-300 dark:hover:border-blue-600 transition-colors">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] text-slate-400 font-medium">质检细项</span>
                  </div>
                  <span className="text-xs font-medium text-slate-600 dark:text-slate-300">循迹倒车</span>
                  <span className="text-lg font-bold text-slate-900 dark:text-white font-mono">
                    60.20%
                  </span>
                </div>

                {/* Sub-item 10: 匝道汇入 */}
                <div className="bg-slate-50 dark:bg-slate-900/80 border border-slate-200/80 dark:border-slate-700/80 rounded-2xl p-3.5 flex flex-col justify-between space-y-2 hover:border-blue-300 dark:hover:border-blue-600 transition-colors">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] text-slate-400 font-medium">质检细项</span>
                  </div>
                  <span className="text-xs font-medium text-slate-600 dark:text-slate-300">匝道汇入</span>
                  <span className="text-lg font-bold text-slate-900 dark:text-white font-mono">
                    53.70%
                  </span>
                </div>

                {/* Sub-item 11: 高效通行 */}
                <div className="bg-slate-50 dark:bg-slate-900/80 border border-slate-200/80 dark:border-slate-700/80 rounded-2xl p-3.5 flex flex-col justify-between space-y-2 hover:border-blue-300 dark:hover:border-blue-600 transition-colors">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] text-slate-400 font-medium">质检细项</span>
                  </div>
                  <span className="text-xs font-medium text-slate-600 dark:text-slate-300">高效通行</span>
                  <span className="text-lg font-bold text-slate-900 dark:text-white font-mono">
                    58.90%
                  </span>
                </div>

                {/* Sub-item 12: 动力 */}
                <div className="bg-slate-50 dark:bg-slate-900/80 border border-slate-200/80 dark:border-slate-700/80 rounded-2xl p-3.5 flex flex-col justify-between space-y-2 hover:border-blue-300 dark:hover:border-blue-600 transition-colors">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] text-slate-400 font-medium">质检细项</span>
                  </div>
                  <span className="text-xs font-medium text-slate-600 dark:text-slate-300">动力</span>
                  <span className="text-lg font-bold text-slate-900 dark:text-white font-mono">
                    49.19%
                  </span>
                </div>

                {/* Sub-item 13: 底盘 */}
                <div className="bg-slate-50 dark:bg-slate-900/80 border border-slate-200/80 dark:border-slate-700/80 rounded-2xl p-3.5 flex flex-col justify-between space-y-2 hover:border-blue-300 dark:hover:border-blue-600 transition-colors">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] text-slate-400 font-medium">质检细项</span>
                  </div>
                  <span className="text-xs font-medium text-slate-600 dark:text-slate-300">底盘</span>
                  <span className="text-lg font-bold text-slate-900 dark:text-white font-mono">
                    42.41%
                  </span>
                </div>

                {/* Sub-item 14: 泊车 */}
                <div className="bg-slate-50 dark:bg-slate-900/80 border border-slate-200/80 dark:border-slate-700/80 rounded-2xl p-3.5 flex flex-col justify-between space-y-2 hover:border-blue-300 dark:hover:border-blue-600 transition-colors">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] text-slate-400 font-medium">质检细项</span>
                  </div>
                  <span className="text-xs font-medium text-slate-600 dark:text-slate-300">泊车</span>
                  <span className="text-lg font-bold text-slate-900 dark:text-white font-mono">
                    75.24%
                  </span>
                </div>

                {/* Sub-item 15: 凯迪拉克插混系统 */}
                <div className="bg-slate-50 dark:bg-slate-900/80 border border-slate-200/80 dark:border-slate-700/80 rounded-2xl p-3.5 flex flex-col justify-between space-y-2 hover:border-blue-300 dark:hover:border-blue-600 transition-colors">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] text-slate-400 font-medium">质检细项</span>
                  </div>
                  <span className="text-xs font-medium text-slate-600 dark:text-slate-300 line-clamp-2 leading-tight">凯迪拉克插混系统</span>
                  <span className="text-lg font-bold text-slate-900 dark:text-white font-mono">
                    58.30%
                  </span>
                </div>

                {/* Sub-item 16: 预瞄RTD */}
                <div className="bg-slate-50 dark:bg-slate-900/80 border border-slate-200/80 dark:border-slate-700/80 rounded-2xl p-3.5 flex flex-col justify-between space-y-2 hover:border-blue-300 dark:hover:border-blue-600 transition-colors">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] text-slate-400 font-medium">质检细项</span>
                  </div>
                  <span className="text-xs font-medium text-slate-600 dark:text-slate-300">预瞄RTD</span>
                  <span className="text-lg font-bold text-slate-900 dark:text-white font-mono">
                    46.80%
                  </span>
                </div>

                {/* Sub-item 17: 电动蜂鸟底盘 */}
                <div className="bg-slate-50 dark:bg-slate-900/80 border border-slate-200/80 dark:border-slate-700/80 rounded-2xl p-3.5 flex flex-col justify-between space-y-2 hover:border-blue-300 dark:hover:border-blue-600 transition-colors">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] text-slate-400 font-medium">质检细项</span>
                  </div>
                  <span className="text-xs font-medium text-slate-600 dark:text-slate-300 line-clamp-2 leading-tight">电动蜂鸟底盘</span>
                  <span className="text-lg font-bold text-slate-900 dark:text-white font-mono">
                    44.50%
                  </span>
                </div>

                {/* Sub-item 18: 城区NOP */}
                <div className="bg-slate-50 dark:bg-slate-900/80 border border-slate-200/80 dark:border-slate-700/80 rounded-2xl p-3.5 flex flex-col justify-between space-y-2 hover:border-blue-300 dark:hover:border-blue-600 transition-colors">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] text-slate-400 font-medium">质检细项</span>
                  </div>
                  <span className="text-xs font-medium text-slate-600 dark:text-slate-300">城区NOP</span>
                  <span className="text-lg font-bold text-slate-900 dark:text-white font-mono">
                    41.20%
                  </span>
                </div>

                {/* Sub-item 19: 离车泊入 */}
                <div className="bg-slate-50 dark:bg-slate-900/80 border border-slate-200/80 dark:border-slate-700/80 rounded-2xl p-3.5 flex flex-col justify-between space-y-2 hover:border-blue-300 dark:hover:border-blue-600 transition-colors">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] text-slate-400 font-medium">质检细项</span>
                  </div>
                  <span className="text-xs font-medium text-slate-600 dark:text-slate-300">离车泊入</span>
                  <span className="text-lg font-bold text-slate-900 dark:text-white font-mono">
                    59.60%
                  </span>
                </div>

                {/* Sub-item 20: 自动泊车 */}
                <div className="bg-slate-50 dark:bg-slate-900/80 border border-slate-200/80 dark:border-slate-700/80 rounded-2xl p-3.5 flex flex-col justify-between space-y-2 hover:border-blue-300 dark:hover:border-blue-600 transition-colors">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] text-slate-400 font-medium">质检细项</span>
                  </div>
                  <span className="text-xs font-medium text-slate-600 dark:text-slate-300">自动泊车</span>
                  <span className="text-lg font-bold text-slate-900 dark:text-white font-mono">
                    72.80%
                  </span>
                </div>

                {/* Sub-item 21: 哨兵模式 */}
                <div className="bg-slate-50 dark:bg-slate-900/80 border border-slate-200/80 dark:border-slate-700/80 rounded-2xl p-3.5 flex flex-col justify-between space-y-2 hover:border-blue-300 dark:hover:border-blue-600 transition-colors">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] text-slate-400 font-medium">质检细项</span>
                  </div>
                  <span className="text-xs font-medium text-slate-600 dark:text-slate-300">哨兵模式</span>
                  <span className="text-lg font-bold text-slate-900 dark:text-white font-mono">
                    63.50%
                  </span>
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* 工牌使用数据 Metrics Panel */
          <div className="pt-1">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Metric 1: 试乘试驾工牌数 */}
              <div className="bg-white dark:bg-slate-800 p-4 rounded-2xl border border-slate-200/80 dark:border-slate-700 shadow-2xs flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-blue-500 text-white flex items-center justify-center shrink-0 shadow-xs">
                  <Award size={22} />
                </div>
                <div className="space-y-0.5 flex-1 min-w-0">
                  <div className="flex items-center gap-1 text-slate-500 dark:text-slate-400 text-xs font-medium">
                    <span>试乘试驾工牌数</span>
                    <HelpCircle size={13} className="text-slate-400 cursor-help" title="试乘试驾场景下已绑定并激活使用的智能工牌总台数" />
                  </div>
                  <div className="text-2xl font-black text-slate-900 dark:text-white font-mono tracking-tight">
                    486
                  </div>
                </div>
              </div>

              {/* Metric 2: 日均正常使用数 */}
              <div className="bg-white dark:bg-slate-800 p-4 rounded-2xl border border-slate-200/80 dark:border-slate-700 shadow-2xs flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-emerald-500 text-white flex items-center justify-center shrink-0 shadow-xs">
                  <Activity size={22} />
                </div>
                <div className="space-y-0.5 flex-1 min-w-0">
                  <div className="flex items-center gap-1 text-slate-500 dark:text-slate-400 text-xs font-medium">
                    <span>日均正常使用数</span>
                    <HelpCircle size={13} className="text-slate-400 cursor-help" title="统计周期内试乘试驾工牌单日平均正常录音与接待使用次数" />
                  </div>
                  <div className="text-2xl font-black text-slate-900 dark:text-white font-mono tracking-tight">
                    412
                  </div>
                </div>
              </div>

              {/* Metric 3: 平均开启时长 */}
              <div className="bg-white dark:bg-slate-800 p-4 rounded-2xl border border-slate-200/80 dark:border-slate-700 shadow-2xs flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-indigo-500 text-white flex items-center justify-center shrink-0 shadow-xs">
                  <Clock size={22} />
                </div>
                <div className="space-y-0.5 flex-1 min-w-0">
                  <div className="flex items-center gap-1 text-slate-500 dark:text-slate-400 text-xs font-medium">
                    <span>平均开启时长(小时)</span>
                    <HelpCircle size={13} className="text-slate-400 cursor-help" title="单台工牌每日平均保持开机及语音监控的工作时长" />
                  </div>
                  <div className="text-2xl font-black text-slate-900 dark:text-white font-mono tracking-tight">
                    7.2
                  </div>
                </div>
              </div>

              {/* Metric 4: 异常使用数 */}
              <div className="bg-white dark:bg-slate-800 p-4 rounded-2xl border border-slate-200/80 dark:border-slate-700 shadow-2xs flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-rose-500 text-white flex items-center justify-center shrink-0 shadow-xs">
                  <AlertTriangle size={22} />
                </div>
                <div className="space-y-0.5 flex-1 min-w-0">
                  <div className="flex items-center gap-1 text-slate-500 dark:text-slate-400 text-xs font-medium">
                    <span>异常使用数</span>
                    <HelpCircle size={13} className="text-slate-400 cursor-help" title="检测到的静音关机、中途离线、未佩戴录音等异常事件次数" />
                  </div>
                  <div className="text-2xl font-black text-rose-600 dark:text-rose-400 font-mono tracking-tight">
                    12
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>

      {/* 5. Section: 数据明细 Table */}
      <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200/80 dark:border-slate-700 shadow-2xs overflow-hidden space-y-3">
        
        {/* Table Header Title & Actions */}
        <div className="px-5 py-4 border-b border-slate-100 dark:border-slate-700/80 flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-3 sm:gap-4">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <span>数据明细 ({selectedModel})</span>
            </h3>

            {/* 4 Detail Tabs: 全国, 大区明细, 小区明细, 门店明细 */}
            {activeTab === 'testDrive' && (
              <div className="flex items-center p-1 bg-slate-100 dark:bg-slate-900/90 rounded-xl border border-slate-200 dark:border-slate-700">
                <button
                  onClick={() => setDetailLevel('national')}
                  className={`px-3 py-1 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                    detailLevel === 'national'
                      ? 'bg-blue-600 text-white shadow-xs'
                      : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  全国
                </button>
                <button
                  onClick={() => setDetailLevel('region')}
                  className={`px-3 py-1 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                    detailLevel === 'region'
                      ? 'bg-blue-600 text-white shadow-xs'
                      : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  大区明细
                </button>
                <button
                  onClick={() => setDetailLevel('subregion')}
                  className={`px-3 py-1 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                    detailLevel === 'subregion'
                      ? 'bg-blue-600 text-white shadow-xs'
                      : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  小区明细
                </button>
                <button
                  onClick={() => setDetailLevel('store')}
                  className={`px-3 py-1 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                    detailLevel === 'store'
                      ? 'bg-blue-600 text-white shadow-xs'
                      : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  门店明细
                </button>
              </div>
            )}
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                alert('数据明细已导出！');
              }}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-700 dark:text-slate-200 bg-slate-100 hover:bg-slate-200 dark:bg-slate-700 dark:hover:bg-slate-600 rounded-lg transition-colors cursor-pointer border border-slate-200/80 dark:border-slate-600 shadow-2xs"
            >
              <Download size={14} className="text-slate-500 dark:text-slate-400" />
              <span>下载明细</span>
            </button>
          </div>
        </div>

        {/* Responsive Table Container with horizontal scrolling */}
        <div className="overflow-x-auto">
          {activeTab === 'testDrive' ? (
            <table className="w-full text-left text-xs border-collapse whitespace-nowrap">
              <thead>
                {/* Main Column Header Row */}
                <tr className="bg-slate-700 dark:bg-slate-900 text-white font-medium">
                  {/* Fixed & Basic Info depending on detail level */}
                  {detailLevel === 'national' && (
                    <>
                      <th className="py-3 px-3 font-semibold text-center border-r border-slate-600/50 sticky left-0 z-10 bg-slate-700 dark:bg-slate-900">区域</th>
                      <th className="py-3 px-3 font-semibold border-r border-slate-600/50">车型</th>
                      <th className="py-3 px-3 font-semibold border-r border-slate-600/50 text-right">试乘试驾数</th>
                      <th className="py-3 px-3 font-semibold border-r border-slate-600/50 text-right text-rose-300 bg-rose-950/30">总体执行率</th>
                    </>
                  )}
                  {detailLevel === 'region' && (
                    <>
                      <th className="py-3 px-3 font-semibold text-center border-r border-slate-600/50 sticky left-0 z-10 bg-slate-700 dark:bg-slate-900">大区</th>
                      <th className="py-3 px-3 font-semibold border-r border-slate-600/50">车型</th>
                      <th className="py-3 px-3 font-semibold border-r border-slate-600/50 text-right">试乘试驾数</th>
                      <th className="py-3 px-3 font-semibold border-r border-slate-600/50 text-right text-rose-300 bg-rose-950/30">总体执行率</th>
                    </>
                  )}
                  {detailLevel === 'subregion' && (
                    <>
                      <th className="py-3 px-3 font-semibold text-center border-r border-slate-600/50 sticky left-0 z-10 bg-slate-700 dark:bg-slate-900">所属大区</th>
                      <th className="py-3 px-3 font-semibold border-r border-slate-600/50">MAC</th>
                      <th className="py-3 px-3 font-semibold border-r border-slate-600/50">车型</th>
                      <th className="py-3 px-3 font-semibold border-r border-slate-600/50 text-right">试乘试驾数</th>
                      <th className="py-3 px-3 font-semibold border-r border-slate-600/50 text-right text-rose-300 bg-rose-950/30">总体执行率</th>
                    </>
                  )}
                  {detailLevel === 'store' && (
                    <>
                      <th className="py-3 px-3 font-semibold text-center border-r border-slate-600/50 sticky left-0 z-10 bg-slate-700 dark:bg-slate-900">大区</th>
                      <th className="py-3 px-3 font-semibold border-r border-slate-600/50">MAC</th>
                      <th className="py-3 px-3 font-semibold border-r border-slate-600/50">经销商code</th>
                      <th className="py-3 px-3 font-semibold border-r border-slate-600/50">经销商简称</th>
                      <th className="py-3 px-3 font-semibold border-r border-slate-600/50">车型</th>
                      <th className="py-3 px-3 font-semibold border-r border-slate-600/50 text-right">试乘试驾数</th>
                      <th className="py-3 px-3 font-semibold border-r border-slate-600/50 text-right text-rose-300 bg-rose-950/30">总体执行率</th>
                    </>
                  )}

                  {/* Level 1: 客户试乘总执行率 (Distinct Indigo Color Highlight) */}
                  <th className="py-3 px-3.5 font-bold border-r border-indigo-700/80 text-right bg-indigo-600 dark:bg-indigo-700 text-white shadow-xs">
                    ★ 客户试乘总执行率 (一级)
                  </th>

                  {/* Level 2 Sub-items for 客户试乘 (Cols 9-19) */}
                  <th className="py-3 px-3 font-medium border-r border-slate-600/50 text-right">Momenta R7世界模型</th>
                  <th className="py-3 px-3 font-medium border-r border-slate-600/50 text-right">智驾硬件</th>
                  <th className="py-3 px-3 font-medium border-r border-slate-600/50 text-right">语音</th>
                  <th className="py-3 px-3 font-medium border-r border-slate-600/50 text-right">开启NOP</th>
                  <th className="py-3 px-3 font-medium border-r border-slate-600/50 text-right">辅助驾驶</th>
                  <th className="py-3 px-3 font-medium border-r border-slate-600/50 text-right">NOP状态通过红绿灯时讲解</th>
                  <th className="py-3 px-3 font-medium border-r border-slate-600/50 text-right">NOP状态左转弯/右转弯时讲解</th>
                  <th className="py-3 px-3 font-medium border-r border-slate-600/50 text-right">NOP避让人/车时讲解</th>
                  <th className="py-3 px-3 font-medium border-r border-slate-600/50 text-right">循迹倒车</th>
                  <th className="py-3 px-3 font-medium border-r border-slate-600/50 text-right">匝道汇入</th>
                  <th className="py-3 px-3 font-medium border-r border-slate-600/50 text-right">高效通行</th>

                  {/* Level 1: 客户试驾总执行率 (Distinct Teal Color Highlight) */}
                  <th className="py-3 px-3.5 font-bold border-r border-teal-700/80 text-right bg-teal-600 dark:bg-teal-700 text-white shadow-xs">
                    ★ 客户试驾总执行率 (一级)
                  </th>

                  {/* Level 2 Sub-items for 客户试驾 (Cols 21-30) */}
                  <th className="py-3 px-3 font-medium border-r border-slate-600/50 text-right">动力</th>
                  <th className="py-3 px-3 font-medium border-r border-slate-600/50 text-right">底盘</th>
                  <th className="py-3 px-3 font-medium border-r border-slate-600/50 text-right">泊车</th>
                  <th className="py-3 px-3 font-medium border-r border-slate-600/50 text-right">凯迪拉克插混系统</th>
                  <th className="py-3 px-3 font-medium border-r border-slate-600/50 text-right">预瞄RTD</th>
                  <th className="py-3 px-3 font-medium border-r border-slate-600/50 text-right">电动蜂鸟底盘</th>
                  <th className="py-3 px-3 font-medium border-r border-slate-600/50 text-right">城区NOP</th>
                  <th className="py-3 px-3 font-medium border-r border-slate-600/50 text-right">离车泊入</th>
                  <th className="py-3 px-3 font-medium border-r border-slate-600/50 text-right">自动泊车</th>
                  <th className="py-3 px-3 font-medium text-right">哨兵模式</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-700/60 text-slate-700 dark:text-slate-200 font-sans">
                {/* 1. National Level View */}
                {detailLevel === 'national' && filteredNationalData.map((row) => (
                  <tr 
                    key={row.id} 
                    className="hover:bg-slate-50/80 dark:hover:bg-slate-700/40 transition-colors font-medium"
                  >
                    <td className="py-3 px-3 text-center font-bold text-blue-600 dark:text-blue-400 sticky left-0 z-10 bg-white dark:bg-slate-800 shadow-2xs">
                      {row.name}
                    </td>
                    <td className="py-3 px-3 font-medium text-slate-600 dark:text-slate-300">{row.carModel}</td>
                    <td className="py-3 px-3 font-mono text-right font-bold text-slate-800 dark:text-slate-100">
                      {row.testDriveCount.toLocaleString()}
                    </td>
                    <td className="py-3 px-3 font-mono text-right font-bold text-rose-600 dark:text-rose-400 bg-rose-50/40 dark:bg-rose-950/20">
                      {row.overallRate}
                    </td>
                    <td className="py-3 px-3.5 font-mono text-right font-black text-indigo-700 dark:text-indigo-300 bg-indigo-50/70 dark:bg-indigo-950/40 border-x border-indigo-200 dark:border-indigo-800/60">
                      {row.rideOverallRate}
                    </td>
                    <td className="py-3 px-3 font-mono text-right text-slate-600 dark:text-slate-300">{row.momentaR7Rate}</td>
                    <td className="py-3 px-3 font-mono text-right text-slate-600 dark:text-slate-300">{row.smartDriveHwRate}</td>
                    <td className="py-3 px-3 font-mono text-right text-slate-600 dark:text-slate-300">{row.voiceRate}</td>
                    <td className="py-3 px-3 font-mono text-right text-slate-600 dark:text-slate-300">{row.openNopRate}</td>
                    <td className="py-3 px-3 font-mono text-right text-slate-600 dark:text-slate-300">{row.pilotAssistRate}</td>
                    <td className="py-3 px-3 font-mono text-right text-slate-600 dark:text-slate-300">{row.nopTrafficLightRate}</td>
                    <td className="py-3 px-3 font-mono text-right text-slate-600 dark:text-slate-300">{row.nopTurnRate}</td>
                    <td className="py-3 px-3 font-mono text-right text-slate-600 dark:text-slate-300">{row.nopPedestrianRate}</td>
                    <td className="py-3 px-3 font-mono text-right text-slate-600 dark:text-slate-300">{row.traceReverseRate}</td>
                    <td className="py-3 px-3 font-mono text-right text-slate-600 dark:text-slate-300">{row.rampMergeRate}</td>
                    <td className="py-3 px-3 font-mono text-right text-slate-600 dark:text-slate-300">{row.efficientPassRate}</td>
                    <td className="py-3 px-3.5 font-mono text-right font-black text-teal-700 dark:text-teal-300 bg-teal-50/70 dark:bg-teal-950/40 border-x border-teal-200 dark:border-teal-800/60">
                      {row.driveOverallRate}
                    </td>
                    <td className="py-3 px-3 font-mono text-right text-slate-600 dark:text-slate-300">{row.powerRate}</td>
                    <td className="py-3 px-3 font-mono text-right text-slate-600 dark:text-slate-300">{row.chassisRate}</td>
                    <td className="py-3 px-3 font-mono text-right text-slate-600 dark:text-slate-300">{row.parkingRate}</td>
                    <td className="py-3 px-3 font-mono text-right text-slate-600 dark:text-slate-300">{row.phevSystemRate}</td>
                    <td className="py-3 px-3 font-mono text-right text-slate-600 dark:text-slate-300">{row.rtdPreviewRate}</td>
                    <td className="py-3 px-3 font-mono text-right text-slate-600 dark:text-slate-300">{row.hummingbirdChassisRate}</td>
                    <td className="py-3 px-3 font-mono text-right text-slate-600 dark:text-slate-300">{row.cityNopRate}</td>
                    <td className="py-3 px-3 font-mono text-right text-slate-600 dark:text-slate-300">{row.remoteParkingRate}</td>
                    <td className="py-3 px-3 font-mono text-right text-slate-600 dark:text-slate-300">{row.autoParkingRate}</td>
                    <td className="py-3 px-3 font-mono text-right text-slate-600 dark:text-slate-300">{row.sentryModeRate}</td>
                  </tr>
                ))}

                {/* 2. Region Level View */}
                {detailLevel === 'region' && filteredRegionData.map((row) => (
                  <tr 
                    key={row.id} 
                    className="hover:bg-slate-50/80 dark:hover:bg-slate-700/40 transition-colors"
                  >
                    <td className="py-3 px-3 text-center font-bold text-blue-600 dark:text-blue-400 sticky left-0 z-10 bg-white dark:bg-slate-800 shadow-2xs">
                      {row.region}
                    </td>
                    <td className="py-3 px-3 font-medium text-slate-600 dark:text-slate-300">{row.carModel}</td>
                    <td className="py-3 px-3 font-mono text-right font-bold text-slate-800 dark:text-slate-100">
                      {row.testDriveCount}
                    </td>
                    <td className="py-3 px-3 font-mono text-right font-bold text-rose-600 dark:text-rose-400 bg-rose-50/40 dark:bg-rose-950/20">
                      {row.overallRate}
                    </td>
                    <td className="py-3 px-3.5 font-mono text-right font-black text-indigo-700 dark:text-indigo-300 bg-indigo-50/70 dark:bg-indigo-950/40 border-x border-indigo-200 dark:border-indigo-800/60">
                      {row.rideOverallRate}
                    </td>
                    <td className="py-3 px-3 font-mono text-right text-slate-600 dark:text-slate-300">{row.momentaR7Rate}</td>
                    <td className="py-3 px-3 font-mono text-right text-slate-600 dark:text-slate-300">{row.smartDriveHwRate}</td>
                    <td className="py-3 px-3 font-mono text-right text-slate-600 dark:text-slate-300">{row.voiceRate}</td>
                    <td className="py-3 px-3 font-mono text-right text-slate-600 dark:text-slate-300">{row.openNopRate}</td>
                    <td className="py-3 px-3 font-mono text-right text-slate-600 dark:text-slate-300">{row.pilotAssistRate}</td>
                    <td className="py-3 px-3 font-mono text-right text-slate-600 dark:text-slate-300">{row.nopTrafficLightRate}</td>
                    <td className="py-3 px-3 font-mono text-right text-slate-600 dark:text-slate-300">{row.nopTurnRate}</td>
                    <td className="py-3 px-3 font-mono text-right text-slate-600 dark:text-slate-300">{row.nopPedestrianRate}</td>
                    <td className="py-3 px-3 font-mono text-right text-slate-600 dark:text-slate-300">{row.traceReverseRate}</td>
                    <td className="py-3 px-3 font-mono text-right text-slate-600 dark:text-slate-300">{row.rampMergeRate}</td>
                    <td className="py-3 px-3 font-mono text-right text-slate-600 dark:text-slate-300">{row.efficientPassRate}</td>
                    <td className="py-3 px-3.5 font-mono text-right font-black text-teal-700 dark:text-teal-300 bg-teal-50/70 dark:bg-teal-950/40 border-x border-teal-200 dark:border-teal-800/60">
                      {row.driveOverallRate}
                    </td>
                    <td className="py-3 px-3 font-mono text-right text-slate-600 dark:text-slate-300">{row.powerRate}</td>
                    <td className="py-3 px-3 font-mono text-right text-slate-600 dark:text-slate-300">{row.chassisRate}</td>
                    <td className="py-3 px-3 font-mono text-right text-slate-600 dark:text-slate-300">{row.parkingRate}</td>
                    <td className="py-3 px-3 font-mono text-right text-slate-600 dark:text-slate-300">{row.phevSystemRate}</td>
                    <td className="py-3 px-3 font-mono text-right text-slate-600 dark:text-slate-300">{row.rtdPreviewRate}</td>
                    <td className="py-3 px-3 font-mono text-right text-slate-600 dark:text-slate-300">{row.hummingbirdChassisRate}</td>
                    <td className="py-3 px-3 font-mono text-right text-slate-600 dark:text-slate-300">{row.cityNopRate}</td>
                    <td className="py-3 px-3 font-mono text-right text-slate-600 dark:text-slate-300">{row.remoteParkingRate}</td>
                    <td className="py-3 px-3 font-mono text-right text-slate-600 dark:text-slate-300">{row.autoParkingRate}</td>
                    <td className="py-3 px-3 font-mono text-right text-slate-600 dark:text-slate-300">{row.sentryModeRate}</td>
                  </tr>
                ))}

                {/* 3. Sub-Region Level View */}
                {detailLevel === 'subregion' && filteredSubRegionData.map((row) => (
                  <tr 
                    key={row.id} 
                    className="hover:bg-slate-50/80 dark:hover:bg-slate-700/40 transition-colors"
                  >
                    <td className="py-3 px-3 text-center font-medium text-slate-600 dark:text-slate-300 sticky left-0 z-10 bg-white dark:bg-slate-800 shadow-2xs">
                      {row.region}
                    </td>
                    <td className="py-3 px-3 font-bold text-blue-600 dark:text-blue-400">
                      {row.subRegion}
                    </td>
                    <td className="py-3 px-3 font-medium text-slate-600 dark:text-slate-300">{row.carModel}</td>
                    <td className="py-3 px-3 font-mono text-right font-bold text-slate-800 dark:text-slate-100">
                      {row.testDriveCount}
                    </td>
                    <td className="py-3 px-3 font-mono text-right font-bold text-rose-600 dark:text-rose-400 bg-rose-50/40 dark:bg-rose-950/20">
                      {row.overallRate}
                    </td>
                    <td className="py-3 px-3.5 font-mono text-right font-black text-indigo-700 dark:text-indigo-300 bg-indigo-50/70 dark:bg-indigo-950/40 border-x border-indigo-200 dark:border-indigo-800/60">
                      {row.rideOverallRate}
                    </td>
                    <td className="py-3 px-3 font-mono text-right text-slate-600 dark:text-slate-300">{row.momentaR7Rate}</td>
                    <td className="py-3 px-3 font-mono text-right text-slate-600 dark:text-slate-300">{row.smartDriveHwRate}</td>
                    <td className="py-3 px-3 font-mono text-right text-slate-600 dark:text-slate-300">{row.voiceRate}</td>
                    <td className="py-3 px-3 font-mono text-right text-slate-600 dark:text-slate-300">{row.openNopRate}</td>
                    <td className="py-3 px-3 font-mono text-right text-slate-600 dark:text-slate-300">{row.pilotAssistRate}</td>
                    <td className="py-3 px-3 font-mono text-right text-slate-600 dark:text-slate-300">{row.nopTrafficLightRate}</td>
                    <td className="py-3 px-3 font-mono text-right text-slate-600 dark:text-slate-300">{row.nopTurnRate}</td>
                    <td className="py-3 px-3 font-mono text-right text-slate-600 dark:text-slate-300">{row.nopPedestrianRate}</td>
                    <td className="py-3 px-3 font-mono text-right text-slate-600 dark:text-slate-300">{row.traceReverseRate}</td>
                    <td className="py-3 px-3 font-mono text-right text-slate-600 dark:text-slate-300">{row.rampMergeRate}</td>
                    <td className="py-3 px-3 font-mono text-right text-slate-600 dark:text-slate-300">{row.efficientPassRate}</td>
                    <td className="py-3 px-3.5 font-mono text-right font-black text-teal-700 dark:text-teal-300 bg-teal-50/70 dark:bg-teal-950/40 border-x border-teal-200 dark:border-teal-800/60">
                      {row.driveOverallRate}
                    </td>
                    <td className="py-3 px-3 font-mono text-right text-slate-600 dark:text-slate-300">{row.powerRate}</td>
                    <td className="py-3 px-3 font-mono text-right text-slate-600 dark:text-slate-300">{row.chassisRate}</td>
                    <td className="py-3 px-3 font-mono text-right text-slate-600 dark:text-slate-300">{row.parkingRate}</td>
                    <td className="py-3 px-3 font-mono text-right text-slate-600 dark:text-slate-300">{row.phevSystemRate}</td>
                    <td className="py-3 px-3 font-mono text-right text-slate-600 dark:text-slate-300">{row.rtdPreviewRate}</td>
                    <td className="py-3 px-3 font-mono text-right text-slate-600 dark:text-slate-300">{row.hummingbirdChassisRate}</td>
                    <td className="py-3 px-3 font-mono text-right text-slate-600 dark:text-slate-300">{row.cityNopRate}</td>
                    <td className="py-3 px-3 font-mono text-right text-slate-600 dark:text-slate-300">{row.remoteParkingRate}</td>
                    <td className="py-3 px-3 font-mono text-right text-slate-600 dark:text-slate-300">{row.autoParkingRate}</td>
                    <td className="py-3 px-3 font-mono text-right text-slate-600 dark:text-slate-300">{row.sentryModeRate}</td>
                  </tr>
                ))}

                {/* 4. Store Level View (门店明细) */}
                {detailLevel === 'store' && filteredData.map((row) => (
                  <tr 
                    key={row.id} 
                    className="hover:bg-slate-50/80 dark:hover:bg-slate-700/40 transition-colors"
                  >
                    {/* Basic Info (1-7) */}
                    <td className="py-3 px-3 text-center font-medium text-slate-600 dark:text-slate-300 sticky left-0 z-10 bg-white dark:bg-slate-800 shadow-2xs">
                      {row.region}
                    </td>
                    <td className="py-3 px-3 font-mono text-slate-500">{row.mac}</td>
                    <td className="py-3 px-3 font-mono text-slate-500">{row.dealerCode}</td>
                    <td className="py-3 px-3 font-bold text-blue-600 dark:text-blue-400 hover:underline cursor-pointer">
                      {row.dealerName}
                    </td>
                    <td className="py-3 px-3 font-medium text-slate-600 dark:text-slate-300">{row.carModel}</td>
                    <td className="py-3 px-3 font-mono text-right font-bold text-slate-800 dark:text-slate-100">
                      {row.testDriveCount}
                    </td>
                    <td className="py-3 px-3 font-mono text-right font-bold text-rose-600 dark:text-rose-400 bg-rose-50/40 dark:bg-rose-950/20">
                      {row.overallRate}
                    </td>

                    {/* Level 1: 客户试乘总执行率 (Cell highlighted with indigo tint & bold) */}
                    <td className="py-3 px-3.5 font-mono text-right font-black text-indigo-700 dark:text-indigo-300 bg-indigo-50/70 dark:bg-indigo-950/40 border-x border-indigo-200 dark:border-indigo-800/60">
                      {row.rideOverallRate}
                    </td>

                    {/* Level 2 Sub-items for 客户试乘 (9-19) */}
                    <td className="py-3 px-3 font-mono text-right text-slate-600 dark:text-slate-300">{row.momentaR7Rate}</td>
                    <td className="py-3 px-3 font-mono text-right text-slate-600 dark:text-slate-300">{row.smartDriveHwRate}</td>
                    <td className="py-3 px-3 font-mono text-right text-slate-600 dark:text-slate-300">{row.voiceRate}</td>
                    <td className="py-3 px-3 font-mono text-right text-slate-600 dark:text-slate-300">{row.openNopRate}</td>
                    <td className="py-3 px-3 font-mono text-right text-slate-600 dark:text-slate-300">{row.pilotAssistRate}</td>
                    <td className="py-3 px-3 font-mono text-right text-slate-600 dark:text-slate-300">{row.nopTrafficLightRate}</td>
                    <td className="py-3 px-3 font-mono text-right text-slate-600 dark:text-slate-300">{row.nopTurnRate}</td>
                    <td className="py-3 px-3 font-mono text-right text-slate-600 dark:text-slate-300">{row.nopPedestrianRate}</td>
                    <td className="py-3 px-3 font-mono text-right text-slate-600 dark:text-slate-300">{row.traceReverseRate}</td>
                    <td className="py-3 px-3 font-mono text-right text-slate-600 dark:text-slate-300">{row.rampMergeRate}</td>
                    <td className="py-3 px-3 font-mono text-right text-slate-600 dark:text-slate-300">{row.efficientPassRate}</td>

                    {/* Level 1: 客户试驾总执行率 (Cell highlighted with teal tint & bold) */}
                    <td className="py-3 px-3.5 font-mono text-right font-black text-teal-700 dark:text-teal-300 bg-teal-50/70 dark:bg-teal-950/40 border-x border-teal-200 dark:border-teal-800/60">
                      {row.driveOverallRate}
                    </td>

                    {/* Level 2 Sub-items for 客户试驾 (21-30) */}
                    <td className="py-3 px-3 font-mono text-right text-slate-600 dark:text-slate-300">{row.powerRate}</td>
                    <td className="py-3 px-3 font-mono text-right text-slate-600 dark:text-slate-300">{row.chassisRate}</td>
                    <td className="py-3 px-3 font-mono text-right text-slate-600 dark:text-slate-300">{row.parkingRate}</td>
                    <td className="py-3 px-3 font-mono text-right text-slate-600 dark:text-slate-300">{row.phevSystemRate}</td>
                    <td className="py-3 px-3 font-mono text-right text-slate-600 dark:text-slate-300">{row.rtdPreviewRate}</td>
                    <td className="py-3 px-3 font-mono text-right text-slate-600 dark:text-slate-300">{row.hummingbirdChassisRate}</td>
                    <td className="py-3 px-3 font-mono text-right text-slate-600 dark:text-slate-300">{row.cityNopRate}</td>
                    <td className="py-3 px-3 font-mono text-right text-slate-600 dark:text-slate-300">{row.remoteParkingRate}</td>
                    <td className="py-3 px-3 font-mono text-right text-slate-600 dark:text-slate-300">{row.autoParkingRate}</td>
                    <td className="py-3 px-3 font-mono text-right text-slate-600 dark:text-slate-300">{row.sentryModeRate}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-slate-700 dark:bg-slate-900 text-white font-medium">
                  <th className="py-3 px-4 font-semibold text-center border-r border-slate-600/50 w-14">序号</th>
                  <th className="py-3 px-4 font-semibold border-r border-slate-600/50">经销商名称</th>
                  <th className="py-3 px-4 font-semibold border-r border-slate-600/50">所属大区</th>
                  <th className="py-3 px-4 font-semibold border-r border-slate-600/50">所属小区</th>
                  <th className="py-3 px-4 font-semibold border-r border-slate-600/50 text-right">试乘试驾工牌数</th>
                  <th className="py-3 px-4 font-semibold border-r border-slate-600/50 text-right">日均正常使用数</th>
                  <th className="py-3 px-4 font-semibold border-r border-slate-600/50 text-right">总开启时长(小时)</th>
                  <th className="py-3 px-4 font-semibold border-r border-slate-600/50 text-right">平均开启时长(小时/天)</th>
                  <th className="py-3 px-4 font-semibold text-right text-rose-300 bg-rose-950/40">
                    日均未达标使用数 ↓
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-700/60 text-slate-700 dark:text-slate-200">
                {filteredBadgeData.map((row, idx) => (
                  <tr 
                    key={row.id} 
                    className="hover:bg-slate-50/80 dark:hover:bg-slate-700/40 transition-colors"
                  >
                    <td className="py-3.5 px-4 text-center font-mono text-slate-400">{idx + 1}</td>
                    <td className="py-3.5 px-4 font-bold text-blue-600 dark:text-blue-400 hover:underline cursor-pointer">{row.name}</td>
                    <td className="py-3.5 px-4 text-slate-600 dark:text-slate-300">{row.regionName || '一区'}</td>
                    <td className="py-3.5 px-4 text-slate-600 dark:text-slate-300">{row.subRegionName || '华东一小区'}</td>
                    <td className="py-3.5 px-4 font-mono text-right">{row.badgeCount}</td>
                    <td className="py-3.5 px-4 font-mono text-right">{row.dailyAvgUses}</td>
                    <td className="py-3.5 px-4 font-mono text-right">{row.totalActiveHours.toFixed(1)}</td>
                    <td className="py-3.5 px-4 font-mono text-right">{row.avgActiveHours.toFixed(1)}</td>
                    <td className="py-3.5 px-4 font-mono font-bold text-right text-rose-600 dark:text-rose-400 bg-rose-50/60 dark:bg-rose-950/30">
                      {row.substandardUses}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        {/* Table Pagination Bar */}
        <div className="px-5 py-3 border-t border-slate-100 dark:border-slate-700/80 flex items-center justify-end gap-6 text-xs text-slate-500 dark:text-slate-400">
          <div>
            总共有 <span className="font-bold text-slate-700 dark:text-slate-200">
              {activeTab === 'testDrive' 
                ? (detailLevel === 'national' 
                    ? filteredNationalData.length 
                    : detailLevel === 'region' 
                    ? filteredRegionData.length 
                    : detailLevel === 'subregion' 
                    ? filteredSubRegionData.length 
                    : filteredData.length)
                : filteredBadgeData.length}
            </span> 条数据
          </div>

          <div className="flex items-center gap-1">
            <button className="p-1 rounded hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-400 disabled:opacity-40 cursor-pointer" disabled>
              <ChevronLeft size={14} />
            </button>
            <span className="w-6 h-6 flex items-center justify-center bg-blue-600 text-white font-bold rounded text-xs">
              1
            </span>
            <button className="p-1 rounded hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-400 disabled:opacity-40 cursor-pointer" disabled>
              <ChevronRight size={14} />
            </button>
          </div>

          <div className="relative">
            <select
              value={pageSize}
              onChange={(e) => setPageSize(Number(e.target.value))}
              className="appearance-none bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 text-xs rounded px-2.5 py-1 pr-6 focus:outline-none cursor-pointer"
            >
              <option value={10}>10 条/页</option>
              <option value={20}>20 条/页</option>
              <option value={50}>50 条/页</option>
            </select>
            <ChevronDown size={12} className="absolute right-1.5 top-2 text-slate-400 pointer-events-none" />
          </div>
        </div>

      </div>

    </div>
  );
};

export default CadillacTestDriveReport;
