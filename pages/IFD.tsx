
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import MoleculeViewer from '../components/Visuals/MoleculeViewer';
import { Cpu, Zap, ArrowRight, Layers, Box, Check } from 'lucide-react';

const IFD: React.FC = () => {
  const [isSimulating, setIsSimulating] = useState(false);
  const [isDone, setIsDone] = useState(false);

  const startSimulation = () => {
    setIsSimulating(true);
    setIsDone(false);
    setTimeout(() => {
      setIsSimulating(false);
      setIsDone(true);
    }, 3000);
  };

  return (
    <div className="space-y-8 h-full flex flex-col">
      <div className="flex justify-between items-center border-b border-slate-800 pb-8">
        <div>
          <h2 className="text-3xl font-bold text-white flex items-center gap-3">
            Induced Fit Docking
            <Cpu className="text-cyan-400" />
          </h2>
          <p className="text-slate-400 mt-2">Modeling conformational changes in the binding pocket upon ligand binding.</p>
        </div>
        <button
          onClick={startSimulation}
          disabled={isSimulating}
          className="flex items-center gap-2 px-8 py-3 bg-cyan-600 hover:bg-cyan-500 disabled:bg-slate-800 text-white rounded-xl font-bold transition-all shadow-[0_0_20px_rgba(8,145,178,0.3)]"
        >
          {isSimulating ? <Cpu className="animate-spin" /> : <Box size={20} />}
          <span>{isSimulating ? 'Sampling Rotamers...' : 'Run IFD Protocol'}</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 flex-1">
        <div className="glass rounded-3xl relative overflow-hidden bg-slate-900/20 border-cyan-500/10 min-h-[400px]">
           <div className="absolute top-4 left-4 z-10 flex gap-2">
              <span className="px-3 py-1 glass rounded-full text-[10px] font-bold text-cyan-400">POCKET: FLEXIBLE</span>
              <span className="px-3 py-1 glass rounded-full text-[10px] font-bold text-slate-400">LIGAND: CONSTRAINED</span>
           </div>

           <MoleculeViewer 
            pdbId="2az5" 
            style={isSimulating ? 'stick' : 'surface'} 
            color={isSimulating ? 'spectrum' : 'cyan'} 
          />

           <AnimatePresence>
              {isSimulating && (
                <motion.div 
                  initial={{ opacity: 0 }} 
                  animate={{ opacity: 1 }} 
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 z-20 flex items-center justify-center bg-cyan-950/20 backdrop-blur-[1px]"
                >
                   <div className="flex flex-col items-center gap-4">
                      <div className="grid grid-cols-2 gap-2">
                        {[1, 2, 3, 4].map(i => (
                          <motion.div 
                            key={i}
                            animate={{ scale: [1, 1.2, 1], opacity: [0.3, 1, 0.3] }}
                            transition={{ duration: 1, delay: i * 0.2, repeat: Infinity }}
                            className="w-8 h-8 rounded-lg bg-cyan-400/20 border border-cyan-400/40"
                          />
                        ))}
                      </div>
                      <span className="text-[10px] font-mono text-cyan-400 font-bold uppercase tracking-widest">Optimizing side-chain χ angles...</span>
                   </div>
                </motion.div>
              )}
           </AnimatePresence>
        </div>

        <div className="space-y-6">
           <div className="glass p-8 rounded-3xl space-y-6 border-l-4 border-l-cyan-500">
              <h4 className="text-white font-bold flex items-center gap-2">
                 <Layers className="text-cyan-400" />
                 Refinement Stats
              </h4>
              
              <div className="space-y-4">
                 <div className="p-4 bg-slate-800/50 rounded-xl flex justify-between items-center border border-slate-700/50">
                    <span className="text-xs text-slate-400">Initial Glide Score</span>
                    <span className="text-xs font-mono text-white">-7.2</span>
                 </div>
                 <div className="p-4 bg-cyan-500/10 rounded-xl flex justify-between items-center border border-cyan-500/30">
                    <span className="text-xs text-cyan-400 font-bold">Induced Fit Score</span>
                    <span className={`text-sm font-mono font-bold ${isDone ? 'text-emerald-400' : 'text-slate-600'}`}>
                       {isDone ? '-1042.34' : '--'}
                    </span>
                 </div>
              </div>

              <div className="space-y-2">
                 <div className="flex justify-between text-[10px] text-slate-500 font-bold uppercase">Backbone Movement (RMSD)</div>
                 <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                    <motion.div 
                      className="h-full bg-cyan-500"
                      initial={{ width: 0 }}
                      animate={{ width: isDone ? '25%' : 0 }}
                    />
                 </div>
              </div>
           </div>

           <AnimatePresence>
              {isDone && (
                <motion.div 
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="p-6 glass bg-emerald-950/20 border-emerald-500/30 rounded-2xl"
                >
                  <div className="flex items-center gap-3 text-emerald-400 font-bold mb-2">
                    <Check size={20} />
                    <span>Conformational Fit Achieved</span>
                  </div>
                  <p className="text-xs text-slate-400 mb-6 leading-relaxed">
                    The binding pocket has successfully adapted to the ligand structure, revealing key hydrophobic interactions.
                  </p>
                  <Link to="/md-simulation" className="w-full flex items-center justify-center gap-2 px-6 py-2 bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-bold rounded-lg transition-all">
                    Final: MD Simulation <ArrowRight size={16} />
                  </Link>
                </motion.div>
              )}
           </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default IFD;
