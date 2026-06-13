import { createContext, useContext, useState, ReactNode } from 'react';
import { useUser, useClerk } from '@clerk/clerk-react';

interface AuthContextType {
  user: { id: string; email?: string } | null;
  loading: boolean;
  isGuest: boolean;
  enterGuestMode: () => void;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const { user, isLoaded } = useUser();
  const { signOut: clerkSignOut } = useClerk();
  const [isGuest, setIsGuest] = useState(() => localStorage.getItem('tipes_guest') === 'true');

  const enterGuestMode = () => {
    setIsGuest(true);
    localStorage.setItem('tipes_guest', 'true');
  };

  const signOut = async () => {
    setIsGuest(false);
    localStorage.removeItem('tipes_guest');
    await clerkSignOut();
  };

  // Map Clerk user to simple object
  const mappedUser = user ? {
    id: user.id,
    email: user.primaryEmailAddress?.emailAddress,
  } : null;

  // Clear guest mode when Clerk user signs in
  if (mappedUser && isGuest) {
    localStorage.removeItem('tipes_guest');
    setIsGuest(false);
  }

  return (
    <AuthContext.Provider value={{
      user: mappedUser,
      loading: !isLoaded,
      isGuest,
      enterGuestMode,
      signOut,
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
