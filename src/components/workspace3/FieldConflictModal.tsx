"use client";

import React from 'react';
import { useFieldInspection } from '../../context/FieldInspectionContext';
import { AlertTriangle, GitMerge, Check, X, User } from 'lucide-react';

export const FieldConflictModal: React.FC = () => {
  const {
    hasConcurrentConflict,
    setHasConcurrentConflict,
    resolveConflict
  } = useFieldInspection();

  if (!hasConcurrentConflict) return null;

  return (
    <div className="modal-backdrop" style={{ display: 'flex', zIndex: 10002 }}>
      <div
        className="modal-dialog"
        style={{
          maxWidth: '720px',
          width: '92%',
          background: '#1A202C',
          color: '#F7FAFC',
          borderRadius: '12px',
          border: '1px solid #E53E3E',
          boxShadow: '0 24px 60px rgba(229, 62, 62, 0.3)'
        }}
      >
        <div
          style={{
            padding: '16px 20px',
            borderBottom: '1px solid #2D3748',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            background: 'rgba(229, 62, 62, 0.15)'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <AlertTriangle size={20} color="#FC8181" />
            <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 700, color: '#FEB2B2' }}>
              Concurrent Field Edit Conflict Detected (REQ-VENT-014)
            </h3>
          </div>
          <button
            onClick={() => setHasConcurrentConflict(false)}
            style={{ background: 'none', border: 'none', color: '#A0AEC0', cursor: 'pointer' }}
          >
            <X size={18} />
          </button>
        </div>

        <div style={{ padding: '20px' }}>
          <p style={{ fontSize: '13.5px', color: '#CBD5E0', lineHeight: 1.5, marginBottom: '16px' }}>
            Two team members submitted updates to <strong>REQ-VENT-014</strong> at approximately the same timestamp during offline/online sync reconnect. Please select which verified version should be committed to the master statutory record:
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            {/* Local Version */}
            <div
              style={{
                background: '#242D3D',
                border: '1px solid #4A5568',
                borderRadius: '8px',
                padding: '16px'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                <div style={{ background: '#E65100', color: '#FFF', width: '24px', height: '24px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '11px', fontWeight: 700 }}>
                  RS
                </div>
                <div>
                  <span style={{ fontSize: '12.5px', fontWeight: 700, color: '#FFF', display: 'block' }}>
                    Your Version (Local)
                  </span>
                  <span style={{ fontSize: '11px', color: '#A0AEC0' }}>
                    R. Sharma &bull; 11:10 AM
                  </span>
                </div>
              </div>

              <div style={{ background: '#1A202C', padding: '10px', borderRadius: '6px', fontSize: '12px', marginBottom: '12px' }}>
                <div style={{ color: '#FFB74D', fontWeight: 600 }}>Status: Non-Compliant</div>
                <div style={{ color: '#E2E8F0', marginTop: '4px' }}>Value: 210.4 m³/min (Vane Anemometer)</div>
                <div style={{ color: '#94A3B8', marginTop: '4px' }}>Observation: Torn brattice cloth bypassed in 3rd dip.</div>
              </div>

              <button
                className="btn btn-primary btn-sm"
                onClick={() => resolveConflict('local')}
                style={{ width: '100%', background: '#FF6B00', borderColor: '#FF6B00', color: '#FFF' }}
              >
                <Check size={13} />
                <span>Keep Your Version</span>
              </button>
            </div>

            {/* Remote Version */}
            <div
              style={{
                background: '#242D3D',
                border: '1px solid #4A5568',
                borderRadius: '8px',
                padding: '16px'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                <div style={{ background: '#311B92', color: '#FFF', width: '24px', height: '24px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '11px', fontWeight: 700 }}>
                  KR
                </div>
                <div>
                  <span style={{ fontSize: '12.5px', fontWeight: 700, color: '#FFF', display: 'block' }}>
                    Colleague Version (Remote)
                  </span>
                  <span style={{ fontSize: '11px', color: '#A0AEC0' }}>
                    K. Rao &bull; 11:12 AM
                  </span>
                </div>
              </div>

              <div style={{ background: '#1A202C', padding: '10px', borderRadius: '6px', fontSize: '12px', marginBottom: '12px' }}>
                <div style={{ color: '#FFB74D', fontWeight: 600 }}>Status: Non-Compliant</div>
                <div style={{ color: '#E2E8F0', marginTop: '4px' }}>Value: 212.0 m³/min (Optical Velocity)</div>
                <div style={{ color: '#94A3B8', marginTop: '4px' }}>Observation: Measured at intake split corner.</div>
              </div>

              <button
                className="btn btn-secondary btn-sm"
                onClick={() => resolveConflict('remote')}
                style={{ width: '100%', background: '#4A5568', color: '#FFF', borderColor: '#4A5568' }}
              >
                <GitMerge size={13} />
                <span>Accept Remote Version</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
