import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, UserRole } from '@/types';
import { appState } from '../utils/mockData';
//import { appState } from '@/utils/mockData';

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string; user?: User; }>;
  signup: (userData: Partial<User> & { password: string }) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in (localStorage)
    const savedUser = localStorage.getItem('casalimpia_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
  // Simulación de login
  await new Promise(resolve => setTimeout(resolve, 500));

  const foundUser = Object.values(appState.users).find(u => u.email === email);
  
  if (!foundUser) {
    
    return { success: false, error: 'Usuario no encontrado' };
  }

  setUser(foundUser);
  localStorage.setItem('casalimpia_user', JSON.stringify(foundUser));
  return { success: true, user: foundUser };
};

  /*const login = async (email: string, password: string) => {
    // Simulación de login
    await new Promise(resolve => setTimeout(resolve, 500));

    const foundUser = Object.values(appState.users).find(u => u.email === email);
    
    if (!foundUser) {
      return { success: false, error: 'Usuario no encontrado' };
    }

    setUser(foundUser);
    localStorage.setItem('casalimpia_user', JSON.stringify(foundUser));
    return { success: true };
  }; */

  async function signup(userData: Partial<User> & { password: string; }) {
    // Simulación de registro
    await new Promise(resolve => setTimeout(resolve, 500));

    const { password, ...userDataWithoutPassword } = userData;

    // Verificar si el email ya existe
    const existingUser = Object.values(appState.users).find(u => u.email === userData.email);
    if (existingUser) {
      return { success: false, error: 'El correo ya está registrado' };
    }

    const newUser: User = {
      id: `${userData.role}-${Date.now()}`,
      email: userData.email || '',
      role: userData.role as UserRole,
      name: userData.name || '',
      phone: userData.phone || '',
      address: userData.address || '',
      comuna: userData.comuna || '',
      ...(userData.role === 'worker' && {
        businessName: userData.businessName,
        commercialName: userData.commercialName,
        taxAddress: userData.taxAddress,
        taxComuna: userData.taxComuna,
        taxEmail: userData.taxEmail
      })
    };

    appState.users[newUser.id] = newUser;
    setUser(newUser);
    localStorage.setItem('casalimpia_user', JSON.stringify(newUser));
    return { success: true };
  }

  const logout = () => {
    setUser(null);
    localStorage.removeItem('casalimpia_user');
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, isLoading }}>
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
