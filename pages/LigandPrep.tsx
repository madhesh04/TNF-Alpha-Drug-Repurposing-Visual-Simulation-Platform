
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import MoleculeViewer from '../components/Visuals/MoleculeViewer';
import { MOCK_MOLECULES } from '../constants';
import { FlaskConical, Zap, Sparkles, Filter, Check, Loader2 } from 'lucide-react';

const LigandPrep: React.FC = () => {
  const [activeStep, setActiveStep] = useState(-1);
  const [processedSteps, setProcessedSteps] = useState<number[]>([]);
  const drug = MOCK_MOLECULES[0];

  const steps = [
    { id: 0, label: 'Desalting', icon: Filter, desc: 'Removing counter-ions and solvent remnants.' },
    { id: 1, label: 'Ionization', icon: Zap, desc: 'Calculating pKa and assigning protonation states at pH 7.4.' },
    { id: 2, label: 'Tautomer Gen', icon: FlaskConical, desc: 'Identifying the most stable structural isomers.' },
    { id: 3, label: 'Optimization', icon: Sparkles, desc: 'Final OPLS4 force field energy minimization.' }
  ];

  const runStep = (index: number) => {
    if (processedSteps.includes(index)) return;
    setActiveStep(index);
    setTimeout(() => {
      setProcessedSteps(prev => [...prev, index]);
      setActiveStep(-1);
    }, 2000);
  };

  const isComplete = processedSteps.length === steps.length;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 h-full">
      <div className="flex flex-col gap-6">
        <div className="space-y-2">
          <h2 className="text-3xl font-bold text-white flex items-center gap-3">
            Ligand Processing
            <FlaskConical className="text-cyan-400" />
          </h2>
          <p className="text-slate-400">Transforming 2D drug structures into optimized 3D conformers for docking.</p>
        </div>

        <div className="glass p-6 rounded-3xl border-cyan-500/20 bg-cyan-950/5">
          <div className="flex items-center gap-4 mb-6">
            <div className="p-3 bg-cyan-500/10 rounded-xl">
              <FlaskConical className="text-cyan-400" size={24} />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">{drug.name}</h3>
              <p className="text-xs font-mono text-cyan-600">SMILES: {drug.smiles}</p>
            </div>
          </div>

          <div className="grid gap-3">
            {steps.map((step, idx) => {
              const isDone = processedSteps.includes(idx);
              const isCurrent = activeStep === idx;
              
              return (
                <button
                  key={step.id}
                  onClick={() => runStep(idx)}
                  disabled={isDone || activeStep !== -1}
                  className={`relative group flex items-center justify-between p-4 rounded-xl border transition-all text-left overflow-hidden ${
                    isDone 
                    ? 'bg-emerald-500/10 border-emerald-500/30 cursor-default' 
                    : isCurrent 
                    ? 'bg-cyan-500/20 border-cyan-400 shadow-[0_0_15px_rgba(34,211,238,0.2)]'
                    : 'bg-slate-900/40 border-slate-800 hover:border-cyan-500/50'
                  }`}
                >
                  {isCurrent && (
                    <motion.div 
                      layoutId="scanner"
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-400/10 to-transparent w-full h-full"
                      animate={{ x: ['-100%', '100%'] }}
                      transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
                    />
                  )}
                  
                  <div className="flex items-center gap-4 z-10">
                    <div className={`p-2 rounded-lg ${isDone ? 'bg-emerald-500/20 text-emerald-400' : 'bg-slate-800 text-slate-400'}`}>
                      {isCurrent ? <Loader2 size={18} className="animate-spin text-cyan-400" /> : <step.icon size={18} />}
                    </div>
                    <div>
                      <h4 className={`text-sm font-bold ${isDone ? 'text-emerald-400' : 'text-slate-200'}`}>{step.label}</h4>
                      <p className="text-[10px] text-slate-500">{step.desc}</p>
                    </div>
                  </div>
                  {isDone && <Check size={16} className="text-emerald-400 z-10" />}
                </button>
              );
            })}
          </div>
        </div>

        <AnimatePresence>
          {isComplete && (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-6 glass border-emerald-500/30 rounded-2xl bg-emerald-500/5 flex items-center justify-between"
            >
              <div>
                <h3 className="text-lg font-bold text-emerald-400">Ligand Ready</h3>
                <p className="text-xs text-slate-400">3D Conformer optimized for {drug.name}.</p>
              </div>
              <Link 
                to="/docking"
                className="px-6 py-2 bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-bold rounded-lg transition-all shadow-lg"
              >
                Go to Docking
              </Link>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="glass rounded-3xl relative overflow-hidden flex flex-col min-h-[500px]">
        <div className="absolute top-4 right-4 z-10">
           <div className="text-[10px] font-mono text-cyan-500 bg-black/40 p-2 rounded-lg backdrop-blur">
             LIGAND_ID: {drug.id.toUpperCase()}<br/>
             FORM: PROTONATED (pH 7.4)
           </div>
        </div>
        
        {/* Molecule Animation Layer */}
        <div className="absolute inset-0 z-0">
          <MoleculeViewer 
            pdbId="1l7v" 
            style={isComplete ? 'stick' : 'sphere'} 
            color={activeStep !== -1 ? 'cyan' : 'spectrum'} 
          />
        </div>

        {activeStep !== -1 && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-10 flex items-center justify-center bg-cyan-900/10 pointer-events-none"
          >
            <div className="flex flex-col items-center gap-4">
               <div className="w-16 h-16 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin shadow-[0_0_20px_rgba(34,211,238,0.5)]" />
               <span className="text-cyan-400 font-mono text-xs font-bold tracking-[0.2em]">PROCESSING MOLECULE...</span>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default LigandPrep;
