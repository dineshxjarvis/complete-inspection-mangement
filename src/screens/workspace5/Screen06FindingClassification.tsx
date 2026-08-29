"use client";

import React, { useState } from 'react';
import { useRegulatoryAction } from '../../context/RegulatoryActionContext';
import { FindingType, FindingSeverity } from '../../types/regulatoryAction';
import {
  Scale,
  AlertTriangle,
  Flame,
  Shield,
  Clock,
  CheckCircle,
  HelpCircle,
  ChevronLeft,
  ArrowRight,
  GitPullRequest,
  Lock
} from 'lucide-react';

export const Screen06FindingClassification: React.FC = () => {
  const {
    activeFinding,
    classifyFinding,
    navigateTo,
    showToast
  } = useRegulatoryAction();

  const [selectedType, setSelectedType] = useState<FindingType>(activeFinding.findingType);
  const [selectedSeverity, setSelectedSeverity] = useState<FindingSeverity>(activeFinding.severity);
  const [selectedRisks, setSelectedRisks] = useState<string[]>(['Safety', 'Regulatory', 'Operational']);
  const [recurrencePattern, setRecurrencePattern] = useState<'New' | 'Repeat' | 'Recurring Pattern'>(activeFinding.recurrence.patternType);

  const findingTypes: FindingType[] = [
    'Safety Non-Compliance',
    'Environmental Non-Compliance',
    'Operational Non-Compliance',
    'Documentation Non-Compliance',
    'Regulatory Violation',
    'Other'
  ];

  const severities: FindingSeverity[] = ['LOW', 'MEDIUM', 'HIGH', 'CRITICAL'];
  const riskCategories = ['Safety', 'Environmental', 'Operational', 'Regulatory', 'Financial', 'Reputational'];

  const handleRiskToggle = (risk: string) => {
    if (selectedRisks.includes(risk)) {
      setSelectedRisks(selectedRisks.filter(r => r !== risk));
    } else {
      setSelectedRisks([...selectedRisks, risk]);
    }
  };

  const handleSaveClassification = () => {
    classifyFinding(activeFinding.id, {
      findingType: selectedType,
      severity: selectedSeverity,
      recurrence: {
        ...activeFinding.recurrence,
        patternType: recurrencePattern
      }
    });
  };

  return (
    <div className="screen-content">
      {/* Screen Header */}
      <div className="screen-header">
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
            <button
              className="btn btn-secondary btn-sm"
              onClick={() => navigateTo('04')}
              style={{ padding: '3px 8px' }}
            >
              <ChevronLeft size={13} />
              <span>Back to Finding ({activeFinding.id})</span>
            </button>
            <span
              className="id-badge font-mono"
              style={{
                fontSize: '12px',
                fontWeight: 700,
                background: 'rgba(63, 81, 181, 0.15)',
                color: '#1A237E'
              }}
            >
              FINDING CLASSIFICATION & RISK MATRIX
            </span>
          </div>
          <h1 className="screen-title" style={{ margin: 0 }}>
            STATUTORY CLASSIFICATION & RECURRENCE SCORING
          </h1>
          <p className="screen-subtitle">
            Assess finding dimensions, multi-vector risk impact, historical recurrence, and validate AI system recommendations
          </p>
        </div>

        <div style={{ display: 'flex', gap: '8px' }}>
          <button
            className="btn btn-secondary btn-sm"
            onClick={() => navigateTo('07')}
          >
            <GitPullRequest size={13} />
            <span>Similar Findings (Screen 07)</span>
          </button>
          <button
            className="btn btn-primary btn-sm"
            onClick={handleSaveClassification}
            style={{ background: '#1A237E', borderColor: '#303F9F' }}
          >
            <span>Save Classification & Update Audit</span>
          </button>
        </div>
      </div>

      {/* Main Form Layout */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: '20px', marginBottom: '30px' }}>
        {/* Left Column: Classification Controls */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {/* SECTION: FINDING TYPE */}
          <div className="card" style={{ padding: '18px' }}>
            <h3 style={{ margin: '0 0 12px', fontSize: '13px', fontWeight: 800, textTransform: 'uppercase', color: 'var(--text-primary)' }}>
              1. Statutory Finding Type
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '10px' }}>
              {findingTypes.map(type => (
                <button
                  key={type}
                  type="button"
                  onClick={() => setSelectedType(type)}
                  style={{
                    padding: '10px 12px',
                    borderRadius: '6px',
                    border: `1.5px solid ${selectedType === type ? '#1A237E' : 'var(--border-color)'}`,
                    background: selectedType === type ? '#E8EAF6' : 'var(--bg-surface-alt)',
                    color: selectedType === type ? '#1A237E' : 'var(--text-primary)',
                    fontWeight: selectedType === type ? 700 : 500,
                    fontSize: '12px',
                    textAlign: 'left',
                    cursor: 'pointer'
                  }}
                >
                  {selectedType === type ? '◉ ' : '○ '} {type}
                </button>
              ))}
            </div>
          </div>

          {/* SECTION: SEVERITY */}
          <div className="card" style={{ padding: '18px' }}>
            <h3 style={{ margin: '0 0 12px', fontSize: '13px', fontWeight: 800, textTransform: 'uppercase', color: 'var(--text-primary)' }}>
              2. Severity Level Assessment
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '10px' }}>
              {severities.map(sev => {
                const isCrit = sev === 'CRITICAL';
                const isHigh = sev === 'HIGH';
                const isSelected = selectedSeverity === sev;

                return (
                  <button
                    key={sev}
                    type="button"
                    onClick={() => setSelectedSeverity(sev)}
                    style={{
                      padding: '12px 10px',
                      borderRadius: '6px',
                      border: `2px solid ${
                        isSelected
                          ? isCrit
                            ? '#D32F2F'
                            : isHigh
                            ? '#F57C00'
                            : '#303F9F'
                          : 'var(--border-color)'
                      }`,
                      background: isSelected
                        ? isCrit
                          ? '#FFEBEE'
                          : isHigh
                          ? '#FFF3E0'
                          : '#E8EAF6'
                        : 'var(--bg-surface-alt)',
                      color: isCrit ? '#D32F2F' : isHigh ? '#E65100' : '#1A237E',
                      fontWeight: 800,
                      fontSize: '12.5px',
                      textAlign: 'center',
                      cursor: 'pointer'
                    }}
                  >
                    {sev}
                  </button>
                );
              })}
            </div>
          </div>

          {/* SECTION: MULTI-VECTOR RISK EVALUATION */}
          <div className="card" style={{ padding: '18px' }}>
            <h3 style={{ margin: '0 0 12px', fontSize: '13px', fontWeight: 800, textTransform: 'uppercase', color: 'var(--text-primary)' }}>
              3. Multi-Vector Risk Domains
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px' }}>
              {riskCategories.map(risk => {
                const isSelected = selectedRisks.includes(risk);
                return (
                  <button
                    key={risk}
                    type="button"
                    onClick={() => handleRiskToggle(risk)}
                    style={{
                      padding: '8px 12px',
                      borderRadius: '6px',
                      border: `1px solid ${isSelected ? '#3F51B5' : 'var(--border-color)'}`,
                      background: isSelected ? '#E8EAF6' : 'var(--bg-surface-alt)',
                      color: isSelected ? '#1A237E' : 'var(--text-secondary)',
                      fontWeight: isSelected ? 700 : 500,
                      fontSize: '12px',
                      cursor: 'pointer'
                    }}
                  >
                    {isSelected ? '✓ ' : '+ '} {risk} Risk
                  </button>
                );
              })}
            </div>
          </div>

          {/* SECTION: RECURRENCE PATTERN */}
          <div className="card" style={{ padding: '18px', borderLeft: '4px solid #F57C00' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
              <h3 style={{ margin: 0, fontSize: '13px', fontWeight: 800, textTransform: 'uppercase', color: 'var(--text-primary)' }}>
                4. Recurrence Pattern & Historical Frequency
              </h3>
              <button
                className="btn btn-secondary btn-sm"
                onClick={() => navigateTo('07')}
                style={{ fontSize: '11px', padding: '2px 8px' }}
              >
                View 4 Similar Findings &rarr;
              </button>
            </div>

            <div style={{ display: 'flex', gap: '10px', marginBottom: '12px' }}>
              {(['New', 'Repeat', 'Recurring Pattern'] as const).map(pat => (
                <button
                  key={pat}
                  type="button"
                  onClick={() => setRecurrencePattern(pat)}
                  style={{
                    flex: 1,
                    padding: '8px 10px',
                    borderRadius: '6px',
                    border: `1.5px solid ${recurrencePattern === pat ? '#E65100' : 'var(--border-color)'}`,
                    background: recurrencePattern === pat ? '#FFF3E0' : 'var(--bg-surface-alt)',
                    color: recurrencePattern === pat ? '#BF360C' : 'var(--text-primary)',
                    fontWeight: recurrencePattern === pat ? 700 : 500,
                    fontSize: '12px',
                    cursor: 'pointer'
                  }}
                >
                  {pat}
                </button>
              ))}
            </div>

            <div style={{ background: '#FFF8E1', padding: '10px 12px', borderRadius: '4px', fontSize: '12px', color: '#B78103' }}>
              <strong>Pattern Detected:</strong> 4 similar ventilation velocity deficits recorded at Mine A2 in the preceding 12 months.
            </div>
          </div>
        </div>

        {/* Right Column: System Recommendation & Human Authorization Rules */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {/* SYSTEM RECOMMENDATION PANEL */}
          <div className="card" style={{ padding: '20px', borderTop: '4px solid #1A237E' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
              <Shield size={18} color="#1A237E" />
              <h2 style={{ margin: 0, fontSize: '14px', fontWeight: 800, textTransform: 'uppercase', color: '#1A237E' }}>
                SYSTEM RECOMMENDATION
              </h2>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', background: 'var(--bg-surface-alt)', padding: '14px', borderRadius: '6px', fontSize: '12.5px', marginBottom: '16px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--text-muted)' }}>Computed Risk Level:</span>
                <span className="badge badge-danger font-bold">HIGH RISK</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--text-muted)' }}>Recurring Issue:</span>
                <span className="badge badge-warning font-bold">YES (4 Matches)</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--text-muted)' }}>Recommended Regulatory Action:</span>
                <span style={{ fontWeight: 700, color: '#1A237E' }}>Corrective Direction (CAPA)</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--text-muted)' }}>Confidence Score:</span>
                <span className="badge badge-info font-mono">92% Rule Match</span>
              </div>
            </div>

            {/* MANDATORY HUMAN AUTHORIZATION CALLOUT */}
            <div
              style={{
                background: '#FFEBEE',
                border: '1px solid #FFCDD2',
                borderRadius: '6px',
                padding: '12px 14px',
                marginBottom: '16px',
                fontSize: '12px',
                color: '#B71C1C',
                lineHeight: 1.4
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontWeight: 800, marginBottom: '4px' }}>
                <Lock size={13} />
                <span>MANDATORY HUMAN AUTHORIZATION:</span>
              </div>
              "System recommendations generated by rule-engine heuristics require authorized statutory reviewer confirmation. AI recommendations do not automatically issue legal notices."
            </div>

            <button
              className="btn btn-primary"
              onClick={() => {
                handleSaveClassification();
                navigateTo('08');
              }}
              style={{ width: '100%', background: '#1A237E', borderColor: '#303F9F', justifyContent: 'center' }}
            >
              <span>Authorize & Proceed to Regulatory Action &rarr;</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
