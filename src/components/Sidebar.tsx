import React from 'react';
import { useApp } from '../context/AppContext';

export const Sidebar: React.FC = () => {
  const { currentScreen, navigateTo } = useApp();

  const navItems = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: 'dashboard',
    },
    {
      id: 'projects',
      label: 'Projects',
      icon: 'folder',
    },
    {
      id: 'users',
      label: 'Users',
      icon: 'group',
    },
  ] as const;

  return (
    <aside className="fixed left-0 top-16 bottom-0 w-64 bg-surface-container-lowest shadow-[0_1px_8px_rgba(0,0,0,0.03)] z-40 flex flex-col justify-between p-space-md overflow-y-auto border-r border-slate-100">
      <div className="flex flex-col gap-space-lg">
        <nav className="flex flex-col gap-space-xs">
          {navItems.map((item) => {
            const isActive =
              currentScreen === item.id ||
              (item.id === 'projects' && currentScreen === 'project-detail');

            return (
              <button
                key={item.id}
                onClick={() => navigateTo(item.id)}
                className={`flex items-center gap-space-sm px-space-sm py-2.5 rounded-lg transition-colors text-left text-sm font-medium cursor-pointer ${
                  isActive
                    ? 'bg-surface-container-high text-on-surface font-semibold shadow-xs'
                    : 'text-on-surface-variant hover:bg-surface-container-low hover:text-on-surface'
                }`}
              >
                <span
                  className={`material-symbols-outlined text-[20px] ${
                    isActive ? 'text-primary fill-1' : 'text-slate-500'
                  }`}
                >
                  {item.icon}
                </span>
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Footer Info Box */}
      <div className="p-3 bg-surface-container-low rounded-xl text-xs text-on-surface-variant flex flex-col gap-1">
        <div className="font-semibold text-slate-800 flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
          <span>Simulation Active</span>
        </div>
        <span className="text-[11px] text-slate-500">
          Evaluated as of: 24 Oct 2026
        </span>
      </div>
    </aside>
  );
};
