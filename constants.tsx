
import React from 'react';
import { 
  Dna, 
  FlaskConical, 
  Target, 
  Activity, 
  Zap, 
  Cpu, 
  Repeat, 
  FileText, 
  LayoutDashboard,
  Box
} from 'lucide-react';
import { WorkflowStep, MoleculeData } from './types';

export const WORKFLOW_STEPS: WorkflowStep[] = [
  {
    id: 'protein-prep',
    title: 'Protein Preparation',
    route: '/protein-prep',
    description: 'Preparing the TNF-alpha target for computational interaction.',
    importance: 'Accurate biological modeling requires correct protonation and removal of non-biological artifacts.',
    mechanism: 'The protein (2AZ5) is stripped of water molecules, hydrogens are added according to pH 7.4, and energy is minimized.',
    successCriteria: 'A cleaned protein structure with no steric clashes and optimized energy state.',
    icon: 'dna'
  },
  {
    id: 'ligand-prep',
    title: 'Ligand Preparation',
    route: '/ligand-prep',
    description: 'Processing drug candidates for molecular docking.',
    importance: 'Correct stereochemistry and ionization states are critical for binding affinity prediction.',
    mechanism: 'Small molecules are desalted, ionized at target pH, and tautomers are generated to find the most bioactive form.',
    successCriteria: 'A set of energy-minimized 3D conformations for each drug candidate.',
    icon: 'flask'
  },
  {
    id: 'docking',
    title: 'Molecular Docking',
    route: '/docking',
    description: 'Predicting the binding orientation and affinity of candidates.',
    importance: 'Identifies the most promising binders from a large library of repurposed drugs.',
    mechanism: 'Using a grid-based search (Autodock Vina) to explore the conformational space of the ligand within the binding site.',
    successCriteria: 'Low (negative) docking scores indicating strong binding energy.',
    icon: 'target'
  },
  {
    id: 'admet',
    title: 'ADMET Profiling',
    route: '/admet',
    description: 'Pharmacokinetics and safety prediction.',
    importance: 'A drug must not only bind but also reach the target safely in the human body.',
    mechanism: 'Evaluation of Lipinski Rules, intestinal absorption, Blood-Brain Barrier permeability, and toxicity.',
    successCriteria: 'Drug-like properties with low predicted toxicity and high oral bioavailability.',
    icon: 'activity'
  },
  {
    id: 'mmgbsa',
    title: 'MM-GBSA Refinement',
    route: '/mmgbsa',
    description: 'Accurate binding free energy calculation.',
    importance: 'Provides a more rigorous thermodynamic estimate of binding than basic docking.',
    mechanism: 'Combines molecular mechanics energies with generalized Born and surface area solvation terms.',
    successCriteria: 'Stable ΔG_bind values confirming spontaneous binding.',
    icon: 'zap'
  },
  {
    id: 'ifd',
    title: 'Induced Fit Docking',
    route: '/ifd',
    description: 'Modeling receptor flexibility.',
    importance: 'Proteins are not static; they adapt to the presence of a ligand.',
    mechanism: 'The binding pocket amino acids are allowed to rotate and shift to maximize interactions.',
    successCriteria: 'Improved binding poses and scores compared to rigid docking.',
    icon: 'cpu'
  },
  {
    id: 'md-simulation',
    title: 'MD Simulation',
    route: '/md-simulation',
    description: 'Simulating binding stability over time.',
    importance: 'Confirms the stability of the drug-protein complex in a physiological environment.',
    mechanism: 'Numerical integration of Newton\'s laws over 100ns to track structural RMSD and RMSF.',
    successCriteria: 'Low RMSD plateau indicating a stable, equilibrated system.',
    icon: 'box'
  },
  {
    id: 'bioisostere',
    title: 'Bioisosteric Replacement',
    route: '/bioisostere',
    description: 'Optimization through functional group substitution.',
    importance: 'Improving potency or safety by swapping atoms while maintaining structural intent.',
    mechanism: 'Replacing sulfur with oxygen or nitrogen to tune electronics and hydrogen bonding.',
    successCriteria: 'Enhanced pharmacological profile without increasing molecular weight significantly.',
    icon: 'repeat'
  },
  {
    id: 'report',
    title: 'Final Report',
    route: '/report',
    description: 'Comprehensive analysis of the best repurposed candidate.',
    importance: 'Consolidating evidence for clinical consideration or wet-lab validation.',
    mechanism: 'Aggregating all simulation data into a validated drug profile.',
    successCriteria: 'A "Go" decision for experimental testing of the candidate.',
    icon: 'file'
  }
];

export const MOCK_MOLECULES: MoleculeData[] = [
  {
    id: 'drug-1',
    name: 'Pentoxifylline',
    smiles: 'CN1C=NC2=C1C(=O)N(C(=O)N2C)CCCC(=O)C',
    dockingScore: -7.2,
    admet: { mw: 278.31, hbd: 0, hba: 5, psa: 64.6, absorption: 95 }
  },
  {
    id: 'drug-2',
    name: 'Infliximab-Analog (Small)',
    smiles: 'CC(C)C1=C(C=C(C=C1)O)C(=O)N',
    dockingScore: -8.9,
    admet: { mw: 181.2, hbd: 2, hba: 2, psa: 43.3, absorption: 88 }
  }
];

export const getIcon = (name: string, className?: string) => {
  switch (name) {
    case 'dna': return <Dna className={className} />;
    case 'flask': return <FlaskConical className={className} />;
    case 'target': return <Target className={className} />;
    case 'activity': return <Activity className={className} />;
    case 'zap': return <Zap className={className} />;
    case 'cpu': return <Cpu className={className} />;
    case 'repeat': return <Repeat className={className} />;
    case 'file': return <FileText className={className} />;
    case 'dashboard': return <LayoutDashboard className={className} />;
    case 'box': return <Box className={className} />;
    default: return <FlaskConical className={className} />;
  }
};
