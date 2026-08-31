'use client';

import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import {
  User,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  signOut,
  sendPasswordResetEmail,
  updateProfile,
  onAuthStateChanged,
  UserCredential,
} from 'firebase/auth';
import { auth, googleProvider } from './config';
import { trackEvent } from './analytics';
import { apiFetch } from '@/lib/api-client';
import { useCartStore } from '@/store/use-cart-store';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signInWithEmail: (email: string, password: string) => Promise<UserCredential>;
  signUpWithEmail: (email: string, password: string, displayName?: string) => Promise<UserCredential>;
  signInWithGoogle: () => Promise<UserCredential>;
  logout: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  getIdToken: () => Promise<string | null>;
  syncProfileToDb: (currUser: User, name?: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const syncProfileToDb = async (currUser: User, overrideName?: string) => {
    try {
      await apiFetch('/api/customers/sync', {
        method: 'POST',
        body: JSON.stringify({
          email: currUser.email,
          fullName: overrideName || currUser.displayName || currUser.email?.split('@')[0],
          avatarUrl: currUser.photoURL || null,
          phone: currUser.phoneNumber || null,
        }),
      });
    } catch (e) {
      console.warn('Database customer profile sync note:', e);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      setLoading(false);
      if (currentUser) {
        syncProfileToDb(currentUser);
        if (currentUser.email) {
          useCartStore.getState().setUserEmail(currentUser.email);
        }
      } else {
        useCartStore.getState().setUserEmail(null);
      }
    });

    return () => unsubscribe();
  }, []);

  const signInWithEmail = async (email: string, password: string) => {
    const res = await signInWithEmailAndPassword(auth, email, password);
    trackEvent('login', { method: 'email' });
    if (res.user) {
      syncProfileToDb(res.user);
      if (res.user.email) {
        useCartStore.getState().setUserEmail(res.user.email);
      }
    }
    return res;
  };

  const signUpWithEmail = async (email: string, password: string, displayName?: string) => {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    if (displayName && res.user) {
      await updateProfile(res.user, { displayName });
    }
    trackEvent('sign_up', { method: 'email' });
    if (res.user) {
      syncProfileToDb(res.user, displayName);
      if (res.user.email) {
        useCartStore.getState().setUserEmail(res.user.email);
      }
    }
    return res;
  };

  const signInWithGoogle = async () => {
    const res = await signInWithPopup(auth, googleProvider);
    trackEvent('login', { method: 'google' });
    if (res.user) {
      syncProfileToDb(res.user);
      if (res.user.email) {
        useCartStore.getState().setUserEmail(res.user.email);
      }
    }
    return res;
  };

  const logout = async () => {
    useCartStore.getState().setUserEmail(null);
    await signOut(auth);
    trackEvent('logout');
  };

  const resetPassword = async (email: string) => {
    await sendPasswordResetEmail(auth, email);
  };

  const getIdToken = async () => {
    if (!auth.currentUser) return null;
    return auth.currentUser.getIdToken();
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        signInWithEmail,
        signUpWithEmail,
        signInWithGoogle,
        logout,
        resetPassword,
        getIdToken,
        syncProfileToDb,
      }}
    >
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
