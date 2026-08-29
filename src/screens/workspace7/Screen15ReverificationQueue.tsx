"use client";

import React, { useState } from 'react';
import { useVerification } from '../../context/VerificationContext';
import {
  RotateCcw,
  Search,
  Filter,
  Eye,
  ChevronLeft,
  ArrowRight,
  ShieldCheck,
  AlertTriangle
} from 'lucide-react';

export const Screen15ReverificationQueue: React.FC = () => {
  const {
    verificationList,
    setActiveVerification,
    navigateTo,
    selectedMine
  } = useVerification();

  const [activeTab, setActiveTab] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');

  const tabs = [
    'All',
    'Reopened',
    'Reworked',
    'Awaiting Reverification',
    'Overdue',
    'Completed'
  ];

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
                background: 'rgba(123, 31, 162, 0.15)',
                color: '#7B1FA2'
              }}
            >
              SECONDARY AUDIT CYCLE
            </span>
          </div>
          <h1 className="screen-title" style={{ margin: 0 }}>
            REVERIFICATION QUEUE & REWORKED CAPAs
          </h1>
          <p className="screen-subtitle">
            Remediation packages undergoing second-cycle statutory audits following initial verification failure or physical rework
          </p>
        </div>
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
              background: activeTab === tab ? '#7B1FA2' : 'transparent',
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

      {/* Reverification Table */}
      <div className="card" style={{ padding: 0, overflow: 'hidden', marginBottom: '30px' }}>
        <table className="data-table">
          <thead>
            <tr>
              <th style={{ width: '130px' }}>CAPA Ref</th>
              <th style={{ width: '130px' }}>Finding Ref</th>
              <th style={{ width: '180px' }}>Reopen Cause</th>
              <th style={{ width: '160px' }}>Action Owner</th>
              <th style={{ width: '140px' }}>New Evidence</th>
              <th style={{ width: '110px' }}>Submitted</th>
              <th style={{ width: '150px' }}>Cycle Status</th>
              <th style={{ width: '90px', textAlign: 'center' }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {verificationList.map(ver => (
              <tr
                key={ver.id}
                onClick={() => {
                  setActiveVerification(ver);
                  navigateTo('04');
                }}
                style={{ cursor: 'pointer' }}
              >
                <td>
                  <span className="id-badge font-mono" style={{ background: 'rgba(123, 31, 162, 0.15)', color: '#7B1FA2', fontWeight: 700 }}>
                    {ver.capaId}
                  </span>
                </td>
                <td>
                  <span className="badge badge-subtle font-mono">{ver.findingId}</span>
                </td>
                <td>
                  <div style={{ fontWeight: 600, color: 'var(--text-primary)', fontSize: '12.5px' }}>
                    Airflow below 5.5 m/s
                  </div>
                  <div style={{ fontSize: '10.5px', color: 'var(--text-muted)' }}>
                    Initial audit failed (5.0 m/s)
                  </div>
                </td>
                <td>
                  <div style={{ fontSize: '12px', fontWeight: 600 }}>{ver.actionOwner}</div>
                  <div style={{ fontSize: '10.5px', color: 'var(--text-muted)' }}>{ver.department}</div>
                </td>
                <td>
                  <span className="badge badge-info font-mono" style={{ fontSize: '11px' }}>
                    9-Grid Test (5.9 m/s)
                  </span>
                </td>
                <td>
                  <span style={{ fontSize: '11.5px', color: 'var(--text-muted)' }}>{ver.submissionDate}</span>
                </td>
                <td>
                  <span className="badge badge-warning font-bold" style={{ fontSize: '11px' }}>
                    AWAITING REVERIFICATION
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
