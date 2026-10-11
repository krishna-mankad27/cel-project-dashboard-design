import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import type { Milestone, MilestoneStatus } from '../types';
import { getDaysRemaining, formatDate, getAlertPointsPreview } from '../utils/dateUtils';
import { getProjectStatus } from '../data/mockData';

export const ProjectDetailView: React.FC = () => {
  const { projects, selectedProjectCode, navigateTo, addMilestone, updateMilestoneProgress, users } = useApp();

  // Selected project fallback
  const project = projects.find((p) => p.code === selectedProjectCode) || projects[0];

  // Modals state
  const [isAddMilestoneOpen, setIsAddMilestoneOpen] = useState(false);
  const [editingMilestone, setEditingMilestone] = useState<Milestone | null>(null);

  // New Milestone Form State
  const [newActivityName, setNewActivityName] = useState('');
  const [newStartDate, setNewStartDate] = useState('2026-10-25');
  const [newEndDate, setNewEndDate] = useState('2026-10-31');
  const [newAssignedTo, setNewAssignedTo] = useState(users[2]?.fullName || users[0]?.fullName || '');

  // Edit Milestone Form State (PRD §4 & §6.2)
  const [editStatus, setEditStatus] = useState<MilestoneStatus>('In progress');
  const [editActualDate, setEditActualDate] = useState('');
  const [delayReason, setDelayReason] = useState('');
  const [delayAction, setDelayAction] = useState('');
  const [delaySupportFromHOD, setDelaySupportFromHOD] = useState('');

  if (!project) return null;

  const projectStatus = getProjectStatus(project);
  const totalMilestones = project.milestones.length;
  const completedMilestones = project.milestones.filter((m) => m.status === 'Completed').length;
  const delayedMilestones = project.milestones.filter((m) => m.status === 'Delayed').length;
  const pendingMilestones = totalMilestones - completedMilestones - delayedMilestones;

  // Sorted by most urgent first
  const sortedMilestones = [...project.milestones].sort((a, b) => {
    // Delayed first
    if (a.status === 'Delayed' && b.status !== 'Delayed') return -1;
    if (b.status === 'Delayed' && a.status !== 'Delayed') return 1;
    // Earliest end date
    return new Date(a.endDate).getTime() - new Date(b.endDate).getTime();
  });

  const handleOpenEdit = (m: Milestone) => {
    setEditingMilestone(m);
    setEditStatus(m.status);
    setEditActualDate(m.actualDate || '');
    setDelayReason(m.delayRecord?.reason || '');
    setDelayAction(m.delayRecord?.correctiveAction || '');
    setDelaySupportFromHOD(m.delayRecord?.supportFromHOD || '');
  };

  const handleSaveProgress = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingMilestone) return;

    const delayRecord =
      editStatus === 'Delayed'
        ? {
            reason: delayReason,
            correctiveAction: delayAction,
            supportFromHOD: delaySupportFromHOD,
          }
        : undefined;

    updateMilestoneProgress(
      project.code,
      editingMilestone.id,
      editStatus,
      editActualDate,
      delayRecord
    );

    setEditingMilestone(null);
  };

  const handleCreateMilestone = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newActivityName.trim()) return;

    addMilestone(project.code, {
      name: newActivityName,
      startDate: newStartDate,
      endDate: newEndDate,
      assignedTo: newAssignedTo,
    });

    setNewActivityName('');
    setIsAddMilestoneOpen(false);
  };

  return (
    <div className="flex flex-col w-full pb-16">
      <div className="p-margin flex flex-col gap-space-lg w-full max-w-[1600px] mx-auto">
        {/* Top Navigation & Breadcrumbs */}
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center gap-space-sm text-xs md:text-sm">
            <button
              onClick={() => navigateTo('projects')}
              className="inline-flex items-center gap-1 text-primary hover:text-primary-container font-semibold transition-colors cursor-pointer group"
            >
              <span className="material-symbols-outlined text-[18px] transition-transform group-hover:-translate-x-0.5">
                arrow_back
              </span>
              <span>Projects</span>
            </button>
            <span className="text-slate-300">/</span>
            <span className="font-mono text-slate-500 font-semibold">{project.code}</span>
            <span className="text-slate-300">/</span>
            <span className="text-slate-900 font-semibold truncate max-w-xs md:max-w-md">
              {project.name}
            </span>
          </div>

          <div className="flex items-center gap-space-sm">
            <button
              onClick={() => setIsAddMilestoneOpen(true)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-primary-container text-white text-xs font-semibold shadow-sm hover:bg-primary transition-colors cursor-pointer"
            >
              <span className="material-symbols-outlined text-[16px]">add</span>
              <span>Add activity</span>
            </button>
          </div>
        </div>

        {/* Primary Project Summary Card */}
        <div className="w-full bg-white rounded-xl shadow-sm border border-slate-200 p-space-lg flex flex-col gap-space-lg">
          {/* Header Block: Title, Badges & Manager */}
          <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-space-md">
            <div className="flex flex-col gap-space-xs min-w-0">
              <div className="flex flex-wrap items-center gap-space-sm">
                {/* Status Pill */}
                {projectStatus === 'Slipping' && (
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-red-100 text-red-700 text-xs font-semibold">
                    <span className="w-1.5 h-1.5 rounded-full bg-error animate-pulse"></span>
                    <span>Slipping</span>
                  </div>
                )}
                {projectStatus === 'Due in 2 days' && (
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-800 text-xs font-semibold">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
                    <span>Due in 2 days</span>
                  </div>
                )}
                {projectStatus === 'On track' && (
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-xs font-semibold">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-600"></span>
                    <span>On track</span>
                  </div>
                )}

                {/* Project Type Badge */}
                <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700 text-xs font-semibold">
                  <span className="material-symbols-outlined text-[14px]">receipt_long</span>
                  <span>{project.type}</span>
                </div>
              </div>

              <h1 className="font-headline text-2xl md:text-3xl font-bold text-slate-900 tracking-tight mt-1">
                {project.name}
              </h1>
            </div>

            {/* Project Manager pill badge */}
            <div className="flex items-center gap-3 p-2 pr-4 rounded-xl bg-slate-50 border border-slate-200/70 flex-shrink-0 self-start">
              <div className="w-9 h-9 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-sm">
                {project.projectManager.substring(0, 2).toUpperCase()}
              </div>
              <div className="flex flex-col">
                <span className="text-[11px] text-slate-400 uppercase tracking-wider font-semibold">
                  Project Manager
                </span>
                <span className="text-xs font-bold text-slate-900">
                  {project.projectManager}
                </span>
              </div>
            </div>
          </div>

          {/* Metadata & Metric Grid Bar */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-space-md pt-space-md bg-slate-50 p-space-md rounded-lg border border-slate-200/50">
            {/* Milestone Velocity */}
            <div className="flex flex-col gap-1 min-w-0">
              <span className="text-xs text-slate-500 font-semibold">Milestone Progress</span>
              <div className="flex items-baseline gap-1.5">
                <span className="font-headline text-xl font-bold text-slate-900">
                  {completedMilestones} of {totalMilestones}
                </span>
                <span className="text-xs text-slate-500">done</span>
              </div>
              {/* Multi-segment progress bar */}
              <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden flex mt-1">
                <div
                  className="bg-emerald-600 h-full"
                  style={{ width: `${(completedMilestones / (totalMilestones || 1)) * 100}%` }}
                ></div>
                <div
                  className="bg-error h-full"
                  style={{ width: `${(delayedMilestones / (totalMilestones || 1)) * 100}%` }}
                ></div>
                <div
                  className="bg-slate-300 h-full"
                  style={{ width: `${(pendingMilestones / (totalMilestones || 1)) * 100}%` }}
                ></div>
              </div>
            </div>

            {/* Deadline Status */}
            <div className="flex flex-col gap-1 min-w-0">
              <span className="text-xs text-slate-500 font-semibold uppercase tracking-wider">
                Current State
              </span>
              <div className="flex items-center gap-1.5">
                {projectStatus === 'Slipping' && (
                  <div className="flex items-center gap-1.5 text-error font-semibold text-sm">
                    <span className="material-symbols-outlined text-[18px]">event_busy</span>
                    <span>Late milestone requiring corrective action</span>
                  </div>
                )}
                {projectStatus === 'Due in 2 days' && (
                  <div className="flex items-center gap-1.5 text-amber-800 font-semibold text-sm">
                    <span className="material-symbols-outlined text-[18px]">schedule</span>
                    <span>Deadline approaching within 2 days</span>
                  </div>
                )}
                {projectStatus === 'On track' && (
                  <div className="flex items-center gap-1.5 text-emerald-800 font-semibold text-sm">
                    <span className="material-symbols-outlined text-[18px]">check_circle</span>
                    <span>All milestones running according to schedule</span>
                  </div>
                )}
              </div>
              <span className="text-[11px] text-slate-500">
                Auto-calculated against simulation date: 24 Oct 2026
              </span>
            </div>
          </div>
        </div>

        {/* Milestones Main Section */}
        <div className="flex flex-col gap-space-md">
          {/* Section Header */}
          <div className="flex flex-wrap items-center justify-between gap-space-sm">
            <div className="flex items-center gap-space-sm">
              <h2 className="font-headline text-lg font-bold text-slate-900">Milestones</h2>
              <span className="px-2 py-0.5 rounded-full bg-slate-100 text-xs font-semibold text-slate-600">
                {totalMilestones} total
              </span>
              <div className="hidden sm:flex items-center gap-2 text-xs text-slate-500 ml-2">
                <span className="inline-flex items-center gap-1 text-emerald-700 font-medium">
                  <span className="w-2 h-2 rounded-full bg-emerald-600"></span>
                  {completedMilestones} completed
                </span>
                <span>·</span>
                <span className="inline-flex items-center gap-1 text-error font-medium">
                  <span className="w-2 h-2 rounded-full bg-error"></span>
                  {delayedMilestones} delayed
                </span>
                <span>·</span>
                <span className="inline-flex items-center gap-1 text-slate-600 font-medium">
                  <span className="w-2 h-2 rounded-full bg-slate-400"></span>
                  {pendingMilestones} pending
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-500">Sorted by:</span>
              <span className="px-2.5 py-1 rounded bg-white border border-slate-200 text-xs font-semibold text-slate-800 flex items-center gap-1">
                <span>Most urgent first</span>
                <span className="material-symbols-outlined text-[16px] text-slate-400">sort</span>
              </span>
            </div>
          </div>

          {/* Milestones Table */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden flex flex-col">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50/70 text-slate-500 text-xs font-semibold tracking-wider uppercase border-b border-slate-100">
                    <th className="py-2.5 px-space-lg w-12">#</th>
                    <th className="py-2.5 px-space-md min-w-[240px]">Milestone</th>
                    <th className="py-2.5 px-space-md min-w-[160px]">Start – End</th>
                    <th className="py-2.5 px-space-md min-w-[110px]">Cadence</th>
                    <th className="py-2.5 px-space-md min-w-[150px]">Assigned To</th>
                    <th className="py-2.5 px-space-md text-center min-w-[120px]">Status</th>
                    <th className="py-2.5 px-space-lg text-right w-24">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-xs text-slate-800">
                  {sortedMilestones.map((m) => {
                    const isDelayed = m.status === 'Delayed';
                    const daysRemaining = getDaysRemaining(m.endDate);

                    return (
                      <React.Fragment key={m.id}>
                        <tr
                          className={`hover:bg-slate-50/80 transition-colors ${
                            isDelayed ? 'bg-red-50/30' : ''
                          }`}
                        >
                          <td className="py-3 px-space-lg font-mono font-bold text-slate-500">
                            {m.code}
                          </td>
                          <td className="py-3 px-space-md">
                            <div className="flex flex-col">
                              <span className="font-semibold text-slate-900 text-sm">
                                {m.name}
                              </span>
                              {m.lastProgressUpdate && (
                                <span className="text-[11px] text-slate-400">
                                  Last update: {formatDate(m.lastProgressUpdate, 'short')}
                                </span>
                              )}
                            </div>
                          </td>
                          <td className="py-3 px-space-md font-mono text-slate-600">
                            <div className="flex flex-col">
                              <span>
                                {formatDate(m.startDate, 'short')} – {formatDate(m.endDate, 'short')}
                              </span>
                              {isDelayed && (
                                <span className="text-error font-semibold text-[11px]">
                                  {Math.abs(daysRemaining)} days overdue
                                </span>
                              )}
                            </div>
                          </td>
                          <td className="py-3 px-space-md">
                            <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-700 text-[11px] font-medium">
                              {m.durationCategory}
                            </span>
                          </td>
                          <td className="py-3 px-space-md font-medium text-slate-800">
                            {m.assignedTo}
                          </td>
                          <td className="py-3 px-space-md text-center">
                            {m.status === 'Completed' && (
                              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[11px] font-semibold">
                                Completed
                              </span>
                            )}
                            {m.status === 'Delayed' && (
                              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-red-100 text-red-700 text-[11px] font-semibold">
                                <span className="w-1.5 h-1.5 rounded-full bg-error animate-pulse"></span>
                                Delayed
                              </span>
                            )}
                            {m.status === 'In progress' && (
                              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-800 text-[11px] font-semibold">
                                In progress
                              </span>
                            )}
                            {m.status === 'Not started' && (
                              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-600 text-[11px] font-semibold">
                                Not started
                              </span>
                            )}
                          </td>
                          <td className="py-3 px-space-lg text-right">
                            <button
                              onClick={() => handleOpenEdit(m)}
                              className="text-primary hover:text-primary-container font-semibold hover:underline cursor-pointer"
                            >
                              Update
                            </button>
                          </td>
                        </tr>

                        {/* Delay Record Box if Late/Delayed (PRD §4, §6.2) */}
                        {isDelayed && m.delayRecord && (
                          <tr className="bg-red-50/50">
                            <td colSpan={7} className="px-space-lg py-3 border-t border-red-100">
                              <div className="flex flex-col gap-1.5 bg-white p-3 rounded-lg border border-red-200">
                                <div className="text-xs font-bold text-red-900 uppercase tracking-wide flex items-center gap-1">
                                  <span className="material-symbols-outlined text-[16px] text-error">
                                    report_problem
                                  </span>
                                  <span>Delay record · {m.code} {m.name}</span>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-2 mt-1 text-xs">
                                  <div>
                                    <span className="font-semibold text-slate-700 block">
                                      Reason for delay:
                                    </span>
                                    <span className="text-slate-600">
                                      {m.delayRecord.reason}
                                    </span>
                                  </div>
                                  <div>
                                    <span className="font-semibold text-slate-700 block">
                                      Corrective action:
                                    </span>
                                    <span className="text-slate-600">
                                      {m.delayRecord.correctiveAction}
                                    </span>
                                  </div>
                                  <div>
                                    <span className="font-semibold text-slate-700 block">
                                      Support from HOD:
                                    </span>
                                    <span className="text-slate-600">
                                      {m.delayRecord.supportFromHOD}
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </td>
                          </tr>
                        )}
                      </React.Fragment>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* Add Activity Modal (PRD §3.2) */}
      {isAddMilestoneOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-space-md bg-slate-900/40 backdrop-blur-[2px] animate-fadeIn">
          <div className="w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-slate-200 p-6 flex flex-col gap-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-headline text-lg font-bold text-slate-900">
                Add activity to {project.code}
              </h3>
              <button
                onClick={() => setIsAddMilestoneOpen(false)}
                className="text-slate-400 hover:text-slate-800"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            <form onSubmit={handleCreateMilestone} className="flex flex-col gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Activity name
                </label>
                <input
                  value={newActivityName}
                  onChange={(e) => setNewActivityName(e.target.value)}
                  placeholder="e.g. Ultrasonic flaw detection"
                  required
                  className="w-full h-9 px-3 rounded-lg bg-slate-50 text-slate-900 text-sm border border-slate-200 outline-none focus:border-primary"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Start date
                  </label>
                  <input
                    type="date"
                    value={newStartDate}
                    onChange={(e) => setNewStartDate(e.target.value)}
                    required
                    className="w-full h-9 px-3 rounded-lg bg-slate-50 text-slate-900 text-sm border border-slate-200 outline-none focus:border-primary"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    End date
                  </label>
                  <input
                    type="date"
                    value={newEndDate}
                    onChange={(e) => setNewEndDate(e.target.value)}
                    required
                    className="w-full h-9 px-3 rounded-lg bg-slate-50 text-slate-900 text-sm border border-slate-200 outline-none focus:border-primary"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Assigned to
                </label>
                <select
                  value={newAssignedTo}
                  onChange={(e) => setNewAssignedTo(e.target.value)}
                  className="w-full h-9 px-3 rounded-lg bg-slate-50 text-slate-900 text-sm border border-slate-200 outline-none focus:border-primary"
                >
                  {users.map((u) => (
                    <option key={u.id} value={u.fullName}>
                      {u.fullName} ({u.role})
                    </option>
                  ))}
                </select>
              </div>

              {/* PRD §3.2: Live duration & Alert classification preview */}
              <div className="p-3 bg-indigo-50/70 border border-indigo-200/70 rounded-xl flex items-center justify-between text-xs">
                <span className="font-semibold text-indigo-900">
                  {getAlertPointsPreview(newStartDate, newEndDate)}
                </span>
                <span className="text-[11px] text-indigo-600">Auto-classified</span>
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsAddMilestoneOpen(false)}
                  className="px-4 py-2 text-xs font-medium text-slate-600 hover:bg-slate-100 rounded-lg cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-xs font-semibold bg-primary text-white rounded-lg hover:bg-primary-container cursor-pointer"
                >
                  Save Activity
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Update Progress & Delay Record Modal (PRD §4 & §6.2) */}
      {editingMilestone && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-space-md bg-slate-900/40 backdrop-blur-[2px] animate-fadeIn">
          <div className="w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-slate-200 p-6 flex flex-col gap-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <h3 className="font-headline text-lg font-bold text-slate-900">
                  Update progress: {editingMilestone.code}
                </h3>
                <p className="text-xs text-slate-500">{editingMilestone.name}</p>
              </div>
              <button
                onClick={() => setEditingMilestone(null)}
                className="text-slate-400 hover:text-slate-800"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            <form onSubmit={handleSaveProgress} className="flex flex-col gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Status
                </label>
                <select
                  value={editStatus}
                  onChange={(e) => setEditStatus(e.target.value as MilestoneStatus)}
                  className="w-full h-9 px-3 rounded-lg bg-slate-50 text-slate-900 text-sm border border-slate-200 outline-none focus:border-primary"
                >
                  <option value="Not started">Not started</option>
                  <option value="In progress">In progress</option>
                  <option value="Completed">Completed</option>
                  <option value="Delayed">Delayed</option>
                </select>
              </div>

              {editStatus === 'Completed' && (
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Actual completion date
                  </label>
                  <input
                    type="date"
                    value={editActualDate || '2026-10-24'}
                    onChange={(e) => setEditActualDate(e.target.value)}
                    className="w-full h-9 px-3 rounded-lg bg-slate-50 text-slate-900 text-sm border border-slate-200 outline-none focus:border-primary"
                  />
                </div>
              )}

              {/* Delay Record Form Fields (PRD §4 & §6.2) */}
              {editStatus === 'Delayed' && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-xl flex flex-col gap-2.5">
                  <span className="text-xs font-bold text-red-800">
                    Delay record fields (Reason, Corrective action, Support from HOD):
                  </span>
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-700 mb-0.5">
                      Reason for delay:
                    </label>
                    <input
                      value={delayReason}
                      onChange={(e) => setDelayReason(e.target.value)}
                      required
                      placeholder="e.g. Awaiting vendor replacement probe"
                      className="w-full h-8 px-2.5 rounded bg-white text-xs border border-red-200 text-slate-800 outline-none focus:border-red-400"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-700 mb-0.5">
                      Corrective action:
                    </label>
                    <input
                      value={delayAction}
                      onChange={(e) => setDelayAction(e.target.value)}
                      required
                      placeholder="e.g. Expedited courier dispatched; vendor follow-up call"
                      className="w-full h-8 px-2.5 rounded bg-white text-xs border border-red-200 text-slate-800 outline-none focus:border-red-400"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-700 mb-0.5">
                      Support from HOD:
                    </label>
                    <input
                      value={delaySupportFromHOD}
                      onChange={(e) => setDelaySupportFromHOD(e.target.value)}
                      required
                      placeholder="e.g. Escalation requested; awaiting reply"
                      className="w-full h-8 px-2.5 rounded bg-white text-xs border border-red-200 text-slate-800 outline-none focus:border-red-400"
                    />
                  </div>
                </div>
              )}

              <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setEditingMilestone(null)}
                  className="px-4 py-2 text-xs font-medium text-slate-600 hover:bg-slate-100 rounded-lg cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-xs font-semibold bg-primary text-white rounded-lg hover:bg-primary-container cursor-pointer"
                >
                  Update Milestone
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
