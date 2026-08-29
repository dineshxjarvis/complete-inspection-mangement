"use client";

import React, { useState } from 'react';
import { useCorrectiveAction } from '../../context/CorrectiveActionContext';
import { CorrectiveScreenId } from '../../types/correctiveAction';
import {
  Search,
  X,
  LayoutDashboard,
  CheckSquare,
  ListTodo,
  Layers,
  PlayCircle,
  FileUp,
  FileText,
  ShieldAlert,
  Clock,
  RotateCcw,
  ShieldCheck,
  Send,
  History,
  CheckCircle,
  Activity
} from 'lucide-react';

interface ScreenDef {
  id: CorrectiveScreenId;
  title: string;
  category: 'Dashboard & Queue' | 'Planning & Details' | 'Execution & Evidence' | 'Blockers & Compliance' | 'Verification & Audit';
  icon: any;
  description: string;
}

const SCREENS: ScreenDef[] = [
  { id: '01', title: 'Screen 01: CAPA Dashboard', category: 'Dashboard & Queue', icon: LayoutDashboard, description: 'Primary 8 KPI cards, priority queue, overdue alerts, and recent activity.' },
  { id: '02', title: 'Screen 02: My Corrective Actions', category: 'Dashboard & Queue', icon: CheckSquare, description: 'Filterable action queue with status tabs (Assigned, In Progress, Blocked, Due Soon).' },
  { id: '03', title: 'Screen 03: CAPA Intake & Source Context', category: 'Planning & Details', icon: ListTodo, description: 'Understand source finding FND-2026-00127, regulatory basis, and accept action.' },
  { id: '04', title: 'Screen 04: Central CAPA Details Dossier', category: 'Planning & Details', icon: Layers, description: 'Comprehensive 8-section working record for CAPA-2026-0048.' },
  { id: '05', title: 'Screen 05: CAPA Action Plan & Tasks', category: 'Planning & Details', icon: ListTodo, description: 'Hierarchical task breakdown, start/due dates, dependencies, and evidence requirements.' },
  { id: '06', title: 'Screen 06: Update Progress & Milestones', category: 'Execution & Evidence', icon: PlayCircle, description: 'Percentage slider, status selector, blocker logs, and comments.' },
  { id: '07', title: 'Screen 07: Enterprise Evidence Upload', category: 'Execution & Evidence', icon: FileUp, description: 'Specialized upload for reports, GPS photos, and calibrated measurements.' },
  { id: '08', title: 'Screen 08: Evidence Review by Action Owner', category: 'Execution & Evidence', icon: FileText, description: 'Evidence gallery with SHA-256 integrity hashes and status tags.' },
  { id: '09', title: 'Screen 09: Action Blocked Workflow', category: 'Blockers & Compliance', icon: ShieldAlert, description: 'Formal blocker reason declaration, extension request, and manager approval.' },
  { id: '10', title: 'Screen 10: Request Clarification', category: 'Blockers & Compliance', icon: Clock, description: 'Technical clarification thread with Workspace 05 assignment authority.' },
  { id: '11', title: 'Screen 11: Returned Corrective Action', category: 'Blockers & Compliance', icon: RotateCcw, description: 'Verifier return notes ("Missing post-repair measurement") and resubmission.' },
  { id: '12', title: 'Screen 12: Compliance Status & Gap Analysis', category: 'Blockers & Compliance', icon: ShieldCheck, description: 'Traceability visualizer and gap status ("Not Yet Verified").' },
  { id: '13', title: 'Screen 13: Submit CAPA for Verification', category: 'Verification & Audit', icon: Send, description: 'Pre-submission validation checklist, owner declaration, and handoff gate.' },
  { id: '14', title: 'Screen 14: CAPA Chronological History', category: 'Verification & Audit', icon: History, description: 'Non-destructive event timeline tracing every milestone from intake to verification.' },
  { id: '15', title: 'Screen 15: CAPA Audit & Activity Ledger', category: 'Verification & Audit', icon: Activity, description: 'Filterable tamper-proof audit trail with cryptographic hashes.' },
  { id: '16', title: 'Screen 16: Master CAPA Register', category: 'Dashboard & Queue', icon: Layers, description: 'Enterprise-wide corrective actions register across all mines and departments.' },
  { id: '17', title: 'Screen 17: Completed Actions Queue', category: 'Verification & Audit', icon: CheckCircle, description: 'Enforces clear boundary: Completed by Owner ≠ Verified ≠ Closed.' },
  { id: '18', title: 'Screen 18: Verification Handoff Summary', category: 'Verification & Audit', icon: Send, description: 'Complete handoff card with verified measurement (5.9 m/s) and Workspace 07 link.' }
];

export const Workspace6Navigator: React.FC = () => {
  const { quickNavOpen, setQuickNavOpen, navigateTo } = useCorrectiveAction();
  const [searchTerm, setSearchTerm] = useState('');

  if (!quickNavOpen) return null;

  const filteredScreens = SCREENS.filter(
    s =>
      s.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.id.includes(searchTerm)
  );

  const categories = Array.from(new Set(filteredScreens.map(s => s.category)));

  return (
    <div
      className="modal-backdrop"
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(10, 25, 20, 0.8)',
        backdropFilter: 'blur(4px)',
        zIndex: 999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px'
      }}
      onClick={() => setQuickNavOpen(false)}
    >
      <div
        className="card"
        style={{
          width: '100%',
          maxWidth: '860px',
          maxHeight: '85vh',
          backgroundColor: '#0D2622',
          borderColor: 'rgba(0, 150, 136, 0.4)',
          boxShadow: '0 20px 40px rgba(0,0,0,0.6)',
          display: 'flex',
          flexDirection: 'column',
          padding: 0,
          overflow: 'hidden'
        }}
        onClick={e => e.stopPropagation()}
      >
        {/* Search Header */}
        <div
          style={{
            padding: '16px 20px',
            borderBottom: '1px solid rgba(255,255,255,0.1)',
            display: 'flex',
            alignItems: 'center',
            gap: '12px'
          }}
        >
          <Search size={18} color="#80CBC4" />
          <input
            type="text"
            placeholder="Search Workspace 06 screens (e.g. Intake, Action Plan, Evidence, Blocker, Verification, Screen 04)..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            autoFocus
            style={{
              flex: 1,
              background: 'transparent',
              border: 'none',
              color: '#FFFFFF',
              fontSize: '14px',
              outline: 'none',
              fontFamily: 'inherit'
            }}
          />
          <button
            onClick={() => setQuickNavOpen(false)}
            style={{
              background: 'none',
              border: 'none',
              color: '#80CBC4',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center'
            }}
          >
            <X size={18} />
          </button>
        </div>

        {/* Categories & Screen Grid */}
        <div style={{ overflowY: 'auto', padding: '16px 20px', flex: 1 }}>
          {categories.length === 0 ? (
            <div style={{ padding: '30px', textAlign: 'center', color: '#80CBC4' }}>
              No screens found matching "{searchTerm}"
            </div>
          ) : (
            categories.map(category => (
              <div key={category} style={{ marginBottom: '18px' }}>
                <div
                  style={{
                    fontSize: '11px',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    letterSpacing: '0.08em',
                    color: '#80CBC4',
                    marginBottom: '8px'
                  }}
                >
                  {category}
                </div>
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
                    gap: '8px'
                  }}
                >
                  {filteredScreens
                    .filter(s => s.category === category)
                    .map(screen => {
                      const Icon = screen.icon;
                      return (
                        <div
                          key={screen.id}
                          onClick={() => {
                            navigateTo(screen.id);
                            setQuickNavOpen(false);
                          }}
                          style={{
                            padding: '10px 12px',
                            background: 'rgba(255, 255, 255, 0.04)',
                            border: '1px solid rgba(255, 255, 255, 0.08)',
                            borderRadius: '6px',
                            cursor: 'pointer',
                            transition: 'all 0.15s ease'
                          }}
                          onMouseEnter={e => {
                            e.currentTarget.style.background = 'rgba(0, 150, 136, 0.25)';
                            e.currentTarget.style.borderColor = '#4DB6AC';
                          }}
                          onMouseLeave={e => {
                            e.currentTarget.style.background = 'rgba(255, 255, 255, 0.04)';
                            e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.08)';
                          }}
                        >
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                            <Icon size={14} color="#B2DFDB" />
                            <span style={{ color: '#E0F2F1', fontSize: '12px', fontWeight: 600 }}>
                              {screen.title}
                            </span>
                          </div>
                          <p style={{ margin: 0, fontSize: '11px', color: '#80CBC4', lineHeight: 1.3 }}>
                            {screen.description}
                          </p>
                        </div>
                      );
                    })}
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div
          style={{
            padding: '10px 20px',
            background: 'rgba(0,0,0,0.3)',
            borderTop: '1px solid rgba(255,255,255,0.08)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            fontSize: '11px',
            color: '#80CBC4'
          }}
        >
          <span>Tip: Press <kbd style={{ background: '#004D40', padding: '1px 4px', borderRadius: '3px', color: '#FFF' }}>Ctrl+K</kbd> anywhere to open Navigator</span>
          <span style={{ color: '#E0F2F1', fontWeight: 600 }}>Workspace 06 &bull; 18 Corrective Action & Compliance Screens</span>
        </div>
      </div>
    </div>
  );
};
