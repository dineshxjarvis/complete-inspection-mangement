"use client";

import React from 'react';
import { useStrata } from '../context/StrataContext';

export const Screen03BRequestDetail: React.FC = () => {
  const { data, screenParams, navigateTo, showModal, closeModal, acceptIntakeRequest, rejectIntakeRequest, showToast } = useStrata();

  const reqId = screenParams.requestId || 'REQ-2026-0098';
  const req = data.intakeRequests.find(r => r.id === reqId) || data.intakeRequests[0];

  const handleAccept = () => {
    showModal(
      'Accept Inspection Request',
      <div>
        <p style={{ fontSize: '12.5px', marginBottom: '12px' }}>
          Are you sure you want to accept <strong>{req.id}</strong> for official inspection planning and recommendation queuing?
        </p>
        <div className="form-group">
          <label className="form-label">Acceptance Notes / Statutory Tag</label>
          <input type="text" className="form-control" defaultValue="Verified against DGMS telemetry threshold. Authorized for recommendation queue." />
        </div>
      </div>,
      [
        { text: 'Cancel', className: 'btn-secondary', onClick: closeModal },
        { text: 'Confirm Acceptance', className: 'btn-success', onClick: () => acceptIntakeRequest(req.id) }
      ]
    );
  };

  const handleReject = () => {
    showModal(
      'Reject Inspection Request',
      <div>
        <p style={{ fontSize: '12.5px', marginBottom: '12px' }}>
          Please specify the mandatory statutory or administrative reason for rejecting request <strong>{req.id}</strong>.
        </p>
        <div className="form-group">
          <label className="form-label required">Rejection Reason</label>
          <select className="form-control">
            <option>Outside statutory governance scope (Delegated to colliery local team)</option>
            <option>Duplicate of active inspection plan</option>
            <option>Insufficient technical justification</option>
            <option>Mine section currently under scheduled seal-off</option>
          </select>
        </div>
        <div className="form-group" style={{ marginTop: '8px' }}>
          <label className="form-label">Additional Comments</label>
          <textarea className="form-control" placeholder="Provide notes for the requester..." />
        </div>
      </div>,
      [
        { text: 'Cancel', className: 'btn-secondary', onClick: closeModal },
        { text: 'Confirm Rejection', className: 'btn-danger', onClick: () => rejectIntakeRequest(req.id) }
      ]
    );
  };

  const handleClarification = () => {
    showModal(
      'Request Technical Clarification',
      <div>
        <p style={{ fontSize: '12.5px', marginBottom: '12px' }}>
          Send an official query back to the requester for <strong>{req.id}</strong>.
        </p>
        <div className="form-group">
          <label className="form-label required">Query / Clarification Points</label>
          <textarea className="form-control" placeholder="Specify required telemetry charts, telltale readings, or surveyor logs..." />
        </div>
      </div>,
      [
        { text: 'Cancel', className: 'btn-secondary', onClick: closeModal },
        { text: 'Send Request', className: 'btn-primary', onClick: () => { closeModal(); showToast(`Clarification query dispatched to ${req.requester}`, 'success'); } }
      ]
    );
  };

  return (
    <div className="content-container">
      <div className="breadcrumb-bar">
        <span className="crumb-link" onClick={() => navigateTo('01')}>Dashboard</span>
        <span className="breadcrumb-sep">/</span>
        <span className="crumb-link" onClick={() => navigateTo('02')}>Inspection Intake</span>
        <span className="breadcrumb-sep">/</span>
        <span className="breadcrumb-current">{req.id}</span>
      </div>

      <div className="screen-header-row">
        <div className="screen-header-left">
          <h1 className="screen-title">
            <span className="font-mono" style={{ color: 'var(--purple-primary)' }}>{req.id}</span>
            <span>Inspection Request Detail</span>
            <span className={`badge ${req.status === 'New' ? 'badge-new' : req.status === 'Accepted' ? 'badge-accepted' : 'badge-converted'}`}>
              <span className="badge-dot" />{req.status}
            </span>
          </h1>
          <p className="screen-subtitle">
            <strong>Source:</strong> {req.source} | <strong>Scope:</strong> {req.scope.subsidiary} / {req.scope.area} / {req.scope.mine.split('(')[0]} | <strong>Need:</strong> {req.reason}
          </p>
        </div>
        <div className="screen-actions">
          <button className="btn btn-secondary" onClick={handleClarification}>Request Clarification</button>
          <button className="btn btn-danger" onClick={handleReject}>Reject</button>
          <button className="btn btn-success" onClick={handleAccept}>Accept</button>
          <button className="btn btn-primary" onClick={() => navigateTo('04')}>Convert to Recommendation</button>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '16px' }}>
        
        {/* Left Column */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          
          <div className="enterprise-card">
            <div className="card-header">
              <span className="card-title">Request Overview & Justification</span>
              <span className={`badge ${req.priority === 'High' ? 'badge-high' : 'badge-medium'}`}>Priority: {req.priority}</span>
            </div>
            <div className="card-body">
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px', marginBottom: '14px' }}>
                <div>
                  <div style={{ fontSize: '10px', color: 'var(--text-muted)', fontWeight: 700 }}>INSPECTION TRACK</div>
                  <div style={{ fontWeight: 600 }}>{req.inspectionTrack}</div>
                </div>
                <div>
                  <div style={{ fontSize: '10px', color: 'var(--text-muted)', fontWeight: 700 }}>INSPECTION TYPE</div>
                  <div style={{ fontWeight: 600 }}>{req.inspectionType}</div>
                </div>
                <div>
                  <div style={{ fontSize: '10px', color: 'var(--text-muted)', fontWeight: 700 }}>REQUESTED DATE</div>
                  <div className="font-mono">{req.requestedDate}</div>
                </div>
                <div>
                  <div style={{ fontSize: '10px', color: 'var(--text-muted)', fontWeight: 700 }}>RISK CLASSIFICATION</div>
                  <div style={{ color: 'var(--status-red-text)', fontWeight: 700 }}>{req.risk}</div>
                </div>
              </div>

              <div style={{ marginBottom: '12px' }}>
                <div style={{ fontSize: '10px', color: 'var(--text-muted)', fontWeight: 700, marginBottom: '2px' }}>REASON FOR INTAKE TRIGGER</div>
                <div style={{ background: 'var(--bg-surface-alt)', border: '1px solid var(--border-light)', padding: '8px 12px', borderRadius: '3px', fontSize: '12px', fontWeight: 500 }}>
                  {req.reason}
                </div>
              </div>

              <div>
                <div style={{ fontSize: '10px', color: 'var(--text-muted)', fontWeight: 700, marginBottom: '2px' }}>DETAILED DESCRIPTION</div>
                <p style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>{req.description}</p>
              </div>
            </div>
          </div>

          <div className="enterprise-card">
            <div className="card-header">
              <span className="card-title">Requested Scope & Location</span>
            </div>
            <div className="card-body">
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px' }}>
                <div>
                  <div style={{ fontSize: '10px', color: 'var(--text-muted)', fontWeight: 700 }}>HOLDING / SUBSIDIARY</div>
                  <div>{req.scope.holding} &bull; {req.scope.subsidiary}</div>
                </div>
                <div>
                  <div style={{ fontSize: '10px', color: 'var(--text-muted)', fontWeight: 700 }}>AREA & MINE</div>
                  <div>{req.scope.area} &bull; {req.scope.mine}</div>
                </div>
                <div style={{ gridColumn: '1 / -1' }}>
                  <div style={{ fontSize: '10px', color: 'var(--text-muted)', fontWeight: 700 }}>TARGET OPERATIONAL SECTION</div>
                  <div className="font-mono" style={{ color: 'var(--text-primary)', fontWeight: 600 }}>{req.scope.location}</div>
                </div>
              </div>
            </div>
          </div>

          <div className="enterprise-card">
            <div className="card-header">
              <span className="card-title">Requester Information & Attachments</span>
            </div>
            <div className="card-body">
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px', marginBottom: '14px' }}>
                <div>
                  <div style={{ fontSize: '10px', color: 'var(--text-muted)', fontWeight: 700 }}>OFFICIAL REQUESTER</div>
                  <div><strong>{req.requester}</strong> ({req.designation})</div>
                </div>
                <div>
                  <div style={{ fontSize: '10px', color: 'var(--text-muted)', fontWeight: 700 }}>CONTACT CHANNELS</div>
                  <div style={{ fontSize: '11.5px' }}>{req.contact}</div>
                </div>
              </div>

              <div style={{ fontSize: '10px', color: 'var(--text-muted)', fontWeight: 700, marginBottom: '6px' }}>ATTACHED EVIDENCE / RECORDS</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                {req.attachments.map((att, idx) => (
                  <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'var(--bg-surface-alt)', border: '1px solid var(--border-light)', padding: '6px 12px', borderRadius: '3px', fontSize: '11.5px' }}>
                    <span className="font-mono">{att.name} ({att.size})</span>
                    <button className="btn btn-secondary btn-sm" onClick={() => showToast(`Downloading ${att.name}...`, 'success')}>Download</button>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>

        {/* Right Column: Timeline & Actions */}
        <div>
          <div className="enterprise-card">
            <div className="card-header">
              <span className="card-title">Governance Workflow Timeline</span>
            </div>
            <div className="card-body">
              <div className="audit-timeline">
                {req.timeline.map((t, idx) => (
                  <div key={idx} className="timeline-item">
                    <div
                      className="timeline-dot"
                      style={{
                        backgroundColor: t.done ? 'var(--status-green-text)' : t.current ? 'var(--purple-primary)' : 'var(--border-color)'
                      }}
                    />
                    <div className="timeline-header">
                      <strong className="timeline-user" style={{ fontSize: '11.5px' }}>{t.step}</strong>
                      <span className="font-mono" style={{ fontSize: '10px', color: 'var(--text-muted)' }}>{t.date}</span>
                    </div>
                    <div className="timeline-action" style={{ fontSize: '11px' }}>By: {t.by}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="enterprise-card">
            <div className="card-header">
              <span className="card-title">Authorized Action Panel</span>
            </div>
            <div className="card-body" style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <button className="btn btn-success" style={{ width: '100%' }} onClick={handleAccept}>Accept Inspection Request</button>
              <button className="btn btn-primary" style={{ width: '100%' }} onClick={() => navigateTo('04')}>Convert to Recommendation</button>
              <button className="btn btn-secondary" style={{ width: '100%' }} onClick={handleClarification}>Request Clarification</button>
              <button className="btn btn-danger" style={{ width: '100%' }} onClick={handleReject}>Reject Request</button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
