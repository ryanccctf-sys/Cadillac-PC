
import React, { useState } from 'react';
import { 
  Search, 
  Filter, 
  Plus, 
  Video, 
  FileText, 
  ClipboardList, 
  MoreHorizontal, 
  Users, 
  Clock, 
  BarChart2, 
  CheckCircle2,
  PlayCircle,
  BookOpen
} from 'lucide-react';
import AIAssistant from '../components/AIAssistant';

// --- Types ---

interface Course {
  id: string;
  title: string;
  type: 'video' | 'document' | 'exam';
  targetWeakness: string; // The specific weakness this course addresses
  assignedCount: number;
  completionRate: number;
  avgScore?: number;
  status: 'published' | 'draft' | 'archived';
  duration: string;
  createdAt: string;
  thumbnail?: string;
}

// --- Mock Data ---

const MOCK_COURSES: Course[] = [
  {
    id: 'C-001',
    title: 'Model Y 竞品对比与攻防话术',
    type: 'video',
    targetWeakness: '竞品知识缺失',
    assignedCount: 45,
    completionRate: 88,
    avgScore: 92,
    status: 'published',
    duration: '25 min',
    createdAt: '2023-10-15',
    thumbnail: 'bg-blue-100'
  },
  {
    id: 'C-002',
    title: '高意向客户逼单技巧 (进阶版)',
    type: 'video',
    targetWeakness: '成交转化率低',
    assignedCount: 30,
    completionRate: 65,
    avgScore: 85,
    status: 'published',
    duration: '40 min',
    createdAt: '2023-10-20',
    thumbnail: 'bg-purple-100'
  },
  {
    id: 'C-003',
    title: '10月销售合规性考试',
    type: 'exam',
    targetWeakness: '流程违规',
    assignedCount: 120,
    completionRate: 45,
    avgScore: 78,
    status: 'published',
    duration: '15 min',
    createdAt: '2023-10-25',
    thumbnail: 'bg-green-100'
  },
  {
    id: 'C-004',
    title: '新能源车三电系统基础知识手册',
    type: 'document',
    targetWeakness: '产品知识薄弱',
    assignedCount: 15,
    completionRate: 100,
    status: 'archived',
    duration: '18 pages',
    createdAt: '2023-09-01',
    thumbnail: 'bg-orange-100'
  },
  {
    id: 'C-005',
    title: '客户情绪安抚与投诉预防',
    type: 'video',
    targetWeakness: '情绪管理',
    assignedCount: 20,
    completionRate: 10,
    status: 'draft',
    duration: '30 min',
    createdAt: '2023-10-26',
    thumbnail: 'bg-red-100'
  }
];

// --- Components ---

const StatCard = ({ title, value, subtext, icon: Icon, colorClass }: any) => (
  <div className="bg-white dark:bg-slate-800 p-5 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-700 flex items-center justify-between">
    <div>
      <p className="text-gray-500 dark:text-gray-400 text-sm font-medium mb-1">{title}</p>
      <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{value}</h3>
      <p className="text-xs text-gray-400 mt-1">{subtext}</p>
    </div>
    <div className={`p-3 rounded-xl ${colorClass} bg-opacity-20`}>
      <Icon size={24} className={colorClass.replace('bg-', 'text-')} />
    </div>
  </div>
);

const CourseCard: React.FC<{ course: Course }> = ({ course }) => {
  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'video': return <Video size={16} />;
      case 'document': return <FileText size={16} />;
      case 'exam': return <ClipboardList size={16} />;
      default: return <BookOpen size={16} />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'published': return 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300';
      case 'draft': return 'bg-gray-100 text-gray-700 dark:bg-slate-700 dark:text-gray-300';
      case 'archived': return 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="bg-white dark:bg-slate-800 rounded-2xl border border-gray-100 dark:border-slate-700 overflow-hidden hover:shadow-md transition-shadow group">
      {/* Thumbnail Area */}
      <div className={`h-32 ${course.thumbnail} dark:bg-opacity-10 relative p-4 flex flex-col justify-between`}>
        <div className="flex justify-between items-start">
          <span className={`px-2 py-1 rounded text-xs font-bold uppercase flex items-center gap-1 bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm shadow-sm ${
             course.type === 'video' ? 'text-blue-600' : course.type === 'exam' ? 'text-green-600' : 'text-orange-600'
          }`}>
             {getTypeIcon(course.type)}
             {course.type === 'video' ? '视频' : course.type === 'exam' ? '考试' : '资料'}
          </span>
          <button className="p-1.5 bg-white/50 dark:bg-slate-900/50 rounded-lg hover:bg-white dark:hover:bg-slate-900 text-gray-600 dark:text-gray-300 transition-colors">
            <MoreHorizontal size={16} />
          </button>
        </div>
        <div className="flex justify-between items-end">
           <span className="text-xs font-medium text-gray-600 dark:text-gray-400 bg-white/60 dark:bg-slate-900/60 px-2 py-0.5 rounded flex items-center gap-1">
             <Clock size={12} /> {course.duration}
           </span>
           {course.type === 'video' && (
             <div className="w-8 h-8 rounded-full bg-white/90 dark:bg-slate-800/90 flex items-center justify-center text-primary-600 shadow-sm opacity-0 group-hover:opacity-100 transition-opacity transform translate-y-2 group-hover:translate-y-0 duration-300 cursor-pointer">
                <PlayCircle size={20} fill="currentColor" className="text-white" />
                <PlayCircle size={20} className="absolute text-primary-600" />
             </div>
           )}
        </div>
      </div>

      {/* Content Area */}
      <div className="p-5">
        <h3 className="font-bold text-gray-900 dark:text-white mb-2 line-clamp-1" title={course.title}>{course.title}</h3>
        
        <div className="flex items-center gap-2 mb-4">
           <span className="text-xs text-gray-500 dark:text-gray-400">针对短板:</span>
           <span className="px-2 py-0.5 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-300 text-xs rounded border border-red-100 dark:border-red-900/30">
              {course.targetWeakness}
           </span>
        </div>

        {/* Progress Bar */}
        <div className="space-y-1 mb-4">
           <div className="flex justify-between text-xs">
              <span className="text-gray-500 dark:text-gray-400">完成率 ({course.completionRate}%)</span>
              <span className="text-gray-900 dark:text-white font-medium">{course.assignedCount} 人参与</span>
           </div>
           <div className="w-full bg-gray-100 dark:bg-slate-700 h-1.5 rounded-full overflow-hidden">
              <div 
                className={`h-full rounded-full ${course.completionRate >= 80 ? 'bg-green-500' : course.completionRate >= 50 ? 'bg-blue-500' : 'bg-orange-500'}`} 
                style={{ width: `${course.completionRate}%` }}
              ></div>
           </div>
        </div>

        <div className="flex items-center justify-between border-t border-gray-100 dark:border-slate-700 pt-3">
           <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${getStatusColor(course.status)}`}>
              {course.status === 'published' ? '已发布' : course.status === 'draft' ? '草稿' : '已归档'}
           </span>
           {course.type === 'exam' && course.avgScore && (
             <span className="text-xs font-bold text-gray-700 dark:text-gray-300 flex items-center gap-1">
                <BarChart2 size={12} /> 平均分: {course.avgScore}
             </span>
           )}
        </div>
      </div>
    </div>
  );
};

const TrainingCourseManagement: React.FC = () => {
  const [filterType, setFilterType] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredCourses = MOCK_COURSES.filter(c => {
    const matchType = filterType === 'all' || c.type === filterType;
    const matchSearch = c.title.toLowerCase().includes(searchQuery.toLowerCase()) || c.targetWeakness.includes(searchQuery);
    return matchType && matchSearch;
  });

  return (
    <div className="space-y-6 animate-fade-in pb-12 relative">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">培训课程管理</h2>
          <p className="text-sm text-gray-500 mt-1">针对质检发现的员工共性短板，精准发布和管理培训内容</p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-primary-600 text-white rounded-lg text-sm font-medium hover:bg-primary-700 transition-colors shadow-sm">
            <Plus size={16} /> 新建课程
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
         <StatCard 
           title="线上课程总数" 
           value="24" 
           subtext="本月新增 3 门" 
           icon={BookOpen} 
           colorClass="bg-blue-500 text-white" 
         />
         <StatCard 
           title="累计参训人次" 
           value="856" 
           subtext="覆盖率 92%" 
           icon={Users} 
           colorClass="bg-purple-500 text-white" 
         />
         <StatCard 
           title="考核通过率" 
           value="78.5%" 
           subtext="较上月提升 4.2%" 
           icon={CheckCircle2} 
           colorClass="bg-green-500 text-white" 
         />
      </div>

      {/* Filters & Search */}
      <div className="bg-white dark:bg-slate-800 p-4 rounded-xl shadow-sm border border-gray-100 dark:border-slate-700 flex flex-wrap items-center justify-between gap-4">
         <div className="flex bg-gray-100 dark:bg-slate-700 p-1 rounded-lg">
            {[
              { id: 'all', label: '全部' },
              { id: 'video', label: '视频课程' },
              { id: 'document', label: '文档资料' },
              { id: 'exam', label: '在线考试' },
            ].map(type => (
              <button
                key={type.id}
                onClick={() => setFilterType(type.id)}
                className={`px-4 py-1.5 text-sm font-medium rounded-md transition-all ${
                  filterType === type.id 
                    ? 'bg-white dark:bg-slate-600 shadow-sm text-primary-600 dark:text-primary-400' 
                    : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'
                }`}
              >
                {type.label}
              </button>
            ))}
         </div>

         <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input 
              type="text" 
              placeholder="搜索课程标题或针对短板..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 pr-4 py-2 bg-gray-50 dark:bg-slate-700 border border-gray-200 dark:border-slate-600 rounded-lg text-sm outline-none focus:ring-2 focus:ring-primary-500 dark:text-white w-64"
            />
         </div>
      </div>

      {/* Course Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6">
         {filteredCourses.map(course => (
            <CourseCard key={course.id} course={course} />
         ))}
         
         {/* Add New Placeholer Card (Optional visual cue) */}
         <button className="border-2 border-dashed border-gray-200 dark:border-slate-700 rounded-2xl p-6 flex flex-col items-center justify-center text-gray-400 hover:border-primary-500 hover:text-primary-500 transition-colors min-h-[200px]">
            <div className="w-12 h-12 rounded-full bg-gray-50 dark:bg-slate-800 flex items-center justify-center mb-3">
               <Plus size={24} />
            </div>
            <span className="font-medium text-sm">创建新课程</span>
         </button>
      </div>

      <AIAssistant context="dashboard" />
    </div>
  );
};

export default TrainingCourseManagement;
