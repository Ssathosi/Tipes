import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Transaction } from '../types';
import { formatIDR, formatDisplayDate, getRelativeDate } from '../utils';

interface TransactionsHistoryProps {
  transactions: Transaction[];
  onDeleteTransaction: (id: string) => void;
  onEditTransaction: (tx: Transaction) => void;
  onOpenAddExpense: () => void;
}

export default function TransactionsHistory({
  transactions,
  onDeleteTransaction,
  onEditTransaction,
  onOpenAddExpense,
}: TransactionsHistoryProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<'semua' | 'pengeluaran' | 'pemasukan'>('semua');
  const [swipedId, setSwipedId] = useState<string | null>(null);

  // Filter transactions
  const filteredTransactions = useMemo(() => {
    return transactions.filter((tx) => {
      const matchesSearch =
        tx.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tx.category.toLowerCase().includes(searchQuery.toLowerCase());

      if (!matchesSearch) return false;

      if (activeTab === 'pengeluaran') return tx.type === 'expense';
      if (activeTab === 'pemasukan') return tx.type === 'income';
      return true;
    });
  }, [transactions, searchQuery, activeTab]);

  // Group transactions by date
  const groupedTransactions = useMemo(() => {
    const groups: Record<string, Transaction[]> = {};
    
    filteredTransactions.forEach((tx) => {
      const dateKey = getRelativeDate(tx.date);
      if (!groups[dateKey]) {
        groups[dateKey] = [];
      }
      groups[dateKey].push(tx);
    });

    return Object.entries(groups).map(([date, txs]) => ({
      date,
      transactions: txs,
    }));
  }, [filteredTransactions]);

  const handleToggleSwipe = (id: string) => {
    setSwipedId(swipedId === id ? null : id);
  };

  return (
    <div className="pt-16 pb-32 px-4 space-y-6">
      {/* Search */}
      <div className="mt-4">
        <div className="relative">
          <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold">
            search
          </span>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-100/80 hover:bg-slate-100 border-none rounded-xl py-3.5 pl-12 pr-4 text-sm font-semibold focus:ring-2 focus:ring-blue-500/20 focus:bg-white transition-all placeholder:text-slate-400 text-[#121c2a]"
            placeholder="Cari transaksi..."
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
            >
              <span className="material-symbols-outlined text-md font-bold">close</span>
            </button>
          )}
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex bg-[#eff4ff] p-1.5 rounded-xl border border-[#c4c5d6]/20">
        {(['semua', 'pengeluaran', 'pemasukan'] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`flex-1 text-center py-2 text-xs font-black rounded-lg capitalize transition-all cursor-pointer ${
              activeTab === tab
                ? 'bg-[#2650cf] text-white shadow-sm'
                : 'text-[#747686] hover:text-[#121c2a]'
            }`}
          >
            {tab === 'semua' ? 'Semua' : tab === 'pengeluaran' ? 'Pengeluaran' : 'Pemasukan'}
          </button>
        ))}
      </div>

      {/* Grouped Transactions */}
      <div className="space-y-6">
        {groupedTransactions.map(({ date, transactions: groupTxs }) => {
          const groupTotal = groupTxs.reduce(
            (sum, t) => sum + (t.type === 'income' ? t.amount : -t.amount),
            0
          );

          return (
            <section key={date} className="space-y-3">
              <div className="flex justify-between items-center px-1">
                <h2 className="text-xs font-black text-[#747686]">{date}</h2>
                <span
                  className={`text-[10px] font-bold ${
                    groupTotal >= 0 ? 'text-[#006c4f]' : 'text-slate-400'
                  }`}
                >
                  Sum: {groupTotal >= 0 ? '+' : ''}
                  {formatIDR(groupTotal)}
                </span>
              </div>

              <div className="space-y-3">
                <AnimatePresence initial={false}>
                  {groupTxs.map((tx) => {
                    const isSwiped = swipedId === tx.id;
                    return (
                      <div
                        key={tx.id}
                        className="relative overflow-hidden rounded-xl bg-white border border-slate-100 shadow-[0_2px_8px_rgba(0,0,0,0.01)]"
                      >
                        {/* Delete background */}
                        <div
                          onClick={() => onDeleteTransaction(tx.id)}
                          className="absolute right-0 top-0 bottom-0 w-24 bg-[#ba1a1a] text-white flex flex-col items-center justify-center cursor-pointer active:brightness-90 transition-all shadow-inner"
                        >
                          <span className="material-symbols-outlined text-lg">delete</span>
                          <span className="text-[10px] font-bold mt-0.5">Hapus</span>
                        </div>

                        {/* Transaction item */}
                        <motion.div
                          onClick={() => handleToggleSwipe(tx.id)}
                          onDoubleClick={() => onEditTransaction(tx)}
                          animate={{ x: isSwiped ? -96 : 0 }}
                          transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                          className="bg-white p-4 flex items-center justify-between cursor-pointer relative z-10 select-none active:bg-slate-50 transition-colors"
                        >
                          <div className="flex items-center gap-3">
                            <div
                              className={`w-11 h-11 rounded-full ${tx.iconBg} ${tx.iconColor} flex items-center justify-center`}
                            >
                              <span className="material-symbols-outlined text-[18px]">
                                {tx.icon}
                              </span>
                            </div>
                            <div>
                              <h3 className="font-bold text-sm text-[#121c2a]">{tx.title}</h3>
                              <p className="text-xs text-[#747686] font-semibold mt-0.5">
                                {tx.category} • {formatDisplayDate(tx.date)}
                              </p>
                            </div>
                          </div>

                          <div className="text-right flex items-center gap-2">
                            <p
                              className={`font-bold text-sm ${
                                tx.type === 'income' ? 'text-[#006c4f]' : 'text-[#ba1a1a]'
                              }`}
                            >
                              {tx.type === 'income' ? '+' : '-'}
                              {formatIDR(tx.amount)}
                            </p>
                            <span className="material-symbols-outlined text-slate-300 text-sm select-none">
                              swipe_left
                            </span>
                          </div>
                        </motion.div>
                      </div>
                    );
                  })}
                </AnimatePresence>
              </div>
            </section>
          );
        })}

        {filteredTransactions.length === 0 && (
          <div className="text-center py-12 bg-white rounded-2xl border border-slate-100 shadow-sm space-y-3">
            <span className="material-symbols-outlined text-4xl text-slate-300">search_off</span>
            <p className="text-sm font-bold text-slate-400">Tidak ada riwayat transaksi yang cocok</p>
          </div>
        )}
      </div>

      {/* Floating Action Button */}
      <button
        onClick={onOpenAddExpense}
        className="fixed bottom-24 right-6 w-14 h-14 bg-gradient-to-br from-[#2650cf] to-[#456aea] text-white rounded-2xl shadow-xl flex items-center justify-center z-40 active:scale-90 transition-transform cursor-pointer"
        title="Tambah Transaksi"
      >
        <span className="material-symbols-outlined text-2xl font-bold">add</span>
      </button>
    </div>
  );
}
