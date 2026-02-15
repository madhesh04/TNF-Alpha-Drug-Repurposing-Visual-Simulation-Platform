import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { WORKFLOW_STEPS, getIcon } from '../constants';
import { ArrowRight, CheckCircle2, FlaskConical, Target, Zap, Activity, ChevronRight, Binary, Gauge, Cpu, Box, Fingerprint } from 'lucide-react';

const Dashboard: React.FC = () => {
  const completionPercentage = 0;

  return (
    <div className="space-y-16">
      {/* High-Precision Command Console Header */}
      <section className="relative glass p-12 md:p-16 rounded-[2.5rem] overflow-hidden border-slate-800 bg-[#050a18] shadow-2xl min-h-[500px] flex items-center">
        {/* Background Decorative Element */}
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute top-0 right-0 p-12 opacity-[0.05] pointer-events-none select-none">
          <Fingerprint size={450} className="text-cyan-400 rotate-12" />
        </div>
        
        <div className="relative z-10 grid grid-cols-1 xl:grid-cols-12 gap-12 items-center w-full">
          <div className="xl:col-span-8 space-y-8">
            <div className="inline-flex items-center gap-4 px-4 py-2 rounded-lg bg-cyan-500/5 border border-cyan-500/20 text-cyan-400 text-[10px] font-black tracking-[0.5em] uppercase">
              Core Processor // Alpha_Node_v2
            </div>
            
            <div className="space-y-4">
              <h1 className="text-6xl md:text-7xl font-black text-white tracking-tighter leading-tight">
                TNF-ALPHA <br />
                <span className="text-cyan-400 opacity-80 italic">REPURPOSING CORE</span>
              </h1>
              <p className="text-slate-400 text-lg md:text-xl max-w-2xl leading-relaxed font-light">
                Distributed computing framework for identifying small-molecule dimerization inhibitors through multi-phase biological simulation.
              </p>
            </div>
            
            <div className="flex flex-wrap gap-6 pt-2">
              <div className="bg-slate-900/40 border border-slate-800 p-6 rounded-2xl min-w-[260px] backdrop-blur-sm shadow-xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-24 h-24 bg-cyan-500/5 rounded-full -mr-8 -mt-8" />
                <div className="text-[9px] text-slate-500 font-bold uppercase mb-2 tracking-[0.2em] flex items-center gap-2">
                  <Activity size={12} className="text-cyan-600" />
                  System Utilization
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-3xl font-mono font-bold text-white">{completionPercentage}%</span>
                  <div className="flex-1 h-1.5 bg-slate-800 rounded-full overflow-hidden">
                    <motion.div 
                      className="h-full bg-cyan-500 shadow-[0_0_10px_rgba(34,211,238,0.5)]"
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
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              className="p-10 bg-gradient-to-br from-cyan-950/20 to-slate-950/40 border border-slate-800 rounded-[2.5rem] shadow-2xl backdrop-blur-xl relative group"
            >
              <div className="absolute -top-4 -left-4 w-12 h-12 border-t-2 border-l-2 border-cyan-500/40 rounded-tl-2xl" />
              <h4 className="text-cyan-400 font-bold text-xs mb-4 uppercase tracking-[0.3em] flex items-center gap-3">
                <Box size={16} />
                Next Protocol
              </h4>
              <p className="text-sm text-slate-300 mb-8 leading-relaxed font-light">
                Awaiting structural validation of the TNF-alpha dimer interface. Execute receptor preparation to proceed.
              </p>
              <Link 
                to="/protein-prep" 
                className="w-full flex items-center justify-center gap-4 px-8 py-4 bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-black rounded-xl transition-all shadow-[0_10px_30px_rgba(8,145,178,0.2)]"
              >
                INITIALIZE MODULE S1 <ChevronRight size={18} />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Full-Bleed Tactical Console Grid */}
      <div className="space-y-10">
        <div className="flex items-center justify-between px-2">
          <div className="flex items-center gap-6">
            <div className="w-1 h-8 bg-cyan-500/50 rounded-full" />
            <h3 className="text-xs font-black text-slate-500 uppercase tracking-[0.5em]">Simulation Inventory</h3>
          </div>
          <span className="text-[10px] font-mono text-slate-600 bg-slate-900/50 px-3 py-1 rounded-md border border-slate-800">
            LOADED_MODULES: {WORKFLOW_STEPS.length}
          </span>
        </div>
        
        {/* Optimized Grid for 1370px: 4 columns on xl */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {WORKFLOW_STEPS.map((step, index) => (
            <motion.div
              key={step.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <Link 
                to={step.route}
                className="group relative flex h-full bg-[#0a1120] border border-slate-800/80 rounded-2xl overflow-hidden hover:border-cyan-500/30 hover:bg-[#0c1527] transition-all shadow-xl hover:-translate-y-1"
              >
                {/* Asymmetric Left Status Bar */}
                <div className="w-1.5 h-full bg-slate-800 group-hover:bg-cyan-500 transition-colors relative">
                   <div className="absolute top-0 left-0 w-full h-1/4 bg-cyan-500/40 group-hover:h-full transition-all duration-700" />
                </div>

                <div className="flex-1 p-8 relative flex flex-col">
                  {/* Holographic ID Tag */}
                  <div className="absolute top-6 right-6 px-2 py-0.5 rounded-sm bg-slate-900 border border-slate-800 text-[8px] font-mono font-bold text-slate-500 group-hover:text-cyan-400 group-hover:border-cyan-500/30 transition-all uppercase tracking-tighter">
                    {step.id}
                  </div>

                  {/* Isomorphic Phase Number */}
                  <div className="absolute -bottom-4 -right-2 text-[120px] font-black text-white/[0.02] leading-none pointer-events-none select-none group-hover:text-cyan-500/[0.04] transition-colors">
                    0{index + 1}
                  </div>

                  <div className="mb-8 relative">
                    <div className="w-14 h-14 bg-slate-900 rounded-xl flex items-center justify-center border border-slate-800 group-hover:border-cyan-500/20 group-hover:bg-cyan-500/5 transition-all shadow-inner">
                      {getIcon(step.icon, 'text-slate-500 group-hover:text-cyan-400 w-7 h-7 transition-all duration-300')}
                    </div>
                  </div>

                  <div className="space-y-3 mb-8 relative z-10">
                    <h3 className="text-xl font-bold text-white group-hover:text-cyan-400 transition-colors tracking-tight">
                      {step.title}
                    </h3>
                    <p className="text-sm text-slate-400 leading-relaxed font-light line-clamp-2">
                      {step.description}
                    </p>
                  </div>

                  <div className="mt-auto pt-6 border-t border-slate-900 flex items-center justify-between relative z-10">
                    <div className="flex items-center gap-1.5">
                       {[...Array(5)].map((_, i) => (
                         <div key={i} className={`w-1 h-3 rounded-full transition-all duration-500 ${
                           i < 3 ? 'bg-cyan-500/40 group-hover:bg-cyan-500 group-hover:h-4' : 'bg-slate-800'
                         }`} />
                       ))}
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-[10px] font-black text-slate-600 group-hover:text-cyan-500 transition-colors uppercase tracking-[0.2em]">Open</span>
                      <div className="w-9 h-9 rounded-lg border border-slate-800 flex items-center justify-center group-hover:border-cyan-500/50 group-hover:bg-cyan-500 group-hover:text-white transition-all shadow-sm">
                        <ArrowRight size={16} />
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;