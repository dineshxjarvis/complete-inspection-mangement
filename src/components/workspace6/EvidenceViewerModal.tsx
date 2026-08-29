"use client";

import React from 'react';
import { useCorrectiveAction } from '../../context/CorrectiveActionContext';
import {
  X,
  FileText,
  Camera,
  Activity,
  Download,
  Printer,
  Lock,
  Calendar,
  User,
  MapPin,
  CheckCircle2,
  Hash
} from 'lucide-react';

export const EvidenceViewerModal: React.FC = () => {
  const {
    selectedEvidenceForViewer,
    closeEvidenceViewer,
    showToast
  } = useCorrectiveAction();

  if (!selectedEvidenceForViewer) return null;

  const evd = selectedEvidenceForViewer;

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(5, 20, 15, 0.75)',
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
          maxWidth: '740px',
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
            background: 'linear-gradient(135deg, #00695C 0%, #004D40 100%)',
            color: '#FFFFFF',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            {evd.type === 'Photo' ? (
              <Camera size={20} color="#80CBC4" />
            ) : evd.type === 'Measurement' ? (
              <Activity size={20} color="#80CBC4" />
            ) : (
              <FileText size={20} color="#80CBC4" />
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
                <span className="badge badge-subtle" style={{ background: '#FFF', color: '#004D40' }}>
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
              color: '#80CBC4',
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
              <span style={{ color: 'var(--text-muted)' }}>Captured By:</span>
              <div style={{ fontWeight: 600, color: 'var(--text-primary)', marginTop: '2px' }}>{evd.capturedBy}</div>
            </div>
            <div>
              <span style={{ color: 'var(--text-muted)' }}>Capture Date:</span>
              <div style={{ fontWeight: 600, color: 'var(--text-primary)', marginTop: '2px' }}>{evd.date}</div>
            </div>
            <div>
              <span style={{ color: 'var(--text-muted)' }}>Location:</span>
              <div style={{ fontWeight: 600, color: 'var(--text-primary)', marginTop: '2px' }}>{evd.location}</div>
            </div>
            <div>
              <span style={{ color: 'var(--text-muted)' }}>Linked Task:</span>
              <div style={{ fontWeight: 700, color: '#00695C', marginTop: '2px' }}>{evd.relatedTaskId}</div>
            </div>
            <div>
              <span style={{ color: 'var(--text-muted)' }}>File Size:</span>
              <div style={{ fontWeight: 600, color: 'var(--text-primary)', marginTop: '2px' }}>{evd.fileSize} ({evd.filename})</div>
            </div>
            <div>
              <span style={{ color: 'var(--text-muted)' }}>Review Status:</span>
              <div style={{ fontWeight: 700, color: '#2E7D32', marginTop: '2px' }}>✓ {evd.status}</div>
            </div>
          </div>

          {/* Description */}
          <div style={{ marginBottom: '16px', fontSize: '13px', lineHeight: 1.5, color: 'var(--text-primary)' }}>
            <strong>Evidence Narrative:</strong> {evd.description}
          </div>

          {/* If Measurement */}
          {evd.measurementData && (
            <div style={{ background: '#E8F5E9', border: '1px solid #C8E6C9', borderRadius: '6px', padding: '16px', marginBottom: '16px' }}>
              <div style={{ fontSize: '11px', fontWeight: 800, color: '#2E7D32', textTransform: 'uppercase', marginBottom: '8px' }}>
                STATUTORY MEASUREMENT DATA
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', fontSize: '13px' }}>
                <div>Observed Value: <strong style={{ color: '#2E7D32', fontSize: '16px' }}>{evd.measurementData.value} {evd.measurementData.unit}</strong></div>
                <div>Instrument: <strong>{evd.measurementData.instrument}</strong></div>
                <div>Instrument Serial: <strong>{evd.measurementData.instrumentId}</strong></div>
                <div>Calibration: <strong style={{ color: '#2E7D32' }}>{evd.measurementData.calibrationStatus}</strong></div>
              </div>
            </div>
          )}

          {/* If Photo */}
          {evd.photoData && (
            <div style={{ background: '#FAFAFA', border: '1px solid var(--border-color)', borderRadius: '6px', padding: '16px', marginBottom: '16px' }}>
              <div style={{ fontSize: '11px', fontWeight: 800, color: '#00695C', textTransform: 'uppercase', marginBottom: '8px' }}>
                OPTICAL CAPTURE METADATA
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', fontSize: '12px' }}>
                <div>Timestamp: <strong>{evd.photoData.timestamp}</strong></div>
                <div>GPS Coordinates: <code>{evd.photoData.gpsCoordinates || '24°11\'48.2"N 82°41\'15.6"E'}</code></div>
              </div>
            </div>
          )}

          {/* Cryptographic SHA-256 Digest */}
          <div style={{ background: 'var(--bg-surface-alt)', padding: '10px 14px', borderRadius: '6px', fontSize: '11px', color: 'var(--text-muted)', fontFamily: 'monospace' }}>
            SHA-256 HASH: {evd.sha256Hash}
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
            Tamper-proof corrective evidence record
          </span>

          <div style={{ display: 'flex', gap: '8px' }}>
            <button
              className="btn btn-secondary btn-sm"
              onClick={() => showToast(`Evidence artifact ${evd.id} sent to statutory printer`, 'info')}
            >
              <Printer size={13} />
              <span>Print</span>
            </button>
            <button
              className="btn btn-primary btn-sm"
              onClick={() => showToast(`Downloaded certified copy for ${evd.id}`, 'success')}
              style={{ background: '#00695C', borderColor: '#004D40' }}
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
