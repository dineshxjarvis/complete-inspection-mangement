"use client";

import React from 'react';
import { useVerification } from '../../context/VerificationContext';
import {
  FileCheck,
  Printer,
  Download,
  ShieldCheck,
  CheckCircle2,
  Lock,
  ChevronLeft,
  Award,
  Hash
} from 'lucide-react';

export const Screen19VerificationReport: React.FC = () => {
  const {
    activeVerification,
    navigateTo,
    showToast
  } = useVerification();

  const ver = activeVerification;

  return (
    <div className="screen-content">
      {/* Screen Header */}
      <div className="screen-header">
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
            <button
              className="btn btn-secondary btn-sm"
              onClick={() => navigateTo('01')}
              style={{ padding: '3px 8px' }}
            >
              <ChevronLeft size={13} />
              <span>Back to Dashboard</span>
            </button>
            <span
              className="id-badge font-mono"
              style={{
                fontSize: '12px',
                fontWeight: 700,
                background: 'rgba(0, 96, 100, 0.15)',
                color: '#006064'
              }}
            >
              SEALED STATUTORY CERTIFICATE
            </span>
          </div>
          <h1 className="screen-title" style={{ margin: 0 }}>
            OFFICIAL VERIFICATION REPORT CERTIFICATE &bull; {ver.id}
          </h1>
          <p className="screen-subtitle">
            Statutory certificate of verified corrective action & formal closure under the Coal Mines Regulations, 2017
          </p>
        </div>

        <div style={{ display: 'flex', gap: '8px' }}>
          <button
            className="btn btn-secondary btn-sm"
            onClick={() => showToast(`Sent ${ver.id} official certificate to statutory printer`, 'info')}
          >
            <Printer size={13} />
            <span>Print Certificate</span>
          </button>
          <button
            className="btn btn-primary btn-sm"
            onClick={() => showToast(`Downloaded sealed PDF certificate for ${ver.id}`, 'success')}
            style={{ background: '#006064', borderColor: '#004D40' }}
          >
            <Download size={13} />
            <span>Download Sealed PDF</span>
          </button>
        </div>
      </div>

      {/* Official Certificate Box */}
      <div
        className="card"
        style={{
          padding: '36px',
          maxWidth: '840px',
          margin: '0 auto 30px',
          background: '#FFFFFF',
          border: '2px solid #006064',
          borderRadius: '8px',
          boxShadow: '0 10px 30px rgba(0,0,0,0.08)'
        }}
      >
        {/* Certificate Top Authority Crest */}
        <div style={{ textAlign: 'center', borderBottom: '2px solid #006064', paddingBottom: '18px', marginBottom: '24px' }}>
          <div style={{ fontSize: '11px', fontWeight: 800, letterSpacing: '0.12em', color: '#006064', textTransform: 'uppercase' }}>
            DIRECTORATE GENERAL OF MINES SAFETY (DGMS) &bull; GOVT. OF INDIA
          </div>
          <h2 style={{ margin: '6px 0 2px', fontSize: '20px', fontWeight: 800, color: 'var(--text-primary)' }}>
            STATUTORY CAPA VERIFICATION & CLOSURE CERTIFICATE
          </h2>
          <div style={{ fontSize: '12px', color: 'var(--text-muted)', fontFamily: 'monospace' }}>
            CERTIFICATE REF: <strong>{ver.id}</strong> &bull; DATE: <strong>{ver.decisionDate || '07 Dec 2026'}</strong>
          </div>
        </div>

        {/* Certificate Metadata Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px', marginBottom: '24px', fontSize: '12.5px' }}>
          <div style={{ background: 'var(--bg-surface-alt)', padding: '14px', borderRadius: '6px' }}>
            <div><strong>Colliery / Mine:</strong> {ver.mine} ({ver.location})</div>
            <div style={{ marginTop: '4px' }}><strong>Statutory Finding Ref:</strong> {ver.findingId}</div>
            <div style={{ marginTop: '4px' }}><strong>Source Inspection:</strong> {ver.inspectionId}</div>
          </div>

          <div style={{ background: 'var(--bg-surface-alt)', padding: '14px', borderRadius: '6px' }}>
            <div><strong>Action Remediation Ref:</strong> {ver.capaId}</div>
            <div style={{ marginTop: '4px' }}><strong>Action Owner:</strong> {ver.actionOwner}</div>
            <div style={{ marginTop: '4px' }}><strong>Governing Clause:</strong> {ver.findingSummary.clause}</div>
          </div>
        </div>

        {/* Findings & Measured Remediation Benchmark */}
        <div style={{ marginBottom: '24px' }}>
          <h3 style={{ margin: '0 0 10px', fontSize: '12.5px', fontWeight: 800, textTransform: 'uppercase', color: '#006064' }}>
            Quantitative Compliance Verification
          </h3>

          <table className="data-table" style={{ fontSize: '12px' }}>
            <thead>
              <tr>
                <th>Parameters</th>
                <th>Observed Deficit (Pre-Action)</th>
                <th>Statutory Standard</th>
                <th>Certified Outcome (Post-Action)</th>
                <th>Audit Result</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>Return Airflow Velocity</strong></td>
                <td style={{ color: '#D32F2F', fontWeight: 700 }}>4.8 m/s</td>
                <td>&ge; 5.5 m/s</td>
                <td style={{ color: '#2E7D32', fontWeight: 800 }}>5.9 m/s</td>
                <td><span className="badge badge-success font-bold">✓ PASS</span></td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Auditor Remarks */}
        <div style={{ background: '#E8F5E9', border: '1px solid #C8E6C9', borderRadius: '6px', padding: '14px', marginBottom: '24px', fontSize: '12.5px' }}>
          <strong>Auditor Statement:</strong> "{ver.verifierRemarks || 'Corrective action verified and required outcome achieved in compliance with Coal Mines Regulations, 2017.'}"
        </div>

        {/* Signature & Seal Footer */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', paddingTop: '20px', borderTop: '1px solid var(--border-color)', fontSize: '12px' }}>
          <div>
            <div style={{ fontWeight: 800, color: '#006064' }}>STATUS: VERIFIED & CLOSED</div>
            <div style={{ fontSize: '11px', color: 'var(--text-muted)', fontFamily: 'monospace', marginTop: '2px' }}>
              SHA-256 SEAL: sha256_8f14e45fceea167a5a36dedd4bea2543add704d8
            </div>
          </div>

          <div style={{ textAlign: 'right' }}>
            <div style={{ fontWeight: 800, fontSize: '13px' }}>Er. R. Sharma</div>
            <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>DGMS Panel Senior Safety Auditor</div>
            <div style={{ fontSize: '10.5px', color: 'var(--text-muted)' }}>Auth ID: DGMS-AUTH-2024-88</div>
          </div>
        </div>
      </div>
    </div>
  );
};
