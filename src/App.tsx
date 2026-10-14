import React, { useState } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Header } from './components/Header';
import { BottomNav } from './components/BottomNav';
import { HomeScreen } from './screens/HomeScreen';
import { HymnsScreen } from './screens/HymnsScreen';
import { BibleScreen } from './screens/BibleScreen';
import { ActivitiesScreen } from './screens/ActivitiesScreen';
import { BibleStudiesScreen } from './screens/BibleStudiesScreen';
import { ProjectsScreen } from './screens/ProjectsScreen';
import { AnnouncementsScreen } from './screens/AnnouncementsScreen';
import { ProfileScreen } from './screens/ProfileScreen';
import { AuthScreen } from './screens/AuthScreen';
import { DashboardScreen } from './screens/DashboardScreen';
import { AdminScreen } from './screens/AdminScreen';
import { Smartphone, Monitor } from 'lucide-react';

const MainAppContent: React.FC = () => {
  const { activeTab, activeRole, isDistractionFree } = useApp();
  const [devicePreviewMode, setDevicePreviewMode] = useState<'responsive' | 'mobile-frame'>('responsive');

  const renderActiveScreen = () => {
    switch (activeTab) {
      case 'home':
        return activeRole === 'member' ? <DashboardScreen /> : <HomeScreen />;
      case 'hymns':
        return <HymnsScreen />;
      case 'bible':
        return <BibleScreen />;
      case 'activities':
        return <ActivitiesScreen />;
      case 'studies':
        return <BibleStudiesScreen />;
      case 'projects':
        return <ProjectsScreen />;
      case 'announcements':
        return <AnnouncementsScreen />;
      case 'profile':
        return <ProfileScreen />;
      case 'auth':
        return <AuthScreen />;
      case 'admin':
        return <AdminScreen />;
      default:
        return <HomeScreen />;
    }
  };

  return (
    <div className={`min-h-screen bg-[#F8F9F5] flex flex-col text-stone-900 transition-colors ${
      devicePreviewMode === 'mobile-frame' ? 'py-4 sm:py-8 bg-stone-900/90 items-center justify-center' : ''
    }`}>
      {/* Device Frame Wrapper (Optional toggle for testing handheld mobile ergonomics) */}
      <div className={`w-full flex-1 flex flex-col ${
        devicePreviewMode === 'mobile-frame'
          ? 'max-w-[430px] min-h-[880px] bg-[#F8F9F5] rounded-[44px] shadow-2xl border-[10px] border-stone-800 overflow-hidden relative'
          : 'max-w-full'
      }`}>
        {/* Header - Not shown in distraction free mode */}
        {!isDistractionFree && <Header />}

        {/* Content Viewport */}
        <main className="flex-1 w-full">
          {renderActiveScreen()}
        </main>

        {/* Bottom Thumb Navigation Bar */}
        <BottomNav />
      </div>

      {/* Subtle Desktop Device Viewport Frame Switcher in Corner */}
      <div className="fixed bottom-3 right-3 z-50 hidden lg:flex items-center gap-1 p-1 bg-stone-900/80 backdrop-blur-md rounded-full shadow-lg border border-stone-700/60 text-white text-[11px]">
        <button
          onClick={() => setDevicePreviewMode('responsive')}
          className={`flex items-center gap-1 px-2.5 py-1 rounded-full transition-colors ${
            devicePreviewMode === 'responsive' ? 'bg-[#0D472B] text-white font-bold' : 'text-stone-300 hover:text-white'
          }`}
          title="Full Responsive View"
        >
          <Monitor className="w-3.5 h-3.5" />
          <span>Full Width</span>
        </button>

        <button
          onClick={() => setDevicePreviewMode('mobile-frame')}
          className={`flex items-center gap-1 px-2.5 py-1 rounded-full transition-colors ${
            devicePreviewMode === 'mobile-frame' ? 'bg-[#0D472B] text-white font-bold' : 'text-stone-300 hover:text-white'
          }`}
          title="Simulate Mobile Handset"
        >
          <Smartphone className="w-3.5 h-3.5" />
          <span>Mobile Phone</span>
        </button>
      </div>
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainAppContent />
    </AppProvider>
  );
}
