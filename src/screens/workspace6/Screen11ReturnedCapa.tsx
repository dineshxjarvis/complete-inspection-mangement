"use client";

import React from 'react';
import { useCorrectiveAction } from '../../context/CorrectiveActionContext';
import {
  RotateCcw,
  AlertTriangle,
  FileUp,
  PlayCircle,
  ChevronLeft,
  ArrowRight,
  ShieldAlert,
  Send,
  History,
  CheckCircle2
} from 'lucide-react';

export const Screen11ReturnedCapa: React.FC = () => {
  const {
    activeCapa,
    navigateTo,
    showToast
  } = useCorrectiveAction();

  const capa = activeCapa;

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
              <span>Back to CAPA Details</span>
            </button>
            <span
              className="badge badge-danger"
              style={{
                fontSize: '11.5px',
                fontWeight: 800,
                letterSpacing: '0.04em'
              }}
            >
              ACTION RETURNED FOR CORRECTION
            </span>
          </div>
          <h1 className="screen-title" style={{ margin: 0 }}>
            {capa.id} &bull; VERIFICATION RETURN & DEFICIENCY NOTICE
          </h1>
          <p className="screen-subtitle">
            Action rejected or returned by the authorized verifier &bull; Address identified evidence gaps and resubmit
          </p>
        </div>

        {/* Action Buttons */}
        <div style={{ display: 'flex', gap: '8px' }}>
          <button
            className="btn btn-secondary btn-sm"
            onClick={() => navigateTo('07')}
          >
            <FileUp size={13} />
            <span>Upload Missing Evidence</span>
          </button>

          <button
            className="btn btn-primary btn-sm"
            onClick={() => navigateTo('13')}
            style={{ background: '#00695C', borderColor: '#004D40' }}
          >
            <Send size={13} />
            <span>Proceed to Resubmit</span>
          </button>
        </div>
      </div>

      {/* Return Reason Box */}
      <div
        className="card"
        style={{
          padding: '20px',
          background: 'linear-gradient(135deg, #FFEBEE 0%, #FFCDD2 100%)',
          border: '1px solid #EF9A9A',
          marginBottom: '20px'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '14px' }}>
          <AlertTriangle size={28} color="#D32F2F" style={{ flexShrink: 0, marginTop: '2px' }} />
          <div>
            <div style={{ fontSize: '11.5px', fontWeight: 800, color: '#B71C1C', textTransform: 'uppercase' }}>
              PRIMARY RETURN REASON: EVIDENCE INSUFFICIENT
            </div>
            <div style={{ fontSize: '15px', fontWeight: 800, color: '#B71C1C', marginTop: '4px' }}>
              "Post-repair digital anemometer traverse measurement sheet is missing from the verification packet."
            </div>
            <div style={{ fontSize: '12px', color: '#B71C1C', marginTop: '6px' }}>
              Returned By: <strong>Er. T. Bannerjee (Authorized DGMS Panel Verifier)</strong> &bull; Date: <strong>27 Nov 2026</strong>
            </div>
          </div>
        </div>
      </div>

      {/* Required Corrections & Previous Submission Breakdown */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.3fr 1fr', gap: '20px', marginBottom: '30px' }}>
        {/* Left Column: Required Corrections */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div className="card" style={{ padding: '20px', borderLeft: '4px solid #00695C' }}>
            <h3 style={{ margin: '0 0 10px', fontSize: '13px', fontWeight: 800, textTransform: 'uppercase', color: '#004D40' }}>
              Required Corrective Actions for Approval
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '13px' }}>
              <div style={{ padding: '10px 12px', background: '#FFF3E0', borderRadius: '6px', border: '1px solid #FFE082', color: '#BF360C' }}>
                <strong>1. Upload Calibrated Measurement Sheet:</strong> Conduct 9-grid anemometer traverse at Shaft 3 (Ch: 140m) and upload signed PDF sheet certifying airflow &ge; 5.5 m/s.
              </div>
              <div style={{ padding: '10px 12px', background: '#E8F5E9', borderRadius: '6px', color: '#1B5E20' }}>
                <strong>2. Louvre Repair Report:</strong> Accepted & Validated &check;
              </div>
              <div style={{ padding: '10px 12px', background: '#E8F5E9', borderRadius: '6px', color: '#1B5E20' }}>
                <strong>3. Photographic Optical Evidence:</strong> Accepted & Validated &check;
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Submission History & Non-Destructive Log */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div className="card" style={{ padding: '20px' }}>
            <h3 style={{ margin: '0 0 12px', fontSize: '13px', fontWeight: 800, textTransform: 'uppercase', color: 'var(--text-primary)' }}>
              Submission History Cycle
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '12px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0', borderBottom: '1px solid var(--border-light)' }}>
                <span style={{ color: 'var(--text-muted)' }}>First Submission:</span>
                <span>26 Nov 2026 &bull; Er. S. K. Mahapatra</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0', borderBottom: '1px solid var(--border-light)' }}>
                <span style={{ color: 'var(--text-muted)' }}>Verifier Return:</span>
                <span style={{ color: '#D32F2F', fontWeight: 700 }}>27 Nov 2026 &bull; Er. T. Bannerjee</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0' }}>
                <span style={{ color: 'var(--text-muted)' }}>Current Status:</span>
                <span className="badge badge-danger">RETURNED</span>
              </div>
            </div>

            <div style={{ marginTop: '16px', fontSize: '11.5px', color: 'var(--text-muted)', lineHeight: 1.4 }}>
              * <strong>Audit Rule:</strong> Previous submissions and reviewer return comments are permanently archived in the immutable history ledger.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
