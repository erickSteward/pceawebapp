import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { PceaLogo } from './PceaLogo';
import { CONGREGATIONS } from '../data/mockData';
import { 
  Bell, 
  ChevronDown, 
  Type, 
  ShieldCheck, 
  UserCheck, 
  User, 
  X,
  Volume2,
  Check
} from 'lucide-react';

export const Header: React.FC = () => {
  const {
    currentUser,
    activeRole,
    loginAs,
    congregation,
    setCongregation,
    fontSize,
    setFontSize,
    notifications,
    markNotificationRead,
    setActiveTab
  } = useApp();

  const [showCongregationModal, setShowCongregationModal] = useState(false);
  const [showRoleModal, setShowRoleModal] = useState(false);
  const [showNotifModal, setShowNotifModal] = useState(false);
  const [showFontModal, setShowFontModal] = useState(false);

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <>
      <header className="sticky top-0 z-30 bg-[#0D472B] text-white shadow-md border-b border-[#08301D]">
        <div className="max-w-7xl mx-auto px-4 h-14 flex items-center justify-between gap-3">
          {/* Left: Logo & Congregation Switcher */}
          <div className="flex items-center gap-2 min-w-0">
            <button 
              onClick={() => setActiveTab('home')}
              className="flex items-center gap-2 hover:opacity-90 transition-opacity text-left shrink-0"
              title="Return to Home"
            >
              <PceaLogo size={32} showText={false} />
            </button>

            <button
              onClick={() => setShowCongregationModal(true)}
              className="flex items-center gap-1.5 py-1 px-2 rounded-lg bg-black/15 hover:bg-black/25 text-left text-xs font-medium text-stone-100 transition-colors truncate max-w-[190px] sm:max-w-[280px]"
              title="Switch Congregation"
            >
              <span className="truncate">{congregation}</span>
              <ChevronDown className="w-3.5 h-3.5 shrink-0 text-[#E5B83B]" />
            </button>
          </div>

          {/* Right: Font scale, Notifications, Role Switcher */}
          <div className="flex items-center gap-1.5 shrink-0">
            {/* Font Size Adjuster Button */}
            <button
              onClick={() => setShowFontModal(true)}
              className="w-9 h-9 rounded-lg flex items-center justify-center text-stone-200 hover:text-white hover:bg-white/10 transition-colors"
              title="Adjust Font Size"
              aria-label="Adjust Font Size"
            >
              <Type className="w-4 h-4" />
            </button>

            {/* Notifications */}
            <button
              onClick={() => setShowNotifModal(true)}
              className="relative w-9 h-9 rounded-lg flex items-center justify-center text-stone-200 hover:text-white hover:bg-white/10 transition-colors"
              title="Announcements & Alerts"
              aria-label="View notifications"
            >
              <Bell className="w-4 h-4" />
              {unreadCount > 0 && (
                <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#E5B83B]" />
              )}
            </button>

            {/* Role Switcher Pill */}
            <button
              onClick={() => setShowRoleModal(true)}
              className={`flex items-center gap-1.5 py-1 px-2.5 rounded-lg text-xs font-medium transition-all ${
                activeRole === 'admin'
                  ? 'bg-[#E5B83B] text-[#08301D] font-semibold'
                  : activeRole === 'member'
                  ? 'bg-white/15 text-white border border-white/20'
                  : 'bg-black/20 text-stone-300 hover:text-white'
              }`}
              title="Switch user role mode"
            >
              {activeRole === 'admin' ? (
                <ShieldCheck className="w-3.5 h-3.5" />
              ) : activeRole === 'member' ? (
                <UserCheck className="w-3.5 h-3.5" />
              ) : (
                <User className="w-3.5 h-3.5" />
              )}
              <span className="capitalize">{activeRole}</span>
              <ChevronDown className="w-3 h-3 opacity-70" />
            </button>
          </div>
        </div>
      </header>

      {/* Congregation Selection Modal */}
      {showCongregationModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full shadow-2xl overflow-hidden border border-stone-200">
            <div className="p-4 bg-[#0D472B] text-white flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-base">Select PCEA Congregation</h3>
                <p className="text-xs text-[#E5B83B]">Presbytery & Parish network</p>
              </div>
              <button 
                onClick={() => setShowCongregationModal(false)}
                className="w-8 h-8 rounded-full flex items-center justify-center text-white/80 hover:text-white hover:bg-white/10"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-2 max-h-80 overflow-y-auto divide-y divide-stone-100">
              {CONGREGATIONS.map((c) => (
                <button
                  key={c}
                  onClick={() => {
                    setCongregation(c);
                    setShowCongregationModal(false);
                  }}
                  className={`w-full text-left px-4 py-3 text-sm flex items-center justify-between hover:bg-stone-50 transition-colors ${
                    congregation === c ? 'text-[#0D472B] font-semibold bg-[#0D472B]/5' : 'text-stone-700'
                  }`}
                >
                  <span>{c}</span>
                  {congregation === c && <Check className="w-4 h-4 text-[#0D472B]" />}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Role Switcher Modal */}
      {showRoleModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-sm w-full shadow-2xl overflow-hidden border border-stone-200">
            <div className="p-4 bg-[#0D472B] text-white flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-base">Select Access Mode</h3>
                <p className="text-xs text-stone-200">Switch role for interactive preview</p>
              </div>
              <button 
                onClick={() => setShowRoleModal(false)}
                className="w-8 h-8 rounded-full flex items-center justify-center text-white/80 hover:text-white hover:bg-white/10"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-4 space-y-2.5">
              <button
                onClick={() => {
                  loginAs('guest');
                  setShowRoleModal(false);
                }}
                className={`w-full p-3 rounded-xl border text-left transition-all ${
                  activeRole === 'guest'
                    ? 'border-[#0D472B] bg-[#0D472B]/5 text-[#0D472B]'
                    : 'border-stone-200 hover:border-stone-300 text-stone-700'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="font-semibold text-sm flex items-center gap-2">
                    <User className="w-4 h-4 text-stone-500" />
                    Guest Mode
                  </div>
                  {activeRole === 'guest' && <Check className="w-4 h-4 text-[#0D472B]" />}
                </div>
                <p className="text-xs text-stone-500 mt-1">
                  Public access to Hymn books, Bible reader, and church calendar without logging in.
                </p>
              </button>

              <button
                onClick={() => {
                  loginAs('member');
                  setShowRoleModal(false);
                }}
                className={`w-full p-3 rounded-xl border text-left transition-all ${
                  activeRole === 'member'
                    ? 'border-[#0D472B] bg-[#0D472B]/5 text-[#0D472B]'
                    : 'border-stone-200 hover:border-stone-300 text-stone-700'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="font-semibold text-sm flex items-center gap-2">
                    <UserCheck className="w-4 h-4 text-[#0D472B]" />
                    Registered Church Member
                  </div>
                  {activeRole === 'member' && <Check className="w-4 h-4 text-[#0D472B]" />}
                </div>
                <p className="text-xs text-stone-500 mt-1">
                  Access member dashboard, Bible study outlines, event RSVPs, and project updates.
                </p>
              </button>

              <button
                onClick={() => {
                  loginAs('admin');
                  setShowRoleModal(false);
                }}
                className={`w-full p-3 rounded-xl border text-left transition-all ${
                  activeRole === 'admin'
                    ? 'border-[#C59B27] bg-[#E5B83B]/10 text-stone-900'
                    : 'border-stone-200 hover:border-stone-300 text-stone-700'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="font-semibold text-sm flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-[#C59B27]" />
                    Church Administrator
                  </div>
                  {activeRole === 'admin' && <Check className="w-4 h-4 text-[#C59B27]" />}
                </div>
                <p className="text-xs text-stone-500 mt-1">
                  Publish notices, manage church development projects, edit Bible studies, and view audit logs.
                </p>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Text Size Accessibility Modal */}
      {showFontModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-sm w-full p-5 shadow-2xl border border-stone-200">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="font-semibold text-stone-900 text-base">Reading Text Size</h3>
                <p className="text-xs text-stone-500">Adjust hymn & scripture readability</p>
              </div>
              <button 
                onClick={() => setShowFontModal(false)}
                className="w-8 h-8 rounded-full flex items-center justify-center text-stone-400 hover:text-stone-700 hover:bg-stone-100"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            
            <div className="grid grid-cols-4 gap-2 mb-4">
              {(['sm', 'md', 'lg', 'xl'] as const).map(size => (
                <button
                  key={size}
                  onClick={() => setFontSize(size)}
                  className={`py-2 px-3 rounded-xl border text-center transition-all ${
                    fontSize === size
                      ? 'border-[#0D472B] bg-[#0D472B] text-white font-bold shadow-xs'
                      : 'border-stone-200 text-stone-700 hover:border-stone-300'
                  }`}
                >
                  <span className="text-xs capitalize">{size}</span>
                </button>
              ))}
            </div>

            <div className="p-3 bg-stone-50 rounded-xl border border-stone-200">
              <p className="text-xs text-stone-400 mb-1 font-medium">Preview:</p>
              <p className={`font-scripture text-stone-800 ${
                fontSize === 'sm' ? 'text-sm' : fontSize === 'md' ? 'text-base' : fontSize === 'lg' ? 'text-lg' : 'text-xl'
              }`}>
                "Mwathani nĩ Mũrĩithi wakwa; ndigakenera kĩndũ o na kĩmwe."
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Notifications Drawer Modal */}
      {showNotifModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-end sm:items-center justify-center p-0 sm:p-4">
          <div className="bg-white rounded-t-3xl sm:rounded-2xl max-w-md w-full shadow-2xl overflow-hidden max-h-[85vh] flex flex-col">
            <div className="p-4 bg-[#0D472B] text-white flex items-center justify-between shrink-0">
              <div className="flex items-center gap-2">
                <Bell className="w-4 h-4 text-[#E5B83B]" />
                <h3 className="font-semibold text-base">Church Notifications</h3>
              </div>
              <button 
                onClick={() => setShowNotifModal(false)}
                className="w-8 h-8 rounded-full flex items-center justify-center text-white/80 hover:text-white hover:bg-white/10"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-4 overflow-y-auto space-y-3 flex-1">
              {notifications.map(n => (
                <div 
                  key={n.id}
                  onClick={() => markNotificationRead(n.id)}
                  className={`p-3 rounded-xl border transition-colors cursor-pointer ${
                    n.read ? 'border-stone-100 bg-stone-50' : 'border-[#0D472B]/30 bg-[#0D472B]/5'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2">
                    <h4 className="text-sm font-semibold text-stone-900">{n.title}</h4>
                    <span className="text-[11px] text-stone-400 shrink-0">{n.time}</span>
                  </div>
                  <p className="text-xs text-stone-600 mt-1">{n.body}</p>
                </div>
              ))}
            </div>

            <div className="p-3 border-t border-stone-200 bg-stone-50 text-center">
              <button 
                onClick={() => {
                  setShowNotifModal(false);
                  setActiveTab('announcements');
                }}
                className="text-xs font-semibold text-[#0D472B] hover:underline"
              >
                View All Public & Member Announcements →
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
