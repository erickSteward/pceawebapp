import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { 
  BIBLE_BOOKS, 
  SCRIPTURE_DATA, 
  DAILY_VERSES, 
  READING_PLANS,
  BiblePassage
} from '../data/bibleData';
import { 
  BookOpen, 
  Search, 
  Bookmark, 
  BookmarkCheck, 
  Copy, 
  Check, 
  Share2, 
  ChevronLeft, 
  ChevronRight, 
  Calendar,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  ListOrdered
} from 'lucide-react';

export const BibleScreen: React.FC = () => {
  const { 
    fontSize, 
    toggleBookmark, 
    isBookmarked,
    isDistractionFree,
    setDistractionFree 
  } = useApp();

  // Active Bible state
  const [activeTranslation, setActiveTranslation] = useState<'KJV' | 'WEB' | 'KIKUYU' | 'PARALLEL'>('KIKUYU');
  const [selectedBookId, setSelectedBookId] = useState<string>('PSA');
  const [selectedChapter, setSelectedChapter] = useState<number>(23);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTabMode, setActiveTabMode] = useState<'reader' | 'plans' | 'daily'>('reader');
  const [copiedRef, setCopiedRef] = useState<string | null>(null);

  const currentBook = useMemo(() => {
    return BIBLE_BOOKS.find(b => b.id === selectedBookId) || BIBLE_BOOKS[1]; // Psalms default
  }, [selectedBookId]);

  // Current chapter verses
  const currentVerses: BiblePassage[] = useMemo(() => {
    const bookData = SCRIPTURE_DATA[selectedBookId];
    if (bookData && bookData[selectedChapter]) {
      return bookData[selectedChapter];
    }
    // Fallback if chapter not explicitly present in sample data
    return [
      {
        book: currentBook.name,
        kikuyuBook: currentBook.kikuyuName,
        chapter: selectedChapter,
        verse: 1,
        kjv: 'And God remembered His covenant, and blessed His people with steadfast love.',
        web: 'And God remembered His covenant, and blessed His people with steadfast love.',
        kikuyu: 'Na Ngai akĩririkana kĩrĩkanĩro gĩake, akĩrathima andũ ake na wendo mũrũmu.'
      }
    ];
  }, [selectedBookId, selectedChapter, currentBook]);

  // Search across scripture
  const searchResults = useMemo(() => {
    if (!searchQuery.trim() || searchQuery.length < 2) return [];
    const q = searchQuery.toLowerCase().trim();
    const results: BiblePassage[] = [];

    Object.keys(SCRIPTURE_DATA).forEach(bId => {
      const bookObj = SCRIPTURE_DATA[bId];
      Object.keys(bookObj).forEach(chStr => {
        const chNum = parseInt(chStr, 10);
        bookObj[chNum].forEach(v => {
          if (
            v.kjv.toLowerCase().includes(q) ||
            v.web.toLowerCase().includes(q) ||
            v.kikuyu.toLowerCase().includes(q) ||
            `${v.book} ${v.chapter}:${v.verse}`.toLowerCase().includes(q) ||
            `${v.kikuyuBook} ${v.chapter}:${v.verse}`.toLowerCase().includes(q)
          ) {
            results.push(v);
          }
        });
      });
    });

    return results;
  }, [searchQuery]);

  const copyVerse = (v: BiblePassage) => {
    const ref = `${v.book} ${v.chapter}:${v.verse}`;
    const text = `"${activeTranslation === 'KIKUYU' ? v.kikuyu : v.kjv}" — ${ref} (${activeTranslation === 'KIKUYU' ? 'Ibuku Rĩa Ngai' : 'KJV'})`;
    navigator.clipboard.writeText(text);
    setCopiedRef(ref);
    setTimeout(() => setCopiedRef(null), 2000);
  };

  const handleNextChapter = () => {
    const avail = currentBook.availableChapters;
    const currIdx = avail.indexOf(selectedChapter);
    if (currIdx !== -1 && currIdx < avail.length - 1) {
      setSelectedChapter(avail[currIdx + 1]);
    } else {
      const bookIdx = BIBLE_BOOKS.findIndex(b => b.id === selectedBookId);
      if (bookIdx < BIBLE_BOOKS.length - 1) {
        const nextBook = BIBLE_BOOKS[bookIdx + 1];
        setSelectedBookId(nextBook.id);
        setSelectedChapter(nextBook.availableChapters[0]);
      }
    }
  };

  const handlePrevChapter = () => {
    const avail = currentBook.availableChapters;
    const currIdx = avail.indexOf(selectedChapter);
    if (currIdx > 0) {
      setSelectedChapter(avail[currIdx - 1]);
    } else {
      const bookIdx = BIBLE_BOOKS.findIndex(b => b.id === selectedBookId);
      if (bookIdx > 0) {
        const prevBook = BIBLE_BOOKS[bookIdx - 1];
        setSelectedBookId(prevBook.id);
        setSelectedChapter(prevBook.availableChapters[prevBook.availableChapters.length - 1]);
      }
    }
  };

  return (
    <div className="pb-24 max-w-7xl mx-auto px-4 sm:px-6 pt-4 space-y-5">
      {/* Bible Sub-Navigation / Mode Header */}
      <div className="bg-white rounded-2xl p-4 border border-stone-200 shadow-xs space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h1 className="text-lg font-bold text-stone-900 flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-[#0D472B]" />
              <span>Holy Scriptures · Ibuku Rĩa Ngai</span>
            </h1>
            <p className="text-xs text-stone-500">English (KJV / WEB) & Kikuyu Scripture</p>
          </div>

          {/* Mode Switcher: Reader vs Reading Plans vs Daily Verse */}
          <div className="flex items-center p-1 bg-stone-100 rounded-xl text-xs font-medium">
            <button
              onClick={() => setActiveTabMode('reader')}
              className={`px-3 py-1.5 rounded-lg transition-colors ${
                activeTabMode === 'reader' ? 'bg-[#0D472B] text-white shadow-xs' : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              Scripture Reader
            </button>
            <button
              onClick={() => setActiveTabMode('plans')}
              className={`px-3 py-1.5 rounded-lg transition-colors ${
                activeTabMode === 'plans' ? 'bg-[#0D472B] text-white shadow-xs' : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              Reading Plans
            </button>
            <button
              onClick={() => setActiveTabMode('daily')}
              className={`px-3 py-1.5 rounded-lg transition-colors ${
                activeTabMode === 'daily' ? 'bg-[#0D472B] text-white shadow-xs' : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              Daily Bread
            </button>
          </div>
        </div>

        {/* Translation Selector Tabs */}
        {activeTabMode === 'reader' && (
          <div className="pt-2 border-t border-stone-100 flex flex-wrap items-center justify-between gap-2 text-xs">
            <div className="flex items-center gap-1.5">
              <span className="text-stone-500 font-medium">Translation:</span>
              <button
                onClick={() => setActiveTranslation('KIKUYU')}
                className={`px-2.5 py-1 rounded-lg font-semibold transition-colors ${
                  activeTranslation === 'KIKUYU'
                    ? 'bg-[#0D472B] text-white'
                    : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                }`}
              >
                Ibuku Rĩa Ngai (Gĩkũyũ)
              </button>
              <button
                onClick={() => setActiveTranslation('KJV')}
                className={`px-2.5 py-1 rounded-lg font-semibold transition-colors ${
                  activeTranslation === 'KJV'
                    ? 'bg-[#0D472B] text-white'
                    : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                }`}
              >
                King James (KJV)
              </button>
              <button
                onClick={() => setActiveTranslation('PARALLEL')}
                className={`px-2.5 py-1 rounded-lg font-semibold transition-colors ${
                  activeTranslation === 'PARALLEL'
                    ? 'bg-[#C59B27] text-white'
                    : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                }`}
              >
                Dual Parallel (EN + KI)
              </button>
            </div>

            <div className="text-[11px] text-stone-600 flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-emerald-600" />
              <span>Offline Ready</span>
            </div>
          </div>
        )}
      </div>

      {/* Mode 1: SCRIPTURE READER */}
      {activeTabMode === 'reader' && (
        <div className="space-y-4">
          {/* Navigation Bar: Book Dropdown, Chapter Dropdown, Search */}
          <div className="bg-white rounded-2xl p-3 border border-stone-200 shadow-xs flex flex-wrap items-center justify-between gap-2 text-xs">
            {/* Book & Chapter selection */}
            <div className="flex items-center gap-2 flex-wrap">
              <select
                value={selectedBookId}
                onChange={(e) => {
                  const bId = e.target.value;
                  setSelectedBookId(bId);
                  const b = BIBLE_BOOKS.find(x => x.id === bId);
                  if (b) setSelectedChapter(b.availableChapters[0]);
                }}
                className="py-1.5 px-3 rounded-xl border border-stone-200 bg-stone-50 font-semibold text-stone-900 focus:outline-hidden focus:ring-2 focus:ring-[#0D472B]/30"
              >
                {BIBLE_BOOKS.map(b => (
                  <option key={b.id} value={b.id}>
                    {b.name} ({b.kikuyuName})
                  </option>
                ))}
              </select>

              <select
                value={selectedChapter}
                onChange={(e) => setSelectedChapter(Number(e.target.value))}
                className="py-1.5 px-3 rounded-xl border border-stone-200 bg-stone-50 font-semibold text-stone-900 focus:outline-hidden focus:ring-2 focus:ring-[#0D472B]/30"
              >
                {currentBook.availableChapters.map(ch => (
                  <option key={ch} value={ch}>
                    Chapter {ch}
                  </option>
                ))}
              </select>
            </div>

            {/* Quick search input */}
            <div className="relative min-w-[200px] flex-1 sm:flex-initial">
              <Search className="w-3.5 h-3.5 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search verse text..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-8 pr-3 py-1.5 text-xs rounded-xl border border-stone-200 bg-stone-50 focus:outline-hidden focus:ring-1 focus:ring-[#0D472B]"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-700"
                >
                  ✕
                </button>
              )}
            </div>
          </div>

          {/* If Search is active, show search results */}
          {searchQuery ? (
            <div className="bg-white rounded-2xl border border-stone-200 p-5 shadow-xs space-y-4">
              <div className="flex items-center justify-between text-xs border-b border-stone-100 pb-2">
                <span className="font-semibold text-stone-700">
                  Search Results for "{searchQuery}" ({searchResults.length} matches)
                </span>
                <button
                  onClick={() => setSearchQuery('')}
                  className="text-[#0D472B] font-semibold hover:underline"
                >
                  Clear Search
                </button>
              </div>

              {searchResults.length === 0 ? (
                <div className="p-8 text-center text-stone-500">
                  <p className="text-sm">No passages found with that keyword.</p>
                  <p className="text-xs text-stone-400 mt-1">Try "shepherd", "peace", "thayũ", or "love".</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {searchResults.map((res, i) => (
                    <div 
                      key={i} 
                      onClick={() => {
                        const matchedBook = BIBLE_BOOKS.find(b => b.name === res.book);
                        if (matchedBook) {
                          setSelectedBookId(matchedBook.id);
                          setSelectedChapter(res.chapter);
                        }
                        setSearchQuery('');
                      }}
                      className="p-3 rounded-xl border border-stone-100 bg-stone-50/70 hover:bg-stone-50 hover:border-stone-200 cursor-pointer transition-colors"
                    >
                      <div className="flex items-center justify-between text-xs font-bold text-[#0D472B] mb-1">
                        <span>{res.book} {res.chapter}:{res.verse} · {res.kikuyuBook} {res.chapter}:{res.verse}</span>
                        <span className="text-[10px] text-stone-400">Click to open</span>
                      </div>
                      <p className="text-xs text-stone-800 italic">"{res.kjv}"</p>
                      <p className="text-xs text-stone-600 mt-1">Gĩkũyũ: "{res.kikuyu}"</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ) : (
            /* Scripture Passage Card */
            <div className="bg-white rounded-2xl border border-stone-200 p-6 sm:p-8 shadow-xs space-y-6">
              {/* Passage Title & Chapter Heading */}
              <div className="border-b border-stone-100 pb-4 flex items-center justify-between">
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold text-stone-900">
                    {currentBook.name} {selectedChapter}
                  </h2>
                  <p className="text-xs text-stone-500 mt-0.5">
                    {currentBook.kikuyuName} {selectedChapter} · {activeTranslation === 'KIKUYU' ? 'Ibuku Rĩa Ngai' : activeTranslation === 'KJV' ? 'King James Version' : 'Dual Parallel Reading'}
                  </p>
                </div>

                <div className="flex items-center gap-1.5">
                  <button
                    onClick={handlePrevChapter}
                    className="p-2 rounded-xl border border-stone-200 hover:bg-stone-50 text-stone-600"
                    title="Previous chapter"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button
                    onClick={handleNextChapter}
                    className="p-2 rounded-xl border border-stone-200 hover:bg-stone-50 text-stone-600"
                    title="Next chapter"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Verses List */}
              <div className={`space-y-4 font-scripture leading-relaxed text-stone-800 ${
                fontSize === 'sm' ? 'text-sm' : fontSize === 'md' ? 'text-base' : fontSize === 'lg' ? 'text-lg' : 'text-xl'
              }`}>
                {currentVerses.map((v) => {
                  const refKey = `${selectedBookId}-${v.chapter}-${v.verse}`;
                  const bookmarked = isBookmarked(refKey);

                  return (
                    <div 
                      key={v.verse} 
                      className="group p-2 rounded-xl hover:bg-stone-50/80 transition-colors relative"
                    >
                      <div className="flex items-start gap-2.5">
                        <span className="font-sans text-xs font-bold text-[#0D472B] pt-1 select-none shrink-0 w-6">
                          {v.verse}
                        </span>

                        <div className="flex-1 space-y-2">
                          {activeTranslation === 'KIKUYU' && (
                            <p className="leading-relaxed">
                              {v.kikuyu}
                            </p>
                          )}

                          {activeTranslation === 'KJV' && (
                            <p className="leading-relaxed">
                              {v.kjv}
                            </p>
                          )}

                          {activeTranslation === 'WEB' && (
                            <p className="leading-relaxed">
                              {v.web}
                            </p>
                          )}

                          {activeTranslation === 'PARALLEL' && (
                            <div className="space-y-1.5">
                              <p className="text-stone-900 font-medium">
                                {v.kikuyu}
                              </p>
                              <p className="text-stone-600 text-[0.95em] italic border-l-2 border-[#0D472B]/30 pl-2">
                                {v.kjv}
                              </p>
                            </div>
                          )}
                        </div>

                        {/* Verse Actions: Bookmark & Copy */}
                        <div className="flex items-center gap-1 opacity-80 group-hover:opacity-100 transition-opacity shrink-0 pt-0.5">
                          <button
                            onClick={() => toggleBookmark({
                              type: 'verse',
                              referenceId: refKey,
                              title: `${v.book} ${v.chapter}:${v.verse}`,
                              subtitle: `${v.kikuyuBook} ${v.chapter}:${v.verse}`,
                              snippet: v.kikuyu || v.kjv
                            })}
                            className={`p-1.5 rounded-lg border transition-colors ${
                              bookmarked 
                                ? 'border-[#D4AF37] bg-[#D4AF37]/15 text-[#8B6B15]' 
                                : 'border-stone-200 text-stone-400 hover:text-stone-700'
                            }`}
                            title={bookmarked ? 'Remove bookmark' : 'Bookmark verse'}
                          >
                            {bookmarked ? <BookmarkCheck className="w-3.5 h-3.5" /> : <Bookmark className="w-3.5 h-3.5" />}
                          </button>

                          <button
                            onClick={() => copyVerse(v)}
                            className="p-1.5 rounded-lg border border-stone-200 text-stone-400 hover:text-stone-700 transition-colors"
                            title="Copy verse reference"
                          >
                            {copiedRef === `${v.book} ${v.chapter}:${v.verse}` ? (
                              <Check className="w-3.5 h-3.5 text-emerald-600" />
                            ) : (
                              <Copy className="w-3.5 h-3.5" />
                            )}
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Bottom chapter navigation */}
              <div className="pt-6 border-t border-stone-200 flex items-center justify-between text-xs">
                <button
                  onClick={handlePrevChapter}
                  className="flex items-center gap-1.5 font-semibold text-stone-600 hover:text-[#0D472B] py-2 px-3 rounded-lg hover:bg-stone-50 border border-stone-200"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>Previous Chapter</span>
                </button>

                <span className="text-stone-400 font-medium">
                  {currentBook.name} {selectedChapter}
                </span>

                <button
                  onClick={handleNextChapter}
                  className="flex items-center gap-1.5 font-semibold text-stone-600 hover:text-[#0D472B] py-2 px-3 rounded-lg hover:bg-stone-50 border border-stone-200"
                >
                  <span>Next Chapter</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Mode 2: READING PLANS */}
      {activeTabMode === 'plans' && (
        <div className="space-y-4">
          <div className="bg-white rounded-2xl p-5 border border-stone-200 shadow-xs">
            <h2 className="text-base font-bold text-stone-900">PCEA Daily Scripture Reading Plans</h2>
            <p className="text-xs text-stone-500 mt-0.5">
              Structured devotional reading for spiritual growth and personal sanctification.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {READING_PLANS.map((plan) => (
              <div key={plan.id} className="bg-white rounded-2xl border border-stone-200 p-5 shadow-xs flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between text-xs mb-2">
                    <span className="font-bold text-[#0D472B] uppercase tracking-wider">
                      {plan.durationDays}-Day Journey
                    </span>
                    <span className="text-stone-500 font-medium">Day {plan.currentDay} of {plan.durationDays}</span>
                  </div>

                  <h3 className="font-bold text-stone-900 text-base">{plan.title}</h3>
                  <p className="text-xs text-stone-600 mt-1">{plan.description}</p>

                  <div className="mt-4 space-y-2">
                    <span className="text-[11px] font-bold text-stone-400 uppercase tracking-wider block">
                      Today’s Scripture Schedule
                    </span>
                    {plan.days.slice(0, 4).map((d) => (
                      <div 
                        key={d.day}
                        className={`p-2.5 rounded-xl border flex items-center justify-between text-xs ${
                          d.completed ? 'bg-emerald-50/50 border-emerald-200 text-emerald-900' : 'bg-stone-50 border-stone-200 text-stone-700'
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <CheckCircle2 className={`w-4 h-4 ${d.completed ? 'text-emerald-600' : 'text-stone-300'}`} />
                          <span className="font-semibold">Day {d.day}: {d.title}</span>
                        </div>
                        <span className="text-[11px] text-stone-500">{d.readings.join(', ')}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-5 pt-4 border-t border-stone-100">
                  <button
                    onClick={() => {
                      setSelectedBookId('PSA');
                      setSelectedChapter(23);
                      setActiveTabMode('reader');
                    }}
                    className="w-full py-2.5 rounded-xl bg-[#0D472B] text-white text-xs font-semibold hover:bg-[#08301D] transition-colors flex items-center justify-center gap-1.5"
                  >
                    <span>Continue Today’s Reading</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Mode 3: DAILY BREAD DEVOTIONALS */}
      {activeTabMode === 'daily' && (
        <div className="space-y-4">
          <div className="bg-white rounded-2xl p-5 border border-stone-200 shadow-xs">
            <h2 className="text-base font-bold text-stone-900">Daily Bread & Devotional Reflections</h2>
            <p className="text-xs text-stone-500 mt-0.5">
              Scripture meditation, exegesis, and pastoral prayers for each morning.
            </p>
          </div>

          <div className="space-y-4">
            {DAILY_VERSES.map((item, idx) => (
              <div key={idx} className="bg-white rounded-2xl border border-stone-200 p-6 shadow-xs space-y-4">
                <div className="flex items-center justify-between border-b border-stone-100 pb-3">
                  <div>
                    <span className="text-xs font-bold text-[#0D472B] uppercase tracking-wider">
                      {item.theme}
                    </span>
                    <h3 className="text-lg font-bold text-stone-900 mt-0.5">
                      {item.reference} · {item.kikuyuReference}
                    </h3>
                  </div>
                  <span className="text-xs bg-stone-100 text-stone-700 px-2.5 py-1 rounded-md font-medium">
                    {item.translation}
                  </span>
                </div>

                <div className="space-y-2 font-scripture">
                  <p className="text-stone-900 text-base sm:text-lg italic leading-relaxed">
                    "{item.textEn}"
                  </p>
                  <p className="text-stone-700 text-sm leading-relaxed border-t border-stone-100 pt-2">
                    Gĩkũyũ: "{item.textKi}"
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-stone-50 border border-stone-200 space-y-2 text-xs">
                  <div>
                    <span className="font-bold text-stone-900 block mb-1">Devotional Reflection:</span>
                    <p className="text-stone-600 leading-relaxed">{item.reflection}</p>
                  </div>
                  <div className="border-t border-stone-200 pt-2 mt-2">
                    <span className="font-bold text-[#0D472B] block mb-1">Morning Prayer:</span>
                    <p className="text-stone-700 italic leading-relaxed">{item.prayer}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
