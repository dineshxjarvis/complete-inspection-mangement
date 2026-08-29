"use client";

import React, { useState } from 'react';
import { useVerification } from '../../context/VerificationContext';
import {
  Layers,
  Search,
  Filter,
  Download,
  Printer,
  ChevronLeft,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  AlertOctagon
} from 'lucide-react';

export const Screen21VerificationRegister: React.FC = () => {
  const {
    verificationList,
    setActiveVerification,
    navigateTo,
    showToast
  } = useVerification();

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDecision, setSelectedDecision] = useState('All');
  const [selectedMine, setSelectedMine] = useState('All');

  const filteredRegister = verificationList.filter(ver => {
    if (selectedDecision !== 'All' && ver.decision !== selectedDecision) return false;
    if (selectedMine !== 'All' && ver.mine !== selectedMine) return false;

    if (searchTerm) {
      const q = searchTerm.toLowerCase();
      return (
        ver.id.toLowerCase().includes(q) ||
        ver.capaId.toLowerCase().includes(q) ||
        ver.findingId.toLowerCase().includes(q) ||
        ver.mine.toLowerCase().includes(q) ||
        ver.actionOwner.toLowerCase().includes(q) ||
        (ver.assignedVerifier && ver.assignedVerifier.name.toLowerCase().includes(q))
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
                background: 'rgba(0, 96, 100, 0.15)',
                color: '#006064'
              }}
            >
              STATUTORY MASTER REGISTER
            </span>
          </div>
          <h1 className="screen-title" style={{ margin: 0 }}>
            COLLIERY-WIDE MASTER VERIFICATION REGISTER
          </h1>
          <p className="screen-subtitle">
            Consolidated statutory repository of all verification decisions, assigned DGMS auditors, and post-closure monitoring postures
          </p>
        </div>

        <div style={{ display: 'flex', gap: '8px' }}>
          <button
            className="btn btn-secondary btn-sm"
            onClick={() => showToast('Exported Verification Register to CSV format', 'success')}
          >
            <Download size={13} />
            <span>Export CSV</span>
          </button>
          <button
            className="btn btn-primary btn-sm"
            onClick={() => showToast('Generated certified statutory PDF register', 'success')}
            style={{ background: '#006064', borderColor: '#004D40' }}
          >
            <Download size={13} />
            <span>Export PDF Ledger</span>
          </button>
        </div>
      </div>

      {/* Filters Bar */}
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
            placeholder="Search Verification ID, CAPA ID, Finding, Mine, Auditor..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            style={{ paddingLeft: '30px', fontSize: '12px' }}
          />
        </div>

        <div>
          <select
            className="form-control"
            value={selectedDecision}
            onChange={e => setSelectedDecision(e.target.value)}
            style={{ fontSize: '12px' }}
          >
            <option value="All">All Verification Decisions</option>
            <option value="PASS">PASS (Verified)</option>
            <option value="RETURN">RETURN (Clarification)</option>
            <option value="FAIL">FAIL (Reopened)</option>
            <option value="PENDING">PENDING</option>
          </select>
        </div>

        <div>
          <select
            className="form-control"
            value={selectedMine}
            onChange={e => setSelectedMine(e.target.value)}
            style={{ fontSize: '12px' }}
          >
            <option value="All">All Mines</option>
            <option value="Mine A2">Mine A2</option>
            <option value="Mine B1">Mine B1</option>
            <option value="Mine C4">Mine C4</option>
          </select>
        </div>
      </div>

      {/* Register Table */}
      <div className="card" style={{ padding: 0, overflow: 'hidden', marginBottom: '30px' }}>
        <table className="data-table">
          <thead>
            <tr>
              <th style={{ width: '130px' }}>Verification ID</th>
              <th style={{ width: '120px' }}>CAPA ID</th>
              <th style={{ width: '120px' }}>Finding ID</th>
              <th style={{ width: '120px' }}>Inspection ID</th>
              <th style={{ width: '90px' }}>Mine</th>
              <th style={{ width: '160px' }}>Action Owner</th>
              <th style={{ width: '160px' }}>Auditor / Verifier</th>
              <th style={{ width: '100px' }}>Decision</th>
              <th style={{ width: '110px' }}>Audit Date</th>
              <th style={{ width: '150px' }}>Follow-Up Status</th>
              <th style={{ width: '80px', textAlign: 'center' }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredRegister.map(ver => (
              <tr
                key={ver.id}
                onClick={() => {
                  setActiveVerification(ver);
                  navigateTo('04');
                }}
                style={{ cursor: 'pointer' }}
              >
                <td>
                  <span className="id-badge font-mono" style={{ background: 'rgba(0, 96, 100, 0.15)', color: '#006064', fontWeight: 700 }}>
                    {ver.id}
                  </span>
                </td>
                <td>
                  <span className="badge badge-subtle font-mono">{ver.capaId}</span>
                </td>
                <td>
                  <span className="badge badge-subtle font-mono">{ver.findingId}</span>
                </td>
                <td>
                  <span className="badge badge-subtle font-mono">{ver.inspectionId}</span>
                </td>
                <td>
                  <span style={{ fontWeight: 600 }}>{ver.mine}</span>
                </td>
                <td>
                  <div style={{ fontSize: '11.5px', fontWeight: 600 }}>{ver.actionOwner}</div>
                </td>
                <td>
                  <div style={{ fontSize: '11.5px', fontWeight: 600, color: '#006064' }}>
                    {ver.assignedVerifier?.name || 'Er. R. Sharma'}
                  </div>
                </td>
                <td>
                  <span className={`badge ${ver.decision === 'PASS' ? 'badge-success font-bold' : ver.decision === 'FAIL' ? 'badge-danger font-bold' : 'badge-warning font-bold'}`}>
                    {ver.decision}
                  </span>
                </td>
                <td>
                  <span style={{ fontSize: '11.5px', color: 'var(--text-muted)' }}>{ver.submissionDate}</span>
                </td>
                <td>
                  <span className="badge badge-info" style={{ fontSize: '10.5px' }}>
                    {ver.followUpRequired ? '✓ Follow-Up (15 Jan)' : 'Standard Routine'}
                  </span>
                </td>
                <td style={{ textAlign: 'center' }}>
                  <button
                    className="btn btn-secondary btn-sm"
                    onClick={e => {
                      e.stopPropagation();
                      setActiveVerification(ver);
                      navigateTo('04');
                    }}
                    style={{ padding: '2px 6px', fontSize: '11px' }}
                  >
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
