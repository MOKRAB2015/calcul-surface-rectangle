
import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center gap-2">
            <div className="bg-indigo-600 p-2 rounded-lg">
              <i className="fa-solid fa-vector-square text-white text-xl"></i>
            </div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">
              RectArea
            </h1>
          </div>
          <nav className="hidden md:flex gap-6">
            <a href="#" className="text-slate-600 hover:text-indigo-600 font-medium transition-colors">Calculateur</a>
            <a href="#" className="text-slate-600 hover:text-indigo-600 font-medium transition-colors">Aide IA</a>
            <a href="#" className="text-slate-600 hover:text-indigo-600 font-medium transition-colors">Historique</a>
          </nav>
          <div className="flex items-center gap-3">
             <span className="text-xs font-semibold px-2 py-1 bg-indigo-50 text-indigo-600 rounded-full border border-indigo-100 uppercase">
               Premium AI
             </span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
