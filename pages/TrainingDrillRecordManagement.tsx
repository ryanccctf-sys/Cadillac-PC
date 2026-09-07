import React, { useState, useRef } from 'react';
import { ShootingRequirementModal } from '../components/ShootingRequirementModal';
import { 
  GraduationCap, 
  Dumbbell, 
  Plus, 
  Search, 
  Calendar, 
  Trash2, 
  Eye, 
  Upload, 
  FileVideo, 
  FileSpreadsheet, 
  FileCheck, 
  Image as ImageIcon, 
  X, 
  CheckCircle2, 
  AlertCircle, 
  Download, 
  Filter, 
  Clock, 
  Users, 
  User, 
  Sparkles, 
  ChevronLeft,
  ChevronRight,
  Play,
  FileText,
  Check,
  Edit3,
  RefreshCw
} from 'lucide-react';

// --- Interfaces ---

export interface TrainingAttachment {
  name: string;
  size: string;
  url?: string;
  uploadTime: string;
}

export interface TrainingRecord {
  id: string;
  date: string; // 转训日期 YYYY-MM-DD
  startTime: string; // YYYY-MM-DD HH:mm
  endTime: string; // YYYY-MM-DD HH:mm
  content: string; // 转训内容
  participants: string[]; // 参与人员
  trainerName?: string; // 转训讲师/内训师
  storeName?: string; // 所在门店
  creator?: string; // 创建人
  attachments: {
    video?: TrainingAttachment | null; // 现场实训视频
    livePhoto?: TrainingAttachment | null; // 现场实训图片/参训现场照
  };
}

export interface DrillRecord {
  id: string;
  consultantName: string; // 销售顾问姓名
  consultantId?: string; // 工号
  storeName?: string; // 所属门店
  date?: string; // 演练日期 YYYY-MM-DD
  startTime: string; // 演练开始时间 YYYY-MM-DD HH:mm
  endTime: string; // 演练结束时间 YYYY-MM-DD HH:mm
  drillTopic?: string; // 演练主题
  durationMins?: number; // 演练时长(分钟)
  score?: number; // 演练评分
  creator?: string; // 创建人
}

// --- Initial Mock Data ---

const INITIAL_TRAINING_RECORDS: TrainingRecord[] = [
  {
    id: 'TR-20260822-01',
    date: '2026-08-22',
    startTime: '2026-08-22 09:00',
    endTime: '2026-08-22 11:30',
    content: '五步销售法实战演练与客户异议攻坚转训',
    participants: ['张伟', '李强', '王丽', '陈明', '赵雪', '刘洋', '孙晓刚'],
    trainerName: '王牌内训师-高建国',
    storeName: '上海徐汇旗舰店',
    creator: '高建国',
    attachments: {
      video: { name: '20260822_五步销售法转训现场实录.mp4', size: '185.4 MB', uploadTime: '2026-08-22 11:45' },
      livePhoto: { name: '徐汇店_转训现场全景照.jpg', size: '3.6 MB', uploadTime: '2026-08-22 10:20' },
    }
  },
  {
    id: 'TR-20260820-02',
    date: '2026-08-20',
    startTime: '2026-08-20 14:00',
    endTime: '2026-08-20 16:00',
    content: '全新纯电轿跑上市核心卖点对比及竞品攻防专项转训',
    participants: ['周杰', '吴昊', '郑敏', '冯凯', '何洁', '韩东'],
    trainerName: '产品专家-林晓薇',
    storeName: '北京朝阳中心店',
    creator: '林晓薇',
    attachments: {
      video: { name: '纯电新品攻防对决演练实录.mp4', size: '210.2 MB', uploadTime: '2026-08-20 16:30' },
      livePhoto: { name: '竞品拆解实物教学现场.png', size: '4.2 MB', uploadTime: '2026-08-20 15:10' },
    }
  },
  {
    id: 'TR-20260818-03',
    date: '2026-08-18',
    startTime: '2026-08-18 09:30',
    endTime: '2026-08-18 11:30',
    content: '试乘试驾动态体验SOP与安全防范标准流程转训',
    participants: ['马龙', '朱婷', '丁宁', '许昕', '樊振', '王楚'],
    trainerName: '安全驾驶高级教官-赵亮',
    storeName: '广州天河体验中心',
    creator: '赵亮',
    attachments: {
      video: { name: '试驾SOP路线标准示范视频.mp4', size: '320.0 MB', uploadTime: '2026-08-18 12:00' },
      livePhoto: { name: '试驾场地教学与路线勘测.jpg', size: '5.8 MB', uploadTime: '2026-08-18 10:45' },
    }
  },
  {
    id: 'TR-20260815-04',
    date: '2026-08-15',
    startTime: '2026-08-15 15:00',
    endTime: '2026-08-15 17:30',
    content: 'VOC客户抱怨根因解析与情绪抚平话术标准化转训',
    participants: ['张伟', '陈明', '郭艾伦', '易建联', '王哲林'],
    trainerName: '客诉管理总监-沈梦',
    storeName: '深圳南山旗舰店',
    creator: '沈梦',
    attachments: {
      video: { name: '南山店VOC情景模拟对练录像.mp4', size: '145.6 MB', uploadTime: '2026-08-15 18:00' },
      livePhoto: { name: '角色扮演情景互动抓拍.jpg', size: '2.9 MB', uploadTime: '2026-08-15 16:15' },
    }
  },
  {
    id: 'TR-20260810-05',
    date: '2026-08-10',
    startTime: '2026-08-10 10:00',
    endTime: '2026-08-10 12:00',
    content: '智能座舱全场景语音指令及智驾泊车功能深度赋能',
    participants: ['李强', '赵雪', '刘洋', '孙晓刚', '郑敏'],
    trainerName: '智能网联培训师-宋博',
    storeName: '杭州西湖展示店',
    creator: '宋博',
    attachments: {
      video: { name: '智能座舱实车演示转训录屏.mp4', size: '278.4 MB', uploadTime: '2026-08-10 12:30' },
      livePhoto: { name: '学员车内实际操作演示照.jpg', size: '3.4 MB', uploadTime: '2026-08-10 11:20' },
    }
  }
];

const INITIAL_DRILL_RECORDS: DrillRecord[] = [
  {
    id: 'DR-20260822-01',
    consultantName: '张伟',
    consultantId: 'GW-8801',
    storeName: '上海徐汇旗舰店',
    date: '2026-08-22',
    startTime: '2026-08-22 14:00',
    endTime: '2026-08-22 14:45',
    drillTopic: '售后服务保障与首保权益深度包装演练',
    durationMins: 45,
    score: 94,
    creator: '王主管'
  },
  {
    id: 'DR-20260822-02',
    consultantName: '李强',
    consultantId: 'GW-8802',
    storeName: '上海徐汇旗舰店',
    date: '2026-08-22',
    startTime: '2026-08-22 15:00',
    endTime: '2026-08-22 15:40',
    drillTopic: '置换补贴政策与老车主权益增购对练',
    durationMins: 40,
    score: 88,
    creator: '王主管'
  },
  {
    id: 'DR-20260821-03',
    consultantName: '王丽',
    consultantId: 'GW-8803',
    storeName: '北京朝阳中心店',
    date: '2026-08-21',
    startTime: '2026-08-21 10:00',
    endTime: '2026-08-21 10:50',
    drillTopic: '高意向家庭客户三排空间与安全性试乘话术',
    durationMins: 50,
    score: 96,
    creator: '李经理'
  },
  {
    id: 'DR-20260821-04',
    consultantName: '陈明',
    consultantId: 'GW-8804',
    storeName: '北京朝阳中心店',
    date: '2026-08-21',
    startTime: '2026-08-21 11:00',
    endTime: '2026-08-21 11:35',
    drillTopic: '价格敏感型客户分期金融方案促成演练',
    durationMins: 35,
    score: 85,
    creator: '李经理'
  },
  {
    id: 'DR-20260820-05',
    consultantName: '赵雪',
    consultantId: 'GW-8805',
    storeName: '广州天河体验中心',
    date: '2026-08-20',
    startTime: '2026-08-20 16:00',
    endTime: '2026-08-20 16:45',
    drillTopic: '竞品底盘调教对比与动感试驾实操演练',
    durationMins: 45,
    score: 92,
    creator: '张店长'
  },
  {
    id: 'DR-20260819-06',
    consultantName: '刘洋',
    consultantId: 'GW-8806',
    storeName: '广州天河体验中心',
    date: '2026-08-19',
    startTime: '2026-08-19 09:30',
    endTime: '2026-08-19 10:15',
    drillTopic: '新客户首问5分钟破冰与需求探寻对练',
    durationMins: 45,
    score: 90,
    creator: '张店长'
  },
  {
    id: 'DR-20260818-07',
    consultantName: '孙晓刚',
    consultantId: 'GW-8807',
    storeName: '深圳南山旗舰店',
    date: '2026-08-18',
    startTime: '2026-08-18 14:30',
    endTime: '2026-08-18 15:20',
    drillTopic: '大客户批量采购政策与维保打包方案演练',
    durationMins: 50,
    score: 91,
    creator: '陈组长'
  },
  {
    id: 'DR-20260817-08',
    consultantName: '郑敏',
    consultantId: 'GW-8808',
    storeName: '杭州西湖展示店',
    date: '2026-08-17',
    startTime: '2026-08-17 15:30',
    endTime: '2026-08-17 16:15',
    drillTopic: '女性车主审美偏好与智能泊车演示对练',
    durationMins: 45,
    score: 95,
    creator: '赵主管'
  }
];

const PRESET_TRAINING_TOPICS = [
  '五步销售法实战演练与客户异议攻坚转训',
  '全新纯电轿跑上市核心卖点对比及竞品攻防专项转训',
  '试乘试驾动态体验SOP与安全防范标准流程转训',
  'VOC客户抱怨根因解析与情绪抚平话术标准化转训',
  '智能座舱全场景语音指令及智驾泊车功能深度赋能',
  '展厅全流程智能工牌佩戴与合规质检标准宣导',
  '大客户及企业团购定制金融方案营销实操转训'
];

const PRESET_CONSULTANTS = [
  { name: '张伟', id: 'GW-8801', store: '上海徐汇旗舰店' },
  { name: '李强', id: 'GW-8802', store: '上海徐汇旗舰店' },
  { name: '王丽', id: 'GW-8803', store: '北京朝阳中心店' },
  { name: '陈明', id: 'GW-8804', store: '北京朝阳中心店' },
  { name: '赵雪', id: 'GW-8805', store: '广州天河体验中心' },
  { name: '刘洋', id: 'GW-8806', store: '广州天河体验中心' },
  { name: '孙晓刚', id: 'GW-8807', store: '深圳南山旗舰店' },
  { name: '郑敏', id: 'GW-8808', store: '杭州西湖展示店' },
  { name: '周杰', id: 'GW-8809', store: '北京朝阳中心店' },
  { name: '马龙', id: 'GW-8810', store: '广州天河体验中心' },
];

export const TrainingDrillRecordManagement: React.FC = () => {
  // Main Tab: 'training' (转训练) or 'drill' (销售演练)
  const [activeTab, setActiveTab] = useState<'training' | 'drill'>('training');

  // Datasets
  const [trainingRecords, setTrainingRecords] = useState<TrainingRecord[]>(INITIAL_TRAINING_RECORDS);
  const [drillRecords, setDrillRecords] = useState<DrillRecord[]>(INITIAL_DRILL_RECORDS);

  // Search & Filter
  const [searchKeyword, setSearchKeyword] = useState<string>('');
  const [filterStartDate, setFilterStartDate] = useState<string>('');
  const [filterEndDate, setFilterEndDate] = useState<string>('');

  // Pagination States
  const [trainingPage, setTrainingPage] = useState<number>(1);
  const [trainingPageSize, setTrainingPageSize] = useState<number>(10);
  const [trainingJumpPage, setTrainingJumpPage] = useState<string>('');

  const [drillPage, setDrillPage] = useState<number>(1);
  const [drillPageSize, setDrillPageSize] = useState<number>(10);
  const [drillJumpPage, setDrillJumpPage] = useState<string>('');

  // Creation Modal State
  const [isCreateModalOpen, setIsCreateModalOpen] = useState<boolean>(false);
  const [createType, setCreateType] = useState<'training' | 'drill'>('training');

  // Form Fields - Training
  const [formTrainingContent, setFormTrainingContent] = useState<string>(PRESET_TRAINING_TOPICS[0]);
  const [formTrainingStartTime, setFormTrainingStartTime] = useState<string>('2026-08-23 09:30');
  const [formTrainingEndTime, setFormTrainingEndTime] = useState<string>('2026-08-23 11:30');
  const [formParticipants, setFormParticipants] = useState<string>('张伟 李强 王丽 陈明 赵雪');

  // Uploaded Files (1 file per type max: video & livePhoto)
  const [uploadedVideo, setUploadedVideo] = useState<TrainingAttachment | null>(null);
  const [uploadedLivePhoto, setUploadedLivePhoto] = useState<TrainingAttachment | null>(null);

  // Form Fields - Drill
  const [formConsultantName, setFormConsultantName] = useState<string>('张伟');
  const [formDrillStartTime, setFormDrillStartTime] = useState<string>('2026-08-23 14:00');
  const [formDrillEndTime, setFormDrillEndTime] = useState<string>('2026-08-23 14:45');

  // Attachment Viewer Modal State
  const [viewingAttachmentsRecord, setViewingAttachmentsRecord] = useState<TrainingRecord | null>(null);

  // Shooting Requirements Modal State & File Input Refs (Video / Live Photo guidelines)
  const createVideoInputRef = useRef<HTMLInputElement>(null);
  const createPhotoInputRef = useRef<HTMLInputElement>(null);
  const editVideoInputRef = useRef<HTMLInputElement>(null);
  const editPhotoInputRef = useRef<HTMLInputElement>(null);

  const [shootingRequirementModal, setShootingRequirementModal] = useState<{
    isOpen: boolean;
    type: 'video' | 'photo';
    context: 'create' | 'edit';
  }>({
    isOpen: false,
    type: 'video',
    context: 'create'
  });

  const openRequirementModal = (type: 'video' | 'photo', context: 'create' | 'edit' = 'create') => {
    setShootingRequirementModal({
      isOpen: true,
      type,
      context
    });
  };

  const handleConfirmShootingUpload = (type: 'video' | 'photo') => {
    if (shootingRequirementModal.context === 'create') {
      if (type === 'video') {
        createVideoInputRef.current?.click();
      } else {
        createPhotoInputRef.current?.click();
      }
    } else {
      if (type === 'video') {
        editVideoInputRef.current?.click();
      } else {
        editPhotoInputRef.current?.click();
      }
    }
  };

  // Edit Training Record State (for deleting / replacing attachments ONLY)
  const [editingTrainingRecord, setEditingTrainingRecord] = useState<TrainingRecord | null>(null);
  const [editAttachments, setEditAttachments] = useState<{
    video: TrainingAttachment | null;
    livePhoto: TrainingAttachment | null;
  }>({
    video: null,
    livePhoto: null
  });

  // Delete Confirmation State
  const [deleteConfirmItem, setDeleteConfirmItem] = useState<{
    type: 'training' | 'drill';
    id: string;
    title: string;
  } | null>(null);

  // Success Toast State
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  // Open Edit Training Modal (Attachment Management only)
  const openEditTrainingModal = (record: TrainingRecord) => {
    setEditingTrainingRecord(record);
    setEditAttachments({
      video: record.attachments.video ? { ...record.attachments.video } : null,
      livePhoto: record.attachments.livePhoto ? { ...record.attachments.livePhoto } : null,
    });
  };

  // Handle replacing / uploading an attachment in edit mode
  const handleEditAttachmentUpload = (
    category: 'video' | 'photo',
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const sizeStr = file.size > 1024 * 1024 
      ? `${(file.size / (1024 * 1024)).toFixed(1)} MB`
      : `${(file.size / 1024).toFixed(1)} KB`;

    const now = new Date().toISOString().replace('T', ' ').slice(0, 16);
    const attachment: TrainingAttachment = {
      name: file.name,
      size: sizeStr,
      uploadTime: now
    };

    const keyMap = {
      video: 'video',
      photo: 'livePhoto'
    } as const;

    setEditAttachments(prev => ({
      ...prev,
      [keyMap[category]]: attachment
    }));

    showToast(`已成功替换/上传附件【${file.name}】`);
    e.target.value = '';
  };

  // Handle removing / deleting an attachment in edit mode
  const handleDeleteEditAttachment = (category: 'video' | 'livePhoto') => {
    setEditAttachments(prev => ({
      ...prev,
      [category]: null
    }));
    showToast('已移除该附件');
  };

  // Save Training Edit (Save updated attachments)
  const handleSaveTrainingEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingTrainingRecord) return;

    const updatedRecord: TrainingRecord = {
      ...editingTrainingRecord,
      attachments: {
        video: editAttachments.video,
        livePhoto: editAttachments.livePhoto
      }
    };

    setTrainingRecords(prev => prev.map(item => item.id === editingTrainingRecord.id ? updatedRecord : item));
    setEditingTrainingRecord(null);
    showToast('转训附件修改已成功保存！');
  };

  // Handle Mock File Upload
  const handleSimulatedFileUpload = (
    category: 'video' | 'photo',
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const sizeStr = file.size > 1024 * 1024 
      ? `${(file.size / (1024 * 1024)).toFixed(1)} MB`
      : `${(file.size / 1024).toFixed(1)} KB`;

    const now = new Date().toISOString().replace('T', ' ').slice(0, 16);
    const attachment: TrainingAttachment = {
      name: file.name,
      size: sizeStr,
      uploadTime: now
    };

    if (category === 'video') setUploadedVideo(attachment);
    else if (category === 'photo') setUploadedLivePhoto(attachment);

    showToast(`已成功上传【${file.name}】`);
  };

  // Submit Creation Form
  const handleCreateSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (createType === 'training') {
      const finalContent = formTrainingContent || PRESET_TRAINING_TOPICS[0];

      if (!finalContent) {
        alert('请选择转训内容！');
        return;
      }
      if (!formTrainingStartTime || !formTrainingEndTime) {
        alert('请填写转训开始与结束时间！');
        return;
      }
      if (!formParticipants.trim()) {
        alert('请填写参与人员！');
        return;
      }

      // 只能用空格隔开，不允许用逗号、顿号等其他字符隔开
      const forbiddenSeparators = /[,，、;；|/\\\\]/;
      if (forbiddenSeparators.test(formParticipants)) {
        alert('参与人员只能用空格隔开，不允许使用逗号、顿号等其他字符隔开！');
        return;
      }

      const participantList = formParticipants
        .trim()
        .split(/\s+/)
        .map(p => p.trim())
        .filter(Boolean);

      if (!uploadedVideo) {
        alert('请上传现场转训视频附件！该项为必传项。');
        return;
      }

      if (!uploadedLivePhoto) {
        alert('请上传参训现场照附件！该项为必传项。');
        return;
      }

      const newTraining: TrainingRecord = {
        id: `TR-${Date.now().toString().slice(-8)}`,
        date: formTrainingStartTime.split(' ')[0] || '2026-08-23',
        startTime: formTrainingStartTime,
        endTime: formTrainingEndTime,
        content: finalContent,
        participants: participantList.length > 0 ? participantList : ['全员销售顾问'],
        storeName: '上海徐汇旗舰店',
        creator: '高建国',
        attachments: {
          video: uploadedVideo,
          livePhoto: uploadedLivePhoto
        }
      };

      setTrainingRecords([newTraining, ...trainingRecords]);
      showToast('转训记录创建成功！');
    } else {
      if (!formConsultantName.trim()) {
        alert('请填写销售顾问姓名！');
        return;
      }
      if (!formDrillStartTime || !formDrillEndTime) {
        alert('请填写演练开始与结束时间！');
        return;
      }

      const selectedC = PRESET_CONSULTANTS.find(c => c.name === formConsultantName);

      const newDrill: DrillRecord = {
        id: `DR-${Date.now().toString().slice(-8)}`,
        consultantName: formConsultantName,
        consultantId: selectedC?.id || `GW-${Math.floor(1000 + Math.random() * 9000)}`,
        storeName: selectedC?.store || '上海徐汇旗舰店',
        date: formDrillStartTime.split(' ')[0] || '2026-08-23',
        startTime: formDrillStartTime,
        endTime: formDrillEndTime,
        durationMins: 45,
        creator: '王主管'
      };

      setDrillRecords([newDrill, ...drillRecords]);
      showToast('销售演练记录创建成功！');
    }

    // Reset and Close
    setIsCreateModalOpen(false);
    resetForm();
  };

  const resetForm = () => {
    setFormTrainingContent(PRESET_TRAINING_TOPICS[0]);
    setUploadedVideo(null);
    setUploadedLivePhoto(null);
  };

  // Perform Deletion
  const handleConfirmDelete = () => {
    if (!deleteConfirmItem) return;

    if (deleteConfirmItem.type === 'training') {
      setTrainingRecords(prev => prev.filter(item => item.id !== deleteConfirmItem.id));
      showToast('转训记录已成功删除');
    } else {
      setDrillRecords(prev => prev.filter(item => item.id !== deleteConfirmItem.id));
      showToast('销售演练记录已成功删除');
    }
    setDeleteConfirmItem(null);
  };

  // Filtered Training List
  const filteredTrainingRecords = trainingRecords.filter(item => {
    if (searchKeyword.trim()) {
      const kw = searchKeyword.trim().toLowerCase();
      const matchContent = item.content.toLowerCase().includes(kw);
      const matchParticipant = item.participants.some(p => p.toLowerCase().includes(kw));
      const matchDate = item.date.includes(kw);
      const matchCreator = item.creator?.toLowerCase().includes(kw);
      if (!matchContent && !matchParticipant && !matchDate && !matchCreator) return false;
    }
    if (filterStartDate && item.date < filterStartDate) return false;
    if (filterEndDate && item.date > filterEndDate) return false;
    return true;
  });

  // Filtered Drill List
  const filteredDrillRecords = drillRecords.filter(item => {
    const drillDate = item.date || item.startTime.split(' ')[0];
    if (searchKeyword.trim()) {
      const kw = searchKeyword.trim().toLowerCase();
      const matchName = item.consultantName.toLowerCase().includes(kw);
      const matchId = item.consultantId?.toLowerCase().includes(kw);
      const matchStart = item.startTime.includes(kw);
      const matchDate = drillDate.includes(kw);
      const matchCreator = item.creator?.toLowerCase().includes(kw);
      if (!matchName && !matchId && !matchStart && !matchDate && !matchCreator) return false;
    }
    if (filterStartDate && drillDate < filterStartDate) return false;
    if (filterEndDate && drillDate > filterEndDate) return false;
    return true;
  });

  // Pagination Calculations
  const totalTrainingPages = Math.max(1, Math.ceil(filteredTrainingRecords.length / trainingPageSize));
  const currentTrainingPage = Math.min(trainingPage, totalTrainingPages);
  const paginatedTrainingRecords = filteredTrainingRecords.slice(
    (currentTrainingPage - 1) * trainingPageSize,
    currentTrainingPage * trainingPageSize
  );

  const totalDrillPages = Math.max(1, Math.ceil(filteredDrillRecords.length / drillPageSize));
  const currentDrillPage = Math.min(drillPage, totalDrillPages);
  const paginatedDrillRecords = filteredDrillRecords.slice(
    (currentDrillPage - 1) * drillPageSize,
    currentDrillPage * drillPageSize
  );

  // Count metrics
  const totalTrainingParticipants = trainingRecords.reduce((acc, curr) => acc + curr.participants.length, 0);

  return (
    <div className="max-w-7xl mx-auto space-y-6 pb-16 animate-fade-in text-slate-800 dark:text-slate-100">
      
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-20 right-8 z-50 flex items-center gap-2 px-4 py-3 bg-emerald-600 text-white text-sm font-medium rounded-xl shadow-xl animate-bounce">
          <CheckCircle2 size={18} />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top Header */}
      <div className="flex items-center gap-3 bg-white dark:bg-slate-800 p-5 rounded-3xl border border-slate-200/80 dark:border-slate-700 shadow-sm">
        <div className="p-2.5 rounded-2xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 border border-blue-100 dark:border-blue-900/50">
          <GraduationCap size={24} />
        </div>
        <h1 className="text-2xl font-black tracking-tight text-slate-900 dark:text-white">
          转训/演练记录管理
        </h1>
      </div>

      {/* Main Container */}
      <div className="bg-white dark:bg-slate-800 rounded-3xl border border-slate-200/80 dark:border-slate-700 shadow-sm overflow-hidden">
        
        {/* Tab Header & Action Filter Toolbar */}
        <div className="p-4 sm:p-5 border-b border-slate-200/80 dark:border-slate-700 space-y-4">
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            {/* Primary Tab Switcher */}
            <div className="flex items-center p-1 bg-slate-100 dark:bg-slate-900 rounded-2xl w-fit">
              <button
                onClick={() => {
                  setActiveTab('training');
                  setSearchKeyword('');
                }}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  activeTab === 'training'
                    ? 'bg-white dark:bg-slate-800 text-blue-600 dark:text-blue-400 shadow-sm'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
                }`}
              >
                <GraduationCap size={16} />
                <span>转训练</span>
                <span className={`px-1.5 py-0.5 rounded-full text-[10px] ${
                  activeTab === 'training' 
                    ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/60 dark:text-blue-300' 
                    : 'bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                }`}>
                  {trainingRecords.length}
                </span>
              </button>

              <button
                onClick={() => {
                  setActiveTab('drill');
                  setSearchKeyword('');
                }}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  activeTab === 'drill'
                    ? 'bg-white dark:bg-slate-800 text-blue-600 dark:text-blue-400 shadow-sm'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
                }`}
              >
                <Dumbbell size={16} />
                <span>销售演练</span>
                <span className={`px-1.5 py-0.5 rounded-full text-[10px] ${
                  activeTab === 'drill' 
                    ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/60 dark:text-blue-300' 
                    : 'bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                }`}>
                  {drillRecords.length}
                </span>
              </button>
            </div>

            {/* Quick Actions */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  alert(`已成功导出【${activeTab === 'training' ? '转训练记录明细表' : '销售演练记录表'}】(CSV)`);
                }}
                className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-slate-700 dark:text-slate-200 bg-slate-100 hover:bg-slate-200 dark:bg-slate-700/80 dark:hover:bg-slate-700 rounded-xl transition-colors cursor-pointer border border-slate-200/80 dark:border-slate-600"
              >
                <Download size={14} />
                <span>导出表格</span>
              </button>

              <button
                onClick={() => {
                  setCreateType(activeTab);
                  setIsCreateModalOpen(true);
                }}
                className="flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-xl transition-colors cursor-pointer shadow-sm"
              >
                <Plus size={14} />
                <span>新建</span>
              </button>
            </div>
          </div>

          {/* Search & Date Filter Bar */}
          <div className="flex flex-wrap items-center gap-3">
            {/* Search Input */}
            <div className="relative flex-1 min-w-[240px] max-w-md">
              <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder={activeTab === 'training' ? "搜索转训内容..." : "搜索销售顾问姓名..."}
                value={searchKeyword}
                onChange={(e) => setSearchKeyword(e.target.value)}
                className="w-full pl-9 pr-8 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200/80 dark:border-slate-700 rounded-xl text-xs text-slate-800 dark:text-slate-200 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
              />
              {searchKeyword && (
                <button
                  onClick={() => setSearchKeyword('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                >
                  <X size={13} />
                </button>
              )}
            </div>

            {/* Date Filter */}
            <div className="flex items-center gap-2 bg-slate-50 dark:bg-slate-900 px-3 py-1.5 rounded-xl border border-slate-200/80 dark:border-slate-700 text-xs">
              <Calendar size={14} className="text-slate-400 shrink-0" />
              <span className="text-slate-500 dark:text-slate-400 shrink-0">日期:</span>
              <input
                type="date"
                value={filterStartDate}
                onChange={(e) => setFilterStartDate(e.target.value)}
                className="bg-transparent text-slate-700 dark:text-slate-200 outline-none text-xs"
              />
              <span className="text-slate-400">至</span>
              <input
                type="date"
                value={filterEndDate}
                onChange={(e) => setFilterEndDate(e.target.value)}
                className="bg-transparent text-slate-700 dark:text-slate-200 outline-none text-xs"
              />
              {(filterStartDate || filterEndDate) && (
                <button
                  onClick={() => {
                    setFilterStartDate('');
                    setFilterEndDate('');
                  }}
                  className="text-[11px] text-blue-600 dark:text-blue-400 hover:underline cursor-pointer ml-1"
                >
                  重置
                </button>
              )}
            </div>
          </div>
        </div>

        {/* TAB 1: 转训练列表 */}
        {activeTab === 'training' && (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-slate-700 dark:bg-slate-900 text-white font-medium">
                  <th className="py-3.5 px-3 font-semibold text-center border-r border-slate-600/50 w-12 whitespace-nowrap">序号</th>
                  <th className="py-3.5 px-3 font-semibold border-r border-slate-600/50 whitespace-nowrap">转训日期</th>
                  <th className="py-3.5 px-3 font-semibold border-r border-slate-600/50 whitespace-nowrap">转训开始时间</th>
                  <th className="py-3.5 px-3 font-semibold border-r border-slate-600/50 whitespace-nowrap">转训结束时间</th>
                  <th className="py-3.5 px-4 font-semibold border-r border-slate-600/50 min-w-[260px]">转训内容</th>
                  <th className="py-3.5 px-4 font-semibold border-r border-slate-600/50 min-w-[200px]">参与人员</th>
                  <th className="py-3.5 px-4 font-semibold border-r border-slate-600/50 whitespace-nowrap">创建人</th>
                  <th className="py-3.5 px-4 font-semibold text-center whitespace-nowrap w-36">操作</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-700/60 text-slate-700 dark:text-slate-200">
                {paginatedTrainingRecords.length > 0 ? (
                  paginatedTrainingRecords.map((row, idx) => {
                    const hasAllAttachments = row.attachments.video && row.attachments.livePhoto;
                    const attachmentCount = [row.attachments.video, row.attachments.livePhoto].filter(Boolean).length;
                    const displayIndex = (currentTrainingPage - 1) * trainingPageSize + idx + 1;

                    return (
                      <tr 
                        key={row.id} 
                        className="hover:bg-slate-50/80 dark:hover:bg-slate-700/40 transition-colors"
                      >
                        {/* 序号 */}
                        <td className="py-3.5 px-3 text-center font-mono text-slate-400 whitespace-nowrap">
                          {displayIndex}
                        </td>

                        {/* 转训日期 */}
                        <td className="py-3.5 px-3 font-mono font-bold text-slate-800 dark:text-slate-100 whitespace-nowrap">
                          <div className="flex items-center gap-1.5">
                            <Calendar size={13} className="text-blue-500 shrink-0" />
                            <span>{row.date}</span>
                          </div>
                        </td>

                        {/* 转训开始时间 */}
                        <td className="py-3.5 px-3 font-mono text-slate-600 dark:text-slate-300 whitespace-nowrap">
                          {row.startTime}
                        </td>

                        {/* 转训结束时间 */}
                        <td className="py-3.5 px-3 font-mono text-slate-600 dark:text-slate-300 whitespace-nowrap">
                          {row.endTime}
                        </td>

                        {/* 转训内容 */}
                        <td className="py-3.5 px-4">
                          <div className="font-semibold text-slate-900 dark:text-white leading-relaxed">
                            {row.content}
                          </div>
                        </td>

                        {/* 参与人员 */}
                        <td className="py-3.5 px-4">
                          <div className="flex flex-wrap items-center gap-1.5">
                            {row.participants.map((person, pIdx) => (
                              <span 
                                key={pIdx}
                                className="px-2 py-0.5 text-[11px] font-medium bg-slate-100 dark:bg-slate-700/60 text-slate-700 dark:text-slate-300 rounded-md border border-slate-200/60 dark:border-slate-600/60"
                              >
                                {person}
                              </span>
                            ))}
                            <span className="text-[11px] text-slate-400 font-mono">
                              共 {row.participants.length} 人
                            </span>
                          </div>
                        </td>

                        {/* 创建人 */}
                        <td className="py-3.5 px-4 font-medium text-slate-700 dark:text-slate-300 whitespace-nowrap">
                          <div className="flex items-center gap-1.5">
                            <span className="inline-block w-2 h-2 rounded-full bg-blue-500"></span>
                            <span>{row.creator || row.trainerName || '管理员'}</span>
                          </div>
                        </td>

                        {/* 操作：查看附件、删除 */}
                        <td className="py-3.5 px-4 text-center whitespace-nowrap">
                          <div className="flex items-center justify-center gap-1.5">
                            <button
                              onClick={() => {
                                setViewingAttachmentsRecord(row);
                              }}
                              className="flex items-center gap-1 px-2.5 py-1 text-xs font-semibold text-blue-600 dark:text-blue-400 bg-blue-50 hover:bg-blue-100 dark:bg-blue-950/40 dark:hover:bg-blue-900/60 border border-blue-200 dark:border-blue-800/60 rounded-lg transition-colors cursor-pointer"
                              title="查看该场转训的视频及现场图片附件"
                            >
                              <Eye size={13} />
                              <span>查看附件</span>
                              <span className="ml-0.5 px-1 py-0.2 text-[10px] bg-blue-200 dark:bg-blue-800 text-blue-800 dark:text-blue-200 rounded-full font-mono font-bold">
                                {attachmentCount}
                              </span>
                            </button>

                            <button
                              onClick={() => setDeleteConfirmItem({
                                type: 'training',
                                id: row.id,
                                title: `【${row.date}】${row.content}`
                              })}
                              className="flex items-center gap-1 px-2.5 py-1 text-xs font-semibold text-rose-600 dark:text-rose-400 bg-rose-50 hover:bg-rose-100 dark:bg-rose-950/40 dark:hover:bg-rose-900/60 border border-rose-200 dark:border-rose-800/60 rounded-lg transition-colors cursor-pointer"
                              title="删除此转训记录"
                            >
                              <Trash2 size={13} />
                              <span>删除</span>
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan={8} className="py-16 text-center text-slate-400">
                      <div className="flex flex-col items-center justify-center gap-2">
                        <GraduationCap size={32} className="text-slate-300 dark:text-slate-600" />
                        <p className="text-sm font-medium">未找到符合条件的转训记录</p>
                        <button
                          onClick={() => {
                            setCreateType('training');
                            setIsCreateModalOpen(true);
                          }}
                          className="mt-2 text-xs text-blue-600 dark:text-blue-400 font-bold hover:underline"
                        >
                          立即创建第一条转训记录
                        </button>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}

        {/* TAB 2: 销售演练列表 */}
        {activeTab === 'drill' && (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-slate-700 dark:bg-slate-900 text-white font-medium">
                  <th className="py-3.5 px-3 font-semibold text-center border-r border-slate-600/50 w-12 whitespace-nowrap">序号</th>
                  <th className="py-3.5 px-4 font-semibold border-r border-slate-600/50 whitespace-nowrap">销售顾问姓名</th>
                  <th className="py-3.5 px-4 font-semibold border-r border-slate-600/50 whitespace-nowrap">演练日期</th>
                  <th className="py-3.5 px-4 font-semibold border-r border-slate-600/50 whitespace-nowrap">演练开始时间</th>
                  <th className="py-3.5 px-4 font-semibold border-r border-slate-600/50 whitespace-nowrap">演练结束时间</th>
                  <th className="py-3.5 px-4 font-semibold border-r border-slate-600/50 whitespace-nowrap">创建人</th>
                  <th className="py-3.5 px-4 font-semibold text-center whitespace-nowrap w-36">操作</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-700/60 text-slate-700 dark:text-slate-200">
                {paginatedDrillRecords.length > 0 ? (
                  paginatedDrillRecords.map((row, idx) => {
                    const displayIndex = (currentDrillPage - 1) * drillPageSize + idx + 1;
                    return (
                      <tr 
                        key={row.id} 
                        className="hover:bg-slate-50/80 dark:hover:bg-slate-700/40 transition-colors"
                      >
                        {/* 序号 */}
                        <td className="py-3.5 px-3 text-center font-mono text-slate-400 whitespace-nowrap">
                          {displayIndex}
                        </td>

                        {/* 销售顾问姓名 */}
                        <td className="py-3.5 px-4 whitespace-nowrap font-bold text-slate-900 dark:text-white">
                          {row.consultantName}
                        </td>

                        {/* 演练日期 */}
                        <td className="py-3.5 px-4 font-mono font-bold text-slate-800 dark:text-slate-100 whitespace-nowrap">
                          <div className="flex items-center gap-1.5">
                            <Calendar size={13} className="text-blue-500 shrink-0" />
                            <span>{row.date || row.startTime.split(' ')[0]}</span>
                          </div>
                        </td>

                        {/* 演练开始时间 */}
                        <td className="py-3.5 px-4 font-mono font-medium text-slate-700 dark:text-slate-300 whitespace-nowrap">
                          <div className="flex items-center gap-1.5">
                            <Clock size={13} className="text-emerald-500 shrink-0" />
                            <span>{row.startTime}</span>
                          </div>
                        </td>

                        {/* 演练结束时间 */}
                        <td className="py-3.5 px-4 font-mono font-medium text-slate-700 dark:text-slate-300 whitespace-nowrap">
                          <div className="flex items-center gap-1.5">
                            <Clock size={13} className="text-rose-500 shrink-0" />
                            <span>{row.endTime}</span>
                          </div>
                        </td>

                        {/* 创建人 */}
                        <td className="py-3.5 px-4 font-medium text-slate-700 dark:text-slate-300 whitespace-nowrap">
                          <div className="flex items-center gap-1.5">
                            <span className="inline-block w-2 h-2 rounded-full bg-emerald-500"></span>
                            <span>{row.creator || '销售主管'}</span>
                          </div>
                        </td>

                        {/* 操作：删除 */}
                        <td className="py-3.5 px-4 text-center whitespace-nowrap">
                          <div className="flex items-center justify-center gap-2">
                            <button
                              onClick={() => setDeleteConfirmItem({
                                type: 'drill',
                                id: row.id,
                                title: `销售顾问【${row.consultantName}】的演练记录 (${row.startTime})`
                              })}
                              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-rose-600 dark:text-rose-400 bg-rose-50 hover:bg-rose-100 dark:bg-rose-950/40 dark:hover:bg-rose-900/60 border border-rose-200 dark:border-rose-800/60 rounded-lg transition-colors cursor-pointer"
                              title="删除此演练记录"
                            >
                              <Trash2 size={13} />
                              <span>删除</span>
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan={7} className="py-16 text-center text-slate-400">
                      <div className="flex flex-col items-center justify-center gap-2">
                        <Dumbbell size={32} className="text-slate-300 dark:text-slate-600" />
                        <p className="text-sm font-medium">未找到符合条件的销售演练记录</p>
                        <button
                          onClick={() => {
                            setCreateType('drill');
                            setIsCreateModalOpen(true);
                          }}
                          className="mt-2 text-xs text-blue-600 dark:text-blue-400 font-bold hover:underline"
                        >
                          立即创建第一条销售演练记录
                        </button>
                      </div>
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
              共 <strong className="text-blue-600 dark:text-blue-400 font-bold">{activeTab === 'training' ? filteredTrainingRecords.length : filteredDrillRecords.length}</strong> 条记录
            </span>
            <div className="flex items-center gap-1">
              <select
                value={activeTab === 'training' ? trainingPageSize : drillPageSize}
                onChange={(e) => {
                  const newSize = Number(e.target.value);
                  if (activeTab === 'training') {
                    setTrainingPageSize(newSize);
                    setTrainingPage(1);
                  } else {
                    setDrillPageSize(newSize);
                    setDrillPage(1);
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
              disabled={activeTab === 'training' ? currentTrainingPage <= 1 : currentDrillPage <= 1}
              onClick={() => {
                if (activeTab === 'training') {
                  setTrainingPage(p => Math.max(1, p - 1));
                } else {
                  setDrillPage(p => Math.max(1, p - 1));
                }
              }}
              className="px-2.5 py-1 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors flex items-center gap-1"
            >
              <ChevronLeft size={13} />
              <span>上一页</span>
            </button>

            {Array.from({ length: activeTab === 'training' ? totalTrainingPages : totalDrillPages }, (_, i) => i + 1).map(p => {
              const currentPage = activeTab === 'training' ? currentTrainingPage : currentDrillPage;
              return (
                <button
                  key={p}
                  onClick={() => {
                    if (activeTab === 'training') {
                      setTrainingPage(p);
                    } else {
                      setDrillPage(p);
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
              disabled={activeTab === 'training' ? currentTrainingPage >= totalTrainingPages : currentDrillPage >= totalDrillPages}
              onClick={() => {
                if (activeTab === 'training') {
                  setTrainingPage(p => Math.min(totalTrainingPages, p + 1));
                } else {
                  setDrillPage(p => Math.min(totalDrillPages, p + 1));
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
                max={activeTab === 'training' ? totalTrainingPages : totalDrillPages}
                value={activeTab === 'training' ? trainingJumpPage : drillJumpPage}
                onChange={(e) => {
                  if (activeTab === 'training') {
                    setTrainingJumpPage(e.target.value);
                  } else {
                    setDrillJumpPage(e.target.value);
                  }
                }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    const totalP = activeTab === 'training' ? totalTrainingPages : totalDrillPages;
                    const rawVal = activeTab === 'training' ? trainingJumpPage : drillJumpPage;
                    const val = parseInt(rawVal);
                    if (val >= 1 && val <= totalP) {
                      if (activeTab === 'training') {
                        setTrainingPage(val);
                        setTrainingJumpPage('');
                      } else {
                        setDrillPage(val);
                        setDrillJumpPage('');
                      }
                    }
                  }
                }}
                placeholder={String(activeTab === 'training' ? currentTrainingPage : currentDrillPage)}
                className="w-11 px-1.5 py-1 text-center bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-xs outline-none text-slate-800 dark:text-slate-200"
              />
              <span>页</span>
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* MODAL 1: 新建记录弹窗 (支持选择转训 / 销售演练) */}
      {/* ========================================================================= */}
      {isCreateModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 backdrop-blur-xs p-4 overflow-y-auto">
          <div className="bg-white dark:bg-slate-800 w-full max-w-2xl rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-700 overflow-hidden my-8 animate-scale-in">
            
            {/* Modal Header */}
            <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-700 flex items-center justify-between bg-slate-50 dark:bg-slate-900/60">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400">
                  <Plus size={18} className="stroke-[2.5]" />
                </div>
                <div>
                  <h3 className="text-base font-black text-slate-900 dark:text-white">
                    新建转训 / 演练记录
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    请选择记录类型并填写相关信息与上传对应附件
                  </p>
                </div>
              </div>
              <button
                onClick={() => {
                  setIsCreateModalOpen(false);
                  resetForm();
                }}
                className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleCreateSubmit} className="p-6 space-y-5 max-h-[75vh] overflow-y-auto">
              
              {/* Type Switcher in Form */}
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
                  记录类型 <span className="text-rose-500">*</span>
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setCreateType('training')}
                    className={`flex items-center justify-center gap-2 p-3 rounded-2xl border text-xs font-bold transition-all cursor-pointer ${
                      createType === 'training'
                        ? 'bg-blue-50/80 dark:bg-blue-950/40 border-blue-500 text-blue-600 dark:text-blue-400 ring-2 ring-blue-500/20'
                        : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'
                    }`}
                  >
                    <GraduationCap size={16} />
                    <span>转训记录 (转训练)</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setCreateType('drill')}
                    className={`flex items-center justify-center gap-2 p-3 rounded-2xl border text-xs font-bold transition-all cursor-pointer ${
                      createType === 'drill'
                        ? 'bg-blue-50/80 dark:bg-blue-950/40 border-blue-500 text-blue-600 dark:text-blue-400 ring-2 ring-blue-500/20'
                        : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'
                    }`}
                  >
                    <Dumbbell size={16} />
                    <span>销售演练记录</span>
                  </button>
                </div>
              </div>

              {/* ========================================================= */}
              {/* FORM TYPE A: 转训 (选择内容/时间/参与人/4类附件上传) */}
              {/* ========================================================= */}
              {createType === 'training' && (
                <div className="space-y-4 pt-2 border-t border-slate-100 dark:border-slate-700">
                  
                  {/* 转训内容选择 */}
                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
                      转训内容 <span className="text-rose-500">*</span>
                    </label>
                    <select
                      value={formTrainingContent}
                      onChange={(e) => setFormTrainingContent(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-800 dark:text-slate-200 outline-none focus:ring-2 focus:ring-blue-500/20"
                      required
                    >
                      {PRESET_TRAINING_TOPICS.map((topic, tIdx) => (
                        <option key={tIdx} value={topic}>{topic}</option>
                      ))}
                    </select>
                  </div>

                  {/* 转训时间 */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
                        转训开始时间 <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="text"
                        placeholder="2026-08-23 09:30"
                        value={formTrainingStartTime}
                        onChange={(e) => setFormTrainingStartTime(e.target.value)}
                        className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-800 dark:text-slate-200 outline-none focus:ring-2 focus:ring-blue-500/20"
                        required
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
                        转训结束时间 <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="text"
                        placeholder="2026-08-23 11:30"
                        value={formTrainingEndTime}
                        onChange={(e) => setFormTrainingEndTime(e.target.value)}
                        className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-800 dark:text-slate-200 outline-none focus:ring-2 focus:ring-blue-500/20"
                        required
                      />
                    </div>
                  </div>

                  {/* 参与人员 */}
                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
                      参与人员 (用空格隔开) <span className="text-rose-500">*</span>
                    </label>
                    <textarea
                      rows={2}
                      placeholder="如：张伟 李强 王丽 陈明 赵雪 刘洋 (只能用空格隔开)"
                      value={formParticipants}
                      onChange={(e) => {
                        // 只能用空格隔开，将输入的逗号、顿号等非空格符号自动置换为空格，避免其他字符混入
                        const cleaned = e.target.value.replace(/[,，、;；|/]/g, ' ');
                        setFormParticipants(cleaned);
                      }}
                      className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-800 dark:text-slate-200 outline-none focus:ring-2 focus:ring-blue-500/20"
                      required
                    />
                    <p className="text-[11px] text-slate-400 dark:text-slate-500">
                      姓名之间仅支持使用空格隔开，不允许使用逗号、顿号等其他符号
                    </p>
                  </div>

                  {/* 2类附件上传区域 (视频 & 参训现场照) */}
                  <div className="space-y-3 pt-3 border-t border-slate-100 dark:border-slate-700">
                    <div className="flex items-center justify-between">
                      <label className="text-xs font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
                        <Upload size={14} className="text-blue-500" />
                        <span>多模态附件上传 (视频与参训现场照)</span>
                      </label>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      
                      {/* Hidden File Inputs for Training Creation (Triggered after user confirms shooting requirements) */}
                      <input 
                        ref={createVideoInputRef}
                        type="file" 
                        accept="video/mp4,video/quicktime,video/*"
                        onChange={(e) => handleSimulatedFileUpload('video', e)} 
                        className="hidden" 
                      />
                      <input 
                        ref={createPhotoInputRef}
                        type="file" 
                        accept="image/png,image/jpeg,image/jpg"
                        onChange={(e) => handleSimulatedFileUpload('photo', e)} 
                        className="hidden" 
                      />

                      {/* 1. 上传视频 */}
                      <div className="p-3.5 rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-900/30 space-y-2">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <div className="flex items-center gap-1.5 text-xs font-bold text-slate-800 dark:text-slate-200">
                              <FileVideo size={15} className="text-blue-500" />
                              <span>1. 上传视频</span>
                              <span className="text-rose-500 font-bold">*</span>
                            </div>
                            <button
                              type="button"
                              onClick={() => openRequirementModal('video', 'create')}
                              className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold text-blue-700 dark:text-blue-300 bg-blue-100/90 hover:bg-blue-200 dark:bg-blue-950/80 dark:hover:bg-blue-900 border border-blue-300 dark:border-blue-700 shadow-2xs hover:scale-105 transition-all cursor-pointer"
                              title="查看视频拍摄要求与正误示例"
                            >
                              <Sparkles size={11} className="text-blue-600 dark:text-blue-400" />
                              <span>拍摄要求</span>
                            </button>
                          </div>
                          {uploadedVideo && (
                            <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-bold flex items-center gap-0.5">
                              <Check size={12} /> 已上传
                            </span>
                          )}
                        </div>

                        {uploadedVideo ? (
                          <div className="flex items-center justify-between p-2 bg-blue-50 dark:bg-blue-950/40 rounded-xl border border-blue-100 dark:border-blue-900/60 text-xs">
                            <div className="truncate max-w-[170px]">
                              <p className="font-semibold text-blue-900 dark:text-blue-200 truncate">{uploadedVideo.name}</p>
                              <p className="text-[10px] text-blue-500 font-mono">{uploadedVideo.size}</p>
                            </div>
                            <button
                              type="button"
                              onClick={() => setUploadedVideo(null)}
                              className="text-slate-400 hover:text-rose-500 p-1 cursor-pointer"
                              title="移除此视频"
                            >
                              <X size={14} />
                            </button>
                          </div>
                        ) : (
                          <button
                            type="button"
                            onClick={() => openRequirementModal('video', 'create')}
                            className="w-full flex flex-col items-center justify-center p-3 border-2 border-dashed border-slate-200 dark:border-slate-700 hover:border-blue-400 rounded-xl cursor-pointer bg-white dark:bg-slate-800/80 transition-all text-center group hover:bg-blue-50/40 dark:hover:bg-blue-950/20"
                          >
                            <Upload size={16} className="text-slate-400 group-hover:text-blue-500 mb-1 transition-colors" />
                            <span className="text-xs text-slate-600 dark:text-slate-300 font-medium group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">点击选择现场视频</span>
                            <span className="text-[10px] text-slate-400">需符合拍摄规范 · 单个视频文件</span>
                          </button>
                        )}
                      </div>

                      {/* 2. 上传参训现场照 */}
                      <div className="p-3.5 rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-900/30 space-y-2">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <div className="flex items-center gap-1.5 text-xs font-bold text-slate-800 dark:text-slate-200">
                              <ImageIcon size={15} className="text-amber-500" />
                              <span>2. 上传参训现场照</span>
                              <span className="text-rose-500 font-bold">*</span>
                            </div>
                            <button
                              type="button"
                              onClick={() => openRequirementModal('photo', 'create')}
                              className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold text-amber-800 dark:text-amber-200 bg-amber-100/90 hover:bg-amber-200 dark:bg-amber-950/80 dark:hover:bg-amber-900 border border-amber-300 dark:border-amber-700 shadow-2xs hover:scale-105 transition-all cursor-pointer"
                              title="查看合照/参训现场照拍摄要求与正误示例"
                            >
                              <Sparkles size={11} className="text-amber-600 dark:text-amber-400" />
                              <span>拍摄要求</span>
                            </button>
                          </div>
                          {uploadedLivePhoto && (
                            <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-bold flex items-center gap-0.5">
                              <Check size={12} /> 已上传
                            </span>
                          )}
                        </div>

                        {uploadedLivePhoto ? (
                          <div className="flex items-center justify-between p-2 bg-amber-50 dark:bg-amber-950/40 rounded-xl border border-amber-100 dark:border-amber-900/60 text-xs">
                            <div className="truncate max-w-[170px]">
                              <p className="font-semibold text-amber-900 dark:text-amber-200 truncate">{uploadedLivePhoto.name}</p>
                              <p className="text-[10px] text-amber-600 font-mono">{uploadedLivePhoto.size}</p>
                            </div>
                            <button
                              type="button"
                              onClick={() => setUploadedLivePhoto(null)}
                              className="text-slate-400 hover:text-rose-500 p-1 cursor-pointer"
                              title="移除现场照片"
                            >
                              <X size={14} />
                            </button>
                          </div>
                        ) : (
                          <button
                            type="button"
                            onClick={() => openRequirementModal('photo', 'create')}
                            className="w-full flex flex-col items-center justify-center p-3 border-2 border-dashed border-slate-200 dark:border-slate-700 hover:border-amber-400 rounded-xl cursor-pointer bg-white dark:bg-slate-800/80 transition-all text-center group hover:bg-amber-50/40 dark:hover:bg-amber-950/20"
                          >
                            <Upload size={16} className="text-slate-400 group-hover:text-amber-500 mb-1 transition-colors" />
                            <span className="text-xs text-slate-600 dark:text-slate-300 font-medium group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">点击选择参训现场照片</span>
                            <span className="text-[10px] text-slate-400">需符合拍摄规范 · .jpg / .png / .jpeg</span>
                          </button>
                        )}
                      </div>

                    </div>
                  </div>

                </div>
              )}

              {/* ========================================================= */}
              {/* FORM TYPE B: 销售演练 (销售顾问姓名/演练开始/演练结束) */}
              {/* ========================================================= */}
              {createType === 'drill' && (
                <div className="space-y-4 pt-2 border-t border-slate-100 dark:border-slate-700">
                  
                  {/* 销售顾问姓名 */}
                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
                      销售顾问姓名 <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      placeholder="请输入销售顾问姓名，如：张伟"
                      value={formConsultantName}
                      onChange={(e) => setFormConsultantName(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-800 dark:text-slate-200 outline-none focus:ring-2 focus:ring-blue-500/20"
                      required
                    />
                  </div>

                  {/* 演练时间 */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
                        演练开始时间 <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="text"
                        placeholder="2026-08-23 14:00"
                        value={formDrillStartTime}
                        onChange={(e) => setFormDrillStartTime(e.target.value)}
                        className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-800 dark:text-slate-200 outline-none focus:ring-2 focus:ring-blue-500/20"
                        required
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
                        演练结束时间 <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="text"
                        placeholder="2026-08-23 14:45"
                        value={formDrillEndTime}
                        onChange={(e) => setFormDrillEndTime(e.target.value)}
                        className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-800 dark:text-slate-200 outline-none focus:ring-2 focus:ring-blue-500/20"
                        required
                      />
                    </div>
                  </div>

                </div>
              )}

              {/* Form Action Footer */}
              <div className="pt-4 border-t border-slate-200 dark:border-slate-700 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setIsCreateModalOpen(false);
                    resetForm();
                  }}
                  className="px-4 py-2 text-xs font-semibold text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-xl transition-colors cursor-pointer"
                >
                  取消
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-xl shadow-md transition-all cursor-pointer"
                >
                  确认保存记录
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL 2: 查看附件弹窗 (查看对应转训的视频、成绩单、签到表、现场图片) */}
      {/* ========================================================================= */}
      {viewingAttachmentsRecord && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 backdrop-blur-xs p-4 overflow-y-auto">
          <div className="bg-white dark:bg-slate-800 w-full max-w-3xl rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-700 overflow-hidden my-8 animate-scale-in">
            
            {/* Header */}
            <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-700 flex items-center justify-between bg-slate-50 dark:bg-slate-900/60">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400">
                  <Eye size={18} />
                </div>
                <div>
                  <h3 className="text-base font-black text-slate-900 dark:text-white">
                    转训多模态附件
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    {viewingAttachmentsRecord.date} · {viewingAttachmentsRecord.content}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setViewingAttachmentsRecord(null)}
                className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>

            {/* Content Body */}
            <div className="p-6 space-y-6">
              
              {/* 2 Attachment Cards Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                
                {/* 1. 视频 */}
                <div className="p-4 rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-900/30 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-xs font-bold text-slate-900 dark:text-white">
                      <FileVideo size={16} className="text-blue-500" />
                      <span>现场实训视频</span>
                    </div>
                    {viewingAttachmentsRecord.attachments.video ? (
                      <span className="px-2 py-0.5 text-[10px] font-bold bg-blue-100 text-blue-700 dark:bg-blue-900/60 dark:text-blue-300 rounded-full">
                        已上传
                      </span>
                    ) : (
                      <span className="text-[10px] text-slate-400">未上传</span>
                    )}
                  </div>

                  {viewingAttachmentsRecord.attachments.video ? (
                    <div className="space-y-2">
                      <div className="aspect-video bg-slate-900 rounded-xl flex flex-col items-center justify-center text-white relative overflow-hidden group cursor-pointer border border-slate-800">
                        <div className="w-12 h-12 rounded-full bg-blue-600/80 group-hover:bg-blue-600 flex items-center justify-center shadow-lg transition-transform group-hover:scale-110">
                          <Play size={20} className="ml-1" />
                        </div>
                        <span className="text-[11px] font-medium text-slate-300 mt-2">点击播放转训高清录像</span>
                        <div className="absolute bottom-2 right-2 text-[10px] bg-black/60 px-2 py-0.5 rounded font-mono">
                          01:45:20
                        </div>
                      </div>

                      <div className="pt-1">
                        <p className="font-semibold text-slate-800 dark:text-slate-200 text-xs truncate">
                          {viewingAttachmentsRecord.attachments.video.name}
                        </p>
                        <p className="text-[10px] text-slate-400 font-mono">
                          {viewingAttachmentsRecord.attachments.video.size} · 上传于 {viewingAttachmentsRecord.attachments.video.uploadTime}
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div className="py-8 text-center text-xs text-slate-400">
                      暂无视频文件
                    </div>
                  )}
                </div>

                {/* 2. 现场图片 */}
                <div className="p-4 rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-900/30 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-xs font-bold text-slate-900 dark:text-white">
                      <ImageIcon size={16} className="text-amber-500" />
                      <span>现场实训图片</span>
                    </div>
                    {viewingAttachmentsRecord.attachments.livePhoto ? (
                      <span className="px-2 py-0.5 text-[10px] font-bold bg-amber-100 text-amber-700 dark:bg-amber-900/60 dark:text-amber-300 rounded-full">
                        已上传
                      </span>
                    ) : (
                      <span className="text-[10px] text-slate-400">未上传</span>
                    )}
                  </div>

                  {viewingAttachmentsRecord.attachments.livePhoto ? (
                    <div className="space-y-2">
                      <div className="aspect-video bg-gradient-to-br from-amber-500/20 via-orange-500/10 to-slate-900 rounded-xl flex flex-col items-center justify-center p-3 relative overflow-hidden border border-amber-200/50 dark:border-amber-900/40">
                        <ImageIcon size={32} className="text-amber-500/60 mb-1" />
                        <span className="text-xs font-semibold text-slate-700 dark:text-slate-200">转训现场高保真实拍</span>
                      </div>

                      <div className="pt-1">
                        <p className="font-semibold text-slate-800 dark:text-slate-200 text-xs truncate">
                          {viewingAttachmentsRecord.attachments.livePhoto.name}
                        </p>
                        <p className="text-[10px] text-slate-400 font-mono">
                          {viewingAttachmentsRecord.attachments.livePhoto.size} · 上传于 {viewingAttachmentsRecord.attachments.livePhoto.uploadTime}
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div className="py-8 text-center text-xs text-slate-400">
                      暂无现场图片
                    </div>
                  )}
                </div>

              </div>

            </div>

            {/* Modal Footer */}
            <div className="px-6 py-4 bg-slate-50 dark:bg-slate-900/60 border-t border-slate-200 dark:border-slate-700 flex items-center justify-end text-xs">
              <button
                onClick={() => setViewingAttachmentsRecord(null)}
                className="px-4 py-2 bg-slate-200 hover:bg-slate-300 dark:bg-slate-700 dark:hover:bg-slate-600 text-slate-800 dark:text-slate-200 rounded-xl font-bold transition-colors cursor-pointer"
              >
                关闭
              </button>
            </div>

          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL 3: 仅用于删除附件或替换附件的管理弹窗 (无基本信息输入) */}
      {/* ========================================================================= */}
      {editingTrainingRecord && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 backdrop-blur-xs p-4 overflow-y-auto">
          <div className="bg-white dark:bg-slate-800 w-full max-w-3xl rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-700 overflow-hidden my-8 animate-scale-in">
            {/* Header */}
            <div className="px-6 py-4 bg-gradient-to-r from-indigo-700 via-blue-700 to-indigo-800 text-white flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-white/10 backdrop-blur-xs border border-white/20">
                  <Sparkles size={20} className="text-white" />
                </div>
                <div>
                  <h2 className="text-base font-black">
                    管理与替换转训附件
                  </h2>
                  <p className="text-xs text-indigo-100/90 mt-0.5">
                    仅支持删除已上传附件或上传新文件进行替换覆盖
                  </p>
                </div>
              </div>
              <button
                onClick={() => setEditingTrainingRecord(null)}
                className="p-1.5 rounded-lg text-white/80 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>

            {/* Content */}
            <form onSubmit={handleSaveTrainingEdit} className="p-6 space-y-5 max-h-[78vh] overflow-y-auto">
              {/* 1. 当前转训信息展示 (只读信息卡片，无输入项) */}
              <div className="p-3.5 rounded-2xl bg-indigo-50/70 dark:bg-indigo-950/30 border border-indigo-100 dark:border-indigo-900/50 flex flex-col md:flex-row md:items-center justify-between gap-3 text-xs">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 text-[10px] font-bold bg-indigo-600 text-white rounded-md">
                      转训主题
                    </span>
                    <span className="font-bold text-slate-800 dark:text-slate-100 text-sm">
                      {editingTrainingRecord.content}
                    </span>
                  </div>
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-slate-500 dark:text-slate-400 text-[11px]">
                    <span>时间: <strong className="text-slate-700 dark:text-slate-300 font-mono">{editingTrainingRecord.startTime} ~ {editingTrainingRecord.endTime.split(' ')[1] || editingTrainingRecord.endTime}</strong></span>
                    <span>讲师/创建人: <strong className="text-slate-700 dark:text-slate-300">{editingTrainingRecord.creator || editingTrainingRecord.trainerName || '讲师'}</strong></span>
                    <span>参训人数: <strong className="text-slate-700 dark:text-slate-300">{editingTrainingRecord.participants.length}人 ({editingTrainingRecord.participants.join('、')})</strong></span>
                  </div>
                </div>
                <div className="text-right shrink-0">
                  <span className="text-[11px] text-indigo-700 dark:text-indigo-300 font-semibold bg-white/80 dark:bg-slate-800/80 px-2.5 py-1 rounded-lg border border-indigo-200/60 dark:border-indigo-800/60">
                    已上传附件: {[editAttachments.video, editAttachments.livePhoto].filter(Boolean).length} / 2
                  </span>
                </div>
              </div>

              {/* 2. 2项多模态附件管理与替换区域 */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                {/* Hidden File Inputs for Training Attachment Edit */}
                <input
                  ref={editVideoInputRef}
                  type="file"
                  accept="video/*"
                  className="hidden"
                  onChange={(e) => handleEditAttachmentUpload('video', e)}
                />
                <input
                  ref={editPhotoInputRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => handleEditAttachmentUpload('photo', e)}
                />

                {/* 1. 现场视频 */}
                <div className="p-4 rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50/60 dark:bg-slate-900/40 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="flex items-center gap-1.5 text-xs font-bold text-slate-800 dark:text-slate-200">
                        <FileVideo size={16} className="text-blue-600 dark:text-blue-400" />
                        <span>1. 现场实录视频</span>
                      </div>
                      <button
                        type="button"
                        onClick={() => openRequirementModal('video', 'edit')}
                        className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold text-blue-700 dark:text-blue-300 bg-blue-100 hover:bg-blue-200 dark:bg-blue-950 dark:hover:bg-blue-900 border border-blue-300 dark:border-blue-700 transition-all cursor-pointer"
                        title="查看视频拍摄要求"
                      >
                        <Sparkles size={10} className="text-blue-600 dark:text-blue-400" />
                        <span>拍摄要求</span>
                      </button>
                    </div>
                    {editAttachments.video ? (
                      <span className="px-2 py-0.5 text-[10px] font-bold bg-blue-100 text-blue-700 dark:bg-blue-900/60 dark:text-blue-300 rounded-full">
                        已上传
                      </span>
                    ) : (
                      <span className="px-2 py-0.5 text-[10px] font-medium bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-400 rounded-full">
                        未上传
                      </span>
                    )}
                  </div>

                  {editAttachments.video ? (
                    <div className="p-3 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex flex-col gap-2.5">
                      <div>
                        <p className="text-xs font-semibold text-slate-800 dark:text-slate-200 truncate" title={editAttachments.video.name}>
                          {editAttachments.video.name}
                        </p>
                        <p className="text-[10px] text-slate-400 font-mono mt-0.5">
                          {editAttachments.video.size} · 上传于 {editAttachments.video.uploadTime}
                        </p>
                      </div>

                      <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100 dark:border-slate-700/60">
                        <button
                          type="button"
                          onClick={() => openRequirementModal('video', 'edit')}
                          className="flex items-center gap-1 px-2.5 py-1.5 text-[11px] font-semibold text-blue-600 dark:text-blue-400 bg-blue-50 hover:bg-blue-100 dark:bg-blue-950/50 dark:hover:bg-blue-900/60 rounded-lg cursor-pointer transition-colors"
                        >
                          <RefreshCw size={12} />
                          <span>替换新视频</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => handleDeleteEditAttachment('video')}
                          className="flex items-center gap-1 px-2.5 py-1.5 text-[11px] font-semibold text-rose-600 dark:text-rose-400 bg-rose-50 hover:bg-rose-100 dark:bg-rose-950/50 dark:hover:bg-rose-900/60 rounded-lg cursor-pointer transition-colors"
                        >
                          <Trash2 size={12} />
                          <span>删除附件</span>
                        </button>
                      </div>
                    </div>
                  ) : (
                    <button
                      type="button"
                      onClick={() => openRequirementModal('video', 'edit')}
                      className="w-full border-2 border-dashed border-slate-300 dark:border-slate-700 hover:border-blue-500 rounded-xl p-5 flex flex-col items-center justify-center gap-1.5 cursor-pointer bg-white/60 dark:bg-slate-800/40 hover:bg-blue-50/40 dark:hover:bg-blue-950/20 transition-all text-center group"
                    >
                      <Upload size={20} className="text-slate-400 group-hover:text-blue-500 transition-colors" />
                      <span className="text-xs font-semibold text-slate-700 dark:text-slate-300 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                        + 上传实录视频
                      </span>
                      <span className="text-[10px] text-slate-400">需符合拍摄规范 · 支持 MP4, MOV, AVI</span>
                    </button>
                  )}
                </div>

                {/* 2. 现场实训照片 */}
                <div className="p-4 rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50/60 dark:bg-slate-900/40 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="flex items-center gap-1.5 text-xs font-bold text-slate-800 dark:text-slate-200">
                        <ImageIcon size={16} className="text-amber-600 dark:text-amber-400" />
                        <span>2. 现场实训照片</span>
                      </div>
                      <button
                        type="button"
                        onClick={() => openRequirementModal('photo', 'edit')}
                        className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold text-amber-800 dark:text-amber-200 bg-amber-100 hover:bg-amber-200 dark:bg-amber-950 dark:hover:bg-amber-900 border border-amber-300 dark:border-amber-700 transition-all cursor-pointer"
                        title="查看参训现场照片拍摄要求"
                      >
                        <Sparkles size={10} className="text-amber-600 dark:text-amber-400" />
                        <span>拍摄要求</span>
                      </button>
                    </div>
                    {editAttachments.livePhoto ? (
                      <span className="px-2 py-0.5 text-[10px] font-bold bg-amber-100 text-amber-700 dark:bg-amber-900/60 dark:text-amber-300 rounded-full">
                        已上传
                      </span>
                    ) : (
                      <span className="px-2 py-0.5 text-[10px] font-medium bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-400 rounded-full">
                        未上传
                      </span>
                    )}
                  </div>

                  {editAttachments.livePhoto ? (
                    <div className="p-3 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex flex-col gap-2.5">
                      <div>
                        <p className="text-xs font-semibold text-slate-800 dark:text-slate-200 truncate" title={editAttachments.livePhoto.name}>
                          {editAttachments.livePhoto.name}
                        </p>
                        <p className="text-[10px] text-slate-400 font-mono mt-0.5">
                          {editAttachments.livePhoto.size} · 上传于 {editAttachments.livePhoto.uploadTime}
                        </p>
                      </div>

                      <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100 dark:border-slate-700/60">
                        <button
                          type="button"
                          onClick={() => openRequirementModal('photo', 'edit')}
                          className="flex items-center gap-1 px-2.5 py-1.5 text-[11px] font-semibold text-amber-600 dark:text-amber-400 bg-amber-50 hover:bg-amber-100 dark:bg-amber-950/50 dark:hover:bg-amber-900/60 rounded-lg cursor-pointer transition-colors"
                        >
                          <RefreshCw size={12} />
                          <span>替换照片</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => handleDeleteEditAttachment('livePhoto')}
                          className="flex items-center gap-1 px-2.5 py-1.5 text-[11px] font-semibold text-rose-600 dark:text-rose-400 bg-rose-50 hover:bg-rose-100 dark:bg-rose-950/50 dark:hover:bg-rose-900/60 rounded-lg cursor-pointer transition-colors"
                        >
                          <Trash2 size={12} />
                          <span>删除附件</span>
                        </button>
                      </div>
                    </div>
                  ) : (
                    <button
                      type="button"
                      onClick={() => openRequirementModal('photo', 'edit')}
                      className="w-full border-2 border-dashed border-slate-300 dark:border-slate-700 hover:border-amber-500 rounded-xl p-5 flex flex-col items-center justify-center gap-1.5 cursor-pointer bg-white/60 dark:bg-slate-800/40 hover:bg-amber-50/40 dark:hover:bg-amber-950/20 transition-all text-center group"
                    >
                      <Upload size={20} className="text-slate-400 group-hover:text-amber-500 transition-colors" />
                      <span className="text-xs font-semibold text-slate-700 dark:text-slate-300 group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
                        + 上传实训现场照片
                      </span>
                      <span className="text-[10px] text-slate-400">需符合拍摄规范 · 支持 JPG, PNG 高清原图</span>
                    </button>
                  )}
                </div>

              </div>

              {/* Actions */}
              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-200 dark:border-slate-700">
                <button
                  type="button"
                  onClick={() => setEditingTrainingRecord(null)}
                  className="px-4 py-2.5 text-xs font-semibold text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-xl transition-colors cursor-pointer"
                >
                  取消
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl shadow-lg shadow-indigo-600/30 transition-all cursor-pointer flex items-center gap-1.5"
                >
                  <Check size={14} />
                  <span>保存附件修改</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL 4: 删除确认弹窗 */}
      {/* ========================================================================= */}
      {deleteConfirmItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 backdrop-blur-xs p-4">
          <div className="bg-white dark:bg-slate-800 w-full max-w-md rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-700 p-6 space-y-4 animate-scale-in">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-2xl bg-rose-100 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400 border border-rose-200 dark:border-rose-900/50">
                <AlertCircle size={24} />
              </div>
              <div>
                <h3 className="text-base font-black text-slate-900 dark:text-white">
                  确认删除此记录？
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                  此操作将永久移除该条记录，无法恢复。
                </p>
              </div>
            </div>

            <div className="p-3 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200/60 dark:border-slate-700/60 text-xs text-slate-700 dark:text-slate-300">
              {deleteConfirmItem.title}
            </div>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                onClick={() => setDeleteConfirmItem(null)}
                className="px-4 py-2 text-xs font-semibold text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-xl transition-colors cursor-pointer"
              >
                取消
              </button>
              <button
                onClick={handleConfirmDelete}
                className="px-4 py-2 text-xs font-bold text-white bg-rose-600 hover:bg-rose-700 rounded-xl shadow-md transition-all cursor-pointer"
              >
                确认删除
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL 5: 拍摄要求指南弹窗 (视频 / 参训现场照) */}
      {/* ========================================================================= */}
      <ShootingRequirementModal
        isOpen={shootingRequirementModal.isOpen}
        onClose={() => setShootingRequirementModal(prev => ({ ...prev, isOpen: false }))}
        onConfirmUpload={handleConfirmShootingUpload}
        defaultType={shootingRequirementModal.type}
      />

    </div>
  );
};

export default TrainingDrillRecordManagement;
