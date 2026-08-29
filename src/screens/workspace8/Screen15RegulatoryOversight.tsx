"use client";

import React, { useState } from 'react';
import { useOversight } from '../../context/OversightContext';
import {
  Globe,
  Lock,
  Search,
  ChevronLeft,
  ArrowRight,
  ShieldCheck,
  Send,
  Award
} from 'lucide-react';

export const Screen15RegulatoryOversight: React.FC = () => {
  const {
    regulatoryNotices,
    openRegulatoryDocModal,
    navigateTo,
    showToast
  } = useOversight();

  const [searchTerm, setSearchTerm] = useState('');

  const filtered = regulatoryNotices.filter(n => {
    if (!searchTerm) return true;
    const q = searchTerm.toLowerCase();
    return (
      n.reference.toLowerCase().includes(q) ||
      n.authority.toLowerCase().includes(q) ||
      n.mine.toLowerCase().includes(q) ||
      n.findingTitle.toLowerCase().includes(q)
    );
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
                background: 'rgba(30, 27, 75, 0.15)',
                color: '#1E1B4B'
              }}
            >
              EXTERNAL REGULATOR DESK
            </span>
          </div>
          <h1 className="screen-title" style={{ margin: 0 }}>
            EXTERNAL REGULATORY NOTICES & DGMS ENFORCEMENT
          </h1>
          <p className="screen-subtitle">
            External statutory inspection tracking &bull; Monitor DGMS Form IV notices, compliance response deadlines, and formal regulatory closures
          </p>
        </div>

        <div style={{ display: 'flex', gap: '8px' }}>
          <button className="btn btn-secondary btn-sm" onClick={() => navigateTo('17')}>
            <span>Response Monitoring (Screen 17)</span>
          </button>
          <button className="btn btn-primary btn-sm" onClick={() => navigateTo('18')} style={{ background: '#1E1B4B', borderColor: '#312E81' }}>
            <span>Track Analytics (Screen 18) &rarr;</span>
          </button>
        </div>
      </div>

      {/* Regulatory Summary Bar */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '10px', marginBottom: '20px' }}>
        <div className="card stat-card" style={{ padding: '12px', borderLeft: '3px solid #1E1B4B' }}>
          <div style={{ fontSize: '10.5px', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700 }}>External Audits</div>
          <div style={{ fontSize: '20px', fontWeight: 800, color: '#1E1B4B', marginTop: '2px' }}>24</div>
        </div>
        <div className="card stat-card" style={{ padding: '12px', borderLeft: '3px solid #D32F2F', background: '#FFEBEE' }}>
          <div style={{ fontSize: '10.5px', color: '#B71C1C', textTransform: 'uppercase', fontWeight: 700 }}>Open Notices</div>
          <div style={{ fontSize: '20px', fontWeight: 800, color: '#D32F2F', marginTop: '2px' }}>18</div>
        </div>
        <div className="card stat-card" style={{ padding: '12px', borderLeft: '3px solid #F57C00', background: '#FFF3E0' }}>
          <div style={{ fontSize: '10.5px', color: '#E65100', textTransform: 'uppercase', fontWeight: 700 }}>Responses Pending</div>
          <div style={{ fontSize: '20px', fontWeight: 800, color: '#E65100', marginTop: '2px' }}>7</div>
        </div>
        <div className="card stat-card" style={{ padding: '12px', borderLeft: '3px solid #0288D1' }}>
          <div style={{ fontSize: '10.5px', color: '#0369A1', textTransform: 'uppercase', fontWeight: 700 }}>Submitted</div>
          <div style={{ fontSize: '20px', fontWeight: 800, color: '#0288D1', marginTop: '2px' }}>11</div>
        </div>
        <div className="card stat-card" style={{ padding: '12px', borderLeft: '3px solid #2E7D32', background: '#E8F5E9' }}>
          <div style={{ fontSize: '10.5px', color: '#1B5E20', textTransform: 'uppercase', fontWeight: 700 }}>Follow-Up Required</div>
          <div style={{ fontSize: '20px', fontWeight: 800, color: '#2E7D32', marginTop: '2px' }}>6</div>
        </div>
      </div>

      {/* Regulatory Notices Table */}
      <div className="card" style={{ padding: 0, overflow: 'hidden', marginBottom: '30px' }}>
        <table className="data-table">
          <thead>
            <tr>
              <th style={{ width: '180px' }}>Statutory Reference</th>
              <th style={{ width: '100px' }}>Authority</th>
              <th style={{ width: '100px' }}>Colliery</th>
              <th style={{ width: '110px' }}>Inspection Date</th>
              <th>Statutory Finding / Notice Subject</th>
              <th style={{ width: '110px' }}>Response Due</th>
              <th style={{ width: '140px' }}>Response Status</th>
              <th style={{ width: '180px' }}>Regulatory Status</th>
              <th style={{ width: '100px', textAlign: 'center' }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(item => (
              <tr
                key={item.reference}
                onClick={() => navigateTo('16')}
                style={{ cursor: 'pointer' }}
              >
                <td>
                  <span className="id-badge font-mono" style={{ background: 'rgba(30, 27, 75, 0.12)', color: '#1E1B4B', fontWeight: 700 }}>
                    {item.reference}
                  </span>
                </td>
                <td><strong style={{ color: '#D97706' }}>{item.authority}</strong></td>
                <td><strong>{item.mine}</strong></td>
                <td><span style={{ fontSize: '11.5px', color: 'var(--text-muted)' }}>{item.inspectionDate}</span></td>
                <td>
                  <div style={{ fontWeight: 700, color: 'var(--text-primary)', fontSize: '12.5px' }}>{item.findingTitle}</div>
                  <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Linked CAPA: {item.capaRef}</div>
                </td>
                <td><strong style={{ color: '#D32F2F', fontSize: '11.5px' }}>{item.responseDueDate}</strong></td>
                <td>
                  <span className={`status-pill ${item.responseStatus === 'Submitted' ? 'status-scheduled' : 'status-pending'}`}>
                    {item.responseStatus}
                  </span>
                </td>
                <td>
                  <span className="badge badge-warning font-bold" style={{ fontSize: '10.5px' }}>
                    {item.regulatoryStatus}
                  </span>
                </td>
                <td style={{ textAlign: 'center' }}>
                  <button
                    className="btn btn-secondary btn-sm"
                    onClick={e => {
                      e.stopPropagation();
                      openRegulatoryDocModal(item);
                    }}
                    style={{ padding: '2px 6px', fontSize: '11px' }}
                  >
                    <Lock size={11} />
                    <span>View Doc</span>
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
