import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { ChurchEvent } from '../types';
import { 
  Calendar as CalendarIcon, 
  Clock, 
  MapPin, 
  Phone, 
  User, 
  Check, 
  Filter, 
  Search, 
  List, 
  Grid, 
  Image as ImageIcon,
  CheckCircle2,
  Share2
} from 'lucide-react';

export const ActivitiesScreen: React.FC = () => {
  const { events, rsvpEvent, congregation, activeRole, setActiveTab } = useApp();

  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [viewMode, setViewMode] = useState<'list' | 'calendar' | 'gallery'>('list');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMonth, setSelectedMonth] = useState('April 2026');

  const categories = [
    'All',
    'Worship Service',
    "Woman's Guild",
    'PCMF',
    'Youth',
    'Prayer & Fasting'
  ];

  const filteredEvents = useMemo(() => {
    return events.filter(ev => {
      if (activeCategory !== 'All' && ev.category !== activeCategory) {
        return false;
      }
      if (!searchQuery.trim()) return true;
      const q = searchQuery.toLowerCase();
      return (
        ev.title.toLowerCase().includes(q) ||
        ev.venue.toLowerCase().includes(q) ||
        ev.category.toLowerCase().includes(q) ||
        ev.description.toLowerCase().includes(q)
      );
    });
  }, [events, activeCategory, searchQuery]);

  return (
    <div className="pb-24 max-w-7xl mx-auto px-4 sm:px-6 pt-4 space-y-5">
      {/* Header & View Mode Switcher */}
      <div className="bg-white rounded-2xl p-5 border border-stone-200 shadow-xs space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h1 className="text-lg sm:text-xl font-bold text-stone-900 flex items-center gap-2">
              <CalendarIcon className="w-5 h-5 text-[#0D472B]" />
              <span>Church Activities & Calendar</span>
            </h1>
            <p className="text-xs text-stone-500 mt-0.5">
              Worship services, prayer encounters, and ministry fellowships at {congregation}
            </p>
          </div>

          {/* View Mode Toggle */}
          <div className="flex items-center p-1 bg-stone-100 rounded-xl text-xs font-semibold">
            <button
              onClick={() => setViewMode('list')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-colors ${
                viewMode === 'list' ? 'bg-[#0D472B] text-white shadow-xs' : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              <List className="w-3.5 h-3.5" />
              <span>List View</span>
            </button>
            <button
              onClick={() => setViewMode('calendar')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-colors ${
                viewMode === 'calendar' ? 'bg-[#0D472B] text-white shadow-xs' : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              <Grid className="w-3.5 h-3.5" />
              <span>Month Calendar</span>
            </button>
            <button
              onClick={() => setViewMode('gallery')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-colors ${
                viewMode === 'gallery' ? 'bg-[#0D472B] text-white shadow-xs' : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              <ImageIcon className="w-3.5 h-3.5" />
              <span>Photo Gallery</span>
            </button>
          </div>
        </div>

        {/* Search & Category Filter Strip */}
        <div className="space-y-3 pt-3 border-t border-stone-100">
          <div className="relative">
            <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search event by name, venue or group (e.g. Communion, Guild, Youth)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm rounded-xl border border-stone-200 bg-stone-50 focus:outline-hidden focus:ring-2 focus:ring-[#0D472B]/30"
            />
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none text-xs">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`py-1.5 px-3 rounded-lg font-medium whitespace-nowrap transition-colors shrink-0 ${
                  activeCategory === cat
                    ? 'bg-[#0D472B] text-white shadow-xs'
                    : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 1. LIST VIEW */}
      {viewMode === 'list' && (
        <div className="space-y-4">
          {filteredEvents.length === 0 ? (
            <div className="p-12 text-center bg-white rounded-2xl border border-stone-200 text-stone-500">
              <CalendarIcon className="w-10 h-10 mx-auto text-stone-300 mb-2" />
              <p className="text-sm font-medium">No church events found for this filter.</p>
              <p className="text-xs text-stone-400 mt-1">Please check back soon or select another category.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredEvents.map((ev) => (
                <div
                  key={ev.id}
                  className="bg-white rounded-2xl border border-stone-200 p-5 shadow-xs flex flex-col justify-between hover:border-stone-300 transition-all space-y-4"
                >
                  <div className="space-y-2.5">
                    {/* Header tags */}
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-semibold text-[#0D472B] bg-[#0D472B]/5 px-2.5 py-0.5 rounded-md">
                        {ev.category}
                      </span>
                      <span className="font-medium text-stone-500 flex items-center gap-1">
                        <CalendarIcon className="w-3.5 h-3.5" />
                        {ev.date}
                      </span>
                    </div>

                    <h3 className="text-base sm:text-lg font-bold text-stone-900 leading-snug">
                      {ev.title}
                    </h3>

                    <p className="text-xs text-stone-600 leading-relaxed line-clamp-3">
                      {ev.description}
                    </p>

                    {/* Metadata lines: Time & Venue */}
                    <div className="space-y-1.5 pt-2 border-t border-stone-100 text-xs text-stone-600">
                      <div className="flex items-center gap-2">
                        <Clock className="w-3.5 h-3.5 text-stone-400 shrink-0" />
                        <span>{ev.time}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="w-3.5 h-3.5 text-stone-400 shrink-0" />
                        <span>{ev.venue}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <User className="w-3.5 h-3.5 text-stone-400 shrink-0" />
                        <span>Contact: {ev.contactPerson} ({ev.contactPhone})</span>
                      </div>
                    </div>
                  </div>

                  {/* Bottom RSVP bar */}
                  <div className="pt-3 border-t border-stone-100 flex items-center justify-between gap-3 text-xs">
                    <span className="text-stone-500 font-medium">
                      <strong>{ev.rsvpsCount}</strong> members attending
                    </span>

                    <button
                      onClick={() => rsvpEvent(ev.id)}
                      className={`px-4 py-2 rounded-xl font-semibold transition-all flex items-center gap-1.5 shadow-xs ${
                        ev.userRsvpd
                          ? 'bg-emerald-600 text-white'
                          : 'bg-[#0D472B] text-white hover:bg-[#08301D]'
                      }`}
                    >
                      {ev.userRsvpd ? (
                        <>
                          <Check className="w-3.5 h-3.5" />
                          <span>Attending (RSVP'd)</span>
                        </>
                      ) : (
                        <span>Confirm Attendance</span>
                      )}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* 2. CALENDAR MONTH VIEW */}
      {viewMode === 'calendar' && (
        <div className="bg-white rounded-2xl border border-stone-200 p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-stone-100 pb-3">
            <h3 className="font-bold text-stone-900 text-base">Monthly Church Schedule · April 2026</h3>
            <span className="text-xs bg-stone-100 text-stone-700 px-3 py-1 rounded-lg font-medium">
              Eastertide & Revival Season
            </span>
          </div>

          <div className="grid grid-cols-7 gap-2 text-center text-xs font-bold text-stone-400 pb-2">
            <span>SUN</span>
            <span>MON</span>
            <span>TUE</span>
            <span>WED</span>
            <span>THU</span>
            <span>FRI</span>
            <span>SAT</span>
          </div>

          <div className="grid grid-cols-7 gap-2 text-xs">
            {/* Days 1 to 30 */}
            {Array.from({ length: 30 }).map((_, index) => {
              const day = index + 1;
              const dateStr = `2026-04-${day.toString().padStart(2, '0')}`;
              const dayEvents = events.filter(e => e.date === dateStr);
              const isToday = day === 14;

              return (
                <div
                  key={day}
                  className={`min-h-[72px] sm:min-h-[85px] p-1.5 rounded-xl border flex flex-col justify-between transition-colors ${
                    isToday
                      ? 'border-[#0D472B] bg-[#0D472B]/5 font-semibold'
                      : dayEvents.length > 0
                      ? 'border-amber-200 bg-amber-50/40'
                      : 'border-stone-100 bg-stone-50/30'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className={`text-[11px] ${isToday ? 'font-bold text-[#0D472B]' : 'text-stone-700'}`}>
                      {day}
                    </span>
                    {isToday && (
                      <span className="text-[9px] uppercase font-bold text-[#0D472B]">Today</span>
                    )}
                  </div>

                  {dayEvents.length > 0 && (
                    <div className="space-y-1 mt-1">
                      {dayEvents.map(ev => (
                        <div
                          key={ev.id}
                          className="p-1 rounded bg-[#0D472B] text-white text-[9px] leading-tight font-medium truncate"
                          title={ev.title}
                        >
                          {ev.title}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* 3. PHOTO GALLERY OF PAST EVENTS */}
      {viewMode === 'gallery' && (
        <div className="space-y-4">
          <div className="bg-white rounded-2xl p-5 border border-stone-200 shadow-xs">
            <h2 className="text-base font-bold text-stone-900">Approved Church Photo Gallery</h2>
            <p className="text-xs text-stone-500 mt-0.5">
              Moments of worship, Woman’s Guild celebrations, youth camps, and sanctuary development.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-xs">
              <img
                src="/src/assets/images/pcea_sanctuary_interior_1792004234981.jpg"
                alt="Sunday Service Worship"
                referrerPolicy="no-referrer"
                className="w-full h-48 object-cover"
              />
              <div className="p-3 text-xs">
                <h4 className="font-bold text-stone-900">Sunday Holy Communion Worship Service</h4>
                <p className="text-stone-500 mt-0.5">PCEA St. Andrew’s Sanctuary Congregation</p>
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-xs">
              <img
                src="/src/assets/images/pcea_bible_study_fellowship_1792004236094.jpg"
                alt="Bible Fellowship"
                referrerPolicy="no-referrer"
                className="w-full h-48 object-cover"
              />
              <div className="p-3 text-xs">
                <h4 className="font-bold text-stone-900">Youth & Young Adults Fellowship Bible Study</h4>
                <p className="text-stone-500 mt-0.5">Parish Hall Discipleship Class</p>
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-xs">
              <img
                src="/src/assets/images/pcea_community_project_1792004235704.jpg"
                alt="Sanctuary Construction"
                referrerPolicy="no-referrer"
                className="w-full h-48 object-cover"
              />
              <div className="p-3 text-xs">
                <h4 className="font-bold text-stone-900">Parish Hall & Sanctuary Groundbreaking</h4>
                <p className="text-stone-500 mt-0.5">Session Elders & Congregational Committee</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
