import React from 'react';
import { useApp } from '../context/AppContext';

export const AlertHistoryDrawer: React.FC = () => {
  const { isAlertHistoryOpen, closeAlertHistory, alerts, navigateTo, showBeaconAlert } = useApp();

  if (!isAlertHistoryOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-900/30 backdrop-blur-[2px] z-50 transition-opacity"
        onClick={closeAlertHistory}
      />

      {/* Drawer */}
      <aside className="fixed right-0 top-16 bottom-0 w-[380px] sm:w-[420px] bg-white shadow-[-4px_0_24px_rgba(0,0,0,0.08)] z-50 flex flex-col justify-between border-l border-slate-200 animate-slideLeft">
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="p-space-lg border-b border-slate-100 flex items-start justify-between">
            <div className="flex flex-col">
              <h2 className="font-headline text-lg font-bold text-slate-900 tracking-tight">
                Alert history
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Closing a popup never deletes it
              </p>
            </div>
            <button
              onClick={closeAlertHistory}
              className="p-1 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition-colors flex items-center justify-center cursor-pointer"
              title="Close alerts"
            >
              <span className="material-symbols-outlined text-[20px]">close</span>
            </button>
          </div>

          {/* List of Alerts */}
          <div className="flex-1 overflow-y-auto p-space-md flex flex-col gap-space-sm">
            {alerts.map((alert) => (
              <div
                key={alert.id}
                onClick={() => {
                  closeAlertHistory();
                  showBeaconAlert(alert);
                }}
                className="p-space-md rounded-xl bg-slate-50 hover:bg-slate-100 transition-colors border border-slate-200/70 flex flex-col gap-1.5 cursor-pointer group"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-space-xs">
                    <span
                      className={`w-2 h-2 rounded-full flex-shrink-0 ${
                        alert.isOverdue ? 'bg-error animate-pulse' : 'bg-amber-500'
                      }`}
                    ></span>
                    <span className="text-sm font-semibold text-slate-900 group-hover:text-primary transition-colors">
                      {alert.projectName}
                    </span>
                  </div>
                  <span className="text-[11px] font-mono text-slate-500 font-medium">
                    {alert.projectCode}
                  </span>
                </div>

                <div className="flex items-center justify-between pl-3.5 text-xs text-slate-500">
                  <span className={alert.isOverdue ? 'text-error font-semibold' : 'text-amber-800'}>
                    {alert.subText}
                  </span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      closeAlertHistory();
                      navigateTo('project-detail', alert.projectCode);
                    }}
                    className="text-primary hover:underline font-medium text-[11px]"
                  >
                    View Project →
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Footer count */}
          <div className="p-space-md border-t border-slate-100 bg-slate-50 flex items-center justify-between">
            <span className="text-xs text-slate-500 font-medium">
              {alerts.length} alerts logged
            </span>
            <span className="text-[11px] text-slate-400">
              Auto-evaluated as of 24 Oct 2026
            </span>
          </div>
        </div>
      </aside>
    </>
  );
};
