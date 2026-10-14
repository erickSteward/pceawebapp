import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { ChurchProject } from '../types';
import { 
  TrendingUp, 
  CheckCircle2, 
  Clock, 
  Calendar, 
  FileText, 
  User, 
  AlertTriangle, 
  Check, 
  ChevronRight, 
  Building2,
  DollarSign,
  ArrowUpRight,
  ShieldCheck
} from 'lucide-react';

export const ProjectsScreen: React.FC = () => {
  const { projects, selectedProjectId, setSelectedProjectId, activeRole, setActiveTab } = useApp();

  const [activeProject, setActiveProject] = useState<ChurchProject>(() => {
    if (selectedProjectId) {
      return projects.find(p => p.id === selectedProjectId) || projects[0];
    }
    return projects[0];
  });

  const handleSelect = (p: ChurchProject) => {
    setActiveProject(p);
    setSelectedProjectId(p.id);
  };

  const formatKES = (num: number) => {
    return new Intl.NumberFormat('en-KE', { style: 'currency', currency: 'KES', maximumFractionDigits: 0 }).format(num);
  };

  return (
    <div className="pb-24 max-w-7xl mx-auto px-4 sm:px-6 pt-4 space-y-6">
      {/* Header */}
      <div className="bg-white rounded-2xl p-5 border border-stone-200 shadow-xs flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-lg sm:text-xl font-bold text-stone-900 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-[#0D472B]" />
            <span>Church Projects & Development Transparency</span>
          </h1>
          <p className="text-xs text-stone-500 mt-0.5">
            Verified infrastructure reports, audited expenditures, and milestone timelines
          </p>
        </div>

        {activeRole === 'admin' && (
          <button
            onClick={() => setActiveTab('admin')}
            className="px-3 py-1.5 rounded-xl bg-[#0D472B] text-white text-xs font-semibold hover:bg-[#08301D] transition-colors flex items-center gap-1.5"
          >
            <ShieldCheck className="w-4 h-4 text-[#E5B83B]" />
            <span>Update Project Progress</span>
          </button>
        )}
      </div>

      {/* 2-Column Split: Project Selector & Overview on Left, Comprehensive Project Transparency on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left: Project Cards List (4 cols) */}
        <div className="lg:col-span-4 space-y-3">
          <h3 className="text-xs font-bold uppercase tracking-wider text-stone-500 px-1">
            Parish & Mission Projects ({projects.length})
          </h3>

          <div className="space-y-3">
            {projects.map((proj) => {
              const isSelected = activeProject.id === proj.id;
              return (
                <div
                  key={proj.id}
                  onClick={() => handleSelect(proj)}
                  className={`p-4 rounded-2xl border text-left cursor-pointer transition-all ${
                    isSelected
                      ? 'border-[#0D472B] bg-[#0D472B]/5 shadow-xs'
                      : 'border-stone-200 bg-white hover:border-stone-300'
                  }`}
                >
                  <div className="flex items-center justify-between text-xs mb-1.5">
                    <span className="text-[11px] font-semibold text-[#0D472B] bg-[#0D472B]/10 px-2 py-0.5 rounded">
                      {proj.category}
                    </span>
                    <span className={`text-[11px] font-bold ${
                      proj.status === 'Completed' ? 'text-emerald-700' : 'text-amber-700'
                    }`}>
                      {proj.status}
                    </span>
                  </div>

                  <h4 className={`text-xs sm:text-sm font-bold leading-tight ${isSelected ? 'text-[#0D472B]' : 'text-stone-900'}`}>
                    {proj.title}
                  </h4>

                  <p className="text-[11px] text-stone-400 mt-1 truncate">
                    {proj.congregation}
                  </p>

                  {/* Progress bar */}
                  <div className="mt-3">
                    <div className="flex items-center justify-between text-[11px] mb-1">
                      <span className="text-stone-500 font-medium">Completion</span>
                      <span className="font-bold text-stone-900">{proj.progressPercentage}%</span>
                    </div>
                    <div className="w-full h-1.5 rounded-full bg-stone-100 overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-[#0D472B] to-[#D4AF37] rounded-full"
                        style={{ width: `${proj.progressPercentage}%` }}
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right: Detailed Selected Project Report (8 cols) */}
        <div className="lg:col-span-8 space-y-6">
          <div className="bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-xs">
            {/* Visual Cover Banner with actual photo */}
            <div className="relative h-56 sm:h-64 w-full bg-stone-900">
              <img
                src={activeProject.coverImage}
                alt={activeProject.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent" />
              
              <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                <span className="px-3 py-1 bg-[#0D472B] text-white text-xs font-semibold rounded-lg shadow-sm">
                  {activeProject.category}
                </span>
                <span className="px-3 py-1 bg-white/95 text-stone-900 text-xs font-bold rounded-lg shadow-sm">
                  {activeProject.status}
                </span>
              </div>

              <div className="absolute bottom-4 left-4 right-4 text-white">
                <h2 className="text-lg sm:text-2xl font-bold leading-tight">
                  {activeProject.title}
                </h2>
                <p className="text-xs text-stone-300 mt-1">
                  {activeProject.congregation} · Led by {activeProject.projectLeader}
                </p>
              </div>
            </div>

            <div className="p-6 sm:p-8 space-y-6">
              {/* Progress & Timeline Strip */}
              <div className="p-4 rounded-xl bg-stone-50 border border-stone-200 space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-stone-900 uppercase tracking-wider">
                    Overall Project Completion
                  </span>
                  <span className="text-sm font-bold text-[#0D472B]">{activeProject.progressPercentage}%</span>
                </div>
                <div className="w-full h-3 rounded-full bg-stone-200 overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-[#0D472B] to-[#D4AF37] rounded-full transition-all duration-500"
                    style={{ width: `${activeProject.progressPercentage}%` }}
                  />
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2 text-xs text-stone-600 border-t border-stone-200">
                  <div>
                    <span className="text-stone-400 block text-[10px] uppercase">Commenced</span>
                    <span className="font-semibold text-stone-800">{activeProject.startDate}</span>
                  </div>
                  <div>
                    <span className="text-stone-400 block text-[10px] uppercase">Target Finish</span>
                    <span className="font-semibold text-stone-800">{activeProject.expectedCompletionDate}</span>
                  </div>
                  <div>
                    <span className="text-stone-400 block text-[10px] uppercase">Supervising Body</span>
                    <span className="font-semibold text-stone-800 truncate block">{activeProject.committee}</span>
                  </div>
                  <div>
                    <span className="text-stone-400 block text-[10px] uppercase">Audit Cycle</span>
                    <span className="font-semibold text-emerald-800">Quarterly Verified</span>
                  </div>
                </div>
              </div>

              {/* Financial Disclosure & Budget Summary */}
              <div>
                <h3 className="text-sm font-bold text-stone-900 uppercase tracking-wider mb-3">
                  Approved Financial Summary & Expenditure
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="p-4 rounded-xl border border-stone-200 bg-white">
                    <span className="text-xs text-stone-500 block">Authorized Total Budget</span>
                    <span className="text-lg font-bold text-stone-900 mt-0.5 block">
                      {formatKES(activeProject.approvedBudgetKES)}
                    </span>
                    <span className="text-[11px] text-stone-400 mt-1 block">Approved by Session & Presbytery</span>
                  </div>

                  <div className="p-4 rounded-xl border border-stone-200 bg-white">
                    <span className="text-xs text-stone-500 block">Total Expended to Date</span>
                    <span className="text-lg font-bold text-[#0D472B] mt-0.5 block">
                      {formatKES(activeProject.expenditureKES)}
                    </span>
                    <span className="text-[11px] text-stone-400 mt-1 block">
                      {((activeProject.expenditureKES / activeProject.approvedBudgetKES) * 100).toFixed(1)}% of budget utilized
                    </span>
                  </div>

                  <div className="p-4 rounded-xl border border-stone-200 bg-white">
                    <span className="text-xs text-stone-500 block">Committed Balance</span>
                    <span className="text-lg font-bold text-amber-900 mt-0.5 block">
                      {formatKES(activeProject.approvedBudgetKES - activeProject.expenditureKES)}
                    </span>
                    <span className="text-[11px] text-stone-400 mt-1 block">Reserved for final stages</span>
                  </div>
                </div>
              </div>

              {/* Project Objectives */}
              <div className="space-y-2">
                <h3 className="text-sm font-bold text-stone-900 uppercase tracking-wider">
                  Project Objectives & Scope
                </h3>
                <div className="space-y-2">
                  {activeProject.objectives.map((obj, i) => (
                    <div key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-stone-700">
                      <div className="w-5 h-5 rounded-full bg-emerald-50 text-emerald-800 flex items-center justify-center shrink-0 mt-0.5 text-xs font-bold">
                        {i + 1}
                      </div>
                      <p className="leading-snug">{obj}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Milestones Timeline */}
              <div className="space-y-3 pt-2 border-t border-stone-100">
                <h3 className="text-sm font-bold text-stone-900 uppercase tracking-wider">
                  Construction Milestones & Delivery Schedule
                </h3>

                <div className="space-y-2.5">
                  {activeProject.milestones.map((ms) => (
                    <div 
                      key={ms.id}
                      className={`p-3.5 rounded-xl border flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs ${
                        ms.status === 'Completed'
                          ? 'border-emerald-200 bg-emerald-50/40 text-emerald-950'
                          : ms.status === 'In Progress'
                          ? 'border-amber-200 bg-amber-50/50 text-amber-950'
                          : 'border-stone-200 bg-stone-50 text-stone-600'
                      }`}
                    >
                      <div className="flex items-start gap-2.5">
                        <CheckCircle2 className={`w-4 h-4 shrink-0 mt-0.5 ${
                          ms.status === 'Completed' ? 'text-emerald-700' : ms.status === 'In Progress' ? 'text-amber-700' : 'text-stone-300'
                        }`} />
                        <div>
                          <span className="font-bold block text-xs sm:text-sm leading-snug">{ms.title}</span>
                          <span className="text-[11px] opacity-75 mt-0.5 block">
                            Target Date: {ms.targetDate} {ms.completedDate && `· Completed: ${ms.completedDate}`}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 shrink-0 sm:self-center">
                        <span className="font-bold text-xs">{ms.completionPercentage}%</span>
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                          ms.status === 'Completed' ? 'bg-emerald-200 text-emerald-900' : ms.status === 'In Progress' ? 'bg-amber-200 text-amber-900' : 'bg-stone-200 text-stone-700'
                        }`}>
                          {ms.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Leader Updates & Field Reports */}
              <div className="space-y-3 pt-2 border-t border-stone-100">
                <h3 className="text-sm font-bold text-stone-900 uppercase tracking-wider">
                  Project Leadership Field Updates ({activeProject.updates.length})
                </h3>

                <div className="space-y-3">
                  {activeProject.updates.map((up) => (
                    <div key={up.id} className="p-4 rounded-xl border border-stone-200 bg-stone-50/70 space-y-2 text-xs">
                      <div className="flex items-center justify-between border-b border-stone-200 pb-2">
                        <div>
                          <h4 className="font-bold text-stone-900 text-sm">{up.title}</h4>
                          <span className="text-[11px] text-stone-500">By {up.author} ({up.role})</span>
                        </div>
                        <span className="text-[11px] text-stone-400 font-medium">{up.date}</span>
                      </div>

                      <p className="text-stone-700 leading-relaxed">
                        {up.content}
                      </p>

                      {up.achievements && up.achievements.length > 0 && (
                        <div className="pt-2 border-t border-stone-200/80">
                          <span className="font-semibold text-emerald-800 block mb-1">Key Achievements:</span>
                          <ul className="list-disc list-inside text-stone-600 space-y-0.5 pl-1">
                            {up.achievements.map((ach, idx) => (
                              <li key={idx}>{ach}</li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {up.challenges && up.challenges.length > 0 && (
                        <div className="pt-2 border-t border-stone-200/80">
                          <span className="font-semibold text-amber-800 block mb-1">Challenges & Mitigations:</span>
                          <ul className="list-disc list-inside text-stone-600 space-y-0.5 pl-1">
                            {up.challenges.map((ch, idx) => (
                              <li key={idx}>{ch}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
