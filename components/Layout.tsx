
import React, { useState, createContext, useContext } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { 
  Bell, 
  Search, 
  Menu, 
  User, 
  ChevronDown, 
  ChevronRight, 
  ChevronLeft,
  LogOut,
  Moon,
  Sun,
  Shield,
  PanelLeftClose,
  PanelLeftOpen
} from 'lucide-react';
import { MENU_STRUCTURE, MOCK_NOTIFICATIONS } from '../constants';

interface LayoutProps {
  children: React.ReactNode;
  darkMode: boolean;
  toggleDarkMode: () => void;
}

// Create Context for Layout controls (like Full Screen)
interface LayoutContextType {
  isFullScreen: boolean;
  toggleFullScreen: () => void;
}

const LayoutContext = createContext<LayoutContextType>({
  isFullScreen: false,
  toggleFullScreen: () => {},
});

export const useLayout = () => useContext(LayoutContext);

const Layout: React.FC<LayoutProps> = ({ children, darkMode, toggleDarkMode }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [expandedMenus, setExpandedMenus] = useState<string[]>(['解决方案概览']);
  const [showNotifications, setShowNotifications] = useState(false);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  const toggleMenu = (title: string) => {
    setExpandedMenus(prev => 
      prev.includes(title) ? prev.filter(t => t !== title) : [...prev, title]
    );
  };

  const toggleFullScreen = () => {
    setIsFullScreen(prev => !prev);
  };

  const unreadCount = MOCK_NOTIFICATIONS.filter(n => !n.read).length;

  return (
    <LayoutContext.Provider value={{ isFullScreen, toggleFullScreen }}>
      <div className={`min-h-screen flex flex-col ${darkMode ? 'dark' : ''}`}>
        {/* Top Header - Hidden in Full Screen */}
        {!isFullScreen && (
          <header className="h-16 bg-white dark:bg-slate-800 border-b border-gray-200 dark:border-slate-700 flex items-center justify-between px-6 sticky top-0 z-50 shadow-sm transition-colors duration-200">
            <div className="flex items-center gap-3">
              <div className="bg-primary-600 p-2 rounded-lg">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary-600 to-primary-500 dark:from-primary-400 dark:to-primary-300">
                会话智能解决方案
              </h1>
            </div>

            <div className="flex items-center gap-6">
              {/* Theme Toggle */}
              <button 
                onClick={toggleDarkMode}
                className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-slate-700 text-gray-600 dark:text-gray-300 transition-colors"
              >
                {darkMode ? <Sun size={20} /> : <Moon size={20} />}
              </button>

              {/* Notifications */}
              <div className="relative">
                <button 
                  onClick={() => setShowNotifications(!showNotifications)}
                  className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-slate-700 text-gray-600 dark:text-gray-300 transition-colors relative"
                >
                  <Bell size={20} />
                  {unreadCount > 0 && (
                    <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-red-500 rounded-full ring-2 ring-white dark:ring-slate-800"></span>
                  )}
                </button>
                
                {showNotifications && (
                  <div className="absolute right-0 mt-2 w-80 bg-white dark:bg-slate-800 rounded-xl shadow-lg border border-gray-200 dark:border-slate-700 overflow-hidden z-50">
                    <div className="p-3 border-b border-gray-100 dark:border-slate-700 flex justify-between items-center">
                      <h3 className="font-semibold text-sm">消息中心</h3>
                      <span className="text-xs text-primary-500 cursor-pointer">全部已读</span>
                    </div>
                    <div className="max-h-64 overflow-y-auto">
                      {MOCK_NOTIFICATIONS.map(notif => (
                        <div key={notif.id} className="p-3 hover:bg-gray-50 dark:hover:bg-slate-700/50 border-b border-gray-50 dark:border-slate-700/50 last:border-0 cursor-pointer">
                          <div className="flex justify-between items-start mb-1">
                            <span className={`text-xs font-medium px-1.5 py-0.5 rounded ${notif.type === 'alert' ? 'bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-300' : 'bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-300'}`}>
                              {notif.type === 'alert' ? '告警' : '线索'}
                            </span>
                            <span className="text-xs text-gray-400">{notif.time}</span>
                          </div>
                          <p className="text-sm text-gray-700 dark:text-gray-300 line-clamp-2">{notif.message}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* User Profile */}
              <div className="flex items-center gap-3 pl-6 border-l border-gray-200 dark:border-slate-700">
                <div className="text-right hidden md:block">
                  <p className="text-sm font-medium text-gray-900 dark:text-white">Admin User</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">旗舰店店长</p>
                </div>
                <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-primary-500 to-indigo-500 flex items-center justify-center text-white font-bold shadow-md cursor-pointer">
                  A
                </div>
              </div>
            </div>
          </header>
        )}

        <div className="flex flex-1 overflow-hidden">
          {/* Sidebar - Hidden in Full Screen */}
          {!isFullScreen && (
            <aside className={`${isSidebarCollapsed ? 'w-20' : 'w-64'} bg-white dark:bg-slate-800 border-r border-gray-200 dark:border-slate-700 flex flex-col transition-all duration-300 overflow-y-auto relative`}>
              {/* Collapse Toggle Button */}
              <button 
                onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
                className="absolute -right-3 top-20 bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-full p-1 shadow-md z-50 text-gray-400 hover:text-primary-600 transition-all"
              >
                {isSidebarCollapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
              </button>

              <div className="p-4">
                {isSidebarCollapsed ? (
                  <div className="flex justify-center">
                    <button className="p-2 bg-gray-100 dark:bg-slate-700 rounded-lg text-gray-400">
                      <Search size={18} />
                    </button>
                  </div>
                ) : (
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <input 
                      type="text" 
                      placeholder="搜索功能..." 
                      className="w-full bg-gray-100 dark:bg-slate-700 text-sm rounded-lg pl-9 pr-3 py-2 outline-none focus:ring-2 focus:ring-primary-500 transition-all dark:text-white"
                    />
                  </div>
                )}
              </div>

              <nav className={`flex-1 ${isSidebarCollapsed ? 'px-2' : 'px-3'} py-2 space-y-1`}>
                {MENU_STRUCTURE.map((item) => {
                  const Icon = item.icon!;
                  const isExpanded = expandedMenus.includes(item.title);
                  const isActiveParent = item.children?.some(child => child.path === location.pathname);

                  return (
                    <div key={item.title} className="mb-2">
                      <button
                        onClick={() => !isSidebarCollapsed && toggleMenu(item.title)}
                        className={`w-full flex items-center ${isSidebarCollapsed ? 'justify-center' : 'justify-between'} px-3 py-2.5 rounded-lg transition-colors group relative ${
                          isActiveParent 
                            ? 'text-primary-600 dark:text-primary-400 bg-primary-50 dark:bg-primary-900/20' 
                            : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-700'
                        }`}
                        title={isSidebarCollapsed ? item.title : ''}
                      >
                        <div className="flex items-center gap-3">
                          <Icon size={18} />
                          {!isSidebarCollapsed && <span className="font-medium text-sm">{item.title}</span>}
                        </div>
                        {!isSidebarCollapsed && (isExpanded ? <ChevronDown size={14} /> : <ChevronRight size={14} />)}
                        
                        {/* Tooltip for collapsed state */}
                        {isSidebarCollapsed && (
                          <div className="absolute left-full ml-2 px-2 py-1 bg-slate-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap z-[60]">
                            {item.title}
                          </div>
                        )}
                      </button>

                      {!isSidebarCollapsed && isExpanded && item.children && (
                        <div className="mt-1 ml-4 space-y-0.5 border-l border-gray-200 dark:border-slate-700 pl-3">
                          {item.children.map((child) => {
                            const isActive = location.pathname === child.path;
                            return (
                              <Link
                                key={child.path}
                                to={child.path}
                                className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm transition-all ${
                                  isActive
                                    ? 'text-primary-600 dark:text-primary-400 font-medium bg-white dark:bg-slate-800 shadow-sm border border-gray-100 dark:border-slate-700'
                                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 hover:translate-x-1'
                                }`}
                              >
                                <span className={`w-1.5 h-1.5 rounded-full ${isActive ? 'bg-primary-500' : 'bg-gray-300 dark:bg-slate-600'}`}></span>
                                {child.title}
                              </Link>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  );
                })}
              </nav>

              <div className={`p-4 border-t border-gray-200 dark:border-slate-700 ${isSidebarCollapsed ? 'flex justify-center' : ''}`}>
                 <button className={`flex items-center ${isSidebarCollapsed ? 'justify-center' : 'gap-2'} text-sm text-gray-500 hover:text-red-500 transition-colors w-full px-3 py-2 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/10 group relative`}>
                   <LogOut size={16} />
                   {!isSidebarCollapsed && <span>退出登录</span>}
                   {isSidebarCollapsed && (
                      <div className="absolute left-full ml-2 px-2 py-1 bg-slate-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap z-[60]">
                        退出登录
                      </div>
                   )}
                 </button>
              </div>
            </aside>
          )}

          {/* Main Content */}
          <main className={`flex-1 overflow-y-auto bg-gray-50 dark:bg-slate-900 ${isFullScreen ? 'p-0' : 'p-6'} transition-all duration-200`}>
             {children}
          </main>
        </div>
      </div>
    </LayoutContext.Provider>
  );
};

export default Layout;
