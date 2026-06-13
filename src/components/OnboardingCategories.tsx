import { useState } from 'react';
import { motion } from 'motion/react';

interface OnboardingCategoriesProps {
  onBack: () => void;
  onFinish: (selected: string[]) => void;
}

interface CategoryOption {
  id: string;
  name: string;
  icon: string;
  bgClass: string;
  dotClass: string;
}

export default function OnboardingCategories({ onBack, onFinish }: OnboardingCategoriesProps) {
  const [selectedIds, setSelectedIds] = useState<string[]>(['Belanja', 'Kesehatan']); // Prefilled based on the mockup

  const categories: CategoryOption[] = [
    { id: 'Makanan', name: 'Makanan', icon: 'restaurant', bgClass: 'bg-[#FFD77B]/10', dotClass: 'bg-[#FFD77B] text-[#002115]' },
    { id: 'Transportasi', name: 'Transportasi', icon: 'commute', bgClass: 'bg-[#2650cf]/10', dotClass: 'bg-[#2650cf] text-white' },
    { id: 'Belanja', name: 'Belanja', icon: 'shopping_bag', bgClass: 'bg-[#F5A5BE]/10', dotClass: 'bg-[#F5A5BE] text-[#39071d]' },
    { id: 'Hiburan', name: 'Hiburan', icon: 'sports_esports', bgClass: 'bg-[#ffb0c9]/10', dotClass: 'bg-[#a46077] text-white' },
    { id: 'Kesehatan', name: 'Kesehatan', icon: 'medical_services', bgClass: 'bg-[#9df4ce]/30', dotClass: 'bg-[#7fd5b1] text-emerald-990' },
    { id: 'Utilitas', name: 'Utilitas', icon: 'bolt', bgClass: 'bg-slate-200/50', dotClass: 'bg-slate-400 text-white' },
    { id: 'Pemasukan', name: 'Pemasukan', icon: 'account_balance_wallet', bgClass: 'bg-[#9df4ce]/30', dotClass: 'bg-[#9df4ce] text-emerald-900' },
    { id: 'Lainnya', name: 'Lainnya', icon: 'more_horiz', bgClass: 'bg-slate-100', dotClass: 'bg-[#d0dbed] text-slate-700' }
  ];

  const toggleCategory = (id: string) => {
    if (selectedIds.includes(id)) {
      setSelectedIds(selectedIds.filter(selectedId => selectedId !== id));
    } else {
      setSelectedIds([...selectedIds, id]);
    }
  };

  return (
    <div className="bg-[#f8f9ff] min-h-screen flex flex-col justify-between overflow-x-hidden">
      {/* Search Header Bar */}
      <header className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-md flex justify-between items-center px-6 py-4">
        <div className="flex items-center gap-3">
          <button 
            onClick={onBack}
            className="w-10 h-10 flex items-center justify-center rounded-full bg-slate-50 hover:opacity-80 transition-opacity active:scale-95 cursor-pointer text-[#121c2a]"
          >
            <span className="material-symbols-outlined">chevron_left</span>
          </button>
          <h1 className="font-bold text-xl text-[#2650cf]">TIPES</h1>
        </div>
        <div className="flex items-center gap-1">
          <span className="text-xs font-bold text-[#747686]">Step 2 of 2</span>
        </div>
      </header>

      {/* Main content body */}
      <main className="flex-1 px-6 pt-6 pb-20 overflow-y-auto">
        {/* Intro Section */}
        <section className="mb-6">
          <div className="flex justify-between items-end mb-4">
            <div className="max-w-[72%]">
              <h2 className="text-2xl font-black text-[#121c2a] leading-tight mb-2">
                Choose Your Categories
              </h2>
              <p className="text-xs font-semibold text-[#434654] leading-relaxed">
                Pick the things you spend on most to personalize your TIPES experience.
              </p>
            </div>
            {/* Round Mascot profile */}
            <div className="relative animate-bounce-subtle">
              <img 
                alt="Gray Cat Onboarding" 
                className="w-16 h-16 object-cover rounded-full border-4 border-white shadow-md"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDpQywJQV3IOCjxYpGW2zk6JATmjk5aIiB-eLmF4iuD4PjaGiI7udFf1yzcyDrWgiTIawl9sfCy0HNRgAVaycc58awzycNDxt72_UUB_mSA1hNor1KDgeSyK6kpP1UJOyKF-o30a9OZkWlLub-qtevfAJfRkuCRcZ_PXoGrKwl0B69nRyn1wz8zKqomZnqO0i_Bolj5r3GNuamc6JCgcdnYEbyNsL46pVn8y-DO4yMH2CvlbFyg_Gf_n281vdtq7cAOP9AG4_6sYRI"
              />
            </div>
          </div>
        </section>

        {/* Bento Grid */}
        <section className="grid grid-cols-2 gap-4 mb-6">
          {categories.map((cat) => {
            const isSelected = selectedIds.includes(cat.id);
            return (
              <div 
                key={cat.id}
                onClick={() => toggleCategory(cat.id)}
                className={`cursor-pointer relative overflow-hidden p-4 rounded-xl flex flex-col gap-3 border-2 transition-all duration-200 group active:scale-95 ${
                  isSelected 
                    ? 'border-[#2650cf] bg-white shadow-md shadow-blue-500/5' 
                    : 'border-transparent ' + cat.bgClass
                }`}
              >
                {/* Category circle icon */}
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${cat.dotClass} shadow-sm`}>
                  <span className="material-symbols-outlined font-semibold text-[20px]">{cat.icon}</span>
                </div>
                
                {/* Name */}
                <span className="font-bold text-sm text-[#121c2a]">{cat.name}</span>

                {/* Checked Badge */}
                <div className={`absolute top-2.5 right-2.5 transition-opacity duration-150 ${isSelected ? 'opacity-100' : 'opacity-0'}`}>
                  <span className="material-symbols-outlined text-[#2650cf] text-lg font-bold">check_circle</span>
                </div>
              </div>
            );
          })}
        </section>

        {/* Informative Tip Box */}
        <div className="bg-slate-50 rounded-xl p-4 border-l-4 border-[#2650cf] shadow-sm">
          <div className="flex gap-3 items-start">
            <span className="material-symbols-outlined text-[#2650cf] mt-0.5">info</span>
            <p className="text-xs text-[#434654] font-medium leading-relaxed">
              You can always add more categories or change these later in your profile settings.
            </p>
          </div>
        </div>
      </main>

      {/* Button footer sticky */}
      <footer className="sticky bottom-0 p-6 bg-white/80 backdrop-blur-md pb-8 border-t border-slate-100">
        <button 
          onClick={() => onFinish(selectedIds)}
          className="w-full bg-[#2650cf] cursor-pointer hover:opacity-95 text-white py-3.5 rounded-xl font-bold text-sm shadow-lg shadow-blue-500/20 active:scale-95 transition-all duration-150"
        >
          Finish Setup
        </button>
      </footer>
    </div>
  );
}
