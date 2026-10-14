export interface BiblePassage {
  book: string;
  kikuyuBook: string;
  chapter: number;
  verse: number;
  kjv: string;
  web: string;
  kikuyu: string;
}

export interface DailyVerseItem {
  reference: string;
  kikuyuReference: string;
  textEn: string;
  textKi: string;
  translation: string;
  theme: string;
  reflection: string;
  prayer: string;
}

export const DAILY_VERSES: DailyVerseItem[] = [
  {
    reference: 'Psalm 23:1-3',
    kikuyuReference: 'Thaburi 23:1-3',
    textEn: 'The Lord is my shepherd; I shall not want. He maketh me to lie down in green pastures: he leadeth me beside the still waters. He restoreth my soul.',
    textKi: 'Jehova nĩwe Mũrĩithi wakwa; ndigakenera kĩndũ o na kĩmwe. Nĩanjigithagia thĩ kũndũ kũrĩ nyeki ndweku; nĩwe ũndongoragia hĩndĩ ciothe magũrũ-inĩ ma maaĩ me na thayũ. Nĩanjokeragia muoyo wakwa.',
    translation: 'KJV / Ibuku Rĩa Ngai',
    theme: 'Divine Guidance & Provision',
    reflection: 'Even amidst daily anxieties and transitions, our Good Shepherd knows our every path and leads us into restorative stillness and peace.',
    prayer: 'Lord God Almighty, our gentle shepherd, quiet our hearts today. Lead our footsteps, restore our souls, and teach us to trust completely in Your sovereign care. In Jesus’ name, Amen.'
  },
  {
    reference: 'John 3:16',
    kikuyuReference: 'Johana 3:16',
    textEn: 'For God so loved the world, that he gave his only begotten Son, that whosoever believeth in him should not perish, but have everlasting life.',
    textKi: 'Nĩ gũkorũo nĩ ũndũ wa ũrĩa Ngai eendire kĩrĩndĩ gĩa thĩ, nĩwe warutire Mũriũ wake wa kĩmũmwe, nĩguo mũndũ o wothe ũmwĩtĩkĩtie ndakanore, no aakorũo na muoyo wa tene na tene.',
    translation: 'KJV / Ibuku Rĩa Ngai',
    theme: 'God’s Redeeming Love',
    reflection: 'The foundation of the Christian hope is the sacrificial love of God manifested through Jesus Christ our Savior.',
    prayer: 'Loving Heavenly Father, thank You for the indescribable gift of salvation. May Your selfless love shine through everything we do and say today. Amen.'
  },
  {
    reference: 'Philippians 4:6-7',
    kikuyuReference: 'Afilipi 4:6-7',
    textEn: 'Be careful for nothing; but in every thing by prayer and supplication with thanksgiving let your requests be made known unto God. And the peace of God, which passeth all understanding, shall keep your hearts and minds through Christ Jesus.',
    textKi: 'Mũtikamakio nĩ ũndũ o na ũmwe; ĩndĩ maũndũ-inĩ mothe heanagai mabataro manyu kũrĩ Ngai na mahooia, na mathaitha, hamwe na ngatho. Naguo thayũ wa Ngai, ũrĩa ũkĩrĩte ũmenyo wothe wa andũ, nĩũgaatũũria ngoro cianyu na meciria manyu thĩinĩ wa Kristo Jesu.',
    translation: 'KJV / Ibuku Rĩa Ngai',
    theme: 'Overcoming Worry Through Prayer',
    reflection: 'Worry changes nothing, but prayer hands our burdens to the One whose peace surpasses human comprehension.',
    prayer: 'Lord of Peace, take our burdens and anxieties today. Fill our hearts with Your serenity and gratitude. Amen.'
  },
  {
    reference: 'Hebrews 11:1',
    kikuyuReference: 'Ahibirania 11:1',
    textEn: 'Now faith is the substance of things hoped for, the evidence of things not seen.',
    textKi: 'Rĩrĩ, wĩtĩkio nĩ gũkorũo na ma ya maũndũ marĩa merĩgĩrĩirũo, na nĩ kũmenya kũna atĩ maũndũ marĩa matarĩ moneke nĩ marĩ kuo.',
    translation: 'KJV / Ibuku Rĩa Ngai',
    theme: 'Faith in Covenant Promises',
    reflection: 'Faith is not a wishful thought; it is deep spiritual confidence anchored in the unshakeable character and word of God.',
    prayer: 'Lord, strengthen our faith today to walk courageously even when the visible horizon is uncertain. In Christ’s name, Amen.'
  }
];

export interface BibleBookDetail {
  id: string;
  name: string;
  kikuyuName: string;
  testament: 'OT' | 'NT';
  chaptersCount: number;
  availableChapters: number[];
}

export const BIBLE_BOOKS: BibleBookDetail[] = [
  { id: 'GEN', name: 'Genesis', kikuyuName: 'Kĩambĩrĩria', testament: 'OT', chaptersCount: 50, availableChapters: [1, 2] },
  { id: 'PSA', name: 'Psalms', kikuyuName: 'Thaburi', testament: 'OT', chaptersCount: 150, availableChapters: [23, 100, 121] },
  { id: 'PRO', name: 'Proverbs', kikuyuName: 'Thimo', testament: 'OT', chaptersCount: 31, availableChapters: [3] },
  { id: 'ISA', name: 'Isaiah', kikuyuName: 'Isaia', testament: 'OT', chaptersCount: 66, availableChapters: [40, 53] },
  { id: 'MAT', name: 'Matthew', kikuyuName: 'Mathayo', testament: 'NT', chaptersCount: 28, availableChapters: [5, 6] },
  { id: 'JHN', name: 'John', kikuyuName: 'Johana', testament: 'NT', chaptersCount: 21, availableChapters: [1, 3, 14] },
  { id: 'ROM', name: 'Romans', kikuyuName: 'Aroma', testament: 'NT', chaptersCount: 16, availableChapters: [8, 12] },
  { id: 'PHP', name: 'Philippians', kikuyuName: 'Afilipi', testament: 'NT', chaptersCount: 4, availableChapters: [4] },
  { id: 'HEB', name: 'Hebrews', kikuyuName: 'Ahibirania', testament: 'NT', chaptersCount: 13, availableChapters: [11] },
  { id: 'REV', name: 'Revelation', kikuyuName: 'Kũguũrĩrio', testament: 'NT', chaptersCount: 22, availableChapters: [21] }
];

export const SCRIPTURE_DATA: Record<string, Record<number, BiblePassage[]>> = {
  // --- PSALMS (Thaburi) ---
  PSA: {
    23: [
      {
        book: 'Psalms',
        kikuyuBook: 'Thaburi',
        chapter: 23,
        verse: 1,
        kjv: 'The LORD is my shepherd; I shall not want.',
        web: 'Yahweh is my shepherd: I shall lack nothing.',
        kikuyu: 'Jehova nĩwe Mũrĩithi wakwa; ndigakenera kĩndũ o na kĩmwe.'
      },
      {
        book: 'Psalms',
        kikuyuBook: 'Thaburi',
        chapter: 23,
        verse: 2,
        kjv: 'He maketh me to lie down in green pastures: he leadeth me beside the still waters.',
        web: 'He makes me lie down in green pastures. He leads me beside still waters.',
        kikuyu: 'Nĩanjigithagia thĩ kũndũ kũrĩ nyeki ndweku; nĩwe ũndongoragia hĩndĩ ciothe magũrũ-inĩ ma maaĩ me na thayũ.'
      },
      {
        book: 'Psalms',
        kikuyuBook: 'Thaburi',
        chapter: 23,
        verse: 3,
        kjv: 'He restoreth my soul: he leadeth me in the paths of righteousness for his name’s sake.',
        web: 'He restores my soul. He guides me in the paths of righteousness for his name’s sake.',
        kikuyu: 'Nĩanjokeragia muoyo wakwa; akandongoria njĩra-inĩ cia ũthingu nĩ ũndũ wa rĩĩtwa rĩake.'
      },
      {
        book: 'Psalms',
        kikuyuBook: 'Thaburi',
        chapter: 23,
        verse: 4,
        kjv: 'Yea, though I walk through the valley of the shadow of death, I will fear no evil: for thou art with me; thy rod and thy staff they comfort me.',
        web: 'Even though I walk through the valley of the shadow of death, I will fear no evil, for you are with me. Your rod and your staff, they comfort me.',
        kikuyu: 'O na rĩrĩa ndĩgereire mũkuru-inĩ wa kĩruru kĩa gĩkuũ, ndigetiigĩra ũũru o na ũmwe, tondũ wee ũrĩ hamwe na niĩ; rũthanju rwaku na rũthĩĩnjĩro rwaku nĩ kĩũmĩrĩria kĩakwa.'
      },
      {
        book: 'Psalms',
        kikuyuBook: 'Thaburi',
        chapter: 23,
        verse: 5,
        kjv: 'Thou preparest a table before me in the presence of mine enemies: thou anointest my head with oil; my cup runneth over.',
        web: 'You prepare a table before me in the presence of my enemies. You anoint my head with oil. My cup runs over.',
        kikuyu: 'Nĩũmbangagĩria metha mbere ya thũ ciakwa; ũkamenda mũtwe wakwa maguta; gĩkombĩ kĩakwa kĩiyũrĩte kĩgaitĩka.'
      },
      {
        book: 'Psalms',
        kikuyuBook: 'Thaburi',
        chapter: 23,
        verse: 6,
        kjv: 'Surely goodness and mercy shall follow me all the days of my life: and I will dwell in the house of the LORD for ever.',
        web: 'Surely goodness and loving kindness shall follow me all the days of my life, and I will dwell in Yahweh’s house forever.',
        kikuyu: 'Ti-itherũ wega na tha nĩikaangomanagĩria matukũ mothe ma muoyo wakwa; na ngaatũũraga nyũmba-inĩ ya Jehova tene na tene.'
      }
    ],
    100: [
      {
        book: 'Psalms',
        kikuyuBook: 'Thaburi',
        chapter: 100,
        verse: 1,
        kjv: 'Make a joyful noise unto the LORD, all ye lands.',
        web: 'Shout for joy to Yahweh, all you lands!',
        kikuyu: 'Inagĩrai Jehova rwĩmbo rwa gĩkeno, inyuĩ andũ oothe a thĩ!'
      },
      {
        book: 'Psalms',
        kikuyuBook: 'Thaburi',
        chapter: 100,
        verse: 2,
        kjv: 'Serve the LORD with gladness: come before his presence with singing.',
        web: 'Serve Yahweh with gladness. Come before his presence with singing.',
        kikuyu: 'Tungatagĩrai Jehova mwĩ na gĩkeno; ũkai mbere yake mũkĩinaga na gĩkeno.'
      },
      {
        book: 'Psalms',
        kikuyuBook: 'Thaburi',
        chapter: 100,
        verse: 3,
        kjv: 'Know ye that the LORD he is God: it is he that hath made us, and not we ourselves; we are his people, and the sheep of his pasture.',
        web: 'Know that Yahweh, he is God. It is he who has made us, and we are his. We are his people, and the sheep of his pasture.',
        kikuyu: 'Menyagai atĩ Jehova nĩwe Ngai; nĩwe watũmbire, na ithuĩ tũrĩ ake; tũrĩ andũ ake na ng’ondu cia rũũĩ rwake.'
      },
      {
        book: 'Psalms',
        kikuyuBook: 'Thaburi',
        chapter: 100,
        verse: 4,
        kjv: 'Enter into his gates with thanksgiving, and into his courts with praise: be thankful unto him, and bless his name.',
        web: 'Enter into his gates with thanksgiving, and into his courts with praise. Give thanks to him, and bless his name.',
        kikuyu: 'Toonyai ihingo-inĩ ciake mwĩ na ngatho, na nja-inĩ ciake mwĩ na kũmũgooca; mwĩtĩkĩriei wega na mũtĩĩe rĩĩtwa rĩake.'
      },
      {
        book: 'Psalms',
        kikuyuBook: 'Thaburi',
        chapter: 100,
        verse: 5,
        kjv: 'For the LORD is good; his mercy is everlasting; and his truth endureth to all generations.',
        web: 'For Yahweh is good. His loving kindness endures forever, his faithfulness to all generations.',
        kikuyu: 'Tondũ Jehova nĩ mwega; tha ciake nĩ cia gũtũũra nginya tene, na wĩhokeku wake nĩ wa njiarwa oothe.'
      }
    ],
    121: [
      {
        book: 'Psalms',
        kikuyuBook: 'Thaburi',
        chapter: 121,
        verse: 1,
        kjv: 'I will lift up mine eyes unto the hills, from whence cometh my help.',
        web: 'I will lift up my eyes to the hills. Where does my help come from?',
        kikuyu: 'Nĩngũtiira maitho makwa ndore irĩma; ũteithio wakwa uumaga kũ?'
      },
      {
        book: 'Psalms',
        kikuyuBook: 'Thaburi',
        chapter: 121,
        verse: 2,
        kjv: 'My help cometh from the LORD, which made heaven and earth.',
        web: 'My help comes from Yahweh, who made heaven and earth.',
        kikuyu: 'Ũteithio wakwa uumaga kũrĩ Jehova, ũrĩa wombire igũrũ na thĩ.'
      },
      {
        book: 'Psalms',
        kikuyuBook: 'Thaburi',
        chapter: 121,
        verse: 3,
        kjv: 'He will not suffer thy foot to be moved: he that keepeth thee will not slumber.',
        web: 'He will not allow your foot to be moved. He who keeps you will not slumber.',
        kikuyu: 'Ndigatĩka kũgũrũ gwaku gũteere; ũrĩa ũkũgitagĩra ndakomete kana akĩgĩire toro.'
      },
      {
        book: 'Psalms',
        kikuyuBook: 'Thaburi',
        chapter: 121,
        verse: 8,
        kjv: 'The LORD shall preserve thy going out and thy coming in from this time forth, and even for evermore.',
        web: 'Yahweh will keep your going out and your coming in, from this time forth, and forevermore.',
        kikuyu: 'Jehova nĩakũgitagĩra rĩrĩa ũroima na rĩrĩa ũgũcoka, kuuma rĩu nginya tene na tene.'
      }
    ]
  },

  // --- JOHN (Johana) ---
  JHN: {
    1: [
      {
        book: 'John',
        kikuyuBook: 'Johana',
        chapter: 1,
        verse: 1,
        kjv: 'In the beginning was the Word, and the Word was with God, and the Word was God.',
        web: 'In the beginning was the Word, and the Word was with God, and the Word was God.',
        kikuyu: 'Kĩambĩrĩria-inĩ nĩ kwarĩ Kiugo, nakĩo Kiugo kĩarĩ hamwe na Ngai, nakĩo Kiugo kĩarĩ Ngai.'
      },
      {
        book: 'John',
        kikuyuBook: 'Johana',
        chapter: 1,
        verse: 2,
        kjv: 'The same was in the beginning with God.',
        web: 'The same was in the beginning with God.',
        kikuyu: 'Kĩambĩrĩria-inĩ kĩarĩ hamwe na Ngai.'
      },
      {
        book: 'John',
        kikuyuBook: 'Johana',
        chapter: 1,
        verse: 3,
        kjv: 'All things were made by him; and without him was not any thing made that was made.',
        web: 'All things were made through him. Without him was not anything made that has been made.',
        kikuyu: 'Maũndũ mothe moombirũo kũgerera harĩ kĩo; na hatarĩ kĩo gũtirĩ kĩndũ o na kĩmwe gĩombirũo kĩarĩ kuo.'
      },
      {
        book: 'John',
        kikuyuBook: 'Johana',
        chapter: 1,
        verse: 4,
        kjv: 'In him was life; and the life was the light of men.',
        web: 'In him was life, and the life was the light of men.',
        kikuyu: 'Thĩinĩ wa kĩo nĩkwarĩ muoyo; naguo muoyo ũcio nĩguo warĩ ũtheri wa andũ.'
      },
      {
        book: 'John',
        kikuyuBook: 'Johana',
        chapter: 1,
        verse: 5,
        kjv: 'And the light shineth in darkness; and the darkness comprehended it not.',
        web: 'The light shines in the darkness, and the darkness hasn’t overcome it.',
        kikuyu: 'Naguo ũtheri ũcio ũtheragĩra nduma-inĩ, nayo nduma ndĩahotire gũkĩũria.'
      },
      {
        book: 'John',
        kikuyuBook: 'Johana',
        chapter: 1,
        verse: 14,
        kjv: 'And the Word was made flesh, and dwelt among us, (and we beheld his glory, the glory as of the only begotten of the Father,) full of grace and truth.',
        web: 'The Word became flesh, and lived among us. We saw his glory, such glory as of the one and only Son of the Father, full of grace and truth.',
        kikuyu: 'Nakĩo Kiugo kĩu gĩkĩtuĩka mũndũ ũrĩ na mwĩrĩ, gĩgĩtũũra hamwe na ithuĩ. Na tũkĩona riri wake, riri ta wa Mũriũ wa kĩmũmwe wa Ithe, aiyũrĩte wega na ũma.'
      }
    ],
    3: [
      {
        book: 'John',
        kikuyuBook: 'Johana',
        chapter: 3,
        verse: 16,
        kjv: 'For God so loved the world, that he gave his only begotten Son, that whosoever believeth in him should not perish, but have everlasting life.',
        web: 'For God so loved the world, that he gave his one and only Son, that whoever believes in him should not perish, but have eternal life.',
        kikuyu: 'Nĩ gũkorũo nĩ ũndũ wa ũrĩa Ngai eendire kĩrĩndĩ gĩa thĩ, nĩwe warutire Mũriũ wake wa kĩmũmwe, nĩguo mũndũ o wothe ũmwĩtĩkĩtie ndakanore, no aakorũo na muoyo wa tene na tene.'
      },
      {
        book: 'John',
        kikuyuBook: 'Johana',
        chapter: 3,
        verse: 17,
        kjv: 'For God sent not his Son into the world to condemn the world; but that the world through him might be saved.',
        web: 'For God didn’t send his Son into the world to judge the world, but that the world should be saved through him.',
        kikuyu: 'Tondũ Ngai ndaatũmire Mũriũ wake gũka gũtuĩra kĩrĩndĩ gĩa thĩ gĩkuũ, no nĩ nĩgetha gĩhonokio kũgerera harĩ we.'
      }
    ],
    14: [
      {
        book: 'John',
        kikuyuBook: 'Johana',
        chapter: 14,
        verse: 1,
        kjv: 'Let not your heart be troubled: ye believe in God, believe also in me.',
        web: 'Don’t let your heart be troubled. Believe in God. Believe also in me.',
        kikuyu: 'Ngoro cianyu itikanamakio: mwĩtĩkĩtie Ngai, ĩtĩkiai na niĩ o naniĩ.'
      },
      {
        book: 'John',
        kikuyuBook: 'Johana',
        chapter: 14,
        verse: 6,
        kjv: 'Jesus saith unto him, I am the way, the truth, and the life: no man cometh unto the Father, but by me.',
        web: 'Jesus said to him, "I am the way, the truth, and the life. No one comes to the Father, except through me."',
        kikuyu: 'Jesu akĩmwĩra atĩrĩ: "Niĩ nĩ niĩ njĩra, na nĩ niĩ ũma, na nĩ niĩ muoyo; gũtirĩ mũndũ ũngĩthiĩ kũrĩ Awa ategereire harĩ niĩ."'
      },
      {
        book: 'John',
        kikuyuBook: 'Johana',
        chapter: 14,
        verse: 27,
        kjv: 'Peace I leave with you, my peace I give unto you: not as the world giveth, give I unto you. Let not your heart be troubled, neither let it be afraid.',
        web: 'Peace I leave with you. My peace I give to you; not as the world gives, give I to you. Don’t let your heart be troubled, neither let it be afraid.',
        kikuyu: 'Thayũ nĩ ndamũtigĩra; thayũ wakwa mwene nĩguo ndamũhe; ndikũmũhe ta ũrĩa thĩ ĩheaga. Ngoro cianyu itikanamakio, o na itikagĩe guoya.'
      }
    ]
  },

  // --- PHILIPPIANS (Afilipi) ---
  PHP: {
    4: [
      {
        book: 'Philippians',
        kikuyuBook: 'Afilipi',
        chapter: 4,
        verse: 4,
        kjv: 'Rejoice in the Lord alway: and again I say, Rejoice.',
        web: 'Rejoice in the Lord always! Again I will say, Rejoice!',
        kikuyu: 'Gĩkenagĩriai Mwathani hingo ciothe; na ningĩ nĩndacoka kuuga atĩrĩ: Gĩkenagai!'
      },
      {
        book: 'Philippians',
        kikuyuBook: 'Afilipi',
        chapter: 4,
        verse: 6,
        kjv: 'Be careful for nothing; but in every thing by prayer and supplication with thanksgiving let your requests be made known unto God.',
        web: 'In nothing be anxious, but in everything, by prayer and petition with thanksgiving, let your requests be made known to God.',
        kikuyu: 'Mũtikamakio nĩ ũndũ o na ũmwe; ĩndĩ maũndũ-inĩ mothe heanagai mabataro manyu kũrĩ Ngai na mahooia, na mathaitha, hamwe na ngatho.'
      },
      {
        book: 'Philippians',
        kikuyuBook: 'Afilipi',
        chapter: 4,
        verse: 7,
        kjv: 'And the peace of God, which passeth all understanding, shall keep your hearts and minds through Christ Jesus.',
        web: 'And the peace of God, which surpasses all understanding, will guard your hearts and your thoughts in Christ Jesus.',
        kikuyu: 'Naguo thayũ wa Ngai, ũrĩa ũkĩrĩte ũmenyo wothe wa andũ, nĩũgaatũũria ngoro cianyu na meciria manyu thĩinĩ wa Kristo Jesu.'
      },
      {
        book: 'Philippians',
        kikuyuBook: 'Afilipi',
        chapter: 4,
        verse: 13,
        kjv: 'I can do all things through Christ which strengtheneth me.',
        web: 'I can do all things through Christ, who strengthens me.',
        kikuyu: 'Nĩnjũĩ kũhota maũndũ mothe kũgerera harĩ Kristo ũrĩa ũũnyhĩraga hinya.'
      },
      {
        book: 'Philippians',
        kikuyuBook: 'Afilipi',
        chapter: 4,
        verse: 19,
        kjv: 'But my God shall supply all your need according to his riches in glory by Christ Jesus.',
        web: 'My God will supply every need of yours according to his riches in glory in Christ Jesus.',
        kikuyu: 'Nake Ngai wakwa nĩakarihingagia mabataro manyu mothe kũringana na ũtonga wake ũrĩ riri-inĩ thĩinĩ wa Kristo Jesu.'
      }
    ]
  },

  // --- ROMANS (Aroma) ---
  ROM: {
    8: [
      {
        book: 'Romans',
        kikuyuBook: 'Aroma',
        chapter: 8,
        verse: 1,
        kjv: 'There is therefore now no condemnation to them which are in Christ Jesus, who walk not after the flesh, but after the Spirit.',
        web: 'There is therefore now no condemnation to those who are in Christ Jesus, who don’t walk according to the flesh, but according to the Spirit.',
        kikuyu: 'Kwoguo rĩu gũtirĩ ituĩro rĩa gĩkuũ rĩingĩgwa kũrĩ arĩa marĩ thĩinĩ wa Kristo Jesu.'
      },
      {
        book: 'Romans',
        kikuyuBook: 'Aroma',
        chapter: 8,
        verse: 28,
        kjv: 'And we know that all things work together for good to them that love God, to them who are the called according to his purpose.',
        web: 'We know that all things work together for good for those who love God, to those who are called according to his purpose.',
        kikuyu: 'Nĩtũĩ atĩ harĩ arĩa mendete Ngai maũndũ mothe marehanagĩria wega, no o arĩa eetĩtwo kũringana na muoroto wake.'
      },
      {
        book: 'Romans',
        kikuyuBook: 'Aroma',
        chapter: 8,
        verse: 31,
        kjv: 'What shall we then say to these things? If God be for us, who can be against us?',
        web: 'What then shall we say about these things? If God is for us, who can be against us?',
        kikuyu: 'Gũkĩrĩ ũguo-rĩ, tũngiuga atĩa ũhoro-inĩ wa maũndũ macio? Angĩkorũo Ngai arĩ mwena witũ-rĩ, nũũ ũngĩtũrema?'
      },
      {
        book: 'Romans',
        kikuyuBook: 'Aroma',
        chapter: 8,
        verse: 38,
        kjv: 'For I am persuaded, that neither death, nor life, nor angels, nor principalities, nor powers, nor things present, nor things to come,',
        web: 'For I am persuaded that neither death, nor life, nor angels, nor principalities, nor things present, nor things to come, nor powers,',
        kikuyu: 'Tondũ nĩnjũĩ na ma atĩ gĩkuũ, kana muoyo, kana araika, kana maatha ma ngoma, kana maũndũ ma rĩu, kana ma ihinda rĩrĩa rĩrooka,'
      },
      {
        book: 'Romans',
        kikuyuBook: 'Aroma',
        chapter: 8,
        verse: 39,
        kjv: 'Nor height, nor depth, nor any other creature, shall be able to separate us from the love of God, which is in Christ Jesus our Lord.',
        web: 'nor height, nor depth, nor any other created thing, will be able to separate us from the love of God, which is in Christ Jesus our Lord.',
        kikuyu: 'o na kana ũraaya wa igũrũ, kana ũriku wa kũu thĩ, kana kĩndũ kĩngĩ o gĩothe kĩũmbe, gũtirĩ kĩngĩhota gũtũtigithũkania na wendo wa Ngai ũrĩa ũrĩ thĩinĩ wa Kristo Jesu Mwathani witũ.'
      }
    ]
  },

  // --- HEBREWS (Ahibirania) ---
  HEB: {
    11: [
      {
        book: 'Hebrews',
        kikuyuBook: 'Ahibirania',
        chapter: 11,
        verse: 1,
        kjv: 'Now faith is the substance of things hoped for, the evidence of things not seen.',
        web: 'Now faith is the substance of things hoped for, the evidence of things not seen.',
        kikuyu: 'Rĩrĩ, wĩtĩkio nĩ gũkorũo na ma ya maũndũ marĩa merĩgĩrĩirũo, na nĩ kũmenya kũna atĩ maũndũ marĩa matarĩ moneke nĩ marĩ kuo.'
      },
      {
        book: 'Hebrews',
        kikuyuBook: 'Ahibirania',
        chapter: 11,
        verse: 6,
        kjv: 'But without faith it is impossible to please him: for he that cometh to God must believe that he is, and that he is a rewarder of them that diligently seek him.',
        web: 'Without faith it is impossible to be well pleasing to him, for he who comes to God must believe that he exists, and that he is a rewarder of those who seek him.',
        kikuyu: 'Na hatarĩ wĩtĩkio gũtingĩhoteka mũndũ akenie Ngai; tondũ ũrĩa ũrooka kũrĩ Ngai no nginya eetĩkie atĩ Ngai nĩarĩ kuo, na atĩ nĩwe ũtũgaga arĩa mamwethaga na kĩyo.'
      }
    ]
  }
};

export const READING_PLANS = [
  {
    id: 'pcea-annual',
    title: 'PCEA Covenant Journey: 30-Day Spiritual Walk',
    description: 'A curated daily spiritual devotion through Psalms, the Gospels, and Epistles highlighting God’s covenant faithfulness.',
    durationDays: 30,
    currentDay: 14,
    days: [
      { day: 1, title: 'The Lord our Shepherd', readings: ['Psalm 23:1-6', 'John 10:11-18'], completed: true },
      { day: 2, title: 'Praising the Creator', readings: ['Psalm 100:1-5', 'Genesis 1:1-5'], completed: true },
      { day: 3, title: 'The Word Became Flesh', readings: ['John 1:1-14'], completed: true },
      { day: 4, title: 'God’s Sovereign Love', readings: ['John 3:1-21', 'Romans 5:1-8'], completed: true },
      { day: 5, title: 'Peace Over Anxiety', readings: ['Philippians 4:4-9', 'Matthew 6:25-34'], completed: true },
      { day: 6, title: 'The Unshakeable Covenant', readings: ['Romans 8:28-39'], completed: true },
      { day: 7, title: 'Heroes of Faith', readings: ['Hebrews 11:1-16'], completed: true },
      { day: 8, title: 'The Maker of Heaven and Earth', readings: ['Psalm 121:1-8'], completed: true },
      { day: 9, title: 'Christ the True Vine', readings: ['John 15:1-17'], completed: false },
      { day: 10, title: 'Walking in the Spirit', readings: ['Galatians 5:16-26'], completed: false }
    ]
  },
  {
    id: 'psalms-comfort',
    title: 'Thayũ wa Ngai: Psalms of Comfort',
    description: 'Meditations on peace, protection, and restoration for Kikuyu and English readers.',
    durationDays: 14,
    currentDay: 4,
    days: [
      { day: 1, title: 'Thaburi 23: Mwathani nĩ Mũrĩithi', readings: ['Psalm 23'], completed: true },
      { day: 2, title: 'Thaburi 121: Ũteithio Witũ', readings: ['Psalm 121'], completed: true },
      { day: 3, title: 'Thaburi 91: Kũhithwo nĩ Ngai', readings: ['Psalm 91'], completed: true },
      { day: 4, title: 'Thaburi 100: Rwĩmbo rwa Ngatho', readings: ['Psalm 100'], completed: false }
    ]
  }
];
