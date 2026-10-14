import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { HYMNS_DATA } from '../data/hymnsData';
import { Hymn } from '../types';
import { 
  Search, 
  Bookmark, 
  BookmarkCheck, 
  Maximize2, 
  Minimize2, 
  Music, 
  Play, 
  Pause, 
  Copy, 
  Check, 
  Share2, 
  ChevronLeft, 
  ChevronRight, 
  Type,
  BookOpen,
  Filter
} from 'lucide-react';

export const HymnsScreen: React.FC = () => {
  const { 
    fontSize, 
    setFontSize, 
    isDistractionFree, 
    setDistractionFree, 
    selectedHymnId, 
    setSelectedHymnId,
    toggleBookmark,
    isBookmarked
  } = useApp();

  const [activeCollection, setActiveCollection] = useState<'all' | 'golden_bells' | 'nyimbo_cia_kuinira_ngai'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOrder, setSortOrder] = useState<'number' | 'alpha'>('number');
  const [activeHymn, setActiveHymn] = useState<Hymn | null>(() => {
    if (selectedHymnId) {
      return HYMNS_DATA.find(h => h.id === selectedHymnId) || HYMNS_DATA[0];
    }
    return null;
  });

  const [copied, setCopied] = useState(false);
  const [isPlayingTune, setIsPlayingTune] = useState(false);
  const [showOnlyBookmarks, setShowOnlyBookmarks] = useState(false);

  // If selectedHymnId changes from context
  React.useEffect(() => {
    if (selectedHymnId) {
      const found = HYMNS_DATA.find(h => h.id === selectedHymnId);
      if (found) setActiveHymn(found);
    }
  }, [selectedHymnId]);

  // Filtered hymns
  const filteredHymns = useMemo(() => {
    return HYMNS_DATA.filter(hymn => {
      // Collection filter
      if (activeCollection !== 'all' && hymn.collection !== activeCollection) {
        return false;
      }
      // Bookmarks filter
      if (showOnlyBookmarks && !isBookmarked(hymn.id)) {
        return false;
      }
      // Query filter
      if (!searchQuery.trim()) return true;

      const q = searchQuery.toLowerCase().trim();
      const numMatch = hymn.number.toString() === q || `hymn ${hymn.number}`.includes(q) || `rwĩmbo ${hymn.number}`.includes(q);
      const titleMatch = hymn.title.toLowerCase().includes(q) || (hymn.alternateTitle && hymn.alternateTitle.toLowerCase().includes(q));
      const categoryMatch = hymn.category.toLowerCase().includes(q);
      const lyricsMatch = hymn.verses.some(v => v.toLowerCase().includes(q)) || (hymn.chorus && hymn.chorus.toLowerCase().includes(q));

      return numMatch || titleMatch || categoryMatch || lyricsMatch;
    }).sort((a, b) => {
      if (sortOrder === 'number') {
        if (a.collection !== b.collection) {
          return a.collection.localeCompare(b.collection);
        }
        return a.number - b.number;
      } else {
        return a.title.localeCompare(b.title);
      }
    });
  }, [activeCollection, searchQuery, sortOrder, showOnlyBookmarks, isBookmarked]);

  const copyLyrics = (hymn: Hymn) => {
    const text = `${hymn.title} (${hymn.collection === 'golden_bells' ? 'Golden Bells #' + hymn.number : 'Nyimbo cia Kuinira Ngai #' + hymn.number})\n\n` +
      hymn.verses.map((v, i) => `Verse ${i + 1}:\n${v}`).join('\n\n') +
      (hymn.chorus ? `\n\nChorus:\n${hymn.chorus}` : '');

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const currentBookmarked = activeHymn ? isBookmarked(activeHymn.id) : false;

  // Next / Previous hymn navigation in reader
  const handleNavHymn = (direction: 'next' | 'prev') => {
    if (!activeHymn) return;
    const currentIndex = filteredHymns.findIndex(h => h.id === activeHymn.id);
    if (currentIndex === -1) return;

    if (direction === 'next' && currentIndex < filteredHymns.length - 1) {
      setActiveHymn(filteredHymns[currentIndex + 1]);
    } else if (direction === 'prev' && currentIndex > 0) {
      setActiveHymn(filteredHymns[currentIndex - 1]);
    }
  };

  return (
    <div className={`pb-24 max-w-7xl mx-auto px-4 sm:px-6 pt-4 ${isDistractionFree ? 'fixed inset-0 z-50 bg-[#FBFBF9] p-4 sm:p-8 overflow-y-auto' : ''}`}>
      {/* Distraction Free Top Bar */}
      {isDistractionFree && activeHymn && (
        <div className="max-w-2xl mx-auto flex items-center justify-between pb-4 mb-4 border-b border-stone-200">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-[#0D472B] uppercase tracking-wider">
              Worship Mode · {activeHymn.collection === 'golden_bells' ? 'Golden Bells' : 'Nyimbo cia Ngai'} #{activeHymn.number}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <div className="flex items-center bg-stone-100 rounded-lg p-0.5">
              {(['sm', 'md', 'lg', 'xl'] as const).map(sz => (
                <button
                  key={sz}
                  onClick={() => setFontSize(sz)}
                  className={`px-2 py-1 text-xs font-semibold rounded-md ${fontSize === sz ? 'bg-white text-stone-900 shadow-xs' : 'text-stone-500'}`}
                >
                  {sz.toUpperCase()}
                </button>
              ))}
            </div>

            <button
              onClick={() => setDistractionFree(false)}
              className="px-3 py-1.5 rounded-lg bg-stone-200 hover:bg-stone-300 text-xs font-semibold text-stone-800 flex items-center gap-1"
            >
              <Minimize2 className="w-3.5 h-3.5" />
              <span>Exit Worship Mode</span>
            </button>
          </div>
        </div>
      )}

      {/* Main Container Layout: If activeHymn is selected on mobile/desktop */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Hymn Browser & List (Hidden on mobile if reading hymn, unless distraction-free is toggled off) */}
        <div className={`${activeHymn && !isDistractionFree ? 'hidden lg:block' : ''} ${isDistractionFree ? 'hidden' : 'lg:col-span-5'} space-y-4`}>
          {/* Header Card */}
          <div className="bg-white rounded-2xl p-4 border border-stone-200 shadow-xs space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-lg font-bold text-stone-900">PCEA Hymn Library</h1>
                <p className="text-xs text-stone-500">Golden Bells & Nyimbo cia Kuinira Ngai</p>
              </div>
              <span className="text-xs font-semibold px-2.5 py-1 bg-stone-100 rounded-lg text-stone-700">
                {filteredHymns.length} Hymns
              </span>
            </div>

            {/* Search Input */}
            <div className="relative">
              <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search number, title, or lyrics (e.g. 48, Assurance, Thaburi)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 text-xs sm:text-sm rounded-xl border border-stone-200 focus:outline-hidden focus:ring-2 focus:ring-[#0D472B]/30 focus:border-[#0D472B] bg-stone-50"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-700 text-xs font-bold"
                >
                  ✕
                </button>
              )}
            </div>

            {/* Collection Filter Buttons */}
            <div className="flex items-center gap-1.5 p-1 bg-stone-100 rounded-xl">
              <button
                onClick={() => setActiveCollection('all')}
                className={`flex-1 py-1.5 text-xs font-medium rounded-lg transition-colors ${
                  activeCollection === 'all' ? 'bg-white text-stone-900 shadow-xs' : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                All ({HYMNS_DATA.length})
              </button>
              <button
                onClick={() => setActiveCollection('golden_bells')}
                className={`flex-1 py-1.5 text-xs font-medium rounded-lg transition-colors ${
                  activeCollection === 'golden_bells' ? 'bg-[#0D472B] text-white shadow-xs' : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                Golden Bells
              </button>
              <button
                onClick={() => setActiveCollection('nyimbo_cia_kuinira_ngai')}
                className={`flex-1 py-1.5 text-xs font-medium rounded-lg transition-colors ${
                  activeCollection === 'nyimbo_cia_kuinira_ngai' ? 'bg-[#C59B27] text-white shadow-xs' : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                Nyimbo cia Ngai
              </button>
            </div>

            {/* Secondary Controls: Bookmarks toggle & Sorting */}
            <div className="flex items-center justify-between text-xs pt-1 border-t border-stone-100">
              <button
                onClick={() => setShowOnlyBookmarks(!showOnlyBookmarks)}
                className={`flex items-center gap-1 px-2.5 py-1 rounded-md transition-colors ${
                  showOnlyBookmarks ? 'bg-[#D4AF37]/20 text-[#8B6B15] font-semibold' : 'text-stone-500 hover:text-stone-800'
                }`}
              >
                <Bookmark className="w-3.5 h-3.5" />
                <span>Favourites</span>
              </button>

              <div className="flex items-center gap-1 text-stone-500">
                <span>Order:</span>
                <button
                  onClick={() => setSortOrder('number')}
                  className={`px-1.5 py-0.5 rounded ${sortOrder === 'number' ? 'font-bold text-[#0D472B]' : 'hover:text-stone-800'}`}
                >
                  By #
                </button>
                <span>·</span>
                <button
                  onClick={() => setSortOrder('alpha')}
                  className={`px-1.5 py-0.5 rounded ${sortOrder === 'alpha' ? 'font-bold text-[#0D472B]' : 'hover:text-stone-800'}`}
                >
                  A–Z
                </button>
              </div>
            </div>
          </div>

          {/* Hymns List */}
          <div className="space-y-2 max-h-[calc(100vh-280px)] overflow-y-auto pr-1">
            {filteredHymns.length === 0 ? (
              <div className="p-8 text-center bg-white rounded-2xl border border-stone-200 text-stone-500">
                <Music className="w-8 h-8 mx-auto text-stone-300 mb-2" />
                <p className="text-sm font-medium">No hymns found matching your search</p>
                <p className="text-xs text-stone-400 mt-1">Try another title keyword or hymn number</p>
              </div>
            ) : (
              filteredHymns.map((hymn) => {
                const isSelected = activeHymn?.id === hymn.id;
                const bookmarked = isBookmarked(hymn.id);
                return (
                  <div
                    key={hymn.id}
                    onClick={() => {
                      setActiveHymn(hymn);
                      setSelectedHymnId(hymn.id);
                    }}
                    className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer flex items-center justify-between gap-3 ${
                      isSelected
                        ? 'border-[#0D472B] bg-[#0D472B]/5 shadow-xs'
                        : 'border-stone-200/90 bg-white hover:border-stone-300 hover:bg-stone-50/50'
                    }`}
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div className={`w-9 h-9 rounded-lg flex items-center justify-center font-bold text-xs shrink-0 ${
                        hymn.collection === 'golden_bells' 
                          ? 'bg-emerald-50 text-[#0D472B]' 
                          : 'bg-amber-50 text-[#8B6B15]'
                      }`}>
                        #{hymn.number}
                      </div>

                      <div className="min-w-0">
                        <h4 className={`text-xs sm:text-sm font-semibold truncate ${isSelected ? 'text-[#0D472B]' : 'text-stone-900'}`}>
                          {hymn.title}
                        </h4>
                        <div className="flex items-center gap-2 text-[11px] text-stone-400 mt-0.5 truncate">
                          <span>{hymn.collection === 'golden_bells' ? 'Golden Bells' : 'Nyimbo cia Ngai'}</span>
                          <span aria-hidden="true">·</span>
                          <span className="truncate">{hymn.category}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-1.5 shrink-0">
                      {bookmarked && (
                        <BookmarkCheck className="w-4 h-4 text-[#D4AF37]" />
                      )}
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Right Column / Dedicated Reader View */}
        {activeHymn ? (
          <div className={`${isDistractionFree ? 'max-w-2xl mx-auto w-full' : 'lg:col-span-7'} space-y-4`}>
            {/* Mobile Back to List Button (Visible only on mobile when reader is open) */}
            <div className="flex items-center justify-between lg:hidden mb-1">
              <button
                onClick={() => setActiveHymn(null)}
                className="flex items-center gap-1 text-xs font-semibold text-[#0D472B] py-1.5 px-3 rounded-lg bg-white border border-stone-200"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Back to Hymn List</span>
              </button>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleNavHymn('prev')}
                  className="p-1.5 rounded-lg border border-stone-200 bg-white text-stone-600 hover:bg-stone-50"
                  title="Previous hymn"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleNavHymn('next')}
                  className="p-1.5 rounded-lg border border-stone-200 bg-white text-stone-600 hover:bg-stone-50"
                  title="Next hymn"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Hymn Presentation Card */}
            <div className="bg-white rounded-2xl border border-stone-200 p-5 sm:p-7 shadow-xs space-y-6">
              {/* Hymn Header & Meta */}
              <div className="border-b border-stone-100 pb-4">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2 text-xs font-semibold text-[#0D472B] uppercase tracking-wider mb-1">
                      <span>{activeHymn.collection === 'golden_bells' ? 'Golden Bells' : 'Nyimbo cia Kuinira Ngai'} #{activeHymn.number}</span>
                      <span aria-hidden="true">·</span>
                      <span className="text-stone-400 font-normal">{activeHymn.language}</span>
                    </div>
                    <h2 className="text-xl sm:text-2xl font-bold text-stone-900 leading-tight">
                      {activeHymn.title}
                    </h2>
                    {activeHymn.alternateTitle && (
                      <p className="text-xs text-stone-500 italic mt-0.5">
                        {activeHymn.alternateTitle}
                      </p>
                    )}
                  </div>

                  {/* Actions: Bookmark, Copy, Fullscreen */}
                  <div className="flex items-center gap-1.5 shrink-0">
                    <button
                      onClick={() => toggleBookmark({
                        type: 'hymn',
                        referenceId: activeHymn.id,
                        title: activeHymn.title,
                        subtitle: `${activeHymn.collection === 'golden_bells' ? 'Golden Bells' : 'Nyimbo cia Ngai'} #${activeHymn.number}`,
                        snippet: activeHymn.verses[0].slice(0, 80) + '...'
                      })}
                      className={`w-9 h-9 rounded-xl border flex items-center justify-center transition-colors ${
                        currentBookmarked 
                          ? 'border-[#D4AF37] bg-[#D4AF37]/15 text-[#8B6B15]' 
                          : 'border-stone-200 text-stone-500 hover:text-stone-800 hover:bg-stone-50'
                      }`}
                      title={currentBookmarked ? 'Remove Favourite' : 'Add to Favourites'}
                    >
                      {currentBookmarked ? <BookmarkCheck className="w-4 h-4" /> : <Bookmark className="w-4 h-4" />}
                    </button>

                    <button
                      onClick={() => copyLyrics(activeHymn)}
                      className="w-9 h-9 rounded-xl border border-stone-200 flex items-center justify-center text-stone-500 hover:text-stone-800 hover:bg-stone-50 transition-colors"
                      title="Copy hymn lyrics"
                    >
                      {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                    </button>

                    <button
                      onClick={() => setDistractionFree(!isDistractionFree)}
                      className="w-9 h-9 rounded-xl border border-stone-200 flex items-center justify-center text-stone-500 hover:text-stone-800 hover:bg-stone-50 transition-colors"
                      title="Worship Mode (Distraction-Free)"
                    >
                      {isDistractionFree ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                {/* Sub-meta details: Tune, Author, Scripture */}
                <div className="flex flex-wrap items-center gap-y-1 gap-x-3 text-xs text-stone-500 mt-3 pt-3 border-t border-stone-100">
                  {activeHymn.author && (
                    <span><strong>Author:</strong> {activeHymn.author}</span>
                  )}
                  {activeHymn.tune && (
                    <>
                      <span aria-hidden="true">·</span>
                      <span><strong>Tune:</strong> {activeHymn.tune}</span>
                    </>
                  )}
                  {activeHymn.key && (
                    <>
                      <span aria-hidden="true">·</span>
                      <span><strong>Key:</strong> {activeHymn.key}</span>
                    </>
                  )}
                  {activeHymn.scriptureReference && (
                    <>
                      <span aria-hidden="true">·</span>
                      <span><strong>Scripture:</strong> {activeHymn.scriptureReference}</span>
                    </>
                  )}
                </div>
              </div>

              {/* Sing-Along Tune & Tempo Preview Player Bar */}
              <div className="p-3 bg-stone-50 rounded-xl border border-stone-200 flex items-center justify-between gap-3 text-xs">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setIsPlayingTune(!isPlayingTune)}
                    className="w-8 h-8 rounded-full bg-[#0D472B] text-white flex items-center justify-center hover:bg-[#08301D] transition-colors"
                    title="Play rehearsal rhythm"
                  >
                    {isPlayingTune ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 ml-0.5" />}
                  </button>
                  <div>
                    <span className="font-semibold text-stone-900 block leading-tight">
                      Sing-Along Rhythm & Pitch Reference
                    </span>
                    <span className="text-[11px] text-stone-500">
                      {isPlayingTune ? 'Playing church rhythm (4/4 tempo)...' : `Key of ${activeHymn.key || 'C Major'}`}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 text-stone-400">
                  <span className="text-[10px] uppercase font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded">
                    Verified Hymnal Text
                  </span>
                </div>
              </div>

              {/* Hymn Stanzas & Verses Content */}
              <div className={`space-y-6 font-scripture ${
                fontSize === 'sm' ? 'text-sm' : fontSize === 'md' ? 'text-base' : fontSize === 'lg' ? 'text-lg' : 'text-xl'
              } text-stone-800 leading-relaxed`}>
                {activeHymn.verses.map((verseText, idx) => (
                  <div key={idx} className="space-y-2">
                    <span className="text-xs font-sans font-bold text-stone-400 block tracking-wider">
                      VERSE {idx + 1}
                    </span>
                    <div className="whitespace-pre-line pl-1">
                      {verseText}
                    </div>

                    {/* Interspersed Chorus if available */}
                    {activeHymn.chorus && (
                      <div className="mt-4 p-4 rounded-xl bg-amber-50/70 border border-amber-200/60 my-3">
                        <span className="text-[11px] font-sans font-bold text-[#8B6B15] block uppercase tracking-wider mb-1">
                          CHORUS · RWĨMBO RWA GŨCOKERIA
                        </span>
                        <div className="whitespace-pre-line text-stone-900 font-medium italic">
                          {activeHymn.chorus}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Desktop Next/Previous navigation */}
              <div className="pt-6 border-t border-stone-200 flex items-center justify-between text-xs">
                <button
                  onClick={() => handleNavHymn('prev')}
                  className="flex items-center gap-1.5 font-semibold text-stone-600 hover:text-[#0D472B] py-2 px-3 rounded-lg hover:bg-stone-50 border border-stone-200"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>Previous Hymn</span>
                </button>

                <span className="text-stone-400">
                  Presbyterian Church of East Africa
                </span>

                <button
                  onClick={() => handleNavHymn('next')}
                  className="flex items-center gap-1.5 font-semibold text-stone-600 hover:text-[#0D472B] py-2 px-3 rounded-lg hover:bg-stone-50 border border-stone-200"
                >
                  <span>Next Hymn</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="hidden lg:flex lg:col-span-7 bg-white rounded-2xl border border-stone-200 p-12 flex-col items-center justify-center text-center text-stone-500 shadow-xs">
            <Music className="w-12 h-12 text-stone-300 mb-3" />
            <h3 className="text-base font-bold text-stone-800">Select a Hymn to View Lyrics</h3>
            <p className="text-xs text-stone-500 max-w-sm mt-1">
              Choose from Golden Bells English hymns or Nyimbo cia Kuinira Ngai Kikuyu hymnal to start singing.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
