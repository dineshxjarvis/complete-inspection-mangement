"use client";

import React, { useState } from 'react';
import { useFieldInspection } from '../../context/FieldInspectionContext';
import { FieldScreenId } from '../../types/fieldInspection';
import {
  X,
  Search,
  LayoutDashboard,
  Inbox,
  FileText,
  CheckSquare,
  PlayCircle,
  PauseCircle,
  Camera,
  Eye,
  AlertOctagon,
  RefreshCw,
  Users,
  ShieldCheck,
  RotateCcw,
  GitBranch,
  History,
  Archive
} from 'lucide-react';

interface ScreenMeta {
  id: FieldScreenId;
  name: string;
  desc: string;
  category: string;
  icon: any;
}

const SCREENS: ScreenMeta[] = [
  { id: '01', name: 'Field Inspection Dashboard', desc: 'Operational field cockpit, online status, attention cards & KPI metrics', category: 'Overview', icon: LayoutDashboard },
  { id: '02', name: 'My Inspections', desc: 'All assigned inspections with status tabs and multi-attribute filters', category: 'Overview', icon: Inbox },
  { id: '03', name: 'Pre-Inspection Brief', desc: '11-section comprehensive brief, regulatory traceability chain & instruments', category: 'Pre-Inspection', icon: FileText },
  { id: '04', name: 'Pre-Field Readiness Check', desc: 'Mandatory verification of PPE, calibrated instruments, scope & sync', category: 'Pre-Inspection', icon: CheckSquare },
  { id: '05', name: 'Start Inspection', desc: 'GPS detection, timestamp verification & statutory legal confirmation', category: 'Pre-Inspection', icon: PlayCircle },
  { id: '06', name: 'Inspection Execution Overview', desc: 'Live execution dashboard, progress tracker, counts grid & quick actions', category: 'Execution', icon: PlayCircle },
  { id: '07', name: 'Checklist (22 Checks)', desc: 'Grouped statutory checks (Ventilation, Strata, Electrical, Logs, Emergency)', category: 'Execution', icon: CheckSquare },
  { id: '08', name: 'Checklist Item Detail', desc: 'Measurement input, photo attachments, exact regulatory clauses & GPS', category: 'Execution', icon: FileText },
  { id: '09', name: 'N/A / Unable to Verify', desc: 'Mandatory justification modal & anti-silent-skip governance checks', category: 'Execution', icon: CheckSquare },
  { id: '10', name: 'Observation Capture', desc: 'Field observation recording, classification, severity & evidence linking', category: 'Evidence & Findings', icon: Eye },
  { id: '11', name: 'Pause Inspection', desc: 'Operational shift pause reason capture & state preservation', category: 'Execution Control', icon: PauseCircle },
  { id: '11A', name: 'Paused Inspection State', desc: 'Paused state snapshot, offline cache badge & safe resume conditions', category: 'Execution Control', icon: PauseCircle },
  { id: '12', name: 'Evidence Capture', desc: 'Camera simulator, GPS watermark, measurement gauges & document attachments', category: 'Evidence & Findings', icon: Camera },
  { id: '13', name: 'Proposed Finding Builder', desc: 'Convert observation to structured finding with linked regulation & evidence', category: 'Evidence & Findings', icon: AlertOctagon },
  { id: '14', name: 'Offline & Sync Center', desc: 'Offline mode toggle, pending upload queue, error resolver & retry engine', category: 'Connectivity & Sync', icon: RefreshCw },
  { id: '15', name: 'Team Activity & Conflict Resolver', desc: 'Multi-specialist live stream, section ownership & merge conflict resolution', category: 'Collaboration', icon: Users },
  { id: '16', name: 'Field Self-Review', desc: 'Mandatory 22/22 pre-submission validator, warnings check & statutory affirmation', category: 'Review & Submit', icon: ShieldCheck },
  { id: '17', name: 'Submission Confirmation', desc: 'Legal submission confirmation, warning disclaimer & formal handoff', category: 'Review & Submit', icon: ShieldCheck },
  { id: '17A', name: 'Inspection Submitted Success', desc: 'Handoff to Review & Approval, submission certificate & next actions', category: 'Review & Submit', icon: ShieldCheck },
  { id: '18', name: 'Returned Inspection', desc: 'Reviewer clarification remarks, remediation actions & resubmit loop', category: 'Correction Loop', icon: RotateCcw },
  { id: '19', name: 'Inspection Version History', desc: 'Immutable version comparison (v1, v2, v3) with change diffs', category: 'Audit & Governance', icon: GitBranch },
  { id: '20', name: 'Field Inspection Audit Trail', desc: 'Chronological immutable event ledger with actor, GPS, timestamps & states', category: 'Audit & Governance', icon: History },
  { id: '21', name: 'Completed Inspection History', desc: 'Historical archive of past completed inspections with full read-only detail', category: 'Archive', icon: Archive }
];

export const Workspace3Navigator: React.FC = () => {
  const { currentScreen, navigateTo, quickNavOpen, setQuickNavOpen } = useFieldInspection();
  const [searchTerm, setSearchTerm] = useState('');

  if (!quickNavOpen) return null;

  const filtered = SCREENS.filter(
    s =>
      s.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.desc.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div
      className="modal-backdrop"
      style={{ display: 'flex', zIndex: 10000 }}
      onClick={() => setQuickNavOpen(false)}
    >
      <div
        className="modal-dialog"
        style={{
          maxWidth: '780px',
          width: '90%',
          maxHeight: '85vh',
          display: 'flex',
          flexDirection: 'column',
          background: '#1A202C',
          color: '#F7FAFC',
          border: '1px solid #2D3748',
          borderRadius: '12px',
          boxShadow: '0 20px 48px rgba(0,0,0,0.6)'
        }}
        onClick={e => e.stopPropagation()}
      >
        <div
          className="modal-header"
          style={{
            borderBottom: '1px solid #2D3748',
            padding: '16px 20px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}
        >
          <div>
            <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 700, color: '#FFF', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ background: '#FF6B00', color: '#FFF', fontSize: '11px', padding: '2px 8px', borderRadius: '4px' }}>WS03</span>
              Field Inspection Screen Navigator (01—21)
            </h3>
            <p style={{ margin: '4px 0 0', fontSize: '12px', color: '#A0AEC0' }}>
              Quick jump to any operational screen in Workspace 03
            </p>
          </div>
          <button
            onClick={() => setQuickNavOpen(false)}
            style={{ background: 'none', border: 'none', color: '#A0AEC0', cursor: 'pointer' }}
          >
            <X size={20} />
          </button>
        </div>

        <div style={{ padding: '12px 20px', borderBottom: '1px solid #2D3748', background: '#12161F' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Search size={16} color="#A0AEC0" />
            <input
              type="text"
              placeholder="Search screen by name, number, or description... (e.g. 03, checklist, sync, pause, return)"
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              autoFocus
              style={{
                width: '100%',
                background: 'transparent',
                border: 'none',
                color: '#FFF',
                fontSize: '13.5px',
                outline: 'none'
              }}
            />
          </div>
        </div>

        <div
          style={{
            overflowY: 'auto',
            padding: '16px 20px',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(230px, 1fr))',
            gap: '10px'
          }}
        >
          {filtered.map(screen => {
            const Icon = screen.icon;
            const isCurrent = currentScreen === screen.id;
            return (
              <div
                key={screen.id}
                onClick={() => {
                  navigateTo(screen.id);
                  setQuickNavOpen(false);
                }}
                style={{
                  padding: '12px',
                  borderRadius: '8px',
                  border: `1px solid ${isCurrent ? '#FF6B00' : '#2D3748'}`,
                  background: isCurrent ? 'rgba(255, 107, 0, 0.15)' : '#242D3D',
                  cursor: 'pointer',
                  transition: 'all 0.15s ease',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '6px'
                }}
                onMouseEnter={e => {
                  if (!isCurrent) (e.currentTarget.style.borderColor = '#4A5568');
                }}
                onMouseLeave={e => {
                  if (!isCurrent) (e.currentTarget.style.borderColor = '#2D3748');
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span
                    style={{
                      fontSize: '11px',
                      fontWeight: 700,
                      color: isCurrent ? '#FF6B00' : '#CBD5E0',
                      fontFamily: 'monospace',
                      background: 'rgba(0,0,0,0.3)',
                      padding: '2px 6px',
                      borderRadius: '4px'
                    }}
                  >
                    SCREEN {screen.id}
                  </span>
                  <span style={{ fontSize: '10px', color: '#A0AEC0', background: 'rgba(255,255,255,0.06)', padding: '2px 6px', borderRadius: '4px' }}>
                    {screen.category}
                  </span>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '2px' }}>
                  <Icon size={16} color={isCurrent ? '#FF6B00' : '#A0AEC0'} />
                  <span style={{ fontSize: '13px', fontWeight: 600, color: '#FFF' }}>
                    {screen.name}
                  </span>
                </div>

                <p style={{ margin: 0, fontSize: '11px', color: '#A0AEC0', lineHeight: 1.3 }}>
                  {screen.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
