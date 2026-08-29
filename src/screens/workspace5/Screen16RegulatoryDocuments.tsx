"use client";

import React, { useState } from 'react';
import { useRegulatoryAction } from '../../context/RegulatoryActionContext';
import {
  FolderArchive,
  Search,
  Filter,
  FileText,
  Lock,
  Download,
  Eye,
  ChevronLeft,
  ArrowRight,
  ShieldCheck
} from 'lucide-react';

export const Screen16RegulatoryDocuments: React.FC = () => {
  const {
    regulatoryDocuments,
    openDocumentViewer,
    navigateTo,
    selectedMine
  } = useRegulatoryAction();

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('All');

  const filteredDocs = regulatoryDocuments.filter(d => {
    if (selectedType !== 'All' && d.type !== selectedType) return false;
    if (searchTerm) {
      const q = searchTerm.toLowerCase();
      return (
        d.id.toLowerCase().includes(q) ||
        d.title.toLowerCase().includes(q) ||
        d.type.toLowerCase().includes(q) ||
        d.findingId.toLowerCase().includes(q) ||
        d.authority.toLowerCase().includes(q)
      );
    }
    return true;
  });

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
                background: 'rgba(63, 81, 181, 0.15)',
                color: '#1A237E'
              }}
            >
              REGULATORY DOCUMENTS VAULT
            </span>
          </div>
          <h1 className="screen-title" style={{ margin: 0 }}>
            STATUTORY ARCHIVE & SEALED REGULATORY RECORDS
          </h1>
          <p className="screen-subtitle">
            Central immutable repository of inspection reports, statutory directions, mine responses, and verified certificates
          </p>
        </div>

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            padding: '6px 12px',
            background: '#E8EAF6',
            border: '1px solid #C5CAE9',
            borderRadius: '6px',
            color: '#1A237E',
            fontSize: '12px',
            fontWeight: 600
          }}
        >
          <Lock size={14} color="#303F9F" />
          <span>Cryptographically Sealed (SHA-256)</span>
        </div>
      </div>

      {/* Filter Bar */}
      <div
        className="card"
        style={{
          padding: '12px 16px',
          marginBottom: '16px',
          display: 'grid',
          gridTemplateColumns: '2fr 1fr 1fr',
          gap: '12px'
        }}
      >
        <div style={{ position: 'relative' }}>
          <Search size={14} style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
          <input
            type="text"
            className="form-control"
            placeholder="Search Document ID, Title, Type, Finding Ref, Authority..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            style={{ paddingLeft: '30px', fontSize: '12px' }}
          />
        </div>

        <div>
          <select
            className="form-control"
            value={selectedType}
            onChange={e => setSelectedType(e.target.value)}
            style={{ fontSize: '12px' }}
          >
            <option value="All">All Document Types</option>
            <option value="Direction">Direction</option>
            <option value="Inspection Report">Inspection Report</option>
            <option value="Response">Response</option>
            <option value="Notice">Notice</option>
          </select>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', fontSize: '12px', color: 'var(--text-muted)' }}>
          Showing {filteredDocs.length} of {regulatoryDocuments.length} sealed documents
        </div>
      </div>

      {/* Documents Table */}
      <div className="card" style={{ padding: 0, overflow: 'hidden', marginBottom: '30px' }}>
        <table className="data-table">
          <thead>
            <tr>
              <th style={{ width: '130px' }}>Document ID</th>
              <th>Document Title & Description</th>
              <th style={{ width: '120px' }}>Type</th>
              <th style={{ width: '160px' }}>Authority / Issuer</th>
              <th style={{ width: '110px' }}>Version</th>
              <th style={{ width: '110px' }}>Date</th>
              <th style={{ width: '130px' }}>Finding Ref</th>
              <th style={{ width: '140px' }}>Status</th>
              <th style={{ width: '90px', textAlign: 'center' }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredDocs.map(doc => (
              <tr
                key={doc.id}
                onClick={() => openDocumentViewer(doc)}
                style={{ cursor: 'pointer' }}
              >
                <td>
                  <span className="id-badge font-mono" style={{ background: 'rgba(63, 81, 181, 0.15)', color: '#1A237E' }}>
                    {doc.id}
                  </span>
                </td>
                <td>
                  <div style={{ fontWeight: 600, color: 'var(--text-primary)', fontSize: '13px' }}>
                    {doc.title}
                  </div>
                  <div style={{ fontSize: '11.5px', color: 'var(--text-muted)', marginTop: '2px' }}>
                    {doc.description.substring(0, 80)}... &bull; <strong>{doc.fileSize}</strong>
                  </div>
                </td>
                <td>
                  <span className="badge badge-info font-mono" style={{ fontSize: '10.5px' }}>
                    {doc.type}
                  </span>
                </td>
                <td>
                  <span style={{ fontSize: '12px', fontWeight: 600 }}>{doc.authority}</span>
                </td>
                <td>
                  <span className="badge badge-subtle font-mono" style={{ fontSize: '10.5px' }}>
                    {doc.version}
                  </span>
                </td>
                <td>
                  <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>{doc.date}</span>
                </td>
                <td>
                  <span className="id-badge font-mono" style={{ background: 'rgba(211, 47, 47, 0.12)', color: '#D32F2F' }}>
                    {doc.findingId}
                  </span>
                </td>
                <td>
                  <span className="status-pill status-completed" style={{ fontSize: '10.5px' }}>
                    ✓ {doc.status}
                  </span>
                </td>
                <td style={{ textAlign: 'center' }}>
                  <button
                    className="btn btn-secondary btn-sm"
                    onClick={e => {
                      e.stopPropagation();
                      openDocumentViewer(doc);
                    }}
                    style={{ padding: '3px 8px' }}
                  >
                    <Eye size={12} />
                    <span>View</span>
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
