"use client";

import React, { useState } from 'react';
import { useAssignment } from '../../context/AssignmentContext';
import {
  RotateCcw,
  UserCheck,
  Shield,
  AlertTriangle,
  ArrowLeft,
  CheckCircle2,
  XCircle,
  HelpCircle
} from 'lucide-react';

export const Screen13ReassignPersonnel: React.FC = () => {
  const {
    inspections,
    activeInspectionId,
    personnelList,
    reassignPersonnel,
    checkEligibility,
    navigateTo
  } = useAssignment();

  const insp = inspections.find(i => i.id === activeInspectionId) || inspections[0];

  const [reassignOption, setReassignOption] = useState<string>('Replace Lead Inspector');
  const [selectedPersonId, setSelectedPersonId] = useState<string>('PER-0905'); // A. Kumar
  const [reassignReason, setReassignReason] = useState<string>('Original Lead Inspector assigned to emergency DGMS enquiry at Regional HQ.');

  const currentLeadName = insp.assignedTeam.leadInspector?.name || 'R. Sharma';
  const targetPerson = personnelList.find(p => p.id === selectedPersonId) || personnelList[4];

  const eligibility = checkEligibility(targetPerson, 'Lead Inspector', insp);

  const handleConfirmReassign = () => {
    if (!reassignReason.trim() || !eligibility.isEligible) return;
    reassignPersonnel(insp.id, currentLeadName, targetPerson, 'Lead Inspector', reassignReason);
  };

  return (
    <div className="content-container">
      {/* Breadcrumb */}
      <div className="breadcrumb-bar">
        <span className="crumb-link" onClick={() => navigateTo('01')}>Dashboard</span>
        <span className="breadcrumb-sep">/</span>
        <span className="crumb-link" onClick={() => navigateTo('05', { inspectionId: insp.id })}>Team Detail</span>
        <span className="breadcrumb-sep">/</span>
        <span className="breadcrumb-current">Reassign Inspection Personnel</span>
      </div>

      {/* Screen Header */}
      <div className="screen-header-row">
        <div className="screen-header-left">
          <h1 className="screen-title">
            <RotateCcw size={20} color="var(--status-orange-text)" />
            <span>REASSIGN INSPECTION PERSONNEL</span>
            <span className="font-mono" style={{ color: 'var(--purple-primary)' }}>{insp.id}</span>
          </h1>
          <p className="screen-subtitle">
            Formal substitution workflow requiring statutory justification and automated eligibility validation under CMR 2017.
          </p>
        </div>
      </div>

      <div style={{ maxWidth: '820px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '16px' }}>
        
        {/* Step 1: Current Assigned Position */}
        <div className="enterprise-card" style={{ marginBottom: 0 }}>
          <div className="card-header">
            <span className="card-title">1. Current Team Allocation & Substitution Target</span>
          </div>
          <div className="card-body">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px', background: '#F8FAFC', borderRadius: '4px', border: '1px solid var(--border-light)' }}>
              <div>
                <span style={{ fontSize: '10px', color: 'var(--text-muted)', fontWeight: 700 }}>CURRENT LEAD INSPECTOR</span>
                <div style={{ fontSize: '14px', fontWeight: 700, marginTop: '2px' }}>{currentLeadName}</div>
                <div style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>Status: Active Assignment &bull; CMR 2017 Authorized</div>
              </div>
              <span className="badge badge-planned">Reassignment In Progress</span>
            </div>

            {/* Reassignment Target Options */}
            <div style={{ marginTop: '14px' }}>
              <span style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text-secondary)', display: 'block', marginBottom: '6px' }}>
                Select Modification Type:
              </span>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '8px' }}>
                {['Replace Lead Inspector', 'Add Replacement Specialist', 'Replace Attached Specialist', 'Add Supporting Inspector'].map((opt) => (
                  <div
                    key={opt}
                    onClick={() => setReassignOption(opt)}
                    style={{
                      padding: '8px 12px',
                      borderRadius: '4px',
                      cursor: 'pointer',
                      border: reassignOption === opt ? '2px solid var(--purple-primary)' : '1px solid var(--border-color)',
                      background: reassignOption === opt ? '#FAF8FF' : '#FFFFFF',
                      fontSize: '11.5px',
                      fontWeight: reassignOption === opt ? 700 : 500
                    }}
                  >
                    {opt}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Step 2: Select Replacement Candidate */}
        <div className="enterprise-card" style={{ marginBottom: 0 }}>
          <div className="card-header">
            <span className="card-title">2. Select Qualified Replacement Candidate</span>
            <span className="badge badge-completed">Eligibility Engine Active</span>
          </div>
          <div className="card-body">
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '14px' }}>
              {personnelList.filter(p => p.name !== currentLeadName).map((person) => {
                const isSelected = person.id === selectedPersonId;
                const elig = checkEligibility(person, 'Lead Inspector', insp);

                return (
                  <div
                    key={person.id}
                    onClick={() => setSelectedPersonId(person.id)}
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      padding: '10px 14px',
                      borderRadius: '4px',
                      cursor: 'pointer',
                      border: isSelected ? '2px solid var(--purple-primary)' : '1px solid var(--border-color)',
                      background: isSelected ? '#FAF8FF' : '#FFFFFF'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <div style={{ width: '32px', height: '32px', borderRadius: '4px', background: 'var(--bg-nav-surface)', color: '#FFF', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: '11px' }}>
                        {person.avatar}
                      </div>
                      <div>
                        <strong>{person.name}</strong>
                        <div style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>
                          {person.designation} &bull; System Role: {person.systemRole}
                        </div>
                      </div>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <div style={{ textAlign: 'right', fontSize: '11px' }}>
                        <div>{person.scope.area.split('(')[0]}</div>
                        <span className="badge badge-completed" style={{ fontSize: '9.5px' }}>{person.availability.status}</span>
                      </div>
                      {elig.isEligible ? (
                        <span className="badge badge-completed"><CheckCircle2 size={10} /> Eligible</span>
                      ) : (
                        <span className="badge badge-rejected"><XCircle size={10} /> Ineligible</span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Candidate Verification Callout */}
            <div style={{ padding: '10px 14px', background: '#F8FAFC', borderRadius: '4px', border: '1px solid var(--border-light)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '11.5px' }}>
              <div>
                <strong>Selected Replacement:</strong> {targetPerson.name} ({targetPerson.designation})
                <div style={{ fontSize: '10.5px', color: 'var(--text-secondary)', marginTop: '2px' }}>
                  Competencies: {targetPerson.competencies.join(', ')} &bull; Scope: {targetPerson.scope.area}
                </div>
              </div>
              <span className={`badge ${eligibility.isEligible ? 'badge-completed' : 'badge-rejected'}`}>
                {eligibility.isEligible ? 'Passed Pre-Flight Checks' : 'Ineligible: ' + eligibility.reason}
              </span>
            </div>
          </div>
        </div>

        {/* Step 3: Mandatory Statutory Reason */}
        <div className="enterprise-card" style={{ marginBottom: 0 }}>
          <div className="card-header">
            <span className="card-title">3. Mandatory Reassignment Justification (Recorded in Audit Ledger)</span>
          </div>
          <div className="card-body">
            <textarea
              className="filter-input"
              style={{ width: '100%', height: '80px', fontSize: '11.5px', resize: 'vertical' }}
              value={reassignReason}
              onChange={(e) => setReassignReason(e.target.value)}
              placeholder="Enter statutory reason for personnel replacement (e.g. medical leave, operational clash, emergency enquiry)..."
            />
            <div style={{ fontSize: '10.5px', color: 'var(--text-muted)', marginTop: '4px' }}>
              This justification will be permanently affixed to the inspection change event.
            </div>
          </div>
        </div>

        {/* Bottom Actions */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#FFFFFF', border: '1px solid var(--border-color)', padding: '14px 20px', borderRadius: '4px', marginBottom: '30px' }}>
          <button className="btn btn-secondary" onClick={() => navigateTo('05', { inspectionId: insp.id })}>
            <ArrowLeft size={14} /> Cancel
          </button>

          <div style={{ display: 'flex', gap: '10px' }}>
            <button className="btn btn-secondary" onClick={() => navigateTo('09', { inspectionId: insp.id })}>
              <Shield size={14} /> Validate Replacement
            </button>
            <button
              className="btn btn-primary"
              disabled={!eligibility.isEligible || !reassignReason.trim()}
              onClick={handleConfirmReassign}
            >
              Confirm Reassignment &rarr;
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
