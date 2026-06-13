import { useState } from 'react';
import { motion } from 'motion/react';

interface OnboardingBudgetProps {
  onBack: () => void;
  onContinue: (budget: number) => void;
}

export default function OnboardingBudget({ onBack, onContinue }: OnboardingBudgetProps) {
  const [amount, setAmount] = useState<string>('0');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const appendNumber = (num: string) => {
    if (num === '000') {
      setAmount(prev => prev === '0' ? '000' : prev + '000');
    } else if (amount === '0') {
      setAmount(num);
    } else {
      if (amount.length >= 12) return;
      setAmount(amount + num);
    }

    // Gentle tactile vibe trigger (simulate haptic)
    if (window.navigator.vibrate) {
      window.navigator.vibrate(12);
    }
  };

  const backspace = () => {
    if (amount.length > 1) {
      setAmount(amount.slice(0, -1));
    } else {
      setAmount('0');
    }
    if (window.navigator.vibrate) {
      window.navigator.vibrate(8);
    }
  };

  const handleContinue = () => {
    const numericVal = parseFloat(amount.replace(/[^0-9.]/g, '')) || 0;
    if (numericVal <= 0) {
      alert('Tentukan nominal anggaran bulanan Anda!');
      return;
    }
    setIsLoading(true);
    setTimeout(() => {
      onContinue(numericVal);
      setIsLoading(false);
    }, 800);
  };

  // Format with thousand separators (Indonesian style: 1.000.000)
  const getFormattedAmount = () => {
    if (!amount || amount === '0') return '0';
    // Remove all non-digits
    const cleanAmount = amount.replace(/[^0-9]/g, '');
    if (!cleanAmount) return '0';
    // Format with dots as thousand separators
    return cleanAmount.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  };

  return (
    <div className="bg-[#f8f9ff] min-h-screen flex flex-col justify-between overflow-hidden">
      {/* Header bar */}
      <header className="flex justify-between items-center px-6 py-4 w-full bg-white/40 sticky top-0 backdrop-blur-md z-40">
        <button 
          onClick={onBack}
          className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-slate-100 transition-colors active:scale-95 cursor-pointer text-slate-700"
        >
          <span className="material-symbols-outlined font-semibold">arrow_back</span>
        </button>
        <h1 className="text-xl font-bold tracking-tight text-[#2650cf]">TIPES</h1>
        <div className="w-10 h-10" /> {/* Spacer */}
      </header>

      {/* Main Container */}
      <main className="flex-1 flex flex-col px-6 pt-6 overflow-y-auto no-scrollbar items-center">
        {/* Playful Cat Mascot */}
        <motion.div 
          initial={{ y: -10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="mb-4 w-28 h-28 flex items-center justify-center bg-[#9df4ce] rounded-full relative overflow-hidden"
        >
          <img 
            alt="Mascot with phone" 
            className="w-20 h-20 object-contain" 
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBXuk_bzNKG-HYO97OgvPDdkZHww-KiTxdV5sXdVnXajXEURyRubtcbTqvUQb5yrMRQqNWZIth8bDnn5jocscX04K8mAmAoSaqkpYnN7BAOj2G-g3EDr6JcNWo9wIQzvdr88xGj-MwH9edCHhMhjWdZj7slchSxnjytRFclvCLzBsiQszH5p5plipVLYijYhqlm15S4lGsYJu0rUCUZ_i_OrIiKYFUH9GuCKzpJcS0fZmXKYzABY2fBSsAUpFsmMUT4m_SZVrZBiT8"
          />
        </motion.div>

        {/* Text Section */}
        <div className="text-center mb-6">
          <h2 className="text-2xl font-black text-[#121c2a] mb-1.5">Set Monthly Budget</h2>
          <p className="text-sm font-medium text-[#747686] max-w-[280px] mx-auto leading-relaxed">
            How much do you plan to spend this month? We'll help you stay on track.
          </p>
        </div>

        {/* Display screen */}
        <div className="flex items-baseline justify-center w-full py-4 mb-auto max-w-[320px]">
          <span className="text-xl font-bold text-[#2650cf] mr-1.5">Rp</span>
          <div className="text-4xl font-extrabold text-[#2650cf] tracking-tight truncate max-w-[240px]">
            {getFormattedAmount()}
          </div>
          <div className="w-1.5 h-8 bg-[#2650cf] ml-1.5 animate-pulse rounded-full" />
        </div>

        {/* Action Button */}
        <div className="w-full max-w-[340px] mb-6">
          <button 
            onClick={handleContinue}
            disabled={isLoading || amount === '0'}
            className={`w-full h-12 rounded-xl text-white font-bold text-sm tracking-wide shadow-md flex items-center justify-center gap-2 active:scale-98 transition-all duration-150 cursor-pointer ${
              amount === '0' 
                ? 'opacity-40 bg-slate-400 pointer-events-none' 
                : 'bg-gradient-to-r from-[#2650cf] to-[#456aea] shadow-blue-500/10 hover:opacity-95'
            }`}
          >
            {isLoading ? (
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <>
                <span>Continue</span>
                <span className="material-symbols-outlined text-lg">chevron_right</span>
              </>
            )}
          </button>
        </div>
      </main>

      {/* Numeric Keypad Component */}
      <div className="bg-white rounded-t-[32px] px-6 pt-6 pb-8 shadow-[0_-8px_30px_rgba(0,0,0,0.04)] grid grid-cols-3 gap-y-3 gap-x-2 w-full max-w-md mx-auto">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
          <button 
            key={num}
            onClick={() => appendNumber(num.toString())}
            className="h-14 flex items-center justify-center rounded-xl text-xl font-bold text-[#121c2a] hover:bg-slate-50 active:bg-slate-100/80 transition-colors cursor-pointer"
          >
            {num}
          </button>
        ))}
        {/* Zero */}
        <button 
          onClick={() => appendNumber('0')}
          className="h-14 flex items-center justify-center rounded-xl text-xl font-bold text-[#121c2a] hover:bg-slate-50 active:bg-slate-100/80 transition-colors cursor-pointer"
        >
          0
        </button>
        {/* 000 shortcut */}
        <button 
          onClick={() => appendNumber('000')}
          className="h-14 flex items-center justify-center rounded-xl text-base font-bold text-[#2650cf] hover:bg-blue-50 active:bg-blue-100 transition-colors cursor-pointer"
        >
          000
        </button>
        {/* Backspace */}
        <button 
          onClick={backspace}
          className="h-14 flex items-center justify-center rounded-xl text-slate-600 hover:bg-slate-50 active:bg-slate-100/80 transition-colors cursor-pointer"
        >
          <span className="material-symbols-outlined text-2xl font-bold">backspace</span>
        </button>
      </div>
    </div>
  );
}
