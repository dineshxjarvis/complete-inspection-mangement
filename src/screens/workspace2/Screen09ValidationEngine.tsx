"use client";

import React, { useState } from 'react';
import { useAssignment } from '../../context/AssignmentContext';
import {
  ShieldCheck,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  ArrowLeft,
  ArrowRight,
  RefreshCw,
  UserPlus
} from 'lucide-react';

export const Screen09ValidationEngine: React.FC = () => {
  const {
    inspections,
    activeInspectionId,
    stagedLead,
    stagedSpecialists,
    runValidation,
    navigateTo
  } = useAssignment();

  const insp = inspections.find(i => i.id === activeInspectionId) || inspections[0];
  const [isValidating, setIsValidating] = useState(false);

  const validationResult = runValidation(insp.id);

  const handleReRunValidation = () => {
    setIsValidating(true);
    setTimeout(() => {
      setIsValidating(false);
    }, 400);
  };

  return (
    <div className="content-container">
      {/* Breadcrumb */}
      <div className="breadcrumb-bar">
        <span className="crumb-link" onClick={() => navigateTo('01')}>Dashboard</span>
        <span className="breadcrumb-sep">/</span>
        <span className="crumb-link" onClick={() => navigateTo('04', { inspectionId: insp.id })}>Assign Team</span>
        <span className="breadcrumb-sep">/</span>
        <span className="breadcrumb-current">Team Validation Engine</span>
      </div>

      {/* Screen Header */}
      <div className="screen-header-row">
        <div className="screen-header-left">
          <h1 className="screen-title">
            <ShieldCheck size={20} color="var(--purple-primary)" />
            <span>INSPECTION TEAM VALIDATION ENGINE</span>
            <span className="font-mono" style={{ color: 'var(--purple-primary)' }}>{insp.id}</span>
          </h1>
          <p className="screen-subtitle">
            Automated statutory pre-flight validation against Coal Mines Regulations 2017 & DGMS Safety Directives.
          </p>
        </div>
        <div className="screen-actions">
          <button className="btn btn-secondary" onClick={handleReRunValidation} disabled={isValidating}>
            <RefreshCw size={14} className={isValidating ? 'spin' : ''} /> {isValidating ? 'Re-checking...' : 'Re-Run 8 Checks'}
          </button>
          <button className="btn btn-secondary" onClick={() => navigateTo('04', { inspectionId: insp.id })}>
            <ArrowLeft size={14} /> Back to Team Builder
          </button>
        </div>
      </div>

      {/* Final Outcome Banner */}
      {validationResult.allPassed ? (
        <div
          style={{
            background: 'linear-gradient(90deg, #F0FDF4 0%, #DCFCE7 100%)',
            border: '1.5px solid #86EFAC',
            borderRadius: '6px',
            padding: '16px 20px',
            marginBottom: '20px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: '#16A34A', color: '#FFF', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <CheckCircle2 size={22} />
            </div>
            <div>
              <strong style={{ fontSize: '15px', color: '#14532D' }}>
                ✓ TEAM READY FOR STATUTORY ASSIGNMENT
              </strong>
              <div style={{ fontSize: '11.5px', color: '#166534', marginTop: '2px' }}>
                All 8 CMR 2017 competency, authorization, jurisdictional scope, workload, and double-booking criteria satisfied.
              </div>
            </div>
          </div>
          <button
            className="btn btn-primary"
            style={{ background: '#16A34A', borderColor: '#15803D' }}
            onClick={() => navigateTo('10', { inspectionId: insp.id })}
          >
            Confirm Assignment (Screen 10) &rarr;
          </button>
        </div>
      ) : (
        <div
          style={{
            background: 'linear-gradient(90deg, #FEF2F2 0%, #FEE2E2 100%)',
            border: '1.5px solid #FCA5A5',
            borderRadius: '6px',
            padding: '16px 20px',
            marginBottom: '20px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: '#DC2626', color: '#FFF', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <XCircle size={22} />
            </div>
            <div>
              <strong style={{ fontSize: '15px', color: '#7F1D1D' }}>
                ⚠ TEAM CANNOT BE ASSIGNED — COMPLIANCE GAPS DETECTED
              </strong>
              <div style={{ fontSize: '11.5px', color: '#991B1B', marginTop: '2px' }}>
                Statutory criteria failed. Resolve missing mandatory competencies or authorizations before locking assignment.
              </div>
            </div>
          </div>
          <button
            className="btn btn-primary"
            onClick={() => navigateTo('06', { role: 'Lead Inspector' })}
          >
            <UserPlus size={14} /> Resolve Issues (Screen 06)
          </button>
        </div>
      )}

      {/* 8-Point Compliance Checks Table */}
      <div className="enterprise-card" style={{ marginBottom: '20px' }}>
        <div className="card-header">
          <span className="card-title">
            Automated 8-Point Compliance Verification Audit Matrix
          </span>
          <span className="badge badge-planned">
            {validationResult.checks.filter(c => c.severity === 'success').length} / {validationResult.checks.length} Passed
          </span>
        </div>
        <div className="table-responsive">
          <table className="strata-table">
            <thead>
              <tr>
                <th style={{ width: '40px' }}>#</th>
                <th>Validation Check Description</th>
                <th>Result</th>
                <th>Audit Findings & Rule Evaluation Note</th>
                <th>Remediation Action</th>
              </tr>
            </thead>
            <tbody>
              {validationResult.checks.map((chk, idx) => (
                <tr key={chk.id} style={{ background: chk.severity === 'error' ? '#FFF5F5' : '#FFFFFF' }}>
                  <td className="font-mono">{idx + 1}</td>
                  <td>
                    <strong>{chk.label}</strong>
                  </td>
                  <td>
                    {chk.severity === 'success' ? (
                      <span className="badge badge-completed">
                        <CheckCircle2 size={11} style={{ marginRight: '3px' }} /> PASS
                      </span>
                    ) : chk.severity === 'warning' ? (
                      <span className="badge badge-planned">
                        <AlertTriangle size={11} style={{ marginRight: '3px' }} /> ADVISORY
                      </span>
                    ) : (
                      <span className="badge badge-rejected">
                        <XCircle size={11} style={{ marginRight: '3px' }} /> FAIL
                      </span>
                    )}
                  </td>
                  <td style={{ fontSize: '11.5px', color: chk.severity === 'error' ? 'var(--status-red-text)' : 'var(--text-primary)' }}>
                    {chk.detail}
                  </td>
                  <td>
                    {chk.actionNeeded ? (
                      <button
                        className="btn btn-secondary btn-sm"
                        style={{ color: 'var(--purple-primary)' }}
                        onClick={() => navigateTo('06', { role: 'Lead Inspector' })}
                      >
                        {chk.actionNeeded}
                      </button>
                    ) : (
                      <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>&mdash;</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Bottom Sticky Action Bar */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#FFFFFF', border: '1px solid var(--border-color)', padding: '14px 20px', borderRadius: '4px', marginBottom: '30px' }}>
        <button className="btn btn-secondary" onClick={() => navigateTo('04', { inspectionId: insp.id })}>
          <ArrowLeft size={14} /> Back to Team Builder
        </button>

        <div style={{ display: 'flex', gap: '10px' }}>
          <button className="btn btn-secondary" onClick={() => navigateTo('06', { role: 'Specialist' })}>
            <UserPlus size={14} /> Add / Replace Specialist
          </button>
          <button
            className="btn btn-primary"
            disabled={!validationResult.allPassed}
            onClick={() => navigateTo('10', { inspectionId: insp.id })}
          >
            Proceed to Assignment Confirmation &rarr;
          </button>
        </div>
      </div>

    </div>
  );
};
