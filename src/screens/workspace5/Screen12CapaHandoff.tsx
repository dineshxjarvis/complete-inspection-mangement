"use client";

import React, { useState } from 'react';
import { useRegulatoryAction } from '../../context/RegulatoryActionContext';
import {
  CheckSquare,
  AlertTriangle,
  ArrowRight,
  ChevronLeft,
  Building,
  User,
  Calendar,
  Shield,
  FileCheck,
  CheckCircle2,
  Lock,
  Layers
} from 'lucide-react';

export const Screen12CapaHandoff: React.FC = () => {
  const {
    activeFinding,
    createCapaHandoff,
    navigateTo,
    showToast
  } = useRegulatoryAction();

  const [department, setDepartment] = useState<string>('Ventilation Department');
  const [responsiblePerson, setResponsiblePerson] = useState<string>('Er. S. K. Mahapatra (Chief Ventilation Engineer)');
  const [dueDate, setDueDate] = useState<string>('30 Nov 2026');
  const [actions, setActions] = useState<string[]>([
    'Execute comprehensive louvre aperture descaling and aerodynamic alignment',
    'Perform calibrated digital anemometer 9-grid traverse post-repair velocity validation',
    'Revise Overman weekly return airway inspection SOP to include ultrasonic sensor logs'
  ]);

  const handleCreateCapa = (e: React.FormEvent) => {
    e.preventDefault();
    createCapaHandoff(activeFinding.id, {
      department,
      person: responsiblePerson,
      dueDate,
      actions
    });
  };

  return (
    <div className="screen-content">
      {/* Screen Header */}
      <div className="screen-header">
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
            <button
              className="btn btn-secondary btn-sm"
              onClick={() => navigateTo('10')}
              style={{ padding: '3px 8px' }}
            >
              <ChevronLeft size={13} />
              <span>Back to Response Review</span>
            </button>
            <span
              className="id-badge font-mono"
              style={{
                fontSize: '12px',
                fontWeight: 700,
                background: 'rgba(63, 81, 181, 0.15)',
                color: '#1A237E'
              }}
            >
              FINDING &rarr; CAPA HANDOFF
            </span>
          </div>
          <h1 className="screen-title" style={{ margin: 0 }}>
            CREATE CORRECTIVE ACTION & HANDOFF TO WORKSPACE 06
          </h1>
          <p className="screen-subtitle">
            Formal transition of statutory non-compliance into an operational CAPA tracked for execution & independent verification
          </p>
        </div>
      </div>

      <form onSubmit={handleCreateCapa}>
        <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: '20px', marginBottom: '30px' }}>
          {/* Left Column: CAPA Specifications */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {/* CAPA Decision Rationale */}
            <div className="card" style={{ padding: '18px', borderLeft: '4px solid #1A237E', background: '#E8EAF6' }}>
              <div style={{ fontSize: '11px', fontWeight: 800, color: '#1A237E', textTransform: 'uppercase' }}>
                STATUTORY DETERMINATION
              </div>
              <h2 style={{ margin: '4px 0 8px', fontSize: '15px', fontWeight: 800, color: '#1A237E' }}>
                CAPA Mandatory Required for {activeFinding.id}
              </h2>
              <div style={{ display: 'flex', gap: '16px', fontSize: '12px', color: '#303F9F' }}>
                <span>✓ High Severity Finding</span>
                <span>✓ CMR 2017 Reg 153(2)(b) Requirement</span>
                <span>✓ 4 Historical Recurrences</span>
              </div>
            </div>

            {/* SECTION: PROPOSED ACTION MILESTONES */}
            <div className="card" style={{ padding: '18px' }}>
              <h3 style={{ margin: '0 0 12px', fontSize: '13px', fontWeight: 800, textTransform: 'uppercase', color: 'var(--text-primary)' }}>
                Committed Remedial Action Milestones
              </h3>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {actions.map((act, idx) => (
                  <div key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', background: 'var(--bg-surface-alt)', padding: '10px 12px', borderRadius: '6px', fontSize: '12.5px' }}>
                    <span
                      style={{
                        background: '#1A237E',
                        color: '#FFF',
                        fontSize: '10.5px',
                        fontWeight: 700,
                        padding: '2px 6px',
                        borderRadius: '4px'
                      }}
                    >
                      ACT-0{idx + 1}
                    </span>
                    <span style={{ color: 'var(--text-primary)', lineHeight: 1.4 }}>{act}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* SECTION: OWNERSHIP & DEADLINE */}
            <div className="card" style={{ padding: '18px' }}>
              <h3 style={{ margin: '0 0 12px', fontSize: '13px', fontWeight: 800, textTransform: 'uppercase', color: 'var(--text-primary)' }}>
                Operational Ownership & Target Date
              </h3>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, marginBottom: '6px' }}>
                    Responsible Department *
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    value={department}
                    onChange={e => setDepartment(e.target.value)}
                    required
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, marginBottom: '6px' }}>
                    Responsible Engineer *
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    value={responsiblePerson}
                    onChange={e => setResponsiblePerson(e.target.value)}
                    required
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, marginBottom: '6px' }}>
                    Target Completion Date *
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    value={dueDate}
                    onChange={e => setDueDate(e.target.value)}
                    required
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, marginBottom: '6px' }}>
                    Assigned Independent Verifier
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    value="Er. T. Bannerjee (DGMS Panel)"
                    readOnly
                    style={{ background: 'var(--bg-surface-alt)' }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Required Evidence & Handoff Action */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {/* Required Evidence Checklist */}
            <div className="card" style={{ padding: '18px' }}>
              <h3 style={{ margin: '0 0 12px', fontSize: '13px', fontWeight: 800, textTransform: 'uppercase', color: 'var(--text-primary)' }}>
                Mandatory Verification Artifacts
              </h3>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '12px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '6px 10px', background: 'var(--bg-surface-alt)', borderRadius: '4px' }}>
                  <CheckCircle2 size={13} color="#2E7D32" />
                  <span>Engineering Louvre Repair Report</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '6px 10px', background: 'var(--bg-surface-alt)', borderRadius: '4px' }}>
                  <CheckCircle2 size={13} color="#2E7D32" />
                  <span>Calibrated Post-Repair Measurement Sheet (&ge; 5.5 m/s)</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '6px 10px', background: 'var(--bg-surface-alt)', borderRadius: '4px' }}>
                  <CheckCircle2 size={13} color="#2E7D32" />
                  <span>Photographic Proof with GPS Timestamp</span>
                </div>
              </div>
            </div>

            {/* Handoff Callout */}
            <div
              className="card"
              style={{
                padding: '16px',
                background: 'linear-gradient(135deg, #E8EAF6 0%, #C5CAE9 100%)',
                border: '1px solid #9FA8DA'
              }}
            >
              <div style={{ fontSize: '12px', fontWeight: 800, color: '#1A237E', textTransform: 'uppercase', marginBottom: '4px' }}>
                WORKSPACE 06 HANDOFF POINT
              </div>
              <p style={{ margin: '0 0 14px', fontSize: '12px', color: '#1A237E', lineHeight: 1.4 }}>
                Creating this CAPA registers the corrective plan into STRATA and routes it to <strong>Workspace 06 (Corrective Action & Independent Verification)</strong> for milestone execution.
              </p>

              <button
                type="submit"
                className="btn btn-primary"
                style={{ width: '100%', background: '#1A237E', borderColor: '#303F9F', justifyContent: 'center' }}
              >
                <CheckSquare size={14} />
                <span>Create CAPA & Handoff to WS06 &rarr;</span>
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};
