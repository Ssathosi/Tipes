import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { formatIDR } from '../utils';

interface SettingsPanelProps {
  isOpen: boolean;
  onClose: () => void;
  username: string;
  onUsernameChange: (name: string) => void;
  monthlyLimit: number;
  onBudgetChange: (limit: number) => void;
  onExportCSV: () => void;
  onExportJSON: () => void;
  onImportJSON: () => void;
  onImportCSV: () => void;
  onResetApp: () => void;
  onSignOut: () => void;
  streak: { current: number; best: number; lastTransactionDate: number | null };
  transactionCount: number;
}

export default function SettingsPanel({
  isOpen,
  onClose,
  username,
  onUsernameChange,
  monthlyLimit,
  onBudgetChange,
  onExportCSV,
  onExportJSON,
  onImportJSON,
  onImportCSV,
  onResetApp,
  onSignOut,
  streak,
  transactionCount,
}: SettingsPanelProps) {
  const [editingName, setEditingName] = useState(false);
  const [nameInput, setNameInput] = useState(username);
  const [editingBudget, setEditingBudget] = useState(false);
  const [budgetInput, setBudgetInput] = useState(monthlyLimit.toString());

  const handleSaveName = () => {
    if (nameInput.trim()) {
      onUsernameChange(nameInput.trim());
    }
    setEditingName(false);
  };

  const handleSaveBudget = () => {
    const numericVal = parseFloat(budgetInput.replace(/[^\d]/g, '')) || 0;
    if (numericVal > 0) {
      onBudgetChange(numericVal);
    }
    setEditingBudget(false);
  };

  const handleBudgetInputChange = (val: string) => {
    // Only allow digits
    const cleaned = val.replace(/[^\d]/g, '');
    setBudgetInput(cleaned);
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div 
        onClick={onClose}
        className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 transition-opacity duration-300"
      />

      {/* Side Panel - slides from right */}
      <motion.div
        initial={{ x: '100%' }}
        animate={{ x: 0 }}
        exit={{ x: '100%' }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        className="fixed top-0 right-0 bottom-0 z-50 bg-white w-full max-w-md shadow-2xl flex flex-col"
      >
        {/* Header */}
        <div className="flex justify-between items-center px-6 py-4 border-b border-slate-100">
          <h2 className="text-lg font-bold text-[#121c2a]">Pengaturan</h2>
          <button 
            onClick={onClose}
            className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-slate-50 text-slate-500 transition-colors active:scale-90 cursor-pointer"
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto no-scrollbar px-6 py-6 space-y-6 pb-24">
          
          {/* Profile Section */}
          <section className="space-y-4">
            <h3 className="text-xs font-black text-[#747686] uppercase tracking-wider">Profil</h3>
            
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
              {/* Avatar + Name */}
              <div className="p-4 flex items-center gap-4 border-b border-slate-50">
                <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-blue-200">
                  <img 
                    alt={username}
                    className="w-full h-full object-cover"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuCwdbVrWDx7kyGUT2RyWk9jrp1WKSx8tOTym4WBTs_Ln-xz2E-CJypYVklHt9kCv89A9kzD43Pn-g63jlcRG0B6SO5ZEOVZ4YOM_6nNjUDmAXQlGsOvPShAfxVKoE60e9fM5rUjx9wbS1uyxkjnvHiUzYmZ2ay1eRENa-yF2B_fF0iAVWX4JakAW4_vZnoCDZCQHFhbQmlmCgPTB0VmIvaJUas3Z9A-z5XdecWggryOFVV-vpk__Yxq20SQB0WL_xKLsNZ5hSmPQSc"
                  />
                </div>
                <div className="flex-1">
                  {editingName ? (
                    <div className="flex items-center gap-2">
                      <input
                        type="text"
                        value={nameInput}
                        onChange={(e) => setNameInput(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleSaveName()}
                        className="flex-1 bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm font-bold focus:ring-2 focus:ring-blue-500/20 focus:border-[#2650cf]"
                        autoFocus
                      />
                      <button 
                        onClick={handleSaveName}
                        className="w-8 h-8 flex items-center justify-center rounded-full bg-[#2650cf] text-white cursor-pointer"
                      >
                        <span className="material-symbols-outlined text-sm">check</span>
                      </button>
                    </div>
                  ) : (
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-bold text-sm text-[#121c2a]">{username}</p>
                        <p className="text-xs text-[#747686] mt-0.5">Tap untuk mengubah nama</p>
                      </div>
                      <button 
                        onClick={() => { setNameInput(username); setEditingName(true); }}
                        className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-slate-50 text-slate-400 cursor-pointer"
                      >
                        <span className="material-symbols-outlined text-lg">edit</span>
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* Budget Setting */}
              <div className="p-4 border-b border-slate-50">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-bold text-sm text-[#121c2a]">Budget Bulanan</p>
                    {editingBudget ? (
                      <div className="flex items-center gap-2 mt-2">
                        <span className="text-sm font-bold text-[#747686]">Rp</span>
                        <input
                          type="text"
                          value={Number(budgetInput).toLocaleString('id-ID')}
                          onChange={(e) => handleBudgetInputChange(e.target.value)}
                          onKeyDown={(e) => e.key === 'Enter' && handleSaveBudget()}
                          className="flex-1 bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm font-bold focus:ring-2 focus:ring-blue-500/20 focus:border-[#2650cf]"
                          autoFocus
                        />
                        <button 
                          onClick={handleSaveBudget}
                          className="w-8 h-8 flex items-center justify-center rounded-full bg-[#2650cf] text-white cursor-pointer"
                        >
                          <span className="material-symbols-outlined text-sm">check</span>
                        </button>
                      </div>
                    ) : (
                      <div className="flex items-center gap-2 mt-1">
                        <p className="text-xs text-[#747686]">{formatIDR(monthlyLimit)}</p>
                        <button 
                          onClick={() => { setBudgetInput(monthlyLimit.toString()); setEditingBudget(true); }}
                          className="text-[10px] font-bold text-[#2650cf] hover:underline"
                        >
                          Ubah
                        </button>
                      </div>
                    )}
                  </div>
                  <span className="material-symbols-outlined text-slate-300">savings</span>
                </div>
              </div>
            </div>
          </section>

          {/* Stats Section */}
          <section className="space-y-4">
            <h3 className="text-xs font-black text-[#747686] uppercase tracking-wider">Statistik</h3>
            
            <div className="grid grid-cols-3 gap-3">
              <div className="bg-gradient-to-br from-orange-50 to-amber-50 p-4 rounded-xl border border-orange-100 text-center">
                <p className="text-2xl font-black text-orange-600">{streak.current}</p>
                <p className="text-[10px] font-bold text-orange-700/70 mt-1">🔥 Streak</p>
              </div>
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-4 rounded-xl border border-blue-100 text-center">
                <p className="text-2xl font-black text-blue-600">{streak.best}</p>
                <p className="text-[10px] font-bold text-blue-700/70 mt-1">Best Streak</p>
              </div>
              <div className="bg-gradient-to-br from-emerald-50 to-green-50 p-4 rounded-xl border border-emerald-100 text-center">
                <p className="text-2xl font-black text-emerald-600">{transactionCount}</p>
                <p className="text-[10px] font-bold text-emerald-700/70 mt-1">Transaksi</p>
              </div>
            </div>
          </section>

          {/* Data Actions */}
          <section className="space-y-4">
            <h3 className="text-xs font-black text-[#747686] uppercase tracking-wider">Data & Export</h3>
            
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
              {/* Export CSV */}
              <button 
                onClick={onExportCSV}
                className="w-full p-4 flex items-center justify-between hover:bg-slate-50 transition-colors cursor-pointer active:bg-slate-100"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center">
                    <span className="material-symbols-outlined text-emerald-600">download</span>
                  </div>
                  <div className="text-left">
                    <p className="font-bold text-sm text-[#121c2a]">Export CSV</p>
                    <p className="text-xs text-[#747686]">Download semua transaksi</p>
                  </div>
                </div>
                <span className="material-symbols-outlined text-slate-300">chevron_right</span>
              </button>

              {/* Export JSON */}
              <button 
                onClick={onExportJSON}
                className="w-full p-4 flex items-center justify-between hover:bg-slate-50 transition-colors cursor-pointer active:bg-slate-100 border-t border-slate-50"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center">
                    <span className="material-symbols-outlined text-blue-600">code</span>
                  </div>
                  <div className="text-left">
                    <p className="font-bold text-sm text-[#121c2a]">Export JSON</p>
                    <p className="text-xs text-[#747686]">Backup data dalam format JSON</p>
                  </div>
                </div>
                <span className="material-symbols-outlined text-slate-300">chevron_right</span>
              </button>

              {/* Import JSON */}
              <button 
                onClick={onImportJSON}
                className="w-full p-4 flex items-center justify-between hover:bg-slate-50 transition-colors cursor-pointer active:bg-slate-100 border-t border-slate-50"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-purple-50 flex items-center justify-center">
                    <span className="material-symbols-outlined text-purple-600">upload_file</span>
                  </div>
                  <div className="text-left">
                    <p className="font-bold text-sm text-[#121c2a]">Import JSON</p>
                    <p className="text-xs text-[#747686]">Restore dari backup JSON</p>
                  </div>
                </div>
                <span className="material-symbols-outlined text-slate-300">chevron_right</span>
              </button>

              {/* Import CSV */}
              <button 
                onClick={onImportCSV}
                className="w-full p-4 flex items-center justify-between hover:bg-slate-50 transition-colors cursor-pointer active:bg-slate-100 border-t border-slate-50"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-amber-50 flex items-center justify-center">
                    <span className="material-symbols-outlined text-amber-600">upload</span>
                  </div>
                  <div className="text-left">
                    <p className="font-bold text-sm text-[#121c2a]">Import CSV</p>
                    <p className="text-xs text-[#747686]">Import dari file CSV</p>
                  </div>
                </div>
                <span className="material-symbols-outlined text-slate-300">chevron_right</span>
              </button>
            </div>
          </section>

          {/* About Section */}
          <section className="space-y-4">
            <h3 className="text-xs font-black text-[#747686] uppercase tracking-wider">Tentang</h3>
            
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
              <div className="p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center">
                    <span className="material-symbols-outlined text-[#2650cf]">info</span>
                  </div>
                  <div>
                    <p className="font-bold text-sm text-[#121c2a]">TIPES</p>
                    <p className="text-xs text-[#747686]">v1.0.0 — Financial Tracker</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Danger Zone */}
          <section className="space-y-4">
            <h3 className="text-xs font-black text-[#ba1a1a]/50 uppercase tracking-wider">Danger Zone</h3>
            
            <button 
              onClick={onResetApp}
              className="w-full p-4 bg-red-50 border border-red-200 rounded-2xl flex items-center gap-3 hover:bg-red-100 transition-colors cursor-pointer active:bg-red-200"
            >
              <div className="w-10 h-10 rounded-xl bg-red-100 flex items-center justify-center">
                <span className="material-symbols-outlined text-[#ba1a1a]">delete_forever</span>
              </div>
              <div className="text-left">
                <p className="font-bold text-sm text-[#ba1a1a]">Reset Semua Data</p>
                <p className="text-xs text-red-400">Hapus semua data dan mulai dari awal</p>
              </div>
            </button>
          </section>

          {/* Logout Section */}
          <section className="space-y-4">
            <button 
              onClick={onSignOut}
              className="w-full p-4 bg-blue-50 border border-blue-200 rounded-2xl flex items-center gap-3 hover:bg-blue-100 transition-colors cursor-pointer active:bg-blue-200"
            >
              <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center">
                <span className="material-symbols-outlined text-[#2650cf]">logout</span>
              </div>
              <div className="text-left">
                <p className="font-bold text-sm text-[#2650cf]">Keluar</p>
                <p className="text-xs text-blue-400">Logout dari akun Anda</p>
              </div>
            </button>
          </section>
        </div>
      </motion.div>
    </>
  );
}
