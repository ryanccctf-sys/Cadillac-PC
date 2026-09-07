
import React, { useState, useEffect, useRef } from 'react';
import { 
  Bot, 
  Send, 
  X, 
  Sparkles, 
  Maximize2, 
  Minimize2,
  RefreshCw,
  ChevronDown,
  MessageSquare
} from 'lucide-react';

interface Message {
  id: string;
  sender: 'ai' | 'user';
  text: string;
  time: string;
}

interface AIAssistantProps {
  context: 'dashboard' | 'customer_insights' | 'quality_monitor' | 'daily_report_detail' | 'session_quality_detail' | 'employee_profile' | 'lead_detail' | 'customer_profile' | 'store_daily_report';
  data?: any; // Optional data to feed the "AI" for context
}

const SUGGESTIONS = {
  dashboard: ['今日客流情况如何？', '有哪些异常告警？', '展厅热力分布解读'],
  customer_insights: ['接待流程哪一环最薄弱？', '录音覆盖率是否达标？', '进店量趋势分析'],
  quality_monitor: ['今日违规情况汇总', '销售顾问情绪状态', '关键节点执行率'],
  daily_report_detail: ['总结今日运营亮点', '有哪些待改进项？', '生成明日管理计划'],
  store_daily_report: ['今日进店转化率分析', '客流高峰时段建议', '生成门店运营周报'],
  session_quality_detail: ['分析客户真实意图', '顾问话术有哪些失误？', '生成后续跟进话术'],
  employee_profile: ['该员工优势是什么？', '近期绩效趋势如何？', '针对性的培训建议'],
  lead_detail: ['客户购车意向判定', '下一步最佳跟进动作', '生成邀约短信模版'],
  customer_profile: ['客户成交概率分析', '推荐什么金融方案？', '生成个性化推荐语'],
};

const INITIAL_MESSAGES = {
  dashboard: '您好！我是智能运营助手。今日进店客流较昨日增长 12.5%，但 B 区 SUV 展台出现拥堵预警，建议关注。',
  customer_insights: '您好！数据洞察显示，今日“试驾邀约”环节执行率偏低（仅 45%），建议加强相关话术引导。',
  quality_monitor: '监控中！检测到 3 起负向情绪会话，主要集中在下午 14:00 时段，请及时处理异常告警。',
  daily_report_detail: '已生成日报摘要。今日成交率不错，但试驾流程耗时过长，建议查看详细问题列表。',
  store_daily_report: '您好！我是您的门店运营助手。今日门店客流表现稳健，但 14:00-16:00 出现接待高峰，建议优化排班。',
  session_quality_detail: '会话分析完毕。顾问在“需求分析”环节表现出色，但在“竞品对比”时略显犹豫，建议加强竞品知识。',
  employee_profile: '画像已生成。该员工服务态度极佳（4.9分），但近期试驾转化率略有下降，可能需要针对性的谈判技巧培训。',
  lead_detail: '线索分析中... 客户对“Model Y”意向极高，且关注续航。建议今日发送长续航版实测数据进行促单。',
  customer_profile: '客户画像解读：高意向（95分）客户。对价格敏感但看重金融政策，建议推荐“5年低息”方案。',
};

const AIAssistant: React.FC<AIAssistantProps> = ({ context, data }) => {
  return null;
};

const UserIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
    <circle cx="12" cy="7" r="4"></circle>
  </svg>
);

export default AIAssistant;
