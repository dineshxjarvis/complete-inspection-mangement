"use client";

import React from 'react';
import { useFieldInspection } from '../../context/FieldInspectionContext';
import {
  CheckSquare,
  AlertTriangle,
  HardHat,
  Wrench,
  Wifi,
  Clock,
  ArrowLeft,
  ArrowRight,
  Shield,
  Save,
  CheckCircle2
} from 'lucide-react';

export const Screen04ReadinessCheck: React.FC = () => {
  const {
    activeInspection,
    readinessChecks,
    toggleReadiness,
    areRequiredReadinessComplete,
    navigateTo,
    isOnline,
    lastSyncTime,
    showToast
  } = useFieldInspection();

  const isReady = areRequiredReadinessComplete();

  const handleStart = () => {
    if (!isReady) {
      showToast('Mandatory pre-field readiness conditions are incomplete. Please complete all required checks.', 'error');
      return;
    }
    navigateTo('05');
  };

  return (
    <div className="screen-content">
      {/* Header */}
      <div className="screen-header">
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span className="id-badge font-mono" style={{ fontSize: '11px', fontWeight: 700 }}>
              {activeInspection.id}
            </span>
            <span className="badge badge-info">STEP 04 OF FIELD LIFECYCLE</span>
          </div>
          <h1 className="screen-title" style={{ marginTop: '4px' }}>
            PRE-FIELD READINESS VERIFICATION
          </h1>
          <p className="screen-subtitle">
            Statutory confirmation of inspector competencies, instruments calibration, safety gear & offline sync
          </p>
        </div>

        <div style={{ display: 'flex', gap: '10px' }}>
          <button className="btn btn-secondary" onClick={() => navigateTo('03')}>
            <ArrowLeft size={14} />
            <span>Back to Brief</span>
          </button>
          <button
            className="btn btn-primary"
            onClick={handleStart}
            disabled={!isReady}
            style={{
              background: isReady ? '#FF6B00' : '#A0AEC0',
              borderColor: isReady ? '#FF6B00' : '#A0AEC0',
              cursor: isReady ? 'pointer' : 'not-allowed'
            }}
          >
            <span>Proceed to Start Inspection</span>
            <ArrowRight size={14} />
          </button>
        </div>
      </div>

      {/* Warning banner if incomplete */}
      {!isReady && (
        <div
          style={{
            background: 'var(--status-red-bg)',
            border: '1px solid var(--status-red-border)',
            borderRadius: '8px',
            padding: '12px 16px',
            marginBottom: '20px',
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            color: '#B71C1C'
          }}
        >
          <AlertTriangle size={20} />
          <div>
            <div style={{ fontWeight: 700, fontSize: '13px' }}>
              Statutory Readiness Incomplete
            </div>
            <div style={{ fontSize: '12px' }}>
              Inspection cannot be started until all mandatory pre-field readiness conditions are satisfied.
            </div>
          </div>
        </div>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '20px' }}>
        
        {/* Left Column: 9 Readiness Checklist Items */}
        <div className="card">
          <h3 style={{ fontSize: '14px', fontWeight: 700, marginBottom: '14px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span>MANDATORY READINESS CHECKLIST</span>
            <span style={{ fontSize: '12px', color: isReady ? '#2E7D32' : '#E65100' }}>
              {readinessChecks.filter(c => c.checked).length} of {readinessChecks.length} Verified
            </span>
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {readinessChecks.map(item => (
              <div
                key={item.id}
                onClick={() => toggleReadiness(item.id)}
                style={{
                  padding: '12px 14px',
                  borderRadius: '6px',
                  border: `1px solid ${item.checked ? 'var(--status-green-border)' : 'var(--border-color)'}`,
                  background: item.checked ? 'var(--status-green-bg)' : 'var(--bg-surface-subtle)',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  transition: 'all 0.15s ease'
                }}
              >
                <div
                  style={{
                    width: '20px',
                    height: '20px',
                    borderRadius: '4px',
                    border: `2px solid ${item.checked ? '#2E7D32' : 'var(--border-color)'}`,
                    background: item.checked ? '#2E7D32' : '#FFF',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0
                  }}
                >
                  {item.checked && <CheckCircle2 size={16} color="#FFF" />}
                </div>

                <div style={{ flex: 1 }}>
                  <span
                    style={{
                      fontSize: '13px',
                      fontWeight: 500,
                      color: item.checked ? '#1B5E20' : 'var(--text-primary)'
                    }}
                  >
                    {item.label}
                  </span>
                  {item.required && (
                    <span style={{ marginLeft: '6px', fontSize: '10.5px', color: '#D32F2F', fontWeight: 700 }}>
                      [REQUIRED]
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Instrument, PPE & Connection Verification */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          
          {/* Instruments verification */}
          <div className="card">
            <h3 style={{ fontSize: '13.5px', fontWeight: 700, marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Wrench size={15} color="#FF6B00" />
              <span>TEST INSTRUMENTS STATUS</span>
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <div style={{ padding: '8px 12px', background: 'var(--bg-surface-subtle)', borderRadius: '6px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <div style={{ fontSize: '12.5px', fontWeight: 600 }}>Digital Vane Anemometer</div>
                  <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>SN-AN-4491 &bull; Cal Due: 05 May 2027</div>
                </div>
                <span className="badge badge-success">✓ Calibrated & Ready</span>
              </div>

              <div style={{ padding: '8px 12px', background: 'var(--bg-surface-subtle)', borderRadius: '6px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <div style={{ fontSize: '12.5px', fontWeight: 600 }}>Multi-Gas Detector MX6 iBrid</div>
                  <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>SN-GD-8802 &bull; Cal Due: 18 Dec 2026</div>
                </div>
                <span className="badge badge-success">✓ Zeroed & Bump-Tested</span>
              </div>
            </div>
          </div>

          {/* PPE Verification */}
          <div className="card">
            <h3 style={{ fontSize: '13.5px', fontWeight: 700, marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <HardHat size={15} color="#FF6B00" />
              <span>SAFETY PPE COMPLIANCE</span>
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
              <div style={{ padding: '6px 10px', background: 'var(--bg-surface-subtle)', borderRadius: '4px', fontSize: '11.5px', color: '#1B5E20', fontWeight: 600 }}>
                ✓ Helmet (IS 2925)
              </div>
              <div style={{ padding: '6px 10px', background: 'var(--bg-surface-subtle)', borderRadius: '4px', fontSize: '11.5px', color: '#1B5E20', fontWeight: 600 }}>
                ✓ Safety Shoes (Steel-Toe)
              </div>
              <div style={{ padding: '6px 10px', background: 'var(--bg-surface-subtle)', borderRadius: '4px', fontSize: '11.5px', color: '#1B5E20', fontWeight: 600 }}>
                ✓ SCSR (60-Min Rescuer)
              </div>
              <div style={{ padding: '6px 10px', background: 'var(--bg-surface-subtle)', borderRadius: '4px', fontSize: '11.5px', color: '#1B5E20', fontWeight: 600 }}>
                ✓ Cap Lamp (Approved)
              </div>
            </div>
          </div>

          {/* Connection Status */}
          <div className="card">
            <h3 style={{ fontSize: '13.5px', fontWeight: 700, marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Wifi size={15} color="#2E7D32" />
              <span>CONNECTION & SYNCHRONIZATION STATE</span>
            </h3>
            <div style={{ fontSize: '12.5px', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
              Status: <strong style={{ color: isOnline ? '#2E7D32' : '#E65100' }}>{isOnline ? 'Online (DGMS Gateway)' : 'Offline Local Storage'}</strong><br />
              Last Synchronization: <span className="font-mono">10:12 AM IST</span><br />
              Local Storage: <span className="font-mono">824 MB Available (Encrypted SQLite)</span>
            </div>
          </div>

        </div>

      </div>

      {/* Action Footer */}
      <div style={{ marginTop: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <button className="btn btn-secondary" onClick={() => navigateTo('03')}>
          <ArrowLeft size={14} />
          <span>Back to Brief</span>
        </button>

        <div style={{ display: 'flex', gap: '12px' }}>
          <button className="btn btn-secondary" onClick={() => showToast('Readiness draft saved locally', 'info')}>
            <Save size={14} />
            <span>Save Readiness Draft</span>
          </button>
          <button
            className="btn btn-primary"
            onClick={handleStart}
            disabled={!isReady}
            style={{
              background: isReady ? '#FF6B00' : '#A0AEC0',
              borderColor: isReady ? '#FF6B00' : '#A0AEC0'
            }}
          >
            <span>Confirm & Proceed to Start Inspection</span>
            <ArrowRight size={14} />
          </button>
        </div>
      </div>
    </div>
  );
};
