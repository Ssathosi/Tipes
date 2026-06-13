import { useState, useEffect, useCallback, useRef, ChangeEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Transaction, Wallet, Preset } from './types';
import { initialTransactions, initialWallets, initialPresets } from './initialData';
import { calculateStreak, formatIDR } from './utils';
import { getCategoryById, CATEGORIES } from './categories';
import { useAuth } from './lib/auth';
import { supabase } from './lib/supabase';
import * as services from './lib/services';
import { exportToCSV, exportToJSON } from './lib/export';

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

// Main app content - only renders when user is authenticated
function MainApp({ user, isGuest, signOut, enterGuestMode }: {
  user: { id: string; email?: string } | null;
  isGuest: boolean;
  signOut: () => Promise<void>;
  enterGuestMode: () => void;
}) {
  // All state hooks
  const [step, setStep] = useState<AppStep>('welcome');
  const [activeTab, setActiveTab] = useState<ActiveTab>('dashboard');
  const [username, setUsername] = useState<string>('User');
  const [monthlyLimit, setMonthlyLimit] = useState<number>(5000000);
  const [selectedMainCategories, setSelectedMainCategories] = useState<string[]>([
    'Makanan', 'Transportasi', 'Belanja', 'Hiburan', 'Kesehatan', 'Utilitas', 'Pemasukan', 'Lainnya'
  ]);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [wallets, setWallets] = useState<Wallet[]>(initialWallets);
  const [presets, setPresets] = useState<Preset[]>([]);
  const [categoryFilter, setCategoryFilter] = useState<string | null>(null);
  const [isAddExpenseOpen, setIsAddExpenseOpen] = useState<boolean>(false);
  const [isPresetManagerOpen, setIsPresetManagerOpen] = useState<boolean>(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState<boolean>(false);
  const [editingTransaction, setEditingTransaction] = useState<Transaction | null>(null);
  const [dataLoading, setDataLoading] = useState<boolean>(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const csvInputRef = useRef<HTMLInputElement>(null);

  const streak = calculateStreak(transactions);

  // Load data
  useEffect(() => {
    const loadData = async () => {
      setDataLoading(true);
      try {
        if (isGuest) {
          const savedStep = localStorage.getItem('tipes_step') as AppStep;
          if (savedStep) setStep(savedStep);
          else setStep('welcome');

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
            setUsername(prefs.username);
            setMonthlyLimit(prefs.monthly_budget);
            setSelectedMainCategories(prefs.selected_categories);
            setStep('app');
          } else {
            setStep('welcome');
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

  // Save guest data to localStorage
  useEffect(() => {
    if (isGuest && transactions.length > 0) {
      localStorage.setItem('tipes_transactions', JSON.stringify(transactions));
    }
  }, [transactions, isGuest]);

  useEffect(() => {
    if (isGuest && presets.length > 0) {
      localStorage.setItem('tipes_presets', JSON.stringify(presets));
    }
  }, [presets, isGuest]);

  useEffect(() => {
    if (isGuest) {
      localStorage.setItem('tipes_wallets', JSON.stringify(wallets));
    }
  }, [wallets, isGuest]);

  // Real-time sync for transactions
  useEffect(() => {
    if (!user || isGuest) return;

    const channel = supabase
      .channel('transactions_changes')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'transactions', filter: `user_id=eq.${user.id}` },
        (payload) => {
          if (payload.eventType === 'INSERT') {
            const newTx = payload.new as Transaction;
            setTransactions(prev => [newTx, ...prev]);
          } else if (payload.eventType === 'UPDATE') {
            setTransactions(prev =>
              prev.map(tx => tx.id === (payload.new as Transaction).id ? (payload.new as Transaction) : tx)
            );
          } else if (payload.eventType === 'DELETE') {
            setTransactions(prev => prev.filter(tx => tx.id !== (payload.old as Transaction).id));
          }
        }
      )
      .subscribe();

    return () => { supabase.removeChannel(channel); };
  }, [user, isGuest]);

  // Transaction handlers
  const handleSaveTransaction = useCallback((txData: {
    title: string; category: string; amount: number; type: 'income' | 'expense'; date?: number;
  }) => {
    if (isGuest) {
      const newTx: Transaction = {
        ...txData,
        id: `guest_${Date.now()}`,
        date: txData.date || Date.now(),
      };
      setTransactions(prev => [newTx, ...prev]);
      setIsAddExpenseOpen(false);
      return;
    }

    if (!user) return;
    services.createTransaction(user.id, {
      ...txData,
      date: txData.date || Date.now(),
    }).then(() => {
      setIsAddExpenseOpen(false);
    }).catch(err => console.error('Failed to create transaction:', err));
  }, [isGuest, user]);

  const handleUpdateTransaction = useCallback((tx: {
    id: string; title: string; category: string; amount: number; type: 'income' | 'expense'; date: number;
  }) => {
    if (isGuest) {
      setTransactions(prev => prev.map(t => t.id === tx.id ? { ...t, ...tx } : t));
      setEditingTransaction(null);
      return;
    }
    services.updateTransaction(tx as Transaction).then(() => {
      setEditingTransaction(null);
    }).catch(err => console.error('Failed to update transaction:', err));
  }, [isGuest]);

  const handleDeleteTransaction = useCallback((id: string) => {
    if (isGuest) {
      setTransactions(prev => prev.filter(tx => tx.id !== id));
      return;
    }
    services.deleteTransaction(id).catch(err => console.error('Failed to delete transaction:', err));
  }, [isGuest]);

  const handleUsernameChange = useCallback(async (name: string) => {
    setUsername(name);
    if (isGuest) {
      localStorage.setItem('tipes_username', name);
      return;
    }
    if (!user) return;
    try {
      await services.updateUserPreferences(user.id, {
        username: name,
        monthly_budget: monthlyLimit,
        selected_categories: selectedMainCategories,
      });
    } catch (error) {
      console.error('Failed to update username:', error);
    }
  }, [user, isGuest, monthlyLimit, selectedMainCategories]);

  const handleBudgetChange = useCallback(async (limit: number) => {
    setMonthlyLimit(limit);
    if (isGuest) {
      localStorage.setItem('tipes_budget', limit.toString());
      return;
    }
    if (!user) return;
    try {
      await services.updateUserPreferences(user.id, {
        username,
        monthly_budget: limit,
        selected_categories: selectedMainCategories,
      });
    } catch (error) {
      console.error('Failed to update budget:', error);
    }
  }, [user, isGuest, username, selectedMainCategories]);

  const handleCategoriesChange = useCallback(async (categories: string[]) => {
    setSelectedMainCategories(categories);
    if (isGuest) {
      localStorage.setItem('tipes_categories', JSON.stringify(categories));
      return;
    }
    if (!user) return;
    try {
      await services.updateUserPreferences(user.id, {
        username,
        monthly_budget: monthlyLimit,
        selected_categories: categories,
      });
    } catch (error) {
      console.error('Failed to update categories:', error);
    }
  }, [user, isGuest, username, monthlyLimit]);

  const handleCompleteOnboarding = useCallback(async () => {
    if (!isGuest && user) {
      try {
        await services.updateUserPreferences(user.id, {
          username,
          monthly_budget: monthlyLimit,
          selected_categories: selectedMainCategories,
        });
      } catch (error) {
        console.error('Failed to save onboarding:', error);
      }
    } else {
      localStorage.setItem('tipes_step', 'app');
      localStorage.setItem('tipes_username', username);
      localStorage.setItem('tipes_budget', monthlyLimit.toString());
      localStorage.setItem('tipes_categories', JSON.stringify(selectedMainCategories));
    }
    setStep('app');
  }, [user, isGuest, username, monthlyLimit, selectedMainCategories]);

  const handleSavePreset = useCallback(async (preset: Omit<Preset, 'id'>) => {
    const newPreset: Preset = {
      ...preset,
      id: `preset_${Date.now()}`,
    };
    setPresets(prev => [...prev, newPreset]);
    if (!isGuest && user) {
      try {
        await services.createPreset(user.id, preset);
      } catch (error) {
        console.error('Failed to save preset:', error);
      }
    }
    setIsPresetManagerOpen(false);
  }, [isGuest, user]);

  const handleDeletePreset = useCallback(async (id: string) => {
    setPresets(prev => prev.filter(p => p.id !== id));
    if (!isGuest && user) {
      try {
        await services.deletePreset(id);
      } catch (error) {
        console.error('Failed to delete preset:', error);
      }
    }
  }, [isGuest, user]);

  const handleExportCSV = useCallback(() => {
    exportToCSV(transactions);
  }, [transactions]);

  const handleExportJSON = useCallback(() => {
    exportToJSON(transactions);
  }, [transactions]);

  const handleImportJSON = useCallback(async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const data = JSON.parse(event.target?.result as string);
        if (Array.isArray(data)) {
          setTransactions(prev => [...data, ...prev]);
        }
      } catch (err) {
        console.error('Failed to import JSON:', err);
      }
    };
    reader.readAsText(file);
    e.target.value = '';
  }, []);

  const handleImportCSV = useCallback(async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const content = event.target?.result as string;
        const lines = content.split('\n').filter(line => line.trim());
        if (lines.length < 2) return;
        const dataLines = lines.slice(1);
        const imported: Transaction[] = dataLines.map((line, index) => {
          const values = line.split(',').map(v => v.trim().replace(/^"|"$/g, ''));
          return {
            id: `imported-${Date.now()}-${index}`,
            title: values[0] || 'Imported',
            category: values[1] || 'Lainnya',
            amount: parseFloat(values[2]) || 0,
            type: (values[3] || 'expense') as 'income' | 'expense',
            date: parseInt(values[4]) || Date.now(),
          };
        });
        setTransactions(prev => [...imported, ...prev]);
      } catch (err) {
        console.error('Failed to import CSV:', err);
      }
    };
    reader.readAsText(file);
    e.target.value = '';
  }, []);

  const handleResetApp = useCallback(async () => {
    if (isGuest) {
      localStorage.clear();
    } else if (user) {
      try {
        // Delete all transactions for this user
        for (const tx of transactions) {
          await services.deleteTransaction(tx.id);
        }
      } catch (error) {
        console.error('Failed to reset app:', error);
      }
    }
    setTransactions([]);
    setPresets([]);
    setUsername('User');
    setMonthlyLimit(5000000);
    setSelectedMainCategories(['Makanan', 'Transportasi', 'Belanja', 'Hiburan', 'Kesehatan', 'Utilitas', 'Pemasukan', 'Lainnya']);
    setStep('welcome');
    setIsSettingsOpen(false);
  }, [user, isGuest, transactions]);

  // Loading state
  if (dataLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-[#2650cf]"></div>
          <p className="mt-4 text-sm text-[#747686] font-medium">Memuat...</p>
        </div>
      </div>
    );
  }

  // Onboarding flow
  if (step !== 'app') {
    return (
      <AnimatePresence mode="wait">
        {step === 'welcome' && (
          <OnboardingWelcome
            onContinue={() => setStep('budget')}
            onGoToLogin={() => signOut()}
          />
        )}
        {step === 'budget' && (
          <OnboardingBudget
            onBack={() => setStep('welcome')}
            onContinue={(budget) => {
              setMonthlyLimit(budget);
              setStep('categories');
            }}
          />
        )}
        {step === 'categories' && (
          <OnboardingCategories
            onBack={() => setStep('budget')}
            onFinish={(selected) => {
              setSelectedMainCategories(selected);
              handleCompleteOnboarding();
            }}
          />
        )}
      </AnimatePresence>
    );
  }

  // Main app
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 pb-24">
      <AnimatePresence mode="wait">
        {activeTab === 'dashboard' && (
          <Dashboard
            transactions={transactions}
            wallets={wallets}
            budgetSpent={transactions
              .filter(t => t.type === 'expense')
              .reduce((sum, t) => sum + t.amount, 0)}
            monthlyLimit={monthlyLimit}
            onOpenAddExpense={() => setIsAddExpenseOpen(true)}
            onRotateWallets={() => {}}
            onDeleteTransaction={handleDeleteTransaction}
            onEditTransaction={(tx) => setEditingTransaction(tx)}
            categoryFilter={categoryFilter}
            setCategoryFilter={setCategoryFilter}
            onNavigateToHistory={() => setActiveTab('riwayat')}
            onApplyPreset={(preset) => {
              handleSaveTransaction({
                title: preset.label,
                category: preset.category,
                amount: preset.amount,
                type: 'expense',
                date: Date.now(),
              });
            }}
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
      </AnimatePresence>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur-xl border-t border-slate-100 px-6 py-3 flex justify-around items-center z-40">
        {(['dashboard', 'insights', 'riwayat'] as ActiveTab[]).map((tab) => (
          <button
            key={tab}
            onClick={() => { setActiveTab(tab); setCategoryFilter(null); }}
            className={`flex flex-col items-center gap-1 px-4 py-1 rounded-xl transition-all ${
              activeTab === tab
                ? 'text-[#2650cf] font-bold'
                : 'text-[#747686]'
            }`}
          >
            <span className="material-symbols-outlined text-2xl">
              {tab === 'dashboard' ? 'dashboard' : tab === 'insights' ? 'insights' : 'history'}
            </span>
            <span className="text-[10px]">
              {tab === 'dashboard' ? 'Beranda' : tab === 'insights' ? 'Insight' : 'Riwayat'}
            </span>
          </button>
        ))}
      </div>

      {/* Add Transaction FAB */}
      <motion.button
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsAddExpenseOpen(true)}
        className="fixed bottom-20 right-6 w-14 h-14 bg-gradient-to-r from-[#2650cf] to-[#456aea] text-white rounded-full shadow-lg shadow-blue-500/30 flex items-center justify-center z-40"
      >
        <span className="material-symbols-outlined text-3xl">add</span>
      </motion.button>

      {/* Hidden file inputs for import */}
      <input ref={fileInputRef} type="file" accept=".json" onChange={handleImportJSON} className="hidden" />
      <input ref={csvInputRef} type="file" accept=".csv" onChange={handleImportCSV} className="hidden" />

      {/* Modals & Sheets */}
      <AddTransactionSheet
        isOpen={isAddExpenseOpen}
        onClose={() => setIsAddExpenseOpen(false)}
        onSave={handleSaveTransaction}
        presets={presets}
        onManagePresets={() => {
          setIsAddExpenseOpen(false);
          setIsPresetManagerOpen(true);
        }}
      />

      {editingTransaction && (
        <AddTransactionSheet
          isOpen={!!editingTransaction}
          onClose={() => setEditingTransaction(null)}
          onSave={(data) => handleUpdateTransaction({ ...editingTransaction, ...data })}
          presets={presets}
          onManagePresets={() => {
            setEditingTransaction(null);
            setIsPresetManagerOpen(true);
          }}
          editingTransaction={editingTransaction}
          onUpdate={handleUpdateTransaction}
        />
      )}

      <PresetManager
        isOpen={isPresetManagerOpen}
        onClose={() => setIsPresetManagerOpen(false)}
        presets={presets}
        onSavePreset={handleSavePreset}
        onDeletePreset={handleDeletePreset}
      />

      <SettingsPanel
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        username={username}
        onUsernameChange={handleUsernameChange}
        monthlyLimit={monthlyLimit}
        onBudgetChange={handleBudgetChange}
        onExportCSV={handleExportCSV}
        onExportJSON={handleExportJSON}
        onImportJSON={() => fileInputRef.current?.click()}
        onImportCSV={() => csvInputRef.current?.click()}
        onResetApp={handleResetApp}
        onSignOut={async () => {
          await signOut();
          setIsSettingsOpen(false);
        }}
        streak={streak}
        transactionCount={transactions.length}
      />
    </div>
  );
}

// Root component - handles auth flow
export default function App() {
  const { user, loading, isGuest, enterGuestMode, signOut } = useAuth();

  if (!loading && !user && !isGuest) {
    return <LoginScreen enterGuestMode={enterGuestMode} />;
  }

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

  return <MainApp user={user} isGuest={isGuest} signOut={signOut} enterGuestMode={enterGuestMode} />;
}
