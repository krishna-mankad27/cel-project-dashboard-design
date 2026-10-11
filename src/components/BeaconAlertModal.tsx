import React from 'react';
import { useApp } from '../context/AppContext';

export const BeaconAlertModal: React.FC = () => {
  const { activeBeaconAlert, closeBeaconAlert, navigateTo } = useApp();

  if (!activeBeaconAlert) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/45 backdrop-blur-[4px] animate-fadeIn"
      id="alert-modal-backdrop"
    >
      <div
        className="w-full max-w-lg bg-white rounded-2xl shadow-2xl p-6 relative flex flex-col border border-slate-100"
        style={{
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
        }}
      >
        {/* Header with Title and Pill */}
        <div className="flex items-center justify-between gap-2 mb-4">
          <div className="flex items-center gap-2">
            <span
              className={`material-symbols-outlined text-[24px] ${
                activeBeaconAlert.isOverdue ? 'text-error' : 'text-amber-500'
              }`}
            >
              {activeBeaconAlert.isOverdue ? 'warning' : 'schedule'}
            </span>
            <h3 className="text-lg font-bold text-slate-900 font-headline">
              {activeBeaconAlert.title}
            </h3>
          </div>
          <span
            className={`text-xs font-semibold px-2.5 py-1 rounded-full border inline-flex items-center ${
              activeBeaconAlert.isOverdue
                ? 'bg-red-50 text-red-700 border-red-200'
                : 'bg-amber-50 text-amber-800 border-amber-200'
            }`}
          >
            {activeBeaconAlert.badgeText}
          </span>
        </div>

        {/* Content body */}
        <div className="mb-6 flex flex-col gap-3">
          <div>
            <h4 className="text-xl font-bold text-slate-900 font-headline mb-0.5">
              {activeBeaconAlert.projectName}
            </h4>
            <p className="text-sm text-slate-500 font-medium">
              {activeBeaconAlert.projectCode} · weekly · ends {activeBeaconAlert.dateText}
            </p>
          </div>

          <div className="flex items-center gap-2 text-sm text-slate-700">
            <div className="w-6 h-6 rounded-full bg-secondary-fixed text-on-secondary-fixed text-xs flex items-center justify-center font-bold">
              {activeBeaconAlert.assignedTo.substring(0, 2).toUpperCase()}
            </div>
            <span className="font-medium">Assigned to {activeBeaconAlert.assignedTo}</span>
          </div>

          <div
            className={`text-xs rounded-lg p-2.5 flex items-center gap-2 ${
              activeBeaconAlert.isOverdue
                ? 'bg-red-50 border border-red-200 text-red-800'
                : 'bg-amber-50/80 border border-amber-200/80 text-amber-900'
            }`}
          >
            <span
              className={`material-symbols-outlined text-[16px] ${
                activeBeaconAlert.isOverdue ? 'text-red-600' : 'text-amber-600'
              }`}
            >
              info
            </span>
            <span>{activeBeaconAlert.lastUpdateText}</span>
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex items-center justify-end gap-3 pt-2 border-t border-slate-100">
          <button
            onClick={closeBeaconAlert}
            className="text-slate-600 hover:bg-slate-100 font-medium px-4 py-2 rounded-xl text-sm transition-colors cursor-pointer"
          >
            Close
          </button>
          <button
            onClick={() => {
              const code = activeBeaconAlert.projectCode;
              closeBeaconAlert();
              navigateTo('project-detail', code);
            }}
            className="bg-primary-container text-white font-semibold px-4 py-2 rounded-xl text-sm shadow-sm hover:opacity-95 transition-all cursor-pointer flex items-center gap-1.5"
          >
            <span className="material-symbols-outlined text-[18px]">edit_note</span>
            <span>Update progress</span>
          </button>
        </div>
      </div>
    </div>
  );
};
