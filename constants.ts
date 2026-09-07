
import { 
  Lightbulb
} from 'lucide-react';
import { MenuItem, Notification } from './types';

export const MENU_STRUCTURE: MenuItem[] = [
  {
    title: '解决方案概览',
    path: '/solution',
    icon: Lightbulb,
    children: [
      { title: '转训任务管理', path: '/training-task-management' },
      { title: '转训检核看板', path: '/training-inspection-board' },
      { title: '转训/演练记录管理', path: '/training-drill-records' },
    ],
  },
];

export const MOCK_NOTIFICATIONS: Notification[] = [
  { id: '1', type: 'alert', message: '上海旗舰店：B区销售顾问张三 情绪识别异常 (愤怒)', time: '10分钟前', read: false },
  { id: '2', type: 'lead', message: '系统自动分配新线索：Model Y 意向客户 李先生', time: '30分钟前', read: false },
  { id: '3', type: 'alert', message: '北京朝阳店：今日客流已超过预警阈值', time: '1小时前', read: true },
  { id: '4', type: 'lead', message: '销售顾问 王金牌 更新了重点客户跟进记录', time: '2小时前', read: true },
];