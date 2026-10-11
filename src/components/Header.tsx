import React, { useState } from 'react';
import { useApp } from '../context/AppContext';

export const Header: React.FC = () => {
  const { alerts, openAlertHistory, currentUser, setCurrentUser, users } = useApp();
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const unreadAlertsCount = alerts.filter((a) => !a.isRead).length;

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-primary-container shadow-[0_1px_8px_rgba(0,0,0,0.06)]">
      <div className="h-16 w-full px-margin flex items-center justify-between gap-space-md">
        {/* Logo and Project Name */}
        <div className="flex items-center gap-space-lg flex-shrink-0">
          <div className="flex items-center gap-space-sm cursor-pointer">
            <span className="material-symbols-outlined text-white text-[28px]">
              precision_manufacturing
            </span>
            <span className="font-headline text-headline-sm text-on-primary tracking-tight whitespace-nowrap font-bold text-lg md:text-xl">
              Project Monitoring System
            </span>
          </div>
        </div>

        {/* Global Search & Action Icons */}
        <div className="flex items-center gap-space-md flex-1 max-w-md justify-end">
          {/* Search bar */}
          <div className="relative w-full max-w-xs hidden sm:block">
            <span className="material-symbols-outlined absolute left-2.5 top-1/2 -translate-y-1/2 text-on-primary/60 text-[18px]">
              search
            </span>
            <input
              className="w-full h-9 pl-9 pr-space-md bg-on-primary/15 placeholder-on-primary/60 text-on-primary text-xs md:text-sm rounded-xl outline-none focus:bg-on-primary/25 focus:ring-1 focus:ring-on-primary/40 transition-all"
              placeholder="Search projects..."
              type="text"
            />
          </div>

          {/* Fixed Simulation Date Pill (24 Oct 2026) */}
          <div className="hidden lg:flex items-center gap-1.5 px-3 py-1 bg-white/10 rounded-lg text-xs text-on-primary font-medium border border-white/15">
            <span className="material-symbols-outlined text-[15px] text-amber-300">event</span>
            <span>24 Oct 2026</span>
          </div>

          {/* Notifications Button (Bell Icon) */}
          <button
            onClick={openAlertHistory}
            className="relative p-2 text-on-primary/90 hover:text-on-primary hover:bg-on-primary/10 rounded-lg transition-colors flex items-center justify-center cursor-pointer"
            title="View Alert History"
          >
            <span className="material-symbols-outlined text-[20px]">notifications</span>
            {unreadAlertsCount > 0 && (
              <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-error rounded-full ring-2 ring-primary-container animate-pulse"></span>
            )}
          </button>

          {/* User Profile Avatar with Dropdown */}
          <div className="relative flex items-center">
            <button
              onClick={() => setShowProfileMenu((prev) => !prev)}
              className="w-8 h-8 rounded-full bg-primary flex items-center justify-center ring-2 ring-white/80 shadow-sm focus:outline-none cursor-pointer hover:opacity-90"
              title="Current User Menu"
            >
              <span className="font-semibold text-xs text-on-primary">{currentUser.initials}</span>
            </button>

            {/* Profile Dropdown (dashboard_profile_menu) */}
            {showProfileMenu && (
              <>
                <div
                  className="fixed inset-0 z-40"
                  onClick={() => setShowProfileMenu(false)}
                />
                <div className="absolute right-0 top-12 z-50 w-72 bg-white rounded-xl shadow-xl p-4 text-on-surface border border-slate-200">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-bold text-sm flex-shrink-0">
                      {currentUser.initials}
                    </div>
                    <div className="flex flex-col min-w-0">
                      <span className="font-semibold text-sm text-slate-900 truncate">
                        {currentUser.fullName}
                      </span>
                      <span className="text-xs text-slate-500 font-medium">
                        {currentUser.role}
                      </span>
                    </div>
                  </div>

                  {/* Switch Active User Demo Selector */}
                  <div className="mt-3 pt-3 border-t border-slate-100">
                    <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block mb-2">
                      Switch Role / User:
                    </span>
                    <div className="flex flex-col gap-1">
                      {users.map((u) => (
                        <button
                          key={u.id}
                          onClick={() => {
                            setCurrentUser(u);
                            setShowProfileMenu(false);
                          }}
                          className={`flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs text-left transition-colors ${
                            currentUser.id === u.id
                              ? 'bg-primary-container/10 text-primary font-semibold'
                              : 'text-slate-700 hover:bg-slate-50'
                          }`}
                        >
                          <span className="truncate">{u.fullName}</span>
                          <span className="text-[10px] text-slate-400">{u.role}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="my-2 border-t border-slate-100"></div>
                  <div className="text-xs text-slate-500 flex items-center gap-1.5 px-1 py-1">
                    <span className="material-symbols-outlined text-[16px] text-emerald-600">check_circle</span>
                    <span>No password login needed</span>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
