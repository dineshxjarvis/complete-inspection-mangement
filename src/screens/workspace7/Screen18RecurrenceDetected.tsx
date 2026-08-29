"use client";

import React, { useState } from 'react';
import { useVerification } from '../../context/VerificationContext';
import {
  AlertTriangle,
  History,
  TrendingUp,
  ShieldCheck,
  ChevronLeft,
  ArrowRight,
  Send,
  Calendar,
  Lock,
  Sparkles
} from 'lucide-react';

export const Screen18RecurrenceDetected: React.FC = () => {
  const {
    activeVerification,
    setIsScheduleFollowUpModalOpen,
    navigateTo,
    showToast
  } = useVerification();

  const ver = activeVerification;
  const recurrence = ver.recurrenceInfo;

  const [reviewExisting, setReviewExisting] = useState(true);
  const [preventiveAction, setPreventiveAction] = useState(true);
  const [escalateMgmt, setEscalateMgmt] = useState(true);

  const handleEscalate = () => {
    showToast('Recurrence pattern escalated to General Manager & Safety Director.', 'warning');
  };

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
              className="badge badge-warning font-bold"
              style={{
                fontSize: '11.5px',
                letterSpacing: '0.04em'
              }}
            >
              ⚠ RECURRENCE DETECTION ADVISORY
            </span>
          </div>
          <h1 className="screen-title" style={{ margin: 0 }}>
            STATUTORY RECURRENCE RISK DETECTED &bull; {ver.mine}
          </h1>
          <p className="screen-subtitle">
            Safety intelligence pattern clustering &bull; 3 historical airflow non-compliances identified in the same underground airway
          </p>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1.35fr 1fr', gap: '20px', marginBottom: '30px' }}>
        {/* Left Column: Pattern Cluster & Analysis */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {/* Pattern Banner */}
          <div className="card" style={{ padding: '20px', background: '#FFF3E0', border: '1.5px solid #FFE082' }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
              <AlertTriangle size={32} color="#E65100" style={{ flexShrink: 0 }} />
              <div>
                <div style={{ fontSize: '11.5px', fontWeight: 800, color: '#E65100', textTransform: 'uppercase' }}>
                  RECURRING DEFICIENCY PATTERN CLUSTER
                </div>
                <div style={{ fontSize: '15px', fontWeight: 800, color: '#BF360C', marginTop: '2px' }}>
                  3 Similar Ventilation Non-Compliances Detected across 18 Months (Shaft 3)
                </div>
              </div>
            </div>
          </div>

          {/* Historical Match Register */}
          <div className="card" style={{ padding: '18px' }}>
            <h3 style={{ margin: '0 0 10px', fontSize: '12.5px', fontWeight: 800, textTransform: 'uppercase', color: 'var(--text-primary)' }}>
              Historical Matching Findings & CAPA Records
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <div style={{ padding: '10px 12px', background: 'var(--bg-surface-alt)', borderRadius: '6px', fontSize: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <span className="badge badge-danger font-mono" style={{ marginRight: '6px' }}>FND-2026-00127</span>
                  <strong>Current Finding (Velocity 4.8 m/s &rarr; Repaired)</strong>
                </div>
                <span className="badge badge-subtle">CAPA-2026-0048</span>
              </div>

              <div style={{ padding: '10px 12px', background: 'var(--bg-surface-alt)', borderRadius: '6px', fontSize: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <span className="badge badge-warning font-mono" style={{ marginRight: '6px' }}>FND-2025-00881</span>
                  <span>Shaft 3 return airway shutter jam (Velocity 4.9 m/s)</span>
                </div>
                <span className="badge badge-subtle">CAPA-2025-0092</span>
              </div>

              <div style={{ padding: '10px 12px', background: 'var(--bg-surface-alt)', borderRadius: '6px', fontSize: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <span className="badge badge-warning font-mono" style={{ marginRight: '6px' }}>FND-2025-00432</span>
                  <span>Airflow velocity below threshold at regulator split</span>
                </div>
                <span className="badge badge-subtle">CAPA-2025-0038</span>
              </div>
            </div>
          </div>

          {/* AI / Analytics Safety Advisory Box */}
          <div className="card" style={{ padding: '18px', background: '#F9FAFB', border: '1px solid var(--border-color)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
              <Sparkles size={16} color="#006064" />
              <h3 style={{ margin: 0, fontSize: '12px', fontWeight: 800, textTransform: 'uppercase', color: '#006064' }}>
                STRATA INTELLIGENCE SAFETY ADVISORY (NON-AUTHORITATIVE)
              </h3>
            </div>
            <p style={{ margin: 0, fontSize: '12.5px', color: 'var(--text-secondary)', lineHeight: 1.4 }}>
              "{recurrence?.aiAdvisory || 'Airflow velocity drift observed 3 times across 18 months at Shaft 3. Recommended preventive quarterly louvre descaling schedule.'}"
            </p>
          </div>
        </div>

        {/* Right Column: Suggested Actions & Human Authority Guard */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div className="card" style={{ padding: '20px', borderTop: '4px solid #E65100' }}>
            <h3 style={{ margin: '0 0 12px', fontSize: '12.5px', fontWeight: 800, textTransform: 'uppercase', color: '#E65100' }}>
              Suggested Preventive Interventions
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '12.5px', marginBottom: '16px' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                <input
                  type="checkbox"
                  checked={reviewExisting}
                  onChange={e => setReviewExisting(e.target.checked)}
                />
                <span>Mandate Quarterly Preventive Louvre Maintenance</span>
              </label>

              <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                <input
                  type="checkbox"
                  checked={preventiveAction}
                  onChange={e => setPreventiveAction(e.target.checked)}
                />
                <span>Install Continuous Ultrasonic Telemetry Sensor</span>
              </label>

              <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                <input
                  type="checkbox"
                  checked={escalateMgmt}
                  onChange={e => setEscalateMgmt(e.target.checked)}
                />
                <span>Escalate Pattern to Area General Manager</span>
              </label>
            </div>

            {/* Human Decision Guard */}
            <div
              style={{
                background: '#FFF8E1',
                border: '1px solid #FFE082',
                borderRadius: '6px',
                padding: '10px 12px',
                fontSize: '11.5px',
                color: '#B78103',
                marginBottom: '16px',
                lineHeight: 1.4
              }}
            >
              <Lock size={12} style={{ display: 'inline', marginRight: '4px' }} />
              <strong>HUMAN GOVERNANCE RULE:</strong> AI pattern detection is purely advisory. Authorized human safety authorities determine all preventive mandates.
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <button
                className="btn btn-primary"
                onClick={handleEscalate}
                style={{ background: '#E65100', borderColor: '#BF360C', justifyContent: 'center' }}
              >
                <span>Escalate to Safety Directorate &rarr;</span>
              </button>
              <button
                className="btn btn-secondary"
                onClick={() => setIsScheduleFollowUpModalOpen(true)}
                style={{ justifyContent: 'center' }}
              >
                <span>Create Post-Verification Follow-Up</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
