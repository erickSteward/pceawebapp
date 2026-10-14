import {
  ChurchEvent,
  BibleStudy,
  ChurchProject,
  Announcement,
  UserProfile,
  AuditLog
} from '../types';

export const CONGREGATIONS = [
  'PCEA St. Andrew’s Church (Nairobi)',
  'PCEA Chogoria Parish (Meru)',
  'PCEA Thika Parish (Kiambu)',
  'PCEA Ngong Parish (Kajiado)',
  'PCEA Mombasa Town (Coast)',
  'PCEA Nakuru West Parish',
  'PCEA Nyeri Town Parish',
  'PCEA Kasarani Parish (Nairobi)'
];

export const INITIAL_PROJECTS: ChurchProject[] = [
  {
    id: 'proj-1',
    title: 'New Sanctuary & Community Outreach Hall',
    congregation: 'PCEA St. Andrew’s Church (Nairobi)',
    category: 'Sanctuary Construction',
    coverImage: '/src/assets/images/pcea_community_project_1792004235704.jpg',
    objectives: [
      'Expand sanctuary seating capacity from 1,200 to 2,800 worshippers.',
      'Construct a dedicated multipurpose hall for youth, Woman’s Guild, and community skills seminars.',
      'Incorporate eco-friendly solar lighting and rainwater harvesting systems.'
    ],
    status: 'In Progress',
    progressPercentage: 68,
    approvedBudgetKES: 48500000,
    expenditureKES: 33200000,
    startDate: '2024-02-15',
    expectedCompletionDate: '2026-12-10',
    projectLeader: 'Elder Dr. Peter Kamau & Rev. Joyce Muthoni',
    committee: 'Development & Infrastructure Committee',
    milestones: [
      {
        id: 'm-1',
        title: 'Geotechnical surveys, architectural approvals & site excavation',
        targetDate: '2024-06-30',
        completedDate: '2024-06-20',
        status: 'Completed',
        completionPercentage: 100
      },
      {
        id: 'm-2',
        title: 'Reinforced foundation footing and sub-structure stone masonry',
        targetDate: '2025-01-15',
        completedDate: '2025-01-10',
        status: 'Completed',
        completionPercentage: 100
      },
      {
        id: 'm-3',
        title: 'Superstructure columns, perimeter walls & gallery beams',
        targetDate: '2025-09-30',
        completedDate: '2025-09-25',
        status: 'Completed',
        completionPercentage: 100
      },
      {
        id: 'm-4',
        title: 'Steel roof trusses fabrication, sound dampening insulation & sheeting',
        targetDate: '2026-05-30',
        status: 'In Progress',
        completionPercentage: 65
      },
      {
        id: 'm-5',
        title: 'Interior acoustic plaster, liturgical stained glass windows & electrical installations',
        targetDate: '2026-10-31',
        status: 'Pending',
        completionPercentage: 10
      },
      {
        id: 'm-6',
        title: 'Sanctuary hardwood pews installation, dedication service and commissioning',
        targetDate: '2026-12-10',
        status: 'Pending',
        completionPercentage: 0
      }
    ],
    updates: [
      {
        id: 'up-1',
        date: '2026-03-28',
        author: 'Elder Dr. Peter Kamau',
        role: 'Project Chairman',
        title: 'Roof Trusses 65% Assembled On Site',
        content: 'The structural steel team has successfully hoisted four primary trusses over the main nave. The fabrication team from Thika has complied strictly with structural engineer specifications.',
        achievements: [
          'All steel load-bearing joints inspected and certified by municipal engineers.',
          'Safety zero-incident milestone maintained across 180 days of on-site construction.'
        ],
        challenges: [
          'Unseasonal rains in late February caused slight delay in perimeter mortar curing, now resolved with accelerated setting admixtures.'
        ]
      },
      {
        id: 'up-2',
        date: '2026-01-14',
        author: 'Rev. Joyce Muthoni',
        role: 'Parish Minister',
        title: 'Special Thanksgiving for Wall Completion',
        content: 'The Session and congregation gathered on site to offer prayers of thanksgiving for the successful completion of the main masonry perimeter walls. We praise God for faithful financial contributions.'
      }
    ]
  },
  {
    id: 'proj-2',
    title: 'PCEA Chogoria Hospital Maternity & Oncology Extension',
    congregation: 'PCEA Chogoria Parish (Meru)',
    category: 'Medical Mission',
    coverImage: '/src/assets/images/pcea_sanctuary_interior_1792004234981.jpg',
    objectives: [
      'Construct a 40-bed maternal care unit to serve rural mothers across Tharaka Nithi and Meru.',
      'Equip a specialized chemotherapy infusion suite with dedicated oncology consultation rooms.',
      'Establish a neonatal intensive care nursery with modern solar back-up power.'
    ],
    status: 'In Progress',
    progressPercentage: 85,
    approvedBudgetKES: 24000000,
    expenditureKES: 20400000,
    startDate: '2024-07-01',
    expectedCompletionDate: '2026-08-30',
    projectLeader: 'Dr. Anne Wanjiku (Medical Director) & Elder Samuel Mwangi',
    committee: 'Health & Medical Mission Board',
    milestones: [
      {
        id: 'm-201',
        title: 'Architectural designs and ministry of health statutory permits',
        targetDate: '2024-09-30',
        completedDate: '2024-09-15',
        status: 'Completed',
        completionPercentage: 100
      },
      {
        id: 'm-202',
        title: 'Civil structural framing and masonry finishing',
        targetDate: '2025-06-30',
        completedDate: '2025-06-20',
        status: 'Completed',
        completionPercentage: 100
      },
      {
        id: 'm-203',
        title: 'Medical gas pipeline installation, oxygen manifold, and clinical flooring',
        targetDate: '2026-02-28',
        completedDate: '2026-03-05',
        status: 'Completed',
        completionPercentage: 100
      },
      {
        id: 'm-204',
        title: 'Installation of patient beds, infusion pumps, and neonatal incubators',
        targetDate: '2026-07-15',
        status: 'In Progress',
        completionPercentage: 40
      }
    ],
    updates: [
      {
        id: 'up-201',
        date: '2026-03-15',
        author: 'Dr. Anne Wanjiku',
        role: 'Hospital Superintendent',
        title: 'Oxygen Pipeline and Anti-Bacterial Flooring Completed',
        content: 'We thank our Lord that the specialized medical pipeline has been fully certified by the Pharmacy & Poisons Board inspectors. We are now preparing the ward for bed installations.',
        achievements: [
          'Oxygen lines delivered to each of the 40 maternal beds.',
          'Solar backup battery banks installed to provide 48 hours uninterruptible power.'
        ]
      }
    ]
  },
  {
    id: 'proj-3',
    title: 'Youth Digital Skills & Creative Music Academy',
    congregation: 'PCEA Thika Parish (Kiambu)',
    category: 'Education & Youth',
    coverImage: '/src/assets/images/pcea_bible_study_fellowship_1792004236094.jpg',
    objectives: [
      'Empower 400+ Christian youth annually with certified software, graphic design, and video production skills.',
      'Provide a modern worship sound studio for Christian choir recordings and Golden Bells / Nyimbo preservation.',
      'Bridge the digital gap for high school and university graduates in our parish.'
    ],
    status: 'Completed',
    progressPercentage: 100,
    approvedBudgetKES: 6200000,
    expenditureKES: 5950000,
    startDate: '2024-01-10',
    expectedCompletionDate: '2025-11-20',
    projectLeader: 'Youth Pastor Gideon Njoroge & Elder Grace Wambui',
    committee: 'Parish Youth Committee & Education Guild',
    milestones: [
      {
        id: 'm-301',
        title: 'Renovation of Old Fellowship Hall into Tech Lab',
        targetDate: '2024-04-30',
        completedDate: '2024-04-12',
        status: 'Completed',
        completionPercentage: 100
      },
      {
        id: 'm-302',
        title: 'Procurement of 30 Workstation PCs, High-Speed Fiber & Acoustic Panels',
        targetDate: '2024-09-30',
        completedDate: '2024-09-18',
        status: 'Completed',
        completionPercentage: 100
      },
      {
        id: 'm-303',
        title: 'Official Commissioning Service by the Moderator of PCEA General Assembly',
        targetDate: '2024-11-20',
        completedDate: '2024-11-20',
        status: 'Completed',
        completionPercentage: 100
      }
    ],
    updates: [
      {
        id: 'up-301',
        date: '2025-12-01',
        author: 'Pastor Gideon Njoroge',
        role: 'Youth Ministry Coordinator',
        title: 'Cohort 1 Graduates 72 Students!',
        content: '72 young men and women graduated from our 16-week Digital Literacy and Sound Engineering course. Over 40% have already secured remote freelance or local church audio duties.',
        achievements: [
          'PCEA Youth choir completed recording of 12 traditional Kikuyu hymns in high-definition audio.',
          'Project finished KES 250,000 under budget, with remainder allocated to maintenance reserve.'
        ]
      }
    ]
  },
  {
    id: 'proj-4',
    title: 'Borehole & Solar Clean Water Initiative for Drought Parishes',
    congregation: 'PCEA Ngong Parish (Kajiado)',
    category: 'Water & Community',
    coverImage: '/src/assets/images/pcea_community_project_1792004235704.jpg',
    objectives: [
      'Drill a 280-meter solar borehole to provide 60,000 liters of clean drinking water daily.',
      'Set up a water distribution kiosk for surrounding community schools and pastoralist families.',
      'Reduce waterborne diseases in the semi-arid region through chlorination purification.'
    ],
    status: 'In Progress',
    progressPercentage: 42,
    approvedBudgetKES: 12000000,
    expenditureKES: 5100000,
    startDate: '2025-05-01',
    expectedCompletionDate: '2026-11-15',
    projectLeader: 'Elder David Ole Kipeen & Rev. Francis Kariuki',
    committee: 'Christian Social Responsibility Committee',
    milestones: [
      {
        id: 'm-401',
        title: 'Hydrogeological survey and NEMA environmental impact assessment',
        targetDate: '2025-07-15',
        completedDate: '2025-07-02',
        status: 'Completed',
        completionPercentage: 100
      },
      {
        id: 'm-402',
        title: 'Drilling to 280m depth, casing and test pumping (35m³/hr yield achieved)',
        targetDate: '2025-11-30',
        completedDate: '2025-12-04',
        status: 'Completed',
        completionPercentage: 100
      },
      {
        id: 'm-403',
        title: 'Solar pump array installation and 100,000L elevated steel tower erection',
        targetDate: '2026-06-30',
        status: 'In Progress',
        completionPercentage: 35
      },
      {
        id: 'm-404',
        title: 'Piping network to 3 local primary schools and public dispensing taps',
        targetDate: '2026-11-15',
        status: 'Pending',
        completionPercentage: 0
      }
    ],
    updates: [
      {
        id: 'up-401',
        date: '2026-02-20',
        author: 'Elder David Ole Kipeen',
        role: 'Community Outreach Chair',
        title: 'Solar Panels Arrive at Site',
        content: 'German-manufactured submersible pumps and 48 photovoltaic solar panels have arrived on site. Civil team has poured the concrete foundation for the 12-meter water storage tower.'
      }
    ]
  }
];

export const INITIAL_BIBLE_STUDIES: BibleStudy[] = [
  {
    id: 'bs-1',
    title: 'Walking in Covenant Faithfulness: PCEA Annual Theme',
    theme: 'Steadfast Faith in Seasons of Uncertainty',
    weekNumber: 15,
    month: 'April 2026',
    congregation: 'PCEA St. Andrew’s Church (Nairobi)',
    author: 'Rev. Dr. Patrick Mungai (Parish Minister)',
    scripturePassages: ['Hebrews 11:1–6', 'Genesis 15:1–6', 'Romans 4:18–22'],
    pdfAttachmentName: 'PCEA_Study_Guide_Week15_Covenant_Faithfulness.pdf',
    studyNotes: [
      '1. The Nature of Covenant: Unlike modern contracts that are conditional and revocable, Biblical covenants are founded on the immutable holiness and faithfulness of God (Hebrews 6:17-18).',
      '2. Evidence of Things Unseen: Faith (Wĩtĩkio) does not depend on immediate tangible circumstances. Abraham looked at his body and Sarah’s barrenness yet was fully persuaded that God was able to perform what He had promised.',
      '3. Pleasing God: Without faith, it is impossible to please God. The Presbyterian tradition affirms that genuine faith is both a spiritual gift and an active, obedient response to God’s Word.',
      '4. Practical Application: How does our trust in God reflect in our financial stewardship, family relationships, and dedication to congregational fellowship during economic hardships?'
    ],
    discussionQuestions: [
      'How does the Biblical definition of "faith" in Hebrews 11:1 differ from worldly optimism or positive thinking?',
      'Reflecting on Genesis 15:1, why did God tell Abraham "Fear not, I am thy shield and thy exceeding great reward" before renewing the promise?',
      'In what specific areas of your personal or family life is God inviting you to step forward in faith today?',
      'How can our church fellowship support members facing chronic illness, unemployment, or sorrow through covenant prayer?'
    ]
  },
  {
    id: 'bs-2',
    title: 'Thayũ wa Ngai: Experiencing God’s Supernatural Peace',
    theme: 'Mental Well-being, Prayer & Divine Serenity',
    weekNumber: 16,
    month: 'April 2026',
    congregation: 'PCEA St. Andrew’s Church (Nairobi)',
    author: 'Elder Margaret Njoki (Woman’s Guild Chaplain)',
    scripturePassages: ['Philippians 4:4–9', 'John 14:27', 'Isaiah 26:3'],
    pdfAttachmentName: 'PCEA_Thayũ_Wa_Ngai_Study_Notes.pdf',
    studyNotes: [
      '1. Peace that Surpasses Understanding: The Greek word "Eirene" and Kikuyu "Thayũ" mean more than absence of conflict; it denotes wholeness, sound mind, and harmony with God.',
      '2. The Fourfold Prayer Discipline (Afilipi 4:6): Prayer (Kũhoya), Supplication (Gũthaitha), Thanksgiving (Ngatho), and Requests (Mabataro). Notice that Thanksgiving is indispensable!',
      '3. Guarding the Mind: Paul instructs believers to guard their thought life with whatever is true, honorable, just, pure, lovely, and commendable. What we allow our minds to dwell upon directly shapes our peace.'
    ],
    discussionQuestions: [
      'Why is thanksgiving (ngatho) essential when asking God to meet our urgent needs in prayer?',
      'How do anxiety and constant media overload disrupt our spiritual peace, and what daily habits help refocus on Christ?',
      'Share a time when God provided you with peace that was beyond human comprehension during a severe crisis.'
    ]
  },
  {
    id: 'bs-3',
    title: 'The Parables of the Kingdom: Fruitfulness in Service',
    theme: 'Living as Faithful Stewards in Church & Society',
    weekNumber: 17,
    month: 'May 2026',
    congregation: 'PCEA St. Andrew’s Church (Nairobi)',
    author: 'Pastor Gideon Njoroge (Youth & Discipleship)',
    scripturePassages: ['Matthew 13:1–23', 'John 15:1–8'],
    pdfAttachmentName: 'PCEA_Kingdom_Parables_Discipleship.pdf',
    studyNotes: [
      '1. The Four Soils: The wayside heart (hardened), the rocky soil (shallow emotional response without root), the thorny ground (choked by worldly cares and deceit of riches), and the good ground (bears fruit thirty, sixty, and a hundredfold).',
      '2. Overcoming the Choking Thorns: In an urban metropolis like Nairobi, anxiety about career, status, and material security frequently chokes Christian fruitfulness unless pruned by scripture.',
      '3. The Joy of Bearing Fruit: Real spiritual fruit is evidenced in Christian character (Galatians 5:22-23) and evangelistic witness in our workplaces and neighbourhoods.'
    ],
    discussionQuestions: [
      'Which of the four soil conditions best reflects the current state of your spiritual life, and what would it take to cultivate "good soil"?',
      'What are some subtle "thorns" of modern life that attempt to choke our devotion to God?',
      'How can our small group fellowship actively keep each other accountable in producing lasting spiritual fruit?'
    ]
  }
];

export const INITIAL_EVENTS: ChurchEvent[] = [
  {
    id: 'ev-1',
    title: 'Sunday Morning Holy Communion Service',
    congregation: 'PCEA St. Andrew’s Church (Nairobi)',
    category: 'Worship Service',
    date: '2026-04-19',
    time: '08:30 AM – 10:15 AM',
    venue: 'Main Sanctuary & Live Overflow',
    description: 'First Sunday Service with celebration of the Sacrament of the Lord’s Supper. Sermon by Parish Minister Rev. Dr. Patrick Mungai on "The Cup of the New Covenant". All baptized members are warmly welcomed.',
    contactPerson: 'Church Office / Session Clerk',
    contactPhone: '+254 722 000 111',
    isPublic: true,
    rsvpRequired: false,
    rsvpsCount: 420
  },
  {
    id: 'ev-2',
    title: 'Second Worship & Youth Encounter Service',
    congregation: 'PCEA St. Andrew’s Church (Nairobi)',
    category: 'Worship Service',
    date: '2026-04-19',
    time: '10:45 AM – 12:45 PM',
    venue: 'Main Sanctuary & Youth Chapel',
    description: 'Dynamic family and youth worship with contemporary praise & traditional Golden Bells hymns led by the Choral Ensemble. Sunday School running concurrently in the Education Block.',
    contactPerson: 'Pastor Gideon Njoroge',
    contactPhone: '+254 722 000 222',
    isPublic: true,
    rsvpRequired: false,
    rsvpsCount: 650
  },
  {
    id: 'ev-3',
    title: 'Woman’s Guild Monthly Fellowship & Hospital Visitation',
    congregation: 'PCEA St. Andrew’s Church (Nairobi)',
    category: "Woman's Guild",
    date: '2026-04-23',
    time: '02:00 PM – 05:00 PM',
    venue: 'St. Andrew’s Hall & Kenyatta National Hospital Maternity Outreach',
    description: 'All commissioned members and women of faith are invited to our monthly prayer breakfast, followed by our benevolence distribution of baby clothing and toiletries at the national hospital.',
    contactPerson: 'Elder Margaret Njoki (Guild President)',
    contactPhone: '+254 722 000 333',
    isPublic: false,
    rsvpRequired: true,
    rsvpsCount: 88,
    userRsvpd: true
  },
  {
    id: 'ev-4',
    title: 'PCMF Men’s Breakfast: "Integrity in Business & Family"',
    congregation: 'PCEA St. Andrew’s Church (Nairobi)',
    category: 'PCMF',
    date: '2026-04-25',
    time: '07:00 AM – 09:30 AM',
    venue: 'Parish Gardens Pavilion',
    description: 'Presbyterian Church Men’s Fellowship quarterly fellowship. Keynote by guest speaker Elder James Kariuki, Chairman of Kenya Christian Lawyers Fellowship, discussing Christian ethics in commerce.',
    contactPerson: 'Elder Francis Githinji (PCMF Convener)',
    contactPhone: '+254 722 000 444',
    isPublic: true,
    rsvpRequired: true,
    rsvpsCount: 145
  },
  {
    id: 'ev-5',
    title: 'Wednesday Midweek Deliverance & Intercessory Prayer',
    congregation: 'PCEA St. Andrew’s Church (Nairobi)',
    category: 'Prayer & Fasting',
    date: '2026-04-22',
    time: '05:30 PM – 07:00 PM',
    venue: 'Chapel of Prayer & Zoom Hybrid',
    description: 'Midweek prayer fellowship focusing on healing for the sick, revival in our schools and universities, national peace, and our church development projects.',
    contactPerson: 'Prayer Committee Clerk',
    contactPhone: '+254 722 000 555',
    isPublic: true,
    rsvpRequired: false,
    rsvpsCount: 110
  },
  {
    id: 'ev-6',
    title: 'Presbytery Youth Brigade Camp & Music Festival',
    congregation: 'PCEA St. Andrew’s Church (Nairobi)',
    category: 'Youth',
    date: '2026-05-01',
    time: '08:00 AM – 04:30 PM',
    venue: 'PCEA Chogoria Conference Grounds',
    description: 'Annual inter-parish youth talent and scripture memorization gala. Competitions in Golden Bells four-part harmony, Kikuyu folk psalmody, and biblical drama presentations.',
    contactPerson: 'Brigade Captain Brian Mwangi',
    contactPhone: '+254 722 000 666',
    isPublic: true,
    rsvpRequired: true,
    rsvpsCount: 310
  }
];

export const INITIAL_ANNOUNCEMENTS: Announcement[] = [
  {
    id: 'ann-1',
    title: '2026 General Assembly Theme: "Be Ye Steadfast in Faith"',
    congregation: 'PCEA St. Andrew’s Church (Nairobi)',
    category: 'General Bulletin',
    isPublic: true,
    isUrgent: false,
    content: 'The 24th General Assembly has promulgated this year’s pastoral theme: "Be Ye Steadfast in Faith" (Hebrews 11:1). Study guides and sermon outlines have been distributed to all parish elders. Members are encouraged to follow the 30-day covenant devotional via this app.',
    publishedAt: '2026-04-12 09:00',
    author: 'Rt. Rev. Moderator',
    authorRole: 'PCEA General Assembly'
  },
  {
    id: 'ann-2',
    title: 'Urgent: Sanctuary Roof Construction Briefing for Elders & Members',
    congregation: 'PCEA St. Andrew’s Church (Nairobi)',
    category: 'Development',
    isPublic: true,
    isUrgent: true,
    content: 'All church members are cordially invited to the Special Development Sunday on April 26th. The Structural Engineering Committee will display detailed 3D models and financial reports for the sanctuary roof truss phase.',
    publishedAt: '2026-04-13 14:30',
    author: 'Elder Dr. Peter Kamau',
    authorRole: 'Development Chairman'
  },
  {
    id: 'ann-3',
    title: 'Woman’s Guild Induction and Badging Ceremony Next Month',
    congregation: 'PCEA St. Andrew’s Church (Nairobi)',
    category: 'Fellowship',
    isPublic: false,
    isUrgent: false,
    content: 'Preparatory classes for probationers wishing to be commissioned into the Woman’s Guild will commence on Saturday May 2nd at 9:00 AM in the Vestry Room. Please register with the Guild Secretary.',
    publishedAt: '2026-04-10 11:15',
    author: 'Elder Margaret Njoki',
    authorRole: 'Woman’s Guild President'
  },
  {
    id: 'ann-4',
    title: 'Bereavement Notice: Home-Going of Elder Emeritus Samuel Gakunga',
    congregation: 'PCEA St. Andrew’s Church (Nairobi)',
    category: 'Condolences',
    isPublic: true,
    isUrgent: false,
    content: 'It is with humble acceptance of God’s will that the Session announces the peaceful transition to glory of Elder Emeritus Samuel Gakunga. Family prayers are held daily at 5:30 PM at the parish residence. The memorial service will be announced in due course.',
    publishedAt: '2026-04-11 16:00',
    author: 'Session Clerk',
    authorRole: 'PCEA St. Andrew’s'
  }
];

export const INITIAL_MEMBERS: UserProfile[] = [
  {
    id: 'user-guest',
    fullName: 'Guest Pilgrim',
    email: 'guest@pcea.or.ke',
    phoneNumber: '+254 700 000 000',
    role: 'guest',
    congregation: 'PCEA St. Andrew’s Church (Nairobi)',
    isApproved: true,
    registeredAt: '2026-04-01',
    preferredLanguage: 'en',
    notificationPreferences: {
      announcements: true,
      events: true,
      bibleStudies: false,
      projects: false
    }
  },
  {
    id: 'user-member',
    fullName: 'Grace Wanjiru Mwangi',
    email: 'member@pcea.or.ke',
    phoneNumber: '+254 712 345 678',
    role: 'member',
    congregation: 'PCEA St. Andrew’s Church (Nairobi)',
    presbytery: 'Nairobi Presbytery',
    membershipNumber: 'PCEA/STA/2023/0842',
    isApproved: true,
    registeredAt: '2023-05-12',
    preferredLanguage: 'en',
    notificationPreferences: {
      announcements: true,
      events: true,
      bibleStudies: true,
      projects: true
    }
  },
  {
    id: 'user-admin',
    fullName: 'Elder David Kariuki (Church Administrator)',
    email: 'admin@pcea.or.ke',
    phoneNumber: '+254 722 987 654',
    role: 'admin',
    congregation: 'PCEA St. Andrew’s Church (Nairobi)',
    presbytery: 'Nairobi Presbytery',
    membershipNumber: 'PCEA/STA/ELD/0034',
    isApproved: true,
    registeredAt: '2021-02-10',
    preferredLanguage: 'en',
    notificationPreferences: {
      announcements: true,
      events: true,
      bibleStudies: true,
      projects: true
    }
  }
];

export const INITIAL_AUDIT_LOGS: AuditLog[] = [
  {
    id: 'log-1',
    timestamp: '2026-04-13 15:02:11',
    adminName: 'Elder David Kariuki',
    action: 'PUBLISH_ANNOUNCEMENT',
    target: 'Sanctuary Roof Construction Briefing',
    details: 'Urgent notice published to congregation bulletin board.'
  },
  {
    id: 'log-2',
    timestamp: '2026-04-12 11:24:00',
    adminName: 'Elder David Kariuki',
    action: 'UPDATE_PROJECT_MILESTONE',
    target: 'Roof Trusses Fabrication (Project #1)',
    details: 'Progress updated to 65% completion. Photographic inspection attached.'
  },
  {
    id: 'log-3',
    timestamp: '2026-04-10 09:45:30',
    adminName: 'Elder David Kariuki',
    action: 'APPROVE_MEMBER',
    target: 'Membership #PCEA/STA/2026/0129',
    details: 'Member James Kamau verified by Parish District Elder.'
  }
];
