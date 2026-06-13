import { motion } from 'motion/react';

interface OnboardingWelcomeProps {
  onContinue: () => void;
  onGoToLogin: () => void;
}

export default function OnboardingWelcome({ onContinue, onGoToLogin }: OnboardingWelcomeProps) {
  return (
    <div className="soft-airy-gradient min-h-screen flex flex-col items-center justify-center px-6 py-12 relative overflow-hidden">
      {/* Micro-interaction ambient blur bubbles */}
      <div className="absolute -top-24 -left-24 w-64 h-64 bg-[#FFD77B] opacity-10 rounded-full blur-[100px]" />
      <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-[#F5A5BE] opacity-10 rounded-full blur-[100px]" />

      {/* Mascot Section */}
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
          Welcome to TIPES
        </h1>
        <p className="text-sm text-[#434654] px-4 font-medium leading-relaxed">
          Start tracking your money today with minimal friction.
        </p>
      </motion.div>

      {/* Onboarding card */}
      <motion.div 
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="w-full max-w-[400px] bg-white/60 backdrop-blur-md rounded-2xl p-6 shadow-sm border border-white/30 flex flex-col gap-4"
      >
        {/* Create Account primary button */}
        <button 
          onClick={onContinue}
          className="w-full h-12 bg-gradient-to-r from-[#2650cf] to-[#456aea] text-white rounded-xl font-semibold text-sm flex items-center justify-center hover:opacity-90 transition-all active:scale-98 cursor-pointer shadow-md shadow-blue-500/10"
        >
          Create Account
        </button>

        {/* Divider with Or continue with */}
        <div className="flex items-center gap-4 py-1">
          <div className="flex-1 h-[1px] bg-[#dce1ff]" />
          <span className="text-xs text-[#747686] font-semibold px-1">Or continue with</span>
          <div className="flex-1 h-[1px] bg-[#dce1ff]" />
        </div>

        {/* Social logins */}
        <div className="flex flex-col gap-2">
          {/* Continue with Google */}
          <button 
            onClick={onContinue}
            className="w-full h-12 bg-white hover:bg-slate-50 border border-[#c4c5d6] rounded-xl flex items-center justify-center gap-3 font-semibold text-sm text-[#434654] transition-colors active:scale-98 cursor-pointer"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"></path>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-1 .67-2.28 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"></path>
              <path d="M5.84 14.09c-.22-.67-.35-1.39-.35-2.09s.13-1.42.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"></path>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 12-4.53z" fill="#EA4335"></path>
            </svg>
            Continue with Google
          </button>


        </div>
      </motion.div>

      {/* Footer login trigger */}
      <motion.footer 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="mt-8 text-center"
      >
        <p className="text-sm text-[#434654] font-medium">
          Already have an account? 
          <button 
            onClick={onGoToLogin}
            className="text-[#2650cf] font-bold hover:underline underline-offset-4 ml-1 cursor-pointer"
          >
            Login
          </button>
        </p>
      </motion.footer>
    </div>
  );
}
