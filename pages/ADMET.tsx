
import React from 'react';
import { motion } from 'framer-motion';
import { MOCK_MOLECULES } from '../constants';
import { Shield, Battery, Droplet, User, AlertTriangle } from 'lucide-react';

const ADMET: React.FC = () => {
  const drug = MOCK_MOLECULES[0];

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-end border-b border-slate-800 pb-8">
        <div>
          <h2 className="text-3xl font-bold text-white">ADMET Profiling</h2>
          <p className="text-slate-400 mt-2">Pharmacokinetic and toxicity analysis for {drug.name}.</p>
        </div>
        <div className="px-4 py-2 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold uppercase tracking-widest">
          Safe / Drug-Like
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Profile Card */}
        <div className="glass p-8 rounded-3xl space-y-8">
          <div className="flex items-center gap-4 border-b border-slate-800 pb-6">
            <div className="p-4 bg-cyan-500/10 rounded-2xl">
              <Shield className="text-cyan-400" size={32} />
            </div>
            <div>
              <h3 className="text-xl font-bold text-white">Lipinski Rule of 5</h3>
              <p className="text-sm text-slate-500">Evaluating drug-likeness and oral bioavailability.</p>
            </div>
          </div>

          <div className="grid gap-6">
            {[
              { label: 'Molecular Weight', val: drug.admet.mw, max: 500, unit: 'g/mol', icon: User },
              { label: 'H-Bond Donors', val: drug.admet.hbd, max: 5, unit: '', icon: Droplet },
              { label: 'H-Bond Acceptors', val: drug.admet.hba, max: 10, unit: '', icon: Battery },
              { label: 'Polar Surface Area', val: drug.admet.psa, max: 140, unit: 'Å²', icon: Shield },
            ].map((rule) => (
              <div key={rule.label} className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-400 font-medium flex items-center gap-2">
                    <rule.icon size={14} className="text-cyan-500" />
                    {rule.label}
                  </span>
                  <span className={`font-mono font-bold ${rule.val <= rule.max ? 'text-emerald-400' : 'text-rose-400'}`}>
                    {rule.val} / {rule.max} {rule.unit}
                  </span>
                </div>
                <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
                  <motion.div 
                    className={`h-full ${rule.val <= rule.max ? 'bg-emerald-500' : 'bg-rose-500'}`}
                    initial={{ width: 0 }}
                    animate={{ width: `${Math.min((rule.val / rule.max) * 100, 100)}%` }}
                    transition={{ duration: 1 }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Pharmacokinetics */}
        <div className="space-y-6">
          <div className="glass p-6 rounded-2xl border-l-4 border-l-cyan-500">
            <h4 className="text-white font-bold mb-4">Absorption Prediction</h4>
            <div className="flex items-center gap-6">
              <div className="relative w-24 h-24">
                <svg className="w-full h-full transform -rotate-90">
                  <circle cx="48" cy="48" r="40" stroke="currentColor" strokeWidth="8" fill="transparent" className="text-slate-800" />
                  <motion.circle 
                    cx="48" cy="48" r="40" stroke="currentColor" strokeWidth="8" fill="transparent" 
                    className="text-cyan-500"
                    strokeDasharray={251.2}
                    initial={{ strokeDashoffset: 251.2 }}
                    animate={{ strokeDashoffset: 251.2 * (1 - drug.admet.absorption / 100) }}
                    transition={{ duration: 1.5, ease: 'easeOut' }}
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center font-mono font-bold text-xl text-white">
                  {drug.admet.absorption}%
                </div>
              </div>
              <div>
                <p className="text-sm text-slate-300 font-bold">Gastrointestinal Absorption</p>
                <p className="text-xs text-slate-500 mt-1">High predicted bioavailability indicates efficient systemic delivery of the candidate.</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="glass p-4 rounded-xl space-y-2">
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">BBB Permeant</span>
              <div className="text-rose-400 font-bold flex items-center gap-2">
                <AlertTriangle size={14} /> NO
              </div>
            </div>
            <div className="glass p-4 rounded-xl space-y-2">
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">CYP Inhibition</span>
              <div className="text-emerald-400 font-bold flex items-center gap-2">
                <CheckCircle2 size={14} /> NONE
              </div>
            </div>
          </div>

          <div className="p-6 glass rounded-2xl bg-cyan-950/20 border-cyan-500/20">
            <h4 className="text-cyan-400 font-bold text-sm mb-2">Toxicity Alert</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              No AMES mutagenicity, hepatotoxicity, or skin sensitization predicted for the current scaffold. The compound shows a high safety margin for further development.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

// Fixed: Made className optional to satisfy type checks when used without it
const CheckCircle2 = ({ size, className }: { size: number, className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"/><path d="m9 12 2 2 4-4"/>
  </svg>
);

export default ADMET;
