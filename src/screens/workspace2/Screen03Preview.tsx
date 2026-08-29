"use client";

import React from 'react';
import { useAssignment } from '../../context/AssignmentContext';
import { UserPlus, ArrowRight, FileText } from 'lucide-react';

export const Screen03Preview: React.FC = () => {
  const { inspections, activeInspectionId, navigateTo } = useAssignment();
  const insp = inspections.find(i => i.id === activeInspectionId) || inspections[0];

  return (
    <div className="content-container">
      <div className="breadcrumb-bar">
        <span className="crumb-link" onClick={() => navigateTo('01')}>Dashboard</span>
        <span className="breadcrumb-sep">/</span>
        <span className="crumb-link" onClick={() => navigateTo('02')}>Assignment Queue</span>
        <span className="breadcrumb-sep">/</span>
        <span className="breadcrumb-current">{insp.id} Preparation</span>
      </div>

      <div className="screen-header-row">
        <div className="screen-header-left">
          <h1 className="screen-title">
            <span className="font-mono" style={{ color: 'var(--purple-primary)' }}>{insp.id}</span>
            <span>Inspection Assignment Preparation</span>
            <span className="badge badge-planned"><span className="badge-dot" />READY FOR ASSIGNMENT</span>
          </h1>
          <p className="screen-subtitle">
            Review statutory objective, required team competencies, instruments, PPE, and historical context before initiating personnel assignment.
          </p>
        </div>
        <div className="screen-actions">
          <button className="btn btn-primary" onClick={() => navigateTo('04', { inspectionId: insp.id })}>
            <UserPlus size={14} /> Start Team Assignment &rarr;
          </button>
        </div>
      </div>

      {/* Identity Strip */}
      <div className="identity-strip">
        <div className="identity-grid">
          <div className="identity-field">
            <span className="identity-label">AUTHORITY</span>
            <span className="identity-val">{insp.authority.split('/')[0]}</span>
          </div>
          <div className="identity-field">
            <span className="identity-label">TRACK</span>
            <span className="identity-val">{insp.track}</span>
          </div>
          <div className="identity-field">
            <span className="identity-label">INSPECTION TYPE</span>
            <span className="identity-val">{insp.inspectionType}</span>
          </div>
          <div className="identity-field">
            <span className="identity-label">ORGANIZATIONAL SCOPE</span>
            <span className="identity-val font-mono">{insp.holding} / {insp.subsidiary} / {insp.area} / {insp.mine.split('(')[0]}</span>
          </div>
          <div className="identity-field">
            <span className="identity-label">RISK LEVEL</span>
            <span className="badge badge-high">{insp.risk}</span>
          </div>
        </div>
      </div>

      {/* 4 Structured Sections */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
        
        {/* Section 1: Inspection Summary */}
        <div className="enterprise-card" style={{ marginBottom: 0 }}>
          <div className="card-header">
            <span className="card-title">1. Inspection Summary & Target Schedule</span>
          </div>
          <div className="card-body" style={{ fontSize: '12px' }}>
            <div style={{ marginBottom: '8px' }}>
              <div style={{ fontSize: '10px', color: 'var(--text-muted)', fontWeight: 700 }}>OBJECTIVE</div>
              <div style={{ marginTop: '2px', fontWeight: 600 }}>{insp.objective}</div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', marginTop: '10px' }}>
              <div>
                <div style={{ fontSize: '10px', color: 'var(--text-muted)', fontWeight: 700 }}>SCHEDULED DATE</div>
                <div className="font-mono">{insp.scheduledDate}</div>
              </div>
              <div>
                <div style={{ fontSize: '10px', color: 'var(--text-muted)', fontWeight: 700 }}>TIME WINDOW & SHIFT</div>
                <div className="font-mono">{insp.scheduledTime} ({insp.shift})</div>
              </div>
            </div>
            <div style={{ marginTop: '10px' }}>
              <div style={{ fontSize: '10px', color: 'var(--text-muted)', fontWeight: 700 }}>LOCATION CIRCUIT</div>
              <div className="font-mono" style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>{insp.location}</div>
            </div>
          </div>
        </div>

        {/* Section 2: Team Requirements */}
        <div className="enterprise-card" style={{ marginBottom: 0 }}>
          <div className="card-header">
            <span className="card-title">2. Team Competency & Statutory Authorization Requirements</span>
          </div>
          <div className="card-body" style={{ fontSize: '12px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 10px', background: 'var(--bg-surface-alt)', borderRadius: '3px' }}>
                <span>Lead Inspector (First Class Mine Manager)</span>
                <span className="badge badge-critical">Required (Mandatory)</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 10px', background: 'var(--bg-surface-alt)', borderRadius: '3px' }}>
                <span>Supporting Inspector</span>
                <span className="badge badge-draft">Optional</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 10px', background: 'var(--bg-surface-alt)', borderRadius: '3px' }}>
                <span>Required Competencies: {insp.requiredTeam.competencyList.join(', ')}</span>
                <span className="badge badge-approved">Mandated by CMR 2017</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 10px', background: 'var(--bg-surface-alt)', borderRadius: '3px' }}>
                <span>Required Authorization: Inspection Execution & Specialist Participation</span>
                <span className="badge badge-draft">Scope: Area 01</span>
              </div>
            </div>
          </div>
        </div>

        {/* Section 3: Preparation Requirements */}
        <div className="enterprise-card" style={{ marginBottom: 0 }}>
          <div className="card-header">
            <span className="card-title">3. Equipment, PPE & Statutory Document Requirements</span>
          </div>
          <div className="card-body" style={{ fontSize: '11.5px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <div>
                <div style={{ fontSize: '10px', color: 'var(--text-muted)', fontWeight: 700 }}>REQUIRED INSTRUMENTS</div>
                <div style={{ color: 'var(--text-secondary)' }}>{insp.preparation.instruments.join(', ')}</div>
              </div>
              <div>
                <div style={{ fontSize: '10px', color: 'var(--text-muted)', fontWeight: 700 }}>MANDATORY PPE</div>
                <div style={{ color: 'var(--text-secondary)' }}>{insp.preparation.ppe.join(', ')}</div>
              </div>
              <div>
                <div style={{ fontSize: '10px', color: 'var(--text-muted)', fontWeight: 700 }}>DOCUMENTS TO VERIFY</div>
                <div style={{ color: 'var(--text-secondary)' }}>{insp.preparation.documents.join(', ')}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Section 4: Previous Context */}
        <div className="enterprise-card" style={{ marginBottom: 0 }}>
          <div className="card-header">
            <span className="card-title">4. Historical Finding Context & Repeat Issues</span>
          </div>
          <div className="card-body" style={{ fontSize: '12px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', marginBottom: '10px' }}>
              <div>
                <div style={{ fontSize: '10px', color: 'var(--text-muted)', fontWeight: 700 }}>PREVIOUS FINDINGS</div>
                <strong style={{ fontSize: '14px', color: 'var(--status-red-text)' }}>{insp.previousContext.findingsCount} Logged</strong>
              </div>
              <div>
                <div style={{ fontSize: '10px', color: 'var(--text-muted)', fontWeight: 700 }}>OPEN CAPAS</div>
                <strong style={{ fontSize: '14px', color: 'var(--status-orange-text)' }}>{insp.previousContext.openCapaCount} Active</strong>
              </div>
            </div>
            <div style={{ background: '#FFF3E0', border: '1px solid #FFE0B2', padding: '8px 10px', borderRadius: '3px' }}>
              <div style={{ fontSize: '10px', fontWeight: 700, color: '#E65100' }}>REPEAT NON-COMPLIANCE SIGNAL:</div>
              <div style={{ fontSize: '11.5px', color: '#5D4037', marginTop: '2px' }}>{insp.previousContext.repeatIssue}</div>
            </div>
          </div>
        </div>

      </div>

      {/* Bottom Action Strip */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#FFF', border: '1px solid var(--border-color)', padding: '12px 18px', borderRadius: '4px', marginBottom: '30px' }}>
        <button className="btn btn-secondary" onClick={() => navigateTo('08', { inspectionId: insp.id })}>
          <FileText size={14} /> View Pre-Inspection Context
        </button>
        <button className="btn btn-primary" onClick={() => navigateTo('04', { inspectionId: insp.id })}>
          Start Team Assignment &rarr;
        </button>
      </div>

    </div>
  );
};
