import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { BibleStudy } from '../types';
import { 
  GraduationCap, 
  BookOpen, 
  CheckCircle2, 
  FileText, 
  Download, 
  Save, 
  MessageSquare, 
  ChevronRight, 
  User, 
  Sparkles,
  Check
} from 'lucide-react';

export const BibleStudiesScreen: React.FC = () => {
  const { 
    bibleStudies, 
    toggleStudyCompleted, 
    saveStudyNotes, 
    selectedStudyId, 
    setSelectedStudyId,
    setActiveTab
  } = useApp();

  const [activeStudy, setActiveStudy] = useState<BibleStudy>(() => {
    if (selectedStudyId) {
      return bibleStudies.find(s => s.id === selectedStudyId) || bibleStudies[0];
    }
    return bibleStudies[0];
  });

  const [noteText, setNoteText] = useState(activeStudy.userNotes || '');
  const [saveAlert, setSaveAlert] = useState(false);
  const [pdfDownloaded, setPdfDownloaded] = useState(false);

  const handleSelectStudy = (st: BibleStudy) => {
    setActiveStudy(st);
    setSelectedStudyId(st.id);
    setNoteText(st.userNotes || '');
  };

  const handleSaveNotes = () => {
    saveStudyNotes(activeStudy.id, noteText);
    setSaveAlert(true);
    setTimeout(() => setSaveAlert(false), 2000);
  };

  const handleDownloadPdf = () => {
    setPdfDownloaded(true);
    setTimeout(() => setPdfDownloaded(false), 2500);
  };

  return (
    <div className="pb-24 max-w-7xl mx-auto px-4 sm:px-6 pt-4 space-y-6">
      {/* Header Banner */}
      <div className="bg-white rounded-2xl p-5 border border-stone-200 shadow-xs flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-lg sm:text-xl font-bold text-stone-900 flex items-center gap-2">
            <GraduationCap className="w-5 h-5 text-[#0D472B]" />
            <span>PCEA Bible Study & Discipleship</span>
          </h1>
          <p className="text-xs text-stone-500 mt-0.5">
            Theological exposition, covenant themes, and small-group discussion questions
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold px-3 py-1 bg-emerald-50 text-emerald-800 rounded-lg">
            Week {activeStudy.weekNumber} · {activeStudy.month}
          </span>
        </div>
      </div>

      {/* Main 2-Column Split: Studies Index on Left, Active Lesson Exposition on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Lesson Directory (4 cols) */}
        <div className="lg:col-span-4 space-y-3">
          <h3 className="text-xs font-bold uppercase tracking-wider text-stone-500 px-1">
            Weekly Discipleship Series
          </h3>

          <div className="space-y-2.5">
            {bibleStudies.map((study) => {
              const isSelected = activeStudy.id === study.id;
              return (
                <div
                  key={study.id}
                  onClick={() => handleSelectStudy(study)}
                  className={`p-4 rounded-2xl border text-left cursor-pointer transition-all ${
                    isSelected
                      ? 'border-[#0D472B] bg-[#0D472B]/5 shadow-xs'
                      : 'border-stone-200 bg-white hover:border-stone-300'
                  }`}
                >
                  <div className="flex items-center justify-between text-[11px] mb-1">
                    <span className="font-bold text-[#0D472B]">Week {study.weekNumber}</span>
                    <span className="text-stone-400">{study.month}</span>
                  </div>

                  <h4 className={`text-xs sm:text-sm font-bold leading-tight ${isSelected ? 'text-[#0D472B]' : 'text-stone-900'}`}>
                    {study.title}
                  </h4>

                  <p className="text-[11px] text-stone-500 mt-1 line-clamp-2">
                    {study.theme}
                  </p>

                  <div className="mt-3 pt-2 border-t border-stone-100 flex items-center justify-between text-[11px]">
                    <span className="text-stone-400">{study.author.split('(')[0]}</span>
                    {study.isCompleted && (
                      <span className="text-emerald-700 font-semibold flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        Completed
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Fellowship Study Cover Graphic Banner */}
          <div className="rounded-2xl border border-stone-200 overflow-hidden bg-stone-900 relative">
            <img
              src="/src/assets/images/pcea_bible_study_fellowship_1792004236094.jpg"
              alt="PCEA Bible Fellowship"
              referrerPolicy="no-referrer"
              className="w-full h-36 object-cover opacity-60"
            />
            <div className="absolute inset-0 p-4 flex flex-col justify-end text-white">
              <span className="text-[10px] uppercase font-bold text-[#E5B83B] tracking-wider">
                Parish Small Groups
              </span>
              <p className="text-xs font-semibold leading-snug">
                Join a midweek district fellowship for in-depth Bible discussion.
              </p>
            </div>
          </div>
        </div>

        {/* Right Column: Detailed Study Guide & Discussion Questions (8 cols) */}
        <div className="lg:col-span-8 space-y-5">
          <div className="bg-white rounded-2xl border border-stone-200 p-6 sm:p-8 shadow-xs space-y-6">
            {/* Header info */}
            <div className="border-b border-stone-100 pb-5 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-[#0D472B] uppercase tracking-wider">
                  Theme: {activeStudy.theme}
                </span>
                <button
                  onClick={() => toggleStudyCompleted(activeStudy.id)}
                  className={`flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg border transition-all ${
                    activeStudy.isCompleted
                      ? 'border-emerald-600 bg-emerald-50 text-emerald-800'
                      : 'border-stone-200 text-stone-600 hover:border-stone-300'
                  }`}
                >
                  <CheckCircle2 className={`w-4 h-4 ${activeStudy.isCompleted ? 'text-emerald-600' : 'text-stone-400'}`} />
                  <span>{activeStudy.isCompleted ? 'Lesson Completed' : 'Mark as Completed'}</span>
                </button>
              </div>

              <h2 className="text-xl sm:text-2xl font-bold text-stone-900 leading-tight">
                {activeStudy.title}
              </h2>

              <div className="flex flex-wrap items-center gap-y-1 gap-x-3 text-xs text-stone-500 pt-1">
                <span>By {activeStudy.author}</span>
                <span aria-hidden="true">·</span>
                <span>{activeStudy.congregation}</span>
              </div>
            </div>

            {/* Scripture Anchor Passages */}
            <div className="p-4 rounded-xl bg-[#0D472B]/5 border border-[#0D472B]/20 space-y-2">
              <div className="flex items-center gap-2 text-xs font-bold text-[#0D472B]">
                <BookOpen className="w-4 h-4 text-[#D4AF37]" />
                <span>PRIMARY SCRIPTURE ANCHOR PASSAGES</span>
              </div>
              <div className="flex flex-wrap gap-2 pt-1">
                {activeStudy.scripturePassages.map((pass, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveTab('bible')}
                    className="px-3 py-1 bg-white rounded-lg border border-stone-200 text-xs font-semibold text-stone-800 hover:border-[#0D472B] hover:text-[#0D472B] transition-colors"
                  >
                    {pass} →
                  </button>
                ))}
              </div>
            </div>

            {/* Exegesis & Study Notes */}
            <div className="space-y-4">
              <h3 className="text-sm font-bold text-stone-900 uppercase tracking-wider">
                Theological Exposition & Practical Insights
              </h3>

              <div className="space-y-3 text-xs sm:text-sm text-stone-700 leading-relaxed font-scripture">
                {activeStudy.studyNotes.map((note, index) => (
                  <p key={index} className="p-3 rounded-xl bg-stone-50 border border-stone-100">
                    {note}
                  </p>
                ))}
              </div>
            </div>

            {/* Discussion Questions */}
            <div className="space-y-3 pt-3 border-t border-stone-100">
              <div className="flex items-center gap-2 text-sm font-bold text-stone-900">
                <MessageSquare className="w-4 h-4 text-[#0D472B]" />
                <span>Small Group & Personal Reflection Questions</span>
              </div>

              <div className="space-y-2.5">
                {activeStudy.discussionQuestions.map((q, qIndex) => (
                  <div key={qIndex} className="p-3.5 rounded-xl border border-stone-200/80 bg-white space-y-1">
                    <span className="text-[11px] font-bold text-[#0D472B] block">
                      QUESTION {qIndex + 1}
                    </span>
                    <p className="text-xs sm:text-sm font-medium text-stone-800 leading-snug">
                      {q}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Personal Study Notes Journal Area */}
            <div className="p-5 rounded-2xl bg-stone-50 border border-stone-200 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-stone-900 uppercase tracking-wide">
                  My Personal Study Notes & Prayer Journal
                </span>
                {saveAlert && (
                  <span className="text-xs text-emerald-700 font-semibold flex items-center gap-1">
                    <Check className="w-3.5 h-3.5" />
                    Notes Saved!
                  </span>
                )}
              </div>

              <textarea
                rows={3}
                placeholder="Write your personal reflections, questions for district elder, or prayers here..."
                value={noteText}
                onChange={(e) => setNoteText(e.target.value)}
                className="w-full p-3 rounded-xl border border-stone-200 bg-white text-xs sm:text-sm focus:outline-hidden focus:ring-2 focus:ring-[#0D472B]/30"
              />

              <div className="flex items-center justify-end">
                <button
                  onClick={handleSaveNotes}
                  className="px-4 py-2 rounded-xl bg-[#0D472B] text-white text-xs font-semibold hover:bg-[#08301D] transition-colors flex items-center gap-1.5"
                >
                  <Save className="w-3.5 h-3.5" />
                  <span>Save My Notes</span>
                </button>
              </div>
            </div>

            {/* Downloadable PDF Outline Utility */}
            <div className="p-4 rounded-xl border border-dashed border-stone-300 flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-stone-500" />
                <div>
                  <span className="font-semibold text-stone-800 block">
                    {activeStudy.pdfAttachmentName || 'PCEA_Study_Guide.pdf'}
                  </span>
                  <span className="text-stone-400 text-[11px]">Print-ready PDF study handout for small groups</span>
                </div>
              </div>

              <button
                onClick={handleDownloadPdf}
                className="py-1.5 px-3 rounded-lg border border-stone-200 hover:bg-stone-50 font-semibold text-stone-700 flex items-center gap-1.5 transition-colors"
              >
                {pdfDownloaded ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Saved!</span>
                  </>
                ) : (
                  <>
                    <Download className="w-3.5 h-3.5" />
                    <span>Download</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
