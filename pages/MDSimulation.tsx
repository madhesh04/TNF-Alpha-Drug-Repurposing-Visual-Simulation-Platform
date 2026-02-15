
import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Play, Activity, Thermometer, Waves, Box, Info, Zap, Loader2, ChevronRight, X } from 'lucide-react';
import MoleculeViewer from '../components/Visuals/MoleculeViewer';

const INSIGHTS = {
  rmsd: {
    title: "RMSD (Structural Stability)",
    desc: "Measures the average distance between the atoms of superimposed proteins. A plateau below 2.0Å indicates the drug-target complex is equilibrated and stable.",
  },
  solvent: {
    title: "Explicit Solvent (TIP3P)",
    desc: "We surround the complex with ~12,000 water molecules and 0.15M NaCl to mimic the crowded, aqueous environment of a human cell.",
  }
};

const MDSimulation: React.FC = () => {
  const [isSimulating, setIsSimulating] = useState(false);
  const [progress, setProgress] = useState(0);
  const [data, setData] = useState<any[]>([]);
  const [showInsight, setShowInsight] = useState<string | null>(null);
  const intervalRef = useRef<any>(null);

  // Function to generate pseudo-realistic RMSD data
  const generateDataPoint = useCallback((time: number) => {
    let rmsd;
    if (time < 30) {
      rmsd = 0.4 + (time * 0.03) + (Math.random() * 0.15);
    } else {
      rmsd = 1.3 + (Math.random() * 0.2);
    }
    return { time, rmsd: parseFloat(rmsd.toFixed(2)) };
  }, []);

  // Effect to handle simulation progress
  useEffect(() => {
    if (isSimulating) {
      intervalRef.current = setInterval(() => {
        setProgress(p => {
          if (p >= 100) {
            clearInterval(intervalRef.current);
            setIsSimulating(false);
            return 100;
          }
          return p + 1;
        });
      }, 100);
    } else {
      if (intervalRef.current) clearInterval(intervalRef.current);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isSimulating]);

  // Effect to update chart data as progress increases
  useEffect(() => {
    if (progress > 0 && progress % 2 === 0) {
      setData(prev => {
        if (prev.length > 0 && prev[prev.length - 1].time === progress) return prev;
        return [...prev, generateDataPoint(progress)];
      });
    }
  }, [progress, generateDataPoint]);

  const startSimulation = () => {
    setData([]);
    setProgress(0);
    setIsSimulating(true);
  };

  const chartData = useMemo(() => data, [data]);

  return (
    <div className="space-y-6 h-full flex flex-col">
      <div className="flex justify-between items-end border-b border-slate-800 pb-6">
        <div>
          <h2 className="text-3xl font-bold text-white flex items-center gap-3">
            Molecular Dynamics
            <Activity className="text-cyan-400" />
          </h2>
          <p className="text-slate-400 text-sm mt-1">100ns All-Atom Trajectory in Explicit Solvent (310K, 1 bar).</p>
        </div>
        <button
          onClick={startSimulation}
          disabled={isSimulating}
          className="relative group overflow-hidden flex items-center gap-2 px-8 py-3 bg-cyan-600 hover:bg-cyan-500 disabled:bg-slate-800 text-white rounded-xl font-bold transition-all shadow-lg"
        >
          {isSimulating && (
            <motion.div 
              className="absolute inset-0 bg-white/10"
              animate={{ x: ['-100%', '100%'] }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            />
          )}
          {isSimulating ? <Loader2 className="animate-spin" size={20} /> : <Play size={20} />}
          <span>{isSimulating ? 'SOLVING NEWTONIAN LAWS...' : 'START 100ns RUN'}</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 flex-1 min-h-0">
        {/* Trajectory Viewer */}
        <div className="lg:col-span-7 glass rounded-3xl relative overflow-hidden bg-slate-900/40 border-slate-800 shadow-2xl">
          <div className="absolute top-4 left-4 z-20 flex flex-col gap-2">
            <div className="px-3 py-1 glass rounded-full text-[10px] font-bold text-cyan-400 border-cyan-500/30 flex items-center gap-2">
              <span className={`w-2 h-2 rounded-full ${isSimulating ? 'bg-emerald-400 animate-pulse' : 'bg-slate-500'}`} />
              TRAJECTORY: {progress}ns / 100ns
            </div>
          </div>

          <div className="absolute inset-0">
            <motion.div 
              className="w-full h-full"
              animate={isSimulating ? {
                x: [0, 0.5, -0.5, 0.5, 0],
                y: [0, -0.5, 0.5, -0.5, 0],
              } : {}}
              transition={{ duration: 0.15, repeat: Infinity }}
            >
              <MoleculeViewer pdbId="2az5" style="stick" color="spectrum" />
            </motion.div>
          </div>

          <div className="absolute bottom-6 left-6 right-6 z-20 flex justify-between items-end">
             <div className="space-y-4">
                <div className="flex gap-2 relative">
                   <button 
                    onMouseEnter={() => setShowInsight('rmsd')}
                    onMouseLeave={() => setShowInsight(null)}
                    className="p-2 glass rounded-lg text-slate-400 hover:text-cyan-400 transition-colors"
                  >
                    <Info size={14} />
                  </button>
                  <div className="text-[10px] text-cyan-500 font-mono font-bold uppercase tracking-widest flex items-center gap-2 bg-black/40 px-3 py-1 rounded-full backdrop-blur">
                    RMSD MONITOR ACTIVE
                  </div>
                </div>
             </div>
          </div>
        </div>

        {/* Analytics Column */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          <div className="glass rounded-3xl p-6 bg-slate-900/40 border-slate-800 flex-1 flex flex-col">
            <h4 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-6">Simulation Analysis (Real-time)</h4>
            <div className="flex-1 min-h-0">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData}>
                  <defs>
                    <linearGradient id="colorRmsd" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#22d3ee" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#22d3ee" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                  <XAxis 
                    dataKey="time" 
                    stroke="#475569" 
                    fontSize={10} 
                    tickFormatter={(val) => `${val}ns`}
                    domain={[0, 100]}
                  />
                  <YAxis 
                    stroke="#475569" 
                    fontSize={10} 
                    domain={[0, 3]} 
                    tickFormatter={(val) => `${val}Å`}
                  />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', fontSize: '10px' }}
                    labelStyle={{ color: '#94a3b8' }}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="rmsd" 
                    stroke="#22d3ee" 
                    fillOpacity={1} 
                    fill="url(#colorRmsd)" 
                    isAnimationActive={false}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
             <div className="glass p-4 rounded-2xl border-slate-800">
                <div className="text-[10px] text-slate-500 font-bold uppercase mb-1">Ensemble Temp</div>
                <div className="text-xl font-mono text-white flex items-center gap-2">
                   310.15 <span className="text-xs text-slate-500">K</span>
                </div>
             </div>
             <div className="glass p-4 rounded-2xl border-slate-800">
                <div className="text-[10px] text-slate-500 font-bold uppercase mb-1">Pressure</div>
                <div className="text-xl font-mono text-white flex items-center gap-2">
                   1.01 <span className="text-xs text-slate-500">bar</span>
                </div>
             </div>
          </div>

          <AnimatePresence>
            {progress === 100 && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-6 glass border-emerald-500/30 rounded-3xl bg-emerald-500/5 shadow-xl"
              >
                <div className="flex items-center gap-3 text-emerald-400 font-bold mb-3">
                   <Activity size={20} />
                   <span>Trajectory Complete</span>
                </div>
                <p className="text-xs text-slate-400 mb-6 leading-relaxed">
                  System converged at 1.45Å average RMSD. The ligand-target interaction is energetically stable over the 100ns timeline.
                </p>
                <Link to="/bioisostere" className="w-full group flex items-center justify-center gap-2 px-4 py-3 bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-bold rounded-xl transition-all shadow-xl">
                  Optimize via Bioisosteres <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </Link>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
      
      {/* Insight Portal */}
      <AnimatePresence>
        {showInsight && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-12 right-12 w-80 z-50 glass p-6 rounded-3xl border-cyan-500/30 shadow-[0_20px_50px_rgba(0,0,0,0.5)] bg-slate-900/90 backdrop-blur-xl"
          >
            <div className="flex justify-between items-start mb-4">
              <div className="p-2 bg-cyan-500/10 rounded-lg">
                <Activity size={16} className="text-cyan-400" />
              </div>
              <button onClick={() => setShowInsight(null)} className="text-slate-500 hover:text-white transition-colors">
                <X size={16} />
              </button>
            </div>
            <h5 className="text-white font-bold text-sm mb-2">{(INSIGHTS as any)[showInsight].title}</h5>
            <p className="text-xs text-slate-400 leading-relaxed">
              {(INSIGHTS as any)[showInsight].desc}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MDSimulation;
