
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import MoleculeViewer from '../components/Visuals/MoleculeViewer';
import { MOCK_MOLECULES } from '../constants';
// Added Zap to imports
import { Target, Activity, ChevronRight, Play, RefreshCw, Layers, Info, X, Cpu, Search, Zap } from 'lucide-react';

const DOCKING_INSIGHTS = {
  grid: {
    title: "Search Space Definition",
    mechanism: "Grid Box Calculation",
    description: "We define a 3D bounding box (20Å³) around the TNF-alpha dimer interface. This 'search space' limits the computation to the known biological active site.",
    impact: "Optimizes calculation speed by ignoring non-productive protein surface areas."
  },
  sampling: {
    title: "Conformational Sampling",
    mechanism: "Lamarckian Genetic Algorithm",
    description: "The ligand isn't static; it has rotatable bonds. The algorithm 'evolves' thousands of possible poses, rotating and translating the drug to find the best fit.",
    impact: "Ensures we find the 'global minimum'—the most natural binding orientation."
  },
  scoring: {
    title: "Binding Affinity (ΔG)",
    mechanism: "Empirical Scoring Function",
    description: "For every pose, we calculate the energy based on Hydrogen bonds, Van der Waals forces, and hydrophobic interactions.",
    impact: "A lower (more negative) score indicates a stronger, more stable drug-target interaction."
  }
};

const Docking: React.FC = () => {
  const [isDocking, setIsDocking] = useState(false);
  const [progress, setProgress] = useState(0);
  const [dockingScore, setDockingScore] = useState(0);
  const [isDone, setIsDone] = useState(false);
  const [showInsight, setShowInsight] = useState<keyof typeof DOCKING_INSIGHTS | null>(null);
  
  const drug = MOCK_MOLECULES[1]; // Use Infliximab-analog for better score

  const startDocking = () => {
    setIsDocking(true);
    setIsDone(false);
    setProgress(0);
    setDockingScore(0);
    setShowInsight('sampling');
  };

  useEffect(() => {
    let interval: any;
    if (isDocking && progress < 100) {
      interval = setInterval(() => {
        setProgress(p => {
          const next = p + 1;
          if (next >= 100) {
            setIsDocking(false);
            setIsDone(true);
            setDockingScore(drug.dockingScore);
            setTimeout(() => setShowInsight(null), 3000);
            return 100;
          }
          // Dynamic scoring effect showing the "search"
          if (next % 5 === 0) {
            setDockingScore(parseFloat((Math.random() * -5 - 2).toFixed(1)));
          }
          return next;
        });
      }, 60);
    }
    return () => clearInterval(interval);
  }, [isDocking, progress, drug.dockingScore]);

  return (
    <div className="space-y-8 h-full flex flex-col relative">
      <div className="flex justify-between items-end border-b border-slate-800 pb-8">
        <div>
          <h2 className="text-3xl font-bold text-white flex items-center gap-3">
            Molecular Docking
            <Target className="text-cyan-400" />
          </h2>
          <p className="text-slate-400 mt-2">Predicting the binding affinity of {drug.name} within TNF-alpha dimer interface.</p>
        </div>
        <div className="flex gap-4">
           {isDone && (
              <button onClick={startDocking} className="p-3 glass rounded-xl text-slate-400 hover:text-cyan-400 transition-colors border-slate-800">
                <RefreshCw size={20} />
              </button>
           )}
           <button
            onClick={startDocking}
            disabled={isDocking}
            className="group relative px-8 py-3 bg-cyan-600 hover:bg-cyan-500 disabled:bg-slate-800 text-white rounded-xl font-bold transition-all flex items-center gap-2 overflow-hidden shadow-[0_0_25px_rgba(8,145,178,0.4)]"
          >
            {isDocking ? (
               <>
                <Loader2 size={20} className="animate-spin" />
                <span>SAMPLING POSES...</span>
               </>
            ) : (
               <>
                <Play size={20} />
                <span>RUN DOCKING</span>
               </>
            )}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 flex-1 min-h-0">
        {/* Visualization area */}
        <div className="lg:col-span-2 glass rounded-3xl relative overflow-hidden bg-slate-900/20 border-slate-800 shadow-inner">
          <div className="absolute inset-0 z-0">
               <MoleculeViewer 
                pdbId="2az5" 
                style="cartoon" 
                color={isDocking ? 'cyan' : isDone ? 'spectrum' : 'slate'} 
              />
          </div>

          {/* Docking Animation Overlay */}
          <AnimatePresence>
            {isDocking && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 z-20 pointer-events-none"
              >
                {/* Search Grid Visualization */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <motion.div 
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 0.2 }}
                    className="w-[300px] h-[300px] border-2 border-dashed border-cyan-400 rounded-lg flex items-center justify-center"
                  >
                    <div className="w-full h-[1px] bg-cyan-400/30 absolute" />
                    <div className="h-full w-[1px] bg-cyan-400/30 absolute" />
                  </motion.div>
                </div>

                {/* Sampling Particles (Ligand conformers) */}
                {[...Array(8)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute left-1/2 top-1/2 w-3 h-3 bg-cyan-400/40 rounded-full blur-[2px]"
                    animate={{
                      x: [
                        (Math.random() - 0.5) * 400,
                        (Math.random() - 0.5) * 100,
                        (Math.random() - 0.5) * 50,
                        0
                      ],
                      y: [
                        (Math.random() - 0.5) * 400,
                        (Math.random() - 0.5) * 100,
                        (Math.random() - 0.5) * 50,
                        0
                      ],
                      scale: [2, 1, 1.5, 1],
                      opacity: [0, 0.8, 0.4, 0]
                    }}
                    transition={{
                      duration: 2.5,
                      repeat: Infinity,
                      delay: i * 0.3,
                      ease: "easeInOut"
                    }}
                  />
                ))}

                {/* Primary Guided Ligand Path */}
                <motion.div
                  className="absolute left-1/2 top-1/2 z-30"
                  initial={{ x: -300, y: -200, opacity: 0, scale: 3 }}
                  animate={{ 
                    x: [-300, -150, -50, 0], 
                    y: [-200, -50, 20, 0],
                    opacity: [0, 1, 1, 1],
                    scale: [3, 2, 1, 1],
                    rotate: [0, 90, 180, 360]
                  }}
                  transition={{ duration: 4, repeat: Infinity, ease: "circOut" }}
                >
                  <div className="relative">
                    <div className="w-6 h-6 bg-cyan-500 rounded-full shadow-[0_0_30px_#22d3ee] flex items-center justify-center">
                      <Zap size={14} className="text-white animate-pulse" />
                    </div>
                    {/* Trailing path */}
                    <motion.div 
                      className="absolute top-1/2 left-1/2 h-1 bg-gradient-to-l from-cyan-500/50 to-transparent origin-left"
                      style={{ width: 100, rotate: 180, x: -100 }}
                    />
                  </div>
                </motion.div>
                
                <div className="absolute bottom-32 left-1/2 -translate-x-1/2 px-4 py-2 bg-black/60 backdrop-blur rounded-full border border-cyan-500/30 text-cyan-400 font-mono text-[10px] tracking-widest flex items-center gap-2">
                  <Search size={12} className="animate-pulse" />
                  EXPLORING CONFORMATIONAL SPACE
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Hud Overlay */}
          <div className="absolute bottom-6 left-6 right-6 z-30">
             <div className="flex justify-between items-end mb-4">
                <div className="space-y-4">
                   <div className="flex gap-2">
                      <button 
                        onClick={() => setShowInsight('grid')}
                        className="p-2 glass rounded-lg text-slate-400 hover:text-cyan-400 transition-colors"
                      >
                        <Info size={14} />
                      </button>
                      <div className="text-[10px] text-cyan-500 font-mono font-bold uppercase tracking-widest flex items-center gap-2">
                        {isDocking ? 'Search Active' : isDone ? 'Search Complete' : 'Awaiting Grid'}
                      </div>
                   </div>
                   <div className="h-1.5 w-64 bg-slate-800 rounded-full overflow-hidden border border-slate-700">
                      <motion.div 
                        className="h-full bg-cyan-400 shadow-[0_0_10px_#22d3ee]"
                        animate={{ width: `${progress}%` }}
                      />
                   </div>
                </div>
                <div className="text-right glass p-4 rounded-2xl border-slate-800 bg-black/40 backdrop-blur">
                   <div className="text-[10px] text-slate-500 font-bold uppercase tracking-wider mb-1">Estimated ΔG_bind</div>
                   <div className={`text-4xl font-mono font-bold transition-colors ${isDone ? 'text-emerald-400' : 'text-cyan-400'}`}>
                      {dockingScore.toFixed(1)} <span className="text-sm font-normal text-slate-500">kcal/mol</span>
                   </div>
                </div>
             </div>
          </div>
        </div>

        {/* Info Column */}
        <div className="space-y-6 relative">
          {/* Interaction Residues */}
          <div className="glass p-6 rounded-3xl border-l-4 border-l-cyan-500 bg-cyan-950/5">
             <h4 className="text-white font-bold mb-4 flex items-center gap-2">
                <Layers size={18} className="text-cyan-400" />
                Binding Pocket residues
             </h4>
             <div className="grid grid-cols-2 gap-2">
                {['LEU94', 'GLY121', 'TYR119', 'TYR151', 'ILE97', 'VAL123'].map(res => (
                  <div key={res} className="px-3 py-2 bg-slate-800/50 rounded-lg text-[10px] font-mono text-slate-300 border border-slate-700/50 flex justify-between">
                    <span>{res}</span>
                    <span className="text-cyan-600 opacity-50">#A</span>
                  </div>
                ))}
             </div>
          </div>

          {/* Insights Popups for Docking */}
          <AnimatePresence>
            {showInsight && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="glass p-5 rounded-2xl border-cyan-500/30 bg-cyan-950/20 shadow-xl"
              >
                <div className="flex justify-between items-start mb-2">
                  <div className="text-[10px] font-bold text-cyan-500 uppercase">Docking Insight</div>
                  <button onClick={() => setShowInsight(null)} className="text-slate-500 hover:text-white"><X size={14} /></button>
                </div>
                <h5 className="text-white font-bold text-sm mb-1">{DOCKING_INSIGHTS[showInsight].title}</h5>
                <p className="text-[11px] text-slate-400 leading-relaxed mb-3">
                  {DOCKING_INSIGHTS[showInsight].description}
                </p>
                <div className="text-[10px] text-emerald-400 italic">
                  Impact: {DOCKING_INSIGHTS[showInsight].impact}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="glass p-6 rounded-3xl bg-slate-900/40 border-slate-800">
             <h4 className="text-[10px] font-bold text-slate-500 uppercase mb-4 tracking-widest">Post-Docking Status</h4>
             <div className="space-y-3">
                <div className="flex items-center justify-between text-xs">
                   <span className="text-slate-400">Total Conformations</span>
                   <span className="text-white font-mono">{isDone ? '25,000' : '--'}</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                   <span className="text-slate-400">Search Efficiency</span>
                   <span className="text-white font-mono">{isDone ? '99.4%' : '--'}</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                   <span className="text-slate-400">RMSD Diversity</span>
                   <span className="text-white font-mono">{isDone ? '2.4Å' : '--'}</span>
                </div>
             </div>
          </div>

          <AnimatePresence>
            {isDone && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="p-6 glass border-emerald-500/30 rounded-2xl bg-emerald-500/5 shadow-lg"
              >
                <div className="flex items-center gap-3 text-emerald-400 font-bold mb-2">
                   <ShieldCheck size={20} />
                   <span>Docking Validated</span>
                </div>
                <p className="text-[11px] text-slate-400 mb-5 leading-relaxed">
                  Excellent binding pocket complementarity detected. Proceed to ADMET to verify pharmacological safety and bioavailability.
                </p>
                <Link to="/admet" className="w-full group flex items-center justify-center gap-2 px-4 py-3 bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-bold rounded-xl transition-all shadow-xl">
                  Analyze ADMET Profile <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </Link>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

// Fixed local SVG components
const Loader2 = ({ size, className }: { size: number, className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M21 12a9 9 0 1 1-6.219-8.56"/>
  </svg>
);

const ShieldCheck = ({ size, className }: { size: number, className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10"/><path d="m9 12 2 2 4-4"/>
  </svg>
);

export default Docking;
