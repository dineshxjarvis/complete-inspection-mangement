"use client";

import React from 'react';
import { useRegulatoryAction } from '../../context/RegulatoryActionContext';
import {
  X,
  FileText,
  Lock,
  Download,
  Hash,
  Calendar,
  Building,
  User,
  ShieldCheck,
  Printer
} from 'lucide-react';

export const DocumentViewerModal: React.FC = () => {
  const {
    selectedDocumentForViewer,
    closeDocumentViewer,
    showToast
  } = useRegulatoryAction();

  if (!selectedDocumentForViewer) return null;

  const doc = selectedDocumentForViewer;

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(10, 15, 35, 0.75)',
        backdropFilter: 'blur(3px)',
        zIndex: 960,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px'
      }}
      onClick={closeDocumentViewer}
    >
      <div
        className="card"
        style={{
          width: '100%',
          maxWidth: '780px',
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
            background: 'linear-gradient(135deg, #1A237E 0%, #303F9F 100%)',
            color: '#FFFFFF',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <FileText size={20} color="#C5CAE9" />
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
                  {doc.id}
                </span>
                <span className="badge badge-subtle" style={{ background: '#FFF', color: '#1A237E' }}>
                  {doc.type}
                </span>
              </div>
              <h2 style={{ margin: '4px 0 0', fontSize: '15px', fontWeight: 700 }}>
                {doc.title}
              </h2>
            </div>
          </div>

          <button
            onClick={closeDocumentViewer}
            style={{
              background: 'none',
              border: 'none',
              color: '#C5CAE9',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center'
            }}
          >
            <X size={20} />
          </button>
        </div>

        {/* Modal Body & Metadata Strip */}
        <div style={{ padding: '20px', overflowY: 'auto', flex: 1 }}>
          {/* Immutability Banner */}
          <div
            style={{
              background: '#E8EAF6',
              border: '1px solid #C5CAE9',
              padding: '10px 14px',
              borderRadius: '6px',
              marginBottom: '16px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              fontSize: '12px',
              color: '#1A237E'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Lock size={14} color="#303F9F" />
              <span><strong>Immutable Statutory Record:</strong> Official document signed and archived under DGMS legal guidelines.</span>
            </div>
            <span className="badge badge-subtle font-mono" style={{ fontSize: '10.5px' }}>
              {doc.version}
            </span>
          </div>

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
              <span style={{ color: 'var(--text-muted)' }}>Issuing Authority:</span>
              <div style={{ fontWeight: 600, color: 'var(--text-primary)', marginTop: '2px' }}>{doc.authority}</div>
            </div>
            <div>
              <span style={{ color: 'var(--text-muted)' }}>Recipient Mine:</span>
              <div style={{ fontWeight: 600, color: 'var(--text-primary)', marginTop: '2px' }}>{doc.mine}</div>
            </div>
            <div>
              <span style={{ color: 'var(--text-muted)' }}>Statutory Finding:</span>
              <div style={{ fontWeight: 700, color: '#D32F2F', marginTop: '2px' }}>{doc.findingId}</div>
            </div>
            <div>
              <span style={{ color: 'var(--text-muted)' }}>Issue Date:</span>
              <div style={{ fontWeight: 600, color: 'var(--text-primary)', marginTop: '2px' }}>{doc.date}</div>
            </div>
            <div>
              <span style={{ color: 'var(--text-muted)' }}>Authorized Signatory:</span>
              <div style={{ fontWeight: 600, color: 'var(--text-primary)', marginTop: '2px' }}>{doc.issuer}</div>
            </div>
            <div>
              <span style={{ color: 'var(--text-muted)' }}>Archive Status:</span>
              <div style={{ fontWeight: 700, color: '#2E7D32', marginTop: '2px' }}>✓ {doc.status}</div>
            </div>
          </div>

          {/* Document Content Simulation */}
          <div
            style={{
              background: '#FAFAFA',
              border: '1px solid var(--border-color)',
              borderRadius: '6px',
              padding: '20px',
              fontFamily: 'serif',
              fontSize: '13.5px',
              lineHeight: 1.6,
              color: '#212121',
              marginBottom: '16px'
            }}
          >
            <div style={{ textAlign: 'center', borderBottom: '2px solid #1A237E', paddingBottom: '12px', marginBottom: '16px' }}>
              <div style={{ fontSize: '15px', fontWeight: 800, textTransform: 'uppercase', color: '#1A237E' }}>
                DIRECTORATE GENERAL OF MINES SAFETY / CIL SAFETY CELL
              </div>
              <div style={{ fontSize: '11px', color: '#616161', marginTop: '2px' }}>
                OFFICIAL STATUTORY RECORD UNDER COAL MINES REGULATIONS, 2017
              </div>
            </div>

            <p style={{ marginTop: 0 }}>
              <strong>DOCUMENT REFERENCE:</strong> {doc.id} &bull; <strong>DATE:</strong> {doc.date}
            </p>
            <p>
              <strong>SUBJECT:</strong> {doc.title}
            </p>
            <p style={{ textAlign: 'justify' }}>
              {doc.description}
            </p>
            <p style={{ textAlign: 'justify' }}>
              Pursuant to Section 22 and Chapter XIII of the Coal Mines Regulations (CMR) 2017, all recorded observations, quantitative anemometer readings (4.8 m/s against threshold ≥ 5.5 m/s), and physical evidence items have been validated and entered into the central STRATA statutory governance repository.
            </p>

            <div style={{ marginTop: '30px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', borderTop: '1px dashed #BDBDBD', paddingTop: '12px' }}>
              <div>
                <div style={{ fontSize: '11px', color: '#757575', fontFamily: 'monospace' }}>
                  SHA-256 HASH: {doc.sha256Hash}
                </div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontWeight: 700, color: '#1A237E' }}>{doc.issuer}</div>
                <div style={{ fontSize: '11px', color: '#757575' }}>Authorized DGMS Review Officer</div>
              </div>
            </div>
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
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '11.5px', color: 'var(--text-muted)' }}>
            <Hash size={13} color="#303F9F" />
            <span className="font-mono">Tamper-Proof Chained Digest</span>
          </div>

          <div style={{ display: 'flex', gap: '8px' }}>
            <button
              className="btn btn-secondary btn-sm"
              onClick={() => showToast(`Document ${doc.id} printed to statutory PDF`, 'info')}
            >
              <Printer size={13} />
              <span>Print</span>
            </button>
            <button
              className="btn btn-primary btn-sm"
              onClick={() => showToast(`Certified PDF archive downloaded for ${doc.id}`, 'success')}
              style={{ background: '#1A237E', borderColor: '#303F9F' }}
            >
              <Download size={13} />
              <span>Download Signed Copy</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
