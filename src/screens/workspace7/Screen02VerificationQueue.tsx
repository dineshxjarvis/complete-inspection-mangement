"use client";

import React, { useState } from 'react';
import { useVerification } from '../../context/VerificationContext';
import {
  CheckSquare,
  Search,
  Filter,
  Eye,
  ChevronLeft,
  ArrowRight,
  ShieldCheck,
  Calendar
} from 'lucide-react';

export const Screen02VerificationQueue: React.FC = () => {
  const {
    verificationList,
    setActiveVerification,
    navigateTo,
    selectedMine
  } = useVerification();

  const [activeTab, setActiveTab] = useState<string>('All');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedSeverity, setSelectedSeverity] = useState<string>('All');
  const [selectedType, setSelectedType] = useState<string>('All');

  const tabs = [
    'All',
    'Pending',
    'Due Soon',
    'Overdue',
    'Returned',
    'Reverification',
    'Completed'
  ];

  const filteredVerifications = verificationList.filter(v => {
    if (activeTab === 'Pending' && v.status !== 'Awaiting Verification' && v.status !== 'In Verification Review') return false;
    if (activeTab === 'Due Soon' && (v.daysRemaining < 0 || v.daysRemaining > 2)) return false;
    if (activeTab === 'Overdue' && v.daysRemaining >= 0) return false;
    if (activeTab === 'Returned' && v.status !== 'Returned to WS06') return false;
    if (activeTab === 'Reverification' && v.status !== 'Reverification Pending') return false;
    if (activeTab === 'Completed' && v.status !== 'Verified' && v.status !== 'Closed') return false;

    if (selectedSeverity !== 'All' && v.severity !== selectedSeverity) return false;
    if (selectedType !== 'All' && !v.capaType.includes(selectedType)) return false;

    if (searchTerm) {
      const q = searchTerm.toLowerCase();
      return (
        v.id.toLowerCase().includes(q) ||
        v.capaId.toLowerCase().includes(q) ||
        v.findingId.toLowerCase().includes(q) ||
        v.actionTitle.toLowerCase().includes(q) ||
        v.actionOwner.toLowerCase().includes(q) ||
        v.mine.toLowerCase().includes(q)
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
              STATUTORY AUDIT QUEUE
            </span>
          </div>
          <h1 className="screen-title" style={{ margin: 0 }}>
            VERIFICATION WORK QUEUE & AUDIT REGISTER
          </h1>
          <p className="screen-subtitle">
            Submitted remediation dossiers awaiting independent DGMS panel verification, measurement audits, and formal certification
          </p>
        </div>

        <button
          className="btn btn-primary btn-sm"
          onClick={() => {
            setActiveVerification(verificationList[0]);
            navigateTo('03');
          }}
          style={{ background: '#006064', borderColor: '#004D40' }}
        >
          <span>Verifier Routing & SoD (Screen 03)</span>
          <ArrowRight size={13} />
        </button>
      </div>

      {/* Tabs */}
      <div
        className="card"
        style={{
          padding: '8px 12px',
          marginBottom: '14px',
          display: 'flex',
          gap: '4px',
          overflowX: 'auto'
        }}
      >
        {tabs.map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            style={{
              padding: '6px 12px',
              borderRadius: '4px',
              border: 'none',
              background: activeTab === tab ? '#006064' : 'transparent',
              color: activeTab === tab ? '#FFF' : 'var(--text-secondary)',
              fontSize: '12px',
              fontWeight: activeTab === tab ? 700 : 500,
              cursor: 'pointer',
              whiteSpace: 'nowrap'
            }}
          >
            {tab}
          </button>
        ))}
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
            placeholder="Search Verification ID, CAPA Ref, Finding, Owner..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            style={{ paddingLeft: '30px', fontSize: '12px' }}
          />
        </div>

        <div>
          <select
            className="form-control"
            value={selectedSeverity}
            onChange={e => setSelectedSeverity(e.target.value)}
            style={{ fontSize: '12px' }}
          >
            <option value="All">All Severities</option>
            <option value="CRITICAL">Critical</option>
            <option value="HIGH">High</option>
            <option value="MEDIUM">Medium</option>
            <option value="LOW">Low</option>
          </select>
        </div>

        <div>
          <select
            className="form-control"
            value={selectedType}
            onChange={e => setSelectedType(e.target.value)}
            style={{ fontSize: '12px' }}
          >
            <option value="All">All Technical Categories</option>
            <option value="Ventilation">Ventilation</option>
            <option value="Strata">Strata Control</option>
            <option value="Mechanical">Mechanical</option>
            <option value="Electrical">Electrical</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="card" style={{ padding: 0, overflow: 'hidden', marginBottom: '30px' }}>
        <table className="data-table">
          <thead>
            <tr>
              <th style={{ width: '130px' }}>Verification ID</th>
              <th style={{ width: '130px' }}>CAPA Ref</th>
              <th style={{ width: '130px' }}>Finding Ref</th>
              <th style={{ width: '90px' }}>Mine</th>
              <th>Action Scope & Outcome Requirement</th>
              <th style={{ width: '160px' }}>Action Owner</th>
              <th style={{ width: '90px' }}>Priority</th>
              <th style={{ width: '100px' }}>Evidence</th>
              <th style={{ width: '110px' }}>Submitted</th>
              <th style={{ width: '140px' }}>Audit Status</th>
              <th style={{ width: '90px', textAlign: 'center' }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredVerifications.map(ver => (
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
                  <span style={{ fontWeight: 600 }}>{ver.mine}</span>
                </td>
                <td>
                  <div style={{ fontWeight: 600, color: 'var(--text-primary)', fontSize: '13px' }}>
                    {ver.actionTitle}
                  </div>
                  <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '2px' }}>
                    Target: {ver.expectedOutcome.requiredValue} &bull; Achieved: <strong>{ver.expectedOutcome.achievedValue}</strong>
                  </div>
                </td>
                <td>
                  <div style={{ fontSize: '12px', fontWeight: 600 }}>{ver.actionOwner}</div>
                  <div style={{ fontSize: '10.5px', color: 'var(--text-muted)' }}>{ver.department}</div>
                </td>
                <td>
                  <span className={`badge ${ver.priority === 'CRITICAL' ? 'badge-danger font-bold' : ver.priority === 'HIGH' ? 'badge-warning font-bold' : 'badge-subtle'}`}>
                    {ver.priority}
                  </span>
                </td>
                <td>
                  <span className="badge badge-info font-mono" style={{ fontSize: '11px' }}>
                    {ver.evidenceList.length} Files
                  </span>
                </td>
                <td>
                  <span style={{ fontSize: '11.5px', color: 'var(--text-muted)' }}>{ver.submissionDate}</span>
                </td>
                <td>
                  <span className={`status-pill ${ver.status === 'Verified' ? 'status-completed' : ver.status === 'Returned to WS06' ? 'status-overdue' : 'status-active'}`}>
                    {ver.status}
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
                    style={{ padding: '3px 8px' }}
                  >
                    <span>Audit</span>
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
