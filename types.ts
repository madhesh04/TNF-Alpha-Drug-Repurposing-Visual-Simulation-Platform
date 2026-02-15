
export interface WorkflowStep {
  id: string;
  title: string;
  route: string;
  description: string;
  importance: string;
  mechanism: string;
  successCriteria: string;
  icon: string;
}

export interface MoleculeData {
  id: string;
  name: string;
  smiles: string;
  dockingScore: number;
  admet: {
    mw: number;
    hbd: number;
    hba: number;
    psa: number;
    absorption: number;
  };
}

export enum StepStatus {
  PENDING = 'pending',
  IN_PROGRESS = 'in_progress',
  COMPLETED = 'completed'
}
