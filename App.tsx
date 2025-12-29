
import React, { useState, useEffect } from 'react';
import MalfunctionForm from './components/MalfunctionForm';
import MalfunctionList from './components/MalfunctionList';
import Dashboard from './components/Dashboard';
import { Malfunction } from './types';

const App: React.FC = () => {
  const [malfunctions, setMalfunctions] = useState<Malfunction[]>([]);
  const [view, setView] = useState<'list' | 'dashboard'>('list');

  useEffect(() => {
    const saved = localStorage.getItem('bus_storingen');
    if (saved) {
      try {
        setMalfunctions(JSON.parse(saved));
      } catch (e) {
        console.error("Laden mislukt", e);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('bus_storingen', JSON.stringify(malfunctions));
  }, [malfunctions]);

  const handleAddMalfunction = (newM: Malfunction) => {
    setMalfunctions([newM, ...malfunctions]);
  };

  const clearAll = () => {
    if (confirm('Alle meldingen verwijderen?')) {
      setMalfunctions([]);
    }
  };

  return (
    <div className="min-h-screen pb-20">
      <header className="bg-white border-b border-slate-200 sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-4 py-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="bg-blue-600 p-2 rounded-lg shadow-lg shadow-blue-200">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <h1 className="text-xl font-bold text-slate-900 leading-tight">Bus Storingen</h1>
              <p className="text-xs text-slate-500 font-medium">Systeem voor chauffeurs</p>
            </div>
          </div>
          
          <nav className="flex bg-slate-100 p-1 rounded-lg">
            <button
              onClick={() => setView('list')}
              className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all ${
                view === 'list' ? 'bg-white shadow text-blue-600' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Overzicht
            </button>
            <button
              onClick={() => setView('dashboard')}
              className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all ${
                view === 'dashboard' ? 'bg-white shadow text-blue-600' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Grafieken
            </button>
          </nav>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 pt-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-4">
            <MalfunctionForm onAdd={handleAddMalfunction} />
            <div className="mt-8 p-4 bg-blue-50 rounded-xl border border-blue-100 hidden lg:block">
              <h4 className="text-sm font-bold text-blue-900 mb-2">💡 Info</h4>
              <p className="text-sm text-blue-700">
                Dit systeem werkt direct. Er is geen externe server of internet nodig om storingen te categoriseren.
              </p>
            </div>
          </div>

          <div className="lg:col-span-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-bold text-slate-800">
                {view === 'list' ? `Meldingen (${malfunctions.length})` : 'Statistieken'}
              </h2>
              {malfunctions.length > 0 && (
                <button 
                  onClick={clearAll}
                  className="text-sm text-red-500 hover:text-red-600 font-medium flex items-center gap-1 transition-colors"
                >
                  Alles wissen
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

      <footer className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 p-4 lg:hidden">
        <div className="flex justify-around items-center">
           <button onClick={() => setView('list')} className={`flex flex-col items-center gap-1 ${view === 'list' ? 'text-blue-600' : 'text-slate-400'}`}>
              <span className="text-xs font-bold">Lijst</span>
           </button>
           <button onClick={() => setView('dashboard')} className={`flex flex-col items-center gap-1 ${view === 'dashboard' ? 'text-blue-600' : 'text-slate-400'}`}>
              <span className="text-xs font-bold">Stats</span>
           </button>
        </div>
      </footer>
    </div>
  );
};

export default App;
