"use client";

import React, { useState } from 'react';
import { useMineResponse } from '../../context/MineResponseContext';
import {
  Lock,
  CheckCircle,
  XCircle,
  AlertCircle,
  FileText,
  Camera,
  ArrowRight,
  Shield,
  Search,
  Filter
} from 'lucide-react';

export const Screen04ChecklistView: React.FC = () => {
  const { checklistItems, navigateTo, activeInspection, setActiveFinding, findings } = useMineResponse();
  const [filterStatus, setFilterStatus] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const filteredItems = checklistItems.filter(item => {
    if (filterStatus !== 'All' && item.status !== filterStatus) return false;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      return (
        item.requirementId.toLowerCase().includes(q) ||
        item.requirement.toLowerCase().includes(q) ||
        item.category.toLowerCase().includes(q) ||
        item.regulatoryBasis.toLowerCase().includes(q)
      );
    }
    return true;
  });

  return (
    <div className="screen-content">
      {/* Header */}
      <div className="screen-header">
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span className="id-badge font-mono" style={{ background: 'rgba(0, 137, 123, 0.15)', color: '#00796B', fontWeight: 700 }}>
              {activeInspection.id}
            </span>
            <span className="badge badge-info">22 STATUTORY CHECKS</span>
          </div>
          <h1 className="screen-title" style={{ marginTop: '4px' }}>
            INSPECTION CHECKLIST &bull; MINE-SIDE READ-ONLY VIEW
          </h1>
          <p className="screen-subtitle">
            Statutory compliance evaluation across all 22 checklist requirements &bull; Original field findings cannot be modified
          </p>
        </div>

        <button
          className="btn btn-secondary btn-sm"
          onClick={() => navigateTo('03')}
        >
          <span>Back to Inspection Dossier</span>
        </button>
      </div>

      {/* Immutability Banner */}
      <div
        style={{
          padding: '12px 18px',
          borderRadius: '6px',
          backgroundColor: '#ECEFF1',
          border: '1px solid #CFD8DC',
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          marginBottom: '20px'
        }}
      >
        <Lock size={18} color="#455A64" />
        <div style={{ fontSize: '12px', color: '#37474F' }}>
          <strong>Immutable Inspector Records:</strong> Mine Management can view statutory checklist results, measurements, and evidence attachments, but cannot alter PASS/FAIL statuses, edit recorded instrument values, delete evidence, or modify statutory clauses.
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div
        className="card filter-bar"
        style={{
          display: 'flex',
          gap: '12px',
          padding: '12px 16px',
          marginBottom: '16px',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}
      >
        <div style={{ flex: 1, position: 'relative', maxWidth: '480px' }}>
          <input
            type="text"
            className="form-control"
            placeholder="Search Requirement ID, Clause, Category..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
          />
        </div>

        <div style={{ display: 'flex', gap: '8px' }}>
          {['All', 'COMPLIANT', 'NON-COMPLIANT', 'NOT-APPLICABLE'].map(st => (
            <button
              key={st}
              onClick={() => setFilterStatus(st)}
              className={`btn btn-sm ${filterStatus === st ? 'btn-primary' : 'btn-secondary'}`}
              style={{
                background: filterStatus === st ? '#00897B' : undefined,
                borderColor: filterStatus === st ? '#00796B' : undefined,
                fontSize: '11px'
              }}
            >
              {st === 'All' ? 'All (22)' : st === 'NON-COMPLIANT' ? 'Non-Compliant (4)' : st === 'COMPLIANT' ? 'Compliant (17)' : 'N/A (1)'}
            </button>
          ))}
        </div>
      </div>

      {/* Checklist Items Accordion / Cards List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {filteredItems.map(item => {
          const isFail = item.inspectorResult === 'FAIL';
          const isPass = item.inspectorResult === 'PASS';
          return (
            <div
              key={item.id}
              className="card"
              style={{
                margin: 0,
                padding: '16px',
                borderLeft: `4px solid ${isFail ? '#D32F2F' : isPass ? '#2E7D32' : '#78909C'}`,
                background: isFail ? '#FFFDFD' : 'var(--bg-surface)'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '16px' }}>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                    <span
                      className="id-badge font-mono"
                      style={{
                        background: isFail ? '#FFEBEE' : '#E8F5E9',
                        color: isFail ? '#B71C1C' : '#1B5E20',
                        borderColor: isFail ? '#FFCDD2' : '#C8E6C9',
                        fontWeight: 700
                      }}
                    >
                      {item.requirementId}
                    </span>

                    <span className={`badge ${isFail ? 'badge-danger' : isPass ? 'badge-success' : 'badge-subtle'}`}>
                      {item.inspectorResult === 'FAIL' ? '❌ FAIL — NON-COMPLIANT' : item.inspectorResult === 'PASS' ? '✓ PASS — COMPLIANT' : 'N/A — NOT APPLICABLE'}
                    </span>

                    <span className="badge badge-info">{item.category}</span>
                  </div>

                  <h3 style={{ margin: '0 0 6px', fontSize: '13.5px', fontWeight: 700, color: 'var(--text-primary)' }}>
                    {item.requirement}
                  </h3>

                  <div style={{ fontSize: '11.5px', color: 'var(--text-secondary)', marginBottom: '8px' }}>
                    <strong>Regulatory Basis:</strong> {item.regulatoryBasis} &bull; <em>{item.clause}</em>
                  </div>

                  {/* Measurement & Evidence Strip */}
                  <div
                    style={{
                      display: 'flex',
                      flexWrap: 'wrap',
                      gap: '12px',
                      alignItems: 'center',
                      background: 'var(--bg-surface-alt)',
                      padding: '8px 12px',
                      borderRadius: '4px',
                      border: '1px solid var(--border-light)',
                      fontSize: '11.5px'
                    }}
                  >
                    {item.measuredValue && (
                      <div style={{ color: isFail ? '#B71C1C' : 'var(--text-primary)' }}>
                        <strong>Recorded Reading:</strong> <span style={{ fontWeight: 700 }}>{item.measuredValue}</span>
                        {item.requiredValue && <span style={{ color: 'var(--text-muted)' }}> (Prescribed: {item.requiredValue})</span>}
                      </div>
                    )}

                    {item.instrument && (
                      <div style={{ color: 'var(--text-muted)' }}>
                        <strong>Instrument:</strong> {item.instrument}
                      </div>
                    )}

                    <div style={{ marginLeft: 'auto', display: 'flex', gap: '8px', color: '#00796B', fontWeight: 600 }}>
                      {item.evidenceCount.photos > 0 && <span>📸 {item.evidenceCount.photos} Photos</span>}
                      {item.evidenceCount.measurements > 0 && <span>📏 {item.evidenceCount.measurements} Measurements</span>}
                      {item.evidenceCount.documents > 0 && <span>📄 {item.evidenceCount.documents} Certs</span>}
                    </div>
                  </div>
                </div>

                {/* Right Action Button */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', alignItems: 'flex-end', flexShrink: 0 }}>
                  {item.observationId ? (
                    <button
                      className="btn btn-primary btn-sm"
                      onClick={() => navigateTo('05')}
                      style={{ background: '#00897B', borderColor: '#00796B', fontSize: '11.5px' }}
                    >
                      <FileText size={12} />
                      <span>View Observation ({item.observationId})</span>
                    </button>
                  ) : (
                    <button
                      className="btn btn-secondary btn-sm"
                      onClick={() => navigateTo('06')}
                      style={{ fontSize: '11.5px' }}
                    >
                      <span>View Evidence</span>
                    </button>
                  )}

                  {item.findingId && (
                    <button
                      className="btn btn-secondary btn-sm"
                      onClick={() => {
                        const f = findings.find(x => x.id === item.findingId);
                        if (f) setActiveFinding(f);
                        navigateTo('08');
                      }}
                      style={{
                        fontSize: '11px',
                        color: '#B71C1C',
                        borderColor: '#FFCDD2',
                        background: '#FFF8F8'
                      }}
                    >
                      <span>Related Finding ({item.findingId})</span>
                      <ArrowRight size={11} />
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
