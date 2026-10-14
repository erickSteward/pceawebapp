import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  UserProfile,
  UserRole,
  ChurchProject,
  ChurchEvent,
  BibleStudy,
  Announcement,
  BookmarkItem,
  AuditLog
} from '../types';
import {
  INITIAL_PROJECTS,
  INITIAL_EVENTS,
  INITIAL_BIBLE_STUDIES,
  INITIAL_ANNOUNCEMENTS,
  INITIAL_MEMBERS,
  INITIAL_AUDIT_LOGS,
  CONGREGATIONS
} from '../data/mockData';

export type FontSizeOption = 'sm' | 'md' | 'lg' | 'xl';

interface AppContextType {
  currentUser: UserProfile;
  activeRole: UserRole;
  congregation: string;
  setCongregation: (congregation: string) => void;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  fontSize: FontSizeOption;
  setFontSize: (size: FontSizeOption) => void;
  isDistractionFree: boolean;
  setDistractionFree: (val: boolean) => void;
  
  // Navigation shortcuts
  selectedHymnId: string | null;
  setSelectedHymnId: (id: string | null) => void;
  selectedProjectId: string | null;
  setSelectedProjectId: (id: string | null) => void;
  selectedStudyId: string | null;
  setSelectedStudyId: (id: string | null) => void;

  // Data states
  projects: ChurchProject[];
  events: ChurchEvent[];
  bibleStudies: BibleStudy[];
  announcements: Announcement[];
  membersList: UserProfile[];
  auditLogs: AuditLog[];
  bookmarks: BookmarkItem[];
  notifications: { id: string; title: string; body: string; time: string; read: boolean }[];

  // Actions
  loginAs: (role: UserRole) => void;
  loginWithCredentials: (identifier: string, pass: string) => { success: boolean; message: string };
  registerMember: (data: Partial<UserProfile>) => { success: boolean; message: string };
  logout: () => void;
  toggleBookmark: (item: Omit<BookmarkItem, 'id' | 'dateAdded'>) => void;
  isBookmarked: (referenceId: string) => boolean;
  rsvpEvent: (eventId: string) => void;
  toggleStudyCompleted: (studyId: string) => void;
  saveStudyNotes: (studyId: string, notes: string) => void;
  
  // Admin actions
  addAnnouncement: (ann: Omit<Announcement, 'id' | 'publishedAt'>) => void;
  deleteAnnouncement: (id: string) => void;
  addEvent: (ev: Omit<ChurchEvent, 'id' | 'rsvpsCount'>) => void;
  deleteEvent: (id: string) => void;
  updateProject: (projectId: string, updates: Partial<ChurchProject>) => void;
  addProjectUpdate: (projectId: string, updateTitle: string, updateContent: string) => void;
  addBibleStudy: (study: Omit<BibleStudy, 'id'>) => void;
  approveMember: (memberId: string) => void;
  markNotificationRead: (id: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<UserProfile>(INITIAL_MEMBERS[0]); // Starts as Guest
  const [activeRole, setActiveRole] = useState<UserRole>('guest');
  const [congregation, setCongregation] = useState<string>(CONGREGATIONS[0]);
  const [activeTab, setActiveTab] = useState<string>('home');
  const [fontSize, setFontSize] = useState<FontSizeOption>('md');
  const [isDistractionFree, setDistractionFree] = useState<boolean>(false);

  const [selectedHymnId, setSelectedHymnId] = useState<string | null>(null);
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);
  const [selectedStudyId, setSelectedStudyId] = useState<string | null>(null);

  // Entities stored in state
  const [projects, setProjects] = useState<ChurchProject[]>(() => {
    const saved = localStorage.getItem('pcea_projects');
    return saved ? JSON.parse(saved) : INITIAL_PROJECTS;
  });

  const [events, setEvents] = useState<ChurchEvent[]>(() => {
    const saved = localStorage.getItem('pcea_events');
    return saved ? JSON.parse(saved) : INITIAL_EVENTS;
  });

  const [bibleStudies, setBibleStudies] = useState<BibleStudy[]>(() => {
    const saved = localStorage.getItem('pcea_studies');
    return saved ? JSON.parse(saved) : INITIAL_BIBLE_STUDIES;
  });

  const [announcements, setAnnouncements] = useState<Announcement[]>(() => {
    const saved = localStorage.getItem('pcea_announcements');
    return saved ? JSON.parse(saved) : INITIAL_ANNOUNCEMENTS;
  });

  const [membersList, setMembersList] = useState<UserProfile[]>(() => {
    const saved = localStorage.getItem('pcea_members');
    return saved ? JSON.parse(saved) : INITIAL_MEMBERS;
  });

  const [auditLogs, setAuditLogs] = useState<AuditLog[]>(() => {
    const saved = localStorage.getItem('pcea_audit_logs');
    return saved ? JSON.parse(saved) : INITIAL_AUDIT_LOGS;
  });

  const [bookmarks, setBookmarks] = useState<BookmarkItem[]>(() => {
    const saved = localStorage.getItem('pcea_bookmarks');
    return saved ? JSON.parse(saved) : [
      {
        id: 'bm-1',
        type: 'hymn',
        referenceId: 'gb-10',
        title: 'Great Is Thy Faithfulness',
        subtitle: 'Golden Bells #10',
        snippet: 'Great is Thy faithfulness, O God my Father...',
        dateAdded: '2026-04-10'
      },
      {
        id: 'bm-2',
        type: 'hymn',
        referenceId: 'nckn-48',
        title: 'Mwathani Nĩ Mũrĩithi Wakwa',
        subtitle: 'Nyimbo cia Kuinira Ngai #48',
        snippet: 'Mwathani nĩ Mũrĩithi wakwa; ndikaga kĩndũ o na kĩmwe...',
        dateAdded: '2026-04-11'
      },
      {
        id: 'bm-3',
        type: 'verse',
        referenceId: 'PSA-23-1',
        title: 'Psalm 23:1 / Thaburi 23:1',
        subtitle: 'The Lord is my shepherd',
        snippet: 'Jehova nĩwe Mũrĩithi wakwa; ndigakenera kĩndũ o na kĩmwe.',
        dateAdded: '2026-04-12'
      }
    ];
  });

  const [notifications, setNotifications] = useState([
    {
      id: 'notif-1',
      title: 'Sunday Holy Communion',
      body: 'Sacrament of the Lord’s Supper this Sunday at 8:30 AM & 10:45 AM.',
      time: '10m ago',
      read: false
    },
    {
      id: 'notif-2',
      title: 'Sanctuary Construction Update',
      body: 'Roof trusses are now 65% assembled on site. View the progress report.',
      time: '2h ago',
      read: false
    },
    {
      id: 'notif-3',
      title: 'New Bible Study Outline',
      body: 'Week 15 Study Guide "Walking in Covenant Faithfulness" is now available.',
      time: '1d ago',
      read: true
    }
  ]);

  // Persist to localStorage
  useEffect(() => {
    localStorage.setItem('pcea_projects', JSON.stringify(projects));
  }, [projects]);

  useEffect(() => {
    localStorage.setItem('pcea_events', JSON.stringify(events));
  }, [events]);

  useEffect(() => {
    localStorage.setItem('pcea_studies', JSON.stringify(bibleStudies));
  }, [bibleStudies]);

  useEffect(() => {
    localStorage.setItem('pcea_announcements', JSON.stringify(announcements));
  }, [announcements]);

  useEffect(() => {
    localStorage.setItem('pcea_members', JSON.stringify(membersList));
  }, [membersList]);

  useEffect(() => {
    localStorage.setItem('pcea_bookmarks', JSON.stringify(bookmarks));
  }, [bookmarks]);

  useEffect(() => {
    localStorage.setItem('pcea_audit_logs', JSON.stringify(auditLogs));
  }, [auditLogs]);

  // Quick switch role
  const loginAs = (role: UserRole) => {
    setActiveRole(role);
    if (role === 'guest') {
      setCurrentUser(INITIAL_MEMBERS[0]);
    } else if (role === 'member') {
      setCurrentUser(INITIAL_MEMBERS[1]);
    } else {
      setCurrentUser(INITIAL_MEMBERS[2]);
    }
  };

  const loginWithCredentials = (identifier: string, pass: string): { success: boolean; message: string } => {
    const trimmed = identifier.trim().toLowerCase();
    if (!trimmed || !pass) {
      return { success: false, message: 'Please provide both your phone number or email and password.' };
    }
    
    // Check admin
    if (trimmed.includes('admin') || trimmed === '0722987654') {
      loginAs('admin');
      return { success: true, message: 'Signed in as Church Administrator.' };
    }

    // Find member
    const existing = membersList.find(
      m => m.email.toLowerCase() === trimmed || m.phoneNumber.replace(/\s+/g, '') === trimmed.replace(/\s+/g, '')
    );

    if (existing) {
      if (!existing.isApproved && existing.role !== 'guest') {
        return { success: false, message: 'Your registration is awaiting approval from your parish session clerk.' };
      }
      setCurrentUser(existing);
      setActiveRole(existing.role);
      return { success: true, message: `Welcome back, ${existing.fullName}!` };
    }

    // Allow mock fallback login for test
    const newMember: UserProfile = {
      id: `user-${Date.now()}`,
      fullName: trimmed.includes('@') ? trimmed.split('@')[0].toUpperCase() : 'Church Member',
      email: trimmed.includes('@') ? trimmed : `${trimmed}@member.pcea.or.ke`,
      phoneNumber: trimmed.includes('@') ? '+254 712 000 000' : trimmed,
      role: 'member',
      congregation: congregation,
      presbytery: 'Nairobi Presbytery',
      membershipNumber: `PCEA/STA/2026/${Math.floor(1000 + Math.random() * 9000)}`,
      isApproved: true,
      registeredAt: new Date().toISOString().split('T')[0],
      preferredLanguage: 'en',
      notificationPreferences: {
        announcements: true,
        events: true,
        bibleStudies: true,
        projects: true
      }
    };
    setCurrentUser(newMember);
    setActiveRole('member');
    setMembersList(prev => [...prev, newMember]);
    return { success: true, message: `Welcome, ${newMember.fullName}!` };
  };

  const registerMember = (data: Partial<UserProfile>): { success: boolean; message: string } => {
    if (!data.fullName || (!data.phoneNumber && !data.email)) {
      return { success: false, message: 'Please provide your full name and at least a phone number or email.' };
    }

    const newProfile: UserProfile = {
      id: `user-${Date.now()}`,
      fullName: data.fullName,
      email: data.email || `${data.phoneNumber?.replace(/\D/g, '')}@pcea.or.ke`,
      phoneNumber: data.phoneNumber || '+254 700 000 000',
      role: 'member',
      congregation: data.congregation || congregation,
      presbytery: data.presbytery || 'Central Region Presbytery',
      membershipNumber: data.membershipNumber || `PCEA/PENDING/${Math.floor(1000 + Math.random() * 9000)}`,
      isApproved: true, // Auto-approve for seamless test, or flag
      registeredAt: new Date().toISOString().split('T')[0],
      preferredLanguage: data.preferredLanguage || 'en',
      notificationPreferences: {
        announcements: true,
        events: true,
        bibleStudies: true,
        projects: true
      }
    };

    setMembersList(prev => [...prev, newProfile]);
    setCurrentUser(newProfile);
    setActiveRole('member');

    // Add audit entry
    const newLog: AuditLog = {
      id: `log-${Date.now()}`,
      timestamp: new Date().toISOString().replace('T', ' ').slice(0, 19),
      adminName: 'System / Self-Registration',
      action: 'REGISTER_MEMBER',
      target: newProfile.fullName,
      details: `New member registered for ${newProfile.congregation}.`
    };
    setAuditLogs(prev => [newLog, ...prev]);

    return { success: true, message: 'Registration successful! You are now logged in as a registered member.' };
  };

  const logout = () => {
    loginAs('guest');
    setActiveTab('home');
  };

  const isBookmarked = (referenceId: string) => {
    return bookmarks.some(b => b.referenceId === referenceId);
  };

  const toggleBookmark = (item: Omit<BookmarkItem, 'id' | 'dateAdded'>) => {
    setBookmarks(prev => {
      const exists = prev.find(b => b.referenceId === item.referenceId);
      if (exists) {
        return prev.filter(b => b.referenceId !== item.referenceId);
      } else {
        const newItem: BookmarkItem = {
          ...item,
          id: `bm-${Date.now()}`,
          dateAdded: new Date().toISOString().split('T')[0]
        };
        return [newItem, ...prev];
      }
    });
  };

  const rsvpEvent = (eventId: string) => {
    setEvents(prev =>
      prev.map(ev => {
        if (ev.id === eventId) {
          const isRsvpd = !ev.userRsvpd;
          return {
            ...ev,
            userRsvpd: isRsvpd,
            rsvpsCount: isRsvpd ? ev.rsvpsCount + 1 : Math.max(0, ev.rsvpsCount - 1)
          };
        }
        return ev;
      })
    );
  };

  const toggleStudyCompleted = (studyId: string) => {
    setBibleStudies(prev =>
      prev.map(st => (st.id === studyId ? { ...st, isCompleted: !st.isCompleted } : st))
    );
  };

  const saveStudyNotes = (studyId: string, notes: string) => {
    setBibleStudies(prev =>
      prev.map(st => (st.id === studyId ? { ...st, userNotes: notes } : st))
    );
  };

  // Administrator tools
  const addAnnouncement = (ann: Omit<Announcement, 'id' | 'publishedAt'>) => {
    const newAnn: Announcement = {
      ...ann,
      id: `ann-${Date.now()}`,
      publishedAt: new Date().toISOString().replace('T', ' ').slice(0, 16)
    };
    setAnnouncements(prev => [newAnn, ...prev]);

    const newLog: AuditLog = {
      id: `log-${Date.now()}`,
      timestamp: new Date().toISOString().replace('T', ' ').slice(0, 19),
      adminName: currentUser.fullName,
      action: 'PUBLISH_ANNOUNCEMENT',
      target: newAnn.title,
      details: `Published announcement under category: ${newAnn.category}`
    };
    setAuditLogs(prev => [newLog, ...prev]);
  };

  const deleteAnnouncement = (id: string) => {
    const target = announcements.find(a => a.id === id);
    setAnnouncements(prev => prev.filter(a => a.id !== id));
    if (target) {
      setAuditLogs(prev => [
        {
          id: `log-${Date.now()}`,
          timestamp: new Date().toISOString().replace('T', ' ').slice(0, 19),
          adminName: currentUser.fullName,
          action: 'DELETE_ANNOUNCEMENT',
          target: target.title,
          details: 'Removed from public notices.'
        },
        ...prev
      ]);
    }
  };

  const addEvent = (ev: Omit<ChurchEvent, 'id' | 'rsvpsCount'>) => {
    const newEvent: ChurchEvent = {
      ...ev,
      id: `ev-${Date.now()}`,
      rsvpsCount: 0
    };
    setEvents(prev => [newEvent, ...prev]);

    setAuditLogs(prev => [
      {
        id: `log-${Date.now()}`,
        timestamp: new Date().toISOString().replace('T', ' ').slice(0, 19),
        adminName: currentUser.fullName,
        action: 'CREATE_EVENT',
        target: newEvent.title,
        details: `Created church activity scheduled for ${newEvent.date}`
      },
      ...prev
    ]);
  };

  const deleteEvent = (id: string) => {
    const target = events.find(e => e.id === id);
    setEvents(prev => prev.filter(e => e.id !== id));
    if (target) {
      setAuditLogs(prev => [
        {
          id: `log-${Date.now()}`,
          timestamp: new Date().toISOString().replace('T', ' ').slice(0, 19),
          adminName: currentUser.fullName,
          action: 'DELETE_EVENT',
          target: target.title,
          details: 'Activity removed from calendar.'
        },
        ...prev
      ]);
    }
  };

  const updateProject = (projectId: string, updates: Partial<ChurchProject>) => {
    setProjects(prev =>
      prev.map(p => (p.id === projectId ? { ...p, ...updates } : p))
    );
    setAuditLogs(prev => [
      {
        id: `log-${Date.now()}`,
        timestamp: new Date().toISOString().replace('T', ' ').slice(0, 19),
        adminName: currentUser.fullName,
        action: 'UPDATE_PROJECT',
        target: projectId,
        details: `Updated project parameters: ${Object.keys(updates).join(', ')}`
      },
      ...prev
    ]);
  };

  const addProjectUpdate = (projectId: string, updateTitle: string, updateContent: string) => {
    setProjects(prev =>
      prev.map(p => {
        if (p.id === projectId) {
          const newUpdate = {
            id: `up-${Date.now()}`,
            date: new Date().toISOString().split('T')[0],
            author: currentUser.fullName,
            role: 'Church Administrator',
            title: updateTitle,
            content: updateContent
          };
          return {
            ...p,
            updates: [newUpdate, ...p.updates]
          };
        }
        return p;
      })
    );
  };

  const addBibleStudy = (study: Omit<BibleStudy, 'id'>) => {
    const newStudy: BibleStudy = {
      ...study,
      id: `bs-${Date.now()}`
    };
    setBibleStudies(prev => [newStudy, ...prev]);
    setAuditLogs(prev => [
      {
        id: `log-${Date.now()}`,
        timestamp: new Date().toISOString().replace('T', ' ').slice(0, 19),
        adminName: currentUser.fullName,
        action: 'PUBLISH_BIBLE_STUDY',
        target: newStudy.title,
        details: `Published for month: ${newStudy.month}`
      },
      ...prev
    ]);
  };

  const approveMember = (memberId: string) => {
    setMembersList(prev =>
      prev.map(m => (m.id === memberId ? { ...m, isApproved: true } : m))
    );
    setAuditLogs(prev => [
      {
        id: `log-${Date.now()}`,
        timestamp: new Date().toISOString().replace('T', ' ').slice(0, 19),
        adminName: currentUser.fullName,
        action: 'APPROVE_MEMBER',
        target: memberId,
        details: 'Membership status verified.'
      },
      ...prev
    ]);
  };

  const markNotificationRead = (id: string) => {
    setNotifications(prev =>
      prev.map(n => (n.id === id ? { ...n, read: true } : n))
    );
  };

  return (
    <AppContext.Provider
      value={{
        currentUser,
        activeRole,
        congregation,
        setCongregation,
        activeTab,
        setActiveTab,
        fontSize,
        setFontSize,
        isDistractionFree,
        setDistractionFree,
        selectedHymnId,
        setSelectedHymnId,
        selectedProjectId,
        setSelectedProjectId,
        selectedStudyId,
        setSelectedStudyId,
        projects,
        events,
        bibleStudies,
        announcements,
        membersList,
        auditLogs,
        bookmarks,
        notifications,
        loginAs,
        loginWithCredentials,
        registerMember,
        logout,
        toggleBookmark,
        isBookmarked,
        rsvpEvent,
        toggleStudyCompleted,
        saveStudyNotes,
        addAnnouncement,
        deleteAnnouncement,
        addEvent,
        deleteEvent,
        updateProject,
        addProjectUpdate,
        addBibleStudy,
        approveMember,
        markNotificationRead
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
