export type UserRole = 'guest' | 'member' | 'admin';

export interface UserProfile {
  id: string;
  fullName: string;
  email: string;
  phoneNumber: string;
  role: UserRole;
  congregation: string;
  presbytery?: string;
  membershipNumber?: string;
  isApproved: boolean;
  registeredAt: string;
  avatarUrl?: string;
  preferredLanguage: 'en' | 'ki';
  notificationPreferences: {
    announcements: boolean;
    events: boolean;
    bibleStudies: boolean;
    projects: boolean;
  };
}

export interface Hymn {
  id: string;
  collection: 'golden_bells' | 'nyimbo_cia_kuinira_ngai';
  number: number;
  title: string;
  alternateTitle?: string;
  language: 'English' | 'Kikuyu';
  author?: string;
  tune?: string;
  key?: string;
  verses: string[];
  chorus?: string;
  scriptureReference?: string;
  category: string;
}

export interface BibleVerse {
  book: string;
  chapter: number;
  verse: number;
  text: string;
  translation: 'KJV' | 'WEB' | 'KIKUYU';
}

export interface BibleBook {
  id: string;
  name: string;
  kikuyuName: string;
  testament: 'OT' | 'NT';
  totalChapters: number;
  chapters: {
    chapter: number;
    verses: {
      [translation: string]: { verse: number; text: string }[];
    };
  }[];
}

export interface BibleReadingPlan {
  id: string;
  title: string;
  description: string;
  durationDays: number;
  currentDay: number;
  days: {
    day: number;
    readings: string[];
    title: string;
    completed: boolean;
  }[];
}

export interface ChurchEvent {
  id: string;
  title: string;
  congregation: string;
  category: 'Worship Service' | 'Prayer & Fasting' | "Woman's Guild" | 'PCMF' | 'Youth' | 'Church School' | 'Session Meeting' | 'Community Outreach';
  date: string;
  time: string;
  venue: string;
  description: string;
  contactPerson: string;
  contactPhone: string;
  isPublic: boolean;
  rsvpRequired: boolean;
  rsvpsCount: number;
  userRsvpd?: boolean;
  imageUrl?: string;
}

export interface BibleStudy {
  id: string;
  title: string;
  theme: string;
  weekNumber: number;
  month: string;
  scripturePassages: string[];
  studyNotes: string[];
  discussionQuestions: string[];
  congregation: string;
  author: string;
  pdfAttachmentName?: string;
  isCompleted?: boolean;
  userNotes?: string;
}

export interface ProjectMilestone {
  id: string;
  title: string;
  targetDate: string;
  completedDate?: string;
  status: 'Completed' | 'In Progress' | 'Pending';
  completionPercentage: number;
}

export interface ProjectUpdate {
  id: string;
  date: string;
  author: string;
  role: string;
  title: string;
  content: string;
  achievements?: string[];
  challenges?: string[];
}

export interface ChurchProject {
  id: string;
  title: string;
  congregation: string;
  category: 'Sanctuary Construction' | 'Medical Mission' | 'Education & Youth' | 'Water & Community' | 'Parish Infrastructure';
  coverImage: string;
  objectives: string[];
  status: 'Planned' | 'In Progress' | 'On Hold' | 'Completed';
  progressPercentage: number;
  approvedBudgetKES: number;
  expenditureKES: number;
  startDate: string;
  expectedCompletionDate: string;
  projectLeader: string;
  committee: string;
  milestones: ProjectMilestone[];
  updates: ProjectUpdate[];
}

export interface Announcement {
  id: string;
  title: string;
  congregation: string;
  category: 'General Bulletin' | 'Sunday Services' | 'Urgent Notice' | 'Development' | 'Fellowship' | 'Condolences';
  isPublic: boolean;
  isUrgent: boolean;
  content: string;
  publishedAt: string;
  author: string;
  authorRole: string;
}

export interface BookmarkItem {
  id: string;
  type: 'hymn' | 'verse' | 'study';
  referenceId: string;
  title: string;
  subtitle: string;
  snippet: string;
  dateAdded: string;
  notes?: string;
}

export interface AuditLog {
  id: string;
  timestamp: string;
  adminName: string;
  action: string;
  target: string;
  details: string;
}
