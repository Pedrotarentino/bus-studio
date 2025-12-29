
import React, { useState } from 'react';
import { Malfunction } from '../types';
import { localAnalyzeMalfunction } from '../services/geminiService';

interface MalfunctionFormProps {
  onAdd: (malfunction: Malfunction) => void;
}

const MalfunctionForm: React.FC<MalfunctionFormProps> = ({ onAdd }) => {
  const [name, setName] = useState('');
  const [busNumber, setBusNumber] = useState('');
  const [description, setDescription] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !busNumber || !description) return;

    setIsSubmitting(true);
    
    // Automatische Analyse (Nu volledig lokaal, geen API nodig)
    const analysis = localAnalyzeMalfunction(description);

    const newMalfunction: Malfunction = {
      id: crypto.randomUUID(),
      timestamp: new Date().toISOString(),
      reporterName: name,
      busNumber: busNumber,
      description: description,
      aiAnalysis: analysis
    };

    // Korte vertraging voor een soepele UI ervaring
    setTimeout(() => {
      onAdd(newMalfunction);
      setBusNumber('');
      setDescription('');
      setIsSubmitting(false);
    }, 300);
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
      <h2 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
        Storing Melden
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Naam Collega</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
            placeholder="Jouw naam"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Busnummer</label>
          <input
            type="text"
            value={busNumber}
            onChange={(e) => setBusNumber(e.target.value)}
            className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
            placeholder="Bijv. 1234"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Omschrijving</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all h-32"
            placeholder="Wat is er aan de hand?"
            required
          />
        </div>
        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full py-3 px-4 rounded-lg font-semibold text-white transition-all flex items-center justify-center gap-2 ${
            isSubmitting ? 'bg-slate-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700 shadow-lg shadow-blue-200'
          }`}
        >
          {isSubmitting ? 'Bezig...' : 'Verstuur Melding'}
        </button>
      </form>
    </div>
  );
};

export default MalfunctionForm;
