import { SignIn } from '@clerk/clerk-react';

export default function LoginScreen({ enterGuestMode }: { enterGuestMode: () => void }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-black text-[#2650cf] mb-2">TIPES</h1>
          <p className="text-sm text-[#747686] font-medium">Masuk ke akun Anda</p>
        </div>

        {/* Clerk SignIn */}
        <div className="bg-white rounded-2xl shadow-xl p-6 border border-slate-100">
          <SignIn
            appearance={{
              elements: {
                rootBox: 'w-full',
                card: 'shadow-none border-0',
                headerTitle: 'hidden',
                headerSubtitle: 'hidden',
                socialButtonsBlockButton: 'border-2 border-slate-200 rounded-xl hover:bg-slate-50 transition-colors',
                formButtonPrimary: 'bg-gradient-to-r from-[#2650cf] to-[#456aea] text-white rounded-xl font-bold hover:opacity-90 transition-opacity',
                footerActionLink: 'text-[#2650cf] font-semibold hover:underline',
              },
            }}
          />
        </div>

        {/* Guest Mode Button */}
        <button
          onClick={enterGuestMode}
          className="w-full mt-4 flex items-center justify-center gap-2 bg-slate-50 border-2 border-slate-200 text-[#747686] py-3 rounded-xl font-bold hover:bg-slate-100 transition-colors"
        >
          <span className="material-symbols-outlined text-lg">person_off</span>
          Masuk sebagai Tamu (Tanpa Login)
        </button>

        {/* Footer */}
        <p className="text-center text-xs text-[#747686] mt-6">
          Dengan melanjutkan, Anda menyetujui Syarat & Ketentuan kami
        </p>
      </div>
    </div>
  );
}
