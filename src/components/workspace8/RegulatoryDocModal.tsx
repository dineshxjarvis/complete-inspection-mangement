"use client";

import React from 'react';
import { useOversight } from '../../context/OversightContext';
import {
  X,
  FileText,
  Lock,
  Printer,
  Download,
  ShieldCheck,
  Building,
  Calendar,
  AlertOctagon
} from 'lucide-react';

export const RegulatoryDocModal: React.FC = () => {
  const {
    isRegulatoryDocModalOpen,
    setIsRegulatoryDocModalOpen,
    selectedRegulatoryDoc,
    showToast
  } = useOversight();

  if (!isRegulatoryDocModalOpen || !selectedRegulatoryDoc) return null;

  const doc = selectedRegulatoryDoc;

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(15, 10, 35, 0.8)',
        backdropFilter: 'blur(3px)',
        zIndex: 960,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px'
      }}
      onClick={() => setIsRegulatoryDocModalOpen(false)}
    >
      <div
        className="card"
        style={{
          width: '100%',
          maxWidth: '740px',
          maxHeight: '90vh',
          backgroundColor: '#FFFFFF',
          borderRadius: '8px',
          boxShadow: '0 20px 50px rgba(0,0,0,0.5)',
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
            background: 'linear-gradient(135deg, #1E1B4B 0%, #312E81 100%)',
            color: '#FFFFFF',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderBottom: '2px solid #D97706'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Lock size={18} color="#FCD34D" />
            <div>
              <div style={{ fontSize: '11px', color: '#FCD34D', fontWeight: 800, textTransform: 'uppercase' }}>
                PROTECTED STATUTORY REGULATORY ARTIFACT (READ-ONLY)
              </div>
              <h2 style={{ margin: '2px 0 0', fontSize: '15px', fontWeight: 800 }}>
                {doc.authority} Statutory Notice &bull; {doc.reference}
              </h2>
            </div>
          </div>

          <button
            onClick={() => setIsRegulatoryDocModalOpen(false)}
            style={{
              background: 'none',
              border: 'none',
              color: '#FCD34D',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center'
            }}
          >
            <X size={18} />
          </button>
        </div>

        {/* Modal Body: Document Metadata & Preview */}
        <div style={{ padding: '20px', overflowY: 'auto', flex: 1 }}>
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
              <div style={{ fontWeight: 700, color: 'var(--text-primary)', marginTop: '2px' }}>{doc.authority} Inspectorate</div>
            </div>
            <div>
              <span style={{ color: 'var(--text-muted)' }}>Inspection Date:</span>
              <div style={{ fontWeight: 600, color: 'var(--text-primary)', marginTop: '2px' }}>{doc.inspectionDate}</div>
            </div>
            <div>
              <span style={{ color: 'var(--text-muted)' }}>Response Deadline:</span>
              <div style={{ fontWeight: 700, color: '#D32F2F', marginTop: '2px' }}>{doc.responseDueDate}</div>
            </div>
            <div>
              <span style={{ color: 'var(--text-muted)' }}>Target Colliery:</span>
              <div style={{ fontWeight: 700, color: '#1E1B4B', marginTop: '2px' }}>{doc.mine} ({doc.area})</div>
            </div>
            <div>
              <span style={{ color: 'var(--text-muted)' }}>Response Posture:</span>
              <div style={{ fontWeight: 600, color: '#006064', marginTop: '2px' }}>{doc.responseStatus}</div>
            </div>
            <div>
              <span style={{ color: 'var(--text-muted)' }}>Regulatory Status:</span>
              <div style={{ fontWeight: 700, color: '#D97706', marginTop: '2px' }}>{doc.regulatoryStatus}</div>
            </div>
          </div>

          {/* Document Content Simulation */}
          <div
            style={{
              background: '#FFF8E1',
              border: '1px solid #FFE082',
              borderRadius: '6px',
              padding: '16px',
              marginBottom: '16px',
              fontSize: '12.5px',
              lineHeight: 1.5
            }}
          >
            <div style={{ fontWeight: 800, color: '#B45309', marginBottom: '6px' }}>
              DIRECTORATE GENERAL OF MINES SAFETY — FORM IV STATUTORY NOTICE
            </div>
            <p style={{ margin: '0 0 10px', color: 'var(--text-primary)' }}>
              &quot;Under Regulation 153(2)(b) of the Coal Mines Regulations, 2017, take notice that during statutory inspection conducted on {doc.inspectionDate} at {doc.mine}, return airway velocity measured 4.8 m/s against mandated standard &ge; 5.5 m/s. Mine Management is hereby directed to rectify all ventilation regulators and submit certified traverse verification logs by {doc.responseDueDate}.&quot;
            </p>
            <div style={{ fontSize: '11px', color: 'var(--text-muted)', fontFamily: 'monospace' }}>
              SHA-256 DIGITAL SEAL: sha256_e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855
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
          <span style={{ fontSize: '11.5px', color: 'var(--text-muted)' }}>
            Official regulatory record &bull; Read-only immutable artifact
          </span>

          <div style={{ display: 'flex', gap: '8px' }}>
            <button
              className="btn btn-secondary btn-sm"
              onClick={() => showToast(`Sent ${doc.reference} to statutory printer`, 'info')}
            >
              <Printer size={13} />
              <span>Print Notice</span>
            </button>
            <button
              className="btn btn-primary btn-sm"
              onClick={() => showToast(`Downloaded certified copy of ${doc.reference}`, 'success')}
              style={{ background: '#1E1B4B', borderColor: '#312E81' }}
            >
              <Download size={13} />
              <span>Download PDF</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
