import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { getProjectStatus, getNextDeadlineInfo } from '../data/mockData';
import { NewProjectModal } from '../components/NewProjectModal';

export const ProjectsView: React.FC = () => {
  const { projects, navigateTo } = useApp();
  const [search, setSearch] = useState('');
  const [urgencyFilter, setUrgencyFilter] = useState<'All' | 'Slipping' | 'Due soon' | 'On track'>('All');
  const [typeFilter, setTypeFilter] = useState<'All Types' | 'Purchase order' | 'R&D'>('All Types');
  const [isNewProjectModalOpen, setIsNewProjectModalOpen] = useState(false);

  // Filter projects by search, urgency, and type
  const filteredProjects = projects.filter((project) => {
    const status = getProjectStatus(project);

    // Urgency filter
    if (urgencyFilter === 'Slipping' && status !== 'Slipping') return false;
    if (urgencyFilter === 'Due soon' && status !== 'Due in 2 days') return false;
    if (urgencyFilter === 'On track' && status !== 'On track') return false;

    // Type filter
    if (typeFilter !== 'All Types' && project.type !== typeFilter) return false;

    // Search query
    if (search.trim()) {
      const q = search.toLowerCase();
      const matchCode = project.code.toLowerCase().includes(q);
      const matchName = project.name.toLowerCase().includes(q);
      const matchManager = project.projectManager.toLowerCase().includes(q);
      if (!matchCode && !matchName && !matchManager) return false;
    }

    return true;
  });

  return (
    <div className="flex flex-col w-full pb-16">
      <div className="p-margin flex flex-col gap-space-lg w-full max-w-[1600px] mx-auto">
        {/* Top Header Bar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-space-md">
          <div className="flex items-center gap-space-md">
            <h1 className="font-headline text-2xl md:text-3xl font-bold text-slate-900 tracking-tight">
              Projects
            </h1>
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 text-primary text-xs font-semibold">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
              <span>{projects.length} projects</span>
            </div>
          </div>

          {/* Right Action Button */}
          <div className="flex items-center gap-space-sm">
            <button
              onClick={() => setIsNewProjectModalOpen(true)}
              className="inline-flex items-center justify-center gap-1.5 px-4 h-9 rounded-xl bg-primary text-white text-sm font-semibold shadow-sm hover:bg-primary-container transition-all cursor-pointer"
            >
              <span className="material-symbols-outlined text-[18px]">add</span>
              <span>New Project</span>
            </button>
          </div>
        </div>

        {/* Filter & Control Toolbar */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-space-sm flex flex-col lg:flex-row lg:items-center justify-between gap-space-sm">
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-space-sm flex-1">
            {/* Search Input */}
            <div className="relative flex-1">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-[18px]">
                search
              </span>
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full h-9 pl-9 pr-space-md bg-slate-50 focus:bg-white text-slate-900 placeholder:text-slate-400 text-xs md:text-sm rounded-lg outline-none border border-slate-200 focus:border-primary transition-all"
                placeholder="Search by code, title or manager..."
                type="text"
              />
            </div>

            {/* Filter Tabs / Segmented Control */}
            <div className="flex items-center bg-slate-100 p-1 rounded-lg self-start sm:self-auto overflow-x-auto flex-shrink-0">
              {(['All', 'Slipping', 'Due soon', 'On track'] as const).map((tab) => {
                const isActive = urgencyFilter === tab;
                return (
                  <button
                    key={tab}
                    onClick={() => setUrgencyFilter(tab)}
                    className={`px-3 py-1 rounded-md text-xs font-semibold transition-all flex items-center gap-1.5 cursor-pointer ${
                      isActive
                        ? 'bg-white text-primary shadow-xs'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    {tab === 'Slipping' && <span className="w-1.5 h-1.5 rounded-full bg-error"></span>}
                    {tab === 'Due soon' && <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>}
                    {tab === 'On track' && <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>}
                    <span>{tab}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Type Filter Dropdown */}
          <div className="flex items-center gap-space-xs self-end lg:self-auto flex-shrink-0">
            <div className="relative">
              <select
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value as any)}
                className="h-9 pl-3 pr-8 rounded-lg bg-slate-50 hover:bg-slate-100 text-slate-800 text-xs font-medium border border-slate-200 outline-none appearance-none cursor-pointer"
              >
                <option value="All Types">Type: All Types</option>
                <option value="Purchase order">Type: Purchase order</option>
                <option value="R&D">Type: R&D</option>
              </select>
              <span className="material-symbols-outlined absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none text-[16px]">
                expand_more
              </span>
            </div>
          </div>
        </div>

        {/* Data Table Container */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden flex flex-col">
          <div className="overflow-x-auto w-full">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50/70 text-slate-500 text-xs font-semibold tracking-wider uppercase select-none border-b border-slate-100">
                  <th className="py-3 px-space-md text-left w-36">STATUS</th>
                  <th className="py-3 px-space-md text-left min-w-[260px]">PROJECT</th>
                  <th className="py-3 px-space-md text-left w-36">TYPE</th>
                  <th className="py-3 px-space-md text-left min-w-[200px]">OWNER</th>
                  <th className="py-3 px-space-md text-left min-w-[170px]">MILESTONES</th>
                  <th className="py-3 px-space-md text-right min-w-[130px]">END DATE</th>
                  <th className="py-3 px-space-sm text-center w-12"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs text-slate-800">
                {filteredProjects.map((project) => {
                  const status = getProjectStatus(project);
                  const deadlineInfo = getNextDeadlineInfo(project);
                  const totalMilestones = project.milestones.length;
                  const completedMilestones = project.milestones.filter(
                    (m) => m.status === 'Completed'
                  ).length;
                  const completionPercentage =
                    totalMilestones > 0
                      ? Math.round((completedMilestones / totalMilestones) * 100)
                      : 0;

                  return (
                    <tr
                      key={project.code}
                      onClick={() => navigateTo('project-detail', project.code)}
                      className="group hover:bg-slate-50/80 transition-colors cursor-pointer"
                    >
                      {/* Status */}
                      <td className="py-3.5 px-space-md whitespace-nowrap">
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

                      {/* Code & Name */}
                      <td className="py-3.5 px-space-md">
                        <div className="flex items-center gap-space-sm">
                          <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-900 font-mono text-xs font-semibold shrink-0">
                            {project.code}
                          </span>
                          <span className="font-semibold text-sm text-slate-900 truncate group-hover:text-primary transition-colors">
                            {project.name}
                          </span>
                        </div>
                      </td>

                      {/* Type */}
                      <td className="py-3.5 px-space-md whitespace-nowrap">
                        <span className="inline-flex items-center px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 text-xs font-medium">
                          {project.type}
                        </span>
                      </td>

                      {/* Owner */}
                      <td className="py-3.5 px-space-md whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          <div className="w-6 h-6 rounded-full bg-primary/10 text-primary text-[10px] flex items-center justify-center font-bold">
                            {project.projectManager.substring(0, 2).toUpperCase()}
                          </div>
                          <span className="font-medium text-slate-900">
                            {project.projectManager}
                          </span>
                        </div>
                      </td>

                      {/* Milestones Progress */}
                      <td className="py-3.5 px-space-md">
                        <div className="flex flex-col gap-1 w-28">
                          <div className="flex justify-between items-center text-[11px] text-slate-500">
                            <span>
                              {completedMilestones} of {totalMilestones} done
                            </span>
                          </div>
                          <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                            <div
                              className={`h-full rounded-full ${
                                status === 'Slipping'
                                  ? 'bg-error'
                                  : status === 'Due in 2 days'
                                  ? 'bg-amber-500'
                                  : 'bg-emerald-600'
                              }`}
                              style={{ width: `${Math.max(completionPercentage, 8)}%` }}
                            ></div>
                          </div>
                        </div>
                      </td>

                      {/* End Date */}
                      <td className="py-3.5 px-space-md text-right whitespace-nowrap font-medium text-slate-600">
                        <div
                          className={`inline-flex items-center gap-1 justify-end font-semibold text-xs ${
                            status === 'Slipping'
                              ? 'text-error'
                              : status === 'Due in 2 days'
                              ? 'text-amber-800'
                              : 'text-slate-700'
                          }`}
                        >
                          <span className="material-symbols-outlined text-[15px]">event</span>
                          <span>{deadlineInfo.formatted.replace('Due ', '')}</span>
                        </div>
                      </td>

                      {/* Drill down arrow */}
                      <td className="py-3.5 px-space-sm text-center">
                        <span className="material-symbols-outlined text-[18px] text-slate-300 group-hover:text-primary transition-colors">
                          chevron_right
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Footer */}
          <div className="p-space-md bg-white border-t border-slate-100 text-xs text-slate-500 flex items-center justify-between">
            <span>Showing {filteredProjects.length} of {projects.length} projects</span>
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
