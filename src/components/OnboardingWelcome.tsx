import { useState } from 'react';
import { motion } from 'motion/react';

interface OnboardingWelcomeProps {
  onContinue: (nickname: string) => void;
  initialName?: string;
}

export default function OnboardingWelcome({ onContinue, initialName }: OnboardingWelcomeProps) {
  const [nickname, setNickname] = useState(initialName || '');

  const handleContinue = () => {
    if (!nickname.trim()) return;
    onContinue(nickname.trim());
  };

  return (
    <div className="soft-airy-gradient min-h-screen flex flex-col items-center justify-center px-6 py-12 relative overflow-hidden">
      {/* Ambient blur bubbles */}
      <div className="absolute -top-24 -left-24 w-64 h-64 bg-[#FFD77B] opacity-10 rounded-full blur-[100px]" />
      <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-[#F5A5BE] opacity-10 rounded-full blur-[100px]" />

      {/* Mascot */}
      <motion.div 
        initial={{ scale: 0.3, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 100, delay: 0.1 }}
        className="mb-8"
      >
        <div className="w-24 h-24 bg-white rounded-full shadow-lg flex items-center justify-center p-2 overflow-hidden border border-white/50">
          <img 
            alt="TIPES Logo" 
            className="w-full h-full object-contain" 
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuAMgPhlVTvFQkTCr-EWOKBRl3z51maJQH4glmynDbFqGqQ6hG2nMGKcoaCTI1wf1VMNvmz0je6R1Y0sZLTw6sL6Pn93o39_BhursUOpjPsV94AcTWTgTwucGyWINfCc0cL4vgxyIU5qZXom6cYKt0_IL6U7zAPn3DS7be4UezMqNNPMo_viQyktxj20NfJ5-PuuFTn8Ot7DhdAlYUMgq64zKgmJ3_3nbrU1O7-EOrrIKfTwHsVCnZFm2Jln2LDvysl4WN54y8A7qr8"
          />
        </div>
      </motion.div>

      {/* Header text */}
      <motion.div 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="text-center max-w-sm mb-10"
      >
        <h1 className="text-3xl font-black text-[#121c2a] tracking-tight mb-3">
          Siapa Nama Kamu?
        </h1>
        <p className="text-sm text-[#434654] px-4 font-medium leading-relaxed">
          Masukkan nickname yang akan ditampilkan di aplikasi.
        </p>
      </motion.div>

      {/* Input card */}
      <motion.div 
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="w-full max-w-[400px] bg-white/60 backdrop-blur-md rounded-2xl p-6 shadow-sm border border-white/30 flex flex-col gap-4"
      >
        <label className="text-xs font-bold text-[#434654] uppercase tracking-wide">Nickname</label>
        <input
          type="text"
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleContinue()}
          placeholder="Contoh: Rani"
          className="w-full h-12 px-4 bg-white border border-[#c4c5d6] rounded-xl text-sm text-[#121c2a] font-medium placeholder:text-[#a0a3b5] focus:outline-none focus:border-[#2650cf] focus:ring-2 focus:ring-[#2650cf]/20 transition-all"
          autoFocus
        />
        <button 
          onClick={handleContinue}
          disabled={!nickname.trim()}
          className="w-full h-12 bg-gradient-to-r from-[#2650cf] to-[#456aea] text-white rounded-xl font-semibold text-sm flex items-center justify-center hover:opacity-90 transition-all active:scale-98 cursor-pointer shadow-md shadow-blue-500/10 disabled:opacity-50 disabled:cursor-not-allowed mt-2"
        >
          Lanjut
        </button>
      </motion.div>
    </div>
  );
}
