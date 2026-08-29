"use client";

import React from 'react';
import { useFieldInspection } from '../../context/FieldInspectionContext';
import {
  Play,
  Pause,
  Camera,
  Eye,
  CheckSquare,
  AlertOctagon,
  Users,
  ShieldCheck,
  RefreshCw,
  Clock,
  MapPin,
  Wifi,
  ChevronRight,
  TrendingUp,
  FileText
} from 'lucide-react';

export const Screen06ExecutionOverview: React.FC = () => {
  const {
    activeInspection,
    checklistItems,
    observations,
    evidenceList,
    proposedFindings,
    navigateTo,
    isOnline,
    lastSyncTime
  } = useFieldInspection();

  const completedCount = checklistItems.filter(c => c.status !== 'Pending').length;
  const progressPercent = Math.round((completedCount / checklistItems.length) * 100);
  const measurementCount = checklistItems.filter(c => c.measurementValue).length;

  return (
    <div className="screen-content" style={{ paddingBottom: '90px' }}>
      {/* Header */}
      <div className="screen-header">
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span className="id-badge font-mono" style={{ fontSize: '11px', fontWeight: 700 }}>
              {activeInspection.id}
            </span>
            <span className="status-pill status-active">
              ● IN PROGRESS
            </span>
            <span className="badge badge-subtle">{activeInspection.mine} &bull; {activeInspection.seam}</span>
          </div>
          <h1 className="screen-title" style={{ marginTop: '4px' }}>
            FIELD EXECUTION OVERVIEW
          </h1>
          <p className="screen-subtitle">
            Live field cockpit: track statutory checklist progress, observations, instrument measurements, and team telemetry
          </p>
        </div>

        {/* Live Connectivity & Pause */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '6px 12px',
              borderRadius: '6px',
              background: isOnline ? 'var(--status-green-bg)' : 'var(--status-amber-bg)',
              color: isOnline ? 'var(--status-green-text)' : 'var(--status-amber-text)',
              fontSize: '12px',
              fontWeight: 600
            }}
          >
            <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: isOnline ? '#2E7D32' : '#F57C00' }} />
            <span>{isOnline ? 'ONLINE (10:42 Sync)' : 'OFFLINE MODE'}</span>
          </div>

          <button
            className="btn btn-secondary"
            onClick={() => navigateTo('11')}
            style={{ borderColor: '#F57C00', color: '#E65100' }}
          >
            <Pause size={14} />
            <span>Pause Inspection</span>
          </button>
        </div>
      </div>

      {/* Progress Bar Card */}
      <div className="card" style={{ marginBottom: '20px', padding: '18px 24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
          <div>
            <span style={{ fontSize: '14px', fontWeight: 700, color: 'var(--text-primary)' }}>
              Inspection Execution Progress: {completedCount} / {checklistItems.length} Checks Completed
            </span>
            <span style={{ marginLeft: '8px', fontSize: '12px', color: 'var(--text-muted)' }}>
              ({checklistItems.length - completedCount} checks remaining)
            </span>
          </div>
          <span style={{ fontSize: '18px', fontWeight: 800, color: '#FF6B00', fontFamily: 'monospace' }}>
            {progressPercent}%
          </span>
        </div>

        <div style={{ width: '100%', height: '10px', background: 'var(--bg-surface-subtle)', borderRadius: '5px', overflow: 'hidden' }}>
          <div
            style={{
              width: `${progressPercent}%`,
              height: '100%',
              background: 'linear-gradient(90deg, #FF6B00 0%, #FF8800 100%)',
              transition: 'width 0.4s ease'
            }}
          />
        </div>

        {/* Team Members in Session */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '14px', paddingTop: '12px', borderTop: '1px solid var(--border-color)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <span style={{ fontSize: '11.5px', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700 }}>
              Active Personnel:
            </span>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div style={{ width: '22px', height: '22px', borderRadius: '50%', background: '#E65100', color: '#FFF', fontSize: '10px', fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                RS
              </div>
              <span style={{ fontSize: '12px', fontWeight: 600 }}>R. Sharma (Lead Inspector &bull; ● Active)</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div style={{ width: '22px', height: '22px', borderRadius: '50%', background: '#311B92', color: '#FFF', fontSize: '10px', fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                KR
              </div>
              <span style={{ fontSize: '12px', fontWeight: 600 }}>K. Rao (Mechanical Specialist &bull; ● Active)</span>
            </div>
          </div>

          <button
            className="btn btn-secondary btn-sm"
            onClick={() => navigateTo('15')}
            style={{ fontSize: '11.5px' }}
          >
            <Users size={13} />
            <span>View Live Team Stream</span>
          </button>
        </div>
      </div>

      {/* Main Metric Cards Grid (8 Operational Tiles) */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: '14px',
          marginBottom: '20px'
        }}
      >
        <div
          className="kpi-card"
          onClick={() => navigateTo('07')}
          style={{ cursor: 'pointer', borderLeft: '3px solid #FF6B00' }}
        >
          <div className="kpi-label">Statutory Checklist</div>
          <div className="kpi-value" style={{ color: '#FF6B00' }}>{checklistItems.length}</div>
          <div className="kpi-meta">{completedCount} Verified &bull; {checklistItems.filter(c => c.status === 'Non-Compliant').length} Non-Compliant</div>
        </div>

        <div
          className="kpi-card"
          onClick={() => navigateTo('10')}
          style={{ cursor: 'pointer', borderLeft: '3px solid #5932A5' }}
        >
          <div className="kpi-label">Field Observations</div>
          <div className="kpi-value" style={{ color: '#5932A5' }}>{observations.length}</div>
          <div className="kpi-meta">7 Logged &bull; 3 Linked to Violations</div>
        </div>

        <div
          className="kpi-card"
          onClick={() => navigateTo('12')}
          style={{ cursor: 'pointer', borderLeft: '3px solid #1976D2' }}
        >
          <div className="kpi-label">Captured Evidence</div>
          <div className="kpi-value" style={{ color: '#1976D2' }}>{evidenceList.length}</div>
          <div className="kpi-meta">Photos, Documents, Readings</div>
        </div>

        <div
          className="kpi-card"
          onClick={() => navigateTo('08')}
          style={{ cursor: 'pointer', borderLeft: '3px solid #2E7D32' }}
        >
          <div className="kpi-label">Instrument Measurements</div>
          <div className="kpi-value" style={{ color: '#2E7D32' }}>{measurementCount}</div>
          <div className="kpi-meta">Anemometer, Gas, Torque, Gap</div>
        </div>

        <div
          className="kpi-card"
          onClick={() => navigateTo('13')}
          style={{ cursor: 'pointer', borderLeft: '3px solid #D32F2F' }}
        >
          <div className="kpi-label">Proposed Findings</div>
          <div className="kpi-value" style={{ color: '#D32F2F' }}>{proposedFindings.length}</div>
          <div className="kpi-meta">2 High Severity &bull; 1 Medium</div>
        </div>

        <div
          className="kpi-card"
          onClick={() => navigateTo('07')}
          style={{ cursor: 'pointer', borderLeft: '3px solid #7C4DFF' }}
        >
          <div className="kpi-label">Ad-hoc Checks</div>
          <div className="kpi-value" style={{ color: '#7C4DFF' }}>1</div>
          <div className="kpi-meta">Heading 7E Slurry Cleaned</div>
        </div>

        <div
          className="kpi-card"
          onClick={() => navigateTo('03')}
          style={{ cursor: 'pointer', borderLeft: '3px solid #F57C00' }}
        >
          <div className="kpi-label">Previous Findings</div>
          <div className="kpi-value" style={{ color: '#F57C00' }}>3</div>
          <div className="kpi-meta">2 Closed &bull; 1 Open</div>
        </div>

        <div
          className="kpi-card"
          onClick={() => navigateTo('03')}
          style={{ cursor: 'pointer', borderLeft: '3px solid #E65100' }}
        >
          <div className="kpi-label">Open CAPA</div>
          <div className="kpi-value" style={{ color: '#E65100' }}>1</div>
          <div className="kpi-meta">CAPA-2026-018 (Stone Dust)</div>
        </div>
      </div>

      {/* Quick Launchpad Action Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', marginBottom: '20px' }}>
        <div
          className="card"
          onClick={() => navigateTo('07')}
          style={{
            padding: '16px',
            cursor: 'pointer',
            borderTop: '3px solid #FF6B00',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}
        >
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
              <CheckSquare size={16} color="#FF6B00" />
              <span style={{ fontSize: '13.5px', fontWeight: 700 }}>Continue Checklist</span>
            </div>
            <p style={{ margin: 0, fontSize: '11.5px', color: 'var(--text-muted)' }}>
              Resume 22 grouped statutory checks (Ventilation, Strata, Electrical)
            </p>
          </div>
          <ChevronRight size={18} color="var(--text-muted)" />
        </div>

        <div
          className="card"
          onClick={() => navigateTo('10')}
          style={{
            padding: '16px',
            cursor: 'pointer',
            borderTop: '3px solid #5932A5',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}
        >
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
              <Eye size={16} color="#5932A5" />
              <span style={{ fontSize: '13.5px', fontWeight: 700 }}>Record Observation</span>
            </div>
            <p style={{ margin: 0, fontSize: '11.5px', color: 'var(--text-muted)' }}>
              Log field observation and optionally escalate to Proposed Finding
            </p>
          </div>
          <ChevronRight size={18} color="var(--text-muted)" />
        </div>

        <div
          className="card"
          onClick={() => navigateTo('16')}
          style={{
            padding: '16px',
            cursor: 'pointer',
            borderTop: '3px solid #2E7D32',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}
        >
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
              <ShieldCheck size={16} color="#2E7D32" />
              <span style={{ fontSize: '13.5px', fontWeight: 700 }}>Field Self-Review</span>
            </div>
            <p style={{ margin: 0, fontSize: '11.5px', color: 'var(--text-muted)' }}>
              Perform mandatory 22/22 pre-submission validation & affirmations
            </p>
          </div>
          <ChevronRight size={18} color="var(--text-muted)" />
        </div>
      </div>

      {/* BOTTOM STICKY ACTION BAR */}
      <div
        style={{
          position: 'fixed',
          bottom: 0,
          left: 'var(--sidebar-width)',
          right: 0,
          background: 'var(--bg-surface)',
          borderTop: '1px solid var(--border-color)',
          padding: '12px 24px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          zIndex: 100,
          boxShadow: '0 -4px 16px rgba(0,0,0,0.08)'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <button
            className="btn btn-primary"
            onClick={() => navigateTo('07')}
            style={{ background: '#FF6B00', borderColor: '#FF6B00' }}
          >
            <CheckSquare size={14} />
            <span>Continue Checklist ({completedCount}/22)</span>
          </button>
          <button
            className="btn btn-secondary btn-sm"
            onClick={() => navigateTo('10')}
          >
            <Eye size={13} />
            <span>Add Observation</span>
          </button>
          <button
            className="btn btn-secondary btn-sm"
            onClick={() => navigateTo('12')}
          >
            <Camera size={13} />
            <span>Capture Evidence</span>
          </button>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <button
            className="btn btn-secondary btn-sm"
            onClick={() => navigateTo('11')}
            style={{ borderColor: '#F57C00', color: '#E65100' }}
          >
            <Pause size={13} />
            <span>Pause</span>
          </button>
          <button
            className="btn btn-secondary btn-sm"
            onClick={() => navigateTo('15')}
          >
            <Users size={13} />
            <span>Team Live</span>
          </button>
          <button
            className="btn btn-primary"
            onClick={() => navigateTo('16')}
            style={{ background: '#2E7D32', borderColor: '#2E7D32' }}
          >
            <ShieldCheck size={14} />
            <span>Self-Review & Submit</span>
          </button>
        </div>
      </div>
    </div>
  );
};
