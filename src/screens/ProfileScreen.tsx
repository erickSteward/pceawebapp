import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  UserCircle, 
  Bookmark, 
  Bell, 
  Shield, 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  LogOut, 
  ChevronRight, 
  Check, 
  Trash2, 
  HelpCircle,
  FileText,
  Lock,
  Music,
  BookOpen
} from 'lucide-react';

export const ProfileScreen: React.FC = () => {
  const { 
    currentUser, 
    activeRole, 
    logout, 
    congregation, 
    bookmarks, 
    toggleBookmark,
    setSelectedHymnId,
    setActiveTab 
  } = useApp();

  const [activeSubTab, setActiveSubTab] = useState<'bookmarks' | 'settings' | 'office'>('bookmarks');
  const [prefAnnouncements, setPrefAnnouncements] = useState(currentUser.notificationPreferences?.announcements ?? true);
  const [prefEvents, setPrefEvents] = useState(currentUser.notificationPreferences?.events ?? true);
  const [prefStudies, setPrefStudies] = useState(currentUser.notificationPreferences?.bibleStudies ?? true);
  const [prefProjects, setPrefProjects] = useState(currentUser.notificationPreferences?.projects ?? true);

  const [showPrivacyModal, setShowPrivacyModal] = useState(false);
  const [securitySaved, setSecuritySaved] = useState(false);

  return (
    <div className="pb-24 max-w-4xl mx-auto px-4 sm:px-6 pt-4 space-y-6">
      {/* Profile Header Card */}
      <div className="bg-white rounded-3xl border border-stone-200 p-6 sm:p-8 shadow-xs flex flex-col sm:flex-row items-center sm:items-start justify-between gap-6 text-center sm:text-left">
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <div className="w-18 h-18 sm:w-20 sm:h-20 rounded-full bg-gradient-to-tr from-[#0D472B] to-[#1e6f47] text-[#E5B83B] flex items-center justify-center font-bold text-2xl border-2 border-[#D4AF37] shadow-sm">
            {currentUser.fullName.charAt(0)}
          </div>

          <div className="space-y-1">
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
              <h1 className="text-xl sm:text-2xl font-bold text-stone-900">
                {currentUser.fullName}
              </h1>
              <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-[#0D472B]/10 text-[#0D472B] capitalize">
                {currentUser.role}
              </span>
            </div>

            <p className="text-xs text-stone-500 font-medium">
              {currentUser.email} · {currentUser.phoneNumber}
            </p>

            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 text-xs text-stone-600 pt-1">
              <span><strong>Congregation:</strong> {currentUser.congregation}</span>
              {currentUser.membershipNumber && (
                <>
                  <span aria-hidden="true">·</span>
                  <span><strong>Member #:</strong> {currentUser.membershipNumber}</span>
                </>
              )}
            </div>
          </div>
        </div>

        <button
          onClick={logout}
          className="px-4 py-2 rounded-xl border border-stone-200 hover:border-red-300 hover:bg-red-50 text-stone-700 hover:text-red-700 text-xs font-semibold flex items-center gap-1.5 transition-colors shrink-0"
        >
          <LogOut className="w-4 h-4" />
          <span>Sign Out</span>
        </button>
      </div>

      {/* Sub Tabs: Bookmarks vs Notifications/Security vs Church Office */}
      <div className="flex items-center p-1 bg-stone-100 rounded-2xl text-xs font-semibold">
        <button
          onClick={() => setActiveSubTab('bookmarks')}
          className={`flex-1 py-2 rounded-xl transition-colors flex items-center justify-center gap-1.5 ${
            activeSubTab === 'bookmarks' ? 'bg-white text-stone-900 shadow-xs' : 'text-stone-500 hover:text-stone-800'
          }`}
        >
          <Bookmark className="w-3.5 h-3.5 text-[#0D472B]" />
          <span>My Saved Bookmarks ({bookmarks.length})</span>
        </button>

        <button
          onClick={() => setActiveSubTab('settings')}
          className={`flex-1 py-2 rounded-xl transition-colors flex items-center justify-center gap-1.5 ${
            activeSubTab === 'settings' ? 'bg-white text-stone-900 shadow-xs' : 'text-stone-500 hover:text-stone-800'
          }`}
        >
          <Bell className="w-3.5 h-3.5 text-[#0D472B]" />
          <span>Alerts & Security</span>
        </button>

        <button
          onClick={() => setActiveSubTab('office')}
          className={`flex-1 py-2 rounded-xl transition-colors flex items-center justify-center gap-1.5 ${
            activeSubTab === 'office' ? 'bg-white text-stone-900 shadow-xs' : 'text-stone-500 hover:text-stone-800'
          }`}
        >
          <Phone className="w-3.5 h-3.5 text-[#0D472B]" />
          <span>Church Office Contacts</span>
        </button>
      </div>

      {/* 1. BOOKMARKS TAB */}
      {activeSubTab === 'bookmarks' && (
        <div className="space-y-4">
          <div className="bg-white rounded-2xl p-5 border border-stone-200 shadow-xs flex items-center justify-between">
            <div>
              <h2 className="text-base font-bold text-stone-900">Saved Hymns & Scripture Passages</h2>
              <p className="text-xs text-stone-500 mt-0.5">Quick access to your favourite worship songs and verses</p>
            </div>
            <span className="text-xs font-semibold px-2.5 py-1 bg-stone-100 text-stone-700 rounded-lg">
              {bookmarks.length} Items
            </span>
          </div>

          {bookmarks.length === 0 ? (
            <div className="p-12 text-center bg-white rounded-2xl border border-stone-200 text-stone-500">
              <Bookmark className="w-10 h-10 mx-auto text-stone-300 mb-2" />
              <p className="text-sm font-medium">No bookmarks saved yet.</p>
              <p className="text-xs text-stone-400 mt-1">Tap the bookmark icon on any hymn or Bible verse to save it here.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {bookmarks.map((bm) => (
                <div
                  key={bm.id}
                  className="bg-white rounded-2xl border border-stone-200 p-4 shadow-xs flex flex-col justify-between hover:border-stone-300 transition-all space-y-3"
                >
                  <div className="space-y-1">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold text-[#0D472B] uppercase tracking-wider flex items-center gap-1">
                        {bm.type === 'hymn' ? <Music className="w-3.5 h-3.5" /> : <BookOpen className="w-3.5 h-3.5" />}
                        {bm.type === 'hymn' ? 'Hymn' : 'Bible Passage'}
                      </span>
                      <span className="text-[11px] text-stone-400">{bm.dateAdded}</span>
                    </div>

                    <h4 className="text-sm font-bold text-stone-900 leading-snug">
                      {bm.title}
                    </h4>
                    <p className="text-xs text-stone-500">{bm.subtitle}</p>

                    <p className="text-xs text-stone-700 italic pt-1 border-t border-stone-100 line-clamp-2">
                      "{bm.snippet}"
                    </p>
                  </div>

                  <div className="pt-2 border-t border-stone-100 flex items-center justify-between text-xs">
                    <button
                      onClick={() => {
                        if (bm.type === 'hymn') {
                          setSelectedHymnId(bm.referenceId);
                          setActiveTab('hymns');
                        } else {
                          setActiveTab('bible');
                        }
                      }}
                      className="text-[#0D472B] font-semibold hover:underline flex items-center gap-1"
                    >
                      <span>Open in Reader</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>

                    <button
                      onClick={() => toggleBookmark({
                        type: bm.type,
                        referenceId: bm.referenceId,
                        title: bm.title,
                        subtitle: bm.subtitle,
                        snippet: bm.snippet
                      })}
                      className="p-1 rounded text-stone-400 hover:text-red-600 transition-colors"
                      title="Remove bookmark"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* 2. SETTINGS & NOTIFICATIONS TAB */}
      {activeSubTab === 'settings' && (
        <div className="space-y-4">
          <div className="bg-white rounded-2xl p-6 border border-stone-200 shadow-xs space-y-5">
            <h2 className="text-base font-bold text-stone-900">Notification Preferences</h2>
            
            <div className="space-y-3">
              <label className="flex items-center justify-between p-3 rounded-xl border border-stone-100 bg-stone-50 cursor-pointer">
                <div>
                  <span className="font-semibold text-stone-900 text-xs sm:text-sm block">Church Bulletins & Pastoral Announcements</span>
                  <span className="text-stone-500 text-xs">Urgent notices and Sunday morning service details</span>
                </div>
                <input
                  type="checkbox"
                  checked={prefAnnouncements}
                  onChange={(e) => setPrefAnnouncements(e.target.checked)}
                  className="w-4 h-4 rounded text-[#0D472B] focus:ring-[#0D472B]"
                />
              </label>

              <label className="flex items-center justify-between p-3 rounded-xl border border-stone-100 bg-stone-50 cursor-pointer">
                <div>
                  <span className="font-semibold text-stone-900 text-xs sm:text-sm block">Fellowship Events & Activities</span>
                  <span className="text-stone-500 text-xs">Reminders for prayer fellowships, Woman’s Guild & PCMF</span>
                </div>
                <input
                  type="checkbox"
                  checked={prefEvents}
                  onChange={(e) => setPrefEvents(e.target.checked)}
                  className="w-4 h-4 rounded text-[#0D472B] focus:ring-[#0D472B]"
                />
              </label>

              <label className="flex items-center justify-between p-3 rounded-xl border border-stone-100 bg-stone-50 cursor-pointer">
                <div>
                  <span className="font-semibold text-stone-900 text-xs sm:text-sm block">Weekly Bible Study Outlines</span>
                  <span className="text-stone-500 text-xs">New study outlines and discussion questions</span>
                </div>
                <input
                  type="checkbox"
                  checked={prefStudies}
                  onChange={(e) => setPrefStudies(e.target.checked)}
                  className="w-4 h-4 rounded text-[#0D472B] focus:ring-[#0D472B]"
                />
              </label>

              <label className="flex items-center justify-between p-3 rounded-xl border border-stone-100 bg-stone-50 cursor-pointer">
                <div>
                  <span className="font-semibold text-stone-900 text-xs sm:text-sm block">Church Development & Construction Progress</span>
                  <span className="text-stone-500 text-xs">Monthly milestone reports and financial disclosures</span>
                </div>
                <input
                  type="checkbox"
                  checked={prefProjects}
                  onChange={(e) => setPrefProjects(e.target.checked)}
                  className="w-4 h-4 rounded text-[#0D472B] focus:ring-[#0D472B]"
                />
              </label>
            </div>
          </div>

          {/* Account Security & Privacy */}
          <div className="bg-white rounded-2xl p-6 border border-stone-200 shadow-xs space-y-4">
            <h2 className="text-base font-bold text-stone-900">Security & Privacy Governance</h2>

            <div className="space-y-3 text-xs sm:text-sm">
              <div className="p-4 rounded-xl border border-stone-200 bg-stone-50 flex items-center justify-between">
                <div>
                  <span className="font-bold text-stone-900 block">Password & Two-Factor Authentication</span>
                  <span className="text-xs text-stone-500">Secured with salt hashing and encrypted session tokens</span>
                </div>
                <button
                  onClick={() => {
                    setSecuritySaved(true);
                    setTimeout(() => setSecuritySaved(false), 2000);
                  }}
                  className="px-3 py-1.5 rounded-lg border border-stone-200 bg-white font-semibold text-stone-700 hover:bg-stone-50"
                >
                  {securitySaved ? 'Updated!' : 'Change Password'}
                </button>
              </div>

              <div className="p-4 rounded-xl border border-stone-200 bg-stone-50 flex items-center justify-between">
                <div>
                  <span className="font-bold text-stone-900 block">Data Protection & Privacy Policy</span>
                  <span className="text-xs text-stone-500">Kenyan Data Protection Act (2019) compliance documentation</span>
                </div>
                <button
                  onClick={() => setShowPrivacyModal(true)}
                  className="px-3 py-1.5 rounded-lg border border-stone-200 bg-white font-semibold text-[#0D472B] hover:bg-stone-50"
                >
                  Read Policy
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 3. CHURCH OFFICE CONTACTS TAB */}
      {activeSubTab === 'office' && (
        <div className="space-y-4">
          <div className="bg-white rounded-2xl p-6 sm:p-8 border border-stone-200 shadow-xs space-y-6">
            <div>
              <h2 className="text-lg font-bold text-stone-900">Parish Secretarial Office</h2>
              <p className="text-xs text-stone-500 mt-0.5">
                Reach out to our Session Clerk, Parish Minister, or Administrative Officers
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm">
              <div className="p-4 rounded-xl bg-stone-50 border border-stone-200 space-y-2">
                <div className="flex items-center gap-2 text-[#0D472B] font-bold">
                  <MapPin className="w-4 h-4" />
                  <span>Physical Parish Office</span>
                </div>
                <p className="text-stone-700 leading-snug">
                  PCEA St. Andrew’s Church Compound,<br />
                  Nyerere Road & State House Road Junction,<br />
                  P.O. Box 41282 - 00100, Nairobi, Kenya
                </p>
              </div>

              <div className="p-4 rounded-xl bg-stone-50 border border-stone-200 space-y-2">
                <div className="flex items-center gap-2 text-[#0D472B] font-bold">
                  <Clock className="w-4 h-4" />
                  <span>Office Operating Hours</span>
                </div>
                <p className="text-stone-700 leading-snug">
                  Monday – Friday: 08:30 AM – 05:00 PM<br />
                  Saturday: 09:00 AM – 01:00 PM (Pastoral inquiries)<br />
                  Sunday: 07:30 AM – 02:00 PM (Services & Vestry)
                </p>
              </div>

              <div className="p-4 rounded-xl bg-stone-50 border border-stone-200 space-y-2">
                <div className="flex items-center gap-2 text-[#0D472B] font-bold">
                  <Phone className="w-4 h-4" />
                  <span>Telephone Lines</span>
                </div>
                <p className="text-stone-700 leading-snug">
                  Parish Reception: +254 (0) 20 272 3840<br />
                  Pastoral Emergency: +254 722 000 111<br />
                  Session Clerk Office: +254 722 000 222
                </p>
              </div>

              <div className="p-4 rounded-xl bg-stone-50 border border-stone-200 space-y-2">
                <div className="flex items-center gap-2 text-[#0D472B] font-bold">
                  <Mail className="w-4 h-4" />
                  <span>Email Communications</span>
                </div>
                <p className="text-stone-700 leading-snug">
                  General inquiries: info@standrewsnairobi.pcea.or.ke<br />
                  Parish Minister: minister@standrewsnairobi.pcea.or.ke<br />
                  General Assembly: headoffice@pcea.or.ke
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Privacy Policy Modal */}
      {showPrivacyModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-stone-200 max-h-[85vh] overflow-y-auto space-y-4">
            <h3 className="text-lg font-bold text-stone-900">PCEA Data Protection & Privacy Notice</h3>
            <div className="text-xs text-stone-600 space-y-2 leading-relaxed">
              <p>
                The Presbyterian Church of East Africa (PCEA) is committed to protecting the sanctity of member information under the provisions of the Kenya Data Protection Act, 2019.
              </p>
              <p>
                <strong>1. Information We Collect:</strong> Member full name, telephone contact, parish congregation, and optional church card number used solely for congregational pastoral care, communion records, and fellowship administration.
              </p>
              <p>
                <strong>2. Guest Privacy:</strong> Visitors using this application in Guest Mode can access hymns, scriptures, and public notices without providing any personal data or registering an account.
              </p>
              <p>
                <strong>3. Non-Disclosure:</strong> Church rolls are never sold, rented, or distributed to third-party commercial marketing entities.
              </p>
            </div>
            <div className="pt-3 border-t border-stone-100 flex justify-end">
              <button
                onClick={() => setShowPrivacyModal(false)}
                className="px-4 py-2 rounded-xl bg-[#0D472B] text-white text-xs font-semibold"
              >
                Close Notice
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
