"use client";

import React, { useState } from 'react';
import { useStrata } from '../context/StrataContext';
import { Upload } from 'lucide-react';

export const Screen03ACreateRequest: React.FC = () => {
  const { navigateTo, submitIntakeRequest, showToast } = useStrata();

  const [sourceType, setSourceType] = useState('Mine Management');
  const [requester, setRequester] = useState('R. K. Agarwal (Mine Agent)');
  const [contact, setContact] = useState('agent.mineA2@ecl.coalindia.in | +91 94340 88219');
  const [track, setTrack] = useState('Safety & Strata Control');
  const [inspectionType, setInspectionType] = useState('Strata Control & Roof Support Urgent Inspection');
  const [reason, setReason] = useState('Abnormal telltale roof convergence detected (14mm in 48h) following heavy blasting in adjacent panel.');
  const [description, setDescription] = useState('Sub-surface strata monitoring stations have signaled accelerated displacement in junction J-14. Immediate statutory technical audit requested prior to resuming coal extraction.');
  const [location, setLocation] = useState('District 3 West Depillaring Section, Panels W4-W6, Junction J-14');
  const [priority, setPriority] = useState<'Critical' | 'High' | 'Medium' | 'Low'>('High');
  const [risk, setRisk] = useState<'Critical' | 'High' | 'Medium' | 'Low'>('High');
  const [requestedDate, setRequestedDate] = useState('2026-08-30');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    submitIntakeRequest({
      source: sourceType,
      sourceType,
      requester,
      contact,
      inspectionTrack: track,
      inspectionType,
      reason,
      description,
      priority,
      risk,
      requestedDate,
      scope: {
        holding: 'Coal India Limited (CIL)',
        subsidiary: 'Eastern Coalfields Limited (ECL)',
        area: 'Area 01 (Sripur-Kenda)',
        mine: 'Mine A2 (Deep Underground Seam VII)',
        location
      }
    });
  };

  return (
    <div className="content-container">
      <div className="breadcrumb-bar">
        <span className="crumb-link" onClick={() => navigateTo('01')}>Dashboard</span>
        <span className="breadcrumb-sep">/</span>
        <span className="crumb-link" onClick={() => navigateTo('02')}>Inspection Intake</span>
        <span className="breadcrumb-sep">/</span>
        <span className="breadcrumb-current">Create Inspection Request</span>
      </div>

      <div className="screen-header-row">
        <div className="screen-header-left">
          <h1 className="screen-title">Create Inspection Request</h1>
          <p className="screen-subtitle">
            Initiate a formal inspection request with organizational scope, regulatory trigger justification, and supporting technical attachments.
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        
        {/* Section 1: Source */}
        <div className="enterprise-card">
          <div className="card-header">
            <span className="card-title">1. Source & Requester Identity</span>
          </div>
          <div className="card-body">
            <div className="form-grid">
              <div className="form-group">
                <label className="form-label required">Source Type</label>
                <select className="form-control" value={sourceType} onChange={(e) => setSourceType(e.target.value)}>
                  <option>Internal Safety Directorate</option>
                  <option>Mine Management</option>
                  <option>Compliance Engine</option>
                  <option>Regulatory / DGMS</option>
                  <option>Senior Authority</option>
                  <option>Other Authorized Source</option>
                </select>
              </div>
              <div className="form-group">
                <label className="form-label required">Requester Name</label>
                <input type="text" className="form-control" value={requester} onChange={(e) => setRequester(e.target.value)} required />
              </div>
              <div className="form-group">
                <label className="form-label required">Organization / Designation</label>
                <input type="text" className="form-control" defaultValue="Eastern Coalfields Limited - Mine A2" required />
              </div>
              <div className="form-group">
                <label className="form-label required">Official Contact (Email / Phone)</label>
                <input type="text" className="form-control" value={contact} onChange={(e) => setContact(e.target.value)} required />
              </div>
            </div>
          </div>
        </div>

        {/* Section 2: Need */}
        <div className="enterprise-card">
          <div className="card-header">
            <span className="card-title">2. Inspection Need & Technical Objective</span>
          </div>
          <div className="card-body">
            <div className="form-grid">
              <div className="form-group">
                <label className="form-label required">Inspection Track</label>
                <select className="form-control" value={track} onChange={(e) => setTrack(e.target.value)}>
                  <option>Safety & Strata Control</option>
                  <option>Ventilation & Occupational Health</option>
                  <option>Electrical & Flameproof Machinery</option>
                  <option>Emergency Preparedness & Inundation</option>
                </select>
              </div>
              <div className="form-group">
                <label className="form-label required">Inspection Type</label>
                <select className="form-control" value={inspectionType} onChange={(e) => setInspectionType(e.target.value)}>
                  <option>Strata Control & Roof Support Urgent Inspection</option>
                  <option>Ventilation & Gas Dynamics Statutory Inspection</option>
                  <option>Flameproof Electrical Compliance Audit</option>
                  <option>Inundation & Water Hazard Survey</option>
                </select>
              </div>
              <div className="form-group full-width">
                <label className="form-label required">Reason for Inspection</label>
                <input type="text" className="form-control" value={reason} onChange={(e) => setReason(e.target.value)} required />
              </div>
              <div className="form-group full-width">
                <label className="form-label required">Detailed Technical Description</label>
                <textarea className="form-control" value={description} onChange={(e) => setDescription(e.target.value)} required />
              </div>
            </div>
          </div>
        </div>

        {/* Section 3: Scope */}
        <div className="enterprise-card">
          <div className="card-header">
            <span className="card-title">3. Organizational Scope & Target Underground Section</span>
          </div>
          <div className="card-body">
            <div className="form-grid">
              <div className="form-group">
                <label className="form-label">Holding / Subsidiary</label>
                <input type="text" className="form-control" value="Coal India Limited (CIL) / ECL" readOnly style={{ background: '#F8FAFC' }} />
              </div>
              <div className="form-group">
                <label className="form-label">Area & Primary Colliery</label>
                <input type="text" className="form-control" value="Area 01 (Sripur-Kenda) - Mine A2" readOnly style={{ background: '#F8FAFC' }} />
              </div>
              <div className="form-group full-width">
                <label className="form-label required">Specific Underground Location / Panel / Seam</label>
                <input type="text" className="form-control" value={location} onChange={(e) => setLocation(e.target.value)} required />
              </div>
            </div>
          </div>
        </div>

        {/* Section 4: Priority */}
        <div className="enterprise-card">
          <div className="card-header">
            <span className="card-title">4. Priority, Risk Level & Requested Execution Window</span>
          </div>
          <div className="card-body">
            <div className="form-grid">
              <div className="form-group">
                <label className="form-label required">Priority</label>
                <select className="form-control" value={priority} onChange={(e) => setPriority(e.target.value as any)}>
                  <option value="Critical">Critical</option>
                  <option value="High">High</option>
                  <option value="Medium">Medium</option>
                  <option value="Low">Low</option>
                </select>
              </div>
              <div className="form-group">
                <label className="form-label required">Risk Classification</label>
                <select className="form-control" value={risk} onChange={(e) => setRisk(e.target.value as any)}>
                  <option value="Critical">Critical</option>
                  <option value="High">High</option>
                  <option value="Medium">Medium</option>
                  <option value="Low">Low</option>
                </select>
              </div>
              <div className="form-group">
                <label className="form-label required">Requested Inspection Date</label>
                <input type="date" className="form-control" value={requestedDate} onChange={(e) => setRequestedDate(e.target.value)} required />
              </div>
              <div className="form-group">
                <label className="form-label">Supporting Justification</label>
                <input type="text" className="form-control" defaultValue="Convergence telemetry data uploaded. Exceeds statutory threshold." />
              </div>
            </div>
          </div>
        </div>

        {/* Section 5: Attachments */}
        <div className="enterprise-card">
          <div className="card-header">
            <span className="card-title">5. Technical Attachments & Telemetry Records</span>
          </div>
          <div className="card-body">
            <div style={{ border: '2px dashed var(--border-color)', borderRadius: '4px', padding: '20px', textAlign: 'center', backgroundColor: 'var(--bg-surface-alt)', marginBottom: '12px' }}>
              <div style={{ color: 'var(--purple-primary)', display: 'flex', justifyContent: 'center', marginBottom: '6px' }}>
                <Upload size={24} />
              </div>
              <div style={{ fontWeight: 600, fontSize: '12px' }}>Click or Drag & Drop statutory logs, photos, or CAD sections</div>
              <div style={{ fontSize: '10.5px', color: 'var(--text-muted)' }}>PDF, JPG, PNG, CSV up to 25MB per file</div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#FFF', border: '1px solid var(--border-light)', padding: '6px 12px', borderRadius: '3px', fontSize: '11.5px' }}>
                <span className="font-mono">telemetry_convergence_panelW4.pdf (2.4 MB)</span>
                <span className="badge badge-approved">Attached</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Actions */}
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px', marginTop: '20px', marginBottom: '30px' }}>
          <button type="button" className="btn btn-secondary" onClick={() => navigateTo('02')}>Cancel</button>
          <button type="button" className="btn btn-secondary" onClick={() => { showToast('Draft saved successfully', 'success'); navigateTo('03B', { requestId: 'REQ-2026-0098' }); }}>Save Draft</button>
          <button type="submit" className="btn btn-primary">Submit Request</button>
        </div>

      </form>
    </div>
  );
};
