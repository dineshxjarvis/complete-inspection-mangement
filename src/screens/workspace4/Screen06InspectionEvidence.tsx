"use client";

import React, { useState } from 'react';
import { useMineResponse } from '../../context/MineResponseContext';
import {
  Camera,
  FileText,
  Activity,
  Award,
  Filter,
  Search,
  Lock,
  Eye,
  MapPin,
  Clock,
  User,
  ShieldCheck,
  ChevronLeft,
  Hash,
  Download
} from 'lucide-react';

export const Screen06InspectionEvidence: React.FC = () => {
  const {
    evidenceItems,
    openEvidenceDrawer,
    activeInspection,
    navigateTo,
    showToast
  } = useMineResponse();

  const [activeFilter, setActiveFilter] = useState<string>('ALL');
  const [searchTerm, setSearchTerm] = useState<string>('');

  const filterTabs = [
    { id: 'ALL', label: 'All Evidence', count: evidenceItems.length },
    { id: 'PHOTO', label: 'Photos', count: evidenceItems.filter(e => e.type === 'PHOTO').length },
    { id: 'MEASUREMENT', label: 'Measurements', count: evidenceItems.filter(e => e.type === 'MEASUREMENT').length },
    { id: 'DOCUMENT', label: 'Documents & Certs', count: evidenceItems.filter(e => e.type === 'DOCUMENT' || e.type === 'CALIBRATION_CERT').length }
  ];

  const filteredEvidence = evidenceItems.filter(item => {
    if (activeFilter === 'PHOTO' && item.type !== 'PHOTO') return false;
    if (activeFilter === 'MEASUREMENT' && item.type !== 'MEASUREMENT') return false;
    if (activeFilter === 'DOCUMENT' && (item.type !== 'DOCUMENT' && item.type !== 'CALIBRATION_CERT')) return false;

    if (searchTerm) {
      const q = searchTerm.toLowerCase();
      return (
        item.id.toLowerCase().includes(q) ||
        item.title.toLowerCase().includes(q) ||
        item.location.toLowerCase().includes(q) ||
        item.capturedBy.toLowerCase().includes(q) ||
        item.filename.toLowerCase().includes(q)
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
              onClick={() => navigateTo('03')}
              style={{ padding: '3px 8px' }}
            >
              <ChevronLeft size={13} />
              <span>Back to Inspection</span>
            </button>
            <span
              className="id-badge font-mono"
              style={{
                fontSize: '13px',
                fontWeight: 700,
                background: 'rgba(0, 137, 123, 0.15)',
                color: '#00796B',
                borderColor: 'rgba(0, 137, 123, 0.4)'
              }}
            >
              {activeInspection.id}
            </span>
            <span className="badge badge-info">{evidenceItems.length} ARTIFACTS</span>
            <span className="badge badge-subtle">DGMS COMPLIANT</span>
          </div>
          <h1 className="screen-title" style={{ margin: 0 }}>
            INSPECTION EVIDENCE VAULT
          </h1>
          <p className="screen-subtitle">
            Cryptographically sealed inspector field captures, calibrated measurement traverses, and statutory certificates
          </p>
        </div>

        <button
          className="btn btn-secondary btn-sm"
          onClick={() => {
            showToast('All 28 inspection evidence artifacts package downloaded as signed ZIP archive', 'info');
          }}
        >
          <Download size={13} />
          <span>Export Certified Evidence Dossier</span>
        </button>
      </div>

      {/* Statutory Immutability Notice */}
      <div
        className="card"
        style={{
          background: '#E0F2F1',
          border: '1px solid #80CBC4',
          padding: '10px 16px',
          marginBottom: '16px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <Lock size={15} color="#00695C" />
          <span style={{ fontSize: '12px', fontWeight: 600, color: '#004D40' }}>
            Mine Manager View: Original field evidence is read-only. Delete and edit controls are disabled by statutory protocol.
          </span>
        </div>
        <span className="badge badge-subtle font-mono" style={{ fontSize: '11px', background: '#FFF' }}>
          SHA-256 INTEGRITY PROTECTED
        </span>
      </div>

      {/* Filter and Search Bar */}
      <div
        className="card"
        style={{
          padding: '12px 16px',
          marginBottom: '16px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '16px'
        }}
      >
        {/* Filter Pills */}
        <div style={{ display: 'flex', gap: '6px' }}>
          {filterTabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveFilter(tab.id)}
              style={{
                padding: '6px 12px',
                borderRadius: '20px',
                border: '1px solid',
                borderColor: activeFilter === tab.id ? '#00897B' : 'var(--border-color)',
                background: activeFilter === tab.id ? 'rgba(0, 137, 123, 0.12)' : 'var(--bg-surface)',
                color: activeFilter === tab.id ? '#00796B' : 'var(--text-secondary)',
                fontSize: '12px',
                fontWeight: activeFilter === tab.id ? 700 : 500,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '6px'
              }}
            >
              <span>{tab.label}</span>
              <span
                style={{
                  background: activeFilter === tab.id ? '#00897B' : 'var(--border-color)',
                  color: activeFilter === tab.id ? '#FFF' : 'var(--text-muted)',
                  fontSize: '10.5px',
                  fontWeight: 700,
                  padding: '1px 6px',
                  borderRadius: '10px'
                }}
              >
                {tab.count}
              </span>
            </button>
          ))}
        </div>

        {/* Search Field */}
        <div style={{ width: '320px', position: 'relative' }}>
          <Search size={14} style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
          <input
            type="text"
            className="form-control"
            placeholder="Search by ID, title, filename, location..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            style={{ paddingLeft: '32px', fontSize: '12px' }}
          />
        </div>
      </div>

      {/* Evidence Grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
          gap: '16px',
          marginBottom: '24px'
        }}
      >
        {filteredEvidence.map(item => {
          const isPhoto = item.type === 'PHOTO';
          const isMeasurement = item.type === 'MEASUREMENT';
          const isDoc = item.type === 'DOCUMENT' || item.type === 'CALIBRATION_CERT';

          return (
            <div
              key={item.id}
              className="card"
              onClick={() => openEvidenceDrawer(item)}
              style={{
                padding: 0,
                overflow: 'hidden',
                cursor: 'pointer',
                transition: 'transform 0.15s ease, box-shadow 0.15s ease, border-color 0.15s ease',
                display: 'flex',
                flexDirection: 'column'
              }}
              onMouseEnter={e => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 6px 16px rgba(0,0,0,0.08)';
                e.currentTarget.style.borderColor = '#00897B';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
                e.currentTarget.style.borderColor = 'var(--border-color)';
              }}
            >
              {/* Thumbnail / Header Area */}
              <div
                style={{
                  height: '130px',
                  background: isPhoto
                    ? 'linear-gradient(135deg, #1C2833 0%, #2C3E50 100%)'
                    : isMeasurement
                    ? 'linear-gradient(135deg, #0E3A40 0%, #17545E 100%)'
                    : 'linear-gradient(135deg, #263238 0%, #37474F 100%)',
                  padding: '12px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  position: 'relative'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span
                    className="id-badge font-mono"
                    style={{
                      background: 'rgba(255,255,255,0.15)',
                      color: '#FFF',
                      fontSize: '11px',
                      backdropFilter: 'blur(4px)'
                    }}
                  >
                    {item.id}
                  </span>
                  <span
                    style={{
                      background: isPhoto ? 'rgba(0, 200, 83, 0.85)' : isMeasurement ? 'rgba(255, 109, 0, 0.85)' : 'rgba(41, 121, 255, 0.85)',
                      color: '#FFF',
                      fontSize: '10px',
                      fontWeight: 700,
                      padding: '2px 8px',
                      borderRadius: '4px',
                      textTransform: 'uppercase'
                    }}
                  >
                    {item.type}
                  </span>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#FFF' }}>
                  {isPhoto && <Camera size={24} color="#80CBC4" />}
                  {isMeasurement && <Activity size={24} color="#FFCC80" />}
                  {isDoc && <FileText size={24} color="#90CAF9" />}
                  <div style={{ overflow: 'hidden' }}>
                    <div style={{ fontSize: '13px', fontWeight: 700, textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}>
                      {item.title}
                    </div>
                    <div style={{ fontSize: '11px', opacity: 0.8 }}>
                      {item.filename} &bull; {item.fileSize}
                    </div>
                  </div>
                </div>
              </div>

              {/* Card Body */}
              <div style={{ padding: '14px', flex: 1, display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <p style={{ margin: 0, fontSize: '12px', color: 'var(--text-secondary)', lineHeight: 1.4 }}>
                  {item.description}
                </p>

                <div style={{ marginTop: 'auto', paddingTop: '10px', borderTop: '1px solid var(--border-light)', display: 'flex', flexDirection: 'column', gap: '4px', fontSize: '11px', color: 'var(--text-muted)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                    <MapPin size={11} color="#D32F2F" />
                    <span style={{ textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}>{item.location}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <User size={11} />
                      {item.capturedBy.split(' ')[0]} {item.capturedBy.split(' ')[1]}
                    </span>
                    <span>{item.timestamp.split(' ')[0]} {item.timestamp.split(' ')[1]}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#00796B', fontFamily: 'monospace', fontSize: '10px' }}>
                    <Hash size={10} />
                    <span>Hash: {item.sha256Hash.substring(0, 16)}...</span>
                  </div>
                </div>
              </div>

              {/* View Trigger */}
              <div
                style={{
                  background: 'var(--bg-surface-alt)',
                  padding: '8px 14px',
                  borderTop: '1px solid var(--border-light)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  fontSize: '11.5px',
                  fontWeight: 600,
                  color: '#00796B'
                }}
              >
                <span>Inspect Full Metadata & Cryptographic Hash</span>
                <Eye size={13} />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
