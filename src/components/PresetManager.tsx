import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Preset } from '../types';
import { CATEGORIES } from '../categories';
import { formatIDR } from '../utils';

interface PresetManagerProps {
  isOpen: boolean;
  onClose: () => void;
  presets: Preset[];
  onSavePreset: (preset: Preset) => void;
  onDeletePreset: (id: string) => void;
}

export default function PresetManager({ 
  isOpen, 
  onClose, 
  presets, 
  onSavePreset, 
  onDeletePreset 
}: PresetManagerProps) {
  const [isAdding, setIsAdding] = useState(false);
  const [editingPreset, setEditingPreset] = useState<Preset | null>(null);
  const [label, setLabel] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('Makanan');
  const [icon, setIcon] = useState('payments');

  const resetForm = () => {
    setLabel('');
    setAmount('');
    setCategory('Makanan');
    setIcon('payments');
    setIsAdding(false);
    setEditingPreset(null);
  };

  const handleEdit = (preset: Preset) => {
    setEditingPreset(preset);
    setLabel(preset.label);
    setAmount(preset.amount.toString());
    setCategory(preset.category);
    setIcon(preset.icon);
    setIsAdding(true);
  };

  const handleSave = () => {
    if (!label.trim()) {
      alert('Masukkan nama preset!');
      return;
    }

    const numericAmount = parseFloat(amount.replace(/[^\d]/g, '')) || 0;
    if (numericAmount <= 0) {
      alert('Masukkan nominal yang valid!');
      return;
    }

    const presetToSave: Preset = {
      id: editingPreset?.id || `preset-${Date.now()}`,
      label: label.trim(),
      amount: numericAmount,
      category,
      icon,
    };

    onSavePreset(presetToSave);
    resetForm();
  };

  const handleDelete = (id: string) => {
    if (confirm('Hapus preset ini?')) {
      onDeletePreset(id);
    }
  };

  if (!isOpen) return null;

  const availableCategories = CATEGORIES.filter(c => c.id !== 'Pemasukan');

  return (
    <>
      {/* Backdrop */}
      <div 
        onClick={() => { resetForm(); onClose(); }}
        className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 transition-opacity duration-300"
      />

      {/* Bottom Sheet */}
      <div 
        className="fixed bottom-0 left-0 right-0 z-50 bg-white rounded-t-3xl shadow-2xl transition-transform duration-500 max-h-[85vh] flex flex-col max-w-md mx-auto"
      >
        {/* Handle bar */}
        <div className="w-12 h-1 bg-slate-200 rounded-full mx-auto mt-3 mb-1" />

        {/* Header */}
        <div className="px-6 py-3 flex justify-between items-center border-b border-slate-100">
          <h2 className="text-lg font-bold text-[#121c2a]">
            {isAdding ? (editingPreset ? 'Edit Preset' : 'Tambah Preset') : 'Kelola Preset'}
          </h2>
          <button 
            onClick={() => { resetForm(); onClose(); }}
            className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-slate-50 text-slate-500 transition-colors active:scale-90 cursor-pointer"
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto no-scrollbar px-6 py-4 space-y-4 pb-6">
          {!isAdding ? (
            <>
              {/* Preset List */}
              {presets.length === 0 ? (
                <div className="text-center py-12">
                  <span className="material-symbols-outlined text-5xl text-slate-300 mb-3">bookmark_star</span>
                  <p className="text-sm font-semibold text-slate-500 mb-2">Belum ada preset</p>
                  <p className="text-xs text-slate-400">Buat preset untuk transaksi cepat</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {presets.map((preset) => (
                    <div 
                      key={preset.id}
                      className="flex items-center justify-between bg-slate-50 p-4 rounded-xl border border-slate-100"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-[#2650cf]/10 flex items-center justify-center">
                          <span className="material-symbols-outlined text-[#2650cf] text-lg">{preset.icon}</span>
                        </div>
                        <div>
                          <p className="font-bold text-sm text-[#121c2a]">{preset.label}</p>
                          <p className="text-xs text-[#747686] mt-0.5">
                            {preset.category} • {formatIDR(preset.amount)}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <button 
                          onClick={() => handleEdit(preset)}
                          className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-white text-slate-400 hover:text-[#2650cf] transition-colors cursor-pointer"
                          title="Edit"
                        >
                          <span className="material-symbols-outlined text-lg">edit</span>
                        </button>
                        <button 
                          onClick={() => handleDelete(preset.id)}
                          className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-white text-slate-400 hover:text-[#ba1a1a] transition-colors cursor-pointer"
                          title="Hapus"
                        >
                          <span className="material-symbols-outlined text-lg">delete</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Add Preset Button */}
              {presets.length < 10 && (
                <button 
                  onClick={() => setIsAdding(true)}
                  className="w-full py-3 border-2 border-dashed border-slate-200 rounded-xl text-center text-sm font-bold text-[#2650cf] hover:border-[#2650cf] hover:bg-blue-50 transition-colors cursor-pointer flex items-center justify-center gap-2"
                >
                  <span className="material-symbols-outlined text-lg">add</span>
                  Tambah Preset Baru
                </button>
              )}

              {presets.length >= 10 && (
                <div className="text-center py-3 bg-amber-50 border border-amber-200 rounded-xl">
                  <p className="text-xs font-semibold text-amber-700">
                    Maksimal 10 preset. Hapus salah satu untuk menambah preset baru.
                  </p>
                </div>
              )}
            </>
          ) : (
            <>
              {/* Add/Edit Form */}
              <div className="space-y-4">
                {/* Label */}
                <div>
                  <label className="text-xs font-bold text-[#747686] mb-2 block">Nama Preset</label>
                  <input 
                    type="text"
                    value={label}
                    onChange={(e) => setLabel(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-semibold focus:ring-2 focus:ring-blue-500/20 focus:border-[#2650cf] placeholder:text-slate-400"
                    placeholder="Contoh: Kopi Pagi"
                  />
                </div>

                {/* Amount */}
                <div>
                  <label className="text-xs font-bold text-[#747686] mb-2 block">Nominal</label>
                  <input 
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-semibold focus:ring-2 focus:ring-blue-500/20 focus:border-[#2650cf] placeholder:text-slate-400"
                    placeholder="25000"
                  />
                </div>

                {/* Category */}
                <div>
                  <label className="text-xs font-bold text-[#747686] mb-2 block">Kategori</label>
                  <div className="flex flex-wrap gap-2">
                    {availableCategories.map((cat) => (
                      <button
                        key={cat.id}
                        onClick={() => { setCategory(cat.id); setIcon(cat.icon); }}
                        className={`flex items-center gap-1.5 px-3 py-2 rounded-lg border transition-all cursor-pointer text-xs font-bold active:scale-95 ${
                          category === cat.id 
                            ? cat.colorClass + ' border-current'
                            : 'border-transparent bg-slate-100 text-[#121c2a]'
                        }`}
                      >
                        <span className="material-symbols-outlined text-[14px]">{cat.icon}</span>
                        <span>{cat.name}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Action Buttons */}
        {isAdding && (
          <div className="px-6 pt-2 pb-6 border-t border-slate-100 bg-white flex gap-3">
            <button 
              onClick={resetForm}
              className="flex-1 py-3 rounded-xl bg-slate-100 text-slate-700 font-bold text-sm hover:bg-slate-200 transition-colors cursor-pointer"
            >
              Batal
            </button>
            <button 
              onClick={handleSave}
              className="flex-1 bg-gradient-to-r from-[#2650cf] to-[#456aea] py-3 rounded-xl text-white font-bold text-sm shadow-lg shadow-blue-500/10 active:scale-[0.98] transition-transform cursor-pointer"
            >
              {editingPreset ? 'Update' : 'Simpan'}
            </button>
          </div>
        )}
      </div>
    </>
  );
}
