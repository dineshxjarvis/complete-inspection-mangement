"use client";

import React from 'react';
import { useRegulatoryAction } from '../../context/RegulatoryActionContext';
import {
  GitPullRequest,
  AlertTriangle,
  ChevronLeft,
  Eye,
  ArrowRight,
  TrendingUp,
  BrainCircuit,
  Info,
  Calendar,
  Layers
} from 'lucide-react';

export const Screen07SimilarFindings: React.FC = () => {
  const {
    activeFinding,
    navigateTo,
    showToast
  } = useRegulatoryAction();

  const similarList = [
    {
      id: 'FND-2025-0098',
      mine: 'Mine A2',
      date: '18 Mar 2025',
      category: 'Ventilation & Airflow',
      measured: '4.9 m/s',
      status: 'Closed',
      capaId: 'CAPA-2025-0014',
      rootCause: 'Regulator baffle shutter hinge distortion'
    },
    {
      id: 'FND-2025-0211',
      mine: 'Mine A2',
      date: '12 Aug 2025',
      category: 'Ventilation & Airflow',
      measured: '4.7 m/s',
      status: 'Closed',
      capaId: 'CAPA-2025-0039',
      rootCause: 'Loose stone-dust spillage choking return airway throat'
    },
    {
      id: 'FND-2026-00072',
      mine: 'Mine A3',
      date: '05 Feb 2026',
      category: 'Ventilation & Airflow',
      measured: '5.1 m/s',
      status: 'Open / Under Action',
      capaId: 'CAPA-2026-0011',
      rootCause: 'Auxiliary booster fan belt slippage'
    },
    {
      id: 'FND-2025-0144',
      mine: 'Mine A2',
      date: '28 Jun 2025',
      category: 'Ventilation & Airflow',
      measured: '5.0 m/s',
      status: 'Closed',
      capaId: 'CAPA-2025-0027',
      rootCause: 'Airway cross-section convergence under abutment stress'
    }
  ];

  return (
    <div className="screen-content">
      {/* Screen Header */}
      <div className="screen-header">
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
            <button
              className="btn btn-secondary btn-sm"
              onClick={() => navigateTo('06')}
              style={{ padding: '3px 8px' }}
            >
              <ChevronLeft size={13} />
              <span>Back to Classification</span>
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
              SIMILAR & RECURRING FINDINGS
            </span>
          </div>
          <h1 className="screen-title" style={{ margin: 0 }}>
            HISTORICAL PATTERN & SIMILAR FINDINGS ARCHIVE
          </h1>
          <p className="screen-subtitle">
            Comparative analysis of 4 matching non-compliances across Mine A2 & adjacent divisions over past 12 months
          </p>
        </div>

        <button
          className="btn btn-primary btn-sm"
          onClick={() => navigateTo('08')}
          style={{ background: '#1A237E', borderColor: '#303F9F' }}
        >
          <span>Proceed to Regulatory Action</span>
          <ArrowRight size={13} />
        </button>
      </div>

      {/* Analytics Summary Banner */}
      <div
        className="card"
        style={{
          padding: '16px 20px',
          background: 'linear-gradient(135deg, #FFF3E0 0%, #FFE0B2 100%)',
          border: '1px solid #FFB74D',
          marginBottom: '20px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <TrendingUp size={24} color="#E65100" />
          <div>
            <div style={{ fontSize: '11.5px', fontWeight: 800, color: '#BF360C', textTransform: 'uppercase' }}>
              12-Month Recurrence Summary
            </div>
            <div style={{ fontSize: '16px', fontWeight: 800, color: '#BF360C', marginTop: '2px' }}>
              4 Similar Airflow Deficits Detected &bull; Chronic Louvre Obstruction Pattern
            </div>
          </div>
        </div>

        <div style={{ textAlign: 'right' }}>
          <span className="badge badge-warning font-mono" style={{ fontSize: '11px', fontWeight: 700 }}>
            PATTERN CONFIDENCE: 92%
          </span>
        </div>
      </div>

      {/* AI / Analytics Insight Box with Strict Governance Disclaimer */}
      <div
        className="card"
        style={{
          padding: '16px',
          background: '#EDE7F6',
          border: '1px solid #D1C4E9',
          marginBottom: '20px'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
          <BrainCircuit size={16} color="#4527A0" />
          <h2 style={{ margin: 0, fontSize: '13px', fontWeight: 800, textTransform: 'uppercase', color: '#4527A0' }}>
            AI / ANALYTICS INSIGHT &bull; CLUSTERING MODEL v3.2
          </h2>
        </div>
        <p style={{ margin: 0, fontSize: '12.5px', color: '#311B92', lineHeight: 1.5 }}>
          "Semantic and quantitative clustering identifies repeated velocity degradation (4.7 – 5.1 m/s) in Seam VII return airways following periodic continuous miner extraction cycles. Root cause recurrence indicates lack of automated louvre self-purging."
        </p>

        <div
          style={{
            marginTop: '10px',
            paddingTop: '8px',
            borderTop: '1px dashed #B39DDB',
            fontSize: '11px',
            color: '#512DA8',
            fontStyle: 'italic'
          }}
        >
          &bull; <strong>Statutory Disclaimer:</strong> AI similarity suggestions are assistive heuristics and never constitute an authoritative legal conclusion. Official determination rests solely with the authorized DGMS Reviewer.
        </div>
      </div>

      {/* Similar Findings Table */}
      <div className="card" style={{ padding: 0, overflow: 'hidden', marginBottom: '30px' }}>
        <div style={{ padding: '14px 16px', borderBottom: '1px solid var(--border-color)', fontWeight: 700, fontSize: '13px' }}>
          HISTORICAL MATCHES (LAST 12 MONTHS)
        </div>
        <table className="data-table">
          <thead>
            <tr>
              <th style={{ width: '130px' }}>Finding ID</th>
              <th style={{ width: '100px' }}>Mine</th>
              <th style={{ width: '110px' }}>Date</th>
              <th>Observed Velocity</th>
              <th>Diagnosed Root Cause</th>
              <th style={{ width: '130px' }}>CAPA Reference</th>
              <th style={{ width: '110px' }}>Status</th>
              <th style={{ width: '90px', textAlign: 'center' }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {similarList.map(sim => (
              <tr key={sim.id}>
                <td>
                  <span className="id-badge font-mono" style={{ fontSize: '11px' }}>
                    {sim.id}
                  </span>
                </td>
                <td>
                  <span style={{ fontWeight: 600 }}>{sim.mine}</span>
                </td>
                <td>
                  <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>{sim.date}</span>
                </td>
                <td>
                  <span className="badge badge-danger font-mono font-bold">
                    {sim.measured}
                  </span>
                </td>
                <td>
                  <div style={{ fontSize: '12.5px', color: 'var(--text-primary)' }}>{sim.rootCause}</div>
                </td>
                <td>
                  <span className="badge badge-subtle font-mono" style={{ fontSize: '11px' }}>
                    {sim.capaId}
                  </span>
                </td>
                <td>
                  <span className={`status-pill ${sim.status === 'Closed' ? 'status-completed' : 'status-active'}`}>
                    {sim.status}
                  </span>
                </td>
                <td style={{ textAlign: 'center' }}>
                  <button
                    className="btn btn-secondary btn-sm"
                    onClick={() => showToast(`Opened comparison dossier for ${sim.id} vs ${activeFinding.id}`, 'info')}
                    style={{ padding: '3px 8px' }}
                  >
                    <span>Compare</span>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
