import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { Announcement } from '../types';
import { 
  Bell, 
  Search, 
  AlertCircle, 
  Calendar, 
  User, 
  ShieldCheck, 
  CheckCircle2, 
  Send, 
  Trash2,
  Lock,
  Globe
} from 'lucide-react';

export const AnnouncementsScreen: React.FC = () => {
  const { announcements, deleteAnnouncement, activeRole, setActiveTab } = useApp();

  const [activeTabFilter, setActiveTabFilter] = useState<'all' | 'public' | 'members'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [testAlertSent, setTestAlertSent] = useState(false);

  const filteredAnnouncements = useMemo(() => {
    return announcements.filter(a => {
      if (activeTabFilter === 'public' && !a.isPublic) return false;
      if (activeTabFilter === 'members' && a.isPublic) return false;
      if (!searchQuery.trim()) return true;

      const q = searchQuery.toLowerCase();
      return (
        a.title.toLowerCase().includes(q) ||
        a.content.toLowerCase().includes(q) ||
        a.category.toLowerCase().includes(q) ||
        a.author.toLowerCase().includes(q)
      );
    });
  }, [announcements, activeTabFilter, searchQuery]);

  const handleSimulatePush = () => {
    setTestAlertSent(true);
    setTimeout(() => setTestAlertSent(false), 3000);
  };

  return (
    <div className="pb-24 max-w-5xl mx-auto px-4 sm:px-6 pt-4 space-y-5">
      {/* Header */}
      <div className="bg-white rounded-2xl p-5 border border-stone-200 shadow-xs space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h1 className="text-lg sm:text-xl font-bold text-stone-900 flex items-center gap-2">
              <Bell className="w-5 h-5 text-[#0D472B]" />
              <span>Congregation Announcements & Bulletin</span>
            </h1>
            <p className="text-xs text-stone-500 mt-0.5">
              Official notices, pastoral communications, bereavement, and ministry updates
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleSimulatePush}
              className="px-3 py-1.5 rounded-xl border border-stone-200 hover:bg-stone-50 text-xs font-semibold text-stone-700 flex items-center gap-1.5 transition-colors"
              title="Test push notification alert"
            >
              <Send className="w-3.5 h-3.5 text-[#0D472B]" />
              <span>Simulate Notification</span>
            </button>

            {activeRole === 'admin' && (
              <button
                onClick={() => setActiveTab('admin')}
                className="px-3 py-1.5 rounded-xl bg-[#0D472B] text-white text-xs font-semibold hover:bg-[#08301D] transition-colors flex items-center gap-1.5"
              >
                <ShieldCheck className="w-3.5 h-3.5 text-[#E5B83B]" />
                <span>New Announcement</span>
              </button>
            )}
          </div>
        </div>

        {testAlertSent && (
          <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>[Simulated Push Notification]: Urgent Sunday Communion bulletin dispatched to all active mobile subscribers!</span>
          </div>
        )}

        {/* Filter bar: Public vs Members-Only & Search */}
        <div className="pt-3 border-t border-stone-100 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center p-1 bg-stone-100 rounded-xl font-medium">
            <button
              onClick={() => setActiveTabFilter('all')}
              className={`px-3 py-1.5 rounded-lg transition-colors ${
                activeTabFilter === 'all' ? 'bg-[#0D472B] text-white shadow-xs' : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              All Notices ({announcements.length})
            </button>
            <button
              onClick={() => setActiveTabFilter('public')}
              className={`px-3 py-1.5 rounded-lg transition-colors ${
                activeTabFilter === 'public' ? 'bg-[#0D472B] text-white shadow-xs' : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              Public Announcements
            </button>
            <button
              onClick={() => setActiveTabFilter('members')}
              className={`px-3 py-1.5 rounded-lg transition-colors ${
                activeTabFilter === 'members' ? 'bg-[#0D472B] text-white shadow-xs' : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              Members Only
            </button>
          </div>

          <div className="relative min-w-[220px]">
            <Search className="w-3.5 h-3.5 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search announcements..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-8 pr-3 py-1.5 text-xs rounded-xl border border-stone-200 bg-stone-50 focus:outline-hidden focus:ring-1 focus:ring-[#0D472B]"
            />
          </div>
        </div>
      </div>

      {/* Announcements List */}
      <div className="space-y-4">
        {filteredAnnouncements.length === 0 ? (
          <div className="p-12 text-center bg-white rounded-2xl border border-stone-200 text-stone-500">
            <Bell className="w-10 h-10 mx-auto text-stone-300 mb-2" />
            <p className="text-sm font-medium">No announcements found matching this criteria.</p>
          </div>
        ) : (
          filteredAnnouncements.map((ann) => (
            <div
              key={ann.id}
              className={`bg-white rounded-2xl border p-5 sm:p-6 shadow-xs space-y-3 transition-all ${
                ann.isUrgent ? 'border-amber-300 bg-amber-50/20' : 'border-stone-200'
              }`}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex flex-wrap items-center gap-2 text-xs">
                    {ann.isUrgent && (
                      <span className="font-bold text-amber-800 bg-amber-100 px-2.5 py-0.5 rounded flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        URGENT
                      </span>
                    )}
                    <span className="font-semibold text-[#0D472B] bg-[#0D472B]/5 px-2.5 py-0.5 rounded">
                      {ann.category}
                    </span>
                    <span className="text-stone-400 flex items-center gap-1">
                      {ann.isPublic ? (
                        <>
                          <Globe className="w-3 h-3 text-emerald-600" />
                          <span>Public Notice</span>
                        </>
                      ) : (
                        <>
                          <Lock className="w-3 h-3 text-stone-500" />
                          <span>Church Members Only</span>
                        </>
                      )}
                    </span>
                  </div>

                  <h3 className="text-base sm:text-lg font-bold text-stone-900 leading-snug">
                    {ann.title}
                  </h3>
                </div>

                {activeRole === 'admin' && (
                  <button
                    onClick={() => deleteAnnouncement(ann.id)}
                    className="p-1.5 rounded-lg border border-red-200 text-red-600 hover:bg-red-50 transition-colors"
                    title="Archive / Delete notice"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
              </div>

              <p className="text-xs sm:text-sm text-stone-700 leading-relaxed font-sans whitespace-pre-line">
                {ann.content}
              </p>

              <div className="pt-3 border-t border-stone-100 flex flex-wrap items-center justify-between text-xs text-stone-500 gap-2">
                <div className="flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5 text-stone-400" />
                  <span>Authorized by: <strong>{ann.author}</strong> ({ann.authorRole})</span>
                </div>
                <span>Published: {ann.publishedAt}</span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
