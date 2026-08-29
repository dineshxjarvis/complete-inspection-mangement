"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type WorkspaceId = 'ws1' | 'ws2' | 'ws3' | 'ws4' | 'ws5' | 'ws6' | 'ws7' | 'ws8';

interface WorkspaceContextType {
  activeWorkspace: WorkspaceId;
  setActiveWorkspace: (ws: WorkspaceId) => void;
  switchWorkspace: (ws: WorkspaceId) => void;
}

const WorkspaceContext = createContext<WorkspaceContextType | undefined>(undefined);

export const WorkspaceProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [activeWorkspace, setActiveWorkspace] = useState<WorkspaceId>('ws8'); // Default to Workspace 08

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const port = window.location.port;
      const params = new URLSearchParams(window.location.search);
      const wsParam = params.get('ws') || params.get('workspace');

      if (wsParam) {
        const clean = wsParam.toLowerCase();
        if (clean === 'ws1' || clean === '1') setActiveWorkspace('ws1');
        else if (clean === 'ws2' || clean === '2') setActiveWorkspace('ws2');
        else if (clean === 'ws3' || clean === '3') setActiveWorkspace('ws3');
        else if (clean === 'ws4' || clean === '4') setActiveWorkspace('ws4');
        else if (clean === 'ws5' || clean === '5') setActiveWorkspace('ws5');
        else if (clean === 'ws6' || clean === '6') setActiveWorkspace('ws6');
        else if (clean === 'ws7' || clean === '7') setActiveWorkspace('ws7');
        else if (clean === 'ws8' || clean === '8') setActiveWorkspace('ws8');
      } else if (port) {
        if (port === '3001') setActiveWorkspace('ws1');
        else if (port === '3002') setActiveWorkspace('ws2');
        else if (port === '3003') setActiveWorkspace('ws3');
        else if (port === '3004') setActiveWorkspace('ws4');
        else if (port === '3005') setActiveWorkspace('ws5');
        else if (port === '3006') setActiveWorkspace('ws6');
        else if (port === '3007') setActiveWorkspace('ws7');
        else if (port === '3008') setActiveWorkspace('ws8');
      }
    }
  }, []);

  const switchWorkspace = (ws: WorkspaceId) => {
    setActiveWorkspace(ws);
    if (typeof window !== 'undefined') {
      const url = new URL(window.location.href);
      url.searchParams.set('ws', ws);
      window.history.pushState({}, '', url.toString());
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <WorkspaceContext.Provider value={{
      activeWorkspace,
      setActiveWorkspace,
      switchWorkspace
    }}>
      {children}
    </WorkspaceContext.Provider>
  );
};

export const useWorkspace = () => {
  const context = useContext(WorkspaceContext);
  if (!context) {
    throw new Error('useWorkspace must be used within a WorkspaceProvider');
  }
  return context;
};
