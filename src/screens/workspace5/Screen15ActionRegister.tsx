"use client";

import React, { useState } from 'react';
import { useRegulatoryAction } from '../../context/RegulatoryActionContext';
import {
  Layers,
  Search,
  Filter,
  Eye,
  Calendar,
  Send,
  Building,
  ChevronLeft,
  ArrowRight
} from 'lucide-react';

export const Screen15ActionRegister: React.FC = () => {
  const {
    notices,
    setActiveNotice,
    navigateTo,
    selectedMine
  } = useRegulatoryAction();

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('All');

  const actionRegisterData = [
    {
      actionId: 'RA-2026-0042',
      noticeId: 'NOTICE-2026-0021',
      findingId: 'FND-2026-00127',
      mine: 'Mine A2',
      actionType: 'Corrective Direction',
      issuedDate: '16 Nov 2026',
      dueDate: '30 Nov 2026',
      status: 'Response Submitted',
      recipient: 'Er. A. K. Verma (Mine Manager)'
    },
    {
      actionId: 'RA-2026-0038',
      noticeId: 'NOTICE-2026-0018',
      findingId: 'FND-2026-00121',
      mine: 'Mine A2',
      actionType: 'Statutory Show-Cause Notice',
      issuedDate: '12 Nov 2026',
      dueDate: '25 Nov 2026',
      status: 'Escalated / Overdue',
      recipient: 'Er. A. K. Verma (Mine Manager)'
    },
    {
      actionId: 'RA-2026-0029',
      noticeId: 'NOTICE-2026-0015',
      findingId: 'FND-2026-00088',
      mine: 'Mine B1',
      actionType: 'Safety Direction',
      issuedDate: '08 Nov 2026',
      dueDate: '22 Nov 2026',
      status: 'Under Area Review',
      recipient: 'Er. K. P. Singh (Mine Manager)'
    }
  ];

  const filtered = actionRegisterData.filter(item => {
    if (selectedType !== 'All' && item.actionType !== selectedType) return false;
    if (searchTerm) {
      const q = searchTerm.toLowerCase();
      return (
        item.actionId.toLowerCase().includes(q) ||
        item.noticeId.toLowerCase().includes(q) ||
        item.findingId.toLowerCase().includes(q) ||
        item.mine.toLowerCase().includes(q) ||
        item.actionType.toLowerCase().includes(q)
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
              REGULATORY ACTION REGISTER
            </span>
          </div>
          <h1 className="screen-title" style={{ margin: 0 }}>
            STATUTORY ACTIONS & FORMAL DIRECTIONS REGISTER
          </h1>
          <p className="screen-subtitle">
            Comprehensive ledger of all directions, show-cause notices, and statutory enforcement orders issued under Mines Act 1952
          </p>
        </div>

        <button
          className="btn btn-primary btn-sm"
          onClick={() => navigateTo('08')}
          style={{ background: '#1A237E', borderColor: '#303F9F' }}
        >
          <Send size={13} />
          <span>Issue New Regulatory Action</span>
        </button>
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
            placeholder="Search Action ID, Notice ID, Finding ID, Mine, Action Type..."
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
            <option value="All">All Action Types</option>
            <option value="Corrective Direction">Corrective Direction</option>
            <option value="Statutory Show-Cause Notice">Show-Cause Notice</option>
            <option value="Safety Direction">Safety Direction</option>
          </select>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', fontSize: '12px', color: 'var(--text-muted)' }}>
          Showing {filtered.length} of {actionRegisterData.length} records
        </div>
      </div>

      {/* Register Table */}
      <div className="card" style={{ padding: 0, overflow: 'hidden', marginBottom: '30px' }}>
        <table className="data-table">
          <thead>
            <tr>
              <th style={{ width: '130px' }}>Action ID</th>
              <th style={{ width: '140px' }}>Notice Ref</th>
              <th style={{ width: '130px' }}>Finding Ref</th>
              <th style={{ width: '100px' }}>Mine</th>
              <th>Action Type & Scope</th>
              <th style={{ width: '120px' }}>Issued Date</th>
              <th style={{ width: '120px' }}>Due Date</th>
              <th style={{ width: '140px' }}>Status</th>
              <th style={{ width: '90px', textAlign: 'center' }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(item => (
              <tr
                key={item.actionId}
                onClick={() => {
                  const n = notices.find(x => x.id === item.noticeId) || notices[0];
                  setActiveNotice(n);
                  navigateTo('09');
                }}
                style={{ cursor: 'pointer' }}
              >
                <td>
                  <span className="id-badge font-mono" style={{ background: 'rgba(63, 81, 181, 0.15)', color: '#1A237E' }}>
                    {item.actionId}
                  </span>
                </td>
                <td>
                  <span className="badge badge-info font-mono" style={{ fontSize: '11px' }}>
                    {item.noticeId}
                  </span>
                </td>
                <td>
                  <span className="id-badge font-mono" style={{ background: 'rgba(211, 47, 47, 0.12)', color: '#D32F2F' }}>
                    {item.findingId}
                  </span>
                </td>
                <td>
                  <span style={{ fontWeight: 600 }}>{item.mine}</span>
                </td>
                <td>
                  <div style={{ fontWeight: 600, color: 'var(--text-primary)', fontSize: '13px' }}>
                    {item.actionType}
                  </div>
                  <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
                    Recipient: {item.recipient}
                  </div>
                </td>
                <td>
                  <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>{item.issuedDate}</span>
                </td>
                <td>
                  <span style={{ fontSize: '12px', fontWeight: 700, color: '#D32F2F' }}>{item.dueDate}</span>
                </td>
                <td>
                  <span className="status-pill status-active" style={{ fontSize: '10.5px' }}>
                    ✓ {item.status}
                  </span>
                </td>
                <td style={{ textAlign: 'center' }}>
                  <button
                    className="btn btn-secondary btn-sm"
                    onClick={e => {
                      e.stopPropagation();
                      const n = notices.find(x => x.id === item.noticeId) || notices[0];
                      setActiveNotice(n);
                      navigateTo('09');
                    }}
                    style={{ padding: '3px 8px' }}
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
