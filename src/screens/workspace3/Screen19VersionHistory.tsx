"use client";

import React, { useState } from 'react';
import { useFieldInspection } from '../../context/FieldInspectionContext';
import {
  GitBranch,
  Clock,
  User,
  Shield,
  CheckCircle,
  RotateCcw,
  ArrowLeft,
  ChevronDown,
  ChevronUp,
  FileText
} from 'lucide-react';

export const Screen19VersionHistory: React.FC = () => {
  const { activeInspection, versions, navigateTo } = useFieldInspection();
  const [selectedVersion, setSelectedVersion] = useState<string>('v3');

  return (
    <div className="screen-content" style={{ maxWidth: '880px', margin: '0 auto', paddingBottom: '90px' }}>
      {/* Header */}
      <div className="screen-header">
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span className="id-badge font-mono" style={{ fontSize: '11px', fontWeight: 700 }}>
              {activeInspection.id}
            </span>
            <span className="badge badge-info">{versions.length} IMMUTABLE VERSIONS</span>
          </div>
          <h1 className="screen-title" style={{ marginTop: '4px' }}>
            INSPECTION VERSION LEDGER & DIFF HISTORY
          </h1>
          <p className="screen-subtitle">
            Statutory revision control: trace corrections, reviewer feedback loops, and diff deltas
          </p>
        </div>

        <button className="btn btn-secondary" onClick={() => navigateTo('02')}>
          <ArrowLeft size={14} />
          <span>My Inspections</span>
        </button>
      </div>

      {/* Version Timeline Cards */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '24px' }}>
        {versions.map((ver, idx) => {
          const isSelected = selectedVersion === ver.version;
          return (
            <div
              key={ver.version}
              className="card"
              style={{
                borderLeft: `4px solid ${
                  ver.status === 'Submitted'
                    ? '#2E7D32'
                    : ver.status.includes('Returned')
                    ? '#D32F2F'
                    : '#5932A5'
                }`,
                padding: '20px'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <span
                    className="font-mono"
                    style={{
                      fontSize: '14px',
                      fontWeight: 800,
                      background: 'rgba(0,0,0,0.06)',
                      padding: '4px 10px',
                      borderRadius: '6px'
                    }}
                  >
                    VERSION {ver.version}
                  </span>
                  <span
                    className={`badge ${
                      ver.status === 'Submitted'
                        ? 'badge-success'
                        : ver.status.includes('Returned')
                        ? 'badge-danger'
                        : 'badge-info'
                    }`}
                  >
                    {ver.status}
                  </span>
                </div>

                <div style={{ fontSize: '12px', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <Clock size={13} /> {ver.timestamp}
                </div>
              </div>

              {/* Version Metadata Summary */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '10px', marginBottom: '14px', background: 'var(--bg-surface-subtle)', padding: '10px 14px', borderRadius: '6px', fontSize: '12px' }}>
                <div>Actor: <strong>{ver.submittedBy}</strong></div>
                <div>Evaluated Checks: <strong>{ver.checksCompleted} / 22</strong></div>
                <div>Evidence Attachments: <strong>{ver.evidenceCount} Items</strong></div>
                <div>Findings Created: <strong>{ver.findingsCount} Findings</strong></div>
              </div>

              {/* Change Reason */}
              {ver.reasonForChange && (
                <div style={{ fontSize: '12.5px', color: 'var(--text-secondary)', marginBottom: '12px', lineHeight: 1.5 }}>
                  <strong>Context / Revision Rationale:</strong> {ver.reasonForChange}
                </div>
              )}

              {/* Diff Summary Bullet Points */}
              <div style={{ background: 'var(--bg-surface-alt)', padding: '12px 14px', borderRadius: '6px', border: '1px solid var(--border-color)' }}>
                <div style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '6px' }}>
                  Traceable Modifications in this Version:
                </div>
                <ul style={{ margin: 0, paddingLeft: '16px', fontSize: '12px', color: 'var(--text-primary)', lineHeight: 1.5 }}>
                  {ver.diffSummary.map((diff, dIdx) => (
                    <li key={dIdx}>{diff}</li>
                  ))}
                </ul>
              </div>
            </div>
          );
        })}
      </div>

      {/* Governance Guarantee Box */}
      <div
        style={{
          background: 'var(--bg-surface-alt)',
          border: '1px solid var(--border-color)',
          borderRadius: '8px',
          padding: '16px',
          fontSize: '12px',
          color: 'var(--text-secondary)',
          lineHeight: 1.5
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#5932A5', fontWeight: 700, marginBottom: '4px' }}>
          <Shield size={15} />
          <span>STATUTORY IMMUTABILITY LAW:</span>
        </div>
        STRATA preserves every historical version in a write-once ledger. Under DGMS statutory regulations, previous official submissions are never overwritten or deleted; all corrections create new cryptographically chained revisions for complete audit transparency.
      </div>
    </div>
  );
};
