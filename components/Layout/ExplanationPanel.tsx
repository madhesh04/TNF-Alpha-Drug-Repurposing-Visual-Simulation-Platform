
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { WorkflowStep } from '../../types';
import { Info, HelpCircle, Layers, CheckCircle2 } from 'lucide-react';

interface ExplanationPanelProps {
  step: WorkflowStep | undefined;
}

const ExplanationPanel: React.FC<ExplanationPanelProps> = ({ step }) => {
  if (!step) return null;

  return (
    <motion.div 
      initial={{ x: 20, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      className="h-full flex flex-col gap-6 p-6 glass rounded-l-2xl border-l-cyan-500/30 overflow-y-auto"
    >
      <div className="space-y-2">
        <h2 className="text-2xl font-bold text-cyan-400 flex items-center gap-2">
          {step.title}
        </h2>
        <p className="text-slate-400 text-sm leading-relaxed">
          Understanding the role of {step.title.toLowerCase()} in drug discovery.
        </p>
      </div>

      <div className="space-y-6">
        <section className="space-y-2">
          <div className="flex items-center gap-2 text-cyan-300 font-medium text-sm">
            <Info size={16} />
            <h4>What is this step?</h4>
          </div>
          <p className="text-slate-300 text-sm leading-relaxed bg-slate-900/40 p-3 rounded-lg border border-slate-800">
            {step.description}
          </p>
        </section>

        <section className="space-y-2">
          <div className="flex items-center gap-2 text-cyan-300 font-medium text-sm">
            <HelpCircle size={16} />
            <h4>Why is it important?</h4>
          </div>
          <p className="text-slate-300 text-sm leading-relaxed bg-slate-900/40 p-3 rounded-lg border border-slate-800">
            {step.importance}
          </p>
        </section>

        <section className="space-y-2">
          <div className="flex items-center gap-2 text-cyan-300 font-medium text-sm">
            <Layers size={16} />
            <h4>How it works in this project?</h4>
          </div>
          <p className="text-slate-300 text-sm leading-relaxed bg-slate-900/40 p-3 rounded-lg border border-slate-800">
            {step.mechanism}
          </p>
        </section>

        <section className="space-y-2">
          <div className="flex items-center gap-2 text-emerald-400 font-medium text-sm">
            <CheckCircle2 size={16} />
            <h4>Success Criteria</h4>
          </div>
          <p className="text-slate-300 text-sm leading-relaxed bg-emerald-950/20 p-3 rounded-lg border border-emerald-900/30">
            {step.successCriteria}
          </p>
        </section>
      </div>

      <div className="mt-auto pt-6 border-t border-slate-800">
        <div className="bg-cyan-950/20 p-4 rounded-xl border border-cyan-900/30">
          <h5 className="text-cyan-400 text-xs font-bold uppercase tracking-wider mb-2">Scientific Note</h5>
          <p className="text-xs text-slate-400 leading-normal">
            TNF-alpha (Tumor Necrosis Factor alpha) is a cell signaling protein involved in systemic inflammation. It is a key target for treating autoimmune diseases like Rheumatoid Arthritis.
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default ExplanationPanel;
