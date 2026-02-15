import React, { useState } from 'react';
import {
  LoginPage,
  OnboardingPage,
  DashboardPage,
  WorkstationPage
} from './pages';

export default function App(): JSX.Element {
  const [view, setView] = useState<'auth' | 'org' | 'dashboard' | 'workstation'>('auth');
  const [user, setUser] = useState<string | null>(null);

  const handleLogin = (name: string) => {
    setUser(name);
    setView('org');
  };

  return (
    <div className="w-full h-full font-sans selection:bg-[#EDE9FE] selection:text-[#6D28D9] flex flex-col bg-[#F8FAFC] text-[#111827]" style={{ minHeight: '100vh' }}>
      {view !== 'auth' && (
        <header className="sticky top-0 z-50 h-16 bg-[#1F0B3A] shadow-md flex items-center justify-between px-6">
          <div className="flex items-center gap-3 cursor-pointer hover:opacity-90 transition-opacity" onClick={() => setView('dashboard')}>
            <div className="w-8 h-8 bg-[#8B5CF6] rounded flex items-center justify-center shadow-lg shadow-[#8B5CF6]/30">
              {/* icon */}
            </div>
            <span className="font-bold tracking-tight text-white hidden md:block">BIDCRAFT AGENTIC AI</span>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden md:flex flex-col items-end">
              <span className="text-xs font-bold text-white">{user}</span>
              <span className="text-[10px] text-[#A78BFA] font-mono uppercase">Administrator</span>
            </div>
            <button onClick={() => setView('auth')} className="p-2 hover:bg-white/10 rounded-lg text-[#9CA3AF] hover:text-white transition-colors" title="Logout">
              Logout
            </button>
          </div>
        </header>
      )}

      <main className="flex-1 relative z-10 w-full flex flex-col overflow-y-auto">
        {view === 'auth' && <LoginPage onLogin={handleLogin} />}
        {view === 'org' && <OnboardingPage onNext={() => setView('dashboard')} />}
        {view === 'dashboard' && <DashboardPage onNew={() => setView('workstation')} />}
        {view === 'workstation' && <WorkstationPage onReset={() => setView('dashboard')} />}
      </main>
    </div>
  );
}

