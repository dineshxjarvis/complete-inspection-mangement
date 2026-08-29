"use client";

import React, { useState } from 'react';
import { useOversight } from '../../context/OversightContext';
import {
  Lock,
  FileText,
  Printer,
  Download,
  ShieldCheck,
  ChevronLeft,
  ArrowRight,
  Award
} from 'lucide-react';

export const Screen32RegulatoryDocumentViewer: React.FC = () => {
  const { navigateTo, showToast } = useOversight();
  const [selectedDoc, setSelectedDoc] = useState('DGMS Form IV Notice — Mine A2 (15 Nov 2026)');

  return (
    <div className="screen-content">
      {/* Screen Header */}
      <div className="screen-header">
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
            <button
              className="btn btn-secondary btn-sm"
              onClick={() => navigateTo('31')}
              style={{ padding: '3px 8px' }}
            >
              <ChevronLeft size={13} />
              <span>Back to Regulator Dashboard</span>
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
              SECURE DOCUMENT VAULT
            </span>
          </div>
          <h1 className="screen-title" style={{ margin: 0 }}>
            PROTECTED STATUTORY REGULATORY ARTIFACT VIEWER
          </h1>
          <p className="screen-subtitle">
            Cryptographically sealed repository of official DGMS Form IV notices, direction orders, and statutory letters
          </p>
        </div>

        <div style={{ display: 'flex', gap: '8px' }}>
          <button
            className="btn btn-secondary btn-sm"
            onClick={() => showToast('Printing secured regulatory copy...', 'info')}
          >
            <Printer size={13} />
            <span>Print Watermarked Artifact</span>
          </button>
          <button
            className="btn btn-primary btn-sm"
            onClick={() => navigateTo('33')}
            style={{ background: '#1E1B4B', borderColor: '#312E81' }}
          >
            <span>Regulatory Closure (Screen 33)</span>
            <ArrowRight size={13} />
          </button>
        </div>
      </div>

      {/* Document Selector Bar */}
      <div className="card" style={{ padding: '12px 16px', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '12px' }}>
        <span style={{ fontSize: '12px', fontWeight: 700, color: 'var(--text-primary)' }}>Select Statutory Artifact:</span>
        <select
          className="form-control"
          value={selectedDoc}
          onChange={e => setSelectedDoc(e.target.value)}
          style={{ fontSize: '12px', fontWeight: 600, maxWidth: '480px' }}
        >
          <option value="DGMS Form IV Notice — Mine A2 (15 Nov 2026)">DGMS Form IV Notice — Mine A2 (Ref: DGMS/INS/2026/0042)</option>
          <option value="DGMS Electrical Direction Notice — Mine A5 (01 Nov 2026)">DGMS Direction Notice — Mine A5 (Ref: DGMS/INS/2026/0038)</option>
          <option value="Statutory Rectification Certificate — Mine A2 (30 Nov 2026)">Statutory Rectification Certificate — Mine A2 (VER-0031)</option>
        </select>
      </div>

      {/* Watermarked Document Preview Canvas */}
      <div
        className="card"
        style={{
          padding: '36px',
          backgroundColor: '#FFFDF9',
          border: '2px solid #D97706',
          borderRadius: '8px',
          position: 'relative',
          overflow: 'hidden',
          marginBottom: '30px'
        }}
      >
        {/* Background Digital Watermark */}
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%) rotate(-30deg)',
            fontSize: '52px',
            fontWeight: 900,
            color: 'rgba(217, 119, 6, 0.05)',
            whiteSpace: 'nowrap',
            pointerEvents: 'none',
            userSelect: 'none'
          }}
        >
          DGMS STATUTORY RECORD &bull; RESTRICTED
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '2px solid #D97706', paddingBottom: '16px', marginBottom: '20px' }}>
          <div>
            <div style={{ fontSize: '16px', fontWeight: 900, color: '#1E1B4B' }}>GOVERNMENT OF INDIA &bull; MINISTRY OF LABOUR & EMPLOYMENT</div>
            <div style={{ fontSize: '13px', fontWeight: 800, color: '#B45309' }}>DIRECTORATE GENERAL OF MINES SAFETY (EASTERN ZONE)</div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <span className="badge badge-warning font-bold" style={{ fontSize: '11px' }}>STATUTORY FORM IV</span>
          </div>
        </div>

        <div style={{ fontSize: '13px', lineHeight: 1.6, color: 'var(--text-primary)', marginBottom: '24px' }}>
          <p><strong>To:</strong> The Agent & Manager, Mine A2 (Seam VII), Eastern Coalfields Limited.</p>
          <p>
            Take notice that during statutory inspection conducted under the Mines Act, 1952 on <strong>15th November 2026</strong>, return airway velocity in Shaft 3 was observed to be <strong>4.8 m/s</strong>, falling short of the mandatory standard of <strong>&ge; 5.5 m/s</strong> prescribed under Regulation 153(2)(b) of the Coal Mines Regulations, 2017.
          </p>
          <p>
            You are hereby required to execute immediate corrective remediation on regulator louvres and booster fan settings, and submit certified traverse verification test logs within 15 days of this notice.
          </p>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', paddingTop: '20px', borderTop: '1px solid var(--border-color)', fontSize: '11.5px' }}>
          <div>
            <div style={{ fontWeight: 700 }}>Digital Signature Seal:</div>
            <div style={{ fontFamily: 'monospace', color: 'var(--text-muted)' }}>SHA256: d849bfe38a192c0199e82103fa72bb3c...</div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontWeight: 800, color: '#1E1B4B' }}>Director of Mines Safety (Sitarampur Region)</div>
            <div style={{ color: '#D97706', fontWeight: 700 }}>Directorate General of Mines Safety</div>
          </div>
        </div>
      </div>
    </div>
  );
};
