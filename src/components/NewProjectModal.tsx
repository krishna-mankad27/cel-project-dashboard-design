import React, { useState } from 'react';
import { useApp } from '../context/AppContext';

export const NewProjectModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({
  isOpen,
  onClose,
}) => {
  const { addProject, users } = useApp();
  const [code, setCode] = useState('');
  const [name, setName] = useState('');
  const [type, setType] = useState<'Purchase order' | 'R&D'>('Purchase order');
  const [projectManager, setProjectManager] = useState(users[1]?.fullName || users[0]?.fullName || '');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!code.trim() || !name.trim()) return;

    addProject({
      code,
      name,
      type,
      projectManager,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-space-md bg-slate-900/40 backdrop-blur-[2px] animate-fadeIn">
      <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-space-lg py-space-md border-b border-slate-100">
          <div className="flex items-center gap-space-xs">
            <span className="material-symbols-outlined text-primary text-[22px]">
              add_circle
            </span>
            <h2 className="font-headline text-lg font-bold text-slate-900">
              Create new project
            </h2>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-400 hover:text-slate-800 hover:bg-slate-100 transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-space-lg flex flex-col gap-space-md">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-space-md">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Project code
              </label>
              <input
                value={code}
                onChange={(e) => setCode(e.target.value)}
                placeholder="e.g. P115 or R105"
                required
                className="w-full h-9 px-3 rounded-lg bg-slate-50 text-slate-900 text-sm font-mono outline-none border border-slate-200 focus:border-primary focus:ring-1 focus:ring-primary transition-all"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Type
              </label>
              <div className="relative">
                <select
                  value={type}
                  onChange={(e) => setType(e.target.value as 'Purchase order' | 'R&D')}
                  className="w-full h-9 px-3 rounded-lg bg-slate-50 text-slate-900 text-sm outline-none border border-slate-200 focus:border-primary focus:ring-1 focus:ring-primary transition-all appearance-none pr-8 cursor-pointer"
                >
                  <option value="Purchase order">Purchase order</option>
                  <option value="R&D">R&D</option>
                </select>
                <span className="material-symbols-outlined absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none text-[18px]">
                  expand_more
                </span>
              </div>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Project name
            </label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Radome thermal barrier coating"
              required
              className="w-full h-9 px-3 rounded-lg bg-slate-50 text-slate-900 text-sm outline-none border border-slate-200 focus:border-primary focus:ring-1 focus:ring-primary transition-all"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Project manager
            </label>
            <div className="relative">
              <select
                value={projectManager}
                onChange={(e) => setProjectManager(e.target.value)}
                className="w-full h-9 px-3 rounded-lg bg-slate-50 text-slate-900 text-sm outline-none border border-slate-200 focus:border-primary focus:ring-1 focus:ring-primary transition-all appearance-none pr-8 cursor-pointer"
              >
                {users.map((u) => (
                  <option key={u.id} value={u.fullName}>
                    {u.fullName} ({u.role})
                  </option>
                ))}
              </select>
              <span className="material-symbols-outlined absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none text-[18px]">
                expand_more
              </span>
            </div>
          </div>

          <div className="flex items-center justify-end gap-space-sm pt-space-sm mt-space-xs border-t border-slate-100">
            <button
              onClick={onClose}
              type="button"
              className="h-9 px-4 rounded-lg text-sm font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="h-9 px-5 rounded-lg bg-primary-container text-white text-sm font-semibold shadow-sm hover:bg-primary transition-all flex items-center gap-1 cursor-pointer"
            >
              <span className="material-symbols-outlined text-[18px]">add</span>
              <span>Create project</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
