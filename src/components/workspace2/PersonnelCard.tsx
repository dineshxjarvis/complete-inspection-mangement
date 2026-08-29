import React from 'react';
import { InspectorPersonnel } from '../../types/assignment';

interface PersonnelCardProps {
  person: InspectorPersonnel;
  suggestedRole?: string;
  onSelect?: () => void;
  onViewProfile?: () => void;
  isSelected?: boolean;
  isEligible?: boolean;
  ineligibilityReason?: string;
  showSelectButton?: boolean;
}

export const PersonnelCard: React.FC<PersonnelCardProps> = ({
  person,
  suggestedRole,
  onSelect,
  onViewProfile,
  isSelected,
  isEligible = true,
  ineligibilityReason,
  showSelectButton = true
}) => {
  return (
    <div
      style={{
        background: isSelected ? 'var(--purple-light)' : '#FFFFFF',
        border: isSelected ? '1.5px solid var(--purple-primary)' : '1px solid var(--border-color)',
        borderRadius: '4px',
        padding: '14px',
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
        opacity: !isEligible ? 0.75 : 1,
        transition: 'all 0.15s ease'
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
          <div
            style={{
              width: '34px',
              height: '34px',
              borderRadius: '4px',
              backgroundColor: 'var(--bg-nav-surface)',
              color: '#FFF',
              fontWeight: 700,
              fontSize: '13px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: '1px solid var(--nav-border)'
            }}
          >
            {person.avatar}
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <strong style={{ fontSize: '13px', color: 'var(--text-primary)' }}>{person.name}</strong>
              {!isEligible && (
                <span className="badge badge-rejected" style={{ fontSize: '9.5px' }}>NOT ELIGIBLE</span>
              )}
            </div>
            <div style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>{person.designation}</div>
          </div>
        </div>

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
      </div>

      {/* Strict Role Separation Banner */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '8px',
          background: 'var(--bg-surface-alt)',
          border: '1px solid var(--border-light)',
          padding: '8px 10px',
          borderRadius: '3px',
          fontSize: '11px'
        }}
      >
        <div>
          <div style={{ fontSize: '9.5px', color: 'var(--text-muted)', fontWeight: 700, textTransform: 'uppercase' }}>
            SYSTEM ROLE
          </div>
          <strong style={{ color: 'var(--text-primary)' }}>{person.systemRole}</strong>
        </div>
        <div>
          <div style={{ fontSize: '9.5px', color: 'var(--purple-primary)', fontWeight: 700, textTransform: 'uppercase' }}>
            INSPECTION ROLE
          </div>
          <strong style={{ color: 'var(--purple-primary)' }}>{suggestedRole || person.currentInspectionRole || 'Not Assigned'}</strong>
        </div>
      </div>

      {/* Competencies & Authorizations */}
      <div style={{ fontSize: '11px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
        <div>
          <span style={{ color: 'var(--text-muted)', fontWeight: 600 }}>Competency: </span>
          <span>{person.competencies.join(', ')}</span>
        </div>
        <div>
          <span style={{ color: 'var(--text-muted)', fontWeight: 600 }}>Scope: </span>
          <span className="font-mono" style={{ fontSize: '10.5px' }}>{person.scope.area}</span>
        </div>
        <div>
          <span style={{ color: 'var(--text-muted)', fontWeight: 600 }}>Workload: </span>
          <span>{person.workload.activeInspections} active &bull; {person.workload.upcomingInspections} upcoming</span>
        </div>
      </div>

      {!isEligible && ineligibilityReason && (
        <div style={{ fontSize: '10.5px', color: 'var(--status-red-text)', background: 'var(--status-red-bg)', padding: '4px 8px', borderRadius: '3px' }}>
          &excl; {ineligibilityReason}
        </div>
      )}

      {/* Action Footer */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '4px', paddingTop: '8px', borderTop: '1px solid var(--border-light)' }}>
        {onViewProfile && (
          <button
            type="button"
            className="btn btn-secondary btn-sm"
            onClick={onViewProfile}
          >
            View Profile
          </button>
        )}
        {showSelectButton && onSelect && (
          <button
            type="button"
            className={`btn btn-sm ${isSelected ? 'btn-success' : 'btn-primary'}`}
            disabled={!isEligible}
            onClick={onSelect}
          >
            {isSelected ? '✓ Selected' : 'Select for Inspection'}
          </button>
        )}
      </div>
    </div>
  );
};
