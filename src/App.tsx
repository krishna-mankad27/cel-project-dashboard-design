import React from 'react';
import { useApp } from './context/AppContext';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { BeaconAlertModal } from './components/BeaconAlertModal';
import { AlertHistoryDrawer } from './components/AlertHistoryDrawer';
import { DashboardView } from './views/DashboardView';
import { ProjectsView } from './views/ProjectsView';
import { ProjectDetailView } from './views/ProjectDetailView';
import { UsersView } from './views/UsersView';

export const App: React.FC = () => {
  const { currentScreen } = useApp();

  return (
    <div className="min-h-screen bg-surface flex flex-col font-sans">
      {/* Fixed Header */}
      <Header />

      {/* Fixed Sidebar */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="pl-64">
        <main className="w-full pt-16 min-h-screen bg-surface">
          {currentScreen === 'dashboard' && <DashboardView />}
          {currentScreen === 'projects' && <ProjectsView />}
          {currentScreen === 'project-detail' && <ProjectDetailView />}
          {currentScreen === 'users' && <UsersView />}
        </main>
      </div>

      {/* Beacon Popup Alert (PRD §5.2) */}
      <BeaconAlertModal />

      {/* Alert History Slide-Over Drawer */}
      <AlertHistoryDrawer />
    </div>
  );
};

export default App;
