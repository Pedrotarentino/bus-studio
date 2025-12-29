
import React, { useState, useEffect } from 'react';
import MalfunctionForm from './components/MalfunctionForm';
import MalfunctionList from './components/MalfunctionList';
import Dashboard from './components/Dashboard';
import { Malfunction } from './types';

const App: React.FC = () => {
  const [malfunctions, setMalfunctions] = useState<Malfunction[]>([]);
  const [view, setView] = useState<'list' | 'dashboard'>('list');

  // Load from local storage on mount
  useEffect(() => {
    const saved = localStorage.getItem('bus_storingen');
    if (saved) {
      try {
        setMalfunctions(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to load malfunctions", e);
      }
    }
  }, []);

  // Save to local storage on change
  useEffect(() => {
    localStorage.setItem('bus_storingen', JSON.stringify(malfunctions));
  }, [malfunctions]);

  const handleAddMalfunction = (newM: Malfunction) => {
    setMalfunctions([newM, ...malfunctions]);
  };

  const clearAll = () => {
    if (confirm('Weet je zeker dat je alle meldingen wilt wissen?')) {
      setMalfunctions([]);
    }
  };

  return (
    <div className="min-h-screen pb-20">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-4 py-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="bg-blue-600 p-2 rounded-lg shadow-lg shadow-blue-200">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
              </svg>
            </div>
            <div>
              <h1 className="text-xl font-bold text-slate-900 leading-tight">Bus Storingen Tracker</h1>
              <p className="text-xs text-slate-500 font-medium">Lijn- & Vlootbeheer</p>
            </div>
          </div>
          
          <nav className="flex bg-slate-100 p-1 rounded-lg">
            <button
              onClick={() => setView('list')}
              className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all ${
                view === 'list' ? 'bg-white shadow text-blue-600' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Meldingen
            </button>
            <button
              onClick={() => setView('dashboard')}
              className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all ${
                view === 'dashboard' ? 'bg-white shadow text-blue-600' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Dashboard
            </button>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-5xl mx-auto px-4 pt-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Sidebar / Form */}
          <div className="lg:col-span-4">
            <MalfunctionForm onAdd={handleAddMalfunction} />
            <div className="mt-8 p-4 bg-blue-50 rounded-xl border border-blue-100 hidden lg:block">
              <h4 className="text-sm font-bold text-blue-900 mb-2">💡 Tip</h4>
              <p className="text-sm text-blue-700">
                Onze AI analyseert je beschrijving automatisch om de monteur sneller op weg te helpen.
              </p>
            </div>
          </div>

          {/* Feed / Stats */}
          <div className="lg:col-span-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-bold text-slate-800">
                {view === 'list' ? `Recent Gemeld (${malfunctions.length})` : 'Statistieken Overzicht'}
              </h2>
              {malfunctions.length > 0 && (
                <button 
                  onClick={clearAll}
                  className="text-sm text-red-500 hover:text-red-600 font-medium flex items-center gap-1 transition-colors"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                  Lijst wissen
                </button>
              )}
            </div>

            {view === 'list' ? (
              <MalfunctionList malfunctions={malfunctions} />
            ) : (
              <Dashboard malfunctions={malfunctions} />
            )}
          </div>
        </div>
      </main>

      {/* Mobile Floating Action Button (Optional logic could go here) */}
      <footer className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 p-4 lg:hidden">
        <div className="flex justify-around items-center">
           <button onClick={() => setView('list')} className={`flex flex-col items-center gap-1 ${view === 'list' ? 'text-blue-600' : 'text-slate-400'}`}>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
              </svg>
              <span className="text-[10px] font-bold">Lijst</span>
           </button>
           <button onClick={() => setView('dashboard')} className={`flex flex-col items-center gap-1 ${view === 'dashboard' ? 'text-blue-600' : 'text-slate-400'}`}>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
              <span className="text-[10px] font-bold">Stats</span>
           </button>
        </div>
      </footer>
    </div>
  );
};

export default App;
