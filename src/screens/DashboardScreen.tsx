import React from 'react';
import { useApp } from '../context/AppContext';
import { 
  UserCheck, 
  Calendar, 
  Bell, 
  GraduationCap, 
  TrendingUp, 
  BookOpen, 
  Music, 
  Clock, 
  MapPin, 
  ChevronRight,
  ArrowRight,
  BookmarkCheck
} from 'lucide-react';

export const DashboardScreen: React.FC = () => {
  const { 
    currentUser, 
    congregation, 
    events, 
    announcements, 
    projects, 
    bibleStudies, 
    bookmarks,
    setActiveTab,
    setSelectedProjectId,
    setSelectedStudyId
  } = useApp();

  const memberEvents = events.slice(0, 2);
  const memberAnnouncements = announcements.slice(0, 2);
  const currentStudy = bibleStudies[0];
  const featuredProj = projects[0];

  return (
    <div className="pb-24 max-w-7xl mx-auto px-4 sm:px-6 pt-4 space-y-6">
      {/* Personalized Welcome Banner */}
      <div className="bg-gradient-to-br from-[#0D472B] to-[#08301D] text-white rounded-3xl p-6 sm:p-8 shadow-sm border border-[#08301D] relative overflow-hidden">
        <div className="relative z-10 space-y-2">
          <div className="flex items-center gap-2 text-[#E5B83B] text-xs font-bold uppercase tracking-wider">
            <UserCheck className="w-4 h-4" />
            <span>PCEA Communicant Member Portal</span>
          </div>

          <h1 className="text-xl sm:text-2xl font-bold tracking-tight">
            Karibu, {currentUser.fullName}
          </h1>

          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-stone-200">
            <span><strong>Congregation:</strong> {currentUser.congregation}</span>
            <span aria-hidden="true">·</span>
            <span><strong>Parish Roll:</strong> {currentUser.membershipNumber || 'Active Communicant'}</span>
          </div>
        </div>
      </div>

      {/* Member Fast-Action Row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <button
          onClick={() => setActiveTab('hymns')}
          className="p-4 rounded-2xl bg-white border border-stone-200 hover:border-[#0D472B] transition-all text-left group shadow-xs"
        >
          <div className="w-9 h-9 rounded-xl bg-emerald-50 text-[#0D472B] flex items-center justify-center mb-2 group-hover:scale-105 transition-transform">
            <Music className="w-5 h-5" />
          </div>
          <span className="font-bold text-stone-900 text-xs block">Sing Hymns</span>
          <span className="text-[11px] text-stone-500">Golden Bells & Kikuyu</span>
        </button>

        <button
          onClick={() => setActiveTab('bible')}
          className="p-4 rounded-2xl bg-white border border-stone-200 hover:border-[#0D472B] transition-all text-left group shadow-xs"
        >
          <div className="w-9 h-9 rounded-xl bg-amber-50 text-[#8B6B15] flex items-center justify-center mb-2 group-hover:scale-105 transition-transform">
            <BookOpen className="w-5 h-5" />
          </div>
          <span className="font-bold text-stone-900 text-xs block">Holy Scriptures</span>
          <span className="text-[11px] text-stone-500">Ibuku Rĩa Ngai & KJV</span>
        </button>

        <button
          onClick={() => setActiveTab('studies')}
          className="p-4 rounded-2xl bg-white border border-stone-200 hover:border-[#0D472B] transition-all text-left group shadow-xs"
        >
          <div className="w-9 h-9 rounded-xl bg-indigo-50 text-indigo-700 flex items-center justify-center mb-2 group-hover:scale-105 transition-transform">
            <GraduationCap className="w-5 h-5" />
          </div>
          <span className="font-bold text-stone-900 text-xs block">Week 15 Study</span>
          <span className="text-[11px] text-stone-500">Covenant Faithfulness</span>
        </button>

        <button
          onClick={() => setActiveTab('profile')}
          className="p-4 rounded-2xl bg-white border border-stone-200 hover:border-[#0D472B] transition-all text-left group shadow-xs"
        >
          <div className="w-9 h-9 rounded-xl bg-stone-100 text-stone-700 flex items-center justify-center mb-2 group-hover:scale-105 transition-transform">
            <BookmarkCheck className="w-5 h-5 text-[#D4AF37]" />
          </div>
          <span className="font-bold text-stone-900 text-xs block">My Bookmarks</span>
          <span className="text-[11px] text-stone-500">{bookmarks.length} Saved items</span>
        </button>
      </div>

      {/* 2-Column Split: Announcements & Church Activities on Left, Bible Study & Projects on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Parish Bulletins & Fellowship Calendar (6 cols) */}
        <div className="lg:col-span-6 space-y-5">
          {/* Announcements Card */}
          <div className="bg-white rounded-2xl border border-stone-200 p-5 shadow-xs space-y-4">
            <div className="flex items-center justify-between border-b border-stone-100 pb-3">
              <div className="flex items-center gap-2">
                <Bell className="w-4 h-4 text-[#0D472B]" />
                <h3 className="font-bold text-stone-900 text-sm">Parish Bulletins & Notices</h3>
              </div>
              <button
                onClick={() => setActiveTab('announcements')}
                className="text-xs text-[#0D472B] font-semibold hover:underline"
              >
                All Notices →
              </button>
            </div>

            <div className="space-y-3">
              {memberAnnouncements.map((ann) => (
                <div key={ann.id} className="p-3.5 rounded-xl border border-stone-100 bg-stone-50/60 space-y-1">
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="font-semibold text-[#0D472B]">{ann.category}</span>
                    <span className="text-stone-400">{ann.publishedAt}</span>
                  </div>
                  <h4 className="text-xs sm:text-sm font-bold text-stone-900 leading-snug">
                    {ann.title}
                  </h4>
                  <p className="text-xs text-stone-600 line-clamp-2">
                    {ann.content}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Upcoming Activities Card */}
          <div className="bg-white rounded-2xl border border-stone-200 p-5 shadow-xs space-y-4">
            <div className="flex items-center justify-between border-b border-stone-100 pb-3">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-[#0D472B]" />
                <h3 className="font-bold text-stone-900 text-sm">Upcoming Fellowships & Services</h3>
              </div>
              <button
                onClick={() => setActiveTab('activities')}
                className="text-xs text-[#0D472B] font-semibold hover:underline"
              >
                Calendar →
              </button>
            </div>

            <div className="space-y-3">
              {memberEvents.map((ev) => (
                <div key={ev.id} className="p-3.5 rounded-xl border border-stone-100 bg-stone-50/60 space-y-1.5">
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="font-semibold text-[#0D472B]">{ev.category}</span>
                    <span className="text-stone-500 font-medium">{ev.date}</span>
                  </div>
                  <h4 className="text-xs sm:text-sm font-bold text-stone-900 leading-snug">
                    {ev.title}
                  </h4>
                  <div className="flex items-center gap-3 text-xs text-stone-500">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {ev.time}
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3 h-3" />
                      {ev.venue}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Active Bible Study Outline & Construction Highlight (6 cols) */}
        <div className="lg:col-span-6 space-y-5">
          {/* Current Bible Study */}
          {currentStudy && (
            <div className="bg-white rounded-2xl border border-stone-200 p-5 shadow-xs space-y-4">
              <div className="flex items-center justify-between border-b border-stone-100 pb-3">
                <div className="flex items-center gap-2">
                  <GraduationCap className="w-4 h-4 text-[#0D472B]" />
                  <h3 className="font-bold text-stone-900 text-sm">Current Bible Study: Week {currentStudy.weekNumber}</h3>
                </div>
                <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded">
                  {currentStudy.month}
                </span>
              </div>

              <div className="space-y-2">
                <h4 className="text-sm font-bold text-stone-900 leading-snug">
                  {currentStudy.title}
                </h4>
                <p className="text-xs text-stone-500 italic">
                  Theme: {currentStudy.theme}
                </p>
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {currentStudy.scripturePassages.map((p, i) => (
                    <span key={i} className="text-[11px] bg-stone-100 text-stone-700 px-2 py-0.5 rounded font-medium">
                      {p}
                    </span>
                  ))}
                </div>
                <p className="text-xs text-stone-600 line-clamp-3 pt-1">
                  {currentStudy.studyNotes[0]}
                </p>
              </div>

              <button
                onClick={() => {
                  setSelectedStudyId(currentStudy.id);
                  setActiveTab('studies');
                }}
                className="w-full py-2.5 rounded-xl bg-[#0D472B] text-white text-xs font-semibold hover:bg-[#08301D] transition-colors flex items-center justify-center gap-1.5"
              >
                <span>Open Full Study & Discussion Questions</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          )}

          {/* Development Project Progress Highlight */}
          {featuredProj && (
            <div className="bg-white rounded-2xl border border-stone-200 p-5 shadow-xs space-y-4">
              <div className="flex items-center justify-between border-b border-stone-100 pb-3">
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-[#0D472B]" />
                  <h3 className="font-bold text-stone-900 text-sm">Parish Project Highlight</h3>
                </div>
                <span className="text-xs font-bold text-[#0D472B]">{featuredProj.progressPercentage}% Complete</span>
              </div>

              <div>
                <h4 className="text-sm font-bold text-stone-900 leading-snug truncate">
                  {featuredProj.title}
                </h4>
                <div className="w-full h-2 rounded-full bg-stone-100 overflow-hidden mt-2">
                  <div
                    className="h-full bg-gradient-to-r from-[#0D472B] to-[#D4AF37] rounded-full"
                    style={{ width: `${featuredProj.progressPercentage}%` }}
                  />
                </div>
                <p className="text-xs text-stone-600 mt-2 line-clamp-2">
                  {featuredProj.updates[0]?.content || featuredProj.objectives[0]}
                </p>
              </div>

              <button
                onClick={() => {
                  setSelectedProjectId(featuredProj.id);
                  setActiveTab('projects');
                }}
                className="w-full py-2 rounded-xl border border-stone-200 hover:bg-stone-50 text-stone-800 text-xs font-semibold flex items-center justify-center gap-1.5"
              >
                <span>View Full Transparency Audit</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
