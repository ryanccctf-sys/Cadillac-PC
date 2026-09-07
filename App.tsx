
import React, { useState, useEffect } from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import CustomerInsights from './pages/CustomerInsights';
import QualityMonitor from './pages/QualityMonitor';
import ManagementDaily from './pages/ManagementDaily';
import LeadLibrary from './pages/LeadLibrary';
import EmployeeProfiles from './pages/EmployeeProfiles';
import AIQuality from './pages/AIQuality';
import SalesResistance from './pages/SalesResistance';
import DeviceDashboard from './pages/DeviceDashboard';
import DataScreen from './pages/DataScreen';
import BusinessMonitorScreen from './pages/BusinessMonitorScreen';
import VOCAnalysis from './pages/VOCAnalysis';
import RealTimeAlerts from './pages/RealTimeAlerts';
import ScriptLibrary from './pages/ScriptLibrary';
import TrainingCourseManagement from './pages/TrainingCourseManagement';
import MarketIntelligenceV2 from './pages/MarketIntelligenceV2';
import BadgePanoramicMonitor from './pages/BadgePanoramicMonitor';
import CustomerManagement from './pages/CustomerManagement';
import QualityRulesSettings from './pages/QualityRulesSettings';
import SandboxTest from './pages/SandboxTest';
import OnlineAnnotation from './pages/OnlineAnnotation';
import SolutionOverview from './pages/SolutionOverview';
import QCDefectTraceability from './pages/QCDefectTraceability';
import ReceptionRecordsMac from './pages/ReceptionRecordsMac';
import TargetTaskSettings from './pages/TargetTaskSettings';
import StoreDailyReport from './pages/StoreDailyReport';
import CustomerValueInsight from './pages/CustomerValueInsight';
import CustomerValueInsightBeta2 from './pages/CustomerValueInsightBeta2';
import NationalRanking from './pages/NationalRanking';
import CompetitorAnalysis from './pages/CompetitorAnalysis';
import ProductFocus from './pages/ProductFocus';
import CustomerFocus from './pages/CustomerFocus';
import EmployeeCapability from './pages/EmployeeCapability';
import ShowroomDataCollection from './pages/ShowroomDataCollection';
import CadillacTestDriveReport from './pages/CadillacTestDriveReport';
import YanbaoWuyouReport from './pages/YanbaoWuyouReport';
import YanbaoWuyouEmployeeDetail from './pages/YanbaoWuyouEmployeeDetail';
import InternalTrainerReport from './pages/InternalTrainerReport';
import TrainingTaskManagement from './pages/TrainingTaskManagement';
import TrainingInspectionBoard from './pages/TrainingInspectionBoard';
import TrainingDrillRecordManagement from './pages/TrainingDrillRecordManagement';
import CadillacTrainingRecordView from './pages/CadillacTrainingRecordView';
import UserPrivacySettings from './pages/UserPrivacySettings';

const App: React.FC = () => {
  // Theme management
  const [darkMode, setDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('theme') === 'dark' || 
        (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches);
    }
    return false;
  });

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode]);

  const toggleDarkMode = () => setDarkMode(!darkMode);

  return (
    <HashRouter>
      <Layout darkMode={darkMode} toggleDarkMode={toggleDarkMode}>
        <Routes>
          {/* Default Route -> Training Task Management */}
          <Route path="/" element={<Navigate to="/training-task-management" replace />} />
          
          <Route path="/solution-overview" element={<SolutionOverview />} />
          <Route path="/qc-defect-traceability" element={<QCDefectTraceability />} />
          <Route path="/reception-records-mac" element={<ReceptionRecordsMac />} />
          <Route path="/customer-value-insight" element={<CustomerValueInsight />} />
          <Route path="/customer-value-insight-beta2" element={<CustomerValueInsightBeta2 />} />
          <Route path="/target-task-settings" element={<TargetTaskSettings />} />
          <Route path="/store-daily-report" element={<StoreDailyReport />} />
          <Route path="/national-ranking" element={<NationalRanking />} />
          <Route path="/showroom-data-collection" element={<ShowroomDataCollection />} />
          <Route path="/product-focus" element={<ProductFocus />} />
          <Route path="/competitor-analysis" element={<CompetitorAnalysis />} />
          <Route path="/customer-focus" element={<CustomerFocus />} />
          <Route path="/employee-capability" element={<EmployeeCapability />} />
          <Route path="/cadillac-test-drive-report" element={<CadillacTestDriveReport />} />
          <Route path="/yanbao-wuyou-store" element={<YanbaoWuyouReport />} />
          <Route path="/yanbao-wuyou-employee-detail" element={<YanbaoWuyouEmployeeDetail />} />
          <Route path="/internal-trainer-report" element={<InternalTrainerReport />} />
          <Route path="/training-task-management" element={<TrainingTaskManagement />} />
          <Route path="/training-inspection-board" element={<TrainingInspectionBoard />} />
          <Route path="/training-drill-records" element={<TrainingDrillRecordManagement />} />
          <Route path="/cadillac-training-records-hq" element={<CadillacTrainingRecordView />} />
          <Route path="/user-privacy-settings" element={<UserPrivacySettings />} />

          {/* 监控中心 */}
          <Route path="/business-monitor" element={<BusinessMonitorScreen />} />
          <Route path="/badge-monitor" element={<BadgePanoramicMonitor />} />
          <Route path="/data-screen" element={<DataScreen />} />
          
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/real-time-alerts" element={<RealTimeAlerts />} />
          <Route path="/voc-analysis" element={<VOCAnalysis />} />
          <Route path="/customer-insights" element={<CustomerInsights />} />
          <Route path="/quality-monitor" element={<QualityMonitor />} />
          <Route path="/sales-resistance" element={<SalesResistance />} />
          <Route path="/device-dashboard" element={<DeviceDashboard />} />
          
          {/* AI 运营平台 */}
          <Route path="/sandbox-test" element={<SandboxTest />} />
          <Route path="/online-annotation" element={<OnlineAnnotation />} />

          {/* 员工管理 */}
          <Route path="/management-daily" element={<ManagementDaily />} />
          <Route path="/ai-quality" element={<AIQuality />} />
          <Route path="/employee-profiles" element={<EmployeeProfiles />} />
          
          {/* 线索中心 */}
          <Route path="/customer-management" element={<CustomerManagement />} />
          <Route path="/lead-library" element={<LeadLibrary />} />
          <Route path="/market-intelligence-v2" element={<MarketIntelligenceV2 />} />

          {/* 知识与培训 */}
          <Route path="/script-library" element={<ScriptLibrary />} />
          <Route path="/training-courses" element={<TrainingCourseManagement />} />
          <Route path="/quality-rules" element={<QualityRulesSettings />} />
          
          {/* Fallback */}
          <Route path="*" element={<Navigate to="/training-task-management" replace />} />
        </Routes>
      </Layout>
    </HashRouter>
  );
};

export default App;