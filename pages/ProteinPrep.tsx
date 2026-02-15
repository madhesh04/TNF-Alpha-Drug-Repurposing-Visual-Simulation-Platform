import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import MoleculeViewer from '../components/Visuals/MoleculeViewer';
import { Check, Loader2, Sparkles, Droplets, Zap, ShieldCheck, Activity, Info, X, Terminal, ArrowRight } from 'lucide-react';

const STEP_DETAILS = {
  removeWater: {
    title: "Desolvation Protocol",
    mechanism: "Removing Crystal Waters",
    description: "Crystallography often includes solvent molecules that aren't part of the biological active site. We strip these to prevent 'frozen' water artifacts from interfering with ligand binding predictions.",
    impact: "Reduces computational noise and prevents false-positive steric clashes during docking.",
    logs: [
      "Parsing PDB metadata for 2AZ5...",
      "Identifying HOH/WAT residues...",
      "Calculating solvent access surface...",
      "Deleting 412 non-catalytic molecules.",
      "Validating cavity integrity..."
    ]
  },
  addHydrogens: {
    title: "Hydrogen Mapping",
    mechanism: "Geometric Protonation",
    description: "X-ray diffraction patterns often miss Hydrogen atoms due to their low electron density. We use bond length/angle standard geometries to reconstruct the full atomic structure.",
    impact: "Essential for calculating Hydrogen bonding networks—the primary driver of drug-protein affinity.",
    logs: [
      "Identifying heavy atom coordinates...",
      "Assigning hybridization states...",
      "Predicting H-bond network...",
      "Mapping proton positions (pH 7.4)...",
      "Correcting valency..."
    ]
  },
  optimizePH: {
    title: "pH Equilibration",
    mechanism: "Protonation State Assignment",
    description: "Amino acids like Histidine change charge based on pH. We optimize the system for pH 7.4 (physiological blood pH) to reflect real-world human biochemistry.",
    impact: "Corrects the electrostatic surface potential of the binding pocket.",
    logs: [
      "Calculating residue pKa values...",
      "Analyzing Histidine tautomers...",
      "Assigning Asp/Glu charges...",
      "Optimizing network electrostatics...",
      "System neutralized @ pH 7.4."
    ]
  },
  minimize: {
    title: "Energy Minimization",
    mechanism: "Force Field Relaxation (OPLS4)",
    description: "Using computational physics, we adjust atomic positions to relieve 'steric clashes' (atoms being too close). We find the local energy minimum where the protein is most stable.",
    impact: "Prevents simulation 'explosions' and ensures a realistic starting geometry.",
    logs: [
      "Setting OPLS4 force field...",
      "Defining potential energy function...",
      "Steepest descent (Step 0-1000)...",
      "Conjugate gradient refinement...",
      "Convergence achieved (0.05 kcal/mol)."
    ]
  }
};

const ProteinPrep: React.FC = () => {
  const [tasks, setTasks] = useState({
    removeWater: false,
    addHydrogens: false,
    optimizePH: false,
    minimize: false
  });
  const [loading, setLoading] = useState<keyof typeof tasks | null>(null);
  const [showInsight, setShowInsight] = useState<keyof typeof tasks | null>(null);
  const [activeLogIndex, setActiveLogIndex] = useState(0);

  const toggleTask = (key: keyof typeof tasks) => {
    if (tasks[key] || loading) return;
    setLoading(key);
    setShowInsight(key);
    setActiveLogIndex(0);
    
    const duration = 4500;
    const logInterval = duration / (STEP_DETAILS[key].logs.length + 1);

    const logTimer = setInterval(() => {
      setActiveLogIndex(prev => prev + 1);
    }, logInterval);

    setTimeout(() => {
      clearInterval(logTimer);
      setTasks(prev => ({ ...prev, [key]: true }));
      setLoading(null);
      setTimeout(() => setShowInsight(null), 3000);
    }, duration);
  };

  const isAllDone = Object.values(tasks).every(v => v);

  const molProps = useMemo(() => {
    if (loading === 'minimize') return { style: 'stick' as const, color: 'cyan' };
    if (tasks.minimize) return { style: 'surface' as const, color: 'spectrum' };
    if (tasks.optimizePH) return { style: 'cartoon' as const, color: 'cyan' };
    return { style: 'cartoon' as const, color: 'spectrum' };
  }, [loading, tasks.minimize, tasks.optimizePH]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 h-full relative">
      <div className="glass rounded-3xl relative overflow-hidden flex flex-col min-h-[500px] border-slate-800 shadow-2xl">
        <div className="absolute top-4 left-4 z-20 flex flex-col gap-2">
          <span className="px-3 py-1 glass rounded-full text-[10px] font-bold text-cyan-400 border-cyan-500/30">PDB: 2AZ5 (TNF-ALPHA)</span>
          <span className="px-3 py-1 glass rounded-full text-[10px] font-bold text-slate-400 border-slate-700 uppercase tracking-widest">Ensemble: NVT</span>
        </div>
        
        <div className="relative flex-1">
          <MoleculeViewer style={molProps.style} color={molProps.color} />
          
          <AnimatePresence mode="wait">
            {loading === 'removeWater' && (
              <motion.div 
                key="water-anim"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 z-10 pointer-events-none flex items-center justify-center"
              >
                {[...Array(24)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-1.5 h-1.5 bg-blue-400 rounded-full"
                    initial={{ x: 0, y: 0, opacity: 1 }}
                    animate={{ 
                      x: (Math.random() - 0.5) * 600, 
                      y: (Math.random() - 0.5) * 600, 
                      opacity: 0,
                      scale: 0 
                    }}
                    transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.05 }}
                  />
                ))}
              </motion.div>
            )}

            {loading === 'minimize' && (
              <motion.div 
                key="minimize-anim"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 z-10 pointer-events-none flex items-center justify-center"
              >
                <motion.div
                   animate={{ scale: [1, 1.05, 1] }}
                   transition={{ duration: 0.2, repeat: Infinity }}
                   className="w-full h-full bg-emerald-500/5"
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        
        <div className="p-6 bg-slate-900/80 border-t border-slate-800 z-20 backdrop-blur-xl">
          <div className="flex justify-between items-center text-[10px] font-mono font-bold text-cyan-500 mb-2 uppercase tracking-widest">
            <span>Optimization Sequence</span>
            <span>{Object.values(tasks).filter(Boolean).length * 25}% COMPLETE</span>
          </div>
          <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
            <motion.div 
              className="h-full bg-cyan-500 shadow-[0_0_15px_rgba(34,211,238,0.8)]"
              initial={{ width: 0 }}
              animate={{ width: `${Object.values(tasks).filter(Boolean).length * 25}%` }}
            />
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-6 relative">
        <div className="space-y-2">
          <h2 className="text-3xl font-bold text-white flex items-center gap-3">
            Target Preparation
            <ShieldCheck className="text-cyan-400" />
          </h2>
          <p className="text-slate-400 text-sm">Convert raw crystal data into a physically valid 3D model.</p>
        </div>

        <div className="grid gap-3">
          {[
            { id: 'removeWater', label: 'Desolvation', icon: Droplets, desc: 'Strip experimental solvent artifacts.' },
            { id: 'addHydrogens', label: 'Protonation', icon: Sparkles, desc: 'Map missing Hydrogen coordinates.' },
            { id: 'optimizePH', label: 'pH Optimization', icon: Zap, desc: 'Assign states for physiological pH 7.4.' },
            { id: 'minimize', label: 'Minimization', icon: Activity, desc: 'Relieve high-energy steric clashes.' }
          ].map((item) => {
            const isDone = tasks[item.id as keyof typeof tasks];
            const isLoading = loading === item.id;
            
            return (
              <div key={item.id} className="relative">
                <button
                  onClick={() => toggleTask(item.id as keyof typeof tasks)}
                  disabled={isDone || !!loading}
                  className={`group w-full flex items-center justify-between p-5 rounded-2xl border transition-all text-left ${
                    isDone 
                    ? 'bg-emerald-500/5 border-emerald-500/30 cursor-default shadow-lg' 
                    : isLoading
                    ? 'bg-cyan-500/10 border-cyan-400 shadow-[0_0_20px_rgba(34,211,238,0.15)]'
                    : 'bg-slate-900/40 border-slate-800 hover:border-cyan-500/50 hover:bg-slate-900/60'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div className={`p-3 rounded-xl transition-colors ${
                      isDone ? 'bg-emerald-500/20 text-emerald-400' : 
                      isLoading ? 'bg-cyan-500/20 text-cyan-400' :
                      'bg-slate-800 text-slate-400 group-hover:text-cyan-400'
                    }`}>
                      {isLoading ? <Loader2 size={20} className="animate-spin" /> : <item.icon size={20} />}
                    </div>
                    <div>
                      <h4 className={`text-sm font-bold ${
                        isDone ? 'text-emerald-400' : 
                        isLoading ? 'text-cyan-400' :
                        'text-slate-200 group-hover:text-cyan-400'
                      }`}>{item.label}</h4>
                      <p className="text-xs text-slate-500">{item.desc}</p>
                    </div>
                  </div>
                  {isDone ? <Check size={18} className="text-emerald-400" /> : <Info size={14} className="text-slate-600 opacity-50" />}
                </button>

                <AnimatePresence>
                  {showInsight === item.id && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95, x: 20 }}
                      animate={{ opacity: 1, scale: 1, x: 0 }}
                      exit={{ opacity: 0, scale: 0.95, x: 20 }}
                      className="absolute left-full ml-4 top-0 w-[340px] z-50 glass p-6 rounded-3xl border-cyan-500/30 shadow-[0_20px_50px_rgba(0,0,0,0.5)] hidden xl:block bg-slate-950/90 backdrop-blur-xl"
                    >
                      <div className="flex justify-between items-start mb-4">
                        <div className="p-2 bg-cyan-500/10 rounded-lg">
                          <Terminal size={16} className="text-cyan-400" />
                        </div>
                        <button onClick={() => setShowInsight(null)} className="text-slate-500 hover:text-white transition-colors">
                          <X size={16} />
                        </button>
                      </div>

                      <h5 className="text-white font-bold text-sm mb-1">{STEP_DETAILS[item.id as keyof typeof STEP_DETAILS].title}</h5>
                      <div className="text-[10px] font-mono text-cyan-600 mb-4">{STEP_DETAILS[item.id as keyof typeof STEP_DETAILS].mechanism}</div>
                      
                      <div className="bg-black/60 rounded-xl p-4 border border-slate-800 mb-4 h-36 overflow-hidden flex flex-col">
                        <div className="text-[9px] text-slate-500 font-mono mb-2 uppercase tracking-tighter border-b border-slate-800 pb-1 flex justify-between">
                          <span>Execution Log</span>
                          <span className="text-cyan-500">Live_Stream</span>
                        </div>
                        <div className="space-y-1.5">
                          {STEP_DETAILS[item.id as keyof typeof STEP_DETAILS].logs.map((log, idx) => (
                            <motion.div 
                              key={idx}
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ 
                                opacity: idx <= activeLogIndex ? 1 : 0, 
                                x: idx <= activeLogIndex ? 0 : -10 
                              }}
                              className={`text-[11px] font-mono flex gap-2 ${idx === activeLogIndex ? 'text-cyan-400' : 'text-slate-500'}`}
                            >
                              <span className="text-slate-700">[{idx}]</span>
                              <span>{log}</span>
                              {idx === activeLogIndex && idx < STEP_DETAILS[item.id as keyof typeof STEP_DETAILS].logs.length && (
                                <motion.span 
                                  animate={{ opacity: [0, 1, 0] }} 
                                  transition={{ repeat: Infinity, duration: 0.5 }}
                                  className="inline-block w-1.5 h-3 bg-cyan-500 ml-1"
                                />
                              )}
                              {idx < activeLogIndex && <Check size={10} className="text-emerald-500 mt-0.5" />}
                            </motion.div>
                          ))}
                        </div>
                      </div>

                      <div className="space-y-4">
                        <p className="text-xs text-slate-400 leading-relaxed">
                          {STEP_DETAILS[item.id as keyof typeof STEP_DETAILS].description}
                        </p>
                        <div className="p-3 bg-emerald-500/5 rounded-xl border border-emerald-500/10">
                           <div className="text-[9px] font-bold text-emerald-500 uppercase mb-1 flex items-center gap-1">
                              <ShieldCheck size={10} />
                              Biological Importance
                           </div>
                           <p className="text-[10px] text-slate-300 italic leading-normal">
                              {STEP_DETAILS[item.id as keyof typeof STEP_DETAILS].impact}
                           </p>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        <AnimatePresence>
          {isAllDone && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-4 p-6 glass border-emerald-500/30 rounded-3xl bg-emerald-500/5 flex items-center justify-between shadow-xl"
            >
              <div>
                <h3 className="text-lg font-bold text-emerald-400 flex items-center gap-2">
                  <ShieldCheck size={20} />
                  Ready for Docking
                </h3>
                <p className="text-xs text-slate-400">Target 2AZ5 is optimized and structurally valid.</p>
              </div>
              <Link 
                to="/ligand-prep"
                className="group px-6 py-3 bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-bold rounded-xl transition-all flex items-center gap-2 shadow-lg"
              >
                Ligand Prep
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default ProteinPrep;