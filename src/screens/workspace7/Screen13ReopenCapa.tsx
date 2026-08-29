"use client";

import React, { useState } from 'react';
import { useVerification } from '../../context/VerificationContext';
import {
  RotateCcw,
  AlertTriangle,
  Calendar,
  ChevronLeft,
  ArrowRight,
  Send,
  ShieldAlert,
  Lock
} from 'lucide-react';

export const Screen13ReopenCapa: React.FC = () => {
  const {
    activeVerification,
    failVerification,
    navigateTo,
    showToast
  } = useVerification();

  const ver = activeVerification;

  const [newTargetDate, setNewTargetDate] = useState('10 Dec 2026');
  const [escalationRequired, setEscalationRequired] = useState(false);
  const [reworkInstruction, setReworkInstruction] = useState(
    'Execute secondary descaling and blade pitch re-alignment on Shaft 3 booster fan. Re-calibrate shutter guides and conduct calibrated 9-grid anemometer traverse to achieve >= 5.5 m/s.'
  );

  const handleReopen = (e: React.FormEvent) => {
    e.preventDefault();
    failVerification(
      ver.id,
      'Post-repair airflow velocity remains below statutory threshold (5.0 m/s vs >= 5.5 m/s)',
      reworkInstruction,
      newTargetDate
    );
  };

  return (
    <div className="screen-content">
      {/* Screen Header */}
      <div className="screen-header">
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
            <button
              className="btn btn-secondary btn-sm"
              onClick={() => navigateTo('12')}
              style={{ padding: '3px 8px' }}
            >
              <ChevronLeft size={13} />
              <span>Back to Failure Notice</span>
            </button>
            <span
              className="badge badge-danger font-bold"
              style={{
                fontSize: '11.5px',
                letterSpacing: '0.04em'
              }}
            >
              WORKSPACE 06 REOPEN PROTOCOL
            </span>
          </div>
          <h1 className="screen-title" style={{ margin: 0 }}>
            REOPEN CORRECTIVE ACTION (CAPA REWORK) &bull; {ver.capaId}
          </h1>
          <p className="screen-subtitle">
            Transmit failed remediation back to Workspace 06 action owner with formal rework specifications and adjusted milestones
          </p>
        </div>
      </div>

      <form onSubmit={handleReopen}>
        <div style={{ display: 'grid', gridTemplateColumns: '1.35fr 1fr', gap: '20px', marginBottom: '30px' }}>
          {/* Left Column: Reopen Parameters & Instructions */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div className="card" style={{ padding: '20px', borderLeft: '4px solid #D32F2F' }}>
              <div style={{ fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', color: '#B71C1C', marginBottom: '6px' }}>
                REOPEN CLASSIFICATION: CORRECTIVE ACTION REWORK
              </div>
              <div style={{ fontSize: '14px', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '8px' }}>
                Mandatory Physical Rework Directive
              </div>
              <div style={{ fontSize: '12.5px', color: 'var(--text-secondary)', lineHeight: 1.4 }}>
                Primary reason: Post-repair velocity 5.0 m/s failed statutory threshold. Action owner must overhaul mechanical guides and submit fresh calibrated test evidence.
              </div>
            </div>

            {/* Detailed Rework Instructions */}
            <div className="card" style={{ padding: '20px' }}>
              <label style={{ display: 'block', fontSize: '12.5px', fontWeight: 800, textTransform: 'uppercase', marginBottom: '6px', color: 'var(--text-primary)' }}>
                Mandatory Engineering Rework Instructions *
              </label>
              <textarea
                className="form-control"
                rows={4}
                value={reworkInstruction}
                onChange={e => setReworkInstruction(e.target.value)}
                required
                style={{ height: 'auto', fontSize: '12.5px', lineHeight: 1.4 }}
              />
            </div>

            {/* Target Date & Escalation Toggle */}
            <div className="card" style={{ padding: '20px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, marginBottom: '6px' }}>
                    New Rework Completion Deadline *
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    value={newTargetDate}
                    onChange={e => setNewTargetDate(e.target.value)}
                    required
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, marginBottom: '6px' }}>
                    Management Escalation
                  </label>
                  <select
                    className="form-control"
                    value={escalationRequired ? 'YES' : 'NO'}
                    onChange={e => setEscalationRequired(e.target.value === 'YES')}
                  >
                    <option value="NO">Not Required (Routine Rework)</option>
                    <option value="YES">Escalate to General Manager (Area 1)</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Workflow Transmission */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div className="card" style={{ padding: '20px', borderTop: '4px solid #D32F2F' }}>
              <div style={{ fontSize: '12px', fontWeight: 800, color: '#B71C1C', textTransform: 'uppercase', marginBottom: '10px' }}>
                REOPEN WORKFLOW HANDOFF
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '12px', background: 'var(--bg-surface-alt)', padding: '12px', borderRadius: '6px', marginBottom: '16px' }}>
                <div>1. Workspace 07 Verifier Reopens CAPA</div>
                <div>&darr;</div>
                <div>2. Handed off to Workspace 06 Action Owner</div>
                <div>&darr;</div>
                <div>3. Physical Rework & New Measurement</div>
                <div>&darr;</div>
                <div>4. Resubmitted to Workspace 07 Reverification Queue</div>
              </div>

              <button
                type="submit"
                className="btn btn-danger"
                style={{ width: '100%', background: '#D32F2F', color: '#FFF', justifyContent: 'center', padding: '12px' }}
              >
                <RotateCcw size={15} />
                <span>Reopen CAPA & Transmit to WS06 &rarr;</span>
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};
