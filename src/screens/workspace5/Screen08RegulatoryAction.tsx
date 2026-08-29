"use client";

import React, { useState } from 'react';
import { useRegulatoryAction } from '../../context/RegulatoryActionContext';
import { RegulatoryActionType } from '../../types/regulatoryAction';
import {
  FileCheck,
  Scale,
  Calendar,
  Building,
  User,
  Shield,
  Lock,
  ChevronLeft,
  ArrowRight,
  Send,
  AlertTriangle
} from 'lucide-react';

export const Screen08RegulatoryAction: React.FC = () => {
  const {
    activeFinding,
    issueRegulatoryAction,
    navigateTo,
    showToast
  } = useRegulatoryAction();

  const [selectedAction, setSelectedAction] = useState<RegulatoryActionType>('Corrective action required');
  const [responseDeadline, setResponseDeadline] = useState<string>('30 Nov 2026');
  const [justificationNotes, setJustificationNotes] = useState<string>(
    'Formal corrective direction issued under CMR 2017 Regulation 153(2)(b). Mine Manager must clear louvre blockages, perform fan pitch overhaul, and submit post-repair anemometer traverse certification before statutory deadline.'
  );

  const actionOptions: RegulatoryActionType[] = [
    'No regulatory action',
    'Mine response required',
    'Corrective action required',
    'Notice required',
    'Direction / instruction required',
    'Escalation required'
  ];

  const handleIssueAction = (e: React.FormEvent) => {
    e.preventDefault();
    issueRegulatoryAction(activeFinding.id, selectedAction, responseDeadline, justificationNotes);
  };

  return (
    <div className="screen-content">
      {/* Screen Header */}
      <div className="screen-header">
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
            <button
              className="btn btn-secondary btn-sm"
              onClick={() => navigateTo('04')}
              style={{ padding: '3px 8px' }}
            >
              <ChevronLeft size={13} />
              <span>Back to Finding Details</span>
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
              REGULATORY ACTION DECISION
            </span>
          </div>
          <h1 className="screen-title" style={{ margin: 0 }}>
            STATUTORY ENFORCEMENT & DIRECTION ISSUANCE
          </h1>
          <p className="screen-subtitle">
            Formal determination of statutory action, notice generation, compliance deadlines, and operational mandates for {activeFinding.id}
          </p>
        </div>
      </div>

      <form onSubmit={handleIssueAction}>
        <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: '20px', marginBottom: '30px' }}>
          {/* Left Column: Decision & Action Form */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {/* QUESTION: Action Requirement */}
            <div className="card" style={{ padding: '20px', borderLeft: '4px solid #1A237E' }}>
              <div style={{ fontSize: '13px', fontWeight: 800, textTransform: 'uppercase', color: '#1A237E', marginBottom: '4px' }}>
                STATUTORY QUESTION
              </div>
              <h2 style={{ margin: '0 0 14px', fontSize: '15px', fontWeight: 800, color: 'var(--text-primary)' }}>
                Does this finding require formal regulatory action or statutory direction?
              </h2>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '10px' }}>
                {actionOptions.map(opt => (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => setSelectedAction(opt)}
                    style={{
                      padding: '12px 14px',
                      borderRadius: '6px',
                      border: `1.5px solid ${selectedAction === opt ? '#1A237E' : 'var(--border-color)'}`,
                      background: selectedAction === opt ? '#E8EAF6' : 'var(--bg-surface-alt)',
                      color: selectedAction === opt ? '#1A237E' : 'var(--text-primary)',
                      fontWeight: selectedAction === opt ? 700 : 500,
                      fontSize: '12.5px',
                      textAlign: 'left',
                      cursor: 'pointer'
                    }}
                  >
                    {selectedAction === opt ? '◉ ' : '○ '} {opt}
                  </button>
                ))}
              </div>
            </div>

            {/* SECTION: ACTION BASIS & DETAILS */}
            <div className="card" style={{ padding: '20px' }}>
              <h3 style={{ margin: '0 0 12px', fontSize: '13px', fontWeight: 800, textTransform: 'uppercase', color: 'var(--text-primary)' }}>
                Action Basis & Enforceable Clauses
              </h3>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', background: 'var(--bg-surface-alt)', padding: '14px', borderRadius: '6px', fontSize: '12.5px', marginBottom: '16px' }}>
                <div>
                  <span style={{ color: 'var(--text-muted)' }}>Regulatory Requirement:</span>
                  <div style={{ fontWeight: 600, color: 'var(--text-primary)', marginTop: '2px' }}>{activeFinding.regulatoryBasisText}</div>
                </div>
                <div>
                  <span style={{ color: 'var(--text-muted)' }}>Enforceable Clause:</span>
                  <div style={{ fontWeight: 600, color: '#1A237E', marginTop: '2px' }}>{activeFinding.clause}</div>
                </div>
                <div>
                  <span style={{ color: 'var(--text-muted)' }}>Applicable Obligation:</span>
                  <div style={{ color: 'var(--text-secondary)', marginTop: '2px' }}>{activeFinding.obligation}</div>
                </div>
              </div>

              {/* Justification Textarea */}
              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, marginBottom: '6px' }}>
                  Direction Text & Operational Mandate *
                </label>
                <textarea
                  className="form-control"
                  rows={4}
                  value={justificationNotes}
                  onChange={e => setJustificationNotes(e.target.value)}
                  required
                  style={{ height: 'auto', fontSize: '12.5px' }}
                />
              </div>
            </div>

            {/* SECTION: DEADLINE & RESPONSIBLE PARTY */}
            <div className="card" style={{ padding: '20px' }}>
              <h3 style={{ margin: '0 0 12px', fontSize: '13px', fontWeight: 800, textTransform: 'uppercase', color: 'var(--text-primary)' }}>
                Compliance Deadlines & Responsible Parties
              </h3>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, marginBottom: '6px' }}>
                    Response Deadline *
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    value={responseDeadline}
                    onChange={e => setResponseDeadline(e.target.value)}
                    required
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, marginBottom: '6px' }}>
                    Responsible Unit & Department
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    value={`${activeFinding.mine} — Ventilation Department`}
                    readOnly
                    style={{ background: 'var(--bg-surface-alt)' }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: System Recommendation & Human Authorization Guard */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div className="card" style={{ padding: '20px', borderTop: '4px solid #1A237E' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
                <Shield size={18} color="#1A237E" />
                <h3 style={{ margin: 0, fontSize: '13.5px', fontWeight: 800, textTransform: 'uppercase', color: '#1A237E' }}>
                  SYSTEM RECOMMENDATION
                </h3>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '12.5px', background: 'var(--bg-surface-alt)', padding: '14px', borderRadius: '6px', marginBottom: '16px' }}>
                <div><strong>Based On:</strong> High Severity + 4 Historical Recurrences</div>
                <div><strong>Engine Suggestion:</strong> Corrective action required</div>
                <div><strong>Notice Type:</strong> Corrective Direction (Notice Required)</div>
              </div>

              {/* Strict Human Authorization Callout */}
              <div
                style={{
                  background: '#FFEBEE',
                  border: '1px solid #FFCDD2',
                  borderRadius: '6px',
                  padding: '12px',
                  marginBottom: '16px',
                  fontSize: '12px',
                  color: '#B71C1C',
                  lineHeight: 1.4
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontWeight: 800, marginBottom: '4px' }}>
                  <Lock size={13} />
                  <span>AUTHORITY RULE:</span>
                </div>
                Do not automatically issue a legal/regulatory notice merely because AI or the rule engine recommends it. Human authorization creates the legally sealed record.
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <button
                  type="submit"
                  className="btn btn-primary"
                  style={{ background: '#1A237E', borderColor: '#303F9F', justifyContent: 'center' }}
                >
                  <Send size={14} />
                  <span>Issue Official Direction (Screen 09) &rarr;</span>
                </button>
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => showToast('Draft regulatory action saved in local cache', 'info')}
                  style={{ justifyContent: 'center' }}
                >
                  <span>Save Draft Action</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};
