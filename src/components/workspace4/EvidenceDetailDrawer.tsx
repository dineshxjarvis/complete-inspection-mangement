"use client";

import React from 'react';
import { useMineResponse } from '../../context/MineResponseContext';
import {
  X,
  Lock,
  Camera,
  FileText,
  MapPin,
  Clock,
  User,
  Shield,
  Hash,
  Download,
  AlertCircle
} from 'lucide-react';

export const EvidenceDetailDrawer: React.FC = () => {
  const { selectedEvidenceForDrawer, closeEvidenceDrawer, showToast } = useMineResponse();

  if (!selectedEvidenceForDrawer) return null;

  const evd = selectedEvidenceForDrawer;

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(0,0,0,0.5)',
        backdropFilter: 'blur(2px)',
        zIndex: 900,
        display: 'flex',
        justifyContent: 'flex-end'
      }}
      onClick={closeEvidenceDrawer}
    >
      <div
        className="card"
        style={{
          width: '100%',
          maxWidth: '520px',
          height: '100vh',
          backgroundColor: '#FFFFFF',
          borderRadius: 0,
          borderLeft: '1px solid var(--border-color)',
          display: 'flex',
          flexDirection: 'column',
          padding: 0,
          boxShadow: '-8px 0 24px rgba(0,0,0,0.15)',
          overflowY: 'auto'
        }}
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div
          style={{
            padding: '16px 20px',
            background: 'var(--bg-surface-alt)',
            borderBottom: '1px solid var(--border-color)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span
              className="id-badge font-mono"
              style={{
                background: 'rgba(0, 137, 123, 0.15)',
                color: '#00796B',
                fontWeight: 700
              }}
            >
              {evd.id}
            </span>
            <div style={{ fontSize: '13px', fontWeight: 700, color: 'var(--text-primary)' }}>
              Inspection Evidence Record
            </div>
          </div>
          <button
            onClick={closeEvidenceDrawer}
            style={{
              background: 'none',
              border: 'none',
              color: 'var(--text-muted)',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center'
            }}
          >
            <X size={18} />
          </button>
        </div>

        {/* Immutability Banner */}
        <div
          style={{
            margin: '16px 20px 0',
            padding: '10px 14px',
            borderRadius: '6px',
            backgroundColor: '#ECEFF1',
            border: '1px solid #CFD8DC',
            display: 'flex',
            alignItems: 'center',
            gap: '10px'
          }}
        >
          <Lock size={16} color="#455A64" />
          <div style={{ fontSize: '11.5px', color: '#37474F', lineHeight: 1.3 }}>
            <strong>IMMUTABLE INSPECTOR RECORD — Read-Only:</strong> Original field inspection evidence cannot be modified or deleted by mine management.
          </div>
        </div>

        {/* Content Body */}
        <div style={{ padding: '20px', flex: 1 }}>
          <h3 style={{ margin: '0 0 6px', fontSize: '16px', fontWeight: 700, color: 'var(--text-primary)' }}>
            {evd.title}
          </h3>
          <p style={{ margin: '0 0 16px', fontSize: '12.5px', color: 'var(--text-secondary)', lineHeight: 1.45 }}>
            {evd.description}
          </p>

          {/* Visual Preview Box */}
          <div
            style={{
              height: '200px',
              backgroundColor: '#1E2530',
              borderRadius: '8px',
              border: '1px solid #37474F',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#B0BEC5',
              marginBottom: '20px',
              position: 'relative',
              overflow: 'hidden'
            }}
          >
            {evd.type === 'PHOTO' ? (
              <Camera size={36} color="#80CBC4" />
            ) : (
              <FileText size={36} color="#80CBC4" />
            )}
            <span style={{ marginTop: '8px', fontSize: '12px', fontWeight: 600, color: '#E0F2F1' }}>
              {evd.filename}
            </span>
            <span style={{ fontSize: '11px', color: '#78909C' }}>
              {evd.fileSize} &bull; High-Resolution Statutory Capture
            </span>
            <div
              style={{
                position: 'absolute',
                bottom: '10px',
                right: '10px',
                background: 'rgba(0,0,0,0.6)',
                padding: '3px 8px',
                borderRadius: '4px',
                fontSize: '10.5px',
                color: '#FFF',
                fontFamily: 'monospace'
              }}
            >
              TIMESTAMP VERIFIED
            </div>
          </div>

          {/* Metadata Grid */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '12px',
              marginBottom: '20px',
              fontSize: '12px'
            }}
          >
            <div style={{ background: 'var(--bg-surface-alt)', padding: '10px', borderRadius: '6px', border: '1px solid var(--border-light)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '5px', color: 'var(--text-muted)', fontSize: '11px', marginBottom: '3px' }}>
                <User size={12} />
                <span>Captured By</span>
              </div>
              <div style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{evd.capturedBy}</div>
            </div>

            <div style={{ background: 'var(--bg-surface-alt)', padding: '10px', borderRadius: '6px', border: '1px solid var(--border-light)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '5px', color: 'var(--text-muted)', fontSize: '11px', marginBottom: '3px' }}>
                <Clock size={12} />
                <span>Timestamp</span>
              </div>
              <div style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{evd.timestamp}</div>
            </div>

            <div style={{ background: 'var(--bg-surface-alt)', padding: '10px', borderRadius: '6px', border: '1px solid var(--border-light)', gridColumn: 'span 2' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '5px', color: 'var(--text-muted)', fontSize: '11px', marginBottom: '3px' }}>
                <MapPin size={12} />
                <span>Location & Coordinates</span>
              </div>
              <div style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{evd.location}</div>
              <div style={{ fontSize: '11px', color: 'var(--text-muted)', fontFamily: 'monospace', marginTop: '2px' }}>{evd.gpsCoordinates}</div>
            </div>

            <div style={{ background: 'var(--bg-surface-alt)', padding: '10px', borderRadius: '6px', border: '1px solid var(--border-light)', gridColumn: 'span 2' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '5px', color: 'var(--text-muted)', fontSize: '11px', marginBottom: '3px' }}>
                <Hash size={12} />
                <span>Cryptographic SHA-256 Hash</span>
              </div>
              <div style={{ fontSize: '10.5px', fontFamily: 'monospace', color: '#00796B', wordBreak: 'break-all' }}>
                {evd.sha256Hash}
              </div>
            </div>
          </div>

          {/* Traceability Linkages */}
          <div
            style={{
              background: '#E0F2F1',
              border: '1px solid #B2DFDB',
              borderRadius: '6px',
              padding: '12px 14px',
              fontSize: '12px'
            }}
          >
            <div style={{ fontWeight: 700, color: '#004D40', marginBottom: '6px', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Shield size={14} />
              <span>Statutory Inspection Linkages</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', color: '#00695C' }}>
              <div>&bull; Inspection: <strong>{evd.inspectionId}</strong></div>
              <div>&bull; Checklist Item: <strong>{evd.linkedChecklistId} (REQ-VENT-014)</strong></div>
              <div>&bull; Observation: <strong>{evd.linkedObservationId}</strong></div>
            </div>
          </div>
        </div>

        {/* Drawer Actions */}
        <div
          style={{
            padding: '14px 20px',
            borderTop: '1px solid var(--border-color)',
            background: 'var(--bg-surface-alt)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}
        >
          <button
            className="btn btn-secondary btn-sm"
            onClick={() => showToast(`Downloaded statutory evidence artifact ${evd.filename}`, 'success')}
          >
            <Download size={13} />
            <span>Download Original</span>
          </button>
          <button
            className="btn btn-secondary btn-sm"
            onClick={closeEvidenceDrawer}
          >
            Close Viewer
          </button>
        </div>
      </div>
    </div>
  );
};
