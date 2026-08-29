"use client";

import React, { useState } from 'react';
import { useStrata } from '../context/StrataContext';
import { TraceabilityChain } from '../components/TraceabilityChain';

export const Screen07CreatePlanWizard: React.FC = () => {
  const { data, screenParams, navigateTo, createPlan, showToast } = useStrata();
  const [step, setStep] = useState(1);
  const [multiMine, setMultiMine] = useState(false);

  const recId = screenParams.recId || 'REC-2026-0048';
  const rec = data.recommendations.find(r => r.id === recId) || data.recommendations[0];

  const steps = [
    { num: 1, name: 'Source' },
    { num: 2, name: 'Scope' },
    { num: 3, name: 'Type' },
    { num: 4, name: 'Requirements' },
    { num: 5, name: 'Team Req' },
    { num: 6, name: 'Preparation' },
    { num: 7, name: 'Review' },
    { num: 8, name: 'Create' }
  ];

  const handleFinalize = () => {
    createPlan({
      recommendationId: rec.id,
      title: 'Statutory Q3 Comprehensive Underground Ventilation Audit',
      inspectionType: rec.inspectionType,
      status: 'Planned'
    });
  };

  const handleSaveDraft = () => {
    showToast('Plan draft saved with status DRAFT.', 'success');
    navigateTo('08', { planId: 'PLAN-2026-0088' });
  };

  return (
    <div className="content-container">
      <div className="breadcrumb-bar">
        <span className="crumb-link" onClick={() => navigateTo('01')}>Dashboard</span>
        <span className="breadcrumb-sep">/</span>
        <span className="crumb-link" onClick={() => navigateTo('06')}>Inspection Plans</span>
        <span className="breadcrumb-sep">/</span>
        <span className="breadcrumb-current">Create Inspection Plan</span>
      </div>

      <div className="screen-header-row">
        <div className="screen-header-left">
          <h1 className="screen-title">Create Inspection Plan</h1>
          <p className="screen-subtitle">
            8-Step Comprehensive Statutory Planning Wizard &bull; Authority &rarr; Track &rarr; Type &rarr; Scope &rarr; Checklist &rarr; Competencies &rarr; Prep &rarr; Validation
          </p>
        </div>
      </div>

      {/* 8-Step Stepper */}
      <div className="stepper-container">
        {steps.map((s, i) => (
          <React.Fragment key={s.num}>
            <div
              className={`stepper-step ${step > s.num ? 'completed' : step === s.num ? 'current' : ''}`}
              style={{ cursor: 'pointer' }}
              onClick={() => setStep(s.num)}
            >
              <div className="step-circle">{step > s.num ? '✓' : s.num}</div>
              <div className="step-name">{s.num}. {s.name}</div>
            </div>
            {i < steps.length - 1 && (
              <div className={`stepper-divider ${step > s.num ? 'completed' : ''}`} />
            )}
          </React.Fragment>
        ))}
      </div>

      {/* Step Content */}
      <div className="enterprise-card">
        <div className="card-header">
          <span className="card-title">Step {step}: {steps[step - 1].name}</span>
        </div>
        <div className="card-body">
          {step === 1 && (
            <div className="form-grid">
              <div className="form-group full-width">
                <label className="form-label required">Selected Recommendation / Trigger Source</label>
                <div style={{ background: 'var(--purple-light)', border: '1px solid var(--purple-border)', padding: '12px', borderRadius: '4px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <strong className="font-mono" style={{ color: 'var(--purple-primary)', fontSize: '13px' }}>
                      {rec.id} &bull; {rec.inspectionType}
                    </strong>
                    <span className="badge badge-awaiting">{rec.status}</span>
                  </div>
                  <div style={{ fontSize: '11.5px', color: 'var(--text-secondary)', marginTop: '4px' }}>
                    <strong>Basis:</strong> {rec.regulatoryBasis} &bull; {rec.obligation}
                  </div>
                </div>
              </div>
              <div className="form-group">
                <label className="form-label">Planning Mode</label>
                <select className="form-control">
                  <option>Recommendation-based Planning (Statutory)</option>
                  <option>Request-based Planning (Intake)</option>
                  <option>Manual Authorized Inspection (Direct DGMS Mandate)</option>
                </select>
              </div>
              <div className="form-group">
                <label className="form-label">Authorized Planner</label>
                <input type="text" className="form-control" defaultValue={`${data.meta.currentUser.name} (${data.meta.currentUser.role})`} readOnly style={{ background: '#F8FAFC' }} />
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="form-grid">
              <div className="form-group">
                <label className="form-label required">Holding Company</label>
                <input type="text" className="form-control" defaultValue="Coal India Limited (CIL)" readOnly style={{ background: '#F8FAFC' }} />
              </div>
              <div className="form-group">
                <label className="form-label required">Subsidiary</label>
                <input type="text" className="form-control" defaultValue="Eastern Coalfields Limited (ECL)" readOnly style={{ background: '#F8FAFC' }} />
              </div>
              <div className="form-group">
                <label className="form-label required">Area</label>
                <input type="text" className="form-control" defaultValue="Area 01 (Sripur-Kenda)" readOnly style={{ background: '#F8FAFC' }} />
              </div>
              <div className="form-group">
                <label className="form-label required">Primary Mine Scope</label>
                <select className="form-control">
                  <option>Mine A2 (Deep Underground Seam VII)</option>
                  <option>Mine B1 (Inclined Mine)</option>
                  <option>Mine C4 (Opencast Pit 2)</option>
                </select>
              </div>
              <div className="form-group full-width">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                  <label className="form-label required">Target Underground Sections / Locations</label>
                  <button type="button" className="btn btn-secondary btn-sm" onClick={() => setMultiMine(!multiMine)}>
                    {multiMine ? 'Remove Additional Scope' : '+ Add Inspection Location (Multi-Mine)'}
                  </button>
                </div>
                <input type="text" className="form-control" defaultValue="Intake Shaft 1, Splitting Points 1-6, District 3 & 4 Face, Main Exhaust Fan Drift" />
              </div>
              {multiMine && (
                <div className="form-group full-width" style={{ background: '#FFF3E0', border: '1px solid #FFE0B2', borderLeft: '4px solid #E65100', padding: '10px 14px', borderRadius: '3px' }}>
                  <strong style={{ color: '#B78103', fontSize: '12px' }}>&excl; Multi-Mine Authorization Warning:</strong>
                  <p style={{ fontSize: '11.5px', color: '#5D4037', marginTop: '2px' }}>
                    Multi-mine cross-colliery inspections require written authorization from the Director Technical (ECL) under CMR 2017 governance rules.
                  </p>
                </div>
              )}
            </div>
          )}

          {step === 3 && (
            <div className="form-grid">
              <div className="form-group">
                <label className="form-label required">Governance Authority</label>
                <input type="text" className="form-control" defaultValue="DGMS / CIL Statutory Safety Board" readOnly style={{ background: '#F8FAFC' }} />
              </div>
              <div className="form-group">
                <label className="form-label required">Inspection Track</label>
                <input type="text" className="form-control" defaultValue="Safety & Occupational Health" readOnly style={{ background: '#F8FAFC' }} />
              </div>
              <div className="form-group">
                <label className="form-label required">Inspection Type</label>
                <input type="text" className="form-control" defaultValue="Ventilation & Gas Dynamics Inspection" readOnly style={{ background: '#F8FAFC' }} />
              </div>
              <div className="form-group">
                <label className="form-label required">Estimated Duration</label>
                <input type="text" className="form-control" defaultValue="6 Hours (Full Operational Shift)" />
              </div>
              <div className="form-group full-width">
                <label className="form-label required">Inspection Purpose</label>
                <input type="text" className="form-control" defaultValue="Execute statutory quarterly ventilation network survey, measure air velocity distribution across active coal faces, test static pressure depression at fan drift." />
              </div>
              <div className="form-group full-width">
                <label className="form-label required">Statutory Objective</label>
                <textarea className="form-control" defaultValue="Ensure 100% compliance with CMR 2017 Regulation 153/160, verify adequate air flow in District 4 to prevent methane stagnation, and certify auxiliary ventilation safety in deep seams." />
              </div>
            </div>
          )}

          {step === 4 && (
            <div>
              <TraceabilityChain
                basis={{
                  id: 'OBL-088',
                  regulation: 'Coal Mines Regulations (CMR) 2017',
                  clause: 'Regulation 153(2) & 160',
                  requirement: 'Statutory Quarterly Main Mechanical Ventilation & Airway Velocity Survey',
                  applicability: 'All Degree-II and Degree-III Gassy Underground Coal Mines',
                  obligation: 'Quarterly statutory air quantity & velocity survey across all splits and return airways'
                }}
              />
              <div className="form-group" style={{ marginTop: '14px' }}>
                <label className="form-label required">Select Controlled Checklist Template</label>
                <select className="form-control">
                  <option>DGMS-STD-VENT-04: Comprehensive Underground Gassy Mine Ventilation Protocol (22 Checks)</option>
                  <option>DGMS-STD-STRATA-02: SCAMP Compliance & Hydraulic Support Verification (18 Checks)</option>
                  <option>DGMS-STD-ELEC-01: Flameproof Apparatus & Earth Leakage Checklist (16 Checks)</option>
                </select>
              </div>
            </div>
          )}

          {step === 5 && (
            <div className="form-grid">
              <div className="form-group full-width">
                <label className="form-label required">Lead Inspector Statutory Competency Criteria</label>
                <input type="text" className="form-control" defaultValue="First Class Mine Manager Certificate of Competency (Coal) under CMR 2017" />
              </div>
              <div className="form-group">
                <label className="form-label required">Specialist Competency #1</label>
                <input type="text" className="form-control" defaultValue="DGMS Certified Ventilation Officer" />
              </div>
              <div className="form-group">
                <label className="form-label required">Specialist Competency #2</label>
                <input type="text" className="form-control" defaultValue="Authorized Gas Testing Specialist (CH4 / CO / O2)" />
              </div>
            </div>
          )}

          {step === 6 && (
            <div className="form-grid">
              <div className="form-group">
                <label className="form-label required">Required Instruments & Tools</label>
                <textarea className="form-control" defaultValue="Vane Anemometer (Calibrated NABL), Smoke Tube Kit with Aspirator, Multi-Gas Detector (CH4, CO, CO2, O2), Digital Barometer / Manometer, Velometer" />
              </div>
              <div className="form-group">
                <label className="form-label required">Required Personal Protective Equipment (PPE)</label>
                <textarea className="form-control" defaultValue="Self-Contained Self-Rescuer (SCSR 60-min IS rated), Cap Lamp (Group I Intrinsically Safe), Antistatic Boots (IS 15298), Mining Helmet with Chinstrap" />
              </div>
              <div className="form-group full-width">
                <label className="form-label required">Statutory Documents & Site Records to Verify</label>
                <textarea className="form-control" defaultValue="Mine Ventilation Plan & Airway Network Diagram v4.2, Daily Gas Book Register, Fan Drift Water Gauge Logs (Past 30 Days)" />
              </div>
            </div>
          )}

          {step === 7 && (
            <div>
              <div style={{ background: 'var(--bg-surface-alt)', border: '1px solid var(--border-color)', borderRadius: '4px', padding: '14px', marginBottom: '14px' }}>
                <strong style={{ fontSize: '13px', color: 'var(--text-primary)' }}>Plan Summary: Statutory Q3 Comprehensive Underground Ventilation Audit</strong>
                <div style={{ fontSize: '11.5px', color: 'var(--text-secondary)', marginTop: '4px' }}>
                  Scope: CIL / ECL / Area 01 / Mine A2 (Seam VII) &bull; Track: Safety & Occupational Health &bull; Target Date: 15 Nov 2026
                </div>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '12px', color: 'var(--status-green-text)' }}>
                <div>✓ <strong>Scope defined:</strong> Mine A2 Full Underground Circuit & Fan Drift</div>
                <div>✓ <strong>Inspection type selected:</strong> Ventilation & Gas Dynamics Inspection</div>
                <div>✓ <strong>Regulatory basis mapped:</strong> CMR 2017 Reg 153 & OBL-088</div>
                <div>✓ <strong>Checklist selected:</strong> DGMS-STD-VENT-04 (22 checks)</div>
                <div>✓ <strong>Required competencies defined:</strong> First Class Manager + Ventilation Officer</div>
                <div>✓ <strong>Preparation requirements defined:</strong> NABL Anemometer, Multi-gas meter, SCSR PPE</div>
              </div>
            </div>
          )}

          {step === 8 && (
            <div style={{ textAlign: 'center', padding: '20px 0' }}>
              <div style={{ fontSize: '32px', color: 'var(--status-green-text)', marginBottom: '8px' }}>✓</div>
              <h2 style={{ fontFamily: 'Outfit, sans-serif', fontSize: '18px', fontWeight: 700 }}>Inspection Plan Validation Complete</h2>
              <p style={{ fontSize: '12px', color: 'var(--text-secondary)', maxWidth: '480px', margin: '6px auto 18px auto' }}>
                All statutory governance gates have passed. Ready to generate immutable plan PLAN-2026-0088 for scheduling.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Controls */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '20px', marginBottom: '30px' }}>
        <div>
          {step > 1 ? (
            <button className="btn btn-secondary" onClick={() => setStep(step - 1)}>&larr; Previous Step</button>
          ) : (
            <button className="btn btn-secondary" onClick={() => navigateTo('06')}>Cancel</button>
          )}
        </div>
        <div style={{ display: 'flex', gap: '8px' }}>
          <button className="btn btn-secondary" onClick={handleSaveDraft}>Save Draft</button>
          {step < 8 ? (
            <button className="btn btn-primary" onClick={() => setStep(step + 1)}>Next Step &rarr;</button>
          ) : (
            <button className="btn btn-success" onClick={handleFinalize}>Create Inspection Plan</button>
          )}
        </div>
      </div>

    </div>
  );
};
