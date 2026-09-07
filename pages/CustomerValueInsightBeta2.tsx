
import React, { useState, useMemo, useRef, useEffect } from 'react';
import * as d3 from 'd3';
import { 
  sankey, 
  sankeyLinkHorizontal, 
  sankeyCenter 
} from 'd3-sankey';
import { 
  TrendingUp, 
  TrendingDown, 
  Zap, 
  Target,
  MoreHorizontal,
  ChevronDown,
  ChevronRight,
  AlertCircle,
  Calendar,
  Filter,
  ArrowUpRight,
  ArrowLeft,
  X,
  MessageSquare,
  Search,
  Settings,
  Download,
  Share2,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  Check,
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
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
  LineChart as ReLineChart,
  Line,
  AreaChart,
  Area
} from 'recharts';

// --- Mock Data ---

const PERSONA_DATA = [
  { id: 'price', name: '价格敏感型', value: 38, count: 3203, color: '#f59e0b' },
  { id: 'look', name: '外观颜值党', value: 27, count: 2276, color: '#ef4444' },
  { id: 'power', name: '动力操控型', value: 19, count: 1601, color: '#10b981' },
  { id: 'brand', name: '品牌忠诚型', value: 16, count: 1349, color: '#6366f1' },
];

const SUMMARY_INSIGHTS = [
  {
    rank: 1,
    id: 'config',
    title: '配置',
    percentage: 67.82,
    count: 628,
    satisfied: [
      '客户对免费升级音响的配置表示认可',
      '内饰材质升级感官反馈出色'
    ],
    dissatisfied: [
      '客户表示不需要按摩配置，更倾向于增加座椅加热'
    ],
    color: '#6366f1'
  },
  {
    rank: 2,
    id: 'range',
    title: '续航',
    percentage: 59.40,
    count: 550,
    satisfied: [
      '高速实测续航表现稳定',
      '快充速度在冬季表现依然抢眼'
    ],
    dissatisfied: [
      '客户认为销售推荐车型续航有点高',
      '客户认为该车型开启哨兵模式费电'
    ],
    color: '#0ea5e9'
  },
  {
    rank: 3,
    id: 'space',
    title: '空间',
    percentage: 56.70,
    count: 525,
    satisfied: [
      '后备箱容积满足家庭出行需求',
      '贯穿式过道设计受到好评'
    ],
    dissatisfied: [
      '后排地板隆起偏高，影响中间乘客舒适性'
    ],
    color: '#10b981'
  }
];

const PERSONA_SENTIMENT_DATA: Record<string, { pie: any[], trend: any[], secondaryLabel?: string }> = {
  total: {
    pie: [
      { name: '正向驱动', value: 51, color: '#10b981', count: 1284 },
      { name: '中性反馈', value: 20, color: '#94a3b8', count: 506 },
      { name: '负向抑制', value: 29, color: '#f43f5e', count: 724 },
    ],
    trend: [
      { name: 'W1', positive: 65, neutral: 20, negative: 15 },
      { name: 'W2', positive: 70, neutral: 15, negative: 15 },
      { name: 'W3', positive: 72, neutral: 18, negative: 10 },
      { name: 'W4', positive: 68, neutral: 22, negative: 10 },
      { name: 'W5', positive: 75, neutral: 15, negative: 10 },
      { name: 'W6', positive: 78, neutral: 12, negative: 10 },
      { name: 'W7', positive: 74, neutral: 16, negative: 10 },
    ],
    secondaryLabel: '负向率较上周上升4pts · 主因：价格异议'
  },
  price: {
    pie: [
      { name: '正向驱动', value: 35, color: '#10b981', count: 1121 },
      { name: '中性反馈', value: 25, color: '#94a3b8', count: 800 },
      { name: '负向抑制', value: 40, color: '#f43f5e', count: 1282 },
    ],
    trend: [
      { name: 'W1', positive: 30, neutral: 30, negative: 40 },
      { name: 'W2', positive: 32, neutral: 28, negative: 40 },
      { name: 'W3', positive: 35, neutral: 25, negative: 40 },
      { name: 'W4', positive: 33, neutral: 27, negative: 40 },
      { name: 'W5', positive: 38, neutral: 22, negative: 40 },
      { name: 'W6', positive: 36, neutral: 24, negative: 40 },
      { name: 'W7', positive: 35, neutral: 25, negative: 40 },
    ],
    secondaryLabel: '价格敏感型负向驱动主因：优惠幅度不达预期'
  },
  look: {
    pie: [
      { name: '正向驱动', value: 82, color: '#10b981', count: 1866 },
      { name: '中性反馈', value: 10, color: '#94a3b8', count: 228 },
      { name: '负向抑制', value: 8, color: '#f43f5e', count: 182 },
    ],
    trend: [
      { name: 'W1', positive: 75, neutral: 15, negative: 10 },
      { name: 'W2', positive: 78, neutral: 12, negative: 10 },
      { name: 'W3', positive: 80, neutral: 10, negative: 10 },
      { name: 'W4', positive: 82, neutral: 10, negative: 8 },
      { name: 'W5', positive: 85, neutral: 8, negative: 7 },
      { name: 'W6', positive: 84, neutral: 10, negative: 6 },
      { name: 'W7', positive: 82, neutral: 10, negative: 8 },
    ],
    secondaryLabel: '颜值党正向反馈主因：XT5/CT5家族化设计认可度极高'
  },
  power: {
    pie: [
      { name: '正向驱动', value: 62, color: '#10b981', count: 993 },
      { name: '中性反馈', value: 18, color: '#94a3b8', count: 288 },
      { name: '负向抑制', value: 20, color: '#f43f5e', count: 320 },
    ],
    trend: [
      { name: 'W1', positive: 55, neutral: 25, negative: 20 },
      { name: 'W2', positive: 58, neutral: 22, negative: 20 },
      { name: 'W3', positive: 60, neutral: 20, negative: 20 },
      { name: 'W4', positive: 65, neutral: 15, negative: 20 },
      { name: 'W5', positive: 63, neutral: 17, negative: 20 },
      { name: 'W6', positive: 64, neutral: 16, negative: 20 },
      { name: 'W7', positive: 62, neutral: 18, negative: 20 },
    ],
    secondaryLabel: '操控型客户正向反馈：CT5后驱系统同级领先'
  },
  brand: {
    pie: [
      { name: '正向驱动', value: 75, color: '#10b981', count: 1012 },
      { name: '中性反馈', value: 15, color: '#94a3b8', count: 202 },
      { name: '负向抑制', value: 10, color: '#f43f5e', count: 135 },
    ],
    trend: [
      { name: 'W1', positive: 70, neutral: 20, negative: 10 },
      { name: 'W2', positive: 72, neutral: 18, negative: 10 },
      { name: 'W3', positive: 75, neutral: 15, negative: 10 },
      { name: 'W4', positive: 74, neutral: 16, negative: 10 },
      { name: 'W5', positive: 78, neutral: 12, negative: 10 },
      { name: 'W6', positive: 76, neutral: 14, negative: 10 },
      { name: 'W7', positive: 75, neutral: 15, negative: 10 },
    ],
    secondaryLabel: '忠诚型客户反馈稳定，主要顾虑在于内饰迭代速度'
  }
};

const SANKEY_DATA = {
  nodes: [
    { name: '价格敏感型', color: '#f59e0b', column: 0 },
    { name: '外观颜值党', color: '#ef4444', column: 0 },
    { name: 'CT5', color: '#0ea5e9', column: 1 },
    { name: 'XT5', color: '#0284c7', column: 1 },
    { name: '奔驰C', color: '#f97316', column: 2 },
    { name: '奔驰GLC', color: '#f59e0b', column: 2 },
    { name: '宝马3系', color: '#8b5cf6', column: 2 },
    { name: '宝马X3', color: '#a78bfa', column: 2 },
    { name: '外观颜值', color: '#3b82f6', column: 3 },
    { name: '发动机性能', color: '#2563eb', column: 3 },
    { name: '好', color: '#10b981', column: 4 },
    { name: '坏', color: '#64748b', column: 4 },
  ],
  links: [
    { source: 0, target: 2, value: 40 },
    { source: 0, target: 3, value: 30 },
    { source: 1, target: 2, value: 20 },
    { source: 1, target: 3, value: 50 },
    { source: 2, target: 4, value: 25 },
    { source: 2, target: 5, value: 20 },
    { source: 2, target: 6, value: 15 },
    { source: 3, target: 6, value: 30 },
    { source: 3, target: 7, value: 40 },
    { source: 6, target: 8, value: 20 },
    { source: 6, target: 9, value: 35 },
    { source: 7, target: 9, value: 40 },
    { source: 9, target: 10, value: 51 },
    { source: 9, target: 11, value: 49 },
  ]
};

const COMBINED_TREND_DATA = [
  { name: 'W1', value1: 72, value2: 45 },
  { name: 'W2', value1: 74, value2: 48 },
  { name: 'W3', value1: 76, value2: 46 },
  { name: 'W4', value1: 77, value2: 45 },
  { name: 'W5', value1: 78, value2: 44 },
  { name: 'W6', value1: 77, value2: 47 },
  { name: 'W7', value1: 78, value2: 46 },
];

// --- Sub-components ---

const SankeyDiagram: React.FC<{ data: any; onNodeClick: (node: any) => void }> = ({ data, onNodeClick }) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 400 });

  useEffect(() => {
    if (!containerRef.current) return;
    const observer = new ResizeObserver((entries) => {
      if (entries[0]) {
        setDimensions({
          width: entries[0].contentRect.width,
          height: entries[0].contentRect.height
        });
      }
    });
    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!svgRef.current || dimensions.width === 0 || dimensions.height === 0) return;

    const svg = d3.select(svgRef.current);
    svg.selectAll('*').remove();

    const { width, height } = dimensions;
    const margin = { top: 10, right: 100, bottom: 20, left: 10 };

    const sankeyGenerator = sankey<any, any>()
      .nodeWidth(16)
      .nodePadding(30)
      .extent([[margin.left, margin.top], [width - margin.right, height - margin.bottom]])
      .nodeAlign(sankeyCenter);

    const { nodes, links } = sankeyGenerator({
      nodes: data.nodes.map((d: any, i: number) => ({ ...d, index: i })),
      links: data.links.map((d: any) => ({ ...d }))
    });

    // Links
    svg.append('g')
      .attr('fill', 'none')
      .selectAll('path')
      .data(links)
      .join('path')
      .attr('d', sankeyLinkHorizontal())
      .attr('stroke', (d: any) => d.source.color)
      .attr('stroke-opacity', 0.15)
      .attr('stroke-width', (d: any) => Math.max(1, d.width))
      .attr('class', 'transition-all duration-300 hover:stroke-opacity-40')
      .style('mix-blend-mode', 'multiply');

    // Nodes
    const node = svg.append('g')
      .selectAll('g')
      .data(nodes)
      .join('g')
      .attr('class', 'cursor-pointer group/node')
      .on('click', (event, d) => onNodeClick(d));

    node.append('rect')
      .attr('x', (d: any) => d.x0)
      .attr('y', (d: any) => d.y0)
      .attr('height', (d: any) => d.y1 - d.y0)
      .attr('width', (d: any) => d.x1 - d.x0)
      .attr('fill', (d: any) => d.color)
      .attr('rx', 4)
      .attr('class', 'transition-all duration-300 group-hover/node:brightness-110 shadow-sm');

    // Labels
    node.append('text')
      .attr('x', (d: any) => d.x1 + 8)
      .attr('y', (d: any) => (d.y1 + d.y0) / 2)
      .attr('dy', '0.35em')
      .attr('text-anchor', 'start')
      .text((d: any) => d.name)
      .attr('class', 'text-[10px] font-medium fill-slate-500 pointer-events-none');
    
    // Percentages inside nodes or near them
    node.append('text')
      .attr('x', (d: any) => d.x0 - 8)
      .attr('y', (d: any) => (d.y1 + d.y0) / 2)
      .attr('dy', '0.35em')
      .attr('text-anchor', 'end')
      .text((d: any) => `${Math.round(d.value)}%`)
      .attr('class', 'text-[9px] font-bold fill-slate-300 pointer-events-none');

    // Column Titles removed as they are now handled by filters in parent
  }, [dimensions]);

  return (
    <div ref={containerRef} className="w-full h-full min-h-0">
      <svg ref={svgRef} width={dimensions.width} height={dimensions.height} />
    </div>
  );
};

const MetricCard: React.FC<{ title: string; children: React.ReactNode; className?: string }> = ({ title, children, className }) => (
  <div className={`bg-white dark:bg-slate-800 p-4 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-sm flex flex-col ${className}`}>
    <h4 className="text-[11px] font-bold text-slate-400 mb-2">{title}</h4>
    {children}
  </div>
);

const FILTER_CONFIG = {
  persona: {
    label: '客户画像',
    items: ['价格敏感型', '外观颜值党', '动力操控型', '品牌忠诚型']
  },
  ownProduct: {
    label: '本品主体',
    items: ['CT4', 'CT5', 'CT6', 'XT4', 'XT5', 'XT6', 'LYRIQ']
  },
  compProduct: {
    label: '竞品主体',
    items: ['奔驰C/E/GLC', '宝马3/5/X3', '奥迪A4/A6/Q5', '蔚来ET5/ES6', '理想L7/L8']
  },
  needs: {
    label: '客户需求',
    items: ['动力性能', '外观内饰', '空间配置', '智能驾驶', '品牌服务', '金融权益']
  }
};

const VIEWPOINTS_DATA = [
  { 
    title: '正向观点', 
    color: 'bg-emerald-500', 
    textColor: 'text-emerald-600',
    items: [
      { 
        id: 'v1', 
        parts: [
          { text: '加速初段', isKeyword: true, id: 'v1_s1' },
          { text: '响应迅速，' },
          { text: '推背感强烈', isKeyword: true, id: 'v1_s2' }
        ] 
      },
    ] 
  },
  { 
    title: '中性观点', 
    color: 'bg-slate-400', 
    textColor: 'text-slate-500',
    items: [
      { 
        id: 'v5', 
        parts: [
          { text: '激烈驾驶下' },
          { text: '油耗略有攀升', isKeyword: true, id: 'v5_s1' },
          { text: '，但在' },
          { text: '可接受范围', isKeyword: true, id: 'v5_s2' }
        ] 
      },
    ] 
  },
  { 
    title: '负向观点', 
    color: 'bg-rose-500', 
    textColor: 'text-rose-600',
    items: [
      { 
        id: 'v4', 
        parts: [
          { text: '冷车启动时' },
          { text: '发动机', isKeyword: true, id: 'v4_s1' },
          { text: '会有' },
          { text: '轻微抖动', isKeyword: true, id: 'v4_s2' }
        ] 
      },
    ] 
  },
];

const CustomerValueInsightBeta2: React.FC = () => {
  // Filter States
  const [activeFilter, setActiveFilter] = useState<string | null>(null);
  const [selectedFilters, setSelectedFilters] = useState<Record<string, string[]>>({
    persona: [],
    ownProduct: [],
    compProduct: [],
    needs: []
  });

  const toggleFilterItem = (category: string, item: string) => {
    setSelectedFilters(prev => {
      const current = prev[category] || [];
      const updated = current.includes(item) 
        ? current.filter(i => i !== item)
        : [...current, item];
      return { ...prev, [category]: updated };
    });
  };

  const [viewMode, setViewMode] = useState<'bubble' | 'bar'>('bubble');
  const [selectedDimension, setSelectedDimension] = useState('外观颜值');
  
  const getKeywordText = (id?: string) => {
    if (!id) return '润色 Q&A';
    for (const group of VIEWPOINTS_DATA) {
      for (const item of group.items) {
        const part = item.parts.find(p => p.id === id);
        if (part) return part.text;
      }
    }
    return '润色 Q&A';
  };

  const [selectedPersonaId, setSelectedPersonaId] = useState<string>('total');
  const [selectedNode, setSelectedNode] = useState<any>(null);
  const [visibleSentiments, setVisibleSentiments] = useState<string[]>(['positive', 'neutral', 'negative']);
  const [sortConfig, setSortConfig] = useState<{ key: 'pos' | 'neu' | 'neg' | null; order: 'asc' | 'desc' | null }>({
    key: null,
    order: null
  });

  const toggleSort = (key: 'pos' | 'neu' | 'neg') => {
    if (viewMode !== 'bar') return;
    
    setSortConfig(prev => {
      if (prev.key === key) {
        if (prev.order === 'desc') return { key, order: 'asc' };
        if (prev.order === 'asc') return { key: null, order: null };
        return { key, order: 'desc' };
      }
      return { key, order: 'desc' };
    });
  };
  const [drillDownState, setDrillDownState] = useState<{
    level: 'viewpoint' | 'qa' | 'raw';
    viewpointId?: string;
    qaId?: string;
  }>({ level: 'viewpoint' });

  const currentSentimentData = useMemo(() => {
    return PERSONA_SENTIMENT_DATA[selectedPersonaId] || PERSONA_SENTIMENT_DATA.total;
  }, [selectedPersonaId]);

  const positiveRate = useMemo(() => {
    const pos = currentSentimentData.pie.find(p => p.name === '正向驱动');
    return pos ? pos.value : 0;
  }, [currentSentimentData]);

  return (
    <div className="max-w-[1600px] mx-auto p-6 space-y-6 animate-fade-in">
      
      {/* Header */}
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-3 mb-2">
        <div>
          <h1 className="text-xl font-bold text-slate-900 dark:text-white leading-tight">客户洞察看板</h1>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex bg-white dark:bg-slate-800 rounded-lg p-1 border border-slate-100 dark:border-slate-700">
            <button className="px-3 py-1.5 text-xs font-bold text-slate-600 dark:text-slate-300 bg-slate-50 dark:bg-slate-700 rounded-md shadow-sm">昨天</button>
            <button className="px-3 py-1.5 text-xs font-bold text-slate-400 dark:text-slate-500">周</button>
            <button className="px-3 py-1.5 text-xs font-bold text-slate-400 dark:text-slate-500">月</button>
          </div>
          
          <div className="h-4 w-px bg-slate-200 dark:bg-slate-700 mx-1 hidden lg:block" />

          <div className="flex items-center gap-2 px-3 py-2 bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-lg text-xs font-bold text-slate-600 dark:text-slate-300 cursor-pointer hover:border-primary-200 transition-colors">
            门店：全部 <ChevronDown size={14} />
          </div>
          <div className="flex items-center gap-2 px-3 py-2 bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-lg text-xs font-bold text-slate-600 dark:text-slate-300 cursor-pointer hover:border-primary-200 transition-colors">
            车型：全部 <ChevronDown size={14} />
          </div>
        </div>
      </header>

      {/* Top Overview Section with Visual Association - Three Column Layout */}
      <div className="flex flex-col xl:flex-row gap-6 lg:items-stretch">
        
        {/* Column 1: 数据驱动控制台 */}
        <div className="w-full xl:w-[320px] shrink-0">
          <div className="bg-white dark:bg-slate-800 rounded-3xl border border-slate-100 dark:border-slate-700 shadow-sm overflow-hidden flex flex-col h-full">
            <div className="p-5 border-b border-slate-50 dark:border-slate-700/50">
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">数据驱动控制台</h3>
            </div>
            
            <div className="p-5 space-y-5 flex-1 flex flex-col">
              {/* Total Card */}
              <div 
                className="bg-gradient-to-br from-[#5c56d6] to-[#4c44cf] rounded-3xl p-5 text-white shadow-xl shadow-indigo-500/20 relative overflow-hidden group cursor-pointer"
                onClick={() => setSelectedPersonaId('total')}
              >
                <div className="absolute -right-4 -top-4 w-24 h-24 bg-white/10 rounded-full blur-2xl group-hover:scale-110 transition-transform duration-500" />
                <div className="flex items-center gap-4 mb-2">
                  <div className="p-2.5 bg-white/20 rounded-2xl backdrop-blur-md">
                    <Filter size={20} />
                  </div>
                  <div>
                    <h4 className="text-3xl font-black tracking-tighter leading-none">8,429</h4>
                    <p className="text-[10px] font-bold opacity-80 uppercase tracking-widest mt-1">总客流基数</p>
                  </div>
                </div>
                <div className="absolute right-5 bottom-5 flex flex-col items-end">
                   <div className="flex items-center gap-1.5 px-2 py-0.5 bg-white/20 backdrop-blur-md rounded-full text-[10px] font-bold mb-1 shadow-sm">
                     <CheckCircle2 size={10} /> 全局
                   </div>
                   <div className="text-[11px] font-black text-white/90 flex items-center gap-1">
                     <TrendingUp size={12} /> +12.5%
                   </div>
                </div>
              </div>

              {/* Cluster List */}
              <div className="space-y-3 flex-1">
                <div className="flex items-center gap-3 px-1 mb-1">
                   <div className="h-px flex-1 bg-slate-100 dark:bg-slate-800" />
                   <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest">分集群</span>
                   <div className="h-px flex-1 bg-slate-100 dark:bg-slate-800" />
                </div>
                
                {PERSONA_DATA.map((item, i) => (
                  <div 
                    key={i} 
                    className={`group cursor-pointer p-4 rounded-[24px] transition-all border ${
                      selectedPersonaId === item.id 
                        ? 'bg-white dark:bg-slate-700 border-primary-200 dark:border-primary-800 shadow-md transform -translate-y-0.5' 
                        : 'bg-white/40 dark:bg-slate-800/20 border-slate-50 hover:bg-white hover:shadow-sm hover:border-slate-100'
                    }`}
                    onClick={() => setSelectedPersonaId(item.id)}
                  >
                    <div className="flex justify-between items-center mb-3">
                       <div className="flex items-center gap-3">
                         <div className="w-2.5 h-2.5 rounded-full shadow-sm" style={{ backgroundColor: item.color }} />
                         <span className="text-xs font-black text-slate-500 dark:text-slate-300">{item.name}</span>
                       </div>
                       <span className="font-mono text-sm font-black text-slate-800 dark:text-white">{item.value}%</span>
                    </div>
                    <div className="h-2 bg-slate-100/50 dark:bg-slate-700/50 rounded-full overflow-hidden shadow-inner">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${item.value}%` }}
                        className="h-full rounded-full shadow-[0_0_8px_rgba(0,0,0,0.05)]"
                        style={{ backgroundColor: item.color }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* The Arrow Connector (Visible only on large screens) */}
        <div className="hidden xl:flex items-center justify-center px-4">
          <div className="relative">
            <motion.div 
              animate={{ x: [0, 5, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              <svg width="40" height="60" viewBox="0 0 40 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-slate-200 dark:text-slate-700 opacity-80">
                <path d="M5 30H30" stroke="currentColor" strokeWidth="6" strokeLinecap="round" />
                <path d="M20 15L35 30L20 45" stroke="currentColor" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </motion.div>
          </div>
        </div>

        {/* Right Metric Group */}
        <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-6 h-full">
          {/* Column 2: 情感驱动力详情 */}
          <div className="bg-white dark:bg-slate-800 rounded-3xl border border-slate-100 dark:border-slate-700 shadow-sm overflow-hidden flex flex-col h-full hover:shadow-md transition-shadow">
            <div className="p-5 border-b border-slate-50 dark:border-slate-700/50">
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                情感驱动力详情 · {selectedPersonaId === 'total' ? '全局' : PERSONA_DATA.find(p => p.id === selectedPersonaId)?.name}
              </h3>
            </div>
            
            <div className="p-6 flex-1 flex flex-col min-h-0">
              <div className="flex justify-center mb-4">
                <div className="px-3 py-1 bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-xl text-[11px] font-bold text-slate-400 shadow-sm">
                  已选: {selectedPersonaId === 'total' ? '全局流量' : PERSONA_DATA.find(p => p.id === selectedPersonaId)?.name}
                </div>
              </div>

              <div className="flex-1 flex flex-col items-center justify-center py-2">
                <div className="relative w-44 h-44">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={currentSentimentData.pie}
                        innerRadius={54}
                        outerRadius={74}
                        paddingAngle={5}
                        dataKey="value"
                        stroke="none"
                      >
                        {currentSentimentData.pie.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                    </PieChart>
                  </ResponsiveContainer>
                  <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                    <span className="text-3xl font-black text-slate-800 dark:text-white tracking-tighter leading-none">{positiveRate}%</span>
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">正向</span>
                  </div>
                </div>

                <div className="w-full mt-6 space-y-4 px-4">
                  {currentSentimentData.pie.map((item, i) => (
                    <div key={i} className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }} />
                        <span className="text-[12px] font-bold text-slate-500 dark:text-slate-400">{item.name}</span>
                      </div>
                      <div className="flex items-center gap-5">
                        <span className="text-[12px] font-medium text-slate-400 font-mono">{item.count.toLocaleString()}</span>
                        <span className="text-[12px] font-black w-8 text-right" style={{ color: item.color }}>{item.value}%</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-8 p-4 bg-[#fff9eb] dark:bg-amber-900/10 border border-[#feeeb7] dark:border-amber-800 rounded-3xl flex items-center gap-4 transition-all hover:shadow-sm">
                 <div className="w-6 h-6 rounded-full bg-white flex items-center justify-center shadow-sm shrink-0">
                   <AlertTriangle size={14} className="text-amber-500" />
                 </div>
                 <p className="text-[11px] font-black text-amber-800/80 dark:text-amber-500 leading-tight">
                   {currentSentimentData.secondaryLabel || '情感波动稳定，暂无重大负向预警信号'}
                 </p>
              </div>
            </div>
          </div>

          {/* Column 3: 演进趋势 */}
          <div className="bg-white dark:bg-slate-800 rounded-3xl border border-slate-100 dark:border-slate-700 shadow-sm overflow-hidden flex flex-col h-full hover:shadow-md transition-shadow">
            <div className="p-5 border-b border-slate-50 dark:border-slate-700/50">
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                演进趋势 · {selectedPersonaId === 'total' ? '全局' : PERSONA_DATA.find(p => p.id === selectedPersonaId)?.name}
              </h3>
            </div>

            <div className="p-6 flex-1 flex flex-col min-h-0">
              <div className="flex justify-center mb-6">
                <div className="px-3 py-1 bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-xl text-[11px] font-bold text-slate-400 shadow-sm">
                  已选: {selectedPersonaId === 'total' ? '全局流量' : PERSONA_DATA.find(p => p.id === selectedPersonaId)?.name}
                </div>
              </div>

              <div className="flex-1 h-full min-h-[220px]">
                <ResponsiveContainer width="100%" height="100%">
                  <ReLineChart data={currentSentimentData.trend} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="6 6" vertical={false} stroke="#f1f5f9" />
                    <XAxis 
                      dataKey="name" 
                      axisLine={false} 
                      tickLine={false} 
                      tick={{ fontSize: 10, fontBold: '700', fill: '#cbd5e1' }} 
                      dy={10}
                    />
                    <YAxis hide domain={[0, 100]} />
                    <Tooltip 
                      contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 8px 30px rgba(0,0,0,0.1)', padding: '12px' }}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="positive" 
                      stroke="#10b981" 
                      strokeWidth={3} 
                      dot={{ r: 3.5, fill: '#10b981', strokeWidth: 0 }}
                      activeDot={{ r: 5.5, strokeWidth: 0 }}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="neutral" 
                      stroke="#94a3b8" 
                      strokeWidth={2} 
                      strokeDasharray="4 4"
                      dot={{ r: 3, fill: '#94a3b8', strokeWidth: 0 }}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="negative" 
                      stroke="#f43f5e" 
                      strokeWidth={2} 
                      dot={{ r: 3, fill: '#f43f5e', strokeWidth: 0 }}
                    />
                  </ReLineChart>
                </ResponsiveContainer>
              </div>

              <div className="flex justify-center gap-8 mt-4">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-sm" />
                  <span className="text-[11px] font-bold text-slate-400">正向驱动</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-slate-400 shadow-sm" />
                  <span className="text-[11px] font-bold text-slate-400">中性反馈</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-rose-500 shadow-sm" />
                  <span className="text-[11px] font-bold text-slate-400">负向抑制</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>




      {/* Main Analysis Section */}
      <div className="bg-white dark:bg-slate-800 rounded-3xl border border-slate-100 dark:border-slate-700 shadow-sm overflow-hidden h-[750px] flex flex-col">
        <div className="flex flex-col md:flex-row md:items-center justify-between px-6 py-4 border-b border-slate-50 dark:border-slate-700/50 shrink-0 gap-4">
          <div className="flex items-center gap-3">
            <h2 className="text-base font-bold text-slate-800 dark:text-white">多维关联看板</h2>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 flex-1 min-h-0">
          {/* Left: Sankey */}
          <div className="border-r border-slate-50 dark:border-slate-700/50 flex flex-col min-h-0 relative">
            <div className="px-6 py-4 flex items-center justify-between shrink-0 border-b border-slate-50/50 dark:border-slate-700/30">
              {Object.entries(FILTER_CONFIG).map(([key, config]) => (
                <div key={key} className="relative group flex-1">
                  <div 
                    className={`inline-flex items-center gap-1.5 p-1.5 rounded-lg transition-colors cursor-pointer ${
                      activeFilter === key ? 'bg-primary-50 dark:bg-primary-900/20' : 'hover:bg-slate-50 dark:hover:bg-slate-800'
                    }`}
                    onClick={() => setActiveFilter(activeFilter === key ? null : key)}
                  >
                    <span className={`text-[10px] font-black uppercase tracking-widest transition-colors ${
                      activeFilter === key || selectedFilters[key].length > 0 ? 'text-primary-600' : 'text-slate-400'
                    }`}>
                      {config.label}
                      {selectedFilters[key].length > 0 && (
                        <span className="ml-1 px-1 bg-primary-100 text-primary-700 rounded-[4px] text-[9px]">
                          {selectedFilters[key].length}
                        </span>
                      )}
                    </span>
                    <ChevronDown size={10} className={`transition-transform duration-200 ${
                      activeFilter === key ? 'rotate-180 text-primary-400' : 'text-slate-300'
                    }`} />
                  </div>

                  {activeFilter === key && (
                    <div className="absolute top-full left-0 mt-2 w-48 bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-xl shadow-[0_10px_30px_rgba(0,0,0,0.1)] z-50 p-2 py-3 animate-in fade-in slide-in-from-top-2">
                      <div className="space-y-1">
                        {config.items.map((item) => (
                          <div 
                            key={item}
                            className="flex items-center gap-2.5 px-3 py-2 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700/50 cursor-pointer transition-colors group/item"
                            onClick={(e) => {
                              e.stopPropagation();
                              toggleFilterItem(key, item);
                            }}
                          >
                            <div className={`w-3.5 h-3.5 rounded border flex items-center justify-center transition-colors ${
                              selectedFilters[key].includes(item) 
                                ? 'bg-primary-500 border-primary-500' 
                                : 'border-slate-200 dark:border-slate-600'
                            }`}>
                              {selectedFilters[key].includes(item) && <Check size={10} className="text-white" />}
                            </div>
                            <span className={`text-xs font-bold transition-colors ${
                              selectedFilters[key].includes(item) ? 'text-primary-600' : 'text-slate-600 dark:text-slate-400'
                            }`}>
                              {item}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
              <div className="flex-1 flex justify-end">
                <span className="text-[10px] font-black text-slate-300 dark:text-slate-600 uppercase tracking-widest">评价/MOT</span>
              </div>
            </div>

            <div className="flex-1 min-h-0 p-6 pt-2">
              <SankeyDiagram data={SANKEY_DATA} onNodeClick={(node) => {
                setSelectedNode(node);
                setDrillDownState({ level: 'viewpoint' });
              }} />
            </div>
          </div>

          {/* Right: Detail Panel */}
          <div className="bg-slate-50/10 dark:bg-slate-900/10 relative overflow-hidden flex flex-col h-full">
            {/* Navigation Breadcrumbs - Level 1 to 4 */}
            <div className="px-8 pt-6 shrink-0 z-20">
              <div className="flex items-center gap-1.5 transition-all text-[11px] font-bold">
                <button 
                  onClick={() => {
                    setSelectedNode(null);
                    setDrillDownState({ level: 'viewpoint' });
                  }}
                  className={`px-2 py-0.5 rounded leading-none transition-all ${
                    !selectedNode 
                      ? 'text-primary-600 bg-primary-50 dark:bg-primary-900/30 ring-1 ring-primary-200 dark:ring-primary-800' 
                      : 'text-slate-400 hover:text-slate-600 hover:bg-slate-100 dark:hover:bg-slate-800'
                  }`}
                >
                  需求洞察
                </button>
                
                {selectedNode && (
                  <>
                    <ChevronRight size={10} className="text-slate-300" />
                    <button 
                      onClick={() => setDrillDownState({ level: 'viewpoint' })}
                      className={`px-2 py-0.5 rounded leading-none transition-all ${
                        drillDownState.level === 'viewpoint' 
                          ? 'text-primary-600 bg-primary-50 dark:bg-primary-900/30 ring-1 ring-primary-200 dark:ring-primary-800' 
                          : 'text-slate-400 hover:text-slate-600 hover:bg-slate-100 dark:hover:bg-slate-800'
                      }`}
                    >
                      {selectedNode.name}
                    </button>
                  </>
                )}

                {(drillDownState.level === 'qa' || drillDownState.level === 'raw') && (
                  <>
                    <ChevronRight size={10} className="text-slate-300" />
                    <button 
                      onClick={() => setDrillDownState({ level: 'qa', viewpointId: drillDownState.viewpointId })}
                      className={`px-2 py-0.5 rounded leading-none transition-all ${
                        drillDownState.level === 'qa' 
                          ? 'text-primary-600 bg-primary-50 dark:bg-primary-900/30 ring-1 ring-primary-200 dark:ring-primary-800' 
                          : 'text-slate-400 hover:text-slate-600 hover:bg-slate-100 dark:hover:bg-slate-800'
                      }`}
                    >
                      {getKeywordText(drillDownState.viewpointId)}
                    </button>
                  </>
                )}

                {drillDownState.level === 'raw' && (
                  <>
                    <ChevronRight size={10} className="text-slate-300" />
                    <span className="px-2 py-0.5 rounded leading-none text-primary-600 bg-primary-50 dark:bg-primary-900/30 ring-1 ring-primary-200 dark:ring-primary-800">
                      原始对话
                    </span>
                  </>
                )}
              </div>
            </div>

            <AnimatePresence mode="wait">
              {!selectedNode ? (
                <motion.div 
                  key="summary"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="flex flex-col h-full p-8 pt-4"
                >
                  <div className="flex justify-between items-end mb-4 shrink-0">
                    <p className="text-[11px] text-slate-400 font-medium">基于 8,429 名全量客流的关联挖掘</p>
                    <div className="flex items-center gap-1 p-1 bg-slate-100 dark:bg-slate-700 rounded-lg">
                      <button 
                        onClick={() => setViewMode('bubble')}
                        className={`px-2 py-1 text-[10px] font-bold rounded flex items-center gap-1.5 transition-all ${
                          viewMode === 'bubble' 
                          ? 'bg-white dark:bg-slate-800 text-primary-600 shadow-sm' 
                          : 'text-slate-400 hover:text-slate-600'
                        }`}
                      >
                        <Sparkles size={10} /> 气泡图
                      </button>
                      <button 
                        onClick={() => setViewMode('bar')}
                        className={`px-2 py-1 text-[10px] font-bold rounded flex items-center gap-1.5 transition-all ${
                          viewMode === 'bar' 
                          ? 'bg-white dark:bg-slate-800 text-primary-600 shadow-sm' 
                          : 'text-slate-400 hover:text-slate-600'
                        }`}
                      >
                        <TrendingUp size={10} /> 堆叠图
                      </button>
                    </div>
                  </div>

                  <div className="flex flex-col flex-1 min-h-0 mt-2">
                    {/* Sentiment Axis Labels */}
                    <div className="flex flex-col gap-2 mb-4 px-4 shrink-0">
                      {viewMode === 'bar' && (
                        <div className="flex items-center justify-center gap-1 mb-0.5 animate-in fade-in slide-in-from-top-1">
                          <div className="h-px w-8 bg-slate-100 dark:bg-slate-800" />
                          <span className="text-[9px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider flex items-center gap-1">
                            <TrendingUp size={10} /> 点击标签可进行排序
                          </span>
                          <div className="h-px w-8 bg-slate-100 dark:bg-slate-800" />
                        </div>
                      )}
                      <div className="flex justify-between items-center">
                        <button 
                          onClick={() => {
                            if (viewMode === 'bar') {
                              toggleSort('pos');
                            } else {
                              setVisibleSentiments(prev => prev.includes('positive') ? prev.filter(t => t !== 'positive') : [...prev, 'positive']);
                            }
                          }}
                          className={`flex items-center gap-2 cursor-pointer transition-all px-2 py-1.5 rounded-lg border border-transparent ${
                            viewMode === 'bar' 
                              ? sortConfig.key === 'pos' 
                                ? 'bg-emerald-500/10 border-emerald-500/20 ring-1 ring-emerald-500/20' 
                                : 'hover:bg-emerald-50 dark:hover:bg-emerald-900/10 hover:border-emerald-500/20'
                              : 'hover:bg-slate-100 dark:hover:bg-slate-800/50'
                          } ${!visibleSentiments.includes('positive') && viewMode === 'bubble' ? 'opacity-30' : 'opacity-100'}`}
                        >
                           <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
                           <span className="text-[10px] font-black text-emerald-500 uppercase tracking-widest flex items-center gap-1">
                             正向因子
                             {viewMode === 'bar' && sortConfig.key === 'pos' && (
                               sortConfig.order === 'desc' ? <TrendingDown size={10} /> : <TrendingUp size={10} />
                             )}
                           </span>
                        </button>
                        <button 
                          onClick={() => {
                            if (viewMode === 'bar') {
                              toggleSort('neu');
                            } else {
                              setVisibleSentiments(prev => prev.includes('neutral') ? prev.filter(t => t !== 'neutral') : [...prev, 'neutral']);
                            }
                          }}
                          className={`flex items-center gap-2 cursor-pointer transition-all px-2 py-1.5 rounded-lg border border-transparent ${
                            viewMode === 'bar' 
                              ? sortConfig.key === 'neu' 
                                ? 'bg-slate-500/10 border-slate-500/20 ring-1 ring-slate-500/20' 
                                : 'hover:bg-slate-100 dark:hover:bg-slate-800/50 hover:border-slate-500/20'
                              : 'hover:bg-slate-100 dark:hover:bg-slate-800/50'
                          } ${!visibleSentiments.includes('neutral') && viewMode === 'bubble' ? 'opacity-30' : 'opacity-100'}`}
                        >
                           <div className="w-1.5 h-1.5 rounded-full bg-slate-400 shadow-[0_0_8px_rgba(148,163,184,0.5)]" />
                           <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-1">
                             中性平衡
                             {viewMode === 'bar' && sortConfig.key === 'neu' && (
                               sortConfig.order === 'desc' ? <TrendingDown size={10} /> : <TrendingUp size={10} />
                             )}
                           </span>
                        </button>
                        <button 
                          onClick={() => {
                            if (viewMode === 'bar') {
                              toggleSort('neg');
                            } else {
                              setVisibleSentiments(prev => prev.includes('negative') ? prev.filter(t => t !== 'negative') : [...prev, 'negative']);
                            }
                          }}
                          className={`flex items-center gap-2 cursor-pointer transition-all px-2 py-1.5 rounded-lg border border-transparent ${
                            viewMode === 'bar' 
                              ? sortConfig.key === 'neg' 
                                ? 'bg-rose-500/10 border-rose-500/20 ring-1 ring-rose-500/20' 
                                : 'hover:bg-rose-50 dark:hover:bg-rose-900/10 hover:border-rose-500/20'
                              : 'hover:bg-slate-100 dark:hover:bg-slate-800/50'
                          } ${!visibleSentiments.includes('negative') && viewMode === 'bubble' ? 'opacity-30' : 'opacity-100'}`}
                        >
                           <span className="text-[10px] font-black text-rose-500 uppercase tracking-widest flex items-center gap-1">
                             {viewMode === 'bar' && sortConfig.key === 'neg' && (
                               sortConfig.order === 'desc' ? <TrendingDown size={10} /> : <TrendingUp size={10} />
                             )}
                             负向因子
                           </span>
                           <div className="w-1.5 h-1.5 rounded-full bg-rose-500 shadow-[0_0_8px_rgba(244,63,94,0.5)]" />
                        </button>
                      </div>
                    </div>

                    {/* Chart Area Container */}
                    <div className="flex-1 relative overflow-hidden bg-slate-50/50 dark:bg-slate-900/20 rounded-3xl border border-slate-100 dark:border-slate-800 min-h-0">
                      <AnimatePresence mode="wait">
                        {viewMode === 'bubble' ? (
                          <motion.div
                            key="bubble-view"
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            transition={{ duration: 0.2 }}
                            className="absolute inset-0"
                          >
                            <div className="absolute inset-0 flex items-center justify-center">
                               <div className="w-px h-[80%] bg-gradient-to-b from-transparent via-slate-200 dark:via-slate-700 to-transparent opacity-50" />
                            </div>
      
                            {[
                              { id: '1', text: '功能配置', count: 820, sentiment: 0.85, type: 'positive', top: '15%', left: '12%', size: 'w-24 h-24' },
                              { id: '2', text: '座椅舒适性', count: 650, sentiment: 0.78, type: 'positive', top: '45%', left: '8%', size: 'w-20 h-20' },
                              { id: '3', text: '驾控性能', count: 540, sentiment: 0.82, type: 'positive', top: '25%', left: '30%', size: 'w-18 h-18' },
                              { id: '13', text: '充电性能', count: 410, sentiment: 0.52, type: 'neutral', top: '10%', left: '48%', size: 'w-18 h-18' },
                              { id: '4', text: '底盘噪音', count: 420, sentiment: 0.25, type: 'negative', top: '20%', left: '60%', size: 'w-18 h-18' },
                              { id: '5', text: '续航里程', count: 380, sentiment: 0.35, type: 'negative', top: '55%', left: '75%', size: 'w-16 h-16' },
                              { id: '14', text: '悬挂系统', count: 345, sentiment: 0.50, type: 'neutral', top: '65%', left: '45%', size: 'w-16 h-16' },
                              { id: '6', text: '外观设计', count: 320, sentiment: 0.92, type: 'positive', top: '70%', left: '15%', size: 'w-16 h-16' },
                              { id: '7', text: '车机系统', count: 290, sentiment: 0.15, type: 'negative', top: '40%', left: '55%', size: 'w-16 h-16' },
                              { id: '8', text: '内饰设计', count: 480, sentiment: 0.88, type: 'positive', top: '50%', left: '26%', size: 'w-16 h-16' },
                              { id: '9', text: '导航系统', count: 350, sentiment: 0.42, type: 'negative', top: '75%', left: '60%', size: 'w-14 h-14' },
                              { id: '15', text: '刹车系统', count: 220, sentiment: 0.48, type: 'neutral', top: '40%', left: '38%', size: 'w-14 h-14' },
                              { id: '10', text: '智能科技', count: 310, sentiment: 0.95, type: 'positive', top: '10%', left: '30%', size: 'w-14 h-14' },
                              { id: '11', text: '优惠收窄', count: 210, sentiment: 0.28, type: 'negative', top: '10%', left: '72%', size: 'w-12 h-12' },
                              { id: '12', text: '乘坐空间', count: 270, sentiment: 0.89, type: 'positive', top: '80%', left: '32%', size: 'w-12 h-12' },
                              { id: '16', text: '油箱容积', count: 180, sentiment: 0.45, type: 'neutral', top: '85%', left: '55%', size: 'w-12 h-12' },
                            ].filter(word => visibleSentiments.includes(word.type)).map((word, idx) => (
                              <motion.div
                                key={word.id}
                                layout
                                initial={{ scale: 0, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                exit={{ scale: 0, opacity: 0 }}
                                whileHover={{ scale: 1.1, zIndex: 50 }}
                                transition={{ 
                                  type: 'spring', 
                                  damping: 12, 
                                  stiffness: 100,
                                  delay: idx * 0.05 
                                }}
                                className={`absolute ${word.size} cursor-pointer group`}
                                style={{ top: word.top, left: word.left }}
                                onClick={() => {
                                  setSelectedNode({ name: word.text, color: word.type === 'positive' ? '#10b981' : word.type === 'negative' ? '#f43f5e' : '#94a3b8' });
                                  setDrillDownState({ level: 'viewpoint' });
                                }}
                              >
                                <div className={`w-full h-full rounded-full flex flex-col items-center justify-center p-2 text-center transition-all duration-300 shadow-lg ${
                                  word.type === 'positive' 
                                    ? 'bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 group-hover:bg-emerald-500 group-hover:text-white' 
                                    : word.type === 'negative'
                                      ? 'bg-rose-500/10 border border-rose-500/30 text-rose-600 dark:text-rose-400 group-hover:bg-rose-500 group-hover:text-white'
                                      : 'bg-slate-400/10 border border-slate-400/30 text-slate-500 dark:text-slate-400 group-hover:bg-slate-400 group-hover:text-white'
                                }`}>
                                  <span className="text-[10px] font-black tracking-tighter leading-tight">{word.text}</span>
                                  <span className="text-[8px] font-mono mt-1 opacity-60 group-hover:opacity-100">{word.count}</span>
                                </div>
                              </motion.div>
                            ))}
                          </motion.div>
                        ) : (
                          <motion.div
                            key="bar-view"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            transition={{ duration: 0.2 }}
                            className="absolute inset-0 p-6 overflow-y-auto custom-scrollbar"
                          >
                            <div className="space-y-4">
                              <div className="flex items-center justify-between px-1 mb-2">
                                <div className="flex items-center gap-3 flex-1">
                                  <div className="w-12" />
                                  <span className="text-[10px] font-black text-slate-300 dark:text-slate-600 uppercase tracking-widest">核心维度分布</span>
                                </div>
                                <span className="text-[10px] font-black text-slate-300 dark:text-slate-600 uppercase tracking-widest">反馈客户数</span>
                              </div>
                              {[
                                { text: '功能配置', count: 628, pos: 45.92, neu: 34.13, neg: 19.95 },
                                { text: '续航里程', count: 550, pos: 23.28, neu: 50.98, neg: 25.74 },
                                { text: '乘坐空间', count: 525, pos: 59.61, neu: 21.61, neg: 18.79 },
                                { text: '外观设计', count: 488, pos: 43.69, neu: 26.15, neg: 30.16 },
                                { text: '智能科技', count: 488, pos: 46.94, neu: 30.82, neg: 22.24 },
                                { text: '内饰设计', count: 393, pos: 41.00, neu: 28.67, neg: 30.33 },
                                { text: '车身尺寸', count: 298, pos: 16.98, neu: 51.57, neg: 31.45 },
                                { text: '驾驶操控', count: 296, pos: 59.05, neu: 15.61, neg: 25.34 },
                                { text: '底盘噪音', count: 210, pos: 12.50, neu: 25.50, neg: 62.00 },
                                { text: '优惠政策', count: 180, pos: 15.00, neu: 35.00, neg: 50.00 },
                              ].sort((a, b) => {
                                if (!sortConfig.key || !sortConfig.order) return 0;
                                const valA = a[sortConfig.key];
                                const valB = b[sortConfig.key];
                                return sortConfig.order === 'desc' ? valB - valA : valA - valB;
                              }).map((item, i) => (
                                <div 
                                  key={i} 
                                  className="group cursor-pointer"
                                  onClick={() => {
                                    setSelectedNode({ 
                                      name: item.text, 
                                      color: item.pos > item.neg ? '#10b981' : '#f43f5e' 
                                    });
                                    setDrillDownState({ level: 'viewpoint' });
                                  }}
                                >
                                  <div className="flex items-center gap-3 mb-1.5">
                                    <span className="text-[10px] font-black text-slate-400 w-12 shrink-0">TOP {i + 1}</span>
                                    <span className="text-xs font-bold text-slate-700 dark:text-slate-200 flex-1">{item.text}</span>
                                    <span className="text-[10px] font-mono text-slate-400">{item.count}</span>
                                  </div>
                                  <div className="flex h-6 rounded-md overflow-hidden bg-slate-100 dark:bg-slate-800 shadow-inner group-hover:ring-1 group-hover:ring-primary-200 transition-all">
                                    <div 
                                      className="h-full bg-emerald-500 flex items-center justify-center text-white text-[9px] font-black transition-all"
                                      style={{ width: `${item.pos}%` }}
                                    >
                                      {item.pos > 15 && `${item.pos}%`}
                                    </div>
                                    <div 
                                      className="h-full bg-slate-400 flex items-center justify-center text-white text-[9px] font-black transition-all"
                                      style={{ width: `${item.neu}%` }}
                                    >
                                      {item.neu > 15 && `${item.neu}%`}
                                    </div>
                                    <div 
                                      className="h-full bg-rose-500 flex items-center justify-center text-white text-[9px] font-black transition-all"
                                      style={{ width: `${item.neg}%` }}
                                    >
                                      {item.neg > 15 && `${item.neg}%`}
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>


                  </div>
                </motion.div>
              ) : (
                <motion.div 
                  key="detail"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-8 p-8 pt-4 flex-1 flex flex-col"
                >
                  {(() => {
                    const values = selectedNode.color === '#10b981' 
                      ? { pos: '68%', neu: '20%', neg: '12%' }
                      : selectedNode.color === '#f43f5e'
                        ? { pos: '15%', neu: '25%', neg: '60%' }
                        : { pos: '24%', neu: '56%', neg: '20%' };
                    
                    return (
                      <>
                        <div className="shrink-0">
                          <div className="flex justify-end mb-1">
                            <button 
                              onClick={() => {
                                setSelectedNode(null);
                                setDrillDownState({ level: 'viewpoint' });
                              }}
                              className="p-1 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 transition-colors"
                            >
                              <X size={16} />
                            </button>
                          </div>
                          <div className="flex items-center gap-3 flex-wrap">
                            <h2 className="text-2xl font-bold text-slate-800 dark:text-white">{selectedNode.name}</h2>
                            <div className="flex gap-2">
                              <span className="px-2 py-0.5 bg-emerald-50 dark:bg-emerald-900/30 text-emerald-500 border border-emerald-100 dark:border-emerald-800 rounded-full text-[10px] font-bold">正向 {values.pos}</span>
                              <span className="px-2 py-0.5 bg-slate-50 dark:bg-slate-900/30 text-slate-400 border border-slate-100 dark:border-slate-800 rounded-full text-[10px] font-bold">中性 {values.neu}</span>
                              <span className="px-2 py-0.5 bg-rose-50 dark:bg-rose-900/30 text-rose-500 border border-rose-100 dark:border-rose-800 rounded-full text-[10px] font-bold">负向 {values.neg}</span>
                            </div>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 shrink-0">
                          <div className="space-y-3">
                            <div className="flex justify-between items-baseline mb-1">
                              <span className="text-[10px] font-bold text-emerald-600 uppercase tracking-wider font-black">正向</span>
                              <span className="text-2xl font-bold text-emerald-500 font-mono">{values.pos}</span>
                            </div>
                            <div className="h-1.5 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
                              <div className="h-full bg-emerald-500 rounded-full transition-all duration-1000 ease-out" style={{ width: values.pos }} />
                            </div>
                          </div>
                          <div className="space-y-3">
                            <div className="flex justify-between items-baseline mb-1">
                              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider font-black">中性</span>
                              <span className="text-2xl font-bold text-slate-400 font-mono">{values.neu}</span>
                            </div>
                            <div className="h-1.5 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
                              <div className="h-full bg-slate-400 rounded-full transition-all duration-1000 ease-out" style={{ width: values.neu }} />
                            </div>
                          </div>
                          <div className="space-y-3">
                            <div className="flex justify-between items-baseline mb-1">
                              <span className="text-[10px] font-bold text-rose-600 uppercase tracking-wider font-black">负向</span>
                              <span className="text-2xl font-bold text-rose-500 font-mono">{values.neg}</span>
                            </div>
                            <div className="h-1.5 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
                              <div className="h-full bg-rose-500 rounded-full transition-all duration-1000 ease-out" style={{ width: values.neg }} />
                            </div>
                          </div>
                        </div>
                      </>
                    );
                  })()}

                  <div className="space-y-4 flex-1 flex flex-col min-h-0">
                    <div className="flex items-center justify-between shrink-0">
                      <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                        {drillDownState.level === 'viewpoint' ? '核心观点' : drillDownState.level === 'qa' ? getKeywordText(drillDownState.viewpointId) : '原始对话记录'}
                      </p>
                      {drillDownState.level !== 'viewpoint' && (
                        <button 
                          onClick={() => setDrillDownState(prev => ({ 
                            level: prev.level === 'raw' ? 'qa' : 'viewpoint' 
                          }))}
                          className="flex items-center gap-1 text-[10px] font-bold text-primary-500 hover:text-primary-600 transition-colors"
                        >
                          <ArrowLeft size={12} /> 返回
                        </button>
                      )}
                    </div>
                    
                    <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar space-y-3">
                      {drillDownState.level === 'viewpoint' && (
                        <div className="space-y-6">
                          {VIEWPOINTS_DATA.map((group, groupIdx) => (
                            <div key={groupIdx} className="space-y-2">
                              <div className="flex items-center gap-2 px-1">
                                <div className={`w-1 h-3 rounded-full ${group.color}`} />
                                <span className={`text-[10px] font-black uppercase tracking-wider ${group.textColor}`}>{group.title}</span>
                              </div>
                              <div className="space-y-3">
                                {group.items.map((item, i) => (
                                  <div 
                                    key={i}
                                    className="w-full p-4 rounded-2xl border border-slate-100 dark:border-slate-700 bg-white dark:bg-slate-800/50 shadow-sm"
                                  >
                                    <div className="flex flex-wrap items-baseline gap-y-1">
                                      {item.parts.map((part, pIdx) => (
                                        part.isKeyword ? (
                                          <button
                                            key={pIdx}
                                            onClick={() => setDrillDownState({ level: 'qa', viewpointId: part.id })}
                                            className="text-xs font-bold text-primary-600 dark:text-primary-400 border-b border-dotted border-primary-400 hover:border-primary-600 hover:text-primary-700 dark:hover:text-primary-300 transition-all mx-0.5 px-0.5"
                                          >
                                            {part.text}
                                          </button>
                                        ) : (
                                          <span key={pIdx} className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed px-0.5">
                                            {part.text}
                                          </span>
                                        )
                                      ))}
                                      <ChevronRight size={10} className="text-slate-300 shrink-0 ml-1 self-center" />
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          ))}
                        </div>
                      )}

                      {drillDownState.level === 'qa' && (
                        <div className="space-y-3">
                          {[
                            { id: 'qa1', q: '客户反馈的加速感具体体现在哪些场景？', a: '主要体现在红绿灯起步和市区内短距离超车场景下，2.0T+10AT的动力组合响应非常直接，深踩油门后降档积极。' },
                            { id: 'qa2', q: '针对推背感，客户是否存在质疑？', a: '大部分客户表示满意，认为在这个价格区间内，后驱带来的加速体感比同级别竞品更纯粹。' },
                          ].map((qa, i) => (
                            <button
                              key={i}
                              onClick={() => setDrillDownState(prev => ({ ...prev, level: 'raw', qaId: qa.id }))}
                              className="w-full text-left p-4 rounded-xl border-l-4 border-l-primary-500 bg-slate-50/50 dark:bg-slate-900/30 hover:bg-white dark:hover:bg-slate-800 transition-all border border-transparent shadow-sm"
                            >
                              <div className="space-y-3">
                                <div>
                                  <span className="text-[10px] font-black text-primary-500 uppercase">提炼问题</span>
                                  <p className="text-xs font-bold text-slate-800 dark:text-white mt-1">{qa.q}</p>
                                </div>
                                <div className="pt-2 border-t border-slate-100 dark:border-slate-800">
                                  <span className="text-[10px] font-black text-slate-400 uppercase">精准解析</span>
                                  <p className="text-[11px] text-slate-600 dark:text-slate-400 leading-relaxed mt-1">{qa.a}</p>
                                </div>
                                <button 
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setDrillDownState(prev => ({ ...prev, level: 'raw', qaId: qa.id }));
                                  }}
                                  className="text-[10px] font-bold text-primary-500/70 hover:text-primary-500 text-right italic underline underline-offset-2 transition-colors inline-block ml-auto w-full"
                                >
                                  查看通话原文...
                                </button>
                              </div>
                            </button>
                          ))}
                        </div>
                      )}

                      {drillDownState.level === 'raw' && (
                        <div className="space-y-4">
                          {[
                            { role: '客户', text: '这车加速感觉挺快的，尤其起步那一哈。' },
                            { role: '销售', text: '没错，咱们新款调校了低扭响应，爆发力确实比以前好。' },
                            { role: '客户', text: '推背感挺明显的，我刚才一脚下去，身体都靠后了。' },
                            { role: '销售', text: '是的，这就是纵置后驱的优势，加速更纯粹。' },
                          ].map((msg, i) => (
                            <div key={i} className={`flex ${msg.role === '客户' ? 'justify-start' : 'justify-end'}`}>
                              <div className={`max-w-[85%] p-3 rounded-2xl text-[11px] font-medium leading-relaxed ${
                                msg.role === '客户' 
                                  ? 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-tl-none' 
                                  : 'bg-primary-500 text-white rounded-tr-none'
                              }`}>
                                <div className="text-[9px] opacity-70 mb-1 font-black">{msg.role}</div>
                                {msg.text}
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Trend Line Section */}
      <div className="bg-white dark:bg-slate-800 p-8 rounded-3xl border border-slate-100 dark:border-slate-700 shadow-sm relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
          <div>
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">趋势模块</h2>
          </div>
          <div className="flex flex-wrap gap-2">
            {[
              { label: '客户画像', sub: '画像' },
              { label: '本品主体', sub: '本品', active: true },
              { label: '竞品主体', sub: '竞品', active: true },
              { label: '客户需求', sub: '需求' },
            ].map((item, i) => (
              <button 
                key={i}
                className={`px-3 py-1.5 rounded-lg border text-[11px] font-bold transition-all flex items-center gap-1.5 ${
                  item.active 
                    ? 'bg-white dark:bg-slate-700 border-primary-400 text-primary-600 shadow-sm ring-1 ring-primary-500/20' 
                    : 'bg-slate-50 dark:bg-slate-900 border-slate-100 dark:border-slate-800 text-slate-400 hover:text-slate-600'
                }`}
              >
                <span className={item.active ? 'text-primary-600' : ''}>{item.label}</span>
                <span className="opacity-40 font-medium">{item.sub}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="h-64 mt-4">
          <ResponsiveContainer width="100%" height="100%">
            <ReLineChart data={COMBINED_TREND_DATA}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
              <XAxis 
                dataKey="name" 
                axisLine={false} 
                tickLine={false} 
                tick={{ fontSize: 10, fontWeight: 'bold', fill: '#94a3b8' }} 
                dy={10}
              />
              <YAxis 
                domain={[35, 90]} 
                axisLine={false} 
                tickLine={false} 
                tick={{ fontSize: 10, fill: '#94a3b8' }}
              />
              <Tooltip 
                contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 8px 30px rgba(0,0,0,0.1)' }}
              />
              <Line 
                type="monotone" 
                dataKey="value1" 
                stroke="#10b981" 
                strokeWidth={3} 
                dot={{ r: 4, fill: '#10b981', strokeWidth: 0 }}
                activeDot={{ r: 6, strokeWidth: 0 }}
              />
              <Line 
                type="monotone" 
                dataKey="value2" 
                stroke="#8b5cf6" 
                strokeWidth={3} 
                dot={{ r: 4, fill: '#8b5cf6', strokeWidth: 0 }}
                activeDot={{ r: 6, strokeWidth: 0 }}
              />
            </ReLineChart>
          </ResponsiveContainer>
        </div>
      </div>

    </div>
  );
};

export default CustomerValueInsightBeta2;
