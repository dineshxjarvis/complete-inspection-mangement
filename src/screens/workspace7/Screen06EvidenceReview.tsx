"use client";

import React, { useState } from 'react';
import { useVerification } from '../../context/VerificationContext';
import {
  FileText,
  Camera,
  Activity,
  CheckCircle2,
  AlertTriangle,
  Eye,
  ChevronLeft,
  ArrowRight,
  ShieldCheck,
  CheckSquare,
  Send
} from 'lucide-react';

export const Screen06EvidenceReview: React.FC = () => {
  const {
    activeVerification,
    openEvidenceViewer,
    navigateTo,
    showToast
  } = useVerification();

  const ver = activeVerification;
  const [evidenceSufficient, setEvidenceSufficient] = useState<boolean>(true);
  const [remarks, setRemarks] = useState<string>('All 4 submitted artifacts independently verified against field logs and calibration certificates.');

  const handleAcceptAll = () => {
    showToast('All evidence artifacts accepted into verification record.', 'success');
    navigateTo('07');
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
              <span>Back to Verification Details</span>
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
              EVIDENCE AUDIT VAULT
            </span>
          </div>
          <h1 className="screen-title" style={{ margin: 0 }}>
            EVIDENCE REVIEW & INTEGRITY ASSESSMENT &bull; {ver.id}
          </h1>
          <p className="screen-subtitle">
            Verify authenticity, metadata consistency, and quantitative results across all 4 submitted remediation artifacts
          </p>
        </div>

        <button
          className="btn btn-primary btn-sm"
          onClick={handleAcceptAll}
          style={{ background: '#006064', borderColor: '#004D40' }}
        >
          <span>Accept Evidence & Measure (Screen 07)</span>
          <ArrowRight size={13} />
        </button>
      </div>

      {/* Measurement Highlight Box */}
      <div className="card" style={{ padding: '20px', background: '#E0F7FA', border: '1.5px solid #80DEEA', marginBottom: '20px' }}>
        <div style={{ fontSize: '11px', fontWeight: 800, color: '#006064', textTransform: 'uppercase', marginBottom: '10px' }}>
          PRIMARY MEASUREMENT EVIDENCE (EVD-VER-03)
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px', textAlign: 'center', marginBottom: '12px' }}>
          <div style={{ background: '#FFF', padding: '12px', borderRadius: '6px', border: '1px solid #B2EBF2' }}>
            <div style={{ fontSize: '11px', color: '#D32F2F', fontWeight: 700 }}>BEFORE ACTION</div>
            <div style={{ fontSize: '20px', fontWeight: 800, color: '#D32F2F', marginTop: '2px' }}>4.8 m/s</div>
          </div>
          <div style={{ background: '#FFF', padding: '12px', borderRadius: '6px', border: '1px solid #B2EBF2' }}>
            <div style={{ fontSize: '11px', color: '#006064', fontWeight: 700 }}>REQUIRED THRESHOLD</div>
            <div style={{ fontSize: '20px', fontWeight: 800, color: '#006064', marginTop: '2px' }}>&ge; 5.5 m/s</div>
          </div>
          <div style={{ background: '#E8F5E9', padding: '12px', borderRadius: '6px', border: '1px solid #A5D6A7' }}>
            <div style={{ fontSize: '11px', color: '#1B5E20', fontWeight: 700 }}>AFTER REPAIR VERIFIED</div>
            <div style={{ fontSize: '20px', fontWeight: 800, color: '#1B5E20', marginTop: '2px' }}>5.9 m/s</div>
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: '#006064' }}>
          <span>Instrument: <strong>Digital Anemometer (Model DA-800 &bull; ID: ANM-2048)</strong></span>
          <span>Calibration Validity: <strong style={{ color: '#2E7D32' }}>✓ Valid through 24 Jan 2027</strong></span>
        </div>
      </div>

      {/* 4 Evidence Cards Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px', marginBottom: '24px' }}>
        {ver.evidenceList.map(evd => (
          <div
            key={evd.id}
            className="card"
            style={{ padding: '18px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}
          >
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  {evd.isMeasurement ? <Activity size={16} color="#006064" /> : <FileText size={16} color="#006064" />}
                  <span style={{ fontWeight: 800, fontSize: '13px', color: 'var(--text-primary)' }}>{evd.title}</span>
                </div>
                <span className="badge badge-success">✓ {evd.status}</span>
              </div>

              <div style={{ fontSize: '12px', color: 'var(--text-muted)', marginBottom: '8px' }}>
                Uploaded by <strong>{evd.uploadedBy}</strong> on {evd.uploadTimestamp}
              </div>

              {evd.verifierRemarks && (
                <div style={{ background: 'var(--bg-surface-alt)', padding: '8px 10px', borderRadius: '4px', fontSize: '11.5px', color: 'var(--text-secondary)', marginBottom: '10px' }}>
                  "{evd.verifierRemarks}"
                </div>
              )}
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '10px', borderTop: '1px solid var(--border-light)' }}>
              <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>{evd.filename} ({evd.fileSize})</span>
              <button
                className="btn btn-secondary btn-sm"
                onClick={() => openEvidenceViewer(evd)}
                style={{ padding: '2px 8px', fontSize: '11px' }}
              >
                <Eye size={12} />
                <span>Inspect</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Verifier Assessment Form */}
      <div className="card" style={{ padding: '20px', borderTop: '4px solid #006064', marginBottom: '30px' }}>
        <h3 style={{ margin: '0 0 12px', fontSize: '13px', fontWeight: 800, textTransform: 'uppercase', color: '#006064' }}>
          VERIFIER EVIDENCE ASSESSMENT
        </h3>

        <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '14px' }}>
          <label style={{ display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer', fontSize: '13px', fontWeight: 600 }}>
            <input
              type="radio"
              name="evdSuff"
              checked={evidenceSufficient}
              onChange={() => setEvidenceSufficient(true)}
            />
            YES — Evidence Complete & Authentic
          </label>
          <label style={{ display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer', fontSize: '13px', fontWeight: 600 }}>
            <input
              type="radio"
              name="evdSuff"
              checked={!evidenceSufficient}
              onChange={() => setEvidenceSufficient(false)}
            />
            NO — Evidence Insufficient / Missing Data
          </label>
        </div>

        <div style={{ marginBottom: '14px' }}>
          <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, marginBottom: '6px' }}>
            Evidence Audit Remarks *
          </label>
          <textarea
            className="form-control"
            rows={2}
            value={remarks}
            onChange={e => setRemarks(e.target.value)}
            style={{ height: 'auto', fontSize: '12px' }}
          />
        </div>

        <button
          className="btn btn-primary"
          onClick={handleAcceptAll}
          style={{ background: '#006064', borderColor: '#004D40' }}
        >
          <CheckSquare size={14} />
          <span>Accept Evidence & Proceed to Measurement Verification &rarr;</span>
        </button>
      </div>
    </div>
  );
};
