"use client";

import React, { useState } from 'react';
import { useMineResponse } from '../../context/MineResponseContext';
import { MineDocumentUpload } from '../../types/mineResponse';
import {
  Upload,
  FileText,
  Paperclip,
  CheckCircle,
  AlertTriangle,
  Lock,
  ChevronLeft,
  Calendar,
  User,
  Building,
  Hash,
  Eye,
  Camera,
  Award
} from 'lucide-react';

export const Screen17DocumentSubmission: React.FC = () => {
  const {
    uploadedDocuments,
    uploadMineDocument,
    findings,
    capaList,
    navigateTo,
    showToast
  } = useMineResponse();

  const [title, setTitle] = useState('');
  const [docType, setDocType] = useState<MineDocumentUpload['documentType']>('Maintenance Report');
  const [relatedFinding, setRelatedFinding] = useState('FND-2026-00127');
  const [relatedCapa, setRelatedCapa] = useState('CAPA-2026-0048');
  const [description, setDescription] = useState('');
  const [fileName, setFileName] = useState('airflow_traverse_sheet_rev2.pdf');

  const handleUploadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      showToast('Document Title is mandatory', 'error');
      return;
    }

    uploadMineDocument({
      title,
      documentType: docType,
      relatedFindingId: relatedFinding,
      relatedCapaId: relatedCapa,
      uploadedBy: 'Er. A. K. Verma (Mine Manager)',
      fileSize: '2.4 MB',
      fileFormat: 'PDF / Signed Optical Scan',
      status: 'Attached to Response'
    });

    setTitle('');
    setDescription('');
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
              className="id-badge font-mono"
              style={{
                fontSize: '12px',
                fontWeight: 700,
                background: 'rgba(0, 137, 123, 0.15)',
                color: '#00796B'
              }}
            >
              WORKSPACE 04 &bull; EVIDENCE SUBMISSION
            </span>
          </div>
          <h1 className="screen-title" style={{ margin: 0 }}>
            MINE DOCUMENT & EVIDENCE UPLOAD PORTAL
          </h1>
          <p className="screen-subtitle">
            Upload and link maintenance certificates, recalibration logs, and photographic proof to active Responses & CAPAs
          </p>
        </div>

        <button
          className="btn btn-secondary btn-sm"
          onClick={() => navigateTo('06')}
        >
          <Camera size={13} />
          <span>View Inspection Evidence Gallery</span>
        </button>
      </div>

      {/* Governance Notice */}
      <div
        className="card"
        style={{
          background: '#E0F2F1',
          border: '1px solid #80CBC4',
          padding: '10px 16px',
          marginBottom: '16px',
          display: 'flex',
          alignItems: 'center',
          gap: '10px'
        }}
      >
        <Lock size={15} color="#00695C" />
        <span style={{ fontSize: '12px', color: '#004D40' }}>
          <strong>Statutory Storage Rule:</strong> Uploaded mine documents are sealed with SHA-256 hashes and linked directly to the finding/CAPA dossier. Original inspector evidence remains immutable and cannot be overwritten.
        </span>
      </div>

      {/* Grid: Upload Form on Left, Uploaded Vault on Right */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1.3fr', gap: '16px', marginBottom: '30px' }}>
        {/* Left: Upload Form */}
        <div className="card" style={{ padding: '18px' }}>
          <h3 style={{ margin: '0 0 14px', fontSize: '13.5px', fontWeight: 700, color: 'var(--text-primary)', textTransform: 'uppercase' }}>
            UPLOAD STATUTORY EVIDENCE ARTIFACT
          </h3>

          <form onSubmit={handleUploadSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {/* Title */}
            <div>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, marginBottom: '6px' }}>
                Document Title / Artifact Name *
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="e.g. Post-Repair Return Airway Velocity Test Log Sheet"
                value={title}
                onChange={e => setTitle(e.target.value)}
                required
                style={{ fontSize: '12.5px' }}
              />
            </div>

            {/* Document Type */}
            <div>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, marginBottom: '6px' }}>
                Statutory Document Category *
              </label>
              <select
                className="form-control"
                value={docType}
                onChange={e => setDocType(e.target.value as any)}
                required
                style={{ fontSize: '12.5px' }}
              >
                <option value="Maintenance Report">Maintenance & Overhaul Report</option>
                <option value="Post-Repair Airflow Log">Post-Repair Airflow Velocity Log</option>
                <option value="Calibration Certificate">Calibration Certificate (National Metrology)</option>
                <option value="Statutory Form II">Statutory Form II / DGMS Return</option>
                <option value="Safety Committee Minute">Safety Committee Meeting Minutes</option>
                <option value="Photographic Proof">Photographic Proof of Rectification</option>
              </select>
            </div>

            {/* Context Linking: Finding & CAPA */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, marginBottom: '6px' }}>
                  Link to Finding *
                </label>
                <select
                  className="form-control"
                  value={relatedFinding}
                  onChange={e => setRelatedFinding(e.target.value)}
                  style={{ fontSize: '12px' }}
                >
                  {findings.map(f => (
                    <option key={f.id} value={f.id}>
                      {f.id} ({f.requirementId})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, marginBottom: '6px' }}>
                  Link to CAPA *
                </label>
                <select
                  className="form-control"
                  value={relatedCapa}
                  onChange={e => setRelatedCapa(e.target.value)}
                  style={{ fontSize: '12px' }}
                >
                  {capaList.map(c => (
                    <option key={c.id} value={c.id}>
                      {c.id}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* File Dropzone Mock */}
            <div>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, marginBottom: '6px' }}>
                Select File Artifact (PDF, PNG, JPG, DOCX &bull; Max 25MB)
              </label>
              <div
                style={{
                  border: '2px dashed var(--border-color)',
                  borderRadius: '6px',
                  padding: '20px',
                  textAlign: 'center',
                  background: 'var(--bg-surface-alt)',
                  cursor: 'pointer'
                }}
                onClick={() => {
                  setFileName(`certified_scan_${Date.now().toString().slice(-4)}.pdf`);
                  showToast('Sample file selected for upload', 'info');
                }}
              >
                <Upload size={24} color="#00897B" style={{ margin: '0 auto 6px' }} />
                <div style={{ fontSize: '12.5px', fontWeight: 600, color: 'var(--text-primary)' }}>
                  {fileName}
                </div>
                <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '2px' }}>
                  Click to select replacement artifact
                </div>
              </div>
            </div>

            {/* Description */}
            <div>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, marginBottom: '6px' }}>
                Technical Remarks / Calibration Validity
              </label>
              <textarea
                className="form-control"
                rows={2}
                placeholder="Include instrument serial numbers, calibration validity dates, or engineer notes..."
                value={description}
                onChange={e => setDescription(e.target.value)}
                style={{ height: 'auto', fontSize: '12px' }}
              />
            </div>

            <button
              type="submit"
              className="btn btn-primary"
              style={{ background: '#00897B', borderColor: '#00796B', padding: '10px', justifyContent: 'center' }}
            >
              <Upload size={14} />
              <span>Upload & Sign Artifact to Dossier</span>
            </button>
          </form>
        </div>

        {/* Right: Uploaded Evidence Vault */}
        <div className="card" style={{ padding: '18px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
            <h3 style={{ margin: 0, fontSize: '13.5px', fontWeight: 700, color: 'var(--text-primary)', textTransform: 'uppercase' }}>
              MINE UPLOADED DOCUMENTS VAULT ({uploadedDocuments.length})
            </h3>
            <span className="badge badge-info font-mono">SEALED DOSSIER</span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', maxHeight: '580px', overflowY: 'auto' }}>
            {uploadedDocuments.map(doc => (
              <div
                key={doc.id}
                style={{
                  padding: '12px',
                  background: 'var(--bg-surface-alt)',
                  borderRadius: '6px',
                  border: '1px solid var(--border-light)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '6px'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span className="id-badge font-mono" style={{ background: 'rgba(0, 137, 123, 0.15)', color: '#00796B' }}>
                    {doc.id}
                  </span>
                  <span className="badge badge-success font-mono" style={{ fontSize: '10.5px' }}>
                    ✓ {doc.status}
                  </span>
                </div>

                <div style={{ fontSize: '13px', fontWeight: 700, color: 'var(--text-primary)' }}>
                  {doc.title}
                </div>

                <div style={{ fontSize: '11.5px', color: 'var(--text-secondary)' }}>
                  Category: <strong>{doc.documentType}</strong> &bull; Size: {doc.fileSize}
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: 'var(--text-muted)', borderTop: '1px dashed var(--border-light)', paddingTop: '6px', marginTop: '2px' }}>
                  <span>Linked: {doc.relatedFindingId} / {doc.relatedCapaId}</span>
                  <span>{doc.uploadedAt}</span>
                </div>

                <div style={{ fontSize: '10px', color: '#00796B', fontFamily: 'monospace' }}>
                  Hash: {doc.hash}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
