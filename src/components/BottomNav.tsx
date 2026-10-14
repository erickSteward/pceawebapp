import React from 'react';
import { useApp } from '../context/AppContext';
import { 
  Home, 
  Music, 
  BookOpen, 
  Calendar, 
  TrendingUp, 
  UserCircle,
  ShieldCheck,
  GraduationCap
} from 'lucide-react';

export const BottomNav: React.FC = () => {
  const { activeTab, setActiveTab, activeRole, isDistractionFree } = useApp();

  // If in distraction-free mode (e.g. singing in church or deep Bible reading), bottom nav is hidden
  if (isDistractionFree) {
    return null;
  }

  const navItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'hymns', label: 'Hymns', icon: Music },
    { id: 'bible', label: 'Bible', icon: BookOpen },
    { id: 'activities', label: 'Activities', icon: Calendar },
    { id: 'projects', label: 'Projects', icon: TrendingUp },
    { id: 'studies', label: 'Studies', icon: GraduationCap },
    { 
      id: activeRole === 'admin' ? 'admin' : (activeRole === 'member' ? 'profile' : 'auth'), 
      label: activeRole === 'admin' ? 'Admin' : (activeRole === 'member' ? 'Profile' : 'Login'), 
      icon: activeRole === 'admin' ? ShieldCheck : UserCircle 
    }
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-stone-200/80 shadow-[0_-4px_20px_rgba(0,0,0,0.04)]">
      <div className="max-w-md md:max-w-2xl mx-auto px-2">
        <div className="grid grid-cols-7 items-center h-15">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`min-h-[46px] flex flex-col items-center justify-center py-1 transition-all ${
                  isActive ? 'text-[#0D472B]' : 'text-stone-500 hover:text-stone-800'
                }`}
                aria-label={item.label}
              >
                <div className="relative">
                  <Icon className={`w-5 h-5 transition-transform ${isActive ? 'scale-110 stroke-[2.4]' : 'stroke-[1.8]'}`} />
                  {isActive && (
                    <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-[#0D472B]" />
                  )}
                </div>
                <span className={`text-[10px] tracking-tight mt-1 leading-none ${isActive ? 'font-bold text-[#0D472B]' : 'font-medium'}`}>
                  {item.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
};
