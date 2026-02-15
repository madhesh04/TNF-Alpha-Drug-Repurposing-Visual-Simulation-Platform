import React from 'react';
import { MOCK_MOLECULES } from '../constants';
import { FileText, Download, CheckCircle, Shield, Target, Activity, Zap, Check } from 'lucide-react';

const Report: React.FC = () => {
  const drug = MOCK_MOLECULES[1];

  return (
    <div className="space-y-8 pb-12">
      <div className="flex justify-between items-center border-b border-slate-800 pb-8">
        <div>
          <h2 className="text-3xl font-bold text-white">Simulation Report</h2>
          <p className="text-slate-400 mt-2">Validated Drug Repurposing Profile for {drug.name}.</p>
        </div>
        <button className="flex items-center gap-2 px-6 py-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-bold transition-all shadow-lg">
           <Download size={20} />
           <span>Export PDF</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
           <div className="glass p-8 rounded-3xl border-l-4 border-l-emerald-500 bg-emerald-950/5">
              <div className="flex items-center gap-4 mb-6">
                 <div className="p-4 bg-emerald-500/10 rounded-2xl">
                    <CheckCircle className="text-emerald-400" size={32} />
                 </div>
                 <div>
                    <h3 className="text-xl font-bold text-white">Lead Candidate Validated</h3>
                    <p className="text-sm text-slate-500">ID: TNF-REP-002 | PHASE: IN-SILICO COMPLETE</p>
                 </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                 {[
                   { label: 'Binding ΔG', val: '-9.4', unit: 'kcal/mol', icon: Target },
                   { label: 'MD Stability', val: '1.2', unit: 'Å RMSD', icon: Activity },
                   { label: 'Safety Index', val: '98.2', unit: '%', icon: Shield }
                 ].map(stat => (
                   <div key={stat.label} className="p-4 bg-slate-900/40 rounded-2xl border border-slate-800">
                      <stat.icon size={16} className="text-cyan-500 mb-2" />
                      <div className="text-[10px] text-slate-500 font-bold uppercase mb-1">{stat.label}</div>
                      <div className="text-xl font-mono text-white font-bold">{stat.val} <span className="text-[10px] text-slate-500">{stat.unit}</span></div>
                   </div>
                 ))}
              </div>
           </div>

           <div className="glass p-8 rounded-3xl space-y-6">
              <h4 className="text-white font-bold flex items-center gap-2">
                 <FileText className="text-cyan-400" size={18} />
                 Scientific Summary
              </h4>
              <p className="text-sm text-slate-400 leading-relaxed">
                The repurposed candidate <span className="text-cyan-400 font-bold">{drug.name}</span> has demonstrated exceptional binding complementarity to the TNF-alpha dimer interface. 
                Comprehensive MM-GBSA refinement confirms a spontaneous binding thermodynamics (ΔG = -58.4 kcal/mol). 
                100ns MD simulation indicates high structural stability with a consistent RMSD plateau below 1.5Å. 
                ADMET profiling shows no significant toxicity flags and high oral bioavailability, making it a prime candidate for immediate in-vitro validation.
              </p>

              <div className="pt-6 border-t border-slate-800">
                 <div className="text-[10px] text-slate-500 font-bold uppercase mb-4 tracking-widest">Molecular Profile</div>
                 <div className="flex gap-4">
                    <div className="p-4 glass rounded-xl flex-1 text-center">
                       <div className="text-xs text-slate-500 mb-1">MW</div>
                       <div className="text-sm font-mono text-white">{drug.admet.mw}</div>
                    </div>
                    <div className="p-4 glass rounded-xl flex-1 text-center">
                       <div className="text-xs text-slate-500 mb-1">LogP</div>
                       <div className="text-sm font-mono text-white">2.41</div>
                    </div>
                    <div className="p-4 glass rounded-xl flex-1 text-center">
                       <div className="text-xs text-slate-500 mb-1">Rotatable Bonds</div>
                       <div className="text-sm font-mono text-white">4</div>
                    </div>
                 </div>
              </div>
           </div>
        </div>

        <div className="space-y-6">
           <div className="glass p-6 rounded-3xl bg-slate-900/40 border border-slate-800 flex flex-col items-center">
              <div className="w-full aspect-square glass rounded-2xl mb-6 relative overflow-hidden flex items-center justify-center">
                 <div className="text-8xl font-bold text-slate-800/20 select-none">CHEM</div>
                 <div className="absolute inset-0 flex items-center justify-center p-8">
                    <Zap size={64} className="text-cyan-400 opacity-40 animate-pulse" />
                 </div>
              </div>
              <div className="text-center">
                 <h4 className="text-white font-bold">{drug.name}</h4>
                 <p className="text-[10px] font-mono text-slate-500 break-all px-4">{drug.smiles}</p>
              </div>
           </div>

           <div className="p-6 glass bg-cyan-950/20 rounded-2xl border-cyan-500/10">
              <div className="text-[10px] text-cyan-500 font-bold uppercase mb-2">Workflow Status</div>
              <div className="space-y-3">
                 {['Target Prepared', 'Lead Optimized', 'Physics Validated', 'Safety Profiled'].map(item => (
                   <div key={item} className="flex items-center gap-2 text-xs text-slate-300">
                      <div className="w-4 h-4 rounded-full bg-emerald-500 flex items-center justify-center">
                         <Check size={10} className="text-white" />
                      </div>
                      {item}
                   </div>
                 ))}
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default Report;