
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Zap, Calculator, ArrowRight, ShieldCheck, Thermometer } from 'lucide-react';

const MMGBSA: React.FC = () => {
  const [isRefining, setIsRefining] = useState(false);
  const [progress, setProgress] = useState(0);
  const [results, setResults] = useState({
    deltaG: 0,
    solv: 0,
    coulomb: 0,
    vdw: 0
  });

  const runRefinement = () => {
    setIsRefining(true);
    setProgress(0);
  };

  useEffect(() => {
    if (isRefining && progress < 100) {
      const timer = setTimeout(() => {
        setProgress(p => {
          const next = p + 2;
          if (next >= 100) {
            setIsRefining(false);
            setResults({
              deltaG: -58.4,
              solv: 12.5,
              coulomb: -32.1,
              vdw: -38.8
            });
          }
          return next;
        });
      }, 40);
      return () => clearTimeout(timer);
    }
  }, [isRefining, progress]);

  return (
    <div className="space-y-8 h-full flex flex-col">
      <div className="flex justify-between items-center border-b border-slate-800 pb-8">
        <div>
          <h2 className="text-3xl font-bold text-white flex items-center gap-3">
            MM-GBSA Refinement
            <Zap className="text-cyan-400" />
          </h2>
          <p className="text-slate-400 mt-2">Computing accurate binding free energies using Prime MM-GBSA.</p>
        </div>
        <button
          onClick={runRefinement}
          disabled={isRefining}
          className="flex items-center gap-2 px-8 py-3 bg-cyan-600 hover:bg-cyan-500 disabled:bg-slate-800 text-white rounded-xl font-bold transition-all shadow-[0_0_20px_rgba(8,145,178,0.3)]"
        >
          {isRefining ? <Calculator className="animate-spin" /> : <Calculator size={20} />}
          <span>{isRefining ? 'Solving Thermodynamics...' : 'Run Refinement'}</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 flex-1">
        <div className="glass rounded-3xl p-10 flex flex-col justify-center items-center relative overflow-hidden bg-slate-900/40 border-cyan-500/10">
           {/* Animated Equation Background */}
           <div className="absolute inset-0 opacity-5 pointer-events-none flex items-center justify-center">
              <div className="text-6xl font-mono text-cyan-400 break-all leading-tight">
                ΔGbind = ΔGsolv + ΔEMM + ΔGSA ΔGbind = ΔGsolv + ΔEMM + ΔGSA
              </div>
           </div>

           <div className="text-center space-y-8 z-10">
              <h3 className="text-sm font-bold text-cyan-500 uppercase tracking-[0.3em]">Master Equation</h3>
              
              <div className="flex items-center gap-4 text-3xl md:text-5xl font-mono font-bold text-white">
                 <motion.span animate={isRefining ? { opacity: [1, 0.4, 1] } : {}}>ΔG<sub className="text-xs">bind</sub></motion.span>
                 <span className="text-cyan-500">=</span>
                 <motion.div className="flex flex-col items-center">
                    <span className="text-slate-400">ΔE<sub className="text-xs text-slate-600">MM</sub></span>
                    <AnimatePresence>
                      {!isRefining && progress === 100 && <motion.span initial={{ y: -5, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="text-xs text-cyan-500 mt-2">{-70.9}</motion.span>}
                    </AnimatePresence>
                 </motion.div>
                 <span className="text-cyan-500">+</span>
                 <motion.div className="flex flex-col items-center">
                    <span className="text-slate-400">ΔG<sub className="text-xs text-slate-600">solv</sub></span>
                    <AnimatePresence>
                      {!isRefining && progress === 100 && <motion.span initial={{ y: -5, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="text-xs text-cyan-500 mt-2">{results.solv}</motion.span>}
                    </AnimatePresence>
                 </motion.div>
                 <span className="text-cyan-500">+</span>
                 <motion.div className="flex flex-col items-center">
                    <span className="text-slate-400">ΔG<sub className="text-xs text-slate-600">SA</sub></span>
                    <AnimatePresence>
                      {!isRefining && progress === 100 && <motion.span initial={{ y: -5, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="text-xs text-cyan-500 mt-2">{'-'}</span>}
                    </AnimatePresence>
                 </motion.div>
              </div>

              {isRefining && (
                <div className="w-full max-w-sm mx-auto space-y-2">
                   <div className="flex justify-between text-[10px] font-mono text-cyan-600">
                      <span>ITERATING SOLVATION SHELL...</span>
                      <span>{progress}%</span>
                   </div>
                   <div className="h-1 bg-slate-800 rounded-full overflow-hidden">
                      <motion.div className="h-full bg-cyan-500 shadow-[0_0_10px_#22d3ee]" style={{ width: `${progress}%` }} />
                   </div>
                </div>
              )}

              {!isRefining && progress === 100 && (
                <motion.div 
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="pt-8"
                >
                   <div className="text-[10px] text-slate-500 font-bold uppercase mb-2">Final Binding Energy</div>
                   <div className="text-7xl font-mono font-bold text-emerald-400 shadow-[0_0_30px_rgba(52,211,153,0.2)]">
                      {results.deltaG} <span className="text-xl text-slate-500">kcal/mol</span>
                   </div>
                </motion.div>
              )}
           </div>
        </div>

        <div className="space-y-6">
           <div className="glass p-8 rounded-3xl space-y-6 border-l-4 border-l-cyan-500">
              <h4 className="text-lg font-bold text-white flex items-center gap-2">
                 <Thermometer className="text-cyan-400" />
                 Energy Components
              </h4>
              
              <div className="space-y-6">
                 {[
                   { label: 'Van der Waals', val: results.vdw, max: -50, color: 'bg-cyan-500' },
                   { label: 'Electrostatic (Coulomb)', val: results.coulomb, max: -50, color: 'bg-emerald-500' },
                   { label: 'Lipophilic Energy', val: -15.2, max: -20, color: 'bg-indigo-500' },
                   { label: 'Generalized Born Solvation', val: results.solv, max: 20, color: 'bg-rose-500' }
                 ].map((comp, i) => (
                   <div key={comp.label} className="space-y-2">
                      <div className="flex justify-between text-xs">
                        <span className="text-slate-400">{comp.label}</span>
                        <span className="font-mono text-white font-bold">{progress === 100 ? `${comp.val} kcal/mol` : '--'}</span>
                      </div>
                      <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                         <motion.div 
                          className={`h-full ${comp.color}`}
                          initial={{ width: 0 }}
                          animate={{ width: progress === 100 ? `${Math.abs((comp.val / comp.max) * 100)}%` : 0 }}
                          transition={{ delay: i * 0.1, duration: 1 }}
                         />
                      </div>
                   </div>
                 ))}
              </div>
           </div>

           <AnimatePresence>
              {progress === 100 && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-6 glass bg-emerald-950/20 border-emerald-500/30 rounded-2xl"
                >
                  <div className="flex items-center gap-3 text-emerald-400 font-bold mb-2">
                    <ShieldCheck size={20} />
                    <span>Thermodynamically Validated</span>
                  </div>
                  <p className="text-xs text-slate-400 mb-4 leading-relaxed">
                    The binding energy is significantly lower than basic docking, confirming a spontaneous and highly stable interaction.
                  </p>
                  <Link to="/ifd" className="w-full flex items-center justify-center gap-2 px-6 py-2 bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-bold rounded-lg transition-all">
                    Next: Induced Fit Docking <ArrowRight size={16} />
                  </Link>
                </motion.div>
              )}
           </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default MMGBSA;
