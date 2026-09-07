
import React, { useState, useEffect, useRef, useMemo } from 'react';
import * as d3 from 'd3';
import { 
  sankey, 
  sankeyLinkHorizontal, 
  sankeyCenter 
} from 'd3-sankey';
import { 
  Filter, 
  Calendar, 
  Database, 
  FileText, 
  ChevronRight, 
  TrendingUp, 
  TrendingDown, 
  MessageCircle, 
  Sparkles, 
  Search,
  MoreHorizontal,
  ChevronDown,
  Info,
  Mic,
  Zap,
  Target,
  ArrowRight,
  UserCheck,
  Award,
  X
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
  Pie
} from 'recharts';

// --- Mock Data ---

const PERSONA_DATA = [
  { name: '价格敏感型', value: 38, count: 3203, color: '#f59e0b' },
  { name: '外观颜值型', value: 27, count: 2276, color: '#ef4444' },
  { name: '动力操控型', value: 19, count: 1601, color: '#10b981' },
  { name: '品牌忠诚型', value: 16, count: 1349, color: '#6366f1' },
];

const SANKEY_DATA = {
  nodes: [
    // Column 0: Persona
    { name: '价格敏感型', color: '#f59e0b', column: 0 },
    { name: '外观颜值党', color: '#ef4444', column: 0 },
    // Column 1: Subject
    { name: 'CT5', color: '#a21caf', column: 1 },
    { name: 'XT5', color: '#881337', column: 1 },
    // Column 2: Competitor
    { name: '奔驰C', color: '#0f766e', column: 2 },
    { name: '奔驰GLC', color: '#115e59', column: 2 },
    { name: '宝马3系', color: '#312e81', column: 2 },
    { name: '宝马X3', color: '#1e1b4b', column: 2 },
    // Column 3: Demand
    { name: '外观颜值', color: '#0c4a6e', column: 3 },
    { name: '发动机性能', color: '#082f49', column: 3 },
    // Column 4: Evaluation
    { name: '好', color: '#475569', column: 4 },
    { name: '坏', color: '#334155', column: 4 },
  ],
  links: [
    // Persona -> Subject
    { source: 0, target: 2, value: 40 },
    { source: 0, target: 3, value: 30 },
    { source: 1, target: 2, value: 20 },
    { source: 1, target: 3, value: 50 },
    // Subject -> Competitor
    { source: 2, target: 4, value: 25 },
    { source: 2, target: 5, value: 25 },
    { source: 2, target: 6, value: 10 },
    { source: 3, target: 6, value: 30 },
    { source: 3, target: 7, value: 50 },
    // Competitor -> Demand
    { source: 4, target: 8, value: 20 },
    { source: 5, target: 8, value: 15 },
    { source: 5, target: 9, value: 10 },
    { source: 6, target: 8, value: 20 },
    { source: 6, target: 9, value: 20 },
    { source: 7, target: 8, value: 10 },
    { source: 7, target: 9, value: 40 },
    // Demand -> Evaluation
    { source: 8, target: 10, value: 60 },
    { source: 8, target: 11, value: 25 },
    { source: 9, target: 10, value: 30 },
    { source: 9, target: 11, value: 40 },
  ]
};

const DRILLDOWN_DATA = {
  keywords: [
    { text: '空间巨大', type: 'wow', count: 124 },
    { text: '油耗偏高', type: 'pain', count: 89 },
    { text: '外观大气', type: 'wow', count: 210 },
    { text: '车机卡顿', type: 'pain', count: 67 },
    { text: '内饰豪华', type: 'wow', count: 156 },
    { text: '音响绝绝子', type: 'wow', count: 45 },
    { text: '后排局促', type: 'pain', count: 112 },
    { text: '转向精准', type: 'wow', count: 78 },
  ],
  viewpoints: {
    '空间巨大': [
      { id: 'v1', text: 'XT5轴距带来的后排纵向空间在同级处于领先地位，横向宽度也绰绰有余。' },
      { id: 'v2', text: '魔术折叠座椅让载物能力灵活多变，长途露营的神器。' }
    ],
    '后排局促': [
      { id: 'v3', text: 'CT5为了遛背造型牺牲了头部空间，180cm以上乘客会有压抑感。' }
    ]
  },
  qas: {
    'v1': [
      { q: '这个车后排坐三个人挤吗？', a: 'XT5横向宽度接近2米，且后排地板纯平，即便是坐三个成年人依然能够保证肩部的舒适。' },
      { q: '后备箱能不能塞下婴儿车？', a: '后备箱常规容积584L，且开口非常大，不需要折叠就可以轻松放入大号婴儿车。' }
    ]
  },
  transcripts: {
    '这个车后排坐三个人挤吗？': [
      { speaker: '客户', text: '因为平时要带老人孩子出游，后排要是太窄了，长途坐着太累。' },
      { speaker: '顾问', text: '理解您的顾虑。您可以看下XT5的这个地板设计，它是全平的，没有中间隆起。' },
      { speaker: '客户', text: '嗯，看着确实宽敞，坐上去试试感觉还挺厚实的。' }
    ]
  }
};

const DIMENSION_TREND_DATA: Record<string, number[]> = {
  '价格敏感型': [30, 35, 40, 38, 45, 42, 48],
  '外观颜值党': [50, 55, 52, 60, 58, 65, 70],
  'CT5': [20, 25, 22, 28, 30, 35, 33],
  'XT5': [60, 62, 58, 65, 70, 72, 75],
  '奔驰C': [40, 42, 38, 45, 48, 50, 52],
  '奔驰GLC': [35, 38, 36, 40, 42, 45, 47],
  '宝马3系': [45, 48, 42, 50, 52, 55, 58],
  '宝马X3': [55, 58, 54, 62, 65, 68, 70],
  '外观颜值': [70, 75, 72, 80, 85, 88, 92],
  '发动机性能': [30, 32, 28, 35, 40, 42, 45],
  '好': [65, 68, 70, 72, 75, 78, 80],
  '坏': [15, 12, 10, 8, 12, 10, 5],
};

const DIMENSION_CONFIG: Record<string, { label: string; color: string }> = {
  '价格敏感型': { label: '画像: 价格敏感型', color: '#f59e0b' },
  '外观颜值党': { label: '画像: 外观颜值党', color: '#ef4444' },
  'CT5': { label: '本品: CT5', color: '#a21caf' },
  'XT5': { label: '本品: XT5', color: '#881337' },
  '奔驰C': { label: '竞品: 奔驰C', color: '#059669' },
  '奔驰GLC': { label: '竞品: 奔驰GLC', color: '#10b981' },
  '宝马3系': { label: '竞品: 宝马3系', color: '#4338ca' },
  '宝马X3': { label: '竞品: 宝马X3', color: '#1e1b4b' },
  '外观颜值': { label: '需求: 外观颜值', color: '#0369a1' },
  '发动机性能': { label: '需求: 发动机性能', color: '#0f172a' },
  '好': { label: '评价: 好', color: '#475569' },
  '坏': { label: '评价: 坏', color: '#1e293b' },
};

const TREND_DATA = [
  { name: 'W1', positive: 45, neutral: 20, negative: 35 },
  { name: 'W2', positive: 50, neutral: 20, negative: 30 },
  { name: 'W3', positive: 35, neutral: 20, negative: 45 },
  { name: 'W4', positive: 60, neutral: 20, negative: 20 },
  { name: 'W5', positive: 48, neutral: 20, negative: 32 },
  { name: 'W6', positive: 55, neutral: 20, negative: 25 },
  { name: 'W7', positive: 62, neutral: 20, negative: 18 },
];

const WEEKS = ['W1', 'W2', 'W3', 'W4', 'W5', 'W6', 'W7'];

const FilterGroup: React.FC<{ 
  label: string; 
  options: { name: string; color: string }[]; 
  selected: string[]; 
  onToggle: (name: string) => void 
}> = ({ label, options, selected, onToggle }) => (
  <div className="flex items-center gap-4">
    <h5 className="text-[10px] font-black text-slate-400 uppercase tracking-widest shrink-0 w-16">{label}</h5>
    <div className="flex flex-wrap gap-2">
      {options.map((opt) => {
        const isActive = selected.includes(opt.name);
        return (
          <button
            key={opt.name}
            onClick={() => onToggle(opt.name)}
            className={`px-3 py-1.5 rounded-xl text-[10px] font-bold transition-all border flex items-center gap-2 ${
              isActive
                ? 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 shadow-sm text-slate-700 dark:text-slate-200 scale-105'
                : 'bg-slate-50/50 dark:bg-slate-900/50 border-transparent text-slate-400 opacity-60 hover:opacity-100 hover:border-slate-200'
            }`}
          >
            <div className={`w-1.5 h-1.5 rounded-full transition-transform ${isActive ? 'scale-100' : 'scale-50 opacity-50'}`} style={{ backgroundColor: opt.color }} />
            {opt.name}
          </button>
        );
      })}
    </div>
  </div>
);

const SankeyDiagram: React.FC<{ data: any; onNodeClick: (node: any) => void }> = ({ data, onNodeClick }) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 500 });

  useEffect(() => {
    if (!containerRef.current) return;
    const observer = new ResizeObserver((entries) => {
      if (entries[0]) {
        setDimensions({
          width: entries[0].contentRect.width,
          height: 500
        });
      }
    });
    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!svgRef.current || dimensions.width === 0) return;

    const svg = d3.select(svgRef.current);
    svg.selectAll('*').remove();

    const { width, height } = dimensions;
    const margin = { top: 20, right: 120, bottom: 20, left: 100 };
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    const sankeyGenerator = sankey<any, any>()
      .nodeWidth(12)
      .nodePadding(40)
      .extent([[margin.left, margin.top], [width - margin.right, height - margin.bottom]])
      .nodeAlign(sankeyCenter);

    const { nodes: filteredNodes, links: filteredLinks } = data;
    if (filteredNodes.length === 0) return;

    const { nodes, links } = sankeyGenerator({
      nodes: filteredNodes.map((d: any, i: number) => ({ ...d, index: i })),
      links: filteredLinks.map((d: any) => ({ ...d }))
    });

    // Links
    svg.append('g')
      .attr('fill', 'none')
      .selectAll('path')
      .data(links)
      .join('path')
      .attr('d', sankeyLinkHorizontal())
      .attr('stroke', (d: any) => d.source.color)
      .attr('stroke-opacity', 0.2)
      .attr('stroke-width', (d: any) => Math.max(1, d.width))
      .attr('class', 'cursor-pointer transition-all duration-300 hover:stroke-opacity-60')
      .style('mix-blend-mode', 'multiply')
      .on('click', (event, d) => onNodeClick({ 
        name: `${d.source.name} → ${d.target.name}`, 
        color: d.source.color,
        isLink: true,
        source: d.source,
        target: d.target
      }))
      .on('mouseover', function() { d3.select(this).attr('stroke-opacity', 0.6); })
      .on('mouseout', function() { d3.select(this).attr('stroke-opacity', 0.2); });

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
      .attr('class', 'transition-all duration-300 group-hover/node:opacity-80 group-hover/node:filter group-hover/node:brightness-110 shadow-sm');

    // Labels
    node.append('text')
      .attr('x', (d: any) => d.x0 < width / 2 ? d.x1 + 10 : d.x0 - 10)
      .attr('y', (d: any) => (d.y1 + d.y0) / 2)
      .attr('dy', '0.35em')
      .attr('text-anchor', (d: any) => d.x0 < width / 2 ? 'start' : 'end')
      .text((d: any) => d.name)
      .attr('class', 'text-[11px] font-bold fill-slate-600 dark:fill-slate-300 pointer-events-none');

    // Column Titles
    const columns = ['客户画像', '本品主体', '竞品主体', '客户需求', '评价/MOT'];
    const columnIndices = [0, 1, 2, 3, 4];
    
    // Find x positions for each column dynamically based on first node found in that column
    const xPositions = columnIndices.map(col => {
      const nodeInCol = nodes.find((n: any) => n.column === col);
      return nodeInCol ? (nodeInCol as any).x0 : -1000; // Hide if column not present
    });

    svg.append('g')
      .selectAll('text')
      .data(columns)
      .join('text')
      .attr('x', (d, i) => xPositions[i])
      .attr('y', 10)
      .attr('text-anchor', 'start')
      .text(d => d)
      .attr('class', 'text-[10px] font-black fill-slate-400 uppercase tracking-widest');

  }, [dimensions]);

  return (
    <div ref={containerRef} className="w-full h-[500px]">
      <svg ref={svgRef} width={dimensions.width} height={dimensions.height} />
    </div>
  );
};

// --- Components ---

const MetricCard: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
  <div className="bg-white dark:bg-slate-800 p-6 rounded-[2.5rem] border border-slate-100 dark:border-slate-700 shadow-sm overflow-hidden relative group">
    <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-6 flex items-center gap-2">
      <div className="w-1 h-3 bg-primary-500 rounded-full" />
      {title}
    </h4>
    {children}
  </div>
);

const CustomerValueInsight: React.FC = () => {
  const [mode, setMode] = useState<'data' | 'content'>('data');
  const [selectedNode, setSelectedNode] = useState<any>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Drilldown states
  const [drillStage, setDrillStage] = useState(0); // 0: Keywords, 1: Viewpoints, 2: QA, 3: Transcripts
  const [selectedKeyword, setSelectedKeyword] = useState<string | null>(null);
  const [selectedViewpoint, setSelectedViewpoint] = useState<any | null>(null);
  const [selectedQA, setSelectedQA] = useState<any | null>(null);

  const resetDrilldown = () => {
    setDrillStage(0);
    setSelectedKeyword(null);
    setSelectedViewpoint(null);
    setSelectedQA(null);
  };

  const handleNodeClick = (node: any) => {
    setSelectedNode(node);
    setIsSidebarOpen(true);
  };

   const [selectedFilters, setSelectedFilters] = useState<Record<number, string[]>>({
     0: SANKEY_DATA.nodes.filter(n => n.column === 0).map(n => n.name),
     1: SANKEY_DATA.nodes.filter(n => n.column === 1).map(n => n.name),
     2: SANKEY_DATA.nodes.filter(n => n.column === 2).map(n => n.name),
     3: SANKEY_DATA.nodes.filter(n => n.column === 3).map(n => n.name),
     4: SANKEY_DATA.nodes.filter(n => n.column === 4).map(n => n.name),
   });

   const toggleFilter = (column: number, name: string) => {
     setSelectedFilters(prev => {
       const current = prev[column] || [];
       const next = current.includes(name) 
         ? current.filter(n => n !== name)
         : [...current, name];
       return { ...prev, [column]: next };
     });
   };

   const filteredSankeyData = useMemo(() => {
     // 1. Filter nodes
     const validNodeNames = new Set(Object.values(selectedFilters).flat());
     const nodes = SANKEY_DATA.nodes.filter(n => validNodeNames.has(n.name));
     
     // Map original index to new index
     const nodeMap = new Map();
     SANKEY_DATA.nodes.forEach((n, i) => nodeMap.set(i, n.name));

     // 2. Filter links based on whether their source and target nodes are in the filtered list
     const links = SANKEY_DATA.links.filter(l => {
       const sourceName = nodeMap.get(l.source);
       const targetName = nodeMap.get(l.target);
       return validNodeNames.has(sourceName) && validNodeNames.has(targetName);
     }).map(l => {
       // Convert original index links to new index links for the generator
       const sourceName = nodeMap.get(l.source);
       const targetName = nodeMap.get(l.target);
       const newSource = nodes.findIndex(n => n.name === sourceName);
       const newTarget = nodes.findIndex(n => n.name === targetName);
       return { ...l, source: newSource, target: newTarget };
     });

     return { nodes, links };
   }, [selectedFilters]);

   const [visibleSentiments, setVisibleSentiments] = useState<string[]>(['positive', 'neutral', 'negative']);
   const [visibleTrendSentiments, setVisibleTrendSentiments] = useState<string[]>(['positive', 'neutral', 'negative']);

   const toggleTrendSentiment = (key: string) => {
     setVisibleTrendSentiments(prev => 
       prev.includes(key) ? prev.filter(k => k !== key) : [...prev, key]
     );
   };

  const sentimentData = useMemo(() => {
    const raw = [
      { name: 'Positive', key: 'positive', value: 1284, color: '#10b981', label: '正向驱动' },
      { name: 'Neutral', key: 'neutral', value: 506, color: '#94a3b8', label: '中性反馈' },
      { name: 'Negative', key: 'negative', value: 724, color: '#f43f5e', label: '负向抑制' }
    ];
    return raw.filter(d => visibleSentiments.includes(d.key));
  }, [visibleSentiments]);

  const totalValue = useMemo(() => sentimentData.reduce((acc, curr) => acc + curr.value, 0), [sentimentData]);
  const positivePercentage = useMemo(() => {
    const pos = sentimentData.find(d => d.key === 'positive');
    if (!pos || totalValue === 0) return 0;
    return Math.round((pos.value / totalValue) * 100);
  }, [sentimentData, totalValue]);

  const toggleSentiment = (key: string) => {
    setVisibleSentiments(prev => 
      prev.includes(key) ? prev.filter(k => k !== key) : [...prev, key]
    );
  };

  return (
    <div className="relative min-h-screen overflow-x-hidden">
      <div className={`space-y-6 pb-20 animate-fade-in transition-all duration-500 ${isSidebarOpen ? 'pr-[450px]' : ''}`}>

      {/* Filters Area */}
      <div className="bg-slate-50 dark:bg-slate-900/40 p-6 rounded-[2rem] border border-slate-100 dark:border-slate-800 backdrop-blur-md">
         <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            <FilterSelect label="层级" value="全国" />
            <FilterSelect label="门店" value="所有门店" />
            <FilterSelect label="岗位" value="所有岗位" />
            <FilterSelect label="周期" value="本周" />
            <FilterSelect label="主体" value="凯迪拉克 全部" />
            <FilterSelect label="对比" value="宝马3系" />
         </div>
      </div>

      {/* Module 1: Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
         <MetricCard title="客户群体分布">
            <div className="space-y-6">
               {/* Total Traffic Metric */}
               <div className="flex items-end gap-3 pb-4 border-b border-slate-50 dark:border-slate-700/50">
                  <div>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">总客流数</p>
                    <div className="flex items-baseline gap-1">
                      <span className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">8,429</span>
                      <span className="text-[10px] font-bold text-emerald-500 flex items-center gap-0.5 ml-1 px-1.5 py-0.5 bg-emerald-50 dark:bg-emerald-900/20 rounded-lg">
                        <TrendingUp size={10} /> +12.5%
                      </span>
                    </div>
                  </div>
               </div>

               <div className="space-y-4">
                  {PERSONA_DATA.map((item, i) => (
                     <div key={i} className="space-y-1">
                        <div className="flex justify-between text-xs font-bold items-baseline">
                           <span className="text-slate-600 dark:text-slate-300">{item.name}</span>
                           <div className="flex items-baseline gap-2">
                              <span className="text-slate-400 font-bold text-[10px]">{item.count.toLocaleString()}</span>
                              <span className="text-slate-900 dark:text-white font-black">{item.value}%</span>
                           </div>
                        </div>
                        <div className="h-1.5 w-full bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
                           <motion.div 
                              initial={{ width: 0 }}
                              animate={{ width: `${item.value}%` }}
                              className="h-full rounded-full"
                              style={{ backgroundColor: item.color }}
                           />
                        </div>
                     </div>
                  ))}
               </div>
            </div>
         </MetricCard>

         <MetricCard title="情感占比">
            <div className="flex flex-col h-full gap-5">
               {/* Toggles as tags at top */}
               <div className="flex flex-wrap gap-2">
                  {[
                     { key: 'positive', label: '正向驱动', color: '#10b981', bg: 'bg-emerald-50 dark:bg-emerald-900/10', border: 'border-emerald-200 dark:border-emerald-800', text: 'text-emerald-600 dark:text-emerald-400' },
                     { key: 'neutral', label: '中性反馈', color: '#94a3b8', bg: 'bg-slate-50 dark:bg-slate-800/40', border: 'border-slate-200 dark:border-slate-700', text: 'text-slate-500 dark:text-slate-400' },
                     { key: 'negative', label: '负向抑制', color: '#f43f5e', bg: 'bg-rose-50 dark:bg-rose-900/10', border: 'border-rose-200 dark:border-rose-800', text: 'text-rose-600 dark:text-rose-400' }
                  ].map((item) => (
                     <button
                        key={item.key}
                        onClick={() => toggleSentiment(item.key)}
                        className={`px-3 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-wider transition-all border flex items-center gap-2 ${
                           visibleSentiments.includes(item.key)
                              ? `${item.bg} ${item.border} ${item.text} scale-105 shadow-sm`
                              : 'bg-slate-50/50 dark:bg-slate-900/50 border-transparent text-slate-400 opacity-40 hover:opacity-80'
                        }`}
                     >
                        <div className={`w-1.5 h-1.5 rounded-full transition-transform ${visibleSentiments.includes(item.key) ? 'scale-100' : 'scale-0'}`} style={{ backgroundColor: item.color }} />
                        {item.label}
                     </button>
                  ))}
               </div>

               <div className="flex items-center justify-between">
                  <div className="relative w-32 h-32">
                     <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                           <Pie
                              data={sentimentData}
                              innerRadius={40}
                              outerRadius={60}
                              paddingAngle={visibleSentiments.length > 1 ? 5 : 0}
                              dataKey="value"
                              stroke="none"
                              animationBegin={0}
                              animationDuration={800}
                           >
                              {sentimentData.map((entry, index) => (
                                 <Cell key={`cell-${index}`} fill={entry.color} />
                              ))}
                           </Pie>
                        </PieChart>
                     </ResponsiveContainer>
                     <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                        <span className="text-2xl font-black text-slate-700 dark:text-slate-200">51%</span>
                        <span className="text-[9px] text-slate-400 font-bold uppercase tracking-widest">正向率</span>
                     </div>
                  </div>
                  <div className="flex-1 pl-6 space-y-3">
                     {[
                        { key: 'positive', label: '正向触发', value: 1284, color: '#10b981' },
                        { key: 'neutral', label: '中性反馈', value: 506, color: '#94a3b8' },
                        { key: 'negative', label: '负向抑制', value: 724, color: '#f43f5e' }
                     ].map((item) => {
                        const globalTotal = 2514;
                        const percentage = Math.round((item.value / globalTotal) * 100);
                        return (
                           <div 
                              key={item.key}
                              className={`flex items-center justify-between transition-all ${!visibleSentiments.includes(item.key) ? 'opacity-20 grayscale scale-95' : ''}`}
                           >
                              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{item.label}</span>
                              <div className="flex items-baseline gap-2">
                                 <span className="text-sm font-black tracking-tight" style={{ color: item.color }}>{item.value.toLocaleString()}</span>
                                 <span className="text-[10px] font-bold text-slate-400 shrink-0" style={{ color: visibleSentiments.includes(item.key) ? item.color : undefined, opacity: 0.8 }}>{percentage}%</span>
                              </div>
                           </div>
                        );
                     })}
                  </div>
               </div>
               <div className="pt-2 border-t border-slate-50 dark:border-slate-700/30 flex justify-between items-center mt-auto">
                  <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest leading-none">总交互量：2,514</span>
                  <div className="flex gap-1">
                     <div className="w-1 h-1 rounded-full bg-slate-200 dark:bg-slate-700" />
                     <div className="w-1 h-1 rounded-full bg-slate-300 dark:bg-slate-600" />
                     <div className="w-1 h-1 rounded-full bg-slate-400 dark:bg-slate-500" />
                  </div>
               </div>
            </div>
         </MetricCard>

         <MetricCard title="情感趋势（近7期）">
            <div className="flex flex-col h-full gap-5">
               {/* Toggles as tags at top */}
               <div className="flex flex-wrap gap-2">
                  {[
                     { key: 'positive', label: '正向驱动', color: '#10b981', bg: 'bg-emerald-50 dark:bg-emerald-900/10', border: 'border-emerald-200 dark:border-emerald-800', text: 'text-emerald-600 dark:text-emerald-400' },
                     { key: 'neutral', label: '中性反馈', color: '#94a3b8', bg: 'bg-slate-50 dark:bg-slate-800/40', border: 'border-slate-200 dark:border-slate-700', text: 'text-slate-500 dark:text-slate-400' },
                     { key: 'negative', label: '负向抑制', color: '#f43f5e', bg: 'bg-rose-50 dark:bg-rose-900/10', border: 'border-rose-200 dark:border-rose-800', text: 'text-rose-600 dark:text-rose-400' }
                  ].map((item) => (
                     <button
                        key={item.key}
                        onClick={() => toggleTrendSentiment(item.key)}
                        className={`px-3 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-wider transition-all border flex items-center gap-2 ${
                           visibleTrendSentiments.includes(item.key)
                              ? `${item.bg} ${item.border} ${item.text} scale-105 shadow-sm`
                              : 'bg-slate-50/50 dark:bg-slate-900/50 border-transparent text-slate-400 opacity-40 hover:opacity-80'
                        }`}
                     >
                        <div className={`w-1.5 h-1.5 rounded-full transition-transform ${visibleTrendSentiments.includes(item.key) ? 'scale-100' : 'scale-0'}`} style={{ backgroundColor: item.color }} />
                        {item.label}
                     </button>
                  ))}
               </div>

               <div className="h-44">
                  <ResponsiveContainer width="100%" height="100%">
                     <BarChart data={TREND_DATA}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" opacity={0.1} />
                        <XAxis 
                           dataKey="name" 
                           axisLine={false} 
                           tickLine={false} 
                           tick={{ fontSize: 10, fontWeight: 900, fill: '#94a3b8' }} 
                           dy={10}
                        />
                        <Tooltip 
                           cursor={{fill: 'transparent'}}
                           contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                        />
                        {visibleTrendSentiments.includes('positive') && (
                           <Bar 
                              dataKey="positive" 
                              stackId="a" 
                              fill="#10b981" 
                              radius={visibleTrendSentiments.length === 1 && visibleTrendSentiments[0] === 'positive' ? [4, 4, 4, 4] : [0, 0, 0, 0]} 
                           />
                        )}
                        {visibleTrendSentiments.includes('neutral') && (
                           <Bar 
                              dataKey="neutral" 
                              stackId="a" 
                              fill="#94a3b8" 
                              radius={
                                 !visibleTrendSentiments.includes('negative') && visibleTrendSentiments.includes('neutral') 
                                 ? [4, 4, 0, 0] 
                                 : [0, 0, 0, 0]
                              } 
                           />
                        )}
                        {visibleTrendSentiments.includes('negative') && (
                           <Bar 
                              dataKey="negative" 
                              stackId="a" 
                              fill="#f43f5e" 
                              radius={[4, 4, 0, 0]} 
                           />
                        )}
                     </BarChart>
                  </ResponsiveContainer>
               </div>
            </div>
         </MetricCard>
      </div>

      {/* Module 2: Correlation Analysis */}
      <div className="bg-white dark:bg-slate-800 p-8 rounded-[3rem] border border-slate-100 dark:border-slate-700 shadow-sm space-y-8">
         <div className="flex items-center justify-between">
            <div className="space-y-1">
               <h2 className="text-xl font-black text-slate-900 dark:text-white">多维关联看板</h2>
            </div>
            <div className="flex items-center gap-3">
               <button 
                  onClick={resetDrilldown}
                  className="px-4 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-700 rounded-xl text-[10px] font-black text-slate-400 hover:text-primary-600 transition-all uppercase tracking-widest"
               >
                  重置下钻视图
               </button>
               <div className="p-2 bg-slate-50 dark:bg-slate-900 rounded-xl text-slate-400 border border-slate-100 dark:border-slate-700">
                  <MoreHorizontal size={18} />
               </div>
            </div>
         </div>

         {/* Sankey Filters */}
         <div className="flex flex-col lg:flex-row gap-8 px-6 py-4 bg-slate-50/50 dark:bg-slate-900/50 rounded-[2rem] border border-slate-100 dark:border-slate-800 items-center">
            {/* Left Section: 3 Dimensions */}
            <div className="flex-[1.5] flex flex-col gap-3 w-full">
               {[
                 { col: 0, label: '客户画像' },
                 { col: 2, label: '竞品主体' },
                 { col: 4, label: '评价/MOT' },
               ].map((group) => (
                 <FilterGroup 
                   key={group.col}
                   label={group.label}
                   options={SANKEY_DATA.nodes.filter(n => n.column === group.col)}
                   selected={selectedFilters[group.col] || []}
                   onToggle={(name) => toggleFilter(group.col, name)}
                 />
               ))}
            </div>

            {/* Vertical Divider */}
            <div className="hidden lg:block self-stretch w-px bg-slate-200 dark:bg-slate-800 my-1 opacity-50" />

            {/* Right Section: 2 Dimensions */}
            <div className="flex-1 flex flex-col gap-3 w-full lg:pl-4">
               {[
                 { col: 1, label: '本品主体' },
                 { col: 3, label: '客户需求' },
               ].map((group) => (
                 <FilterGroup 
                   key={group.col}
                   label={group.label}
                   options={SANKEY_DATA.nodes.filter(n => n.column === group.col)}
                   selected={selectedFilters[group.col] || []}
                   onToggle={(name) => toggleFilter(group.col, name)}
                 />
               ))}
               {/* Spacer to align with left height if needed */}
               <div className="h-6 hidden md:block" />
            </div>
         </div>

         <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-4 min-h-[550px]">
            {/* Left: Sankey */}
            <div className="lg:col-span-7 relative">
               <SankeyDiagram data={filteredSankeyData} onNodeClick={handleNodeClick} />
            </div>

            {/* Right: Insight Drilldown */}
            <div className="lg:col-span-5 bg-slate-50/30 dark:bg-slate-900/40 rounded-[2.5rem] border border-slate-100 dark:border-slate-800/60 p-6 flex flex-col">
               <div className="mb-6 flex items-center justify-between">
                  <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                     <div className="w-1 h-3 bg-primary-500 rounded-full" />
                     关联洞察下钻
                  </h3>
                  {drillStage > 0 && (
                     <button 
                        onClick={() => setDrillStage(prev => prev - 1)}
                        className="text-[10px] font-black text-primary-600 flex items-center gap-1 hover:underline"
                     >
                        返回上级
                     </button>
                  )}
               </div>

               <div className="flex-1">
                  <AnimatePresence mode="wait">
                     {drillStage === 0 && (
                        <motion.div 
                           key="stage0"
                           initial={{ opacity: 0, y: 10 }}
                           animate={{ opacity: 1, y: 0 }}
                           exit={{ opacity: 0, y: -10 }}
                           className="space-y-6"
                        >
                           <div className="space-y-4">
                              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">客流热词词云</p>
                              <div className="flex flex-wrap gap-2.5">
                                 {DRILLDOWN_DATA.keywords.map((kw, i) => (
                                    <button 
                                       key={i}
                                       onClick={() => {
                                          setSelectedKeyword(kw.text);
                                          setDrillStage(1);
                                       }}
                                       className={`px-3.5 py-1.5 rounded-xl border text-[11px] font-black transition-all hover:scale-105 ${
                                          kw.type === 'pain' 
                                          ? 'bg-rose-50 dark:bg-rose-900/20 border-rose-100 dark:border-rose-800 text-rose-600' 
                                          : 'bg-emerald-50 dark:bg-emerald-900/20 border-emerald-100 dark:border-emerald-800 text-emerald-600'
                                       }`}
                                    >
                                       {kw.text}
                                       <span className="ml-1 opacity-40 text-[9px]">{kw.count}</span>
                                    </button>
                                 ))}
                              </div>
                           </div>
                        </motion.div>
                     )}

                     {drillStage === 1 && (
                        <motion.div 
                           key="stage1"
                           initial={{ opacity: 0, x: 20 }}
                           animate={{ opacity: 1, x: 0 }}
                           exit={{ opacity: 0, x: -20 }}
                           className="space-y-6"
                        >
                           <section className="space-y-4">
                              <div className="flex items-center gap-2">
                                 <Zap size={14} className={DRILLDOWN_DATA.keywords.find(k => k.text === selectedKeyword)?.type === 'pain' ? 'text-rose-500' : 'text-emerald-500'} />
                                 <h4 className="text-sm font-black text-slate-700 dark:text-slate-200">关键词：{selectedKeyword}</h4>
                              </div>
                              <div className="space-y-3">
                                 {(DRILLDOWN_DATA.viewpoints[selectedKeyword as keyof typeof DRILLDOWN_DATA.viewpoints] || [
                                    { id: 'default', text: `关于“${selectedKeyword}”的更深层客户心声分析...` }
                                 ]).map((point: any) => (
                                    <div 
                                       key={point.id}
                                       onClick={() => {
                                          setSelectedViewpoint(point);
                                          setDrillStage(2);
                                       }}
                                       className="p-4 bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700 cursor-pointer hover:border-primary-300 transition-all group"
                                    >
                                       <p className="text-xs font-bold text-slate-600 dark:text-slate-300 leading-relaxed group-hover:text-primary-600">
                                          {point.text}
                                       </p>
                                       <div className="mt-3 flex justify-end">
                                          <span className="text-[10px] font-black text-primary-500 uppercase tracking-widest flex items-center gap-1">
                                             查看应对 QA <ArrowRight size={10} />
                                          </span>
                                       </div>
                                    </div>
                                 ))}
                              </div>
                           </section>
                        </motion.div>
                     )}

                     {drillStage === 2 && (
                        <motion.div 
                           key="stage2"
                           initial={{ opacity: 0, x: 20 }}
                           animate={{ opacity: 1, x: 0 }}
                           exit={{ opacity: 0, x: -20 }}
                           className="space-y-6"
                        >
                           <section className="space-y-4">
                              <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest">推荐应对 QA</h4>
                              <div className="space-y-4">
                                 {(DRILLDOWN_DATA.qas[selectedViewpoint?.id as keyof typeof DRILLDOWN_DATA.qas] || [
                                    { q: '针对该观点的常见疑问？', a: '系统正在基于该观点生成最佳应对策略...' }
                                 ]).map((qa, i) => (
                                    <div 
                                       key={i} 
                                       onClick={() => {
                                          setSelectedQA(qa);
                                          setDrillStage(3);
                                       }}
                                       className="space-y-3 p-4 bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700 cursor-pointer hover:border-indigo-300 transition-all group"
                                    >
                                       <div className="flex items-start gap-2">
                                          <div className="w-5 h-5 bg-slate-100 dark:bg-slate-900 text-slate-500 rounded flex items-center justify-center text-[10px] font-black shrink-0">Q</div>
                                          <p className="text-xs font-bold text-slate-600 dark:text-slate-300 italic">“{qa.q}”</p>
                                       </div>
                                       <div className="flex items-start gap-2 pt-2 border-t border-slate-50 dark:border-slate-700/50">
                                          <div className="w-5 h-5 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 rounded flex items-center justify-center text-[10px] font-black shrink-0">A</div>
                                          <p className="text-xs font-bold text-indigo-600 dark:text-indigo-400 leading-relaxed group-hover:text-indigo-500">{qa.a}</p>
                                       </div>
                                       <div className="flex justify-end pt-1">
                                          <span className="text-[9px] font-black text-slate-400 group-hover:text-primary-500 transition-colors">点击查看真人原话录音 →</span>
                                       </div>
                                    </div>
                                 ))}
                              </div>
                           </section>
                        </motion.div>
                     )}

                     {drillStage === 3 && (
                        <motion.div 
                           key="stage3"
                           initial={{ opacity: 0, scale: 0.95 }}
                           animate={{ opacity: 1, scale: 1 }}
                           exit={{ opacity: 0, scale: 0.95 }}
                           className="space-y-6"
                        >
                           <section className="space-y-4">
                              <div className="flex items-center gap-2">
                                 <Mic size={14} className="text-rose-500" />
                                 <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest">原子对话溯源</h4>
                              </div>
                              <div className="space-y-3">
                                 {(DRILLDOWN_DATA.transcripts[selectedQA?.q as keyof typeof DRILLDOWN_DATA.transcripts] || [
                                    { speaker: '系统', text: '正在调取历史录音转写片段...' }
                                 ]).map((t, i) => (
                                    <div key={i} className={`flex gap-3 ${t.speaker === '顾问' ? 'flex-row-reverse' : ''}`}>
                                       <div className={`w-6 h-6 rounded-lg flex items-center justify-center text-[10px] font-black shrink-0 ${
                                          t.speaker === '顾问' 
                                          ? 'bg-indigo-100 text-indigo-600' 
                                          : 'bg-rose-100 text-rose-600'
                                       }`}>
                                          {t.speaker[0]}
                                       </div>
                                       <div className={`p-3 rounded-2xl max-w-[85%] text-xs font-bold leading-relaxed ${
                                          t.speaker === '顾问' 
                                          ? 'bg-indigo-600 text-white rounded-tr-none' 
                                          : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-100 dark:border-slate-700 rounded-tl-none'
                                       }`}>
                                          {t.text}
                                       </div>
                                    </div>
                                 ))}
                              </div>
                              <div className="pt-4 flex justify-center">
                                 <button className="flex items-center gap-2 px-6 py-2 bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-indigo-100 transition-all border border-indigo-100 dark:border-indigo-800">
                                    <Mic size={12} /> 播放原子对话音频
                                 </button>
                              </div>
                           </section>
                        </motion.div>
                     )}
                  </AnimatePresence>
               </div>

               <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                  <div className="flex gap-1.5">
                     {[0,1,2,3].map((s) => (
                        <div 
                           key={s} 
                           className={`h-1 rounded-full transition-all duration-300 ${s === drillStage ? 'w-6 bg-primary-500' : 'w-2 bg-slate-200 dark:bg-slate-700'}`} 
                        />
                     ))}
                  </div>
                  <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">
                     挖掘深度: {drillStage + 1}/4
                  </span>
               </div>
            </div>
         </div>
      </div>

      {/* Module 4: Trend Chart */}
      <MetricCard title="趋势模块">
         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-x-8 gap-y-12">
            {Object.entries(DIMENSION_CONFIG).map(([dim, config]) => (
               <TrendChartSmall 
                  key={dim}
                  title={config.label} 
                  color={config.color} 
                  dimension={dim} 
               />
            ))}
         </div>
      </MetricCard>

      {/* Sidebar */}
      <AnimatePresence>
        {isSidebarOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsSidebarOpen(false)}
              className="fixed inset-0 bg-slate-900/20 backdrop-blur-sm z-40"
            />
            <motion.div 
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 h-full w-[450px] bg-white dark:bg-slate-900 shadow-2xl z-50 border-l border-slate-100 dark:border-slate-800 flex flex-col"
            >
              <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between shrink-0">
                <div className="flex items-center gap-3">
                  <div 
                    className="w-3 h-8 rounded-full" 
                    style={{ backgroundColor: selectedNode?.color || '#6366f1' }} 
                  />
                  <div>
                    <h3 className="text-xl font-black text-slate-900 dark:text-white leading-tight">
                      {selectedNode?.name}
                    </h3>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">
                      {selectedNode?.isLink 
                        ? '下钻维度：关联路径深度穿透' 
                        : `下钻维度：${['客户画像', '本品主体', '竞品主体', '客户需求', '评价/MOT'][selectedNode?.column || 0]}`
                      }
                    </p>
                  </div>
                </div>
                <button 
                  onClick={() => setIsSidebarOpen(false)}
                  className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl text-slate-400 transition-colors"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-6 space-y-8 custom-scrollbar">
                <div className="p-8 bg-slate-50 dark:bg-slate-800/50 rounded-[2rem] border border-slate-100 dark:border-slate-800 text-center">
                  <p className="text-sm font-bold text-slate-400 italic">暂无详细关联分析数据</p>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
      </div>
    </div>
  );
};

// --- Subcomponents ---

const FilterSelect: React.FC<{ label: string; value: string }> = ({ label, value }) => (
  <div className="flex flex-col gap-1">
    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1">{label}</span>
    <div className="bg-white dark:bg-slate-800 px-4 py-2 rounded-xl border border-slate-100 dark:border-slate-700 flex items-center justify-between group cursor-pointer hover:border-primary-400 transition-all shadow-sm">
      <span className="text-xs font-bold text-slate-700 dark:text-slate-200">{value}</span>
      <ChevronDown size={14} className="text-slate-400 group-hover:text-primary-500 transition-colors" />
    </div>
  </div>
);

const CorrelationColumn: React.FC<{ title: string; icon: React.ReactNode; items: any[] }> = ({ title, icon, items }) => (
  <div className="space-y-4">
    <div className="flex items-center gap-2 px-2">
      <div className="p-1.5 bg-slate-100 dark:bg-slate-900 rounded-lg text-slate-500">
        {icon}
      </div>
      <h3 className="text-xs font-black text-slate-700 dark:text-white uppercase tracking-wider">{title}</h3>
    </div>
    <div className="space-y-2">
      {items.map((item, i) => (
        <motion.div 
           key={i}
           whileHover={{ x: 4 }}
           className={`p-3 rounded-2xl border transition-all cursor-pointer flex justify-between items-center group relative overflow-hidden ${
             item.active 
             ? 'bg-primary-50 dark:bg-primary-900/30 border-primary-200 dark:border-primary-800' 
             : 'bg-slate-50/50 dark:bg-slate-900/30 border-slate-100 dark:border-slate-800 hover:border-slate-200 dark:hover:border-slate-700'
           }`}
        >
           {item.active && <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary-600" />}
           <span className={`text-[11px] font-bold ${item.active ? 'text-primary-700 dark:text-primary-300' : 'text-slate-600 dark:text-slate-400'}`}>
              {item.name}
           </span>
           {item.value && (
             <span className={`text-[10px] font-black ${item.active ? 'text-primary-600' : 'text-slate-400'}`}>
                {item.value}
             </span>
           )}
           {item.status && (
             <div className={`w-1.5 h-1.5 rounded-full ${item.status === 'positive' ? 'bg-emerald-500' : item.status === 'negative' ? 'bg-rose-500' : 'bg-slate-400'}`} />
           )}
        </motion.div>
      ))}
    </div>
  </div>
);

const TrendChartSmall: React.FC<{ title: string; color: string; dimension: string }> = ({ title, color, dimension }) => (
  <div className="space-y-4">
     <h5 className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{title}</h5>
     <div className="h-24">
        <ResponsiveContainer width="100%" height="100%">
           <BarChart data={WEEKS.map((w, i) => ({ 
              name: w, 
              value: DIMENSION_TREND_DATA[dimension]?.[i] || 0 
           }))}>
              <Bar 
                dataKey="value" 
                fill={color} 
                radius={[2, 2, 0, 0]}
              >
                {WEEKS.map((_, index) => (
                   <Cell key={`cell-${index}`} fillOpacity={0.3 + (index * 0.1)} />
                ))}
              </Bar>
              <Tooltip 
                 cursor={{ fill: 'transparent' }}
                 content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                       return (
                          <div className="bg-white dark:bg-slate-800 p-2 border border-slate-100 dark:border-slate-700 rounded-lg shadow-xl">
                             <p className="text-[10px] font-black text-slate-400 mb-1">{payload[0].payload.name}</p>
                             <p className="text-xs font-black text-slate-900 dark:text-white">{payload[0].value}%</p>
                          </div>
                       );
                    }
                    return null;
                 }}
              />
           </BarChart>
        </ResponsiveContainer>
     </div>
     <div className="flex justify-between text-[10px] font-bold text-slate-400 mt-1">
        <span>{WEEKS[0]}</span>
        <span>{WEEKS[2]}</span>
        <span>{WEEKS[4]}</span>
        <span>{WEEKS[6]}</span>
     </div>
  </div>
);

export default CustomerValueInsight;
