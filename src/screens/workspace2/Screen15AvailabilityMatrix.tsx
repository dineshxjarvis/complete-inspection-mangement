"use client";

import React, { useState } from 'react';
import { useAssignment } from '../../context/AssignmentContext';
import {
  Calendar,
  Search,
  Filter,
  Clock,
  UserCheck,
  AlertTriangle,
  ChevronLeft,
  ChevronRight,
  Info,
  CheckCircle2
} from 'lucide-react';

export const Screen15AvailabilityMatrix: React.FC = () => {
  const { personnelList, navigateTo, setSelectedPersonnelId } = useAssignment();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDate, setSelectedDate] = useState('15 Nov 2026');

  const timeSlots = ['08:00 - 10:00', '10:00 - 12:00', '12:00 - 14:00', '14:00 - 16:00', '16:00 - 18:00'];

  let filtered = personnelList;
  if (searchTerm.trim()) {
    const q = searchTerm.toLowerCase();
    filtered = filtered.filter(p =>
      p.name.toLowerCase().includes(q) ||
      p.competencies.some(c => c.toLowerCase().includes(q)) ||
      p.systemRole.toLowerCase().includes(q)
    );
  }

  return (
    <div className="content-container">
      {/* Breadcrumb */}
      <div className="breadcrumb-bar">
        <span className="crumb-link" onClick={() => navigateTo('01')}>Dashboard</span>
        <span className="breadcrumb-sep">/</span>
        <span className="breadcrumb-current">Inspector Availability Matrix</span>
      </div>

      {/* Screen Header */}
      <div className="screen-header-row">
        <div className="screen-header-left">
          <h1 className="screen-title">
            <Calendar size={20} color="var(--purple-primary)" />
            <span>Inspector & Specialist Availability Schedule</span>
          </h1>
          <p className="screen-subtitle">
            Multi-personnel timeline matrix for shift allocation, double-booking prevention, and workload tracking under CMR 2017.
          </p>
        </div>
        <div className="screen-actions">
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', background: '#FFF', border: '1px solid var(--border-color)', borderRadius: '4px', padding: '4px 8px' }}>
            <button className="btn btn-secondary btn-sm" style={{ padding: '2px 6px' }}><ChevronLeft size={14} /></button>
            <strong style={{ fontSize: '12px', minWidth: '100px', textAlign: 'center' }}>{selectedDate}</strong>
            <button className="btn btn-secondary btn-sm" style={{ padding: '2px 6px' }}><ChevronRight size={14} /></button>
          </div>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="filter-bar" style={{ marginBottom: '16px' }}>
        <input
          type="text"
          className="filter-input"
          placeholder="Filter by inspector name, competency, system role..."
          style={{ minWidth: '240px' }}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select className="filter-select"><option>Area: Area 01 (Sripur-Kenda)</option><option>Area 02 (Salanpur)</option></select>
        <select className="filter-select"><option>Competency: All Competencies</option><option>Ventilation & Gas</option><option>Electrical FLP</option><option>Strata Control</option></select>
        <select className="filter-select"><option>Shift: All Shifts</option><option>Morning Shift A</option><option>Afternoon Shift B</option></select>
        <button className="btn btn-secondary btn-sm" onClick={() => setSearchTerm('')}>Reset</button>
      </div>

      {/* Matrix Table */}
      <div className="enterprise-card">
        <div className="card-header">
          <span className="card-title">
            Personnel Shift Schedule & Workload Grid ({filtered.length} Inspectors)
          </span>
          <div style={{ display: 'flex', gap: '12px', fontSize: '11px' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <span style={{ width: '10px', height: '10px', background: '#DCFCE7', border: '1px solid #86EFAC', borderRadius: '2px' }} /> Available
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <span style={{ width: '10px', height: '10px', background: '#FEF3C7', border: '1px solid #FCD34D', borderRadius: '2px' }} /> Assigned
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <span style={{ width: '10px', height: '10px', background: '#FEE2E2', border: '1px solid #FCA5A5', borderRadius: '2px' }} /> Conflict / Scope Restriction
            </span>
          </div>
        </div>
        <div className="table-responsive">
          <table className="strata-table">
            <thead>
              <tr>
                <th style={{ width: '220px' }}>Inspector & Role</th>
                <th style={{ width: '110px' }}>Workload</th>
                {timeSlots.map((slot, i) => (
                  <th key={i} style={{ textAlign: 'center' }}>{slot}</th>
                ))}
                <th style={{ width: '90px' }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((person) => {
                const hasConflict = person.conflicts && person.conflicts.length > 0;
                const isAssigned = person.availability.status === 'Assigned';
                const isUnavailable = person.availability.status === 'Unavailable';

                return (
                  <tr key={person.id}>
                    <td>
                      <div
                        style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}
                        onClick={() => {
                          setSelectedPersonnelId(person.id);
                          navigateTo('07', { personnelId: person.id });
                        }}
                      >
                        <div style={{ width: '30px', height: '30px', borderRadius: '3px', background: 'var(--bg-nav-surface)', color: '#FFF', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '11px', fontWeight: 700 }}>
                          {person.avatar}
                        </div>
                        <div>
                          <strong style={{ color: 'var(--purple-primary)' }}>{person.name}</strong>
                          <div style={{ fontSize: '10.5px', color: 'var(--text-secondary)' }}>
                            {person.systemRole} &bull; {person.competencies[0]}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td>
                      <div style={{ fontSize: '11px' }}>
                        <strong>{person.workload.activeInspections}</strong> active
                        <div style={{ fontSize: '10px', color: 'var(--text-muted)' }}>{person.workload.upcomingInspections} upcoming</div>
                      </div>
                    </td>

                    {/* Time Slot Columns */}
                    {timeSlots.map((slot, sIdx) => {
                      if (hasConflict) {
                        return (
                          <td key={sIdx} style={{ background: '#FFF5F5', textAlign: 'center', fontSize: '10.5px', color: '#C62828', padding: '6px' }}>
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '2px' }}>
                              <AlertTriangle size={10} /> Scope Restrict.
                            </div>
                          </td>
                        );
                      }
                      if (isAssigned && (sIdx === 1 || sIdx === 2)) {
                        return (
                          <td key={sIdx} style={{ background: '#FEF3C7', textAlign: 'center', fontSize: '10.5px', color: '#92400E', padding: '6px' }}>
                            <span style={{ fontWeight: 600 }}>INS-0870</span> (Mine A2)
                          </td>
                        );
                      }
                      if (isUnavailable) {
                        return (
                          <td key={sIdx} style={{ background: '#F1F5F9', textAlign: 'center', fontSize: '10.5px', color: 'var(--text-muted)', padding: '6px' }}>
                            Off Duty
                          </td>
                        );
                      }
                      return (
                        <td
                          key={sIdx}
                          style={{ background: '#F0FDF4', textAlign: 'center', fontSize: '10.5px', color: '#166534', cursor: 'pointer' }}
                          onClick={() => navigateTo('06', { role: person.currentInspectionRole || 'Specialist' })}
                          title="Click slot to assign in team builder"
                        >
                          <span style={{ fontWeight: 600 }}>Available</span>
                        </td>
                      );
                    })}

                    <td>
                      <button
                        className="btn btn-secondary btn-sm"
                        onClick={() => {
                          setSelectedPersonnelId(person.id);
                          navigateTo('07', { personnelId: person.id });
                        }}
                      >
                        Profile
                      </button>
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
