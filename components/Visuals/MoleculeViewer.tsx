
import React, { useEffect, useRef } from 'react';

interface MoleculeViewerProps {
  pdbId?: string;
  className?: string;
  style?: 'cartoon' | 'stick' | 'sphere' | 'surface';
  color?: string;
  onLoaded?: () => void;
}

const MoleculeViewer: React.FC<MoleculeViewerProps> = ({ 
  pdbId = '2az5', 
  className = '', 
  style = 'cartoon',
  color = 'spectrum',
  onLoaded
}) => {
  const viewerRef = useRef<HTMLDivElement>(null);
  const viewerInstance = useRef<any>(null);

  useEffect(() => {
    if (!viewerRef.current) return;
    
    // Safety check for $3Dmol availability
    // @ts-ignore
    if (typeof $3Dmol === 'undefined') {
      console.warn("3Dmol library not loaded yet.");
      return;
    }

    // Use global $3Dmol from CDN
    // @ts-ignore
    const viewer = $3Dmol.createViewer(viewerRef.current, {
      backgroundColor: 'transparent',
    });
    viewerInstance.current = viewer;

    // TNF-alpha PDB ID
    // @ts-ignore
    $3Dmol.download(`pdb:${pdbId}`, viewer, {}, () => {
      viewer.setStyle({}, { [style]: { color: color } });
      viewer.zoomTo();
      viewer.render();
      viewer.animate({ loop: 'backAndForth', step: 1 });
      if (onLoaded) onLoaded();
    });

    const handleResize = () => {
      if (viewerInstance.current) {
        viewerInstance.current.resize();
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (viewerInstance.current) {
        viewerInstance.current.clear();
      }
    };
  }, [pdbId, style, color]);

  return (
    <div 
      ref={viewerRef} 
      className={`relative w-full h-full min-h-[400px] ${className}`}
    />
  );
};

export default MoleculeViewer;
