"use client";

import React from 'react';
import { useVerification } from '../../context/VerificationContext';
import {
  Activity,
  CheckCircle2,
  AlertTriangle,
  ChevronLeft,
  ArrowRight,
  ShieldCheck,
  Award,
  Lock
} from 'lucide-react';

export const Screen07MeasurementVerification: React.FC = () => {
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
              onClick={() => navigateTo('06')}
              style={{ padding: '3px 8px' }}
            >
              <ChevronLeft size={13} />
              <span>Back to Evidence Review</span>
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
              QUANTITATIVE VALIDATION
            </span>
          </div>
          <h1 className="screen-title" style={{ margin: 0 }}>
            POST-CORRECTIVE MEASUREMENT VERIFICATION &bull; {ver.id}
          </h1>
          <p className="screen-subtitle">
            Validate physical measurement instruments, calibration validity, and compliance against statutory threshold values
          </p>
        </div>

        <button
          className="btn btn-primary btn-sm"
          onClick={() => navigateTo('09')}
          style={{ background: '#006064', borderColor: '#004D40' }}
        >
          <span>Open Verification Checklist (Screen 09)</span>
          <ArrowRight size={13} />
        </button>
      </div>

      {/* Measurement Benchmark Grid */}
      <div className="card" style={{ padding: '24px', borderTop: '4px solid #2E7D32', marginBottom: '20px' }}>
        <div style={{ fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', color: '#1B5E20', marginBottom: '14px' }}>
          MANDATORY STATUTORY THRESHOLD SATISFACTION (CMR 2017 REGULATION 153)
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', textAlign: 'center', marginBottom: '20px' }}>
          <div style={{ background: '#FFEBEE', padding: '16px', borderRadius: '6px', border: '1px solid #FFCDD2' }}>
            <div style={{ fontSize: '11.5px', color: '#B71C1C', fontWeight: 700, textTransform: 'uppercase' }}>
              ORIGINAL FIELD MEASUREMENT
            </div>
            <div style={{ fontSize: '26px', fontWeight: 800, color: '#D32F2F', fontFamily: 'monospace', marginTop: '4px' }}>
              4.8 m/s
            </div>
            <div style={{ fontSize: '11px', color: '#B71C1C', marginTop: '2px' }}>Non-Compliant Deficit</div>
          </div>

          <div style={{ background: '#E0F7FA', padding: '16px', borderRadius: '6px', border: '1px solid #80DEEA' }}>
            <div style={{ fontSize: '11.5px', color: '#006064', fontWeight: 700, textTransform: 'uppercase' }}>
              STATUTORY THRESHOLD (MINIMUM)
            </div>
            <div style={{ fontSize: '26px', fontWeight: 800, color: '#006064', fontFamily: 'monospace', marginTop: '4px' }}>
              &ge; 5.5 m/s
            </div>
            <div style={{ fontSize: '11px', color: '#006064', marginTop: '2px' }}>Prescribed Standard</div>
          </div>

          <div style={{ background: '#E8F5E9', padding: '16px', borderRadius: '6px', border: '1.5px solid #A5D6A7' }}>
            <div style={{ fontSize: '11.5px', color: '#1B5E20', fontWeight: 700, textTransform: 'uppercase' }}>
              POST-REPAIR CERTIFIED READING
            </div>
            <div style={{ fontSize: '26px', fontWeight: 800, color: '#1B5E20', fontFamily: 'monospace', marginTop: '4px' }}>
              5.9 m/s
            </div>
            <div style={{ fontSize: '11px', color: '#2E7D32', fontWeight: 700, marginTop: '2px' }}>✓ 107% of Target Standard</div>
          </div>
        </div>

        {/* Instrument Metadata */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px', background: 'var(--bg-surface-alt)', padding: '14px', borderRadius: '6px', fontSize: '12px' }}>
          <div>
            <span style={{ color: 'var(--text-muted)' }}>Instrument Model:</span>
            <div style={{ fontWeight: 600, color: 'var(--text-primary)', marginTop: '2px' }}>Digital Vane Anemometer</div>
          </div>
          <div>
            <span style={{ color: 'var(--text-muted)' }}>Instrument Serial:</span>
            <div style={{ fontWeight: 700, color: '#006064', marginTop: '2px' }}>ANM-2048</div>
          </div>
          <div>
            <span style={{ color: 'var(--text-muted)' }}>Calibration Certificate:</span>
            <div style={{ fontWeight: 700, color: '#2E7D32', marginTop: '2px' }}>✓ Valid through 24 Jan 2027</div>
          </div>
          <div>
            <span style={{ color: 'var(--text-muted)' }}>Underground Split:</span>
            <div style={{ fontWeight: 600, color: 'var(--text-primary)', marginTop: '2px' }}>Shaft 3 (Ch: 140m)</div>
          </div>
        </div>
      </div>

      {/* Governance Reminder Alert */}
      <div
        className="card"
        style={{
          padding: '16px 20px',
          background: '#FFF8E1',
          border: '1px solid #FFE082',
          marginBottom: '30px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <Lock size={18} color="#F57F17" />
          <div style={{ fontSize: '12px', color: '#B78103', lineHeight: 1.4 }}>
            <strong>STATUTORY AUDIT GOVERNANCE RULE:</strong> Satisfying quantitative thresholds does not automatically produce a closed finding. The independent auditor must complete the full statutory checklist (Screen 09) and sign the official decision declaration.
          </div>
        </div>

        <button
          className="btn btn-primary btn-sm"
          onClick={() => navigateTo('09')}
          style={{ background: '#006064', borderColor: '#004D40' }}
        >
          <span>Complete Checklist (Screen 09) &rarr;</span>
        </button>
      </div>
    </div>
  );
};
