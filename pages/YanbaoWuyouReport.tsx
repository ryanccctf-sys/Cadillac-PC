import React, { useState } from 'react';
import { QcPanoramaDetailModal } from '../components/QcPanoramaDetailModal';
import { 
  Calendar, 
  Search, 
  RotateCcw, 
  HelpCircle, 
  ChevronDown,
  ChevronUp,
  Users, 
  Mic, 
  Clock, 
  BarChart2, 
  Award, 
  Activity, 
  AlertTriangle, 
  Download, 
  CheckCircle2, 
  XCircle,
  FileText,
  UserCheck,
  Filter,
  Building2,
  Layers,
  Sparkles,
  Check,
  X,
  Volume2
} from 'lucide-react';

// ----------------- TYPES -----------------
export interface QCSubItem {
  id: string;
  name: string;
  rate: string;
  rateNum: number;
  passedCount: number;
  totalCount: number;
  isCompliance?: boolean;
}

export interface QCCategory {
  id: string;
  name: string;
  code: string;
  rate: string;
  rateNum: number;
  passedCount: number;
  totalCount: number;
  badge: string;
  isCompliance?: boolean;
  subItems: QCSubItem[];
}

interface StoreSummaryRow {
  id: number;
  storeName: string;
  storeCode: string;
  qcRecordCount: number;
  avgDurationMins: number;
  overallExecutionRate: string;
  
  // 1. 服务与信任建立（一级）
  trustRate: string;
  trustSub1: string; // 身份及服务内容介绍
  trustSub2: string; // 新车使用注意事项
  trustSub3: string; // 保养周期与质保期检查

  // 2. 延保需求建立（一级）
  demandRate: string;
  demandSub1: string; // 车龄老化磨损风险
  demandSub2: string; // 核心部件维修成本
  demandSub3: string; // 原厂质保边界

  // 3. 延保方案讲解（一级）
  planRate: string;
  planSub1: string; // 延保产品导入
  planSub2: string; // 延保保障范围与费用
  planSub3: string; // 用车年限与方案匹配

  // 4. 异议处理与成交（一级）
  objectionRate: string;
  objSub1: string; // 费用异议处理
  objSub2: string; // 换车异议处理
  objSub3: string; // 延保方案价值强化
  objSub4: string; // 方案确认
  objSub5: string; // 成交促成
  objSub6: string; // 逼单动作

  // 5. 合规风险（一级）
  complianceRate: string;
  compSub1: string; // 保养免费过度承诺
  compSub2: string; // 保障范围过度承诺
}

interface ReceptionDetailRow {
  id: number;
  empName: string;
  storeName: string;
  startTime: string;
  endTime: string;
  durationMins: number;
  isDeal: boolean; // 是否成交 (值为是或否)
  overallExecutionRate: string;

  // 1. 服务与信任建立（一级）
  trustRate: string;
  trustSub1Hit: boolean; // 身份及服务内容介绍
  trustSub2Hit: boolean; // 新车使用注意事项
  trustSub3Hit: boolean; // 保养周期与质保期检查

  // 2. 延保需求建立（一级）
  demandRate: string;
  demandSub1Hit: boolean; // 车龄老化磨损风险
  demandSub2Hit: boolean; // 核心部件维修成本
  demandSub3Hit: boolean; // 原厂质保边界

  // 3. 延保方案讲解（一级）
  planRate: string;
  planSub1Hit: boolean; // 延保产品导入
  planSub2Hit: boolean; // 延保保障范围与费用
  planSub3Hit: boolean; // 用车年限与方案匹配

  // 4. 异议处理与成交（一级）
  objectionRate: string;
  objSub1Hit: boolean; // 费用异议处理
  objSub2Hit: boolean; // 换车异议处理
  objSub3Hit: boolean; // 延保方案价值强化
  objSub4Hit: boolean; // 方案确认
  objSub5Hit: boolean; // 成交促成
  objSub6Hit: boolean; // 逼单动作

  // 5. 合规风险（一级）
  complianceRate: string;
  compSub1Hit: boolean; // 保养免费过度承诺
  compSub2Hit: boolean; // 保障范围过度承诺
}

// ----------------- 2-LEVEL QUALITY CHECK HIERARCHY DATA -----------------
const MOCK_QC_CATEGORIES: QCCategory[] = [
  {
    id: 'trust',
    name: '服务与信任建立',
    code: 'QC-01',
    rate: '91.17%',
    rateNum: 91.17,
    passedCount: 858,
    totalCount: 941,
    badge: '3项质检',
    subItems: [
      { id: 'trust-1', name: '身份及服务内容介绍', rate: '93.84%', rateNum: 93.84, passedCount: 883, totalCount: 941 },
      { id: 'trust-2', name: '新车使用注意事项', rate: '91.18%', rateNum: 91.18, passedCount: 858, totalCount: 941 },
      { id: 'trust-3', name: '保养周期与质保期检查', rate: '88.52%', rateNum: 88.52, passedCount: 833, totalCount: 941 },
    ]
  },
  {
    id: 'demand',
    name: '延保需求建立',
    code: 'QC-02',
    rate: '81.40%',
    rateNum: 81.40,
    passedCount: 766,
    totalCount: 941,
    badge: '3项质检',
    subItems: [
      { id: 'demand-1', name: '车龄老化磨损风险', rate: '84.59%', rateNum: 84.59, passedCount: 796, totalCount: 941 },
      { id: 'demand-2', name: '核心部件维修成本', rate: '81.40%', rateNum: 81.40, passedCount: 766, totalCount: 941 },
      { id: 'demand-3', name: '原厂质保边界', rate: '78.21%', rateNum: 78.21, passedCount: 736, totalCount: 941 },
    ]
  },
  {
    id: 'plan',
    name: '延保方案讲解',
    code: 'QC-03',
    rate: '81.19%',
    rateNum: 81.19,
    passedCount: 764,
    totalCount: 941,
    badge: '3项质检',
    subItems: [
      { id: 'plan-1', name: '延保产品导入', rate: '86.50%', rateNum: 86.50, passedCount: 814, totalCount: 941 },
      { id: 'plan-2', name: '延保保障范围与费用', rate: '80.23%', rateNum: 80.23, passedCount: 755, totalCount: 941 },
      { id: 'plan-3', name: '用车年限与方案匹配', rate: '76.83%', rateNum: 76.83, passedCount: 723, totalCount: 941 },
    ]
  },
  {
    id: 'objection',
    name: '异议处理与成交',
    code: 'QC-04',
    rate: '73.18%',
    rateNum: 73.18,
    passedCount: 689,
    totalCount: 941,
    badge: '6项质检',
    subItems: [
      { id: 'obj-1', name: '费用异议处理', rate: '74.49%', rateNum: 74.49, passedCount: 701, totalCount: 941 },
      { id: 'obj-2', name: '换车异议处理', rate: '72.58%', rateNum: 72.58, passedCount: 683, totalCount: 941 },
      { id: 'obj-3', name: '延保方案价值强化', rate: '77.79%', rateNum: 77.79, passedCount: 732, totalCount: 941 },
      { id: 'obj-4', name: '方案确认', rate: '75.45%', rateNum: 75.45, passedCount: 710, totalCount: 941 },
      { id: 'obj-5', name: '成交促成', rate: '70.24%', rateNum: 70.24, passedCount: 661, totalCount: 941 },
      { id: 'obj-6', name: '逼单动作', rate: '68.54%', rateNum: 68.54, passedCount: 645, totalCount: 941 },
    ]
  },
  {
    id: 'compliance',
    name: '合规风险',
    code: 'QC-05',
    rate: '98.19%',
    rateNum: 98.19,
    passedCount: 924,
    totalCount: 941,
    badge: '2项质检',
    isCompliance: true,
    subItems: [
      { id: 'comp-1', name: '保养免费过度承诺', rate: '98.83%', rateNum: 98.83, passedCount: 930, totalCount: 941, isCompliance: true },
      { id: 'comp-2', name: '保障范围过度承诺', rate: '97.56%', rateNum: 97.56, passedCount: 918, totalCount: 941, isCompliance: true },
    ]
  }
];

// ----------------- STORE DIMENSION SUMMARY MOCK DATA (汇总聚合) -----------------
const MOCK_SALES_STORE_SUMMARIES: StoreSummaryRow[] = [
  {
    id: 1,
    storeName: '苏州宝马',
    storeCode: 'STORE-SZ-01',
    qcRecordCount: 185,
    avgDurationMins: 26.2,
    overallExecutionRate: '88.50%',
    trustRate: '95.20%',
    trustSub1: '97.30%',
    trustSub2: '95.10%',
    trustSub3: '93.20%',
    demandRate: '86.40%',
    demandSub1: '89.20%',
    demandSub2: '86.50%',
    demandSub3: '83.50%',
    planRate: '85.80%',
    planSub1: '90.20%',
    planSub2: '84.80%',
    planSub3: '82.40%',
    objectionRate: '78.60%',
    objSub1: '80.00%',
    objSub2: '77.80%',
    objSub3: '82.20%',
    objSub4: '79.50%',
    objSub5: '76.80%',
    objSub6: '75.30%',
    complianceRate: '99.40%',
    compSub1: '99.50%',
    compSub2: '99.30%'
  },
  {
    id: 2,
    storeName: '南京宝马',
    storeCode: 'STORE-NJ-01',
    qcRecordCount: 168,
    avgDurationMins: 26.5,
    overallExecutionRate: '85.30%',
    trustRate: '92.50%',
    trustSub1: '95.20%',
    trustSub2: '92.30%',
    trustSub3: '90.00%',
    demandRate: '83.20%',
    demandSub1: '86.30%',
    demandSub2: '83.00%',
    demandSub3: '80.30%',
    planRate: '82.50%',
    planSub1: '88.00%',
    planSub2: '81.50%',
    planSub3: '78.00%',
    objectionRate: '74.20%',
    objSub1: '75.60%',
    objSub2: '73.80%',
    objSub3: '78.50%',
    objSub4: '76.20%',
    objSub5: '71.00%',
    objSub6: '70.10%',
    complianceRate: '98.80%',
    compSub1: '99.20%',
    compSub2: '98.40%'
  },
  {
    id: 3,
    storeName: '杭州元通奥迪',
    storeCode: 'STORE-HZ-02',
    qcRecordCount: 142,
    avgDurationMins: 26.1,
    overallExecutionRate: '82.60%',
    trustRate: '90.80%',
    trustSub1: '93.50%',
    trustSub2: '90.80%',
    trustSub3: '88.10%',
    demandRate: '79.50%',
    demandSub1: '83.00%',
    demandSub2: '79.60%',
    demandSub3: '75.90%',
    planRate: '79.20%',
    planSub1: '84.50%',
    planSub2: '78.30%',
    planSub3: '74.80%',
    objectionRate: '70.80%',
    objSub1: '72.00%',
    objSub2: '70.50%',
    objSub3: '75.20%',
    objSub4: '73.00%',
    objSub5: '67.50%',
    objSub6: '66.60%',
    complianceRate: '98.20%',
    compSub1: '98.80%',
    compSub2: '97.60%'
  },
  {
    id: 4,
    storeName: '湖州宝马',
    storeCode: 'STORE-HZ-01',
    qcRecordCount: 130,
    avgDurationMins: 26.4,
    overallExecutionRate: '86.10%',
    trustRate: '93.40%',
    trustSub1: '96.00%',
    trustSub2: '93.20%',
    trustSub3: '91.00%',
    demandRate: '84.50%',
    demandSub1: '87.50%',
    demandSub2: '84.60%',
    demandSub3: '81.40%',
    planRate: '83.80%',
    planSub1: '89.00%',
    planSub2: '83.00%',
    planSub3: '79.40%',
    objectionRate: '75.50%',
    objSub1: '76.80%',
    objSub2: '74.90%',
    objSub3: '80.00%',
    objSub4: '77.80%',
    objSub5: '72.30%',
    objSub6: '71.20%',
    complianceRate: '99.00%',
    compSub1: '99.40%',
    compSub2: '98.60%'
  },
  {
    id: 5,
    storeName: '常熟奥迪',
    storeCode: 'STORE-CS-01',
    qcRecordCount: 115,
    avgDurationMins: 26.3,
    overallExecutionRate: '79.80%',
    trustRate: '88.50%',
    trustSub1: '91.20%',
    trustSub2: '88.50%',
    trustSub3: '85.80%',
    demandRate: '76.20%',
    demandSub1: '79.80%',
    demandSub2: '76.00%',
    demandSub3: '72.80%',
    planRate: '76.50%',
    planSub1: '81.50%',
    planSub2: '75.60%',
    planSub3: '72.40%',
    objectionRate: '67.40%',
    objSub1: '69.00%',
    objSub2: '67.20%',
    objSub3: '71.80%',
    objSub4: '69.50%',
    objSub5: '64.20%',
    objSub6: '62.70%',
    complianceRate: '97.60%',
    compSub1: '98.20%',
    compSub2: '97.00%'
  },
  {
    id: 6,
    storeName: '张家港奥迪',
    storeCode: 'STORE-ZJG-01',
    qcRecordCount: 108,
    avgDurationMins: 26.2,
    overallExecutionRate: '77.40%',
    trustRate: '86.20%',
    trustSub1: '89.50%',
    trustSub2: '86.20%',
    trustSub3: '82.90%',
    demandRate: '73.80%',
    demandSub1: '77.20%',
    demandSub2: '73.90%',
    demandSub3: '70.30%',
    planRate: '74.20%',
    planSub1: '79.20%',
    planSub2: '73.40%',
    planSub3: '70.00%',
    objectionRate: '65.00%',
    objSub1: '66.50%',
    objSub2: '64.80%',
    objSub3: '69.20%',
    objSub4: '67.00%',
    objSub5: '61.80%',
    objSub6: '60.70%',
    complianceRate: '97.00%',
    compSub1: '97.80%',
    compSub2: '96.20%'
  },
  {
    id: 7,
    storeName: '湖州奥迪',
    storeCode: 'STORE-HZA-01',
    qcRecordCount: 93,
    avgDurationMins: 26.0,
    overallExecutionRate: '80.50%',
    trustRate: '89.20%',
    trustSub1: '92.00%',
    trustSub2: '89.20%',
    trustSub3: '86.40%',
    demandRate: '77.40%',
    demandSub1: '81.00%',
    demandSub2: '77.50%',
    demandSub3: '73.70%',
    planRate: '77.80%',
    planSub1: '83.00%',
    planSub2: '77.00%',
    planSub3: '73.40%',
    objectionRate: '68.50%',
    objSub1: '70.00%',
    objSub2: '68.20%',
    objSub3: '73.00%',
    objSub4: '70.60%',
    objSub5: '65.00%',
    objSub6: '64.20%',
    complianceRate: '98.00%',
    compSub1: '98.60%',
    compSub2: '97.40%'
  }
];

// ----------------- MOCK DATA FOR RECEPTION DETAILS (接待明细) -----------------
const MOCK_RECEPTION_DETAILS: ReceptionDetailRow[] = [
  {
    id: 1, empName: '张伟', storeName: '苏州宝马', startTime: '2026-08-12 15:30', endTime: '2026-08-12 15:58', durationMins: 28, isDeal: true, overallExecutionRate: '100%',
    trustRate: '100%', trustSub1Hit: true, trustSub2Hit: true, trustSub3Hit: true,
    demandRate: '100%', demandSub1Hit: true, demandSub2Hit: true, demandSub3Hit: true,
    planRate: '100%', planSub1Hit: true, planSub2Hit: true, planSub3Hit: true,
    objectionRate: '100%', objSub1Hit: true, objSub2Hit: true, objSub3Hit: true, objSub4Hit: true, objSub5Hit: true, objSub6Hit: true,
    complianceRate: '100%', compSub1Hit: true, compSub2Hit: true
  },
  {
    id: 2, empName: '李娜', storeName: '苏州宝马', startTime: '2026-08-12 14:15', endTime: '2026-08-12 14:40', durationMins: 25, isDeal: true, overallExecutionRate: '88.2%',
    trustRate: '100%', trustSub1Hit: true, trustSub2Hit: true, trustSub3Hit: true,
    demandRate: '100%', demandSub1Hit: true, demandSub2Hit: true, demandSub3Hit: true,
    planRate: '100%', planSub1Hit: true, planSub2Hit: true, planSub3Hit: true,
    objectionRate: '66.7%', objSub1Hit: true, objSub2Hit: true, objSub3Hit: true, objSub4Hit: true, objSub5Hit: false, objSub6Hit: false,
    complianceRate: '100%', compSub1Hit: true, compSub2Hit: true
  },
  {
    id: 3, empName: '赵敏', storeName: '南京宝马', startTime: '2026-08-12 11:20', endTime: '2026-08-12 11:52', durationMins: 32, isDeal: true, overallExecutionRate: '94.1%',
    trustRate: '100%', trustSub1Hit: true, trustSub2Hit: true, trustSub3Hit: true,
    demandRate: '100%', demandSub1Hit: true, demandSub2Hit: true, demandSub3Hit: true,
    planRate: '100%', planSub1Hit: true, planSub2Hit: true, planSub3Hit: true,
    objectionRate: '83.3%', objSub1Hit: true, objSub2Hit: true, objSub3Hit: true, objSub4Hit: true, objSub5Hit: true, objSub6Hit: false,
    complianceRate: '100%', compSub1Hit: true, compSub2Hit: true
  },
  {
    id: 4, empName: '王强', storeName: '南京宝马', startTime: '2026-08-12 10:05', endTime: '2026-08-12 10:27', durationMins: 22, isDeal: false, overallExecutionRate: '58.8%',
    trustRate: '66.7%', trustSub1Hit: true, trustSub2Hit: true, trustSub3Hit: false,
    demandRate: '66.7%', demandSub1Hit: true, demandSub2Hit: false, demandSub3Hit: true,
    planRate: '66.7%', planSub1Hit: true, planSub2Hit: true, planSub3Hit: false,
    objectionRate: '50.0%', objSub1Hit: true, objSub2Hit: false, objSub3Hit: true, objSub4Hit: false, objSub5Hit: true, objSub6Hit: false,
    complianceRate: '100%', compSub1Hit: true, compSub2Hit: true
  },
  {
    id: 5, empName: '陈杰', storeName: '杭州元通奥迪', startTime: '2026-08-11 16:40', endTime: '2026-08-11 17:04', durationMins: 24, isDeal: false, overallExecutionRate: '64.7%',
    trustRate: '66.7%', trustSub1Hit: true, trustSub2Hit: true, trustSub3Hit: false,
    demandRate: '66.7%', demandSub1Hit: true, demandSub2Hit: true, demandSub3Hit: false,
    planRate: '66.7%', planSub1Hit: true, planSub2Hit: false, planSub3Hit: true,
    objectionRate: '50.0%', objSub1Hit: true, objSub2Hit: true, objSub3Hit: false, objSub4Hit: false, objSub5Hit: true, objSub6Hit: false,
    complianceRate: '100%', compSub1Hit: true, compSub2Hit: true
  },
  {
    id: 6, empName: '杨光', storeName: '湖州宝马', startTime: '2026-08-11 14:00', endTime: '2026-08-11 14:29', durationMins: 29, isDeal: true, overallExecutionRate: '100%',
    trustRate: '100%', trustSub1Hit: true, trustSub2Hit: true, trustSub3Hit: true,
    demandRate: '100%', demandSub1Hit: true, demandSub2Hit: true, demandSub3Hit: true,
    planRate: '100%', planSub1Hit: true, planSub2Hit: true, planSub3Hit: true,
    objectionRate: '100%', objSub1Hit: true, objSub2Hit: true, objSub3Hit: true, objSub4Hit: true, objSub5Hit: true, objSub6Hit: true,
    complianceRate: '100%', compSub1Hit: true, compSub2Hit: true
  },
  {
    id: 7, empName: '周婷', storeName: '常熟奥迪', startTime: '2026-08-11 11:10', endTime: '2026-08-11 11:36', durationMins: 26, isDeal: true, overallExecutionRate: '82.4%',
    trustRate: '100%', trustSub1Hit: true, trustSub2Hit: true, trustSub3Hit: true,
    demandRate: '100%', demandSub1Hit: true, demandSub2Hit: true, demandSub3Hit: true,
    planRate: '100%', planSub1Hit: true, planSub2Hit: true, planSub3Hit: true,
    objectionRate: '50.0%', objSub1Hit: true, objSub2Hit: true, objSub3Hit: false, objSub4Hit: false, objSub5Hit: true, objSub6Hit: false,
    complianceRate: '100%', compSub1Hit: true, compSub2Hit: true
  },
  {
    id: 8, empName: '徐磊', storeName: '张家港奥迪', startTime: '2026-08-11 09:30', endTime: '2026-08-11 09:51', durationMins: 21, isDeal: false, overallExecutionRate: '47.1%',
    trustRate: '66.7%', trustSub1Hit: true, trustSub2Hit: false, trustSub3Hit: true,
    demandRate: '33.3%', demandSub1Hit: false, demandSub2Hit: true, demandSub3Hit: false,
    planRate: '33.3%', planSub1Hit: true, planSub2Hit: false, planSub3Hit: false,
    objectionRate: '33.3%', objSub1Hit: true, objSub2Hit: false, objSub3Hit: false, objSub4Hit: false, objSub5Hit: true, objSub6Hit: false,
    complianceRate: '100%', compSub1Hit: true, compSub2Hit: true
  },
  {
    id: 9, empName: '孙凯', storeName: '湖州奥迪', startTime: '2026-08-10 15:10', endTime: '2026-08-10 15:40', durationMins: 30, isDeal: true, overallExecutionRate: '100%',
    trustRate: '100%', trustSub1Hit: true, trustSub2Hit: true, trustSub3Hit: true,
    demandRate: '100%', demandSub1Hit: true, demandSub2Hit: true, demandSub3Hit: true,
    planRate: '100%', planSub1Hit: true, planSub2Hit: true, planSub3Hit: true,
    objectionRate: '100%', objSub1Hit: true, objSub2Hit: true, objSub3Hit: true, objSub4Hit: true, objSub5Hit: true, objSub6Hit: true,
    complianceRate: '100%', compSub1Hit: true, compSub2Hit: true
  },
  {
    id: 10, empName: '刘洋', storeName: '苏州宝马', startTime: '2026-08-10 13:45', endTime: '2026-08-10 14:12', durationMins: 27, isDeal: true, overallExecutionRate: '94.1%',
    trustRate: '100%', trustSub1Hit: true, trustSub2Hit: true, trustSub3Hit: true,
    demandRate: '100%', demandSub1Hit: true, demandSub2Hit: true, demandSub3Hit: true,
    planRate: '100%', planSub1Hit: true, planSub2Hit: true, planSub3Hit: true,
    objectionRate: '83.3%', objSub1Hit: true, objSub2Hit: true, objSub3Hit: true, objSub4Hit: true, objSub5Hit: true, objSub6Hit: false,
    complianceRate: '100%', compSub1Hit: true, compSub2Hit: true
  }
];

const STORE_OPTIONS = [
  '全部门店',
  '苏州宝马',
  '南京宝马',
  '杭州元通奥迪',
  '湖州宝马',
  '常熟奥迪',
  '张家港奥迪',
  '湖州奥迪'
];

const YanbaoWuyouReport: React.FC = () => {
  // Main Business Tab state: 'sales' | 'delivery' | 'afterSales'
  const [activeTab, setActiveTab] = useState<'sales' | 'delivery' | 'afterSales'>('sales');

  // Detail table tab state: 'summary' (汇总聚合) | 'receptionDetail' (接待明细)
  const [detailTab, setDetailTab] = useState<'summary' | 'receptionDetail'>('summary');

  // Recording Panorama Detail Modal state
  const [panoramaRecord, setPanoramaRecord] = useState<{
    id?: string;
    customerName?: string;
    salesperson?: string;
    storeName?: string;
    time?: string;
    durationMins?: number;
    executionScore?: number;
    businessType?: string;
    carModel?: string;
  } | null>(null);

  // Date & Store Filter States
  const [startDate, setStartDate] = useState('2026-08-01');
  const [endDate, setEndDate] = useState('2026-08-13');
  const [selectedStore, setSelectedStore] = useState<string>('全部门店');
  const [searchKeyword, setSearchKeyword] = useState('');

  // Active selected Level 1 QC category for viewing sub-items (defaults to null)
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(null);

  const toggleCategory = (categoryId: string) => {
    setSelectedCategoryId(prev => (prev === categoryId ? null : categoryId));
  };

  const handleResetFilters = () => {
    setStartDate('2026-08-01');
    setEndDate('2026-08-13');
    setSelectedStore('全部门店');
    setSearchKeyword('');
  };

  // Get store summary records filtered by store selector and search keyword
  const getStoreSummaryData = (): StoreSummaryRow[] => {
    let list = MOCK_SALES_STORE_SUMMARIES;
    if (selectedStore !== '全部门店') {
      list = list.filter(s => s.storeName === selectedStore);
    }
    if (searchKeyword.trim()) {
      const kw = searchKeyword.trim().toLowerCase();
      list = list.filter(s => s.storeName.toLowerCase().includes(kw) || s.storeCode.toLowerCase().includes(kw));
    }
    return list;
  };

  // Get reception detail records filtered by store selector and search keyword
  const getReceptionDetailData = (): ReceptionDetailRow[] => {
    let list = MOCK_RECEPTION_DETAILS;
    if (selectedStore !== '全部门店') {
      list = list.filter(r => r.storeName === selectedStore);
    }
    if (searchKeyword.trim()) {
      const kw = searchKeyword.trim().toLowerCase();
      list = list.filter(r => r.empName.toLowerCase().includes(kw) || r.storeName.toLowerCase().includes(kw));
    }
    return list;
  };

  const filteredStoreSummaries = getStoreSummaryData();
  const filteredReceptions = getReceptionDetailData();

  // Selected tab overall metrics summaries for top KPI cards
  const getKPIValues = () => {
    if (activeTab === 'sales') {
      return {
        visitorCount: '945',
        recordCount: '941',
        avgDuration: '26.3',
        overallRate: '84.85%',
        complianceRate: '98.19%'
      };
    } else if (activeTab === 'delivery') {
      return {
        visitorCount: '811',
        recordCount: '808',
        avgDuration: '32.1',
        overallRate: '85.40%',
        complianceRate: '98.60%'
      };
    } else {
      return {
        visitorCount: '1,218',
        recordCount: '1,215',
        avgDuration: '18.8',
        overallRate: '78.20%',
        complianceRate: '97.50%'
      };
    }
  };

  const currentKPIs = getKPIValues();

  return (
    <div className="space-y-6 pb-12 animate-fade-in text-slate-800 dark:text-slate-100">

      {/* 1. Global Filter Bar - Date Range & Store & Reset */}
      <div className="bg-white dark:bg-slate-800 p-4 rounded-2xl border border-slate-200/80 dark:border-slate-700 shadow-2xs">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-3">
            
            {/* Date Range Inputs */}
            <div className="flex items-center gap-2 bg-slate-50 dark:bg-slate-900 px-3.5 py-2 rounded-xl border border-slate-200/80 dark:border-slate-700">
              <Calendar size={15} className="text-slate-400" />
              <span className="text-xs font-medium text-slate-500 dark:text-slate-400">时间段:</span>
              <input 
                type="date" 
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="bg-transparent text-xs text-slate-700 dark:text-slate-200 outline-none font-mono"
              />
              <span className="text-slate-400 text-xs">至</span>
              <input 
                type="date" 
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="bg-transparent text-xs text-slate-700 dark:text-slate-200 outline-none font-mono"
              />
            </div>

            {/* Store Selector */}
            <div className="flex items-center gap-2 bg-slate-50 dark:bg-slate-900 px-3.5 py-2 rounded-xl border border-slate-200/80 dark:border-slate-700">
              <Building2 size={15} className="text-slate-400" />
              <span className="text-xs font-medium text-slate-500 dark:text-slate-400">门店:</span>
              <select
                value={selectedStore}
                onChange={(e) => setSelectedStore(e.target.value)}
                className="bg-transparent text-xs text-slate-800 dark:text-slate-200 font-medium outline-none cursor-pointer pr-1"
              >
                {STORE_OPTIONS.map((store) => (
                  <option key={store} value={store} className="bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200">
                    {store}
                  </option>
                ))}
              </select>
            </div>

          </div>

          <button 
            onClick={handleResetFilters}
            className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-xl transition-colors cursor-pointer border border-slate-200/60 dark:border-slate-700"
          >
            <RotateCcw size={13} />
            重置筛选
          </button>
        </div>
      </div>

      {/* 2. Main Section Header: 工牌业务数据 */}
      <div className="space-y-4">
        <div>
          <h2 className="text-lg font-bold text-slate-900 dark:text-white tracking-tight">
            工牌业务数据
          </h2>
        </div>

        {/* 3. Top 4 KPI Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-1">
          
          {/* Card 1 (Hero Metric): 流程综合执行率 */}
          <div className="bg-gradient-to-br from-blue-50/80 via-white to-sky-50/40 dark:from-blue-950/40 dark:via-slate-800 dark:to-slate-800 p-4 rounded-2xl border-2 border-blue-500/40 dark:border-blue-500/40 shadow-xs flex items-center justify-between gap-3 relative overflow-hidden">
            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-2xl bg-blue-600 text-white flex items-center justify-center shrink-0 shadow-xs ring-4 ring-blue-500/10">
                <Award size={24} />
              </div>
              <div className="space-y-0.5 min-w-0">
                <div className="flex items-center gap-1.5 text-blue-900 dark:text-blue-200 text-xs font-semibold">
                  <span>流程综合执行率</span>
                  <HelpCircle size={13} className="text-blue-400 cursor-help" title="质检流程5大核心维度的加权综合达标执行率" />
                </div>
                <div className="text-2xl font-black text-blue-600 dark:text-blue-400 font-mono tracking-tight">
                  {currentKPIs.overallRate}
                </div>
              </div>
            </div>
          </div>

          {/* Card 2: 接待客流数 */}
          <div className="bg-white dark:bg-slate-800 p-4 rounded-2xl border border-slate-200/80 dark:border-slate-700 shadow-2xs flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-indigo-500 text-white flex items-center justify-center shrink-0 shadow-xs">
              <Users size={22} />
            </div>
            <div className="space-y-0.5 flex-1 min-w-0">
              <div className="flex items-center gap-1 text-slate-500 dark:text-slate-400 text-xs">
                <span>接待客流数</span>
                <HelpCircle size={13} className="text-slate-400 cursor-help" title="统计时间内工牌捕获的接待客流总量" />
              </div>
              <div className="text-2xl font-black text-slate-900 dark:text-white font-mono tracking-tight">
                {currentKPIs.visitorCount}
              </div>
            </div>
          </div>

          {/* Card 3: 业务录音数 */}
          <div className="bg-white dark:bg-slate-800 p-4 rounded-2xl border border-slate-200/80 dark:border-slate-700 shadow-2xs flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-orange-500 text-white flex items-center justify-center shrink-0 shadow-xs">
              <Mic size={22} />
            </div>
            <div className="space-y-0.5 flex-1 min-w-0">
              <div className="flex items-center gap-1 text-slate-500 dark:text-slate-400 text-xs">
                <span>接待录音数</span>
                <HelpCircle size={13} className="text-slate-400 cursor-help" title="通过工牌实时采集并上传成功的有效音频份数" />
              </div>
              <div className="text-2xl font-black text-slate-900 dark:text-white font-mono tracking-tight">
                {currentKPIs.recordCount}
              </div>
            </div>
          </div>

          {/* Card 4: 平均接待时长(分钟) */}
          <div className="bg-white dark:bg-slate-800 p-4 rounded-2xl border border-slate-200/80 dark:border-slate-700 shadow-2xs flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500 text-white flex items-center justify-center shrink-0 shadow-xs">
              <Clock size={22} />
            </div>
            <div className="space-y-0.5 flex-1 min-w-0">
              <div className="flex items-center gap-1 text-slate-500 dark:text-slate-400 text-xs">
                <span>平均接待时长(分钟)</span>
                <HelpCircle size={13} className="text-slate-400 cursor-help" title="单次接待环节的平均语音持续时长" />
              </div>
              <div className="text-2xl font-black text-slate-900 dark:text-white font-mono tracking-tight">
                {currentKPIs.avgDuration}
              </div>
            </div>
          </div>
        </div>

        {/* 4. Section: 质检流程执行率 - Two-Level Hierarchy Cards */}
        <div className="space-y-3 pt-2">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <Layers size={18} className="text-blue-600 dark:text-blue-400" />
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                质检项执行概览
              </h3>
              <span className="text-xs text-slate-400 font-normal">
                (支持点击一级卡片展开/收起查看二级质检结果)
              </span>
            </div>

            <div className="flex items-center gap-2 px-3.5 py-1.5 bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-800 rounded-xl">
              <Award size={15} className="text-blue-600 dark:text-blue-400" />
              <span className="text-xs text-slate-700 dark:text-slate-300 font-semibold">流程综合执行率:</span>
              <span className="font-extrabold font-mono text-blue-600 dark:text-blue-400 text-base">
                {currentKPIs.overallRate}
              </span>
            </div>
          </div>

          {/* Level 1 Category Cards Grid (5 Equal Columns, No Text Truncation) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {MOCK_QC_CATEGORIES.map((category) => {
              const isSelected = selectedCategoryId === category.id;

              return (
                <div
                  key={category.id}
                  onClick={() => toggleCategory(category.id)}
                  className={`rounded-2xl border transition-all duration-200 shadow-2xs flex flex-col justify-between overflow-hidden cursor-pointer select-none ${
                    isSelected 
                      ? 'bg-white dark:bg-slate-800 border-blue-500 dark:border-blue-500 ring-2 ring-blue-500/20 shadow-md' 
                      : 'bg-white dark:bg-slate-800 border-slate-200/80 dark:border-slate-700 hover:border-blue-300 dark:hover:border-slate-600 hover:shadow-xs'
                  }`}
                >
                  {/* Card Main Area (Level 1 Info) */}
                  <div className="p-4 space-y-3">
                    
                    {/* Header Row: Title & Badge (Full text without truncation) */}
                    <div className="flex items-start justify-between gap-2 min-h-[42px]">
                      <div className="flex items-start gap-1.5 flex-1">
                        <Sparkles size={15} className={`mt-0.5 shrink-0 ${isSelected ? 'text-blue-600 dark:text-blue-400' : 'text-blue-500'}`} />
                        <h4 className="text-sm font-bold text-slate-900 dark:text-white leading-snug break-words">
                          {category.name}
                        </h4>
                      </div>
                      <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-md shrink-0 whitespace-nowrap border ${
                        isSelected
                          ? 'bg-blue-100/70 dark:bg-blue-900/60 text-blue-700 dark:text-blue-300 border-blue-300 dark:border-blue-700'
                          : 'bg-sky-50 dark:bg-sky-950/50 text-blue-600 dark:text-blue-400 border-sky-200/60 dark:border-blue-800/60'
                      }`}>
                        {category.badge}
                      </span>
                    </div>

                    {/* Rate & Metric */}
                    <div className="pt-1">
                      <span className="text-[11px] text-slate-400 block mb-0.5">
                        一级执行率
                      </span>
                      <div className="text-2xl font-black font-mono tracking-tight text-blue-600 dark:text-blue-400">
                        {category.rate}
                      </div>
                    </div>

                    {/* Progress Bar */}
                    <div className="w-full bg-slate-100 dark:bg-slate-700 rounded-full h-1.5 overflow-hidden">
                      <div 
                        className="h-full rounded-full transition-all duration-300 bg-blue-500"
                        style={{ width: `${category.rateNum}%` }}
                      />
                    </div>
                  </div>

                  {/* Card Bottom Indicator Bar */}
                  <div
                    className={`w-full px-4 py-2 text-xs font-semibold flex items-center justify-between transition-colors border-t ${
                      isSelected 
                        ? 'bg-blue-50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400 border-blue-100 dark:border-blue-900/50' 
                        : 'bg-slate-50/70 dark:bg-slate-900/40 text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 border-slate-100 dark:border-slate-700/60'
                    }`}
                  >
                    <span>{isSelected ? '已查看二级明细' : '查看二级明细'}</span>
                    {isSelected ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Level 2 Dedicated Sub-Items Panel (Full-Width, rendered below all 5 cards) */}
          {selectedCategoryId && (() => {
            const activeCategory = MOCK_QC_CATEGORIES.find(c => c.id === selectedCategoryId);
            if (!activeCategory) return null;

            return (
              <div className="p-4 bg-slate-50/90 dark:bg-slate-900/70 rounded-2xl border border-blue-200/80 dark:border-blue-900/50 shadow-xs space-y-3.5 animate-fade-in">
                {/* Subpanel Header */}
                <div className="flex items-center justify-between border-b border-slate-200/70 dark:border-slate-800 pb-3">
                  <div className="flex items-center gap-2">
                    <Layers size={16} className="text-blue-600 dark:text-blue-400" />
                    <span className="text-sm font-bold text-slate-900 dark:text-white">
                      【{activeCategory.name}】二级质检明细
                    </span>
                    <span className="text-xs text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/60 px-2 py-0.5 rounded-md border border-blue-200/60 dark:border-blue-800 font-medium">
                      共 {activeCategory.subItems.length} 项质检点
                    </span>
                    <span className="text-xs text-slate-400 font-mono hidden sm:inline">
                      (一级执行率: {activeCategory.rate})
                    </span>
                  </div>

                  <button
                    onClick={() => setSelectedCategoryId(null)}
                    className="flex items-center gap-1 px-2.5 py-1 text-xs font-semibold text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-white bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 border border-slate-200/80 dark:border-slate-700 rounded-lg transition-colors cursor-pointer shadow-2xs"
                  >
                    <X size={13} />
                    <span>收起明细</span>
                  </button>
                </div>

                {/* Sub-Items Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                  {activeCategory.subItems.map((sub, idx) => (
                    <div 
                      key={sub.id}
                      className="bg-white dark:bg-slate-800 p-3.5 rounded-xl border border-slate-200/70 dark:border-slate-700/80 shadow-2xs space-y-2 hover:border-blue-200 dark:hover:border-blue-900/60 transition-colors"
                    >
                      <div className="flex items-center justify-between gap-2">
                        <div className="flex items-center gap-2 flex-1 min-w-0">
                          <span className="flex items-center justify-center w-5 h-5 rounded-full bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 font-mono text-[11px] font-bold shrink-0">
                            {idx + 1}
                          </span>
                          <span className="text-xs font-medium text-slate-800 dark:text-slate-200 break-words leading-tight" title={sub.name}>
                            {sub.name}
                          </span>
                        </div>
                        <span className="text-xs font-bold font-mono shrink-0 text-blue-600 dark:text-blue-400">
                          {sub.rate}
                        </span>
                      </div>

                      {/* Sub-item Progress Mini Bar */}
                      <div className="w-full bg-slate-100 dark:bg-slate-700 rounded-full h-1.5 overflow-hidden">
                        <div 
                          className="h-full rounded-full bg-blue-500 transition-all duration-300"
                          style={{ width: `${sub.rateNum}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })()}
        </div>
      </div>

      {/* 5. Detail Table Section - 2 Tabs: 汇总聚合 & 接待明细 */}
      <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200/80 dark:border-slate-700 shadow-2xs overflow-hidden">
        
        {/* Table Top Controls Bar */}
        <div className="p-4 border-b border-slate-100 dark:border-slate-700/80 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <BarChart2 size={18} className="text-blue-600 dark:text-blue-400" />
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">
              数据明细
            </h3>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {/* 2 Tabs: 汇总聚合 | 接待明细 */}
            <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-900 p-1 rounded-xl">
              <button
                onClick={() => setDetailTab('summary')}
                className={`flex items-center gap-1.5 px-4 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                  detailTab === 'summary'
                    ? 'bg-blue-600 text-white shadow-2xs font-bold'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
                }`}
              >
                <UserCheck size={14} />
                <span>汇总聚合</span>
              </button>
              <button
                onClick={() => setDetailTab('receptionDetail')}
                className={`flex items-center gap-1.5 px-4 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                  detailTab === 'receptionDetail'
                    ? 'bg-blue-600 text-white shadow-2xs font-bold'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
                }`}
              >
                <FileText size={14} />
                <span>接待明细</span>
              </button>
            </div>

            <button
              onClick={() => {
                alert('已导出选中数据明细报表 (CSV)');
              }}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-700 dark:text-slate-200 bg-slate-100 hover:bg-slate-200 dark:bg-slate-700 dark:hover:bg-slate-600 rounded-lg transition-colors cursor-pointer border border-slate-200/80 dark:border-slate-600 shadow-2xs"
            >
              <Download size={14} className="text-slate-500 dark:text-slate-400" />
              <span>下载明细</span>
            </button>
          </div>
        </div>

        {/* Tab 1: 汇总聚合 (Summary Aggregation by Store Dimension) */}
        {detailTab === 'summary' && (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-slate-700 dark:bg-slate-900 text-white font-medium">
                  <th className="py-3 px-3 font-semibold text-center border-r border-slate-600/50 w-12 whitespace-nowrap">序号</th>
                  <th className="py-3 px-3 font-semibold border-r border-slate-600/50 whitespace-nowrap">门店名称</th>
                  <th className="py-3 px-3 font-semibold border-r border-slate-600/50 whitespace-nowrap">门店编码</th>
                  <th className="py-3 px-3 font-semibold border-r border-slate-600/50 text-right whitespace-nowrap">质检录音数</th>
                  <th className="py-3 px-3 font-semibold border-r border-slate-600/50 text-right whitespace-nowrap">平均录音时长</th>
                  <th className="py-3 px-3 font-semibold text-center text-blue-200 whitespace-nowrap bg-blue-950/60 border-r border-slate-600/50">流程综合执行率</th>

                  {/* 1. 服务与信任建立 */}
                  <th className="py-3 px-3 font-semibold text-center text-blue-200 whitespace-nowrap bg-blue-900/50 border-r border-slate-600/50">服务与信任建立（一级）</th>
                  <th className="py-3 px-3 font-semibold border-r border-slate-600/50 text-right whitespace-nowrap">身份及服务内容介绍</th>
                  <th className="py-3 px-3 font-semibold border-r border-slate-600/50 text-right whitespace-nowrap">新车使用注意事项</th>
                  <th className="py-3 px-3 font-semibold border-r border-slate-600/50 text-right whitespace-nowrap">保养周期与质保期检查</th>

                  {/* 2. 延保需求建立 */}
                  <th className="py-3 px-3 font-semibold text-center text-blue-200 whitespace-nowrap bg-blue-900/50 border-r border-slate-600/50">延保需求建立（一级）</th>
                  <th className="py-3 px-3 font-semibold border-r border-slate-600/50 text-right whitespace-nowrap">车龄老化磨损风险</th>
                  <th className="py-3 px-3 font-semibold border-r border-slate-600/50 text-right whitespace-nowrap">核心部件维修成本</th>
                  <th className="py-3 px-3 font-semibold border-r border-slate-600/50 text-right whitespace-nowrap">原厂质保边界</th>

                  {/* 3. 延保方案讲解 */}
                  <th className="py-3 px-3 font-semibold text-center text-blue-200 whitespace-nowrap bg-blue-900/50 border-r border-slate-600/50">延保方案讲解（一级）</th>
                  <th className="py-3 px-3 font-semibold border-r border-slate-600/50 text-right whitespace-nowrap">延保产品导入</th>
                  <th className="py-3 px-3 font-semibold border-r border-slate-600/50 text-right whitespace-nowrap">延保保障范围与费用</th>
                  <th className="py-3 px-3 font-semibold border-r border-slate-600/50 text-right whitespace-nowrap">用车年限与方案匹配</th>

                  {/* 4. 异议处理与成交 */}
                  <th className="py-3 px-3 font-semibold text-center text-blue-200 whitespace-nowrap bg-blue-900/50 border-r border-slate-600/50">异议处理与成交（一级）</th>
                  <th className="py-3 px-3 font-semibold border-r border-slate-600/50 text-right whitespace-nowrap">费用异议处理</th>
                  <th className="py-3 px-3 font-semibold border-r border-slate-600/50 text-right whitespace-nowrap">换车异议处理</th>
                  <th className="py-3 px-3 font-semibold border-r border-slate-600/50 text-right whitespace-nowrap">延保方案价值强化</th>
                  <th className="py-3 px-3 font-semibold border-r border-slate-600/50 text-right whitespace-nowrap">方案确认</th>
                  <th className="py-3 px-3 font-semibold border-r border-slate-600/50 text-right whitespace-nowrap">成交促成</th>
                  <th className="py-3 px-3 font-semibold border-r border-slate-600/50 text-right whitespace-nowrap">逼单动作</th>

                  {/* 5. 合规风险 */}
                  <th className="py-3 px-3 font-semibold text-center text-emerald-200 whitespace-nowrap bg-emerald-950/60 border-r border-slate-600/50">合规风险（一级）</th>
                  <th className="py-3 px-3 font-semibold border-r border-slate-600/50 text-right whitespace-nowrap">保养免费过度承诺</th>
                  <th className="py-3 px-3 font-semibold text-right whitespace-nowrap">保障范围过度承诺</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-700/60 text-slate-700 dark:text-slate-200">
                {filteredStoreSummaries.map((row, idx) => (
                  <tr 
                    key={row.id} 
                    className="hover:bg-slate-50/80 dark:hover:bg-slate-700/40 transition-colors"
                  >
                    <td className="py-3.5 px-3 text-center font-mono text-slate-400 whitespace-nowrap">{idx + 1}</td>
                    <td className="py-3.5 px-3 font-bold text-blue-600 dark:text-blue-400 whitespace-nowrap">
                      {row.storeName}
                    </td>
                    <td className="py-3.5 px-3 font-mono text-slate-500 dark:text-slate-400 whitespace-nowrap">{row.storeCode}</td>
                    <td className="py-3.5 px-3 font-mono text-right font-bold text-slate-800 dark:text-slate-100 whitespace-nowrap">{row.qcRecordCount}</td>
                    <td className="py-3.5 px-3 font-mono text-right whitespace-nowrap">{row.avgDurationMins}分</td>
                    <td className="py-3.5 px-3 text-center font-mono font-bold text-blue-600 dark:text-blue-400 bg-blue-50/50 dark:bg-blue-950/20 whitespace-nowrap">
                      {row.overallExecutionRate}
                    </td>

                    {/* 1. 服务与信任建立 */}
                    <td className="py-3.5 px-3 text-center font-mono font-bold text-blue-600 dark:text-blue-400 bg-blue-50/30 dark:bg-blue-950/10 whitespace-nowrap">{row.trustRate}</td>
                    <td className="py-3.5 px-3 font-mono text-right text-slate-600 dark:text-slate-300 whitespace-nowrap">{row.trustSub1}</td>
                    <td className="py-3.5 px-3 font-mono text-right text-slate-600 dark:text-slate-300 whitespace-nowrap">{row.trustSub2}</td>
                    <td className="py-3.5 px-3 font-mono text-right text-slate-600 dark:text-slate-300 whitespace-nowrap">{row.trustSub3}</td>

                    {/* 2. 延保需求建立 */}
                    <td className="py-3.5 px-3 text-center font-mono font-bold text-blue-600 dark:text-blue-400 bg-blue-50/30 dark:bg-blue-950/10 whitespace-nowrap">{row.demandRate}</td>
                    <td className="py-3.5 px-3 font-mono text-right text-slate-600 dark:text-slate-300 whitespace-nowrap">{row.demandSub1}</td>
                    <td className="py-3.5 px-3 font-mono text-right text-slate-600 dark:text-slate-300 whitespace-nowrap">{row.demandSub2}</td>
                    <td className="py-3.5 px-3 font-mono text-right text-slate-600 dark:text-slate-300 whitespace-nowrap">{row.demandSub3}</td>

                    {/* 3. 延保方案讲解 */}
                    <td className="py-3.5 px-3 text-center font-mono font-bold text-blue-600 dark:text-blue-400 bg-blue-50/30 dark:bg-blue-950/10 whitespace-nowrap">{row.planRate}</td>
                    <td className="py-3.5 px-3 font-mono text-right text-slate-600 dark:text-slate-300 whitespace-nowrap">{row.planSub1}</td>
                    <td className="py-3.5 px-3 font-mono text-right text-slate-600 dark:text-slate-300 whitespace-nowrap">{row.planSub2}</td>
                    <td className="py-3.5 px-3 font-mono text-right text-slate-600 dark:text-slate-300 whitespace-nowrap">{row.planSub3}</td>

                    {/* 4. 异议处理与成交 */}
                    <td className="py-3.5 px-3 text-center font-mono font-bold text-blue-600 dark:text-blue-400 bg-blue-50/30 dark:bg-blue-950/10 whitespace-nowrap">{row.objectionRate}</td>
                    <td className="py-3.5 px-3 font-mono text-right text-slate-600 dark:text-slate-300 whitespace-nowrap">{row.objSub1}</td>
                    <td className="py-3.5 px-3 font-mono text-right text-slate-600 dark:text-slate-300 whitespace-nowrap">{row.objSub2}</td>
                    <td className="py-3.5 px-3 font-mono text-right text-slate-600 dark:text-slate-300 whitespace-nowrap">{row.objSub3}</td>
                    <td className="py-3.5 px-3 font-mono text-right text-slate-600 dark:text-slate-300 whitespace-nowrap">{row.objSub4}</td>
                    <td className="py-3.5 px-3 font-mono text-right text-slate-600 dark:text-slate-300 whitespace-nowrap">{row.objSub5}</td>
                    <td className="py-3.5 px-3 font-mono text-right text-slate-600 dark:text-slate-300 whitespace-nowrap">{row.objSub6}</td>

                    {/* 5. 合规风险 */}
                    <td className="py-3.5 px-3 text-center font-mono font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50/40 dark:bg-emerald-950/20 whitespace-nowrap">{row.complianceRate}</td>
                    <td className="py-3.5 px-3 font-mono text-right text-slate-600 dark:text-slate-300 whitespace-nowrap">{row.compSub1}</td>
                    <td className="py-3.5 px-3 font-mono text-right text-slate-600 dark:text-slate-300 whitespace-nowrap">{row.compSub2}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Tab 2: 接待明细 (Reception Details) */}
        {detailTab === 'receptionDetail' && (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-slate-700 dark:bg-slate-900 text-white font-medium">
                  <th className="py-3 px-3 font-semibold text-center border-r border-slate-600/50 w-12 whitespace-nowrap">序号</th>
                  <th className="py-3 px-2 font-semibold text-center border-r border-slate-600/50 w-10 whitespace-nowrap">录音</th>
                  <th className="py-3 px-3 font-semibold border-r border-slate-600/50 whitespace-nowrap">员工姓名</th>
                  <th className="py-3 px-3 font-semibold border-r border-slate-600/50 whitespace-nowrap">门店名称</th>
                  <th className="py-3 px-3 font-semibold border-r border-slate-600/50 whitespace-nowrap">接待开始时间</th>
                  <th className="py-3 px-3 font-semibold border-r border-slate-600/50 whitespace-nowrap">接待结束时间</th>
                  <th className="py-3 px-3 font-semibold border-r border-slate-600/50 text-right whitespace-nowrap">接待时长（分）</th>
                  <th className="py-3 px-3 font-semibold text-center border-r border-slate-600/50 whitespace-nowrap">是否成交</th>
                  <th className="py-3 px-3 font-semibold text-center text-blue-200 whitespace-nowrap bg-blue-950/60 border-r border-slate-600/50">流程综合执行率</th>

                  {/* 1. 服务与信任建立 */}
                  <th className="py-3 px-3 font-semibold text-center text-blue-200 whitespace-nowrap bg-blue-900/50 border-r border-slate-600/50">服务与信任建立（一级）</th>
                  <th className="py-3 px-2 font-semibold border-r border-slate-600/50 text-center whitespace-nowrap">身份及服务内容介绍</th>
                  <th className="py-3 px-2 font-semibold border-r border-slate-600/50 text-center whitespace-nowrap">新车使用注意事项</th>
                  <th className="py-3 px-2 font-semibold border-r border-slate-600/50 text-center whitespace-nowrap">保养周期与质保期检查</th>

                  {/* 2. 延保需求建立 */}
                  <th className="py-3 px-3 font-semibold text-center text-blue-200 whitespace-nowrap bg-blue-900/50 border-r border-slate-600/50">延保需求建立（一级）</th>
                  <th className="py-3 px-2 font-semibold border-r border-slate-600/50 text-center whitespace-nowrap">车龄老化磨损风险</th>
                  <th className="py-3 px-2 font-semibold border-r border-slate-600/50 text-center whitespace-nowrap">核心部件维修成本</th>
                  <th className="py-3 px-2 font-semibold border-r border-slate-600/50 text-center whitespace-nowrap">原厂质保边界</th>

                  {/* 3. 延保方案讲解 */}
                  <th className="py-3 px-3 font-semibold text-center text-blue-200 whitespace-nowrap bg-blue-900/50 border-r border-slate-600/50">延保方案讲解（一级）</th>
                  <th className="py-3 px-2 font-semibold border-r border-slate-600/50 text-center whitespace-nowrap">延保产品导入</th>
                  <th className="py-3 px-2 font-semibold border-r border-slate-600/50 text-center whitespace-nowrap">延保保障范围与费用</th>
                  <th className="py-3 px-2 font-semibold border-r border-slate-600/50 text-center whitespace-nowrap">用车年限与方案匹配</th>

                  {/* 4. 异议处理与成交 */}
                  <th className="py-3 px-3 font-semibold text-center text-blue-200 whitespace-nowrap bg-blue-900/50 border-r border-slate-600/50">异议处理与成交（一级）</th>
                  <th className="py-3 px-2 font-semibold border-r border-slate-600/50 text-center whitespace-nowrap">费用异议处理</th>
                  <th className="py-3 px-2 font-semibold border-r border-slate-600/50 text-center whitespace-nowrap">换车异议处理</th>
                  <th className="py-3 px-2 font-semibold border-r border-slate-600/50 text-center whitespace-nowrap">延保方案价值强化</th>
                  <th className="py-3 px-2 font-semibold border-r border-slate-600/50 text-center whitespace-nowrap">方案确认</th>
                  <th className="py-3 px-2 font-semibold border-r border-slate-600/50 text-center whitespace-nowrap">成交促成</th>
                  <th className="py-3 px-2 font-semibold border-r border-slate-600/50 text-center whitespace-nowrap">逼单动作</th>

                  {/* 5. 合规风险 */}
                  <th className="py-3 px-3 font-semibold text-center text-emerald-200 whitespace-nowrap bg-emerald-950/60 border-r border-slate-600/50">合规风险（一级）</th>
                  <th className="py-3 px-2 font-semibold border-r border-slate-600/50 text-center whitespace-nowrap">保养免费过度承诺</th>
                  <th className="py-3 px-2 font-semibold text-center whitespace-nowrap">保障范围过度承诺</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-700/60 text-slate-700 dark:text-slate-200">
                {filteredReceptions.map((row, idx) => (
                  <tr key={row.id} className="hover:bg-slate-50/80 dark:hover:bg-slate-700/40 transition-colors">
                    <td className="py-3.5 px-3 text-center font-mono text-slate-400 whitespace-nowrap">{idx + 1}</td>
                    <td className="py-3.5 px-2 text-center whitespace-nowrap">
                      <button
                        onClick={() => {
                          setPanoramaRecord({
                            id: `QCREC${row.id}`,
                            customerName: '王先生',
                            salesperson: row.empName,
                            storeName: row.storeName,
                            time: row.startTime,
                            durationMins: row.durationMins,
                            executionScore: parseInt(row.overallExecutionRate, 10) || 95,
                            businessType: '延保',
                            carModel: '宝马 5系 530Li'
                          });
                        }}
                        className="inline-flex items-center justify-center w-7 h-7 rounded-lg text-blue-600 dark:text-blue-400 bg-blue-50 hover:bg-blue-100 dark:bg-blue-950/60 dark:hover:bg-blue-900/80 border border-blue-200/80 dark:border-blue-800/60 transition-all cursor-pointer shadow-2xs hover:scale-105"
                        title="播放录音并查看全景详情"
                      >
                        <Volume2 size={13} />
                      </button>
                    </td>
                    <td className="py-3.5 px-3 font-bold text-blue-600 dark:text-blue-400 whitespace-nowrap">{row.empName}</td>
                    <td className="py-3.5 px-3 font-medium text-slate-700 dark:text-slate-300 whitespace-nowrap">{row.storeName}</td>
                    <td className="py-3.5 px-3 font-mono text-slate-600 dark:text-slate-400 whitespace-nowrap">{row.startTime}</td>
                    <td className="py-3.5 px-3 font-mono text-slate-600 dark:text-slate-400 whitespace-nowrap">{row.endTime}</td>
                    <td className="py-3.5 px-3 font-mono text-right font-medium whitespace-nowrap">{row.durationMins}</td>
                    <td className="py-3.5 px-3 text-center whitespace-nowrap">
                      <span className={`inline-flex items-center justify-center px-2 py-0.5 rounded text-xs font-semibold ${
                        row.isDeal 
                          ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300 border border-emerald-300/40' 
                          : 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400 border border-slate-200 dark:border-slate-700'
                      }`}>
                        {row.isDeal ? '是' : '否'}
                      </span>
                    </td>
                    <td className="py-3.5 px-3 text-center font-mono font-bold text-blue-600 dark:text-blue-400 bg-blue-50/50 dark:bg-blue-950/20 whitespace-nowrap">
                      {row.overallExecutionRate}
                    </td>

                    {/* 1. 服务与信任建立 */}
                    <td className="py-3.5 px-3 text-center font-mono font-bold text-blue-600 dark:text-blue-400 bg-blue-50/30 dark:bg-blue-950/10 whitespace-nowrap">{row.trustRate}</td>
                    <td className="py-3.5 px-2 text-center whitespace-nowrap">
                      {row.trustSub1Hit ? (
                        <Check size={16} className="text-emerald-600 dark:text-emerald-400 inline-block stroke-[2.5]" />
                      ) : (
                        <X size={16} className="text-rose-500 dark:text-rose-400 inline-block stroke-[2.5]" />
                      )}
                    </td>
                    <td className="py-3.5 px-2 text-center whitespace-nowrap">
                      {row.trustSub2Hit ? (
                        <Check size={16} className="text-emerald-600 dark:text-emerald-400 inline-block stroke-[2.5]" />
                      ) : (
                        <X size={16} className="text-rose-500 dark:text-rose-400 inline-block stroke-[2.5]" />
                      )}
                    </td>
                    <td className="py-3.5 px-2 text-center whitespace-nowrap">
                      {row.trustSub3Hit ? (
                        <Check size={16} className="text-emerald-600 dark:text-emerald-400 inline-block stroke-[2.5]" />
                      ) : (
                        <X size={16} className="text-rose-500 dark:text-rose-400 inline-block stroke-[2.5]" />
                      )}
                    </td>

                    {/* 2. 延保需求建立 */}
                    <td className="py-3.5 px-3 text-center font-mono font-bold text-blue-600 dark:text-blue-400 bg-blue-50/30 dark:bg-blue-950/10 whitespace-nowrap">{row.demandRate}</td>
                    <td className="py-3.5 px-2 text-center whitespace-nowrap">
                      {row.demandSub1Hit ? (
                        <Check size={16} className="text-emerald-600 dark:text-emerald-400 inline-block stroke-[2.5]" />
                      ) : (
                        <X size={16} className="text-rose-500 dark:text-rose-400 inline-block stroke-[2.5]" />
                      )}
                    </td>
                    <td className="py-3.5 px-2 text-center whitespace-nowrap">
                      {row.demandSub2Hit ? (
                        <Check size={16} className="text-emerald-600 dark:text-emerald-400 inline-block stroke-[2.5]" />
                      ) : (
                        <X size={16} className="text-rose-500 dark:text-rose-400 inline-block stroke-[2.5]" />
                      )}
                    </td>
                    <td className="py-3.5 px-2 text-center whitespace-nowrap">
                      {row.demandSub3Hit ? (
                        <Check size={16} className="text-emerald-600 dark:text-emerald-400 inline-block stroke-[2.5]" />
                      ) : (
                        <X size={16} className="text-rose-500 dark:text-rose-400 inline-block stroke-[2.5]" />
                      )}
                    </td>

                    {/* 3. 延保方案讲解 */}
                    <td className="py-3.5 px-3 text-center font-mono font-bold text-blue-600 dark:text-blue-400 bg-blue-50/30 dark:bg-blue-950/10 whitespace-nowrap">{row.planRate}</td>
                    <td className="py-3.5 px-2 text-center whitespace-nowrap">
                      {row.planSub1Hit ? (
                        <Check size={16} className="text-emerald-600 dark:text-emerald-400 inline-block stroke-[2.5]" />
                      ) : (
                        <X size={16} className="text-rose-500 dark:text-rose-400 inline-block stroke-[2.5]" />
                      )}
                    </td>
                    <td className="py-3.5 px-2 text-center whitespace-nowrap">
                      {row.planSub2Hit ? (
                        <Check size={16} className="text-emerald-600 dark:text-emerald-400 inline-block stroke-[2.5]" />
                      ) : (
                        <X size={16} className="text-rose-500 dark:text-rose-400 inline-block stroke-[2.5]" />
                      )}
                    </td>
                    <td className="py-3.5 px-2 text-center whitespace-nowrap">
                      {row.planSub3Hit ? (
                        <Check size={16} className="text-emerald-600 dark:text-emerald-400 inline-block stroke-[2.5]" />
                      ) : (
                        <X size={16} className="text-rose-500 dark:text-rose-400 inline-block stroke-[2.5]" />
                      )}
                    </td>

                    {/* 4. 异议处理与成交 */}
                    <td className="py-3.5 px-3 text-center font-mono font-bold text-blue-600 dark:text-blue-400 bg-blue-50/30 dark:bg-blue-950/10 whitespace-nowrap">{row.objectionRate}</td>
                    <td className="py-3.5 px-2 text-center whitespace-nowrap">
                      {row.objSub1Hit ? (
                        <Check size={16} className="text-emerald-600 dark:text-emerald-400 inline-block stroke-[2.5]" />
                      ) : (
                        <X size={16} className="text-rose-500 dark:text-rose-400 inline-block stroke-[2.5]" />
                      )}
                    </td>
                    <td className="py-3.5 px-2 text-center whitespace-nowrap">
                      {row.objSub2Hit ? (
                        <Check size={16} className="text-emerald-600 dark:text-emerald-400 inline-block stroke-[2.5]" />
                      ) : (
                        <X size={16} className="text-rose-500 dark:text-rose-400 inline-block stroke-[2.5]" />
                      )}
                    </td>
                    <td className="py-3.5 px-2 text-center whitespace-nowrap">
                      {row.objSub3Hit ? (
                        <Check size={16} className="text-emerald-600 dark:text-emerald-400 inline-block stroke-[2.5]" />
                      ) : (
                        <X size={16} className="text-rose-500 dark:text-rose-400 inline-block stroke-[2.5]" />
                      )}
                    </td>
                    <td className="py-3.5 px-2 text-center whitespace-nowrap">
                      {row.objSub4Hit ? (
                        <Check size={16} className="text-emerald-600 dark:text-emerald-400 inline-block stroke-[2.5]" />
                      ) : (
                        <X size={16} className="text-rose-500 dark:text-rose-400 inline-block stroke-[2.5]" />
                      )}
                    </td>
                    <td className="py-3.5 px-2 text-center whitespace-nowrap">
                      {row.objSub5Hit ? (
                        <Check size={16} className="text-emerald-600 dark:text-emerald-400 inline-block stroke-[2.5]" />
                      ) : (
                        <X size={16} className="text-rose-500 dark:text-rose-400 inline-block stroke-[2.5]" />
                      )}
                    </td>
                    <td className="py-3.5 px-2 text-center whitespace-nowrap">
                      {row.objSub6Hit ? (
                        <Check size={16} className="text-emerald-600 dark:text-emerald-400 inline-block stroke-[2.5]" />
                      ) : (
                        <X size={16} className="text-rose-500 dark:text-rose-400 inline-block stroke-[2.5]" />
                      )}
                    </td>

                    {/* 5. 合规风险 */}
                    <td className="py-3.5 px-3 text-center font-mono font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50/40 dark:bg-emerald-950/20 whitespace-nowrap">{row.complianceRate}</td>
                    <td className="py-3.5 px-2 text-center whitespace-nowrap">
                      {row.compSub1Hit ? (
                        <Check size={16} className="text-emerald-600 dark:text-emerald-400 inline-block stroke-[2.5]" />
                      ) : (
                        <X size={16} className="text-rose-500 dark:text-rose-400 inline-block stroke-[2.5]" />
                      )}
                    </td>
                    <td className="py-3.5 px-2 text-center whitespace-nowrap">
                      {row.compSub2Hit ? (
                        <Check size={16} className="text-emerald-600 dark:text-emerald-400 inline-block stroke-[2.5]" />
                      ) : (
                        <X size={16} className="text-rose-500 dark:text-rose-400 inline-block stroke-[2.5]" />
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Table Pagination Bar */}
        <div className="px-5 py-3 border-t border-slate-100 dark:border-slate-700/80 flex items-center justify-between gap-6 text-xs text-slate-500 dark:text-slate-400">
          <div>
            {detailTab === 'summary' ? '按各门店汇总聚合质检数据' : '单次接待质检执行明细'}
          </div>
          <div>
            共包含 <span className="font-bold text-slate-700 dark:text-slate-200">
              {detailTab === 'summary' ? filteredStoreSummaries.length : filteredReceptions.length}
            </span> 条记录
          </div>
        </div>

      </div>

      {/* QC Panorama Detail Modal */}
      <QcPanoramaDetailModal
        isOpen={!!panoramaRecord}
        onClose={() => setPanoramaRecord(null)}
        recordData={panoramaRecord}
      />

    </div>
  );
};

export default YanbaoWuyouReport;
