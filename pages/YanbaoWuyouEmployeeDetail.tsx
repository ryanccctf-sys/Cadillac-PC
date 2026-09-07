import React, { useState, useMemo } from 'react';
import { QcPanoramaDetailModal } from '../components/QcPanoramaDetailModal';
import { 
  Calendar, 
  Search, 
  RotateCcw, 
  Store, 
  Users, 
  UserCheck, 
  Mic, 
  Clock, 
  Award, 
  Download, 
  ChevronRight, 
  ChevronLeft,
  ChevronDown,
  ChevronUp,
  X, 
  FileText,
  Play,
  Check,
  CheckCircle2,
  XCircle,
  BarChart2,
  Layers,
  ShieldCheck,
  Volume2
} from 'lucide-react';

// ----------------- QUALITY CHECK ITEM DEFINITIONS -----------------
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

export const MOCK_QC_CATEGORIES: QCCategory[] = [
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

// ----------------- DATA INTERFACES -----------------
export interface SingleReceptionRecord {
  id: string;
  empName: string;
  time: string;               // 接待开始时间
  endTime: string;            // 接待结束时间
  storeName: string;          // 接待门店
  businessType: 'sales' | 'delivery' | 'afterSales'; // 业务类别
  customerName: string;       // 客户姓名/车牌
  durationMins: number;       // 接待时长(分钟)
  isDeal: boolean;            // 是否成交 (值为是或否)
  executionScore: number;     // 单次执行率(%)
  overallExecutionRate: string;
  audioUrl?: string;          // 录音文件
  summaryText?: string;       // AI识别亮点/缺失

  // 1. 服务与信任建立
  trustRate: string;
  trustSub1Hit: boolean; // 身份及服务内容介绍
  trustSub2Hit: boolean; // 新车使用注意事项
  trustSub3Hit: boolean; // 保养周期与质保期检查

  // 2. 延保需求建立
  demandRate: string;
  demandSub1Hit: boolean; // 车龄老化磨损风险
  demandSub2Hit: boolean; // 核心部件维修成本
  demandSub3Hit: boolean; // 原厂质保边界

  // 3. 延保方案讲解
  planRate: string;
  planSub1Hit: boolean; // 延保产品导入
  planSub2Hit: boolean; // 延保保障范围与费用
  planSub3Hit: boolean; // 用车年限与方案匹配

  // 4. 异议处理与成交
  objectionRate: string;
  objSub1Hit: boolean; // 费用异议处理
  objSub2Hit: boolean; // 换车异议处理
  objSub3Hit: boolean; // 延保方案价值强化
  objSub4Hit: boolean; // 方案确认
  objSub5Hit: boolean; // 成交促成
  objSub6Hit: boolean; // 逼单动作

  // 5. 合规风险
  complianceRate: string;
  compSub1Hit: boolean; // 保养免费过度承诺
  compSub2Hit: boolean; // 保障范围过度承诺
}

export interface EmployeeSummaryData {
  id: number;
  empId: string;
  name: string;
  role: string;
  storeName: string;
  businessType: 'sales' | 'delivery' | 'afterSales';
  totalQcRecords: number;
  totalDurationHours: number;
  avgDurationMins: number;
  overallExecutionRate: string;

  // 1. 服务与信任建立（一级与二级）
  trustRate: string;
  trustSub1: string; // 身份及服务内容介绍
  trustSub2: string; // 新车使用注意事项
  trustSub3: string; // 保养周期与质保期检查

  // 2. 延保需求建立（一级与二级）
  demandRate: string;
  demandSub1: string; // 车龄老化磨损风险
  demandSub2: string; // 核心部件维修成本
  demandSub3: string; // 原厂质保边界

  // 3. 延保方案讲解（一级与二级）
  planRate: string;
  planSub1: string; // 延保产品导入
  planSub2: string; // 延保保障范围与费用
  planSub3: string; // 用车年限与方案匹配

  // 4. 异议处理与成交（一级与二级）
  objectionRate: string;
  objSub1: string; // 费用异议处理
  objSub2: string; // 换车异议处理
  objSub3: string; // 延保方案价值强化
  objSub4: string; // 方案确认
  objSub5: string; // 成交促成
  objSub6: string; // 逼单动作

  // 5. 合规风险（一级与二级）
  complianceRate: string;
  compSub1: string; // 保养免费过度承诺
  compSub2: string; // 保障范围过度承诺

  receptionRecords: SingleReceptionRecord[];
}

// ----------------- MOCK STORES -----------------
const MOCK_STORES = [
  { id: 'ALL', name: '全部门店' },
  { id: 'STORE_01', name: '苏州宝马' },
  { id: 'STORE_02', name: '南京宝马' },
  { id: 'STORE_03', name: '杭州元通奥迪' },
  { id: 'STORE_04', name: '湖州宝马' },
  { id: 'STORE_05', name: '常熟奥迪' },
  { id: 'STORE_06', name: '张家港奥迪' },
  { id: 'STORE_07', name: '湖州奥迪' },
  { id: 'STORE_08', name: '华东中心店' },
  { id: 'STORE_09', name: '浦东旗舰店' },
  { id: 'STORE_10', name: '虹桥体验中心' },
  { id: 'STORE_11', name: '宝山服务中心' }
];

// Helper to generate mock reception details for an employee
const generateMockReceptionRecords = (
  empName: string, 
  primaryStore: string, 
  bizType: 'sales' | 'delivery' | 'afterSales',
  baseRatio: number = 0.85
): SingleReceptionRecord[] => {
  const stores = [primaryStore, '苏州宝马', '南京宝马', '杭州元通奥迪', '华东中心店'];
  const customers = [
    '王先生', '李女士', '张先生', 
    '陈先生', '赵女士', '周先生',
    '钱女士', '孙先生', '吴女士'
  ];

  return Array.from({ length: 12 }).map((_, idx) => {
    const storeName = idx % 4 === 0 ? stores[1] : stores[0];
    const duration = 20 + Math.floor(Math.random() * 15);
    
    // Generate hits matching the 17 quality points
    const trustSub1Hit = true;
    const trustSub2Hit = Math.random() < baseRatio + 0.08;
    const trustSub3Hit = Math.random() < baseRatio + 0.05;

    const demandSub1Hit = Math.random() < baseRatio;
    const demandSub2Hit = Math.random() < baseRatio - 0.03;
    const demandSub3Hit = Math.random() < baseRatio - 0.05;

    const planSub1Hit = Math.random() < baseRatio + 0.04;
    const planSub2Hit = Math.random() < baseRatio - 0.02;
    const planSub3Hit = Math.random() < baseRatio - 0.06;

    const objSub1Hit = Math.random() < baseRatio - 0.08;
    const objSub2Hit = Math.random() < baseRatio - 0.10;
    const objSub3Hit = Math.random() < baseRatio - 0.04;
    const objSub4Hit = Math.random() < baseRatio - 0.06;
    const objSub5Hit = Math.random() < baseRatio - 0.12;
    const objSub6Hit = Math.random() < baseRatio - 0.15;

    const compSub1Hit = Math.random() < 0.98;
    const compSub2Hit = Math.random() < 0.97;

    const allHits = [
      trustSub1Hit, trustSub2Hit, trustSub3Hit,
      demandSub1Hit, demandSub2Hit, demandSub3Hit,
      planSub1Hit, planSub2Hit, planSub3Hit,
      objSub1Hit, objSub2Hit, objSub3Hit, objSub4Hit, objSub5Hit, objSub6Hit,
      compSub1Hit, compSub2Hit
    ];

    const passedCount = allHits.filter(Boolean).length;
    const executionScore = Math.round((passedCount / allHits.length) * 100);

    const trustRateNum = Math.round(([trustSub1Hit, trustSub2Hit, trustSub3Hit].filter(Boolean).length / 3) * 100);
    const demandRateNum = Math.round(([demandSub1Hit, demandSub2Hit, demandSub3Hit].filter(Boolean).length / 3) * 100);
    const planRateNum = Math.round(([planSub1Hit, planSub2Hit, planSub3Hit].filter(Boolean).length / 3) * 100);
    const objRateNum = Math.round(([objSub1Hit, objSub2Hit, objSub3Hit, objSub4Hit, objSub5Hit, objSub6Hit].filter(Boolean).length / 6) * 100);
    const compRateNum = Math.round(([compSub1Hit, compSub2Hit].filter(Boolean).length / 2) * 100);

    const day = 13 - (idx % 12);
    const dateStr = `2026-08-${day < 10 ? '0' + day : day}`;
    const startHour = 10 + (idx % 8);
    const startMin = (idx * 7) % 60;
    const endMin = (startMin + duration) % 60;
    const endHour = startHour + Math.floor((startMin + duration) / 60);

    const startTime = `${dateStr} ${startHour < 10 ? '0' + startHour : startHour}:${startMin < 10 ? '0' + startMin : startMin}`;
    const endTime = `${dateStr} ${endHour < 10 ? '0' + endHour : endHour}:${endMin < 10 ? '0' + endMin : endMin}`;
    const isDeal = objSub5Hit && (objSub6Hit || executionScore >= 80);

    return {
      id: `REC-${empName}-${idx + 101}`,
      empName,
      time: startTime,
      endTime,
      storeName,
      businessType: bizType,
      customerName: customers[idx % customers.length],
      durationMins: duration,
      isDeal,
      executionScore,
      overallExecutionRate: `${executionScore}%`,
      trustRate: `${trustRateNum}%`,
      trustSub1Hit,
      trustSub2Hit,
      trustSub3Hit,
      demandRate: `${demandRateNum}%`,
      demandSub1Hit,
      demandSub2Hit,
      demandSub3Hit,
      planRate: `${planRateNum}%`,
      planSub1Hit,
      planSub2Hit,
      planSub3Hit,
      objectionRate: `${objRateNum}%`,
      objSub1Hit,
      objSub2Hit,
      objSub3Hit,
      objSub4Hit,
      objSub5Hit,
      objSub6Hit,
      complianceRate: `${compRateNum}%`,
      compSub1Hit,
      compSub2Hit,
      summaryText: executionScore >= 85 
        ? '标准流程执行完整，延保条款、核心部件维修成本及保障范围覆盖全面，表达清晰流畅。' 
        : '未完整进行异议处理与逼单动作，已自动记录缺失质检节点供辅导提升。'
    };
  });
};

// ----------------- MOCK EMPLOYEES DATA (Align with YanbaoWuyouReport quality items) -----------------
const MOCK_EMPLOYEES_SUMMARY: EmployeeSummaryData[] = [
  {
    id: 1,
    empId: 'EMP001',
    name: '张伟',
    role: '高级销售顾问',
    storeName: '苏州宝马',
    businessType: 'sales',
    totalQcRecords: 182,
    totalDurationHours: 78.5,
    avgDurationMins: 25.8,
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
    compSub2: '99.30%',
    receptionRecords: generateMockReceptionRecords('张伟', '苏州宝马', 'sales', 0.88)
  },
  {
    id: 2,
    empId: 'EMP002',
    name: '李娜',
    role: '资深销售顾问',
    storeName: '苏州宝马',
    businessType: 'sales',
    totalQcRecords: 165,
    totalDurationHours: 71.2,
    avgDurationMins: 25.9,
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
    compSub2: '98.40%',
    receptionRecords: generateMockReceptionRecords('李娜', '苏州宝马', 'sales', 0.85)
  },
  {
    id: 3,
    empId: 'EMP003',
    name: '王强',
    role: '交付专家',
    storeName: '南京宝马',
    businessType: 'delivery',
    totalQcRecords: 154,
    totalDurationHours: 68.0,
    avgDurationMins: 26.5,
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
    compSub2: '98.60%',
    receptionRecords: generateMockReceptionRecords('王强', '南京宝马', 'delivery', 0.86)
  },
  {
    id: 4,
    empId: 'EMP004',
    name: '赵敏',
    role: '售后服务经理',
    storeName: '杭州元通奥迪',
    businessType: 'afterSales',
    totalQcRecords: 138,
    totalDurationHours: 59.8,
    avgDurationMins: 26.0,
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
    compSub2: '97.60%',
    receptionRecords: generateMockReceptionRecords('赵敏', '杭州元通奥迪', 'afterSales', 0.82)
  },
  {
    id: 5,
    empId: 'EMP005',
    name: '陈杰',
    role: '销售顾问',
    storeName: '湖州宝马',
    businessType: 'sales',
    totalQcRecords: 112,
    totalDurationHours: 48.2,
    avgDurationMins: 25.8,
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
    compSub2: '97.40%',
    receptionRecords: generateMockReceptionRecords('陈杰', '湖州宝马', 'sales', 0.80)
  },
  {
    id: 6,
    empId: 'EMP006',
    name: '刘洋',
    role: '高级销售顾问',
    storeName: '常熟奥迪',
    businessType: 'sales',
    totalQcRecords: 128,
    totalDurationHours: 55.4,
    avgDurationMins: 26.0,
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
    compSub2: '97.00%',
    receptionRecords: generateMockReceptionRecords('刘洋', '常熟奥迪', 'sales', 0.79)
  },
  {
    id: 7,
    empId: 'EMP007',
    name: '周婷',
    role: '交付顾问',
    storeName: '张家港奥迪',
    businessType: 'delivery',
    totalQcRecords: 98,
    totalDurationHours: 42.1,
    avgDurationMins: 25.7,
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
    compSub2: '96.20%',
    receptionRecords: generateMockReceptionRecords('周婷', '张家港奥迪', 'delivery', 0.77)
  },
  {
    id: 8,
    empId: 'EMP008',
    name: '孙浩',
    role: '售后接待主管',
    storeName: '湖州奥迪',
    businessType: 'afterSales',
    totalQcRecords: 104,
    totalDurationHours: 44.8,
    avgDurationMins: 25.8,
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
    compSub2: '97.40%',
    receptionRecords: generateMockReceptionRecords('孙浩', '湖州奥迪', 'afterSales', 0.80)
  }
];

export const YanbaoWuyouEmployeeDetail: React.FC = () => {
  // Global Filter States
  const [startDate, setStartDate] = useState<string>('2026-08-01');
  const [endDate, setEndDate] = useState<string>('2026-08-13');
  const [selectedStore, setSelectedStore] = useState<string>('ALL');
  const [selectedEmployeeName, setSelectedEmployeeName] = useState<string>('ALL');
  const [employeeSearchText, setEmployeeSearchText] = useState<string>('');
  const [searchKeyword, setSearchKeyword] = useState<string>('');

  // Selected category for sub-item inspection cards
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(null);

  // Table Tabs: 汇总聚合 & 接待明细
  const [detailTab, setDetailTab] = useState<'summary' | 'receptionDetail'>('summary');

  // Pagination states for Summary Tab
  const [summaryPage, setSummaryPage] = useState<number>(1);
  const [summaryPageSize, setSummaryPageSize] = useState<number>(10);
  const [summaryJumpPage, setSummaryJumpPage] = useState<string>('');

  // Pagination states for Reception Tab
  const [receptionPage, setReceptionPage] = useState<number>(1);
  const [receptionPageSize, setReceptionPageSize] = useState<number>(10);
  const [receptionJumpPage, setReceptionJumpPage] = useState<string>('');

  // Selected Employee for Detail Modal
  const [selectedEmployee, setSelectedEmployee] = useState<EmployeeSummaryData | null>(null);

  // Filter inside Modal
  const [modalStoreFilter, setModalStoreFilter] = useState<string>('ALL');
  const [modalSearchKeyword, setModalSearchKeyword] = useState<string>('');
  const [playingAudioId, setPlayingAudioId] = useState<string | null>(null);
  const [panoramaRecord, setPanoramaRecord] = useState<any>(null);

  // Filter Main Table Data (Employee Summary)
  const filteredEmployees = useMemo(() => {
    return MOCK_EMPLOYEES_SUMMARY.filter((emp) => {
      // Specific employee dropdown selection
      if (selectedEmployeeName !== 'ALL' && emp.name !== selectedEmployeeName) {
        return false;
      }

      // Employee search keyword filter
      if (employeeSearchText.trim()) {
        const kw = employeeSearchText.trim().toLowerCase();
        const matchName = emp.name.toLowerCase().includes(kw);
        const matchEmpId = emp.empId.toLowerCase().includes(kw);
        if (!matchName && !matchEmpId) return false;
      }

      // General Search keyword
      if (searchKeyword.trim()) {
        const kw = searchKeyword.trim().toLowerCase();
        const matchName = emp.name.toLowerCase().includes(kw);
        const matchEmpId = emp.empId.toLowerCase().includes(kw);
        const matchStore = emp.storeName.toLowerCase().includes(kw);
        if (!matchName && !matchEmpId && !matchStore) return false;
      }

      // Store Filter
      if (selectedStore !== 'ALL') {
        const storeObj = MOCK_STORES.find(s => s.id === selectedStore);
        if (storeObj && emp.storeName !== storeObj.name) return false;
      }

      return true;
    });
  }, [selectedEmployeeName, employeeSearchText, searchKeyword, selectedStore]);

  // All individual receptions derived from filtered employees
  const allFilteredReceptions = useMemo(() => {
    return filteredEmployees.flatMap(emp => emp.receptionRecords);
  }, [filteredEmployees]);

  // Summary Pagination calculations
  const totalSummaryPages = Math.max(1, Math.ceil(filteredEmployees.length / summaryPageSize));
  const safeSummaryPage = Math.min(summaryPage, totalSummaryPages);
  const paginatedEmployees = useMemo(() => {
    const start = (safeSummaryPage - 1) * summaryPageSize;
    return filteredEmployees.slice(start, start + summaryPageSize);
  }, [filteredEmployees, safeSummaryPage, summaryPageSize]);

  // Reception Pagination calculations
  const totalReceptionPages = Math.max(1, Math.ceil(allFilteredReceptions.length / receptionPageSize));
  const safeReceptionPage = Math.min(receptionPage, totalReceptionPages);
  const paginatedReceptions = useMemo(() => {
    const start = (safeReceptionPage - 1) * receptionPageSize;
    return allFilteredReceptions.slice(start, start + receptionPageSize);
  }, [allFilteredReceptions, safeReceptionPage, receptionPageSize]);

  // Calculate Aggregated Metrics
  const totalEmployees = filteredEmployees.length;
  const totalQcRecords = filteredEmployees.reduce((acc, curr) => acc + curr.totalQcRecords, 0);
  const avgReceptionMins = filteredEmployees.length > 0
    ? (
        filteredEmployees.reduce((acc, curr) => acc + curr.avgDurationMins * curr.totalQcRecords, 0) /
        (totalQcRecords || 1)
      ).toFixed(1)
    : '0';

  const avgScoreNum = filteredEmployees.length > 0
    ? (
        filteredEmployees.reduce((acc, curr) => acc + parseFloat(curr.overallExecutionRate), 0) / filteredEmployees.length
      ).toFixed(2)
    : '0.00';

  const handleResetFilters = () => {
    setStartDate('2026-08-01');
    setEndDate('2026-08-13');
    setSelectedStore('ALL');
    setSelectedEmployeeName('ALL');
    setEmployeeSearchText('');
    setSearchKeyword('');
    setSummaryPage(1);
    setReceptionPage(1);
  };

  const getBizBadge = (type: 'sales' | 'delivery' | 'afterSales') => {
    switch (type) {
      case 'sales':
        return <span className="px-2 py-0.5 text-[11px] font-semibold bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300 rounded-full">销售</span>;
      case 'delivery':
        return <span className="px-2 py-0.5 text-[11px] font-semibold bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300 rounded-full">交付</span>;
      case 'afterSales':
        return <span className="px-2 py-0.5 text-[11px] font-semibold bg-purple-100 text-purple-700 dark:bg-purple-900/40 dark:text-purple-300 rounded-full">售后</span>;
      default:
        return null;
    }
  };

  // Reception records filtering inside the modal
  const modalFilteredRecords = selectedEmployee ? selectedEmployee.receptionRecords.filter(rec => {
    if (modalStoreFilter !== 'ALL' && rec.storeName !== modalStoreFilter) return false;
    if (modalSearchKeyword.trim()) {
      const kw = modalSearchKeyword.trim().toLowerCase();
      const matchCustomer = rec.customerName.toLowerCase().includes(kw);
      const matchStore = rec.storeName.toLowerCase().includes(kw);
      const matchTime = rec.time.toLowerCase().includes(kw);
      if (!matchCustomer && !matchStore && !matchTime) return false;
    }
    return true;
  }) : [];

  return (
    <div className="space-y-6 pb-12 animate-fade-in text-slate-800 dark:text-slate-100">
      
      {/* Global Filter Bar */}
      <div className="bg-white dark:bg-slate-800 p-4 rounded-2xl border border-slate-200/80 dark:border-slate-700 shadow-2xs space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-3">
          
          <div className="flex flex-wrap items-center gap-3">
            {/* Date Range Inputs */}
            <div className="flex items-center gap-1.5 bg-slate-50 dark:bg-slate-900 px-3 py-1.5 rounded-xl border border-slate-200/80 dark:border-slate-700">
              <Calendar size={14} className="text-slate-400 shrink-0" />
              <input 
                type="date" 
                value={startDate}
                onChange={(e) => { setStartDate(e.target.value); setSummaryPage(1); setReceptionPage(1); }}
                className="bg-transparent text-xs font-medium text-slate-700 dark:text-slate-200 outline-none w-28"
              />
              <span className="text-slate-400 text-xs">-</span>
              <input 
                type="date" 
                value={endDate}
                onChange={(e) => { setEndDate(e.target.value); setSummaryPage(1); setReceptionPage(1); }}
                className="bg-transparent text-xs font-medium text-slate-700 dark:text-slate-200 outline-none w-28"
              />
            </div>

            {/* Employee Selector (时间插件右侧员工选择框) */}
            <div className="flex items-center gap-1.5 bg-slate-50 dark:bg-slate-900 px-3 py-1.5 rounded-xl border border-slate-200/80 dark:border-slate-700">
              <Users size={14} className="text-slate-400 shrink-0" />
              <span className="text-xs text-slate-500 dark:text-slate-400 shrink-0">员工:</span>
              <select
                value={selectedEmployeeName}
                onChange={(e) => { setSelectedEmployeeName(e.target.value); setSummaryPage(1); setReceptionPage(1); }}
                className="bg-transparent text-xs font-semibold text-slate-800 dark:text-slate-200 outline-none cursor-pointer pr-1"
              >
                <option value="ALL" className="bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200">全部员工</option>
                {MOCK_EMPLOYEES_SUMMARY.map(emp => (
                  <option key={emp.id} value={emp.name} className="bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200">
                    {emp.name} ({emp.empId} - {emp.storeName})
                  </option>
                ))}
              </select>
            </div>

          </div>

          <div>
            <button 
              onClick={handleResetFilters}
              className="flex items-center gap-1 px-3 py-1.5 text-xs font-semibold text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 bg-slate-100 hover:bg-slate-200 dark:bg-slate-700 dark:hover:bg-slate-600 rounded-xl transition-colors cursor-pointer border border-slate-200/80 dark:border-slate-600 shadow-2xs"
            >
              <RotateCcw size={13} />
              <span>重置筛选</span>
            </button>
          </div>

        </div>
      </div>

      {/* KPI Metric Cards Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        <div className="bg-white dark:bg-slate-800 py-6 px-6 rounded-2xl border border-slate-200/80 dark:border-slate-700 shadow-2xs hover:shadow-md transition-all flex items-center gap-5 min-h-[116px]">
          <div className="w-13 h-13 rounded-2xl bg-blue-500/10 text-blue-600 dark:bg-blue-500/20 dark:text-blue-400 flex items-center justify-center shrink-0 border border-blue-200/50 dark:border-blue-800/40">
            <Users size={26} />
          </div>
          <div className="space-y-1.5 flex-1 min-w-0">
            <div className="text-xs font-semibold text-slate-500 dark:text-slate-400 truncate">统计员工总数</div>
            <div className="text-3xl font-black text-slate-900 dark:text-white font-mono tracking-tight leading-none">
              {totalEmployees} <span className="text-xs font-normal text-slate-500 dark:text-slate-400 font-sans ml-1">人</span>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-800 py-6 px-6 rounded-2xl border border-slate-200/80 dark:border-slate-700 shadow-2xs hover:shadow-md transition-all flex items-center gap-5 min-h-[116px]">
          <div className="w-13 h-13 rounded-2xl bg-indigo-500/10 text-indigo-600 dark:bg-indigo-500/20 dark:text-indigo-400 flex items-center justify-center shrink-0 border border-indigo-200/50 dark:border-indigo-800/40">
            <Mic size={26} />
          </div>
          <div className="space-y-1.5 flex-1 min-w-0">
            <div className="text-xs font-semibold text-slate-500 dark:text-slate-400 truncate">质检接待总场次</div>
            <div className="text-3xl font-black text-slate-900 dark:text-white font-mono tracking-tight leading-none">
              {totalQcRecords} <span className="text-xs font-normal text-slate-500 dark:text-slate-400 font-sans ml-1">次</span>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-800 py-6 px-6 rounded-2xl border border-slate-200/80 dark:border-slate-700 shadow-2xs hover:shadow-md transition-all flex items-center gap-5 min-h-[116px]">
          <div className="w-13 h-13 rounded-2xl bg-cyan-500/10 text-cyan-600 dark:bg-cyan-500/20 dark:text-cyan-400 flex items-center justify-center shrink-0 border border-cyan-200/50 dark:border-cyan-800/40">
            <Clock size={26} />
          </div>
          <div className="space-y-1.5 flex-1 min-w-0">
            <div className="text-xs font-semibold text-slate-500 dark:text-slate-400 truncate">平均接待时长</div>
            <div className="text-3xl font-black text-cyan-600 dark:text-cyan-400 font-mono tracking-tight leading-none">
              {avgReceptionMins} <span className="text-xs font-normal text-slate-500 dark:text-slate-400 font-sans ml-1">分钟</span>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-800 py-6 px-6 rounded-2xl border border-slate-200/80 dark:border-slate-700 shadow-2xs hover:shadow-md transition-all flex items-center gap-5 min-h-[116px]">
          <div className="w-13 h-13 rounded-2xl bg-rose-500/10 text-rose-600 dark:bg-rose-500/20 dark:text-rose-400 flex items-center justify-center shrink-0 border border-rose-200/50 dark:border-rose-800/40">
            <Award size={26} />
          </div>
          <div className="space-y-1.5 flex-1 min-w-0">
            <div className="text-xs font-semibold text-slate-500 dark:text-slate-400 truncate">全员平均汇总执行率</div>
            <div className="text-3xl font-black text-rose-600 dark:text-rose-400 font-mono tracking-tight leading-none">
              {avgScoreNum}%
            </div>
          </div>
        </div>

      </div>

      {/* 5 Quality Check Categories Cards (Aligned with YanbaoWuyouReport) */}
      <div className="bg-white dark:bg-slate-800 p-5 rounded-2xl border border-slate-200/80 dark:border-slate-700 shadow-2xs space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <ShieldCheck size={18} className="text-blue-600 dark:text-blue-400" />
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">
              标准质检项执行情况
            </h3>
            <span className="text-xs text-slate-400 dark:text-slate-500">
              (包含5大质检阶段，共17项质检细项)
            </span>
          </div>
        </div>

        {/* 5 Category Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5">
          {MOCK_QC_CATEGORIES.map((cat) => {
            const isSelected = selectedCategoryId === cat.id;
            return (
              <div
                key={cat.id}
                onClick={() => setSelectedCategoryId(isSelected ? null : cat.id)}
                className={`p-4 rounded-xl border transition-all cursor-pointer relative overflow-hidden ${
                  isSelected
                    ? 'border-blue-500 bg-blue-50/50 dark:bg-blue-950/40 shadow-sm ring-1 ring-blue-500'
                    : 'border-slate-200/80 dark:border-slate-700/80 bg-slate-50/50 dark:bg-slate-900/40 hover:border-slate-300 dark:hover:border-slate-600'
                }`}
              >
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div>
                    <h4 className="text-xs font-bold text-slate-900 dark:text-white">
                      {cat.name}
                    </h4>
                  </div>
                  <span className={`px-2 py-0.5 text-[10px] font-semibold rounded-full ${
                    cat.isCompliance
                      ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300'
                      : 'bg-blue-100 text-blue-700 dark:bg-blue-950/60 dark:text-blue-300'
                  }`}>
                    {cat.badge}
                  </span>
                </div>

                <div className="flex items-baseline justify-between mt-3">
                  <span className="text-[11px] text-slate-500 dark:text-slate-400">平均执行率</span>
                  <span className={`text-lg font-black font-mono tracking-tight ${
                    cat.isCompliance
                      ? 'text-emerald-600 dark:text-emerald-400'
                      : 'text-blue-600 dark:text-blue-400'
                  }`}>
                    {cat.rate}
                  </span>
                </div>

                {/* Progress bar */}
                <div className="w-full bg-slate-200 dark:bg-slate-700 h-1.5 rounded-full overflow-hidden mt-2">
                  <div 
                    className={`h-full rounded-full ${cat.isCompliance ? 'bg-emerald-500' : 'bg-blue-600'}`}
                    style={{ width: `${cat.rateNum}%` }}
                  />
                </div>

                <div className="flex items-center justify-between text-[10px] text-slate-400 mt-2">
                  <span>点击查看子项</span>
                  {isSelected ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
                </div>
              </div>
            );
          })}
        </div>

        {/* Sub-item Details Dropdown Grid */}
        {selectedCategoryId && (() => {
          const activeCategory = MOCK_QC_CATEGORIES.find(c => c.id === selectedCategoryId);
          if (!activeCategory) return null;

          return (
            <div className="p-4 bg-blue-50/40 dark:bg-blue-950/20 rounded-xl border border-blue-200/60 dark:border-blue-800/40 space-y-3 animate-fade-in">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Layers size={16} className="text-blue-600 dark:text-blue-400" />
                  <span className="text-sm font-bold text-slate-900 dark:text-white">
                    【{activeCategory.name}】二级质检细项标准
                  </span>
                  <span className="text-xs text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/60 px-2 py-0.5 rounded-md border border-blue-200/60 dark:border-blue-800 font-medium">
                    共 {activeCategory.subItems.length} 项质检点
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

      {/* Main Employee Execution Aggregation Table - 2 Tabs: 汇总聚合 & 接待明细 */}
      <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200/80 dark:border-slate-700 shadow-2xs overflow-hidden">
        
        {/* Table Header Controls */}
        <div className="p-4 border-b border-slate-100 dark:border-slate-700/80 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <BarChart2 size={18} className="text-blue-600 dark:text-blue-400" />
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">
              员工质检数据明细
            </h3>
            <span className="text-xs text-slate-400 dark:text-slate-500 font-normal">
              (与门店报告质检项保持一致)
            </span>
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
                alert('已导出员工质检明细数据报表 (CSV)');
              }}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-700 dark:text-slate-200 bg-slate-100 hover:bg-slate-200 dark:bg-slate-700 dark:hover:bg-slate-600 rounded-lg transition-colors cursor-pointer border border-slate-200/80 dark:border-slate-600 shadow-2xs"
            >
              <Download size={14} className="text-slate-500 dark:text-slate-400" />
              <span>下载明细</span>
            </button>
          </div>
        </div>

        {/* Tab 1: 汇总聚合 (Employee Dimension Summary Aggregation with exact Yanbao QC items) */}
        {detailTab === 'summary' && (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-slate-700 dark:bg-slate-900 text-white font-medium">
                  <th className="py-3.5 px-3 font-semibold text-center border-r border-slate-600/50 w-12 whitespace-nowrap">序号</th>
                  <th className="py-3.5 px-3 font-semibold border-r border-slate-600/50 whitespace-nowrap">员工姓名</th>
                  <th className="py-3.5 px-3 font-semibold border-r border-slate-600/50 whitespace-nowrap">工号</th>
                  <th className="py-3.5 px-3 font-semibold border-r border-slate-600/50 whitespace-nowrap">所属门店</th>
                  <th className="py-3.5 px-3 font-semibold border-r border-slate-600/50 text-right whitespace-nowrap">接待场次</th>
                  <th className="py-3.5 px-3 font-semibold border-r border-slate-600/50 text-right whitespace-nowrap">平均接待时长</th>
                  <th className="py-3.5 px-3 font-semibold text-center text-blue-200 whitespace-nowrap bg-blue-950/60 border-r border-slate-600/50">流程综合执行率</th>

                  {/* 1. 服务与信任建立 */}
                  <th className="py-3.5 px-3 font-semibold text-center text-blue-200 whitespace-nowrap bg-blue-900/50 border-r border-slate-600/50">服务与信任建立（一级）</th>
                  <th className="py-3.5 px-3 font-semibold border-r border-slate-600/50 text-right whitespace-nowrap">身份及服务内容介绍</th>
                  <th className="py-3.5 px-3 font-semibold border-r border-slate-600/50 text-right whitespace-nowrap">新车使用注意事项</th>
                  <th className="py-3.5 px-3 font-semibold border-r border-slate-600/50 text-right whitespace-nowrap">保养周期与质保期检查</th>

                  {/* 2. 延保需求建立 */}
                  <th className="py-3.5 px-3 font-semibold text-center text-blue-200 whitespace-nowrap bg-blue-900/50 border-r border-slate-600/50">延保需求建立（一级）</th>
                  <th className="py-3.5 px-3 font-semibold border-r border-slate-600/50 text-right whitespace-nowrap">车龄老化磨损风险</th>
                  <th className="py-3.5 px-3 font-semibold border-r border-slate-600/50 text-right whitespace-nowrap">核心部件维修成本</th>
                  <th className="py-3.5 px-3 font-semibold border-r border-slate-600/50 text-right whitespace-nowrap">原厂质保边界</th>

                  {/* 3. 延保方案讲解 */}
                  <th className="py-3.5 px-3 font-semibold text-center text-blue-200 whitespace-nowrap bg-blue-900/50 border-r border-slate-600/50">延保方案讲解（一级）</th>
                  <th className="py-3.5 px-3 font-semibold border-r border-slate-600/50 text-right whitespace-nowrap">延保产品导入</th>
                  <th className="py-3.5 px-3 font-semibold border-r border-slate-600/50 text-right whitespace-nowrap">延保保障范围与费用</th>
                  <th className="py-3.5 px-3 font-semibold border-r border-slate-600/50 text-right whitespace-nowrap">用车年限与方案匹配</th>

                  {/* 4. 异议处理与成交 */}
                  <th className="py-3.5 px-3 font-semibold text-center text-blue-200 whitespace-nowrap bg-blue-900/50 border-r border-slate-600/50">异议处理与成交（一级）</th>
                  <th className="py-3.5 px-3 font-semibold border-r border-slate-600/50 text-right whitespace-nowrap">费用异议处理</th>
                  <th className="py-3.5 px-3 font-semibold border-r border-slate-600/50 text-right whitespace-nowrap">换车异议处理</th>
                  <th className="py-3.5 px-3 font-semibold border-r border-slate-600/50 text-right whitespace-nowrap">延保方案价值强化</th>
                  <th className="py-3.5 px-3 font-semibold border-r border-slate-600/50 text-right whitespace-nowrap">方案确认</th>
                  <th className="py-3.5 px-3 font-semibold border-r border-slate-600/50 text-right whitespace-nowrap">成交促成</th>
                  <th className="py-3.5 px-3 font-semibold border-r border-slate-600/50 text-right whitespace-nowrap">逼单动作</th>

                  {/* 5. 合规风险 */}
                  <th className="py-3.5 px-3 font-semibold text-center text-emerald-200 whitespace-nowrap bg-emerald-950/60 border-r border-slate-600/50">合规风险（一级）</th>
                  <th className="py-3.5 px-3 font-semibold border-r border-slate-600/50 text-right whitespace-nowrap">保养免费过度承诺</th>
                  <th className="py-3.5 px-3 font-semibold border-r border-slate-600/50 text-right whitespace-nowrap">保障范围过度承诺</th>

                  <th className="py-3.5 px-3 font-semibold text-center w-28 whitespace-nowrap">接待明细</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-700/60 text-slate-700 dark:text-slate-200">
                {paginatedEmployees.length > 0 ? (
                  paginatedEmployees.map((row, idx) => {
                    const displayIndex = (safeSummaryPage - 1) * summaryPageSize + idx + 1;
                    return (
                      <tr 
                        key={row.id} 
                        className="hover:bg-blue-50/40 dark:hover:bg-slate-700/40 transition-colors"
                      >
                        <td className="py-3.5 px-3 text-center font-mono text-slate-400 whitespace-nowrap">{displayIndex}</td>
                        
                        {/* Employee Name */}
                        <td className="py-3.5 px-3 whitespace-nowrap">
                          <button 
                            onClick={() => setSelectedEmployee(row)}
                            className="font-bold text-blue-600 dark:text-blue-400 hover:underline cursor-pointer text-left"
                          >
                            {row.name}
                          </button>
                        </td>

                        <td className="py-3.5 px-3 font-mono text-slate-500 dark:text-slate-400 whitespace-nowrap">{row.empId}</td>
                        <td className="py-3.5 px-3 font-medium text-slate-800 dark:text-slate-200 whitespace-nowrap">{row.storeName}</td>

                        <td className="py-3.5 px-3 font-mono text-right font-bold text-slate-900 dark:text-white whitespace-nowrap">{row.totalQcRecords}</td>
                        <td className="py-3.5 px-3 font-mono text-right text-slate-600 dark:text-slate-300 whitespace-nowrap">{row.avgDurationMins} 分钟</td>

                        {/* Overall Score */}
                        <td className="py-3.5 px-3 text-center font-mono font-black text-rose-600 dark:text-rose-400 bg-rose-50/50 dark:bg-rose-950/20 whitespace-nowrap">
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

                        <td className="py-3.5 px-3 text-center whitespace-nowrap">
                          <button
                            onClick={() => setSelectedEmployee(row)}
                            className="inline-flex items-center gap-1 px-2.5 py-1 text-[11px] font-semibold text-blue-600 dark:text-blue-400 bg-blue-50 hover:bg-blue-100 dark:bg-blue-950/40 dark:hover:bg-blue-900/60 border border-blue-200 dark:border-blue-800/60 rounded-lg transition-colors cursor-pointer"
                          >
                            <span>查看明细</span>
                            <ChevronRight size={12} />
                          </button>
                        </td>

                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan={25} className="py-12 text-center text-slate-400">
                      未找到符合条件的员工质检明细数据
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}

        {/* Tab 2: 接待明细 (All individual receptions with full 17 check items & checkmark icons) */}
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
                {paginatedReceptions.length > 0 ? (
                  paginatedReceptions.map((row, idx) => {
                    const displayIndex = (safeReceptionPage - 1) * receptionPageSize + idx + 1;
                    return (
                      <tr key={row.id} className="hover:bg-slate-50/80 dark:hover:bg-slate-700/40 transition-colors">
                        <td className="py-3.5 px-3 text-center font-mono text-slate-400 whitespace-nowrap">{displayIndex}</td>
                        <td className="py-3.5 px-2 text-center whitespace-nowrap">
                          <button
                            onClick={() => {
                              setPanoramaRecord({
                                id: row.id,
                                customerName: row.customerName || '王先生',
                                salesperson: row.empName,
                                storeName: row.storeName,
                                time: row.time,
                                durationMins: row.durationMins,
                                executionScore: row.executionScore,
                                businessType: row.businessType,
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
                        <td className="py-3.5 px-3 font-mono text-slate-600 dark:text-slate-400 whitespace-nowrap">{row.time}</td>
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
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan={25} className="py-12 text-center text-slate-400">
                      未找到符合条件的接待明细记录
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}

        {/* Footer Pagination Controls */}
        <div className="px-5 py-3.5 bg-slate-50/70 dark:bg-slate-900/60 border-t border-slate-200/80 dark:border-slate-700 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-600 dark:text-slate-300">
          <div className="flex items-center gap-3">
            <span>
              共 <strong className="text-blue-600 dark:text-blue-400 font-bold">
                {detailTab === 'summary' ? filteredEmployees.length : allFilteredReceptions.length}
              </strong> 条记录
            </span>
            <div className="flex items-center gap-1">
              <select
                value={detailTab === 'summary' ? summaryPageSize : receptionPageSize}
                onChange={(e) => {
                  const newSize = Number(e.target.value);
                  if (detailTab === 'summary') {
                    setSummaryPageSize(newSize);
                    setSummaryPage(1);
                  } else {
                    setReceptionPageSize(newSize);
                    setReceptionPage(1);
                  }
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
              disabled={detailTab === 'summary' ? safeSummaryPage <= 1 : safeReceptionPage <= 1}
              onClick={() => {
                if (detailTab === 'summary') {
                  setSummaryPage(p => Math.max(1, p - 1));
                } else {
                  setReceptionPage(p => Math.max(1, p - 1));
                }
              }}
              className="px-2.5 py-1 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors flex items-center gap-1"
            >
              <ChevronLeft size={13} />
              <span>上一页</span>
            </button>

            {Array.from({ length: detailTab === 'summary' ? totalSummaryPages : totalReceptionPages }, (_, i) => i + 1).map(p => {
              const currentPage = detailTab === 'summary' ? safeSummaryPage : safeReceptionPage;
              return (
                <button
                  key={p}
                  onClick={() => {
                    if (detailTab === 'summary') {
                      setSummaryPage(p);
                    } else {
                      setReceptionPage(p);
                    }
                  }}
                  className={`min-w-[28px] h-7 px-2 text-xs rounded-lg font-medium transition-colors ${
                    currentPage === p
                      ? 'bg-blue-600 text-white font-bold shadow-xs'
                      : 'border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700'
                  }`}
                >
                  {p}
                </button>
              );
            })}

            <button
              disabled={detailTab === 'summary' ? safeSummaryPage >= totalSummaryPages : safeReceptionPage >= totalReceptionPages}
              onClick={() => {
                if (detailTab === 'summary') {
                  setSummaryPage(p => Math.min(totalSummaryPages, p + 1));
                } else {
                  setReceptionPage(p => Math.min(totalReceptionPages, p + 1));
                }
              }}
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
                max={detailTab === 'summary' ? totalSummaryPages : totalReceptionPages}
                value={detailTab === 'summary' ? summaryJumpPage : receptionJumpPage}
                onChange={(e) => {
                  if (detailTab === 'summary') {
                    setSummaryJumpPage(e.target.value);
                  } else {
                    setReceptionJumpPage(e.target.value);
                  }
                }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    const totalP = detailTab === 'summary' ? totalSummaryPages : totalReceptionPages;
                    const rawVal = detailTab === 'summary' ? summaryJumpPage : receptionJumpPage;
                    const val = parseInt(rawVal);
                    if (val >= 1 && val <= totalP) {
                      if (detailTab === 'summary') {
                        setSummaryPage(val);
                        setSummaryJumpPage('');
                      } else {
                        setReceptionPage(val);
                        setReceptionJumpPage('');
                      }
                    }
                  }
                }}
                placeholder={String(detailTab === 'summary' ? safeSummaryPage : safeReceptionPage)}
                className="w-11 px-1.5 py-1 text-center bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-xs outline-none text-slate-800 dark:text-slate-200"
              />
              <span>页</span>
            </div>
          </div>
        </div>
      </div>

      {/* DRILLDOWN MODAL: Employee Single Reception Details List with full 5 QC Categories & 17 Sub-items */}
      {selectedEmployee && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-2xl w-full max-w-6xl max-h-[92vh] overflow-hidden flex flex-col">
            
            {/* Modal Header */}
            <div className="p-5 border-b border-slate-200 dark:border-slate-700 flex items-center justify-between bg-slate-50 dark:bg-slate-900/50">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center font-bold text-lg shadow-xs">
                  {selectedEmployee.name.charAt(0)}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                      {selectedEmployee.name} - 每一条接待明细与质检项结果
                    </h2>
                    <span className="font-mono text-xs text-slate-500 bg-slate-200 dark:bg-slate-700 px-2 py-0.5 rounded">
                      {selectedEmployee.empId}
                    </span>
                    {getBizBadge(selectedEmployee.businessType)}
                  </div>
                  <div className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                    归属主门店：{selectedEmployee.storeName} | 统计范围：{startDate} ~ {endDate} | 平均接待时长：{selectedEmployee.avgDurationMins}分钟 | 流程综合执行率：<strong className="text-rose-600 dark:text-rose-400 font-mono">{selectedEmployee.overallExecutionRate}</strong>
                  </div>
                </div>
              </div>

              <button 
                onClick={() => { setSelectedEmployee(null); setModalStoreFilter('ALL'); setModalSearchKeyword(''); }}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-200/60 dark:hover:bg-slate-700 transition-colors cursor-pointer"
              >
                <X size={20} />
              </button>
            </div>

            {/* Modal Controls & Summary Bar */}
            <div className="p-4 bg-slate-100/70 dark:bg-slate-900/30 border-b border-slate-200 dark:border-slate-700/80 flex flex-wrap items-center justify-between gap-3 text-xs">
              
              <div className="flex flex-wrap items-center gap-3">
                {/* Filter by store in modal */}
                <div className="flex items-center gap-1.5 bg-white dark:bg-slate-800 px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700">
                  <Store size={13} className="text-slate-400" />
                  <span className="text-slate-500">门店过滤:</span>
                  <select 
                    value={modalStoreFilter}
                    onChange={(e) => setModalStoreFilter(e.target.value)}
                    className="bg-transparent text-slate-800 dark:text-slate-200 font-medium outline-none cursor-pointer"
                  >
                    {MOCK_STORES.map(s => (
                      <option key={s.id} value={s.id === 'ALL' ? 'ALL' : s.name} className="bg-white dark:bg-slate-800">
                        {s.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Search within records */}
                <div className="flex items-center gap-1.5 bg-white dark:bg-slate-800 px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 w-52">
                  <Search size={13} className="text-slate-400" />
                  <input 
                    type="text" 
                    placeholder="搜索时间/门店..."
                    value={modalSearchKeyword}
                    onChange={(e) => setModalSearchKeyword(e.target.value)}
                    className="bg-transparent text-slate-800 dark:text-slate-200 outline-none w-full"
                  />
                </div>
              </div>

              <div className="text-slate-500 dark:text-slate-400">
                共找到 <strong className="text-slate-900 dark:text-white font-mono">{modalFilteredRecords.length}</strong> 条录音接待明细
              </div>

            </div>

            {/* Modal Single Reception List */}
            <div className="p-6 overflow-y-auto space-y-4 flex-1">
              
              {modalFilteredRecords.length > 0 ? (
                modalFilteredRecords.map((rec) => (
                  <div 
                    key={rec.id}
                    className="bg-slate-50 dark:bg-slate-900/50 rounded-2xl border border-slate-200/80 dark:border-slate-700 p-4 hover:border-blue-300 dark:hover:border-blue-700 transition-all space-y-3.5"
                  >
                    {/* Single Reception Header */}
                    <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-200/60 dark:border-slate-700/60 pb-2.5">
                      <div className="flex items-center gap-2.5">
                        {/* Store Badge */}
                        <span className="px-2.5 py-1 rounded-lg font-bold text-xs bg-blue-600 text-white flex items-center gap-1 shadow-2xs">
                          <Store size={12} />
                          <span>{rec.storeName}</span>
                        </span>

                        <span className="font-mono text-xs font-semibold text-slate-700 dark:text-slate-300">
                          {rec.time} ~ {rec.endTime.split(' ')[1] || rec.endTime}
                        </span>

                        {getBizBadge(rec.businessType)}
                      </div>

                      <div className="flex items-center gap-3">
                        <span className="text-xs text-slate-500 font-mono">
                          时长: <strong className="text-slate-800 dark:text-slate-200">{rec.durationMins}</strong> 分钟
                        </span>

                        <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${
                          rec.isDeal 
                            ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300 border border-emerald-300/50' 
                            : 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300 border border-slate-200 dark:border-slate-700'
                        }`}>
                          是否成交: {rec.isDeal ? '是' : '否'}
                        </span>

                        <span className={`px-2.5 py-0.5 rounded-full text-xs font-mono font-black ${
                          rec.executionScore >= 80 
                            ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300 border border-emerald-300/50' 
                            : 'bg-rose-100 text-rose-800 dark:bg-rose-950/60 dark:text-rose-300 border border-rose-300/50'
                        }`}>
                          综合执行率: {rec.executionScore}%
                        </span>

                        <button
                          onClick={() => {
                            setPanoramaRecord({
                              id: rec.id,
                              customerName: rec.customerName,
                              salesperson: selectedEmployee?.name || '张伟',
                              storeName: rec.storeName,
                              time: rec.time,
                              durationMins: rec.durationMins,
                              executionScore: rec.executionScore,
                              businessType: rec.businessType,
                              carModel: '宝马 5系 530Li'
                            });
                          }}
                          className="flex items-center gap-1 px-2.5 py-1 text-[11px] font-semibold text-blue-600 dark:text-blue-400 bg-blue-50 hover:bg-blue-100 dark:bg-blue-950/40 dark:hover:bg-blue-900/60 rounded-lg border border-blue-200 dark:border-blue-800/60 cursor-pointer transition-all hover:shadow-2xs"
                        >
                          <Volume2 size={12} />
                          <span>质检录音</span>
                        </button>
                      </div>
                    </div>

                    {/* Audio Player simulation if clicked */}
                    {playingAudioId === rec.id && (
                      <div className="bg-blue-50/80 dark:bg-blue-950/30 p-2.5 rounded-xl border border-blue-200 dark:border-blue-800/50 flex items-center justify-between gap-3 text-xs animate-fade-in">
                        <div className="flex items-center gap-2">
                          <button className="w-7 h-7 rounded-full bg-blue-600 text-white flex items-center justify-center cursor-pointer">
                            <Play size={12} />
                          </button>
                          <span className="font-mono text-blue-900 dark:text-blue-200">00:12 / {rec.durationMins}:00</span>
                        </div>
                        <div className="flex-1 bg-blue-200 dark:bg-blue-900 h-1.5 rounded-full overflow-hidden">
                          <div className="bg-blue-600 h-full w-1/4"></div>
                        </div>
                        <span className="text-[11px] text-blue-700 dark:text-blue-300">高清工牌降噪双工音轨</span>
                      </div>
                    )}

                    {/* 5 QC Categories & 17 Quality Inspection Items with Category Grouping */}
                    <div className="space-y-2.5">
                      
                      {/* 1. 服务与信任建立 */}
                      <div className="bg-white dark:bg-slate-800/90 p-2.5 rounded-xl border border-slate-200/70 dark:border-slate-700/80">
                        <div className="flex items-center justify-between mb-1.5">
                          <span className="font-bold text-[11px] text-blue-600 dark:text-blue-400">1. 服务与信任建立 ({rec.trustRate})</span>
                          <span className="text-[10px] text-slate-400">3项质检</span>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                          <ItemCheckBadge label="身份及服务内容介绍" isPassed={rec.trustSub1Hit} />
                          <ItemCheckBadge label="新车使用注意事项" isPassed={rec.trustSub2Hit} />
                          <ItemCheckBadge label="保养周期与质保期检查" isPassed={rec.trustSub3Hit} />
                        </div>
                      </div>

                      {/* 2. 延保需求建立 */}
                      <div className="bg-white dark:bg-slate-800/90 p-2.5 rounded-xl border border-slate-200/70 dark:border-slate-700/80">
                        <div className="flex items-center justify-between mb-1.5">
                          <span className="font-bold text-[11px] text-blue-600 dark:text-blue-400">2. 延保需求建立 ({rec.demandRate})</span>
                          <span className="text-[10px] text-slate-400">3项质检</span>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                          <ItemCheckBadge label="车龄老化磨损风险" isPassed={rec.demandSub1Hit} />
                          <ItemCheckBadge label="核心部件维修成本" isPassed={rec.demandSub2Hit} />
                          <ItemCheckBadge label="原厂质保边界" isPassed={rec.demandSub3Hit} />
                        </div>
                      </div>

                      {/* 3. 延保方案讲解 */}
                      <div className="bg-white dark:bg-slate-800/90 p-2.5 rounded-xl border border-slate-200/70 dark:border-slate-700/80">
                        <div className="flex items-center justify-between mb-1.5">
                          <span className="font-bold text-[11px] text-blue-600 dark:text-blue-400">3. 延保方案讲解 ({rec.planRate})</span>
                          <span className="text-[10px] text-slate-400">3项质检</span>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                          <ItemCheckBadge label="延保产品导入" isPassed={rec.planSub1Hit} />
                          <ItemCheckBadge label="延保保障范围与费用" isPassed={rec.planSub2Hit} />
                          <ItemCheckBadge label="用车年限与方案匹配" isPassed={rec.planSub3Hit} />
                        </div>
                      </div>

                      {/* 4. 异议处理与成交 */}
                      <div className="bg-white dark:bg-slate-800/90 p-2.5 rounded-xl border border-slate-200/70 dark:border-slate-700/80">
                        <div className="flex items-center justify-between mb-1.5">
                          <span className="font-bold text-[11px] text-blue-600 dark:text-blue-400">4. 异议处理与成交 ({rec.objectionRate})</span>
                          <span className="text-[10px] text-slate-400">6项质检</span>
                        </div>
                        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
                          <ItemCheckBadge label="费用异议处理" isPassed={rec.objSub1Hit} />
                          <ItemCheckBadge label="换车异议处理" isPassed={rec.objSub2Hit} />
                          <ItemCheckBadge label="延保方案价值强化" isPassed={rec.objSub3Hit} />
                          <ItemCheckBadge label="方案确认" isPassed={rec.objSub4Hit} />
                          <ItemCheckBadge label="成交促成" isPassed={rec.objSub5Hit} />
                          <ItemCheckBadge label="逼单动作" isPassed={rec.objSub6Hit} />
                        </div>
                      </div>

                      {/* 5. 合规风险 */}
                      <div className="bg-white dark:bg-slate-800/90 p-2.5 rounded-xl border border-emerald-200/70 dark:border-emerald-800/80">
                        <div className="flex items-center justify-between mb-1.5">
                          <span className="font-bold text-[11px] text-emerald-600 dark:text-emerald-400">5. 合规风险 ({rec.complianceRate})</span>
                          <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-medium">2项合规质检</span>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          <ItemCheckBadge label="保养免费过度承诺" isPassed={rec.compSub1Hit} />
                          <ItemCheckBadge label="保障范围过度承诺" isPassed={rec.compSub2Hit} />
                        </div>
                      </div>

                    </div>

                  </div>
                ))
              ) : (
                <div className="py-12 text-center text-slate-400">
                  该条件下未找到任何接待明细
                </div>
              )}

            </div>

            {/* Modal Footer */}
            <div className="p-4 border-t border-slate-200 dark:border-slate-700 flex items-center justify-between bg-slate-50 dark:bg-slate-900/50 text-xs">
              <span className="text-slate-500">
                数据来源：智能工牌实时音频质检引擎 (全量明细自动存证，与门店报告质检维度严格对齐)
              </span>
              <button 
                onClick={() => { setSelectedEmployee(null); setModalStoreFilter('ALL'); setModalSearchKeyword(''); }}
                className="px-4 py-1.5 font-semibold bg-slate-200 hover:bg-slate-300 dark:bg-slate-700 dark:hover:bg-slate-600 text-slate-800 dark:text-slate-100 rounded-xl transition-colors cursor-pointer"
              >
                关闭
              </button>
            </div>

          </div>
        </div>
      )}

      {/* Panorama Quality Inspection Detail Modal */}
      <QcPanoramaDetailModal
        isOpen={!!panoramaRecord}
        onClose={() => setPanoramaRecord(null)}
        recordData={panoramaRecord}
      />

    </div>
  );
};

// Internal component for quality check status badges
const ItemCheckBadge: React.FC<{ label: string; isPassed: boolean }> = ({ label, isPassed }) => {
  return (
    <div className={`p-2 rounded-xl border text-center flex items-center justify-between gap-1 text-[11px] font-medium ${
      isPassed 
        ? 'bg-emerald-50/70 text-emerald-800 dark:bg-emerald-950/30 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800/40' 
        : 'bg-rose-50/70 text-rose-800 dark:bg-rose-950/30 dark:text-rose-300 border-rose-200 dark:border-rose-800/40'
    }`}>
      <span className="truncate">{label}</span>
      {isPassed ? (
        <CheckCircle2 size={13} className="text-emerald-600 dark:text-emerald-400 shrink-0" />
      ) : (
        <XCircle size={13} className="text-rose-600 dark:text-rose-400 shrink-0" />
      )}
    </div>
  );
};

export default YanbaoWuyouEmployeeDetail;
