// Data structures and mock data for MAC reception drill-down:
// Hierarchy: Headquarters (全国总部) -> Region (大区) -> Sub-Region / Area (小区/MAC) -> Store (门店) -> Customer Card Detail

export interface StoreRegionalMetric {
  storeId: string;
  storeCode: string;
  storeName: string;
  regionName: string;
  subRegionName: string;
  macCode: string;
  totalBadgeReception: number; // 工牌接待量 (全部)
  showroomReception: number;    // 展厅接待量
  testDriveReception: number;   // 试乘试驾量
  validQCReception: number;     // 有效质检接待量
  invalidQCReception: number;   // 无效质检接待量
  validRate: number;            // 有效质检率 (%)
  showroomValidQC: number;
  showroomInvalidQC: number;
  testDriveValidQC: number;
  testDriveInvalidQC: number;
}

export interface SubRegionData {
  subRegionId: string;
  subRegionName: string;
  macCode: string;
  regionId: string;
  regionName: string;
  stores: StoreRegionalMetric[];
}

export interface RegionData {
  regionId: string;
  regionName: string;
  subRegions: SubRegionData[];
}

export interface ReceptionDetailCard {
  id: string;
  traceCode: string;
  storeCode: string;
  storeName: string;
  region: string;
  mac: string;
  customerName: string;
  salesperson: string;
  carModel: string;
  scene: '展厅接待' | '试乘试驾';
  enterTime: string;
  leaveTime: string;
  uploadTime: string;
  badgeId: string;
  audioFileName: string;
  audioDurationStr: string;
  receptionDurationStr: string;
  isValid: boolean;
  score?: number;
  failedReasonCount: number;
  conditions: {
    hasAudio: boolean;
    audioDurationMatch: boolean;
    modelMentioned: boolean;
    sceneMatch: boolean;
    receptionDurationTarget: boolean;
  };
  defectSummary?: string;
  dialogueTranscript: Array<{
    speaker: 'sales' | 'customer';
    time: string;
    text: string;
    tag?: string;
  }>;
  processScores?: {
    greeting: number;
    needsAnalysis: number;
    productPresentation: number;
    testDriveOrDemo: number;
    objectionHandling: number;
    followupClosing: number;
  };
  aiInsight?: {
    intentLevel: '高意向' | '中意向' | '观望';
    coreInterest: string[];
    priceSensitivity: '高' | '中' | '低';
    nextAction: string;
  };
}

export const MOCK_REGIONS_DATA: RegionData[] = [
  {
    regionId: 'REG-HD',
    regionName: '华东大区',
    subRegions: [
      {
        subRegionId: 'SUB-SH',
        subRegionName: '上海小区',
        macCode: '上海MAC',
        regionId: 'REG-HD',
        regionName: '华东大区',
        stores: [
          {
            storeId: 'STORE-SH-001',
            storeCode: 'SH2001',
            storeName: '上海永达旗舰店',
            regionName: '华东大区',
            subRegionName: '上海小区',
            macCode: '上海MAC',
            totalBadgeReception: 168,
            showroomReception: 104,
            testDriveReception: 64,
            validQCReception: 142,
            invalidQCReception: 26,
            validRate: 84.5,
            showroomValidQC: 90,
            showroomInvalidQC: 14,
            testDriveValidQC: 52,
            testDriveInvalidQC: 12,
          },
          {
            storeId: 'STORE-SH-002',
            storeCode: 'SH2002',
            storeName: '上海东昌体验中心',
            regionName: '华东大区',
            subRegionName: '上海小区',
            macCode: '上海MAC',
            totalBadgeReception: 145,
            showroomReception: 92,
            testDriveReception: 53,
            validQCReception: 119,
            invalidQCReception: 26,
            validRate: 82.1,
            showroomValidQC: 78,
            showroomInvalidQC: 14,
            testDriveValidQC: 41,
            testDriveInvalidQC: 12,
          },
          {
            storeId: 'STORE-SH-003',
            storeCode: 'SH2003',
            storeName: '上海绿地中心店',
            regionName: '华东大区',
            subRegionName: '上海小区',
            macCode: '上海MAC',
            totalBadgeReception: 120,
            showroomReception: 76,
            testDriveReception: 44,
            validQCReception: 95,
            invalidQCReception: 25,
            validRate: 79.2,
            showroomValidQC: 62,
            showroomInvalidQC: 14,
            testDriveValidQC: 33,
            testDriveInvalidQC: 11,
          },
        ]
      },
      {
        subRegionId: 'SUB-ZJ',
        subRegionName: '浙江小区',
        macCode: '浙江MAC',
        regionId: 'REG-HD',
        regionName: '华东大区',
        stores: [
          {
            storeId: 'STORE-HZ-001',
            storeCode: 'ZJ3001',
            storeName: '杭州西湖尊荣店',
            regionName: '华东大区',
            subRegionName: '浙江小区',
            macCode: '浙江MAC',
            totalBadgeReception: 156,
            showroomReception: 98,
            testDriveReception: 58,
            validQCReception: 130,
            invalidQCReception: 26,
            validRate: 83.3,
            showroomValidQC: 84,
            showroomInvalidQC: 14,
            testDriveValidQC: 46,
            testDriveInvalidQC: 12,
          },
          {
            storeId: 'STORE-NB-001',
            storeCode: 'ZJ3002',
            storeName: '宁波开诚体验店',
            regionName: '华东大区',
            subRegionName: '浙江小区',
            macCode: '浙江MAC',
            totalBadgeReception: 112,
            showroomReception: 70,
            testDriveReception: 42,
            validQCReception: 88,
            invalidQCReception: 24,
            validRate: 78.6,
            showroomValidQC: 56,
            showroomInvalidQC: 14,
            testDriveValidQC: 32,
            testDriveInvalidQC: 10,
          },
          {
            storeId: 'STORE-WZ-001',
            storeCode: 'ZJ3003',
            storeName: '温州华策中心店',
            regionName: '华东大区',
            subRegionName: '浙江小区',
            macCode: '浙江MAC',
            totalBadgeReception: 108,
            showroomReception: 68,
            testDriveReception: 40,
            validQCReception: 85,
            invalidQCReception: 23,
            validRate: 78.7,
            showroomValidQC: 54,
            showroomInvalidQC: 14,
            testDriveValidQC: 31,
            testDriveInvalidQC: 9,
          },
        ]
      },
      {
        subRegionId: 'SUB-JS',
        subRegionName: '江苏小区',
        macCode: '江苏MAC',
        regionId: 'REG-HD',
        regionName: '华东大区',
        stores: [
          {
            storeId: 'STORE-NJ-001',
            storeCode: 'JS4001',
            storeName: '南京天泓新港店',
            regionName: '华东大区',
            subRegionName: '江苏小区',
            macCode: '江苏MAC',
            totalBadgeReception: 138,
            showroomReception: 88,
            testDriveReception: 50,
            validQCReception: 112,
            invalidQCReception: 26,
            validRate: 81.2,
            showroomValidQC: 73,
            showroomInvalidQC: 15,
            testDriveValidQC: 39,
            testDriveInvalidQC: 11,
          },
          {
            storeId: 'STORE-SZ-001',
            storeCode: 'JS4002',
            storeName: '苏州建发旗舰店',
            regionName: '华东大区',
            subRegionName: '江苏小区',
            macCode: '江苏MAC',
            totalBadgeReception: 140,
            showroomReception: 86,
            testDriveReception: 54,
            validQCReception: 116,
            invalidQCReception: 24,
            validRate: 82.9,
            showroomValidQC: 74,
            showroomInvalidQC: 12,
            testDriveValidQC: 42,
            testDriveInvalidQC: 12,
          },
          {
            storeId: 'STORE-WX-001',
            storeCode: 'JS4003',
            storeName: '无锡东方新城店',
            regionName: '华东大区',
            subRegionName: '江苏小区',
            macCode: '江苏MAC',
            totalBadgeReception: 98,
            showroomReception: 62,
            testDriveReception: 36,
            validQCReception: 78,
            invalidQCReception: 20,
            validRate: 79.6,
            showroomValidQC: 50,
            showroomInvalidQC: 12,
            testDriveValidQC: 28,
            testDriveInvalidQC: 8,
          },
        ]
      },
      {
        subRegionId: 'SUB-AH',
        subRegionName: '安徽小区',
        macCode: '安徽MAC',
        regionId: 'REG-HD',
        regionName: '华东大区',
        stores: [
          {
            storeId: 'STORE-HF-001',
            storeCode: 'AH5001',
            storeName: '合肥伟恒中心店',
            regionName: '华东大区',
            subRegionName: '安徽小区',
            macCode: '安徽MAC',
            totalBadgeReception: 98,
            showroomReception: 62,
            testDriveReception: 36,
            validQCReception: 76,
            invalidQCReception: 22,
            validRate: 77.6,
            showroomValidQC: 50,
            showroomInvalidQC: 12,
            testDriveValidQC: 26,
            testDriveInvalidQC: 10,
          },
          {
            storeId: 'STORE-WHU-001',
            storeCode: 'AH5002',
            storeName: '芜湖亚夏体验店',
            regionName: '华东大区',
            subRegionName: '安徽小区',
            macCode: '安徽MAC',
            totalBadgeReception: 82,
            showroomReception: 52,
            testDriveReception: 30,
            validQCReception: 64,
            invalidQCReception: 18,
            validRate: 78.0,
            showroomValidQC: 42,
            showroomInvalidQC: 10,
            testDriveValidQC: 22,
            testDriveInvalidQC: 8,
          },
        ]
      }
    ]
  },
  {
    regionId: 'REG-HB',
    regionName: '华北大区',
    subRegions: [
      {
        subRegionId: 'SUB-JJ',
        subRegionName: '京津小区',
        macCode: '京津MAC',
        regionId: 'REG-HB',
        regionName: '华北大区',
        stores: [
          {
            storeId: 'STORE-BJ-001',
            storeCode: 'BJ1001',
            storeName: '北京达世行旗舰店',
            regionName: '华北大区',
            subRegionName: '京津小区',
            macCode: '京津MAC',
            totalBadgeReception: 182,
            showroomReception: 114,
            testDriveReception: 68,
            validQCReception: 158,
            invalidQCReception: 24,
            validRate: 86.8,
            showroomValidQC: 101,
            showroomInvalidQC: 13,
            testDriveValidQC: 57,
            testDriveInvalidQC: 11,
          },
          {
            storeId: 'STORE-BJ-002',
            storeCode: 'BJ1002',
            storeName: '北京博瑞祥驰店',
            regionName: '华北大区',
            subRegionName: '京津小区',
            macCode: '京津MAC',
            totalBadgeReception: 152,
            showroomReception: 96,
            testDriveReception: 56,
            validQCReception: 128,
            invalidQCReception: 24,
            validRate: 84.2,
            showroomValidQC: 82,
            showroomInvalidQC: 14,
            testDriveValidQC: 46,
            testDriveInvalidQC: 10,
          },
          {
            storeId: 'STORE-TJ-001',
            storeCode: 'TJ1003',
            storeName: '天津浩物津港店',
            regionName: '华北大区',
            subRegionName: '京津小区',
            macCode: '京津MAC',
            totalBadgeReception: 126,
            showroomReception: 80,
            testDriveReception: 46,
            validQCReception: 102,
            invalidQCReception: 24,
            validRate: 81.0,
            showroomValidQC: 66,
            showroomInvalidQC: 14,
            testDriveValidQC: 36,
            testDriveInvalidQC: 10,
          }
        ]
      },
      {
        subRegionId: 'SUB-SD',
        subRegionName: '山东小区',
        macCode: '山东MAC',
        regionId: 'REG-HB',
        regionName: '华北大区',
        stores: [
          {
            storeId: 'STORE-JN-001',
            storeCode: 'SD2001',
            storeName: '济南大友奥体店',
            regionName: '华北大区',
            subRegionName: '山东小区',
            macCode: '山东MAC',
            totalBadgeReception: 134,
            showroomReception: 84,
            testDriveReception: 50,
            validQCReception: 108,
            invalidQCReception: 26,
            validRate: 80.6,
            showroomValidQC: 70,
            showroomInvalidQC: 14,
            testDriveValidQC: 38,
            testDriveInvalidQC: 12,
          },
          {
            storeId: 'STORE-QD-001',
            storeCode: 'SD2002',
            storeName: '青岛福日银沙滩店',
            regionName: '华北大区',
            subRegionName: '山东小区',
            macCode: '山东MAC',
            totalBadgeReception: 128,
            showroomReception: 80,
            testDriveReception: 48,
            validQCReception: 104,
            invalidQCReception: 24,
            validRate: 81.3,
            showroomValidQC: 66,
            showroomInvalidQC: 14,
            testDriveValidQC: 38,
            testDriveInvalidQC: 10,
          }
        ]
      },
      {
        subRegionId: 'SUB-HBJJ',
        subRegionName: '冀晋小区',
        macCode: '冀晋MAC',
        regionId: 'REG-HB',
        regionName: '华北大区',
        stores: [
          {
            storeId: 'STORE-SJZ-001',
            storeCode: 'HEB3001',
            storeName: '石家庄晨阳体验中心',
            regionName: '华北大区',
            subRegionName: '冀晋小区',
            macCode: '冀晋MAC',
            totalBadgeReception: 96,
            showroomReception: 60,
            testDriveReception: 36,
            validQCReception: 74,
            invalidQCReception: 22,
            validRate: 77.1,
            showroomValidQC: 48,
            showroomInvalidQC: 12,
            testDriveValidQC: 26,
            testDriveInvalidQC: 10,
          },
          {
            storeId: 'STORE-TY-001',
            storeCode: 'SX3002',
            storeName: '太原大昌太榆路店',
            regionName: '华北大区',
            subRegionName: '冀晋小区',
            macCode: '冀晋MAC',
            totalBadgeReception: 88,
            showroomReception: 56,
            testDriveReception: 32,
            validQCReception: 68,
            invalidQCReception: 20,
            validRate: 77.3,
            showroomValidQC: 44,
            showroomInvalidQC: 12,
            testDriveValidQC: 24,
            testDriveInvalidQC: 8,
          }
        ]
      }
    ]
  },
  {
    regionId: 'REG-HN',
    regionName: '华南大区',
    subRegions: [
      {
        subRegionId: 'SUB-GF',
        subRegionName: '广佛小区',
        macCode: '广佛MAC',
        regionId: 'REG-HN',
        regionName: '华南大区',
        stores: [
          {
            storeId: 'STORE-GZ-001',
            storeCode: 'GD6001',
            storeName: '广州南菱天河店',
            regionName: '华南大区',
            subRegionName: '广佛小区',
            macCode: '广佛MAC',
            totalBadgeReception: 160,
            showroomReception: 100,
            testDriveReception: 60,
            validQCReception: 136,
            invalidQCReception: 24,
            validRate: 85.0,
            showroomValidQC: 87,
            showroomInvalidQC: 13,
            testDriveValidQC: 49,
            testDriveInvalidQC: 11,
          },
          {
            storeId: 'STORE-FS-001',
            storeCode: 'GD6002',
            storeName: '佛山时利和南海店',
            regionName: '华南大区',
            subRegionName: '广佛小区',
            macCode: '广佛MAC',
            totalBadgeReception: 130,
            showroomReception: 82,
            testDriveReception: 48,
            validQCReception: 105,
            invalidQCReception: 25,
            validRate: 80.8,
            showroomValidQC: 68,
            showroomInvalidQC: 14,
            testDriveValidQC: 37,
            testDriveInvalidQC: 11,
          }
        ]
      },
      {
        subRegionId: 'SUB-SZ',
        subRegionName: '深圳粤东小区',
        macCode: '深圳MAC',
        regionId: 'REG-HN',
        regionName: '华南大区',
        stores: [
          {
            storeId: 'STORE-SZ-001',
            storeCode: 'SZ6003',
            storeName: '深圳标远福田旗舰店',
            regionName: '华南大区',
            subRegionName: '深圳粤东小区',
            macCode: '深圳MAC',
            totalBadgeReception: 172,
            showroomReception: 108,
            testDriveReception: 64,
            validQCReception: 148,
            invalidQCReception: 24,
            validRate: 86.0,
            showroomValidQC: 95,
            showroomInvalidQC: 13,
            testDriveValidQC: 53,
            testDriveInvalidQC: 11,
          },
          {
            storeId: 'STORE-DG-001',
            storeCode: 'DG6004',
            storeName: '东莞冠丰南城店',
            regionName: '华南大区',
            subRegionName: '深圳粤东小区',
            macCode: '深圳MAC',
            totalBadgeReception: 118,
            showroomReception: 74,
            testDriveReception: 44,
            validQCReception: 94,
            invalidQCReception: 24,
            validRate: 79.7,
            showroomValidQC: 60,
            showroomInvalidQC: 14,
            testDriveValidQC: 34,
            testDriveInvalidQC: 10,
          }
        ]
      },
      {
        subRegionId: 'SUB-MQ',
        subRegionName: '闽琼小区',
        macCode: '闽琼MAC',
        regionId: 'REG-HN',
        regionName: '华南大区',
        stores: [
          {
            storeId: 'STORE-XM-001',
            storeCode: 'FJ7001',
            storeName: '厦门盛元湖里店',
            regionName: '华南大区',
            subRegionName: '闽琼小区',
            macCode: '闽琼MAC',
            totalBadgeReception: 115,
            showroomReception: 72,
            testDriveReception: 43,
            validQCReception: 92,
            invalidQCReception: 23,
            validRate: 80.0,
            showroomValidQC: 59,
            showroomInvalidQC: 13,
            testDriveValidQC: 33,
            testDriveInvalidQC: 10,
          },
          {
            storeId: 'STORE-FZ-001',
            storeCode: 'FJ7002',
            storeName: '福州中宝仓山店',
            regionName: '华南大区',
            subRegionName: '闽琼小区',
            macCode: '闽琼MAC',
            totalBadgeReception: 106,
            showroomReception: 66,
            testDriveReception: 40,
            validQCReception: 83,
            invalidQCReception: 23,
            validRate: 78.3,
            showroomValidQC: 53,
            showroomInvalidQC: 13,
            testDriveValidQC: 30,
            testDriveInvalidQC: 10,
          },
          {
            storeId: 'STORE-HK-001',
            storeCode: 'HN7003',
            storeName: '海口嘉德迎宾店',
            regionName: '华南大区',
            subRegionName: '闽琼小区',
            macCode: '闽琼MAC',
            totalBadgeReception: 78,
            showroomReception: 48,
            testDriveReception: 30,
            validQCReception: 60,
            invalidQCReception: 18,
            validRate: 76.9,
            showroomValidQC: 38,
            showroomInvalidQC: 10,
            testDriveValidQC: 22,
            testDriveInvalidQC: 8,
          }
        ]
      }
    ]
  },
  {
    regionId: 'REG-XN',
    regionName: '西南大区',
    subRegions: [
      {
        subRegionId: 'SUB-CY',
        subRegionName: '川渝小区',
        macCode: '川渝MAC',
        regionId: 'REG-XN',
        regionName: '西南大区',
        stores: [
          {
            storeId: 'STORE-CD-001',
            storeCode: 'SC7001',
            storeName: '成都港宏体验中心',
            regionName: '西南大区',
            subRegionName: '川渝小区',
            macCode: '川渝MAC',
            totalBadgeReception: 150,
            showroomReception: 94,
            testDriveReception: 56,
            validQCReception: 124,
            invalidQCReception: 26,
            validRate: 82.7,
            showroomValidQC: 80,
            showroomInvalidQC: 14,
            testDriveValidQC: 44,
            testDriveInvalidQC: 12,
          },
          {
            storeId: 'STORE-CQ-001',
            storeCode: 'CQ7002',
            storeName: '重庆商社汽博店',
            regionName: '西南大区',
            subRegionName: '川渝小区',
            macCode: '川渝MAC',
            totalBadgeReception: 136,
            showroomReception: 86,
            testDriveReception: 50,
            validQCReception: 110,
            invalidQCReception: 26,
            validRate: 80.9,
            showroomValidQC: 71,
            showroomInvalidQC: 15,
            testDriveValidQC: 39,
            testDriveInvalidQC: 11,
          }
        ]
      },
      {
        subRegionId: 'SUB-YG',
        subRegionName: '云贵小区',
        macCode: '云贵MAC',
        regionId: 'REG-XN',
        regionName: '西南大区',
        stores: [
          {
            storeId: 'STORE-KM-001',
            storeCode: 'YN8001',
            storeName: '昆明雄风前卫店',
            regionName: '西南大区',
            subRegionName: '云贵小区',
            macCode: '云贵MAC',
            totalBadgeReception: 102,
            showroomReception: 64,
            testDriveReception: 38,
            validQCReception: 80,
            invalidQCReception: 22,
            validRate: 78.4,
            showroomValidQC: 52,
            showroomInvalidQC: 12,
            testDriveValidQC: 28,
            testDriveInvalidQC: 10,
          },
          {
            storeId: 'STORE-GY-001',
            storeCode: 'GZ8002',
            storeName: '贵阳乾通花溪店',
            regionName: '西南大区',
            subRegionName: '云贵小区',
            macCode: '云贵MAC',
            totalBadgeReception: 86,
            showroomReception: 54,
            testDriveReception: 32,
            validQCReception: 66,
            invalidQCReception: 20,
            validRate: 76.7,
            showroomValidQC: 43,
            showroomInvalidQC: 11,
            testDriveValidQC: 23,
            testDriveInvalidQC: 9,
          }
        ]
      }
    ]
  },
  {
    regionId: 'REG-HZ',
    regionName: '华中大区',
    subRegions: [
      {
        subRegionId: 'SUB-LH',
        subRegionName: '两湖小区',
        macCode: '两湖MAC',
        regionId: 'REG-HZ',
        regionName: '华中大区',
        stores: [
          {
            storeId: 'STORE-WH-001',
            storeCode: 'HB8001',
            storeName: '武汉建银汉口店',
            regionName: '华中大区',
            subRegionName: '两湖小区',
            macCode: '两湖MAC',
            totalBadgeReception: 132,
            showroomReception: 82,
            testDriveReception: 50,
            validQCReception: 105,
            invalidQCReception: 27,
            validRate: 79.5,
            showroomValidQC: 67,
            showroomInvalidQC: 15,
            testDriveValidQC: 38,
            testDriveInvalidQC: 12,
          },
          {
            storeId: 'STORE-CS-001',
            storeCode: 'HN8002',
            storeName: '长沙申湘星沙店',
            regionName: '华中大区',
            subRegionName: '两湖小区',
            macCode: '两湖MAC',
            totalBadgeReception: 124,
            showroomReception: 78,
            testDriveReception: 46,
            validQCReception: 98,
            invalidQCReception: 26,
            validRate: 79.0,
            showroomValidQC: 63,
            showroomInvalidQC: 15,
            testDriveValidQC: 35,
            testDriveInvalidQC: 11,
          }
        ]
      },
      {
        subRegionId: 'SUB-HEN',
        subRegionName: '河南小区',
        macCode: '河南MAC',
        regionId: 'REG-HZ',
        regionName: '华中大区',
        stores: [
          {
            storeId: 'STORE-ZZ-001',
            storeCode: 'HEN9001',
            storeName: '郑州威佳航海路店',
            regionName: '华中大区',
            subRegionName: '河南小区',
            macCode: '河南MAC',
            totalBadgeReception: 122,
            showroomReception: 76,
            testDriveReception: 46,
            validQCReception: 96,
            invalidQCReception: 26,
            validRate: 78.7,
            showroomValidQC: 62,
            showroomInvalidQC: 14,
            testDriveValidQC: 34,
            testDriveInvalidQC: 12,
          },
          {
            storeId: 'STORE-LY-001',
            storeCode: 'HEN9002',
            storeName: '洛阳富达九都路店',
            regionName: '华中大区',
            subRegionName: '河南小区',
            macCode: '河南MAC',
            totalBadgeReception: 76,
            showroomReception: 48,
            testDriveReception: 28,
            validQCReception: 58,
            invalidQCReception: 18,
            validRate: 76.3,
            showroomValidQC: 38,
            showroomInvalidQC: 10,
            testDriveValidQC: 20,
            testDriveInvalidQC: 8,
          }
        ]
      }
    ]
  },
  {
    regionId: 'REG-XB',
    regionName: '西北大区',
    subRegions: [
      {
        subRegionId: 'SUB-SG',
        subRegionName: '陕甘小区',
        macCode: '陕甘MAC',
        regionId: 'REG-XB',
        regionName: '西北大区',
        stores: [
          {
            storeId: 'STORE-XA-001',
            storeCode: 'SN9101',
            storeName: '西安华中沣东旗舰店',
            regionName: '西北大区',
            subRegionName: '陕甘小区',
            macCode: '陕甘MAC',
            totalBadgeReception: 130,
            showroomReception: 82,
            testDriveReception: 48,
            validQCReception: 104,
            invalidQCReception: 26,
            validRate: 80.0,
            showroomValidQC: 68,
            showroomInvalidQC: 14,
            testDriveValidQC: 36,
            testDriveInvalidQC: 12,
          },
          {
            storeId: 'STORE-LZ-001',
            storeCode: 'GS9102',
            storeName: '兰州赛驰南滨河店',
            regionName: '西北大区',
            subRegionName: '陕甘小区',
            macCode: '陕甘MAC',
            totalBadgeReception: 72,
            showroomReception: 46,
            testDriveReception: 26,
            validQCReception: 55,
            invalidQCReception: 17,
            validRate: 76.4,
            showroomValidQC: 36,
            showroomInvalidQC: 10,
            testDriveValidQC: 19,
            testDriveInvalidQC: 7,
          }
        ]
      }
    ]
  },
  {
    regionId: 'REG-DB',
    regionName: '东北大区',
    subRegions: [
      {
        subRegionId: 'SUB-LJH',
        subRegionName: '辽吉黑小区',
        macCode: '辽吉黑MAC',
        regionId: 'REG-DB',
        regionName: '东北大区',
        stores: [
          {
            storeId: 'STORE-SY-001',
            storeCode: 'LN9201',
            storeName: '沈阳华宝浑南店',
            regionName: '东北大区',
            subRegionName: '辽吉黑小区',
            macCode: '辽吉黑MAC',
            totalBadgeReception: 116,
            showroomReception: 72,
            testDriveReception: 44,
            validQCReception: 92,
            invalidQCReception: 24,
            validRate: 79.3,
            showroomValidQC: 59,
            showroomInvalidQC: 13,
            testDriveValidQC: 33,
            testDriveInvalidQC: 11,
          },
          {
            storeId: 'STORE-CC-001',
            storeCode: 'JL9202',
            storeName: '长春通立高新店',
            regionName: '东北大区',
            subRegionName: '辽吉黑小区',
            macCode: '辽吉黑MAC',
            totalBadgeReception: 84,
            showroomReception: 52,
            testDriveReception: 32,
            validQCReception: 65,
            invalidQCReception: 19,
            validRate: 77.4,
            showroomValidQC: 42,
            showroomInvalidQC: 10,
            testDriveValidQC: 23,
            testDriveInvalidQC: 9,
          },
          {
            storeId: 'STORE-HRB-001',
            storeCode: 'HLJ9203',
            storeName: '哈尔滨运通先锋路店',
            regionName: '东北大区',
            subRegionName: '辽吉黑小区',
            macCode: '辽吉黑MAC',
            totalBadgeReception: 75,
            showroomReception: 48,
            testDriveReception: 27,
            validQCReception: 58,
            invalidQCReception: 17,
            validRate: 77.3,
            showroomValidQC: 38,
            showroomInvalidQC: 10,
            testDriveValidQC: 20,
            testDriveInvalidQC: 7,
          }
        ]
      }
    ]
  }
];

// Helper to calculate aggregate metrics for a collection of stores
export function aggregateStoresMetrics(stores: StoreRegionalMetric[], sceneTab: '全部' | '展厅接待' | '试乘试驾') {
  let totalBadge = 0;
  let showroomBadge = 0;
  let testDriveBadge = 0;
  let validQC = 0;
  let invalidQC = 0;
  let showroomValidQC = 0;
  let showroomInvalidQC = 0;
  let testDriveValidQC = 0;
  let testDriveInvalidQC = 0;

  stores.forEach(s => {
    totalBadge += s.totalBadgeReception;
    showroomBadge += s.showroomReception;
    testDriveBadge += s.testDriveReception;

    showroomValidQC += s.showroomValidQC;
    showroomInvalidQC += s.showroomInvalidQC;
    testDriveValidQC += s.testDriveValidQC;
    testDriveInvalidQC += s.testDriveInvalidQC;

    if (sceneTab === '全部') {
      validQC += s.validQCReception;
      invalidQC += s.invalidQCReception;
    } else if (sceneTab === '展厅接待') {
      validQC += s.showroomValidQC;
      invalidQC += s.showroomInvalidQC;
    } else if (sceneTab === '试乘试驾') {
      validQC += s.testDriveValidQC;
      invalidQC += s.testDriveInvalidQC;
    }
  });

  const activeTotal = sceneTab === '全部' ? totalBadge : (sceneTab === '展厅接待' ? showroomBadge : testDriveBadge);
  const validRate = activeTotal > 0 ? ((validQC / activeTotal) * 100).toFixed(1) : '0.0';
  const invalidRate = activeTotal > 0 ? ((invalidQC / activeTotal) * 100).toFixed(1) : '0.0';

  return {
    totalBadge: activeTotal,
    allBadge: totalBadge,
    showroomBadge,
    testDriveBadge,
    validQC,
    invalidQC,
    validRate,
    invalidRate,
    showroomValidQC,
    showroomInvalidQC,
    testDriveValidQC,
    testDriveInvalidQC,
    storeCount: stores.length
  };
}
