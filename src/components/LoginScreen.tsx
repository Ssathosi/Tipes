import { useState, FormEvent } from 'react';
import { useAuth } from '../lib/auth';

export default function LoginScreen() {
  const { signInWithGoogle, signInWithEmail, signUpWithEmail, enterGuestMode } = useAuth();
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleEmailAuth = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (isSignUp) {
        await signUpWithEmail(email, password, username);
      } else {
        await signInWithEmail(email, password);
      }
    } catch (err: any) {
      setError(err.message || 'Terjadi kesalahan');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setError('');
    setLoading(true);
    try {
      await signInWithGoogle();
    } catch (err: any) {
      setError(err.message || 'Gagal login dengan Google');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-black text-[#2650cf] mb-2">TIPES</h1>
          <p className="text-sm text-[#747686] font-medium">
            {isSignUp ? 'Buat akun baru' : 'Masuk ke akun Anda'}
          </p>
        </div>

        {/* Card */}
        <div className="bg-white rounded-2xl shadow-xl p-6 border border-slate-100">
          {/* Error Message */}
          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-sm text-red-600 font-medium">{error}</p>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleEmailAuth} className="space-y-4 mb-6">
            {isSignUp && (
              <div>
                <label className="block text-sm font-semibold text-[#121c2a] mb-2">
                  Username
                </label>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Masukkan username"
                  className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#2650cf] focus:border-transparent outline-none transition-all"
                  required={isSignUp}
                />
              </div>
            )}

            <div>
              <label className="block text-sm font-semibold text-[#121c2a] mb-2">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="nama@email.com"
                className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#2650cf] focus:border-transparent outline-none transition-all"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-[#121c2a] mb-2">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#2650cf] focus:border-transparent outline-none transition-all"
                required
                minLength={6}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-[#2650cf] to-[#456aea] text-white py-3 rounded-xl font-bold hover:opacity-90 transition-opacity disabled:opacity-50"
            >
              {loading ? 'Memuat...' : isSignUp ? 'Daftar' : 'Masuk'}
            </button>
          </form>

          {/* Divider */}
          <div className="relative mb-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-200"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-white text-[#747686] font-medium">atau</span>
            </div>
          </div>

          {/* Google Sign In */}
          <button
            onClick={handleGoogleSignIn}
            disabled={loading}
            className="w-full flex items-center justify-center gap-3 bg-white border-2 border-slate-200 text-[#121c2a] py-3 rounded-xl font-bold hover:bg-slate-50 transition-colors disabled:opacity-50"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>
            {loading ? 'Memuat...' : 'Masuk dengan Google'}
          </button>

          {/* Toggle Sign Up / Sign In */}
          <div className="mt-6 text-center">
            <button
              onClick={() => {
                setIsSignUp(!isSignUp);
                setError('');
              }}
              className="text-sm text-[#2650cf] font-semibold hover:underline"
            >
              {isSignUp
                ? 'Sudah punya akun? Masuk di sini'
                : 'Belum punya akun? Daftar di sini'}
            </button>
          </div>
        </div>

        {/* Guest Mode Button */}
        <button
          onClick={enterGuestMode}
          disabled={loading}
          className="w-full mt-4 flex items-center justify-center gap-2 bg-slate-50 border-2 border-slate-200 text-[#747686] py-3 rounded-xl font-bold hover:bg-slate-100 transition-colors disabled:opacity-50"
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
