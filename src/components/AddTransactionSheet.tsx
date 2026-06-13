import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Preset } from '../types';
import { CATEGORIES } from '../categories';
import { formatIDR } from '../utils';

interface AddTransactionSheetProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (transactionData: {
    title: string;
    category: string;
    amount: number;
    type: 'income' | 'expense';
    date?: number;
  }) => void;
  presets: Preset[];
  onManagePresets: () => void;
  editingTransaction?: {
    id: string;
    title: string;
    category: string;
    amount: number;
    type: 'income' | 'expense';
    date: number;
  } | null;
  onUpdate?: (tx: {
    id: string;
    title: string;
    category: string;
    amount: number;
    type: 'income' | 'expense';
    date: number;
  }) => void;
}

export default function AddTransactionSheet({ 
  isOpen, 
  onClose, 
  onSave, 
  presets, 
  onManagePresets,
  editingTransaction,
  onUpdate 
}: AddTransactionSheetProps) {
  const [currentAmount, setCurrentAmount] = useState<string>('0');
  const [selectedCategory, setSelectedCategory] = useState<string>('Makanan');
  const [note, setNote] = useState<string>('');
  const [type, setType] = useState<'income' | 'expense'>('expense');
  const [showToast, setShowToast] = useState<boolean>(false);

  // Populate fields when editing
  useEffect(() => {
    if (editingTransaction) {
      setCurrentAmount(editingTransaction.amount.toString());
      setSelectedCategory(editingTransaction.category);
      setNote(editingTransaction.title);
      setType(editingTransaction.type);
    }
  }, [editingTransaction]);

  const appendNumber = (num: string) => {
    if (currentAmount === '0') {
      if (num === '.') {
        setCurrentAmount('0.');
      } else {
        setCurrentAmount(num);
      }
    } else {
      if (num === '.' && currentAmount.includes('.')) return;
      if (currentAmount.includes('.') && currentAmount.split('.')[1].length >= 2) return;
      if (currentAmount.replace(/[.,]/g, '').length >= 12) return;

      setCurrentAmount(currentAmount + num);
    }
  };

  const backspace = () => {
    if (currentAmount.length > 1) {
      setCurrentAmount(currentAmount.slice(0, -1));
    } else {
      setCurrentAmount('0');
    }
  };

  const handleApplyPreset = (preset: Preset) => {
    setCurrentAmount(preset.amount.toString());
    setSelectedCategory(preset.category);
    setNote(preset.label);
    setType('expense');
  };

  const getFormattedAmount = () => {
    if (currentAmount === '0') return '0';
    let parts = currentAmount.split('.');
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    return parts.join(',');
  };

  const handleSave = () => {
    const numericAmount = parseFloat(currentAmount.replace(/\./g, '')) || 0;
    if (numericAmount <= 0) {
      alert('Masukkan nominal transaksi!');
      return;
    }

    const title = note.trim() || `${selectedCategory} Spend`;

    if (editingTransaction && onUpdate) {
      onUpdate({
        id: editingTransaction.id,
        title,
        category: selectedCategory,
        amount: numericAmount,
        type,
        date: editingTransaction.date,
      });
    } else {
      onSave({
        title,
        category: selectedCategory,
        amount: numericAmount,
        type,
      });
    }

    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
      resetForm();
      onClose();
    }, 1500);
  };

  const resetForm = () => {
    setCurrentAmount('0');
    setNote('');
    setSelectedCategory('Makanan');
    setType('expense');
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  if (!isOpen) return null;

  const isEditing = !!editingTransaction;

  // Filter categories: exclude Pemasukan when type is expense, exclude non-Pemasukan when type is income
  const availableCategories = type === 'income' 
    ? CATEGORIES.filter(c => c.id === 'Pemasukan' || c.id === 'Lainnya')
    : CATEGORIES.filter(c => c.id !== 'Pemasukan');

  return (
    <>
      {/* Backdrop */}
      <div 
        onClick={handleClose}
        className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 transition-opacity duration-300"
      />

      {/* Bottom Sheet */}
      <div 
        className="fixed bottom-0 left-0 right-0 z-50 bg-white rounded-t-3xl shadow-2xl transition-transform duration-500 max-h-[92vh] flex flex-col max-w-md mx-auto"
      >
        {/* Handle bar */}
        <div className="w-12 h-1 bg-slate-200 rounded-full mx-auto mt-3 mb-1" />

        {/* Header */}
        <div className="px-6 py-2.5 flex justify-between items-center border-b border-slate-50">
          <div className="flex gap-2">
            <button 
              onClick={() => setType('expense')}
              className={`px-3 py-1 text-xs font-black rounded-full cursor-pointer transition-all ${
                type === 'expense' ? 'bg-[#ba1a1a] text-white' : 'bg-slate-100 text-slate-500'
              }`}
            >
              Pengeluaran
            </button>
            <button 
              onClick={() => setType('income')}
              className={`px-3 py-1 text-xs font-black rounded-full cursor-pointer transition-all ${
                type === 'income' ? 'bg-[#006c4f] text-white' : 'bg-slate-100 text-slate-500'
              }`}
            >
              Pemasukan
            </button>
          </div>
          
          <button 
            onClick={handleClose}
            className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-slate-50 text-slate-500 transition-colors active:scale-90 cursor-pointer"
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto no-scrollbar px-6 py-4 space-y-6 pb-12">
          {/* Amount Display */}
          <div className="text-center">
            <span className="text-[10px] font-black tracking-widest text-slate-400 uppercase">NOMINAL</span>
            <div className="mt-1 flex items-baseline justify-center">
              <span className="font-extrabold text-lg text-[#2650cf] mr-1">Rp</span>
              <p className="text-4xl font-black text-[#2650cf] transition-all tracking-tight truncate max-w-[280px]">
                {getFormattedAmount()}
              </p>
            </div>
          </div>

          {/* Category Chip Selector — All 8 PRD Categories */}
          <div>
            <p className="text-xs font-black text-[#747686] mb-3">Pilih Kategori</p>
            <div className="flex gap-2 overflow-x-auto overflow-y-hidden pb-1 -mx-6 px-6 snap-x snap-mandatory scroll-smooth" style={{ WebkitOverflowScrolling: 'touch' }}>
              {availableCategories.map((cat) => {
                const isSelected = selectedCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`flex-shrink-0 min-w-[120px] flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl border transition-all cursor-pointer text-xs font-bold active:scale-95 snap-start ${
                      isSelected 
                        ? cat.colorClass + ' border-current'
                        : 'border-transparent bg-slate-50 text-[#121c2a]'
                    }`}
                  >
                    <span className="material-symbols-outlined text-[16px]">{cat.icon}</span>
                    <span>{cat.name}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Presets Row */}
          {!isEditing && (
            <div>
              <div className="flex justify-between items-center mb-3">
                <p className="text-xs font-black text-[#747686] font-semibold">Preset Cepat</p>
                <button 
                  onClick={onManagePresets}
                  className="text-[10px] font-bold text-[#2650cf] hover:underline"
                >
                  Kelola Preset
                </button>
              </div>
              {presets.length > 0 ? (
                <div className="flex gap-2 overflow-x-auto overflow-y-hidden -mx-6 px-6 snap-x snap-mandatory scroll-smooth" style={{ WebkitOverflowScrolling: 'touch' }}>
                  {presets.map((p) => (
                    <button
                      key={p.id}
                      onClick={() => handleApplyPreset(p)}
                      className="flex-shrink-0 min-w-[110px] flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl border border-slate-100 bg-slate-50/70 hover:bg-slate-50 text-xs font-bold transition-all active:scale-95 cursor-pointer text-slate-700 snap-start"
                    >
                      <span className="material-symbols-outlined text-sm text-[#2650cf]">{p.icon}</span>
                      <span>{p.label}</span>
                    </button>
                  ))}
                </div>
              ) : (
                <button 
                  onClick={onManagePresets}
                  className="w-full p-4 border-2 border-dashed border-slate-200 rounded-xl text-center text-xs font-bold text-slate-400 hover:border-[#2650cf] hover:text-[#2650cf] transition-colors cursor-pointer"
                >
                  + Buat preset pertama
                </button>
              )}
            </div>
          )}

          {/* Note Input */}
          <div className="relative">
            <input 
              type="text"
              value={note}
              onChange={(e) => setNote(e.target.value)}
              className="w-full bg-slate-50 text-[#121c2a] border-none rounded-xl px-4 py-3 text-xs font-semibold focus:ring-2 focus:ring-blue-500/20 placeholder:text-slate-400"
              placeholder="Tambahkan catatan (opsional)..."
            />
            <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 text-slate-300">edit_note</span>
          </div>

          {/* Numeric Keypad */}
          <div className="grid grid-cols-3 gap-3 max-w-xs mx-auto">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((val) => (
              <button 
                key={val}
                onClick={() => appendNumber(val.toString())}
                className="h-14 rounded-xl bg-slate-50 hover:bg-slate-100/70 text-md font-bold text-[#121c2a] active:bg-blue-100 transition-colors cursor-pointer"
              >
                {val}
              </button>
            ))}
            <button 
              onClick={() => appendNumber('0')}
              className="h-14 rounded-xl bg-slate-50 hover:bg-slate-100/70 text-md font-bold text-[#121c2a] cursor-pointer"
            >
              0
            </button>
            <button 
              onClick={() => appendNumber('000')}
              className="h-14 rounded-xl bg-slate-50 hover:bg-slate-100/70 text-md font-bold text-[#121c2a] cursor-pointer"
            >
              000
            </button>
            <button 
              onClick={backspace}
              className="h-14 rounded-xl bg-slate-50 hover:bg-slate-100/70 flex items-center justify-center text-slate-500 active:bg-rose-50 cursor-pointer"
            >
              <span className="material-symbols-outlined text-lg">backspace</span>
            </button>
          </div>
        </div>

        {/* Action button */}
        <div className="px-6 pt-2 pb-6 border-t border-slate-50 bg-white">
          <button 
            onClick={handleSave}
            className="w-full bg-gradient-to-r from-[#2650cf] to-[#456aea] py-3.5 rounded-xl text-white font-bold text-sm tracking-wide shadow-lg shadow-blue-500/10 active:scale-[0.98] transition-transform cursor-pointer"
          >
            {isEditing ? 'Update Transaksi' : 'Simpan Transaksi'}
          </button>
        </div>
      </div>

      {/* Success Toast */}
      <AnimatePresence>
        {showToast && (
          <motion.div 
            initial={{ opacity: 0, y: -50, x: "-50%" }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            className="fixed top-12 left-1/2 -translate-x-1/2 z-[100]"
          >
            <div className="bg-[#121c2a] text-white py-3 px-5 rounded-full shadow-2xl flex items-center gap-2">
              <span className="material-symbols-outlined text-[#7fd5b1] text-lg font-bold">check_circle</span>
              <span className="text-xs font-bold">{isEditing ? 'Transaksi Diperbarui!' : 'Transaksi Berhasil Disimpan!'}</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
