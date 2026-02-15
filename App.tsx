
import React from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from './components/Layout/MainLayout';

// Pages
import Landing from './pages/Landing';
import Dashboard from './pages/Dashboard';
import ProteinPrep from './pages/ProteinPrep';
import LigandPrep from './pages/LigandPrep';
import Docking from './pages/Docking';
import ADMET from './pages/ADMET';
import MMGBSA from './pages/MMGBSA';
import IFD from './pages/IFD';
import MDSimulation from './pages/MDSimulation';
import Bioisostere from './pages/Bioisostere';
import Report from './pages/Report';

const App: React.FC = () => {
  return (
    <HashRouter>
      <MainLayout>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/protein-prep" element={<ProteinPrep />} />
          <Route path="/ligand-prep" element={<LigandPrep />} />
          <Route path="/docking" element={<Docking />} />
          <Route path="/admet" element={<ADMET />} />
          <Route path="/mmgbsa" element={<MMGBSA />} />
          <Route path="/ifd" element={<IFD />} />
          <Route path="/md-simulation" element={<MDSimulation />} />
          <Route path="/bioisostere" element={<Bioisostere />} />
          <Route path="/report" element={<Report />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </MainLayout>
    </HashRouter>
  );
};

export default App;
