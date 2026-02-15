
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Repeat, ChevronRight, ArrowRight, Zap, Target, Activity, Check } from 'lucide-react';

const Bioisostere: React.FC = () => {
  const [swapped, setSwapped] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const performSwap = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setSwapped(true);
      setIsProcessing(false);
    }, 1500);
  };

  const reset = () => {
    setSwapped(false);
    setIsProcessing(false);
  };

  const metrics = [
    { label: 'Docking Score', before: -7.2, after: -9.4, unit: 'kcal/mol', icon: Target },
    { label: 'Oral Absorption', before: 95, after: 98, unit: '%', icon: Activity },
    { label: 'PSA', before: 64.6, after: 42.1, unit: 'Å²', icon: Zap }
  ];

  return (
    <div className="space-y-8 h-full flex flex-col">
      <div className="flex justify-between items-end border-b border-slate-800 pb-8">
        <div>
          <h2 className="text-3xl font-bold text-white flex items-center gap-3">
            Bioisosteric Replacement
            <Repeat className="text-cyan-400" />
          </h2>
          <p className="text-slate-400 mt-2">Optimizing lead compounds by swapping functional groups.</p>
        </div>
        {!swapped ? (
          <button
            onClick={performSwap}
            disabled={isProcessing}
            className="px-8 py-3 bg-cyan-600 hover:bg-cyan-500 disabled:bg-slate-800 text-white rounded-xl font-bold transition-all shadow-lg flex items-center gap-2"
          >
            {isProcessing ? <Activity className="animate-spin" /> : <Repeat size={20} />}
            <span>Swap Scaffold Group</span>
          </button>
        ) : (
          <button
            onClick={reset}
            className="px-8 py-3 glass text-slate-400 hover:text-white rounded-xl font-bold transition-all"
          >
            Reset Simulation
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 flex-1">
        <div className="glass rounded-3xl p-8 flex flex-col items-center justify-center relative bg-slate-900/40 border-cyan-500/10 min-h-[400px]">
           <div className="flex items-center gap-12">
              <div className="flex flex-col items-center gap-4">
                 <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Original Group</div>
                 <div className="w-32 h-32 rounded-full glass flex items-center justify-center border-2 border-slate-700 relative overflow-hidden">
                    <span className="text-4xl font-mono font-bold text-slate-400">-SH</span>
                    {swapped && (
                      <motion.div initial={{ opacity: 1 }} animate={{ opacity: 0 }} className="absolute inset-0 bg-rose-500/20" />
                    )}
                 </div>
                 <div className="text-xs text-slate-500">Thiol Group</div>
              </div>

              <div className="flex flex-col items-center justify-center">
                 <ArrowRight size={32} className={swapped ? 'text-emerald-400' : 'text-slate-700'} />
              </div>

              <div className="flex flex-col items-center gap-4">
                 <div className="text-[10px] font-bold text-cyan-500 uppercase tracking-widest">Bioisostere</div>
                 <div className="w-32 h-32 rounded-full glass flex items-center justify-center border-2 border-cyan-500 shadow-[0_0_20px_rgba(34,211,238,0.2)] relative overflow-hidden">
                    <AnimatePresence mode="wait">
                      {!swapped ? (
                         <motion.div key="q" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-4xl font-mono font-bold text-slate-700">?</motion.div>
                      ) : (
                         <motion.div 
                          key="o" 
                          initial={{ scale: 0.5, opacity: 0 }} 
                          animate={{ scale: 1, opacity: 1 }} 
                          className="text-4xl font-mono font-bold text-emerald-400"
                        >
                          -OH
                        </motion.div>
                      )}
                    </AnimatePresence>
                    {isProcessing && (
                      <motion.div className="absolute inset-0 bg-cyan-400/20" animate={{ x: ['-100%', '100%'] }} transition={{ duration: 0.5, repeat: Infinity }} />
                    )}
                 </div>
                 <div className="text-xs text-slate-500">{swapped ? 'Hydroxyl Group' : 'Scanning Database...'}</div>
              </div>
           </div>

           {swapped && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }} 
                animate={{ opacity: 1, y: 0 }}
                className="mt-12 p-4 glass rounded-xl border-emerald-500/30 bg-emerald-500/5 text-center max-w-sm"
              >
                <p className="text-xs text-slate-300 leading-relaxed">
                  Scaffold optimization successful. Oxygen replacement enhances hydrogen bonding capacity while reducing metabolic susceptibility.
                </p>
              </motion.div>
           )}
        </div>

        <div className="space-y-6">
           <div className="glass p-8 rounded-3xl space-y-8 border-l-4 border-l-cyan-500">
              <h4 className="text-lg font-bold text-white uppercase tracking-widest text-sm">Property Comparison</h4>
              
              <div className="space-y-8">
                 {metrics.map((m, i) => (
                   <div key={m.label} className="flex items-center gap-6">
                      <div className="p-3 bg-slate-800 rounded-xl">
                         <m.icon size={20} className="text-slate-400" />
                      </div>
                      <div className="flex-1 space-y-2">
                         <div className="flex justify-between items-center text-xs">
                            <span className="text-slate-400 font-bold">{m.label}</span>
                            <div className="flex items-center gap-3">
                               <span className="text-slate-500">{m.before}</span>
                               <ChevronRight size={12} className="text-slate-700" />
                               <span className={`font-mono font-bold ${swapped ? 'text-emerald-400' : 'text-slate-600'}`}>
                                 {swapped ? m.after : '--'}
                               </span>
                               <span className="text-[10px] text-slate-600">{m.unit}</span>
                            </div>
                         </div>
                         <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden flex">
                            <motion.div 
                              className="h-full bg-slate-600" 
                              initial={{ width: '40%' }} 
                              animate={{ width: swapped ? '30%' : '40%' }}
                            />
                            {swapped && (
                               <motion.div 
                                initial={{ width: 0 }} 
                                animate={{ width: '25%' }} 
                                className="h-full bg-emerald-500 shadow-[0_0_10px_#10b981]"
                              />
                            )}
                         </div>
                      </div>
                   </div>
                 ))}
              </div>
           </div>

           <AnimatePresence>
             {swapped && (
               <motion.div 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="p-6 glass border-emerald-500/30 rounded-2xl bg-emerald-500/5 flex items-center justify-between"
               >
                 <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-emerald-500 flex items-center justify-center text-white">
                       <Check size={20} />
                    </div>
                    <div>
                       <h3 className="font-bold text-emerald-400">Optimization Complete</h3>
                       <p className="text-xs text-slate-500">Proceed to Final Drug Report</p>
                    </div>
                 </div>
                 <Link to="/report" className="px-6 py-2 bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-bold rounded-lg transition-all">
                    Generate PDF
                 </Link>
               </motion.div>
             )}
           </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default Bioisostere;
