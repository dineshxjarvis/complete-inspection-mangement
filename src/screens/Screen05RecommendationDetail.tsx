"use client";

import React from 'react';
import { useStrata } from '../context/StrataContext';
import { TraceabilityChain } from '../components/TraceabilityChain';
import { Shield, Sparkles, FileText } from 'lucide-react';

export const Screen05RecommendationDetail: React.FC = () => {
  const { data, screenParams, navigateTo, showModal, closeModal, showToast } = useStrata();

  const recId = screenParams.recId || 'REC-2026-0048';
  const rec = data.recommendations.find(r => r.id === recId) || data.recommendations[0];

  const handleReject = () => {
    showModal(
      'Reject Recommendation',
      <div>
        <p style={{ fontSize: '12.5px', marginBottom: '12px' }}>
          Rejecting a system-generated recommendation requires a statutory override reason for audit logging.
        </p>
        <div className="form-group">
          <label className="form-label required">Override Justification</label>
          <select className="form-control">
            <option>Covered under comprehensive DGMS zonal audit</option>
            <option>Operational stoppage in panel</option>
            <option>Frequency adjusted per technical circular</option>
          </select>
        </div>
      </div>,
      [
        { text: 'Cancel', className: 'btn-secondary', onClick: closeModal },
        {
          text: 'Confirm Rejection',
          className: 'btn-danger',
          onClick: () => {
            closeModal();
            showToast(`Recommendation ${rec.id} rejected. Logged to immutable audit trail.`, 'error');
            navigateTo('04');
          }
        }
      ]
    );
  };

  const handleDefer = () => {
    showModal(
      'Defer Recommendation',
      <div>
        <p style={{ fontSize: '12.5px', marginBottom: '12px' }}>
          Defer recommendation <strong>{rec.id}</strong> to a future planning cycle.
        </p>
        <div className="form-group">
          <label className="form-label required">Defer Until Date</label>
          <input type="date" className="form-control" defaultValue="2026-12-01" />
        </div>
        <div className="form-group" style={{ marginTop: '8px' }}>
          <label className="form-label required">Statutory Deferral Justification</label>
          <input type="text" className="form-control" defaultValue="Scheduled seam ventilation rearrangement underway." />
        </div>
      </div>,
      [
        { text: 'Cancel', className: 'btn-secondary', onClick: closeModal },
        {
          text: 'Confirm Deferral',
          className: 'btn-primary',
          onClick: () => {
            closeModal();
            showToast(`Recommendation ${rec.id} deferred.`, 'success');
            navigateTo('04');
          }
        }
      ]
    );
  };

  return (
    <div className="content-container">
      <div className="breadcrumb-bar">
        <span className="crumb-link" onClick={() => navigateTo('01')}>Dashboard</span>
        <span className="breadcrumb-sep">/</span>
        <span className="crumb-link" onClick={() => navigateTo('04')}>Inspection Recommendations</span>
        <span className="breadcrumb-sep">/</span>
        <span className="breadcrumb-current">{rec.id}</span>
      </div>

      {/* Header */}
      <div className="screen-header-row">
        <div className="screen-header-left">
          <h1 className="screen-title">
            <span className="font-mono" style={{ color: 'var(--purple-primary)' }}>{rec.id}</span>
            <span>{rec.inspectionType} Recommendation</span>
            <span className="badge badge-awaiting"><span className="badge-dot" />{rec.status}</span>
          </h1>
          <p className="screen-subtitle">Scope: {rec.scope} &bull; Suggested Execution Date: <strong>{rec.suggestedDate}</strong></p>
        </div>
      </div>

      {/* Mandatory Human Decision Warning Banner */}
      <div className="recommendation-banner">
        <div className="banner-content">
          <span className="banner-tag">SYSTEM RECOMMENDATION</span>
          <span className="banner-text">&bull; <strong>HUMAN APPROVAL REQUIRED:</strong> This recommendation is an advisory trigger. No field inspection is scheduled until approved and planned by the Authorized Inspection Manager.</span>
        </div>
      </div>

      {/* Traceability Chain */}
      <div className="enterprise-card">
        <div className="card-header">
          <span className="card-title">
            <Shield size={15} /> Statutory Regulatory Traceability Chain
          </span>
          <span className="badge badge-draft font-mono">{rec.regulatoryBasis}</span>
        </div>
        <div className="card-body">
          <TraceabilityChain
            basis={{
              id: rec.regulatoryBasis,
              regulation: rec.regulation,
              clause: rec.clause,
              requirement: rec.requirement,
              applicability: rec.applicability,
              obligation: rec.obligation
            }}
            recommendationId={rec.id}
          />
        </div>
      </div>

      {/* Why Recommended + Suggested Config */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
        
        <div className="enterprise-card" style={{ marginBottom: 0 }}>
          <div className="card-header">
            <span className="card-title">
              <Sparkles size={15} /> Why STRATA Recommended This
            </span>
          </div>
          <div className="card-body">
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {rec.whyRecommended.map((w, idx) => (
                <div key={idx} style={{ background: 'var(--bg-surface-alt)', borderLeft: '3px solid var(--purple-primary)', padding: '6px 10px', borderRadius: '0 3px 3px 0' }}>
                  <strong style={{ fontSize: '11.5px', color: 'var(--text-primary)' }}>{w.signal}</strong>
                  <div style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>{w.detail}</div>
                </div>
              ))}
            </div>

            <div style={{ marginTop: '14px', paddingTop: '10px', borderTop: '1px solid var(--border-light)' }}>
              <div style={{ fontSize: '10px', color: 'var(--text-muted)', fontWeight: 700 }}>PREVIOUS INSPECTION HISTORY ({rec.previousHistory.lastInspectionId})</div>
              <div style={{ fontSize: '11.5px', marginTop: '2px' }}>
                <strong>Last Date:</strong> {rec.previousHistory.lastInspectionDate} &bull; <strong>Findings:</strong> {rec.previousHistory.findingsCount}
              </div>
              <div style={{ fontSize: '11px', color: 'var(--status-red-text)', marginTop: '2px' }}>
                {rec.previousHistory.criticalFindings}
              </div>
              <div style={{ fontSize: '10.5px', color: 'var(--text-muted)', marginTop: '2px' }}>
                {rec.previousHistory.capaStatus}
              </div>
            </div>
          </div>
        </div>

        <div className="enterprise-card" style={{ marginBottom: 0 }}>
          <div className="card-header">
            <span className="card-title">
              <FileText size={15} /> Suggested Inspection Configuration
            </span>
          </div>
          <div className="card-body" style={{ fontSize: '11.5px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <div>
                <div style={{ fontSize: '10px', color: 'var(--text-muted)', fontWeight: 700 }}>SUGGESTED SCOPE</div>
                <div>{rec.suggestedConfig.suggestedScope}</div>
              </div>
              <div>
                <div style={{ fontSize: '10px', color: 'var(--text-muted)', fontWeight: 700 }}>SUGGESTED CHECKLIST TEMPLATE</div>
                <div className="font-mono" style={{ color: 'var(--purple-primary)', fontWeight: 600 }}>{rec.suggestedConfig.suggestedChecklist}</div>
              </div>
              <div>
                <div style={{ fontSize: '10px', color: 'var(--text-muted)', fontWeight: 700 }}>REQUIRED COMPETENCIES</div>
                <div>{rec.suggestedConfig.requiredCompetencies.join(' • ')}</div>
              </div>
              <div>
                <div style={{ fontSize: '10px', color: 'var(--text-muted)', fontWeight: 700 }}>INSTRUMENTS & PPE</div>
                <div style={{ color: 'var(--text-secondary)' }}>{rec.suggestedConfig.requiredInstruments.join(', ')}</div>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* Action Bar */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: '#FFF', border: '1px solid var(--border-color)', padding: '12px 18px', borderRadius: '4px', marginBottom: '24px' }}>
        <div style={{ display: 'flex', gap: '8px' }}>
          <button className="btn btn-danger" onClick={handleReject}>Reject Recommendation</button>
          <button className="btn btn-secondary" onClick={handleDefer}>Defer</button>
        </div>
        <div style={{ display: 'flex', gap: '8px' }}>
          <button className="btn btn-secondary" onClick={() => navigateTo('07', { recId: rec.id })}>Modify Parameters</button>
          <button className="btn btn-primary" onClick={() => navigateTo('07', { recId: rec.id })}>Approve & Create Plan</button>
        </div>
      </div>

    </div>
  );
};
