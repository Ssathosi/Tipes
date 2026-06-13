import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Transaction, Wallet, Preset } from './types';
import { initialTransactions, initialWallets, initialPresets } from './initialData';
import { calculateStreak, formatIDR } from './utils';
import { getCategoryById, CATEGORIES } from './categories';
import { useAuth } from './lib/auth';
import { supabase } from './lib/supabase';
import * as services from './lib/services';
import { exportToCSV, exportToJSON, importFromJSON, importFromCSV } from './lib/export';

// Components
import LoginScreen from './components/LoginScreen';
import OnboardingWelcome from './components/OnboardingWelcome';
import OnboardingBudget from './components/OnboardingBudget';
import OnboardingCategories from './components/OnboardingCategories';
import Dashboard from './components/Dashboard';
import Insights from './components/Insights';
import TransactionsHistory from './components/TransactionsHistory';
import AddTransactionSheet from './components/AddTransactionSheet';
import PresetManager from './components/PresetManager';
import SettingsPanel from './components/SettingsPanel';

type AppStep = 'welcome' | 'budget' | 'categories' | 'app';
type ActiveTab = 'dashboard' | 'insights' | 'riwayat';

export default function App() {
  const { user, loading, isGuest, enterGuestMode, signOut } = useAuth();

  // Navigation & step control - hooks must be called before any early returns
  const [step, setStep] = useState<AppStep>(() => {
    // Check if user has completed onboarding before
    const userId = user?.id || 'guest';
    const onboardingKey = `tipes_onboarding_completed_${userId}`;
    const hasCompletedOnboarding = localStorage.getItem(onboardingKey) === 'true';
    return hasCompletedOnboarding ? 'app' : 'welcome';
  });
  const [activeTab, setActiveTab] = useState<ActiveTab>('dashboard');

  // Application data states
  const [username, setUsername] = useState<string>('User');
  const [monthlyLimit, setMonthlyLimit] = useState<number>(5000000);
  const [selectedMainCategories, setSelectedMainCategories] = useState<string[]>([
    'Makanan', 'Transportasi', 'Belanja', 'Hiburan', 'Kesehatan', 'Utilitas', 'Pemasukan', 'Lainnya'
  ]);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [wallets, setWallets] = useState<Wallet[]>(initialWallets);
  const [presets, setPresets] = useState<Preset[]>([]);

  // UI state
  const [categoryFilter, setCategoryFilter] = useState<string | null>(null);
  const [isAddExpenseOpen, setIsAddExpenseOpen] = useState<boolean>(false);
  const [isPresetManagerOpen, setIsPresetManagerOpen] = useState<boolean>(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState<boolean>(false);
  const [editingTransaction, setEditingTransaction] = useState<Transaction | null>(null);
  const [dataLoading, setDataLoading] = useState<boolean>(false);

  // Redirect to login if not authenticated and not in guest mode
  if (!loading && !user && !isGuest) {
    return <LoginScreen enterGuestMode={enterGuestMode} />;
  }

  // Show loading while checking auth
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block w-12 h-12 border-4 border-[#2650cf] border-t-transparent rounded-full animate-spin mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  // Streak
  const streak = calculateStreak(transactions);

  // Load data from Supabase when user logs in, or from localStorage for guest mode
  useEffect(() => {
    if (!user && !isGuest) {
      setTransactions([]);
      setPresets([]);
      setStep('welcome');
      return;
    }

    const loadData = async () => {
      setDataLoading(true);
      try {
        if (isGuest) {
          const savedStep = localStorage.getItem('tipes_step') as AppStep;
          if (savedStep) setStep(savedStep);

          const savedUsername = localStorage.getItem('tipes_username');
          if (savedUsername) setUsername(savedUsername);

          const savedBudget = localStorage.getItem('tipes_budget');
          if (savedBudget) setMonthlyLimit(parseFloat(savedBudget));

          const savedCategories = localStorage.getItem('tipes_categories');
          if (savedCategories) setSelectedMainCategories(JSON.parse(savedCategories));

          const savedTransactions = localStorage.getItem('tipes_transactions');
          if (savedTransactions) setTransactions(JSON.parse(savedTransactions));

          const savedPresets = localStorage.getItem('tipes_presets');
          if (savedPresets) setPresets(JSON.parse(savedPresets));

          const savedWallets = localStorage.getItem('tipes_wallets');
          if (savedWallets) setWallets(JSON.parse(savedWallets));
        } else if (user) {
          const prefs = await services.fetchUserPreferences(user.id);
          if (prefs) {
            // User has completed onboarding before
            setUsername(prefs.username);
            setMonthlyLimit(prefs.monthly_budget);
            setSelectedMainCategories(prefs.selected_categories);
            setStep('app'); // Skip onboarding, go straight to app
          }

          const txs = await services.fetchTransactions(user.id);
          setTransactions(txs);

          const prs = await services.fetchPresets(user.id);
          setPresets(prs);

          const savedWallets = localStorage.getItem('tipes_wallets');
          if (savedWallets) setWallets(JSON.parse(savedWallets));
        }
      } catch (error) {
        console.error('Failed to load data:', error);
      } finally {
        setDataLoading(false);
      }
    };

    loadData();
  }, [user, isGuest]);

  // Real-time sync for transactions (when user is logged in)
  useEffect(() => {
    if (!user || isGuest) return;

    const channel = supabase
      .channel('transactions_changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'transactions',
          filter: `user_id=eq.${user.id}`
        },
        async (payload) => {
          console.log('[Realtime] Transaction changed:', payload);
          
          // Reload transactions from database
          try {
            const { data, error } = await supabase
              .from('transactions')
              .select('*')
              .eq('user_id', user.id)
              .order('date', { ascending: false });

            if (error) throw error;

            const updatedTransactions = (data || []).map(tx => ({
              id: tx.id,
              type: tx.type,
              category: tx.category,
              amount: tx.amount,
              description: tx.description,
              date: tx.date,
              icon: tx.icon,
              createdAt: tx.created_at
            }));

            setTransactions(updatedTransactions);
          } catch (error) {
            console.error('[Realtime] Failed to sync transactions:', error);
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [user, isGuest]);

  const saveToLocal = useCallback((key: string, value: any) => {
    if (typeof value === 'string') {
      localStorage.setItem(key, value);
    } else {
      localStorage.setItem(key, JSON.stringify(value));
    }
  }, []);

  // Show loading while checking auth
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-[#2650cf]"></div>
          <p className="mt-4 text-sm text-[#747686] font-medium">Memuat...</p>
        </div>
      </div>
    );
  }

  // Show login if not authenticated and not in guest mode
  if (!user && !isGuest) {
    return (
      <LoginScreen
        enterGuestMode={() => {
          setIsGuest(true);
          localStorage.setItem('tipes_guest', 'true');
        }}
      />
    );
  }

  // Save user preferences to Supabase
  const savePreferences = async (prefs: Partial<services.UserPreferences>) => {
    if (!user) return;
    try {
      await services.updateUserPreferences(user.id, prefs);
    } catch (error) {
      console.error('Failed to save preferences:', error);
    }
  };

  // Wallet rotation
  const handleRotateWallets = () => {
    const rotated = [...wallets];
    const first = rotated.shift();
    if (first) {
      rotated.push(first);
      setWallets(rotated);
      saveToLocal('tipes_wallets', rotated);
    }
  };

  // Get icon config for a category
  const getCategoryIconConfig = (categoryId: string) => {
    const cat = getCategoryById(categoryId);
    if (cat) return { icon: cat.icon, iconBg: cat.bgClass, iconColor: cat.iconColor };
    return { icon: 'payments', iconBg: 'bg-slate-100', iconColor: 'text-slate-700' };
  };

  // Save new transaction
  const handleSaveExpense = async (newTx: { 
    title: string; 
    category: string; 
    amount: number; 
    type: 'income' | 'expense';
    date?: number;
  }) => {
    if (!user) return;
    
    const config = getCategoryIconConfig(newTx.category);
    const now = newTx.date || Date.now();

    try {
      const createdTx = await services.createTransaction(user.id, {
        title: newTx.title,
        category: newTx.category,
        amount: newTx.amount,
        type: newTx.type,
        date: now,
        icon: config.icon,
        iconBg: config.iconBg,
        iconColor: config.iconColor,
      });

      setTransactions([createdTx, ...transactions]);

      // Update wallet balance locally
      const updatedWallets = [...wallets];
      if (newTx.type === 'expense') {
        updatedWallets[0].balance = Math.max(0, updatedWallets[0].balance - newTx.amount);
      } else {
        updatedWallets[0].balance += newTx.amount;
      }
      setWallets(updatedWallets);
      saveToLocal('tipes_wallets', updatedWallets);
    } catch (error) {
      console.error('Failed to save transaction:', error);
      alert('Gagal menyimpan transaksi. Silakan coba lagi.');
    }
  };

  // Update existing transaction (edit)
  const handleUpdateTransaction = async (updatedTx: Transaction) => {
    const config = getCategoryIconConfig(updatedTx.category);
    const finalTx: Transaction = {
      ...updatedTx,
      icon: config.icon,
      iconBg: config.iconBg,
      iconColor: config.iconColor,
    };

    try {
      await services.updateTransaction(finalTx);
      const updatedTxs = transactions.map(t => t.id === finalTx.id ? finalTx : t);
      setTransactions(updatedTxs);
      setEditingTransaction(null);
    } catch (error) {
      console.error('Failed to update transaction:', error);
      alert('Gagal memperbarui transaksi. Silakan coba lagi.');
    }
  };

  // Delete transaction
  const handleDeleteTransaction = async (id: string) => {
    const target = transactions.find(t => t.id === id);
    if (!target) return;

    try {
      await services.deleteTransaction(id);
      const filtered = transactions.filter(t => t.id !== id);
      setTransactions(filtered);

      // Refund / deduct wallet balance
      const updatedWallets = [...wallets];
      if (target.type === 'expense') {
        updatedWallets[0].balance += target.amount;
      } else {
        updatedWallets[0].balance = Math.max(0, updatedWallets[0].balance - target.amount);
      }
      setWallets(updatedWallets);
      saveToLocal('tipes_wallets', updatedWallets);
    } catch (error) {
      console.error('Failed to delete transaction:', error);
      alert('Gagal menghapus transaksi. Silakan coba lagi.');
    }
  };

  // Preset management
  const handleSavePreset = async (preset: Preset) => {
    if (!user) return;
    
    const existing = presets.find(p => p.id === preset.id);
    
    try {
      if (existing) {
        const updated = await services.updatePreset(preset);
        const updatedPresets = presets.map(p => p.id === preset.id ? updated : p);
        setPresets(updatedPresets);
      } else {
        if (presets.length >= 10) {
          alert('Maksimal 10 preset! Hapus salah satu terlebih dahulu.');
          return;
        }
        const created = await services.createPreset(user.id, preset);
        setPresets([...presets, created]);
      }
    } catch (error) {
      console.error('Failed to save preset:', error);
      alert('Gagal menyimpan preset. Silakan coba lagi.');
    }
  };

  const handleDeletePreset = async (id: string) => {
    try {
      await services.deletePreset(id);
      const updatedPresets = presets.filter(p => p.id !== id);
      setPresets(updatedPresets);
    } catch (error) {
      console.error('Failed to delete preset:', error);
      alert('Gagal menghapus preset. Silakan coba lagi.');
    }
  };

  const handleApplyPreset = (preset: Preset) => {
    handleSaveExpense({
      title: preset.label,
      category: preset.category,
      amount: preset.amount,
      type: 'expense',
    });
  };

  // CSV Export
  const handleExportCSV = () => {
    const headers = ['Tanggal', 'Judul', 'Kategori', 'Jumlah', 'Tipe'];
    const rows = transactions.map(t => [
      new Date(t.date).toLocaleDateString('id-ID'),
      t.title,
      t.category,
      t.amount.toString(),
      t.type === 'income' ? 'Pemasukan' : 'Pengeluaran',
    ]);
    
    const csvContent = [headers, ...rows]
      .map(row => row.map(cell => `"${cell}"`).join(','))
      .join('\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `tipes_export_${new Date().toISOString().slice(0,10)}.csv`);
    link.click();
    URL.revokeObjectURL(url);
  };

  // JSON Export
  const handleExportJSON = () => {
    exportToJSON(transactions);
  };

  // JSON Import
  const handleImportJSON = async () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    input.onchange = async (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (!file) return;
      
      try {
        const imported = await importFromJSON(file);
        setTransactions([...imported, ...transactions]);
        alert(`Berhasil mengimpor ${imported.length} transaksi`);
      } catch (error) {
        alert(`Import gagal: ${error instanceof Error ? error.message : 'Unknown error'}`);
      }
    };
    input.click();
  };

  // CSV Import
  const handleImportCSV = async () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.csv';
    input.onchange = async (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (!file) return;
      
      try {
        const imported = await importFromCSV(file);
        setTransactions([...imported, ...transactions]);
        alert(`Berhasil mengimpor ${imported.length} transaksi`);
      } catch (error) {
        alert(`Import gagal: ${error instanceof Error ? error.message : 'Unknown error'}`);
      }
    };
    input.click();
  };

  // Reset app
  const handleResetApp = () => {
    if (!confirm('Reset semua data? Tindakan ini tidak bisa dibatalkan.')) return;
    localStorage.clear();
    setTransactions(initialTransactions);
    setWallets(initialWallets);
    setPresets(initialPresets);
    setUsername('Rani');
    setMonthlyLimit(5000000);
    setStep('welcome');
    setActiveTab('dashboard');
  };

  // Budget spent calculation
  const budgetSpent = transactions
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0);

  return (
    <div className="max-w-md mx-auto min-h-screen bg-slate-50 relative flex flex-col shadow-2xl overflow-hidden border border-slate-100">
      
      {/* Onboarding welcome */}
      {step === 'welcome' && (
        <OnboardingWelcome 
          onContinue={() => {
            setStep('budget');
            saveToLocal('tipes_step', 'budget');
          }}
          onGoToLogin={() => {
            setStep('app');
            saveToLocal('tipes_step', 'app');
          }}
        />
      )}

      {/* Onboarding budget */}
      {step === 'budget' && (
        <OnboardingBudget 
          onBack={() => {
            setStep('welcome');
            saveToLocal('tipes_step', 'welcome');
          }}
          onContinue={async (budget) => {
            setMonthlyLimit(budget);
            await savePreferences({ monthly_budget: budget });
            setStep('categories');
            saveToLocal('tipes_step', 'categories');
          }}
        />
      )}

      {/* Onboarding categories */}
      {step === 'categories' && (
        <OnboardingCategories 
          onBack={() => {
            setStep('budget');
            saveToLocal('tipes_step', 'budget');
          }}
          onFinish={async (categories) => {
            setSelectedMainCategories(categories);
            await savePreferences({ selected_categories: categories });
            setStep('app');
            saveToLocal('tipes_step', 'app');
          }}
        />
      )}

      {/* Main app */}
      {step === 'app' && (
        <div className="flex-grow flex flex-col justify-between">
          
          {/* Header */}
          <header className="fixed top-0 w-full max-w-md z-40 bg-white/85 backdrop-blur-md flex items-center justify-between px-6 h-16 border-b border-slate-100/50">
            <div className="flex items-center gap-3">
              <div 
                onClick={() => setIsSettingsOpen(true)}
                className="w-10 h-10 rounded-full overflow-hidden border-2 border-blue-200 cursor-pointer hover:opacity-90 active:scale-95 transition-all"
                title="Pengaturan"
              >
                <img 
                  alt={username} 
                  className="w-full h-full object-cover" 
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuCwdbVrWDx7kyGUT2RyWk9jrp1WKSx8tOTym4WBTs_Ln-xz2E-CJypYVklHt9kCv89A9kzD43Pn-g63jlcRG0B6SO5ZEOVZ4YOM_6nNjUDmAXQlGsOvPShAfxVKoE60e9fM5rUjx9wbS1uyxkjnvHiUzYmZ2ay1eRENa-yF2B_fF0iAVWX4JakAW4_vZnoCDZCQHFhbQmlmCgPTB0VmIvaJUas3Z9A-z5XdecWggryOFVV-vpk__Yxq20SQB0WL_xKLsNZ5hSmPQSc"
                />
              </div>
              <div>
                <p className="text-[10px] text-slate-400 font-extrabold uppercase tracking-wide leading-none">Hello,</p>
                <h1 className="font-bold text-sm text-[#121c2a] mt-0.5">{username}</h1>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {/* Streak Badge */}
              <div className="flex items-center gap-1.5 bg-gradient-to-r from-orange-50 to-amber-50 px-3 py-1.5 rounded-full border border-orange-200/50 text-xs font-bold">
                <span className="text-sm">🔥</span>
                <span className="text-orange-700">{streak.current} day{streak.current !== 1 ? 's' : ''}</span>
              </div>

              {/* Notification Bell */}
              <button 
                onClick={() => {
                  const remaining = monthlyLimit - budgetSpent;
                  const percent = monthlyLimit > 0 ? Math.round((budgetSpent / monthlyLimit) * 100) : 0;
                  alert(
                    `📊 Budget Report\n\n` +
                    `Limit: ${formatIDR(monthlyLimit)}\n` +
                    `Spent: ${formatIDR(budgetSpent)} (${percent}%)\n` +
                    `Remaining: ${formatIDR(Math.max(0, remaining))}\n\n` +
                    `${percent >= 80 ? '⚠️ Warning: Budget hampir habis!' : '✅ Budget masih aman!'}`
                  );
                }}
                className="w-9 h-9 flex items-center justify-center rounded-full bg-slate-50 text-[#434654] border border-slate-100 hover:bg-slate-100 transition-colors cursor-pointer"
              >
                <span className="material-symbols-outlined text-[20px]">notifications</span>
              </button>
            </div>
          </header>

          {/* Tab Content */}
          <main className="flex-grow">
            {activeTab === 'dashboard' && (
              <Dashboard 
                transactions={transactions}
                wallets={wallets}
                budgetSpent={budgetSpent}
                monthlyLimit={monthlyLimit}
                onOpenAddExpense={() => setIsAddExpenseOpen(true)}
                onRotateWallets={handleRotateWallets}
                onDeleteTransaction={handleDeleteTransaction}
                onEditTransaction={(tx) => setEditingTransaction(tx)}
                categoryFilter={categoryFilter}
                setCategoryFilter={setCategoryFilter}
                onNavigateToHistory={() => setActiveTab('riwayat')}
                onApplyPreset={handleApplyPreset}
                presets={presets}
                streak={streak}
                username={username}
              />
            )}

            {activeTab === 'insights' && (
              <Insights 
                transactions={transactions}
                monthlyLimit={monthlyLimit}
              />
            )}

            {activeTab === 'riwayat' && (
              <TransactionsHistory 
                transactions={transactions}
                onDeleteTransaction={handleDeleteTransaction}
                onEditTransaction={(tx) => setEditingTransaction(tx)}
                onOpenAddExpense={() => setIsAddExpenseOpen(true)}
              />
            )}
          </main>

          {/* Bottom Navigator */}
          <div className="fixed bottom-6 left-1/2 -translate-x-1/2 w-[calc(100%-32px)] max-w-sm z-40">
            <nav className="flex justify-between items-center px-6 h-16 bg-[#0F1419]/95 backdrop-blur-md border border-white/10 rounded-full shadow-2xl text-white/50">
              
              {/* Home Tab */}
              <button 
                onClick={() => setActiveTab('dashboard')}
                className={`flex flex-col items-center justify-center w-12 cursor-pointer transition-all ${
                  activeTab === 'dashboard' ? 'text-white' : 'hover:text-white/80'
                }`}
              >
                <span className={`material-symbols-outlined text-lg ${activeTab === 'dashboard' ? 'font-fill font-black' : ''}`}>grid_view</span>
                <span className="text-[10px] font-bold mt-0.5">Home</span>
              </button>

              {/* Insights Tab */}
              <button 
                onClick={() => setActiveTab('insights')}
                className={`flex flex-col items-center justify-center w-12 cursor-pointer transition-all ${
                  activeTab === 'insights' ? 'text-white' : 'hover:text-white/80'
                }`}
              >
                <span className="material-symbols-outlined text-lg">analytics</span>
                <span className="text-[10px] font-bold mt-0.5">Insights</span>
              </button>

              {/* Add Button */}
              <div className="relative -top-6">
                <button 
                  onClick={() => setIsAddExpenseOpen(true)}
                  className="w-14 h-14 bg-gradient-to-r from-[#2650cf] to-[#456aea] text-white rounded-full shadow-lg shadow-blue-500/30 border-4 border-[#0F1419] flex items-center justify-center active:scale-90 hover:scale-105 transition-all cursor-pointer"
                  title="Tambah Transaksi"
                >
                  <span className="material-symbols-outlined text-3xl font-black">add</span>
                </button>
              </div>

              {/* History Tab */}
              <button 
                onClick={() => setActiveTab('riwayat')}
                className={`flex flex-col items-center justify-center w-12 cursor-pointer transition-all ${
                  activeTab === 'riwayat' ? 'text-white' : 'hover:text-white/80'
                }`}
              >
                <span className="material-symbols-outlined text-lg">account_balance_wallet</span>
                <span className="text-[10px] font-bold mt-0.5">Riwayat</span>
              </button>

              {/* Settings Tab */}
              <button 
                onClick={() => setIsSettingsOpen(true)}
                className="flex flex-col items-center justify-center w-12 hover:text-white/80 cursor-pointer transition-all"
                title="Pengaturan"
              >
                <span className="material-symbols-outlined text-lg">settings</span>
                <span className="text-[10px] font-bold mt-0.5">Setting</span>
              </button>
            </nav>
          </div>

          {/* Add Transaction Sheet */}
          <AddTransactionSheet 
            isOpen={isAddExpenseOpen}
            onClose={() => { setIsAddExpenseOpen(false); setEditingTransaction(null); }}
            onSave={handleSaveExpense}
            presets={presets}
            onManagePresets={() => setIsPresetManagerOpen(true)}
            editingTransaction={editingTransaction}
            onUpdate={handleUpdateTransaction}
          />

          {/* Preset Manager Sheet */}
          <PresetManager
            isOpen={isPresetManagerOpen}
            onClose={() => setIsPresetManagerOpen(false)}
            presets={presets}
            onSavePreset={handleSavePreset}
            onDeletePreset={handleDeletePreset}
          />

          {/* Settings Panel */}
          <SettingsPanel
            isOpen={isSettingsOpen}
            onClose={() => setIsSettingsOpen(false)}
            username={username}
            onUsernameChange={async (name) => {
              setUsername(name);
              await savePreferences({ username: name });
            }}
            monthlyLimit={monthlyLimit}
            onBudgetChange={async (limit) => {
              setMonthlyLimit(limit);
              await savePreferences({ monthly_budget: limit });
            }}
            onExportCSV={handleExportCSV}
            onExportJSON={handleExportJSON}
            onImportJSON={handleImportJSON}
            onImportCSV={handleImportCSV}
            onResetApp={handleResetApp}
            onSignOut={async () => {
              await signOut();
              setIsGuest(false);
              localStorage.removeItem('tipes_guest');
              setIsSettingsOpen(false);
            }}
            streak={streak}
            transactionCount={transactions.length}
          />
        </div>
      )}
    </div>
  );
}
