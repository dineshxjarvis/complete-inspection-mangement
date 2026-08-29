"use client";

import React, { useState } from 'react';
import { useMineResponse } from '../../context/MineResponseContext';
import { MineFindingItem, MineSeverity } from '../../types/mineResponse';
import {
  AlertTriangle,
  Flame,
  Clock,
  CheckCircle,
  Eye,
  FileCheck,
  ChevronRight,
  Filter,
  Search,
  ChevronLeft,
  ArrowRight
} from 'lucide-react';

export const Screen07Findings: React.FC = () => {
  const {
    findings,
    activeInspection,
    setActiveFinding,
    navigateTo,
    selectedMine
  } = useMineResponse();

  const [activeTab, setActiveTab] = useState<string>('All');
  const [searchTerm, setSearchTerm] = useState<string>('');

  const criticalCount = findings.filter(f => f.severity === 'CRITICAL').length;
  const highCount = findings.filter(f => f.severity === 'HIGH').length;
  const mediumCount = findings.filter(f => f.severity === 'MEDIUM').length;
  const lowCount = findings.filter(f => f.severity === 'LOW').length;

  const tabs = [
    'All',
    'Critical',
    'High',
    'Medium',
    'Open',
    'Action Required',
    'Closed'
  ];

  const filteredFindings = findings.filter(f => {
    if (activeTab === 'Critical' && f.severity !== 'CRITICAL') return false;
    if (activeTab === 'High' && f.severity !== 'HIGH') return false;
    if (activeTab === 'Medium' && f.severity !== 'MEDIUM') return false;
    if (activeTab === 'Open' && f.status === 'Closed') return false;
    if (activeTab === 'Action Required' && (!f.mineResponse || f.mineResponse.status === 'Pending')) return true;
    if (activeTab === 'Action Required' && f.status !== 'Confirmed') return false;
    if (activeTab === 'Closed' && f.status !== 'Closed') return false;

    if (searchTerm) {
      const q = searchTerm.toLowerCase();
      return (
        f.id.toLowerCase().includes(q) ||
        f.title.toLowerCase().includes(q) ||
        f.requirementId.toLowerCase().includes(q) ||
        f.issueDescription.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const getSeverityBadge = (sev: MineSeverity) => {
    switch (sev) {
      case 'CRITICAL':
        return <span className="badge badge-critical font-bold">CRITICAL</span>;
      case 'HIGH':
        return <span className="badge badge-danger font-bold">HIGH</span>;
      case 'MEDIUM':
        return <span className="badge badge-warning font-bold">MEDIUM</span>;
      case 'LOW':
        return <span className="badge badge-subtle">LOW</span>;
      default:
        return <span className="badge">{sev}</span>;
    }
  };

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
            <span className="badge badge-warning">{findings.length} CONFIRMED FINDINGS</span>
          </div>
          <h1 className="screen-title" style={{ margin: 0 }}>
            CONFIRMED STATUTORY FINDINGS
          </h1>
          <p className="screen-subtitle">
            Statutory non-compliances and safety findings requiring mandatory Mine Management response & CAPA creation
          </p>
        </div>

        <button
          className="btn btn-primary btn-sm"
          onClick={() => {
            setActiveFinding(findings[0]);
            navigateTo('09');
          }}
          style={{ background: '#00897B', borderColor: '#00796B' }}
        >
          <FileCheck size={13} />
          <span>Respond to Open Findings</span>
        </button>
      </div>

      {/* Summary KPI Cards (Critical 1, High 1, Medium 1, Low 0) */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: '12px',
          marginBottom: '16px'
        }}
      >
        <div
          className="card"
          style={{
            padding: '14px',
            borderLeft: '4px solid #D32F2F',
            background: '#FFEBEE',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}
        >
          <div>
            <div style={{ fontSize: '11px', color: '#B71C1C', fontWeight: 700, textTransform: 'uppercase' }}>
              Critical Severity
            </div>
            <div style={{ fontSize: '24px', fontWeight: 800, color: '#D32F2F', fontFamily: 'monospace', marginTop: '2px' }}>
              {criticalCount}
            </div>
          </div>
          <Flame size={28} color="#D32F2F" />
        </div>

        <div
          className="card"
          style={{
            padding: '14px',
            borderLeft: '4px solid #F57C00',
            background: '#FFF3E0',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}
        >
          <div>
            <div style={{ fontSize: '11px', color: '#E65100', fontWeight: 700, textTransform: 'uppercase' }}>
              High Severity
            </div>
            <div style={{ fontSize: '24px', fontWeight: 800, color: '#E65100', fontFamily: 'monospace', marginTop: '2px' }}>
              {highCount}
            </div>
          </div>
          <AlertTriangle size={28} color="#F57C00" />
        </div>

        <div
          className="card"
          style={{
            padding: '14px',
            borderLeft: '4px solid #FBC02D',
            background: '#FFFDE7',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}
        >
          <div>
            <div style={{ fontSize: '11px', color: '#F57F17', fontWeight: 700, textTransform: 'uppercase' }}>
              Medium Severity
            </div>
            <div style={{ fontSize: '24px', fontWeight: 800, color: '#F57F17', fontFamily: 'monospace', marginTop: '2px' }}>
              {mediumCount}
            </div>
          </div>
          <Clock size={28} color="#FBC02D" />
        </div>

        <div
          className="card"
          style={{
            padding: '14px',
            borderLeft: '4px solid #388E3C',
            background: '#E8F5E9',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}
        >
          <div>
            <div style={{ fontSize: '11px', color: '#1B5E20', fontWeight: 700, textTransform: 'uppercase' }}>
              Low / Advisory
            </div>
            <div style={{ fontSize: '24px', fontWeight: 800, color: '#2E7D32', fontFamily: 'monospace', marginTop: '2px' }}>
              {lowCount}
            </div>
          </div>
          <CheckCircle size={28} color="#388E3C" />
        </div>
      </div>

      {/* Tabs & Search Filter */}
      <div
        className="card"
        style={{
          padding: '10px 16px',
          marginBottom: '16px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '16px'
        }}
      >
        <div style={{ display: 'flex', gap: '4px' }}>
          {tabs.map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              style={{
                padding: '6px 12px',
                borderRadius: '4px',
                border: 'none',
                background: activeTab === tab ? '#00897B' : 'transparent',
                color: activeTab === tab ? '#FFF' : 'var(--text-secondary)',
                fontSize: '12px',
                fontWeight: activeTab === tab ? 700 : 500,
                cursor: 'pointer'
              }}
            >
              {tab}
            </button>
          ))}
        </div>

        <div style={{ width: '280px', position: 'relative' }}>
          <Search size={14} style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
          <input
            type="text"
            className="form-control"
            placeholder="Search findings..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            style={{ paddingLeft: '30px', fontSize: '12px' }}
          />
        </div>
      </div>

      {/* Findings Table */}
      <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
        <table className="data-table">
          <thead>
            <tr>
              <th style={{ width: '130px' }}>Finding ID</th>
              <th>Finding Title & Summary</th>
              <th style={{ width: '140px' }}>Requirement</th>
              <th style={{ width: '110px' }}>Severity</th>
              <th style={{ width: '130px' }}>Review Status</th>
              <th style={{ width: '120px' }}>CAPA Status</th>
              <th style={{ width: '120px' }}>Response Due</th>
              <th style={{ width: '100px', textAlign: 'center' }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredFindings.map(finding => {
              const isCrit = finding.severity === 'CRITICAL';
              return (
                <tr
                  key={finding.id}
                  style={{
                    backgroundColor: isCrit ? 'rgba(211, 47, 47, 0.04)' : undefined,
                    cursor: 'pointer'
                  }}
                  onClick={() => {
                    setActiveFinding(finding);
                    navigateTo('08');
                  }}
                >
                  <td>
                    <span
                      className="id-badge font-mono"
                      style={{
                        background: isCrit ? 'rgba(211, 47, 47, 0.15)' : 'rgba(0, 137, 123, 0.15)',
                        color: isCrit ? '#D32F2F' : '#00796B'
                      }}
                    >
                      {finding.id}
                    </span>
                  </td>
                  <td>
                    <div style={{ fontWeight: 600, color: 'var(--text-primary)', fontSize: '13px' }}>
                      {finding.title}
                    </div>
                    <div style={{ fontSize: '11.5px', color: 'var(--text-muted)', marginTop: '2px', lineHeight: 1.3 }}>
                      {finding.issueDescription}
                    </div>
                  </td>
                  <td>
                    <span className="badge badge-subtle font-mono" style={{ fontSize: '11px' }}>
                      {finding.requirementId}
                    </span>
                  </td>
                  <td>{getSeverityBadge(finding.severity)}</td>
                  <td>
                    <span className="status-pill status-active" style={{ fontSize: '11px' }}>
                      ✓ {finding.status}
                    </span>
                  </td>
                  <td>
                    <span
                      className={`badge ${
                        finding.capaStatus === 'Overdue'
                          ? 'badge-danger'
                          : finding.capaStatus === 'In Progress'
                          ? 'badge-warning'
                          : 'badge-info'
                      }`}
                      style={{ fontSize: '11px' }}
                    >
                      {finding.capaStatus}
                    </span>
                  </td>
                  <td>
                    <div style={{ fontSize: '12px', fontWeight: 600, color: '#D32F2F' }}>
                      {finding.responseDue}
                    </div>
                    <div style={{ fontSize: '10.5px', color: 'var(--text-muted)' }}>
                      {finding.daysRemaining} days left
                    </div>
                  </td>
                  <td style={{ textAlign: 'center' }}>
                    <button
                      className="btn btn-secondary btn-sm"
                      onClick={e => {
                        e.stopPropagation();
                        setActiveFinding(finding);
                        navigateTo('08');
                      }}
                      style={{ padding: '3px 8px' }}
                    >
                      <Eye size={12} />
                      <span>View</span>
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
