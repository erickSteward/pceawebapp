import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  ShieldCheck, 
  Bell, 
  Calendar, 
  GraduationCap, 
  TrendingUp, 
  Users, 
  Activity, 
  Plus, 
  Trash2, 
  CheckCircle2, 
  Clock, 
  Check,
  AlertCircle
} from 'lucide-react';
import { CONGREGATIONS } from '../data/mockData';

export const AdminScreen: React.FC = () => {
  const { 
    currentUser, 
    activeRole, 
    announcements, 
    addAnnouncement, 
    deleteAnnouncement,
    events, 
    addEvent, 
    deleteEvent,
    projects, 
    updateProject,
    addProjectUpdate,
    bibleStudies, 
    addBibleStudy,
    membersList, 
    approveMember, 
    auditLogs,
    congregation,
    setActiveTab 
  } = useApp();

  const [adminTab, setAdminTab] = useState<'stats' | 'announcements' | 'events' | 'projects' | 'studies' | 'members' | 'audit'>('stats');
  const [successBanner, setSuccessBanner] = useState('');

  // Announcement Form State
  const [annTitle, setAnnTitle] = useState('');
  const [annCategory, setAnnCategory] = useState<any>('General Bulletin');
  const [annContent, setAnnContent] = useState('');
  const [annIsPublic, setAnnIsPublic] = useState(true);
  const [annIsUrgent, setAnnIsUrgent] = useState(false);

  // Event Form State
  const [evTitle, setEvTitle] = useState('');
  const [evCategory, setEvCategory] = useState<any>('Worship Service');
  const [evDate, setEvDate] = useState('2026-04-26');
  const [evTime, setEvTime] = useState('09:00 AM – 11:30 AM');
  const [evVenue, setEvVenue] = useState('Main Sanctuary');
  const [evDesc, setEvDesc] = useState('');
  const [evContact, setEvContact] = useState(currentUser.fullName);
  const [evPhone, setEvPhone] = useState('+254 722 000 111');

  // Project update state
  const [selectedProjId, setSelectedProjId] = useState(projects[0]?.id || '');
  const [projProgress, setProjProgress] = useState(projects[0]?.progressPercentage || 70);
  const [projUpdateTitle, setProjUpdateTitle] = useState('');
  const [projUpdateContent, setProjUpdateContent] = useState('');

  // Bible Study Form State
  const [bsTitle, setBsTitle] = useState('');
  const [bsTheme, setBsTheme] = useState('');
  const [bsWeek, setBsWeek] = useState(18);
  const [bsMonth, setBsMonth] = useState('May 2026');
  const [bsPassages, setBsPassages] = useState('Romans 12:1-8, Ephesians 4:1-6');
  const [bsNotes, setBsNotes] = useState('');
  const [bsQuestions, setBsQuestions] = useState('');

  const showSuccess = (msg: string) => {
    setSuccessBanner(msg);
    setTimeout(() => setSuccessBanner(''), 3000);
  };

  const handleCreateAnnouncement = (e: React.FormEvent) => {
    e.preventDefault();
    if (!annTitle.trim() || !annContent.trim()) return;

    addAnnouncement({
      title: annTitle,
      congregation: congregation,
      category: annCategory,
      content: annContent,
      isPublic: annIsPublic,
      isUrgent: annIsUrgent,
      author: currentUser.fullName,
      authorRole: 'Church Administrator'
    });

    setAnnTitle('');
    setAnnContent('');
    showSuccess('New church announcement published to congregation feed!');
  };

  const handleCreateEvent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!evTitle.trim()) return;

    addEvent({
      title: evTitle,
      congregation: congregation,
      category: evCategory,
      date: evDate,
      time: evTime,
      venue: evVenue,
      description: evDesc,
      contactPerson: evContact,
      contactPhone: evPhone,
      isPublic: true,
      rsvpRequired: true
    });

    setEvTitle('');
    setEvDesc('');
    showSuccess('Church activity added to public calendar!');
  };

  const handleUpdateProjectProgress = (e: React.FormEvent) => {
    e.preventDefault();
    updateProject(selectedProjId, {
      progressPercentage: Number(projProgress)
    });

    if (projUpdateTitle.trim() && projUpdateContent.trim()) {
      addProjectUpdate(selectedProjId, projUpdateTitle, projUpdateContent);
      setProjUpdateTitle('');
      setProjUpdateContent('');
    }

    showSuccess('Project progress percentage and field update published!');
  };

  const handleCreateStudy = (e: React.FormEvent) => {
    e.preventDefault();
    if (!bsTitle.trim() || !bsTheme.trim()) return;

    addBibleStudy({
      title: bsTitle,
      theme: bsTheme,
      weekNumber: Number(bsWeek),
      month: bsMonth,
      congregation: congregation,
      author: currentUser.fullName,
      scripturePassages: bsPassages.split(',').map(s => s.trim()),
      studyNotes: bsNotes ? bsNotes.split('\n\n') : ['Faithful stewardship in Christ.'],
      discussionQuestions: bsQuestions ? bsQuestions.split('\n') : ['How do we live out this passage daily?']
    });

    setBsTitle('');
    setBsTheme('');
    setBsNotes('');
    setBsQuestions('');
    showSuccess('New Bible study outline published for parish fellowships!');
  };

  return (
    <div className="pb-24 max-w-7xl mx-auto px-4 sm:px-6 pt-4 space-y-6">
      {/* Admin Header */}
      <div className="bg-[#0D472B] text-white rounded-3xl p-6 shadow-sm border border-[#08301D] flex flex-wrap items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-[#E5B83B] text-xs font-bold uppercase tracking-wider">
            <ShieldCheck className="w-4 h-4" />
            <span>Church Administrator Control Panel</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold">
            PCEA Content & Parish Management
          </h1>
          <p className="text-xs text-stone-200">
            Managing official bulletins, project transparency disclosures, and member registrations for {congregation}.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs bg-white/10 px-3 py-1.5 rounded-xl border border-white/15">
            Admin: {currentUser.fullName}
          </span>
        </div>
      </div>

      {successBanner && (
        <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs sm:text-sm font-semibold flex items-center gap-2">
          <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
          <span>{successBanner}</span>
        </div>
      )}

      {/* Admin Navigation Pills */}
      <div className="flex items-center gap-1.5 p-1 bg-white border border-stone-200 rounded-2xl overflow-x-auto text-xs font-semibold scrollbar-none shadow-xs">
        <button
          onClick={() => setAdminTab('stats')}
          className={`flex items-center gap-1.5 px-3 py-2 rounded-xl transition-colors shrink-0 ${
            adminTab === 'stats' ? 'bg-[#0D472B] text-white shadow-xs' : 'text-stone-600 hover:text-stone-900'
          }`}
        >
          <Activity className="w-3.5 h-3.5" />
          <span>Engagement Overview</span>
        </button>

        <button
          onClick={() => setAdminTab('announcements')}
          className={`flex items-center gap-1.5 px-3 py-2 rounded-xl transition-colors shrink-0 ${
            adminTab === 'announcements' ? 'bg-[#0D472B] text-white shadow-xs' : 'text-stone-600 hover:text-stone-900'
          }`}
        >
          <Bell className="w-3.5 h-3.5" />
          <span>Announcements ({announcements.length})</span>
        </button>

        <button
          onClick={() => setAdminTab('events')}
          className={`flex items-center gap-1.5 px-3 py-2 rounded-xl transition-colors shrink-0 ${
            adminTab === 'events' ? 'bg-[#0D472B] text-white shadow-xs' : 'text-stone-600 hover:text-stone-900'
          }`}
        >
          <Calendar className="w-3.5 h-3.5" />
          <span>Activities ({events.length})</span>
        </button>

        <button
          onClick={() => setAdminTab('projects')}
          className={`flex items-center gap-1.5 px-3 py-2 rounded-xl transition-colors shrink-0 ${
            adminTab === 'projects' ? 'bg-[#0D472B] text-white shadow-xs' : 'text-stone-600 hover:text-stone-900'
          }`}
        >
          <TrendingUp className="w-3.5 h-3.5" />
          <span>Projects ({projects.length})</span>
        </button>

        <button
          onClick={() => setAdminTab('studies')}
          className={`flex items-center gap-1.5 px-3 py-2 rounded-xl transition-colors shrink-0 ${
            adminTab === 'studies' ? 'bg-[#0D472B] text-white shadow-xs' : 'text-stone-600 hover:text-stone-900'
          }`}
        >
          <GraduationCap className="w-3.5 h-3.5" />
          <span>Bible Studies ({bibleStudies.length})</span>
        </button>

        <button
          onClick={() => setAdminTab('members')}
          className={`flex items-center gap-1.5 px-3 py-2 rounded-xl transition-colors shrink-0 ${
            adminTab === 'members' ? 'bg-[#0D472B] text-white shadow-xs' : 'text-stone-600 hover:text-stone-900'
          }`}
        >
          <Users className="w-3.5 h-3.5" />
          <span>Members Roll ({membersList.length})</span>
        </button>

        <button
          onClick={() => setAdminTab('audit')}
          className={`flex items-center gap-1.5 px-3 py-2 rounded-xl transition-colors shrink-0 ${
            adminTab === 'audit' ? 'bg-[#0D472B] text-white shadow-xs' : 'text-stone-600 hover:text-stone-900'
          }`}
        >
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>Audit Log ({auditLogs.length})</span>
        </button>
      </div>

      {/* 1. ENGAGEMENT OVERVIEW & STATS */}
      {adminTab === 'stats' && (
        <div className="space-y-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-xs">
              <span className="text-xs text-stone-500 font-medium block">Registered Church Members</span>
              <span className="text-2xl font-bold text-stone-900 mt-1 block">1,482</span>
              <span className="text-[11px] text-emerald-700 mt-1 block">Active across 6 parishes</span>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-xs">
              <span className="text-xs text-stone-500 font-medium block">Hymn & Bible Reads</span>
              <span className="text-2xl font-bold text-[#0D472B] mt-1 block">18,340</span>
              <span className="text-[11px] text-stone-500 mt-1 block">Golden Bells & Nyimbo cia Ngai</span>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-xs">
              <span className="text-xs text-stone-500 font-medium block">Active Parish Projects</span>
              <span className="text-2xl font-bold text-amber-700 mt-1 block">{projects.length}</span>
              <span className="text-[11px] text-stone-500 mt-1 block">KES 90.7M total authorized</span>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-xs">
              <span className="text-xs text-stone-500 font-medium block">Sunday RSVP Confirmations</span>
              <span className="text-2xl font-bold text-stone-900 mt-1 block">1,070</span>
              <span className="text-[11px] text-stone-500 mt-1 block">Holy Communion & 2nd Service</span>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-stone-200 p-6 shadow-xs space-y-4">
            <h3 className="font-bold text-stone-900 text-base">Recent Church Governance Logs</h3>
            <div className="divide-y divide-stone-100 text-xs">
              {auditLogs.slice(0, 5).map(log => (
                <div key={log.id} className="py-2.5 flex items-center justify-between gap-4">
                  <div>
                    <span className="font-semibold text-stone-900">{log.action}: </span>
                    <span className="text-stone-600">{log.details}</span>
                  </div>
                  <div className="text-right shrink-0">
                    <span className="text-[11px] text-stone-400 block">{log.timestamp}</span>
                    <span className="text-[10px] text-stone-500">{log.adminName}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 2. ANNOUNCEMENTS MANAGER */}
      {adminTab === 'announcements' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          <div className="lg:col-span-5 bg-white rounded-2xl border border-stone-200 p-6 shadow-xs space-y-4">
            <h3 className="font-bold text-stone-900 text-base flex items-center gap-1.5">
              <Plus className="w-4 h-4 text-[#0D472B]" />
              <span>Create Official Announcement</span>
            </h3>

            <form onSubmit={handleCreateAnnouncement} className="space-y-3 text-xs sm:text-sm">
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">Notice Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Special Parish Session Meeting"
                  value={annTitle}
                  onChange={(e) => setAnnTitle(e.target.value)}
                  className="w-full p-2.5 text-xs rounded-xl border border-stone-200 bg-stone-50 focus:outline-hidden focus:ring-2 focus:ring-[#0D472B]/30"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">Category</label>
                <select
                  value={annCategory}
                  onChange={(e) => setAnnCategory(e.target.value)}
                  className="w-full p-2.5 text-xs rounded-xl border border-stone-200 bg-stone-50 focus:outline-hidden focus:ring-2 focus:ring-[#0D472B]/30"
                >
                  <option value="General Bulletin">General Bulletin</option>
                  <option value="Sunday Services">Sunday Services</option>
                  <option value="Urgent Notice">Urgent Notice</option>
                  <option value="Development">Development Project</option>
                  <option value="Fellowship">Fellowship (Guild/PCMF/Youth)</option>
                  <option value="Condolences">Condolences / Bereavement</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">Content / Message</label>
                <textarea
                  rows={4}
                  required
                  placeholder="Enter official announcement wording..."
                  value={annContent}
                  onChange={(e) => setAnnContent(e.target.value)}
                  className="w-full p-2.5 text-xs rounded-xl border border-stone-200 bg-stone-50 focus:outline-hidden focus:ring-2 focus:ring-[#0D472B]/30"
                />
              </div>

              <div className="flex items-center justify-between pt-1">
                <label className="flex items-center gap-2 text-xs text-stone-700 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={annIsPublic}
                    onChange={(e) => setAnnIsPublic(e.target.checked)}
                    className="w-4 h-4 rounded text-[#0D472B]"
                  />
                  <span>Public Notice (Visible to Guests)</span>
                </label>

                <label className="flex items-center gap-2 text-xs text-stone-700 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={annIsUrgent}
                    onChange={(e) => setAnnIsUrgent(e.target.checked)}
                    className="w-4 h-4 rounded text-red-600"
                  />
                  <span className="font-semibold text-amber-900">Mark Urgent</span>
                </label>
              </div>

              <button
                type="submit"
                className="w-full py-2.5 rounded-xl bg-[#0D472B] text-white text-xs font-semibold hover:bg-[#08301D] transition-colors"
              >
                Publish Announcement
              </button>
            </form>
          </div>

          <div className="lg:col-span-7 space-y-3">
            <h3 className="font-bold text-stone-900 text-sm">Published Announcements ({announcements.length})</h3>
            <div className="space-y-3">
              {announcements.map(ann => (
                <div key={ann.id} className="p-4 bg-white rounded-2xl border border-stone-200 shadow-xs space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-[#0D472B]">{ann.category}</span>
                    <button
                      onClick={() => deleteAnnouncement(ann.id)}
                      className="text-red-600 hover:text-red-800 p-1 rounded"
                      title="Delete notice"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <h4 className="font-bold text-stone-900 text-sm">{ann.title}</h4>
                  <p className="text-xs text-stone-600 line-clamp-2">{ann.content}</p>
                  <span className="text-[10px] text-stone-400 block pt-1">{ann.publishedAt} · {ann.author}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 3. ACTIVITIES MANAGER */}
      {adminTab === 'events' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          <div className="lg:col-span-5 bg-white rounded-2xl border border-stone-200 p-6 shadow-xs space-y-4">
            <h3 className="font-bold text-stone-900 text-base flex items-center gap-1.5">
              <Plus className="w-4 h-4 text-[#0D472B]" />
              <span>Schedule Church Activity / Service</span>
            </h3>

            <form onSubmit={handleCreateEvent} className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold text-stone-700 mb-1">Event Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Youth Kesha & Worship Night"
                  value={evTitle}
                  onChange={(e) => setEvTitle(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-stone-200 bg-stone-50 focus:outline-hidden focus:ring-1 focus:ring-[#0D472B]"
                />
              </div>

              <div>
                <label className="block font-semibold text-stone-700 mb-1">Ministry Group</label>
                <select
                  value={evCategory}
                  onChange={(e) => setEvCategory(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-stone-200 bg-stone-50"
                >
                  <option value="Worship Service">Worship Service</option>
                  <option value="Woman's Guild">Woman's Guild</option>
                  <option value="PCMF">Presbyterian Church Men's Fellowship (PCMF)</option>
                  <option value="Youth">Youth / PYC</option>
                  <option value="Prayer & Fasting">Prayer & Fasting</option>
                  <option value="Church School">Church School</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block font-semibold text-stone-700 mb-1">Date</label>
                  <input
                    type="date"
                    required
                    value={evDate}
                    onChange={(e) => setEvDate(e.target.value)}
                    className="w-full p-2 rounded-xl border border-stone-200 bg-stone-50"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-stone-700 mb-1">Time</label>
                  <input
                    type="text"
                    required
                    placeholder="08:30 AM"
                    value={evTime}
                    onChange={(e) => setEvTime(e.target.value)}
                    className="w-full p-2 rounded-xl border border-stone-200 bg-stone-50"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-stone-700 mb-1">Venue</label>
                <input
                  type="text"
                  required
                  value={evVenue}
                  onChange={(e) => setEvVenue(e.target.value)}
                  className="w-full p-2 rounded-xl border border-stone-200 bg-stone-50"
                />
              </div>

              <div>
                <label className="block font-semibold text-stone-700 mb-1">Description</label>
                <textarea
                  rows={2}
                  value={evDesc}
                  onChange={(e) => setEvDesc(e.target.value)}
                  className="w-full p-2 rounded-xl border border-stone-200 bg-stone-50"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 rounded-xl bg-[#0D472B] text-white font-semibold hover:bg-[#08301D] transition-colors"
              >
                Save Event to Calendar
              </button>
            </form>
          </div>

          <div className="lg:col-span-7 space-y-3">
            <h3 className="font-bold text-stone-900 text-sm">Scheduled Calendar Events ({events.length})</h3>
            <div className="space-y-3">
              {events.map(ev => (
                <div key={ev.id} className="p-4 bg-white rounded-2xl border border-stone-200 shadow-xs flex items-center justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2 text-xs">
                      <span className="font-bold text-[#0D472B]">{ev.category}</span>
                      <span className="text-stone-400">·</span>
                      <span className="text-stone-500">{ev.date} at {ev.time}</span>
                    </div>
                    <h4 className="font-bold text-stone-900 text-sm mt-0.5">{ev.title}</h4>
                    <span className="text-xs text-stone-500">{ev.venue} · {ev.rsvpsCount} RSVPs</span>
                  </div>

                  <button
                    onClick={() => deleteEvent(ev.id)}
                    className="p-1.5 text-red-600 hover:text-red-800 rounded-lg border border-red-200"
                    title="Remove event"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 4. PROJECTS MANAGER */}
      {adminTab === 'projects' && (
        <div className="bg-white rounded-2xl border border-stone-200 p-6 shadow-xs space-y-5">
          <h3 className="font-bold text-stone-900 text-base">Update Church Development Progress & Milestones</h3>

          <form onSubmit={handleUpdateProjectProgress} className="space-y-4 max-w-xl text-xs sm:text-sm">
            <div>
              <label className="block font-semibold text-stone-700 mb-1">Select Church Project</label>
              <select
                value={selectedProjId}
                onChange={(e) => {
                  const pId = e.target.value;
                  setSelectedProjId(pId);
                  const p = projects.find(x => x.id === pId);
                  if (p) setProjProgress(p.progressPercentage);
                }}
                className="w-full p-2.5 rounded-xl border border-stone-200 bg-stone-50 font-medium"
              >
                {projects.map(p => (
                  <option key={p.id} value={p.id}>
                    {p.title} ({p.progressPercentage}% done)
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block font-semibold text-stone-700 mb-1">
                Adjust Overall Progress Percentage: <strong>{projProgress}%</strong>
              </label>
              <input
                type="range"
                min="0"
                max="100"
                value={projProgress}
                onChange={(e) => setProjProgress(Number(e.target.value))}
                className="w-full accent-[#0D472B]"
              />
            </div>

            <div className="pt-2 border-t border-stone-100 space-y-3">
              <h4 className="font-bold text-stone-800 text-xs uppercase tracking-wider">
                Post Leadership Field Progress Update
              </h4>

              <input
                type="text"
                placeholder="Field Update Title (e.g. Electrical Conduit Phase Commenced)"
                value={projUpdateTitle}
                onChange={(e) => setProjUpdateTitle(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-stone-200 bg-stone-50"
              />

              <textarea
                rows={3}
                placeholder="Detailed field observation, achievement or challenge report..."
                value={projUpdateContent}
                onChange={(e) => setProjUpdateContent(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-stone-200 bg-stone-50"
              />
            </div>

            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl bg-[#0D472B] text-white font-semibold hover:bg-[#08301D] transition-colors"
            >
              Update Project Transparency Record
            </button>
          </form>
        </div>
      )}

      {/* 5. MEMBERS ROLL APPROVALS */}
      {adminTab === 'members' && (
        <div className="bg-white rounded-2xl border border-stone-200 p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-bold text-stone-900 text-base">Parish Roll & Member Registrations</h3>
              <p className="text-xs text-stone-500">Review and verify new communicant members</p>
            </div>
            <span className="text-xs font-semibold px-3 py-1 bg-stone-100 rounded-lg">
              {membersList.length} Accounts
            </span>
          </div>

          <div className="divide-y divide-stone-100 text-xs sm:text-sm">
            {membersList.map((m) => (
              <div key={m.id} className="py-3 flex flex-wrap items-center justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-stone-900">{m.fullName}</span>
                    <span className="text-xs font-semibold px-2 py-0.5 rounded bg-stone-100 capitalize">
                      {m.role}
                    </span>
                    {m.isApproved ? (
                      <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded flex items-center gap-1">
                        <Check className="w-3 h-3" />
                        Approved
                      </span>
                    ) : (
                      <span className="text-[11px] font-semibold text-amber-700 bg-amber-50 px-2 py-0.5 rounded">
                        Pending Session Approval
                      </span>
                    )}
                  </div>
                  <div className="text-stone-500 text-xs mt-0.5">
                    {m.congregation} · {m.phoneNumber} · {m.email}
                  </div>
                </div>

                {!m.isApproved && (
                  <button
                    onClick={() => approveMember(m.id)}
                    className="px-3 py-1.5 rounded-lg bg-emerald-600 text-white text-xs font-semibold hover:bg-emerald-700 transition-colors"
                  >
                    Approve Member
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 6. AUDIT LOG */}
      {adminTab === 'audit' && (
        <div className="bg-white rounded-2xl border border-stone-200 p-6 shadow-xs space-y-4">
          <div>
            <h3 className="font-bold text-stone-900 text-base">Administrative Audit Trail</h3>
            <p className="text-xs text-stone-500">Immutable record of all published church records and changes</p>
          </div>

          <div className="divide-y divide-stone-100 text-xs">
            {auditLogs.map((log) => (
              <div key={log.id} className="py-3 space-y-1">
                <div className="flex items-center justify-between text-stone-400">
                  <span className="font-mono text-[11px]">{log.timestamp}</span>
                  <span className="font-semibold text-stone-700">{log.adminName}</span>
                </div>
                <div className="text-stone-900 font-semibold">{log.action}</div>
                <div className="text-stone-600">{log.details}</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
