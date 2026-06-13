import { useState, useMemo } from 'react';
import { Transaction } from '../types';
import { CATEGORIES } from '../categories';
import { formatIDR, getStartOfMonth, getStartOfWeek } from '../utils';

interface InsightsProps {
  transactions: Transaction[];
  monthlyLimit: number;
}

type ViewMode = 'week' | 'month';

export default function Insights({ transactions, monthlyLimit }: InsightsProps) {
  const [viewMode, setViewMode] = useState<ViewMode>('month');
  const [selectedMonthOffset, setSelectedMonthOffset] = useState(0);
  const [selectedWeekOffset, setSelectedWeekOffset] = useState(0);

  // Calculate date range
  const now = new Date();
  
  const dateRange = useMemo(() => {
    if (viewMode === 'month') {
      const start = new Date(now.getFullYear(), now.getMonth() + selectedMonthOffset, 1);
      const end = new Date(now.getFullYear(), now.getMonth() + selectedMonthOffset + 1, 0, 23, 59, 59, 999);
      return { start: start.getTime(), end: end.getTime() };
    } else {
      const start = new Date(now);
      start.setDate(start.getDate() - (start.getDay() || 7) + 1 + (selectedWeekOffset * 7));
      start.setHours(0, 0, 0, 0);
      const end = new Date(start);
      end.setDate(end.getDate() + 6);
      end.setHours(23, 59, 59, 999);
      return { start: start.getTime(), end: end.getTime() };
    }
  }, [viewMode, selectedMonthOffset, selectedWeekOffset]);

  // Get previous period for trend comparison
  const prevDateRange = useMemo(() => {
    if (viewMode === 'month') {
      const start = new Date(now.getFullYear(), now.getMonth() + selectedMonthOffset - 1, 1);
      const end = new Date(now.getFullYear(), now.getMonth() + selectedMonthOffset, 0, 23, 59, 59, 999);
      return { start: start.getTime(), end: end.getTime() };
    } else {
      const start = new Date(dateRange.start);
      start.setDate(start.getDate() - 7);
      const end = new Date(start);
      end.setDate(end.getDate() + 6);
      end.setHours(23, 59, 59, 999);
      return { start: start.getTime(), end: end.getTime() };
    }
  }, [dateRange, viewMode]);

  // Filter transactions for current period
  const currentTransactions = transactions.filter(
    t => t.date >= dateRange.start && t.date <= dateRange.end
  );

  const prevTransactions = transactions.filter(
    t => t.date >= prevDateRange.start && t.date <= prevDateRange.end
  );

  // Calculate totals
  const totalSpend = currentTransactions
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0);

  const totalIncome = currentTransactions
    .filter(t => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0);

  const netBalance = totalIncome - totalSpend;

  const prevTotalSpend = prevTransactions
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0);

  const prevTotalIncome = prevTransactions
    .filter(t => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0);

  // Calculate trend percentages
  const spendTrend = prevTotalSpend > 0 
    ? Math.round(((totalSpend - prevTotalSpend) / prevTotalSpend) * 100)
    : totalSpend > 0 ? 100 : 0;

  const incomeTrend = prevTotalIncome > 0
    ? Math.round(((totalIncome - prevTotalIncome) / prevTotalIncome) * 100)
    : totalIncome > 0 ? 100 : 0;

  // Category breakdown
  const categoryBreakdown = useMemo(() => {
    const expenses = currentTransactions.filter(t => t.type === 'expense');
    const breakdown: Array<{ id: string; name: string; icon: string; amount: number; percent: number; color: string }> = [];

    CATEGORIES.forEach(cat => {
      if (cat.id === 'Pemasukan') return;
      const amount = expenses
        .filter(t => t.category === cat.id)
        .reduce((sum, t) => sum + t.amount, 0);
      if (amount > 0) {
        breakdown.push({
          id: cat.id,
          name: cat.name,
          icon: cat.icon,
          amount,
          percent: totalSpend > 0 ? Math.round((amount / totalSpend) * 100) : 0,
          color: getCatColor(cat.id),
        });
      }
    });

    return breakdown.sort((a, b) => b.amount - a.amount);
  }, [currentTransactions, totalSpend]);

  // Build conic gradient for donut
  const donutGradient = useMemo(() => {
    if (categoryBreakdown.length === 0) {
      return 'conic-gradient(#e2e8f0 0% 100%)';
    }
    let acc = 0;
    const stops: string[] = [];
    categoryBreakdown.forEach((cat) => {
      stops.push(`${cat.color} ${acc}% ${acc + cat.percent}%`);
      acc += cat.percent;
    });
    if (acc < 100) {
      stops.push(`#e2e8f0 ${acc}% 100%`);
    }
    return `conic-gradient(${stops.join(', ')})`;
  }, [categoryBreakdown]);

  // Period label
  const periodLabel = useMemo(() => {
    if (viewMode === 'month') {
      const months = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 
                      'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];
      const d = new Date(now.getFullYear(), now.getMonth() + selectedMonthOffset, 1);
      return `${months[d.getMonth()]} ${d.getFullYear()}`;
    } else {
      const start = new Date(dateRange.start);
      const end = new Date(dateRange.end);
      const months = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des'];
      return `${start.getDate()} ${months[start.getMonth()]} - ${end.getDate()} ${months[end.getMonth()]}`;
    }
  }, [viewMode, selectedMonthOffset, dateRange]);

  const handlePrev = () => {
    if (viewMode === 'month') setSelectedMonthOffset(o => o - 1);
    else setSelectedWeekOffset(o => o - 1);
  };

  const handleNext = () => {
    if (viewMode === 'month') setSelectedMonthOffset(o => Math.min(o + 1, 0));
    else setSelectedWeekOffset(o => Math.min(o + 1, 0));
  };

  return (
    <div className="pt-20 pb-32 px-4 space-y-6">
      {/* View Mode Toggle */}
      <div className="flex bg-slate-100 p-1 rounded-xl">
        <button 
          onClick={() => setViewMode('week')}
          className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all cursor-pointer ${
            viewMode === 'week' ? 'bg-white text-[#121c2a] shadow-sm' : 'text-[#747686]'
          }`}
        >
          Mingguan
        </button>
        <button 
          onClick={() => setViewMode('month')}
          className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all cursor-pointer ${
            viewMode === 'month' ? 'bg-white text-[#121c2a] shadow-sm' : 'text-[#747686]'
          }`}
        >
          Bulanan
        </button>
      </div>

      {/* Period Selector */}
      <div className="flex items-center justify-between bg-[#eff4ff] p-2 rounded-full border border-[#c4c5d6]/20">
        <button 
          onClick={handlePrev}
          className="w-10 h-10 flex items-center justify-center rounded-full bg-white text-[#121c2a] shadow-sm active:scale-90 transition-all cursor-pointer"
        >
          <span className="material-symbols-outlined">chevron_left</span>
        </button>
        <span className="text-sm font-bold text-[#747686]">{periodLabel}</span>
        <button 
          onClick={handleNext}
          disabled={viewMode === 'month' ? selectedMonthOffset >= 0 : selectedWeekOffset >= 0}
          className="w-10 h-10 flex items-center justify-center rounded-full bg-white text-[#121c2a] shadow-sm active:scale-90 transition-all cursor-pointer disabled:opacity-40"
        >
          <span className="material-symbols-outlined">chevron_right</span>
        </button>
      </div>

      {/* Summary Cards */}
      <section className="relative flex gap-3 overflow-x-auto overflow-y-hidden py-2 -mx-4 px-4 snap-x snap-mandatory scroll-smooth" style={{ WebkitOverflowScrolling: 'touch' }}>
        {/* Total Spend */}
        <div className="min-w-[160px] flex-shrink-0 snap-start p-4 rounded-2xl bg-white border border-[#c4c5d6]/20 shadow-[0_2px_8px_rgba(0,0,0,0.02)] space-y-1">
          <p className="text-xs text-[#747686] font-semibold">Total Pengeluaran</p>
          <p className="text-lg font-black text-[#121c2a]">{formatIDR(totalSpend)}</p>
          {spendTrend !== 0 && (
            <div className={`flex items-center gap-1 text-[10px] font-bold ${spendTrend > 0 ? 'text-[#ba1a1a]' : 'text-[#006c4f]'}`}>
              <span className={`material-symbols-outlined text-[13px] font-bold ${spendTrend > 0 ? 'arrow_upward' : 'arrow_downward'}`} />
              <span>{Math.abs(spendTrend)}% vs {viewMode === 'month' ? 'bulan lalu' : 'minggu lalu'}</span>
            </div>
          )}
        </div>

        {/* Total Income */}
        <div className="min-w-[160px] flex-shrink-0 snap-start p-4 rounded-2xl bg-white border border-[#c4c5d6]/20 shadow-[0_2px_8px_rgba(0,0,0,0.02)] space-y-1">
          <p className="text-xs text-[#747686] font-semibold">Total Pemasukan</p>
          <p className="text-lg font-black text-[#121c2a]">{formatIDR(totalIncome)}</p>
          {incomeTrend !== 0 && (
            <div className={`flex items-center gap-1 text-[10px] font-bold ${incomeTrend > 0 ? 'text-[#006c4f]' : 'text-[#ba1a1a]'}`}>
              <span className={`material-symbols-outlined text-[13px] font-bold ${incomeTrend > 0 ? 'arrow_upward' : 'arrow_downward'}`} />
              <span>{Math.abs(incomeTrend)}% vs {viewMode === 'month' ? 'bulan lalu' : 'minggu lalu'}</span>
            </div>
          )}
        </div>

        {/* Net Balance */}
        <div className="min-w-[160px] flex-shrink-0 snap-start p-4 rounded-2xl bg-[#5B7FFF] text-white shadow-md space-y-1">
          <p className="text-xs opacity-90 font-semibold">Net Balance</p>
          <p className="text-lg font-black">{formatIDR(netBalance)}</p>
          <div className="flex items-center gap-1 text-[10px] font-bold opacity-90">
            <span className={`material-symbols-outlined text-[13px] font-bold ${netBalance >= 0 ? 'trending_up' : 'trending_down'}`} />
            <span>{netBalance >= 0 ? 'Surplus' : 'Deficit'}</span>
          </div>
        </div>
      </section>

      {/* Donut Chart */}
      <section className="bg-white p-5 rounded-2xl border border-slate-100 shadow-[0_4px_12px_rgba(0,0,0,0.02)] space-y-4">
        <h3 className="font-bold text-md text-[#121c2a]">Breakdown {viewMode === 'month' ? 'Bulanan' : 'Mingguan'}</h3>
        <div className="flex flex-col items-center">
          {/* Donut */}
          <div className="relative w-48 h-48 rounded-full flex items-center justify-center p-3">
            <div className="absolute inset-0 rounded-full border-[16px] border-slate-50 opacity-40" />
            
            <div 
              className="absolute inset-0 rounded-full border-[16px] border-transparent" 
              style={{
                background: donutGradient,
                maskImage: 'radial-gradient(circle, transparent 58%, black 60%)',
                WebkitMaskImage: 'radial-gradient(circle, transparent 58%, black 60%)',
              }}
            />

            {/* Center */}
            <div className="text-center z-10 bg-white shadow-inner rounded-full p-6 w-32 h-32 flex flex-col justify-center">
              <p className="text-[10px] font-bold tracking-wider uppercase text-[#747686]">Total Spent</p>
              <h2 className="text-xl font-black text-[#121c2a] mt-0.5">
                {formatIDR(totalSpend)}
              </h2>
            </div>
          </div>

          {/* Legends */}
          {categoryBreakdown.length > 0 && (
            <div className="grid grid-cols-2 gap-x-6 gap-y-2.5 w-full pt-6">
              {categoryBreakdown.map((cat) => (
                <div key={cat.id} className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: cat.color }} />
                  <p className="text-xs font-semibold text-[#121c2a]">
                    {cat.name} <span className="font-black ml-1 text-slate-400">{cat.percent}%</span>
                  </p>
                </div>
              ))}
            </div>
          )}

          {categoryBreakdown.length === 0 && (
            <p className="text-sm text-slate-400 font-semibold pt-4">Belum ada pengeluaran di periode ini</p>
          )}
        </div>
      </section>

      {/* Top Categories */}
      {categoryBreakdown.length > 0 && (
        <section className="space-y-3">
          <h3 className="font-bold text-md text-[#121c2a]">Top Pengeluaran</h3>
          <div className="bg-white rounded-2xl border border-slate-100 shadow-[0_4px_12px_rgba(0,0,0,0.01)] overflow-hidden">
            {categoryBreakdown.map((cat, idx) => {
              const txCount = currentTransactions.filter(
                t => t.type === 'expense' && t.category === cat.id
              ).length;

              return (
                <div key={cat.id} className={`p-4 space-y-2.5 ${idx < categoryBreakdown.length - 1 ? 'border-b border-slate-50' : ''}`}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: cat.color + '20' }}>
                        <span className="material-symbols-outlined text-[20px] font-semibold" style={{ color: cat.color }}>{cat.icon}</span>
                      </div>
                      <div>
                        <p className="font-bold text-sm text-[#121c2a]">{cat.name}</p>
                        <p className="text-xs text-slate-400 font-semibold">{txCount} transaksi</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-black text-sm text-[#121c2a]">{formatIDR(cat.amount)}</p>
                      <p className="text-[10px] font-black" style={{ color: cat.color }}>{cat.percent}% of total</p>
                    </div>
                  </div>
                  <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                    <div className="h-full rounded-full transition-all duration-300" style={{ width: `${cat.percent}%`, backgroundColor: cat.color }} />
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      )}
    </div>
  );
}

function getCatColor(id: string): string {
  const colors: Record<string, string> = {
    Makanan: '#f59e0b',
    Transportasi: '#2650cf',
    Belanja: '#ec4899',
    Hiburan: '#8b5cf6',
    Kesehatan: '#10b981',
    Utilitas: '#a855f7',
    Lainnya: '#6b7280',
  };
  return colors[id] || '#6b7280';
}
