"use client";

import React from 'react';
import { useVerification } from '../../context/VerificationContext';
import {
  X,
  FileText,
  Camera,
  Activity,
  Download,
  Printer,
  Calendar,
  User,
  MapPin,
  CheckCircle2,
  Lock,
  Hash
} from 'lucide-react';

export const VerificationEvidenceModal: React.FC = () => {
  const {
    selectedEvidenceForViewer,
    closeEvidenceViewer,
    showToast
  } = useVerification();

  if (!selectedEvidenceForViewer) return null;

  const evd = selectedEvidenceForViewer;

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(2, 20, 25, 0.75)',
        backdropFilter: 'blur(3px)',
        zIndex: 960,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px'
      }}
      onClick={closeEvidenceViewer}
    >
      <div
        className="card"
        style={{
          width: '100%',
          maxWidth: '760px',
          maxHeight: '90vh',
          backgroundColor: '#FFFFFF',
          borderRadius: '8px',
          boxShadow: '0 20px 50px rgba(0,0,0,0.4)',
          display: 'flex',
          flexDirection: 'column',
          padding: 0,
          overflow: 'hidden'
        }}
        onClick={e => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div
          style={{
            padding: '16px 20px',
            background: 'linear-gradient(135deg, #006064 0%, #00838F 100%)',
            color: '#FFFFFF',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            {evd.type === 'Photo' ? (
              <Camera size={20} color="#80DEEA" />
            ) : evd.isMeasurement ? (
              <Activity size={20} color="#80DEEA" />
            ) : (
              <FileText size={20} color="#80DEEA" />
            )}
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span
                  style={{
                    background: 'rgba(255,255,255,0.2)',
                    fontSize: '11px',
                    fontFamily: 'monospace',
                    fontWeight: 700,
                    padding: '2px 8px',
                    borderRadius: '4px'
                  }}
                >
                  {evd.id}
                </span>
                <span className="badge badge-subtle" style={{ background: '#FFF', color: '#006064' }}>
                  {evd.type.toUpperCase()}
                </span>
              </div>
              <h2 style={{ margin: '4px 0 0', fontSize: '15px', fontWeight: 700 }}>
                {evd.title}
              </h2>
            </div>
          </div>

          <button
            onClick={closeEvidenceViewer}
            style={{
              background: 'none',
              border: 'none',
              color: '#80DEEA',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center'
            }}
          >
            <X size={20} />
          </button>
        </div>

        {/* Modal Body & Metadata */}
        <div style={{ padding: '20px', overflowY: 'auto', flex: 1 }}>
          {/* Metadata Grid */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: '12px',
              background: 'var(--bg-surface-alt)',
              padding: '14px',
              borderRadius: '6px',
              marginBottom: '16px',
              fontSize: '12px'
            }}
          >
            <div>
              <span style={{ color: 'var(--text-muted)' }}>Uploaded By:</span>
              <div style={{ fontWeight: 600, color: 'var(--text-primary)', marginTop: '2px' }}>{evd.uploadedBy}</div>
            </div>
            <div>
              <span style={{ color: 'var(--text-muted)' }}>Submission Date:</span>
              <div style={{ fontWeight: 600, color: 'var(--text-primary)', marginTop: '2px' }}>{evd.uploadTimestamp}</div>
            </div>
            <div>
              <span style={{ color: 'var(--text-muted)' }}>Location:</span>
              <div style={{ fontWeight: 600, color: 'var(--text-primary)', marginTop: '2px' }}>{evd.location}</div>
            </div>
            <div>
              <span style={{ color: 'var(--text-muted)' }}>Linked Action:</span>
              <div style={{ fontWeight: 700, color: '#006064', marginTop: '2px' }}>{evd.relatedAction}</div>
            </div>
            <div>
              <span style={{ color: 'var(--text-muted)' }}>File Details:</span>
              <div style={{ fontWeight: 600, color: 'var(--text-primary)', marginTop: '2px' }}>{evd.filename} ({evd.fileSize})</div>
            </div>
            <div>
              <span style={{ color: 'var(--text-muted)' }}>Audit Status:</span>
              <div style={{ fontWeight: 700, color: '#2E7D32', marginTop: '2px' }}>✓ {evd.status}</div>
            </div>
          </div>

          {/* Measurement Comparison Box */}
          {evd.measurementData && (
            <div style={{ background: '#E0F7FA', border: '1.5px solid #80DEEA', borderRadius: '6px', padding: '16px', marginBottom: '16px' }}>
              <div style={{ fontSize: '11px', fontWeight: 800, color: '#006064', textTransform: 'uppercase', marginBottom: '10px' }}>
                QUANTITATIVE STATUTORY MEASUREMENT COMPARISON
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px', marginBottom: '10px', textAlign: 'center' }}>
                <div style={{ background: '#FFF', padding: '10px', borderRadius: '4px', border: '1px solid #B2EBF2' }}>
                  <div style={{ fontSize: '10.5px', color: '#D32F2F', fontWeight: 700 }}>BEFORE ACTION (OBSERVED)</div>
                  <div style={{ fontSize: '18px', fontWeight: 800, color: '#D32F2F', marginTop: '2px' }}>{evd.measurementData.beforeValue}</div>
                </div>
                <div style={{ background: '#FFF', padding: '10px', borderRadius: '4px', border: '1px solid #B2EBF2' }}>
                  <div style={{ fontSize: '10.5px', color: '#006064', fontWeight: 700 }}>STATUTORY REQUIREMENT</div>
                  <div style={{ fontSize: '18px', fontWeight: 800, color: '#006064', marginTop: '2px' }}>{evd.measurementData.requiredThreshold}</div>
                </div>
                <div style={{ background: '#E8F5E9', padding: '10px', borderRadius: '4px', border: '1px solid #A5D6A7' }}>
                  <div style={{ fontSize: '10.5px', color: '#1B5E20', fontWeight: 700 }}>POST-REPAIR VERIFIED</div>
                  <div style={{ fontSize: '18px', fontWeight: 800, color: '#1B5E20', marginTop: '2px' }}>{evd.measurementData.afterValue}</div>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', fontSize: '12px', color: '#006064' }}>
                <div>Instrument: <strong>{evd.measurementData.instrument} ({evd.measurementData.instrumentId})</strong></div>
                <div>Calibration: <strong style={{ color: '#2E7D32' }}>✓ {evd.measurementData.calibrationStatus}</strong></div>
              </div>
            </div>
          )}

          {/* Photo Metadata */}
          {evd.photoData && (
            <div style={{ background: '#FAFAFA', border: '1px solid var(--border-color)', borderRadius: '6px', padding: '14px', marginBottom: '16px', fontSize: '12px' }}>
              <div style={{ fontSize: '11px', fontWeight: 800, color: '#006064', textTransform: 'uppercase', marginBottom: '6px' }}>
                OPTICAL EVIDENCE METADATA
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                <div>Capture Timestamp: <strong>{evd.photoData.timestamp}</strong></div>
                <div>GPS Coordinates: <code>{evd.photoData.gpsCoordinates}</code></div>
              </div>
            </div>
          )}

          {/* Verifier Remarks */}
          {evd.verifierRemarks && (
            <div style={{ background: '#FFF8E1', border: '1px solid #FFE082', borderRadius: '6px', padding: '12px', fontSize: '12.5px', color: '#B78103', marginBottom: '16px' }}>
              <strong>Verifier Assessment:</strong> "{evd.verifierRemarks}"
            </div>
          )}

          {/* Cryptographic SHA-256 Digest */}
          <div style={{ background: 'var(--bg-surface-alt)', padding: '10px 14px', borderRadius: '6px', fontSize: '11px', color: 'var(--text-muted)', fontFamily: 'monospace' }}>
            SHA-256 INTEGRITY DIGEST: {evd.sha256Hash}
          </div>
        </div>

        {/* Modal Footer */}
        <div
          style={{
            padding: '12px 20px',
            background: 'var(--bg-surface-alt)',
            borderTop: '1px solid var(--border-color)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}
        >
          <span style={{ fontSize: '11.5px', color: 'var(--text-muted)' }}>
            Tamper-proof statutory verification artifact
          </span>

          <div style={{ display: 'flex', gap: '8px' }}>
            <button
              className="btn btn-secondary btn-sm"
              onClick={() => showToast(`Evidence artifact ${evd.id} sent to auditor printer`, 'info')}
            >
              <Printer size={13} />
              <span>Print Certificate</span>
            </button>
            <button
              className="btn btn-primary btn-sm"
              onClick={() => showToast(`Downloaded certified copy for ${evd.id}`, 'success')}
              style={{ background: '#006064', borderColor: '#004D40' }}
            >
              <Download size={13} />
              <span>Download File</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
