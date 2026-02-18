import React, { createContext, useContext, useEffect, useState } from "react";
import { User, signInWithPopup, signOut, onAuthStateChanged } from "firebase/auth";
import { auth, googleProvider, facebookProvider, twitterProvider } from "@/config/firebase";
import { verifyToken as verifyTokenApi, getProviderProfile as getProviderProfileApi } from "@/utils/api";

type AuthContextValue = {
  user: User | null;
  loading: boolean;
  signInWithProvider: (provider: "google" | "facebook" | "twitter") => Promise<void>;
  signOutUser: () => Promise<void>;
  backendUser?: any;
  refreshBackendUser: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [backendUser, setBackendUser] = useState<any | undefined>(undefined);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => {
      setUser(u);
      setLoading(false);
      (async () => {
        try {
          if (!u) {
            setBackendUser(undefined);
            return;
          }
          const idToken = await auth.currentUser?.getIdToken();
          if (!idToken) return;
          const resp = await verifyTokenApi(idToken);
          if (resp?.user) setBackendUser(resp.user);
          const profileResp = await getProviderProfileApi(idToken);
          if (profileResp?.profile) setBackendUser((b: any) => ({ ...b, companyProfile: profileResp.profile }));
        } catch (e) {
          console.error("initial backend user fetch failed", e);
        }
      })();
    });
    return () => unsub();
  }, []);

  const refreshBackendUser = async () => {
    try {
      if (!auth.currentUser) return;
      const idToken = await auth.currentUser.getIdToken();
      const resp = await verifyTokenApi(idToken);
      if (resp?.user) {
        setBackendUser(resp.user);
      }
      // also try to fetch provider profile
      const profileResp = await getProviderProfileApi(idToken);
      if (profileResp?.profile) {
        setBackendUser((b: any) => ({ ...b, companyProfile: profileResp.profile }));
      }
    } catch (e) {
      console.error("refreshBackendUser failed", e);
    }
  };

  const signInWithProvider = async (provider: "google" | "facebook" | "twitter") => {
    setLoading(true);
    try {
      if (provider === "google") await signInWithPopup(auth, googleProvider);
      if (provider === "facebook") await signInWithPopup(auth, facebookProvider);
      if (provider === "twitter") await signInWithPopup(auth, twitterProvider);
      // after firebase sign in, verify with backend
      const idToken = await auth.currentUser?.getIdToken();
      if (idToken) {
        const resp = await verifyTokenApi(idToken);
        if (resp?.user) {
          setBackendUser(resp.user);
        }
      }
    } finally {
      setLoading(false);
    }
  };

  const signOutUser = async () => {
    await signOut(auth);
  };

  return (
    <AuthContext.Provider value={{ user, loading, signInWithProvider, signOutUser, backendUser, refreshBackendUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};

