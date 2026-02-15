
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FlaskConical, ChevronRight } from 'lucide-react';

const Header: React.FC = () => {
  const location = useLocation();

  return (
    <header className="sticky top-0 z-50 glass h-16 border-b border-slate-800 px-6 flex items-center justify-between">
      <Link to="/" className="flex items-center gap-3 group">
        <div className="p-2 bg-cyan-500/10 rounded-lg group-hover:bg-cyan-500/20 transition-colors">
          <FlaskConical className="text-cyan-400" size={20} />
        </div>
        <div>
          <h1 className="text-sm font-bold tracking-tight text-slate-100 uppercase">TNF-Alpha</h1>
          <p className="text-[10px] text-cyan-500 font-mono tracking-widest uppercase">Repurposing Platform</p>
        </div>
      </Link>

      <nav className="flex items-center gap-1 text-xs text-slate-400 font-medium">
        <Link to="/dashboard" className="hover:text-cyan-400 transition-colors px-2 py-1">Dashboard</Link>
        <ChevronRight size={14} className="opacity-40" />
        <span className="text-slate-200 capitalize">
          {location.pathname.replace('/', '').replace('-', ' ')}
        </span>
      </nav>

      <div className="flex items-center gap-4">
        <div className="hidden md:flex flex-col items-end px-3 border-r border-slate-800">
          <span className="text-[10px] text-slate-500 uppercase font-bold">System Status</span>
          <span className="text-[10px] text-emerald-400 flex items-center gap-1 font-mono">
            <span className="block w-1 h-1 rounded-full bg-emerald-400 animate-pulse" />
            LIVE SIMULATION
          </span>
        </div>
        <button className="px-4 py-1.5 bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-bold rounded-lg transition-all">
          EXPORT DATA
        </button>
      </div>
    </header>
  );
};

export default Header;
