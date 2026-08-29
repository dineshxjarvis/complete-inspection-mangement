"use client";

import React from 'react';
import { useAssignment } from '../../context/AssignmentContext';
import { X } from 'lucide-react';

export const Workspace2Navigator: React.FC = () => {
  const { quickNavOpen, setQuickNavOpen, navigateTo } = useAssignment();

  if (!quickNavOpen) return null;

  const screens = [
    { id: '01', name: 'Assignment Dashboard' },
    { id: '02', name: 'Assignment Queue' },
    { id: '03', name: 'Inspection Assignment Preview' },
    { id: '04', name: 'Assign Inspection Team (Main)' },
    { id: '05', name: 'Team Assignment Detail' },
    { id: '06', name: 'Add Team Member (Drawer)' },
    { id: '07', name: 'Inspector / Specialist Profile' },
    { id: '08', name: 'Pre-Inspection Context Brief' },
    { id: '09', name: 'Team Validation Engine (8 Checks)' },
    { id: '10', name: 'Assignment Confirmation Modal' },
    { id: '11', name: 'Assignment Success / Handoff' },
    { id: '12', name: 'Assignment History' },
    { id: '13', name: 'Reassign Inspection Personnel' },
    { id: '14', name: 'Reassignment Confirmation' },
    { id: '15', name: 'Inspector Availability Matrix' },
    { id: '16', name: 'Active Team Assignments' },
    { id: '17', name: 'Assignment Audit & Activity' },
    { id: '18', name: 'Inspector Acceptance / Decline' },
    { id: '19', name: 'Assignment Conflict Resolver' },
    { id: '20', name: '10 Enterprise States Gallery' }
  ];

  return (
    <div className="modal-backdrop" onClick={() => setQuickNavOpen(false)}>
      <div className="modal-dialog" style={{ maxWidth: '780px' }} onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3 className="modal-title">Jump to Workspace 02 Screen (01 — 20)</h3>
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
                <span className="quick-nav-code">WS02 &bull; SCREEN {s.id}</span>
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
