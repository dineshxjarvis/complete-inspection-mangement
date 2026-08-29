"use client";

import React, { useState } from 'react';
import { useOversight } from '../../context/OversightContext';
import {
  Send,
  Search,
  Filter,
  Lock,
  ChevronLeft,
  ArrowRight,
  ShieldCheck,
  CheckCircle2
} from 'lucide-react';

export const Screen17RegulatoryResponseStatus: React.FC = () => {
  const { regulatoryNotices, openRegulatoryDocModal, navigateTo } = useOversight();
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div className="screen-content">
      {/* Screen Header */}
      <div className="screen-header">
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
            <button
              className="btn btn-secondary btn-sm"
              onClick={() => navigateTo('15')}
              style={{ padding: '3px 8px' }}
            >
              <ChevronLeft size={13} />
              <span>Back to Regulatory Notices</span>
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
              RESPONSE PIPELINE
            </span>
          </div>
          <h1 className="screen-title" style={{ margin: 0 }}>
            STATUTORY REGULATORY RESPONSE MONITORING
          </h1>
          <p className="screen-subtitle">
            Lifecycle monitoring of mine responses across all 9 regulatory compliance states
          </p>
        </div>
      </div>

      {/* 9 Regulatory Status States Legend */}
      <div className="card" style={{ padding: '16px', marginBottom: '20px', background: 'var(--bg-surface-alt)' }}>
        <div style={{ fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', color: '#1E1B4B', marginBottom: '10px' }}>
          9 FORMAL REGULATORY POSTURE STATES
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', fontSize: '11px' }}>
          <span className="badge badge-danger">1. Response Required</span>
          <span className="badge badge-subtle">2. Response Draft</span>
          <span className="badge badge-info">3. Submitted</span>
          <span className="badge badge-warning">4. Awaiting Authority</span>
          <span className="badge badge-danger">5. Action Required</span>
          <span className="badge badge-warning">6. Under Follow-up</span>
          <span className="badge badge-success">7. Resolved</span>
          <span className="badge badge-info">8. Closure Pending</span>
          <span className="badge badge-success font-bold">9. Closed</span>
        </div>
      </div>

      {/* Regulatory Response Table */}
      <div className="card" style={{ padding: 0, overflow: 'hidden', marginBottom: '30px' }}>
        <table className="data-table">
          <thead>
            <tr>
              <th style={{ width: '170px' }}>Notice Reference</th>
              <th style={{ width: '100px' }}>Colliery</th>
              <th>Notice Subject / Violation</th>
              <th style={{ width: '130px' }}>Response Type</th>
              <th style={{ width: '100px' }}>Due Date</th>
              <th style={{ width: '110px' }}>Submitted</th>
              <th style={{ width: '100px' }}>Evidence</th>
              <th style={{ width: '120px' }}>Follow-up</th>
              <th style={{ width: '160px' }}>Current State</th>
              <th style={{ width: '80px', textAlign: 'center' }}>Doc</th>
            </tr>
          </thead>
          <tbody>
            {regulatoryNotices.map(item => (
              <tr key={item.reference}>
                <td>
                  <span className="id-badge font-mono" style={{ background: 'rgba(30, 27, 75, 0.12)', color: '#1E1B4B', fontWeight: 700 }}>
                    {item.reference}
                  </span>
                </td>
                <td><strong>{item.mine}</strong></td>
                <td>
                  <div style={{ fontWeight: 700, color: 'var(--text-primary)', fontSize: '12.5px' }}>{item.findingTitle}</div>
                  <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Authority: {item.authority}</div>
                </td>
                <td>Rectification Cert</td>
                <td><span style={{ color: '#D32F2F', fontWeight: 700 }}>{item.responseDueDate}</span></td>
                <td><span style={{ color: '#2E7D32', fontWeight: 600 }}>28 Nov 2026</span></td>
                <td><span className="badge badge-info">4 Files</span></td>
                <td><span className="badge badge-warning">15 Jan 2027</span></td>
                <td>
                  <span className={`status-pill ${item.responseStatus === 'Submitted' ? 'status-scheduled' : 'status-pending'}`}>
                    {item.responseStatus}
                  </span>
                </td>
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
