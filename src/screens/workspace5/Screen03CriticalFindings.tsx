"use client";

import React from 'react';
import { useRegulatoryAction } from '../../context/RegulatoryActionContext';
import {
  Flame,
  AlertTriangle,
  Clock,
  User,
  Building,
  ShieldAlert,
  ChevronLeft,
  ArrowRight,
  Eye
} from 'lucide-react';

export const Screen03CriticalFindings: React.FC = () => {
  const {
    findings,
    setActiveFinding,
    navigateTo,
    selectedMine
  } = useRegulatoryAction();

  const criticalFindings = findings.filter(f => f.severity === 'CRITICAL' || f.severity === 'HIGH');

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
              className="badge badge-danger"
              style={{
                fontSize: '11.5px',
                fontWeight: 800,
                letterSpacing: '0.04em'
              }}
            >
              IMMEDIATE STATUTORY ATTENTION
            </span>
          </div>
          <h1 className="screen-title" style={{ margin: 0 }}>
            CRITICAL & HIGH PRIORITY FINDINGS
          </h1>
          <p className="screen-subtitle">
            Statutory non-compliances posing severe risk to underground personnel, mine ventilation, or strata stability
          </p>
        </div>

        <button
          className="btn btn-secondary btn-sm"
          onClick={() => navigateTo('11')}
          style={{ background: '#FFEBEE', color: '#D32F2F', borderColor: '#FFCDD2' }}
        >
          <ShieldAlert size={13} />
          <span>Escalation Center (Screen 11)</span>
        </button>
      </div>

      {/* Top Banner KPI Card */}
      <div
        className="card"
        style={{
          background: 'linear-gradient(135deg, #FFEBEE 0%, #FFCDD2 100%)',
          border: '1px solid #EF9A9A',
          padding: '16px 20px',
          marginBottom: '20px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <div
            style={{
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              background: '#D32F2F',
              color: '#FFF',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <Flame size={24} />
          </div>
          <div>
            <div style={{ fontSize: '12px', fontWeight: 800, color: '#B71C1C', textTransform: 'uppercase' }}>
              Statutory Critical Queue
            </div>
            <div style={{ fontSize: '18px', fontWeight: 800, color: '#B71C1C', marginTop: '2px' }}>
              {criticalFindings.length} High-Risk Findings Requiring Enforcement Action
            </div>
          </div>
        </div>

        <div style={{ textAlign: 'right', fontSize: '12px', color: '#B71C1C' }}>
          <strong>Enforcement Window:</strong> Action response mandated within statutory notice deadline.
        </div>
      </div>

      {/* Critical Findings Table */}
      <div className="card" style={{ padding: 0, overflow: 'hidden', marginBottom: '30px' }}>
        <table className="data-table">
          <thead>
            <tr>
              <th style={{ width: '130px' }}>Finding ID</th>
              <th style={{ width: '100px' }}>Mine</th>
              <th>Issue & Non-Compliance Scope</th>
              <th style={{ width: '140px' }}>Regulatory Basis</th>
              <th style={{ width: '140px' }}>Risk Evaluation</th>
              <th style={{ width: '110px' }}>Action Req.</th>
              <th style={{ width: '140px' }}>Assigned Dept</th>
              <th style={{ width: '110px' }}>Due Date</th>
              <th style={{ width: '100px' }}>Status</th>
              <th style={{ width: '90px', textAlign: 'center' }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {criticalFindings.map(fnd => {
              const isCrit = fnd.severity === 'CRITICAL';
              return (
                <tr
                  key={fnd.id}
                  onClick={() => {
                    setActiveFinding(fnd);
                    navigateTo('04');
                  }}
                  style={{
                    backgroundColor: 'rgba(211, 47, 47, 0.04)',
                    cursor: 'pointer'
                  }}
                >
                  <td>
                    <span
                      className="id-badge font-mono"
                      style={{
                        background: 'rgba(211, 47, 47, 0.15)',
                        color: '#D32F2F',
                        fontWeight: 800
                      }}
                    >
                      {fnd.id}
                    </span>
                  </td>
                  <td>
                    <span style={{ fontWeight: 700 }}>{fnd.mine}</span>
                  </td>
                  <td>
                    <div style={{ fontWeight: 700, color: 'var(--text-primary)', fontSize: '13px' }}>
                      {fnd.title}
                    </div>
                    <div style={{ fontSize: '11.5px', color: 'var(--text-secondary)', marginTop: '2px' }}>
                      {fnd.location}
                    </div>
                  </td>
                  <td>
                    <span className="badge badge-info font-mono" style={{ fontSize: '10.5px' }}>
                      {fnd.regulatoryBasisId}
                    </span>
                  </td>
                  <td>
                    <span className={`badge ${isCrit ? 'badge-critical font-bold' : 'badge-warning font-bold'}`}>
                      {isCrit ? 'CRITICAL SAFETY RISK' : 'HIGH OPERATIONAL RISK'}
                    </span>
                  </td>
                  <td>
                    <span className="badge badge-danger font-bold">YES</span>
                  </td>
                  <td>
                    <div style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-primary)' }}>
                      {fnd.mineResponse?.department || 'Ventilation / Safety'}
                    </div>
                  </td>
                  <td>
                    <div style={{ fontSize: '12px', fontWeight: 700, color: '#D32F2F' }}>
                      {fnd.dueDate}
                    </div>
                    <div style={{ fontSize: '10.5px', color: 'var(--text-muted)' }}>
                      {fnd.daysRemaining} days left
                    </div>
                  </td>
                  <td>
                    <span className="badge badge-danger font-mono" style={{ fontWeight: 800 }}>
                      OPEN
                    </span>
                  </td>
                  <td style={{ textAlign: 'center' }}>
                    <button
                      className="btn btn-secondary btn-sm"
                      onClick={e => {
                        e.stopPropagation();
                        setActiveFinding(fnd);
                        navigateTo('04');
                      }}
                      style={{ padding: '3px 8px' }}
                    >
                      <Eye size={12} />
                      <span>Assess</span>
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
