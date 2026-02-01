
import React, { useState } from 'react';
import { solveGeometryProblem } from '../services/geminiService';

const GeminiAssistant: React.FC = () => {
  const [input, setInput] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);

  const handleAsk = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    setLoading(true);
    const aiResponse = await solveGeometryProblem(input);
    setResponse(aiResponse || '');
    setLoading(false);
  };

  return (
    <div className="bg-indigo-900 rounded-2xl p-6 text-white shadow-xl shadow-indigo-200/50 border border-indigo-800">
      <div className="flex items-center gap-3 mb-4">
        <div className="bg-indigo-500/30 p-2 rounded-lg">
          <i className="fa-solid fa-wand-magic-sparkles text-indigo-200"></i>
        </div>
        <h3 className="font-bold text-lg">Assistant Intelligent</h3>
      </div>
      
      <p className="text-indigo-200 text-sm mb-4">
        Posez une question comme : "Ma chambre fait 4m sur 3m50, quelle est sa surface ?"
      </p>

      <form onSubmit={handleAsk} className="relative mb-6">
        <input 
          type="text" 
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Écrivez votre problème..."
          className="w-full bg-indigo-950 border border-indigo-700 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all pr-12 text-white placeholder-indigo-400"
        />
        <button 
          type="submit"
          disabled={loading}
          className="absolute right-2 top-1.5 bottom-1.5 px-3 bg-indigo-600 rounded-lg hover:bg-indigo-500 transition-colors disabled:opacity-50"
        >
          {loading ? (
            <i className="fa-solid fa-circle-notch animate-spin"></i>
          ) : (
            <i className="fa-solid fa-paper-plane"></i>
          )}
        </button>
      </form>

      {response && (
        <div className="bg-indigo-800/50 rounded-xl p-4 border border-indigo-700 animate-in fade-in slide-in-from-bottom-2 duration-300">
          <div className="prose prose-invert prose-sm max-w-none text-indigo-50">
             {response}
          </div>
        </div>
      )}
    </div>
  );
};

export default GeminiAssistant;
