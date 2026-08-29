"use client";

import React from 'react';
import { useOversight } from '../../context/OversightContext';
import {
  Globe,
  Lock,
  Search,
  ShieldCheck,
  ChevronLeft,
  ArrowRight,
  AlertTriangle,
  Award
} from 'lucide-react';

export const Screen31RegulatoryAuthorityDashboard: React.FC = () => {
  const { navigateTo, openRegulatoryDocModal, regulatoryNotices } = useOversight();

  return (
    <div className="screen-content">
      {/* Screen Header */}
      <div className="screen-header">
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
            <button
              className="btn btn-secondary btn-sm"
              onClick={() => navigateTo('30')}
              style={{ padding: '3px 8px' }}
            >
              <ChevronLeft size={13} />
              <span>Back to Regulator Portal</span>
            </button>
            <span
              className="id-badge font-mono"
              style={{
                fontSize: '12px',
                fontWeight: 700,
                background: 'rgba(30, 27, 75, 0.15)',
                color: '#1E1B4B'
              }}
            >
              DGMS COMMAND DASHBOARD
            </span>
          </div>
          <h1 className="screen-title" style={{ margin: 0 }}>
            DGMS STATUTORY REGULATORY COMMAND DASHBOARD
          </h1>
          <p className="screen-subtitle">
            External regulator command overview &bull; Jurisdiction: <strong>Eastern Zone &bull; Sitarampur & Raniganj Coalfields</strong>
          </p>
        </div>

        <button
          className="btn btn-primary btn-sm"
          onClick={() => navigateTo('32')}
          style={{ background: '#1E1B4B', borderColor: '#312E81' }}
        >
          <span>Document Vault (Screen 32)</span>
          <ArrowRight size={13} />
        </button>
      </div>

      {/* 4 External Authority KPI Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px', marginBottom: '20px' }}>
        <div className="card stat-card" style={{ padding: '14px', borderLeft: '4px solid #1E1B4B' }}>
          <div style={{ fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700 }}>External Inspections</div>
          <div style={{ fontSize: '24px', fontWeight: 800, color: '#1E1B4B', fontFamily: 'monospace', marginTop: '2px' }}>24</div>
        </div>

        <div className="card stat-card" style={{ padding: '14px', borderLeft: '4px solid #D32F2F', background: '#FFEBEE' }}>
          <div style={{ fontSize: '11px', color: '#B71C1C', textTransform: 'uppercase', fontWeight: 700 }}>Open Statutory Notices</div>
          <div style={{ fontSize: '24px', fontWeight: 800, color: '#D32F2F', fontFamily: 'monospace', marginTop: '2px' }}>18</div>
        </div>

        <div className="card stat-card" style={{ padding: '14px', borderLeft: '4px solid #F57C00', background: '#FFF3E0' }}>
          <div style={{ fontSize: '11px', color: '#E65100', textTransform: 'uppercase', fontWeight: 700 }}>Responses Pending</div>
          <div style={{ fontSize: '24px', fontWeight: 800, color: '#E65100', fontFamily: 'monospace', marginTop: '2px' }}>7</div>
        </div>

        <div className="card stat-card" style={{ padding: '14px', borderLeft: '4px solid #2E7D32', background: '#E8F5E9' }}>
          <div style={{ fontSize: '11px', color: '#1B5E20', textTransform: 'uppercase', fontWeight: 700 }}>Formally Closed</div>
          <div style={{ fontSize: '24px', fontWeight: 800, color: '#2E7D32', fontFamily: 'monospace', marginTop: '2px' }}>6</div>
        </div>
      </div>

      {/* Priority Queue Table */}
      <div className="card" style={{ padding: 0, overflow: 'hidden', marginBottom: '30px' }}>
        <div style={{ padding: '14px 16px', borderBottom: '1px solid var(--border-color)' }}>
          <h3 style={{ margin: 0, fontSize: '13px', fontWeight: 800, textTransform: 'uppercase', color: '#1E1B4B' }}>
            REGULATORY PRIORITY ENFORCEMENT QUEUE
          </h3>
        </div>

        <table className="data-table">
          <thead>
            <tr>
              <th style={{ width: '180px' }}>Notice Ref</th>
              <th style={{ width: '100px' }}>Colliery</th>
              <th>Statutory Finding Subject</th>
              <th style={{ width: '110px' }}>Response Due</th>
              <th style={{ width: '150px' }}>Response Status</th>
              <th style={{ width: '180px' }}>Regulatory Status</th>
              <th style={{ width: '90px', textAlign: 'center' }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {regulatoryNotices.map(item => (
              <tr key={item.reference}>
                <td><span className="id-badge font-mono">{item.reference}</span></td>
                <td><strong>{item.mine}</strong></td>
                <td>
                  <div style={{ fontWeight: 700, color: 'var(--text-primary)', fontSize: '12.5px' }}>{item.findingTitle}</div>
                  <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Authority: {item.authority}</div>
                </td>
                <td><strong style={{ color: '#D32F2F' }}>{item.responseDueDate}</strong></td>
                <td>
                  <span className={`status-pill ${item.responseStatus === 'Submitted' ? 'status-scheduled' : 'status-pending'}`}>
                    {item.responseStatus}
                  </span>
                </td>
                <td><span className="badge badge-warning font-bold">{item.regulatoryStatus}</span></td>
                <td style={{ textAlign: 'center' }}>
                  <button
                    className="btn btn-secondary btn-sm"
                    onClick={() => openRegulatoryDocModal(item)}
                    style={{ padding: '2px 6px', fontSize: '11px' }}
                  >
                    <Lock size={11} />
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
