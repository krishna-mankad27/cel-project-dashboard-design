import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { getProjectStatus, getNextDeadlineInfo } from '../data/mockData';
import { NewProjectModal } from '../components/NewProjectModal';

export const DashboardView: React.FC = () => {
  const { projects, navigateTo } = useApp();
  const [filter, setFilter] = useState<'All' | 'Slipping' | 'Due soon' | 'On track'>('All');
  const [isNewProjectModalOpen, setIsNewProjectModalOpen] = useState(false);

  // Compute KPI counts dynamically based on simulation date 24 Oct 2026
  const slippingProjects = projects.filter((p) => getProjectStatus(p) === 'Slipping');
  const dueSoonProjects = projects.filter((p) => getProjectStatus(p) === 'Due in 2 days');
  const onTrackProjects = projects.filter((p) => getProjectStatus(p) === 'On track');

  // Urgency sorted: Slipping first, then Due in 2 days, then On track
  const sortedProjects = [...projects].sort((a, b) => {
    const statusOrder = { Slipping: 0, 'Due in 2 days': 1, 'On track': 2 };
    const orderA = statusOrder[getProjectStatus(a)];
    const orderB = statusOrder[getProjectStatus(b)];
    if (orderA !== orderB) return orderA - orderB;

    const deadlineA = getNextDeadlineInfo(a).daysRemaining;
    const deadlineB = getNextDeadlineInfo(b).daysRemaining;
    return deadlineA - deadlineB;
  });

  const filteredProjects = sortedProjects.filter((p) => {
    const st = getProjectStatus(p);
    if (filter === 'Slipping') return st === 'Slipping';
    if (filter === 'Due soon') return st === 'Due in 2 days';
    if (filter === 'On track') return st === 'On track';
    return true;
  });

  return (
    <div className="flex flex-col w-full pb-16">
      {/* Top Command & Status Bar */}
      <div className="px-margin py-space-xl flex flex-col gap-space-lg">
        {/* Header Section */}
        <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-space-md">
          <div className="flex flex-col gap-space-xs">
            <h1 className="font-headline text-3xl font-bold text-slate-900 tracking-tight">
              {slippingProjects.length} projects slipping{' '}
              <span className="text-slate-400 font-normal">·</span>{' '}
              {dueSoonProjects.length} due in 2 days
            </h1>
            <p className="text-xs text-slate-500">
              Evaluated on fixed date: <span className="font-semibold text-slate-700">24 Oct 2026</span>
            </p>
          </div>

          {/* Quick Action Controls */}
          <div className="flex items-center gap-space-sm flex-wrap">
            <button
              onClick={() => setIsNewProjectModalOpen(true)}
              className="h-9 px-space-md rounded-xl bg-primary-container text-white font-semibold text-sm shadow-md hover:bg-primary transition-all flex items-center gap-space-xs cursor-pointer"
            >
              <span className="material-symbols-outlined text-[18px]">add</span>
              <span>New Project</span>
            </button>
          </div>
        </div>

        {/* Summary KPI Bento Metric Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-space-md">
          {/* Card 1: Slipping (RED) */}
          <div
            className="group relative rounded-xl p-space-md shadow-sm hover:shadow-md transition-all overflow-hidden flex flex-col justify-between"
            style={{ backgroundColor: 'rgb(254, 242, 242)', border: '1px solid rgb(254, 202, 202)' }}
          >
            <div className="absolute top-0 left-0 right-0 h-1 bg-error"></div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-800 font-semibold">Slipping</span>
              <span className="material-symbols-outlined text-error text-[20px]">warning</span>
            </div>
            <div className="mt-2 flex flex-col">
              <span className="text-[36px] leading-[40px] font-bold text-error tracking-tight font-headline">
                {slippingProjects.length}
              </span>
              <span className="text-xs text-slate-600 mt-0.5">
                Oldest: P101, 3 days overdue
              </span>
            </div>
          </div>

          {/* Card 2: Due in 2 days (AMBER) */}
          <div
            className="group relative rounded-xl p-space-md shadow-sm hover:shadow-md transition-all overflow-hidden flex flex-col justify-between"
            style={{ backgroundColor: 'rgb(255, 251, 235)', border: '1px solid rgb(253, 230, 138)' }}
          >
            <div className="absolute top-0 left-0 right-0 h-1 bg-amber-500"></div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-800 font-semibold">Due in 2 days</span>
              <span className="material-symbols-outlined text-amber-500 text-[20px]">schedule</span>
            </div>
            <div className="mt-2 flex flex-col">
              <span className="text-[36px] leading-[40px] font-bold text-amber-800 tracking-tight font-headline">
                {dueSoonProjects.length}
              </span>
              <span className="text-xs text-slate-600 mt-0.5">
                Next: P104, 26 Oct
              </span>
            </div>
          </div>

          {/* Card 3: On Track (GREEN) */}
          <div
            className="group relative rounded-xl p-space-md shadow-sm hover:shadow-md transition-all overflow-hidden flex flex-col justify-between"
            style={{ border: '1px solid rgb(209, 250, 229)', backgroundColor: 'rgb(240, 253, 244)' }}
          >
            <div className="absolute top-0 left-0 right-0 h-1 bg-emerald-500"></div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-800 font-semibold">On track</span>
              <span className="material-symbols-outlined text-emerald-700 text-[20px]">check_circle</span>
            </div>
            <div className="mt-2 flex flex-col">
              <span className="text-[36px] leading-[40px] font-bold text-emerald-800 tracking-tight font-headline">
                {onTrackProjects.length}
              </span>
              <span className="text-xs text-slate-600 mt-0.5">
                {Math.round((onTrackProjects.length / projects.length) * 100)}% of {projects.length} projects
              </span>
            </div>
          </div>

          {/* Card 4: Milestones this week */}
          <div
            className="group relative rounded-xl p-space-md shadow-sm hover:shadow-md transition-all overflow-hidden flex flex-col justify-between bg-white"
            style={{ border: '1px solid rgb(226, 232, 240)' }}
          >
            <div className="absolute top-0 left-0 right-0 h-1 bg-slate-300"></div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-600 font-semibold">Milestones this week</span>
              <span className="material-symbols-outlined text-[20px] text-slate-400">flag</span>
            </div>
            <div className="mt-2 flex flex-col">
              <span className="text-[36px] leading-[40px] font-bold text-slate-900 tracking-tight font-headline">
                12
              </span>
              <span className="text-xs text-slate-600 mt-0.5">
                Scheduled completions
              </span>
            </div>
          </div>
        </div>

        {/* Active Projects Detailed Table View */}
        <div className="rounded-xl bg-white shadow-sm overflow-hidden mt-space-md border border-slate-200">
          {/* Section Header */}
          <div className="p-space-lg flex flex-col sm:flex-row sm:items-center justify-between gap-space-md border-b border-slate-100">
            <div className="flex items-center gap-space-sm flex-wrap">
              <div className="flex items-center gap-space-xs">
                <h2 className="font-headline text-lg font-bold text-slate-900 tracking-tight">
                  Projects by Urgency
                </h2>
                <span className="px-2.5 py-0.5 rounded-full bg-slate-100 text-xs text-slate-600 font-semibold">
                  {projects.length} Active
                </span>
              </div>
              <span className="text-slate-300">•</span>
              <div className="flex items-center gap-1 text-slate-500 text-xs font-medium">
                <span className="material-symbols-outlined text-[16px]">swap_vert</span>
                <span>Most urgent first</span>
              </div>
            </div>

            {/* Filter Toggle Buttons */}
            <div className="flex items-center bg-slate-100 rounded-lg p-0.5 self-start sm:self-auto">
              {(['All', 'Slipping', 'Due soon', 'On track'] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setFilter(tab)}
                  className={`px-3 py-1 rounded text-xs font-semibold transition-all cursor-pointer ${
                    filter === tab
                      ? 'bg-white text-slate-900 shadow-sm'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50/70 text-slate-500 text-xs uppercase tracking-wider h-9 border-b border-slate-100">
                  <th className="py-2.5 px-space-lg font-semibold w-36">Status</th>
                  <th className="py-2.5 px-space-md font-semibold min-w-[280px]">Project</th>
                  <th className="py-2.5 px-space-md font-semibold min-w-[190px]">Next deadline</th>
                  <th className="py-2.5 px-space-md font-semibold min-w-[200px]">Owner</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-sm">
                {filteredProjects.map((project) => {
                  const status = getProjectStatus(project);
                  const deadlineInfo = getNextDeadlineInfo(project);

                  return (
                    <tr
                      key={project.code}
                      onClick={() => navigateTo('project-detail', project.code)}
                      className="hover:bg-slate-50/70 transition-colors group cursor-pointer"
                    >
                      {/* Status Column */}
                      <td className="py-space-md px-space-lg align-top">
                        {status === 'Slipping' && (
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-error-container text-on-error-container text-xs font-semibold">
                            <span className="w-1.5 h-1.5 rounded-full bg-error animate-pulse"></span>
                            Slipping
                          </span>
                        )}
                        {status === 'Due in 2 days' && (
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-900 text-xs font-semibold">
                            <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
                            Due in 2 days
                          </span>
                        )}
                        {status === 'On track' && (
                          <span
                            className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold"
                            style={{ backgroundColor: 'rgb(240, 253, 244)', color: 'rgb(0, 83, 56)' }}
                          >
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                            On track
                          </span>
                        )}
                      </td>

                      {/* Project Code & Name */}
                      <td className="py-space-md px-space-md align-top">
                        <div className="flex flex-col gap-1">
                          <div className="flex items-center gap-space-xs">
                            <span className="px-1.5 py-0.5 rounded bg-slate-100 font-mono text-xs text-slate-800 font-semibold">
                              {project.code}
                            </span>
                            <span className="font-semibold text-slate-900 group-hover:text-primary transition-colors">
                              {project.name}
                            </span>
                          </div>
                        </div>
                      </td>

                      {/* Next Deadline */}
                      <td className="py-space-md px-space-md align-top">
                        <div className="flex flex-col">
                          <div
                            className={`flex items-center gap-1 font-semibold text-xs ${
                              status === 'Slipping'
                                ? 'text-error'
                                : status === 'Due in 2 days'
                                ? 'text-amber-800'
                                : 'text-emerald-700'
                            }`}
                          >
                            <span className="material-symbols-outlined text-[15px]">
                              {status === 'Slipping' ? 'event_busy' : 'schedule'}
                            </span>
                            <span>{deadlineInfo.label}</span>
                          </div>
                          <span className="text-xs text-slate-500">
                            {deadlineInfo.formatted}
                          </span>
                        </div>
                      </td>

                      {/* Owner */}
                      <td className="py-space-md px-space-md align-top">
                        <div className="flex items-center gap-space-sm">
                          <div className="w-7 h-7 rounded-full bg-slate-200 text-slate-700 text-xs flex items-center justify-center font-bold">
                            {project.projectManager.substring(0, 2).toUpperCase()}
                          </div>
                          <span className="text-xs font-medium text-slate-800">
                            {project.projectManager}
                          </span>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Table Footer */}
          <div className="p-space-md bg-white flex flex-col sm:flex-row sm:items-center justify-between gap-space-sm border-t border-slate-100">
            <span className="text-xs text-slate-500 font-medium">
              Showing {filteredProjects.length} of {projects.length} projects
            </span>
            <button
              onClick={() => navigateTo('projects')}
              className="px-4 py-1.5 rounded-lg bg-slate-100 text-slate-800 text-xs font-semibold hover:bg-slate-200 transition-colors self-start sm:self-auto cursor-pointer"
            >
              View All in Projects Table →
            </button>
          </div>
        </div>
      </div>

      <NewProjectModal
        isOpen={isNewProjectModalOpen}
        onClose={() => setIsNewProjectModalOpen(false)}
      />
    </div>
  );
};
