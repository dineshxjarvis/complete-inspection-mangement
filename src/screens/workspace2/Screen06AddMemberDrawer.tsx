"use client";

import React, { useState } from 'react';
import { useAssignment } from '../../context/AssignmentContext';
import {
  UserPlus,
  Search,
  Filter,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Info,
  Shield,
  ArrowLeft
} from 'lucide-react';

export const Screen06AddMemberDrawer: React.FC = () => {
  const {
    personnelList,
    inspections,
    activeInspectionId,
    screenParams,
    setLeadInspector,
    addSupportingInspector,
    addSpecialist,
    checkEligibility,
    navigateTo,
    setSelectedPersonnelId
  } = useAssignment();

  const insp = inspections.find(i => i.id === activeInspectionId) || inspections[0];

  const [selectedRole, setSelectedRole] = useState<string>(screenParams.role || 'Safety Specialist');
  const [searchTerm, setSearchTerm] = useState('');
  const [scopeFilter, setScopeFilter] = useState('All');
  const [availFilter, setAvailFilter] = useState('All');

  const roleOptions = [
    { role: 'Lead Inspector', reqComp: 'Safety / Ventilation', mandatory: true, desc: 'First Class Manager with statutory execution authorization' },
    { role: 'Supporting Inspector', reqComp: 'Safety / Sampling', mandatory: false, desc: 'Assists with measurement surveys and traverse checks' },
    { role: 'Safety Specialist', reqComp: 'Ventilation & Gas Dynamics', mandatory: true, desc: 'Atmospheric hazard analysis & sensor calibration' },
    { role: 'Electrical Specialist', reqComp: 'Flameproof (FLP) & HV Safety', mandatory: false, desc: 'Electrical safety, FLP enclosures, and earth protection' },
    { role: 'Mechanical Specialist', reqComp: 'Main Ventilation Fans & Machinery', mandatory: false, desc: 'Audit of mechanical fan drifts, haulage, and machinery' },
    { role: 'Environmental Specialist', reqComp: 'Dust Sampling & Emissions', mandatory: false, desc: 'Airborne dust concentration and environment monitoring' },
    { role: 'Strata Control Specialist', reqComp: 'Rock Mechanics & SCAMP', mandatory: false, desc: 'Hydraulic roof bolt pull tests and telltale inspection' }
  ];

  const currentRoleInfo = roleOptions.find(r => r.role === selectedRole) || roleOptions[0];

  // Filter Personnel
  let filtered = personnelList;
  if (searchTerm.trim()) {
    const q = searchTerm.toLowerCase();
    filtered = filtered.filter(p =>
      p.name.toLowerCase().includes(q) ||
      p.systemRole.toLowerCase().includes(q) ||
      p.competencies.some(c => c.toLowerCase().includes(q))
    );
  }
  if (scopeFilter !== 'All') {
    filtered = filtered.filter(p => p.scope.area.includes(scopeFilter));
  }
  if (availFilter !== 'All') {
    filtered = filtered.filter(p => p.availability.status === availFilter);
  }

  const handleSelectPerson = (person: any, eligibility: any) => {
    if (!eligibility.isEligible) return;

    if (selectedRole === 'Lead Inspector') {
      setLeadInspector(person);
    } else if (selectedRole === 'Supporting Inspector') {
      addSupportingInspector(person);
    } else {
      addSpecialist(person, selectedRole);
    }

    navigateTo('04', { inspectionId: insp.id });
  };

  return (
    <div className="content-container">
      {/* Breadcrumb */}
      <div className="breadcrumb-bar">
        <span className="crumb-link" onClick={() => navigateTo('01')}>Dashboard</span>
        <span className="breadcrumb-sep">/</span>
        <span className="crumb-link" onClick={() => navigateTo('04', { inspectionId: insp.id })}>Assign Team</span>
        <span className="breadcrumb-sep">/</span>
        <span className="breadcrumb-current">Candidate Selection Engine</span>
      </div>

      {/* Screen Header */}
      <div className="screen-header-row">
        <div className="screen-header-left">
          <h1 className="screen-title">
            <UserPlus size={20} color="var(--purple-primary)" />
            <span>Add Team Member &bull; Candidate Selection Engine</span>
          </h1>
          <p className="screen-subtitle">
            Evaluating candidates against CMR 2017 statutory requirements for <strong>{insp.id}</strong> ({insp.mine}).
          </p>
        </div>
        <div className="screen-actions">
          <button className="btn btn-secondary" onClick={() => navigateTo('04', { inspectionId: insp.id })}>
            <ArrowLeft size={14} /> Back to Team Builder
          </button>
        </div>
      </div>

      {/* Role Selection Bar */}
      <div className="enterprise-card" style={{ marginBottom: '16px' }}>
        <div className="card-header">
          <span className="card-title">1. Select Target Inspection Role</span>
        </div>
        <div className="card-body">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '8px' }}>
            {roleOptions.map((opt) => (
              <div
                key={opt.role}
                onClick={() => setSelectedRole(opt.role)}
                style={{
                  padding: '10px 12px',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  border: selectedRole === opt.role ? '2px solid var(--purple-primary)' : '1px solid var(--border-color)',
                  background: selectedRole === opt.role ? '#FAF8FF' : '#FFFFFF',
                  transition: 'all 0.15s ease'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                  <strong style={{ fontSize: '12px', color: selectedRole === opt.role ? 'var(--purple-primary)' : 'var(--text-primary)' }}>
                    {opt.role}
                  </strong>
                  {opt.mandatory && <span className="badge badge-critical" style={{ fontSize: '8.5px' }}>Mandatory</span>}
                </div>
                <div style={{ fontSize: '10px', color: 'var(--text-secondary)' }}>{opt.desc}</div>
              </div>
            ))}
          </div>

          {/* Dynamic Required Competency Display */}
          <div style={{ marginTop: '12px', padding: '10px 14px', background: '#F0FDF4', border: '1px solid #BBF7D0', borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Shield size={16} color="#15803D" />
              <span style={{ fontSize: '12px', color: '#14532D' }}>
                Mandatory Competency Profile for <strong>{currentRoleInfo.role}</strong>: <strong>{currentRoleInfo.reqComp}</strong>
              </span>
            </div>
            <span className="badge badge-completed" style={{ background: '#DCFCE7', color: '#15803D' }}>CMR 2017 Enforced</span>
          </div>
        </div>
      </div>

      {/* Multi-Dimensional Filter Bar */}
      <div className="filter-bar" style={{ marginBottom: '16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flex: 1 }}>
          <Search size={14} color="var(--text-muted)" />
          <input
            type="text"
            className="filter-input"
            placeholder="Filter by inspector name, qualification, competency..."
            style={{ width: '100%' }}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <select className="filter-select" value={scopeFilter} onChange={(e) => setScopeFilter(e.target.value)}>
          <option value="All">Scope: All Areas</option>
          <option value="Area 01">Area 01 (Sripur-Kenda Only)</option>
          <option value="Area 02">Area 02 (Salanpur)</option>
        </select>
        <select className="filter-select" value={availFilter} onChange={(e) => setAvailFilter(e.target.value)}>
          <option value="All">Availability: All</option>
          <option value="Available">Available Only</option>
          <option value="Assigned">Assigned</option>
          <option value="Unavailable">Unavailable</option>
        </select>
        <button className="btn btn-secondary btn-sm" onClick={() => { setSearchTerm(''); setScopeFilter('All'); setAvailFilter('All'); }}>
          Reset
        </button>
      </div>

      {/* Candidate Evaluation Table */}
      <div className="enterprise-card" style={{ marginBottom: '24px' }}>
        <div className="card-header">
          <span className="card-title">
            2. Candidate Roster & Eligibility Results ({filtered.length} Evaluated)
          </span>
          <span style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>
            Strict Separation: System Role &ne; Inspection Role
          </span>
        </div>
        <div className="table-responsive">
          <table className="strata-table">
            <thead>
              <tr>
                <th>Person Name</th>
                <th>System Role</th>
                <th>Competencies</th>
                <th>CMR Authorization</th>
                <th>Scope</th>
                <th>Availability</th>
                <th>Active Workload</th>
                <th>Eligibility Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((person) => {
                const eligibility = checkEligibility(person, selectedRole, insp);

                return (
                  <tr key={person.id} style={{ background: !eligibility.isEligible ? '#FFFDFD' : '#FFFFFF' }}>
                    <td>
                      <div
                        style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}
                        onClick={() => {
                          setSelectedPersonnelId(person.id);
                          navigateTo('07', { personnelId: person.id });
                        }}
                      >
                        <div style={{ width: '28px', height: '28px', borderRadius: '3px', background: 'var(--bg-nav-surface)', color: '#FFF', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '11px', fontWeight: 700 }}>
                          {person.avatar}
                        </div>
                        <div>
                          <strong style={{ color: 'var(--purple-primary)' }}>{person.name}</strong>
                          <div style={{ fontSize: '10px', color: 'var(--text-secondary)' }}>{person.designation}</div>
                        </div>
                      </div>
                    </td>
                    <td>{person.systemRole}</td>
                    <td>
                      <span style={{ fontSize: '11px' }}>{person.competencies.join(', ')}</span>
                    </td>
                    <td>
                      <span className="badge badge-draft" style={{ fontSize: '10px' }}>
                        {person.authorizations[0] || 'Standard'}
                      </span>
                    </td>
                    <td className="font-mono" style={{ fontSize: '11px' }}>{person.scope.area.split('(')[0]}</td>
                    <td>
                      <span
                        className={`badge ${
                          person.availability.status === 'Available'
                            ? 'badge-completed'
                            : person.availability.status === 'Assigned'
                            ? 'badge-planned'
                            : 'badge-rejected'
                        }`}
                      >
                        <span className="badge-dot" />{person.availability.status}
                      </span>
                    </td>
                    <td className="font-mono" style={{ textAlign: 'center' }}>
                      <strong>{person.workload.activeInspections}</strong> / 4 max
                    </td>
                    <td>
                      {eligibility.isEligible ? (
                        <span className="badge badge-completed">
                          <CheckCircle2 size={11} style={{ marginRight: '3px' }} /> ELIGIBLE
                        </span>
                      ) : (
                        <div>
                          <span className="badge badge-rejected">
                            <XCircle size={11} style={{ marginRight: '3px' }} /> NOT ELIGIBLE
                          </span>
                          <div style={{ fontSize: '10px', color: 'var(--status-red-text)', marginTop: '2px', maxWidth: '180px' }}>
                            {eligibility.reason}
                          </div>
                        </div>
                      )}
                    </td>
                    <td>
                      <div style={{ display: 'flex', gap: '4px' }}>
                        <button
                          type="button"
                          className="btn btn-secondary btn-sm"
                          onClick={() => {
                            setSelectedPersonnelId(person.id);
                            navigateTo('07', { personnelId: person.id });
                          }}
                        >
                          Profile
                        </button>
                        <button
                          type="button"
                          className={`btn btn-sm ${eligibility.isEligible ? 'btn-primary' : 'btn-secondary'}`}
                          disabled={!eligibility.isEligible}
                          onClick={() => handleSelectPerson(person, eligibility)}
                        >
                          Select
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};
