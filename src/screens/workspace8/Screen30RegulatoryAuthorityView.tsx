"use client";

import React from 'react';
import { useOversight } from '../../context/OversightContext';
import {
  Globe,
  Lock,
  FileText,
  ShieldCheck,
  ChevronLeft,
  ArrowRight,
  Award,
  Search
} from 'lucide-react';

export const Screen30RegulatoryAuthorityView: React.FC = () => {
  const { navigateTo } = useOversight();

  return (
    <div className="screen-content">
      {/* Screen Header */}
      <div className="screen-header">
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
            <button
              className="btn btn-secondary btn-sm"
              onClick={() => navigateTo('29')}
              style={{ padding: '3px 8px' }}
            >
              <ChevronLeft size={13} />
              <span>Back to Alerts</span>
            </button>
            <span
              className="id-badge font-mono"
              style={{
                fontSize: '12px',
                fontWeight: 700,
                background: 'rgba(30, 27, 75, 0.15)',
                color: '#1E1B4B'
              }}
            >
              STATUTORY REGULATOR PORTAL
            </span>
            <span className="badge badge-warning font-bold">EXTERNAL DGMS PORTAL</span>
          </div>
          <h1 className="screen-title" style={{ margin: 0 }}>
            DIRECTORATE GENERAL OF MINES SAFETY (DGMS) REGULATORY VIEW
          </h1>
          <p className="screen-subtitle">
            Statutory authority view &bull; Restricted read-only and formal regulatory sign-off interface (without internal operational controls)
          </p>
        </div>

        <button
          className="btn btn-primary btn-sm"
          onClick={() => navigateTo('31')}
          style={{ background: '#1E1B4B', borderColor: '#312E81' }}
        >
          <span>Regulator Dashboard (Screen 31)</span>
          <ArrowRight size={13} />
        </button>
      </div>

      {/* Role-Based Separation Banner */}
      <div className="card" style={{ padding: '20px', background: '#FFF8E1', border: '1.5px solid #FFE082', marginBottom: '20px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <Lock size={22} color="#B45309" />
          <div>
            <div style={{ fontSize: '11px', fontWeight: 800, color: '#B45309', textTransform: 'uppercase' }}>
              SEPARATION OF INTERNAL GOVERNANCE VS STATUTORY AUTHORITY
            </div>
            <p style={{ margin: '4px 0 0', fontSize: '12.5px', color: 'var(--text-primary)', lineHeight: 1.4 }}>
              External statutory officers possess full audit visibility into compliance evidence and test logs, but internal operational editing buttons are restricted to maintain regulatory impartiality.
            </p>
          </div>
        </div>
      </div>

      {/* Authority Command Navigation Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', marginBottom: '30px' }}>
        <div
          className="card"
          onClick={() => navigateTo('31')}
          style={{ padding: '20px', cursor: 'pointer', borderLeft: '4px solid #1E1B4B' }}
        >
          <Globe size={22} color="#1E1B4B" />
          <h3 style={{ margin: '10px 0 4px', fontSize: '14px', fontWeight: 800, color: '#1E1B4B' }}>Regulatory Command Dashboard</h3>
          <p style={{ margin: 0, fontSize: '12px', color: 'var(--text-secondary)' }}>24 external audits &bull; 18 open statutory notices &bull; 7 pending submissions.</p>
        </div>

        <div
          className="card"
          onClick={() => navigateTo('32')}
          style={{ padding: '20px', cursor: 'pointer', borderLeft: '4px solid #D97706' }}
        >
          <Lock size={22} color="#D97706" />
          <h3 style={{ margin: '10px 0 4px', fontSize: '14px', fontWeight: 800, color: '#1E1B4B' }}>Protected Statutory Document Vault</h3>
          <p style={{ margin: 0, fontSize: '12px', color: 'var(--text-secondary)' }}>Inspect sealed DGMS Form IV notices and verified digital certificates.</p>
        </div>

        <div
          className="card"
          onClick={() => navigateTo('33')}
          style={{ padding: '20px', cursor: 'pointer', borderLeft: '4px solid #2E7D32' }}
        >
          <Award size={22} color="#2E7D32" />
          <h3 style={{ margin: '10px 0 4px', fontSize: '14px', fontWeight: 800, color: '#1E1B4B' }}>Regulatory Closure Protocol</h3>
          <p style={{ margin: 0, fontSize: '12px', color: 'var(--text-secondary)' }}>Formally certify and legally close matters under Mines Act, 1952.</p>
        </div>
      </div>
    </div>
  );
};
