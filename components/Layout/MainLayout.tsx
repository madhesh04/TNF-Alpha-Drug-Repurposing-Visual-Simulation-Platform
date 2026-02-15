import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { WORKFLOW_STEPS, getIcon } from '../../constants';
import ExplanationPanel from './ExplanationPanel';
import Header from './Header';

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const location = useLocation();
  const currentStep = WORKFLOW_STEPS.find(step => step.route === location.pathname);
  const isDashboard = location.pathname === '/dashboard';

  // If we're on the landing page, don't show the dashboard layout
  if (location.pathname === '/') {
    return <>{children}</>;
  }

  return (
    <div className="flex flex-col h-screen bg-[#020617] text-slate-200 overflow-hidden">
      <Header />
      
      <main className="flex-1 flex overflow-hidden">
        {/* Main Workspace Area - Dynamically expands if no sidebar is needed */}
        <div className={`flex-1 overflow-y-auto relative scroll-smooth ${isDashboard ? 'px-8 lg:px-14 py-10' : 'p-6 lg:p-10'}`}>
          <div className="max-w-full mx-auto min-h-full flex flex-col">
            <motion.div
              key={location.pathname}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="flex-1"
            >
              {children}
            </motion.div>

            {/* Expansive Footer with Credits */}
            <footer className="mt-16 py-10 border-t border-slate-900/50 flex flex-col md:flex-row justify-between items-center gap-6">
              <div className="flex flex-col gap-2">
                <span className="text-[10px] text-slate-500 font-bold uppercase tracking-[0.3em]">Platform Attribution</span>
                <span className="text-sm font-mono text-cyan-500 font-medium">
                  Created by <span className="text-white border-b border-cyan-500/30 pb-0.5">Nani P MSc Bio Informatics</span>
                </span>
              </div>
              
              <div className="flex items-center gap-8">
                <div className="hidden sm:flex flex-col items-end">
                   <span className="text-[9px] text-slate-600 font-bold uppercase tracking-wider">System Architecture</span>
                   <span className="text-[10px] text-slate-500">In-Silico Discovery Engine v2.4.0</span>
                </div>
                <div className="flex items-center gap-3 glass px-4 py-2 rounded-xl border-slate-800">
                   <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
                   <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Core Status: Optimal</span>
                </div>
              </div>
            </footer>
          </div>
        </div>

        {/* Dynamic Sidebar - Only rendered if scientific context is available */}
        {currentStep && (
          <aside className="w-[420px] hidden xl:block border-l border-slate-800/50 bg-slate-950/30 backdrop-blur-md">
            <ExplanationPanel step={currentStep} />
          </aside>
        )}
      </main>

      {/* Global Progress Indicator */}
      <div className="h-1 bg-slate-950 w-full overflow-hidden border-t border-slate-900">
        <motion.div 
          className="h-full bg-gradient-to-r from-cyan-600 to-cyan-400 shadow-[0_0_12px_rgba(34,211,238,0.6)]"
          initial={{ width: 0 }}
          animate={{ 
            width: `${((WORKFLOW_STEPS.findIndex(s => s.route === location.pathname) + 1) / WORKFLOW_STEPS.length) * 100}%` 
          }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        />
      </div>
    </div>
  );
};

export default MainLayout;