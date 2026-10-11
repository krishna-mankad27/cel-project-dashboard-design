export type UserRole = 'Administrator' | 'Project manager' | 'Member';

export interface User {
  id: string;
  fullName: string;
  loginName: string;
  role: UserRole;
  status: 'Active' | 'Inactive';
  initials: string;
  createdDate: string;
}

export type ProjectType = 'Purchase order' | 'R&D';
export type ProjectStatus = 'Slipping' | 'Due in 2 days' | 'On track';
export type MilestoneStatus = 'Not started' | 'In progress' | 'Completed' | 'Delayed';
export type DurationCategory = 'Weekly' | 'Fortnightly' | 'Monthly';

export interface DelayRecord {
  reason: string;
  correctiveAction: string;
  supportFromHOD: string;
}

export interface Milestone {
  id: string;
  code: string; // e.g. M1, M2
  name: string;
  startDate: string; // YYYY-MM-DD
  endDate: string; // YYYY-MM-DD
  targetDate?: string;
  actualDate?: string;
  durationCategory: DurationCategory;
  assignedTo: string; // User fullName
  status: MilestoneStatus;
  delayRecord?: DelayRecord;
  lastProgressUpdate?: string; // YYYY-MM-DD
}

export interface Project {
  code: string; // e.g. P101
  name: string;
  type: ProjectType;
  projectManager: string; // User fullName
  milestones: Milestone[];
}

export interface AlertItem {
  id: string;
  projectCode: string;
  projectName: string;
  milestoneId: string;
  milestoneCode: string;
  milestoneName: string;
  assignedTo: string;
  alertType: 'overdue' | 'due_soon' | 'half_time' | 'three_quarter_time';
  title: string;
  badgeText: string;
  subText: string;
  lastUpdateText: string;
  dateText: string;
  isOverdue: boolean;
  isRead: boolean;
}
