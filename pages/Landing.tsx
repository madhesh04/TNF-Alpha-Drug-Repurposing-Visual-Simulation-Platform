
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import MoleculeViewer from '../components/Visuals/MoleculeViewer';
import { ChevronRight, ArrowRight, PlayCircle } from 'lucide-react';

const Landing: React.FC = () => {
  return (
    <div className="relative min-h-screen bg-[#020617] overflow-hidden flex flex-col justify-center items-center px-4">
      {/* Background 3D Viewer */}
      <div className="absolute inset-0 z-0 opacity-40">
        <MoleculeViewer pdbId="2az5" className="h-full" style="surface" color="cyan" />
      </div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#020617]/40 via-transparent to-[#020617] z-1" />

      <motion.div 
        className="relative z-10 text-center max-w-4xl space-y-8"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-bold tracking-widest uppercase mb-4">
          <PlayCircle size={14} />
          Visual In-Silico Pipeline
        </div>
        
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-white leading-tight">
          TNF-Alpha Drug <br /> 
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-emerald-400">
            Repurposing Platform
          </span>
        </h1>
        
        <p className="text-slate-400 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
          Accelerating therapeutic discovery through advanced molecular simulation, 
          docking, and bioisosteric optimization for Tumor Necrosis Factor alpha.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <Link 
            to="/dashboard"
            className="group relative px-8 py-4 bg-cyan-600 hover:bg-cyan-500 text-white rounded-xl font-bold transition-all overflow-hidden flex items-center gap-2"
          >
            <span>Start Simulation</span>
            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
          </Link>
          <button className="px-8 py-4 glass text-white rounded-xl font-bold hover:bg-white/10 transition-all">
            Documentation
          </button>
        </div>
      </motion.div>

      {/* Footer Stats */}
      <div className="absolute bottom-12 left-0 right-0 z-10 hidden md:block">
        <div className="max-w-6xl mx-auto grid grid-cols-4 gap-8 px-8">
          {[
            { label: 'Target', val: 'TNF-Alpha' },
            { label: 'Library', val: 'FDA Approved' },
            { label: 'Precision', val: 'MM-GBSA' },
            { label: 'Dynamics', val: '100ns' }
          ].map((stat, i) => (
            <motion.div 
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 + (i * 0.1) }}
              className="flex flex-col items-center border-l border-slate-800/50 pl-6"
            >
              <span className="text-[10px] uppercase tracking-widest text-slate-500 font-bold mb-1">{stat.label}</span>
              <span className="text-xl font-mono text-cyan-400 font-bold">{stat.val}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Landing;
