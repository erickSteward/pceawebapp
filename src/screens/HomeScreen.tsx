import React from 'react';
import { useApp } from '../context/AppContext';
import { DAILY_VERSES } from '../data/bibleData';
import { PceaLogo } from '../components/PceaLogo';
import { 
  Music, 
  BookOpen, 
  Calendar, 
  GraduationCap, 
  TrendingUp, 
  Bell, 
  ChevronRight, 
  Sparkles, 
  ArrowRight,
  ShieldCheck,
  UserCheck,
  CheckCircle2,
  Clock,
  MapPin,
  Heart
} from 'lucide-react';

export const HomeScreen: React.FC = () => {
  const { 
    currentUser, 
    activeRole, 
    congregation, 
    setActiveTab, 
    events, 
    projects, 
    announcements,
    setSelectedHymnId,
    setSelectedProjectId,
    setSelectedStudyId
  } = useApp();

  const dailyVerse = DAILY_VERSES[0];
  const upcomingEvents = events.slice(0, 3);
  const featuredProject = projects[0];
  const latestNotice = announcements[0];

  return (
    <div className="pb-24 max-w-7xl mx-auto px-4 sm:px-6 pt-4 space-y-6">
      {/* Hero Banner with Sanctuary Imagery */}
      <div className="relative rounded-3xl overflow-hidden shadow-sm border border-stone-200/80 bg-[#0D472B]">
        <div className="absolute inset-0 z-0">
          <img
            src="/src/assets/images/pcea_sanctuary_interior_1792004234981.jpg"
            alt="PCEA Sanctuary Interior"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover opacity-25 mix-blend-luminosity scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#08301D] via-[#0D472B]/85 to-transparent" />
        </div>

        <div className="relative z-10 p-6 sm:p-8 text-white">
          <div className="flex items-center gap-2 mb-3 text-[#E5B83B] text-xs font-semibold tracking-wider uppercase">
            <span>Presbyterian Church of East Africa</span>
            <span aria-hidden="true">·</span>
            <span>Est. 1891</span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-balance leading-snug">
            {congregation}
          </h1>

          <p className="text-xs sm:text-sm text-stone-200 mt-2 max-w-xl font-light leading-relaxed">
            "Nec Tamen Consumebatur" — And the bush burned with fire, and yet it was not consumed. Welcome to worship, prayer, and fellowship.
          </p>

          {/* Guest vs Member quick state strip */}
          <div className="mt-5 pt-4 border-t border-white/15 flex flex-wrap items-center justify-between gap-3">
            {activeRole === 'guest' ? (
              <div className="flex flex-wrap items-center gap-3">
                <span className="text-xs text-stone-200 bg-white/10 px-3 py-1.5 rounded-lg border border-white/15">
                  Guest Mode: Instant access to Hymns & Bible
                </span>
                <button
                  onClick={() => setActiveTab('auth')}
                  className="px-4 py-2 rounded-xl text-xs font-semibold bg-[#E5B83B] text-[#08301D] hover:bg-[#d6a524] transition-all shadow-sm flex items-center gap-1.5"
                >
                  <UserCheck className="w-3.5 h-3.5" />
                  Member Login / Register
                </button>
              </div>
            ) : activeRole === 'member' ? (
              <div className="flex items-center justify-between w-full">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-[#E5B83B]" />
                  <span className="text-xs text-stone-200">
                    Karibu, <span className="font-semibold text-white">{currentUser.fullName}</span> ({currentUser.membershipNumber})
                  </span>
                </div>
                <button
                  onClick={() => setActiveTab('profile')}
                  className="text-xs text-[#E5B83B] hover:underline font-medium"
                >
                  My Profile & Bookmarks →
                </button>
              </div>
            ) : (
              <div className="flex items-center justify-between w-full">
                <span className="text-xs text-[#E5B83B] font-semibold flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4" />
                  Administrator Portal Active
                </span>
                <button
                  onClick={() => setActiveTab('admin')}
                  className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-white text-[#0D472B] hover:bg-stone-100 transition-colors"
                >
                  Manage Church Content
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Daily Verse of the Day */}
      <div className="bg-white rounded-2xl p-5 border border-stone-200 shadow-xs relative overflow-hidden">
        <div className="flex items-center justify-between mb-3 text-xs">
          <div className="flex items-center gap-1.5 text-[#0D472B] font-bold tracking-wide">
            <BookOpen className="w-4 h-4 text-[#D4AF37]" />
            <span>VERSE OF THE DAY · RĨANDĨKO RĨA MŨTHENYA</span>
          </div>
          <span className="text-stone-500 font-medium">{dailyVerse.translation}</span>
        </div>

        <div className="space-y-2">
          <p className="font-scripture text-stone-800 text-base sm:text-lg leading-relaxed italic">
            "{dailyVerse.textEn}"
          </p>
          <p className="font-scripture text-stone-600 text-sm leading-relaxed border-t border-stone-100 pt-2">
            Gĩkũyũ: "{dailyVerse.textKi}"
          </p>
        </div>

        <div className="mt-4 pt-3 border-t border-stone-100 flex items-center justify-between text-xs">
          <span className="font-semibold text-stone-800">{dailyVerse.reference} ({dailyVerse.kikuyuReference})</span>
          <button 
            onClick={() => setActiveTab('bible')}
            className="text-[#0D472B] hover:text-[#08301D] font-semibold flex items-center gap-1 group"
          >
            <span>Open in Bible</span>
            <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>
      </div>

      {/* Quick Access Grid - 6 Key Destinations */}
      <div>
        <h2 className="text-xs font-bold uppercase tracking-wider text-stone-700 mb-3 px-1">
          Spiritual Resources & Congregation Channels
        </h2>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {/* Golden Bells */}
          <button
            onClick={() => {
              setSelectedHymnId(null);
              setActiveTab('hymns');
            }}
            className="p-4 rounded-2xl bg-white border border-stone-200 hover:border-[#0D472B]/40 hover:shadow-sm transition-all text-left flex flex-col justify-between group"
          >
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-[#0D472B] flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
              <Music className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-semibold text-stone-900 text-sm leading-tight">Golden Bells</h3>
              <p className="text-[11px] text-stone-700 mt-0.5">Classic English hymns</p>
            </div>
          </button>

          {/* Kikuyu Hymns */}
          <button
            onClick={() => {
              setSelectedHymnId(null);
              setActiveTab('hymns');
            }}
            className="p-4 rounded-2xl bg-white border border-stone-200 hover:border-[#0D472B]/40 hover:shadow-sm transition-all text-left flex flex-col justify-between group"
          >
            <div className="w-10 h-10 rounded-xl bg-amber-50 text-[#C59B27] flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
              <Music className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-semibold text-stone-900 text-sm leading-tight">Nyimbo cia Ngai</h3>
              <p className="text-[11px] text-stone-700 mt-0.5">Kikuyu PCEA hymns</p>
            </div>
          </button>

          {/* Holy Bible */}
          <button
            onClick={() => setActiveTab('bible')}
            className="p-4 rounded-2xl bg-white border border-stone-200 hover:border-[#0D472B]/40 hover:shadow-sm transition-all text-left flex flex-col justify-between group"
          >
            <div className="w-10 h-10 rounded-xl bg-stone-100 text-stone-800 flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-semibold text-stone-900 text-sm leading-tight">Holy Bible</h3>
              <p className="text-[11px] text-stone-700 mt-0.5">KJV, WEB & Ibuku Rĩa Ngai</p>
            </div>
          </button>

          {/* Activities & Calendar */}
          <button
            onClick={() => setActiveTab('activities')}
            className="p-4 rounded-2xl bg-white border border-stone-200 hover:border-[#0D472B]/40 hover:shadow-sm transition-all text-left flex flex-col justify-between group"
          >
            <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-800 flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
              <Calendar className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-semibold text-stone-900 text-sm leading-tight">Activities</h3>
              <p className="text-[11px] text-stone-700 mt-0.5">Services & fellowships</p>
            </div>
          </button>

          {/* Bible Studies */}
          <button
            onClick={() => setActiveTab('studies')}
            className="p-4 rounded-2xl bg-white border border-stone-200 hover:border-[#0D472B]/40 hover:shadow-sm transition-all text-left flex flex-col justify-between group"
          >
            <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-800 flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
              <GraduationCap className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-semibold text-stone-900 text-sm leading-tight">Bible Studies</h3>
              <p className="text-[11px] text-stone-700 mt-0.5">Weekly guides & notes</p>
            </div>
          </button>

          {/* Church Projects */}
          <button
            onClick={() => setActiveTab('projects')}
            className="p-4 rounded-2xl bg-white border border-stone-200 hover:border-[#0D472B]/40 hover:shadow-sm transition-all text-left flex flex-col justify-between group"
          >
            <div className="w-10 h-10 rounded-xl bg-orange-50 text-orange-800 flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
              <TrendingUp className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-semibold text-stone-900 text-sm leading-tight">Projects</h3>
              <p className="text-[11px] text-stone-700 mt-0.5">Progress & transparency</p>
            </div>
          </button>
        </div>
      </div>

      {/* 2-Column Split: Featured Project Transparency & Upcoming Church Activities */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        {/* Left: Featured Project Progress Card (7 cols) */}
        <div className="lg:col-span-7 bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-xs flex flex-col justify-between">
          <div>
            <div className="relative h-44 sm:h-52 w-full overflow-hidden bg-stone-100">
              <img
                src={featuredProject.coverImage}
                alt={featuredProject.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
              <div className="absolute top-3 left-3 bg-[#0D472B] text-white text-[11px] font-semibold px-2.5 py-1 rounded-md">
                {featuredProject.category}
              </div>
              <div className="absolute top-3 right-3 bg-white/90 text-stone-900 text-[11px] font-bold px-2.5 py-1 rounded-md">
                Status: {featuredProject.status}
              </div>
              <div className="absolute bottom-3 left-3 right-3 text-white">
                <h3 className="font-bold text-base sm:text-lg leading-tight truncate">
                  {featuredProject.title}
                </h3>
                <p className="text-xs text-stone-300 mt-0.5 truncate">
                  {featuredProject.congregation}
                </p>
              </div>
            </div>

            <div className="p-4 sm:p-5 space-y-3">
              {/* Progress Bar */}
              <div>
                <div className="flex items-center justify-between text-xs mb-1.5">
                  <span className="font-medium text-stone-600">Overall Construction Progress</span>
                  <span className="font-bold text-[#0D472B]">{featuredProject.progressPercentage}%</span>
                </div>
                <div className="w-full h-2.5 rounded-full bg-stone-100 overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-[#0D472B] to-[#D4AF37] rounded-full transition-all duration-500"
                    style={{ width: `${featuredProject.progressPercentage}%` }}
                  />
                </div>
              </div>

              {/* Financial Transparency Strip */}
              <div className="grid grid-cols-2 gap-2 p-3 rounded-xl bg-stone-50 border border-stone-100 text-xs">
                <div>
                  <span className="text-stone-600 block text-[11px]">Approved Budget</span>
                  <span className="font-semibold text-stone-900">KES {(featuredProject.approvedBudgetKES / 1000000).toFixed(1)}M</span>
                </div>
                <div>
                  <span className="text-stone-600 block text-[11px]">Expended to Date</span>
                  <span className="font-semibold text-[#0D472B]">KES {(featuredProject.expenditureKES / 1000000).toFixed(1)}M</span>
                </div>
              </div>

              <p className="text-xs text-stone-600 line-clamp-2">
                {featuredProject.objectives[0]}
              </p>
            </div>
          </div>

          <div className="p-4 pt-0">
            <button
              onClick={() => {
                setSelectedProjectId(featuredProject.id);
                setActiveTab('projects');
              }}
              className="w-full py-2.5 rounded-xl border border-[#0D472B] text-[#0D472B] hover:bg-[#0D472B] hover:text-white transition-all text-xs font-semibold flex items-center justify-center gap-1.5"
            >
              <span>View Milestones & Audit Reports</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Right: Upcoming Activities & Bulletin (5 cols) */}
        <div className="lg:col-span-5 space-y-4 flex flex-col justify-between">
          <div className="bg-white rounded-2xl border border-stone-200 p-5 shadow-xs">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-[#0D472B]" />
                <h3 className="font-bold text-stone-900 text-sm">Upcoming Services & Fellowships</h3>
              </div>
              <button 
                onClick={() => setActiveTab('activities')}
                className="text-xs text-[#0D472B] font-semibold hover:underline"
              >
                Calendar →
              </button>
            </div>

            <div className="space-y-3">
              {upcomingEvents.map((ev) => (
                <div 
                  key={ev.id}
                  onClick={() => setActiveTab('activities')}
                  className="p-3 rounded-xl border border-stone-100 hover:border-stone-200 bg-stone-50/50 hover:bg-stone-50 transition-colors cursor-pointer"
                >
                  <div className="flex items-center justify-between text-[11px] text-stone-700 mb-1">
                    <span className="font-semibold text-[#0D472B]">{ev.category}</span>
                    <span>{ev.date}</span>
                  </div>
                  <h4 className="font-semibold text-stone-900 text-xs sm:text-sm leading-tight truncate">
                    {ev.title}
                  </h4>
                  <div className="flex items-center gap-3 text-[11px] text-stone-700 mt-1.5">
                    <span className="flex items-center gap-1 truncate">
                      <Clock className="w-3 h-3 text-stone-500 shrink-0" />
                      {ev.time}
                    </span>
                    <span className="flex items-center gap-1 truncate">
                      <MapPin className="w-3 h-3 text-stone-500 shrink-0" />
                      {ev.venue}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Latest Public Announcement */}
          {latestNotice && (
            <div className="bg-[#0D472B]/5 rounded-2xl border border-[#0D472B]/20 p-4">
              <div className="flex items-center gap-1.5 text-[#0D472B] text-xs font-bold mb-1">
                <Bell className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span>OFFICIAL CHURCH NOTICE</span>
              </div>
              <h4 className="text-xs sm:text-sm font-bold text-stone-900 leading-snug">
                {latestNotice.title}
              </h4>
              <p className="text-xs text-stone-600 mt-1 line-clamp-2">
                {latestNotice.content}
              </p>
              <div className="mt-2 flex items-center justify-between text-[11px]">
                <span className="text-stone-700">{latestNotice.author}</span>
                <button
                  onClick={() => setActiveTab('announcements')}
                  className="font-semibold text-[#0D472B] hover:underline"
                >
                  Read Full Bulletin
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
