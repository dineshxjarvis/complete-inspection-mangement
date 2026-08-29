"use client";

import React from 'react';
import { useOversight } from '../../context/OversightContext';
import {
  Award,
  ShieldCheck,
  CheckCircle2,
  Lock,
  ChevronLeft,
  ArrowRight,
  Send,
  FileCheck
} from 'lucide-react';

export const Screen33RegulatoryClosure: React.FC = () => {
  const { closeRegulatoryNotice, navigateTo, showToast } = useOversight();

  const handleSignClose = () => {
    closeRegulatoryNotice(
      'DGMS/INS/2026/0042',
      'DGMS Deputy Director conducted independent traverse re-test certifying return airway airflow at 5.9 m/s, fully satisfying Regulation 153(2)(b).'
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
              onClick={() => navigateTo('32')}
              style={{ padding: '3px 8px' }}
            >
              <ChevronLeft size={13} />
              <span>Back to Document Viewer</span>
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
              DGMS/INS/2026/0042
            </span>
            <span className="badge badge-success font-bold">READY FOR FORMAL CLOSURE</span>
          </div>
          <h1 className="screen-title" style={{ margin: 0 }}>
            STATUTORY REGULATORY CLOSURE PROTOCOL
          </h1>
          <p className="screen-subtitle">
            Statutory governance distinction &bull; Formal external closure of regulatory enforcement matter under the Mines Act, 1952
          </p>
        </div>

        <button
          className="btn btn-primary btn-sm"
          onClick={() => navigateTo('34')}
          style={{ background: '#1E1B4B', borderColor: '#312E81' }}
        >
          <span>Oversight Deep Search (Screen 34)</span>
          <ArrowRight size={13} />
        </button>
      </div>

      {/* Core Principle Alert */}
      <div className="card" style={{ padding: '20px', background: '#FFF8E1', border: '1.5px solid #FFE082', marginBottom: '20px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <Lock size={22} color="#B45309" />
          <div>
            <div style={{ fontSize: '12px', fontWeight: 800, color: '#B45309', textTransform: 'uppercase' }}>
              CRITICAL STATUTORY GOVERNANCE PRINCIPLE
            </div>
            <div style={{ fontSize: '15px', fontWeight: 800, color: '#92400E', marginTop: '2px' }}>
              STRATA CAPA Closed &ne; Regulatory Matter Closed
            </div>
            <p style={{ margin: '4px 0 0', fontSize: '12.5px', color: 'var(--text-primary)', lineHeight: 1.4 }}>
              A statutory finding may be remediated and verified internally via STRATA Workspace 07, but the external regulatory matter remains legally active until the authorized regulatory body (DGMS) executes formal sign-off.
            </p>
          </div>
        </div>
      </div>

      {/* Statutory Closure Criteria Verification Box */}
      <div className="card" style={{ padding: '24px', marginBottom: '30px' }}>
        <h3 style={{ margin: '0 0 16px', fontSize: '13.5px', fontWeight: 800, textTransform: 'uppercase', color: '#1E1B4B' }}>
          STATUTORY CLOSURE ASSURANCE CHECKLIST
        </h3>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '12.5px', marginBottom: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 14px', background: '#E8F5E9', borderRadius: '4px', border: '1px solid #C8E6C9' }}>
            <span>1. Internal Corrective Action Remediated (CAPA-2026-0048):</span>
            <strong style={{ color: '#2E7D32' }}>✓ COMPLETED (Workspace 06)</strong>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 14px', background: '#E8F5E9', borderRadius: '4px', border: '1px solid #C8E6C9' }}>
            <span>2. Independent Verification Audit (VER-2026-0031):</span>
            <strong style={{ color: '#2E7D32' }}>✓ PASS CERTIFIED at 5.9 m/s (Workspace 07)</strong>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 14px', background: '#E8F5E9', borderRadius: '4px', border: '1px solid #C8E6C9' }}>
            <span>3. Form IV Statutory Rectification Certificate:</span>
            <strong style={{ color: '#2E7D32' }}>✓ SUBMITTED TO DGMS</strong>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 14px', background: '#FFF8E1', borderRadius: '4px', border: '1px solid #FFE082' }}>
            <span>4. DGMS Statutory Closure Letter:</span>
            <strong style={{ color: '#B45309' }}>Awaiting Formal Sign-Off Seal</strong>
          </div>
        </div>

        {/* Action Button */}
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <button
            className="btn btn-primary"
            onClick={handleSignClose}
            style={{ background: '#2E7D32', borderColor: '#1B5E20', padding: '10px 24px', fontSize: '13px', fontWeight: 800 }}
          >
            <Award size={16} />
            <span>[SIGN & FORMALLY CLOSE STATUTORY REGULATORY MATTER]</span>
          </button>
        </div>
      </div>
    </div>
  );
};
