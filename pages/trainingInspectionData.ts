// Type definitions and dataset for Training Inspection Dashboard (转训检核看板)

export interface OrgNode {
  name: string;
  subRegions?: {
    name: string;
    stores: { code: string; name: string }[];
  }[];
}

export const ORG_HIERARCHY: Record<string, {
  name: string;
  districts: Record<string, { code: string; name: string }[]>;
}> = {
  '华东大区': {
    name: '华东大区',
    districts: {
      '上海小区': [
        { code: 'SH001', name: '上海凯迪汽车销售服务有限公司' },
        { code: 'SH002', name: '上海永达凯迪拉克体验中心' },
        { code: 'SH003', name: '上海东昌凯迪拉克旗舰店' },
        { code: 'SH004', name: '上海绿地凯迪拉克销售服务中心' }
      ],
      '浙江小区': [
        { code: 'ZJ001', name: '杭州康桥凯迪拉克品鉴中心' },
        { code: 'ZJ002', name: '宁波凯迪汽车销售有限公司' },
        { code: 'ZJ003', name: '温州申腾凯迪拉克服务中心' }
      ],
      '江苏小区': [
        { code: 'JS001', name: '南京天泓凯迪拉克4S店' },
        { code: 'JS002', name: '苏州建融凯迪拉克销售中心' },
        { code: 'JS003', name: '无锡东方凯迪拉克旗舰体验中心' }
      ]
    }
  },
  '华北大区': {
    name: '华北大区',
    districts: {
      '北京小区': [
        { code: 'BJ001', name: '北京达世行凯迪拉克中心' },
        { code: 'BJ002', name: '北京运通凯迪汽车销售服务有限公司' },
        { code: 'BJ003', name: '北京首创凯迪拉克体验店' }
      ],
      '天津小区': [
        { code: 'TJ001', name: '天津市浩物凯迪拉克销售中心' },
        { code: 'TJ002', name: '天津空港凯迪汽车销售服务店' }
      ],
      '河北小区': [
        { code: 'HB001', name: '石家庄盛世凯迪拉克4S店' },
        { code: 'HB002', name: '唐山庞大凯迪汽车销售店' }
      ]
    }
  },
  '华南大区': {
    name: '华南大区',
    districts: {
      '广佛小区': [
        { code: 'GD001', name: '广州安骅凯迪汽车销售服务有限公司' },
        { code: 'GD002', name: '佛山时利和凯迪拉克品鉴店' }
      ],
      '深圳小区': [
        { code: 'SZ001', name: '深圳标远凯迪拉克旗舰中心' },
        { code: 'SZ002', name: '深圳红彤凯迪汽车销售有限公司' }
      ]
    }
  },
  '华西大区': {
    name: '华西大区',
    districts: {
      '四川小区': [
        { code: 'SC001', name: '成都新东信凯迪拉克销售中心' },
        { code: 'SC002', name: '成都三和凯迪汽车服务店' }
      ],
      '重庆小区': [
        { code: 'CQ001', name: '重庆美威凯迪拉克品鉴中心' }
      ]
    }
  }
};

export interface InspectionTheme {
  id: string;
  name: string;
  totalItems: number;
}

export const INSPECTION_THEMES: InspectionTheme[] = [
  { id: 't-1', name: 'XT5 PHEV对比宝马iX3', totalItems: 13 },
  { id: 't-2', name: 'XT5焕新上市核心话术转训', totalItems: 12 },
  { id: 't-3', name: 'CT5核心产品力强化转训', totalItems: 10 },
  { id: 't-4', name: '新能源IQ纯电序列流程转训', totalItems: 14 }
];

export interface InspectionItemMetric {
  id: number;
  numberStr: string;
  name: string;
  rate: number; // 0 - 100
  rateStr: string;
  category: string; // '对比思路' | '攻击' | '防守' | '绝杀'
}

export const INSPECTION_13_ITEMS: InspectionItemMetric[] = [
  { id: 1, numberStr: '#1', name: '竞品基本信息', rate: 96.7, rateStr: '96.7%', category: '对比思路' },
  { id: 2, numberStr: '#2', name: '对比核心思路', rate: 98.3, rateStr: '98.3%', category: '对比思路' },
  { id: 3, numberStr: '#3', name: '攻击', rate: 98.3, rateStr: '98.3%', category: '攻击' },
  { id: 4, numberStr: '#4', name: '设计翻车', rate: 97.5, rateStr: '97.5%', category: '攻击' },
  { id: 5, numberStr: '#5', name: '动力成短板', rate: 97.5, rateStr: '97.5%', category: '攻击' },
  { id: 6, numberStr: '#6', name: '固定阻尼悬架', rate: 95.8, rateStr: '95.8%', category: '防守' },
  { id: 7, numberStr: '#7', name: '补能焦虑', rate: 98.3, rateStr: '98.3%', category: '防守' },
  { id: 8, numberStr: '#8', name: '视平线全景显示', rate: 95.0, rateStr: '95.0%', category: '防守' },
  { id: 9, numberStr: '#9', name: '智能化', rate: 94.2, rateStr: '94.2%', category: '绝杀' },
  { id: 10, numberStr: '#10', name: '阉割版智驾硬件', rate: 94.2, rateStr: '94.2%', category: '绝杀' },
  { id: 11, numberStr: '#11', name: '算力差距', rate: 95.8, rateStr: '95.8%', category: '绝杀' },
  { id: 12, numberStr: '#12', name: '二次收费割韭菜', rate: 94.2, rateStr: '94.2%', category: '绝杀' },
  { id: 13, numberStr: '#13', name: '智舱落后', rate: 95.8, rateStr: '95.8%', category: '绝杀' },
];

export interface StoreInspectionRecord {
  id: string;
  date: string;
  region: string;
  district: string;
  storeCode: string;
  storeName: string;
  sessions: number;
  startTime: string;
  endTime: string;
  videoMatchRate: number; // 视频比对录音匹配率
  photoMatchRate: number; // 参训照片与人数匹配率
  attendanceRate?: number; // 参训率
  totalExecutionRate: number; // 转训检核总执行率
  
  // Abnormal flags
  isVideoAbnormal?: boolean;
  isPhotoAbnormal?: boolean;
  videoStatus?: '异常' | '正常';
  systemFillCount?: number;
  photoDetectedCount?: number;

  // Level 1 Composite Rates
  comp1_contrast: number; // 对比思路总转训率
  comp2_attack: number;   // 攻击总转训率
  comp3_defense: number;  // 防守总转训率
  comp4_kill: number;     // 绝杀总转训率

  // 13 detailed item rates
  item1: number; // 竞品基本信息
  item2: number; // 对比核心思路
  item3: number; // 攻击
  item4: number; // 设计翻车
  item5: number; // 动力成短板
  item6: number; // 固定阻尼悬架
  item7: number; // 补能焦虑
  item8: number; // 视平线全景显示
  item9: number; // 智能化
  item10: number; // 阉割版智驾硬件
  item11: number; // 算力差距
  item12: number; // 二次收费割韭菜
  item13: number; // 智舱落后
}

// Generate rich, consistent store inspection dataset
export const GENERATED_STORE_RECORDS: StoreInspectionRecord[] = [
  {
    id: 'REC-001',
    date: '2026-09-01',
    region: '华东大区',
    district: '上海小区',
    storeCode: 'SH001',
    storeName: '上海凯迪汽车销售服务有限公司',
    sessions: 2,
    startTime: '2026-09-01 09:00',
    endTime: '2026-09-01 10:30',
    videoMatchRate: 96.8,
    photoMatchRate: 100.0,
    totalExecutionRate: 96.2,
    comp1_contrast: 97.5,
    item1: 96.7,
    item2: 98.3,
    comp2_attack: 97.8,
    item3: 98.3,
    item4: 97.5,
    item5: 97.5,
    comp3_defense: 96.4,
    item6: 95.8,
    item7: 98.3,
    item8: 95.0,
    comp4_kill: 94.8,
    item9: 94.2,
    item10: 94.2,
    item11: 95.8,
    item12: 94.2,
    item13: 95.8,
  },
  {
    id: 'REC-002',
    date: '2026-09-01',
    region: '华东大区',
    district: '上海小区',
    storeCode: 'SH002',
    storeName: '上海永达凯迪拉克体验中心',
    sessions: 3,
    startTime: '2026-09-01 10:00',
    endTime: '2026-09-01 11:45',
    videoMatchRate: 98.5,
    photoMatchRate: 100.0,
    totalExecutionRate: 97.5,
    comp1_contrast: 98.0,
    item1: 97.8,
    item2: 98.2,
    comp2_attack: 98.3,
    item3: 99.0,
    item4: 98.0,
    item5: 98.0,
    comp3_defense: 97.2,
    item6: 96.5,
    item7: 98.6,
    item8: 96.5,
    comp4_kill: 96.5,
    item9: 95.5,
    item10: 96.2,
    item11: 97.0,
    item12: 96.0,
    item13: 97.8,
  },
  {
    id: 'REC-003',
    date: '2026-09-01',
    region: '华东大区',
    district: '上海小区',
    storeCode: 'SH003',
    storeName: '上海东昌凯迪拉克旗舰店',
    sessions: 1,
    startTime: '2026-09-01 14:00',
    endTime: '2026-09-01 15:20',
    videoMatchRate: 68.5, // Abnormal video
    photoMatchRate: 100.0,
    totalExecutionRate: 91.4,
    isVideoAbnormal: true,
    videoStatus: '异常',
    comp1_contrast: 93.0,
    item1: 92.0,
    item2: 94.0,
    comp2_attack: 92.5,
    item3: 93.0,
    item4: 92.5,
    item5: 92.0,
    comp3_defense: 91.0,
    item6: 90.5,
    item7: 93.0,
    item8: 89.5,
    comp4_kill: 89.8,
    item9: 88.5,
    item10: 89.0,
    item11: 91.0,
    item12: 89.5,
    item13: 91.0,
  },
  {
    id: 'REC-004',
    date: '2026-09-01',
    region: '华东大区',
    district: '浙江小区',
    storeCode: 'ZJ001',
    storeName: '杭州康桥凯迪拉克品鉴中心',
    sessions: 2,
    startTime: '2026-09-01 13:30',
    endTime: '2026-09-01 15:00',
    videoMatchRate: 95.2,
    photoMatchRate: 80.0, // Abnormal photo count
    totalExecutionRate: 95.1,
    isPhotoAbnormal: true,
    systemFillCount: 15,
    photoDetectedCount: 12,
    comp1_contrast: 96.5,
    item1: 96.0,
    item2: 97.0,
    comp2_attack: 95.8,
    item3: 96.5,
    item4: 95.5,
    item5: 95.5,
    comp3_defense: 94.5,
    item6: 94.0,
    item7: 96.5,
    item8: 93.0,
    comp4_kill: 93.8,
    item9: 93.0,
    item10: 93.5,
    item11: 94.5,
    item12: 93.0,
    item13: 95.0,
  },
  {
    id: 'REC-005',
    date: '2026-08-31',
    region: '华北大区',
    district: '北京小区',
    storeCode: 'BJ001',
    storeName: '北京达世行凯迪拉克中心',
    sessions: 2,
    startTime: '2026-08-31 09:30',
    endTime: '2026-08-31 11:00',
    videoMatchRate: 97.4,
    photoMatchRate: 100.0,
    totalExecutionRate: 98.2,
    comp1_contrast: 98.5,
    item1: 98.0,
    item2: 99.0,
    comp2_attack: 98.8,
    item3: 99.2,
    item4: 98.5,
    item5: 98.6,
    comp3_defense: 97.8,
    item6: 97.0,
    item7: 99.0,
    item8: 97.5,
    comp4_kill: 97.6,
    item9: 97.0,
    item10: 96.8,
    item11: 98.2,
    item12: 97.5,
    item13: 98.5,
  },
  {
    id: 'REC-006',
    date: '2026-08-31',
    region: '华北大区',
    district: '北京小区',
    storeCode: 'BJ002',
    storeName: '北京运通凯迪汽车销售服务有限公司',
    sessions: 2,
    startTime: '2026-08-31 14:00',
    endTime: '2026-08-31 15:30',
    videoMatchRate: 72.1, // Abnormal video
    photoMatchRate: 75.0, // Abnormal photo
    totalExecutionRate: 88.5,
    isVideoAbnormal: true,
    videoStatus: '异常',
    isPhotoAbnormal: true,
    systemFillCount: 16,
    photoDetectedCount: 12,
    comp1_contrast: 89.5,
    item1: 88.0,
    item2: 91.0,
    comp2_attack: 90.0,
    item3: 91.0,
    item4: 89.5,
    item5: 89.5,
    comp3_defense: 88.0,
    item6: 87.0,
    item7: 90.5,
    item8: 86.5,
    comp4_kill: 87.0,
    item9: 86.0,
    item10: 86.5,
    item11: 88.0,
    item12: 86.5,
    item13: 88.0,
  },
  {
    id: 'REC-007',
    date: '2026-08-30',
    region: '华南大区',
    district: '深圳小区',
    storeCode: 'SZ001',
    storeName: '深圳标远凯迪拉克旗舰中心',
    sessions: 3,
    startTime: '2026-08-30 10:00',
    endTime: '2026-08-30 11:30',
    videoMatchRate: 98.2,
    photoMatchRate: 100.0,
    totalExecutionRate: 96.8,
    comp1_contrast: 97.2,
    item1: 96.5,
    item2: 98.0,
    comp2_attack: 97.5,
    item3: 98.0,
    item4: 97.2,
    item5: 97.3,
    comp3_defense: 96.2,
    item6: 95.5,
    item7: 98.0,
    item8: 95.0,
    comp4_kill: 95.8,
    item9: 95.0,
    item10: 95.2,
    item11: 96.5,
    item12: 95.2,
    item13: 97.0,
  },
  {
    id: 'REC-008',
    date: '2026-08-30',
    region: '华南大区',
    district: '广佛小区',
    storeCode: 'GD001',
    storeName: '广州安骅凯迪汽车销售服务有限公司',
    sessions: 2,
    startTime: '2026-08-30 15:00',
    endTime: '2026-08-30 16:30',
    videoMatchRate: 94.6,
    photoMatchRate: 100.0,
    totalExecutionRate: 95.4,
    comp1_contrast: 96.0,
    item1: 95.5,
    item2: 96.5,
    comp2_attack: 96.2,
    item3: 97.0,
    item4: 95.8,
    item5: 95.8,
    comp3_defense: 94.8,
    item6: 94.0,
    item7: 97.0,
    item8: 93.5,
    comp4_kill: 94.2,
    item9: 93.5,
    item10: 93.8,
    item11: 95.0,
    item12: 93.8,
    item13: 95.0,
  },
  {
    id: 'REC-009',
    date: '2026-08-29',
    region: '华西大区',
    district: '四川小区',
    storeCode: 'SC001',
    storeName: '成都新东信凯迪拉克销售中心',
    sessions: 2,
    startTime: '2026-08-29 09:30',
    endTime: '2026-08-29 11:00',
    videoMatchRate: 96.5,
    photoMatchRate: 100.0,
    totalExecutionRate: 96.0,
    comp1_contrast: 96.8,
    item1: 96.0,
    item2: 97.5,
    comp2_attack: 96.5,
    item3: 97.2,
    item4: 96.0,
    item5: 96.2,
    comp3_defense: 95.5,
    item6: 95.0,
    item7: 97.5,
    item8: 94.0,
    comp4_kill: 95.0,
    item9: 94.2,
    item10: 94.5,
    item11: 95.8,
    item12: 94.5,
    item13: 96.0,
  },
  {
    id: 'REC-010',
    date: '2026-08-29',
    region: '华东大区',
    district: '江苏小区',
    storeCode: 'JS001',
    storeName: '南京天泓凯迪拉克4S店',
    sessions: 1,
    startTime: '2026-08-29 14:30',
    endTime: '2026-08-29 16:00',
    videoMatchRate: 97.0,
    photoMatchRate: 83.3, // Abnormal photo count
    totalExecutionRate: 94.8,
    isPhotoAbnormal: true,
    systemFillCount: 12,
    photoDetectedCount: 10,
    comp1_contrast: 95.5,
    item1: 95.0,
    item2: 96.0,
    comp2_attack: 95.2,
    item3: 96.0,
    item4: 95.0,
    item5: 94.6,
    comp3_defense: 94.0,
    item6: 93.5,
    item7: 96.0,
    item8: 92.5,
    comp4_kill: 93.5,
    item9: 92.5,
    item10: 93.0,
    item11: 94.5,
    item12: 93.0,
    item13: 94.5,
  },
  {
    id: 'REC-011',
    date: '2026-08-28',
    region: '华东大区',
    district: '江苏小区',
    storeCode: 'JS002',
    storeName: '苏州建融凯迪拉克销售中心',
    sessions: 2,
    startTime: '2026-08-28 10:00',
    endTime: '2026-08-28 11:30',
    videoMatchRate: 96.2,
    photoMatchRate: 100.0,
    totalExecutionRate: 96.5,
    comp1_contrast: 97.0,
    item1: 96.5,
    item2: 97.5,
    comp2_attack: 97.0,
    item3: 97.8,
    item4: 96.5,
    item5: 96.8,
    comp3_defense: 96.0,
    item6: 95.2,
    item7: 97.8,
    item8: 95.0,
    comp4_kill: 95.5,
    item9: 94.8,
    item10: 95.0,
    item11: 96.2,
    item12: 95.0,
    item13: 96.5,
  },
  {
    id: 'REC-012',
    date: '2026-08-28',
    region: '华北大区',
    district: '天津小区',
    storeCode: 'TJ001',
    storeName: '天津市浩物凯迪拉克销售中心',
    sessions: 1,
    startTime: '2026-08-28 14:00',
    endTime: '2026-08-28 15:30',
    videoMatchRate: 95.5,
    photoMatchRate: 100.0,
    totalExecutionRate: 95.0,
    comp1_contrast: 95.8,
    item1: 95.0,
    item2: 96.5,
    comp2_attack: 95.5,
    item3: 96.0,
    item4: 95.2,
    item5: 95.2,
    comp3_defense: 94.2,
    item6: 93.8,
    item7: 96.0,
    item8: 93.0,
    comp4_kill: 93.8,
    item9: 93.0,
    item10: 93.2,
    item11: 94.8,
    item12: 93.2,
    item13: 95.0,
  }
];

// Un-trained stores list (未转训门店)
export interface UnTrainedStore {
  id: string;
  region: string;
  district: string;
  storeCode: string;
  storeName: string;
}

export const UNTRAINED_STORES_LIST: UnTrainedStore[] = [
  { id: 'UT-01', region: '华东大区', district: '上海小区', storeCode: 'SH004', storeName: '上海绿地凯迪拉克销售服务中心' },
  { id: 'UT-02', region: '华东大区', district: '浙江小区', storeCode: 'ZJ002', storeName: '宁波凯迪汽车销售有限公司' },
  { id: 'UT-03', region: '华东大区', district: '浙江小区', storeCode: 'ZJ003', storeName: '温州申腾凯迪拉克服务中心' },
  { id: 'UT-04', region: '华东大区', district: '江苏小区', storeCode: 'JS003', storeName: '无锡东方凯迪拉克旗舰体验中心' },
  { id: 'UT-05', region: '华北大区', district: '北京小区', storeCode: 'BJ003', storeName: '北京首创凯迪拉克体验店' },
  { id: 'UT-06', region: '华北大区', district: '天津小区', storeCode: 'TJ002', storeName: '天津空港凯迪汽车销售服务店' },
  { id: 'UT-07', region: '华北大区', district: '河北小区', storeCode: 'HB001', storeName: '石家庄盛世凯迪拉克4S店' },
  { id: 'UT-08', region: '华北大区', district: '河北小区', storeCode: 'HB002', storeName: '唐山庞大凯迪汽车销售店' },
  { id: 'UT-09', region: '华南大区', district: '广佛小区', storeCode: 'GD002', storeName: '佛山时利和凯迪拉克品鉴店' },
  { id: 'UT-10', region: '华南大区', district: '深圳小区', storeCode: 'SZ002', storeName: '深圳红彤凯迪汽车销售有限公司' },
  { id: 'UT-11', region: '华西大区', district: '四川小区', storeCode: 'SC002', storeName: '成都三和凯迪汽车服务店' },
  { id: 'UT-12', region: '华西大区', district: '重庆小区', storeCode: 'CQ001', storeName: '重庆美威凯迪拉克品鉴中心' },
];

/**
 * 获取门店/场次参训率 (若未显式指定，默认按合规情况计算，如照片异常时对齐识别率，通常为 100.0%)
 */
export const getAttendanceRate = (r?: Partial<StoreInspectionRecord> | null): number => {
  if (!r) return 100.0;
  if (r.attendanceRate !== undefined) return r.attendanceRate;
  if (r.isPhotoAbnormal && r.photoMatchRate !== undefined) return r.photoMatchRate;
  return 100.0;
};
