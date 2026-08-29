"use client";

import React, { useState } from 'react';
import { useMineResponse } from '../../context/MineResponseContext';
import {
  GitBranch,
  Clock,
  User,
  ShieldCheck,
  FileCheck,
  AlertTriangle,
  ChevronLeft,
  Hash,
  Paperclip,
  ArrowRight,
  Eye,
  FileText
} from 'lucide-react';

export const Screen11ResponseHistory: React.FC = () => {
  const {
    activeFinding,
    responseVersions,
    navigateTo
  } = useMineResponse();

  const fnd = activeFinding;
  const versions = responseVersions[fnd.id] || [];
  const [selectedVersionNum, setSelectedVersionNum] = useState<number>(versions.length || 1);

  const activeVersion = versions.find(v => v.version === selectedVersionNum) || versions[versions.length - 1];

  return (
    <div className="screen-content">
      {/* Screen Header */}
      <div className="screen-header">
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
            <button
              className="btn btn-secondary btn-sm"
              onClick={() => navigateTo('08')}
              style={{ padding: '3px 8px' }}
            >
              <ChevronLeft size={13} />
              <span>Back to Finding</span>
            </button>
            <span
              className="id-badge font-mono"
              style={{
                fontSize: '13px',
                fontWeight: 700,
                background: 'rgba(0, 137, 123, 0.15)',
                color: '#00796B'
              }}
            >
              {fnd.id}
            </span>
            <span className="badge badge-info">{versions.length} OFFICIAL REVISIONS</span>
          </div>
          <h1 className="screen-title" style={{ margin: 0 }}>
            STATUTORY RESPONSE VERSION HISTORY
          </h1>
          <p className="screen-subtitle">
            Non-destructive chronological audit trail of all official draft submissions, clarification requests, and amendments
          </p>
        </div>

        <button
          className="btn btn-primary btn-sm"
          onClick={() => navigateTo('09')}
          style={{ background: '#00897B', borderColor: '#00796B' }}
        >
          <FileCheck size={13} />
          <span>Amend / Create Next Revision</span>
        </button>
      </div>

      {/* Grid Layout: Version Timeline & Version Detail Diff View */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.5fr', gap: '16px', marginBottom: '30px' }}>
        {/* Left Column: Chronological Event Timeline */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <div className="card" style={{ padding: '16px' }}>
            <h3 style={{ margin: '0 0 14px', fontSize: '13px', fontWeight: 700, color: 'var(--text-primary)', textTransform: 'uppercase' }}>
              REVISION EVENT TIMELINE
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {versions.map((ver) => {
                const isSelected = selectedVersionNum === ver.version;
                const isClarification = ver.action === 'Clarification Requested';
                return (
                  <div
                    key={ver.version}
                    onClick={() => setSelectedVersionNum(ver.version)}
                    style={{
                      padding: '12px',
                      borderRadius: '6px',
                      border: '1px solid',
                      borderColor: isSelected ? '#00897B' : 'var(--border-color)',
                      background: isSelected ? 'rgba(0, 137, 123, 0.08)' : 'var(--bg-surface-alt)',
                      cursor: 'pointer',
                      transition: 'all 0.15s ease'
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                      <span
                        style={{
                          fontSize: '11px',
                          fontWeight: 800,
                          color: isClarification ? '#E65100' : '#00796B',
                          textTransform: 'uppercase'
                        }}
                      >
                        Version {ver.version} &bull; {ver.action}
                      </span>
                      <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
                        {ver.timestamp.split(' ')[0]} {ver.timestamp.split(' ')[1]}
                      </span>
                    </div>

                    <div style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '4px' }}>
                      {ver.actor} ({ver.role})
                    </div>

                    {ver.reason && (
                      <div style={{ fontSize: '11.5px', color: '#C62828', background: '#FFEBEE', padding: '6px 8px', borderRadius: '4px', marginTop: '6px' }}>
                        <strong>Clarification:</strong> {ver.reason}
                      </div>
                    )}

                    <div style={{ fontSize: '10px', color: 'var(--text-muted)', fontFamily: 'monospace', marginTop: '6px' }}>
                      Sig: {ver.digitalSignatureHash.substring(0, 20)}...
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Column: Detailed Version Payload */}
        {activeVersion && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div className="card" style={{ padding: '16px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px', borderBottom: '1px solid var(--border-light)', paddingBottom: '10px' }}>
                <div>
                  <span className="badge badge-info font-mono" style={{ fontSize: '11px' }}>
                    VERSION {activeVersion.version} PAYLOAD
                  </span>
                  <h3 style={{ margin: '4px 0 0', fontSize: '15px', fontWeight: 700, color: 'var(--text-primary)' }}>
                    {activeVersion.action}
                  </h3>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-primary)' }}>{activeVersion.actor}</div>
                  <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>{activeVersion.timestamp}</div>
                </div>
              </div>

              {/* Version Reason if Clarification */}
              {activeVersion.reason && (
                <div style={{ background: '#FFF3E0', border: '1px solid #FFE0B2', padding: '10px 14px', borderRadius: '6px', marginBottom: '14px' }}>
                  <div style={{ fontSize: '11px', color: '#E65100', fontWeight: 700, textTransform: 'uppercase' }}>
                    Reason for Clarification Request
                  </div>
                  <div style={{ fontSize: '12.5px', color: '#BF360C', marginTop: '2px' }}>
                    {activeVersion.reason}
                  </div>
                </div>
              )}

              {/* Technical Explanation */}
              <div style={{ marginBottom: '14px' }}>
                <div style={{ fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700 }}>
                  1. Technical Explanation
                </div>
                <div style={{ fontSize: '13px', color: 'var(--text-primary)', background: '#FAFAFA', padding: '10px', borderRadius: '4px', border: '1px solid var(--border-light)', marginTop: '4px', lineHeight: 1.4 }}>
                  {activeVersion.explanation}
                </div>
              </div>

              {/* Immediate Action */}
              <div style={{ marginBottom: '14px' }}>
                <div style={{ fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700 }}>
                  2. Immediate Remedial Action
                </div>
                <div style={{ fontSize: '13px', color: 'var(--text-primary)', background: '#FAFAFA', padding: '10px', borderRadius: '4px', border: '1px solid var(--border-light)', marginTop: '4px', lineHeight: 1.4 }}>
                  {activeVersion.immediateAction}
                </div>
              </div>

              {/* Root Cause */}
              <div style={{ marginBottom: '14px' }}>
                <div style={{ fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700 }}>
                  3. Root Cause
                </div>
                <div style={{ fontSize: '13px', color: 'var(--text-primary)', background: '#FAFAFA', padding: '10px', borderRadius: '4px', border: '1px solid var(--border-light)', marginTop: '4px', lineHeight: 1.4 }}>
                  {activeVersion.rootCause}
                </div>
              </div>

              {/* Corrective Action (CAPA) */}
              <div style={{ marginBottom: '14px' }}>
                <div style={{ fontSize: '11px', color: '#004D40', textTransform: 'uppercase', fontWeight: 700 }}>
                  4. Corrective & Preventive Action Commitment
                </div>
                <div style={{ fontSize: '13px', color: 'var(--text-primary)', background: '#FAFAFA', padding: '10px', borderRadius: '4px', borderLeft: '3px solid #00897B', borderTop: '1px solid var(--border-light)', borderRight: '1px solid var(--border-light)', borderBottom: '1px solid var(--border-light)', marginTop: '4px', lineHeight: 1.4 }}>
                  {activeVersion.correctiveAction}
                </div>
              </div>

              {/* Meta details */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '10px', background: 'var(--bg-surface-alt)', padding: '12px', borderRadius: '6px', fontSize: '11.5px', marginBottom: '14px' }}>
                <div>
                  <span style={{ color: 'var(--text-muted)' }}>Department:</span>
                  <div style={{ fontWeight: 600, color: 'var(--text-primary)', marginTop: '2px' }}>{activeVersion.responsibleDepartment}</div>
                </div>
                <div>
                  <span style={{ color: 'var(--text-muted)' }}>Owner:</span>
                  <div style={{ fontWeight: 600, color: 'var(--text-primary)', marginTop: '2px' }}>{activeVersion.responsiblePerson}</div>
                </div>
                <div>
                  <span style={{ color: 'var(--text-muted)' }}>Target Date:</span>
                  <div style={{ fontWeight: 700, color: '#00897B', marginTop: '2px' }}>{activeVersion.targetDate}</div>
                </div>
              </div>

              {/* Attachments */}
              <div>
                <div style={{ fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700, marginBottom: '6px' }}>
                  Attachments in Revision ({activeVersion.attachments.length})
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                  {activeVersion.attachments.map((file, i) => (
                    <span
                      key={i}
                      className="badge badge-subtle"
                      style={{ display: 'flex', alignItems: 'center', gap: '4px', padding: '4px 8px' }}
                    >
                      <Paperclip size={11} color="#00897B" />
                      <span>{file}</span>
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
