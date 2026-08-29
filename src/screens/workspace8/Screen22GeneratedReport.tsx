"use client";

import React from 'react';
import { useOversight } from '../../context/OversightContext';
import {
  FileText,
  Printer,
  Download,
  Award,
  ChevronLeft,
  ArrowRight,
  ShieldCheck,
  AlertTriangle,
  Building,
  CheckCircle2
} from 'lucide-react';

export const Screen22GeneratedReport: React.FC = () => {
  const { navigateTo, orgScope, showToast, kpis } = useOversight();

  return (
    <div className="screen-content">
      {/* Screen Header */}
      <div className="screen-header">
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
            <button
              className="btn btn-secondary btn-sm"
              onClick={() => navigateTo('20')}
              style={{ padding: '3px 8px' }}
            >
              <ChevronLeft size={13} />
              <span>Back to Report Centre</span>
            </button>
            <span
              className="badge badge-success font-bold"
              style={{ fontSize: '11px' }}
            >
              ✓ GENERATED ARTIFACT
            </span>
          </div>
          <h1 className="screen-title" style={{ margin: 0 }}>
            EXECUTIVE INSPECTION & STATUTORY GOVERNANCE DOSSIER
          </h1>
          <p className="screen-subtitle">
            Scope: <strong>{orgScope.subsidiary} &rarr; {orgScope.area}</strong> &bull; Period: <strong>November 2026</strong> &bull; Certified by: <strong>Chief Inspection Authority</strong>
          </p>
        </div>

        <div style={{ display: 'flex', gap: '8px' }}>
          <button
            className="btn btn-secondary btn-sm"
            onClick={() => showToast('Printing statutory document...', 'info')}
          >
            <Printer size={13} />
            <span>Print Report</span>
          </button>
          <button
            className="btn btn-primary btn-sm"
            onClick={() => showToast('Downloaded certified PDF dossier', 'success')}
            style={{ background: '#1E1B4B', borderColor: '#312E81' }}
          >
            <Download size={13} />
            <span>Download Certified PDF</span>
          </button>
        </div>
      </div>

      {/* Official Report Document Body */}
      <div
        className="card"
        style={{
          padding: '30px',
          backgroundColor: '#FFFFFF',
          border: '2px solid #312E81',
          borderRadius: '8px',
          boxShadow: '0 10px 30px rgba(0,0,0,0.08)',
          marginBottom: '30px'
        }}
      >
        {/* Document Header with Logo and Seals */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '2px solid #1E1B4B', paddingBottom: '16px', marginBottom: '20px' }}>
          <div>
            <div style={{ fontSize: '18px', fontWeight: 900, color: '#1E1B4B', letterSpacing: '1px' }}>STRATA STATUTORY GOVERNANCE DOSSIER</div>
            <div style={{ fontSize: '12px', color: 'var(--text-secondary)', fontWeight: 600 }}>COAL INDIA LIMITED &bull; DIRECTORATE GENERAL OF MINES SAFETY MANDATE</div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>DOCUMENT SERIAL:</div>
            <div style={{ fontSize: '13px', fontWeight: 800, color: '#D97706', fontFamily: 'monospace' }}>DOC-STRATA-2026-NOV-088</div>
          </div>
        </div>

        {/* Executive Summary Metrics Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px', background: 'var(--bg-surface-alt)', padding: '16px', borderRadius: '6px', marginBottom: '20px', textAlign: 'center' }}>
          <div>
            <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>COMPLETED INSPECTIONS</div>
            <div style={{ fontSize: '22px', fontWeight: 800, color: '#2E7D32', marginTop: '2px' }}>{kpis.completedInspections}</div>
          </div>
          <div>
            <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>CRITICAL FINDINGS</div>
            <div style={{ fontSize: '22px', fontWeight: 800, color: '#C62828', marginTop: '2px' }}>{kpis.criticalFindings}</div>
          </div>
          <div>
            <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>OVERDUE CAPAS</div>
            <div style={{ fontSize: '22px', fontWeight: 800, color: '#D32F2F', marginTop: '2px' }}>{kpis.overdueCapas}</div>
          </div>
          <div>
            <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>OVERALL RISK RATING</div>
            <div style={{ fontSize: '16px', fontWeight: 800, color: '#BF360C', marginTop: '6px' }}>HIGH (78/100)</div>
          </div>
        </div>

        {/* Executive Key Recommendations Box */}
        <div style={{ background: '#FFF8E1', border: '1.5px solid #FFE082', borderRadius: '6px', padding: '18px', marginBottom: '20px' }}>
          <h3 style={{ margin: '0 0 10px', fontSize: '13px', fontWeight: 800, textTransform: 'uppercase', color: '#B45309' }}>
            SENIOR GOVERNANCE DIRECTIVES & RECOMMENDATIONS
          </h3>
          <ul style={{ margin: 0, paddingLeft: '18px', fontSize: '12.5px', color: 'var(--text-primary)', lineHeight: 1.6 }}>
            <li><strong>Immediate Ventilation Overhaul at Mine A2:</strong> Direct Area General Manager to mandate daily ultrasonic traverse airflow logs in Shaft 3 return airway to restore statutory velocity &ge; 5.5 m/s.</li>
            <li><strong>Address 12 Overdue Remediation Actions:</strong> Enforce Level 3 Subsidiary technical interventions on long-standing electrical and strata bolt torque deficiencies.</li>
            <li><strong>Prioritize Systemic Repeat Finding Patterns:</strong> Institute quarterly descaling protocols across all gassy seam workings to arrest 4-time recurring ventilation drift.</li>
          </ul>
        </div>

        {/* Sign-Off Seal */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', paddingTop: '20px', borderTop: '1px solid var(--border-color)', fontSize: '11.5px' }}>
          <div>
            <div style={{ fontWeight: 700, color: 'var(--text-primary)' }}>Cryptographic Verification Seal:</div>
            <div style={{ fontFamily: 'monospace', color: 'var(--text-muted)', fontSize: '10.5px' }}>SHA256: 9b2d8e41a3c77f014e28bf6190842bbd...</div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontWeight: 800, color: '#1E1B4B' }}>Dr. A. K. Sen</div>
            <div style={{ color: '#D97706', fontWeight: 700 }}>Chief Inspection Authority & Regulatory Director</div>
          </div>
        </div>
      </div>
    </div>
  );
};
