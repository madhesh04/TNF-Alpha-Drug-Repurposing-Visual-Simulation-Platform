import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { WORKFLOW_STEPS, getIcon } from '../constants';
import { ArrowRight, Activity, Network, Terminal } from 'lucide-react';

const Dashboard: React.FC = () => {
  const completionPercentage = 0;

  return (
    <div className="space-y-12">
      {/* High-Tech Terminal Header */}
      <section className="relative glass p-10 md:p-14 rounded-[3rem] overflow-hidden border-slate-800 bg-[#020617] shadow-2xl min-h-[480px] flex items-center">
        <div className="absolute top-0 right-0 p-16 opacity-[0.03] pointer-events-none select-none">
          <Network size={500} className="text-cyan-400 rotate-12" />
        </div>
        
        <div className="relative z-10 grid grid-cols-1 xl:grid-cols-12 gap-12 items-center w-full">
          <div className="xl:col-span-8 space-y-8">
            <div className="inline-flex items-center gap-3 px-3 py-1 rounded-md bg-cyan-500/10 border-l-2 border-cyan-500 text-cyan-400 text-[10px] font-black tracking-[0.4em] uppercase">
              Operational Mode // Pipeline_Alpha
            </div>
            
            <div className="space-y-4">
              <h1 className="text-6xl md:text-8xl font-black text-white tracking-tighter leading-none uppercase">
                TNF-Alpha <br />
                <span className="text-cyan-500 opacity-90 font-light">Repurposing</span>
              </h1>
              <p className="text-slate-400 text-lg md:text-xl max-w-2xl leading-relaxed font-light italic">
                Cross-validated structural bioinformatics engine for cytokine inhibition mapping.
              </p>
            </div>
            
            <div className="flex flex-wrap gap-6 pt-2">
              <div className="bg-slate-900/40 border border-slate-800 p-6 rounded-2xl min-w-[280px] backdrop-blur-md shadow-xl border-t-cyan-500/20">
                <div className="text-[10px] text-slate-500 font-bold uppercase mb-3 tracking-[0.2em] flex items-center gap-2">
                  <Activity size={12} className="text-cyan-600" />
                  Computational Progress
                </div>
                <div className="flex items-center gap-5">
                  <span className="text-4xl font-mono font-bold text-white tracking-tighter">{completionPercentage}%</span>
                  <div className="flex-1 h-1 bg-slate-800 rounded-full overflow-hidden">
                    <motion.div 
                      className="h-full bg-cyan-500"
                      initial={{ width: 0 }}
                      animate={{ width: `${completionPercentage}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="xl:col-span-4">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="p-8 bg-slate-900/20 border border-slate-800 rounded-[2.5rem] shadow-2xl backdrop-blur-xl relative group overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-cyan-500/40 to-transparent" />
              <h4 className="text-cyan-400 font-bold text-xs mb-4 uppercase tracking-[0.4em] flex items-center gap-2">
                <Terminal size={14} />
                Next Action
              </h4>
              <p className="text-sm text-slate-300 mb-8 leading-relaxed font-light">
                Resolve the TNF-alpha dimer interface crystallography artifacts before starting ligand library screening.
              </p>
              <Link 
                to="/protein-prep" 
                className="w-full flex items-center justify-center gap-3 px-8 py-4 bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-black rounded-xl transition-all shadow-[0_10px_30px_rgba(8,145,178,0.3)]"
              >
                START PHASE 01 <ArrowRight size={18} />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* "Cyber-Lab HUD" Grid - Full Width Coverage */}
      <div className="space-y-10">
        <div className="flex items-center gap-6 px-2">
          <div className="w-1 h-8 bg-slate-800 rounded-full" />
          <h3 className="text-xs font-black text-slate-500 uppercase tracking-[0.6em]">Laboratory Modules</h3>
          <div className="flex-1 h-px bg-slate-900" />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {WORKFLOW_STEPS.map((step, index) => (
            <motion.div
              key={step.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.04 }}
            >
              <Link 
                to={step.route}
                className="group relative flex flex-col h-full bg-[#0a1120] border border-slate-800 rounded-2xl overflow-hidden hover:border-cyan-500/40 hover:bg-[#0c162b] transition-all shadow-xl"
              >
                {/* HUD Header Tag */}
                <div className="absolute top-0 right-0 px-4 py-1 bg-slate-900 border-l border-b border-slate-800 rounded-bl-xl text-[8px] font-mono font-bold text-slate-500 group-hover:text-cyan-500 transition-colors uppercase tracking-widest z-10">
                  REF: S-0{index + 1}
                </div>

                {/* Main Card Content */}
                <div className="p-8 pt-10 flex-1 flex flex-col">
                  <div className="flex items-start gap-6 mb-8">
                    {/* The "Spine" Design */}
                    <div className="flex flex-col items-center gap-2">
                      <div className="w-12 h-12 bg-slate-950 rounded-xl flex items-center justify-center border border-slate-800 group-hover:border-cyan-500/30 transition-all">
                        {getIcon(step.icon, 'text-slate-500 group-hover:text-cyan-400 w-6 h-6 transition-colors')}
                      </div>
                      <div className="w-px h-12 bg-slate-800 group-hover:bg-cyan-900 transition-colors" />
                      <div className="w-2 h-2 rounded-full border border-slate-700 group-hover:border-cyan-600 group-hover:bg-cyan-600 transition-all" />
                    </div>

                    <div className="flex-1 space-y-3 pt-1">
                      <h3 className="text-lg font-bold text-white group-hover:text-cyan-400 transition-colors tracking-tight">
                        {step.title}
                      </h3>
                      <p className="text-[13px] text-slate-500 leading-relaxed font-light line-clamp-2">
                        {step.description}
                      </p>
                    </div>
                  </div>

                  {/* Telemetry Footer */}
                  <div className="mt-auto pt-6 border-t border-slate-900/50 flex items-center justify-between">
                    <div className="flex items-end gap-1 h-4">
                       {[...Array(6)].map((_, i) => (
                         <motion.div 
                          key={i}
                          className="w-1 bg-slate-800 rounded-full"
                          animate={{ height: isNaN(i) ? 4 : [4, 12, 6, 16, 4][i % 5] }}
                          transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.1 }}
                         />
                       ))}
                    </div>
                    
                    <div className="flex items-center gap-4">
                      <span className="text-[9px] font-black text-slate-600 group-hover:text-cyan-500 transition-colors uppercase tracking-[0.2em]">Ready</span>
                      <div className="w-10 h-10 rounded-full border border-slate-800 flex items-center justify-center group-hover:border-cyan-500/50 group-hover:bg-cyan-500/10 transition-all">
                        <ArrowRight size={16} className="text-slate-500 group-hover:text-cyan-400" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Bottom Highlight Line */}
                <div className="h-0.5 w-0 bg-cyan-500 group-hover:w-full transition-all duration-500" />
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;