
import React from 'react';
import { Malfunction } from '../types';

interface MalfunctionListProps {
  malfunctions: Malfunction[];
}

const MalfunctionList: React.FC<MalfunctionListProps> = ({ malfunctions }) => {
  const getSeverityColor = (severity?: string) => {
    switch (severity) {
      case 'Kritiek': return 'bg-red-100 text-red-700 border-red-200';
      case 'Hoog': return 'bg-orange-100 text-orange-700 border-orange-200';
      case 'Gemiddeld': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'Laag': return 'bg-green-100 text-green-700 border-green-200';
      default: return 'bg-slate-100 text-slate-700 border-slate-200';
    }
  };

  if (malfunctions.length === 0) {
    return (
      <div className="bg-white rounded-xl border border-dashed border-slate-300 p-12 text-center">
        <p className="text-slate-500">Nog geen storingen gemeld.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {malfunctions.map((m) => (
        <div key={m.id} className="bg-white rounded-xl shadow-sm border border-slate-200 p-5 hover:border-blue-300 transition-colors">
          <div className="flex justify-between items-start mb-3">
            <div>
              <div className="flex items-center gap-3">
                <span className="text-lg font-bold text-slate-900">Bus {m.busNumber}</span>
                {m.aiAnalysis && (
                  <span className={`text-xs font-semibold px-2 py-1 rounded-full border ${getSeverityColor(m.aiAnalysis.severity)}`}>
                    {m.aiAnalysis.severity}
                  </span>
                )}
              </div>
              <p className="text-sm text-slate-500">
                Door: <span className="font-medium text-slate-700">{m.reporterName}</span> • {new Date(m.timestamp).toLocaleString('nl-NL')}
              </p>
            </div>
            <div className="text-right">
              {m.aiAnalysis?.category && (
                <span className="text-xs font-medium bg-blue-50 text-blue-600 px-2 py-1 rounded border border-blue-100">
                  {m.aiAnalysis.category}
                </span>
              )}
            </div>
          </div>
          
          <div className="bg-slate-50 rounded-lg p-3 mb-3 border border-slate-100">
            <p className="text-slate-700 text-sm whitespace-pre-wrap">{m.description}</p>
          </div>

          {m.aiAnalysis?.suggestion && (
            <div className="flex items-start gap-2 text-sm text-blue-800 bg-blue-50/50 p-2 rounded-lg border border-blue-100">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-500 shrink-0" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
              <span><strong>AI Suggestie:</strong> {m.aiAnalysis.suggestion}</span>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default MalfunctionList;
