
import React from 'react';
import { CalculationResult } from '../types';

interface HistoryListProps {
  history: CalculationResult[];
  onClear: () => void;
}

const HistoryList: React.FC<HistoryListProps> = ({ history, onClear }) => {
  if (history.length === 0) return null;

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden mt-6">
      <div className="p-4 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
        <h3 className="font-semibold text-slate-700 flex items-center gap-2">
          <i className="fa-solid fa-clock-rotate-left text-slate-400"></i>
          Historique récent
        </h3>
        <button 
          onClick={onClear}
          className="text-xs text-red-500 hover:text-red-600 font-medium transition-colors"
        >
          Effacer tout
        </button>
      </div>
      <div className="max-h-60 overflow-y-auto">
        {history.map((item) => (
          <div key={item.id} className="p-4 border-b border-slate-50 last:border-0 hover:bg-slate-50 transition-colors flex justify-between items-center">
            <div>
              <p className="text-sm font-medium text-slate-800">
                {item.length} x {item.width} {item.unit}
              </p>
              <p className="text-xs text-slate-400">
                {new Date(item.timestamp).toLocaleTimeString()}
              </p>
            </div>
            <div className="text-right">
              <p className="text-sm font-bold text-indigo-600">
                {item.area.toLocaleString()} {item.unit}²
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HistoryList;
