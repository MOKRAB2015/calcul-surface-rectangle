
import React, { useState, useMemo, useEffect } from 'react';
import Header from './components/Header';
import GeminiAssistant from './components/GeminiAssistant';
import HistoryList from './components/HistoryList';
import { Unit, CalculationResult } from './types';
import { getSmartExplanation } from './services/geminiService';

const App: React.FC = () => {
  const [length, setLength] = useState<number>(10);
  const [width, setWidth] = useState<number>(5);
  const [unit, setUnit] = useState<Unit>(Unit.M);
  const [history, setHistory] = useState<CalculationResult[]>([]);
  const [explanation, setExplanation] = useState<string>('');
  const [isExplaining, setIsExplaining] = useState<boolean>(false);

  const area = useMemo(() => length * width, [length, width]);

  const handleCalculate = () => {
    const newResult: CalculationResult = {
      id: Math.random().toString(36).substr(2, 9),
      length,
      width,
      area,
      unit,
      timestamp: Date.now()
    };
    setHistory(prev => [newResult, ...prev].slice(0, 10));
  };

  const handleGetExplanation = async () => {
    setIsExplaining(true);
    const text = await getSmartExplanation(length, width, unit);
    setExplanation(text || '');
    setIsExplaining(false);
  };

  // Visual aspect ratio constraints
  const visualScale = useMemo(() => {
    const maxVal = Math.max(length, width);
    const scale = 200 / maxVal;
    return {
      w: width * scale,
      h: length * scale
    };
  }, [length, width]);

  return (
    <div className="min-h-screen flex flex-col pb-12">
      <Header />

      <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Column: Calculator Inputs */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm">
              <h2 className="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-2">
                Calculateur
              </h2>
              
              <div className="space-y-5">
                <div>
                  <label className="block text-sm font-semibold text-slate-500 mb-2 uppercase tracking-wider">Longueur (L)</label>
                  <div className="relative">
                    <input 
                      type="number" 
                      value={length}
                      onChange={(e) => setLength(Number(e.target.value))}
                      className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-4 text-xl font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all pr-16"
                    />
                    <span className="absolute right-5 top-1/2 -translate-y-1/2 font-medium text-slate-400">{unit}</span>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-500 mb-2 uppercase tracking-wider">Largeur (W)</label>
                  <div className="relative">
                    <input 
                      type="number" 
                      value={width}
                      onChange={(e) => setWidth(Number(e.target.value))}
                      className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-4 text-xl font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all pr-16"
                    />
                    <span className="absolute right-5 top-1/2 -translate-y-1/2 font-medium text-slate-400">{unit}</span>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-500 mb-2 uppercase tracking-wider">Unité de mesure</label>
                  <div className="flex gap-2">
                    {Object.values(Unit).map((u) => (
                      <button
                        key={u}
                        onClick={() => setUnit(u)}
                        className={`flex-1 py-3 rounded-xl text-sm font-bold transition-all ${
                          unit === u 
                            ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-200' 
                            : 'bg-white text-slate-600 border border-slate-200 hover:border-indigo-300'
                        }`}
                      >
                        {u}
                      </button>
                    ))}
                  </div>
                </div>

                <button 
                  onClick={handleCalculate}
                  className="w-full bg-slate-900 text-white py-4 rounded-2xl font-bold hover:bg-slate-800 transition-colors shadow-lg active:scale-95"
                >
                  Ajouter à l'historique
                </button>
              </div>
            </div>

            <HistoryList 
              history={history} 
              onClear={() => setHistory([])} 
            />
          </div>

          {/* Middle Column: Visualizer & Result */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm text-center">
              <p className="text-sm font-semibold text-slate-400 uppercase tracking-widest mb-2">Surface Totale</p>
              <div className="mb-8">
                <span className="text-6xl font-black text-indigo-600 tabular-nums">
                  {area.toLocaleString()}
                </span>
                <span className="text-2xl font-bold text-slate-400 ml-2">{unit}²</span>
              </div>

              <div className="relative h-64 bg-slate-50 rounded-2xl flex items-center justify-center border-2 border-dashed border-slate-200 overflow-hidden">
                <div 
                  className="bg-indigo-100 border-2 border-indigo-400 rounded-sm relative transition-all duration-300 shadow-xl"
                  style={{ 
                    width: `${visualScale.w}px`, 
                    height: `${visualScale.h}px`,
                    maxWidth: '90%',
                    maxHeight: '90%'
                  }}
                >
                  <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-xs font-bold text-indigo-500">{width}{unit}</div>
                  <div className="absolute top-1/2 -right-10 -translate-y-1/2 -rotate-90 text-xs font-bold text-indigo-500">{length}{unit}</div>
                  <div className="w-full h-full flex items-center justify-center">
                    <div className="text-indigo-400 text-opacity-40 font-bold select-none text-xs">
                      {area}{unit}²
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-8 border-t border-slate-100 text-left">
                <button 
                  onClick={handleGetExplanation}
                  className="text-sm text-indigo-600 font-semibold flex items-center gap-2 hover:underline"
                >
                  <i className="fa-solid fa-lightbulb"></i>
                  Comment est-ce calculé ?
                </button>
                {isExplaining && <div className="mt-2 text-xs text-slate-400 animate-pulse">L'IA réfléchit...</div>}
                {explanation && !isExplaining && (
                  <div className="mt-4 p-4 bg-indigo-50 rounded-xl text-sm text-indigo-700 border border-indigo-100 animate-in fade-in slide-in-from-top-2">
                    {explanation}
                  </div>
                )}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
                <div className="text-xs font-bold text-slate-400 mb-1 uppercase">Périmètre</div>
                <div className="text-2xl font-bold text-slate-800">{(2 * (length + width)).toLocaleString()} <span className="text-sm text-slate-400">{unit}</span></div>
              </div>
              <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
                <div className="text-xs font-bold text-slate-400 mb-1 uppercase">Diagonale</div>
                <div className="text-2xl font-bold text-slate-800">{Math.sqrt(length ** 2 + width ** 2).toFixed(2)} <span className="text-sm text-slate-400">{unit}</span></div>
              </div>
            </div>
          </div>

          {/* Right Column: AI Assistant */}
          <div className="lg:col-span-3 space-y-6">
            <GeminiAssistant />
            
            <div className="bg-slate-100 rounded-3xl p-6 border border-slate-200">
               <h4 className="font-bold text-slate-700 mb-4 text-sm uppercase">Le saviez-vous ?</h4>
               <p className="text-sm text-slate-600 italic">
                 "Le mot 'surface' vient du latin 'superficies', qui signifie littéralement 'la face de dessus'."
               </p>
               <div className="mt-4 flex gap-2">
                  <div className="w-2 h-2 rounded-full bg-indigo-400"></div>
                  <div className="w-2 h-2 rounded-full bg-violet-400"></div>
                  <div className="w-2 h-2 rounded-full bg-slate-300"></div>
               </div>
            </div>
          </div>

        </div>
      </main>

      <footer className="mt-auto pt-12 text-center text-slate-400 text-xs">
        <p>&copy; {new Date().getFullYear()} RectArea Pro - Calculateur de Géométrie Intelligent</p>
        <p className="mt-2">Propulsé par Google Gemini 3 Flash</p>
      </footer>
    </div>
  );
};

export default App;
