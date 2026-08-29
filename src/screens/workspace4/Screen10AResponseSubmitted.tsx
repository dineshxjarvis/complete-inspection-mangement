"use client";

import React from 'react';
import { useMineResponse } from '../../context/MineResponseContext';
import {
  CheckCircle,
  FileCheck,
  ShieldCheck,
  ArrowRight,
  Hash,
  GitBranch,
  CheckSquare,
  LayoutDashboard,
  Eye,
  Calendar,
  UserCheck,
  Lock
} from 'lucide-react';

export const Screen10AResponseSubmitted: React.FC = () => {
  const {
    activeFinding,
    draftResponse,
    responseVersions,
    navigateTo,
    auditLog
  } = useMineResponse();

  const fnd = activeFinding;
  const versions = responseVersions[fnd.id] || [];
  const latestVersion = versions[versions.length - 1] || {
    version: 1,
    timestamp: new Date().toLocaleDateString('en-IN') + ' IST',
    actor: 'Er. A. K. Verma',
    role: 'Mine Manager',
    digitalSignatureHash: 'sha256_8849202f5a0cfb2e667823901bce471e'
  };

  return (
    <div className="screen-content" style={{ maxWidth: '960px', margin: '0 auto' }}>
      {/* Success Banner Card */}
      <div
        className="card"
        style={{
          background: 'linear-gradient(135deg, #004D40 0%, #00796B 100%)',
          color: '#FFFFFF',
          padding: '24px',
          borderRadius: '8px',
          boxShadow: '0 8px 24px rgba(0, 77, 64, 0.3)',
          marginBottom: '20px',
          textAlign: 'center'
        }}
      >
        <div
          style={{
            width: '56px',
            height: '56px',
            borderRadius: '50%',
            background: 'rgba(255, 255, 255, 0.2)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 12px'
          }}
        >
          <CheckCircle size={32} color="#A7FFEB" />
        </div>

        <span
          style={{
            background: 'rgba(255,255,255,0.2)',
            color: '#E0F2F1',
            fontSize: '11px',
            fontWeight: 800,
            padding: '3px 10px',
            borderRadius: '12px',
            letterSpacing: '0.08em',
            textTransform: 'uppercase'
          }}
        >
          Screen 10A &bull; Statutory Submission Receipt
        </span>

        <h1 style={{ margin: '10px 0 6px', fontSize: '24px', fontWeight: 800 }}>
          OFFICIAL MINE RESPONSE SUBMITTED
        </h1>
        <p style={{ margin: 0, fontSize: '13.5px', color: '#B2DFDB' }}>
          Response successfully recorded for <strong>{fnd.id}</strong> &bull; Submitted by Er. A. K. Verma (Mine Manager)
        </p>

        {/* Digital Signature Pill */}
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            background: 'rgba(0,0,0,0.25)',
            padding: '6px 14px',
            borderRadius: '20px',
            marginTop: '16px',
            fontSize: '11.5px',
            fontFamily: 'monospace',
            color: '#A7FFEB'
          }}
        >
          <Hash size={13} />
          <span>Signature Hash: {latestVersion.digitalSignatureHash}</span>
        </div>
      </div>

      {/* Statutory Immutability Guarantee Note */}
      <div
        className="card"
        style={{
          background: '#FFF8E1',
          border: '1px solid #FFE082',
          padding: '14px 18px',
          marginBottom: '20px',
          display: 'flex',
          alignItems: 'center',
          gap: '14px'
        }}
      >
        <div
          style={{
            width: '32px',
            height: '32px',
            borderRadius: '50%',
            background: '#FFA000',
            color: '#FFF',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0
          }}
        >
          <Lock size={16} />
        </div>
        <div>
          <div style={{ fontSize: '13px', fontWeight: 700, color: '#B78103' }}>
            STATUTORY RECORD INTEGRITY GUARANTEE
          </div>
          <div style={{ fontSize: '12px', color: '#5D4037', marginTop: '2px', lineHeight: 1.4 }}>
            The Mine Manager's response is appended as <strong>Official Revision {latestVersion.version}</strong> to the permanent compliance dossier. It does not overwrite the inspector's original finding or observations.
          </div>
        </div>
      </div>

      {/* Summary Matrix: 4 Pillars */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: '12px',
          marginBottom: '20px'
        }}
      >
        <div className="card" style={{ padding: '14px' }}>
          <div style={{ fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700 }}>
            Finding Reference
          </div>
          <div style={{ fontSize: '14px', fontWeight: 700, color: '#D32F2F', marginTop: '4px', fontFamily: 'monospace' }}>
            {fnd.id}
          </div>
          <div style={{ fontSize: '11.5px', color: 'var(--text-secondary)', marginTop: '2px' }}>
            {fnd.requirementId}
          </div>
        </div>

        <div className="card" style={{ padding: '14px' }}>
          <div style={{ fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700 }}>
            Submission Status
          </div>
          <div style={{ fontSize: '14px', fontWeight: 700, color: '#2E7D32', marginTop: '4px' }}>
            ✓ Submitted
          </div>
          <div style={{ fontSize: '11.5px', color: 'var(--text-secondary)', marginTop: '2px' }}>
            Revision v{latestVersion.version} Sealed
          </div>
        </div>

        <div className="card" style={{ padding: '14px' }}>
          <div style={{ fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700 }}>
            Target CAPA Date
          </div>
          <div style={{ fontSize: '14px', fontWeight: 700, color: '#00796B', marginTop: '4px' }}>
            {draftResponse.targetDate || '30 Nov 2026'}
          </div>
          <div style={{ fontSize: '11.5px', color: 'var(--text-secondary)', marginTop: '2px' }}>
            {draftResponse.responsibleDepartment}
          </div>
        </div>

        <div className="card" style={{ padding: '14px' }}>
          <div style={{ fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700 }}>
            Next Workflow Step
          </div>
          <div style={{ fontSize: '13px', fontWeight: 700, color: '#F57C00', marginTop: '4px' }}>
            Awaiting Review
          </div>
          <div style={{ fontSize: '11.5px', color: 'var(--text-secondary)', marginTop: '2px' }}>
            DGMS / CIL Liaison
          </div>
        </div>
      </div>

      {/* Quick Navigation Action Grid */}
      <div
        className="card"
        style={{
          padding: '20px',
          background: 'var(--bg-surface-alt)',
          border: '1px solid var(--border-color)',
          marginBottom: '30px'
        }}
      >
        <h3 style={{ margin: '0 0 14px', fontSize: '13px', fontWeight: 700, color: 'var(--text-primary)', textTransform: 'uppercase' }}>
          NEXT ACTIONS & WORKSPACE 04 NAVIGATION
        </h3>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px' }}>
          <button
            className="btn btn-secondary"
            onClick={() => navigateTo('08')}
            style={{ flexDirection: 'column', height: '75px', justifyContent: 'center', gap: '4px' }}
          >
            <Eye size={16} color="#00897B" />
            <span style={{ fontWeight: 600 }}>View Finding</span>
            <span style={{ fontSize: '10.5px', color: 'var(--text-muted)' }}>Screen 08</span>
          </button>

          <button
            className="btn btn-secondary"
            onClick={() => navigateTo('11')}
            style={{ flexDirection: 'column', height: '75px', justifyContent: 'center', gap: '4px' }}
          >
            <GitBranch size={16} color="#0288D1" />
            <span style={{ fontWeight: 600 }}>Response History</span>
            <span style={{ fontSize: '10.5px', color: 'var(--text-muted)' }}>Screen 11</span>
          </button>

          <button
            className="btn btn-secondary"
            onClick={() => navigateTo('12')}
            style={{ flexDirection: 'column', height: '75px', justifyContent: 'center', gap: '4px' }}
          >
            <CheckSquare size={16} color="#7B1FA2" />
            <span style={{ fontWeight: 600 }}>Manage CAPA</span>
            <span style={{ fontSize: '10.5px', color: 'var(--text-muted)' }}>Screen 12</span>
          </button>

          <button
            className="btn btn-primary"
            onClick={() => navigateTo('01')}
            style={{
              flexDirection: 'column',
              height: '75px',
              justifyContent: 'center',
              gap: '4px',
              background: '#00897B',
              borderColor: '#00796B'
            }}
          >
            <LayoutDashboard size={16} />
            <span style={{ fontWeight: 600 }}>Back to Dashboard</span>
            <span style={{ fontSize: '10.5px', color: '#E0F2F1' }}>Screen 01</span>
          </button>
        </div>
      </div>
    </div>
  );
};
