
import React, { useEffect, useRef, useState, useMemo } from 'react';
import { 
  Maximize2, Minimize2, Map as MapIcon, ArrowLeft, 
  TrendingUp, Users, DollarSign, Activity, 
  MapPin, Store, Car, CheckCircle, ChevronRight, X, AlertCircle, ExternalLink, Home
} from 'lucide-react';
import { 
  BarChart, Bar, XAxis, YAxis, Tooltip as RechartsTooltip, ResponsiveContainer, Cell, CartesianGrid, AreaChart, Area
} from 'recharts';
import { useLayout } from '../components/Layout';

declare global {
  interface Window {
    google: any;
    gm_authFailure?: () => void;
    initMapCallback?: () => void;
  }
}

// --- Configuration ---
const GOOGLE_MAPS_API_KEY = process.env.REACT_APP_GOOGLE_MAPS_API_KEY || 'AIzaSyA9aaRDoveRxV597_F7z8_JjDjbGGltLFs'; 

// --- Dark Map Style ---
const MAP_STYLE = [
  { elementType: "geometry", stylers: [{ color: "#1e293b" }] },
  { elementType: "labels.text.stroke", stylers: [{ visibility: "off" }] },
  { elementType: "labels.text.fill", stylers: [{ color: "#94a3b8" }] },
  { featureType: "administrative", elementType: "geometry", stylers: [{ visibility: "off" }] },
  { featureType: "administrative.country", elementType: "geometry.stroke", stylers: [{ color: "#475569", visibility: "on" }] },
  { featureType: "administrative.province", elementType: "geometry.stroke", stylers: [{ color: "#334155", visibility: "on" }] },
  { featureType: "poi", stylers: [{ visibility: "off" }] },
  { featureType: "road", stylers: [{ visibility: "off" }] },
  { featureType: "transit", stylers: [{ visibility: "off" }] },
  { featureType: "water", elementType: "geometry", stylers: [{ color: "#0f172a" }] },
];

// --- Types ---
type ViewLevel = 'COUNTRY' | 'PROVINCE' | 'CITY';

interface BreadcrumbItem {
  level: ViewLevel;
  name: string;
  coord?: { lat: number; lng: number };
  zoom?: number;
}

interface TooltipData {
  title: string;
  traffic: number;
  testDrives: number;
  deals: number;
  amount: string;
  type?: 'region' | 'dealer';
}

// --- Mock Data Generators ---

const generateTooltipMetrics = (name: string, isDealer = false): TooltipData => {
  const seed = name.length; 
  const base = 100 + seed * 10;
  
  // Scale down metrics for individual dealers
  const scale = isDealer ? 0.05 : 1;

  const traffic = Math.floor((base * 10 + Math.random() * 50) * scale);
  const testDrives = Math.floor(traffic * 0.35);
  const deals = Math.floor(testDrives * 0.25);
  const amount = (deals * 25.5).toFixed(1) + '万';

  return { 
    title: name, 
    traffic, 
    testDrives, 
    deals, 
    amount,
    type: isDealer ? 'dealer' : 'region'
  };
};

const generateMetrics = (level: ViewLevel, name: string) => {
  const multiplier = level === 'COUNTRY' ? 1 : level === 'PROVINCE' ? 0.1 : 0.02;
  return [
    { label: '今日总客流', value: Math.floor(45280 * multiplier).toLocaleString(), unit: '人', icon: Users, color: 'text-blue-400', bg: 'bg-blue-500/10 border-blue-500/20' },
    { label: '试乘试驾数', value: Math.floor(3845 * multiplier).toLocaleString(), unit: '次', icon: Car, color: 'text-purple-400', bg: 'bg-purple-500/10 border-purple-500/20' },
    { label: '成交车辆数', value: Math.floor(1205 * multiplier).toLocaleString(), unit: '台', icon: CheckCircle, color: 'text-emerald-400', bg: 'bg-emerald-500/10 border-emerald-500/20' },
    { label: '成交总金额', value: (3.2 * multiplier).toFixed(2), unit: '亿元', icon: DollarSign, color: 'text-yellow-400', bg: 'bg-yellow-500/10 border-yellow-500/20' },
  ];
};

const generateRankings = (level: ViewLevel) => {
  if (level === 'COUNTRY') {
    return [
      { name: '广东省', amount: '¥ 4,500w', progress: 95 },
      { name: '江苏省', amount: '¥ 4,200w', progress: 88 },
      { name: '浙江省', amount: '¥ 3,900w', progress: 82 },
      { name: '山东省', amount: '¥ 3,500w', progress: 75 },
      { name: '四川省', amount: '¥ 3,100w', progress: 68 },
    ];
  } else if (level === 'PROVINCE') {
    return [
      { name: '市辖区A', amount: '¥ 1,200w', progress: 92 },
      { name: '市辖区B', amount: '¥ 980w', progress: 85 },
      { name: '市辖区C', amount: '¥ 850w', progress: 78 },
      { name: '市辖区D', amount: '¥ 720w', progress: 65 },
      { name: '市辖区E', amount: '¥ 600w', progress: 55 },
    ];
  } else {
    return [
      { name: 'XX路4S店', amount: '¥ 350w', progress: 98 },
      { name: 'XX旗舰店', amount: '¥ 320w', progress: 90 },
      { name: 'XX体验中心', amount: '¥ 280w', progress: 82 },
      { name: 'XX商超店', amount: '¥ 150w', progress: 60 },
      { name: 'XX展厅', amount: '¥ 120w', progress: 45 },
    ];
  }
};

const generateModels = () => [
  { name: 'Model Y', count: Math.floor(Math.random() * 200) + 100, color: '#3b82f6' },
  { name: 'Model 3', count: Math.floor(Math.random() * 150) + 80, color: '#6366f1' },
  { name: 'CT5', count: Math.floor(Math.random() * 100) + 50, color: '#8b5cf6' },
  { name: 'ET5', count: Math.floor(Math.random() * 80) + 40, color: '#ec4899' },
  { name: 'X5', count: Math.floor(Math.random() * 60) + 30, color: '#f43f5e' },
];

const generateTrend = () => Array.from({ length: 14 }).map((_, i) => ({
  date: `10-${13 + i}`,
  deals: Math.floor(Math.random() * 100) + 50,
  growth: Math.floor(Math.random() * 20) - 5
}));

// Mock Cities Coordinates (Simplified for demo)
const PROVINCE_CITIES: Record<string, { name: string, lat: number, lng: number }[]> = {
  'Guangdong': [
    { name: '广州', lat: 23.1291, lng: 113.2644 },
    { name: '深圳', lat: 22.5431, lng: 114.0579 },
    { name: '佛山', lat: 23.0215, lng: 113.1214 },
    { name: '东莞', lat: 23.0208, lng: 113.7518 },
  ],
  'Zhejiang': [
    { name: '杭州', lat: 30.2741, lng: 120.1551 },
    { name: '宁波', lat: 29.8683, lng: 121.5440 },
    { name: '温州', lat: 27.9943, lng: 120.6994 },
  ],
  // Fallback for others
  'default': [
    { name: '市中心区域', lat: 0, lng: 0 }, // Will use offset from center
    { name: '北部新区', lat: 0.5, lng: 0 },
    { name: '高新园区', lat: -0.3, lng: 0.4 },
  ]
};

const generateDealers = (cityLat: number, cityLng: number) => {
  return Array.from({ length: 5 + Math.floor(Math.random() * 5) }).map((_, i) => ({
    id: i,
    name: `XX品牌授权经销商 ${i + 1}店`,
    lat: cityLat + (Math.random() - 0.5) * 0.1,
    lng: cityLng + (Math.random() - 0.5) * 0.1,
    traffic: Math.floor(Math.random() * 500),
    deals: Math.floor(Math.random() * 50)
  }));
};

// --- Components ---

const MetricCard: React.FC<{ item: any }> = ({ item }) => (
  <div className={`flex items-center gap-4 px-6 py-4 rounded-xl border backdrop-blur-md transition-all hover:scale-105 ${item.bg}`}>
    <div className={`p-3 rounded-lg bg-slate-900/50 ${item.color}`}>
      <item.icon size={24} />
    </div>
    <div>
      <p className="text-slate-400 text-xs font-medium mb-1">{item.label}</p>
      <div className="flex items-baseline gap-1">
        <span className={`text-2xl font-mono font-bold ${item.color} drop-shadow-md`}>{item.value}</span>
        <span className="text-xs text-slate-500">{item.unit}</span>
      </div>
    </div>
  </div>
);

const CustomMapTooltip = ({ info }: { info: { x: number, y: number, data: TooltipData } }) => (
  <div 
    className="fixed z-50 pointer-events-none flex flex-col gap-2 p-4 bg-white/95 backdrop-blur border border-gray-200 rounded-xl shadow-xl animate-fade-in min-w-[220px]"
    style={{ left: info.x + 20, top: info.y - 20 }}
  >
    <div className="flex items-center justify-between border-b border-gray-100 pb-2 mb-1">
      <h4 className="text-base font-bold text-gray-900">{info.data.title}</h4>
      <span className={`text-xs px-1.5 py-0.5 rounded border ${info.data.type === 'dealer' ? 'bg-purple-50 text-purple-600 border-purple-100' : 'bg-blue-50 text-blue-600 border-blue-100'}`}>
        {info.data.type === 'dealer' ? '经销商' : '区域数据'}
      </span>
    </div>
    
    <div className="grid grid-cols-2 gap-x-4 gap-y-3">
      <div>
        <p className="text-xs text-gray-500 mb-0.5">今日客流</p>
        <p className="text-sm font-bold text-gray-800 flex items-center gap-1">
          <Users size={12} className="text-blue-500" /> {info.data.traffic}
        </p>
      </div>
      <div>
        <p className="text-xs text-gray-500 mb-0.5">试乘试驾</p>
        <p className="text-sm font-bold text-gray-800 flex items-center gap-1">
          <Car size={12} className="text-purple-500" /> {info.data.testDrives}
        </p>
      </div>
      <div>
        <p className="text-xs text-gray-500 mb-0.5">成交车辆</p>
        <p className="text-sm font-bold text-gray-800 flex items-center gap-1">
          <CheckCircle size={12} className="text-emerald-500" /> {info.data.deals}
        </p>
      </div>
      <div>
        <p className="text-xs text-gray-500 mb-0.5">成交金额</p>
        <p className="text-sm font-bold text-amber-600 flex items-center gap-1">
          <DollarSign size={12} /> {info.data.amount}
        </p>
      </div>
    </div>
  </div>
);

const BusinessMonitorScreen: React.FC = () => {
  const mapRef = useRef<HTMLDivElement>(null);
  const googleMapRef = useRef<any>(null);
  const { isFullScreen, toggleFullScreen } = useLayout();
  
  const [mapLoaded, setMapLoaded] = useState(false);
  const [apiKeyError, setApiKeyError] = useState(false);
  
  const [breadcrumbs, setBreadcrumbs] = useState<BreadcrumbItem[]>([
    { level: 'COUNTRY', name: '全国', coord: { lat: 35.8617, lng: 104.1954 }, zoom: 4 }
  ]);
  
  const currentView = breadcrumbs[breadcrumbs.length - 1];

  const dashboardData = useMemo(() => ({
    metrics: generateMetrics(currentView.level, currentView.name),
    rankings: generateRankings(currentView.level),
    models: generateModels(),
    trend: generateTrend()
  }), [currentView]);

  const [hoveredInfo, setHoveredInfo] = useState<{ x: number, y: number, data: TooltipData } | null>(null);
  const markersRef = useRef<any[]>([]);

  // 1. Load Map API
  useEffect(() => {
    window.gm_authFailure = () => {
      console.error("Google Maps Auth Failure");
      setApiKeyError(true);
    };

    if (window.google?.maps?.Map) {
      setMapLoaded(true);
      return;
    }

    if (!GOOGLE_MAPS_API_KEY) {
      setApiKeyError(true);
      return;
    }

    window.initMapCallback = () => setMapLoaded(true);

    if (!document.querySelector(`script[src*="maps.googleapis.com"]`)) {
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAPS_API_KEY}&callback=initMapCallback`;
      script.async = true;
      script.defer = true;
      document.body.appendChild(script);
    }
  }, []);

  // 2. Initialize Map
  useEffect(() => {
    if (mapLoaded && mapRef.current && !googleMapRef.current && !apiKeyError) {
      const map = new window.google.maps.Map(mapRef.current, {
        center: breadcrumbs[0].coord,
        zoom: breadcrumbs[0].zoom,
        minZoom: 3,
        maxZoom: 15,
        styles: MAP_STYLE,
        disableDefaultUI: true,
        backgroundColor: '#f8fafc',
      });
      googleMapRef.current = map;

      // --- Data Layer Styling & Interactions ---
      
      // Default Style for Polygons
      map.data.setStyle({
        fillColor: '#3b82f6',
        fillOpacity: 0.1,
        strokeColor: '#64748b',
        strokeWeight: 1,
      });

      // Hover Effect
      map.data.addListener('mouseover', (e: any) => {
        const name = e.feature.getProperty('name');
        
        map.data.revertStyle();
        map.data.overrideStyle(e.feature, {
          fillColor: '#3b82f6',
          fillOpacity: 0.3,
          strokeColor: '#2563eb',
          strokeWeight: 2,
          zIndex: 100
        });

        if (e.domEvent) {
           setHoveredInfo({
             x: e.domEvent.clientX,
             y: e.domEvent.clientY,
             data: generateTooltipMetrics(name)
           });
        }
      });

      // Mouse Out
      map.data.addListener('mouseout', () => {
        map.data.revertStyle();
        setHoveredInfo(null);
      });

      // Mouse Move (for tooltip following)
      map.data.addListener('mousemove', (e: any) => {
         if (e.domEvent) {
            setHoveredInfo(prev => prev ? {
               ...prev,
               x: e.domEvent.clientX,
               y: e.domEvent.clientY
            } : null);
         }
      });

      // Click to Drill Down
      map.data.addListener('click', (e: any) => {
        const name = e.feature.getProperty('name');
        
        if (currentView.level === 'COUNTRY') {
           // Country -> Province
           // Calculate approximate center (simplified for geojson polygons)
           const bounds = new window.google.maps.LatLngBounds();
           e.feature.getGeometry().forEachLatLng((latlng: any) => bounds.extend(latlng));
           const center = bounds.getCenter();

           navigateTo({ level: 'PROVINCE', name, coord: { lat: center.lat(), lng: center.lng() }, zoom: 7 });
        } else if (currentView.level === 'PROVINCE') {
           // Province -> City
           const bounds = new window.google.maps.LatLngBounds();
           e.feature.getGeometry().forEachLatLng((latlng: any) => bounds.extend(latlng));
           const center = bounds.getCenter();

           navigateTo({ level: 'CITY', name, coord: { lat: center.lat(), lng: center.lng() }, zoom: 11 });
        }
      });
    }
  }, [mapLoaded, apiKeyError]);

  // 3. Handle View Changes & GeoJSON Loading
  useEffect(() => {
    if (!googleMapRef.current) return;
    const map = googleMapRef.current;

    // Reset markers and data layer
    markersRef.current.forEach(m => m.setMap(null));
    markersRef.current = [];
    map.data.forEach((feature: any) => map.data.remove(feature));

    // Update view
    map.setCenter(currentView.coord);
    map.setZoom(currentView.zoom);

    const loadData = async () => {
      if (currentView.level === 'COUNTRY') {
        // Load China Map (100000)
        try {
            // Using a reliable GeoJSON source for China (simplified for demo)
            // In prod, host this locally or use a paid service
            map.data.loadGeoJson('https://geo.datav.aliyun.com/areas_v3/bound/100000_full.json');
        } catch (e) {
            console.error("Failed to load country map", e);
        }
      } 
      else if (currentView.level === 'PROVINCE') {
        // Load Province Map (Cities inside)
        // Note: For demo, we might need adcodes. Assuming mock logic or using country geojson as placeholder if specific province geojson not available.
        // Real implementation requires adcode mapping.
        // Here we simulate drilling by loading random city markers or re-loading country map as placeholder if needed.
        // For better demo, let's just stick to country map for now or use markers.
      }
      else if (currentView.level === 'CITY') {
        // City View: Show Dealer Markers (dots)
        const dealers = generateDealers(currentView.coord?.lat || 0, currentView.coord?.lng || 0);
        
        dealers.forEach(dealer => {
           const marker = new window.google.maps.Marker({
              position: { lat: dealer.lat, lng: dealer.lng },
              map,
              title: dealer.name,
              icon: {
                 path: window.google.maps.SymbolPath.CIRCLE,
                 fillColor: "#3b82f6",
                 fillOpacity: 1,
                 strokeWeight: 2,
                 strokeColor: "#ffffff",
                 scale: 6, // Radius of the dot
              },
              animation: window.google.maps.Animation.DROP
           });

           // Marker Events
           marker.addListener('mouseover', (e: any) => {
              setHoveredInfo({
                 x: e.domEvent.clientX,
                 y: e.domEvent.clientY,
                 data: generateTooltipMetrics(dealer.name, true)
              });
           });
           
           marker.addListener('mouseout', () => setHoveredInfo(null));
           
           // Click Dealer (Simulate showing details or drilling deeper)
           marker.addListener('click', (e: any) => {
               map.setCenter(marker.getPosition());
               map.setZoom(14);
           });

           markersRef.current.push(marker);
       });
      }
    };

    loadData();

  }, [currentView]); // Re-run when view changes

  const navigateTo = (item: BreadcrumbItem) => {
    setBreadcrumbs(prev => {
       const existingIdx = prev.findIndex(b => b.name === item.name);
       if (existingIdx >= 0) return prev.slice(0, existingIdx + 1);
       return [...prev, item];
    });
  };

  return (
    <div className={`relative bg-gray-50 text-gray-900 overflow-hidden font-sans flex flex-col ${isFullScreen ? 'h-screen' : 'min-h-[calc(100vh-2rem)] rounded-xl'}`}>
      
      {/* Header */}
      <header className="relative z-20 px-6 py-4 flex justify-between items-center bg-white border-b border-gray-200 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-blue-600 flex items-center justify-center shadow-md shadow-blue-200">
            <MapIcon className="text-white" size={20} />
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-wide text-gray-900">
              全国业务监控大屏
            </h1>
            <p className="text-xs text-gray-500 uppercase">National Business Monitor</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center bg-gray-100 rounded-lg p-1 text-sm">
             <button className="px-3 py-1.5 bg-white shadow-sm rounded-md text-gray-800 font-medium">今日</button>
             <button className="px-3 py-1.5 text-gray-500 hover:text-gray-700">本周</button>
             <button className="px-3 py-1.5 text-gray-500 hover:text-gray-700">本月</button>
          </div>
          <button 
            onClick={toggleFullScreen}
            className="p-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors text-gray-600 border border-gray-200"
          >
            {isFullScreen ? <Minimize2 size={18} /> : <Maximize2 size={18} />}
          </button>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 relative flex flex-col p-6 gap-6 overflow-hidden z-10">
        
        {/* Top Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 animate-fade-in-down">
           {dashboardData.metrics.map((item, idx) => (
             <MetricCard key={idx} item={item} />
           ))}
        </div>

        <div className="flex-1 flex gap-6 min-h-0">
           
           {/* Map Area */}
           <div className="flex-1 relative rounded-2xl overflow-hidden border border-gray-200 bg-white shadow-sm group flex flex-col">
              
              {/* Map Breadcrumb Bar */}
              <div className="absolute top-4 left-4 z-10 px-3 py-2 bg-white/90 backdrop-blur rounded-lg border border-gray-200 flex items-center shadow-md">
                 {breadcrumbs.map((crumb, idx) => (
                    <div key={crumb.name} className="flex items-center">
                       {idx > 0 && <ChevronRight size={14} className="text-gray-400 mx-1" />}
                       <button 
                          onClick={() => navigateTo(crumb)}
                          className={`text-xs px-2 py-1 rounded transition-colors flex items-center ${idx === breadcrumbs.length - 1 ? 'text-blue-700 font-bold bg-blue-50' : 'text-gray-600 hover:text-blue-600'}`}
                       >
                          {crumb.level === 'COUNTRY' ? <Home size={12} className="inline mr-1 mb-0.5"/> : null}
                          {crumb.name}
                       </button>
                    </div>
                 ))}
              </div>

              {/* Google Map Container */}
              {apiKeyError ? (
                <div className="w-full h-full flex flex-col items-center justify-center text-gray-500 bg-gray-50 z-20">
                   <AlertCircle size={48} className="mb-4 text-red-400 opacity-80" />
                   <h3 className="text-lg font-bold text-gray-800 mb-2">Map Unavailable</h3>
                   <p className="max-w-md text-center text-sm mb-4 leading-relaxed">
                     Please enable <strong className="text-gray-900">Maps JavaScript API</strong> in Google Cloud Console.
                   </p>
                </div>
              ) : (
                <div ref={mapRef} className="w-full h-full" />
              )}

              {/* Custom Tooltip Overlay */}
              {hoveredInfo && <CustomMapTooltip info={hoveredInfo} />}
           </div>

           {/* Right Sidebar - Report Style */}
           <div className="w-80 flex flex-col gap-4 animate-fade-in-right">
              
              {/* Rankings */}
              <div className="flex-1 bg-white border border-gray-200 rounded-2xl p-5 shadow-sm flex flex-col">
                 <h3 className="text-sm font-bold text-gray-800 mb-4 flex items-center gap-2">
                    <TrendingUp size={16} className="text-blue-600" /> 
                    {currentView.level === 'CITY' ? '经销商排行' : '区域业绩排行'}
                 </h3>
                 <div className="flex-1 space-y-3 overflow-y-auto pr-1 custom-scrollbar">
                    {dashboardData.rankings.map((p, i) => (
                       <div key={i} className="space-y-1.5">
                          <div className="flex justify-between text-xs">
                             <span className="text-gray-600 flex items-center gap-2">
                                <span className={`w-4 h-4 rounded flex items-center justify-center text-[10px] font-bold ${i < 3 ? 'bg-amber-100 text-amber-700' : 'bg-gray-100 text-gray-500'}`}>{i + 1}</span>
                                <span className="truncate max-w-[120px] font-medium" title={p.name}>{p.name}</span>
                             </span>
                             <span className="text-gray-900 font-mono font-medium">{p.amount}</span>
                          </div>
                          <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
                             <div className="h-full bg-blue-500 rounded-full" style={{ width: `${p.progress}%` }}></div>
                          </div>
                       </div>
                    ))}
                 </div>
              </div>

              {/* Models */}
              <div className="h-1/3 bg-white border border-gray-200 rounded-2xl p-5 shadow-sm flex flex-col">
                 <h3 className="text-sm font-bold text-gray-800 mb-3 flex items-center gap-2">
                    <Car size={16} className="text-purple-600" /> 
                    {currentView.name} 热销车型
                 </h3>
                 <div className="flex-1 flex flex-col justify-center gap-3">
                    {dashboardData.models.map((m, i) => (
                       <div key={i} className="flex items-center justify-between text-xs group cursor-pointer">
                          <span className="text-gray-600 w-16">{m.name}</span>
                          <div className="flex items-center gap-2 flex-1 mx-2">
                             <div className="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                                <div className="h-full rounded-full" style={{ width: `${(m.count / 300) * 100}%`, backgroundColor: m.color }}></div>
                             </div>
                          </div>
                          <span className="text-gray-500 font-mono w-8 text-right">{m.count}</span>
                       </div>
                    ))}
                 </div>
              </div>

              {/* Trend Chart */}
              <div className="h-1/3 bg-white border border-gray-200 rounded-2xl p-5 shadow-sm flex flex-col">
                 <h3 className="text-sm font-bold text-gray-800 mb-2 flex items-center gap-2">
                    <Activity size={16} className="text-cyan-600" /> 14日销售趋势
                 </h3>
                 <div className="flex-1 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                       <AreaChart data={dashboardData.trend}>
                          <defs>
                            <linearGradient id="colorDeals" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.2}/>
                              <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                            </linearGradient>
                          </defs>
                          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                          <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{fill: '#9ca3af', fontSize: 10}} interval={2} />
                          <RechartsTooltip 
                             cursor={{fill: 'rgba(59, 130, 246, 0.05)'}}
                             contentStyle={{backgroundColor: '#fff', border: '1px solid #e2e8f0', borderRadius: '8px', fontSize: '10px', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'}}
                             itemStyle={{color: '#1e293b'}}
                          />
                          <Area type="monotone" dataKey="deals" stroke="#3b82f6" strokeWidth={2} fillOpacity={1} fill="url(#colorDeals)" />
                       </AreaChart>
                    </ResponsiveContainer>
                 </div>
              </div>

           </div>
        </div>
      </div>
    </div>
  );
};

export default BusinessMonitorScreen;
