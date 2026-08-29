"use client";

import React, { useState } from 'react';
import { useMineResponse } from '../../context/MineResponseContext';
import { MineResponseScreenId } from '../../types/mineResponse';
import {
  Search,
  X,
  LayoutDashboard,
  Inbox,
  FileText,
  CheckSquare,
  Eye,
  Camera,
  AlertOctagon,
  AlertTriangle,
  FileCheck,
  Send,
  GitBranch,
  Clock,
  ShieldAlert,
  Calendar,
  Paperclip,
  RotateCcw,
  History,
  Shield
} from 'lucide-react';

interface ScreenDef {
  id: MineResponseScreenId;
  title: string;
  category: 'Dashboard & Core' | 'Inspections & Checks' | 'Observations & Evidence' | 'Findings & Responses' | 'CAPA & Safety Actions' | 'Historical & Audit';
  icon: any;
  description: string;
}

const SCREENS: ScreenDef[] = [
  { id: '01', title: 'Screen 01: Mine Response Dashboard', category: 'Dashboard & Core', icon: LayoutDashboard, description: 'Primary KPI cards, action required alerts, and recent inspections.' },
  { id: '02', title: 'Screen 02: Mine Inspections List', category: 'Inspections & Checks', icon: Inbox, description: 'Mine A2 scheduled, active, and completed statutory inspections.' },
  { id: '03', title: 'Screen 03: Mine Inspection Details', category: 'Inspections & Checks', icon: FileText, description: 'Read-only + response-aware inspection dossier with statutory lock.' },
  { id: '04', title: 'Screen 04: Inspection Checklist View', category: 'Inspections & Checks', icon: CheckSquare, description: 'Mine-side immutable 22-item checklist review.' },
  { id: '05', title: 'Screen 05: Observation Details', category: 'Observations & Evidence', icon: Eye, description: 'OBS-2026-00482 airflow deficiency reading and instrument log.' },
  { id: '06', title: 'Screen 06: Inspection Evidence', category: 'Observations & Evidence', icon: Camera, description: 'Read-only photo & measurement evidence gallery with SHA-256 hashes.' },
  { id: '07', title: 'Screen 07: Mine Findings Overview', category: 'Findings & Responses', icon: AlertOctagon, description: 'Severity-tagged findings summary (Critical 1, High 1, Medium 1).' },
  { id: '08', title: 'Screen 08: Finding Details', category: 'Findings & Responses', icon: AlertTriangle, description: 'Complete 7-section regulatory traceability dossier for FND-2026-00127.' },
  { id: '09', title: 'Screen 09: Mine Response Authoring', category: 'Findings & Responses', icon: FileCheck, description: 'Formulate explanation, immediate action, root cause, and corrective action.' },
  { id: '10', title: 'Screen 10: Response Review & Submit', category: 'Findings & Responses', icon: Send, description: 'Pre-submission validation checklist and statutory declaration.' },
  { id: '10A', title: 'Screen 10A: Response Submitted Success', category: 'Findings & Responses', icon: Shield, description: 'Official response receipt with digital signature hash.' },
  { id: '11', title: 'Screen 11: Mine Response History', category: 'Findings & Responses', icon: GitBranch, description: 'Version timeline and diff history across official revisions.' },
  { id: '12', title: 'Screen 12: CAPA Overview', category: 'CAPA & Safety Actions', icon: CheckSquare, description: 'Operational CAPA tracking table with ownership and target dates.' },
  { id: '13', title: 'Screen 13: CAPA Details', category: 'CAPA & Safety Actions', icon: FileText, description: 'CAPA-2026-0048 progress breakdown, sub-actions, and required evidence.' },
  { id: '14', title: 'Screen 14: Overdue Actions', category: 'CAPA & Safety Actions', icon: Clock, description: 'Escalation matrix and days overdue counter for delayed actions.' },
  { id: '15', title: 'Screen 15: Safety Action Center', category: 'CAPA & Safety Actions', icon: ShieldAlert, description: 'Unified command center for high-risk statutory safety obligations.' },
  { id: '16', title: 'Screen 16: Upcoming Inspections', category: 'Inspections & Checks', icon: Calendar, description: 'Advance preparation checklist and scheduled statutory audits.' },
  { id: '17', title: 'Screen 17: Mine Document & Evidence Submission', category: 'Observations & Evidence', icon: Paperclip, description: 'Upload maintenance certificates, logs, and verification proof.' },
  { id: '18', title: 'Screen 18: CAPA Progress Update', category: 'CAPA & Safety Actions', icon: RotateCcw, description: 'Update progress percentage, blocked reasons, and submit for verification.' },
  { id: '19', title: 'Screen 19: Mine Inspection History', category: 'Historical & Audit', icon: History, description: 'Multi-year statutory compliance record archive.' },
  { id: '20', title: 'Screen 20: Mine Audit & Activity Trail', category: 'Historical & Audit', icon: Shield, description: 'Immutable chronological state transition ledger with tamper-proof hashes.' }
];

export const Workspace4Navigator: React.FC = () => {
  const { quickNavOpen, setQuickNavOpen, navigateTo } = useMineResponse();
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
        backgroundColor: 'rgba(10, 20, 25, 0.75)',
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
          backgroundColor: '#1E2530',
          borderColor: 'rgba(0, 150, 136, 0.4)',
          boxShadow: '0 20px 40px rgba(0,0,0,0.6)',
          display: 'flex',
          flexDirection: 'column',
          padding: 0,
          overflow: 'hidden'
        }}
        onClick={e => e.stopPropagation()}
      >
        {/* Header with Search */}
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
            placeholder="Search Workspace 04 screens (e.g. Findings, CAPA, Response, Checklist, Screen 08)..."
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
              color: '#A0AEC0',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center'
            }}
          >
            <X size={18} />
          </button>
        </div>

        {/* Screen Categories & List */}
        <div style={{ overflowY: 'auto', padding: '16px 20px', flex: 1 }}>
          {categories.length === 0 ? (
            <div style={{ padding: '30px', textAlign: 'center', color: '#A0AEC0' }}>
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
                            e.currentTarget.style.background = 'rgba(0, 150, 136, 0.15)';
                            e.currentTarget.style.borderColor = '#26A69A';
                          }}
                          onMouseLeave={e => {
                            e.currentTarget.style.background = 'rgba(255, 255, 255, 0.04)';
                            e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.08)';
                          }}
                        >
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                            <Icon size={14} color="#4DB6AC" />
                            <span style={{ color: '#E0F2F1', fontSize: '12px', fontWeight: 600 }}>
                              {screen.title}
                            </span>
                          </div>
                          <p style={{ margin: 0, fontSize: '11px', color: '#90A4AE', lineHeight: 1.3 }}>
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
            color: '#78909C'
          }}
        >
          <span>Tip: Press <kbd style={{ background: '#37474F', padding: '1px 4px', borderRadius: '3px', color: '#FFF' }}>Ctrl+K</kbd> anywhere to open Quick Screen Navigator</span>
          <span style={{ color: '#4DB6AC', fontWeight: 600 }}>Workspace 04 &bull; 20 Interactive Screens</span>
        </div>
      </div>
    </div>
  );
};
