import React, { createContext, useContext, useState, useEffect } from 'react';
import type { Project, User, AlertItem, Milestone, DelayRecord, MilestoneStatus } from '../types';
import { INITIAL_PROJECTS, INITIAL_USERS, getInitialAlerts } from '../data/mockData';
import { classifyDuration, SIMULATION_TODAY_STR } from '../utils/dateUtils';

interface AppContextType {
  projects: Project[];
  users: User[];
  alerts: AlertItem[];
  currentScreen: 'dashboard' | 'projects' | 'users' | 'project-detail';
  selectedProjectCode: string | null;
  activeBeaconAlert: AlertItem | null;
  isAlertHistoryOpen: boolean;
  currentUser: User;
  
  // Navigation
  navigateTo: (screen: 'dashboard' | 'projects' | 'users' | 'project-detail', projectCode?: string) => void;
  setCurrentUser: (user: User) => void;
  
  // Alert Actions
  openAlertHistory: () => void;
  closeAlertHistory: () => void;
  showBeaconAlert: (alert: AlertItem) => void;
  closeBeaconAlert: () => void;
  markAlertAsRead: (alertId: string) => void;
  
  // Project Actions
  addProject: (newProject: { code: string; name: string; type: 'Purchase order' | 'R&D'; projectManager: string }) => void;
  addMilestone: (projectCode: string, newMilestone: { name: string; startDate: string; endDate: string; assignedTo: string }) => void;
  updateMilestoneProgress: (
    projectCode: string,
    milestoneId: string,
    status: MilestoneStatus,
    actualDate?: string,
    delayRecord?: DelayRecord
  ) => void;
  
  // User Actions
  addUser: (newUser: { fullName: string; loginName: string; role: 'Administrator' | 'Project manager' | 'Member' }) => void;
  removeUser: (userId: string) => void;
  resetUserPassword: (userId: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [projects, setProjects] = useState<Project[]>(() => {
    const saved = localStorage.getItem('pms_projects');
    return saved ? JSON.parse(saved) : INITIAL_PROJECTS;
  });

  const [users, setUsers] = useState<User[]>(() => {
    const saved = localStorage.getItem('pms_users');
    return saved ? JSON.parse(saved) : INITIAL_USERS;
  });

  const [alerts, setAlerts] = useState<AlertItem[]>(() => {
    const saved = localStorage.getItem('pms_alerts');
    return saved ? JSON.parse(saved) : getInitialAlerts();
  });

  const [currentUser, setCurrentUser] = useState<User>(() => {
    return users.find((u) => u.loginName === 'divya.upadhyay') || users[0];
  });

  const [currentScreen, setCurrentScreen] = useState<'dashboard' | 'projects' | 'users' | 'project-detail'>('dashboard');
  const [selectedProjectCode, setSelectedProjectCode] = useState<string | null>(null);

  // Show deadline beacon popup automatically once on mount (PRD §5.2)
  const [activeBeaconAlert, setActiveBeaconAlert] = useState<AlertItem | null>(() => {
    return alerts.find((a) => a.projectCode === 'P104') || alerts[0] || null;
  });

  const [isAlertHistoryOpen, setIsAlertHistoryOpen] = useState(false);

  // Sync state to local storage
  useEffect(() => {
    localStorage.setItem('pms_projects', JSON.stringify(projects));
  }, [projects]);

  useEffect(() => {
    localStorage.setItem('pms_users', JSON.stringify(users));
  }, [users]);

  useEffect(() => {
    localStorage.setItem('pms_alerts', JSON.stringify(alerts));
  }, [alerts]);

  const navigateTo = (screen: 'dashboard' | 'projects' | 'users' | 'project-detail', projectCode?: string) => {
    if (projectCode) {
      setSelectedProjectCode(projectCode);
    }
    setCurrentScreen(screen);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const openAlertHistory = () => setIsAlertHistoryOpen(true);
  const closeAlertHistory = () => setIsAlertHistoryOpen(false);

  const showBeaconAlert = (alert: AlertItem) => {
    setActiveBeaconAlert(alert);
  };

  const closeBeaconAlert = () => {
    setActiveBeaconAlert(null);
  };

  const markAlertAsRead = (alertId: string) => {
    setAlerts((prev) =>
      prev.map((item) => (item.id === alertId ? { ...item, isRead: true } : item))
    );
  };

  const addProject = ({
    code,
    name,
    type,
    projectManager,
  }: {
    code: string;
    name: string;
    type: 'Purchase order' | 'R&D';
    projectManager: string;
  }) => {
    const newProj: Project = {
      code: code.trim().toUpperCase(),
      name: name.trim(),
      type,
      projectManager,
      milestones: [],
    };
    setProjects((prev) => [newProj, ...prev]);
  };

  const addMilestone = (
    projectCode: string,
    newMilestone: { name: string; startDate: string; endDate: string; assignedTo: string }
  ) => {
    setProjects((prev) =>
      prev.map((proj) => {
        if (proj.code !== projectCode) return proj;
        const nextIndex = proj.milestones.length + 1;
        const milestoneCode = `M${nextIndex}`;
        const durationCategory = classifyDuration(newMilestone.startDate, newMilestone.endDate);
        const milestone: Milestone = {
          id: `${projectCode.toLowerCase()}-m${nextIndex}-${Date.now()}`,
          code: milestoneCode,
          name: newMilestone.name,
          startDate: newMilestone.startDate,
          endDate: newMilestone.endDate,
          targetDate: newMilestone.endDate,
          durationCategory,
          assignedTo: newMilestone.assignedTo,
          status: 'Not started',
        };
        return {
          ...proj,
          milestones: [...proj.milestones, milestone],
        };
      })
    );
  };

  const updateMilestoneProgress = (
    projectCode: string,
    milestoneId: string,
    status: MilestoneStatus,
    actualDate?: string,
    delayRecord?: DelayRecord
  ) => {
    setProjects((prev) =>
      prev.map((proj) => {
        if (proj.code !== projectCode) return proj;
        return {
          ...proj,
          milestones: proj.milestones.map((m) => {
            if (m.id !== milestoneId) return m;
            return {
              ...m,
              status,
              actualDate: status === 'Completed' ? actualDate || SIMULATION_TODAY_STR : undefined,
              delayRecord: status === 'Delayed' ? delayRecord : undefined,
              lastProgressUpdate: SIMULATION_TODAY_STR,
            };
          }),
        };
      })
    );
  };

  const addUser = (newUser: {
    fullName: string;
    loginName: string;
    role: 'Administrator' | 'Project manager' | 'Member';
  }) => {
    const initials = newUser.fullName
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);

    const created: User = {
      id: `u-${Date.now()}`,
      fullName: newUser.fullName.trim(),
      loginName: newUser.loginName.trim().toLowerCase(),
      role: newUser.role,
      status: 'Active',
      initials: initials || 'US',
      createdDate: '24 Oct 2026',
    };
    setUsers((prev) => [...prev, created]);
  };

  const removeUser = (userId: string) => {
    setUsers((prev) => {
      if (prev.length <= 1) {
        alert('Cannot remove the last user.');
        return prev;
      }
      return prev.filter((u) => u.id !== userId);
    });
  };

  const resetUserPassword = (userId: string) => {
    alert(`Temporary password generated and reset for user ID: ${userId}. Password handed over directly by admin.`);
  };

  return (
    <AppContext.Provider
      value={{
        projects,
        users,
        alerts,
        currentScreen,
        selectedProjectCode,
        activeBeaconAlert,
        isAlertHistoryOpen,
        currentUser,
        navigateTo,
        setCurrentUser,
        openAlertHistory,
        closeAlertHistory,
        showBeaconAlert,
        closeBeaconAlert,
        markAlertAsRead,
        addProject,
        addMilestone,
        updateMilestoneProgress,
        addUser,
        removeUser,
        resetUserPassword,
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
