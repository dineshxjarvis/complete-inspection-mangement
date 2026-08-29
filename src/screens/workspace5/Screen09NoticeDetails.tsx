"use client";

import React from 'react';
import { useRegulatoryAction } from '../../context/RegulatoryActionContext';
import {
  Send,
  Lock,
  FileText,
  Clock,
  CheckCircle,
  Building,
  User,
  Shield,
  ChevronLeft,
  ArrowRight,
  Eye,
  Hash,
  Download,
  AlertCircle
} from 'lucide-react';

export const Screen09NoticeDetails: React.FC = () => {
  const {
    activeNotice,
    navigateTo,
    openDocumentViewer,
    regulatoryDocuments,
    showToast
  } = useRegulatoryAction();

  const notice = activeNotice;

  const handleOpenDoc = () => {
    const doc = regulatoryDocuments.find(d => d.id === 'DOC-REG-001') || {
      id: notice.id,
      title: `Official Statutory Direction (${notice.noticeType})`,
      type: 'Direction' as const,
      authority: 'DGMS Review Liaison Cell',
      mine: notice.mine,
      findingId: notice.findingId,
      version: '1.0 (Official)',
      date: notice.issuedDate,
      status: 'Official / Sealed' as const,
      sha256Hash: notice.sha256Hash,
      fileSize: notice.fileSize,
      description: notice.actionRequired,
      issuer: notice.issuedBy
    };
    openDocumentViewer(doc);
  };

  return (
    <div className="screen-content">
      {/* Screen Header */}
      <div className="screen-header">
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
            <button
              className="btn btn-secondary btn-sm"
              onClick={() => navigateTo('08')}
              style={{ padding: '3px 8px' }}
            >
              <ChevronLeft size={13} />
              <span>Back to Regulatory Action</span>
            </button>
            <span
              className="id-badge font-mono"
              style={{
                fontSize: '12px',
                fontWeight: 700,
                background: 'rgba(63, 81, 181, 0.15)',
                color: '#1A237E'
              }}
            >
              STATUTORY NOTICE / DIRECTION
            </span>
            <span className="badge badge-info">{notice.noticeType}</span>
          </div>
          <h1 className="screen-title" style={{ margin: 0 }}>
            {notice.id} &bull; {notice.findingTitle}
          </h1>
          <p className="screen-subtitle">
            Issued to: <strong>{notice.recipient}</strong> &bull; Authority: {notice.issuedBy} &bull; Issued: {notice.issuedDate} &bull; Due: {notice.dueDate}
          </p>
        </div>

        {/* Action Buttons */}
        <div style={{ display: 'flex', gap: '8px' }}>
          <button
            className="btn btn-secondary btn-sm"
            onClick={handleOpenDoc}
          >
            <FileText size={13} />
            <span>View Official Sealed PDF</span>
          </button>
          <button
            className="btn btn-primary btn-sm"
            onClick={() => navigateTo('10')}
            style={{ background: '#1A237E', borderColor: '#303F9F' }}
          >
            <span>Review Mine Response (Screen 10)</span>
            <ArrowRight size={13} />
          </button>
        </div>
      </div>

      {/* Notice Details Layout */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: '20px', marginBottom: '30px' }}>
        {/* Left Column: Notice Provisions & Requirements */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {/* Statutory Requirement */}
          <div className="card" style={{ padding: '18px', borderLeft: '4px solid #1A237E' }}>
            <h3 style={{ margin: '0 0 10px', fontSize: '12.5px', fontWeight: 800, textTransform: 'uppercase', color: '#1A237E' }}>
              Enforceable Regulatory Requirement
            </h3>
            <div style={{ fontSize: '13.5px', fontWeight: 600, color: 'var(--text-primary)', lineHeight: 1.4 }}>
              {notice.regulatoryRequirement}
            </div>
            <div style={{ marginTop: '8px', fontSize: '11.5px', color: 'var(--text-muted)' }}>
              Linked Statutory Finding: <strong style={{ color: '#D32F2F' }}>{notice.findingId}</strong>
            </div>
          </div>

          {/* Action Required */}
          <div className="card" style={{ padding: '18px' }}>
            <h3 style={{ margin: '0 0 10px', fontSize: '12.5px', fontWeight: 800, textTransform: 'uppercase', color: 'var(--text-primary)' }}>
              Statutory Action Required from Mine Management
            </h3>
            <div style={{ background: 'var(--bg-surface-alt)', padding: '14px', borderRadius: '6px', fontSize: '13px', lineHeight: 1.5, color: 'var(--text-primary)' }}>
              {notice.actionRequired}
            </div>
          </div>

          {/* Mandatory Response Components */}
          <div className="card" style={{ padding: '18px' }}>
            <h3 style={{ margin: '0 0 10px', fontSize: '12.5px', fontWeight: 800, textTransform: 'uppercase', color: 'var(--text-primary)' }}>
              Required Response Components & Submissions
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
              {notice.requiredResponse.map((item, idx) => (
                <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 10px', background: '#E8EAF6', borderRadius: '4px', fontSize: '12px', color: '#1A237E', fontWeight: 600 }}>
                  <CheckCircle size={13} color="#303F9F" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Delivery Stage & Immutability */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {/* NOTICE DELIVERY STAGES */}
          <div className="card" style={{ padding: '20px', borderTop: '4px solid #1A237E' }}>
            <h3 style={{ margin: '0 0 14px', fontSize: '13px', fontWeight: 800, textTransform: 'uppercase', color: '#1A237E' }}>
              Electronic Delivery & Lifecycle Audit
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {notice.deliveryEvents.map((evt, idx) => (
                <div key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', fontSize: '12px' }}>
                  <div
                    style={{
                      width: '24px',
                      height: '24px',
                      borderRadius: '50%',
                      background: '#E8EAF6',
                      color: '#1A237E',
                      border: '1.5px solid #303F9F',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontWeight: 700,
                      fontSize: '11px'
                    }}
                  >
                    ✓
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 700, color: 'var(--text-primary)' }}>{evt.stage}</div>
                    <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>{evt.timestamp} &bull; {evt.actor}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* SEALED INTEGRITY CARD */}
          <div className="card" style={{ padding: '16px', background: '#FAFAFA' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', fontWeight: 800, color: '#1A237E', marginBottom: '8px' }}>
              <Lock size={14} />
              <span>STATUTORY RECORD LOCK</span>
            </div>
            <p style={{ margin: '0 0 10px', fontSize: '11.5px', color: 'var(--text-secondary)', lineHeight: 1.4 }}>
              "A formal notice cannot be silently edited after issuance. Any revisions require a supplementary addendum with full audit tracking."
            </p>
            <div style={{ fontSize: '10.5px', color: 'var(--text-muted)', fontFamily: 'monospace' }}>
              SHA-256 HASH: {notice.sha256Hash}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
