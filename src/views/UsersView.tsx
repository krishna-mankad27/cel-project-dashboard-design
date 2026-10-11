import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import type { UserRole } from '../types';

export const UsersView: React.FC = () => {
  const { users, addUser, removeUser, resetUserPassword, currentUser } = useApp();
  const [search, setSearch] = useState('');
  const [isAddUserModalOpen, setIsAddUserModalOpen] = useState(false);

  // Add User Form state (PRD §3.1)
  const [fullName, setFullName] = useState('');
  const [loginName, setLoginName] = useState('');
  const [password, setPassword] = useState('Welcome@2026');
  const [role, setRole] = useState<UserRole>('Member');

  const filteredUsers = users.filter((u) => {
    if (!search.trim()) return true;
    const q = search.toLowerCase();
    return u.fullName.toLowerCase().includes(q) || u.loginName.toLowerCase().includes(q) || u.role.toLowerCase().includes(q);
  });

  const handleCreateUser = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim() || !loginName.trim()) return;

    addUser({
      fullName,
      loginName,
      role,
    });

    setFullName('');
    setLoginName('');
    setPassword('Welcome@2026');
    setRole('Member');
    setIsAddUserModalOpen(false);
  };

  const adminCount = users.filter((u) => u.role === 'Administrator').length;
  const pmCount = users.filter((u) => u.role === 'Project manager').length;
  const memberCount = users.filter((u) => u.role === 'Member').length;

  return (
    <div className="flex flex-col w-full pb-16">
      <div className="px-margin py-space-xl flex flex-col gap-space-lg max-w-[1440px] w-full mx-auto">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-space-md">
          <div className="flex flex-col gap-space-xs">
            <div className="flex items-center gap-space-md">
              <h1 className="font-headline text-2xl md:text-3xl font-bold text-slate-900 tracking-tight">
                Users
              </h1>
              <span className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-slate-100 text-slate-800 text-xs font-semibold">
                <span className="w-1.5 h-1.5 rounded-full bg-primary-container"></span>
                <span>{users.length} Active Members</span>
              </span>
            </div>
            <p className="text-xs text-slate-500">
              Manage users, roles and passwords directly. No email verification or self sign-up (PRD §3.1).
            </p>
          </div>

          <div className="flex items-center gap-space-sm">
            {/* Filter Input */}
            <div className="relative hidden sm:block">
              <span className="material-symbols-outlined absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400 text-[18px]">
                filter_list
              </span>
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="h-9 pl-9 pr-space-md bg-white text-slate-900 text-xs rounded-lg shadow-sm border border-slate-200 outline-none focus:border-primary transition-all w-56 placeholder-slate-400"
                placeholder="Filter by name or role..."
                type="text"
              />
            </div>

            {currentUser.role === 'Administrator' ? (
              <button
                onClick={() => setIsAddUserModalOpen(true)}
                className="inline-flex items-center justify-center gap-1.5 px-4 h-9 rounded-lg bg-primary-container text-white text-xs font-semibold shadow-sm hover:opacity-95 transition-all cursor-pointer"
              >
                <span className="material-symbols-outlined text-[18px]">person_add</span>
                <span>Add user</span>
              </button>
            ) : (
              <div
                className="inline-flex items-center gap-1.5 px-3 h-9 rounded-lg bg-slate-100 text-slate-500 text-xs font-medium border border-slate-200"
                title="Only Administrators can add users (PRD §3.1)"
              >
                <span className="material-symbols-outlined text-[16px] text-slate-400">lock</span>
                <span>Admin only</span>
              </div>
            )}
          </div>
        </div>

        {/* Metric Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-space-md">
          {/* Total */}
          <div className="p-space-lg rounded-xl bg-white shadow-sm border border-slate-200 flex items-center justify-between">
            <div className="flex flex-col">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                Total users
              </span>
              <span className="font-headline text-2xl font-bold text-slate-900 mt-1">
                {users.length}
              </span>
            </div>
            <div className="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center text-primary-container">
              <span className="material-symbols-outlined text-[20px]">group</span>
            </div>
          </div>

          {/* Admins */}
          <div className="p-space-lg rounded-xl bg-white shadow-sm border border-slate-200 flex items-center justify-between">
            <div className="flex flex-col">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                Admins
              </span>
              <span className="font-headline text-2xl font-bold text-slate-900 mt-1">
                {adminCount}
              </span>
            </div>
            <div className="w-10 h-10 rounded-lg bg-indigo-50 flex items-center justify-center text-primary">
              <span className="material-symbols-outlined text-[20px]">shield_person</span>
            </div>
          </div>

          {/* Project Managers */}
          <div className="p-space-lg rounded-xl bg-white shadow-sm border border-slate-200 flex items-center justify-between">
            <div className="flex flex-col">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                Project Managers
              </span>
              <span className="font-headline text-2xl font-bold text-slate-900 mt-1">
                {pmCount}
              </span>
            </div>
            <div className="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center text-slate-700">
              <span className="material-symbols-outlined text-[20px]">manage_accounts</span>
            </div>
          </div>

          {/* Members */}
          <div className="p-space-lg rounded-xl bg-white shadow-sm border border-slate-200 flex items-center justify-between">
            <div className="flex flex-col">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                Members
              </span>
              <span className="font-headline text-2xl font-bold text-slate-900 mt-1">
                {memberCount}
              </span>
            </div>
            <div className="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center text-slate-600">
              <span className="material-symbols-outlined text-[20px]">badge</span>
            </div>
          </div>
        </div>

        {/* Users Table */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden flex flex-col">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50/70 border-b border-slate-100 text-slate-500 text-xs uppercase tracking-wider font-semibold">
                  <th className="py-3 px-space-lg">User</th>
                  <th className="py-3 px-space-lg">Role</th>
                  <th className="py-3 px-space-lg">Status</th>
                  <th className="py-3 px-space-lg">Created</th>
                  <th className="py-3 px-space-lg text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs">
                {filteredUsers.map((user) => (
                  <tr key={user.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-3.5 px-space-lg">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-primary/10 text-primary font-semibold text-xs flex items-center justify-center flex-shrink-0">
                          {user.initials}
                        </div>
                        <div className="flex flex-col min-w-0">
                          <span className="font-semibold text-sm text-slate-900 truncate">
                            {user.fullName}
                          </span>
                          <span className="font-mono text-slate-400 text-xs truncate">
                            {user.loginName}
                          </span>
                        </div>
                      </div>
                    </td>
                    <td className="py-3.5 px-space-lg">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full font-semibold ${
                          user.role === 'Administrator'
                            ? 'bg-indigo-100 text-indigo-800'
                            : user.role === 'Project manager'
                            ? 'bg-slate-200 text-slate-800'
                            : 'bg-slate-100 text-slate-600'
                        }`}
                      >
                        {user.role}
                      </span>
                    </td>
                    <td className="py-3.5 px-space-lg">
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 font-semibold border border-emerald-200/50">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                        Active
                      </span>
                    </td>
                    <td className="py-3.5 px-space-lg text-slate-500 font-medium">
                      {user.createdDate}
                    </td>
                    <td className="py-3.5 px-space-lg text-right">
                      {currentUser.role === 'Administrator' ? (
                        <div className="flex items-center justify-end gap-3">
                          <button
                            onClick={() => resetUserPassword(user.id)}
                            className="text-primary hover:text-primary-container font-semibold hover:underline cursor-pointer"
                            title="Reset password as administrator (PRD §3.1)"
                          >
                            Reset password
                          </button>
                          <span className="text-slate-200">|</span>
                          <button
                            onClick={() => {
                              if (window.confirm(`Are you sure you want to remove user "${user.fullName}"?`)) {
                                removeUser(user.id);
                              }
                            }}
                            className="text-error hover:text-red-700 font-semibold hover:underline cursor-pointer inline-flex items-center gap-0.5"
                            title="Remove user from the system"
                          >
                            <span className="material-symbols-outlined text-[15px]">delete</span>
                            <span>Remove</span>
                          </button>
                        </div>
                      ) : (
                        <span className="text-slate-400 italic text-[11px]" title="Administrator permission required to edit users">
                          View only
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Add User Modal (PRD §3.1) */}
      {isAddUserModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-space-md bg-slate-900/40 backdrop-blur-[2px] animate-fadeIn">
          <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl border border-slate-200 p-6 flex flex-col gap-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-headline text-lg font-bold text-slate-900">
                Add new user
              </h3>
              <button
                onClick={() => setIsAddUserModalOpen(false)}
                className="text-slate-400 hover:text-slate-800"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            <form onSubmit={handleCreateUser} className="flex flex-col gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Full name
                </label>
                <input
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="e.g. Indu"
                  required
                  className="w-full h-9 px-3 rounded-lg bg-slate-50 text-slate-900 text-sm border border-slate-200 outline-none focus:border-primary"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Login name
                </label>
                <input
                  value={loginName}
                  onChange={(e) => setLoginName(e.target.value)}
                  placeholder="e.g. indu"
                  required
                  className="w-full h-9 px-3 rounded-lg bg-slate-50 text-slate-900 text-sm border border-slate-200 outline-none focus:border-primary"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Password
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full h-9 px-3 rounded-lg bg-slate-50 text-slate-900 text-sm border border-slate-200 outline-none focus:border-primary"
                />
                <span className="text-[11px] text-slate-400 mt-1 block">
                  Set directly by administrator. No verification email sent (PRD §3.1).
                </span>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Role
                </label>
                <select
                  value={role}
                  onChange={(e) => setRole(e.target.value as UserRole)}
                  className="w-full h-9 px-3 rounded-lg bg-slate-50 text-slate-900 text-sm border border-slate-200 outline-none focus:border-primary"
                >
                  <option value="Administrator">Administrator (Create users, projects, see everything)</option>
                  <option value="Project manager">Project manager (Create & edit projects/activities)</option>
                  <option value="Member">Member (Update status on assigned activities)</option>
                </select>
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsAddUserModalOpen(false)}
                  className="px-4 py-2 text-xs font-medium text-slate-600 hover:bg-slate-100 rounded-lg cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-xs font-semibold bg-primary text-white rounded-lg hover:bg-primary-container cursor-pointer"
                >
                  Create User
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
