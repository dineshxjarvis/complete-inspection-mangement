"use client";

import React from 'react';
import { useStrata } from '../context/StrataContext';
import { X } from 'lucide-react';

export const QuickNavigator: React.FC = () => {
  const { quickNavOpen, setQuickNavOpen, navigateTo } = useStrata();

  if (!quickNavOpen) return null;

  const screens = [
    { id: '01', name: 'Dashboard' },
    { id: '02', name: 'Inspection Intake' },
    { id: '03A', name: 'Create Intake Request' },
    { id: '03B', name: 'Intake Request Detail' },
    { id: '04', name: 'Recommendations Queue' },
    { id: '05', name: 'Recommendation Detail' },
    { id: '06', name: 'Inspection Plans List' },
    { id: '07', name: 'Create Inspection Plan (8-Steps)' },
    { id: '08', name: 'Inspection Plan Detail' },
    { id: '09', name: 'Planning Calendar' },
    { id: '10', name: 'Schedule Inspection' },
    { id: '11', name: 'Scheduling Conflict Screen' },
    { id: '12', name: 'Overdue Inspections' },
    { id: '13', name: 'Plan Audit & Activity' },
    { id: '14', name: 'Central Inspection Hub' },
    { id: '15', name: 'Active Field Monitoring' },
    { id: '16', name: 'Findings Monitoring' },
    { id: '17', name: 'CAPA Monitoring' },
    { id: '18', name: 'Report Status' },
    { id: '19', name: 'Inspection History' },
    { id: '20', name: 'Historical Detail (Final)' },
    { id: '21', name: 'Global Audit Log' },
    { id: '22', name: '9 Enterprise States' }
  ];

  return (
    <div className="modal-backdrop" onClick={() => setQuickNavOpen(false)}>
      <div className="modal-dialog" style={{ maxWidth: '780px' }} onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3 className="modal-title">Jump to STRATA Screen (01 — 22)</h3>
          <button className="modal-close-btn" onClick={() => setQuickNavOpen(false)}>
            <X size={16} />
          </button>
        </div>
        <div className="modal-body">
          <div className="quick-nav-grid">
            {screens.map((s) => (
              <div
                key={s.id}
                className="quick-nav-card"
                onClick={() => {
                  setQuickNavOpen(false);
                  navigateTo(s.id);
                }}
              >
                <span className="quick-nav-code">SCREEN {s.id}</span>
                <span className="quick-nav-name">{s.name}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="modal-footer">
          <button className="btn btn-secondary" onClick={() => setQuickNavOpen(false)}>
            Close (Esc)
          </button>
        </div>
      </div>
    </div>
  );
};
