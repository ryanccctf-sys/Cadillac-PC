import React, { useState } from 'react';
import { 
  X, 
  Video, 
  Camera, 
  CheckCircle2, 
  XCircle, 
  AlertCircle, 
  Info, 
  Sparkles,
  Maximize2,
  Upload
} from 'lucide-react';
import videoGuideImg from '../src/assets/images/video_shooting_guide_1788329658753.jpg';
import photoGuideImg from '../src/assets/images/photo_shooting_guide_1788329673314.jpg';

export interface ShootingRequirementModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirmUpload?: (type: 'video' | 'photo') => void;
  defaultType?: 'video' | 'photo';
}

export const ShootingRequirementModal: React.FC<ShootingRequirementModalProps> = ({
  isOpen,
  onClose,
  onConfirmUpload,
  defaultType = 'video'
}) => {
  const [activeType, setActiveType] = useState<'video' | 'photo'>(defaultType);

  // Sync active type when defaultType changes upon opening
  React.useEffect(() => {
    if (isOpen) {
      setActiveType(defaultType);
    }
  }, [isOpen, defaultType]);

  const handleConfirm = () => {
    onClose();
    if (onConfirmUpload) {
      onConfirmUpload(activeType);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-slate-950/70 backdrop-blur-xs z-50 flex items-center justify-center p-3 sm:p-4 md:p-6 animate-fade-in overflow-y-auto">
      <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-2xl w-full max-h-[92vh] overflow-y-auto shadow-2xl border border-slate-200 dark:border-slate-800 flex flex-col relative transition-all">
        
        {/* Modal Top Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 dark:border-slate-800 bg-slate-50/80 dark:bg-slate-900/90 sticky top-0 z-20 backdrop-blur-md">
          <div className="flex items-center gap-2">
            <span className="flex items-center justify-center w-7 h-7 rounded-xl bg-blue-600 text-white shadow-sm">
              <Sparkles size={15} />
            </span>
            <h3 className="font-bold text-slate-900 dark:text-white text-base">
              转训多模态素材 · 拍摄与上传要求指南
            </h3>
          </div>

          <button 
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-400 hover:text-slate-700 dark:hover:text-white transition-colors cursor-pointer"
            title="关闭"
          >
            <X size={20} />
          </button>
        </div>

        {/* Tab Selection */}
        <div className="px-6 pt-4 pb-2 bg-slate-50/40 dark:bg-slate-900/40 border-b border-slate-100 dark:border-slate-800/80">
          <div className="grid grid-cols-2 gap-2 p-1 bg-slate-200/70 dark:bg-slate-800 rounded-2xl">
            <button
              onClick={() => setActiveType('video')}
              className={`flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl font-bold text-xs sm:text-sm transition-all cursor-pointer ${
                activeType === 'video'
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20 scale-[1.02]'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <Video size={16} />
              <span>视频拍摄要求</span>
              {activeType === 'video' && <span className="w-1.5 h-1.5 rounded-full bg-white ml-0.5 animate-pulse" />}
            </button>

            <button
              onClick={() => setActiveType('photo')}
              className={`flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl font-bold text-xs sm:text-sm transition-all cursor-pointer ${
                activeType === 'photo'
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20 scale-[1.02]'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <Camera size={16} />
              <span>参训现场照拍摄要求</span>
              {activeType === 'photo' && <span className="w-1.5 h-1.5 rounded-full bg-white ml-0.5 animate-pulse" />}
            </button>
          </div>
        </div>

        {/* Modal Body: Requirements Content */}
        <div className="p-6 space-y-5">
          {activeType === 'video' ? (
            /* ===================== 1. 视频拍摄要求 ===================== */
            <div className="space-y-4 animate-fade-in">
              {/* Requirement Bullet Points Card (2x2 Grid) */}
              <div className="bg-blue-50/80 dark:bg-blue-950/40 border border-blue-100 dark:border-blue-900/60 rounded-2xl p-3.5 sm:p-4 shadow-2xs">
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2.5 text-xs sm:text-sm text-slate-800 dark:text-slate-200 font-medium">
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-900 dark:bg-slate-200 shrink-0" />
                    <span>
                      手机距离内训师距离 <strong className="text-blue-600 dark:text-blue-400 font-bold">1-3 米</strong>
                    </span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-900 dark:bg-slate-200 shrink-0" />
                    <span>
                      画面中内训师的<strong className="text-blue-600 dark:text-blue-400 font-bold">头部、上半身</strong>需完整清晰
                    </span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-900 dark:bg-slate-200 shrink-0" />
                    <span>
                      优先<strong className="text-blue-600 dark:text-blue-400 font-bold">正向</strong>拍摄
                    </span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-900 dark:bg-slate-200 shrink-0" />
                    <span>
                      <strong className="text-blue-600 dark:text-blue-400 font-bold">光线充足</strong>，环境安静，声音清晰
                    </span>
                  </li>
                </ul>
              </div>

              {/* Visual Guide Poster & Infographic Reference */}
              <div className="rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-md bg-slate-100 dark:bg-slate-800/60">
                <img 
                  src={videoGuideImg} 
                  alt="视频拍摄要求标准图" 
                  className="w-full h-auto object-contain max-h-[480px] mx-auto rounded-2xl"
                  referrerPolicy="no-referrer"
                />
              </div>

              {/* Bottom Notice */}
              <div className="p-3.5 bg-slate-100/90 dark:bg-slate-800/80 rounded-2xl border border-slate-200/80 dark:border-slate-700/60 text-xs text-slate-700 dark:text-slate-300 flex items-start gap-2.5">
                <Info size={16} className="text-blue-500 shrink-0 mt-0.5" />
                <p className="leading-relaxed">
                  <strong>温馨提示：</strong>请使用手机横屏或竖屏拍摄均可，确保画面稳定、内容清晰。
                </p>
              </div>

            </div>
          ) : (
            /* ===================== 2. 合照 / 参训现场照拍摄要求 ===================== */
            <div className="space-y-4 animate-fade-in">
              {/* Requirement Bullet Points Card (2x2 Grid) */}
              <div className="bg-blue-50/80 dark:bg-blue-950/40 border border-blue-100 dark:border-blue-900/60 rounded-2xl p-3.5 sm:p-4 shadow-2xs">
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2.5 text-xs sm:text-sm text-slate-800 dark:text-slate-200 font-medium">
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-900 dark:bg-slate-200 shrink-0" />
                    <span>
                      参训人员<strong className="text-blue-600 dark:text-blue-400 font-bold">每个人</strong>都要拍到
                    </span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-900 dark:bg-slate-200 shrink-0" />
                    <span>
                      <strong className="text-blue-600 dark:text-blue-400 font-bold">画面清晰</strong>，光线充足
                    </span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-900 dark:bg-slate-200 shrink-0" />
                    <span>
                      确保每个人的<strong className="text-blue-600 dark:text-blue-400 font-bold">头部都露出来</strong>
                    </span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-900 dark:bg-slate-200 shrink-0" />
                    <span>
                      建议<strong className="text-blue-600 dark:text-blue-400 font-bold">横屏</strong>拍摄，保证所有人都在画面内
                    </span>
                  </li>
                </ul>
              </div>

              {/* Visual Guide Poster & Infographic Reference */}
              <div className="rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-md bg-slate-100 dark:bg-slate-800/60">
                <img 
                  src={photoGuideImg} 
                  alt="合照拍摄要求标准图" 
                  className="w-full h-auto object-contain max-h-[480px] mx-auto rounded-2xl"
                  referrerPolicy="no-referrer"
                />
              </div>

              {/* Bottom Notice */}
              <div className="p-3.5 bg-slate-100/90 dark:bg-slate-800/80 rounded-2xl border border-slate-200/80 dark:border-slate-700/60 text-xs text-slate-700 dark:text-slate-300 flex items-start gap-2.5">
                <Info size={16} className="text-blue-500 shrink-0 mt-0.5" />
                <p className="leading-relaxed">
                  <strong>温馨提示：</strong>请在拍照前检查画面，确保不遮挡、不裁剪，让每位参训人员都清晰入镜。
                </p>
              </div>

            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-3.5 border-t border-slate-100 dark:border-slate-800 bg-slate-50/90 dark:bg-slate-900/90 flex items-center justify-end gap-3 sticky bottom-0 z-10 backdrop-blur-md">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200/70 dark:hover:bg-slate-800 rounded-xl transition-all cursor-pointer border border-transparent hover:border-slate-300 dark:hover:border-slate-700"
          >
            取消
          </button>
          <button
            type="button"
            onClick={handleConfirm}
            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-gradient-to-r from-blue-600 via-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white text-xs font-bold rounded-xl shadow-md shadow-blue-500/25 hover:shadow-lg hover:shadow-blue-500/35 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
          >
            <Upload size={14} className="stroke-[2.5]" />
            <span>我已经知晓拍摄要求立即上传</span>
          </button>
        </div>

      </div>
    </div>
  );
};
