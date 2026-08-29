"use client";

import React from 'react';
import { useCorrectiveAction } from '../../context/CorrectiveActionContext';
import {
  FileText,
  Camera,
  Activity,
  Eye,
  CheckCircle2,
  AlertTriangle,
  ChevronLeft,
  ArrowRight,
  ShieldCheck,
  FileUp
} from 'lucide-react';

export const Screen08EvidenceReview: React.FC = () => {
  const {
    activeCapa,
    openEvidenceViewer,
    navigateTo,
    showToast
  } = useCorrectiveAction();

  const capa = activeCapa;

  return (
    <div className="screen-content">
      {/* Screen Header */}
      <div className="screen-header">
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
            <button
              className="btn btn-secondary btn-sm"
              onClick={() => navigateTo('04')}
              style={{ padding: '3px 8px' }}
            >
              <ChevronLeft size={13} />
              <span>Back to CAPA Details</span>
            </button>
            <span
              className="id-badge font-mono"
              style={{
                fontSize: '12px',
                fontWeight: 700,
                background: 'rgba(0, 105, 92, 0.15)',
                color: '#004D40'
              }}
            >
              EVIDENCE VAULT & REVIEW
            </span>
          </div>
          <h1 className="screen-title" style={{ margin: 0 }}>
            {capa.id} &bull; UPLOADED VERIFICATION EVIDENCE
          </h1>
          <p className="screen-subtitle">
            Review engineering documents, photographic records, and post-repair measurement files attached to this corrective action
          </p>
        </div>

        <div style={{ display: 'flex', gap: '8px' }}>
          <button
            className="btn btn-secondary btn-sm"
            onClick={() => navigateTo('07')}
          >
            <FileUp size={13} />
            <span>+ Upload More Evidence</span>
          </button>
          <button
            className="btn btn-primary btn-sm"
            onClick={() => navigateTo('13')}
            style={{ background: '#00695C', borderColor: '#004D40' }}
          >
            <span>Proceed to Verification Submission</span>
            <ArrowRight size={13} />
          </button>
        </div>
      </div>

      {/* Evidence Table Grid */}
      <div className="card" style={{ padding: 0, overflow: 'hidden', marginBottom: '30px' }}>
        <table className="data-table">
          <thead>
            <tr>
              <th style={{ width: '130px' }}>Evidence ID</th>
              <th>Evidence Title & Description</th>
              <th style={{ width: '110px' }}>Type</th>
              <th style={{ width: '110px' }}>Task Ref</th>
              <th style={{ width: '180px' }}>Uploaded By</th>
              <th style={{ width: '120px' }}>Date</th>
              <th style={{ width: '160px' }}>Review Status</th>
              <th style={{ width: '90px', textAlign: 'center' }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {capa.evidenceList.map(evd => (
              <tr
                key={evd.id}
                onClick={() => openEvidenceViewer(evd)}
                style={{ cursor: 'pointer' }}
              >
                <td>
                  <span className="id-badge font-mono" style={{ background: 'rgba(0, 105, 92, 0.15)', color: '#004D40' }}>
                    {evd.id}
                  </span>
                </td>
                <td>
                  <div style={{ fontWeight: 600, color: 'var(--text-primary)', fontSize: '13px' }}>
                    {evd.title}
                  </div>
                  <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '2px' }}>
                    {evd.filename} &bull; <strong>{evd.fileSize}</strong>
                  </div>
                </td>
                <td>
                  <span className="badge badge-info font-mono" style={{ fontSize: '10.5px' }}>
                    {evd.type}
                  </span>
                </td>
                <td>
                  <span className="badge badge-subtle font-mono">{evd.relatedTaskId}</span>
                </td>
                <td>
                  <div style={{ fontSize: '12px', fontWeight: 600 }}>{evd.capturedBy}</div>
                </td>
                <td>
                  <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>{evd.date}</span>
                </td>
                <td>
                  <span className="badge badge-success font-bold" style={{ fontSize: '11px' }}>
                    ✓ {evd.status}
                  </span>
                </td>
                <td style={{ textAlign: 'center' }}>
                  <button
                    className="btn btn-secondary btn-sm"
                    onClick={e => {
                      e.stopPropagation();
                      openEvidenceViewer(evd);
                    }}
                    style={{ padding: '3px 8px' }}
                  >
                    <Eye size={12} />
                    <span>Inspect</span>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
