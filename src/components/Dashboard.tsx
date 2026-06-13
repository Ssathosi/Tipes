import { motion, AnimatePresence } from 'motion/react';
import { Transaction, Wallet, Preset } from '../types';
import { CATEGORIES } from '../categories';
import { formatIDR, formatDateID, formatDisplayDate, getRelativeDate } from '../utils';

interface DashboardProps {
  transactions: Transaction[];
  wallets: Wallet[];
  budgetSpent: number;
  monthlyLimit: number;
  onOpenAddExpense: () => void;
  onRotateWallets: () => void;
  onDeleteTransaction: (id: string) => void;
  onEditTransaction: (tx: Transaction) => void;
  categoryFilter: string | null;
  setCategoryFilter: (category: string | null) => void;
  onNavigateToHistory: () => void;
  onApplyPreset: (preset: Preset) => void;
  presets: Preset[];
  streak: { current: number; best: number; lastTransactionDate: number | null };
  username: string;
}

export default function Dashboard({
  transactions,
  wallets,
  budgetSpent,
  monthlyLimit,
  onOpenAddExpense,
  onRotateWallets,
  onDeleteTransaction,
  onEditTransaction,
  categoryFilter,
  setCategoryFilter,
  onNavigateToHistory,
  onApplyPreset,
  presets,
  streak,
  username
}: DashboardProps) {
  // Dynamic date
  const today = new Date();
  const todayStr = formatDateID(Date.now());

  // Calculate daily totals
  const todayStart = new Date();
  todayStart.setHours(0, 0, 0, 0);
  const todayEnd = new Date(todayStart);
  todayEnd.setHours(23, 59, 59, 999);

  const todayTransactions = transactions.filter(t => 
    t.date >= todayStart.getTime() && t.date <= todayEnd.getTime()
  );

  const totalIncome = todayTransactions
    .filter(t => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpense = todayTransactions
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0);

  const netBalance = totalIncome - totalExpense;

  // Budget progress
  const budgetPercent = monthlyLimit > 0 ? Math.min(100, Math.round((budgetSpent / monthlyLimit) * 100)) : 0;

  return (
    <div className="pb-32 px-4 pt-16">
      {/* Dynamic Summary Header */}
      <section className="mt-4 space-y-4">
        <div className="flex justify-between items-end">
          <div>
            <p className="text-xs text-[#747686] font-semibold">{todayStr}</p>
            <h2 className="text-xl font-bold text-[#121c2a]">Daily Summary</h2>
          </div>
          <div className="text-right">
            <p className="text-xs text-[#747686] font-semibold">Net Balance</p>
            <p className={`text-lg font-black ${netBalance >= 0 ? 'text-[#0e7254]' : 'text-[#ba1a1a]'}`}>
              {netBalance >= 0 ? '+' : ''}{formatIDR(netBalance)}
            </p>
          </div>
        </div>

        {/* Budget Progress Bar */}
        <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm">
          <div className="flex justify-between items-center mb-2">
            <p className="text-xs font-bold text-[#747686]">Monthly Budget</p>
            <p className="text-xs font-black text-[#2650cf]">{budgetPercent}%</p>
          </div>
          <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
            <div 
              className={`h-full rounded-full transition-all duration-500 ${
                budgetPercent >= 80 ? 'bg-[#ba1a1a]' : 'bg-[#2650cf]'
              }`}
              style={{ width: `${budgetPercent}%` }}
            />
          </div>
          <div className="flex justify-between mt-2">
            <p className="text-[10px] text-slate-400">{formatIDR(budgetSpent)} spent</p>
            <p className="text-[10px] text-slate-400">{formatIDR(monthlyLimit)} limit</p>
          </div>
        </div>

        {/* Income & Expense cards */}
        <div className="grid grid-cols-2 gap-4">
          {/* Income card */}
          <div className="bg-[#9df4ce]/10 border border-[#9df4ce]/30 p-4 rounded-2xl flex flex-col justify-between">
            <p className="text-[#0e7254] font-bold text-xs flex items-center gap-1">
              <span className="material-symbols-outlined text-[16px] font-bold">arrow_downward</span>
              Income
            </p>
            <p className="text-[#121c2a] text-lg font-black mt-1.5">{formatIDR(totalIncome)}</p>
          </div>

          {/* Expense card */}
          <div className="bg-[#ffd9e2]/20 border border-[#ffd9e2]/40 p-4 rounded-2xl flex flex-col justify-between">
            <p className="text-[#88485e] font-bold text-xs flex items-center gap-1">
              <span className="material-symbols-outlined text-[16px] font-bold">arrow_upward</span>
              Expense
            </p>
            <p className="text-[#121c2a] text-lg font-black mt-1.5">{formatIDR(totalExpense)}</p>
          </div>
        </div>
      </section>

      {/* Quick Presets */}
      {presets.length > 0 && (
        <section className="mt-6 space-y-3">
          <h2 className="text-xs uppercase tracking-wider text-[#747686] font-bold">Quick Presets</h2>
          <div className="flex gap-3 overflow-x-auto overflow-y-hidden pb-2 -mx-4 px-4 snap-x snap-mandatory scroll-smooth" style={{ WebkitOverflowScrolling: 'touch' }}>
            {presets.map((preset) => (
              <button
                key={preset.id}
                onClick={() => onApplyPreset(preset)}
                className="flex-shrink-0 min-w-[140px] flex items-center gap-2 px-4 py-3 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 active:scale-95 transition-all cursor-pointer shadow-sm snap-start"
              >
                <span className="material-symbols-outlined text-[#2650cf] text-lg">{preset.icon}</span>
                <div className="text-left">
                  <p className="text-xs font-bold text-[#121c2a]">{preset.label}</p>
                  <p className="text-[10px] text-[#747686]">{formatIDR(preset.amount)}</p>
                </div>
              </button>
            ))}
          </div>
        </section>
      )}

      {/* Category Breakdown */}
      <section className="mt-6 space-y-3">
        <div className="flex justify-between items-center">
          <h2 className="text-xs uppercase tracking-wider text-[#747686] font-bold">By Category</h2>
          <button 
            onClick={onNavigateToHistory}
            className="text-[#2650cf] text-xs font-bold hover:underline"
          >
            See All
          </button>
        </div>

        <div className="flex gap-4 overflow-x-auto overflow-y-hidden pb-2 -mx-4 px-4 snap-x snap-mandatory scroll-smooth" style={{ WebkitOverflowScrolling: 'touch' }}>
          {CATEGORIES.slice(0, 7).map((cat) => {
            const isSelected = categoryFilter === cat.id;
            const categoryTotal = todayTransactions
              .filter(t => t.category === cat.id)
              .reduce((sum, t) => sum + t.amount, 0);

            return (
              <div 
                key={cat.id}
                onClick={() => setCategoryFilter(isSelected ? null : cat.id)}
                className={`flex-shrink-0 p-4 rounded-2xl w-[112px] border transition-all duration-200 cursor-pointer snap-start ${
                  isSelected 
                    ? 'bg-[#2650cf] border-[#2650cf] text-white shadow-md shadow-blue-500/10' 
                    : 'bg-white border-slate-100 text-[#121c2a] hover:bg-slate-50'
                }`}
              >
                <div className={`w-9 h-9 rounded-full flex items-center justify-center mb-2.5 ${
                  isSelected ? 'bg-white/20' : cat.chipClass
                }`}>
                  <span className={`material-symbols-outlined text-md font-bold ${
                    isSelected ? 'text-white' : cat.iconColor
                  }`}>{cat.icon}</span>
                </div>
                <p className={`text-xs font-semibold ${isSelected ? 'text-white/80' : 'text-[#747686]'}`}>{cat.name}</p>
                <p className="text-xs font-black mt-0.5">
                  {formatIDR(categoryTotal)}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Wallets */}
      <section className="mt-8 space-y-3">
        <div className="flex justify-between items-center">
          <h2 className="text-xs uppercase tracking-wider text-[#747686] font-bold">My Wallets</h2>
          <span className="text-[10px] text-slate-400 font-medium">Tap to rotate</span>
        </div>

        <div 
          onClick={onRotateWallets}
          className="relative h-44 mb-4 select-none cursor-pointer group"
        >
          {/* Card 3 (Bottom) */}
          <div 
            className={`absolute w-full h-40 ${wallets[2].bgColor} rounded-2xl p-5 border border-white/10 shadow-sm flex flex-col justify-between overflow-hidden transition-all duration-300 transform scale-[0.92] -translate-y-6 z-0 opacity-40 group-hover:opacity-50`}
          >
            <div className="flex justify-between items-start">
              <div>
                <p className="text-slate-700/60 text-xs font-semibold">{wallets[2].name}</p>
                <p className="text-slate-800 font-bold text-sm mt-0.5">{wallets[2].number}</p>
              </div>
              <span className="material-symbols-outlined text-slate-800/40">contactless</span>
            </div>
          </div>

          {/* Card 2 (Middle) */}
          <div 
            className={`absolute w-full h-40 ${wallets[1].bgColor} rounded-2xl p-5 border border-white/10 shadow-md flex flex-col justify-between overflow-hidden transition-all duration-300 transform scale-[0.96] -translate-y-3 z-10 opacity-70 group-hover:opacity-85`}
          >
            <div className="flex justify-between items-start">
              <div>
                <p className="text-slate-700/60 text-xs font-semibold">{wallets[1].name}</p>
                <p className="text-slate-800 font-bold text-sm mt-0.5">{wallets[1].number}</p>
              </div>
              <span className="material-symbols-outlined text-slate-800/40">contactless</span>
            </div>
          </div>

          {/* Card 1 (Active Front) */}
          <div 
            className={`absolute w-full h-40 ${wallets[0].bgColor} rounded-2xl p-5 shadow-xl flex flex-col justify-between overflow-hidden transition-all duration-300 hover:scale-[1.01] transform translate-y-0 z-20`}
          >
            <div className="absolute -right-8 -bottom-8 w-36 h-36 bg-white/10 rounded-full blur-xl pointer-events-none" />
            
            <div className="flex justify-between items-start relative z-10">
              <div>
                <p className={`${wallets[0].textColor === 'text-white' ? 'text-slate-200/90' : 'text-slate-800/70'} text-xs font-semibold`}>
                  {wallets[0].name}
                </p>
                <p className={`${wallets[0].textColor} font-bold text-sm mt-0.5`}>
                  {wallets[0].number}
                </p>
              </div>
              <span className={`material-symbols-outlined ${wallets[0].textColor === 'text-white' ? 'text-white/60' : 'text-slate-800/60'}`}>
                contactless
              </span>
            </div>

            <div className="flex justify-between items-end relative z-10">
              <div>
                <p className={`${wallets[0].textColor === 'text-white' ? 'text-slate-200/90' : 'text-slate-800/70'} text-xs font-semibold`}>
                  Active Balance
                </p>
                <p className={`${wallets[0].textColor} text-2xl font-black mt-0.5`}>
                  {formatIDR(wallets[0].balance)}
                </p>
              </div>
              
              <div className="flex -space-x-2">
                <div className="w-8 h-8 rounded-full bg-white/20 border border-white/30" />
                <div className="w-8 h-8 rounded-full bg-white/40 border border-white/30" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Recent Transactions */}
      <section className="mt-8 space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-xs uppercase tracking-wider text-[#747686] font-bold">
            Recent Transactions {categoryFilter && `(${categoryFilter})`}
          </h2>
          <div 
            onClick={onNavigateToHistory}
            className="flex items-center gap-1 text-[#2650cf] cursor-pointer"
          >
            <span className="text-xs font-bold whitespace-nowrap">Latest</span>
            <span className="material-symbols-outlined text-md">expand_more</span>
          </div>
        </div>

        <div className="space-y-3">
          <AnimatePresence initial={false}>
            {transactions
              .filter(tx => !categoryFilter || tx.category === categoryFilter)
              .slice(0, 5)
              .map((tx) => (
                <motion.div 
                  layout
                  key={tx.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  onClick={() => onEditTransaction(tx)}
                  className="flex items-center justify-between bg-white p-4 rounded-2xl border border-slate-100 shadow-[0_2px_8px_rgba(0,0,0,0.02)] active:bg-slate-50 transition-colors cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-11 h-11 rounded-full ${tx.iconBg} ${tx.iconColor} flex items-center justify-center shadow-inner`}>
                      <span className="material-symbols-outlined text-[18px]">{tx.icon}</span>
                    </div>
                    <div>
                      <p className="font-bold text-sm text-[#121c2a]">{tx.title}</p>
                      <p className="text-xs text-[#747686] font-semibold mt-0.5">
                        {tx.category} • {formatDisplayDate(tx.date)}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <p className={`font-bold text-sm ${tx.type === 'income' ? 'text-[#006c4f]' : 'text-[#ba1a1a]'}`}>
                      {tx.type === 'income' ? '+' : '-'}{formatIDR(tx.amount)}
                    </p>
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        onDeleteTransaction(tx.id);
                      }}
                      className="text-slate-300 hover:text-[#ba1a1a] p-1 rounded-full transition-colors ml-1"
                      title="Hapus transaksi"
                    >
                      <span className="material-symbols-outlined text-lg leading-none cursor-pointer">close</span>
                    </button>
                  </div>
                </motion.div>
              ))}

            {transactions.filter(tx => !categoryFilter || tx.category === categoryFilter).length === 0 && (
              <div className="text-center py-8 bg-slate-50 rounded-2xl border border-dashed border-slate-200">
                <p className="text-sm font-semibold text-slate-400">Tidak ada transaksi ditemukan</p>
              </div>
            )}
          </AnimatePresence>
        </div>
      </section>
    </div>
  );
}
